/**
 * @fileoverview 単一ルックアップ検索ダイアログ
 * 【バージョンアップ】
 *  1.0.1 複数ダイアログ設定追加
 *  1.0.2 検索結果のフィールドタイプによる値設定処理追加
 *
 * 【必要ライブラリ】
 * [JavaScript]
 * sweetalert2@9.js
 * popModal.min.js
 * jquery.min.js
 * jquery.tabslet.min.js
 * snc-1.0.5.min.js
 * snc.nok-1.0.5.min.js
 * snc.kintone-1.0.7-min.js
 *
 * [CSS]
 * 51-us-default.css
 * popModal_cstm.css
 * single-search-dialog.css
 *
 * @author nakashima
 * @version 1.0.2
 * @customer XXXXX（2021-11-19）
 *
*/
jQuery.noConflict();
(function ($, nokConfig, ssdConfig, sncLib) {
    "use strict";

    const dialogConfAry = ssdConfig.dialogs;
    const SSD_CONTENT_ID = 'single_search_dialog_content_';
    const messagesConfig = ssdConfig.messages;

    let search_param = {};

    /**
     * 新規登録レコード表示後イベント
     * 編集レコード表示後イベント
     */
    kintone.events.on([
        'app.record.create.show',
        'app.record.edit.show',
    ], function (event) {
        const record = event.record;

        // コンフィグで設定分のダイアログを作成
        for (let i = 0; i < dialogConfAry.length; i++) {
            const dialogConf = dialogConfAry[i];
            const dialogId = SSD_CONTENT_ID + dialogConf.id;
            const seachBtnConf = dialogConf.btnConfig.searchBtn;

            // 検索ボタン生成
            const btnSpace = kintone.app.record.getSpaceElement(seachBtnConf.spaceId);
            let searchBtn = document.createElement('button');
            searchBtn.id = seachBtnConf.id;
            searchBtn.className = 'button-custom';
            searchBtn.innerText = seachBtnConf.label;
            btnSpace.append(searchBtn);

            // 検索ダイアログを生成
            createDialog(dialogConf);

            // 検索ボタンクリック時のイベントを設定
            searchBtn.onclick = function () {
                emptyDialogContentAndResultArea(dialogId);
                // ダイアログ表示
                showDialog(dialogId);

                // 検索項目の初期値設定
                let dlgSearchContent = getDialogSearchContent(dialogId);
                if (dlgSearchContent) {
                    $.each(dialogConf.config.searchFieldConfig, function (index, val) {
                        if (!val.init) {
                            return;
                        }
                        let searchField = $(dlgSearchContent).find('[name="' + index + '"]');
                        switch (val.type) {
                            // テキストフィールド
                            case 'text':
                                let record = kintone.app.record.get();
                                let initVal = record.record[val.init.code].value;
                                $(searchField).val(initVal);
                                break;
                            // ドロップダウンフィールド
                            case 'select':
                                for (let i = 0; i < val.init.set.length; i++) {
                                    const initVal = val.init.set[i];
                                    for (let j = 0; j < searchField.length; j++) {
                                        const opt = searchField[j];
                                        if (initVal === opt.innerText) {
                                            $(opt).addClass('kintoneplugin-dropdown-list-item-selected');
                                        }
                                    }
                                }
                                break;
                            default:
                                break;
                        }
                    });
                }

                if (dialogConf.config.searchOpenDialog) {
                    // 検索と結果表示
                    searchAndShowResult(dialogConf);
                }
            };

            // ダイアログ内検索ボタンの押下時イベント
            $(document).off('click', '.' + dialogId + ' .search_btn_dialog');
            $(document).on('click', '.' + dialogId + ' .search_btn_dialog', function () {
                // 検索と結果表示
                searchAndShowResult(dialogConf);
            });
        }

        return event;
    });

    /**
     * 対象アプリから検索条件に応じた検索を行い検索結果を表示する
     * @param {*} dialogConf
     * @returns
     */
    function searchAndShowResult(dialogConf) {
        const dialogId = SSD_CONTENT_ID + dialogConf.id;

        // 取得件数・検索結果エリアを空にする
        emptyDialogContentAndResultArea(dialogId);

        // 検索中ダイアログ表示
        Swal.fire({
            title: '検索中'
            , html: messagesConfig.leaveTheScreenEndOfTheSearch
            , allowOutsideClick: false     //枠外をクリックしても画面を閉じない
            , showConfirmButton: false
            , onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        // 検索条件の設定
        search_param = {};
        $.each(dialogConf.config.searchFieldConfig, function (index, val) {
            let dlgSearchContent = getDialogSearchContent(dialogId);
            if (dlgSearchContent) {
                let searchField = $(dlgSearchContent).find('[name="' + index + '"]');

                switch (val.type) {
                    case 'text':
                        search_param[index] = $(searchField).val();
                        break;
                    case 'select':
                        let val = '';
                        for (let i = 0; i < searchField.length; i++) {
                            const opt = searchField[i];
                            if ($(opt).hasClass('kintoneplugin-dropdown-list-item-selected')) {
                                val += opt.innerText + ' ';
                            }
                        }
                        search_param[index] = val.slice(0, -1);
                        break;
                    default:
                        break;
                }
            }
        });

        return new kintone.Promise(function (resolve, reject) {
            // 検索件数を取得
            resolve(getRecordTotalCount(dialogConf));
        }).then(function (res) {

            // 取得件数セット
            let count = '<span>全 ' + res + ' 件</span>';
            $(".count_area").append(count);

            // 検索結果の件数が設定値以上の場合
            if (res > 0 && res > dialogConf.config.maxResults) {
                Swal.fire({
                    title: 'warning'
                    , html: dialogConf.messages.exceedSearchResults
                    , icon: 'warning'
                });
                return false;
            } else {
                // 検索対象レコードの取得
                return getSearchResultData(dialogConf);
            }
        }).then(function (resp) {
            if (!resp) {
                return false;
            }

            if (resp.length > 0) {
                // 検索結果テーブルの作成
                createResultTable(resp, dialogConf);
                Swal.close();
            } else {
                // 取得件数が0件の場合
                Swal.fire({
                    title: 'Info'
                    , html: messagesConfig.noResult
                    , icon: 'info'
                });
            }
        }).catch(function (err) {
            console.log(err);
            emptyDialogContentAndResultArea(dialogId);

            Swal.fire({
                title: 'Error'
                , html: messagesConfig.errorGetRecord + '<br>' + err.message
                , icon: 'error'
            });
            return false;
        });
    }

    /**
     * 検索件数の取得
     * @param {*} dialogConf
     * @returns
     */
    function getRecordTotalCount(dialogConf) {
        let query = '';
        if (!isEmpty(search_param)) {
            query = createSearchConditionQuery(dialogConf);
        }
        // console.log(query);
        return sncLib.kintone.rest.getRecordsTotalCount(dialogConf.app, query);
    }

    /**
     * 検索結果の取得
     * @returns
     */
    function getSearchResultData(dialogConf) {
        let query = '';
        if (!isEmpty(search_param)) {
            query = createSearchConditionQuery(dialogConf);
        }
        // console.log(query);
        return sncLib.kintone.rest.getAllRecordsOnRecordId(dialogConf.app, query);
    }

    /**
     * 検索条件に応じたクエリを生成
     * @returns
     */
    function createSearchConditionQuery(dialogConf) {
        const searchConfig = dialogConf.config.searchFieldConfig;
        let query = '';
        for (const key in search_param) {
            if (search_param[key] && searchConfig[key]) {
                // フィールドタイプによってクエリ記法を変更
                switch (searchConfig[key].type) {
                    case 'text':
                        query += searchConfig[key].code + ' like "' + search_param[key] + '"';
                        break;
                    case 'select':
                        let keywords = search_param[key].split(/\u0020|\u3000/);
                        let joinKeyword = '';
                        for (let i = 0; i < keywords.length; i++) {
                            const keyword = keywords[i];
                            joinKeyword += '"' + keyword + '",';
                        }
                        joinKeyword = joinKeyword.substr(0, joinKeyword.lastIndexOf(','));

                        query += searchConfig[key].code + ' in (' + joinKeyword + ')';
                        break;
                    default:
                        break;
                }
                query += ' and ';
            }
        }
        // 末尾のandを削除
        query = query.substr(0, query.lastIndexOf(' and '));

        return query;
    }

    /**
     * 検索ダイアログを表示する
     */
    function showDialog(dialogId) {
        $('#' + dialogId).dialogModal({
            topOffset: 0,
            top: '20%',
            type: '',
            onOkBut: function () { },
            onCancelBut: function () { },
            onLoad: function (el, current) { },
            onClose: function () { },
            onChange: function (el, current) { }
        });
    }

    /**
     * 検索ダイアログを閉じる
     */
    function closeModal() {
        var c = $(".dialogModal");
        c.removeClass("open");
        setTimeout(function () {
            c.remove();
            $("body").removeClass("dialogModalOpen").css({
                paddingRight: ""
            });
            $("html.dialogModalOpen").off(".dialogModalEvent").removeClass("dialogModalOpen");
            c.find(".dialogPrev").off("click");
            c.find(".dialogNext").off("click")
        }, 100)
    }

    /**
     * 検索ダイアログの中身を生成する
     */
    function createDialog(dialogConf) {
        // 検索ダイアログの設定情報
        const configDialog = dialogConf.config;
        const dialogId = SSD_CONTENT_ID + dialogConf.id;
        // ダイアログのコンテンツ部分を作成
        let myDialogSpace = kintone.app.record.getSpaceElement(configDialog.spaceId);
        $(myDialogSpace).append(createDialogContent(dialogId, configDialog));
        // ダイアログのフッター部分を作成
        $('#' + dialogId + ' .dialogModal_footer').append(createDialogFooter(dialogConf));

        // 検索項目の作成
        let search_area = '';
        $.each(configDialog.searchFieldConfig, function (index, config) {
            let strSearch = '<tr>'
                + '            <td class="search_title">' + config.label + '</td>'
                + '            <td class="search_input_td">';
            switch (config.type) {
                case 'text':
                    // テキスト検索用項目作成
                    strSearch += '<div class="kintoneplugin-input-outer">'
                        + '         <input type="text" class="kintoneplugin-input-text search_input ' + index + '"'
                        + '          name="' + index + '">'
                        + '       </div>';
                    break;
                case 'select':
                    // ドロップダウン検索用の複数選択項目作成
                    strSearch += '<div class="kintoneplugin-dropdown-list">'
                    if (config.val) {
                        // 複数選択の選択肢を設定
                        for (let i = 0; i < config.val.length; i++) {
                            // 選択肢要素作成
                            strSearch += '<div class="kintoneplugin-dropdown-list-item " name="' + index + '">'
                                + '         <span class="kintoneplugin-dropdown-list-item-name">' + config.val[i] + '</span>'
                                + '       </div>';
                        }

                        if (config.val.length > 0) {
                            // 選択肢を押下した場合のイベント設定
                            $(document).on('click', '.single_search_dialogModal_content .search_table div[name="' + index + '"]', function () {
                                if ($(this).hasClass('kintoneplugin-dropdown-list-item-selected')) {
                                    $(this).removeClass('kintoneplugin-dropdown-list-item-selected');
                                } else {
                                    $(this).addClass('kintoneplugin-dropdown-list-item-selected');
                                }
                            });
                        }
                    }
                    strSearch += '</div>';
                    break;
                default:
                    break;
            }
            strSearch += '    </td>'
                + '         </tr>';

            search_area += strSearch;
        });

        if (search_area) {
            $('#' + dialogId + ' .search_table').append(search_area);
        }
    }
    /**
     * 検索ダイアログのコンテンツを生成する
     * @returns コンテンツ内容
     */
    function createDialogContent(id, configDialog) {
        return '<div id="' + id + '" class="dialog_content" style="display:none;">'
            + '   <div class="dialogModal_header single_search_dialogModal_header">' + configDialog.title + '</div>'
            + '   <div class="dialogModal_content single_search_dialogModal_content ' + id + '">'
            // 検索項目の生成用テーブル
            + '     <table class="search_table"></table>'
            + '     <div class="search_button_div">'
            + '       <button class="kintoneplugin-button-normal search_btn_dialog" >検索</button>'
            + '     </div>'
            + '     <div class="count_area"></div>'
            + '     <div class="list_table_wrapper">'
            // 検索結果の生成用テーブル
            + '       <table class="result_table">'
            + '       </table>'
            + '     </div>'
            + '   </div>'
            + '   <div class="dialogModal_footer">'
            + '   </div>'
            + '</div>';
    };

    /**
     * ダイアログのフッター部分の生成
     * 別画面遷移オプションボタンなど
     */
    function createDialogFooter(dialogConf) {
        const optionBtns = dialogConf.config.optionBtn;
        let footer = '';
        for (let i = 0; i < optionBtns.length; i++) {
            const btnConf = optionBtns[i];
            footer += '<button id="' + btnConf.id + '" class="' + btnConf.id
                + ' kintoneplugin-button-normal" data-dialogmodal-but="touroku" type="button">' + btnConf.label + '</button>';

            // ボタン押下時のイベント設定
            $(document).on('click', '#' + btnConf.id, function () {
                let fieldRecord = kintone.app.record.get();
                let tab = window.open("/k/" + btnConf.appId + "/edit");

                // 画面遷移後の値設定
                tab.addEventListener("load", function () {
                    postMessage(tab.kintone !== null, location.origin);
                });

                window.addEventListener("message", (function (event) {
                    return function field_set() {
                        let record = tab.kintone.app.record.get();
                        // アプリ登録画面で初期値を設定する
                        if (btnConf.target && btnConf.source) {
                            record.record[btnConf.target].value = fieldRecord.record[btnConf.source].value;
                            record.record[btnConf.target].lookup = true;
                        }
                        // 戻り処理用のチェックボックスに値を設定
                        if (btnConf.checkField) {
                            if (record.record[btnConf.checkField]) {
                                record.record[btnConf.checkField].value = ['有'];
                            }
                        }

                        tab.kintone.app.record.set(record);
                        window.removeEventListener("message", field_set, false);
                    };
                })(), false);


                // ダイアログを閉じる
                closeModal();
            });
        }

        // キャンセルボタン
        footer += '<button class="btn btn-default kintoneplugin-button-normal" data-dialogmodal-but="cancel" type="button">キャンセル</button>'
        return footer;
    }

    /**
     * 検索結果テーブル生成
     * @param {*} data
     * @param {*} dialogConf
     */
    function createResultTable(data, dialogConf) {
        const dialogId = SSD_CONTENT_ID + dialogConf.id;
        const showTableColumnsConf = dialogConf.config.showTableColumn;
        const targetField = dialogConf.targetField;

        // ヘッダーの生成
        let strHeader = '<thead>'
            + '            <tr align="left">'
            + '              <th></th>';
        for (let i = 0; i < showTableColumnsConf.length; i++) {
            const column = showTableColumnsConf[i];
            strHeader += '<th class="' + column.code + '">' + column.label + '</th>';
        }
        strHeader += '     </tr>';
        strHeader += '   </thead>';
        $('.result_table').append(strHeader);

        // ボディの生成
        let strBody = '<tbody id="list_tbody" >';
        for (let i = 0; i < data.length; i++) {
            let currentData = data[i];

            // 1列目の選択行追加
            strBody += '<tr class="table_cont">'
                + '       <td class="td align select_btn">'
                + '         <input type="button" class="select_result_record_btn" value="選択" data-select="' + currentData[dialogConf.sourceField].value + '">'
                + '       </td>';

            // コンフィグで設定された検索結果を表示するフィールドを追加
            for (let y = 0; y < showTableColumnsConf.length; y++) {
                const column = showTableColumnsConf[y];
                let value = '';
                if (currentData[column.code].value) {
                    switch (column.type) {
                        // 配列+オブジェクト形式
                        case 'USER_SELECT':
                        case 'ORGANIZATION_SELECT':
                        case 'GROUP_SELECT':
                            let aryName = [];
                            for (let i = 0; i < currentData[column.code].value.length; i++) {
                                aryName.push(currentData[column.code].value[i].name);
                            }
                            value = aryName.join(',');
                            break;
                        // 配列形式
                        case 'CHECK_BOX':
                        case 'MULTI_SELECT':
                            const array = currentData[column.code].value;
                            value = array.join(',');
                            break;
                        // オブジェクト形式
                        case 'CREATOR':
                        case 'MODIFIER':
                            value = currentData[column.code].value.name;
                            break;
                        // 日時
                        case 'DATETIME':
                        case 'CREATED_TIME':
                        case 'UPDATED_TIME':
                            // UCT⇒JST
                            convertJST(res[j][code].value);
                            break;
                        // 添付ファイル
                        // テーブル
                        case 'FILE':
                        case 'SUBTABLE':
                            // 対象外
                            break
                        default:
                            value = currentData[column.code].value;
                            break;
                    }
                }

                strBody += '<td class="td align ' + column.code + '">' + value + '</td>';
            }
            strBody += '</tr>';
        }
        strBody += ' </tbody>';

        if (data.length !== 0) {
            // 選択ボタン押下時イベント設定
            $(document).on('click', '.' + dialogId + ' .select_result_record_btn', function () {
                let record = kintone.app.record.get();
                let setVal = $(this).data('select');
                // セット対象フィールドへ値をセットし、自動ルックアップをON
                record.record[targetField].value = setVal;
                record.record[targetField].lookup = true;
                kintone.app.record.set(record);
                // ダイアログを閉じる
                closeModal();
            });
        }

        $('.result_table').append(strBody);
    }

    /**
     * モーダル内の検索エリア要素取得（モーダル表示時のみ取得可）
     * @param {*} dialogId
     * @returns
     */
    function getDialogSearchContent(dialogId) {
        // モーダルを生成するためにkintoneヘッダーへモーダル内容を生成するが
        // モーダルを開く際に、生成した内容を複製してモーダルに生成してしまう。
        // ダイアログ内の要素を取得するため、2番目の要素を明示的に取得して以降は利用する。
        let searchContent = $('.' + dialogId);
        let dlgSearchContent = null;
        if (searchContent.length > 1) {
            dlgSearchContent = searchContent[1];
        }
        return dlgSearchContent;
    }

    /**
     * 取得件数・検索結果エリアを空にする
     */
    function emptyDialogContentAndResultArea(dialogId) {
        // 取得件数エリアを空にする
        $('.' + dialogId + ' .count_area').empty();
        // 検索結果テーブルを空にする
        $('.' + dialogId + ' .result_table').empty();
    }

    /**
     * 連想配列が空かどうかのチェック
     * @param {*} obj
     * @returns
     */
    function isEmpty(obj) {
        return !Object.keys(obj).length;
    }

    /**
     * UCT表記からJST表記へ変換
     * @param {*} strDate
     * @returns
     */
    function convertJST(strDate) {
        if (!strDate) {
            return '';
        }
        let time = new Date(strDate);
        let convertTime = time.toLocaleString().slice(0, -3);

        return convertTime.replace(/\u002f/g, '-');
    }

})(jQuery, window.nokConfig, window.ssdConfig, window.snc);
