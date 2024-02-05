jQuery.noConflict();
(function($) {
 "use strict";

//nok_着工日--------------------------------------------------------------------------
/*
 kintone.events.on("app.record.detail.show", function(event) {
 var record = event.record;
 if (record['nok_日程TB_契約']['value']) {
 var YM = moment(record['nok_日程TB_契約']['value']).format('M/D');
 var ele1 = kintone.app.record.getFieldElement('nok_日程TB_契約');
 $(ele1).find('span').text(YM);
 }
 return event;
 });
 
*/

    kintone.events.on([
        'app.record.create.submit',
        'app.record.edit.submit',
        'app.record.index.submit',

    ], function (event) {
        // ここにイベント発火時に行いたい処理
        var record = event.record;
        var tbl = event.record.nok_日程TB.value;
        var chakoubi = tbl[1].value['nok_日程TB_着工'].value       
        record['cf_着工日_予定'].value = chakoubi
        return event;
    });


    kintone.events.on([
        'app.record.create.submit',
        'app.record.edit.submit',
        'app.record.index.submit',

    ], function (event) {
        // ここにイベント発火時に行いたい処理
        var record = event.record;
        var tbl = event.record.nok_日程TB.value;
        var hikiwatasibi = tbl[1].value['nok_日程TB_引渡日'].value       
        record['cf_引渡日_予定'].value = hikiwatasibi
        return event;
    });

    kintone.events.on([
        'app.record.create.submit',
        'app.record.edit.submit',
        'app.record.index.submit',

    ], function (event) {
        // ここにイベント発火時に行いたい処理
        var record = event.record;
        var tbl = event.record.nok_日程TB.value;
        var keiyakubi = tbl[1].value['nok_日程TB_契約'].value       
        record['cf_契約日_予定'].value = keiyakubi
        return event;
    });

    kintone.events.on([
        'app.record.create.submit',
        'app.record.edit.submit',
        'app.record.index.submit',

    ], function (event) {
        // ここにイベント発火時に行いたい処理
        var record = event.record;
        var tbl = event.record.nok_日程TB.value;
        var jhoutoubi = tbl[1].value['nok_日程TB_上棟'].value       
        record['cf_上棟日_予定'].value = jhoutoubi
        return event;
    });




})(jQuery);