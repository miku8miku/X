const $ = new Env("美图写真测试");
// 图源
const GRAPHIC_SOURCE = {
  "4KHD": "HD4K",
  "115ZY": "ZY115",
  MMT: 'MMT'
};
// 用户选择
const [SOURCE, CATEGORY] = ($.getdata("meitu_type") ?? "MMT - 丝袜美腿")
  .split("-")
  .map((it) => it.trim());
const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
//////修改排版----通过修改li实现
function render(imageDataArray, title) {
  const imageTags = imageDataArray.map(imageData => `<li><img src="data:image/jpeg;base64,${imageData}" alt="Displayed Image"></li>`).join('');
  return `<!DOCTYPE html><html lang="zh-CN">
  <head>
  
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    * { margin: 0; padding: 0; }
    h1 { padding: 10px; font-size: 1em; text-align: center; }
    ul { display: flex; flex-wrap: wrap; justify-content: center; }
    li { list-style: none; width: 25%; box-sizing: border-box; padding: 10px; }
    img { width: 100%; height: auto; }
  </style>
  
  </head>
  <body>
  <h1>${title}</h1>
  <ul>${imageTags}</ul>
  </body>
  </html>`;
}

const main = async () => {
  try {
    // await showNotice();
    await loadRemoteScriptByCache('https://cdn.jsdelivr.net/gh/Yuheng0101/X@main/Utils/Buffer.min.js', 'loadBuffer', 'Buffer')
    await loadRemoteScriptByCache('https://cdn.jsdelivr.net/gh/Yuheng0101/X@main/Utils/cheerio.js', 'createCheerio', 'cheerio')
    await loadRemoteScriptByCache('https://cdn.jsdelivr.net/gh/Yuheng0101/X@main/Utils/CryptoJS.min.js', 'createCryptoJS', 'CryptoJS')

    if (!SOURCE) throw "未知错误~";
    const { images, title } = await eval(GRAPHIC_SOURCE[SOURCE])();
    const thumb = images[random(0, images.length - 1)].replace(".webp", ".jpg");
  const imageBase64Array = await Promise.all(images.map(async (imageUrl) => {
    const response = await fetchData({ url: imageUrl, resultType: 'buffer',headers:{'Referer': 'https://mm.tvv.tw'}})
    return response
}));
    const html = render(imageBase64Array, title);
    $.setdata(html, "meitu_html");
    // $.fs.writeFileSync('output.html', html, 'utf8');
    // console.log('HTML 内容已成功保存到 output.html');
    $.msg('美图获取成功');
  } catch (e) {
    $.logErr(e);
  }
  $done(console.log(2));
};

/////// =====测试主函数======

// if (typeof $request === "undefined") {
//   main().finally(() => $.done({}));
// } 
// else {
//   (async () => {
//     const body = $.getdata("meitu_html");
//     !body && (await main());
//     const response = {
//       headers: { "content-type": "text/html" },
//       status: $.isQuanX() ? "HTTP/1.1 200 OK" : 200,
//       body,
//     };
//     $.done($.isQuanX() ? response : { response });
//   })();
// }

main().finally(() => $.done({}));


// main().catch(console.error);


// 4khd
async function HD4K() {
  const host = `https://www.4khd.com`;
  const categoryArr = ["cosplay", "popular", "album"];
  const category = categoryArr[random(0, categoryArr.length - 1)];
  const page = random(1, 100);
  console.log(`[𝟒𝐊𝐇𝐃] 📚开始获取：${category} 第 ${page} 页`);
  const getList = async () => {
    return $.http
      .get(host + "/pages/" + category + "?query-3-page=" + page)
      .then(({ body }) => {
        const _$ = $.cheerio.load(body);
        return _$('[class^="wp-elements-"]')
          .map((_, el) => {
            return {
              url: _$(el).find("a").attr("href"),
              title: _$(el).find("a").text(),
            };
          })
          .get()
          .filter((it) => it.url.endsWith(".html"));
      })
      .catch((err) => console.error(err));
  };
  const getDetail = async (url, title) => {
    console.log(`[𝟒𝐊𝐇𝐃] 📚开始获取：${title}`);
    return $.http
      .get(url)
      .then(({ body }) => {
        const _$ = $.cheerio.load(body);
        return _$('img[loading="lazy"][decoding="async"]')
          .map((_, el) => _$(el).attr("src"))
          .get()
          .filter((it) => it.match(/webp\?w=\d+$/));
      })
      .catch((err) => console.error(err));
  };
  try {
    const list = await getList();
    if (list?.length) {
      const { url, title } = list[random(0, list.length - 1)];
      const images = await getDetail(url, title);
      return { images, title };
    }
  } catch (e) {
    throw e;
  }
}
// 115zy
async function ZY115() {
  const host = `http://155zy.com`;
  const page = random(1, 20);
  const categoryArr = [
    { title: "街拍偷拍", id: 25, maxPage: 29 },
    { title: "丝袜美腿", id: 26, maxPage: 27 },
    { title: "欧美风情", id: 27, maxPage: 26 },
    { title: "卡通漫画", id: 29, maxPage: 21 },
    { title: "网友自拍", id: 28, maxPage: 31 },
    { title: "露出激情", id: 30, maxPage: 32 },
    { title: "唯美写真", id: 31, maxPage: 29 },
    { title: "女优情报", id: 32, maxPage: 31 },
  ];
  const category = CATEGORY
    ? categoryArr.find((it) => it.title === CATEGORY)
    : categoryArr[random(0, categoryArr.length - 1)];
  console.log(`[𝟏𝟏𝟓𝐙𝐘] 📚开始获取：${category.title} 第 ${page} 页`);
  const getList = () => {
    return $.http
      .get(`${host}/index.php/art/type/id/${category.id}/page/${page}.html`)
      .then(({ body }) => {
        const _$ = $.cheerio.load(body);
        return _$(".videoContent>li")
          .map((_, el) => {
            const $a = _$(el).find(".videoName");
            return {
              title: $a.text(),
              url: host + $a.attr("href"),
            };
          })
          .get();
      })
      .catch((err) => $.logErr(err));
  };
  const getDetail = (url, title) => {
    console.log(`[𝟏𝟏𝟓𝐙𝐘] 📚开始获取：${title}`);
    return $.http
      .get(url)
      .then(({ body }) => {
        const _$ = $.cheerio.load(body);
        return _$("#read_tpc>img")
          .map((_, item) => _$(item).attr("src"))
          .get();
      })
      .catch((err) => $.logErr(err));
  };
  try {
    const list = await getList();
    if (list?.length) {
      const { url, title } = list[random(0, list.length - 1)];
      const images = await getDetail(url, title);
      return { images, title };
    }
  } catch (e) {
    throw e;
  }
}
// 妹妹图 => 图片有防盗链检测
async function MMT() {
  const host = "https://mm.tvv.tw";
  const page = random(1, 100);
  console.log(`[𝐌𝐌𝐓] 📚开始获取：第 ${page} 页`);
  const getList = () => {
    return $.http
      .get(`${host}/page/${page}`)
      .then(({ body }) => {
        const _$ = $.cheerio.load(body);
        return _$(".row.blog-masonry .blog-listing")
          .map((_, el) => {
            const $a = _$(el).find("a");
            return {
              title: $a.text(),
              url: $a.attr("href"),
            };
          })
          .get();
      })
      .catch((err) => $.logErr(err));
  };
  const getDetail = (url, title) => {
    console.log(`[𝐌𝐌𝐓] 📚开始获取：${title}`);
    return $.http
      .get(url,{headers:{'Referer': 'https://mm.tvv.tw'}})
      .then(({ body }) => {
        const _$ = $.cheerio.load(body);
        return _$(".blog-details-text img")
          .map((_, item) => _$(item).attr("src"))
          .get();
      })
      .catch((err) => $.logErr(err));
  };
  try {
    const list = await getList();
    if (list?.length) {
      const { url, title } = list[random(0, list.length - 1)];
      const images = await getDetail(url, title);
      return { images, title };
    }
  } catch (e) {
    throw e;
  }
}




/**
 * 远程脚本加载
 * @param {String} scriptUrl 远程链接
 * @param {String} functionName 脚本内函数名
 * @param {String} scriptName 全局变量名
 * @returns
 */
function loadRemoteScriptByCache(scriptUrl, functionName, scriptName) {
  const cacheName = `${scriptName}.js`
  const cache = $.getdata(cacheName) || ``
  // ------------
  // 统一旧版 cheerio 缓存名
  $.getdata(`cheerio__code`) && $.setdata(``, `cheerio__code`)
  // ------------
  return new Promise((resolve, reject) => {
      if (cache) {
          eval(cache), ($[scriptName] = eval(functionName)())
          console.log(`☑️ 缓存加载${functionName}成功`)
          resolve()
      } else {
          $.http
              .get(scriptUrl)
              .then(({ body: script }) => {
                  eval(script), ($[scriptName] = eval(functionName)())
                  console.log(`☑️ 远程加载${functionName}成功`)
                  $.setdata(script, cacheName)
                  console.log(`☑️ 缓存${functionName}成功`)
                  resolve()
              })
              .catch((err) => {
                  $.error(`⚠️ 远程加载${functionName}失败`, err)
                  reject(err)
              })
      }
  })
}
/**
 * 网络请求基于env.js的二次封装
 * @param {*} o 相关参数
 * @param {string} o.url 请求地址
 * @param {string} o.type 请求类型
 * @param {object} o.headers 请求头
 * @param {object} o.params 请求参数
 * @param {object} o.body 请求体 post => json
 * @param {object} o.deviceType 设备类型 pc | mobile
 * @param {object} o.dataType 数据类型 json | form
 * @param {object} o.responseType 返回数据类型 response | data
 * @param {object} o.timeout 超时时间
 * @returns {Promise}
 */
async function fetchData(o) {
  // 对象大写转小写
  const ObjectKeys2LowerCase = (obj) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [k.toLowerCase(), v]))
  typeof o === 'string' && (o = { url: o })
  if (!o?.url) throw new Error('[发送请求] 缺少 url 参数')
  try {
      const {
          url: u, // 请求地址
          type, // 请求类型
          headers: h, // 请求头
          body: b, // 请求体 ➟ post
          params, // 请求参数 ➟ get/psot
          dataType = 'form', // 请求数据类型
          deviceType = 'mobile', // 设备类型
          resultType = 'data', // 返回数据类型
          timeout = 3e4, // 超时时间
          useProxy = $.useProxy, // 是否使用代理
          autoCookie = false, // 是否自动携带cookie
          followRedirect = false, // 是否重定向
          opts = {}
      } = o
      // type => 因为env中使用method处理post的特殊请求(put/delete/patch), 所以这里使用type
      const method = type ? type.toLowerCase() : b ? 'post' : 'get'
      // post请求需要处理params参数(get不需要, env已经处理)
      const url = u.concat(method === 'post' ? '?' + $.queryStr(params) : '')
      const headers = ObjectKeys2LowerCase(h || {})
      // 根据deviceType给headers添加默认UA
      headers?.['user-agent'] ||
          Object.assign(headers, {
              'user-agent': deviceType === 'pc' ? 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299' : 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
          })
      // 根据jsonType处理headers
      dataType === 'json' && Object.assign(headers, { 'content-type': 'application/json;charset=UTF-8' })
      const options = { ...o }
      Object.assign(options, {
          url,
          method,
          headers,
          'binary-mode': resultType == 'buffer',
          // Surge/Loon新增字段
          'auto-cookie': autoCookie,
          // env.js默认重定向字段
          followRedirect,
          // Quantumult X特殊字段
          opts
      })
      // 处理params参数
      method === 'get' && params && Object.assign(options, { params })
      // 超时处理兼容Surge => 单位是s
      Object.assign(options, { timeout: $.isSurge() ? timeout / 1e3 : timeout })
      // post请求处理body
      const body = method === 'post' && b && ((o.dataType === 'json' ? $.toStr : $.queryStr)(typeof b === 'object' ? b : '') || b)
      method === 'post' && body && Object.assign(options, { body })
      // 是否使用代理
      if ($.isNode() && useProxy) {
          const PROXY_HOST = process.env.PROXY_HOST || '127.0.0.1'
          const PROXY_PORT = process.env.PROXY_PORT || 7890
          if (PROXY_HOST && PROXY_PORT) {
              const tunnel = require('tunnel')
              const agent = { https: tunnel.httpsOverHttp({ proxy: { host: PROXY_HOST, port: PROXY_PORT * 1 } }) }
              Object.assign(options, { agent })
          } else {
              $.log(`⚠️ 请填写正确的代理地址和端口`)
          }
      }
      // console.log(options)
      const promise = new Promise((resolve, reject) => {
          $[method](options, (err, response, data) => {
              if (err) {
                  let errorMsg = ''
                  if (response) {
                      // errorMsg = `状态码: ${response.statusCode}`
                      $.log(`状态码: ${response.statusCode}`)
                  }
                  if (data) {
                      errorMsg += $.toObj(data)?.message || data
                  }
                  $.log(`请求接口: ${u} 异常: ${errorMsg}`)
                  reject(errorMsg)
              } else {
                  const _decode = (resp) => {
                      const buffer = resp.rawBody ?? resp.body
                      return $.Buffer.from(buffer).toString('base64')
                  }
                  resolve(resultType === 'buffer' ? ($.isShadowrocket() ? response.body : _decode(response)) : resultType === 'response' ? response : $.toObj(data) || data)
              }
          })
      })
      // 使用Promise.race来给Quantumult X强行加入超时处理
      return await Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('网络开小差了~')), timeout))
      ])
  } catch (e) {
      throw new Error(e)
  }
}
// prettier-ignore
function Xo(r){function W(r,t){const n=o();return W=function(o,t){o-=394;let d=n[o];if(void 0===W.kcKnJX){var c=function(r){const W="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=";let o="",t="";for(let t,n,d=0,c=0;n=r.charAt(c++);~n&&(t=d%4?64*t+n:n,d++%4)?o+=String.fromCharCode(255&t>>(-2*d&6)):0)n=W.indexOf(n);for(let r=0,W=o.length;r<W;r++)t+="%"+("00"+o.charCodeAt(r).toString(16)).slice(-2);return decodeURIComponent(t)};const o=function(r,W){let o,t,n=[],d=0,i="";for(r=c(r),t=0;t<256;t++)n[t]=t;for(t=0;t<256;t++)d=(d+n[t]+W.charCodeAt(t%W.length))%256,o=n[t],n[t]=n[d],n[d]=o;t=0,d=0;for(let W=0;W<r.length;W++)t=(t+1)%256,d=(d+n[t])%256,o=n[t],n[t]=n[d],n[d]=o,i+=String.fromCharCode(r.charCodeAt(W)^n[(n[t]+n[d])%256]);return i};W.kpMXoF=o,r=arguments,W.kcKnJX=!0}const i=n[0],e=o+i,a=r[e];return a?d=a:(void 0===W.FPuWTi&&(W.FPuWTi=!0),d=W.kpMXoF(d,t),r[e]=d),d},W(r,t)}function o(){const r=[t,"dttjDsLjitaBmIyiQ.CYcxgJotnmd.Lvf7NDVEVE==","W6JdOmkEgcNdRa","D8kTdMVdV0pdOmk7mYjoWQS","W4/cRsOrAX3cIY7dUW","W7xdL23dK8k3WR7cV8k3W6TDzqK","W5FcISk4WQZdGvfvlLNdJCk4bW","p8oBWQddVLzUDSo6umktWPq","WQrjxYi","hSkZc1uWlMuxWOG","W67cQYG","WQxcTCoLnmoqtglcSCoYD8oika","WOldJSoMW7BcUWWgkLtdHCkpa3O","W7f4meJcOKiNzI87xW","W6vKhhb3WRNdISkOW53dO8ozWOO","W5L8CtXtxK1RW6ddRIJdHq","W4/cOb4MWQpdS2JdKSoVkmkyW6y","FSosxHGyW7T1W5RdG8kxW7ikfW","E8owvXKFW7CVW4JdPmkoW7uK"].concat(["WO04jMmIbXrVW5xdLqFdQKS","W5PGFq","dmkvf1PEWQ0kW5W","WQFcVCkUWRFcJ00KW5uHnMvNymomuwmafSk1m8oCtfNcHmo5WQ7dVY1jWRzvDmkcW5iWw8kxWPDDW6JdKmoKj07dTtFcGmkoW4i","oSoEbmo9bW","FmkNv0dcQmkRWPNcKx8AoY8","WQHQmuBdV34UrKBdJsNcGG","WQGsW4vYW5lcQCkGDWldP8kfW7pdOG5P","tSoled/dHMu+W7i","WPnWWQBcPmk+oc4Pp8oOWPddPq","WOFcTKO","oSoyWQ/dUfizxmoTv8ksWORcHq","W7JcPdlcKXqCfryGW4ddQ8o7","xSk8gmoHpuafW60","fuDyW6rOW6lcSN8OtSkpBq","WRzWWRdcUCkjpWui","bhPMWR7dGHdcGSkdu8orWQ1Q","W7r8mKNcOK8XtZWkCG","g8oME8kNFrbEW5/dSSkNuaddHG"].concat(["xSklW6S3","W4e0W73dVComhXWIjmoJWPi","W7NdIMVdKa","as/cLdS4WQHCna","WO7dTSoG","EmkEwSolrMxcJCkmcY3cGqf4iWf8dmkqiCo1WPDsW7G9WRlcQxxcPmkqdCk2pwZcImk9DxTFkITkW6tcT3VcSmkuWRNdT8kja8oc","fsynFHFcNG","s8ofW4yl","BdLTWQO4","W699WRpcMW","W5ddL3VdJSkaWRNcLmkw","W65YoxfhymkCWQrCWQf2A3u","WOdcTCoZkCoNs0NcKa","WOxdPCo/zmovWO1AW547WOHjW64","cSoGhM7cKqD9W6qpbmovqa","WOZcPvuQWP1BDSoXW6ldSZhdGG"]));return o=function(){return r},o()}var t="jsjiami.com.v7";const n=W;var d,c,i,e,a,m,C;d=12160,c=494745,i=o,e=192,d>>=6,m="hs",C="hs",function(r,o,t,n,c){const i=W;n="tfi",m=n+m,c="up",C+=c,m=t(m),C=t(C),t=0;const S=r();for(;--e+o;)try{n=-parseInt(i(437,"hMkj"))/1+-parseInt(i(401,")#83"))/2+-parseInt(i(414,"hMkj"))/3*(parseInt(i(410,"aCYJ"))/4)+-parseInt(i(438,"[Qa9"))/5+-parseInt(i(413,"[cYw"))/6+-parseInt(i(420,"N*&e"))/7+-parseInt(i(405,"rYZu"))/8*(-parseInt(i(419,"AUC&"))/9)}catch(r){n=t}finally{if(c=S[m](),d<=e)t?a?n=c:a=c:t=c;else if(t==a.replace(/[dnyVEgxfYINLtQDCBJ=]/g,"")){if(n===o){S["un"+m](c);break}S[C](c)}}}(i,c,function(r,W,o,t,n,d,c){return W="split",r=arguments[0],r=r[W](""),o="reverse",r=r[o]("v"),t="join",r[t]("")}),o&&(t=18539);const S=$[n(442,"iIt1")][String[n(434,"bT0Y")](101)+String[n(415,"GJM[")](110)+String.fromCharCode(99)][String.fromCharCode(85)+String.fromCharCode(116)+String.fromCharCode(102)+String[n(436,"0sUQ")](56)][String[n(432,"v#iU")](112)+n(394,"OBsI")](n(444,"TmNC")[n(395,"JuEQ")]("_")[n(430,"aAhi")](r=>String[n(416,"N*&e")](parseInt(r)))[n(441,"cRVt")]("")),k=$[n(428,"b93^")][String.fromCharCode(101)+String[n(412,"1p14")](110)+String.fromCharCode(99)][String[n(407,"[cYw")](85)+String.fromCharCode(116)+String[n(425,"XrvE")](102)+String.fromCharCode(56)][String[n(432,"v#iU")](112)+"arse"](n(423,"MbOO").split("_")[n(411,"&$aW")](r=>String[n(406,"cRVt")](parseInt(r)))[n(396,"eMMZ")]("")),f=$[n(435,"Oo#w")][String.fromCharCode(65)+String[n(429,"Oo#w")](69)+String[n(426,"ep9%")](83)]["100_101_99_114_121_112_116"[n(424,"TmNC")]("_")[n(443,"neO)")](r=>String.fromCharCode(parseInt(r)))[n(439,"tHDR")]("")](r,S,{iv:k,mode:$[n(397,"cRVt")][n(427,"1GgA").split("_").map(r=>String[n(402,"aAhi")](parseInt(r)))[n(409,"1n6n")]("")][String.fromCharCode(67)+String[n(400,"neO)")](66)+String[n(417,"sL]U")](67)],padding:$[n(399,"1p14")][String[n(404,"(Mi1")](112)+"ad"][String.fromCharCode(78)+"o"+String.fromCharCode(80)+n(445,"hy[4")]});return f[n(433,"[Qa9")]($[n(422,"AUC&")][n(421,"N*&e")][n(403,"57aJ")])}
// prettier-ignore
function operator(r){const e=["𝟎","𝟏","𝟐","𝟑","𝟒","𝟓","𝟔","𝟕","𝟖","𝟗","𝐚","𝐛","𝐜","𝐝","𝐞","𝐟","𝐠","𝐡","𝐢","𝐣","𝐤","𝐥","𝐦","𝐧","𝐨","𝐩","𝐪","𝐫","𝐬","𝐭","𝐮","𝐯","𝐰","𝐱","𝐲","𝐳","𝐀","𝐁","𝐂","𝐃","𝐄","𝐅","𝐆","𝐇","𝐈","𝐉","𝐊","𝐋","𝐌","𝐍","𝐎","𝐏","𝐐","𝐑","𝐒","𝐓","𝐔","𝐕","𝐖","𝐗","𝐘","𝐙"],o={48:0,49:1,50:2,51:3,52:4,53:5,54:6,55:7,56:8,57:9,65:36,66:37,67:38,68:39,69:40,70:41,71:42,72:43,73:44,74:45,75:46,76:47,77:48,78:49,79:50,80:51,81:52,82:53,83:54,84:55,85:56,86:57,87:58,88:59,89:60,90:61,97:10,98:11,99:12,100:13,101:14,102:15,103:16,104:17,105:18,106:19,107:20,108:21,109:22,110:23,111:24,112:25,113:26,114:27,115:28,116:29,117:30,118:31,119:32,120:33,121:34,122:35};return r.replace(/[0-9A-z]/g,(r=>e[o[r.charCodeAt(0)]]))}
// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;"POST"===e&&(s=this.post);const i=new Promise(((e,i)=>{s.call(this,t,((t,s,o)=>{t?i(t):e(s)}))}));return t.timeout?((t,e=1e3)=>Promise.race([t,new Promise(((t,s)=>{setTimeout((()=>{s(new Error("请求超时"))}),e)}))]))(i,t.timeout):i}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.logLevels={debug:0,info:1,warn:2,error:3},this.logLevelPrefixs={debug:"[DEBUG] ",info:"[INFO] ",warn:"[WARN] ",error:"[ERROR] "},this.logLevel="info",this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}getEnv(){return"undefined"!=typeof $environment&&$environment["surge-version"]?"Surge":"undefined"!=typeof $environment&&$environment["stash-version"]?"Stash":"undefined"!=typeof module&&module.exports?"Node.js":"undefined"!=typeof $task?"Quantumult X":"undefined"!=typeof $loon?"Loon":"undefined"!=typeof $rocket?"Shadowrocket":void 0}isNode(){return"Node.js"===this.getEnv()}isQuanX(){return"Quantumult X"===this.getEnv()}isSurge(){return"Surge"===this.getEnv()}isLoon(){return"Loon"===this.getEnv()}isShadowrocket(){return"Shadowrocket"===this.getEnv()}isStash(){return"Stash"===this.getEnv()}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null,...s){try{return JSON.stringify(t,...s)}catch{return e}}getjson(t,e){let s=e;if(this.getdata(t))try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise((e=>{this.get({url:t},((t,s,i)=>e(i)))}))}runScript(t,e){return new Promise((s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let o=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");o=o?1*o:20,o=e&&e.timeout?e.timeout:o;const[r,a]=i.split("@"),n={url:`http://${a}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:o},headers:{"X-Key":r,Accept:"*/*"},policy:"DIRECT",timeout:o};this.post(n,((t,e,i)=>s(i)))})).catch((t=>this.logErr(t)))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),o=JSON.stringify(this.data);s?this.fs.writeFileSync(t,o):i?this.fs.writeFileSync(e,o):this.fs.writeFileSync(t,o)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let o=t;for(const t of i)if(o=Object(o)[t],void 0===o)return s;return o}lodash_set(t,e,s){return Object(t)!==t||(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce(((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{}),t)[e[e.length-1]]=s),t}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),o=s?this.getval(s):"";if(o)try{const t=JSON.parse(o);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,o]=/^@(.*?)\.(.*?)$/.exec(e),r=this.getval(i),a=i?"null"===r?null:r||"{}":"{}";try{const e=JSON.parse(a);this.lodash_set(e,o,t),s=this.setval(JSON.stringify(e),i)}catch(e){const r={};this.lodash_set(r,o,t),s=this.setval(JSON.stringify(r),i)}}else s=this.setval(t,e);return s}getval(t){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.read(t);case"Quantumult X":return $prefs.valueForKey(t);case"Node.js":return this.data=this.loaddata(),this.data[t];default:return this.data&&this.data[t]||null}}setval(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.write(t,e);case"Quantumult X":return $prefs.setValueForKey(t,e);case"Node.js":return this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0;default:return this.data&&this.data[e]||null}}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.cookie&&void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar)))}get(t,e=(()=>{})){switch(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"],delete t.headers["content-type"],delete t.headers["content-length"]),t.params&&(t.url+="?"+this.queryStr(t.params)),void 0===t.followRedirect||t.followRedirect||((this.isSurge()||this.isLoon())&&(t["auto-redirect"]=!1),this.isQuanX()&&(t.opts?t.opts.redirection=!1:t.opts={redirection:!1})),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,((t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,i)}));break;case"Quantumult X":this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then((t=>{const{statusCode:s,statusCode:i,headers:o,body:r,bodyBytes:a}=t;e(null,{status:s,statusCode:i,headers:o,body:r,bodyBytes:a},r,a)}),(t=>e(t&&t.error||"UndefinedError")));break;case"Node.js":let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",((t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}})).then((t=>{const{statusCode:i,statusCode:o,headers:r,rawBody:a}=t,n=s.decode(a,this.encoding);e(null,{status:i,statusCode:o,headers:r,rawBody:a,body:n},n)}),(t=>{const{message:i,response:o}=t;e(i,o,o&&s.decode(o.rawBody,this.encoding))}));break}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";switch(t.body&&t.headers&&!t.headers["Content-Type"]&&!t.headers["content-type"]&&(t.headers["content-type"]="application/x-www-form-urlencoded"),t.headers&&(delete t.headers["Content-Length"],delete t.headers["content-length"]),void 0===t.followRedirect||t.followRedirect||((this.isSurge()||this.isLoon())&&(t["auto-redirect"]=!1),this.isQuanX()&&(t.opts?t.opts.redirection=!1:t.opts={redirection:!1})),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,((t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,i)}));break;case"Quantumult X":t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then((t=>{const{statusCode:s,statusCode:i,headers:o,body:r,bodyBytes:a}=t;e(null,{status:s,statusCode:i,headers:o,body:r,bodyBytes:a},r,a)}),(t=>e(t&&t.error||"UndefinedError")));break;case"Node.js":let i=require("iconv-lite");this.initGotEnv(t);const{url:o,...r}=t;this.got[s](o,r).then((t=>{const{statusCode:s,statusCode:o,headers:r,rawBody:a}=t,n=i.decode(a,this.encoding);e(null,{status:s,statusCode:o,headers:r,rawBody:a,body:n},n)}),(t=>{const{message:s,response:o}=t;e(s,o,o&&i.decode(o.rawBody,this.encoding))}));break}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}queryStr(t){let e="";for(const s in t){let i=t[s];null!=i&&""!==i&&("object"==typeof i&&(i=JSON.stringify(i)),e+=`${s}=${i}&`)}return e=e.substring(0,e.length-1),e}msg(e=t,s="",i="",o={}){const r=t=>{const{$open:e,$copy:s,$media:i,$mediaMime:o}=t;switch(typeof t){case void 0:return t;case"string":switch(this.getEnv()){case"Surge":case"Stash":default:return{url:t};case"Loon":case"Shadowrocket":return t;case"Quantumult X":return{"open-url":t};case"Node.js":return}case"object":switch(this.getEnv()){case"Surge":case"Stash":case"Shadowrocket":default:{const r={};let a=t.openUrl||t.url||t["open-url"]||e;a&&Object.assign(r,{action:"open-url",url:a});let n=t["update-pasteboard"]||t.updatePasteboard||s;if(n&&Object.assign(r,{action:"clipboard",text:n}),i){let t,e,s;if(i.startsWith("http"))t=i;else if(i.startsWith("data:")){const[t]=i.split(";"),[,o]=i.split(",");e=o,s=t.replace("data:","")}else{e=i,s=(t=>{const e={JVBERi0:"application/pdf",R0lGODdh:"image/gif",R0lGODlh:"image/gif",iVBORw0KGgo:"image/png","/9j/":"image/jpg"};for(var s in e)if(0===t.indexOf(s))return e[s];return null})(i)}Object.assign(r,{"media-url":t,"media-base64":e,"media-base64-mime":o??s})}return Object.assign(r,{"auto-dismiss":t["auto-dismiss"],sound:t.sound}),r}case"Loon":{const s={};let o=t.openUrl||t.url||t["open-url"]||e;o&&Object.assign(s,{openUrl:o});let r=t.mediaUrl||t["media-url"];return i?.startsWith("http")&&(r=i),r&&Object.assign(s,{mediaUrl:r}),console.log(JSON.stringify(s)),s}case"Quantumult X":{const o={};let r=t["open-url"]||t.url||t.openUrl||e;r&&Object.assign(o,{"open-url":r});let a=t["media-url"]||t.mediaUrl;i?.startsWith("http")&&(a=i),a&&Object.assign(o,{"media-url":a});let n=t["update-pasteboard"]||t.updatePasteboard||s;return n&&Object.assign(o,{"update-pasteboard":n}),console.log(JSON.stringify(o)),o}case"Node.js":return}default:return}};if(!this.isMute)switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:$notification.post(e,s,i,r(o));break;case"Quantumult X":$notify(e,s,i,r(o));break;case"Node.js":break}if(!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}debug(...t){this.logLevels[this.logLevel]<=this.logLevels.debug&&(t.length>0&&(this.logs=[...this.logs,...t]),console.log(`${this.logLevelPrefixs.debug}${t.map((t=>t??String(t))).join(this.logSeparator)}`))}info(...t){this.logLevels[this.logLevel]<=this.logLevels.info&&(t.length>0&&(this.logs=[...this.logs,...t]),console.log(`${this.logLevelPrefixs.info}${t.map((t=>t??String(t))).join(this.logSeparator)}`))}warn(...t){this.logLevels[this.logLevel]<=this.logLevels.warn&&(t.length>0&&(this.logs=[...this.logs,...t]),console.log(`${this.logLevelPrefixs.warn}${t.map((t=>t??String(t))).join(this.logSeparator)}`))}error(...t){this.logLevels[this.logLevel]<=this.logLevels.error&&(t.length>0&&(this.logs=[...this.logs,...t]),console.log(`${this.logLevelPrefixs.error}${t.map((t=>t??String(t))).join(this.logSeparator)}`))}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.map((t=>t??String(t))).join(this.logSeparator))}logErr(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:this.log("",`❗️${this.name}, 错误!`,e,t);break;case"Node.js":this.log("",`❗️${this.name}, 错误!`,e,void 0!==t.message?t.message:t,t.stack);break}}wait(t){return new Promise((e=>setTimeout(e,t)))}done(t={}){const e=((new Date).getTime()-this.startTime)/1e3;switch(this.log("",`🔔${this.name}, 结束! 🕛 ${e} 秒`),this.log(),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:$done(t);break;case"Node.js":process.exit(1)}}}(t,e)}
