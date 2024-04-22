/**
 * @fileoverview NICE営業 on kintone plus 設定情報
 * @author SNC
 * @version 3.5.0
 * @customer （yyyy-mm-dd）
 */
(function () {
    'use strict';
    // グローバル変数
    window.nokConfig = window.nokConfig || {

        // 顧客マスタアプリの設定
        kokyaku: {
            app: 1248,
            fields: {
                'kokyakuId': {
                    'code': 'nok_顧客ID',
                    'shown': true,
                    'disabled': true,
                },
                'kokyakuIdKey': {
                    'code': 'nok_顧客IDKey',
                    'shown': true,
                    'disabled': true,
                },
                'kokyakumei': {
                    'code': 'nok_顧客名',
                    'shown': true,
                    'disabled': false,
                },
                'yubinBango': {
                    'code': 'nok_郵便番号',
                    'shown': true,
                    'disabled': false,
                },
                'jusho': {
                    'code': 'nok_住所',
                    'shown': true,
                    'disabled': false,
                },
                'tel': {
                    'code': 'nok_TEL',
                    'shown': true,
                    'disabled': false,
                },
                'fax': {
                    'code': 'nok_FAX',
                    'shown': true,
                    'disabled': false,
                },
                'ankenKakunin': {
                    'code': 'nok_案件確認',
                    'shown': false,
                    'disabled': false,
                },
                //--システム----------------------------------------------------
                'systemInfoGroup': {
                    'code': 'nok_グループ',
                    'shown': false
                },
                'recordId': {
                    'code': '$id'
                },
                'recordNo': {
                    'code': 'nok_顧客レコード番号'
                },
            },
            //--案件管理ダイアログ設定-------------------------------------------------------
            kokyakuKanriDaialog: {
                messages: {
                    'nippoNone': '顧客アプリを呼び出した日報が存在しません。',
                    'registration': '登録しました。'
                }
            },
            messages: {
                'failGetSerialNumber': '顧客番号情報の取得に失敗しました。'
            },
        },

        //案件（工事）管理アプリの設定
        anken: {
            app: 1247,
            fields: {
                //--担当者------------------------------------------------------
                'tantoshaSearch': {
                    'code': 'nok_担当者検索',
                    'shown': true,
                    'disabled': false
                },
                'tantoshaId': {
                    'code': 'nok_担当者ID',
                    'shown': false,
                    'disabled': true
                },
                'tantoshaMei': {
                    'code': 'nok_担当者名',
                    'shown': true,
                    'disabled': true
                },
                //--担当者------------------------------------------------------                
                'eigyoTantoshaSearch': {
                    'code': 'nok_営業担当者検索',
                    'shown': true,
                    'disabled': false
                },
                'eigyoTantoshaId': {
                    'code': 'nok_営業担当者ID',
                    'shown': false,
                    'disabled': true
                },
                'eigyoTantoshaMei': {
                    'code': 'nok_営業担当者名',
                    'shown': true,
                    'disabled': true
                },
                'eigyoTantoshaGroup': {
                    'code': 'nok_営業担当者グループ',
                    'shown': false,
                    'disabled': true
                },
                'eigyoTantoshaUser': {
                    'code': 'nok_営業担当者ユーザー',
                    'shown': false,
                    'disabled': true
                },
                'eigyoTantoshaSosiki': {
                    'code': 'nok_営業担当者組織',
                    'shown': false,
                    'disabled': true
                },
                //--設計担当者--------------------------------------------------
                'sekkeiTantoshaSearch': {
                    'code': 'nok_設計担当者検索',
                    'shown': true,
                    'disabled': false
                },
                'sekkeiTantoshaId': {
                    'code': 'nok_設計担当者ID',
                    'shown': false,
                    'disabled': true
                },                
                'sekkeiTantoshaMei': {
                    'code': 'nok_設計担当者名',
                    'shown': true,
                    'disabled': true
                },
                'sekkeiTantoshaGroup': {
                    'code': 'nok_設計担当者グループ',
                    'shown': false,
                    'disabled': true
                },
                'sekkeiTantoshaUser': {
                    'code': 'nok_設計担当者ユーザー',
                    'shown': false,
                    'disabled': true
                },
                'sekkeiTantoshaSosiki': {
                    'code': 'nok_設計担当者組織',
                    'shown': false,
                    'disabled': true
                },                
                //--CD担当者----------------------------------------------------
                'cdTantoshaSearch': {
                    'code': 'nok_CD担当者検索',
                    'shown': true,
                    'disabled': false
                },
                'cdTantoshaId': {
                    'code': 'nok_CD担当者ID',
                    'shown': false,
                    'disabled': true
                },                
                'cdTantoshaMei': {
                    'code': 'nok_CD担当者名',
                    'shown': true,
                    'disabled': true
                },
                'cdTantoshaGroup': {
                    'code': 'nok_CD担当者グループ',
                    'shown': false,
                    'disabled': true
                },
                'cdTantoshaUser': {
                    'code': 'nok_CD担当者ユーザー',
                    'shown': false,
                    'disabled': true
                },
                'cdTantoshaSosiki': {
                    'code': 'nok_CD担当者組織',
                    'shown': false,
                    'disabled': true
                },                 
                //--工務担当者--------------------------------------------------------------
                'komuTantoshaSearch': {
                    'code': 'nok_工務担当者検索',
                    'shown': true,
                    'disabled': false
                },
                'komuTantoshaId': {
                    'code': 'nok_工務担当者ID',
                    'shown': false,
                    'disabled': true
                },                
                'komuTantoshaMei': {
                    'code': 'nok_工務担当者名',
                    'shown': true,
                    'disabled': true
                },
                'komuTantoshaGroup': {
                    'code': 'nok_工務担当者グループ',
                    'shown': false,
                    'disabled': true
                },
                'komuTantoshaUser': {
                    'code': 'nok_工務担当者ユーザー',
                    'shown': false,
                    'disabled': true
                },
                'komuTantoshaSosiki': {
                    'code': 'nok_工務担当者組織',
                    'shown': false,
                    'disabled': true
                },    
                //--顧客----------------------------------------------------------------
                'kokyakuSearch': {
                    'code': 'nok_顧客検索',
                    'shown': true,
                    'disabled': false,
                },
                'kokyakuId': {
                    'code': 'nok_顧客ID',
                    'shown': false,
                    'disabled': true,
                },
                'kokyakumei': {
                    'code': 'nok_顧客名',
                    'shown': true,
                    'disabled': true,
                },
                //--案件----------------------------------------------------------------
                'ankenId': {
                    'code': 'nok_案件ID',
                    'shown': true,
                    'disabled': true
                },
                'ankenIdKey': {
                    'code': 'nok_案件IDKey',
                    'shown': false,
                    'disabled': true,
                },
                'ankenmei': {
                    'code': 'nok_案件名',
                    'shown': true,
                    'disabled': false,
                },
                'chakkoYoteiBi': {
                    'code': 'nok_着工予定日',
                    'shown': true,
                    'disabled': false
                },
                'kankoYoteiBi': {
                    'code': 'nok_完工予定日',
                    'shown': true,
                    'disabled': false
                },
                'kojiSinchoku': {
                    'code': 'nok_工事進捗',
                    'shown': true,
                    'disabled': true,
                },
                'saishusagyobi': {
                    'code': 'nok_最終作業日',
                    'shown': true,
                    'disabled': true,
                },
                
                
                'genbaJusho': {
                    'code': 'nok_建築地',
                    'shown': true,
                    'disabled': false
                },
                'modelHouseMei': {
                    'code': 'nok_モデルハウス名',
                    'shown': true,
                    'disabled': false
                },
                'series': {
                    'code': 'nok_シリーズ',
                    'shown': true,
                    'disabled': false
                },
                
//                'tsubosu': {
//                    'code': 'nok_坪数',
//                    'shown': true,
//                    'disabled': false
//                },
                'kasaiHoken': {
                    'code': 'nok_火災保険',
                    'shown': true,
                    'disabled': false
                },
                'shihoshoshi': {
                    'code': 'nok_司法書士',
                    'shown': true,
                    'disabled': false
                },
                'ginkoMei': {
                    'code': 'nok_銀行名',
                    'shown': true,
                    'disabled': false
                },
                'ginkoSitenMei': {
                    'code': 'nok_銀行支店名',
                    'shown': true,
                    'disabled': false
                },                 
                //--担当者テーブル------------------------------------------------
                'tantoshaTB': {
                    'code': 'nok_担当者TB',
                    'shown': true,
                },
                'tantoshaBunrui_TB': {
                    'code': 'nok_担当者TB_担当者分類',
                    'shown': true,
                },
                'tantoshaMei_TB': {
                    'code': 'nok_担当者TB_担当者名',
                    'shown': true,
                },
                //--外注テーブル------------------------------------------------
                'gaichuTB': {
                    'code': 'nok_外注TB',
                    'shown': true,
                },
                'gaichuBunrui_TB': {
                    'code': 'nok_外注TB_外注分類'
                },
                'gaichuSearch_TB': {
                    'code': 'nok_外注TB_外注検索'
                },
                'gaichuMei_TB': {
                    'code': 'nok_外注TB_外注名'
                },
                //--日程テーブル------------------------------------------------
                'nitteiTB': {
                    'code': 'nok_日程TB',
                    'shown': true,
                },
                'bunrui_nitteiTB': {
                    'code': 'nok_日程TB_分類'
                },
                'keiyaku_nitteiTB': {
                    'code': 'nok_日程TB_契約'
                },
                'keiyakuKin_nitteiTB': {
                    'code': 'nok_日程TB_契約金'
                },
                'tochiKeiyaku_nitteiTB': {
                    'code': 'nok_日程TB_土地契約'
                },
                'honYushiMoshikomi_nitteiTB': {
                    'code': 'nok_日程TB_本融資申込'
                },
                'yushiNaidaku_nitteiTB': {
                    'code': 'nok_日程TB_融資内諾'
                },
                'tochiKessai_nitteiTB': {
                    'code': 'nok_日程TB_土地決済'
                },
                'zumenIrai_nitteiTB': {
                    'code': 'nok_日程TB_図面依頼'
                },
                'sekkeiHikitsugi_nitteiTB': {
                    'code': 'nok_日程TB_設計引継'
                },
                'zumenKakutei_nitteiTB': {
                    'code': 'nok_日程TB_図面確定'
                },
                'kakuninShinseiTeishutsu_nitteiTB': {
                    'code': 'nok_日程TB_確認申請提出'
                },
                'kakuninShinseiKyoka_nitteiTB': {
                    'code': 'nok_日程TB_確認申請許可'
                },
                'jibanChosa_nitteiTB': {
                    'code': 'nok_日程TB_地盤調査'
                },
                'jichinsai_nitteiTB': {
                    'code': 'nok_日程TB_地鎮祭'
                },
                'kairyoKoji_nitteiTB': {
                    'code': 'nok_日程TB_改良工事'
                },
                'chakkoMaeUchiawase_nitteiTB': {
                    'code': 'nok_日程TB_着工前打合せ'
                },
                'chakkoKinNyukin_nitteiTB': {
                    'code': 'nok_日程TB_着工金入金'
                },
                'chakkoKin_nitteiTB': {
                    'code': 'nok_日程TB_着工金'
                },
                'chakko_nitteiTB': {
                    'code': 'nok_日程TB_着工'
                },
                'haikinkensa_nitteiTB': {
                    'code': 'nok_日程TB_配筋検査'
                },
                'kiIshizueKanryo_nitteiTB': {
                    'code': 'nok_日程TB_基礎完了'
                },
                'dodaishiki_nitteiTB': {
                    'code': 'nok_日程TB_土台敷き'
                },
                'jotoKinNyuKinBi_nitteiTB': {
                    'code': 'nok_日程TB_上棟金入金日'
                },
                'jotoKin_nitteiTB': {
                    'code': 'nok_日程TB_上棟金'
                },
                'joto_nitteiTB': {
                    'code': 'nok_日程TB_上棟'
                },
                'mukuroTaiKensa_nitteiTB': {
                    'code': 'nok_日程TB_躯体検査'
                },
                'bosuiKensa_nitteiTB': {
                    'code': 'nok_日程TB_防水検査'
                },
                'mokukojiKanryo_nitteiTB': {
                    'code': 'nok_日程TB_木工事完了'
                },
                'kurosuKanryo_nitteiTB': {
                    'code': 'nok_日程TB_クロス完了'
                },
                'kurininguKanryo_nitteiTB': {
                    'code': 'nok_日程TB_クリーニング完了'
                },
                'shanaiShunko_nitteiTB': {
                    'code': 'nok_日程TB_社内竣工'
                },
                'shunkoNaoshiKanryo_nitteiTB': {
                    'code': 'nok_日程TB_竣工直し完了'
                },
                'shunko_nitteiTB': {
                    'code': 'nok_日程TB_竣工'
                },
                'saishuNyukinBi_nitteiTB': {
                    'code': 'nok_日程TB_最終入金日'
                },
                'nyuKingaku_nitteiTB': {
                    'code': 'nok_日程TB_入金額'
                },
                'hikiwatashiBi_nitteiTB': {
                    'code': 'nok_日程TB_引渡日'
                },                
                //--売上原価テーブル------------------------------------------------
                'genkaUriageTB': {
                    'code': 'nok_原価売上TB',
                    'shown': true,
                },
                'bunrui_genkaUriageTB': {
                    'code': 'nok_原価粗利TB_分類'
                },
                'uriage_genkaUriageTB': {
                    'code': 'nok_原価粗利TB_売上'
                },
                'genka_genkaUriageTB': {
                    'code': 'nok_原価粗利TB_原価'
                },
                'arari_genkaUriageTB': {
                    'code': 'nok_原価粗利TB_粗利'
                },
                'arariRitsu_genkaUriageTB': {
                    'code': 'nok_原価粗利TB_粗利率'
                },
                'tatemonoHontai_genkaUriageTB': {
                    'code': 'nok_原価粗利TB_建物本体'
                },
                'futaiKoji_genkaUriageTB': {
                    'code': 'nok_原価粗利TB_付帯工事'
                },
                'option_genkaUriageTB': {
                    'code': 'nok_原価粗利TB_オプション'
                },
                'nebikiService_genkaUriageTB': {
                    'code': 'nok_原価粗利TB_値引サービス'
                },
                'kenchikuShoHiyo_genkaUriageTB': {
                    'code': 'nok_原価粗利TB_建築諸費用'
                },
                'gokei_genkaUriageTB': {
                    'code': 'nok_原価粗利TB_合計'
                },
                'tatemonoHontaiGenka_genkaUriageTB': {
                    'code': 'nok_原価粗利TB_建物本体_原価'
                },
                'futaiKojiGenka_genkaUriageTB': {
                    'code': 'nok_原価粗利TB_付帯工事_原価'
                },
                'optionGenka_genkaUriageTB': {
                    'code': 'nok_原価粗利TB_オプション_原価'
                },
                'nebikiServiceGenka_genkaUriageTB': {
                    'code': 'nok_原価粗利TB_値引サービス_原価'
                },
                'kenchikuShoHiyoGenka_genkaUriageTB': {
                    'code': 'nok_原価粗利TB_建築諸費用_原価'
                },
                'gokeiGenka_genkaUriageTB': {
                    'code': 'nok_原価粗利TB_合計_原価'
                },                
                //--入金情報テーブル------------------------------------------------
                'nyukinJohoTB': {
                    'code': 'nok_入金情報TB',
                    'shown': true,
                },
                'ko_nyukinJohoTB': {
                    'code': 'nok_入金情報TB_項'
                },
                'bunrui_nyukinJohoTB': {
                    'code': 'nok_入金情報TB_分類'
                },
                'hidzuke_nyukinJohoTB': {
                    'code': 'nok_入金情報TB_日付'
                },
                'kingaku_nyukinJohoTB': {
                    'code': 'nok_入金情報TB_金額'
                },
                'uuid_nyukinJohoTB': {
                    'code': 'nok_入金情報TB_uuid',
                    'shown': false,
                },            
                //--その他テーブル------------------------------------------------
                'sonohokaTB': {
                    'code': 'nok_その他TB',
                    'shown': true,
                },
                'ko_sonohokaTB': {
                    'code': 'nok_その他TB_項'
                },
                'bunrui_sonohokaTB': {
                    'code': 'nok_その他TB_分類'
                },
                'hidzuke_sonohokaTB': {
                    'code': 'nok_その他TB_日付'
                },
                'kingaku_sonohokaTB': {
                    'code': 'nok_その他TB_金額'
                },
                //--システム------------------------------------------------------------
                'systemInfoGroup': {
                    'code': 'nok_グループ',
                    'shown': false
                },
                'recordId': {
                    'code': '$id'
                },
                'revision': {
                    'code': '$revision',
                    'shown': false,
                },
                'anken_recordNo': {
                    'code': 'nok_案件レコード番号'
                },
                'createdAt': {
                    'code': '作成日時'
                },
                'updatedTime': {
                    'code': '更新日時'
                }
            },
            //--案件管理ダイアログ設定----------------------
            koujikanriDaialog: {
                messages: {
                    'nippoNone': '工事アプリを呼び出した日報が存在しません。',
                    'registration': '登録しました。'
                }
            },
            messages: {
                'failGetSerialNumber': '工事ID情報の取得に失敗しました。',
            },

            //案件管理 ガントチャート設定
            ganttchart: {
                option: true,
                // 表示対象のビューID
                TtargetViewIds: [
                    6684967
                ],
                // ラベル
                lang: {
                    ja: {
                        months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                        dow: ['日', '月', '火', '水', '木', '金', '土'],
                        wait: '表示するまでお待ちください。',
                        plzEnterStartDate: '開始日を入力して下さい。',
                        plzEnterEndDate: '終了日を入力して下さい。',
                        update: '更新',
                        detailPage: '詳細画面へ',
                        emptyAlert: '日付を入力してください。',
                        authAlert: 'レコードを更新できませんでした。編集権限があるかご確認ください。'
                    },
                    en: {
                        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        dow: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                        wait: 'Please Wait...',
                        plzEnterStartDate: 'Please input start date.',
                        plzEnterEndDate: 'Please input end date.',
                        update: 'Update',
                        detailPage: 'Go to detail page',
                        emptyAlert: 'Please input date field.',
                        authAlert: 'The record could not be updated. Please check if you have edit permission.'
                    },
                    zh: {
                        months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                        dow: ['日', '一', '二', '三', '四', '五', '六'],
                        wait: '请等待显示屏',
                        plzEnterStartDate: '请输入开始日期。',
                        plzEnterEndDate: '请输入结束日期。',
                        update: '更新',
                        detailPage: '进入详细页面',
                        emptyAlert: '请输入日期',
                        authAlert: '不能更新记录了。请确认是否有编辑权限。'
                    }
                },

                settings: {
                    lang: 'ja',
                    i18n: 'ja',
                    quarter: {},
                    element: {
                        classColorGanttDefault: 'ganttGray',
                        prefixColorGantt: 'kintone-plugin-gantt-'
                    }
                },
                ganttchart: {
                    title: 'nok_顧客名',
                    desc: 'nok_案件名',
                    from: 'nok_着工予定日',
                    to: 'nok_完工予定日',
                    color: 'nok_工事進捗',
                    labels: [
                        'nok_案件名',
                    ]
                },
                fieldName: {
                    title: '顧客名',
                    desc: '工事名',
                    from: '着工予定日',
                    to: '完工予定日',
                    color: '工事進捗',
                    labels: ['工事名']
                },
                settingColors: {
                    '地質調査': '#4169e1',
                    '地下水調査': '#4682b4',
                    '土壌汚染調査': '#778899',
                    '赤外線劣化診断調査': '#b0c4de',
                    'さく井工事': '#e6e6fa',
                    '温泉掘削工事': '#f0f8ff',
                },
            },
        },


        eigyoRepoto: {
            app: 23209,
            fields: {
                //--担当者--------------------------------------------------------------
                'tantoshaSearch': {
                    'code': 'nok_担当者検索',
                    'shown': true,
                    'disabled': false
                },
                'tantoshaMei': {
                    'code': 'nok_担当者名',
                    'shown': true,
                    'disabled': true
                },
                'tantoshaId': {
                    'code': 'nok_担当者ID',
                    'shown': true,
                    'disabled': true
                },
                'tantoshaKyoten': {
                    'code': 'nok_担当者拠点',
                    'shown': false,
                    'disabled': true
                },
                'tantoshaBusho': {
                    'code': 'nok_担当者部署',
                    'shown': false,
                    'disabled': true
                },
                'tantoshaUser': {
                    'code': 'nok_担当者ユーザ',
                    'shown': false,
                    'disabled': true
                },
                'tantoshaSosiki': {
                    'code': 'nok_担当者組織',
                    'shown': false,
                    'disabled': true
                },
                //--顧客----------------------------------------------------------------
                'kokyakuId': {
                    'code': 'nok_顧客ID',
                    'shown': true,
                    'disabled': true,
                },
                'kokyakumei': {
                    'code': 'nok_顧客名',
                    'shown': true,
                    'disabled': true,
                },
                'kokyakuSearch': {
                    'code': 'nok_顧客検索',
                    'shown': true,
                    'disabled': false,
                },
                //--活動報告------------------------------------------------------------
                'katsudobi': {
                    'code': 'nok_活動日',
                    'shown': true,
                    'disabled': false,
                },
                'kaishijikoku': {
                    'code': 'nok_開始時刻',
                    'shown': true,
                    'disabled': false,
                },
                'shuryojikoku': {
                    'code': 'nok_終了時刻',
                    'shown': true,
                    'disabled': false,
                },
                'yoteiJisseki': {
                    'code': 'nok_予定・実績',
                    'shown': true,
                    'disabled': false,
                },
                'homonMokuteki': {
                    'code': 'nok_活動目的',
                    'shown': true,
                    'disabled': false,
                },
                'biko': {
                    'code': 'nok_活動内容',
                    'shown': true,
                    'disabled': false,
                },
                'nippoId': {
                    'code': 'nok_日報ID',
                    'shown': false,
                    'disabled': true
                },
                //--案件----------------------------------------------------------------
                'ankenmei': {
                    'code': 'nok_案件名',
                    'shown': true,
                    'disabled': true,
                },
                'ankenSearch': {
                    'code': 'nok_案件検索',
                    'keyset': false,
                    'shown': true,
                    'disabled': false,
                },
                'ankenId': {
                    'code': 'nok_案件ID',
                    'shown': true,
                    'disabled': true,
                },
                'ankenRecordId': {
                    'code': 'nok_案件レコード番号',
                    'shown': true,
                    'disabled': true,
                },
                'kakudo': {
                    'code': 'nok_確度',
                    'shown': true,
                    'disabled': true,
                },
                'homonkekka': {
                    'code': 'nok_活動結果',
                    'shown': true,
                    'disabled': true,
                },
                'uriage': {
                    'code': 'nok_売上',
                    'shown': true,
                    'disabled': true,
                },
                'fukakachi': {
                    'code': 'nok_粗利',
                    'shown': true,
                    'disabled': true,
                },
                'juchuyoteibi': {
                    'code': 'nok_受注予定日',
                    'shown': true,
                    'disabled': true,
                },
                'kenshuyoteibi': {
                    'code': 'nok_検収予定日',
                    'shown': true,
                    'disabled': true,
                },
                'homongoKakudo': {
                    'code': 'nok_訪問後_確度',
                    'shown': true,
                    'disabled': false,
                },
                'homongoKekka': {
                    'code': 'nok_訪問後_結果',
                    'shown': true,
                    'disabled': false,
                },
                'homongoUriage': {
                    'code': 'nok_訪問後_売上',
                    'shown': true,
                    'disabled': false,
                },
                'homongoFukakachi': {
                    'code': 'nok_訪問後_粗利',
                    'shown': true
                },
                'homongoJuchuyoteibi': {
                    'code': 'nok_訪問後_受注予定日',
                    'shown': true,
                    'disabled': false,
                },
                'homongoKenshuyoteibi': {
                    'code': 'nok_訪問後_検収予定日',
                    'shown': true,
                    'disabled': false,
                },

                //--システム------------------------------------------------------------
                'systemInfoGroup': {
                    'code': 'nok_グループ',
                    'shown': false
                },
                'recordId': {
                    'code': '$id'
                },
                'recordNo': {
                    'code': 'nok_営業レポートレコード番号'
                },
            },
            messages: {
                'saveError': '案件情報の更新に失敗しました。',
                'getViewError': 'スケジュール表示情報の取得に失敗しました。'
            },
            offsetMinutes: 60
        },


        // カレンダー表示設定アプリの設定
        view: {
            app: 1252,
            fields: {
                //--表示設定------------------------------------------------------------
                'hyojiMeisho': {
                    'code': 'nok_表示名称',
                    'shown': true,
                    'disabled': false
                },
                'acountId': {
                    'code': 'nok_アカウント情報',
                    'shown': true,
                    'disabled': false
                },
                //--担当者TB------------------------------------------------------------
                'tantoshaTable': {
                    'code': 'nok_担当者TB',
                    'shown': true,
                },
                'tantoshaSearch': {
                    'code': 'nok_担当者検索',
                },
                'name': {
                    'code': 'nok_担当者名',
                },
                'tantoshaId': {
                    'code': 'nok_担当者ID',
                },
                'shozoku01': {
                    'code': 'nok_担当者拠点',
                },
                'shozoku02': {
                    'code': 'nok_担当者部署',
                },
                //--システム------------------------------------------------------------
                'systemInfoGroup': {
                    'code': 'nok_グループ',
                    'shown': false
                },
                'recordId': {
                    'code': '$id'
                },
                'recordNo': {
                    'code': 'レコード番号'
                },
            }
        },


        // 入金情報アプリの設定
        nyukinJhoho: {
            app: 1250,
            fields: {
                //--担当者--------------------------------------------------------------
                'tantoshaSearch': {
                    'code': 'nok_担当者検索',
                    'shown': true,
                    'disabled': false
                },
                'tantoshaMei': {
                    'code': 'nok_担当者名',
                    'shown': true,
                    'disabled': true
                },
                'tantoshaId': {
                    'code': 'nok_担当者ID',
                    'shown': false,
                    'disabled': true
                },
                'tantoshaGroup': {
                    'code': 'nok_担当者グループ',
                    'shown': false,
                    'disabled': true
                },
                'tantoshaUser': {
                    'code': 'nok_担当者ユーザー',
                    'shown': false,
                    'disabled': true
                },
                'tantoshaSosiki': {
                    'code': 'nok_担当者組織',
                    'shown': false,
                    'disabled': true
                },
                //--工事----------------------------------------------------------------
                'koujimei': {
                    'code': 'nok_工事名',
                    'shown': true,
                    'disabled': true,
                },
                'koujiSearch': {
                    'code': 'nok_工事検索',
                    'keyset': false,
                    'shown': true,
                    'disabled': false,
                },
                'koujiId': {
                    'code': 'nok_工事ID',
                    'shown': false,
                    'disabled': true,
                },
                'kouji_RecordId': {
                    'code': 'nok_工事レコード番号',
                    'shown': true,
                    'disabled': true,
                },
                //--顧客----------------------------------------------------------------
                'kokyakuId': {
                    'code': 'nok_顧客ID',
                    'shown': false,
                    'disabled': true,
                },
                'kokyakumei': {
                    'code': 'nok_顧客名',
                    'shown': true,
                    'disabled': true,
                },
                //--活動報告------------------------------------------------------------
                'bunrui': {
                    'code': 'nok_分類',
                    'shown': true,
                    'disabled': false,
                },
                'hizuke': {
                    'code': 'nok_日付',
                    'shown': true,
                    'disabled': false,
                },
                'kingaku': {
                    'code': 'nok_金額',
                    'shown': true,
                    'disabled': false,
                },
                'meisaiNo': {
                    'code': 'nok_項',
                    'shown': true,
                    'disabled': true,
                },
                'uuid': { // UUID格納フィールドとして追加
                    'code': 'nok_uuid',
                    'shown': false,
                },
                //--システム------------------------------------------------------------
                'systemInfoGroup': {
                    'code': 'nok_グループ',
                    'shown': false
                },
                'recordId': {
                    'code': '$id'
                },
                'recordNo': {
                    'code': 'nok_入金情報レコード番号'
                },
            },
            messages: {

            },
            offsetMinutes: 540
        },


        // 作業日報アプリの設定
        sagyoNippo: {
            app: 23211,
            fields: {
                //--担当者--------------------------------------------------------------
                'tantoshaSearch': {
                    'code': 'nok_担当者検索',
                    'shown': true,
                    'disabled': false
                },
                'tantoshaId': {
                    'code': 'nok_担当者ID',
                    'shown': false,
                    'disabled': true
                },
                'tantoshaMei': {
                    'code': 'nok_担当者名',
                    'shown': true,
                    'disabled': true
                },
                'tantoshaGroup': {
                    'code': 'nok_担当者グループ',
                    'shown': false,
                    'disabled': true
                },
                'tantoshaUser': {
                    'code': 'nok_担当者ユーザー',
                    'shown': false,
                    'disabled': true
                },
                'tantoshaSosiki': {
                    'code': 'nok_担当者組織',
                    'shown': false,
                    'disabled': true
                },
                //--工事・顧客-----------------------------------------------------------
                'koujiSearch': {
                    'code': 'nok_工事検索',
                    'shown': true,
                    'disabled': false,
                },
                'koujiId': {
                    'code': 'nok_工事ID',
                    'shown': true,
                    'disabled': true
                },
                'koujimei': {
                    'code': 'nok_工事名',
                    'shown': true,
                    'disabled': false,
                },
                'kokyakuId': {
                    'code': 'nok_顧客ID',
                    'shown': false,
                    'disabled': true,
                },
                'kokyakumei': {
                    'code': 'nok_顧客名',
                    'shown': true,
                    'disabled': true,
                },
                //--日報----------------------------------------------------------------
                'sagyobi': {
                    'code': 'nok_作業日',
                    'shown': true,
                    'disabled': false,
                },
                'yoteiJisseki': {
                    'code': 'nok_予定実績',
                    'shown': true,
                    'disabled': false,
                },
                'chakkoYoteiBi': {
                    'code': 'nok_着工予定日',
                    'shown': true,
                    'disabled': false,
                },
                'kankoYoteiBi': {
                    'code': 'nok_完工予定日',
                    'shown': true,
                    'disabled': false,
                },
                'kojiSinchoku': {
                    'code': 'nok_工事進捗',
                    'shown': true,
                    'disabled': false,
                },
                'kaishijikoku': {
                    'code': 'nok_開始時刻',
                    'shown': true,
                    'disabled': false,
                },
                'shuryojikoku': {
                    'code': 'nok_終了時刻',
                    'shown': true,
                    'disabled': false,
                },
                'sagyoNippoIDKey': {
                    'code': 'nok_作業日報IDKey',
                    'shown': false,
                },
                'sagyoNippoId': {
                    'code': 'nok_作業日報ID',
                    'shown': false,
                },
                'meisaiRenkeiFlag': {
                    'code': 'nok_明細連携プラグ',
                    'shown': true,
                    'disabled': true,
                },
                //--原価テーブル------------------------------------------------
                'genkaTB': {
                    'code': 'nok_原価TB',
                    'shown': true,
                },
                'shukeiKahi': {
                    'code': 'nok_集計可否',
                    'taishoValue': '集計対象'
                },
                'roumuhi': {
                    'code': 'nok_労務費日計',
                    'shown': true,
                },
                'gaichuhi': {
                    'code': 'nok_外注費日計',
                    'shown': true,
                },
                'zairyohi': {
                    'code': 'nok_材料費日計',
                    'shown': true,
                },
                'keihi': {
                    'code': 'nok_経費日計',
                    'shown': true,
                },
                //--システム------------------------------------------------------------
                'systemInfoGroup': {
                    'code': 'nok_グループ',
                    'shown': false
                },
                'recordId': {
                    'code': '$id'
                },
                'sagyoNippo_recordNo': {
                    'code': 'nok_作業日報レコード番号'
                },
            },
            //案件管理のサブテーブル情報成型(案件アプリ)
            ankenSubTableSeikei: {
                'nok_作業内容TB': {
                    'sagyoMeisaiTB': 'sagyoMeisaiTB',
                    'sagyoshurui_TB': 'sagyoshurui_TB',
                    'sagyobiko_TB': 'sagyobiko_TB',
                    'yoteikousu_TB': 'yoteikousu_TB',
                    'jishikousu_TB': 'jishikousu_TB',
                    'ruikeikousu_TB': 'ruikeikousu_TB',
                    'goukeikousu_TB': 'goukeikousu_TB',
                    'uuid2_TB': 'uuid2_TB',
                },
            },
            //案件管理サブテーブル更新用（工程アプリ）
            updateSubTable: {
                'nok_作業内容TB': {
                    'sagyoMeisaiTB': 'sagyoMeisaiTB',
                    'sagyoshurui_TB': 'sagyoshurui_TB',
                    'sagyobiko_TB': 'sagyobiko_TB',
                    'yoteikousu_TB': 'yoteikousu_TB',
                    'jishikousu_TB': 'jishikousu_TB',
                    'ruikeikousu_TB': 'ruikeikousu_TB',
                    'goukeikousu_TB': 'goukeikousu_TB',
                    'uuid2_TB': 'uuid2_TB',
                },
            },
        },
        // 作業明細アプリの設定
        sagyoRepoto: {
            app: 1348,
            fields: {
                //--担当者--------------------------------------------------------------
                'tantoshaSearch': {
                    'code': 'nok_担当者検索',
                    'shown': true,
                    'disabled': false
                },
                'tantoshaMei': {
                    'code': 'nok_担当者名',
                    'shown': true,
                    'disabled': true
                },
                'tantoshaId': {
                    'code': 'nok_担当者ID',
                    'shown': false,
                    'disabled': true
                },
                'tantoshaGroup': {
                    'code': 'nok_担当者グループ',
                    'shown': false,
                    'disabled': true
                },
                'tantoshaUser': {
                    'code': 'nok_担当者ユーザー',
                    'shown': false,
                    'disabled': true
                },
                'tantoshaSosiki': {
                    'code': 'nok_担当者組織',
                    'shown': false,
                    'disabled': true
                },
                //--工事----------------------------------------------------------------
                'koujimei': {
                    'code': 'nok_工事名',
                    'shown': true,
                    'disabled': true,
                },
                'koujiSearch': {
                    'code': 'nok_工事検索',
                    'keyset': false,
                    'shown': true,
                    'disabled': false,
                },
                'koujiId': {
                    'code': 'nok_工事ID',
                    'shown': false,
                    'disabled': true,
                },
                'kouji_RecordId': {
                    'code': 'nok_工事レコード番号',
                    'shown': true,
                    'disabled': true,
                },
                //--顧客----------------------------------------------------------------
                'kokyakuId': {
                    'code': 'nok_顧客ID',
                    'shown': false,
                    'disabled': true,
                },
                'kokyakumei': {
                    'code': 'nok_顧客名',
                    'shown': true,
                    'disabled': true,
                },
                //--活動報告------------------------------------------------------------
                'sagyobi': {
                    'code': 'nok_作業日',
                    'shown': true,
                    'disabled': false,
                },
                'kaishibi': {
                    'code': 'nok_開始日',
                    'shown': true,
                    'disabled': false,
                },
                'shuryobi': {
                    'code': 'nok_終了日',
                    'shown': true,
                    'disabled': false,
                },
                'kaishijikoku': {
                    'code': 'nok_開始時刻',
                    'shown': true,
                    'disabled': false,
                },
                'shuryojikoku': {
                    'code': 'nok_終了時刻',
                    'shown': true,
                    'disabled': false,
                },
                'sagyobunrui': {
                    'code': 'nok_作業分類',
                    'shown': true,
                    'disabled': false,
                },
                'sagyonaiyo': {
                    'code': 'nok_作業内容',
                    'shown': true,
                    'disabled': false,
                },
                'yoteiJisseki': {
                    'code': 'nok_予定実績',
                    'shown': true,
                    'disabled': false,
                },
                'nippoId': {
                    'code': 'nok_日報ID',
                    'shown': false,
                    'disabled': true
                },
                'meisaiNo': {
                    'code': 'nok_項',
                    'shown': true,
                    'disabled': true,
                },
                'uuid': { // UUID格納フィールドとして追加
                    'code': 'nok_uuid',
                    'shown': false,
                },
                'sagyoNippoId': {
                    'code': 'nok_作業日報ID',
                    'shown': false,
                },
                //--システム------------------------------------------------------------
                'systemInfoGroup': {
                    'code': 'nok_グループ',
                    'shown': false
                },
                'recordId': {
                    'code': '$id'
                },
                'recordNo': {
                    'code': 'nok_作業報告レコード番号'
                },
            },
            messages: {

            },
            offsetMinutes: 540
        },

        // 担当者マスタアプリの設定
        tantosha: {
            app: 23208,
            fields: {
                //--担当者--------------------------------------------------------------
                'tantoshaSearchId': {
                    'code': 'nok_担当者検索コード',
                    'shown': true,
                    'disabled': true
                },
                'tantoshaMei': {
                    'code': 'nok_担当者名',
                    'shown': true,
                    'disabled': false
                },
                'tantoshaId': {
                    'code': 'nok_担当者ID',
                    'shown': true,
                    'disabled': false
                },
                'tantoshaGrop': {
                    'code': 'nok_担当者グループ',
                    'shown': true,
                    'disabled': false
                },
                'tantoshaSosiki': {
                    'code': 'nok_担当者組織',
                    'shown': true,
                    'disabled': false
                },
                'tantoshaUser': {
                    'code': 'nok_担当者ユーザー',
                    'shown': true,
                    'disabled': false
                },
                'scaduleHyouji': {
                    'code': 'nok_表示',
                    'shown': true,
                    'disabled': false
                },
                'hyouji': {
                    'code': 'nok_表示'
                },
                //--担当者表示フラグ---------------------------------------------------
                'hyoujiflag': {
                    'value': '表示する',
                },
                //--システム------------------------------------------------------------
                'systemInfoGroup': {
                    'code': 'nok_グループ',
                    'shown': false
                },
                'recordId': {
                    'code': '$id'
                },
                'recordNo': {
                    'code': 'nok_担当者レコード番号'
                },




            }
        },


        // 作業員スケジュールアプリの設定
        sagyoinSchedule: {
            app: 1361,
            fields: {
                //--担当者--------------------------------------------------------------
                'tantoshaSearch': {
                    'code': 'nok_担当者検索',
                    'shown': true,
                    'disabled': false
                },
                'tantoshaMei': {
                    'code': 'nok_担当者名',
                    'shown': true,
                    'disabled': true
                },
                'tantoshaId': {
                    'code': 'nok_担当者ID',
                    'shown': true,
                    'disabled': true
                },
                'tantoshaGroup': {
                    'code': 'nok_担当者グループ',
                    'shown': false,
                    'disabled': true
                },
                'tantoshaUser': {
                    'code': 'nok_担当者ユーザー',
                    'shown': false,
                    'disabled': true
                },
                'tantoshaSosiki': {
                    'code': 'nok_担当者組織',
                    'shown': false,
                    'disabled': true
                },
                //--顧客----------------------------------------------------------------
                'kokyakuSearch': {
                    'code': 'nok_顧客検索',
                    'shown': true,
                    'disabled': false,
                },
                'kokyakumei': {
                    'code': 'nok_顧客名',
                    'shown': true,
                    'disabled': true,
                },
                'kokyakuId': {
                    'code': 'nok_顧客ID',
                    'shown': true,
                    'disabled': true,
                },
                //--案件----------------------------------------------------------------
                'koujiSearch': {
                    'code': 'nok_工事検索',
                    'keyset': false,
                    'shown': true,
                    'disabled': false,
                },
                'koujimei': {
                    'code': 'nok_工事名',
                    'shown': true,
                    'disabled': false,
                },
                'koujiId': {
                    'code': 'nok_工事ID',
                    'shown': true,
                    'disabled': true,
                },
                'koujiRecordId': {
                    'code': 'nok_工事レコード番号',
                    'shown': true,
                    'disabled': true,
                },
                'chakkoYoteiBi': {
                    'code': 'nok_着工予定日',
                    'shown': true,
                    'disabled': true,
                },
                'kankoYoteiBi': {
                    'code': 'nok_完工予定日',
                    'shown': true,
                    'disabled': true,
                },
                //--活動報告------------------------------------------------------------
                'meisaiNo': {
                    'code': 'nok_項',
                    'shown': true,
                    'disabled': true,
                },
                'kaishibi': {
                    'code': 'nok_開始日',
                    'shown': true,
                    'disabled': false,
                },
                'shuryobi': {
                    'code': 'nok_終了日',
                    'shown': true,
                    'disabled': false,
                },
                'kaishijikoku': {
                    'code': 'nok_開始時刻',
                    'shown': true,
                    'disabled': false,
                },
                'shuryojikoku': {
                    'code': 'nok_終了時刻',
                    'shown': true,
                    'disabled': false,
                },
                'uuid': {
                    'code': 'nok_uuid',
                    'shown': true,
                    'disabled': false,
                },
                'yoteiJisseki': {
                    'code': 'nok_予定実績',
                    'shown': true,
                    'disabled': false,
                },
                'homonMokuteki': {
                    'code': 'nok_対応分類',
                    'shown': true,
                    'disabled': false,
                },
                'biko': {
                    'code': 'nok_対応内容',
                    'shown': true,
                    'disabled': false,
                },
                'nippoId': {
                    'code': 'nok_日報ID',
                    'shown': false,
                    'disabled': true
                },
                //--システム------------------------------------------------------------
                'systemInfoGroup': {
                    'code': 'nok_グループ',
                    'shown': false
                },
                'recordId': {
                    'code': '$id'
                },
                'recordNo': {
                    'code': 'nok_作業員スケジュールレコード番号'
                },
            },
            messages: {
                'saveError': '案件情報の更新に失敗しました。',
                'getViewError': 'スケジュール表示情報の取得に失敗しました。'
            },
            offsetMinutes: 60
        },

        // 作業員カレンダー表示設定アプリの設定
        sagyoinView: {
            app: 1350,
            fields: {
                //--表示設定------------------------------------------------------------
                'hyojiMeisho': {
                    'code': 'nok_表示名称',
                    'shown': true,
                    'disabled': false
                },
                'acountId': {
                    'code': 'nok_アカウント情報',
                    'shown': true,
                    'disabled': false
                },
                //--担当者TB------------------------------------------------------------
                'tantoshaTable': {
                    'code': 'nok_担当者TB',
                    'shown': true,
                },
                'tantoshaSearch': {
                    'code': 'nok_担当者TB_担当者検索',
                },
                'name': {
                    'code': 'nok_担当者TB_担当者名',
                },
                'tantoshaId': {
                    'code': 'nok_担当者TB_担当者ID',
                },
                'shozoku01': {
                    'code': 'nok_担当者TB_担当者グループ',
                },
                //--システム------------------------------------------------------------
                'systemInfoGroup': {
                    'code': 'nok_グループ',
                    'shown': false
                },
                'recordId': {
                    'code': '$id'
                },
                'recordNo': {
                    'code': 'レコード番号'
                },
            }
        },


        // 作業内容
        sagyoNaiyo: {
            app: 1352,
            fields: {
                //--案件----------------------------------------------------------------
                'koujiSearch': {
                    'code': 'nok_工事検索',
                    'shown': true,
                    'disabled': false,
                },
                'koujiId': {
                    'code': 'nok_工事ID',
                    'shown': true,
                    'disabled': true
                },
                'koujimei': {
                    'code': 'nok_工事名',
                    'shown': true,
                    'disabled': false,
                },
                'kokyakuId': {
                    'code': 'nok_顧客ID',
                    'shown': false,
                    'disabled': true,
                },
                'kokyakumei': {
                    'code': 'nok_顧客名',
                    'shown': true,
                    'disabled': true,
                },
                'katsudobi': {
                    'code': 'nok_着工予定日',
                    'shown': true,
                    'disabled': false
                },
                //                'kankoYoteiBi': {
                //                    'code': 'nok_完工予定日',
                //                    'shown': true,
                //                    'disabled': false
                //                },
                //明細
                'sagyoshurui': {
                    'code': 'nok_作業種類',
                    'shown': true,
                    'disabled': true
                },
                'sagyobiko': {
                    'code': 'nok_作業備考',
                    'shown': true,
                    'disabled': false,
                },
                'yoteikousu': {
                    'code': 'nok_予定工数',
                    'shown': true,
                    'disabled': false
                },
                'jishikousu': {
                    'code': 'nok_実施工数',
                    'shown': true,
                    'disabled': false
                },
                'jishikousu_0': {
                    'code': 'nok_実施工数_0',
                    'shown': true,
                    'disabled': false
                },
                'ruikeikousu': {
                    'code': 'nok_累計工数',
                    'shown': true,
                },
                'goukeikousu': {
                    'code': 'nok_合計工数',
                    'shown': true,
                },
                'uuid2': {
                    'code': 'nok_uuid2',
                    'shown': true,
                    'disabled': false
                },
                //--システム------------------------------------------------------------
                'systemInfoGroup': {
                    'code': 'nok_グループ',
                    'shown': false
                },
                'recordId': {
                    'code': '$id'
                },
                'revision': {
                    'code': '$revision',
                    'shown': false,
                },
                'sagyonaiyou_recordNo': {
                    'code': 'nok_作業内容レコード番号'
                },
            }
        },

        // 作業スケジュールアプリの設定
        sagyoSchedule: {
            app: 1353,
            fields: {
                //--担当者--------------------------------------------------------------
                'tantoshaSearch': {
                    'code': 'nok_担当者検索',
                    'shown': true,
                    'disabled': false
                },
                'tantoshaMei': {
                    'code': 'nok_担当者名',
                    'shown': true,
                    'disabled': true
                },
                'tantoshaId': {
                    'code': 'nok_担当者ID',
                    'shown': true,
                    'disabled': true
                },
                'tantoshaGroup': {
                    'code': 'nok_担当者グループ',
                    'shown': false,
                    'disabled': true
                },
                'tantoshaUser': {
                    'code': 'nok_担当者ユーザー',
                    'shown': false,
                    'disabled': true
                },
                'tantoshaSosiki': {
                    'code': 'nok_担当者組織',
                    'shown': false,
                    'disabled': true
                },
                //--顧客----------------------------------------------------------------
                'kokyakuSearch': {
                    'code': 'nok_顧客検索',
                    'shown': true,
                    'disabled': false,
                },
                'kokyakumei': {
                    'code': 'nok_顧客名',
                    'shown': true,
                    'disabled': true,
                },
                'kokyakuId': {
                    'code': 'nok_顧客ID',
                    'shown': true,
                    'disabled': true,
                },
                //--案件----------------------------------------------------------------
                'koujiSearch': {
                    'code': 'nok_工事検索',
                    'keyset': false,
                    'shown': true,
                    'disabled': false,
                },
                'koujimei': {
                    'code': 'nok_工事名',
                    'shown': true,
                    'disabled': false,
                },
                'koujiId': {
                    'code': 'nok_工事ID',
                    'shown': true,
                    'disabled': true,
                },
                'koujiRecordId': {
                    'code': 'nok_工事レコード番号',
                    'shown': true,
                    'disabled': true,
                },
                'chakkoYoteiBi': {
                    'code': 'nok_着工予定日',
                    'shown': true,
                    'disabled': true,
                },
                'kankoYoteiBi': {
                    'code': 'nok_完工予定日',
                    'shown': true,
                    'disabled': true,
                },
                //--活動報告------------------------------------------------------------
                'meisaiNo': {
                    'code': 'nok_項',
                    'shown': true,
                    'disabled': true,
                },
                //                'kaishibi': {
                'katsudobi': {
                    'code': 'nok_開始日',
                    'shown': true,
                    'disabled': false,
                },
                'shuryobi': {
                    'code': 'nok_終了日',
                    'shown': true,
                    'disabled': false,
                },
                'kaishijikoku': {
                    'code': 'nok_開始時刻',
                    'shown': true,
                    'disabled': false,
                },
                'shuryojikoku': {
                    'code': 'nok_終了時刻',
                    'shown': true,
                    'disabled': false,
                },
                'uuid': {
                    'code': 'nok_uuid',
                    'shown': true,
                    'disabled': false,
                },
                'yoteiJisseki': {
                    'code': 'nok_予定実績',
                    'shown': true,
                    'disabled': false,
                },
                'homonMokuteki': {
                    'code': 'nok_対応分類',
                    'shown': true,
                    'disabled': false,
                },
                'biko': {
                    'code': 'nok_対応内容',
                    'shown': true,
                    'disabled': false,
                },
                'nippoId': {
                    'code': 'nok_日報ID',
                    'shown': false,
                    'disabled': true
                },
                //--システム------------------------------------------------------------
                'systemInfoGroup': {
                    'code': 'nok_グループ',
                    'shown': false
                },
                'recordId': {
                    'code': '$id'
                },
                'recordNo': {
                    'code': 'nok_作業員スケジュールレコード番号'
                },
            },
            messages: {
                'saveError': '案件情報の更新に失敗しました。',
                'getViewError': 'スケジュール表示情報の取得に失敗しました。'
            },
            offsetMinutes: 60
        },

        // カレンダー表示設定アプリの設定
        dropboxSet: {
            app: 1350,
            fields: {
                //--表示設定------------------------------------------------------------
                'key': {
                    'code': 'nok_key',
                    'shown': true,
                    'disabled': true
                },
                'value': {
                    'code': 'nok_value',
                    'shown': true,
                    'disabled': true
                },
            },
            URL: 'NICE-kintone-plus',
            CONF_PARAM_APPID: 1145,			// 環境変数アプリのアプリID
            appkey: "66zfydwx98hzlqm",
            appsecret: "bli15suhjo7dray",
            DropboxRoot: "NICE-kintone-plus-kensetuLT3",
        },


        alert_msg_list: {
            johoKikakuSub: "sssssssssssssssss",

        },

        // 管理ユーザー情報
        kanriUsers: [
            //			'Administrator',
            'huongbls'
        ],
        // 管理者（名寄せ）
        nayose_kanriUsers: [
            'snc00244',
        ],
    }
})();