/**
 * @fileoverview テーブルアプリ　明細アプリ　双方向連携
 *
 * 【必要ライブラリ】
 * [JavaScript]
 * jquery.min.js
 * snc-1.0.5.min.js
 * snc.kintone-1.0.8.min.js
 * snc.nok-1.0.5.min.js
 * config.Nice-ricoh-kintone-plus-kensetuLT.js
 * config.sagyoRepoto-sagyoNippoTable.Linkage-1.0.0.js
 *
 * [CSS]
 * 51-us-default.css
 *
 * @author SNC
 * @version 1.0.0
 * @customer （2023-06-25）
 */
jQuery.noConflict();
(function ($, config, configLinkage, sncLib) {
    'use strict';

    const cfgTableApp = config.anken;                    // テーブルアプリの設定
    const cfgTableAppFields = config.anken.fields;       // テーブルアプリのフィールド設定
    const cfgMeisaiFields = config.nyukinJhoho.fields; // 明細アプリのフィールド設定
    const cfgMeisaiLinkage = configLinkage;            // 明細アプリとテーブルアプリの関連フィールド設定
    // 編集画面表示時点のレコード情報を保管
    let beforeEditRecord = null;
    /**
     * レコード編集画面(新規)の表示イベント
     * uuidの新規発行を行う
     */
    kintone.events.on([
        'app.record.create.show',
    ], function (event) {
        // 新規画面の表示時にUUIDを新規発行する
        event.record[cfgMeisaiFields.uuid.code].value = generateUuid();
        return event;
    });

    /**
     * レコードインデックス画面のイベント表示
     * 前のURLにリダイレクトし、スクロール位置を復元します
     */
    kintone.events.on([
        'app.record.index.show',
    ], function (event) {
        const isRedirect = JSON.parse(localStorage.getItem('isRedirect')) || null;
        const isChangeHash = JSON.parse(localStorage.getItem('isChangeHash')) || null;
        if (isRedirect || isChangeHash) {
            restoreScrollPosition();
            const urlHash = localStorage.getItem('urlHash');
            if (urlHash) {
                window.location.hash = urlHash;
                localStorage.setItem('isChangeHash', true);
                localStorage.removeItem('urlHash');
                return event;
            }
        }
        localStorage.removeItem('isRedirect');
        localStorage.removeItem('isChangeHash');

        return event;
    });

    /**
     * レコード編集画面(追加)の表示イベント
     * 編集前レコード保存を行う
     */
    kintone.events.on([
        'app.record.edit.show',
        'app.record.index.edit.show',
    ], function (event) {
        // 編集画面の表示時には画面表示時点のレコードを保存する
        beforeEditRecord = event.record;
        return event;
    });

    /**
     * 新規レコード保存前イベント
     * 関連するレコードへの更新処理を行う
     */
    kintone.events.on([
        'app.record.create.submit',
    ], function (event) {
        const sagyoNippoId = event.record['nok_案件ID'].value;        
        // 案件IDが未設定の場合には、連携処理を行わずに保存処理を実行する
        if (!sagyoNippoId) return event;
        // 連携更新リクエストデータ
        const requestData = [];
        // 作業日報アプリの取得リクエスト
        return getSagyoNippoRecord(sagyoNippoId)
            .then(function (result) {
                // 予定一覧サブテーブルへの追加を行った上で、業務管理と関連する予定報告の更新リクエストデータを発行する
                return addRequestRelateRecordOnCreate(event.record, result.records[0], requestData);
            })
            .then(function (result) {
                // 作成したリクエストデータをバルクリクエストして、更新処理を実行する
                return sncLib.kintone.rest.execBulkRequest(requestData);
            })
            .then(function (result) {
                // 成功時、eventを返却して自レコードを保存する
                return event;
            })
            .catch(function (error) {
                // 失敗時、スイートアラートで保存失敗のメッセージを表示して保存処理を中断する
                console.log(error);
                Swal.fire(cfgMeisaiLinkage.errorMessage.updateRelatedRecordError);
                return false;
            });
    });

    /**
     * 編集レコード保存前イベント
     * 関連するレコードへの更新処理を行う
     */
    kintone.events.on([
        'app.record.edit.submit',
        'app.record.index.edit.submit'
    ], function (event) {
        // 自レコードの案件検索が編集前と編集後で存在しない場合(OFF => OFFパターン)、連携処理は行わずに自レコードの更新処理を実行する
        const beforeSagyoNippoId = beforeEditRecord['nok_案件ID'].value;
        const sagyoNippoId = event.record['nok_案件ID'].value;        
        
        if (!beforeSagyoNippoId && !sagyoNippoId) return event;

        // 連携更新リクエストデータ
        const requestData = [];
        // 自レコードの案件レコード番号をキーにして、業務管理レコードを取得する
        // 業務管理IDが削除されるケースにおいては、取得対象の業務管理を編集前の物にする
        const targetSagyoNippoId = beforeSagyoNippoId && !sagyoNippoId ? beforeSagyoNippoId : sagyoNippoId;
        return getSagyoNippoRecord(targetSagyoNippoId)
            .then(function (result) {
                // 自レコードの案件検索が(OFF => ON)で切り替わった場合、業務管理レコードへ新規登録時の連携処理を行う
                if (!beforeSagyoNippoId && sagyoNippoId) return addRequestRelateRecordOnCreate(event.record, result.records[0], requestData);
                // 自レコードの案件検索が(ON => OFF)で切り替わった場合、業務管理レコードへ削除時の連携処理を行う
                if (beforeSagyoNippoId && !sagyoNippoId) return addRequestRelateRecordOnDelete(event.record, result.records[0], requestData);
                // 自レコードの案件検索が変わらなかった場合、業務管理レコードのサブテーブルの自身の行への更新連携処理を行う
                if (beforeSagyoNippoId === sagyoNippoId) return addRequestRelateRecordOnEdit(event.record, result.records[0], requestData);
                // 自レコードの案件検索がONのまま他の値に変わった場合、紐づく業務管理を切り替える処理を行う
                // 編集前案件IDの業務管理 => 削除時の連携処理
                return addRequestBeforeGyoumuRecord(event.record, beforeSagyoNippoId, requestData)
                    .then(function () {
                        // 編集後案件IDの業務管理 => 新規時の連携処理
                        return addRequestRelateRecordOnCreate(event.record, result.records[0], requestData);
                    });
            })
            .then(function (result) {
                // 作成した更新リクエストデータの長さを確認して、データがない場合には連携処理を行わずに更新する
                if (requestData.length === 0) return event;
                // 作成したリクエストデータをバルクリクエストして、更新処理を実行する
                return sncLib.kintone.rest.execBulkRequest(requestData);
            })
            .then(function (result) {
                // 成功時、eventを返却して自レコードを更新する
                return event;
            })
            .catch(function (error) {
                // 失敗時、スイートアラートで保存失敗のメッセージを表示して更新処理を中断する
                console.log(error);
                Swal.fire(cfgMeisaiLinkage.errorMessage.updateRelatedRecordError);
                return false;
            });
    });

    /**
     * インライン編集に成功したとき
     * リダイレクトURLを設定する
     */
    kintone.events.on([
        'app.record.index.edit.submit.success'
    ], function (event) {
        const currentUrl = window.location.href;
        const url = new URL(currentUrl);
        const urlPath = `${url.pathname}${url.search}`;
        const urlHash = `${url.hash}`;
        const scrollTop = document.documentElement.scrollTop;
        const scrollLeft = document.documentElement.scrollLeft;

        localStorage.setItem('isRedirect', true);
        localStorage.setItem('urlHash', urlHash);
        localStorage.setItem('scrollTop', scrollTop);
        localStorage.setItem('scrollLeft', scrollLeft);

        event.url = urlPath;
        return event;
     });


    /**
     * レコード削除前イベント
     * 関連する業務管理レコードのサブテーブル行削除を行う
     */
    kintone.events.on([
        'app.record.detail.delete.submit',
        'app.record.index.delete.submit',
    ], function (event) {
        // 案件IDが未設定の場合には、連携処理を行わずに削除処理を実行する
        const sagyoNippoId = event.record['nok_案件ID'].value;
        if (!sagyoNippoId) return event;

        // 連携更新リクエストデータ
        const requestData = [];
        // 自レコードの案件レコード番号をキーにして、業務管理レコードを取得する
        return getSagyoNippoRecord(sagyoNippoId)
            .then(function (result) {
                // 予定一覧サブテーブルへの行削除を行った上で、業務管理と関連する予定報告の更新リクエストデータを発行する
                return addRequestRelateRecordOnDelete(event.record, result.records[0], requestData);
            }).then(function (result) {
                // 作成したリクエストデータをバルクリクエストして、更新処理を実行する
                return sncLib.kintone.rest.execBulkRequest(requestData);
            }).then(function (result) {
                // 成功時、eventを返却して自レコードを削除する
                return event;
            }).catch(function (error) {
                // 失敗時、スイートアラートで更新失敗のメッセージを表示して、削除処理を中断する
                console.log(error);
                Swal.fire(cfgMeisaiLinkage.errorMessage.updateRelatedRecordError);
                return false;
            });
    });

    /**
     * スクロール位置を復元
     */
    function restoreScrollPosition() {
        const scrollTop = localStorage.getItem('scrollTop');
        const scrollLeft = localStorage.getItem('scrollLeft');
        if (scrollTop !== null && scrollLeft !== null) {
            window.scrollTo(parseInt(scrollLeft, 10), parseInt(scrollTop, 10));
        }
    }

    function generateUuid() {
        let format = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.split('');
        for (let i = 0; i < format.length; i++) {
            switch (format[i]) {
                // 16進の0～f（10進の0～15）
                // Math.random()で生成（0以上1未満）したランダム数値を16倍する。
                // 16倍した値の小数点以下を切り捨て、16進に変換する。
                case 'x':
                    format[i] = Math.floor(Math.random() * 16).toString(16);
                    break;
                // 16進の8～b（10進の8～11）
                // Math.random()で生成したランダム数値を4倍し8を加算する。
                // 加算した値の小数点以下を切り捨て、16進に変換する。
                case 'y':
                    format[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
                    break;
            }
        }
        return format.join('');
    }

    /**
     * サブテーブルの配列オブジェクトをバルクリクエスト用のフォーマットに加工する。
     * @param subtable
     * @param tableRecords
     */
    function generateTableRecord(subtable, tableRecords) {
        for (let i = 0; i < subtable.length; i++) {
            let tableValue = {};
            const subTableValues = subtable[i].value;
            for (let key in subTableValues) {
                tableValue[key] = { 'value': '' };
                tableValue[key]['value'] = subTableValues[key].value;
            }
            tableRecords.push({ value: tableValue });
        }
    }

    /**
     * 日程TBテーブルレコードを生成する
     * @param {Object} currentRecord
     * @param {Object} subtable
     * @param {Boolean} isEdit
     * @returns {Array} tableRecords
     */
    function generateNetteiTableRecord(currentRecord, subtable, isEdit) {
        const tableRecords = [];
        generateTableRecord(subtable, tableRecords);
        const nitteiTableList = cfgMeisaiLinkage.linkageFields.nitteiTableList;
        const netteiTBRowIndex = cfgMeisaiLinkage.linkageFields.nitteiTBRowIndex - 1;
        nitteiTableList.forEach(function (obj) {
            if (Number(obj.itemNo) === Number(currentRecord[cfgMeisaiFields.meisaiNo.code].value)) {
                obj.dataLink.forEach(function (item) {
                    tableRecords[netteiTBRowIndex].value[item.targetFieldCode].value = isEdit ? currentRecord[item.sourceFieldCode].value : '';
                });
            }
        });
        return tableRecords;
    }

    /**
     * サブテーブルのソート
     * ソート用配列のキー（sortKeys）を使用し、サブテーブル配列を昇順もしくは降順にソートする。
     * orderで降順・昇順を切替える。
     * ソート後は、項番をリナンバリングする。
     * @param tableRecords
     * @param sortKeys
     * @param order
     */
    function sortSubtable(tableRecords, sortKeys, order) {
        for (let i = 0; i < sortKeys.length; i++) {
            const sortKey = sortKeys[i];
            tableRecords.sort(function (pre, post) {
                // ソート順指定を確認し、-1 or 1 を返却する。
                if (pre['value'][sortKey].value < post['value'][sortKey].value) {
                    return order === 'asc' ? -1 : 1;
                }
                if (pre['value'][sortKey].value > post['value'][sortKey].value) {
                    return order === 'asc' ? 1 : -1;
                }
            }
            );
        }
    }

    /**
     * 項番をリナンバリングする。
     * @param tableRecords
     * @param noField
     */
    function updateItemNumber(tableRecords, noField) {
        for (let i = 0; i < tableRecords.length; i++) {
            const number = i + 1
            tableRecords[i].value[noField] = {
                type: 'NUMBER',
                value: number.toString()
            };
        }
    }

    /**
     * 新規作成時の関連レコードへの更新リクエストを作成する
     * @param {*} currentRecord 新規追加対象の予定報告レコード
     * @param {*} sagyoNippoRecord 関連する業務管理レコード
     * @param {*} requestData 連携更新リクエストデータ
     * @returns {PromiseLike} 関連するその他の予定報告レコード取得リクエストのプロミス
     */
    function addRequestRelateRecordOnCreate(currentRecord, sagyoNippoRecord, requestData) {
        // configの連携フィールド情報を元に、業務管理の予定一覧サブテーブルに自身のレコードに対応する行を追加
        const yoteiIchiranSubTable = sagyoNippoRecord[cfgTableAppFields.nyukinJohoTB.code].value;
        addNewRowToSubTable(yoteiIchiranSubTable, currentRecord);
        // 追加後のサブテーブルをソートし直して、項番をリナンバリングする
//        sortSubtable(yoteiIchiranSubTable, cfgMeisaiLinkage.workTableSortList, cfgMeisaiLinkage.workTableOrder);
        updateItemNumber(yoteiIchiranSubTable, cfgTableAppFields.ko_nyukinJohoTB.code);
        // リナンバリングの結果をもとに、自身のレコードの項番フィールドを更新
        const ownRowData = searchRowSubTableInUuid(yoteiIchiranSubTable, currentRecord[cfgMeisaiFields.uuid.code].value);
        currentRecord[cfgMeisaiFields.meisaiNo.code].value = ownRowData.value[cfgTableAppFields.ko_nyukinJohoTB.code].value;

        // 業務管理レコードの更新リクエストを発行する
        addSagyoNippoUpdateRecord(currentRecord, sagyoNippoRecord, yoteiIchiranSubTable, requestData);
        // 予定一覧サブテーブル内の自身以外の予定報告レコードに対して、UUIDをキーにして更新リクエストを発行する
        return addOtherYoteiHokokuUpdateRecord(currentRecord[cfgMeisaiFields.uuid.code].value, currentRecord, yoteiIchiranSubTable, requestData);

        /**
         * 業務管理から取得したサブテーブルの内容に自身の行を追加する
         * @param {*} subTable サブテーブル配列オブジェクト
         * @param {*} currentRecord 処理対象である自身のレコード
         */
        function addNewRowToSubTable(subTable, currentRecord) {
            const addTableRow = {};
            const renkeiSubtableFields = cfgMeisaiLinkage.linkageFields.workTableList;
            renkeiSubtableFields.forEach(function (renkeiField) {
                addTableRow[renkeiField.targetFieldCode] = {
                    value: currentRecord[renkeiField.sourceFieldCode].value
                };
            });
            subTable.push({ value: addTableRow });
        }
    }

    /**
     * 削除時の関連レコードへの更新リクエストを作成する
     * @param {*} currentRecord 削除対象の予定報告レコード
     * @param {*} sagyoNippoRecord 関連する業務管理レコード
     * @param {*} requestData 連携更新リクエストデータ
     * @returns {PromiseLike} 関連するその他の予定報告レコード取得リクエストのプロミス
     */
    function addRequestRelateRecordOnDelete(currentRecord, sagyoNippoRecord, requestData) {
        // サブテーブル内容から自レコードのUUIDを持つ行を除いて、サブテーブルを再構築する
        const yoteiIchiranSubTable = sagyoNippoRecord[cfgTableAppFields.nyukinJohoTB.code].value;
        // サブテーブルに自分の行を空白にする
        blankOwnRowToSubTable(yoteiIchiranSubTable, currentRecord);

        updateItemNumber(yoteiIchiranSubTable, cfgTableAppFields.ko_nyukinJohoTB.code);
        // リナンバリングの結果をもとに、自身のレコードの項番フィールドを更新
        const ownRowData = searchRowSubTableInUuid(yoteiIchiranSubTable, currentRecord[cfgMeisaiFields.uuid.code].value);
        currentRecord[cfgMeisaiFields.meisaiNo.code].value = ownRowData.value[cfgTableAppFields.ko_nyukinJohoTB.code].value;

        // 業務管理レコードの更新リクエストを発行する
        addSagyoNippoUpdateRecord(currentRecord, sagyoNippoRecord, yoteiIchiranSubTable, requestData);
        // 予定一覧サブテーブル内の自身以外の予定報告レコードに対して、項番を更新するリクエストを発行する
        return addOtherYoteiHokokuUpdateRecord(currentRecord[cfgMeisaiFields.uuid.code].value, currentRecord, yoteiIchiranSubTable, requestData);
    }

    /**
     * サブテーブルに自分の行を空白にする
     * @param {Object} subTable
     * @param {Object} currentRecord
     */
    function blankOwnRowToSubTable(subTable, currentRecord) {
        const ownRowData = searchRowSubTableInUuid(subTable, currentRecord[cfgMeisaiFields.uuid.code].value);
        // コンフィグ記載のサブテーブル連携フィールドを更新する
        const nyukinJohoTBList = cfgMeisaiLinkage.linkageFields.nyukinJohoTBList;
        nyukinJohoTBList.forEach(function (obj) {
            ownRowData.value[obj.targetFieldCode] = {
                value: ''
            };
        });
    }

    /**
     * 編集時の関連レコードへの更新リクエストを作成する
     * @param {*} currentRecord 編集対象の予定報告レコード
     * @param {*} sagyoNippoRecord 関連する業務管理レコード
     * @param {*} requestData 連携更新リクエストデータ
     * @returns {PromiseLike} 関連するその他の予定報告レコード取得リクエストのプロミス
     */
    function addRequestRelateRecordOnEdit(currentRecord, sagyoNippoRecord, requestData) {
        // サブテーブル内容から自レコードのUUIDを持つ行の内容を更新して、サブテーブルを再構築する
        const yoteiIchiranSubTable = sagyoNippoRecord[cfgTableAppFields.nyukinJohoTB.code].value;
        updateOwnRowToSubTable(yoteiIchiranSubTable, currentRecord);
        // 更新後のサブテーブルをソートし直して、項番をリナンバリングする
//        sortSubtable(yoteiIchiranSubTable, cfgMeisaiLinkage.workTableSortList, cfgMeisaiLinkage.workTableOrder);
        updateItemNumber(yoteiIchiranSubTable, cfgTableAppFields.ko_nyukinJohoTB.code);
        // リナンバリングの結果をもとに、自身のレコードの項番フィールドを更新
        const ownRowData = searchRowSubTableInUuid(yoteiIchiranSubTable, currentRecord[cfgMeisaiFields.uuid.code].value);
        currentRecord[cfgMeisaiFields.meisaiNo.code].value = ownRowData.value[cfgTableAppFields.ko_nyukinJohoTB.code].value;

        // 業務管理レコードの更新リクエストを発行する
        addSagyoNippoUpdateRecord(currentRecord, sagyoNippoRecord, yoteiIchiranSubTable, requestData, true);
        // 予定一覧サブテーブル内の自身以外の予定報告レコードに対して、項番を更新するリクエストを発行する
        return addOtherYoteiHokokuUpdateRecord(currentRecord[cfgMeisaiFields.uuid.code].value, currentRecord, yoteiIchiranSubTable, requestData);

        /**
         * 業務管理から取得したサブテーブル内容の自身の行を更新する
         * @param {*} subTable サブテーブル配列オブジェクト
         * @param {*} targetUuid 編集対象である自身のレコード
         */
        function updateOwnRowToSubTable(subTable, currentRecord) {
            const ownRowData = searchRowSubTableInUuid(subTable, currentRecord[cfgMeisaiFields.uuid.code].value);
            // コンフィグ記載のサブテーブル連携フィールドを更新する
            const renkeiSubtableFields = cfgMeisaiLinkage.linkageFields.nyukinJohoTBList;
            renkeiSubtableFields.forEach(function (renkeiField) {
                ownRowData.value[renkeiField.targetFieldCode] = {
                    value: currentRecord[renkeiField.sourceFieldCode].value
                };
            });
        }
    }

    /**
     * 編集前の案件検索の値に対応する業務管理レコードを取得後、削除時の連携処理を行う
     * @param {*} currentRecord 処理対象のレコード
     * @param {*} beforeSagyoNippoId 編集前の業務管理レコードID
     * @param {*} requestData 連携更新リクエストデータ
     * @returns {PromiseLike} 業務管理レコードの取得リクエストのプロミス
     */
    function addRequestBeforeGyoumuRecord(currentRecord, beforeSagyoNippoId, requestData) {
        return getSagyoNippoRecord(beforeSagyoNippoId)
            .then(function (result) {
                return addRequestRelateRecordOnDelete(currentRecord, result.records[0], requestData)
            });
    }

    /**
     * 関連する業務管理レコードの取得を行う
     * @param {*} sagyoNippoId 対象の業務管理レコードID
     * @returns {PromiseLike} 業務管理レコードの取得リクエストのプロミス
     */
    function getSagyoNippoRecord(sagyoNippoId) {
        let query = cfgTableAppFields.ankenId.code + ' = "' + sagyoNippoId + '" limit 1';
        const body = {
            'app': cfgTableApp.app,
            'query': query
        };
        return kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', body);
    }

    /**
     * サブテーブルの中から、渡されたuuidに該当する行データを返す
     * 見つからなかった場合にはエラーを発生させる
     * @param {*} subTable
     * @param {*} targetUuid
     * @returns {object} 該当する行データ
     */
    function searchRowSubTableInUuid(subTable, targetUuid) {
        for (let i = 0; i < subTable.length; i++) {
//            if (subTable[i].value[cfgMeisaiFields.uuid.code].value === targetUuid) return subTable[i];
            if (subTable[i].value[cfgTableAppFields.uuid_nyukinJohoTB.code].value === targetUuid) return subTable[i];            
        }
        throw new Error('uuid not found in subtable');
    }

    /**
     * 予定報告レコードに関連する業務管理への更新リクエストデータを作成して、連携更新リクエストデータに追加する
     * @param {Object} currentRecord 処理対象のレコード
     * @param {Object} sagyoNippoRecord 関連する業務管理レコード
     * @param {Object} updateSubTableData 更新する内容の予定一覧サブテーブルデータ
     * @param {Array} requestData 連携更新リクエストデータ
     * @param {Boolean} isEdit
     */
    function addSagyoNippoUpdateRecord(currentRecord, sagyoNippoRecord, updateSubTableData, requestData, isEdit = false) {
        const sagyoNippoRecordId = sagyoNippoRecord[cfgTableAppFields.recordId.code].value;
        // 更新リクエストに追加する業務管理レコードを作成する
        const sagyoNippoUpdateRecord = {};
        // コンフィグ記載のサブテーブル以外の連携項目を先にセットする
        // 削除に関連する動きから呼ばれる際には連携フィールドの更新は行わないため、currentRecordにはnullが渡される
        if (currentRecord) {
            const renkeiFields = cfgMeisaiLinkage.linkageFields.renkeiFields;
            renkeiFields.forEach(function (renkeiField) {
                // ここでは予定報告の値を元に業務管理に対しての連携のためtargetField <= sourceFieldになる
                sagyoNippoUpdateRecord[renkeiField.targetFieldCode] = {
                    value: currentRecord[renkeiField.sourceFieldCode].value
                };
            });
        }
        // 予定一覧サブテーブルの内容更新
        const tableRecords = [];
        generateTableRecord(updateSubTableData, tableRecords);
        sagyoNippoUpdateRecord[cfgTableAppFields.nyukinJohoTB.code] = {
            'value': tableRecords
        };

        const netteiTableRecord = generateNetteiTableRecord(currentRecord, sagyoNippoRecord[cfgTableAppFields.nitteiTB.code].value, isEdit);
        sagyoNippoUpdateRecord[cfgTableAppFields.nitteiTB.code] = {
            'value': netteiTableRecord
        };

        // バルクリクエスト用のデータを組み立て、連携更新リクエストデータに追加する
        buildUpdateRequests(cfgTableApp.app, [sagyoNippoRecordId], [sagyoNippoUpdateRecord], requestData);
    }

    /**
     * 業務管理に紐づく自身以外の予定報告レコードへの更新リクエストを作成する
     * @param {*} ownUuid 自身のレコードのuuid
     * @param {*} currentRecord 自身のレコード
     * @param {*} subTable リナンバリングされたサブテーブルデータ
     * @param {*} requestData 連携更新リクエストデータ
     * @returns {PromiseLike} 業務管理に紐づく自身以外の予定報告レコードを取得するリクエストのプロミス
     */
    function addOtherYoteiHokokuUpdateRecord(ownUuid, currentRecord, subTable, requestData) {
        return getOtherYoteiHokokuRecords(ownUuid, subTable)
            .then(function (result) {
                addYoteiHokokuRecords(result);
            });

        /**
         * サブテーブルの中から自身以外の予定報告レコードのuuidを抽出し、レコード取得のリクエストを行う
         * @param {*} ownUuid 自身のuuid
         * @param {*} subTable サブテーブルデータ
         * @returns {PromiseLike} 自身以外の予定報告レコード取得リクエストのプロミス
         */
        function getOtherYoteiHokokuRecords(ownUuid, subTable) {
            const targetUuidList = [];
            subTable.forEach(function (tableRow) {
//                if (tableRow.value[cfgMeisaiFields.uuid.code].value === ownUuid) return;                
                if (tableRow.value[cfgTableAppFields.uuid_nyukinJohoTB.code].value === ownUuid) return;
//                targetUuidList.push('"' + tableRow.value[cfgMeisaiFields.uuid.code].value + '"');
                targetUuidList.push('"' + tableRow.value[cfgTableAppFields.uuid_nyukinJohoTB.code].value + '"');                
            });
            let query = cfgMeisaiFields.uuid.code + ' in (' + targetUuidList.join() + ')';
            return sncLib.kintone.rest.getAllRecordsOnRecordId(kintone.app.getId(), query);
        }

        /**
         * 業務管理レコードに関連する自身以外の予定報告レコードへの更新リクエストデータを作成して、連携更新リクエストデータに追加する
         * @param {*} result 自身以外の予定報告レコード取得リクエストの結果
         */
        function addYoteiHokokuRecords(result) {
            const updateIdList = [];
            const updateRecords = [];
            result.forEach(function (record) {
                const yoteiHokokuUpdateRecord = {};
                // コンフィグ記載のサブテーブル以外の連携項目を先にセットする
                // 削除に関連する動きから呼ばれる際には連携フィールドの更新は行わないため、currentRecordにはnullが渡される
                if (currentRecord) {
                    const renkeiFields = cfgMeisaiLinkage.linkageFields.renkeiFields;
                    renkeiFields.forEach(function (renkeiField) {
                        // ここでは予定報告の値を元に予定報告に対しての連携のためsourceField => sourceFieldになる
                        yoteiHokokuUpdateRecord[renkeiField.sourceFieldCode] = {
                            value: currentRecord[renkeiField.sourceFieldCode].value
                        };
                    });
                }

                // リナンバリングされたサブテーブルデータを元に、対象の予定報告レコードの項番を更新する
                const currentUuid = record[cfgMeisaiFields.uuid.code].value;
                const currentRowData = searchRowSubTableInUuid(subTable, currentUuid);
                yoteiHokokuUpdateRecord[cfgMeisaiFields.meisaiNo.code] = {
//                    value: currentRowData.value[cfgMeisaiFields.meisai_No.code].value
                    value: currentRowData.value[cfgTableAppFields.ko_nyukinJohoTB.code].value                    
                };
                updateIdList.push(record[cfgMeisaiFields.recordId.code].value);
                updateRecords.push(yoteiHokokuUpdateRecord);
            });
            // バルクリクエスト用のリクエストデータを作成し、連携更新リクエストデータに追加する
            buildUpdateRequests(kintone.app.getId(), updateIdList, updateRecords, requestData);
        }
    }

    /**
     * バルクリクエスト用のリクエストデータを組み立てる。
     * @param appId 対象のアプリID
     * @param recordIdList 対象のレコードID配列
     * @param targetRecords 対象のレコード内容配列
     * @param requestData 連携更新リクエストデータ
     */
    function buildUpdateRequests(appId, recordIdList, targetRecords, requestData) {
        const payloadTemplate = {
            app: appId,
            records: []
        };
        // payloadの初期化
        let payload = $.extend(true, {}, payloadTemplate);
        for (let i = 0; i < recordIdList.length; i++) {
            payload.records.push({
                'id': recordIdList[i],
                'record': targetRecords[i]
            });
            // 100件毎にリクエストをpushして、payloadを新規発行する
            if (payload.records.length === 100) {
                pushPutRequest();
                payload = $.extend(true, {}, payloadTemplate);
            }
        };
        pushPutRequest();

        function pushPutRequest() {
            requestData.push({
                'method': 'PUT',
                'api': '/k/v1/records.json',
                'payload': payload
            });
        }
    }

})(jQuery, window.nokConfig, window.meisaiLinkageConfig, window.snc);
