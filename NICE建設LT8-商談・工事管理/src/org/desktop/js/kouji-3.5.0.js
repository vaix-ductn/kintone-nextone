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
 * config.kouji.js v1.0.0
 *
 * [CSS]
 * 51-us-default.css
 * kouji.css
 *
 * @author SNC
 * @version 3.5.0
 * @customer （2023-06-25）
*/
jQuery.noConflict();
(function ($, config, sncLib, koujiViewCfg) {
    'use strict';
    const cfgKouji = config.kouji;
    const cfgKoujiFields = config.kouji.fields;
    let nonEditFields = null;
    // 編集実行回数をカウントするグローバル変数
    let execNum = 0;
    let koujiDataPerPage = null;
    let updateTimeAtEdit = null;
    let updateTimeAtSave = null;
    let updateTimeAtCancel = null;


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

        if (!koujiViewCfg.viewIds.includes(event.viewId)) {
            return event;
        }

        try {
            const formFields = await getKoujiAppFormFields();
            koujiDataPerPage = await getKoujiDataPerPage(event);

            const displayFields = transformDisplayFields(event.viewId);

            if (displayFields.length === 0) {
                return event;
            }

            nonEditFields = getNonEditFields(formFields);
            execNum = 0;

            // テーブルの本体とヘッダーをクリアする
            initTable();
            // 固定ヘッダー テーブルのヘッダーを作成する
            createTableHeader('table-fixedheader', formFields, displayFields);
            // データテーブルのヘッダーを作成する
            createTableHeader('table-list-viewer', formFields, displayFields);
            // データテーブル本体を作成する
            createTableBody(formFields, displayFields);
            // 固定ヘッダーの幅を調整する
            updateFixedHeaderWidths();
            // 固定列の左位置を設定する
            setLeftPositionFixCols(event.viewId);

            // Editボタンのクリックイベント
            $('#list_viewer_area table').on('click', '.recordlist-edit-gaia', function () {
                handleEditClick(formFields).call(this);
            });

            // Cancelボタンのクリックイベント
            $('#list_viewer_area table').on('click', '.recordlist-cancel-gaia', function () {
                handleCancelClick(formFields).call(this);
            });

            // Deleteボタンのクリックイベント
            $('#list_viewer_area table').on('click', '.recordlist-remove-gaia', function () {
                handleRemoveClick().call(this);
            });

            // Saveボタンのクリックイベント
            $('#list_viewer_area table').on('click', '.recordlist-save-gaia', function () {
                handleSaveClick(displayFields, formFields).call(this);
            });

            // ウィンドウのサイズ変更イベント時のハンドル
            $(window).on('resize', function () {
                // 固定ヘッダーの幅を調整する
                updateFixedHeaderWidths();
            });

            // レコード編集時に URL リダイレクトの場合にアラートを表示する
            $(window).on('beforeunload', function () {
                if (execNum === 1) {
                    return true;
                }
            });

            // イベントが下にスクロールしたときのハンドル
            $(window).on('scroll', function () {
                const scrollLeft = $(this).scrollLeft();
                $('#table-fixedheader').css('left', `-${scrollLeft}px`);
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
     * 表示フィールドを変換する
     * @param {String} viewId
     * @returns {Array} fixColsDisplayFields
     */
    function transformDisplayFields(viewId) {

        let displayFields = null;
        let fixColFields = null;

        for (const viewKey in koujiViewCfg) {
            if (koujiViewCfg[viewKey].hasOwnProperty('viewId') && koujiViewCfg[viewKey].hasOwnProperty('fixedColumnFields') && koujiViewCfg[viewKey].hasOwnProperty('displayFields')) {
                if (viewId === koujiViewCfg[viewKey].viewId) {
                    displayFields = koujiViewCfg[viewKey].displayFields;
                    fixColFields = koujiViewCfg[viewKey].fixedColumnFields;
                }
            }
        }

        const fixColsDisplayFields = mergeFixColsDisplayFields(displayFields, fixColFields);
        return fixColsDisplayFields;
    }

    /**
     * マージ修正列表示フィールド
     * @param {Array} displayFields
     * @param {Array} fixColFields
     * @returns {Array}
     */
    function mergeFixColsDisplayFields(displayFields, fixColFields) {
        const fixFields = fixColFields.reduce(function (acc, obj) {
            return acc.concat(obj.fieldCode);
        }, []);

        const tempDisplayFields = displayFields.filter(function (obj) {
            return !fixFields.includes(obj.fieldCode);
        });

        return [...fixColFields, ...tempDisplayFields];
    }

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
        // レコードIDで降順に並べ替えます
        sortListByField(koujiData, cfgKoujiFields.kouji_recordNo.code, 'desc');
        const viewSettings = await getViewPagerSetting();
        if (viewSettings.views[event.viewName].pager && viewSettings.views[event.viewName].pager === true) {
            const perPage = getPerPageInfo();
            return koujiData.slice(perPage.from - 1, perPage.to);
        }
    }

    /**
     * フィールドごとにリストを並べ替える
     * @param {Array} array
     * @param {String} field
     * @param {String} option
     */
    function sortListByField(array, field, option) {
        array.sort(function (a, b) {
            return option === 'desc' ? b[field].value - a[field].value : a[field].value - b[field].value;
        });
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
                    if (subTableFields[keyField].hasOwnProperty('expression') && subTableFields[keyField].expression) {
                        calFields.push(keyField);
                    }
                }
            } else if (formFieldsProp[key].hasOwnProperty('expression') && formFieldsProp[key].expression) {
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
            if (obj.hasOwnProperty('subtableDisplayFields')) {
                obj['subtableDisplayFields'].forEach(function (item) {
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
     * @param {Object} formFields
     * @param {Object} displayFields
     */
    function createTableBody(formFields, displayFields) {
        const tableBody = $('#list_viewer_area table#table-list-viewer').find('tbody');
        koujiDataPerPage.forEach(function (record, indexRecord) {
            const maxRowSpan = getMaxRowOfRecord(record, displayFields);
            for (let i = 1; i <= maxRowSpan; i++) {
                // レコードごとに行を作成する
                const tableRow = $(`<tr class="recordlist-row-gaia record-${indexRecord % 2 === 0 ? 'even' : 'odd'}">`).appendTo(tableBody);
                if (i === 1) {
                    createCellLink(tableRow, record, maxRowSpan);
                }
                for (const field of displayFields) {
                    if (field.hasOwnProperty('subtableDisplayFields')) {
                        createCellSubtable(tableRow, record, field, i, maxRowSpan, formFields);
                    } else {
                        createCellNormalField(tableRow, record, field, i, maxRowSpan, formFields);
                    }
                }
                if (i === 1) {
                    createButtonCell(tableRow, maxRowSpan);
                }
            }
        });
    }

    /**
     * レコードの最大行を取得する
     * @param {Object} record
     * @param {Object} displayFields
     * @returns {Number} maxRowOfRecord
     */
    function getMaxRowOfRecord(record, displayFields) {
        let maxRowOfRecord = 1;
        for (const field of displayFields) {
            const recordFieldCode = record[field.fieldCode];
            if (Array.isArray(recordFieldCode.value) && recordFieldCode.type === "SUBTABLE" & recordFieldCode.value.length > maxRowOfRecord) {
                maxRowOfRecord = record[field.fieldCode].value.length;
            }
        }
        return maxRowOfRecord;
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
     * @param {Object} formFields
     */
    function createCellSubtable(tableRow, record, field, i, maxRowSpan, formFields) {
        field['subtableDisplayFields'].forEach(function (item) {
            if (record[field.fieldCode].value.length > 0) {
                const blankRows = maxRowSpan - record[field.fieldCode].value.length;
                // サブテーブルは要素の配列です
                record[field.fieldCode].value.forEach(function (subItem, index) {
                    if (index + 1 === i) {
                        const unitField = getUnitField(formFields, item.fieldCode, field.fieldCode);
                        const tableData = $(`<td subtable=${field.fieldCode} class="recordlist-cell-gaia">`).appendTo(tableRow);
                        const divEle = $(`<div fieldcode=${item.fieldCode}>`).appendTo(tableData);
                        const fieldType = formFields.properties[field.fieldCode].fields[item.fieldCode].type;
                        createSpanElement(fieldType, unitField, subItem.value[item.fieldCode].value, divEle);
                    }
                });

                for (let j = 1; j <= blankRows; j++) {
                    if (blankRows > 0 && record[field.fieldCode].value.length + j === i) {
                        const tableData = $(`<td subtable=${field.fieldCode} class="recordlist-cell-gaia empty-cell">`).appendTo(tableRow);
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
     * @param {Object} formFields
     */
    function createCellNormalField(tableRow, record, field, i, maxRowSpan, formFields) {
        if (i === 1) {
            const unitField = getUnitField(formFields, field.fieldCode);
            const tableData = $(`<td class="recordlist-cell-gaia" rowspan="${maxRowSpan}">`).appendTo(tableRow);
            const divEle = $(`<div fieldcode=${field.fieldCode}>`).appendTo(tableData);
            const fieldType = formFields.properties[field.fieldCode].type;
            createSpanElement(fieldType, unitField, record[field.fieldCode].value, divEle);
        }
    }

    /**
     * フィールドの単位を取得する
     * @param {Object} formFields
     * @param {String} itemFieldCode
     * @param {String} subtableFieldCode
     * @returns {String} unitField
     */
    function getUnitField(formFields, itemFieldCode, subtableFieldCode = null) {
        const formFieldsPro = formFields.properties;
        let unitField = null;
        if (subtableFieldCode && formFieldsPro[subtableFieldCode].fields[itemFieldCode].hasOwnProperty('unit') && formFieldsPro[subtableFieldCode].fields[itemFieldCode].unit) {
            unitField = formFieldsPro[subtableFieldCode].fields[itemFieldCode].unit;
        } else if (!subtableFieldCode && formFieldsPro[itemFieldCode].hasOwnProperty('unit') && formFieldsPro[itemFieldCode].unit) {
            unitField = formFieldsPro[itemFieldCode].unit;
        }
        return unitField;
    }

    /**
     * スパン要素を作成する
     * @param {String} fieldType
     * @param {String} unitField
     * @param {string} fieldValue
     * @param {Object} divEle
     */
    function createSpanElement(fieldType, unitField, fieldValue, divEle) {
        if (fieldValue && fieldType === 'NUMBER' || fieldType === 'CALC') {
            divEle.addClass('cell-number');
            if (unitField) {
                $(`<span>`).text(Number(fieldValue).toLocaleString('en-US') + unitField).appendTo(divEle);
            } else {
                $(`<span>`).text(Number(fieldValue).toLocaleString('en-US')).appendTo(divEle);
            }
        } else {
            $(`<span>`).text(fieldValue).appendTo(divEle);
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
     * 固定列の左位置を設定する
     * @param {String} viewId
     */
    function setLeftPositionFixCols(viewId) {
        let fixColFields = null;

        for (const viewKey in koujiViewCfg) {
            if (koujiViewCfg[viewKey].hasOwnProperty('viewId') && koujiViewCfg[viewKey].hasOwnProperty('fixedColumnFields') && koujiViewCfg[viewKey].hasOwnProperty('displayFields')) {
                if (viewId === koujiViewCfg[viewKey].viewId) {
                    fixColFields = koujiViewCfg[viewKey].fixedColumnFields;
                }
            }
        }

        for (let i = 0; i < fixColFields.length; i++) {
            setLeftPositionFixColumn(i + 2);
        }
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
        const targetDataCells = $(`td:nth-child(${columnIndex}):not([subtable])`);
        const targetHeaderCells = $(`th:nth-child(${columnIndex})`);
        targetDataCells.each(function() {
            $(this).css('left', `${newLeftValue}px`);
            $(this).css('position', 'sticky');
            $(this).css('z-index', '1');
        });

        targetHeaderCells.each(function() {
            $(this).css('left', `${newLeftValue}px`);
            $(this).css('position', 'sticky');
            $(this).css('background-color', '#ffffff');
            $(this).css('z-index', '1');
        });
    }

    /**
     * ハンドル編集クリック
     * @param {Object} formFields
     */
    function handleEditClick(formFields) {
        return async function () {
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
            const records = await getKoujiRecord(recordId);
            const record = records[0];

            if (!record) {
                showErrorMessage(` Error occurred.
                The specified record (ID: ${recordId}) is not found.`);
                execNum--;
                return;
            }

            updateTimeAtEdit = record[cfgKoujiFields.updatedTime.code].value;

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
     * @param {Object} formFields
     */
    function handleCancelClick(formFields) {
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

                if (!record) {
                    showErrorMessage(` Error occurred.
                    The specified record (ID: ${recordId}) is not found.`);
                    execNum++;
                    return;
                }

                updateTimeAtCancel = record[cfgKoujiFields.updatedTime.code].value;
                if (updateTimeAtEdit !== updateTimeAtCancel) {
                    showErrorMessage(`Someone has updated the record while you are editing.`);
                }

                // 最初の行のハンドル
                $row.find('td:not(:first-child):not(:last-child)').each(function () {
                    $(this).find('input').remove();
                    $(this).find('select').remove();
                    const subtableFieldCode = $(this).attr('subtable');
                    const divEle = $(this).find('div');
                    const itemFieldCode = divEle.attr('fieldcode');
                    if (!nonEditFields.includes(itemFieldCode)) {
                        if (!subtableFieldCode) {
                            const unitField = getUnitField(formFields, itemFieldCode);
                            const fieldType = formFields.properties[itemFieldCode].type;
                            createSpanElement(fieldType, unitField, record[itemFieldCode].value, divEle);
                        } else {
                            if (record[subtableFieldCode].value[0]) {
                                const unitField = getUnitField(formFields, itemFieldCode, subtableFieldCode);
                                const fieldType = formFields.properties[subtableFieldCode].fields[itemFieldCode].type;
                                createSpanElement(fieldType, unitField, record[subtableFieldCode].value[0].value[itemFieldCode].value, divEle);
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
                                const unitField = getUnitField(formFields, itemFieldCode, subtableFieldCode);
                                const fieldType = formFields.properties[subtableFieldCode].fields[itemFieldCode].type;
                                createSpanElement(fieldType, unitField, record[subtableFieldCode].value[relativeIndex].value[itemFieldCode].value, divEle);
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
                    confirmBox.remove();
                }
            });
        }
    }

    /**
     * 保存クリックをハンドルします
     * @param {Object} displayFields
     * @param {Object} formFields
     */
    function handleSaveClick(displayFields, formFields) {
        return async function () {
            execNum--;
            if (execNum < 0) {
                execNum++;
                return;
            }
            const recordUrl = $(this).closest('tr').find('td:first-child a').attr('href');
            const recordId = recordUrl.split("=")[1];
            const oldRecords = await getKoujiRecord(recordId);
            const oldRecord = oldRecords[0];

            if (!oldRecord) {
                showErrorMessage(` Error occurred.
                The specified record (ID: ${recordId}) is not found.`);
                execNum++;
                return;
            }

            updateTimeAtSave = oldRecord[cfgKoujiFields.updatedTime.code].value;

            if (updateTimeAtEdit !== updateTimeAtSave) {
                showErrorMessage(`Error occurred.
                Please refresh the page. Someone has updated the record while you are editing.`);
                execNum++;
                return;
            }

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
                        const unitField = getUnitField(formFields, itemFieldCode);
                        const fieldType = formFields.properties[itemFieldCode].type;
                        createSpanElement(fieldType, unitField, record[itemFieldCode].value, divEle);
                    } else {
                        if (record[subtableFieldCode].value[0]) {
                            const unitField = getUnitField(formFields, itemFieldCode, subtableFieldCode);
                            const fieldType = formFields.properties[subtableFieldCode].fields[itemFieldCode].type;
                            createSpanElement(fieldType, unitField, record[subtableFieldCode].value[0].value[itemFieldCode].value, divEle);
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
                            const unitField = getUnitField(formFields, itemFieldCode, subtableFieldCode);
                            const fieldType = formFields.properties[subtableFieldCode].fields[itemFieldCode].type;
                            createSpanElement(fieldType, unitField, record[subtableFieldCode].value[relativeIndex].value[itemFieldCode].value, divEle);
                        }
                    });
                }
                // 保存キャンセルボタンを編集削除ボタンに切り替えます
                toggleSaveCancelToEditDelete($row);
            } catch (error) {
                showErrorMessage(error);
                execNum++;
            }

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
                const unitField = getUnitField(formFields, itemFieldCode, subtableFieldCode);
                createFormElement(formFields, fieldType, fieldValue, divEle, unitField, itemFieldCode, subtableFieldCode);
            }
        } else {
            const fieldType = formFields.properties[itemFieldCode].type;
            const unitField = getUnitField(formFields, itemFieldCode);
            createFormElement(formFields, fieldType, fieldValue, divEle, unitField, itemFieldCode);
        }
    }

    /**
     * フォーム要素を作成する
     * @param {Object} formFields
     * @param {String} fieldType
     * @param {String} fieldValue
     * @param {Object} divEle
     * @param {String} unitField
     * @param {String} itemFieldCode
     * @param {String} subtableFieldCode
     */
    function createFormElement(formFields, fieldType, fieldValue, divEle, unitField, itemFieldCode, subtableFieldCode = null) {
        switch (fieldType) {
            case 'DATE':
                const inputEleDate = $(`<input type="date">`).appendTo(divEle);
                inputEleDate.val(fieldValue);
                break;
            case 'DROP_DOWN':
                let options = null;
                if (subtableFieldCode) {
                    options = Object.keys(formFields.properties[subtableFieldCode].fields[itemFieldCode].options);
                } else {
                    options = Object.keys(formFields.properties[itemFieldCode].options);
                }
                const selectEle = $('<select>').appendTo(divEle);
                $('<option value="">').text('').appendTo(selectEle);
                options.forEach(function (option) {
                    if (option === fieldValue) {
                        $(`<option selected value=${option}>`).text(option).appendTo(selectEle);
                    } else {
                        $(`<option value=${option}>`).text(option).appendTo(selectEle);
                    }
                });
                break;
            case 'NUMBER':
                const inputEleNumber = $(`<input type="number" class="recordlist-forms-number-gaia">`).appendTo(divEle);
                if (fieldValue) {
                    if (unitField) {
                        inputEleNumber.val(Number(fieldValue.replace(unitField,'').replace(/,/g, '')));
                    } else {
                        inputEleNumber.val(Number(fieldValue.replace(/,/g, '')));
                    }
                } else {
                    inputEleNumber.val(fieldValue);
                }
                break;
            default:
                const inputEleDefault = $(`<input type="text" class="recordlist-forms-text-gaia">`).appendTo(divEle);
                inputEleDefault.val(fieldValue);
        }
    }

    /**
     * 右にスクロールし続ける
     */
    function scrollRight() {
        const table = $('#table-list-viewer').get(0);
        const scrollX = table.scrollWidth;
        $(window).scrollLeft(scrollX);
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
            if (field.hasOwnProperty('subtableDisplayFields')) {
                const tempArray = [];
                for (let i = 0; i < rowspan; i++) {
                    if (i >= oldRecord[field.fieldCode].value.length) {
                        break;
                    }
                    const tempObject = {};
                    oldRecord[field.fieldCode].value.forEach(function (obj, index) {
                        for (const key in obj.value) {
                            if (index === i) {
                                tempObject[key] = { 'value': obj.value[key].value }
                            }
                        }
                    });
                    tempArray.push({ value: tempObject });
                }
                originalContents[field.fieldCode] = { value: tempArray };
            } else {
                if (!nonEditFields.includes(field.fieldCode)) {
                    originalContents[field.fieldCode] = { value: oldRecord[field.fieldCode].value };
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
            title: error.message ? error.message : error
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

})(jQuery, window.nokConfig, window.snc, window.koujiCustomViewConfig);
