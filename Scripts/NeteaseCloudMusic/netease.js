/******************************************
 * @name 网易云音乐
 * @description 解锁会员歌曲、音质
 * @channel https://t.me/yqc_123
 * @version 1.0.3
******************************************
脚本声明:
1. 本脚本仅用于学习研究，禁止用于商业用途
2. 本脚本不保证准确性、可靠性、完整性和及时性
3. 任何个人或组织均可无需经过通知而自由使用
4. 作者对任何脚本问题概不负责，包括由此产生的任何损失
5. 如果任何单位或个人认为该脚本可能涉嫌侵犯其权利，应及时通知并提供身份证明、所有权证明，我将在收到认证文件确认后删除
6. 请勿将本脚本用于商业用途，由此引起的问题与作者无关
7. 本脚本及其更新版权归作者所有
******************************************
hostname = interface*.music.163.com
^https?:\/\/interface\d?\.music\.163\.com\/e?api\/vip\/cashier\/tspopup\/get url reject-200
^https?:\/\/interface\d?\.music\.163\.com\/e?api\/(v\d\/user\/detail\/\d+|vipnewcenter\/app\/resource\/newaccountpage|music-vip-membership\/client\/vip\/info|batch|playlist\/privilege|search\/complex\/page|v\d\/(discovery\/recommend\/songs|playlist\/detail)) url script-response-body https://raw.githubusercontent.com/Yuheng0101/X/main/Scripts/NeteaseCloudMusic/netease.js
^https?:\/\/interface\d?\.music\.163\.com\/e?api\/(song\/enhance\/player\/url\/v\d|vipauth\/app\/auth\/query) url script-analyze-echo-response https://raw.githubusercontent.com/Yuheng0101/X/main/Scripts/NeteaseCloudMusic/netease.js
******************************************/
var n,
  r,
  t = [
    "wr/DmMK5bzQ=",
    "w6DDuMK5bHs=",
    "Fjkrw5M=",
    "w63CqQzCrQzCrcOgwoM=",
    "wpLDtHzCuW/CpsKpLg==",
    "Kiofw41K",
    "ScKDAWo=",
    "C8OcA17DlA==",
    "fsO4w57CkMOIDsKuG8KOWA==",
    "w6fCpxLCtDE=",
    "w7nDqyPDsEnDssKTw60=",
    "wolFcy/DlHQPw6M=",
    "HsOdMGbDrg==",
    "w4rDsMKGZVF5w7h5V8Kn",
    "wpNndgbDnQ==",
    "wqk/w7TDr8OOwrTDp8KQZHY=",
    "w4DDvMKGY0l9",
    "cznCokoRHS3DtsKtwqw=",
    "w6hFcRjCtg==",
    "ZjEkP8KLCA==",
    "wrx4w7jDqA==",
    "R2zDkDA=",
    "aMOow7bCnsO9",
    "GsOgGkvDjcKsDMKKwo3Clw==",
    "wqDCgcKsYMKH",
    "w5fCmHbDmsOP",
    "KcKaJj7DvQ==",
    "FjLCo33DiMKE",
    "W8OEwo3CsF8=",
    "Rj/CrMKjw7TCtV3CqkrDsQ==",
    "IcKTHSLDvWDCuSExdA==",
    "FjnCqlQ=",
    "wpwHesO2d2w=",
    "aS7Co3s=",
    "w7zDoznDsk3DksKFw4JEwoM=",
    "w6N7wrNKM8KddsOY",
    "TjTCg8KAw5s=",
    "w5IUwojDksOf",
    "aSDDtVI=",
    "QSTCpQ==",
    "JMKXNsO4Gg==",
    "b0rDtSRC",
    "wqk0w73Djw==",
    "K8OGwo/CgcOD",
    "TMOrwpYfBQ==",
    "wrszw7tf",
    "fCvDog==",
    "X8O0w7TCi8Oc",
    "EjrDmXc=",
    "w7zCvhnCog==",
    "Bzkp",
    "w61xwqpSMMKc",
    "w4R5wo5jCA==",
    "LsK6JMOuLg==",
    "acOVwpDClEI=",
    "w4rDpcK+RC8=",
    "NEIxFw==",
    "wrDChcKnImI=",
    "BsKPwpXDokUNWcOxF8Kt",
    "HsKYwoLDgF8R",
    "OMKfIT3Dhw==",
    "aSvDvHI3wo8EwqfCp8OX",
    "J8OjwqDCl8Om",
    "fcKVwqTChE9WwpzDizFK",
    "U8ONwrbCrF/DoxzCuQ==",
    "J8O6BsOOXcKYPcO3AsO/",
    "X8Oew5XCkMOd",
    "MsKUwo/CtcOD",
    "TcKDHVkLw5rDimTCrcKF",
    "woZBaSvDiFA=",
    "wovDtlnCtVE=",
    "w6gNwoTDhMObdMKLw58CLQ==",
    "wpXCsMKsPGg=",
    "PsKHDsO2NsK2",
    "bClSWsK0GR9bw6R8",
    "RkrDkghM",
    "w7vDuDA=",
    "QMOFwo/CmFI=",
    "wrxtw4nDmjY=",
    "w5rCgEvDqcOZ",
    "wpXDsGTCv2DCi8KyKA==",
    "DsOYO8O9Uw==",
    "wq0Nw6Vuw4I=",
    "w4jDssKtbzPDlQ==",
    "w4DDvcKkfWs=",
    "ay/Cl3Yp",
    "AQMKw6hE",
    "DcKXJxbDmw==",
    "b1Z2woXDiA==",
    "c2PDpBJ4",
    "KcOAwoLCusOW",
    "w7rCpyvCuhbCiMOhwoc=",
    "BSoiw4k=",
    "w5/DtcKBZ1g=",
    "wq3CiWwywrU=",
    "w6BMSQfCrlJPX2jCtXI=",
    "wozCjMKvf8KqwpjCs8K9w4PDtgc=",
    "woTCgHU6",
    "VMOKwoDCr2U=",
    "w5LDhMK6QAQ=",
    "XEdWwpbDpw==",
    "EEg8BMKx",
    "fiYzFMKQAw==",
    "w7/Chn/DmMOI",
    "wotkw7XDvSU=",
    "f8OPw6rDiGA=",
    "fQXDrcOIw7rCgsKuaQ==",
    "w4/Cg0vDrlE=",
    "ZzjCqsKhw6o=",
    "w65xwqZO",
    "O1U5L8KQ",
    "H8O4wrfDksKo",
    "w4vCpMKKSTk=",
    "OUYlDw==",
    "bF1ZwrU=",
    "DMO8B0I=",
    "wq47w6Jww6U=",
    "Ii7DuUsj",
    "UsOxwrwePA==",
    "YALCt2k0",
    "w7DCh0/Di8OTwrEV",
    "w4jCgsKISg==",
    "w6RqSxLCkQ==",
    "wr5yYh4=",
    "woJhw6jDjT0=",
    "w73DisKub3Y=",
    "OsOQwo3Dq8KL",
    "w6fCgxPCqC0=",
    "YyUNw7Vt",
    "wofCgcKiQMKS",
    "w5TCjXvDnsOI",
    "woLCm8KzGlg=",
    "XsOewpDCo3Q=",
    "A8OAEsOOfg==",
    "wpvDrGzCrHc=",
    "Q3jDnjpY",
    "LCXCol7Dvg==",
    "e8Orw5bDjUjDjQ==",
    "w67DozrDtg==",
    "wr7Cg8KIB3o=",
    "J8K6wpvCqsOk",
    "CzPCi0TDhsKJaA==",
    "w6/DgcKBTlo=",
    "WsOgwpzCrX8=",
    "dQgPFcKt",
    "w4zDpMKIcj3Dn8KN",
    "w6nCh1vDrcOT",
    "wpjDrsK5XDU=",
    "wrUow6zDjsOFwrLDpg==",
    "wqJPw4zDrDY=",
    "M8OqwqjDrsKl",
    "KMOFwrzCqA==",
    "wqAEdsOUVg==",
    "XcK3wr/ChHA=",
    "w77CvErDtMOp",
    "ZmnDjxdG",
    "JMKRwoLCv8OK",
    "wqVyYzzCtg==",
    "wrssd8O7Yg==",
    "B8K1wr/DlEQ=",
    "LhHDmEEb",
    "f8OYw5zCl8Ov",
    "wqJiYTTCuQ==",
    "SQTCo8KMw4I=",
    "UsKdA0sC",
    "woTCj8KmW8K5",
    "MUsuNMKn",
    "TRs2w5pf",
    "J8OYwrTDucKH",
    "wolXSwrCvA==",
    "w4Jnwo9vBg==",
    "w73DghPDnmk=",
    "cDnCun8=",
    "UCTCp8K0",
    "dsO0w4jChQ==",
    "IjEIw49F",
    "HMKkwo/Dgko=",
    "XsOHwqPCqA==",
    "wpXDsGrCr2A=",
    "T0TDvxVI",
    "JMKQD8OO",
    "wpnCksK6HA==",
    "wpnCpmkbwoE=",
    "woHDicKQWQ==",
    "SBHCsWQ3",
    "LlMMIcKL",
    "a1Nbwrw=",
    "w43Crl7DuUDDjA4=",
    "w7LDrzbDt0TDjMKP",
    "cDjDtQ==",
    "cyTCl2AIDC3DnMKpwqzCpg==",
    "H1YdD8Kx",
    "O8O4worDtMKY",
    "GMKowr7DqVI=",
    "FsOcJmTDmA==",
    "w6fCphvCohHChcOqwpM=",
    "wqpSw7XDlTA=",
    "LMOXwp/CtsOhwofCiw==",
    "cCw5CsKmEsOYOcK2",
    "LsKaGcOf",
    "ZSTCv3Y=",
    "diwzFg==",
    "XsKvwonCg28=",
    "wqNpVgXCscKLRA==",
    "QznCrMKhw7nCrQ==",
    "w61uwoxTPQ==",
    "VMKdHn0t",
    "w6RGUzHCtFY=",
    "wpvCjMKSeMKs",
    "w53CgF3DnMOF",
    "KxDClHTDqQ==",
    "b8KTwpnCkVE=",
    "bcO2w5Q=",
    "w47CgsKCVg==",
    "N8O7wrLDgsKD",
    "VCvDqW0z",
    "YSNHXg==",
    "LMOhH8OO",
    "ZB7Du8OO",
    "UsONwr/CpQ==",
    "wp7Cjlc9woU=",
    "VcO2wr3Cnw==",
    "XcKQEH0=",
    "UMOvwoIPEg==",
    "TjnCt1UV",
    "w6lnwo9PPsKWWg==",
    "OEgtGsKCfMOtw7Ji",
    "w47CmMKASRc1",
    "wo3CjMKldQ==",
    "HsOmEFM=",
    "d8KTwq0=",
    "XcOpwpPCjkM=",
    "w4/DtsKGZ1xh",
    "w5nCpsKyej8=",
    "fiw6",
    "dMK+woTCtGU=",
    "wqIvw7hJw4UYXQ==",
    "YTcyAw==",
    "dcOUwpXCgEg=",
    "w7AQwprDhMOHcg==",
    "HcOWwqPChMOY",
    "HMK4wr3DlUo=",
    "wqLCgMK3esKS",
    "w4jDtsKrbA==",
    "CSDDgEgS",
    "f0BWwqA=",
    "LMKZCCY=",
    "MsKIOjrDiA==",
    "w6F2wqxPL8KM",
    "wrwvw6VO",
    "w5vCtEXDuw==",
    "EMOvwrfDisKf",
    "ETDCtljDkw==",
    "fsOAwpPCrUY=",
    "wqlvSgDDiQ==",
    "SGjDkjteKQ==",
    "w69GSRPCrkg=",
    "w5VwdxPCiA==",
    "esO5woIgH8O1",
    "U8OKwrrCrnDDqQzCuVU0",
    "w6JTVxjCow==",
    "w4/DkcKXVSg=",
    "JCEBw4J/",
    "wpUtXcOKbw==",
    "OsOmwpfDncKO",
    "VcKTFX8c",
    "eRDDusOR",
    "OsKWNMOiHA==",
    "OsKHEsOM",
    "K8OBwrbCtw==",
    "w65GUxzCtUQ=",
    "woUNQsOxb20Nwr4cwqLCqQ==",
    "wp/CksKjDGvCsXE=",
    "w77Dkg3DiUw=",
    "UsKNwqDCqGY=",
    "AzPCqVjDgMKJ",
    "w6DCrQDCug==",
    "THnDiCw=",
    "VMKCEW8T",
    "wqvDqTbCmg==",
    "cmHDtgp5",
    "wpzCl8KufA==",
    "wpbCh8KyBHc=",
    "W198wrTDug==",
    "wqsFw5huw5M=",
    "wrbDg8K3aB4=",
    "w4HCjMKURA==",
    "KsO7JGTDsw==",
    "w7dmwr9K",
    "w7BmwrtM",
    "ZldPwqQ=",
    "cCw5Cg==",
    "KMKaE8ODG8Ksw5EAw74=",
    "w4LCiMKeWw==",
    "NsOBwqDCtw==",
    "fCrDtl4+wpU=",
    "w7jDpTPDqg==",
    "AiQgw4A=",
    "X8OqwojCj0V5IA==",
    "ZcOowoM3",
    "JMOUwr7Cr8O5",
    "Bzs+w4l1",
    "ESPCrnbDjQ==",
    "w6zDuhHDgko=",
    "bhzDpcOqw5o=",
    "LMOhJGzDog==",
    "w4/CtlnDisOM",
    "wo5vdCDClA==",
    "woAiw6BWw4o=",
    "DUgiMMKt",
    "PVIfBMKr",
    "A8KBPcOVLQ==",
    "SC3CgmAY",
    "VsO0w4jCnsO9",
    "eMK+JUgB",
    "w6jCgMK2diU=",
    "fMOew6PCpcOT",
    "wrrClMK0HkI=",
    "woTChGAr",
    "w57DuMKAU24=",
    "w5UYwrXDp8OU",
    "K8KCwrHCtsOy",
    "w7cTwo/DsMOU",
    "SBPCr8Kpw7Y=",
    "CMKVwoDDgG8=",
    "Si7Ckn0b",
    "dBsSOcK3",
    "wpjDo8KHSzE=",
    "w6rDuDLDpQ==",
    "w6hgwqpK",
    "wo3ChGw=",
    "JsO6D8OH",
    "Dg4Cw4Bl",
    "w6nChmvDjw==",
    "w74MwqXDk8OA",
    "aBU4MMKA",
    "wplwbCfCpA==",
    "HcOmwozCjsOz",
    "wq4ow7nDp8OPwq7DocKR",
    "w7/DrsK4Qgs=",
    "wpYHesOTd2YLwpU=",
    "w6nDryPDt0DDisKd",
    "wrjCiHEuwr4=",
    "w4bDuMK3ZD3DhQ==",
    "WT8rw6Zm",
    "wqB1bh4=",
    "XHjDmjFI",
    "FT8hw5U=",
    "w6Fkwq5WJg==",
    "wqxvaRPCpMKMcxk=",
    "wr9zw7DDvDh8",
    "wop4ZhLCtcKJMx9Ew4XCjU91Q0TCjcKyOWvDp3zDhzE=",
    "w4vDuMKraj3DnQ==",
    "w5jDscKaa0o=",
    "w4nCrRbCqxbCgMO7wo/CssOxw6RUZMKZcgpdA2NCWVtfw4bCrjbCuXk=",
    "ZMO5wpgyGcOz",
    "KMKAw7rCmRZGw5HDu2xVVw==",
    "w5R8wrsaNsKMZ8OPw71Iwp/DkgISCkHCh0fDrcKvwqvCgn3Ch8OvOMKJE8KrwpJgwpp+",
    "DsOmG14=",
    "wpfDgsKa",
    "H8OoAEnDicKMGsKl",
    "w6Z9wrBbM8KUe8Oxw7Nf",
    "wpvDgMKSSB4gwrNjJgoRfsK0w6RSw4rCh8KAwovDvXM=",
    "FcKcGcOMNsK+w4A=",
    "wqAow6Ffw4cL",
    "w4XDlTbDpEDDl8KI",
    "NBjDu8Kaw7XCmcK1O8OywqJGWHTDl8KwYA==",
    "w7PCr0jDoUzDignCuMKbUHgSw7FpAMKONww=",
    "GmcgF8Kld8O4w6N+w6Y=",
    "w6XDl8K4dCXDn8K2w7RTwolIORwhDQ==",
    "AsK8BD3DgnHCvyEwfV96w44=",
    "ZcOpwp83DsOzOcO8KMOASxfDijw=",
    "V3jDjyxPLxvCg2QdbcOuBDw=",
    "wq9iYhPCpcKRdRlG",
    "w6BMSgTCtkVOWXg=",
    "UxTDpsOfw6nCl8K1dMOp",
    "wr51VATCosKMchA=",
    "wpQjw7vDi8OMwqnDscOZYHHCjRfCgsKjwpPCsMOcw5VQCD7CkMOqw4obw6AxBcKFMMKpPEZuw7YpwrjDhcKSwqXChcOBSMOIw6tdQTfCqsKawpXCvjdYwotqc07DkxDCpGsiLcK4w43DgMKYw7bDtcOOSw7CiUrDizVAB8OHHsKMcg7CkRoMw6FZw7jDiXs7PcKGw4AMI2ttwoB6eBrDkMOWw7UFwq4HwpzCtiLCiQNLw6BfR8O6HsKMG3JMw6RyHMKDwrPDjRPCrlI4w5Y=",
    "OcKBBcOTN8Ky",
    "wr/DjcKO",
    "WcO2w5/Dm0TDnBUbwo8=",
    "VTjCpsKnw77CsErCg0E=",
    "5p2p5p6s5bS86YOZ552l6Lyu77+f5p6N5qy95Lm35YWP6YKs55++",
    "LMOhH8OOQsOHZsKxGcK/cghzw645XcKtfi5oPw==",
    "w7HCgHrDicOSw6pDHkI/wowHw6jCigFUw6PDnsKvwoM9wq7DnBYnUVHDu0nDuTfCqD3ClsOPw716VlE1wpXCsMKbw7A3M8KRZMOuLB7DqcKgwqMPO8Ocw4ttwq8+HMOXwr7DqmvCrDHDoFHDhsOCVQwyaMKob0rCtFDChgjCjcKjwoo=",
    "6ISq5p6O5aCr5puS",
    "TwYow6JqwrNMw63DpS7DmBA=",
    "ecOhw4DCncONAcK2I8KIVAQIGsKuwokf",
    "E8KNwpzDi0IaSsOsG8KxwqXCsjRfAxbDmx8Bwq9fw6Y6w74twoEJw5XCsWM=",
    "6Ky75rGI5aas6La7bTA=",
    "a1NDwrPDgg==",
    "57yj57ih6Kyb5rOl5aSa6LWc",
    "Ok4GwqzCmULCoEhm",
    "wofCmMKxHA==",
    "5LiW5b2r5bOM5p+J6IS55pyW55eN5LiJ5Lql5L285ZSg5LuH5om06L215rOw55W+6YG+772g6L286IGN5ZKT5p+b6IeM6LaP44KM",
    "5byg5Y6H6IOH5LuP5a2h6IeD5pyI55mi5ruA55a65om05omq5Lq25L6Q6Law5Lmw44Ke",
    "6L+x6Kat5Ly555a+5a+z6ISp55q85ZOO5pyN55Wm5L+X55Wd6IGY6IS56KGm5om+5oud44Ki",
    "5aeI5p+86L6q5Y2355qh5Yam5rGw6Kah776B5bCn56iK5Yyp5Ymg6Zuf5pyu6IWU5p+z44Ot",
    "5LyD55ah6IGx6IuP6L285YyN5aKF5puI6KSm5a2u776r5bOB6ISZ5Yu16KaH5Lii5pe15b2o5L2r55WJ5p+A44KJ",
    "5p+g5aO65pqT55ia5p2X57uY6Keo6YWP5pyy5b+i5b6Y5Y6W6IOj5ouC5p2k44Kb",
    "woLClWwvwpzCkMO1w63DoGEeCxszwpwGLR8DwojDiijDkMK6wrTCj8Kpwo5VBVLDoMO1JcKTwo0Ww50vbMO8woMLw7XCtMKrwozDvcKhPsOQcHVgcsO0cyl8wp7ClsK3aQ==",
    "6Iyf5YyW6L+256qA5aOZ5pqn5omt5YiH",
    "fjLConYyJA==",
    "wpnCksK2DW/CsGfDsw==",
    "wofDojfCmsKKw7fDocOZGA==",
    "8JuSnPCxk6/wtJGP8YihifGFgKHwp7CL8KGTg/GEsbPxgoKD8LGghvCko47wrpCC8Y6hsPCjsoPxjYCl8YCzqPGJk44=",
    "LcOQwrrCs8Ozw5PDvMKOegjDrMOPbhvDqMKKw45rcsKjw4Bxw6DCqRN4w70NPwFu",
    "woLClWwvwpzCkMO1w63DpXcVQF85wo0LJBgSwoPDlXHCm8Kjw77Dh8Kgw5FlX0zCt8K0",
    "ZD0Sw4Ygw6wWw7HCsWXCmEV9wpxh",
    "w47CqUTDqkXDhQQ=",
    "w5DCkU3DvsO4",
    "IAnCmFLDjw==",
    "TUNCwr3Dvw==",
    "wp13aSHCkg==",
    "FMORwozCqcO0",
    "WGFOwrvDhA==",
    "wprDhRrCjcKL",
    "wpXCq8KTZ8Kb",
    "w4HCtE/DuUjDnRLDqg==",
    "fhLDtX4X",
    "GCTCtmbDnw==",
    "JcK+FzvDvA==",
    "P2MtIMKj",
    "wqjDvjfCmsKMw6XDscOMGQ==",
    "P34hBMKB",
    "HF8RFMK0",
    "a1vDuBFB",
    "cQXChMKpw5M=",
    "w5gSwq3DmMOi",
    "bj0Aw7NG",
    "wo0ew41fw60=",
    "NsOEJGnDgw==",
    "w5onwpHDlMOb",
    "fiIVF8Kr",
    "S8Ozw6HDiFo=",
    "GsKzIcOqPA==",
    "wrsvXsOdeg==",
    "acKrKHUg",
    "b8OKwpzCt0k=",
    "w4fCsk3DiFo=",
    "VMOpwovCqWY=",
    "UDnCmUI9",
    "wqoew67DrcO4",
    "w5jDgxXDsEk=",
    "w77CvcKQejM=",
    "ZBxcZsKZ",
    "C8OQwp7CmcOS",
    "LMOzD8OXQQ==",
    "QcORw6zDp2Q=",
    "Zg7CrsKXw7Y=",
    "RiIIOMKn",
    "wrkPe8ONfw==",
    "wpkWQsOMcA==",
    "woFdTgjCuA==",
    "woDCpMKhL1Y=",
    "w5TCvwLClgo=",
    "wppWaDjDk0wZw7DCvA==",
    "w4DCoVnDhF7Dhy3DqsKzRXMFw7dx",
    "NMKdHCfDtA==",
    "w7sbwrzDlMOX",
    "w67CpMKkTBo=",
    "ccOlw5XCg8OFFsK4JQ==",
    "JcK/ETfDqQ==",
    "wq15w6TDsDRZf8OgA8ORw6wowpQ=",
    "McOLwp3Ct8OywoDCvcOGSBvCpQ==",
    "csO5woouBcO4DcOrI8OjWgTDjDE=",
    "CsKRwpbCh8OW",
    "FMOYMsOscA==",
    "KlUmF8KvccOgw6d0",
    "QyTCp8Kjw6zCvA==",
    "XBspw6JgwqlBwrDDtA==",
    "OhnCsmPDtg==",
    "w65dwr1PKg==",
    "CTHDjlEH",
    "fjjDqVs=",
    "w6LDssKdV1c=",
    "wr1oZgA=",
    "ccOqwo7Ct1E=",
    "e8KoCVUk",
    "wpnCo3Ezwoo=",
    "wpjCkEEQwoo=",
    "RzPCtsKSw6rCtlDCiVHDq3vDigLCow==",
    "w7IUwrHDh8OU",
    "TDfCisKmw5c=",
    "Fjkhw5FjHFvDnBU=",
    "w5zDq8KHcFJhw7hFXQ==",
    "WsKDAX0Rw4s=",
    "esKaNW00",
    "JcOzOMOvRA==",
    "N8KrwqvDqmA=",
    "Qgl6YcKy",
    "TSozBcKLAMOJ",
    "wrppUATCkQ==",
    "wohgZi7DsQ==",
    "VBjCuHUt",
    "cxPCqXsd",
    "AybCiWDDkg==",
    "w5nCuBrClAE=",
    "wowYw6diw6g=",
    "VnjDiD1E",
    "wpkFTcONaQ==",
    "w6tETj/Cmw==",
    "McKEPgDDqQ==",
    "TVvDhjVM",
    "w7tMXxzCgw==",
    "wpLCjmA3wrY=",
    "w6gGwo3DpA==",
    "O1Uu",
    "wpnCgsKtecK7",
    "wr0iw5hLw4s=",
    "w5vCr1PDplE=",
    "w4vCoUbDpw==",
    "SsOBwrfChlI=",
    "ZMO5wp8oB8OrOA==",
    "w5x8RgPCu0lO",
    "QsOxwrzClA==",
    "wqLDkGrCnVI=",
    "woHDmGTCm1Y=",
    "dsO6w6rCucOO",
    "PMO6E8OWaA==",
    "woXCksKxB2LCtWc=",
    "w67DojLDvQ==",
    "UznCu8Kvw6A=",
    "w4vDlMK4V1w=",
    "M8KWwp/DiEQ=",
    "wo7CkcKm",
    "MsKXE8OYLw==",
    "dsONw5vDm1w=",
    "w73DgsKRVxU=",
    "ZnzDvhZ8",
    "DsOtwqzDscKH",
    "PsKJwo3Dtnw=",
    "wr8Je8ONcg==",
    "SDPCt0Yn",
    "SgfCjMKlw4I=",
    "eTfCocK6w4E=",
    "DTLCvXLDlA==",
    "FS7DiHgH",
    "YMOjw5DDqWM=",
    "WcO+wqrCuG0=",
    "NQTCk1rDlA==",
    "PDrDhX8f",
    "d8Ouwos=",
    "RDPCrsKnw7/CuFDCgw==",
    "wqoEw7Fuw6M=",
    "egzCiMKkw7U=",
    "w6bCmSnCuyM=",
    "IsKkwqjDpG8=",
    "V0FSwr7Dng==",
    "w7EawonDqcOaZA==",
    "cMKxwozCjlk=",
    "bjRY",
    "wqhjw67DrjZkaMOtNMOIw7siwpbDtgTDtnI=",
    "I8KOFw==",
    "wpDDvUPCqnQ=",
    "wo7CgcKzecKuwp4=",
    "d8O0wqc3GA==",
    "woDCkXonwoA=",
    "VzzCn14M",
    "C8O0HcOWWQ==",
    "w5jDoMKYYQ==",
    "NjTDrUMH",
    "wpDDp28=",
    "EjI+w4A=",
    "wrAow7nDgsOPwqQ=",
    "w43Dq8KP",
    "aUBQ",
    "wokPw6XDn8Ou",
    "fcOawoIfGw==",
    "IcOBwqLCpsOnwojCp8OE",
    "SxDCrMKaw6g=",
    "KCjDnEEe",
    "D8KBwr/CjMOhwq4Fw7U=",
    "fcKcNEUy",
    "J8KQA8OSNsKx",
    "ZjnCvA==",
    "wo3Ch8K1EnY=",
    "fsOJwq7Cj1k=",
    "wprCksK2AGHCpw==",
    "w6LCqTDCqis=",
    "HkoZOsKX",
    "H8KYwpjDj0Qd",
    "wqHCiMK0X8K0",
    "w4nCsk0=",
    "NcKYwo3CqcO6",
    "QVfDng5Y",
    "GsOmwrDDvQ==",
    "wphBdDnDkEwuw6HCtMKt",
    "LEYlFsKl",
    "IsKYworCp8OX",
    "E8OswqrDsMKGwr0=",
    "w5/Cmz7CpS8=",
    "VMOHwrfCuVTDpxzCuQ==",
    "w4HCiMKSRx0j",
    "bj3Ct8KRw7I=",
    "aUhfwoPDjw==",
    "wovChsKtacK5wovCssK7",
    "w6fCvB3CvAXClcOgwpI=",
    "w5YlwrzDm8Ow",
    "VsOvw43DvUM=",
    "wpvCmsKxaQ==",
    "wqd/cxjCv8KB",
    "KCA7w7Zm",
    "wpAQaQ==",
    "wo5BaynDm1kUw6U=",
    "VidcUsKB",
    "TXnDmS5LNRDClA==",
    "WsKQLVQh",
    "wpTClsK2C2bCj23Djw==",
    "Rhkgw5d4",
    "wonCisKvbcKywobCv8KSw5jDug==",
    "wotCcynDjnQPw6M=",
    "wqjDuSvChg==",
    "wqNMw4vDijE=",
    "ecO2w58=",
    "aTnCmWoI",
    "fsOrw4rDq0jDmhM=",
    "wrh/dBXCpA==",
    "wr7Dt2XCtl4=",
    "e8Olw5TDgg==",
    "wqlvw47DsCQ=",
    "wpEaw6/Dp8OE",
    "dsOhw4DDmg==",
    "w4zDpcKffhc=",
    "CibDh3UAUg==",
    "wqsOw5/DmsOH",
    "Ci4gw4J4AA==",
    "wolFayA=",
    "Wggqw6Nq",
    "w7jCqRTCuwE=",
    "IcOLwqDCpg==",
    "AQLDnXUx",
    "BcKwwpLCtMOU",
    "w6nChmHDjcOOwqQVQVc=",
    "w64OwqTDjsOQ",
    "wqDDisKZRxs=",
    "JcK0ByTDgg==",
    "f8KVwrnClU9bwpzDiT9EAw==",
    "wpfDryDCvMK3",
    "woNXQCnDkl0Sw6HCrcKnwowWecOAwoLDt8KtwoYz",
    "C8O/KcOPdw==",
    "JArDq3Ec",
    "ZCTCtXwLGyrDvMK8wrDCsQ==",
    "woHDmQzCp8Ku",
    "ay9MWsK0HRJ8w6p/NA==",
    "czjDqFI=",
    "dsKdwrjCjg==",
    "w5bDssKtVy7DnsKhw5JTwpVKPSco",
    "w68awonDkcOHb8KNw5kTJ8KiIB9T",
    "w7PCssKWXR0zQHZ9",
    "wo0Iw5NDw6g=",
    "bDRaS8KsGQ==",
    "w6FjwqxbLw==",
    "M8OqDHjDtQ==",
    "woEQYcOqd3wGwo0Y",
    "w4nCs1PDpUo=",
    "w4vDmiDDt3I=",
    "wpvDn8K5SBckwq0iMQQXW8KpwqpQw4rCmsKKwog=",
    "McOMwqvCrQ==",
    "w6zDqzvDpkQ=",
    "CC42w5E=",
    "w7zCoWDDsks=",
    "UMKPwq/CjmU=",
    "wqMxXMO/Wg==",
    "w5DDtMKYVxg=",
    "wpvCinYWwqY=",
    "woFBfj8=",
    "QsKvwo/CqE4=",
    "wqBvw7PDuSN4",
    "AsKSwpw=",
    "bcKdwqbCkEY=",
    "RDnCrMKn",
    "Bi/CtFQ=",
    "QMO4wrXCj0Fk",
    "woEQa8Oo",
    "w6nDrznDpw==",
    "wpUNYMO7",
    "f8KZwqbCgERbwpHDog==",
    "wq4sw5hrw5E=",
    "wobDnsKHaBc1wq0qIBg=",
    "w492wrNWBg==",
    "w6BLRgbCm1Q=",
    "ecKrwoLCgVs=",
    "wpzCj8Kob8K7",
    "FsKSwoLDgg==",
    "w7rCugHCiwrClcO9wonCpcKi",
    "wpLDumXCqmvCj8KyJMKpwqU=",
    "CMKXwpvCvMOD",
    "w5TDoSLDgEs=",
    "ZjotFg==",
    "w7Jiwr9W",
    "SSDCrlwV",
    "WWFxwrvDoQ==",
    "GMOmGk8=",
    "CsOwwq7DvQ==",
    "EsOsDF4=",
    "KMOBwrrCq8Ovwo0=",
    "CyDDsXcd",
    "HcO7Ew==",
    "A8OnDsO0XQ==",
    "w5jCn8KfahwzXUBHCQ==",
    "CUQDAsKa",
    "UH/DhRlENQ3Cj2U3",
    "wql1agDCvMKAaB5Ow4c=",
    "wp/Dt0nCmEQ=",
    "RB3CksK3w40=",
    "aTPDh200",
    "cznCokMQCg==",
    "fzRaXA==",
    "w4bDtsK1aw==",
    "w7bDnsKMdlc=",
    "wozCgsKtYA==",
    "wofCl8KNXsK2",
  ];
(n = t),
  (r = 349),
  (function (r) {
    for (; --r; ) n.push(n.shift());
  })(++r);
var w = function (n, r) {
  var x,
    e = t[(n -= 0)];
  if (void 0 === w.mJSVHr) {
    (x = (function () {
      var n;
      try {
        n = Function('return (function() {}.constructor("return this")( ));')();
      } catch (r) {
        n = window;
      }
      return n;
    })()).atob ||
      (x.atob = function (n) {
        for (
          var r, t, w = String(n).replace(/=+$/, ""), x = 0, e = 0, o = "";
          (t = w.charAt(e++));
          ~t && ((r = x % 4 ? 64 * r + t : t), x++ % 4)
            ? (o += String.fromCharCode(255 & (r >> ((-2 * x) & 6))))
            : 0
        )
          t =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(
              t
            );
        return o;
      });
    (w.tSlYzF = function (n, r) {
      for (
        var t, w = [], x = 0, e = "", o = "", c = 0, u = (n = atob(n)).length;
        c < u;
        c++
      )
        o += "%" + ("00" + n.charCodeAt(c).toString(16)).slice(-2);
      n = decodeURIComponent(o);
      for (var i = 0; i < 256; i++) w[i] = i;
      for (i = 0; i < 256; i++)
        (x = (x + w[i] + r.charCodeAt(i % r.length)) % 256),
          (t = w[i]),
          (w[i] = w[x]),
          (w[x] = t);
      (i = 0), (x = 0);
      for (var f = 0; f < n.length; f++)
        (x = (x + w[(i = (i + 1) % 256)]) % 256),
          (t = w[i]),
          (w[i] = w[x]),
          (w[x] = t),
          (e += String.fromCharCode(n.charCodeAt(f) ^ w[(w[i] + w[x]) % 256]));
      return e;
    }),
      (w.RMWKkB = {}),
      (w.mJSVHr = !0);
  }
  var o = w.RMWKkB[n];
  return (
    void 0 === o
      ? (void 0 === w.jHjvmK && (w.jHjvmK = !0),
        (e = w.tSlYzF(e, r)),
        (w.RMWKkB[n] = e))
      : (e = o),
    e
  );
};
(() => {
  var n = {
    IeCGY: function (n, r) {
      return n == r;
    },
    BIBch: w("0x0", "ij@X"),
    EqumU: function (n, r) {
      return n === r;
    },
    WmnQB: function (n, r) {
      return n !== r;
    },
    QuBjt: w("0x1", "YjXZ"),
    Keiav: w("0x2", "ij@X"),
    PSykn: function (n, r) {
      return n == r;
    },
    zHRkE: function (n, r) {
      return n == r;
    },
    FxXwt: function (n, r) {
      return n(r);
    },
    orgCs: w("0x3", "lKUx"),
    NkuSj: w("0x4", "Z3hl"),
    LtaQW: function (n, r) {
      return n === r;
    },
    djdTU: w("0x5", "rI0h"),
    OxlIX: function (n, r, t) {
      return n(r, t);
    },
    zsLqa: function (n, r) {
      return n === r;
    },
    QSFkK: "next",
    jQNgZ: function (n, r) {
      return n === r;
    },
    DmPYW: w("0x6", "m6]f"),
    YacxY: function (n, r, t, w) {
      return n(r, t, w);
    },
    TBhuN: w("0x7", "W752"),
    kFnXp: function (n, r) {
      return n === r;
    },
    zpwzx: function (n, r, t) {
      return n(r, t);
    },
    laHdO: function (n, r) {
      return n !== r;
    },
    SmWWz: function (n, r) {
      return n + r;
    },
    hBFGt: function (n, r) {
      return n + r;
    },
    eZbRr: w("0x8", "gR*a"),
    whtZA: "' method",
    azhSe: "iterator result is not an object",
    JZAZE: function (n, r) {
      return n === r;
    },
    OjBqF: function (n, r) {
      return n == r;
    },
    YUTIM: "GeneratorFunction",
    YSEMm: function (n, r) {
      return n in r;
    },
    wUwtu: function (n, r) {
      return n(r);
    },
    nbABC: function (n, r) {
      return n === r;
    },
    GreJl: function (n, r) {
      return n - r;
    },
    ScJaZ: function (n, r) {
      return n >= r;
    },
    dKPuU: w("0x9", "d]]2"),
    dOSTw: w("0xa", "hEqJ"),
    tjBZm: function (n, r) {
      return n <= r;
    },
    ZGdrj: w("0xb", "d]]2"),
    htLRh: w("0xc", "gR*a"),
    MtGBM: function (n, r) {
      return n && r;
    },
    LaQhF: function (n, r) {
      return n < r;
    },
    emAHe: function (n, r, t) {
      return n(r, t);
    },
    iojzU: function (n, r) {
      return n < r;
    },
    ldLyV: function (n, r, t) {
      return n(r, t);
    },
    bTDLO: function (n, r) {
      return n(r);
    },
    xtaXq: "try statement without catch or finally",
    KGsGS: function (n, r) {
      return n(r);
    },
    KGIxh: "break",
    ZwzXn: "continue",
    GeDzx: function (n, r) {
      return n === r;
    },
    YwKHq: function (n, r) {
      return n === r;
    },
    zcQoV: function (n, r) {
      return n >= r;
    },
    bGnTf: function (n, r) {
      return n === r;
    },
    GOeay: function (n, r) {
      return n(r);
    },
    TaUKC: function (n, r) {
      return n - r;
    },
    pgTDa: function (n, r) {
      return n(r);
    },
    CtEPx: w("0xd", "hEqJ"),
    JMPCb: function (n, r) {
      return n(r);
    },
    dMela: function (n, r) {
      return n instanceof r;
    },
    OVDMk: function (n, r, t, w) {
      return n(r, t, w);
    },
    MzgaS: w("0xe", "9T4U"),
    BTFeI: function (n, r, t, w, x) {
      return n(r, t, w, x);
    },
    ENoYw: function (n) {
      return n();
    },
    FXlUn: function (n, r, t, w, x) {
      return n(r, t, w, x);
    },
    SwYfs: w("0xf", "DDif"),
    PFVPe: w("0x10", "FEeG"),
    PZLiE: function (n, r, t, w) {
      return n(r, t, w);
    },
    WrBMB: function (n, r) {
      return n < r;
    },
    wScGX: function (n, r) {
      return n === r;
    },
    IcGwk: function (n, r) {
      return n == r;
    },
    RPvUA: function (n, r) {
      return n(r);
    },
    LpZnJ: function (n, r) {
      return n + r;
    },
    kZcLA: function (n, r) {
      return n(r);
    },
    NtPZR: w("0x11", "v8Fn"),
    hfdip: function (n, r, t, w) {
      return n(r, t, w);
    },
    UNqkG: w("0x12", "ODm4"),
    nTjIk: function (n, r) {
      return n >= r;
    },
    HmuSg: function (n, r) {
      return n <= r;
    },
    ENKfT: function (n, r) {
      return n < r;
    },
    gdAUb: function (n, r) {
      return n == r;
    },
    gCaex: w("0x13", "NSX("),
    eJPDW: w("0x14", "lKUx"),
    RuFQt: w("0x15", "rW[1"),
    AHUkb: w("0x16", "m6]f"),
    dMNqq: w("0x17", "6e96"),
    BYmIA: w("0x18", "ij@X"),
    sBile: w("0x19", "ca1$"),
    rqYOe: function (n, r, t, w) {
      return n(r, t, w);
    },
    gxaCR: function (n, r) {
      return n(r);
    },
    nkLFa: function (n, r) {
      return n(r);
    },
    Rfgjb: "constructor",
    gHwvS: function (n, r, t, w) {
      return n(r, t, w);
    },
    OcxRT: function (n, r, t, w) {
      return n(r, t, w);
    },
    TWoek: function (n, r) {
      return n(r);
    },
    TaJyb: function (n, r) {
      return n(r);
    },
    KsekF: function (n, r, t, w) {
      return n(r, t, w);
    },
    RSRaB: w("0x1a", "v8Fn"),
    QEJfp: function (n, r, t, w) {
      return n(r, t, w);
    },
    vOCGT: function (n, r, t, w) {
      return n(r, t, w);
    },
    ucAPD: w("0x1b", "ij@X"),
    frqai: function (n, r) {
      return n(r);
    },
    gHDMH: function (n) {
      return n();
    },
    OkWDJ: w("0x1c", "xVF("),
    WnXNR: w("0x1d", "9T4U"),
    GhtmZ: "Object",
    bSYUA: w("0x1e", "hEqJ"),
    OeFKh: "Set",
    cKufR: w("0x1f", "qYUe"),
    TuaFM: function (n, r, t) {
      return n(r, t);
    },
    QfxJN: function (n, r) {
      return n == r;
    },
    Jougq: function (n, r) {
      return n > r;
    },
    bGsPX: function (n, r) {
      return n < r;
    },
    Gnhcr: function (n, r) {
      return n != r;
    },
    gKRfI: w("0x20", "KMjo"),
    arpLP: function (n, r) {
      return n === r;
    },
    aqiJA: function (n, r) {
      return n !== r;
    },
    gIlfK: function (n, r) {
      return n(r);
    },
    JNyez: function (n, r) {
      return n !== r;
    },
    aRXyA: function (n, r, t, w, x, e, o, c) {
      return n(r, t, w, x, e, o, c);
    },
    xvRtT: function (n, r, t) {
      return n(r, t);
    },
    TdMJc: "true",
    FKuaS: w("0x21", "oxtW"),
    BdsKl: w("0x22", "LULE"),
    BdXAJ: w("0x23", "2@^5"),
    ohdLf: w("0x24", "YAHy"),
    uHSso: function (n, r) {
      return n !== r;
    },
    hmsrf: w("0x25", "nSnl"),
    HRqSo: w("0x26", "dy^("),
    hxfDi: "netease",
    iRaNZ: w("0x27", "F4jE"),
    klgWg: function (n, r) {
      return n(r);
    },
    YQjan: w("0x28", "YjXZ"),
    CMLzl: w("0x29", "3G@R"),
    BsQUY: w("0x2a", "F4jE"),
    ptJhY: function (n) {
      return n();
    },
    ociZf: function (n) {
      return n();
    },
    nfiRv: w("0x2b", "3G@R"),
    NbHqu: function (n, r) {
      return n(r);
    },
    CKMLu: function (n, r) {
      return n < r;
    },
    VSPgR: function (n, r) {
      return n < r;
    },
    jFNRt: function (n, r) {
      return n == r;
    },
    BjOgs: w("0x2c", "q5GC"),
    lbqcy: function (n) {
      return n();
    },
    DoIEg: function (n, r) {
      return n(r);
    },
    SmKdP: function (n) {
      return n();
    },
    McvvL: function (n) {
      return n();
    },
    sctGj: "本脚本仅用于技术学习，禁止非法使用。",
    vpFQk: w("0x2d", "W752"),
    zmmPA: "在中国大陆地区，严禁传播本脚本。",
    PhPFC: w("0x2e", "KMjo"),
    raZop: w("0x2f", "nSnl"),
    VBWsm: w("0x30", "9T4U"),
    DusPD: w("0x31", "d]]2"),
    Ohkln: w("0x32", "YjXZ"),
    WokSm: w("0x33", "rP^V"),
    guVgk: w("0x34", "ODm4"),
    TFqPK: "获取远程声明失败, 使用本地声明",
    ItJot: w("0x35", "6%C4"),
    OfYog: function (n, r) {
      return n - r;
    },
    NexoY: w("0x36", "q5GC"),
    AOATd: w("0x37", "X7LV"),
    nEQra: function (n, r) {
      return n(r);
    },
    gubfr: w("0x38", "dy^("),
    CXiJg: w("0x39", "oxtW"),
    UMfOL: w("0x3a", "rP^V"),
    jBGqL: function (n, r) {
      return n === r;
    },
    psUTr: w("0x3b", "nSnl"),
    XrmGX: w("0x3c", "ODm4"),
  };
  function r(t) {
    var x = {
      cKpIN: function (r, t) {
        return n[w("0x3d", "2@^5")](r, t);
      },
      zdlWx: n[w("0x3e", "9!Cb")],
      gBgim: function (r, t) {
        return n[w("0x3f", "3G@R")](r, t);
      },
      eDdCc: function (r, t) {
        return n[w("0x40", "ij@X")](r, t);
      },
      eYhgA: n[w("0x41", "oxtW")],
    };
    return (
      n.Keiav,
      (r =
        n[w("0x42", "3G@R")](n[w("0x43", "X7LV")], typeof Symbol) &&
        n[w("0x44", "ALX2")](n.QuBjt, typeof Symbol[w("0x45", "ODm4")])
          ? function (n) {
              return typeof n;
            }
          : function (n) {
              return n &&
                x[w("0x46", "LcFT")](x[w("0x47", "9!Cb")], typeof Symbol) &&
                x[w("0x48", "rW[1")](n.constructor, Symbol) &&
                x[w("0x49", "NSX(")](n, Symbol[w("0x4a", "X7LV")])
                ? x[w("0x4b", "NSX(")]
                : typeof n;
            }),
      n[w("0x4c", "NSX(")](r, t)
    );
  }
  function t() {
    var x = {
      PMYRA: function (r, t) {
        return n.dMela(r, t);
      },
      XYhRQ: function (r, t, x, e) {
        return n[w("0x4d", "6e96")](r, t, x, e);
      },
      nIcuu: n.MzgaS,
      CkQqQ: function (r, t, w, x) {
        return n.OVDMk(r, t, w, x);
      },
      afSQu: n[w("0x4e", "KMjo")],
      bDabM: n.NkuSj,
      EVGMK: n[w("0x4f", "2KJ$")],
      XUHPI: function (r, t, x, e, o) {
        return n[w("0x50", "nSnl")](r, t, x, e, o);
      },
      pdrin: function (r) {
        return n.ENoYw(r);
      },
      psWtA: function (r, t, x, e, o) {
        return n[w("0x51", "DDif")](r, t, x, e, o);
      },
      SSczR: function (r, t) {
        return n[w("0x52", "d]]2")](r, t);
      },
      tXrtb: function (r, t, x, e, o) {
        return n[w("0x53", "2KJ$")](r, t, x, e, o);
      },
      WpbZe: function (r, t) {
        return n[w("0x54", "PB^i")](r, t);
      },
      CRlXL: function (r, t) {
        return n.OjBqF(r, t);
      },
      rutan: n[w("0x55", "qYUe")],
      hgCSq: n[w("0x56", "9T4U")],
      hgiKA: function (r, t) {
        return n[w("0x57", "T2yh")](r, t);
      },
      xbdbv: function (r, t, x, e) {
        return n[w("0x58", "ROTc")](r, t, x, e);
      },
      caIHD: function (r, t) {
        return n.YSEMm(r, t);
      },
      jpfAw: function (r, t) {
        return n[w("0x59", "5@aF")](r, t);
      },
      oFVTf: n[w("0x5a", "ODm4")],
      nrBew: n[w("0x5b", "YAHy")],
      vCRpg: function (r, t) {
        return n[w("0x5c", "6%C4")](r, t);
      },
      ObmlY: function (r, t) {
        return n[w("0x5d", "xVF(")](r, t);
      },
      eeSns: function (r, t) {
        return n.IcGwk(r, t);
      },
      LWbMd: n[w("0x5e", "FEeG")],
      irFyK: function (r, t) {
        return n[w("0x5f", "f6eD")](r, t);
      },
      gAtgE: function (r, t) {
        return n.LpZnJ(r, t);
      },
      bWHdx: function (r, t) {
        return n[w("0x60", "VI(Y")](r, t);
      },
      cEHJT: n[w("0x61", "oxtW")],
      BBXyL: function (r, t, x, e) {
        return n[w("0x62", "LULE")](r, t, x, e);
      },
      nEPnA: n[w("0x63", "qYUe")],
      QPwdS: function (r, t, x, e, o) {
        return n[w("0x64", "KMjo")](r, t, x, e, o);
      },
      qknII: n.UNqkG,
      yCqJa: function (r, t) {
        return n[w("0x65", "PB^i")](r, t);
      },
      rJXii: function (r, t) {
        return n.nTjIk(r, t);
      },
      kfVll: function (r, t) {
        return n[w("0x66", "T2yh")](r, t);
      },
      pyFoY: n[w("0x67", "T2yh")],
      vphkm: function (r, t) {
        return n.ENKfT(r, t);
      },
      DHlqv: n[w("0x68", "ij@X")],
      Nlxcn: function (r, t) {
        return n[w("0x69", "q5GC")](r, t);
      },
      cAwkH: n[w("0x6a", "rI0h")],
    };
    t = function () {
      return o;
    };
    var e,
      o = {},
      c = Object[w("0x6b", "37Y4")],
      u = c[w("0x6c", "ODm4")],
      i =
        Object.defineProperty ||
        function (n, r, t) {
          n[r] = t[w("0x6d", "rW[1")];
        },
      f = n[w("0x6e", "2KJ$")](n[w("0x6f", "f6eD")], typeof Symbol)
        ? Symbol
        : {},
      D = f[w("0x70", "dy^(")] || n[w("0x71", "rW[1")],
      C = f[w("0x72", "YjXZ")] || n.eJPDW,
      K = f[w("0x73", "oxtW")] || n.RuFQt;
    function a(n, r, t) {
      return (
        Object[w("0x74", "m6]f")](n, r, {
          value: t,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        }),
        n[r]
      );
    }
    try {
      n[w("0x75", "3vq)")](a, {}, "");
    } catch (n) {
      a = function (n, r, t) {
        return (n[r] = t);
      };
    }
    function s(n, r, t, e) {
      var o = r && x[w("0x76", "LULE")](r[w("0x77", "NSX(")], g) ? r : g,
        c = Object[w("0x78", "KMjo")](o[w("0x79", "nSnl")]),
        u = new U(e || []);
      return (
        x[w("0x7a", "9!Cb")](i, c, x[w("0x7b", "gR*a")], {
          value: x.XYhRQ(E, n, t, u),
        }),
        c
      );
    }
    function O(r, t, x) {
      try {
        return { type: n[w("0x7c", "oMSx")], arg: r[w("0x7d", "LcFT")](t, x) };
      } catch (r) {
        return { type: n[w("0x7e", "Z3hl")], arg: r };
      }
    }
    o[w("0x7f", "ij@X")] = s;
    var h = n[w("0x80", "YAHy")],
      M = n.dMNqq,
      p = n[w("0x81", "ROTc")],
      j = n[w("0x82", "rP^V")],
      b = {};
    function g() {}
    function l() {}
    function d() {}
    var q = {};
    n[w("0x83", "rP^V")](a, q, D, function () {
      return this;
    });
    var v = Object[w("0x84", "KMjo")],
      Y = v && n.gxaCR(v, n.nkLFa(v, n[w("0x85", "2KJ$")](F, [])));
    Y && n[w("0x86", "KMjo")](Y, c) && u.call(Y, D) && (q = Y);
    var A =
      (d[w("0x87", "D1CY")] =
      g[w("0x88", "Z3hl")] =
        Object[w("0x89", "ROTc")](q));
    function X(n) {
      var r = {
        MOEKj: function (n, r, t, e) {
          return x[w("0x8a", "ROTc")](n, r, t, e);
        },
      };
      [x[w("0x8b", "LULE")], x.bDabM, x[w("0x8c", "F4jE")]].forEach(function (
        t
      ) {
        r[w("0x8d", "VI(Y")](a, n, t, function (n) {
          return this[w("0x8e", "PB^i")](t, n);
        });
      });
    }
    function L(n, t) {
      var e,
        o = {
          nkZHj: function (n, r, t, e, o) {
            return x[w("0x8f", "ij@X")](n, r, t, e, o);
          },
          xoxhY: x[w("0x90", "37Y4")],
          soymx: function (n, r) {
            return x[w("0x91", "6%C4")](n, r);
          },
          sxNRx: function (n, r, t, e, o) {
            return x[w("0x92", "6%C4")](n, r, t, e, o);
          },
          iVzif: x[w("0x93", "9!Cb")],
          qbRlN: function (n, r, t, w) {
            return x.CkQqQ(n, r, t, w);
          },
          aBasn: function (n, r) {
            return x[w("0x94", "rI0h")](n, r);
          },
          rhSqo: function (n, r) {
            return x[w("0x95", "DDif")](n, r);
          },
          SaOYS: x[w("0x96", "6e96")],
          zclZa: x[w("0x97", "T2yh")],
          Aksoo: function (n, r) {
            return x[w("0x98", "ca1$")](n, r);
          },
        };
      function c(x, e, i, f) {
        var D = {
            SEbGU: function (n, r, t, x, e) {
              return o[w("0x99", "rW[1")](n, r, t, x, e);
            },
            pMlAQ: o[w("0x9a", "6e96")],
            gMPSa: o[w("0x9b", "ca1$")],
          },
          C = o.qbRlN(O, n[x], n, e);
        if (o.aBasn(o[w("0x9c", "rP^V")], C[w("0x9d", "2KJ$")])) {
          var K = C[w("0x9e", "NSX(")],
            a = K[w("0x9f", "ALX2")];
          return a &&
            o[w("0xa0", "DDif")](o.SaOYS, o[w("0xa1", "ODm4")](r, a)) &&
            u[w("0xa2", "ODm4")](a, o[w("0xa3", "YAHy")])
            ? t[w("0xa4", "m6]f")](a[w("0xa5", "ca1$")])[w("0xa6", "5@aF")](
                function (n) {
                  D[w("0xa7", "YAK]")](c, D[w("0xa8", "YAK]")], n, i, f);
                },
                function (n) {
                  o[w("0xa9", "dy^(")](c, o[w("0xaa", "LULE")], n, i, f);
                }
              )
            : t[w("0xab", "q5GC")](a)[w("0xac", "FEeG")](
                function (n) {
                  (K.value = n), o[w("0xad", "KMjo")](i, K);
                },
                function (n) {
                  return D.SEbGU(c, D[w("0xae", "Z3hl")], n, i, f);
                }
              );
        }
        o[w("0xaf", "F4jE")](f, C[w("0xb0", "ALX2")]);
      }
      x[w("0xb1", "9T4U")](i, this, x[w("0xb2", "qYUe")], {
        value: function (n, r) {
          var o = {
            BqBJV: function (n, r, t, e, o) {
              return x[w("0xb3", "lKUx")](n, r, t, e, o);
            },
          };
          function u() {
            var x = function (n, r, t, x, e) {
              return o[w("0xb4", "6e96")](n, r, t, x, e);
            };
            return new t(function (t, w) {
              x(c, n, r, t, w);
            });
          }
          return (e = e ? e.then(u, u) : x[w("0xb5", "$dVz")](u));
        },
      });
    }
    function E(r, t, x) {
      var o = {
          smajs: function (r, t) {
            return n.LtaQW(r, t);
          },
          xghGJ: function (r, t) {
            return n.FxXwt(r, t);
          },
          ogsBI: n.djdTU,
          WDIks: function (r, t) {
            return n[w("0xb6", "F4jE")](r, t);
          },
          Zylmk: n[w("0xb7", "T2yh")],
          eNzTG: function (r, t, x) {
            return n[w("0xb8", "6%C4")](r, t, x);
          },
          ZZJfm: function (r, t) {
            return n.zsLqa(r, t);
          },
          hQQuG: function (r, t) {
            return n.zsLqa(r, t);
          },
          PYDCD: n.QSFkK,
          kMFkz: function (r, t) {
            return n.zsLqa(r, t);
          },
          PwDQs: function (r, t) {
            return n[w("0xb9", "KMjo")](r, t);
          },
          ahKps: n.DmPYW,
          jpbxo: function (r, t, x, e) {
            return n[w("0xba", "KMjo")](r, t, x, e);
          },
          Oavhh: n[w("0xbb", "9!Cb")],
        },
        c = h;
      return function (n, u) {
        if (o[w("0xbc", "oMSx")](c, p))
          throw o[w("0xbd", "qYUe")](Error, o[w("0xbe", "5@aF")]);
        if (o.smajs(c, j)) {
          if (o[w("0xbf", "9!Cb")](o[w("0xc0", "oMSx")], n)) throw u;
          return { value: e, done: !0 };
        }
        for (x.method = n, x[w("0xc1", "m6]f")] = u; ; ) {
          var i = x[w("0xc2", "KMjo")];
          if (i) {
            var f = o[w("0xc3", "DDif")](T, i, x);
            if (f) {
              if (o[w("0xc4", "KMjo")](f, b)) continue;
              return f;
            }
          }
          if (o[w("0xc5", "rI0h")](o[w("0xc6", "F4jE")], x.method))
            x.sent = x[w("0xc7", "3G@R")] = x.arg;
          else if (o.kMFkz(o.Zylmk, x[w("0xc8", "2KJ$")])) {
            if (o[w("0xc9", "W752")](c, h))
              throw ((c = j), x[w("0xca", "VI(Y")]);
            x[w("0xcb", "YjXZ")](x[w("0xcc", "rW[1")]);
          } else
            o.PwDQs(o[w("0xcd", "YAK]")], x.method) &&
              x[w("0xce", "ALX2")](o[w("0xcf", "m6]f")], x.arg);
          c = p;
          var D = o[w("0xd0", "rP^V")](O, r, t, x);
          if (
            o[w("0xd1", "6%C4")](o[w("0xd2", "LULE")], D[w("0xd3", "Z3hl")])
          ) {
            if (
              ((c = x.done ? j : M),
              o[w("0xd4", "oMSx")](D[w("0xd5", "YAK]")], b))
            )
              continue;
            return { value: D.arg, done: x.done };
          }
          o.PwDQs(o.Zylmk, D[w("0xd6", "D1CY")]) &&
            ((c = j),
            (x[w("0xd7", "xVF(")] = o.Zylmk),
            (x[w("0xd8", "Z3hl")] = D[w("0xd9", "3G@R")]));
        }
      };
    }
    function T(r, t) {
      for (var x = n[w("0xda", "xVF(")].split("|"), o = 0; ; ) {
        switch (x[o++]) {
          case "0":
            if (n[w("0xdb", "m6]f")](i, e))
              return (
                (t[w("0xdc", "oxtW")] = null),
                (n[w("0xdd", "KMjo")](n[w("0xde", "oMSx")], u) &&
                  r[w("0xdf", "3vq)")][n[w("0xe0", "ROTc")]] &&
                  ((t[w("0xe1", "9T4U")] = n.DmPYW),
                  (t[w("0xe2", "6%C4")] = e),
                  n[w("0xe3", "q5GC")](T, r, t),
                  n.kFnXp(n[w("0xe4", "YAHy")], t[w("0xe5", "q5GC")]))) ||
                  (n[w("0xe6", "rI0h")](n[w("0xe7", "NSX(")], u) &&
                    ((t[w("0xe8", "F4jE")] = n[w("0xe9", "ALX2")]),
                    (t[w("0xea", "ODm4")] = new TypeError(
                      n[w("0xeb", "3vq)")](
                        n.hBFGt(n[w("0xec", "6e96")], u),
                        n.whtZA
                      )
                    )))),
                b
              );
            continue;
          case "1":
            return c
              ? c[w("0xed", "$dVz")]
                ? ((t[r[w("0xee", "37Y4")]] = c[w("0xef", "NSX(")]),
                  (t.next = r.nextLoc),
                  n[w("0x54", "PB^i")](
                    n[w("0xf0", "3vq)")],
                    t[w("0xf1", "$dVz")]
                  ) &&
                    ((t[w("0xc8", "2KJ$")] = n[w("0xf2", "rI0h")]),
                    (t.arg = e)),
                  (t[w("0xf3", "YAHy")] = null),
                  b)
                : c
              : ((t[w("0xf4", "f6eD")] = n[w("0xf5", "KMjo")]),
                (t[w("0xd5", "YAK]")] = new TypeError(n[w("0xf6", "3G@R")])),
                (t[w("0xf7", "ALX2")] = null),
                b);
          case "2":
            var c = f.arg;
            continue;
          case "3":
            var u = t.method,
              i = r[w("0xf8", "rI0h")][u];
            continue;
          case "4":
            if (
              n[w("0xf9", "2KJ$")](n[w("0xfa", "qYUe")], f[w("0xfb", "ALX2")])
            )
              return (
                (t[w("0xfc", "ij@X")] = n[w("0xfd", "D1CY")]),
                (t.arg = f[w("0xfe", "T2yh")]),
                (t[w("0xff", "37Y4")] = null),
                b
              );
            continue;
          case "5":
            var f = n[w("0x100", "VI(Y")](O, i, r[w("0x101", "6e96")], t.arg);
            continue;
        }
        break;
      }
    }
    function m(n) {
      var r = { tryLoc: n[0] };
      x[w("0x102", "ROTc")](1, n) && (r[w("0x103", "q5GC")] = n[1]),
        x[w("0x104", "nSnl")](2, n) &&
          ((r[w("0x105", "ALX2")] = n[2]), (r[w("0x106", "37Y4")] = n[3])),
        this.tryEntries[w("0x107", "X7LV")](r);
    }
    function S(n) {
      var r = n.completion || {};
      (r[w("0xfb", "ALX2")] = x[w("0x108", "YjXZ")]),
        delete r[w("0x109", "qYUe")],
        (n.completion = r);
    }
    function U(n) {
      (this.tryEntries = [{ tryLoc: x[w("0x10a", "6%C4")] }]),
        n[w("0x10b", "qYUe")](m, this),
        this[w("0x10c", "ij@X")](!0);
    }
    function F(n) {
      if (n || x[w("0x10d", "YAK]")]("", n)) {
        var t = n[D];
        if (t) return t[w("0x10e", "qYUe")](n);
        if (
          x[w("0x10f", "YjXZ")](
            x[w("0x110", "xVF(")],
            typeof n[w("0x111", "qYUe")]
          )
        )
          return n;
        if (!x[w("0x112", "lKUx")](isNaN, n[w("0x113", "oMSx")])) {
          var o = -1,
            c = function r() {
              for (; x[w("0x114", "xVF(")](++o, n[w("0x115", "D1CY")]); )
                if (u[w("0x116", "37Y4")](n, o))
                  return (r[w("0x117", "nSnl")] = n[o]), (r.done = !1), r;
              return (
                (r[w("0x118", "rI0h")] = e), (r[w("0x119", "oxtW")] = !0), r
              );
            };
          return (c.next = c);
        }
      }
      throw new TypeError(
        x[w("0x11a", "oMSx")](x.bWHdx(r, n), x[w("0x11b", "3vq)")])
      );
    }
    return (
      (l[w("0x11c", "2@^5")] = d),
      n[w("0x11d", "2KJ$")](i, A, n[w("0x11e", "hEqJ")], {
        value: d,
        configurable: !0,
      }),
      n[w("0x11f", "rW[1")](i, d, n.Rfgjb, { value: l, configurable: !0 }),
      (l[w("0x120", "W752")] = n[w("0x121", "X7LV")](a, d, K, n.YUTIM)),
      (o[w("0x122", "37Y4")] = function (r) {
        var t =
          n[w("0x123", "LULE")](n[w("0x124", "oMSx")], typeof r) &&
          r[w("0x125", "6%C4")];
        return (
          !!t &&
          (n.JZAZE(t, l) ||
            n.JZAZE(
              n[w("0x126", "X7LV")],
              t[w("0x127", "VI(Y")] || t[w("0x128", "LcFT")]
            ))
        );
      }),
      (o[w("0x129", "W752")] = function (n) {
        return (
          Object[w("0x12a", "lKUx")]
            ? Object[w("0x12b", "2KJ$")](n, d)
            : ((n[w("0x12c", "f6eD")] = d),
              x[w("0x12d", "DDif")](a, n, K, x.nEPnA)),
          (n.prototype = Object[w("0x12e", "VI(Y")](A)),
          n
        );
      }),
      (o[w("0x12f", "gR*a")] = function (n) {
        return { __await: n };
      }),
      n.TWoek(X, L.prototype),
      n[w("0x130", "d]]2")](a, L[w("0x131", "T2yh")], C, function () {
        return this;
      }),
      (o.AsyncIterator = L),
      (o[w("0x132", "ODm4")] = function (n, r, t, e, c) {
        x.ObmlY(void 0, c) && (c = Promise);
        var u = new L(x[w("0x133", "FEeG")](s, n, r, t, e), c);
        return o[w("0x134", "hEqJ")](r)
          ? u
          : u.next()[w("0x135", "oxtW")](function (n) {
              return n.done ? n[w("0x136", "FEeG")] : u[w("0x137", "D1CY")]();
            });
      }),
      n[w("0x138", "ODm4")](X, A),
      n[w("0x139", "W752")](a, A, K, n[w("0x13a", "T2yh")]),
      n.QEJfp(a, A, D, function () {
        return this;
      }),
      n.vOCGT(a, A, n[w("0x13b", "lKUx")], function () {
        return x[w("0x13c", "rP^V")];
      }),
      (o[w("0x13d", "37Y4")] = function (r) {
        var t = function (r, t) {
            return n[w("0x13e", "W752")](r, t);
          },
          x = n.wUwtu(Object, r),
          e = [];
        for (var o in x) e.push(o);
        return (
          e.reverse(),
          function n() {
            for (; e[w("0x13f", "YjXZ")]; ) {
              var r = e[w("0x140", "F4jE")]();
              if (t(r, x))
                return (
                  (n[w("0x141", "W752")] = r), (n[w("0x142", "KMjo")] = !1), n
                );
            }
            return (n[w("0x143", "9!Cb")] = !0), n;
          }
        );
      }),
      (o[w("0x144", "5@aF")] = F),
      (U[w("0x11c", "2@^5")] = {
        constructor: U,
        reset: function (n) {
          if (
            ((this[w("0x145", "T2yh")] = 0),
            (this.next = 0),
            (this[w("0x146", "FEeG")] = this._sent = e),
            (this[w("0x147", "T2yh")] = !1),
            (this[w("0x148", "W752")] = null),
            (this.method = x[w("0x149", "DDif")]),
            (this.arg = e),
            this[w("0x14a", "hEqJ")].forEach(S),
            !n)
          )
            for (var r in this)
              x[w("0x14b", "gR*a")]("t", r[w("0x14c", "ca1$")](0)) &&
                u.call(this, r) &&
                !x[w("0x14d", "W752")](isNaN, +r[w("0x14e", "ALX2")](1)) &&
                (this[r] = e);
        },
        stop: function () {
          this[w("0x14f", "F4jE")] = !0;
          var r = this[w("0x150", "rI0h")][0][w("0x151", "YAK]")];
          if (
            n[w("0x152", "3vq)")](n[w("0x153", "FEeG")], r[w("0x154", "PB^i")])
          )
            throw r[w("0xfe", "T2yh")];
          return this[w("0x155", "gR*a")];
        },
        dispatchException: function (r) {
          var t = {
            TdkWd: n[w("0x156", "6%C4")],
            mcXei: n[w("0x157", "3G@R")],
          };
          if (this[w("0x158", "d]]2")]) throw r;
          var x = this;
          function o(n, o) {
            return (
              (f[w("0x159", "$dVz")] = t.TdkWd),
              (f.arg = r),
              (x[w("0x15a", "d]]2")] = n),
              o &&
                ((x[w("0x15b", "oxtW")] = t[w("0x15c", "oMSx")]),
                (x[w("0x15d", "d]]2")] = e)),
              !!o
            );
          }
          for (
            var c = n[w("0x15e", "LULE")](this[w("0x15f", "f6eD")].length, 1);
            n[w("0x160", "NSX(")](c, 0);
            --c
          ) {
            var i = this[w("0x161", "6e96")][c],
              f = i[w("0x162", "ij@X")];
            if (n[w("0x163", "YAK]")](n[w("0x164", "KMjo")], i.tryLoc))
              return n.wUwtu(o, n.dOSTw);
            if (
              n[w("0x165", "LcFT")](
                i[w("0x166", "6%C4")],
                this[w("0x167", "VI(Y")]
              )
            ) {
              var D = u[w("0x168", "lKUx")](i, n[w("0x169", "Z3hl")]),
                C = u[w("0x16a", "ALX2")](i, n[w("0x16b", "ALX2")]);
              if (n[w("0x16c", "hEqJ")](D, C)) {
                if (
                  n[w("0x16d", "Z3hl")](
                    this[w("0x16e", "D1CY")],
                    i[w("0x16f", "rI0h")]
                  )
                )
                  return n.emAHe(o, i[w("0x170", "YAK]")], !0);
                if (
                  n[w("0x171", "D1CY")](
                    this[w("0x172", "ROTc")],
                    i[w("0x105", "ALX2")]
                  )
                )
                  return n[w("0x173", "d]]2")](o, i[w("0x174", "dy^(")]);
              } else if (D) {
                if (
                  n[w("0x175", "rI0h")](
                    this[w("0x167", "VI(Y")],
                    i[w("0x176", "FEeG")]
                  )
                )
                  return n.ldLyV(o, i[w("0x177", "37Y4")], !0);
              } else {
                if (!C) throw n[w("0x178", "d]]2")](Error, n.xtaXq);
                if (n.iojzU(this.prev, i.finallyLoc))
                  return n.KGsGS(o, i[w("0x179", "Z3hl")]);
              }
            }
          }
        },
        abrupt: function (n, r) {
          for (
            var t = x[w("0x17a", "37Y4")](
              this[w("0x17b", "xVF(")][w("0x17c", "Z3hl")],
              1
            );
            x.rJXii(t, 0);
            --t
          ) {
            var e = this[w("0x17d", "6%C4")][t];
            if (
              x[w("0x17e", "ca1$")](
                e[w("0x17f", "PB^i")],
                this[w("0x180", "YjXZ")]
              ) &&
              u[w("0x181", "6e96")](e, x[w("0x182", "dy^(")]) &&
              x.vphkm(this.prev, e[w("0x183", "d]]2")])
            ) {
              var o = e;
              break;
            }
          }
          o &&
            (x[w("0x184", "ALX2")](x.DHlqv, n) ||
              x[w("0x185", "2@^5")](x.cAwkH, n)) &&
            x[w("0x186", "rW[1")](o[w("0x187", "9!Cb")], r) &&
            x[w("0x188", "YAHy")](r, o[w("0x189", "KMjo")]) &&
            (o = null);
          var c = o ? o[w("0x18a", "rW[1")] : {};
          return (
            (c[w("0x18b", "9!Cb")] = n),
            (c[w("0x9e", "NSX(")] = r),
            o
              ? ((this[w("0x18c", "T2yh")] = x.afSQu),
                (this[w("0x18d", "6%C4")] = o[w("0x18e", "FEeG")]),
                b)
              : this[w("0x18f", "gR*a")](c)
          );
        },
        complete: function (r, t) {
          if (
            n[w("0x190", "KMjo")](n[w("0x191", "2KJ$")], r[w("0x192", "LcFT")])
          )
            throw r[w("0x193", "KMjo")];
          return (
            n[w("0x194", "9T4U")](
              n[w("0x195", "6e96")],
              r[w("0x196", "xVF(")]
            ) ||
            n[w("0x197", "oxtW")](n[w("0x198", "m6]f")], r[w("0x199", "DDif")])
              ? (this.next = r[w("0x19a", "LcFT")])
              : n[w("0x19b", "dy^(")](n.DmPYW, r[w("0x19c", "oMSx")])
              ? ((this[w("0x19d", "rI0h")] = this.arg = r[w("0x19e", "D1CY")]),
                (this[w("0x19f", "gR*a")] = n[w("0x1a0", "gR*a")]),
                (this.next = n[w("0x1a1", "9T4U")]))
              : n[w("0x1a2", "YAHy")](n[w("0x1a3", "lKUx")], r.type) &&
                t &&
                (this[w("0x1a4", "NSX(")] = t),
            b
          );
        },
        finish: function (r) {
          for (
            var t = n[w("0x1a5", "q5GC")](
              this[w("0x1a6", "F4jE")][w("0x1a7", "F4jE")],
              1
            );
            n[w("0x1a8", "rW[1")](t, 0);
            --t
          ) {
            var x = this[w("0x1a9", "LcFT")][t];
            if (n[w("0x1aa", "oxtW")](x[w("0x1ab", "W752")], r))
              return (
                this[w("0x1ac", "YAHy")](x[w("0x1ad", "LULE")], x.afterLoc),
                n[w("0x1ae", "dy^(")](S, x),
                b
              );
          }
        },
        catch: function (r) {
          for (
            var t = n[w("0x1af", "3vq)")](
              this[w("0x1b0", "ROTc")][w("0x1b1", "37Y4")],
              1
            );
            n[w("0x1b2", "YAK]")](t, 0);
            --t
          ) {
            var x = this[w("0x1b3", "2KJ$")][t];
            if (n[w("0x1b4", "q5GC")](x[w("0x1b5", "9T4U")], r)) {
              var e = x[w("0x1b6", "VI(Y")];
              if (
                n[w("0x1b7", "6e96")](
                  n[w("0xe4", "YAHy")],
                  e[w("0x196", "xVF(")]
                )
              ) {
                var o = e[w("0x1b8", "FEeG")];
                n[w("0x1b9", "YAHy")](S, x);
              }
              return o;
            }
          }
          throw n[w("0x1ba", "YjXZ")](Error, n[w("0x1bb", "2@^5")]);
        },
        delegateYield: function (r, t, x) {
          return (
            (this[w("0x1bc", "YAK]")] = {
              iterator: n[w("0x1bd", "LULE")](F, r),
              resultName: t,
              nextLoc: x,
            }),
            n[w("0x1be", "DDif")](n.QSFkK, this[w("0x1bf", "lKUx")]) &&
              (this[w("0x9e", "NSX(")] = e),
            b
          );
        },
      }),
      o
    );
  }
  function x(r, t) {
    return (
      n.frqai(i, r) ||
      n[w("0x1c0", "Z3hl")](u, r, t) ||
      n[w("0x1c1", "6%C4")](o, r, t) ||
      n[w("0x1c2", "D1CY")](e)
    );
  }
  function e() {
    throw new TypeError(n[w("0x1c3", "rW[1")]);
  }
  function o(r, t) {
    if (r) {
      if (n[w("0x1c4", "3G@R")](n[w("0x1c5", "6e96")], typeof r))
        return n[w("0x1c6", "oxtW")](c, r, t);
      var x = {}[w("0x1c7", "rI0h")]
        [w("0x1c8", "D1CY")](r)
        [w("0x1c9", "Z3hl")](8, -1);
      return (
        n.wScGX(n[w("0x1ca", "rP^V")], x) &&
          r[w("0x1cb", "ca1$")] &&
          (x = r[w("0x1cc", "ALX2")][w("0x1cd", "rP^V")]),
        n.wScGX(n[w("0x1ce", "5@aF")], x) || n[w("0x1cf", "lKUx")](n.OeFKh, x)
          ? Array.from(r)
          : n[w("0x1cf", "lKUx")](n.cKufR, x) ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(x)
          ? n[w("0x1d0", "3G@R")](c, r, t)
          : void 0
      );
    }
  }
  function c(r, t) {
    (n.QfxJN(null, t) || n[w("0x1d1", "NSX(")](t, r[w("0x1d2", "PB^i")])) &&
      (t = r.length);
    for (var x = 0, e = n[w("0x1d3", "2@^5")](Array, t); n.bGsPX(x, t); x++)
      e[x] = r[x];
    return e;
  }
  function u(r, t) {
    var x = n.QfxJN(null, r)
      ? null
      : (n[w("0x1d4", "YjXZ")](n[w("0x1d5", "qYUe")], typeof Symbol) &&
          r[Symbol[w("0x1d6", "v8Fn")]]) ||
        r[n[w("0x1d7", "ODm4")]];
    if (n[w("0x1d8", "KMjo")](null, x)) {
      var e,
        o,
        c,
        u,
        i = [],
        f = !0,
        D = !1;
      try {
        if (
          ((c = (x = x[w("0x181", "6e96")](r))[w("0x1d9", "gR*a")]),
          n[w("0x1da", "NSX(")](0, t))
        ) {
          if (n[w("0x1db", "$dVz")](n[w("0x1dc", "f6eD")](Object, x), x))
            return;
          f = !1;
        } else
          for (
            ;
            !(f = (e = c[w("0x1dd", "NSX(")](x))[w("0x1de", "3G@R")]) &&
            (i[w("0x1df", "d]]2")](e.value),
            n[w("0x1e0", "DDif")](i.length, t));
            f = !0
          );
      } catch (n) {
        (D = !0), (o = n);
      } finally {
        try {
          if (
            !f &&
            n.Gnhcr(null, x[n[w("0x1e1", "oMSx")]]) &&
            ((u = x[n[w("0x1e2", "m6]f")]]()),
            n.JNyez(n[w("0x1e3", "6%C4")](Object, u), u))
          )
            return;
        } finally {
          if (D) throw o;
        }
      }
      return i;
    }
  }
  function i(n) {
    if (Array[w("0x1e4", "2@^5")](n)) return n;
  }
  function f(r, t, x, e, o, c, u) {
    try {
      var i = r[c](u),
        f = i[w("0x9f", "ALX2")];
    } catch (r) {
      return void n.gIlfK(x, r);
    }
    i[w("0x1e5", "f6eD")]
      ? n[w("0x1e6", "ca1$")](t, f)
      : Promise.resolve(f)[w("0x1e7", "ij@X")](e, o);
  }
  function D(r) {
    var t = {
      iKkfI: function (r, t, w, x, e, o, c, u) {
        return n.aRXyA(r, t, w, x, e, o, c, u);
      },
      DYSsb: n[w("0x1e8", "YjXZ")],
      OLKcb: n[w("0x1e9", "Z3hl")],
      hbcLL: function (r, t) {
        return n.gIlfK(r, t);
      },
    };
    return function () {
      var n = {
          GUypO: function (n, r, w, x, e, o, c, u) {
            return t.iKkfI(n, r, w, x, e, o, c, u);
          },
          PLyua: t[w("0x1ea", "$dVz")],
          Myugi: function (n, r, x, e, o, c, u, i) {
            return t[w("0x1eb", "rI0h")](n, r, x, e, o, c, u, i);
          },
          ulqrV: t[w("0x1ec", "nSnl")],
          jydvp: function (n, r) {
            return t[w("0x1ed", "ALX2")](n, r);
          },
        },
        x = this,
        e = arguments;
      return new Promise(function (t, o) {
        var c = {
            hGIYP: function (r, t, x, e, o, c, u, i) {
              return n[w("0x1ee", "2@^5")](r, t, x, e, o, c, u, i);
            },
            KmkJX: n[w("0x1ef", "q5GC")],
          },
          u = r.apply(x, e);
        function i(n) {
          c[w("0x1f0", "5@aF")](f, u, t, o, i, D, c.KmkJX, n);
        }
        function D(r) {
          n[w("0x1f1", "LULE")](f, u, t, o, i, D, n.PLyua, r);
        }
        n[w("0x1f2", "YAK]")](i, void 0);
      });
    };
  }
  var C = new Env(n[w("0x1f3", "6e96")]),
    K = n[w("0x1f4", "9!Cb")][w("0x1f5", "qYUe")](
      C[w("0x1f6", "FEeG")](n[w("0x1f7", "q5GC")]),
      n[w("0x1f8", "3vq)")]
    ),
    a = C[w("0x1f9", "9!Cb")]() ? n[w("0x1fa", "Z3hl")] : n.UMfOL,
    s = n[w("0x1fb", "YAHy")](typeof $response, n[w("0x1fc", "PB^i")]),
    O = s
      ? {
          status: C[w("0x1fd", "lKUx")]() ? n[w("0x1fe", "2@^5")] : 200,
          headers: n[w("0x1ff", "hEqJ")](typeof $request, n.gKRfI)
            ? {}
            : $request[w("0x200", "xVF(")],
          body: "",
        }
      : $response;
  function h(r) {
    for (var t = n[w("0x267", "$dVz")][w("0x268", "9!Cb")]("|"), x = 0; ; ) {
      switch (t[x++]) {
        case "0":
          var e = n[w("0x269", "YAHy")](btoa, o);
          continue;
        case "1":
          var o = "";
          continue;
        case "2":
          var c = new Uint8Array(r);
          continue;
        case "3":
          for (var u = 0; n[w("0x26a", "37Y4")](u, c[w("0x26b", "6e96")]); u++)
            o += String.fromCharCode(c[u]);
          continue;
        case "4":
          return e;
      }
      break;
    }
  }
  function M(r) {
    for (
      var t = n.NbHqu(atob, r),
        x = new Uint8Array(t[w("0x26c", "ca1$")]),
        e = 0;
      n[w("0x26d", "ca1$")](e, t[w("0x26e", "m6]f")]);
      e++
    )
      x[e] = t[w("0x26f", "YAHy")](e);
    return x;
  }
  function p() {
    return j[w("0x270", "ca1$")](this, arguments);
  }
  function j() {
    var r = {
      dXZZm: function (r, t) {
        return n[w("0x271", "lKUx")](r, t);
      },
      IqjME: n[w("0x272", "D1CY")],
      msusv: n.DmPYW,
      VlJVS: n[w("0x273", "T2yh")],
      pcCXE: function (r) {
        return n.lbqcy(r);
      },
    };
    return (j = n[w("0x274", "$dVz")](
      D,
      n[w("0x275", "ROTc")](t)[w("0x276", "v8Fn")](function n() {
        var x, e;
        return r[w("0x277", "9T4U")](t).wrap(function (n) {
          for (;;)
            switch ((n[w("0x278", "9T4U")] = n[w("0x279", "oxtW")])) {
              case 0:
                return (
                  (x = $request[w("0x27a", "ca1$")][w("0x27b", "T2yh")]()),
                  (e = {
                    url: $request.url,
                    headers: $request[w("0x27c", "q5GC")],
                  }),
                  r[w("0x27d", "FEeG")](x, r[w("0x27e", "W752")]) &&
                    Object[w("0x27f", "9!Cb")](e, {
                      body: $request[w("0x251", "d]]2")],
                    }),
                  (n[w("0x280", "rI0h")] = 5),
                  C[w("0x281", "6e96")][x]
                );
              case 5:
                return n.abrupt(r[w("0x282", "ROTc")], n[w("0x283", "X7LV")]);
              case 6:
              case r[w("0x284", "6e96")]:
                return n[w("0x285", "ALX2")]();
            }
        }, n);
      })
    ))[w("0x286", "q5GC")](this, arguments);
  }
  function b() {
    return g.apply(this, arguments);
  }
  function g() {
    var r = {
      VrPNR: function (r) {
        return n[w("0x287", "3G@R")](r);
      },
      qNnwM: n[w("0x288", "DDif")],
    };
    return (g = n[w("0x289", "hEqJ")](
      D,
      n.McvvL(t)[w("0x28a", "f6eD")](function n() {
        var x;
        return r[w("0x28b", "d]]2")](t)[w("0x28c", "gR*a")](function (n) {
          for (;;)
            switch ((n[w("0x28d", "gR*a")] = n[w("0x28e", "3G@R")])) {
              case 0:
                if (!s) {
                  n[w("0x221", "q5GC")] = 9;
                  break;
                }
                if (O[w("0x28f", "PB^i")] || O[w("0x290", "9T4U")]) {
                  n[w("0x291", "f6eD")] = 6;
                  break;
                }
                return (n[w("0x1d9", "gR*a")] = 4), r.VrPNR(p);
              case 4:
                (x = n[w("0x292", "oxtW")]),
                  Object[w("0x293", "LcFT")](x, {
                    body: x[w("0x294", "FEeG")],
                    headers: x.headers,
                  });
              case 6:
                C[w("0x295", "D1CY")](
                  C[w("0x296", "5@aF")]() ? O : { response: O }
                ),
                  (n.next = 10);
                break;
              case 9:
                C.done(O);
              case 10:
              case r.qNnwM:
                return n[w("0x297", "m6]f")]();
            }
        }, n);
      })
    ))[w("0x298", "oxtW")](this, arguments);
  }
  function l() {
    return d[w("0x299", "D1CY")](this, arguments);
  }
  function d() {
    return (d = n.nEQra(
      D,
      n.McvvL(t)[w("0x25f", "lKUx")](function r() {
        var x,
          e,
          o,
          c,
          u,
          i = {
            rahWS: n[w("0x29a", "9!Cb")],
            IgHfa: n[w("0x29b", "FEeG")],
            MwkHr: n[w("0x29c", "v8Fn")],
            klrqa: n[w("0x29d", "d]]2")],
            hEmkn: n.raZop,
            zhlgD: n[w("0x29e", "2@^5")],
            MeIrd: n[w("0x29f", "ij@X")],
            fXOJS: n[w("0x2a0", "DDif")],
            jOyfH: n[w("0x2a1", "NSX(")],
            hELei: n[w("0x2a2", "NSX(")],
            bsXRu: n.CMLzl,
            zVeCd: n.TFqPK,
            SjkWt: n.TdMJc,
            XBBMs: n[w("0x2a3", "9T4U")],
            ZyaEW: function (r, t) {
              return n[w("0x2a4", "6%C4")](r, t);
            },
            RiiqQ: n[w("0x2a5", "dy^(")],
            oXGZZ: n[w("0x2a6", "ROTc")],
            uVmpi: n[w("0x2a7", "f6eD")],
            xufmb: n[w("0x2a8", "dy^(")],
          };
        return n[w("0x2a9", "q5GC")](t)[w("0x28c", "gR*a")](
          function (n) {
            for (;;)
              switch ((n[w("0x219", "KMjo")] = n[w("0x2aa", "rP^V")])) {
                case 0:
                  return (
                    (x = [
                      i[w("0x2ab", "Z3hl")],
                      i[w("0x2ac", "2KJ$")],
                      i[w("0x2ad", "3vq)")],
                      i[w("0x2ae", "2KJ$")],
                      i[w("0x2af", "KMjo")],
                      i[w("0x2b0", "F4jE")],
                      i[w("0x2b1", "6%C4")],
                      i[w("0x2b2", "PB^i")],
                    ]),
                    (e = i[w("0x2b3", "hEqJ")]),
                    (n[w("0x2b4", "FEeG")] = 2),
                    (n[w("0x18d", "6%C4")] = 5),
                    C[w("0x2b5", "gR*a")][w("0x2b6", "rP^V")](e)
                  );
                case 5:
                  (o = n[w("0x265", "DDif")]),
                    (c = o[w("0x2b7", "LULE")]),
                    (x = C.toObj(c)),
                    C.log(i[w("0x2b8", "D1CY")]),
                    (n[w("0x21d", "YAHy")] = 14);
                  break;
                case 11:
                  (n[w("0x2b9", "2@^5")] = 11),
                    (n.t0 = n[i[w("0x2ba", "2KJ$")]](2)),
                    C.log(i[w("0x2bb", "PB^i")]);
                case 14:
                  return (
                    C.setdata(i[w("0x2bc", "ij@X")], K),
                    (u = C.time(
                      i[w("0x2bd", "oxtW")],
                      new Date(
                        new Date()[w("0x2be", "xVF(")](
                          i[w("0x2bf", "lKUx")](
                            new Date()[w("0x2c0", "T2yh")](),
                            1
                          )
                        )
                      )
                    )),
                    C[w("0x2c1", "FEeG")](
                      null,
                      i[w("0x2c2", "rP^V")][w("0x2c3", "lKUx")](u, i.oXGZZ)
                    ),
                    n.abrupt(i[w("0x2c4", "nSnl")], x[w("0x2c5", "ij@X")]("\n"))
                  );
                case 18:
                case i[w("0x2c6", "6e96")]:
                  return n[w("0x2c7", "D1CY")]();
              }
          },
          r,
          null,
          [[2, 11]]
        );
      })
    ))[w("0x2c8", "gR*a")](this, arguments);
  }
  n[w("0x201", "YjXZ")](
    D,
    n[w("0x202", "$dVz")](t)[w("0x203", "oxtW")](function r() {
      var e,
        o,
        c,
        u,
        i,
        f,
        D,
        p,
        j,
        g,
        d,
        q,
        v = {
          PCecR: function (r, t, w) {
            return n.xvRtT(r, t, w);
          },
          DzFjI: function (r, t) {
            return n[w("0x204", "T2yh")](r, t);
          },
          nYcea: n.TdMJc,
          kICIb: n[w("0x205", "W752")],
          sGqDn: function (r) {
            return n[w("0x206", "2@^5")](r);
          },
          OZjkH: n[w("0x207", "6e96")],
          ttEBK: n[w("0x208", "3vq)")],
          WYfKW: n[w("0x209", "ij@X")],
          EqTlq: function (r, t) {
            return n[w("0x20a", "T2yh")](r, t);
          },
          jURNy: function (r, t) {
            return n[w("0x20b", "F4jE")](r, t);
          },
          YoXpX: n.hmsrf,
          fXhKg: n[w("0x20c", "oMSx")],
          ESCfL: function (r, t) {
            return n[w("0x20d", "dy^(")](r, t);
          },
          efCQQ: n[w("0x20e", "ij@X")],
          mzRib: n[w("0x20f", "KMjo")],
          mlzaH: function (r, t) {
            return n[w("0x210", "ROTc")](r, t);
          },
          DtSed: function (r, t) {
            return n.klgWg(r, t);
          },
          IPNEN: function (r, t) {
            return n[w("0x211", "ALX2")](r, t);
          },
          IrlZj: function (r, t) {
            return n[w("0x212", "NSX(")](r, t);
          },
          FsnHy: function (r, t) {
            return n[w("0x213", "nSnl")](r, t);
          },
          kpJtg: n[w("0x214", "$dVz")],
          uKTUM: n[w("0x215", "ij@X")],
          oBNQF: n[w("0x216", "gR*a")],
          zBwEO: n.dOSTw,
        };
      return n[w("0x217", "FEeG")](t)[w("0x218", "6%C4")](
        function (n) {
          for (
            var r = function (n, r, t) {
              return v.PCecR(n, r, t);
            };
            ;

          )
            switch ((n[w("0x219", "KMjo")] = n[w("0x21a", "dy^(")])) {
              case 0:
                if (
                  !v[w("0x21b", "D1CY")](C.getdata(K), v[w("0x21c", "F4jE")])
                ) {
                  n[w("0x21d", "YAHy")] = 4;
                  break;
                }
                C[w("0x21e", "YAK]")](v[w("0x21f", "6e96")]),
                  (n[w("0x220", "9T4U")] = 11);
                break;
              case 4:
                return (
                  (n.t0 = C),
                  (n.t1 = C.name),
                  (n[w("0x221", "q5GC")] = 8),
                  v[w("0x222", "rP^V")](l)
                );
              case 8:
                (n.t2 = n[w("0x223", "hEqJ")]),
                  (n.t3 = {
                    $open: v[w("0x224", "6%C4")],
                    $media: v[w("0x225", "NSX(")],
                  }),
                  n.t0.msg[w("0x226", "3G@R")](n.t0, n.t1, v.WYfKW, n.t2, n.t3);
              case 11:
                return (
                  s ||
                    ((o = Object.fromEntries(
                      Object[w("0x227", "ODm4")]($response[w("0x228", "FEeG")])[
                        w("0x229", "LcFT")
                      ](function (n) {
                        var t = r(x, n, 2),
                          e = t[0],
                          o = t[1];
                        return [e[w("0x22a", "6%C4")](), o];
                      })
                    )),
                    (v[w("0x22b", "NSX(")](o, null) &&
                      v[w("0x22c", "$dVz")](o, void 0) &&
                      v[w("0x22d", "F4jE")]((e = o[v.YoXpX]), null) &&
                      v[w("0x22e", "d]]2")](e, void 0) &&
                      e[w("0x22f", "rI0h")](v[w("0x230", "YjXZ")])) ||
                      (C[w("0x231", "oxtW")]() &&
                        !$response[w("0x232", "PB^i")] &&
                        C[w("0x233", "9T4U")]({}),
                      $response[w("0x234", "6%C4")] ||
                        C[w("0x235", "PB^i")]({}))),
                  (n.prev = 12),
                  (c = v[w("0x236", "W752")](
                    h,
                    (C[w("0x237", "ij@X")]() ? O.bodyBytes : O.body) || ""
                  )),
                  (u = $request.url.replace(
                    /^(?:https?:\/\/)?(?:www\.)?[^\/]+(\/[^?#]*)?.*$/,
                    "$1"
                  )),
                  (i = {
                    url: ""[w("0x238", "KMjo")](a),
                    headers: {
                      "x-id": v.efCQQ,
                      "Content-Type": v[w("0x239", "gR*a")],
                      "x-tools-id": v[w("0x23a", "ROTc")](
                        encodeURIComponent,
                        C[w("0x23b", "ca1$")]()
                      ),
                    },
                    body: C[w("0x23c", "ALX2")]({
                      params: s
                        ? v[w("0x23d", "2@^5")](
                            btoa,
                            v[w("0x23e", "9!Cb")](
                              encodeURIComponent,
                              C[w("0x23f", "W752")]({
                                url: $request[w("0x240", "qYUe")],
                                method: $request[w("0xfc", "ij@X")],
                                data: $request[w("0x241", "f6eD")],
                              })
                            )
                          )
                        : c,
                      path: v[w("0x242", "$dVz")](
                        btoa,
                        v[w("0x243", "LcFT")](encodeURIComponent, u)
                      ),
                    }),
                  }),
                  (n[w("0x244", "VI(Y")] = 18),
                  C[w("0x245", "LULE")][w("0x246", "v8Fn")](i)
                );
              case 18:
                (f = n.sent),
                  (D = f[w("0x247", "YAHy")]),
                  (p = C[w("0x248", "rP^V")](D)),
                  (j = p[w("0x249", "5@aF")]),
                  (g = p[w("0x24a", "ROTc")]),
                  (d = p.message),
                  v[w("0x24b", "m6]f")](j, 200)
                    ? ((q = v[w("0x24c", "6%C4")](M, g)),
                      C[w("0x24d", "gR*a")]()
                        ? ((O[w("0x24e", "NSX(")] = q[w("0x24f", "f6eD")]),
                          delete O[w("0x250", "ALX2")])
                        : (O[w("0x251", "d]]2")] = q),
                      v.sGqDn(b))
                    : C[w("0x252", "W752")](
                        v[w("0x253", "5@aF")][w("0x254", "Z3hl")](d)
                      ),
                  (n.next = 28);
                break;
              case 24:
                (n.prev = 24),
                  (n.t4 = n[v[w("0x255", "f6eD")]](12)),
                  C[w("0x256", "PB^i")](
                    v[w("0x257", "W752")],
                    n.t4[w("0x258", "DDif")]
                  );
              case 28:
              case v.zBwEO:
                return n[w("0x259", "PB^i")]();
            }
        },
        r,
        null,
        [[12, 24]]
      );
    })
  )()
    [n[w("0x25a", "5@aF")]](function (n) {
      return C[w("0x25b", "2KJ$")](n);
    })
    [n[w("0x25c", "oxtW")]](
      n[w("0x25d", "F4jE")](
        D,
        n[w("0x25e", "ALX2")](t)[w("0x25f", "lKUx")](function r() {
          return n[w("0x260", "oMSx")](t)[w("0x261", "3G@R")](function (r) {
            for (;;)
              switch ((r.prev = r.next)) {
                case 0:
                  return (r[w("0x262", "rW[1")] = 2), n[w("0x263", "rW[1")](b);
                case 2:
                  return r[w("0x264", "gR*a")](n.DmPYW, r[w("0x265", "DDif")]);
                case 3:
                case n.dOSTw:
                  return r[w("0x266", "ODm4")]();
              }
          }, r);
        })
      )
    );
})();
// prettier-ignore
function Env(t, e) {
  class s {
    constructor(t) {
      this.env = t;
    }
    send(t, e = "GET") {
      t = "string" == typeof t ? { url: t } : t;
      let s = this.get;
      "POST" === e && (s = this.post);
      const i = new Promise((e, i) => {
        s.call(this, t, (t, s, o) => {
          t ? i(t) : e(s);
        });
      });
      return t.timeout
        ? ((t, e = 1e3) =>
            Promise.race([
              t,
              new Promise((t, s) => {
                setTimeout(() => {
                  s(new Error("请求超时"));
                }, e);
              }),
            ]))(i, t.timeout)
        : i;
    }
    get(t) {
      return this.send.call(this.env, t);
    }
    post(t) {
      return this.send.call(this.env, t, "POST");
    }
  }
  return new (class {
    constructor(t, e) {
      (this.logLevels = { debug: 0, info: 1, warn: 2, error: 3 }),
        (this.logLevelPrefixs = {
          debug: "[DEBUG] ",
          info: "[INFO] ",
          warn: "[WARN] ",
          error: "[ERROR] ",
        }),
        (this.logLevel = "info"),
        (this.name = t),
        (this.http = new s(this)),
        (this.data = null),
        (this.dataFile = "box.dat"),
        (this.logs = []),
        (this.isMute = !1),
        (this.isNeedRewrite = !1),
        (this.logSeparator = "\n"),
        (this.encoding = "utf-8"),
        (this.startTime = new Date().getTime()),
        Object.assign(this, e),
        this.log("", `🔔${this.name}, 开始!`);
    }
    getEnv() {
      return "undefined" != typeof $environment && $environment["surge-version"]
        ? "Surge"
        : "undefined" != typeof $environment && $environment["stash-version"]
        ? "Stash"
        : "undefined" != typeof module && module.exports
        ? "Node.js"
        : "undefined" != typeof $task
        ? "Quantumult X"
        : "undefined" != typeof $loon
        ? "Loon"
        : "undefined" != typeof $rocket
        ? "Shadowrocket"
        : void 0;
    }
    isNode() {
      return "Node.js" === this.getEnv();
    }
    isQuanX() {
      return "Quantumult X" === this.getEnv();
    }
    isSurge() {
      return "Surge" === this.getEnv();
    }
    isLoon() {
      return "Loon" === this.getEnv();
    }
    isShadowrocket() {
      return "Shadowrocket" === this.getEnv();
    }
    isStash() {
      return "Stash" === this.getEnv();
    }
    toObj(t, e = null) {
      try {
        return JSON.parse(t);
      } catch {
        return e;
      }
    }
    toStr(t, e = null, ...s) {
      try {
        return JSON.stringify(t, ...s);
      } catch {
        return e;
      }
    }
    getjson(t, e) {
      let s = e;
      if (this.getdata(t))
        try {
          s = JSON.parse(this.getdata(t));
        } catch {}
      return s;
    }
    setjson(t, e) {
      try {
        return this.setdata(JSON.stringify(t), e);
      } catch {
        return !1;
      }
    }
    getScript(t) {
      return new Promise((e) => {
        this.get({ url: t }, (t, s, i) => e(i));
      });
    }
    runScript(t, e) {
      return new Promise((s) => {
        let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        i = i ? i.replace(/\n/g, "").trim() : i;
        let o = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        (o = o ? 1 * o : 20), (o = e && e.timeout ? e.timeout : o);
        const [r, a] = i.split("@"),
          n = {
            url: `http://${a}/v1/scripting/evaluate`,
            body: { script_text: t, mock_type: "cron", timeout: o },
            headers: { "X-Key": r, Accept: "*/*" },
            policy: "DIRECT",
            timeout: o,
          };
        this.post(n, (t, e, i) => s(i));
      }).catch((t) => this.logErr(t));
    }
    loaddata() {
      if (!this.isNode()) return {};
      {
        (this.fs = this.fs ? this.fs : require("fs")),
          (this.path = this.path ? this.path : require("path"));
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e);
        if (!s && !i) return {};
        {
          const i = s ? t : e;
          try {
            return JSON.parse(this.fs.readFileSync(i));
          } catch (t) {
            return {};
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        (this.fs = this.fs ? this.fs : require("fs")),
          (this.path = this.path ? this.path : require("path"));
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e),
          o = JSON.stringify(this.data);
        s
          ? this.fs.writeFileSync(t, o)
          : i
          ? this.fs.writeFileSync(e, o)
          : this.fs.writeFileSync(t, o);
      }
    }
    lodash_get(t, e, s) {
      const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
      let o = t;
      for (const t of i) if (((o = Object(o)[t]), void 0 === o)) return s;
      return o;
    }
    lodash_set(t, e, s) {
      return (
        Object(t) !== t ||
          (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []),
          (e
            .slice(0, -1)
            .reduce(
              (t, s, i) =>
                Object(t[s]) === t[s]
                  ? t[s]
                  : (t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}),
              t
            )[e[e.length - 1]] = s)),
        t
      );
    }
    getdata(t) {
      let e = this.getval(t);
      if (/^@/.test(t)) {
        const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
          o = s ? this.getval(s) : "";
        if (o)
          try {
            const t = JSON.parse(o);
            e = t ? this.lodash_get(t, i, "") : e;
          } catch (t) {
            e = "";
          }
      }
      return e;
    }
    setdata(t, e) {
      let s = !1;
      if (/^@/.test(e)) {
        const [, i, o] = /^@(.*?)\.(.*?)$/.exec(e),
          r = this.getval(i),
          a = i ? ("null" === r ? null : r || "{}") : "{}";
        try {
          const e = JSON.parse(a);
          this.lodash_set(e, o, t), (s = this.setval(JSON.stringify(e), i));
        } catch (e) {
          const r = {};
          this.lodash_set(r, o, t), (s = this.setval(JSON.stringify(r), i));
        }
      } else s = this.setval(t, e);
      return s;
    }
    getval(t) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
          return $persistentStore.read(t);
        case "Quantumult X":
          return $prefs.valueForKey(t);
        case "Node.js":
          return (this.data = this.loaddata()), this.data[t];
        default:
          return (this.data && this.data[t]) || null;
      }
    }
    setval(t, e) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
          return $persistentStore.write(t, e);
        case "Quantumult X":
          return $prefs.setValueForKey(t, e);
        case "Node.js":
          return (
            (this.data = this.loaddata()),
            (this.data[e] = t),
            this.writedata(),
            !0
          );
        default:
          return (this.data && this.data[e]) || null;
      }
    }
    initGotEnv(t) {
      (this.got = this.got ? this.got : require("got")),
        (this.cktough = this.cktough ? this.cktough : require("tough-cookie")),
        (this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar()),
        t &&
          ((t.headers = t.headers ? t.headers : {}),
          t &&
            ((t.headers = t.headers ? t.headers : {}),
            void 0 === t.headers.cookie &&
              void 0 === t.headers.Cookie &&
              void 0 === t.cookieJar &&
              (t.cookieJar = this.ckjar)));
    }
    get(t, e = () => {}) {
      switch (
        (t.headers &&
          (delete t.headers["Content-Type"],
          delete t.headers["Content-Length"],
          delete t.headers["content-type"],
          delete t.headers["content-length"]),
        t.params && (t.url += "?" + this.queryStr(t.params)),
        void 0 === t.followRedirect ||
          t.followRedirect ||
          ((this.isSurge() || this.isLoon()) && (t["auto-redirect"] = !1),
          this.isQuanX() &&
            (t.opts
              ? (t.opts.redirection = !1)
              : (t.opts = { redirection: !1 }))),
        this.getEnv())
      ) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        default:
          this.isSurge() &&
            this.isNeedRewrite &&
            ((t.headers = t.headers || {}),
            Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })),
            $httpClient.get(t, (t, s, i) => {
              !t &&
                s &&
                ((s.body = i),
                (s.statusCode = s.status ? s.status : s.statusCode),
                (s.status = s.statusCode)),
                e(t, s, i);
            });
          break;
        case "Quantumult X":
          this.isNeedRewrite &&
            ((t.opts = t.opts || {}), Object.assign(t.opts, { hints: !1 })),
            $task.fetch(t).then(
              (t) => {
                const {
                  statusCode: s,
                  statusCode: i,
                  headers: o,
                  body: r,
                  bodyBytes: a,
                } = t;
                e(
                  null,
                  {
                    status: s,
                    statusCode: i,
                    headers: o,
                    body: r,
                    bodyBytes: a,
                  },
                  r,
                  a
                );
              },
              (t) => e((t && t.error) || "UndefinedError")
            );
          break;
        case "Node.js":
          let s = require("iconv-lite");
          this.initGotEnv(t),
            this.got(t)
              .on("redirect", (t, e) => {
                try {
                  if (t.headers["set-cookie"]) {
                    const s = t.headers["set-cookie"]
                      .map(this.cktough.Cookie.parse)
                      .toString();
                    s && this.ckjar.setCookieSync(s, null),
                      (e.cookieJar = this.ckjar);
                  }
                } catch (t) {
                  this.logErr(t);
                }
              })
              .then(
                (t) => {
                  const {
                      statusCode: i,
                      statusCode: o,
                      headers: r,
                      rawBody: a,
                    } = t,
                    n = s.decode(a, this.encoding);
                  e(
                    null,
                    {
                      status: i,
                      statusCode: o,
                      headers: r,
                      rawBody: a,
                      body: n,
                    },
                    n
                  );
                },
                (t) => {
                  const { message: i, response: o } = t;
                  e(i, o, o && s.decode(o.rawBody, this.encoding));
                }
              );
          break;
      }
    }
    post(t, e = () => {}) {
      const s = t.method ? t.method.toLocaleLowerCase() : "post";
      switch (
        (t.body &&
          t.headers &&
          !t.headers["Content-Type"] &&
          !t.headers["content-type"] &&
          (t.headers["content-type"] = "application/x-www-form-urlencoded"),
        t.headers &&
          (delete t.headers["Content-Length"],
          delete t.headers["content-length"]),
        void 0 === t.followRedirect ||
          t.followRedirect ||
          ((this.isSurge() || this.isLoon()) && (t["auto-redirect"] = !1),
          this.isQuanX() &&
            (t.opts
              ? (t.opts.redirection = !1)
              : (t.opts = { redirection: !1 }))),
        this.getEnv())
      ) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        default:
          this.isSurge() &&
            this.isNeedRewrite &&
            ((t.headers = t.headers || {}),
            Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })),
            $httpClient[s](t, (t, s, i) => {
              !t &&
                s &&
                ((s.body = i),
                (s.statusCode = s.status ? s.status : s.statusCode),
                (s.status = s.statusCode)),
                e(t, s, i);
            });
          break;
        case "Quantumult X":
          (t.method = s),
            this.isNeedRewrite &&
              ((t.opts = t.opts || {}), Object.assign(t.opts, { hints: !1 })),
            $task.fetch(t).then(
              (t) => {
                const {
                  statusCode: s,
                  statusCode: i,
                  headers: o,
                  body: r,
                  bodyBytes: a,
                } = t;
                e(
                  null,
                  {
                    status: s,
                    statusCode: i,
                    headers: o,
                    body: r,
                    bodyBytes: a,
                  },
                  r,
                  a
                );
              },
              (t) => e((t && t.error) || "UndefinedError")
            );
          break;
        case "Node.js":
          let i = require("iconv-lite");
          this.initGotEnv(t);
          const { url: o, ...r } = t;
          this.got[s](o, r).then(
            (t) => {
              const {
                  statusCode: s,
                  statusCode: o,
                  headers: r,
                  rawBody: a,
                } = t,
                n = i.decode(a, this.encoding);
              e(
                null,
                { status: s, statusCode: o, headers: r, rawBody: a, body: n },
                n
              );
            },
            (t) => {
              const { message: s, response: o } = t;
              e(s, o, o && i.decode(o.rawBody, this.encoding));
            }
          );
          break;
      }
    }
    time(t, e = null) {
      const s = e ? new Date(e) : new Date();
      let i = {
        "M+": s.getMonth() + 1,
        "d+": s.getDate(),
        "H+": s.getHours(),
        "m+": s.getMinutes(),
        "s+": s.getSeconds(),
        "q+": Math.floor((s.getMonth() + 3) / 3),
        S: s.getMilliseconds(),
      };
      /(y+)/.test(t) &&
        (t = t.replace(
          RegExp.$1,
          (s.getFullYear() + "").substr(4 - RegExp.$1.length)
        ));
      for (let e in i)
        new RegExp("(" + e + ")").test(t) &&
          (t = t.replace(
            RegExp.$1,
            1 == RegExp.$1.length
              ? i[e]
              : ("00" + i[e]).substr(("" + i[e]).length)
          ));
      return t;
    }
    queryStr(t) {
      let e = "";
      for (const s in t) {
        let i = t[s];
        null != i &&
          "" !== i &&
          ("object" == typeof i && (i = JSON.stringify(i)),
          (e += `${s}=${i}&`));
      }
      return (e = e.substring(0, e.length - 1)), e;
    }
    msg(e = t, s = "", i = "", o = {}) {
      const r = (t) => {
        const { $open: e, $copy: s, $media: i, $mediaMime: o } = t;
        switch (typeof t) {
          case void 0:
            return t;
          case "string":
            switch (this.getEnv()) {
              case "Surge":
              case "Stash":
              default:
                return { url: t };
              case "Loon":
              case "Shadowrocket":
                return t;
              case "Quantumult X":
                return { "open-url": t };
              case "Node.js":
                return;
            }
          case "object":
            switch (this.getEnv()) {
              case "Surge":
              case "Stash":
              case "Shadowrocket":
              default: {
                const r = {};
                let a = t.openUrl || t.url || t["open-url"] || e;
                a && Object.assign(r, { action: "open-url", url: a });
                let n = t["update-pasteboard"] || t.updatePasteboard || s;
                if (
                  (n && Object.assign(r, { action: "clipboard", text: n }), i)
                ) {
                  let t, e, s;
                  if (i.startsWith("http")) t = i;
                  else if (i.startsWith("data:")) {
                    const [t] = i.split(";"),
                      [, o] = i.split(",");
                    (e = o), (s = t.replace("data:", ""));
                  } else {
                    (e = i),
                      (s = ((t) => {
                        const e = {
                          JVBERi0: "application/pdf",
                          R0lGODdh: "image/gif",
                          R0lGODlh: "image/gif",
                          iVBORw0KGgo: "image/png",
                          "/9j/": "image/jpg",
                        };
                        for (var s in e) if (0 === t.indexOf(s)) return e[s];
                        return null;
                      })(i));
                  }
                  Object.assign(r, {
                    "media-url": t,
                    "media-base64": e,
                    "media-base64-mime": o ?? s,
                  });
                }
                return (
                  Object.assign(r, {
                    "auto-dismiss": t["auto-dismiss"],
                    sound: t.sound,
                  }),
                  r
                );
              }
              case "Loon": {
                const s = {};
                let o = t.openUrl || t.url || t["open-url"] || e;
                o && Object.assign(s, { openUrl: o });
                let r = t.mediaUrl || t["media-url"];
                return (
                  i?.startsWith("http") && (r = i),
                  r && Object.assign(s, { mediaUrl: r }),
                  console.log(JSON.stringify(s)),
                  s
                );
              }
              case "Quantumult X": {
                const o = {};
                let r = t["open-url"] || t.url || t.openUrl || e;
                r && Object.assign(o, { "open-url": r });
                let a = t["media-url"] || t.mediaUrl;
                i?.startsWith("http") && (a = i),
                  a && Object.assign(o, { "media-url": a });
                let n = t["update-pasteboard"] || t.updatePasteboard || s;
                return (
                  n && Object.assign(o, { "update-pasteboard": n }),
                  console.log(JSON.stringify(o)),
                  o
                );
              }
              case "Node.js":
                return;
            }
          default:
            return;
        }
      };
      if (!this.isMute)
        switch (this.getEnv()) {
          case "Surge":
          case "Loon":
          case "Stash":
          case "Shadowrocket":
          default:
            $notification.post(e, s, i, r(o));
            break;
          case "Quantumult X":
            $notify(e, s, i, r(o));
            break;
          case "Node.js":
            break;
        }
      if (!this.isMuteLog) {
        let t = ["", "==============📣系统通知📣=============="];
        t.push(e),
          s && t.push(s),
          i && t.push(i),
          console.log(t.join("\n")),
          (this.logs = this.logs.concat(t));
      }
    }
    debug(...t) {
      this.logLevels[this.logLevel] <= this.logLevels.debug &&
        (t.length > 0 && (this.logs = [...this.logs, ...t]),
        console.log(
          `${this.logLevelPrefixs.debug}${t
            .map((t) => t ?? String(t))
            .join(this.logSeparator)}`
        ));
    }
    info(...t) {
      this.logLevels[this.logLevel] <= this.logLevels.info &&
        (t.length > 0 && (this.logs = [...this.logs, ...t]),
        console.log(
          `${this.logLevelPrefixs.info}${t
            .map((t) => t ?? String(t))
            .join(this.logSeparator)}`
        ));
    }
    warn(...t) {
      this.logLevels[this.logLevel] <= this.logLevels.warn &&
        (t.length > 0 && (this.logs = [...this.logs, ...t]),
        console.log(
          `${this.logLevelPrefixs.warn}${t
            .map((t) => t ?? String(t))
            .join(this.logSeparator)}`
        ));
    }
    error(...t) {
      this.logLevels[this.logLevel] <= this.logLevels.error &&
        (t.length > 0 && (this.logs = [...this.logs, ...t]),
        console.log(
          `${this.logLevelPrefixs.error}${t
            .map((t) => t ?? String(t))
            .join(this.logSeparator)}`
        ));
    }
    log(...t) {
      t.length > 0 && (this.logs = [...this.logs, ...t]),
        console.log(t.map((t) => t ?? String(t)).join(this.logSeparator));
    }
    logErr(t, e) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        case "Quantumult X":
        default:
          this.log("", `❗️${this.name}, 错误!`, e, t);
          break;
        case "Node.js":
          this.log(
            "",
            `❗️${this.name}, 错误!`,
            e,
            void 0 !== t.message ? t.message : t,
            t.stack
          );
          break;
      }
    }
    wait(t) {
      return new Promise((e) => setTimeout(e, t));
    }
    done(t = {}) {
      const e = (new Date().getTime() - this.startTime) / 1e3;
      switch (
        (this.log("", `🔔${this.name}, 结束! 🕛 ${e} 秒`),
        this.log(),
        this.getEnv())
      ) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        case "Quantumult X":
        default:
          $done(t);
          break;
        case "Node.js":
          process.exit(1);
      }
    }
  })(t, e);
}
