/**
 * @fileoverview NICE営業物語 on RICOH kintone plus 建設業版　案件アプリ ネクストワン専用
 * ガントチャート機能
 * 再利用時フィールドクリア機能
 *
 *【必要ライブラリ】
 * [JavaScript]
 * jquery.min.js v2.2.3
 * snc.min.js v1.0.5
 * snc.kintone.min.js v1.0.8
 * snc.nok.min.js v1.0.5
 * config.Nice-ricoh-kintone-plus-kensetu-3.5.1
 *
 * [CSS]
 * 51-us-default.css
 *
 * @version 3.5.1
 * @customer （2024-02-29）
 */
(function ($, moment, config, sncLib) {
    'use strict';
    const cfgAnken = config.anken;
    const cfgAnkenFields = config.anken.fields;
    const configGanttchart = config.anken.ganttchart;

    /**
     *　 再利用時にフィールドをクリアする機能
     * 　configのフィールド項目「reuseclear」がtrueのフィールドが対象
    */
    //通常フィールド
    function reuseLiset(record, fields) {
        for (var fieldKey in fields) {
            // 設定を参照し、非表示設定の場合、フィールドを非表示とする。
            if (fields[fieldKey].reuseclear === true) {
                record[fields[fieldKey].code].value = "";
            }
        }
    }
    //ルックアップフィールド
    function reuseLisetLookup(record, fields) {
        for (var fieldKey in fields) {
            // 設定を参照し、非表示設定の場合、フィールドを非表示とする。
            if (fields[fieldKey].reuseclear === true) {
                record[fields[fieldKey].code].lookup = 'CLEAR';
            }
        }
    }
    //テーブルフィールド
    function reuseLisetTable(record, fields) {
        for (var fieldKey in fields) {
            // 設定を参照し、非表示設定の場合、フィールドを非表示とする。
            if (fields[fieldKey].reuseclear === true) {
                record[fields[fieldKey].code].value = [];
            }
        }
    }

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
    ], function (event) {
        var record = event.record;
        // ログインユーザーのアカウントを取得
        var loginUser = kintone.getLoginUser();
        // 担当者情報の取得
        if (event.type == 'app.record.create.show') {
            // 担当者情報を取得
            record[cfgAnkenFields.tantoshaSearch.code].value = loginUser.code;
            record[cfgAnkenFields.tantoshaSearch.code].lookup = true;
            // 営業担当者が設定されていれば、ルックアップを更新
            if (record[cfgAnkenFields.eigyoTantoshaSearch.code].value) {
                record[cfgAnkenFields.eigyoTantoshaSearch.code].lookup = true;
            }  
            // 顧客名が設定されていれば、ルックアップを更新
            if (record[cfgAnkenFields.kokyakuSearch.code].value) {
                record[cfgAnkenFields.kokyakuSearch.code].lookup = true;
            }
            // 再利用時にconfigでreuseclear = true のフィールドをクリアする
            if (event.reuse = true) {
                reuseLiset(event.record, cfgAnkenFields);//通常フィールド
                reuseLisetLookup(event.record, cfgAnkenFields);//ルックアップフィールド
                reuseLisetTable(event.record, cfgAnkenFields);//テーブルフィールド
            }
        }
        // ログインユーザーが管理アカウントではない場合
        if (config.kanriUsers.indexOf(loginUser.code) == -1) {
            // フィールドの表示/非表示設定
            sncLib.nok.util.setAppFieldsShown(cfgAnkenFields);
            if (
                event.type == 'app.record.create.show'
                || event.type == 'app.record.edit.show'
                || event.type == 'app.record.index.edit.show'
            ) {
                // フィールドの入力可/否設定
                sncLib.nok.util.setAppFieldsDisabled(event.record, cfgAnkenFields);
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

    //--------------------------------------------------------------------------
    var GANTT_COLOR = configGanttchart.ganttchart.color;
    var GANTT_NAME = configGanttchart.ganttchart.title;
    var GANTT_DESC = configGanttchart.ganttchart.desc;
    var GANTT_FROM = configGanttchart.ganttchart.from;
    var GANTT_TO = configGanttchart.ganttchart.to;
    var GANTT_LABELS = configGanttchart.ganttchart.labels;
    /**
     * ローディング画面を出す関数
     */
    function setLoading() {
        'use strict';
        var $body = $('body');
        $body.css('width', '100%');
        var $loading = $('<div>').attr('id', 'loading').attr('class', 'loading')
            .attr('style', 'width: 100%; height: 100%; position:absolute;' +
                ' top:0; left:0; text-align:center; background-color:#666666; opacity:0.6; z-index: 10000;');
        var $div = $('<div>').attr('id', 'imgBox').attr('style', 'width: 100%; height: 100%;');
        var $img = $('<img>').attr('src', 'data:image/gif;base64,R0lGODlhZABkAPQAAAAAAP///3BwcJaWlsjIyMLCwqKiouLi4uzs7NLS' +
            '0qqqqrKysoCAgHh4eNra2v///4iIiLq6uvT09AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH+GkNyZWF0ZWQgd2l0aCBh' +
            'amF4bG9hZC5pbmZvACH5BAAHAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAZABkAAAF/yAgjmRpnmiqrmzrvnAsz3Rt33iu73zfMgoDw0csAgSE' +
            'h/JBEBifucRymYBaaYzpdHjtuhba5cJLXoHDj3HZBykkIpDWAP0YrHsDiV5faB3CB3c8EHuFdisNDlMHTi4NEI2CJwWFewQuAwtBMAIKQZGSJAmV' +
            'elVGEAaeXKEkEaQSpkUNngYNrCWEpIdGj6C3IpSFfb+CAwkOCbvEy8zNzs/Q0dLT1NUrAgOf1kUMBwjfB8rbOQLe3+C24wxCNwPn7wrjEAv0qzMK' +
            '7+eX2wb0mzXu8iGIty1TPRvlBKazJgBVnBsN8okbRy6VgoUUM2rcyLGjx48gQ4ocSbKkyZMoJf8JMFCAwAJfKU0gOUDzgAOYHiE8XDGAJoKaalAo' +
            'ObHERFESU0oMFbF06YikKQQsiKCJBYGaNR2ocPr0AQCuQ8F6Fdt1rNeuLSBQjRDB3qSfPm1uPYvUbN2jTO2izQs171e6J9SuxXjCAFaaQYkC9ku2' +
            'MWCnYR2rkDqV4IoEWG/O5fp3ceS7nuk2Db0YBQS3UVm6xBmztevXsGPLnk27tu3buHOvQU3bgIPflscJ4C3D92/gFNUWgHPj2G+bmhkWWL78xvPj' +
            'Dog/azCdOmsXzrF/dyYgAvUI7Y7bDF5N+QLCM4whM7BxvO77+PPr38+//w4GbhSw0xMQDKCdJAwkcIx2ggMSsQABENLHzALILDhMERAQ0BKE8IUS' +
            'wYILPjEAhCQ2yMoCClaYmA8NQLhhh5I0oOCCB5rAQI0mGEDiRLfMQhWOI3CXgIYwotBAA/aN09KQCVw4m4wEMElAkTEhIWUCSaL0IJPsySZVlC/5' +
            'J+aYZJZppgghAAAh+QQABwABACwAAAAAZABkAAAF/yAgjmRpnmiqrmzrvnAsz3Rt33iu73zfMhAIw0csAgQDhESCGAiM0NzgsawOolgaQ1ldIobZ' +
            'sAvS7ULE6BW5vDynfUiFsyVgL58rwQLxOCzeKwwHCIQHYCsLbH95Dg+OjgeAKAKDhIUNLA2JVQt4KhGPoYuSJEmWlgYuSBCYLRKhjwikJQqnlgpF' +
            'sKGzJAa2hLhEuo6yvCKUv549BcOjxgOVhFdFdbAOysYNCgQK2HDMVAXexuTl5ufo6err7O3kAgKs4+48AhEH+ATz9Dj2+P8EWvET0YDBPlX/Eh7i' +
            '18CAgm42ICT8l2ogAAYPFSyU0WAiPjcDtSkwIHCGAAITE/+UpCeg4EqTKPGptEikpQEGL2nq3Mmzp8+fQIMKHUq0qNGjSJO6E8DA4RyleQw4mOqg' +
            'k1F4LRo4OEDVwTQUjk48MjGWxC6zD0aEBbBWbdlJBhYsAJlC6lSuDiKoaOuWbdq+fMMG/us37eCsCuRaVWG3q94UfEUIJlz48GHJsND6VaFJ8UEA' +
            'WrdS/SqWMubNgClP1nz67ebIJQTEnduicdWDZ92aXq17N+G1kV2nwEqnqYGnUJMrX868ufPn0KNLn069Or+N0hksSFCArkWmORgkcJCgvHeWCiIY' +
            'OB9jAfnx3D+fE5A+woKKNSLAh4+dXYMI9gEonwoKlPeeON8ZAOCgfTc0UB5/OiERwQA5xaCJff3xM6B1HHbo4YcghigiNXFBhEVLGc5yEgEJEKBP' +
            'FBBEUEAE7M0yAIs44leTjDNGUKEkBrQopDM+NFDAjEf+CMiNQhJAWpE8zqjkG/8JGcGGIjCQIgoMyOhjOkwNMMCWJTTkInJZNYAlPQYU4KKT0xnp' +
            'opsFTKmUPW8ScOV0N7oJ53TxJAbBmiMWauihiIIYAgAh+QQABwACACwAAAAAZABkAAAF/yAgjmRpnmiqrmzrvnAsz3Rt33iu73zv/8AZo4BAFBjB' +
            'pI5xKBYPSKWURnA6CdNszGrVeltc5zcoYDReiXDCBSkQCpDxShA52AuCFoQribMKEoGBA3IpdQh2B1h6TQgOfisDgpOQhSMNiYkIZy4CnC0Ek4IF' +
            'liVMmnYGQAmigWull5mJUT6srRGwJESZrz+SrZWwAgSJDp8/gJOkuaYKwUADCQ4JhMzW19jZ2tvc3d7f4NoCCwgPCAs4AwQODqrhIgIOD/PzBzYD' +
            'DgfsDgrvAAX0AqKjIW0fuzzhJASk56CGwXwOaH1bGLBGQX0H31Gch6CGgYf93gGkOJCGgYIh3/8JUBjQHg6J/gSMlBABob+bOHPq3Mmzp8+fQIMK' +
            'HUq0qNEUAiBAOHZ0RYN10p41PZGg6jQHNk/M07q1BD2vX0l0BdB1rIiKKhgoMMD0BANpVqmpMHv2AVm7I7aa1Yu3bl6+YvuuUEDYXdq40qqhoHu3' +
            '8d+wfvf2pRjYcYq1a0FNg5vVBGPAfy03lhwa8mjBJxqs7Yzi6WapgemaPh0b9diythnjSAqB9dTfwIMLH068uPHjyJMrX84cnIABCwz4Hj4uAYEE' +
            'eHIOMAAbhjrr1lO+g65gQXcX0a5fL/nOwIL3imlAUG/d8DsI7xfAlEFH/SKcEAywHw3b9dbcgQgmqOByggw26KAIDAxwnnAGEGAhe0AIoEAE0mXz' +
            'lBsWTojDhhFwmE0bFroR3w8RLNAiLtg8ZaGFbfVgwIv2WaOOGzn+IIABCqx4TRk1pkXYgMQNUUAERyhnwJIFFNAjcTdGaWJydCxZ03INBFjkg2CG' +
            'KeaYCYYAACH5BAAHAAMALAAAAABkAGQAAAX/ICCOZGmeaKqubOu+cCzPdG3feK7vfO//wBnDUCAMBMGkTkA4OA8EpHJKMzyfBqo2VkBcEYWtuNW8' +
            'HsJjoIDReC2e3kPEJRgojulVPeFIGKQrEGYOgCoMBwiJBwx5KQMOkJBZLQILkAuFKQ2IiYqZjQANfA4HkAltdKgtBp2tA6AlDJGzjD8KrZ0KsCSi' +
            'pJCltT63uAiTuyIGsw66asQHn6ACCpEKqj8DrQevxyVr0D4NCgTV3OXm5+jp6uvs7e7v6gIQEQkFEDgNCxELwfACBRICBtxGQ1QCPgn6uRsgsOE9' +
            'GgoQ8inwLV2ChgLRzKCHsI9Cdg4wBkxQw9LBPhTh/wG4KHIODQYnDz6Ex1DkTCEL6t189w+jRhsf/Q04WACPyqNIkypdyrSp06dQo0qdSrWqVUcL' +
            '+NER0MAa1AYOHoh9kKCiiEoE6nl1emDsWAIrcqYlkDKF2BNjTeQl4bbEXRF//47oe8KABLdjg4qAOTcBAcWAH+iVLBjA3cqXJQ/WbDkzX84oFCAe' +
            'y+wEg8Zp136e3Pnz3sitN28mDLsyiQWjxRo7EaFxXRS2W2OmDNqz7NrDY5swkPsB5FC91a6gHRm08OKvYWu3nd1EW8Rw9XA1q1TAd7Flr76wo1W9' +
            '+/fw48ufT7++/fv48+s/wXUABPLwCWAAAQRiolQD/+FDIKRdBOz0TjgKkGNDAwsSSJBKEESowHOUEFjEY0lJEyGAegyw4G5HNcAAiS0g2ACL+8Uo' +
            '44w01mjjjTi+wMCKMs5TQAQO+iCPAQme00AEP/4IIw0DZLVAkLA0kGQBBajGQ5MLKIDiMUcmGYGVO0CQZXvnCIAkkFOsYQCH0XQVAwP+sRlgVvss' +
            'adU8+6Cp3zz66JmfNBFE8EeMKrqZ46GIJqrooi6EAAAh+QQABwAEACwAAAAAZABkAAAF/yAgjmRpnmiqrmzrvnAsz3Rt33iu73zv/0Baw2BoBI88' +
            'g2N5MCCfNgZz6WBArzEl1dHEeluGw9Sh+JpTg+1y8GpABGdWQxFZWF0L7nLhEhAOgBFwcScNCYcOCXctAwsRbC5/gIGEJwuIh3xADJOdg5UjEQmJ' +
            'owlBYZ2AEKAkeZgFQZypB0asIgyYCatBCakEtiQMBQkFu0GGkwSfwGYQBovM0dLT1NXW19jZ2ts+AgYKA8s0As6Q3AADBwjrB9AzogkEytwN6uvs' +
            '4jAQ8fxO2wr3ApqTMYAfgQSatBEIeK8MjQEHIzrUBpAhgoEyIkSct62BxQP5YAhoZCDktQEB2/+d66ZAQZGVMGPKnEmzps2bOHPq3Mmzp88v5Iz9' +
            'ZLFAgtGLjCIU8IezqFGjDzCagCBPntQSDx6cyKoVa1avX0mEBRB2rAiuXU00eMoWwQoF8grIW2H2rFazX/HeTUs2Lde+YvmegMCWrVATC+RWpSsY' +
            'sN6/I/LyHYtWL+ATAwo/PVyCatWrgU1IDm3Zst2+k/eiEKBZgtsVA5SGY1wXcmTVt2v77aq7cSvNoIeOcOo6uPARAhhwPs68ufPn0KNLn069uvXr' +
            'fQpklSAoRwOT1lhXdgC+BQSlEZZb0175QcJ3Sgt039Y+6+sZDQrI119LW/26MUQQ33zaSFDfATY0kFh2euewV9l748AkwAGVITidAAA9gACE2HXo' +
            '4YcghijiiN0YEIEC5e3QAAP9RWOiIxMd0xKK0zhSRwRPMNCSAepVYoCNTMnoUopxNDLbEysSuVIDLVLXyALGMSfAAgsosICSP01J5ZXWQUBlj89h' +
            'SeKYZJZpJoghAAAh+QQABwAFACwAAAAAZABkAAAF/yAgjmRpnmiqrmzrvnAsz3Rt33iu73zv/0Bag8FoBI+8RmKZMCKfNQbTkSAIoNgYZElNOBjZ' +
            'cGtLLUPE6JSg601cXQ3IO60SQAzyF9l7bgkMbQNzdCUCC1UJEWAuAgOCLwYOkpIDhCdbBIiVQFIOB5IHVpYlBpmmC0EMk6t9oyIDplUGqZ+ek06u' +
            'AAwEpqJBCqsOs7kjDAYLCoM/DQa1ycSEEBCL0NXW19jZ2tvc3d7fPwJDAsoz4hC44AIFB+0R5TGwvAbw2Q0E7fnvNQIEBbwEqHVj0A5BvgPpYtzj' +
            '9W+TNwUHDR4QqBAgr1bdIBzMlzCGgX8EFtTD1sBTPgQFRv/6YTAgDzgAJfP5eslDAAMFDTrS3Mmzp8+fQIMKHUq0qNGjSJMisYNR6YotCBAE9GPA' +
            'gE6fEKJqnbiiQYQCYCmaePDgBNmyJc6mVUuC7Ai3AOC+ZWuipAStUQusGFDgawQFK+TOjYtWhFvBhwsTnlsWseITDfDibVoCAtivgFUINtxY8VnH' +
            'iwdz/ty2MwoBkrVSJtEAbNjAjxeDnu25cOLaoU2sSa236wCrKglvpss5t/DHcuEO31z57laxTisniErganQSNldf3869u/fv4MOLH0++vHk/A5YQ' +
            'eISjQfBr6yTIl5/Sxp2/76sNmM9fuwsDESyAHzgJ8DdfbzN4JWCkBBFYd40DBsqXgA0DMIhMfsQUGGEENjRQIR4v7Rehfy9gWE18/DkEnh0RJELi' +
            'eTDGKOOMNAa1DlkS1Bceap894ICJUNjhCJAyFNAjWahAA8ECTKrow5FkIVDNMcgMAwSUzFnCAJMLvHiDBFBKWQ1LLgERAZRJBpVTiQ70eMBQDSig' +
            'AHSnLYCAj2kCJYCcBjwz3h98EnkUM1adJ2iNiCaq6KKLhgAAIfkEAAcABgAsAAAAAGQAZAAABf8gII5kaZ5oqq5s675wLM90bd94ru987//AoHAY' +
            'EywShIWAyKwtCMjEokmFCaJQwrLKVTWy0UZ3jCqAC+SfoCF+NQrIQrvFWEQU87RpQOgbYg0MMAwJDoUEeXoiX2Z9iT0LhgmTU4okEH0EZgNCk4WF' +
            'EZYkX5kEEEJwhoaVoiIGmklDEJOSgq0jDAOnRBBwBba3wcLDxMXGx8jJysvMzUJbzgAGn7s2DQsFEdXLCg4HDt6cNhHZ2dDJAuDqhtbkBe+Pxgze' +
            '4N8ON+Tu58jp6+A3DPJtU9aNnoM/OBrs4wYuAcJoPYBBnEixosWLGDNq3Mixo8ePIEOKxGHEjIGFKBj/DLyY7oDLA1pYKIgQQcmKBw9O4MxZYmdP' +
            'nyRwjhAKgOhQoCcWvDyA4IC4FAHtaLvJM2hOo0WvVs3K9ehRrVZZeFsKc0UDmnZW/jQhFOtOt2C9ingLt+uJsU1dolmhwI5NFVjnxhVsl2tdwkgN' +
            'by0RgSyCpyogqGWbOOvitlvfriVc2LKKli9jjkRhRNPJ0ahTq17NurXr17Bjy55NG0UDBQpOvx6AoHdTiTQgGICsrIFv3wdQvoCwoC9xZAqO+34O' +
            'w0DfBQ+VEZDeW4GNOgsWTC4WnTv1QQaAJ2vA9Hhy1wPaN42XWoD1Acpr69/Pv79/ZgN8ch5qBUhgoIF7BSMAfAT07TDAgRCON8ZtuDWYQwIQHpig' +
            'KAzgpoCEOGCYoQQJKGidARaaYB12LhAwogShKMhAiqMc8JYDNELwIojJ2EjXAS0UCOGAywxA105EjgBBBAlMZdECR+LESmpQRjklagxE+YB6oyVw' +
            'ZImtCUDAW6K51mF6/6Wp5po2hAAAIfkEAAcABwAsAAAAAGQAZAAABf8gII5kaZ5oqq5s675wLM90bd94ru987//AoHAYE0AWC4iAyKwNCFDCoEmF' +
            'CSJRQmRZ7aoaBWi40PCaUc/o9OwTNMqvhiE84LYYg4GSnWpEChEQMQ0MVlgJWnZ8I36AgHBAT4iIa4uMjo9CC5MECZWWAI2Oij4GnaefoEcFBYVC' +
            'AlCIBK6gIwwNpEACCgsGubXAwcLDxMXGx8jJysvMZ7/KDAsRC5A1DQO9z8YMCQ4J39UzBhHTCtrDAgXf3gkKNg3S0hHhx9zs3hE3BvLmzOnd6xbc' +
            'YDCuXzMI677RenfOGAR1CxY26yFxosWLGDNq3Mixo8ePIEOKHEmyZDEBAwz/GGDQcISAlhMFLHBwwIEDXyyOZFvx4MGJnj5LABU6lETPEUcBJEVa' +
            '9MQAm1Ad0CshE4mCqUaDZlWqlatXpl9FLB26NGyKCFBr3lyxCwk1nl3F+iwLlO7crmPr4r17NqpNAzkXKMCpoqxcs0ftItaaWLFhEk9p2jyAlSrM' +
            'ukTjNs5qOO9hzipkRiVsMgXKwSxLq17NurXr17Bjy55Nu7ZtIoRWwizZIMGB3wR2f4FQuVjv38gLCD8hR8HVg78RIEdQnAUD5woqHjMgPfpv7S92' +
            'Oa8ujAHy8+TZ3prYgED331tkp0Mef7YbJctv69/Pv7//HOlI0JNyQ+xCwHPACOCAmV4S5AfDAAhEKF0qfCyg14BANCChhAc4CAQCFz6mgwIbSggY' +
            'KCGKmAOJJSLgDiggXiiBC9cQ5wJ3LVJ4hoUX5rMCPBIEKcFbPx5QYofAHKAXkissIKSQArGgIYfgsaGAki62JMCTT8J0Wh0cQcClkIK8JuaYEpTp' +
            'GgMIjIlAlSYNMKaOq6HUpgQIgDkbAxBAAOd/gAYqKA0hAAAh+QQABwAIACwAAAAAZABkAAAF/yAgjmRpnmiqrmzrvnAsz3Rt33iu73zv/8CgcChr' +
            'QAYNotImiBQKi+RyCjM4nwOqtmV4Og3bcIpRuDLEaBNDoTjDGg1BWmVQGORDA2GfnZusCxFgQg17BAUEUn4jEYGNQwOHhhCLJFYREQpDEIZ7ipUC' +
            'VgqfQAt7BYOVYkduqq6vsLGys7S1tre4ubq7UwIDBn04DAOUuwJ7CQQReDUMC8/FuXrJydE0Bs92uwvUBAnBNM7P4LcK3ufkMxDAvMfnBbw9oQsD' +
            'zPH3+Pn6+/z9/v8AAwocSLCgwYO9IECwh9AEBAcJHCRq0aAOqRMPHmDMaCKjRhIeP47gKIIkyZEeU/8IgMiSABc2mlacRAlgJkebGnGizCmyZk8U' +
            'AxIIHdoqRR02LGaW5AkyZFOfT5c6pamURFCWES+aCGWgKIqqN3uGfapzqU+xTFEIiChUYo+pO0uM3fnzpMm6VUs8jDixoVoIDBj6HUy4sOHDiBMr' +
            'Xsy4sWMSTSRkLCD4ltcZK0M+QFB5lgIHEFPNWKB5cq7PDg6AFh0DQem8sVaCBn0gQY3XsGExSD0bdI0DryXgks0bYg3SpeHhQj07HQzgIR10lmWA' +
            'r/MYC1wjWDD9sffv4MOLR3j1m5J1l/0UkMCevXIgDRIcQHCAQHctENrrv55D/oH/B7ynnn7t2fYDAwD+R59zVmEkQCB7BvqgQIIAphdGBA9K4JIL' +
            'cbzQAID0/cfgFvk9aE0KDyFA34kp+AdgBK4MQKCAKEqg4o0sniBAAQBS9goEESQQQY4nJHDjjRGy0EBg/Rx55GFO3ngYAVFuWBiCRx4w4kENFKBi' +
            'AVuOJ+aYZIoZAgAh+QQABwAJACwAAAAAZABkAAAF/yAgjmRpnmiqrmzrvnAsz3Rt33iu73zv/8CgcChrMBoNotImUCwiiuRyCoNErhEIdduCPJ9a' +
            'rhgleEYWgrHaxIBAGDFkep1iGBhzobUQkdJLDAtOYUENEXx8fn8iBguOBkMNiImLJF6CA0MCBYh9lSMCEAYQikAMnBFwn2MCRquvsLGys7S1tre4' +
            'ubq7vDqtpL5HvAIGBMYDeTTECgrJtwwEBcYEzjIMzKO7A9PGpUUGzN61EMbSBOIxoei0ZdOQvTuhAw3V8Pb3+Pn6+/z9/v8AAwocSBCQo0wFUwhI' +
            '8KDhgwPrerUSUK8EAYcOD/CTRCABGhUMMGJ8d6JhSZMlHP+mVEkCJQCULkVgVFggQUcCC1QoEOlQQYqYMh+8FDrCZEyjRIMWRdoyaZ2bNhOoOmGA' +
            'Z8OcKIAO3bqUpdKjSXk25XqiQdSb60JaJWlCK9OlZLeChetVrtMSm85iTXFRpMafdYfefRsUqEuYg7WWkGTTk4qFGB1EHEavIpuDCTNr3sy5s+fP' +
            'oEOLHk063YCaCZD1mlpjk4TXrwtYjgWh5gLWMiDA3o3wFoQECRwExw2jwG7YCXDlFS58r4wEx187wMUgOHDgEWpEiC4h+a281h34pKE7em9b1YUD' +
            'n7xiwHHZugKdYc/CSoIss0vr38+/v//RTRAQhRIC4AHLAAcgoCCkAuf50IACDkTYzCcCJLiggvTRAKEDB0TIFh0GXLjgeD4wwGGEESaQIREKiKgg' +
            'iT2YiOKJxI0xgIsIfKgCPS+YFWGHwq2oiYULHpCfCFZE+FELBszoQIN0NEDkATWaIACHB2TpwJEAEGOdaqsIMIACYLKwQJZoHuDcCkZweUsBaCKQ' +
            'JQGfEZBmlgV8ZkCCceqYWXVpUgOamNEYIOR/iCaq6KIAhAAAIfkEAAcACgAsAAAAAGQAZAAABf8gII5kaZ5oqq5s675wLM90bd94ru987//AoHBI' +
            'ExCPOMhiAUE6ZYLl0vissqJSqnWLGiwUA64Y1WiMfwKGmSgwgM+otsKwFhoWkYgBbmIo/gxEeXgLfCUNfwp1QQp4eoaHakdRelqQl5iZmpucnZ6f' +
            'oKGioz8LCA8IC5akOAcPr68Oq6CzMguwuAWjEBEFC4syDriwEqICvcg2w7iiDQXPBRHAMKfLD8bR0RE2t8u6ogzPEU01AsK4ErWdAtMzxxKvBeqs' +
            '9PX29/j5+vv8/f7/AAMKNAEBwryBJAYgkMCwEMIUAxhKlOBQn4AB0cKsWDiRYTsRr07AMjGSBDOT10D/pgyJkmUXAjAJkEMBoaPEmSRTogTgkue1' +
            'niGB6hwptAXMAgR8qahpU4JGkTpHBI06bGdRlSdV+lQRE6aCjU3n9dRatCzVoT/NqjCAFCbOExE7VoQ6tqTUtC2jbtW6967eE2wjPFWhUOLchzQN' +
            'Il7MuLHjx5AjS55MubJlGQ3cKDj4kMEBBKARDKZ1ZwDnFQI+hwb9UZMAAglgb6uhcDXor6EUwN49GoYC26AJiFoQu3jvF7Vt4wZloDjstzBS2z7Q' +
            'WtPuBKpseA594LinAQYU37g45/Tl8+jTq19fmUF4yq8PfE5QPQeEAgkKBLpUQL7/BEJAkMCADiSwHx8NyIeAfH8IHOgDfgUm4MBhY0Dg34V7ACEh' +
            'gQnMxocACyoon4M9EBfhhJdEcOEBwrkwQAQLeHcCAwNKSEB9VRzjHwHmAbCAA0Ci6AIDeCjiGgQ4jjBAkAcAKSNCCgQZ5HKOGQBkk0Bm+BgDUjZJ' +
            'YmMGYOmAlpFlRgd7aKap5poyhAAAIfkEAAcACwAsAAAAAGQAZAAABf8gII5kaZ5oqq5s675wLM90bd94ru987//AoHBIExCPOIHB0EA6ZUqFwmB8' +
            'WlkCqbR69S0cD8SCy2JMGd3f4cFmO8irRjPdW7TvEaEAYkDTTwh3bRJCEAoLC35/JIJ3QgaICwaLJYGND0IDkRCUJHaNBXoDAxBwlGt3EqadRwIF' +
            'EmwFq6y0tba3uLm6u7y9viYQEQkFpb8/AxLJybLGI7MwEMrSA81KEQNzNK/SyQnGWQsREZM1CdzJDsYN4RHh2TIR5xLev1nt4zbR59TqCuOcNVxx' +
            'Y1btXcABBBIkGPCsmcOHECNKnEixosWLGDNq3MjxCIRiHV0wIIAAQQKAIVX/MDhQsqQElBUFNFCAjUWBli0dGGSEyUQbn2xKOOI5IigAo0V/pmBQ' +
            'IEIBgigg4MS5MynQoz1FBEWKtatVrVuzel2h4GlTflGntnzGFexYrErdckXaiGjbEv6aEltxc+qbFHfD2hUr+GvXuIfFmmD6NEJVEg1Y4oQJtC3i' +
            'xDwtZzWqWfGJBksajmhA0iTllCk+ikbNurXr17Bjy55Nu7bt20HkKGCwOiWDBAeC63S4B1vvFAIIBF+e4DEuAQsISCdHI/Ly5ad1QZBeQLrzMssR' +
            'LFdgDKF0AgUUybB+/YB6XiO7Sz9+QkAE8cEREPh+y8B5hjbYtxxU6kDQAH3I7XEgnG4MNujggxBGCAVvt2XhwIUK8JfEIX3YYsCFB2CoRwEJJEQA' +
            'gkM0ANyFLL7HgwElxphdGhCwCKIDLu4QXYwEUEeJAAnc6EACOeowAI8n1TKAjQ74uIIAo9Bnn4kRoDgElEEmQIULNWY54wkMjAKSLQq+IMCQQwZp' +
            '5UVdZpnkbBC4OeSXqCXnJpG1qahQc7c1wAADGkoo6KCEFrpCCAA7AAAAAAAAAAAA');
        $loading.append($div.append($img));
        $body.append($loading);
        $('#imgBox').attr('style', 'margin-top: ' + Math.floor($('#loading').height() / 2) + 'px;');
        $body.css('position', 'fixed');
    }

    /**
     * ローディング画面を消す関数
     */
    function removeLoading() {
        'use strict';
        var $loading = $('.loading');
        $loading.remove();

        var $body = $('body');
        $body.css('position', '');
    }

    /**
     * ×ボタンでモーダルウィンドウを消すときの処理
     * eslint-disable-next-line no-unused-vars
     */
    function closeButton() {
        'use strict';
        $('#modal').fadeOut(250);
        $('#blackOut').remove();
        $('body').css('position', 'relative');
    }

    /**
     * モーダルウィンドウをセンターに寄せる
     */
    function adjustCenter() {
        var marginTop = ($(window).height() - $('#box-min').height()) / 2;
        var marginLeft = ($(window).width() - $('#box-min').width()) / 2;
        $('#box-min').css({ top: marginTop + 'px', left: marginLeft + 'px' });
    }

    /**
     * モーダルウィンドウの表示
     * @param {object} data
     */
    function createModalWindow(data) {

        var $body = $('body');
        $body.css('width', '100%');
        var $black = $('<div>').attr('id', 'blackOut').attr('style', 'width: 100%; height: 100%;' +
            'position:absolute; top:0; left:0; text-align:center; background-color:#666666; opacity:0.6; z-index: 10;');
        $body.append($black);
        $body.css('position', 'fixed');

        // モーダルウィンドウの基礎部分を作成
        var divid = 'modal';

        // モーダルウィンドウのHTMLを格納
        var $weather = $('<div id=' + divid + ' class="box"><div id="box-min"><div id="header">' +
            '<h3>' + data.name + '　' + data.desc + '</h3>' +
            '</div><button id="closeButton" type="button" class="modal-close">×</button><div class="content">' +
            '<p>' + data.lang.plzEnterStartDate + '</p><input type="text" id="start" value="' +
            moment(data.start).format('YYYY/MM/DD') + '">' +
            '<p>' + data.lang.plzEnterEndDate + '</p>' +
            '<input type="text" name="end" id="end" value="' + moment(data.end).format('YYYY/MM/DD') + '">' +
            '<br><br><button id="goButton" class="gaia-ui-actionmenu-save">　' + data.lang.update + '　</button>' +
            '<a href="' + data.url + '" target="_blank">　　' + data.lang.detailPage + '</a></div></div></div>');

        $('#' + divid).remove();
        // モーダルウィンドウをHTMLに配置
        $('body').append($weather);

        // モーダルウィンドウをセンターに
        adjustCenter();

        // 開始日、終了日へdatepickerを設定
        $('#start').datepicker({ dateFormat: 'yy/mm/dd' });
        $('#end').datepicker({ dateFormat: 'yy/mm/dd' });

        // ウインドウを閉じる処理
        $('#closeButton').click(function () {
            closeButton();
        });

        // 登録処理
        $('#goButton').click(function () {
            setLoading();

            var startDate = $('#start').datepicker('getDate');
            var endDate = $('#end').datepicker('getDate');

            if (!startDate || !endDate) {
                alert(data.lang.emptyAlert);
                removeLoading();
                return;
            }

            startDate = moment(startDate).format('YYYY-MM-DD');
            endDate = moment(endDate).format('YYYY-MM-DD');
            for (var key in data.record) {
                if (key !== data.GANTT_FROM && key !== data.GANTT_TO) {
                    delete data.record[key];
                }
            }
            data.record[data.GANTT_FROM].value = startDate;
            data.record[data.GANTT_TO].value = endDate;
            // }
            var body = {
                'app': kintone.app.getId(),
                'id': data.recId,
                'record': data.record
            };
            kintone.api(kintone.api.url('/k/v1/record', true), 'PUT', body, function (resp) {
                location.reload();
            }, function () {
                alert(data.lang.authAlert);
                removeLoading();
            });
        });
    }

    /**
     * ガントチャート用の日付に変換
     * @param {String} str
     */
    function convertDateTime(str) {
        if (str !== '') {
            return '/Date(' + (new Date(str)).getTime() + ')/';
        }
        return '';
    }

    /**
     * 日時に変換
     * @param {date} date
     */
    function convertDateTimeWithTimezone(date) {
        var dateWithTimezone = moment(date);
        //var dateWithTimezone = moment.tz(date, 'Asia/Tokyo');
        return dateWithTimezone.format('YYYY-MM-DD H:mm');
    }

    /**
     * HTMLエスケープ
     * @param {string} str
     */
    function escapeHtml(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    /**
     * データ取得
     * @param {*} records
     * @param {*} ganttBox
     * @param {*} data
     * @param {*} callbackFnc
     */
    function getRecordsData(records, ganttBox, data, callbackFnc) {
        var ganttStylesRecord = {};
        if (ganttBox.className === 'loaded') {
            return;
        }
        if (records.length === 0) {
            return;
        }
        var tableFlg = false;
        function createRecords2() {
            for (var i3 = 0; i3 < records.length; i3++) {
                var fromValue2 = records[i3][GANTT_FROM].value;
                var toValue2 = records[i3][GANTT_TO].value;
                if (!fromValue2 || !toValue2) {
                    continue;
                }
                // 日付の比較
                if (moment(fromValue2).isAfter(toValue2)) {
                    continue;
                }
                if (fromValue2) {
                    descGantt2 += '<div>' + configGanttchart.fieldName.from + ': ' +
                        escapeHtml(convertDateTimeWithTimezone(fromValue2)) +
                        '</div>';
                }
                if (toValue2) {
                    descGantt2 += '<div>' + configGanttchart.fieldName.to + ': ' +
                        escapeHtml(convertDateTimeWithTimezone(toValue2)) +
                        '</div>';
                }
                var colorGantt2 = configGanttchart.settings.element.classColorGanttDefault;
                var colorValue2 = records[i3][GANTT_COLOR].value || '';
                if (colorValue2 && configGanttchart.settingColors[colorValue2]) {
                    var styleRecordClass2 = configGanttchart.settings.element.prefixColorGantt + 'class-' + i3;
                    colorGantt2 = styleRecordClass2;
                    ganttStylesRecord[styleRecordClass2] = configGanttchart.settingColors[colorValue2];
                }
                var descGantt2 = '<b>' + escapeHtml(records[i3][GANTT_NAME].value) + '</b>';
                if (records[i3][GANTT_DESC]) {
                    descGantt2 += '<div>' +
                        escapeHtml(records[i3][GANTT_DESC].value) +
                        '</div>';
                }
                if (colorValue2) {
                    descGantt2 += configGanttchart.fieldName.color + ': ' + escapeHtml(colorValue2);
                }
                // ラベル名
                var labels = '';
                for (var i = 0; i < GANTT_LABELS.length; i++) {
                    var ganttLabel = GANTT_LABELS[i];
                    if (labels) {
                        labels += ':';
                    }
                    labels += escapeHtml(records[i3][ganttLabel].value);
                }

                var ganttRecordData2 = {
                    id: escapeHtml(records[i3]['$id'].value),
                    name: records[i3][GANTT_NAME] ? escapeHtml(records[i3][GANTT_NAME].value) : '',
                    desc: records[i3][GANTT_DESC] ? (records[i3][GANTT_DESC].value ? escapeHtml(records[i3][GANTT_DESC].value) : " ") : '',
                    values: [{
                        from: convertDateTime(records[i3][GANTT_FROM].value),
                        to: convertDateTime(records[i3][GANTT_TO].value),
                        desc: descGantt2,
                        label: labels,
                        customClass: escapeHtml(colorGantt2),
                        dataObj: {
                            'url': '/k/' + kintone.app.getId() + '/show#record=' + records[i3]['$id'].value,
                            'name': records[i3][GANTT_NAME].value,
                            'desc': records[i3][GANTT_DESC] ? records[i3][GANTT_DESC].value : '',
                            'start': records[i3][GANTT_FROM].value,
                            'end': records[i3][GANTT_TO].value,
                            'recId': records[i3]['$id'].value,
                            'tableId': '',
                            'record': records[i3],
                            'GANTT_FROM': GANTT_FROM,
                            'GANTT_TO': GANTT_TO,
                            'lang': configGanttchart.lang[configGanttchart.settings.i18n]
                        }
                    }]
                };
                data.push(ganttRecordData2);
            }
            console.log(data);
        }
        createRecords2();
        // }
        if (typeof callbackFnc === 'function') {
            callbackFnc();
        }
        uiSetStyleProcessBar(ganttStylesRecord);
    }

    /**
     * ガントチャート表示設定
     * @param {*} elGantt
     * @param {*} data
     */
    function gantt(elGantt, data) {

        elGantt.className = 'loaded';
        var GANTT_SCALE = 'days';

        // Execute jquery gantt
        $(elGantt).gantt({
            source: data,
            navigate: 'scroll',
            scale: GANTT_SCALE,
            maxScale: 'months',
            minScale: 'hours',
            months: configGanttchart.lang[configGanttchart.settings.i18n].months,
            dow: configGanttchart.lang[configGanttchart.settings.i18n].dow,
            left: '70px',
            itemsPerPage: 100,
            waitText: configGanttchart.lang[configGanttchart.settings.i18n].wait,
            scrollToToday: true,
            onItemClick: function (dataRecord) {
                $('.leftPanel').css('z-index', 'inherit');
                createModalWindow(dataRecord);
            }
        });
    }

    /**
     * ガントチャート表示枠の作成
     */
    function uiCreateGanttBox() {

        if ($('#gantt').length > 0) {
            $('#gantt').remove();
        }

        var elSpace = kintone.app.getHeaderSpaceElement();
        var uiVer = kintone.getUiVersion();
        switch (uiVer) {
            case 1:
                elSpace.style.margin = '10px 5px';
                elSpace.style.border = 'solid 1px #ccc';
                break;
            default:
                elSpace.style.margin = '20px 10px';
                elSpace.style.border = 'solid 1px #ccc';
                break;
        }
        var elGantt = document.createElement('div');
        elGantt.id = 'gantt';
        elSpace.appendChild(elGantt);
        return elGantt;
    }

    /**
     * プロセスバーのスタイル設定
     * @param {*} styles
     */
    function uiSetStyleProcessBar(styles) {
        var styleRule = '';
        for (var className in styles) {
            if (!styles.hasOwnProperty(className)) {
                continue;
            }
            styleRule += '.' + className + '{background-color:' + styles[className] + '!important}';
        }
        // Change cursor progress bar to pointer
        styleRule += '.fn-gantt .bar .fn-label{cursor: pointer!important;}';
        $('html > head').append($('<style>' + styleRule + '</style>'));
    }

    /**
     * 一覧画面表示イベント
     */
    kintone.events.on('app.record.index.show', function (event) {

        // ガントチャート機能が有効、かつ、指定のビューIDの場合のみ
        // ガントチャートを表示
        if (
            configGanttchart.option &&
            configGanttchart.TtargetViewIds.indexOf(event.viewId) !== -1
        ) {
            var ganttBox = uiCreateGanttBox();
            var data = [];
            getRecordsData(event.records, ganttBox, data, function () {
                if (data.length > 0) {
                    gantt(ganttBox, data);
                } else {
                    var myHeaderSpace = kintone.app.getHeaderSpaceElement();
                    myHeaderSpace.innerHTML = '';
                }
            });
        }
        return event;
    });

    //------------------------------------------------------------------------------

//営業情報からのアクション初期値設定
    kintone.events.on([
        'app.record.create.show',
        'app.record.edit.show',

    ], function (event) {

        var record = event.record;
        var TableB = record['nok_日程TB'].value;

        var koumoku1 = record['nok_契約日A'].value;//(手付金)
        var koumoku2 = record['nok_契約金額A'].value;//(手付金)
        var koumoku3 = record['nok_建物手付金A'].value;//(手付金)
        var koumoku4 = record['nok_建物手付金受領日A'].value;//(手付金)
        var koumoku5 = record['nok_土地手付金A'].value;//(手付金)
        var koumoku6 = record['nok_土地手付金受領日A'].value;//(手付金)
        var koumoku7 = record['nok_土地契約予定日A'].value;//(手付金)
        var koumoku8 = record['nok_融資本申込提出予定日A'].value;//(手付金)
        var koumoku9 = record['nok_融資本申込承認予定日A'].value;//(手付金)
        var koumoku10 = record['nok_土地決済予定日A'].value;//(手付金)
        var koumoku11 = record['nok_長期申請の有無A'].value;//(手付金)
        var koumoku12 = record['nok_1_50図面依頼日A'].value;//(手付金)        
        var koumoku13 = record['nok_着工予定日A'].value;//(手付金)     

        TableB[0].value['nok_日程TB_請負契約日'].value = koumoku1;
        TableB[0].value['nok_日程TB_請負契約金額'].value = koumoku2;
        TableB[0].value['nok_日程TB_請負手付金金額'].value = koumoku3;
        TableB[0].value['nok_日程TB_請負手付金入金日'].value = koumoku4;
        TableB[0].value['nok_日程TB_不動産手付金金額'].value = koumoku5;
        TableB[0].value['nok_日程TB_不動産手付金入金日'].value = koumoku6;
        TableB[0].value['nok_日程TB_不動産契約日'].value = koumoku7;
        TableB[0].value['nok_日程TB_本融資申込日'].value = koumoku8;
        TableB[0].value['nok_日程TB_融資内諾日'].value = koumoku9;
        TableB[0].value['nok_日程TB_不動産最終金入金日'].value = koumoku10;
        TableB[0].value['nok_日程TB_長期申請の有無'].value = koumoku11;
        TableB[0].value['nok_日程TB_1_50依頼日'].value = koumoku12;
        TableB[0].value['nok_日程TB_着工日'].value = koumoku13;
        return event;
    });


    kintone.events.on([
        'app.record.create.show',
        'app.record.edit.show',
        'app.record.create.change.' + 'nok_日程TB',
        'app.record.edit.change.' + 'nok_日程TB',
        'app.record.create.change.' + 'nok_入金情報TB',
        'app.record.edit.change.' + 'nok_入金情報TB',
        'app.record.create.change.' + 'nok_原価売上TB',
        'app.record.edit.change.' + 'nok_原価売上TB',
        'app.record.create.change.' + 'nok_担当者ID',
        'app.record.edit.change.' + 'nok_担当者ID',
    ], function (event) {
        // テーブル「+」ボタン非表示
        [].forEach.call(document.getElementsByClassName("subtable-gaia")[0].getElementsByClassName("subtable-operation-gaia"), function (button) {
            button.style.display = 'none';
        });

        [].forEach.call(document.getElementsByClassName("subtable-gaia")[1].getElementsByClassName("subtable-operation-gaia"), function (button) {
            button.style.display = 'none';
        });
        
        [].forEach.call(document.getElementsByClassName("subtable-gaia")[2].getElementsByClassName("subtable-operation-gaia"), function (button) {
            button.style.display = 'none';
        });    
        
    });




    kintone.events.on('app.record.create.show', (event) => {
        // 行の作成
        const newRow1 = createValue2_('契約', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
        const newRow2 = createValue2_('予定', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
        const newRow3 = createValue2_('実施', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
        // Tableに初期値を定義する
        event.record.nok_日程TB.value = [
            newRow1,
            newRow2,
            newRow3,
        ];
        return event;
    });

    const createValue2_ = (number, text) => (
        {
            'value': {
                'nok_日程TB_分類': {
                    'type': 'NUMBER',
                    'value': number
                },
                'nok_日程TB_請負契約日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_請負契約金額': {
                    'type': 'NUMBER',
                    'value': ''
                },
                'nok_日程TB_請負手付金入金日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_請負手付金金額': {
                    'type': 'NUMBER',
                    'value': ''
                },
                'nok_日程TB_追加契約日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_追加契約金額': {
                    'type': 'NUMBER',
                    'value': ''
                },
                'nok_日程TB_仲介手数料1入金日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_仲介手数料1': {
                    'type': 'NUMBER',
                    'value': ''
                },
                'nok_日程TB_仲介手数料2入金日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_仲介手数料2': {
                    'type': 'NUMBER',
                    'value': ''
                },
                'nok_日程TB_不動産契約日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_不動産契約金額': {
                    'type': 'NUMBER',
                    'value': ''
                },
                'nok_日程TB_不動産手付金入金日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_不動産手付金金額': {
                    'type': 'NUMBER',
                    'value': ''
                },
                'nok_日程TB_不動産最終金入金日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_不動産最終金金額': {
                    'type': 'NUMBER',
                    'value': ''
                },
                'nok_日程TB_本融資申込日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_融資内諾日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_1_50依頼日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_設計引継日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_図面確定日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_長期申請の有無': {
                    'type': 'DROP_DOWN',
                    'value': ''
                },
                'nok_日程TB_事前申請の有無': {
                    'type': 'DROP_DOWN',
                    'value': ''
                },
                'nok_日程TB_申請備考': {
                    'type': 'SINGLE_LINE_TEXT',
                    'value': ''
                },
                'nok_日程TB_確認申請提出日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_確認申請許可日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_地盤調査日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_地鎮祭': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_改良工事日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_着工前打合せ日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_着工金入金日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_着工金金額': {
                    'type': 'NUMBER',
                    'value': ''
                },
                'nok_日程TB_着工日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_配筋検査日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_基礎完了日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_土台敷き日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_上棟金入金日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_上棟金金額': {
                    'type': 'NUMBER',
                    'value': ''
                },
                'nok_日程TB_上棟日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_躯体検査日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_防水検査日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_木工事完了日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_クロス完了日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_クリーニング完了日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_完了検査日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_社内竣工日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_竣工直し完了日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_お客様竣工日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_最終金入金日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_最終金金額': {
                    'type': 'NUMBER',
                    'value': ''
                },
                'nok_日程TB_最終金追加入金日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_最終金追加金額': {
                    'type': 'NUMBER',
                    'value': ''
                },
                'nok_日程TB_引渡日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_日程TB_売買契約': {
                    'type': 'DROP_DOWN',
                    'value': ''
                },
                'nok_日程TB_請負契約': {
                    'type': 'DROP_DOWN',
                    'value': ''
                },
                'nok_日程TB_追加契約': {
                    'type': 'DROP_DOWN',
                    'value': ''
                },
                'nok_日程TB_決済計算書': {
                    'type': 'DROP_DOWN',
                    'value': ''
                },
                'nok_日程TB_R引渡書': {
                    'type': 'DROP_DOWN',
                    'value': ''
                },
                'nok_日程TB_最終金請求書': {
                    'type': 'DROP_DOWN',
                    'value': ''
                },
            }
        }
    );



    kintone.events.on('app.record.create.show', (event) => {
        // 行の作成
        const newRow1 = createValue_('01', '請負手付金金額', '', '', '', '', '');
        const newRow2 = createValue_('02', '仲介手数料1', '', '', '', '', '');
        const newRow3 = createValue_('03', '仲介手数料2', '', '', '', '', '');
        const newRow4 = createValue_('04', '不動産手付金金額', '', '', '', '', '');
        const newRow5 = createValue_('05', '不動産最終金金額', '', '', '', '', '');
        const newRow6 = createValue_('06', '着工金金額', '', '', '', '', '');
        const newRow7 = createValue_('07', '上棟金金額', '', '', '', '', '');
        const newRow8 = createValue_('08', '最終金金額', '', '', '', '', '');
        const newRow9 = createValue_('09', '最終金追加金額', '', '', '', '', '');
        const newRow10 = createValue_('10', 'その他', '', '', '', '', '');
        // Tableに初期値を定義する
        event.record['nok_入金情報TB'].value = [
            newRow1,
            newRow2,
            newRow3,
            newRow4,
            newRow5,
            newRow6,
            newRow7,
            newRow8,
            newRow9,
            newRow10,
        ];
        return event;
    });

    const createValue_ = (number, text) => (
        {
            'value': {
                'nok_入金情報TB_項': {
                    'type': 'NUMBER',
                    'value': number
                },
                'nok_入金情報TB_分類': {
                    'type': 'DROP_DOWN',
                    'value': text
                },
                'nok_入金情報TB_入金日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_入金情報TB_入金金額': {
                    'type': 'NUMBER',
                    'value': '',
                },
                'nok_入金情報TB_入金予定日': {
                    'type': 'DATE',
                    'value': ''
                },
                'nok_入金情報TB_入金予定金額': {
                    'type': 'NUMBER',
                    'value': '',
                },
                'nok_入金情報TB_uuid': {
                    'type': 'SINGLE_LINE_TEXT',
                    'value': '',
                },
            }
        }
    );



    kintone.events.on('app.record.create.show', (event) => {
        // 行の作成
        const newRow1 = createValue3_('契約','','','','','予定売上','','','','','','');
        const newRow2 = createValue3_('', 　　'', '', '', '', '予定原価', '', '', '', '', '', '');
        const newRow3 = createValue3_('上棟', '1', '', '', '', '予定売上', '', '', '', '', '', '');
        const newRow4 = createValue3_('', 　　'', '', '', '', '予定原価', '', '', '', '', '', '');        
        // Tableに初期値を定義する
        event.record.nok_原価粗利TB.value = [
            newRow1,
            newRow2,
            newRow3,
            newRow4,            
        ];
        return event;
    });

    const createValue3_ = (text1, text2,text3,text4,text5,text6) => (
        {
            'value': {
                'nok_原価粗利TB_分類': {
                    'type': 'DROP_DOWN',
                    'value': text1
                },
                'nok_原価粗利TB_売上': {
                    'type': 'CALC',
                    'value': ''
                },
                'nok_原価粗利TB_原価': {
                    'type': 'NUMBER',
                    'value': ''
                },
                'nok_原価粗利TB_粗利': {
                    'type': 'CALC',
                    'value': ''
                },
                'nok_原価粗利TB_粗利率': {
                    'type': 'CALC',
                    'value': ''
                },
                'nok_原価粗利TB_分類2': {
                    'type': 'DROP_DOWN',
                    'value': text6
                },                
                'nok_原価粗利TB_建物本体': {
                    'type': 'NUMBER',
                    'value': ''
                },
                'nok_原価粗利TB_付帯工事': {
                    'type': 'NUMBER',
                    'value': ''
                },
                'nok_原価粗利TB_オプション': {
                    'type': 'NUMBER',
                    'value': ''
                },
                'nok_原価粗利TB_値引サービス': {
                    'type': 'NUMBER',
                    'value': ''
                },
                'nok_原価粗利TB_建築諸費用': {
                    'type': 'NUMBER',
                    'value': ''
                },
                'nok_原価粗利TB_合計': {
                    'type': 'CALC',
                    'value': ''
                },
            }
        }
    );

//原価粗利表非活性
    kintone.events.on([
        'app.record.create.show',
        'app.record.edit.show',
        'app.record.create.change.' + 'nok_原価粗利TB',
        'app.record.edit.change.' + 'nok_原価粗利TB',
    ], function (event) {
        var record = event.record;
        var Table = record['nok_原価粗利TB'].value;
        for (var i = 0; i < Table.length; i++) {
            Table[i].value['nok_原価粗利TB_分類'].disabled = true;
            Table[i].value['nok_原価粗利TB_売上'].disabled = true;
            Table[i].value['nok_原価粗利TB_原価'].disabled = true;
            Table[i].value['nok_原価粗利TB_分類2'].disabled = true;
        }
        return event;
    });








var getValue = function(field) {
var value = parseFloat(field);
if(!Number.isNaN(value)) {
return value;
} else {
return 0;
}
};




    //売上原価計算
    kintone.events.on([
        'app.record.create.show',
        'app.record.edit.show',
        'app.record.create.submit',
        'app.record.edit.submit',
        'app.record.create.submit',
        'app.record.create.change.' + 'nok_原価粗利TB_建物本体',
        'app.record.edit.change.' + 'nok_原価粗利TB_建物本体',
        'app.record.create.change.' + 'nok_原価粗利TB_付帯工事',
        'app.record.edit.change.' + 'nok_原価粗利TB_付帯工事',
        'app.record.create.change.' + 'nok_原価粗利TB_オプション',
        'app.record.edit.change.' + 'nok_原価粗利TB_オプション',
        'app.record.create.change.' + 'nok_原価粗利TB_値引サービス',
        'app.record.edit.change.' + 'nok_原価粗利TB_値引サービス',
        'app.record.create.change.' + 'nok_原価粗利TB_建築諸費用',
        'app.record.edit.change.' + 'nok_原価粗利TB_建築諸費用',        
    ], function (event) {
        // ここにイベント発火時に行いたい処理
        var record = event.record;
        var tbl = record['nok_原価粗利TB'].value;
　　　　var sum1 = getValue(tbl[1].value['nok_原価粗利TB_建物本体'].value) + 
　　　　　　　　　getValue(tbl[1].value['nok_原価粗利TB_付帯工事'].value) + 
　　　　　　　　　getValue(tbl[1].value['nok_原価粗利TB_オプション'].value) +    
　　　　　　　　　getValue(tbl[1].value['nok_原価粗利TB_値引サービス'].value) +    
　　　　　　　　　getValue(tbl[1].value['nok_原価粗利TB_建築諸費用'].value );   　　　　　　　　　

　　　　var sum2 = getValue(tbl[3].value['nok_原価粗利TB_建物本体'].value) + 
　　　　　　　　　getValue(tbl[3].value['nok_原価粗利TB_付帯工事'].value) + 
　　　　　　　　　getValue(tbl[3].value['nok_原価粗利TB_オプション'].value) +    
　　　　　　　　　getValue(tbl[3].value['nok_原価粗利TB_値引サービス'].value) +    
　　　　　　　　　getValue(tbl[3].value['nok_原価粗利TB_建築諸費用'].value );   　　　　　　　　　

        tbl[0].value['nok_原価粗利TB_原価'].value = sum1;
        tbl[2].value['nok_原価粗利TB_原価'].value = sum2;

        return event;
    });




    //請負契約日
    kintone.events.on([
        'app.record.create.submit',
        'app.record.edit.submit',
        'app.record.index.submit',
    ], function (event) {
        // ここにイベント発火時に行いたい処理
        var record = event.record;
        var tbl = record['nok_日程TB'].value;
        var keiyakubi = tbl[1].value['nok_日程TB_請負契約日'].value
        record['nok_契約日_予定'].value = keiyakubi
        return event;
    });

    //着工日
    kintone.events.on([
        'app.record.create.submit',
        'app.record.edit.submit',
        'app.record.index.submit',
    ], function (event) {
        // ここにイベント発火時に行いたい処理
        var record = event.record;
        var tbl = record['nok_日程TB'].value;
        var chakoubi = tbl[1].value['nok_日程TB_着工日'].value
        record['nok_着工日_予定'].value = chakoubi
        return event;
    });

    //上棟日
    kintone.events.on([
        'app.record.create.submit',
        'app.record.edit.submit',
        'app.record.index.submit',
    ], function (event) {
        // ここにイベント発火時に行いたい処理
        var record = event.record;
        var tbl = record['nok_日程TB'].value;
        var jhoutoubi = tbl[1].value['nok_日程TB_上棟日'].value
        record['nok_上棟日_予定'].value = jhoutoubi
        return event;
    });


    //引渡日
    kintone.events.on([
        'app.record.create.submit',
        'app.record.edit.submit',
        'app.record.index.submit',
    ], function (event) {
        // ここにイベント発火時に行いたい処理
        var record = event.record;
        var tbl = record['nok_日程TB'].value;
        var hikiwatasibi = tbl[1].value['nok_日程TB_引渡日'].value
        record['nok_引渡日_予定'].value = hikiwatasibi
        return event;
    });



    kintone.events.on([
        'app.record.create.show',
        'app.record.edit.show',
        'app.record.create.change.' + 'nok_入金情報TB',
        'app.record.edit.change.' + 'nok_入金情報TB',
    ], function (event) {
        var record = event.record;
        var Table = record['nok_入金情報TB'].value;
        for (var i = 0; i < Table.length; i++) {
            Table[i].value['nok_入金情報TB_項'].disabled = true;
            Table[i].value['nok_入金情報TB_分類'].disabled = true;
            Table[i].value['nok_入金情報TB_入金予定金額'].disabled = true;
            Table[i].value['nok_入金情報TB_入金予定日'].disabled = true;
        }
//        kintone.app.record.setFieldShown('nok_入金情報TB_入金予定金額', false);
//        kintone.app.record.setFieldShown('nok_入金情報TB_入金予定日', false);
        return event;
    });


    kintone.events.on([
        'app.record.edit.show',
        'app.record.create.change.' + 'nok_日程TB_請負契約日',
        'app.record.edit.change.' + 'nok_日程TB_請負契約日',
        'app.record.create.change.' + 'nok_日程TB_着工日',
        'app.record.edit.change.' + 'nok_日程TB_着工日',
        'app.record.create.change.' + 'nok_日程TB_上棟日',
        'app.record.edit.change.' + 'nok_日程TB_上棟日',
        'app.record.create.change.' + 'nok_日程TB_引渡日',
        'app.record.edit.change.' + 'nok_日程TB_引渡日',
        'app.record.create.change.' + 'nok_日程TB_完了検査日',
        'app.record.edit.change.' + 'nok_日程TB_完了検査日',
        'app.record.create.change.' + 'nok_日程TB_不動産最終金入金日',
        'app.record.edit.change.' + 'nok_日程TB_不動産最終金入金日',
    ], function (event) {
        var record = event.record;
        var Table = record['nok_日程TB'].value;
        for (var i = 0; i < Table.length; i++) {

            var keiyakubi = Table[1].value['nok_日程TB_請負契約日'].value;
            var chakou = Table[1].value['nok_日程TB_着工日'].value;
            var jyoutou = Table[1].value['nok_日程TB_上棟日'].value;
            var kanryou = Table[1].value['nok_日程TB_完了検査日'].value;
            var hikiwatasi = Table[1].value['nok_日程TB_引渡日'].value;
            var nyukinyotei = Table[1].value['nok_日程TB_不動産最終金入金日'].value;
            var keiyakubi0 = Table[0].value['nok_日程TB_請負契約日'].value;
            var chakou0 = Table[0].value['nok_日程TB_着工日'].value;
            var jyoutou0 = Table[0].value['nok_日程TB_上棟日'].value;
            var kanryou0 = Table[0].value['nok_日程TB_完了検査日'].value;
            var hikiwatasi0 = Table[0].value['nok_日程TB_引渡日'].value;
            var nyukinyotei0 = Table[0].value['nok_日程TB_不動産最終金入金日'].value;

            record['nok_契約日_予定'].value = keiyakubi;
            record['nok_着工日_予定'].value = chakou;
            record['nok_上棟日_予定'].value = jyoutou;
            record['nok_完了検査日_予定'].value = kanryou;
            record['nok_引渡日_予定'].value = hikiwatasi;
            record['nok_不動産最終金入金日_予定'].value = nyukinyotei;
            record['nok_契約日_契約'].value = keiyakubi0;
            record['nok_着工日_契約'].value = chakou0;
            record['nok_上棟日_契約'].value = jyoutou0;
            record['nok_完了検査日_契約'].value = kanryou0;
            record['nok_引渡日_契約'].value = hikiwatasi0;
            record['nok_不動産最終金入金日_契約'].value = nyukinyotei0;
        }
        return event;
    });


    kintone.events.on([
        'app.record.create.change.' + 'nok_日程TB_請負手付金入金日',
        'app.record.edit.change.' + 'nok_日程TB_請負手付入金金日',
        'app.record.create.change.' + 'nok_日程TB_請負手付金金額',
        'app.record.edit.change.' + 'nok_日程TB_請負手付金金額',
    ], function (event) {
        var record = event.record;
        var TableA = record['nok_入金情報TB'].value;
        var TableB = record['nok_日程TB'].value;

        var A_hiduke_0 = TableB[1].value['nok_日程TB_請負手付金入金日'].value;
        var A_kingaku_0 = TableB[1].value['nok_日程TB_請負手付金金額'].value;
        TableA[0].value['nok_入金情報TB_入金予定日'].value = A_hiduke_0; //
        TableA[0].value['nok_入金情報TB_入金予定金額'].value = A_kingaku_0;//
        return event;
    });

    kintone.events.on([
        'app.record.create.change.' + 'nok_日程TB_仲介手数料1入金日',
        'app.record.edit.change.' + 'nok_日程TB_仲介手数料1入金日',
        'app.record.create.change.' + 'nok_日程TB_仲介手数料1',
        'app.record.edit.change.' + 'nok_日程TB_仲介手数料1',
    ], function (event) {
        var record = event.record;
        var TableA = record['nok_入金情報TB'].value;
        var TableB = record['nok_日程TB'].value;

        var A_hiduke_1 = TableB[1].value['nok_日程TB_仲介手数料1入金日'].value;
        var A_kingaku_1 = TableB[1].value['nok_日程TB_仲介手数料1'].value;

        TableA[1].value['nok_入金情報TB_入金予定日'].value = A_hiduke_1; //
        TableA[1].value['nok_入金情報TB_入金予定金額'].value = A_kingaku_1;//

        return event;
    });

    kintone.events.on([
        'app.record.create.change.' + 'nok_日程TB_仲介手数料2入金日',
        'app.record.edit.change.' + 'nok_日程TB_仲介手数料2入金日',
        'app.record.create.change.' + 'nok_日程TB_仲介手数料2',
        'app.record.edit.change.' + 'nok_日程TB_仲介手数料2',
    ], function (event) {
        var record = event.record;
        var TableA = record['nok_入金情報TB'].value;
        var TableB = record['nok_日程TB'].value;

        var A_hiduke_2 = TableB[1].value['nok_日程TB_仲介手数料2入金日'].value;
        var A_kingaku_2 = TableB[1].value['nok_日程TB_仲介手数料2'].value;

        TableA[2].value['nok_入金情報TB_入金予定日'].value = A_hiduke_2; //
        TableA[2].value['nok_入金情報TB_入金予定金額'].value = A_kingaku_2;//

        return event;
    });

    kintone.events.on([
        'app.record.create.change.' + 'nok_日程TB_不動産手付金入金日',
        'app.record.edit.change.' + 'nok_日程TB_不動産手付金入金日',
        'app.record.create.change.' + 'nok_日程TB_不動産手付金金額',
        'app.record.edit.change.' + 'nok_日程TB_不動産手付金金額',
    ], function (event) {
        var record = event.record;
        var TableA = record['nok_入金情報TB'].value;
        var TableB = record['nok_日程TB'].value;

        var A_hiduke_3 = TableB[1].value['nok_日程TB_不動産手付金入金日'].value;
        var A_kingaku_3 = TableB[1].value['nok_日程TB_不動産手付金金額'].value;

        TableA[3].value['nok_入金情報TB_入金予定日'].value = A_hiduke_3; //
        TableA[3].value['nok_入金情報TB_入金予定金額'].value = A_kingaku_3;//

        return event;
    });

    kintone.events.on([
        'app.record.create.change.' + 'nok_日程TB_不動産最終金入金日',
        'app.record.edit.change.' + 'nok_日程TB_不動産最終金入金日',
        'app.record.create.change.' + 'nok_日程TB_不動産最終金金額',
        'app.record.edit.change.' + 'nok_日程TB_不動産最終金金額',
    ], function (event) {
        var record = event.record;
        var TableA = record['nok_入金情報TB'].value;
        var TableB = record['nok_日程TB'].value;

        var A_hiduke_4 = TableB[1].value['nok_日程TB_不動産最終金入金日'].value;
        var A_kingaku_4 = TableB[1].value['nok_日程TB_不動産最終金金額'].value;

        TableA[4].value['nok_入金情報TB_入金予定日'].value = A_hiduke_4; //
        TableA[4].value['nok_入金情報TB_入金予定金額'].value = A_kingaku_4;//

        return event;
    });

    kintone.events.on([
        'app.record.create.change.' + 'nok_日程TB_着工金入金日',
        'app.record.edit.change.' + 'nok_日程TB_着工金入金日',
        'app.record.create.change.' + 'nok_日程TB_着工金金額',
        'app.record.edit.change.' + 'nok_日程TB_着工金金額',
    ], function (event) {
        var record = event.record;
        var TableA = record['nok_入金情報TB'].value;
        var TableB = record['nok_日程TB'].value;

        var A_hiduke_5 = TableB[1].value['nok_日程TB_着工金入金日'].value;
        var A_kingaku_5 = TableB[1].value['nok_日程TB_着工金金額'].value;

        TableA[5].value['nok_入金情報TB_入金予定日'].value = A_hiduke_5; //
        TableA[5].value['nok_入金情報TB_入金予定金額'].value = A_kingaku_5;//

        return event;
    });

    kintone.events.on([
        'app.record.create.change.' + 'nok_日程TB_上棟金入金日',
        'app.record.edit.change.' + 'nok_日程TB_上棟金入金日',
        'app.record.create.change.' + 'nok_日程TB_上棟金金額',
        'app.record.edit.change.' + 'nok_日程TB_上棟金金額',
    ], function (event) {
        var record = event.record;
        var TableA = record['nok_入金情報TB'].value;
        var TableB = record['nok_日程TB'].value;

        var A_hiduke_6 = TableB[1].value['nok_日程TB_上棟金入金日'].value;
        var A_kingaku_6 = TableB[1].value['nok_日程TB_上棟金金額'].value;

        TableA[6].value['nok_入金情報TB_入金予定日'].value = A_hiduke_6; //
        TableA[6].value['nok_入金情報TB_入金予定金額'].value = A_kingaku_6;//

        return event;
    });

    kintone.events.on([
        'app.record.create.change.' + 'nok_日程TB_上棟金入金日',
        'app.record.edit.change.' + 'nok_日程TB_上棟金入金日',
        'app.record.create.change.' + 'nok_日程TB_上棟金金額',
        'app.record.edit.change.' + 'nok_日程TB_上棟金金額',
    ], function (event) {
        var record = event.record;
        var TableA = record['nok_入金情報TB'].value;
        var TableB = record['nok_日程TB'].value;

        var A_hiduke_7 = TableB[1].value['nok_日程TB_上棟金入金日'].value;
        var A_kingaku_7 = TableB[1].value['nok_日程TB_上棟金金額'].value;

        TableA[7].value['nok_入金情報TB_入金予定日'].value = A_hiduke_7; //
        TableA[7].value['nok_入金情報TB_入金予定金額'].value = A_kingaku_7;//

        return event;
    });

    kintone.events.on([
        'app.record.create.change.' + 'nok_日程TB_最終金入金日',
        'app.record.edit.change.' + 'nok_日程TB_最終金入金日',
        'app.record.create.change.' + 'nok_日程TB_最終金金額',
        'app.record.edit.change.' + 'nok_日程TB_最終金金額',
    ], function (event) {
        var record = event.record;
        var TableA = record['nok_入金情報TB'].value;
        var TableB = record['nok_日程TB'].value;

        var A_hiduke_8 = TableB[1].value['nok_日程TB_最終金入金日'].value;
        var A_kingaku_8 = TableB[1].value['nok_日程TB_最終金金額'].value;

        TableA[8].value['nok_入金情報TB_入金予定日'].value = A_hiduke_8; //
        TableA[8].value['nok_入金情報TB_入金予定金額'].value = A_kingaku_8;//

        return event;
    });

    kintone.events.on([
        'app.record.create.change.' + 'nok_日程TB_最終金追加入金日',
        'app.record.edit.change.' + 'nok_日程TB_最終金追加入金日',
        'app.record.create.change.' + 'nok_日程TB_最終金追加金額',
        'app.record.edit.change.' + 'nok_日程TB_最終金追加金額',
    ], function (event) {
        var record = event.record;
        var TableA = record['nok_入金情報TB'].value;
        var TableB = record['nok_日程TB'].value;

        var A_hiduke_9 = TableB[1].value['nok_日程TB_最終金追加入金日'].value;
        var A_kingaku_9 = TableB[1].value['nok_日程TB_最終金追加金額'].value;

//        TableA[9].value['nok_入金情報TB_入金予定日'].value = A_hiduke_9; //
//        TableA[9].value['nok_入金情報TB_入金予定金額'].value = A_kingaku_9;//

        return event;
    });


    //入金情報TB　7行目 を　日程TB上棟金3行目　　へコピー
    kintone.events.on([
        'app.record.create.change.' + 'nok_入金情報TB_入金日',
        'app.record.create.change.' + 'nok_入金情報TB_入金金額',
        'app.record.edit.change.' + 'nok_入金情報TB_入金日',
        'app.record.edit.change.' + 'nok_入金情報TB_入金金額',

    ], function (event) {
        var record = event.record;
        var TableA = record['nok_入金情報TB'].value;
        var TableB = record['nok_日程TB'].value;

        var hiduke_0 = TableA[0].value['nok_入金情報TB_入金日'].value;
        var kingaku_0 = TableA[0].value['nok_入金情報TB_入金金額'].value;

        var hiduke_1 = TableA[1].value['nok_入金情報TB_入金日'].value;
        var kingaku_1 = TableA[1].value['nok_入金情報TB_入金金額'].value;

        var hiduke_2 = TableA[2].value['nok_入金情報TB_入金日'].value;
        var kingaku_2 = TableA[2].value['nok_入金情報TB_入金金額'].value;

        var hiduke_3 = TableA[3].value['nok_入金情報TB_入金日'].value;
        var kingaku_3 = TableA[3].value['nok_入金情報TB_入金金額'].value;

        var hiduke_4 = TableA[4].value['nok_入金情報TB_入金日'].value;
        var kingaku_4 = TableA[4].value['nok_入金情報TB_入金金額'].value;

        var hiduke_5 = TableA[5].value['nok_入金情報TB_入金日'].value;
        var kingaku_5 = TableA[5].value['nok_入金情報TB_入金金額'].value;

        var hiduke_6 = TableA[6].value['nok_入金情報TB_入金日'].value;
        var kingaku_6 = TableA[6].value['nok_入金情報TB_入金金額'].value;

        var hiduke_7 = TableA[7].value['nok_入金情報TB_入金日'].value;
        var kingaku_7 = TableA[7].value['nok_入金情報TB_入金金額'].value;

        var hiduke_8 = TableA[8].value['nok_入金情報TB_入金日'].value;
        var kingaku_8 = TableA[8].value['nok_入金情報TB_入金金額'].value;

        TableB[2].value['nok_日程TB_請負手付金入金日'].value = hiduke_0;//(最終金（追加）)
        TableB[2].value['nok_日程TB_請負手付金金額'].value = kingaku_0;//(最終金（追加）)

        TableB[2].value['nok_日程TB_仲介手数料1入金日'].value = hiduke_1;//(最終金（追加）)
        TableB[2].value['nok_日程TB_仲介手数料1'].value = kingaku_1;//(最終金（追加）)

        TableB[2].value['nok_日程TB_仲介手数料2入金日'].value = hiduke_2;//(最終金（追加）)
        TableB[2].value['nok_日程TB_仲介手数料2'].value = kingaku_2;//(最終金（追加）)

        TableB[2].value['nok_日程TB_不動産手付金入金日'].value = hiduke_3;//(最終金（追加）)
        TableB[2].value['nok_日程TB_不動産手付金金額'].value = kingaku_3;//(最終金（追加）)

        TableB[2].value['nok_日程TB_不動産最終金入金日'].value = hiduke_4;//(最終金（追加）)
        TableB[2].value['nok_日程TB_不動産最終金金額'].value = kingaku_4;//(最終金（追加）)

        TableB[2].value['nok_日程TB_着工金入金日'].value = hiduke_5;//(最終金（追加）)
        TableB[2].value['nok_日程TB_着工金金額'].value = kingaku_5;//(最終金（追加）)        

        TableB[2].value['nok_日程TB_上棟金入金日'].value = hiduke_6;//(最終金（追加）)
        TableB[2].value['nok_日程TB_上棟金金額'].value = kingaku_6;//(最終金（追加）)

        TableB[2].value['nok_日程TB_最終金入金日'].value = hiduke_7;//(最終金（追加）)
        TableB[2].value['nok_日程TB_最終金金額'].value = kingaku_7;//(最終金（追加）)

        TableB[2].value['nok_日程TB_最終金追加入金日'].value = hiduke_8;//(最終金（追加）)
        TableB[2].value['nok_日程TB_最終金追加金額'].value = kingaku_8;//(最終金（追加）)

        return event;
    });


    //コピー先のテーブルフィールド非活性設定 
    kintone.events.on([
        'app.record.create.show',
        'app.record.edit.show',
    ], function (event) {
        var record = event.record;
        var TableB = record['nok_日程TB'].value;

        TableB[2].value['nok_日程TB_請負手付金入金日'].disabled = true;
        TableB[2].value['nok_日程TB_請負手付金金額'].disabled = true;

        TableB[2].value['nok_日程TB_仲介手数料1入金日'].disabled = true;
        TableB[2].value['nok_日程TB_仲介手数料1'].disabled = true;

        TableB[2].value['nok_日程TB_仲介手数料2入金日'].disabled = true;
        TableB[2].value['nok_日程TB_仲介手数料2'].disabled = true;

        TableB[2].value['nok_日程TB_不動産手付金入金日'].disabled = true;
        TableB[2].value['nok_日程TB_不動産手付金金額'].disabled = true;

        TableB[2].value['nok_日程TB_不動産最終金入金日'].disabled = true;
        TableB[2].value['nok_日程TB_不動産最終金金額'].disabled = true;

        TableB[2].value['nok_日程TB_着工金入金日'].disabled = true;
        TableB[2].value['nok_日程TB_着工金金額'].disabled = true;

        TableB[2].value['nok_日程TB_上棟金入金日'].disabled = true;
        TableB[2].value['nok_日程TB_上棟金金額'].disabled = true;

        TableB[2].value['nok_日程TB_最終金入金日'].disabled = true;
        TableB[2].value['nok_日程TB_最終金金額'].disabled = true;

        TableB[2].value['nok_日程TB_最終金追加入金日'].disabled = true;
        TableB[2].value['nok_日程TB_最終金追加金額'].disabled = true;

        return event;
    });


    //分類ごとの表示非表示設定 
    kintone.events.on([
        'app.record.detail.show',
        'app.record.create.show',
        'app.record.edit.show',
        'app.record.create.change.nok_分類',
        'app.record.edit.change.nok_分類'
    ], function (event) {
        const record = event.record;
        if (record['nok_分類'].value == '戸建て') {
            // 予約有無の値が「あり」の場合
            kintone.app.record.setFieldShown('nok_日程TB_売買契約日', true);	// 表示
            kintone.app.record.setFieldShown('nok_日程TB_売買契約金額', true);	// 表示
            kintone.app.record.setFieldShown('nok_日程TB_仲介手数料1入金日', true);	// 表示
            kintone.app.record.setFieldShown('nok_日程TB_仲介手数料1', true);	// 表示

        } else if (record['nok_分類'].value == '仲介リフォーム') {
            // 予約有無の値が「あり」以外の場合
            kintone.app.record.setFieldShown('nok_日程TB_売買契約日', false);	// 表示
            kintone.app.record.setFieldShown('nok_日程TB_売買契約金額', false);	// 表示
            kintone.app.record.setFieldShown('nok_日程TB_仲介手数料1入金日', false);	// 表示
            kintone.app.record.setFieldShown('nok_日程TB_仲介手数料1', false);	// 表示
        }
        return event;
    });


})(jQuery, moment, window.nokConfig, window.snc);