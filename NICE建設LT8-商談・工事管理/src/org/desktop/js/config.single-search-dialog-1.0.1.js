/**
 * @fileoverview 単一ルックアップ検索ダイアログ 設定情報
 * @author SNC
 * @version 3.5.0
 * @customer XXXXX（2021-9-21）
 */
(function (config) {
    'use strict';
    // グローバル変数
    window.ssdConfig = window.ssdConfig || {
        dialogs: [
            // =============================
            // 1つ目のダイアログ設定
            // =============================
            {
                // ダイアログ要素生成コンテンツDIV要素ID（任意文字列、重複禁止）
                id: 'ssd_single_id_1',
                // 検索対象先AppId
                app: 23210,
                // 検索先アプリのデータ取得フィールドコード（※ユニーク値限定）
                sourceField: 'nok_顧客ID',
                // 自アプリのセット対象フィールドコード（ルックアップフィールド限定）
                targetField: 'nok_顧客検索',
                // 検索ダイアログの設定
                config: {
                    title: '顧客検索ダイアログ',     // タイトル
                    spaceId: 'modal_single_space_1', // ダイアログ要素作成用のスペースId
                    maxResults: 200,               // 最大取得件数　overSearchResultsメッセージも合わせて変更すること
                    searchOpenDialog: true,        // 検索ダイアログ表示時に検索を行うかどうか
                    // 検索対象フィールドの設定
                    // キーは重複禁止
                    // キー（任意）: {
                    //  label:検索項目ラベル名
                    //  code:検索対象アプリ先のフィールドコード
                    //  type:フィールドタイプ　※2021/08/26 対象フィールドタイプはテキスト、ドロップダウン
                    //  val:選択肢（ドロップダウンの場合のみ使用、使用しない場合はnull）
                    //  init:初期設定（使用しない場合はnull） {　
                    //    code:自アプリのフィールドコード（テキストの場合のみ使用、使用しない場合はnull）
                    //    set:初期設定値（ドロップダウンの場合のみ使用、使用しない場合はnull）
                    //  }
                    // }
                    searchFieldConfig: {
                        field_1: {
                            label: '顧客名',
                            code: 'nok_顧客名',
                            type: 'text',
                            val: null,
                            init: null,
                        },
                        field_2: {
                            label: '住所',
                            code: 'nok_顧客住所',
                            type: 'text',
                            val: null,
                            init: null,
                        },
                        field_3: {
                            label: '顧客ランク',
                            code: 'nok_顧客ランク',
                            type: 'select',
                            val: [
                                'Aランク',
                                'Bランク',
                                'Cランク',
                                'Dランク',                                
                            ],
                            init: {
                                code: null,
                                set: [
                                ]
                            }
                        },
                    },
                    // 検索結果テーブルに表示されるフィールドの設定
                    // {
                    //  label:列名（任意）
                    //  code:フィールドコード
                    //  type:フィールドタイプ　※2021/08/26 対象フィールドタイプはテキスト、ドロップダウン
                    // }
                    showTableColumn: [
                        {
                            label: '顧客名',
                            code: 'nok_顧客名',
                            type: 'text',
                        },
                        {
                            label: '住所',
                            code: 'nok_顧客住所',
                            type: 'text',
                        },
                        {
                            label: 'TEL',
                            code: 'nok_顧客TEL',
                            type: 'text',
                        },
                    ],
                    // フッター部分に配置するオプションボタン設定
                    // 新規登録画面への遷移機能限定
                    // {
                    //  id:ボタンId（重複禁止）
                    //  appId:遷移先
                    //  label:ボタン表示名（任意）
                    //  target:他アプリ遷移後値セットフィールドコード（ルックアップフィールド限定）
                    //  source:自アプリ値参照フィールドコード
                    //  checkField:他アプリの戻り処理用チェックボックスフィールドコード
                    // }
                    optionBtn: [
                        {
                            id: 'create_btn_1',
                            appId: 23210,
                            label: '新規顧客作成',
                            target: 'nok_顧客名',
                            source: 'nok_顧客名',
                            checkField: 'nok_案件確認'
                        },
                    ]
                },
                // 検索ボタンの設定（ダイアログ表示用）
                btnConfig: {
                    // キー（任意）: {
                    //  spaceId:ボタン配置スペースId
                    //  id:ボタンId（重複禁止）
                    //  label:ボタン表示名（任意）
                    // }
                    searchBtn: {
                        spaceId: 'single_search_btn_1',
                        id: 'singleSearchBtn_1',
                        label: '顧客検索'
                    }
                },
                // メッセージ設定
                messages: {
                    'exceedSearchResults': '検索結果が200件を超えています。<br> 検索条件を入力して再度検索して下さい。',
                },
            },
//------------------------------------------------------------------------------
        ],

        // =============================
        // 共通設定
        // =============================

        messages: {
            'noResult': '対象レコードが存在しません',
            'errorGetRecord': 'レコードの取得に失敗しました',
            'leaveTheScreenEndOfTheSearch': '検索終了まで画面はそのままにしてください',
        }
    }
})(window.nokConfig);
