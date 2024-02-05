(function() {
  'use strict';




kintone.events.on('app.record.create.show', (event) => {
    // 行の作成
    const newRow1 = createValue_('1','手付金','','','');
    const newRow2 = createValue_('2','着工金','','','');
    const newRow3 = createValue_('3','上棟金','','','');
    const newRow4 = createValue_('4','最終金','','','');
    const newRow5 = createValue_('5','最終金（追加）','','','');    
    const newRow6 = createValue_('6','その他','','',''); 
    // Tableに初期値を定義する
    event.record.nok_入金情報TB.value = [
      newRow1,
      newRow2,
      newRow3,
      newRow4,
      newRow5,
      newRow6,      
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
        'nok_入金情報TB_日付': {
          'type': 'DATE',
          'value': ''
        }, 
        'nok_入金情報TB_金額': {
          'type': 'NUMBER',
          'value':'' ,
          },        
        'nok_入金情報TB_uuid': {
          'type': 'SINGLE_LINE_TEXT',
          'value': '',
        },        

      }
    }
  );


})();
