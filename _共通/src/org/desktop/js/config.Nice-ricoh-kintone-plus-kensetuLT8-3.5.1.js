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
			app: 24548,
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


        // 顧客マスタアプリの設定
        kokyaku: {
            app: 23210,
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
                    'code': 'nok_顧客郵便番号',
                    'shown': true,
                    'disabled': false,
                },
                'jusho': {
                    'code': 'nok_顧客住所',
                    'shown': true,
                    'disabled': false,
                },
                'tel': {
                    'code': 'nok_顧客TEL',
                    'shown': true,
                    'disabled': false,
                },
                'fax': {
                    'code': 'nok_顧客FAX',
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

        // 工事管理アプリの設定
        kouji: {
            app: 23209,
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
                'koujiId': {
                    'code': 'nok_工事ID',
                    'shown': true,
                    'disabled': true
                },
                'koujiIdKey': {
                    'code': 'nok_工事IDKey',
                    'shown': false,
                    'disabled': true,
                },
                'koujimei': {
                    'code': 'nok_工事名',
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
                //---------------------------------------------------------------------
                'roumuhi': {
                    'code': 'nok_労務費合計',
                    'shown': true,
                    'disabled': true
                },
                'gaichuhi': {
                    'code': 'nok_外注費合計',
                    'shown': true,
                    'disabled': true
                },
                'zairyohi': {
                    'code': 'nok_材料費合計',
                    'shown': true,
                    'disabled': true
                },
                'keihi': {
                    'code': 'nok_経費合計',
                    'shown': true,
                    'disabled': true
                },
                //--入金情報テーブル------------------------------------------------
                'meisaiTB': {
                    'code': 'nok_入金情報TB',
                    'name': '入金情報',
                    'shown': true,
                },
                'meisaiNo_TB': {
                    'code': 'nok_入金情報TB_項',
                    'shown': true,
                },
                'nyukinBunrui_TB': {
                    'code': 'nok_入金情報TB_分類',
                    'shown': true,
                },
                'nyukinHisuke_TB': {
                    'code': 'nok_入金情報TB_日付',
                    'shown': true,
                },
                'nyukinKingaku_TB': {
                    'code': 'nok_入金情報TB_金額',
                    'shown': true,
                },
                'uuid_TB': {
                    'code': 'nok_入金情報TB_uuid',
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
                'revision': {
                    'code': '$revision',
                    'shown': false,
                },
                'kouji_recordNo': {
                    'code': 'nok_工事レコード番号'
                },
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
        },


        // 入金情報アプリの設定
        nyukinJhoho: {
            app: 23215,
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
        ],
        // 管理者（名寄せ）
        nayose_kanriUsers: [
            'snc00244',
        ],
    }
})();
