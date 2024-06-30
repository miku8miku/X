/******************************************
 * @name 每天60秒读懂世界
 * @channel https://t.me/yqc_123
 * @feedback https://t.me/yqc_777
 * @version 1.2.1
******************************************
## 更新日志

### 20240512
    1.优化通知
    2.适配新版surge图片通知

### 20240312

    1.优化在Surge上的通知
    2.修复Loon在iOS16上存在媒体不通知的情况

###

    使用补齐版cheerio，感谢 @苍井灰灰 灰佬提供的转换思路。

### 20231123

    增加一条备用地址, 以防止接口挂掉。

### 20231121

    考虑到【微语】几乎展示不出来，提前到副标题。

### 20231114

    1.因知乎原帖作者已不在维护, 只得另辟蹊径, 目前使用的是非官方相关内容, 故同步时间会有所延迟, 建议将定时调到 `9:30` 以后。
    2.适配青龙通知, 自行调整 `sendNotify.js` 的位置。

### 20231024

    1.适配通知, 只展示可可用长度的内容, 点击通知查看详细内容。

## 脚本声明

    1.此脚本仅用于学习研究，不保证其合法性、准确性、有效性，请根据情况自行判断，本人对此不承担任何保证责任。
    2.由于此脚本仅用于学习研究，您必须在下载后 24 小时内将所有内容从您的计算机或手机或任何存储设备中完全删除，若违反规定引起任何事件本人对此均不负责。
    3.请勿将此脚本用于任何商业或非法目的，若违反规定请自行对此负责。
    4.此脚本涉及应用与本人无关，本人对因此引起的任何隐私泄漏或其他后果不承担任何责任。
    5.本人对任何脚本引发的问题概不负责，包括但不限于由脚本错误引起的任何损失和损害。
    6.如果任何单位或个人认为此脚本可能涉嫌侵犯其权利，应及时通知并提供身份证明，所有权证明，我们将在收到认证文件确认后删除此脚本。
    7.所有直接或间接使用、查看此脚本的人均应该仔细阅读此声明, 本人保留随时更改或补充此声明的权利, 一旦您使用或复制了此脚本，即视为您已接受此免责声明。

## 使用方法

### 配置 (QuanX)

```properties
[task_local]
30 9 * * * https://raw.githubusercontent.com/Yuheng0101/X/main/Tasks/60s.js, tag=每天60秒读懂世界, img-url=https://raw.githubusercontent.com/Yuheng0101/X/main/Assets/60s.png, enabled=true
```

### 配置 (Loon)

```properties
[Script]
cron "30 9 * * *" script-path=https://raw.githubusercontent.com/Yuheng0101/X/main/Tasks/60s.js, timeout=10, tag=每天60秒读懂世界, img-url=https://raw.githubusercontent.com/Yuheng0101/X/main/Assets/60s.png
```

### 配置 (Surge)

```properties
每天60秒读懂世界 = type=cron,cronexp=0 30 9 * * *,wake-system=1,script-path=https://raw.githubusercontent.com/Yuheng0101/X/main/Tasks/60s.js,timeout=60
```

### 致谢

[@cheerio](https://github.com/cheeriojs/cheerio)

[@苍井灰灰](https://github.com/wf021325)

[@每天60秒读懂世界](https://www.zhihu.com/people/mt36501)

[@小竣博客](https://www.jun.la/60snews)

[@设计导航](https://www.designnavs.com/60s)

[@冷筱宇](https://www.789dl.cn/zb.html)

******************************************/
const $ = new Env('每天60秒看懂世界', {
    scriptname: '60S',
    notifyPath:'../../../utils/sendNotify'
})
// 由于Surge通知过长会遮挡且点击后无法跳转日志, 在此做截断, 并且点击通知会跳转页面展示详情
const MAX_MESSAGE_COUNT = 175
// 今日时间字符串
const dateStr = $.time('yyyy年MM月dd日', new Date())
// 是否开启调试模式
$.logLevel = $.toObj($.isNode() ? process.env[`${$.scriptname}_DEBUG`] : $.getdata(`${$.scriptname.toLowerCase()}_debug`)) ? 'debug' : 'info'
$.debug(`🔰 模式: ${$.logLevel == 'debug' ? '调试' : '常规'}`)
async function getContent() {
  return $.http
    .get("https://www.jun.la/news.html")
    .then((a) => {
      const o = $.cheerio.load(a.body),
        s = o("#post-2").find("p"),
        c = s
          .eq(0)
          .text()
          ?.match(/(\d{4}年\d{2}月\d{2}日)/)?.[0];
      if (($.debug(`更新时间: ${c}`), !c || c !== dateStr))
        return $.error("今日早报未更新");
      const g = s.eq(1).text()?.split("：")?.[1]?.trim();
      $.debug(`农历日期: ${g}`);
      const d = s.eq(2).text()?.split("：")?.[1]?.trim();
      $.debug(`标题: ${d}`);
      const l = s.eq(3).text()?.split("：")?.[1]?.trim();
      $.debug(`banner图: ${l}`);
      const p = s.eq(4).text()?.split("：")?.[1]?.trim();
      $.debug(`长文图片: ${p}`);
      const h = s
        .slice(6, 22)
        ?.map((a, s) => o(s).text())
        ?.get();
      $.debug(`内容: ${h.join("\n")}`);
      const { subTitle: m, message: b } = chunkBySize(h);
      return (
        $.debug(`微语: ${m}`),
        $.debug(`返回内容: ${b}`),
        { title: d, subTitle: m, message: b, banner: l, media: p }
      );
    })
    .catch((a) => $.error(`请求失败: ${a}`));
}
async function getContentBackup1() {
  const a = "https://www.designnavs.com/60s";
  return $.http
    .get(a)
    .then(async (o) => {
      const s = $.cheerio
          .load(o.body)("#content .cat_list .list-grid")
          .eq(0)
          .find(".list-body a"),
        c = s.attr("title"),
        g = s.attr("href"),
        d = c?.split("，")?.[0]?.replace(/^(\d)/, (a, o) => o.padStart(2, "0"));
      return d !== dateStr.replace(/^\d{4}年/, "")
        ? $.error(`${a}备用长文接口未更新`)
        : await (async (a) => {
            try {
              const o = await $.http.get(a),
                s = $.cheerio.load(o.body),
                c = s(".panel-header h1").text();
              $.debug(`标题: ${c}`);
              const g = s(".panel-body"),
                d = g.find("figure img").attr("src");
              $.debug(`banner图: ${d}`);
              const l = g
                  .find("p")
                  ?.map((a, o) => s(o).text())
                  ?.get(),
                { subTitle: p, message: h } = chunkBySize(l);
              return (
                $.debug(`微语: ${p}`),
                $.debug(`返回内容: ${h}`),
                { title: c, subTitle: p, message: h, banner: d }
              );
            } catch (a) {
              throw `详情请求失败, ${a}`;
            }
          })(g);
    })
    .catch((a) => $.error(`备用接口1请求失败: ${a}`));
}
async function getImg() {
  const a = "https://api.03c3.cn/api/zb";
  return $.http
    .get(a)
    .then((o) => a)
    .catch((o) => {
      $.error(`${a}长图备用接口1获取失败: ${o}`);
    });
}
async function getImgBackup1() {
  const a = "https://api.2xb.cn/zaob";
  return (
    $.debug(`使用长图备用接口1: ${a}`),
    $.http
      .get(a)
      .then((o) => {
        const s = $.toObj(o.body);
        if (
          200 == s?.code &&
          $.time("yyyy年MM月dd日", new Date(s?.datatime).getTime()) === dateStr
        )
          return s.imageUrl;
        $.error(`${a}接口报错: ${"Success" === s?.msg ? "今日未更新" : s.msg}`);
      })
      .catch((o) => {
        $.error(`${a}长图备用接口2获取失败: ${o}`);
      })
  );
}
async function getImgBackup2() {
  $.debug(`使用长图备用接口2: ${a}`);
  const a = "https://api.jun.la/60s.php?format=image";
  return $.http
    .get(a)
    .then((o) => a)
    .catch((o) => {
      $.error(`${a}长图备用接口1获取失败: ${o}`);
    });
}
async function showNotice() {
  $.log("==============📣免责声明📣=============="),
    $.log("1. 本脚本仅用于学习研究，禁止用于商业用途"),
    $.log("2. 本脚本不保证准确性、可靠性、完整性和及时性"),
    $.log("3. 任何个人或组织均可无需经过通知而自由使用"),
    $.log("4. 作者对任何脚本问题概不负责，包括由此产生的任何损失"),
    $.log(
      "5. 如果任何单位或个人认为该脚本可能涉嫌侵犯其权利，应及时通知并提供身份证明、所有权证明，我将在收到认证文件确认后删除"
    ),
    $.log("6. 请勿将本脚本用于商业用途，由此引起的问题与作者无关"),
    $.log("7. 本脚本及其更新版权归作者所有"),
    $.log("");
}
async function showMsg(a, o, s, c) {
  if ($.isNode()) {
    const g = $.isNode() ? require($.notifyPath) : "",
      d = [s],
      l = c?.["open-url"] || c?.url || c?.mediaUrl || c?.$open,
      p = c?.["media-url"] || c?.mediaUrl || c?.$media;
    l && d.push(`🔗打开链接: ${l}`),
      p && d.push(`🎬媒体链接: ${p}`),
      $.log("==============📣系统通知📣==============", a, o, d.join("\n"));
    try {
      await g.sendNotify(`${a}\n${o}`, d.join("\n"));
    } catch (a) {
      $.warn("没有找到sendNotify.js文件 不发送通知");
    }
  } else $.msg(a, o, s, c);
}
function chunkBySize(a, o = MAX_MESSAGE_COUNT) {
  a = "string" == typeof a ? a.split("\n") : a;
  const s = a.map((a) =>
      a.replace(/^(\d+)[、.]/, (a, o) => {
        return `【${
          ((s = o.padStart(2, "0")),
          s.replace(
            /[0-9A-z]/g,
            (a) => ["𝟎", "𝟏", "𝟐", "𝟑", "𝟒", "𝟓", "𝟔", "𝟕", "𝟖", "𝟗"]?.[a] || a
          ))
        }】`;
        var s;
      })
    ),
    c = s.pop();
  let g = [];
  if ($.isNode()) g = s;
  else {
    for (const a of s) {
      if (g.join("\n").length >= o) break;
      g.push(a);
    }
    g = [...g, "\n【温馨提示】点击通知查看全部"];
  }
  return {
    subTitle: c,
    message: g.join("\n").replace(/\n$/, "").replace(/^\n/, ""),
  };
}
async function importRemoteUtils(n, t, i, r) {
  const u =
    "undefined" != typeof globalThis
      ? globalThis
      : "undefined" != typeof self
      ? self
      : "undefined" != typeof window
      ? window
      : global;
  if ($.isNode()) {
    if (r) {
      $.debug(`【${i}】使用 'require' 导入模块 ${r}`);
      try {
        const a = require(r);
        return void ($[i] = a);
      } catch (a) {
        $.error(
          `【${i}】导入模块 ${r} 失败, 请检查模块名或检查是否安装该依赖...`
        );
      }
    } else if (
      ($.debug(`【${i}】没有传入模块名称, 不使用 'require' 导入`), u[i])
    )
      return $.debug(`【${i}】环境自带库, 已加载成功 🎉`), void ($[i] = u[i]);
    !$[i] || $.debug(`【${i}】使用远程加载...`);
  }
  $.debug(`【${i}】正在从远程拉取脚本: ${n}`);
  const f = $.getval(`${i}.js`),
    e = (n) => {
      eval(n),
        ($[i] = t ? eval(t)() : u[i]),
        !$[i] || $.debug(`【${i}】加载成功 🎉`);
    };
  f
    ? ($.debug(`【${i}】缓存存在, 尝试加载...`), e(f))
    : await $.http
        .get({ url: n, timeout: 2e3 })
        .then((a) => {
          var o = a.body;
          e(o), $.setval(o, `${i}.js`), $.debug(`【${i}】已存入缓存 🎉`);
        })
        .catch(() =>
          Promise.reject(new Error(`【${i}】远程拉取失败, 请检查网络...`))
        );
}
(async () => {
  await showNotice(),
    await importRemoteUtils(
      "https://cdn.jsdelivr.net/gh/Yuheng0101/X@main/Utils/cheerio.js",
      "createCheerio",
      "cheerio",
      "cheerio"
    );
  const a = (await getContent()) || {};
  if (
    ((a?.title && a?.message) ||
      ($.debug("使用备用接口获取长文"),
      Object.assign(a, await getContentBackup1())),
    (a?.title && a?.message) || $.error("长文接口全部失效"),
    a?.media ||
      ($.debug("启用长图接口"),
      (a.media =
        (await getImg()) ||
        (await getImgBackup1()) ||
        (await getImgBackup2()))),
    a?.media || $.error("长文图接口全部失效"),
    !a?.title && !a?.media)
  )
    throw "脚本已失效, 等待修复...";
  if (a?.title && a?.subTitle && a?.message) {
    const { title: o, subTitle: s, message: $ } = a,
      c = {};
    a?.banner && Object.assign(c, { $media: a.banner }),
      a?.media && Object.assign(c, { $open: a.media }),
      await showMsg(o, s, $, c);
  }
  if (!a?.title && a?.media) {
    const o = "每天60秒读懂世界",
      s = "点我查看";
    await showMsg(o, s, "", { $open: a.media });
  }
})()
  .catch((a) => $.log("", $.name + "获取内容失败", a, ""))
  .finally(() => $.done({}));
// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;"POST"===e&&(s=this.post);const i=new Promise(((e,i)=>{s.call(this,t,((t,s,o)=>{t?i(t):e(s)}))}));return t.timeout?((t,e=1e3)=>Promise.race([t,new Promise(((t,s)=>{setTimeout((()=>{s(new Error("请求超时"))}),e)}))]))(i,t.timeout):i}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.logLevels={debug:0,info:1,warn:2,error:3},this.logLevelPrefixs={debug:"[DEBUG] ",info:"[INFO] ",warn:"[WARN] ",error:"[ERROR] "},this.logLevel="info",this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}getEnv(){return"undefined"!=typeof $environment&&$environment["surge-version"]?"Surge":"undefined"!=typeof $environment&&$environment["stash-version"]?"Stash":"undefined"!=typeof module&&module.exports?"Node.js":"undefined"!=typeof $task?"Quantumult X":"undefined"!=typeof $loon?"Loon":"undefined"!=typeof $rocket?"Shadowrocket":void 0}isNode(){return"Node.js"===this.getEnv()}isQuanX(){return"Quantumult X"===this.getEnv()}isSurge(){return"Surge"===this.getEnv()}isLoon(){return"Loon"===this.getEnv()}isShadowrocket(){return"Shadowrocket"===this.getEnv()}isStash(){return"Stash"===this.getEnv()}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null,...s){try{return JSON.stringify(t,...s)}catch{return e}}getjson(t,e){let s=e;if(this.getdata(t))try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise((e=>{this.get({url:t},((t,s,i)=>e(i)))}))}runScript(t,e){return new Promise((s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let o=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");o=o?1*o:20,o=e&&e.timeout?e.timeout:o;const[r,a]=i.split("@"),n={url:`http://${a}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:o},headers:{"X-Key":r,Accept:"*/*"},policy:"DIRECT",timeout:o};this.post(n,((t,e,i)=>s(i)))})).catch((t=>this.logErr(t)))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),o=JSON.stringify(this.data);s?this.fs.writeFileSync(t,o):i?this.fs.writeFileSync(e,o):this.fs.writeFileSync(t,o)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let o=t;for(const t of i)if(o=Object(o)[t],void 0===o)return s;return o}lodash_set(t,e,s){return Object(t)!==t||(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce(((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{}),t)[e[e.length-1]]=s),t}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),o=s?this.getval(s):"";if(o)try{const t=JSON.parse(o);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,o]=/^@(.*?)\.(.*?)$/.exec(e),r=this.getval(i),a=i?"null"===r?null:r||"{}":"{}";try{const e=JSON.parse(a);this.lodash_set(e,o,t),s=this.setval(JSON.stringify(e),i)}catch(e){const r={};this.lodash_set(r,o,t),s=this.setval(JSON.stringify(r),i)}}else s=this.setval(t,e);return s}getval(t){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.read(t);case"Quantumult X":return $prefs.valueForKey(t);case"Node.js":return this.data=this.loaddata(),this.data[t];default:return this.data&&this.data[t]||null}}setval(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.write(t,e);case"Quantumult X":return $prefs.setValueForKey(t,e);case"Node.js":return this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0;default:return this.data&&this.data[e]||null}}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.cookie&&void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar)))}get(t,e=(()=>{})){switch(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"],delete t.headers["content-type"],delete t.headers["content-length"]),t.params&&(t.url+="?"+this.queryStr(t.params)),void 0===t.followRedirect||t.followRedirect||((this.isSurge()||this.isLoon())&&(t["auto-redirect"]=!1),this.isQuanX()&&(t.opts?t.opts.redirection=!1:t.opts={redirection:!1})),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,((t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,i)}));break;case"Quantumult X":this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then((t=>{const{statusCode:s,statusCode:i,headers:o,body:r,bodyBytes:a}=t;e(null,{status:s,statusCode:i,headers:o,body:r,bodyBytes:a},r,a)}),(t=>e(t&&t.error||"UndefinedError")));break;case"Node.js":let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",((t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}})).then((t=>{const{statusCode:i,statusCode:o,headers:r,rawBody:a}=t,n=s.decode(a,this.encoding);e(null,{status:i,statusCode:o,headers:r,rawBody:a,body:n},n)}),(t=>{const{message:i,response:o}=t;e(i,o,o&&s.decode(o.rawBody,this.encoding))}));break}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";switch(t.body&&t.headers&&!t.headers["Content-Type"]&&!t.headers["content-type"]&&(t.headers["content-type"]="application/x-www-form-urlencoded"),t.headers&&(delete t.headers["Content-Length"],delete t.headers["content-length"]),void 0===t.followRedirect||t.followRedirect||((this.isSurge()||this.isLoon())&&(t["auto-redirect"]=!1),this.isQuanX()&&(t.opts?t.opts.redirection=!1:t.opts={redirection:!1})),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,((t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,i)}));break;case"Quantumult X":t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then((t=>{const{statusCode:s,statusCode:i,headers:o,body:r,bodyBytes:a}=t;e(null,{status:s,statusCode:i,headers:o,body:r,bodyBytes:a},r,a)}),(t=>e(t&&t.error||"UndefinedError")));break;case"Node.js":let i=require("iconv-lite");this.initGotEnv(t);const{url:o,...r}=t;this.got[s](o,r).then((t=>{const{statusCode:s,statusCode:o,headers:r,rawBody:a}=t,n=i.decode(a,this.encoding);e(null,{status:s,statusCode:o,headers:r,rawBody:a,body:n},n)}),(t=>{const{message:s,response:o}=t;e(s,o,o&&i.decode(o.rawBody,this.encoding))}));break}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}queryStr(t){let e="";for(const s in t){let i=t[s];null!=i&&""!==i&&("object"==typeof i&&(i=JSON.stringify(i)),e+=`${s}=${i}&`)}return e=e.substring(0,e.length-1),e}msg(e=t,s="",i="",o={}){const r=t=>{const{$open:e,$copy:s,$media:i,$mediaMime:o}=t;switch(typeof t){case void 0:return t;case"string":switch(this.getEnv()){case"Surge":case"Stash":default:return{url:t};case"Loon":case"Shadowrocket":return t;case"Quantumult X":return{"open-url":t};case"Node.js":return}case"object":switch(this.getEnv()){case"Surge":case"Stash":case"Shadowrocket":default:{const r={};let a=t.openUrl||t.url||t["open-url"]||e;a&&Object.assign(r,{action:"open-url",url:a});let n=t["update-pasteboard"]||t.updatePasteboard||s;if(n&&Object.assign(r,{action:"clipboard",text:n}),i){let t,e,s;if(i.startsWith("http"))t=i;else if(i.startsWith("data:")){const[t]=i.split(";"),[,o]=i.split(",");e=o,s=t.replace("data:","")}else{e=i,s=(t=>{const e={JVBERi0:"application/pdf",R0lGODdh:"image/gif",R0lGODlh:"image/gif",iVBORw0KGgo:"image/png","/9j/":"image/jpg"};for(var s in e)if(0===t.indexOf(s))return e[s];return null})(i)}Object.assign(r,{"media-url":t,"media-base64":e,"media-base64-mime":o??s})}return Object.assign(r,{"auto-dismiss":t["auto-dismiss"],sound:t.sound}),r}case"Loon":{const s={};let o=t.openUrl||t.url||t["open-url"]||e;o&&Object.assign(s,{openUrl:o});let r=t.mediaUrl||t["media-url"];return i?.startsWith("http")&&(r=i),r&&Object.assign(s,{mediaUrl:r}),console.log(JSON.stringify(s)),s}case"Quantumult X":{const o={};let r=t["open-url"]||t.url||t.openUrl||e;r&&Object.assign(o,{"open-url":r});let a=t["media-url"]||t.mediaUrl;i?.startsWith("http")&&(a=i),a&&Object.assign(o,{"media-url":a});let n=t["update-pasteboard"]||t.updatePasteboard||s;return n&&Object.assign(o,{"update-pasteboard":n}),console.log(JSON.stringify(o)),o}case"Node.js":return}default:return}};if(!this.isMute)switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:$notification.post(e,s,i,r(o));break;case"Quantumult X":$notify(e,s,i,r(o));break;case"Node.js":break}if(!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}debug(...t){this.logLevels[this.logLevel]<=this.logLevels.debug&&(t.length>0&&(this.logs=[...this.logs,...t]),console.log(`${this.logLevelPrefixs.debug}${t.map((t=>t??String(t))).join(this.logSeparator)}`))}info(...t){this.logLevels[this.logLevel]<=this.logLevels.info&&(t.length>0&&(this.logs=[...this.logs,...t]),console.log(`${this.logLevelPrefixs.info}${t.map((t=>t??String(t))).join(this.logSeparator)}`))}warn(...t){this.logLevels[this.logLevel]<=this.logLevels.warn&&(t.length>0&&(this.logs=[...this.logs,...t]),console.log(`${this.logLevelPrefixs.warn}${t.map((t=>t??String(t))).join(this.logSeparator)}`))}error(...t){this.logLevels[this.logLevel]<=this.logLevels.error&&(t.length>0&&(this.logs=[...this.logs,...t]),console.log(`${this.logLevelPrefixs.error}${t.map((t=>t??String(t))).join(this.logSeparator)}`))}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.map((t=>t??String(t))).join(this.logSeparator))}logErr(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:this.log("",`❗️${this.name}, 错误!`,e,t);break;case"Node.js":this.log("",`❗️${this.name}, 错误!`,e,void 0!==t.message?t.message:t,t.stack);break}}wait(t){return new Promise((e=>setTimeout(e,t)))}done(t={}){const e=((new Date).getTime()-this.startTime)/1e3;switch(this.log("",`🔔${this.name}, 结束! 🕛 ${e} 秒`),this.log(),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:$done(t);break;case"Node.js":process.exit(1)}}}(t,e)}
