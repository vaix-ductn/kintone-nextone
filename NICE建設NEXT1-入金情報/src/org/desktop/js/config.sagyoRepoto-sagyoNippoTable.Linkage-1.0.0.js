/**
 * @fileoverview 建設業版LTパック 作業レポートアプリ・作業日報アプリ連携の設定情報
 * @author SNC
 * @version 1.0.0
 * @customer （2023-06-25）
 */
(function (config) {
    'use strict';

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
            renkeiFields: [
                // 工事検索
                {
                    sourceFieldCode: 'nok_担当者検索',
                    targetFieldCode: 'nok_担当者検索',
                },
                // 契約日
                {
                    sourceFieldCode: 'nok_契約日',
                    targetFieldCode: 'nok_契約日_予定',
                },
                // 着工日
                {
                    sourceFieldCode: 'nok_着工日',
                    targetFieldCode: 'nok_着工日_予定',
                },
                // 上棟日
                {
                    sourceFieldCode: 'nok_上棟日',
                    targetFieldCode: 'nok_上棟日_予定',
                },
                // 引渡日
                {
                    sourceFieldCode: 'nok_引渡日',
                    targetFieldCode: 'nok_引渡日_予定',
                },
                // 分譲地名
                {
                    sourceFieldCode: 'nok_分譲地名',
                    targetFieldCode: 'nok_分譲地名',
                },
                // 銀行名
                {
                    sourceFieldCode: 'nok_銀行名',
                    targetFieldCode: 'nok_銀行名',
                },
                // 銀行支店名
                {
                    sourceFieldCode: 'nok_銀行支店名',
                    targetFieldCode: 'nok_銀行支店名',
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

            nyukinJohoTBList: [
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
            ],

            nitteiTBRowIndex: 3,

            nitteiTableList: [
                {
                    itemNo: 1,
                    dataLink: [
                        {
                            sourceFieldCode: 'nok_入金日',
                            targetFieldCode: 'nok_日程TB_請負手付金入金日',
                        },
                        {
                            sourceFieldCode: 'nok_入金金額',
                            targetFieldCode: 'nok_日程TB_請負手付金金額',
                        },
                    ]
                },
                {
                    itemNo: 2,
                    dataLink: [
                        {
                            sourceFieldCode: 'nok_入金日',
                            targetFieldCode: 'nok_日程TB_仲介手数料1入金日',
                        },
                        {
                            sourceFieldCode: 'nok_入金金額',
                            targetFieldCode: 'nok_日程TB_仲介手数料1',
                        }
                    ]
                },
                {
                    itemNo: 3,
                    dataLink: [
                        {
                            sourceFieldCode: 'nok_入金日',
                            targetFieldCode: 'nok_日程TB_仲介手数料2入金日',
                        },
                        {
                            sourceFieldCode: 'nok_入金金額',
                            targetFieldCode: 'nok_日程TB_仲介手数料2',
                        },
                    ]
                },
                {
                    itemNo: 4,
                    dataLink: [
                        {
                            sourceFieldCode: 'nok_入金日',
                            targetFieldCode: 'nok_日程TB_不動産手付金入金日',
                        },
                        {
                            sourceFieldCode: 'nok_入金金額',
                            targetFieldCode: 'nok_日程TB_不動産手付金金額',
                        },
                    ]
                },
                {
                    itemNo: 5,
                    dataLink: [
                        {
                            sourceFieldCode: 'nok_入金日',
                            targetFieldCode: 'nok_日程TB_不動産最終金入金日',
                        },
                        {
                            sourceFieldCode: 'nok_入金金額',
                            targetFieldCode: 'nok_日程TB_不動産最終金金額',
                        },
                    ]
                },
                {
                    itemNo: 6,
                    dataLink: [
                        {
                            sourceFieldCode: 'nok_入金日',
                            targetFieldCode: 'nok_日程TB_着工金入金日',
                        },
                        {
                            sourceFieldCode: 'nok_入金金額',
                            targetFieldCode: 'nok_日程TB_着工金金額',
                        },
                    ]
                },
                {
                    itemNo: 7,
                    dataLink: [
                        {
                            sourceFieldCode: 'nok_入金日',
                            targetFieldCode: 'nok_日程TB_上棟金入金日',
                        },
                        {
                            sourceFieldCode: 'nok_入金金額',
                            targetFieldCode: 'nok_日程TB_上棟金金額',
                        },
                    ]
                },
                {
                    itemNo: 8,
                    dataLink: [
                        {
                            sourceFieldCode: 'nok_入金日',
                            targetFieldCode: 'nok_日程TB_最終金入金日',
                        },
                        {
                            sourceFieldCode: 'nok_入金金額',
                            targetFieldCode: 'nok_日程TB_最終金金額',
                        },
                    ]
                },
                {
                    itemNo: 9,
                    dataLink: [
                        {
                            sourceFieldCode: 'nok_入金日',
                            targetFieldCode: 'nok_日程TB_最終金追加入金日',
                        },
                        {
                            sourceFieldCode: 'nok_入金金額',
                            targetFieldCode: 'nok_日程TB_最終金追加金額',
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