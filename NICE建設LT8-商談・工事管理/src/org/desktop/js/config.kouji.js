/**
 * @fileoverview
 * @author SNC
 * @version 1.0.0
 * @customer XXXXX
 */
(function (config) {
    'use strict';
    const cfgKoujiFields = config.kouji.fields;

    // グローバル変数
    window.koujiCustomViewConfig = window.koujiCustomViewConfig || {
        // 進捗管理表: viewId 8446593
        // 原価粗利表: viewId 8446605
        // 着工前物件: viewId 8446607
        viewIds: [8446593, 8446605, 8446607],

        // 進捗管理表
        shinchokuKanriView: {

            viewId: 8446593,
            // 通常のフィールドを固定列 (サブテーブル フィールドではない) に設定する
            fixedColumnFields: [
                {
                    fieldCode: cfgKoujiFields.koujiId.code,
                },
                {
                    fieldCode: cfgKoujiFields.kokyakumei.code,
                },
                {
                    fieldCode: cfgKoujiFields.genbaJusho.code,
                },
                {
                    fieldCode: cfgKoujiFields.modelHouseMei.code,
                }
            ],

            displayFields: [
                {
                    fieldCode: cfgKoujiFields.koujiId.code,
                },
                {
                    fieldCode: cfgKoujiFields.kokyakumei.code,
                },
                {
                    fieldCode: cfgKoujiFields.genbaJusho.code,
                },
                {
                    fieldCode: cfgKoujiFields.modelHouseMei.code,
                },
                {
                    fieldCode: cfgKoujiFields.series.code,
                },
                {
                    fieldCode: cfgKoujiFields.tsubosu.code,
                },
                {
                    fieldCode: cfgKoujiFields.juchuKingaku.code,
                },
                {
                    fieldCode: cfgKoujiFields.tantoshaMei.code,
                },
                {
                    fieldCode: cfgKoujiFields.sekkeiTantoshaMei.code,
                },
                {
                    fieldCode: cfgKoujiFields.cdTantoshaMei.code,
                },
                {
                    fieldCode: cfgKoujiFields.komuTantoshaMei.code,
                },
                // subtable
                {
                    fieldCode: cfgKoujiFields.gaichuTB.code,
                    subtableDisplayFields: [
                        {
                            fieldCode: cfgKoujiFields.gaichuBunrui_TB.code,
                        },
                        {
                            fieldCode: cfgKoujiFields.gaichuSearch_TB.code,
                        },
                        {
                            fieldCode: cfgKoujiFields.gaichuMei_TB.code,
                        },
                    ]
                },
                {
                    fieldCode: cfgKoujiFields.kasaiHoken.code,
                },
                {
                    fieldCode: cfgKoujiFields.shihoshoshi.code,
                },
                {
                    fieldCode: cfgKoujiFields.ginkoMei.code,
                },
                {
                    fieldCode: cfgKoujiFields.kengakuKai.code,
                },
                // subtable
                {
                    fieldCode: cfgKoujiFields.nitteiTB.code,
                    subtableDisplayFields: [
                        {
                            fieldCode: cfgKoujiFields.bunrui_nitteiTB.code,
                        },
                        {
                            fieldCode: cfgKoujiFields.keiyaku_nitteiTB.code,
                        },
                        {
                            fieldCode: cfgKoujiFields.keiyakuKin_nitteiTB.code,
                        },
                        {
                            fieldCode: cfgKoujiFields.tochiKeiyaku_nitteiTB.code,
                        },
                        {
                            fieldCode: cfgKoujiFields.honYushiMoshikomi_nitteiTB.code,
                        },
                        {
                            fieldCode: cfgKoujiFields.yushiNaidaku_nitteiTB.code,
                        },
                        {
                            fieldCode: cfgKoujiFields.tochiKessai_nitteiTB.code,
                        },
                        {
                            fieldCode: cfgKoujiFields.zumenIrai_nitteiTB.code,
                        },
                        {
                            fieldCode: cfgKoujiFields.sekkeiHikitsugi_nitteiTB.code,
                        },
                        {
                            fieldCode: cfgKoujiFields.zumenKakutei_nitteiTB.code,
                        },
                        {
                            fieldCode: cfgKoujiFields.kakuninShinseiTeishutsu_nitteiTB.code,
                        },
                        {
                            fieldCode: cfgKoujiFields.kakuninShinseiKyoka_nitteiTB.code,
                        },
                        {
                            fieldCode: cfgKoujiFields.jibanChosa_nitteiTB.code,
                        },
                        {
                            fieldCode: cfgKoujiFields.jichinsai_nitteiTB.code
                        },
                        {
                            fieldCode: cfgKoujiFields.kairyoKoji_nitteiTB.code
                        },
                        {
                            fieldCode: cfgKoujiFields.chakkoMaeUchiawase_nitteiTB.code
                        },
                        {
                            fieldCode: cfgKoujiFields.chakkoKinNyukin_nitteiTB.code
                        },
                        {
                            fieldCode: cfgKoujiFields.chakkoKin_nitteiTB.code
                        },
                        {
                            fieldCode: cfgKoujiFields.chakko_nitteiTB.code
                        },
                        {
                            fieldCode: cfgKoujiFields.haikinkensa_nitteiTB.code
                        },
                        {
                            fieldCode: cfgKoujiFields.kiIshizueKanryo_nitteiTB.code
                        },
                        {
                            fieldCode: cfgKoujiFields.dodaishiki_nitteiTB.code
                        },
                        {
                            fieldCode: cfgKoujiFields.jotoKinNyuKinBi_nitteiTB.code
                        },
                        {
                            fieldCode: cfgKoujiFields.jotoKin_nitteiTB.code
                        },
                        {
                            fieldCode: cfgKoujiFields.joto_nitteiTB.code
                        },
                        {
                            fieldCode: cfgKoujiFields.mukuroTaiKensa_nitteiTB.code
                        },
                        {
                            fieldCode: cfgKoujiFields.bosuiKensa_nitteiTB.code
                        },
                        {
                            fieldCode: cfgKoujiFields.mokukojiKanryo_nitteiTB.code
                        },
                        {
                            fieldCode: cfgKoujiFields.kurosuKanryo_nitteiTB.code
                        },
                        {
                            fieldCode: cfgKoujiFields.kurininguKanryo_nitteiTB.code
                        },
                        {
                            fieldCode: cfgKoujiFields.shanaiShunko_nitteiTB.code
                        },
                        {
                            fieldCode: cfgKoujiFields.shunkoNaoshiKanryo_nitteiTB.code
                        },
                        {
                            fieldCode: cfgKoujiFields.shunko_nitteiTB.code
                        },
                        {
                            fieldCode: cfgKoujiFields.saishuNyukinBi_nitteiTB.code
                        },
                        {
                            fieldCode: cfgKoujiFields.nyuKingaku_nitteiTB.code
                        },
                        {
                            fieldCode: cfgKoujiFields.hikiwatashiBi_nitteiTB.code
                        },
                    ]
                },
            ],
        },

        // 原価粗利表
        genkaArariView: {

            viewId: 8446605,
            // 通常のフィールドを固定列 (サブテーブル フィールドではない) に設定する
            fixedColumnFields: [
                {
                    fieldCode: cfgKoujiFields.kouji_recordNo.code,
                },
                {
                    fieldCode: cfgKoujiFields.kokyakumei.code,
                },
                {
                    fieldCode: cfgKoujiFields.modelHouseMei.code,
                }
            ],

            displayFields: [
                {
                    fieldCode: cfgKoujiFields.kouji_recordNo.code,
                },
                {
                    fieldCode: cfgKoujiFields.kokyakumei.code,
                },
                {
                    fieldCode: cfgKoujiFields.modelHouseMei.code,
                },
                {
                    fieldCode: cfgKoujiFields.tochiKubun.code,
                },
                {
                    fieldCode: cfgKoujiFields.jigyobu.code,
                },
                {
                    fieldCode: cfgKoujiFields.series.code,
                },
                {
                    fieldCode: cfgKoujiFields.tantoshaMei.code,
                },
                {
                    fieldCode: cfgKoujiFields.sekkeiTantoshaMei.code,
                },
                {
                    fieldCode: cfgKoujiFields.cdTantoshaMei.code,
                },
                {
                    fieldCode: cfgKoujiFields.komuTantoshaMei.code,
                },
                {
                    fieldCode: cfgKoujiFields.juchuKingaku.code,
                },
                {
                    fieldCode: cfgKoujiFields.arari.code,
                },
                // subtable
                {
                    fieldCode: cfgKoujiFields.genkaUriageTB.code,
                    subtableDisplayFields: [
                        {
                            fieldCode: cfgKoujiFields.bunrui_genkaUriageTB.code,
                        },
                        {
                            fieldCode: cfgKoujiFields.uriage_genkaUriageTB.code,
                        },
                        {
                            fieldCode: cfgKoujiFields.genka_genkaUriageTB.code,
                        },
                        {
                            fieldCode: cfgKoujiFields.arari_genkaUriageTB.code,
                        },
                        {
                            fieldCode: cfgKoujiFields.arariRitsu_genkaUriageTB.code,
                        },
                        {
                            fieldCode: cfgKoujiFields.tatemonoHontai_genkaUriageTB.code,
                        },
                        {
                            fieldCode: cfgKoujiFields.futaiKoji_genkaUriageTB.code,
                        },
                        {
                            fieldCode: cfgKoujiFields.option_genkaUriageTB.code,
                        },
                        {
                            fieldCode: cfgKoujiFields.nebikiService_genkaUriageTB.code,
                        },
                        {
                            fieldCode: cfgKoujiFields.kenchikuShoHiyo_genkaUriageTB.code,
                        },
                        {
                            fieldCode: cfgKoujiFields.gokei_genkaUriageTB.code,
                        },
                        {
                            fieldCode: cfgKoujiFields.tatemonoHontaiGenka_genkaUriageTB.code,
                        },
                        {
                            fieldCode: cfgKoujiFields.futaiKojiGenka_genkaUriageTB.code,
                        },
                        {
                            fieldCode: cfgKoujiFields.optionGenka_genkaUriageTB.code,
                        },
                        {
                            fieldCode: cfgKoujiFields.nebikiServiceGenka_genkaUriageTB.code,
                        },
                        {
                            fieldCode: cfgKoujiFields.kenchikuShoHiyoGenka_genkaUriageTB.code,
                        },
                        {
                            fieldCode: cfgKoujiFields.gokeiGenka_genkaUriageTB.code,
                        },
                    ]
                },
                // subtable
                {
                    fieldCode: cfgKoujiFields.nyukinJohoTB.code,
                    subtableDisplayFields: [
                        // {
                        //     fieldCode: cfgKoujiFields.ko_nyukinJohoTB.code,
                        // },
                        {
                            fieldCode: cfgKoujiFields.bunrui_nyukinJohoTB.code,
                        },
                        {
                            fieldCode: cfgKoujiFields.hidzuke_nyukinJohoTB.code,
                        },
                        {
                            fieldCode: cfgKoujiFields.kingaku_nyukinJohoTB.code,
                        },
                        // {
                        //     fieldCode: cfgKoujiFields.uuid_nyukinJohoTB.code,
                        // },
                    ]
                },
                // subtable
                {
                    fieldCode: cfgKoujiFields.sonohokaTB.code,
                    subtableDisplayFields: [
                        // {
                        //     fieldCode: cfgKoujiFields.ko_sonohokaTB.code,
                        // },
                        {
                            fieldCode: cfgKoujiFields.bunrui_sonohokaTB.code,
                        },
                        {
                            fieldCode: cfgKoujiFields.hidzuke_sonohokaTB.code,
                        },
                        {
                            fieldCode: cfgKoujiFields.kingaku_sonohokaTB.code,
                        },
                    ]
                },
            ]
        },

        // 着工前物件
        chakkoZenBukkenView: {

            viewId: 8446607,
            // 通常のフィールドを固定列 (サブテーブル フィールドではない) に設定する
            fixedColumnFields: [
                {
                    fieldCode: cfgKoujiFields.kokyakumei.code,
                },
                {
                    fieldCode: cfgKoujiFields.tantoshaMei.code,
                },
            ],

            displayFields: [
                {
                    fieldCode: cfgKoujiFields.kokyakumei.code,
                },
                {
                    fieldCode: cfgKoujiFields.tantoshaMei.code,
                },
                {
                    fieldCode: cfgKoujiFields.sekkeiTantoshaMei.code,
                },
                {
                    fieldCode: cfgKoujiFields.juchuKingaku.code,
                },
                {
                    fieldCode: cfgKoujiFields.arari.code,
                },
                {
                    fieldCode: cfgKoujiFields.genbaJusho.code,
                },
                {
                    fieldCode: cfgKoujiFields.tochi.code,
                },
                {
                    fieldCode: cfgKoujiFields.kaitsuke.code,
                },
                {
                    fieldCode: cfgKoujiFields.keiyaku.code,
                },
                {
                    fieldCode: cfgKoujiFields.ginkoMei.code,
                },
                {
                    fieldCode: cfgKoujiFields.sekkeiHikitsugi.code,
                },
                {
                    fieldCode: cfgKoujiFields.jizenShinseiKyoka.code,
                },
                {
                    fieldCode: cfgKoujiFields.puranKakutei.code,
                },
                {
                    fieldCode: cfgKoujiFields.chakkoYoteiBi.code,
                },
                {
                    fieldCode: cfgKoujiFields.kankoYoteiBi.code,
                },
            ]
        }
    }
})(window.nokConfig);
