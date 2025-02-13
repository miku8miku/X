!(function (t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : ((global =
        "undefined" != typeof globalThis ? globalThis : global || self),
      (global.Buffer = t()));
})(function () {
  function t(r, e, n) {
    function i(o, u) {
      if (!e[o]) {
        if (!r[o]) {
          var s = "function" == typeof require && require;
          if (!u && s) return s(o, !0);
          if (f) return f(o, !0);
          var h = new Error("Cannot find module '" + o + "'");
          throw ((h.code = "MODULE_NOT_FOUND"), h);
        }
        var a = (e[o] = { exports: {} });
        r[o][0].call(
          a.exports,
          function (t) {
            var e = r[o][1][t];
            return i(e || t);
          },
          a,
          a.exports,
          t,
          r,
          e,
          n
        );
      }
      return e[o].exports;
    }
    let o = {};
    for (
      var f = "function" == typeof require && require, u = 0;
      u < n.length;
      u++
    )
      Object.assign(o, i(n[u]));
    return o;
  }
  const r = {
    1: [
      function (t, r, e) {
        "use strict";
        function n(t) {
          var r = t.length;
          if (r % 4 > 0)
            throw new Error("Invalid string. Length must be a multiple of 4");
          var e = t.indexOf("=");
          -1 === e && (e = r);
          var n = e === r ? 0 : 4 - (e % 4);
          return [e, n];
        }
        function i(t) {
          var r = n(t),
            e = r[0],
            i = r[1];
          return (3 * (e + i)) / 4 - i;
        }
        function o(t, r, e) {
          return (3 * (r + e)) / 4 - e;
        }
        function f(t) {
          var r,
            e,
            i = n(t),
            f = i[0],
            u = i[1],
            s = new p(o(t, f, u)),
            h = 0,
            a = u > 0 ? f - 4 : f;
          for (e = 0; e < a; e += 4)
            (r =
              (c[t.charCodeAt(e)] << 18) |
              (c[t.charCodeAt(e + 1)] << 12) |
              (c[t.charCodeAt(e + 2)] << 6) |
              c[t.charCodeAt(e + 3)]),
              (s[h++] = (r >> 16) & 255),
              (s[h++] = (r >> 8) & 255),
              (s[h++] = 255 & r);
          return (
            2 === u &&
              ((r = (c[t.charCodeAt(e)] << 2) | (c[t.charCodeAt(e + 1)] >> 4)),
              (s[h++] = 255 & r)),
            1 === u &&
              ((r =
                (c[t.charCodeAt(e)] << 10) |
                (c[t.charCodeAt(e + 1)] << 4) |
                (c[t.charCodeAt(e + 2)] >> 2)),
              (s[h++] = (r >> 8) & 255),
              (s[h++] = 255 & r)),
            s
          );
        }
        function u(t) {
          return (
            a[(t >> 18) & 63] + a[(t >> 12) & 63] + a[(t >> 6) & 63] + a[63 & t]
          );
        }
        function s(t, r, e) {
          for (var n, i = [], o = r; o < e; o += 3)
            (n =
              ((t[o] << 16) & 16711680) +
              ((t[o + 1] << 8) & 65280) +
              (255 & t[o + 2])),
              i.push(u(n));
          return i.join("");
        }
        function h(t) {
          for (
            var r, e = t.length, n = e % 3, i = [], o = 16383, f = 0, u = e - n;
            f < u;
            f += o
          )
            i.push(s(t, f, f + o > u ? u : f + o));
          return (
            1 === n
              ? ((r = t[e - 1]), i.push(a[r >> 2] + a[(r << 4) & 63] + "=="))
              : 2 === n &&
                ((r = (t[e - 2] << 8) + t[e - 1]),
                i.push(a[r >> 10] + a[(r >> 4) & 63] + a[(r << 2) & 63] + "=")),
            i.join("")
          );
        }
        (e.byteLength = i), (e.toByteArray = f), (e.fromByteArray = h);
        for (
          var a = [],
            c = [],
            p = "undefined" != typeof Uint8Array ? Uint8Array : Array,
            l =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            y = 0,
            g = l.length;
          y < g;
          ++y
        )
          (a[y] = l[y]), (c[l.charCodeAt(y)] = y);
        (c["-".charCodeAt(0)] = 62), (c["_".charCodeAt(0)] = 63);
      },
      {},
    ],
    2: [
      function (t, r, e) {
        (function (r) {
          (function () {
            "use strict";
            function r() {
              try {
                var t = new Uint8Array(1);
                return (
                  (t.__proto__ = {
                    __proto__: Uint8Array.prototype,
                    foo: function () {
                      return 42;
                    },
                  }),
                  42 === t.foo()
                );
              } catch (t) {
                return !1;
              }
            }
            function n(t) {
              if (t > G)
                throw new RangeError(
                  'The value "' + t + '" is invalid for option "size"'
                );
              var r = new Uint8Array(t);
              return (r.__proto__ = i.prototype), r;
            }
            function i(t, r, e) {
              if ("number" == typeof t) {
                if ("string" == typeof r)
                  throw new TypeError(
                    'The "string" argument must be of type string. Received type number'
                  );
                return s(t);
              }
              return o(t, r, e);
            }
            function o(t, r, e) {
              if ("string" == typeof t) return h(t, r);
              if (ArrayBuffer.isView(t)) return a(t);
              if (null == t)
                throw TypeError(
                  "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
                    typeof t
                );
              if (W(t, ArrayBuffer) || (t && W(t.buffer, ArrayBuffer)))
                return c(t, r, e);
              if ("number" == typeof t)
                throw new TypeError(
                  'The "value" argument must not be of type number. Received type number'
                );
              var n = t.valueOf && t.valueOf();
              if (null != n && n !== t) return i.from(n, r, e);
              var o = p(t);
              if (o) return o;
              if (
                "undefined" != typeof Symbol &&
                null != Symbol.toPrimitive &&
                "function" == typeof t[Symbol.toPrimitive]
              )
                return i.from(t[Symbol.toPrimitive]("string"), r, e);
              throw new TypeError(
                "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
                  typeof t
              );
            }
            function f(t) {
              if ("number" != typeof t)
                throw new TypeError('"size" argument must be of type number');
              if (t < 0)
                throw new RangeError(
                  'The value "' + t + '" is invalid for option "size"'
                );
            }
            function u(t, r, e) {
              return (
                f(t),
                t <= 0
                  ? n(t)
                  : void 0 !== r
                  ? "string" == typeof e
                    ? n(t).fill(r, e)
                    : n(t).fill(r)
                  : n(t)
              );
            }
            function s(t) {
              return f(t), n(t < 0 ? 0 : 0 | l(t));
            }
            function h(t, r) {
              if (
                (("string" == typeof r && "" !== r) || (r = "utf8"),
                !i.isEncoding(r))
              )
                throw new TypeError("Unknown encoding: " + r);
              var e = 0 | g(t, r),
                o = n(e),
                f = o.write(t, r);
              return f !== e && (o = o.slice(0, f)), o;
            }
            function a(t) {
              for (
                var r = t.length < 0 ? 0 : 0 | l(t.length), e = n(r), i = 0;
                i < r;
                i += 1
              )
                e[i] = 255 & t[i];
              return e;
            }
            function c(t, r, e) {
              if (r < 0 || t.byteLength < r)
                throw new RangeError('"offset" is outside of buffer bounds');
              if (t.byteLength < r + (e || 0))
                throw new RangeError('"length" is outside of buffer bounds');
              var n;
              return (
                (n =
                  void 0 === r && void 0 === e
                    ? new Uint8Array(t)
                    : void 0 === e
                    ? new Uint8Array(t, r)
                    : new Uint8Array(t, r, e)),
                (n.__proto__ = i.prototype),
                n
              );
            }
            function p(t) {
              if (i.isBuffer(t)) {
                var r = 0 | l(t.length),
                  e = n(r);
                return 0 === e.length ? e : (t.copy(e, 0, 0, r), e);
              }
              return void 0 !== t.length
                ? "number" != typeof t.length || X(t.length)
                  ? n(0)
                  : a(t)
                : "Buffer" === t.type && Array.isArray(t.data)
                ? a(t.data)
                : void 0;
            }
            function l(t) {
              if (t >= G)
                throw new RangeError(
                  "Attempt to allocate Buffer larger than maximum size: 0x" +
                    G.toString(16) +
                    " bytes"
                );
              return 0 | t;
            }
            function y(t) {
              return +t != t && (t = 0), i.alloc(+t);
            }
            function g(t, r) {
              if (i.isBuffer(t)) return t.length;
              if (ArrayBuffer.isView(t) || W(t, ArrayBuffer))
                return t.byteLength;
              if ("string" != typeof t)
                throw new TypeError(
                  'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
                    typeof t
                );
              var e = t.length,
                n = arguments.length > 2 && !0 === arguments[2];
              if (!n && 0 === e) return 0;
              for (var o = !1; ; )
                switch (r) {
                  case "ascii":
                  case "latin1":
                  case "binary":
                    return e;
                  case "utf8":
                  case "utf-8":
                    return D(t).length;
                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return 2 * e;
                  case "hex":
                    return e >>> 1;
                  case "base64":
                    return Y(t).length;
                  default:
                    if (o) return n ? -1 : D(t).length;
                    (r = ("" + r).toLowerCase()), (o = !0);
                }
            }
            function w(t, r, e) {
              var n = !1;
              if (((void 0 === r || r < 0) && (r = 0), r > this.length))
                return "";
              if (
                ((void 0 === e || e > this.length) && (e = this.length), e <= 0)
              )
                return "";
              if (((e >>>= 0), (r >>>= 0), e <= r)) return "";
              for (t || (t = "utf8"); ; )
                switch (t) {
                  case "hex":
                    return R(this, r, e);
                  case "utf8":
                  case "utf-8":
                    return I(this, r, e);
                  case "ascii":
                    return C(this, r, e);
                  case "latin1":
                  case "binary":
                    return L(this, r, e);
                  case "base64":
                    return _(this, r, e);
                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return x(this, r, e);
                  default:
                    if (n) throw new TypeError("Unknown encoding: " + t);
                    (t = (t + "").toLowerCase()), (n = !0);
                }
            }
            function d(t, r, e) {
              var n = t[r];
              (t[r] = t[e]), (t[e] = n);
            }
            function v(t, r, e, n, o) {
              if (0 === t.length) return -1;
              if (
                ("string" == typeof e
                  ? ((n = e), (e = 0))
                  : e > 2147483647
                  ? (e = 2147483647)
                  : e < -2147483648 && (e = -2147483648),
                (e = +e),
                X(e) && (e = o ? 0 : t.length - 1),
                e < 0 && (e = t.length + e),
                e >= t.length)
              ) {
                if (o) return -1;
                e = t.length - 1;
              } else if (e < 0) {
                if (!o) return -1;
                e = 0;
              }
              if (("string" == typeof r && (r = i.from(r, n)), i.isBuffer(r)))
                return 0 === r.length ? -1 : b(t, r, e, n, o);
              if ("number" == typeof r)
                return (
                  (r &= 255),
                  "function" == typeof Uint8Array.prototype.indexOf
                    ? o
                      ? Uint8Array.prototype.indexOf.call(t, r, e)
                      : Uint8Array.prototype.lastIndexOf.call(t, r, e)
                    : b(t, [r], e, n, o)
                );
              throw new TypeError("val must be string, number or Buffer");
            }
            function b(t, r, e, n, i) {
              function o(t, r) {
                return 1 === u ? t[r] : t.readUInt16BE(r * u);
              }
              var f,
                u = 1,
                s = t.length,
                h = r.length;
              if (
                void 0 !== n &&
                ((n = String(n).toLowerCase()),
                "ucs2" === n ||
                  "ucs-2" === n ||
                  "utf16le" === n ||
                  "utf-16le" === n)
              ) {
                if (t.length < 2 || r.length < 2) return -1;
                (u = 2), (s /= 2), (h /= 2), (e /= 2);
              }
              if (i) {
                var a = -1;
                for (f = e; f < s; f++)
                  if (o(t, f) === o(r, -1 === a ? 0 : f - a)) {
                    if ((-1 === a && (a = f), f - a + 1 === h)) return a * u;
                  } else -1 !== a && (f -= f - a), (a = -1);
              } else
                for (e + h > s && (e = s - h), f = e; f >= 0; f--) {
                  for (var c = !0, p = 0; p < h; p++)
                    if (o(t, f + p) !== o(r, p)) {
                      c = !1;
                      break;
                    }
                  if (c) return f;
                }
              return -1;
            }
            function m(t, r, e, n) {
              e = Number(e) || 0;
              var i = t.length - e;
              n ? ((n = Number(n)), n > i && (n = i)) : (n = i);
              var o = r.length;
              n > o / 2 && (n = o / 2);
              for (var f = 0; f < n; ++f) {
                var u = parseInt(r.substr(2 * f, 2), 16);
                if (X(u)) return f;
                t[e + f] = u;
              }
              return f;
            }
            function E(t, r, e, n) {
              return V(D(r, t.length - e), t, e, n);
            }
            function A(t, r, e, n) {
              return V(q(r), t, e, n);
            }
            function B(t, r, e, n) {
              return A(t, r, e, n);
            }
            function U(t, r, e, n) {
              return V(Y(r), t, e, n);
            }
            function T(t, r, e, n) {
              return V(F(r, t.length - e), t, e, n);
            }
            function _(t, r, e) {
              return 0 === r && e === t.length
                ? J.fromByteArray(t)
                : J.fromByteArray(t.slice(r, e));
            }
            function I(t, r, e) {
              e = Math.min(t.length, e);
              for (var n = [], i = r; i < e; ) {
                var o,
                  f,
                  u,
                  s,
                  h = t[i],
                  a = null,
                  c = h > 239 ? 4 : h > 223 ? 3 : h > 191 ? 2 : 1;
                if (i + c <= e)
                  switch (c) {
                    case 1:
                      h < 128 && (a = h);
                      break;
                    case 2:
                      (o = t[i + 1]),
                        128 == (192 & o) &&
                          ((s = ((31 & h) << 6) | (63 & o)),
                          s > 127 && (a = s));
                      break;
                    case 3:
                      (o = t[i + 1]),
                        (f = t[i + 2]),
                        128 == (192 & o) &&
                          128 == (192 & f) &&
                          ((s = ((15 & h) << 12) | ((63 & o) << 6) | (63 & f)),
                          s > 2047 && (s < 55296 || s > 57343) && (a = s));
                      break;
                    case 4:
                      (o = t[i + 1]),
                        (f = t[i + 2]),
                        (u = t[i + 3]),
                        128 == (192 & o) &&
                          128 == (192 & f) &&
                          128 == (192 & u) &&
                          ((s =
                            ((15 & h) << 18) |
                            ((63 & o) << 12) |
                            ((63 & f) << 6) |
                            (63 & u)),
                          s > 65535 && s < 1114112 && (a = s));
                  }
                null === a
                  ? ((a = 65533), (c = 1))
                  : a > 65535 &&
                    ((a -= 65536),
                    n.push(((a >>> 10) & 1023) | 55296),
                    (a = 56320 | (1023 & a))),
                  n.push(a),
                  (i += c);
              }
              return S(n);
            }
            function S(t) {
              var r = t.length;
              if (r <= H) return String.fromCharCode.apply(String, t);
              for (var e = "", n = 0; n < r; )
                e += String.fromCharCode.apply(String, t.slice(n, (n += H)));
              return e;
            }
            function C(t, r, e) {
              var n = "";
              e = Math.min(t.length, e);
              for (var i = r; i < e; ++i) n += String.fromCharCode(127 & t[i]);
              return n;
            }
            function L(t, r, e) {
              var n = "";
              e = Math.min(t.length, e);
              for (var i = r; i < e; ++i) n += String.fromCharCode(t[i]);
              return n;
            }
            function R(t, r, e) {
              var n = t.length;
              (!r || r < 0) && (r = 0), (!e || e < 0 || e > n) && (e = n);
              for (var i = "", o = r; o < e; ++o) i += z(t[o]);
              return i;
            }
            function x(t, r, e) {
              for (var n = t.slice(r, e), i = "", o = 0; o < n.length; o += 2)
                i += String.fromCharCode(n[o] + 256 * n[o + 1]);
              return i;
            }
            function M(t, r, e) {
              if (t % 1 != 0 || t < 0)
                throw new RangeError("offset is not uint");
              if (t + r > e)
                throw new RangeError("Trying to access beyond buffer length");
            }
            function O(t, r, e, n, o, f) {
              if (!i.isBuffer(t))
                throw new TypeError(
                  '"buffer" argument must be a Buffer instance'
                );
              if (r > o || r < f)
                throw new RangeError('"value" argument is out of bounds');
              if (e + n > t.length) throw new RangeError("Index out of range");
            }
            function k(t, r, e, n, i, o) {
              if (e + n > t.length) throw new RangeError("Index out of range");
              if (e < 0) throw new RangeError("Index out of range");
            }
            function N(t, r, e, n, i) {
              return (
                (r = +r),
                (e >>>= 0),
                i ||
                  k(t, r, e, 4, 3.4028234663852886e38, -3.4028234663852886e38),
                Z.write(t, r, e, n, 23, 4),
                e + 4
              );
            }
            function P(t, r, e, n, i) {
              return (
                (r = +r),
                (e >>>= 0),
                i ||
                  k(
                    t,
                    r,
                    e,
                    8,
                    1.7976931348623157e308,
                    -1.7976931348623157e308
                  ),
                Z.write(t, r, e, n, 52, 8),
                e + 8
              );
            }
            function j(t) {
              if (
                ((t = t.split("=")[0]),
                (t = t.trim().replace(K, "")),
                t.length < 2)
              )
                return "";
              for (; t.length % 4 != 0; ) t += "=";
              return t;
            }
            function z(t) {
              return t < 16 ? "0" + t.toString(16) : t.toString(16);
            }
            function D(t, r) {
              var e;
              r = r || 1 / 0;
              for (var n = t.length, i = null, o = [], f = 0; f < n; ++f) {
                if (((e = t.charCodeAt(f)), e > 55295 && e < 57344)) {
                  if (!i) {
                    if (e > 56319) {
                      (r -= 3) > -1 && o.push(239, 191, 189);
                      continue;
                    }
                    if (f + 1 === n) {
                      (r -= 3) > -1 && o.push(239, 191, 189);
                      continue;
                    }
                    i = e;
                    continue;
                  }
                  if (e < 56320) {
                    (r -= 3) > -1 && o.push(239, 191, 189), (i = e);
                    continue;
                  }
                  e = 65536 + (((i - 55296) << 10) | (e - 56320));
                } else i && (r -= 3) > -1 && o.push(239, 191, 189);
                if (((i = null), e < 128)) {
                  if ((r -= 1) < 0) break;
                  o.push(e);
                } else if (e < 2048) {
                  if ((r -= 2) < 0) break;
                  o.push((e >> 6) | 192, (63 & e) | 128);
                } else if (e < 65536) {
                  if ((r -= 3) < 0) break;
                  o.push(
                    (e >> 12) | 224,
                    ((e >> 6) & 63) | 128,
                    (63 & e) | 128
                  );
                } else {
                  if (!(e < 1114112)) throw new Error("Invalid code point");
                  if ((r -= 4) < 0) break;
                  o.push(
                    (e >> 18) | 240,
                    ((e >> 12) & 63) | 128,
                    ((e >> 6) & 63) | 128,
                    (63 & e) | 128
                  );
                }
              }
              return o;
            }
            function q(t) {
              for (var r = [], e = 0; e < t.length; ++e)
                r.push(255 & t.charCodeAt(e));
              return r;
            }
            function F(t, r) {
              for (
                var e, n, i, o = [], f = 0;
                f < t.length && !((r -= 2) < 0);
                ++f
              )
                (e = t.charCodeAt(f)),
                  (n = e >> 8),
                  (i = e % 256),
                  o.push(i),
                  o.push(n);
              return o;
            }
            function Y(t) {
              return J.toByteArray(j(t));
            }
            function V(t, r, e, n) {
              for (
                var i = 0;
                i < n && !(i + e >= r.length || i >= t.length);
                ++i
              )
                r[i + e] = t[i];
              return i;
            }
            function W(t, r) {
              return (
                t instanceof r ||
                (null != t &&
                  null != t.constructor &&
                  null != t.constructor.name &&
                  t.constructor.name === r.name)
              );
            }
            function X(t) {
              return t != t;
            }
            var J = t("base64-js"),
              Z = t("ieee754");
            (e.Buffer = i), (e.SlowBuffer = y), (e.INSPECT_MAX_BYTES = 50);
            var G = 2147483647;
            (e.kMaxLength = G),
              (i.TYPED_ARRAY_SUPPORT = r()),
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
              (i.from = function (t, r, e) {
                return o(t, r, e);
              }),
              (i.prototype.__proto__ = Uint8Array.prototype),
              (i.__proto__ = Uint8Array),
              (i.alloc = function (t, r, e) {
                return u(t, r, e);
              }),
              (i.allocUnsafe = function (t) {
                return s(t);
              }),
              (i.allocUnsafeSlow = function (t) {
                return s(t);
              }),
              (i.isBuffer = function (t) {
                return null != t && !0 === t._isBuffer && t !== i.prototype;
              }),
              (i.compare = function (t, r) {
                if (
                  (W(t, Uint8Array) && (t = i.from(t, t.offset, t.byteLength)),
                  W(r, Uint8Array) && (r = i.from(r, r.offset, r.byteLength)),
                  !i.isBuffer(t) || !i.isBuffer(r))
                )
                  throw new TypeError(
                    'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
                  );
                if (t === r) return 0;
                for (
                  var e = t.length, n = r.length, o = 0, f = Math.min(e, n);
                  o < f;
                  ++o
                )
                  if (t[o] !== r[o]) {
                    (e = t[o]), (n = r[o]);
                    break;
                  }
                return e < n ? -1 : n < e ? 1 : 0;
              }),
              (i.isEncoding = function (t) {
                switch (String(t).toLowerCase()) {
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
              (i.concat = function (t, r) {
                if (!Array.isArray(t))
                  throw new TypeError(
                    '"list" argument must be an Array of Buffers'
                  );
                if (0 === t.length) return i.alloc(0);
                var e;
                if (void 0 === r)
                  for (r = 0, e = 0; e < t.length; ++e) r += t[e].length;
                var n = i.allocUnsafe(r),
                  o = 0;
                for (e = 0; e < t.length; ++e) {
                  var f = t[e];
                  if ((W(f, Uint8Array) && (f = i.from(f)), !i.isBuffer(f)))
                    throw new TypeError(
                      '"list" argument must be an Array of Buffers'
                    );
                  f.copy(n, o), (o += f.length);
                }
                return n;
              }),
              (i.byteLength = g),
              (i.prototype._isBuffer = !0),
              (i.prototype.swap16 = function () {
                var t = this.length;
                if (t % 2 != 0)
                  throw new RangeError(
                    "Buffer size must be a multiple of 16-bits"
                  );
                for (var r = 0; r < t; r += 2) d(this, r, r + 1);
                return this;
              }),
              (i.prototype.swap32 = function () {
                var t = this.length;
                if (t % 4 != 0)
                  throw new RangeError(
                    "Buffer size must be a multiple of 32-bits"
                  );
                for (var r = 0; r < t; r += 4)
                  d(this, r, r + 3), d(this, r + 1, r + 2);
                return this;
              }),
              (i.prototype.swap64 = function () {
                var t = this.length;
                if (t % 8 != 0)
                  throw new RangeError(
                    "Buffer size must be a multiple of 64-bits"
                  );
                for (var r = 0; r < t; r += 8)
                  d(this, r, r + 7),
                    d(this, r + 1, r + 6),
                    d(this, r + 2, r + 5),
                    d(this, r + 3, r + 4);
                return this;
              }),
              (i.prototype.toString = function () {
                var t = this.length;
                return 0 === t
                  ? ""
                  : 0 === arguments.length
                  ? I(this, 0, t)
                  : w.apply(this, arguments);
              }),
              (i.prototype.toLocaleString = i.prototype.toString),
              (i.prototype.equals = function (t) {
                if (!i.isBuffer(t))
                  throw new TypeError("Argument must be a Buffer");
                return this === t || 0 === i.compare(this, t);
              }),
              (i.prototype.inspect = function () {
                var t = "",
                  r = e.INSPECT_MAX_BYTES;
                return (
                  (t = this.toString("hex", 0, r)
                    .replace(/(.{2})/g, "$1 ")
                    .trim()),
                  this.length > r && (t += " ... "),
                  "<Buffer " + t + ">"
                );
              }),
              (i.prototype.compare = function (t, r, e, n, o) {
                if (
                  (W(t, Uint8Array) && (t = i.from(t, t.offset, t.byteLength)),
                  !i.isBuffer(t))
                )
                  throw new TypeError(
                    'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
                      typeof t
                  );
                if (
                  (void 0 === r && (r = 0),
                  void 0 === e && (e = t ? t.length : 0),
                  void 0 === n && (n = 0),
                  void 0 === o && (o = this.length),
                  r < 0 || e > t.length || n < 0 || o > this.length)
                )
                  throw new RangeError("out of range index");
                if (n >= o && r >= e) return 0;
                if (n >= o) return -1;
                if (r >= e) return 1;
                if (
                  ((r >>>= 0), (e >>>= 0), (n >>>= 0), (o >>>= 0), this === t)
                )
                  return 0;
                for (
                  var f = o - n,
                    u = e - r,
                    s = Math.min(f, u),
                    h = this.slice(n, o),
                    a = t.slice(r, e),
                    c = 0;
                  c < s;
                  ++c
                )
                  if (h[c] !== a[c]) {
                    (f = h[c]), (u = a[c]);
                    break;
                  }
                return f < u ? -1 : u < f ? 1 : 0;
              }),
              (i.prototype.includes = function (t, r, e) {
                return -1 !== this.indexOf(t, r, e);
              }),
              (i.prototype.indexOf = function (t, r, e) {
                return v(this, t, r, e, !0);
              }),
              (i.prototype.lastIndexOf = function (t, r, e) {
                return v(this, t, r, e, !1);
              }),
              (i.prototype.write = function (t, r, e, n) {
                if (void 0 === r) (n = "utf8"), (e = this.length), (r = 0);
                else if (void 0 === e && "string" == typeof r)
                  (n = r), (e = this.length), (r = 0);
                else {
                  if (!isFinite(r))
                    throw new Error(
                      "Buffer.write(string, encoding, offset[, length]) is no longer supported"
                    );
                  (r >>>= 0),
                    isFinite(e)
                      ? ((e >>>= 0), void 0 === n && (n = "utf8"))
                      : ((n = e), (e = void 0));
                }
                var i = this.length - r;
                if (
                  ((void 0 === e || e > i) && (e = i),
                  (t.length > 0 && (e < 0 || r < 0)) || r > this.length)
                )
                  throw new RangeError(
                    "Attempt to write outside buffer bounds"
                  );
                n || (n = "utf8");
                for (var o = !1; ; )
                  switch (n) {
                    case "hex":
                      return m(this, t, r, e);
                    case "utf8":
                    case "utf-8":
                      return E(this, t, r, e);
                    case "ascii":
                      return A(this, t, r, e);
                    case "latin1":
                    case "binary":
                      return B(this, t, r, e);
                    case "base64":
                      return U(this, t, r, e);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                      return T(this, t, r, e);
                    default:
                      if (o) throw new TypeError("Unknown encoding: " + n);
                      (n = ("" + n).toLowerCase()), (o = !0);
                  }
              }),
              (i.prototype.toJSON = function () {
                return {
                  type: "Buffer",
                  data: Array.prototype.slice.call(this._arr || this, 0),
                };
              });
            var H = 4096;
            (i.prototype.slice = function (t, r) {
              var e = this.length;
              (t = ~~t),
                (r = void 0 === r ? e : ~~r),
                t < 0 ? ((t += e), t < 0 && (t = 0)) : t > e && (t = e),
                r < 0 ? ((r += e), r < 0 && (r = 0)) : r > e && (r = e),
                r < t && (r = t);
              var n = this.subarray(t, r);
              return (n.__proto__ = i.prototype), n;
            }),
              (i.prototype.readUIntLE = function (t, r, e) {
                (t >>>= 0), (r >>>= 0), e || M(t, r, this.length);
                for (var n = this[t], i = 1, o = 0; ++o < r && (i *= 256); )
                  n += this[t + o] * i;
                return n;
              }),
              (i.prototype.readUIntBE = function (t, r, e) {
                (t >>>= 0), (r >>>= 0), e || M(t, r, this.length);
                for (var n = this[t + --r], i = 1; r > 0 && (i *= 256); )
                  n += this[t + --r] * i;
                return n;
              }),
              (i.prototype.readUInt8 = function (t, r) {
                return (t >>>= 0), r || M(t, 1, this.length), this[t];
              }),
              (i.prototype.readUInt16LE = function (t, r) {
                return (
                  (t >>>= 0),
                  r || M(t, 2, this.length),
                  this[t] | (this[t + 1] << 8)
                );
              }),
              (i.prototype.readUInt16BE = function (t, r) {
                return (
                  (t >>>= 0),
                  r || M(t, 2, this.length),
                  (this[t] << 8) | this[t + 1]
                );
              }),
              (i.prototype.readUInt32LE = function (t, r) {
                return (
                  (t >>>= 0),
                  r || M(t, 4, this.length),
                  (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) +
                    16777216 * this[t + 3]
                );
              }),
              (i.prototype.readUInt32BE = function (t, r) {
                return (
                  (t >>>= 0),
                  r || M(t, 4, this.length),
                  16777216 * this[t] +
                    ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
                );
              }),
              (i.prototype.readIntLE = function (t, r, e) {
                (t >>>= 0), (r >>>= 0), e || M(t, r, this.length);
                for (var n = this[t], i = 1, o = 0; ++o < r && (i *= 256); )
                  n += this[t + o] * i;
                return (i *= 128), n >= i && (n -= Math.pow(2, 8 * r)), n;
              }),
              (i.prototype.readIntBE = function (t, r, e) {
                (t >>>= 0), (r >>>= 0), e || M(t, r, this.length);
                for (var n = r, i = 1, o = this[t + --n]; n > 0 && (i *= 256); )
                  o += this[t + --n] * i;
                return (i *= 128), o >= i && (o -= Math.pow(2, 8 * r)), o;
              }),
              (i.prototype.readInt8 = function (t, r) {
                return (
                  (t >>>= 0),
                  r || M(t, 1, this.length),
                  128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
                );
              }),
              (i.prototype.readInt16LE = function (t, r) {
                (t >>>= 0), r || M(t, 2, this.length);
                var e = this[t] | (this[t + 1] << 8);
                return 32768 & e ? 4294901760 | e : e;
              }),
              (i.prototype.readInt16BE = function (t, r) {
                (t >>>= 0), r || M(t, 2, this.length);
                var e = this[t + 1] | (this[t] << 8);
                return 32768 & e ? 4294901760 | e : e;
              }),
              (i.prototype.readInt32LE = function (t, r) {
                return (
                  (t >>>= 0),
                  r || M(t, 4, this.length),
                  this[t] |
                    (this[t + 1] << 8) |
                    (this[t + 2] << 16) |
                    (this[t + 3] << 24)
                );
              }),
              (i.prototype.readInt32BE = function (t, r) {
                return (
                  (t >>>= 0),
                  r || M(t, 4, this.length),
                  (this[t] << 24) |
                    (this[t + 1] << 16) |
                    (this[t + 2] << 8) |
                    this[t + 3]
                );
              }),
              (i.prototype.readFloatLE = function (t, r) {
                return (
                  (t >>>= 0),
                  r || M(t, 4, this.length),
                  Z.read(this, t, !0, 23, 4)
                );
              }),
              (i.prototype.readFloatBE = function (t, r) {
                return (
                  (t >>>= 0),
                  r || M(t, 4, this.length),
                  Z.read(this, t, !1, 23, 4)
                );
              }),
              (i.prototype.readDoubleLE = function (t, r) {
                return (
                  (t >>>= 0),
                  r || M(t, 8, this.length),
                  Z.read(this, t, !0, 52, 8)
                );
              }),
              (i.prototype.readDoubleBE = function (t, r) {
                return (
                  (t >>>= 0),
                  r || M(t, 8, this.length),
                  Z.read(this, t, !1, 52, 8)
                );
              }),
              (i.prototype.writeUIntLE = function (t, r, e, n) {
                if (((t = +t), (r >>>= 0), (e >>>= 0), !n)) {
                  var i = Math.pow(2, 8 * e) - 1;
                  O(this, t, r, e, i, 0);
                }
                var o = 1,
                  f = 0;
                for (this[r] = 255 & t; ++f < e && (o *= 256); )
                  this[r + f] = (t / o) & 255;
                return r + e;
              }),
              (i.prototype.writeUIntBE = function (t, r, e, n) {
                if (((t = +t), (r >>>= 0), (e >>>= 0), !n)) {
                  var i = Math.pow(2, 8 * e) - 1;
                  O(this, t, r, e, i, 0);
                }
                var o = e - 1,
                  f = 1;
                for (this[r + o] = 255 & t; --o >= 0 && (f *= 256); )
                  this[r + o] = (t / f) & 255;
                return r + e;
              }),
              (i.prototype.writeUInt8 = function (t, r, e) {
                return (
                  (t = +t),
                  (r >>>= 0),
                  e || O(this, t, r, 1, 255, 0),
                  (this[r] = 255 & t),
                  r + 1
                );
              }),
              (i.prototype.writeUInt16LE = function (t, r, e) {
                return (
                  (t = +t),
                  (r >>>= 0),
                  e || O(this, t, r, 2, 65535, 0),
                  (this[r] = 255 & t),
                  (this[r + 1] = t >>> 8),
                  r + 2
                );
              }),
              (i.prototype.writeUInt16BE = function (t, r, e) {
                return (
                  (t = +t),
                  (r >>>= 0),
                  e || O(this, t, r, 2, 65535, 0),
                  (this[r] = t >>> 8),
                  (this[r + 1] = 255 & t),
                  r + 2
                );
              }),
              (i.prototype.writeUInt32LE = function (t, r, e) {
                return (
                  (t = +t),
                  (r >>>= 0),
                  e || O(this, t, r, 4, 4294967295, 0),
                  (this[r + 3] = t >>> 24),
                  (this[r + 2] = t >>> 16),
                  (this[r + 1] = t >>> 8),
                  (this[r] = 255 & t),
                  r + 4
                );
              }),
              (i.prototype.writeUInt32BE = function (t, r, e) {
                return (
                  (t = +t),
                  (r >>>= 0),
                  e || O(this, t, r, 4, 4294967295, 0),
                  (this[r] = t >>> 24),
                  (this[r + 1] = t >>> 16),
                  (this[r + 2] = t >>> 8),
                  (this[r + 3] = 255 & t),
                  r + 4
                );
              }),
              (i.prototype.writeIntLE = function (t, r, e, n) {
                if (((t = +t), (r >>>= 0), !n)) {
                  var i = Math.pow(2, 8 * e - 1);
                  O(this, t, r, e, i - 1, -i);
                }
                var o = 0,
                  f = 1,
                  u = 0;
                for (this[r] = 255 & t; ++o < e && (f *= 256); )
                  t < 0 && 0 === u && 0 !== this[r + o - 1] && (u = 1),
                    (this[r + o] = (((t / f) >> 0) - u) & 255);
                return r + e;
              }),
              (i.prototype.writeIntBE = function (t, r, e, n) {
                if (((t = +t), (r >>>= 0), !n)) {
                  var i = Math.pow(2, 8 * e - 1);
                  O(this, t, r, e, i - 1, -i);
                }
                var o = e - 1,
                  f = 1,
                  u = 0;
                for (this[r + o] = 255 & t; --o >= 0 && (f *= 256); )
                  t < 0 && 0 === u && 0 !== this[r + o + 1] && (u = 1),
                    (this[r + o] = (((t / f) >> 0) - u) & 255);
                return r + e;
              }),
              (i.prototype.writeInt8 = function (t, r, e) {
                return (
                  (t = +t),
                  (r >>>= 0),
                  e || O(this, t, r, 1, 127, -128),
                  t < 0 && (t = 255 + t + 1),
                  (this[r] = 255 & t),
                  r + 1
                );
              }),
              (i.prototype.writeInt16LE = function (t, r, e) {
                return (
                  (t = +t),
                  (r >>>= 0),
                  e || O(this, t, r, 2, 32767, -32768),
                  (this[r] = 255 & t),
                  (this[r + 1] = t >>> 8),
                  r + 2
                );
              }),
              (i.prototype.writeInt16BE = function (t, r, e) {
                return (
                  (t = +t),
                  (r >>>= 0),
                  e || O(this, t, r, 2, 32767, -32768),
                  (this[r] = t >>> 8),
                  (this[r + 1] = 255 & t),
                  r + 2
                );
              }),
              (i.prototype.writeInt32LE = function (t, r, e) {
                return (
                  (t = +t),
                  (r >>>= 0),
                  e || O(this, t, r, 4, 2147483647, -2147483648),
                  (this[r] = 255 & t),
                  (this[r + 1] = t >>> 8),
                  (this[r + 2] = t >>> 16),
                  (this[r + 3] = t >>> 24),
                  r + 4
                );
              }),
              (i.prototype.writeInt32BE = function (t, r, e) {
                return (
                  (t = +t),
                  (r >>>= 0),
                  e || O(this, t, r, 4, 2147483647, -2147483648),
                  t < 0 && (t = 4294967295 + t + 1),
                  (this[r] = t >>> 24),
                  (this[r + 1] = t >>> 16),
                  (this[r + 2] = t >>> 8),
                  (this[r + 3] = 255 & t),
                  r + 4
                );
              }),
              (i.prototype.writeFloatLE = function (t, r, e) {
                return N(this, t, r, !0, e);
              }),
              (i.prototype.writeFloatBE = function (t, r, e) {
                return N(this, t, r, !1, e);
              }),
              (i.prototype.writeDoubleLE = function (t, r, e) {
                return P(this, t, r, !0, e);
              }),
              (i.prototype.writeDoubleBE = function (t, r, e) {
                return P(this, t, r, !1, e);
              }),
              (i.prototype.copy = function (t, r, e, n) {
                if (!i.isBuffer(t))
                  throw new TypeError("argument should be a Buffer");
                if (
                  (e || (e = 0),
                  n || 0 === n || (n = this.length),
                  r >= t.length && (r = t.length),
                  r || (r = 0),
                  n > 0 && n < e && (n = e),
                  n === e)
                )
                  return 0;
                if (0 === t.length || 0 === this.length) return 0;
                if (r < 0) throw new RangeError("targetStart out of bounds");
                if (e < 0 || e >= this.length)
                  throw new RangeError("Index out of range");
                if (n < 0) throw new RangeError("sourceEnd out of bounds");
                n > this.length && (n = this.length),
                  t.length - r < n - e && (n = t.length - r + e);
                var o = n - e;
                if (
                  this === t &&
                  "function" == typeof Uint8Array.prototype.copyWithin
                )
                  this.copyWithin(r, e, n);
                else if (this === t && e < r && r < n)
                  for (var f = o - 1; f >= 0; --f) t[f + r] = this[f + e];
                else Uint8Array.prototype.set.call(t, this.subarray(e, n), r);
                return o;
              }),
              (i.prototype.fill = function (t, r, e, n) {
                if ("string" == typeof t) {
                  if (
                    ("string" == typeof r
                      ? ((n = r), (r = 0), (e = this.length))
                      : "string" == typeof e && ((n = e), (e = this.length)),
                    void 0 !== n && "string" != typeof n)
                  )
                    throw new TypeError("encoding must be a string");
                  if ("string" == typeof n && !i.isEncoding(n))
                    throw new TypeError("Unknown encoding: " + n);
                  if (1 === t.length) {
                    var o = t.charCodeAt(0);
                    (("utf8" === n && o < 128) || "latin1" === n) && (t = o);
                  }
                } else "number" == typeof t && (t &= 255);
                if (r < 0 || this.length < r || this.length < e)
                  throw new RangeError("Out of range index");
                if (e <= r) return this;
                var f;
                if (
                  ((r >>>= 0),
                  (e = void 0 === e ? this.length : e >>> 0),
                  t || (t = 0),
                  "number" == typeof t)
                )
                  for (f = r; f < e; ++f) this[f] = t;
                else {
                  var u = i.isBuffer(t) ? t : i.from(t, n),
                    s = u.length;
                  if (0 === s)
                    throw new TypeError(
                      'The value "' + t + '" is invalid for argument "value"'
                    );
                  for (f = 0; f < e - r; ++f) this[f + r] = u[f % s];
                }
                return this;
              });
            var K = /[^+/0-9A-Za-z-_]/g;
          }).call(this);
        }).call(this, t("buffer").Buffer);
      },
      { buffer: 2, ieee754: 3, "base64-js": 1 },
    ],
    3: [
      function (t, r, e) {
        (e.read = function (t, r, e, n, i) {
          var o,
            f,
            u = 8 * i - n - 1,
            s = (1 << u) - 1,
            h = s >> 1,
            a = -7,
            c = e ? i - 1 : 0,
            p = e ? -1 : 1,
            l = t[r + c];
          for (
            c += p, o = l & ((1 << -a) - 1), l >>= -a, a += u;
            a > 0;
            o = 256 * o + t[r + c], c += p, a -= 8
          );
          for (
            f = o & ((1 << -a) - 1), o >>= -a, a += n;
            a > 0;
            f = 256 * f + t[r + c], c += p, a -= 8
          );
          if (0 === o) o = 1 - h;
          else {
            if (o === s) return f ? NaN : (1 / 0) * (l ? -1 : 1);
            (f += Math.pow(2, n)), (o -= h);
          }
          return (l ? -1 : 1) * f * Math.pow(2, o - n);
        }),
          (e.write = function (t, r, e, n, i, o) {
            var f,
              u,
              s,
              h = 8 * o - i - 1,
              a = (1 << h) - 1,
              c = a >> 1,
              p = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
              l = n ? 0 : o - 1,
              y = n ? 1 : -1,
              g = r < 0 || (0 === r && 1 / r < 0) ? 1 : 0;
            for (
              r = Math.abs(r),
                isNaN(r) || r === 1 / 0
                  ? ((u = isNaN(r) ? 1 : 0), (f = a))
                  : ((f = Math.floor(Math.log(r) / Math.LN2)),
                    r * (s = Math.pow(2, -f)) < 1 && (f--, (s *= 2)),
                    (r += f + c >= 1 ? p / s : p * Math.pow(2, 1 - c)),
                    r * s >= 2 && (f++, (s /= 2)),
                    f + c >= a
                      ? ((u = 0), (f = a))
                      : f + c >= 1
                      ? ((u = (r * s - 1) * Math.pow(2, i)), (f += c))
                      : ((u = r * Math.pow(2, c - 1) * Math.pow(2, i)),
                        (f = 0)));
              i >= 8;
              t[e + l] = 255 & u, l += y, u /= 256, i -= 8
            );
            for (
              f = (f << i) | u, h += i;
              h > 0;
              t[e + l] = 255 & f, l += y, f /= 256, h -= 8
            );
            t[e + l - y] |= 128 * g;
          });
      },
      {},
    ],
  };
  return t(r, {}, [2]).Buffer;
});
