/**
 * @fileoverview　建設業版LTパック 工事管理アプリ　作業員明細テーブル・作業員スケジュールアプリ連携
 * @author SNC
 * @version 1.0.1
 * @customer （2023-06-25）
 *【必要ライブラリ】
 * [JavaScript]
 * sweetalert2@9.js
 * jquery.min.js
 * snc-1.0.5.min.js
 * snc.kintone-1.0.8.min.js
 * snc.nok-1.0.5.min.js
 * config.Nice-ricoh-kintone-plus-kensetu4-3.5.1.js
 * config.koujiTable-meisai.Linkage-1.0.1.js
 *
 * [CSS]
 * 51-us-default.css
 */
jQuery.noConflict();
(function ($, config, tableLinkageConfig, sncLib) {
    'use strict';

    const cfgTableApp = config.kouji;          // 工事管理アプリ（テーブルアプリの設定）
    const cfgMeisaiApp = config.nyukinJhoho;          // 作業員スケジュールアプリ（明細アプリの設定）
    const cfgLinkage = tableLinkageConfig;          // テーブルアプリ・明細アプリの関連設定
    const cfgTableAppFields = cfgTableApp.fields;          // 工事管理アプリのフィールド設定（テーブルアプリのフィールド設定）
    const cfgMeisaiAppFields = cfgMeisaiApp.fields;          // 作業員スケジュールアプリのフィールド設定（明細アプリのフィールド設定）
    const uuidField = cfgTableAppFields.uuid_TB.code;          // 工事管理アプリのuuidフィールド（テーブルアプリのUUIDのフィールド）
    const loginUser = kintone.getLoginUser();          // ログインユーザ
    let beforeRecords = null;          // 変更前のレコード
    let sortedSubTable = [];          // ソートされたサブテーブル状態を保存するためのグローバル変数作成

    /**
     * 新規・編集・詳細画面
     */
    kintone.events.on([
        'app.record.create.show',
        'app.record.edit.show',
        'app.record.detail.show'
    ], function (event) {
        // UUIDフィールドの非表示
        // 管理ユーザでない場合はUUIDフィールドを隠す。
        if (config.kanriUsers.indexOf(loginUser.code) === -1) {
            kintone.app.record.setFieldShown(uuidField, false);
        }

        // 新規のときは作業員明細テーブルの開始日・終了日に着工予定日・完工予定日とUUIDをセットする。
        if (event.type === 'app.record.create.show') {
            insertUuid(event);
            //担当者検索自動セットする場合に有効とする          insertTantoshaKensaku(event);

            applyReadOnlyToNumField();
        }
        // 編集の場合は編集前のレコードを保存し、UUIDフィールドをdisableに設定する。
        if (event.type === 'app.record.edit.show') {
            beforeRecords = event.record;
            disableUuid(event);
            applyReadOnlyToNumField();
        }
        return event;
        /**
         * UUIDフィールドを編集不可にする。
         * @param event
         */
        function disableUuid(event) {
            const eigyoHokokuSubTable = event.record[cfgLinkage.workTable.name].value;
            eigyoHokokuSubTable.forEach(function (tableRecord) {
                // UUIDフィールドを編集不可に設定する。
                tableRecord.value[uuidField]['disabled'] = true;
            });
        }


        /**
         * 項番のinputをreadonly且つボーダーとシャドウを非表示にする。
         */
        function applyReadOnlyToNumField() {
            const subTableClass = cfgLinkage.workTable.class;
            const no = cfgLinkage.workTable.position;
            $('.' + subTableClass + ' td:nth-of-type(' + no + ') input')
                .attr('readonly', true)
                .css({
                    'border': 'none',
                    'box-shadow': 'none'
                });
        }
    });


    /**
     * 作業員明細テーブルの変更時（行追加）のイベント
     * 開始日・終了日、UUIDフィールドをセットする。
     */
    kintone.events.on([
        'app.record.create.change.' + [cfgTableAppFields.meisaiTB.code],
        'app.record.edit.change.' + [cfgTableAppFields.meisaiTB.code],
        'app.record.create.change.' + [cfgTableAppFields.nyukinBunrui_TB.code],
        'app.record.edit.change.' + [cfgTableAppFields.nyukinBunrui_TB.code],
    ], function (event) {
        //担当者検索自動セットする場合に有効とする          insertTantoshaKensaku(event);
        insertUuid(event);

        return event;
    });


    /**
     * 新規、変更の保存前イベント
     *  ・作業員明細テーブルを取得しソートしリナンバリングする。
     */
    kintone.events.on([
        'app.record.create.submit',
        'app.record.edit.submit'
    ], function (event) {
        const record = event.record;
        const subTableData = record[cfgLinkage.workTable.name].value;
        const noField = cfgTableAppFields.meisaiNo_TB.code;



        sortSubtable(subTableData, cfgLinkage.workTableSortList, cfgLinkage.workTableOrder);
        updateItemNumber(subTableData, noField);
        // データをグローバル変数に保存する
        sortedSubTable = subTableData;
        event.record[cfgLinkage.workTable.name].value = subTableData;
        return event;
    });


    /**
     * 新規の保存成功時イベント
     *  ・連携情報からフィールドコードを設定
     *  ・バルクリクエスト用のデータを作成
     *  ・バルクリクエストを実行
     */
    kintone.events.on([
        'app.record.create.submit.success'
    ], function (event) {
        const koujiId = event.record.$id.value;
        // 工事管理アプリに PUT メソッドを作成する。
        const sortRequest = createUpdateKoujiRequest(koujiId, sortedSubTable);
        // 連携情報からフィールドコードを設定しバルクリクエスト用のデータを作成する。
        const registerData = [];
        // 作業員スケジュールアプリのレコード登録用データを準備する。
        makeYoteiPostData(event.record, sortedSubTable, registerData);
        // 登録データが無ければ処理を終了する。
        if (!registerData.length) return event;
        // リクエストを作成する。
        const requests = [];
        // 作業員スケジュールアプリへの POST メソッド要求を作成する。
        buildRequestData(cfgMeisaiApp.app, registerData, 'post', requests);
        // バルクリクエストを実行する。
        return sncLib.kintone.rest.execBulkRequest([sortRequest, ...requests])
            .then(function () {
                return event;
            }).catch(function (error) {
                // 処理に失敗した場合はsweetAlertでエラーを表示する。
                Swal.fire(cfgLinkage.message.meisaiRegisterError);
                console.log(error);
                return event;
            });

        
        /**
         * 予定・報告レコード登録のデータを作成する。
         * @param record
         * @param registerData
         */
        function makeYoteiPostData(record, sortedSubTable, registerData) {
            const tableLinkageField = cfgLinkage.linkageFields.workTableList; // サブテーブルのフィールド
            for (let i = 0; i < sortedSubTable.length; i++) {
                let fieldValues = {};
                const subTableValues = sortedSubTable[i].value;
                for (let key in subTableValues) {
                    const targetKey = setTargetKey(tableLinkageField, key);
                    fieldValues[targetKey] = { 'value': '' };
                    fieldValues[targetKey]['value'] = subTableValues[key].value;
                }
                // サブテーブル以外のデータ
                cnvFieldByOtherData(record, fieldValues);
                registerData.push(fieldValues);
            }
        }
    });


    /**
     * 編集の保存成功時イベント
     *  ・即時関数スコープの変数の作業一覧サブテーブルの情報とeventレコードのサブテーブルに同じUUIDの有無を確認する。
     *  ・連携情報からフィールドコードを設定
     *  ・バルクリクエスト用のデータを作成
     *  ・バルクリクエストを実行
     */
    kintone.events.on([
        'app.record.edit.submit.success'
    ], function (event) {
        const prevSubTableData = beforeRecords[cfgLinkage.workTable.name].value; // 変更前サブテーブルの情報

        // 削除対象の予定・報告レコードのUUID
        const deleteUuids = getDeleteUuids(sortedSubTable, prevSubTableData);

        // 追加対象の予定・報告レコードのUUID
        const postUuids = getPostUuids(sortedSubTable, prevSubTableData);

        // 追加、更新、削除対象データを格納する配列
        const updateRecords = {
            post: [],
            put: [],
            delete: deleteUuids,
        };
        // 追加と更新のデータを組み立てる。
        getUpdateData(event.record, postUuids, sortedSubTable, prevSubTableData, updateRecords);
        // 追加、更新、削除データが無い場合は処理を終了する。
        if (updateRecords.post.length === 0
            && updateRecords.put.length === 0
            && updateRecords.delete.length === 0) {
            return event;
        }
        // 登録・更新・削除用のリクエストデータを格納する配列
        const yoteiHokokuUpdateData = {
            post: updateRecords.post,
            put: [],
            delete: []
        }

        // 作業員スケジュールアプリのレコードのIDを取得するため、UUIDの検索条件を作成する。
        const query = buildYoteiHokokuQuery(deleteUuids, updateRecords);
        const koujiId = event.record.$id.value;
        // 工事管理アプリに PUT メソッドを作成する。
        const sortRequest = createUpdateKoujiRequest(koujiId, sortedSubTable);
        // 工事管理アプリにPUTメソッドを実行。
        return kintone.api(kintone.api.url('/k/v1/record', true), 'PUT', sortRequest.payload)
            .then(function () {
                // UUIDをキーにして予定・報告レコードを取得する。
                return sncLib.kintone.rest.getAllRecordsOnRecordId(cfgMeisaiApp.app, query);
            }).then(function (res) {
                for (let i = 0; i < res.length; i++) {
                    const recordId = res[i][cfgMeisaiAppFields.recordId.code].value;
                    const recordUuid = res[i][cfgMeisaiAppFields.uuid.code].value;
                    // 更新データを作成する。
                    getTargetPutData(recordUuid, recordId, updateRecords, yoteiHokokuUpdateData);
                    // 削除データを作成する。
                    getTargetDeleteId(recordUuid, recordId, updateRecords, yoteiHokokuUpdateData);
                }
                return yoteiHokokuUpdateData;
            }).then(function (yoteiHokokuUpdateData) {
                const requests = [];
                // リクエストデータを作成する。
                for (let recordType in yoteiHokokuUpdateData) {
                    // 作業員スケジュールアプリへの PUT、POST、DELETE メソッドの作成。
                    buildRequestData(cfgMeisaiApp.app, yoteiHokokuUpdateData[recordType], recordType, requests);
                }
                return requests;
            }).then(function (requests) {
                // 更新対象データがなければ終了
                if (!requests.length) return event;
                return sncLib.kintone.rest.execBulkRequest(requests);
            }).then(function (res) {
                return event;
            }).catch(function (error) {
                // 処理に失敗した場合はsweetAlertでエラーを表示する。
                Swal.fire(cfgLinkage.message.meisaiRegisterError);
                console.log(error);
                return event;
            });

        
        /**
         * 作業サブテーブルの削除対象UUIDを取得する
         * @param {object} currentSubTable  保存時の作業サブテーブル
         * @param {object} prevSubTable     保存前の作業サブテーブル
         */
        function getDeleteUuids(currentSubTable, prevSubTable) {
            // 保存時の作業一覧サブテーブルからUUID配列を抽出する。
            const currentUuids = currentSubTable.map(function (tableRow) {
                return tableRow.value[uuidField].value;
            });

            // 保存前の作業サブテーブルからUUID配列を抽出し、保存時の作業一覧サブテーブルのUUIDとの差分を求める。
            return prevSubTable.map(function (tableRow) {
                return tableRow.value[uuidField].value;
            }).filter(function (prevUuid) {
                // 保存時の作業一覧サブテーブルに存在しないUUIDを返却する。
                return currentUuids.indexOf(prevUuid) === -1
            });
        }


        /**
         * 新規追加の対象のUUIDを求める。
         * @param currentSubTable
         * @param prevSubTable
         */
        function getPostUuids(currentSubTable, prevSubTable) {
            // 保存前の作業一覧サブテーブルからUUID配列を抽出する。
            const prevUuids = prevSubTable.map(function (tableRow) {
                return tableRow.value[uuidField].value;
            });

            // 保存時の作業サブテーブルからUUID配列を抽出し、保存前の作業一覧サブテーブルのUUIDとの差分を求める。
            return currentSubTable.map(function (tableRow) {
                return tableRow.value[uuidField].value;
            }).filter(function (currentUuid) {
                // 保存前の作業一覧サブテーブルに存在しないUUIDを返却する。
                return prevUuids.indexOf(currentUuid) === -1
            });
        }


        /**
         * 登録・更新用のデータを組み立てる。
         * @param record
         * @param postUuids
         * @param currentSubTableValues
         * @param prevSubTableValues
         * @param updateRecords
         */
        function getUpdateData(record, postUuids, currentSubTableValues, prevSubTableValues, updateRecords) {
            let currentUuid;
            // 保存時情報から追加と更新のデータを作成する。
            for (let i = 0; i < currentSubTableValues.length; i++) {
                currentUuid = currentSubTableValues[i].value[uuidField].value;
                const currentSubTableValue = currentSubTableValues[i];

                // 追加対象のUUIDをキーにして登録用データを組み立てる。
                makeUpdatePostData(record, postUuids, currentUuid, currentSubTableValues[i], updateRecords)

                // 保存データと保存前データを比較して更新用データを組み立てる。
                makeUpdateData(record, currentUuid, currentSubTableValue, prevSubTableValues, updateRecords);
            }
            /**
             * 新規登録用データを組み立てる。
             *  ・サブテーブルのUUIDが新規登録対象のUUIDに該当するか確認する。
             *  ・新規登録対象のUUIDの場合は、サブテーブル情報とその他連携情報から追加用データを組み立てる。
             * @param record
             * @param postUuids
             * @param currentUuid
             * @param currentSubTableValues
             * @param updateRecords
             */
            function makeUpdatePostData(record, postUuids, currentUuid, currentSubTableValues, updateRecords) {
                // サブテーブルのUUIDが新規登録対象のUUIDでない場合は処理を終了する。
                if (postUuids.indexOf(currentUuid) === -1) return;

                // フィールドコードを設定して追加用データを作成する。
                const subTableValues = currentSubTableValues.value;

                const tableLinkageField = cfgLinkage.linkageFields.workTableList; // サブテーブルのフィールドコード
                let fieldValues = {};
                for (let key in subTableValues) {
                    const targetKey = setTargetKey(tableLinkageField, key);
                    fieldValues[targetKey] = { 'value': '' };
                    fieldValues[targetKey]['value'] = subTableValues[key].value;
                }
                // サブテーブル以外の追加用データを作成する。
                cnvFieldByOtherData(record, fieldValues);
                updateRecords.post.push(fieldValues);
            }


            /**
             * 更新用データを組み立てる。
             *  ・保存時と保存前のデータの差分を確認する。
             *  ・保存時と保存前のデータに差分がある場合は更新用データを組み立てる。
             * @param record
             * @param currentUuid
             * @param currentSubTableValue
             * @param prevSubTableValues
             * @param updateRecords
             */
            function makeUpdateData(record, currentUuid, currentSubTableValue, prevSubTableValues, updateRecords) {
                for (let i = 0; i < prevSubTableValues.length; i++) {
                    // サブテーブルのUUIDが更新確認のUUIDと異なる場合はループを戻す。
                    const prevUuid = prevSubTableValues[i].value[uuidField].value;
                    if (currentUuid !== prevUuid) continue;

                    // 更新用データデータを作成する。
                    const prevSubTableValue = prevSubTableValues[i];
                    makeData(record, prevSubTableValue, currentSubTableValue, currentUuid, updateRecords);
                }
            }


            /**
             * 更新用データの作成
             * 保存時と保存前のサブテーブル情報とサブテーブル情報以外の連携情報を比較を比較し、異なる場合は更新用データに追加する。
             * @param record
             * @param prevSubTableValue
             * @param currentSubTableValue
             * @param currentUuid
             * @param updateRecords
             */
            function makeData(record, prevSubTableValue, currentSubTableValue, currentUuid, updateRecords) {
                const linkageSubTables = cfgLinkage.linkageFields.workTableList;
                const linkageField = cfgLinkage.linkageFields.renkeiFields;
                let fieldValues = {};

                // サブテーブル情報を比較し異なる場合は更新用データに追加する。
                for (let i = 0; i < linkageSubTables.length; i++) {
                    const fieldCode = linkageSubTables[i].sourceFieldCode;
                    const targetField = linkageSubTables[i].targetFieldCode;
                    const currentValue = currentSubTableValue.value[fieldCode].value; // 保存時データ
                    const prevValue = prevSubTableValue.value[fieldCode].value;       // 保存前データ
                    // 保存時データが未定義もしくは保存時と保存前に差分が無ければループを戻す。
                    if (currentValue === undefined || currentValue === prevValue) continue;
                    fieldValues[targetField] = { 'value': '' }
                    fieldValues[targetField]['value'] = currentValue;
                }
                // サブテーブル以外の追加用データを作成する。
                makeOtherData(record, beforeRecords, fieldValues, linkageField);

                // データが無い場合は処理をスキップする。
                if (Object.keys(fieldValues).length === 0) return;

                updateRecords.put.push({
                    uuid: currentUuid,
                    record: fieldValues
                });
            }


            /**
             * サブテーブル以外のデータ
             * @param currentRecords
             * @param beforeRecords
             * @param fieldValues
             * @param linkageField
             */
            function makeOtherData(currentRecords, beforeRecords, fieldValues, linkageField) {
                for (let i = 0; i < linkageField.length; i++) {
                    const fieldCode = linkageField[i].sourceFieldCode;
                    const targetCode = linkageField[i].targetFieldCode;
                    const currentValue = currentRecords[fieldCode].value; // 保存時データ
                    const prevValue = beforeRecords[fieldCode].value;     // 保存前データ
                    // 保存時と保存前に差分が無ければループを戻す。
                    if (currentValue === prevValue) continue;
                    fieldValues[targetCode] = { 'value': '' }
                    fieldValues[targetCode]['value'] = currentValue;
                }
            }
        }


        /**
         * 削除対象と更新対処のUUIDから予定・報告レコードのクエリ条件を作成する。
         * @param deleteUuids
         * @param updateRecords
         * @returns {string}
         */
        function buildYoteiHokokuQuery(deleteUuids, updateRecords) {
            // 更新対象のUUIDを抽出する。
            const updateUuid = updateRecords.put.map(function (record) {
                return record.uuid;
            });
            // 削除と更新のUUIDの配列を結合する。
            const searchUuids = updateUuid.concat(deleteUuids);
            return searchUuids.map(function (searchUuid) {
                // UUIDの条件を作成し、or で連結する。
                return [cfgMeisaiAppFields.uuid.code] + '="' + searchUuid + '"';
            }).join(' or ');
        }


        /**
         * 更新データの連想配列からレコードのUUIDをキーにしてデータを抽出する。
         * @param recordUuid
         * @param recordId
         * @param updateRecords
         * @param yoteiHokokuUpdateData
         */
        function getTargetPutData(recordUuid, recordId, updateRecords, yoteiHokokuUpdateData) {
            for (let i = 0; i < updateRecords.put.length; i++) {
                const putData = updateRecords.put[i];
                if (putData.uuid === recordUuid) {
                    yoteiHokokuUpdateData.put.push({
                        "id": parseInt(recordId),
                        "record": putData.record
                    });
                }
            }
        }


        /**
         * 削除データUUID配列からレコードのUUIDをキーにしてレコードIDを抽出する。
         * @param recordUuid
         * @param recordId
         * @param updateRecords
         * @param yoteiHokokuUpdateData
         */
        function getTargetDeleteId(recordUuid, recordId, updateRecords, yoteiHokokuUpdateData) {
            for (let i = 0; i < updateRecords.delete.length; i++) {
                const deleteUuid = updateRecords.delete[i];
                if (deleteUuid === recordUuid) {
                    yoteiHokokuUpdateData.delete.push(recordId);
                }
            }
        }
    });


    /**
     * 削除前の確認イベント
     */
    kintone.events.on([
        'app.record.detail.delete.submit',
        'app.record.index.delete.submit'
    ], function (event) {
        const record = event.record;
        const koujiId = record[cfgTableAppFields.koujiId.code].value;
        return new kintone.Promise(function (resolve, reject) {
            resolve(getTantoshaScheduleRecord(koujiId));
        }).then(function (result) {
            if (result.length > 0) {
                // 削除処理をキャンセル
                event.error = cfgLinkage.message.cannotDelete;
            }
            return event;
        }).catch(function (error) {
            console.log(error);
            // 削除処理をキャンセル
            event.error = cfgLinkage.message.error;
            return event;
        });
    });




    /**
    * 作業員スケジュールアプリから1レコードを取得
    * @param {string} koujiId
    * @return {array}
    */
    function getTantoshaScheduleRecord(koujiId) {
        let query = cfgMeisaiAppFields.koujiId.code + ' in ("' + koujiId + '")';
        return sncLib.kintone.rest.getRecord(cfgMeisaiApp.app, query);
    }


    /**
     * UUID(ver4)を生成する。
     * フォーマット： xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
     *  4（バージョン）：2進で 0100 -> 16進で04になる
     *  y（バリアント）：2進で 1ビット目：1、2ビット目：0 となる -> 16進で8～bになる
     *  x：ランダムな16進
     *  ---------------------------
     *      2進     16進   10進
     *      1000    8      8
     *      1001    9      9
     *      1010    a      10
     *      1011    b      11
     *  ---------------------------
     * ＜生成手順＞
     * 1）フォーマットを配列に分解
     * 2）分解した配列の文字列を1文字ずつ取得してパターンに合う文字（※）を生成し、要素を書き換える。
     * 3）配列を結合しUUIDを生成
     * ※）パターン
     *  「x」の場合：0～fのいずれかを生成
     *  「y」の場合：8、9、a、bのいずれかを生成
     *  その他（4と-）の場合：そのまま
     * @see https://github.com/GoogleChrome/chrome-platform-analytics/blob/master/src/internal/identifier.js
     * @returns {string}
     */
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
     * レコード数が100件毎になるようリクエストデータを組み立てる。
     * @param appId
     * @param records
     * @param recordType
     * @param requests
     * @returns {*[]}
     */
    function buildRequestData(appId, records, recordType, requests) {
        // メソッドとデータの取得
        let method = getMethod(recordType);

        if (!records.length) return [];

        // データ格納オブジェクトのテンプレートを作成する。
        let payloadTemplate = makeRequestTemplate(method, appId);
        // データ格納の連想配列を初期化する。
        let payload = $.extend(true, {}, payloadTemplate);
        // データ数が100件ずつになるようレコード配列をチャンクする。
        for (let i = 0; i < records.length; i = i + 100) {
            payload.records = records.slice(i, i + 100);
            addRecord(method, payload, requests)
            // 100件毎にデータ格納の連想配列を初期化する。
            payload = $.extend(true, {}, payloadTemplate);
        }

        function getMethod(recordType) {
            if (recordType === 'post') return 'POST';
            if (recordType === 'put') return 'PUT';
            if (recordType === 'delete') return 'DELETE';
            return null;
        }

        /**
         * メソッド毎のテンプレートを作成する。
         * @param method
         * @param appId
         * @returns {{app, ids: *[]}|{app, records: *[]}}
         */
        function makeRequestTemplate(method, appId) {
            if (method === 'POST' || method === 'PUT') {
                return {
                    'app': appId,
                    'records': []
                }
            }
            if (method === 'DELETE') {
                return {
                    'app': appId,
                    'ids': []
                }
            }
        }


        /**
         * メソッド毎のリクエスト配列に追加
         * @param method
         * @param payload
         * @param requests
         */
        function addRecord(method, payload, requests) {
            requests.push(
                {
                    'method': method,
                    'api': '/k/v1/records.json',
                    'payload': payload
                }
            );
        }

    }


    /**
     * UUIDをセットする。
     * @param event
     */
    function insertUuid(event) {
        const eigyoHokokuSubTable = event.record[cfgLinkage.workTable.name].value;
        eigyoHokokuSubTable.forEach(function (tableRecord) {
            // UUIDフィールドを編集不可に設定する。
            tableRecord.value[uuidField]['disabled'] = true;
            // レコード再利用の場合は、全体のUUIDを割り当て直す。
            if (event.reuse) {
                tableRecord.value[uuidField].value = generateUuid();
            }
            // UUIDフィールドがカラの場合、UUIDをセットする。
            if (!tableRecord.value[uuidField].value) {
                tableRecord.value[uuidField].value = generateUuid();
            }
        });
    }


    /**
     * 担当者検索を作業員明細テーブルにセットする。
     * @param event
     */
    function insertTantoshaKensaku(event) {
        const eigyoHokokuSubTable = event.record[cfgLinkage.workTable.name].value;
        const tantosha = cfgTableAppFields.tantoshaSearch.code;
        const subTableTantosha = cfgTableAppFields.tantoshaSearch_TB.code;
        eigyoHokokuSubTable.forEach(function (tableRecord) {
            // 作業一覧テーブルの担当者検索フィールドがカラの場合、担当者検索の値をセットする。
            if (!tableRecord.value[subTableTantosha].value) {
                tableRecord.value[subTableTantosha].value = event.record[tantosha].value;
                // ルックアップフィールドの自動取得
                tableRecord.value[subTableTantosha].lookup = true;
            }
        });
    }




    /**
     * linkageのリストから対象のフィールドコードを取得する。
     * @param linkage
     * @param key
     * @returns {*}
     */
    function setTargetKey(linkage, key) {
        for (let i = 0; i < linkage.length; i++) {
            if (linkage[i].sourceFieldCode === key) {
                return linkage[i].targetFieldCode;
            }
        }
        return false;
    }


    /**
     * サブテーブル以外のデータ
     * @param record
     * @param fieldValues
     */
    function cnvFieldByOtherData(record, fieldValues) {
        const linkageField = cfgLinkage.linkageFields.renkeiFields;
        for (let key in record) {
            const targetKey = setTargetKey(linkageField, key);
            if (targetKey) {
                fieldValues[targetKey] = { 'value': '' };
                fieldValues[targetKey]['value'] = record[key].value;
            }
        }
    }


    /**
     * 工事管理アプリの更新リクエストを生成
     * @param {String} koujiId
     * @param {Array} workerScheduleTable
     * @return {Object} request
     */
    function createUpdateKoujiRequest(koujiId, workerScheduleTable) {
        // 更新レコードのサブテーブルの値を指定する
        const record = {
            [cfgTableAppFields.meisaiTB.code]: {
                value: workerScheduleTable
            }
        };
        // リクエストを生成
        const request = {
            'method': 'PUT',
            'api': '/k/v1/record.json',
            'payload': {
                'app': cfgTableApp.app,
                'id': koujiId,
                'record': record
            }
        };
        return request;
    }


})(jQuery, window.nokConfig, window.sagyoinTableLinkageConfig, window.snc);
