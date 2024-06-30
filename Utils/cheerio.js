/**
 * cheerio.js
 * @description 使用Env、OpenAPI等兼容方法进行网络请求, 这里使用Env举例
 * @example
 * 
const $ = new Env("ModuleName")
async function loadCheerio() {
    return new Promise(async (resolve) => {
        $.getScript(
            'https://cdn.jsdelivr.net/gh/Yuheng0101/X@main/Utils/cheerio.js'
        ).then((fn) => {
            eval(fn)
            const cheerio = createCheerio()
            console.log(`✅ cheerio加载成功, 请继续`)
            resolve(cheerio)
        })
    })
}
 */
// prettier-ignore
function createCheerio() {
  function e(t, r, n) {
    function i(s, o) {
      if (!r[s]) {
        if (!t[s]) {
          var c = "function" == typeof require && require;
          if (!o && c) return c(s, !0);
          if (a) return a(s, !0);
          var u = new Error("Cannot find module '" + s + "'");
          throw ((u.code = "MODULE_NOT_FOUND"), u);
        }
        var l = (r[s] = { exports: {} });
        t[s][0].call(
          l.exports,
          function (e) {
            var r = t[s][1][e];
            return i(r || e);
          },
          l,
          l.exports,
          e,
          t,
          r,
          n
        );
      }
      return r[s].exports;
    }
    let s = {};
    for (
      var a = "function" == typeof require && require, o = 0;
      o < n.length;
      o++
    )
      Object.assign(s, i(n[o]));
    return s;
  }
  const t = {
    1: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          var t = e.length;
          if (t % 4 > 0)
            throw new Error("Invalid string. Length must be a multiple of 4");
          var r = e.indexOf("=");
          -1 === r && (r = t);
          var n = r === t ? 0 : 4 - (r % 4);
          return [r, n];
        }
        function i(e) {
          var t = n(e),
            r = t[0],
            i = t[1];
          return (3 * (r + i)) / 4 - i;
        }
        function s(e, t, r) {
          return (3 * (t + r)) / 4 - r;
        }
        function a(e) {
          var t,
            r,
            i = n(e),
            a = i[0],
            o = i[1],
            c = new T(s(e, a, o)),
            u = 0,
            l = o > 0 ? a - 4 : a;
          for (r = 0; r < l; r += 4)
            (t =
              (h[e.charCodeAt(r)] << 18) |
              (h[e.charCodeAt(r + 1)] << 12) |
              (h[e.charCodeAt(r + 2)] << 6) |
              h[e.charCodeAt(r + 3)]),
              (c[u++] = (t >> 16) & 255),
              (c[u++] = (t >> 8) & 255),
              (c[u++] = 255 & t);
          return (
            2 === o &&
              ((t = (h[e.charCodeAt(r)] << 2) | (h[e.charCodeAt(r + 1)] >> 4)),
              (c[u++] = 255 & t)),
            1 === o &&
              ((t =
                (h[e.charCodeAt(r)] << 10) |
                (h[e.charCodeAt(r + 1)] << 4) |
                (h[e.charCodeAt(r + 2)] >> 2)),
              (c[u++] = (t >> 8) & 255),
              (c[u++] = 255 & t)),
            c
          );
        }
        function o(e) {
          return (
            l[(e >> 18) & 63] + l[(e >> 12) & 63] + l[(e >> 6) & 63] + l[63 & e]
          );
        }
        function c(e, t, r) {
          for (var n, i = [], s = t; s < r; s += 3)
            (n =
              ((e[s] << 16) & 16711680) +
              ((e[s + 1] << 8) & 65280) +
              (255 & e[s + 2])),
              i.push(o(n));
          return i.join("");
        }
        function u(e) {
          for (
            var t, r = e.length, n = r % 3, i = [], s = 16383, a = 0, o = r - n;
            a < o;
            a += s
          )
            i.push(c(e, a, a + s > o ? o : a + s));
          return (
            1 === n
              ? ((t = e[r - 1]), i.push(l[t >> 2] + l[(t << 4) & 63] + "=="))
              : 2 === n &&
                ((t = (e[r - 2] << 8) + e[r - 1]),
                i.push(l[t >> 10] + l[(t >> 4) & 63] + l[(t << 2) & 63] + "=")),
            i.join("")
          );
        }
        (r.byteLength = i), (r.toByteArray = a), (r.fromByteArray = u);
        for (
          var l = [],
            h = [],
            T = "undefined" != typeof Uint8Array ? Uint8Array : Array,
            d =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            E = 0,
            p = d.length;
          E < p;
          ++E
        )
          (l[E] = d[E]), (h[d.charCodeAt(E)] = E);
        (h["-".charCodeAt(0)] = 62), (h["_".charCodeAt(0)] = 63);
      },
      {},
    ],
    2: [
      function (e, t, r) {
        (function (t) {
          (function () {
            "use strict";
            function t() {
              try {
                var e = new Uint8Array(1);
                return (
                  (e.__proto__ = {
                    __proto__: Uint8Array.prototype,
                    foo: function () {
                      return 42;
                    },
                  }),
                  42 === e.foo()
                );
              } catch (e) {
                return !1;
              }
            }
            function n(e) {
              if (e > K)
                throw new RangeError(
                  'The value "' + e + '" is invalid for option "size"'
                );
              var t = new Uint8Array(e);
              return (t.__proto__ = i.prototype), t;
            }
            function i(e, t, r) {
              if ("number" == typeof e) {
                if ("string" == typeof t)
                  throw new TypeError(
                    'The "string" argument must be of type string. Received type number'
                  );
                return c(e);
              }
              return s(e, t, r);
            }
            function s(e, t, r) {
              if ("string" == typeof e) return u(e, t);
              if (ArrayBuffer.isView(e)) return l(e);
              if (null == e)
                throw TypeError(
                  "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
                    typeof e
                );
              if (V(e, ArrayBuffer) || (e && V(e.buffer, ArrayBuffer)))
                return h(e, t, r);
              if ("number" == typeof e)
                throw new TypeError(
                  'The "value" argument must not be of type number. Received type number'
                );
              var n = e.valueOf && e.valueOf();
              if (null != n && n !== e) return i.from(n, t, r);
              var s = T(e);
              if (s) return s;
              if (
                "undefined" != typeof Symbol &&
                null != Symbol.toPrimitive &&
                "function" == typeof e[Symbol.toPrimitive]
              )
                return i.from(e[Symbol.toPrimitive]("string"), t, r);
              throw new TypeError(
                "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
                  typeof e
              );
            }
            function a(e) {
              if ("number" != typeof e)
                throw new TypeError('"size" argument must be of type number');
              if (e < 0)
                throw new RangeError(
                  'The value "' + e + '" is invalid for option "size"'
                );
            }
            function o(e, t, r) {
              return (
                a(e),
                e <= 0
                  ? n(e)
                  : void 0 !== t
                  ? "string" == typeof r
                    ? n(e).fill(t, r)
                    : n(e).fill(t)
                  : n(e)
              );
            }
            function c(e) {
              return a(e), n(e < 0 ? 0 : 0 | d(e));
            }
            function u(e, t) {
              if (
                (("string" == typeof t && "" !== t) || (t = "utf8"),
                !i.isEncoding(t))
              )
                throw new TypeError("Unknown encoding: " + t);
              var r = 0 | p(e, t),
                s = n(r),
                a = s.write(e, t);
              return a !== r && (s = s.slice(0, a)), s;
            }
            function l(e) {
              for (
                var t = e.length < 0 ? 0 : 0 | d(e.length), r = n(t), i = 0;
                i < t;
                i += 1
              )
                r[i] = 255 & e[i];
              return r;
            }
            function h(e, t, r) {
              if (t < 0 || e.byteLength < t)
                throw new RangeError('"offset" is outside of buffer bounds');
              if (e.byteLength < t + (r || 0))
                throw new RangeError('"length" is outside of buffer bounds');
              var n;
              return (
                (n =
                  void 0 === t && void 0 === r
                    ? new Uint8Array(e)
                    : void 0 === r
                    ? new Uint8Array(e, t)
                    : new Uint8Array(e, t, r)),
                (n.__proto__ = i.prototype),
                n
              );
            }
            function T(e) {
              if (i.isBuffer(e)) {
                var t = 0 | d(e.length),
                  r = n(t);
                return 0 === r.length ? r : (e.copy(r, 0, 0, t), r);
              }
              return void 0 !== e.length
                ? "number" != typeof e.length || Q(e.length)
                  ? n(0)
                  : l(e)
                : "Buffer" === e.type && Array.isArray(e.data)
                ? l(e.data)
                : void 0;
            }
            function d(e) {
              if (e >= K)
                throw new RangeError(
                  "Attempt to allocate Buffer larger than maximum size: 0x" +
                    K.toString(16) +
                    " bytes"
                );
              return 0 | e;
            }
            function E(e) {
              return +e != e && (e = 0), i.alloc(+e);
            }
            function p(e, t) {
              if (i.isBuffer(e)) return e.length;
              if (ArrayBuffer.isView(e) || V(e, ArrayBuffer))
                return e.byteLength;
              if ("string" != typeof e)
                throw new TypeError(
                  'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
                    typeof e
                );
              var r = e.length,
                n = arguments.length > 2 && !0 === arguments[2];
              if (!n && 0 === r) return 0;
              for (var s = !1; ; )
                switch (t) {
                  case "ascii":
                  case "latin1":
                  case "binary":
                    return r;
                  case "utf8":
                  case "utf-8":
                    return H(e).length;
                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return 2 * r;
                  case "hex":
                    return r >>> 1;
                  case "base64":
                    return q(e).length;
                  default:
                    if (s) return n ? -1 : H(e).length;
                    (t = ("" + t).toLowerCase()), (s = !0);
                }
            }
            function f(e, t, r) {
              var n = !1;
              if (((void 0 === t || t < 0) && (t = 0), t > this.length))
                return "";
              if (
                ((void 0 === r || r > this.length) && (r = this.length), r <= 0)
              )
                return "";
              if (((r >>>= 0), (t >>>= 0), r <= t)) return "";
              for (e || (e = "utf8"); ; )
                switch (e) {
                  case "hex":
                    return v(this, t, r);
                  case "utf8":
                  case "utf-8":
                    return b(this, t, r);
                  case "ascii":
                    return y(this, t, r);
                  case "latin1":
                  case "binary":
                    return P(this, t, r);
                  case "base64":
                    return O(this, t, r);
                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return L(this, t, r);
                  default:
                    if (n) throw new TypeError("Unknown encoding: " + e);
                    (e = (e + "").toLowerCase()), (n = !0);
                }
            }
            function _(e, t, r) {
              var n = e[t];
              (e[t] = e[r]), (e[r] = n);
            }
            function A(e, t, r, n, s) {
              if (0 === e.length) return -1;
              if (
                ("string" == typeof r
                  ? ((n = r), (r = 0))
                  : r > 2147483647
                  ? (r = 2147483647)
                  : r < -2147483648 && (r = -2147483648),
                (r = +r),
                Q(r) && (r = s ? 0 : e.length - 1),
                r < 0 && (r = e.length + r),
                r >= e.length)
              ) {
                if (s) return -1;
                r = e.length - 1;
              } else if (r < 0) {
                if (!s) return -1;
                r = 0;
              }
              if (("string" == typeof t && (t = i.from(t, n)), i.isBuffer(t)))
                return 0 === t.length ? -1 : m(e, t, r, n, s);
              if ("number" == typeof t)
                return (
                  (t &= 255),
                  "function" == typeof Uint8Array.prototype.indexOf
                    ? s
                      ? Uint8Array.prototype.indexOf.call(e, t, r)
                      : Uint8Array.prototype.lastIndexOf.call(e, t, r)
                    : m(e, [t], r, n, s)
                );
              throw new TypeError("val must be string, number or Buffer");
            }
            function m(e, t, r, n, i) {
              function s(e, t) {
                return 1 === o ? e[t] : e.readUInt16BE(t * o);
              }
              var a,
                o = 1,
                c = e.length,
                u = t.length;
              if (
                void 0 !== n &&
                ((n = String(n).toLowerCase()),
                "ucs2" === n ||
                  "ucs-2" === n ||
                  "utf16le" === n ||
                  "utf-16le" === n)
              ) {
                if (e.length < 2 || t.length < 2) return -1;
                (o = 2), (c /= 2), (u /= 2), (r /= 2);
              }
              if (i) {
                var l = -1;
                for (a = r; a < c; a++)
                  if (s(e, a) === s(t, -1 === l ? 0 : a - l)) {
                    if ((-1 === l && (l = a), a - l + 1 === u)) return l * o;
                  } else -1 !== l && (a -= a - l), (l = -1);
              } else
                for (r + u > c && (r = c - u), a = r; a >= 0; a--) {
                  for (var h = !0, T = 0; T < u; T++)
                    if (s(e, a + T) !== s(t, T)) {
                      h = !1;
                      break;
                    }
                  if (h) return a;
                }
              return -1;
            }
            function I(e, t, r, n) {
              r = Number(r) || 0;
              var i = e.length - r;
              n ? ((n = Number(n)), n > i && (n = i)) : (n = i);
              var s = t.length;
              n > s / 2 && (n = s / 2);
              for (var a = 0; a < n; ++a) {
                var o = parseInt(t.substr(2 * a, 2), 16);
                if (Q(o)) return a;
                e[r + a] = o;
              }
              return a;
            }
            function D(e, t, r, n) {
              return Y(H(t, e.length - r), e, r, n);
            }
            function g(e, t, r, n) {
              return Y(F(t), e, r, n);
            }
            function N(e, t, r, n) {
              return g(e, t, r, n);
            }
            function C(e, t, r, n) {
              return Y(q(t), e, r, n);
            }
            function S(e, t, r, n) {
              return Y(j(t, e.length - r), e, r, n);
            }
            function O(e, t, r) {
              return 0 === t && r === e.length
                ? X.fromByteArray(e)
                : X.fromByteArray(e.slice(t, r));
            }
            function b(e, t, r) {
              r = Math.min(e.length, r);
              for (var n = [], i = t; i < r; ) {
                var s,
                  a,
                  o,
                  c,
                  u = e[i],
                  l = null,
                  h = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1;
                if (i + h <= r)
                  switch (h) {
                    case 1:
                      u < 128 && (l = u);
                      break;
                    case 2:
                      (s = e[i + 1]),
                        128 == (192 & s) &&
                          ((c = ((31 & u) << 6) | (63 & s)),
                          c > 127 && (l = c));
                      break;
                    case 3:
                      (s = e[i + 1]),
                        (a = e[i + 2]),
                        128 == (192 & s) &&
                          128 == (192 & a) &&
                          ((c = ((15 & u) << 12) | ((63 & s) << 6) | (63 & a)),
                          c > 2047 && (c < 55296 || c > 57343) && (l = c));
                      break;
                    case 4:
                      (s = e[i + 1]),
                        (a = e[i + 2]),
                        (o = e[i + 3]),
                        128 == (192 & s) &&
                          128 == (192 & a) &&
                          128 == (192 & o) &&
                          ((c =
                            ((15 & u) << 18) |
                            ((63 & s) << 12) |
                            ((63 & a) << 6) |
                            (63 & o)),
                          c > 65535 && c < 1114112 && (l = c));
                  }
                null === l
                  ? ((l = 65533), (h = 1))
                  : l > 65535 &&
                    ((l -= 65536),
                    n.push(((l >>> 10) & 1023) | 55296),
                    (l = 56320 | (1023 & l))),
                  n.push(l),
                  (i += h);
              }
              return R(n);
            }
            function R(e) {
              var t = e.length;
              if (t <= z) return String.fromCharCode.apply(String, e);
              for (var r = "", n = 0; n < t; )
                r += String.fromCharCode.apply(String, e.slice(n, (n += z)));
              return r;
            }
            function y(e, t, r) {
              var n = "";
              r = Math.min(e.length, r);
              for (var i = t; i < r; ++i) n += String.fromCharCode(127 & e[i]);
              return n;
            }
            function P(e, t, r) {
              var n = "";
              r = Math.min(e.length, r);
              for (var i = t; i < r; ++i) n += String.fromCharCode(e[i]);
              return n;
            }
            function v(e, t, r) {
              var n = e.length;
              (!t || t < 0) && (t = 0), (!r || r < 0 || r > n) && (r = n);
              for (var i = "", s = t; s < r; ++s) i += U(e[s]);
              return i;
            }
            function L(e, t, r) {
              for (var n = e.slice(t, r), i = "", s = 0; s < n.length; s += 2)
                i += String.fromCharCode(n[s] + 256 * n[s + 1]);
              return i;
            }
            function M(e, t, r) {
              if (e % 1 != 0 || e < 0)
                throw new RangeError("offset is not uint");
              if (e + t > r)
                throw new RangeError("Trying to access beyond buffer length");
            }
            function k(e, t, r, n, s, a) {
              if (!i.isBuffer(e))
                throw new TypeError(
                  '"buffer" argument must be a Buffer instance'
                );
              if (t > s || t < a)
                throw new RangeError('"value" argument is out of bounds');
              if (r + n > e.length) throw new RangeError("Index out of range");
            }
            function G(e, t, r, n, i, s) {
              if (r + n > e.length) throw new RangeError("Index out of range");
              if (r < 0) throw new RangeError("Index out of range");
            }
            function B(e, t, r, n, i) {
              return (
                (t = +t),
                (r >>>= 0),
                i ||
                  G(e, t, r, 4, 3.4028234663852886e38, -3.4028234663852886e38),
                W.write(e, t, r, n, 23, 4),
                r + 4
              );
            }
            function w(e, t, r, n, i) {
              return (
                (t = +t),
                (r >>>= 0),
                i ||
                  G(
                    e,
                    t,
                    r,
                    8,
                    1.7976931348623157e308,
                    -1.7976931348623157e308
                  ),
                W.write(e, t, r, n, 52, 8),
                r + 8
              );
            }
            function x(e) {
              if (
                ((e = e.split("=")[0]),
                (e = e.trim().replace(Z, "")),
                e.length < 2)
              )
                return "";
              for (; e.length % 4 != 0; ) e += "=";
              return e;
            }
            function U(e) {
              return e < 16 ? "0" + e.toString(16) : e.toString(16);
            }
            function H(e, t) {
              var r;
              t = t || 1 / 0;
              for (var n = e.length, i = null, s = [], a = 0; a < n; ++a) {
                if (((r = e.charCodeAt(a)), r > 55295 && r < 57344)) {
                  if (!i) {
                    if (r > 56319) {
                      (t -= 3) > -1 && s.push(239, 191, 189);
                      continue;
                    }
                    if (a + 1 === n) {
                      (t -= 3) > -1 && s.push(239, 191, 189);
                      continue;
                    }
                    i = r;
                    continue;
                  }
                  if (r < 56320) {
                    (t -= 3) > -1 && s.push(239, 191, 189), (i = r);
                    continue;
                  }
                  r = 65536 + (((i - 55296) << 10) | (r - 56320));
                } else i && (t -= 3) > -1 && s.push(239, 191, 189);
                if (((i = null), r < 128)) {
                  if ((t -= 1) < 0) break;
                  s.push(r);
                } else if (r < 2048) {
                  if ((t -= 2) < 0) break;
                  s.push((r >> 6) | 192, (63 & r) | 128);
                } else if (r < 65536) {
                  if ((t -= 3) < 0) break;
                  s.push(
                    (r >> 12) | 224,
                    ((r >> 6) & 63) | 128,
                    (63 & r) | 128
                  );
                } else {
                  if (!(r < 1114112)) throw new Error("Invalid code point");
                  if ((t -= 4) < 0) break;
                  s.push(
                    (r >> 18) | 240,
                    ((r >> 12) & 63) | 128,
                    ((r >> 6) & 63) | 128,
                    (63 & r) | 128
                  );
                }
              }
              return s;
            }
            function F(e) {
              for (var t = [], r = 0; r < e.length; ++r)
                t.push(255 & e.charCodeAt(r));
              return t;
            }
            function j(e, t) {
              for (
                var r, n, i, s = [], a = 0;
                a < e.length && !((t -= 2) < 0);
                ++a
              )
                (r = e.charCodeAt(a)),
                  (n = r >> 8),
                  (i = r % 256),
                  s.push(i),
                  s.push(n);
              return s;
            }
            function q(e) {
              return X.toByteArray(x(e));
            }
            function Y(e, t, r, n) {
              for (
                var i = 0;
                i < n && !(i + r >= t.length || i >= e.length);
                ++i
              )
                t[i + r] = e[i];
              return i;
            }
            function V(e, t) {
              return (
                e instanceof t ||
                (null != e &&
                  null != e.constructor &&
                  null != e.constructor.name &&
                  e.constructor.name === t.name)
              );
            }
            function Q(e) {
              return e != e;
            }
            var X = e("base64-js"),
              W = e("ieee754");
            (r.Buffer = i), (r.SlowBuffer = E), (r.INSPECT_MAX_BYTES = 50);
            var K = 2147483647;
            (r.kMaxLength = K),
              (i.TYPED_ARRAY_SUPPORT = t()),
              i.TYPED_ARRAY_SUPPORT ||
                "undefined" == typeof console ||
                "function" != typeof console.error ||
                console.error(
                  "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
                ),
              Object.defineProperty(i.prototype, "parent", {
                enumerable: !0,
                get: function () {
                  if (i.isBuffer(this)) return this.buffer;
                },
              }),
              Object.defineProperty(i.prototype, "offset", {
                enumerable: !0,
                get: function () {
                  if (i.isBuffer(this)) return this.byteOffset;
                },
              }),
              "undefined" != typeof Symbol &&
                null != Symbol.species &&
                i[Symbol.species] === i &&
                Object.defineProperty(i, Symbol.species, {
                  value: null,
                  configurable: !0,
                  enumerable: !1,
                  writable: !1,
                }),
              (i.poolSize = 8192),
              (i.from = function (e, t, r) {
                return s(e, t, r);
              }),
              (i.prototype.__proto__ = Uint8Array.prototype),
              (i.__proto__ = Uint8Array),
              (i.alloc = function (e, t, r) {
                return o(e, t, r);
              }),
              (i.allocUnsafe = function (e) {
                return c(e);
              }),
              (i.allocUnsafeSlow = function (e) {
                return c(e);
              }),
              (i.isBuffer = function (e) {
                return null != e && !0 === e._isBuffer && e !== i.prototype;
              }),
              (i.compare = function (e, t) {
                if (
                  (V(e, Uint8Array) && (e = i.from(e, e.offset, e.byteLength)),
                  V(t, Uint8Array) && (t = i.from(t, t.offset, t.byteLength)),
                  !i.isBuffer(e) || !i.isBuffer(t))
                )
                  throw new TypeError(
                    'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
                  );
                if (e === t) return 0;
                for (
                  var r = e.length, n = t.length, s = 0, a = Math.min(r, n);
                  s < a;
                  ++s
                )
                  if (e[s] !== t[s]) {
                    (r = e[s]), (n = t[s]);
                    break;
                  }
                return r < n ? -1 : n < r ? 1 : 0;
              }),
              (i.isEncoding = function (e) {
                switch (String(e).toLowerCase()) {
                  case "hex":
                  case "utf8":
                  case "utf-8":
                  case "ascii":
                  case "latin1":
                  case "binary":
                  case "base64":
                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return !0;
                  default:
                    return !1;
                }
              }),
              (i.concat = function (e, t) {
                if (!Array.isArray(e))
                  throw new TypeError(
                    '"list" argument must be an Array of Buffers'
                  );
                if (0 === e.length) return i.alloc(0);
                var r;
                if (void 0 === t)
                  for (t = 0, r = 0; r < e.length; ++r) t += e[r].length;
                var n = i.allocUnsafe(t),
                  s = 0;
                for (r = 0; r < e.length; ++r) {
                  var a = e[r];
                  if ((V(a, Uint8Array) && (a = i.from(a)), !i.isBuffer(a)))
                    throw new TypeError(
                      '"list" argument must be an Array of Buffers'
                    );
                  a.copy(n, s), (s += a.length);
                }
                return n;
              }),
              (i.byteLength = p),
              (i.prototype._isBuffer = !0),
              (i.prototype.swap16 = function () {
                var e = this.length;
                if (e % 2 != 0)
                  throw new RangeError(
                    "Buffer size must be a multiple of 16-bits"
                  );
                for (var t = 0; t < e; t += 2) _(this, t, t + 1);
                return this;
              }),
              (i.prototype.swap32 = function () {
                var e = this.length;
                if (e % 4 != 0)
                  throw new RangeError(
                    "Buffer size must be a multiple of 32-bits"
                  );
                for (var t = 0; t < e; t += 4)
                  _(this, t, t + 3), _(this, t + 1, t + 2);
                return this;
              }),
              (i.prototype.swap64 = function () {
                var e = this.length;
                if (e % 8 != 0)
                  throw new RangeError(
                    "Buffer size must be a multiple of 64-bits"
                  );
                for (var t = 0; t < e; t += 8)
                  _(this, t, t + 7),
                    _(this, t + 1, t + 6),
                    _(this, t + 2, t + 5),
                    _(this, t + 3, t + 4);
                return this;
              }),
              (i.prototype.toString = function () {
                var e = this.length;
                return 0 === e
                  ? ""
                  : 0 === arguments.length
                  ? b(this, 0, e)
                  : f.apply(this, arguments);
              }),
              (i.prototype.toLocaleString = i.prototype.toString),
              (i.prototype.equals = function (e) {
                if (!i.isBuffer(e))
                  throw new TypeError("Argument must be a Buffer");
                return this === e || 0 === i.compare(this, e);
              }),
              (i.prototype.inspect = function () {
                var e = "",
                  t = r.INSPECT_MAX_BYTES;
                return (
                  (e = this.toString("hex", 0, t)
                    .replace(/(.{2})/g, "$1 ")
                    .trim()),
                  this.length > t && (e += " ... "),
                  "<Buffer " + e + ">"
                );
              }),
              (i.prototype.compare = function (e, t, r, n, s) {
                if (
                  (V(e, Uint8Array) && (e = i.from(e, e.offset, e.byteLength)),
                  !i.isBuffer(e))
                )
                  throw new TypeError(
                    'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
                      typeof e
                  );
                if (
                  (void 0 === t && (t = 0),
                  void 0 === r && (r = e ? e.length : 0),
                  void 0 === n && (n = 0),
                  void 0 === s && (s = this.length),
                  t < 0 || r > e.length || n < 0 || s > this.length)
                )
                  throw new RangeError("out of range index");
                if (n >= s && t >= r) return 0;
                if (n >= s) return -1;
                if (t >= r) return 1;
                if (
                  ((t >>>= 0), (r >>>= 0), (n >>>= 0), (s >>>= 0), this === e)
                )
                  return 0;
                for (
                  var a = s - n,
                    o = r - t,
                    c = Math.min(a, o),
                    u = this.slice(n, s),
                    l = e.slice(t, r),
                    h = 0;
                  h < c;
                  ++h
                )
                  if (u[h] !== l[h]) {
                    (a = u[h]), (o = l[h]);
                    break;
                  }
                return a < o ? -1 : o < a ? 1 : 0;
              }),
              (i.prototype.includes = function (e, t, r) {
                return -1 !== this.indexOf(e, t, r);
              }),
              (i.prototype.indexOf = function (e, t, r) {
                return A(this, e, t, r, !0);
              }),
              (i.prototype.lastIndexOf = function (e, t, r) {
                return A(this, e, t, r, !1);
              }),
              (i.prototype.write = function (e, t, r, n) {
                if (void 0 === t) (n = "utf8"), (r = this.length), (t = 0);
                else if (void 0 === r && "string" == typeof t)
                  (n = t), (r = this.length), (t = 0);
                else {
                  if (!isFinite(t))
                    throw new Error(
                      "Buffer.write(string, encoding, offset[, length]) is no longer supported"
                    );
                  (t >>>= 0),
                    isFinite(r)
                      ? ((r >>>= 0), void 0 === n && (n = "utf8"))
                      : ((n = r), (r = void 0));
                }
                var i = this.length - t;
                if (
                  ((void 0 === r || r > i) && (r = i),
                  (e.length > 0 && (r < 0 || t < 0)) || t > this.length)
                )
                  throw new RangeError(
                    "Attempt to write outside buffer bounds"
                  );
                n || (n = "utf8");
                for (var s = !1; ; )
                  switch (n) {
                    case "hex":
                      return I(this, e, t, r);
                    case "utf8":
                    case "utf-8":
                      return D(this, e, t, r);
                    case "ascii":
                      return g(this, e, t, r);
                    case "latin1":
                    case "binary":
                      return N(this, e, t, r);
                    case "base64":
                      return C(this, e, t, r);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                      return S(this, e, t, r);
                    default:
                      if (s) throw new TypeError("Unknown encoding: " + n);
                      (n = ("" + n).toLowerCase()), (s = !0);
                  }
              }),
              (i.prototype.toJSON = function () {
                return {
                  type: "Buffer",
                  data: Array.prototype.slice.call(this._arr || this, 0),
                };
              });
            var z = 4096;
            (i.prototype.slice = function (e, t) {
              var r = this.length;
              (e = ~~e),
                (t = void 0 === t ? r : ~~t),
                e < 0 ? ((e += r), e < 0 && (e = 0)) : e > r && (e = r),
                t < 0 ? ((t += r), t < 0 && (t = 0)) : t > r && (t = r),
                t < e && (t = e);
              var n = this.subarray(e, t);
              return (n.__proto__ = i.prototype), n;
            }),
              (i.prototype.readUIntLE = function (e, t, r) {
                (e >>>= 0), (t >>>= 0), r || M(e, t, this.length);
                for (var n = this[e], i = 1, s = 0; ++s < t && (i *= 256); )
                  n += this[e + s] * i;
                return n;
              }),
              (i.prototype.readUIntBE = function (e, t, r) {
                (e >>>= 0), (t >>>= 0), r || M(e, t, this.length);
                for (var n = this[e + --t], i = 1; t > 0 && (i *= 256); )
                  n += this[e + --t] * i;
                return n;
              }),
              (i.prototype.readUInt8 = function (e, t) {
                return (e >>>= 0), t || M(e, 1, this.length), this[e];
              }),
              (i.prototype.readUInt16LE = function (e, t) {
                return (
                  (e >>>= 0),
                  t || M(e, 2, this.length),
                  this[e] | (this[e + 1] << 8)
                );
              }),
              (i.prototype.readUInt16BE = function (e, t) {
                return (
                  (e >>>= 0),
                  t || M(e, 2, this.length),
                  (this[e] << 8) | this[e + 1]
                );
              }),
              (i.prototype.readUInt32LE = function (e, t) {
                return (
                  (e >>>= 0),
                  t || M(e, 4, this.length),
                  (this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) +
                    16777216 * this[e + 3]
                );
              }),
              (i.prototype.readUInt32BE = function (e, t) {
                return (
                  (e >>>= 0),
                  t || M(e, 4, this.length),
                  16777216 * this[e] +
                    ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3])
                );
              }),
              (i.prototype.readIntLE = function (e, t, r) {
                (e >>>= 0), (t >>>= 0), r || M(e, t, this.length);
                for (var n = this[e], i = 1, s = 0; ++s < t && (i *= 256); )
                  n += this[e + s] * i;
                return (i *= 128), n >= i && (n -= Math.pow(2, 8 * t)), n;
              }),
              (i.prototype.readIntBE = function (e, t, r) {
                (e >>>= 0), (t >>>= 0), r || M(e, t, this.length);
                for (var n = t, i = 1, s = this[e + --n]; n > 0 && (i *= 256); )
                  s += this[e + --n] * i;
                return (i *= 128), s >= i && (s -= Math.pow(2, 8 * t)), s;
              }),
              (i.prototype.readInt8 = function (e, t) {
                return (
                  (e >>>= 0),
                  t || M(e, 1, this.length),
                  128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
                );
              }),
              (i.prototype.readInt16LE = function (e, t) {
                (e >>>= 0), t || M(e, 2, this.length);
                var r = this[e] | (this[e + 1] << 8);
                return 32768 & r ? 4294901760 | r : r;
              }),
              (i.prototype.readInt16BE = function (e, t) {
                (e >>>= 0), t || M(e, 2, this.length);
                var r = this[e + 1] | (this[e] << 8);
                return 32768 & r ? 4294901760 | r : r;
              }),
              (i.prototype.readInt32LE = function (e, t) {
                return (
                  (e >>>= 0),
                  t || M(e, 4, this.length),
                  this[e] |
                    (this[e + 1] << 8) |
                    (this[e + 2] << 16) |
                    (this[e + 3] << 24)
                );
              }),
              (i.prototype.readInt32BE = function (e, t) {
                return (
                  (e >>>= 0),
                  t || M(e, 4, this.length),
                  (this[e] << 24) |
                    (this[e + 1] << 16) |
                    (this[e + 2] << 8) |
                    this[e + 3]
                );
              }),
              (i.prototype.readFloatLE = function (e, t) {
                return (
                  (e >>>= 0),
                  t || M(e, 4, this.length),
                  W.read(this, e, !0, 23, 4)
                );
              }),
              (i.prototype.readFloatBE = function (e, t) {
                return (
                  (e >>>= 0),
                  t || M(e, 4, this.length),
                  W.read(this, e, !1, 23, 4)
                );
              }),
              (i.prototype.readDoubleLE = function (e, t) {
                return (
                  (e >>>= 0),
                  t || M(e, 8, this.length),
                  W.read(this, e, !0, 52, 8)
                );
              }),
              (i.prototype.readDoubleBE = function (e, t) {
                return (
                  (e >>>= 0),
                  t || M(e, 8, this.length),
                  W.read(this, e, !1, 52, 8)
                );
              }),
              (i.prototype.writeUIntLE = function (e, t, r, n) {
                if (((e = +e), (t >>>= 0), (r >>>= 0), !n)) {
                  var i = Math.pow(2, 8 * r) - 1;
                  k(this, e, t, r, i, 0);
                }
                var s = 1,
                  a = 0;
                for (this[t] = 255 & e; ++a < r && (s *= 256); )
                  this[t + a] = (e / s) & 255;
                return t + r;
              }),
              (i.prototype.writeUIntBE = function (e, t, r, n) {
                if (((e = +e), (t >>>= 0), (r >>>= 0), !n)) {
                  var i = Math.pow(2, 8 * r) - 1;
                  k(this, e, t, r, i, 0);
                }
                var s = r - 1,
                  a = 1;
                for (this[t + s] = 255 & e; --s >= 0 && (a *= 256); )
                  this[t + s] = (e / a) & 255;
                return t + r;
              }),
              (i.prototype.writeUInt8 = function (e, t, r) {
                return (
                  (e = +e),
                  (t >>>= 0),
                  r || k(this, e, t, 1, 255, 0),
                  (this[t] = 255 & e),
                  t + 1
                );
              }),
              (i.prototype.writeUInt16LE = function (e, t, r) {
                return (
                  (e = +e),
                  (t >>>= 0),
                  r || k(this, e, t, 2, 65535, 0),
                  (this[t] = 255 & e),
                  (this[t + 1] = e >>> 8),
                  t + 2
                );
              }),
              (i.prototype.writeUInt16BE = function (e, t, r) {
                return (
                  (e = +e),
                  (t >>>= 0),
                  r || k(this, e, t, 2, 65535, 0),
                  (this[t] = e >>> 8),
                  (this[t + 1] = 255 & e),
                  t + 2
                );
              }),
              (i.prototype.writeUInt32LE = function (e, t, r) {
                return (
                  (e = +e),
                  (t >>>= 0),
                  r || k(this, e, t, 4, 4294967295, 0),
                  (this[t + 3] = e >>> 24),
                  (this[t + 2] = e >>> 16),
                  (this[t + 1] = e >>> 8),
                  (this[t] = 255 & e),
                  t + 4
                );
              }),
              (i.prototype.writeUInt32BE = function (e, t, r) {
                return (
                  (e = +e),
                  (t >>>= 0),
                  r || k(this, e, t, 4, 4294967295, 0),
                  (this[t] = e >>> 24),
                  (this[t + 1] = e >>> 16),
                  (this[t + 2] = e >>> 8),
                  (this[t + 3] = 255 & e),
                  t + 4
                );
              }),
              (i.prototype.writeIntLE = function (e, t, r, n) {
                if (((e = +e), (t >>>= 0), !n)) {
                  var i = Math.pow(2, 8 * r - 1);
                  k(this, e, t, r, i - 1, -i);
                }
                var s = 0,
                  a = 1,
                  o = 0;
                for (this[t] = 255 & e; ++s < r && (a *= 256); )
                  e < 0 && 0 === o && 0 !== this[t + s - 1] && (o = 1),
                    (this[t + s] = (((e / a) >> 0) - o) & 255);
                return t + r;
              }),
              (i.prototype.writeIntBE = function (e, t, r, n) {
                if (((e = +e), (t >>>= 0), !n)) {
                  var i = Math.pow(2, 8 * r - 1);
                  k(this, e, t, r, i - 1, -i);
                }
                var s = r - 1,
                  a = 1,
                  o = 0;
                for (this[t + s] = 255 & e; --s >= 0 && (a *= 256); )
                  e < 0 && 0 === o && 0 !== this[t + s + 1] && (o = 1),
                    (this[t + s] = (((e / a) >> 0) - o) & 255);
                return t + r;
              }),
              (i.prototype.writeInt8 = function (e, t, r) {
                return (
                  (e = +e),
                  (t >>>= 0),
                  r || k(this, e, t, 1, 127, -128),
                  e < 0 && (e = 255 + e + 1),
                  (this[t] = 255 & e),
                  t + 1
                );
              }),
              (i.prototype.writeInt16LE = function (e, t, r) {
                return (
                  (e = +e),
                  (t >>>= 0),
                  r || k(this, e, t, 2, 32767, -32768),
                  (this[t] = 255 & e),
                  (this[t + 1] = e >>> 8),
                  t + 2
                );
              }),
              (i.prototype.writeInt16BE = function (e, t, r) {
                return (
                  (e = +e),
                  (t >>>= 0),
                  r || k(this, e, t, 2, 32767, -32768),
                  (this[t] = e >>> 8),
                  (this[t + 1] = 255 & e),
                  t + 2
                );
              }),
              (i.prototype.writeInt32LE = function (e, t, r) {
                return (
                  (e = +e),
                  (t >>>= 0),
                  r || k(this, e, t, 4, 2147483647, -2147483648),
                  (this[t] = 255 & e),
                  (this[t + 1] = e >>> 8),
                  (this[t + 2] = e >>> 16),
                  (this[t + 3] = e >>> 24),
                  t + 4
                );
              }),
              (i.prototype.writeInt32BE = function (e, t, r) {
                return (
                  (e = +e),
                  (t >>>= 0),
                  r || k(this, e, t, 4, 2147483647, -2147483648),
                  e < 0 && (e = 4294967295 + e + 1),
                  (this[t] = e >>> 24),
                  (this[t + 1] = e >>> 16),
                  (this[t + 2] = e >>> 8),
                  (this[t + 3] = 255 & e),
                  t + 4
                );
              }),
              (i.prototype.writeFloatLE = function (e, t, r) {
                return B(this, e, t, !0, r);
              }),
              (i.prototype.writeFloatBE = function (e, t, r) {
                return B(this, e, t, !1, r);
              }),
              (i.prototype.writeDoubleLE = function (e, t, r) {
                return w(this, e, t, !0, r);
              }),
              (i.prototype.writeDoubleBE = function (e, t, r) {
                return w(this, e, t, !1, r);
              }),
              (i.prototype.copy = function (e, t, r, n) {
                if (!i.isBuffer(e))
                  throw new TypeError("argument should be a Buffer");
                if (
                  (r || (r = 0),
                  n || 0 === n || (n = this.length),
                  t >= e.length && (t = e.length),
                  t || (t = 0),
                  n > 0 && n < r && (n = r),
                  n === r)
                )
                  return 0;
                if (0 === e.length || 0 === this.length) return 0;
                if (t < 0) throw new RangeError("targetStart out of bounds");
                if (r < 0 || r >= this.length)
                  throw new RangeError("Index out of range");
                if (n < 0) throw new RangeError("sourceEnd out of bounds");
                n > this.length && (n = this.length),
                  e.length - t < n - r && (n = e.length - t + r);
                var s = n - r;
                if (
                  this === e &&
                  "function" == typeof Uint8Array.prototype.copyWithin
                )
                  this.copyWithin(t, r, n);
                else if (this === e && r < t && t < n)
                  for (var a = s - 1; a >= 0; --a) e[a + t] = this[a + r];
                else Uint8Array.prototype.set.call(e, this.subarray(r, n), t);
                return s;
              }),
              (i.prototype.fill = function (e, t, r, n) {
                if ("string" == typeof e) {
                  if (
                    ("string" == typeof t
                      ? ((n = t), (t = 0), (r = this.length))
                      : "string" == typeof r && ((n = r), (r = this.length)),
                    void 0 !== n && "string" != typeof n)
                  )
                    throw new TypeError("encoding must be a string");
                  if ("string" == typeof n && !i.isEncoding(n))
                    throw new TypeError("Unknown encoding: " + n);
                  if (1 === e.length) {
                    var s = e.charCodeAt(0);
                    (("utf8" === n && s < 128) || "latin1" === n) && (e = s);
                  }
                } else "number" == typeof e && (e &= 255);
                if (t < 0 || this.length < t || this.length < r)
                  throw new RangeError("Out of range index");
                if (r <= t) return this;
                var a;
                if (
                  ((t >>>= 0),
                  (r = void 0 === r ? this.length : r >>> 0),
                  e || (e = 0),
                  "number" == typeof e)
                )
                  for (a = t; a < r; ++a) this[a] = e;
                else {
                  var o = i.isBuffer(e) ? e : i.from(e, n),
                    c = o.length;
                  if (0 === c)
                    throw new TypeError(
                      'The value "' + e + '" is invalid for argument "value"'
                    );
                  for (a = 0; a < r - t; ++a) this[a + t] = o[a % c];
                }
                return this;
              });
            var Z = /[^+/0-9A-Za-z-_]/g;
          }).call(this);
        }).call(this, e("buffer").Buffer);
      },
      { "base64-js": 1, buffer: 2, ieee754: 3 },
    ],
    3: [
      function (e, t, r) {
        (r.read = function (e, t, r, n, i) {
          var s,
            a,
            o = 8 * i - n - 1,
            c = (1 << o) - 1,
            u = c >> 1,
            l = -7,
            h = r ? i - 1 : 0,
            T = r ? -1 : 1,
            d = e[t + h];
          for (
            h += T, s = d & ((1 << -l) - 1), d >>= -l, l += o;
            l > 0;
            s = 256 * s + e[t + h], h += T, l -= 8
          );
          for (
            a = s & ((1 << -l) - 1), s >>= -l, l += n;
            l > 0;
            a = 256 * a + e[t + h], h += T, l -= 8
          );
          if (0 === s) s = 1 - u;
          else {
            if (s === c) return a ? NaN : (1 / 0) * (d ? -1 : 1);
            (a += Math.pow(2, n)), (s -= u);
          }
          return (d ? -1 : 1) * a * Math.pow(2, s - n);
        }),
          (r.write = function (e, t, r, n, i, s) {
            var a,
              o,
              c,
              u = 8 * s - i - 1,
              l = (1 << u) - 1,
              h = l >> 1,
              T = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
              d = n ? 0 : s - 1,
              E = n ? 1 : -1,
              p = t < 0 || (0 === t && 1 / t < 0) ? 1 : 0;
            for (
              t = Math.abs(t),
                isNaN(t) || t === 1 / 0
                  ? ((o = isNaN(t) ? 1 : 0), (a = l))
                  : ((a = Math.floor(Math.log(t) / Math.LN2)),
                    t * (c = Math.pow(2, -a)) < 1 && (a--, (c *= 2)),
                    (t += a + h >= 1 ? T / c : T * Math.pow(2, 1 - h)),
                    t * c >= 2 && (a++, (c /= 2)),
                    a + h >= l
                      ? ((o = 0), (a = l))
                      : a + h >= 1
                      ? ((o = (t * c - 1) * Math.pow(2, i)), (a += h))
                      : ((o = t * Math.pow(2, h - 1) * Math.pow(2, i)),
                        (a = 0)));
              i >= 8;
              e[r + d] = 255 & o, d += E, o /= 256, i -= 8
            );
            for (
              a = (a << i) | o, u += i;
              u > 0;
              e[r + d] = 255 & a, d += E, a /= 256, u -= 8
            );
            e[r + d - E] |= 128 * p;
          });
      },
      {},
    ],
    4: [
      function (e, t, r) {
        e("cheerio");
      },
      { cheerio: 15 },
    ],
    5: [
      function (e, t, r) {
        t.exports = {
          trueFunc: function () {
            return !0;
          },
          falseFunc: function () {
            return !1;
          },
        };
      },
      {},
    ],
    6: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          for (; e.parent; ) e = e.parent;
          return e;
        }
        function i(e) {
          for (var t = [], r = [], n = 0, i = e; n < i.length; n++) {
            var a = i[n];
            a.some(s.isFilter) ? t.push(a) : r.push(a);
          }
          return [r, t];
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.groupSelectors = r.getDocumentRoot = void 0);
        var s = e("./positionals.js");
        (r.getDocumentRoot = n), (r.groupSelectors = i);
      },
      { "./positionals.js": 8 },
    ],
    7: [
      function (e, t, r) {
        "use strict";
        function n(e, t, r) {
          return void 0 === r && (r = {}), i([e], t, r);
        }
        function i(e, t, r) {
          if ((void 0 === r && (r = {}), "function" == typeof t))
            return e.some(t);
          var n = (0, N.groupSelectors)((0, m.parse)(t)),
            i = n[0],
            s = n[1];
          return (
            (i.length > 0 && e.some((0, I._compileToken)(i, r))) ||
            s.some(function (t) {
              return c(t, e, r).length > 0;
            })
          );
        }
        function s(e, t, r, n) {
          var i = "string" == typeof r ? parseInt(r, 10) : NaN;
          switch (e) {
            case "first":
            case "lt":
              return t;
            case "last":
              return t.length > 0 ? [t[t.length - 1]] : t;
            case "nth":
            case "eq":
              return isFinite(i) && Math.abs(i) < t.length
                ? [i < 0 ? t[t.length + i] : t[i]]
                : [];
            case "gt":
              return isFinite(i) ? t.slice(i + 1) : [];
            case "even":
              return t.filter(function (e, t) {
                return t % 2 == 0;
              });
            case "odd":
              return t.filter(function (e, t) {
                return t % 2 == 1;
              });
            case "not":
              var s = new Set(o(r, t, n));
              return t.filter(function (e) {
                return !s.has(e);
              });
          }
        }
        function a(e, t, r) {
          return void 0 === r && (r = {}), o((0, m.parse)(e), t, r);
        }
        function o(e, t, r) {
          if (0 === t.length) return [];
          var n,
            i = (0, N.groupSelectors)(e),
            s = i[0],
            a = i[1];
          if (s.length) {
            var o = d(t, s, r);
            if (0 === a.length) return o;
            o.length && (n = new Set(o));
          }
          for (
            var u = 0;
            u < a.length && (null == n ? void 0 : n.size) !== t.length;
            u++
          ) {
            var l = a[u],
              h = n
                ? t.filter(function (e) {
                    return D.isTag(e) && !n.has(e);
                  })
                : t;
            if (0 === h.length) break;
            o = c(l, t, r);
            if (o.length)
              if (n)
                o.forEach(function (e) {
                  return n.add(e);
                });
              else {
                if (u === a.length - 1) return o;
                n = new Set(o);
              }
          }
          return void 0 !== n
            ? n.size === t.length
              ? t
              : t.filter(function (e) {
                  return n.has(e);
                })
            : [];
        }
        function c(e, t, r) {
          var n;
          if (e.some(m.isTraversal)) {
            var i =
                null !== (n = r.root) && void 0 !== n
                  ? n
                  : (0, N.getDocumentRoot)(t[0]),
              s = E(E({}, r), { context: t, relativeSelector: !1 });
            return e.push(b), l(i, e, s, !0, t.length);
          }
          return l(t, e, r, !1, t.length);
        }
        function u(e, t, r, n) {
          if (
            (void 0 === r && (r = {}),
            void 0 === n && (n = 1 / 0),
            "function" == typeof e)
          )
            return T(t, e);
          var i = (0, N.groupSelectors)((0, m.parse)(e)),
            s = i[0],
            a = i[1],
            o = a.map(function (e) {
              return l(t, e, r, !0, n);
            });
          return (
            s.length && o.push(h(t, s, r, n)),
            0 === o.length
              ? []
              : 1 === o.length
              ? o[0]
              : D.uniqueSort(
                  o.reduce(function (e, t) {
                    return A(A([], e, !0), t, !0);
                  })
                )
          );
        }
        function l(e, t, r, n, i) {
          var a = t.findIndex(C.isFilter),
            o = t.slice(0, a),
            c = t[a],
            u = t.length - 1 === a ? i : 1 / 0,
            T = (0, C.getLimit)(c.name, c.data, u);
          if (0 === T) return [];
          var p =
              0 !== o.length || Array.isArray(e)
                ? 0 === o.length
                  ? (Array.isArray(e) ? e : [e]).filter(D.isTag)
                  : n || o.some(m.isTraversal)
                  ? h(e, [o], r, T)
                  : d(e, [o], r)
                : D.getChildren(e).filter(D.isTag),
            f = p.slice(0, T),
            _ = s(c.name, f, c.data, r);
          if (0 === _.length || t.length === a + 1) return _;
          var A = t.slice(a + 1),
            N = A.some(m.isTraversal);
          if (N) {
            if ((0, m.isTraversal)(A[0])) {
              var S = A[0].type;
              (S !== m.SelectorType.Sibling && S !== m.SelectorType.Adjacent) ||
                (_ = (0, I.prepareContext)(_, D, !0)),
                A.unshift(O);
            }
            r = E(E({}, r), {
              relativeSelector: !1,
              rootFunc: function (e) {
                return _.includes(e);
              },
            });
          } else
            r.rootFunc &&
              r.rootFunc !== g.trueFunc &&
              (r = E(E({}, r), { rootFunc: g.trueFunc }));
          return A.some(C.isFilter)
            ? l(_, A, r, !1, i)
            : N
            ? h(_, [A], r, i)
            : d(_, [A], r);
        }
        function h(e, t, r, n) {
          var i = (0, I._compileToken)(t, r, e);
          return T(e, i, n);
        }
        function T(e, t, r) {
          void 0 === r && (r = 1 / 0);
          var n = (0, I.prepareContext)(e, D, t.shouldTestNextSiblings);
          return D.find(
            function (e) {
              return D.isTag(e) && t(e);
            },
            n,
            !0,
            r
          );
        }
        function d(e, t, r) {
          var n = (Array.isArray(e) ? e : [e]).filter(D.isTag);
          if (0 === n.length) return n;
          var i = (0, I._compileToken)(t, r);
          return i === g.trueFunc ? n : n.filter(i);
        }
        var E =
            (this && this.__assign) ||
            function () {
              return (
                (E =
                  Object.assign ||
                  function (e) {
                    for (var t, r = 1, n = arguments.length; r < n; r++)
                      for (var i in ((t = arguments[r]), t))
                        Object.prototype.hasOwnProperty.call(t, i) &&
                          (e[i] = t[i]);
                    return e;
                  }),
                E.apply(this, arguments)
              );
            },
          p =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, r, n) {
                  void 0 === n && (n = r);
                  var i = Object.getOwnPropertyDescriptor(t, r);
                  (i &&
                    ("get" in i
                      ? t.__esModule
                      : !i.writable && !i.configurable)) ||
                    (i = {
                      enumerable: !0,
                      get: function () {
                        return t[r];
                      },
                    }),
                    Object.defineProperty(e, n, i);
                }
              : function (e, t, r, n) {
                  void 0 === n && (n = r), (e[n] = t[r]);
                }),
          f =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, t) {
                  Object.defineProperty(e, "default", {
                    enumerable: !0,
                    value: t,
                  });
                }
              : function (e, t) {
                  e.default = t;
                }),
          _ =
            (this && this.__importStar) ||
            function (e) {
              if (e && e.__esModule) return e;
              var t = {};
              if (null != e)
                for (var r in e)
                  "default" !== r &&
                    Object.prototype.hasOwnProperty.call(e, r) &&
                    p(t, e, r);
              return f(t, e), t;
            },
          A =
            (this && this.__spreadArray) ||
            function (e, t, r) {
              if (r || 2 === arguments.length)
                for (var n, i = 0, s = t.length; i < s; i++)
                  (!n && i in t) ||
                    (n || (n = Array.prototype.slice.call(t, 0, i)),
                    (n[i] = t[i]));
              return e.concat(n || Array.prototype.slice.call(t));
            };
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.select =
            r.filter =
            r.some =
            r.is =
            r.aliases =
            r.pseudos =
            r.filters =
              void 0);
        var m = e("css-what"),
          I = e("css-select"),
          D = _(e("domutils")),
          g = _(e("boolbase")),
          N = e("./helpers.js"),
          C = e("./positionals.js"),
          S = e("css-select");
        Object.defineProperty(r, "filters", {
          enumerable: !0,
          get: function () {
            return S.filters;
          },
        }),
          Object.defineProperty(r, "pseudos", {
            enumerable: !0,
            get: function () {
              return S.pseudos;
            },
          }),
          Object.defineProperty(r, "aliases", {
            enumerable: !0,
            get: function () {
              return S.aliases;
            },
          });
        var O = { type: m.SelectorType.Universal, namespace: null },
          b = { type: m.SelectorType.Pseudo, name: "scope", data: null };
        (r.is = n), (r.some = i), (r.filter = a), (r.select = u);
      },
      {
        "./helpers.js": 6,
        "./positionals.js": 8,
        boolbase: 5,
        "css-select": 26,
        "css-what": 33,
        domutils: 44,
      },
    ],
    8: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          return (
            "pseudo" === e.type &&
            (!!r.filterNames.has(e.name) ||
              (!("not" !== e.name || !Array.isArray(e.data)) &&
                e.data.some(function (e) {
                  return e.some(n);
                })))
          );
        }
        function i(e, t, r) {
          var n = null != t ? parseInt(t, 10) : NaN;
          switch (e) {
            case "first":
              return 1;
            case "nth":
            case "eq":
              return isFinite(n) ? (n >= 0 ? n + 1 : 1 / 0) : 0;
            case "lt":
              return isFinite(n) ? (n >= 0 ? Math.min(n, r) : 1 / 0) : 0;
            case "gt":
              return isFinite(n) ? 1 / 0 : 0;
            case "odd":
              return 2 * r;
            case "even":
              return 2 * r - 1;
            case "last":
            case "not":
              return 1 / 0;
          }
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.getLimit = r.isFilter = r.filterNames = void 0),
          (r.filterNames = new Set([
            "first",
            "last",
            "eq",
            "gt",
            "nth",
            "lt",
            "even",
            "odd",
          ])),
          (r.isFilter = n),
          (r.getLimit = i);
      },
      {},
    ],
    9: [
      function (e, t, r) {
        "use strict";
        function n(e, t, r) {
          var n;
          if (e && (0, D.isTag)(e))
            return (
              (null !== (n = e.attribs) && void 0 !== n) || (e.attribs = {}),
              t
                ? N.call(e.attribs, t)
                  ? !r && b.test(t)
                    ? t
                    : e.attribs[t]
                  : "option" === e.name && "value" === t
                  ? (0, I.text)(e.children)
                  : "input" !== e.name ||
                    ("radio" !== e.attribs.type &&
                      "checkbox" !== e.attribs.type) ||
                    "value" !== t
                  ? void 0
                  : "on"
                : e.attribs
            );
        }
        function i(e, t, r) {
          null === r ? d(e, t) : (e.attribs[t] = "".concat(r));
        }
        function s(e, t) {
          if ("object" == typeof e || void 0 !== t) {
            if ("function" == typeof t) {
              if ("string" != typeof e)
                throw new Error("Bad combination of arguments.");
              return (0, D.domEach)(this, function (r, n) {
                (0, D.isTag)(r) && i(r, e, t.call(r, n, r.attribs[e]));
              });
            }
            return (0, D.domEach)(this, function (r) {
              (0, D.isTag)(r) &&
                ("object" == typeof e
                  ? Object.keys(e).forEach(function (t) {
                      var n = e[t];
                      i(r, t, n);
                    })
                  : i(r, e, t));
            });
          }
          return arguments.length > 1
            ? this
            : n(this[0], e, this.options.xmlMode);
        }
        function a(e, t, r) {
          return t in e
            ? e[t]
            : !r && b.test(t)
            ? void 0 !== n(e, t, !1)
            : n(e, t, r);
        }
        function o(e, t, r, n) {
          t in e
            ? (e[t] = r)
            : i(e, t, !n && b.test(t) ? (r ? "" : null) : "".concat(r));
        }
        function c(e, t) {
          var r,
            n = this;
          if ("string" == typeof e && void 0 === t) {
            var i = this[0];
            if (!i || !(0, D.isTag)(i)) return;
            switch (e) {
              case "style":
                var s = this.css(),
                  c = Object.keys(s);
                return (
                  c.forEach(function (e, t) {
                    s[t] = e;
                  }),
                  (s.length = c.length),
                  s
                );
              case "tagName":
              case "nodeName":
                return i.name.toUpperCase();
              case "href":
              case "src":
                var u =
                  null === (r = i.attribs) || void 0 === r ? void 0 : r[e];
                return "undefined" == typeof URL ||
                  (("href" !== e || ("a" !== i.tagName && "link" !== i.name)) &&
                    ("src" !== e ||
                      ("img" !== i.tagName &&
                        "iframe" !== i.tagName &&
                        "audio" !== i.tagName &&
                        "video" !== i.tagName &&
                        "source" !== i.tagName))) ||
                  void 0 === u ||
                  !this.options.baseURI
                  ? u
                  : new URL(u, this.options.baseURI).href;
              case "innerText":
                return (0, g.innerText)(i);
              case "textContent":
                return (0, g.textContent)(i);
              case "outerHTML":
                return this.clone().wrap("<container />").parent().html();
              case "innerHTML":
                return this.html();
              default:
                return a(i, e, this.options.xmlMode);
            }
          }
          if ("object" == typeof e || void 0 !== t) {
            if ("function" == typeof t) {
              if ("object" == typeof e)
                throw new Error("Bad combination of arguments.");
              return (0, D.domEach)(this, function (r, i) {
                (0, D.isTag)(r) &&
                  o(
                    r,
                    e,
                    t.call(r, i, a(r, e, n.options.xmlMode)),
                    n.options.xmlMode
                  );
              });
            }
            return (0, D.domEach)(this, function (r) {
              (0, D.isTag)(r) &&
                ("object" == typeof e
                  ? Object.keys(e).forEach(function (t) {
                      var i = e[t];
                      o(r, t, i, n.options.xmlMode);
                    })
                  : o(r, e, t, n.options.xmlMode));
            });
          }
        }
        function u(e, t, r) {
          var n,
            i = e;
          (null !== (n = i.data) && void 0 !== n) || (i.data = {}),
            "object" == typeof t
              ? Object.assign(i.data, t)
              : "string" == typeof t && void 0 !== r && (i.data[t] = r);
        }
        function l(e, t) {
          var r, n, i;
          null == t
            ? ((r = Object.keys(e.attribs).filter(function (e) {
                return e.startsWith(S);
              })),
              (n = r.map(function (e) {
                return (0, D.camelCase)(e.slice(S.length));
              })))
            : ((r = [S + (0, D.cssCase)(t)]), (n = [t]));
          for (var s = 0; s < r.length; ++s) {
            var a = r[s],
              o = n[s];
            if (N.call(e.attribs, a) && !N.call(e.data, o)) {
              if (((i = e.attribs[a]), N.call(O, i))) i = O[i];
              else if (i === String(Number(i))) i = Number(i);
              else if (R.test(i))
                try {
                  i = JSON.parse(i);
                } catch (e) {}
              e.data[o] = i;
            }
          }
          return null == t ? e.data : i;
        }
        function h(e, t) {
          var r,
            n = this[0];
          if (n && (0, D.isTag)(n)) {
            var i = n;
            return (
              (null !== (r = i.data) && void 0 !== r) || (i.data = {}),
              e
                ? "object" == typeof e || void 0 !== t
                  ? ((0, D.domEach)(this, function (r) {
                      (0, D.isTag)(r) &&
                        ("object" == typeof e ? u(r, e) : u(r, e, t));
                    }),
                    this)
                  : N.call(i.data, e)
                  ? i.data[e]
                  : l(i, e)
                : l(i)
            );
          }
        }
        function T(e) {
          var t = 0 === arguments.length,
            r = this[0];
          if (!r || !(0, D.isTag)(r)) return t ? void 0 : this;
          switch (r.name) {
            case "textarea":
              return this.text(e);
            case "select":
              var n = this.find("option:selected");
              if (!t) {
                if (null == this.attr("multiple") && "object" == typeof e)
                  return this;
                this.find("option").removeAttr("selected");
                for (
                  var i = "object" != typeof e ? [e] : e, s = 0;
                  s < i.length;
                  s++
                )
                  this.find('option[value="'.concat(i[s], '"]')).attr(
                    "selected",
                    ""
                  );
                return this;
              }
              return this.attr("multiple")
                ? n.toArray().map(function (e) {
                    return (0, I.text)(e.children);
                  })
                : n.attr("value");
            case "input":
            case "option":
              return t ? this.attr("value") : this.attr("value", e);
          }
        }
        function d(e, t) {
          e.attribs && N.call(e.attribs, t) && delete e.attribs[t];
        }
        function E(e) {
          return e ? e.trim().split(C) : [];
        }
        function p(e) {
          for (
            var t = E(e),
              r = function (e) {
                (0, D.domEach)(n, function (r) {
                  (0, D.isTag)(r) && d(r, t[e]);
                });
              },
              n = this,
              i = 0;
            i < t.length;
            i++
          )
            r(i);
          return this;
        }
        function f(e) {
          return this.toArray().some(function (t) {
            var r = (0, D.isTag)(t) && t.attribs.class,
              n = -1;
            if (r && e.length)
              for (; (n = r.indexOf(e, n + 1)) > -1; ) {
                var i = n + e.length;
                if (
                  (0 === n || C.test(r[n - 1])) &&
                  (i === r.length || C.test(r[i]))
                )
                  return !0;
              }
            return !1;
          });
        }
        function _(e) {
          if ("function" == typeof e)
            return (0, D.domEach)(this, function (t, r) {
              if ((0, D.isTag)(t)) {
                var n = t.attribs.class || "";
                _.call([t], e.call(t, r, n));
              }
            });
          if (!e || "string" != typeof e) return this;
          for (var t = e.split(C), r = this.length, s = 0; s < r; s++) {
            var a = this[s];
            if ((0, D.isTag)(a)) {
              var o = n(a, "class", !1);
              if (o) {
                for (var c = " ".concat(o, " "), u = 0; u < t.length; u++) {
                  var l = "".concat(t[u], " ");
                  c.includes(" ".concat(l)) || (c += l);
                }
                i(a, "class", c.trim());
              } else i(a, "class", t.join(" ").trim());
            }
          }
          return this;
        }
        function A(e) {
          if ("function" == typeof e)
            return (0, D.domEach)(this, function (t, r) {
              (0, D.isTag)(t) &&
                A.call([t], e.call(t, r, t.attribs.class || ""));
            });
          var t = E(e),
            r = t.length,
            n = 0 === arguments.length;
          return (0, D.domEach)(this, function (e) {
            if ((0, D.isTag)(e))
              if (n) e.attribs.class = "";
              else {
                for (var i = E(e.attribs.class), s = !1, a = 0; a < r; a++) {
                  var o = i.indexOf(t[a]);
                  o >= 0 && (i.splice(o, 1), (s = !0), a--);
                }
                s && (e.attribs.class = i.join(" "));
              }
          });
        }
        function m(e, t) {
          if ("function" == typeof e)
            return (0, D.domEach)(this, function (r, n) {
              (0, D.isTag)(r) &&
                m.call([r], e.call(r, n, r.attribs.class || "", t), t);
            });
          if (!e || "string" != typeof e) return this;
          for (
            var r = e.split(C),
              n = r.length,
              i = "boolean" == typeof t ? (t ? 1 : -1) : 0,
              s = this.length,
              a = 0;
            a < s;
            a++
          ) {
            var o = this[a];
            if ((0, D.isTag)(o)) {
              for (var c = E(o.attribs.class), u = 0; u < n; u++) {
                var l = c.indexOf(r[u]);
                i >= 0 && l < 0
                  ? c.push(r[u])
                  : i <= 0 && l >= 0 && c.splice(l, 1);
              }
              o.attribs.class = c.join(" ");
            }
          }
          return this;
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.toggleClass =
            r.removeClass =
            r.addClass =
            r.hasClass =
            r.removeAttr =
            r.val =
            r.data =
            r.prop =
            r.attr =
              void 0);
        var I = e("../static.js"),
          D = e("../utils.js"),
          g = e("domutils"),
          N = Object.prototype.hasOwnProperty,
          C = /\s+/,
          S = "data-",
          O = { null: null, true: !0, false: !1 },
          b =
            /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
          R = /^{[^]*}$|^\[[^]*]$/;
        (r.attr = s),
          (r.prop = c),
          (r.data = h),
          (r.val = T),
          (r.removeAttr = p),
          (r.hasClass = f),
          (r.addClass = _),
          (r.removeClass = A),
          (r.toggleClass = m);
      },
      { "../static.js": 20, "../utils.js": 22, domutils: 44 },
    ],
    10: [
      function (e, t, r) {
        "use strict";
        function n(e, t) {
          return (null != e && null != t) ||
            ("object" == typeof e && !Array.isArray(e))
            ? (0, c.domEach)(this, function (r, n) {
                (0, c.isTag)(r) && i(r, e, t, n);
              })
            : 0 !== this.length
            ? s(this[0], e)
            : void 0;
        }
        function i(e, t, r, n) {
          if ("string" == typeof t) {
            var o = s(e),
              c = "function" == typeof r ? r.call(e, n, o[t]) : r;
            "" === c ? delete o[t] : null != c && (o[t] = c),
              (e.attribs.style = a(o));
          } else
            "object" == typeof t &&
              Object.keys(t).forEach(function (r, n) {
                i(e, r, t[r], n);
              });
        }
        function s(e, t) {
          if (e && (0, c.isTag)(e)) {
            var r = o(e.attribs.style);
            if ("string" == typeof t) return r[t];
            if (Array.isArray(t)) {
              var n = {};
              return (
                t.forEach(function (e) {
                  null != r[e] && (n[e] = r[e]);
                }),
                n
              );
            }
            return r;
          }
        }
        function a(e) {
          return Object.keys(e).reduce(function (t, r) {
            return ""
              .concat(t)
              .concat(t ? " " : "")
              .concat(r, ": ")
              .concat(e[r], ";");
          }, "");
        }
        function o(e) {
          if (((e = (e || "").trim()), !e)) return {};
          for (var t, r = {}, n = 0, i = e.split(";"); n < i.length; n++) {
            var s = i[n],
              a = s.indexOf(":");
            if (a < 1 || a === s.length - 1) {
              var o = s.trimEnd();
              o.length > 0 && void 0 !== t && (r[t] += ";".concat(o));
            } else (t = s.slice(0, a).trim()), (r[t] = s.slice(a + 1).trim());
          }
          return r;
        }
        Object.defineProperty(r, "__esModule", { value: !0 }), (r.css = void 0);
        var c = e("../utils.js");
        r.css = n;
      },
      { "../utils.js": 22 },
    ],
    11: [
      function (e, t, r) {
        "use strict";
        function n() {
          var e = this.serializeArray(),
            t = e.map(function (e) {
              return ""
                .concat(encodeURIComponent(e.name), "=")
                .concat(encodeURIComponent(e.value));
            });
          return t.join("&").replace(o, "+");
        }
        function i() {
          var e = this;
          return this.map(function (t, r) {
            var n = e._make(r);
            return (0, s.isTag)(r) && "form" === r.name
              ? n.find(a).toArray()
              : n.filter(a).toArray();
          })
            .filter(
              '[name!=""]:enabled:not(:submit, :button, :image, :reset, :file):matches([checked], :not(:checkbox, :radio))'
            )
            .map(function (t, r) {
              var n,
                i = e._make(r),
                s = i.attr("name"),
                a = null !== (n = i.val()) && void 0 !== n ? n : "";
              return Array.isArray(a)
                ? a.map(function (e) {
                    return { name: s, value: e.replace(c, "\r\n") };
                  })
                : { name: s, value: a.replace(c, "\r\n") };
            })
            .toArray();
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.serializeArray = r.serialize = void 0);
        var s = e("../utils.js"),
          a = "input,select,textarea,keygen",
          o = /%20/g,
          c = /\r?\n/g;
        (r.serialize = n), (r.serializeArray = i);
      },
      { "../utils.js": 22 },
    ],
    12: [
      function (e, t, r) {
        "use strict";
        function n(e, t) {
          var r = this;
          return null == e
            ? []
            : (0, O.isCheerio)(e)
            ? t
              ? (0, O.cloneDom)(e.get())
              : e.get()
            : Array.isArray(e)
            ? e.reduce(function (e, n) {
                return e.concat(r._makeDomArray(n, t));
              }, [])
            : "string" == typeof e
            ? this._parse(e, this.options, !1, null).children
            : t
            ? (0, O.cloneDom)([e])
            : [e];
        }
        function i(e) {
          return function () {
            for (var t = this, r = [], n = 0; n < arguments.length; n++)
              r[n] = arguments[n];
            var i = this.length - 1;
            return (0, O.domEach)(this, function (n, s) {
              if ((0, N.hasChildren)(n)) {
                var a =
                    "function" == typeof r[0]
                      ? r[0].call(n, s, t._render(n.children))
                      : r,
                  o = t._makeDomArray(a, s < i);
                e(o, n.children, n);
              }
            });
          };
        }
        function s(e, t, r, n, i) {
          for (
            var s,
              a,
              o = g([t, r], n, !0),
              c = 0 === t ? null : e[t - 1],
              u = t + r >= e.length ? null : e[t + r],
              l = 0;
            l < n.length;
            ++l
          ) {
            var h = n[l],
              T = h.parent;
            if (T) {
              var d = T.children,
                E = d.indexOf(h);
              E > -1 && (T.children.splice(E, 1), i === T && t > E && o[0]--);
            }
            (h.parent = i),
              h.prev &&
                (h.prev.next =
                  null !== (s = h.next) && void 0 !== s ? s : null),
              h.next &&
                (h.next.prev =
                  null !== (a = h.prev) && void 0 !== a ? a : null),
              (h.prev = 0 === l ? c : n[l - 1]),
              (h.next = l === n.length - 1 ? u : n[l + 1]);
          }
          return (
            c && (c.next = n[0]),
            u && (u.prev = n[n.length - 1]),
            e.splice.apply(e, o)
          );
        }
        function a(e) {
          var t = (0, O.isCheerio)(e) ? e : this._make(e);
          return t.append(this), this;
        }
        function o(e) {
          var t = (0, O.isCheerio)(e) ? e : this._make(e);
          return t.prepend(this), this;
        }
        function c(e) {
          return function (t) {
            for (
              var r = this.length - 1, n = this.parents().last(), i = 0;
              i < this.length;
              i++
            ) {
              var s = this[i],
                a =
                  "function" == typeof t
                    ? t.call(s, i, s)
                    : "string" != typeof t || (0, O.isHtml)(t)
                    ? t
                    : n.find(t).clone(),
                o = this._makeDomArray(a, i < r)[0];
              if (o && (0, N.hasChildren)(o)) {
                for (var c = o, u = 0; u < c.children.length; ) {
                  var l = c.children[u];
                  (0, O.isTag)(l) ? ((c = l), (u = 0)) : u++;
                }
                e(s, c, [o]);
              }
            }
            return this;
          };
        }
        function u(e) {
          var t = this;
          return (
            this.parent(e)
              .not("body")
              .each(function (e, r) {
                t._make(r).replaceWith(r.children);
              }),
            this
          );
        }
        function l(e) {
          var t = this[0];
          if (t) {
            for (
              var r = this._make(
                  "function" == typeof e ? e.call(t, 0, t) : e
                ).insertBefore(t),
                n = void 0,
                i = 0;
              i < r.length;
              i++
            )
              "tag" === r[i].type && (n = r[i]);
            for (var s = 0; n && s < n.children.length; ) {
              var a = n.children[s];
              "tag" === a.type ? ((n = a), (s = 0)) : s++;
            }
            n && this._make(n).append(this);
          }
          return this;
        }
        function h() {
          for (var e = this, t = [], r = 0; r < arguments.length; r++)
            t[r] = arguments[r];
          var n = this.length - 1;
          return (0, O.domEach)(this, function (r, i) {
            var a = r.parent;
            if ((0, N.hasChildren)(r) && a) {
              var o = a.children,
                c = o.indexOf(r);
              if (!(c < 0)) {
                var u =
                    "function" == typeof t[0]
                      ? t[0].call(r, i, e._render(r.children))
                      : t,
                  l = e._makeDomArray(u, i < n);
                s(o, c + 1, 0, l, a);
              }
            }
          });
        }
        function T(e) {
          var t = this;
          "string" == typeof e && (e = this._make(e)), this.remove();
          var r = [];
          return (
            this._makeDomArray(e).forEach(function (e) {
              var n = t.clone().toArray(),
                i = e.parent;
              if (i) {
                var a = i.children,
                  o = a.indexOf(e);
                o < 0 || (s(a, o + 1, 0, n, i), r.push.apply(r, n));
              }
            }),
            this._make(r)
          );
        }
        function d() {
          for (var e = this, t = [], r = 0; r < arguments.length; r++)
            t[r] = arguments[r];
          var n = this.length - 1;
          return (0, O.domEach)(this, function (r, i) {
            var a = r.parent;
            if ((0, N.hasChildren)(r) && a) {
              var o = a.children,
                c = o.indexOf(r);
              if (!(c < 0)) {
                var u =
                    "function" == typeof t[0]
                      ? t[0].call(r, i, e._render(r.children))
                      : t,
                  l = e._makeDomArray(u, i < n);
                s(o, c, 0, l, a);
              }
            }
          });
        }
        function E(e) {
          var t = this,
            r = this._make(e);
          this.remove();
          var n = [];
          return (
            (0, O.domEach)(r, function (e) {
              var r = t.clone().toArray(),
                i = e.parent;
              if (i) {
                var a = i.children,
                  o = a.indexOf(e);
                o < 0 || (s(a, o, 0, r, i), n.push.apply(n, r));
              }
            }),
            this._make(n)
          );
        }
        function p(e) {
          var t = e ? this.filter(e) : this;
          return (
            (0, O.domEach)(t, function (e) {
              (0, b.removeElement)(e), (e.prev = e.next = e.parent = null);
            }),
            this
          );
        }
        function f(e) {
          var t = this;
          return (0, O.domEach)(this, function (r, n) {
            var i = r.parent;
            if (i) {
              var a = i.children,
                o = "function" == typeof e ? e.call(r, n, r) : e,
                c = t._makeDomArray(o);
              (0, C.update)(c, null);
              var u = a.indexOf(r);
              s(a, u, 1, c, i),
                c.includes(r) || (r.parent = r.prev = r.next = null);
            }
          });
        }
        function _() {
          return (0, O.domEach)(this, function (e) {
            (0, N.hasChildren)(e) &&
              (e.children.forEach(function (e) {
                e.next = e.prev = e.parent = null;
              }),
              (e.children.length = 0));
          });
        }
        function A(e) {
          var t = this;
          if (void 0 === e) {
            var r = this[0];
            return r && (0, N.hasChildren)(r) ? this._render(r.children) : null;
          }
          return (0, O.domEach)(this, function (r) {
            if ((0, N.hasChildren)(r)) {
              r.children.forEach(function (e) {
                e.next = e.prev = e.parent = null;
              });
              var n = (0, O.isCheerio)(e)
                ? e.toArray()
                : t._parse("".concat(e), t.options, !1, r).children;
              (0, C.update)(n, r);
            }
          });
        }
        function m() {
          return this._render(this);
        }
        function I(e) {
          var t = this;
          return void 0 === e
            ? (0, S.text)(this)
            : "function" == typeof e
            ? (0, O.domEach)(this, function (r, n) {
                return t._make(r).text(e.call(r, n, (0, S.text)([r])));
              })
            : (0, O.domEach)(this, function (t) {
                if ((0, N.hasChildren)(t)) {
                  t.children.forEach(function (e) {
                    e.next = e.prev = e.parent = null;
                  });
                  var r = new N.Text("".concat(e));
                  (0, C.update)(r, t);
                }
              });
        }
        function D() {
          return this._make((0, O.cloneDom)(this.get()));
        }
        var g =
          (this && this.__spreadArray) ||
          function (e, t, r) {
            if (r || 2 === arguments.length)
              for (var n, i = 0, s = t.length; i < s; i++)
                (!n && i in t) ||
                  (n || (n = Array.prototype.slice.call(t, 0, i)),
                  (n[i] = t[i]));
            return e.concat(n || Array.prototype.slice.call(t));
          };
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.clone =
            r.text =
            r.toString =
            r.html =
            r.empty =
            r.replaceWith =
            r.remove =
            r.insertBefore =
            r.before =
            r.insertAfter =
            r.after =
            r.wrapAll =
            r.unwrap =
            r.wrapInner =
            r.wrap =
            r.prepend =
            r.append =
            r.prependTo =
            r.appendTo =
            r._makeDomArray =
              void 0);
        var N = e("domhandler"),
          C = e("../parse.js"),
          S = e("../static.js"),
          O = e("../utils.js"),
          b = e("domutils");
        (r._makeDomArray = n),
          (r.appendTo = a),
          (r.prependTo = o),
          (r.append = i(function (e, t, r) {
            s(t, t.length, 0, e, r);
          })),
          (r.prepend = i(function (e, t, r) {
            s(t, 0, 0, e, r);
          })),
          (r.wrap = c(function (e, t, r) {
            var n = e.parent;
            if (n) {
              var i = n.children,
                a = i.indexOf(e);
              (0, C.update)([e], t), s(i, a, 0, r, n);
            }
          })),
          (r.wrapInner = c(function (e, t, r) {
            (0, N.hasChildren)(e) &&
              ((0, C.update)(e.children, t), (0, C.update)(r, e));
          })),
          (r.unwrap = u),
          (r.wrapAll = l),
          (r.after = h),
          (r.insertAfter = T),
          (r.before = d),
          (r.insertBefore = E),
          (r.remove = p),
          (r.replaceWith = f),
          (r.empty = _),
          (r.html = A),
          (r.toString = m),
          (r.text = I),
          (r.clone = D);
      },
      {
        "../parse.js": 18,
        "../static.js": 20,
        "../utils.js": 22,
        domhandler: 40,
        domutils: 44,
      },
    ],
    13: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          var t;
          if (!e) return this._make([]);
          var r = this.toArray();
          if ("string" != typeof e) {
            var n = (0, M.isCheerio)(e) ? e.toArray() : [e];
            return this._make(
              n.filter(function (e) {
                return r.some(function (t) {
                  return (0, k.contains)(t, e);
                });
              })
            );
          }
          var i = B.test(e) ? r : this.children().toArray(),
            s = {
              context: r,
              root: null === (t = this._root) || void 0 === t ? void 0 : t[0],
              xmlMode: this.options.xmlMode,
              lowerCaseTags: this.options.lowerCaseTags,
              lowerCaseAttributeNames: this.options.lowerCaseAttributeNames,
              pseudos: this.options.pseudos,
              quirksMode: this.options.quirksMode,
            };
          return this._make(L.select(e, i, s));
        }
        function i(e) {
          return function (t) {
            for (var r = [], n = 1; n < arguments.length; n++)
              r[n - 1] = arguments[n];
            return function (n) {
              var i,
                s = e(t, this);
              return (
                n &&
                  (s = d(
                    s,
                    n,
                    this.options.xmlMode,
                    null === (i = this._root) || void 0 === i ? void 0 : i[0]
                  )),
                this._make(
                  this.length > 1 && s.length > 1
                    ? r.reduce(function (e, t) {
                        return t(e);
                      }, s)
                    : s
                )
              );
            };
          };
        }
        function s(e) {
          for (var t = [], r = 1; r < arguments.length; r++)
            t[r - 1] = arguments[r];
          var n = null,
            s = i(function (e, t) {
              var r = [];
              return (
                (0, M.domEach)(t, function (t) {
                  for (
                    var i;
                    (i = e(t)) && (null == n ? !void 0 : !n(i, r.length));
                    t = i
                  )
                    r.push(i);
                }),
                r
              );
            }).apply(void 0, P([e], t, !1));
          return function (e, t) {
            var r = this;
            n =
              "string" == typeof e
                ? function (t) {
                    return L.is(t, e, r.options);
                  }
                : e
                ? h(e)
                : null;
            var i = s.call(this, t);
            return (n = null), i;
          };
        }
        function a(e) {
          return Array.from(new Set(e));
        }
        function o(e) {
          var t,
            r = [];
          if (!e) return this._make(r);
          var n = {
              xmlMode: this.options.xmlMode,
              root: null === (t = this._root) || void 0 === t ? void 0 : t[0],
            },
            i =
              "string" == typeof e
                ? function (t) {
                    return L.is(t, e, n);
                  }
                : h(e);
          return (
            (0, M.domEach)(this, function (e) {
              for (; e && (0, M.isTag)(e); ) {
                if (i(e, 0)) {
                  r.includes(e) || r.push(e);
                  break;
                }
                e = e.parent;
              }
            }),
            this._make(r)
          );
        }
        function c() {
          var e = this.toArray().reduce(function (e, t) {
            return (0, v.hasChildren)(t) ? e.concat(t.children) : e;
          }, []);
          return this._make(e);
        }
        function u(e) {
          for (
            var t = 0, r = this.length;
            t < r && !1 !== e.call(this[t], t, this[t]);

          )
            ++t;
          return this;
        }
        function l(e) {
          for (var t = [], r = 0; r < this.length; r++) {
            var n = this[r],
              i = e.call(n, r, n);
            null != i && (t = t.concat(i));
          }
          return this._make(t);
        }
        function h(e) {
          return "function" == typeof e
            ? function (t, r) {
                return e.call(t, r, t);
              }
            : (0, M.isCheerio)(e)
            ? function (t) {
                return Array.prototype.includes.call(e, t);
              }
            : function (t) {
                return e === t;
              };
        }
        function T(e) {
          var t;
          return this._make(
            d(
              this.toArray(),
              e,
              this.options.xmlMode,
              null === (t = this._root) || void 0 === t ? void 0 : t[0]
            )
          );
        }
        function d(e, t, r, n) {
          return "string" == typeof t
            ? L.filter(t, e, { xmlMode: r, root: n })
            : e.filter(h(t));
        }
        function E(e) {
          var t = this.toArray();
          return "string" == typeof e
            ? L.some(t.filter(M.isTag), e, this.options)
            : !!e && t.some(h(e));
        }
        function p(e) {
          var t = this.toArray();
          if ("string" == typeof e) {
            var r = new Set(L.filter(e, t, this.options));
            t = t.filter(function (e) {
              return !r.has(e);
            });
          } else {
            var n = h(e);
            t = t.filter(function (e, t) {
              return !n(e, t);
            });
          }
          return this._make(t);
        }
        function f(e) {
          var t = this;
          return this.filter(
            "string" == typeof e
              ? ":has(".concat(e, ")")
              : function (r, n) {
                  return t._make(n).find(e).length > 0;
                }
          );
        }
        function _() {
          return this.length > 1 ? this._make(this[0]) : this;
        }
        function A() {
          return this.length > 0 ? this._make(this[this.length - 1]) : this;
        }
        function m(e) {
          var t;
          return (
            (e = +e),
            0 === e && this.length <= 1
              ? this
              : (e < 0 && (e = this.length + e),
                this._make(null !== (t = this[e]) && void 0 !== t ? t : []))
          );
        }
        function I(e) {
          return null == e ? this.toArray() : this[e < 0 ? this.length + e : e];
        }
        function D() {
          return Array.prototype.slice.call(this);
        }
        function g(e) {
          var t, r;
          return (
            null == e
              ? ((t = this.parent().children()), (r = this[0]))
              : "string" == typeof e
              ? ((t = this._make(e)), (r = this[0]))
              : ((t = this), (r = (0, M.isCheerio)(e) ? e[0] : e)),
            Array.prototype.indexOf.call(t, r)
          );
        }
        function N(e, t) {
          return this._make(Array.prototype.slice.call(this, e, t));
        }
        function C() {
          var e;
          return null !== (e = this.prevObject) && void 0 !== e
            ? e
            : this._make([]);
        }
        function S(e, t) {
          var r = this._make(e, t),
            n = (0, G.uniqueSort)(P(P([], this.get(), !0), r.get(), !0));
          return this._make(n);
        }
        function O(e) {
          return this.prevObject
            ? this.add(e ? this.prevObject.filter(e) : this.prevObject)
            : this;
        }
        var b =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, r, n) {
                  void 0 === n && (n = r);
                  var i = Object.getOwnPropertyDescriptor(t, r);
                  (i &&
                    ("get" in i
                      ? t.__esModule
                      : !i.writable && !i.configurable)) ||
                    (i = {
                      enumerable: !0,
                      get: function () {
                        return t[r];
                      },
                    }),
                    Object.defineProperty(e, n, i);
                }
              : function (e, t, r, n) {
                  void 0 === n && (n = r), (e[n] = t[r]);
                }),
          R =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, t) {
                  Object.defineProperty(e, "default", {
                    enumerable: !0,
                    value: t,
                  });
                }
              : function (e, t) {
                  e.default = t;
                }),
          y =
            (this && this.__importStar) ||
            function (e) {
              if (e && e.__esModule) return e;
              var t = {};
              if (null != e)
                for (var r in e)
                  "default" !== r &&
                    Object.prototype.hasOwnProperty.call(e, r) &&
                    b(t, e, r);
              return R(t, e), t;
            },
          P =
            (this && this.__spreadArray) ||
            function (e, t, r) {
              if (r || 2 === arguments.length)
                for (var n, i = 0, s = t.length; i < s; i++)
                  (!n && i in t) ||
                    (n || (n = Array.prototype.slice.call(t, 0, i)),
                    (n[i] = t[i]));
              return e.concat(n || Array.prototype.slice.call(t));
            };
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.addBack =
            r.add =
            r.end =
            r.slice =
            r.index =
            r.toArray =
            r.get =
            r.eq =
            r.last =
            r.first =
            r.has =
            r.not =
            r.is =
            r.filterArray =
            r.filter =
            r.map =
            r.each =
            r.contents =
            r.children =
            r.siblings =
            r.prevUntil =
            r.prevAll =
            r.prev =
            r.nextUntil =
            r.nextAll =
            r.next =
            r.closest =
            r.parentsUntil =
            r.parents =
            r.parent =
            r.find =
              void 0);
        var v = e("domhandler"),
          L = y(e("cheerio-select")),
          M = e("../utils.js"),
          k = e("../static.js"),
          G = e("domutils"),
          B = /^\s*[~+]/;
        r.find = n;
        var w = i(function (e, t) {
            for (var r, n = [], i = 0; i < t.length; i++) {
              var s = e(t[i]);
              n.push(s);
            }
            return (r = new Array()).concat.apply(r, n);
          }),
          x = i(function (e, t) {
            for (var r = [], n = 0; n < t.length; n++) {
              var i = e(t[n]);
              null !== i && r.push(i);
            }
            return r;
          });
        (r.parent = x(function (e) {
          var t = e.parent;
          return t && !(0, v.isDocument)(t) ? t : null;
        }, a)),
          (r.parents = w(
            function (e) {
              for (var t = []; e.parent && !(0, v.isDocument)(e.parent); )
                t.push(e.parent), (e = e.parent);
              return t;
            },
            G.uniqueSort,
            function (e) {
              return e.reverse();
            }
          )),
          (r.parentsUntil = s(
            function (e) {
              var t = e.parent;
              return t && !(0, v.isDocument)(t) ? t : null;
            },
            G.uniqueSort,
            function (e) {
              return e.reverse();
            }
          )),
          (r.closest = o),
          (r.next = x(function (e) {
            return (0, G.nextElementSibling)(e);
          })),
          (r.nextAll = w(function (e) {
            for (var t = []; e.next; )
              (e = e.next), (0, M.isTag)(e) && t.push(e);
            return t;
          }, a)),
          (r.nextUntil = s(function (e) {
            return (0, G.nextElementSibling)(e);
          }, a)),
          (r.prev = x(function (e) {
            return (0, G.prevElementSibling)(e);
          })),
          (r.prevAll = w(function (e) {
            for (var t = []; e.prev; )
              (e = e.prev), (0, M.isTag)(e) && t.push(e);
            return t;
          }, a)),
          (r.prevUntil = s(function (e) {
            return (0, G.prevElementSibling)(e);
          }, a)),
          (r.siblings = w(function (e) {
            return (0, G.getSiblings)(e).filter(function (t) {
              return (0, M.isTag)(t) && t !== e;
            });
          }, G.uniqueSort)),
          (r.children = w(function (e) {
            return (0, G.getChildren)(e).filter(M.isTag);
          }, a)),
          (r.contents = c),
          (r.each = u),
          (r.map = l),
          (r.filter = T),
          (r.filterArray = d),
          (r.is = E),
          (r.not = p),
          (r.has = f),
          (r.first = _),
          (r.last = A),
          (r.eq = m),
          (r.get = I),
          (r.toArray = D),
          (r.index = g),
          (r.slice = N),
          (r.end = C),
          (r.add = S),
          (r.addBack = O);
      },
      {
        "../static.js": 20,
        "../utils.js": 22,
        "cheerio-select": 7,
        domhandler: 40,
        domutils: 44,
      },
    ],
    14: [
      function (e, t, r) {
        "use strict";
        var n =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, r, n) {
                  void 0 === n && (n = r);
                  var i = Object.getOwnPropertyDescriptor(t, r);
                  (i &&
                    ("get" in i
                      ? t.__esModule
                      : !i.writable && !i.configurable)) ||
                    (i = {
                      enumerable: !0,
                      get: function () {
                        return t[r];
                      },
                    }),
                    Object.defineProperty(e, n, i);
                }
              : function (e, t, r, n) {
                  void 0 === n && (n = r), (e[n] = t[r]);
                }),
          i =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, t) {
                  Object.defineProperty(e, "default", {
                    enumerable: !0,
                    value: t,
                  });
                }
              : function (e, t) {
                  e.default = t;
                }),
          s =
            (this && this.__importStar) ||
            function (e) {
              if (e && e.__esModule) return e;
              var t = {};
              if (null != e)
                for (var r in e)
                  "default" !== r &&
                    Object.prototype.hasOwnProperty.call(e, r) &&
                    n(t, e, r);
              return i(t, e), t;
            };
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.Cheerio = void 0);
        var a = s(e("./api/attributes.js")),
          o = s(e("./api/traversing.js")),
          c = s(e("./api/manipulation.js")),
          u = s(e("./api/css.js")),
          l = s(e("./api/forms.js")),
          h = (function () {
            function e(e, t, r) {
              if (
                ((this.length = 0), (this.options = r), (this._root = t), e)
              ) {
                for (var n = 0; n < e.length; n++) this[n] = e[n];
                this.length = e.length;
              }
            }
            return e;
          })();
        (r.Cheerio = h),
          (h.prototype.cheerio = "[cheerio object]"),
          (h.prototype.splice = Array.prototype.splice),
          (h.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator]),
          Object.assign(h.prototype, a, o, c, u, l);
      },
      {
        "./api/attributes.js": 9,
        "./api/css.js": 10,
        "./api/forms.js": 11,
        "./api/manipulation.js": 12,
        "./api/traversing.js": 13,
      },
    ],
    15: [
      function (e, t, r) {
        "use strict";
        var n =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, r, n) {
                  void 0 === n && (n = r);
                  var i = Object.getOwnPropertyDescriptor(t, r);
                  (i &&
                    ("get" in i
                      ? t.__esModule
                      : !i.writable && !i.configurable)) ||
                    (i = {
                      enumerable: !0,
                      get: function () {
                        return t[r];
                      },
                    }),
                    Object.defineProperty(e, n, i);
                }
              : function (e, t, r, n) {
                  void 0 === n && (n = r), (e[n] = t[r]);
                }),
          i =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, t) {
                  Object.defineProperty(e, "default", {
                    enumerable: !0,
                    value: t,
                  });
                }
              : function (e, t) {
                  e.default = t;
                }),
          s =
            (this && this.__exportStar) ||
            function (e, t) {
              for (var r in e)
                "default" === r ||
                  Object.prototype.hasOwnProperty.call(t, r) ||
                  n(t, e, r);
            },
          a =
            (this && this.__importStar) ||
            function (e) {
              if (e && e.__esModule) return e;
              var t = {};
              if (null != e)
                for (var r in e)
                  "default" !== r &&
                    Object.prototype.hasOwnProperty.call(e, r) &&
                    n(t, e, r);
              return i(t, e), t;
            },
          o =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.root =
            r.parseHTML =
            r.merge =
            r.contains =
            r.text =
            r.xml =
            r.html =
            r.load =
              void 0),
          s(e("./types.js"), r);
        var c = e("./load.js"),
          u = e("./parse.js"),
          l = e("./parsers/parse5-adapter.js"),
          h = o(e("dom-serializer")),
          T = e("htmlparser2"),
          d = (0, u.getParse)(function (e, t, r, n) {
            return t.xmlMode || t._useHtmlParser2
              ? (0, T.parseDocument)(e, t)
              : (0, l.parseWithParse5)(e, t, r, n);
          });
        (r.load = (0, c.getLoad)(d, function (e, t) {
          return t.xmlMode || t._useHtmlParser2
            ? (0, h.default)(e, t)
            : (0, l.renderWithParse5)(e);
        })),
          (r.default = (0, r.load)([]));
        var E = e("./static.js");
        Object.defineProperty(r, "html", {
          enumerable: !0,
          get: function () {
            return E.html;
          },
        }),
          Object.defineProperty(r, "xml", {
            enumerable: !0,
            get: function () {
              return E.xml;
            },
          }),
          Object.defineProperty(r, "text", {
            enumerable: !0,
            get: function () {
              return E.text;
            },
          });
        var p = a(e("./static.js"));
        (r.contains = p.contains),
          (r.merge = p.merge),
          (r.parseHTML = p.parseHTML),
          (r.root = p.root);
      },
      {
        "./load.js": 16,
        "./parse.js": 18,
        "./parsers/parse5-adapter.js": 19,
        "./static.js": 20,
        "./types.js": 21,
        "dom-serializer": 38,
        htmlparser2: 60,
      },
    ],
    16: [
      function (e, t, r) {
        "use strict";
        function n(e, t) {
          return function r(n, s, c) {
            function u(t, r, n, s) {
              if ((void 0 === n && (n = p), t && (0, E.isCheerio)(t))) return t;
              var a = o(o({}, l), (0, h.flatten)(s)),
                c =
                  "string" == typeof n
                    ? [e(n, a, !1, null)]
                    : "length" in n
                    ? n
                    : [n],
                u = (0, E.isCheerio)(c) ? c : new f(c, null, a);
              if (((u._root = u), !t)) return new f(void 0, u, a);
              var T =
                  "string" == typeof t && (0, E.isHtml)(t)
                    ? e(t, a, !1, null).children
                    : i(t)
                    ? [t]
                    : Array.isArray(t)
                    ? t
                    : void 0,
                d = new f(T, u, a);
              if (T) return d;
              if ("string" != typeof t)
                throw new Error("Unexpected type of selector");
              var _ = t,
                A = r
                  ? "string" == typeof r
                    ? (0, E.isHtml)(r)
                      ? new f([e(r, a, !1, null)], u, a)
                      : ((_ = "".concat(r, " ").concat(_)), u)
                    : (0, E.isCheerio)(r)
                    ? r
                    : new f(Array.isArray(r) ? r : [r], u, a)
                  : u;
              return A ? A.find(_) : d;
            }
            if ((void 0 === c && (c = !0), null == n))
              throw new Error("cheerio.load() expects a string");
            var l = o(o({}, h.default), (0, h.flatten)(s)),
              p = e(n, l, c, null),
              f = (function (r) {
                function n() {
                  return (null !== r && r.apply(this, arguments)) || this;
                }
                return (
                  a(n, r),
                  (n.prototype._make = function (e, t) {
                    var r = u(e, t);
                    return (r.prevObject = this), r;
                  }),
                  (n.prototype._parse = function (t, r, n, i) {
                    return e(t, r, n, i);
                  }),
                  (n.prototype._render = function (e) {
                    return t(e, this.options);
                  }),
                  n
                );
              })(d.Cheerio);
            return (
              Object.assign(u, T, {
                load: r,
                _root: p,
                _options: l,
                fn: f.prototype,
                prototype: f.prototype,
              }),
              u
            );
          };
        }
        function i(e) {
          return (
            !!e.name ||
            "root" === e.type ||
            "text" === e.type ||
            "comment" === e.type
          );
        }
        var s,
          a =
            (this && this.__extends) ||
            ((s = function (e, t) {
              return (
                (s =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (e, t) {
                      e.__proto__ = t;
                    }) ||
                  function (e, t) {
                    for (var r in t)
                      Object.prototype.hasOwnProperty.call(t, r) &&
                        (e[r] = t[r]);
                  }),
                s(e, t)
              );
            }),
            function (e, t) {
              function r() {
                this.constructor = e;
              }
              if ("function" != typeof t && null !== t)
                throw new TypeError(
                  "Class extends value " +
                    String(t) +
                    " is not a constructor or null"
                );
              s(e, t),
                (e.prototype =
                  null === t
                    ? Object.create(t)
                    : ((r.prototype = t.prototype), new r()));
            }),
          o =
            (this && this.__assign) ||
            function () {
              return (
                (o =
                  Object.assign ||
                  function (e) {
                    for (var t, r = 1, n = arguments.length; r < n; r++)
                      for (var i in ((t = arguments[r]), t))
                        Object.prototype.hasOwnProperty.call(t, i) &&
                          (e[i] = t[i]);
                    return e;
                  }),
                o.apply(this, arguments)
              );
            },
          c =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, r, n) {
                  void 0 === n && (n = r);
                  var i = Object.getOwnPropertyDescriptor(t, r);
                  (i &&
                    ("get" in i
                      ? t.__esModule
                      : !i.writable && !i.configurable)) ||
                    (i = {
                      enumerable: !0,
                      get: function () {
                        return t[r];
                      },
                    }),
                    Object.defineProperty(e, n, i);
                }
              : function (e, t, r, n) {
                  void 0 === n && (n = r), (e[n] = t[r]);
                }),
          u =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, t) {
                  Object.defineProperty(e, "default", {
                    enumerable: !0,
                    value: t,
                  });
                }
              : function (e, t) {
                  e.default = t;
                }),
          l =
            (this && this.__importStar) ||
            function (e) {
              if (e && e.__esModule) return e;
              var t = {};
              if (null != e)
                for (var r in e)
                  "default" !== r &&
                    Object.prototype.hasOwnProperty.call(e, r) &&
                    c(t, e, r);
              return u(t, e), t;
            };
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.getLoad = void 0);
        var h = l(e("./options.js")),
          T = l(e("./static.js")),
          d = e("./cheerio.js"),
          E = e("./utils.js");
        r.getLoad = n;
      },
      {
        "./cheerio.js": 14,
        "./options.js": 17,
        "./static.js": 20,
        "./utils.js": 22,
      },
    ],
    17: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          return (null == e ? void 0 : e.xml)
            ? "boolean" == typeof e.xml
              ? a
              : i(i({}, a), e.xml)
            : null != e
            ? e
            : void 0;
        }
        var i =
          (this && this.__assign) ||
          function () {
            return (
              (i =
                Object.assign ||
                function (e) {
                  for (var t, r = 1, n = arguments.length; r < n; r++)
                    for (var i in ((t = arguments[r]), t))
                      Object.prototype.hasOwnProperty.call(t, i) &&
                        (e[i] = t[i]);
                  return e;
                }),
              i.apply(this, arguments)
            );
          };
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.flatten = void 0);
        var s = { xml: !1, decodeEntities: !0 };
        r.default = s;
        var a = { _useHtmlParser2: !0, xmlMode: !0 };
        r.flatten = n;
      },
      {},
    ],
    18: [
      function (e, t, r) {
        (function (t) {
          (function () {
            "use strict";
            function n(e) {
              return function (r, n, s, o) {
                if (
                  (void 0 !== t && t.isBuffer(r) && (r = r.toString()),
                  "string" == typeof r)
                )
                  return e(r, n, s, o);
                var c = r;
                if (!Array.isArray(c) && (0, a.isDocument)(c)) return c;
                var u = new a.Document([]);
                return i(c, u), u;
              };
            }
            function i(e, t) {
              var r = Array.isArray(e) ? e : [e];
              t ? (t.children = r) : (t = null);
              for (var n = 0; n < r.length; n++) {
                var i = r[n];
                i.parent && i.parent.children !== r && (0, s.removeElement)(i),
                  t
                    ? ((i.prev = r[n - 1] || null), (i.next = r[n + 1] || null))
                    : (i.prev = i.next = null),
                  (i.parent = t);
              }
              return t;
            }
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.update = r.getParse = void 0);
            var s = e("domutils"),
              a = e("domhandler");
            (r.getParse = n), (r.update = i);
          }).call(this);
        }).call(this, e("buffer").Buffer);
      },
      { buffer: 2, domhandler: 40, domutils: 44 },
    ],
    19: [
      function (e, t, r) {
        "use strict";
        function n(e, t, r, n) {
          var i = {
            scriptingEnabled:
              "boolean" != typeof t.scriptingEnabled || t.scriptingEnabled,
            treeAdapter: c.adapter,
            sourceCodeLocationInfo: t.sourceCodeLocationInfo,
          };
          return r ? (0, o.parse)(e, i) : (0, o.parseFragment)(n, e, i);
        }
        function i(e) {
          for (
            var t, r = ("length" in e) ? e : [e], n = 0;
            n < r.length;
            n += 1
          ) {
            var i = r[n];
            (0, a.isDocument)(i) &&
              (t = Array.prototype.splice).call.apply(
                t,
                s([r, n, 1], i.children, !1)
              );
          }
          var c = "";
          for (n = 0; n < r.length; n += 1) {
            i = r[n];
            c += (0, o.serializeOuter)(i, u);
          }
          return c;
        }
        var s =
          (this && this.__spreadArray) ||
          function (e, t, r) {
            if (r || 2 === arguments.length)
              for (var n, i = 0, s = t.length; i < s; i++)
                (!n && i in t) ||
                  (n || (n = Array.prototype.slice.call(t, 0, i)),
                  (n[i] = t[i]));
            return e.concat(n || Array.prototype.slice.call(t));
          };
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.renderWithParse5 = r.parseWithParse5 = void 0);
        var a = e("domhandler"),
          o = e("parse5"),
          c = e("parse5-htmlparser2-tree-adapter");
        r.parseWithParse5 = n;
        var u = { treeAdapter: c.adapter };
        r.renderWithParse5 = i;
      },
      { domhandler: 40, parse5: 71, "parse5-htmlparser2-tree-adapter": 64 },
    ],
    20: [
      function (e, t, r) {
        "use strict";
        function n(e, t, r) {
          return e
            ? e(null != t ? t : e._root.children, null, void 0, r).toString()
            : "";
        }
        function i(e, t) {
          return !(
            t ||
            "object" != typeof e ||
            null == e ||
            "length" in e ||
            "type" in e
          );
        }
        function s(e, t) {
          var r = i(e) ? void (t = e) : e,
            s = d(
              d(d({}, A.default), null == this ? void 0 : this._options),
              (0, A.flatten)(null != t ? t : {})
            );
          return n(this, r, s);
        }
        function a(e) {
          var t = d(d({}, this._options), { xmlMode: !0 });
          return n(this, e, t);
        }
        function o(e) {
          for (
            var t = e || (this ? this.root() : []), r = "", n = 0;
            n < t.length;
            n++
          )
            r += (0, _.textContent)(t[n]);
          return r;
        }
        function c(e, t, r) {
          if (
            (void 0 === r && (r = "boolean" == typeof t && t),
            !e || "string" != typeof e)
          )
            return null;
          "boolean" == typeof t && (r = t);
          var n = this.load(e, A.default, !1);
          return r || n("script").remove(), n.root()[0].children.slice();
        }
        function u() {
          return this(this._root);
        }
        function l(e, t) {
          if (t === e) return !1;
          for (var r = t; r && r !== r.parent; )
            if (((r = r.parent), r === e)) return !0;
          return !1;
        }
        function h(e, t) {
          if (T(e) && T(t)) {
            for (var r = e.length, n = +t.length, i = 0; i < n; i++)
              e[r++] = t[i];
            return (e.length = r), e;
          }
        }
        function T(e) {
          if (Array.isArray(e)) return !0;
          if (
            "object" != typeof e ||
            !Object.prototype.hasOwnProperty.call(e, "length") ||
            "number" != typeof e.length ||
            e.length < 0
          )
            return !1;
          for (var t = 0; t < e.length; t++) if (!(t in e)) return !1;
          return !0;
        }
        var d =
            (this && this.__assign) ||
            function () {
              return (
                (d =
                  Object.assign ||
                  function (e) {
                    for (var t, r = 1, n = arguments.length; r < n; r++)
                      for (var i in ((t = arguments[r]), t))
                        Object.prototype.hasOwnProperty.call(t, i) &&
                          (e[i] = t[i]);
                    return e;
                  }),
                d.apply(this, arguments)
              );
            },
          E =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, r, n) {
                  void 0 === n && (n = r);
                  var i = Object.getOwnPropertyDescriptor(t, r);
                  (i &&
                    ("get" in i
                      ? t.__esModule
                      : !i.writable && !i.configurable)) ||
                    (i = {
                      enumerable: !0,
                      get: function () {
                        return t[r];
                      },
                    }),
                    Object.defineProperty(e, n, i);
                }
              : function (e, t, r, n) {
                  void 0 === n && (n = r), (e[n] = t[r]);
                }),
          p =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, t) {
                  Object.defineProperty(e, "default", {
                    enumerable: !0,
                    value: t,
                  });
                }
              : function (e, t) {
                  e.default = t;
                }),
          f =
            (this && this.__importStar) ||
            function (e) {
              if (e && e.__esModule) return e;
              var t = {};
              if (null != e)
                for (var r in e)
                  "default" !== r &&
                    Object.prototype.hasOwnProperty.call(e, r) &&
                    E(t, e, r);
              return p(t, e), t;
            };
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.merge =
            r.contains =
            r.root =
            r.parseHTML =
            r.text =
            r.xml =
            r.html =
              void 0);
        var _ = e("domutils"),
          A = f(e("./options.js"));
        (r.html = s),
          (r.xml = a),
          (r.text = o),
          (r.parseHTML = c),
          (r.root = u),
          (r.contains = l),
          (r.merge = h);
      },
      { "./options.js": 17, domutils: 44 },
    ],
    21: [
      function (e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
      },
      {},
    ],
    22: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          return null != e.cheerio;
        }
        function i(e) {
          return e.replace(/[_.-](\w|$)/g, function (e, t) {
            return t.toUpperCase();
          });
        }
        function s(e) {
          return e.replace(/[A-Z]/g, "-$&").toLowerCase();
        }
        function a(e, t) {
          for (var r = e.length, n = 0; n < r; n++) t(e[n], n);
          return e;
        }
        function o(e) {
          var t =
              "length" in e
                ? Array.prototype.map.call(e, function (e) {
                    return (0, l.cloneNode)(e, !0);
                  })
                : [(0, l.cloneNode)(e, !0)],
            r = new l.Document(t);
          return (
            t.forEach(function (e) {
              e.parent = r;
            }),
            t
          );
        }
        function c(e) {
          var t = e.indexOf("<");
          if (t < 0 || t > e.length - 3) return !1;
          var r = e.charCodeAt(t + 1);
          return (
            ((r >= u.LowerA && r <= u.LowerZ) ||
              (r >= u.UpperA && r <= u.UpperZ) ||
              r === u.Exclamation) &&
            e.includes(">", t + 2)
          );
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.isHtml =
            r.cloneDom =
            r.domEach =
            r.cssCase =
            r.camelCase =
            r.isCheerio =
            r.isTag =
              void 0);
        var u,
          l = e("domhandler"),
          h = e("domhandler");
        Object.defineProperty(r, "isTag", {
          enumerable: !0,
          get: function () {
            return h.isTag;
          },
        }),
          (r.isCheerio = n),
          (r.camelCase = i),
          (r.cssCase = s),
          (r.domEach = a),
          (r.cloneDom = o),
          (function (e) {
            (e[(e.LowerA = 97)] = "LowerA"),
              (e[(e.LowerZ = 122)] = "LowerZ"),
              (e[(e.UpperA = 65)] = "UpperA"),
              (e[(e.UpperZ = 90)] = "UpperZ"),
              (e[(e.Exclamation = 33)] = "Exclamation");
          })(u || (u = {})),
          (r.isHtml = c);
      },
      { domhandler: 40 },
    ],
    23: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          return e.replace(o, "\\$&");
        }
        function i(e, t) {
          return "boolean" == typeof e.ignoreCase
            ? e.ignoreCase
            : "quirks" === e.ignoreCase
            ? !!t.quirksMode
            : !t.xmlMode && c.has(e.name);
        }
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.attributeRules = void 0);
        var a = s(e("boolbase")),
          o = /[-[\]{}()*+?.,\\^$|#\s]/g,
          c = new Set([
            "accept",
            "accept-charset",
            "align",
            "alink",
            "axis",
            "bgcolor",
            "charset",
            "checked",
            "clear",
            "codetype",
            "color",
            "compact",
            "declare",
            "defer",
            "dir",
            "direction",
            "disabled",
            "enctype",
            "face",
            "frame",
            "hreflang",
            "http-equiv",
            "lang",
            "language",
            "link",
            "media",
            "method",
            "multiple",
            "nohref",
            "noresize",
            "noshade",
            "nowrap",
            "readonly",
            "rel",
            "rev",
            "rules",
            "scope",
            "scrolling",
            "selected",
            "shape",
            "target",
            "text",
            "type",
            "valign",
            "valuetype",
            "vlink",
          ]);
        r.attributeRules = {
          equals: function (e, t, r) {
            var n = r.adapter,
              s = t.name,
              a = t.value;
            return i(t, r)
              ? ((a = a.toLowerCase()),
                function (t) {
                  var r = n.getAttributeValue(t, s);
                  return (
                    null != r &&
                    r.length === a.length &&
                    r.toLowerCase() === a &&
                    e(t)
                  );
                })
              : function (t) {
                  return n.getAttributeValue(t, s) === a && e(t);
                };
          },
          hyphen: function (e, t, r) {
            var n = r.adapter,
              s = t.name,
              a = t.value,
              o = a.length;
            return i(t, r)
              ? ((a = a.toLowerCase()),
                function (t) {
                  var r = n.getAttributeValue(t, s);
                  return (
                    null != r &&
                    (r.length === o || "-" === r.charAt(o)) &&
                    r.substr(0, o).toLowerCase() === a &&
                    e(t)
                  );
                })
              : function (t) {
                  var r = n.getAttributeValue(t, s);
                  return (
                    null != r &&
                    (r.length === o || "-" === r.charAt(o)) &&
                    r.substr(0, o) === a &&
                    e(t)
                  );
                };
          },
          element: function (e, t, r) {
            var s = r.adapter,
              o = t.name,
              c = t.value;
            if (/\s/.test(c)) return a.default.falseFunc;
            var u = new RegExp(
              "(?:^|\\s)".concat(n(c), "(?:$|\\s)"),
              i(t, r) ? "i" : ""
            );
            return function (t) {
              var r = s.getAttributeValue(t, o);
              return null != r && r.length >= c.length && u.test(r) && e(t);
            };
          },
          exists: function (e, t, r) {
            var n = t.name,
              i = r.adapter;
            return function (t) {
              return i.hasAttrib(t, n) && e(t);
            };
          },
          start: function (e, t, r) {
            var n = r.adapter,
              s = t.name,
              o = t.value,
              c = o.length;
            return 0 === c
              ? a.default.falseFunc
              : i(t, r)
              ? ((o = o.toLowerCase()),
                function (t) {
                  var r = n.getAttributeValue(t, s);
                  return (
                    null != r &&
                    r.length >= c &&
                    r.substr(0, c).toLowerCase() === o &&
                    e(t)
                  );
                })
              : function (t) {
                  var r;
                  return (
                    !!(null === (r = n.getAttributeValue(t, s)) || void 0 === r
                      ? void 0
                      : r.startsWith(o)) && e(t)
                  );
                };
          },
          end: function (e, t, r) {
            var n = r.adapter,
              s = t.name,
              o = t.value,
              c = -o.length;
            return 0 === c
              ? a.default.falseFunc
              : i(t, r)
              ? ((o = o.toLowerCase()),
                function (t) {
                  var r;
                  return (
                    (null === (r = n.getAttributeValue(t, s)) || void 0 === r
                      ? void 0
                      : r.substr(c).toLowerCase()) === o && e(t)
                  );
                })
              : function (t) {
                  var r;
                  return (
                    !!(null === (r = n.getAttributeValue(t, s)) || void 0 === r
                      ? void 0
                      : r.endsWith(o)) && e(t)
                  );
                };
          },
          any: function (e, t, r) {
            var s = r.adapter,
              o = t.name,
              c = t.value;
            if ("" === c) return a.default.falseFunc;
            if (i(t, r)) {
              var u = new RegExp(n(c), "i");
              return function (t) {
                var r = s.getAttributeValue(t, o);
                return null != r && r.length >= c.length && u.test(r) && e(t);
              };
            }
            return function (t) {
              var r;
              return (
                !!(null === (r = s.getAttributeValue(t, o)) || void 0 === r
                  ? void 0
                  : r.includes(c)) && e(t)
              );
            };
          },
          not: function (e, t, r) {
            var n = r.adapter,
              s = t.name,
              a = t.value;
            return "" === a
              ? function (t) {
                  return !!n.getAttributeValue(t, s) && e(t);
                }
              : i(t, r)
              ? ((a = a.toLowerCase()),
                function (t) {
                  var r = n.getAttributeValue(t, s);
                  return (
                    (null == r ||
                      r.length !== a.length ||
                      r.toLowerCase() !== a) &&
                    e(t)
                  );
                })
              : function (t) {
                  return n.getAttributeValue(t, s) !== a && e(t);
                };
          },
        };
      },
      { boolbase: 5 },
    ],
    24: [
      function (e, t, r) {
        "use strict";
        function n(e, t, r) {
          var n = i(e, t, r);
          return (0, A.ensureIsTag)(n, t.adapter);
        }
        function i(e, t, r) {
          var n = "string" == typeof e ? (0, E.parse)(e) : e;
          return o(n, t, r);
        }
        function s(e) {
          return (
            e.type === E.SelectorType.Pseudo &&
            ("scope" === e.name ||
              (Array.isArray(e.data) &&
                e.data.some(function (e) {
                  return e.some(s);
                })))
          );
        }
        function a(e, t, r) {
          for (
            var n = t.adapter,
              i = !!(null == r
                ? void 0
                : r.every(function (e) {
                    var t = n.isTag(e) && n.getParent(e);
                    return e === A.PLACEHOLDER_ELEMENT || (t && n.isTag(t));
                  })),
              a = 0,
              o = e;
            a < o.length;
            a++
          ) {
            var c = o[a];
            if (
              c.length > 0 &&
              (0, f.isTraversal)(c[0]) &&
              c[0].type !== E.SelectorType.Descendant
            );
            else {
              if (!i || c.some(s)) continue;
              c.unshift(m);
            }
            c.unshift(D);
          }
        }
        function o(e, t, r) {
          var n;
          e.forEach(f.default),
            (r = null !== (n = t.context) && void 0 !== n ? n : r);
          var i = Array.isArray(r),
            s = r && (Array.isArray(r) ? r : [r]);
          if (!1 !== t.relativeSelector) a(e, t, s);
          else if (
            e.some(function (e) {
              return e.length > 0 && (0, f.isTraversal)(e[0]);
            })
          )
            throw new Error(
              "Relative selectors are not allowed when the `relativeSelector` option is disabled"
            );
          var o = !1,
            l = e
              .map(function (e) {
                if (e.length >= 2) {
                  var r = e[0],
                    n = e[1];
                  r.type !== E.SelectorType.Pseudo ||
                    "scope" !== r.name ||
                    (i && n.type === E.SelectorType.Descendant
                      ? (e[1] = I)
                      : (n.type !== E.SelectorType.Adjacent &&
                          n.type !== E.SelectorType.Sibling) ||
                        (o = !0));
                }
                return c(e, t, s);
              })
              .reduce(u, p.default.falseFunc);
          return (l.shouldTestNextSiblings = o), l;
        }
        function c(e, t, r) {
          var n;
          return e.reduce(
            function (e, n) {
              return e === p.default.falseFunc
                ? p.default.falseFunc
                : (0, _.compileGeneralSelector)(e, n, t, r, o);
            },
            null !== (n = t.rootFunc) && void 0 !== n ? n : p.default.trueFunc
          );
        }
        function u(e, t) {
          return t === p.default.falseFunc || e === p.default.trueFunc
            ? e
            : e === p.default.falseFunc || t === p.default.trueFunc
            ? t
            : function (r) {
                return e(r) || t(r);
              };
        }
        var l =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, r, n) {
                  void 0 === n && (n = r);
                  var i = Object.getOwnPropertyDescriptor(t, r);
                  (i &&
                    ("get" in i
                      ? t.__esModule
                      : !i.writable && !i.configurable)) ||
                    (i = {
                      enumerable: !0,
                      get: function () {
                        return t[r];
                      },
                    }),
                    Object.defineProperty(e, n, i);
                }
              : function (e, t, r, n) {
                  void 0 === n && (n = r), (e[n] = t[r]);
                }),
          h =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, t) {
                  Object.defineProperty(e, "default", {
                    enumerable: !0,
                    value: t,
                  });
                }
              : function (e, t) {
                  e.default = t;
                }),
          T =
            (this && this.__importStar) ||
            function (e) {
              if (e && e.__esModule) return e;
              var t = {};
              if (null != e)
                for (var r in e)
                  "default" !== r &&
                    Object.prototype.hasOwnProperty.call(e, r) &&
                    l(t, e, r);
              return h(t, e), t;
            },
          d =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.compileToken = r.compileUnsafe = r.compile = void 0);
        var E = e("css-what"),
          p = d(e("boolbase")),
          f = T(e("./sort.js")),
          _ = e("./general.js"),
          A = e("./pseudo-selectors/subselects.js");
        (r.compile = n), (r.compileUnsafe = i);
        var m = { type: E.SelectorType.Descendant },
          I = { type: "_flexibleDescendant" },
          D = { type: E.SelectorType.Pseudo, name: "scope", data: null };
        r.compileToken = o;
      },
      {
        "./general.js": 25,
        "./pseudo-selectors/subselects.js": 31,
        "./sort.js": 32,
        boolbase: 5,
        "css-what": 33,
      },
    ],
    25: [
      function (e, t, r) {
        "use strict";
        function n(e, t) {
          var r = t.getParent(e);
          return r && t.isTag(r) ? r : null;
        }
        function i(e, t, r, i, c) {
          var u = r.adapter,
            l = r.equals;
          switch (t.type) {
            case o.SelectorType.PseudoElement:
              throw new Error(
                "Pseudo-elements are not supported by css-select"
              );
            case o.SelectorType.ColumnCombinator:
              throw new Error(
                "Column combinators are not yet supported by css-select"
              );
            case o.SelectorType.Attribute:
              if (null != t.namespace)
                throw new Error(
                  "Namespaced attributes are not yet supported by css-select"
                );
              return (
                (r.xmlMode && !r.lowerCaseAttributeNames) ||
                  (t.name = t.name.toLowerCase()),
                s.attributeRules[t.action](e, t, r)
              );
            case o.SelectorType.Pseudo:
              return (0, a.compilePseudoSelector)(e, t, r, i, c);
            case o.SelectorType.Tag:
              if (null != t.namespace)
                throw new Error(
                  "Namespaced tag names are not yet supported by css-select"
                );
              var h = t.name;
              return (
                (r.xmlMode && !r.lowerCaseTags) || (h = h.toLowerCase()),
                function (t) {
                  return u.getName(t) === h && e(t);
                }
              );
            case o.SelectorType.Descendant:
              if (!1 === r.cacheResults || "undefined" == typeof WeakSet)
                return function (t) {
                  for (var r = t; (r = n(r, u)); ) if (e(r)) return !0;
                  return !1;
                };
              var T = new WeakSet();
              return function (t) {
                for (var r = t; (r = n(r, u)); )
                  if (!T.has(r)) {
                    if (u.isTag(r) && e(r)) return !0;
                    T.add(r);
                  }
                return !1;
              };
            case "_flexibleDescendant":
              return function (t) {
                var r = t;
                do {
                  if (e(r)) return !0;
                } while ((r = n(r, u)));
                return !1;
              };
            case o.SelectorType.Parent:
              return function (t) {
                return u.getChildren(t).some(function (t) {
                  return u.isTag(t) && e(t);
                });
              };
            case o.SelectorType.Child:
              return function (t) {
                var r = u.getParent(t);
                return null != r && u.isTag(r) && e(r);
              };
            case o.SelectorType.Sibling:
              return function (t) {
                for (var r = u.getSiblings(t), n = 0; n < r.length; n++) {
                  var i = r[n];
                  if (l(t, i)) break;
                  if (u.isTag(i) && e(i)) return !0;
                }
                return !1;
              };
            case o.SelectorType.Adjacent:
              return u.prevElementSibling
                ? function (t) {
                    var r = u.prevElementSibling(t);
                    return null != r && e(r);
                  }
                : function (t) {
                    for (
                      var r, n = u.getSiblings(t), i = 0;
                      i < n.length;
                      i++
                    ) {
                      var s = n[i];
                      if (l(t, s)) break;
                      u.isTag(s) && (r = s);
                    }
                    return !!r && e(r);
                  };
            case o.SelectorType.Universal:
              if (null != t.namespace && "*" !== t.namespace)
                throw new Error(
                  "Namespaced universal selectors are not yet supported by css-select"
                );
              return e;
          }
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.compileGeneralSelector = void 0);
        var s = e("./attributes.js"),
          a = e("./pseudo-selectors/index.js"),
          o = e("css-what");
        r.compileGeneralSelector = i;
      },
      {
        "./attributes.js": 23,
        "./pseudo-selectors/index.js": 29,
        "css-what": 33,
      },
    ],
    26: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          var t,
            r,
            n,
            i,
            s = null != e ? e : A;
          return (
            (null !== (t = s.adapter) && void 0 !== t) || (s.adapter = d),
            (null !== (r = s.equals) && void 0 !== r) ||
              (s.equals =
                null !==
                  (i =
                    null === (n = s.adapter) || void 0 === n
                      ? void 0
                      : n.equals) && void 0 !== i
                  ? i
                  : _),
            s
          );
        }
        function i(e) {
          return function (t, r, i) {
            var s = n(r);
            return e(t, s, i);
          };
        }
        function s(e) {
          return function (t, r, i) {
            var s = n(i);
            "function" != typeof t && (t = (0, p.compileUnsafe)(t, s, r));
            var o = a(r, s.adapter, t.shouldTestNextSiblings);
            return e(t, o, s);
          };
        }
        function a(e, t, r) {
          return (
            void 0 === r && (r = !1),
            r && (e = o(e, t)),
            Array.isArray(e) ? t.removeSubsets(e) : t.getChildren(e)
          );
        }
        function o(e, t) {
          for (
            var r = Array.isArray(e) ? e.slice(0) : [e], n = r.length, i = 0;
            i < n;
            i++
          ) {
            var s = (0, f.getNextSiblings)(r[i], t);
            r.push.apply(r, s);
          }
          return r;
        }
        function c(e, t, r) {
          var i = n(r);
          return ("function" == typeof t ? t : (0, p.compile)(t, i))(e);
        }
        var u =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, r, n) {
                  void 0 === n && (n = r);
                  var i = Object.getOwnPropertyDescriptor(t, r);
                  (i &&
                    ("get" in i
                      ? t.__esModule
                      : !i.writable && !i.configurable)) ||
                    (i = {
                      enumerable: !0,
                      get: function () {
                        return t[r];
                      },
                    }),
                    Object.defineProperty(e, n, i);
                }
              : function (e, t, r, n) {
                  void 0 === n && (n = r), (e[n] = t[r]);
                }),
          l =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, t) {
                  Object.defineProperty(e, "default", {
                    enumerable: !0,
                    value: t,
                  });
                }
              : function (e, t) {
                  e.default = t;
                }),
          h =
            (this && this.__importStar) ||
            function (e) {
              if (e && e.__esModule) return e;
              var t = {};
              if (null != e)
                for (var r in e)
                  "default" !== r &&
                    Object.prototype.hasOwnProperty.call(e, r) &&
                    u(t, e, r);
              return l(t, e), t;
            },
          T =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.aliases =
            r.pseudos =
            r.filters =
            r.is =
            r.selectOne =
            r.selectAll =
            r.prepareContext =
            r._compileToken =
            r._compileUnsafe =
            r.compile =
              void 0);
        var d = h(e("domutils")),
          E = T(e("boolbase")),
          p = e("./compile.js"),
          f = e("./pseudo-selectors/subselects.js"),
          _ = function (e, t) {
            return e === t;
          },
          A = { adapter: d, equals: _ };
        (r.compile = i(p.compile)),
          (r._compileUnsafe = i(p.compileUnsafe)),
          (r._compileToken = i(p.compileToken)),
          (r.prepareContext = a),
          (r.selectAll = s(function (e, t, r) {
            return e !== E.default.falseFunc && t && 0 !== t.length
              ? r.adapter.findAll(e, t)
              : [];
          })),
          (r.selectOne = s(function (e, t, r) {
            return e !== E.default.falseFunc && t && 0 !== t.length
              ? r.adapter.findOne(e, t)
              : null;
          })),
          (r.is = c),
          (r.default = r.selectAll);
        var m = e("./pseudo-selectors/index.js");
        Object.defineProperty(r, "filters", {
          enumerable: !0,
          get: function () {
            return m.filters;
          },
        }),
          Object.defineProperty(r, "pseudos", {
            enumerable: !0,
            get: function () {
              return m.pseudos;
            },
          }),
          Object.defineProperty(r, "aliases", {
            enumerable: !0,
            get: function () {
              return m.aliases;
            },
          });
      },
      {
        "./compile.js": 24,
        "./pseudo-selectors/index.js": 29,
        "./pseudo-selectors/subselects.js": 31,
        boolbase: 5,
        domutils: 44,
      },
    ],
    27: [
      function (e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.aliases = void 0),
          (r.aliases = {
            "any-link": ":is(a, area, link)[href]",
            link: ":any-link:not(:visited)",
            disabled:
              ":is(\n        :is(button, input, select, textarea, optgroup, option)[disabled],\n        optgroup[disabled] > option,\n        fieldset[disabled]:not(fieldset[disabled] legend:first-of-type *)\n    )",
            enabled: ":not(:disabled)",
            checked:
              ":is(:is(input[type=radio], input[type=checkbox])[checked], option:selected)",
            required: ":is(input, select, textarea)[required]",
            optional: ":is(input, select, textarea):not([required])",
            selected:
              "option:is([selected], select:not([multiple]):not(:has(> option[selected])) > :first-of-type)",
            checkbox: "[type=checkbox]",
            file: "[type=file]",
            password: "[type=password]",
            radio: "[type=radio]",
            reset: "[type=reset]",
            image: "[type=image]",
            submit: "[type=submit]",
            parent: ":not(:empty)",
            header: ":is(h1, h2, h3, h4, h5, h6)",
            button: ":is(button, input[type=button])",
            input: ":is(input, textarea, select, button)",
            text: "input:is(:not([type!='']), [type=text])",
          });
      },
      {},
    ],
    28: [
      function (e, t, r) {
        "use strict";
        function n(e, t) {
          return function (r) {
            var n = t.getParent(r);
            return null != n && t.isTag(n) && e(r);
          };
        }
        function i(e) {
          return function (t, r, n) {
            var i = n.adapter,
              s = i[e];
            return "function" != typeof s
              ? o.default.falseFunc
              : function (e) {
                  return s(e) && t(e);
                };
          };
        }
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.filters = void 0);
        var a = s(e("nth-check")),
          o = s(e("boolbase"));
        r.filters = {
          contains: function (e, t, r) {
            var n = r.adapter;
            return function (r) {
              return e(r) && n.getText(r).includes(t);
            };
          },
          icontains: function (e, t, r) {
            var n = r.adapter,
              i = t.toLowerCase();
            return function (t) {
              return e(t) && n.getText(t).toLowerCase().includes(i);
            };
          },
          "nth-child": function (e, t, r) {
            var i = r.adapter,
              s = r.equals,
              c = (0, a.default)(t);
            return c === o.default.falseFunc
              ? o.default.falseFunc
              : c === o.default.trueFunc
              ? n(e, i)
              : function (t) {
                  for (
                    var r = i.getSiblings(t), n = 0, a = 0;
                    a < r.length && !s(t, r[a]);
                    a++
                  )
                    i.isTag(r[a]) && n++;
                  return c(n) && e(t);
                };
          },
          "nth-last-child": function (e, t, r) {
            var i = r.adapter,
              s = r.equals,
              c = (0, a.default)(t);
            return c === o.default.falseFunc
              ? o.default.falseFunc
              : c === o.default.trueFunc
              ? n(e, i)
              : function (t) {
                  for (
                    var r = i.getSiblings(t), n = 0, a = r.length - 1;
                    a >= 0 && !s(t, r[a]);
                    a--
                  )
                    i.isTag(r[a]) && n++;
                  return c(n) && e(t);
                };
          },
          "nth-of-type": function (e, t, r) {
            var i = r.adapter,
              s = r.equals,
              c = (0, a.default)(t);
            return c === o.default.falseFunc
              ? o.default.falseFunc
              : c === o.default.trueFunc
              ? n(e, i)
              : function (t) {
                  for (
                    var r = i.getSiblings(t), n = 0, a = 0;
                    a < r.length;
                    a++
                  ) {
                    var o = r[a];
                    if (s(t, o)) break;
                    i.isTag(o) && i.getName(o) === i.getName(t) && n++;
                  }
                  return c(n) && e(t);
                };
          },
          "nth-last-of-type": function (e, t, r) {
            var i = r.adapter,
              s = r.equals,
              c = (0, a.default)(t);
            return c === o.default.falseFunc
              ? o.default.falseFunc
              : c === o.default.trueFunc
              ? n(e, i)
              : function (t) {
                  for (
                    var r = i.getSiblings(t), n = 0, a = r.length - 1;
                    a >= 0;
                    a--
                  ) {
                    var o = r[a];
                    if (s(t, o)) break;
                    i.isTag(o) && i.getName(o) === i.getName(t) && n++;
                  }
                  return c(n) && e(t);
                };
          },
          root: function (e, t, r) {
            var n = r.adapter;
            return function (t) {
              var r = n.getParent(t);
              return (null == r || !n.isTag(r)) && e(t);
            };
          },
          scope: function (e, t, n, i) {
            var s = n.equals;
            return i && 0 !== i.length
              ? 1 === i.length
                ? function (t) {
                    return s(i[0], t) && e(t);
                  }
                : function (t) {
                    return i.includes(t) && e(t);
                  }
              : r.filters.root(e, t, n);
          },
          hover: i("isHovered"),
          visited: i("isVisited"),
          active: i("isActive"),
        };
      },
      { boolbase: 5, "nth-check": 62 },
    ],
    29: [
      function (e, t, r) {
        "use strict";
        function n(e, t, r, n, u) {
          var l,
            h = t.name,
            T = t.data;
          if (Array.isArray(T)) {
            if (!(h in c.subselects))
              throw new Error(
                "Unknown pseudo-class :".concat(h, "(").concat(T, ")")
              );
            return c.subselects[h](e, T, r, n, u);
          }
          var d = null === (l = r.pseudos) || void 0 === l ? void 0 : l[h],
            E = "string" == typeof d ? d : o.aliases[h];
          if ("string" == typeof E) {
            if (null != T)
              throw new Error(
                "Pseudo ".concat(h, " doesn't have any arguments")
              );
            var p = (0, i.parse)(E);
            return c.subselects.is(e, p, r, n, u);
          }
          if ("function" == typeof d)
            return (
              (0, a.verifyPseudoArgs)(d, h, T, 1),
              function (t) {
                return d(t, T) && e(t);
              }
            );
          if (h in s.filters) return s.filters[h](e, T, r, n);
          if (h in a.pseudos) {
            var f = a.pseudos[h];
            return (
              (0, a.verifyPseudoArgs)(f, h, T, 2),
              function (t) {
                return f(t, r, T) && e(t);
              }
            );
          }
          throw new Error("Unknown pseudo-class :".concat(h));
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.compilePseudoSelector =
            r.aliases =
            r.pseudos =
            r.filters =
              void 0);
        var i = e("css-what"),
          s = e("./filters.js");
        Object.defineProperty(r, "filters", {
          enumerable: !0,
          get: function () {
            return s.filters;
          },
        });
        var a = e("./pseudos.js");
        Object.defineProperty(r, "pseudos", {
          enumerable: !0,
          get: function () {
            return a.pseudos;
          },
        });
        var o = e("./aliases.js");
        Object.defineProperty(r, "aliases", {
          enumerable: !0,
          get: function () {
            return o.aliases;
          },
        });
        var c = e("./subselects.js");
        r.compilePseudoSelector = n;
      },
      {
        "./aliases.js": 27,
        "./filters.js": 28,
        "./pseudos.js": 30,
        "./subselects.js": 31,
        "css-what": 33,
      },
    ],
    30: [
      function (e, t, r) {
        "use strict";
        function n(e, t, r, n) {
          if (null === r) {
            if (e.length > n)
              throw new Error(
                "Pseudo-class :".concat(t, " requires an argument")
              );
          } else if (e.length === n)
            throw new Error(
              "Pseudo-class :".concat(t, " doesn't have any arguments")
            );
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.verifyPseudoArgs = r.pseudos = void 0),
          (r.pseudos = {
            empty: function (e, t) {
              var r = t.adapter;
              return !r.getChildren(e).some(function (e) {
                return r.isTag(e) || "" !== r.getText(e);
              });
            },
            "first-child": function (e, t) {
              var r = t.adapter,
                n = t.equals;
              if (r.prevElementSibling) return null == r.prevElementSibling(e);
              var i = r.getSiblings(e).find(function (e) {
                return r.isTag(e);
              });
              return null != i && n(e, i);
            },
            "last-child": function (e, t) {
              for (
                var r = t.adapter,
                  n = t.equals,
                  i = r.getSiblings(e),
                  s = i.length - 1;
                s >= 0;
                s--
              ) {
                if (n(e, i[s])) return !0;
                if (r.isTag(i[s])) break;
              }
              return !1;
            },
            "first-of-type": function (e, t) {
              for (
                var r = t.adapter,
                  n = t.equals,
                  i = r.getSiblings(e),
                  s = r.getName(e),
                  a = 0;
                a < i.length;
                a++
              ) {
                var o = i[a];
                if (n(e, o)) return !0;
                if (r.isTag(o) && r.getName(o) === s) break;
              }
              return !1;
            },
            "last-of-type": function (e, t) {
              for (
                var r = t.adapter,
                  n = t.equals,
                  i = r.getSiblings(e),
                  s = r.getName(e),
                  a = i.length - 1;
                a >= 0;
                a--
              ) {
                var o = i[a];
                if (n(e, o)) return !0;
                if (r.isTag(o) && r.getName(o) === s) break;
              }
              return !1;
            },
            "only-of-type": function (e, t) {
              var r = t.adapter,
                n = t.equals,
                i = r.getName(e);
              return r.getSiblings(e).every(function (t) {
                return n(e, t) || !r.isTag(t) || r.getName(t) !== i;
              });
            },
            "only-child": function (e, t) {
              var r = t.adapter,
                n = t.equals;
              return r.getSiblings(e).every(function (t) {
                return n(e, t) || !r.isTag(t);
              });
            },
          }),
          (r.verifyPseudoArgs = n);
      },
      {},
    ],
    31: [
      function (e, t, r) {
        "use strict";
        function n(e, t) {
          return e === c.default.falseFunc
            ? c.default.falseFunc
            : function (r) {
                return t.isTag(r) && e(r);
              };
        }
        function i(e, t) {
          var r = t.getSiblings(e);
          if (r.length <= 1) return [];
          var n = r.indexOf(e);
          return n < 0 || n === r.length - 1
            ? []
            : r.slice(n + 1).filter(t.isTag);
        }
        function s(e) {
          return {
            xmlMode: !!e.xmlMode,
            lowerCaseAttributeNames: !!e.lowerCaseAttributeNames,
            lowerCaseTags: !!e.lowerCaseTags,
            quirksMode: !!e.quirksMode,
            cacheResults: !!e.cacheResults,
            pseudos: e.pseudos,
            adapter: e.adapter,
            equals: e.equals,
          };
        }
        var a =
            (this && this.__spreadArray) ||
            function (e, t, r) {
              if (r || 2 === arguments.length)
                for (var n, i = 0, s = t.length; i < s; i++)
                  (!n && i in t) ||
                    (n || (n = Array.prototype.slice.call(t, 0, i)),
                    (n[i] = t[i]));
              return e.concat(n || Array.prototype.slice.call(t));
            },
          o =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.subselects =
            r.getNextSiblings =
            r.ensureIsTag =
            r.PLACEHOLDER_ELEMENT =
              void 0);
        var c = o(e("boolbase")),
          u = e("../sort.js");
        (r.PLACEHOLDER_ELEMENT = {}),
          (r.ensureIsTag = n),
          (r.getNextSiblings = i);
        var l = function (e, t, r, n, i) {
          var a = i(t, s(r), n);
          return a === c.default.trueFunc
            ? e
            : a === c.default.falseFunc
            ? c.default.falseFunc
            : function (t) {
                return a(t) && e(t);
              };
        };
        r.subselects = {
          is: l,
          matches: l,
          where: l,
          not: function (e, t, r, n, i) {
            var a = i(t, s(r), n);
            return a === c.default.falseFunc
              ? e
              : a === c.default.trueFunc
              ? c.default.falseFunc
              : function (t) {
                  return !a(t) && e(t);
                };
          },
          has: function (e, t, o, l, h) {
            var T = o.adapter,
              d = s(o);
            d.relativeSelector = !0;
            var E = t.some(function (e) {
                return e.some(u.isTraversal);
              })
                ? [r.PLACEHOLDER_ELEMENT]
                : void 0,
              p = h(t, d, E);
            if (p === c.default.falseFunc) return c.default.falseFunc;
            var f = n(p, T);
            if (E && p !== c.default.trueFunc) {
              var _ = p.shouldTestNextSiblings,
                A = void 0 !== _ && _;
              return function (t) {
                if (!e(t)) return !1;
                E[0] = t;
                var r = T.getChildren(t),
                  n = A ? a(a([], r, !0), i(t, T), !0) : r;
                return T.existsOne(f, n);
              };
            }
            return function (t) {
              return e(t) && T.existsOne(f, T.getChildren(t));
            };
          },
        };
      },
      { "../sort.js": 32, boolbase: 5 },
    ],
    32: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          return !o.has(e.type);
        }
        function i(e) {
          for (var t = e.map(s), r = 1; r < e.length; r++) {
            var n = t[r];
            if (!(n < 0))
              for (var i = r - 1; i >= 0 && n < t[i]; i--) {
                var a = e[i + 1];
                (e[i + 1] = e[i]), (e[i] = a), (t[i + 1] = t[i]), (t[i] = n);
              }
          }
        }
        function s(e) {
          var t,
            r,
            n = null !== (t = o.get(e.type)) && void 0 !== t ? t : -1;
          return (
            e.type === a.SelectorType.Attribute
              ? ((n = null !== (r = c.get(e.action)) && void 0 !== r ? r : 4),
                e.action === a.AttributeAction.Equals &&
                  "id" === e.name &&
                  (n = 9),
                e.ignoreCase && (n >>= 1))
              : e.type === a.SelectorType.Pseudo &&
                (e.data
                  ? "has" === e.name || "contains" === e.name
                    ? (n = 0)
                    : Array.isArray(e.data)
                    ? ((n = Math.min.apply(
                        Math,
                        e.data.map(function (e) {
                          return Math.min.apply(Math, e.map(s));
                        })
                      )),
                      n < 0 && (n = 0))
                    : (n = 2)
                  : (n = 3)),
            n
          );
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.isTraversal = void 0);
        var a = e("css-what"),
          o = new Map([
            [a.SelectorType.Universal, 50],
            [a.SelectorType.Tag, 30],
            [a.SelectorType.Attribute, 1],
            [a.SelectorType.Pseudo, 0],
          ]);
        r.isTraversal = n;
        var c = new Map([
          [a.AttributeAction.Exists, 10],
          [a.AttributeAction.Equals, 8],
          [a.AttributeAction.Not, 7],
          [a.AttributeAction.Start, 6],
          [a.AttributeAction.End, 6],
          [a.AttributeAction.Any, 5],
        ]);
        r.default = i;
      },
      { "css-what": 33 },
    ],
    33: [
      function (e, t, r) {
        "use strict";
        var n =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, r, n) {
                  void 0 === n && (n = r);
                  var i = Object.getOwnPropertyDescriptor(t, r);
                  (i &&
                    ("get" in i
                      ? t.__esModule
                      : !i.writable && !i.configurable)) ||
                    (i = {
                      enumerable: !0,
                      get: function () {
                        return t[r];
                      },
                    }),
                    Object.defineProperty(e, n, i);
                }
              : function (e, t, r, n) {
                  void 0 === n && (n = r), (e[n] = t[r]);
                }),
          i =
            (this && this.__exportStar) ||
            function (e, t) {
              for (var r in e)
                "default" === r ||
                  Object.prototype.hasOwnProperty.call(t, r) ||
                  n(t, e, r);
            };
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.stringify = r.parse = r.isTraversal = void 0),
          i(e("./types"), r);
        var s = e("./parse");
        Object.defineProperty(r, "isTraversal", {
          enumerable: !0,
          get: function () {
            return s.isTraversal;
          },
        }),
          Object.defineProperty(r, "parse", {
            enumerable: !0,
            get: function () {
              return s.parse;
            },
          });
        var a = e("./stringify");
        Object.defineProperty(r, "stringify", {
          enumerable: !0,
          get: function () {
            return a.stringify;
          },
        });
      },
      { "./parse": 34, "./stringify": 35, "./types": 36 },
    ],
    34: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          switch (e.type) {
            case l.SelectorType.Adjacent:
            case l.SelectorType.Child:
            case l.SelectorType.Descendant:
            case l.SelectorType.Parent:
            case l.SelectorType.Sibling:
            case l.SelectorType.ColumnCombinator:
              return !0;
            default:
              return !1;
          }
        }
        function i(e, t, r) {
          var n = parseInt(t, 16) - 65536;
          return n != n || r
            ? t
            : n < 0
            ? String.fromCharCode(n + 65536)
            : String.fromCharCode((n >> 10) | 55296, (1023 & n) | 56320);
        }
        function s(e) {
          return e.replace(T, i);
        }
        function a(e) {
          return 39 === e || 34 === e;
        }
        function o(e) {
          return 32 === e || 9 === e || 10 === e || 12 === e || 13 === e;
        }
        function c(e) {
          var t = [],
            r = u(t, "".concat(e), 0);
          if (r < e.length)
            throw new Error("Unmatched selector: ".concat(e.slice(r)));
          return t;
        }
        function u(e, t, r) {
          function i(e) {
            var n = t.slice(r + e).match(h);
            if (!n) throw new Error("Expected name, found ".concat(t.slice(r)));
            var i = n[0];
            return (r += e + i.length), s(i);
          }
          function c(e) {
            for (r += e; r < t.length && o(t.charCodeAt(r)); ) r++;
          }
          function T() {
            r += 1;
            for (var e = r, n = 1; n > 0 && r < t.length; r++)
              40 !== t.charCodeAt(r) || f(r)
                ? 41 !== t.charCodeAt(r) || f(r) || n--
                : n++;
            if (n) throw new Error("Parenthesis not matched");
            return s(t.slice(e, r - 1));
          }
          function f(e) {
            for (var r = 0; 92 === t.charCodeAt(--e); ) r++;
            return 1 == (1 & r);
          }
          function _() {
            if (D.length > 0 && n(D[D.length - 1]))
              throw new Error("Did not expect successive traversals.");
          }
          function A(e) {
            D.length > 0 && D[D.length - 1].type === l.SelectorType.Descendant
              ? (D[D.length - 1].type = e)
              : (_(), D.push({ type: e }));
          }
          function m(e, t) {
            D.push({
              type: l.SelectorType.Attribute,
              name: e,
              action: t,
              value: i(1),
              namespace: null,
              ignoreCase: "quirks",
            });
          }
          function I() {
            if (
              (D.length &&
                D[D.length - 1].type === l.SelectorType.Descendant &&
                D.pop(),
              0 === D.length)
            )
              throw new Error("Empty sub-selector");
            e.push(D);
          }
          var D = [];
          if ((c(0), t.length === r)) return r;
          e: for (; r < t.length; ) {
            var g = t.charCodeAt(r);
            switch (g) {
              case 32:
              case 9:
              case 10:
              case 12:
              case 13:
                (0 !== D.length && D[0].type === l.SelectorType.Descendant) ||
                  (_(), D.push({ type: l.SelectorType.Descendant })),
                  c(1);
                break;
              case 62:
                A(l.SelectorType.Child), c(1);
                break;
              case 60:
                A(l.SelectorType.Parent), c(1);
                break;
              case 126:
                A(l.SelectorType.Sibling), c(1);
                break;
              case 43:
                A(l.SelectorType.Adjacent), c(1);
                break;
              case 46:
                m("class", l.AttributeAction.Element);
                break;
              case 35:
                m("id", l.AttributeAction.Equals);
                break;
              case 91:
                c(1);
                var N = void 0,
                  C = null;
                124 === t.charCodeAt(r)
                  ? (N = i(1))
                  : t.startsWith("*|", r)
                  ? ((C = "*"), (N = i(2)))
                  : ((N = i(0)),
                    124 === t.charCodeAt(r) &&
                      61 !== t.charCodeAt(r + 1) &&
                      ((C = N), (N = i(1)))),
                  c(0);
                var S = l.AttributeAction.Exists,
                  O = d.get(t.charCodeAt(r));
                if (O) {
                  if (((S = O), 61 !== t.charCodeAt(r + 1)))
                    throw new Error("Expected `=`");
                  c(2);
                } else
                  61 === t.charCodeAt(r) &&
                    ((S = l.AttributeAction.Equals), c(1));
                var b = "",
                  R = null;
                if ("exists" !== S) {
                  if (a(t.charCodeAt(r))) {
                    for (
                      var y = t.charCodeAt(r), P = r + 1;
                      P < t.length && (t.charCodeAt(P) !== y || f(P));

                    )
                      P += 1;
                    if (t.charCodeAt(P) !== y)
                      throw new Error("Attribute value didn't end");
                    (b = s(t.slice(r + 1, P))), (r = P + 1);
                  } else {
                    for (
                      var v = r;
                      r < t.length &&
                      ((!o(t.charCodeAt(r)) && 93 !== t.charCodeAt(r)) || f(r));

                    )
                      r += 1;
                    b = s(t.slice(v, r));
                  }
                  c(0);
                  var L = 32 | t.charCodeAt(r);
                  115 === L ? ((R = !1), c(1)) : 105 === L && ((R = !0), c(1));
                }
                if (93 !== t.charCodeAt(r))
                  throw new Error("Attribute selector didn't terminate");
                r += 1;
                var M = {
                  type: l.SelectorType.Attribute,
                  name: N,
                  action: S,
                  value: b,
                  namespace: C,
                  ignoreCase: R,
                };
                D.push(M);
                break;
              case 58:
                if (58 === t.charCodeAt(r + 1)) {
                  D.push({
                    type: l.SelectorType.PseudoElement,
                    name: i(2).toLowerCase(),
                    data: 40 === t.charCodeAt(r) ? T() : null,
                  });
                  continue;
                }
                var k = i(1).toLowerCase(),
                  G = null;
                if (40 === t.charCodeAt(r))
                  if (E.has(k)) {
                    if (a(t.charCodeAt(r + 1)))
                      throw new Error(
                        "Pseudo-selector ".concat(k, " cannot be quoted")
                      );
                    if (
                      ((G = []), (r = u(G, t, r + 1)), 41 !== t.charCodeAt(r))
                    )
                      throw new Error(
                        "Missing closing parenthesis in :"
                          .concat(k, " (")
                          .concat(t, ")")
                      );
                    r += 1;
                  } else {
                    if (((G = T()), p.has(k))) {
                      var B = G.charCodeAt(0);
                      B === G.charCodeAt(G.length - 1) &&
                        a(B) &&
                        (G = G.slice(1, -1));
                    }
                    G = s(G);
                  }
                D.push({ type: l.SelectorType.Pseudo, name: k, data: G });
                break;
              case 44:
                I(), (D = []), c(1);
                break;
              default:
                if (t.startsWith("/*", r)) {
                  var w = t.indexOf("*/", r + 2);
                  if (w < 0) throw new Error("Comment was not terminated");
                  (r = w + 2), 0 === D.length && c(0);
                  break;
                }
                C = null;
                var x = void 0;
                if (42 === g) (r += 1), (x = "*");
                else if (124 === g) {
                  if (((x = ""), 124 === t.charCodeAt(r + 1))) {
                    A(l.SelectorType.ColumnCombinator), c(2);
                    break;
                  }
                } else {
                  if (!h.test(t.slice(r))) break e;
                  x = i(0);
                }
                124 === t.charCodeAt(r) &&
                  124 !== t.charCodeAt(r + 1) &&
                  ((C = x),
                  42 === t.charCodeAt(r + 1)
                    ? ((x = "*"), (r += 2))
                    : (x = i(1))),
                  D.push(
                    "*" === x
                      ? { type: l.SelectorType.Universal, namespace: C }
                      : { type: l.SelectorType.Tag, name: x, namespace: C }
                  );
            }
          }
          return I(), r;
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.parse = r.isTraversal = void 0);
        var l = e("./types"),
          h = /^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/,
          T = /\\([\da-f]{1,6}\s?|(\s)|.)/gi,
          d = new Map([
            [126, l.AttributeAction.Element],
            [94, l.AttributeAction.Start],
            [36, l.AttributeAction.End],
            [42, l.AttributeAction.Any],
            [33, l.AttributeAction.Not],
            [124, l.AttributeAction.Hyphen],
          ]),
          E = new Set([
            "has",
            "not",
            "matches",
            "is",
            "where",
            "host",
            "host-context",
          ]);
        r.isTraversal = n;
        var p = new Set(["contains", "icontains"]);
        r.parse = c;
      },
      { "./types": 36 },
    ],
    35: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          return e
            .map(function (e) {
              return e.map(i).join("");
            })
            .join(", ");
        }
        function i(e, t, r) {
          switch (e.type) {
            case l.SelectorType.Child:
              return 0 === t ? "> " : " > ";
            case l.SelectorType.Parent:
              return 0 === t ? "< " : " < ";
            case l.SelectorType.Sibling:
              return 0 === t ? "~ " : " ~ ";
            case l.SelectorType.Adjacent:
              return 0 === t ? "+ " : " + ";
            case l.SelectorType.Descendant:
              return " ";
            case l.SelectorType.ColumnCombinator:
              return 0 === t ? "|| " : " || ";
            case l.SelectorType.Universal:
              return "*" === e.namespace &&
                t + 1 < r.length &&
                "name" in r[t + 1]
                ? ""
                : "".concat(o(e.namespace), "*");
            case l.SelectorType.Tag:
              return a(e);
            case l.SelectorType.PseudoElement:
              return "::"
                .concat(c(e.name, p))
                .concat(null === e.data ? "" : "(".concat(c(e.data, E), ")"));
            case l.SelectorType.Pseudo:
              return ":"
                .concat(c(e.name, p))
                .concat(
                  null === e.data
                    ? ""
                    : "(".concat(
                        "string" == typeof e.data ? c(e.data, E) : n(e.data),
                        ")"
                      )
                );
            case l.SelectorType.Attribute:
              if (
                "id" === e.name &&
                e.action === l.AttributeAction.Equals &&
                "quirks" === e.ignoreCase &&
                !e.namespace
              )
                return "#".concat(c(e.value, p));
              if (
                "class" === e.name &&
                e.action === l.AttributeAction.Element &&
                "quirks" === e.ignoreCase &&
                !e.namespace
              )
                return ".".concat(c(e.value, p));
              var i = a(e);
              return e.action === l.AttributeAction.Exists
                ? "[".concat(i, "]")
                : "["
                    .concat(i)
                    .concat(s(e.action), '="')
                    .concat(c(e.value, d), '"')
                    .concat(
                      null === e.ignoreCase ? "" : e.ignoreCase ? " i" : " s",
                      "]"
                    );
          }
        }
        function s(e) {
          switch (e) {
            case l.AttributeAction.Equals:
              return "";
            case l.AttributeAction.Element:
              return "~";
            case l.AttributeAction.Start:
              return "^";
            case l.AttributeAction.End:
              return "$";
            case l.AttributeAction.Any:
              return "*";
            case l.AttributeAction.Not:
              return "!";
            case l.AttributeAction.Hyphen:
              return "|";
            case l.AttributeAction.Exists:
              throw new Error("Shouldn't be here");
          }
        }
        function a(e) {
          return "".concat(o(e.namespace)).concat(c(e.name, p));
        }
        function o(e) {
          return null !== e ? "".concat("*" === e ? "*" : c(e, p), "|") : "";
        }
        function c(e, t) {
          for (var r = 0, n = "", i = 0; i < e.length; i++)
            t.has(e.charCodeAt(i)) &&
              ((n += "".concat(e.slice(r, i), "\\").concat(e.charAt(i))),
              (r = i + 1));
          return n.length > 0 ? n + e.slice(r) : e;
        }
        var u =
          (this && this.__spreadArray) ||
          function (e, t, r) {
            if (r || 2 === arguments.length)
              for (var n, i = 0, s = t.length; i < s; i++)
                (!n && i in t) ||
                  (n || (n = Array.prototype.slice.call(t, 0, i)),
                  (n[i] = t[i]));
            return e.concat(n || Array.prototype.slice.call(t));
          };
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.stringify = void 0);
        var l = e("./types"),
          h = ["\\", '"'],
          T = u(u([], h, !0), ["(", ")"], !1),
          d = new Set(
            h.map(function (e) {
              return e.charCodeAt(0);
            })
          ),
          E = new Set(
            T.map(function (e) {
              return e.charCodeAt(0);
            })
          ),
          p = new Set(
            u(
              u([], T, !0),
              ["~", "^", "$", "*", "+", "!", "|", ":", "[", "]", " ", "."],
              !1
            ).map(function (e) {
              return e.charCodeAt(0);
            })
          );
        r.stringify = n;
      },
      { "./types": 36 },
    ],
    36: [
      function (e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.AttributeAction = r.IgnoreCaseMode = r.SelectorType = void 0),
          (function (e) {
            (e.Attribute = "attribute"),
              (e.Pseudo = "pseudo"),
              (e.PseudoElement = "pseudo-element"),
              (e.Tag = "tag"),
              (e.Universal = "universal"),
              (e.Adjacent = "adjacent"),
              (e.Child = "child"),
              (e.Descendant = "descendant"),
              (e.Parent = "parent"),
              (e.Sibling = "sibling"),
              (e.ColumnCombinator = "column-combinator");
          })(r.SelectorType || (r.SelectorType = {})),
          (r.IgnoreCaseMode = {
            Unknown: null,
            QuirksMode: "quirks",
            IgnoreCase: !0,
            CaseSensitive: !1,
          }),
          (function (e) {
            (e.Any = "any"),
              (e.Element = "element"),
              (e.End = "end"),
              (e.Equals = "equals"),
              (e.Exists = "exists"),
              (e.Hyphen = "hyphen"),
              (e.Not = "not"),
              (e.Start = "start");
          })(r.AttributeAction || (r.AttributeAction = {}));
      },
      {},
    ],
    37: [
      function (e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.attributeNames = r.elementNames = void 0),
          (r.elementNames = new Map(
            [
              "altGlyph",
              "altGlyphDef",
              "altGlyphItem",
              "animateColor",
              "animateMotion",
              "animateTransform",
              "clipPath",
              "feBlend",
              "feColorMatrix",
              "feComponentTransfer",
              "feComposite",
              "feConvolveMatrix",
              "feDiffuseLighting",
              "feDisplacementMap",
              "feDistantLight",
              "feDropShadow",
              "feFlood",
              "feFuncA",
              "feFuncB",
              "feFuncG",
              "feFuncR",
              "feGaussianBlur",
              "feImage",
              "feMerge",
              "feMergeNode",
              "feMorphology",
              "feOffset",
              "fePointLight",
              "feSpecularLighting",
              "feSpotLight",
              "feTile",
              "feTurbulence",
              "foreignObject",
              "glyphRef",
              "linearGradient",
              "radialGradient",
              "textPath",
            ].map(function (e) {
              return [e.toLowerCase(), e];
            })
          )),
          (r.attributeNames = new Map(
            [
              "definitionURL",
              "attributeName",
              "attributeType",
              "baseFrequency",
              "baseProfile",
              "calcMode",
              "clipPathUnits",
              "diffuseConstant",
              "edgeMode",
              "filterUnits",
              "glyphRef",
              "gradientTransform",
              "gradientUnits",
              "kernelMatrix",
              "kernelUnitLength",
              "keyPoints",
              "keySplines",
              "keyTimes",
              "lengthAdjust",
              "limitingConeAngle",
              "markerHeight",
              "markerUnits",
              "markerWidth",
              "maskContentUnits",
              "maskUnits",
              "numOctaves",
              "pathLength",
              "patternContentUnits",
              "patternTransform",
              "patternUnits",
              "pointsAtX",
              "pointsAtY",
              "pointsAtZ",
              "preserveAlpha",
              "preserveAspectRatio",
              "primitiveUnits",
              "refX",
              "refY",
              "repeatCount",
              "repeatDur",
              "requiredExtensions",
              "requiredFeatures",
              "specularConstant",
              "specularExponent",
              "spreadMethod",
              "startOffset",
              "stdDeviation",
              "stitchTiles",
              "surfaceScale",
              "systemLanguage",
              "tableValues",
              "targetX",
              "targetY",
              "textLength",
              "viewBox",
              "viewTarget",
              "xChannelSelector",
              "yChannelSelector",
              "zoomAndPan",
            ].map(function (e) {
              return [e.toLowerCase(), e];
            })
          ));
      },
      {},
    ],
    38: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          return e.replace(/"/g, "&quot;");
        }
        function i(e, t) {
          var r;
          if (e) {
            var i =
              !1 ===
              (null !== (r = t.encodeEntities) && void 0 !== r
                ? r
                : t.decodeEntities)
                ? n
                : t.xmlMode || "utf8" !== t.encodeEntities
                ? _.encodeXML
                : _.escapeAttribute;
            return Object.keys(e)
              .map(function (r) {
                var n,
                  s,
                  a = null !== (n = e[r]) && void 0 !== n ? n : "";
                return (
                  "foreign" === t.xmlMode &&
                    (r =
                      null !== (s = A.attributeNames.get(r)) && void 0 !== s
                        ? s
                        : r),
                  t.emptyAttrs || t.xmlMode || "" !== a
                    ? "".concat(r, '="').concat(i(a), '"')
                    : r
                );
              })
              .join(" ");
          }
        }
        function s(e, t) {
          void 0 === t && (t = {});
          for (
            var r = ("length" in e) ? e : [e], n = "", i = 0;
            i < r.length;
            i++
          )
            n += a(r[i], t);
          return n;
        }
        function a(e, t) {
          switch (e.type) {
            case f.Root:
              return s(e.children, t);
            case f.Doctype:
            case f.Directive:
              return c(e);
            case f.Comment:
              return h(e);
            case f.CDATA:
              return l(e);
            case f.Script:
            case f.Style:
            case f.Tag:
              return o(e, t);
            case f.Text:
              return u(e, t);
          }
        }
        function o(e, t) {
          var r;
          "foreign" === t.xmlMode &&
            ((e.name =
              null !== (r = A.elementNames.get(e.name)) && void 0 !== r
                ? r
                : e.name),
            e.parent &&
              D.has(e.parent.name) &&
              (t = T(T({}, t), { xmlMode: !1 }))),
            !t.xmlMode &&
              g.has(e.name) &&
              (t = T(T({}, t), { xmlMode: "foreign" }));
          var n = "<".concat(e.name),
            a = i(e.attribs, t);
          return (
            a && (n += " ".concat(a)),
            0 === e.children.length &&
            (t.xmlMode
              ? !1 !== t.selfClosingTags
              : t.selfClosingTags && I.has(e.name))
              ? (t.xmlMode || (n += " "), (n += "/>"))
              : ((n += ">"),
                e.children.length > 0 && (n += s(e.children, t)),
                (!t.xmlMode && I.has(e.name)) ||
                  (n += "</".concat(e.name, ">"))),
            n
          );
        }
        function c(e) {
          return "<".concat(e.data, ">");
        }
        function u(e, t) {
          var r,
            n = e.data || "";
          return (
            !1 ===
              (null !== (r = t.encodeEntities) && void 0 !== r
                ? r
                : t.decodeEntities) ||
              (!t.xmlMode && e.parent && m.has(e.parent.name)) ||
              (n =
                t.xmlMode || "utf8" !== t.encodeEntities
                  ? (0, _.encodeXML)(n)
                  : (0, _.escapeText)(n)),
            n
          );
        }
        function l(e) {
          return "<![CDATA[".concat(e.children[0].data, "]]>");
        }
        function h(e) {
          return "<!--".concat(e.data, "-->");
        }
        var T =
            (this && this.__assign) ||
            function () {
              return (
                (T =
                  Object.assign ||
                  function (e) {
                    for (var t, r = 1, n = arguments.length; r < n; r++)
                      for (var i in ((t = arguments[r]), t))
                        Object.prototype.hasOwnProperty.call(t, i) &&
                          (e[i] = t[i]);
                    return e;
                  }),
                T.apply(this, arguments)
              );
            },
          d =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, r, n) {
                  void 0 === n && (n = r);
                  var i = Object.getOwnPropertyDescriptor(t, r);
                  (i &&
                    ("get" in i
                      ? t.__esModule
                      : !i.writable && !i.configurable)) ||
                    (i = {
                      enumerable: !0,
                      get: function () {
                        return t[r];
                      },
                    }),
                    Object.defineProperty(e, n, i);
                }
              : function (e, t, r, n) {
                  void 0 === n && (n = r), (e[n] = t[r]);
                }),
          E =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, t) {
                  Object.defineProperty(e, "default", {
                    enumerable: !0,
                    value: t,
                  });
                }
              : function (e, t) {
                  e.default = t;
                }),
          p =
            (this && this.__importStar) ||
            function (e) {
              if (e && e.__esModule) return e;
              var t = {};
              if (null != e)
                for (var r in e)
                  "default" !== r &&
                    Object.prototype.hasOwnProperty.call(e, r) &&
                    d(t, e, r);
              return E(t, e), t;
            };
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.render = void 0);
        var f = p(e("domelementtype")),
          _ = e("entities"),
          A = e("./foreignNames.js"),
          m = new Set([
            "style",
            "script",
            "xmp",
            "iframe",
            "noembed",
            "noframes",
            "plaintext",
            "noscript",
          ]),
          I = new Set([
            "area",
            "base",
            "basefont",
            "br",
            "col",
            "command",
            "embed",
            "frame",
            "hr",
            "img",
            "input",
            "isindex",
            "keygen",
            "link",
            "meta",
            "param",
            "source",
            "track",
            "wbr",
          ]);
        (r.render = s), (r.default = s);
        var D = new Set([
            "mi",
            "mo",
            "mn",
            "ms",
            "mtext",
            "annotation-xml",
            "foreignObject",
            "desc",
            "title",
          ]),
          g = new Set(["svg", "math"]);
      },
      { "./foreignNames.js": 37, domelementtype: 39, entities: 57 },
    ],
    39: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          return e.type === i.Tag || e.type === i.Script || e.type === i.Style;
        }
        var i;
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.Doctype =
            r.CDATA =
            r.Tag =
            r.Style =
            r.Script =
            r.Comment =
            r.Directive =
            r.Text =
            r.Root =
            r.isTag =
            r.ElementType =
              void 0),
          (function (e) {
            (e.Root = "root"),
              (e.Text = "text"),
              (e.Directive = "directive"),
              (e.Comment = "comment"),
              (e.Script = "script"),
              (e.Style = "style"),
              (e.Tag = "tag"),
              (e.CDATA = "cdata"),
              (e.Doctype = "doctype");
          })((i = r.ElementType || (r.ElementType = {}))),
          (r.isTag = n),
          (r.Root = i.Root),
          (r.Text = i.Text),
          (r.Directive = i.Directive),
          (r.Comment = i.Comment),
          (r.Script = i.Script),
          (r.Style = i.Style),
          (r.Tag = i.Tag),
          (r.CDATA = i.CDATA),
          (r.Doctype = i.Doctype);
      },
      {},
    ],
    40: [
      function (e, t, r) {
        "use strict";
        var n =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, r, n) {
                  void 0 === n && (n = r);
                  var i = Object.getOwnPropertyDescriptor(t, r);
                  (i &&
                    ("get" in i
                      ? t.__esModule
                      : !i.writable && !i.configurable)) ||
                    (i = {
                      enumerable: !0,
                      get: function () {
                        return t[r];
                      },
                    }),
                    Object.defineProperty(e, n, i);
                }
              : function (e, t, r, n) {
                  void 0 === n && (n = r), (e[n] = t[r]);
                }),
          i =
            (this && this.__exportStar) ||
            function (e, t) {
              for (var r in e)
                "default" === r ||
                  Object.prototype.hasOwnProperty.call(t, r) ||
                  n(t, e, r);
            };
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.DomHandler = void 0);
        var s = e("domelementtype"),
          a = e("./node.js");
        i(e("./node.js"), r);
        var o = { withStartIndices: !1, withEndIndices: !1, xmlMode: !1 },
          c = (function () {
            function e(e, t, r) {
              (this.dom = []),
                (this.root = new a.Document(this.dom)),
                (this.done = !1),
                (this.tagStack = [this.root]),
                (this.lastNode = null),
                (this.parser = null),
                "function" == typeof t && ((r = t), (t = o)),
                "object" == typeof e && ((t = e), (e = void 0)),
                (this.callback = null != e ? e : null),
                (this.options = null != t ? t : o),
                (this.elementCB = null != r ? r : null);
            }
            return (
              (e.prototype.onparserinit = function (e) {
                this.parser = e;
              }),
              (e.prototype.onreset = function () {
                (this.dom = []),
                  (this.root = new a.Document(this.dom)),
                  (this.done = !1),
                  (this.tagStack = [this.root]),
                  (this.lastNode = null),
                  (this.parser = null);
              }),
              (e.prototype.onend = function () {
                this.done ||
                  ((this.done = !0),
                  (this.parser = null),
                  this.handleCallback(null));
              }),
              (e.prototype.onerror = function (e) {
                this.handleCallback(e);
              }),
              (e.prototype.onclosetag = function () {
                this.lastNode = null;
                var e = this.tagStack.pop();
                this.options.withEndIndices &&
                  (e.endIndex = this.parser.endIndex),
                  this.elementCB && this.elementCB(e);
              }),
              (e.prototype.onopentag = function (e, t) {
                var r = this.options.xmlMode ? s.ElementType.Tag : void 0,
                  n = new a.Element(e, t, void 0, r);
                this.addNode(n), this.tagStack.push(n);
              }),
              (e.prototype.ontext = function (e) {
                var t = this.lastNode;
                if (t && t.type === s.ElementType.Text)
                  (t.data += e),
                    this.options.withEndIndices &&
                      (t.endIndex = this.parser.endIndex);
                else {
                  var r = new a.Text(e);
                  this.addNode(r), (this.lastNode = r);
                }
              }),
              (e.prototype.oncomment = function (e) {
                if (
                  this.lastNode &&
                  this.lastNode.type === s.ElementType.Comment
                )
                  this.lastNode.data += e;
                else {
                  var t = new a.Comment(e);
                  this.addNode(t), (this.lastNode = t);
                }
              }),
              (e.prototype.oncommentend = function () {
                this.lastNode = null;
              }),
              (e.prototype.oncdatastart = function () {
                var e = new a.Text(""),
                  t = new a.CDATA([e]);
                this.addNode(t), (e.parent = t), (this.lastNode = e);
              }),
              (e.prototype.oncdataend = function () {
                this.lastNode = null;
              }),
              (e.prototype.onprocessinginstruction = function (e, t) {
                var r = new a.ProcessingInstruction(e, t);
                this.addNode(r);
              }),
              (e.prototype.handleCallback = function (e) {
                if ("function" == typeof this.callback)
                  this.callback(e, this.dom);
                else if (e) throw e;
              }),
              (e.prototype.addNode = function (e) {
                var t = this.tagStack[this.tagStack.length - 1],
                  r = t.children[t.children.length - 1];
                this.options.withStartIndices &&
                  (e.startIndex = this.parser.startIndex),
                  this.options.withEndIndices &&
                    (e.endIndex = this.parser.endIndex),
                  t.children.push(e),
                  r && ((e.prev = r), (r.next = e)),
                  (e.parent = t),
                  (this.lastNode = null);
              }),
              e
            );
          })();
        (r.DomHandler = c), (r.default = c);
      },
      { "./node.js": 41, domelementtype: 39 },
    ],
    41: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          return (0, p.isTag)(e);
        }
        function i(e) {
          return e.type === p.ElementType.CDATA;
        }
        function s(e) {
          return e.type === p.ElementType.Text;
        }
        function a(e) {
          return e.type === p.ElementType.Comment;
        }
        function o(e) {
          return e.type === p.ElementType.Directive;
        }
        function c(e) {
          return e.type === p.ElementType.Root;
        }
        function u(e) {
          return Object.prototype.hasOwnProperty.call(e, "children");
        }
        function l(e, t) {
          var r;
          if ((void 0 === t && (t = !1), s(e))) r = new A(e.data);
          else if (a(e)) r = new m(e.data);
          else if (n(e)) {
            var u = t ? h(e.children) : [],
              l = new C(e.name, E({}, e.attribs), u);
            u.forEach(function (e) {
              return (e.parent = l);
            }),
              null != e.namespace && (l.namespace = e.namespace),
              e["x-attribsNamespace"] &&
                (l["x-attribsNamespace"] = E({}, e["x-attribsNamespace"])),
              e["x-attribsPrefix"] &&
                (l["x-attribsPrefix"] = E({}, e["x-attribsPrefix"])),
              (r = l);
          } else if (i(e)) {
            u = t ? h(e.children) : [];
            var T = new g(u);
            u.forEach(function (e) {
              return (e.parent = T);
            }),
              (r = T);
          } else if (c(e)) {
            u = t ? h(e.children) : [];
            var d = new N(u);
            u.forEach(function (e) {
              return (e.parent = d);
            }),
              e["x-mode"] && (d["x-mode"] = e["x-mode"]),
              (r = d);
          } else {
            if (!o(e)) throw new Error("Not implemented yet: ".concat(e.type));
            var p = new I(e.name, e.data);
            null != e["x-name"] &&
              ((p["x-name"] = e["x-name"]),
              (p["x-publicId"] = e["x-publicId"]),
              (p["x-systemId"] = e["x-systemId"])),
              (r = p);
          }
          return (
            (r.startIndex = e.startIndex),
            (r.endIndex = e.endIndex),
            null != e.sourceCodeLocation &&
              (r.sourceCodeLocation = e.sourceCodeLocation),
            r
          );
        }
        function h(e) {
          for (
            var t = e.map(function (e) {
                return l(e, !0);
              }),
              r = 1;
            r < t.length;
            r++
          )
            (t[r].prev = t[r - 1]), (t[r - 1].next = t[r]);
          return t;
        }
        var T,
          d =
            (this && this.__extends) ||
            ((T = function (e, t) {
              return (
                (T =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (e, t) {
                      e.__proto__ = t;
                    }) ||
                  function (e, t) {
                    for (var r in t)
                      Object.prototype.hasOwnProperty.call(t, r) &&
                        (e[r] = t[r]);
                  }),
                T(e, t)
              );
            }),
            function (e, t) {
              function r() {
                this.constructor = e;
              }
              if ("function" != typeof t && null !== t)
                throw new TypeError(
                  "Class extends value " +
                    String(t) +
                    " is not a constructor or null"
                );
              T(e, t),
                (e.prototype =
                  null === t
                    ? Object.create(t)
                    : ((r.prototype = t.prototype), new r()));
            }),
          E =
            (this && this.__assign) ||
            function () {
              return (
                (E =
                  Object.assign ||
                  function (e) {
                    for (var t, r = 1, n = arguments.length; r < n; r++)
                      for (var i in ((t = arguments[r]), t))
                        Object.prototype.hasOwnProperty.call(t, i) &&
                          (e[i] = t[i]);
                    return e;
                  }),
                E.apply(this, arguments)
              );
            };
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.cloneNode =
            r.hasChildren =
            r.isDocument =
            r.isDirective =
            r.isComment =
            r.isText =
            r.isCDATA =
            r.isTag =
            r.Element =
            r.Document =
            r.CDATA =
            r.NodeWithChildren =
            r.ProcessingInstruction =
            r.Comment =
            r.Text =
            r.DataNode =
            r.Node =
              void 0);
        var p = e("domelementtype"),
          f = (function () {
            function e() {
              (this.parent = null),
                (this.prev = null),
                (this.next = null),
                (this.startIndex = null),
                (this.endIndex = null);
            }
            return (
              Object.defineProperty(e.prototype, "parentNode", {
                get: function () {
                  return this.parent;
                },
                set: function (e) {
                  this.parent = e;
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(e.prototype, "previousSibling", {
                get: function () {
                  return this.prev;
                },
                set: function (e) {
                  this.prev = e;
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(e.prototype, "nextSibling", {
                get: function () {
                  return this.next;
                },
                set: function (e) {
                  this.next = e;
                },
                enumerable: !1,
                configurable: !0,
              }),
              (e.prototype.cloneNode = function (e) {
                return void 0 === e && (e = !1), l(this, e);
              }),
              e
            );
          })();
        r.Node = f;
        var _ = (function (e) {
          function t(t) {
            var r = e.call(this) || this;
            return (r.data = t), r;
          }
          return (
            d(t, e),
            Object.defineProperty(t.prototype, "nodeValue", {
              get: function () {
                return this.data;
              },
              set: function (e) {
                this.data = e;
              },
              enumerable: !1,
              configurable: !0,
            }),
            t
          );
        })(f);
        r.DataNode = _;
        var A = (function (e) {
          function t() {
            var t = (null !== e && e.apply(this, arguments)) || this;
            return (t.type = p.ElementType.Text), t;
          }
          return (
            d(t, e),
            Object.defineProperty(t.prototype, "nodeType", {
              get: function () {
                return 3;
              },
              enumerable: !1,
              configurable: !0,
            }),
            t
          );
        })(_);
        r.Text = A;
        var m = (function (e) {
          function t() {
            var t = (null !== e && e.apply(this, arguments)) || this;
            return (t.type = p.ElementType.Comment), t;
          }
          return (
            d(t, e),
            Object.defineProperty(t.prototype, "nodeType", {
              get: function () {
                return 8;
              },
              enumerable: !1,
              configurable: !0,
            }),
            t
          );
        })(_);
        r.Comment = m;
        var I = (function (e) {
          function t(t, r) {
            var n = e.call(this, r) || this;
            return (n.name = t), (n.type = p.ElementType.Directive), n;
          }
          return (
            d(t, e),
            Object.defineProperty(t.prototype, "nodeType", {
              get: function () {
                return 1;
              },
              enumerable: !1,
              configurable: !0,
            }),
            t
          );
        })(_);
        r.ProcessingInstruction = I;
        var D = (function (e) {
          function t(t) {
            var r = e.call(this) || this;
            return (r.children = t), r;
          }
          return (
            d(t, e),
            Object.defineProperty(t.prototype, "firstChild", {
              get: function () {
                var e;
                return null !== (e = this.children[0]) && void 0 !== e
                  ? e
                  : null;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "lastChild", {
              get: function () {
                return this.children.length > 0
                  ? this.children[this.children.length - 1]
                  : null;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "childNodes", {
              get: function () {
                return this.children;
              },
              set: function (e) {
                this.children = e;
              },
              enumerable: !1,
              configurable: !0,
            }),
            t
          );
        })(f);
        r.NodeWithChildren = D;
        var g = (function (e) {
          function t() {
            var t = (null !== e && e.apply(this, arguments)) || this;
            return (t.type = p.ElementType.CDATA), t;
          }
          return (
            d(t, e),
            Object.defineProperty(t.prototype, "nodeType", {
              get: function () {
                return 4;
              },
              enumerable: !1,
              configurable: !0,
            }),
            t
          );
        })(D);
        r.CDATA = g;
        var N = (function (e) {
          function t() {
            var t = (null !== e && e.apply(this, arguments)) || this;
            return (t.type = p.ElementType.Root), t;
          }
          return (
            d(t, e),
            Object.defineProperty(t.prototype, "nodeType", {
              get: function () {
                return 9;
              },
              enumerable: !1,
              configurable: !0,
            }),
            t
          );
        })(D);
        r.Document = N;
        var C = (function (e) {
          function t(t, r, n, i) {
            void 0 === n && (n = []),
              void 0 === i &&
                (i =
                  "script" === t
                    ? p.ElementType.Script
                    : "style" === t
                    ? p.ElementType.Style
                    : p.ElementType.Tag);
            var s = e.call(this, n) || this;
            return (s.name = t), (s.attribs = r), (s.type = i), s;
          }
          return (
            d(t, e),
            Object.defineProperty(t.prototype, "nodeType", {
              get: function () {
                return 1;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "tagName", {
              get: function () {
                return this.name;
              },
              set: function (e) {
                this.name = e;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "attributes", {
              get: function () {
                var e = this;
                return Object.keys(this.attribs).map(function (t) {
                  var r, n;
                  return {
                    name: t,
                    value: e.attribs[t],
                    namespace:
                      null === (r = e["x-attribsNamespace"]) || void 0 === r
                        ? void 0
                        : r[t],
                    prefix:
                      null === (n = e["x-attribsPrefix"]) || void 0 === n
                        ? void 0
                        : n[t],
                  };
                });
              },
              enumerable: !1,
              configurable: !0,
            }),
            t
          );
        })(D);
        (r.Element = C),
          (r.isTag = n),
          (r.isCDATA = i),
          (r.isText = s),
          (r.isComment = a),
          (r.isDirective = o),
          (r.isDocument = c),
          (r.hasChildren = u),
          (r.cloneNode = l);
      },
      { domelementtype: 39 },
    ],
    42: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          var t = o(l, e);
          return t ? ("feed" === t.name ? i(t) : s(t)) : null;
        }
        function i(e) {
          var t,
            r = e.children,
            n = {
              type: "atom",
              items: (0, T.getElementsByTagName)("entry", r).map(function (e) {
                var t,
                  r = e.children,
                  n = { media: a(r) };
                u(n, "id", "id", r), u(n, "title", "title", r);
                var i =
                  null === (t = o("link", r)) || void 0 === t
                    ? void 0
                    : t.attribs.href;
                i && (n.link = i);
                var s = c("summary", r) || c("content", r);
                s && (n.description = s);
                var l = c("updated", r);
                return l && (n.pubDate = new Date(l)), n;
              }),
            };
          u(n, "id", "id", r), u(n, "title", "title", r);
          var i =
            null === (t = o("link", r)) || void 0 === t
              ? void 0
              : t.attribs.href;
          i && (n.link = i), u(n, "description", "subtitle", r);
          var s = c("updated", r);
          return (
            s && (n.updated = new Date(s)), u(n, "author", "email", r, !0), n
          );
        }
        function s(e) {
          var t,
            r,
            n =
              null !==
                (r =
                  null === (t = o("channel", e.children)) || void 0 === t
                    ? void 0
                    : t.children) && void 0 !== r
                ? r
                : [],
            i = {
              type: e.name.substr(0, 3),
              id: "",
              items: (0, T.getElementsByTagName)("item", e.children).map(
                function (e) {
                  var t = e.children,
                    r = { media: a(t) };
                  u(r, "id", "guid", t),
                    u(r, "title", "title", t),
                    u(r, "link", "link", t),
                    u(r, "description", "description", t);
                  var n = c("pubDate", t) || c("dc:date", t);
                  return n && (r.pubDate = new Date(n)), r;
                }
              ),
            };
          u(i, "title", "title", n),
            u(i, "link", "link", n),
            u(i, "description", "description", n);
          var s = c("lastBuildDate", n);
          return (
            s && (i.updated = new Date(s)),
            u(i, "author", "managingEditor", n, !0),
            i
          );
        }
        function a(e) {
          return (0, T.getElementsByTagName)("media:content", e).map(function (
            e
          ) {
            for (
              var t = e.attribs,
                r = { medium: t.medium, isDefault: !!t.isDefault },
                n = 0,
                i = d;
              n < i.length;
              n++
            ) {
              var s = i[n];
              t[s] && (r[s] = t[s]);
            }
            for (var a = 0, o = E; a < o.length; a++) {
              s = o[a];
              t[s] && (r[s] = parseInt(t[s], 10));
            }
            return t.expression && (r.expression = t.expression), r;
          });
        }
        function o(e, t) {
          return (0, T.getElementsByTagName)(e, t, !0, 1)[0];
        }
        function c(e, t, r) {
          return (
            void 0 === r && (r = !1),
            (0, h.textContent)((0, T.getElementsByTagName)(e, t, r, 1)).trim()
          );
        }
        function u(e, t, r, n, i) {
          void 0 === i && (i = !1);
          var s = c(r, n, i);
          s && (e[t] = s);
        }
        function l(e) {
          return "rss" === e || "feed" === e || "rdf:RDF" === e;
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.getFeed = void 0);
        var h = e("./stringify.js"),
          T = e("./legacy.js");
        r.getFeed = n;
        var d = ["url", "type", "lang"],
          E = [
            "fileSize",
            "bitrate",
            "framerate",
            "samplingrate",
            "channels",
            "duration",
            "height",
            "width",
          ];
      },
      { "./legacy.js": 45, "./stringify.js": 48 },
    ],
    43: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          for (var t = e.length; --t >= 0; ) {
            var r = e[t];
            if (t > 0 && e.lastIndexOf(r, t - 1) >= 0) e.splice(t, 1);
            else
              for (var n = r.parent; n; n = n.parent)
                if (e.includes(n)) {
                  e.splice(t, 1);
                  break;
                }
          }
          return e;
        }
        function i(e, t) {
          var r = [],
            n = [];
          if (e === t) return 0;
          for (var i = (0, o.hasChildren)(e) ? e : e.parent; i; )
            r.unshift(i), (i = i.parent);
          for (i = (0, o.hasChildren)(t) ? t : t.parent; i; )
            n.unshift(i), (i = i.parent);
          for (
            var s = Math.min(r.length, n.length), c = 0;
            c < s && r[c] === n[c];

          )
            c++;
          if (0 === c) return a.DISCONNECTED;
          var u = r[c - 1],
            l = u.children,
            h = r[c],
            T = n[c];
          return l.indexOf(h) > l.indexOf(T)
            ? u === t
              ? a.FOLLOWING | a.CONTAINED_BY
              : a.FOLLOWING
            : u === e
            ? a.PRECEDING | a.CONTAINS
            : a.PRECEDING;
        }
        function s(e) {
          return (
            (e = e.filter(function (e, t, r) {
              return !r.includes(e, t + 1);
            })),
            e.sort(function (e, t) {
              var r = i(e, t);
              return r & a.PRECEDING ? -1 : r & a.FOLLOWING ? 1 : 0;
            }),
            e
          );
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.uniqueSort =
            r.compareDocumentPosition =
            r.DocumentPosition =
            r.removeSubsets =
              void 0);
        var a,
          o = e("domhandler");
        (r.removeSubsets = n),
          (function (e) {
            (e[(e.DISCONNECTED = 1)] = "DISCONNECTED"),
              (e[(e.PRECEDING = 2)] = "PRECEDING"),
              (e[(e.FOLLOWING = 4)] = "FOLLOWING"),
              (e[(e.CONTAINS = 8)] = "CONTAINS"),
              (e[(e.CONTAINED_BY = 16)] = "CONTAINED_BY");
          })((a = r.DocumentPosition || (r.DocumentPosition = {}))),
          (r.compareDocumentPosition = i),
          (r.uniqueSort = s);
      },
      { domhandler: 40 },
    ],
    44: [
      function (e, t, r) {
        "use strict";
        var n =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, r, n) {
                  void 0 === n && (n = r);
                  var i = Object.getOwnPropertyDescriptor(t, r);
                  (i &&
                    ("get" in i
                      ? t.__esModule
                      : !i.writable && !i.configurable)) ||
                    (i = {
                      enumerable: !0,
                      get: function () {
                        return t[r];
                      },
                    }),
                    Object.defineProperty(e, n, i);
                }
              : function (e, t, r, n) {
                  void 0 === n && (n = r), (e[n] = t[r]);
                }),
          i =
            (this && this.__exportStar) ||
            function (e, t) {
              for (var r in e)
                "default" === r ||
                  Object.prototype.hasOwnProperty.call(t, r) ||
                  n(t, e, r);
            };
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.hasChildren =
            r.isDocument =
            r.isComment =
            r.isText =
            r.isCDATA =
            r.isTag =
              void 0),
          i(e("./stringify.js"), r),
          i(e("./traversal.js"), r),
          i(e("./manipulation.js"), r),
          i(e("./querying.js"), r),
          i(e("./legacy.js"), r),
          i(e("./helpers.js"), r),
          i(e("./feeds.js"), r);
        var s = e("domhandler");
        Object.defineProperty(r, "isTag", {
          enumerable: !0,
          get: function () {
            return s.isTag;
          },
        }),
          Object.defineProperty(r, "isCDATA", {
            enumerable: !0,
            get: function () {
              return s.isCDATA;
            },
          }),
          Object.defineProperty(r, "isText", {
            enumerable: !0,
            get: function () {
              return s.isText;
            },
          }),
          Object.defineProperty(r, "isComment", {
            enumerable: !0,
            get: function () {
              return s.isComment;
            },
          }),
          Object.defineProperty(r, "isDocument", {
            enumerable: !0,
            get: function () {
              return s.isDocument;
            },
          }),
          Object.defineProperty(r, "hasChildren", {
            enumerable: !0,
            get: function () {
              return s.hasChildren;
            },
          });
      },
      {
        "./feeds.js": 42,
        "./helpers.js": 43,
        "./legacy.js": 45,
        "./manipulation.js": 46,
        "./querying.js": 47,
        "./stringify.js": 48,
        "./traversal.js": 49,
        domhandler: 40,
      },
    ],
    45: [
      function (e, t, r) {
        "use strict";
        function n(e, t) {
          return "function" == typeof t
            ? function (r) {
                return (0, h.isTag)(r) && t(r.attribs[e]);
              }
            : function (r) {
                return (0, h.isTag)(r) && r.attribs[e] === t;
              };
        }
        function i(e, t) {
          return function (r) {
            return e(r) || t(r);
          };
        }
        function s(e) {
          var t = Object.keys(e).map(function (t) {
            var r = e[t];
            return Object.prototype.hasOwnProperty.call(d, t)
              ? d[t](r)
              : n(t, r);
          });
          return 0 === t.length ? null : t.reduce(i);
        }
        function a(e, t) {
          var r = s(e);
          return !r || r(t);
        }
        function o(e, t, r, n) {
          void 0 === n && (n = 1 / 0);
          var i = s(e);
          return i ? (0, T.filter)(i, t, r, n) : [];
        }
        function c(e, t, r) {
          return (
            void 0 === r && (r = !0),
            Array.isArray(t) || (t = [t]),
            (0, T.findOne)(n("id", e), t, r)
          );
        }
        function u(e, t, r, n) {
          return (
            void 0 === r && (r = !0),
            void 0 === n && (n = 1 / 0),
            (0, T.filter)(d.tag_name(e), t, r, n)
          );
        }
        function l(e, t, r, n) {
          return (
            void 0 === r && (r = !0),
            void 0 === n && (n = 1 / 0),
            (0, T.filter)(d.tag_type(e), t, r, n)
          );
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.getElementsByTagType =
            r.getElementsByTagName =
            r.getElementById =
            r.getElements =
            r.testElement =
              void 0);
        var h = e("domhandler"),
          T = e("./querying.js"),
          d = {
            tag_name: function (e) {
              return "function" == typeof e
                ? function (t) {
                    return (0, h.isTag)(t) && e(t.name);
                  }
                : "*" === e
                ? h.isTag
                : function (t) {
                    return (0, h.isTag)(t) && t.name === e;
                  };
            },
            tag_type: function (e) {
              return "function" == typeof e
                ? function (t) {
                    return e(t.type);
                  }
                : function (t) {
                    return t.type === e;
                  };
            },
            tag_contains: function (e) {
              return "function" == typeof e
                ? function (t) {
                    return (0, h.isText)(t) && e(t.data);
                  }
                : function (t) {
                    return (0, h.isText)(t) && t.data === e;
                  };
            },
          };
        (r.testElement = a),
          (r.getElements = o),
          (r.getElementById = c),
          (r.getElementsByTagName = u),
          (r.getElementsByTagType = l);
      },
      { "./querying.js": 47, domhandler: 40 },
    ],
    46: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          if (
            (e.prev && (e.prev.next = e.next),
            e.next && (e.next.prev = e.prev),
            e.parent)
          ) {
            var t = e.parent.children,
              r = t.lastIndexOf(e);
            r >= 0 && t.splice(r, 1);
          }
          (e.next = null), (e.prev = null), (e.parent = null);
        }
        function i(e, t) {
          var r = (t.prev = e.prev);
          r && (r.next = t);
          var n = (t.next = e.next);
          n && (n.prev = t);
          var i = (t.parent = e.parent);
          if (i) {
            var s = i.children;
            (s[s.lastIndexOf(e)] = t), (e.parent = null);
          }
        }
        function s(e, t) {
          if ((n(t), (t.next = null), (t.parent = e), e.children.push(t) > 1)) {
            var r = e.children[e.children.length - 2];
            (r.next = t), (t.prev = r);
          } else t.prev = null;
        }
        function a(e, t) {
          n(t);
          var r = e.parent,
            i = e.next;
          if (((t.next = i), (t.prev = e), (e.next = t), (t.parent = r), i)) {
            if (((i.prev = t), r)) {
              var s = r.children;
              s.splice(s.lastIndexOf(i), 0, t);
            }
          } else r && r.children.push(t);
        }
        function o(e, t) {
          if (
            (n(t), (t.parent = e), (t.prev = null), 1 !== e.children.unshift(t))
          ) {
            var r = e.children[1];
            (r.prev = t), (t.next = r);
          } else t.next = null;
        }
        function c(e, t) {
          n(t);
          var r = e.parent;
          if (r) {
            var i = r.children;
            i.splice(i.indexOf(e), 0, t);
          }
          e.prev && (e.prev.next = t),
            (t.parent = r),
            (t.prev = e.prev),
            (t.next = e),
            (e.prev = t);
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.prepend =
            r.prependChild =
            r.append =
            r.appendChild =
            r.replaceElement =
            r.removeElement =
              void 0),
          (r.removeElement = n),
          (r.replaceElement = i),
          (r.appendChild = s),
          (r.append = a),
          (r.prependChild = o),
          (r.prepend = c);
      },
      {},
    ],
    47: [
      function (e, t, r) {
        "use strict";
        function n(e, t, r, n) {
          return (
            void 0 === r && (r = !0),
            void 0 === n && (n = 1 / 0),
            i(e, Array.isArray(t) ? t : [t], r, n)
          );
        }
        function i(e, t, r, n) {
          for (var i = [], s = [t], a = [0]; ; )
            if (a[0] >= s[0].length) {
              if (1 === a.length) return i;
              s.shift(), a.shift();
            } else {
              var o = s[0][a[0]++];
              if (e(o) && (i.push(o), --n <= 0)) return i;
              r &&
                (0, u.hasChildren)(o) &&
                o.children.length > 0 &&
                (a.unshift(0), s.unshift(o.children));
            }
        }
        function s(e, t) {
          return t.find(e);
        }
        function a(e, t, r) {
          void 0 === r && (r = !0);
          for (var n = null, i = 0; i < t.length && !n; i++) {
            var s = t[i];
            (0, u.isTag)(s) &&
              (e(s)
                ? (n = s)
                : r && s.children.length > 0 && (n = a(e, s.children, !0)));
          }
          return n;
        }
        function o(e, t) {
          return t.some(function (t) {
            return (0, u.isTag)(t) && (e(t) || o(e, t.children));
          });
        }
        function c(e, t) {
          for (var r = [], n = [t], i = [0]; ; )
            if (i[0] >= n[0].length) {
              if (1 === n.length) return r;
              n.shift(), i.shift();
            } else {
              var s = n[0][i[0]++];
              (0, u.isTag)(s) &&
                (e(s) && r.push(s),
                s.children.length > 0 && (i.unshift(0), n.unshift(s.children)));
            }
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.findAll =
            r.existsOne =
            r.findOne =
            r.findOneChild =
            r.find =
            r.filter =
              void 0);
        var u = e("domhandler");
        (r.filter = n),
          (r.find = i),
          (r.findOneChild = s),
          (r.findOne = a),
          (r.existsOne = o),
          (r.findAll = c);
      },
      { domhandler: 40 },
    ],
    48: [
      function (e, t, r) {
        "use strict";
        function n(e, t) {
          return (0, l.default)(e, t);
        }
        function i(e, t) {
          return (0, u.hasChildren)(e)
            ? e.children
                .map(function (e) {
                  return n(e, t);
                })
                .join("")
            : "";
        }
        function s(e) {
          return Array.isArray(e)
            ? e.map(s).join("")
            : (0, u.isTag)(e)
            ? "br" === e.name
              ? "\n"
              : s(e.children)
            : (0, u.isCDATA)(e)
            ? s(e.children)
            : (0, u.isText)(e)
            ? e.data
            : "";
        }
        function a(e) {
          return Array.isArray(e)
            ? e.map(a).join("")
            : (0, u.hasChildren)(e) && !(0, u.isComment)(e)
            ? a(e.children)
            : (0, u.isText)(e)
            ? e.data
            : "";
        }
        function o(e) {
          return Array.isArray(e)
            ? e.map(o).join("")
            : (0, u.hasChildren)(e) &&
              (e.type === h.ElementType.Tag || (0, u.isCDATA)(e))
            ? o(e.children)
            : (0, u.isText)(e)
            ? e.data
            : "";
        }
        var c =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.innerText =
            r.textContent =
            r.getText =
            r.getInnerHTML =
            r.getOuterHTML =
              void 0);
        var u = e("domhandler"),
          l = c(e("dom-serializer")),
          h = e("domelementtype");
        (r.getOuterHTML = n),
          (r.getInnerHTML = i),
          (r.getText = s),
          (r.textContent = a),
          (r.innerText = o);
      },
      { "dom-serializer": 38, domelementtype: 39, domhandler: 40 },
    ],
    49: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          return (0, h.hasChildren)(e) ? e.children : [];
        }
        function i(e) {
          return e.parent || null;
        }
        function s(e) {
          var t,
            r,
            s = i(e);
          if (null != s) return n(s);
          for (var a = [e], o = e.prev, c = e.next; null != o; )
            a.unshift(o), (t = o), (o = t.prev);
          for (; null != c; ) a.push(c), (r = c), (c = r.next);
          return a;
        }
        function a(e, t) {
          var r;
          return null === (r = e.attribs) || void 0 === r ? void 0 : r[t];
        }
        function o(e, t) {
          return (
            null != e.attribs &&
            Object.prototype.hasOwnProperty.call(e.attribs, t) &&
            null != e.attribs[t]
          );
        }
        function c(e) {
          return e.name;
        }
        function u(e) {
          for (var t, r = e.next; null !== r && !(0, h.isTag)(r); )
            (t = r), (r = t.next);
          return r;
        }
        function l(e) {
          for (var t, r = e.prev; null !== r && !(0, h.isTag)(r); )
            (t = r), (r = t.prev);
          return r;
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.prevElementSibling =
            r.nextElementSibling =
            r.getName =
            r.hasAttrib =
            r.getAttributeValue =
            r.getSiblings =
            r.getParent =
            r.getChildren =
              void 0);
        var h = e("domhandler");
        (r.getChildren = n),
          (r.getParent = i),
          (r.getSiblings = s),
          (r.getAttributeValue = a),
          (r.hasAttrib = o),
          (r.getName = c),
          (r.nextElementSibling = u),
          (r.prevElementSibling = l);
      },
      { domhandler: 40 },
    ],
    50: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          return e >= I.ZERO && e <= I.NINE;
        }
        function i(e) {
          return (
            (e >= I.UPPER_A && e <= I.UPPER_F) ||
            (e >= I.LOWER_A && e <= I.LOWER_F)
          );
        }
        function s(e) {
          return (
            (e >= I.UPPER_A && e <= I.UPPER_Z) ||
            (e >= I.LOWER_A && e <= I.LOWER_Z) ||
            n(e)
          );
        }
        function a(e) {
          return e === I.EQUALS || s(e);
        }
        function o(e) {
          var t = "",
            r = new O(e, function (e) {
              return (t += (0, m.fromCodePoint)(e));
            });
          return function (e, n) {
            for (var i = 0, s = 0; (s = e.indexOf("&", s)) >= 0; ) {
              (t += e.slice(i, s)), r.startEntity(n);
              var a = r.write(e, s + 1);
              if (a < 0) {
                i = s + r.end();
                break;
              }
              (i = s + a), (s = 0 === a ? i + 1 : i);
            }
            var o = t + e.slice(i);
            return (t = ""), o;
          };
        }
        function c(e, t, r, n) {
          var i = (t & g.BRANCH_LENGTH) >> 7,
            s = t & g.JUMP_TABLE;
          if (0 === i) return 0 !== s && n === s ? r : -1;
          if (s) {
            var a = n - s;
            return a < 0 || a >= i ? -1 : e[r + a] - 1;
          }
          for (var o = r, c = o + i - 1; o <= c; ) {
            var u = (o + c) >>> 1,
              l = e[u];
            if (l < n) o = u + 1;
            else {
              if (!(l > n)) return e[u + i];
              c = u - 1;
            }
          }
          return -1;
        }
        function u(e, t) {
          return void 0 === t && (t = C.Legacy), b(e, t);
        }
        function l(e) {
          return b(e, C.Attribute);
        }
        function h(e) {
          return b(e, C.Strict);
        }
        function T(e) {
          return R(e, C.Strict);
        }
        var d =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, r, n) {
                  void 0 === n && (n = r);
                  var i = Object.getOwnPropertyDescriptor(t, r);
                  (i &&
                    ("get" in i
                      ? t.__esModule
                      : !i.writable && !i.configurable)) ||
                    (i = {
                      enumerable: !0,
                      get: function () {
                        return t[r];
                      },
                    }),
                    Object.defineProperty(e, n, i);
                }
              : function (e, t, r, n) {
                  void 0 === n && (n = r), (e[n] = t[r]);
                }),
          E =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, t) {
                  Object.defineProperty(e, "default", {
                    enumerable: !0,
                    value: t,
                  });
                }
              : function (e, t) {
                  e.default = t;
                }),
          p =
            (this && this.__importStar) ||
            function (e) {
              if (e && e.__esModule) return e;
              var t = {};
              if (null != e)
                for (var r in e)
                  "default" !== r &&
                    Object.prototype.hasOwnProperty.call(e, r) &&
                    d(t, e, r);
              return E(t, e), t;
            },
          f =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.decodeXML =
            r.decodeHTMLStrict =
            r.decodeHTMLAttribute =
            r.decodeHTML =
            r.determineBranch =
            r.EntityDecoder =
            r.DecodingMode =
            r.BinTrieFlags =
            r.fromCodePoint =
            r.replaceCodePoint =
            r.decodeCodePoint =
            r.xmlDecodeTree =
            r.htmlDecodeTree =
              void 0);
        var _ = f(e("./generated/decode-data-html.js"));
        r.htmlDecodeTree = _.default;
        var A = f(e("./generated/decode-data-xml.js"));
        r.xmlDecodeTree = A.default;
        var m = p(e("./decode_codepoint.js"));
        r.decodeCodePoint = m.default;
        var I,
          D = e("./decode_codepoint.js");
        Object.defineProperty(r, "replaceCodePoint", {
          enumerable: !0,
          get: function () {
            return D.replaceCodePoint;
          },
        }),
          Object.defineProperty(r, "fromCodePoint", {
            enumerable: !0,
            get: function () {
              return D.fromCodePoint;
            },
          }),
          (function (e) {
            (e[(e.NUM = 35)] = "NUM"),
              (e[(e.SEMI = 59)] = "SEMI"),
              (e[(e.EQUALS = 61)] = "EQUALS"),
              (e[(e.ZERO = 48)] = "ZERO"),
              (e[(e.NINE = 57)] = "NINE"),
              (e[(e.LOWER_A = 97)] = "LOWER_A"),
              (e[(e.LOWER_F = 102)] = "LOWER_F"),
              (e[(e.LOWER_X = 120)] = "LOWER_X"),
              (e[(e.LOWER_Z = 122)] = "LOWER_Z"),
              (e[(e.UPPER_A = 65)] = "UPPER_A"),
              (e[(e.UPPER_F = 70)] = "UPPER_F"),
              (e[(e.UPPER_Z = 90)] = "UPPER_Z");
          })(I || (I = {}));
        var g,
          N,
          C,
          S = 32;
        (function (e) {
          (e[(e.VALUE_LENGTH = 49152)] = "VALUE_LENGTH"),
            (e[(e.BRANCH_LENGTH = 16256)] = "BRANCH_LENGTH"),
            (e[(e.JUMP_TABLE = 127)] = "JUMP_TABLE");
        })((g = r.BinTrieFlags || (r.BinTrieFlags = {}))),
          (function (e) {
            (e[(e.EntityStart = 0)] = "EntityStart"),
              (e[(e.NumericStart = 1)] = "NumericStart"),
              (e[(e.NumericDecimal = 2)] = "NumericDecimal"),
              (e[(e.NumericHex = 3)] = "NumericHex"),
              (e[(e.NamedEntity = 4)] = "NamedEntity");
          })(N || (N = {})),
          (function (e) {
            (e[(e.Legacy = 0)] = "Legacy"),
              (e[(e.Strict = 1)] = "Strict"),
              (e[(e.Attribute = 2)] = "Attribute");
          })((C = r.DecodingMode || (r.DecodingMode = {})));
        var O = (function () {
          function e(e, t, r) {
            (this.decodeTree = e),
              (this.emitCodePoint = t),
              (this.errors = r),
              (this.state = N.EntityStart),
              (this.consumed = 1),
              (this.result = 0),
              (this.treeIndex = 0),
              (this.excess = 1),
              (this.decodeMode = C.Strict);
          }
          return (
            (e.prototype.startEntity = function (e) {
              (this.decodeMode = e),
                (this.state = N.EntityStart),
                (this.result = 0),
                (this.treeIndex = 0),
                (this.excess = 1),
                (this.consumed = 1);
            }),
            (e.prototype.write = function (e, t) {
              switch (this.state) {
                case N.EntityStart:
                  return e.charCodeAt(t) === I.NUM
                    ? ((this.state = N.NumericStart),
                      (this.consumed += 1),
                      this.stateNumericStart(e, t + 1))
                    : ((this.state = N.NamedEntity),
                      this.stateNamedEntity(e, t));
                case N.NumericStart:
                  return this.stateNumericStart(e, t);
                case N.NumericDecimal:
                  return this.stateNumericDecimal(e, t);
                case N.NumericHex:
                  return this.stateNumericHex(e, t);
                case N.NamedEntity:
                  return this.stateNamedEntity(e, t);
              }
            }),
            (e.prototype.stateNumericStart = function (e, t) {
              return t >= e.length
                ? -1
                : (e.charCodeAt(t) | S) === I.LOWER_X
                ? ((this.state = N.NumericHex),
                  (this.consumed += 1),
                  this.stateNumericHex(e, t + 1))
                : ((this.state = N.NumericDecimal),
                  this.stateNumericDecimal(e, t));
            }),
            (e.prototype.addToNumericResult = function (e, t, r, n) {
              if (t !== r) {
                var i = r - t;
                (this.result =
                  this.result * Math.pow(n, i) + parseInt(e.substr(t, i), n)),
                  (this.consumed += i);
              }
            }),
            (e.prototype.stateNumericHex = function (e, t) {
              for (var r = t; t < e.length; ) {
                var s = e.charCodeAt(t);
                if (!n(s) && !i(s))
                  return (
                    this.addToNumericResult(e, r, t, 16),
                    this.emitNumericEntity(s, 3)
                  );
                t += 1;
              }
              return this.addToNumericResult(e, r, t, 16), -1;
            }),
            (e.prototype.stateNumericDecimal = function (e, t) {
              for (var r = t; t < e.length; ) {
                var i = e.charCodeAt(t);
                if (!n(i))
                  return (
                    this.addToNumericResult(e, r, t, 10),
                    this.emitNumericEntity(i, 2)
                  );
                t += 1;
              }
              return this.addToNumericResult(e, r, t, 10), -1;
            }),
            (e.prototype.emitNumericEntity = function (e, t) {
              var r;
              if (this.consumed <= t)
                return (
                  null === (r = this.errors) ||
                    void 0 === r ||
                    r.absenceOfDigitsInNumericCharacterReference(this.consumed),
                  0
                );
              if (e === I.SEMI) this.consumed += 1;
              else if (this.decodeMode === C.Strict) return 0;
              return (
                this.emitCodePoint(
                  (0, m.replaceCodePoint)(this.result),
                  this.consumed
                ),
                this.errors &&
                  (e !== I.SEMI &&
                    this.errors.missingSemicolonAfterCharacterReference(),
                  this.errors.validateNumericCharacterReference(this.result)),
                this.consumed
              );
            }),
            (e.prototype.stateNamedEntity = function (e, t) {
              for (
                var r = this.decodeTree,
                  n = r[this.treeIndex],
                  i = (n & g.VALUE_LENGTH) >> 14;
                t < e.length;
                t++, this.excess++
              ) {
                var s = e.charCodeAt(t);
                if (
                  ((this.treeIndex = c(
                    r,
                    n,
                    this.treeIndex + Math.max(1, i),
                    s
                  )),
                  this.treeIndex < 0)
                )
                  return 0 === this.result ||
                    (this.decodeMode === C.Attribute && (0 === i || a(s)))
                    ? 0
                    : this.emitNotTerminatedNamedEntity();
                if (
                  ((n = r[this.treeIndex]),
                  (i = (n & g.VALUE_LENGTH) >> 14),
                  0 !== i)
                ) {
                  if (s === I.SEMI)
                    return this.emitNamedEntityData(
                      this.treeIndex,
                      i,
                      this.consumed + this.excess
                    );
                  this.decodeMode !== C.Strict &&
                    ((this.result = this.treeIndex),
                    (this.consumed += this.excess),
                    (this.excess = 0));
                }
              }
              return -1;
            }),
            (e.prototype.emitNotTerminatedNamedEntity = function () {
              var e,
                t = this,
                r = t.result,
                n = t.decodeTree,
                i = (n[r] & g.VALUE_LENGTH) >> 14;
              return (
                this.emitNamedEntityData(r, i, this.consumed),
                null === (e = this.errors) ||
                  void 0 === e ||
                  e.missingSemicolonAfterCharacterReference(),
                this.consumed
              );
            }),
            (e.prototype.emitNamedEntityData = function (e, t, r) {
              var n = this.decodeTree;
              return (
                this.emitCodePoint(
                  1 === t ? n[e] & ~g.VALUE_LENGTH : n[e + 1],
                  r
                ),
                3 === t && this.emitCodePoint(n[e + 2], r),
                r
              );
            }),
            (e.prototype.end = function () {
              var e;
              switch (this.state) {
                case N.NamedEntity:
                  return 0 === this.result ||
                    (this.decodeMode === C.Attribute &&
                      this.result !== this.treeIndex)
                    ? 0
                    : this.emitNotTerminatedNamedEntity();
                case N.NumericDecimal:
                  return this.emitNumericEntity(0, 2);
                case N.NumericHex:
                  return this.emitNumericEntity(0, 3);
                case N.NumericStart:
                  return (
                    null === (e = this.errors) ||
                      void 0 === e ||
                      e.absenceOfDigitsInNumericCharacterReference(
                        this.consumed
                      ),
                    0
                  );
                case N.EntityStart:
                  return 0;
              }
            }),
            e
          );
        })();
        (r.EntityDecoder = O), (r.determineBranch = c);
        var b = o(_.default),
          R = o(A.default);
        (r.decodeHTML = u),
          (r.decodeHTMLAttribute = l),
          (r.decodeHTMLStrict = h),
          (r.decodeXML = T);
      },
      {
        "./decode_codepoint.js": 51,
        "./generated/decode-data-html.js": 54,
        "./generated/decode-data-xml.js": 55,
      },
    ],
    51: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          var t;
          return (e >= 55296 && e <= 57343) || e > 1114111
            ? 65533
            : null !== (t = a.get(e)) && void 0 !== t
            ? t
            : e;
        }
        function i(e) {
          return (0, r.fromCodePoint)(n(e));
        }
        var s;
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.replaceCodePoint = r.fromCodePoint = void 0);
        var a = new Map([
          [0, 65533],
          [128, 8364],
          [130, 8218],
          [131, 402],
          [132, 8222],
          [133, 8230],
          [134, 8224],
          [135, 8225],
          [136, 710],
          [137, 8240],
          [138, 352],
          [139, 8249],
          [140, 338],
          [142, 381],
          [145, 8216],
          [146, 8217],
          [147, 8220],
          [148, 8221],
          [149, 8226],
          [150, 8211],
          [151, 8212],
          [152, 732],
          [153, 8482],
          [154, 353],
          [155, 8250],
          [156, 339],
          [158, 382],
          [159, 376],
        ]);
        (r.fromCodePoint =
          null !== (s = String.fromCodePoint) && void 0 !== s
            ? s
            : function (e) {
                var t = "";
                return (
                  e > 65535 &&
                    ((e -= 65536),
                    (t += String.fromCharCode(((e >>> 10) & 1023) | 55296)),
                    (e = 56320 | (1023 & e))),
                  (t += String.fromCharCode(e)),
                  t
                );
              }),
          (r.replaceCodePoint = n),
          (r.default = i);
      },
      {},
    ],
    52: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          return s(u, e);
        }
        function i(e) {
          return s(c.xmlReplacer, e);
        }
        function s(e, t) {
          for (var r, n = "", i = 0; null !== (r = e.exec(t)); ) {
            var s = r.index;
            n += t.substring(i, s);
            var a = t.charCodeAt(s),
              u = o.default.get(a);
            if ("object" == typeof u) {
              if (s + 1 < t.length) {
                var l = t.charCodeAt(s + 1),
                  h =
                    "number" == typeof u.n
                      ? u.n === l
                        ? u.o
                        : void 0
                      : u.n.get(l);
                if (void 0 !== h) {
                  (n += h), (i = e.lastIndex += 1);
                  continue;
                }
              }
              u = u.v;
            }
            if (void 0 !== u) (n += u), (i = s + 1);
            else {
              var T = (0, c.getCodePoint)(t, s);
              (n += "&#x".concat(T.toString(16), ";")),
                (i = e.lastIndex += Number(T !== a));
            }
          }
          return n + t.substr(i);
        }
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.encodeNonAsciiHTML = r.encodeHTML = void 0);
        var o = a(e("./generated/encode-html.js")),
          c = e("./escape.js"),
          u = /[\t\n!-,./:-@[-`\f{-}$\x80-\uFFFF]/g;
        (r.encodeHTML = n), (r.encodeNonAsciiHTML = i);
      },
      { "./escape.js": 53, "./generated/encode-html.js": 56 },
    ],
    53: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          for (var t, n = "", i = 0; null !== (t = r.xmlReplacer.exec(e)); ) {
            var a = t.index,
              o = e.charCodeAt(a),
              c = s.get(o);
            void 0 !== c
              ? ((n += e.substring(i, a) + c), (i = a + 1))
              : ((n += ""
                  .concat(e.substring(i, a), "&#x")
                  .concat((0, r.getCodePoint)(e, a).toString(16), ";")),
                (i = r.xmlReplacer.lastIndex += Number(55296 == (64512 & o))));
          }
          return n + e.substr(i);
        }
        function i(e, t) {
          return function (r) {
            for (var n, i = 0, s = ""; (n = e.exec(r)); )
              i !== n.index && (s += r.substring(i, n.index)),
                (s += t.get(n[0].charCodeAt(0))),
                (i = n.index + 1);
            return s + r.substring(i);
          };
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.escapeText =
            r.escapeAttribute =
            r.escapeUTF8 =
            r.escape =
            r.encodeXML =
            r.getCodePoint =
            r.xmlReplacer =
              void 0),
          (r.xmlReplacer = /["&'<>$\x80-\uFFFF]/g);
        var s = new Map([
          [34, "&quot;"],
          [38, "&amp;"],
          [39, "&apos;"],
          [60, "&lt;"],
          [62, "&gt;"],
        ]);
        (r.getCodePoint =
          null != String.prototype.codePointAt
            ? function (e, t) {
                return e.codePointAt(t);
              }
            : function (e, t) {
                return 55296 == (64512 & e.charCodeAt(t))
                  ? 1024 * (e.charCodeAt(t) - 55296) +
                      e.charCodeAt(t + 1) -
                      56320 +
                      65536
                  : e.charCodeAt(t);
              }),
          (r.encodeXML = n),
          (r.escape = n),
          (r.escapeUTF8 = i(/[&<>'"]/g, s)),
          (r.escapeAttribute = i(
            /["&\u00A0]/g,
            new Map([
              [34, "&quot;"],
              [38, "&amp;"],
              [160, "&nbsp;"],
            ])
          )),
          (r.escapeText = i(
            /[&<>\u00A0]/g,
            new Map([
              [38, "&amp;"],
              [60, "&lt;"],
              [62, "&gt;"],
              [160, "&nbsp;"],
            ])
          ));
      },
      {},
    ],
    54: [
      function (e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.default = new Uint16Array(
            'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'
              .split("")
              .map(function (e) {
                return e.charCodeAt(0);
              })
          ));
      },
      {},
    ],
    55: [
      function (e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.default = new Uint16Array(
            "Ȁaglq\tɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(function (e) {
              return e.charCodeAt(0);
            })
          ));
      },
      {},
    ],
    56: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          for (var t = 1; t < e.length; t++) e[t][0] += e[t - 1][0] + 1;
          return e;
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.default = new Map(
            n([
              [9, "&Tab;"],
              [0, "&NewLine;"],
              [22, "&excl;"],
              [0, "&quot;"],
              [0, "&num;"],
              [0, "&dollar;"],
              [0, "&percnt;"],
              [0, "&amp;"],
              [0, "&apos;"],
              [0, "&lpar;"],
              [0, "&rpar;"],
              [0, "&ast;"],
              [0, "&plus;"],
              [0, "&comma;"],
              [1, "&period;"],
              [0, "&sol;"],
              [10, "&colon;"],
              [0, "&semi;"],
              [0, { v: "&lt;", n: 8402, o: "&nvlt;" }],
              [0, { v: "&equals;", n: 8421, o: "&bne;" }],
              [0, { v: "&gt;", n: 8402, o: "&nvgt;" }],
              [0, "&quest;"],
              [0, "&commat;"],
              [26, "&lbrack;"],
              [0, "&bsol;"],
              [0, "&rbrack;"],
              [0, "&Hat;"],
              [0, "&lowbar;"],
              [0, "&DiacriticalGrave;"],
              [5, { n: 106, o: "&fjlig;" }],
              [20, "&lbrace;"],
              [0, "&verbar;"],
              [0, "&rbrace;"],
              [34, "&nbsp;"],
              [0, "&iexcl;"],
              [0, "&cent;"],
              [0, "&pound;"],
              [0, "&curren;"],
              [0, "&yen;"],
              [0, "&brvbar;"],
              [0, "&sect;"],
              [0, "&die;"],
              [0, "&copy;"],
              [0, "&ordf;"],
              [0, "&laquo;"],
              [0, "&not;"],
              [0, "&shy;"],
              [0, "&circledR;"],
              [0, "&macr;"],
              [0, "&deg;"],
              [0, "&PlusMinus;"],
              [0, "&sup2;"],
              [0, "&sup3;"],
              [0, "&acute;"],
              [0, "&micro;"],
              [0, "&para;"],
              [0, "&centerdot;"],
              [0, "&cedil;"],
              [0, "&sup1;"],
              [0, "&ordm;"],
              [0, "&raquo;"],
              [0, "&frac14;"],
              [0, "&frac12;"],
              [0, "&frac34;"],
              [0, "&iquest;"],
              [0, "&Agrave;"],
              [0, "&Aacute;"],
              [0, "&Acirc;"],
              [0, "&Atilde;"],
              [0, "&Auml;"],
              [0, "&angst;"],
              [0, "&AElig;"],
              [0, "&Ccedil;"],
              [0, "&Egrave;"],
              [0, "&Eacute;"],
              [0, "&Ecirc;"],
              [0, "&Euml;"],
              [0, "&Igrave;"],
              [0, "&Iacute;"],
              [0, "&Icirc;"],
              [0, "&Iuml;"],
              [0, "&ETH;"],
              [0, "&Ntilde;"],
              [0, "&Ograve;"],
              [0, "&Oacute;"],
              [0, "&Ocirc;"],
              [0, "&Otilde;"],
              [0, "&Ouml;"],
              [0, "&times;"],
              [0, "&Oslash;"],
              [0, "&Ugrave;"],
              [0, "&Uacute;"],
              [0, "&Ucirc;"],
              [0, "&Uuml;"],
              [0, "&Yacute;"],
              [0, "&THORN;"],
              [0, "&szlig;"],
              [0, "&agrave;"],
              [0, "&aacute;"],
              [0, "&acirc;"],
              [0, "&atilde;"],
              [0, "&auml;"],
              [0, "&aring;"],
              [0, "&aelig;"],
              [0, "&ccedil;"],
              [0, "&egrave;"],
              [0, "&eacute;"],
              [0, "&ecirc;"],
              [0, "&euml;"],
              [0, "&igrave;"],
              [0, "&iacute;"],
              [0, "&icirc;"],
              [0, "&iuml;"],
              [0, "&eth;"],
              [0, "&ntilde;"],
              [0, "&ograve;"],
              [0, "&oacute;"],
              [0, "&ocirc;"],
              [0, "&otilde;"],
              [0, "&ouml;"],
              [0, "&div;"],
              [0, "&oslash;"],
              [0, "&ugrave;"],
              [0, "&uacute;"],
              [0, "&ucirc;"],
              [0, "&uuml;"],
              [0, "&yacute;"],
              [0, "&thorn;"],
              [0, "&yuml;"],
              [0, "&Amacr;"],
              [0, "&amacr;"],
              [0, "&Abreve;"],
              [0, "&abreve;"],
              [0, "&Aogon;"],
              [0, "&aogon;"],
              [0, "&Cacute;"],
              [0, "&cacute;"],
              [0, "&Ccirc;"],
              [0, "&ccirc;"],
              [0, "&Cdot;"],
              [0, "&cdot;"],
              [0, "&Ccaron;"],
              [0, "&ccaron;"],
              [0, "&Dcaron;"],
              [0, "&dcaron;"],
              [0, "&Dstrok;"],
              [0, "&dstrok;"],
              [0, "&Emacr;"],
              [0, "&emacr;"],
              [2, "&Edot;"],
              [0, "&edot;"],
              [0, "&Eogon;"],
              [0, "&eogon;"],
              [0, "&Ecaron;"],
              [0, "&ecaron;"],
              [0, "&Gcirc;"],
              [0, "&gcirc;"],
              [0, "&Gbreve;"],
              [0, "&gbreve;"],
              [0, "&Gdot;"],
              [0, "&gdot;"],
              [0, "&Gcedil;"],
              [1, "&Hcirc;"],
              [0, "&hcirc;"],
              [0, "&Hstrok;"],
              [0, "&hstrok;"],
              [0, "&Itilde;"],
              [0, "&itilde;"],
              [0, "&Imacr;"],
              [0, "&imacr;"],
              [2, "&Iogon;"],
              [0, "&iogon;"],
              [0, "&Idot;"],
              [0, "&imath;"],
              [0, "&IJlig;"],
              [0, "&ijlig;"],
              [0, "&Jcirc;"],
              [0, "&jcirc;"],
              [0, "&Kcedil;"],
              [0, "&kcedil;"],
              [0, "&kgreen;"],
              [0, "&Lacute;"],
              [0, "&lacute;"],
              [0, "&Lcedil;"],
              [0, "&lcedil;"],
              [0, "&Lcaron;"],
              [0, "&lcaron;"],
              [0, "&Lmidot;"],
              [0, "&lmidot;"],
              [0, "&Lstrok;"],
              [0, "&lstrok;"],
              [0, "&Nacute;"],
              [0, "&nacute;"],
              [0, "&Ncedil;"],
              [0, "&ncedil;"],
              [0, "&Ncaron;"],
              [0, "&ncaron;"],
              [0, "&napos;"],
              [0, "&ENG;"],
              [0, "&eng;"],
              [0, "&Omacr;"],
              [0, "&omacr;"],
              [2, "&Odblac;"],
              [0, "&odblac;"],
              [0, "&OElig;"],
              [0, "&oelig;"],
              [0, "&Racute;"],
              [0, "&racute;"],
              [0, "&Rcedil;"],
              [0, "&rcedil;"],
              [0, "&Rcaron;"],
              [0, "&rcaron;"],
              [0, "&Sacute;"],
              [0, "&sacute;"],
              [0, "&Scirc;"],
              [0, "&scirc;"],
              [0, "&Scedil;"],
              [0, "&scedil;"],
              [0, "&Scaron;"],
              [0, "&scaron;"],
              [0, "&Tcedil;"],
              [0, "&tcedil;"],
              [0, "&Tcaron;"],
              [0, "&tcaron;"],
              [0, "&Tstrok;"],
              [0, "&tstrok;"],
              [0, "&Utilde;"],
              [0, "&utilde;"],
              [0, "&Umacr;"],
              [0, "&umacr;"],
              [0, "&Ubreve;"],
              [0, "&ubreve;"],
              [0, "&Uring;"],
              [0, "&uring;"],
              [0, "&Udblac;"],
              [0, "&udblac;"],
              [0, "&Uogon;"],
              [0, "&uogon;"],
              [0, "&Wcirc;"],
              [0, "&wcirc;"],
              [0, "&Ycirc;"],
              [0, "&ycirc;"],
              [0, "&Yuml;"],
              [0, "&Zacute;"],
              [0, "&zacute;"],
              [0, "&Zdot;"],
              [0, "&zdot;"],
              [0, "&Zcaron;"],
              [0, "&zcaron;"],
              [19, "&fnof;"],
              [34, "&imped;"],
              [63, "&gacute;"],
              [65, "&jmath;"],
              [142, "&circ;"],
              [0, "&caron;"],
              [16, "&breve;"],
              [0, "&DiacriticalDot;"],
              [0, "&ring;"],
              [0, "&ogon;"],
              [0, "&DiacriticalTilde;"],
              [0, "&dblac;"],
              [51, "&DownBreve;"],
              [127, "&Alpha;"],
              [0, "&Beta;"],
              [0, "&Gamma;"],
              [0, "&Delta;"],
              [0, "&Epsilon;"],
              [0, "&Zeta;"],
              [0, "&Eta;"],
              [0, "&Theta;"],
              [0, "&Iota;"],
              [0, "&Kappa;"],
              [0, "&Lambda;"],
              [0, "&Mu;"],
              [0, "&Nu;"],
              [0, "&Xi;"],
              [0, "&Omicron;"],
              [0, "&Pi;"],
              [0, "&Rho;"],
              [1, "&Sigma;"],
              [0, "&Tau;"],
              [0, "&Upsilon;"],
              [0, "&Phi;"],
              [0, "&Chi;"],
              [0, "&Psi;"],
              [0, "&ohm;"],
              [7, "&alpha;"],
              [0, "&beta;"],
              [0, "&gamma;"],
              [0, "&delta;"],
              [0, "&epsi;"],
              [0, "&zeta;"],
              [0, "&eta;"],
              [0, "&theta;"],
              [0, "&iota;"],
              [0, "&kappa;"],
              [0, "&lambda;"],
              [0, "&mu;"],
              [0, "&nu;"],
              [0, "&xi;"],
              [0, "&omicron;"],
              [0, "&pi;"],
              [0, "&rho;"],
              [0, "&sigmaf;"],
              [0, "&sigma;"],
              [0, "&tau;"],
              [0, "&upsi;"],
              [0, "&phi;"],
              [0, "&chi;"],
              [0, "&psi;"],
              [0, "&omega;"],
              [7, "&thetasym;"],
              [0, "&Upsi;"],
              [2, "&phiv;"],
              [0, "&piv;"],
              [5, "&Gammad;"],
              [0, "&digamma;"],
              [18, "&kappav;"],
              [0, "&rhov;"],
              [3, "&epsiv;"],
              [0, "&backepsilon;"],
              [10, "&IOcy;"],
              [0, "&DJcy;"],
              [0, "&GJcy;"],
              [0, "&Jukcy;"],
              [0, "&DScy;"],
              [0, "&Iukcy;"],
              [0, "&YIcy;"],
              [0, "&Jsercy;"],
              [0, "&LJcy;"],
              [0, "&NJcy;"],
              [0, "&TSHcy;"],
              [0, "&KJcy;"],
              [1, "&Ubrcy;"],
              [0, "&DZcy;"],
              [0, "&Acy;"],
              [0, "&Bcy;"],
              [0, "&Vcy;"],
              [0, "&Gcy;"],
              [0, "&Dcy;"],
              [0, "&IEcy;"],
              [0, "&ZHcy;"],
              [0, "&Zcy;"],
              [0, "&Icy;"],
              [0, "&Jcy;"],
              [0, "&Kcy;"],
              [0, "&Lcy;"],
              [0, "&Mcy;"],
              [0, "&Ncy;"],
              [0, "&Ocy;"],
              [0, "&Pcy;"],
              [0, "&Rcy;"],
              [0, "&Scy;"],
              [0, "&Tcy;"],
              [0, "&Ucy;"],
              [0, "&Fcy;"],
              [0, "&KHcy;"],
              [0, "&TScy;"],
              [0, "&CHcy;"],
              [0, "&SHcy;"],
              [0, "&SHCHcy;"],
              [0, "&HARDcy;"],
              [0, "&Ycy;"],
              [0, "&SOFTcy;"],
              [0, "&Ecy;"],
              [0, "&YUcy;"],
              [0, "&YAcy;"],
              [0, "&acy;"],
              [0, "&bcy;"],
              [0, "&vcy;"],
              [0, "&gcy;"],
              [0, "&dcy;"],
              [0, "&iecy;"],
              [0, "&zhcy;"],
              [0, "&zcy;"],
              [0, "&icy;"],
              [0, "&jcy;"],
              [0, "&kcy;"],
              [0, "&lcy;"],
              [0, "&mcy;"],
              [0, "&ncy;"],
              [0, "&ocy;"],
              [0, "&pcy;"],
              [0, "&rcy;"],
              [0, "&scy;"],
              [0, "&tcy;"],
              [0, "&ucy;"],
              [0, "&fcy;"],
              [0, "&khcy;"],
              [0, "&tscy;"],
              [0, "&chcy;"],
              [0, "&shcy;"],
              [0, "&shchcy;"],
              [0, "&hardcy;"],
              [0, "&ycy;"],
              [0, "&softcy;"],
              [0, "&ecy;"],
              [0, "&yucy;"],
              [0, "&yacy;"],
              [1, "&iocy;"],
              [0, "&djcy;"],
              [0, "&gjcy;"],
              [0, "&jukcy;"],
              [0, "&dscy;"],
              [0, "&iukcy;"],
              [0, "&yicy;"],
              [0, "&jsercy;"],
              [0, "&ljcy;"],
              [0, "&njcy;"],
              [0, "&tshcy;"],
              [0, "&kjcy;"],
              [1, "&ubrcy;"],
              [0, "&dzcy;"],
              [7074, "&ensp;"],
              [0, "&emsp;"],
              [0, "&emsp13;"],
              [0, "&emsp14;"],
              [1, "&numsp;"],
              [0, "&puncsp;"],
              [0, "&ThinSpace;"],
              [0, "&hairsp;"],
              [0, "&NegativeMediumSpace;"],
              [0, "&zwnj;"],
              [0, "&zwj;"],
              [0, "&lrm;"],
              [0, "&rlm;"],
              [0, "&dash;"],
              [2, "&ndash;"],
              [0, "&mdash;"],
              [0, "&horbar;"],
              [0, "&Verbar;"],
              [1, "&lsquo;"],
              [0, "&CloseCurlyQuote;"],
              [0, "&lsquor;"],
              [1, "&ldquo;"],
              [0, "&CloseCurlyDoubleQuote;"],
              [0, "&bdquo;"],
              [1, "&dagger;"],
              [0, "&Dagger;"],
              [0, "&bull;"],
              [2, "&nldr;"],
              [0, "&hellip;"],
              [9, "&permil;"],
              [0, "&pertenk;"],
              [0, "&prime;"],
              [0, "&Prime;"],
              [0, "&tprime;"],
              [0, "&backprime;"],
              [3, "&lsaquo;"],
              [0, "&rsaquo;"],
              [3, "&oline;"],
              [2, "&caret;"],
              [1, "&hybull;"],
              [0, "&frasl;"],
              [10, "&bsemi;"],
              [7, "&qprime;"],
              [7, { v: "&MediumSpace;", n: 8202, o: "&ThickSpace;" }],
              [0, "&NoBreak;"],
              [0, "&af;"],
              [0, "&InvisibleTimes;"],
              [0, "&ic;"],
              [72, "&euro;"],
              [46, "&tdot;"],
              [0, "&DotDot;"],
              [37, "&complexes;"],
              [2, "&incare;"],
              [4, "&gscr;"],
              [0, "&hamilt;"],
              [0, "&Hfr;"],
              [0, "&Hopf;"],
              [0, "&planckh;"],
              [0, "&hbar;"],
              [0, "&imagline;"],
              [0, "&Ifr;"],
              [0, "&lagran;"],
              [0, "&ell;"],
              [1, "&naturals;"],
              [0, "&numero;"],
              [0, "&copysr;"],
              [0, "&weierp;"],
              [0, "&Popf;"],
              [0, "&Qopf;"],
              [0, "&realine;"],
              [0, "&real;"],
              [0, "&reals;"],
              [0, "&rx;"],
              [3, "&trade;"],
              [1, "&integers;"],
              [2, "&mho;"],
              [0, "&zeetrf;"],
              [0, "&iiota;"],
              [2, "&bernou;"],
              [0, "&Cayleys;"],
              [1, "&escr;"],
              [0, "&Escr;"],
              [0, "&Fouriertrf;"],
              [1, "&Mellintrf;"],
              [0, "&order;"],
              [0, "&alefsym;"],
              [0, "&beth;"],
              [0, "&gimel;"],
              [0, "&daleth;"],
              [12, "&CapitalDifferentialD;"],
              [0, "&dd;"],
              [0, "&ee;"],
              [0, "&ii;"],
              [10, "&frac13;"],
              [0, "&frac23;"],
              [0, "&frac15;"],
              [0, "&frac25;"],
              [0, "&frac35;"],
              [0, "&frac45;"],
              [0, "&frac16;"],
              [0, "&frac56;"],
              [0, "&frac18;"],
              [0, "&frac38;"],
              [0, "&frac58;"],
              [0, "&frac78;"],
              [49, "&larr;"],
              [0, "&ShortUpArrow;"],
              [0, "&rarr;"],
              [0, "&darr;"],
              [0, "&harr;"],
              [0, "&updownarrow;"],
              [0, "&nwarr;"],
              [0, "&nearr;"],
              [0, "&LowerRightArrow;"],
              [0, "&LowerLeftArrow;"],
              [0, "&nlarr;"],
              [0, "&nrarr;"],
              [1, { v: "&rarrw;", n: 824, o: "&nrarrw;" }],
              [0, "&Larr;"],
              [0, "&Uarr;"],
              [0, "&Rarr;"],
              [0, "&Darr;"],
              [0, "&larrtl;"],
              [0, "&rarrtl;"],
              [0, "&LeftTeeArrow;"],
              [0, "&mapstoup;"],
              [0, "&map;"],
              [0, "&DownTeeArrow;"],
              [1, "&hookleftarrow;"],
              [0, "&hookrightarrow;"],
              [0, "&larrlp;"],
              [0, "&looparrowright;"],
              [0, "&harrw;"],
              [0, "&nharr;"],
              [1, "&lsh;"],
              [0, "&rsh;"],
              [0, "&ldsh;"],
              [0, "&rdsh;"],
              [1, "&crarr;"],
              [0, "&cularr;"],
              [0, "&curarr;"],
              [2, "&circlearrowleft;"],
              [0, "&circlearrowright;"],
              [0, "&leftharpoonup;"],
              [0, "&DownLeftVector;"],
              [0, "&RightUpVector;"],
              [0, "&LeftUpVector;"],
              [0, "&rharu;"],
              [0, "&DownRightVector;"],
              [0, "&dharr;"],
              [0, "&dharl;"],
              [0, "&RightArrowLeftArrow;"],
              [0, "&udarr;"],
              [0, "&LeftArrowRightArrow;"],
              [0, "&leftleftarrows;"],
              [0, "&upuparrows;"],
              [0, "&rightrightarrows;"],
              [0, "&ddarr;"],
              [0, "&leftrightharpoons;"],
              [0, "&Equilibrium;"],
              [0, "&nlArr;"],
              [0, "&nhArr;"],
              [0, "&nrArr;"],
              [0, "&DoubleLeftArrow;"],
              [0, "&DoubleUpArrow;"],
              [0, "&DoubleRightArrow;"],
              [0, "&dArr;"],
              [0, "&DoubleLeftRightArrow;"],
              [0, "&DoubleUpDownArrow;"],
              [0, "&nwArr;"],
              [0, "&neArr;"],
              [0, "&seArr;"],
              [0, "&swArr;"],
              [0, "&lAarr;"],
              [0, "&rAarr;"],
              [1, "&zigrarr;"],
              [6, "&larrb;"],
              [0, "&rarrb;"],
              [15, "&DownArrowUpArrow;"],
              [7, "&loarr;"],
              [0, "&roarr;"],
              [0, "&hoarr;"],
              [0, "&forall;"],
              [0, "&comp;"],
              [0, { v: "&part;", n: 824, o: "&npart;" }],
              [0, "&exist;"],
              [0, "&nexist;"],
              [0, "&empty;"],
              [1, "&Del;"],
              [0, "&Element;"],
              [0, "&NotElement;"],
              [1, "&ni;"],
              [0, "&notni;"],
              [2, "&prod;"],
              [0, "&coprod;"],
              [0, "&sum;"],
              [0, "&minus;"],
              [0, "&MinusPlus;"],
              [0, "&dotplus;"],
              [1, "&Backslash;"],
              [0, "&lowast;"],
              [0, "&compfn;"],
              [1, "&radic;"],
              [2, "&prop;"],
              [0, "&infin;"],
              [0, "&angrt;"],
              [0, { v: "&ang;", n: 8402, o: "&nang;" }],
              [0, "&angmsd;"],
              [0, "&angsph;"],
              [0, "&mid;"],
              [0, "&nmid;"],
              [0, "&DoubleVerticalBar;"],
              [0, "&NotDoubleVerticalBar;"],
              [0, "&and;"],
              [0, "&or;"],
              [0, { v: "&cap;", n: 65024, o: "&caps;" }],
              [0, { v: "&cup;", n: 65024, o: "&cups;" }],
              [0, "&int;"],
              [0, "&Int;"],
              [0, "&iiint;"],
              [0, "&conint;"],
              [0, "&Conint;"],
              [0, "&Cconint;"],
              [0, "&cwint;"],
              [0, "&ClockwiseContourIntegral;"],
              [0, "&awconint;"],
              [0, "&there4;"],
              [0, "&becaus;"],
              [0, "&ratio;"],
              [0, "&Colon;"],
              [0, "&dotminus;"],
              [1, "&mDDot;"],
              [0, "&homtht;"],
              [0, { v: "&sim;", n: 8402, o: "&nvsim;" }],
              [0, { v: "&backsim;", n: 817, o: "&race;" }],
              [0, { v: "&ac;", n: 819, o: "&acE;" }],
              [0, "&acd;"],
              [0, "&VerticalTilde;"],
              [0, "&NotTilde;"],
              [0, { v: "&eqsim;", n: 824, o: "&nesim;" }],
              [0, "&sime;"],
              [0, "&NotTildeEqual;"],
              [0, "&cong;"],
              [0, "&simne;"],
              [0, "&ncong;"],
              [0, "&ap;"],
              [0, "&nap;"],
              [0, "&ape;"],
              [0, { v: "&apid;", n: 824, o: "&napid;" }],
              [0, "&backcong;"],
              [0, { v: "&asympeq;", n: 8402, o: "&nvap;" }],
              [0, { v: "&bump;", n: 824, o: "&nbump;" }],
              [0, { v: "&bumpe;", n: 824, o: "&nbumpe;" }],
              [0, { v: "&doteq;", n: 824, o: "&nedot;" }],
              [0, "&doteqdot;"],
              [0, "&efDot;"],
              [0, "&erDot;"],
              [0, "&Assign;"],
              [0, "&ecolon;"],
              [0, "&ecir;"],
              [0, "&circeq;"],
              [1, "&wedgeq;"],
              [0, "&veeeq;"],
              [1, "&triangleq;"],
              [2, "&equest;"],
              [0, "&ne;"],
              [0, { v: "&Congruent;", n: 8421, o: "&bnequiv;" }],
              [0, "&nequiv;"],
              [1, { v: "&le;", n: 8402, o: "&nvle;" }],
              [0, { v: "&ge;", n: 8402, o: "&nvge;" }],
              [0, { v: "&lE;", n: 824, o: "&nlE;" }],
              [0, { v: "&gE;", n: 824, o: "&ngE;" }],
              [0, { v: "&lnE;", n: 65024, o: "&lvertneqq;" }],
              [0, { v: "&gnE;", n: 65024, o: "&gvertneqq;" }],
              [
                0,
                {
                  v: "&ll;",
                  n: new Map(
                    n([
                      [824, "&nLtv;"],
                      [7577, "&nLt;"],
                    ])
                  ),
                },
              ],
              [
                0,
                {
                  v: "&gg;",
                  n: new Map(
                    n([
                      [824, "&nGtv;"],
                      [7577, "&nGt;"],
                    ])
                  ),
                },
              ],
              [0, "&between;"],
              [0, "&NotCupCap;"],
              [0, "&nless;"],
              [0, "&ngt;"],
              [0, "&nle;"],
              [0, "&nge;"],
              [0, "&lesssim;"],
              [0, "&GreaterTilde;"],
              [0, "&nlsim;"],
              [0, "&ngsim;"],
              [0, "&LessGreater;"],
              [0, "&gl;"],
              [0, "&NotLessGreater;"],
              [0, "&NotGreaterLess;"],
              [0, "&pr;"],
              [0, "&sc;"],
              [0, "&prcue;"],
              [0, "&sccue;"],
              [0, "&PrecedesTilde;"],
              [0, { v: "&scsim;", n: 824, o: "&NotSucceedsTilde;" }],
              [0, "&NotPrecedes;"],
              [0, "&NotSucceeds;"],
              [0, { v: "&sub;", n: 8402, o: "&NotSubset;" }],
              [0, { v: "&sup;", n: 8402, o: "&NotSuperset;" }],
              [0, "&nsub;"],
              [0, "&nsup;"],
              [0, "&sube;"],
              [0, "&supe;"],
              [0, "&NotSubsetEqual;"],
              [0, "&NotSupersetEqual;"],
              [0, { v: "&subne;", n: 65024, o: "&varsubsetneq;" }],
              [0, { v: "&supne;", n: 65024, o: "&varsupsetneq;" }],
              [1, "&cupdot;"],
              [0, "&UnionPlus;"],
              [0, { v: "&sqsub;", n: 824, o: "&NotSquareSubset;" }],
              [0, { v: "&sqsup;", n: 824, o: "&NotSquareSuperset;" }],
              [0, "&sqsube;"],
              [0, "&sqsupe;"],
              [0, { v: "&sqcap;", n: 65024, o: "&sqcaps;" }],
              [0, { v: "&sqcup;", n: 65024, o: "&sqcups;" }],
              [0, "&CirclePlus;"],
              [0, "&CircleMinus;"],
              [0, "&CircleTimes;"],
              [0, "&osol;"],
              [0, "&CircleDot;"],
              [0, "&circledcirc;"],
              [0, "&circledast;"],
              [1, "&circleddash;"],
              [0, "&boxplus;"],
              [0, "&boxminus;"],
              [0, "&boxtimes;"],
              [0, "&dotsquare;"],
              [0, "&RightTee;"],
              [0, "&dashv;"],
              [0, "&DownTee;"],
              [0, "&bot;"],
              [1, "&models;"],
              [0, "&DoubleRightTee;"],
              [0, "&Vdash;"],
              [0, "&Vvdash;"],
              [0, "&VDash;"],
              [0, "&nvdash;"],
              [0, "&nvDash;"],
              [0, "&nVdash;"],
              [0, "&nVDash;"],
              [0, "&prurel;"],
              [1, "&LeftTriangle;"],
              [0, "&RightTriangle;"],
              [0, { v: "&LeftTriangleEqual;", n: 8402, o: "&nvltrie;" }],
              [0, { v: "&RightTriangleEqual;", n: 8402, o: "&nvrtrie;" }],
              [0, "&origof;"],
              [0, "&imof;"],
              [0, "&multimap;"],
              [0, "&hercon;"],
              [0, "&intcal;"],
              [0, "&veebar;"],
              [1, "&barvee;"],
              [0, "&angrtvb;"],
              [0, "&lrtri;"],
              [0, "&bigwedge;"],
              [0, "&bigvee;"],
              [0, "&bigcap;"],
              [0, "&bigcup;"],
              [0, "&diam;"],
              [0, "&sdot;"],
              [0, "&sstarf;"],
              [0, "&divideontimes;"],
              [0, "&bowtie;"],
              [0, "&ltimes;"],
              [0, "&rtimes;"],
              [0, "&leftthreetimes;"],
              [0, "&rightthreetimes;"],
              [0, "&backsimeq;"],
              [0, "&curlyvee;"],
              [0, "&curlywedge;"],
              [0, "&Sub;"],
              [0, "&Sup;"],
              [0, "&Cap;"],
              [0, "&Cup;"],
              [0, "&fork;"],
              [0, "&epar;"],
              [0, "&lessdot;"],
              [0, "&gtdot;"],
              [0, { v: "&Ll;", n: 824, o: "&nLl;" }],
              [0, { v: "&Gg;", n: 824, o: "&nGg;" }],
              [0, { v: "&leg;", n: 65024, o: "&lesg;" }],
              [0, { v: "&gel;", n: 65024, o: "&gesl;" }],
              [2, "&cuepr;"],
              [0, "&cuesc;"],
              [0, "&NotPrecedesSlantEqual;"],
              [0, "&NotSucceedsSlantEqual;"],
              [0, "&NotSquareSubsetEqual;"],
              [0, "&NotSquareSupersetEqual;"],
              [2, "&lnsim;"],
              [0, "&gnsim;"],
              [0, "&precnsim;"],
              [0, "&scnsim;"],
              [0, "&nltri;"],
              [0, "&NotRightTriangle;"],
              [0, "&nltrie;"],
              [0, "&NotRightTriangleEqual;"],
              [0, "&vellip;"],
              [0, "&ctdot;"],
              [0, "&utdot;"],
              [0, "&dtdot;"],
              [0, "&disin;"],
              [0, "&isinsv;"],
              [0, "&isins;"],
              [0, { v: "&isindot;", n: 824, o: "&notindot;" }],
              [0, "&notinvc;"],
              [0, "&notinvb;"],
              [1, { v: "&isinE;", n: 824, o: "&notinE;" }],
              [0, "&nisd;"],
              [0, "&xnis;"],
              [0, "&nis;"],
              [0, "&notnivc;"],
              [0, "&notnivb;"],
              [6, "&barwed;"],
              [0, "&Barwed;"],
              [1, "&lceil;"],
              [0, "&rceil;"],
              [0, "&LeftFloor;"],
              [0, "&rfloor;"],
              [0, "&drcrop;"],
              [0, "&dlcrop;"],
              [0, "&urcrop;"],
              [0, "&ulcrop;"],
              [0, "&bnot;"],
              [1, "&profline;"],
              [0, "&profsurf;"],
              [1, "&telrec;"],
              [0, "&target;"],
              [5, "&ulcorn;"],
              [0, "&urcorn;"],
              [0, "&dlcorn;"],
              [0, "&drcorn;"],
              [2, "&frown;"],
              [0, "&smile;"],
              [9, "&cylcty;"],
              [0, "&profalar;"],
              [7, "&topbot;"],
              [6, "&ovbar;"],
              [1, "&solbar;"],
              [60, "&angzarr;"],
              [51, "&lmoustache;"],
              [0, "&rmoustache;"],
              [2, "&OverBracket;"],
              [0, "&bbrk;"],
              [0, "&bbrktbrk;"],
              [37, "&OverParenthesis;"],
              [0, "&UnderParenthesis;"],
              [0, "&OverBrace;"],
              [0, "&UnderBrace;"],
              [2, "&trpezium;"],
              [4, "&elinters;"],
              [59, "&blank;"],
              [164, "&circledS;"],
              [55, "&boxh;"],
              [1, "&boxv;"],
              [9, "&boxdr;"],
              [3, "&boxdl;"],
              [3, "&boxur;"],
              [3, "&boxul;"],
              [3, "&boxvr;"],
              [7, "&boxvl;"],
              [7, "&boxhd;"],
              [7, "&boxhu;"],
              [7, "&boxvh;"],
              [19, "&boxH;"],
              [0, "&boxV;"],
              [0, "&boxdR;"],
              [0, "&boxDr;"],
              [0, "&boxDR;"],
              [0, "&boxdL;"],
              [0, "&boxDl;"],
              [0, "&boxDL;"],
              [0, "&boxuR;"],
              [0, "&boxUr;"],
              [0, "&boxUR;"],
              [0, "&boxuL;"],
              [0, "&boxUl;"],
              [0, "&boxUL;"],
              [0, "&boxvR;"],
              [0, "&boxVr;"],
              [0, "&boxVR;"],
              [0, "&boxvL;"],
              [0, "&boxVl;"],
              [0, "&boxVL;"],
              [0, "&boxHd;"],
              [0, "&boxhD;"],
              [0, "&boxHD;"],
              [0, "&boxHu;"],
              [0, "&boxhU;"],
              [0, "&boxHU;"],
              [0, "&boxvH;"],
              [0, "&boxVh;"],
              [0, "&boxVH;"],
              [19, "&uhblk;"],
              [3, "&lhblk;"],
              [3, "&block;"],
              [8, "&blk14;"],
              [0, "&blk12;"],
              [0, "&blk34;"],
              [13, "&square;"],
              [8, "&blacksquare;"],
              [0, "&EmptyVerySmallSquare;"],
              [1, "&rect;"],
              [0, "&marker;"],
              [2, "&fltns;"],
              [1, "&bigtriangleup;"],
              [0, "&blacktriangle;"],
              [0, "&triangle;"],
              [2, "&blacktriangleright;"],
              [0, "&rtri;"],
              [3, "&bigtriangledown;"],
              [0, "&blacktriangledown;"],
              [0, "&dtri;"],
              [2, "&blacktriangleleft;"],
              [0, "&ltri;"],
              [6, "&loz;"],
              [0, "&cir;"],
              [32, "&tridot;"],
              [2, "&bigcirc;"],
              [8, "&ultri;"],
              [0, "&urtri;"],
              [0, "&lltri;"],
              [0, "&EmptySmallSquare;"],
              [0, "&FilledSmallSquare;"],
              [8, "&bigstar;"],
              [0, "&star;"],
              [7, "&phone;"],
              [49, "&female;"],
              [1, "&male;"],
              [29, "&spades;"],
              [2, "&clubs;"],
              [1, "&hearts;"],
              [0, "&diamondsuit;"],
              [3, "&sung;"],
              [2, "&flat;"],
              [0, "&natural;"],
              [0, "&sharp;"],
              [163, "&check;"],
              [3, "&cross;"],
              [8, "&malt;"],
              [21, "&sext;"],
              [33, "&VerticalSeparator;"],
              [25, "&lbbrk;"],
              [0, "&rbbrk;"],
              [84, "&bsolhsub;"],
              [0, "&suphsol;"],
              [28, "&LeftDoubleBracket;"],
              [0, "&RightDoubleBracket;"],
              [0, "&lang;"],
              [0, "&rang;"],
              [0, "&Lang;"],
              [0, "&Rang;"],
              [0, "&loang;"],
              [0, "&roang;"],
              [7, "&longleftarrow;"],
              [0, "&longrightarrow;"],
              [0, "&longleftrightarrow;"],
              [0, "&DoubleLongLeftArrow;"],
              [0, "&DoubleLongRightArrow;"],
              [0, "&DoubleLongLeftRightArrow;"],
              [1, "&longmapsto;"],
              [2, "&dzigrarr;"],
              [258, "&nvlArr;"],
              [0, "&nvrArr;"],
              [0, "&nvHarr;"],
              [0, "&Map;"],
              [6, "&lbarr;"],
              [0, "&bkarow;"],
              [0, "&lBarr;"],
              [0, "&dbkarow;"],
              [0, "&drbkarow;"],
              [0, "&DDotrahd;"],
              [0, "&UpArrowBar;"],
              [0, "&DownArrowBar;"],
              [2, "&Rarrtl;"],
              [2, "&latail;"],
              [0, "&ratail;"],
              [0, "&lAtail;"],
              [0, "&rAtail;"],
              [0, "&larrfs;"],
              [0, "&rarrfs;"],
              [0, "&larrbfs;"],
              [0, "&rarrbfs;"],
              [2, "&nwarhk;"],
              [0, "&nearhk;"],
              [0, "&hksearow;"],
              [0, "&hkswarow;"],
              [0, "&nwnear;"],
              [0, "&nesear;"],
              [0, "&seswar;"],
              [0, "&swnwar;"],
              [8, { v: "&rarrc;", n: 824, o: "&nrarrc;" }],
              [1, "&cudarrr;"],
              [0, "&ldca;"],
              [0, "&rdca;"],
              [0, "&cudarrl;"],
              [0, "&larrpl;"],
              [2, "&curarrm;"],
              [0, "&cularrp;"],
              [7, "&rarrpl;"],
              [2, "&harrcir;"],
              [0, "&Uarrocir;"],
              [0, "&lurdshar;"],
              [0, "&ldrushar;"],
              [2, "&LeftRightVector;"],
              [0, "&RightUpDownVector;"],
              [0, "&DownLeftRightVector;"],
              [0, "&LeftUpDownVector;"],
              [0, "&LeftVectorBar;"],
              [0, "&RightVectorBar;"],
              [0, "&RightUpVectorBar;"],
              [0, "&RightDownVectorBar;"],
              [0, "&DownLeftVectorBar;"],
              [0, "&DownRightVectorBar;"],
              [0, "&LeftUpVectorBar;"],
              [0, "&LeftDownVectorBar;"],
              [0, "&LeftTeeVector;"],
              [0, "&RightTeeVector;"],
              [0, "&RightUpTeeVector;"],
              [0, "&RightDownTeeVector;"],
              [0, "&DownLeftTeeVector;"],
              [0, "&DownRightTeeVector;"],
              [0, "&LeftUpTeeVector;"],
              [0, "&LeftDownTeeVector;"],
              [0, "&lHar;"],
              [0, "&uHar;"],
              [0, "&rHar;"],
              [0, "&dHar;"],
              [0, "&luruhar;"],
              [0, "&ldrdhar;"],
              [0, "&ruluhar;"],
              [0, "&rdldhar;"],
              [0, "&lharul;"],
              [0, "&llhard;"],
              [0, "&rharul;"],
              [0, "&lrhard;"],
              [0, "&udhar;"],
              [0, "&duhar;"],
              [0, "&RoundImplies;"],
              [0, "&erarr;"],
              [0, "&simrarr;"],
              [0, "&larrsim;"],
              [0, "&rarrsim;"],
              [0, "&rarrap;"],
              [0, "&ltlarr;"],
              [1, "&gtrarr;"],
              [0, "&subrarr;"],
              [1, "&suplarr;"],
              [0, "&lfisht;"],
              [0, "&rfisht;"],
              [0, "&ufisht;"],
              [0, "&dfisht;"],
              [5, "&lopar;"],
              [0, "&ropar;"],
              [4, "&lbrke;"],
              [0, "&rbrke;"],
              [0, "&lbrkslu;"],
              [0, "&rbrksld;"],
              [0, "&lbrksld;"],
              [0, "&rbrkslu;"],
              [0, "&langd;"],
              [0, "&rangd;"],
              [0, "&lparlt;"],
              [0, "&rpargt;"],
              [0, "&gtlPar;"],
              [0, "&ltrPar;"],
              [3, "&vzigzag;"],
              [1, "&vangrt;"],
              [0, "&angrtvbd;"],
              [6, "&ange;"],
              [0, "&range;"],
              [0, "&dwangle;"],
              [0, "&uwangle;"],
              [0, "&angmsdaa;"],
              [0, "&angmsdab;"],
              [0, "&angmsdac;"],
              [0, "&angmsdad;"],
              [0, "&angmsdae;"],
              [0, "&angmsdaf;"],
              [0, "&angmsdag;"],
              [0, "&angmsdah;"],
              [0, "&bemptyv;"],
              [0, "&demptyv;"],
              [0, "&cemptyv;"],
              [0, "&raemptyv;"],
              [0, "&laemptyv;"],
              [0, "&ohbar;"],
              [0, "&omid;"],
              [0, "&opar;"],
              [1, "&operp;"],
              [1, "&olcross;"],
              [0, "&odsold;"],
              [1, "&olcir;"],
              [0, "&ofcir;"],
              [0, "&olt;"],
              [0, "&ogt;"],
              [0, "&cirscir;"],
              [0, "&cirE;"],
              [0, "&solb;"],
              [0, "&bsolb;"],
              [3, "&boxbox;"],
              [3, "&trisb;"],
              [0, "&rtriltri;"],
              [
                0,
                { v: "&LeftTriangleBar;", n: 824, o: "&NotLeftTriangleBar;" },
              ],
              [
                0,
                { v: "&RightTriangleBar;", n: 824, o: "&NotRightTriangleBar;" },
              ],
              [11, "&iinfin;"],
              [0, "&infintie;"],
              [0, "&nvinfin;"],
              [4, "&eparsl;"],
              [0, "&smeparsl;"],
              [0, "&eqvparsl;"],
              [5, "&blacklozenge;"],
              [8, "&RuleDelayed;"],
              [1, "&dsol;"],
              [9, "&bigodot;"],
              [0, "&bigoplus;"],
              [0, "&bigotimes;"],
              [1, "&biguplus;"],
              [1, "&bigsqcup;"],
              [5, "&iiiint;"],
              [0, "&fpartint;"],
              [2, "&cirfnint;"],
              [0, "&awint;"],
              [0, "&rppolint;"],
              [0, "&scpolint;"],
              [0, "&npolint;"],
              [0, "&pointint;"],
              [0, "&quatint;"],
              [0, "&intlarhk;"],
              [10, "&pluscir;"],
              [0, "&plusacir;"],
              [0, "&simplus;"],
              [0, "&plusdu;"],
              [0, "&plussim;"],
              [0, "&plustwo;"],
              [1, "&mcomma;"],
              [0, "&minusdu;"],
              [2, "&loplus;"],
              [0, "&roplus;"],
              [0, "&Cross;"],
              [0, "&timesd;"],
              [0, "&timesbar;"],
              [1, "&smashp;"],
              [0, "&lotimes;"],
              [0, "&rotimes;"],
              [0, "&otimesas;"],
              [0, "&Otimes;"],
              [0, "&odiv;"],
              [0, "&triplus;"],
              [0, "&triminus;"],
              [0, "&tritime;"],
              [0, "&intprod;"],
              [2, "&amalg;"],
              [0, "&capdot;"],
              [1, "&ncup;"],
              [0, "&ncap;"],
              [0, "&capand;"],
              [0, "&cupor;"],
              [0, "&cupcap;"],
              [0, "&capcup;"],
              [0, "&cupbrcap;"],
              [0, "&capbrcup;"],
              [0, "&cupcup;"],
              [0, "&capcap;"],
              [0, "&ccups;"],
              [0, "&ccaps;"],
              [2, "&ccupssm;"],
              [2, "&And;"],
              [0, "&Or;"],
              [0, "&andand;"],
              [0, "&oror;"],
              [0, "&orslope;"],
              [0, "&andslope;"],
              [1, "&andv;"],
              [0, "&orv;"],
              [0, "&andd;"],
              [0, "&ord;"],
              [1, "&wedbar;"],
              [6, "&sdote;"],
              [3, "&simdot;"],
              [2, { v: "&congdot;", n: 824, o: "&ncongdot;" }],
              [0, "&easter;"],
              [0, "&apacir;"],
              [0, { v: "&apE;", n: 824, o: "&napE;" }],
              [0, "&eplus;"],
              [0, "&pluse;"],
              [0, "&Esim;"],
              [0, "&Colone;"],
              [0, "&Equal;"],
              [1, "&ddotseq;"],
              [0, "&equivDD;"],
              [0, "&ltcir;"],
              [0, "&gtcir;"],
              [0, "&ltquest;"],
              [0, "&gtquest;"],
              [0, { v: "&leqslant;", n: 824, o: "&nleqslant;" }],
              [0, { v: "&geqslant;", n: 824, o: "&ngeqslant;" }],
              [0, "&lesdot;"],
              [0, "&gesdot;"],
              [0, "&lesdoto;"],
              [0, "&gesdoto;"],
              [0, "&lesdotor;"],
              [0, "&gesdotol;"],
              [0, "&lap;"],
              [0, "&gap;"],
              [0, "&lne;"],
              [0, "&gne;"],
              [0, "&lnap;"],
              [0, "&gnap;"],
              [0, "&lEg;"],
              [0, "&gEl;"],
              [0, "&lsime;"],
              [0, "&gsime;"],
              [0, "&lsimg;"],
              [0, "&gsiml;"],
              [0, "&lgE;"],
              [0, "&glE;"],
              [0, "&lesges;"],
              [0, "&gesles;"],
              [0, "&els;"],
              [0, "&egs;"],
              [0, "&elsdot;"],
              [0, "&egsdot;"],
              [0, "&el;"],
              [0, "&eg;"],
              [2, "&siml;"],
              [0, "&simg;"],
              [0, "&simlE;"],
              [0, "&simgE;"],
              [0, { v: "&LessLess;", n: 824, o: "&NotNestedLessLess;" }],
              [
                0,
                {
                  v: "&GreaterGreater;",
                  n: 824,
                  o: "&NotNestedGreaterGreater;",
                },
              ],
              [1, "&glj;"],
              [0, "&gla;"],
              [0, "&ltcc;"],
              [0, "&gtcc;"],
              [0, "&lescc;"],
              [0, "&gescc;"],
              [0, "&smt;"],
              [0, "&lat;"],
              [0, { v: "&smte;", n: 65024, o: "&smtes;" }],
              [0, { v: "&late;", n: 65024, o: "&lates;" }],
              [0, "&bumpE;"],
              [0, { v: "&PrecedesEqual;", n: 824, o: "&NotPrecedesEqual;" }],
              [0, { v: "&sce;", n: 824, o: "&NotSucceedsEqual;" }],
              [2, "&prE;"],
              [0, "&scE;"],
              [0, "&precneqq;"],
              [0, "&scnE;"],
              [0, "&prap;"],
              [0, "&scap;"],
              [0, "&precnapprox;"],
              [0, "&scnap;"],
              [0, "&Pr;"],
              [0, "&Sc;"],
              [0, "&subdot;"],
              [0, "&supdot;"],
              [0, "&subplus;"],
              [0, "&supplus;"],
              [0, "&submult;"],
              [0, "&supmult;"],
              [0, "&subedot;"],
              [0, "&supedot;"],
              [0, { v: "&subE;", n: 824, o: "&nsubE;" }],
              [0, { v: "&supE;", n: 824, o: "&nsupE;" }],
              [0, "&subsim;"],
              [0, "&supsim;"],
              [2, { v: "&subnE;", n: 65024, o: "&varsubsetneqq;" }],
              [0, { v: "&supnE;", n: 65024, o: "&varsupsetneqq;" }],
              [2, "&csub;"],
              [0, "&csup;"],
              [0, "&csube;"],
              [0, "&csupe;"],
              [0, "&subsup;"],
              [0, "&supsub;"],
              [0, "&subsub;"],
              [0, "&supsup;"],
              [0, "&suphsub;"],
              [0, "&supdsub;"],
              [0, "&forkv;"],
              [0, "&topfork;"],
              [0, "&mlcp;"],
              [8, "&Dashv;"],
              [1, "&Vdashl;"],
              [0, "&Barv;"],
              [0, "&vBar;"],
              [0, "&vBarv;"],
              [1, "&Vbar;"],
              [0, "&Not;"],
              [0, "&bNot;"],
              [0, "&rnmid;"],
              [0, "&cirmid;"],
              [0, "&midcir;"],
              [0, "&topcir;"],
              [0, "&nhpar;"],
              [0, "&parsim;"],
              [9, { v: "&parsl;", n: 8421, o: "&nparsl;" }],
              [
                44343,
                {
                  n: new Map(
                    n([
                      [56476, "&Ascr;"],
                      [1, "&Cscr;"],
                      [0, "&Dscr;"],
                      [2, "&Gscr;"],
                      [2, "&Jscr;"],
                      [0, "&Kscr;"],
                      [2, "&Nscr;"],
                      [0, "&Oscr;"],
                      [0, "&Pscr;"],
                      [0, "&Qscr;"],
                      [1, "&Sscr;"],
                      [0, "&Tscr;"],
                      [0, "&Uscr;"],
                      [0, "&Vscr;"],
                      [0, "&Wscr;"],
                      [0, "&Xscr;"],
                      [0, "&Yscr;"],
                      [0, "&Zscr;"],
                      [0, "&ascr;"],
                      [0, "&bscr;"],
                      [0, "&cscr;"],
                      [0, "&dscr;"],
                      [1, "&fscr;"],
                      [1, "&hscr;"],
                      [0, "&iscr;"],
                      [0, "&jscr;"],
                      [0, "&kscr;"],
                      [0, "&lscr;"],
                      [0, "&mscr;"],
                      [0, "&nscr;"],
                      [1, "&pscr;"],
                      [0, "&qscr;"],
                      [0, "&rscr;"],
                      [0, "&sscr;"],
                      [0, "&tscr;"],
                      [0, "&uscr;"],
                      [0, "&vscr;"],
                      [0, "&wscr;"],
                      [0, "&xscr;"],
                      [0, "&yscr;"],
                      [0, "&zscr;"],
                      [52, "&Afr;"],
                      [0, "&Bfr;"],
                      [1, "&Dfr;"],
                      [0, "&Efr;"],
                      [0, "&Ffr;"],
                      [0, "&Gfr;"],
                      [2, "&Jfr;"],
                      [0, "&Kfr;"],
                      [0, "&Lfr;"],
                      [0, "&Mfr;"],
                      [0, "&Nfr;"],
                      [0, "&Ofr;"],
                      [0, "&Pfr;"],
                      [0, "&Qfr;"],
                      [1, "&Sfr;"],
                      [0, "&Tfr;"],
                      [0, "&Ufr;"],
                      [0, "&Vfr;"],
                      [0, "&Wfr;"],
                      [0, "&Xfr;"],
                      [0, "&Yfr;"],
                      [1, "&afr;"],
                      [0, "&bfr;"],
                      [0, "&cfr;"],
                      [0, "&dfr;"],
                      [0, "&efr;"],
                      [0, "&ffr;"],
                      [0, "&gfr;"],
                      [0, "&hfr;"],
                      [0, "&ifr;"],
                      [0, "&jfr;"],
                      [0, "&kfr;"],
                      [0, "&lfr;"],
                      [0, "&mfr;"],
                      [0, "&nfr;"],
                      [0, "&ofr;"],
                      [0, "&pfr;"],
                      [0, "&qfr;"],
                      [0, "&rfr;"],
                      [0, "&sfr;"],
                      [0, "&tfr;"],
                      [0, "&ufr;"],
                      [0, "&vfr;"],
                      [0, "&wfr;"],
                      [0, "&xfr;"],
                      [0, "&yfr;"],
                      [0, "&zfr;"],
                      [0, "&Aopf;"],
                      [0, "&Bopf;"],
                      [1, "&Dopf;"],
                      [0, "&Eopf;"],
                      [0, "&Fopf;"],
                      [0, "&Gopf;"],
                      [1, "&Iopf;"],
                      [0, "&Jopf;"],
                      [0, "&Kopf;"],
                      [0, "&Lopf;"],
                      [0, "&Mopf;"],
                      [1, "&Oopf;"],
                      [3, "&Sopf;"],
                      [0, "&Topf;"],
                      [0, "&Uopf;"],
                      [0, "&Vopf;"],
                      [0, "&Wopf;"],
                      [0, "&Xopf;"],
                      [0, "&Yopf;"],
                      [1, "&aopf;"],
                      [0, "&bopf;"],
                      [0, "&copf;"],
                      [0, "&dopf;"],
                      [0, "&eopf;"],
                      [0, "&fopf;"],
                      [0, "&gopf;"],
                      [0, "&hopf;"],
                      [0, "&iopf;"],
                      [0, "&jopf;"],
                      [0, "&kopf;"],
                      [0, "&lopf;"],
                      [0, "&mopf;"],
                      [0, "&nopf;"],
                      [0, "&oopf;"],
                      [0, "&popf;"],
                      [0, "&qopf;"],
                      [0, "&ropf;"],
                      [0, "&sopf;"],
                      [0, "&topf;"],
                      [0, "&uopf;"],
                      [0, "&vopf;"],
                      [0, "&wopf;"],
                      [0, "&xopf;"],
                      [0, "&yopf;"],
                      [0, "&zopf;"],
                    ])
                  ),
                },
              ],
              [8906, "&fflig;"],
              [0, "&filig;"],
              [0, "&fllig;"],
              [0, "&ffilig;"],
              [0, "&ffllig;"],
            ])
          ));
      },
      {},
    ],
    57: [
      function (e, t, r) {
        "use strict";
        function n(e, t) {
          void 0 === t && (t = a.XML);
          var r = "number" == typeof t ? t : t.level;
          if (r === a.HTML) {
            var n = "object" == typeof t ? t.mode : void 0;
            return (0, c.decodeHTML)(e, n);
          }
          return (0, c.decodeXML)(e);
        }
        function i(e, t) {
          var r;
          void 0 === t && (t = a.XML);
          var i = "number" == typeof t ? { level: t } : t;
          return (
            (null !== (r = i.mode) && void 0 !== r) ||
              (i.mode = c.DecodingMode.Strict),
            n(e, i)
          );
        }
        function s(e, t) {
          void 0 === t && (t = a.XML);
          var r = "number" == typeof t ? { level: t } : t;
          return r.mode === o.UTF8
            ? (0, l.escapeUTF8)(e)
            : r.mode === o.Attribute
            ? (0, l.escapeAttribute)(e)
            : r.mode === o.Text
            ? (0, l.escapeText)(e)
            : r.level === a.HTML
            ? r.mode === o.ASCII
              ? (0, u.encodeNonAsciiHTML)(e)
              : (0, u.encodeHTML)(e)
            : (0, l.encodeXML)(e);
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.decodeXMLStrict =
            r.decodeHTML5Strict =
            r.decodeHTML4Strict =
            r.decodeHTML5 =
            r.decodeHTML4 =
            r.decodeHTMLAttribute =
            r.decodeHTMLStrict =
            r.decodeHTML =
            r.decodeXML =
            r.DecodingMode =
            r.EntityDecoder =
            r.encodeHTML5 =
            r.encodeHTML4 =
            r.encodeNonAsciiHTML =
            r.encodeHTML =
            r.escapeText =
            r.escapeAttribute =
            r.escapeUTF8 =
            r.escape =
            r.encodeXML =
            r.encode =
            r.decodeStrict =
            r.decode =
            r.EncodingMode =
            r.EntityLevel =
              void 0);
        var a,
          o,
          c = e("./decode.js"),
          u = e("./encode.js"),
          l = e("./escape.js");
        (function (e) {
          (e[(e.XML = 0)] = "XML"), (e[(e.HTML = 1)] = "HTML");
        })((a = r.EntityLevel || (r.EntityLevel = {}))),
          (function (e) {
            (e[(e.UTF8 = 0)] = "UTF8"),
              (e[(e.ASCII = 1)] = "ASCII"),
              (e[(e.Extensive = 2)] = "Extensive"),
              (e[(e.Attribute = 3)] = "Attribute"),
              (e[(e.Text = 4)] = "Text");
          })((o = r.EncodingMode || (r.EncodingMode = {}))),
          (r.decode = n),
          (r.decodeStrict = i),
          (r.encode = s);
        var h = e("./escape.js");
        Object.defineProperty(r, "encodeXML", {
          enumerable: !0,
          get: function () {
            return h.encodeXML;
          },
        }),
          Object.defineProperty(r, "escape", {
            enumerable: !0,
            get: function () {
              return h.escape;
            },
          }),
          Object.defineProperty(r, "escapeUTF8", {
            enumerable: !0,
            get: function () {
              return h.escapeUTF8;
            },
          }),
          Object.defineProperty(r, "escapeAttribute", {
            enumerable: !0,
            get: function () {
              return h.escapeAttribute;
            },
          }),
          Object.defineProperty(r, "escapeText", {
            enumerable: !0,
            get: function () {
              return h.escapeText;
            },
          });
        var T = e("./encode.js");
        Object.defineProperty(r, "encodeHTML", {
          enumerable: !0,
          get: function () {
            return T.encodeHTML;
          },
        }),
          Object.defineProperty(r, "encodeNonAsciiHTML", {
            enumerable: !0,
            get: function () {
              return T.encodeNonAsciiHTML;
            },
          }),
          Object.defineProperty(r, "encodeHTML4", {
            enumerable: !0,
            get: function () {
              return T.encodeHTML;
            },
          }),
          Object.defineProperty(r, "encodeHTML5", {
            enumerable: !0,
            get: function () {
              return T.encodeHTML;
            },
          });
        var d = e("./decode.js");
        Object.defineProperty(r, "EntityDecoder", {
          enumerable: !0,
          get: function () {
            return d.EntityDecoder;
          },
        }),
          Object.defineProperty(r, "DecodingMode", {
            enumerable: !0,
            get: function () {
              return d.DecodingMode;
            },
          }),
          Object.defineProperty(r, "decodeXML", {
            enumerable: !0,
            get: function () {
              return d.decodeXML;
            },
          }),
          Object.defineProperty(r, "decodeHTML", {
            enumerable: !0,
            get: function () {
              return d.decodeHTML;
            },
          }),
          Object.defineProperty(r, "decodeHTMLStrict", {
            enumerable: !0,
            get: function () {
              return d.decodeHTMLStrict;
            },
          }),
          Object.defineProperty(r, "decodeHTMLAttribute", {
            enumerable: !0,
            get: function () {
              return d.decodeHTMLAttribute;
            },
          }),
          Object.defineProperty(r, "decodeHTML4", {
            enumerable: !0,
            get: function () {
              return d.decodeHTML;
            },
          }),
          Object.defineProperty(r, "decodeHTML5", {
            enumerable: !0,
            get: function () {
              return d.decodeHTML;
            },
          }),
          Object.defineProperty(r, "decodeHTML4Strict", {
            enumerable: !0,
            get: function () {
              return d.decodeHTMLStrict;
            },
          }),
          Object.defineProperty(r, "decodeHTML5Strict", {
            enumerable: !0,
            get: function () {
              return d.decodeHTMLStrict;
            },
          }),
          Object.defineProperty(r, "decodeXMLStrict", {
            enumerable: !0,
            get: function () {
              return d.decodeXML;
            },
          });
      },
      { "./decode.js": 50, "./encode.js": 52, "./escape.js": 53 },
    ],
    58: [
      function (e, t, r) {
        "use strict";
        var n =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, r, n) {
                  void 0 === n && (n = r);
                  var i = Object.getOwnPropertyDescriptor(t, r);
                  (i &&
                    ("get" in i
                      ? t.__esModule
                      : !i.writable && !i.configurable)) ||
                    (i = {
                      enumerable: !0,
                      get: function () {
                        return t[r];
                      },
                    }),
                    Object.defineProperty(e, n, i);
                }
              : function (e, t, r, n) {
                  void 0 === n && (n = r), (e[n] = t[r]);
                }),
          i =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, t) {
                  Object.defineProperty(e, "default", {
                    enumerable: !0,
                    value: t,
                  });
                }
              : function (e, t) {
                  e.default = t;
                }),
          s =
            (this && this.__importStar) ||
            function (e) {
              if (e && e.__esModule) return e;
              var t = {};
              if (null != e)
                for (var r in e)
                  "default" !== r &&
                    Object.prototype.hasOwnProperty.call(e, r) &&
                    n(t, e, r);
              return i(t, e), t;
            };
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.Parser = void 0);
        var a = s(e("./Tokenizer.js")),
          o = e("entities/lib/decode.js"),
          c = new Set([
            "input",
            "option",
            "optgroup",
            "select",
            "button",
            "datalist",
            "textarea",
          ]),
          u = new Set(["p"]),
          l = new Set(["thead", "tbody"]),
          h = new Set(["dd", "dt"]),
          T = new Set(["rt", "rp"]),
          d = new Map([
            ["tr", new Set(["tr", "th", "td"])],
            ["th", new Set(["th"])],
            ["td", new Set(["thead", "th", "td"])],
            ["body", new Set(["head", "link", "script"])],
            ["li", new Set(["li"])],
            ["p", u],
            ["h1", u],
            ["h2", u],
            ["h3", u],
            ["h4", u],
            ["h5", u],
            ["h6", u],
            ["select", c],
            ["input", c],
            ["output", c],
            ["button", c],
            ["datalist", c],
            ["textarea", c],
            ["option", new Set(["option"])],
            ["optgroup", new Set(["optgroup", "option"])],
            ["dd", h],
            ["dt", h],
            ["address", u],
            ["article", u],
            ["aside", u],
            ["blockquote", u],
            ["details", u],
            ["div", u],
            ["dl", u],
            ["fieldset", u],
            ["figcaption", u],
            ["figure", u],
            ["footer", u],
            ["form", u],
            ["header", u],
            ["hr", u],
            ["main", u],
            ["nav", u],
            ["ol", u],
            ["pre", u],
            ["section", u],
            ["table", u],
            ["ul", u],
            ["rt", T],
            ["rp", T],
            ["tbody", l],
            ["tfoot", l],
          ]),
          E = new Set([
            "area",
            "base",
            "basefont",
            "br",
            "col",
            "command",
            "embed",
            "frame",
            "hr",
            "img",
            "input",
            "isindex",
            "keygen",
            "link",
            "meta",
            "param",
            "source",
            "track",
            "wbr",
          ]),
          p = new Set(["math", "svg"]),
          f = new Set([
            "mi",
            "mo",
            "mn",
            "ms",
            "mtext",
            "annotation-xml",
            "foreignobject",
            "desc",
            "title",
          ]),
          _ = /\s|\//,
          A = (function () {
            function e(e, t) {
              var r, n, i, s, o;
              void 0 === t && (t = {}),
                (this.options = t),
                (this.startIndex = 0),
                (this.endIndex = 0),
                (this.openTagStart = 0),
                (this.tagname = ""),
                (this.attribname = ""),
                (this.attribvalue = ""),
                (this.attribs = null),
                (this.stack = []),
                (this.foreignContext = []),
                (this.buffers = []),
                (this.bufferOffset = 0),
                (this.writeIndex = 0),
                (this.ended = !1),
                (this.cbs = null != e ? e : {}),
                (this.lowerCaseTagNames =
                  null !== (r = t.lowerCaseTags) && void 0 !== r
                    ? r
                    : !t.xmlMode),
                (this.lowerCaseAttributeNames =
                  null !== (n = t.lowerCaseAttributeNames) && void 0 !== n
                    ? n
                    : !t.xmlMode),
                (this.tokenizer = new (
                  null !== (i = t.Tokenizer) && void 0 !== i ? i : a.default
                )(this.options, this)),
                null === (o = (s = this.cbs).onparserinit) ||
                  void 0 === o ||
                  o.call(s, this);
            }
            return (
              (e.prototype.ontext = function (e, t) {
                var r,
                  n,
                  i = this.getSlice(e, t);
                (this.endIndex = t - 1),
                  null === (n = (r = this.cbs).ontext) ||
                    void 0 === n ||
                    n.call(r, i),
                  (this.startIndex = t);
              }),
              (e.prototype.ontextentity = function (e) {
                var t,
                  r,
                  n = this.tokenizer.getSectionStart();
                (this.endIndex = n - 1),
                  null === (r = (t = this.cbs).ontext) ||
                    void 0 === r ||
                    r.call(t, (0, o.fromCodePoint)(e)),
                  (this.startIndex = n);
              }),
              (e.prototype.isVoidElement = function (e) {
                return !this.options.xmlMode && E.has(e);
              }),
              (e.prototype.onopentagname = function (e, t) {
                this.endIndex = t;
                var r = this.getSlice(e, t);
                this.lowerCaseTagNames && (r = r.toLowerCase()),
                  this.emitOpenTag(r);
              }),
              (e.prototype.emitOpenTag = function (e) {
                var t, r, n, i;
                (this.openTagStart = this.startIndex), (this.tagname = e);
                var s = !this.options.xmlMode && d.get(e);
                if (s)
                  for (
                    ;
                    this.stack.length > 0 &&
                    s.has(this.stack[this.stack.length - 1]);

                  ) {
                    var a = this.stack.pop();
                    null === (r = (t = this.cbs).onclosetag) ||
                      void 0 === r ||
                      r.call(t, a, !0);
                  }
                this.isVoidElement(e) ||
                  (this.stack.push(e),
                  p.has(e)
                    ? this.foreignContext.push(!0)
                    : f.has(e) && this.foreignContext.push(!1)),
                  null === (i = (n = this.cbs).onopentagname) ||
                    void 0 === i ||
                    i.call(n, e),
                  this.cbs.onopentag && (this.attribs = {});
              }),
              (e.prototype.endOpenTag = function (e) {
                var t, r;
                (this.startIndex = this.openTagStart),
                  this.attribs &&
                    (null === (r = (t = this.cbs).onopentag) ||
                      void 0 === r ||
                      r.call(t, this.tagname, this.attribs, e),
                    (this.attribs = null)),
                  this.cbs.onclosetag &&
                    this.isVoidElement(this.tagname) &&
                    this.cbs.onclosetag(this.tagname, !0),
                  (this.tagname = "");
              }),
              (e.prototype.onopentagend = function (e) {
                (this.endIndex = e),
                  this.endOpenTag(!1),
                  (this.startIndex = e + 1);
              }),
              (e.prototype.onclosetag = function (e, t) {
                var r, n, i, s, a, o;
                this.endIndex = t;
                var c = this.getSlice(e, t);
                if (
                  (this.lowerCaseTagNames && (c = c.toLowerCase()),
                  (p.has(c) || f.has(c)) && this.foreignContext.pop(),
                  this.isVoidElement(c))
                )
                  this.options.xmlMode ||
                    "br" !== c ||
                    (null === (n = (r = this.cbs).onopentagname) ||
                      void 0 === n ||
                      n.call(r, "br"),
                    null === (s = (i = this.cbs).onopentag) ||
                      void 0 === s ||
                      s.call(i, "br", {}, !0),
                    null === (o = (a = this.cbs).onclosetag) ||
                      void 0 === o ||
                      o.call(a, "br", !1));
                else {
                  var u = this.stack.lastIndexOf(c);
                  if (-1 !== u)
                    if (this.cbs.onclosetag)
                      for (var l = this.stack.length - u; l--; )
                        this.cbs.onclosetag(this.stack.pop(), 0 !== l);
                    else this.stack.length = u;
                  else
                    this.options.xmlMode ||
                      "p" !== c ||
                      (this.emitOpenTag("p"), this.closeCurrentTag(!0));
                }
                this.startIndex = t + 1;
              }),
              (e.prototype.onselfclosingtag = function (e) {
                (this.endIndex = e),
                  this.options.xmlMode ||
                  this.options.recognizeSelfClosing ||
                  this.foreignContext[this.foreignContext.length - 1]
                    ? (this.closeCurrentTag(!1), (this.startIndex = e + 1))
                    : this.onopentagend(e);
              }),
              (e.prototype.closeCurrentTag = function (e) {
                var t,
                  r,
                  n = this.tagname;
                this.endOpenTag(e),
                  this.stack[this.stack.length - 1] === n &&
                    (null === (r = (t = this.cbs).onclosetag) ||
                      void 0 === r ||
                      r.call(t, n, !e),
                    this.stack.pop());
              }),
              (e.prototype.onattribname = function (e, t) {
                this.startIndex = e;
                var r = this.getSlice(e, t);
                this.attribname = this.lowerCaseAttributeNames
                  ? r.toLowerCase()
                  : r;
              }),
              (e.prototype.onattribdata = function (e, t) {
                this.attribvalue += this.getSlice(e, t);
              }),
              (e.prototype.onattribentity = function (e) {
                this.attribvalue += (0, o.fromCodePoint)(e);
              }),
              (e.prototype.onattribend = function (e, t) {
                var r, n;
                (this.endIndex = t),
                  null === (n = (r = this.cbs).onattribute) ||
                    void 0 === n ||
                    n.call(
                      r,
                      this.attribname,
                      this.attribvalue,
                      e === a.QuoteType.Double
                        ? '"'
                        : e === a.QuoteType.Single
                        ? "'"
                        : e === a.QuoteType.NoValue
                        ? void 0
                        : null
                    ),
                  this.attribs &&
                    !Object.prototype.hasOwnProperty.call(
                      this.attribs,
                      this.attribname
                    ) &&
                    (this.attribs[this.attribname] = this.attribvalue),
                  (this.attribvalue = "");
              }),
              (e.prototype.getInstructionName = function (e) {
                var t = e.search(_),
                  r = t < 0 ? e : e.substr(0, t);
                return this.lowerCaseTagNames && (r = r.toLowerCase()), r;
              }),
              (e.prototype.ondeclaration = function (e, t) {
                this.endIndex = t;
                var r = this.getSlice(e, t);
                if (this.cbs.onprocessinginstruction) {
                  var n = this.getInstructionName(r);
                  this.cbs.onprocessinginstruction(
                    "!".concat(n),
                    "!".concat(r)
                  );
                }
                this.startIndex = t + 1;
              }),
              (e.prototype.onprocessinginstruction = function (e, t) {
                this.endIndex = t;
                var r = this.getSlice(e, t);
                if (this.cbs.onprocessinginstruction) {
                  var n = this.getInstructionName(r);
                  this.cbs.onprocessinginstruction(
                    "?".concat(n),
                    "?".concat(r)
                  );
                }
                this.startIndex = t + 1;
              }),
              (e.prototype.oncomment = function (e, t, r) {
                var n, i, s, a;
                (this.endIndex = t),
                  null === (i = (n = this.cbs).oncomment) ||
                    void 0 === i ||
                    i.call(n, this.getSlice(e, t - r)),
                  null === (a = (s = this.cbs).oncommentend) ||
                    void 0 === a ||
                    a.call(s),
                  (this.startIndex = t + 1);
              }),
              (e.prototype.oncdata = function (e, t, r) {
                var n, i, s, a, o, c, u, l, h, T;
                this.endIndex = t;
                var d = this.getSlice(e, t - r);
                this.options.xmlMode || this.options.recognizeCDATA
                  ? (null === (i = (n = this.cbs).oncdatastart) ||
                      void 0 === i ||
                      i.call(n),
                    null === (a = (s = this.cbs).ontext) ||
                      void 0 === a ||
                      a.call(s, d),
                    null === (c = (o = this.cbs).oncdataend) ||
                      void 0 === c ||
                      c.call(o))
                  : (null === (l = (u = this.cbs).oncomment) ||
                      void 0 === l ||
                      l.call(u, "[CDATA[".concat(d, "]]")),
                    null === (T = (h = this.cbs).oncommentend) ||
                      void 0 === T ||
                      T.call(h)),
                  (this.startIndex = t + 1);
              }),
              (e.prototype.onend = function () {
                var e, t;
                if (this.cbs.onclosetag) {
                  this.endIndex = this.startIndex;
                  for (
                    var r = this.stack.length;
                    r > 0;
                    this.cbs.onclosetag(this.stack[--r], !0)
                  );
                }
                null === (t = (e = this.cbs).onend) ||
                  void 0 === t ||
                  t.call(e);
              }),
              (e.prototype.reset = function () {
                var e, t, r, n;
                null === (t = (e = this.cbs).onreset) ||
                  void 0 === t ||
                  t.call(e),
                  this.tokenizer.reset(),
                  (this.tagname = ""),
                  (this.attribname = ""),
                  (this.attribs = null),
                  (this.stack.length = 0),
                  (this.startIndex = 0),
                  (this.endIndex = 0),
                  null === (n = (r = this.cbs).onparserinit) ||
                    void 0 === n ||
                    n.call(r, this),
                  (this.buffers.length = 0),
                  (this.bufferOffset = 0),
                  (this.writeIndex = 0),
                  (this.ended = !1);
              }),
              (e.prototype.parseComplete = function (e) {
                this.reset(), this.end(e);
              }),
              (e.prototype.getSlice = function (e, t) {
                for (; e - this.bufferOffset >= this.buffers[0].length; )
                  this.shiftBuffer();
                for (
                  var r = this.buffers[0].slice(
                    e - this.bufferOffset,
                    t - this.bufferOffset
                  );
                  t - this.bufferOffset > this.buffers[0].length;

                )
                  this.shiftBuffer(),
                    (r += this.buffers[0].slice(0, t - this.bufferOffset));
                return r;
              }),
              (e.prototype.shiftBuffer = function () {
                (this.bufferOffset += this.buffers[0].length),
                  this.writeIndex--,
                  this.buffers.shift();
              }),
              (e.prototype.write = function (e) {
                var t, r;
                this.ended
                  ? null === (r = (t = this.cbs).onerror) ||
                    void 0 === r ||
                    r.call(t, new Error(".write() after done!"))
                  : (this.buffers.push(e),
                    this.tokenizer.running &&
                      (this.tokenizer.write(e), this.writeIndex++));
              }),
              (e.prototype.end = function (e) {
                var t, r;
                this.ended
                  ? null === (r = (t = this.cbs).onerror) ||
                    void 0 === r ||
                    r.call(t, new Error(".end() after done!"))
                  : (e && this.write(e),
                    (this.ended = !0),
                    this.tokenizer.end());
              }),
              (e.prototype.pause = function () {
                this.tokenizer.pause();
              }),
              (e.prototype.resume = function () {
                for (
                  this.tokenizer.resume();
                  this.tokenizer.running &&
                  this.writeIndex < this.buffers.length;

                )
                  this.tokenizer.write(this.buffers[this.writeIndex++]);
                this.ended && this.tokenizer.end();
              }),
              (e.prototype.parseChunk = function (e) {
                this.write(e);
              }),
              (e.prototype.done = function (e) {
                this.end(e);
              }),
              e
            );
          })();
        r.Parser = A;
      },
      { "./Tokenizer.js": 59, "entities/lib/decode.js": 50 },
    ],
    59: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          return (
            e === c.Space ||
            e === c.NewLine ||
            e === c.Tab ||
            e === c.FormFeed ||
            e === c.CarriageReturn
          );
        }
        function i(e) {
          return e === c.Slash || e === c.Gt || n(e);
        }
        function s(e) {
          return e >= c.Zero && e <= c.Nine;
        }
        function a(e) {
          return (
            (e >= c.LowerA && e <= c.LowerZ) || (e >= c.UpperA && e <= c.UpperZ)
          );
        }
        function o(e) {
          return (
            (e >= c.UpperA && e <= c.UpperF) || (e >= c.LowerA && e <= c.LowerF)
          );
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.QuoteType = void 0);
        var c,
          u,
          l,
          h = e("entities/lib/decode.js");
        (function (e) {
          (e[(e.Tab = 9)] = "Tab"),
            (e[(e.NewLine = 10)] = "NewLine"),
            (e[(e.FormFeed = 12)] = "FormFeed"),
            (e[(e.CarriageReturn = 13)] = "CarriageReturn"),
            (e[(e.Space = 32)] = "Space"),
            (e[(e.ExclamationMark = 33)] = "ExclamationMark"),
            (e[(e.Number = 35)] = "Number"),
            (e[(e.Amp = 38)] = "Amp"),
            (e[(e.SingleQuote = 39)] = "SingleQuote"),
            (e[(e.DoubleQuote = 34)] = "DoubleQuote"),
            (e[(e.Dash = 45)] = "Dash"),
            (e[(e.Slash = 47)] = "Slash"),
            (e[(e.Zero = 48)] = "Zero"),
            (e[(e.Nine = 57)] = "Nine"),
            (e[(e.Semi = 59)] = "Semi"),
            (e[(e.Lt = 60)] = "Lt"),
            (e[(e.Eq = 61)] = "Eq"),
            (e[(e.Gt = 62)] = "Gt"),
            (e[(e.Questionmark = 63)] = "Questionmark"),
            (e[(e.UpperA = 65)] = "UpperA"),
            (e[(e.LowerA = 97)] = "LowerA"),
            (e[(e.UpperF = 70)] = "UpperF"),
            (e[(e.LowerF = 102)] = "LowerF"),
            (e[(e.UpperZ = 90)] = "UpperZ"),
            (e[(e.LowerZ = 122)] = "LowerZ"),
            (e[(e.LowerX = 120)] = "LowerX"),
            (e[(e.OpeningSquareBracket = 91)] = "OpeningSquareBracket");
        })(c || (c = {})),
          (function (e) {
            (e[(e.Text = 1)] = "Text"),
              (e[(e.BeforeTagName = 2)] = "BeforeTagName"),
              (e[(e.InTagName = 3)] = "InTagName"),
              (e[(e.InSelfClosingTag = 4)] = "InSelfClosingTag"),
              (e[(e.BeforeClosingTagName = 5)] = "BeforeClosingTagName"),
              (e[(e.InClosingTagName = 6)] = "InClosingTagName"),
              (e[(e.AfterClosingTagName = 7)] = "AfterClosingTagName"),
              (e[(e.BeforeAttributeName = 8)] = "BeforeAttributeName"),
              (e[(e.InAttributeName = 9)] = "InAttributeName"),
              (e[(e.AfterAttributeName = 10)] = "AfterAttributeName"),
              (e[(e.BeforeAttributeValue = 11)] = "BeforeAttributeValue"),
              (e[(e.InAttributeValueDq = 12)] = "InAttributeValueDq"),
              (e[(e.InAttributeValueSq = 13)] = "InAttributeValueSq"),
              (e[(e.InAttributeValueNq = 14)] = "InAttributeValueNq"),
              (e[(e.BeforeDeclaration = 15)] = "BeforeDeclaration"),
              (e[(e.InDeclaration = 16)] = "InDeclaration"),
              (e[(e.InProcessingInstruction = 17)] = "InProcessingInstruction"),
              (e[(e.BeforeComment = 18)] = "BeforeComment"),
              (e[(e.CDATASequence = 19)] = "CDATASequence"),
              (e[(e.InSpecialComment = 20)] = "InSpecialComment"),
              (e[(e.InCommentLike = 21)] = "InCommentLike"),
              (e[(e.BeforeSpecialS = 22)] = "BeforeSpecialS"),
              (e[(e.SpecialStartSequence = 23)] = "SpecialStartSequence"),
              (e[(e.InSpecialTag = 24)] = "InSpecialTag"),
              (e[(e.BeforeEntity = 25)] = "BeforeEntity"),
              (e[(e.BeforeNumericEntity = 26)] = "BeforeNumericEntity"),
              (e[(e.InNamedEntity = 27)] = "InNamedEntity"),
              (e[(e.InNumericEntity = 28)] = "InNumericEntity"),
              (e[(e.InHexEntity = 29)] = "InHexEntity");
          })(u || (u = {})),
          (function (e) {
            (e[(e.NoValue = 0)] = "NoValue"),
              (e[(e.Unquoted = 1)] = "Unquoted"),
              (e[(e.Single = 2)] = "Single"),
              (e[(e.Double = 3)] = "Double");
          })((l = r.QuoteType || (r.QuoteType = {})));
        var T = {
            Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
            CdataEnd: new Uint8Array([93, 93, 62]),
            CommentEnd: new Uint8Array([45, 45, 62]),
            ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
            StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
            TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101]),
          },
          d = (function () {
            function e(e, t) {
              var r = e.xmlMode,
                n = void 0 !== r && r,
                i = e.decodeEntities,
                s = void 0 === i || i;
              (this.cbs = t),
                (this.state = u.Text),
                (this.buffer = ""),
                (this.sectionStart = 0),
                (this.index = 0),
                (this.baseState = u.Text),
                (this.isSpecial = !1),
                (this.running = !0),
                (this.offset = 0),
                (this.currentSequence = void 0),
                (this.sequenceIndex = 0),
                (this.trieIndex = 0),
                (this.trieCurrent = 0),
                (this.entityResult = 0),
                (this.entityExcess = 0),
                (this.xmlMode = n),
                (this.decodeEntities = s),
                (this.entityTrie = n ? h.xmlDecodeTree : h.htmlDecodeTree);
            }
            return (
              (e.prototype.reset = function () {
                (this.state = u.Text),
                  (this.buffer = ""),
                  (this.sectionStart = 0),
                  (this.index = 0),
                  (this.baseState = u.Text),
                  (this.currentSequence = void 0),
                  (this.running = !0),
                  (this.offset = 0);
              }),
              (e.prototype.write = function (e) {
                (this.offset += this.buffer.length),
                  (this.buffer = e),
                  this.parse();
              }),
              (e.prototype.end = function () {
                this.running && this.finish();
              }),
              (e.prototype.pause = function () {
                this.running = !1;
              }),
              (e.prototype.resume = function () {
                (this.running = !0),
                  this.index < this.buffer.length + this.offset && this.parse();
              }),
              (e.prototype.getIndex = function () {
                return this.index;
              }),
              (e.prototype.getSectionStart = function () {
                return this.sectionStart;
              }),
              (e.prototype.stateText = function (e) {
                e === c.Lt || (!this.decodeEntities && this.fastForwardTo(c.Lt))
                  ? (this.index > this.sectionStart &&
                      this.cbs.ontext(this.sectionStart, this.index),
                    (this.state = u.BeforeTagName),
                    (this.sectionStart = this.index))
                  : this.decodeEntities &&
                    e === c.Amp &&
                    (this.state = u.BeforeEntity);
              }),
              (e.prototype.stateSpecialStartSequence = function (e) {
                var t = this.sequenceIndex === this.currentSequence.length,
                  r = t
                    ? i(e)
                    : (32 | e) === this.currentSequence[this.sequenceIndex];
                if (r) {
                  if (!t) return void this.sequenceIndex++;
                } else this.isSpecial = !1;
                (this.sequenceIndex = 0),
                  (this.state = u.InTagName),
                  this.stateInTagName(e);
              }),
              (e.prototype.stateInSpecialTag = function (e) {
                if (this.sequenceIndex === this.currentSequence.length) {
                  if (e === c.Gt || n(e)) {
                    var t = this.index - this.currentSequence.length;
                    if (this.sectionStart < t) {
                      var r = this.index;
                      (this.index = t),
                        this.cbs.ontext(this.sectionStart, t),
                        (this.index = r);
                    }
                    return (
                      (this.isSpecial = !1),
                      (this.sectionStart = t + 2),
                      void this.stateInClosingTagName(e)
                    );
                  }
                  this.sequenceIndex = 0;
                }
                (32 | e) === this.currentSequence[this.sequenceIndex]
                  ? (this.sequenceIndex += 1)
                  : 0 === this.sequenceIndex
                  ? this.currentSequence === T.TitleEnd
                    ? this.decodeEntities &&
                      e === c.Amp &&
                      (this.state = u.BeforeEntity)
                    : this.fastForwardTo(c.Lt) && (this.sequenceIndex = 1)
                  : (this.sequenceIndex = Number(e === c.Lt));
              }),
              (e.prototype.stateCDATASequence = function (e) {
                e === T.Cdata[this.sequenceIndex]
                  ? ++this.sequenceIndex === T.Cdata.length &&
                    ((this.state = u.InCommentLike),
                    (this.currentSequence = T.CdataEnd),
                    (this.sequenceIndex = 0),
                    (this.sectionStart = this.index + 1))
                  : ((this.sequenceIndex = 0),
                    (this.state = u.InDeclaration),
                    this.stateInDeclaration(e));
              }),
              (e.prototype.fastForwardTo = function (e) {
                for (; ++this.index < this.buffer.length + this.offset; )
                  if (this.buffer.charCodeAt(this.index - this.offset) === e)
                    return !0;
                return (this.index = this.buffer.length + this.offset - 1), !1;
              }),
              (e.prototype.stateInCommentLike = function (e) {
                e === this.currentSequence[this.sequenceIndex]
                  ? ++this.sequenceIndex === this.currentSequence.length &&
                    (this.currentSequence === T.CdataEnd
                      ? this.cbs.oncdata(this.sectionStart, this.index, 2)
                      : this.cbs.oncomment(this.sectionStart, this.index, 2),
                    (this.sequenceIndex = 0),
                    (this.sectionStart = this.index + 1),
                    (this.state = u.Text))
                  : 0 === this.sequenceIndex
                  ? this.fastForwardTo(this.currentSequence[0]) &&
                    (this.sequenceIndex = 1)
                  : e !== this.currentSequence[this.sequenceIndex - 1] &&
                    (this.sequenceIndex = 0);
              }),
              (e.prototype.isTagStartChar = function (e) {
                return this.xmlMode ? !i(e) : a(e);
              }),
              (e.prototype.startSpecial = function (e, t) {
                (this.isSpecial = !0),
                  (this.currentSequence = e),
                  (this.sequenceIndex = t),
                  (this.state = u.SpecialStartSequence);
              }),
              (e.prototype.stateBeforeTagName = function (e) {
                if (e === c.ExclamationMark)
                  (this.state = u.BeforeDeclaration),
                    (this.sectionStart = this.index + 1);
                else if (e === c.Questionmark)
                  (this.state = u.InProcessingInstruction),
                    (this.sectionStart = this.index + 1);
                else if (this.isTagStartChar(e)) {
                  var t = 32 | e;
                  (this.sectionStart = this.index),
                    this.xmlMode || t !== T.TitleEnd[2]
                      ? (this.state =
                          this.xmlMode || t !== T.ScriptEnd[2]
                            ? u.InTagName
                            : u.BeforeSpecialS)
                      : this.startSpecial(T.TitleEnd, 3);
                } else
                  e === c.Slash
                    ? (this.state = u.BeforeClosingTagName)
                    : ((this.state = u.Text), this.stateText(e));
              }),
              (e.prototype.stateInTagName = function (e) {
                i(e) &&
                  (this.cbs.onopentagname(this.sectionStart, this.index),
                  (this.sectionStart = -1),
                  (this.state = u.BeforeAttributeName),
                  this.stateBeforeAttributeName(e));
              }),
              (e.prototype.stateBeforeClosingTagName = function (e) {
                n(e) ||
                  (e === c.Gt
                    ? (this.state = u.Text)
                    : ((this.state = this.isTagStartChar(e)
                        ? u.InClosingTagName
                        : u.InSpecialComment),
                      (this.sectionStart = this.index)));
              }),
              (e.prototype.stateInClosingTagName = function (e) {
                (e === c.Gt || n(e)) &&
                  (this.cbs.onclosetag(this.sectionStart, this.index),
                  (this.sectionStart = -1),
                  (this.state = u.AfterClosingTagName),
                  this.stateAfterClosingTagName(e));
              }),
              (e.prototype.stateAfterClosingTagName = function (e) {
                (e === c.Gt || this.fastForwardTo(c.Gt)) &&
                  ((this.state = u.Text),
                  (this.baseState = u.Text),
                  (this.sectionStart = this.index + 1));
              }),
              (e.prototype.stateBeforeAttributeName = function (e) {
                e === c.Gt
                  ? (this.cbs.onopentagend(this.index),
                    this.isSpecial
                      ? ((this.state = u.InSpecialTag),
                        (this.sequenceIndex = 0))
                      : (this.state = u.Text),
                    (this.baseState = this.state),
                    (this.sectionStart = this.index + 1))
                  : e === c.Slash
                  ? (this.state = u.InSelfClosingTag)
                  : n(e) ||
                    ((this.state = u.InAttributeName),
                    (this.sectionStart = this.index));
              }),
              (e.prototype.stateInSelfClosingTag = function (e) {
                e === c.Gt
                  ? (this.cbs.onselfclosingtag(this.index),
                    (this.state = u.Text),
                    (this.baseState = u.Text),
                    (this.sectionStart = this.index + 1),
                    (this.isSpecial = !1))
                  : n(e) ||
                    ((this.state = u.BeforeAttributeName),
                    this.stateBeforeAttributeName(e));
              }),
              (e.prototype.stateInAttributeName = function (e) {
                (e === c.Eq || i(e)) &&
                  (this.cbs.onattribname(this.sectionStart, this.index),
                  (this.sectionStart = -1),
                  (this.state = u.AfterAttributeName),
                  this.stateAfterAttributeName(e));
              }),
              (e.prototype.stateAfterAttributeName = function (e) {
                e === c.Eq
                  ? (this.state = u.BeforeAttributeValue)
                  : e === c.Slash || e === c.Gt
                  ? (this.cbs.onattribend(l.NoValue, this.index),
                    (this.state = u.BeforeAttributeName),
                    this.stateBeforeAttributeName(e))
                  : n(e) ||
                    (this.cbs.onattribend(l.NoValue, this.index),
                    (this.state = u.InAttributeName),
                    (this.sectionStart = this.index));
              }),
              (e.prototype.stateBeforeAttributeValue = function (e) {
                e === c.DoubleQuote
                  ? ((this.state = u.InAttributeValueDq),
                    (this.sectionStart = this.index + 1))
                  : e === c.SingleQuote
                  ? ((this.state = u.InAttributeValueSq),
                    (this.sectionStart = this.index + 1))
                  : n(e) ||
                    ((this.sectionStart = this.index),
                    (this.state = u.InAttributeValueNq),
                    this.stateInAttributeValueNoQuotes(e));
              }),
              (e.prototype.handleInAttributeValue = function (e, t) {
                e === t || (!this.decodeEntities && this.fastForwardTo(t))
                  ? (this.cbs.onattribdata(this.sectionStart, this.index),
                    (this.sectionStart = -1),
                    this.cbs.onattribend(
                      t === c.DoubleQuote ? l.Double : l.Single,
                      this.index
                    ),
                    (this.state = u.BeforeAttributeName))
                  : this.decodeEntities &&
                    e === c.Amp &&
                    ((this.baseState = this.state),
                    (this.state = u.BeforeEntity));
              }),
              (e.prototype.stateInAttributeValueDoubleQuotes = function (e) {
                this.handleInAttributeValue(e, c.DoubleQuote);
              }),
              (e.prototype.stateInAttributeValueSingleQuotes = function (e) {
                this.handleInAttributeValue(e, c.SingleQuote);
              }),
              (e.prototype.stateInAttributeValueNoQuotes = function (e) {
                n(e) || e === c.Gt
                  ? (this.cbs.onattribdata(this.sectionStart, this.index),
                    (this.sectionStart = -1),
                    this.cbs.onattribend(l.Unquoted, this.index),
                    (this.state = u.BeforeAttributeName),
                    this.stateBeforeAttributeName(e))
                  : this.decodeEntities &&
                    e === c.Amp &&
                    ((this.baseState = this.state),
                    (this.state = u.BeforeEntity));
              }),
              (e.prototype.stateBeforeDeclaration = function (e) {
                e === c.OpeningSquareBracket
                  ? ((this.state = u.CDATASequence), (this.sequenceIndex = 0))
                  : (this.state =
                      e === c.Dash ? u.BeforeComment : u.InDeclaration);
              }),
              (e.prototype.stateInDeclaration = function (e) {
                (e === c.Gt || this.fastForwardTo(c.Gt)) &&
                  (this.cbs.ondeclaration(this.sectionStart, this.index),
                  (this.state = u.Text),
                  (this.sectionStart = this.index + 1));
              }),
              (e.prototype.stateInProcessingInstruction = function (e) {
                (e === c.Gt || this.fastForwardTo(c.Gt)) &&
                  (this.cbs.onprocessinginstruction(
                    this.sectionStart,
                    this.index
                  ),
                  (this.state = u.Text),
                  (this.sectionStart = this.index + 1));
              }),
              (e.prototype.stateBeforeComment = function (e) {
                e === c.Dash
                  ? ((this.state = u.InCommentLike),
                    (this.currentSequence = T.CommentEnd),
                    (this.sequenceIndex = 2),
                    (this.sectionStart = this.index + 1))
                  : (this.state = u.InDeclaration);
              }),
              (e.prototype.stateInSpecialComment = function (e) {
                (e === c.Gt || this.fastForwardTo(c.Gt)) &&
                  (this.cbs.oncomment(this.sectionStart, this.index, 0),
                  (this.state = u.Text),
                  (this.sectionStart = this.index + 1));
              }),
              (e.prototype.stateBeforeSpecialS = function (e) {
                var t = 32 | e;
                t === T.ScriptEnd[3]
                  ? this.startSpecial(T.ScriptEnd, 4)
                  : t === T.StyleEnd[3]
                  ? this.startSpecial(T.StyleEnd, 4)
                  : ((this.state = u.InTagName), this.stateInTagName(e));
              }),
              (e.prototype.stateBeforeEntity = function (e) {
                (this.entityExcess = 1),
                  (this.entityResult = 0),
                  e === c.Number
                    ? (this.state = u.BeforeNumericEntity)
                    : e === c.Amp ||
                      ((this.trieIndex = 0),
                      (this.trieCurrent = this.entityTrie[0]),
                      (this.state = u.InNamedEntity),
                      this.stateInNamedEntity(e));
              }),
              (e.prototype.stateInNamedEntity = function (e) {
                if (
                  ((this.entityExcess += 1),
                  (this.trieIndex = (0, h.determineBranch)(
                    this.entityTrie,
                    this.trieCurrent,
                    this.trieIndex + 1,
                    e
                  )),
                  this.trieIndex < 0)
                )
                  return this.emitNamedEntity(), void this.index--;
                this.trieCurrent = this.entityTrie[this.trieIndex];
                var t = this.trieCurrent & h.BinTrieFlags.VALUE_LENGTH;
                if (t) {
                  var r = (t >> 14) - 1;
                  if (this.allowLegacyEntity() || e === c.Semi) {
                    var n = this.index - this.entityExcess + 1;
                    n > this.sectionStart &&
                      this.emitPartial(this.sectionStart, n),
                      (this.entityResult = this.trieIndex),
                      (this.trieIndex += r),
                      (this.entityExcess = 0),
                      (this.sectionStart = this.index + 1),
                      0 === r && this.emitNamedEntity();
                  } else this.trieIndex += r;
                }
              }),
              (e.prototype.emitNamedEntity = function () {
                if (((this.state = this.baseState), 0 !== this.entityResult)) {
                  var e =
                    (this.entityTrie[this.entityResult] &
                      h.BinTrieFlags.VALUE_LENGTH) >>
                    14;
                  switch (e) {
                    case 1:
                      this.emitCodePoint(
                        this.entityTrie[this.entityResult] &
                          ~h.BinTrieFlags.VALUE_LENGTH
                      );
                      break;
                    case 2:
                      this.emitCodePoint(
                        this.entityTrie[this.entityResult + 1]
                      );
                      break;
                    case 3:
                      this.emitCodePoint(
                        this.entityTrie[this.entityResult + 1]
                      ),
                        this.emitCodePoint(
                          this.entityTrie[this.entityResult + 2]
                        );
                  }
                }
              }),
              (e.prototype.stateBeforeNumericEntity = function (e) {
                (32 | e) === c.LowerX
                  ? (this.entityExcess++, (this.state = u.InHexEntity))
                  : ((this.state = u.InNumericEntity),
                    this.stateInNumericEntity(e));
              }),
              (e.prototype.emitNumericEntity = function (e) {
                var t = this.index - this.entityExcess - 1,
                  r = t + 2 + Number(this.state === u.InHexEntity);
                r !== this.index &&
                  (t > this.sectionStart &&
                    this.emitPartial(this.sectionStart, t),
                  (this.sectionStart = this.index + Number(e)),
                  this.emitCodePoint(
                    (0, h.replaceCodePoint)(this.entityResult)
                  )),
                  (this.state = this.baseState);
              }),
              (e.prototype.stateInNumericEntity = function (e) {
                e === c.Semi
                  ? this.emitNumericEntity(!0)
                  : s(e)
                  ? ((this.entityResult =
                      10 * this.entityResult + (e - c.Zero)),
                    this.entityExcess++)
                  : (this.allowLegacyEntity()
                      ? this.emitNumericEntity(!1)
                      : (this.state = this.baseState),
                    this.index--);
              }),
              (e.prototype.stateInHexEntity = function (e) {
                e === c.Semi
                  ? this.emitNumericEntity(!0)
                  : s(e)
                  ? ((this.entityResult =
                      16 * this.entityResult + (e - c.Zero)),
                    this.entityExcess++)
                  : o(e)
                  ? ((this.entityResult =
                      16 * this.entityResult + ((32 | e) - c.LowerA + 10)),
                    this.entityExcess++)
                  : (this.allowLegacyEntity()
                      ? this.emitNumericEntity(!1)
                      : (this.state = this.baseState),
                    this.index--);
              }),
              (e.prototype.allowLegacyEntity = function () {
                return (
                  !this.xmlMode &&
                  (this.baseState === u.Text ||
                    this.baseState === u.InSpecialTag)
                );
              }),
              (e.prototype.cleanup = function () {
                this.running &&
                  this.sectionStart !== this.index &&
                  (this.state === u.Text ||
                  (this.state === u.InSpecialTag && 0 === this.sequenceIndex)
                    ? (this.cbs.ontext(this.sectionStart, this.index),
                      (this.sectionStart = this.index))
                    : (this.state !== u.InAttributeValueDq &&
                        this.state !== u.InAttributeValueSq &&
                        this.state !== u.InAttributeValueNq) ||
                      (this.cbs.onattribdata(this.sectionStart, this.index),
                      (this.sectionStart = this.index)));
              }),
              (e.prototype.shouldContinue = function () {
                return (
                  this.index < this.buffer.length + this.offset && this.running
                );
              }),
              (e.prototype.parse = function () {
                for (; this.shouldContinue(); ) {
                  var e = this.buffer.charCodeAt(this.index - this.offset);
                  switch (this.state) {
                    case u.Text:
                      this.stateText(e);
                      break;
                    case u.SpecialStartSequence:
                      this.stateSpecialStartSequence(e);
                      break;
                    case u.InSpecialTag:
                      this.stateInSpecialTag(e);
                      break;
                    case u.CDATASequence:
                      this.stateCDATASequence(e);
                      break;
                    case u.InAttributeValueDq:
                      this.stateInAttributeValueDoubleQuotes(e);
                      break;
                    case u.InAttributeName:
                      this.stateInAttributeName(e);
                      break;
                    case u.InCommentLike:
                      this.stateInCommentLike(e);
                      break;
                    case u.InSpecialComment:
                      this.stateInSpecialComment(e);
                      break;
                    case u.BeforeAttributeName:
                      this.stateBeforeAttributeName(e);
                      break;
                    case u.InTagName:
                      this.stateInTagName(e);
                      break;
                    case u.InClosingTagName:
                      this.stateInClosingTagName(e);
                      break;
                    case u.BeforeTagName:
                      this.stateBeforeTagName(e);
                      break;
                    case u.AfterAttributeName:
                      this.stateAfterAttributeName(e);
                      break;
                    case u.InAttributeValueSq:
                      this.stateInAttributeValueSingleQuotes(e);
                      break;
                    case u.BeforeAttributeValue:
                      this.stateBeforeAttributeValue(e);
                      break;
                    case u.BeforeClosingTagName:
                      this.stateBeforeClosingTagName(e);
                      break;
                    case u.AfterClosingTagName:
                      this.stateAfterClosingTagName(e);
                      break;
                    case u.BeforeSpecialS:
                      this.stateBeforeSpecialS(e);
                      break;
                    case u.InAttributeValueNq:
                      this.stateInAttributeValueNoQuotes(e);
                      break;
                    case u.InSelfClosingTag:
                      this.stateInSelfClosingTag(e);
                      break;
                    case u.InDeclaration:
                      this.stateInDeclaration(e);
                      break;
                    case u.BeforeDeclaration:
                      this.stateBeforeDeclaration(e);
                      break;
                    case u.BeforeComment:
                      this.stateBeforeComment(e);
                      break;
                    case u.InProcessingInstruction:
                      this.stateInProcessingInstruction(e);
                      break;
                    case u.InNamedEntity:
                      this.stateInNamedEntity(e);
                      break;
                    case u.BeforeEntity:
                      this.stateBeforeEntity(e);
                      break;
                    case u.InHexEntity:
                      this.stateInHexEntity(e);
                      break;
                    case u.InNumericEntity:
                      this.stateInNumericEntity(e);
                      break;
                    default:
                      this.stateBeforeNumericEntity(e);
                  }
                  this.index++;
                }
                this.cleanup();
              }),
              (e.prototype.finish = function () {
                this.state === u.InNamedEntity && this.emitNamedEntity(),
                  this.sectionStart < this.index && this.handleTrailingData(),
                  this.cbs.onend();
              }),
              (e.prototype.handleTrailingData = function () {
                var e = this.buffer.length + this.offset;
                this.state === u.InCommentLike
                  ? this.currentSequence === T.CdataEnd
                    ? this.cbs.oncdata(this.sectionStart, e, 0)
                    : this.cbs.oncomment(this.sectionStart, e, 0)
                  : this.state === u.InNumericEntity && this.allowLegacyEntity()
                  ? this.emitNumericEntity(!1)
                  : this.state === u.InHexEntity && this.allowLegacyEntity()
                  ? this.emitNumericEntity(!1)
                  : this.state === u.InTagName ||
                    this.state === u.BeforeAttributeName ||
                    this.state === u.BeforeAttributeValue ||
                    this.state === u.AfterAttributeName ||
                    this.state === u.InAttributeName ||
                    this.state === u.InAttributeValueSq ||
                    this.state === u.InAttributeValueDq ||
                    this.state === u.InAttributeValueNq ||
                    this.state === u.InClosingTagName ||
                    this.cbs.ontext(this.sectionStart, e);
              }),
              (e.prototype.emitPartial = function (e, t) {
                this.baseState !== u.Text && this.baseState !== u.InSpecialTag
                  ? this.cbs.onattribdata(e, t)
                  : this.cbs.ontext(e, t);
              }),
              (e.prototype.emitCodePoint = function (e) {
                this.baseState !== u.Text && this.baseState !== u.InSpecialTag
                  ? this.cbs.onattribentity(e)
                  : this.cbs.ontextentity(e);
              }),
              e
            );
          })();
        r.default = d;
      },
      { "entities/lib/decode.js": 50 },
    ],
    60: [
      function (e, t, r) {
        "use strict";
        function n(e, t) {
          var r = new d.DomHandler(void 0, t);
          return new h.Parser(r, t).end(e), r.root;
        }
        function i(e, t) {
          return n(e, t).children;
        }
        function s(e, t, r) {
          var n = new d.DomHandler(e, t, r);
          return new h.Parser(n, t);
        }
        function a(e, t) {
          return void 0 === t && (t = A), (0, f.getFeed)(i(e, t));
        }
        var o =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, r, n) {
                  void 0 === n && (n = r);
                  var i = Object.getOwnPropertyDescriptor(t, r);
                  (i &&
                    ("get" in i
                      ? t.__esModule
                      : !i.writable && !i.configurable)) ||
                    (i = {
                      enumerable: !0,
                      get: function () {
                        return t[r];
                      },
                    }),
                    Object.defineProperty(e, n, i);
                }
              : function (e, t, r, n) {
                  void 0 === n && (n = r), (e[n] = t[r]);
                }),
          c =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, t) {
                  Object.defineProperty(e, "default", {
                    enumerable: !0,
                    value: t,
                  });
                }
              : function (e, t) {
                  e.default = t;
                }),
          u =
            (this && this.__importStar) ||
            function (e) {
              if (e && e.__esModule) return e;
              var t = {};
              if (null != e)
                for (var r in e)
                  "default" !== r &&
                    Object.prototype.hasOwnProperty.call(e, r) &&
                    o(t, e, r);
              return c(t, e), t;
            },
          l =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.DomUtils =
            r.parseFeed =
            r.getFeed =
            r.ElementType =
            r.Tokenizer =
            r.createDomStream =
            r.parseDOM =
            r.parseDocument =
            r.DefaultHandler =
            r.DomHandler =
            r.Parser =
              void 0);
        var h = e("./Parser.js"),
          T = e("./Parser.js");
        Object.defineProperty(r, "Parser", {
          enumerable: !0,
          get: function () {
            return T.Parser;
          },
        });
        var d = e("domhandler"),
          E = e("domhandler");
        Object.defineProperty(r, "DomHandler", {
          enumerable: !0,
          get: function () {
            return E.DomHandler;
          },
        }),
          Object.defineProperty(r, "DefaultHandler", {
            enumerable: !0,
            get: function () {
              return E.DomHandler;
            },
          }),
          (r.parseDocument = n),
          (r.parseDOM = i),
          (r.createDomStream = s);
        var p = e("./Tokenizer.js");
        Object.defineProperty(r, "Tokenizer", {
          enumerable: !0,
          get: function () {
            return l(p).default;
          },
        }),
          (r.ElementType = u(e("domelementtype")));
        var f = e("domutils"),
          _ = e("domutils");
        Object.defineProperty(r, "getFeed", {
          enumerable: !0,
          get: function () {
            return _.getFeed;
          },
        });
        var A = { xmlMode: !0 };
        (r.parseFeed = a), (r.DomUtils = u(e("domutils")));
      },
      {
        "./Parser.js": 58,
        "./Tokenizer.js": 59,
        domelementtype: 39,
        domhandler: 40,
        domutils: 44,
      },
    ],
    61: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          var t = e[0],
            r = e[1] - 1;
          if (r < 0 && t <= 0) return a.default.falseFunc;
          if (-1 === t)
            return function (e) {
              return e <= r;
            };
          if (0 === t)
            return function (e) {
              return e === r;
            };
          if (1 === t)
            return r < 0
              ? a.default.trueFunc
              : function (e) {
                  return e >= r;
                };
          var n = Math.abs(t),
            i = ((r % n) + n) % n;
          return t > 1
            ? function (e) {
                return e >= r && e % n === i;
              }
            : function (e) {
                return e <= r && e % n === i;
              };
        }
        function i(e) {
          var t = e[0],
            r = e[1] - 1,
            n = 0;
          if (t < 0) {
            var i = -t,
              s = ((r % i) + i) % i;
            return function () {
              var e = s + i * n++;
              return e > r ? null : e;
            };
          }
          return 0 === t
            ? r < 0
              ? function () {
                  return null;
                }
              : function () {
                  return 0 == n++ ? r : null;
                }
            : (r < 0 && (r += t * Math.ceil(-r / t)),
              function () {
                return t * n++ + r;
              });
        }
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.generate = r.compile = void 0);
        var a = s(e("boolbase"));
        (r.compile = n), (r.generate = i);
      },
      { boolbase: 5 },
    ],
    62: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          return (0, a.compile)((0, s.parse)(e));
        }
        function i(e) {
          return (0, a.generate)((0, s.parse)(e));
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.sequence = r.generate = r.compile = r.parse = void 0);
        var s = e("./parse.js");
        Object.defineProperty(r, "parse", {
          enumerable: !0,
          get: function () {
            return s.parse;
          },
        });
        var a = e("./compile.js");
        Object.defineProperty(r, "compile", {
          enumerable: !0,
          get: function () {
            return a.compile;
          },
        }),
          Object.defineProperty(r, "generate", {
            enumerable: !0,
            get: function () {
              return a.generate;
            },
          }),
          (r.default = n),
          (r.sequence = i);
      },
      { "./compile.js": 61, "./parse.js": 63 },
    ],
    63: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          function t() {
            return "-" === e.charAt(o)
              ? (o++, -1)
              : ("+" === e.charAt(o) && o++, 1);
          }
          function r() {
            for (
              var t = o, r = 0;
              o < e.length && e.charCodeAt(o) >= s && e.charCodeAt(o) <= a;

            )
              (r = 10 * r + (e.charCodeAt(o) - s)), o++;
            return o === t ? null : r;
          }
          function n() {
            for (; o < e.length && i.has(e.charCodeAt(o)); ) o++;
          }
          if (((e = e.trim().toLowerCase()), "even" === e)) return [2, 0];
          if ("odd" === e) return [2, 1];
          var o = 0,
            c = 0,
            u = t(),
            l = r();
          if (
            (o < e.length &&
              "n" === e.charAt(o) &&
              (o++,
              (c = u * (null != l ? l : 1)),
              n(),
              o < e.length ? ((u = t()), n(), (l = r())) : (u = l = 0)),
            null === l || o < e.length)
          )
            throw new Error("n-th rule couldn't be parsed ('".concat(e, "')"));
          return [c, u * l];
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.parse = void 0);
        var i = new Set([9, 10, 12, 13, 32]),
          s = "0".charCodeAt(0),
          a = "9".charCodeAt(0);
        r.parse = n;
      },
      {},
    ],
    64: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          return new o.Text(e);
        }
        function i(e) {
          const t = e.includes('"') ? "'" : '"';
          return t + e + t;
        }
        function s(e, t, r) {
          let n = "!DOCTYPE ";
          return (
            e && (n += e),
            t ? (n += ` PUBLIC ${i(t)}`) : r && (n += " SYSTEM"),
            r && (n += ` ${i(r)}`),
            n
          );
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.adapter = r.serializeDoctypeContent = void 0);
        const a = e("parse5"),
          o = e("domhandler");
        (r.serializeDoctypeContent = s),
          (r.adapter = {
            isCommentNode: o.isComment,
            isElementNode: o.isTag,
            isTextNode: o.isText,
            createDocument() {
              const e = new o.Document([]);
              return (e["x-mode"] = a.html.DOCUMENT_MODE.NO_QUIRKS), e;
            },
            createDocumentFragment: () => new o.Document([]),
            createElement(e, t, r) {
              const n = Object.create(null),
                i = Object.create(null),
                s = Object.create(null);
              for (let e = 0; e < r.length; e++) {
                const t = r[e].name;
                (n[t] = r[e].value),
                  (i[t] = r[e].namespace),
                  (s[t] = r[e].prefix);
              }
              const a = new o.Element(e, n, []);
              return (
                (a.namespace = t),
                (a["x-attribsNamespace"] = i),
                (a["x-attribsPrefix"] = s),
                a
              );
            },
            createCommentNode: (e) => new o.Comment(e),
            appendChild(e, t) {
              const r = e.children[e.children.length - 1];
              r && ((r.next = t), (t.prev = r)),
                e.children.push(t),
                (t.parent = e);
            },
            insertBefore(e, t, r) {
              const n = e.children.indexOf(r),
                { prev: i } = r;
              i && ((i.next = t), (t.prev = i)),
                (r.prev = t),
                (t.next = r),
                e.children.splice(n, 0, t),
                (t.parent = e);
            },
            setTemplateContent(e, t) {
              r.adapter.appendChild(e, t);
            },
            getTemplateContent: (e) => e.children[0],
            setDocumentType(e, t, n, i) {
              const a = s(t, n, i);
              let c = e.children.find(
                (e) => (0, o.isDirective)(e) && "!doctype" === e.name
              );
              c
                ? (c.data = null != a ? a : null)
                : ((c = new o.ProcessingInstruction("!doctype", a)),
                  r.adapter.appendChild(e, c)),
                (c["x-name"] = null != t ? t : void 0),
                (c["x-publicId"] = null != n ? n : void 0),
                (c["x-systemId"] = null != i ? i : void 0);
            },
            setDocumentMode(e, t) {
              e["x-mode"] = t;
            },
            getDocumentMode: (e) => e["x-mode"],
            detachNode(e) {
              if (e.parent) {
                const t = e.parent.children.indexOf(e),
                  { prev: r, next: n } = e;
                (e.prev = null),
                  (e.next = null),
                  r && (r.next = n),
                  n && (n.prev = r),
                  e.parent.children.splice(t, 1),
                  (e.parent = null);
              }
            },
            insertText(e, t) {
              const i = e.children[e.children.length - 1];
              i && (0, o.isText)(i)
                ? (i.data += t)
                : r.adapter.appendChild(e, n(t));
            },
            insertTextBefore(e, t, i) {
              const s = e.children[e.children.indexOf(i) - 1];
              s && (0, o.isText)(s)
                ? (s.data += t)
                : r.adapter.insertBefore(e, n(t), i);
            },
            adoptAttributes(e, t) {
              for (let r = 0; r < t.length; r++) {
                const n = t[r].name;
                void 0 === e.attribs[n] &&
                  ((e.attribs[n] = t[r].value),
                  (e["x-attribsNamespace"][n] = t[r].namespace),
                  (e["x-attribsPrefix"][n] = t[r].prefix));
              }
            },
            getFirstChild: (e) => e.children[0],
            getChildNodes: (e) => e.children,
            getParentNode: (e) => e.parent,
            getAttrList: (e) => e.attributes,
            getTagName: (e) => e.name,
            getNamespaceURI: (e) => e.namespace,
            getTextNodeContent: (e) => e.data,
            getCommentNodeContent: (e) => e.data,
            getDocumentTypeNodeName(e) {
              var t;
              return null !== (t = e["x-name"]) && void 0 !== t ? t : "";
            },
            getDocumentTypeNodePublicId(e) {
              var t;
              return null !== (t = e["x-publicId"]) && void 0 !== t ? t : "";
            },
            getDocumentTypeNodeSystemId(e) {
              var t;
              return null !== (t = e["x-systemId"]) && void 0 !== t ? t : "";
            },
            isDocumentTypeNode: (e) =>
              (0, o.isDirective)(e) && "!doctype" === e.name,
            setNodeSourceCodeLocation(e, t) {
              t && ((e.startIndex = t.startOffset), (e.endIndex = t.endOffset)),
                (e.sourceCodeLocation = t);
            },
            getNodeSourceCodeLocation: (e) => e.sourceCodeLocation,
            updateNodeSourceCodeLocation(e, t) {
              null != t.endOffset && (e.endIndex = t.endOffset),
                (e.sourceCodeLocation = Object.assign(
                  Object.assign({}, e.sourceCodeLocation),
                  t
                ));
            },
          });
      },
      { domhandler: 40, parse5: 71 },
    ],
    65: [
      function (e, t, r) {
        "use strict";
        function n(e, t) {
          return t.some((t) => e.startsWith(t));
        }
        function i(e) {
          return (
            e.name === o &&
            null === e.publicId &&
            (null === e.systemId || e.systemId === c)
          );
        }
        function s(e) {
          if (e.name !== o) return a.DOCUMENT_MODE.QUIRKS;
          const { systemId: t } = e;
          if (t && t.toLowerCase() === u) return a.DOCUMENT_MODE.QUIRKS;
          let { publicId: r } = e;
          if (null !== r) {
            if (((r = r.toLowerCase()), T.has(r)))
              return a.DOCUMENT_MODE.QUIRKS;
            let e = null === t ? h : l;
            if (n(r, e)) return a.DOCUMENT_MODE.QUIRKS;
            if (((e = null === t ? d : E), n(r, e)))
              return a.DOCUMENT_MODE.LIMITED_QUIRKS;
          }
          return a.DOCUMENT_MODE.NO_QUIRKS;
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.getDocumentMode = r.isConforming = void 0);
        const a = e("./html.js"),
          o = "html",
          c = "about:legacy-compat",
          u = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd",
          l = [
            "+//silmaril//dtd html pro v0r11 19970101//",
            "-//as//dtd html 3.0 aswedit + extensions//",
            "-//advasoft ltd//dtd html 3.0 aswedit + extensions//",
            "-//ietf//dtd html 2.0 level 1//",
            "-//ietf//dtd html 2.0 level 2//",
            "-//ietf//dtd html 2.0 strict level 1//",
            "-//ietf//dtd html 2.0 strict level 2//",
            "-//ietf//dtd html 2.0 strict//",
            "-//ietf//dtd html 2.0//",
            "-//ietf//dtd html 2.1e//",
            "-//ietf//dtd html 3.0//",
            "-//ietf//dtd html 3.2 final//",
            "-//ietf//dtd html 3.2//",
            "-//ietf//dtd html 3//",
            "-//ietf//dtd html level 0//",
            "-//ietf//dtd html level 1//",
            "-//ietf//dtd html level 2//",
            "-//ietf//dtd html level 3//",
            "-//ietf//dtd html strict level 0//",
            "-//ietf//dtd html strict level 1//",
            "-//ietf//dtd html strict level 2//",
            "-//ietf//dtd html strict level 3//",
            "-//ietf//dtd html strict//",
            "-//ietf//dtd html//",
            "-//metrius//dtd metrius presentational//",
            "-//microsoft//dtd internet explorer 2.0 html strict//",
            "-//microsoft//dtd internet explorer 2.0 html//",
            "-//microsoft//dtd internet explorer 2.0 tables//",
            "-//microsoft//dtd internet explorer 3.0 html strict//",
            "-//microsoft//dtd internet explorer 3.0 html//",
            "-//microsoft//dtd internet explorer 3.0 tables//",
            "-//netscape comm. corp.//dtd html//",
            "-//netscape comm. corp.//dtd strict html//",
            "-//o'reilly and associates//dtd html 2.0//",
            "-//o'reilly and associates//dtd html extended 1.0//",
            "-//o'reilly and associates//dtd html extended relaxed 1.0//",
            "-//sq//dtd html 2.0 hotmetal + extensions//",
            "-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//",
            "-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//",
            "-//spyglass//dtd html 2.0 extended//",
            "-//sun microsystems corp.//dtd hotjava html//",
            "-//sun microsystems corp.//dtd hotjava strict html//",
            "-//w3c//dtd html 3 1995-03-24//",
            "-//w3c//dtd html 3.2 draft//",
            "-//w3c//dtd html 3.2 final//",
            "-//w3c//dtd html 3.2//",
            "-//w3c//dtd html 3.2s draft//",
            "-//w3c//dtd html 4.0 frameset//",
            "-//w3c//dtd html 4.0 transitional//",
            "-//w3c//dtd html experimental 19960712//",
            "-//w3c//dtd html experimental 970421//",
            "-//w3c//dtd w3 html//",
            "-//w3o//dtd w3 html 3.0//",
            "-//webtechs//dtd mozilla html 2.0//",
            "-//webtechs//dtd mozilla html//",
          ],
          h = [
            ...l,
            "-//w3c//dtd html 4.01 frameset//",
            "-//w3c//dtd html 4.01 transitional//",
          ],
          T = new Set([
            "-//w3o//dtd w3 html strict 3.0//en//",
            "-/w3c/dtd html 4.0 transitional/en",
            "html",
          ]),
          d = [
            "-//w3c//dtd xhtml 1.0 frameset//",
            "-//w3c//dtd xhtml 1.0 transitional//",
          ],
          E = [
            ...d,
            "-//w3c//dtd html 4.01 frameset//",
            "-//w3c//dtd html 4.01 transitional//",
          ];
        (r.isConforming = i), (r.getDocumentMode = s);
      },
      { "./html.js": 68 },
    ],
    66: [
      function (e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.ERR = void 0),
          (function (e) {
            (e.controlCharacterInInputStream =
              "control-character-in-input-stream"),
              (e.noncharacterInInputStream = "noncharacter-in-input-stream"),
              (e.surrogateInInputStream = "surrogate-in-input-stream"),
              (e.nonVoidHtmlElementStartTagWithTrailingSolidus =
                "non-void-html-element-start-tag-with-trailing-solidus"),
              (e.endTagWithAttributes = "end-tag-with-attributes"),
              (e.endTagWithTrailingSolidus = "end-tag-with-trailing-solidus"),
              (e.unexpectedSolidusInTag = "unexpected-solidus-in-tag"),
              (e.unexpectedNullCharacter = "unexpected-null-character"),
              (e.unexpectedQuestionMarkInsteadOfTagName =
                "unexpected-question-mark-instead-of-tag-name"),
              (e.invalidFirstCharacterOfTagName =
                "invalid-first-character-of-tag-name"),
              (e.unexpectedEqualsSignBeforeAttributeName =
                "unexpected-equals-sign-before-attribute-name"),
              (e.missingEndTagName = "missing-end-tag-name"),
              (e.unexpectedCharacterInAttributeName =
                "unexpected-character-in-attribute-name"),
              (e.unknownNamedCharacterReference =
                "unknown-named-character-reference"),
              (e.missingSemicolonAfterCharacterReference =
                "missing-semicolon-after-character-reference"),
              (e.unexpectedCharacterAfterDoctypeSystemIdentifier =
                "unexpected-character-after-doctype-system-identifier"),
              (e.unexpectedCharacterInUnquotedAttributeValue =
                "unexpected-character-in-unquoted-attribute-value"),
              (e.eofBeforeTagName = "eof-before-tag-name"),
              (e.eofInTag = "eof-in-tag"),
              (e.missingAttributeValue = "missing-attribute-value"),
              (e.missingWhitespaceBetweenAttributes =
                "missing-whitespace-between-attributes"),
              (e.missingWhitespaceAfterDoctypePublicKeyword =
                "missing-whitespace-after-doctype-public-keyword"),
              (e.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers =
                "missing-whitespace-between-doctype-public-and-system-identifiers"),
              (e.missingWhitespaceAfterDoctypeSystemKeyword =
                "missing-whitespace-after-doctype-system-keyword"),
              (e.missingQuoteBeforeDoctypePublicIdentifier =
                "missing-quote-before-doctype-public-identifier"),
              (e.missingQuoteBeforeDoctypeSystemIdentifier =
                "missing-quote-before-doctype-system-identifier"),
              (e.missingDoctypePublicIdentifier =
                "missing-doctype-public-identifier"),
              (e.missingDoctypeSystemIdentifier =
                "missing-doctype-system-identifier"),
              (e.abruptDoctypePublicIdentifier =
                "abrupt-doctype-public-identifier"),
              (e.abruptDoctypeSystemIdentifier =
                "abrupt-doctype-system-identifier"),
              (e.cdataInHtmlContent = "cdata-in-html-content"),
              (e.incorrectlyOpenedComment = "incorrectly-opened-comment"),
              (e.eofInScriptHtmlCommentLikeText =
                "eof-in-script-html-comment-like-text"),
              (e.eofInDoctype = "eof-in-doctype"),
              (e.nestedComment = "nested-comment"),
              (e.abruptClosingOfEmptyComment =
                "abrupt-closing-of-empty-comment"),
              (e.eofInComment = "eof-in-comment"),
              (e.incorrectlyClosedComment = "incorrectly-closed-comment"),
              (e.eofInCdata = "eof-in-cdata"),
              (e.absenceOfDigitsInNumericCharacterReference =
                "absence-of-digits-in-numeric-character-reference"),
              (e.nullCharacterReference = "null-character-reference"),
              (e.surrogateCharacterReference = "surrogate-character-reference"),
              (e.characterReferenceOutsideUnicodeRange =
                "character-reference-outside-unicode-range"),
              (e.controlCharacterReference = "control-character-reference"),
              (e.noncharacterCharacterReference =
                "noncharacter-character-reference"),
              (e.missingWhitespaceBeforeDoctypeName =
                "missing-whitespace-before-doctype-name"),
              (e.missingDoctypeName = "missing-doctype-name"),
              (e.invalidCharacterSequenceAfterDoctypeName =
                "invalid-character-sequence-after-doctype-name"),
              (e.duplicateAttribute = "duplicate-attribute"),
              (e.nonConformingDoctype = "non-conforming-doctype"),
              (e.missingDoctype = "missing-doctype"),
              (e.misplacedDoctype = "misplaced-doctype"),
              (e.endTagWithoutMatchingOpenElement =
                "end-tag-without-matching-open-element"),
              (e.closingOfElementWithOpenChildElements =
                "closing-of-element-with-open-child-elements"),
              (e.disallowedContentInNoscriptInHead =
                "disallowed-content-in-noscript-in-head"),
              (e.openElementsLeftAfterEof = "open-elements-left-after-eof"),
              (e.abandonedHeadElementChild = "abandoned-head-element-child"),
              (e.misplacedStartTagForHeadElement =
                "misplaced-start-tag-for-head-element"),
              (e.nestedNoscriptInHead = "nested-noscript-in-head"),
              (e.eofInElementThatCanContainOnlyText =
                "eof-in-element-that-can-contain-only-text");
          })(r.ERR || (r.ERR = {}));
      },
      {},
    ],
    67: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          const t = e.tagID,
            r =
              t === h.TAG_ID.FONT &&
              e.attrs.some(
                ({ name: e }) =>
                  e === h.ATTRS.COLOR ||
                  e === h.ATTRS.SIZE ||
                  e === h.ATTRS.FACE
              );
          return r || _.has(t);
        }
        function i(e) {
          for (let t = 0; t < e.attrs.length; t++)
            if (e.attrs[t].name === d) {
              e.attrs[t].name = E;
              break;
            }
        }
        function s(e) {
          for (let t = 0; t < e.attrs.length; t++) {
            const r = p.get(e.attrs[t].name);
            null != r && (e.attrs[t].name = r);
          }
        }
        function a(e) {
          for (let t = 0; t < e.attrs.length; t++) {
            const r = f.get(e.attrs[t].name);
            r &&
              ((e.attrs[t].prefix = r.prefix),
              (e.attrs[t].name = r.name),
              (e.attrs[t].namespace = r.namespace));
          }
        }
        function o(e) {
          const t = r.SVG_TAG_NAMES_ADJUSTMENT_MAP.get(e.tagName);
          null != t &&
            ((e.tagName = t), (e.tagID = (0, h.getTagID)(e.tagName)));
        }
        function c(e, t) {
          return (
            t === h.NS.MATHML &&
            (e === h.TAG_ID.MI ||
              e === h.TAG_ID.MO ||
              e === h.TAG_ID.MN ||
              e === h.TAG_ID.MS ||
              e === h.TAG_ID.MTEXT)
          );
        }
        function u(e, t, r) {
          if (t === h.NS.MATHML && e === h.TAG_ID.ANNOTATION_XML)
            for (let e = 0; e < r.length; e++)
              if (r[e].name === h.ATTRS.ENCODING) {
                const t = r[e].value.toLowerCase();
                return t === T.TEXT_HTML || t === T.APPLICATION_XML;
              }
          return (
            t === h.NS.SVG &&
            (e === h.TAG_ID.FOREIGN_OBJECT ||
              e === h.TAG_ID.DESC ||
              e === h.TAG_ID.TITLE)
          );
        }
        function l(e, t, r, n) {
          return (
            ((!n || n === h.NS.HTML) && u(e, t, r)) ||
            ((!n || n === h.NS.MATHML) && c(e, t))
          );
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.isIntegrationPoint =
            r.adjustTokenSVGTagName =
            r.adjustTokenXMLAttrs =
            r.adjustTokenSVGAttrs =
            r.adjustTokenMathMLAttrs =
            r.causesExit =
            r.SVG_TAG_NAMES_ADJUSTMENT_MAP =
              void 0);
        const h = e("./html.js"),
          T = {
            TEXT_HTML: "text/html",
            APPLICATION_XML: "application/xhtml+xml",
          },
          d = "definitionurl",
          E = "definitionURL",
          p = new Map(
            [
              "attributeName",
              "attributeType",
              "baseFrequency",
              "baseProfile",
              "calcMode",
              "clipPathUnits",
              "diffuseConstant",
              "edgeMode",
              "filterUnits",
              "glyphRef",
              "gradientTransform",
              "gradientUnits",
              "kernelMatrix",
              "kernelUnitLength",
              "keyPoints",
              "keySplines",
              "keyTimes",
              "lengthAdjust",
              "limitingConeAngle",
              "markerHeight",
              "markerUnits",
              "markerWidth",
              "maskContentUnits",
              "maskUnits",
              "numOctaves",
              "pathLength",
              "patternContentUnits",
              "patternTransform",
              "patternUnits",
              "pointsAtX",
              "pointsAtY",
              "pointsAtZ",
              "preserveAlpha",
              "preserveAspectRatio",
              "primitiveUnits",
              "refX",
              "refY",
              "repeatCount",
              "repeatDur",
              "requiredExtensions",
              "requiredFeatures",
              "specularConstant",
              "specularExponent",
              "spreadMethod",
              "startOffset",
              "stdDeviation",
              "stitchTiles",
              "surfaceScale",
              "systemLanguage",
              "tableValues",
              "targetX",
              "targetY",
              "textLength",
              "viewBox",
              "viewTarget",
              "xChannelSelector",
              "yChannelSelector",
              "zoomAndPan",
            ].map((e) => [e.toLowerCase(), e])
          ),
          f = new Map([
            [
              "xlink:actuate",
              { prefix: "xlink", name: "actuate", namespace: h.NS.XLINK },
            ],
            [
              "xlink:arcrole",
              { prefix: "xlink", name: "arcrole", namespace: h.NS.XLINK },
            ],
            [
              "xlink:href",
              { prefix: "xlink", name: "href", namespace: h.NS.XLINK },
            ],
            [
              "xlink:role",
              { prefix: "xlink", name: "role", namespace: h.NS.XLINK },
            ],
            [
              "xlink:show",
              { prefix: "xlink", name: "show", namespace: h.NS.XLINK },
            ],
            [
              "xlink:title",
              { prefix: "xlink", name: "title", namespace: h.NS.XLINK },
            ],
            [
              "xlink:type",
              { prefix: "xlink", name: "type", namespace: h.NS.XLINK },
            ],
            ["xml:base", { prefix: "xml", name: "base", namespace: h.NS.XML }],
            ["xml:lang", { prefix: "xml", name: "lang", namespace: h.NS.XML }],
            [
              "xml:space",
              { prefix: "xml", name: "space", namespace: h.NS.XML },
            ],
            ["xmlns", { prefix: "", name: "xmlns", namespace: h.NS.XMLNS }],
            [
              "xmlns:xlink",
              { prefix: "xmlns", name: "xlink", namespace: h.NS.XMLNS },
            ],
          ]);
        r.SVG_TAG_NAMES_ADJUSTMENT_MAP = new Map(
          [
            "altGlyph",
            "altGlyphDef",
            "altGlyphItem",
            "animateColor",
            "animateMotion",
            "animateTransform",
            "clipPath",
            "feBlend",
            "feColorMatrix",
            "feComponentTransfer",
            "feComposite",
            "feConvolveMatrix",
            "feDiffuseLighting",
            "feDisplacementMap",
            "feDistantLight",
            "feFlood",
            "feFuncA",
            "feFuncB",
            "feFuncG",
            "feFuncR",
            "feGaussianBlur",
            "feImage",
            "feMerge",
            "feMergeNode",
            "feMorphology",
            "feOffset",
            "fePointLight",
            "feSpecularLighting",
            "feSpotLight",
            "feTile",
            "feTurbulence",
            "foreignObject",
            "glyphRef",
            "linearGradient",
            "radialGradient",
            "textPath",
          ].map((e) => [e.toLowerCase(), e])
        );
        const _ = new Set([
          h.TAG_ID.B,
          h.TAG_ID.BIG,
          h.TAG_ID.BLOCKQUOTE,
          h.TAG_ID.BODY,
          h.TAG_ID.BR,
          h.TAG_ID.CENTER,
          h.TAG_ID.CODE,
          h.TAG_ID.DD,
          h.TAG_ID.DIV,
          h.TAG_ID.DL,
          h.TAG_ID.DT,
          h.TAG_ID.EM,
          h.TAG_ID.EMBED,
          h.TAG_ID.H1,
          h.TAG_ID.H2,
          h.TAG_ID.H3,
          h.TAG_ID.H4,
          h.TAG_ID.H5,
          h.TAG_ID.H6,
          h.TAG_ID.HEAD,
          h.TAG_ID.HR,
          h.TAG_ID.I,
          h.TAG_ID.IMG,
          h.TAG_ID.LI,
          h.TAG_ID.LISTING,
          h.TAG_ID.MENU,
          h.TAG_ID.META,
          h.TAG_ID.NOBR,
          h.TAG_ID.OL,
          h.TAG_ID.P,
          h.TAG_ID.PRE,
          h.TAG_ID.RUBY,
          h.TAG_ID.S,
          h.TAG_ID.SMALL,
          h.TAG_ID.SPAN,
          h.TAG_ID.STRONG,
          h.TAG_ID.STRIKE,
          h.TAG_ID.SUB,
          h.TAG_ID.SUP,
          h.TAG_ID.TABLE,
          h.TAG_ID.TT,
          h.TAG_ID.U,
          h.TAG_ID.UL,
          h.TAG_ID.VAR,
        ]);
        (r.causesExit = n),
          (r.adjustTokenMathMLAttrs = i),
          (r.adjustTokenSVGAttrs = s),
          (r.adjustTokenXMLAttrs = a),
          (r.adjustTokenSVGTagName = o),
          (r.isIntegrationPoint = l);
      },
      { "./html.js": 68 },
    ],
    68: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          var t;
          return null !== (t = u.get(e)) && void 0 !== t ? t : c.UNKNOWN;
        }
        function i(e) {
          return (
            e === l.H1 ||
            e === l.H2 ||
            e === l.H3 ||
            e === l.H4 ||
            e === l.H5 ||
            e === l.H6
          );
        }
        function s(e, t) {
          return h.has(e) || (t && e === o.NOSCRIPT);
        }
        var a, o, c;
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.hasUnescapedText =
            r.isNumberedHeader =
            r.SPECIAL_ELEMENTS =
            r.getTagID =
            r.TAG_ID =
            r.TAG_NAMES =
            r.DOCUMENT_MODE =
            r.ATTRS =
            r.NS =
              void 0),
          (function (e) {
            (e.HTML = "http://www.w3.org/1999/xhtml"),
              (e.MATHML = "http://www.w3.org/1998/Math/MathML"),
              (e.SVG = "http://www.w3.org/2000/svg"),
              (e.XLINK = "http://www.w3.org/1999/xlink"),
              (e.XML = "http://www.w3.org/XML/1998/namespace"),
              (e.XMLNS = "http://www.w3.org/2000/xmlns/");
          })((a = r.NS || (r.NS = {}))),
          (function (e) {
            (e.TYPE = "type"),
              (e.ACTION = "action"),
              (e.ENCODING = "encoding"),
              (e.PROMPT = "prompt"),
              (e.NAME = "name"),
              (e.COLOR = "color"),
              (e.FACE = "face"),
              (e.SIZE = "size");
          })(r.ATTRS || (r.ATTRS = {})),
          (function (e) {
            (e.NO_QUIRKS = "no-quirks"),
              (e.QUIRKS = "quirks"),
              (e.LIMITED_QUIRKS = "limited-quirks");
          })(r.DOCUMENT_MODE || (r.DOCUMENT_MODE = {})),
          (function (e) {
            (e.A = "a"),
              (e.ADDRESS = "address"),
              (e.ANNOTATION_XML = "annotation-xml"),
              (e.APPLET = "applet"),
              (e.AREA = "area"),
              (e.ARTICLE = "article"),
              (e.ASIDE = "aside"),
              (e.B = "b"),
              (e.BASE = "base"),
              (e.BASEFONT = "basefont"),
              (e.BGSOUND = "bgsound"),
              (e.BIG = "big"),
              (e.BLOCKQUOTE = "blockquote"),
              (e.BODY = "body"),
              (e.BR = "br"),
              (e.BUTTON = "button"),
              (e.CAPTION = "caption"),
              (e.CENTER = "center"),
              (e.CODE = "code"),
              (e.COL = "col"),
              (e.COLGROUP = "colgroup"),
              (e.DD = "dd"),
              (e.DESC = "desc"),
              (e.DETAILS = "details"),
              (e.DIALOG = "dialog"),
              (e.DIR = "dir"),
              (e.DIV = "div"),
              (e.DL = "dl"),
              (e.DT = "dt"),
              (e.EM = "em"),
              (e.EMBED = "embed"),
              (e.FIELDSET = "fieldset"),
              (e.FIGCAPTION = "figcaption"),
              (e.FIGURE = "figure"),
              (e.FONT = "font"),
              (e.FOOTER = "footer"),
              (e.FOREIGN_OBJECT = "foreignObject"),
              (e.FORM = "form"),
              (e.FRAME = "frame"),
              (e.FRAMESET = "frameset"),
              (e.H1 = "h1"),
              (e.H2 = "h2"),
              (e.H3 = "h3"),
              (e.H4 = "h4"),
              (e.H5 = "h5"),
              (e.H6 = "h6"),
              (e.HEAD = "head"),
              (e.HEADER = "header"),
              (e.HGROUP = "hgroup"),
              (e.HR = "hr"),
              (e.HTML = "html"),
              (e.I = "i"),
              (e.IMG = "img"),
              (e.IMAGE = "image"),
              (e.INPUT = "input"),
              (e.IFRAME = "iframe"),
              (e.KEYGEN = "keygen"),
              (e.LABEL = "label"),
              (e.LI = "li"),
              (e.LINK = "link"),
              (e.LISTING = "listing"),
              (e.MAIN = "main"),
              (e.MALIGNMARK = "malignmark"),
              (e.MARQUEE = "marquee"),
              (e.MATH = "math"),
              (e.MENU = "menu"),
              (e.META = "meta"),
              (e.MGLYPH = "mglyph"),
              (e.MI = "mi"),
              (e.MO = "mo"),
              (e.MN = "mn"),
              (e.MS = "ms"),
              (e.MTEXT = "mtext"),
              (e.NAV = "nav"),
              (e.NOBR = "nobr"),
              (e.NOFRAMES = "noframes"),
              (e.NOEMBED = "noembed"),
              (e.NOSCRIPT = "noscript"),
              (e.OBJECT = "object"),
              (e.OL = "ol"),
              (e.OPTGROUP = "optgroup"),
              (e.OPTION = "option"),
              (e.P = "p"),
              (e.PARAM = "param"),
              (e.PLAINTEXT = "plaintext"),
              (e.PRE = "pre"),
              (e.RB = "rb"),
              (e.RP = "rp"),
              (e.RT = "rt"),
              (e.RTC = "rtc"),
              (e.RUBY = "ruby"),
              (e.S = "s"),
              (e.SCRIPT = "script"),
              (e.SECTION = "section"),
              (e.SELECT = "select"),
              (e.SOURCE = "source"),
              (e.SMALL = "small"),
              (e.SPAN = "span"),
              (e.STRIKE = "strike"),
              (e.STRONG = "strong"),
              (e.STYLE = "style"),
              (e.SUB = "sub"),
              (e.SUMMARY = "summary"),
              (e.SUP = "sup"),
              (e.TABLE = "table"),
              (e.TBODY = "tbody"),
              (e.TEMPLATE = "template"),
              (e.TEXTAREA = "textarea"),
              (e.TFOOT = "tfoot"),
              (e.TD = "td"),
              (e.TH = "th"),
              (e.THEAD = "thead"),
              (e.TITLE = "title"),
              (e.TR = "tr"),
              (e.TRACK = "track"),
              (e.TT = "tt"),
              (e.U = "u"),
              (e.UL = "ul"),
              (e.SVG = "svg"),
              (e.VAR = "var"),
              (e.WBR = "wbr"),
              (e.XMP = "xmp");
          })((o = r.TAG_NAMES || (r.TAG_NAMES = {}))),
          (function (e) {
            (e[(e.UNKNOWN = 0)] = "UNKNOWN"),
              (e[(e.A = 1)] = "A"),
              (e[(e.ADDRESS = 2)] = "ADDRESS"),
              (e[(e.ANNOTATION_XML = 3)] = "ANNOTATION_XML"),
              (e[(e.APPLET = 4)] = "APPLET"),
              (e[(e.AREA = 5)] = "AREA"),
              (e[(e.ARTICLE = 6)] = "ARTICLE"),
              (e[(e.ASIDE = 7)] = "ASIDE"),
              (e[(e.B = 8)] = "B"),
              (e[(e.BASE = 9)] = "BASE"),
              (e[(e.BASEFONT = 10)] = "BASEFONT"),
              (e[(e.BGSOUND = 11)] = "BGSOUND"),
              (e[(e.BIG = 12)] = "BIG"),
              (e[(e.BLOCKQUOTE = 13)] = "BLOCKQUOTE"),
              (e[(e.BODY = 14)] = "BODY"),
              (e[(e.BR = 15)] = "BR"),
              (e[(e.BUTTON = 16)] = "BUTTON"),
              (e[(e.CAPTION = 17)] = "CAPTION"),
              (e[(e.CENTER = 18)] = "CENTER"),
              (e[(e.CODE = 19)] = "CODE"),
              (e[(e.COL = 20)] = "COL"),
              (e[(e.COLGROUP = 21)] = "COLGROUP"),
              (e[(e.DD = 22)] = "DD"),
              (e[(e.DESC = 23)] = "DESC"),
              (e[(e.DETAILS = 24)] = "DETAILS"),
              (e[(e.DIALOG = 25)] = "DIALOG"),
              (e[(e.DIR = 26)] = "DIR"),
              (e[(e.DIV = 27)] = "DIV"),
              (e[(e.DL = 28)] = "DL"),
              (e[(e.DT = 29)] = "DT"),
              (e[(e.EM = 30)] = "EM"),
              (e[(e.EMBED = 31)] = "EMBED"),
              (e[(e.FIELDSET = 32)] = "FIELDSET"),
              (e[(e.FIGCAPTION = 33)] = "FIGCAPTION"),
              (e[(e.FIGURE = 34)] = "FIGURE"),
              (e[(e.FONT = 35)] = "FONT"),
              (e[(e.FOOTER = 36)] = "FOOTER"),
              (e[(e.FOREIGN_OBJECT = 37)] = "FOREIGN_OBJECT"),
              (e[(e.FORM = 38)] = "FORM"),
              (e[(e.FRAME = 39)] = "FRAME"),
              (e[(e.FRAMESET = 40)] = "FRAMESET"),
              (e[(e.H1 = 41)] = "H1"),
              (e[(e.H2 = 42)] = "H2"),
              (e[(e.H3 = 43)] = "H3"),
              (e[(e.H4 = 44)] = "H4"),
              (e[(e.H5 = 45)] = "H5"),
              (e[(e.H6 = 46)] = "H6"),
              (e[(e.HEAD = 47)] = "HEAD"),
              (e[(e.HEADER = 48)] = "HEADER"),
              (e[(e.HGROUP = 49)] = "HGROUP"),
              (e[(e.HR = 50)] = "HR"),
              (e[(e.HTML = 51)] = "HTML"),
              (e[(e.I = 52)] = "I"),
              (e[(e.IMG = 53)] = "IMG"),
              (e[(e.IMAGE = 54)] = "IMAGE"),
              (e[(e.INPUT = 55)] = "INPUT"),
              (e[(e.IFRAME = 56)] = "IFRAME"),
              (e[(e.KEYGEN = 57)] = "KEYGEN"),
              (e[(e.LABEL = 58)] = "LABEL"),
              (e[(e.LI = 59)] = "LI"),
              (e[(e.LINK = 60)] = "LINK"),
              (e[(e.LISTING = 61)] = "LISTING"),
              (e[(e.MAIN = 62)] = "MAIN"),
              (e[(e.MALIGNMARK = 63)] = "MALIGNMARK"),
              (e[(e.MARQUEE = 64)] = "MARQUEE"),
              (e[(e.MATH = 65)] = "MATH"),
              (e[(e.MENU = 66)] = "MENU"),
              (e[(e.META = 67)] = "META"),
              (e[(e.MGLYPH = 68)] = "MGLYPH"),
              (e[(e.MI = 69)] = "MI"),
              (e[(e.MO = 70)] = "MO"),
              (e[(e.MN = 71)] = "MN"),
              (e[(e.MS = 72)] = "MS"),
              (e[(e.MTEXT = 73)] = "MTEXT"),
              (e[(e.NAV = 74)] = "NAV"),
              (e[(e.NOBR = 75)] = "NOBR"),
              (e[(e.NOFRAMES = 76)] = "NOFRAMES"),
              (e[(e.NOEMBED = 77)] = "NOEMBED"),
              (e[(e.NOSCRIPT = 78)] = "NOSCRIPT"),
              (e[(e.OBJECT = 79)] = "OBJECT"),
              (e[(e.OL = 80)] = "OL"),
              (e[(e.OPTGROUP = 81)] = "OPTGROUP"),
              (e[(e.OPTION = 82)] = "OPTION"),
              (e[(e.P = 83)] = "P"),
              (e[(e.PARAM = 84)] = "PARAM"),
              (e[(e.PLAINTEXT = 85)] = "PLAINTEXT"),
              (e[(e.PRE = 86)] = "PRE"),
              (e[(e.RB = 87)] = "RB"),
              (e[(e.RP = 88)] = "RP"),
              (e[(e.RT = 89)] = "RT"),
              (e[(e.RTC = 90)] = "RTC"),
              (e[(e.RUBY = 91)] = "RUBY"),
              (e[(e.S = 92)] = "S"),
              (e[(e.SCRIPT = 93)] = "SCRIPT"),
              (e[(e.SECTION = 94)] = "SECTION"),
              (e[(e.SELECT = 95)] = "SELECT"),
              (e[(e.SOURCE = 96)] = "SOURCE"),
              (e[(e.SMALL = 97)] = "SMALL"),
              (e[(e.SPAN = 98)] = "SPAN"),
              (e[(e.STRIKE = 99)] = "STRIKE"),
              (e[(e.STRONG = 100)] = "STRONG"),
              (e[(e.STYLE = 101)] = "STYLE"),
              (e[(e.SUB = 102)] = "SUB"),
              (e[(e.SUMMARY = 103)] = "SUMMARY"),
              (e[(e.SUP = 104)] = "SUP"),
              (e[(e.TABLE = 105)] = "TABLE"),
              (e[(e.TBODY = 106)] = "TBODY"),
              (e[(e.TEMPLATE = 107)] = "TEMPLATE"),
              (e[(e.TEXTAREA = 108)] = "TEXTAREA"),
              (e[(e.TFOOT = 109)] = "TFOOT"),
              (e[(e.TD = 110)] = "TD"),
              (e[(e.TH = 111)] = "TH"),
              (e[(e.THEAD = 112)] = "THEAD"),
              (e[(e.TITLE = 113)] = "TITLE"),
              (e[(e.TR = 114)] = "TR"),
              (e[(e.TRACK = 115)] = "TRACK"),
              (e[(e.TT = 116)] = "TT"),
              (e[(e.U = 117)] = "U"),
              (e[(e.UL = 118)] = "UL"),
              (e[(e.SVG = 119)] = "SVG"),
              (e[(e.VAR = 120)] = "VAR"),
              (e[(e.WBR = 121)] = "WBR"),
              (e[(e.XMP = 122)] = "XMP");
          })((c = r.TAG_ID || (r.TAG_ID = {})));
        const u = new Map([
          [o.A, c.A],
          [o.ADDRESS, c.ADDRESS],
          [o.ANNOTATION_XML, c.ANNOTATION_XML],
          [o.APPLET, c.APPLET],
          [o.AREA, c.AREA],
          [o.ARTICLE, c.ARTICLE],
          [o.ASIDE, c.ASIDE],
          [o.B, c.B],
          [o.BASE, c.BASE],
          [o.BASEFONT, c.BASEFONT],
          [o.BGSOUND, c.BGSOUND],
          [o.BIG, c.BIG],
          [o.BLOCKQUOTE, c.BLOCKQUOTE],
          [o.BODY, c.BODY],
          [o.BR, c.BR],
          [o.BUTTON, c.BUTTON],
          [o.CAPTION, c.CAPTION],
          [o.CENTER, c.CENTER],
          [o.CODE, c.CODE],
          [o.COL, c.COL],
          [o.COLGROUP, c.COLGROUP],
          [o.DD, c.DD],
          [o.DESC, c.DESC],
          [o.DETAILS, c.DETAILS],
          [o.DIALOG, c.DIALOG],
          [o.DIR, c.DIR],
          [o.DIV, c.DIV],
          [o.DL, c.DL],
          [o.DT, c.DT],
          [o.EM, c.EM],
          [o.EMBED, c.EMBED],
          [o.FIELDSET, c.FIELDSET],
          [o.FIGCAPTION, c.FIGCAPTION],
          [o.FIGURE, c.FIGURE],
          [o.FONT, c.FONT],
          [o.FOOTER, c.FOOTER],
          [o.FOREIGN_OBJECT, c.FOREIGN_OBJECT],
          [o.FORM, c.FORM],
          [o.FRAME, c.FRAME],
          [o.FRAMESET, c.FRAMESET],
          [o.H1, c.H1],
          [o.H2, c.H2],
          [o.H3, c.H3],
          [o.H4, c.H4],
          [o.H5, c.H5],
          [o.H6, c.H6],
          [o.HEAD, c.HEAD],
          [o.HEADER, c.HEADER],
          [o.HGROUP, c.HGROUP],
          [o.HR, c.HR],
          [o.HTML, c.HTML],
          [o.I, c.I],
          [o.IMG, c.IMG],
          [o.IMAGE, c.IMAGE],
          [o.INPUT, c.INPUT],
          [o.IFRAME, c.IFRAME],
          [o.KEYGEN, c.KEYGEN],
          [o.LABEL, c.LABEL],
          [o.LI, c.LI],
          [o.LINK, c.LINK],
          [o.LISTING, c.LISTING],
          [o.MAIN, c.MAIN],
          [o.MALIGNMARK, c.MALIGNMARK],
          [o.MARQUEE, c.MARQUEE],
          [o.MATH, c.MATH],
          [o.MENU, c.MENU],
          [o.META, c.META],
          [o.MGLYPH, c.MGLYPH],
          [o.MI, c.MI],
          [o.MO, c.MO],
          [o.MN, c.MN],
          [o.MS, c.MS],
          [o.MTEXT, c.MTEXT],
          [o.NAV, c.NAV],
          [o.NOBR, c.NOBR],
          [o.NOFRAMES, c.NOFRAMES],
          [o.NOEMBED, c.NOEMBED],
          [o.NOSCRIPT, c.NOSCRIPT],
          [o.OBJECT, c.OBJECT],
          [o.OL, c.OL],
          [o.OPTGROUP, c.OPTGROUP],
          [o.OPTION, c.OPTION],
          [o.P, c.P],
          [o.PARAM, c.PARAM],
          [o.PLAINTEXT, c.PLAINTEXT],
          [o.PRE, c.PRE],
          [o.RB, c.RB],
          [o.RP, c.RP],
          [o.RT, c.RT],
          [o.RTC, c.RTC],
          [o.RUBY, c.RUBY],
          [o.S, c.S],
          [o.SCRIPT, c.SCRIPT],
          [o.SECTION, c.SECTION],
          [o.SELECT, c.SELECT],
          [o.SOURCE, c.SOURCE],
          [o.SMALL, c.SMALL],
          [o.SPAN, c.SPAN],
          [o.STRIKE, c.STRIKE],
          [o.STRONG, c.STRONG],
          [o.STYLE, c.STYLE],
          [o.SUB, c.SUB],
          [o.SUMMARY, c.SUMMARY],
          [o.SUP, c.SUP],
          [o.TABLE, c.TABLE],
          [o.TBODY, c.TBODY],
          [o.TEMPLATE, c.TEMPLATE],
          [o.TEXTAREA, c.TEXTAREA],
          [o.TFOOT, c.TFOOT],
          [o.TD, c.TD],
          [o.TH, c.TH],
          [o.THEAD, c.THEAD],
          [o.TITLE, c.TITLE],
          [o.TR, c.TR],
          [o.TRACK, c.TRACK],
          [o.TT, c.TT],
          [o.U, c.U],
          [o.UL, c.UL],
          [o.SVG, c.SVG],
          [o.VAR, c.VAR],
          [o.WBR, c.WBR],
          [o.XMP, c.XMP],
        ]);
        r.getTagID = n;
        const l = c;
        (r.SPECIAL_ELEMENTS = {
          [a.HTML]: new Set([
            l.ADDRESS,
            l.APPLET,
            l.AREA,
            l.ARTICLE,
            l.ASIDE,
            l.BASE,
            l.BASEFONT,
            l.BGSOUND,
            l.BLOCKQUOTE,
            l.BODY,
            l.BR,
            l.BUTTON,
            l.CAPTION,
            l.CENTER,
            l.COL,
            l.COLGROUP,
            l.DD,
            l.DETAILS,
            l.DIR,
            l.DIV,
            l.DL,
            l.DT,
            l.EMBED,
            l.FIELDSET,
            l.FIGCAPTION,
            l.FIGURE,
            l.FOOTER,
            l.FORM,
            l.FRAME,
            l.FRAMESET,
            l.H1,
            l.H2,
            l.H3,
            l.H4,
            l.H5,
            l.H6,
            l.HEAD,
            l.HEADER,
            l.HGROUP,
            l.HR,
            l.HTML,
            l.IFRAME,
            l.IMG,
            l.INPUT,
            l.LI,
            l.LINK,
            l.LISTING,
            l.MAIN,
            l.MARQUEE,
            l.MENU,
            l.META,
            l.NAV,
            l.NOEMBED,
            l.NOFRAMES,
            l.NOSCRIPT,
            l.OBJECT,
            l.OL,
            l.P,
            l.PARAM,
            l.PLAINTEXT,
            l.PRE,
            l.SCRIPT,
            l.SECTION,
            l.SELECT,
            l.SOURCE,
            l.STYLE,
            l.SUMMARY,
            l.TABLE,
            l.TBODY,
            l.TD,
            l.TEMPLATE,
            l.TEXTAREA,
            l.TFOOT,
            l.TH,
            l.THEAD,
            l.TITLE,
            l.TR,
            l.TRACK,
            l.UL,
            l.WBR,
            l.XMP,
          ]),
          [a.MATHML]: new Set([
            l.MI,
            l.MO,
            l.MN,
            l.MS,
            l.MTEXT,
            l.ANNOTATION_XML,
          ]),
          [a.SVG]: new Set([l.TITLE, l.FOREIGN_OBJECT, l.DESC]),
          [a.XLINK]: new Set(),
          [a.XML]: new Set(),
          [a.XMLNS]: new Set(),
        }),
          (r.isNumberedHeader = i);
        const h = new Set([
          o.STYLE,
          o.SCRIPT,
          o.XMP,
          o.IFRAME,
          o.NOEMBED,
          o.NOFRAMES,
          o.PLAINTEXT,
        ]);
        r.hasUnescapedText = s;
      },
      {},
    ],
    69: [
      function (e, t, r) {
        "use strict";
        function n(e, t) {
          for (let r = e.attrs.length - 1; r >= 0; r--)
            if (e.attrs[r].name === t) return e.attrs[r].value;
          return null;
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.getTokenAttr = r.TokenType = void 0),
          (function (e) {
            (e[(e.CHARACTER = 0)] = "CHARACTER"),
              (e[(e.NULL_CHARACTER = 1)] = "NULL_CHARACTER"),
              (e[(e.WHITESPACE_CHARACTER = 2)] = "WHITESPACE_CHARACTER"),
              (e[(e.START_TAG = 3)] = "START_TAG"),
              (e[(e.END_TAG = 4)] = "END_TAG"),
              (e[(e.COMMENT = 5)] = "COMMENT"),
              (e[(e.DOCTYPE = 6)] = "DOCTYPE"),
              (e[(e.EOF = 7)] = "EOF"),
              (e[(e.HIBERNATION = 8)] = "HIBERNATION");
          })(r.TokenType || (r.TokenType = {})),
          (r.getTokenAttr = n);
      },
      {},
    ],
    70: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          return e >= 55296 && e <= 57343;
        }
        function i(e) {
          return e >= 56320 && e <= 57343;
        }
        function s(e, t) {
          return 1024 * (e - 55296) + 9216 + t;
        }
        function a(e) {
          return (
            (32 !== e &&
              10 !== e &&
              13 !== e &&
              9 !== e &&
              12 !== e &&
              e >= 1 &&
              e <= 31) ||
            (e >= 127 && e <= 159)
          );
        }
        function o(e) {
          return (e >= 64976 && e <= 65007) || c.has(e);
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.isUndefinedCodePoint =
            r.isControlCodePoint =
            r.getSurrogatePairCodePoint =
            r.isSurrogatePair =
            r.isSurrogate =
            r.SEQUENCES =
            r.CODE_POINTS =
            r.REPLACEMENT_CHARACTER =
              void 0);
        const c = new Set([
          65534, 65535, 131070, 131071, 196606, 196607, 262142, 262143, 327678,
          327679, 393214, 393215, 458750, 458751, 524286, 524287, 589822,
          589823, 655358, 655359, 720894, 720895, 786430, 786431, 851966,
          851967, 917502, 917503, 983038, 983039, 1048574, 1048575, 1114110,
          1114111,
        ]);
        (r.REPLACEMENT_CHARACTER = "�"),
          (function (e) {
            (e[(e.EOF = -1)] = "EOF"),
              (e[(e.NULL = 0)] = "NULL"),
              (e[(e.TABULATION = 9)] = "TABULATION"),
              (e[(e.CARRIAGE_RETURN = 13)] = "CARRIAGE_RETURN"),
              (e[(e.LINE_FEED = 10)] = "LINE_FEED"),
              (e[(e.FORM_FEED = 12)] = "FORM_FEED"),
              (e[(e.SPACE = 32)] = "SPACE"),
              (e[(e.EXCLAMATION_MARK = 33)] = "EXCLAMATION_MARK"),
              (e[(e.QUOTATION_MARK = 34)] = "QUOTATION_MARK"),
              (e[(e.NUMBER_SIGN = 35)] = "NUMBER_SIGN"),
              (e[(e.AMPERSAND = 38)] = "AMPERSAND"),
              (e[(e.APOSTROPHE = 39)] = "APOSTROPHE"),
              (e[(e.HYPHEN_MINUS = 45)] = "HYPHEN_MINUS"),
              (e[(e.SOLIDUS = 47)] = "SOLIDUS"),
              (e[(e.DIGIT_0 = 48)] = "DIGIT_0"),
              (e[(e.DIGIT_9 = 57)] = "DIGIT_9"),
              (e[(e.SEMICOLON = 59)] = "SEMICOLON"),
              (e[(e.LESS_THAN_SIGN = 60)] = "LESS_THAN_SIGN"),
              (e[(e.EQUALS_SIGN = 61)] = "EQUALS_SIGN"),
              (e[(e.GREATER_THAN_SIGN = 62)] = "GREATER_THAN_SIGN"),
              (e[(e.QUESTION_MARK = 63)] = "QUESTION_MARK"),
              (e[(e.LATIN_CAPITAL_A = 65)] = "LATIN_CAPITAL_A"),
              (e[(e.LATIN_CAPITAL_F = 70)] = "LATIN_CAPITAL_F"),
              (e[(e.LATIN_CAPITAL_X = 88)] = "LATIN_CAPITAL_X"),
              (e[(e.LATIN_CAPITAL_Z = 90)] = "LATIN_CAPITAL_Z"),
              (e[(e.RIGHT_SQUARE_BRACKET = 93)] = "RIGHT_SQUARE_BRACKET"),
              (e[(e.GRAVE_ACCENT = 96)] = "GRAVE_ACCENT"),
              (e[(e.LATIN_SMALL_A = 97)] = "LATIN_SMALL_A"),
              (e[(e.LATIN_SMALL_F = 102)] = "LATIN_SMALL_F"),
              (e[(e.LATIN_SMALL_X = 120)] = "LATIN_SMALL_X"),
              (e[(e.LATIN_SMALL_Z = 122)] = "LATIN_SMALL_Z"),
              (e[(e.REPLACEMENT_CHARACTER = 65533)] = "REPLACEMENT_CHARACTER");
          })(r.CODE_POINTS || (r.CODE_POINTS = {})),
          (r.SEQUENCES = {
            DASH_DASH: "--",
            CDATA_START: "[CDATA[",
            DOCTYPE: "doctype",
            SCRIPT: "script",
            PUBLIC: "public",
            SYSTEM: "system",
          }),
          (r.isSurrogate = n),
          (r.isSurrogatePair = i),
          (r.getSurrogatePairCodePoint = s),
          (r.isControlCodePoint = a),
          (r.isUndefinedCodePoint = o);
      },
      {},
    ],
    71: [
      function (e, t, r) {
        "use strict";
        function n(e, t) {
          return s.Parser.parse(e, t);
        }
        function i(e, t, r) {
          "string" == typeof e && ((r = t), (t = e), (e = null));
          const n = s.Parser.getFragmentParser(e, r);
          return n.tokenizer.write(t, !0), n.getFragment();
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.parseFragment =
            r.parse =
            r.TokenizerMode =
            r.Tokenizer =
            r.Token =
            r.html =
            r.foreignContent =
            r.ErrorCodes =
            r.serializeOuter =
            r.serialize =
            r.Parser =
            r.defaultTreeAdapter =
              void 0);
        const s = e("./parser/index.js");
        var a = e("./tree-adapters/default.js");
        Object.defineProperty(r, "defaultTreeAdapter", {
          enumerable: !0,
          get: function () {
            return a.defaultTreeAdapter;
          },
        });
        var o = e("./parser/index.js");
        Object.defineProperty(r, "Parser", {
          enumerable: !0,
          get: function () {
            return o.Parser;
          },
        });
        var c = e("./serializer/index.js");
        Object.defineProperty(r, "serialize", {
          enumerable: !0,
          get: function () {
            return c.serialize;
          },
        }),
          Object.defineProperty(r, "serializeOuter", {
            enumerable: !0,
            get: function () {
              return c.serializeOuter;
            },
          });
        var u = e("./common/error-codes.js");
        Object.defineProperty(r, "ErrorCodes", {
          enumerable: !0,
          get: function () {
            return u.ERR;
          },
        }),
          (r.foreignContent = e("./common/foreign-content.js")),
          (r.html = e("./common/html.js")),
          (r.Token = e("./common/token.js"));
        var l = e("./tokenizer/index.js");
        Object.defineProperty(r, "Tokenizer", {
          enumerable: !0,
          get: function () {
            return l.Tokenizer;
          },
        }),
          Object.defineProperty(r, "TokenizerMode", {
            enumerable: !0,
            get: function () {
              return l.TokenizerMode;
            },
          }),
          (r.parse = n),
          (r.parseFragment = i);
      },
      {
        "./common/error-codes.js": 66,
        "./common/foreign-content.js": 67,
        "./common/html.js": 68,
        "./common/token.js": 69,
        "./parser/index.js": 73,
        "./serializer/index.js": 75,
        "./tokenizer/index.js": 76,
        "./tree-adapters/default.js": 78,
      },
    ],
    72: [
      function (e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.FormattingElementList = r.EntryType = void 0);
        const n = 3;
        var i;
        (function (e) {
          (e[(e.Marker = 0)] = "Marker"), (e[(e.Element = 1)] = "Element");
        })((i = r.EntryType || (r.EntryType = {})));
        const s = { type: i.Marker };
        class a {
          constructor(e) {
            (this.treeAdapter = e), (this.entries = []), (this.bookmark = null);
          }
          _getNoahArkConditionCandidates(e, t) {
            const r = [],
              n = t.length,
              s = this.treeAdapter.getTagName(e),
              a = this.treeAdapter.getNamespaceURI(e);
            for (let e = 0; e < this.entries.length; e++) {
              const t = this.entries[e];
              if (t.type === i.Marker) break;
              const { element: o } = t;
              if (
                this.treeAdapter.getTagName(o) === s &&
                this.treeAdapter.getNamespaceURI(o) === a
              ) {
                const t = this.treeAdapter.getAttrList(o);
                t.length === n && r.push({ idx: e, attrs: t });
              }
            }
            return r;
          }
          _ensureNoahArkCondition(e) {
            if (this.entries.length < n) return;
            const t = this.treeAdapter.getAttrList(e),
              r = this._getNoahArkConditionCandidates(e, t);
            if (r.length < n) return;
            const i = new Map(t.map((e) => [e.name, e.value]));
            let s = 0;
            for (let e = 0; e < r.length; e++) {
              const t = r[e];
              t.attrs.every((e) => i.get(e.name) === e.value) &&
                ((s += 1), s >= n && this.entries.splice(t.idx, 1));
            }
          }
          insertMarker() {
            this.entries.unshift(s);
          }
          pushElement(e, t) {
            this._ensureNoahArkCondition(e),
              this.entries.unshift({ type: i.Element, element: e, token: t });
          }
          insertElementAfterBookmark(e, t) {
            const r = this.entries.indexOf(this.bookmark);
            this.entries.splice(r, 0, {
              type: i.Element,
              element: e,
              token: t,
            });
          }
          removeEntry(e) {
            const t = this.entries.indexOf(e);
            t >= 0 && this.entries.splice(t, 1);
          }
          clearToLastMarker() {
            const e = this.entries.indexOf(s);
            e >= 0 ? this.entries.splice(0, e + 1) : (this.entries.length = 0);
          }
          getElementEntryInScopeWithTagName(e) {
            const t = this.entries.find(
              (t) =>
                t.type === i.Marker ||
                this.treeAdapter.getTagName(t.element) === e
            );
            return t && t.type === i.Element ? t : null;
          }
          getElementEntry(e) {
            return this.entries.find(
              (t) => t.type === i.Element && t.element === e
            );
          }
        }
        r.FormattingElementList = a;
      },
      {},
    ],
    73: [
      function (e, t, r) {
        "use strict";
        function n(e, t) {
          let r = e.activeFormattingElements.getElementEntryInScopeWithTagName(
            t.tagName
          );
          return (
            r
              ? e.openElements.contains(r.element)
                ? e.openElements.hasInScope(t.tagID) || (r = null)
                : (e.activeFormattingElements.removeEntry(r), (r = null))
              : Ce(e, t),
            r
          );
        }
        function i(e, t) {
          let r = null,
            n = e.openElements.stackTop;
          for (; n >= 0; n--) {
            const i = e.openElements.items[n];
            if (i === t.element) break;
            e._isSpecialElement(i, e.openElements.tagIDs[n]) && (r = i);
          }
          return (
            r ||
              (e.openElements.shortenToLength(n < 0 ? 0 : n),
              e.activeFormattingElements.removeEntry(t)),
            r
          );
        }
        function s(e, t, r) {
          let n = t,
            i = e.openElements.getCommonAncestor(t);
          for (let s = 0, o = i; o !== r; s++, o = i) {
            i = e.openElements.getCommonAncestor(o);
            const r = e.activeFormattingElements.getElementEntry(o),
              c = r && s >= Gt,
              u = !r || c;
            u
              ? (c && e.activeFormattingElements.removeEntry(r),
                e.openElements.remove(o))
              : ((o = a(e, r)),
                n === t && (e.activeFormattingElements.bookmark = r),
                e.treeAdapter.detachNode(n),
                e.treeAdapter.appendChild(o, n),
                (n = o));
          }
          return n;
        }
        function a(e, t) {
          const r = e.treeAdapter.getNamespaceURI(t.element),
            n = e.treeAdapter.createElement(t.token.tagName, r, t.token.attrs);
          return e.openElements.replace(t.element, n), (t.element = n), n;
        }
        function o(e, t, r) {
          const n = e.treeAdapter.getTagName(t),
            i = (0, vt.getTagID)(n);
          if (e._isElementCausesFosterParenting(i)) e._fosterParentElement(r);
          else {
            const n = e.treeAdapter.getNamespaceURI(t);
            i === vt.TAG_ID.TEMPLATE &&
              n === vt.NS.HTML &&
              (t = e.treeAdapter.getTemplateContent(t)),
              e.treeAdapter.appendChild(t, r);
          }
        }
        function c(e, t, r) {
          const n = e.treeAdapter.getNamespaceURI(r.element),
            { token: i } = r,
            s = e.treeAdapter.createElement(i.tagName, n, i.attrs);
          e._adoptNodes(t, s),
            e.treeAdapter.appendChild(t, s),
            e.activeFormattingElements.insertElementAfterBookmark(s, i),
            e.activeFormattingElements.removeEntry(r),
            e.openElements.remove(r.element),
            e.openElements.insertAfter(t, s, i.tagID);
        }
        function u(e, t) {
          for (let r = 0; r < kt; r++) {
            const r = n(e, t);
            if (!r) break;
            const a = i(e, r);
            if (!a) break;
            e.activeFormattingElements.bookmark = r;
            const u = s(e, a, r.element),
              l = e.openElements.getCommonAncestor(r.element);
            e.treeAdapter.detachNode(u), l && o(e, l, u), c(e, a, r);
          }
        }
        function l(e, t) {
          e._appendCommentNode(t, e.openElements.currentTmplContentOrNode);
        }
        function h(e, t) {
          e._appendCommentNode(t, e.openElements.items[0]);
        }
        function T(e, t) {
          e._appendCommentNode(t, e.document);
        }
        function d(e, t) {
          if (((e.stopped = !0), t.location)) {
            const r = e.fragmentContext ? 0 : 2;
            for (let n = e.openElements.stackTop; n >= r; n--)
              e._setEndLocation(e.openElements.items[n], t);
            if (!e.fragmentContext && e.openElements.stackTop >= 0) {
              const r = e.openElements.items[0],
                n = e.treeAdapter.getNodeSourceCodeLocation(r);
              if (
                n &&
                !n.endTag &&
                (e._setEndLocation(r, t), e.openElements.stackTop >= 1)
              ) {
                const r = e.openElements.items[1],
                  n = e.treeAdapter.getNodeSourceCodeLocation(r);
                n && !n.endTag && e._setEndLocation(r, t);
              }
            }
          }
        }
        function E(e, t) {
          e._setDocumentType(t);
          const r = t.forceQuirks
            ? vt.DOCUMENT_MODE.QUIRKS
            : bt.getDocumentMode(t);
          bt.isConforming(t) || e._err(t, yt.ERR.nonConformingDoctype),
            e.treeAdapter.setDocumentMode(e.document, r),
            (e.insertionMode = Bt.BEFORE_HTML);
        }
        function p(e, t) {
          e._err(t, yt.ERR.missingDoctype, !0),
            e.treeAdapter.setDocumentMode(e.document, vt.DOCUMENT_MODE.QUIRKS),
            (e.insertionMode = Bt.BEFORE_HTML),
            e._processToken(t);
        }
        function f(e, t) {
          t.tagID === vt.TAG_ID.HTML
            ? (e._insertElement(t, vt.NS.HTML),
              (e.insertionMode = Bt.BEFORE_HEAD))
            : A(e, t);
        }
        function _(e, t) {
          const r = t.tagID;
          (r !== vt.TAG_ID.HTML &&
            r !== vt.TAG_ID.HEAD &&
            r !== vt.TAG_ID.BODY &&
            r !== vt.TAG_ID.BR) ||
            A(e, t);
        }
        function A(e, t) {
          e._insertFakeRootElement(),
            (e.insertionMode = Bt.BEFORE_HEAD),
            e._processToken(t);
        }
        function m(e, t) {
          switch (t.tagID) {
            case vt.TAG_ID.HTML:
              de(e, t);
              break;
            case vt.TAG_ID.HEAD:
              e._insertElement(t, vt.NS.HTML),
                (e.headElement = e.openElements.current),
                (e.insertionMode = Bt.IN_HEAD);
              break;
            default:
              D(e, t);
          }
        }
        function I(e, t) {
          const r = t.tagID;
          r === vt.TAG_ID.HEAD ||
          r === vt.TAG_ID.BODY ||
          r === vt.TAG_ID.HTML ||
          r === vt.TAG_ID.BR
            ? D(e, t)
            : e._err(t, yt.ERR.endTagWithoutMatchingOpenElement);
        }
        function D(e, t) {
          e._insertFakeElement(vt.TAG_NAMES.HEAD, vt.TAG_ID.HEAD),
            (e.headElement = e.openElements.current),
            (e.insertionMode = Bt.IN_HEAD),
            e._processToken(t);
        }
        function g(e, t) {
          switch (t.tagID) {
            case vt.TAG_ID.HTML:
              de(e, t);
              break;
            case vt.TAG_ID.BASE:
            case vt.TAG_ID.BASEFONT:
            case vt.TAG_ID.BGSOUND:
            case vt.TAG_ID.LINK:
            case vt.TAG_ID.META:
              e._appendElement(t, vt.NS.HTML), (t.ackSelfClosing = !0);
              break;
            case vt.TAG_ID.TITLE:
              e._switchToTextParsing(t, Nt.TokenizerMode.RCDATA);
              break;
            case vt.TAG_ID.NOSCRIPT:
              e.options.scriptingEnabled
                ? e._switchToTextParsing(t, Nt.TokenizerMode.RAWTEXT)
                : (e._insertElement(t, vt.NS.HTML),
                  (e.insertionMode = Bt.IN_HEAD_NO_SCRIPT));
              break;
            case vt.TAG_ID.NOFRAMES:
            case vt.TAG_ID.STYLE:
              e._switchToTextParsing(t, Nt.TokenizerMode.RAWTEXT);
              break;
            case vt.TAG_ID.SCRIPT:
              e._switchToTextParsing(t, Nt.TokenizerMode.SCRIPT_DATA);
              break;
            case vt.TAG_ID.TEMPLATE:
              e._insertTemplate(t),
                e.activeFormattingElements.insertMarker(),
                (e.framesetOk = !1),
                (e.insertionMode = Bt.IN_TEMPLATE),
                e.tmplInsertionModeStack.unshift(Bt.IN_TEMPLATE);
              break;
            case vt.TAG_ID.HEAD:
              e._err(t, yt.ERR.misplacedStartTagForHeadElement);
              break;
            default:
              S(e, t);
          }
        }
        function N(e, t) {
          switch (t.tagID) {
            case vt.TAG_ID.HEAD:
              e.openElements.pop(), (e.insertionMode = Bt.AFTER_HEAD);
              break;
            case vt.TAG_ID.BODY:
            case vt.TAG_ID.BR:
            case vt.TAG_ID.HTML:
              S(e, t);
              break;
            case vt.TAG_ID.TEMPLATE:
              C(e, t);
              break;
            default:
              e._err(t, yt.ERR.endTagWithoutMatchingOpenElement);
          }
        }
        function C(e, t) {
          e.openElements.tmplCount > 0
            ? (e.openElements.generateImpliedEndTagsThoroughly(),
              e.openElements.currentTagId !== vt.TAG_ID.TEMPLATE &&
                e._err(t, yt.ERR.closingOfElementWithOpenChildElements),
              e.openElements.popUntilTagNamePopped(vt.TAG_ID.TEMPLATE),
              e.activeFormattingElements.clearToLastMarker(),
              e.tmplInsertionModeStack.shift(),
              e._resetInsertionMode())
            : e._err(t, yt.ERR.endTagWithoutMatchingOpenElement);
        }
        function S(e, t) {
          e.openElements.pop(),
            (e.insertionMode = Bt.AFTER_HEAD),
            e._processToken(t);
        }
        function O(e, t) {
          switch (t.tagID) {
            case vt.TAG_ID.HTML:
              de(e, t);
              break;
            case vt.TAG_ID.BASEFONT:
            case vt.TAG_ID.BGSOUND:
            case vt.TAG_ID.HEAD:
            case vt.TAG_ID.LINK:
            case vt.TAG_ID.META:
            case vt.TAG_ID.NOFRAMES:
            case vt.TAG_ID.STYLE:
              g(e, t);
              break;
            case vt.TAG_ID.NOSCRIPT:
              e._err(t, yt.ERR.nestedNoscriptInHead);
              break;
            default:
              R(e, t);
          }
        }
        function b(e, t) {
          switch (t.tagID) {
            case vt.TAG_ID.NOSCRIPT:
              e.openElements.pop(), (e.insertionMode = Bt.IN_HEAD);
              break;
            case vt.TAG_ID.BR:
              R(e, t);
              break;
            default:
              e._err(t, yt.ERR.endTagWithoutMatchingOpenElement);
          }
        }
        function R(e, t) {
          const r =
            t.type === Lt.TokenType.EOF
              ? yt.ERR.openElementsLeftAfterEof
              : yt.ERR.disallowedContentInNoscriptInHead;
          e._err(t, r),
            e.openElements.pop(),
            (e.insertionMode = Bt.IN_HEAD),
            e._processToken(t);
        }
        function y(e, t) {
          switch (t.tagID) {
            case vt.TAG_ID.HTML:
              de(e, t);
              break;
            case vt.TAG_ID.BODY:
              e._insertElement(t, vt.NS.HTML),
                (e.framesetOk = !1),
                (e.insertionMode = Bt.IN_BODY);
              break;
            case vt.TAG_ID.FRAMESET:
              e._insertElement(t, vt.NS.HTML),
                (e.insertionMode = Bt.IN_FRAMESET);
              break;
            case vt.TAG_ID.BASE:
            case vt.TAG_ID.BASEFONT:
            case vt.TAG_ID.BGSOUND:
            case vt.TAG_ID.LINK:
            case vt.TAG_ID.META:
            case vt.TAG_ID.NOFRAMES:
            case vt.TAG_ID.SCRIPT:
            case vt.TAG_ID.STYLE:
            case vt.TAG_ID.TEMPLATE:
            case vt.TAG_ID.TITLE:
              e._err(t, yt.ERR.abandonedHeadElementChild),
                e.openElements.push(e.headElement, vt.TAG_ID.HEAD),
                g(e, t),
                e.openElements.remove(e.headElement);
              break;
            case vt.TAG_ID.HEAD:
              e._err(t, yt.ERR.misplacedStartTagForHeadElement);
              break;
            default:
              v(e, t);
          }
        }
        function P(e, t) {
          switch (t.tagID) {
            case vt.TAG_ID.BODY:
            case vt.TAG_ID.HTML:
            case vt.TAG_ID.BR:
              v(e, t);
              break;
            case vt.TAG_ID.TEMPLATE:
              C(e, t);
              break;
            default:
              e._err(t, yt.ERR.endTagWithoutMatchingOpenElement);
          }
        }
        function v(e, t) {
          e._insertFakeElement(vt.TAG_NAMES.BODY, vt.TAG_ID.BODY),
            (e.insertionMode = Bt.IN_BODY),
            L(e, t);
        }
        function L(e, t) {
          switch (t.type) {
            case Lt.TokenType.CHARACTER:
              k(e, t);
              break;
            case Lt.TokenType.WHITESPACE_CHARACTER:
              M(e, t);
              break;
            case Lt.TokenType.COMMENT:
              l(e, t);
              break;
            case Lt.TokenType.START_TAG:
              de(e, t);
              break;
            case Lt.TokenType.END_TAG:
              Se(e, t);
              break;
            case Lt.TokenType.EOF:
              Oe(e, t);
          }
        }
        function M(e, t) {
          e._reconstructActiveFormattingElements(), e._insertCharacters(t);
        }
        function k(e, t) {
          e._reconstructActiveFormattingElements(),
            e._insertCharacters(t),
            (e.framesetOk = !1);
        }
        function G(e, t) {
          0 === e.openElements.tmplCount &&
            e.treeAdapter.adoptAttributes(e.openElements.items[0], t.attrs);
        }
        function B(e, t) {
          const r = e.openElements.tryPeekProperlyNestedBodyElement();
          r &&
            0 === e.openElements.tmplCount &&
            ((e.framesetOk = !1), e.treeAdapter.adoptAttributes(r, t.attrs));
        }
        function w(e, t) {
          const r = e.openElements.tryPeekProperlyNestedBodyElement();
          e.framesetOk &&
            r &&
            (e.treeAdapter.detachNode(r),
            e.openElements.popAllUpToHtmlElement(),
            e._insertElement(t, vt.NS.HTML),
            (e.insertionMode = Bt.IN_FRAMESET));
        }
        function x(e, t) {
          e.openElements.hasInButtonScope(vt.TAG_ID.P) && e._closePElement(),
            e._insertElement(t, vt.NS.HTML);
        }
        function U(e, t) {
          e.openElements.hasInButtonScope(vt.TAG_ID.P) && e._closePElement(),
            (0, vt.isNumberedHeader)(e.openElements.currentTagId) &&
              e.openElements.pop(),
            e._insertElement(t, vt.NS.HTML);
        }
        function H(e, t) {
          e.openElements.hasInButtonScope(vt.TAG_ID.P) && e._closePElement(),
            e._insertElement(t, vt.NS.HTML),
            (e.skipNextNewLine = !0),
            (e.framesetOk = !1);
        }
        function F(e, t) {
          const r = e.openElements.tmplCount > 0;
          (e.formElement && !r) ||
            (e.openElements.hasInButtonScope(vt.TAG_ID.P) && e._closePElement(),
            e._insertElement(t, vt.NS.HTML),
            r || (e.formElement = e.openElements.current));
        }
        function j(e, t) {
          e.framesetOk = !1;
          const r = t.tagID;
          for (let t = e.openElements.stackTop; t >= 0; t--) {
            const n = e.openElements.tagIDs[t];
            if (
              (r === vt.TAG_ID.LI && n === vt.TAG_ID.LI) ||
              ((r === vt.TAG_ID.DD || r === vt.TAG_ID.DT) &&
                (n === vt.TAG_ID.DD || n === vt.TAG_ID.DT))
            ) {
              e.openElements.generateImpliedEndTagsWithExclusion(n),
                e.openElements.popUntilTagNamePopped(n);
              break;
            }
            if (
              n !== vt.TAG_ID.ADDRESS &&
              n !== vt.TAG_ID.DIV &&
              n !== vt.TAG_ID.P &&
              e._isSpecialElement(e.openElements.items[t], n)
            )
              break;
          }
          e.openElements.hasInButtonScope(vt.TAG_ID.P) && e._closePElement(),
            e._insertElement(t, vt.NS.HTML);
        }
        function q(e, t) {
          e.openElements.hasInButtonScope(vt.TAG_ID.P) && e._closePElement(),
            e._insertElement(t, vt.NS.HTML),
            (e.tokenizer.state = Nt.TokenizerMode.PLAINTEXT);
        }
        function Y(e, t) {
          e.openElements.hasInScope(vt.TAG_ID.BUTTON) &&
            (e.openElements.generateImpliedEndTags(),
            e.openElements.popUntilTagNamePopped(vt.TAG_ID.BUTTON)),
            e._reconstructActiveFormattingElements(),
            e._insertElement(t, vt.NS.HTML),
            (e.framesetOk = !1);
        }
        function V(e, t) {
          const r =
            e.activeFormattingElements.getElementEntryInScopeWithTagName(
              vt.TAG_NAMES.A
            );
          r &&
            (u(e, t),
            e.openElements.remove(r.element),
            e.activeFormattingElements.removeEntry(r)),
            e._reconstructActiveFormattingElements(),
            e._insertElement(t, vt.NS.HTML),
            e.activeFormattingElements.pushElement(e.openElements.current, t);
        }
        function Q(e, t) {
          e._reconstructActiveFormattingElements(),
            e._insertElement(t, vt.NS.HTML),
            e.activeFormattingElements.pushElement(e.openElements.current, t);
        }
        function X(e, t) {
          e._reconstructActiveFormattingElements(),
            e.openElements.hasInScope(vt.TAG_ID.NOBR) &&
              (u(e, t), e._reconstructActiveFormattingElements()),
            e._insertElement(t, vt.NS.HTML),
            e.activeFormattingElements.pushElement(e.openElements.current, t);
        }
        function W(e, t) {
          e._reconstructActiveFormattingElements(),
            e._insertElement(t, vt.NS.HTML),
            e.activeFormattingElements.insertMarker(),
            (e.framesetOk = !1);
        }
        function K(e, t) {
          e.treeAdapter.getDocumentMode(e.document) !==
            vt.DOCUMENT_MODE.QUIRKS &&
            e.openElements.hasInButtonScope(vt.TAG_ID.P) &&
            e._closePElement(),
            e._insertElement(t, vt.NS.HTML),
            (e.framesetOk = !1),
            (e.insertionMode = Bt.IN_TABLE);
        }
        function z(e, t) {
          e._reconstructActiveFormattingElements(),
            e._appendElement(t, vt.NS.HTML),
            (e.framesetOk = !1),
            (t.ackSelfClosing = !0);
        }
        function Z(e) {
          const t = (0, Lt.getTokenAttr)(e, vt.ATTRS.TYPE);
          return null != t && t.toLowerCase() === Mt;
        }
        function J(e, t) {
          e._reconstructActiveFormattingElements(),
            e._appendElement(t, vt.NS.HTML),
            Z(t) || (e.framesetOk = !1),
            (t.ackSelfClosing = !0);
        }
        function $(e, t) {
          e._appendElement(t, vt.NS.HTML), (t.ackSelfClosing = !0);
        }
        function ee(e, t) {
          e.openElements.hasInButtonScope(vt.TAG_ID.P) && e._closePElement(),
            e._appendElement(t, vt.NS.HTML),
            (e.framesetOk = !1),
            (t.ackSelfClosing = !0);
        }
        function te(e, t) {
          (t.tagName = vt.TAG_NAMES.IMG), (t.tagID = vt.TAG_ID.IMG), z(e, t);
        }
        function re(e, t) {
          e._insertElement(t, vt.NS.HTML),
            (e.skipNextNewLine = !0),
            (e.tokenizer.state = Nt.TokenizerMode.RCDATA),
            (e.originalInsertionMode = e.insertionMode),
            (e.framesetOk = !1),
            (e.insertionMode = Bt.TEXT);
        }
        function ne(e, t) {
          e.openElements.hasInButtonScope(vt.TAG_ID.P) && e._closePElement(),
            e._reconstructActiveFormattingElements(),
            (e.framesetOk = !1),
            e._switchToTextParsing(t, Nt.TokenizerMode.RAWTEXT);
        }
        function ie(e, t) {
          (e.framesetOk = !1),
            e._switchToTextParsing(t, Nt.TokenizerMode.RAWTEXT);
        }
        function se(e, t) {
          e._switchToTextParsing(t, Nt.TokenizerMode.RAWTEXT);
        }
        function ae(e, t) {
          e._reconstructActiveFormattingElements(),
            e._insertElement(t, vt.NS.HTML),
            (e.framesetOk = !1),
            (e.insertionMode =
              e.insertionMode === Bt.IN_TABLE ||
              e.insertionMode === Bt.IN_CAPTION ||
              e.insertionMode === Bt.IN_TABLE_BODY ||
              e.insertionMode === Bt.IN_ROW ||
              e.insertionMode === Bt.IN_CELL
                ? Bt.IN_SELECT_IN_TABLE
                : Bt.IN_SELECT);
        }
        function oe(e, t) {
          e.openElements.currentTagId === vt.TAG_ID.OPTION &&
            e.openElements.pop(),
            e._reconstructActiveFormattingElements(),
            e._insertElement(t, vt.NS.HTML);
        }
        function ce(e, t) {
          e.openElements.hasInScope(vt.TAG_ID.RUBY) &&
            e.openElements.generateImpliedEndTags(),
            e._insertElement(t, vt.NS.HTML);
        }
        function ue(e, t) {
          e.openElements.hasInScope(vt.TAG_ID.RUBY) &&
            e.openElements.generateImpliedEndTagsWithExclusion(vt.TAG_ID.RTC),
            e._insertElement(t, vt.NS.HTML);
        }
        function le(e, t) {
          e._reconstructActiveFormattingElements(),
            Rt.adjustTokenMathMLAttrs(t),
            Rt.adjustTokenXMLAttrs(t),
            t.selfClosing
              ? e._appendElement(t, vt.NS.MATHML)
              : e._insertElement(t, vt.NS.MATHML),
            (t.ackSelfClosing = !0);
        }
        function he(e, t) {
          e._reconstructActiveFormattingElements(),
            Rt.adjustTokenSVGAttrs(t),
            Rt.adjustTokenXMLAttrs(t),
            t.selfClosing
              ? e._appendElement(t, vt.NS.SVG)
              : e._insertElement(t, vt.NS.SVG),
            (t.ackSelfClosing = !0);
        }
        function Te(e, t) {
          e._reconstructActiveFormattingElements(),
            e._insertElement(t, vt.NS.HTML);
        }
        function de(e, t) {
          switch (t.tagID) {
            case vt.TAG_ID.I:
            case vt.TAG_ID.S:
            case vt.TAG_ID.B:
            case vt.TAG_ID.U:
            case vt.TAG_ID.EM:
            case vt.TAG_ID.TT:
            case vt.TAG_ID.BIG:
            case vt.TAG_ID.CODE:
            case vt.TAG_ID.FONT:
            case vt.TAG_ID.SMALL:
            case vt.TAG_ID.STRIKE:
            case vt.TAG_ID.STRONG:
              Q(e, t);
              break;
            case vt.TAG_ID.A:
              V(e, t);
              break;
            case vt.TAG_ID.H1:
            case vt.TAG_ID.H2:
            case vt.TAG_ID.H3:
            case vt.TAG_ID.H4:
            case vt.TAG_ID.H5:
            case vt.TAG_ID.H6:
              U(e, t);
              break;
            case vt.TAG_ID.P:
            case vt.TAG_ID.DL:
            case vt.TAG_ID.OL:
            case vt.TAG_ID.UL:
            case vt.TAG_ID.DIV:
            case vt.TAG_ID.DIR:
            case vt.TAG_ID.NAV:
            case vt.TAG_ID.MAIN:
            case vt.TAG_ID.MENU:
            case vt.TAG_ID.ASIDE:
            case vt.TAG_ID.CENTER:
            case vt.TAG_ID.FIGURE:
            case vt.TAG_ID.FOOTER:
            case vt.TAG_ID.HEADER:
            case vt.TAG_ID.HGROUP:
            case vt.TAG_ID.DIALOG:
            case vt.TAG_ID.DETAILS:
            case vt.TAG_ID.ADDRESS:
            case vt.TAG_ID.ARTICLE:
            case vt.TAG_ID.SECTION:
            case vt.TAG_ID.SUMMARY:
            case vt.TAG_ID.FIELDSET:
            case vt.TAG_ID.BLOCKQUOTE:
            case vt.TAG_ID.FIGCAPTION:
              x(e, t);
              break;
            case vt.TAG_ID.LI:
            case vt.TAG_ID.DD:
            case vt.TAG_ID.DT:
              j(e, t);
              break;
            case vt.TAG_ID.BR:
            case vt.TAG_ID.IMG:
            case vt.TAG_ID.WBR:
            case vt.TAG_ID.AREA:
            case vt.TAG_ID.EMBED:
            case vt.TAG_ID.KEYGEN:
              z(e, t);
              break;
            case vt.TAG_ID.HR:
              ee(e, t);
              break;
            case vt.TAG_ID.RB:
            case vt.TAG_ID.RTC:
              ce(e, t);
              break;
            case vt.TAG_ID.RT:
            case vt.TAG_ID.RP:
              ue(e, t);
              break;
            case vt.TAG_ID.PRE:
            case vt.TAG_ID.LISTING:
              H(e, t);
              break;
            case vt.TAG_ID.XMP:
              ne(e, t);
              break;
            case vt.TAG_ID.SVG:
              he(e, t);
              break;
            case vt.TAG_ID.HTML:
              G(e, t);
              break;
            case vt.TAG_ID.BASE:
            case vt.TAG_ID.LINK:
            case vt.TAG_ID.META:
            case vt.TAG_ID.STYLE:
            case vt.TAG_ID.TITLE:
            case vt.TAG_ID.SCRIPT:
            case vt.TAG_ID.BGSOUND:
            case vt.TAG_ID.BASEFONT:
            case vt.TAG_ID.TEMPLATE:
              g(e, t);
              break;
            case vt.TAG_ID.BODY:
              B(e, t);
              break;
            case vt.TAG_ID.FORM:
              F(e, t);
              break;
            case vt.TAG_ID.NOBR:
              X(e, t);
              break;
            case vt.TAG_ID.MATH:
              le(e, t);
              break;
            case vt.TAG_ID.TABLE:
              K(e, t);
              break;
            case vt.TAG_ID.INPUT:
              J(e, t);
              break;
            case vt.TAG_ID.PARAM:
            case vt.TAG_ID.TRACK:
            case vt.TAG_ID.SOURCE:
              $(e, t);
              break;
            case vt.TAG_ID.IMAGE:
              te(e, t);
              break;
            case vt.TAG_ID.BUTTON:
              Y(e, t);
              break;
            case vt.TAG_ID.APPLET:
            case vt.TAG_ID.OBJECT:
            case vt.TAG_ID.MARQUEE:
              W(e, t);
              break;
            case vt.TAG_ID.IFRAME:
              ie(e, t);
              break;
            case vt.TAG_ID.SELECT:
              ae(e, t);
              break;
            case vt.TAG_ID.OPTION:
            case vt.TAG_ID.OPTGROUP:
              oe(e, t);
              break;
            case vt.TAG_ID.NOEMBED:
              se(e, t);
              break;
            case vt.TAG_ID.FRAMESET:
              w(e, t);
              break;
            case vt.TAG_ID.TEXTAREA:
              re(e, t);
              break;
            case vt.TAG_ID.NOSCRIPT:
              e.options.scriptingEnabled ? se(e, t) : Te(e, t);
              break;
            case vt.TAG_ID.PLAINTEXT:
              q(e, t);
              break;
            case vt.TAG_ID.COL:
            case vt.TAG_ID.TH:
            case vt.TAG_ID.TD:
            case vt.TAG_ID.TR:
            case vt.TAG_ID.HEAD:
            case vt.TAG_ID.FRAME:
            case vt.TAG_ID.TBODY:
            case vt.TAG_ID.TFOOT:
            case vt.TAG_ID.THEAD:
            case vt.TAG_ID.CAPTION:
            case vt.TAG_ID.COLGROUP:
              break;
            default:
              Te(e, t);
          }
        }
        function Ee(e, t) {
          if (
            e.openElements.hasInScope(vt.TAG_ID.BODY) &&
            ((e.insertionMode = Bt.AFTER_BODY),
            e.options.sourceCodeLocationInfo)
          ) {
            const r = e.openElements.tryPeekProperlyNestedBodyElement();
            r && e._setEndLocation(r, t);
          }
        }
        function pe(e, t) {
          e.openElements.hasInScope(vt.TAG_ID.BODY) &&
            ((e.insertionMode = Bt.AFTER_BODY), ut(e, t));
        }
        function fe(e, t) {
          const r = t.tagID;
          e.openElements.hasInScope(r) &&
            (e.openElements.generateImpliedEndTags(),
            e.openElements.popUntilTagNamePopped(r));
        }
        function _e(e) {
          const t = e.openElements.tmplCount > 0,
            { formElement: r } = e;
          t || (e.formElement = null),
            (r || t) &&
              e.openElements.hasInScope(vt.TAG_ID.FORM) &&
              (e.openElements.generateImpliedEndTags(),
              t
                ? e.openElements.popUntilTagNamePopped(vt.TAG_ID.FORM)
                : r && e.openElements.remove(r));
        }
        function Ae(e) {
          e.openElements.hasInButtonScope(vt.TAG_ID.P) ||
            e._insertFakeElement(vt.TAG_NAMES.P, vt.TAG_ID.P),
            e._closePElement();
        }
        function me(e) {
          e.openElements.hasInListItemScope(vt.TAG_ID.LI) &&
            (e.openElements.generateImpliedEndTagsWithExclusion(vt.TAG_ID.LI),
            e.openElements.popUntilTagNamePopped(vt.TAG_ID.LI));
        }
        function Ie(e, t) {
          const r = t.tagID;
          e.openElements.hasInScope(r) &&
            (e.openElements.generateImpliedEndTagsWithExclusion(r),
            e.openElements.popUntilTagNamePopped(r));
        }
        function De(e) {
          e.openElements.hasNumberedHeaderInScope() &&
            (e.openElements.generateImpliedEndTags(),
            e.openElements.popUntilNumberedHeaderPopped());
        }
        function ge(e, t) {
          const r = t.tagID;
          e.openElements.hasInScope(r) &&
            (e.openElements.generateImpliedEndTags(),
            e.openElements.popUntilTagNamePopped(r),
            e.activeFormattingElements.clearToLastMarker());
        }
        function Ne(e) {
          e._reconstructActiveFormattingElements(),
            e._insertFakeElement(vt.TAG_NAMES.BR, vt.TAG_ID.BR),
            e.openElements.pop(),
            (e.framesetOk = !1);
        }
        function Ce(e, t) {
          const r = t.tagName,
            n = t.tagID;
          for (let t = e.openElements.stackTop; t > 0; t--) {
            const i = e.openElements.items[t],
              s = e.openElements.tagIDs[t];
            if (
              n === s &&
              (n !== vt.TAG_ID.UNKNOWN || e.treeAdapter.getTagName(i) === r)
            ) {
              e.openElements.generateImpliedEndTagsWithExclusion(n),
                e.openElements.stackTop >= t &&
                  e.openElements.shortenToLength(t);
              break;
            }
            if (e._isSpecialElement(i, s)) break;
          }
        }
        function Se(e, t) {
          switch (t.tagID) {
            case vt.TAG_ID.A:
            case vt.TAG_ID.B:
            case vt.TAG_ID.I:
            case vt.TAG_ID.S:
            case vt.TAG_ID.U:
            case vt.TAG_ID.EM:
            case vt.TAG_ID.TT:
            case vt.TAG_ID.BIG:
            case vt.TAG_ID.CODE:
            case vt.TAG_ID.FONT:
            case vt.TAG_ID.NOBR:
            case vt.TAG_ID.SMALL:
            case vt.TAG_ID.STRIKE:
            case vt.TAG_ID.STRONG:
              u(e, t);
              break;
            case vt.TAG_ID.P:
              Ae(e);
              break;
            case vt.TAG_ID.DL:
            case vt.TAG_ID.UL:
            case vt.TAG_ID.OL:
            case vt.TAG_ID.DIR:
            case vt.TAG_ID.DIV:
            case vt.TAG_ID.NAV:
            case vt.TAG_ID.PRE:
            case vt.TAG_ID.MAIN:
            case vt.TAG_ID.MENU:
            case vt.TAG_ID.ASIDE:
            case vt.TAG_ID.BUTTON:
            case vt.TAG_ID.CENTER:
            case vt.TAG_ID.FIGURE:
            case vt.TAG_ID.FOOTER:
            case vt.TAG_ID.HEADER:
            case vt.TAG_ID.HGROUP:
            case vt.TAG_ID.DIALOG:
            case vt.TAG_ID.ADDRESS:
            case vt.TAG_ID.ARTICLE:
            case vt.TAG_ID.DETAILS:
            case vt.TAG_ID.SECTION:
            case vt.TAG_ID.SUMMARY:
            case vt.TAG_ID.LISTING:
            case vt.TAG_ID.FIELDSET:
            case vt.TAG_ID.BLOCKQUOTE:
            case vt.TAG_ID.FIGCAPTION:
              fe(e, t);
              break;
            case vt.TAG_ID.LI:
              me(e);
              break;
            case vt.TAG_ID.DD:
            case vt.TAG_ID.DT:
              Ie(e, t);
              break;
            case vt.TAG_ID.H1:
            case vt.TAG_ID.H2:
            case vt.TAG_ID.H3:
            case vt.TAG_ID.H4:
            case vt.TAG_ID.H5:
            case vt.TAG_ID.H6:
              De(e);
              break;
            case vt.TAG_ID.BR:
              Ne(e);
              break;
            case vt.TAG_ID.BODY:
              Ee(e, t);
              break;
            case vt.TAG_ID.HTML:
              pe(e, t);
              break;
            case vt.TAG_ID.FORM:
              _e(e);
              break;
            case vt.TAG_ID.APPLET:
            case vt.TAG_ID.OBJECT:
            case vt.TAG_ID.MARQUEE:
              ge(e, t);
              break;
            case vt.TAG_ID.TEMPLATE:
              C(e, t);
              break;
            default:
              Ce(e, t);
          }
        }
        function Oe(e, t) {
          e.tmplInsertionModeStack.length > 0 ? ot(e, t) : d(e, t);
        }
        function be(e, t) {
          var r;
          t.tagID === vt.TAG_ID.SCRIPT &&
            (null === (r = e.scriptHandler) ||
              void 0 === r ||
              r.call(e, e.openElements.current)),
            e.openElements.pop(),
            (e.insertionMode = e.originalInsertionMode);
        }
        function Re(e, t) {
          e._err(t, yt.ERR.eofInElementThatCanContainOnlyText),
            e.openElements.pop(),
            (e.insertionMode = e.originalInsertionMode),
            e.onEof(t);
        }
        function ye(e, t) {
          if (xt.has(e.openElements.currentTagId))
            switch (
              ((e.pendingCharacterTokens.length = 0),
              (e.hasNonWhitespacePendingCharacterToken = !1),
              (e.originalInsertionMode = e.insertionMode),
              (e.insertionMode = Bt.IN_TABLE_TEXT),
              t.type)
            ) {
              case Lt.TokenType.CHARACTER:
                je(e, t);
                break;
              case Lt.TokenType.WHITESPACE_CHARACTER:
                Fe(e, t);
            }
          else He(e, t);
        }
        function Pe(e, t) {
          e.openElements.clearBackToTableContext(),
            e.activeFormattingElements.insertMarker(),
            e._insertElement(t, vt.NS.HTML),
            (e.insertionMode = Bt.IN_CAPTION);
        }
        function ve(e, t) {
          e.openElements.clearBackToTableContext(),
            e._insertElement(t, vt.NS.HTML),
            (e.insertionMode = Bt.IN_COLUMN_GROUP);
        }
        function Le(e, t) {
          e.openElements.clearBackToTableContext(),
            e._insertFakeElement(vt.TAG_NAMES.COLGROUP, vt.TAG_ID.COLGROUP),
            (e.insertionMode = Bt.IN_COLUMN_GROUP),
            Qe(e, t);
        }
        function Me(e, t) {
          e.openElements.clearBackToTableContext(),
            e._insertElement(t, vt.NS.HTML),
            (e.insertionMode = Bt.IN_TABLE_BODY);
        }
        function ke(e, t) {
          e.openElements.clearBackToTableContext(),
            e._insertFakeElement(vt.TAG_NAMES.TBODY, vt.TAG_ID.TBODY),
            (e.insertionMode = Bt.IN_TABLE_BODY),
            Ke(e, t);
        }
        function Ge(e, t) {
          e.openElements.hasInTableScope(vt.TAG_ID.TABLE) &&
            (e.openElements.popUntilTagNamePopped(vt.TAG_ID.TABLE),
            e._resetInsertionMode(),
            e._processStartTag(t));
        }
        function Be(e, t) {
          Z(t) ? e._appendElement(t, vt.NS.HTML) : He(e, t),
            (t.ackSelfClosing = !0);
        }
        function we(e, t) {
          e.formElement ||
            0 !== e.openElements.tmplCount ||
            (e._insertElement(t, vt.NS.HTML),
            (e.formElement = e.openElements.current),
            e.openElements.pop());
        }
        function xe(e, t) {
          switch (t.tagID) {
            case vt.TAG_ID.TD:
            case vt.TAG_ID.TH:
            case vt.TAG_ID.TR:
              ke(e, t);
              break;
            case vt.TAG_ID.STYLE:
            case vt.TAG_ID.SCRIPT:
            case vt.TAG_ID.TEMPLATE:
              g(e, t);
              break;
            case vt.TAG_ID.COL:
              Le(e, t);
              break;
            case vt.TAG_ID.FORM:
              we(e, t);
              break;
            case vt.TAG_ID.TABLE:
              Ge(e, t);
              break;
            case vt.TAG_ID.TBODY:
            case vt.TAG_ID.TFOOT:
            case vt.TAG_ID.THEAD:
              Me(e, t);
              break;
            case vt.TAG_ID.INPUT:
              Be(e, t);
              break;
            case vt.TAG_ID.CAPTION:
              Pe(e, t);
              break;
            case vt.TAG_ID.COLGROUP:
              ve(e, t);
              break;
            default:
              He(e, t);
          }
        }
        function Ue(e, t) {
          switch (t.tagID) {
            case vt.TAG_ID.TABLE:
              e.openElements.hasInTableScope(vt.TAG_ID.TABLE) &&
                (e.openElements.popUntilTagNamePopped(vt.TAG_ID.TABLE),
                e._resetInsertionMode());
              break;
            case vt.TAG_ID.TEMPLATE:
              C(e, t);
              break;
            case vt.TAG_ID.BODY:
            case vt.TAG_ID.CAPTION:
            case vt.TAG_ID.COL:
            case vt.TAG_ID.COLGROUP:
            case vt.TAG_ID.HTML:
            case vt.TAG_ID.TBODY:
            case vt.TAG_ID.TD:
            case vt.TAG_ID.TFOOT:
            case vt.TAG_ID.TH:
            case vt.TAG_ID.THEAD:
            case vt.TAG_ID.TR:
              break;
            default:
              He(e, t);
          }
        }
        function He(e, t) {
          const r = e.fosterParentingEnabled;
          (e.fosterParentingEnabled = !0),
            L(e, t),
            (e.fosterParentingEnabled = r);
        }
        function Fe(e, t) {
          e.pendingCharacterTokens.push(t);
        }
        function je(e, t) {
          e.pendingCharacterTokens.push(t),
            (e.hasNonWhitespacePendingCharacterToken = !0);
        }
        function qe(e, t) {
          let r = 0;
          if (e.hasNonWhitespacePendingCharacterToken)
            for (; r < e.pendingCharacterTokens.length; r++)
              He(e, e.pendingCharacterTokens[r]);
          else
            for (; r < e.pendingCharacterTokens.length; r++)
              e._insertCharacters(e.pendingCharacterTokens[r]);
          (e.insertionMode = e.originalInsertionMode), e._processToken(t);
        }
        function Ye(e, t) {
          const r = t.tagID;
          Ft.has(r)
            ? e.openElements.hasInTableScope(vt.TAG_ID.CAPTION) &&
              (e.openElements.generateImpliedEndTags(),
              e.openElements.popUntilTagNamePopped(vt.TAG_ID.CAPTION),
              e.activeFormattingElements.clearToLastMarker(),
              (e.insertionMode = Bt.IN_TABLE),
              xe(e, t))
            : de(e, t);
        }
        function Ve(e, t) {
          const r = t.tagID;
          switch (r) {
            case vt.TAG_ID.CAPTION:
            case vt.TAG_ID.TABLE:
              e.openElements.hasInTableScope(vt.TAG_ID.CAPTION) &&
                (e.openElements.generateImpliedEndTags(),
                e.openElements.popUntilTagNamePopped(vt.TAG_ID.CAPTION),
                e.activeFormattingElements.clearToLastMarker(),
                (e.insertionMode = Bt.IN_TABLE),
                r === vt.TAG_ID.TABLE && Ue(e, t));
              break;
            case vt.TAG_ID.BODY:
            case vt.TAG_ID.COL:
            case vt.TAG_ID.COLGROUP:
            case vt.TAG_ID.HTML:
            case vt.TAG_ID.TBODY:
            case vt.TAG_ID.TD:
            case vt.TAG_ID.TFOOT:
            case vt.TAG_ID.TH:
            case vt.TAG_ID.THEAD:
            case vt.TAG_ID.TR:
              break;
            default:
              Se(e, t);
          }
        }
        function Qe(e, t) {
          switch (t.tagID) {
            case vt.TAG_ID.HTML:
              de(e, t);
              break;
            case vt.TAG_ID.COL:
              e._appendElement(t, vt.NS.HTML), (t.ackSelfClosing = !0);
              break;
            case vt.TAG_ID.TEMPLATE:
              g(e, t);
              break;
            default:
              We(e, t);
          }
        }
        function Xe(e, t) {
          switch (t.tagID) {
            case vt.TAG_ID.COLGROUP:
              e.openElements.currentTagId === vt.TAG_ID.COLGROUP &&
                (e.openElements.pop(), (e.insertionMode = Bt.IN_TABLE));
              break;
            case vt.TAG_ID.TEMPLATE:
              C(e, t);
              break;
            case vt.TAG_ID.COL:
              break;
            default:
              We(e, t);
          }
        }
        function We(e, t) {
          e.openElements.currentTagId === vt.TAG_ID.COLGROUP &&
            (e.openElements.pop(),
            (e.insertionMode = Bt.IN_TABLE),
            e._processToken(t));
        }
        function Ke(e, t) {
          switch (t.tagID) {
            case vt.TAG_ID.TR:
              e.openElements.clearBackToTableBodyContext(),
                e._insertElement(t, vt.NS.HTML),
                (e.insertionMode = Bt.IN_ROW);
              break;
            case vt.TAG_ID.TH:
            case vt.TAG_ID.TD:
              e.openElements.clearBackToTableBodyContext(),
                e._insertFakeElement(vt.TAG_NAMES.TR, vt.TAG_ID.TR),
                (e.insertionMode = Bt.IN_ROW),
                Ze(e, t);
              break;
            case vt.TAG_ID.CAPTION:
            case vt.TAG_ID.COL:
            case vt.TAG_ID.COLGROUP:
            case vt.TAG_ID.TBODY:
            case vt.TAG_ID.TFOOT:
            case vt.TAG_ID.THEAD:
              e.openElements.hasTableBodyContextInTableScope() &&
                (e.openElements.clearBackToTableBodyContext(),
                e.openElements.pop(),
                (e.insertionMode = Bt.IN_TABLE),
                xe(e, t));
              break;
            default:
              xe(e, t);
          }
        }
        function ze(e, t) {
          const r = t.tagID;
          switch (t.tagID) {
            case vt.TAG_ID.TBODY:
            case vt.TAG_ID.TFOOT:
            case vt.TAG_ID.THEAD:
              e.openElements.hasInTableScope(r) &&
                (e.openElements.clearBackToTableBodyContext(),
                e.openElements.pop(),
                (e.insertionMode = Bt.IN_TABLE));
              break;
            case vt.TAG_ID.TABLE:
              e.openElements.hasTableBodyContextInTableScope() &&
                (e.openElements.clearBackToTableBodyContext(),
                e.openElements.pop(),
                (e.insertionMode = Bt.IN_TABLE),
                Ue(e, t));
              break;
            case vt.TAG_ID.BODY:
            case vt.TAG_ID.CAPTION:
            case vt.TAG_ID.COL:
            case vt.TAG_ID.COLGROUP:
            case vt.TAG_ID.HTML:
            case vt.TAG_ID.TD:
            case vt.TAG_ID.TH:
            case vt.TAG_ID.TR:
              break;
            default:
              Ue(e, t);
          }
        }
        function Ze(e, t) {
          switch (t.tagID) {
            case vt.TAG_ID.TH:
            case vt.TAG_ID.TD:
              e.openElements.clearBackToTableRowContext(),
                e._insertElement(t, vt.NS.HTML),
                (e.insertionMode = Bt.IN_CELL),
                e.activeFormattingElements.insertMarker();
              break;
            case vt.TAG_ID.CAPTION:
            case vt.TAG_ID.COL:
            case vt.TAG_ID.COLGROUP:
            case vt.TAG_ID.TBODY:
            case vt.TAG_ID.TFOOT:
            case vt.TAG_ID.THEAD:
            case vt.TAG_ID.TR:
              e.openElements.hasInTableScope(vt.TAG_ID.TR) &&
                (e.openElements.clearBackToTableRowContext(),
                e.openElements.pop(),
                (e.insertionMode = Bt.IN_TABLE_BODY),
                Ke(e, t));
              break;
            default:
              xe(e, t);
          }
        }
        function Je(e, t) {
          switch (t.tagID) {
            case vt.TAG_ID.TR:
              e.openElements.hasInTableScope(vt.TAG_ID.TR) &&
                (e.openElements.clearBackToTableRowContext(),
                e.openElements.pop(),
                (e.insertionMode = Bt.IN_TABLE_BODY));
              break;
            case vt.TAG_ID.TABLE:
              e.openElements.hasInTableScope(vt.TAG_ID.TR) &&
                (e.openElements.clearBackToTableRowContext(),
                e.openElements.pop(),
                (e.insertionMode = Bt.IN_TABLE_BODY),
                ze(e, t));
              break;
            case vt.TAG_ID.TBODY:
            case vt.TAG_ID.TFOOT:
            case vt.TAG_ID.THEAD:
              (e.openElements.hasInTableScope(t.tagID) ||
                e.openElements.hasInTableScope(vt.TAG_ID.TR)) &&
                (e.openElements.clearBackToTableRowContext(),
                e.openElements.pop(),
                (e.insertionMode = Bt.IN_TABLE_BODY),
                ze(e, t));
              break;
            case vt.TAG_ID.BODY:
            case vt.TAG_ID.CAPTION:
            case vt.TAG_ID.COL:
            case vt.TAG_ID.COLGROUP:
            case vt.TAG_ID.HTML:
            case vt.TAG_ID.TD:
            case vt.TAG_ID.TH:
              break;
            default:
              Ue(e, t);
          }
        }
        function $e(e, t) {
          const r = t.tagID;
          Ft.has(r)
            ? (e.openElements.hasInTableScope(vt.TAG_ID.TD) ||
                e.openElements.hasInTableScope(vt.TAG_ID.TH)) &&
              (e._closeTableCell(), Ze(e, t))
            : de(e, t);
        }
        function et(e, t) {
          const r = t.tagID;
          switch (r) {
            case vt.TAG_ID.TD:
            case vt.TAG_ID.TH:
              e.openElements.hasInTableScope(r) &&
                (e.openElements.generateImpliedEndTags(),
                e.openElements.popUntilTagNamePopped(r),
                e.activeFormattingElements.clearToLastMarker(),
                (e.insertionMode = Bt.IN_ROW));
              break;
            case vt.TAG_ID.TABLE:
            case vt.TAG_ID.TBODY:
            case vt.TAG_ID.TFOOT:
            case vt.TAG_ID.THEAD:
            case vt.TAG_ID.TR:
              e.openElements.hasInTableScope(r) &&
                (e._closeTableCell(), Je(e, t));
              break;
            case vt.TAG_ID.BODY:
            case vt.TAG_ID.CAPTION:
            case vt.TAG_ID.COL:
            case vt.TAG_ID.COLGROUP:
            case vt.TAG_ID.HTML:
              break;
            default:
              Se(e, t);
          }
        }
        function tt(e, t) {
          switch (t.tagID) {
            case vt.TAG_ID.HTML:
              de(e, t);
              break;
            case vt.TAG_ID.OPTION:
              e.openElements.currentTagId === vt.TAG_ID.OPTION &&
                e.openElements.pop(),
                e._insertElement(t, vt.NS.HTML);
              break;
            case vt.TAG_ID.OPTGROUP:
              e.openElements.currentTagId === vt.TAG_ID.OPTION &&
                e.openElements.pop(),
                e.openElements.currentTagId === vt.TAG_ID.OPTGROUP &&
                  e.openElements.pop(),
                e._insertElement(t, vt.NS.HTML);
              break;
            case vt.TAG_ID.INPUT:
            case vt.TAG_ID.KEYGEN:
            case vt.TAG_ID.TEXTAREA:
            case vt.TAG_ID.SELECT:
              e.openElements.hasInSelectScope(vt.TAG_ID.SELECT) &&
                (e.openElements.popUntilTagNamePopped(vt.TAG_ID.SELECT),
                e._resetInsertionMode(),
                t.tagID !== vt.TAG_ID.SELECT && e._processStartTag(t));
              break;
            case vt.TAG_ID.SCRIPT:
            case vt.TAG_ID.TEMPLATE:
              g(e, t);
          }
        }
        function rt(e, t) {
          switch (t.tagID) {
            case vt.TAG_ID.OPTGROUP:
              e.openElements.stackTop > 0 &&
                e.openElements.currentTagId === vt.TAG_ID.OPTION &&
                e.openElements.tagIDs[e.openElements.stackTop - 1] ===
                  vt.TAG_ID.OPTGROUP &&
                e.openElements.pop(),
                e.openElements.currentTagId === vt.TAG_ID.OPTGROUP &&
                  e.openElements.pop();
              break;
            case vt.TAG_ID.OPTION:
              e.openElements.currentTagId === vt.TAG_ID.OPTION &&
                e.openElements.pop();
              break;
            case vt.TAG_ID.SELECT:
              e.openElements.hasInSelectScope(vt.TAG_ID.SELECT) &&
                (e.openElements.popUntilTagNamePopped(vt.TAG_ID.SELECT),
                e._resetInsertionMode());
              break;
            case vt.TAG_ID.TEMPLATE:
              C(e, t);
          }
        }
        function nt(e, t) {
          const r = t.tagID;
          r === vt.TAG_ID.CAPTION ||
          r === vt.TAG_ID.TABLE ||
          r === vt.TAG_ID.TBODY ||
          r === vt.TAG_ID.TFOOT ||
          r === vt.TAG_ID.THEAD ||
          r === vt.TAG_ID.TR ||
          r === vt.TAG_ID.TD ||
          r === vt.TAG_ID.TH
            ? (e.openElements.popUntilTagNamePopped(vt.TAG_ID.SELECT),
              e._resetInsertionMode(),
              e._processStartTag(t))
            : tt(e, t);
        }
        function it(e, t) {
          const r = t.tagID;
          r === vt.TAG_ID.CAPTION ||
          r === vt.TAG_ID.TABLE ||
          r === vt.TAG_ID.TBODY ||
          r === vt.TAG_ID.TFOOT ||
          r === vt.TAG_ID.THEAD ||
          r === vt.TAG_ID.TR ||
          r === vt.TAG_ID.TD ||
          r === vt.TAG_ID.TH
            ? e.openElements.hasInTableScope(r) &&
              (e.openElements.popUntilTagNamePopped(vt.TAG_ID.SELECT),
              e._resetInsertionMode(),
              e.onEndTag(t))
            : rt(e, t);
        }
        function st(e, t) {
          switch (t.tagID) {
            case vt.TAG_ID.BASE:
            case vt.TAG_ID.BASEFONT:
            case vt.TAG_ID.BGSOUND:
            case vt.TAG_ID.LINK:
            case vt.TAG_ID.META:
            case vt.TAG_ID.NOFRAMES:
            case vt.TAG_ID.SCRIPT:
            case vt.TAG_ID.STYLE:
            case vt.TAG_ID.TEMPLATE:
            case vt.TAG_ID.TITLE:
              g(e, t);
              break;
            case vt.TAG_ID.CAPTION:
            case vt.TAG_ID.COLGROUP:
            case vt.TAG_ID.TBODY:
            case vt.TAG_ID.TFOOT:
            case vt.TAG_ID.THEAD:
              (e.tmplInsertionModeStack[0] = Bt.IN_TABLE),
                (e.insertionMode = Bt.IN_TABLE),
                xe(e, t);
              break;
            case vt.TAG_ID.COL:
              (e.tmplInsertionModeStack[0] = Bt.IN_COLUMN_GROUP),
                (e.insertionMode = Bt.IN_COLUMN_GROUP),
                Qe(e, t);
              break;
            case vt.TAG_ID.TR:
              (e.tmplInsertionModeStack[0] = Bt.IN_TABLE_BODY),
                (e.insertionMode = Bt.IN_TABLE_BODY),
                Ke(e, t);
              break;
            case vt.TAG_ID.TD:
            case vt.TAG_ID.TH:
              (e.tmplInsertionModeStack[0] = Bt.IN_ROW),
                (e.insertionMode = Bt.IN_ROW),
                Ze(e, t);
              break;
            default:
              (e.tmplInsertionModeStack[0] = Bt.IN_BODY),
                (e.insertionMode = Bt.IN_BODY),
                de(e, t);
          }
        }
        function at(e, t) {
          t.tagID === vt.TAG_ID.TEMPLATE && C(e, t);
        }
        function ot(e, t) {
          e.openElements.tmplCount > 0
            ? (e.openElements.popUntilTagNamePopped(vt.TAG_ID.TEMPLATE),
              e.activeFormattingElements.clearToLastMarker(),
              e.tmplInsertionModeStack.shift(),
              e._resetInsertionMode(),
              e.onEof(t))
            : d(e, t);
        }
        function ct(e, t) {
          t.tagID === vt.TAG_ID.HTML ? de(e, t) : lt(e, t);
        }
        function ut(e, t) {
          var r;
          if (t.tagID === vt.TAG_ID.HTML) {
            if (
              (e.fragmentContext || (e.insertionMode = Bt.AFTER_AFTER_BODY),
              e.options.sourceCodeLocationInfo &&
                e.openElements.tagIDs[0] === vt.TAG_ID.HTML)
            ) {
              e._setEndLocation(e.openElements.items[0], t);
              const n = e.openElements.items[1];
              n &&
                !(null === (r = e.treeAdapter.getNodeSourceCodeLocation(n)) ||
                void 0 === r
                  ? void 0
                  : r.endTag) &&
                e._setEndLocation(n, t);
            }
          } else lt(e, t);
        }
        function lt(e, t) {
          (e.insertionMode = Bt.IN_BODY), L(e, t);
        }
        function ht(e, t) {
          switch (t.tagID) {
            case vt.TAG_ID.HTML:
              de(e, t);
              break;
            case vt.TAG_ID.FRAMESET:
              e._insertElement(t, vt.NS.HTML);
              break;
            case vt.TAG_ID.FRAME:
              e._appendElement(t, vt.NS.HTML), (t.ackSelfClosing = !0);
              break;
            case vt.TAG_ID.NOFRAMES:
              g(e, t);
          }
        }
        function Tt(e, t) {
          t.tagID !== vt.TAG_ID.FRAMESET ||
            e.openElements.isRootHtmlElementCurrent() ||
            (e.openElements.pop(),
            e.fragmentContext ||
              e.openElements.currentTagId === vt.TAG_ID.FRAMESET ||
              (e.insertionMode = Bt.AFTER_FRAMESET));
        }
        function dt(e, t) {
          switch (t.tagID) {
            case vt.TAG_ID.HTML:
              de(e, t);
              break;
            case vt.TAG_ID.NOFRAMES:
              g(e, t);
          }
        }
        function Et(e, t) {
          t.tagID === vt.TAG_ID.HTML &&
            (e.insertionMode = Bt.AFTER_AFTER_FRAMESET);
        }
        function pt(e, t) {
          t.tagID === vt.TAG_ID.HTML ? de(e, t) : ft(e, t);
        }
        function ft(e, t) {
          (e.insertionMode = Bt.IN_BODY), L(e, t);
        }
        function _t(e, t) {
          switch (t.tagID) {
            case vt.TAG_ID.HTML:
              de(e, t);
              break;
            case vt.TAG_ID.NOFRAMES:
              g(e, t);
          }
        }
        function At(e, t) {
          (t.chars = Pt.REPLACEMENT_CHARACTER), e._insertCharacters(t);
        }
        function mt(e, t) {
          e._insertCharacters(t), (e.framesetOk = !1);
        }
        function It(e) {
          for (
            ;
            e.treeAdapter.getNamespaceURI(e.openElements.current) !==
              vt.NS.HTML &&
            !e._isIntegrationPoint(
              e.openElements.currentTagId,
              e.openElements.current
            );

          )
            e.openElements.pop();
        }
        function Dt(e, t) {
          if (Rt.causesExit(t)) It(e), e._startTagOutsideForeignContent(t);
          else {
            const r = e._getAdjustedCurrentElement(),
              n = e.treeAdapter.getNamespaceURI(r);
            n === vt.NS.MATHML
              ? Rt.adjustTokenMathMLAttrs(t)
              : n === vt.NS.SVG &&
                (Rt.adjustTokenSVGTagName(t), Rt.adjustTokenSVGAttrs(t)),
              Rt.adjustTokenXMLAttrs(t),
              t.selfClosing ? e._appendElement(t, n) : e._insertElement(t, n),
              (t.ackSelfClosing = !0);
          }
        }
        function gt(e, t) {
          if (t.tagID === vt.TAG_ID.P || t.tagID === vt.TAG_ID.BR)
            return It(e), void e._endTagOutsideForeignContent(t);
          for (let r = e.openElements.stackTop; r > 0; r--) {
            const n = e.openElements.items[r];
            if (e.treeAdapter.getNamespaceURI(n) === vt.NS.HTML) {
              e._endTagOutsideForeignContent(t);
              break;
            }
            const i = e.treeAdapter.getTagName(n);
            if (i.toLowerCase() === t.tagName) {
              (t.tagName = i), e.openElements.shortenToLength(r);
              break;
            }
          }
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.Parser = void 0);
        const Nt = e("../tokenizer/index.js"),
          Ct = e("./open-element-stack.js"),
          St = e("./formatting-element-list.js"),
          Ot = e("../tree-adapters/default.js"),
          bt = e("../common/doctype.js"),
          Rt = e("../common/foreign-content.js"),
          yt = e("../common/error-codes.js"),
          Pt = e("../common/unicode.js"),
          vt = e("../common/html.js"),
          Lt = e("../common/token.js"),
          Mt = "hidden",
          kt = 8,
          Gt = 3;
        var Bt;
        (function (e) {
          (e[(e.INITIAL = 0)] = "INITIAL"),
            (e[(e.BEFORE_HTML = 1)] = "BEFORE_HTML"),
            (e[(e.BEFORE_HEAD = 2)] = "BEFORE_HEAD"),
            (e[(e.IN_HEAD = 3)] = "IN_HEAD"),
            (e[(e.IN_HEAD_NO_SCRIPT = 4)] = "IN_HEAD_NO_SCRIPT"),
            (e[(e.AFTER_HEAD = 5)] = "AFTER_HEAD"),
            (e[(e.IN_BODY = 6)] = "IN_BODY"),
            (e[(e.TEXT = 7)] = "TEXT"),
            (e[(e.IN_TABLE = 8)] = "IN_TABLE"),
            (e[(e.IN_TABLE_TEXT = 9)] = "IN_TABLE_TEXT"),
            (e[(e.IN_CAPTION = 10)] = "IN_CAPTION"),
            (e[(e.IN_COLUMN_GROUP = 11)] = "IN_COLUMN_GROUP"),
            (e[(e.IN_TABLE_BODY = 12)] = "IN_TABLE_BODY"),
            (e[(e.IN_ROW = 13)] = "IN_ROW"),
            (e[(e.IN_CELL = 14)] = "IN_CELL"),
            (e[(e.IN_SELECT = 15)] = "IN_SELECT"),
            (e[(e.IN_SELECT_IN_TABLE = 16)] = "IN_SELECT_IN_TABLE"),
            (e[(e.IN_TEMPLATE = 17)] = "IN_TEMPLATE"),
            (e[(e.AFTER_BODY = 18)] = "AFTER_BODY"),
            (e[(e.IN_FRAMESET = 19)] = "IN_FRAMESET"),
            (e[(e.AFTER_FRAMESET = 20)] = "AFTER_FRAMESET"),
            (e[(e.AFTER_AFTER_BODY = 21)] = "AFTER_AFTER_BODY"),
            (e[(e.AFTER_AFTER_FRAMESET = 22)] = "AFTER_AFTER_FRAMESET");
        })(Bt || (Bt = {}));
        const wt = {
            startLine: -1,
            startCol: -1,
            startOffset: -1,
            endLine: -1,
            endCol: -1,
            endOffset: -1,
          },
          xt = new Set([
            vt.TAG_ID.TABLE,
            vt.TAG_ID.TBODY,
            vt.TAG_ID.TFOOT,
            vt.TAG_ID.THEAD,
            vt.TAG_ID.TR,
          ]),
          Ut = {
            scriptingEnabled: !0,
            sourceCodeLocationInfo: !1,
            treeAdapter: Ot.defaultTreeAdapter,
            onParseError: null,
          };
        class Ht {
          constructor(e, t, r = null, n = null) {
            (this.fragmentContext = r),
              (this.scriptHandler = n),
              (this.currentToken = null),
              (this.stopped = !1),
              (this.insertionMode = Bt.INITIAL),
              (this.originalInsertionMode = Bt.INITIAL),
              (this.headElement = null),
              (this.formElement = null),
              (this.currentNotInHTML = !1),
              (this.tmplInsertionModeStack = []),
              (this.pendingCharacterTokens = []),
              (this.hasNonWhitespacePendingCharacterToken = !1),
              (this.framesetOk = !0),
              (this.skipNextNewLine = !1),
              (this.fosterParentingEnabled = !1),
              (this.options = Object.assign(Object.assign({}, Ut), e)),
              (this.treeAdapter = this.options.treeAdapter),
              (this.onParseError = this.options.onParseError),
              this.onParseError && (this.options.sourceCodeLocationInfo = !0),
              (this.document =
                null != t ? t : this.treeAdapter.createDocument()),
              (this.tokenizer = new Nt.Tokenizer(this.options, this)),
              (this.activeFormattingElements = new St.FormattingElementList(
                this.treeAdapter
              )),
              (this.fragmentContextID = r
                ? (0, vt.getTagID)(this.treeAdapter.getTagName(r))
                : vt.TAG_ID.UNKNOWN),
              this._setContextModes(
                null != r ? r : this.document,
                this.fragmentContextID
              ),
              (this.openElements = new Ct.OpenElementStack(
                this.document,
                this.treeAdapter,
                this
              ));
          }
          static parse(e, t) {
            const r = new this(t);
            return r.tokenizer.write(e, !0), r.document;
          }
          static getFragmentParser(e, t) {
            const r = Object.assign(Object.assign({}, Ut), t);
            null != e ||
              (e = r.treeAdapter.createElement(
                vt.TAG_NAMES.TEMPLATE,
                vt.NS.HTML,
                []
              ));
            const n = r.treeAdapter.createElement(
                "documentmock",
                vt.NS.HTML,
                []
              ),
              i = new this(r, n, e);
            return (
              i.fragmentContextID === vt.TAG_ID.TEMPLATE &&
                i.tmplInsertionModeStack.unshift(Bt.IN_TEMPLATE),
              i._initTokenizerForFragmentParsing(),
              i._insertFakeRootElement(),
              i._resetInsertionMode(),
              i._findFormInFragmentContext(),
              i
            );
          }
          getFragment() {
            const e = this.treeAdapter.getFirstChild(this.document),
              t = this.treeAdapter.createDocumentFragment();
            return this._adoptNodes(e, t), t;
          }
          _err(e, t, r) {
            var n;
            if (!this.onParseError) return;
            const i = null !== (n = e.location) && void 0 !== n ? n : wt,
              s = {
                code: t,
                startLine: i.startLine,
                startCol: i.startCol,
                startOffset: i.startOffset,
                endLine: r ? i.startLine : i.endLine,
                endCol: r ? i.startCol : i.endCol,
                endOffset: r ? i.startOffset : i.endOffset,
              };
            this.onParseError(s);
          }
          onItemPush(e, t, r) {
            var n, i;
            null === (i = (n = this.treeAdapter).onItemPush) ||
              void 0 === i ||
              i.call(n, e),
              r &&
                this.openElements.stackTop > 0 &&
                this._setContextModes(e, t);
          }
          onItemPop(e, t) {
            var r, n;
            if (
              (this.options.sourceCodeLocationInfo &&
                this._setEndLocation(e, this.currentToken),
              null === (n = (r = this.treeAdapter).onItemPop) ||
                void 0 === n ||
                n.call(r, e, this.openElements.current),
              t)
            ) {
              let e, t;
              0 === this.openElements.stackTop && this.fragmentContext
                ? ((e = this.fragmentContext), (t = this.fragmentContextID))
                : ({ current: e, currentTagId: t } = this.openElements),
                this._setContextModes(e, t);
            }
          }
          _setContextModes(e, t) {
            const r =
              e === this.document ||
              this.treeAdapter.getNamespaceURI(e) === vt.NS.HTML;
            (this.currentNotInHTML = !r),
              (this.tokenizer.inForeignNode =
                !r && !this._isIntegrationPoint(t, e));
          }
          _switchToTextParsing(e, t) {
            this._insertElement(e, vt.NS.HTML),
              (this.tokenizer.state = t),
              (this.originalInsertionMode = this.insertionMode),
              (this.insertionMode = Bt.TEXT);
          }
          switchToPlaintextParsing() {
            (this.insertionMode = Bt.TEXT),
              (this.originalInsertionMode = Bt.IN_BODY),
              (this.tokenizer.state = Nt.TokenizerMode.PLAINTEXT);
          }
          _getAdjustedCurrentElement() {
            return 0 === this.openElements.stackTop && this.fragmentContext
              ? this.fragmentContext
              : this.openElements.current;
          }
          _findFormInFragmentContext() {
            let e = this.fragmentContext;
            for (; e; ) {
              if (this.treeAdapter.getTagName(e) === vt.TAG_NAMES.FORM) {
                this.formElement = e;
                break;
              }
              e = this.treeAdapter.getParentNode(e);
            }
          }
          _initTokenizerForFragmentParsing() {
            if (
              this.fragmentContext &&
              this.treeAdapter.getNamespaceURI(this.fragmentContext) ===
                vt.NS.HTML
            )
              switch (this.fragmentContextID) {
                case vt.TAG_ID.TITLE:
                case vt.TAG_ID.TEXTAREA:
                  this.tokenizer.state = Nt.TokenizerMode.RCDATA;
                  break;
                case vt.TAG_ID.STYLE:
                case vt.TAG_ID.XMP:
                case vt.TAG_ID.IFRAME:
                case vt.TAG_ID.NOEMBED:
                case vt.TAG_ID.NOFRAMES:
                case vt.TAG_ID.NOSCRIPT:
                  this.tokenizer.state = Nt.TokenizerMode.RAWTEXT;
                  break;
                case vt.TAG_ID.SCRIPT:
                  this.tokenizer.state = Nt.TokenizerMode.SCRIPT_DATA;
                  break;
                case vt.TAG_ID.PLAINTEXT:
                  this.tokenizer.state = Nt.TokenizerMode.PLAINTEXT;
              }
          }
          _setDocumentType(e) {
            const t = e.name || "",
              r = e.publicId || "",
              n = e.systemId || "";
            if (
              (this.treeAdapter.setDocumentType(this.document, t, r, n),
              e.location)
            ) {
              const t = this.treeAdapter.getChildNodes(this.document),
                r = t.find((e) => this.treeAdapter.isDocumentTypeNode(e));
              r && this.treeAdapter.setNodeSourceCodeLocation(r, e.location);
            }
          }
          _attachElementToTree(e, t) {
            if (this.options.sourceCodeLocationInfo) {
              const r =
                t && Object.assign(Object.assign({}, t), { startTag: t });
              this.treeAdapter.setNodeSourceCodeLocation(e, r);
            }
            if (this._shouldFosterParentOnInsertion())
              this._fosterParentElement(e);
            else {
              const t = this.openElements.currentTmplContentOrNode;
              this.treeAdapter.appendChild(t, e);
            }
          }
          _appendElement(e, t) {
            const r = this.treeAdapter.createElement(e.tagName, t, e.attrs);
            this._attachElementToTree(r, e.location);
          }
          _insertElement(e, t) {
            const r = this.treeAdapter.createElement(e.tagName, t, e.attrs);
            this._attachElementToTree(r, e.location),
              this.openElements.push(r, e.tagID);
          }
          _insertFakeElement(e, t) {
            const r = this.treeAdapter.createElement(e, vt.NS.HTML, []);
            this._attachElementToTree(r, null), this.openElements.push(r, t);
          }
          _insertTemplate(e) {
            const t = this.treeAdapter.createElement(
                e.tagName,
                vt.NS.HTML,
                e.attrs
              ),
              r = this.treeAdapter.createDocumentFragment();
            this.treeAdapter.setTemplateContent(t, r),
              this._attachElementToTree(t, e.location),
              this.openElements.push(t, e.tagID),
              this.options.sourceCodeLocationInfo &&
                this.treeAdapter.setNodeSourceCodeLocation(r, null);
          }
          _insertFakeRootElement() {
            const e = this.treeAdapter.createElement(
              vt.TAG_NAMES.HTML,
              vt.NS.HTML,
              []
            );
            this.options.sourceCodeLocationInfo &&
              this.treeAdapter.setNodeSourceCodeLocation(e, null),
              this.treeAdapter.appendChild(this.openElements.current, e),
              this.openElements.push(e, vt.TAG_ID.HTML);
          }
          _appendCommentNode(e, t) {
            const r = this.treeAdapter.createCommentNode(e.data);
            this.treeAdapter.appendChild(t, r),
              this.options.sourceCodeLocationInfo &&
                this.treeAdapter.setNodeSourceCodeLocation(r, e.location);
          }
          _insertCharacters(e) {
            let t, r;
            if (
              (this._shouldFosterParentOnInsertion()
                ? (({ parent: t, beforeElement: r } =
                    this._findFosterParentingLocation()),
                  r
                    ? this.treeAdapter.insertTextBefore(t, e.chars, r)
                    : this.treeAdapter.insertText(t, e.chars))
                : ((t = this.openElements.currentTmplContentOrNode),
                  this.treeAdapter.insertText(t, e.chars)),
              !e.location)
            )
              return;
            const n = this.treeAdapter.getChildNodes(t),
              i = r ? n.lastIndexOf(r) : n.length,
              s = n[i - 1],
              a = this.treeAdapter.getNodeSourceCodeLocation(s);
            if (a) {
              const { endLine: t, endCol: r, endOffset: n } = e.location;
              this.treeAdapter.updateNodeSourceCodeLocation(s, {
                endLine: t,
                endCol: r,
                endOffset: n,
              });
            } else
              this.options.sourceCodeLocationInfo &&
                this.treeAdapter.setNodeSourceCodeLocation(s, e.location);
          }
          _adoptNodes(e, t) {
            for (
              let r = this.treeAdapter.getFirstChild(e);
              r;
              r = this.treeAdapter.getFirstChild(e)
            )
              this.treeAdapter.detachNode(r),
                this.treeAdapter.appendChild(t, r);
          }
          _setEndLocation(e, t) {
            if (this.treeAdapter.getNodeSourceCodeLocation(e) && t.location) {
              const r = t.location,
                n = this.treeAdapter.getTagName(e),
                i =
                  t.type === Lt.TokenType.END_TAG && n === t.tagName
                    ? {
                        endTag: Object.assign({}, r),
                        endLine: r.endLine,
                        endCol: r.endCol,
                        endOffset: r.endOffset,
                      }
                    : {
                        endLine: r.startLine,
                        endCol: r.startCol,
                        endOffset: r.startOffset,
                      };
              this.treeAdapter.updateNodeSourceCodeLocation(e, i);
            }
          }
          shouldProcessStartTagTokenInForeignContent(e) {
            if (!this.currentNotInHTML) return !1;
            let t, r;
            return (
              0 === this.openElements.stackTop && this.fragmentContext
                ? ((t = this.fragmentContext), (r = this.fragmentContextID))
                : ({ current: t, currentTagId: r } = this.openElements),
              (e.tagID !== vt.TAG_ID.SVG ||
                this.treeAdapter.getTagName(t) !==
                  vt.TAG_NAMES.ANNOTATION_XML ||
                this.treeAdapter.getNamespaceURI(t) !== vt.NS.MATHML) &&
                (this.tokenizer.inForeignNode ||
                  ((e.tagID === vt.TAG_ID.MGLYPH ||
                    e.tagID === vt.TAG_ID.MALIGNMARK) &&
                    !this._isIntegrationPoint(r, t, vt.NS.HTML)))
            );
          }
          _processToken(e) {
            switch (e.type) {
              case Lt.TokenType.CHARACTER:
                this.onCharacter(e);
                break;
              case Lt.TokenType.NULL_CHARACTER:
                this.onNullCharacter(e);
                break;
              case Lt.TokenType.COMMENT:
                this.onComment(e);
                break;
              case Lt.TokenType.DOCTYPE:
                this.onDoctype(e);
                break;
              case Lt.TokenType.START_TAG:
                this._processStartTag(e);
                break;
              case Lt.TokenType.END_TAG:
                this.onEndTag(e);
                break;
              case Lt.TokenType.EOF:
                this.onEof(e);
                break;
              case Lt.TokenType.WHITESPACE_CHARACTER:
                this.onWhitespaceCharacter(e);
            }
          }
          _isIntegrationPoint(e, t, r) {
            const n = this.treeAdapter.getNamespaceURI(t),
              i = this.treeAdapter.getAttrList(t);
            return Rt.isIntegrationPoint(e, n, i, r);
          }
          _reconstructActiveFormattingElements() {
            const e = this.activeFormattingElements.entries.length;
            if (e) {
              const t = this.activeFormattingElements.entries.findIndex(
                  (e) =>
                    e.type === St.EntryType.Marker ||
                    this.openElements.contains(e.element)
                ),
                r = t < 0 ? e - 1 : t - 1;
              for (let e = r; e >= 0; e--) {
                const t = this.activeFormattingElements.entries[e];
                this._insertElement(
                  t.token,
                  this.treeAdapter.getNamespaceURI(t.element)
                ),
                  (t.element = this.openElements.current);
              }
            }
          }
          _closeTableCell() {
            this.openElements.generateImpliedEndTags(),
              this.openElements.popUntilTableCellPopped(),
              this.activeFormattingElements.clearToLastMarker(),
              (this.insertionMode = Bt.IN_ROW);
          }
          _closePElement() {
            this.openElements.generateImpliedEndTagsWithExclusion(vt.TAG_ID.P),
              this.openElements.popUntilTagNamePopped(vt.TAG_ID.P);
          }
          _resetInsertionMode() {
            for (let e = this.openElements.stackTop; e >= 0; e--)
              switch (
                0 === e && this.fragmentContext
                  ? this.fragmentContextID
                  : this.openElements.tagIDs[e]
              ) {
                case vt.TAG_ID.TR:
                  return void (this.insertionMode = Bt.IN_ROW);
                case vt.TAG_ID.TBODY:
                case vt.TAG_ID.THEAD:
                case vt.TAG_ID.TFOOT:
                  return void (this.insertionMode = Bt.IN_TABLE_BODY);
                case vt.TAG_ID.CAPTION:
                  return void (this.insertionMode = Bt.IN_CAPTION);
                case vt.TAG_ID.COLGROUP:
                  return void (this.insertionMode = Bt.IN_COLUMN_GROUP);
                case vt.TAG_ID.TABLE:
                  return void (this.insertionMode = Bt.IN_TABLE);
                case vt.TAG_ID.BODY:
                  return void (this.insertionMode = Bt.IN_BODY);
                case vt.TAG_ID.FRAMESET:
                  return void (this.insertionMode = Bt.IN_FRAMESET);
                case vt.TAG_ID.SELECT:
                  return void this._resetInsertionModeForSelect(e);
                case vt.TAG_ID.TEMPLATE:
                  return void (this.insertionMode =
                    this.tmplInsertionModeStack[0]);
                case vt.TAG_ID.HTML:
                  return void (this.insertionMode = this.headElement
                    ? Bt.AFTER_HEAD
                    : Bt.BEFORE_HEAD);
                case vt.TAG_ID.TD:
                case vt.TAG_ID.TH:
                  if (e > 0) return void (this.insertionMode = Bt.IN_CELL);
                  break;
                case vt.TAG_ID.HEAD:
                  if (e > 0) return void (this.insertionMode = Bt.IN_HEAD);
              }
            this.insertionMode = Bt.IN_BODY;
          }
          _resetInsertionModeForSelect(e) {
            if (e > 0)
              for (let t = e - 1; t > 0; t--) {
                const e = this.openElements.tagIDs[t];
                if (e === vt.TAG_ID.TEMPLATE) break;
                if (e === vt.TAG_ID.TABLE)
                  return void (this.insertionMode = Bt.IN_SELECT_IN_TABLE);
              }
            this.insertionMode = Bt.IN_SELECT;
          }
          _isElementCausesFosterParenting(e) {
            return xt.has(e);
          }
          _shouldFosterParentOnInsertion() {
            return (
              this.fosterParentingEnabled &&
              this._isElementCausesFosterParenting(
                this.openElements.currentTagId
              )
            );
          }
          _findFosterParentingLocation() {
            for (let e = this.openElements.stackTop; e >= 0; e--) {
              const t = this.openElements.items[e];
              switch (this.openElements.tagIDs[e]) {
                case vt.TAG_ID.TEMPLATE:
                  if (this.treeAdapter.getNamespaceURI(t) === vt.NS.HTML)
                    return {
                      parent: this.treeAdapter.getTemplateContent(t),
                      beforeElement: null,
                    };
                  break;
                case vt.TAG_ID.TABLE: {
                  const r = this.treeAdapter.getParentNode(t);
                  return r
                    ? { parent: r, beforeElement: t }
                    : {
                        parent: this.openElements.items[e - 1],
                        beforeElement: null,
                      };
                }
              }
            }
            return { parent: this.openElements.items[0], beforeElement: null };
          }
          _fosterParentElement(e) {
            const t = this._findFosterParentingLocation();
            t.beforeElement
              ? this.treeAdapter.insertBefore(t.parent, e, t.beforeElement)
              : this.treeAdapter.appendChild(t.parent, e);
          }
          _isSpecialElement(e, t) {
            const r = this.treeAdapter.getNamespaceURI(e);
            return vt.SPECIAL_ELEMENTS[r].has(t);
          }
          onCharacter(e) {
            if (((this.skipNextNewLine = !1), this.tokenizer.inForeignNode))
              mt(this, e);
            else
              switch (this.insertionMode) {
                case Bt.INITIAL:
                  p(this, e);
                  break;
                case Bt.BEFORE_HTML:
                  A(this, e);
                  break;
                case Bt.BEFORE_HEAD:
                  D(this, e);
                  break;
                case Bt.IN_HEAD:
                  S(this, e);
                  break;
                case Bt.IN_HEAD_NO_SCRIPT:
                  R(this, e);
                  break;
                case Bt.AFTER_HEAD:
                  v(this, e);
                  break;
                case Bt.IN_BODY:
                case Bt.IN_CAPTION:
                case Bt.IN_CELL:
                case Bt.IN_TEMPLATE:
                  k(this, e);
                  break;
                case Bt.TEXT:
                case Bt.IN_SELECT:
                case Bt.IN_SELECT_IN_TABLE:
                  this._insertCharacters(e);
                  break;
                case Bt.IN_TABLE:
                case Bt.IN_TABLE_BODY:
                case Bt.IN_ROW:
                  ye(this, e);
                  break;
                case Bt.IN_TABLE_TEXT:
                  je(this, e);
                  break;
                case Bt.IN_COLUMN_GROUP:
                  We(this, e);
                  break;
                case Bt.AFTER_BODY:
                  lt(this, e);
                  break;
                case Bt.AFTER_AFTER_BODY:
                  ft(this, e);
              }
          }
          onNullCharacter(e) {
            if (((this.skipNextNewLine = !1), this.tokenizer.inForeignNode))
              At(this, e);
            else
              switch (this.insertionMode) {
                case Bt.INITIAL:
                  p(this, e);
                  break;
                case Bt.BEFORE_HTML:
                  A(this, e);
                  break;
                case Bt.BEFORE_HEAD:
                  D(this, e);
                  break;
                case Bt.IN_HEAD:
                  S(this, e);
                  break;
                case Bt.IN_HEAD_NO_SCRIPT:
                  R(this, e);
                  break;
                case Bt.AFTER_HEAD:
                  v(this, e);
                  break;
                case Bt.TEXT:
                  this._insertCharacters(e);
                  break;
                case Bt.IN_TABLE:
                case Bt.IN_TABLE_BODY:
                case Bt.IN_ROW:
                  ye(this, e);
                  break;
                case Bt.IN_COLUMN_GROUP:
                  We(this, e);
                  break;
                case Bt.AFTER_BODY:
                  lt(this, e);
                  break;
                case Bt.AFTER_AFTER_BODY:
                  ft(this, e);
              }
          }
          onComment(e) {
            if (((this.skipNextNewLine = !1), this.currentNotInHTML))
              l(this, e);
            else
              switch (this.insertionMode) {
                case Bt.INITIAL:
                case Bt.BEFORE_HTML:
                case Bt.BEFORE_HEAD:
                case Bt.IN_HEAD:
                case Bt.IN_HEAD_NO_SCRIPT:
                case Bt.AFTER_HEAD:
                case Bt.IN_BODY:
                case Bt.IN_TABLE:
                case Bt.IN_CAPTION:
                case Bt.IN_COLUMN_GROUP:
                case Bt.IN_TABLE_BODY:
                case Bt.IN_ROW:
                case Bt.IN_CELL:
                case Bt.IN_SELECT:
                case Bt.IN_SELECT_IN_TABLE:
                case Bt.IN_TEMPLATE:
                case Bt.IN_FRAMESET:
                case Bt.AFTER_FRAMESET:
                  l(this, e);
                  break;
                case Bt.IN_TABLE_TEXT:
                  qe(this, e);
                  break;
                case Bt.AFTER_BODY:
                  h(this, e);
                  break;
                case Bt.AFTER_AFTER_BODY:
                case Bt.AFTER_AFTER_FRAMESET:
                  T(this, e);
              }
          }
          onDoctype(e) {
            switch (((this.skipNextNewLine = !1), this.insertionMode)) {
              case Bt.INITIAL:
                E(this, e);
                break;
              case Bt.BEFORE_HEAD:
              case Bt.IN_HEAD:
              case Bt.IN_HEAD_NO_SCRIPT:
              case Bt.AFTER_HEAD:
                this._err(e, yt.ERR.misplacedDoctype);
                break;
              case Bt.IN_TABLE_TEXT:
                qe(this, e);
            }
          }
          onStartTag(e) {
            (this.skipNextNewLine = !1),
              (this.currentToken = e),
              this._processStartTag(e),
              e.selfClosing &&
                !e.ackSelfClosing &&
                this._err(
                  e,
                  yt.ERR.nonVoidHtmlElementStartTagWithTrailingSolidus
                );
          }
          _processStartTag(e) {
            this.shouldProcessStartTagTokenInForeignContent(e)
              ? Dt(this, e)
              : this._startTagOutsideForeignContent(e);
          }
          _startTagOutsideForeignContent(e) {
            switch (this.insertionMode) {
              case Bt.INITIAL:
                p(this, e);
                break;
              case Bt.BEFORE_HTML:
                f(this, e);
                break;
              case Bt.BEFORE_HEAD:
                m(this, e);
                break;
              case Bt.IN_HEAD:
                g(this, e);
                break;
              case Bt.IN_HEAD_NO_SCRIPT:
                O(this, e);
                break;
              case Bt.AFTER_HEAD:
                y(this, e);
                break;
              case Bt.IN_BODY:
                de(this, e);
                break;
              case Bt.IN_TABLE:
                xe(this, e);
                break;
              case Bt.IN_TABLE_TEXT:
                qe(this, e);
                break;
              case Bt.IN_CAPTION:
                Ye(this, e);
                break;
              case Bt.IN_COLUMN_GROUP:
                Qe(this, e);
                break;
              case Bt.IN_TABLE_BODY:
                Ke(this, e);
                break;
              case Bt.IN_ROW:
                Ze(this, e);
                break;
              case Bt.IN_CELL:
                $e(this, e);
                break;
              case Bt.IN_SELECT:
                tt(this, e);
                break;
              case Bt.IN_SELECT_IN_TABLE:
                nt(this, e);
                break;
              case Bt.IN_TEMPLATE:
                st(this, e);
                break;
              case Bt.AFTER_BODY:
                ct(this, e);
                break;
              case Bt.IN_FRAMESET:
                ht(this, e);
                break;
              case Bt.AFTER_FRAMESET:
                dt(this, e);
                break;
              case Bt.AFTER_AFTER_BODY:
                pt(this, e);
                break;
              case Bt.AFTER_AFTER_FRAMESET:
                _t(this, e);
            }
          }
          onEndTag(e) {
            (this.skipNextNewLine = !1),
              (this.currentToken = e),
              this.currentNotInHTML
                ? gt(this, e)
                : this._endTagOutsideForeignContent(e);
          }
          _endTagOutsideForeignContent(e) {
            switch (this.insertionMode) {
              case Bt.INITIAL:
                p(this, e);
                break;
              case Bt.BEFORE_HTML:
                _(this, e);
                break;
              case Bt.BEFORE_HEAD:
                I(this, e);
                break;
              case Bt.IN_HEAD:
                N(this, e);
                break;
              case Bt.IN_HEAD_NO_SCRIPT:
                b(this, e);
                break;
              case Bt.AFTER_HEAD:
                P(this, e);
                break;
              case Bt.IN_BODY:
                Se(this, e);
                break;
              case Bt.TEXT:
                be(this, e);
                break;
              case Bt.IN_TABLE:
                Ue(this, e);
                break;
              case Bt.IN_TABLE_TEXT:
                qe(this, e);
                break;
              case Bt.IN_CAPTION:
                Ve(this, e);
                break;
              case Bt.IN_COLUMN_GROUP:
                Xe(this, e);
                break;
              case Bt.IN_TABLE_BODY:
                ze(this, e);
                break;
              case Bt.IN_ROW:
                Je(this, e);
                break;
              case Bt.IN_CELL:
                et(this, e);
                break;
              case Bt.IN_SELECT:
                rt(this, e);
                break;
              case Bt.IN_SELECT_IN_TABLE:
                it(this, e);
                break;
              case Bt.IN_TEMPLATE:
                at(this, e);
                break;
              case Bt.AFTER_BODY:
                ut(this, e);
                break;
              case Bt.IN_FRAMESET:
                Tt(this, e);
                break;
              case Bt.AFTER_FRAMESET:
                Et(this, e);
                break;
              case Bt.AFTER_AFTER_BODY:
                ft(this, e);
            }
          }
          onEof(e) {
            switch (this.insertionMode) {
              case Bt.INITIAL:
                p(this, e);
                break;
              case Bt.BEFORE_HTML:
                A(this, e);
                break;
              case Bt.BEFORE_HEAD:
                D(this, e);
                break;
              case Bt.IN_HEAD:
                S(this, e);
                break;
              case Bt.IN_HEAD_NO_SCRIPT:
                R(this, e);
                break;
              case Bt.AFTER_HEAD:
                v(this, e);
                break;
              case Bt.IN_BODY:
              case Bt.IN_TABLE:
              case Bt.IN_CAPTION:
              case Bt.IN_COLUMN_GROUP:
              case Bt.IN_TABLE_BODY:
              case Bt.IN_ROW:
              case Bt.IN_CELL:
              case Bt.IN_SELECT:
              case Bt.IN_SELECT_IN_TABLE:
                Oe(this, e);
                break;
              case Bt.TEXT:
                Re(this, e);
                break;
              case Bt.IN_TABLE_TEXT:
                qe(this, e);
                break;
              case Bt.IN_TEMPLATE:
                ot(this, e);
                break;
              case Bt.AFTER_BODY:
              case Bt.IN_FRAMESET:
              case Bt.AFTER_FRAMESET:
              case Bt.AFTER_AFTER_BODY:
              case Bt.AFTER_AFTER_FRAMESET:
                d(this, e);
            }
          }
          onWhitespaceCharacter(e) {
            if (
              this.skipNextNewLine &&
              ((this.skipNextNewLine = !1),
              e.chars.charCodeAt(0) === Pt.CODE_POINTS.LINE_FEED)
            ) {
              if (1 === e.chars.length) return;
              e.chars = e.chars.substr(1);
            }
            if (this.tokenizer.inForeignNode) this._insertCharacters(e);
            else
              switch (this.insertionMode) {
                case Bt.IN_HEAD:
                case Bt.IN_HEAD_NO_SCRIPT:
                case Bt.AFTER_HEAD:
                case Bt.TEXT:
                case Bt.IN_COLUMN_GROUP:
                case Bt.IN_SELECT:
                case Bt.IN_SELECT_IN_TABLE:
                case Bt.IN_FRAMESET:
                case Bt.AFTER_FRAMESET:
                  this._insertCharacters(e);
                  break;
                case Bt.IN_BODY:
                case Bt.IN_CAPTION:
                case Bt.IN_CELL:
                case Bt.IN_TEMPLATE:
                case Bt.AFTER_BODY:
                case Bt.AFTER_AFTER_BODY:
                case Bt.AFTER_AFTER_FRAMESET:
                  M(this, e);
                  break;
                case Bt.IN_TABLE:
                case Bt.IN_TABLE_BODY:
                case Bt.IN_ROW:
                  ye(this, e);
                  break;
                case Bt.IN_TABLE_TEXT:
                  Fe(this, e);
              }
          }
        }
        r.Parser = Ht;
        const Ft = new Set([
          vt.TAG_ID.CAPTION,
          vt.TAG_ID.COL,
          vt.TAG_ID.COLGROUP,
          vt.TAG_ID.TBODY,
          vt.TAG_ID.TD,
          vt.TAG_ID.TFOOT,
          vt.TAG_ID.TH,
          vt.TAG_ID.THEAD,
          vt.TAG_ID.TR,
        ]);
      },
      {
        "../common/doctype.js": 65,
        "../common/error-codes.js": 66,
        "../common/foreign-content.js": 67,
        "../common/html.js": 68,
        "../common/token.js": 69,
        "../common/unicode.js": 70,
        "../tokenizer/index.js": 76,
        "../tree-adapters/default.js": 78,
        "./formatting-element-list.js": 72,
        "./open-element-stack.js": 74,
      },
    ],
    74: [
      function (e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.OpenElementStack = void 0);
        const n = e("../common/html.js"),
          i = new Set([
            n.TAG_ID.DD,
            n.TAG_ID.DT,
            n.TAG_ID.LI,
            n.TAG_ID.OPTGROUP,
            n.TAG_ID.OPTION,
            n.TAG_ID.P,
            n.TAG_ID.RB,
            n.TAG_ID.RP,
            n.TAG_ID.RT,
            n.TAG_ID.RTC,
          ]),
          s = new Set([
            ...i,
            n.TAG_ID.CAPTION,
            n.TAG_ID.COLGROUP,
            n.TAG_ID.TBODY,
            n.TAG_ID.TD,
            n.TAG_ID.TFOOT,
            n.TAG_ID.TH,
            n.TAG_ID.THEAD,
            n.TAG_ID.TR,
          ]),
          a = new Map([
            [n.TAG_ID.APPLET, n.NS.HTML],
            [n.TAG_ID.CAPTION, n.NS.HTML],
            [n.TAG_ID.HTML, n.NS.HTML],
            [n.TAG_ID.MARQUEE, n.NS.HTML],
            [n.TAG_ID.OBJECT, n.NS.HTML],
            [n.TAG_ID.TABLE, n.NS.HTML],
            [n.TAG_ID.TD, n.NS.HTML],
            [n.TAG_ID.TEMPLATE, n.NS.HTML],
            [n.TAG_ID.TH, n.NS.HTML],
            [n.TAG_ID.ANNOTATION_XML, n.NS.MATHML],
            [n.TAG_ID.MI, n.NS.MATHML],
            [n.TAG_ID.MN, n.NS.MATHML],
            [n.TAG_ID.MO, n.NS.MATHML],
            [n.TAG_ID.MS, n.NS.MATHML],
            [n.TAG_ID.MTEXT, n.NS.MATHML],
            [n.TAG_ID.DESC, n.NS.SVG],
            [n.TAG_ID.FOREIGN_OBJECT, n.NS.SVG],
            [n.TAG_ID.TITLE, n.NS.SVG],
          ]),
          o = [
            n.TAG_ID.H1,
            n.TAG_ID.H2,
            n.TAG_ID.H3,
            n.TAG_ID.H4,
            n.TAG_ID.H5,
            n.TAG_ID.H6,
          ],
          c = [n.TAG_ID.TR, n.TAG_ID.TEMPLATE, n.TAG_ID.HTML],
          u = [
            n.TAG_ID.TBODY,
            n.TAG_ID.TFOOT,
            n.TAG_ID.THEAD,
            n.TAG_ID.TEMPLATE,
            n.TAG_ID.HTML,
          ],
          l = [n.TAG_ID.TABLE, n.TAG_ID.TEMPLATE, n.TAG_ID.HTML],
          h = [n.TAG_ID.TD, n.TAG_ID.TH];
        class T {
          get currentTmplContentOrNode() {
            return this._isInTemplate()
              ? this.treeAdapter.getTemplateContent(this.current)
              : this.current;
          }
          constructor(e, t, r) {
            (this.treeAdapter = t),
              (this.handler = r),
              (this.items = []),
              (this.tagIDs = []),
              (this.stackTop = -1),
              (this.tmplCount = 0),
              (this.currentTagId = n.TAG_ID.UNKNOWN),
              (this.current = e);
          }
          _indexOf(e) {
            return this.items.lastIndexOf(e, this.stackTop);
          }
          _isInTemplate() {
            return (
              this.currentTagId === n.TAG_ID.TEMPLATE &&
              this.treeAdapter.getNamespaceURI(this.current) === n.NS.HTML
            );
          }
          _updateCurrentElement() {
            (this.current = this.items[this.stackTop]),
              (this.currentTagId = this.tagIDs[this.stackTop]);
          }
          push(e, t) {
            this.stackTop++,
              (this.items[this.stackTop] = e),
              (this.current = e),
              (this.tagIDs[this.stackTop] = t),
              (this.currentTagId = t),
              this._isInTemplate() && this.tmplCount++,
              this.handler.onItemPush(e, t, !0);
          }
          pop() {
            const e = this.current;
            this.tmplCount > 0 && this._isInTemplate() && this.tmplCount--,
              this.stackTop--,
              this._updateCurrentElement(),
              this.handler.onItemPop(e, !0);
          }
          replace(e, t) {
            const r = this._indexOf(e);
            (this.items[r] = t), r === this.stackTop && (this.current = t);
          }
          insertAfter(e, t, r) {
            const n = this._indexOf(e) + 1;
            this.items.splice(n, 0, t),
              this.tagIDs.splice(n, 0, r),
              this.stackTop++,
              n === this.stackTop && this._updateCurrentElement(),
              this.handler.onItemPush(
                this.current,
                this.currentTagId,
                n === this.stackTop
              );
          }
          popUntilTagNamePopped(e) {
            let t = this.stackTop + 1;
            do {
              t = this.tagIDs.lastIndexOf(e, t - 1);
            } while (
              t > 0 &&
              this.treeAdapter.getNamespaceURI(this.items[t]) !== n.NS.HTML
            );
            this.shortenToLength(t < 0 ? 0 : t);
          }
          shortenToLength(e) {
            for (; this.stackTop >= e; ) {
              const t = this.current;
              this.tmplCount > 0 &&
                this._isInTemplate() &&
                (this.tmplCount -= 1),
                this.stackTop--,
                this._updateCurrentElement(),
                this.handler.onItemPop(t, this.stackTop < e);
            }
          }
          popUntilElementPopped(e) {
            const t = this._indexOf(e);
            this.shortenToLength(t < 0 ? 0 : t);
          }
          popUntilPopped(e, t) {
            const r = this._indexOfTagNames(e, t);
            this.shortenToLength(r < 0 ? 0 : r);
          }
          popUntilNumberedHeaderPopped() {
            this.popUntilPopped(o, n.NS.HTML);
          }
          popUntilTableCellPopped() {
            this.popUntilPopped(h, n.NS.HTML);
          }
          popAllUpToHtmlElement() {
            (this.tmplCount = 0), this.shortenToLength(1);
          }
          _indexOfTagNames(e, t) {
            for (let r = this.stackTop; r >= 0; r--)
              if (
                e.includes(this.tagIDs[r]) &&
                this.treeAdapter.getNamespaceURI(this.items[r]) === t
              )
                return r;
            return -1;
          }
          clearBackTo(e, t) {
            const r = this._indexOfTagNames(e, t);
            this.shortenToLength(r + 1);
          }
          clearBackToTableContext() {
            this.clearBackTo(l, n.NS.HTML);
          }
          clearBackToTableBodyContext() {
            this.clearBackTo(u, n.NS.HTML);
          }
          clearBackToTableRowContext() {
            this.clearBackTo(c, n.NS.HTML);
          }
          remove(e) {
            const t = this._indexOf(e);
            t >= 0 &&
              (t === this.stackTop
                ? this.pop()
                : (this.items.splice(t, 1),
                  this.tagIDs.splice(t, 1),
                  this.stackTop--,
                  this._updateCurrentElement(),
                  this.handler.onItemPop(e, !1)));
          }
          tryPeekProperlyNestedBodyElement() {
            return this.stackTop >= 1 && this.tagIDs[1] === n.TAG_ID.BODY
              ? this.items[1]
              : null;
          }
          contains(e) {
            return this._indexOf(e) > -1;
          }
          getCommonAncestor(e) {
            const t = this._indexOf(e) - 1;
            return t >= 0 ? this.items[t] : null;
          }
          isRootHtmlElementCurrent() {
            return 0 === this.stackTop && this.tagIDs[0] === n.TAG_ID.HTML;
          }
          hasInScope(e) {
            for (let t = this.stackTop; t >= 0; t--) {
              const r = this.tagIDs[t],
                i = this.treeAdapter.getNamespaceURI(this.items[t]);
              if (r === e && i === n.NS.HTML) return !0;
              if (a.get(r) === i) return !1;
            }
            return !0;
          }
          hasNumberedHeaderInScope() {
            for (let e = this.stackTop; e >= 0; e--) {
              const t = this.tagIDs[e],
                r = this.treeAdapter.getNamespaceURI(this.items[e]);
              if ((0, n.isNumberedHeader)(t) && r === n.NS.HTML) return !0;
              if (a.get(t) === r) return !1;
            }
            return !0;
          }
          hasInListItemScope(e) {
            for (let t = this.stackTop; t >= 0; t--) {
              const r = this.tagIDs[t],
                i = this.treeAdapter.getNamespaceURI(this.items[t]);
              if (r === e && i === n.NS.HTML) return !0;
              if (
                ((r === n.TAG_ID.UL || r === n.TAG_ID.OL) && i === n.NS.HTML) ||
                a.get(r) === i
              )
                return !1;
            }
            return !0;
          }
          hasInButtonScope(e) {
            for (let t = this.stackTop; t >= 0; t--) {
              const r = this.tagIDs[t],
                i = this.treeAdapter.getNamespaceURI(this.items[t]);
              if (r === e && i === n.NS.HTML) return !0;
              if ((r === n.TAG_ID.BUTTON && i === n.NS.HTML) || a.get(r) === i)
                return !1;
            }
            return !0;
          }
          hasInTableScope(e) {
            for (let t = this.stackTop; t >= 0; t--) {
              const r = this.tagIDs[t],
                i = this.treeAdapter.getNamespaceURI(this.items[t]);
              if (i === n.NS.HTML) {
                if (r === e) return !0;
                if (
                  r === n.TAG_ID.TABLE ||
                  r === n.TAG_ID.TEMPLATE ||
                  r === n.TAG_ID.HTML
                )
                  return !1;
              }
            }
            return !0;
          }
          hasTableBodyContextInTableScope() {
            for (let e = this.stackTop; e >= 0; e--) {
              const t = this.tagIDs[e],
                r = this.treeAdapter.getNamespaceURI(this.items[e]);
              if (r === n.NS.HTML) {
                if (
                  t === n.TAG_ID.TBODY ||
                  t === n.TAG_ID.THEAD ||
                  t === n.TAG_ID.TFOOT
                )
                  return !0;
                if (t === n.TAG_ID.TABLE || t === n.TAG_ID.HTML) return !1;
              }
            }
            return !0;
          }
          hasInSelectScope(e) {
            for (let t = this.stackTop; t >= 0; t--) {
              const r = this.tagIDs[t],
                i = this.treeAdapter.getNamespaceURI(this.items[t]);
              if (i === n.NS.HTML) {
                if (r === e) return !0;
                if (r !== n.TAG_ID.OPTION && r !== n.TAG_ID.OPTGROUP) return !1;
              }
            }
            return !0;
          }
          generateImpliedEndTags() {
            for (; i.has(this.currentTagId); ) this.pop();
          }
          generateImpliedEndTagsThoroughly() {
            for (; s.has(this.currentTagId); ) this.pop();
          }
          generateImpliedEndTagsWithExclusion(e) {
            for (; this.currentTagId !== e && s.has(this.currentTagId); )
              this.pop();
          }
        }
        r.OpenElementStack = T;
      },
      { "../common/html.js": 68 },
    ],
    75: [
      function (e, t, r) {
        "use strict";
        function n(e, t) {
          return (
            t.treeAdapter.isElementNode(e) &&
            t.treeAdapter.getNamespaceURI(e) === d.NS.HTML &&
            f.has(t.treeAdapter.getTagName(e))
          );
        }
        function i(e, t) {
          const r = Object.assign(Object.assign({}, _), t);
          return n(e, r) ? "" : a(e, r);
        }
        function s(e, t) {
          const r = Object.assign(Object.assign({}, _), t);
          return o(e, r);
        }
        function a(e, t) {
          let r = "";
          const n =
              t.treeAdapter.isElementNode(e) &&
              t.treeAdapter.getTagName(e) === d.TAG_NAMES.TEMPLATE &&
              t.treeAdapter.getNamespaceURI(e) === d.NS.HTML
                ? t.treeAdapter.getTemplateContent(e)
                : e,
            i = t.treeAdapter.getChildNodes(n);
          if (i) for (const e of i) r += o(e, t);
          return r;
        }
        function o(e, t) {
          return t.treeAdapter.isElementNode(e)
            ? c(e, t)
            : t.treeAdapter.isTextNode(e)
            ? l(e, t)
            : t.treeAdapter.isCommentNode(e)
            ? h(e, t)
            : t.treeAdapter.isDocumentTypeNode(e)
            ? T(e, t)
            : "";
        }
        function c(e, t) {
          const r = t.treeAdapter.getTagName(e);
          return `<${r}${u(e, t)}>${n(e, t) ? "" : `${a(e, t)}</${r}>`}`;
        }
        function u(e, { treeAdapter: t }) {
          let r = "";
          for (const n of t.getAttrList(e)) {
            if (((r += " "), n.namespace))
              switch (n.namespace) {
                case d.NS.XML:
                  r += `xml:${n.name}`;
                  break;
                case d.NS.XMLNS:
                  "xmlns" !== n.name && (r += "xmlns:"), (r += n.name);
                  break;
                case d.NS.XLINK:
                  r += `xlink:${n.name}`;
                  break;
                default:
                  r += `${n.prefix}:${n.name}`;
              }
            else r += n.name;
            r += `="${(0, E.escapeAttribute)(n.value)}"`;
          }
          return r;
        }
        function l(e, t) {
          const { treeAdapter: r } = t,
            n = r.getTextNodeContent(e),
            i = r.getParentNode(e),
            s = i && r.isElementNode(i) && r.getTagName(i);
          return s &&
            r.getNamespaceURI(i) === d.NS.HTML &&
            (0, d.hasUnescapedText)(s, t.scriptingEnabled)
            ? n
            : (0, E.escapeText)(n);
        }
        function h(e, { treeAdapter: t }) {
          return `<!--${t.getCommentNodeContent(e)}-->`;
        }
        function T(e, { treeAdapter: t }) {
          return `<!DOCTYPE ${t.getDocumentTypeNodeName(e)}>`;
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.serializeOuter = r.serialize = void 0);
        const d = e("../common/html.js"),
          E = e("entities/lib/escape.js"),
          p = e("../tree-adapters/default.js"),
          f = new Set([
            d.TAG_NAMES.AREA,
            d.TAG_NAMES.BASE,
            d.TAG_NAMES.BASEFONT,
            d.TAG_NAMES.BGSOUND,
            d.TAG_NAMES.BR,
            d.TAG_NAMES.COL,
            d.TAG_NAMES.EMBED,
            d.TAG_NAMES.FRAME,
            d.TAG_NAMES.HR,
            d.TAG_NAMES.IMG,
            d.TAG_NAMES.INPUT,
            d.TAG_NAMES.KEYGEN,
            d.TAG_NAMES.LINK,
            d.TAG_NAMES.META,
            d.TAG_NAMES.PARAM,
            d.TAG_NAMES.SOURCE,
            d.TAG_NAMES.TRACK,
            d.TAG_NAMES.WBR,
          ]),
          _ = { treeAdapter: p.defaultTreeAdapter, scriptingEnabled: !0 };
        (r.serialize = i), (r.serializeOuter = s);
      },
      {
        "../common/html.js": 68,
        "../tree-adapters/default.js": 78,
        "entities/lib/escape.js": 53,
      },
    ],
    76: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          return e >= f.CODE_POINTS.DIGIT_0 && e <= f.CODE_POINTS.DIGIT_9;
        }
        function i(e) {
          return (
            e >= f.CODE_POINTS.LATIN_CAPITAL_A &&
            e <= f.CODE_POINTS.LATIN_CAPITAL_Z
          );
        }
        function s(e) {
          return (
            e >= f.CODE_POINTS.LATIN_SMALL_A && e <= f.CODE_POINTS.LATIN_SMALL_Z
          );
        }
        function a(e) {
          return s(e) || i(e);
        }
        function o(e) {
          return a(e) || n(e);
        }
        function c(e) {
          return (
            e >= f.CODE_POINTS.LATIN_CAPITAL_A &&
            e <= f.CODE_POINTS.LATIN_CAPITAL_F
          );
        }
        function u(e) {
          return (
            e >= f.CODE_POINTS.LATIN_SMALL_A && e <= f.CODE_POINTS.LATIN_SMALL_F
          );
        }
        function l(e) {
          return n(e) || c(e) || u(e);
        }
        function h(e) {
          return e + 32;
        }
        function T(e) {
          return (
            e === f.CODE_POINTS.SPACE ||
            e === f.CODE_POINTS.LINE_FEED ||
            e === f.CODE_POINTS.TABULATION ||
            e === f.CODE_POINTS.FORM_FEED
          );
        }
        function d(e) {
          return e === f.CODE_POINTS.EQUALS_SIGN || o(e);
        }
        function E(e) {
          return (
            T(e) ||
            e === f.CODE_POINTS.SOLIDUS ||
            e === f.CODE_POINTS.GREATER_THAN_SIGN
          );
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.Tokenizer = r.TokenizerMode = void 0);
        const p = e("./preprocessor.js"),
          f = e("../common/unicode.js"),
          _ = e("../common/token.js"),
          A = e("entities/lib/decode.js"),
          m = e("../common/error-codes.js"),
          I = e("../common/html.js"),
          D = new Map([
            [128, 8364],
            [130, 8218],
            [131, 402],
            [132, 8222],
            [133, 8230],
            [134, 8224],
            [135, 8225],
            [136, 710],
            [137, 8240],
            [138, 352],
            [139, 8249],
            [140, 338],
            [142, 381],
            [145, 8216],
            [146, 8217],
            [147, 8220],
            [148, 8221],
            [149, 8226],
            [150, 8211],
            [151, 8212],
            [152, 732],
            [153, 8482],
            [154, 353],
            [155, 8250],
            [156, 339],
            [158, 382],
            [159, 376],
          ]);
        var g;
        (function (e) {
          (e[(e.DATA = 0)] = "DATA"),
            (e[(e.RCDATA = 1)] = "RCDATA"),
            (e[(e.RAWTEXT = 2)] = "RAWTEXT"),
            (e[(e.SCRIPT_DATA = 3)] = "SCRIPT_DATA"),
            (e[(e.PLAINTEXT = 4)] = "PLAINTEXT"),
            (e[(e.TAG_OPEN = 5)] = "TAG_OPEN"),
            (e[(e.END_TAG_OPEN = 6)] = "END_TAG_OPEN"),
            (e[(e.TAG_NAME = 7)] = "TAG_NAME"),
            (e[(e.RCDATA_LESS_THAN_SIGN = 8)] = "RCDATA_LESS_THAN_SIGN"),
            (e[(e.RCDATA_END_TAG_OPEN = 9)] = "RCDATA_END_TAG_OPEN"),
            (e[(e.RCDATA_END_TAG_NAME = 10)] = "RCDATA_END_TAG_NAME"),
            (e[(e.RAWTEXT_LESS_THAN_SIGN = 11)] = "RAWTEXT_LESS_THAN_SIGN"),
            (e[(e.RAWTEXT_END_TAG_OPEN = 12)] = "RAWTEXT_END_TAG_OPEN"),
            (e[(e.RAWTEXT_END_TAG_NAME = 13)] = "RAWTEXT_END_TAG_NAME"),
            (e[(e.SCRIPT_DATA_LESS_THAN_SIGN = 14)] =
              "SCRIPT_DATA_LESS_THAN_SIGN"),
            (e[(e.SCRIPT_DATA_END_TAG_OPEN = 15)] = "SCRIPT_DATA_END_TAG_OPEN"),
            (e[(e.SCRIPT_DATA_END_TAG_NAME = 16)] = "SCRIPT_DATA_END_TAG_NAME"),
            (e[(e.SCRIPT_DATA_ESCAPE_START = 17)] = "SCRIPT_DATA_ESCAPE_START"),
            (e[(e.SCRIPT_DATA_ESCAPE_START_DASH = 18)] =
              "SCRIPT_DATA_ESCAPE_START_DASH"),
            (e[(e.SCRIPT_DATA_ESCAPED = 19)] = "SCRIPT_DATA_ESCAPED"),
            (e[(e.SCRIPT_DATA_ESCAPED_DASH = 20)] = "SCRIPT_DATA_ESCAPED_DASH"),
            (e[(e.SCRIPT_DATA_ESCAPED_DASH_DASH = 21)] =
              "SCRIPT_DATA_ESCAPED_DASH_DASH"),
            (e[(e.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN = 22)] =
              "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN"),
            (e[(e.SCRIPT_DATA_ESCAPED_END_TAG_OPEN = 23)] =
              "SCRIPT_DATA_ESCAPED_END_TAG_OPEN"),
            (e[(e.SCRIPT_DATA_ESCAPED_END_TAG_NAME = 24)] =
              "SCRIPT_DATA_ESCAPED_END_TAG_NAME"),
            (e[(e.SCRIPT_DATA_DOUBLE_ESCAPE_START = 25)] =
              "SCRIPT_DATA_DOUBLE_ESCAPE_START"),
            (e[(e.SCRIPT_DATA_DOUBLE_ESCAPED = 26)] =
              "SCRIPT_DATA_DOUBLE_ESCAPED"),
            (e[(e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH = 27)] =
              "SCRIPT_DATA_DOUBLE_ESCAPED_DASH"),
            (e[(e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH = 28)] =
              "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH"),
            (e[(e.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN = 29)] =
              "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN"),
            (e[(e.SCRIPT_DATA_DOUBLE_ESCAPE_END = 30)] =
              "SCRIPT_DATA_DOUBLE_ESCAPE_END"),
            (e[(e.BEFORE_ATTRIBUTE_NAME = 31)] = "BEFORE_ATTRIBUTE_NAME"),
            (e[(e.ATTRIBUTE_NAME = 32)] = "ATTRIBUTE_NAME"),
            (e[(e.AFTER_ATTRIBUTE_NAME = 33)] = "AFTER_ATTRIBUTE_NAME"),
            (e[(e.BEFORE_ATTRIBUTE_VALUE = 34)] = "BEFORE_ATTRIBUTE_VALUE"),
            (e[(e.ATTRIBUTE_VALUE_DOUBLE_QUOTED = 35)] =
              "ATTRIBUTE_VALUE_DOUBLE_QUOTED"),
            (e[(e.ATTRIBUTE_VALUE_SINGLE_QUOTED = 36)] =
              "ATTRIBUTE_VALUE_SINGLE_QUOTED"),
            (e[(e.ATTRIBUTE_VALUE_UNQUOTED = 37)] = "ATTRIBUTE_VALUE_UNQUOTED"),
            (e[(e.AFTER_ATTRIBUTE_VALUE_QUOTED = 38)] =
              "AFTER_ATTRIBUTE_VALUE_QUOTED"),
            (e[(e.SELF_CLOSING_START_TAG = 39)] = "SELF_CLOSING_START_TAG"),
            (e[(e.BOGUS_COMMENT = 40)] = "BOGUS_COMMENT"),
            (e[(e.MARKUP_DECLARATION_OPEN = 41)] = "MARKUP_DECLARATION_OPEN"),
            (e[(e.COMMENT_START = 42)] = "COMMENT_START"),
            (e[(e.COMMENT_START_DASH = 43)] = "COMMENT_START_DASH"),
            (e[(e.COMMENT = 44)] = "COMMENT"),
            (e[(e.COMMENT_LESS_THAN_SIGN = 45)] = "COMMENT_LESS_THAN_SIGN"),
            (e[(e.COMMENT_LESS_THAN_SIGN_BANG = 46)] =
              "COMMENT_LESS_THAN_SIGN_BANG"),
            (e[(e.COMMENT_LESS_THAN_SIGN_BANG_DASH = 47)] =
              "COMMENT_LESS_THAN_SIGN_BANG_DASH"),
            (e[(e.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH = 48)] =
              "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH"),
            (e[(e.COMMENT_END_DASH = 49)] = "COMMENT_END_DASH"),
            (e[(e.COMMENT_END = 50)] = "COMMENT_END"),
            (e[(e.COMMENT_END_BANG = 51)] = "COMMENT_END_BANG"),
            (e[(e.DOCTYPE = 52)] = "DOCTYPE"),
            (e[(e.BEFORE_DOCTYPE_NAME = 53)] = "BEFORE_DOCTYPE_NAME"),
            (e[(e.DOCTYPE_NAME = 54)] = "DOCTYPE_NAME"),
            (e[(e.AFTER_DOCTYPE_NAME = 55)] = "AFTER_DOCTYPE_NAME"),
            (e[(e.AFTER_DOCTYPE_PUBLIC_KEYWORD = 56)] =
              "AFTER_DOCTYPE_PUBLIC_KEYWORD"),
            (e[(e.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER = 57)] =
              "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER"),
            (e[(e.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED = 58)] =
              "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED"),
            (e[(e.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED = 59)] =
              "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED"),
            (e[(e.AFTER_DOCTYPE_PUBLIC_IDENTIFIER = 60)] =
              "AFTER_DOCTYPE_PUBLIC_IDENTIFIER"),
            (e[(e.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS = 61)] =
              "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS"),
            (e[(e.AFTER_DOCTYPE_SYSTEM_KEYWORD = 62)] =
              "AFTER_DOCTYPE_SYSTEM_KEYWORD"),
            (e[(e.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER = 63)] =
              "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER"),
            (e[(e.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED = 64)] =
              "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED"),
            (e[(e.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED = 65)] =
              "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED"),
            (e[(e.AFTER_DOCTYPE_SYSTEM_IDENTIFIER = 66)] =
              "AFTER_DOCTYPE_SYSTEM_IDENTIFIER"),
            (e[(e.BOGUS_DOCTYPE = 67)] = "BOGUS_DOCTYPE"),
            (e[(e.CDATA_SECTION = 68)] = "CDATA_SECTION"),
            (e[(e.CDATA_SECTION_BRACKET = 69)] = "CDATA_SECTION_BRACKET"),
            (e[(e.CDATA_SECTION_END = 70)] = "CDATA_SECTION_END"),
            (e[(e.CHARACTER_REFERENCE = 71)] = "CHARACTER_REFERENCE"),
            (e[(e.NAMED_CHARACTER_REFERENCE = 72)] =
              "NAMED_CHARACTER_REFERENCE"),
            (e[(e.AMBIGUOUS_AMPERSAND = 73)] = "AMBIGUOUS_AMPERSAND"),
            (e[(e.NUMERIC_CHARACTER_REFERENCE = 74)] =
              "NUMERIC_CHARACTER_REFERENCE"),
            (e[(e.HEXADEMICAL_CHARACTER_REFERENCE_START = 75)] =
              "HEXADEMICAL_CHARACTER_REFERENCE_START"),
            (e[(e.HEXADEMICAL_CHARACTER_REFERENCE = 76)] =
              "HEXADEMICAL_CHARACTER_REFERENCE"),
            (e[(e.DECIMAL_CHARACTER_REFERENCE = 77)] =
              "DECIMAL_CHARACTER_REFERENCE"),
            (e[(e.NUMERIC_CHARACTER_REFERENCE_END = 78)] =
              "NUMERIC_CHARACTER_REFERENCE_END");
        })(g || (g = {})),
          (r.TokenizerMode = {
            DATA: g.DATA,
            RCDATA: g.RCDATA,
            RAWTEXT: g.RAWTEXT,
            SCRIPT_DATA: g.SCRIPT_DATA,
            PLAINTEXT: g.PLAINTEXT,
            CDATA_SECTION: g.CDATA_SECTION,
          });
        class N {
          constructor(e, t) {
            (this.options = e),
              (this.handler = t),
              (this.paused = !1),
              (this.inLoop = !1),
              (this.inForeignNode = !1),
              (this.lastStartTagName = ""),
              (this.active = !1),
              (this.state = g.DATA),
              (this.returnState = g.DATA),
              (this.charRefCode = -1),
              (this.consumedAfterSnapshot = -1),
              (this.currentCharacterToken = null),
              (this.currentToken = null),
              (this.currentAttr = { name: "", value: "" }),
              (this.preprocessor = new p.Preprocessor(t)),
              (this.currentLocation = this.getCurrentLocation(-1));
          }
          _err(e) {
            var t, r;
            null === (r = (t = this.handler).onParseError) ||
              void 0 === r ||
              r.call(t, this.preprocessor.getError(e));
          }
          getCurrentLocation(e) {
            return this.options.sourceCodeLocationInfo
              ? {
                  startLine: this.preprocessor.line,
                  startCol: this.preprocessor.col - e,
                  startOffset: this.preprocessor.offset - e,
                  endLine: -1,
                  endCol: -1,
                  endOffset: -1,
                }
              : null;
          }
          _runParsingLoop() {
            if (!this.inLoop) {
              for (this.inLoop = !0; this.active && !this.paused; ) {
                this.consumedAfterSnapshot = 0;
                const e = this._consume();
                this._ensureHibernation() || this._callState(e);
              }
              this.inLoop = !1;
            }
          }
          pause() {
            this.paused = !0;
          }
          resume(e) {
            if (!this.paused) throw new Error("Parser was already resumed");
            (this.paused = !1),
              this.inLoop ||
                (this._runParsingLoop(), this.paused || null == e || e());
          }
          write(e, t, r) {
            (this.active = !0),
              this.preprocessor.write(e, t),
              this._runParsingLoop(),
              this.paused || null == r || r();
          }
          insertHtmlAtCurrentPos(e) {
            (this.active = !0),
              this.preprocessor.insertHtmlAtCurrentPos(e),
              this._runParsingLoop();
          }
          _ensureHibernation() {
            return (
              !!this.preprocessor.endOfChunkHit &&
              (this._unconsume(this.consumedAfterSnapshot),
              (this.active = !1),
              !0)
            );
          }
          _consume() {
            return this.consumedAfterSnapshot++, this.preprocessor.advance();
          }
          _unconsume(e) {
            (this.consumedAfterSnapshot -= e), this.preprocessor.retreat(e);
          }
          _reconsumeInState(e, t) {
            (this.state = e), this._callState(t);
          }
          _advanceBy(e) {
            this.consumedAfterSnapshot += e;
            for (let t = 0; t < e; t++) this.preprocessor.advance();
          }
          _consumeSequenceIfMatch(e, t) {
            return (
              !!this.preprocessor.startsWith(e, t) &&
              (this._advanceBy(e.length - 1), !0)
            );
          }
          _createStartTagToken() {
            this.currentToken = {
              type: _.TokenType.START_TAG,
              tagName: "",
              tagID: I.TAG_ID.UNKNOWN,
              selfClosing: !1,
              ackSelfClosing: !1,
              attrs: [],
              location: this.getCurrentLocation(1),
            };
          }
          _createEndTagToken() {
            this.currentToken = {
              type: _.TokenType.END_TAG,
              tagName: "",
              tagID: I.TAG_ID.UNKNOWN,
              selfClosing: !1,
              ackSelfClosing: !1,
              attrs: [],
              location: this.getCurrentLocation(2),
            };
          }
          _createCommentToken(e) {
            this.currentToken = {
              type: _.TokenType.COMMENT,
              data: "",
              location: this.getCurrentLocation(e),
            };
          }
          _createDoctypeToken(e) {
            this.currentToken = {
              type: _.TokenType.DOCTYPE,
              name: e,
              forceQuirks: !1,
              publicId: null,
              systemId: null,
              location: this.currentLocation,
            };
          }
          _createCharacterToken(e, t) {
            this.currentCharacterToken = {
              type: e,
              chars: t,
              location: this.currentLocation,
            };
          }
          _createAttr(e) {
            (this.currentAttr = { name: e, value: "" }),
              (this.currentLocation = this.getCurrentLocation(0));
          }
          _leaveAttrName() {
            var e, t;
            const r = this.currentToken;
            if (null === (0, _.getTokenAttr)(r, this.currentAttr.name)) {
              if (
                (r.attrs.push(this.currentAttr),
                r.location && this.currentLocation)
              ) {
                const n =
                  null !== (e = (t = r.location).attrs) && void 0 !== e
                    ? e
                    : (t.attrs = Object.create(null));
                (n[this.currentAttr.name] = this.currentLocation),
                  this._leaveAttrValue();
              }
            } else this._err(m.ERR.duplicateAttribute);
          }
          _leaveAttrValue() {
            this.currentLocation &&
              ((this.currentLocation.endLine = this.preprocessor.line),
              (this.currentLocation.endCol = this.preprocessor.col),
              (this.currentLocation.endOffset = this.preprocessor.offset));
          }
          prepareToken(e) {
            this._emitCurrentCharacterToken(e.location),
              (this.currentToken = null),
              e.location &&
                ((e.location.endLine = this.preprocessor.line),
                (e.location.endCol = this.preprocessor.col + 1),
                (e.location.endOffset = this.preprocessor.offset + 1)),
              (this.currentLocation = this.getCurrentLocation(-1));
          }
          emitCurrentTagToken() {
            const e = this.currentToken;
            this.prepareToken(e),
              (e.tagID = (0, I.getTagID)(e.tagName)),
              e.type === _.TokenType.START_TAG
                ? ((this.lastStartTagName = e.tagName),
                  this.handler.onStartTag(e))
                : (e.attrs.length > 0 && this._err(m.ERR.endTagWithAttributes),
                  e.selfClosing && this._err(m.ERR.endTagWithTrailingSolidus),
                  this.handler.onEndTag(e)),
              this.preprocessor.dropParsedChunk();
          }
          emitCurrentComment(e) {
            this.prepareToken(e),
              this.handler.onComment(e),
              this.preprocessor.dropParsedChunk();
          }
          emitCurrentDoctype(e) {
            this.prepareToken(e),
              this.handler.onDoctype(e),
              this.preprocessor.dropParsedChunk();
          }
          _emitCurrentCharacterToken(e) {
            if (this.currentCharacterToken) {
              switch (
                (e &&
                  this.currentCharacterToken.location &&
                  ((this.currentCharacterToken.location.endLine = e.startLine),
                  (this.currentCharacterToken.location.endCol = e.startCol),
                  (this.currentCharacterToken.location.endOffset =
                    e.startOffset)),
                this.currentCharacterToken.type)
              ) {
                case _.TokenType.CHARACTER:
                  this.handler.onCharacter(this.currentCharacterToken);
                  break;
                case _.TokenType.NULL_CHARACTER:
                  this.handler.onNullCharacter(this.currentCharacterToken);
                  break;
                case _.TokenType.WHITESPACE_CHARACTER:
                  this.handler.onWhitespaceCharacter(
                    this.currentCharacterToken
                  );
              }
              this.currentCharacterToken = null;
            }
          }
          _emitEOFToken() {
            const e = this.getCurrentLocation(0);
            e &&
              ((e.endLine = e.startLine),
              (e.endCol = e.startCol),
              (e.endOffset = e.startOffset)),
              this._emitCurrentCharacterToken(e),
              this.handler.onEof({ type: _.TokenType.EOF, location: e }),
              (this.active = !1);
          }
          _appendCharToCurrentCharacterToken(e, t) {
            if (this.currentCharacterToken) {
              if (this.currentCharacterToken.type === e)
                return void (this.currentCharacterToken.chars += t);
              (this.currentLocation = this.getCurrentLocation(0)),
                this._emitCurrentCharacterToken(this.currentLocation),
                this.preprocessor.dropParsedChunk();
            }
            this._createCharacterToken(e, t);
          }
          _emitCodePoint(e) {
            const t = T(e)
              ? _.TokenType.WHITESPACE_CHARACTER
              : e === f.CODE_POINTS.NULL
              ? _.TokenType.NULL_CHARACTER
              : _.TokenType.CHARACTER;
            this._appendCharToCurrentCharacterToken(t, String.fromCodePoint(e));
          }
          _emitChars(e) {
            this._appendCharToCurrentCharacterToken(_.TokenType.CHARACTER, e);
          }
          _matchNamedCharacterReference(e) {
            let t = null,
              r = 0,
              n = !1;
            for (
              let i = 0, s = A.htmlDecodeTree[0];
              i >= 0 &&
              ((i = (0, A.determineBranch)(A.htmlDecodeTree, s, i + 1, e)),
              !(i < 0));
              e = this._consume()
            ) {
              (r += 1), (s = A.htmlDecodeTree[i]);
              const a = s & A.BinTrieFlags.VALUE_LENGTH;
              if (a) {
                const s = (a >> 14) - 1;
                if (
                  (e !== f.CODE_POINTS.SEMICOLON &&
                  this._isCharacterReferenceInAttribute() &&
                  d(this.preprocessor.peek(1))
                    ? ((t = [f.CODE_POINTS.AMPERSAND]), (i += s))
                    : ((t =
                        0 === s
                          ? [A.htmlDecodeTree[i] & ~A.BinTrieFlags.VALUE_LENGTH]
                          : 1 === s
                          ? [A.htmlDecodeTree[++i]]
                          : [A.htmlDecodeTree[++i], A.htmlDecodeTree[++i]]),
                      (r = 0),
                      (n = e !== f.CODE_POINTS.SEMICOLON)),
                  0 === s)
                ) {
                  this._consume();
                  break;
                }
              }
            }
            return (
              this._unconsume(r),
              n &&
                !this.preprocessor.endOfChunkHit &&
                this._err(m.ERR.missingSemicolonAfterCharacterReference),
              this._unconsume(1),
              t
            );
          }
          _isCharacterReferenceInAttribute() {
            return (
              this.returnState === g.ATTRIBUTE_VALUE_DOUBLE_QUOTED ||
              this.returnState === g.ATTRIBUTE_VALUE_SINGLE_QUOTED ||
              this.returnState === g.ATTRIBUTE_VALUE_UNQUOTED
            );
          }
          _flushCodePointConsumedAsCharacterReference(e) {
            this._isCharacterReferenceInAttribute()
              ? (this.currentAttr.value += String.fromCodePoint(e))
              : this._emitCodePoint(e);
          }
          _callState(e) {
            switch (this.state) {
              case g.DATA:
                this._stateData(e);
                break;
              case g.RCDATA:
                this._stateRcdata(e);
                break;
              case g.RAWTEXT:
                this._stateRawtext(e);
                break;
              case g.SCRIPT_DATA:
                this._stateScriptData(e);
                break;
              case g.PLAINTEXT:
                this._statePlaintext(e);
                break;
              case g.TAG_OPEN:
                this._stateTagOpen(e);
                break;
              case g.END_TAG_OPEN:
                this._stateEndTagOpen(e);
                break;
              case g.TAG_NAME:
                this._stateTagName(e);
                break;
              case g.RCDATA_LESS_THAN_SIGN:
                this._stateRcdataLessThanSign(e);
                break;
              case g.RCDATA_END_TAG_OPEN:
                this._stateRcdataEndTagOpen(e);
                break;
              case g.RCDATA_END_TAG_NAME:
                this._stateRcdataEndTagName(e);
                break;
              case g.RAWTEXT_LESS_THAN_SIGN:
                this._stateRawtextLessThanSign(e);
                break;
              case g.RAWTEXT_END_TAG_OPEN:
                this._stateRawtextEndTagOpen(e);
                break;
              case g.RAWTEXT_END_TAG_NAME:
                this._stateRawtextEndTagName(e);
                break;
              case g.SCRIPT_DATA_LESS_THAN_SIGN:
                this._stateScriptDataLessThanSign(e);
                break;
              case g.SCRIPT_DATA_END_TAG_OPEN:
                this._stateScriptDataEndTagOpen(e);
                break;
              case g.SCRIPT_DATA_END_TAG_NAME:
                this._stateScriptDataEndTagName(e);
                break;
              case g.SCRIPT_DATA_ESCAPE_START:
                this._stateScriptDataEscapeStart(e);
                break;
              case g.SCRIPT_DATA_ESCAPE_START_DASH:
                this._stateScriptDataEscapeStartDash(e);
                break;
              case g.SCRIPT_DATA_ESCAPED:
                this._stateScriptDataEscaped(e);
                break;
              case g.SCRIPT_DATA_ESCAPED_DASH:
                this._stateScriptDataEscapedDash(e);
                break;
              case g.SCRIPT_DATA_ESCAPED_DASH_DASH:
                this._stateScriptDataEscapedDashDash(e);
                break;
              case g.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN:
                this._stateScriptDataEscapedLessThanSign(e);
                break;
              case g.SCRIPT_DATA_ESCAPED_END_TAG_OPEN:
                this._stateScriptDataEscapedEndTagOpen(e);
                break;
              case g.SCRIPT_DATA_ESCAPED_END_TAG_NAME:
                this._stateScriptDataEscapedEndTagName(e);
                break;
              case g.SCRIPT_DATA_DOUBLE_ESCAPE_START:
                this._stateScriptDataDoubleEscapeStart(e);
                break;
              case g.SCRIPT_DATA_DOUBLE_ESCAPED:
                this._stateScriptDataDoubleEscaped(e);
                break;
              case g.SCRIPT_DATA_DOUBLE_ESCAPED_DASH:
                this._stateScriptDataDoubleEscapedDash(e);
                break;
              case g.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH:
                this._stateScriptDataDoubleEscapedDashDash(e);
                break;
              case g.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN:
                this._stateScriptDataDoubleEscapedLessThanSign(e);
                break;
              case g.SCRIPT_DATA_DOUBLE_ESCAPE_END:
                this._stateScriptDataDoubleEscapeEnd(e);
                break;
              case g.BEFORE_ATTRIBUTE_NAME:
                this._stateBeforeAttributeName(e);
                break;
              case g.ATTRIBUTE_NAME:
                this._stateAttributeName(e);
                break;
              case g.AFTER_ATTRIBUTE_NAME:
                this._stateAfterAttributeName(e);
                break;
              case g.BEFORE_ATTRIBUTE_VALUE:
                this._stateBeforeAttributeValue(e);
                break;
              case g.ATTRIBUTE_VALUE_DOUBLE_QUOTED:
                this._stateAttributeValueDoubleQuoted(e);
                break;
              case g.ATTRIBUTE_VALUE_SINGLE_QUOTED:
                this._stateAttributeValueSingleQuoted(e);
                break;
              case g.ATTRIBUTE_VALUE_UNQUOTED:
                this._stateAttributeValueUnquoted(e);
                break;
              case g.AFTER_ATTRIBUTE_VALUE_QUOTED:
                this._stateAfterAttributeValueQuoted(e);
                break;
              case g.SELF_CLOSING_START_TAG:
                this._stateSelfClosingStartTag(e);
                break;
              case g.BOGUS_COMMENT:
                this._stateBogusComment(e);
                break;
              case g.MARKUP_DECLARATION_OPEN:
                this._stateMarkupDeclarationOpen(e);
                break;
              case g.COMMENT_START:
                this._stateCommentStart(e);
                break;
              case g.COMMENT_START_DASH:
                this._stateCommentStartDash(e);
                break;
              case g.COMMENT:
                this._stateComment(e);
                break;
              case g.COMMENT_LESS_THAN_SIGN:
                this._stateCommentLessThanSign(e);
                break;
              case g.COMMENT_LESS_THAN_SIGN_BANG:
                this._stateCommentLessThanSignBang(e);
                break;
              case g.COMMENT_LESS_THAN_SIGN_BANG_DASH:
                this._stateCommentLessThanSignBangDash(e);
                break;
              case g.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH:
                this._stateCommentLessThanSignBangDashDash(e);
                break;
              case g.COMMENT_END_DASH:
                this._stateCommentEndDash(e);
                break;
              case g.COMMENT_END:
                this._stateCommentEnd(e);
                break;
              case g.COMMENT_END_BANG:
                this._stateCommentEndBang(e);
                break;
              case g.DOCTYPE:
                this._stateDoctype(e);
                break;
              case g.BEFORE_DOCTYPE_NAME:
                this._stateBeforeDoctypeName(e);
                break;
              case g.DOCTYPE_NAME:
                this._stateDoctypeName(e);
                break;
              case g.AFTER_DOCTYPE_NAME:
                this._stateAfterDoctypeName(e);
                break;
              case g.AFTER_DOCTYPE_PUBLIC_KEYWORD:
                this._stateAfterDoctypePublicKeyword(e);
                break;
              case g.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER:
                this._stateBeforeDoctypePublicIdentifier(e);
                break;
              case g.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED:
                this._stateDoctypePublicIdentifierDoubleQuoted(e);
                break;
              case g.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED:
                this._stateDoctypePublicIdentifierSingleQuoted(e);
                break;
              case g.AFTER_DOCTYPE_PUBLIC_IDENTIFIER:
                this._stateAfterDoctypePublicIdentifier(e);
                break;
              case g.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS:
                this._stateBetweenDoctypePublicAndSystemIdentifiers(e);
                break;
              case g.AFTER_DOCTYPE_SYSTEM_KEYWORD:
                this._stateAfterDoctypeSystemKeyword(e);
                break;
              case g.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER:
                this._stateBeforeDoctypeSystemIdentifier(e);
                break;
              case g.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED:
                this._stateDoctypeSystemIdentifierDoubleQuoted(e);
                break;
              case g.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED:
                this._stateDoctypeSystemIdentifierSingleQuoted(e);
                break;
              case g.AFTER_DOCTYPE_SYSTEM_IDENTIFIER:
                this._stateAfterDoctypeSystemIdentifier(e);
                break;
              case g.BOGUS_DOCTYPE:
                this._stateBogusDoctype(e);
                break;
              case g.CDATA_SECTION:
                this._stateCdataSection(e);
                break;
              case g.CDATA_SECTION_BRACKET:
                this._stateCdataSectionBracket(e);
                break;
              case g.CDATA_SECTION_END:
                this._stateCdataSectionEnd(e);
                break;
              case g.CHARACTER_REFERENCE:
                this._stateCharacterReference(e);
                break;
              case g.NAMED_CHARACTER_REFERENCE:
                this._stateNamedCharacterReference(e);
                break;
              case g.AMBIGUOUS_AMPERSAND:
                this._stateAmbiguousAmpersand(e);
                break;
              case g.NUMERIC_CHARACTER_REFERENCE:
                this._stateNumericCharacterReference(e);
                break;
              case g.HEXADEMICAL_CHARACTER_REFERENCE_START:
                this._stateHexademicalCharacterReferenceStart(e);
                break;
              case g.HEXADEMICAL_CHARACTER_REFERENCE:
                this._stateHexademicalCharacterReference(e);
                break;
              case g.DECIMAL_CHARACTER_REFERENCE:
                this._stateDecimalCharacterReference(e);
                break;
              case g.NUMERIC_CHARACTER_REFERENCE_END:
                this._stateNumericCharacterReferenceEnd(e);
                break;
              default:
                throw new Error("Unknown state");
            }
          }
          _stateData(e) {
            switch (e) {
              case f.CODE_POINTS.LESS_THAN_SIGN:
                this.state = g.TAG_OPEN;
                break;
              case f.CODE_POINTS.AMPERSAND:
                (this.returnState = g.DATA),
                  (this.state = g.CHARACTER_REFERENCE);
                break;
              case f.CODE_POINTS.NULL:
                this._err(m.ERR.unexpectedNullCharacter),
                  this._emitCodePoint(e);
                break;
              case f.CODE_POINTS.EOF:
                this._emitEOFToken();
                break;
              default:
                this._emitCodePoint(e);
            }
          }
          _stateRcdata(e) {
            switch (e) {
              case f.CODE_POINTS.AMPERSAND:
                (this.returnState = g.RCDATA),
                  (this.state = g.CHARACTER_REFERENCE);
                break;
              case f.CODE_POINTS.LESS_THAN_SIGN:
                this.state = g.RCDATA_LESS_THAN_SIGN;
                break;
              case f.CODE_POINTS.NULL:
                this._err(m.ERR.unexpectedNullCharacter),
                  this._emitChars(f.REPLACEMENT_CHARACTER);
                break;
              case f.CODE_POINTS.EOF:
                this._emitEOFToken();
                break;
              default:
                this._emitCodePoint(e);
            }
          }
          _stateRawtext(e) {
            switch (e) {
              case f.CODE_POINTS.LESS_THAN_SIGN:
                this.state = g.RAWTEXT_LESS_THAN_SIGN;
                break;
              case f.CODE_POINTS.NULL:
                this._err(m.ERR.unexpectedNullCharacter),
                  this._emitChars(f.REPLACEMENT_CHARACTER);
                break;
              case f.CODE_POINTS.EOF:
                this._emitEOFToken();
                break;
              default:
                this._emitCodePoint(e);
            }
          }
          _stateScriptData(e) {
            switch (e) {
              case f.CODE_POINTS.LESS_THAN_SIGN:
                this.state = g.SCRIPT_DATA_LESS_THAN_SIGN;
                break;
              case f.CODE_POINTS.NULL:
                this._err(m.ERR.unexpectedNullCharacter),
                  this._emitChars(f.REPLACEMENT_CHARACTER);
                break;
              case f.CODE_POINTS.EOF:
                this._emitEOFToken();
                break;
              default:
                this._emitCodePoint(e);
            }
          }
          _statePlaintext(e) {
            switch (e) {
              case f.CODE_POINTS.NULL:
                this._err(m.ERR.unexpectedNullCharacter),
                  this._emitChars(f.REPLACEMENT_CHARACTER);
                break;
              case f.CODE_POINTS.EOF:
                this._emitEOFToken();
                break;
              default:
                this._emitCodePoint(e);
            }
          }
          _stateTagOpen(e) {
            if (a(e))
              this._createStartTagToken(),
                (this.state = g.TAG_NAME),
                this._stateTagName(e);
            else
              switch (e) {
                case f.CODE_POINTS.EXCLAMATION_MARK:
                  this.state = g.MARKUP_DECLARATION_OPEN;
                  break;
                case f.CODE_POINTS.SOLIDUS:
                  this.state = g.END_TAG_OPEN;
                  break;
                case f.CODE_POINTS.QUESTION_MARK:
                  this._err(m.ERR.unexpectedQuestionMarkInsteadOfTagName),
                    this._createCommentToken(1),
                    (this.state = g.BOGUS_COMMENT),
                    this._stateBogusComment(e);
                  break;
                case f.CODE_POINTS.EOF:
                  this._err(m.ERR.eofBeforeTagName),
                    this._emitChars("<"),
                    this._emitEOFToken();
                  break;
                default:
                  this._err(m.ERR.invalidFirstCharacterOfTagName),
                    this._emitChars("<"),
                    (this.state = g.DATA),
                    this._stateData(e);
              }
          }
          _stateEndTagOpen(e) {
            if (a(e))
              this._createEndTagToken(),
                (this.state = g.TAG_NAME),
                this._stateTagName(e);
            else
              switch (e) {
                case f.CODE_POINTS.GREATER_THAN_SIGN:
                  this._err(m.ERR.missingEndTagName), (this.state = g.DATA);
                  break;
                case f.CODE_POINTS.EOF:
                  this._err(m.ERR.eofBeforeTagName),
                    this._emitChars("</"),
                    this._emitEOFToken();
                  break;
                default:
                  this._err(m.ERR.invalidFirstCharacterOfTagName),
                    this._createCommentToken(2),
                    (this.state = g.BOGUS_COMMENT),
                    this._stateBogusComment(e);
              }
          }
          _stateTagName(e) {
            const t = this.currentToken;
            switch (e) {
              case f.CODE_POINTS.SPACE:
              case f.CODE_POINTS.LINE_FEED:
              case f.CODE_POINTS.TABULATION:
              case f.CODE_POINTS.FORM_FEED:
                this.state = g.BEFORE_ATTRIBUTE_NAME;
                break;
              case f.CODE_POINTS.SOLIDUS:
                this.state = g.SELF_CLOSING_START_TAG;
                break;
              case f.CODE_POINTS.GREATER_THAN_SIGN:
                (this.state = g.DATA), this.emitCurrentTagToken();
                break;
              case f.CODE_POINTS.NULL:
                this._err(m.ERR.unexpectedNullCharacter),
                  (t.tagName += f.REPLACEMENT_CHARACTER);
                break;
              case f.CODE_POINTS.EOF:
                this._err(m.ERR.eofInTag), this._emitEOFToken();
                break;
              default:
                t.tagName += String.fromCodePoint(i(e) ? h(e) : e);
            }
          }
          _stateRcdataLessThanSign(e) {
            e === f.CODE_POINTS.SOLIDUS
              ? (this.state = g.RCDATA_END_TAG_OPEN)
              : (this._emitChars("<"),
                (this.state = g.RCDATA),
                this._stateRcdata(e));
          }
          _stateRcdataEndTagOpen(e) {
            a(e)
              ? ((this.state = g.RCDATA_END_TAG_NAME),
                this._stateRcdataEndTagName(e))
              : (this._emitChars("</"),
                (this.state = g.RCDATA),
                this._stateRcdata(e));
          }
          handleSpecialEndTag(e) {
            if (!this.preprocessor.startsWith(this.lastStartTagName, !1))
              return !this._ensureHibernation();
            this._createEndTagToken();
            const t = this.currentToken;
            t.tagName = this.lastStartTagName;
            const r = this.preprocessor.peek(this.lastStartTagName.length);
            switch (r) {
              case f.CODE_POINTS.SPACE:
              case f.CODE_POINTS.LINE_FEED:
              case f.CODE_POINTS.TABULATION:
              case f.CODE_POINTS.FORM_FEED:
                return (
                  this._advanceBy(this.lastStartTagName.length),
                  (this.state = g.BEFORE_ATTRIBUTE_NAME),
                  !1
                );
              case f.CODE_POINTS.SOLIDUS:
                return (
                  this._advanceBy(this.lastStartTagName.length),
                  (this.state = g.SELF_CLOSING_START_TAG),
                  !1
                );
              case f.CODE_POINTS.GREATER_THAN_SIGN:
                return (
                  this._advanceBy(this.lastStartTagName.length),
                  this.emitCurrentTagToken(),
                  (this.state = g.DATA),
                  !1
                );
              default:
                return !this._ensureHibernation();
            }
          }
          _stateRcdataEndTagName(e) {
            this.handleSpecialEndTag(e) &&
              (this._emitChars("</"),
              (this.state = g.RCDATA),
              this._stateRcdata(e));
          }
          _stateRawtextLessThanSign(e) {
            e === f.CODE_POINTS.SOLIDUS
              ? (this.state = g.RAWTEXT_END_TAG_OPEN)
              : (this._emitChars("<"),
                (this.state = g.RAWTEXT),
                this._stateRawtext(e));
          }
          _stateRawtextEndTagOpen(e) {
            a(e)
              ? ((this.state = g.RAWTEXT_END_TAG_NAME),
                this._stateRawtextEndTagName(e))
              : (this._emitChars("</"),
                (this.state = g.RAWTEXT),
                this._stateRawtext(e));
          }
          _stateRawtextEndTagName(e) {
            this.handleSpecialEndTag(e) &&
              (this._emitChars("</"),
              (this.state = g.RAWTEXT),
              this._stateRawtext(e));
          }
          _stateScriptDataLessThanSign(e) {
            switch (e) {
              case f.CODE_POINTS.SOLIDUS:
                this.state = g.SCRIPT_DATA_END_TAG_OPEN;
                break;
              case f.CODE_POINTS.EXCLAMATION_MARK:
                (this.state = g.SCRIPT_DATA_ESCAPE_START),
                  this._emitChars("<!");
                break;
              default:
                this._emitChars("<"),
                  (this.state = g.SCRIPT_DATA),
                  this._stateScriptData(e);
            }
          }
          _stateScriptDataEndTagOpen(e) {
            a(e)
              ? ((this.state = g.SCRIPT_DATA_END_TAG_NAME),
                this._stateScriptDataEndTagName(e))
              : (this._emitChars("</"),
                (this.state = g.SCRIPT_DATA),
                this._stateScriptData(e));
          }
          _stateScriptDataEndTagName(e) {
            this.handleSpecialEndTag(e) &&
              (this._emitChars("</"),
              (this.state = g.SCRIPT_DATA),
              this._stateScriptData(e));
          }
          _stateScriptDataEscapeStart(e) {
            e === f.CODE_POINTS.HYPHEN_MINUS
              ? ((this.state = g.SCRIPT_DATA_ESCAPE_START_DASH),
                this._emitChars("-"))
              : ((this.state = g.SCRIPT_DATA), this._stateScriptData(e));
          }
          _stateScriptDataEscapeStartDash(e) {
            e === f.CODE_POINTS.HYPHEN_MINUS
              ? ((this.state = g.SCRIPT_DATA_ESCAPED_DASH_DASH),
                this._emitChars("-"))
              : ((this.state = g.SCRIPT_DATA), this._stateScriptData(e));
          }
          _stateScriptDataEscaped(e) {
            switch (e) {
              case f.CODE_POINTS.HYPHEN_MINUS:
                (this.state = g.SCRIPT_DATA_ESCAPED_DASH), this._emitChars("-");
                break;
              case f.CODE_POINTS.LESS_THAN_SIGN:
                this.state = g.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
                break;
              case f.CODE_POINTS.NULL:
                this._err(m.ERR.unexpectedNullCharacter),
                  this._emitChars(f.REPLACEMENT_CHARACTER);
                break;
              case f.CODE_POINTS.EOF:
                this._err(m.ERR.eofInScriptHtmlCommentLikeText),
                  this._emitEOFToken();
                break;
              default:
                this._emitCodePoint(e);
            }
          }
          _stateScriptDataEscapedDash(e) {
            switch (e) {
              case f.CODE_POINTS.HYPHEN_MINUS:
                (this.state = g.SCRIPT_DATA_ESCAPED_DASH_DASH),
                  this._emitChars("-");
                break;
              case f.CODE_POINTS.LESS_THAN_SIGN:
                this.state = g.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
                break;
              case f.CODE_POINTS.NULL:
                this._err(m.ERR.unexpectedNullCharacter),
                  (this.state = g.SCRIPT_DATA_ESCAPED),
                  this._emitChars(f.REPLACEMENT_CHARACTER);
                break;
              case f.CODE_POINTS.EOF:
                this._err(m.ERR.eofInScriptHtmlCommentLikeText),
                  this._emitEOFToken();
                break;
              default:
                (this.state = g.SCRIPT_DATA_ESCAPED), this._emitCodePoint(e);
            }
          }
          _stateScriptDataEscapedDashDash(e) {
            switch (e) {
              case f.CODE_POINTS.HYPHEN_MINUS:
                this._emitChars("-");
                break;
              case f.CODE_POINTS.LESS_THAN_SIGN:
                this.state = g.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
                break;
              case f.CODE_POINTS.GREATER_THAN_SIGN:
                (this.state = g.SCRIPT_DATA), this._emitChars(">");
                break;
              case f.CODE_POINTS.NULL:
                this._err(m.ERR.unexpectedNullCharacter),
                  (this.state = g.SCRIPT_DATA_ESCAPED),
                  this._emitChars(f.REPLACEMENT_CHARACTER);
                break;
              case f.CODE_POINTS.EOF:
                this._err(m.ERR.eofInScriptHtmlCommentLikeText),
                  this._emitEOFToken();
                break;
              default:
                (this.state = g.SCRIPT_DATA_ESCAPED), this._emitCodePoint(e);
            }
          }
          _stateScriptDataEscapedLessThanSign(e) {
            e === f.CODE_POINTS.SOLIDUS
              ? (this.state = g.SCRIPT_DATA_ESCAPED_END_TAG_OPEN)
              : a(e)
              ? (this._emitChars("<"),
                (this.state = g.SCRIPT_DATA_DOUBLE_ESCAPE_START),
                this._stateScriptDataDoubleEscapeStart(e))
              : (this._emitChars("<"),
                (this.state = g.SCRIPT_DATA_ESCAPED),
                this._stateScriptDataEscaped(e));
          }
          _stateScriptDataEscapedEndTagOpen(e) {
            a(e)
              ? ((this.state = g.SCRIPT_DATA_ESCAPED_END_TAG_NAME),
                this._stateScriptDataEscapedEndTagName(e))
              : (this._emitChars("</"),
                (this.state = g.SCRIPT_DATA_ESCAPED),
                this._stateScriptDataEscaped(e));
          }
          _stateScriptDataEscapedEndTagName(e) {
            this.handleSpecialEndTag(e) &&
              (this._emitChars("</"),
              (this.state = g.SCRIPT_DATA_ESCAPED),
              this._stateScriptDataEscaped(e));
          }
          _stateScriptDataDoubleEscapeStart(e) {
            if (
              this.preprocessor.startsWith(f.SEQUENCES.SCRIPT, !1) &&
              E(this.preprocessor.peek(f.SEQUENCES.SCRIPT.length))
            ) {
              this._emitCodePoint(e);
              for (let e = 0; e < f.SEQUENCES.SCRIPT.length; e++)
                this._emitCodePoint(this._consume());
              this.state = g.SCRIPT_DATA_DOUBLE_ESCAPED;
            } else
              this._ensureHibernation() ||
                ((this.state = g.SCRIPT_DATA_ESCAPED),
                this._stateScriptDataEscaped(e));
          }
          _stateScriptDataDoubleEscaped(e) {
            switch (e) {
              case f.CODE_POINTS.HYPHEN_MINUS:
                (this.state = g.SCRIPT_DATA_DOUBLE_ESCAPED_DASH),
                  this._emitChars("-");
                break;
              case f.CODE_POINTS.LESS_THAN_SIGN:
                (this.state = g.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN),
                  this._emitChars("<");
                break;
              case f.CODE_POINTS.NULL:
                this._err(m.ERR.unexpectedNullCharacter),
                  this._emitChars(f.REPLACEMENT_CHARACTER);
                break;
              case f.CODE_POINTS.EOF:
                this._err(m.ERR.eofInScriptHtmlCommentLikeText),
                  this._emitEOFToken();
                break;
              default:
                this._emitCodePoint(e);
            }
          }
          _stateScriptDataDoubleEscapedDash(e) {
            switch (e) {
              case f.CODE_POINTS.HYPHEN_MINUS:
                (this.state = g.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH),
                  this._emitChars("-");
                break;
              case f.CODE_POINTS.LESS_THAN_SIGN:
                (this.state = g.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN),
                  this._emitChars("<");
                break;
              case f.CODE_POINTS.NULL:
                this._err(m.ERR.unexpectedNullCharacter),
                  (this.state = g.SCRIPT_DATA_DOUBLE_ESCAPED),
                  this._emitChars(f.REPLACEMENT_CHARACTER);
                break;
              case f.CODE_POINTS.EOF:
                this._err(m.ERR.eofInScriptHtmlCommentLikeText),
                  this._emitEOFToken();
                break;
              default:
                (this.state = g.SCRIPT_DATA_DOUBLE_ESCAPED),
                  this._emitCodePoint(e);
            }
          }
          _stateScriptDataDoubleEscapedDashDash(e) {
            switch (e) {
              case f.CODE_POINTS.HYPHEN_MINUS:
                this._emitChars("-");
                break;
              case f.CODE_POINTS.LESS_THAN_SIGN:
                (this.state = g.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN),
                  this._emitChars("<");
                break;
              case f.CODE_POINTS.GREATER_THAN_SIGN:
                (this.state = g.SCRIPT_DATA), this._emitChars(">");
                break;
              case f.CODE_POINTS.NULL:
                this._err(m.ERR.unexpectedNullCharacter),
                  (this.state = g.SCRIPT_DATA_DOUBLE_ESCAPED),
                  this._emitChars(f.REPLACEMENT_CHARACTER);
                break;
              case f.CODE_POINTS.EOF:
                this._err(m.ERR.eofInScriptHtmlCommentLikeText),
                  this._emitEOFToken();
                break;
              default:
                (this.state = g.SCRIPT_DATA_DOUBLE_ESCAPED),
                  this._emitCodePoint(e);
            }
          }
          _stateScriptDataDoubleEscapedLessThanSign(e) {
            e === f.CODE_POINTS.SOLIDUS
              ? ((this.state = g.SCRIPT_DATA_DOUBLE_ESCAPE_END),
                this._emitChars("/"))
              : ((this.state = g.SCRIPT_DATA_DOUBLE_ESCAPED),
                this._stateScriptDataDoubleEscaped(e));
          }
          _stateScriptDataDoubleEscapeEnd(e) {
            if (
              this.preprocessor.startsWith(f.SEQUENCES.SCRIPT, !1) &&
              E(this.preprocessor.peek(f.SEQUENCES.SCRIPT.length))
            ) {
              this._emitCodePoint(e);
              for (let e = 0; e < f.SEQUENCES.SCRIPT.length; e++)
                this._emitCodePoint(this._consume());
              this.state = g.SCRIPT_DATA_ESCAPED;
            } else
              this._ensureHibernation() ||
                ((this.state = g.SCRIPT_DATA_DOUBLE_ESCAPED),
                this._stateScriptDataDoubleEscaped(e));
          }
          _stateBeforeAttributeName(e) {
            switch (e) {
              case f.CODE_POINTS.SPACE:
              case f.CODE_POINTS.LINE_FEED:
              case f.CODE_POINTS.TABULATION:
              case f.CODE_POINTS.FORM_FEED:
                break;
              case f.CODE_POINTS.SOLIDUS:
              case f.CODE_POINTS.GREATER_THAN_SIGN:
              case f.CODE_POINTS.EOF:
                (this.state = g.AFTER_ATTRIBUTE_NAME),
                  this._stateAfterAttributeName(e);
                break;
              case f.CODE_POINTS.EQUALS_SIGN:
                this._err(m.ERR.unexpectedEqualsSignBeforeAttributeName),
                  this._createAttr("="),
                  (this.state = g.ATTRIBUTE_NAME);
                break;
              default:
                this._createAttr(""),
                  (this.state = g.ATTRIBUTE_NAME),
                  this._stateAttributeName(e);
            }
          }
          _stateAttributeName(e) {
            switch (e) {
              case f.CODE_POINTS.SPACE:
              case f.CODE_POINTS.LINE_FEED:
              case f.CODE_POINTS.TABULATION:
              case f.CODE_POINTS.FORM_FEED:
              case f.CODE_POINTS.SOLIDUS:
              case f.CODE_POINTS.GREATER_THAN_SIGN:
              case f.CODE_POINTS.EOF:
                this._leaveAttrName(),
                  (this.state = g.AFTER_ATTRIBUTE_NAME),
                  this._stateAfterAttributeName(e);
                break;
              case f.CODE_POINTS.EQUALS_SIGN:
                this._leaveAttrName(), (this.state = g.BEFORE_ATTRIBUTE_VALUE);
                break;
              case f.CODE_POINTS.QUOTATION_MARK:
              case f.CODE_POINTS.APOSTROPHE:
              case f.CODE_POINTS.LESS_THAN_SIGN:
                this._err(m.ERR.unexpectedCharacterInAttributeName),
                  (this.currentAttr.name += String.fromCodePoint(e));
                break;
              case f.CODE_POINTS.NULL:
                this._err(m.ERR.unexpectedNullCharacter),
                  (this.currentAttr.name += f.REPLACEMENT_CHARACTER);
                break;
              default:
                this.currentAttr.name += String.fromCodePoint(i(e) ? h(e) : e);
            }
          }
          _stateAfterAttributeName(e) {
            switch (e) {
              case f.CODE_POINTS.SPACE:
              case f.CODE_POINTS.LINE_FEED:
              case f.CODE_POINTS.TABULATION:
              case f.CODE_POINTS.FORM_FEED:
                break;
              case f.CODE_POINTS.SOLIDUS:
                this.state = g.SELF_CLOSING_START_TAG;
                break;
              case f.CODE_POINTS.EQUALS_SIGN:
                this.state = g.BEFORE_ATTRIBUTE_VALUE;
                break;
              case f.CODE_POINTS.GREATER_THAN_SIGN:
                (this.state = g.DATA), this.emitCurrentTagToken();
                break;
              case f.CODE_POINTS.EOF:
                this._err(m.ERR.eofInTag), this._emitEOFToken();
                break;
              default:
                this._createAttr(""),
                  (this.state = g.ATTRIBUTE_NAME),
                  this._stateAttributeName(e);
            }
          }
          _stateBeforeAttributeValue(e) {
            switch (e) {
              case f.CODE_POINTS.SPACE:
              case f.CODE_POINTS.LINE_FEED:
              case f.CODE_POINTS.TABULATION:
              case f.CODE_POINTS.FORM_FEED:
                break;
              case f.CODE_POINTS.QUOTATION_MARK:
                this.state = g.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
                break;
              case f.CODE_POINTS.APOSTROPHE:
                this.state = g.ATTRIBUTE_VALUE_SINGLE_QUOTED;
                break;
              case f.CODE_POINTS.GREATER_THAN_SIGN:
                this._err(m.ERR.missingAttributeValue),
                  (this.state = g.DATA),
                  this.emitCurrentTagToken();
                break;
              default:
                (this.state = g.ATTRIBUTE_VALUE_UNQUOTED),
                  this._stateAttributeValueUnquoted(e);
            }
          }
          _stateAttributeValueDoubleQuoted(e) {
            switch (e) {
              case f.CODE_POINTS.QUOTATION_MARK:
                this.state = g.AFTER_ATTRIBUTE_VALUE_QUOTED;
                break;
              case f.CODE_POINTS.AMPERSAND:
                (this.returnState = g.ATTRIBUTE_VALUE_DOUBLE_QUOTED),
                  (this.state = g.CHARACTER_REFERENCE);
                break;
              case f.CODE_POINTS.NULL:
                this._err(m.ERR.unexpectedNullCharacter),
                  (this.currentAttr.value += f.REPLACEMENT_CHARACTER);
                break;
              case f.CODE_POINTS.EOF:
                this._err(m.ERR.eofInTag), this._emitEOFToken();
                break;
              default:
                this.currentAttr.value += String.fromCodePoint(e);
            }
          }
          _stateAttributeValueSingleQuoted(e) {
            switch (e) {
              case f.CODE_POINTS.APOSTROPHE:
                this.state = g.AFTER_ATTRIBUTE_VALUE_QUOTED;
                break;
              case f.CODE_POINTS.AMPERSAND:
                (this.returnState = g.ATTRIBUTE_VALUE_SINGLE_QUOTED),
                  (this.state = g.CHARACTER_REFERENCE);
                break;
              case f.CODE_POINTS.NULL:
                this._err(m.ERR.unexpectedNullCharacter),
                  (this.currentAttr.value += f.REPLACEMENT_CHARACTER);
                break;
              case f.CODE_POINTS.EOF:
                this._err(m.ERR.eofInTag), this._emitEOFToken();
                break;
              default:
                this.currentAttr.value += String.fromCodePoint(e);
            }
          }
          _stateAttributeValueUnquoted(e) {
            switch (e) {
              case f.CODE_POINTS.SPACE:
              case f.CODE_POINTS.LINE_FEED:
              case f.CODE_POINTS.TABULATION:
              case f.CODE_POINTS.FORM_FEED:
                this._leaveAttrValue(), (this.state = g.BEFORE_ATTRIBUTE_NAME);
                break;
              case f.CODE_POINTS.AMPERSAND:
                (this.returnState = g.ATTRIBUTE_VALUE_UNQUOTED),
                  (this.state = g.CHARACTER_REFERENCE);
                break;
              case f.CODE_POINTS.GREATER_THAN_SIGN:
                this._leaveAttrValue(),
                  (this.state = g.DATA),
                  this.emitCurrentTagToken();
                break;
              case f.CODE_POINTS.NULL:
                this._err(m.ERR.unexpectedNullCharacter),
                  (this.currentAttr.value += f.REPLACEMENT_CHARACTER);
                break;
              case f.CODE_POINTS.QUOTATION_MARK:
              case f.CODE_POINTS.APOSTROPHE:
              case f.CODE_POINTS.LESS_THAN_SIGN:
              case f.CODE_POINTS.EQUALS_SIGN:
              case f.CODE_POINTS.GRAVE_ACCENT:
                this._err(m.ERR.unexpectedCharacterInUnquotedAttributeValue),
                  (this.currentAttr.value += String.fromCodePoint(e));
                break;
              case f.CODE_POINTS.EOF:
                this._err(m.ERR.eofInTag), this._emitEOFToken();
                break;
              default:
                this.currentAttr.value += String.fromCodePoint(e);
            }
          }
          _stateAfterAttributeValueQuoted(e) {
            switch (e) {
              case f.CODE_POINTS.SPACE:
              case f.CODE_POINTS.LINE_FEED:
              case f.CODE_POINTS.TABULATION:
              case f.CODE_POINTS.FORM_FEED:
                this._leaveAttrValue(), (this.state = g.BEFORE_ATTRIBUTE_NAME);
                break;
              case f.CODE_POINTS.SOLIDUS:
                this._leaveAttrValue(), (this.state = g.SELF_CLOSING_START_TAG);
                break;
              case f.CODE_POINTS.GREATER_THAN_SIGN:
                this._leaveAttrValue(),
                  (this.state = g.DATA),
                  this.emitCurrentTagToken();
                break;
              case f.CODE_POINTS.EOF:
                this._err(m.ERR.eofInTag), this._emitEOFToken();
                break;
              default:
                this._err(m.ERR.missingWhitespaceBetweenAttributes),
                  (this.state = g.BEFORE_ATTRIBUTE_NAME),
                  this._stateBeforeAttributeName(e);
            }
          }
          _stateSelfClosingStartTag(e) {
            switch (e) {
              case f.CODE_POINTS.GREATER_THAN_SIGN: {
                const e = this.currentToken;
                (e.selfClosing = !0),
                  (this.state = g.DATA),
                  this.emitCurrentTagToken();
                break;
              }
              case f.CODE_POINTS.EOF:
                this._err(m.ERR.eofInTag), this._emitEOFToken();
                break;
              default:
                this._err(m.ERR.unexpectedSolidusInTag),
                  (this.state = g.BEFORE_ATTRIBUTE_NAME),
                  this._stateBeforeAttributeName(e);
            }
          }
          _stateBogusComment(e) {
            const t = this.currentToken;
            switch (e) {
              case f.CODE_POINTS.GREATER_THAN_SIGN:
                (this.state = g.DATA), this.emitCurrentComment(t);
                break;
              case f.CODE_POINTS.EOF:
                this.emitCurrentComment(t), this._emitEOFToken();
                break;
              case f.CODE_POINTS.NULL:
                this._err(m.ERR.unexpectedNullCharacter),
                  (t.data += f.REPLACEMENT_CHARACTER);
                break;
              default:
                t.data += String.fromCodePoint(e);
            }
          }
          _stateMarkupDeclarationOpen(e) {
            this._consumeSequenceIfMatch(f.SEQUENCES.DASH_DASH, !0)
              ? (this._createCommentToken(f.SEQUENCES.DASH_DASH.length + 1),
                (this.state = g.COMMENT_START))
              : this._consumeSequenceIfMatch(f.SEQUENCES.DOCTYPE, !1)
              ? ((this.currentLocation = this.getCurrentLocation(
                  f.SEQUENCES.DOCTYPE.length + 1
                )),
                (this.state = g.DOCTYPE))
              : this._consumeSequenceIfMatch(f.SEQUENCES.CDATA_START, !0)
              ? this.inForeignNode
                ? (this.state = g.CDATA_SECTION)
                : (this._err(m.ERR.cdataInHtmlContent),
                  this._createCommentToken(f.SEQUENCES.CDATA_START.length + 1),
                  (this.currentToken.data = "[CDATA["),
                  (this.state = g.BOGUS_COMMENT))
              : this._ensureHibernation() ||
                (this._err(m.ERR.incorrectlyOpenedComment),
                this._createCommentToken(2),
                (this.state = g.BOGUS_COMMENT),
                this._stateBogusComment(e));
          }
          _stateCommentStart(e) {
            switch (e) {
              case f.CODE_POINTS.HYPHEN_MINUS:
                this.state = g.COMMENT_START_DASH;
                break;
              case f.CODE_POINTS.GREATER_THAN_SIGN: {
                this._err(m.ERR.abruptClosingOfEmptyComment),
                  (this.state = g.DATA);
                const e = this.currentToken;
                this.emitCurrentComment(e);
                break;
              }
              default:
                (this.state = g.COMMENT), this._stateComment(e);
            }
          }
          _stateCommentStartDash(e) {
            const t = this.currentToken;
            switch (e) {
              case f.CODE_POINTS.HYPHEN_MINUS:
                this.state = g.COMMENT_END;
                break;
              case f.CODE_POINTS.GREATER_THAN_SIGN:
                this._err(m.ERR.abruptClosingOfEmptyComment),
                  (this.state = g.DATA),
                  this.emitCurrentComment(t);
                break;
              case f.CODE_POINTS.EOF:
                this._err(m.ERR.eofInComment),
                  this.emitCurrentComment(t),
                  this._emitEOFToken();
                break;
              default:
                (t.data += "-"),
                  (this.state = g.COMMENT),
                  this._stateComment(e);
            }
          }
          _stateComment(e) {
            const t = this.currentToken;
            switch (e) {
              case f.CODE_POINTS.HYPHEN_MINUS:
                this.state = g.COMMENT_END_DASH;
                break;
              case f.CODE_POINTS.LESS_THAN_SIGN:
                (t.data += "<"), (this.state = g.COMMENT_LESS_THAN_SIGN);
                break;
              case f.CODE_POINTS.NULL:
                this._err(m.ERR.unexpectedNullCharacter),
                  (t.data += f.REPLACEMENT_CHARACTER);
                break;
              case f.CODE_POINTS.EOF:
                this._err(m.ERR.eofInComment),
                  this.emitCurrentComment(t),
                  this._emitEOFToken();
                break;
              default:
                t.data += String.fromCodePoint(e);
            }
          }
          _stateCommentLessThanSign(e) {
            const t = this.currentToken;
            switch (e) {
              case f.CODE_POINTS.EXCLAMATION_MARK:
                (t.data += "!"), (this.state = g.COMMENT_LESS_THAN_SIGN_BANG);
                break;
              case f.CODE_POINTS.LESS_THAN_SIGN:
                t.data += "<";
                break;
              default:
                (this.state = g.COMMENT), this._stateComment(e);
            }
          }
          _stateCommentLessThanSignBang(e) {
            e === f.CODE_POINTS.HYPHEN_MINUS
              ? (this.state = g.COMMENT_LESS_THAN_SIGN_BANG_DASH)
              : ((this.state = g.COMMENT), this._stateComment(e));
          }
          _stateCommentLessThanSignBangDash(e) {
            e === f.CODE_POINTS.HYPHEN_MINUS
              ? (this.state = g.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH)
              : ((this.state = g.COMMENT_END_DASH),
                this._stateCommentEndDash(e));
          }
          _stateCommentLessThanSignBangDashDash(e) {
            e !== f.CODE_POINTS.GREATER_THAN_SIGN &&
              e !== f.CODE_POINTS.EOF &&
              this._err(m.ERR.nestedComment),
              (this.state = g.COMMENT_END),
              this._stateCommentEnd(e);
          }
          _stateCommentEndDash(e) {
            const t = this.currentToken;
            switch (e) {
              case f.CODE_POINTS.HYPHEN_MINUS:
                this.state = g.COMMENT_END;
                break;
              case f.CODE_POINTS.EOF:
                this._err(m.ERR.eofInComment),
                  this.emitCurrentComment(t),
                  this._emitEOFToken();
                break;
              default:
                (t.data += "-"),
                  (this.state = g.COMMENT),
                  this._stateComment(e);
            }
          }
          _stateCommentEnd(e) {
            const t = this.currentToken;
            switch (e) {
              case f.CODE_POINTS.GREATER_THAN_SIGN:
                (this.state = g.DATA), this.emitCurrentComment(t);
                break;
              case f.CODE_POINTS.EXCLAMATION_MARK:
                this.state = g.COMMENT_END_BANG;
                break;
              case f.CODE_POINTS.HYPHEN_MINUS:
                t.data += "-";
                break;
              case f.CODE_POINTS.EOF:
                this._err(m.ERR.eofInComment),
                  this.emitCurrentComment(t),
                  this._emitEOFToken();
                break;
              default:
                (t.data += "--"),
                  (this.state = g.COMMENT),
                  this._stateComment(e);
            }
          }
          _stateCommentEndBang(e) {
            const t = this.currentToken;
            switch (e) {
              case f.CODE_POINTS.HYPHEN_MINUS:
                (t.data += "--!"), (this.state = g.COMMENT_END_DASH);
                break;
              case f.CODE_POINTS.GREATER_THAN_SIGN:
                this._err(m.ERR.incorrectlyClosedComment),
                  (this.state = g.DATA),
                  this.emitCurrentComment(t);
                break;
              case f.CODE_POINTS.EOF:
                this._err(m.ERR.eofInComment),
                  this.emitCurrentComment(t),
                  this._emitEOFToken();
                break;
              default:
                (t.data += "--!"),
                  (this.state = g.COMMENT),
                  this._stateComment(e);
            }
          }
          _stateDoctype(e) {
            switch (e) {
              case f.CODE_POINTS.SPACE:
              case f.CODE_POINTS.LINE_FEED:
              case f.CODE_POINTS.TABULATION:
              case f.CODE_POINTS.FORM_FEED:
                this.state = g.BEFORE_DOCTYPE_NAME;
                break;
              case f.CODE_POINTS.GREATER_THAN_SIGN:
                (this.state = g.BEFORE_DOCTYPE_NAME),
                  this._stateBeforeDoctypeName(e);
                break;
              case f.CODE_POINTS.EOF: {
                this._err(m.ERR.eofInDoctype), this._createDoctypeToken(null);
                const e = this.currentToken;
                (e.forceQuirks = !0),
                  this.emitCurrentDoctype(e),
                  this._emitEOFToken();
                break;
              }
              default:
                this._err(m.ERR.missingWhitespaceBeforeDoctypeName),
                  (this.state = g.BEFORE_DOCTYPE_NAME),
                  this._stateBeforeDoctypeName(e);
            }
          }
          _stateBeforeDoctypeName(e) {
            if (i(e))
              this._createDoctypeToken(String.fromCharCode(h(e))),
                (this.state = g.DOCTYPE_NAME);
            else
              switch (e) {
                case f.CODE_POINTS.SPACE:
                case f.CODE_POINTS.LINE_FEED:
                case f.CODE_POINTS.TABULATION:
                case f.CODE_POINTS.FORM_FEED:
                  break;
                case f.CODE_POINTS.NULL:
                  this._err(m.ERR.unexpectedNullCharacter),
                    this._createDoctypeToken(f.REPLACEMENT_CHARACTER),
                    (this.state = g.DOCTYPE_NAME);
                  break;
                case f.CODE_POINTS.GREATER_THAN_SIGN: {
                  this._err(m.ERR.missingDoctypeName),
                    this._createDoctypeToken(null);
                  const e = this.currentToken;
                  (e.forceQuirks = !0),
                    this.emitCurrentDoctype(e),
                    (this.state = g.DATA);
                  break;
                }
                case f.CODE_POINTS.EOF: {
                  this._err(m.ERR.eofInDoctype), this._createDoctypeToken(null);
                  const e = this.currentToken;
                  (e.forceQuirks = !0),
                    this.emitCurrentDoctype(e),
                    this._emitEOFToken();
                  break;
                }
                default:
                  this._createDoctypeToken(String.fromCodePoint(e)),
                    (this.state = g.DOCTYPE_NAME);
              }
          }
          _stateDoctypeName(e) {
            const t = this.currentToken;
            switch (e) {
              case f.CODE_POINTS.SPACE:
              case f.CODE_POINTS.LINE_FEED:
              case f.CODE_POINTS.TABULATION:
              case f.CODE_POINTS.FORM_FEED:
                this.state = g.AFTER_DOCTYPE_NAME;
                break;
              case f.CODE_POINTS.GREATER_THAN_SIGN:
                (this.state = g.DATA), this.emitCurrentDoctype(t);
                break;
              case f.CODE_POINTS.NULL:
                this._err(m.ERR.unexpectedNullCharacter),
                  (t.name += f.REPLACEMENT_CHARACTER);
                break;
              case f.CODE_POINTS.EOF:
                this._err(m.ERR.eofInDoctype),
                  (t.forceQuirks = !0),
                  this.emitCurrentDoctype(t),
                  this._emitEOFToken();
                break;
              default:
                t.name += String.fromCodePoint(i(e) ? h(e) : e);
            }
          }
          _stateAfterDoctypeName(e) {
            const t = this.currentToken;
            switch (e) {
              case f.CODE_POINTS.SPACE:
              case f.CODE_POINTS.LINE_FEED:
              case f.CODE_POINTS.TABULATION:
              case f.CODE_POINTS.FORM_FEED:
                break;
              case f.CODE_POINTS.GREATER_THAN_SIGN:
                (this.state = g.DATA), this.emitCurrentDoctype(t);
                break;
              case f.CODE_POINTS.EOF:
                this._err(m.ERR.eofInDoctype),
                  (t.forceQuirks = !0),
                  this.emitCurrentDoctype(t),
                  this._emitEOFToken();
                break;
              default:
                this._consumeSequenceIfMatch(f.SEQUENCES.PUBLIC, !1)
                  ? (this.state = g.AFTER_DOCTYPE_PUBLIC_KEYWORD)
                  : this._consumeSequenceIfMatch(f.SEQUENCES.SYSTEM, !1)
                  ? (this.state = g.AFTER_DOCTYPE_SYSTEM_KEYWORD)
                  : this._ensureHibernation() ||
                    (this._err(m.ERR.invalidCharacterSequenceAfterDoctypeName),
                    (t.forceQuirks = !0),
                    (this.state = g.BOGUS_DOCTYPE),
                    this._stateBogusDoctype(e));
            }
          }
          _stateAfterDoctypePublicKeyword(e) {
            const t = this.currentToken;
            switch (e) {
              case f.CODE_POINTS.SPACE:
              case f.CODE_POINTS.LINE_FEED:
              case f.CODE_POINTS.TABULATION:
              case f.CODE_POINTS.FORM_FEED:
                this.state = g.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;
                break;
              case f.CODE_POINTS.QUOTATION_MARK:
                this._err(m.ERR.missingWhitespaceAfterDoctypePublicKeyword),
                  (t.publicId = ""),
                  (this.state = g.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED);
                break;
              case f.CODE_POINTS.APOSTROPHE:
                this._err(m.ERR.missingWhitespaceAfterDoctypePublicKeyword),
                  (t.publicId = ""),
                  (this.state = g.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED);
                break;
              case f.CODE_POINTS.GREATER_THAN_SIGN:
                this._err(m.ERR.missingDoctypePublicIdentifier),
                  (t.forceQuirks = !0),
                  (this.state = g.DATA),
                  this.emitCurrentDoctype(t);
                break;
              case f.CODE_POINTS.EOF:
                this._err(m.ERR.eofInDoctype),
                  (t.forceQuirks = !0),
                  this.emitCurrentDoctype(t),
                  this._emitEOFToken();
                break;
              default:
                this._err(m.ERR.missingQuoteBeforeDoctypePublicIdentifier),
                  (t.forceQuirks = !0),
                  (this.state = g.BOGUS_DOCTYPE),
                  this._stateBogusDoctype(e);
            }
          }
          _stateBeforeDoctypePublicIdentifier(e) {
            const t = this.currentToken;
            switch (e) {
              case f.CODE_POINTS.SPACE:
              case f.CODE_POINTS.LINE_FEED:
              case f.CODE_POINTS.TABULATION:
              case f.CODE_POINTS.FORM_FEED:
                break;
              case f.CODE_POINTS.QUOTATION_MARK:
                (t.publicId = ""),
                  (this.state = g.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED);
                break;
              case f.CODE_POINTS.APOSTROPHE:
                (t.publicId = ""),
                  (this.state = g.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED);
                break;
              case f.CODE_POINTS.GREATER_THAN_SIGN:
                this._err(m.ERR.missingDoctypePublicIdentifier),
                  (t.forceQuirks = !0),
                  (this.state = g.DATA),
                  this.emitCurrentDoctype(t);
                break;
              case f.CODE_POINTS.EOF:
                this._err(m.ERR.eofInDoctype),
                  (t.forceQuirks = !0),
                  this.emitCurrentDoctype(t),
                  this._emitEOFToken();
                break;
              default:
                this._err(m.ERR.missingQuoteBeforeDoctypePublicIdentifier),
                  (t.forceQuirks = !0),
                  (this.state = g.BOGUS_DOCTYPE),
                  this._stateBogusDoctype(e);
            }
          }
          _stateDoctypePublicIdentifierDoubleQuoted(e) {
            const t = this.currentToken;
            switch (e) {
              case f.CODE_POINTS.QUOTATION_MARK:
                this.state = g.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
                break;
              case f.CODE_POINTS.NULL:
                this._err(m.ERR.unexpectedNullCharacter),
                  (t.publicId += f.REPLACEMENT_CHARACTER);
                break;
              case f.CODE_POINTS.GREATER_THAN_SIGN:
                this._err(m.ERR.abruptDoctypePublicIdentifier),
                  (t.forceQuirks = !0),
                  this.emitCurrentDoctype(t),
                  (this.state = g.DATA);
                break;
              case f.CODE_POINTS.EOF:
                this._err(m.ERR.eofInDoctype),
                  (t.forceQuirks = !0),
                  this.emitCurrentDoctype(t),
                  this._emitEOFToken();
                break;
              default:
                t.publicId += String.fromCodePoint(e);
            }
          }
          _stateDoctypePublicIdentifierSingleQuoted(e) {
            const t = this.currentToken;
            switch (e) {
              case f.CODE_POINTS.APOSTROPHE:
                this.state = g.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
                break;
              case f.CODE_POINTS.NULL:
                this._err(m.ERR.unexpectedNullCharacter),
                  (t.publicId += f.REPLACEMENT_CHARACTER);
                break;
              case f.CODE_POINTS.GREATER_THAN_SIGN:
                this._err(m.ERR.abruptDoctypePublicIdentifier),
                  (t.forceQuirks = !0),
                  this.emitCurrentDoctype(t),
                  (this.state = g.DATA);
                break;
              case f.CODE_POINTS.EOF:
                this._err(m.ERR.eofInDoctype),
                  (t.forceQuirks = !0),
                  this.emitCurrentDoctype(t),
                  this._emitEOFToken();
                break;
              default:
                t.publicId += String.fromCodePoint(e);
            }
          }
          _stateAfterDoctypePublicIdentifier(e) {
            const t = this.currentToken;
            switch (e) {
              case f.CODE_POINTS.SPACE:
              case f.CODE_POINTS.LINE_FEED:
              case f.CODE_POINTS.TABULATION:
              case f.CODE_POINTS.FORM_FEED:
                this.state = g.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;
                break;
              case f.CODE_POINTS.GREATER_THAN_SIGN:
                (this.state = g.DATA), this.emitCurrentDoctype(t);
                break;
              case f.CODE_POINTS.QUOTATION_MARK:
                this._err(
                  m.ERR
                    .missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers
                ),
                  (t.systemId = ""),
                  (this.state = g.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED);
                break;
              case f.CODE_POINTS.APOSTROPHE:
                this._err(
                  m.ERR
                    .missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers
                ),
                  (t.systemId = ""),
                  (this.state = g.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED);
                break;
              case f.CODE_POINTS.EOF:
                this._err(m.ERR.eofInDoctype),
                  (t.forceQuirks = !0),
                  this.emitCurrentDoctype(t),
                  this._emitEOFToken();
                break;
              default:
                this._err(m.ERR.missingQuoteBeforeDoctypeSystemIdentifier),
                  (t.forceQuirks = !0),
                  (this.state = g.BOGUS_DOCTYPE),
                  this._stateBogusDoctype(e);
            }
          }
          _stateBetweenDoctypePublicAndSystemIdentifiers(e) {
            const t = this.currentToken;
            switch (e) {
              case f.CODE_POINTS.SPACE:
              case f.CODE_POINTS.LINE_FEED:
              case f.CODE_POINTS.TABULATION:
              case f.CODE_POINTS.FORM_FEED:
                break;
              case f.CODE_POINTS.GREATER_THAN_SIGN:
                this.emitCurrentDoctype(t), (this.state = g.DATA);
                break;
              case f.CODE_POINTS.QUOTATION_MARK:
                (t.systemId = ""),
                  (this.state = g.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED);
                break;
              case f.CODE_POINTS.APOSTROPHE:
                (t.systemId = ""),
                  (this.state = g.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED);
                break;
              case f.CODE_POINTS.EOF:
                this._err(m.ERR.eofInDoctype),
                  (t.forceQuirks = !0),
                  this.emitCurrentDoctype(t),
                  this._emitEOFToken();
                break;
              default:
                this._err(m.ERR.missingQuoteBeforeDoctypeSystemIdentifier),
                  (t.forceQuirks = !0),
                  (this.state = g.BOGUS_DOCTYPE),
                  this._stateBogusDoctype(e);
            }
          }
          _stateAfterDoctypeSystemKeyword(e) {
            const t = this.currentToken;
            switch (e) {
              case f.CODE_POINTS.SPACE:
              case f.CODE_POINTS.LINE_FEED:
              case f.CODE_POINTS.TABULATION:
              case f.CODE_POINTS.FORM_FEED:
                this.state = g.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;
                break;
              case f.CODE_POINTS.QUOTATION_MARK:
                this._err(m.ERR.missingWhitespaceAfterDoctypeSystemKeyword),
                  (t.systemId = ""),
                  (this.state = g.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED);
                break;
              case f.CODE_POINTS.APOSTROPHE:
                this._err(m.ERR.missingWhitespaceAfterDoctypeSystemKeyword),
                  (t.systemId = ""),
                  (this.state = g.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED);
                break;
              case f.CODE_POINTS.GREATER_THAN_SIGN:
                this._err(m.ERR.missingDoctypeSystemIdentifier),
                  (t.forceQuirks = !0),
                  (this.state = g.DATA),
                  this.emitCurrentDoctype(t);
                break;
              case f.CODE_POINTS.EOF:
                this._err(m.ERR.eofInDoctype),
                  (t.forceQuirks = !0),
                  this.emitCurrentDoctype(t),
                  this._emitEOFToken();
                break;
              default:
                this._err(m.ERR.missingQuoteBeforeDoctypeSystemIdentifier),
                  (t.forceQuirks = !0),
                  (this.state = g.BOGUS_DOCTYPE),
                  this._stateBogusDoctype(e);
            }
          }
          _stateBeforeDoctypeSystemIdentifier(e) {
            const t = this.currentToken;
            switch (e) {
              case f.CODE_POINTS.SPACE:
              case f.CODE_POINTS.LINE_FEED:
              case f.CODE_POINTS.TABULATION:
              case f.CODE_POINTS.FORM_FEED:
                break;
              case f.CODE_POINTS.QUOTATION_MARK:
                (t.systemId = ""),
                  (this.state = g.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED);
                break;
              case f.CODE_POINTS.APOSTROPHE:
                (t.systemId = ""),
                  (this.state = g.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED);
                break;
              case f.CODE_POINTS.GREATER_THAN_SIGN:
                this._err(m.ERR.missingDoctypeSystemIdentifier),
                  (t.forceQuirks = !0),
                  (this.state = g.DATA),
                  this.emitCurrentDoctype(t);
                break;
              case f.CODE_POINTS.EOF:
                this._err(m.ERR.eofInDoctype),
                  (t.forceQuirks = !0),
                  this.emitCurrentDoctype(t),
                  this._emitEOFToken();
                break;
              default:
                this._err(m.ERR.missingQuoteBeforeDoctypeSystemIdentifier),
                  (t.forceQuirks = !0),
                  (this.state = g.BOGUS_DOCTYPE),
                  this._stateBogusDoctype(e);
            }
          }
          _stateDoctypeSystemIdentifierDoubleQuoted(e) {
            const t = this.currentToken;
            switch (e) {
              case f.CODE_POINTS.QUOTATION_MARK:
                this.state = g.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
                break;
              case f.CODE_POINTS.NULL:
                this._err(m.ERR.unexpectedNullCharacter),
                  (t.systemId += f.REPLACEMENT_CHARACTER);
                break;
              case f.CODE_POINTS.GREATER_THAN_SIGN:
                this._err(m.ERR.abruptDoctypeSystemIdentifier),
                  (t.forceQuirks = !0),
                  this.emitCurrentDoctype(t),
                  (this.state = g.DATA);
                break;
              case f.CODE_POINTS.EOF:
                this._err(m.ERR.eofInDoctype),
                  (t.forceQuirks = !0),
                  this.emitCurrentDoctype(t),
                  this._emitEOFToken();
                break;
              default:
                t.systemId += String.fromCodePoint(e);
            }
          }
          _stateDoctypeSystemIdentifierSingleQuoted(e) {
            const t = this.currentToken;
            switch (e) {
              case f.CODE_POINTS.APOSTROPHE:
                this.state = g.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
                break;
              case f.CODE_POINTS.NULL:
                this._err(m.ERR.unexpectedNullCharacter),
                  (t.systemId += f.REPLACEMENT_CHARACTER);
                break;
              case f.CODE_POINTS.GREATER_THAN_SIGN:
                this._err(m.ERR.abruptDoctypeSystemIdentifier),
                  (t.forceQuirks = !0),
                  this.emitCurrentDoctype(t),
                  (this.state = g.DATA);
                break;
              case f.CODE_POINTS.EOF:
                this._err(m.ERR.eofInDoctype),
                  (t.forceQuirks = !0),
                  this.emitCurrentDoctype(t),
                  this._emitEOFToken();
                break;
              default:
                t.systemId += String.fromCodePoint(e);
            }
          }
          _stateAfterDoctypeSystemIdentifier(e) {
            const t = this.currentToken;
            switch (e) {
              case f.CODE_POINTS.SPACE:
              case f.CODE_POINTS.LINE_FEED:
              case f.CODE_POINTS.TABULATION:
              case f.CODE_POINTS.FORM_FEED:
                break;
              case f.CODE_POINTS.GREATER_THAN_SIGN:
                this.emitCurrentDoctype(t), (this.state = g.DATA);
                break;
              case f.CODE_POINTS.EOF:
                this._err(m.ERR.eofInDoctype),
                  (t.forceQuirks = !0),
                  this.emitCurrentDoctype(t),
                  this._emitEOFToken();
                break;
              default:
                this._err(
                  m.ERR.unexpectedCharacterAfterDoctypeSystemIdentifier
                ),
                  (this.state = g.BOGUS_DOCTYPE),
                  this._stateBogusDoctype(e);
            }
          }
          _stateBogusDoctype(e) {
            const t = this.currentToken;
            switch (e) {
              case f.CODE_POINTS.GREATER_THAN_SIGN:
                this.emitCurrentDoctype(t), (this.state = g.DATA);
                break;
              case f.CODE_POINTS.NULL:
                this._err(m.ERR.unexpectedNullCharacter);
                break;
              case f.CODE_POINTS.EOF:
                this.emitCurrentDoctype(t), this._emitEOFToken();
            }
          }
          _stateCdataSection(e) {
            switch (e) {
              case f.CODE_POINTS.RIGHT_SQUARE_BRACKET:
                this.state = g.CDATA_SECTION_BRACKET;
                break;
              case f.CODE_POINTS.EOF:
                this._err(m.ERR.eofInCdata), this._emitEOFToken();
                break;
              default:
                this._emitCodePoint(e);
            }
          }
          _stateCdataSectionBracket(e) {
            e === f.CODE_POINTS.RIGHT_SQUARE_BRACKET
              ? (this.state = g.CDATA_SECTION_END)
              : (this._emitChars("]"),
                (this.state = g.CDATA_SECTION),
                this._stateCdataSection(e));
          }
          _stateCdataSectionEnd(e) {
            switch (e) {
              case f.CODE_POINTS.GREATER_THAN_SIGN:
                this.state = g.DATA;
                break;
              case f.CODE_POINTS.RIGHT_SQUARE_BRACKET:
                this._emitChars("]");
                break;
              default:
                this._emitChars("]]"),
                  (this.state = g.CDATA_SECTION),
                  this._stateCdataSection(e);
            }
          }
          _stateCharacterReference(e) {
            e === f.CODE_POINTS.NUMBER_SIGN
              ? (this.state = g.NUMERIC_CHARACTER_REFERENCE)
              : o(e)
              ? ((this.state = g.NAMED_CHARACTER_REFERENCE),
                this._stateNamedCharacterReference(e))
              : (this._flushCodePointConsumedAsCharacterReference(
                  f.CODE_POINTS.AMPERSAND
                ),
                this._reconsumeInState(this.returnState, e));
          }
          _stateNamedCharacterReference(e) {
            const t = this._matchNamedCharacterReference(e);
            if (this._ensureHibernation());
            else if (t) {
              for (let e = 0; e < t.length; e++)
                this._flushCodePointConsumedAsCharacterReference(t[e]);
              this.state = this.returnState;
            } else
              this._flushCodePointConsumedAsCharacterReference(
                f.CODE_POINTS.AMPERSAND
              ),
                (this.state = g.AMBIGUOUS_AMPERSAND);
          }
          _stateAmbiguousAmpersand(e) {
            o(e)
              ? this._flushCodePointConsumedAsCharacterReference(e)
              : (e === f.CODE_POINTS.SEMICOLON &&
                  this._err(m.ERR.unknownNamedCharacterReference),
                this._reconsumeInState(this.returnState, e));
          }
          _stateNumericCharacterReference(e) {
            (this.charRefCode = 0),
              e === f.CODE_POINTS.LATIN_SMALL_X ||
              e === f.CODE_POINTS.LATIN_CAPITAL_X
                ? (this.state = g.HEXADEMICAL_CHARACTER_REFERENCE_START)
                : n(e)
                ? ((this.state = g.DECIMAL_CHARACTER_REFERENCE),
                  this._stateDecimalCharacterReference(e))
                : (this._err(m.ERR.absenceOfDigitsInNumericCharacterReference),
                  this._flushCodePointConsumedAsCharacterReference(
                    f.CODE_POINTS.AMPERSAND
                  ),
                  this._flushCodePointConsumedAsCharacterReference(
                    f.CODE_POINTS.NUMBER_SIGN
                  ),
                  this._reconsumeInState(this.returnState, e));
          }
          _stateHexademicalCharacterReferenceStart(e) {
            l(e)
              ? ((this.state = g.HEXADEMICAL_CHARACTER_REFERENCE),
                this._stateHexademicalCharacterReference(e))
              : (this._err(m.ERR.absenceOfDigitsInNumericCharacterReference),
                this._flushCodePointConsumedAsCharacterReference(
                  f.CODE_POINTS.AMPERSAND
                ),
                this._flushCodePointConsumedAsCharacterReference(
                  f.CODE_POINTS.NUMBER_SIGN
                ),
                this._unconsume(2),
                (this.state = this.returnState));
          }
          _stateHexademicalCharacterReference(e) {
            c(e)
              ? (this.charRefCode = 16 * this.charRefCode + e - 55)
              : u(e)
              ? (this.charRefCode = 16 * this.charRefCode + e - 87)
              : n(e)
              ? (this.charRefCode = 16 * this.charRefCode + e - 48)
              : e === f.CODE_POINTS.SEMICOLON
              ? (this.state = g.NUMERIC_CHARACTER_REFERENCE_END)
              : (this._err(m.ERR.missingSemicolonAfterCharacterReference),
                (this.state = g.NUMERIC_CHARACTER_REFERENCE_END),
                this._stateNumericCharacterReferenceEnd(e));
          }
          _stateDecimalCharacterReference(e) {
            n(e)
              ? (this.charRefCode = 10 * this.charRefCode + e - 48)
              : e === f.CODE_POINTS.SEMICOLON
              ? (this.state = g.NUMERIC_CHARACTER_REFERENCE_END)
              : (this._err(m.ERR.missingSemicolonAfterCharacterReference),
                (this.state = g.NUMERIC_CHARACTER_REFERENCE_END),
                this._stateNumericCharacterReferenceEnd(e));
          }
          _stateNumericCharacterReferenceEnd(e) {
            if (this.charRefCode === f.CODE_POINTS.NULL)
              this._err(m.ERR.nullCharacterReference),
                (this.charRefCode = f.CODE_POINTS.REPLACEMENT_CHARACTER);
            else if (this.charRefCode > 1114111)
              this._err(m.ERR.characterReferenceOutsideUnicodeRange),
                (this.charRefCode = f.CODE_POINTS.REPLACEMENT_CHARACTER);
            else if ((0, f.isSurrogate)(this.charRefCode))
              this._err(m.ERR.surrogateCharacterReference),
                (this.charRefCode = f.CODE_POINTS.REPLACEMENT_CHARACTER);
            else if ((0, f.isUndefinedCodePoint)(this.charRefCode))
              this._err(m.ERR.noncharacterCharacterReference);
            else if (
              (0, f.isControlCodePoint)(this.charRefCode) ||
              this.charRefCode === f.CODE_POINTS.CARRIAGE_RETURN
            ) {
              this._err(m.ERR.controlCharacterReference);
              const e = D.get(this.charRefCode);
              void 0 !== e && (this.charRefCode = e);
            }
            this._flushCodePointConsumedAsCharacterReference(this.charRefCode),
              this._reconsumeInState(this.returnState, e);
          }
        }
        r.Tokenizer = N;
      },
      {
        "../common/error-codes.js": 66,
        "../common/html.js": 68,
        "../common/token.js": 69,
        "../common/unicode.js": 70,
        "./preprocessor.js": 77,
        "entities/lib/decode.js": 50,
      },
    ],
    77: [
      function (e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.Preprocessor = void 0);
        const n = e("../common/unicode.js"),
          i = e("../common/error-codes.js"),
          s = 65536;
        class a {
          constructor(e) {
            (this.handler = e),
              (this.html = ""),
              (this.pos = -1),
              (this.lastGapPos = -2),
              (this.gapStack = []),
              (this.skipNextNewLine = !1),
              (this.lastChunkWritten = !1),
              (this.endOfChunkHit = !1),
              (this.bufferWaterline = s),
              (this.isEol = !1),
              (this.lineStartPos = 0),
              (this.droppedBufferSize = 0),
              (this.line = 1),
              (this.lastErrOffset = -1);
          }
          get col() {
            return (
              this.pos -
              this.lineStartPos +
              Number(this.lastGapPos !== this.pos)
            );
          }
          get offset() {
            return this.droppedBufferSize + this.pos;
          }
          getError(e) {
            const { line: t, col: r, offset: n } = this;
            return {
              code: e,
              startLine: t,
              endLine: t,
              startCol: r,
              endCol: r,
              startOffset: n,
              endOffset: n,
            };
          }
          _err(e) {
            this.handler.onParseError &&
              this.lastErrOffset !== this.offset &&
              ((this.lastErrOffset = this.offset),
              this.handler.onParseError(this.getError(e)));
          }
          _addGap() {
            this.gapStack.push(this.lastGapPos), (this.lastGapPos = this.pos);
          }
          _processSurrogate(e) {
            if (this.pos !== this.html.length - 1) {
              const t = this.html.charCodeAt(this.pos + 1);
              if ((0, n.isSurrogatePair)(t))
                return (
                  this.pos++,
                  this._addGap(),
                  (0, n.getSurrogatePairCodePoint)(e, t)
                );
            } else if (!this.lastChunkWritten)
              return (this.endOfChunkHit = !0), n.CODE_POINTS.EOF;
            return this._err(i.ERR.surrogateInInputStream), e;
          }
          willDropParsedChunk() {
            return this.pos > this.bufferWaterline;
          }
          dropParsedChunk() {
            this.willDropParsedChunk() &&
              ((this.html = this.html.substring(this.pos)),
              (this.lineStartPos -= this.pos),
              (this.droppedBufferSize += this.pos),
              (this.pos = 0),
              (this.lastGapPos = -2),
              (this.gapStack.length = 0));
          }
          write(e, t) {
            this.html.length > 0 ? (this.html += e) : (this.html = e),
              (this.endOfChunkHit = !1),
              (this.lastChunkWritten = t);
          }
          insertHtmlAtCurrentPos(e) {
            (this.html =
              this.html.substring(0, this.pos + 1) +
              e +
              this.html.substring(this.pos + 1)),
              (this.endOfChunkHit = !1);
          }
          startsWith(e, t) {
            if (this.pos + e.length > this.html.length)
              return (this.endOfChunkHit = !this.lastChunkWritten), !1;
            if (t) return this.html.startsWith(e, this.pos);
            for (let t = 0; t < e.length; t++) {
              const r = 32 | this.html.charCodeAt(this.pos + t);
              if (r !== e.charCodeAt(t)) return !1;
            }
            return !0;
          }
          peek(e) {
            const t = this.pos + e;
            if (t >= this.html.length)
              return (
                (this.endOfChunkHit = !this.lastChunkWritten), n.CODE_POINTS.EOF
              );
            const r = this.html.charCodeAt(t);
            return r === n.CODE_POINTS.CARRIAGE_RETURN
              ? n.CODE_POINTS.LINE_FEED
              : r;
          }
          advance() {
            if (
              (this.pos++,
              this.isEol &&
                ((this.isEol = !1),
                this.line++,
                (this.lineStartPos = this.pos)),
              this.pos >= this.html.length)
            )
              return (
                (this.endOfChunkHit = !this.lastChunkWritten), n.CODE_POINTS.EOF
              );
            let e = this.html.charCodeAt(this.pos);
            if (e === n.CODE_POINTS.CARRIAGE_RETURN)
              return (
                (this.isEol = !0),
                (this.skipNextNewLine = !0),
                n.CODE_POINTS.LINE_FEED
              );
            if (
              e === n.CODE_POINTS.LINE_FEED &&
              ((this.isEol = !0), this.skipNextNewLine)
            )
              return (
                this.line--,
                (this.skipNextNewLine = !1),
                this._addGap(),
                this.advance()
              );
            (this.skipNextNewLine = !1),
              (0, n.isSurrogate)(e) && (e = this._processSurrogate(e));
            const t =
              null === this.handler.onParseError ||
              (e > 31 && e < 127) ||
              e === n.CODE_POINTS.LINE_FEED ||
              e === n.CODE_POINTS.CARRIAGE_RETURN ||
              (e > 159 && e < 64976);
            return t || this._checkForProblematicCharacters(e), e;
          }
          _checkForProblematicCharacters(e) {
            (0, n.isControlCodePoint)(e)
              ? this._err(i.ERR.controlCharacterInInputStream)
              : (0, n.isUndefinedCodePoint)(e) &&
                this._err(i.ERR.noncharacterInInputStream);
          }
          retreat(e) {
            for (this.pos -= e; this.pos < this.lastGapPos; )
              (this.lastGapPos = this.gapStack.pop()), this.pos--;
            this.isEol = !1;
          }
        }
        r.Preprocessor = a;
      },
      { "../common/error-codes.js": 66, "../common/unicode.js": 70 },
    ],
    78: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          return { nodeName: "#text", value: e, parentNode: null };
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.defaultTreeAdapter = void 0);
        const i = e("../common/html.js");
        r.defaultTreeAdapter = {
          createDocument: () => ({
            nodeName: "#document",
            mode: i.DOCUMENT_MODE.NO_QUIRKS,
            childNodes: [],
          }),
          createDocumentFragment: () => ({
            nodeName: "#document-fragment",
            childNodes: [],
          }),
          createElement: (e, t, r) => ({
            nodeName: e,
            tagName: e,
            attrs: r,
            namespaceURI: t,
            childNodes: [],
            parentNode: null,
          }),
          createCommentNode: (e) => ({
            nodeName: "#comment",
            data: e,
            parentNode: null,
          }),
          appendChild(e, t) {
            e.childNodes.push(t), (t.parentNode = e);
          },
          insertBefore(e, t, r) {
            const n = e.childNodes.indexOf(r);
            e.childNodes.splice(n, 0, t), (t.parentNode = e);
          },
          setTemplateContent(e, t) {
            e.content = t;
          },
          getTemplateContent: (e) => e.content,
          setDocumentType(e, t, n, i) {
            const s = e.childNodes.find((e) => "#documentType" === e.nodeName);
            if (s) (s.name = t), (s.publicId = n), (s.systemId = i);
            else {
              const s = {
                nodeName: "#documentType",
                name: t,
                publicId: n,
                systemId: i,
                parentNode: null,
              };
              r.defaultTreeAdapter.appendChild(e, s);
            }
          },
          setDocumentMode(e, t) {
            e.mode = t;
          },
          getDocumentMode: (e) => e.mode,
          detachNode(e) {
            if (e.parentNode) {
              const t = e.parentNode.childNodes.indexOf(e);
              e.parentNode.childNodes.splice(t, 1), (e.parentNode = null);
            }
          },
          insertText(e, t) {
            if (e.childNodes.length > 0) {
              const n = e.childNodes[e.childNodes.length - 1];
              if (r.defaultTreeAdapter.isTextNode(n))
                return void (n.value += t);
            }
            r.defaultTreeAdapter.appendChild(e, n(t));
          },
          insertTextBefore(e, t, i) {
            const s = e.childNodes[e.childNodes.indexOf(i) - 1];
            s && r.defaultTreeAdapter.isTextNode(s)
              ? (s.value += t)
              : r.defaultTreeAdapter.insertBefore(e, n(t), i);
          },
          adoptAttributes(e, t) {
            const r = new Set(e.attrs.map((e) => e.name));
            for (let n = 0; n < t.length; n++)
              r.has(t[n].name) || e.attrs.push(t[n]);
          },
          getFirstChild: (e) => e.childNodes[0],
          getChildNodes: (e) => e.childNodes,
          getParentNode: (e) => e.parentNode,
          getAttrList: (e) => e.attrs,
          getTagName: (e) => e.tagName,
          getNamespaceURI: (e) => e.namespaceURI,
          getTextNodeContent: (e) => e.value,
          getCommentNodeContent: (e) => e.data,
          getDocumentTypeNodeName: (e) => e.name,
          getDocumentTypeNodePublicId: (e) => e.publicId,
          getDocumentTypeNodeSystemId: (e) => e.systemId,
          isTextNode: (e) => "#text" === e.nodeName,
          isCommentNode: (e) => "#comment" === e.nodeName,
          isDocumentTypeNode: (e) => "#documentType" === e.nodeName,
          isElementNode: (e) =>
            Object.prototype.hasOwnProperty.call(e, "tagName"),
          setNodeSourceCodeLocation(e, t) {
            e.sourceCodeLocation = t;
          },
          getNodeSourceCodeLocation: (e) => e.sourceCodeLocation,
          updateNodeSourceCodeLocation(e, t) {
            e.sourceCodeLocation = Object.assign(
              Object.assign({}, e.sourceCodeLocation),
              t
            );
          },
        };
      },
      { "../common/html.js": 68 },
    ],
  };
  return e(t, {}, [15]);
}