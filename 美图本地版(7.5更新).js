const axios = require('axios');
const fs = require('fs');
const path = require('path');
const got = require('got');
const cheerio = require('cheerio');
const http = require('http');
const https = require('https');
const { URL } = require('url');
const { HttpsProxyAgent } = require('https-proxy-agent');
const httpsAgent = new HttpsProxyAgent(`http://127.0.0.1:7890`);


// 使生成的网页能在本地端口访问
const express = require('express');
const app = express();
const port = 3000;

// 创建一个 HttpsProxyAgent 实例  
// const proxy = new HttpsProxyAgent('http://localhost:7890');


const $ = new Env("美图写真");
// 图源
const GRAPHIC_SOURCE = {
  "4KHD": "HD4K",
  "115ZY": "ZY115",//  街拍偷拍  丝袜美腿  欧美风情 卡通漫画  网友自拍   露出激情"唯美写真"女优情报”
  // 新時代的我們: 'NEWERA',
  1024: "CAOLIU",
  MMT: 'MMT'
};
// 用户选择
const [SOURCE, CATEGORY] = ($.getdata("meitu_type") ?? "MMT - 街拍偷拍 ")
  .split("-")
  .map((it) => it.trim());//使用 trim() 方法去除每个数组元素的首尾空格。
const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);


// function render(list, title) {
//   return `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title><style>*{margin:0;padding:0;}h1{padding:10px;font-size:1em;}ul{display:flex;flex-wrap:wrap;flex-direction:row;justify-content:center;align-items:center;}li{list-style:none;}img{width:100%;}</style></head>
//   <body>
//   <h1>${title}</h1>
//   <ul>${list
//     .map((it) => `<li><img src="${it}" alt="4khd"></li>`)
//     .join("")}</ul>
//     </body>
//     </html>`;
// }

function render(imageDataArray, title) {
  const imageTags = imageDataArray.map(imageData => `<li><img src="data:image/jpeg;base64,${imageData}" alt="Displayed Image"></li>`).join('');
  return `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title><style>*{margin:0;padding:0;}h1{padding:10px;font-size:1em;}ul{display:flex;flex-wrap:wrap;flex-direction:row;justify-content:center;align-items:center;}li{list-style:none;}img{width:100%;}</style></head>
  <body>
  <h1>${title}</h1>
  <ul>${imageTags}</ul>
  </body>
  </html>`;
}




//------主函数处理逻辑------

//////----修改为本地网页直接显示----
const main = async () => {
  try {
    // await showNotice();
    await loadRemoteScriptByCache(
      "https://cdn.jsdelivr.net/gh/Yuheng0101/X@main/Utils/cheerio.js",
      "createCheerio",
      "cheerio"
    );
    if (!SOURCE) throw "未知错误~";
    const { images, title } = await eval(GRAPHIC_SOURCE[SOURCE])(); //GRAPHIC_SOURCE[SOURCE] 返回一个函数。eval() 执行这个函数。使用 await 等待函数执行完成，获取返回的 images 和 title。
    //返回的images是一个数组，里面是图片的链接。title是一个字符串，是网页的标题。
    // const thumb = images[random(0, images.length - 1)].replace(".webp", ".jpg");//可以省略，作为缩略图
    const imageBase64Array = await Promise.all(images.map(async (imageUrl) => {
      try {
        const response = await axios({
          method: 'get',
          url: imageUrl,
          responseType: 'arraybuffer',
          headers: {
            'Referer': 'https://mm.tvv.tw'
          }
        });
        return Buffer.from(response.data, 'binary').toString('base64');
      } catch (error) {
        console.error('获取图片出错:', error);
        return null;
      }
    }));

    const filteredImages = imageBase64Array.filter(imageData => imageData !== null);
    const html = render(filteredImages, title);

    app.get('/', (req, res) => {
      res.send(html);
    });
  // 启动服务器
  app.listen(app.get('port'), () => {
    console.log('Express started on http://localhost:' + app.get('port'));
  });

//------下载部分-------
  const dir = 'meitu';
  //重新创建文件夹
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  fs.mkdirSync(dir);

  // 下载每一张图片
  await Promise.all(images.map(async (imageUrl, index) => {
    const response = await axios({
      method: 'GET',
      url: imageUrl,
      responseType: 'stream',
      httpsAgent, // 添加代理(这里也要否则400报错)
      headers:{'Referer': 'https://mm.tvv.tw'}, // 添加Referer头部
    });
    const timestamp = Date.now(); // 获取当前时间戳
    // const filePath = path.join(dir, `美图_${index}_${timestamp}.jpg`);
    const filePath = path.join(dir, `美图_${index}.jpg`);
    const writer = fs.createWriteStream(filePath);
    
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  }));

  console.log('🖼️ 所有图片下载成功.');

} 
  catch (e) {
    $.error(e);
  }

};



// /////----直接下载到本地文件夹----
// const main = async () => {
//   try {
//     // await showNotice();
//     // await loadRemoteScriptByCache(
//     //   "https://cdn.jsdelivr.net/gh/Yuheng0101/X@main/Utils/cheerio.js",
//     //   "createCheerio",
//     //   "cheerio"
//     // );
//     if (!SOURCE) throw "未知错误~";
//     const { images, title } = await eval(GRAPHIC_SOURCE[SOURCE])();
//     if (!images || images.length === 0) throw "images 数组为空";
//     // 创建存储图片的目录  这里修改文件夹
//     const dir = 'meitu';
//     //如果存在文件夹则不创建
//     // if (!fs.existsSync(dir)){
//     //   fs.mkdirSync(dir);
//     // }

//     //重新创建文件夹
//     if (fs.existsSync(dir)) {
//       fs.rmSync(dir, { recursive: true, force: true });
//     }
//     fs.mkdirSync(dir);

//     // 下载每一张图片
//     await Promise.all(images.map(async (imageUrl, index) => {
//       const response = await axios({
//         method: 'GET',
//         url: imageUrl,
//         responseType: 'stream',
//         httpsAgent // 添加代理(这里也要否则400报错)
//       });
//       const timestamp = Date.now(); // 获取当前时间戳
//       // const filePath = path.join(dir, `美图_${index}_${timestamp}.jpg`);
//       const filePath = path.join(dir, `美图_${index}.jpg`);
//       const writer = fs.createWriteStream(filePath);
      
//       response.data.pipe(writer);

//       return new Promise((resolve, reject) => {
//         writer.on('finish', resolve);
//         writer.on('error', reject);
//       });
//     }));

//     console.log('🖼️ 所有图片下载成功.');
//   } catch (e) {
//     console.error(e);
//   }
// };



//-----运行main函数-----

//// 圈X中的命令，会阻止监听输出在本地端口，这里更类似于mitm
// if (typeof $request === "undefined") {
//   main().finally(() => $.done({}));
// } else {
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


////直接在本地监听端口并输出图片
// 设置端口
app.set('port', port);
// 执行主函数
main().catch(console.error);



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
        const _$ = cheerio.load(body);
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

    // return $.http
    //   .get(url, options)
    //   .then(({ body }) => {
    //     const _$ = cheerio.load(body);
    //     return _$('img[loading="lazy"][decoding="async"]')
    //       .map((_, el) => _$(el).attr("src"))
    //       .get()
    //       .filter((it) => it.match(/webp\?w=\d+$/));
    //   })
    //   .catch((err) => console.error(err));

   
    // const httpsAgent = new HttpsProxyAgent(`http://127.0.0.1:7890`);
    const response = await axios.get(url,{httpsAgent}); //此处添加了代理

    // 输出代理设置的详细信息
    // console.log(`[𝟒𝐊𝐇𝐃] 🛡️ 代理设置：host=${axios.defaults.proxy}`);

    const $ = cheerio.load(response.data);
    const images = $('img[loading="lazy"][decoding="async"]')
      .map((_, el) => $(el).attr("src"))
      .get()
      .filter(it => it.match(/webp\?w=\d+$/));

    console.log(`[𝟒𝐊𝐇𝐃] 🖼️ 获取到 ${images.length} 张图片`);

    return images;
    
    console.log(`[𝟒𝐊𝐇𝐃] 🚀 发起请求：${url}`);
    // // 使用 util.inspect 的方法
    // const { inspect } = require('util');
    // console.log(`[𝟒𝐊𝐇𝐃] 🛡️ 代理设置：${inspect(options.agent)}`);
    // 使用 JSON 序列化的方法
    // console.log(`[𝟒𝐊𝐇𝐃] 🛡️ 代理设置：${JSON.stringify(options.agent)}`);


    // return $.http.get(url, options)
    // .then(({ body }) => {
    //   console.log(body); // 在这里输出响应体内容
    // })
    // .catch((error) => {
    //   console.error('Error occurred:', error); // 捕获可能的错误
    // });

  };

  
  try {
    const list = await getList();
    if (list?.length) {
      const { url, title } = list[random(0, list.length - 1)];
      const images = await getDetail(url, title);
      // if (!images || images.length === 0) throw "images 数组为空";
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
      .catch((err) => $.error(err));
  };
  const getDetail = (url, title) => {
    console.log(`[𝟏𝟏𝟓𝐙𝐘] 📚开始获取：${title}`);
    return $.http
      .get(url,{httpsAgent})
      .then(({ body }) => {
        const _$ = $.cheerio.load(body);
        return _$("#read_tpc>img")
          .map((_, item) => _$(item).attr("src"))
          .get();
      })
      .catch((err) => $.error(err));
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
      .catch((err) => $.error(err));
  };
  const getDetail = (url, title) => {
    console.log(`[𝐌𝐌𝐓] 📚开始获取：${title}`);
    return $.http
      .get(url,{httpsAgent,headers:{'Referer': 'https://mm.tvv.tw'}})
      .then(({ body }) => {
        const _$ = $.cheerio.load(body);
        return _$(".blog-details-text img")
          .map((_, item) => _$(item).attr("src"))
          .get();
      })
      .catch((err) => $.error(err));
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
// 新時代的我們 => 图片质量差
async function NEWERA() {
  const host = "https://t66y.com/";
  const page = random(1, 50);
  console.log(`[新時代的我們] 📚开始获取：第 ${page} 页`);
  const keywords = encodeURIComponent("国产"); // 搜素关键字
  const getList = () => {
    const url = `${host}thread0806.php?fid=8&search=${keywords}&page=${page}`;
    console.log(url);
    return $.http
      .get(url)
      .then(({ body }) => {
        const _$ = $.cheerio.load(body);
        return _$(".tr3.t_one.tac")
          .map((_, el) => {
            const $a = _$(el).find(".tal a");
            return {
              title: $a.text(),
              url: host + $a.attr("href"),
            };
          })
          .get();
      })
      .catch((err) => $.error(err));
  };
  const getDetail = (url, title) => {
    console.log(`[新時代的我們] 📚开始获取：${title}`);
    return $.http
      .get(url)
      .then(({ body }) => {
        const _$ = $.cheerio.load(body);
        return _$(".tpc_content img")
          .map((_, item) => _$(item).attr("ess-data"))
          .get();
      })
      .catch((err) => $.error(err));
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
// 草榴
async function CAOLIU() {
  let host = "";
  const categoryArr = [
    { name: "唯美写真", fid: 14 },
    { name: "网友自拍", fid: 15 },
    { name: "露出激情", fid: 16 },
    { name: "美乳美臀", fid: 49 },
    { name: "丝袜美腿", fid: 21 },
    // { name: '欧美风情', fid: 114 },
    { name: "卡通漫画", fid: 106 },
    { name: "AI图展", fid: 201 },
  ];
  const category = CATEGORY
    ? categoryArr.find((it) => it.name === CATEGORY)
    : categoryArr[random(0, categoryArr.length - 1)];
  const page = random(1, 50);
  console.log(`[𝐂𝐀𝐎𝐋𝐈𝐔] 📚开始获取：${category.name} 第 ${page} 页`);
  const getDomain = () => {
    return $.http
      .get("https://1024xp.com")
      .then(({ headers }) => {
        let { "set-cookie": cookies } = Object.fromEntries(
          Object.entries(headers).map(([k, v]) => [k.toLowerCase(), v])
        );
        if (typeof cookies !== "string") {
          cookies = cookies.join("; ");
        }
        const domain = cookies.match(/domain=(.*?);/)[1];
        host = domain.replace(/^\./, "https://") + "/pw/";
        console.log(`[𝐂𝐀𝐎𝐋𝐈𝐔] 📚获取到域名：${host}`);
      })
      .catch((err) => $.error(err));
  };
  const getList = () => {
    const url = `${host}thread1022.php?fid=${category.fid}&page=${page}`;
    return $.http
      .get(url)
      .then(({ body }) => {
        const _$ = $.cheerio.load(body);
        return _$(".tr3.t_one")
          .map((_, el) => {
            // a_ajax_xxxxx
            const $a = _$(el).find('[id^="a_ajax"]');
            return {
              title: $a.text(),
              url: host + $a.attr("href"),
            };
          })
          .get();
      })
      .catch((err) => $.error(err));
  };
  const getDetail = (url, title) => {
    console.log(`[𝐂𝐀𝐎𝐋𝐈𝐔] 📚开始获取：${title}`);
    return $.http
      .get(url)
      .then(({ body }) => {
        const _$ = $.cheerio.load(body);
        return _$(".tpc_content img")
          .map((_, item) => _$(item).attr("src"))
          .get();
      })
      .catch((err) => $.error(err));
  };
  try {
    await getDomain();
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
// 免责声明
// async function showNotice() {
//   console.log("==============📣免责声明📣==============");
//   console.log("1. 本脚本仅用于学习研究，禁止用于商业用途");
//   console.log("2. 本脚本不保证准确性、可靠性、完整性和及时性");
//   console.log("3. 任何个人或组织均可无需经过通知而自由使用");
//   console.log("4. 作者对任何脚本问题概不负责，包括由此产生的任何损失");
//   console.log(
//     "5. 如果任何单位或个人认为该脚本可能涉嫌侵犯其权利，应及时通知并提供身份证明、所有权证明，我将在收到认证文件确认后删除"
//   );
//   console.log("6. 请勿将本脚本用于商业用途，由此引起的问题与作者无关");
//   console.log("7. 本脚本及其更新版权归作者所有");
//   console.log("");
// }


/**
 * 远程脚本加载
 * @param {String} scriptUrl 远程链接
 * @param {String} functionName 脚本内函数名
 * @param {String} scriptName 全局变量名
 * @returns
 */
function loadRemoteScriptByCache(scriptUrl, functionName, scriptName) {
  const cacheName = `${scriptName}.js`;
  const cache = $.getdata(cacheName) || ``;
  // ------------
  // 统一旧版 cheerio 缓存名
  $.getdata(`cheerio__code`) && $.setdata(``, `cheerio__code`);
  // ------------
  return new Promise((resolve, reject) => {
    if (cache) {
      eval(cache), ($[scriptName] = eval(functionName)());
      console.log(`☑️ 缓存加载${functionName}成功`);
      resolve();
    } else {
      $.http
        .get(scriptUrl)
        .then(({ body: script }) => {
          eval(script), ($[scriptName] = eval(functionName)());
          console.log(`☑️ 远程加载${functionName}成功`);
          $.setdata(script, cacheName);
          console.log(`☑️ 缓存${functionName}成功`);
          resolve();
        })
        .catch((err) => {
          $.error(`⚠️ 远程加载${functionName}失败`, err);
          reject(err);
        });
    }
  });
}
// prettier-ignore
function operator(r) { const e = ["𝟎", "𝟏", "𝟐", "𝟑", "𝟒", "𝟓", "𝟔", "𝟕", "𝟖", "𝟗", "𝐚", "𝐛", "𝐜", "𝐝", "𝐞", "𝐟", "𝐠", "𝐡", "𝐢", "𝐣", "𝐤", "𝐥", "𝐦", "𝐧", "𝐨", "𝐩", "𝐪", "𝐫", "𝐬", "𝐭", "𝐮", "𝐯", "𝐰", "𝐱", "𝐲", "𝐳", "𝐀", "𝐁", "𝐂", "𝐃", "𝐄", "𝐅", "𝐆", "𝐇", "𝐈", "𝐉", "𝐊", "𝐋", "𝐌", "𝐍", "𝐎", "𝐏", "𝐐", "𝐑", "𝐒", "𝐓", "𝐔", "𝐕", "𝐖", "𝐗", "𝐘", "𝐙"], o = { 48: 0, 49: 1, 50: 2, 51: 3, 52: 4, 53: 5, 54: 6, 55: 7, 56: 8, 57: 9, 65: 36, 66: 37, 67: 38, 68: 39, 69: 40, 70: 41, 71: 42, 72: 43, 73: 44, 74: 45, 75: 46, 76: 47, 77: 48, 78: 49, 79: 50, 80: 51, 81: 52, 82: 53, 83: 54, 84: 55, 85: 56, 86: 57, 87: 58, 88: 59, 89: 60, 90: 61, 97: 10, 98: 11, 99: 12, 100: 13, 101: 14, 102: 15, 103: 16, 104: 17, 105: 18, 106: 19, 107: 20, 108: 21, 109: 22, 110: 23, 111: 24, 112: 25, 113: 26, 114: 27, 115: 28, 116: 29, 117: 30, 118: 31, 119: 32, 120: 33, 121: 34, 122: 35 }; return r.replace(/[0-9A-z]/g, (r => e[o[r.charCodeAt(0)]])) }
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
      }).catch((t) => this.error(t));
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
                  this.error(t);
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
    error(t, e) {
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
