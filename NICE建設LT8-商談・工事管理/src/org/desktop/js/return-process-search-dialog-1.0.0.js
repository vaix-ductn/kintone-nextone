/**
 * @fileoverview ルックアップ共通検索ダイアログ 共通戻り処理
 *
 * 【必要ライブラリ】
 * [JavaScript]
 * jquery.min.js
 *
 * @author nakashima
 * @version 1.0.0
 * @customer XXXXX（yyyy-mm-dd）
 *
*/
jQuery.noConflict();
(function ($, nokConfig, retConfig, sncLib) {
    "use strict";

    // 新規登録完了後イベント時のみ
    kintone.events.on([
        'app.record.create.submit.success'
    ], function (event) {
        let record = event.record;

        // どのダイアログのチェックボックス対象なのかを判定し、対象の設定情報を設定
        let targetConf = null;
        for (let i = 0; i < retConfig.config.length; i++) {
            const dialogConf = retConfig.config[i];
            // レコード情報にチェックボックスフィールドの存在チェック
            if (record[dialogConf.checkField]) {
                // チェックが入っているかのチェック
                if (record[dialogConf.checkField].value[0] === '有') {
                    targetConf = dialogConf;
                } else {
                    continue;
                }
            }
        }

        // 対象のチェックボックスが存在しない場合は終了
        if (!targetConf) {
            return event;
        }

        // 確認のチェックを外す
        let update = {};
        update[targetConf.checkField] = {
            'value': []
        };
        let body = {
            'app': kintone.app.getId(),
            'id': record.$id.value,
            'record': update
        }

        return new kintone.Promise(function (resolve, reject) {
            kintone.api(kintone.api.url('/k/v1/record', true), 'PUT', body).then(function (resp) {
                // 元ウィンドウがあるか確認
                if (!window.opener || window.opener.closed) {
                    alert('呼び出し元の画面が存在しません。');
                } else {
                    // 元ウィンドウのフィールド情報取得
                    let parentRecord = window.opener.kintone.app.record.get();
                    //
                    switch (targetConf.type) {
                        // 単数
                        case 'single':
                            parentRecord.record[targetConf.targetField].value = record[targetConf.sourceField].value;
                            parentRecord.record[targetConf.targetField].lookup = true;
                            window.opener.kintone.app.record.set(parentRecord);
                            alert('登録しました。');
                            window.close();
                            break;
                        // 複数用
                        case 'multiple':
                            // サブテーブルの1行目を取得（必ず1行存在するのでインデックス０で取得）
                            let sutableValue = parentRecord.record[targetConf.subtableField].value[0].value;
                            let sutableValueTemp = $.extend(true, {}, sutableValue);
                            // データセットテンプレート用にvalueをundefinedにする
                            for (const key in sutableValueTemp) {
                                if (Object.hasOwnProperty.call(sutableValueTemp, key)) {
                                    sutableValueTemp[key].value = null;
                                }
                            }

                            // セット対象フィールドへ値をセットし、自動ルックアップをON
                            sutableValueTemp[targetConf.targetField].value = record[targetConf.sourceField].value;
                            sutableValueTemp[targetConf.targetField].lookup = true;

                            let subtables = parentRecord.record[targetConf.subtableField].value;
                            subtables.push({
                                'value': sutableValueTemp
                            });

                            window.opener.kintone.app.record.set(parentRecord);
                            alert('登録しました。');
                            window.close();
                            break;
                        default:
                            break;
                    }
                }
                // returnではなく、成功時のハンドラresolveをつかってeventを返却する
                resolve(event);
            }).catch(function (error) {
                // error
                console.log(error);
                // console.log(resp);
                return event;
            });
        });
    });

})(jQuery, window.nokConfig, window.retConfig, window.snc);
