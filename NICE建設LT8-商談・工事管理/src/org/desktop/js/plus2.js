(function() {
  'use strict';




kintone.events.on('app.record.create.show', (event) => {
    // 行の作成
    const newRow1 = createValue_('契約','','','','','','','','','','','','','','','','','','','','','','','','','','','','');
    const newRow2 = createValue_('予定','','','','','','','','','','','','','','','','','','','','','','','','','','','','');
    const newRow3 = createValue_('実施','','','','','','','','','','','','','','','','','','','','','','','','','','','','');

    // Tableに初期値を定義する
    event.record.nok_日程TB.value = [
      newRow1,
      newRow2,
      newRow3,
    
    ];
    return event;
  });

  const createValue_ = (number, text) => (
    {
      'value': {
        'nok_日程TB_分類': {
          'type': 'NUMBER',
          'value': number
        },
        
        'nok_日程TB_契約': {
          'type': 'DATE',
          'value': ''
        },

        'nok_日程TB_契約金': {
          'type': 'NUMBER',
          'value': ''
        },


        'nok_日程TB_土地契約': {
          'type': 'DATE',
          'value': ''
        },

        'nok_日程TB_本融資申込': {
          'type': 'DATE',
          'value': ''
        },

        'nok_日程TB_融資内諾': {
          'type': 'DATE',
          'value': ''
        },

        'nok_日程TB_土地決済': {
          'type': 'DATE',
          'value': ''
        },
        'nok_日程TB_図面依頼': {
          'type': 'DATE',
          'value': ''
        },
        'nok_日程TB_設計引継': {
          'type': 'DATE',
          'value': ''
        },
        'nok_日程TB_図面確定': {
          'type': 'DATE',
          'value': ''
        },        
        'nok_日程TB_確認申請提出': {
          'type': 'DATE',
          'value': ''
        },
        'nok_日程TB_確認申請許可': {
          'type': 'DATE',
          'value': ''
        },       
        'nok_日程TB_地盤調査': {
          'type': 'DATE',
          'value': ''
        }, 
        'nok_日程TB_地鎮祭': {
          'type': 'DATE',
          'value': ''
        },
        'nok_日程TB_改良工事': {
          'type': 'DATE',
          'value': ''
        },
        'nok_日程TB_着工前打合せ': {
          'type': 'DATE',
          'value': ''
        },
        'nok_日程TB_着工金入金': {
          'type': 'DATE',
          'value': ''
        }, 
        'nok_日程TB_着工金': {
          'type': 'NUMBER',
          'value': ''
        },
        'nok_日程TB_着工': {
          'type': 'DATE',
          'value': ''
        },        

        'nok_日程TB_配筋検査': {
          'type': 'DATE',
          'value': ''
        },
        'nok_日程TB_基礎完了': {
          'type': 'DATE',
          'value': ''
        },
        'nok_日程TB_土台敷き': {
          'type': 'DATE',
          'value': ''
        },        
        'nok_日程TB_上棟金入金日': {
          'type': 'DATE',
          'value': ''
        },
        'nok_日程TB_上棟金': {
          'type': 'NUMBER',
          'value': ''
        },        
        'nok_日程TB_上棟': {
          'type': 'DATE',
          'value': ''
        },
        'nok_日程TB_躯体検査': {
          'type': 'DATE',
          'value': ''
        },
        'nok_日程TB_防水検査': {
          'type': 'DATE',
          'value': ''
        },
        'nok_日程TB_木工事完了': {
          'type': 'DATE',
          'value': ''
        },
        'nok_日程TB_クロス完了': {
          'type': 'DATE',
          'value': ''
        },
        'nok_日程TB_クリーニング完了': {
          'type': 'DATE',
          'value': ''
        },
        'nok_日程TB_社内竣工': {
          'type': 'DATE',
          'value': ''
        },
        'nok_日程TB_竣工直し完了': {
          'type': 'DATE',
          'value': ''
        },
        'nok_日程TB_竣工': {
          'type': 'DATE',
          'value': ''
        },
        'nok_日程TB_最終入金日': {
          'type': 'DATE',
          'value': ''
        },
        'nok_日程TB_入金額': {
          'type': 'DATE',
          'value': ''
        },
        'nok_日程TB_引渡日': {
          'type': 'DATE',
          'value': ''
        },        
      }
    }
  );


})();
