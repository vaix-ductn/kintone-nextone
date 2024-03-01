/**
 * @fileoverview 建設業版LTパック 工事管理アプリ 
 * 
 *【必要ライブラリ】
 * [JavaScript]
 * jquery.min.js v2.2.3
 * snc.min.js  v1.0.5
 * snc.kintone.min.js v1.0.8
 * snc.nok.min.js v1.0.5
 * config.Nice-ricoh-kintone-plus-kensetuLT-3.5.1.js
 *
 * [CSS]
 * 51-us-default.css
 *
 * @author SNC
 * @version 3.5.0
 * @customer （2023-06-25）
*/
jQuery.noConflict();
(function ($, config, sncLib) {
    'use strict';
    const cfgKouji = config.kouji;
    const cfgKoujiFields = config.kouji.fields;
    let nonEditFields = null;
    let execNum = 0;
    let koujiDataPerPage = null;

    // 着工前物件
    const shinchokuKanriView = [
        {
            fieldCode: cfgKoujiFields.koujiId.code,
        },
        {
            fieldCode: cfgKoujiFields.kokyakumei.code,
        },
        {
            fieldCode: cfgKoujiFields.genbaJusho.code,
        },
        {
            fieldCode: cfgKoujiFields.modelHouseMei.code,
        },
        {
            fieldCode: cfgKoujiFields.series.code,
        },
        {
            fieldCode: cfgKoujiFields.tsubosu.code,
        },
        {
            fieldCode: cfgKoujiFields.juchuKingaku.code,
        },
        {
            fieldCode: cfgKoujiFields.tantoshaMei.code,
        },
        {
            fieldCode: cfgKoujiFields.sekkeiTantoshaMei.code,
        },
        {
            fieldCode: cfgKoujiFields.cdTantoshaMei.code,
        },
        {
            fieldCode: cfgKoujiFields.komuTantoshaMei.code,
        },
        // subtable
        {
            fieldCode: cfgKoujiFields.gaichuTB.code,
            fieldsInSubtable: [
                {
                    fieldCode: cfgKoujiFields.gaichuBunrui_TB.code,
                },
                {
                    fieldCode: cfgKoujiFields.gaichuSearch_TB.code,
                },
                {
                    fieldCode: cfgKoujiFields.gaichuMei_TB.code,
                },
            ]
        },
        {
            fieldCode: cfgKoujiFields.kasaiHoken.code,
        },
        {
            fieldCode: cfgKoujiFields.shihoshoshi.code,
        },
        {
            fieldCode: cfgKoujiFields.ginkoMei.code,
        },
        {
            fieldCode: cfgKoujiFields.kengakuKai.code,
        },
        {
            fieldCode: cfgKoujiFields.nitteiTB.code,
            fieldsInSubtable: [
                {
                    fieldCode: cfgKoujiFields.bunrui_nitteiTB.code,
                },
                {
                    fieldCode: cfgKoujiFields.keiyaku_nitteiTB.code,
                },
                {
                    fieldCode: cfgKoujiFields.keiyakuKin_nitteiTB.code,
                },
                {
                    fieldCode: cfgKoujiFields.tochiKeiyaku_nitteiTB.code,
                },
                {
                    fieldCode: cfgKoujiFields.honYushiMoshikomi_nitteiTB.code,
                },
                {
                    fieldCode: cfgKoujiFields.yushiNaidaku_nitteiTB.code,
                },
                {
                    fieldCode: cfgKoujiFields.tochiKessai_nitteiTB.code,
                },
                {
                    fieldCode: cfgKoujiFields.zumenIrai_nitteiTB.code,
                },
                {
                    fieldCode: cfgKoujiFields.sekkeiHikitsugi_nitteiTB.code,
                },
                {
                    fieldCode: cfgKoujiFields.zumenKakutei_nitteiTB.code,
                },
                {
                    fieldCode: cfgKoujiFields.kakuninShinseiTeishutsu_nitteiTB.code,
                },
                {
                    fieldCode: cfgKoujiFields.kakuninShinseiKyoka_nitteiTB.code,
                },
                {
                    fieldCode: cfgKoujiFields.jibanChosa_nitteiTB.code,
                },
                {
                    fieldCode: cfgKoujiFields.jichinsai_nitteiTB.code
                },
                {
                    fieldCode: cfgKoujiFields.kairyoKoji_nitteiTB.code
                },
                {
                    fieldCode: cfgKoujiFields.chakkoMaeUchiawase_nitteiTB.code
                },
                {
                    fieldCode: cfgKoujiFields.chakkoKinNyukin_nitteiTB.code
                },
                {
                    fieldCode: cfgKoujiFields.chakkoKin_nitteiTB.code
                },
                {
                    fieldCode: cfgKoujiFields.chakko_nitteiTB.code
                },
                {
                    fieldCode: cfgKoujiFields.haikinkensa_nitteiTB.code
                },
                {
                    fieldCode: cfgKoujiFields.kiIshizueKanryo_nitteiTB.code
                },
                {
                    fieldCode: cfgKoujiFields.dodaishiki_nitteiTB.code
                },
                {
                    fieldCode: cfgKoujiFields.jotoKinNyuKinBi_nitteiTB.code
                },
                {
                    fieldCode: cfgKoujiFields.jotoKin_nitteiTB.code
                },
                {
                    fieldCode: cfgKoujiFields.joto_nitteiTB.code
                },
                {
                    fieldCode: cfgKoujiFields.mukuroTaiKensa_nitteiTB.code
                },
                {
                    fieldCode: cfgKoujiFields.bosuiKensa_nitteiTB.code
                },
                {
                    fieldCode: cfgKoujiFields.mokukojiKanryo_nitteiTB.code
                },
                {
                    fieldCode: cfgKoujiFields.kurosuKanryo_nitteiTB.code
                },
                {
                    fieldCode: cfgKoujiFields.kurininguKanryo_nitteiTB.code
                },
                {
                    fieldCode: cfgKoujiFields.shanaiShunko_nitteiTB.code
                },
                {
                    fieldCode: cfgKoujiFields.shunkoNaoshiKanryo_nitteiTB.code
                },
                {
                    fieldCode: cfgKoujiFields.shunko_nitteiTB.code
                },
                {
                    fieldCode: cfgKoujiFields.saishuNyukinBi_nitteiTB.code
                },
                {
                    fieldCode: cfgKoujiFields.nyuKingaku_nitteiTB.code
                },
                {
                    fieldCode: cfgKoujiFields.hikiwatashiBi_nitteiTB.code
                },
            ]
        },
    ];

    // 原価粗利表
    const genkaArariView = [
        {
            fieldCode: cfgKoujiFields.kouji_recordNo.code,
        },
        {
            fieldCode: cfgKoujiFields.kokyakumei.code,
        },
        {
            fieldCode: cfgKoujiFields.modelHouseMei.code,
        },
        {
            fieldCode: cfgKoujiFields.tochiKubun.code,
        },
        {
            fieldCode: cfgKoujiFields.jigyobu.code,
        },
        {
            fieldCode: cfgKoujiFields.series.code,
        },
        {
            fieldCode: cfgKoujiFields.tantoshaMei.code,
        },
        {
            fieldCode: cfgKoujiFields.sekkeiTantoshaMei.code,
        },
        {
            fieldCode: cfgKoujiFields.cdTantoshaMei.code,
        },
        {
            fieldCode: cfgKoujiFields.komuTantoshaMei.code,
        },
        {
            fieldCode: cfgKoujiFields.juchuKingaku.code,
        },
        {
            fieldCode: cfgKoujiFields.arari.code,
        },
        // subtable
        {
            fieldCode: cfgKoujiFields.genkaUriageTB.code,
            fieldsInSubtable: [
                {
                    fieldCode: cfgKoujiFields.bunrui_genkaUriageTB.code,
                },
                {
                    fieldCode: cfgKoujiFields.uriage_genkaUriageTB.code,
                },
                {
                    fieldCode: cfgKoujiFields.genka_genkaUriageTB.code,
                },
                {
                    fieldCode: cfgKoujiFields.arari_genkaUriageTB.code,
                },
                {
                    fieldCode: cfgKoujiFields.arariRitsu_genkaUriageTB.code,
                },
                {
                    fieldCode: cfgKoujiFields.tatemonoHontai_genkaUriageTB.code,
                },
                {
                    fieldCode: cfgKoujiFields.futaiKoji_genkaUriageTB.code,
                },
                {
                    fieldCode: cfgKoujiFields.option_genkaUriageTB.code,
                },
                {
                    fieldCode: cfgKoujiFields.nebikiService_genkaUriageTB.code,
                },
                {
                    fieldCode: cfgKoujiFields.kenchikuShoHiyo_genkaUriageTB.code,
                },
                {
                    fieldCode: cfgKoujiFields.gokei_genkaUriageTB.code,
                },
                {
                    fieldCode: cfgKoujiFields.tatemonoHontaiGenka_genkaUriageTB.code,
                },
                {
                    fieldCode: cfgKoujiFields.futaiKojiGenka_genkaUriageTB.code,
                },
                {
                    fieldCode: cfgKoujiFields.optionGenka_genkaUriageTB.code,
                },
                {
                    fieldCode: cfgKoujiFields.nebikiServiceGenka_genkaUriageTB.code,
                },
                {
                    fieldCode: cfgKoujiFields.kenchikuShoHiyoGenka_genkaUriageTB.code,
                },
                {
                    fieldCode: cfgKoujiFields.gokeiGenka_genkaUriageTB.code,
                },
            ]
        },
        // subtable
        {
            fieldCode: cfgKoujiFields.nyukinJohoTB.code,
            fieldsInSubtable: [
                // {
                //     fieldCode: cfgKoujiFields.ko_nyukinJohoTB.code,
                // },
                {
                    fieldCode: cfgKoujiFields.bunrui_nyukinJohoTB.code,
                },
                {
                    fieldCode: cfgKoujiFields.hidzuke_nyukinJohoTB.code,
                },
                {
                    fieldCode: cfgKoujiFields.kingaku_nyukinJohoTB.code,
                },
                // {
                //     fieldCode: cfgKoujiFields.uuid_nyukinJohoTB.code,
                // },
            ]
        },
        // subtable
        {
            fieldCode: cfgKoujiFields.sonohokaTB.code,
            fieldsInSubtable: [
                // {
                //     fieldCode: cfgKoujiFields.ko_sonohokaTB.code,
                // },
                {
                    fieldCode: cfgKoujiFields.bunrui_sonohokaTB.code,
                },
                {
                    fieldCode: cfgKoujiFields.hidzuke_sonohokaTB.code,
                },
                {
                    fieldCode: cfgKoujiFields.kingaku_sonohokaTB.code,
                },
            ]
        },
    ];

    // 着工前物件
    const chakkoZenBukkenView = [
        {
            fieldCode: cfgKoujiFields.kokyakumei.code,
        },
        {
            fieldCode: cfgKoujiFields.tantoshaMei.code,
        },
        {
            fieldCode: cfgKoujiFields.sekkeiTantoshaMei.code,
        },
        {
            fieldCode: cfgKoujiFields.juchuKingaku.code,
        },
        {
            fieldCode: cfgKoujiFields.arari.code,
        },
        {
            fieldCode: cfgKoujiFields.genbaJusho.code,
        },
        {
            fieldCode: cfgKoujiFields.tochi.code,
        },
        {
            fieldCode: cfgKoujiFields.kaitsuke.code,
        },
        {
            fieldCode: cfgKoujiFields.keiyaku.code,
        },
        {
            fieldCode: cfgKoujiFields.ginkoMei.code,
        },
        {
            fieldCode: cfgKoujiFields.sekkeiHikitsugi.code,
        },
        {
            fieldCode: cfgKoujiFields.jizenShinseiKyoka.code,
        },
        {
            fieldCode: cfgKoujiFields.puranKakutei.code,
        },
        {
            fieldCode: cfgKoujiFields.chakkoYoteiBi.code,
        },
        {
            fieldCode: cfgKoujiFields.kankoYoteiBi.code,
        },
    ];

    /**
     * レコード編集画面（新規、追加）の表示イベント
     * 　フィールドの表示/非表示設定
     * 　フィールドの入力可/否 を設定
    */
    kintone.events.on([
        'app.record.create.show',
        'app.record.edit.show',
        'app.record.index.edit.show',
        'app.record.index.show',
        'app.record.detail.show',
        'app.record.print.show'
    ], function (event) {
        var record = event.record;
        // ログインユーザーのアカウントを取得
        var loginUser = kintone.getLoginUser();

        // 担当者情報の取得
        if (event.type == 'app.record.create.show') {
            // 担当者情報を取得
            record[cfgKoujiFields.tantoshaSearch.code].value = loginUser.code;
            record[cfgKoujiFields.tantoshaSearch.code].lookup = true;

            // 顧客名が設定されていれば、ルックアップを更新
            if (record[cfgKoujiFields.kokyakuSearch.code].value) {
                record[cfgKoujiFields.kokyakuSearch.code].lookup = true;
            }
        }
        // ログインユーザーが管理アカウントではない場合
        if (config.kanriUsers.indexOf(loginUser.code) == -1) {
            // フィールドの表示/非表示設定
            sncLib.nok.util.setAppFieldsShown(cfgKoujiFields);
            if (
                event.type == 'app.record.create.show'
                || event.type == 'app.record.edit.show'
                || event.type == 'app.record.index.edit.show'
            ) {
                // フィールドの入力可/否設定
                sncLib.nok.util.setAppFieldsDisabled(event.record, cfgKoujiFields);
            }
        }
        return event;
    });

    /**
     * レコード編集画面（追加）の表示イベント
     *   レコード追加画面において、GETパラメータに値が設定されている場合、
     * 　パラメータを取得し、フィールドへ値をセット
     */
    kintone.events.on([
        'app.record.create.show'
    ], function (event) {
        // URLよりGETパラメータを取得し、
        // アプリ内にパラメータと一致するフィールドが存在すれば、
        // 値をセットする。
        var vars = sncLib.util.getUrlVars();
        for (var keyCode in vars) {
            if (event.record[keyCode]) {
                event.record[keyCode].value = vars[keyCode];
            }
        }
        return event;
    });

    /**
     * 一覧表示イベント
     *   テーブルを含むすべてのフィールドをリストします
     *   リスト画面のテーブル内のフィールドを編集する
     */
    kintone.events.on('app.record.index.show', async function (event) {

        if (![8446593, 8446605, 8446607].includes(event.viewId)) {
            return event;
        }

        let displayFields = null;
        if (event.viewId === 8446593) {
            // View 進捗管理表
            displayFields = shinchokuKanriView;
        } else if (event.viewId === 8446605) {
            // View 原価粗利表
            displayFields = genkaArariView;
        } else if (event.viewId === 8446607) {
            // View 着工前物件
            displayFields = chakkoZenBukkenView;
        }

        try {
            const formFields = await getKoujiAppFormFields();
            koujiDataPerPage = await getKoujiDataPerPage(event);

            nonEditFields = getNonEditFields(formFields);
            execNum = 0;

            // テーブルの本体とヘッダーをクリアする
            initTable();
            // 固定ヘッダー テーブルのヘッダーを作成する
            createTableHeader('table-fixedheader', formFields, displayFields);
            // データテーブルのヘッダーを作成する
            createTableHeader('table-list-viewer', formFields, displayFields);
            // データテーブル本体を作成する
            createTableBody(displayFields);
            // 固定ヘッダーの幅を調整する
            updateFixedHeaderWidths();
            // 2 番目の固定列の左位置を設定します
            setLeftPositionFixColumn(2);
            // 3 番目の固定列の左位置を設定します
            setLeftPositionFixColumn(3);

            // Editボタンのクリックイベント
            $('#list_viewer_area table').on('click', '.recordlist-edit-gaia', function () {
                handleEditClick(formFields).call(this);
            });

            // Cancelボタンのクリックイベント
            $('#list_viewer_area table').on('click', '.recordlist-cancel-gaia', function () {
                handleCancelClick().call(this);
            });

            // Deleteボタンのクリックイベント
            $('#list_viewer_area table').on('click', '.recordlist-remove-gaia', function () {
                handleRemoveClick().call(this);
            });

            // Saveボタンのクリックイベント
            $('#list_viewer_area table').on('click', '.recordlist-save-gaia', function () {
                handleSaveClick(displayFields).call(this);
            });

            // ウィンドウのサイズ変更イベント時のハンドル
            $(window).on('resize', function () {
                // 固定ヘッダーの幅を調整する
                updateFixedHeaderWidths();
            });

            // イベントが左にスクロールしたときのハンドル
            $('#list_viewer_area').on('scroll', function () {
                const scrollLeft = $(this).scrollLeft();
                $('#table-fixedheader').css('left', `-${scrollLeft}px`);
                setLeftPositionFixColumn(2);
                setLeftPositionFixColumn(3);
            });

            // イベントが下にスクロールしたときのハンドル
            $(window).on('scroll', function () {
                if ($(this).scrollTop() > 416) {
                    // 固定ヘッダーの幅を調整する
                    updateFixedHeaderWidths();
                    $('#table-fixedheader').css('display', '');
                } else {
                    $('#table-fixedheader').css('display', 'none');
                }
            });

        } catch (error) {
            showErrorMessage(error);
        }
    });

    /**
     * 工事アプリのフォームフィールドを取得する
     * @returns {Promise}
     */
    function getKoujiAppFormFields() {
        return sncLib.kintone.rest.getAppFormFields(cfgKouji.app);
    };

    /**
     * ページごとの工事データを取得する
     * @param {Object} event
     * @returns {Array}
     */
    async function getKoujiDataPerPage(event) {
        const koujiData = await getKoujiData();
        koujiData.sort(function (a, b) {
            return b[cfgKoujiFields.kouji_recordNo.code].value - a[cfgKoujiFields.kouji_recordNo.code].value;
        });
        const viewSettings = await getViewPagerSetting();
        if (viewSettings.views[event.viewName].pager && viewSettings.views[event.viewName].pager === true) {
            const perPage = getPerPageInfo();
            return koujiData.slice(perPage.from - 1, perPage.to);
        }
    }

    /**
     * 工事データを取得する
     * @returns {Promise}
     */
    function getKoujiData() {
        return sncLib.kintone.rest.getAllRecordsOnRecordId(
            cfgKouji.app,
            '',
        );
    };

    /**
     * ビューページャ設定を取得する
     * @returns {Promise}
     */
    function getViewPagerSetting() {
        return kintone.api('/k/v1/preview/app/views', 'GET', { 'app': cfgKouji.app });
    }

    /**
     * ページごとの情報を取得する
     * @returns {Object} perPageObj
     */
    function getPerPageInfo() {
        const perPageObj = {}
        const pagerElem = $('.gaia-argoui-app-index-pager:first');
        if (pagerElem) {
            const perPageInfo = pagerElem.find('span:first').text();
            const numberRegex = /\d+/g;
            if (perPageInfo) {
                perPageObj.from = perPageInfo.match(numberRegex)[0];
                perPageObj.to = perPageInfo.match(numberRegex)[1];
            }
        }
        return perPageObj;
    }

    /**
     * 編集以外のフィールドを取得する
     * @param {Object} formFields
     * @returns {Array}
     */
    function getNonEditFields(formFields) {
        // 無効なフィールドを取得する
        const disabledFields = getDisabledFields();
        // レコード番号フィールドを取得する
        const recordNumberFields = getRecordNumberFields(formFields);
        // 計算フィールドを取得する
        const calculateFields = getCalculateFields(formFields);
        // ルックアップフィールドを取得する
        const lookupFields = getLookupFields(formFields);
        // 重複値のない配列を返します
        return [...new Set([...disabledFields, ...recordNumberFields, ...calculateFields, ...lookupFields])];
    }

    /**
     * 無効なフィールドを取得する
     * @returns {Array} disabledFields
     */
    function getDisabledFields() {
        const disabledFields = [];
        for (const key in cfgKoujiFields) {
            if (cfgKoujiFields[key].hasOwnProperty('disabled') && cfgKoujiFields[key]['disabled'] === true) {
                disabledFields.push(cfgKoujiFields[key]['code'])
            }
        }
        return disabledFields;
    }

    /**
     * レコード番号フィールドを取得する
     * @param {Object} formFields
     * @returns {Array} recordNumberFields
     */
    function getRecordNumberFields(formFields) {
        const recordNumberFields = [];
        const formFieldsProp = formFields.properties;
        for (const key in formFieldsProp) {
            if (formFieldsProp[key].type === 'RECORD_NUMBER') {
                recordNumberFields.push(key);
            }
        }
        return recordNumberFields;
    }

    /**
     * 計算フィールドを取得する
     * @param {Object} formFields
     * @returns {Array} calFields
     */
    function getCalculateFields(formFields) {
        const calFields = [];
        const formFieldsProp = formFields.properties;
        for (const key in formFieldsProp) {
            if (formFieldsProp[key].type === 'SUBTABLE') {
                const subTableFields = formFieldsProp[key].fields;
                for (const keyField in subTableFields) {
                    if (subTableFields[keyField].type === 'CALC') {
                        calFields.push(keyField);
                    }
                }
            } else if (formFieldsProp[key].type === 'CALC') {
                calFields.push(key);
            }
        }
        return calFields;
    }

    /**
     * ルックアップフィールドを取得する
     * @param {Object} formFields
     * @returns {Array} lookupFields
     */
    function getLookupFields(formFields) {
        const lookupFields = [];
        const formFieldsProp = formFields.properties;
        for (const key in formFieldsProp) {
            if (formFieldsProp[key].type === 'SUBTABLE') {
                const subTableFields = formFieldsProp[key].fields;
                for (const keyField in subTableFields) {
                    if (subTableFields[keyField].hasOwnProperty('lookup')) {
                        lookupFields.push(keyField);
                        const fieldMappings = subTableFields[keyField].lookup.fieldMappings;
                        fieldMappings.forEach(function (obj) {
                            lookupFields.push(obj.field);
                        });
                    }
                }
            } else if (formFieldsProp[key].hasOwnProperty('lookup')) {
                lookupFields.push(key);
                const fieldMappings = formFieldsProp[key].lookup.fieldMappings;
                fieldMappings.forEach(function (obj) {
                    lookupFields.push(obj.field);
                });
            }
        }
        return lookupFields;
    }

    /**
     * 表の出力領域の初期化
     */
    function initTable() {
        // テーブルヘッダーをクリアする
        $('#list_viewer_area table#table-list-viewer').find('thead').empty();
        // クリアテーブル本体
        $('#list_viewer_area table#table-list-viewer').find('tbody').empty();
    };

    /**
     * テーブルヘッダーを作成する
     * @param {String} tableId
     * @param {Object} formFields
     * @param {Object} displayFields
     */
    function createTableHeader(tableId, formFields, displayFields) {
        const table = $(`table#${tableId}`);
        const tableHead = table.find('thead');
        const headers = getHeaderList(formFields, displayFields);

        $('<th class="recordlist-header-cell-gaia">').appendTo(tableHead);

        for (const item of headers) {
            const thElem = $(`<th class="recordlist-header-cell-gaia" style="min-width:${item.minWidth}">`).appendTo(tableHead);
            const divOuterElem = $(`<div class="recordlist-header-cell-inner-wrapper-gaia">`).appendTo(thElem);
            const divInnerElem = $(`<div class="recordlist-header-cell-inner-gaia">`).appendTo(divOuterElem);
            const spanElem = $(`<span class="recordlist-header-label-gaia">`).text(item.code).appendTo(divInnerElem);
        }

        $('<th class="recordlist-header-cell-gaia">').appendTo(tableHead);
    }

    /**
     * ヘッダーリストを取得する
     * @param {Object} formFields
     * @param {Object} displayFields
     * @returns {Array} headers
     */
    function getHeaderList(formFields, displayFields) {
        const headers = [];
        displayFields.forEach(function (obj) {
            if (obj.hasOwnProperty('fieldsInSubtable')) {
                obj['fieldsInSubtable'].forEach(function (item) {
                    headers.push({
                        'code': formFields.properties[obj.fieldCode].fields[item.fieldCode].label,
                        'minWidth': '100px'
                    });
                })
            } else {
                headers.push({
                    'code': formFields.properties[obj.fieldCode].label,
                    'minWidth': '100px'
                });
            }
        });
        return headers;
    }

    /**
     * テーブル本体を作成する
     * @param {Object} displayFields
     * @param {Array} koujiData
     */
    function createTableBody(displayFields) {
        const tableBody = $('#list_viewer_area table#table-list-viewer').find('tbody');
        koujiDataPerPage.forEach(function (record, indexRecord) {
            const maxRowSpan = getMaxRowSpan(record, displayFields);
            for (let i = 1; i <= maxRowSpan; i++) {
                // レコードごとに行を作成する
                const tableRow = $(`<tr class="recordlist-row-gaia record-${indexRecord % 2 === 0 ? 'even' : 'odd'}">`).appendTo(tableBody);
                if (i === 1) {
                    createCellLink(tableRow, record, maxRowSpan);
                }
                for (const field of displayFields) {
                    if (field.hasOwnProperty('fieldsInSubtable')) {
                        createCellSubtable(tableRow, record, field, i, maxRowSpan);
                    } else {
                        createCellNormalField(tableRow, record, field, i, maxRowSpan);
                    }
                }
                if (i === 1) {
                    createButtonCell(tableRow, maxRowSpan);
                }
            }
        });
    }

    /**
     * 最大行スパンを取得する
     * @param {Object} record
     * @param {Object} displayFields
     * @returns {Number} maxRowSpan
     */
    function getMaxRowSpan(record, displayFields) {
        let maxRowSpan = 1;
        for (const field of displayFields) {
            if (Array.isArray(record[field.fieldCode].value) && record[field.fieldCode].value.length > maxRowSpan) {
                maxRowSpan = record[field.fieldCode].value.length;
            }
        }
        return maxRowSpan;
    }

    /**
     * セルリンクを作成する
     * @param {Object} tableRow
     * @param {Object} record
     * @param {Number} maxRowSpan
     */
    function createCellLink(tableRow, record, maxRowSpan) {
        const rowLink = $(`<td class="recordlist-cell-gaia" rowspan="${maxRowSpan}">`).appendTo(tableRow);
        const lnk = $(`<a class="record-icon-detail">`).appendTo(rowLink);
        lnk.attr('href', `/k/${cfgKouji.app}/show#record=${record[cfgKoujiFields.recordId.code].value}`);
        lnk.attr('target', '_blank');
        lnk.attr('title', 'Show the record details');
    }

    /**
     * サブテーブルのセルを作成する
     * @param {Object} tableRow
     * @param {Object} record
     * @param {Object} field
     * @param {Number} i
     * @param {Number} maxRowSpan
     */
    function createCellSubtable(tableRow, record, field, i, maxRowSpan) {
        field['fieldsInSubtable'].forEach(function (item) {
            if (record[field.fieldCode].value.length > 0) {
                const blankRows = maxRowSpan - record[field.fieldCode].value.length;
                // サブテーブルは要素の配列です
                record[field.fieldCode].value.forEach(function (subItem, index) {
                    if (index + 1 === i) {
                        const tableData = $(`<td subtable=${field.fieldCode} class="recordlist-cell-gaia">`).appendTo(tableRow);
                        const divEle = $(`<div fieldcode=${item.fieldCode}>`).appendTo(tableData);
                        const spanEle = $(`<span>`).text(subItem.value[item.fieldCode].value).appendTo(divEle);
                    }
                });

                for (let j = 1; j <= blankRows; j++) {
                    if (blankRows > 0 && record[field.fieldCode].value.length + j === i) {
                        const tableData = $(`<td subtable=${field.fieldCode} class="recordlist-cell-gaia">`).appendTo(tableRow);
                        const divEle = $(`<div fieldcode=${item.fieldCode}>`).appendTo(tableData);
                        const spanEle = $(`<span>`).appendTo(divEle);
                    }
                }
            } else {
                // サブテーブルは空の配列です
                const tableData = $(`<td subtable=${field.fieldCode} class="recordlist-cell-gaia">`).appendTo(tableRow);
                const divEle = $(`<div fieldcode=${item.fieldCode}>`).appendTo(tableData);
                const spanEle = $(`<span>`).appendTo(divEle);
            }
        });
    }

    /**
     * 通常フィールドのセルを作成する
     * @param {Object} tableRow
     * @param {Object} record
     * @param {Object} field
     * @param {Number} i
     * @param {Number} maxRowSpan
     */
    function createCellNormalField(tableRow, record, field, i, maxRowSpan) {
        if (i === 1) {
            const tableData = $(`<td class="recordlist-cell-gaia" rowspan="${maxRowSpan}">`).appendTo(tableRow);
            const divEle = $(`<div fieldcode=${field.fieldCode}>`).appendTo(tableData);
            const spanEle = $(`<span>`).text(record[field.fieldCode].value).appendTo(divEle);
        }
    }

    /**
     * ボタン電池を作成する
     * @param {Object} tableRow
     * @param {Number} maxRowSpan
     */
    function createButtonCell(tableRow, maxRowSpan) {
        const rowButton = $(`<td class="recordlist-cell-gaia recordlist-action-gaia" rowspan="${maxRowSpan}">`).appendTo(tableRow);
        const btnContainer = $('<div class="recordlist-cell-edit-and-remove-action">').appendTo(rowButton);
        // Edit ボタン
        const editBtn = $('<button type="button" class="recordlist-edit-gaia" title="Edit">').appendTo(btnContainer);
        const imageEditBtn = $('<image class="recordlist-edit-icon-gaia">').appendTo(editBtn);
        imageEditBtn.attr('src', 'https://static.cybozu.com/contents/k/image/argo/component/recordlist/record-edit.png');

        // Delete ボタン
        const deleteBtn = $('<button type="button" class="recordlist-remove-gaia" title="Delete">').appendTo(btnContainer);
        const imageDeleteBtn = $('<image class="recordlist-remove-icon-gaia">').appendTo(deleteBtn);
        imageDeleteBtn.attr('src', 'https://static.cybozu.com/contents/k/image/argo/component/recordlist/record-delete.png');
    }

    /**
     * 固定ヘッダー幅を更新する
     */
    function updateFixedHeaderWidths() {
        $('#table-list-viewer thead th').each(function (index) {
            // 列幅を取得する
            const width = $(this).width();
            // #table-fixedheader の対応する列に幅を適用します
            $('#table-fixedheader thead th').eq(index).css('min-width', width);
        });
    }

    /**
     * 固定列の左位置を設定します
     * @param {Number} columnIndex
     */
    function setLeftPositionFixColumn(columnIndex) {
        const prevColElement = $(`#list_viewer_area table td:nth-child(${columnIndex - 1})`);
        if (!prevColElement.length) {
            return;
        }
        const prevColLeft = parseFloat(prevColElement.css('left'));
        const prevColWidth = parseFloat(prevColElement.css('width'));
        const prevColPaddingLeft = parseFloat(prevColElement.css('padding-left'));
        const prevColPaddingRight = parseFloat(prevColElement.css('padding-right'));
        const prevColBorderLeftWidth = parseFloat(prevColElement.css('border-left-width'));
        const prevColBorderRightWidth = parseFloat(prevColElement.css('border-right-width'));
        const newLeftValue = prevColLeft + prevColWidth + prevColPaddingLeft + prevColPaddingRight + prevColBorderLeftWidth + prevColBorderRightWidth;
        const targetDataCells = $(`td:nth-child(${columnIndex})`);
        const targetHeaderCells = $(`th:nth-child(${columnIndex})`);
        targetDataCells.each(function() {
            $(this).css('left', `${newLeftValue}px`);
        });

        targetHeaderCells.each(function() {
            $(this).css('left', `${newLeftValue}px`);
        });
    }

    /**
     * ハンドル編集クリック
     * @param {Object} formFields
     */
    function handleEditClick(formFields) {
        return function () {
            execNum++;
            if (execNum > 1) {
                execNum--;
                return;
            }

            $('.removelink-confirm-cybozu').remove();
            const $row = $(this).closest('tr');
            const rowspan = $row.find('td:first-child').attr('rowspan');
            const recordUrl = $row.find('td:first-child a').attr('href');
            const recordId = recordUrl.split("=")[1];
            const records = koujiDataPerPage.filter(function (item) {
                return item[cfgKoujiFields.kouji_recordNo.code].value === recordId;
            });
            const record = records[0];
            // 最初の行のハンドル
            $row.find('td:not(:first-child):not(:last-child)').each(function () {
                const text = $(this).text();
                const subtableFieldCode = $(this).attr('subtable');
                const divEle = $(this).find('div');
                const itemFieldCode = divEle.attr('fieldcode');

                if (!nonEditFields.includes(itemFieldCode)) {
                    createEditForm(formFields, subtableFieldCode, itemFieldCode, text, divEle, record, 0);
                    $(this).find('span').remove();
                }
            });
            // 次の行のハンドル
            if (rowspan > 1) {
                const rowIndex = $row.index();
                $row.nextAll(`:lt(${rowspan - 1})`).find('td').each(function () {
                    const subtableFieldCode = $(this).attr('subtable');
                    const text = $(this).text();
                    const divEle = $(this).find('div');
                    const itemFieldCode = divEle.attr('fieldcode');
                    const currentRowIndex = $(this).closest('tr').index();
                    const relativeIndex = currentRowIndex - rowIndex;

                    if (!nonEditFields.includes(itemFieldCode)) {
                        createEditForm(formFields, subtableFieldCode, itemFieldCode, text, divEle, record, relativeIndex);
                        $(this).find('span').remove();
                    }
                });
            }
            // 編集削除ボタンを保存キャンセルボタンに切り替えます
            toggleEditDeleteToSaveCancel($row);
            // 固定ヘッダーの幅を調整する
            updateFixedHeaderWidths();
            // 右にスクロールし続ける
            scrollRight();
        }
    }

    /**
     * 編集削除ボタンを保存キャンセルボタンに切り替えます
     * @param {Object} $row
     */
    function toggleEditDeleteToSaveCancel($row) {
        //「Edit」ボタンのタイトルを変更します
        $row.find('.recordlist-edit-gaia').attr('title', 'Save');
        $row.find('.recordlist-edit-gaia').toggleClass('recordlist-edit-gaia recordlist-save-gaia');

        //「Delete」ボタンのタイトルを変更します
        $row.find('.recordlist-remove-gaia').attr('title', 'Cancel');
        $row.find('.recordlist-remove-gaia').toggleClass('recordlist-remove-gaia recordlist-cancel-gaia');

        // image要素のsrcとclassを変更する
        $row.find('img.recordlist-edit-icon-gaia').attr('src', 'https://static.cybozu.com/contents/k/image/argo/component/recordlist/record-save16.png');
        $row.find('img.recordlist-edit-icon-gaia').toggleClass('recordlist-edit-icon-gaia recordlist-save-icon-gaia');

        $row.find('img.recordlist-remove-icon-gaia').attr('src', 'https://static.cybozu.com/contents/k/image/argo/component/recordlist/record-cancel-centered.png');
        $row.find('img.recordlist-remove-icon-gaia').toggleClass('recordlist-remove-icon-gaia recordlist-cancel-icon-gaia');

        // 他の行の「Edit」ボタンと「Delete」ボタンを非表示にします。
        $('#list_viewer_area table').find('.recordlist-edit-gaia, .recordlist-remove-gaia').not($row.find('.recordlist-edit-gaia, .recordlist-remove-gaia')).hide();
    }

    /**
     * ハンドルキャンセルクリック
     */
    function handleCancelClick() {
        return async function () {
            execNum--;
            if (execNum < 0) {
                execNum++;
                return;
            }
            const $row = $(this).closest('tr');
            const recordUrl = $row.find('td:first-child a').attr('href');
            const recordId = recordUrl.split("=")[1];
            const rowspan = $row.find('td:first-child').attr('rowspan');
            try {
                const records = await getKoujiRecord(recordId);
                const record = records[0];
                // 最初の行のハンドル
                $row.find('td:not(:first-child):not(:last-child)').each(function () {
                    $(this).find('input').remove();
                    $(this).find('select').remove();
                    const subtableFieldCode = $(this).attr('subtable');
                    const divEle = $(this).find('div');
                    const itemFieldCode = divEle.attr('fieldcode');
                    if (!nonEditFields.includes(itemFieldCode)) {
                        if (!subtableFieldCode) {
                            $('<span>').text(record[itemFieldCode].value).appendTo(divEle);
                        } else {
                            if (record[subtableFieldCode].value[0]) {
                                $('<span>').text(record[subtableFieldCode].value[0].value[itemFieldCode].value).appendTo(divEle);
                            }
                        }
                    }
                });
                // 次の行のハンドル
                if (rowspan > 1) {
                    const rowIndex = $row.index();
                    $row.nextAll(`:lt(${rowspan - 1})`).find('td').each(function () {
                        $(this).find('input').remove();
                        $(this).find('select').remove();
                        const subtableFieldCode = $(this).attr('subtable');
                        const divEle = $(this).find('div');
                        const itemFieldCode = divEle.attr('fieldcode');
                        const currentRowIndex = $(this).closest('tr').index();
                        const relativeIndex = currentRowIndex - rowIndex;
                        if (!nonEditFields.includes(itemFieldCode)) {
                            if (record[subtableFieldCode].value[relativeIndex]) {
                                $('<span>').text(record[subtableFieldCode].value[relativeIndex].value[itemFieldCode].value).appendTo(divEle);
                            }
                        }
                    });
                }
            } catch (error) {
                showErrorMessage(error);
            }
            // 保存キャンセルボタンを編集削除ボタンに切り替えます
            toggleSaveCancelToEditDelete($row);
            // 固定ヘッダーの幅を調整する
            updateFixedHeaderWidths();
            // 右にスクロールし続ける
            scrollRight();
        }
    }

    /**
     * 保存キャンセルボタンを編集削除ボタンに切り替えます
     * @param {Object} $row
     */
    function toggleSaveCancelToEditDelete($row) {
        //「Cancel」ボタンのタイトルを変更します
        $row.find('.recordlist-cancel-gaia').attr('title', 'Delete');
        $row.find('.recordlist-cancel-gaia').toggleClass('recordlist-cancel-gaia recordlist-remove-gaia');

        //「Save」ボタンのタイトルを変更します
        $row.find('.recordlist-save-gaia').attr('title', 'Edit');
        $row.find('.recordlist-save-gaia').toggleClass('recordlist-save-gaia recordlist-edit-gaia');

        // image要素のsrcとclassを変更する
        $row.find('img.recordlist-save-icon-gaia').attr('src', 'https://static.cybozu.com/contents/k/image/argo/component/recordlist/record-edit.png');
        $row.find('img.recordlist-save-icon-gaia').toggleClass('recordlist-save-icon-gaia recordlist-edit-icon-gaia');

        $row.find('img.recordlist-cancel-icon-gaia').attr('src', 'https://static.cybozu.com/contents/k/image/argo/component/recordlist/record-delete.png');
        $row.find('img.recordlist-cancel-icon-gaia').toggleClass('recordlist-cancel-icon-gaia recordlist-remove-icon-gaia');

        // 他の行に「編集」ボタンと「削除」ボタンを表示します。
        $('#list_viewer_area table').find('.recordlist-edit-gaia, .recordlist-remove-gaia').show();
    }


    /**
     * ハンドル取り外しクリック
     */
    function handleRemoveClick() {
        return function () {
            $('.removelink-confirm-cybozu').remove();

            // 挿入確認ダイアログ
            const confirmBox = $('<div class="removelink-confirm-cybozu removelink-confirm-container removelink-popup-cybozu">' +
            '<span class="removelink-confirm-label-cybozu">Are you sure you want to delete?</span>' +
            '<span class="removelink-confirm-btns-cybozu">' +
            '<a class="removelink-confirm-btn-cybozu cancelBtn" style="cursor: pointer;">Cancel</a>' +
            '<a class="removelink-confirm-btn-cybozu deleteBtn" style="cursor: pointer;">Delete</a>' +
            '</span></div>');
            $('body').append(confirmBox);

            // 表示ダイアログの位置を計算する
            const $button = $(this);
            const buttonOffset = $button.offset();
            const rightPos = $(window).width() - (buttonOffset.left + $button.outerWidth());
            const topPos = buttonOffset.top + $button.outerHeight();
            confirmBox.css({
                'top': topPos + 'px',
                'right': rightPos + 'px'
            });

            // 「Cancel」ボタンをクリックしたときの処理
            confirmBox.find('.cancelBtn').click(function() {
                confirmBox.remove();
            });

            // 「Delete」ボタンをクリックしたときの処理
            confirmBox.find('.deleteBtn').click(async function () {
                const recordUrl = $button.closest('tr').find('td:first-child a').attr('href');
                const recordId = recordUrl.split("=")[1];
                try {
                    await kintone.api(kintone.api.url('/k/v1/records.json', true), 'DELETE', { app: cfgKouji.app, ids: [recordId] });
                    confirmBox.remove();

                    var $row = $button.closest('tr');
                    var rowspan = $row.find('td:first-child').attr('rowspan');
                    if (rowspan > 1) {
                        $row.nextAll(`:lt(${rowspan - 1})`).remove();
                    }
                    $row.remove();

                } catch (error) {
                    showErrorMessage(error);
                }
            });
        }
    }


    /**
     * 保存クリックをハンドルします
     * @param {Object} displayFields
     */
    function handleSaveClick(displayFields) {
        return async function () {
            execNum--;
            if (execNum < 0) {
                execNum++;
                return;
            }
            const recordUrl = $(this).closest('tr').find('td:first-child a').attr('href');
            const recordId = recordUrl.split("=")[1];
            const oldRecords = koujiDataPerPage.filter(function (item) {
                return item[cfgKoujiFields.kouji_recordNo.code].value === recordId;
            });
            const oldRecord = oldRecords[0];
            const $row = $(this).closest('tr');
            const rowspan = $row.find('td:first-child').attr('rowspan');
            const originalContentObj = initOriginalContent(displayFields, rowspan, oldRecord);

            // 最初の行のハンドル
            $row.find('td:not(:first-child):not(:last-child)').each(function () {
                const inputValue = $(this).find('div input').val() || $(this).find('div select').val();
                const itemFieldCode = $(this).find('div').attr('fieldcode');
                const subtableFieldCode = $(this).attr('subtable');
                $(this).find('span').text = inputValue;
                if (!nonEditFields.includes(itemFieldCode)) {
                    if (subtableFieldCode) {
                        if (originalContentObj[subtableFieldCode].value[0]) {
                            originalContentObj[subtableFieldCode].value[0].value[itemFieldCode].value = inputValue;
                        }
                    } else {
                        originalContentObj[itemFieldCode].value = inputValue;
                    }
                }
            });
            // 次の行のハンドル
            if (rowspan > 1) {
                const rowIndex = $row.index();
                $row.nextAll(`:lt(${rowspan - 1})`).find('td').each(function () {
                    const subtableFieldCode = $(this).attr('subtable');
                    const inputValue = $(this).find('div input').val() || $(this).find('div select').val();
                    $(this).find('span').text = inputValue;
                    const itemFieldCode = $(this).find('div').attr('fieldcode');
                    const currentRowIndex = $(this).closest('tr').index();
                    const relativeIndex = currentRowIndex - rowIndex;
                    if (!nonEditFields.includes(itemFieldCode)) {
                        if (originalContentObj[subtableFieldCode].value[relativeIndex]) {
                            originalContentObj[subtableFieldCode].value[relativeIndex].value[itemFieldCode].value = inputValue;
                        }
                    }
                });
            }

            const body = {
                'app': cfgKouji.app,
                'id': recordId,
                'record': { ...originalContentObj }
            }

            try {
                await kintone.api(kintone.api.url('/k/v1/record.json', true), 'PUT', body);
                const records = await getKoujiRecord(recordId);
                const record = records[0];
                // 最初の行のハンドル
                $row.find('td:not(:first-child):not(:last-child)').each(function () {
                    $(this).find('input').remove();
                    $(this).find('select').remove();
                    $(this).find('span').remove();
                    const subtableFieldCode = $(this).attr('subtable');
                    const divEle = $(this).find('div');
                    const itemFieldCode = divEle.attr('fieldcode');
                    if (!subtableFieldCode) {
                        $('<span>').text(record[itemFieldCode].value).appendTo(divEle);
                    } else {
                        if (record[subtableFieldCode].value[0]) {
                            $('<span>').text(record[subtableFieldCode].value[0].value[itemFieldCode].value).appendTo(divEle);
                        }
                    }
                });
                // 次の行のハンドル
                if (rowspan > 1) {
                    const rowIndex = $row.index();
                    $row.nextAll(`:lt(${rowspan - 1})`).find('td').each(function () {
                        $(this).find('input').remove();
                        $(this).find('select').remove();
                        $(this).find('span').remove();
                        const subtableFieldCode = $(this).attr('subtable');
                        const divEle = $(this).find('div');
                        const itemFieldCode = divEle.attr('fieldcode');
                        const currentRowIndex = $(this).closest('tr').index();
                        const relativeIndex = currentRowIndex - rowIndex;
                        if (record[subtableFieldCode].value[relativeIndex]) {
                            $('<span>').text(record[subtableFieldCode].value[relativeIndex].value[itemFieldCode].value).appendTo(divEle);
                        }
                    });
                }
            } catch (error) {
                showErrorMessage(error);
            }

            // 保存キャンセルボタンを編集削除ボタンに切り替えます
            toggleSaveCancelToEditDelete($row);
            // 固定ヘッダーの幅を調整する
            updateFixedHeaderWidths();
            // 右にスクロールし続ける
            scrollRight();
        }
    }

    /**
     * 編集フォームを作成する
     * @param {Object} formFields
     * @param {String} subtableFieldCode
     * @param {String} itemFieldCode
     * @param {String} fieldValue
     * @param {Object} divEle
     * @param {Object} record
     * @param {Number} index
     */
    function createEditForm(formFields, subtableFieldCode, itemFieldCode, fieldValue, divEle, record, index) {
        if (subtableFieldCode) {
            if (record[subtableFieldCode] && record[subtableFieldCode].value[index]) {
                const fieldType = formFields.properties[subtableFieldCode].fields[itemFieldCode].type;
                if (fieldType === "DATE") {
                    const inputEle = $(`<input type="date">`).appendTo(divEle);
                    inputEle.val(fieldValue);
                } else if (fieldType === "DROP_DOWN") {
                    const options = Object.keys(formFields.properties[subtableFieldCode].fields[itemFieldCode].options);
                    const selectEle = $('<select>').appendTo(divEle);
                    $('<option value="">').text('').appendTo(selectEle);
                    options.forEach(function (option) {
                        if (option === fieldValue) {
                            $(`<option selected value=${option}>`).text(option).appendTo(selectEle);
                        } else {
                            $(`<option value=${option}>`).text(option).appendTo(selectEle);
                        }
                    });
                } else if (fieldType === "NUMBER") {
                    const inputEle = $(`<input type="number" class="recordlist-forms-number-gaia">`).appendTo(divEle);
                    inputEle.val(fieldValue);
                } else {
                    const inputEle = $(`<input type="text" class="recordlist-forms-text-gaia">`).appendTo(divEle);
                    inputEle.val(fieldValue);
                }
            }
        } else {
            const fieldType = formFields.properties[itemFieldCode].type;
            if (fieldType === "DATE") {
                const inputEle = $(`<input type="date">`).appendTo(divEle);
                inputEle.val(fieldValue);
            } else if (fieldType === "DROP_DOWN") {
                const options = Object.keys(formFields.properties[itemFieldCode].options);
                const selectEle = $('<select>').appendTo(divEle);
                $('<option value="">').text('').appendTo(selectEle);
                options.forEach(function (option) {
                    if (option === fieldValue) {
                        $(`<option selected value=${option}>`).text(option).appendTo(selectEle);
                    } else {
                        $(`<option value=${option}>`).text(option).appendTo(selectEle);
                    }
                });
            } else if (fieldType === "NUMBER") {
                const inputEle = $(`<input type="number" class="recordlist-forms-number-gaia">`).appendTo(divEle);
                inputEle.val(fieldValue);
            } else {
                const inputEle = $(`<input type="text" class="recordlist-forms-text-gaia">`).appendTo(divEle);
                inputEle.val(fieldValue);
            }
        }
    }

    /**
     * 右にスクロールし続ける
     */
    function scrollRight() {
        const table = $('#table-list-viewer').get(0);
        const scrollX = table.scrollWidth;
        $('#list_viewer_area').scrollLeft(scrollX);
    }

    /**
     * 初期オリジナルレコードの内容
     * @param {Object} displayFields
     * @param {Number} rowspan
     * @param {Object} oldRecord
     * @returns {Object} originalContents
     */
    function initOriginalContent(displayFields, rowspan, oldRecord) {
        const originalContents = {};
        for (const field of displayFields) {
            if (field.hasOwnProperty('fieldsInSubtable')) {
                const tempArray = [];
                for (let i = 0; i < rowspan; i++) {
                    if (i >= oldRecord[field.fieldCode].value.length) {
                        break;
                    }
                    const tempObject = {};
                    field.fieldsInSubtable.forEach(function (item) {
                        if (!nonEditFields.includes(item.fieldCode)) {
                            tempObject[item.fieldCode] = { value: '' };
                        }
                    });
                    tempArray.push({ value: tempObject });
                }
                originalContents[field.fieldCode] = { value: tempArray };
            } else {
                if (!nonEditFields.includes(field.fieldCode)) {
                    originalContents[field.fieldCode] = { value: '' };
                }
            }
        }
        return originalContents;
    }


    /**
     * エラーメッセージを表示
     * @param {Object} error
     * @returns SweetAlert Object
     */
    function showErrorMessage (error) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: error.message
        });
    }

    /**
     * レコードデータを取得する
    * @param {String} koujiId
    * @return {Array}
    */
    function getKoujiRecord(koujiId) {
        const query = cfgKoujiFields.kouji_recordNo.code + ' in ("' + koujiId + '")';
        return sncLib.kintone.rest.getRecord(cfgKouji.app, query);
    }

})(jQuery, window.nokConfig, window.snc);
