/**
 * @fileoverview NICE営業物語 on RICOH kintone plus 建設業版　作業日報アプリ
 * @fileoverview 作業日報アプリ（テーブル情報）と作業明細アプリ（明細情報）の連携設定情報
 * @author SNC
 * @version 3.5.1
 * @customer （2023-09-01）
 */
(function (config) {
    'use strict';

//    const cfgTableAppFields = config.sagyoNippo.fields;             // テーブルアプリのフィールド
//    const cfgMeisaiAppFields = config.sagyoRepoto.fields; // 明細アプリのフィールド

    // グローバル変数
    window.tableLinkageConfig = window.tableLinkageConfig || {
        // サブテーブル名
        workTable: {
            name: 'nok_入金情報TB',
            class: 'subtable-6159792',
            position: 1
        },
        // サブテーブルNo
        workTableNo: {
            name: 'nok_入金情報TB_項',
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
                // 案件検索
                {
                    sourceFieldCode: 'nok_案件ID',
                    targetFieldCode: 'nok_案件検索',
                },
                // 顧客検索
                {
                    sourceFieldCode: 'nok_顧客検索',
                    targetFieldCode: 'nok_顧客検索',
                },                
                // 担当者検索
                {
                    sourceFieldCode: 'nok_担当者検索',
                    targetFieldCode: 'nok_担当者検索',
                },
                // 契約日
                {
                    sourceFieldCode: 'nok_契約日_予定',
                    targetFieldCode: 'nok_契約日',
                },
                // 契約日
                {
                    sourceFieldCode: 'nok_上棟日_予定',
                    targetFieldCode: 'nok_上棟日',
                },
                // 契約日
                {
                    sourceFieldCode: 'nok_引渡日_予定',
                    targetFieldCode: 'nok_引渡日',
                },                
                // 契約日
                {
                    sourceFieldCode: 'nok_分譲地名',
                    targetFieldCode: 'nok_分譲地名',
                },                  
                // 着工日
                {
                    sourceFieldCode: 'nok_着工日_予定',
                    targetFieldCode: 'nok_着工日',
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
                    sourceFieldCode: 'nok_入金情報TB_入金日',
                    targetFieldCode: 'nok_入金日',
                },
                // 金額
                {
                    sourceFieldCode: 'nok_入金情報TB_入金金額',
                    targetFieldCode: 'nok_入金金額',
                },
                // 日付
                {
                    sourceFieldCode: 'nok_入金情報TB_入金予定日',
                    targetFieldCode: 'nok_入金予定日',
                },
                // 金額
                {
                    sourceFieldCode: 'nok_入金情報TB_入金予定金額',
                    targetFieldCode: 'nok_入金予定金額',
                },                
                // uuid
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
            'nok_入金情報TB_項', // 終了時刻
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
            }
        }
    };

})(window.nokConfig);