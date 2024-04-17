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