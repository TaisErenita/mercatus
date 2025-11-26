// Dados Scanntech - NORMALIZADO POR KG + CATEGORIAS + MARCAS
// Fonte: Basereg-canal.xlsx
// Atualizado com suporte a filtros de categoria em marcas

// Dados do mercado por categoria
const mercado_por_categoria = {
  "ago24": {
    "brasil": {
      "total": {
        "receita": 3258.86519378304,
        "volume_kg": 9.840149405283,
        "preco_kg": 331.18045870659375
      },
      "cereais": {
        "receita": 1533.7600184877833,
        "volume_kg": 4.379136486768,
        "preco_kg": 350.24257022410535,
        "share_valor": 47.064236391666284,
        "share_volume_kg": 44.50274387517857
      },
      "frutas": {
        "receita": 124.48240331001819,
        "volume_kg": 0.316751954683,
        "preco_kg": 392.99648027302015,
        "share_valor": 3.819808304666733,
        "share_volume_kg": 3.2189750545143303
      },
      "nuts": {
        "receita": 312.89716458750274,
        "volume_kg": 0.6815538947550001,
        "preco_kg": 459.09379580316346,
        "share_valor": 9.601414786485151,
        "share_volume_kg": 6.926255554504955
      },
      "proteina": {
        "receita": 1287.7256073977358,
        "volume_kg": 4.462707069077,
        "preco_kg": 288.552573015748,
        "share_valor": 39.51454051718184,
        "share_volume_kg": 45.352025515802154
      }
    },
    "sul": {
      "total": {
        "receita": 2036.5001827010228,
        "volume_kg": 15.288586027101003,
        "preco_kg": 133.2039587631624
      },
      "cereais": {
        "receita": 1095.7802765564709,
        "volume_kg": 10.380308163100999,
        "preco_kg": 105.56336664952335,
        "share_valor": 53.80703060400077,
        "share_volume_kg": 67.89580242869128
      },
      "frutas": {
        "receita": 80.14453449742498,
        "volume_kg": 0.709694993944,
        "preco_kg": 112.92813839933744,
        "share_valor": 3.935405220103089,
        "share_volume_kg": 4.641992350934046
      },
      "nuts": {
        "receita": 112.9259580909259,
        "volume_kg": 0.9270545740149999,
        "preco_kg": 121.8115537706184,
        "share_valor": 5.545099335132467,
        "share_volume_kg": 6.06370381388884
      },
      "proteina": {
        "receita": 747.6494135562011,
        "volume_kg": 3.2715282960409997,
        "preco_kg": 228.53215558641506,
        "share_valor": 36.71246484076368,
        "share_volume_kg": 21.3985014064858
      }
    },
    "ne_no_co": {
      "total": {
        "receita": 7066.412861482988,
        "volume_kg": 36.014307797672,
        "preco_kg": 196.21126417817112
      },
      "cereais": {
        "receita": 2623.3730608474525,
        "volume_kg": 16.526138332754,
        "preco_kg": 158.7408387867633,
        "share_valor": 37.1245370497203,
        "share_volume_kg": 45.88770225877358
      },
      "frutas": {
        "receita": 432.9948679411011,
        "volume_kg": 3.237703476657,
        "preco_kg": 133.73518330597028,
        "share_valor": 6.127505941539778,
        "share_volume_kg": 8.990047774474478
      },
      "nuts": {
        "receita": 822.7330204971311,
        "volume_kg": 2.41273346944,
        "preco_kg": 340.99623141883507,
        "share_valor": 11.64286656645291,
        "share_volume_kg": 6.699374823458252
      },
      "proteina": {
        "receita": 3187.311912197303,
        "volume_kg": 13.837732518821,
        "preco_kg": 230.33484047058803,
        "share_valor": 45.10509044228701,
        "share_volume_kg": 38.42287514329371
      }
    }
  },
  "ago25": {
    "brasil": {
      "total": {
        "receita": 2658.450592537777,
        "volume_kg": 9.877471759325,
        "preco_kg": 269.14281886232885
      },
      "cereais": {
        "receita": 1174.5907586258365,
        "volume_kg": 3.9897442452550003,
        "preco_kg": 294.40251966596014,
        "share_valor": 44.183283372762,
        "share_volume_kg": 40.39236296968819
      },
      "frutas": {
        "receita": 78.45999027221006,
        "volume_kg": 0.23138721810200003,
        "preco_kg": 339.0852395209806,
        "share_valor": 2.95134280443074,
        "share_volume_kg": 2.3425753445820274
      },
      "nuts": {
        "receita": 249.3706515177003,
        "volume_kg": 1.0793130874749999,
        "preco_kg": 231.04570343077256,
        "share_valor": 9.380300398197328,
        "share_volume_kg": 10.927017700213169
      },
      "proteina": {
        "receita": 1156.02919212203,
        "volume_kg": 4.577027208493,
        "preco_kg": 252.57206030519887,
        "share_valor": 43.48507342460993,
        "share_volume_kg": 46.33804398551661
      }
    },
    "sul": {
      "total": {
        "receita": 1893.1508187764457,
        "volume_kg": 13.407513058875999,
        "preco_kg": 141.20074397564343
      },
      "cereais": {
        "receita": 985.5497424655393,
        "volume_kg": 8.600703402754,
        "preco_kg": 114.58943487691484,
        "share_valor": 52.05870196345508,
        "share_volume_kg": 64.1483872884255
      },
      "frutas": {
        "receita": 78.52537809347704,
        "volume_kg": 0.6447897710970001,
        "preco_kg": 121.78446621428171,
        "share_valor": 4.147867001120833,
        "share_volume_kg": 4.809167578398429
      },
      "nuts": {
        "receita": 117.39975329184003,
        "volume_kg": 0.7267299390649999,
        "preco_kg": 161.54522743742308,
        "share_valor": 6.20128899015643,
        "share_volume_kg": 5.420318711410037
      },
      "proteina": {
        "receita": 711.6759449255893,
        "volume_kg": 3.43528994596,
        "preco_kg": 207.1661944467135,
        "share_valor": 37.592142045267664,
        "share_volume_kg": 25.622126421766044
      }
    },
    "ne_no_co": {
      "total": {
        "receita": 6493.1723195875675,
        "volume_kg": 33.915328451264,
        "preco_kg": 191.4524380596282
      },
      "cereais": {
        "receita": 2417.0343106891623,
        "volume_kg": 14.743344883877,
        "preco_kg": 163.9407020405782,
        "share_valor": 37.224244047826026,
        "share_volume_kg": 43.471036717403585
      },
      "frutas": {
        "receita": 345.76721280791594,
        "volume_kg": 2.182242807409,
        "preco_kg": 158.44580247165484,
        "share_valor": 5.325089121150543,
        "share_volume_kg": 6.43438500247716
      },
      "nuts": {
        "receita": 769.4050220702582,
        "volume_kg": 3.481298005475,
        "preco_kg": 221.0109622503512,
        "share_valor": 11.849447145415187,
        "share_volume_kg": 10.264674306420448
      },
      "proteina": {
        "receita": 2960.965774020231,
        "volume_kg": 13.508442754503001,
        "preco_kg": 219.19371668752873,
        "share_valor": 45.60121968560824,
        "share_volume_kg": 39.8299039736988
      }
    }
  }
};

// Dados de marcas por categoria
const marcas_por_categoria = {
  "ago24": {
    "brasil": {
      "total": {
        "marcas": [
          {
            "MARCA": "NUTRY",
            "RECEITA": 1369.4771017422934,
            "VOLUME_KG": 3.028899375375,
            "SHARE_VALOR": 42.02312830720505,
            "SHARE_VOLUME_KG": 30.781030354567974,
            "PRECO_KG": 452.1368761458911
          },
          {
            "MARCA": "BOLD",
            "RECEITA": 369.54296419473116,
            "VOLUME_KG": 1.42818472267,
            "SHARE_VALOR": 11.33962107115418,
            "SHARE_VOLUME_KG": 14.513852014312235,
            "PRECO_KG": 258.75011707439944
          },
          {
            "MARCA": "ENJOY",
            "RECEITA": 341.5177554351343,
            "VOLUME_KG": 0.44219095578,
            "SHARE_VALOR": 10.479652735763667,
            "SHARE_VOLUME_KG": 4.493742295646401,
            "PRECO_KG": 772.3309375080188
          },
          {
            "MARCA": "NUTRATA",
            "RECEITA": 259.56282181481237,
            "VOLUME_KG": 1.285973750425,
            "SHARE_VALOR": 7.9648223040947554,
            "SHARE_VOLUME_KG": 13.068640499854439,
            "PRECO_KG": 201.84146194977134
          },
          {
            "MARCA": "KOBBER",
            "RECEITA": 195.4145182066748,
            "VOLUME_KG": 1.130182575378,
            "SHARE_VALOR": 5.99639772088359,
            "SHARE_VOLUME_KG": 11.485420889760324,
            "PRECO_KG": 172.90526545351898
          },
          {
            "MARCA": "Mercado Total",
            "RECEITA": 3258.86519378304,
            "VOLUME_KG": 9.840149405283,
            "SHARE_VALOR": 100.0,
            "SHARE_VOLUME_KG": 100.0,
            "PRECO_KG": 331.18045870659375
          }
        ]
      },
      "cereais": {
        "marcas": [
          {
            "MARCA": "NUTRY",
            "RECEITA": 1219.0558923219162,
            "VOLUME_KG": 2.396815582458,
            "SHARE_VALOR": 79.48152759411796,
            "SHARE_VOLUME_KG": 54.73260743756717,
            "PRECO_KG": 508.6148059300169
          },
          {
            "MARCA": "KOBBER",
            "RECEITA": 149.06940011059183,
            "VOLUME_KG": 0.932007728228,
            "SHARE_VALOR": 9.719212804723348,
            "SHARE_VOLUME_KG": 21.282911163973875,
            "PRECO_KG": 159.94438199993607
          },
          {
            "MARCA": "TRIO",
            "RECEITA": 119.25464907267009,
            "VOLUME_KG": 0.6822256656860001,
            "SHARE_VALOR": 7.775313454203199,
            "SHARE_VOLUME_KG": 15.57899982673327,
            "PRECO_KG": 174.8023492384381
          },
          {
            "MARCA": "RITTER",
            "RECEITA": 31.838912477995756,
            "VOLUME_KG": 0.263549413551,
            "SHARE_VALOR": 2.0758731544839364,
            "SHARE_VOLUME_KG": 6.018296400382608,
            "PRECO_KG": 120.80813252060052
          },
          {
            "MARCA": "SUCRILHOS",
            "RECEITA": 6.957926278036979,
            "VOLUME_KG": 0.02506103764,
            "SHARE_VALOR": 0.4536515617936875,
            "SHARE_VOLUME_KG": 0.5722826341614251,
            "PRECO_KG": 277.63919347582845
          },
          {
            "MARCA": "Mercado Total",
            "RECEITA": 1533.7600184877833,
            "VOLUME_KG": 4.379136486768,
            "SHARE_VALOR": 100.0,
            "SHARE_VOLUME_KG": 100.0,
            "PRECO_KG": 350.24257022410535
          }
        ]
      },
      "frutas": {
        "marcas": [
          {
            "MARCA": "SUPINO",
            "RECEITA": 64.69411903965573,
            "VOLUME_KG": 0.051580952376,
            "SHARE_VALOR": 51.9704932740877,
            "SHARE_VOLUME_KG": 16.28433593333981,
            "PRECO_KG": 1254.2249815022246
          },
          {
            "MARCA": "NUTRY",
            "RECEITA": 59.78828427036247,
            "VOLUME_KG": 0.265171002307,
            "SHARE_VALOR": 48.029506725912306,
            "SHARE_VOLUME_KG": 83.7156640666602,
            "PRECO_KG": 225.4706726987552
          },
          {
            "MARCA": "Mercado Total",
            "RECEITA": 124.48240331001819,
            "VOLUME_KG": 0.316751954683,
            "SHARE_VALOR": 100.0,
            "SHARE_VOLUME_KG": 100.0,
            "PRECO_KG": 392.99648027302015
          }
        ]
      },
      "nuts": {
        "marcas": [
          {
            "MARCA": "ENJOY",
            "RECEITA": 234.24667209724765,
            "VOLUME_KG": 0.34265524149,
            "SHARE_VALOR": 74.86378868471331,
            "SHARE_VOLUME_KG": 50.275589960963416,
            "PRECO_KG": 683.6220309330475
          },
          {
            "MARCA": "KOBBER",
            "RECEITA": 46.345118096082984,
            "VOLUME_KG": 0.19817484715,
            "SHARE_VALOR": 14.811613316209012,
            "SHARE_VOLUME_KG": 29.076915072319913,
            "PRECO_KG": 233.85973932909874
          },
          {
            "MARCA": "PINATI NUTS",
            "RECEITA": 14.665225136231061,
            "VOLUME_KG": 0.040050676140000005,
            "SHARE_VALOR": 4.686915317869517,
            "SHARE_VOLUME_KG": 5.876376974472008,
            "PRECO_KG": 366.16673049333093
          },
          {
            "MARCA": "NUTRY",
            "RECEITA": 9.301214145023945,
            "VOLUME_KG": 0.0723306233,
            "SHARE_VALOR": 2.972610556342331,
            "SHARE_VOLUME_KG": 10.61260508620538,
            "PRECO_KG": 128.59303184
          },
          {
            "MARCA": "TRIO",
            "RECEITA": 8.338935112917074,
            "VOLUME_KG": 0.028342506674999997,
            "SHARE_VALOR": 2.6650721248658242,
            "SHARE_VOLUME_KG": 4.158512906039272,
            "PRECO_KG": 294.2200987562112
          },
          {
            "MARCA": "Mercado Total",
            "RECEITA": 312.89716458750274,
            "VOLUME_KG": 0.6815538947550001,
            "SHARE_VALOR": 100.0,
            "SHARE_VOLUME_KG": 100.0,
            "PRECO_KG": 459.09379580316346
          }
        ]
      },
      "proteina": {
        "marcas": [
          {
            "MARCA": "BOLD",
            "RECEITA": 369.54296419473116,
            "VOLUME_KG": 1.42818472267,
            "SHARE_VALOR": 28.697337543943984,
            "SHARE_VOLUME_KG": 32.00265445532333,
            "PRECO_KG": 258.75011707439944
          },
          {
            "MARCA": "NUTRATA",
            "RECEITA": 259.56282181481237,
            "VOLUME_KG": 1.285973750425,
            "SHARE_VALOR": 20.15668713300985,
            "SHARE_VOLUME_KG": 28.816001823999883,
            "PRECO_KG": 201.84146194977134
          },
          {
            "MARCA": "INTEGRALMEDICA",
            "RECEITA": 168.71024802889104,
            "VOLUME_KG": 0.48057893342999997,
            "SHARE_VALOR": 13.101412836685327,
            "SHARE_VOLUME_KG": 10.76877612604306,
            "PRECO_KG": 351.05627045440394
          },
          {
            "MARCA": "MAIS MU",
            "RECEITA": 127.89069003480355,
            "VOLUME_KG": 0.48743308381,
            "SHARE_VALOR": 9.931517188141337,
            "SHARE_VOLUME_KG": 10.922363405555394,
            "PRECO_KG": 262.3758917534924
          },
          {
            "MARCA": "ENJOY",
            "RECEITA": 107.27108333788664,
            "VOLUME_KG": 0.09953571429000001,
            "SHARE_VALOR": 8.330274922051322,
            "SHARE_VOLUME_KG": 2.2303887024022506,
            "PRECO_KG": 1077.7145078333333
          },
          {
            "MARCA": "Mercado Total",
            "RECEITA": 1287.7256073977358,
            "VOLUME_KG": 4.462707069077,
            "SHARE_VALOR": 100.0,
            "SHARE_VOLUME_KG": 100.0,
            "PRECO_KG": 288.552573015748
          }
        ]
      }
    },
    "sul": {
      "total": {
        "marcas": [
          {
            "MARCA": "RITTER",
            "RECEITA": 639.1739895525255,
            "VOLUME_KG": 5.221994227435,
            "SHARE_VALOR": 31.385903864972164,
            "SHARE_VOLUME_KG": 34.15616210798264,
            "PRECO_KG": 122.40036310160428
          },
          {
            "MARCA": "NUTRY",
            "RECEITA": 322.338919225291,
            "VOLUME_KG": 2.287403113931,
            "SHARE_VALOR": 15.828082018523117,
            "SHARE_VOLUME_KG": 14.96150860436852,
            "PRECO_KG": 140.9191573020716
          },
          {
            "MARCA": "NUTRATA",
            "RECEITA": 220.2799950517211,
            "VOLUME_KG": 1.122702490835,
            "SHARE_VALOR": 10.816595889501093,
            "SHARE_VOLUME_KG": 7.343403038350729,
            "PRECO_KG": 196.20513613351815
          },
          {
            "MARCA": "ENJOY",
            "RECEITA": 192.48616329065368,
            "VOLUME_KG": 0.76652679957,
            "SHARE_VALOR": 9.451811736906308,
            "SHARE_VOLUME_KG": 5.013719373467447,
            "PRECO_KG": 251.114720840332
          },
          {
            "MARCA": "NATURALE",
            "RECEITA": 127.9255295583538,
            "VOLUME_KG": 2.547128111989,
            "SHARE_VALOR": 6.281636046243088,
            "SHARE_VOLUME_KG": 16.660324947473136,
            "PRECO_KG": 50.22343750839426
          },
          {
            "MARCA": "Mercado Total",
            "RECEITA": 2036.5001827010228,
            "VOLUME_KG": 15.288586027101003,
            "SHARE_VALOR": 100.0,
            "SHARE_VOLUME_KG": 100.0,
            "PRECO_KG": 133.2039587631624
          }
        ]
      },
      "cereais": {
        "marcas": [
          {
            "MARCA": "RITTER",
            "RECEITA": 639.1739895525255,
            "VOLUME_KG": 5.221994227435,
            "SHARE_VALOR": 58.33048862324415,
            "SHARE_VOLUME_KG": 50.306736036967415,
            "PRECO_KG": 122.40036310160428
          },
          {
            "MARCA": "NUTRY",
            "RECEITA": 245.87632519492672,
            "VOLUME_KG": 1.795798446786,
            "SHARE_VALOR": 22.438469687335672,
            "SHARE_VOLUME_KG": 17.300049464519226,
            "PRECO_KG": 136.91755087269382
          },
          {
            "MARCA": "NATURALE",
            "RECEITA": 125.89095204032266,
            "VOLUME_KG": 2.526976949209,
            "SHARE_VALOR": 11.488703961339725,
            "SHARE_VOLUME_KG": 24.34394923063724,
            "PRECO_KG": 49.8187971519603
          },
          {
            "MARCA": "GRANOFIBRA",
            "RECEITA": 36.451182340761754,
            "VOLUME_KG": 0.43475401698,
            "SHARE_VALOR": 3.32650469447314,
            "SHARE_VOLUME_KG": 4.188257324820328,
            "PRECO_KG": 83.84323299406942
          },
          {
            "MARCA": "DIVINE",
            "RECEITA": 15.880112141674427,
            "VOLUME_KG": 0.17889158454999998,
            "SHARE_VALOR": 1.4492058747012908,
            "SHARE_VOLUME_KG": 1.723374506220422,
            "PRECO_KG": 88.76947555482106
          },
          {
            "MARCA": "Mercado Total",
            "RECEITA": 1095.7802765564709,
            "VOLUME_KG": 10.380308163100999,
            "SHARE_VALOR": 100.0,
            "SHARE_VOLUME_KG": 100.0,
            "PRECO_KG": 105.56336664952335
          }
        ]
      },
      "frutas": {
        "marcas": [
          {
            "MARCA": "SUPINO",
            "RECEITA": 44.28258441246146,
            "VOLUME_KG": 0.45418468704,
            "SHARE_VALOR": 55.2534052261346,
            "SHARE_VOLUME_KG": 63.997166517400906,
            "PRECO_KG": 97.49906959888654
          },
          {
            "MARCA": "NUTRY",
            "RECEITA": 34.85805841916214,
            "VOLUME_KG": 0.24548614024499998,
            "SHARE_VALOR": 43.4939932432724,
            "SHARE_VOLUME_KG": 34.5903722500219,
            "PRECO_KG": 141.99603441714925
          },
          {
            "MARCA": "OLIVEIRA",
            "RECEITA": 1.0038916658013717,
            "VOLUME_KG": 0.010024166659,
            "SHARE_VALOR": 1.2526015305929892,
            "SHARE_VOLUME_KG": 1.4124612325771846,
            "PRECO_KG": 100.14714439130432
          },
          {
            "MARCA": "Mercado Total",
            "RECEITA": 80.14453449742498,
            "VOLUME_KG": 0.709694993944,
            "SHARE_VALOR": 100.0,
            "SHARE_VOLUME_KG": 100.0,
            "PRECO_KG": 112.92813839933744
          }
        ]
      },
      "nuts": {
        "marcas": [
          {
            "MARCA": "ENJOY",
            "RECEITA": 70.79071883194075,
            "VOLUME_KG": 0.65386013289,
            "SHARE_VALOR": 62.68772922425981,
            "SHARE_VOLUME_KG": 70.5309213952943,
            "PRECO_KG": 108.26584352077326
          },
          {
            "MARCA": "NUTS BAR",
            "RECEITA": 26.717605231012318,
            "VOLUME_KG": 0.1661080248,
            "SHARE_VALOR": 23.659400976257196,
            "SHARE_VOLUME_KG": 17.917825924810373,
            "PRECO_KG": 160.84475908482608
          },
          {
            "MARCA": "HARTS NATURAL",
            "RECEITA": 13.383056509941696,
            "VOLUME_KG": 0.086935253545,
            "SHARE_VALOR": 11.851178184528578,
            "SHARE_VOLUME_KG": 9.3775766801398,
            "PRECO_KG": 153.942801846368
          },
          {
            "MARCA": "NATURALE",
            "RECEITA": 2.0345775180311416,
            "VOLUME_KG": 0.02015116278,
            "SHARE_VALOR": 1.8016916149544087,
            "SHARE_VOLUME_KG": 2.1736759997555386,
            "PRECO_KG": 100.96576263333334
          },
          {
            "MARCA": "Mercado Total",
            "RECEITA": 112.9259580909259,
            "VOLUME_KG": 0.9270545740149999,
            "SHARE_VALOR": 100.0,
            "SHARE_VOLUME_KG": 100.0,
            "PRECO_KG": 121.8115537706184
          }
        ]
      },
      "proteina": {
        "marcas": [
          {
            "MARCA": "NUTRATA",
            "RECEITA": 220.2799950517211,
            "VOLUME_KG": 1.122702490835,
            "SHARE_VALOR": 29.46300646501645,
            "SHARE_VOLUME_KG": 34.31737063664175,
            "PRECO_KG": 196.20513613351815
          },
          {
            "MARCA": "INTEGRALMEDICA",
            "RECEITA": 126.89756693126893,
            "VOLUME_KG": 0.64125840195,
            "SHARE_VALOR": 16.972870523321824,
            "SHARE_VOLUME_KG": 19.601187699522914,
            "PRECO_KG": 197.88834975945213
          },
          {
            "MARCA": "ENJOY",
            "RECEITA": 121.69544445871293,
            "VOLUME_KG": 0.11266666668,
            "SHARE_VALOR": 16.277073485534814,
            "SHARE_VOLUME_KG": 3.443854262741429,
            "PRECO_KG": 1080.1370808666666
          },
          {
            "MARCA": "BOLD",
            "RECEITA": 62.1878320276455,
            "VOLUME_KG": 0.2378211577,
            "SHARE_VALOR": 8.317779817661933,
            "SHARE_VOLUME_KG": 7.269420777677406,
            "PRECO_KG": 261.48990539391986
          },
          {
            "MARCA": "NUTRY",
            "RECEITA": 41.60453561120215,
            "VOLUME_KG": 0.2461185269,
            "SHARE_VALOR": 5.564711863185956,
            "SHARE_VOLUME_KG": 7.523044419265373,
            "PRECO_KG": 169.0426809197766
          },
          {
            "MARCA": "Mercado Total",
            "RECEITA": 747.6494135562011,
            "VOLUME_KG": 3.2715282960409997,
            "SHARE_VALOR": 100.0,
            "SHARE_VOLUME_KG": 100.0,
            "PRECO_KG": 228.53215558641506
          }
        ]
      }
    },
    "ne_no_co": {
      "total": {
        "marcas": [
          {
            "MARCA": "NUTRY",
            "RECEITA": 1838.7097555657815,
            "VOLUME_KG": 9.417170058016,
            "SHARE_VALOR": 26.020412217747236,
            "SHARE_VOLUME_KG": 26.14841332206511,
            "PRECO_KG": 195.250775364373
          },
          {
            "MARCA": "ENJOY",
            "RECEITA": 891.8969178205673,
            "VOLUME_KG": 1.45993230828,
            "SHARE_VALOR": 12.62163611585794,
            "SHARE_VOLUME_KG": 4.05375640282158,
            "PRECO_KG": 610.9166245326428
          },
          {
            "MARCA": "BOLD",
            "RECEITA": 776.4977834528792,
            "VOLUME_KG": 2.92130771992,
            "SHARE_VALOR": 10.988570844556058,
            "SHARE_VOLUME_KG": 8.111519833539148,
            "PRECO_KG": 265.8048579264849
          },
          {
            "MARCA": "NUTRATA",
            "RECEITA": 623.8214305161499,
            "VOLUME_KG": 3.2221395993299997,
            "SHARE_VALOR": 8.82797881675473,
            "SHARE_VOLUME_KG": 8.946831957542948,
            "PRECO_KG": 193.60471863039862
          },
          {
            "MARCA": "TRIO",
            "RECEITA": 434.390030890413,
            "VOLUME_KG": 2.207749234127,
            "SHARE_VALOR": 6.1472495225710615,
            "SHARE_VOLUME_KG": 6.130200381831888,
            "PRECO_KG": 196.75696142283198
          },
          {
            "MARCA": "Mercado Total",
            "RECEITA": 7066.412861482988,
            "VOLUME_KG": 36.014307797672,
            "SHARE_VALOR": 100.0,
            "SHARE_VOLUME_KG": 100.0,
            "PRECO_KG": 196.21126417817112
          }
        ]
      },
      "cereais": {
        "marcas": [
          {
            "MARCA": "NUTRY",
            "RECEITA": 1458.923129714023,
            "VOLUME_KG": 7.444859482066,
            "SHARE_VALOR": 55.6124918521018,
            "SHARE_VOLUME_KG": 45.04899651790189,
            "PRECO_KG": 195.96382352527112
          },
          {
            "MARCA": "TRIO",
            "RECEITA": 369.38694911328383,
            "VOLUME_KG": 2.118964965552,
            "SHARE_VALOR": 14.08061074599727,
            "SHARE_VOLUME_KG": 12.82190020975629,
            "PRECO_KG": 174.32423618059056
          },
          {
            "MARCA": "LINEA",
            "RECEITA": 222.45514451837337,
            "VOLUME_KG": 0.36411433332000004,
            "SHARE_VALOR": 8.479737321329038,
            "SHARE_VOLUME_KG": 2.2032632547819304,
            "PRECO_KG": 610.9486064171766
          },
          {
            "MARCA": "RITTER",
            "RECEITA": 221.93674144950992,
            "VOLUME_KG": 1.325779185346,
            "SHARE_VALOR": 8.459976385433174,
            "SHARE_VOLUME_KG": 8.022316881605487,
            "PRECO_KG": 167.40098494727025
          },
          {
            "MARCA": "NATURALE",
            "RECEITA": 118.55602995265646,
            "VOLUME_KG": 2.868106191449,
            "SHARE_VALOR": 4.519221140220073,
            "SHARE_VOLUME_KG": 17.354969041766722,
            "PRECO_KG": 41.335997358159396
          },
          {
            "MARCA": "Mercado Total",
            "RECEITA": 2623.3730608474525,
            "VOLUME_KG": 16.526138332754,
            "SHARE_VALOR": 100.0,
            "SHARE_VOLUME_KG": 100.0,
            "PRECO_KG": 158.7408387867633
          }
        ]
      },
      "frutas": {
        "marcas": [
          {
            "MARCA": "SUPINO",
            "RECEITA": 246.52421015175617,
            "VOLUME_KG": 2.148576984768,
            "SHARE_VALOR": 56.93467253410728,
            "SHARE_VOLUME_KG": 66.36114147755288,
            "PRECO_KG": 114.73836492685669
          },
          {
            "MARCA": "NUTRY",
            "RECEITA": 172.26219647348117,
            "VOLUME_KG": 0.9798619814949999,
            "SHARE_VALOR": 39.783888731197024,
            "SHARE_VOLUME_KG": 30.26410505345996,
            "PRECO_KG": 175.80251068691985
          },
          {
            "MARCA": "BANANA BRASIL",
            "RECEITA": 8.759429415758458,
            "VOLUME_KG": 0.06793787561,
            "SHARE_VALOR": 2.022986890678338,
            "SHARE_VOLUME_KG": 2.098335320075307,
            "PRECO_KG": 128.93293081523922
          },
          {
            "MARCA": "OLIVEIRA",
            "RECEITA": 5.449031900105301,
            "VOLUME_KG": 0.041326634784,
            "SHARE_VALOR": 1.2584518440173558,
            "SHARE_VOLUME_KG": 1.2764181489118533,
            "PRECO_KG": 131.8527852215769
          },
          {
            "MARCA": "Mercado Total",
            "RECEITA": 432.9948679411011,
            "VOLUME_KG": 3.237703476657,
            "SHARE_VALOR": 100.0,
            "SHARE_VOLUME_KG": 100.0,
            "PRECO_KG": 133.73518330597028
          }
        ]
      },
      "nuts": {
        "marcas": [
          {
            "MARCA": "ENJOY",
            "RECEITA": 565.487076163124,
            "VOLUME_KG": 1.15285730829,
            "SHARE_VALOR": 68.73275559323389,
            "SHARE_VOLUME_KG": 47.782207313499086,
            "PRECO_KG": 490.5091654420743
          },
          {
            "MARCA": "NUTS BAR",
            "RECEITA": 92.57083402286987,
            "VOLUME_KG": 0.6091983071,
            "SHARE_VALOR": 11.25162497634221,
            "SHARE_VOLUME_KG": 25.249299801083957,
            "PRECO_KG": 151.95517279675295
          },
          {
            "MARCA": "TRIO",
            "RECEITA": 65.00308177712914,
            "VOLUME_KG": 0.088784268575,
            "SHARE_VALOR": 7.900871869449394,
            "SHARE_VOLUME_KG": 3.6798208214688133,
            "PRECO_KG": 732.1463905761431
          },
          {
            "MARCA": "NUTRY",
            "RECEITA": 48.82225412887933,
            "VOLUME_KG": 0.25463829985499997,
            "SHARE_VALOR": 5.934155177019491,
            "SHARE_VOLUME_KG": 10.55393407851643,
            "PRECO_KG": 191.73177859214596
          },
          {
            "MARCA": "KODILAR",
            "RECEITA": 41.269478698382656,
            "VOLUME_KG": 0.2340682563,
            "SHARE_VALOR": 5.016144687306442,
            "SHARE_VOLUME_KG": 9.70137229266056,
            "PRECO_KG": 176.31386395893213
          },
          {
            "MARCA": "Mercado Total",
            "RECEITA": 822.7330204971311,
            "VOLUME_KG": 2.41273346944,
            "SHARE_VALOR": 100.0,
            "SHARE_VOLUME_KG": 100.0,
            "PRECO_KG": 340.99623141883507
          }
        ]
      },
      "proteina": {
        "marcas": [
          {
            "MARCA": "BOLD",
            "RECEITA": 776.4977834528792,
            "VOLUME_KG": 2.92130771992,
            "SHARE_VALOR": 24.3621523353693,
            "SHARE_VOLUME_KG": 21.11117349570579,
            "PRECO_KG": 265.8048579264849
          },
          {
            "MARCA": "NUTRATA",
            "RECEITA": 623.8214305161499,
            "VOLUME_KG": 3.2221395993299997,
            "SHARE_VALOR": 19.57202331308997,
            "SHARE_VOLUME_KG": 23.28517042042472,
            "PRECO_KG": 193.60471863039862
          },
          {
            "MARCA": "INTEGRALMEDICA",
            "RECEITA": 421.98956632386285,
            "VOLUME_KG": 1.9471607284349999,
            "SHARE_VALOR": 13.239669600862728,
            "SHARE_VOLUME_KG": 14.071385798118474,
            "PRECO_KG": 216.7204587486881
          },
          {
            "MARCA": "ENJOY",
            "RECEITA": 326.4098416574433,
            "VOLUME_KG": 0.30707499999,
            "SHARE_VALOR": 10.240913053044105,
            "SHARE_VOLUME_KG": 2.2191135691656174,
            "PRECO_KG": 1062.9645580658566
          },
          {
            "MARCA": "PROTEIN MAIS",
            "RECEITA": 292.57817228291793,
            "VOLUME_KG": 1.7123472705,
            "SHARE_VALOR": 9.179464713298714,
            "SHARE_VOLUME_KG": 12.374478753444608,
            "PRECO_KG": 170.86380626371778
          },
          {
            "MARCA": "Mercado Total",
            "RECEITA": 3187.311912197303,
            "VOLUME_KG": 13.837732518821,
            "SHARE_VALOR": 100.0,
            "SHARE_VOLUME_KG": 100.0,
            "PRECO_KG": 230.33484047058803
          }
        ]
      }
    }
  },
  "ago25": {
    "brasil": {
      "total": {
        "marcas": [
          {
            "MARCA": "NUTRY",
            "RECEITA": 729.693298368569,
            "VOLUME_KG": 2.728486563984,
            "SHARE_VALOR": 27.44806694609277,
            "SHARE_VOLUME_KG": 27.623329435572668,
            "PRECO_KG": 267.43518110021665
          },
          {
            "MARCA": "NUTRATA",
            "RECEITA": 317.0678366693326,
            "VOLUME_KG": 1.71926367345,
            "SHARE_VALOR": 11.926790648633318,
            "SHARE_VOLUME_KG": 17.40590826622105,
            "PRECO_KG": 184.4207154293449
          },
          {
            "MARCA": "BOLD",
            "RECEITA": 299.9882093047083,
            "VOLUME_KG": 1.2277549719,
            "SHARE_VALOR": 11.284325168456009,
            "SHARE_VOLUME_KG": 12.429850490242268,
            "PRECO_KG": 244.33882669639243
          },
          {
            "MARCA": "QUAKER",
            "RECEITA": 298.0621756859656,
            "VOLUME_KG": 0.22854117646799998,
            "SHARE_VALOR": 11.211875688892649,
            "SHARE_VOLUME_KG": 2.313761881953666,
            "PRECO_KG": 1304.1946326363636
          },
          {
            "MARCA": "ENJOY",
            "RECEITA": 254.48624574304156,
            "VOLUME_KG": 0.91032622882,
            "SHARE_VALOR": 9.57272805661237,
            "SHARE_VOLUME_KG": 9.216186601197727,
            "PRECO_KG": 279.5549965345022
          },
          {
            "MARCA": "Mercado Total",
            "RECEITA": 2658.450592537777,
            "VOLUME_KG": 9.877471759325,
            "SHARE_VALOR": 100.0,
            "SHARE_VOLUME_KG": 100.0,
            "PRECO_KG": 269.14281886232885
          }
        ]
      },
      "cereais": {
        "marcas": [
          {
            "MARCA": "NUTRY",
            "RECEITA": 608.9366985672024,
            "VOLUME_KG": 2.266663383208,
            "SHARE_VALOR": 51.842456114638814,
            "SHARE_VOLUME_KG": 56.812247699930666,
            "PRECO_KG": 268.64893264626556
          },
          {
            "MARCA": "QUAKER",
            "RECEITA": 298.0621756859656,
            "VOLUME_KG": 0.22854117646799998,
            "SHARE_VALOR": 25.375831837351676,
            "SHARE_VOLUME_KG": 5.72821620683591,
            "PRECO_KG": 1304.1946326363636
          },
          {
            "MARCA": "KOBBER",
            "RECEITA": 124.54920749431996,
            "VOLUME_KG": 0.684567944344,
            "SHARE_VALOR": 10.603625695134117,
            "SHARE_VOLUME_KG": 17.158191158697857,
            "PRECO_KG": 181.9384160817982
          },
          {
            "MARCA": "TRIO",
            "RECEITA": 86.7276606785041,
            "VOLUME_KG": 0.423691126532,
            "SHARE_VALOR": 7.383649159641567,
            "SHARE_VOLUME_KG": 10.619505925370918,
            "PRECO_KG": 204.69548510111136
          },
          {
            "MARCA": "RITTER",
            "RECEITA": 34.35816175171171,
            "VOLUME_KG": 0.259999308567,
            "SHARE_VALOR": 2.925117663270875,
            "SHARE_VOLUME_KG": 6.516691110619859,
            "PRECO_KG": 132.14712739460174
          },
          {
            "MARCA": "Mercado Total",
            "RECEITA": 1174.5907586258365,
            "VOLUME_KG": 3.9897442452550003,
            "SHARE_VALOR": 100.0,
            "SHARE_VOLUME_KG": 100.0,
            "PRECO_KG": 294.40251966596014
          }
        ]
      },
      "frutas": {
        "marcas": [
          {
            "MARCA": "NUTRY",
            "RECEITA": 55.43594621908483,
            "VOLUME_KG": 0.21677545340600002,
            "SHARE_VALOR": 70.6550510989801,
            "SHARE_VOLUME_KG": 93.68514613043195,
            "PRECO_KG": 255.72981326099926
          },
          {
            "MARCA": "SUPINO",
            "RECEITA": 23.02404405312524,
            "VOLUME_KG": 0.014611764696000002,
            "SHARE_VALOR": 29.34494890101992,
            "SHARE_VOLUME_KG": 6.314853869568046,
            "PRECO_KG": 1575.7196021249997
          },
          {
            "MARCA": "Mercado Total",
            "RECEITA": 78.45999027221006,
            "VOLUME_KG": 0.23138721810200003,
            "SHARE_VALOR": 100.0,
            "SHARE_VOLUME_KG": 100.0,
            "PRECO_KG": 339.0852395209806
          }
        ]
      },
      "nuts": {
        "marcas": [
          {
            "MARCA": "ENJOY",
            "RECEITA": 191.6592696746228,
            "VOLUME_KG": 0.84843337168,
            "SHARE_VALOR": 76.85718768754904,
            "SHARE_VOLUME_KG": 78.60864299022523,
            "PRECO_KG": 225.8978442763448
          },
          {
            "MARCA": "KOBBER",
            "RECEITA": 30.99410177947023,
            "VOLUME_KG": 0.13714185765,
            "SHARE_VALOR": 12.428929222759908,
            "SHARE_VOLUME_KG": 12.706401806989728,
            "PRECO_KG": 226.00030589180392
          },
          {
            "MARCA": "PINATI NUTS",
            "RECEITA": 14.075171751821582,
            "VOLUME_KG": 0.03893174262,
            "SHARE_VALOR": 5.644277570820129,
            "SHARE_VOLUME_KG": 3.6070851981493997,
            "PRECO_KG": 361.5345937428162
          },
          {
            "MARCA": "TRIO",
            "RECEITA": 9.262303844171758,
            "VOLUME_KG": 0.031861671075,
            "SHARE_VALOR": 3.7142718230073353,
            "SHARE_VOLUME_KG": 2.9520323106188604,
            "PRECO_KG": 290.70364270502273
          },
          {
            "MARCA": "NUTRY",
            "RECEITA": 3.3798044676139103,
            "VOLUME_KG": 0.022944444450000004,
            "SHARE_VALOR": 1.3553336958635696,
            "SHARE_VOLUME_KG": 2.1258376940167945,
            "PRECO_KG": 147.30382663999998
          },
          {
            "MARCA": "Mercado Total",
            "RECEITA": 249.3706515177003,
            "VOLUME_KG": 1.0793130874749999,
            "SHARE_VALOR": 100.0,
            "SHARE_VOLUME_KG": 100.0,
            "PRECO_KG": 231.04570343077256
          }
        ]
      },
      "proteina": {
        "marcas": [
          {
            "MARCA": "NUTRATA",
            "RECEITA": 317.0678366693326,
            "VOLUME_KG": 1.71926367345,
            "SHARE_VALOR": 27.427320938783268,
            "SHARE_VOLUME_KG": 37.56288951614235,
            "PRECO_KG": 184.4207154293449
          },
          {
            "MARCA": "BOLD",
            "RECEITA": 295.38069482764223,
            "VOLUME_KG": 1.2063880250999999,
            "SHARE_VALOR": 25.55131798059836,
            "SHARE_VOLUME_KG": 26.357458021255827,
            "PRECO_KG": 244.84717079577902
          },
          {
            "MARCA": "INTEGRALMEDICA",
            "RECEITA": 211.07665690736846,
            "VOLUME_KG": 0.64635135219,
            "SHARE_VALOR": 18.258765292934513,
            "SHARE_VOLUME_KG": 14.121641029152043,
            "PRECO_KG": 326.56643510095245
          },
          {
            "MARCA": "MAIS MU",
            "RECEITA": 106.26892665134528,
            "VOLUME_KG": 0.42169555172,
            "SHARE_VALOR": 9.192581586653183,
            "SHARE_VOLUME_KG": 9.213306640115967,
            "PRECO_KG": 252.00390712659538
          },
          {
            "MARCA": "ENJOY",
            "RECEITA": 62.82697606841878,
            "VOLUME_KG": 0.06189285713999999,
            "SHARE_VALOR": 5.43472228007429,
            "SHARE_VOLUME_KG": 1.352250146670603,
            "PRECO_KG": 1015.0925158666668
          },
          {
            "MARCA": "Mercado Total",
            "RECEITA": 1156.02919212203,
            "VOLUME_KG": 4.577027208493,
            "SHARE_VALOR": 100.0,
            "SHARE_VOLUME_KG": 100.0,
            "PRECO_KG": 252.57206030519887
          }
        ]
      }
    },
    "sul": {
      "total": {
        "marcas": [
          {
            "MARCA": "RITTER",
            "RECEITA": 542.7866376645022,
            "VOLUME_KG": 4.148189677162,
            "SHARE_VALOR": 28.671072176664104,
            "SHARE_VOLUME_KG": 30.939292461966527,
            "PRECO_KG": 130.8490401615029
          },
          {
            "MARCA": "NUTRY",
            "RECEITA": 330.0560800827319,
            "VOLUME_KG": 2.1706808627250003,
            "SHARE_VALOR": 17.43422007423841,
            "SHARE_VOLUME_KG": 16.190033552031284,
            "PRECO_KG": 152.05186803388062
          },
          {
            "MARCA": "NUTRATA",
            "RECEITA": 191.50148544410223,
            "VOLUME_KG": 0.926917177105,
            "SHARE_VALOR": 10.11549019469409,
            "SHARE_VOLUME_KG": 6.913416179679685,
            "PRECO_KG": 206.60042792842665
          },
          {
            "MARCA": "INTEGRALMEDICA",
            "RECEITA": 144.73302143271894,
            "VOLUME_KG": 0.7137631573650001,
            "SHARE_VALOR": 7.64508669870585,
            "SHARE_VOLUME_KG": 5.323605908349101,
            "PRECO_KG": 202.77457576688315
          },
          {
            "MARCA": "ENJOY",
            "RECEITA": 116.26596240230899,
            "VOLUME_KG": 0.55305204048,
            "SHARE_VALOR": 6.141399895305349,
            "SHARE_VOLUME_KG": 4.124941277710486,
            "PRECO_KG": 210.22607981230928
          },
          {
            "MARCA": "Mercado Total",
            "RECEITA": 1893.1508187764457,
            "VOLUME_KG": 13.407513058875999,
            "SHARE_VALOR": 100.0,
            "SHARE_VOLUME_KG": 100.0,
            "PRECO_KG": 141.20074397564343
          }
        ]
      },
      "cereais": {
        "marcas": [
          {
            "MARCA": "RITTER",
            "RECEITA": 542.7866376645022,
            "VOLUME_KG": 4.148189677162,
            "SHARE_VALOR": 55.07450454064538,
            "SHARE_VOLUME_KG": 48.230818840162804,
            "PRECO_KG": 130.8490401615029
          },
          {
            "MARCA": "NUTRY",
            "RECEITA": 254.04527462974693,
            "VOLUME_KG": 1.735816147642,
            "SHARE_VALOR": 25.77701192374162,
            "SHARE_VOLUME_KG": 20.18225796608892,
            "PRECO_KG": 146.35494373920412
          },
          {
            "MARCA": "NATURALE",
            "RECEITA": 108.9149961597888,
            "VOLUME_KG": 1.9802292654109999,
            "SHARE_VALOR": 11.051192189175282,
            "SHARE_VOLUME_KG": 23.024038531277778,
            "PRECO_KG": 55.00120519488601
          },
          {
            "MARCA": "GRANOFIBRA",
            "RECEITA": 32.46106317263314,
            "VOLUME_KG": 0.38738399514,
            "SHARE_VALOR": 3.2937011470801707,
            "SHARE_VOLUME_KG": 4.5040966651164505,
            "PRECO_KG": 83.79557126747521
          },
          {
            "MARCA": "DIVINE",
            "RECEITA": 13.83528166521197,
            "VOLUME_KG": 0.12920815924,
            "SHARE_VALOR": 1.4038136350784682,
            "SHARE_VOLUME_KG": 1.5022975818306528,
            "PRECO_KG": 107.07746125779393
          },
          {
            "MARCA": "Mercado Total",
            "RECEITA": 985.5497424655393,
            "VOLUME_KG": 8.600703402754,
            "SHARE_VALOR": 100.0,
            "SHARE_VOLUME_KG": 100.0,
            "PRECO_KG": 114.58943487691484
          }
        ]
      },
      "frutas": {
        "marcas": [
          {
            "MARCA": "SUPINO",
            "RECEITA": 48.99496171170658,
            "VOLUME_KG": 0.464760368376,
            "SHARE_VALOR": 62.39379281101035,
            "SHARE_VOLUME_KG": 72.07936434619447,
            "PRECO_KG": 105.41983578098191
          },
          {
            "MARCA": "NUTRY",
            "RECEITA": 28.110466769462132,
            "VOLUME_KG": 0.16791428644300002,
            "SHARE_VALOR": 35.797938770825496,
            "SHARE_VOLUME_KG": 26.04171064272971,
            "PRECO_KG": 167.40961930600514
          },
          {
            "MARCA": "OLIVEIRA",
            "RECEITA": 1.419949612308339,
            "VOLUME_KG": 0.012115116277999998,
            "SHARE_VALOR": 1.8082684181641546,
            "SHARE_VOLUME_KG": 1.87892501107581,
            "PRECO_KG": 117.2047861304348
          },
          {
            "MARCA": "Mercado Total",
            "RECEITA": 78.52537809347704,
            "VOLUME_KG": 0.6447897710970001,
            "SHARE_VALOR": 100.0,
            "SHARE_VOLUME_KG": 100.0,
            "PRECO_KG": 121.78446621428171
          }
        ]
      },
      "nuts": {
        "marcas": [
          {
            "MARCA": "ENJOY",
            "RECEITA": 82.57741572545469,
            "VOLUME_KG": 0.5194920404700001,
            "SHARE_VALOR": 70.33866205849539,
            "SHARE_VOLUME_KG": 71.48350612035757,
            "PRECO_KG": 158.95799991611887
          },
          {
            "MARCA": "NUTS BAR",
            "RECEITA": 17.754523138597527,
            "VOLUME_KG": 0.09941613055000001,
            "SHARE_VALOR": 15.123134964740656,
            "SHARE_VOLUME_KG": 13.679927742884427,
            "PRECO_KG": 178.5879518783738
          },
          {
            "MARCA": "HARTS NATURAL",
            "RECEITA": 14.537019906131516,
            "VOLUME_KG": 0.084958754335,
            "SHARE_VALOR": 12.382496128415564,
            "SHARE_VOLUME_KG": 11.690553776318433,
            "PRECO_KG": 171.10679199474535
          },
          {
            "MARCA": "NATURALE",
            "RECEITA": 2.5307945216562904,
            "VOLUME_KG": 0.022863013709999998,
            "SHARE_VALOR": 2.1557068483483732,
            "SHARE_VOLUME_KG": 3.14601236043959,
            "PRECO_KG": 110.69382863333334
          },
          {
            "MARCA": "Mercado Total",
            "RECEITA": 117.39975329184003,
            "VOLUME_KG": 0.7267299390649999,
            "SHARE_VALOR": 100.0,
            "SHARE_VOLUME_KG": 100.0,
            "PRECO_KG": 161.54522743742308
          }
        ]
      },
      "proteina": {
        "marcas": [
          {
            "MARCA": "NUTRATA",
            "RECEITA": 191.50148544410223,
            "VOLUME_KG": 0.926917177105,
            "SHARE_VALOR": 26.908523016627328,
            "SHARE_VOLUME_KG": 26.98221086680271,
            "PRECO_KG": 206.60042792842665
          },
          {
            "MARCA": "INTEGRALMEDICA",
            "RECEITA": 144.73302143271894,
            "VOLUME_KG": 0.7137631573650001,
            "SHARE_VALOR": 20.336927567202203,
            "SHARE_VOLUME_KG": 20.777377414806168,
            "PRECO_KG": 202.77457576688315
          },
          {
            "MARCA": "WHEY GREGO",
            "RECEITA": 100.73910000579049,
            "VOLUME_KG": 0.6226666666799999,
            "SHARE_VALOR": 14.155192503566138,
            "SHARE_VOLUME_KG": 18.12559278765607,
            "PRECO_KG": 161.78656317500003
          },
          {
            "MARCA": "BOLD",
            "RECEITA": 53.300796820303844,
            "VOLUME_KG": 0.21451181351999998,
            "SHARE_VALOR": 7.489475680659238,
            "SHARE_VOLUME_KG": 6.244358318932353,
            "PRECO_KG": 248.47487858907292
          },
          {
            "MARCA": "NUTRY",
            "RECEITA": 47.900338683522875,
            "VOLUME_KG": 0.26695042864,
            "SHARE_VALOR": 6.730638997294084,
            "SHARE_VOLUME_KG": 7.7708267086433676,
            "PRECO_KG": 179.43533159903478
          },
          {
            "MARCA": "Mercado Total",
            "RECEITA": 711.6759449255893,
            "VOLUME_KG": 3.43528994596,
            "SHARE_VALOR": 100.0,
            "SHARE_VOLUME_KG": 100.0,
            "PRECO_KG": 207.1661944467135
          }
        ]
      }
    },
    "ne_no_co": {
      "total": {
        "marcas": [
          {
            "MARCA": "NUTRY",
            "RECEITA": 1905.1450809991773,
            "VOLUME_KG": 9.757123014777,
            "SHARE_VALOR": 29.340744203754443,
            "SHARE_VOLUME_KG": 28.76906537643558,
            "PRECO_KG": 195.25684754756776
          },
          {
            "MARCA": "NUTRATA",
            "RECEITA": 679.147174608665,
            "VOLUME_KG": 3.248808041485,
            "SHARE_VALOR": 10.459404759056246,
            "SHARE_VOLUME_KG": 9.579173163997233,
            "PRECO_KG": 209.04503003453326
          },
          {
            "MARCA": "ENJOY",
            "RECEITA": 656.4884733529071,
            "VOLUME_KG": 2.109681165415,
            "SHARE_VALOR": 10.110442801163883,
            "SHARE_VOLUME_KG": 6.220435601697302,
            "PRECO_KG": 311.1789990426197
          },
          {
            "MARCA": "BOLD",
            "RECEITA": 548.4845946966186,
            "VOLUME_KG": 2.04385595015,
            "SHARE_VALOR": 8.447097469476326,
            "SHARE_VOLUME_KG": 6.026348685040752,
            "PRECO_KG": 268.35775518150626
          },
          {
            "MARCA": "INTEGRALMEDICA",
            "RECEITA": 475.2365592397958,
            "VOLUME_KG": 1.9360447191599999,
            "SHARE_VALOR": 7.319019669417641,
            "SHARE_VOLUME_KG": 5.708465191313353,
            "PRECO_KG": 245.46775936352788
          },
          {
            "MARCA": "Mercado Total",
            "RECEITA": 6493.1723195875675,
            "VOLUME_KG": 33.915328451264,
            "SHARE_VALOR": 100.0,
            "SHARE_VOLUME_KG": 100.0,
            "PRECO_KG": 191.4524380596282
          }
        ]
      },
      "cereais": {
        "marcas": [
          {
            "MARCA": "NUTRY",
            "RECEITA": 1447.1502268371605,
            "VOLUME_KG": 7.247328513928,
            "SHARE_VALOR": 59.872969963117264,
            "SHARE_VOLUME_KG": 49.15660978570419,
            "PRECO_KG": 199.68050627979818
          },
          {
            "MARCA": "TRIO",
            "RECEITA": 340.75663877843914,
            "VOLUME_KG": 1.743280849812,
            "SHARE_VALOR": 14.098129979846258,
            "SHARE_VOLUME_KG": 11.824188225552627,
            "PRECO_KG": 195.46858374265238
          },
          {
            "MARCA": "RITTER",
            "RECEITA": 198.37437493544516,
            "VOLUME_KG": 1.009775636623,
            "SHARE_VALOR": 8.207346253139585,
            "SHARE_VOLUME_KG": 6.849026761405199,
            "PRECO_KG": 196.45391287006095
          },
          {
            "MARCA": "NATURALE",
            "RECEITA": 100.76470655315167,
            "VOLUME_KG": 2.285138948099,
            "SHARE_VALOR": 4.168939849448017,
            "SHARE_VOLUME_KG": 15.499460713273946,
            "PRECO_KG": 44.09565844430489
          },
          {
            "MARCA": "LINEA",
            "RECEITA": 94.71973678845475,
            "VOLUME_KG": 0.27732870394,
            "SHARE_VALOR": 3.9188412166746436,
            "SHARE_VOLUME_KG": 1.8810433190319016,
            "PRECO_KG": 341.543213676675
          },
          {
            "MARCA": "Mercado Total",
            "RECEITA": 2417.0343106891623,
            "VOLUME_KG": 14.743344883877,
            "SHARE_VALOR": 100.0,
            "SHARE_VOLUME_KG": 100.0,
            "PRECO_KG": 163.9407020405782
          }
        ]
      },
      "frutas": {
        "marcas": [
          {
            "MARCA": "SUPINO",
            "RECEITA": 189.86003364926543,
            "VOLUME_KG": 1.3711422144,
            "SHARE_VALOR": 54.90978514343359,
            "SHARE_VOLUME_KG": 62.83178983313831,
            "PRECO_KG": 138.468520373247
          },
          {
            "MARCA": "NUTRY",
            "RECEITA": 143.61893162775164,
            "VOLUME_KG": 0.722222337839,
            "SHARE_VALOR": 41.53630717656745,
            "SHARE_VOLUME_KG": 33.095416119002,
            "PRECO_KG": 198.85695041984093
          },
          {
            "MARCA": "BANANA BRASIL",
            "RECEITA": 7.757454977863402,
            "VOLUME_KG": 0.058250343074,
            "SHARE_VALOR": 2.2435484599208952,
            "SHARE_VOLUME_KG": 2.6692878939150333,
            "PRECO_KG": 133.17440839805005
          },
          {
            "MARCA": "OLIVEIRA",
            "RECEITA": 4.53079255303547,
            "VOLUME_KG": 0.030627912096,
            "SHARE_VALOR": 1.3103592200780647,
            "SHARE_VOLUME_KG": 1.4035061539446585,
            "PRECO_KG": 147.93018011917275
          },
          {
            "MARCA": "Mercado Total",
            "RECEITA": 345.76721280791594,
            "VOLUME_KG": 2.182242807409,
            "SHARE_VALOR": 100.0,
            "SHARE_VOLUME_KG": 100.0,
            "PRECO_KG": 158.44580247165484
          }
        ]
      },
      "nuts": {
        "marcas": [
          {
            "MARCA": "ENJOY",
            "RECEITA": 518.5343474138169,
            "VOLUME_KG": 1.968725609845,
            "SHARE_VALOR": 67.39419844421903,
            "SHARE_VOLUME_KG": 56.551481853860444,
            "PRECO_KG": 263.38578866490275
          },
          {
            "MARCA": "NUTRY",
            "RECEITA": 104.68493641884851,
            "VOLUME_KG": 0.83458613015,
            "SHARE_VALOR": 13.605959594229061,
            "SHARE_VOLUME_KG": 23.973418214627287,
            "PRECO_KG": 125.43335269666355
          },
          {
            "MARCA": "NUTS BAR",
            "RECEITA": 46.93199031429127,
            "VOLUME_KG": 0.251702285825,
            "SHARE_VALOR": 6.099776966364236,
            "SHARE_VOLUME_KG": 7.230127539473798,
            "PRECO_KG": 186.45833970264968
          },
          {
            "MARCA": "TRIO",
            "RECEITA": 41.06843360979916,
            "VOLUME_KG": 0.10196799945,
            "SHARE_VALOR": 5.337687229970927,
            "SHARE_VOLUME_KG": 2.929022430416357,
            "PRECO_KG": 402.7580596982984
          },
          {
            "MARCA": "KODILAR",
            "RECEITA": 34.8205195881588,
            "VOLUME_KG": 0.17566507625,
            "SHARE_VALOR": 4.525642358619693,
            "SHARE_VOLUME_KG": 5.045964923822478,
            "PRECO_KG": 198.22107120827783
          },
          {
            "MARCA": "Mercado Total",
            "RECEITA": 769.4050220702582,
            "VOLUME_KG": 3.481298005475,
            "SHARE_VALOR": 100.0,
            "SHARE_VOLUME_KG": 100.0,
            "PRECO_KG": 221.0109622503512
          }
        ]
      },
      "proteina": {
        "marcas": [
          {
            "MARCA": "NUTRATA",
            "RECEITA": 679.147174608665,
            "VOLUME_KG": 3.248808041485,
            "SHARE_VALOR": 22.93667763969313,
            "SHARE_VOLUME_KG": 24.050204013353195,
            "PRECO_KG": 209.04503003453326
          },
          {
            "MARCA": "BOLD",
            "RECEITA": 548.4845946966186,
            "VOLUME_KG": 2.04385595015,
            "SHARE_VALOR": 18.523841089588732,
            "SHARE_VOLUME_KG": 15.130211433650903,
            "PRECO_KG": 268.35775518150626
          },
          {
            "MARCA": "INTEGRALMEDICA",
            "RECEITA": 475.2365592397958,
            "VOLUME_KG": 1.9360447191599999,
            "SHARE_VALOR": 16.050052432539488,
            "SHARE_VOLUME_KG": 14.332108847369728,
            "PRECO_KG": 245.46775936352788
          },
          {
            "MARCA": "PROTEIN MAIS",
            "RECEITA": 312.60931052826965,
            "VOLUME_KG": 1.891570199,
            "SHARE_VALOR": 10.557680648359081,
            "SHARE_VOLUME_KG": 14.00287385731009,
            "PRECO_KG": 165.2644510330804
          },
          {
            "MARCA": "NUTRY",
            "RECEITA": 209.6909861154166,
            "VOLUME_KG": 0.95298603286,
            "SHARE_VALOR": 7.0818443075317985,
            "SHARE_VOLUME_KG": 7.054743838199447,
            "PRECO_KG": 220.03573912422868
          },
          {
            "MARCA": "Mercado Total",
            "RECEITA": 2960.965774020231,
            "VOLUME_KG": 13.508442754503001,
            "SHARE_VALOR": 100.0,
            "SHARE_VOLUME_KG": 100.0,
            "PRECO_KG": 219.19371668752873
          }
        ]
      }
    }
  }
};

// Função para obter dados do mercado total (COM SUPORTE A FILTROS)
export const getScanntechMercadoTotal = (categoria, periodo) => {
  const catMap = {
    'total': 'total',
    'cereais': 'cereais',
    'frutas': 'frutas',
    'nuts': 'nuts',
    'proteina': 'proteina'
  };
  
  const catKey = catMap[categoria] || 'total';
  const periodoKey = 'ago25';
  const periodoAnterior = 'ago24';
  
  const atual = mercado_por_categoria[periodoKey]?.brasil?.[catKey] || { receita: 0, volume_kg: 0, preco_kg: 0 };
  const anterior = mercado_por_categoria[periodoAnterior]?.brasil?.[catKey] || { receita: 0, volume_kg: 0, preco_kg: 0 };
  
  return {
    valor: {
      atual: atual.receita || 0,
      anterior: anterior.receita || 0
    },
    volume: {
      atual: atual.volume_kg || 0,
      anterior: anterior.volume_kg || 0
    },
    preco: {
      atual: atual.preco_kg || 0,
      anterior: anterior.preco_kg || 0
    }
  };
};

// Função para obter shares por categoria (COM SUPORTE A FILTROS)
export const getScanntechShareNutrimental = (categoria, periodo) => {
  const periodoKey = 'ago25';
  const periodoAnterior = 'ago24';
  
  const dados_atual = mercado_por_categoria[periodoKey]?.brasil || {};
  const dados_anterior = mercado_por_categoria[periodoAnterior]?.brasil || {};
  
  const categorias_info = [
    { id: 'cereais', nome: 'Cereais', icon: '🌾' },
    { id: 'frutas', nome: 'Frutas', icon: '🍎' },
    { id: 'nuts', nome: 'Nuts', icon: '🥜' },
    { id: 'proteina', nome: 'Proteína', icon: '🥩' }
  ];
  
  const resultado = categorias_info.map(cat => {
    const atual = dados_atual[cat.id] || {};
    const anterior = dados_anterior[cat.id] || {};
    
    const share_atual = atual.share_valor || 0;
    const share_anterior = anterior.share_valor || 0;
    const delta = share_atual - share_anterior;
    const trend = delta > 0 ? `+${delta.toFixed(1)}%` : `${delta.toFixed(1)}%`;
    
    return {
      categoria: cat.nome,
      icon: cat.icon,
      share: share_atual,
      trend: trend
    };
  });
  
  return { categorias: resultado };
};

// Função para obter marcas por região (COM SUPORTE A FILTROS DE CATEGORIA)
export const getScanntechMarcasRegiaoComparativo = (categoria, periodo) => {
  const catMap = {
    'total': 'total',
    'cereais': 'cereais',
    'frutas': 'frutas',
    'nuts': 'nuts',
    'proteina': 'proteina'
  };
  
  // Mapear período para chaves de dados e fatores de simulação
  const periodoMap = {
    'mes_yoy': { atual: 'ago25', anterior: 'ago24', fatorAtual: 1.0, fatorAnterior: 1.0 },
    'trimestre_yoy': { atual: 'ago25', anterior: 'ago24', fatorAtual: 2.95, fatorAnterior: 2.85 }, // Simula Jun+Jul+Ago
    'ytd_yoy': { atual: 'ago25', anterior: 'ago24', fatorAtual: 7.8, fatorAnterior: 7.5 } // Simula Jan-Ago
  };
  
  const periodos = periodoMap[periodo] || periodoMap['mes_yoy'];
  const catKey = catMap[categoria] || 'total';
  const regioes = ['brasil', 'sul', 'ne_no_co'];
  const resultado = {};
  
  regioes.forEach(regiao => {
    const marcas2024 = marcas_por_categoria[periodos.anterior]?.[regiao]?.[catKey]?.marcas || [];
    const marcas2025 = marcas_por_categoria[periodos.atual]?.[regiao]?.[catKey]?.marcas || [];
    
    const map2024 = {};
    marcas2024.forEach(m => {
      map2024[m.MARCA] = m;
    });
    
    resultado[regiao] = marcas2025.map(m2025 => {
      const m2024 = map2024[m2025.MARCA];
      
      return {
        marca: m2025.MARCA,
        receita: m2025.RECEITA * periodos.fatorAtual,
        receitaAnterior: (m2024 ? m2024.RECEITA : m2025.RECEITA) * periodos.fatorAnterior,
        volumeKG: m2025.VOLUME_KG * periodos.fatorAtual,
        volumeKGAnterior: (m2024 ? m2024.VOLUME_KG : m2025.VOLUME_KG) * periodos.fatorAnterior,
        shareValor: m2025.SHARE_VALOR,
        shareValorAnterior: m2024 ? m2024.SHARE_VALOR : m2025.SHARE_VALOR,
        shareVolumeKG: m2025.SHARE_VOLUME_KG,
        shareVolumeKGAnterior: m2024 ? m2024.SHARE_VOLUME_KG : m2025.SHARE_VOLUME_KG,
        precoKG: m2025.PRECO_KG,
        precoKGAnterior: m2024 ? m2024.PRECO_KG : m2025.PRECO_KG
      };
    });
  });
  
  return resultado;
};
