//(function() {
(function ($) {
  "use strict";

    // スピナーを動作させる関数

    function showSpinner() {

        // 要素作成等初期化処理

        if ($('.kintone-spinner').length == 0) {

            // スピナー設置用要素と背景要素の作成

            var spin_div = $('<div id ="kintone-spin" class="kintone-spinner"></div>');

            var spin_bg_div = $('<div id ="kintone-spin-bg" class="kintone-spinner"></div>');

            // スピナー用要素をbodyにappend

            $(document.body).append(spin_div, spin_bg_div);

            // スピナー動作に伴うスタイル設定

            $(spin_div).css({

                'position': 'fixed',

                'top': '50%',

                'left': '50%',

                'z-index': '510',

                'background-color': '#fff',

                'padding': '26px',

                '-moz-border-radius': '4px',

                '-webkit-border-radius': '4px',

                'border-radius': '4px'

            });

            $(spin_bg_div).css({

                'position': 'fixed',

                'top': '0px',

                'left': '0px',

                'z-index': '500',

                'width': '100%',

                'height': '200%',

                'background-color': '#000',

                'opacity': '0.5',

                'filter': 'alpha(opacity=50)',

                '-ms-filter': "alpha(opacity=50)"

            });

            // スピナーに対するオプション設定

            var opts = {

                'color': '#000'

            };

            // スピナーを作動
//kintone.app.record.getFieldElement(fieldCode)
           new Spinner(opts).spin(document.getElementById('kintone-spin'));

        }

        // スピナー始動（表示）

        $('.kintone-spinner').show();

    }

    // スピナーを停止させる関数

    function hideSpinner() {

        // スピナー停止（非表示）

        $('.kintone-spinner').hide();

    }





var getRecords = function(_params) {
  var MAX_READ_LIMIT = 500;

  var params = _params || {};
  var app = params.app || kintone.app.getId();
  var filterCond = params.filterCond;
  var sortConds = params.sortConds || ['$id asc'];
  var fields = params.fields;
  var data = params.data;

  if (!data) {
    data = {
      records: [],
      lastRecordId: 0
    };
  }

  var conditions = [];
  var limit = MAX_READ_LIMIT;
  if (filterCond) {
    conditions.push(filterCond);
  }

  conditions.push('$id > ' + data.lastRecordId);

  var sortCondsAndLimit =
    ' order by ' + sortConds.join(', ') + ' limit ' + limit;
  var query = conditions.join(' and ') + sortCondsAndLimit;
  var body = {
    app: app,
    query: query
  };

  if (fields && fields.length > 0) {
    // $id で並び替えを行うため、取得フィールドに「$id」フィールドが含まれていなければ追加します
    if (fields.indexOf('$id') <= -1) {
      fields.push('$id')
    }
    body.fields = fields;
  }

  return kintone.api(kintone.api.url('/k/v1/records', true), 'GET', body).then(function(r) {
    data.records = data.records.concat(r.records);
    if (r.records.length === limit) {
      // 取得レコードの件数が limit と同じ場合は、未取得のレコードが残っている場合があるので、getRecords を再帰呼び出して、残りのレコードを取得します
      data.lastRecordId = r.records[r.records.length - 1].$id.value;
      return getRecords({ app:app, filterCond:filterCond, sortConds: sortConds, fields:fields, data:data });
    }
    delete data.lastRecordId;
    return data;
  });
};


  
  var putRecords = function(app, records){
    var limit = 100;
    return kintone.Promise.all(
      records.reduce(function(recordsBlocks, record){
        if(recordsBlocks[recordsBlocks.length - 1].length === limit){
          recordsBlocks.push([record]);
        }else{
          recordsBlocks[recordsBlocks.length - 1].push(record);
        }
        return recordsBlocks;
      }, [[]]).map(function(recordsBlock){
        return kintone.api(kintone.api.url('/k/v1/records', true), 'PUT', {
          app: app,
          records: recordsBlock
        });
      })
    );
  }
 
 
  
var  makeStringPettern = function(target){
    let result = "";
        for (var i=0; i<target.length; i++) {
        for (var j=1; j<target.length-i+1; j++) {
            if (result.length != 0) result += ",";
            result += target.substr(i, j);
        }
    }
    return result;
}  
  

  kintone.events.on('app.record.index.show', function(event){

		if ('日付更新'.indexOf(event.viewName) === -1) {
			return event;
		}

    if(document.getElementById('updateButton') !== null) return;

　　var nowDate = moment().format('YYYY-MM-DD');
    var button = document.createElement('button');
    button.innerHTML = '日付更新';
    button.id = 'updateButton';
    kintone.app.getHeaderMenuSpaceElement().appendChild(button);
    button.addEventListener('click', function(){
        

 
 showSpinner();
 

      getRecords(kintone.app.getId()).then(function(data){
        putRecords(kintone.app.getId(), data.records.map(function(record){            
          
 




          return {
            id: record.$id.value,
                    record : {
                                'cf_基準日': {'value': nowDate.toString()}   
                    }
            };





        })).then(function(){
          alert('更新完了');
          location.reload();
        });
      });
    });


hideSpinner();
    
    return event;
  });
  
  
})(jQuery);