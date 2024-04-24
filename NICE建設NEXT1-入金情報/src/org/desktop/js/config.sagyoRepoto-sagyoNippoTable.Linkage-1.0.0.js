/**
 * @fileoverview 建設業版LTパック 作業レポートアプリ・作業日報アプリ連携の設定情報
 * @author SNC
 * @version 1.0.0
 * @customer （2023-06-25）
 */
(function (config) {
    'use strict';

    const cfgTableAppFields = config.anken.fields;
    const cfgMeisaiFields = config.nyukinJhoho.fields;

    // グローバル変数
    window.meisaiLinkageConfig = window.meisaiLinkageConfig || {
        // 作業一覧サブテーブル名
        workTable: {
            name: 'nok_入金情報TB'
        },
        // 業務管理との関連付けのための案件検索フィールド
        renkeiId: {
            sourceFieldCode: 'nok_案件ID',
            targetFieldCode: 'nok_案件ID',
        },
        /**
         * 更新対象フィールドリスト
         *  sourceFieldCode: 業務管理アプリ 参照用フィールド
         *  targetFieldCode: 予定・報告アプリ 更新用フィールド
         *  【！！！ 注意事項 ！！！】
         *  業務管理と双方向連携の場合、双方のconfigで不整合が発生しないよう注意
         ----------------------------------------------------------------- */
        // 連携フィールド設定
        linkageFields: {
            //「入金情報アプリ」の通常フィールドを「工事管理アプリ」の通常フィールドにリンクします。
            renkeiFields: [
                // 工事検索
                {
                    sourceFieldCode: cfgMeisaiFields.tantoshaSearch.code,
                    targetFieldCode: cfgTableAppFields.tantoshaSearch.code,
                },
                // 契約日
                {
                    sourceFieldCode: cfgMeisaiFields.keiyakuBi.code,
                    targetFieldCode: cfgTableAppFields.keiyakuBiYotei.code,
                },
                // 着工日
                {
                    sourceFieldCode: cfgMeisaiFields.chakkoBi.code,
                    targetFieldCode: cfgTableAppFields.chakkoBiYotei.code,
                },
                // 上棟日
                {
                    sourceFieldCode: cfgMeisaiFields.jotoBi.code,
                    targetFieldCode: cfgTableAppFields.jotoBiYotei.code,
                },
                // 引渡日
                {
                    sourceFieldCode: cfgMeisaiFields.hikiwatashiBi.code,
                    targetFieldCode: cfgTableAppFields.hikiwatashiBiYotei.code,
                },
                // 分譲地名
                {
                    sourceFieldCode: cfgMeisaiFields.bunjoChiMei.code,
                    targetFieldCode: cfgTableAppFields.bunjoChiMei.code,
                },
                // 銀行名
                {
                    sourceFieldCode: cfgMeisaiFields.ginkoMei.code,
                    targetFieldCode: cfgTableAppFields.ginkoMei.code,
                },
                // 銀行支店名
                {
                    sourceFieldCode: cfgMeisaiFields.ginkoSitenMei.code,
                    targetFieldCode: cfgTableAppFields.ginkoSitenMei.code,
                },
            ],
            // 作業一覧サブテーブル
            workTableList: [
                // 項番
                {
                    sourceFieldCode: 'nok_項',
                    targetFieldCode: 'nok_入金情報TB_項',
                },
                // 担当者
                {
                    sourceFieldCode: 'nok_分類',
                    targetFieldCode: 'nok_入金情報TB_分類',
                },
                // 開始時刻
                {
                    sourceFieldCode: 'nok_入金日',
                    targetFieldCode: 'nok_入金情報TB_入金日',
                },
                // 終了時刻
                {
                    sourceFieldCode: 'nok_入金金額',
                    targetFieldCode: 'nok_入金情報TB_入金金額',
                },
                // 開始時刻
                {
                    sourceFieldCode: 'nok_入金予定日',
                    targetFieldCode: 'nok_入金情報TB_入金予定日',
                },
                // 終了時刻
                {
                    sourceFieldCode: 'nok_入金予定金額',
                    targetFieldCode: 'nok_入金情報TB_入金予定金額',
                },                
                // 作業分類
                {
                    sourceFieldCode: 'nok_uuid',
                    targetFieldCode: 'nok_入金情報TB_uuid',
                },

            ],

            // 「入金情報アプリ」の通常フィールドを「工事管理アプリ」のサブテーブル「入金情報」にリンクします
            nyukinJohoTBList: [
                // 開始時刻
                {
                    sourceFieldCode: cfgMeisaiFields.nyukinBi.code,
                    targetFieldCode: cfgTableAppFields.nyukinBi_nyukinJohoTB.code,
                },
                // 終了時刻
                {
                    sourceFieldCode: cfgMeisaiFields.nyukinKingaku.code,
                    targetFieldCode: cfgTableAppFields.nyukinKingaku_nyukinJohoTB.code,
                },
            ],

            //「入金情報アプリ」の通常フィールドを「工事管理アプリ」のサブテーブル「日程」にリンクします
            nitteiTBRowIndex: 3,

            nitteiTableList: [
                {
                    itemNo: 1,
                    dataLink: [
                        {
                            sourceFieldCode: cfgMeisaiFields.nyukinBi.code,
                            targetFieldCode: cfgTableAppFields.ukeoiTetsukeKinNyukinBi_nitteiTB.code,
                        },
                        {
                            sourceFieldCode: cfgMeisaiFields.nyukinKingaku.code,
                            targetFieldCode: cfgTableAppFields.ukeoiTetsukeKinKingaku_nitteiTB.code,
                        },
                    ]
                },
                {
                    itemNo: 2,
                    dataLink: [
                        {
                            sourceFieldCode: cfgMeisaiFields.nyukinBi.code,
                            targetFieldCode: cfgTableAppFields.chukaiTesuryo1NyukinBi_nitteiTB.code,
                        },
                        {
                            sourceFieldCode: cfgMeisaiFields.nyukinKingaku.code,
                            targetFieldCode: cfgTableAppFields.chukaiTesuryo1_nitteiTB.code,
                        }
                    ]
                },
                {
                    itemNo: 3,
                    dataLink: [
                        {
                            sourceFieldCode: cfgMeisaiFields.nyukinBi.code,
                            targetFieldCode: cfgTableAppFields.chukaiTesuryo2NyukinBi_nitteiTB.code,
                        },
                        {
                            sourceFieldCode: cfgMeisaiFields.nyukinKingaku.code,
                            targetFieldCode: cfgTableAppFields.chukaiTesuryo2_nitteiTB.code,
                        },
                    ]
                },
                {
                    itemNo: 4,
                    dataLink: [
                        {
                            sourceFieldCode: cfgMeisaiFields.nyukinBi.code,
                            targetFieldCode: cfgTableAppFields.fudosanTetsukeKinNyukinBi_nitteiTB.code,
                        },
                        {
                            sourceFieldCode: cfgMeisaiFields.nyukinKingaku.code,
                            targetFieldCode: cfgTableAppFields.fudosanTetsukeKinKingaku_nitteiTB.code,
                        },
                    ]
                },
                {
                    itemNo: 5,
                    dataLink: [
                        {
                            sourceFieldCode: cfgMeisaiFields.nyukinBi.code,
                            targetFieldCode: cfgTableAppFields.fudosanSaishuKinNyukinBi_nitteiTB.code,
                        },
                        {
                            sourceFieldCode: cfgMeisaiFields.nyukinKingaku.code,
                            targetFieldCode: cfgTableAppFields.fudosanSaishuKinKingaku_nitteiTB.code,
                        },
                    ]
                },
                {
                    itemNo: 6,
                    dataLink: [
                        {
                            sourceFieldCode: cfgMeisaiFields.nyukinBi.code,
                            targetFieldCode: cfgTableAppFields.chakkokKinNyukinBi_nitteiTB.code,
                        },
                        {
                            sourceFieldCode: cfgMeisaiFields.nyukinKingaku.code,
                            targetFieldCode: cfgTableAppFields.chakkokKinKingaku_nitteiTB.code,
                        },
                    ]
                },
                {
                    itemNo: 7,
                    dataLink: [
                        {
                            sourceFieldCode: cfgMeisaiFields.nyukinBi.code,
                            targetFieldCode: cfgTableAppFields.jotoKinNyuKinBi_nitteiTB.code,
                        },
                        {
                            sourceFieldCode: cfgMeisaiFields.nyukinKingaku.code,
                            targetFieldCode: cfgTableAppFields.jotoKinKingaku_nitteiTB.code,
                        },
                    ]
                },
                {
                    itemNo: 8,
                    dataLink: [
                        {
                            sourceFieldCode: cfgMeisaiFields.nyukinBi.code,
                            targetFieldCode: cfgTableAppFields.saishuKinNyukinBi_nitteiTB.code,
                        },
                        {
                            sourceFieldCode: cfgMeisaiFields.nyukinKingaku.code,
                            targetFieldCode: cfgTableAppFields.saishuKinKingaku_nitteiTB.code,
                        },
                    ]
                },
                {
                    itemNo: 9,
                    dataLink: [
                        {
                            sourceFieldCode: cfgMeisaiFields.nyukinBi.code,
                            targetFieldCode: cfgTableAppFields.saishuKinTsuikaNyukinBi_nitteiTB.code,
                        },
                        {
                            sourceFieldCode: cfgMeisaiFields.nyukinKingaku.code,
                            targetFieldCode: cfgTableAppFields.saishuKinTsuikaKingaku_nitteiTB.code,
                        },
                    ]
                },
            ]
        },
        /**
         * サブテーブル情報の並べ替えの設定
         ----------------------------------------------------------------- */
        workTableOrder: 'asc',
        workTableSortList: [
            'nok_入金情報TB_項',
        ],
        errorMessage: {
            updateRelatedRecordError: {
                title: '登録エラー',
                text: '関連するレコードの更新処理に失敗しました',
                icon: 'error',
                confirmButtonText: 'OK'
            },
        }
    };

})(window.nokConfig);