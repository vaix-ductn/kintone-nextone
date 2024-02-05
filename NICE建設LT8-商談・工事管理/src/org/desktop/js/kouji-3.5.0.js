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
 *
 * [CSS]
 * 51-us-default.css
 *
 * @author SNC
 * @version 3.5.0
 * @customer （2023-06-25）
*/
(function (config, sncLib) {
    'use strict';
    const cfgKouji = config.kouji;
    const cfgKoujiFields = config.kouji.fields;

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

})(window.nokConfig, window.snc);