/**
 * @fileoverview　建設業版LTパック 工事管理アプリ 作業員明細テーブル・作業員スケジュールアプリ連携の設定情報
 * @author SNC
 * @version 3.5.0
 * @customer （2023-06-25）
 */
(function (config) {
    'use strict';

    // グローバル変数
    window.sagyoinTableLinkageConfig = window.sagyoinTableLinkageConfig || {
        // 作業一覧サブテーブル名
        workTable: {
            name: 'nok_入金情報TB',
            class: 'subtable-6159792',
            position: 1
        },
        /**
         * 更新対象フィールドリスト
         *  sourceFieldCode: テーブルアプリ 更新用フィールド
         *  targetFieldCode: 明細アプリ 参照用フィールド
         *  【！！！ 注意事項 ！！！】
         *  明細アプリと双方向連携の場合、双方のconfigで不整合が発生しないよう注意
         ----------------------------------------------------------------- */
        // 連携フィールド設定
        linkageFields: {
            renkeiFields: [
                // 工事検索
                {
                    sourceFieldCode: 'nok_工事ID',
                    targetFieldCode: 'nok_工事検索',
                },
                // 工事検索
                {
                    sourceFieldCode: 'nok_担当者検索',
                    targetFieldCode: 'nok_担当者検索',
                },


            ],
            // 明細テーブル
            workTableList: [
                // 項
                {
                    sourceFieldCode: 'nok_入金情報TB_項',
                    targetFieldCode: 'nok_項',
                },
                // 分類
                {
                    sourceFieldCode: 'nok_入金情報TB_分類',
                    targetFieldCode: 'nok_分類',
                },
                // 日付
                {
                    sourceFieldCode: 'nok_入金情報TB_日付',
                    targetFieldCode: 'nok_日付',
                },
                // 金額
                {
                    sourceFieldCode: 'nok_入金情報TB_金額',
                    targetFieldCode: 'nok_金額',
                },
                // UUID
                {
                    sourceFieldCode: 'nok_入金情報TB_uuid',
                    targetFieldCode: 'nok_uuid',
                },

            ]
        },
        /**
         * サブテーブル情報の並べ替えの設定
         ----------------------------------------------------------------- */
        workTableOrder: 'asc',
        workTableSortList: [
          　'nok_入金情報TB_項',
//            'nok_入金情報TB_分類', // 開始日

　　
        ],
        message: {
            meisaiRegisterError: {
                title: '登録エラー',
                text: '明細アプリ　レコードの登録処理に失敗しました',
                icon: 'error',
                confirmButtonText: 'OK'
            },
            meisaiDeleteError: {
                title: '削除エラー',
                text: '明細アプリ　レコードの削除処理に失敗しました',
                icon: 'error',
                confirmButtonText: 'OK'
            },
            error: 'エラーが発生しました。もう一度お試しください。',
            cannotDelete: '作業員スケジュールで参照しているデータのため削除できません。',
            dateOverError: '作業日報の「開始日」、「終了日」は「着工予定日」から「完工予定日」までの日付を指定してください。',
        }
    };

})(window.nokConfig);