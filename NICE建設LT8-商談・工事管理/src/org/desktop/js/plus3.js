(function() {
  'use strict';




kintone.events.on('app.record.create.show', (event) => {
    // 行の作成
    const newRow1 = createValue_('契約','','','','','','','','','','','','','','','','','');
    const newRow2 = createValue_('上棟','','','','','','','','','','','','','','','','','');
    const newRow3 = createValue_('完工','','','','','','','','','','','','','','','','','');

    // Tableに初期値を定義する
    event.record.nok_原価売上TB.value = [
      newRow1,
      newRow2,
      newRow3,
    
    ];
    return event;
  });

  const createValue_ = (number, text) => (
    {
      'value': {
        'nok_原価粗利TB_分類': {
          'type': 'NUMBER',
          'value': number
        },
        
        'nok_原価粗利TB_売上': {
          'type': 'CALC',
          'value': ''
        },

        'nok_原価粗利TB_原価': {
          'type': 'CALC',
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




        'nok_原価粗利TB_建物本体_原価': {
          'type': 'NUMBER',
          'value': ''
        },

        'nok_原価粗利TB_付帯工事_原価': {
          'type': 'NUMBER',
          'value': ''
        },


        'nok_原価粗利TB_オプション_原価': {
          'type': 'NUMBER',
          'value': ''
        },        
        

        'nok_原価粗利TB_値引サービス_原価': {
          'type': 'NUMBER',
          'value': ''
        },           


        'nok_原価粗利TB_建築諸費用_原価': {
          'type': 'NUMBER',
          'value': ''
        },   


        'nok_原価粗利TB_合計_原価': {
          'type': 'CALC',
          'value': ''
        },   

      }
    }
  );


})();
