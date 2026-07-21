const { chromium, devices } = require('playwright');
const path = require('path');
const fs = require('fs');

const URL = "https://ysyglobaloffers.netlify.app/";
const COOKIE_DIR = path.join(__dirname, 'sessions');

// Ensure cookie directory exists
if (!fs.existsSync(COOKIE_DIR)) fs.mkdirSync(COOKIE_DIR);

// ---------------------------------------------------------
// 🌐 NEW PROXY DATABASE (100 US, 50 CA)
// ---------------------------------------------------------
const US_PROXIES = [
  "residential.byteful.com:8822:116122_oCXjo_c_us_s_T70B5VIJ2M9ZUBO3:Pq3UgOBrII",
  "residential.byteful.com:8556:116122_oCXjo_c_us_s_11T46H0DY6UR8W06:Pq3UgOBrII",
  "residential.byteful.com:8646:116122_oCXjo_c_us_s_NKKR6NPR5BK755OX:Pq3UgOBrII",
  "residential.byteful.com:8017:116122_oCXjo_c_us_s_9CB1OMXB1SN5J9EN:Pq3UgOBrII",
  "residential.byteful.com:8135:116122_oCXjo_c_us_s_AO325I1PVSAA0ZLN:Pq3UgOBrII",
  "residential.byteful.com:8859:116122_oCXjo_c_us_s_0W0G633RN1T8JEYG:Pq3UgOBrII",
  "residential.byteful.com:8468:116122_oCXjo_c_us_s_BTEQMUZNNKZFLXOD:Pq3UgOBrII",
  "residential.byteful.com:8965:116122_oCXjo_c_us_s_KFPTKRN4SG68SE1R:Pq3UgOBrII",
  "residential.byteful.com:8177:116122_oCXjo_c_us_s_9W238WWS8UYIIV1C:Pq3UgOBrII",
  "residential.byteful.com:8587:116122_oCXjo_c_us_s_5EW9MTLHUZCQRI66:Pq3UgOBrII",
  "residential.byteful.com:8728:116122_oCXjo_c_us_s_SZR1NL4AH2EUP3CF:Pq3UgOBrII",
  "residential.byteful.com:8591:116122_oCXjo_c_us_s_U3LJS0CIUT4H3RSD:Pq3UgOBrII",
  "residential.byteful.com:8747:116122_oCXjo_c_us_s_OGXCCPDTGXQXVNKB:Pq3UgOBrII",
  "residential.byteful.com:8750:116122_oCXjo_c_us_s_SG3SDSN7XM0H6FPS:Pq3UgOBrII",
  "residential.byteful.com:8787:116122_oCXjo_c_us_s_SXRWAKWMOBK0T8NM:Pq3UgOBrII",
  "residential.byteful.com:8422:116122_oCXjo_c_us_s_CAO4HR4GGRDU7JKV:Pq3UgOBrII",
  "residential.byteful.com:8939:116122_oCXjo_c_us_s_H3FOXX57IY9FPPYV:Pq3UgOBrII",
  "residential.byteful.com:8277:116122_oCXjo_c_us_s_R1QGBHFJVD0ZHGYK:Pq3UgOBrII",
  "residential.byteful.com:8897:116122_oCXjo_c_us_s_T3GEAOJ3Z08J08KD:Pq3UgOBrII",
  "residential.byteful.com:8782:116122_oCXjo_c_us_s_PCA37SJVUP6YOCMD:Pq3UgOBrII",
  "residential.byteful.com:8654:116122_oCXjo_c_us_s_GN64ZC3XQL737WE7:Pq3UgOBrII",
  "residential.byteful.com:8107:116122_oCXjo_c_us_s_62ID7KJHIXM9K62D:Pq3UgOBrII",
  "residential.byteful.com:8524:116122_oCXjo_c_us_s_7ITZ7PV4OSGFUANE:Pq3UgOBrII",
  "residential.byteful.com:8810:116122_oCXjo_c_us_s_LZA5EFNCE5ZENYHN:Pq3UgOBrII",
  "residential.byteful.com:8295:116122_oCXjo_c_us_s_QVUBWV08EA1BW2O2:Pq3UgOBrII",
  "residential.byteful.com:8472:116122_oCXjo_c_us_s_DBAIGZDDZBUJN862:Pq3UgOBrII",
  "residential.byteful.com:8537:116122_oCXjo_c_us_s_9VW1B7BPMTK1RU9V:Pq3UgOBrII",
  "residential.byteful.com:8219:116122_oCXjo_c_us_s_HESFVFNRUU39RP5D:Pq3UgOBrII",
  "residential.byteful.com:8802:116122_oCXjo_c_us_s_C817PS8XRIQIPTQZ:Pq3UgOBrII",
  "residential.byteful.com:8844:116122_oCXjo_c_us_s_LPFOW1GCZ5RMHKM8:Pq3UgOBrII",
  "residential.byteful.com:8112:116122_oCXjo_c_us_s_SH5OHXEVMTSVENIT:Pq3UgOBrII",
  "residential.byteful.com:8611:116122_oCXjo_c_us_s_ZX6HG41M90QUFOBZ:Pq3UgOBrII",
  "residential.byteful.com:8146:116122_oCXjo_c_us_s_UVL8QDE060AQBUU2:Pq3UgOBrII",
  "residential.byteful.com:8273:116122_oCXjo_c_us_s_QZMLV7XPCA2I3Z1H:Pq3UgOBrII",
  "residential.byteful.com:8564:116122_oCXjo_c_us_s_877J0T62T6588BGC:Pq3UgOBrII",
  "residential.byteful.com:8809:116122_oCXjo_c_us_s_AZBZPO1A2ZSPC9EZ:Pq3UgOBrII",
  "residential.byteful.com:8139:116122_oCXjo_c_us_s_ZT470FKISBER9JFU:Pq3UgOBrII",
  "residential.byteful.com:8660:116122_oCXjo_c_us_s_KELQMC98S6X3OG6T:Pq3UgOBrII",
  "residential.byteful.com:8169:116122_oCXjo_c_us_s_43PITNZCSTSMTEMW:Pq3UgOBrII",
  "residential.byteful.com:8917:116122_oCXjo_c_us_s_CLB4MNECEA1LY97L:Pq3UgOBrII",
  "residential.byteful.com:8913:116122_oCXjo_c_us_s_GJIMYTO7DE2A2OGP:Pq3UgOBrII",
  "residential.byteful.com:8089:116122_oCXjo_c_us_s_W8AKDU8XJRQSMVNV:Pq3UgOBrII",
  "residential.byteful.com:8316:116122_oCXjo_c_us_s_KUBNNIFWKFJB5V66:Pq3UgOBrII",
  "residential.byteful.com:8720:116122_oCXjo_c_us_s_2PPQ1W0BJA0W4W6P:Pq3UgOBrII",
  "residential.byteful.com:8752:116122_oCXjo_c_us_s_25ZQLVPBUZBMCFWQ:Pq3UgOBrII",
  "residential.byteful.com:8219:116122_oCXjo_c_us_s_27701SZJ5ASWQ2WB:Pq3UgOBrII",
  "residential.byteful.com:8992:116122_oCXjo_c_us_s_WWF9KPDIB06T5VIA:Pq3UgOBrII",
  "residential.byteful.com:8545:116122_oCXjo_c_us_s_VMBO6SJ0N9UIQZY1:Pq3UgOBrII",
  "residential.byteful.com:8163:116122_oCXjo_c_us_s_DFIXJGHLIMJJ4C9Q:Pq3UgOBrII",
  "residential.byteful.com:8752:116122_oCXjo_c_us_s_G0ETFAJGMK1XV9GW:Pq3UgOBrII",
  "residential.byteful.com:8970:116122_oCXjo_c_us_s_QCJREZBEVK9WNH3W:Pq3UgOBrII",
  "residential.byteful.com:8380:116122_oCXjo_c_us_s_EKFH2TGOJZ8LSX82:Pq3UgOBrII",
  "residential.byteful.com:8554:116122_oCXjo_c_us_s_CQNEZ4DUMOH7RLAQ:Pq3UgOBrII",
  "residential.byteful.com:8936:116122_oCXjo_c_us_s_81H3WCPZP2Q6SF5U:Pq3UgOBrII",
  "residential.byteful.com:8911:116122_oCXjo_c_us_s_FNEXMYE69YUG9P6S:Pq3UgOBrII",
  "residential.byteful.com:8576:116122_oCXjo_c_us_s_DHBHDF43NBVSX266:Pq3UgOBrII",
  "residential.byteful.com:8061:116122_oCXjo_c_us_s_CSV1O6PJLT4EUA5K:Pq3UgOBrII",
  "residential.byteful.com:8137:116122_oCXjo_c_us_s_CD9S4UPYM183TX3T:Pq3UgOBrII",
  "residential.byteful.com:8685:116122_oCXjo_c_us_s_POYZNKWKQ5Y5ZP4J:Pq3UgOBrII",
  "residential.byteful.com:8733:116122_oCXjo_c_us_s_V54G82FGPXDFA2ZZ:Pq3UgOBrII",
  "residential.byteful.com:8942:116122_oCXjo_c_us_s_Z3LEO78689F1LH4P:Pq3UgOBrII",
  "residential.byteful.com:8467:116122_oCXjo_c_us_s_JCASQ7WSYNLVDDTP:Pq3UgOBrII",
  "residential.byteful.com:8713:116122_oCXjo_c_us_s_XNDGXJLMDEU58A2D:Pq3UgOBrII",
  "residential.byteful.com:8878:116122_oCXjo_c_us_s_7XF8NF2HGLHM9M47:Pq3UgOBrII",
  "residential.byteful.com:8643:116122_oCXjo_c_us_s_HBJI17NL4M6DRX1K:Pq3UgOBrII",
  "residential.byteful.com:8735:116122_oCXjo_c_us_s_ZDS3AA1M4LN7WC3J:Pq3UgOBrII",
  "residential.byteful.com:8909:116122_oCXjo_c_us_s_RZLT30GJW9ZUPVAB:Pq3UgOBrII",
  "residential.byteful.com:8195:116122_oCXjo_c_us_s_B7E5TYTZQNFPO3CB:Pq3UgOBrII",
  "residential.byteful.com:8170:116122_oCXjo_c_us_s_4ARB45G4VFLDESHN:Pq3UgOBrII",
  "residential.byteful.com:8757:116122_oCXjo_c_us_s_USYIY93U41TMHXBH:Pq3UgOBrII",
  "residential.byteful.com:8060:116122_oCXjo_c_us_s_GBWAMDQOZL0Q3DSP:Pq3UgOBrII",
  "residential.byteful.com:8549:116122_oCXjo_c_us_s_759YLBACEG8WLSVV:Pq3UgOBrII",
  "residential.byteful.com:8695:116122_oCXjo_c_us_s_9LPJBIFTC3WKV5VR:Pq3UgOBrII",
  "residential.byteful.com:8683:116122_oCXjo_c_us_s_F2V6N7TLMXLV8PUW:Pq3UgOBrII",
  "residential.byteful.com:8733:116122_oCXjo_c_us_s_9GY13YL08JQCY5JP:Pq3UgOBrII",
  "residential.byteful.com:8272:116122_oCXjo_c_us_s_DJ67XIG6JFCTJ8PB:Pq3UgOBrII",
  "residential.byteful.com:8943:116122_oCXjo_c_us_s_6TB24IM6DFMLRGPG:Pq3UgOBrII",
  "residential.byteful.com:8819:116122_oCXjo_c_us_s_M9Q8WA0DX628XIQA:Pq3UgOBrII",
  "residential.byteful.com:8238:116122_oCXjo_c_us_s_YPU2KP4HA5MP044Z:Pq3UgOBrII",
  "residential.byteful.com:8544:116122_oCXjo_c_us_s_IPQGDUZNUFF49WV3:Pq3UgOBrII",
  "residential.byteful.com:8581:116122_oCXjo_c_us_s_ARL1YGSXLL96JSYA:Pq3UgOBrII",
  "residential.byteful.com:8137:116122_oCXjo_c_us_s_2BPU669OG89EFICA:Pq3UgOBrII",
  "residential.byteful.com:8674:116122_oCXjo_c_us_s_BK18SDRTS93MGF85:Pq3UgOBrII",
  "residential.byteful.com:8838:116122_oCXjo_c_us_s_Q033QAAP11HFL3MO:Pq3UgOBrII",
  "residential.byteful.com:8191:116122_oCXjo_c_us_s_494GNT794GNDX2CK:Pq3UgOBrII",
  "residential.byteful.com:8383:116122_oCXjo_c_us_s_M5C7WG7BY2FEP16H:Pq3UgOBrII",
  "residential.byteful.com:8668:116122_oCXjo_c_us_s_2LQS09LW8ZTS8RF4:Pq3UgOBrII",
  "residential.byteful.com:8707:116122_oCXjo_c_us_s_06YSY6YMPFXEPO0T:Pq3UgOBrII",
  "residential.byteful.com:8537:116122_oCXjo_c_us_s_FAC194WOGK0YCO05:Pq3UgOBrII",
  "residential.byteful.com:8411:116122_oCXjo_c_us_s_2KEUDKFU7GKYEHUX:Pq3UgOBrII",
  "residential.byteful.com:8204:116122_oCXjo_c_us_s_LUCJ7RJLTJUDAP2Y:Pq3UgOBrII",
  "residential.byteful.com:8985:116122_oCXjo_c_us_s_HR02GQNC8SAMH1J4:Pq3UgOBrII",
  "residential.byteful.com:8145:116122_oCXjo_c_us_s_5YRC7H4HHOQ1S1YB:Pq3UgOBrII",
  "residential.byteful.com:8711:116122_oCXjo_c_us_s_KMC2FC1GA33MOZSU:Pq3UgOBrII",
  "residential.byteful.com:8405:116122_oCXjo_c_us_s_YS8P01YD7LQWM5EK:Pq3UgOBrII",
  "residential.byteful.com:8408:116122_oCXjo_c_us_s_PIHI2TMZDPOA61B0:Pq3UgOBrII",
  "residential.byteful.com:8550:116122_oCXjo_c_us_s_RQZ1DH46VZGQ781M:Pq3UgOBrII",
  "residential.byteful.com:8443:116122_oCXjo_c_us_s_93W993HCT5FQNVHL:Pq3UgOBrII",
  "residential.byteful.com:8692:116122_oCXjo_c_us_s_UZBF03YZCHTEGW6G:Pq3UgOBrII",
  "residential.byteful.com:8636:116122_oCXjo_c_us_s_ZWQ9RD263A9EHRMN:Pq3UgOBrII"
];

const CA_PROXIES = [
  "residential.byteful.com:8169:116122_oCXjo_c_ca_s_UIPZ2QAO57K3ZNVL:Pq3UgOBrII",
  "residential.byteful.com:8669:116122_oCXjo_c_ca_s_RA9NXCO4YQXM7Y6X:Pq3UgOBrII",
  "residential.byteful.com:8527:116122_oCXjo_c_ca_s_T0RU1M59ZH3XMDW9:Pq3UgOBrII",
  "residential.byteful.com:8891:116122_oCXjo_c_ca_s_9PG9OCGN9O3KYGQ3:Pq3UgOBrII",
  "residential.byteful.com:8902:116122_oCXjo_c_ca_s_34ES64SW0IJ8GOKU:Pq3UgOBrII",
  "residential.byteful.com:8214:116122_oCXjo_c_ca_s_XWSLMAZW8T378K2J:Pq3UgOBrII",
  "residential.byteful.com:8994:116122_oCXjo_c_ca_s_4IAB4P08I8B42Q81:Pq3UgOBrII",
  "residential.byteful.com:8519:116122_oCXjo_c_ca_s_0L5YJZTWY533VTYJ:Pq3UgOBrII",
  "residential.byteful.com:8077:116122_oCXjo_c_ca_s_MLGA5ZRV09JII6LJ:Pq3UgOBrII",
  "residential.byteful.com:8159:116122_oCXjo_c_ca_s_GDYT3J3UYLWVJ1TR:Pq3UgOBrII",
  "residential.byteful.com:8079:116122_oCXjo_c_ca_s_KTL9C168CEPA7CXY:Pq3UgOBrII",
  "residential.byteful.com:8058:116122_oCXjo_c_ca_s_ZDYX9NI43XDXV9MV:Pq3UgOBrII",
  "residential.byteful.com:8876:116122_oCXjo_c_ca_s_AQUZMMFVBB8IX8PI:Pq3UgOBrII",
  "residential.byteful.com:8962:116122_oCXjo_c_ca_s_7HFG6U42UA7AMXO7:Pq3UgOBrII",
  "residential.byteful.com:8524:116122_oCXjo_c_ca_s_VUJYFSW4Q7A6VRIL:Pq3UgOBrII",
  "residential.byteful.com:8095:116122_oCXjo_c_ca_s_JV8F38WPB8GBM23F:Pq3UgOBrII",
  "residential.byteful.com:8923:116122_oCXjo_c_ca_s_QGVEU7DMTCDCBU6E:Pq3UgOBrII",
  "residential.byteful.com:8911:116122_oCXjo_c_ca_s_AM03BQUBQ86S3ECI:Pq3UgOBrII",
  "residential.byteful.com:8194:116122_oCXjo_c_ca_s_8EGACWM2WN90IOBX:Pq3UgOBrII",
  "residential.byteful.com:8010:116122_oCXjo_c_ca_s_A4AQLQMOMWRJPPGZ:Pq3UgOBrII",
  "residential.byteful.com:8066:116122_oCXjo_c_ca_s_X403I7KC04IO1SNW:Pq3UgOBrII",
  "residential.byteful.com:8425:116122_oCXjo_c_ca_s_QEDOHNZPC225Q0OB:Pq3UgOBrII",
  "residential.byteful.com:8625:116122_oCXjo_c_ca_s_WONMCER15J17VLSZ:Pq3UgOBrII",
  "residential.byteful.com:8319:116122_oCXjo_c_ca_s_X3Y1N27XQT5OO5SZ:Pq3UgOBrII",
  "residential.byteful.com:8803:116122_oCXjo_c_ca_s_S2IZF2HDWU03EILS:Pq3UgOBrII",
  "residential.byteful.com:8987:116122_oCXjo_c_ca_s_WLFQXS0KOIWWDPYC:Pq3UgOBrII",
  "residential.byteful.com:8092:116122_oCXjo_c_ca_s_YRNLHA41FVK3N2SA:Pq3UgOBrII",
  "residential.byteful.com:8705:116122_oCXjo_c_ca_s_SA0TRV53YG34J46D:Pq3UgOBrII",
  "residential.byteful.com:8756:116122_oCXjo_c_ca_s_3WBZZ7XQ2LS9BTSJ:Pq3UgOBrII",
  "residential.byteful.com:8160:116122_oCXjo_c_ca_s_GOHO4MHPIVHNPE0B:Pq3UgOBrII",
  "residential.byteful.com:8400:116122_oCXjo_c_ca_s_32I0GYAUWXTM3X7U:Pq3UgOBrII",
  "residential.byteful.com:8683:116122_oCXjo_c_ca_s_LXYJJQY90B67XUXB:Pq3UgOBrII",
  "residential.byteful.com:8275:116122_oCXjo_c_ca_s_REVGDQQ6Z1F3WNMN:Pq3UgOBrII",
  "residential.byteful.com:8690:116122_oCXjo_c_ca_s_LV6DPD01S05Y5P1A:Pq3UgOBrII",
  "residential.byteful.com:8425:116122_oCXjo_c_ca_s_FEBSTI37M43DE6LG:Pq3UgOBrII",
  "residential.byteful.com:8802:116122_oCXjo_c_ca_s_QT5NA7X6BURBZ009:Pq3UgOBrII",
  "residential.byteful.com:8071:116122_oCXjo_c_ca_s_19RR2P1AF3C3VY2I:Pq3UgOBrII",
  "residential.byteful.com:8735:116122_oCXjo_c_ca_s_UA8063WA0NYQRWV8:Pq3UgOBrII",
  "residential.byteful.com:8194:116122_oCXjo_c_ca_s_7B4NVLHQN2S5T8SE:Pq3UgOBrII",
  "residential.byteful.com:8705:116122_oCXjo_c_ca_s_RGMXRPCDEXGZ1A4W:Pq3UgOBrII",
  "residential.byteful.com:8049:116122_oCXjo_c_ca_s_7C5ZNTU913SOM92K:Pq3UgOBrII",
  "residential.byteful.com:8590:116122_oCXjo_c_ca_s_UBA3T3DHWJ6P95KT:Pq3UgOBrII",
  "residential.byteful.com:8375:116122_oCXjo_c_ca_s_LWG92PBK4ZPDFYCA:Pq3UgOBrII",
  "residential.byteful.com:8269:116122_oCXjo_c_ca_s_0HA0UQNUKYELUMXO:Pq3UgOBrII",
  "residential.byteful.com:8816:116122_oCXjo_c_ca_s_736J1JQJ0WG56RGO:Pq3UgOBrII",
  "residential.byteful.com:8536:116122_oCXjo_c_ca_s_MA3ECDUCBAR2IM59:Pq3UgOBrII",
  "residential.byteful.com:8469:116122_oCXjo_c_ca_s_2SW7GLM88PQ1XNBC:Pq3UgOBrII",
  "residential.byteful.com:8617:116122_oCXjo_c_ca_s_TBC33V110ALVNV05:Pq3UgOBrII",
  "residential.byteful.com:8947:116122_oCXjo_c_ca_s_0NP1LTG1SB5SB7QU:Pq3UgOBrII",
  "residential.byteful.com:8127:116122_oCXjo_c_ca_s_UE32OUBUZOZD5W0T:Pq3UgOBrII"
];

// ---------------------------------------------------------
// 📱 DEVICE POOL
// ---------------------------------------------------------
const DESKTOP_POOL = [
  { name: "Windows Chrome", viewport: { width: 1920, height: 1080 } },
  { name: "MacBook Pro 16", viewport: { width: 1728, height: 1117 } },
  { name: "Windows Edge", viewport: { width: 1366, height: 768 } }
];

const MOBILE_POOL = [
  devices["iPhone 14"],
  devices["iPhone 15 Pro Max"],
  devices["Pixel 7"],
  devices["Galaxy S23 Ultra"]
];

// ---------------------------------------------------------
// ⏱️ UTILS
// ---------------------------------------------------------
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

let totalVisits = 0;

// ---------------------------------------------------------
// 👤 SESSION ENGINE (ULTRA HUMAN + PERSISTENCE)
// ---------------------------------------------------------
async function runSession() {
  totalVisits++;
  const rCountry = Math.random();
  let country, proxyList, locale, timezone;
  
  if (rCountry < 0.67) { // 67% US, 33% CA
    country = "US"; proxyList = US_PROXIES; locale = "en-US"; timezone = "America/New_York";
  } else {
    country = "CA"; proxyList = CA_PROXIES; locale = "en-CA"; timezone = "America/Toronto";
  }

  const proxyIndex = rand(0, proxyList.length - 1);
  const proxyString = proxyList[proxyIndex];
  const [pHost, pPort, pUser, pPass] = proxyString.split(':');
  
  // Create a unique ID for this proxy to save cookies
  const sessionFile = path.join(COOKIE_DIR, `session_${country}_${proxyIndex}.json`);

  const isMobile = Math.random() < 0.4;
  const deviceConfig = isMobile ? MOBILE_POOL[rand(0, MOBILE_POOL.length - 1)] : DESKTOP_POOL[rand(0, DESKTOP_POOL.length - 1)];

  let browser;
  try {
    const deviceName = deviceConfig.name || (isMobile ? "Mobile" : "Desktop");
    console.log(`🚀 [#${totalVisits}] [${country}] via Proxy ${proxyIndex} using ${deviceName}...`);
    
    browser = await chromium.launch({
      headless: true,
      proxy: { server: `http://${pHost}:${pPort}`, username: pUser, password: pPass },
      args: ['--disable-blink-features=AutomationControlled']
    });

    // Load storage state if exists (Cookies/Persistence)
    const storageState = fs.existsSync(sessionFile) ? sessionFile : undefined;

    const context = await browser.newContext({
      ...(isMobile ? deviceConfig : { viewport: deviceConfig.viewport }),
      locale: locale,
      timezoneId: timezone,
      userAgent: deviceConfig.userAgent || "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      storageState: storageState
    });

    await context.addInitScript(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    });

    const page = await context.newPage();
    
    // PATIENT NAVIGATION
    await page.goto(URL, { waitUntil: "networkidle", timeout: 120000 }).catch(() => {});

    // HUMAN BEHAVIOR: Smooth movement (20-50 seconds)
    const moveDuration = rand(20, 50) * 1000;
    const endMove = Date.now() + moveDuration;
    while (Date.now() < endMove) {
      const steps = rand(10, 30);
      const direction = Math.random() > 0.3 ? 1 : -1;
      for(let i=0; i<steps; i++) {
        await page.mouse.wheel(0, direction * rand(2, 10));
        await sleep(rand(20, 100));
      }
      await sleep(rand(3000, 7000));
    }

    // CLICKS: Every 20-30 visits
    if (totalVisits % rand(20, 30) === 0) {
      const clicks = rand(3, 4);
      console.log(`🖱️  [SPECIAL] Human interaction: ${clicks} clicks...`);
      for (let i = 0; i < clicks; i++) {
        try {
          const elements = await page.$$('a, button');
          if (elements.length > 0) {
            const target = elements[rand(0, elements.length - 1)];
            await target.scrollIntoViewIfNeeded().catch(() => {});
            await sleep(rand(2000, 4000));
            await target.click({ timeout: 15000 }).catch(() => {});
            
            // HUMAN PAUSE BETWEEN CLICKS (20-30 seconds)
            await sleep(rand(20, 30) * 1000);
          }
        } catch (err) {}
      }
    }

    // Save state before closing
    await context.storageState({ path: sessionFile });
    console.log(`✅ Session finished [#${totalVisits}] (State Saved)`);
  } catch (e) {
    console.error(`❌ Error on visit #${totalVisits}: ${e.message}`);
  } finally {
    if (browser) await browser.close().catch(() => {});
  }
}

// ---------------------------------------------------------
// 🚀 MAIN CONTROLLER (3 Daily Blocks, 1000 Visits/Block)
// ---------------------------------------------------------
async function main() {
  const TOTAL_BLOCKS = 3;
  let completedBlocks = 0;

  console.log(`🔥 Starting Massive Traffic Simulation (3 Daily Blocks)`);

  while (completedBlocks < TOTAL_BLOCKS) {
    completedBlocks++;
    const blockStartTime = Date.now();
    const blockDuration = rand(2, 3) * 60 * 60 * 1000;
    const blockEnd = blockStartTime + blockDuration;
    
    console.log(`\n--- 🏁 STARTING BLOCK ${completedBlocks}/3 (Goal: ~1200 visits) ---`);

    while (Date.now() < blockEnd) {
      // Launch 3-5 concurrent browsers to reach the goal
      const concurrent = rand(3, 5);
      const sessions = [];
      for (let i = 0; i < concurrent; i++) sessions.push(runSession());
      await Promise.all(sessions);
      
      // Short pause between batches to maintain ~8 visits per minute
      await sleep(rand(10, 20) * 1000);
    }

    if (completedBlocks < TOTAL_BLOCKS) {
      const rest = rand(30, 50) * 60 * 1000;
      console.log(`\n--- 💤 BLOCK ${completedBlocks} COMPLETE. Resting for ${rest/60000}m ---`);
      await sleep(rest);
    }
  }

  console.log("\n🏁 ALL DAILY BLOCKS COMPLETE.");
}

main();

