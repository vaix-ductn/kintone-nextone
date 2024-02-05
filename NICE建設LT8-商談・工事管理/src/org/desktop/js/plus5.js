(function() {
  'use strict';




kintone.events.on('app.record.create.show', (event) => {
    // 行の作成
    const newRow1 = createValue_3('1','貸付金','','');
    const newRow2 = createValue_3('2','一時貸付金','','');
    const newRow3 = createValue_3('3','返金','','');
    const newRow4 = createValue_3('4','値引き・サービス','','');
    const newRow5 = createValue_3('5','外構費','','');    

    // Tableに初期値を定義する
    event.record.nok_その他TB.value = [
      newRow1,
      newRow2,
      newRow3,
      newRow4,
      newRow5,
    
    ];
    return event;
  });

  const createValue_3 = (number, text) => (
    {
      'value': {

        'nok_その他TB_項': {
          'type': 'NUMBER',
          'value': number
        },

        'nok_その他TB_分類': {
          'type': 'DROP_DOWN',
          'value': text
        },
        'nok_その他TB_日付': {
          'type': 'DATE',
          'value': ''
        }, 
        'nok_その他TB_金額': {
          'type': 'NUMBER',
          'value':'' ,
          },        
       

      }
    }
  );



kintone.events.on('app.record.create.show', (event) => {
    // 行の作成
    const newRow1 = createValue_('先行造成','本工事','','','','','','','','');
    const newRow2 = createValue_('仮設','本工事','','','','','','','','');
    const newRow2001 = createValue_('','','仮囲い','','','','','','','');
    const newRow2002 = createValue_('','','プラシキ','','','','','','','');    
    const newRow3 = createValue_('基礎','本工事','','','','','','','','');
    const newRow3001 = createValue_('','','エコ土間','','','','','','','');
    const newRow3002 = createValue_('','','立米車','','','','','','','');
    const newRow3003 = createValue_('','','鋤取り分','','','','','','','');    
    
    const newRow4 = createValue_('給排水','本工事','','','','','','','');
    const newRow5 = createValue_('ガス','本工事','','','','','','','','');
    const newRow6 = createValue_('電気','本工事','','','','','','','','');
    const newRow7 = createValue_('足場','本工事','','','','','','','','');
    const newRow8 = createValue_('レッカー','本工事','','','','','','','','');
    const newRow9 = createValue_('プレカット','本工事','','','','','','','','');
    const newRow10 = createValue_('木工事','本工事','','','','','','','','');
    
    const newRow11 = createValue_('防蟻工事','本工事','','','','','','','','');
    const newRow12 = createValue_('サッシ','本工事','','','','','','','','');
    const newRow13 = createValue_('基礎','本工事','','','','','','','','');
    const newRow14 = createValue_('屋根工事','本工事','','','','','','','');
    const newRow15 = createValue_('防水','本工事','','','','','','','','');
    const newRow16 = createValue_('外壁工事','本工事','','','','','','','','');
    const newRow17 = createValue_('ノボパン','本工事','','','','','','','','');
    const newRow18 = createValue_('断熱材','本工事','','','','','','','','');
    const newRow19 = createValue_('PBボード','本工事','','','','','','','','');
    const newRow20 = createValue_('IP材','本工事','','','','','','','','');  
    
    const newRow21 = createValue_('住設機器','本工事','','','','','','','','');
    const newRow22 = createValue_('クロス','本工事','','','','','','','','');
    const newRow23 = createValue_('木建具','本工事','','','','','','','','');
    const newRow24 = createValue_('左官','本工事','','','','','','','');
    const newRow25 = createValue_('タイル','本工事','','','','','','','','');
    const newRow26 = createValue_('給湯器','本工事','','','','','','','','');
    const newRow27 = createValue_('電気機器','本工事','','','','','','','','');
    const newRow28 = createValue_('ベランダ笠木','本工事','','','','','','','','');
    const newRow29 = createValue_('建材','本工事','','','','','','','','');
    const newRow30 = createValue_('畳','本工事','','','','','','','','');      

    const newRow31 = createValue_('その他工事','','副資材','','','','','','','');
    const newRow32 = createValue_('産業廃棄物','本工事','','','','','','','','');
    const newRow33 = createValue_('美装','','クリーニング','','','','','','','');
    const newRow34 = createValue_('予備','','','','','','','','');
    const newRow35 = createValue_('追加工事','','浄化槽','','','','','','','');

    
    // Tableに初期値を定義する
    event.record.nok_予算TB.value = [
      newRow1,
      newRow2,
      newRow2001,
      newRow2002,
      newRow3,
      newRow3001,
      newRow3002,      
      newRow3001,      
      newRow4,
      newRow5,
      newRow6,
      newRow7,
      newRow8,
      newRow9,
      newRow10,
      newRow11,
      newRow12,
      newRow13,
      newRow14,
      newRow15,
      newRow16,
      newRow17,
      newRow18,
      newRow19,
      newRow20,   
      newRow21,
      newRow22,
      newRow23,
      newRow24,
      newRow25,
      newRow26,
      newRow27,
      newRow28,
      newRow29,
      newRow30, 
      newRow31,
      newRow32,
      newRow33,
      newRow34,
      newRow35,
     
    ];
    return event;
  });

  const createValue_ = (text1, text2,text3) => (
    {
      'value': {

        'nok_予算TB_大分類': {
          'type': 'SINGLE_LINE_TEXT',
          'value': text1
        },

        'nok_予算TB_中分類': {
          'type': 'DROP_DOWN',
          'value': text2
        },
        'nok_予算TB_明細': {
          'type': 'SINGLE_LINE_TEXT',
          'value': text3
        }, 
        'nok_予算TB_メモ': {
          'type': 'SINGLE_LINE_TEXT',
          'value': ''
        },
        'nok_予算TB_単価': {
          'type': 'NUMBER',
          'value':'' ,
        },
        'nok_予算TB_入力数量': {
          'type': 'NUMBER',
          'value':'' ,
        },
        'nok_予算TB_数量': {
          'type': 'CALC',
          'value':'' ,
        },        
        'nok_予算TB_調整': {
          'type': 'NUMBER',
          'value':'' ,
        },
        'nok_予算TB_金額': {
          'type': 'CALC',
          'value':'' ,
        },        
        'nok_予算TB_税込価格': {
          'type': 'CALC',
          'value':'' ,
        },        
       

      }
    }
  );
  
  
  
  

kintone.events.on('app.record.create.show', (event) => {
    // 行の作成
    const newRow1 = createValue_2('一般管理','警備代','','','','','','');
    const newRow2 = createValue_2('','駐車場代','','','','','','','');
    const newRow3 = createValue_2('','光熱費','','','','','','','');
    const newRow4 = createValue_2('','道路使用','','','','','','');
    const newRow5 = createValue_2('','改良工事','','','','','','','');
    const newRow6 = createValue_2('','地盤調査','','','','','','','','');
    const newRow7 = createValue_2('','人件費','','','','','','','');
    const newRow8 = createValue_2('申請','UDI申請費','','','','','','','');
    const newRow9 = createValue_2('','設計事務所','申請料','','','','','','');
    const newRow10 = createValue_2('','','追加申請分','','','','','','');
    
    const newRow11 = createValue_2('','家守り','','','','','','','');
    const newRow12 = createValue_2('','ハウスジーメン','','','','','','','');
    const newRow13 = createValue_2('','現況測量','','','','','','','');

    
    // Tableに初期値を定義する
    event.record.nok_予算TB2.value = [
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
      newRow11,
      newRow12,
      newRow13,

    ];
    return event;
  });

  const createValue_2 = (text1, text2,text3) => (
    {
      'value': {

        'nok_予算TB2_大分類': {
          'type': 'SINGLE_LINE_TEXT',
          'value': text1
        },

        'nok_予算TB2_中分類': {
          'type': 'DROP_DOWN',
          'value': text2
        },
        'nok_予算TB2_明細': {
          'type': 'SINGLE_LINE_TEXT',
          'value': text3
        }, 
        'nok_予算TB2_メモ': {
          'type': 'SINGLE_LINE_TEXT',
          'value': ''
        },
        'nok_予算TB2_単価': {
          'type': 'NUMBER',
          'value':'' ,
        },
        'nok_予算TB2_入力数量': {
          'type': 'NUMBER',
          'value':'' ,
        },
        'nok_予算TB2_調整': {
          'type': 'NUMBER',
          'value':'' ,
        },
        'nok_予算TB2_金額': {
          'type': 'CALC',
          'value':'' ,
        },        
        'nok_予算TB2_税込価格': {
          'type': 'CALC',
          'value':'' ,
        },        
       

      }
    }
  );
  
  
  
})();
