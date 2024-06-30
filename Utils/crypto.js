function loadCrypto() {
  function t(e, r, i) {
    function n(s, a) {
      if (!r[s]) {
        if (!e[s]) {
          var f = "function" == typeof require && require;
          if (!a && f) return f(s, !0);
          if (o) return o(s, !0);
          var h = new Error("Cannot find module '" + s + "'");
          throw ((h.code = "MODULE_NOT_FOUND"), h);
        }
        var u = (r[s] = { exports: {} });
        e[s][0].call(
          u.exports,
          function (t) {
            var r = e[s][1][t];
            return n(r || t);
          },
          u,
          u.exports,
          t,
          e,
          r,
          i
        );
      }
      return r[s].exports;
    }
    let s = {};
    for (
      var o = "function" == typeof require && require, a = 0;
      a < i.length;
      a++
    )
      Object.assign(s, n(i[a]));
    return s;
  }
  return t(utils, {}, [71]);
}
const utils = {
  1: [
    function (t, e, r) {
      "use strict";
      const i = r;
      (i.bignum = t("bn.js")),
        (i.define = t("./asn1/api").define),
        (i.base = t("./asn1/base")),
        (i.constants = t("./asn1/constants")),
        (i.decoders = t("./asn1/decoders")),
        (i.encoders = t("./asn1/encoders"));
    },
    {
      "./asn1/api": 2,
      "./asn1/base": 4,
      "./asn1/constants": 8,
      "./asn1/decoders": 10,
      "./asn1/encoders": 13,
      "bn.js": 15,
    },
  ],
  2: [
    function (t, e, r) {
      "use strict";
      function i(t, e) {
        (this.name = t),
          (this.body = e),
          (this.decoders = {}),
          (this.encoders = {});
      }
      const n = t("./encoders"),
        s = t("./decoders"),
        o = t("inherits"),
        a = r;
      (a.define = function (t, e) {
        return new i(t, e);
      }),
        (i.prototype._createNamed = function (t) {
          function e(t) {
            this._initNamed(t, r);
          }
          const r = this.name;
          return (
            o(e, t),
            (e.prototype._initNamed = function (e, r) {
              t.call(this, e, r);
            }),
            new e(this)
          );
        }),
        (i.prototype._getDecoder = function (t) {
          return (
            (t = t || "der"),
            this.decoders.hasOwnProperty(t) ||
              (this.decoders[t] = this._createNamed(s[t])),
            this.decoders[t]
          );
        }),
        (i.prototype.decode = function (t, e, r) {
          return this._getDecoder(e).decode(t, r);
        }),
        (i.prototype._getEncoder = function (t) {
          return (
            (t = t || "der"),
            this.encoders.hasOwnProperty(t) ||
              (this.encoders[t] = this._createNamed(n[t])),
            this.encoders[t]
          );
        }),
        (i.prototype.encode = function (t, e, r) {
          return this._getEncoder(e).encode(t, r);
        });
    },
    { "./decoders": 10, "./encoders": 13, inherits: 132 },
  ],
  3: [
    function (t, e, r) {
      "use strict";
      function i(t, e) {
        o.call(this, e),
          a.isBuffer(t)
            ? ((this.base = t), (this.offset = 0), (this.length = t.length))
            : this.error("Input not Buffer");
      }
      function n(t, e) {
        if (Array.isArray(t))
          (this.length = 0),
            (this.value = t.map(function (t) {
              return (
                n.isEncoderBuffer(t) || (t = new n(t, e)),
                (this.length += t.length),
                t
              );
            }, this));
        else if ("number" == typeof t) {
          if (!(0 <= t && t <= 255))
            return e.error("non-byte EncoderBuffer value");
          (this.value = t), (this.length = 1);
        } else if ("string" == typeof t)
          (this.value = t), (this.length = a.byteLength(t));
        else {
          if (!a.isBuffer(t)) return e.error("Unsupported type: " + typeof t);
          (this.value = t), (this.length = t.length);
        }
      }
      const s = t("inherits"),
        o = t("../base/reporter").Reporter,
        a = t("safer-buffer").Buffer;
      s(i, o),
        (r.DecoderBuffer = i),
        (i.isDecoderBuffer = function (t) {
          if (t instanceof i) return !0;
          const e =
            "object" == typeof t &&
            a.isBuffer(t.base) &&
            "DecoderBuffer" === t.constructor.name &&
            "number" == typeof t.offset &&
            "number" == typeof t.length &&
            "function" == typeof t.save &&
            "function" == typeof t.restore &&
            "function" == typeof t.isEmpty &&
            "function" == typeof t.readUInt8 &&
            "function" == typeof t.skip &&
            "function" == typeof t.raw;
          return e;
        }),
        (i.prototype.save = function () {
          return { offset: this.offset, reporter: o.prototype.save.call(this) };
        }),
        (i.prototype.restore = function (t) {
          const e = new i(this.base);
          return (
            (e.offset = t.offset),
            (e.length = this.offset),
            (this.offset = t.offset),
            o.prototype.restore.call(this, t.reporter),
            e
          );
        }),
        (i.prototype.isEmpty = function () {
          return this.offset === this.length;
        }),
        (i.prototype.readUInt8 = function (t) {
          return this.offset + 1 <= this.length
            ? this.base.readUInt8(this.offset++, !0)
            : this.error(t || "DecoderBuffer overrun");
        }),
        (i.prototype.skip = function (t, e) {
          if (!(this.offset + t <= this.length))
            return this.error(e || "DecoderBuffer overrun");
          const r = new i(this.base);
          return (
            (r._reporterState = this._reporterState),
            (r.offset = this.offset),
            (r.length = this.offset + t),
            (this.offset += t),
            r
          );
        }),
        (i.prototype.raw = function (t) {
          return this.base.slice(t ? t.offset : this.offset, this.length);
        }),
        (r.EncoderBuffer = n),
        (n.isEncoderBuffer = function (t) {
          if (t instanceof n) return !0;
          const e =
            "object" == typeof t &&
            "EncoderBuffer" === t.constructor.name &&
            "number" == typeof t.length &&
            "function" == typeof t.join;
          return e;
        }),
        (n.prototype.join = function (t, e) {
          return (
            t || (t = a.alloc(this.length)),
            e || (e = 0),
            0 === this.length
              ? t
              : (Array.isArray(this.value)
                  ? this.value.forEach(function (r) {
                      r.join(t, e), (e += r.length);
                    })
                  : ("number" == typeof this.value
                      ? (t[e] = this.value)
                      : "string" == typeof this.value
                      ? t.write(this.value, e)
                      : a.isBuffer(this.value) && this.value.copy(t, e),
                    (e += this.length)),
                t)
          );
        });
    },
    { "../base/reporter": 6, inherits: 132, "safer-buffer": 161 },
  ],
  4: [
    function (t, e, r) {
      "use strict";
      const i = r;
      (i.Reporter = t("./reporter").Reporter),
        (i.DecoderBuffer = t("./buffer").DecoderBuffer),
        (i.EncoderBuffer = t("./buffer").EncoderBuffer),
        (i.Node = t("./node"));
    },
    { "./buffer": 3, "./node": 5, "./reporter": 6 },
  ],
  5: [
    function (t, e, r) {
      "use strict";
      function i(t, e, r) {
        const i = {};
        (this._baseState = i),
          (i.name = r),
          (i.enc = t),
          (i.parent = e || null),
          (i.children = null),
          (i.tag = null),
          (i.args = null),
          (i.reverseArgs = null),
          (i.choice = null),
          (i.optional = !1),
          (i.any = !1),
          (i.obj = !1),
          (i.use = null),
          (i.useDecoder = null),
          (i.key = null),
          (i.default = null),
          (i.explicit = null),
          (i.implicit = null),
          (i.contains = null),
          i.parent || ((i.children = []), this._wrap());
      }
      const n = t("../base/reporter").Reporter,
        s = t("../base/buffer").EncoderBuffer,
        o = t("../base/buffer").DecoderBuffer,
        a = t("minimalistic-assert"),
        f = [
          "seq",
          "seqof",
          "set",
          "setof",
          "objid",
          "bool",
          "gentime",
          "utctime",
          "null_",
          "enum",
          "int",
          "objDesc",
          "bitstr",
          "bmpstr",
          "charstr",
          "genstr",
          "graphstr",
          "ia5str",
          "iso646str",
          "numstr",
          "octstr",
          "printstr",
          "t61str",
          "unistr",
          "utf8str",
          "videostr",
        ],
        h = [
          "key",
          "obj",
          "use",
          "optional",
          "explicit",
          "implicit",
          "def",
          "choice",
          "any",
          "contains",
        ].concat(f),
        u = [
          "_peekTag",
          "_decodeTag",
          "_use",
          "_decodeStr",
          "_decodeObjid",
          "_decodeTime",
          "_decodeNull",
          "_decodeInt",
          "_decodeBool",
          "_decodeList",
          "_encodeComposite",
          "_encodeStr",
          "_encodeObjid",
          "_encodeTime",
          "_encodeNull",
          "_encodeInt",
          "_encodeBool",
        ];
      e.exports = i;
      const c = [
        "enc",
        "parent",
        "children",
        "tag",
        "args",
        "reverseArgs",
        "choice",
        "optional",
        "any",
        "obj",
        "use",
        "alteredUse",
        "key",
        "default",
        "explicit",
        "implicit",
        "contains",
      ];
      (i.prototype.clone = function () {
        const t = this._baseState,
          e = {};
        c.forEach(function (r) {
          e[r] = t[r];
        });
        const r = new this.constructor(e.parent);
        return (r._baseState = e), r;
      }),
        (i.prototype._wrap = function () {
          const t = this._baseState;
          h.forEach(function (e) {
            this[e] = function () {
              const r = new this.constructor(this);
              return t.children.push(r), r[e].apply(r, arguments);
            };
          }, this);
        }),
        (i.prototype._init = function (t) {
          const e = this._baseState;
          a(null === e.parent),
            t.call(this),
            (e.children = e.children.filter(function (t) {
              return t._baseState.parent === this;
            }, this)),
            a.equal(e.children.length, 1, "Root node can have only one child");
        }),
        (i.prototype._useArgs = function (t) {
          const e = this._baseState,
            r = t.filter(function (t) {
              return t instanceof this.constructor;
            }, this);
          (t = t.filter(function (t) {
            return !(t instanceof this.constructor);
          }, this)),
            0 !== r.length &&
              (a(null === e.children),
              (e.children = r),
              r.forEach(function (t) {
                t._baseState.parent = this;
              }, this)),
            0 !== t.length &&
              (a(null === e.args),
              (e.args = t),
              (e.reverseArgs = t.map(function (t) {
                if ("object" != typeof t || t.constructor !== Object) return t;
                const e = {};
                return (
                  Object.keys(t).forEach(function (r) {
                    r == (0 | r) && (r |= 0);
                    const i = t[r];
                    e[i] = r;
                  }),
                  e
                );
              })));
        }),
        u.forEach(function (t) {
          i.prototype[t] = function () {
            const e = this._baseState;
            throw new Error(t + " not implemented for encoding: " + e.enc);
          };
        }),
        f.forEach(function (t) {
          i.prototype[t] = function () {
            const e = this._baseState,
              r = Array.prototype.slice.call(arguments);
            return a(null === e.tag), (e.tag = t), this._useArgs(r), this;
          };
        }),
        (i.prototype.use = function (t) {
          a(t);
          const e = this._baseState;
          return a(null === e.use), (e.use = t), this;
        }),
        (i.prototype.optional = function () {
          const t = this._baseState;
          return (t.optional = !0), this;
        }),
        (i.prototype.def = function (t) {
          const e = this._baseState;
          return (
            a(null === e.default), (e.default = t), (e.optional = !0), this
          );
        }),
        (i.prototype.explicit = function (t) {
          const e = this._baseState;
          return (
            a(null === e.explicit && null === e.implicit),
            (e.explicit = t),
            this
          );
        }),
        (i.prototype.implicit = function (t) {
          const e = this._baseState;
          return (
            a(null === e.explicit && null === e.implicit),
            (e.implicit = t),
            this
          );
        }),
        (i.prototype.obj = function () {
          const t = this._baseState,
            e = Array.prototype.slice.call(arguments);
          return (t.obj = !0), 0 !== e.length && this._useArgs(e), this;
        }),
        (i.prototype.key = function (t) {
          const e = this._baseState;
          return a(null === e.key), (e.key = t), this;
        }),
        (i.prototype.any = function () {
          const t = this._baseState;
          return (t.any = !0), this;
        }),
        (i.prototype.choice = function (t) {
          const e = this._baseState;
          return (
            a(null === e.choice),
            (e.choice = t),
            this._useArgs(
              Object.keys(t).map(function (e) {
                return t[e];
              })
            ),
            this
          );
        }),
        (i.prototype.contains = function (t) {
          const e = this._baseState;
          return a(null === e.use), (e.contains = t), this;
        }),
        (i.prototype._decode = function (t, e) {
          const r = this._baseState;
          if (null === r.parent)
            return t.wrapResult(r.children[0]._decode(t, e));
          let i,
            n = r.default,
            s = !0,
            a = null;
          if ((null !== r.key && (a = t.enterKey(r.key)), r.optional)) {
            let i = null;
            if (
              (null !== r.explicit
                ? (i = r.explicit)
                : null !== r.implicit
                ? (i = r.implicit)
                : null !== r.tag && (i = r.tag),
              null !== i || r.any)
            ) {
              if (((s = this._peekTag(t, i, r.any)), t.isError(s))) return s;
            } else {
              const i = t.save();
              try {
                null === r.choice
                  ? this._decodeGeneric(r.tag, t, e)
                  : this._decodeChoice(t, e),
                  (s = !0);
              } catch (t) {
                s = !1;
              }
              t.restore(i);
            }
          }
          if ((r.obj && s && (i = t.enterObject()), s)) {
            if (null !== r.explicit) {
              const e = this._decodeTag(t, r.explicit);
              if (t.isError(e)) return e;
              t = e;
            }
            const i = t.offset;
            if (null === r.use && null === r.choice) {
              let e;
              r.any && (e = t.save());
              const i = this._decodeTag(
                t,
                null !== r.implicit ? r.implicit : r.tag,
                r.any
              );
              if (t.isError(i)) return i;
              r.any ? (n = t.raw(e)) : (t = i);
            }
            if (
              (e &&
                e.track &&
                null !== r.tag &&
                e.track(t.path(), i, t.length, "tagged"),
              e &&
                e.track &&
                null !== r.tag &&
                e.track(t.path(), t.offset, t.length, "content"),
              r.any ||
                (n =
                  null === r.choice
                    ? this._decodeGeneric(r.tag, t, e)
                    : this._decodeChoice(t, e)),
              t.isError(n))
            )
              return n;
            if (
              (r.any ||
                null !== r.choice ||
                null === r.children ||
                r.children.forEach(function (r) {
                  r._decode(t, e);
                }),
              r.contains && ("octstr" === r.tag || "bitstr" === r.tag))
            ) {
              const i = new o(n);
              n = this._getUse(r.contains, t._reporterState.obj)._decode(i, e);
            }
          }
          return (
            r.obj && s && (n = t.leaveObject(i)),
            null === r.key || (null === n && !0 !== s)
              ? null !== a && t.exitKey(a)
              : t.leaveKey(a, r.key, n),
            n
          );
        }),
        (i.prototype._decodeGeneric = function (t, e, r) {
          const i = this._baseState;
          return "seq" === t || "set" === t
            ? null
            : "seqof" === t || "setof" === t
            ? this._decodeList(e, t, i.args[0], r)
            : /str$/.test(t)
            ? this._decodeStr(e, t, r)
            : "objid" === t && i.args
            ? this._decodeObjid(e, i.args[0], i.args[1], r)
            : "objid" === t
            ? this._decodeObjid(e, null, null, r)
            : "gentime" === t || "utctime" === t
            ? this._decodeTime(e, t, r)
            : "null_" === t
            ? this._decodeNull(e, r)
            : "bool" === t
            ? this._decodeBool(e, r)
            : "objDesc" === t
            ? this._decodeStr(e, t, r)
            : "int" === t || "enum" === t
            ? this._decodeInt(e, i.args && i.args[0], r)
            : null !== i.use
            ? this._getUse(i.use, e._reporterState.obj)._decode(e, r)
            : e.error("unknown tag: " + t);
        }),
        (i.prototype._getUse = function (t, e) {
          const r = this._baseState;
          return (
            (r.useDecoder = this._use(t, e)),
            a(null === r.useDecoder._baseState.parent),
            (r.useDecoder = r.useDecoder._baseState.children[0]),
            r.implicit !== r.useDecoder._baseState.implicit &&
              ((r.useDecoder = r.useDecoder.clone()),
              (r.useDecoder._baseState.implicit = r.implicit)),
            r.useDecoder
          );
        }),
        (i.prototype._decodeChoice = function (t, e) {
          const r = this._baseState;
          let i = null,
            n = !1;
          return (
            Object.keys(r.choice).some(function (s) {
              const o = t.save(),
                a = r.choice[s];
              try {
                const r = a._decode(t, e);
                if (t.isError(r)) return !1;
                (i = { type: s, value: r }), (n = !0);
              } catch (e) {
                return t.restore(o), !1;
              }
              return !0;
            }, this),
            n ? i : t.error("Choice not matched")
          );
        }),
        (i.prototype._createEncoderBuffer = function (t) {
          return new s(t, this.reporter);
        }),
        (i.prototype._encode = function (t, e, r) {
          const i = this._baseState;
          if (null !== i.default && i.default === t) return;
          const n = this._encodeValue(t, e, r);
          return void 0 === n || this._skipDefault(n, e, r) ? void 0 : n;
        }),
        (i.prototype._encodeValue = function (t, e, r) {
          const i = this._baseState;
          if (null === i.parent) return i.children[0]._encode(t, e || new n());
          let s = null;
          if (((this.reporter = e), i.optional && void 0 === t)) {
            if (null === i.default) return;
            t = i.default;
          }
          let o = null,
            a = !1;
          if (i.any) s = this._createEncoderBuffer(t);
          else if (i.choice) s = this._encodeChoice(t, e);
          else if (i.contains)
            (o = this._getUse(i.contains, r)._encode(t, e)), (a = !0);
          else if (i.children)
            (o = i.children
              .map(function (r) {
                if ("null_" === r._baseState.tag) return r._encode(null, e, t);
                if (null === r._baseState.key)
                  return e.error("Child should have a key");
                const i = e.enterKey(r._baseState.key);
                if ("object" != typeof t)
                  return e.error("Child expected, but input is not object");
                const n = r._encode(t[r._baseState.key], e, t);
                return e.leaveKey(i), n;
              }, this)
              .filter(function (t) {
                return t;
              })),
              (o = this._createEncoderBuffer(o));
          else if ("seqof" === i.tag || "setof" === i.tag) {
            if (!i.args || 1 !== i.args.length)
              return e.error("Too many args for : " + i.tag);
            if (!Array.isArray(t))
              return e.error("seqof/setof, but data is not Array");
            const r = this.clone();
            (r._baseState.implicit = null),
              (o = this._createEncoderBuffer(
                t.map(function (r) {
                  const i = this._baseState;
                  return this._getUse(i.args[0], t)._encode(r, e);
                }, r)
              ));
          } else
            null !== i.use
              ? (s = this._getUse(i.use, r)._encode(t, e))
              : ((o = this._encodePrimitive(i.tag, t)), (a = !0));
          if (!i.any && null === i.choice) {
            const t = null !== i.implicit ? i.implicit : i.tag,
              r = null === i.implicit ? "universal" : "context";
            null === t
              ? null === i.use &&
                e.error("Tag could be omitted only for .use()")
              : null === i.use && (s = this._encodeComposite(t, a, r, o));
          }
          return (
            null !== i.explicit &&
              (s = this._encodeComposite(i.explicit, !1, "context", s)),
            s
          );
        }),
        (i.prototype._encodeChoice = function (t, e) {
          const r = this._baseState,
            i = r.choice[t.type];
          return (
            i ||
              a(
                !1,
                t.type +
                  " not found in " +
                  JSON.stringify(Object.keys(r.choice))
              ),
            i._encode(t.value, e)
          );
        }),
        (i.prototype._encodePrimitive = function (t, e) {
          const r = this._baseState;
          if (/str$/.test(t)) return this._encodeStr(e, t);
          if ("objid" === t && r.args)
            return this._encodeObjid(e, r.reverseArgs[0], r.args[1]);
          if ("objid" === t) return this._encodeObjid(e, null, null);
          if ("gentime" === t || "utctime" === t) return this._encodeTime(e, t);
          if ("null_" === t) return this._encodeNull();
          if ("int" === t || "enum" === t)
            return this._encodeInt(e, r.args && r.reverseArgs[0]);
          if ("bool" === t) return this._encodeBool(e);
          if ("objDesc" === t) return this._encodeStr(e, t);
          throw new Error("Unsupported tag: " + t);
        }),
        (i.prototype._isNumstr = function (t) {
          return /^[0-9 ]*$/.test(t);
        }),
        (i.prototype._isPrintstr = function (t) {
          return /^[A-Za-z0-9 '()+,-./:=?]*$/.test(t);
        });
    },
    { "../base/buffer": 3, "../base/reporter": 6, "minimalistic-assert": 136 },
  ],
  6: [
    function (t, e, r) {
      "use strict";
      function i(t) {
        this._reporterState = {
          obj: null,
          path: [],
          options: t || {},
          errors: [],
        };
      }
      function n(t, e) {
        (this.path = t), this.rethrow(e);
      }
      const s = t("inherits");
      (r.Reporter = i),
        (i.prototype.isError = function (t) {
          return t instanceof n;
        }),
        (i.prototype.save = function () {
          const t = this._reporterState;
          return { obj: t.obj, pathLen: t.path.length };
        }),
        (i.prototype.restore = function (t) {
          const e = this._reporterState;
          (e.obj = t.obj), (e.path = e.path.slice(0, t.pathLen));
        }),
        (i.prototype.enterKey = function (t) {
          return this._reporterState.path.push(t);
        }),
        (i.prototype.exitKey = function (t) {
          const e = this._reporterState;
          e.path = e.path.slice(0, t - 1);
        }),
        (i.prototype.leaveKey = function (t, e, r) {
          const i = this._reporterState;
          this.exitKey(t), null !== i.obj && (i.obj[e] = r);
        }),
        (i.prototype.path = function () {
          return this._reporterState.path.join("/");
        }),
        (i.prototype.enterObject = function () {
          const t = this._reporterState,
            e = t.obj;
          return (t.obj = {}), e;
        }),
        (i.prototype.leaveObject = function (t) {
          const e = this._reporterState,
            r = e.obj;
          return (e.obj = t), r;
        }),
        (i.prototype.error = function (t) {
          let e;
          const r = this._reporterState,
            i = t instanceof n;
          if (
            ((e = i
              ? t
              : new n(
                  r.path
                    .map(function (t) {
                      return "[" + JSON.stringify(t) + "]";
                    })
                    .join(""),
                  t.message || t,
                  t.stack
                )),
            !r.options.partial)
          )
            throw e;
          return i || r.errors.push(e), e;
        }),
        (i.prototype.wrapResult = function (t) {
          const e = this._reporterState;
          return e.options.partial
            ? { result: this.isError(t) ? null : t, errors: e.errors }
            : t;
        }),
        s(n, Error),
        (n.prototype.rethrow = function (t) {
          if (
            ((this.message = t + " at: " + (this.path || "(shallow)")),
            Error.captureStackTrace && Error.captureStackTrace(this, n),
            !this.stack)
          )
            try {
              throw new Error(this.message);
            } catch (t) {
              this.stack = t.stack;
            }
          return this;
        });
    },
    { inherits: 132 },
  ],
  7: [
    function (t, e, r) {
      "use strict";
      function i(t) {
        const e = {};
        return (
          Object.keys(t).forEach(function (r) {
            (0 | r) == r && (r |= 0);
            const i = t[r];
            e[i] = r;
          }),
          e
        );
      }
      (r.tagClass = {
        0: "universal",
        1: "application",
        2: "context",
        3: "private",
      }),
        (r.tagClassByName = i(r.tagClass)),
        (r.tag = {
          0: "end",
          1: "bool",
          2: "int",
          3: "bitstr",
          4: "octstr",
          5: "null_",
          6: "objid",
          7: "objDesc",
          8: "external",
          9: "real",
          10: "enum",
          11: "embed",
          12: "utf8str",
          13: "relativeOid",
          16: "seq",
          17: "set",
          18: "numstr",
          19: "printstr",
          20: "t61str",
          21: "videostr",
          22: "ia5str",
          23: "utctime",
          24: "gentime",
          25: "graphstr",
          26: "iso646str",
          27: "genstr",
          28: "unistr",
          29: "charstr",
          30: "bmpstr",
        }),
        (r.tagByName = i(r.tag));
    },
    {},
  ],
  8: [
    function (t, e, r) {
      "use strict";
      const i = r;
      (i._reverse = function (t) {
        const e = {};
        return (
          Object.keys(t).forEach(function (r) {
            (0 | r) == r && (r |= 0);
            const i = t[r];
            e[i] = r;
          }),
          e
        );
      }),
        (i.der = t("./der"));
    },
    { "./der": 7 },
  ],
  9: [
    function (t, e, r) {
      "use strict";
      function i(t) {
        (this.enc = "der"),
          (this.name = t.name),
          (this.entity = t),
          (this.tree = new n()),
          this.tree._init(t.body);
      }
      function n(t) {
        u.call(this, "der", t);
      }
      function s(t, e) {
        let r = t.readUInt8(e);
        if (t.isError(r)) return r;
        const i = c.tagClass[r >> 6],
          n = 0 == (32 & r);
        if (31 == (31 & r)) {
          let i = r;
          for (r = 0; 128 == (128 & i); ) {
            if (((i = t.readUInt8(e)), t.isError(i))) return i;
            (r <<= 7), (r |= 127 & i);
          }
        } else r &= 31;
        const s = c.tag[r];
        return { cls: i, primitive: n, tag: r, tagStr: s };
      }
      function o(t, e, r) {
        let i = t.readUInt8(r);
        if (t.isError(i)) return i;
        if (!e && 128 === i) return null;
        if (0 == (128 & i)) return i;
        const n = 127 & i;
        if (n > 4) return t.error("length octect is too long");
        i = 0;
        for (let e = 0; e < n; e++) {
          i <<= 8;
          const e = t.readUInt8(r);
          if (t.isError(e)) return e;
          i |= e;
        }
        return i;
      }
      const a = t("inherits"),
        f = t("bn.js"),
        h = t("../base/buffer").DecoderBuffer,
        u = t("../base/node"),
        c = t("../constants/der");
      (e.exports = i),
        (i.prototype.decode = function (t, e) {
          return (
            h.isDecoderBuffer(t) || (t = new h(t, e)), this.tree._decode(t, e)
          );
        }),
        a(n, u),
        (n.prototype._peekTag = function (t, e, r) {
          if (t.isEmpty()) return !1;
          const i = t.save(),
            n = s(t, 'Failed to peek tag: "' + e + '"');
          return t.isError(n)
            ? n
            : (t.restore(i),
              n.tag === e || n.tagStr === e || n.tagStr + "of" === e || r);
        }),
        (n.prototype._decodeTag = function (t, e, r) {
          const i = s(t, 'Failed to decode tag of "' + e + '"');
          if (t.isError(i)) return i;
          let n = o(t, i.primitive, 'Failed to get length of "' + e + '"');
          if (t.isError(n)) return n;
          if (!r && i.tag !== e && i.tagStr !== e && i.tagStr + "of" !== e)
            return t.error('Failed to match tag: "' + e + '"');
          if (i.primitive || null !== n)
            return t.skip(n, 'Failed to match body of: "' + e + '"');
          const a = t.save(),
            f = this._skipUntilEnd(
              t,
              'Failed to skip indefinite length body: "' + this.tag + '"'
            );
          return t.isError(f)
            ? f
            : ((n = t.offset - a.offset),
              t.restore(a),
              t.skip(n, 'Failed to match body of: "' + e + '"'));
        }),
        (n.prototype._skipUntilEnd = function (t, e) {
          for (;;) {
            const r = s(t, e);
            if (t.isError(r)) return r;
            const i = o(t, r.primitive, e);
            if (t.isError(i)) return i;
            let n;
            if (
              ((n =
                r.primitive || null !== i
                  ? t.skip(i)
                  : this._skipUntilEnd(t, e)),
              t.isError(n))
            )
              return n;
            if ("end" === r.tagStr) break;
          }
        }),
        (n.prototype._decodeList = function (t, e, r, i) {
          const n = [];
          for (; !t.isEmpty(); ) {
            const e = this._peekTag(t, "end");
            if (t.isError(e)) return e;
            const s = r.decode(t, "der", i);
            if (t.isError(s) && e) break;
            n.push(s);
          }
          return n;
        }),
        (n.prototype._decodeStr = function (t, e) {
          if ("bitstr" === e) {
            const e = t.readUInt8();
            return t.isError(e) ? e : { unused: e, data: t.raw() };
          }
          if ("bmpstr" === e) {
            const e = t.raw();
            if (e.length % 2 == 1)
              return t.error("Decoding of string type: bmpstr length mismatch");
            let r = "";
            for (let t = 0; t < e.length / 2; t++)
              r += String.fromCharCode(e.readUInt16BE(2 * t));
            return r;
          }
          if ("numstr" === e) {
            const e = t.raw().toString("ascii");
            return this._isNumstr(e)
              ? e
              : t.error(
                  "Decoding of string type: numstr unsupported characters"
                );
          }
          if ("octstr" === e) return t.raw();
          if ("objDesc" === e) return t.raw();
          if ("printstr" === e) {
            const e = t.raw().toString("ascii");
            return this._isPrintstr(e)
              ? e
              : t.error(
                  "Decoding of string type: printstr unsupported characters"
                );
          }
          return /str$/.test(e)
            ? t.raw().toString()
            : t.error("Decoding of string type: " + e + " unsupported");
        }),
        (n.prototype._decodeObjid = function (t, e, r) {
          let i;
          const n = [];
          let s = 0,
            o = 0;
          for (; !t.isEmpty(); )
            (o = t.readUInt8()),
              (s <<= 7),
              (s |= 127 & o),
              0 == (128 & o) && (n.push(s), (s = 0));
          128 & o && n.push(s);
          const a = (n[0] / 40) | 0,
            f = n[0] % 40;
          if (((i = r ? n : [a, f].concat(n.slice(1))), e)) {
            let t = e[i.join(" ")];
            void 0 === t && (t = e[i.join(".")]), void 0 !== t && (i = t);
          }
          return i;
        }),
        (n.prototype._decodeTime = function (t, e) {
          const r = t.raw().toString();
          let i, n, s, o, a, f;
          if ("gentime" === e)
            (i = 0 | r.slice(0, 4)),
              (n = 0 | r.slice(4, 6)),
              (s = 0 | r.slice(6, 8)),
              (o = 0 | r.slice(8, 10)),
              (a = 0 | r.slice(10, 12)),
              (f = 0 | r.slice(12, 14));
          else {
            if ("utctime" !== e)
              return t.error("Decoding " + e + " time is not supported yet");
            (i = 0 | r.slice(0, 2)),
              (n = 0 | r.slice(2, 4)),
              (s = 0 | r.slice(4, 6)),
              (o = 0 | r.slice(6, 8)),
              (a = 0 | r.slice(8, 10)),
              (f = 0 | r.slice(10, 12)),
              (i = i < 70 ? 2e3 + i : 1900 + i);
          }
          return Date.UTC(i, n - 1, s, o, a, f, 0);
        }),
        (n.prototype._decodeNull = function () {
          return null;
        }),
        (n.prototype._decodeBool = function (t) {
          const e = t.readUInt8();
          return t.isError(e) ? e : 0 !== e;
        }),
        (n.prototype._decodeInt = function (t, e) {
          const r = t.raw();
          let i = new f(r);
          return e && (i = e[i.toString(10)] || i), i;
        }),
        (n.prototype._use = function (t, e) {
          return (
            "function" == typeof t && (t = t(e)), t._getDecoder("der").tree
          );
        });
    },
    {
      "../base/buffer": 3,
      "../base/node": 5,
      "../constants/der": 7,
      "bn.js": 15,
      inherits: 132,
    },
  ],
  10: [
    function (t, e, r) {
      "use strict";
      const i = r;
      (i.der = t("./der")), (i.pem = t("./pem"));
    },
    { "./der": 9, "./pem": 11 },
  ],
  11: [
    function (t, e, r) {
      "use strict";
      function i(t) {
        o.call(this, t), (this.enc = "pem");
      }
      const n = t("inherits"),
        s = t("safer-buffer").Buffer,
        o = t("./der");
      n(i, o),
        (e.exports = i),
        (i.prototype.decode = function (t, e) {
          const r = t.toString().split(/[\r\n]+/g),
            i = e.label.toUpperCase(),
            n = /^-----(BEGIN|END) ([^-]+)-----$/;
          let a = -1,
            f = -1;
          for (let t = 0; t < r.length; t++) {
            const e = r[t].match(n);
            if (null !== e && e[2] === i) {
              if (-1 !== a) {
                if ("END" !== e[1]) break;
                f = t;
                break;
              }
              if ("BEGIN" !== e[1]) break;
              a = t;
            }
          }
          if (-1 === a || -1 === f)
            throw new Error("PEM section not found for: " + i);
          const h = r.slice(a + 1, f).join("");
          h.replace(/[^a-z0-9+/=]+/gi, "");
          const u = s.from(h, "base64");
          return o.prototype.decode.call(this, u, e);
        });
    },
    { "./der": 9, inherits: 132, "safer-buffer": 161 },
  ],
  12: [
    function (t, e, r) {
      "use strict";
      function i(t) {
        (this.enc = "der"),
          (this.name = t.name),
          (this.entity = t),
          (this.tree = new n()),
          this.tree._init(t.body);
      }
      function n(t) {
        h.call(this, "der", t);
      }
      function s(t) {
        return t < 10 ? "0" + t : t;
      }
      function o(t, e, r, i) {
        let n;
        if (
          ("seqof" === t ? (t = "seq") : "setof" === t && (t = "set"),
          u.tagByName.hasOwnProperty(t))
        )
          n = u.tagByName[t];
        else {
          if ("number" != typeof t || (0 | t) !== t)
            return i.error("Unknown tag: " + t);
          n = t;
        }
        return n >= 31
          ? i.error("Multi-octet tag encoding unsupported")
          : (e || (n |= 32), (n |= u.tagClassByName[r || "universal"] << 6), n);
      }
      const a = t("inherits"),
        f = t("safer-buffer").Buffer,
        h = t("../base/node"),
        u = t("../constants/der");
      (e.exports = i),
        (i.prototype.encode = function (t, e) {
          return this.tree._encode(t, e).join();
        }),
        a(n, h),
        (n.prototype._encodeComposite = function (t, e, r, i) {
          const n = o(t, e, r, this.reporter);
          if (i.length < 128) {
            const t = f.alloc(2);
            return (
              (t[0] = n), (t[1] = i.length), this._createEncoderBuffer([t, i])
            );
          }
          let s = 1;
          for (let t = i.length; t >= 256; t >>= 8) s++;
          const a = f.alloc(2 + s);
          (a[0] = n), (a[1] = 128 | s);
          for (let t = 1 + s, e = i.length; e > 0; t--, e >>= 8) a[t] = 255 & e;
          return this._createEncoderBuffer([a, i]);
        }),
        (n.prototype._encodeStr = function (t, e) {
          if ("bitstr" === e)
            return this._createEncoderBuffer([0 | t.unused, t.data]);
          if ("bmpstr" === e) {
            const e = f.alloc(2 * t.length);
            for (let r = 0; r < t.length; r++)
              e.writeUInt16BE(t.charCodeAt(r), 2 * r);
            return this._createEncoderBuffer(e);
          }
          return "numstr" === e
            ? this._isNumstr(t)
              ? this._createEncoderBuffer(t)
              : this.reporter.error(
                  "Encoding of string type: numstr supports only digits and space"
                )
            : "printstr" === e
            ? this._isPrintstr(t)
              ? this._createEncoderBuffer(t)
              : this.reporter.error(
                  "Encoding of string type: printstr supports only latin upper and lower case letters, digits, space, apostrophe, left and rigth parenthesis, plus sign, comma, hyphen, dot, slash, colon, equal sign, question mark"
                )
            : /str$/.test(e)
            ? this._createEncoderBuffer(t)
            : "objDesc" === e
            ? this._createEncoderBuffer(t)
            : this.reporter.error(
                "Encoding of string type: " + e + " unsupported"
              );
        }),
        (n.prototype._encodeObjid = function (t, e, r) {
          if ("string" == typeof t) {
            if (!e)
              return this.reporter.error(
                "string objid given, but no values map found"
              );
            if (!e.hasOwnProperty(t))
              return this.reporter.error("objid not found in values map");
            t = e[t].split(/[\s.]+/g);
            for (let e = 0; e < t.length; e++) t[e] |= 0;
          } else if (Array.isArray(t)) {
            t = t.slice();
            for (let e = 0; e < t.length; e++) t[e] |= 0;
          }
          if (!Array.isArray(t))
            return this.reporter.error(
              "objid() should be either array or string, got: " +
                JSON.stringify(t)
            );
          if (!r) {
            if (t[1] >= 40)
              return this.reporter.error("Second objid identifier OOB");
            t.splice(0, 2, 40 * t[0] + t[1]);
          }
          let i = 0;
          for (let e = 0; e < t.length; e++) {
            let r = t[e];
            for (i++; r >= 128; r >>= 7) i++;
          }
          const n = f.alloc(i);
          let s = n.length - 1;
          for (let e = t.length - 1; e >= 0; e--) {
            let r = t[e];
            for (n[s--] = 127 & r; (r >>= 7) > 0; ) n[s--] = 128 | (127 & r);
          }
          return this._createEncoderBuffer(n);
        }),
        (n.prototype._encodeTime = function (t, e) {
          let r;
          const i = new Date(t);
          return (
            "gentime" === e
              ? (r = [
                  s(i.getUTCFullYear()),
                  s(i.getUTCMonth() + 1),
                  s(i.getUTCDate()),
                  s(i.getUTCHours()),
                  s(i.getUTCMinutes()),
                  s(i.getUTCSeconds()),
                  "Z",
                ].join(""))
              : "utctime" === e
              ? (r = [
                  s(i.getUTCFullYear() % 100),
                  s(i.getUTCMonth() + 1),
                  s(i.getUTCDate()),
                  s(i.getUTCHours()),
                  s(i.getUTCMinutes()),
                  s(i.getUTCSeconds()),
                  "Z",
                ].join(""))
              : this.reporter.error(
                  "Encoding " + e + " time is not supported yet"
                ),
            this._encodeStr(r, "octstr")
          );
        }),
        (n.prototype._encodeNull = function () {
          return this._createEncoderBuffer("");
        }),
        (n.prototype._encodeInt = function (t, e) {
          if ("string" == typeof t) {
            if (!e)
              return this.reporter.error(
                "String int or enum given, but no values map"
              );
            if (!e.hasOwnProperty(t))
              return this.reporter.error(
                "Values map doesn't contain: " + JSON.stringify(t)
              );
            t = e[t];
          }
          if ("number" != typeof t && !f.isBuffer(t)) {
            const e = t.toArray();
            !t.sign && 128 & e[0] && e.unshift(0), (t = f.from(e));
          }
          if (f.isBuffer(t)) {
            let e = t.length;
            0 === t.length && e++;
            const r = f.alloc(e);
            return (
              t.copy(r),
              0 === t.length && (r[0] = 0),
              this._createEncoderBuffer(r)
            );
          }
          if (t < 128) return this._createEncoderBuffer(t);
          if (t < 256) return this._createEncoderBuffer([0, t]);
          let r = 1;
          for (let e = t; e >= 256; e >>= 8) r++;
          const i = new Array(r);
          for (let e = i.length - 1; e >= 0; e--) (i[e] = 255 & t), (t >>= 8);
          return (
            128 & i[0] && i.unshift(0), this._createEncoderBuffer(f.from(i))
          );
        }),
        (n.prototype._encodeBool = function (t) {
          return this._createEncoderBuffer(t ? 255 : 0);
        }),
        (n.prototype._use = function (t, e) {
          return (
            "function" == typeof t && (t = t(e)), t._getEncoder("der").tree
          );
        }),
        (n.prototype._skipDefault = function (t, e, r) {
          const i = this._baseState;
          let n;
          if (null === i.default) return !1;
          const s = t.join();
          if (
            (void 0 === i.defaultBuffer &&
              (i.defaultBuffer = this._encodeValue(i.default, e, r).join()),
            s.length !== i.defaultBuffer.length)
          )
            return !1;
          for (n = 0; n < s.length; n++)
            if (s[n] !== i.defaultBuffer[n]) return !1;
          return !0;
        });
    },
    {
      "../base/node": 5,
      "../constants/der": 7,
      inherits: 132,
      "safer-buffer": 161,
    },
  ],
  13: [
    function (t, e, r) {
      "use strict";
      const i = r;
      (i.der = t("./der")), (i.pem = t("./pem"));
    },
    { "./der": 12, "./pem": 14 },
  ],
  14: [
    function (t, e, r) {
      "use strict";
      function i(t) {
        s.call(this, t), (this.enc = "pem");
      }
      const n = t("inherits"),
        s = t("./der");
      n(i, s),
        (e.exports = i),
        (i.prototype.encode = function (t, e) {
          const r = s.prototype.encode.call(this, t),
            i = r.toString("base64"),
            n = ["-----BEGIN " + e.label + "-----"];
          for (let t = 0; t < i.length; t += 64) n.push(i.slice(t, t + 64));
          return n.push("-----END " + e.label + "-----"), n.join("\n");
        });
    },
    { "./der": 12, inherits: 132 },
  ],
  15: [
    function (t, e, r) {
      (function (e, r) {
        "use strict";
        function i(t, e) {
          if (!t) throw new Error(e || "Assertion failed");
        }
        function n(t, e) {
          t.super_ = e;
          var r = function () {};
          (r.prototype = e.prototype),
            (t.prototype = new r()),
            (t.prototype.constructor = t);
        }
        function s(t, e, r) {
          if (s.isBN(t)) return t;
          (this.negative = 0),
            (this.words = null),
            (this.length = 0),
            (this.red = null),
            null !== t &&
              (("le" !== e && "be" !== e) || ((r = e), (e = 10)),
              this._init(t || 0, e || 10, r || "be"));
        }
        function o(t, e) {
          var r = t.charCodeAt(e);
          return r >= 65 && r <= 70
            ? r - 55
            : r >= 97 && r <= 102
            ? r - 87
            : (r - 48) & 15;
        }
        function a(t, e, r) {
          var i = o(t, r);
          return r - 1 >= e && (i |= o(t, r - 1) << 4), i;
        }
        function f(t, e, r, i) {
          for (var n = 0, s = Math.min(t.length, r), o = e; o < s; o++) {
            var a = t.charCodeAt(o) - 48;
            (n *= i), (n += a >= 49 ? a - 49 + 10 : a >= 17 ? a - 17 + 10 : a);
          }
          return n;
        }
        function h(t) {
          for (var e = new Array(t.bitLength()), r = 0; r < e.length; r++) {
            var i = (r / 26) | 0,
              n = r % 26;
            e[r] = (t.words[i] & (1 << n)) >>> n;
          }
          return e;
        }
        function u(t, e, r) {
          r.negative = e.negative ^ t.negative;
          var i = (t.length + e.length) | 0;
          (r.length = i), (i = (i - 1) | 0);
          var n = 0 | t.words[0],
            s = 0 | e.words[0],
            o = n * s,
            a = 67108863 & o,
            f = (o / 67108864) | 0;
          r.words[0] = a;
          for (var h = 1; h < i; h++) {
            for (
              var u = f >>> 26,
                c = 67108863 & f,
                d = Math.min(h, e.length - 1),
                l = Math.max(0, h - t.length + 1);
              l <= d;
              l++
            ) {
              var p = (h - l) | 0;
              (n = 0 | t.words[p]),
                (s = 0 | e.words[l]),
                (o = n * s + c),
                (u += (o / 67108864) | 0),
                (c = 67108863 & o);
            }
            (r.words[h] = 0 | c), (f = 0 | u);
          }
          return 0 !== f ? (r.words[h] = 0 | f) : r.length--, r.strip();
        }
        function c(t, e, r) {
          (r.negative = e.negative ^ t.negative),
            (r.length = t.length + e.length);
          for (var i = 0, n = 0, s = 0; s < r.length - 1; s++) {
            var o = n;
            n = 0;
            for (
              var a = 67108863 & i,
                f = Math.min(s, e.length - 1),
                h = Math.max(0, s - t.length + 1);
              h <= f;
              h++
            ) {
              var u = s - h,
                c = 0 | t.words[u],
                d = 0 | e.words[h],
                l = c * d,
                p = 67108863 & l;
              (o = (o + ((l / 67108864) | 0)) | 0),
                (p = (p + a) | 0),
                (a = 67108863 & p),
                (o = (o + (p >>> 26)) | 0),
                (n += o >>> 26),
                (o &= 67108863);
            }
            (r.words[s] = a), (i = o), (o = n);
          }
          return 0 !== i ? (r.words[s] = i) : r.length--, r.strip();
        }
        function d(t, e, r) {
          var i = new l();
          return i.mulp(t, e, r);
        }
        function l(t, e) {
          (this.x = t), (this.y = e);
        }
        function p(t, e) {
          (this.name = t),
            (this.p = new s(e, 16)),
            (this.n = this.p.bitLength()),
            (this.k = new s(1).iushln(this.n).isub(this.p)),
            (this.tmp = this._tmp());
        }
        function b() {
          p.call(
            this,
            "k256",
            "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
          );
        }
        function m() {
          p.call(
            this,
            "p224",
            "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
          );
        }
        function y() {
          p.call(
            this,
            "p192",
            "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
          );
        }
        function g() {
          p.call(
            this,
            "25519",
            "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
          );
        }
        function v(t) {
          if ("string" == typeof t) {
            var e = s._prime(t);
            (this.m = e.p), (this.prime = e);
          } else
            i(t.gtn(1), "modulus must be greater than 1"),
              (this.m = t),
              (this.prime = null);
        }
        function w(t) {
          v.call(this, t),
            (this.shift = this.m.bitLength()),
            this.shift % 26 != 0 && (this.shift += 26 - (this.shift % 26)),
            (this.r = new s(1).iushln(this.shift)),
            (this.r2 = this.imod(this.r.sqr())),
            (this.rinv = this.r._invmp(this.m)),
            (this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
            (this.minv = this.minv.umod(this.r)),
            (this.minv = this.r.sub(this.minv));
        }
        var _;
        "object" == typeof e ? (e.exports = s) : (r.BN = s),
          (s.BN = s),
          (s.wordSize = 26);
        try {
          _ =
            "undefined" != typeof window && void 0 !== window.Buffer
              ? window.Buffer
              : t("buffer").Buffer;
        } catch (t) {}
        (s.isBN = function (t) {
          return (
            t instanceof s ||
            (null !== t &&
              "object" == typeof t &&
              t.constructor.wordSize === s.wordSize &&
              Array.isArray(t.words))
          );
        }),
          (s.max = function (t, e) {
            return t.cmp(e) > 0 ? t : e;
          }),
          (s.min = function (t, e) {
            return t.cmp(e) < 0 ? t : e;
          }),
          (s.prototype._init = function (t, e, r) {
            if ("number" == typeof t) return this._initNumber(t, e, r);
            if ("object" == typeof t) return this._initArray(t, e, r);
            "hex" === e && (e = 16),
              i(e === (0 | e) && e >= 2 && e <= 36),
              (t = t.toString().replace(/\s+/g, ""));
            var n = 0;
            "-" === t[0] && (n++, (this.negative = 1)),
              n < t.length &&
                (16 === e
                  ? this._parseHex(t, n, r)
                  : (this._parseBase(t, e, n),
                    "le" === r && this._initArray(this.toArray(), e, r)));
          }),
          (s.prototype._initNumber = function (t, e, r) {
            t < 0 && ((this.negative = 1), (t = -t)),
              t < 67108864
                ? ((this.words = [67108863 & t]), (this.length = 1))
                : t < 4503599627370496
                ? ((this.words = [67108863 & t, (t / 67108864) & 67108863]),
                  (this.length = 2))
                : (i(t < 9007199254740992),
                  (this.words = [67108863 & t, (t / 67108864) & 67108863, 1]),
                  (this.length = 3)),
              "le" === r && this._initArray(this.toArray(), e, r);
          }),
          (s.prototype._initArray = function (t, e, r) {
            if ((i("number" == typeof t.length), t.length <= 0))
              return (this.words = [0]), (this.length = 1), this;
            (this.length = Math.ceil(t.length / 3)),
              (this.words = new Array(this.length));
            for (var n = 0; n < this.length; n++) this.words[n] = 0;
            var s,
              o,
              a = 0;
            if ("be" === r)
              for (n = t.length - 1, s = 0; n >= 0; n -= 3)
                (o = t[n] | (t[n - 1] << 8) | (t[n - 2] << 16)),
                  (this.words[s] |= (o << a) & 67108863),
                  (this.words[s + 1] = (o >>> (26 - a)) & 67108863),
                  (a += 24),
                  a >= 26 && ((a -= 26), s++);
            else if ("le" === r)
              for (n = 0, s = 0; n < t.length; n += 3)
                (o = t[n] | (t[n + 1] << 8) | (t[n + 2] << 16)),
                  (this.words[s] |= (o << a) & 67108863),
                  (this.words[s + 1] = (o >>> (26 - a)) & 67108863),
                  (a += 24),
                  a >= 26 && ((a -= 26), s++);
            return this.strip();
          }),
          (s.prototype._parseHex = function (t, e, r) {
            (this.length = Math.ceil((t.length - e) / 6)),
              (this.words = new Array(this.length));
            for (var i = 0; i < this.length; i++) this.words[i] = 0;
            var n,
              s = 0,
              o = 0;
            if ("be" === r)
              for (i = t.length - 1; i >= e; i -= 2)
                (n = a(t, e, i) << s),
                  (this.words[o] |= 67108863 & n),
                  s >= 18
                    ? ((s -= 18), (o += 1), (this.words[o] |= n >>> 26))
                    : (s += 8);
            else {
              var f = t.length - e;
              for (i = f % 2 == 0 ? e + 1 : e; i < t.length; i += 2)
                (n = a(t, e, i) << s),
                  (this.words[o] |= 67108863 & n),
                  s >= 18
                    ? ((s -= 18), (o += 1), (this.words[o] |= n >>> 26))
                    : (s += 8);
            }
            this.strip();
          }),
          (s.prototype._parseBase = function (t, e, r) {
            (this.words = [0]), (this.length = 1);
            for (var i = 0, n = 1; n <= 67108863; n *= e) i++;
            i--, (n = (n / e) | 0);
            for (
              var s = t.length - r,
                o = s % i,
                a = Math.min(s, s - o) + r,
                h = 0,
                u = r;
              u < a;
              u += i
            )
              (h = f(t, u, u + i, e)),
                this.imuln(n),
                this.words[0] + h < 67108864
                  ? (this.words[0] += h)
                  : this._iaddn(h);
            if (0 !== o) {
              var c = 1;
              for (h = f(t, u, t.length, e), u = 0; u < o; u++) c *= e;
              this.imuln(c),
                this.words[0] + h < 67108864
                  ? (this.words[0] += h)
                  : this._iaddn(h);
            }
            this.strip();
          }),
          (s.prototype.copy = function (t) {
            t.words = new Array(this.length);
            for (var e = 0; e < this.length; e++) t.words[e] = this.words[e];
            (t.length = this.length),
              (t.negative = this.negative),
              (t.red = this.red);
          }),
          (s.prototype.clone = function () {
            var t = new s(null);
            return this.copy(t), t;
          }),
          (s.prototype._expand = function (t) {
            for (; this.length < t; ) this.words[this.length++] = 0;
            return this;
          }),
          (s.prototype.strip = function () {
            for (; this.length > 1 && 0 === this.words[this.length - 1]; )
              this.length--;
            return this._normSign();
          }),
          (s.prototype._normSign = function () {
            return (
              1 === this.length && 0 === this.words[0] && (this.negative = 0),
              this
            );
          }),
          (s.prototype.inspect = function () {
            return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
          });
        var M = [
            "",
            "0",
            "00",
            "000",
            "0000",
            "00000",
            "000000",
            "0000000",
            "00000000",
            "000000000",
            "0000000000",
            "00000000000",
            "000000000000",
            "0000000000000",
            "00000000000000",
            "000000000000000",
            "0000000000000000",
            "00000000000000000",
            "000000000000000000",
            "0000000000000000000",
            "00000000000000000000",
            "000000000000000000000",
            "0000000000000000000000",
            "00000000000000000000000",
            "000000000000000000000000",
            "0000000000000000000000000",
          ],
          S = [
            0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6,
            5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
          ],
          E = [
            0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607,
            16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536,
            11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101,
            5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368,
            20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875,
            60466176,
          ];
        (s.prototype.toString = function (t, e) {
          var r;
          if (((t = t || 10), (e = 0 | e || 1), 16 === t || "hex" === t)) {
            r = "";
            for (var n = 0, s = 0, o = 0; o < this.length; o++) {
              var a = this.words[o],
                f = (16777215 & ((a << n) | s)).toString(16);
              (s = (a >>> (24 - n)) & 16777215),
                (r =
                  0 !== s || o !== this.length - 1
                    ? M[6 - f.length] + f + r
                    : f + r),
                (n += 2),
                n >= 26 && ((n -= 26), o--);
            }
            for (0 !== s && (r = s.toString(16) + r); r.length % e != 0; )
              r = "0" + r;
            return 0 !== this.negative && (r = "-" + r), r;
          }
          if (t === (0 | t) && t >= 2 && t <= 36) {
            var h = S[t],
              u = E[t];
            r = "";
            var c = this.clone();
            for (c.negative = 0; !c.isZero(); ) {
              var d = c.modn(u).toString(t);
              (c = c.idivn(u)),
                (r = c.isZero() ? d + r : M[h - d.length] + d + r);
            }
            for (this.isZero() && (r = "0" + r); r.length % e != 0; )
              r = "0" + r;
            return 0 !== this.negative && (r = "-" + r), r;
          }
          i(!1, "Base should be between 2 and 36");
        }),
          (s.prototype.toNumber = function () {
            var t = this.words[0];
            return (
              2 === this.length
                ? (t += 67108864 * this.words[1])
                : 3 === this.length && 1 === this.words[2]
                ? (t += 4503599627370496 + 67108864 * this.words[1])
                : this.length > 2 &&
                  i(!1, "Number can only safely store up to 53 bits"),
              0 !== this.negative ? -t : t
            );
          }),
          (s.prototype.toJSON = function () {
            return this.toString(16);
          }),
          (s.prototype.toBuffer = function (t, e) {
            return i(void 0 !== _), this.toArrayLike(_, t, e);
          }),
          (s.prototype.toArray = function (t, e) {
            return this.toArrayLike(Array, t, e);
          }),
          (s.prototype.toArrayLike = function (t, e, r) {
            var n = this.byteLength(),
              s = r || Math.max(1, n);
            i(n <= s, "byte array longer than desired length"),
              i(s > 0, "Requested array length <= 0"),
              this.strip();
            var o,
              a,
              f = "le" === e,
              h = new t(s),
              u = this.clone();
            if (f) {
              for (a = 0; !u.isZero(); a++)
                (o = u.andln(255)), u.iushrn(8), (h[a] = o);
              for (; a < s; a++) h[a] = 0;
            } else {
              for (a = 0; a < s - n; a++) h[a] = 0;
              for (a = 0; !u.isZero(); a++)
                (o = u.andln(255)), u.iushrn(8), (h[s - a - 1] = o);
            }
            return h;
          }),
          Math.clz32
            ? (s.prototype._countBits = function (t) {
                return 32 - Math.clz32(t);
              })
            : (s.prototype._countBits = function (t) {
                var e = t,
                  r = 0;
                return (
                  e >= 4096 && ((r += 13), (e >>>= 13)),
                  e >= 64 && ((r += 7), (e >>>= 7)),
                  e >= 8 && ((r += 4), (e >>>= 4)),
                  e >= 2 && ((r += 2), (e >>>= 2)),
                  r + e
                );
              }),
          (s.prototype._zeroBits = function (t) {
            if (0 === t) return 26;
            var e = t,
              r = 0;
            return (
              0 == (8191 & e) && ((r += 13), (e >>>= 13)),
              0 == (127 & e) && ((r += 7), (e >>>= 7)),
              0 == (15 & e) && ((r += 4), (e >>>= 4)),
              0 == (3 & e) && ((r += 2), (e >>>= 2)),
              0 == (1 & e) && r++,
              r
            );
          }),
          (s.prototype.bitLength = function () {
            var t = this.words[this.length - 1],
              e = this._countBits(t);
            return 26 * (this.length - 1) + e;
          }),
          (s.prototype.zeroBits = function () {
            if (this.isZero()) return 0;
            for (var t = 0, e = 0; e < this.length; e++) {
              var r = this._zeroBits(this.words[e]);
              if (((t += r), 26 !== r)) break;
            }
            return t;
          }),
          (s.prototype.byteLength = function () {
            return Math.ceil(this.bitLength() / 8);
          }),
          (s.prototype.toTwos = function (t) {
            return 0 !== this.negative
              ? this.abs().inotn(t).iaddn(1)
              : this.clone();
          }),
          (s.prototype.fromTwos = function (t) {
            return this.testn(t - 1)
              ? this.notn(t).iaddn(1).ineg()
              : this.clone();
          }),
          (s.prototype.isNeg = function () {
            return 0 !== this.negative;
          }),
          (s.prototype.neg = function () {
            return this.clone().ineg();
          }),
          (s.prototype.ineg = function () {
            return this.isZero() || (this.negative ^= 1), this;
          }),
          (s.prototype.iuor = function (t) {
            for (; this.length < t.length; ) this.words[this.length++] = 0;
            for (var e = 0; e < t.length; e++)
              this.words[e] = this.words[e] | t.words[e];
            return this.strip();
          }),
          (s.prototype.ior = function (t) {
            return i(0 == (this.negative | t.negative)), this.iuor(t);
          }),
          (s.prototype.or = function (t) {
            return this.length > t.length
              ? this.clone().ior(t)
              : t.clone().ior(this);
          }),
          (s.prototype.uor = function (t) {
            return this.length > t.length
              ? this.clone().iuor(t)
              : t.clone().iuor(this);
          }),
          (s.prototype.iuand = function (t) {
            var e;
            e = this.length > t.length ? t : this;
            for (var r = 0; r < e.length; r++)
              this.words[r] = this.words[r] & t.words[r];
            return (this.length = e.length), this.strip();
          }),
          (s.prototype.iand = function (t) {
            return i(0 == (this.negative | t.negative)), this.iuand(t);
          }),
          (s.prototype.and = function (t) {
            return this.length > t.length
              ? this.clone().iand(t)
              : t.clone().iand(this);
          }),
          (s.prototype.uand = function (t) {
            return this.length > t.length
              ? this.clone().iuand(t)
              : t.clone().iuand(this);
          }),
          (s.prototype.iuxor = function (t) {
            var e, r;
            this.length > t.length
              ? ((e = this), (r = t))
              : ((e = t), (r = this));
            for (var i = 0; i < r.length; i++)
              this.words[i] = e.words[i] ^ r.words[i];
            if (this !== e)
              for (; i < e.length; i++) this.words[i] = e.words[i];
            return (this.length = e.length), this.strip();
          }),
          (s.prototype.ixor = function (t) {
            return i(0 == (this.negative | t.negative)), this.iuxor(t);
          }),
          (s.prototype.xor = function (t) {
            return this.length > t.length
              ? this.clone().ixor(t)
              : t.clone().ixor(this);
          }),
          (s.prototype.uxor = function (t) {
            return this.length > t.length
              ? this.clone().iuxor(t)
              : t.clone().iuxor(this);
          }),
          (s.prototype.inotn = function (t) {
            i("number" == typeof t && t >= 0);
            var e = 0 | Math.ceil(t / 26),
              r = t % 26;
            this._expand(e), r > 0 && e--;
            for (var n = 0; n < e; n++)
              this.words[n] = 67108863 & ~this.words[n];
            return (
              r > 0 &&
                (this.words[n] = ~this.words[n] & (67108863 >> (26 - r))),
              this.strip()
            );
          }),
          (s.prototype.notn = function (t) {
            return this.clone().inotn(t);
          }),
          (s.prototype.setn = function (t, e) {
            i("number" == typeof t && t >= 0);
            var r = (t / 26) | 0,
              n = t % 26;
            return (
              this._expand(r + 1),
              (this.words[r] = e
                ? this.words[r] | (1 << n)
                : this.words[r] & ~(1 << n)),
              this.strip()
            );
          }),
          (s.prototype.iadd = function (t) {
            var e, r, i;
            if (0 !== this.negative && 0 === t.negative)
              return (
                (this.negative = 0),
                (e = this.isub(t)),
                (this.negative ^= 1),
                this._normSign()
              );
            if (0 === this.negative && 0 !== t.negative)
              return (
                (t.negative = 0),
                (e = this.isub(t)),
                (t.negative = 1),
                e._normSign()
              );
            this.length > t.length
              ? ((r = this), (i = t))
              : ((r = t), (i = this));
            for (var n = 0, s = 0; s < i.length; s++)
              (e = (0 | r.words[s]) + (0 | i.words[s]) + n),
                (this.words[s] = 67108863 & e),
                (n = e >>> 26);
            for (; 0 !== n && s < r.length; s++)
              (e = (0 | r.words[s]) + n),
                (this.words[s] = 67108863 & e),
                (n = e >>> 26);
            if (((this.length = r.length), 0 !== n))
              (this.words[this.length] = n), this.length++;
            else if (r !== this)
              for (; s < r.length; s++) this.words[s] = r.words[s];
            return this;
          }),
          (s.prototype.add = function (t) {
            var e;
            return 0 !== t.negative && 0 === this.negative
              ? ((t.negative = 0), (e = this.sub(t)), (t.negative ^= 1), e)
              : 0 === t.negative && 0 !== this.negative
              ? ((this.negative = 0), (e = t.sub(this)), (this.negative = 1), e)
              : this.length > t.length
              ? this.clone().iadd(t)
              : t.clone().iadd(this);
          }),
          (s.prototype.isub = function (t) {
            if (0 !== t.negative) {
              t.negative = 0;
              var e = this.iadd(t);
              return (t.negative = 1), e._normSign();
            }
            if (0 !== this.negative)
              return (
                (this.negative = 0),
                this.iadd(t),
                (this.negative = 1),
                this._normSign()
              );
            var r,
              i,
              n = this.cmp(t);
            if (0 === n)
              return (
                (this.negative = 0),
                (this.length = 1),
                (this.words[0] = 0),
                this
              );
            n > 0 ? ((r = this), (i = t)) : ((r = t), (i = this));
            for (var s = 0, o = 0; o < i.length; o++)
              (e = (0 | r.words[o]) - (0 | i.words[o]) + s),
                (s = e >> 26),
                (this.words[o] = 67108863 & e);
            for (; 0 !== s && o < r.length; o++)
              (e = (0 | r.words[o]) + s),
                (s = e >> 26),
                (this.words[o] = 67108863 & e);
            if (0 === s && o < r.length && r !== this)
              for (; o < r.length; o++) this.words[o] = r.words[o];
            return (
              (this.length = Math.max(this.length, o)),
              r !== this && (this.negative = 1),
              this.strip()
            );
          }),
          (s.prototype.sub = function (t) {
            return this.clone().isub(t);
          });
        var k = function (t, e, r) {
          var i,
            n,
            s,
            o = t.words,
            a = e.words,
            f = r.words,
            h = 0,
            u = 0 | o[0],
            c = 8191 & u,
            d = u >>> 13,
            l = 0 | o[1],
            p = 8191 & l,
            b = l >>> 13,
            m = 0 | o[2],
            y = 8191 & m,
            g = m >>> 13,
            v = 0 | o[3],
            w = 8191 & v,
            _ = v >>> 13,
            M = 0 | o[4],
            S = 8191 & M,
            E = M >>> 13,
            k = 0 | o[5],
            A = 8191 & k,
            x = k >>> 13,
            B = 0 | o[6],
            R = 8191 & B,
            I = B >>> 13,
            j = 0 | o[7],
            T = 8191 & j,
            C = j >>> 13,
            P = 0 | o[8],
            L = 8191 & P,
            O = P >>> 13,
            D = 0 | o[9],
            N = 8191 & D,
            q = D >>> 13,
            U = 0 | a[0],
            z = 8191 & U,
            K = U >>> 13,
            F = 0 | a[1],
            H = 8191 & F,
            W = F >>> 13,
            V = 0 | a[2],
            Z = 8191 & V,
            X = V >>> 13,
            G = 0 | a[3],
            Y = 8191 & G,
            J = G >>> 13,
            $ = 0 | a[4],
            Q = 8191 & $,
            tt = $ >>> 13,
            et = 0 | a[5],
            rt = 8191 & et,
            it = et >>> 13,
            nt = 0 | a[6],
            st = 8191 & nt,
            ot = nt >>> 13,
            at = 0 | a[7],
            ft = 8191 & at,
            ht = at >>> 13,
            ut = 0 | a[8],
            ct = 8191 & ut,
            dt = ut >>> 13,
            lt = 0 | a[9],
            pt = 8191 & lt,
            bt = lt >>> 13;
          (r.negative = t.negative ^ e.negative),
            (r.length = 19),
            (i = Math.imul(c, z)),
            (n = Math.imul(c, K)),
            (n = (n + Math.imul(d, z)) | 0),
            (s = Math.imul(d, K));
          var mt = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          (h = (((s + (n >>> 13)) | 0) + (mt >>> 26)) | 0),
            (mt &= 67108863),
            (i = Math.imul(p, z)),
            (n = Math.imul(p, K)),
            (n = (n + Math.imul(b, z)) | 0),
            (s = Math.imul(b, K)),
            (i = (i + Math.imul(c, H)) | 0),
            (n = (n + Math.imul(c, W)) | 0),
            (n = (n + Math.imul(d, H)) | 0),
            (s = (s + Math.imul(d, W)) | 0);
          var yt = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          (h = (((s + (n >>> 13)) | 0) + (yt >>> 26)) | 0),
            (yt &= 67108863),
            (i = Math.imul(y, z)),
            (n = Math.imul(y, K)),
            (n = (n + Math.imul(g, z)) | 0),
            (s = Math.imul(g, K)),
            (i = (i + Math.imul(p, H)) | 0),
            (n = (n + Math.imul(p, W)) | 0),
            (n = (n + Math.imul(b, H)) | 0),
            (s = (s + Math.imul(b, W)) | 0),
            (i = (i + Math.imul(c, Z)) | 0),
            (n = (n + Math.imul(c, X)) | 0),
            (n = (n + Math.imul(d, Z)) | 0),
            (s = (s + Math.imul(d, X)) | 0);
          var gt = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          (h = (((s + (n >>> 13)) | 0) + (gt >>> 26)) | 0),
            (gt &= 67108863),
            (i = Math.imul(w, z)),
            (n = Math.imul(w, K)),
            (n = (n + Math.imul(_, z)) | 0),
            (s = Math.imul(_, K)),
            (i = (i + Math.imul(y, H)) | 0),
            (n = (n + Math.imul(y, W)) | 0),
            (n = (n + Math.imul(g, H)) | 0),
            (s = (s + Math.imul(g, W)) | 0),
            (i = (i + Math.imul(p, Z)) | 0),
            (n = (n + Math.imul(p, X)) | 0),
            (n = (n + Math.imul(b, Z)) | 0),
            (s = (s + Math.imul(b, X)) | 0),
            (i = (i + Math.imul(c, Y)) | 0),
            (n = (n + Math.imul(c, J)) | 0),
            (n = (n + Math.imul(d, Y)) | 0),
            (s = (s + Math.imul(d, J)) | 0);
          var vt = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          (h = (((s + (n >>> 13)) | 0) + (vt >>> 26)) | 0),
            (vt &= 67108863),
            (i = Math.imul(S, z)),
            (n = Math.imul(S, K)),
            (n = (n + Math.imul(E, z)) | 0),
            (s = Math.imul(E, K)),
            (i = (i + Math.imul(w, H)) | 0),
            (n = (n + Math.imul(w, W)) | 0),
            (n = (n + Math.imul(_, H)) | 0),
            (s = (s + Math.imul(_, W)) | 0),
            (i = (i + Math.imul(y, Z)) | 0),
            (n = (n + Math.imul(y, X)) | 0),
            (n = (n + Math.imul(g, Z)) | 0),
            (s = (s + Math.imul(g, X)) | 0),
            (i = (i + Math.imul(p, Y)) | 0),
            (n = (n + Math.imul(p, J)) | 0),
            (n = (n + Math.imul(b, Y)) | 0),
            (s = (s + Math.imul(b, J)) | 0),
            (i = (i + Math.imul(c, Q)) | 0),
            (n = (n + Math.imul(c, tt)) | 0),
            (n = (n + Math.imul(d, Q)) | 0),
            (s = (s + Math.imul(d, tt)) | 0);
          var wt = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          (h = (((s + (n >>> 13)) | 0) + (wt >>> 26)) | 0),
            (wt &= 67108863),
            (i = Math.imul(A, z)),
            (n = Math.imul(A, K)),
            (n = (n + Math.imul(x, z)) | 0),
            (s = Math.imul(x, K)),
            (i = (i + Math.imul(S, H)) | 0),
            (n = (n + Math.imul(S, W)) | 0),
            (n = (n + Math.imul(E, H)) | 0),
            (s = (s + Math.imul(E, W)) | 0),
            (i = (i + Math.imul(w, Z)) | 0),
            (n = (n + Math.imul(w, X)) | 0),
            (n = (n + Math.imul(_, Z)) | 0),
            (s = (s + Math.imul(_, X)) | 0),
            (i = (i + Math.imul(y, Y)) | 0),
            (n = (n + Math.imul(y, J)) | 0),
            (n = (n + Math.imul(g, Y)) | 0),
            (s = (s + Math.imul(g, J)) | 0),
            (i = (i + Math.imul(p, Q)) | 0),
            (n = (n + Math.imul(p, tt)) | 0),
            (n = (n + Math.imul(b, Q)) | 0),
            (s = (s + Math.imul(b, tt)) | 0),
            (i = (i + Math.imul(c, rt)) | 0),
            (n = (n + Math.imul(c, it)) | 0),
            (n = (n + Math.imul(d, rt)) | 0),
            (s = (s + Math.imul(d, it)) | 0);
          var _t = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          (h = (((s + (n >>> 13)) | 0) + (_t >>> 26)) | 0),
            (_t &= 67108863),
            (i = Math.imul(R, z)),
            (n = Math.imul(R, K)),
            (n = (n + Math.imul(I, z)) | 0),
            (s = Math.imul(I, K)),
            (i = (i + Math.imul(A, H)) | 0),
            (n = (n + Math.imul(A, W)) | 0),
            (n = (n + Math.imul(x, H)) | 0),
            (s = (s + Math.imul(x, W)) | 0),
            (i = (i + Math.imul(S, Z)) | 0),
            (n = (n + Math.imul(S, X)) | 0),
            (n = (n + Math.imul(E, Z)) | 0),
            (s = (s + Math.imul(E, X)) | 0),
            (i = (i + Math.imul(w, Y)) | 0),
            (n = (n + Math.imul(w, J)) | 0),
            (n = (n + Math.imul(_, Y)) | 0),
            (s = (s + Math.imul(_, J)) | 0),
            (i = (i + Math.imul(y, Q)) | 0),
            (n = (n + Math.imul(y, tt)) | 0),
            (n = (n + Math.imul(g, Q)) | 0),
            (s = (s + Math.imul(g, tt)) | 0),
            (i = (i + Math.imul(p, rt)) | 0),
            (n = (n + Math.imul(p, it)) | 0),
            (n = (n + Math.imul(b, rt)) | 0),
            (s = (s + Math.imul(b, it)) | 0),
            (i = (i + Math.imul(c, st)) | 0),
            (n = (n + Math.imul(c, ot)) | 0),
            (n = (n + Math.imul(d, st)) | 0),
            (s = (s + Math.imul(d, ot)) | 0);
          var Mt = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          (h = (((s + (n >>> 13)) | 0) + (Mt >>> 26)) | 0),
            (Mt &= 67108863),
            (i = Math.imul(T, z)),
            (n = Math.imul(T, K)),
            (n = (n + Math.imul(C, z)) | 0),
            (s = Math.imul(C, K)),
            (i = (i + Math.imul(R, H)) | 0),
            (n = (n + Math.imul(R, W)) | 0),
            (n = (n + Math.imul(I, H)) | 0),
            (s = (s + Math.imul(I, W)) | 0),
            (i = (i + Math.imul(A, Z)) | 0),
            (n = (n + Math.imul(A, X)) | 0),
            (n = (n + Math.imul(x, Z)) | 0),
            (s = (s + Math.imul(x, X)) | 0),
            (i = (i + Math.imul(S, Y)) | 0),
            (n = (n + Math.imul(S, J)) | 0),
            (n = (n + Math.imul(E, Y)) | 0),
            (s = (s + Math.imul(E, J)) | 0),
            (i = (i + Math.imul(w, Q)) | 0),
            (n = (n + Math.imul(w, tt)) | 0),
            (n = (n + Math.imul(_, Q)) | 0),
            (s = (s + Math.imul(_, tt)) | 0),
            (i = (i + Math.imul(y, rt)) | 0),
            (n = (n + Math.imul(y, it)) | 0),
            (n = (n + Math.imul(g, rt)) | 0),
            (s = (s + Math.imul(g, it)) | 0),
            (i = (i + Math.imul(p, st)) | 0),
            (n = (n + Math.imul(p, ot)) | 0),
            (n = (n + Math.imul(b, st)) | 0),
            (s = (s + Math.imul(b, ot)) | 0),
            (i = (i + Math.imul(c, ft)) | 0),
            (n = (n + Math.imul(c, ht)) | 0),
            (n = (n + Math.imul(d, ft)) | 0),
            (s = (s + Math.imul(d, ht)) | 0);
          var St = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          (h = (((s + (n >>> 13)) | 0) + (St >>> 26)) | 0),
            (St &= 67108863),
            (i = Math.imul(L, z)),
            (n = Math.imul(L, K)),
            (n = (n + Math.imul(O, z)) | 0),
            (s = Math.imul(O, K)),
            (i = (i + Math.imul(T, H)) | 0),
            (n = (n + Math.imul(T, W)) | 0),
            (n = (n + Math.imul(C, H)) | 0),
            (s = (s + Math.imul(C, W)) | 0),
            (i = (i + Math.imul(R, Z)) | 0),
            (n = (n + Math.imul(R, X)) | 0),
            (n = (n + Math.imul(I, Z)) | 0),
            (s = (s + Math.imul(I, X)) | 0),
            (i = (i + Math.imul(A, Y)) | 0),
            (n = (n + Math.imul(A, J)) | 0),
            (n = (n + Math.imul(x, Y)) | 0),
            (s = (s + Math.imul(x, J)) | 0),
            (i = (i + Math.imul(S, Q)) | 0),
            (n = (n + Math.imul(S, tt)) | 0),
            (n = (n + Math.imul(E, Q)) | 0),
            (s = (s + Math.imul(E, tt)) | 0),
            (i = (i + Math.imul(w, rt)) | 0),
            (n = (n + Math.imul(w, it)) | 0),
            (n = (n + Math.imul(_, rt)) | 0),
            (s = (s + Math.imul(_, it)) | 0),
            (i = (i + Math.imul(y, st)) | 0),
            (n = (n + Math.imul(y, ot)) | 0),
            (n = (n + Math.imul(g, st)) | 0),
            (s = (s + Math.imul(g, ot)) | 0),
            (i = (i + Math.imul(p, ft)) | 0),
            (n = (n + Math.imul(p, ht)) | 0),
            (n = (n + Math.imul(b, ft)) | 0),
            (s = (s + Math.imul(b, ht)) | 0),
            (i = (i + Math.imul(c, ct)) | 0),
            (n = (n + Math.imul(c, dt)) | 0),
            (n = (n + Math.imul(d, ct)) | 0),
            (s = (s + Math.imul(d, dt)) | 0);
          var Et = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          (h = (((s + (n >>> 13)) | 0) + (Et >>> 26)) | 0),
            (Et &= 67108863),
            (i = Math.imul(N, z)),
            (n = Math.imul(N, K)),
            (n = (n + Math.imul(q, z)) | 0),
            (s = Math.imul(q, K)),
            (i = (i + Math.imul(L, H)) | 0),
            (n = (n + Math.imul(L, W)) | 0),
            (n = (n + Math.imul(O, H)) | 0),
            (s = (s + Math.imul(O, W)) | 0),
            (i = (i + Math.imul(T, Z)) | 0),
            (n = (n + Math.imul(T, X)) | 0),
            (n = (n + Math.imul(C, Z)) | 0),
            (s = (s + Math.imul(C, X)) | 0),
            (i = (i + Math.imul(R, Y)) | 0),
            (n = (n + Math.imul(R, J)) | 0),
            (n = (n + Math.imul(I, Y)) | 0),
            (s = (s + Math.imul(I, J)) | 0),
            (i = (i + Math.imul(A, Q)) | 0),
            (n = (n + Math.imul(A, tt)) | 0),
            (n = (n + Math.imul(x, Q)) | 0),
            (s = (s + Math.imul(x, tt)) | 0),
            (i = (i + Math.imul(S, rt)) | 0),
            (n = (n + Math.imul(S, it)) | 0),
            (n = (n + Math.imul(E, rt)) | 0),
            (s = (s + Math.imul(E, it)) | 0),
            (i = (i + Math.imul(w, st)) | 0),
            (n = (n + Math.imul(w, ot)) | 0),
            (n = (n + Math.imul(_, st)) | 0),
            (s = (s + Math.imul(_, ot)) | 0),
            (i = (i + Math.imul(y, ft)) | 0),
            (n = (n + Math.imul(y, ht)) | 0),
            (n = (n + Math.imul(g, ft)) | 0),
            (s = (s + Math.imul(g, ht)) | 0),
            (i = (i + Math.imul(p, ct)) | 0),
            (n = (n + Math.imul(p, dt)) | 0),
            (n = (n + Math.imul(b, ct)) | 0),
            (s = (s + Math.imul(b, dt)) | 0),
            (i = (i + Math.imul(c, pt)) | 0),
            (n = (n + Math.imul(c, bt)) | 0),
            (n = (n + Math.imul(d, pt)) | 0),
            (s = (s + Math.imul(d, bt)) | 0);
          var kt = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          (h = (((s + (n >>> 13)) | 0) + (kt >>> 26)) | 0),
            (kt &= 67108863),
            (i = Math.imul(N, H)),
            (n = Math.imul(N, W)),
            (n = (n + Math.imul(q, H)) | 0),
            (s = Math.imul(q, W)),
            (i = (i + Math.imul(L, Z)) | 0),
            (n = (n + Math.imul(L, X)) | 0),
            (n = (n + Math.imul(O, Z)) | 0),
            (s = (s + Math.imul(O, X)) | 0),
            (i = (i + Math.imul(T, Y)) | 0),
            (n = (n + Math.imul(T, J)) | 0),
            (n = (n + Math.imul(C, Y)) | 0),
            (s = (s + Math.imul(C, J)) | 0),
            (i = (i + Math.imul(R, Q)) | 0),
            (n = (n + Math.imul(R, tt)) | 0),
            (n = (n + Math.imul(I, Q)) | 0),
            (s = (s + Math.imul(I, tt)) | 0),
            (i = (i + Math.imul(A, rt)) | 0),
            (n = (n + Math.imul(A, it)) | 0),
            (n = (n + Math.imul(x, rt)) | 0),
            (s = (s + Math.imul(x, it)) | 0),
            (i = (i + Math.imul(S, st)) | 0),
            (n = (n + Math.imul(S, ot)) | 0),
            (n = (n + Math.imul(E, st)) | 0),
            (s = (s + Math.imul(E, ot)) | 0),
            (i = (i + Math.imul(w, ft)) | 0),
            (n = (n + Math.imul(w, ht)) | 0),
            (n = (n + Math.imul(_, ft)) | 0),
            (s = (s + Math.imul(_, ht)) | 0),
            (i = (i + Math.imul(y, ct)) | 0),
            (n = (n + Math.imul(y, dt)) | 0),
            (n = (n + Math.imul(g, ct)) | 0),
            (s = (s + Math.imul(g, dt)) | 0),
            (i = (i + Math.imul(p, pt)) | 0),
            (n = (n + Math.imul(p, bt)) | 0),
            (n = (n + Math.imul(b, pt)) | 0),
            (s = (s + Math.imul(b, bt)) | 0);
          var At = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          (h = (((s + (n >>> 13)) | 0) + (At >>> 26)) | 0),
            (At &= 67108863),
            (i = Math.imul(N, Z)),
            (n = Math.imul(N, X)),
            (n = (n + Math.imul(q, Z)) | 0),
            (s = Math.imul(q, X)),
            (i = (i + Math.imul(L, Y)) | 0),
            (n = (n + Math.imul(L, J)) | 0),
            (n = (n + Math.imul(O, Y)) | 0),
            (s = (s + Math.imul(O, J)) | 0),
            (i = (i + Math.imul(T, Q)) | 0),
            (n = (n + Math.imul(T, tt)) | 0),
            (n = (n + Math.imul(C, Q)) | 0),
            (s = (s + Math.imul(C, tt)) | 0),
            (i = (i + Math.imul(R, rt)) | 0),
            (n = (n + Math.imul(R, it)) | 0),
            (n = (n + Math.imul(I, rt)) | 0),
            (s = (s + Math.imul(I, it)) | 0),
            (i = (i + Math.imul(A, st)) | 0),
            (n = (n + Math.imul(A, ot)) | 0),
            (n = (n + Math.imul(x, st)) | 0),
            (s = (s + Math.imul(x, ot)) | 0),
            (i = (i + Math.imul(S, ft)) | 0),
            (n = (n + Math.imul(S, ht)) | 0),
            (n = (n + Math.imul(E, ft)) | 0),
            (s = (s + Math.imul(E, ht)) | 0),
            (i = (i + Math.imul(w, ct)) | 0),
            (n = (n + Math.imul(w, dt)) | 0),
            (n = (n + Math.imul(_, ct)) | 0),
            (s = (s + Math.imul(_, dt)) | 0),
            (i = (i + Math.imul(y, pt)) | 0),
            (n = (n + Math.imul(y, bt)) | 0),
            (n = (n + Math.imul(g, pt)) | 0),
            (s = (s + Math.imul(g, bt)) | 0);
          var xt = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          (h = (((s + (n >>> 13)) | 0) + (xt >>> 26)) | 0),
            (xt &= 67108863),
            (i = Math.imul(N, Y)),
            (n = Math.imul(N, J)),
            (n = (n + Math.imul(q, Y)) | 0),
            (s = Math.imul(q, J)),
            (i = (i + Math.imul(L, Q)) | 0),
            (n = (n + Math.imul(L, tt)) | 0),
            (n = (n + Math.imul(O, Q)) | 0),
            (s = (s + Math.imul(O, tt)) | 0),
            (i = (i + Math.imul(T, rt)) | 0),
            (n = (n + Math.imul(T, it)) | 0),
            (n = (n + Math.imul(C, rt)) | 0),
            (s = (s + Math.imul(C, it)) | 0),
            (i = (i + Math.imul(R, st)) | 0),
            (n = (n + Math.imul(R, ot)) | 0),
            (n = (n + Math.imul(I, st)) | 0),
            (s = (s + Math.imul(I, ot)) | 0),
            (i = (i + Math.imul(A, ft)) | 0),
            (n = (n + Math.imul(A, ht)) | 0),
            (n = (n + Math.imul(x, ft)) | 0),
            (s = (s + Math.imul(x, ht)) | 0),
            (i = (i + Math.imul(S, ct)) | 0),
            (n = (n + Math.imul(S, dt)) | 0),
            (n = (n + Math.imul(E, ct)) | 0),
            (s = (s + Math.imul(E, dt)) | 0),
            (i = (i + Math.imul(w, pt)) | 0),
            (n = (n + Math.imul(w, bt)) | 0),
            (n = (n + Math.imul(_, pt)) | 0),
            (s = (s + Math.imul(_, bt)) | 0);
          var Bt = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          (h = (((s + (n >>> 13)) | 0) + (Bt >>> 26)) | 0),
            (Bt &= 67108863),
            (i = Math.imul(N, Q)),
            (n = Math.imul(N, tt)),
            (n = (n + Math.imul(q, Q)) | 0),
            (s = Math.imul(q, tt)),
            (i = (i + Math.imul(L, rt)) | 0),
            (n = (n + Math.imul(L, it)) | 0),
            (n = (n + Math.imul(O, rt)) | 0),
            (s = (s + Math.imul(O, it)) | 0),
            (i = (i + Math.imul(T, st)) | 0),
            (n = (n + Math.imul(T, ot)) | 0),
            (n = (n + Math.imul(C, st)) | 0),
            (s = (s + Math.imul(C, ot)) | 0),
            (i = (i + Math.imul(R, ft)) | 0),
            (n = (n + Math.imul(R, ht)) | 0),
            (n = (n + Math.imul(I, ft)) | 0),
            (s = (s + Math.imul(I, ht)) | 0),
            (i = (i + Math.imul(A, ct)) | 0),
            (n = (n + Math.imul(A, dt)) | 0),
            (n = (n + Math.imul(x, ct)) | 0),
            (s = (s + Math.imul(x, dt)) | 0),
            (i = (i + Math.imul(S, pt)) | 0),
            (n = (n + Math.imul(S, bt)) | 0),
            (n = (n + Math.imul(E, pt)) | 0),
            (s = (s + Math.imul(E, bt)) | 0);
          var Rt = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          (h = (((s + (n >>> 13)) | 0) + (Rt >>> 26)) | 0),
            (Rt &= 67108863),
            (i = Math.imul(N, rt)),
            (n = Math.imul(N, it)),
            (n = (n + Math.imul(q, rt)) | 0),
            (s = Math.imul(q, it)),
            (i = (i + Math.imul(L, st)) | 0),
            (n = (n + Math.imul(L, ot)) | 0),
            (n = (n + Math.imul(O, st)) | 0),
            (s = (s + Math.imul(O, ot)) | 0),
            (i = (i + Math.imul(T, ft)) | 0),
            (n = (n + Math.imul(T, ht)) | 0),
            (n = (n + Math.imul(C, ft)) | 0),
            (s = (s + Math.imul(C, ht)) | 0),
            (i = (i + Math.imul(R, ct)) | 0),
            (n = (n + Math.imul(R, dt)) | 0),
            (n = (n + Math.imul(I, ct)) | 0),
            (s = (s + Math.imul(I, dt)) | 0),
            (i = (i + Math.imul(A, pt)) | 0),
            (n = (n + Math.imul(A, bt)) | 0),
            (n = (n + Math.imul(x, pt)) | 0),
            (s = (s + Math.imul(x, bt)) | 0);
          var It = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          (h = (((s + (n >>> 13)) | 0) + (It >>> 26)) | 0),
            (It &= 67108863),
            (i = Math.imul(N, st)),
            (n = Math.imul(N, ot)),
            (n = (n + Math.imul(q, st)) | 0),
            (s = Math.imul(q, ot)),
            (i = (i + Math.imul(L, ft)) | 0),
            (n = (n + Math.imul(L, ht)) | 0),
            (n = (n + Math.imul(O, ft)) | 0),
            (s = (s + Math.imul(O, ht)) | 0),
            (i = (i + Math.imul(T, ct)) | 0),
            (n = (n + Math.imul(T, dt)) | 0),
            (n = (n + Math.imul(C, ct)) | 0),
            (s = (s + Math.imul(C, dt)) | 0),
            (i = (i + Math.imul(R, pt)) | 0),
            (n = (n + Math.imul(R, bt)) | 0),
            (n = (n + Math.imul(I, pt)) | 0),
            (s = (s + Math.imul(I, bt)) | 0);
          var jt = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          (h = (((s + (n >>> 13)) | 0) + (jt >>> 26)) | 0),
            (jt &= 67108863),
            (i = Math.imul(N, ft)),
            (n = Math.imul(N, ht)),
            (n = (n + Math.imul(q, ft)) | 0),
            (s = Math.imul(q, ht)),
            (i = (i + Math.imul(L, ct)) | 0),
            (n = (n + Math.imul(L, dt)) | 0),
            (n = (n + Math.imul(O, ct)) | 0),
            (s = (s + Math.imul(O, dt)) | 0),
            (i = (i + Math.imul(T, pt)) | 0),
            (n = (n + Math.imul(T, bt)) | 0),
            (n = (n + Math.imul(C, pt)) | 0),
            (s = (s + Math.imul(C, bt)) | 0);
          var Tt = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          (h = (((s + (n >>> 13)) | 0) + (Tt >>> 26)) | 0),
            (Tt &= 67108863),
            (i = Math.imul(N, ct)),
            (n = Math.imul(N, dt)),
            (n = (n + Math.imul(q, ct)) | 0),
            (s = Math.imul(q, dt)),
            (i = (i + Math.imul(L, pt)) | 0),
            (n = (n + Math.imul(L, bt)) | 0),
            (n = (n + Math.imul(O, pt)) | 0),
            (s = (s + Math.imul(O, bt)) | 0);
          var Ct = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          (h = (((s + (n >>> 13)) | 0) + (Ct >>> 26)) | 0),
            (Ct &= 67108863),
            (i = Math.imul(N, pt)),
            (n = Math.imul(N, bt)),
            (n = (n + Math.imul(q, pt)) | 0),
            (s = Math.imul(q, bt));
          var Pt = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          return (
            (h = (((s + (n >>> 13)) | 0) + (Pt >>> 26)) | 0),
            (Pt &= 67108863),
            (f[0] = mt),
            (f[1] = yt),
            (f[2] = gt),
            (f[3] = vt),
            (f[4] = wt),
            (f[5] = _t),
            (f[6] = Mt),
            (f[7] = St),
            (f[8] = Et),
            (f[9] = kt),
            (f[10] = At),
            (f[11] = xt),
            (f[12] = Bt),
            (f[13] = Rt),
            (f[14] = It),
            (f[15] = jt),
            (f[16] = Tt),
            (f[17] = Ct),
            (f[18] = Pt),
            0 !== h && ((f[19] = h), r.length++),
            r
          );
        };
        Math.imul || (k = u),
          (s.prototype.mulTo = function (t, e) {
            var r,
              i = this.length + t.length;
            return (
              (r =
                10 === this.length && 10 === t.length
                  ? k(this, t, e)
                  : i < 63
                  ? u(this, t, e)
                  : i < 1024
                  ? c(this, t, e)
                  : d(this, t, e)),
              r
            );
          }),
          (l.prototype.makeRBT = function (t) {
            for (
              var e = new Array(t), r = s.prototype._countBits(t) - 1, i = 0;
              i < t;
              i++
            )
              e[i] = this.revBin(i, r, t);
            return e;
          }),
          (l.prototype.revBin = function (t, e, r) {
            if (0 === t || t === r - 1) return t;
            for (var i = 0, n = 0; n < e; n++)
              (i |= (1 & t) << (e - n - 1)), (t >>= 1);
            return i;
          }),
          (l.prototype.permute = function (t, e, r, i, n, s) {
            for (var o = 0; o < s; o++) (i[o] = e[t[o]]), (n[o] = r[t[o]]);
          }),
          (l.prototype.transform = function (t, e, r, i, n, s) {
            this.permute(s, t, e, r, i, n);
            for (var o = 1; o < n; o <<= 1)
              for (
                var a = o << 1,
                  f = Math.cos((2 * Math.PI) / a),
                  h = Math.sin((2 * Math.PI) / a),
                  u = 0;
                u < n;
                u += a
              )
                for (var c = f, d = h, l = 0; l < o; l++) {
                  var p = r[u + l],
                    b = i[u + l],
                    m = r[u + l + o],
                    y = i[u + l + o],
                    g = c * m - d * y;
                  (y = c * y + d * m),
                    (m = g),
                    (r[u + l] = p + m),
                    (i[u + l] = b + y),
                    (r[u + l + o] = p - m),
                    (i[u + l + o] = b - y),
                    l !== a &&
                      ((g = f * c - h * d), (d = f * d + h * c), (c = g));
                }
          }),
          (l.prototype.guessLen13b = function (t, e) {
            var r = 1 | Math.max(e, t),
              i = 1 & r,
              n = 0;
            for (r = (r / 2) | 0; r; r >>>= 1) n++;
            return 1 << (n + 1 + i);
          }),
          (l.prototype.conjugate = function (t, e, r) {
            if (!(r <= 1))
              for (var i = 0; i < r / 2; i++) {
                var n = t[i];
                (t[i] = t[r - i - 1]),
                  (t[r - i - 1] = n),
                  (n = e[i]),
                  (e[i] = -e[r - i - 1]),
                  (e[r - i - 1] = -n);
              }
          }),
          (l.prototype.normalize13b = function (t, e) {
            for (var r = 0, i = 0; i < e / 2; i++) {
              var n =
                8192 * Math.round(t[2 * i + 1] / e) +
                Math.round(t[2 * i] / e) +
                r;
              (t[i] = 67108863 & n),
                (r = n < 67108864 ? 0 : (n / 67108864) | 0);
            }
            return t;
          }),
          (l.prototype.convert13b = function (t, e, r, n) {
            for (var s = 0, o = 0; o < e; o++)
              (s += 0 | t[o]),
                (r[2 * o] = 8191 & s),
                (s >>>= 13),
                (r[2 * o + 1] = 8191 & s),
                (s >>>= 13);
            for (o = 2 * e; o < n; ++o) r[o] = 0;
            i(0 === s), i(0 == (-8192 & s));
          }),
          (l.prototype.stub = function (t) {
            for (var e = new Array(t), r = 0; r < t; r++) e[r] = 0;
            return e;
          }),
          (l.prototype.mulp = function (t, e, r) {
            var i = 2 * this.guessLen13b(t.length, e.length),
              n = this.makeRBT(i),
              s = this.stub(i),
              o = new Array(i),
              a = new Array(i),
              f = new Array(i),
              h = new Array(i),
              u = new Array(i),
              c = new Array(i),
              d = r.words;
            (d.length = i),
              this.convert13b(t.words, t.length, o, i),
              this.convert13b(e.words, e.length, h, i),
              this.transform(o, s, a, f, i, n),
              this.transform(h, s, u, c, i, n);
            for (var l = 0; l < i; l++) {
              var p = a[l] * u[l] - f[l] * c[l];
              (f[l] = a[l] * c[l] + f[l] * u[l]), (a[l] = p);
            }
            return (
              this.conjugate(a, f, i),
              this.transform(a, f, d, s, i, n),
              this.conjugate(d, s, i),
              this.normalize13b(d, i),
              (r.negative = t.negative ^ e.negative),
              (r.length = t.length + e.length),
              r.strip()
            );
          }),
          (s.prototype.mul = function (t) {
            var e = new s(null);
            return (
              (e.words = new Array(this.length + t.length)), this.mulTo(t, e)
            );
          }),
          (s.prototype.mulf = function (t) {
            var e = new s(null);
            return (e.words = new Array(this.length + t.length)), d(this, t, e);
          }),
          (s.prototype.imul = function (t) {
            return this.clone().mulTo(t, this);
          }),
          (s.prototype.imuln = function (t) {
            i("number" == typeof t), i(t < 67108864);
            for (var e = 0, r = 0; r < this.length; r++) {
              var n = (0 | this.words[r]) * t,
                s = (67108863 & n) + (67108863 & e);
              (e >>= 26),
                (e += (n / 67108864) | 0),
                (e += s >>> 26),
                (this.words[r] = 67108863 & s);
            }
            return 0 !== e && ((this.words[r] = e), this.length++), this;
          }),
          (s.prototype.muln = function (t) {
            return this.clone().imuln(t);
          }),
          (s.prototype.sqr = function () {
            return this.mul(this);
          }),
          (s.prototype.isqr = function () {
            return this.imul(this.clone());
          }),
          (s.prototype.pow = function (t) {
            var e = h(t);
            if (0 === e.length) return new s(1);
            for (
              var r = this, i = 0;
              i < e.length && 0 === e[i];
              i++, r = r.sqr()
            );
            if (++i < e.length)
              for (var n = r.sqr(); i < e.length; i++, n = n.sqr())
                0 !== e[i] && (r = r.mul(n));
            return r;
          }),
          (s.prototype.iushln = function (t) {
            i("number" == typeof t && t >= 0);
            var e,
              r = t % 26,
              n = (t - r) / 26,
              s = (67108863 >>> (26 - r)) << (26 - r);
            if (0 !== r) {
              var o = 0;
              for (e = 0; e < this.length; e++) {
                var a = this.words[e] & s,
                  f = ((0 | this.words[e]) - a) << r;
                (this.words[e] = f | o), (o = a >>> (26 - r));
              }
              o && ((this.words[e] = o), this.length++);
            }
            if (0 !== n) {
              for (e = this.length - 1; e >= 0; e--)
                this.words[e + n] = this.words[e];
              for (e = 0; e < n; e++) this.words[e] = 0;
              this.length += n;
            }
            return this.strip();
          }),
          (s.prototype.ishln = function (t) {
            return i(0 === this.negative), this.iushln(t);
          }),
          (s.prototype.iushrn = function (t, e, r) {
            var n;
            i("number" == typeof t && t >= 0),
              (n = e ? (e - (e % 26)) / 26 : 0);
            var s = t % 26,
              o = Math.min((t - s) / 26, this.length),
              a = 67108863 ^ ((67108863 >>> s) << s),
              f = r;
            if (((n -= o), (n = Math.max(0, n)), f)) {
              for (var h = 0; h < o; h++) f.words[h] = this.words[h];
              f.length = o;
            }
            if (0 === o);
            else if (this.length > o)
              for (this.length -= o, h = 0; h < this.length; h++)
                this.words[h] = this.words[h + o];
            else (this.words[0] = 0), (this.length = 1);
            var u = 0;
            for (h = this.length - 1; h >= 0 && (0 !== u || h >= n); h--) {
              var c = 0 | this.words[h];
              (this.words[h] = (u << (26 - s)) | (c >>> s)), (u = c & a);
            }
            return (
              f && 0 !== u && (f.words[f.length++] = u),
              0 === this.length && ((this.words[0] = 0), (this.length = 1)),
              this.strip()
            );
          }),
          (s.prototype.ishrn = function (t, e, r) {
            return i(0 === this.negative), this.iushrn(t, e, r);
          }),
          (s.prototype.shln = function (t) {
            return this.clone().ishln(t);
          }),
          (s.prototype.ushln = function (t) {
            return this.clone().iushln(t);
          }),
          (s.prototype.shrn = function (t) {
            return this.clone().ishrn(t);
          }),
          (s.prototype.ushrn = function (t) {
            return this.clone().iushrn(t);
          }),
          (s.prototype.testn = function (t) {
            i("number" == typeof t && t >= 0);
            var e = t % 26,
              r = (t - e) / 26,
              n = 1 << e;
            if (this.length <= r) return !1;
            var s = this.words[r];
            return !!(s & n);
          }),
          (s.prototype.imaskn = function (t) {
            i("number" == typeof t && t >= 0);
            var e = t % 26,
              r = (t - e) / 26;
            if (
              (i(
                0 === this.negative,
                "imaskn works only with positive numbers"
              ),
              this.length <= r)
            )
              return this;
            if (
              (0 !== e && r++,
              (this.length = Math.min(r, this.length)),
              0 !== e)
            ) {
              var n = 67108863 ^ ((67108863 >>> e) << e);
              this.words[this.length - 1] &= n;
            }
            return this.strip();
          }),
          (s.prototype.maskn = function (t) {
            return this.clone().imaskn(t);
          }),
          (s.prototype.iaddn = function (t) {
            return (
              i("number" == typeof t),
              i(t < 67108864),
              t < 0
                ? this.isubn(-t)
                : 0 !== this.negative
                ? 1 === this.length && (0 | this.words[0]) < t
                  ? ((this.words[0] = t - (0 | this.words[0])),
                    (this.negative = 0),
                    this)
                  : ((this.negative = 0),
                    this.isubn(t),
                    (this.negative = 1),
                    this)
                : this._iaddn(t)
            );
          }),
          (s.prototype._iaddn = function (t) {
            this.words[0] += t;
            for (var e = 0; e < this.length && this.words[e] >= 67108864; e++)
              (this.words[e] -= 67108864),
                e === this.length - 1
                  ? (this.words[e + 1] = 1)
                  : this.words[e + 1]++;
            return (this.length = Math.max(this.length, e + 1)), this;
          }),
          (s.prototype.isubn = function (t) {
            if ((i("number" == typeof t), i(t < 67108864), t < 0))
              return this.iaddn(-t);
            if (0 !== this.negative)
              return (
                (this.negative = 0), this.iaddn(t), (this.negative = 1), this
              );
            if (((this.words[0] -= t), 1 === this.length && this.words[0] < 0))
              (this.words[0] = -this.words[0]), (this.negative = 1);
            else
              for (var e = 0; e < this.length && this.words[e] < 0; e++)
                (this.words[e] += 67108864), (this.words[e + 1] -= 1);
            return this.strip();
          }),
          (s.prototype.addn = function (t) {
            return this.clone().iaddn(t);
          }),
          (s.prototype.subn = function (t) {
            return this.clone().isubn(t);
          }),
          (s.prototype.iabs = function () {
            return (this.negative = 0), this;
          }),
          (s.prototype.abs = function () {
            return this.clone().iabs();
          }),
          (s.prototype._ishlnsubmul = function (t, e, r) {
            var n,
              s,
              o = t.length + r;
            this._expand(o);
            var a = 0;
            for (n = 0; n < t.length; n++) {
              s = (0 | this.words[n + r]) + a;
              var f = (0 | t.words[n]) * e;
              (s -= 67108863 & f),
                (a = (s >> 26) - ((f / 67108864) | 0)),
                (this.words[n + r] = 67108863 & s);
            }
            for (; n < this.length - r; n++)
              (s = (0 | this.words[n + r]) + a),
                (a = s >> 26),
                (this.words[n + r] = 67108863 & s);
            if (0 === a) return this.strip();
            for (i(-1 === a), a = 0, n = 0; n < this.length; n++)
              (s = -(0 | this.words[n]) + a),
                (a = s >> 26),
                (this.words[n] = 67108863 & s);
            return (this.negative = 1), this.strip();
          }),
          (s.prototype._wordDiv = function (t, e) {
            var r = this.length - t.length,
              i = this.clone(),
              n = t,
              o = 0 | n.words[n.length - 1],
              a = this._countBits(o);
            (r = 26 - a),
              0 !== r &&
                ((n = n.ushln(r)),
                i.iushln(r),
                (o = 0 | n.words[n.length - 1]));
            var f,
              h = i.length - n.length;
            if ("mod" !== e) {
              (f = new s(null)),
                (f.length = h + 1),
                (f.words = new Array(f.length));
              for (var u = 0; u < f.length; u++) f.words[u] = 0;
            }
            var c = i.clone()._ishlnsubmul(n, 1, h);
            0 === c.negative && ((i = c), f && (f.words[h] = 1));
            for (var d = h - 1; d >= 0; d--) {
              var l =
                67108864 * (0 | i.words[n.length + d]) +
                (0 | i.words[n.length + d - 1]);
              for (
                l = Math.min((l / o) | 0, 67108863), i._ishlnsubmul(n, l, d);
                0 !== i.negative;

              )
                l--,
                  (i.negative = 0),
                  i._ishlnsubmul(n, 1, d),
                  i.isZero() || (i.negative ^= 1);
              f && (f.words[d] = l);
            }
            return (
              f && f.strip(),
              i.strip(),
              "div" !== e && 0 !== r && i.iushrn(r),
              { div: f || null, mod: i }
            );
          }),
          (s.prototype.divmod = function (t, e, r) {
            return (
              i(!t.isZero()),
              this.isZero()
                ? { div: new s(0), mod: new s(0) }
                : 0 !== this.negative && 0 === t.negative
                ? ((a = this.neg().divmod(t, e)),
                  "mod" !== e && (n = a.div.neg()),
                  "div" !== e &&
                    ((o = a.mod.neg()), r && 0 !== o.negative && o.iadd(t)),
                  { div: n, mod: o })
                : 0 === this.negative && 0 !== t.negative
                ? ((a = this.divmod(t.neg(), e)),
                  "mod" !== e && (n = a.div.neg()),
                  { div: n, mod: a.mod })
                : 0 != (this.negative & t.negative)
                ? ((a = this.neg().divmod(t.neg(), e)),
                  "div" !== e &&
                    ((o = a.mod.neg()), r && 0 !== o.negative && o.isub(t)),
                  { div: a.div, mod: o })
                : t.length > this.length || this.cmp(t) < 0
                ? { div: new s(0), mod: this }
                : 1 === t.length
                ? "div" === e
                  ? { div: this.divn(t.words[0]), mod: null }
                  : "mod" === e
                  ? { div: null, mod: new s(this.modn(t.words[0])) }
                  : {
                      div: this.divn(t.words[0]),
                      mod: new s(this.modn(t.words[0])),
                    }
                : this._wordDiv(t, e)
            );
            var n, o, a;
          }),
          (s.prototype.div = function (t) {
            return this.divmod(t, "div", !1).div;
          }),
          (s.prototype.mod = function (t) {
            return this.divmod(t, "mod", !1).mod;
          }),
          (s.prototype.umod = function (t) {
            return this.divmod(t, "mod", !0).mod;
          }),
          (s.prototype.divRound = function (t) {
            var e = this.divmod(t);
            if (e.mod.isZero()) return e.div;
            var r = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
              i = t.ushrn(1),
              n = t.andln(1),
              s = r.cmp(i);
            return s < 0 || (1 === n && 0 === s)
              ? e.div
              : 0 !== e.div.negative
              ? e.div.isubn(1)
              : e.div.iaddn(1);
          }),
          (s.prototype.modn = function (t) {
            i(t <= 67108863);
            for (var e = (1 << 26) % t, r = 0, n = this.length - 1; n >= 0; n--)
              r = (e * r + (0 | this.words[n])) % t;
            return r;
          }),
          (s.prototype.idivn = function (t) {
            i(t <= 67108863);
            for (var e = 0, r = this.length - 1; r >= 0; r--) {
              var n = (0 | this.words[r]) + 67108864 * e;
              (this.words[r] = (n / t) | 0), (e = n % t);
            }
            return this.strip();
          }),
          (s.prototype.divn = function (t) {
            return this.clone().idivn(t);
          }),
          (s.prototype.egcd = function (t) {
            i(0 === t.negative), i(!t.isZero());
            var e = this,
              r = t.clone();
            e = 0 !== e.negative ? e.umod(t) : e.clone();
            for (
              var n = new s(1), o = new s(0), a = new s(0), f = new s(1), h = 0;
              e.isEven() && r.isEven();

            )
              e.iushrn(1), r.iushrn(1), ++h;
            for (var u = r.clone(), c = e.clone(); !e.isZero(); ) {
              for (
                var d = 0, l = 1;
                0 == (e.words[0] & l) && d < 26;
                ++d, l <<= 1
              );
              if (d > 0)
                for (e.iushrn(d); d-- > 0; )
                  (n.isOdd() || o.isOdd()) && (n.iadd(u), o.isub(c)),
                    n.iushrn(1),
                    o.iushrn(1);
              for (
                var p = 0, b = 1;
                0 == (r.words[0] & b) && p < 26;
                ++p, b <<= 1
              );
              if (p > 0)
                for (r.iushrn(p); p-- > 0; )
                  (a.isOdd() || f.isOdd()) && (a.iadd(u), f.isub(c)),
                    a.iushrn(1),
                    f.iushrn(1);
              e.cmp(r) >= 0
                ? (e.isub(r), n.isub(a), o.isub(f))
                : (r.isub(e), a.isub(n), f.isub(o));
            }
            return { a: a, b: f, gcd: r.iushln(h) };
          }),
          (s.prototype._invmp = function (t) {
            i(0 === t.negative), i(!t.isZero());
            var e = this,
              r = t.clone();
            e = 0 !== e.negative ? e.umod(t) : e.clone();
            for (
              var n, o = new s(1), a = new s(0), f = r.clone();
              e.cmpn(1) > 0 && r.cmpn(1) > 0;

            ) {
              for (
                var h = 0, u = 1;
                0 == (e.words[0] & u) && h < 26;
                ++h, u <<= 1
              );
              if (h > 0)
                for (e.iushrn(h); h-- > 0; )
                  o.isOdd() && o.iadd(f), o.iushrn(1);
              for (
                var c = 0, d = 1;
                0 == (r.words[0] & d) && c < 26;
                ++c, d <<= 1
              );
              if (c > 0)
                for (r.iushrn(c); c-- > 0; )
                  a.isOdd() && a.iadd(f), a.iushrn(1);
              e.cmp(r) >= 0 ? (e.isub(r), o.isub(a)) : (r.isub(e), a.isub(o));
            }
            return (n = 0 === e.cmpn(1) ? o : a), n.cmpn(0) < 0 && n.iadd(t), n;
          }),
          (s.prototype.gcd = function (t) {
            if (this.isZero()) return t.abs();
            if (t.isZero()) return this.abs();
            var e = this.clone(),
              r = t.clone();
            (e.negative = 0), (r.negative = 0);
            for (var i = 0; e.isEven() && r.isEven(); i++)
              e.iushrn(1), r.iushrn(1);
            for (;;) {
              for (; e.isEven(); ) e.iushrn(1);
              for (; r.isEven(); ) r.iushrn(1);
              var n = e.cmp(r);
              if (n < 0) {
                var s = e;
                (e = r), (r = s);
              } else if (0 === n || 0 === r.cmpn(1)) break;
              e.isub(r);
            }
            return r.iushln(i);
          }),
          (s.prototype.invm = function (t) {
            return this.egcd(t).a.umod(t);
          }),
          (s.prototype.isEven = function () {
            return 0 == (1 & this.words[0]);
          }),
          (s.prototype.isOdd = function () {
            return 1 == (1 & this.words[0]);
          }),
          (s.prototype.andln = function (t) {
            return this.words[0] & t;
          }),
          (s.prototype.bincn = function (t) {
            i("number" == typeof t);
            var e = t % 26,
              r = (t - e) / 26,
              n = 1 << e;
            if (this.length <= r)
              return this._expand(r + 1), (this.words[r] |= n), this;
            for (var s = n, o = r; 0 !== s && o < this.length; o++) {
              var a = 0 | this.words[o];
              (a += s), (s = a >>> 26), (a &= 67108863), (this.words[o] = a);
            }
            return 0 !== s && ((this.words[o] = s), this.length++), this;
          }),
          (s.prototype.isZero = function () {
            return 1 === this.length && 0 === this.words[0];
          }),
          (s.prototype.cmpn = function (t) {
            var e,
              r = t < 0;
            if (0 !== this.negative && !r) return -1;
            if (0 === this.negative && r) return 1;
            if ((this.strip(), this.length > 1)) e = 1;
            else {
              r && (t = -t), i(t <= 67108863, "Number is too big");
              var n = 0 | this.words[0];
              e = n === t ? 0 : n < t ? -1 : 1;
            }
            return 0 !== this.negative ? 0 | -e : e;
          }),
          (s.prototype.cmp = function (t) {
            if (0 !== this.negative && 0 === t.negative) return -1;
            if (0 === this.negative && 0 !== t.negative) return 1;
            var e = this.ucmp(t);
            return 0 !== this.negative ? 0 | -e : e;
          }),
          (s.prototype.ucmp = function (t) {
            if (this.length > t.length) return 1;
            if (this.length < t.length) return -1;
            for (var e = 0, r = this.length - 1; r >= 0; r--) {
              var i = 0 | this.words[r],
                n = 0 | t.words[r];
              if (i !== n) {
                i < n ? (e = -1) : i > n && (e = 1);
                break;
              }
            }
            return e;
          }),
          (s.prototype.gtn = function (t) {
            return 1 === this.cmpn(t);
          }),
          (s.prototype.gt = function (t) {
            return 1 === this.cmp(t);
          }),
          (s.prototype.gten = function (t) {
            return this.cmpn(t) >= 0;
          }),
          (s.prototype.gte = function (t) {
            return this.cmp(t) >= 0;
          }),
          (s.prototype.ltn = function (t) {
            return -1 === this.cmpn(t);
          }),
          (s.prototype.lt = function (t) {
            return -1 === this.cmp(t);
          }),
          (s.prototype.lten = function (t) {
            return this.cmpn(t) <= 0;
          }),
          (s.prototype.lte = function (t) {
            return this.cmp(t) <= 0;
          }),
          (s.prototype.eqn = function (t) {
            return 0 === this.cmpn(t);
          }),
          (s.prototype.eq = function (t) {
            return 0 === this.cmp(t);
          }),
          (s.red = function (t) {
            return new v(t);
          }),
          (s.prototype.toRed = function (t) {
            return (
              i(!this.red, "Already a number in reduction context"),
              i(0 === this.negative, "red works only with positives"),
              t.convertTo(this)._forceRed(t)
            );
          }),
          (s.prototype.fromRed = function () {
            return (
              i(
                this.red,
                "fromRed works only with numbers in reduction context"
              ),
              this.red.convertFrom(this)
            );
          }),
          (s.prototype._forceRed = function (t) {
            return (this.red = t), this;
          }),
          (s.prototype.forceRed = function (t) {
            return (
              i(!this.red, "Already a number in reduction context"),
              this._forceRed(t)
            );
          }),
          (s.prototype.redAdd = function (t) {
            return (
              i(this.red, "redAdd works only with red numbers"),
              this.red.add(this, t)
            );
          }),
          (s.prototype.redIAdd = function (t) {
            return (
              i(this.red, "redIAdd works only with red numbers"),
              this.red.iadd(this, t)
            );
          }),
          (s.prototype.redSub = function (t) {
            return (
              i(this.red, "redSub works only with red numbers"),
              this.red.sub(this, t)
            );
          }),
          (s.prototype.redISub = function (t) {
            return (
              i(this.red, "redISub works only with red numbers"),
              this.red.isub(this, t)
            );
          }),
          (s.prototype.redShl = function (t) {
            return (
              i(this.red, "redShl works only with red numbers"),
              this.red.shl(this, t)
            );
          }),
          (s.prototype.redMul = function (t) {
            return (
              i(this.red, "redMul works only with red numbers"),
              this.red._verify2(this, t),
              this.red.mul(this, t)
            );
          }),
          (s.prototype.redIMul = function (t) {
            return (
              i(this.red, "redMul works only with red numbers"),
              this.red._verify2(this, t),
              this.red.imul(this, t)
            );
          }),
          (s.prototype.redSqr = function () {
            return (
              i(this.red, "redSqr works only with red numbers"),
              this.red._verify1(this),
              this.red.sqr(this)
            );
          }),
          (s.prototype.redISqr = function () {
            return (
              i(this.red, "redISqr works only with red numbers"),
              this.red._verify1(this),
              this.red.isqr(this)
            );
          }),
          (s.prototype.redSqrt = function () {
            return (
              i(this.red, "redSqrt works only with red numbers"),
              this.red._verify1(this),
              this.red.sqrt(this)
            );
          }),
          (s.prototype.redInvm = function () {
            return (
              i(this.red, "redInvm works only with red numbers"),
              this.red._verify1(this),
              this.red.invm(this)
            );
          }),
          (s.prototype.redNeg = function () {
            return (
              i(this.red, "redNeg works only with red numbers"),
              this.red._verify1(this),
              this.red.neg(this)
            );
          }),
          (s.prototype.redPow = function (t) {
            return (
              i(this.red && !t.red, "redPow(normalNum)"),
              this.red._verify1(this),
              this.red.pow(this, t)
            );
          });
        var A = { k256: null, p224: null, p192: null, p25519: null };
        (p.prototype._tmp = function () {
          var t = new s(null);
          return (t.words = new Array(Math.ceil(this.n / 13))), t;
        }),
          (p.prototype.ireduce = function (t) {
            var e,
              r = t;
            do {
              this.split(r, this.tmp),
                (r = this.imulK(r)),
                (r = r.iadd(this.tmp)),
                (e = r.bitLength());
            } while (e > this.n);
            var i = e < this.n ? -1 : r.ucmp(this.p);
            return (
              0 === i
                ? ((r.words[0] = 0), (r.length = 1))
                : i > 0
                ? r.isub(this.p)
                : void 0 !== r.strip
                ? r.strip()
                : r._strip(),
              r
            );
          }),
          (p.prototype.split = function (t, e) {
            t.iushrn(this.n, 0, e);
          }),
          (p.prototype.imulK = function (t) {
            return t.imul(this.k);
          }),
          n(b, p),
          (b.prototype.split = function (t, e) {
            for (var r = 4194303, i = Math.min(t.length, 9), n = 0; n < i; n++)
              e.words[n] = t.words[n];
            if (((e.length = i), t.length <= 9))
              return (t.words[0] = 0), void (t.length = 1);
            var s = t.words[9];
            for (e.words[e.length++] = s & r, n = 10; n < t.length; n++) {
              var o = 0 | t.words[n];
              (t.words[n - 10] = ((o & r) << 4) | (s >>> 22)), (s = o);
            }
            (s >>>= 22),
              (t.words[n - 10] = s),
              0 === s && t.length > 10 ? (t.length -= 10) : (t.length -= 9);
          }),
          (b.prototype.imulK = function (t) {
            (t.words[t.length] = 0),
              (t.words[t.length + 1] = 0),
              (t.length += 2);
            for (var e = 0, r = 0; r < t.length; r++) {
              var i = 0 | t.words[r];
              (e += 977 * i),
                (t.words[r] = 67108863 & e),
                (e = 64 * i + ((e / 67108864) | 0));
            }
            return (
              0 === t.words[t.length - 1] &&
                (t.length--, 0 === t.words[t.length - 1] && t.length--),
              t
            );
          }),
          n(m, p),
          n(y, p),
          n(g, p),
          (g.prototype.imulK = function (t) {
            for (var e = 0, r = 0; r < t.length; r++) {
              var i = 19 * (0 | t.words[r]) + e,
                n = 67108863 & i;
              (i >>>= 26), (t.words[r] = n), (e = i);
            }
            return 0 !== e && (t.words[t.length++] = e), t;
          }),
          (s._prime = function (t) {
            if (A[t]) return A[t];
            var e;
            if ("k256" === t) e = new b();
            else if ("p224" === t) e = new m();
            else if ("p192" === t) e = new y();
            else {
              if ("p25519" !== t) throw new Error("Unknown prime " + t);
              e = new g();
            }
            return (A[t] = e), e;
          }),
          (v.prototype._verify1 = function (t) {
            i(0 === t.negative, "red works only with positives"),
              i(t.red, "red works only with red numbers");
          }),
          (v.prototype._verify2 = function (t, e) {
            i(0 == (t.negative | e.negative), "red works only with positives"),
              i(t.red && t.red === e.red, "red works only with red numbers");
          }),
          (v.prototype.imod = function (t) {
            return this.prime
              ? this.prime.ireduce(t)._forceRed(this)
              : t.umod(this.m)._forceRed(this);
          }),
          (v.prototype.neg = function (t) {
            return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this);
          }),
          (v.prototype.add = function (t, e) {
            this._verify2(t, e);
            var r = t.add(e);
            return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this);
          }),
          (v.prototype.iadd = function (t, e) {
            this._verify2(t, e);
            var r = t.iadd(e);
            return r.cmp(this.m) >= 0 && r.isub(this.m), r;
          }),
          (v.prototype.sub = function (t, e) {
            this._verify2(t, e);
            var r = t.sub(e);
            return r.cmpn(0) < 0 && r.iadd(this.m), r._forceRed(this);
          }),
          (v.prototype.isub = function (t, e) {
            this._verify2(t, e);
            var r = t.isub(e);
            return r.cmpn(0) < 0 && r.iadd(this.m), r;
          }),
          (v.prototype.shl = function (t, e) {
            return this._verify1(t), this.imod(t.ushln(e));
          }),
          (v.prototype.imul = function (t, e) {
            return this._verify2(t, e), this.imod(t.imul(e));
          }),
          (v.prototype.mul = function (t, e) {
            return this._verify2(t, e), this.imod(t.mul(e));
          }),
          (v.prototype.isqr = function (t) {
            return this.imul(t, t.clone());
          }),
          (v.prototype.sqr = function (t) {
            return this.mul(t, t);
          }),
          (v.prototype.sqrt = function (t) {
            if (t.isZero()) return t.clone();
            var e = this.m.andln(3);
            if ((i(e % 2 == 1), 3 === e)) {
              var r = this.m.add(new s(1)).iushrn(2);
              return this.pow(t, r);
            }
            for (
              var n = this.m.subn(1), o = 0;
              !n.isZero() && 0 === n.andln(1);

            )
              o++, n.iushrn(1);
            i(!n.isZero());
            var a = new s(1).toRed(this),
              f = a.redNeg(),
              h = this.m.subn(1).iushrn(1),
              u = this.m.bitLength();
            for (
              u = new s(2 * u * u).toRed(this);
              0 !== this.pow(u, h).cmp(f);

            )
              u.redIAdd(f);
            for (
              var c = this.pow(u, n),
                d = this.pow(t, n.addn(1).iushrn(1)),
                l = this.pow(t, n),
                p = o;
              0 !== l.cmp(a);

            ) {
              for (var b = l, m = 0; 0 !== b.cmp(a); m++) b = b.redSqr();
              i(m < p);
              var y = this.pow(c, new s(1).iushln(p - m - 1));
              (d = d.redMul(y)), (c = y.redSqr()), (l = l.redMul(c)), (p = m);
            }
            return d;
          }),
          (v.prototype.invm = function (t) {
            var e = t._invmp(this.m);
            return 0 !== e.negative
              ? ((e.negative = 0), this.imod(e).redNeg())
              : this.imod(e);
          }),
          (v.prototype.pow = function (t, e) {
            if (e.isZero()) return new s(1).toRed(this);
            if (0 === e.cmpn(1)) return t.clone();
            var r = 4,
              i = new Array(1 << r);
            (i[0] = new s(1).toRed(this)), (i[1] = t);
            for (var n = 2; n < i.length; n++) i[n] = this.mul(i[n - 1], t);
            var o = i[0],
              a = 0,
              f = 0,
              h = e.bitLength() % 26;
            for (0 === h && (h = 26), n = e.length - 1; n >= 0; n--) {
              for (var u = e.words[n], c = h - 1; c >= 0; c--) {
                var d = (u >> c) & 1;
                o !== i[0] && (o = this.sqr(o)),
                  0 !== d || 0 !== a
                    ? ((a <<= 1),
                      (a |= d),
                      f++,
                      (f === r || (0 === n && 0 === c)) &&
                        ((o = this.mul(o, i[a])), (f = 0), (a = 0)))
                    : (f = 0);
              }
              h = 26;
            }
            return o;
          }),
          (v.prototype.convertTo = function (t) {
            var e = t.umod(this.m);
            return e === t ? e.clone() : e;
          }),
          (v.prototype.convertFrom = function (t) {
            var e = t.clone();
            return (e.red = null), e;
          }),
          (s.mont = function (t) {
            return new w(t);
          }),
          n(w, v),
          (w.prototype.convertTo = function (t) {
            return this.imod(t.ushln(this.shift));
          }),
          (w.prototype.convertFrom = function (t) {
            var e = this.imod(t.mul(this.rinv));
            return (e.red = null), e;
          }),
          (w.prototype.imul = function (t, e) {
            if (t.isZero() || e.isZero())
              return (t.words[0] = 0), (t.length = 1), t;
            var r = t.imul(e),
              i = r
                .maskn(this.shift)
                .mul(this.minv)
                .imaskn(this.shift)
                .mul(this.m),
              n = r.isub(i).iushrn(this.shift),
              s = n;
            return (
              n.cmp(this.m) >= 0
                ? (s = n.isub(this.m))
                : n.cmpn(0) < 0 && (s = n.iadd(this.m)),
              s._forceRed(this)
            );
          }),
          (w.prototype.mul = function (t, e) {
            if (t.isZero() || e.isZero()) return new s(0)._forceRed(this);
            var r = t.mul(e),
              i = r
                .maskn(this.shift)
                .mul(this.minv)
                .imaskn(this.shift)
                .mul(this.m),
              n = r.isub(i).iushrn(this.shift),
              o = n;
            return (
              n.cmp(this.m) >= 0
                ? (o = n.isub(this.m))
                : n.cmpn(0) < 0 && (o = n.iadd(this.m)),
              o._forceRed(this)
            );
          }),
          (w.prototype.invm = function (t) {
            var e = this.imod(t._invmp(this.m).mul(this.r2));
            return e._forceRed(this);
          });
      })(void 0 === e || e, this);
    },
    { buffer: 19 },
  ],
  16: [
    function (t, e, r) {
      "use strict";
      function i(t) {
        var e = t.length;
        if (e % 4 > 0)
          throw new Error("Invalid string. Length must be a multiple of 4");
        var r = t.indexOf("=");
        -1 === r && (r = e);
        var i = r === e ? 0 : 4 - (r % 4);
        return [r, i];
      }
      function n(t) {
        var e = i(t),
          r = e[0],
          n = e[1];
        return (3 * (r + n)) / 4 - n;
      }
      function s(t, e, r) {
        return (3 * (e + r)) / 4 - r;
      }
      function o(t) {
        var e,
          r,
          n = i(t),
          o = n[0],
          a = n[1],
          f = new d(s(t, o, a)),
          h = 0,
          u = a > 0 ? o - 4 : o;
        for (r = 0; r < u; r += 4)
          (e =
            (c[t.charCodeAt(r)] << 18) |
            (c[t.charCodeAt(r + 1)] << 12) |
            (c[t.charCodeAt(r + 2)] << 6) |
            c[t.charCodeAt(r + 3)]),
            (f[h++] = (e >> 16) & 255),
            (f[h++] = (e >> 8) & 255),
            (f[h++] = 255 & e);
        return (
          2 === a &&
            ((e = (c[t.charCodeAt(r)] << 2) | (c[t.charCodeAt(r + 1)] >> 4)),
            (f[h++] = 255 & e)),
          1 === a &&
            ((e =
              (c[t.charCodeAt(r)] << 10) |
              (c[t.charCodeAt(r + 1)] << 4) |
              (c[t.charCodeAt(r + 2)] >> 2)),
            (f[h++] = (e >> 8) & 255),
            (f[h++] = 255 & e)),
          f
        );
      }
      function a(t) {
        return (
          u[(t >> 18) & 63] + u[(t >> 12) & 63] + u[(t >> 6) & 63] + u[63 & t]
        );
      }
      function f(t, e, r) {
        for (var i, n = [], s = e; s < r; s += 3)
          (i =
            ((t[s] << 16) & 16711680) +
            ((t[s + 1] << 8) & 65280) +
            (255 & t[s + 2])),
            n.push(a(i));
        return n.join("");
      }
      function h(t) {
        for (
          var e, r = t.length, i = r % 3, n = [], s = 16383, o = 0, a = r - i;
          o < a;
          o += s
        )
          n.push(f(t, o, o + s > a ? a : o + s));
        return (
          1 === i
            ? ((e = t[r - 1]), n.push(u[e >> 2] + u[(e << 4) & 63] + "=="))
            : 2 === i &&
              ((e = (t[r - 2] << 8) + t[r - 1]),
              n.push(u[e >> 10] + u[(e >> 4) & 63] + u[(e << 2) & 63] + "=")),
          n.join("")
        );
      }
      (r.byteLength = n), (r.toByteArray = o), (r.fromByteArray = h);
      for (
        var u = [],
          c = [],
          d = "undefined" != typeof Uint8Array ? Uint8Array : Array,
          l =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
          p = 0,
          b = l.length;
        p < b;
        ++p
      )
        (u[p] = l[p]), (c[l.charCodeAt(p)] = p);
      (c["-".charCodeAt(0)] = 62), (c["_".charCodeAt(0)] = 63);
    },
    {},
  ],
  17: [
    function (t, e, r) {
      (function (e, r) {
        "use strict";
        function i(t, e) {
          if (!t) throw new Error(e || "Assertion failed");
        }
        function n(t, e) {
          t.super_ = e;
          var r = function () {};
          (r.prototype = e.prototype),
            (t.prototype = new r()),
            (t.prototype.constructor = t);
        }
        function s(t, e, r) {
          if (s.isBN(t)) return t;
          (this.negative = 0),
            (this.words = null),
            (this.length = 0),
            (this.red = null),
            null !== t &&
              (("le" !== e && "be" !== e) || ((r = e), (e = 10)),
              this._init(t || 0, e || 10, r || "be"));
        }
        function o(t, e) {
          var r = t.charCodeAt(e);
          return r >= 48 && r <= 57
            ? r - 48
            : r >= 65 && r <= 70
            ? r - 55
            : r >= 97 && r <= 102
            ? r - 87
            : void i(!1, "Invalid character in " + t);
        }
        function a(t, e, r) {
          var i = o(t, r);
          return r - 1 >= e && (i |= o(t, r - 1) << 4), i;
        }
        function f(t, e, r, n) {
          for (var s = 0, o = 0, a = Math.min(t.length, r), f = e; f < a; f++) {
            var h = t.charCodeAt(f) - 48;
            (s *= n),
              (o = h >= 49 ? h - 49 + 10 : h >= 17 ? h - 17 + 10 : h),
              i(h >= 0 && o < n, "Invalid character"),
              (s += o);
          }
          return s;
        }
        function h(t, e) {
          (t.words = e.words),
            (t.length = e.length),
            (t.negative = e.negative),
            (t.red = e.red);
        }
        function u() {
          return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
        }
        function c(t) {
          for (var e = new Array(t.bitLength()), r = 0; r < e.length; r++) {
            var i = (r / 26) | 0,
              n = r % 26;
            e[r] = (t.words[i] >>> n) & 1;
          }
          return e;
        }
        function d(t, e, r) {
          r.negative = e.negative ^ t.negative;
          var i = (t.length + e.length) | 0;
          (r.length = i), (i = (i - 1) | 0);
          var n = 0 | t.words[0],
            s = 0 | e.words[0],
            o = n * s,
            a = 67108863 & o,
            f = (o / 67108864) | 0;
          r.words[0] = a;
          for (var h = 1; h < i; h++) {
            for (
              var u = f >>> 26,
                c = 67108863 & f,
                d = Math.min(h, e.length - 1),
                l = Math.max(0, h - t.length + 1);
              l <= d;
              l++
            ) {
              var p = (h - l) | 0;
              (n = 0 | t.words[p]),
                (s = 0 | e.words[l]),
                (o = n * s + c),
                (u += (o / 67108864) | 0),
                (c = 67108863 & o);
            }
            (r.words[h] = 0 | c), (f = 0 | u);
          }
          return 0 !== f ? (r.words[h] = 0 | f) : r.length--, r._strip();
        }
        function l(t, e, r) {
          (r.negative = e.negative ^ t.negative),
            (r.length = t.length + e.length);
          for (var i = 0, n = 0, s = 0; s < r.length - 1; s++) {
            var o = n;
            n = 0;
            for (
              var a = 67108863 & i,
                f = Math.min(s, e.length - 1),
                h = Math.max(0, s - t.length + 1);
              h <= f;
              h++
            ) {
              var u = s - h,
                c = 0 | t.words[u],
                d = 0 | e.words[h],
                l = c * d,
                p = 67108863 & l;
              (o = (o + ((l / 67108864) | 0)) | 0),
                (p = (p + a) | 0),
                (a = 67108863 & p),
                (o = (o + (p >>> 26)) | 0),
                (n += o >>> 26),
                (o &= 67108863);
            }
            (r.words[s] = a), (i = o), (o = n);
          }
          return 0 !== i ? (r.words[s] = i) : r.length--, r._strip();
        }
        function p(t, e, r) {
          return l(t, e, r);
        }
        function b(t, e) {
          (this.x = t), (this.y = e);
        }
        function m(t, e) {
          (this.name = t),
            (this.p = new s(e, 16)),
            (this.n = this.p.bitLength()),
            (this.k = new s(1).iushln(this.n).isub(this.p)),
            (this.tmp = this._tmp());
        }
        function y() {
          m.call(
            this,
            "k256",
            "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
          );
        }
        function g() {
          m.call(
            this,
            "p224",
            "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
          );
        }
        function v() {
          m.call(
            this,
            "p192",
            "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
          );
        }
        function w() {
          m.call(
            this,
            "25519",
            "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
          );
        }
        function _(t) {
          if ("string" == typeof t) {
            var e = s._prime(t);
            (this.m = e.p), (this.prime = e);
          } else
            i(t.gtn(1), "modulus must be greater than 1"),
              (this.m = t),
              (this.prime = null);
        }
        function M(t) {
          _.call(this, t),
            (this.shift = this.m.bitLength()),
            this.shift % 26 != 0 && (this.shift += 26 - (this.shift % 26)),
            (this.r = new s(1).iushln(this.shift)),
            (this.r2 = this.imod(this.r.sqr())),
            (this.rinv = this.r._invmp(this.m)),
            (this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
            (this.minv = this.minv.umod(this.r)),
            (this.minv = this.r.sub(this.minv));
        }
        var S;
        "object" == typeof e ? (e.exports = s) : (r.BN = s),
          (s.BN = s),
          (s.wordSize = 26);
        try {
          S =
            "undefined" != typeof window && void 0 !== window.Buffer
              ? window.Buffer
              : t("buffer").Buffer;
        } catch (t) {}
        if (
          ((s.isBN = function (t) {
            return (
              t instanceof s ||
              (null !== t &&
                "object" == typeof t &&
                t.constructor.wordSize === s.wordSize &&
                Array.isArray(t.words))
            );
          }),
          (s.max = function (t, e) {
            return t.cmp(e) > 0 ? t : e;
          }),
          (s.min = function (t, e) {
            return t.cmp(e) < 0 ? t : e;
          }),
          (s.prototype._init = function (t, e, r) {
            if ("number" == typeof t) return this._initNumber(t, e, r);
            if ("object" == typeof t) return this._initArray(t, e, r);
            "hex" === e && (e = 16),
              i(e === (0 | e) && e >= 2 && e <= 36),
              (t = t.toString().replace(/\s+/g, ""));
            var n = 0;
            "-" === t[0] && (n++, (this.negative = 1)),
              n < t.length &&
                (16 === e
                  ? this._parseHex(t, n, r)
                  : (this._parseBase(t, e, n),
                    "le" === r && this._initArray(this.toArray(), e, r)));
          }),
          (s.prototype._initNumber = function (t, e, r) {
            t < 0 && ((this.negative = 1), (t = -t)),
              t < 67108864
                ? ((this.words = [67108863 & t]), (this.length = 1))
                : t < 4503599627370496
                ? ((this.words = [67108863 & t, (t / 67108864) & 67108863]),
                  (this.length = 2))
                : (i(t < 9007199254740992),
                  (this.words = [67108863 & t, (t / 67108864) & 67108863, 1]),
                  (this.length = 3)),
              "le" === r && this._initArray(this.toArray(), e, r);
          }),
          (s.prototype._initArray = function (t, e, r) {
            if ((i("number" == typeof t.length), t.length <= 0))
              return (this.words = [0]), (this.length = 1), this;
            (this.length = Math.ceil(t.length / 3)),
              (this.words = new Array(this.length));
            for (var n = 0; n < this.length; n++) this.words[n] = 0;
            var s,
              o,
              a = 0;
            if ("be" === r)
              for (n = t.length - 1, s = 0; n >= 0; n -= 3)
                (o = t[n] | (t[n - 1] << 8) | (t[n - 2] << 16)),
                  (this.words[s] |= (o << a) & 67108863),
                  (this.words[s + 1] = (o >>> (26 - a)) & 67108863),
                  (a += 24),
                  a >= 26 && ((a -= 26), s++);
            else if ("le" === r)
              for (n = 0, s = 0; n < t.length; n += 3)
                (o = t[n] | (t[n + 1] << 8) | (t[n + 2] << 16)),
                  (this.words[s] |= (o << a) & 67108863),
                  (this.words[s + 1] = (o >>> (26 - a)) & 67108863),
                  (a += 24),
                  a >= 26 && ((a -= 26), s++);
            return this._strip();
          }),
          (s.prototype._parseHex = function (t, e, r) {
            (this.length = Math.ceil((t.length - e) / 6)),
              (this.words = new Array(this.length));
            for (var i = 0; i < this.length; i++) this.words[i] = 0;
            var n,
              s = 0,
              o = 0;
            if ("be" === r)
              for (i = t.length - 1; i >= e; i -= 2)
                (n = a(t, e, i) << s),
                  (this.words[o] |= 67108863 & n),
                  s >= 18
                    ? ((s -= 18), (o += 1), (this.words[o] |= n >>> 26))
                    : (s += 8);
            else {
              var f = t.length - e;
              for (i = f % 2 == 0 ? e + 1 : e; i < t.length; i += 2)
                (n = a(t, e, i) << s),
                  (this.words[o] |= 67108863 & n),
                  s >= 18
                    ? ((s -= 18), (o += 1), (this.words[o] |= n >>> 26))
                    : (s += 8);
            }
            this._strip();
          }),
          (s.prototype._parseBase = function (t, e, r) {
            (this.words = [0]), (this.length = 1);
            for (var i = 0, n = 1; n <= 67108863; n *= e) i++;
            i--, (n = (n / e) | 0);
            for (
              var s = t.length - r,
                o = s % i,
                a = Math.min(s, s - o) + r,
                h = 0,
                u = r;
              u < a;
              u += i
            )
              (h = f(t, u, u + i, e)),
                this.imuln(n),
                this.words[0] + h < 67108864
                  ? (this.words[0] += h)
                  : this._iaddn(h);
            if (0 !== o) {
              var c = 1;
              for (h = f(t, u, t.length, e), u = 0; u < o; u++) c *= e;
              this.imuln(c),
                this.words[0] + h < 67108864
                  ? (this.words[0] += h)
                  : this._iaddn(h);
            }
            this._strip();
          }),
          (s.prototype.copy = function (t) {
            t.words = new Array(this.length);
            for (var e = 0; e < this.length; e++) t.words[e] = this.words[e];
            (t.length = this.length),
              (t.negative = this.negative),
              (t.red = this.red);
          }),
          (s.prototype._move = function (t) {
            h(t, this);
          }),
          (s.prototype.clone = function () {
            var t = new s(null);
            return this.copy(t), t;
          }),
          (s.prototype._expand = function (t) {
            for (; this.length < t; ) this.words[this.length++] = 0;
            return this;
          }),
          (s.prototype._strip = function () {
            for (; this.length > 1 && 0 === this.words[this.length - 1]; )
              this.length--;
            return this._normSign();
          }),
          (s.prototype._normSign = function () {
            return (
              1 === this.length && 0 === this.words[0] && (this.negative = 0),
              this
            );
          }),
          "undefined" != typeof Symbol && "function" == typeof Symbol.for)
        )
          try {
            s.prototype[Symbol.for("nodejs.util.inspect.custom")] = u;
          } catch (t) {
            s.prototype.inspect = u;
          }
        else s.prototype.inspect = u;
        var E = [
            "",
            "0",
            "00",
            "000",
            "0000",
            "00000",
            "000000",
            "0000000",
            "00000000",
            "000000000",
            "0000000000",
            "00000000000",
            "000000000000",
            "0000000000000",
            "00000000000000",
            "000000000000000",
            "0000000000000000",
            "00000000000000000",
            "000000000000000000",
            "0000000000000000000",
            "00000000000000000000",
            "000000000000000000000",
            "0000000000000000000000",
            "00000000000000000000000",
            "000000000000000000000000",
            "0000000000000000000000000",
          ],
          k = [
            0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6,
            5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
          ],
          A = [
            0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607,
            16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536,
            11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101,
            5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368,
            20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875,
            60466176,
          ];
        (s.prototype.toString = function (t, e) {
          var r;
          if (((t = t || 10), (e = 0 | e || 1), 16 === t || "hex" === t)) {
            r = "";
            for (var n = 0, s = 0, o = 0; o < this.length; o++) {
              var a = this.words[o],
                f = (16777215 & ((a << n) | s)).toString(16);
              (s = (a >>> (24 - n)) & 16777215),
                (n += 2),
                n >= 26 && ((n -= 26), o--),
                (r =
                  0 !== s || o !== this.length - 1
                    ? E[6 - f.length] + f + r
                    : f + r);
            }
            for (0 !== s && (r = s.toString(16) + r); r.length % e != 0; )
              r = "0" + r;
            return 0 !== this.negative && (r = "-" + r), r;
          }
          if (t === (0 | t) && t >= 2 && t <= 36) {
            var h = k[t],
              u = A[t];
            r = "";
            var c = this.clone();
            for (c.negative = 0; !c.isZero(); ) {
              var d = c.modrn(u).toString(t);
              (c = c.idivn(u)),
                (r = c.isZero() ? d + r : E[h - d.length] + d + r);
            }
            for (this.isZero() && (r = "0" + r); r.length % e != 0; )
              r = "0" + r;
            return 0 !== this.negative && (r = "-" + r), r;
          }
          i(!1, "Base should be between 2 and 36");
        }),
          (s.prototype.toNumber = function () {
            var t = this.words[0];
            return (
              2 === this.length
                ? (t += 67108864 * this.words[1])
                : 3 === this.length && 1 === this.words[2]
                ? (t += 4503599627370496 + 67108864 * this.words[1])
                : this.length > 2 &&
                  i(!1, "Number can only safely store up to 53 bits"),
              0 !== this.negative ? -t : t
            );
          }),
          (s.prototype.toJSON = function () {
            return this.toString(16, 2);
          }),
          S &&
            (s.prototype.toBuffer = function (t, e) {
              return this.toArrayLike(S, t, e);
            }),
          (s.prototype.toArray = function (t, e) {
            return this.toArrayLike(Array, t, e);
          });
        var x = function (t, e) {
          return t.allocUnsafe ? t.allocUnsafe(e) : new t(e);
        };
        (s.prototype.toArrayLike = function (t, e, r) {
          this._strip();
          var n = this.byteLength(),
            s = r || Math.max(1, n);
          i(n <= s, "byte array longer than desired length"),
            i(s > 0, "Requested array length <= 0");
          var o = x(t, s),
            a = "le" === e ? "LE" : "BE";
          return this["_toArrayLike" + a](o, n), o;
        }),
          (s.prototype._toArrayLikeLE = function (t, e) {
            for (var r = 0, i = 0, n = 0, s = 0; n < this.length; n++) {
              var o = (this.words[n] << s) | i;
              (t[r++] = 255 & o),
                r < t.length && (t[r++] = (o >> 8) & 255),
                r < t.length && (t[r++] = (o >> 16) & 255),
                6 === s
                  ? (r < t.length && (t[r++] = (o >> 24) & 255),
                    (i = 0),
                    (s = 0))
                  : ((i = o >>> 24), (s += 2));
            }
            if (r < t.length) for (t[r++] = i; r < t.length; ) t[r++] = 0;
          }),
          (s.prototype._toArrayLikeBE = function (t, e) {
            for (
              var r = t.length - 1, i = 0, n = 0, s = 0;
              n < this.length;
              n++
            ) {
              var o = (this.words[n] << s) | i;
              (t[r--] = 255 & o),
                r >= 0 && (t[r--] = (o >> 8) & 255),
                r >= 0 && (t[r--] = (o >> 16) & 255),
                6 === s
                  ? (r >= 0 && (t[r--] = (o >> 24) & 255), (i = 0), (s = 0))
                  : ((i = o >>> 24), (s += 2));
            }
            if (r >= 0) for (t[r--] = i; r >= 0; ) t[r--] = 0;
          }),
          Math.clz32
            ? (s.prototype._countBits = function (t) {
                return 32 - Math.clz32(t);
              })
            : (s.prototype._countBits = function (t) {
                var e = t,
                  r = 0;
                return (
                  e >= 4096 && ((r += 13), (e >>>= 13)),
                  e >= 64 && ((r += 7), (e >>>= 7)),
                  e >= 8 && ((r += 4), (e >>>= 4)),
                  e >= 2 && ((r += 2), (e >>>= 2)),
                  r + e
                );
              }),
          (s.prototype._zeroBits = function (t) {
            if (0 === t) return 26;
            var e = t,
              r = 0;
            return (
              0 == (8191 & e) && ((r += 13), (e >>>= 13)),
              0 == (127 & e) && ((r += 7), (e >>>= 7)),
              0 == (15 & e) && ((r += 4), (e >>>= 4)),
              0 == (3 & e) && ((r += 2), (e >>>= 2)),
              0 == (1 & e) && r++,
              r
            );
          }),
          (s.prototype.bitLength = function () {
            var t = this.words[this.length - 1],
              e = this._countBits(t);
            return 26 * (this.length - 1) + e;
          }),
          (s.prototype.zeroBits = function () {
            if (this.isZero()) return 0;
            for (var t = 0, e = 0; e < this.length; e++) {
              var r = this._zeroBits(this.words[e]);
              if (((t += r), 26 !== r)) break;
            }
            return t;
          }),
          (s.prototype.byteLength = function () {
            return Math.ceil(this.bitLength() / 8);
          }),
          (s.prototype.toTwos = function (t) {
            return 0 !== this.negative
              ? this.abs().inotn(t).iaddn(1)
              : this.clone();
          }),
          (s.prototype.fromTwos = function (t) {
            return this.testn(t - 1)
              ? this.notn(t).iaddn(1).ineg()
              : this.clone();
          }),
          (s.prototype.isNeg = function () {
            return 0 !== this.negative;
          }),
          (s.prototype.neg = function () {
            return this.clone().ineg();
          }),
          (s.prototype.ineg = function () {
            return this.isZero() || (this.negative ^= 1), this;
          }),
          (s.prototype.iuor = function (t) {
            for (; this.length < t.length; ) this.words[this.length++] = 0;
            for (var e = 0; e < t.length; e++)
              this.words[e] = this.words[e] | t.words[e];
            return this._strip();
          }),
          (s.prototype.ior = function (t) {
            return i(0 == (this.negative | t.negative)), this.iuor(t);
          }),
          (s.prototype.or = function (t) {
            return this.length > t.length
              ? this.clone().ior(t)
              : t.clone().ior(this);
          }),
          (s.prototype.uor = function (t) {
            return this.length > t.length
              ? this.clone().iuor(t)
              : t.clone().iuor(this);
          }),
          (s.prototype.iuand = function (t) {
            var e;
            e = this.length > t.length ? t : this;
            for (var r = 0; r < e.length; r++)
              this.words[r] = this.words[r] & t.words[r];
            return (this.length = e.length), this._strip();
          }),
          (s.prototype.iand = function (t) {
            return i(0 == (this.negative | t.negative)), this.iuand(t);
          }),
          (s.prototype.and = function (t) {
            return this.length > t.length
              ? this.clone().iand(t)
              : t.clone().iand(this);
          }),
          (s.prototype.uand = function (t) {
            return this.length > t.length
              ? this.clone().iuand(t)
              : t.clone().iuand(this);
          }),
          (s.prototype.iuxor = function (t) {
            var e, r;
            this.length > t.length
              ? ((e = this), (r = t))
              : ((e = t), (r = this));
            for (var i = 0; i < r.length; i++)
              this.words[i] = e.words[i] ^ r.words[i];
            if (this !== e)
              for (; i < e.length; i++) this.words[i] = e.words[i];
            return (this.length = e.length), this._strip();
          }),
          (s.prototype.ixor = function (t) {
            return i(0 == (this.negative | t.negative)), this.iuxor(t);
          }),
          (s.prototype.xor = function (t) {
            return this.length > t.length
              ? this.clone().ixor(t)
              : t.clone().ixor(this);
          }),
          (s.prototype.uxor = function (t) {
            return this.length > t.length
              ? this.clone().iuxor(t)
              : t.clone().iuxor(this);
          }),
          (s.prototype.inotn = function (t) {
            i("number" == typeof t && t >= 0);
            var e = 0 | Math.ceil(t / 26),
              r = t % 26;
            this._expand(e), r > 0 && e--;
            for (var n = 0; n < e; n++)
              this.words[n] = 67108863 & ~this.words[n];
            return (
              r > 0 &&
                (this.words[n] = ~this.words[n] & (67108863 >> (26 - r))),
              this._strip()
            );
          }),
          (s.prototype.notn = function (t) {
            return this.clone().inotn(t);
          }),
          (s.prototype.setn = function (t, e) {
            i("number" == typeof t && t >= 0);
            var r = (t / 26) | 0,
              n = t % 26;
            return (
              this._expand(r + 1),
              (this.words[r] = e
                ? this.words[r] | (1 << n)
                : this.words[r] & ~(1 << n)),
              this._strip()
            );
          }),
          (s.prototype.iadd = function (t) {
            var e, r, i;
            if (0 !== this.negative && 0 === t.negative)
              return (
                (this.negative = 0),
                (e = this.isub(t)),
                (this.negative ^= 1),
                this._normSign()
              );
            if (0 === this.negative && 0 !== t.negative)
              return (
                (t.negative = 0),
                (e = this.isub(t)),
                (t.negative = 1),
                e._normSign()
              );
            this.length > t.length
              ? ((r = this), (i = t))
              : ((r = t), (i = this));
            for (var n = 0, s = 0; s < i.length; s++)
              (e = (0 | r.words[s]) + (0 | i.words[s]) + n),
                (this.words[s] = 67108863 & e),
                (n = e >>> 26);
            for (; 0 !== n && s < r.length; s++)
              (e = (0 | r.words[s]) + n),
                (this.words[s] = 67108863 & e),
                (n = e >>> 26);
            if (((this.length = r.length), 0 !== n))
              (this.words[this.length] = n), this.length++;
            else if (r !== this)
              for (; s < r.length; s++) this.words[s] = r.words[s];
            return this;
          }),
          (s.prototype.add = function (t) {
            var e;
            return 0 !== t.negative && 0 === this.negative
              ? ((t.negative = 0), (e = this.sub(t)), (t.negative ^= 1), e)
              : 0 === t.negative && 0 !== this.negative
              ? ((this.negative = 0), (e = t.sub(this)), (this.negative = 1), e)
              : this.length > t.length
              ? this.clone().iadd(t)
              : t.clone().iadd(this);
          }),
          (s.prototype.isub = function (t) {
            if (0 !== t.negative) {
              t.negative = 0;
              var e = this.iadd(t);
              return (t.negative = 1), e._normSign();
            }
            if (0 !== this.negative)
              return (
                (this.negative = 0),
                this.iadd(t),
                (this.negative = 1),
                this._normSign()
              );
            var r,
              i,
              n = this.cmp(t);
            if (0 === n)
              return (
                (this.negative = 0),
                (this.length = 1),
                (this.words[0] = 0),
                this
              );
            n > 0 ? ((r = this), (i = t)) : ((r = t), (i = this));
            for (var s = 0, o = 0; o < i.length; o++)
              (e = (0 | r.words[o]) - (0 | i.words[o]) + s),
                (s = e >> 26),
                (this.words[o] = 67108863 & e);
            for (; 0 !== s && o < r.length; o++)
              (e = (0 | r.words[o]) + s),
                (s = e >> 26),
                (this.words[o] = 67108863 & e);
            if (0 === s && o < r.length && r !== this)
              for (; o < r.length; o++) this.words[o] = r.words[o];
            return (
              (this.length = Math.max(this.length, o)),
              r !== this && (this.negative = 1),
              this._strip()
            );
          }),
          (s.prototype.sub = function (t) {
            return this.clone().isub(t);
          });
        var B = function (t, e, r) {
          var i,
            n,
            s,
            o = t.words,
            a = e.words,
            f = r.words,
            h = 0,
            u = 0 | o[0],
            c = 8191 & u,
            d = u >>> 13,
            l = 0 | o[1],
            p = 8191 & l,
            b = l >>> 13,
            m = 0 | o[2],
            y = 8191 & m,
            g = m >>> 13,
            v = 0 | o[3],
            w = 8191 & v,
            _ = v >>> 13,
            M = 0 | o[4],
            S = 8191 & M,
            E = M >>> 13,
            k = 0 | o[5],
            A = 8191 & k,
            x = k >>> 13,
            B = 0 | o[6],
            R = 8191 & B,
            I = B >>> 13,
            j = 0 | o[7],
            T = 8191 & j,
            C = j >>> 13,
            P = 0 | o[8],
            L = 8191 & P,
            O = P >>> 13,
            D = 0 | o[9],
            N = 8191 & D,
            q = D >>> 13,
            U = 0 | a[0],
            z = 8191 & U,
            K = U >>> 13,
            F = 0 | a[1],
            H = 8191 & F,
            W = F >>> 13,
            V = 0 | a[2],
            Z = 8191 & V,
            X = V >>> 13,
            G = 0 | a[3],
            Y = 8191 & G,
            J = G >>> 13,
            $ = 0 | a[4],
            Q = 8191 & $,
            tt = $ >>> 13,
            et = 0 | a[5],
            rt = 8191 & et,
            it = et >>> 13,
            nt = 0 | a[6],
            st = 8191 & nt,
            ot = nt >>> 13,
            at = 0 | a[7],
            ft = 8191 & at,
            ht = at >>> 13,
            ut = 0 | a[8],
            ct = 8191 & ut,
            dt = ut >>> 13,
            lt = 0 | a[9],
            pt = 8191 & lt,
            bt = lt >>> 13;
          (r.negative = t.negative ^ e.negative),
            (r.length = 19),
            (i = Math.imul(c, z)),
            (n = Math.imul(c, K)),
            (n = (n + Math.imul(d, z)) | 0),
            (s = Math.imul(d, K));
          var mt = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          (h = (((s + (n >>> 13)) | 0) + (mt >>> 26)) | 0),
            (mt &= 67108863),
            (i = Math.imul(p, z)),
            (n = Math.imul(p, K)),
            (n = (n + Math.imul(b, z)) | 0),
            (s = Math.imul(b, K)),
            (i = (i + Math.imul(c, H)) | 0),
            (n = (n + Math.imul(c, W)) | 0),
            (n = (n + Math.imul(d, H)) | 0),
            (s = (s + Math.imul(d, W)) | 0);
          var yt = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          (h = (((s + (n >>> 13)) | 0) + (yt >>> 26)) | 0),
            (yt &= 67108863),
            (i = Math.imul(y, z)),
            (n = Math.imul(y, K)),
            (n = (n + Math.imul(g, z)) | 0),
            (s = Math.imul(g, K)),
            (i = (i + Math.imul(p, H)) | 0),
            (n = (n + Math.imul(p, W)) | 0),
            (n = (n + Math.imul(b, H)) | 0),
            (s = (s + Math.imul(b, W)) | 0),
            (i = (i + Math.imul(c, Z)) | 0),
            (n = (n + Math.imul(c, X)) | 0),
            (n = (n + Math.imul(d, Z)) | 0),
            (s = (s + Math.imul(d, X)) | 0);
          var gt = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          (h = (((s + (n >>> 13)) | 0) + (gt >>> 26)) | 0),
            (gt &= 67108863),
            (i = Math.imul(w, z)),
            (n = Math.imul(w, K)),
            (n = (n + Math.imul(_, z)) | 0),
            (s = Math.imul(_, K)),
            (i = (i + Math.imul(y, H)) | 0),
            (n = (n + Math.imul(y, W)) | 0),
            (n = (n + Math.imul(g, H)) | 0),
            (s = (s + Math.imul(g, W)) | 0),
            (i = (i + Math.imul(p, Z)) | 0),
            (n = (n + Math.imul(p, X)) | 0),
            (n = (n + Math.imul(b, Z)) | 0),
            (s = (s + Math.imul(b, X)) | 0),
            (i = (i + Math.imul(c, Y)) | 0),
            (n = (n + Math.imul(c, J)) | 0),
            (n = (n + Math.imul(d, Y)) | 0),
            (s = (s + Math.imul(d, J)) | 0);
          var vt = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          (h = (((s + (n >>> 13)) | 0) + (vt >>> 26)) | 0),
            (vt &= 67108863),
            (i = Math.imul(S, z)),
            (n = Math.imul(S, K)),
            (n = (n + Math.imul(E, z)) | 0),
            (s = Math.imul(E, K)),
            (i = (i + Math.imul(w, H)) | 0),
            (n = (n + Math.imul(w, W)) | 0),
            (n = (n + Math.imul(_, H)) | 0),
            (s = (s + Math.imul(_, W)) | 0),
            (i = (i + Math.imul(y, Z)) | 0),
            (n = (n + Math.imul(y, X)) | 0),
            (n = (n + Math.imul(g, Z)) | 0),
            (s = (s + Math.imul(g, X)) | 0),
            (i = (i + Math.imul(p, Y)) | 0),
            (n = (n + Math.imul(p, J)) | 0),
            (n = (n + Math.imul(b, Y)) | 0),
            (s = (s + Math.imul(b, J)) | 0),
            (i = (i + Math.imul(c, Q)) | 0),
            (n = (n + Math.imul(c, tt)) | 0),
            (n = (n + Math.imul(d, Q)) | 0),
            (s = (s + Math.imul(d, tt)) | 0);
          var wt = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          (h = (((s + (n >>> 13)) | 0) + (wt >>> 26)) | 0),
            (wt &= 67108863),
            (i = Math.imul(A, z)),
            (n = Math.imul(A, K)),
            (n = (n + Math.imul(x, z)) | 0),
            (s = Math.imul(x, K)),
            (i = (i + Math.imul(S, H)) | 0),
            (n = (n + Math.imul(S, W)) | 0),
            (n = (n + Math.imul(E, H)) | 0),
            (s = (s + Math.imul(E, W)) | 0),
            (i = (i + Math.imul(w, Z)) | 0),
            (n = (n + Math.imul(w, X)) | 0),
            (n = (n + Math.imul(_, Z)) | 0),
            (s = (s + Math.imul(_, X)) | 0),
            (i = (i + Math.imul(y, Y)) | 0),
            (n = (n + Math.imul(y, J)) | 0),
            (n = (n + Math.imul(g, Y)) | 0),
            (s = (s + Math.imul(g, J)) | 0),
            (i = (i + Math.imul(p, Q)) | 0),
            (n = (n + Math.imul(p, tt)) | 0),
            (n = (n + Math.imul(b, Q)) | 0),
            (s = (s + Math.imul(b, tt)) | 0),
            (i = (i + Math.imul(c, rt)) | 0),
            (n = (n + Math.imul(c, it)) | 0),
            (n = (n + Math.imul(d, rt)) | 0),
            (s = (s + Math.imul(d, it)) | 0);
          var _t = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          (h = (((s + (n >>> 13)) | 0) + (_t >>> 26)) | 0),
            (_t &= 67108863),
            (i = Math.imul(R, z)),
            (n = Math.imul(R, K)),
            (n = (n + Math.imul(I, z)) | 0),
            (s = Math.imul(I, K)),
            (i = (i + Math.imul(A, H)) | 0),
            (n = (n + Math.imul(A, W)) | 0),
            (n = (n + Math.imul(x, H)) | 0),
            (s = (s + Math.imul(x, W)) | 0),
            (i = (i + Math.imul(S, Z)) | 0),
            (n = (n + Math.imul(S, X)) | 0),
            (n = (n + Math.imul(E, Z)) | 0),
            (s = (s + Math.imul(E, X)) | 0),
            (i = (i + Math.imul(w, Y)) | 0),
            (n = (n + Math.imul(w, J)) | 0),
            (n = (n + Math.imul(_, Y)) | 0),
            (s = (s + Math.imul(_, J)) | 0),
            (i = (i + Math.imul(y, Q)) | 0),
            (n = (n + Math.imul(y, tt)) | 0),
            (n = (n + Math.imul(g, Q)) | 0),
            (s = (s + Math.imul(g, tt)) | 0),
            (i = (i + Math.imul(p, rt)) | 0),
            (n = (n + Math.imul(p, it)) | 0),
            (n = (n + Math.imul(b, rt)) | 0),
            (s = (s + Math.imul(b, it)) | 0),
            (i = (i + Math.imul(c, st)) | 0),
            (n = (n + Math.imul(c, ot)) | 0),
            (n = (n + Math.imul(d, st)) | 0),
            (s = (s + Math.imul(d, ot)) | 0);
          var Mt = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          (h = (((s + (n >>> 13)) | 0) + (Mt >>> 26)) | 0),
            (Mt &= 67108863),
            (i = Math.imul(T, z)),
            (n = Math.imul(T, K)),
            (n = (n + Math.imul(C, z)) | 0),
            (s = Math.imul(C, K)),
            (i = (i + Math.imul(R, H)) | 0),
            (n = (n + Math.imul(R, W)) | 0),
            (n = (n + Math.imul(I, H)) | 0),
            (s = (s + Math.imul(I, W)) | 0),
            (i = (i + Math.imul(A, Z)) | 0),
            (n = (n + Math.imul(A, X)) | 0),
            (n = (n + Math.imul(x, Z)) | 0),
            (s = (s + Math.imul(x, X)) | 0),
            (i = (i + Math.imul(S, Y)) | 0),
            (n = (n + Math.imul(S, J)) | 0),
            (n = (n + Math.imul(E, Y)) | 0),
            (s = (s + Math.imul(E, J)) | 0),
            (i = (i + Math.imul(w, Q)) | 0),
            (n = (n + Math.imul(w, tt)) | 0),
            (n = (n + Math.imul(_, Q)) | 0),
            (s = (s + Math.imul(_, tt)) | 0),
            (i = (i + Math.imul(y, rt)) | 0),
            (n = (n + Math.imul(y, it)) | 0),
            (n = (n + Math.imul(g, rt)) | 0),
            (s = (s + Math.imul(g, it)) | 0),
            (i = (i + Math.imul(p, st)) | 0),
            (n = (n + Math.imul(p, ot)) | 0),
            (n = (n + Math.imul(b, st)) | 0),
            (s = (s + Math.imul(b, ot)) | 0),
            (i = (i + Math.imul(c, ft)) | 0),
            (n = (n + Math.imul(c, ht)) | 0),
            (n = (n + Math.imul(d, ft)) | 0),
            (s = (s + Math.imul(d, ht)) | 0);
          var St = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          (h = (((s + (n >>> 13)) | 0) + (St >>> 26)) | 0),
            (St &= 67108863),
            (i = Math.imul(L, z)),
            (n = Math.imul(L, K)),
            (n = (n + Math.imul(O, z)) | 0),
            (s = Math.imul(O, K)),
            (i = (i + Math.imul(T, H)) | 0),
            (n = (n + Math.imul(T, W)) | 0),
            (n = (n + Math.imul(C, H)) | 0),
            (s = (s + Math.imul(C, W)) | 0),
            (i = (i + Math.imul(R, Z)) | 0),
            (n = (n + Math.imul(R, X)) | 0),
            (n = (n + Math.imul(I, Z)) | 0),
            (s = (s + Math.imul(I, X)) | 0),
            (i = (i + Math.imul(A, Y)) | 0),
            (n = (n + Math.imul(A, J)) | 0),
            (n = (n + Math.imul(x, Y)) | 0),
            (s = (s + Math.imul(x, J)) | 0),
            (i = (i + Math.imul(S, Q)) | 0),
            (n = (n + Math.imul(S, tt)) | 0),
            (n = (n + Math.imul(E, Q)) | 0),
            (s = (s + Math.imul(E, tt)) | 0),
            (i = (i + Math.imul(w, rt)) | 0),
            (n = (n + Math.imul(w, it)) | 0),
            (n = (n + Math.imul(_, rt)) | 0),
            (s = (s + Math.imul(_, it)) | 0),
            (i = (i + Math.imul(y, st)) | 0),
            (n = (n + Math.imul(y, ot)) | 0),
            (n = (n + Math.imul(g, st)) | 0),
            (s = (s + Math.imul(g, ot)) | 0),
            (i = (i + Math.imul(p, ft)) | 0),
            (n = (n + Math.imul(p, ht)) | 0),
            (n = (n + Math.imul(b, ft)) | 0),
            (s = (s + Math.imul(b, ht)) | 0),
            (i = (i + Math.imul(c, ct)) | 0),
            (n = (n + Math.imul(c, dt)) | 0),
            (n = (n + Math.imul(d, ct)) | 0),
            (s = (s + Math.imul(d, dt)) | 0);
          var Et = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          (h = (((s + (n >>> 13)) | 0) + (Et >>> 26)) | 0),
            (Et &= 67108863),
            (i = Math.imul(N, z)),
            (n = Math.imul(N, K)),
            (n = (n + Math.imul(q, z)) | 0),
            (s = Math.imul(q, K)),
            (i = (i + Math.imul(L, H)) | 0),
            (n = (n + Math.imul(L, W)) | 0),
            (n = (n + Math.imul(O, H)) | 0),
            (s = (s + Math.imul(O, W)) | 0),
            (i = (i + Math.imul(T, Z)) | 0),
            (n = (n + Math.imul(T, X)) | 0),
            (n = (n + Math.imul(C, Z)) | 0),
            (s = (s + Math.imul(C, X)) | 0),
            (i = (i + Math.imul(R, Y)) | 0),
            (n = (n + Math.imul(R, J)) | 0),
            (n = (n + Math.imul(I, Y)) | 0),
            (s = (s + Math.imul(I, J)) | 0),
            (i = (i + Math.imul(A, Q)) | 0),
            (n = (n + Math.imul(A, tt)) | 0),
            (n = (n + Math.imul(x, Q)) | 0),
            (s = (s + Math.imul(x, tt)) | 0),
            (i = (i + Math.imul(S, rt)) | 0),
            (n = (n + Math.imul(S, it)) | 0),
            (n = (n + Math.imul(E, rt)) | 0),
            (s = (s + Math.imul(E, it)) | 0),
            (i = (i + Math.imul(w, st)) | 0),
            (n = (n + Math.imul(w, ot)) | 0),
            (n = (n + Math.imul(_, st)) | 0),
            (s = (s + Math.imul(_, ot)) | 0),
            (i = (i + Math.imul(y, ft)) | 0),
            (n = (n + Math.imul(y, ht)) | 0),
            (n = (n + Math.imul(g, ft)) | 0),
            (s = (s + Math.imul(g, ht)) | 0),
            (i = (i + Math.imul(p, ct)) | 0),
            (n = (n + Math.imul(p, dt)) | 0),
            (n = (n + Math.imul(b, ct)) | 0),
            (s = (s + Math.imul(b, dt)) | 0),
            (i = (i + Math.imul(c, pt)) | 0),
            (n = (n + Math.imul(c, bt)) | 0),
            (n = (n + Math.imul(d, pt)) | 0),
            (s = (s + Math.imul(d, bt)) | 0);
          var kt = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          (h = (((s + (n >>> 13)) | 0) + (kt >>> 26)) | 0),
            (kt &= 67108863),
            (i = Math.imul(N, H)),
            (n = Math.imul(N, W)),
            (n = (n + Math.imul(q, H)) | 0),
            (s = Math.imul(q, W)),
            (i = (i + Math.imul(L, Z)) | 0),
            (n = (n + Math.imul(L, X)) | 0),
            (n = (n + Math.imul(O, Z)) | 0),
            (s = (s + Math.imul(O, X)) | 0),
            (i = (i + Math.imul(T, Y)) | 0),
            (n = (n + Math.imul(T, J)) | 0),
            (n = (n + Math.imul(C, Y)) | 0),
            (s = (s + Math.imul(C, J)) | 0),
            (i = (i + Math.imul(R, Q)) | 0),
            (n = (n + Math.imul(R, tt)) | 0),
            (n = (n + Math.imul(I, Q)) | 0),
            (s = (s + Math.imul(I, tt)) | 0),
            (i = (i + Math.imul(A, rt)) | 0),
            (n = (n + Math.imul(A, it)) | 0),
            (n = (n + Math.imul(x, rt)) | 0),
            (s = (s + Math.imul(x, it)) | 0),
            (i = (i + Math.imul(S, st)) | 0),
            (n = (n + Math.imul(S, ot)) | 0),
            (n = (n + Math.imul(E, st)) | 0),
            (s = (s + Math.imul(E, ot)) | 0),
            (i = (i + Math.imul(w, ft)) | 0),
            (n = (n + Math.imul(w, ht)) | 0),
            (n = (n + Math.imul(_, ft)) | 0),
            (s = (s + Math.imul(_, ht)) | 0),
            (i = (i + Math.imul(y, ct)) | 0),
            (n = (n + Math.imul(y, dt)) | 0),
            (n = (n + Math.imul(g, ct)) | 0),
            (s = (s + Math.imul(g, dt)) | 0),
            (i = (i + Math.imul(p, pt)) | 0),
            (n = (n + Math.imul(p, bt)) | 0),
            (n = (n + Math.imul(b, pt)) | 0),
            (s = (s + Math.imul(b, bt)) | 0);
          var At = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          (h = (((s + (n >>> 13)) | 0) + (At >>> 26)) | 0),
            (At &= 67108863),
            (i = Math.imul(N, Z)),
            (n = Math.imul(N, X)),
            (n = (n + Math.imul(q, Z)) | 0),
            (s = Math.imul(q, X)),
            (i = (i + Math.imul(L, Y)) | 0),
            (n = (n + Math.imul(L, J)) | 0),
            (n = (n + Math.imul(O, Y)) | 0),
            (s = (s + Math.imul(O, J)) | 0),
            (i = (i + Math.imul(T, Q)) | 0),
            (n = (n + Math.imul(T, tt)) | 0),
            (n = (n + Math.imul(C, Q)) | 0),
            (s = (s + Math.imul(C, tt)) | 0),
            (i = (i + Math.imul(R, rt)) | 0),
            (n = (n + Math.imul(R, it)) | 0),
            (n = (n + Math.imul(I, rt)) | 0),
            (s = (s + Math.imul(I, it)) | 0),
            (i = (i + Math.imul(A, st)) | 0),
            (n = (n + Math.imul(A, ot)) | 0),
            (n = (n + Math.imul(x, st)) | 0),
            (s = (s + Math.imul(x, ot)) | 0),
            (i = (i + Math.imul(S, ft)) | 0),
            (n = (n + Math.imul(S, ht)) | 0),
            (n = (n + Math.imul(E, ft)) | 0),
            (s = (s + Math.imul(E, ht)) | 0),
            (i = (i + Math.imul(w, ct)) | 0),
            (n = (n + Math.imul(w, dt)) | 0),
            (n = (n + Math.imul(_, ct)) | 0),
            (s = (s + Math.imul(_, dt)) | 0),
            (i = (i + Math.imul(y, pt)) | 0),
            (n = (n + Math.imul(y, bt)) | 0),
            (n = (n + Math.imul(g, pt)) | 0),
            (s = (s + Math.imul(g, bt)) | 0);
          var xt = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          (h = (((s + (n >>> 13)) | 0) + (xt >>> 26)) | 0),
            (xt &= 67108863),
            (i = Math.imul(N, Y)),
            (n = Math.imul(N, J)),
            (n = (n + Math.imul(q, Y)) | 0),
            (s = Math.imul(q, J)),
            (i = (i + Math.imul(L, Q)) | 0),
            (n = (n + Math.imul(L, tt)) | 0),
            (n = (n + Math.imul(O, Q)) | 0),
            (s = (s + Math.imul(O, tt)) | 0),
            (i = (i + Math.imul(T, rt)) | 0),
            (n = (n + Math.imul(T, it)) | 0),
            (n = (n + Math.imul(C, rt)) | 0),
            (s = (s + Math.imul(C, it)) | 0),
            (i = (i + Math.imul(R, st)) | 0),
            (n = (n + Math.imul(R, ot)) | 0),
            (n = (n + Math.imul(I, st)) | 0),
            (s = (s + Math.imul(I, ot)) | 0),
            (i = (i + Math.imul(A, ft)) | 0),
            (n = (n + Math.imul(A, ht)) | 0),
            (n = (n + Math.imul(x, ft)) | 0),
            (s = (s + Math.imul(x, ht)) | 0),
            (i = (i + Math.imul(S, ct)) | 0),
            (n = (n + Math.imul(S, dt)) | 0),
            (n = (n + Math.imul(E, ct)) | 0),
            (s = (s + Math.imul(E, dt)) | 0),
            (i = (i + Math.imul(w, pt)) | 0),
            (n = (n + Math.imul(w, bt)) | 0),
            (n = (n + Math.imul(_, pt)) | 0),
            (s = (s + Math.imul(_, bt)) | 0);
          var Bt = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          (h = (((s + (n >>> 13)) | 0) + (Bt >>> 26)) | 0),
            (Bt &= 67108863),
            (i = Math.imul(N, Q)),
            (n = Math.imul(N, tt)),
            (n = (n + Math.imul(q, Q)) | 0),
            (s = Math.imul(q, tt)),
            (i = (i + Math.imul(L, rt)) | 0),
            (n = (n + Math.imul(L, it)) | 0),
            (n = (n + Math.imul(O, rt)) | 0),
            (s = (s + Math.imul(O, it)) | 0),
            (i = (i + Math.imul(T, st)) | 0),
            (n = (n + Math.imul(T, ot)) | 0),
            (n = (n + Math.imul(C, st)) | 0),
            (s = (s + Math.imul(C, ot)) | 0),
            (i = (i + Math.imul(R, ft)) | 0),
            (n = (n + Math.imul(R, ht)) | 0),
            (n = (n + Math.imul(I, ft)) | 0),
            (s = (s + Math.imul(I, ht)) | 0),
            (i = (i + Math.imul(A, ct)) | 0),
            (n = (n + Math.imul(A, dt)) | 0),
            (n = (n + Math.imul(x, ct)) | 0),
            (s = (s + Math.imul(x, dt)) | 0),
            (i = (i + Math.imul(S, pt)) | 0),
            (n = (n + Math.imul(S, bt)) | 0),
            (n = (n + Math.imul(E, pt)) | 0),
            (s = (s + Math.imul(E, bt)) | 0);
          var Rt = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          (h = (((s + (n >>> 13)) | 0) + (Rt >>> 26)) | 0),
            (Rt &= 67108863),
            (i = Math.imul(N, rt)),
            (n = Math.imul(N, it)),
            (n = (n + Math.imul(q, rt)) | 0),
            (s = Math.imul(q, it)),
            (i = (i + Math.imul(L, st)) | 0),
            (n = (n + Math.imul(L, ot)) | 0),
            (n = (n + Math.imul(O, st)) | 0),
            (s = (s + Math.imul(O, ot)) | 0),
            (i = (i + Math.imul(T, ft)) | 0),
            (n = (n + Math.imul(T, ht)) | 0),
            (n = (n + Math.imul(C, ft)) | 0),
            (s = (s + Math.imul(C, ht)) | 0),
            (i = (i + Math.imul(R, ct)) | 0),
            (n = (n + Math.imul(R, dt)) | 0),
            (n = (n + Math.imul(I, ct)) | 0),
            (s = (s + Math.imul(I, dt)) | 0),
            (i = (i + Math.imul(A, pt)) | 0),
            (n = (n + Math.imul(A, bt)) | 0),
            (n = (n + Math.imul(x, pt)) | 0),
            (s = (s + Math.imul(x, bt)) | 0);
          var It = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          (h = (((s + (n >>> 13)) | 0) + (It >>> 26)) | 0),
            (It &= 67108863),
            (i = Math.imul(N, st)),
            (n = Math.imul(N, ot)),
            (n = (n + Math.imul(q, st)) | 0),
            (s = Math.imul(q, ot)),
            (i = (i + Math.imul(L, ft)) | 0),
            (n = (n + Math.imul(L, ht)) | 0),
            (n = (n + Math.imul(O, ft)) | 0),
            (s = (s + Math.imul(O, ht)) | 0),
            (i = (i + Math.imul(T, ct)) | 0),
            (n = (n + Math.imul(T, dt)) | 0),
            (n = (n + Math.imul(C, ct)) | 0),
            (s = (s + Math.imul(C, dt)) | 0),
            (i = (i + Math.imul(R, pt)) | 0),
            (n = (n + Math.imul(R, bt)) | 0),
            (n = (n + Math.imul(I, pt)) | 0),
            (s = (s + Math.imul(I, bt)) | 0);
          var jt = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          (h = (((s + (n >>> 13)) | 0) + (jt >>> 26)) | 0),
            (jt &= 67108863),
            (i = Math.imul(N, ft)),
            (n = Math.imul(N, ht)),
            (n = (n + Math.imul(q, ft)) | 0),
            (s = Math.imul(q, ht)),
            (i = (i + Math.imul(L, ct)) | 0),
            (n = (n + Math.imul(L, dt)) | 0),
            (n = (n + Math.imul(O, ct)) | 0),
            (s = (s + Math.imul(O, dt)) | 0),
            (i = (i + Math.imul(T, pt)) | 0),
            (n = (n + Math.imul(T, bt)) | 0),
            (n = (n + Math.imul(C, pt)) | 0),
            (s = (s + Math.imul(C, bt)) | 0);
          var Tt = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          (h = (((s + (n >>> 13)) | 0) + (Tt >>> 26)) | 0),
            (Tt &= 67108863),
            (i = Math.imul(N, ct)),
            (n = Math.imul(N, dt)),
            (n = (n + Math.imul(q, ct)) | 0),
            (s = Math.imul(q, dt)),
            (i = (i + Math.imul(L, pt)) | 0),
            (n = (n + Math.imul(L, bt)) | 0),
            (n = (n + Math.imul(O, pt)) | 0),
            (s = (s + Math.imul(O, bt)) | 0);
          var Ct = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          (h = (((s + (n >>> 13)) | 0) + (Ct >>> 26)) | 0),
            (Ct &= 67108863),
            (i = Math.imul(N, pt)),
            (n = Math.imul(N, bt)),
            (n = (n + Math.imul(q, pt)) | 0),
            (s = Math.imul(q, bt));
          var Pt = (((h + i) | 0) + ((8191 & n) << 13)) | 0;
          return (
            (h = (((s + (n >>> 13)) | 0) + (Pt >>> 26)) | 0),
            (Pt &= 67108863),
            (f[0] = mt),
            (f[1] = yt),
            (f[2] = gt),
            (f[3] = vt),
            (f[4] = wt),
            (f[5] = _t),
            (f[6] = Mt),
            (f[7] = St),
            (f[8] = Et),
            (f[9] = kt),
            (f[10] = At),
            (f[11] = xt),
            (f[12] = Bt),
            (f[13] = Rt),
            (f[14] = It),
            (f[15] = jt),
            (f[16] = Tt),
            (f[17] = Ct),
            (f[18] = Pt),
            0 !== h && ((f[19] = h), r.length++),
            r
          );
        };
        Math.imul || (B = d),
          (s.prototype.mulTo = function (t, e) {
            var r,
              i = this.length + t.length;
            return (
              (r =
                10 === this.length && 10 === t.length
                  ? B(this, t, e)
                  : i < 63
                  ? d(this, t, e)
                  : i < 1024
                  ? l(this, t, e)
                  : p(this, t, e)),
              r
            );
          }),
          (b.prototype.makeRBT = function (t) {
            for (
              var e = new Array(t), r = s.prototype._countBits(t) - 1, i = 0;
              i < t;
              i++
            )
              e[i] = this.revBin(i, r, t);
            return e;
          }),
          (b.prototype.revBin = function (t, e, r) {
            if (0 === t || t === r - 1) return t;
            for (var i = 0, n = 0; n < e; n++)
              (i |= (1 & t) << (e - n - 1)), (t >>= 1);
            return i;
          }),
          (b.prototype.permute = function (t, e, r, i, n, s) {
            for (var o = 0; o < s; o++) (i[o] = e[t[o]]), (n[o] = r[t[o]]);
          }),
          (b.prototype.transform = function (t, e, r, i, n, s) {
            this.permute(s, t, e, r, i, n);
            for (var o = 1; o < n; o <<= 1)
              for (
                var a = o << 1,
                  f = Math.cos((2 * Math.PI) / a),
                  h = Math.sin((2 * Math.PI) / a),
                  u = 0;
                u < n;
                u += a
              )
                for (var c = f, d = h, l = 0; l < o; l++) {
                  var p = r[u + l],
                    b = i[u + l],
                    m = r[u + l + o],
                    y = i[u + l + o],
                    g = c * m - d * y;
                  (y = c * y + d * m),
                    (m = g),
                    (r[u + l] = p + m),
                    (i[u + l] = b + y),
                    (r[u + l + o] = p - m),
                    (i[u + l + o] = b - y),
                    l !== a &&
                      ((g = f * c - h * d), (d = f * d + h * c), (c = g));
                }
          }),
          (b.prototype.guessLen13b = function (t, e) {
            var r = 1 | Math.max(e, t),
              i = 1 & r,
              n = 0;
            for (r = (r / 2) | 0; r; r >>>= 1) n++;
            return 1 << (n + 1 + i);
          }),
          (b.prototype.conjugate = function (t, e, r) {
            if (!(r <= 1))
              for (var i = 0; i < r / 2; i++) {
                var n = t[i];
                (t[i] = t[r - i - 1]),
                  (t[r - i - 1] = n),
                  (n = e[i]),
                  (e[i] = -e[r - i - 1]),
                  (e[r - i - 1] = -n);
              }
          }),
          (b.prototype.normalize13b = function (t, e) {
            for (var r = 0, i = 0; i < e / 2; i++) {
              var n =
                8192 * Math.round(t[2 * i + 1] / e) +
                Math.round(t[2 * i] / e) +
                r;
              (t[i] = 67108863 & n),
                (r = n < 67108864 ? 0 : (n / 67108864) | 0);
            }
            return t;
          }),
          (b.prototype.convert13b = function (t, e, r, n) {
            for (var s = 0, o = 0; o < e; o++)
              (s += 0 | t[o]),
                (r[2 * o] = 8191 & s),
                (s >>>= 13),
                (r[2 * o + 1] = 8191 & s),
                (s >>>= 13);
            for (o = 2 * e; o < n; ++o) r[o] = 0;
            i(0 === s), i(0 == (-8192 & s));
          }),
          (b.prototype.stub = function (t) {
            for (var e = new Array(t), r = 0; r < t; r++) e[r] = 0;
            return e;
          }),
          (b.prototype.mulp = function (t, e, r) {
            var i = 2 * this.guessLen13b(t.length, e.length),
              n = this.makeRBT(i),
              s = this.stub(i),
              o = new Array(i),
              a = new Array(i),
              f = new Array(i),
              h = new Array(i),
              u = new Array(i),
              c = new Array(i),
              d = r.words;
            (d.length = i),
              this.convert13b(t.words, t.length, o, i),
              this.convert13b(e.words, e.length, h, i),
              this.transform(o, s, a, f, i, n),
              this.transform(h, s, u, c, i, n);
            for (var l = 0; l < i; l++) {
              var p = a[l] * u[l] - f[l] * c[l];
              (f[l] = a[l] * c[l] + f[l] * u[l]), (a[l] = p);
            }
            return (
              this.conjugate(a, f, i),
              this.transform(a, f, d, s, i, n),
              this.conjugate(d, s, i),
              this.normalize13b(d, i),
              (r.negative = t.negative ^ e.negative),
              (r.length = t.length + e.length),
              r._strip()
            );
          }),
          (s.prototype.mul = function (t) {
            var e = new s(null);
            return (
              (e.words = new Array(this.length + t.length)), this.mulTo(t, e)
            );
          }),
          (s.prototype.mulf = function (t) {
            var e = new s(null);
            return (e.words = new Array(this.length + t.length)), p(this, t, e);
          }),
          (s.prototype.imul = function (t) {
            return this.clone().mulTo(t, this);
          }),
          (s.prototype.imuln = function (t) {
            var e = t < 0;
            e && (t = -t), i("number" == typeof t), i(t < 67108864);
            for (var r = 0, n = 0; n < this.length; n++) {
              var s = (0 | this.words[n]) * t,
                o = (67108863 & s) + (67108863 & r);
              (r >>= 26),
                (r += (s / 67108864) | 0),
                (r += o >>> 26),
                (this.words[n] = 67108863 & o);
            }
            return (
              0 !== r && ((this.words[n] = r), this.length++),
              e ? this.ineg() : this
            );
          }),
          (s.prototype.muln = function (t) {
            return this.clone().imuln(t);
          }),
          (s.prototype.sqr = function () {
            return this.mul(this);
          }),
          (s.prototype.isqr = function () {
            return this.imul(this.clone());
          }),
          (s.prototype.pow = function (t) {
            var e = c(t);
            if (0 === e.length) return new s(1);
            for (
              var r = this, i = 0;
              i < e.length && 0 === e[i];
              i++, r = r.sqr()
            );
            if (++i < e.length)
              for (var n = r.sqr(); i < e.length; i++, n = n.sqr())
                0 !== e[i] && (r = r.mul(n));
            return r;
          }),
          (s.prototype.iushln = function (t) {
            i("number" == typeof t && t >= 0);
            var e,
              r = t % 26,
              n = (t - r) / 26,
              s = (67108863 >>> (26 - r)) << (26 - r);
            if (0 !== r) {
              var o = 0;
              for (e = 0; e < this.length; e++) {
                var a = this.words[e] & s,
                  f = ((0 | this.words[e]) - a) << r;
                (this.words[e] = f | o), (o = a >>> (26 - r));
              }
              o && ((this.words[e] = o), this.length++);
            }
            if (0 !== n) {
              for (e = this.length - 1; e >= 0; e--)
                this.words[e + n] = this.words[e];
              for (e = 0; e < n; e++) this.words[e] = 0;
              this.length += n;
            }
            return this._strip();
          }),
          (s.prototype.ishln = function (t) {
            return i(0 === this.negative), this.iushln(t);
          }),
          (s.prototype.iushrn = function (t, e, r) {
            var n;
            i("number" == typeof t && t >= 0),
              (n = e ? (e - (e % 26)) / 26 : 0);
            var s = t % 26,
              o = Math.min((t - s) / 26, this.length),
              a = 67108863 ^ ((67108863 >>> s) << s),
              f = r;
            if (((n -= o), (n = Math.max(0, n)), f)) {
              for (var h = 0; h < o; h++) f.words[h] = this.words[h];
              f.length = o;
            }
            if (0 === o);
            else if (this.length > o)
              for (this.length -= o, h = 0; h < this.length; h++)
                this.words[h] = this.words[h + o];
            else (this.words[0] = 0), (this.length = 1);
            var u = 0;
            for (h = this.length - 1; h >= 0 && (0 !== u || h >= n); h--) {
              var c = 0 | this.words[h];
              (this.words[h] = (u << (26 - s)) | (c >>> s)), (u = c & a);
            }
            return (
              f && 0 !== u && (f.words[f.length++] = u),
              0 === this.length && ((this.words[0] = 0), (this.length = 1)),
              this._strip()
            );
          }),
          (s.prototype.ishrn = function (t, e, r) {
            return i(0 === this.negative), this.iushrn(t, e, r);
          }),
          (s.prototype.shln = function (t) {
            return this.clone().ishln(t);
          }),
          (s.prototype.ushln = function (t) {
            return this.clone().iushln(t);
          }),
          (s.prototype.shrn = function (t) {
            return this.clone().ishrn(t);
          }),
          (s.prototype.ushrn = function (t) {
            return this.clone().iushrn(t);
          }),
          (s.prototype.testn = function (t) {
            i("number" == typeof t && t >= 0);
            var e = t % 26,
              r = (t - e) / 26,
              n = 1 << e;
            if (this.length <= r) return !1;
            var s = this.words[r];
            return !!(s & n);
          }),
          (s.prototype.imaskn = function (t) {
            i("number" == typeof t && t >= 0);
            var e = t % 26,
              r = (t - e) / 26;
            if (
              (i(
                0 === this.negative,
                "imaskn works only with positive numbers"
              ),
              this.length <= r)
            )
              return this;
            if (
              (0 !== e && r++,
              (this.length = Math.min(r, this.length)),
              0 !== e)
            ) {
              var n = 67108863 ^ ((67108863 >>> e) << e);
              this.words[this.length - 1] &= n;
            }
            return this._strip();
          }),
          (s.prototype.maskn = function (t) {
            return this.clone().imaskn(t);
          }),
          (s.prototype.iaddn = function (t) {
            return (
              i("number" == typeof t),
              i(t < 67108864),
              t < 0
                ? this.isubn(-t)
                : 0 !== this.negative
                ? 1 === this.length && (0 | this.words[0]) <= t
                  ? ((this.words[0] = t - (0 | this.words[0])),
                    (this.negative = 0),
                    this)
                  : ((this.negative = 0),
                    this.isubn(t),
                    (this.negative = 1),
                    this)
                : this._iaddn(t)
            );
          }),
          (s.prototype._iaddn = function (t) {
            this.words[0] += t;
            for (var e = 0; e < this.length && this.words[e] >= 67108864; e++)
              (this.words[e] -= 67108864),
                e === this.length - 1
                  ? (this.words[e + 1] = 1)
                  : this.words[e + 1]++;
            return (this.length = Math.max(this.length, e + 1)), this;
          }),
          (s.prototype.isubn = function (t) {
            if ((i("number" == typeof t), i(t < 67108864), t < 0))
              return this.iaddn(-t);
            if (0 !== this.negative)
              return (
                (this.negative = 0), this.iaddn(t), (this.negative = 1), this
              );
            if (((this.words[0] -= t), 1 === this.length && this.words[0] < 0))
              (this.words[0] = -this.words[0]), (this.negative = 1);
            else
              for (var e = 0; e < this.length && this.words[e] < 0; e++)
                (this.words[e] += 67108864), (this.words[e + 1] -= 1);
            return this._strip();
          }),
          (s.prototype.addn = function (t) {
            return this.clone().iaddn(t);
          }),
          (s.prototype.subn = function (t) {
            return this.clone().isubn(t);
          }),
          (s.prototype.iabs = function () {
            return (this.negative = 0), this;
          }),
          (s.prototype.abs = function () {
            return this.clone().iabs();
          }),
          (s.prototype._ishlnsubmul = function (t, e, r) {
            var n,
              s,
              o = t.length + r;
            this._expand(o);
            var a = 0;
            for (n = 0; n < t.length; n++) {
              s = (0 | this.words[n + r]) + a;
              var f = (0 | t.words[n]) * e;
              (s -= 67108863 & f),
                (a = (s >> 26) - ((f / 67108864) | 0)),
                (this.words[n + r] = 67108863 & s);
            }
            for (; n < this.length - r; n++)
              (s = (0 | this.words[n + r]) + a),
                (a = s >> 26),
                (this.words[n + r] = 67108863 & s);
            if (0 === a) return this._strip();
            for (i(-1 === a), a = 0, n = 0; n < this.length; n++)
              (s = -(0 | this.words[n]) + a),
                (a = s >> 26),
                (this.words[n] = 67108863 & s);
            return (this.negative = 1), this._strip();
          }),
          (s.prototype._wordDiv = function (t, e) {
            var r = this.length - t.length,
              i = this.clone(),
              n = t,
              o = 0 | n.words[n.length - 1],
              a = this._countBits(o);
            (r = 26 - a),
              0 !== r &&
                ((n = n.ushln(r)),
                i.iushln(r),
                (o = 0 | n.words[n.length - 1]));
            var f,
              h = i.length - n.length;
            if ("mod" !== e) {
              (f = new s(null)),
                (f.length = h + 1),
                (f.words = new Array(f.length));
              for (var u = 0; u < f.length; u++) f.words[u] = 0;
            }
            var c = i.clone()._ishlnsubmul(n, 1, h);
            0 === c.negative && ((i = c), f && (f.words[h] = 1));
            for (var d = h - 1; d >= 0; d--) {
              var l =
                67108864 * (0 | i.words[n.length + d]) +
                (0 | i.words[n.length + d - 1]);
              for (
                l = Math.min((l / o) | 0, 67108863), i._ishlnsubmul(n, l, d);
                0 !== i.negative;

              )
                l--,
                  (i.negative = 0),
                  i._ishlnsubmul(n, 1, d),
                  i.isZero() || (i.negative ^= 1);
              f && (f.words[d] = l);
            }
            return (
              f && f._strip(),
              i._strip(),
              "div" !== e && 0 !== r && i.iushrn(r),
              { div: f || null, mod: i }
            );
          }),
          (s.prototype.divmod = function (t, e, r) {
            return (
              i(!t.isZero()),
              this.isZero()
                ? { div: new s(0), mod: new s(0) }
                : 0 !== this.negative && 0 === t.negative
                ? ((a = this.neg().divmod(t, e)),
                  "mod" !== e && (n = a.div.neg()),
                  "div" !== e &&
                    ((o = a.mod.neg()), r && 0 !== o.negative && o.iadd(t)),
                  { div: n, mod: o })
                : 0 === this.negative && 0 !== t.negative
                ? ((a = this.divmod(t.neg(), e)),
                  "mod" !== e && (n = a.div.neg()),
                  { div: n, mod: a.mod })
                : 0 != (this.negative & t.negative)
                ? ((a = this.neg().divmod(t.neg(), e)),
                  "div" !== e &&
                    ((o = a.mod.neg()), r && 0 !== o.negative && o.isub(t)),
                  { div: a.div, mod: o })
                : t.length > this.length || this.cmp(t) < 0
                ? { div: new s(0), mod: this }
                : 1 === t.length
                ? "div" === e
                  ? { div: this.divn(t.words[0]), mod: null }
                  : "mod" === e
                  ? { div: null, mod: new s(this.modrn(t.words[0])) }
                  : {
                      div: this.divn(t.words[0]),
                      mod: new s(this.modrn(t.words[0])),
                    }
                : this._wordDiv(t, e)
            );
            var n, o, a;
          }),
          (s.prototype.div = function (t) {
            return this.divmod(t, "div", !1).div;
          }),
          (s.prototype.mod = function (t) {
            return this.divmod(t, "mod", !1).mod;
          }),
          (s.prototype.umod = function (t) {
            return this.divmod(t, "mod", !0).mod;
          }),
          (s.prototype.divRound = function (t) {
            var e = this.divmod(t);
            if (e.mod.isZero()) return e.div;
            var r = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
              i = t.ushrn(1),
              n = t.andln(1),
              s = r.cmp(i);
            return s < 0 || (1 === n && 0 === s)
              ? e.div
              : 0 !== e.div.negative
              ? e.div.isubn(1)
              : e.div.iaddn(1);
          }),
          (s.prototype.modrn = function (t) {
            var e = t < 0;
            e && (t = -t), i(t <= 67108863);
            for (var r = (1 << 26) % t, n = 0, s = this.length - 1; s >= 0; s--)
              n = (r * n + (0 | this.words[s])) % t;
            return e ? -n : n;
          }),
          (s.prototype.modn = function (t) {
            return this.modrn(t);
          }),
          (s.prototype.idivn = function (t) {
            var e = t < 0;
            e && (t = -t), i(t <= 67108863);
            for (var r = 0, n = this.length - 1; n >= 0; n--) {
              var s = (0 | this.words[n]) + 67108864 * r;
              (this.words[n] = (s / t) | 0), (r = s % t);
            }
            return this._strip(), e ? this.ineg() : this;
          }),
          (s.prototype.divn = function (t) {
            return this.clone().idivn(t);
          }),
          (s.prototype.egcd = function (t) {
            i(0 === t.negative), i(!t.isZero());
            var e = this,
              r = t.clone();
            e = 0 !== e.negative ? e.umod(t) : e.clone();
            for (
              var n = new s(1), o = new s(0), a = new s(0), f = new s(1), h = 0;
              e.isEven() && r.isEven();

            )
              e.iushrn(1), r.iushrn(1), ++h;
            for (var u = r.clone(), c = e.clone(); !e.isZero(); ) {
              for (
                var d = 0, l = 1;
                0 == (e.words[0] & l) && d < 26;
                ++d, l <<= 1
              );
              if (d > 0)
                for (e.iushrn(d); d-- > 0; )
                  (n.isOdd() || o.isOdd()) && (n.iadd(u), o.isub(c)),
                    n.iushrn(1),
                    o.iushrn(1);
              for (
                var p = 0, b = 1;
                0 == (r.words[0] & b) && p < 26;
                ++p, b <<= 1
              );
              if (p > 0)
                for (r.iushrn(p); p-- > 0; )
                  (a.isOdd() || f.isOdd()) && (a.iadd(u), f.isub(c)),
                    a.iushrn(1),
                    f.iushrn(1);
              e.cmp(r) >= 0
                ? (e.isub(r), n.isub(a), o.isub(f))
                : (r.isub(e), a.isub(n), f.isub(o));
            }
            return { a: a, b: f, gcd: r.iushln(h) };
          }),
          (s.prototype._invmp = function (t) {
            i(0 === t.negative), i(!t.isZero());
            var e = this,
              r = t.clone();
            e = 0 !== e.negative ? e.umod(t) : e.clone();
            for (
              var n, o = new s(1), a = new s(0), f = r.clone();
              e.cmpn(1) > 0 && r.cmpn(1) > 0;

            ) {
              for (
                var h = 0, u = 1;
                0 == (e.words[0] & u) && h < 26;
                ++h, u <<= 1
              );
              if (h > 0)
                for (e.iushrn(h); h-- > 0; )
                  o.isOdd() && o.iadd(f), o.iushrn(1);
              for (
                var c = 0, d = 1;
                0 == (r.words[0] & d) && c < 26;
                ++c, d <<= 1
              );
              if (c > 0)
                for (r.iushrn(c); c-- > 0; )
                  a.isOdd() && a.iadd(f), a.iushrn(1);
              e.cmp(r) >= 0 ? (e.isub(r), o.isub(a)) : (r.isub(e), a.isub(o));
            }
            return (n = 0 === e.cmpn(1) ? o : a), n.cmpn(0) < 0 && n.iadd(t), n;
          }),
          (s.prototype.gcd = function (t) {
            if (this.isZero()) return t.abs();
            if (t.isZero()) return this.abs();
            var e = this.clone(),
              r = t.clone();
            (e.negative = 0), (r.negative = 0);
            for (var i = 0; e.isEven() && r.isEven(); i++)
              e.iushrn(1), r.iushrn(1);
            for (;;) {
              for (; e.isEven(); ) e.iushrn(1);
              for (; r.isEven(); ) r.iushrn(1);
              var n = e.cmp(r);
              if (n < 0) {
                var s = e;
                (e = r), (r = s);
              } else if (0 === n || 0 === r.cmpn(1)) break;
              e.isub(r);
            }
            return r.iushln(i);
          }),
          (s.prototype.invm = function (t) {
            return this.egcd(t).a.umod(t);
          }),
          (s.prototype.isEven = function () {
            return 0 == (1 & this.words[0]);
          }),
          (s.prototype.isOdd = function () {
            return 1 == (1 & this.words[0]);
          }),
          (s.prototype.andln = function (t) {
            return this.words[0] & t;
          }),
          (s.prototype.bincn = function (t) {
            i("number" == typeof t);
            var e = t % 26,
              r = (t - e) / 26,
              n = 1 << e;
            if (this.length <= r)
              return this._expand(r + 1), (this.words[r] |= n), this;
            for (var s = n, o = r; 0 !== s && o < this.length; o++) {
              var a = 0 | this.words[o];
              (a += s), (s = a >>> 26), (a &= 67108863), (this.words[o] = a);
            }
            return 0 !== s && ((this.words[o] = s), this.length++), this;
          }),
          (s.prototype.isZero = function () {
            return 1 === this.length && 0 === this.words[0];
          }),
          (s.prototype.cmpn = function (t) {
            var e,
              r = t < 0;
            if (0 !== this.negative && !r) return -1;
            if (0 === this.negative && r) return 1;
            if ((this._strip(), this.length > 1)) e = 1;
            else {
              r && (t = -t), i(t <= 67108863, "Number is too big");
              var n = 0 | this.words[0];
              e = n === t ? 0 : n < t ? -1 : 1;
            }
            return 0 !== this.negative ? 0 | -e : e;
          }),
          (s.prototype.cmp = function (t) {
            if (0 !== this.negative && 0 === t.negative) return -1;
            if (0 === this.negative && 0 !== t.negative) return 1;
            var e = this.ucmp(t);
            return 0 !== this.negative ? 0 | -e : e;
          }),
          (s.prototype.ucmp = function (t) {
            if (this.length > t.length) return 1;
            if (this.length < t.length) return -1;
            for (var e = 0, r = this.length - 1; r >= 0; r--) {
              var i = 0 | this.words[r],
                n = 0 | t.words[r];
              if (i !== n) {
                i < n ? (e = -1) : i > n && (e = 1);
                break;
              }
            }
            return e;
          }),
          (s.prototype.gtn = function (t) {
            return 1 === this.cmpn(t);
          }),
          (s.prototype.gt = function (t) {
            return 1 === this.cmp(t);
          }),
          (s.prototype.gten = function (t) {
            return this.cmpn(t) >= 0;
          }),
          (s.prototype.gte = function (t) {
            return this.cmp(t) >= 0;
          }),
          (s.prototype.ltn = function (t) {
            return -1 === this.cmpn(t);
          }),
          (s.prototype.lt = function (t) {
            return -1 === this.cmp(t);
          }),
          (s.prototype.lten = function (t) {
            return this.cmpn(t) <= 0;
          }),
          (s.prototype.lte = function (t) {
            return this.cmp(t) <= 0;
          }),
          (s.prototype.eqn = function (t) {
            return 0 === this.cmpn(t);
          }),
          (s.prototype.eq = function (t) {
            return 0 === this.cmp(t);
          }),
          (s.red = function (t) {
            return new _(t);
          }),
          (s.prototype.toRed = function (t) {
            return (
              i(!this.red, "Already a number in reduction context"),
              i(0 === this.negative, "red works only with positives"),
              t.convertTo(this)._forceRed(t)
            );
          }),
          (s.prototype.fromRed = function () {
            return (
              i(
                this.red,
                "fromRed works only with numbers in reduction context"
              ),
              this.red.convertFrom(this)
            );
          }),
          (s.prototype._forceRed = function (t) {
            return (this.red = t), this;
          }),
          (s.prototype.forceRed = function (t) {
            return (
              i(!this.red, "Already a number in reduction context"),
              this._forceRed(t)
            );
          }),
          (s.prototype.redAdd = function (t) {
            return (
              i(this.red, "redAdd works only with red numbers"),
              this.red.add(this, t)
            );
          }),
          (s.prototype.redIAdd = function (t) {
            return (
              i(this.red, "redIAdd works only with red numbers"),
              this.red.iadd(this, t)
            );
          }),
          (s.prototype.redSub = function (t) {
            return (
              i(this.red, "redSub works only with red numbers"),
              this.red.sub(this, t)
            );
          }),
          (s.prototype.redISub = function (t) {
            return (
              i(this.red, "redISub works only with red numbers"),
              this.red.isub(this, t)
            );
          }),
          (s.prototype.redShl = function (t) {
            return (
              i(this.red, "redShl works only with red numbers"),
              this.red.shl(this, t)
            );
          }),
          (s.prototype.redMul = function (t) {
            return (
              i(this.red, "redMul works only with red numbers"),
              this.red._verify2(this, t),
              this.red.mul(this, t)
            );
          }),
          (s.prototype.redIMul = function (t) {
            return (
              i(this.red, "redMul works only with red numbers"),
              this.red._verify2(this, t),
              this.red.imul(this, t)
            );
          }),
          (s.prototype.redSqr = function () {
            return (
              i(this.red, "redSqr works only with red numbers"),
              this.red._verify1(this),
              this.red.sqr(this)
            );
          }),
          (s.prototype.redISqr = function () {
            return (
              i(this.red, "redISqr works only with red numbers"),
              this.red._verify1(this),
              this.red.isqr(this)
            );
          }),
          (s.prototype.redSqrt = function () {
            return (
              i(this.red, "redSqrt works only with red numbers"),
              this.red._verify1(this),
              this.red.sqrt(this)
            );
          }),
          (s.prototype.redInvm = function () {
            return (
              i(this.red, "redInvm works only with red numbers"),
              this.red._verify1(this),
              this.red.invm(this)
            );
          }),
          (s.prototype.redNeg = function () {
            return (
              i(this.red, "redNeg works only with red numbers"),
              this.red._verify1(this),
              this.red.neg(this)
            );
          }),
          (s.prototype.redPow = function (t) {
            return (
              i(this.red && !t.red, "redPow(normalNum)"),
              this.red._verify1(this),
              this.red.pow(this, t)
            );
          });
        var R = { k256: null, p224: null, p192: null, p25519: null };
        (m.prototype._tmp = function () {
          var t = new s(null);
          return (t.words = new Array(Math.ceil(this.n / 13))), t;
        }),
          (m.prototype.ireduce = function (t) {
            var e,
              r = t;
            do {
              this.split(r, this.tmp),
                (r = this.imulK(r)),
                (r = r.iadd(this.tmp)),
                (e = r.bitLength());
            } while (e > this.n);
            var i = e < this.n ? -1 : r.ucmp(this.p);
            return (
              0 === i
                ? ((r.words[0] = 0), (r.length = 1))
                : i > 0
                ? r.isub(this.p)
                : void 0 !== r.strip
                ? r.strip()
                : r._strip(),
              r
            );
          }),
          (m.prototype.split = function (t, e) {
            t.iushrn(this.n, 0, e);
          }),
          (m.prototype.imulK = function (t) {
            return t.imul(this.k);
          }),
          n(y, m),
          (y.prototype.split = function (t, e) {
            for (var r = 4194303, i = Math.min(t.length, 9), n = 0; n < i; n++)
              e.words[n] = t.words[n];
            if (((e.length = i), t.length <= 9))
              return (t.words[0] = 0), void (t.length = 1);
            var s = t.words[9];
            for (e.words[e.length++] = s & r, n = 10; n < t.length; n++) {
              var o = 0 | t.words[n];
              (t.words[n - 10] = ((o & r) << 4) | (s >>> 22)), (s = o);
            }
            (s >>>= 22),
              (t.words[n - 10] = s),
              0 === s && t.length > 10 ? (t.length -= 10) : (t.length -= 9);
          }),
          (y.prototype.imulK = function (t) {
            (t.words[t.length] = 0),
              (t.words[t.length + 1] = 0),
              (t.length += 2);
            for (var e = 0, r = 0; r < t.length; r++) {
              var i = 0 | t.words[r];
              (e += 977 * i),
                (t.words[r] = 67108863 & e),
                (e = 64 * i + ((e / 67108864) | 0));
            }
            return (
              0 === t.words[t.length - 1] &&
                (t.length--, 0 === t.words[t.length - 1] && t.length--),
              t
            );
          }),
          n(g, m),
          n(v, m),
          n(w, m),
          (w.prototype.imulK = function (t) {
            for (var e = 0, r = 0; r < t.length; r++) {
              var i = 19 * (0 | t.words[r]) + e,
                n = 67108863 & i;
              (i >>>= 26), (t.words[r] = n), (e = i);
            }
            return 0 !== e && (t.words[t.length++] = e), t;
          }),
          (s._prime = function (t) {
            if (R[t]) return R[t];
            var e;
            if ("k256" === t) e = new y();
            else if ("p224" === t) e = new g();
            else if ("p192" === t) e = new v();
            else {
              if ("p25519" !== t) throw new Error("Unknown prime " + t);
              e = new w();
            }
            return (R[t] = e), e;
          }),
          (_.prototype._verify1 = function (t) {
            i(0 === t.negative, "red works only with positives"),
              i(t.red, "red works only with red numbers");
          }),
          (_.prototype._verify2 = function (t, e) {
            i(0 == (t.negative | e.negative), "red works only with positives"),
              i(t.red && t.red === e.red, "red works only with red numbers");
          }),
          (_.prototype.imod = function (t) {
            return this.prime
              ? this.prime.ireduce(t)._forceRed(this)
              : (h(t, t.umod(this.m)._forceRed(this)), t);
          }),
          (_.prototype.neg = function (t) {
            return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this);
          }),
          (_.prototype.add = function (t, e) {
            this._verify2(t, e);
            var r = t.add(e);
            return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this);
          }),
          (_.prototype.iadd = function (t, e) {
            this._verify2(t, e);
            var r = t.iadd(e);
            return r.cmp(this.m) >= 0 && r.isub(this.m), r;
          }),
          (_.prototype.sub = function (t, e) {
            this._verify2(t, e);
            var r = t.sub(e);
            return r.cmpn(0) < 0 && r.iadd(this.m), r._forceRed(this);
          }),
          (_.prototype.isub = function (t, e) {
            this._verify2(t, e);
            var r = t.isub(e);
            return r.cmpn(0) < 0 && r.iadd(this.m), r;
          }),
          (_.prototype.shl = function (t, e) {
            return this._verify1(t), this.imod(t.ushln(e));
          }),
          (_.prototype.imul = function (t, e) {
            return this._verify2(t, e), this.imod(t.imul(e));
          }),
          (_.prototype.mul = function (t, e) {
            return this._verify2(t, e), this.imod(t.mul(e));
          }),
          (_.prototype.isqr = function (t) {
            return this.imul(t, t.clone());
          }),
          (_.prototype.sqr = function (t) {
            return this.mul(t, t);
          }),
          (_.prototype.sqrt = function (t) {
            if (t.isZero()) return t.clone();
            var e = this.m.andln(3);
            if ((i(e % 2 == 1), 3 === e)) {
              var r = this.m.add(new s(1)).iushrn(2);
              return this.pow(t, r);
            }
            for (
              var n = this.m.subn(1), o = 0;
              !n.isZero() && 0 === n.andln(1);

            )
              o++, n.iushrn(1);
            i(!n.isZero());
            var a = new s(1).toRed(this),
              f = a.redNeg(),
              h = this.m.subn(1).iushrn(1),
              u = this.m.bitLength();
            for (
              u = new s(2 * u * u).toRed(this);
              0 !== this.pow(u, h).cmp(f);

            )
              u.redIAdd(f);
            for (
              var c = this.pow(u, n),
                d = this.pow(t, n.addn(1).iushrn(1)),
                l = this.pow(t, n),
                p = o;
              0 !== l.cmp(a);

            ) {
              for (var b = l, m = 0; 0 !== b.cmp(a); m++) b = b.redSqr();
              i(m < p);
              var y = this.pow(c, new s(1).iushln(p - m - 1));
              (d = d.redMul(y)), (c = y.redSqr()), (l = l.redMul(c)), (p = m);
            }
            return d;
          }),
          (_.prototype.invm = function (t) {
            var e = t._invmp(this.m);
            return 0 !== e.negative
              ? ((e.negative = 0), this.imod(e).redNeg())
              : this.imod(e);
          }),
          (_.prototype.pow = function (t, e) {
            if (e.isZero()) return new s(1).toRed(this);
            if (0 === e.cmpn(1)) return t.clone();
            var r = 4,
              i = new Array(1 << r);
            (i[0] = new s(1).toRed(this)), (i[1] = t);
            for (var n = 2; n < i.length; n++) i[n] = this.mul(i[n - 1], t);
            var o = i[0],
              a = 0,
              f = 0,
              h = e.bitLength() % 26;
            for (0 === h && (h = 26), n = e.length - 1; n >= 0; n--) {
              for (var u = e.words[n], c = h - 1; c >= 0; c--) {
                var d = (u >> c) & 1;
                o !== i[0] && (o = this.sqr(o)),
                  0 !== d || 0 !== a
                    ? ((a <<= 1),
                      (a |= d),
                      f++,
                      (f === r || (0 === n && 0 === c)) &&
                        ((o = this.mul(o, i[a])), (f = 0), (a = 0)))
                    : (f = 0);
              }
              h = 26;
            }
            return o;
          }),
          (_.prototype.convertTo = function (t) {
            var e = t.umod(this.m);
            return e === t ? e.clone() : e;
          }),
          (_.prototype.convertFrom = function (t) {
            var e = t.clone();
            return (e.red = null), e;
          }),
          (s.mont = function (t) {
            return new M(t);
          }),
          n(M, _),
          (M.prototype.convertTo = function (t) {
            return this.imod(t.ushln(this.shift));
          }),
          (M.prototype.convertFrom = function (t) {
            var e = this.imod(t.mul(this.rinv));
            return (e.red = null), e;
          }),
          (M.prototype.imul = function (t, e) {
            if (t.isZero() || e.isZero())
              return (t.words[0] = 0), (t.length = 1), t;
            var r = t.imul(e),
              i = r
                .maskn(this.shift)
                .mul(this.minv)
                .imaskn(this.shift)
                .mul(this.m),
              n = r.isub(i).iushrn(this.shift),
              s = n;
            return (
              n.cmp(this.m) >= 0
                ? (s = n.isub(this.m))
                : n.cmpn(0) < 0 && (s = n.iadd(this.m)),
              s._forceRed(this)
            );
          }),
          (M.prototype.mul = function (t, e) {
            if (t.isZero() || e.isZero()) return new s(0)._forceRed(this);
            var r = t.mul(e),
              i = r
                .maskn(this.shift)
                .mul(this.minv)
                .imaskn(this.shift)
                .mul(this.m),
              n = r.isub(i).iushrn(this.shift),
              o = n;
            return (
              n.cmp(this.m) >= 0
                ? (o = n.isub(this.m))
                : n.cmpn(0) < 0 && (o = n.iadd(this.m)),
              o._forceRed(this)
            );
          }),
          (M.prototype.invm = function (t) {
            var e = this.imod(t._invmp(this.m).mul(this.r2));
            return e._forceRed(this);
          });
      })(void 0 === e || e, this);
    },
    { buffer: 19 },
  ],
  18: [
    function (t, e, r) {
      function i(t) {
        this.rand = t;
      }
      var n;
      if (
        ((e.exports = function (t) {
          return n || (n = new i(null)), n.generate(t);
        }),
        (e.exports.Rand = i),
        (i.prototype.generate = function (t) {
          return this._rand(t);
        }),
        (i.prototype._rand = function (t) {
          if (this.rand.getBytes) return this.rand.getBytes(t);
          for (var e = new Uint8Array(t), r = 0; r < e.length; r++)
            e[r] = this.rand.getByte();
          return e;
        }),
        "object" == typeof self)
      )
        self.crypto && self.crypto.getRandomValues
          ? (i.prototype._rand = function (t) {
              var e = new Uint8Array(t);
              return self.crypto.getRandomValues(e), e;
            })
          : self.msCrypto && self.msCrypto.getRandomValues
          ? (i.prototype._rand = function (t) {
              var e = new Uint8Array(t);
              return self.msCrypto.getRandomValues(e), e;
            })
          : "object" == typeof window &&
            (i.prototype._rand = function () {
              throw new Error("Not implemented yet");
            });
      else
        try {
          var s = t("crypto");
          if ("function" != typeof s.randomBytes)
            throw new Error("Not supported");
          i.prototype._rand = function (t) {
            return s.randomBytes(t);
          };
        } catch (t) {}
    },
    { crypto: 19 },
  ],
  19: [function (t, e, r) {}, {}],
  20: [
    function (t, e, r) {
      function i(t) {
        a.isBuffer(t) || (t = a.from(t));
        for (var e = (t.length / 4) | 0, r = new Array(e), i = 0; i < e; i++)
          r[i] = t.readUInt32BE(4 * i);
        return r;
      }
      function n(t) {
        for (var e = 0; e < t.length; t++) t[e] = 0;
      }
      function s(t, e, r, i, n) {
        for (
          var s,
            o,
            a,
            f,
            h = r[0],
            u = r[1],
            c = r[2],
            d = r[3],
            l = t[0] ^ e[0],
            p = t[1] ^ e[1],
            b = t[2] ^ e[2],
            m = t[3] ^ e[3],
            y = 4,
            g = 1;
          g < n;
          g++
        )
          (s =
            h[l >>> 24] ^
            u[(p >>> 16) & 255] ^
            c[(b >>> 8) & 255] ^
            d[255 & m] ^
            e[y++]),
            (o =
              h[p >>> 24] ^
              u[(b >>> 16) & 255] ^
              c[(m >>> 8) & 255] ^
              d[255 & l] ^
              e[y++]),
            (a =
              h[b >>> 24] ^
              u[(m >>> 16) & 255] ^
              c[(l >>> 8) & 255] ^
              d[255 & p] ^
              e[y++]),
            (f =
              h[m >>> 24] ^
              u[(l >>> 16) & 255] ^
              c[(p >>> 8) & 255] ^
              d[255 & b] ^
              e[y++]),
            (l = s),
            (p = o),
            (b = a),
            (m = f);
        return (
          (s =
            ((i[l >>> 24] << 24) |
              (i[(p >>> 16) & 255] << 16) |
              (i[(b >>> 8) & 255] << 8) |
              i[255 & m]) ^
            e[y++]),
          (o =
            ((i[p >>> 24] << 24) |
              (i[(b >>> 16) & 255] << 16) |
              (i[(m >>> 8) & 255] << 8) |
              i[255 & l]) ^
            e[y++]),
          (a =
            ((i[b >>> 24] << 24) |
              (i[(m >>> 16) & 255] << 16) |
              (i[(l >>> 8) & 255] << 8) |
              i[255 & p]) ^
            e[y++]),
          (f =
            ((i[m >>> 24] << 24) |
              (i[(l >>> 16) & 255] << 16) |
              (i[(p >>> 8) & 255] << 8) |
              i[255 & b]) ^
            e[y++]),
          (s >>>= 0),
          (o >>>= 0),
          (a >>>= 0),
          (f >>>= 0),
          [s, o, a, f]
        );
      }
      function o(t) {
        (this._key = i(t)), this._reset();
      }
      var a = t("safe-buffer").Buffer,
        f = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
        h = (function () {
          for (var t = new Array(256), e = 0; e < 256; e++)
            t[e] = e < 128 ? e << 1 : (e << 1) ^ 283;
          for (
            var r = [],
              i = [],
              n = [[], [], [], []],
              s = [[], [], [], []],
              o = 0,
              a = 0,
              f = 0;
            f < 256;
            ++f
          ) {
            var h = a ^ (a << 1) ^ (a << 2) ^ (a << 3) ^ (a << 4);
            (h = (h >>> 8) ^ (255 & h) ^ 99), (r[o] = h), (i[h] = o);
            var u = t[o],
              c = t[u],
              d = t[c],
              l = (257 * t[h]) ^ (16843008 * h);
            (n[0][o] = (l << 24) | (l >>> 8)),
              (n[1][o] = (l << 16) | (l >>> 16)),
              (n[2][o] = (l << 8) | (l >>> 24)),
              (n[3][o] = l),
              (l = (16843009 * d) ^ (65537 * c) ^ (257 * u) ^ (16843008 * o)),
              (s[0][h] = (l << 24) | (l >>> 8)),
              (s[1][h] = (l << 16) | (l >>> 16)),
              (s[2][h] = (l << 8) | (l >>> 24)),
              (s[3][h] = l),
              0 === o
                ? (o = a = 1)
                : ((o = u ^ t[t[t[d ^ u]]]), (a ^= t[t[a]]));
          }
          return { SBOX: r, INV_SBOX: i, SUB_MIX: n, INV_SUB_MIX: s };
        })();
      (o.blockSize = 16),
        (o.keySize = 32),
        (o.prototype.blockSize = o.blockSize),
        (o.prototype.keySize = o.keySize),
        (o.prototype._reset = function () {
          for (
            var t = this._key,
              e = t.length,
              r = e + 6,
              i = 4 * (r + 1),
              n = [],
              s = 0;
            s < e;
            s++
          )
            n[s] = t[s];
          for (s = e; s < i; s++) {
            var o = n[s - 1];
            s % e == 0
              ? ((o = (o << 8) | (o >>> 24)),
                (o =
                  (h.SBOX[o >>> 24] << 24) |
                  (h.SBOX[(o >>> 16) & 255] << 16) |
                  (h.SBOX[(o >>> 8) & 255] << 8) |
                  h.SBOX[255 & o]),
                (o ^= f[(s / e) | 0] << 24))
              : e > 6 &&
                s % e == 4 &&
                (o =
                  (h.SBOX[o >>> 24] << 24) |
                  (h.SBOX[(o >>> 16) & 255] << 16) |
                  (h.SBOX[(o >>> 8) & 255] << 8) |
                  h.SBOX[255 & o]),
              (n[s] = n[s - e] ^ o);
          }
          for (var a = [], u = 0; u < i; u++) {
            var c = i - u,
              d = n[c - (u % 4 ? 0 : 4)];
            a[u] =
              u < 4 || c <= 4
                ? d
                : h.INV_SUB_MIX[0][h.SBOX[d >>> 24]] ^
                  h.INV_SUB_MIX[1][h.SBOX[(d >>> 16) & 255]] ^
                  h.INV_SUB_MIX[2][h.SBOX[(d >>> 8) & 255]] ^
                  h.INV_SUB_MIX[3][h.SBOX[255 & d]];
          }
          (this._nRounds = r),
            (this._keySchedule = n),
            (this._invKeySchedule = a);
        }),
        (o.prototype.encryptBlockRaw = function (t) {
          return (
            (t = i(t)),
            s(t, this._keySchedule, h.SUB_MIX, h.SBOX, this._nRounds)
          );
        }),
        (o.prototype.encryptBlock = function (t) {
          var e = this.encryptBlockRaw(t),
            r = a.allocUnsafe(16);
          return (
            r.writeUInt32BE(e[0], 0),
            r.writeUInt32BE(e[1], 4),
            r.writeUInt32BE(e[2], 8),
            r.writeUInt32BE(e[3], 12),
            r
          );
        }),
        (o.prototype.decryptBlock = function (t) {
          t = i(t);
          var e = t[1];
          (t[1] = t[3]), (t[3] = e);
          var r = s(
              t,
              this._invKeySchedule,
              h.INV_SUB_MIX,
              h.INV_SBOX,
              this._nRounds
            ),
            n = a.allocUnsafe(16);
          return (
            n.writeUInt32BE(r[0], 0),
            n.writeUInt32BE(r[3], 4),
            n.writeUInt32BE(r[2], 8),
            n.writeUInt32BE(r[1], 12),
            n
          );
        }),
        (o.prototype.scrub = function () {
          n(this._keySchedule), n(this._invKeySchedule), n(this._key);
        }),
        (e.exports.AES = o);
    },
    { "safe-buffer": 160 },
  ],
  21: [
    function (t, e, r) {
      function i(t, e) {
        var r = 0;
        t.length !== e.length && r++;
        for (var i = Math.min(t.length, e.length), n = 0; n < i; ++n)
          r += t[n] ^ e[n];
        return r;
      }
      function n(t, e, r) {
        if (12 === e.length)
          return (
            (t._finID = a.concat([e, a.from([0, 0, 0, 1])])),
            a.concat([e, a.from([0, 0, 0, 2])])
          );
        var i = new u(r),
          n = e.length,
          s = n % 16;
        i.update(e),
          s && ((s = 16 - s), i.update(a.alloc(s, 0))),
          i.update(a.alloc(8, 0));
        var o = 8 * n,
          f = a.alloc(8);
        f.writeUIntBE(o, 0, 8), i.update(f), (t._finID = i.state);
        var h = a.from(t._finID);
        return d(h), h;
      }
      function s(t, e, r, i) {
        f.call(this);
        var s = a.alloc(4, 0);
        this._cipher = new o.AES(e);
        var h = this._cipher.encryptBlock(s);
        (this._ghash = new u(h)),
          (r = n(this, r, h)),
          (this._prev = a.from(r)),
          (this._cache = a.allocUnsafe(0)),
          (this._secCache = a.allocUnsafe(0)),
          (this._decrypt = i),
          (this._alen = 0),
          (this._len = 0),
          (this._mode = t),
          (this._authTag = null),
          (this._called = !1);
      }
      var o = t("./aes"),
        a = t("safe-buffer").Buffer,
        f = t("cipher-base"),
        h = t("inherits"),
        u = t("./ghash"),
        c = t("buffer-xor"),
        d = t("./incr32");
      h(s, f),
        (s.prototype._update = function (t) {
          if (!this._called && this._alen) {
            var e = 16 - (this._alen % 16);
            e < 16 && ((e = a.alloc(e, 0)), this._ghash.update(e));
          }
          this._called = !0;
          var r = this._mode.encrypt(this, t);
          return (
            this._decrypt ? this._ghash.update(t) : this._ghash.update(r),
            (this._len += t.length),
            r
          );
        }),
        (s.prototype._final = function () {
          if (this._decrypt && !this._authTag)
            throw new Error("Unsupported state or unable to authenticate data");
          var t = c(
            this._ghash.final(8 * this._alen, 8 * this._len),
            this._cipher.encryptBlock(this._finID)
          );
          if (this._decrypt && i(t, this._authTag))
            throw new Error("Unsupported state or unable to authenticate data");
          (this._authTag = t), this._cipher.scrub();
        }),
        (s.prototype.getAuthTag = function () {
          if (this._decrypt || !a.isBuffer(this._authTag))
            throw new Error("Attempting to get auth tag in unsupported state");
          return this._authTag;
        }),
        (s.prototype.setAuthTag = function (t) {
          if (!this._decrypt)
            throw new Error("Attempting to set auth tag in unsupported state");
          this._authTag = t;
        }),
        (s.prototype.setAAD = function (t) {
          if (this._called)
            throw new Error("Attempting to set AAD in unsupported state");
          this._ghash.update(t), (this._alen += t.length);
        }),
        (e.exports = s);
    },
    {
      "./aes": 20,
      "./ghash": 25,
      "./incr32": 26,
      "buffer-xor": 62,
      "cipher-base": 64,
      inherits: 132,
      "safe-buffer": 160,
    },
  ],
  22: [
    function (t, e, r) {
      function i() {
        return Object.keys(o);
      }
      var n = t("./encrypter"),
        s = t("./decrypter"),
        o = t("./modes/list.json");
      (r.createCipher = r.Cipher = n.createCipher),
        (r.createCipheriv = r.Cipheriv = n.createCipheriv),
        (r.createDecipher = r.Decipher = s.createDecipher),
        (r.createDecipheriv = r.Decipheriv = s.createDecipheriv),
        (r.listCiphers = r.getCiphers = i);
    },
    { "./decrypter": 23, "./encrypter": 24, "./modes/list.json": 34 },
  ],
  23: [
    function (t, e, r) {
      function i(t, e, r) {
        d.call(this),
          (this._cache = new n()),
          (this._last = void 0),
          (this._cipher = new l.AES(e)),
          (this._prev = h.from(r)),
          (this._mode = t),
          (this._autopadding = !0);
      }
      function n() {
        this.cache = h.allocUnsafe(0);
      }
      function s(t) {
        var e = t[15];
        if (e < 1 || e > 16) throw new Error("unable to decrypt data");
        for (var r = -1; ++r < e; )
          if (t[r + (16 - e)] !== e) throw new Error("unable to decrypt data");
        if (16 !== e) return t.slice(0, 16 - e);
      }
      function o(t, e, r) {
        var n = u[t.toLowerCase()];
        if (!n) throw new TypeError("invalid suite type");
        if (
          ("string" == typeof r && (r = h.from(r)),
          "GCM" !== n.mode && r.length !== n.iv)
        )
          throw new TypeError("invalid iv length " + r.length);
        if (("string" == typeof e && (e = h.from(e)), e.length !== n.key / 8))
          throw new TypeError("invalid key length " + e.length);
        return "stream" === n.type
          ? new c(n.module, e, r, !0)
          : "auth" === n.type
          ? new f(n.module, e, r, !0)
          : new i(n.module, e, r);
      }
      function a(t, e) {
        var r = u[t.toLowerCase()];
        if (!r) throw new TypeError("invalid suite type");
        var i = p(e, !1, r.key, r.iv);
        return o(t, i.key, i.iv);
      }
      var f = t("./authCipher"),
        h = t("safe-buffer").Buffer,
        u = t("./modes"),
        c = t("./streamCipher"),
        d = t("cipher-base"),
        l = t("./aes"),
        p = t("evp_bytestokey"),
        b = t("inherits");
      b(i, d),
        (i.prototype._update = function (t) {
          var e, r;
          this._cache.add(t);
          for (var i = []; (e = this._cache.get(this._autopadding)); )
            (r = this._mode.decrypt(this, e)), i.push(r);
          return h.concat(i);
        }),
        (i.prototype._final = function () {
          var t = this._cache.flush();
          if (this._autopadding) return s(this._mode.decrypt(this, t));
          if (t) throw new Error("data not multiple of block length");
        }),
        (i.prototype.setAutoPadding = function (t) {
          return (this._autopadding = !!t), this;
        }),
        (n.prototype.add = function (t) {
          this.cache = h.concat([this.cache, t]);
        }),
        (n.prototype.get = function (t) {
          var e;
          if (t) {
            if (this.cache.length > 16)
              return (
                (e = this.cache.slice(0, 16)),
                (this.cache = this.cache.slice(16)),
                e
              );
          } else if (this.cache.length >= 16)
            return (
              (e = this.cache.slice(0, 16)),
              (this.cache = this.cache.slice(16)),
              e
            );
          return null;
        }),
        (n.prototype.flush = function () {
          if (this.cache.length) return this.cache;
        }),
        (r.createDecipher = a),
        (r.createDecipheriv = o);
    },
    {
      "./aes": 20,
      "./authCipher": 21,
      "./modes": 33,
      "./streamCipher": 36,
      "cipher-base": 64,
      evp_bytestokey: 101,
      inherits: 132,
      "safe-buffer": 160,
    },
  ],
  24: [
    function (t, e, r) {
      function i(t, e, r) {
        c.call(this),
          (this._cache = new n()),
          (this._cipher = new d.AES(e)),
          (this._prev = h.from(r)),
          (this._mode = t),
          (this._autopadding = !0);
      }
      function n() {
        this.cache = h.allocUnsafe(0);
      }
      function s(t, e, r) {
        var n = a[t.toLowerCase()];
        if (!n) throw new TypeError("invalid suite type");
        if (("string" == typeof e && (e = h.from(e)), e.length !== n.key / 8))
          throw new TypeError("invalid key length " + e.length);
        if (
          ("string" == typeof r && (r = h.from(r)),
          "GCM" !== n.mode && r.length !== n.iv)
        )
          throw new TypeError("invalid iv length " + r.length);
        return "stream" === n.type
          ? new u(n.module, e, r)
          : "auth" === n.type
          ? new f(n.module, e, r)
          : new i(n.module, e, r);
      }
      function o(t, e) {
        var r = a[t.toLowerCase()];
        if (!r) throw new TypeError("invalid suite type");
        var i = l(e, !1, r.key, r.iv);
        return s(t, i.key, i.iv);
      }
      var a = t("./modes"),
        f = t("./authCipher"),
        h = t("safe-buffer").Buffer,
        u = t("./streamCipher"),
        c = t("cipher-base"),
        d = t("./aes"),
        l = t("evp_bytestokey"),
        p = t("inherits");
      p(i, c),
        (i.prototype._update = function (t) {
          var e, r;
          this._cache.add(t);
          for (var i = []; (e = this._cache.get()); )
            (r = this._mode.encrypt(this, e)), i.push(r);
          return h.concat(i);
        });
      var b = h.alloc(16, 16);
      (i.prototype._final = function () {
        var t = this._cache.flush();
        if (this._autopadding)
          return (t = this._mode.encrypt(this, t)), this._cipher.scrub(), t;
        if (!t.equals(b))
          throw (
            (this._cipher.scrub(),
            new Error("data not multiple of block length"))
          );
      }),
        (i.prototype.setAutoPadding = function (t) {
          return (this._autopadding = !!t), this;
        }),
        (n.prototype.add = function (t) {
          this.cache = h.concat([this.cache, t]);
        }),
        (n.prototype.get = function () {
          if (this.cache.length > 15) {
            var t = this.cache.slice(0, 16);
            return (this.cache = this.cache.slice(16)), t;
          }
          return null;
        }),
        (n.prototype.flush = function () {
          for (
            var t = 16 - this.cache.length, e = h.allocUnsafe(t), r = -1;
            ++r < t;

          )
            e.writeUInt8(t, r);
          return h.concat([this.cache, e]);
        }),
        (r.createCipheriv = s),
        (r.createCipher = o);
    },
    {
      "./aes": 20,
      "./authCipher": 21,
      "./modes": 33,
      "./streamCipher": 36,
      "cipher-base": 64,
      evp_bytestokey: 101,
      inherits: 132,
      "safe-buffer": 160,
    },
  ],
  25: [
    function (t, e, r) {
      function i(t) {
        return [
          t.readUInt32BE(0),
          t.readUInt32BE(4),
          t.readUInt32BE(8),
          t.readUInt32BE(12),
        ];
      }
      function n(t) {
        var e = o.allocUnsafe(16);
        return (
          e.writeUInt32BE(t[0] >>> 0, 0),
          e.writeUInt32BE(t[1] >>> 0, 4),
          e.writeUInt32BE(t[2] >>> 0, 8),
          e.writeUInt32BE(t[3] >>> 0, 12),
          e
        );
      }
      function s(t) {
        (this.h = t),
          (this.state = o.alloc(16, 0)),
          (this.cache = o.allocUnsafe(0));
      }
      var o = t("safe-buffer").Buffer,
        a = o.alloc(16, 0);
      (s.prototype.ghash = function (t) {
        for (var e = -1; ++e < t.length; ) this.state[e] ^= t[e];
        this._multiply();
      }),
        (s.prototype._multiply = function () {
          for (
            var t, e, r, s = i(this.h), o = [0, 0, 0, 0], a = -1;
            ++a < 128;

          ) {
            for (
              e = 0 != (this.state[~~(a / 8)] & (1 << (7 - (a % 8)))),
                e &&
                  ((o[0] ^= s[0]),
                  (o[1] ^= s[1]),
                  (o[2] ^= s[2]),
                  (o[3] ^= s[3])),
                r = 0 != (1 & s[3]),
                t = 3;
              t > 0;
              t--
            )
              s[t] = (s[t] >>> 1) | ((1 & s[t - 1]) << 31);
            (s[0] = s[0] >>> 1), r && (s[0] = s[0] ^ (225 << 24));
          }
          this.state = n(o);
        }),
        (s.prototype.update = function (t) {
          var e;
          for (
            this.cache = o.concat([this.cache, t]);
            this.cache.length >= 16;

          )
            (e = this.cache.slice(0, 16)),
              (this.cache = this.cache.slice(16)),
              this.ghash(e);
        }),
        (s.prototype.final = function (t, e) {
          return (
            this.cache.length && this.ghash(o.concat([this.cache, a], 16)),
            this.ghash(n([0, t, 0, e])),
            this.state
          );
        }),
        (e.exports = s);
    },
    { "safe-buffer": 160 },
  ],
  26: [
    function (t, e, r) {
      function i(t) {
        for (var e, r = t.length; r--; ) {
          if (((e = t.readUInt8(r)), 255 !== e)) {
            e++, t.writeUInt8(e, r);
            break;
          }
          t.writeUInt8(0, r);
        }
      }
      e.exports = i;
    },
    {},
  ],
  27: [
    function (t, e, r) {
      var i = t("buffer-xor");
      (r.encrypt = function (t, e) {
        var r = i(e, t._prev);
        return (t._prev = t._cipher.encryptBlock(r)), t._prev;
      }),
        (r.decrypt = function (t, e) {
          var r = t._prev;
          t._prev = e;
          var n = t._cipher.decryptBlock(e);
          return i(n, r);
        });
    },
    { "buffer-xor": 62 },
  ],
  28: [
    function (t, e, r) {
      function i(t, e, r) {
        var i = e.length,
          o = s(e, t._cache);
        return (
          (t._cache = t._cache.slice(i)),
          (t._prev = n.concat([t._prev, r ? e : o])),
          o
        );
      }
      var n = t("safe-buffer").Buffer,
        s = t("buffer-xor");
      r.encrypt = function (t, e, r) {
        for (var s, o = n.allocUnsafe(0); e.length; ) {
          if (
            (0 === t._cache.length &&
              ((t._cache = t._cipher.encryptBlock(t._prev)),
              (t._prev = n.allocUnsafe(0))),
            !(t._cache.length <= e.length))
          ) {
            o = n.concat([o, i(t, e, r)]);
            break;
          }
          (s = t._cache.length),
            (o = n.concat([o, i(t, e.slice(0, s), r)])),
            (e = e.slice(s));
        }
        return o;
      };
    },
    { "buffer-xor": 62, "safe-buffer": 160 },
  ],
  29: [
    function (t, e, r) {
      function i(t, e, r) {
        for (var i, s, o, a = -1, f = 8, h = 0; ++a < f; )
          (i = t._cipher.encryptBlock(t._prev)),
            (s = e & (1 << (7 - a)) ? 128 : 0),
            (o = i[0] ^ s),
            (h += (128 & o) >> a % 8),
            (t._prev = n(t._prev, r ? s : o));
        return h;
      }
      function n(t, e) {
        var r = t.length,
          i = -1,
          n = s.allocUnsafe(t.length);
        for (t = s.concat([t, s.from([e])]); ++i < r; )
          n[i] = (t[i] << 1) | (t[i + 1] >> 7);
        return n;
      }
      var s = t("safe-buffer").Buffer;
      r.encrypt = function (t, e, r) {
        for (var n = e.length, o = s.allocUnsafe(n), a = -1; ++a < n; )
          o[a] = i(t, e[a], r);
        return o;
      };
    },
    { "safe-buffer": 160 },
  ],
  30: [
    function (t, e, r) {
      function i(t, e, r) {
        var i = t._cipher.encryptBlock(t._prev),
          s = i[0] ^ e;
        return (t._prev = n.concat([t._prev.slice(1), n.from([r ? e : s])])), s;
      }
      var n = t("safe-buffer").Buffer;
      r.encrypt = function (t, e, r) {
        for (var s = e.length, o = n.allocUnsafe(s), a = -1; ++a < s; )
          o[a] = i(t, e[a], r);
        return o;
      };
    },
    { "safe-buffer": 160 },
  ],
  31: [
    function (t, e, r) {
      function i(t) {
        var e = t._cipher.encryptBlockRaw(t._prev);
        return o(t._prev), e;
      }
      var n = t("buffer-xor"),
        s = t("safe-buffer").Buffer,
        o = t("../incr32"),
        a = 16;
      r.encrypt = function (t, e) {
        var r = Math.ceil(e.length / a),
          o = t._cache.length;
        t._cache = s.concat([t._cache, s.allocUnsafe(r * a)]);
        for (var f = 0; f < r; f++) {
          var h = i(t),
            u = o + f * a;
          t._cache.writeUInt32BE(h[0], u + 0),
            t._cache.writeUInt32BE(h[1], u + 4),
            t._cache.writeUInt32BE(h[2], u + 8),
            t._cache.writeUInt32BE(h[3], u + 12);
        }
        var c = t._cache.slice(0, e.length);
        return (t._cache = t._cache.slice(e.length)), n(e, c);
      };
    },
    { "../incr32": 26, "buffer-xor": 62, "safe-buffer": 160 },
  ],
  32: [
    function (t, e, r) {
      (r.encrypt = function (t, e) {
        return t._cipher.encryptBlock(e);
      }),
        (r.decrypt = function (t, e) {
          return t._cipher.decryptBlock(e);
        });
    },
    {},
  ],
  33: [
    function (t, e, r) {
      var i = {
          ECB: t("./ecb"),
          CBC: t("./cbc"),
          CFB: t("./cfb"),
          CFB8: t("./cfb8"),
          CFB1: t("./cfb1"),
          OFB: t("./ofb"),
          CTR: t("./ctr"),
          GCM: t("./ctr"),
        },
        n = t("./list.json");
      for (var s in n) n[s].module = i[n[s].mode];
      e.exports = n;
    },
    {
      "./cbc": 27,
      "./cfb": 28,
      "./cfb1": 29,
      "./cfb8": 30,
      "./ctr": 31,
      "./ecb": 32,
      "./list.json": 34,
      "./ofb": 35,
    },
  ],
  34: [
    function (t, e, r) {
      e.exports = {
        "aes-128-ecb": {
          cipher: "AES",
          key: 128,
          iv: 0,
          mode: "ECB",
          type: "block",
        },
        "aes-192-ecb": {
          cipher: "AES",
          key: 192,
          iv: 0,
          mode: "ECB",
          type: "block",
        },
        "aes-256-ecb": {
          cipher: "AES",
          key: 256,
          iv: 0,
          mode: "ECB",
          type: "block",
        },
        "aes-128-cbc": {
          cipher: "AES",
          key: 128,
          iv: 16,
          mode: "CBC",
          type: "block",
        },
        "aes-192-cbc": {
          cipher: "AES",
          key: 192,
          iv: 16,
          mode: "CBC",
          type: "block",
        },
        "aes-256-cbc": {
          cipher: "AES",
          key: 256,
          iv: 16,
          mode: "CBC",
          type: "block",
        },
        aes128: { cipher: "AES", key: 128, iv: 16, mode: "CBC", type: "block" },
        aes192: { cipher: "AES", key: 192, iv: 16, mode: "CBC", type: "block" },
        aes256: { cipher: "AES", key: 256, iv: 16, mode: "CBC", type: "block" },
        "aes-128-cfb": {
          cipher: "AES",
          key: 128,
          iv: 16,
          mode: "CFB",
          type: "stream",
        },
        "aes-192-cfb": {
          cipher: "AES",
          key: 192,
          iv: 16,
          mode: "CFB",
          type: "stream",
        },
        "aes-256-cfb": {
          cipher: "AES",
          key: 256,
          iv: 16,
          mode: "CFB",
          type: "stream",
        },
        "aes-128-cfb8": {
          cipher: "AES",
          key: 128,
          iv: 16,
          mode: "CFB8",
          type: "stream",
        },
        "aes-192-cfb8": {
          cipher: "AES",
          key: 192,
          iv: 16,
          mode: "CFB8",
          type: "stream",
        },
        "aes-256-cfb8": {
          cipher: "AES",
          key: 256,
          iv: 16,
          mode: "CFB8",
          type: "stream",
        },
        "aes-128-cfb1": {
          cipher: "AES",
          key: 128,
          iv: 16,
          mode: "CFB1",
          type: "stream",
        },
        "aes-192-cfb1": {
          cipher: "AES",
          key: 192,
          iv: 16,
          mode: "CFB1",
          type: "stream",
        },
        "aes-256-cfb1": {
          cipher: "AES",
          key: 256,
          iv: 16,
          mode: "CFB1",
          type: "stream",
        },
        "aes-128-ofb": {
          cipher: "AES",
          key: 128,
          iv: 16,
          mode: "OFB",
          type: "stream",
        },
        "aes-192-ofb": {
          cipher: "AES",
          key: 192,
          iv: 16,
          mode: "OFB",
          type: "stream",
        },
        "aes-256-ofb": {
          cipher: "AES",
          key: 256,
          iv: 16,
          mode: "OFB",
          type: "stream",
        },
        "aes-128-ctr": {
          cipher: "AES",
          key: 128,
          iv: 16,
          mode: "CTR",
          type: "stream",
        },
        "aes-192-ctr": {
          cipher: "AES",
          key: 192,
          iv: 16,
          mode: "CTR",
          type: "stream",
        },
        "aes-256-ctr": {
          cipher: "AES",
          key: 256,
          iv: 16,
          mode: "CTR",
          type: "stream",
        },
        "aes-128-gcm": {
          cipher: "AES",
          key: 128,
          iv: 12,
          mode: "GCM",
          type: "auth",
        },
        "aes-192-gcm": {
          cipher: "AES",
          key: 192,
          iv: 12,
          mode: "GCM",
          type: "auth",
        },
        "aes-256-gcm": {
          cipher: "AES",
          key: 256,
          iv: 12,
          mode: "GCM",
          type: "auth",
        },
      };
    },
    {},
  ],
  35: [
    function (t, e, r) {
      (function (e) {
        (function () {
          function i(t) {
            return (t._prev = t._cipher.encryptBlock(t._prev)), t._prev;
          }
          var n = t("buffer-xor");
          r.encrypt = function (t, r) {
            for (; t._cache.length < r.length; )
              t._cache = e.concat([t._cache, i(t)]);
            var s = t._cache.slice(0, r.length);
            return (t._cache = t._cache.slice(r.length)), n(r, s);
          };
        }).call(this);
      }).call(this, t("buffer").Buffer);
    },
    { buffer: 63, "buffer-xor": 62 },
  ],
  36: [
    function (t, e, r) {
      function i(t, e, r, i) {
        o.call(this),
          (this._cipher = new n.AES(e)),
          (this._prev = s.from(r)),
          (this._cache = s.allocUnsafe(0)),
          (this._secCache = s.allocUnsafe(0)),
          (this._decrypt = i),
          (this._mode = t);
      }
      var n = t("./aes"),
        s = t("safe-buffer").Buffer,
        o = t("cipher-base"),
        a = t("inherits");
      a(i, o),
        (i.prototype._update = function (t) {
          return this._mode.encrypt(this, t, this._decrypt);
        }),
        (i.prototype._final = function () {
          this._cipher.scrub();
        }),
        (e.exports = i);
    },
    { "./aes": 20, "cipher-base": 64, inherits: 132, "safe-buffer": 160 },
  ],
  37: [
    function (t, e, r) {
      function i(t, e) {
        var r, i;
        if (((t = t.toLowerCase()), u[t])) (r = u[t].key), (i = u[t].iv);
        else {
          if (!c[t]) throw new TypeError("invalid suite type");
          (r = 8 * c[t].key), (i = c[t].iv);
        }
        var n = d(e, !1, r, i);
        return s(t, n.key, n.iv);
      }
      function n(t, e) {
        var r, i;
        if (((t = t.toLowerCase()), u[t])) (r = u[t].key), (i = u[t].iv);
        else {
          if (!c[t]) throw new TypeError("invalid suite type");
          (r = 8 * c[t].key), (i = c[t].iv);
        }
        var n = d(e, !1, r, i);
        return o(t, n.key, n.iv);
      }
      function s(t, e, r) {
        if (((t = t.toLowerCase()), u[t])) return h.createCipheriv(t, e, r);
        if (c[t]) return new f({ key: e, iv: r, mode: t });
        throw new TypeError("invalid suite type");
      }
      function o(t, e, r) {
        if (((t = t.toLowerCase()), u[t])) return h.createDecipheriv(t, e, r);
        if (c[t]) return new f({ key: e, iv: r, mode: t, decrypt: !0 });
        throw new TypeError("invalid suite type");
      }
      function a() {
        return Object.keys(c).concat(h.getCiphers());
      }
      var f = t("browserify-des"),
        h = t("browserify-aes/browser"),
        u = t("browserify-aes/modes"),
        c = t("browserify-des/modes"),
        d = t("evp_bytestokey");
      (r.createCipher = r.Cipher = i),
        (r.createCipheriv = r.Cipheriv = s),
        (r.createDecipher = r.Decipher = n),
        (r.createDecipheriv = r.Decipheriv = o),
        (r.listCiphers = r.getCiphers = a);
    },
    {
      "browserify-aes/browser": 22,
      "browserify-aes/modes": 33,
      "browserify-des": 38,
      "browserify-des/modes": 39,
      evp_bytestokey: 101,
    },
  ],
  38: [
    function (t, e, r) {
      function i(t) {
        n.call(this);
        var e,
          r = t.mode.toLowerCase(),
          i = f[r];
        e = t.decrypt ? "decrypt" : "encrypt";
        var s = t.key;
        a.isBuffer(s) || (s = a.from(s)),
          ("des-ede" !== r && "des-ede-cbc" !== r) ||
            (s = a.concat([s, s.slice(0, 8)]));
        var o = t.iv;
        a.isBuffer(o) || (o = a.from(o)),
          (this._des = i.create({ key: s, iv: o, type: e }));
      }
      var n = t("cipher-base"),
        s = t("des.js"),
        o = t("inherits"),
        a = t("safe-buffer").Buffer,
        f = {
          "des-ede3-cbc": s.CBC.instantiate(s.EDE),
          "des-ede3": s.EDE,
          "des-ede-cbc": s.CBC.instantiate(s.EDE),
          "des-ede": s.EDE,
          "des-cbc": s.CBC.instantiate(s.DES),
          "des-ecb": s.DES,
        };
      (f.des = f["des-cbc"]),
        (f.des3 = f["des-ede3-cbc"]),
        (e.exports = i),
        o(i, n),
        (i.prototype._update = function (t) {
          return a.from(this._des.update(t));
        }),
        (i.prototype._final = function () {
          return a.from(this._des.final());
        });
    },
    { "cipher-base": 64, "des.js": 72, inherits: 132, "safe-buffer": 160 },
  ],
  39: [
    function (t, e, r) {
      (r["des-ecb"] = { key: 8, iv: 0 }),
        (r["des-cbc"] = r.des = { key: 8, iv: 8 }),
        (r["des-ede3-cbc"] = r.des3 = { key: 24, iv: 8 }),
        (r["des-ede3"] = { key: 24, iv: 0 }),
        (r["des-ede-cbc"] = { key: 16, iv: 8 }),
        (r["des-ede"] = { key: 16, iv: 0 });
    },
    {},
  ],
  40: [
    function (t, e, r) {
      (function (r) {
        (function () {
          function i(t) {
            var e = n(t),
              r = e
                .toRed(o.mont(t.modulus))
                .redPow(new o(t.publicExponent))
                .fromRed();
            return { blinder: r, unblinder: e.invm(t.modulus) };
          }
          function n(t) {
            var e,
              r = t.modulus.byteLength();
            do {
              e = new o(a(r));
            } while (
              e.cmp(t.modulus) >= 0 ||
              !e.umod(t.prime1) ||
              !e.umod(t.prime2)
            );
            return e;
          }
          function s(t, e) {
            var n = i(e),
              s = e.modulus.byteLength(),
              a = new o(t).mul(n.blinder).umod(e.modulus),
              f = a.toRed(o.mont(e.prime1)),
              h = a.toRed(o.mont(e.prime2)),
              u = e.coefficient,
              c = e.prime1,
              d = e.prime2,
              l = f.redPow(e.exponent1).fromRed(),
              p = h.redPow(e.exponent2).fromRed(),
              b = l.isub(p).imul(u).umod(c).imul(d);
            return p
              .iadd(b)
              .imul(n.unblinder)
              .umod(e.modulus)
              .toArrayLike(r, "be", s);
          }
          var o = t("bn.js"),
            a = t("randombytes");
          (s.getr = n), (e.exports = s);
        }).call(this);
      }).call(this, t("buffer").Buffer);
    },
    { "bn.js": 17, buffer: 63, randombytes: 157 },
  ],
  41: [
    function (t, e, r) {
      "use strict";
      e.exports = t("./browser/algorithms.json");
    },
    { "./browser/algorithms.json": 42 },
  ],
  42: [
    function (t, e, r) {
      e.exports = {
        sha224WithRSAEncryption: {
          sign: "rsa",
          hash: "sha224",
          id: "302d300d06096086480165030402040500041c",
        },
        "RSA-SHA224": {
          sign: "ecdsa/rsa",
          hash: "sha224",
          id: "302d300d06096086480165030402040500041c",
        },
        sha256WithRSAEncryption: {
          sign: "rsa",
          hash: "sha256",
          id: "3031300d060960864801650304020105000420",
        },
        "RSA-SHA256": {
          sign: "ecdsa/rsa",
          hash: "sha256",
          id: "3031300d060960864801650304020105000420",
        },
        sha384WithRSAEncryption: {
          sign: "rsa",
          hash: "sha384",
          id: "3041300d060960864801650304020205000430",
        },
        "RSA-SHA384": {
          sign: "ecdsa/rsa",
          hash: "sha384",
          id: "3041300d060960864801650304020205000430",
        },
        sha512WithRSAEncryption: {
          sign: "rsa",
          hash: "sha512",
          id: "3051300d060960864801650304020305000440",
        },
        "RSA-SHA512": {
          sign: "ecdsa/rsa",
          hash: "sha512",
          id: "3051300d060960864801650304020305000440",
        },
        "RSA-SHA1": {
          sign: "rsa",
          hash: "sha1",
          id: "3021300906052b0e03021a05000414",
        },
        "ecdsa-with-SHA1": { sign: "ecdsa", hash: "sha1", id: "" },
        sha256: { sign: "ecdsa", hash: "sha256", id: "" },
        sha224: { sign: "ecdsa", hash: "sha224", id: "" },
        sha384: { sign: "ecdsa", hash: "sha384", id: "" },
        sha512: { sign: "ecdsa", hash: "sha512", id: "" },
        "DSA-SHA": { sign: "dsa", hash: "sha1", id: "" },
        "DSA-SHA1": { sign: "dsa", hash: "sha1", id: "" },
        DSA: { sign: "dsa", hash: "sha1", id: "" },
        "DSA-WITH-SHA224": { sign: "dsa", hash: "sha224", id: "" },
        "DSA-SHA224": { sign: "dsa", hash: "sha224", id: "" },
        "DSA-WITH-SHA256": { sign: "dsa", hash: "sha256", id: "" },
        "DSA-SHA256": { sign: "dsa", hash: "sha256", id: "" },
        "DSA-WITH-SHA384": { sign: "dsa", hash: "sha384", id: "" },
        "DSA-SHA384": { sign: "dsa", hash: "sha384", id: "" },
        "DSA-WITH-SHA512": { sign: "dsa", hash: "sha512", id: "" },
        "DSA-SHA512": { sign: "dsa", hash: "sha512", id: "" },
        "DSA-RIPEMD160": { sign: "dsa", hash: "rmd160", id: "" },
        ripemd160WithRSA: {
          sign: "rsa",
          hash: "rmd160",
          id: "3021300906052b2403020105000414",
        },
        "RSA-RIPEMD160": {
          sign: "rsa",
          hash: "rmd160",
          id: "3021300906052b2403020105000414",
        },
        md5WithRSAEncryption: {
          sign: "rsa",
          hash: "md5",
          id: "3020300c06082a864886f70d020505000410",
        },
        "RSA-MD5": {
          sign: "rsa",
          hash: "md5",
          id: "3020300c06082a864886f70d020505000410",
        },
      };
    },
    {},
  ],
  43: [
    function (t, e, r) {
      e.exports = {
        "1.3.132.0.10": "secp256k1",
        "1.3.132.0.33": "p224",
        "1.2.840.10045.3.1.1": "p192",
        "1.2.840.10045.3.1.7": "p256",
        "1.3.132.0.34": "p384",
        "1.3.132.0.35": "p521",
      };
    },
    {},
  ],
  44: [
    function (t, e, r) {
      "use strict";
      function i(t) {
        h.Writable.call(this);
        var e = l[t];
        if (!e) throw new Error("Unknown message digest");
        (this._hashType = e.hash),
          (this._hash = f(e.hash)),
          (this._tag = e.id),
          (this._signType = e.sign);
      }
      function n(t) {
        h.Writable.call(this);
        var e = l[t];
        if (!e) throw new Error("Unknown message digest");
        (this._hash = f(e.hash)), (this._tag = e.id), (this._signType = e.sign);
      }
      function s(t) {
        return new i(t);
      }
      function o(t) {
        return new n(t);
      }
      var a = t("safe-buffer").Buffer,
        f = t("create-hash"),
        h = t("readable-stream"),
        u = t("inherits"),
        c = t("./sign"),
        d = t("./verify"),
        l = t("./algorithms.json");
      Object.keys(l).forEach(function (t) {
        (l[t].id = a.from(l[t].id, "hex")), (l[t.toLowerCase()] = l[t]);
      }),
        u(i, h.Writable),
        (i.prototype._write = function (t, e, r) {
          this._hash.update(t), r();
        }),
        (i.prototype.update = function (t, e) {
          return (
            this._hash.update("string" == typeof t ? a.from(t, e) : t), this
          );
        }),
        (i.prototype.sign = function (t, e) {
          this.end();
          var r = this._hash.digest(),
            i = c(r, t, this._hashType, this._signType, this._tag);
          return e ? i.toString(e) : i;
        }),
        u(n, h.Writable),
        (n.prototype._write = function (t, e, r) {
          this._hash.update(t), r();
        }),
        (n.prototype.update = function (t, e) {
          return (
            this._hash.update("string" == typeof t ? a.from(t, e) : t), this
          );
        }),
        (n.prototype.verify = function (t, e, r) {
          var i = "string" == typeof e ? a.from(e, r) : e;
          this.end();
          var n = this._hash.digest();
          return d(i, n, t, this._signType, this._tag);
        }),
        (e.exports = { Sign: s, Verify: o, createSign: s, createVerify: o });
    },
    {
      "./algorithms.json": 42,
      "./sign": 45,
      "./verify": 46,
      "create-hash": 67,
      inherits: 132,
      "readable-stream": 61,
      "safe-buffer": 160,
    },
  ],
  45: [
    function (t, e, r) {
      "use strict";
      function i(t, e, r, i, o) {
        var a = y(e);
        if (a.curve) {
          if ("ecdsa" !== i && "ecdsa/rsa" !== i)
            throw new Error("wrong private key type");
          return n(t, a);
        }
        if ("dsa" === a.type) {
          if ("dsa" !== i) throw new Error("wrong private key type");
          return s(t, a, r);
        }
        if ("rsa" !== i && "ecdsa/rsa" !== i)
          throw new Error("wrong private key type");
        if (void 0 !== e.padding && e.padding !== v)
          throw new Error("illegal or unsupported padding mode");
        t = d.concat([o, t]);
        for (
          var f = a.modulus.byteLength(), h = [0, 1];
          t.length + h.length + 1 < f;

        )
          h.push(255);
        h.push(0);
        for (var u = -1; ++u < t.length; ) h.push(t[u]);
        var c = p(h, a);
        return c;
      }
      function n(t, e) {
        var r = g[e.curve.join(".")];
        if (!r) throw new Error("unknown curve " + e.curve.join("."));
        var i = new b(r),
          n = i.keyFromPrivate(e.privateKey),
          s = n.sign(t);
        return d.from(s.toDER());
      }
      function s(t, e, r) {
        for (
          var i,
            n = e.params.priv_key,
            s = e.params.p,
            h = e.params.q,
            d = e.params.g,
            l = new m(0),
            p = f(t, h).mod(h),
            b = !1,
            y = a(n, h, t, r);
          !1 === b;

        )
          (i = u(h, y, r)),
            (l = c(d, i, s, h)),
            (b = i
              .invm(h)
              .imul(p.add(n.mul(l)))
              .mod(h)),
            0 === b.cmpn(0) && ((b = !1), (l = new m(0)));
        return o(l, b);
      }
      function o(t, e) {
        (t = t.toArray()),
          (e = e.toArray()),
          128 & t[0] && (t = [0].concat(t)),
          128 & e[0] && (e = [0].concat(e));
        var r = t.length + e.length + 4,
          i = [48, r, 2, t.length];
        return (i = i.concat(t, [2, e.length], e)), d.from(i);
      }
      function a(t, e, r, i) {
        if (((t = d.from(t.toArray())), t.length < e.byteLength())) {
          var n = d.alloc(e.byteLength() - t.length);
          t = d.concat([n, t]);
        }
        var s = r.length,
          o = h(r, e),
          a = d.alloc(s);
        a.fill(1);
        var f = d.alloc(s);
        return (
          (f = l(i, f)
            .update(a)
            .update(d.from([0]))
            .update(t)
            .update(o)
            .digest()),
          (a = l(i, f).update(a).digest()),
          (f = l(i, f)
            .update(a)
            .update(d.from([1]))
            .update(t)
            .update(o)
            .digest()),
          (a = l(i, f).update(a).digest()),
          { k: f, v: a }
        );
      }
      function f(t, e) {
        var r = new m(t),
          i = (t.length << 3) - e.bitLength();
        return i > 0 && r.ishrn(i), r;
      }
      function h(t, e) {
        (t = f(t, e)), (t = t.mod(e));
        var r = d.from(t.toArray());
        if (r.length < e.byteLength()) {
          var i = d.alloc(e.byteLength() - r.length);
          r = d.concat([i, r]);
        }
        return r;
      }
      function u(t, e, r) {
        var i, n;
        do {
          for (i = d.alloc(0); 8 * i.length < t.bitLength(); )
            (e.v = l(r, e.k).update(e.v).digest()), (i = d.concat([i, e.v]));
          (n = f(i, t)),
            (e.k = l(r, e.k)
              .update(e.v)
              .update(d.from([0]))
              .digest()),
            (e.v = l(r, e.k).update(e.v).digest());
        } while (-1 !== n.cmp(t));
        return n;
      }
      function c(t, e, r, i) {
        return t.toRed(m.mont(r)).redPow(e).fromRed().mod(i);
      }
      var d = t("safe-buffer").Buffer,
        l = t("create-hmac"),
        p = t("browserify-rsa"),
        b = t("elliptic").ec,
        m = t("bn.js"),
        y = t("parse-asn1"),
        g = t("./curves.json"),
        v = 1;
      (e.exports = i), (e.exports.getKey = a), (e.exports.makeKey = u);
    },
    {
      "./curves.json": 43,
      "bn.js": 17,
      "browserify-rsa": 40,
      "create-hmac": 69,
      elliptic: 83,
      "parse-asn1": 142,
      "safe-buffer": 160,
    },
  ],
  46: [
    function (t, e, r) {
      "use strict";
      function i(t, e, r, i, o) {
        var h = u(r);
        if ("ec" === h.type) {
          if ("ecdsa" !== i && "ecdsa/rsa" !== i)
            throw new Error("wrong public key type");
          return n(t, e, h);
        }
        if ("dsa" === h.type) {
          if ("dsa" !== i) throw new Error("wrong public key type");
          return s(t, e, h);
        }
        if ("rsa" !== i && "ecdsa/rsa" !== i)
          throw new Error("wrong public key type");
        e = a.concat([o, e]);
        for (
          var c = h.modulus.byteLength(), d = [1], l = 0;
          e.length + d.length + 2 < c;

        )
          d.push(255), (l += 1);
        d.push(0);
        for (var p = -1; ++p < e.length; ) d.push(e[p]);
        d = a.from(d);
        var b = f.mont(h.modulus);
        (t = new f(t).toRed(b)),
          (t = t.redPow(new f(h.publicExponent))),
          (t = a.from(t.fromRed().toArray()));
        var m = l < 8 ? 1 : 0;
        for (
          c = Math.min(t.length, d.length),
            t.length !== d.length && (m = 1),
            p = -1;
          ++p < c;

        )
          m |= t[p] ^ d[p];
        return 0 === m;
      }
      function n(t, e, r) {
        var i = c[r.data.algorithm.curve.join(".")];
        if (!i)
          throw new Error("unknown curve " + r.data.algorithm.curve.join("."));
        var n = new h(i),
          s = r.data.subjectPrivateKey.data;
        return n.verify(e, t, s);
      }
      function s(t, e, r) {
        var i = r.data.p,
          n = r.data.q,
          s = r.data.g,
          a = r.data.pub_key,
          h = u.signature.decode(t, "der"),
          c = h.s,
          d = h.r;
        o(c, n), o(d, n);
        var l = f.mont(i),
          p = c.invm(n),
          b = s
            .toRed(l)
            .redPow(new f(e).mul(p).mod(n))
            .fromRed()
            .mul(a.toRed(l).redPow(d.mul(p).mod(n)).fromRed())
            .mod(i)
            .mod(n);
        return 0 === b.cmp(d);
      }
      function o(t, e) {
        if (t.cmpn(0) <= 0) throw new Error("invalid sig");
        if (t.cmp(e) >= 0) throw new Error("invalid sig");
      }
      var a = t("safe-buffer").Buffer,
        f = t("bn.js"),
        h = t("elliptic").ec,
        u = t("parse-asn1"),
        c = t("./curves.json");
      e.exports = i;
    },
    {
      "./curves.json": 43,
      "bn.js": 17,
      elliptic: 83,
      "parse-asn1": 142,
      "safe-buffer": 160,
    },
  ],
  47: [
    function (t, e, r) {
      "use strict";
      function i(t, e) {
        (t.prototype = Object.create(e.prototype)),
          (t.prototype.constructor = t),
          (t.__proto__ = e);
      }
      function n(t, e, r) {
        function n(t, r, i) {
          return "string" == typeof e ? e : e(t, r, i);
        }
        r || (r = Error);
        var s = (function (t) {
          function e(e, r, i) {
            return t.call(this, n(e, r, i)) || this;
          }
          return i(e, t), e;
        })(r);
        (s.prototype.name = r.name), (s.prototype.code = t), (h[t] = s);
      }
      function s(t, e) {
        if (Array.isArray(t)) {
          var r = t.length;
          return (
            (t = t.map(function (t) {
              return String(t);
            })),
            r > 2
              ? "one of "
                  .concat(e, " ")
                  .concat(t.slice(0, r - 1).join(", "), ", or ") + t[r - 1]
              : 2 === r
              ? "one of ".concat(e, " ").concat(t[0], " or ").concat(t[1])
              : "of ".concat(e, " ").concat(t[0])
          );
        }
        return "of ".concat(e, " ").concat(String(t));
      }
      function o(t, e, r) {
        return t.substr(!r || r < 0 ? 0 : +r, e.length) === e;
      }
      function a(t, e, r) {
        return (
          (void 0 === r || r > t.length) && (r = t.length),
          t.substring(r - e.length, r) === e
        );
      }
      function f(t, e, r) {
        return (
          "number" != typeof r && (r = 0),
          !(r + e.length > t.length) && -1 !== t.indexOf(e, r)
        );
      }
      var h = {};
      n(
        "ERR_INVALID_OPT_VALUE",
        function (t, e) {
          return 'The value "' + e + '" is invalid for option "' + t + '"';
        },
        TypeError
      ),
        n(
          "ERR_INVALID_ARG_TYPE",
          function (t, e, r) {
            var i, n;
            if (
              ("string" == typeof e && o(e, "not ")
                ? ((i = "must not be"), (e = e.replace(/^not /, "")))
                : (i = "must be"),
              a(t, " argument"))
            )
              n = "The ".concat(t, " ").concat(i, " ").concat(s(e, "type"));
            else {
              var h = f(t, ".") ? "property" : "argument";
              n = 'The "'
                .concat(t, '" ')
                .concat(h, " ")
                .concat(i, " ")
                .concat(s(e, "type"));
            }
            return (n += ". Received type ".concat(typeof r)), n;
          },
          TypeError
        ),
        n("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"),
        n("ERR_METHOD_NOT_IMPLEMENTED", function (t) {
          return "The " + t + " method is not implemented";
        }),
        n("ERR_STREAM_PREMATURE_CLOSE", "Premature close"),
        n("ERR_STREAM_DESTROYED", function (t) {
          return "Cannot call " + t + " after a stream was destroyed";
        }),
        n("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"),
        n("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"),
        n("ERR_STREAM_WRITE_AFTER_END", "write after end"),
        n(
          "ERR_STREAM_NULL_VALUES",
          "May not write null values to stream",
          TypeError
        ),
        n(
          "ERR_UNKNOWN_ENCODING",
          function (t) {
            return "Unknown encoding: " + t;
          },
          TypeError
        ),
        n(
          "ERR_STREAM_UNSHIFT_AFTER_END_EVENT",
          "stream.unshift() after end event"
        ),
        (e.exports.codes = h);
    },
    {},
  ],
  48: [
    function (t, e, r) {
      (function (r) {
        (function () {
          "use strict";
          function i(t) {
            if (!(this instanceof i)) return new i(t);
            a.call(this, t),
              f.call(this, t),
              (this.allowHalfOpen = !0),
              t &&
                (!1 === t.readable && (this.readable = !1),
                !1 === t.writable && (this.writable = !1),
                !1 === t.allowHalfOpen &&
                  ((this.allowHalfOpen = !1), this.once("end", n)));
          }
          function n() {
            this._writableState.ended || r.nextTick(s, this);
          }
          function s(t) {
            t.end();
          }
          var o =
            Object.keys ||
            function (t) {
              var e = [];
              for (var r in t) e.push(r);
              return e;
            };
          e.exports = i;
          var a = t("./_stream_readable"),
            f = t("./_stream_writable");
          t("inherits")(i, a);
          for (var h = o(f.prototype), u = 0; u < h.length; u++) {
            var c = h[u];
            i.prototype[c] || (i.prototype[c] = f.prototype[c]);
          }
          Object.defineProperty(i.prototype, "writableHighWaterMark", {
            enumerable: !1,
            get: function () {
              return this._writableState.highWaterMark;
            },
          }),
            Object.defineProperty(i.prototype, "writableBuffer", {
              enumerable: !1,
              get: function () {
                return this._writableState && this._writableState.getBuffer();
              },
            }),
            Object.defineProperty(i.prototype, "writableLength", {
              enumerable: !1,
              get: function () {
                return this._writableState.length;
              },
            }),
            Object.defineProperty(i.prototype, "destroyed", {
              enumerable: !1,
              get: function () {
                return (
                  void 0 !== this._readableState &&
                  void 0 !== this._writableState &&
                  this._readableState.destroyed &&
                  this._writableState.destroyed
                );
              },
              set: function (t) {
                void 0 !== this._readableState &&
                  void 0 !== this._writableState &&
                  ((this._readableState.destroyed = t),
                  (this._writableState.destroyed = t));
              },
            });
        }).call(this);
      }).call(this, t("_process"));
    },
    {
      "./_stream_readable": 50,
      "./_stream_writable": 52,
      _process: 149,
      inherits: 132,
    },
  ],
  49: [
    function (t, e, r) {
      "use strict";
      function i(t) {
        if (!(this instanceof i)) return new i(t);
        n.call(this, t);
      }
      e.exports = i;
      var n = t("./_stream_transform");
      t("inherits")(i, n),
        (i.prototype._transform = function (t, e, r) {
          r(null, t);
        });
    },
    { "./_stream_transform": 51, inherits: 132 },
  ],
  50: [
    function (t, e, r) {
      (function (r, i) {
        (function () {
          "use strict";
          function n(t) {
            return C.from(t);
          }
          function s(t) {
            return C.isBuffer(t) || t instanceof P;
          }
          function o(t, e, r) {
            if ("function" == typeof t.prependListener)
              return t.prependListener(e, r);
            t._events && t._events[e]
              ? Array.isArray(t._events[e])
                ? t._events[e].unshift(r)
                : (t._events[e] = [r, t._events[e]])
              : t.on(e, r);
          }
          function a(e, r, i) {
            (R = R || t("./_stream_duplex")),
              (e = e || {}),
              "boolean" != typeof i && (i = r instanceof R),
              (this.objectMode = !!e.objectMode),
              i &&
                (this.objectMode = this.objectMode || !!e.readableObjectMode),
              (this.highWaterMark = K(this, e, "readableHighWaterMark", i)),
              (this.buffer = new q()),
              (this.length = 0),
              (this.pipes = null),
              (this.pipesCount = 0),
              (this.flowing = null),
              (this.ended = !1),
              (this.endEmitted = !1),
              (this.reading = !1),
              (this.sync = !0),
              (this.needReadable = !1),
              (this.emittedReadable = !1),
              (this.readableListening = !1),
              (this.resumeScheduled = !1),
              (this.paused = !0),
              (this.emitClose = !1 !== e.emitClose),
              (this.autoDestroy = !!e.autoDestroy),
              (this.destroyed = !1),
              (this.defaultEncoding = e.defaultEncoding || "utf8"),
              (this.awaitDrain = 0),
              (this.readingMore = !1),
              (this.decoder = null),
              (this.encoding = null),
              e.encoding &&
                (O || (O = t("string_decoder/").StringDecoder),
                (this.decoder = new O(e.encoding)),
                (this.encoding = e.encoding));
          }
          function f(e) {
            if (((R = R || t("./_stream_duplex")), !(this instanceof f)))
              return new f(e);
            var r = this instanceof R;
            (this._readableState = new a(e, this, r)),
              (this.readable = !0),
              e &&
                ("function" == typeof e.read && (this._read = e.read),
                "function" == typeof e.destroy && (this._destroy = e.destroy)),
              T.call(this);
          }
          function h(t, e, r, i, s) {
            I("readableAddChunk", e);
            var o,
              a = t._readableState;
            if (null === e) (a.reading = !1), p(t, a);
            else if ((s || (o = c(a, e)), o)) X(t, o);
            else if (a.objectMode || (e && e.length > 0))
              if (
                ("string" == typeof e ||
                  a.objectMode ||
                  Object.getPrototypeOf(e) === C.prototype ||
                  (e = n(e)),
                i)
              )
                a.endEmitted ? X(t, new Z()) : u(t, a, e, !0);
              else if (a.ended) X(t, new W());
              else {
                if (a.destroyed) return !1;
                (a.reading = !1),
                  a.decoder && !r
                    ? ((e = a.decoder.write(e)),
                      a.objectMode || 0 !== e.length ? u(t, a, e, !1) : y(t, a))
                    : u(t, a, e, !1);
              }
            else i || ((a.reading = !1), y(t, a));
            return !a.ended && (a.length < a.highWaterMark || 0 === a.length);
          }
          function u(t, e, r, i) {
            e.flowing && 0 === e.length && !e.sync
              ? ((e.awaitDrain = 0), t.emit("data", r))
              : ((e.length += e.objectMode ? 1 : r.length),
                i ? e.buffer.unshift(r) : e.buffer.push(r),
                e.needReadable && b(t)),
              y(t, e);
          }
          function c(t, e) {
            var r;
            return (
              s(e) ||
                "string" == typeof e ||
                void 0 === e ||
                t.objectMode ||
                (r = new H("chunk", ["string", "Buffer", "Uint8Array"], e)),
              r
            );
          }
          function d(t) {
            return (
              t >= Y
                ? (t = Y)
                : (t--,
                  (t |= t >>> 1),
                  (t |= t >>> 2),
                  (t |= t >>> 4),
                  (t |= t >>> 8),
                  (t |= t >>> 16),
                  t++),
              t
            );
          }
          function l(t, e) {
            return t <= 0 || (0 === e.length && e.ended)
              ? 0
              : e.objectMode
              ? 1
              : t != t
              ? e.flowing && e.length
                ? e.buffer.head.data.length
                : e.length
              : (t > e.highWaterMark && (e.highWaterMark = d(t)),
                t <= e.length
                  ? t
                  : e.ended
                  ? e.length
                  : ((e.needReadable = !0), 0));
          }
          function p(t, e) {
            if ((I("onEofChunk"), !e.ended)) {
              if (e.decoder) {
                var r = e.decoder.end();
                r &&
                  r.length &&
                  (e.buffer.push(r), (e.length += e.objectMode ? 1 : r.length));
              }
              (e.ended = !0),
                e.sync
                  ? b(t)
                  : ((e.needReadable = !1),
                    e.emittedReadable || ((e.emittedReadable = !0), m(t)));
            }
          }
          function b(t) {
            var e = t._readableState;
            I("emitReadable", e.needReadable, e.emittedReadable),
              (e.needReadable = !1),
              e.emittedReadable ||
                (I("emitReadable", e.flowing),
                (e.emittedReadable = !0),
                r.nextTick(m, t));
          }
          function m(t) {
            var e = t._readableState;
            I("emitReadable_", e.destroyed, e.length, e.ended),
              e.destroyed ||
                (!e.length && !e.ended) ||
                (t.emit("readable"), (e.emittedReadable = !1)),
              (e.needReadable =
                !e.flowing && !e.ended && e.length <= e.highWaterMark),
              E(t);
          }
          function y(t, e) {
            e.readingMore || ((e.readingMore = !0), r.nextTick(g, t, e));
          }
          function g(t, e) {
            for (
              ;
              !e.reading &&
              !e.ended &&
              (e.length < e.highWaterMark || (e.flowing && 0 === e.length));

            ) {
              var r = e.length;
              if ((I("maybeReadMore read 0"), t.read(0), r === e.length)) break;
            }
            e.readingMore = !1;
          }
          function v(t) {
            return function () {
              var e = t._readableState;
              I("pipeOnDrain", e.awaitDrain),
                e.awaitDrain && e.awaitDrain--,
                0 === e.awaitDrain && j(t, "data") && ((e.flowing = !0), E(t));
            };
          }
          function w(t) {
            var e = t._readableState;
            (e.readableListening = t.listenerCount("readable") > 0),
              e.resumeScheduled && !e.paused
                ? (e.flowing = !0)
                : t.listenerCount("data") > 0 && t.resume();
          }
          function _(t) {
            I("readable nexttick read 0"), t.read(0);
          }
          function M(t, e) {
            e.resumeScheduled ||
              ((e.resumeScheduled = !0), r.nextTick(S, t, e));
          }
          function S(t, e) {
            I("resume", e.reading),
              e.reading || t.read(0),
              (e.resumeScheduled = !1),
              t.emit("resume"),
              E(t),
              e.flowing && !e.reading && t.read(0);
          }
          function E(t) {
            var e = t._readableState;
            for (I("flow", e.flowing); e.flowing && null !== t.read(); );
          }
          function k(t, e) {
            return 0 === e.length
              ? null
              : (e.objectMode
                  ? (r = e.buffer.shift())
                  : !t || t >= e.length
                  ? ((r = e.decoder
                      ? e.buffer.join("")
                      : 1 === e.buffer.length
                      ? e.buffer.first()
                      : e.buffer.concat(e.length)),
                    e.buffer.clear())
                  : (r = e.buffer.consume(t, e.decoder)),
                r);
            var r;
          }
          function A(t) {
            var e = t._readableState;
            I("endReadable", e.endEmitted),
              e.endEmitted || ((e.ended = !0), r.nextTick(x, e, t));
          }
          function x(t, e) {
            if (
              (I("endReadableNT", t.endEmitted, t.length),
              !t.endEmitted &&
                0 === t.length &&
                ((t.endEmitted = !0),
                (e.readable = !1),
                e.emit("end"),
                t.autoDestroy))
            ) {
              var r = e._writableState;
              (!r || (r.autoDestroy && r.finished)) && e.destroy();
            }
          }
          function B(t, e) {
            for (var r = 0, i = t.length; r < i; r++) if (t[r] === e) return r;
            return -1;
          }
          var R;
          (e.exports = f), (f.ReadableState = a);
          t("events").EventEmitter;
          var I,
            j = function (t, e) {
              return t.listeners(e).length;
            },
            T = t("./internal/streams/stream"),
            C = t("buffer").Buffer,
            P =
              (void 0 !== i
                ? i
                : "undefined" != typeof window
                ? window
                : "undefined" != typeof self
                ? self
                : {}
              ).Uint8Array || function () {},
            L = t("util");
          I = L && L.debuglog ? L.debuglog("stream") : function () {};
          var O,
            D,
            N,
            q = t("./internal/streams/buffer_list"),
            U = t("./internal/streams/destroy"),
            z = t("./internal/streams/state"),
            K = z.getHighWaterMark,
            F = t("../errors").codes,
            H = F.ERR_INVALID_ARG_TYPE,
            W = F.ERR_STREAM_PUSH_AFTER_EOF,
            V = F.ERR_METHOD_NOT_IMPLEMENTED,
            Z = F.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
          t("inherits")(f, T);
          var X = U.errorOrDestroy,
            G = ["error", "close", "destroy", "pause", "resume"];
          Object.defineProperty(f.prototype, "destroyed", {
            enumerable: !1,
            get: function () {
              return (
                void 0 !== this._readableState && this._readableState.destroyed
              );
            },
            set: function (t) {
              this._readableState && (this._readableState.destroyed = t);
            },
          }),
            (f.prototype.destroy = U.destroy),
            (f.prototype._undestroy = U.undestroy),
            (f.prototype._destroy = function (t, e) {
              e(t);
            }),
            (f.prototype.push = function (t, e) {
              var r,
                i = this._readableState;
              return (
                i.objectMode
                  ? (r = !0)
                  : "string" == typeof t &&
                    ((e = e || i.defaultEncoding),
                    e !== i.encoding && ((t = C.from(t, e)), (e = "")),
                    (r = !0)),
                h(this, t, e, !1, r)
              );
            }),
            (f.prototype.unshift = function (t) {
              return h(this, t, null, !0, !1);
            }),
            (f.prototype.isPaused = function () {
              return !1 === this._readableState.flowing;
            }),
            (f.prototype.setEncoding = function (e) {
              O || (O = t("string_decoder/").StringDecoder);
              var r = new O(e);
              (this._readableState.decoder = r),
                (this._readableState.encoding =
                  this._readableState.decoder.encoding);
              for (
                var i = this._readableState.buffer.head, n = "";
                null !== i;

              )
                (n += r.write(i.data)), (i = i.next);
              return (
                this._readableState.buffer.clear(),
                "" !== n && this._readableState.buffer.push(n),
                (this._readableState.length = n.length),
                this
              );
            });
          var Y = 1073741824;
          (f.prototype.read = function (t) {
            I("read", t), (t = parseInt(t, 10));
            var e = this._readableState,
              r = t;
            if (
              (0 !== t && (e.emittedReadable = !1),
              0 === t &&
                e.needReadable &&
                ((0 !== e.highWaterMark
                  ? e.length >= e.highWaterMark
                  : e.length > 0) ||
                  e.ended))
            )
              return (
                I("read: emitReadable", e.length, e.ended),
                0 === e.length && e.ended ? A(this) : b(this),
                null
              );
            if (((t = l(t, e)), 0 === t && e.ended))
              return 0 === e.length && A(this), null;
            var i,
              n = e.needReadable;
            return (
              I("need readable", n),
              (0 === e.length || e.length - t < e.highWaterMark) &&
                ((n = !0), I("length less than watermark", n)),
              e.ended || e.reading
                ? ((n = !1), I("reading or ended", n))
                : n &&
                  (I("do read"),
                  (e.reading = !0),
                  (e.sync = !0),
                  0 === e.length && (e.needReadable = !0),
                  this._read(e.highWaterMark),
                  (e.sync = !1),
                  e.reading || (t = l(r, e))),
              (i = t > 0 ? k(t, e) : null),
              null === i
                ? ((e.needReadable = e.length <= e.highWaterMark), (t = 0))
                : ((e.length -= t), (e.awaitDrain = 0)),
              0 === e.length &&
                (e.ended || (e.needReadable = !0),
                r !== t && e.ended && A(this)),
              null !== i && this.emit("data", i),
              i
            );
          }),
            (f.prototype._read = function (t) {
              X(this, new V("_read()"));
            }),
            (f.prototype.pipe = function (t, e) {
              function i(t, e) {
                I("onunpipe"),
                  t === d &&
                    e &&
                    !1 === e.hasUnpiped &&
                    ((e.hasUnpiped = !0), s());
              }
              function n() {
                I("onend"), t.end();
              }
              function s() {
                I("cleanup"),
                  t.removeListener("close", h),
                  t.removeListener("finish", u),
                  t.removeListener("drain", m),
                  t.removeListener("error", f),
                  t.removeListener("unpipe", i),
                  d.removeListener("end", n),
                  d.removeListener("end", c),
                  d.removeListener("data", a),
                  (y = !0),
                  !l.awaitDrain ||
                    (t._writableState && !t._writableState.needDrain) ||
                    m();
              }
              function a(e) {
                I("ondata");
                var r = t.write(e);
                I("dest.write", r),
                  !1 === r &&
                    (((1 === l.pipesCount && l.pipes === t) ||
                      (l.pipesCount > 1 && -1 !== B(l.pipes, t))) &&
                      !y &&
                      (I("false write response, pause", l.awaitDrain),
                      l.awaitDrain++),
                    d.pause());
              }
              function f(e) {
                I("onerror", e),
                  c(),
                  t.removeListener("error", f),
                  0 === j(t, "error") && X(t, e);
              }
              function h() {
                t.removeListener("finish", u), c();
              }
              function u() {
                I("onfinish"), t.removeListener("close", h), c();
              }
              function c() {
                I("unpipe"), d.unpipe(t);
              }
              var d = this,
                l = this._readableState;
              switch (l.pipesCount) {
                case 0:
                  l.pipes = t;
                  break;
                case 1:
                  l.pipes = [l.pipes, t];
                  break;
                default:
                  l.pipes.push(t);
              }
              (l.pipesCount += 1), I("pipe count=%d opts=%j", l.pipesCount, e);
              var p = (!e || !1 !== e.end) && t !== r.stdout && t !== r.stderr,
                b = p ? n : c;
              l.endEmitted ? r.nextTick(b) : d.once("end", b),
                t.on("unpipe", i);
              var m = v(d);
              t.on("drain", m);
              var y = !1;
              return (
                d.on("data", a),
                o(t, "error", f),
                t.once("close", h),
                t.once("finish", u),
                t.emit("pipe", d),
                l.flowing || (I("pipe resume"), d.resume()),
                t
              );
            }),
            (f.prototype.unpipe = function (t) {
              var e = this._readableState,
                r = { hasUnpiped: !1 };
              if (0 === e.pipesCount) return this;
              if (1 === e.pipesCount)
                return t && t !== e.pipes
                  ? this
                  : (t || (t = e.pipes),
                    (e.pipes = null),
                    (e.pipesCount = 0),
                    (e.flowing = !1),
                    t && t.emit("unpipe", this, r),
                    this);
              if (!t) {
                var i = e.pipes,
                  n = e.pipesCount;
                (e.pipes = null), (e.pipesCount = 0), (e.flowing = !1);
                for (var s = 0; s < n; s++)
                  i[s].emit("unpipe", this, { hasUnpiped: !1 });
                return this;
              }
              var o = B(e.pipes, t);
              return -1 === o
                ? this
                : (e.pipes.splice(o, 1),
                  (e.pipesCount -= 1),
                  1 === e.pipesCount && (e.pipes = e.pipes[0]),
                  t.emit("unpipe", this, r),
                  this);
            }),
            (f.prototype.on = function (t, e) {
              var i = T.prototype.on.call(this, t, e),
                n = this._readableState;
              return (
                "data" === t
                  ? ((n.readableListening = this.listenerCount("readable") > 0),
                    !1 !== n.flowing && this.resume())
                  : "readable" === t &&
                    (n.endEmitted ||
                      n.readableListening ||
                      ((n.readableListening = n.needReadable = !0),
                      (n.flowing = !1),
                      (n.emittedReadable = !1),
                      I("on readable", n.length, n.reading),
                      n.length ? b(this) : n.reading || r.nextTick(_, this))),
                i
              );
            }),
            (f.prototype.addListener = f.prototype.on),
            (f.prototype.removeListener = function (t, e) {
              var i = T.prototype.removeListener.call(this, t, e);
              return "readable" === t && r.nextTick(w, this), i;
            }),
            (f.prototype.removeAllListeners = function (t) {
              var e = T.prototype.removeAllListeners.apply(this, arguments);
              return (
                ("readable" !== t && void 0 !== t) || r.nextTick(w, this), e
              );
            }),
            (f.prototype.resume = function () {
              var t = this._readableState;
              return (
                t.flowing ||
                  (I("resume"), (t.flowing = !t.readableListening), M(this, t)),
                (t.paused = !1),
                this
              );
            }),
            (f.prototype.pause = function () {
              return (
                I("call pause flowing=%j", this._readableState.flowing),
                !1 !== this._readableState.flowing &&
                  (I("pause"),
                  (this._readableState.flowing = !1),
                  this.emit("pause")),
                (this._readableState.paused = !0),
                this
              );
            }),
            (f.prototype.wrap = function (t) {
              var e = this,
                r = this._readableState,
                i = !1;
              for (var n in (t.on("end", function () {
                if ((I("wrapped end"), r.decoder && !r.ended)) {
                  var t = r.decoder.end();
                  t && t.length && e.push(t);
                }
                e.push(null);
              }),
              t.on("data", function (n) {
                if (
                  (I("wrapped data"),
                  r.decoder && (n = r.decoder.write(n)),
                  (!r.objectMode || null != n) &&
                    (r.objectMode || (n && n.length)))
                ) {
                  var s = e.push(n);
                  s || ((i = !0), t.pause());
                }
              }),
              t))
                void 0 === this[n] &&
                  "function" == typeof t[n] &&
                  (this[n] = (function (e) {
                    return function () {
                      return t[e].apply(t, arguments);
                    };
                  })(n));
              for (var s = 0; s < G.length; s++)
                t.on(G[s], this.emit.bind(this, G[s]));
              return (
                (this._read = function (e) {
                  I("wrapped _read", e), i && ((i = !1), t.resume());
                }),
                this
              );
            }),
            "function" == typeof Symbol &&
              (f.prototype[Symbol.asyncIterator] = function () {
                return (
                  void 0 === D && (D = t("./internal/streams/async_iterator")),
                  D(this)
                );
              }),
            Object.defineProperty(f.prototype, "readableHighWaterMark", {
              enumerable: !1,
              get: function () {
                return this._readableState.highWaterMark;
              },
            }),
            Object.defineProperty(f.prototype, "readableBuffer", {
              enumerable: !1,
              get: function () {
                return this._readableState && this._readableState.buffer;
              },
            }),
            Object.defineProperty(f.prototype, "readableFlowing", {
              enumerable: !1,
              get: function () {
                return this._readableState.flowing;
              },
              set: function (t) {
                this._readableState && (this._readableState.flowing = t);
              },
            }),
            (f._fromList = k),
            Object.defineProperty(f.prototype, "readableLength", {
              enumerable: !1,
              get: function () {
                return this._readableState.length;
              },
            }),
            "function" == typeof Symbol &&
              (f.from = function (e, r) {
                return (
                  void 0 === N && (N = t("./internal/streams/from")), N(f, e, r)
                );
              });
        }).call(this);
      }).call(
        this,
        t("_process"),
        "undefined" != typeof global
          ? global
          : "undefined" != typeof self
          ? self
          : "undefined" != typeof window
          ? window
          : {}
      );
    },
    {
      "../errors": 47,
      "./_stream_duplex": 48,
      "./internal/streams/async_iterator": 53,
      "./internal/streams/buffer_list": 54,
      "./internal/streams/destroy": 55,
      "./internal/streams/from": 57,
      "./internal/streams/state": 59,
      "./internal/streams/stream": 60,
      _process: 149,
      buffer: 63,
      events: 100,
      inherits: 132,
      "string_decoder/": 185,
      util: 19,
    },
  ],
  51: [
    function (t, e, r) {
      "use strict";
      function i(t, e) {
        var r = this._transformState;
        r.transforming = !1;
        var i = r.writecb;
        if (null === i) return this.emit("error", new h());
        (r.writechunk = null),
          (r.writecb = null),
          null != e && this.push(e),
          i(t);
        var n = this._readableState;
        (n.reading = !1),
          (n.needReadable || n.length < n.highWaterMark) &&
            this._read(n.highWaterMark);
      }
      function n(t) {
        if (!(this instanceof n)) return new n(t);
        d.call(this, t),
          (this._transformState = {
            afterTransform: i.bind(this),
            needTransform: !1,
            transforming: !1,
            writecb: null,
            writechunk: null,
            writeencoding: null,
          }),
          (this._readableState.needReadable = !0),
          (this._readableState.sync = !1),
          t &&
            ("function" == typeof t.transform &&
              (this._transform = t.transform),
            "function" == typeof t.flush && (this._flush = t.flush)),
          this.on("prefinish", s);
      }
      function s() {
        var t = this;
        "function" != typeof this._flush || this._readableState.destroyed
          ? o(this, null, null)
          : this._flush(function (e, r) {
              o(t, e, r);
            });
      }
      function o(t, e, r) {
        if (e) return t.emit("error", e);
        if ((null != r && t.push(r), t._writableState.length)) throw new c();
        if (t._transformState.transforming) throw new u();
        return t.push(null);
      }
      e.exports = n;
      var a = t("../errors").codes,
        f = a.ERR_METHOD_NOT_IMPLEMENTED,
        h = a.ERR_MULTIPLE_CALLBACK,
        u = a.ERR_TRANSFORM_ALREADY_TRANSFORMING,
        c = a.ERR_TRANSFORM_WITH_LENGTH_0,
        d = t("./_stream_duplex");
      t("inherits")(n, d),
        (n.prototype.push = function (t, e) {
          return (
            (this._transformState.needTransform = !1),
            d.prototype.push.call(this, t, e)
          );
        }),
        (n.prototype._transform = function (t, e, r) {
          r(new f("_transform()"));
        }),
        (n.prototype._write = function (t, e, r) {
          var i = this._transformState;
          if (
            ((i.writecb = r),
            (i.writechunk = t),
            (i.writeencoding = e),
            !i.transforming)
          ) {
            var n = this._readableState;
            (i.needTransform || n.needReadable || n.length < n.highWaterMark) &&
              this._read(n.highWaterMark);
          }
        }),
        (n.prototype._read = function (t) {
          var e = this._transformState;
          null === e.writechunk || e.transforming
            ? (e.needTransform = !0)
            : ((e.transforming = !0),
              this._transform(e.writechunk, e.writeencoding, e.afterTransform));
        }),
        (n.prototype._destroy = function (t, e) {
          d.prototype._destroy.call(this, t, function (t) {
            e(t);
          });
        });
    },
    { "../errors": 47, "./_stream_duplex": 48, inherits: 132 },
  ],
  52: [
    function (t, e, r) {
      (function (r, i) {
        (function () {
          "use strict";
          function n(t) {
            var e = this;
            (this.next = null),
              (this.entry = null),
              (this.finish = function () {
                A(e, t);
              });
          }
          function s(t) {
            return j.from(t);
          }
          function o(t) {
            return j.isBuffer(t) || t instanceof T;
          }
          function a() {}
          function f(e, r, i) {
            (x = x || t("./_stream_duplex")),
              (e = e || {}),
              "boolean" != typeof i && (i = r instanceof x),
              (this.objectMode = !!e.objectMode),
              i &&
                (this.objectMode = this.objectMode || !!e.writableObjectMode),
              (this.highWaterMark = L(this, e, "writableHighWaterMark", i)),
              (this.finalCalled = !1),
              (this.needDrain = !1),
              (this.ending = !1),
              (this.ended = !1),
              (this.finished = !1),
              (this.destroyed = !1);
            var s = !1 === e.decodeStrings;
            (this.decodeStrings = !s),
              (this.defaultEncoding = e.defaultEncoding || "utf8"),
              (this.length = 0),
              (this.writing = !1),
              (this.corked = 0),
              (this.sync = !0),
              (this.bufferProcessing = !1),
              (this.onwrite = function (t) {
                y(r, t);
              }),
              (this.writecb = null),
              (this.writelen = 0),
              (this.bufferedRequest = null),
              (this.lastBufferedRequest = null),
              (this.pendingcb = 0),
              (this.prefinished = !1),
              (this.errorEmitted = !1),
              (this.emitClose = !1 !== e.emitClose),
              (this.autoDestroy = !!e.autoDestroy),
              (this.bufferedRequestCount = 0),
              (this.corkedRequestsFree = new n(this));
          }
          function h(e) {
            x = x || t("./_stream_duplex");
            var r = this instanceof x;
            if (!r && !B.call(h, this)) return new h(e);
            (this._writableState = new f(e, this, r)),
              (this.writable = !0),
              e &&
                ("function" == typeof e.write && (this._write = e.write),
                "function" == typeof e.writev && (this._writev = e.writev),
                "function" == typeof e.destroy && (this._destroy = e.destroy),
                "function" == typeof e.final && (this._final = e.final)),
              I.call(this);
          }
          function u(t, e) {
            var i = new F();
            W(t, i), r.nextTick(e, i);
          }
          function c(t, e, i, n) {
            var s;
            return (
              null === i
                ? (s = new K())
                : "string" == typeof i ||
                  e.objectMode ||
                  (s = new D("chunk", ["string", "Buffer"], i)),
              !s || (W(t, s), r.nextTick(n, s), !1)
            );
          }
          function d(t, e, r) {
            return (
              t.objectMode ||
                !1 === t.decodeStrings ||
                "string" != typeof e ||
                (e = j.from(e, r)),
              e
            );
          }
          function l(t, e, r, i, n, s) {
            if (!r) {
              var o = d(e, i, n);
              i !== o && ((r = !0), (n = "buffer"), (i = o));
            }
            var a = e.objectMode ? 1 : i.length;
            e.length += a;
            var f = e.length < e.highWaterMark;
            if ((f || (e.needDrain = !0), e.writing || e.corked)) {
              var h = e.lastBufferedRequest;
              (e.lastBufferedRequest = {
                chunk: i,
                encoding: n,
                isBuf: r,
                callback: s,
                next: null,
              }),
                h
                  ? (h.next = e.lastBufferedRequest)
                  : (e.bufferedRequest = e.lastBufferedRequest),
                (e.bufferedRequestCount += 1);
            } else p(t, e, !1, a, i, n, s);
            return f;
          }
          function p(t, e, r, i, n, s, o) {
            (e.writelen = i),
              (e.writecb = o),
              (e.writing = !0),
              (e.sync = !0),
              e.destroyed
                ? e.onwrite(new z("write"))
                : r
                ? t._writev(n, e.onwrite)
                : t._write(n, s, e.onwrite),
              (e.sync = !1);
          }
          function b(t, e, i, n, s) {
            --e.pendingcb,
              i
                ? (r.nextTick(s, n),
                  r.nextTick(E, t, e),
                  (t._writableState.errorEmitted = !0),
                  W(t, n))
                : (s(n),
                  (t._writableState.errorEmitted = !0),
                  W(t, n),
                  E(t, e));
          }
          function m(t) {
            (t.writing = !1),
              (t.writecb = null),
              (t.length -= t.writelen),
              (t.writelen = 0);
          }
          function y(t, e) {
            var i = t._writableState,
              n = i.sync,
              s = i.writecb;
            if ("function" != typeof s) throw new q();
            if ((m(i), e)) b(t, i, n, e, s);
            else {
              var o = _(i) || t.destroyed;
              o ||
                i.corked ||
                i.bufferProcessing ||
                !i.bufferedRequest ||
                w(t, i),
                n ? r.nextTick(g, t, i, o, s) : g(t, i, o, s);
            }
          }
          function g(t, e, r, i) {
            r || v(t, e), e.pendingcb--, i(), E(t, e);
          }
          function v(t, e) {
            0 === e.length &&
              e.needDrain &&
              ((e.needDrain = !1), t.emit("drain"));
          }
          function w(t, e) {
            e.bufferProcessing = !0;
            var r = e.bufferedRequest;
            if (t._writev && r && r.next) {
              var i = e.bufferedRequestCount,
                s = new Array(i),
                o = e.corkedRequestsFree;
              o.entry = r;
              for (var a = 0, f = !0; r; )
                (s[a] = r), r.isBuf || (f = !1), (r = r.next), (a += 1);
              (s.allBuffers = f),
                p(t, e, !0, e.length, s, "", o.finish),
                e.pendingcb++,
                (e.lastBufferedRequest = null),
                o.next
                  ? ((e.corkedRequestsFree = o.next), (o.next = null))
                  : (e.corkedRequestsFree = new n(e)),
                (e.bufferedRequestCount = 0);
            } else {
              for (; r; ) {
                var h = r.chunk,
                  u = r.encoding,
                  c = r.callback,
                  d = e.objectMode ? 1 : h.length;
                if (
                  (p(t, e, !1, d, h, u, c),
                  (r = r.next),
                  e.bufferedRequestCount--,
                  e.writing)
                )
                  break;
              }
              null === r && (e.lastBufferedRequest = null);
            }
            (e.bufferedRequest = r), (e.bufferProcessing = !1);
          }
          function _(t) {
            return (
              t.ending &&
              0 === t.length &&
              null === t.bufferedRequest &&
              !t.finished &&
              !t.writing
            );
          }
          function M(t, e) {
            t._final(function (r) {
              e.pendingcb--,
                r && W(t, r),
                (e.prefinished = !0),
                t.emit("prefinish"),
                E(t, e);
            });
          }
          function S(t, e) {
            e.prefinished ||
              e.finalCalled ||
              ("function" != typeof t._final || e.destroyed
                ? ((e.prefinished = !0), t.emit("prefinish"))
                : (e.pendingcb++, (e.finalCalled = !0), r.nextTick(M, t, e)));
          }
          function E(t, e) {
            var r = _(e);
            if (
              r &&
              (S(t, e),
              0 === e.pendingcb &&
                ((e.finished = !0), t.emit("finish"), e.autoDestroy))
            ) {
              var i = t._readableState;
              (!i || (i.autoDestroy && i.endEmitted)) && t.destroy();
            }
            return r;
          }
          function k(t, e, i) {
            (e.ending = !0),
              E(t, e),
              i && (e.finished ? r.nextTick(i) : t.once("finish", i)),
              (e.ended = !0),
              (t.writable = !1);
          }
          function A(t, e, r) {
            var i = t.entry;
            for (t.entry = null; i; ) {
              var n = i.callback;
              e.pendingcb--, n(r), (i = i.next);
            }
            e.corkedRequestsFree.next = t;
          }
          var x;
          (e.exports = h), (h.WritableState = f);
          var B,
            R = { deprecate: t("util-deprecate") },
            I = t("./internal/streams/stream"),
            j = t("buffer").Buffer,
            T =
              (void 0 !== i
                ? i
                : "undefined" != typeof window
                ? window
                : "undefined" != typeof self
                ? self
                : {}
              ).Uint8Array || function () {},
            C = t("./internal/streams/destroy"),
            P = t("./internal/streams/state"),
            L = P.getHighWaterMark,
            O = t("../errors").codes,
            D = O.ERR_INVALID_ARG_TYPE,
            N = O.ERR_METHOD_NOT_IMPLEMENTED,
            q = O.ERR_MULTIPLE_CALLBACK,
            U = O.ERR_STREAM_CANNOT_PIPE,
            z = O.ERR_STREAM_DESTROYED,
            K = O.ERR_STREAM_NULL_VALUES,
            F = O.ERR_STREAM_WRITE_AFTER_END,
            H = O.ERR_UNKNOWN_ENCODING,
            W = C.errorOrDestroy;
          t("inherits")(h, I),
            (f.prototype.getBuffer = function () {
              for (var t = this.bufferedRequest, e = []; t; )
                e.push(t), (t = t.next);
              return e;
            }),
            (function () {
              try {
                Object.defineProperty(f.prototype, "buffer", {
                  get: R.deprecate(
                    function () {
                      return this.getBuffer();
                    },
                    "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.",
                    "DEP0003"
                  ),
                });
              } catch (t) {}
            })(),
            "function" == typeof Symbol &&
            Symbol.hasInstance &&
            "function" == typeof Function.prototype[Symbol.hasInstance]
              ? ((B = Function.prototype[Symbol.hasInstance]),
                Object.defineProperty(h, Symbol.hasInstance, {
                  value: function (t) {
                    return (
                      !!B.call(this, t) ||
                      (this === h && t && t._writableState instanceof f)
                    );
                  },
                }))
              : (B = function (t) {
                  return t instanceof this;
                }),
            (h.prototype.pipe = function () {
              W(this, new U());
            }),
            (h.prototype.write = function (t, e, r) {
              var i = this._writableState,
                n = !1,
                f = !i.objectMode && o(t);
              return (
                f && !j.isBuffer(t) && (t = s(t)),
                "function" == typeof e && ((r = e), (e = null)),
                f ? (e = "buffer") : e || (e = i.defaultEncoding),
                "function" != typeof r && (r = a),
                i.ending
                  ? u(this, r)
                  : (f || c(this, i, t, r)) &&
                    (i.pendingcb++, (n = l(this, i, f, t, e, r))),
                n
              );
            }),
            (h.prototype.cork = function () {
              this._writableState.corked++;
            }),
            (h.prototype.uncork = function () {
              var t = this._writableState;
              t.corked &&
                (t.corked--,
                t.writing ||
                  t.corked ||
                  t.bufferProcessing ||
                  !t.bufferedRequest ||
                  w(this, t));
            }),
            (h.prototype.setDefaultEncoding = function (t) {
              if (
                ("string" == typeof t && (t = t.toLowerCase()),
                !(
                  [
                    "hex",
                    "utf8",
                    "utf-8",
                    "ascii",
                    "binary",
                    "base64",
                    "ucs2",
                    "ucs-2",
                    "utf16le",
                    "utf-16le",
                    "raw",
                  ].indexOf((t + "").toLowerCase()) > -1
                ))
              )
                throw new H(t);
              return (this._writableState.defaultEncoding = t), this;
            }),
            Object.defineProperty(h.prototype, "writableBuffer", {
              enumerable: !1,
              get: function () {
                return this._writableState && this._writableState.getBuffer();
              },
            }),
            Object.defineProperty(h.prototype, "writableHighWaterMark", {
              enumerable: !1,
              get: function () {
                return this._writableState.highWaterMark;
              },
            }),
            (h.prototype._write = function (t, e, r) {
              r(new N("_write()"));
            }),
            (h.prototype._writev = null),
            (h.prototype.end = function (t, e, r) {
              var i = this._writableState;
              return (
                "function" == typeof t
                  ? ((r = t), (t = null), (e = null))
                  : "function" == typeof e && ((r = e), (e = null)),
                null != t && this.write(t, e),
                i.corked && ((i.corked = 1), this.uncork()),
                i.ending || k(this, i, r),
                this
              );
            }),
            Object.defineProperty(h.prototype, "writableLength", {
              enumerable: !1,
              get: function () {
                return this._writableState.length;
              },
            }),
            Object.defineProperty(h.prototype, "destroyed", {
              enumerable: !1,
              get: function () {
                return (
                  void 0 !== this._writableState &&
                  this._writableState.destroyed
                );
              },
              set: function (t) {
                this._writableState && (this._writableState.destroyed = t);
              },
            }),
            (h.prototype.destroy = C.destroy),
            (h.prototype._undestroy = C.undestroy),
            (h.prototype._destroy = function (t, e) {
              e(t);
            });
        }).call(this);
      }).call(
        this,
        t("_process"),
        "undefined" != typeof global
          ? global
          : "undefined" != typeof self
          ? self
          : "undefined" != typeof window
          ? window
          : {}
      );
    },
    {
      "../errors": 47,
      "./_stream_duplex": 48,
      "./internal/streams/destroy": 55,
      "./internal/streams/state": 59,
      "./internal/streams/stream": 60,
      _process: 149,
      buffer: 63,
      inherits: 132,
      "util-deprecate": 186,
    },
  ],
  53: [
    function (t, e, r) {
      (function (r) {
        (function () {
          "use strict";
          function i(t, e, r) {
            return (
              (e = n(e)),
              e in t
                ? Object.defineProperty(t, e, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (t[e] = r),
              t
            );
          }
          function n(t) {
            var e = s(t, "string");
            return "symbol" == typeof e ? e : String(e);
          }
          function s(t, e) {
            if ("object" != typeof t || null === t) return t;
            var r = t[Symbol.toPrimitive];
            if (void 0 !== r) {
              var i = r.call(t, e || "default");
              if ("object" != typeof i) return i;
              throw new TypeError(
                "@@toPrimitive must return a primitive value."
              );
            }
            return ("string" === e ? String : Number)(t);
          }
          function o(t, e) {
            return { value: t, done: e };
          }
          function a(t) {
            var e = t[d];
            if (null !== e) {
              var r = t[g].read();
              null !== r &&
                ((t[m] = null), (t[d] = null), (t[l] = null), e(o(r, !1)));
            }
          }
          function f(t) {
            r.nextTick(a, t);
          }
          function h(t, e) {
            return function (r, i) {
              t.then(function () {
                e[b] ? r(o(void 0, !0)) : e[y](r, i);
              }, i);
            };
          }
          var u,
            c = t("./end-of-stream"),
            d = Symbol("lastResolve"),
            l = Symbol("lastReject"),
            p = Symbol("error"),
            b = Symbol("ended"),
            m = Symbol("lastPromise"),
            y = Symbol("handlePromise"),
            g = Symbol("stream"),
            v = Object.getPrototypeOf(function () {}),
            w = Object.setPrototypeOf(
              ((u = {
                get stream() {
                  return this[g];
                },
                next: function () {
                  var t = this,
                    e = this[p];
                  if (null !== e) return Promise.reject(e);
                  if (this[b]) return Promise.resolve(o(void 0, !0));
                  if (this[g].destroyed)
                    return new Promise(function (e, i) {
                      r.nextTick(function () {
                        t[p] ? i(t[p]) : e(o(void 0, !0));
                      });
                    });
                  var i,
                    n = this[m];
                  if (n) i = new Promise(h(n, this));
                  else {
                    var s = this[g].read();
                    if (null !== s) return Promise.resolve(o(s, !1));
                    i = new Promise(this[y]);
                  }
                  return (this[m] = i), i;
                },
              }),
              i(u, Symbol.asyncIterator, function () {
                return this;
              }),
              i(u, "return", function () {
                var t = this;
                return new Promise(function (e, r) {
                  t[g].destroy(null, function (t) {
                    t ? r(t) : e(o(void 0, !0));
                  });
                });
              }),
              u),
              v
            ),
            _ = function (t) {
              var e,
                r = Object.create(
                  w,
                  ((e = {}),
                  i(e, g, { value: t, writable: !0 }),
                  i(e, d, { value: null, writable: !0 }),
                  i(e, l, { value: null, writable: !0 }),
                  i(e, p, { value: null, writable: !0 }),
                  i(e, b, { value: t._readableState.endEmitted, writable: !0 }),
                  i(e, y, {
                    value: function (t, e) {
                      var i = r[g].read();
                      i
                        ? ((r[m] = null),
                          (r[d] = null),
                          (r[l] = null),
                          t(o(i, !1)))
                        : ((r[d] = t), (r[l] = e));
                    },
                    writable: !0,
                  }),
                  e)
                );
              return (
                (r[m] = null),
                c(t, function (t) {
                  if (t && "ERR_STREAM_PREMATURE_CLOSE" !== t.code) {
                    var e = r[l];
                    return (
                      null !== e &&
                        ((r[m] = null), (r[d] = null), (r[l] = null), e(t)),
                      void (r[p] = t)
                    );
                  }
                  var i = r[d];
                  null !== i &&
                    ((r[m] = null),
                    (r[d] = null),
                    (r[l] = null),
                    i(o(void 0, !0))),
                    (r[b] = !0);
                }),
                t.on("readable", f.bind(null, r)),
                r
              );
            };
          e.exports = _;
        }).call(this);
      }).call(this, t("_process"));
    },
    { "./end-of-stream": 56, _process: 149 },
  ],
  54: [
    function (t, e, r) {
      "use strict";
      function i(t, e) {
        var r = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var i = Object.getOwnPropertySymbols(t);
          e &&
            (i = i.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            })),
            r.push.apply(r, i);
        }
        return r;
      }
      function n(t) {
        for (var e = 1; e < arguments.length; e++) {
          var r = null != arguments[e] ? arguments[e] : {};
          e % 2
            ? i(Object(r), !0).forEach(function (e) {
                s(t, e, r[e]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r))
            : i(Object(r)).forEach(function (e) {
                Object.defineProperty(
                  t,
                  e,
                  Object.getOwnPropertyDescriptor(r, e)
                );
              });
        }
        return t;
      }
      function s(t, e, r) {
        return (
          (e = h(e)),
          e in t
            ? Object.defineProperty(t, e, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = r),
          t
        );
      }
      function o(t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function");
      }
      function a(t, e) {
        for (var r = 0; r < e.length; r++) {
          var i = e[r];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            "value" in i && (i.writable = !0),
            Object.defineProperty(t, h(i.key), i);
        }
      }
      function f(t, e, r) {
        return (
          e && a(t.prototype, e),
          r && a(t, r),
          Object.defineProperty(t, "prototype", { writable: !1 }),
          t
        );
      }
      function h(t) {
        var e = u(t, "string");
        return "symbol" == typeof e ? e : String(e);
      }
      function u(t, e) {
        if ("object" != typeof t || null === t) return t;
        var r = t[Symbol.toPrimitive];
        if (void 0 !== r) {
          var i = r.call(t, e || "default");
          if ("object" != typeof i) return i;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === e ? String : Number)(t);
      }
      function c(t, e, r) {
        l.prototype.copy.call(t, e, r);
      }
      var d = t("buffer"),
        l = d.Buffer,
        p = t("util"),
        b = p.inspect,
        m = (b && b.custom) || "inspect";
      e.exports = (function () {
        function t() {
          o(this, t), (this.head = null), (this.tail = null), (this.length = 0);
        }
        return (
          f(t, [
            {
              key: "push",
              value: function (t) {
                var e = { data: t, next: null };
                this.length > 0 ? (this.tail.next = e) : (this.head = e),
                  (this.tail = e),
                  ++this.length;
              },
            },
            {
              key: "unshift",
              value: function (t) {
                var e = { data: t, next: this.head };
                0 === this.length && (this.tail = e),
                  (this.head = e),
                  ++this.length;
              },
            },
            {
              key: "shift",
              value: function () {
                if (0 !== this.length) {
                  var t = this.head.data;
                  return (
                    1 === this.length
                      ? (this.head = this.tail = null)
                      : (this.head = this.head.next),
                    --this.length,
                    t
                  );
                }
              },
            },
            {
              key: "clear",
              value: function () {
                (this.head = this.tail = null), (this.length = 0);
              },
            },
            {
              key: "join",
              value: function (t) {
                if (0 === this.length) return "";
                for (var e = this.head, r = "" + e.data; (e = e.next); )
                  r += t + e.data;
                return r;
              },
            },
            {
              key: "concat",
              value: function (t) {
                if (0 === this.length) return l.alloc(0);
                for (var e = l.allocUnsafe(t >>> 0), r = this.head, i = 0; r; )
                  c(r.data, e, i), (i += r.data.length), (r = r.next);
                return e;
              },
            },
            {
              key: "consume",
              value: function (t, e) {
                var r;
                return (
                  t < this.head.data.length
                    ? ((r = this.head.data.slice(0, t)),
                      (this.head.data = this.head.data.slice(t)))
                    : (r =
                        t === this.head.data.length
                          ? this.shift()
                          : e
                          ? this._getString(t)
                          : this._getBuffer(t)),
                  r
                );
              },
            },
            {
              key: "first",
              value: function () {
                return this.head.data;
              },
            },
            {
              key: "_getString",
              value: function (t) {
                var e = this.head,
                  r = 1,
                  i = e.data;
                for (t -= i.length; (e = e.next); ) {
                  var n = e.data,
                    s = t > n.length ? n.length : t;
                  if (
                    (s === n.length ? (i += n) : (i += n.slice(0, t)),
                    (t -= s),
                    0 === t)
                  ) {
                    s === n.length
                      ? (++r,
                        e.next
                          ? (this.head = e.next)
                          : (this.head = this.tail = null))
                      : ((this.head = e), (e.data = n.slice(s)));
                    break;
                  }
                  ++r;
                }
                return (this.length -= r), i;
              },
            },
            {
              key: "_getBuffer",
              value: function (t) {
                var e = l.allocUnsafe(t),
                  r = this.head,
                  i = 1;
                for (r.data.copy(e), t -= r.data.length; (r = r.next); ) {
                  var n = r.data,
                    s = t > n.length ? n.length : t;
                  if ((n.copy(e, e.length - t, 0, s), (t -= s), 0 === t)) {
                    s === n.length
                      ? (++i,
                        r.next
                          ? (this.head = r.next)
                          : (this.head = this.tail = null))
                      : ((this.head = r), (r.data = n.slice(s)));
                    break;
                  }
                  ++i;
                }
                return (this.length -= i), e;
              },
            },
            {
              key: m,
              value: function (t, e) {
                return b(
                  this,
                  n(n({}, e), {}, { depth: 0, customInspect: !1 })
                );
              },
            },
          ]),
          t
        );
      })();
    },
    { buffer: 63, util: 19 },
  ],
  55: [
    function (t, e, r) {
      (function (t) {
        (function () {
          "use strict";
          function r(e, r) {
            var s = this,
              a = this._readableState && this._readableState.destroyed,
              f = this._writableState && this._writableState.destroyed;
            return a || f
              ? (r
                  ? r(e)
                  : e &&
                    (this._writableState
                      ? this._writableState.errorEmitted ||
                        ((this._writableState.errorEmitted = !0),
                        t.nextTick(o, this, e))
                      : t.nextTick(o, this, e)),
                this)
              : (this._readableState && (this._readableState.destroyed = !0),
                this._writableState && (this._writableState.destroyed = !0),
                this._destroy(e || null, function (e) {
                  !r && e
                    ? s._writableState
                      ? s._writableState.errorEmitted
                        ? t.nextTick(n, s)
                        : ((s._writableState.errorEmitted = !0),
                          t.nextTick(i, s, e))
                      : t.nextTick(i, s, e)
                    : r
                    ? (t.nextTick(n, s), r(e))
                    : t.nextTick(n, s);
                }),
                this);
          }
          function i(t, e) {
            o(t, e), n(t);
          }
          function n(t) {
            (t._writableState && !t._writableState.emitClose) ||
              (t._readableState && !t._readableState.emitClose) ||
              t.emit("close");
          }
          function s() {
            this._readableState &&
              ((this._readableState.destroyed = !1),
              (this._readableState.reading = !1),
              (this._readableState.ended = !1),
              (this._readableState.endEmitted = !1)),
              this._writableState &&
                ((this._writableState.destroyed = !1),
                (this._writableState.ended = !1),
                (this._writableState.ending = !1),
                (this._writableState.finalCalled = !1),
                (this._writableState.prefinished = !1),
                (this._writableState.finished = !1),
                (this._writableState.errorEmitted = !1));
          }
          function o(t, e) {
            t.emit("error", e);
          }
          function a(t, e) {
            var r = t._readableState,
              i = t._writableState;
            (r && r.autoDestroy) || (i && i.autoDestroy)
              ? t.destroy(e)
              : t.emit("error", e);
          }
          e.exports = { destroy: r, undestroy: s, errorOrDestroy: a };
        }).call(this);
      }).call(this, t("_process"));
    },
    { _process: 149 },
  ],
  56: [
    function (t, e, r) {
      "use strict";
      function i(t) {
        var e = !1;
        return function () {
          if (!e) {
            e = !0;
            for (var r = arguments.length, i = new Array(r), n = 0; n < r; n++)
              i[n] = arguments[n];
            t.apply(this, i);
          }
        };
      }
      function n() {}
      function s(t) {
        return t.setHeader && "function" == typeof t.abort;
      }
      function o(t, e, r) {
        if ("function" == typeof e) return o(t, null, e);
        e || (e = {}), (r = i(r || n));
        var f = e.readable || (!1 !== e.readable && t.readable),
          h = e.writable || (!1 !== e.writable && t.writable),
          u = function () {
            t.writable || d();
          },
          c = t._writableState && t._writableState.finished,
          d = function () {
            (h = !1), (c = !0), f || r.call(t);
          },
          l = t._readableState && t._readableState.endEmitted,
          p = function () {
            (f = !1), (l = !0), h || r.call(t);
          },
          b = function (e) {
            r.call(t, e);
          },
          m = function () {
            var e;
            return f && !l
              ? ((t._readableState && t._readableState.ended) || (e = new a()),
                r.call(t, e))
              : h && !c
              ? ((t._writableState && t._writableState.ended) || (e = new a()),
                r.call(t, e))
              : void 0;
          },
          y = function () {
            t.req.on("finish", d);
          };
        return (
          s(t)
            ? (t.on("complete", d),
              t.on("abort", m),
              t.req ? y() : t.on("request", y))
            : h && !t._writableState && (t.on("end", u), t.on("close", u)),
          t.on("end", p),
          t.on("finish", d),
          !1 !== e.error && t.on("error", b),
          t.on("close", m),
          function () {
            t.removeListener("complete", d),
              t.removeListener("abort", m),
              t.removeListener("request", y),
              t.req && t.req.removeListener("finish", d),
              t.removeListener("end", u),
              t.removeListener("close", u),
              t.removeListener("finish", d),
              t.removeListener("end", p),
              t.removeListener("error", b),
              t.removeListener("close", m);
          }
        );
      }
      var a = t("../../../errors").codes.ERR_STREAM_PREMATURE_CLOSE;
      e.exports = o;
    },
    { "../../../errors": 47 },
  ],
  57: [
    function (t, e, r) {
      e.exports = function () {
        throw new Error("Readable.from is not available in the browser");
      };
    },
    {},
  ],
  58: [
    function (t, e, r) {
      "use strict";
      function i(t) {
        var e = !1;
        return function () {
          e || ((e = !0), t.apply(void 0, arguments));
        };
      }
      function n(t) {
        if (t) throw t;
      }
      function s(t) {
        return t.setHeader && "function" == typeof t.abort;
      }
      function o(e, r, n, o) {
        o = i(o);
        var a = !1;
        e.on("close", function () {
          a = !0;
        }),
          void 0 === c && (c = t("./end-of-stream")),
          c(e, { readable: r, writable: n }, function (t) {
            if (t) return o(t);
            (a = !0), o();
          });
        var f = !1;
        return function (t) {
          if (!a && !f)
            return (
              (f = !0),
              s(e)
                ? e.abort()
                : "function" == typeof e.destroy
                ? e.destroy()
                : void o(t || new p("pipe"))
            );
        };
      }
      function a(t) {
        t();
      }
      function f(t, e) {
        return t.pipe(e);
      }
      function h(t) {
        return t.length
          ? "function" != typeof t[t.length - 1]
            ? n
            : t.pop()
          : n;
      }
      function u() {
        for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
          e[r] = arguments[r];
        var i,
          n = h(e);
        if ((Array.isArray(e[0]) && (e = e[0]), e.length < 2))
          throw new l("streams");
        var s = e.map(function (t, r) {
          var f = r < e.length - 1,
            h = r > 0;
          return o(t, f, h, function (t) {
            i || (i = t), t && s.forEach(a), f || (s.forEach(a), n(i));
          });
        });
        return e.reduce(f);
      }
      var c,
        d = t("../../../errors").codes,
        l = d.ERR_MISSING_ARGS,
        p = d.ERR_STREAM_DESTROYED;
      e.exports = u;
    },
    { "../../../errors": 47, "./end-of-stream": 56 },
  ],
  59: [
    function (t, e, r) {
      "use strict";
      function i(t, e, r) {
        return null != t.highWaterMark ? t.highWaterMark : e ? t[r] : null;
      }
      function n(t, e, r, n) {
        var o = i(e, n, r);
        if (null != o) {
          if (!isFinite(o) || Math.floor(o) !== o || o < 0) {
            var a = n ? r : "highWaterMark";
            throw new s(a, o);
          }
          return Math.floor(o);
        }
        return t.objectMode ? 16 : 16384;
      }
      var s = t("../../../errors").codes.ERR_INVALID_OPT_VALUE;
      e.exports = { getHighWaterMark: n };
    },
    { "../../../errors": 47 },
  ],
  60: [
    function (t, e, r) {
      e.exports = t("events").EventEmitter;
    },
    { events: 100 },
  ],
  61: [
    function (t, e, r) {
      (r = e.exports = t("./lib/_stream_readable.js")),
        (r.Stream = r),
        (r.Readable = r),
        (r.Writable = t("./lib/_stream_writable.js")),
        (r.Duplex = t("./lib/_stream_duplex.js")),
        (r.Transform = t("./lib/_stream_transform.js")),
        (r.PassThrough = t("./lib/_stream_passthrough.js")),
        (r.finished = t("./lib/internal/streams/end-of-stream.js")),
        (r.pipeline = t("./lib/internal/streams/pipeline.js"));
    },
    {
      "./lib/_stream_duplex.js": 48,
      "./lib/_stream_passthrough.js": 49,
      "./lib/_stream_readable.js": 50,
      "./lib/_stream_transform.js": 51,
      "./lib/_stream_writable.js": 52,
      "./lib/internal/streams/end-of-stream.js": 56,
      "./lib/internal/streams/pipeline.js": 58,
    },
  ],
  62: [
    function (t, e, r) {
      (function (t) {
        (function () {
          e.exports = function (e, r) {
            for (
              var i = Math.min(e.length, r.length), n = new t(i), s = 0;
              s < i;
              ++s
            )
              n[s] = e[s] ^ r[s];
            return n;
          };
        }).call(this);
      }).call(this, t("buffer").Buffer);
    },
    { buffer: 63 },
  ],
  63: [
    function (t, e, r) {
      (function (e) {
        (function () {
          "use strict";
          function e() {
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
          function i(t) {
            if (t > G)
              throw new RangeError(
                'The value "' + t + '" is invalid for option "size"'
              );
            var e = new Uint8Array(t);
            return (e.__proto__ = n.prototype), e;
          }
          function n(t, e, r) {
            if ("number" == typeof t) {
              if ("string" == typeof e)
                throw new TypeError(
                  'The "string" argument must be of type string. Received type number'
                );
              return f(t);
            }
            return s(t, e, r);
          }
          function s(t, e, r) {
            if ("string" == typeof t) return h(t, e);
            if (ArrayBuffer.isView(t)) return u(t);
            if (null == t)
              throw TypeError(
                "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
                  typeof t
              );
            if (W(t, ArrayBuffer) || (t && W(t.buffer, ArrayBuffer)))
              return c(t, e, r);
            if ("number" == typeof t)
              throw new TypeError(
                'The "value" argument must not be of type number. Received type number'
              );
            var i = t.valueOf && t.valueOf();
            if (null != i && i !== t) return n.from(i, e, r);
            var s = d(t);
            if (s) return s;
            if (
              "undefined" != typeof Symbol &&
              null != Symbol.toPrimitive &&
              "function" == typeof t[Symbol.toPrimitive]
            )
              return n.from(t[Symbol.toPrimitive]("string"), e, r);
            throw new TypeError(
              "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
                typeof t
            );
          }
          function o(t) {
            if ("number" != typeof t)
              throw new TypeError('"size" argument must be of type number');
            if (t < 0)
              throw new RangeError(
                'The value "' + t + '" is invalid for option "size"'
              );
          }
          function a(t, e, r) {
            return (
              o(t),
              t <= 0
                ? i(t)
                : void 0 !== e
                ? "string" == typeof r
                  ? i(t).fill(e, r)
                  : i(t).fill(e)
                : i(t)
            );
          }
          function f(t) {
            return o(t), i(t < 0 ? 0 : 0 | l(t));
          }
          function h(t, e) {
            if (
              (("string" == typeof e && "" !== e) || (e = "utf8"),
              !n.isEncoding(e))
            )
              throw new TypeError("Unknown encoding: " + e);
            var r = 0 | b(t, e),
              s = i(r),
              o = s.write(t, e);
            return o !== r && (s = s.slice(0, o)), s;
          }
          function u(t) {
            for (
              var e = t.length < 0 ? 0 : 0 | l(t.length), r = i(e), n = 0;
              n < e;
              n += 1
            )
              r[n] = 255 & t[n];
            return r;
          }
          function c(t, e, r) {
            if (e < 0 || t.byteLength < e)
              throw new RangeError('"offset" is outside of buffer bounds');
            if (t.byteLength < e + (r || 0))
              throw new RangeError('"length" is outside of buffer bounds');
            var i;
            return (
              (i =
                void 0 === e && void 0 === r
                  ? new Uint8Array(t)
                  : void 0 === r
                  ? new Uint8Array(t, e)
                  : new Uint8Array(t, e, r)),
              (i.__proto__ = n.prototype),
              i
            );
          }
          function d(t) {
            if (n.isBuffer(t)) {
              var e = 0 | l(t.length),
                r = i(e);
              return 0 === r.length ? r : (t.copy(r, 0, 0, e), r);
            }
            return void 0 !== t.length
              ? "number" != typeof t.length || V(t.length)
                ? i(0)
                : u(t)
              : "Buffer" === t.type && Array.isArray(t.data)
              ? u(t.data)
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
          function p(t) {
            return +t != t && (t = 0), n.alloc(+t);
          }
          function b(t, e) {
            if (n.isBuffer(t)) return t.length;
            if (ArrayBuffer.isView(t) || W(t, ArrayBuffer)) return t.byteLength;
            if ("string" != typeof t)
              throw new TypeError(
                'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
                  typeof t
              );
            var r = t.length,
              i = arguments.length > 2 && !0 === arguments[2];
            if (!i && 0 === r) return 0;
            for (var s = !1; ; )
              switch (e) {
                case "ascii":
                case "latin1":
                case "binary":
                  return r;
                case "utf8":
                case "utf-8":
                  return U(t).length;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return 2 * r;
                case "hex":
                  return r >>> 1;
                case "base64":
                  return F(t).length;
                default:
                  if (s) return i ? -1 : U(t).length;
                  (e = ("" + e).toLowerCase()), (s = !0);
              }
          }
          function m(t, e, r) {
            var i = !1;
            if (((void 0 === e || e < 0) && (e = 0), e > this.length))
              return "";
            if (
              ((void 0 === r || r > this.length) && (r = this.length), r <= 0)
            )
              return "";
            if (((r >>>= 0), (e >>>= 0), r <= e)) return "";
            for (t || (t = "utf8"); ; )
              switch (t) {
                case "hex":
                  return j(this, e, r);
                case "utf8":
                case "utf-8":
                  return x(this, e, r);
                case "ascii":
                  return R(this, e, r);
                case "latin1":
                case "binary":
                  return I(this, e, r);
                case "base64":
                  return A(this, e, r);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return T(this, e, r);
                default:
                  if (i) throw new TypeError("Unknown encoding: " + t);
                  (t = (t + "").toLowerCase()), (i = !0);
              }
          }
          function y(t, e, r) {
            var i = t[e];
            (t[e] = t[r]), (t[r] = i);
          }
          function g(t, e, r, i, s) {
            if (0 === t.length) return -1;
            if (
              ("string" == typeof r
                ? ((i = r), (r = 0))
                : r > 2147483647
                ? (r = 2147483647)
                : r < -2147483648 && (r = -2147483648),
              (r = +r),
              V(r) && (r = s ? 0 : t.length - 1),
              r < 0 && (r = t.length + r),
              r >= t.length)
            ) {
              if (s) return -1;
              r = t.length - 1;
            } else if (r < 0) {
              if (!s) return -1;
              r = 0;
            }
            if (("string" == typeof e && (e = n.from(e, i)), n.isBuffer(e)))
              return 0 === e.length ? -1 : v(t, e, r, i, s);
            if ("number" == typeof e)
              return (
                (e &= 255),
                "function" == typeof Uint8Array.prototype.indexOf
                  ? s
                    ? Uint8Array.prototype.indexOf.call(t, e, r)
                    : Uint8Array.prototype.lastIndexOf.call(t, e, r)
                  : v(t, [e], r, i, s)
              );
            throw new TypeError("val must be string, number or Buffer");
          }
          function v(t, e, r, i, n) {
            function s(t, e) {
              return 1 === a ? t[e] : t.readUInt16BE(e * a);
            }
            var o,
              a = 1,
              f = t.length,
              h = e.length;
            if (
              void 0 !== i &&
              ((i = String(i).toLowerCase()),
              "ucs2" === i ||
                "ucs-2" === i ||
                "utf16le" === i ||
                "utf-16le" === i)
            ) {
              if (t.length < 2 || e.length < 2) return -1;
              (a = 2), (f /= 2), (h /= 2), (r /= 2);
            }
            if (n) {
              var u = -1;
              for (o = r; o < f; o++)
                if (s(t, o) === s(e, -1 === u ? 0 : o - u)) {
                  if ((-1 === u && (u = o), o - u + 1 === h)) return u * a;
                } else -1 !== u && (o -= o - u), (u = -1);
            } else
              for (r + h > f && (r = f - h), o = r; o >= 0; o--) {
                for (var c = !0, d = 0; d < h; d++)
                  if (s(t, o + d) !== s(e, d)) {
                    c = !1;
                    break;
                  }
                if (c) return o;
              }
            return -1;
          }
          function w(t, e, r, i) {
            r = Number(r) || 0;
            var n = t.length - r;
            i ? ((i = Number(i)), i > n && (i = n)) : (i = n);
            var s = e.length;
            i > s / 2 && (i = s / 2);
            for (var o = 0; o < i; ++o) {
              var a = parseInt(e.substr(2 * o, 2), 16);
              if (V(a)) return o;
              t[r + o] = a;
            }
            return o;
          }
          function _(t, e, r, i) {
            return H(U(e, t.length - r), t, r, i);
          }
          function M(t, e, r, i) {
            return H(z(e), t, r, i);
          }
          function S(t, e, r, i) {
            return M(t, e, r, i);
          }
          function E(t, e, r, i) {
            return H(F(e), t, r, i);
          }
          function k(t, e, r, i) {
            return H(K(e, t.length - r), t, r, i);
          }
          function A(t, e, r) {
            return 0 === e && r === t.length
              ? Z.fromByteArray(t)
              : Z.fromByteArray(t.slice(e, r));
          }
          function x(t, e, r) {
            r = Math.min(t.length, r);
            for (var i = [], n = e; n < r; ) {
              var s,
                o,
                a,
                f,
                h = t[n],
                u = null,
                c = h > 239 ? 4 : h > 223 ? 3 : h > 191 ? 2 : 1;
              if (n + c <= r)
                switch (c) {
                  case 1:
                    h < 128 && (u = h);
                    break;
                  case 2:
                    (s = t[n + 1]),
                      128 == (192 & s) &&
                        ((f = ((31 & h) << 6) | (63 & s)), f > 127 && (u = f));
                    break;
                  case 3:
                    (s = t[n + 1]),
                      (o = t[n + 2]),
                      128 == (192 & s) &&
                        128 == (192 & o) &&
                        ((f = ((15 & h) << 12) | ((63 & s) << 6) | (63 & o)),
                        f > 2047 && (f < 55296 || f > 57343) && (u = f));
                    break;
                  case 4:
                    (s = t[n + 1]),
                      (o = t[n + 2]),
                      (a = t[n + 3]),
                      128 == (192 & s) &&
                        128 == (192 & o) &&
                        128 == (192 & a) &&
                        ((f =
                          ((15 & h) << 18) |
                          ((63 & s) << 12) |
                          ((63 & o) << 6) |
                          (63 & a)),
                        f > 65535 && f < 1114112 && (u = f));
                }
              null === u
                ? ((u = 65533), (c = 1))
                : u > 65535 &&
                  ((u -= 65536),
                  i.push(((u >>> 10) & 1023) | 55296),
                  (u = 56320 | (1023 & u))),
                i.push(u),
                (n += c);
            }
            return B(i);
          }
          function B(t) {
            var e = t.length;
            if (e <= Y) return String.fromCharCode.apply(String, t);
            for (var r = "", i = 0; i < e; )
              r += String.fromCharCode.apply(String, t.slice(i, (i += Y)));
            return r;
          }
          function R(t, e, r) {
            var i = "";
            r = Math.min(t.length, r);
            for (var n = e; n < r; ++n) i += String.fromCharCode(127 & t[n]);
            return i;
          }
          function I(t, e, r) {
            var i = "";
            r = Math.min(t.length, r);
            for (var n = e; n < r; ++n) i += String.fromCharCode(t[n]);
            return i;
          }
          function j(t, e, r) {
            var i = t.length;
            (!e || e < 0) && (e = 0), (!r || r < 0 || r > i) && (r = i);
            for (var n = "", s = e; s < r; ++s) n += q(t[s]);
            return n;
          }
          function T(t, e, r) {
            for (var i = t.slice(e, r), n = "", s = 0; s < i.length; s += 2)
              n += String.fromCharCode(i[s] + 256 * i[s + 1]);
            return n;
          }
          function C(t, e, r) {
            if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
            if (t + e > r)
              throw new RangeError("Trying to access beyond buffer length");
          }
          function P(t, e, r, i, s, o) {
            if (!n.isBuffer(t))
              throw new TypeError(
                '"buffer" argument must be a Buffer instance'
              );
            if (e > s || e < o)
              throw new RangeError('"value" argument is out of bounds');
            if (r + i > t.length) throw new RangeError("Index out of range");
          }
          function L(t, e, r, i, n, s) {
            if (r + i > t.length) throw new RangeError("Index out of range");
            if (r < 0) throw new RangeError("Index out of range");
          }
          function O(t, e, r, i, n) {
            return (
              (e = +e),
              (r >>>= 0),
              n || L(t, e, r, 4, 3.4028234663852886e38, -3.4028234663852886e38),
              X.write(t, e, r, i, 23, 4),
              r + 4
            );
          }
          function D(t, e, r, i, n) {
            return (
              (e = +e),
              (r >>>= 0),
              n ||
                L(t, e, r, 8, 1.7976931348623157e308, -1.7976931348623157e308),
              X.write(t, e, r, i, 52, 8),
              r + 8
            );
          }
          function N(t) {
            if (
              ((t = t.split("=")[0]),
              (t = t.trim().replace(J, "")),
              t.length < 2)
            )
              return "";
            for (; t.length % 4 != 0; ) t += "=";
            return t;
          }
          function q(t) {
            return t < 16 ? "0" + t.toString(16) : t.toString(16);
          }
          function U(t, e) {
            var r;
            e = e || 1 / 0;
            for (var i = t.length, n = null, s = [], o = 0; o < i; ++o) {
              if (((r = t.charCodeAt(o)), r > 55295 && r < 57344)) {
                if (!n) {
                  if (r > 56319) {
                    (e -= 3) > -1 && s.push(239, 191, 189);
                    continue;
                  }
                  if (o + 1 === i) {
                    (e -= 3) > -1 && s.push(239, 191, 189);
                    continue;
                  }
                  n = r;
                  continue;
                }
                if (r < 56320) {
                  (e -= 3) > -1 && s.push(239, 191, 189), (n = r);
                  continue;
                }
                r = 65536 + (((n - 55296) << 10) | (r - 56320));
              } else n && (e -= 3) > -1 && s.push(239, 191, 189);
              if (((n = null), r < 128)) {
                if ((e -= 1) < 0) break;
                s.push(r);
              } else if (r < 2048) {
                if ((e -= 2) < 0) break;
                s.push((r >> 6) | 192, (63 & r) | 128);
              } else if (r < 65536) {
                if ((e -= 3) < 0) break;
                s.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (63 & r) | 128);
              } else {
                if (!(r < 1114112)) throw new Error("Invalid code point");
                if ((e -= 4) < 0) break;
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
          function z(t) {
            for (var e = [], r = 0; r < t.length; ++r)
              e.push(255 & t.charCodeAt(r));
            return e;
          }
          function K(t, e) {
            for (
              var r, i, n, s = [], o = 0;
              o < t.length && !((e -= 2) < 0);
              ++o
            )
              (r = t.charCodeAt(o)),
                (i = r >> 8),
                (n = r % 256),
                s.push(n),
                s.push(i);
            return s;
          }
          function F(t) {
            return Z.toByteArray(N(t));
          }
          function H(t, e, r, i) {
            for (var n = 0; n < i && !(n + r >= e.length || n >= t.length); ++n)
              e[n + r] = t[n];
            return n;
          }
          function W(t, e) {
            return (
              t instanceof e ||
              (null != t &&
                null != t.constructor &&
                null != t.constructor.name &&
                t.constructor.name === e.name)
            );
          }
          function V(t) {
            return t != t;
          }
          var Z = t("base64-js"),
            X = t("ieee754");
          (r.Buffer = n), (r.SlowBuffer = p), (r.INSPECT_MAX_BYTES = 50);
          var G = 2147483647;
          (r.kMaxLength = G),
            (n.TYPED_ARRAY_SUPPORT = e()),
            n.TYPED_ARRAY_SUPPORT ||
              "undefined" == typeof console ||
              "function" != typeof console.error ||
              console.error(
                "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
              ),
            Object.defineProperty(n.prototype, "parent", {
              enumerable: !0,
              get: function () {
                if (n.isBuffer(this)) return this.buffer;
              },
            }),
            Object.defineProperty(n.prototype, "offset", {
              enumerable: !0,
              get: function () {
                if (n.isBuffer(this)) return this.byteOffset;
              },
            }),
            "undefined" != typeof Symbol &&
              null != Symbol.species &&
              n[Symbol.species] === n &&
              Object.defineProperty(n, Symbol.species, {
                value: null,
                configurable: !0,
                enumerable: !1,
                writable: !1,
              }),
            (n.poolSize = 8192),
            (n.from = function (t, e, r) {
              return s(t, e, r);
            }),
            (n.prototype.__proto__ = Uint8Array.prototype),
            (n.__proto__ = Uint8Array),
            (n.alloc = function (t, e, r) {
              return a(t, e, r);
            }),
            (n.allocUnsafe = function (t) {
              return f(t);
            }),
            (n.allocUnsafeSlow = function (t) {
              return f(t);
            }),
            (n.isBuffer = function (t) {
              return null != t && !0 === t._isBuffer && t !== n.prototype;
            }),
            (n.compare = function (t, e) {
              if (
                (W(t, Uint8Array) && (t = n.from(t, t.offset, t.byteLength)),
                W(e, Uint8Array) && (e = n.from(e, e.offset, e.byteLength)),
                !n.isBuffer(t) || !n.isBuffer(e))
              )
                throw new TypeError(
                  'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
                );
              if (t === e) return 0;
              for (
                var r = t.length, i = e.length, s = 0, o = Math.min(r, i);
                s < o;
                ++s
              )
                if (t[s] !== e[s]) {
                  (r = t[s]), (i = e[s]);
                  break;
                }
              return r < i ? -1 : i < r ? 1 : 0;
            }),
            (n.isEncoding = function (t) {
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
            (n.concat = function (t, e) {
              if (!Array.isArray(t))
                throw new TypeError(
                  '"list" argument must be an Array of Buffers'
                );
              if (0 === t.length) return n.alloc(0);
              var r;
              if (void 0 === e)
                for (e = 0, r = 0; r < t.length; ++r) e += t[r].length;
              var i = n.allocUnsafe(e),
                s = 0;
              for (r = 0; r < t.length; ++r) {
                var o = t[r];
                if ((W(o, Uint8Array) && (o = n.from(o)), !n.isBuffer(o)))
                  throw new TypeError(
                    '"list" argument must be an Array of Buffers'
                  );
                o.copy(i, s), (s += o.length);
              }
              return i;
            }),
            (n.byteLength = b),
            (n.prototype._isBuffer = !0),
            (n.prototype.swap16 = function () {
              var t = this.length;
              if (t % 2 != 0)
                throw new RangeError(
                  "Buffer size must be a multiple of 16-bits"
                );
              for (var e = 0; e < t; e += 2) y(this, e, e + 1);
              return this;
            }),
            (n.prototype.swap32 = function () {
              var t = this.length;
              if (t % 4 != 0)
                throw new RangeError(
                  "Buffer size must be a multiple of 32-bits"
                );
              for (var e = 0; e < t; e += 4)
                y(this, e, e + 3), y(this, e + 1, e + 2);
              return this;
            }),
            (n.prototype.swap64 = function () {
              var t = this.length;
              if (t % 8 != 0)
                throw new RangeError(
                  "Buffer size must be a multiple of 64-bits"
                );
              for (var e = 0; e < t; e += 8)
                y(this, e, e + 7),
                  y(this, e + 1, e + 6),
                  y(this, e + 2, e + 5),
                  y(this, e + 3, e + 4);
              return this;
            }),
            (n.prototype.toString = function () {
              var t = this.length;
              return 0 === t
                ? ""
                : 0 === arguments.length
                ? x(this, 0, t)
                : m.apply(this, arguments);
            }),
            (n.prototype.toLocaleString = n.prototype.toString),
            (n.prototype.equals = function (t) {
              if (!n.isBuffer(t))
                throw new TypeError("Argument must be a Buffer");
              return this === t || 0 === n.compare(this, t);
            }),
            (n.prototype.inspect = function () {
              var t = "",
                e = r.INSPECT_MAX_BYTES;
              return (
                (t = this.toString("hex", 0, e)
                  .replace(/(.{2})/g, "$1 ")
                  .trim()),
                this.length > e && (t += " ... "),
                "<Buffer " + t + ">"
              );
            }),
            (n.prototype.compare = function (t, e, r, i, s) {
              if (
                (W(t, Uint8Array) && (t = n.from(t, t.offset, t.byteLength)),
                !n.isBuffer(t))
              )
                throw new TypeError(
                  'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
                    typeof t
                );
              if (
                (void 0 === e && (e = 0),
                void 0 === r && (r = t ? t.length : 0),
                void 0 === i && (i = 0),
                void 0 === s && (s = this.length),
                e < 0 || r > t.length || i < 0 || s > this.length)
              )
                throw new RangeError("out of range index");
              if (i >= s && e >= r) return 0;
              if (i >= s) return -1;
              if (e >= r) return 1;
              if (((e >>>= 0), (r >>>= 0), (i >>>= 0), (s >>>= 0), this === t))
                return 0;
              for (
                var o = s - i,
                  a = r - e,
                  f = Math.min(o, a),
                  h = this.slice(i, s),
                  u = t.slice(e, r),
                  c = 0;
                c < f;
                ++c
              )
                if (h[c] !== u[c]) {
                  (o = h[c]), (a = u[c]);
                  break;
                }
              return o < a ? -1 : a < o ? 1 : 0;
            }),
            (n.prototype.includes = function (t, e, r) {
              return -1 !== this.indexOf(t, e, r);
            }),
            (n.prototype.indexOf = function (t, e, r) {
              return g(this, t, e, r, !0);
            }),
            (n.prototype.lastIndexOf = function (t, e, r) {
              return g(this, t, e, r, !1);
            }),
            (n.prototype.write = function (t, e, r, i) {
              if (void 0 === e) (i = "utf8"), (r = this.length), (e = 0);
              else if (void 0 === r && "string" == typeof e)
                (i = e), (r = this.length), (e = 0);
              else {
                if (!isFinite(e))
                  throw new Error(
                    "Buffer.write(string, encoding, offset[, length]) is no longer supported"
                  );
                (e >>>= 0),
                  isFinite(r)
                    ? ((r >>>= 0), void 0 === i && (i = "utf8"))
                    : ((i = r), (r = void 0));
              }
              var n = this.length - e;
              if (
                ((void 0 === r || r > n) && (r = n),
                (t.length > 0 && (r < 0 || e < 0)) || e > this.length)
              )
                throw new RangeError("Attempt to write outside buffer bounds");
              i || (i = "utf8");
              for (var s = !1; ; )
                switch (i) {
                  case "hex":
                    return w(this, t, e, r);
                  case "utf8":
                  case "utf-8":
                    return _(this, t, e, r);
                  case "ascii":
                    return M(this, t, e, r);
                  case "latin1":
                  case "binary":
                    return S(this, t, e, r);
                  case "base64":
                    return E(this, t, e, r);
                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return k(this, t, e, r);
                  default:
                    if (s) throw new TypeError("Unknown encoding: " + i);
                    (i = ("" + i).toLowerCase()), (s = !0);
                }
            }),
            (n.prototype.toJSON = function () {
              return {
                type: "Buffer",
                data: Array.prototype.slice.call(this._arr || this, 0),
              };
            });
          var Y = 4096;
          (n.prototype.slice = function (t, e) {
            var r = this.length;
            (t = ~~t),
              (e = void 0 === e ? r : ~~e),
              t < 0 ? ((t += r), t < 0 && (t = 0)) : t > r && (t = r),
              e < 0 ? ((e += r), e < 0 && (e = 0)) : e > r && (e = r),
              e < t && (e = t);
            var i = this.subarray(t, e);
            return (i.__proto__ = n.prototype), i;
          }),
            (n.prototype.readUIntLE = function (t, e, r) {
              (t >>>= 0), (e >>>= 0), r || C(t, e, this.length);
              for (var i = this[t], n = 1, s = 0; ++s < e && (n *= 256); )
                i += this[t + s] * n;
              return i;
            }),
            (n.prototype.readUIntBE = function (t, e, r) {
              (t >>>= 0), (e >>>= 0), r || C(t, e, this.length);
              for (var i = this[t + --e], n = 1; e > 0 && (n *= 256); )
                i += this[t + --e] * n;
              return i;
            }),
            (n.prototype.readUInt8 = function (t, e) {
              return (t >>>= 0), e || C(t, 1, this.length), this[t];
            }),
            (n.prototype.readUInt16LE = function (t, e) {
              return (
                (t >>>= 0),
                e || C(t, 2, this.length),
                this[t] | (this[t + 1] << 8)
              );
            }),
            (n.prototype.readUInt16BE = function (t, e) {
              return (
                (t >>>= 0),
                e || C(t, 2, this.length),
                (this[t] << 8) | this[t + 1]
              );
            }),
            (n.prototype.readUInt32LE = function (t, e) {
              return (
                (t >>>= 0),
                e || C(t, 4, this.length),
                (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) +
                  16777216 * this[t + 3]
              );
            }),
            (n.prototype.readUInt32BE = function (t, e) {
              return (
                (t >>>= 0),
                e || C(t, 4, this.length),
                16777216 * this[t] +
                  ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
              );
            }),
            (n.prototype.readIntLE = function (t, e, r) {
              (t >>>= 0), (e >>>= 0), r || C(t, e, this.length);
              for (var i = this[t], n = 1, s = 0; ++s < e && (n *= 256); )
                i += this[t + s] * n;
              return (n *= 128), i >= n && (i -= Math.pow(2, 8 * e)), i;
            }),
            (n.prototype.readIntBE = function (t, e, r) {
              (t >>>= 0), (e >>>= 0), r || C(t, e, this.length);
              for (var i = e, n = 1, s = this[t + --i]; i > 0 && (n *= 256); )
                s += this[t + --i] * n;
              return (n *= 128), s >= n && (s -= Math.pow(2, 8 * e)), s;
            }),
            (n.prototype.readInt8 = function (t, e) {
              return (
                (t >>>= 0),
                e || C(t, 1, this.length),
                128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
              );
            }),
            (n.prototype.readInt16LE = function (t, e) {
              (t >>>= 0), e || C(t, 2, this.length);
              var r = this[t] | (this[t + 1] << 8);
              return 32768 & r ? 4294901760 | r : r;
            }),
            (n.prototype.readInt16BE = function (t, e) {
              (t >>>= 0), e || C(t, 2, this.length);
              var r = this[t + 1] | (this[t] << 8);
              return 32768 & r ? 4294901760 | r : r;
            }),
            (n.prototype.readInt32LE = function (t, e) {
              return (
                (t >>>= 0),
                e || C(t, 4, this.length),
                this[t] |
                  (this[t + 1] << 8) |
                  (this[t + 2] << 16) |
                  (this[t + 3] << 24)
              );
            }),
            (n.prototype.readInt32BE = function (t, e) {
              return (
                (t >>>= 0),
                e || C(t, 4, this.length),
                (this[t] << 24) |
                  (this[t + 1] << 16) |
                  (this[t + 2] << 8) |
                  this[t + 3]
              );
            }),
            (n.prototype.readFloatLE = function (t, e) {
              return (
                (t >>>= 0),
                e || C(t, 4, this.length),
                X.read(this, t, !0, 23, 4)
              );
            }),
            (n.prototype.readFloatBE = function (t, e) {
              return (
                (t >>>= 0),
                e || C(t, 4, this.length),
                X.read(this, t, !1, 23, 4)
              );
            }),
            (n.prototype.readDoubleLE = function (t, e) {
              return (
                (t >>>= 0),
                e || C(t, 8, this.length),
                X.read(this, t, !0, 52, 8)
              );
            }),
            (n.prototype.readDoubleBE = function (t, e) {
              return (
                (t >>>= 0),
                e || C(t, 8, this.length),
                X.read(this, t, !1, 52, 8)
              );
            }),
            (n.prototype.writeUIntLE = function (t, e, r, i) {
              if (((t = +t), (e >>>= 0), (r >>>= 0), !i)) {
                var n = Math.pow(2, 8 * r) - 1;
                P(this, t, e, r, n, 0);
              }
              var s = 1,
                o = 0;
              for (this[e] = 255 & t; ++o < r && (s *= 256); )
                this[e + o] = (t / s) & 255;
              return e + r;
            }),
            (n.prototype.writeUIntBE = function (t, e, r, i) {
              if (((t = +t), (e >>>= 0), (r >>>= 0), !i)) {
                var n = Math.pow(2, 8 * r) - 1;
                P(this, t, e, r, n, 0);
              }
              var s = r - 1,
                o = 1;
              for (this[e + s] = 255 & t; --s >= 0 && (o *= 256); )
                this[e + s] = (t / o) & 255;
              return e + r;
            }),
            (n.prototype.writeUInt8 = function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || P(this, t, e, 1, 255, 0),
                (this[e] = 255 & t),
                e + 1
              );
            }),
            (n.prototype.writeUInt16LE = function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || P(this, t, e, 2, 65535, 0),
                (this[e] = 255 & t),
                (this[e + 1] = t >>> 8),
                e + 2
              );
            }),
            (n.prototype.writeUInt16BE = function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || P(this, t, e, 2, 65535, 0),
                (this[e] = t >>> 8),
                (this[e + 1] = 255 & t),
                e + 2
              );
            }),
            (n.prototype.writeUInt32LE = function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || P(this, t, e, 4, 4294967295, 0),
                (this[e + 3] = t >>> 24),
                (this[e + 2] = t >>> 16),
                (this[e + 1] = t >>> 8),
                (this[e] = 255 & t),
                e + 4
              );
            }),
            (n.prototype.writeUInt32BE = function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || P(this, t, e, 4, 4294967295, 0),
                (this[e] = t >>> 24),
                (this[e + 1] = t >>> 16),
                (this[e + 2] = t >>> 8),
                (this[e + 3] = 255 & t),
                e + 4
              );
            }),
            (n.prototype.writeIntLE = function (t, e, r, i) {
              if (((t = +t), (e >>>= 0), !i)) {
                var n = Math.pow(2, 8 * r - 1);
                P(this, t, e, r, n - 1, -n);
              }
              var s = 0,
                o = 1,
                a = 0;
              for (this[e] = 255 & t; ++s < r && (o *= 256); )
                t < 0 && 0 === a && 0 !== this[e + s - 1] && (a = 1),
                  (this[e + s] = (((t / o) >> 0) - a) & 255);
              return e + r;
            }),
            (n.prototype.writeIntBE = function (t, e, r, i) {
              if (((t = +t), (e >>>= 0), !i)) {
                var n = Math.pow(2, 8 * r - 1);
                P(this, t, e, r, n - 1, -n);
              }
              var s = r - 1,
                o = 1,
                a = 0;
              for (this[e + s] = 255 & t; --s >= 0 && (o *= 256); )
                t < 0 && 0 === a && 0 !== this[e + s + 1] && (a = 1),
                  (this[e + s] = (((t / o) >> 0) - a) & 255);
              return e + r;
            }),
            (n.prototype.writeInt8 = function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || P(this, t, e, 1, 127, -128),
                t < 0 && (t = 255 + t + 1),
                (this[e] = 255 & t),
                e + 1
              );
            }),
            (n.prototype.writeInt16LE = function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || P(this, t, e, 2, 32767, -32768),
                (this[e] = 255 & t),
                (this[e + 1] = t >>> 8),
                e + 2
              );
            }),
            (n.prototype.writeInt16BE = function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || P(this, t, e, 2, 32767, -32768),
                (this[e] = t >>> 8),
                (this[e + 1] = 255 & t),
                e + 2
              );
            }),
            (n.prototype.writeInt32LE = function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || P(this, t, e, 4, 2147483647, -2147483648),
                (this[e] = 255 & t),
                (this[e + 1] = t >>> 8),
                (this[e + 2] = t >>> 16),
                (this[e + 3] = t >>> 24),
                e + 4
              );
            }),
            (n.prototype.writeInt32BE = function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || P(this, t, e, 4, 2147483647, -2147483648),
                t < 0 && (t = 4294967295 + t + 1),
                (this[e] = t >>> 24),
                (this[e + 1] = t >>> 16),
                (this[e + 2] = t >>> 8),
                (this[e + 3] = 255 & t),
                e + 4
              );
            }),
            (n.prototype.writeFloatLE = function (t, e, r) {
              return O(this, t, e, !0, r);
            }),
            (n.prototype.writeFloatBE = function (t, e, r) {
              return O(this, t, e, !1, r);
            }),
            (n.prototype.writeDoubleLE = function (t, e, r) {
              return D(this, t, e, !0, r);
            }),
            (n.prototype.writeDoubleBE = function (t, e, r) {
              return D(this, t, e, !1, r);
            }),
            (n.prototype.copy = function (t, e, r, i) {
              if (!n.isBuffer(t))
                throw new TypeError("argument should be a Buffer");
              if (
                (r || (r = 0),
                i || 0 === i || (i = this.length),
                e >= t.length && (e = t.length),
                e || (e = 0),
                i > 0 && i < r && (i = r),
                i === r)
              )
                return 0;
              if (0 === t.length || 0 === this.length) return 0;
              if (e < 0) throw new RangeError("targetStart out of bounds");
              if (r < 0 || r >= this.length)
                throw new RangeError("Index out of range");
              if (i < 0) throw new RangeError("sourceEnd out of bounds");
              i > this.length && (i = this.length),
                t.length - e < i - r && (i = t.length - e + r);
              var s = i - r;
              if (
                this === t &&
                "function" == typeof Uint8Array.prototype.copyWithin
              )
                this.copyWithin(e, r, i);
              else if (this === t && r < e && e < i)
                for (var o = s - 1; o >= 0; --o) t[o + e] = this[o + r];
              else Uint8Array.prototype.set.call(t, this.subarray(r, i), e);
              return s;
            }),
            (n.prototype.fill = function (t, e, r, i) {
              if ("string" == typeof t) {
                if (
                  ("string" == typeof e
                    ? ((i = e), (e = 0), (r = this.length))
                    : "string" == typeof r && ((i = r), (r = this.length)),
                  void 0 !== i && "string" != typeof i)
                )
                  throw new TypeError("encoding must be a string");
                if ("string" == typeof i && !n.isEncoding(i))
                  throw new TypeError("Unknown encoding: " + i);
                if (1 === t.length) {
                  var s = t.charCodeAt(0);
                  (("utf8" === i && s < 128) || "latin1" === i) && (t = s);
                }
              } else "number" == typeof t && (t &= 255);
              if (e < 0 || this.length < e || this.length < r)
                throw new RangeError("Out of range index");
              if (r <= e) return this;
              var o;
              if (
                ((e >>>= 0),
                (r = void 0 === r ? this.length : r >>> 0),
                t || (t = 0),
                "number" == typeof t)
              )
                for (o = e; o < r; ++o) this[o] = t;
              else {
                var a = n.isBuffer(t) ? t : n.from(t, i),
                  f = a.length;
                if (0 === f)
                  throw new TypeError(
                    'The value "' + t + '" is invalid for argument "value"'
                  );
                for (o = 0; o < r - e; ++o) this[o + e] = a[o % f];
              }
              return this;
            });
          var J = /[^+/0-9A-Za-z-_]/g;
        }).call(this);
      }).call(this, t("buffer").Buffer);
    },
    { "base64-js": 16, buffer: 63, ieee754: 131 },
  ],
  64: [
    function (t, e, r) {
      function i(t) {
        s.call(this),
          (this.hashMode = "string" == typeof t),
          this.hashMode
            ? (this[t] = this._finalOrDigest)
            : (this.final = this._finalOrDigest),
          this._final && ((this.__final = this._final), (this._final = null)),
          (this._decoder = null),
          (this._encoding = null);
      }
      var n = t("safe-buffer").Buffer,
        s = t("stream").Transform,
        o = t("string_decoder").StringDecoder,
        a = t("inherits");
      a(i, s),
        (i.prototype.update = function (t, e, r) {
          "string" == typeof t && (t = n.from(t, e));
          var i = this._update(t);
          return this.hashMode ? this : (r && (i = this._toString(i, r)), i);
        }),
        (i.prototype.setAutoPadding = function () {}),
        (i.prototype.getAuthTag = function () {
          throw new Error("trying to get auth tag in unsupported state");
        }),
        (i.prototype.setAuthTag = function () {
          throw new Error("trying to set auth tag in unsupported state");
        }),
        (i.prototype.setAAD = function () {
          throw new Error("trying to set aad in unsupported state");
        }),
        (i.prototype._transform = function (t, e, r) {
          var i;
          try {
            this.hashMode ? this._update(t) : this.push(this._update(t));
          } catch (t) {
            i = t;
          } finally {
            r(i);
          }
        }),
        (i.prototype._flush = function (t) {
          var e;
          try {
            this.push(this.__final());
          } catch (t) {
            e = t;
          }
          t(e);
        }),
        (i.prototype._finalOrDigest = function (t) {
          var e = this.__final() || n.alloc(0);
          return t && (e = this._toString(e, t, !0)), e;
        }),
        (i.prototype._toString = function (t, e, r) {
          if (
            (this._decoder ||
              ((this._decoder = new o(e)), (this._encoding = e)),
            this._encoding !== e)
          )
            throw new Error("can't switch encodings");
          var i = this._decoder.write(t);
          return r && (i += this._decoder.end()), i;
        }),
        (e.exports = i);
    },
    { inherits: 132, "safe-buffer": 160, stream: 170, string_decoder: 185 },
  ],
  65: [
    function (t, e, r) {
      (function (r) {
        (function () {
          function i(t) {
            (this.curveType = a[t]),
              this.curveType || (this.curveType = { name: t }),
              (this.curve = new s.ec(this.curveType.name)),
              (this.keys = void 0);
          }
          function n(t, e, i) {
            Array.isArray(t) || (t = t.toArray());
            var n = new r(t);
            if (i && n.length < i) {
              var s = new r(i - n.length);
              s.fill(0), (n = r.concat([s, n]));
            }
            return e ? n.toString(e) : n;
          }
          var s = t("elliptic"),
            o = t("bn.js");
          e.exports = function (t) {
            return new i(t);
          };
          var a = {
            secp256k1: { name: "secp256k1", byteLength: 32 },
            secp224r1: { name: "p224", byteLength: 28 },
            prime256v1: { name: "p256", byteLength: 32 },
            prime192v1: { name: "p192", byteLength: 24 },
            ed25519: { name: "ed25519", byteLength: 32 },
            secp384r1: { name: "p384", byteLength: 48 },
            secp521r1: { name: "p521", byteLength: 66 },
          };
          (a.p224 = a.secp224r1),
            (a.p256 = a.secp256r1 = a.prime256v1),
            (a.p192 = a.secp192r1 = a.prime192v1),
            (a.p384 = a.secp384r1),
            (a.p521 = a.secp521r1),
            (i.prototype.generateKeys = function (t, e) {
              return (
                (this.keys = this.curve.genKeyPair()), this.getPublicKey(t, e)
              );
            }),
            (i.prototype.computeSecret = function (t, e, i) {
              (e = e || "utf8"), r.isBuffer(t) || (t = new r(t, e));
              var s = this.curve.keyFromPublic(t).getPublic(),
                o = s.mul(this.keys.getPrivate()).getX();
              return n(o, i, this.curveType.byteLength);
            }),
            (i.prototype.getPublicKey = function (t, e) {
              var r = this.keys.getPublic("compressed" === e, !0);
              return (
                "hybrid" === e &&
                  (r[r.length - 1] % 2 ? (r[0] = 7) : (r[0] = 6)),
                n(r, t)
              );
            }),
            (i.prototype.getPrivateKey = function (t) {
              return n(this.keys.getPrivate(), t);
            }),
            (i.prototype.setPublicKey = function (t, e) {
              return (
                (e = e || "utf8"),
                r.isBuffer(t) || (t = new r(t, e)),
                this.keys._importPublic(t),
                this
              );
            }),
            (i.prototype.setPrivateKey = function (t, e) {
              (e = e || "utf8"), r.isBuffer(t) || (t = new r(t, e));
              var i = new o(t);
              return (
                (i = i.toString(16)),
                (this.keys = this.curve.genKeyPair()),
                this.keys._importPrivate(i),
                this
              );
            });
        }).call(this);
      }).call(this, t("buffer").Buffer);
    },
    { "bn.js": 66, buffer: 63, elliptic: 83 },
  ],
  66: [
    function (t, e, r) {
      arguments[4][15][0].apply(r, arguments);
    },
    { buffer: 19, dup: 15 },
  ],
  67: [
    function (t, e, r) {
      "use strict";
      function i(t) {
        f.call(this, "digest"), (this._hash = t);
      }
      var n = t("inherits"),
        s = t("md5.js"),
        o = t("ripemd160"),
        a = t("sha.js"),
        f = t("cipher-base");
      n(i, f),
        (i.prototype._update = function (t) {
          this._hash.update(t);
        }),
        (i.prototype._final = function () {
          return this._hash.digest();
        }),
        (e.exports = function (t) {
          return (
            (t = t.toLowerCase()),
            "md5" === t
              ? new s()
              : "rmd160" === t || "ripemd160" === t
              ? new o()
              : new i(a(t))
          );
        });
    },
    {
      "cipher-base": 64,
      inherits: 132,
      "md5.js": 133,
      ripemd160: 159,
      "sha.js": 163,
    },
  ],
  68: [
    function (t, e, r) {
      var i = t("md5.js");
      e.exports = function (t) {
        return new i().update(t).digest();
      };
    },
    { "md5.js": 133 },
  ],
  69: [
    function (t, e, r) {
      "use strict";
      function i(t, e) {
        o.call(this, "digest"), "string" == typeof e && (e = a.from(e));
        var r = "sha512" === t || "sha384" === t ? 128 : 64;
        if (((this._alg = t), (this._key = e), e.length > r)) {
          var i = "rmd160" === t ? new h() : u(t);
          e = i.update(e).digest();
        } else e.length < r && (e = a.concat([e, c], r));
        for (
          var n = (this._ipad = a.allocUnsafe(r)),
            s = (this._opad = a.allocUnsafe(r)),
            f = 0;
          f < r;
          f++
        )
          (n[f] = 54 ^ e[f]), (s[f] = 92 ^ e[f]);
        (this._hash = "rmd160" === t ? new h() : u(t)), this._hash.update(n);
      }
      var n = t("inherits"),
        s = t("./legacy"),
        o = t("cipher-base"),
        a = t("safe-buffer").Buffer,
        f = t("create-hash/md5"),
        h = t("ripemd160"),
        u = t("sha.js"),
        c = a.alloc(128);
      n(i, o),
        (i.prototype._update = function (t) {
          this._hash.update(t);
        }),
        (i.prototype._final = function () {
          var t = this._hash.digest(),
            e = "rmd160" === this._alg ? new h() : u(this._alg);
          return e.update(this._opad).update(t).digest();
        }),
        (e.exports = function (t, e) {
          return (
            (t = t.toLowerCase()),
            "rmd160" === t || "ripemd160" === t
              ? new i("rmd160", e)
              : "md5" === t
              ? new s(f, e)
              : new i(t, e)
          );
        });
    },
    {
      "./legacy": 70,
      "cipher-base": 64,
      "create-hash/md5": 68,
      inherits: 132,
      ripemd160: 159,
      "safe-buffer": 160,
      "sha.js": 163,
    },
  ],
  70: [
    function (t, e, r) {
      "use strict";
      function i(t, e) {
        o.call(this, "digest"),
          "string" == typeof e && (e = s.from(e)),
          (this._alg = t),
          (this._key = e),
          e.length > f ? (e = t(e)) : e.length < f && (e = s.concat([e, a], f));
        for (
          var r = (this._ipad = s.allocUnsafe(f)),
            i = (this._opad = s.allocUnsafe(f)),
            n = 0;
          n < f;
          n++
        )
          (r[n] = 54 ^ e[n]), (i[n] = 92 ^ e[n]);
        this._hash = [r];
      }
      var n = t("inherits"),
        s = t("safe-buffer").Buffer,
        o = t("cipher-base"),
        a = s.alloc(128),
        f = 64;
      n(i, o),
        (i.prototype._update = function (t) {
          this._hash.push(t);
        }),
        (i.prototype._final = function () {
          var t = this._alg(s.concat(this._hash));
          return this._alg(s.concat([this._opad, t]));
        }),
        (e.exports = i);
    },
    { "cipher-base": 64, inherits: 132, "safe-buffer": 160 },
  ],
  71: [
    function (t, e, r) {
      "use strict";
      (r.randomBytes = r.rng = r.pseudoRandomBytes = r.prng = t("randombytes")),
        (r.createHash = r.Hash = t("create-hash")),
        (r.createHmac = r.Hmac = t("create-hmac"));
      var i = t("browserify-sign/algos"),
        n = Object.keys(i),
        s = [
          "sha1",
          "sha224",
          "sha256",
          "sha384",
          "sha512",
          "md5",
          "rmd160",
        ].concat(n);
      r.getHashes = function () {
        return s;
      };
      var o = t("pbkdf2");
      (r.pbkdf2 = o.pbkdf2), (r.pbkdf2Sync = o.pbkdf2Sync);
      var a = t("browserify-cipher");
      (r.Cipher = a.Cipher),
        (r.createCipher = a.createCipher),
        (r.Cipheriv = a.Cipheriv),
        (r.createCipheriv = a.createCipheriv),
        (r.Decipher = a.Decipher),
        (r.createDecipher = a.createDecipher),
        (r.Decipheriv = a.Decipheriv),
        (r.createDecipheriv = a.createDecipheriv),
        (r.getCiphers = a.getCiphers),
        (r.listCiphers = a.listCiphers);
      var f = t("diffie-hellman");
      (r.DiffieHellmanGroup = f.DiffieHellmanGroup),
        (r.createDiffieHellmanGroup = f.createDiffieHellmanGroup),
        (r.getDiffieHellman = f.getDiffieHellman),
        (r.createDiffieHellman = f.createDiffieHellman),
        (r.DiffieHellman = f.DiffieHellman);
      var h = t("browserify-sign");
      (r.createSign = h.createSign),
        (r.Sign = h.Sign),
        (r.createVerify = h.createVerify),
        (r.Verify = h.Verify),
        (r.createECDH = t("create-ecdh"));
      var u = t("public-encrypt");
      (r.publicEncrypt = u.publicEncrypt),
        (r.privateEncrypt = u.privateEncrypt),
        (r.publicDecrypt = u.publicDecrypt),
        (r.privateDecrypt = u.privateDecrypt);
      var c = t("randomfill");
      (r.randomFill = c.randomFill),
        (r.randomFillSync = c.randomFillSync),
        (r.createCredentials = function () {
          throw new Error(
            [
              "sorry, createCredentials is not implemented yet",
              "we accept pull requests",
              "https://github.com/crypto-browserify/crypto-browserify",
            ].join("\n")
          );
        }),
        (r.constants = {
          DH_CHECK_P_NOT_SAFE_PRIME: 2,
          DH_CHECK_P_NOT_PRIME: 1,
          DH_UNABLE_TO_CHECK_GENERATOR: 4,
          DH_NOT_SUITABLE_GENERATOR: 8,
          NPN_ENABLED: 1,
          ALPN_ENABLED: 1,
          RSA_PKCS1_PADDING: 1,
          RSA_SSLV23_PADDING: 2,
          RSA_NO_PADDING: 3,
          RSA_PKCS1_OAEP_PADDING: 4,
          RSA_X931_PADDING: 5,
          RSA_PKCS1_PSS_PADDING: 6,
          POINT_CONVERSION_COMPRESSED: 2,
          POINT_CONVERSION_UNCOMPRESSED: 4,
          POINT_CONVERSION_HYBRID: 6,
        });
    },
    {
      "browserify-cipher": 37,
      "browserify-sign": 44,
      "browserify-sign/algos": 41,
      "create-ecdh": 65,
      "create-hash": 67,
      "create-hmac": 69,
      "diffie-hellman": 78,
      pbkdf2: 143,
      "public-encrypt": 150,
      randombytes: 157,
      randomfill: 158,
    },
  ],
  72: [
    function (t, e, r) {
      "use strict";
      (r.utils = t("./des/utils")),
        (r.Cipher = t("./des/cipher")),
        (r.DES = t("./des/des")),
        (r.CBC = t("./des/cbc")),
        (r.EDE = t("./des/ede"));
    },
    {
      "./des/cbc": 73,
      "./des/cipher": 74,
      "./des/des": 75,
      "./des/ede": 76,
      "./des/utils": 77,
    },
  ],
  73: [
    function (t, e, r) {
      "use strict";
      function i(t) {
        s.equal(t.length, 8, "Invalid IV length"), (this.iv = new Array(8));
        for (var e = 0; e < this.iv.length; e++) this.iv[e] = t[e];
      }
      function n(t) {
        function e(e) {
          t.call(this, e), this._cbcInit();
        }
        o(e, t);
        for (var r = Object.keys(a), i = 0; i < r.length; i++) {
          var n = r[i];
          e.prototype[n] = a[n];
        }
        return (
          (e.create = function (t) {
            return new e(t);
          }),
          e
        );
      }
      var s = t("minimalistic-assert"),
        o = t("inherits"),
        a = {};
      (r.instantiate = n),
        (a._cbcInit = function () {
          var t = new i(this.options.iv);
          this._cbcState = t;
        }),
        (a._update = function (t, e, r, i) {
          var n = this._cbcState,
            s = this.constructor.super_.prototype,
            o = n.iv;
          if ("encrypt" === this.type) {
            for (var a = 0; a < this.blockSize; a++) o[a] ^= t[e + a];
            s._update.call(this, o, 0, r, i);
            for (a = 0; a < this.blockSize; a++) o[a] = r[i + a];
          } else {
            s._update.call(this, t, e, r, i);
            for (a = 0; a < this.blockSize; a++) r[i + a] ^= o[a];
            for (a = 0; a < this.blockSize; a++) o[a] = t[e + a];
          }
        });
    },
    { inherits: 132, "minimalistic-assert": 136 },
  ],
  74: [
    function (t, e, r) {
      "use strict";
      function i(t) {
        (this.options = t),
          (this.type = this.options.type),
          (this.blockSize = 8),
          this._init(),
          (this.buffer = new Array(this.blockSize)),
          (this.bufferOff = 0),
          (this.padding = !1 !== t.padding);
      }
      var n = t("minimalistic-assert");
      (e.exports = i),
        (i.prototype._init = function () {}),
        (i.prototype.update = function (t) {
          return 0 === t.length
            ? []
            : "decrypt" === this.type
            ? this._updateDecrypt(t)
            : this._updateEncrypt(t);
        }),
        (i.prototype._buffer = function (t, e) {
          for (
            var r = Math.min(this.buffer.length - this.bufferOff, t.length - e),
              i = 0;
            i < r;
            i++
          )
            this.buffer[this.bufferOff + i] = t[e + i];
          return (this.bufferOff += r), r;
        }),
        (i.prototype._flushBuffer = function (t, e) {
          return (
            this._update(this.buffer, 0, t, e),
            (this.bufferOff = 0),
            this.blockSize
          );
        }),
        (i.prototype._updateEncrypt = function (t) {
          var e = 0,
            r = 0,
            i = ((this.bufferOff + t.length) / this.blockSize) | 0,
            n = new Array(i * this.blockSize);
          0 !== this.bufferOff &&
            ((e += this._buffer(t, e)),
            this.bufferOff === this.buffer.length &&
              (r += this._flushBuffer(n, r)));
          for (
            var s = t.length - ((t.length - e) % this.blockSize);
            e < s;
            e += this.blockSize
          )
            this._update(t, e, n, r), (r += this.blockSize);
          for (; e < t.length; e++, this.bufferOff++)
            this.buffer[this.bufferOff] = t[e];
          return n;
        }),
        (i.prototype._updateDecrypt = function (t) {
          for (
            var e = 0,
              r = 0,
              i = Math.ceil((this.bufferOff + t.length) / this.blockSize) - 1,
              n = new Array(i * this.blockSize);
            i > 0;
            i--
          )
            (e += this._buffer(t, e)), (r += this._flushBuffer(n, r));
          return (e += this._buffer(t, e)), n;
        }),
        (i.prototype.final = function (t) {
          var e, r;
          return (
            t && (e = this.update(t)),
            (r =
              "encrypt" === this.type
                ? this._finalEncrypt()
                : this._finalDecrypt()),
            e ? e.concat(r) : r
          );
        }),
        (i.prototype._pad = function (t, e) {
          if (0 === e) return !1;
          for (; e < t.length; ) t[e++] = 0;
          return !0;
        }),
        (i.prototype._finalEncrypt = function () {
          if (!this._pad(this.buffer, this.bufferOff)) return [];
          var t = new Array(this.blockSize);
          return this._update(this.buffer, 0, t, 0), t;
        }),
        (i.prototype._unpad = function (t) {
          return t;
        }),
        (i.prototype._finalDecrypt = function () {
          n.equal(this.bufferOff, this.blockSize, "Not enough data to decrypt");
          var t = new Array(this.blockSize);
          return this._flushBuffer(t, 0), this._unpad(t);
        });
    },
    { "minimalistic-assert": 136 },
  ],
  75: [
    function (t, e, r) {
      "use strict";
      function i() {
        (this.tmp = new Array(2)), (this.keys = null);
      }
      function n(t) {
        f.call(this, t);
        var e = new i();
        (this._desState = e), this.deriveKeys(e, t.key);
      }
      var s = t("minimalistic-assert"),
        o = t("inherits"),
        a = t("./utils"),
        f = t("./cipher");
      o(n, f),
        (e.exports = n),
        (n.create = function (t) {
          return new n(t);
        });
      var h = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];
      (n.prototype.deriveKeys = function (t, e) {
        (t.keys = new Array(32)),
          s.equal(e.length, this.blockSize, "Invalid key length");
        var r = a.readUInt32BE(e, 0),
          i = a.readUInt32BE(e, 4);
        a.pc1(r, i, t.tmp, 0), (r = t.tmp[0]), (i = t.tmp[1]);
        for (var n = 0; n < t.keys.length; n += 2) {
          var o = h[n >>> 1];
          (r = a.r28shl(r, o)), (i = a.r28shl(i, o)), a.pc2(r, i, t.keys, n);
        }
      }),
        (n.prototype._update = function (t, e, r, i) {
          var n = this._desState,
            s = a.readUInt32BE(t, e),
            o = a.readUInt32BE(t, e + 4);
          a.ip(s, o, n.tmp, 0),
            (s = n.tmp[0]),
            (o = n.tmp[1]),
            "encrypt" === this.type
              ? this._encrypt(n, s, o, n.tmp, 0)
              : this._decrypt(n, s, o, n.tmp, 0),
            (s = n.tmp[0]),
            (o = n.tmp[1]),
            a.writeUInt32BE(r, s, i),
            a.writeUInt32BE(r, o, i + 4);
        }),
        (n.prototype._pad = function (t, e) {
          if (!1 === this.padding) return !1;
          for (var r = t.length - e, i = e; i < t.length; i++) t[i] = r;
          return !0;
        }),
        (n.prototype._unpad = function (t) {
          if (!1 === this.padding) return t;
          for (var e = t[t.length - 1], r = t.length - e; r < t.length; r++)
            s.equal(t[r], e);
          return t.slice(0, t.length - e);
        }),
        (n.prototype._encrypt = function (t, e, r, i, n) {
          for (var s = e, o = r, f = 0; f < t.keys.length; f += 2) {
            var h = t.keys[f],
              u = t.keys[f + 1];
            a.expand(o, t.tmp, 0), (h ^= t.tmp[0]), (u ^= t.tmp[1]);
            var c = a.substitute(h, u),
              d = a.permute(c),
              l = o;
            (o = (s ^ d) >>> 0), (s = l);
          }
          a.rip(o, s, i, n);
        }),
        (n.prototype._decrypt = function (t, e, r, i, n) {
          for (var s = r, o = e, f = t.keys.length - 2; f >= 0; f -= 2) {
            var h = t.keys[f],
              u = t.keys[f + 1];
            a.expand(s, t.tmp, 0), (h ^= t.tmp[0]), (u ^= t.tmp[1]);
            var c = a.substitute(h, u),
              d = a.permute(c),
              l = s;
            (s = (o ^ d) >>> 0), (o = l);
          }
          a.rip(s, o, i, n);
        });
    },
    {
      "./cipher": 74,
      "./utils": 77,
      inherits: 132,
      "minimalistic-assert": 136,
    },
  ],
  76: [
    function (t, e, r) {
      "use strict";
      function i(t, e) {
        s.equal(e.length, 24, "Invalid key length");
        var r = e.slice(0, 8),
          i = e.slice(8, 16),
          n = e.slice(16, 24);
        this.ciphers =
          "encrypt" === t
            ? [
                f.create({ type: "encrypt", key: r }),
                f.create({ type: "decrypt", key: i }),
                f.create({ type: "encrypt", key: n }),
              ]
            : [
                f.create({ type: "decrypt", key: n }),
                f.create({ type: "encrypt", key: i }),
                f.create({ type: "decrypt", key: r }),
              ];
      }
      function n(t) {
        a.call(this, t);
        var e = new i(this.type, this.options.key);
        this._edeState = e;
      }
      var s = t("minimalistic-assert"),
        o = t("inherits"),
        a = t("./cipher"),
        f = t("./des");
      o(n, a),
        (e.exports = n),
        (n.create = function (t) {
          return new n(t);
        }),
        (n.prototype._update = function (t, e, r, i) {
          var n = this._edeState;
          n.ciphers[0]._update(t, e, r, i),
            n.ciphers[1]._update(r, i, r, i),
            n.ciphers[2]._update(r, i, r, i);
        }),
        (n.prototype._pad = f.prototype._pad),
        (n.prototype._unpad = f.prototype._unpad);
    },
    { "./cipher": 74, "./des": 75, inherits: 132, "minimalistic-assert": 136 },
  ],
  77: [
    function (t, e, r) {
      "use strict";
      (r.readUInt32BE = function (t, e) {
        var r =
          (t[0 + e] << 24) | (t[1 + e] << 16) | (t[2 + e] << 8) | t[3 + e];
        return r >>> 0;
      }),
        (r.writeUInt32BE = function (t, e, r) {
          (t[0 + r] = e >>> 24),
            (t[1 + r] = (e >>> 16) & 255),
            (t[2 + r] = (e >>> 8) & 255),
            (t[3 + r] = 255 & e);
        }),
        (r.ip = function (t, e, r, i) {
          for (var n = 0, s = 0, o = 6; o >= 0; o -= 2) {
            for (var a = 0; a <= 24; a += 8)
              (n <<= 1), (n |= (e >>> (a + o)) & 1);
            for (a = 0; a <= 24; a += 8) (n <<= 1), (n |= (t >>> (a + o)) & 1);
          }
          for (o = 6; o >= 0; o -= 2) {
            for (a = 1; a <= 25; a += 8) (s <<= 1), (s |= (e >>> (a + o)) & 1);
            for (a = 1; a <= 25; a += 8) (s <<= 1), (s |= (t >>> (a + o)) & 1);
          }
          (r[i + 0] = n >>> 0), (r[i + 1] = s >>> 0);
        }),
        (r.rip = function (t, e, r, i) {
          for (var n = 0, s = 0, o = 0; o < 4; o++)
            for (var a = 24; a >= 0; a -= 8)
              (n <<= 1),
                (n |= (e >>> (a + o)) & 1),
                (n <<= 1),
                (n |= (t >>> (a + o)) & 1);
          for (o = 4; o < 8; o++)
            for (a = 24; a >= 0; a -= 8)
              (s <<= 1),
                (s |= (e >>> (a + o)) & 1),
                (s <<= 1),
                (s |= (t >>> (a + o)) & 1);
          (r[i + 0] = n >>> 0), (r[i + 1] = s >>> 0);
        }),
        (r.pc1 = function (t, e, r, i) {
          for (var n = 0, s = 0, o = 7; o >= 5; o--) {
            for (var a = 0; a <= 24; a += 8)
              (n <<= 1), (n |= (e >> (a + o)) & 1);
            for (a = 0; a <= 24; a += 8) (n <<= 1), (n |= (t >> (a + o)) & 1);
          }
          for (a = 0; a <= 24; a += 8) (n <<= 1), (n |= (e >> (a + o)) & 1);
          for (o = 1; o <= 3; o++) {
            for (a = 0; a <= 24; a += 8) (s <<= 1), (s |= (e >> (a + o)) & 1);
            for (a = 0; a <= 24; a += 8) (s <<= 1), (s |= (t >> (a + o)) & 1);
          }
          for (a = 0; a <= 24; a += 8) (s <<= 1), (s |= (t >> (a + o)) & 1);
          (r[i + 0] = n >>> 0), (r[i + 1] = s >>> 0);
        }),
        (r.r28shl = function (t, e) {
          return ((t << e) & 268435455) | (t >>> (28 - e));
        });
      var i = [
        14, 11, 17, 4, 27, 23, 25, 0, 13, 22, 7, 18, 5, 9, 16, 24, 2, 20, 12,
        21, 1, 8, 15, 26, 15, 4, 25, 19, 9, 1, 26, 16, 5, 11, 23, 8, 12, 7, 17,
        0, 22, 3, 10, 14, 6, 20, 27, 24,
      ];
      (r.pc2 = function (t, e, r, n) {
        for (var s = 0, o = 0, a = i.length >>> 1, f = 0; f < a; f++)
          (s <<= 1), (s |= (t >>> i[f]) & 1);
        for (f = a; f < i.length; f++) (o <<= 1), (o |= (e >>> i[f]) & 1);
        (r[n + 0] = s >>> 0), (r[n + 1] = o >>> 0);
      }),
        (r.expand = function (t, e, r) {
          var i = 0,
            n = 0;
          i = ((1 & t) << 5) | (t >>> 27);
          for (var s = 23; s >= 15; s -= 4) (i <<= 6), (i |= (t >>> s) & 63);
          for (s = 11; s >= 3; s -= 4) (n |= (t >>> s) & 63), (n <<= 6);
          (n |= ((31 & t) << 1) | (t >>> 31)),
            (e[r + 0] = i >>> 0),
            (e[r + 1] = n >>> 0);
        });
      var n = [
        14, 0, 4, 15, 13, 7, 1, 4, 2, 14, 15, 2, 11, 13, 8, 1, 3, 10, 10, 6, 6,
        12, 12, 11, 5, 9, 9, 5, 0, 3, 7, 8, 4, 15, 1, 12, 14, 8, 8, 2, 13, 4, 6,
        9, 2, 1, 11, 7, 15, 5, 12, 11, 9, 3, 7, 14, 3, 10, 10, 0, 5, 6, 0, 13,
        15, 3, 1, 13, 8, 4, 14, 7, 6, 15, 11, 2, 3, 8, 4, 14, 9, 12, 7, 0, 2, 1,
        13, 10, 12, 6, 0, 9, 5, 11, 10, 5, 0, 13, 14, 8, 7, 10, 11, 1, 10, 3, 4,
        15, 13, 4, 1, 2, 5, 11, 8, 6, 12, 7, 6, 12, 9, 0, 3, 5, 2, 14, 15, 9,
        10, 13, 0, 7, 9, 0, 14, 9, 6, 3, 3, 4, 15, 6, 5, 10, 1, 2, 13, 8, 12, 5,
        7, 14, 11, 12, 4, 11, 2, 15, 8, 1, 13, 1, 6, 10, 4, 13, 9, 0, 8, 6, 15,
        9, 3, 8, 0, 7, 11, 4, 1, 15, 2, 14, 12, 3, 5, 11, 10, 5, 14, 2, 7, 12,
        7, 13, 13, 8, 14, 11, 3, 5, 0, 6, 6, 15, 9, 0, 10, 3, 1, 4, 2, 7, 8, 2,
        5, 12, 11, 1, 12, 10, 4, 14, 15, 9, 10, 3, 6, 15, 9, 0, 0, 6, 12, 10,
        11, 1, 7, 13, 13, 8, 15, 9, 1, 4, 3, 5, 14, 11, 5, 12, 2, 7, 8, 2, 4,
        14, 2, 14, 12, 11, 4, 2, 1, 12, 7, 4, 10, 7, 11, 13, 6, 1, 8, 5, 5, 0,
        3, 15, 15, 10, 13, 3, 0, 9, 14, 8, 9, 6, 4, 11, 2, 8, 1, 12, 11, 7, 10,
        1, 13, 14, 7, 2, 8, 13, 15, 6, 9, 15, 12, 0, 5, 9, 6, 10, 3, 4, 0, 5,
        14, 3, 12, 10, 1, 15, 10, 4, 15, 2, 9, 7, 2, 12, 6, 9, 8, 5, 0, 6, 13,
        1, 3, 13, 4, 14, 14, 0, 7, 11, 5, 3, 11, 8, 9, 4, 14, 3, 15, 2, 5, 12,
        2, 9, 8, 5, 12, 15, 3, 10, 7, 11, 0, 14, 4, 1, 10, 7, 1, 6, 13, 0, 11,
        8, 6, 13, 4, 13, 11, 0, 2, 11, 14, 7, 15, 4, 0, 9, 8, 1, 13, 10, 3, 14,
        12, 3, 9, 5, 7, 12, 5, 2, 10, 15, 6, 8, 1, 6, 1, 6, 4, 11, 11, 13, 13,
        8, 12, 1, 3, 4, 7, 10, 14, 7, 10, 9, 15, 5, 6, 0, 8, 15, 0, 14, 5, 2, 9,
        3, 2, 12, 13, 1, 2, 15, 8, 13, 4, 8, 6, 10, 15, 3, 11, 7, 1, 4, 10, 12,
        9, 5, 3, 6, 14, 11, 5, 0, 0, 14, 12, 9, 7, 2, 7, 2, 11, 1, 4, 14, 1, 7,
        9, 4, 12, 10, 14, 8, 2, 13, 0, 15, 6, 12, 10, 9, 13, 0, 15, 3, 3, 5, 5,
        6, 8, 11,
      ];
      r.substitute = function (t, e) {
        for (var r = 0, i = 0; i < 4; i++) {
          var s = (t >>> (18 - 6 * i)) & 63,
            o = n[64 * i + s];
          (r <<= 4), (r |= o);
        }
        for (i = 0; i < 4; i++) {
          (s = (e >>> (18 - 6 * i)) & 63), (o = n[256 + 64 * i + s]);
          (r <<= 4), (r |= o);
        }
        return r >>> 0;
      };
      var s = [
        16, 25, 12, 11, 3, 20, 4, 15, 31, 17, 9, 6, 27, 14, 1, 22, 30, 24, 8,
        18, 0, 5, 29, 23, 13, 19, 2, 26, 10, 21, 28, 7,
      ];
      (r.permute = function (t) {
        for (var e = 0, r = 0; r < s.length; r++)
          (e <<= 1), (e |= (t >>> s[r]) & 1);
        return e >>> 0;
      }),
        (r.padSplit = function (t, e, r) {
          for (var i = t.toString(2); i.length < e; ) i = "0" + i;
          for (var n = [], s = 0; s < e; s += r) n.push(i.slice(s, s + r));
          return n.join(" ");
        });
    },
    {},
  ],
  78: [
    function (t, e, r) {
      (function (e) {
        (function () {
          function i(t) {
            var r = new e(o[t].prime, "hex"),
              i = new e(o[t].gen, "hex");
            return new a(r, i);
          }
          function n(t, r, i, o) {
            return e.isBuffer(r) || void 0 === f[r]
              ? n(t, "binary", r, i)
              : ((r = r || "binary"),
                (o = o || "binary"),
                (i = i || new e([2])),
                e.isBuffer(i) || (i = new e(i, o)),
                "number" == typeof t
                  ? new a(s(t, i), i, !0)
                  : (e.isBuffer(t) || (t = new e(t, r)), new a(t, i, !0)));
          }
          var s = t("./lib/generatePrime"),
            o = t("./lib/primes.json"),
            a = t("./lib/dh"),
            f = { binary: !0, hex: !0, base64: !0 };
          (r.DiffieHellmanGroup =
            r.createDiffieHellmanGroup =
            r.getDiffieHellman =
              i),
            (r.createDiffieHellman = r.DiffieHellman = n);
        }).call(this);
      }).call(this, t("buffer").Buffer);
    },
    {
      "./lib/dh": 79,
      "./lib/generatePrime": 80,
      "./lib/primes.json": 81,
      buffer: 63,
    },
  ],
  79: [
    function (t, e, r) {
      (function (r) {
        (function () {
          function i(t, e) {
            return (
              (e = e || "utf8"),
              r.isBuffer(t) || (t = new r(t, e)),
              (this._pub = new f(t)),
              this
            );
          }
          function n(t, e) {
            return (
              (e = e || "utf8"),
              r.isBuffer(t) || (t = new r(t, e)),
              (this._priv = new f(t)),
              this
            );
          }
          function s(t, e) {
            var r = e.toString("hex"),
              i = [r, t.toString(16)].join("_");
            if (i in g) return g[i];
            var n,
              s = 0;
            if (t.isEven() || !m.simpleSieve || !m.fermatTest(t) || !u.test(t))
              return (
                (s += 1), (s += "02" === r || "05" === r ? 8 : 4), (g[i] = s), s
              );
            switch ((u.test(t.shrn(1)) || (s += 2), r)) {
              case "02":
                t.mod(c).cmp(d) && (s += 8);
                break;
              case "05":
                (n = t.mod(l)), n.cmp(p) && n.cmp(b) && (s += 8);
                break;
              default:
                s += 4;
            }
            return (g[i] = s), s;
          }
          function o(t, e, r) {
            this.setGenerator(e),
              (this.__prime = new f(t)),
              (this._prime = f.mont(this.__prime)),
              (this._primeLen = t.length),
              (this._pub = void 0),
              (this._priv = void 0),
              (this._primeCode = void 0),
              r
                ? ((this.setPublicKey = i), (this.setPrivateKey = n))
                : (this._primeCode = 8);
          }
          function a(t, e) {
            var i = new r(t.toArray());
            return e ? i.toString(e) : i;
          }
          var f = t("bn.js"),
            h = t("miller-rabin"),
            u = new h(),
            c = new f(24),
            d = new f(11),
            l = new f(10),
            p = new f(3),
            b = new f(7),
            m = t("./generatePrime"),
            y = t("randombytes");
          e.exports = o;
          var g = {};
          Object.defineProperty(o.prototype, "verifyError", {
            enumerable: !0,
            get: function () {
              return (
                "number" != typeof this._primeCode &&
                  (this._primeCode = s(this.__prime, this.__gen)),
                this._primeCode
              );
            },
          }),
            (o.prototype.generateKeys = function () {
              return (
                this._priv || (this._priv = new f(y(this._primeLen))),
                (this._pub = this._gen
                  .toRed(this._prime)
                  .redPow(this._priv)
                  .fromRed()),
                this.getPublicKey()
              );
            }),
            (o.prototype.computeSecret = function (t) {
              (t = new f(t)), (t = t.toRed(this._prime));
              var e = t.redPow(this._priv).fromRed(),
                i = new r(e.toArray()),
                n = this.getPrime();
              if (i.length < n.length) {
                var s = new r(n.length - i.length);
                s.fill(0), (i = r.concat([s, i]));
              }
              return i;
            }),
            (o.prototype.getPublicKey = function (t) {
              return a(this._pub, t);
            }),
            (o.prototype.getPrivateKey = function (t) {
              return a(this._priv, t);
            }),
            (o.prototype.getPrime = function (t) {
              return a(this.__prime, t);
            }),
            (o.prototype.getGenerator = function (t) {
              return a(this._gen, t);
            }),
            (o.prototype.setGenerator = function (t, e) {
              return (
                (e = e || "utf8"),
                r.isBuffer(t) || (t = new r(t, e)),
                (this.__gen = t),
                (this._gen = new f(t)),
                this
              );
            });
        }).call(this);
      }).call(this, t("buffer").Buffer);
    },
    {
      "./generatePrime": 80,
      "bn.js": 82,
      buffer: 63,
      "miller-rabin": 134,
      randombytes: 157,
    },
  ],
  80: [
    function (t, e, r) {
      function i() {
        if (null !== v) return v;
        var t = 1048576,
          e = [];
        e[0] = 2;
        for (var r = 1, i = 3; i < t; i += 2) {
          for (
            var n = Math.ceil(Math.sqrt(i)), s = 0;
            s < r && e[s] <= n && i % e[s] != 0;
            s++
          );
          (r !== s && e[s] <= n) || (e[r++] = i);
        }
        return (v = e), e;
      }
      function n(t) {
        for (var e = i(), r = 0; r < e.length; r++)
          if (0 === t.modn(e[r])) return 0 === t.cmpn(e[r]);
        return !0;
      }
      function s(t) {
        var e = f.mont(t);
        return 0 === l.toRed(e).redPow(t.subn(1)).fromRed().cmpn(1);
      }
      function o(t, e) {
        if (t < 16) return new f(2 === e || 5 === e ? [140, 123] : [140, 39]);
        var r, i;
        for (e = new f(e); ; ) {
          for (r = new f(a(Math.ceil(t / 8))); r.bitLength() > t; ) r.ishrn(1);
          if ((r.isEven() && r.iadd(d), r.testn(1) || r.iadd(l), e.cmp(l))) {
            if (!e.cmp(p)) for (; r.mod(b).cmp(m); ) r.iadd(g);
          } else for (; r.mod(h).cmp(y); ) r.iadd(g);
          if (
            ((i = r.shrn(1)),
            n(i) && n(r) && s(i) && s(r) && c.test(i) && c.test(r))
          )
            return r;
        }
      }
      var a = t("randombytes");
      (e.exports = o), (o.simpleSieve = n), (o.fermatTest = s);
      var f = t("bn.js"),
        h = new f(24),
        u = t("miller-rabin"),
        c = new u(),
        d = new f(1),
        l = new f(2),
        p = new f(5),
        b = (new f(16), new f(8), new f(10)),
        m = new f(3),
        y = (new f(7), new f(11)),
        g = new f(4),
        v = (new f(12), null);
    },
    { "bn.js": 82, "miller-rabin": 134, randombytes: 157 },
  ],
  81: [
    function (t, e, r) {
      e.exports = {
        modp1: {
          gen: "02",
          prime:
            "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a63a3620ffffffffffffffff",
        },
        modp2: {
          gen: "02",
          prime:
            "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece65381ffffffffffffffff",
        },
        modp5: {
          gen: "02",
          prime:
            "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca237327ffffffffffffffff",
        },
        modp14: {
          gen: "02",
          prime:
            "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aacaa68ffffffffffffffff",
        },
        modp15: {
          gen: "02",
          prime:
            "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a93ad2caffffffffffffffff",
        },
        modp16: {
          gen: "02",
          prime:
            "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c934063199ffffffffffffffff",
        },
        modp17: {
          gen: "02",
          prime:
            "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dcc4024ffffffffffffffff",
        },
        modp18: {
          gen: "02",
          prime:
            "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dbe115974a3926f12fee5e438777cb6a932df8cd8bec4d073b931ba3bc832b68d9dd300741fa7bf8afc47ed2576f6936ba424663aab639c5ae4f5683423b4742bf1c978238f16cbe39d652de3fdb8befc848ad922222e04a4037c0713eb57a81a23f0c73473fc646cea306b4bcbc8862f8385ddfa9d4b7fa2c087e879683303ed5bdd3a062b3cf5b3a278a66d2a13f83f44f82ddf310ee074ab6a364597e899a0255dc164f31cc50846851df9ab48195ded7ea1b1d510bd7ee74d73faf36bc31ecfa268359046f4eb879f924009438b481c6cd7889a002ed5ee382bc9190da6fc026e479558e4475677e9aa9e3050e2765694dfc81f56e880b96e7160c980dd98edd3dfffffffffffffffff",
        },
      };
    },
    {},
  ],
  82: [
    function (t, e, r) {
      arguments[4][15][0].apply(r, arguments);
    },
    { buffer: 19, dup: 15 },
  ],
  83: [
    function (t, e, r) {
      "use strict";
      var i = r;
      (i.version = t("../package.json").version),
        (i.utils = t("./elliptic/utils")),
        (i.rand = t("brorand")),
        (i.curve = t("./elliptic/curve")),
        (i.curves = t("./elliptic/curves")),
        (i.ec = t("./elliptic/ec")),
        (i.eddsa = t("./elliptic/eddsa"));
    },
    {
      "../package.json": 99,
      "./elliptic/curve": 86,
      "./elliptic/curves": 89,
      "./elliptic/ec": 90,
      "./elliptic/eddsa": 93,
      "./elliptic/utils": 97,
      brorand: 18,
    },
  ],
  84: [
    function (t, e, r) {
      "use strict";
      function i(t, e) {
        (this.type = t),
          (this.p = new s(e.p, 16)),
          (this.red = e.prime ? s.red(e.prime) : s.mont(this.p)),
          (this.zero = new s(0).toRed(this.red)),
          (this.one = new s(1).toRed(this.red)),
          (this.two = new s(2).toRed(this.red)),
          (this.n = e.n && new s(e.n, 16)),
          (this.g = e.g && this.pointFromJSON(e.g, e.gRed)),
          (this._wnafT1 = new Array(4)),
          (this._wnafT2 = new Array(4)),
          (this._wnafT3 = new Array(4)),
          (this._wnafT4 = new Array(4)),
          (this._bitLength = this.n ? this.n.bitLength() : 0);
        var r = this.n && this.p.div(this.n);
        !r || r.cmpn(100) > 0
          ? (this.redN = null)
          : ((this._maxwellTrick = !0), (this.redN = this.n.toRed(this.red)));
      }
      function n(t, e) {
        (this.curve = t), (this.type = e), (this.precomputed = null);
      }
      var s = t("bn.js"),
        o = t("../utils"),
        a = o.getNAF,
        f = o.getJSF,
        h = o.assert;
      (e.exports = i),
        (i.prototype.point = function () {
          throw new Error("Not implemented");
        }),
        (i.prototype.validate = function () {
          throw new Error("Not implemented");
        }),
        (i.prototype._fixedNafMul = function (t, e) {
          h(t.precomputed);
          var r = t._getDoubles(),
            i = a(e, 1, this._bitLength),
            n = (1 << (r.step + 1)) - (r.step % 2 == 0 ? 2 : 1);
          n /= 3;
          var s,
            o,
            f = [];
          for (s = 0; s < i.length; s += r.step) {
            o = 0;
            for (var u = s + r.step - 1; u >= s; u--) o = (o << 1) + i[u];
            f.push(o);
          }
          for (
            var c = this.jpoint(null, null, null),
              d = this.jpoint(null, null, null),
              l = n;
            l > 0;
            l--
          ) {
            for (s = 0; s < f.length; s++)
              (o = f[s]),
                o === l
                  ? (d = d.mixedAdd(r.points[s]))
                  : o === -l && (d = d.mixedAdd(r.points[s].neg()));
            c = c.add(d);
          }
          return c.toP();
        }),
        (i.prototype._wnafMul = function (t, e) {
          var r = 4,
            i = t._getNAFPoints(r);
          r = i.wnd;
          for (
            var n = i.points,
              s = a(e, r, this._bitLength),
              o = this.jpoint(null, null, null),
              f = s.length - 1;
            f >= 0;
            f--
          ) {
            for (var u = 0; f >= 0 && 0 === s[f]; f--) u++;
            if ((f >= 0 && u++, (o = o.dblp(u)), f < 0)) break;
            var c = s[f];
            h(0 !== c),
              (o =
                "affine" === t.type
                  ? c > 0
                    ? o.mixedAdd(n[(c - 1) >> 1])
                    : o.mixedAdd(n[(-c - 1) >> 1].neg())
                  : c > 0
                  ? o.add(n[(c - 1) >> 1])
                  : o.add(n[(-c - 1) >> 1].neg()));
          }
          return "affine" === t.type ? o.toP() : o;
        }),
        (i.prototype._wnafMulAdd = function (t, e, r, i, n) {
          var s,
            o,
            h,
            u = this._wnafT1,
            c = this._wnafT2,
            d = this._wnafT3,
            l = 0;
          for (s = 0; s < i; s++) {
            h = e[s];
            var p = h._getNAFPoints(t);
            (u[s] = p.wnd), (c[s] = p.points);
          }
          for (s = i - 1; s >= 1; s -= 2) {
            var b = s - 1,
              m = s;
            if (1 === u[b] && 1 === u[m]) {
              var y = [e[b], null, null, e[m]];
              0 === e[b].y.cmp(e[m].y)
                ? ((y[1] = e[b].add(e[m])),
                  (y[2] = e[b].toJ().mixedAdd(e[m].neg())))
                : 0 === e[b].y.cmp(e[m].y.redNeg())
                ? ((y[1] = e[b].toJ().mixedAdd(e[m])),
                  (y[2] = e[b].add(e[m].neg())))
                : ((y[1] = e[b].toJ().mixedAdd(e[m])),
                  (y[2] = e[b].toJ().mixedAdd(e[m].neg())));
              var g = [-3, -1, -5, -7, 0, 7, 5, 1, 3],
                v = f(r[b], r[m]);
              for (
                l = Math.max(v[0].length, l),
                  d[b] = new Array(l),
                  d[m] = new Array(l),
                  o = 0;
                o < l;
                o++
              ) {
                var w = 0 | v[0][o],
                  _ = 0 | v[1][o];
                (d[b][o] = g[3 * (w + 1) + (_ + 1)]), (d[m][o] = 0), (c[b] = y);
              }
            } else
              (d[b] = a(r[b], u[b], this._bitLength)),
                (d[m] = a(r[m], u[m], this._bitLength)),
                (l = Math.max(d[b].length, l)),
                (l = Math.max(d[m].length, l));
          }
          var M = this.jpoint(null, null, null),
            S = this._wnafT4;
          for (s = l; s >= 0; s--) {
            for (var E = 0; s >= 0; ) {
              var k = !0;
              for (o = 0; o < i; o++)
                (S[o] = 0 | d[o][s]), 0 !== S[o] && (k = !1);
              if (!k) break;
              E++, s--;
            }
            if ((s >= 0 && E++, (M = M.dblp(E)), s < 0)) break;
            for (o = 0; o < i; o++) {
              var A = S[o];
              0 !== A &&
                (A > 0
                  ? (h = c[o][(A - 1) >> 1])
                  : A < 0 && (h = c[o][(-A - 1) >> 1].neg()),
                (M = "affine" === h.type ? M.mixedAdd(h) : M.add(h)));
            }
          }
          for (s = 0; s < i; s++) c[s] = null;
          return n ? M : M.toP();
        }),
        (i.BasePoint = n),
        (n.prototype.eq = function () {
          throw new Error("Not implemented");
        }),
        (n.prototype.validate = function () {
          return this.curve.validate(this);
        }),
        (i.prototype.decodePoint = function (t, e) {
          t = o.toArray(t, e);
          var r = this.p.byteLength();
          if (
            (4 === t[0] || 6 === t[0] || 7 === t[0]) &&
            t.length - 1 == 2 * r
          ) {
            6 === t[0]
              ? h(t[t.length - 1] % 2 == 0)
              : 7 === t[0] && h(t[t.length - 1] % 2 == 1);
            var i = this.point(t.slice(1, 1 + r), t.slice(1 + r, 1 + 2 * r));
            return i;
          }
          if ((2 === t[0] || 3 === t[0]) && t.length - 1 === r)
            return this.pointFromX(t.slice(1, 1 + r), 3 === t[0]);
          throw new Error("Unknown point format");
        }),
        (n.prototype.encodeCompressed = function (t) {
          return this.encode(t, !0);
        }),
        (n.prototype._encode = function (t) {
          var e = this.curve.p.byteLength(),
            r = this.getX().toArray("be", e);
          return t
            ? [this.getY().isEven() ? 2 : 3].concat(r)
            : [4].concat(r, this.getY().toArray("be", e));
        }),
        (n.prototype.encode = function (t, e) {
          return o.encode(this._encode(e), t);
        }),
        (n.prototype.precompute = function (t) {
          if (this.precomputed) return this;
          var e = { doubles: null, naf: null, beta: null };
          return (
            (e.naf = this._getNAFPoints(8)),
            (e.doubles = this._getDoubles(4, t)),
            (e.beta = this._getBeta()),
            (this.precomputed = e),
            this
          );
        }),
        (n.prototype._hasDoubles = function (t) {
          if (!this.precomputed) return !1;
          var e = this.precomputed.doubles;
          return (
            !!e && e.points.length >= Math.ceil((t.bitLength() + 1) / e.step)
          );
        }),
        (n.prototype._getDoubles = function (t, e) {
          if (this.precomputed && this.precomputed.doubles)
            return this.precomputed.doubles;
          for (var r = [this], i = this, n = 0; n < e; n += t) {
            for (var s = 0; s < t; s++) i = i.dbl();
            r.push(i);
          }
          return { step: t, points: r };
        }),
        (n.prototype._getNAFPoints = function (t) {
          if (this.precomputed && this.precomputed.naf)
            return this.precomputed.naf;
          for (
            var e = [this],
              r = (1 << t) - 1,
              i = 1 === r ? null : this.dbl(),
              n = 1;
            n < r;
            n++
          )
            e[n] = e[n - 1].add(i);
          return { wnd: t, points: e };
        }),
        (n.prototype._getBeta = function () {
          return null;
        }),
        (n.prototype.dblp = function (t) {
          for (var e = this, r = 0; r < t; r++) e = e.dbl();
          return e;
        });
    },
    { "../utils": 97, "bn.js": 98 },
  ],
  85: [
    function (t, e, r) {
      "use strict";
      function i(t) {
        (this.twisted = 1 != (0 | t.a)),
          (this.mOneA = this.twisted && -1 == (0 | t.a)),
          (this.extended = this.mOneA),
          f.call(this, "edwards", t),
          (this.a = new o(t.a, 16).umod(this.red.m)),
          (this.a = this.a.toRed(this.red)),
          (this.c = new o(t.c, 16).toRed(this.red)),
          (this.c2 = this.c.redSqr()),
          (this.d = new o(t.d, 16).toRed(this.red)),
          (this.dd = this.d.redAdd(this.d)),
          h(!this.twisted || 0 === this.c.fromRed().cmpn(1)),
          (this.oneC = 1 == (0 | t.c));
      }
      function n(t, e, r, i, n) {
        f.BasePoint.call(this, t, "projective"),
          null === e && null === r && null === i
            ? ((this.x = this.curve.zero),
              (this.y = this.curve.one),
              (this.z = this.curve.one),
              (this.t = this.curve.zero),
              (this.zOne = !0))
            : ((this.x = new o(e, 16)),
              (this.y = new o(r, 16)),
              (this.z = i ? new o(i, 16) : this.curve.one),
              (this.t = n && new o(n, 16)),
              this.x.red || (this.x = this.x.toRed(this.curve.red)),
              this.y.red || (this.y = this.y.toRed(this.curve.red)),
              this.z.red || (this.z = this.z.toRed(this.curve.red)),
              this.t && !this.t.red && (this.t = this.t.toRed(this.curve.red)),
              (this.zOne = this.z === this.curve.one),
              this.curve.extended &&
                !this.t &&
                ((this.t = this.x.redMul(this.y)),
                this.zOne || (this.t = this.t.redMul(this.z.redInvm()))));
      }
      var s = t("../utils"),
        o = t("bn.js"),
        a = t("inherits"),
        f = t("./base"),
        h = s.assert;
      a(i, f),
        (e.exports = i),
        (i.prototype._mulA = function (t) {
          return this.mOneA ? t.redNeg() : this.a.redMul(t);
        }),
        (i.prototype._mulC = function (t) {
          return this.oneC ? t : this.c.redMul(t);
        }),
        (i.prototype.jpoint = function (t, e, r, i) {
          return this.point(t, e, r, i);
        }),
        (i.prototype.pointFromX = function (t, e) {
          (t = new o(t, 16)), t.red || (t = t.toRed(this.red));
          var r = t.redSqr(),
            i = this.c2.redSub(this.a.redMul(r)),
            n = this.one.redSub(this.c2.redMul(this.d).redMul(r)),
            s = i.redMul(n.redInvm()),
            a = s.redSqrt();
          if (0 !== a.redSqr().redSub(s).cmp(this.zero))
            throw new Error("invalid point");
          var f = a.fromRed().isOdd();
          return ((e && !f) || (!e && f)) && (a = a.redNeg()), this.point(t, a);
        }),
        (i.prototype.pointFromY = function (t, e) {
          (t = new o(t, 16)), t.red || (t = t.toRed(this.red));
          var r = t.redSqr(),
            i = r.redSub(this.c2),
            n = r.redMul(this.d).redMul(this.c2).redSub(this.a),
            s = i.redMul(n.redInvm());
          if (0 === s.cmp(this.zero)) {
            if (e) throw new Error("invalid point");
            return this.point(this.zero, t);
          }
          var a = s.redSqrt();
          if (0 !== a.redSqr().redSub(s).cmp(this.zero))
            throw new Error("invalid point");
          return (
            a.fromRed().isOdd() !== e && (a = a.redNeg()), this.point(a, t)
          );
        }),
        (i.prototype.validate = function (t) {
          if (t.isInfinity()) return !0;
          t.normalize();
          var e = t.x.redSqr(),
            r = t.y.redSqr(),
            i = e.redMul(this.a).redAdd(r),
            n = this.c2.redMul(this.one.redAdd(this.d.redMul(e).redMul(r)));
          return 0 === i.cmp(n);
        }),
        a(n, f.BasePoint),
        (i.prototype.pointFromJSON = function (t) {
          return n.fromJSON(this, t);
        }),
        (i.prototype.point = function (t, e, r, i) {
          return new n(this, t, e, r, i);
        }),
        (n.fromJSON = function (t, e) {
          return new n(t, e[0], e[1], e[2]);
        }),
        (n.prototype.inspect = function () {
          return this.isInfinity()
            ? "<EC Point Infinity>"
            : "<EC Point x: " +
                this.x.fromRed().toString(16, 2) +
                " y: " +
                this.y.fromRed().toString(16, 2) +
                " z: " +
                this.z.fromRed().toString(16, 2) +
                ">";
        }),
        (n.prototype.isInfinity = function () {
          return (
            0 === this.x.cmpn(0) &&
            (0 === this.y.cmp(this.z) ||
              (this.zOne && 0 === this.y.cmp(this.curve.c)))
          );
        }),
        (n.prototype._extDbl = function () {
          var t = this.x.redSqr(),
            e = this.y.redSqr(),
            r = this.z.redSqr();
          r = r.redIAdd(r);
          var i = this.curve._mulA(t),
            n = this.x.redAdd(this.y).redSqr().redISub(t).redISub(e),
            s = i.redAdd(e),
            o = s.redSub(r),
            a = i.redSub(e),
            f = n.redMul(o),
            h = s.redMul(a),
            u = n.redMul(a),
            c = o.redMul(s);
          return this.curve.point(f, h, c, u);
        }),
        (n.prototype._projDbl = function () {
          var t,
            e,
            r,
            i,
            n,
            s,
            o = this.x.redAdd(this.y).redSqr(),
            a = this.x.redSqr(),
            f = this.y.redSqr();
          if (this.curve.twisted) {
            i = this.curve._mulA(a);
            var h = i.redAdd(f);
            this.zOne
              ? ((t = o.redSub(a).redSub(f).redMul(h.redSub(this.curve.two))),
                (e = h.redMul(i.redSub(f))),
                (r = h.redSqr().redSub(h).redSub(h)))
              : ((n = this.z.redSqr()),
                (s = h.redSub(n).redISub(n)),
                (t = o.redSub(a).redISub(f).redMul(s)),
                (e = h.redMul(i.redSub(f))),
                (r = h.redMul(s)));
          } else
            (i = a.redAdd(f)),
              (n = this.curve._mulC(this.z).redSqr()),
              (s = i.redSub(n).redSub(n)),
              (t = this.curve._mulC(o.redISub(i)).redMul(s)),
              (e = this.curve._mulC(i).redMul(a.redISub(f))),
              (r = i.redMul(s));
          return this.curve.point(t, e, r);
        }),
        (n.prototype.dbl = function () {
          return this.isInfinity()
            ? this
            : this.curve.extended
            ? this._extDbl()
            : this._projDbl();
        }),
        (n.prototype._extAdd = function (t) {
          var e = this.y.redSub(this.x).redMul(t.y.redSub(t.x)),
            r = this.y.redAdd(this.x).redMul(t.y.redAdd(t.x)),
            i = this.t.redMul(this.curve.dd).redMul(t.t),
            n = this.z.redMul(t.z.redAdd(t.z)),
            s = r.redSub(e),
            o = n.redSub(i),
            a = n.redAdd(i),
            f = r.redAdd(e),
            h = s.redMul(o),
            u = a.redMul(f),
            c = s.redMul(f),
            d = o.redMul(a);
          return this.curve.point(h, u, d, c);
        }),
        (n.prototype._projAdd = function (t) {
          var e,
            r,
            i = this.z.redMul(t.z),
            n = i.redSqr(),
            s = this.x.redMul(t.x),
            o = this.y.redMul(t.y),
            a = this.curve.d.redMul(s).redMul(o),
            f = n.redSub(a),
            h = n.redAdd(a),
            u = this.x
              .redAdd(this.y)
              .redMul(t.x.redAdd(t.y))
              .redISub(s)
              .redISub(o),
            c = i.redMul(f).redMul(u);
          return (
            this.curve.twisted
              ? ((e = i.redMul(h).redMul(o.redSub(this.curve._mulA(s)))),
                (r = f.redMul(h)))
              : ((e = i.redMul(h).redMul(o.redSub(s))),
                (r = this.curve._mulC(f).redMul(h))),
            this.curve.point(c, e, r)
          );
        }),
        (n.prototype.add = function (t) {
          return this.isInfinity()
            ? t
            : t.isInfinity()
            ? this
            : this.curve.extended
            ? this._extAdd(t)
            : this._projAdd(t);
        }),
        (n.prototype.mul = function (t) {
          return this._hasDoubles(t)
            ? this.curve._fixedNafMul(this, t)
            : this.curve._wnafMul(this, t);
        }),
        (n.prototype.mulAdd = function (t, e, r) {
          return this.curve._wnafMulAdd(1, [this, e], [t, r], 2, !1);
        }),
        (n.prototype.jmulAdd = function (t, e, r) {
          return this.curve._wnafMulAdd(1, [this, e], [t, r], 2, !0);
        }),
        (n.prototype.normalize = function () {
          if (this.zOne) return this;
          var t = this.z.redInvm();
          return (
            (this.x = this.x.redMul(t)),
            (this.y = this.y.redMul(t)),
            this.t && (this.t = this.t.redMul(t)),
            (this.z = this.curve.one),
            (this.zOne = !0),
            this
          );
        }),
        (n.prototype.neg = function () {
          return this.curve.point(
            this.x.redNeg(),
            this.y,
            this.z,
            this.t && this.t.redNeg()
          );
        }),
        (n.prototype.getX = function () {
          return this.normalize(), this.x.fromRed();
        }),
        (n.prototype.getY = function () {
          return this.normalize(), this.y.fromRed();
        }),
        (n.prototype.eq = function (t) {
          return (
            this === t ||
            (0 === this.getX().cmp(t.getX()) && 0 === this.getY().cmp(t.getY()))
          );
        }),
        (n.prototype.eqXToP = function (t) {
          var e = t.toRed(this.curve.red).redMul(this.z);
          if (0 === this.x.cmp(e)) return !0;
          for (var r = t.clone(), i = this.curve.redN.redMul(this.z); ; ) {
            if ((r.iadd(this.curve.n), r.cmp(this.curve.p) >= 0)) return !1;
            if ((e.redIAdd(i), 0 === this.x.cmp(e))) return !0;
          }
        }),
        (n.prototype.toP = n.prototype.normalize),
        (n.prototype.mixedAdd = n.prototype.add);
    },
    { "../utils": 97, "./base": 84, "bn.js": 98, inherits: 132 },
  ],
  86: [
    function (t, e, r) {
      "use strict";
      var i = r;
      (i.base = t("./base")),
        (i.short = t("./short")),
        (i.mont = t("./mont")),
        (i.edwards = t("./edwards"));
    },
    { "./base": 84, "./edwards": 85, "./mont": 87, "./short": 88 },
  ],
  87: [
    function (t, e, r) {
      "use strict";
      function i(t) {
        a.call(this, "mont", t),
          (this.a = new s(t.a, 16).toRed(this.red)),
          (this.b = new s(t.b, 16).toRed(this.red)),
          (this.i4 = new s(4).toRed(this.red).redInvm()),
          (this.two = new s(2).toRed(this.red)),
          (this.a24 = this.i4.redMul(this.a.redAdd(this.two)));
      }
      function n(t, e, r) {
        a.BasePoint.call(this, t, "projective"),
          null === e && null === r
            ? ((this.x = this.curve.one), (this.z = this.curve.zero))
            : ((this.x = new s(e, 16)),
              (this.z = new s(r, 16)),
              this.x.red || (this.x = this.x.toRed(this.curve.red)),
              this.z.red || (this.z = this.z.toRed(this.curve.red)));
      }
      var s = t("bn.js"),
        o = t("inherits"),
        a = t("./base"),
        f = t("../utils");
      o(i, a),
        (e.exports = i),
        (i.prototype.validate = function (t) {
          var e = t.normalize().x,
            r = e.redSqr(),
            i = r.redMul(e).redAdd(r.redMul(this.a)).redAdd(e),
            n = i.redSqrt();
          return 0 === n.redSqr().cmp(i);
        }),
        o(n, a.BasePoint),
        (i.prototype.decodePoint = function (t, e) {
          return this.point(f.toArray(t, e), 1);
        }),
        (i.prototype.point = function (t, e) {
          return new n(this, t, e);
        }),
        (i.prototype.pointFromJSON = function (t) {
          return n.fromJSON(this, t);
        }),
        (n.prototype.precompute = function () {}),
        (n.prototype._encode = function () {
          return this.getX().toArray("be", this.curve.p.byteLength());
        }),
        (n.fromJSON = function (t, e) {
          return new n(t, e[0], e[1] || t.one);
        }),
        (n.prototype.inspect = function () {
          return this.isInfinity()
            ? "<EC Point Infinity>"
            : "<EC Point x: " +
                this.x.fromRed().toString(16, 2) +
                " z: " +
                this.z.fromRed().toString(16, 2) +
                ">";
        }),
        (n.prototype.isInfinity = function () {
          return 0 === this.z.cmpn(0);
        }),
        (n.prototype.dbl = function () {
          var t = this.x.redAdd(this.z),
            e = t.redSqr(),
            r = this.x.redSub(this.z),
            i = r.redSqr(),
            n = e.redSub(i),
            s = e.redMul(i),
            o = n.redMul(i.redAdd(this.curve.a24.redMul(n)));
          return this.curve.point(s, o);
        }),
        (n.prototype.add = function () {
          throw new Error("Not supported on Montgomery curve");
        }),
        (n.prototype.diffAdd = function (t, e) {
          var r = this.x.redAdd(this.z),
            i = this.x.redSub(this.z),
            n = t.x.redAdd(t.z),
            s = t.x.redSub(t.z),
            o = s.redMul(r),
            a = n.redMul(i),
            f = e.z.redMul(o.redAdd(a).redSqr()),
            h = e.x.redMul(o.redISub(a).redSqr());
          return this.curve.point(f, h);
        }),
        (n.prototype.mul = function (t) {
          for (
            var e = t.clone(),
              r = this,
              i = this.curve.point(null, null),
              n = this,
              s = [];
            0 !== e.cmpn(0);
            e.iushrn(1)
          )
            s.push(e.andln(1));
          for (var o = s.length - 1; o >= 0; o--)
            0 === s[o]
              ? ((r = r.diffAdd(i, n)), (i = i.dbl()))
              : ((i = r.diffAdd(i, n)), (r = r.dbl()));
          return i;
        }),
        (n.prototype.mulAdd = function () {
          throw new Error("Not supported on Montgomery curve");
        }),
        (n.prototype.jumlAdd = function () {
          throw new Error("Not supported on Montgomery curve");
        }),
        (n.prototype.eq = function (t) {
          return 0 === this.getX().cmp(t.getX());
        }),
        (n.prototype.normalize = function () {
          return (
            (this.x = this.x.redMul(this.z.redInvm())),
            (this.z = this.curve.one),
            this
          );
        }),
        (n.prototype.getX = function () {
          return this.normalize(), this.x.fromRed();
        });
    },
    { "../utils": 97, "./base": 84, "bn.js": 98, inherits: 132 },
  ],
  88: [
    function (t, e, r) {
      "use strict";
      function i(t) {
        h.call(this, "short", t),
          (this.a = new a(t.a, 16).toRed(this.red)),
          (this.b = new a(t.b, 16).toRed(this.red)),
          (this.tinv = this.two.redInvm()),
          (this.zeroA = 0 === this.a.fromRed().cmpn(0)),
          (this.threeA = 0 === this.a.fromRed().sub(this.p).cmpn(-3)),
          (this.endo = this._getEndomorphism(t)),
          (this._endoWnafT1 = new Array(4)),
          (this._endoWnafT2 = new Array(4));
      }
      function n(t, e, r, i) {
        h.BasePoint.call(this, t, "affine"),
          null === e && null === r
            ? ((this.x = null), (this.y = null), (this.inf = !0))
            : ((this.x = new a(e, 16)),
              (this.y = new a(r, 16)),
              i &&
                (this.x.forceRed(this.curve.red),
                this.y.forceRed(this.curve.red)),
              this.x.red || (this.x = this.x.toRed(this.curve.red)),
              this.y.red || (this.y = this.y.toRed(this.curve.red)),
              (this.inf = !1));
      }
      function s(t, e, r, i) {
        h.BasePoint.call(this, t, "jacobian"),
          null === e && null === r && null === i
            ? ((this.x = this.curve.one),
              (this.y = this.curve.one),
              (this.z = new a(0)))
            : ((this.x = new a(e, 16)),
              (this.y = new a(r, 16)),
              (this.z = new a(i, 16))),
          this.x.red || (this.x = this.x.toRed(this.curve.red)),
          this.y.red || (this.y = this.y.toRed(this.curve.red)),
          this.z.red || (this.z = this.z.toRed(this.curve.red)),
          (this.zOne = this.z === this.curve.one);
      }
      var o = t("../utils"),
        a = t("bn.js"),
        f = t("inherits"),
        h = t("./base"),
        u = o.assert;
      f(i, h),
        (e.exports = i),
        (i.prototype._getEndomorphism = function (t) {
          if (this.zeroA && this.g && this.n && 1 === this.p.modn(3)) {
            var e, r, i;
            if (t.beta) e = new a(t.beta, 16).toRed(this.red);
            else {
              var n = this._getEndoRoots(this.p);
              (e = n[0].cmp(n[1]) < 0 ? n[0] : n[1]), (e = e.toRed(this.red));
            }
            if (t.lambda) r = new a(t.lambda, 16);
            else {
              var s = this._getEndoRoots(this.n);
              0 === this.g.mul(s[0]).x.cmp(this.g.x.redMul(e))
                ? (r = s[0])
                : ((r = s[1]),
                  u(0 === this.g.mul(r).x.cmp(this.g.x.redMul(e))));
            }
            return (
              (i = t.basis
                ? t.basis.map(function (t) {
                    return { a: new a(t.a, 16), b: new a(t.b, 16) };
                  })
                : this._getEndoBasis(r)),
              { beta: e, lambda: r, basis: i }
            );
          }
        }),
        (i.prototype._getEndoRoots = function (t) {
          var e = t === this.p ? this.red : a.mont(t),
            r = new a(2).toRed(e).redInvm(),
            i = r.redNeg(),
            n = new a(3).toRed(e).redNeg().redSqrt().redMul(r),
            s = i.redAdd(n).fromRed(),
            o = i.redSub(n).fromRed();
          return [s, o];
        }),
        (i.prototype._getEndoBasis = function (t) {
          for (
            var e,
              r,
              i,
              n,
              s,
              o,
              f,
              h,
              u,
              c = this.n.ushrn(Math.floor(this.n.bitLength() / 2)),
              d = t,
              l = this.n.clone(),
              p = new a(1),
              b = new a(0),
              m = new a(0),
              y = new a(1),
              g = 0;
            0 !== d.cmpn(0);

          ) {
            var v = l.div(d);
            (h = l.sub(v.mul(d))), (u = m.sub(v.mul(p)));
            var w = y.sub(v.mul(b));
            if (!i && h.cmp(c) < 0)
              (e = f.neg()), (r = p), (i = h.neg()), (n = u);
            else if (i && 2 == ++g) break;
            (f = h), (l = d), (d = h), (m = p), (p = u), (y = b), (b = w);
          }
          (s = h.neg()), (o = u);
          var _ = i.sqr().add(n.sqr()),
            M = s.sqr().add(o.sqr());
          return (
            M.cmp(_) >= 0 && ((s = e), (o = r)),
            i.negative && ((i = i.neg()), (n = n.neg())),
            s.negative && ((s = s.neg()), (o = o.neg())),
            [
              { a: i, b: n },
              { a: s, b: o },
            ]
          );
        }),
        (i.prototype._endoSplit = function (t) {
          var e = this.endo.basis,
            r = e[0],
            i = e[1],
            n = i.b.mul(t).divRound(this.n),
            s = r.b.neg().mul(t).divRound(this.n),
            o = n.mul(r.a),
            a = s.mul(i.a),
            f = n.mul(r.b),
            h = s.mul(i.b),
            u = t.sub(o).sub(a),
            c = f.add(h).neg();
          return { k1: u, k2: c };
        }),
        (i.prototype.pointFromX = function (t, e) {
          (t = new a(t, 16)), t.red || (t = t.toRed(this.red));
          var r = t
              .redSqr()
              .redMul(t)
              .redIAdd(t.redMul(this.a))
              .redIAdd(this.b),
            i = r.redSqrt();
          if (0 !== i.redSqr().redSub(r).cmp(this.zero))
            throw new Error("invalid point");
          var n = i.fromRed().isOdd();
          return ((e && !n) || (!e && n)) && (i = i.redNeg()), this.point(t, i);
        }),
        (i.prototype.validate = function (t) {
          if (t.inf) return !0;
          var e = t.x,
            r = t.y,
            i = this.a.redMul(e),
            n = e.redSqr().redMul(e).redIAdd(i).redIAdd(this.b);
          return 0 === r.redSqr().redISub(n).cmpn(0);
        }),
        (i.prototype._endoWnafMulAdd = function (t, e, r) {
          for (
            var i = this._endoWnafT1, n = this._endoWnafT2, s = 0;
            s < t.length;
            s++
          ) {
            var o = this._endoSplit(e[s]),
              a = t[s],
              f = a._getBeta();
            o.k1.negative && (o.k1.ineg(), (a = a.neg(!0))),
              o.k2.negative && (o.k2.ineg(), (f = f.neg(!0))),
              (i[2 * s] = a),
              (i[2 * s + 1] = f),
              (n[2 * s] = o.k1),
              (n[2 * s + 1] = o.k2);
          }
          for (
            var h = this._wnafMulAdd(1, i, n, 2 * s, r), u = 0;
            u < 2 * s;
            u++
          )
            (i[u] = null), (n[u] = null);
          return h;
        }),
        f(n, h.BasePoint),
        (i.prototype.point = function (t, e, r) {
          return new n(this, t, e, r);
        }),
        (i.prototype.pointFromJSON = function (t, e) {
          return n.fromJSON(this, t, e);
        }),
        (n.prototype._getBeta = function () {
          if (this.curve.endo) {
            var t = this.precomputed;
            if (t && t.beta) return t.beta;
            var e = this.curve.point(
              this.x.redMul(this.curve.endo.beta),
              this.y
            );
            if (t) {
              var r = this.curve,
                i = function (t) {
                  return r.point(t.x.redMul(r.endo.beta), t.y);
                };
              (t.beta = e),
                (e.precomputed = {
                  beta: null,
                  naf: t.naf && { wnd: t.naf.wnd, points: t.naf.points.map(i) },
                  doubles: t.doubles && {
                    step: t.doubles.step,
                    points: t.doubles.points.map(i),
                  },
                });
            }
            return e;
          }
        }),
        (n.prototype.toJSON = function () {
          return this.precomputed
            ? [
                this.x,
                this.y,
                this.precomputed && {
                  doubles: this.precomputed.doubles && {
                    step: this.precomputed.doubles.step,
                    points: this.precomputed.doubles.points.slice(1),
                  },
                  naf: this.precomputed.naf && {
                    wnd: this.precomputed.naf.wnd,
                    points: this.precomputed.naf.points.slice(1),
                  },
                },
              ]
            : [this.x, this.y];
        }),
        (n.fromJSON = function (t, e, r) {
          function i(e) {
            return t.point(e[0], e[1], r);
          }
          "string" == typeof e && (e = JSON.parse(e));
          var n = t.point(e[0], e[1], r);
          if (!e[2]) return n;
          var s = e[2];
          return (
            (n.precomputed = {
              beta: null,
              doubles: s.doubles && {
                step: s.doubles.step,
                points: [n].concat(s.doubles.points.map(i)),
              },
              naf: s.naf && {
                wnd: s.naf.wnd,
                points: [n].concat(s.naf.points.map(i)),
              },
            }),
            n
          );
        }),
        (n.prototype.inspect = function () {
          return this.isInfinity()
            ? "<EC Point Infinity>"
            : "<EC Point x: " +
                this.x.fromRed().toString(16, 2) +
                " y: " +
                this.y.fromRed().toString(16, 2) +
                ">";
        }),
        (n.prototype.isInfinity = function () {
          return this.inf;
        }),
        (n.prototype.add = function (t) {
          if (this.inf) return t;
          if (t.inf) return this;
          if (this.eq(t)) return this.dbl();
          if (this.neg().eq(t)) return this.curve.point(null, null);
          if (0 === this.x.cmp(t.x)) return this.curve.point(null, null);
          var e = this.y.redSub(t.y);
          0 !== e.cmpn(0) && (e = e.redMul(this.x.redSub(t.x).redInvm()));
          var r = e.redSqr().redISub(this.x).redISub(t.x),
            i = e.redMul(this.x.redSub(r)).redISub(this.y);
          return this.curve.point(r, i);
        }),
        (n.prototype.dbl = function () {
          if (this.inf) return this;
          var t = this.y.redAdd(this.y);
          if (0 === t.cmpn(0)) return this.curve.point(null, null);
          var e = this.curve.a,
            r = this.x.redSqr(),
            i = t.redInvm(),
            n = r.redAdd(r).redIAdd(r).redIAdd(e).redMul(i),
            s = n.redSqr().redISub(this.x.redAdd(this.x)),
            o = n.redMul(this.x.redSub(s)).redISub(this.y);
          return this.curve.point(s, o);
        }),
        (n.prototype.getX = function () {
          return this.x.fromRed();
        }),
        (n.prototype.getY = function () {
          return this.y.fromRed();
        }),
        (n.prototype.mul = function (t) {
          return (
            (t = new a(t, 16)),
            this.isInfinity()
              ? this
              : this._hasDoubles(t)
              ? this.curve._fixedNafMul(this, t)
              : this.curve.endo
              ? this.curve._endoWnafMulAdd([this], [t])
              : this.curve._wnafMul(this, t)
          );
        }),
        (n.prototype.mulAdd = function (t, e, r) {
          var i = [this, e],
            n = [t, r];
          return this.curve.endo
            ? this.curve._endoWnafMulAdd(i, n)
            : this.curve._wnafMulAdd(1, i, n, 2);
        }),
        (n.prototype.jmulAdd = function (t, e, r) {
          var i = [this, e],
            n = [t, r];
          return this.curve.endo
            ? this.curve._endoWnafMulAdd(i, n, !0)
            : this.curve._wnafMulAdd(1, i, n, 2, !0);
        }),
        (n.prototype.eq = function (t) {
          return (
            this === t ||
            (this.inf === t.inf &&
              (this.inf || (0 === this.x.cmp(t.x) && 0 === this.y.cmp(t.y))))
          );
        }),
        (n.prototype.neg = function (t) {
          if (this.inf) return this;
          var e = this.curve.point(this.x, this.y.redNeg());
          if (t && this.precomputed) {
            var r = this.precomputed,
              i = function (t) {
                return t.neg();
              };
            e.precomputed = {
              naf: r.naf && { wnd: r.naf.wnd, points: r.naf.points.map(i) },
              doubles: r.doubles && {
                step: r.doubles.step,
                points: r.doubles.points.map(i),
              },
            };
          }
          return e;
        }),
        (n.prototype.toJ = function () {
          if (this.inf) return this.curve.jpoint(null, null, null);
          var t = this.curve.jpoint(this.x, this.y, this.curve.one);
          return t;
        }),
        f(s, h.BasePoint),
        (i.prototype.jpoint = function (t, e, r) {
          return new s(this, t, e, r);
        }),
        (s.prototype.toP = function () {
          if (this.isInfinity()) return this.curve.point(null, null);
          var t = this.z.redInvm(),
            e = t.redSqr(),
            r = this.x.redMul(e),
            i = this.y.redMul(e).redMul(t);
          return this.curve.point(r, i);
        }),
        (s.prototype.neg = function () {
          return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
        }),
        (s.prototype.add = function (t) {
          if (this.isInfinity()) return t;
          if (t.isInfinity()) return this;
          var e = t.z.redSqr(),
            r = this.z.redSqr(),
            i = this.x.redMul(e),
            n = t.x.redMul(r),
            s = this.y.redMul(e.redMul(t.z)),
            o = t.y.redMul(r.redMul(this.z)),
            a = i.redSub(n),
            f = s.redSub(o);
          if (0 === a.cmpn(0))
            return 0 !== f.cmpn(0)
              ? this.curve.jpoint(null, null, null)
              : this.dbl();
          var h = a.redSqr(),
            u = h.redMul(a),
            c = i.redMul(h),
            d = f.redSqr().redIAdd(u).redISub(c).redISub(c),
            l = f.redMul(c.redISub(d)).redISub(s.redMul(u)),
            p = this.z.redMul(t.z).redMul(a);
          return this.curve.jpoint(d, l, p);
        }),
        (s.prototype.mixedAdd = function (t) {
          if (this.isInfinity()) return t.toJ();
          if (t.isInfinity()) return this;
          var e = this.z.redSqr(),
            r = this.x,
            i = t.x.redMul(e),
            n = this.y,
            s = t.y.redMul(e).redMul(this.z),
            o = r.redSub(i),
            a = n.redSub(s);
          if (0 === o.cmpn(0))
            return 0 !== a.cmpn(0)
              ? this.curve.jpoint(null, null, null)
              : this.dbl();
          var f = o.redSqr(),
            h = f.redMul(o),
            u = r.redMul(f),
            c = a.redSqr().redIAdd(h).redISub(u).redISub(u),
            d = a.redMul(u.redISub(c)).redISub(n.redMul(h)),
            l = this.z.redMul(o);
          return this.curve.jpoint(c, d, l);
        }),
        (s.prototype.dblp = function (t) {
          if (0 === t) return this;
          if (this.isInfinity()) return this;
          if (!t) return this.dbl();
          var e;
          if (this.curve.zeroA || this.curve.threeA) {
            var r = this;
            for (e = 0; e < t; e++) r = r.dbl();
            return r;
          }
          var i = this.curve.a,
            n = this.curve.tinv,
            s = this.x,
            o = this.y,
            a = this.z,
            f = a.redSqr().redSqr(),
            h = o.redAdd(o);
          for (e = 0; e < t; e++) {
            var u = s.redSqr(),
              c = h.redSqr(),
              d = c.redSqr(),
              l = u.redAdd(u).redIAdd(u).redIAdd(i.redMul(f)),
              p = s.redMul(c),
              b = l.redSqr().redISub(p.redAdd(p)),
              m = p.redISub(b),
              y = l.redMul(m);
            y = y.redIAdd(y).redISub(d);
            var g = h.redMul(a);
            e + 1 < t && (f = f.redMul(d)), (s = b), (a = g), (h = y);
          }
          return this.curve.jpoint(s, h.redMul(n), a);
        }),
        (s.prototype.dbl = function () {
          return this.isInfinity()
            ? this
            : this.curve.zeroA
            ? this._zeroDbl()
            : this.curve.threeA
            ? this._threeDbl()
            : this._dbl();
        }),
        (s.prototype._zeroDbl = function () {
          var t, e, r;
          if (this.zOne) {
            var i = this.x.redSqr(),
              n = this.y.redSqr(),
              s = n.redSqr(),
              o = this.x.redAdd(n).redSqr().redISub(i).redISub(s);
            o = o.redIAdd(o);
            var a = i.redAdd(i).redIAdd(i),
              f = a.redSqr().redISub(o).redISub(o),
              h = s.redIAdd(s);
            (h = h.redIAdd(h)),
              (h = h.redIAdd(h)),
              (t = f),
              (e = a.redMul(o.redISub(f)).redISub(h)),
              (r = this.y.redAdd(this.y));
          } else {
            var u = this.x.redSqr(),
              c = this.y.redSqr(),
              d = c.redSqr(),
              l = this.x.redAdd(c).redSqr().redISub(u).redISub(d);
            l = l.redIAdd(l);
            var p = u.redAdd(u).redIAdd(u),
              b = p.redSqr(),
              m = d.redIAdd(d);
            (m = m.redIAdd(m)),
              (m = m.redIAdd(m)),
              (t = b.redISub(l).redISub(l)),
              (e = p.redMul(l.redISub(t)).redISub(m)),
              (r = this.y.redMul(this.z)),
              (r = r.redIAdd(r));
          }
          return this.curve.jpoint(t, e, r);
        }),
        (s.prototype._threeDbl = function () {
          var t, e, r;
          if (this.zOne) {
            var i = this.x.redSqr(),
              n = this.y.redSqr(),
              s = n.redSqr(),
              o = this.x.redAdd(n).redSqr().redISub(i).redISub(s);
            o = o.redIAdd(o);
            var a = i.redAdd(i).redIAdd(i).redIAdd(this.curve.a),
              f = a.redSqr().redISub(o).redISub(o);
            t = f;
            var h = s.redIAdd(s);
            (h = h.redIAdd(h)),
              (h = h.redIAdd(h)),
              (e = a.redMul(o.redISub(f)).redISub(h)),
              (r = this.y.redAdd(this.y));
          } else {
            var u = this.z.redSqr(),
              c = this.y.redSqr(),
              d = this.x.redMul(c),
              l = this.x.redSub(u).redMul(this.x.redAdd(u));
            l = l.redAdd(l).redIAdd(l);
            var p = d.redIAdd(d);
            p = p.redIAdd(p);
            var b = p.redAdd(p);
            (t = l.redSqr().redISub(b)),
              (r = this.y.redAdd(this.z).redSqr().redISub(c).redISub(u));
            var m = c.redSqr();
            (m = m.redIAdd(m)),
              (m = m.redIAdd(m)),
              (m = m.redIAdd(m)),
              (e = l.redMul(p.redISub(t)).redISub(m));
          }
          return this.curve.jpoint(t, e, r);
        }),
        (s.prototype._dbl = function () {
          var t = this.curve.a,
            e = this.x,
            r = this.y,
            i = this.z,
            n = i.redSqr().redSqr(),
            s = e.redSqr(),
            o = r.redSqr(),
            a = s.redAdd(s).redIAdd(s).redIAdd(t.redMul(n)),
            f = e.redAdd(e);
          f = f.redIAdd(f);
          var h = f.redMul(o),
            u = a.redSqr().redISub(h.redAdd(h)),
            c = h.redISub(u),
            d = o.redSqr();
          (d = d.redIAdd(d)), (d = d.redIAdd(d)), (d = d.redIAdd(d));
          var l = a.redMul(c).redISub(d),
            p = r.redAdd(r).redMul(i);
          return this.curve.jpoint(u, l, p);
        }),
        (s.prototype.trpl = function () {
          if (!this.curve.zeroA) return this.dbl().add(this);
          var t = this.x.redSqr(),
            e = this.y.redSqr(),
            r = this.z.redSqr(),
            i = e.redSqr(),
            n = t.redAdd(t).redIAdd(t),
            s = n.redSqr(),
            o = this.x.redAdd(e).redSqr().redISub(t).redISub(i);
          (o = o.redIAdd(o)), (o = o.redAdd(o).redIAdd(o)), (o = o.redISub(s));
          var a = o.redSqr(),
            f = i.redIAdd(i);
          (f = f.redIAdd(f)), (f = f.redIAdd(f)), (f = f.redIAdd(f));
          var h = n.redIAdd(o).redSqr().redISub(s).redISub(a).redISub(f),
            u = e.redMul(h);
          (u = u.redIAdd(u)), (u = u.redIAdd(u));
          var c = this.x.redMul(a).redISub(u);
          (c = c.redIAdd(c)), (c = c.redIAdd(c));
          var d = this.y.redMul(h.redMul(f.redISub(h)).redISub(o.redMul(a)));
          (d = d.redIAdd(d)), (d = d.redIAdd(d)), (d = d.redIAdd(d));
          var l = this.z.redAdd(o).redSqr().redISub(r).redISub(a);
          return this.curve.jpoint(c, d, l);
        }),
        (s.prototype.mul = function (t, e) {
          return (t = new a(t, e)), this.curve._wnafMul(this, t);
        }),
        (s.prototype.eq = function (t) {
          if ("affine" === t.type) return this.eq(t.toJ());
          if (this === t) return !0;
          var e = this.z.redSqr(),
            r = t.z.redSqr();
          if (0 !== this.x.redMul(r).redISub(t.x.redMul(e)).cmpn(0)) return !1;
          var i = e.redMul(this.z),
            n = r.redMul(t.z);
          return 0 === this.y.redMul(n).redISub(t.y.redMul(i)).cmpn(0);
        }),
        (s.prototype.eqXToP = function (t) {
          var e = this.z.redSqr(),
            r = t.toRed(this.curve.red).redMul(e);
          if (0 === this.x.cmp(r)) return !0;
          for (var i = t.clone(), n = this.curve.redN.redMul(e); ; ) {
            if ((i.iadd(this.curve.n), i.cmp(this.curve.p) >= 0)) return !1;
            if ((r.redIAdd(n), 0 === this.x.cmp(r))) return !0;
          }
        }),
        (s.prototype.inspect = function () {
          return this.isInfinity()
            ? "<EC JPoint Infinity>"
            : "<EC JPoint x: " +
                this.x.toString(16, 2) +
                " y: " +
                this.y.toString(16, 2) +
                " z: " +
                this.z.toString(16, 2) +
                ">";
        }),
        (s.prototype.isInfinity = function () {
          return 0 === this.z.cmpn(0);
        });
    },
    { "../utils": 97, "./base": 84, "bn.js": 98, inherits: 132 },
  ],
  89: [
    function (t, e, r) {
      "use strict";
      function i(t) {
        "short" === t.type
          ? (this.curve = new f.short(t))
          : "edwards" === t.type
          ? (this.curve = new f.edwards(t))
          : (this.curve = new f.mont(t)),
          (this.g = this.curve.g),
          (this.n = this.curve.n),
          (this.hash = t.hash),
          u(this.g.validate(), "Invalid curve"),
          u(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O");
      }
      function n(t, e) {
        Object.defineProperty(o, t, {
          configurable: !0,
          enumerable: !0,
          get: function () {
            var r = new i(e);
            return (
              Object.defineProperty(o, t, {
                configurable: !0,
                enumerable: !0,
                value: r,
              }),
              r
            );
          },
        });
      }
      var s,
        o = r,
        a = t("hash.js"),
        f = t("./curve"),
        h = t("./utils"),
        u = h.assert;
      (o.PresetCurve = i),
        n("p192", {
          type: "short",
          prime: "p192",
          p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
          a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
          b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
          n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
          hash: a.sha256,
          gRed: !1,
          g: [
            "188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012",
            "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811",
          ],
        }),
        n("p224", {
          type: "short",
          prime: "p224",
          p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
          a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
          b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
          n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
          hash: a.sha256,
          gRed: !1,
          g: [
            "b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21",
            "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34",
          ],
        }),
        n("p256", {
          type: "short",
          prime: null,
          p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
          a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
          b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
          n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
          hash: a.sha256,
          gRed: !1,
          g: [
            "6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296",
            "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5",
          ],
        }),
        n("p384", {
          type: "short",
          prime: null,
          p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
          a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
          b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
          n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
          hash: a.sha384,
          gRed: !1,
          g: [
            "aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7",
            "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f",
          ],
        }),
        n("p521", {
          type: "short",
          prime: null,
          p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
          a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
          b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
          n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
          hash: a.sha512,
          gRed: !1,
          g: [
            "000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66",
            "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650",
          ],
        }),
        n("curve25519", {
          type: "mont",
          prime: "p25519",
          p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
          a: "76d06",
          b: "1",
          n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
          hash: a.sha256,
          gRed: !1,
          g: ["9"],
        }),
        n("ed25519", {
          type: "edwards",
          prime: "p25519",
          p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
          a: "-1",
          c: "1",
          d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
          n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
          hash: a.sha256,
          gRed: !1,
          g: [
            "216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a",
            "6666666666666666666666666666666666666666666666666666666666666658",
          ],
        });
      try {
        s = t("./precomputed/secp256k1");
      } catch (t) {
        s = void 0;
      }
      n("secp256k1", {
        type: "short",
        prime: "k256",
        p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
        a: "0",
        b: "7",
        n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
        h: "1",
        hash: a.sha256,
        beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
        lambda:
          "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
        basis: [
          {
            a: "3086d221a7d46bcde86c90e49284eb15",
            b: "-e4437ed6010e88286f547fa90abfe4c3",
          },
          {
            a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
            b: "3086d221a7d46bcde86c90e49284eb15",
          },
        ],
        gRed: !1,
        g: [
          "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
          "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
          s,
        ],
      });
    },
    {
      "./curve": 86,
      "./precomputed/secp256k1": 96,
      "./utils": 97,
      "hash.js": 118,
    },
  ],
  90: [
    function (t, e, r) {
      "use strict";
      function i(t) {
        if (!(this instanceof i)) return new i(t);
        "string" == typeof t &&
          (h(Object.prototype.hasOwnProperty.call(a, t), "Unknown curve " + t),
          (t = a[t])),
          t instanceof a.PresetCurve && (t = { curve: t }),
          (this.curve = t.curve.curve),
          (this.n = this.curve.n),
          (this.nh = this.n.ushrn(1)),
          (this.g = this.curve.g),
          (this.g = t.curve.g),
          this.g.precompute(t.curve.n.bitLength() + 1),
          (this.hash = t.hash || t.curve.hash);
      }
      var n = t("bn.js"),
        s = t("hmac-drbg"),
        o = t("../utils"),
        a = t("../curves"),
        f = t("brorand"),
        h = o.assert,
        u = t("./key"),
        c = t("./signature");
      (e.exports = i),
        (i.prototype.keyPair = function (t) {
          return new u(this, t);
        }),
        (i.prototype.keyFromPrivate = function (t, e) {
          return u.fromPrivate(this, t, e);
        }),
        (i.prototype.keyFromPublic = function (t, e) {
          return u.fromPublic(this, t, e);
        }),
        (i.prototype.genKeyPair = function (t) {
          t || (t = {});
          for (
            var e = new s({
                hash: this.hash,
                pers: t.pers,
                persEnc: t.persEnc || "utf8",
                entropy: t.entropy || f(this.hash.hmacStrength),
                entropyEnc: (t.entropy && t.entropyEnc) || "utf8",
                nonce: this.n.toArray(),
              }),
              r = this.n.byteLength(),
              i = this.n.sub(new n(2));
            ;

          ) {
            var o = new n(e.generate(r));
            if (!(o.cmp(i) > 0)) return o.iaddn(1), this.keyFromPrivate(o);
          }
        }),
        (i.prototype._truncateToN = function (t, e) {
          var r = 8 * t.byteLength() - this.n.bitLength();
          return (
            r > 0 && (t = t.ushrn(r)),
            !e && t.cmp(this.n) >= 0 ? t.sub(this.n) : t
          );
        }),
        (i.prototype.sign = function (t, e, r, i) {
          "object" == typeof r && ((i = r), (r = null)),
            i || (i = {}),
            (e = this.keyFromPrivate(e, r)),
            (t = this._truncateToN(new n(t, 16)));
          for (
            var o = this.n.byteLength(),
              a = e.getPrivate().toArray("be", o),
              f = t.toArray("be", o),
              h = new s({
                hash: this.hash,
                entropy: a,
                nonce: f,
                pers: i.pers,
                persEnc: i.persEnc || "utf8",
              }),
              u = this.n.sub(new n(1)),
              d = 0;
            ;
            d++
          ) {
            var l = i.k ? i.k(d) : new n(h.generate(this.n.byteLength()));
            if (
              ((l = this._truncateToN(l, !0)),
              !(l.cmpn(1) <= 0 || l.cmp(u) >= 0))
            ) {
              var p = this.g.mul(l);
              if (!p.isInfinity()) {
                var b = p.getX(),
                  m = b.umod(this.n);
                if (0 !== m.cmpn(0)) {
                  var y = l.invm(this.n).mul(m.mul(e.getPrivate()).iadd(t));
                  if (((y = y.umod(this.n)), 0 !== y.cmpn(0))) {
                    var g =
                      (p.getY().isOdd() ? 1 : 0) | (0 !== b.cmp(m) ? 2 : 0);
                    return (
                      i.canonical &&
                        y.cmp(this.nh) > 0 &&
                        ((y = this.n.sub(y)), (g ^= 1)),
                      new c({ r: m, s: y, recoveryParam: g })
                    );
                  }
                }
              }
            }
          }
        }),
        (i.prototype.verify = function (t, e, r, i) {
          (t = this._truncateToN(new n(t, 16))),
            (r = this.keyFromPublic(r, i)),
            (e = new c(e, "hex"));
          var s = e.r,
            o = e.s;
          if (s.cmpn(1) < 0 || s.cmp(this.n) >= 0) return !1;
          if (o.cmpn(1) < 0 || o.cmp(this.n) >= 0) return !1;
          var a,
            f = o.invm(this.n),
            h = f.mul(t).umod(this.n),
            u = f.mul(s).umod(this.n);
          return this.curve._maxwellTrick
            ? ((a = this.g.jmulAdd(h, r.getPublic(), u)),
              !a.isInfinity() && a.eqXToP(s))
            : ((a = this.g.mulAdd(h, r.getPublic(), u)),
              !a.isInfinity() && 0 === a.getX().umod(this.n).cmp(s));
        }),
        (i.prototype.recoverPubKey = function (t, e, r, i) {
          h((3 & r) === r, "The recovery param is more than two bits"),
            (e = new c(e, i));
          var s = this.n,
            o = new n(t),
            a = e.r,
            f = e.s,
            u = 1 & r,
            d = r >> 1;
          if (a.cmp(this.curve.p.umod(this.curve.n)) >= 0 && d)
            throw new Error("Unable to find sencond key candinate");
          a = d
            ? this.curve.pointFromX(a.add(this.curve.n), u)
            : this.curve.pointFromX(a, u);
          var l = e.r.invm(s),
            p = s.sub(o).mul(l).umod(s),
            b = f.mul(l).umod(s);
          return this.g.mulAdd(p, a, b);
        }),
        (i.prototype.getKeyRecoveryParam = function (t, e, r, i) {
          if (((e = new c(e, i)), null !== e.recoveryParam))
            return e.recoveryParam;
          for (var n = 0; n < 4; n++) {
            var s;
            try {
              s = this.recoverPubKey(t, e, n);
            } catch (t) {
              continue;
            }
            if (s.eq(r)) return n;
          }
          throw new Error("Unable to find valid recovery factor");
        });
    },
    {
      "../curves": 89,
      "../utils": 97,
      "./key": 91,
      "./signature": 92,
      "bn.js": 98,
      brorand: 18,
      "hmac-drbg": 130,
    },
  ],
  91: [
    function (t, e, r) {
      "use strict";
      function i(t, e) {
        (this.ec = t),
          (this.priv = null),
          (this.pub = null),
          e.priv && this._importPrivate(e.priv, e.privEnc),
          e.pub && this._importPublic(e.pub, e.pubEnc);
      }
      var n = t("bn.js"),
        s = t("../utils"),
        o = s.assert;
      (e.exports = i),
        (i.fromPublic = function (t, e, r) {
          return e instanceof i ? e : new i(t, { pub: e, pubEnc: r });
        }),
        (i.fromPrivate = function (t, e, r) {
          return e instanceof i ? e : new i(t, { priv: e, privEnc: r });
        }),
        (i.prototype.validate = function () {
          var t = this.getPublic();
          return t.isInfinity()
            ? { result: !1, reason: "Invalid public key" }
            : t.validate()
            ? t.mul(this.ec.curve.n).isInfinity()
              ? { result: !0, reason: null }
              : { result: !1, reason: "Public key * N != O" }
            : { result: !1, reason: "Public key is not a point" };
        }),
        (i.prototype.getPublic = function (t, e) {
          return (
            "string" == typeof t && ((e = t), (t = null)),
            this.pub || (this.pub = this.ec.g.mul(this.priv)),
            e ? this.pub.encode(e, t) : this.pub
          );
        }),
        (i.prototype.getPrivate = function (t) {
          return "hex" === t ? this.priv.toString(16, 2) : this.priv;
        }),
        (i.prototype._importPrivate = function (t, e) {
          (this.priv = new n(t, e || 16)),
            (this.priv = this.priv.umod(this.ec.curve.n));
        }),
        (i.prototype._importPublic = function (t, e) {
          if (t.x || t.y)
            return (
              "mont" === this.ec.curve.type
                ? o(t.x, "Need x coordinate")
                : ("short" !== this.ec.curve.type &&
                    "edwards" !== this.ec.curve.type) ||
                  o(t.x && t.y, "Need both x and y coordinate"),
              void (this.pub = this.ec.curve.point(t.x, t.y))
            );
          this.pub = this.ec.curve.decodePoint(t, e);
        }),
        (i.prototype.derive = function (t) {
          return (
            t.validate() || o(t.validate(), "public point not validated"),
            t.mul(this.priv).getX()
          );
        }),
        (i.prototype.sign = function (t, e, r) {
          return this.ec.sign(t, this, e, r);
        }),
        (i.prototype.verify = function (t, e) {
          return this.ec.verify(t, e, this);
        }),
        (i.prototype.inspect = function () {
          return (
            "<Key priv: " +
            (this.priv && this.priv.toString(16, 2)) +
            " pub: " +
            (this.pub && this.pub.inspect()) +
            " >"
          );
        });
    },
    { "../utils": 97, "bn.js": 98 },
  ],
  92: [
    function (t, e, r) {
      "use strict";
      function i(t, e) {
        if (t instanceof i) return t;
        this._importDER(t, e) ||
          (u(t.r && t.s, "Signature without r or s"),
          (this.r = new f(t.r, 16)),
          (this.s = new f(t.s, 16)),
          void 0 === t.recoveryParam
            ? (this.recoveryParam = null)
            : (this.recoveryParam = t.recoveryParam));
      }
      function n() {
        this.place = 0;
      }
      function s(t, e) {
        var r = t[e.place++];
        if (!(128 & r)) return r;
        var i = 15 & r;
        if (0 === i || i > 4) return !1;
        for (var n = 0, s = 0, o = e.place; s < i; s++, o++)
          (n <<= 8), (n |= t[o]), (n >>>= 0);
        return !(n <= 127) && ((e.place = o), n);
      }
      function o(t) {
        for (var e = 0, r = t.length - 1; !t[e] && !(128 & t[e + 1]) && e < r; )
          e++;
        return 0 === e ? t : t.slice(e);
      }
      function a(t, e) {
        if (e < 128) t.push(e);
        else {
          var r = 1 + ((Math.log(e) / Math.LN2) >>> 3);
          for (t.push(128 | r); --r; ) t.push((e >>> (r << 3)) & 255);
          t.push(e);
        }
      }
      var f = t("bn.js"),
        h = t("../utils"),
        u = h.assert;
      (e.exports = i),
        (i.prototype._importDER = function (t, e) {
          t = h.toArray(t, e);
          var r = new n();
          if (48 !== t[r.place++]) return !1;
          var i = s(t, r);
          if (!1 === i) return !1;
          if (i + r.place !== t.length) return !1;
          if (2 !== t[r.place++]) return !1;
          var o = s(t, r);
          if (!1 === o) return !1;
          var a = t.slice(r.place, o + r.place);
          if (((r.place += o), 2 !== t[r.place++])) return !1;
          var u = s(t, r);
          if (!1 === u) return !1;
          if (t.length !== u + r.place) return !1;
          var c = t.slice(r.place, u + r.place);
          if (0 === a[0]) {
            if (!(128 & a[1])) return !1;
            a = a.slice(1);
          }
          if (0 === c[0]) {
            if (!(128 & c[1])) return !1;
            c = c.slice(1);
          }
          return (
            (this.r = new f(a)),
            (this.s = new f(c)),
            (this.recoveryParam = null),
            !0
          );
        }),
        (i.prototype.toDER = function (t) {
          var e = this.r.toArray(),
            r = this.s.toArray();
          for (
            128 & e[0] && (e = [0].concat(e)),
              128 & r[0] && (r = [0].concat(r)),
              e = o(e),
              r = o(r);
            !(r[0] || 128 & r[1]);

          )
            r = r.slice(1);
          var i = [2];
          a(i, e.length), (i = i.concat(e)), i.push(2), a(i, r.length);
          var n = i.concat(r),
            s = [48];
          return a(s, n.length), (s = s.concat(n)), h.encode(s, t);
        });
    },
    { "../utils": 97, "bn.js": 98 },
  ],
  93: [
    function (t, e, r) {
      "use strict";
      function i(t) {
        if (
          (a("ed25519" === t, "only tested with ed25519 so far"),
          !(this instanceof i))
        )
          return new i(t);
        (t = s[t].curve),
          (this.curve = t),
          (this.g = t.g),
          this.g.precompute(t.n.bitLength() + 1),
          (this.pointClass = t.point().constructor),
          (this.encodingLength = Math.ceil(t.n.bitLength() / 8)),
          (this.hash = n.sha512);
      }
      var n = t("hash.js"),
        s = t("../curves"),
        o = t("../utils"),
        a = o.assert,
        f = o.parseBytes,
        h = t("./key"),
        u = t("./signature");
      (e.exports = i),
        (i.prototype.sign = function (t, e) {
          t = f(t);
          var r = this.keyFromSecret(e),
            i = this.hashInt(r.messagePrefix(), t),
            n = this.g.mul(i),
            s = this.encodePoint(n),
            o = this.hashInt(s, r.pubBytes(), t).mul(r.priv()),
            a = i.add(o).umod(this.curve.n);
          return this.makeSignature({ R: n, S: a, Rencoded: s });
        }),
        (i.prototype.verify = function (t, e, r) {
          (t = f(t)), (e = this.makeSignature(e));
          var i = this.keyFromPublic(r),
            n = this.hashInt(e.Rencoded(), i.pubBytes(), t),
            s = this.g.mul(e.S()),
            o = e.R().add(i.pub().mul(n));
          return o.eq(s);
        }),
        (i.prototype.hashInt = function () {
          for (var t = this.hash(), e = 0; e < arguments.length; e++)
            t.update(arguments[e]);
          return o.intFromLE(t.digest()).umod(this.curve.n);
        }),
        (i.prototype.keyFromPublic = function (t) {
          return h.fromPublic(this, t);
        }),
        (i.prototype.keyFromSecret = function (t) {
          return h.fromSecret(this, t);
        }),
        (i.prototype.makeSignature = function (t) {
          return t instanceof u ? t : new u(this, t);
        }),
        (i.prototype.encodePoint = function (t) {
          var e = t.getY().toArray("le", this.encodingLength);
          return (e[this.encodingLength - 1] |= t.getX().isOdd() ? 128 : 0), e;
        }),
        (i.prototype.decodePoint = function (t) {
          t = o.parseBytes(t);
          var e = t.length - 1,
            r = t.slice(0, e).concat(-129 & t[e]),
            i = 0 != (128 & t[e]),
            n = o.intFromLE(r);
          return this.curve.pointFromY(n, i);
        }),
        (i.prototype.encodeInt = function (t) {
          return t.toArray("le", this.encodingLength);
        }),
        (i.prototype.decodeInt = function (t) {
          return o.intFromLE(t);
        }),
        (i.prototype.isPoint = function (t) {
          return t instanceof this.pointClass;
        });
    },
    {
      "../curves": 89,
      "../utils": 97,
      "./key": 94,
      "./signature": 95,
      "hash.js": 118,
    },
  ],
  94: [
    function (t, e, r) {
      "use strict";
      function i(t, e) {
        (this.eddsa = t),
          (this._secret = o(e.secret)),
          t.isPoint(e.pub) ? (this._pub = e.pub) : (this._pubBytes = o(e.pub));
      }
      var n = t("../utils"),
        s = n.assert,
        o = n.parseBytes,
        a = n.cachedProperty;
      (i.fromPublic = function (t, e) {
        return e instanceof i ? e : new i(t, { pub: e });
      }),
        (i.fromSecret = function (t, e) {
          return e instanceof i ? e : new i(t, { secret: e });
        }),
        (i.prototype.secret = function () {
          return this._secret;
        }),
        a(i, "pubBytes", function () {
          return this.eddsa.encodePoint(this.pub());
        }),
        a(i, "pub", function () {
          return this._pubBytes
            ? this.eddsa.decodePoint(this._pubBytes)
            : this.eddsa.g.mul(this.priv());
        }),
        a(i, "privBytes", function () {
          var t = this.eddsa,
            e = this.hash(),
            r = t.encodingLength - 1,
            i = e.slice(0, t.encodingLength);
          return (i[0] &= 248), (i[r] &= 127), (i[r] |= 64), i;
        }),
        a(i, "priv", function () {
          return this.eddsa.decodeInt(this.privBytes());
        }),
        a(i, "hash", function () {
          return this.eddsa.hash().update(this.secret()).digest();
        }),
        a(i, "messagePrefix", function () {
          return this.hash().slice(this.eddsa.encodingLength);
        }),
        (i.prototype.sign = function (t) {
          return (
            s(this._secret, "KeyPair can only verify"), this.eddsa.sign(t, this)
          );
        }),
        (i.prototype.verify = function (t, e) {
          return this.eddsa.verify(t, e, this);
        }),
        (i.prototype.getSecret = function (t) {
          return (
            s(this._secret, "KeyPair is public only"),
            n.encode(this.secret(), t)
          );
        }),
        (i.prototype.getPublic = function (t) {
          return n.encode(this.pubBytes(), t);
        }),
        (e.exports = i);
    },
    { "../utils": 97 },
  ],
  95: [
    function (t, e, r) {
      "use strict";
      function i(t, e) {
        (this.eddsa = t),
          "object" != typeof e && (e = f(e)),
          Array.isArray(e) &&
            (e = {
              R: e.slice(0, t.encodingLength),
              S: e.slice(t.encodingLength),
            }),
          o(e.R && e.S, "Signature without R or S"),
          t.isPoint(e.R) && (this._R = e.R),
          e.S instanceof n && (this._S = e.S),
          (this._Rencoded = Array.isArray(e.R) ? e.R : e.Rencoded),
          (this._Sencoded = Array.isArray(e.S) ? e.S : e.Sencoded);
      }
      var n = t("bn.js"),
        s = t("../utils"),
        o = s.assert,
        a = s.cachedProperty,
        f = s.parseBytes;
      a(i, "S", function () {
        return this.eddsa.decodeInt(this.Sencoded());
      }),
        a(i, "R", function () {
          return this.eddsa.decodePoint(this.Rencoded());
        }),
        a(i, "Rencoded", function () {
          return this.eddsa.encodePoint(this.R());
        }),
        a(i, "Sencoded", function () {
          return this.eddsa.encodeInt(this.S());
        }),
        (i.prototype.toBytes = function () {
          return this.Rencoded().concat(this.Sencoded());
        }),
        (i.prototype.toHex = function () {
          return s.encode(this.toBytes(), "hex").toUpperCase();
        }),
        (e.exports = i);
    },
    { "../utils": 97, "bn.js": 98 },
  ],
  96: [
    function (t, e, r) {
      e.exports = {
        doubles: {
          step: 4,
          points: [
            [
              "e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a",
              "f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821",
            ],
            [
              "8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508",
              "11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf",
            ],
            [
              "175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739",
              "d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695",
            ],
            [
              "363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640",
              "4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9",
            ],
            [
              "8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c",
              "4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36",
            ],
            [
              "723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda",
              "96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f",
            ],
            [
              "eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa",
              "5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999",
            ],
            [
              "100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0",
              "cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09",
            ],
            [
              "e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d",
              "9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d",
            ],
            [
              "feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d",
              "e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088",
            ],
            [
              "da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1",
              "9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d",
            ],
            [
              "53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0",
              "5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8",
            ],
            [
              "8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047",
              "10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a",
            ],
            [
              "385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862",
              "283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453",
            ],
            [
              "6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7",
              "7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160",
            ],
            [
              "3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd",
              "56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0",
            ],
            [
              "85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83",
              "7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6",
            ],
            [
              "948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a",
              "53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589",
            ],
            [
              "6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8",
              "bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17",
            ],
            [
              "e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d",
              "4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda",
            ],
            [
              "e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725",
              "7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd",
            ],
            [
              "213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754",
              "4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2",
            ],
            [
              "4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c",
              "17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6",
            ],
            [
              "fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6",
              "6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f",
            ],
            [
              "76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39",
              "c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01",
            ],
            [
              "c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891",
              "893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3",
            ],
            [
              "d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b",
              "febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f",
            ],
            [
              "b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03",
              "2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7",
            ],
            [
              "e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d",
              "eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78",
            ],
            [
              "a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070",
              "7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1",
            ],
            [
              "90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4",
              "e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150",
            ],
            [
              "8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da",
              "662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82",
            ],
            [
              "e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11",
              "1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc",
            ],
            [
              "8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e",
              "efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b",
            ],
            [
              "e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41",
              "2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51",
            ],
            [
              "b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef",
              "67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45",
            ],
            [
              "d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8",
              "db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120",
            ],
            [
              "324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d",
              "648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84",
            ],
            [
              "4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96",
              "35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d",
            ],
            [
              "9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd",
              "ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d",
            ],
            [
              "6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5",
              "9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8",
            ],
            [
              "a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266",
              "40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8",
            ],
            [
              "7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71",
              "34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac",
            ],
            [
              "928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac",
              "c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f",
            ],
            [
              "85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751",
              "1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962",
            ],
            [
              "ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e",
              "493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907",
            ],
            [
              "827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241",
              "c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec",
            ],
            [
              "eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3",
              "be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d",
            ],
            [
              "e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f",
              "4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414",
            ],
            [
              "1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19",
              "aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd",
            ],
            [
              "146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be",
              "b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0",
            ],
            [
              "fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9",
              "6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811",
            ],
            [
              "da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2",
              "8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1",
            ],
            [
              "a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13",
              "7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c",
            ],
            [
              "174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c",
              "ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73",
            ],
            [
              "959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba",
              "2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd",
            ],
            [
              "d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151",
              "e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405",
            ],
            [
              "64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073",
              "d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589",
            ],
            [
              "8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458",
              "38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e",
            ],
            [
              "13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b",
              "69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27",
            ],
            [
              "bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366",
              "d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1",
            ],
            [
              "8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa",
              "40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482",
            ],
            [
              "8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0",
              "620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945",
            ],
            [
              "dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787",
              "7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573",
            ],
            [
              "f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e",
              "ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82",
            ],
          ],
        },
        naf: {
          wnd: 7,
          points: [
            [
              "f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9",
              "388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672",
            ],
            [
              "2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4",
              "d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6",
            ],
            [
              "5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc",
              "6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da",
            ],
            [
              "acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe",
              "cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37",
            ],
            [
              "774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb",
              "d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b",
            ],
            [
              "f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8",
              "ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81",
            ],
            [
              "d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e",
              "581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58",
            ],
            [
              "defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34",
              "4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77",
            ],
            [
              "2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c",
              "85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a",
            ],
            [
              "352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5",
              "321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c",
            ],
            [
              "2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f",
              "2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67",
            ],
            [
              "9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714",
              "73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402",
            ],
            [
              "daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729",
              "a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55",
            ],
            [
              "c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db",
              "2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482",
            ],
            [
              "6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4",
              "e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82",
            ],
            [
              "1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5",
              "b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396",
            ],
            [
              "605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479",
              "2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49",
            ],
            [
              "62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d",
              "80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf",
            ],
            [
              "80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f",
              "1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a",
            ],
            [
              "7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb",
              "d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7",
            ],
            [
              "d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9",
              "eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933",
            ],
            [
              "49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963",
              "758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a",
            ],
            [
              "77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74",
              "958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6",
            ],
            [
              "f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530",
              "e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37",
            ],
            [
              "463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b",
              "5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e",
            ],
            [
              "f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247",
              "cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6",
            ],
            [
              "caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1",
              "cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476",
            ],
            [
              "2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120",
              "4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40",
            ],
            [
              "7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435",
              "91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61",
            ],
            [
              "754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18",
              "673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683",
            ],
            [
              "e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8",
              "59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5",
            ],
            [
              "186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb",
              "3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b",
            ],
            [
              "df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f",
              "55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417",
            ],
            [
              "5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143",
              "efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868",
            ],
            [
              "290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba",
              "e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a",
            ],
            [
              "af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45",
              "f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6",
            ],
            [
              "766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a",
              "744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996",
            ],
            [
              "59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e",
              "c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e",
            ],
            [
              "f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8",
              "e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d",
            ],
            [
              "7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c",
              "30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2",
            ],
            [
              "948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519",
              "e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e",
            ],
            [
              "7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab",
              "100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437",
            ],
            [
              "3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca",
              "ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311",
            ],
            [
              "d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf",
              "8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4",
            ],
            [
              "1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610",
              "68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575",
            ],
            [
              "733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4",
              "f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d",
            ],
            [
              "15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c",
              "d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d",
            ],
            [
              "a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940",
              "edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629",
            ],
            [
              "e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980",
              "a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06",
            ],
            [
              "311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3",
              "66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374",
            ],
            [
              "34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf",
              "9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee",
            ],
            [
              "f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63",
              "4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1",
            ],
            [
              "d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448",
              "fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b",
            ],
            [
              "32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf",
              "5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661",
            ],
            [
              "7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5",
              "8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6",
            ],
            [
              "ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6",
              "8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e",
            ],
            [
              "16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5",
              "5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d",
            ],
            [
              "eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99",
              "f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc",
            ],
            [
              "78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51",
              "f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4",
            ],
            [
              "494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5",
              "42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c",
            ],
            [
              "a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5",
              "204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b",
            ],
            [
              "c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997",
              "4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913",
            ],
            [
              "841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881",
              "73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154",
            ],
            [
              "5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5",
              "39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865",
            ],
            [
              "36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66",
              "d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc",
            ],
            [
              "336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726",
              "ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224",
            ],
            [
              "8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede",
              "6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e",
            ],
            [
              "1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94",
              "60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6",
            ],
            [
              "85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31",
              "3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511",
            ],
            [
              "29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51",
              "b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b",
            ],
            [
              "a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252",
              "ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2",
            ],
            [
              "4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5",
              "cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c",
            ],
            [
              "d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b",
              "6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3",
            ],
            [
              "ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4",
              "322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d",
            ],
            [
              "af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f",
              "6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700",
            ],
            [
              "e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889",
              "2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4",
            ],
            [
              "591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246",
              "b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196",
            ],
            [
              "11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984",
              "998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4",
            ],
            [
              "3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a",
              "b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257",
            ],
            [
              "cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030",
              "bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13",
            ],
            [
              "c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197",
              "6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096",
            ],
            [
              "c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593",
              "c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38",
            ],
            [
              "a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef",
              "21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f",
            ],
            [
              "347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38",
              "60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448",
            ],
            [
              "da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a",
              "49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a",
            ],
            [
              "c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111",
              "5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4",
            ],
            [
              "4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502",
              "7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437",
            ],
            [
              "3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea",
              "be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7",
            ],
            [
              "cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26",
              "8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d",
            ],
            [
              "b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986",
              "39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a",
            ],
            [
              "d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e",
              "62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54",
            ],
            [
              "48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4",
              "25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77",
            ],
            [
              "dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda",
              "ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517",
            ],
            [
              "6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859",
              "cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10",
            ],
            [
              "e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f",
              "f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125",
            ],
            [
              "eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c",
              "6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e",
            ],
            [
              "13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942",
              "fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1",
            ],
            [
              "ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a",
              "1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2",
            ],
            [
              "b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80",
              "5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423",
            ],
            [
              "ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d",
              "438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8",
            ],
            [
              "8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1",
              "cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758",
            ],
            [
              "52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63",
              "c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375",
            ],
            [
              "e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352",
              "6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d",
            ],
            [
              "7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193",
              "ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec",
            ],
            [
              "5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00",
              "9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0",
            ],
            [
              "32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58",
              "ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c",
            ],
            [
              "e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7",
              "d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4",
            ],
            [
              "8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8",
              "c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f",
            ],
            [
              "4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e",
              "67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649",
            ],
            [
              "3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d",
              "cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826",
            ],
            [
              "674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b",
              "299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5",
            ],
            [
              "d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f",
              "f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87",
            ],
            [
              "30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6",
              "462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b",
            ],
            [
              "be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297",
              "62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc",
            ],
            [
              "93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a",
              "7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c",
            ],
            [
              "b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c",
              "ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f",
            ],
            [
              "d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52",
              "4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a",
            ],
            [
              "d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb",
              "bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46",
            ],
            [
              "463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065",
              "bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f",
            ],
            [
              "7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917",
              "603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03",
            ],
            [
              "74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9",
              "cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08",
            ],
            [
              "30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3",
              "553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8",
            ],
            [
              "9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57",
              "712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373",
            ],
            [
              "176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66",
              "ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3",
            ],
            [
              "75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8",
              "9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8",
            ],
            [
              "809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721",
              "9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1",
            ],
            [
              "1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180",
              "4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9",
            ],
          ],
        },
      };
    },
    {},
  ],
  97: [
    function (t, e, r) {
      "use strict";
      function i(t, e, r) {
        var i = new Array(Math.max(t.bitLength(), r) + 1);
        i.fill(0);
        for (var n = 1 << (e + 1), s = t.clone(), o = 0; o < i.length; o++) {
          var a,
            f = s.andln(n - 1);
          s.isOdd()
            ? ((a = f > (n >> 1) - 1 ? (n >> 1) - f : f), s.isubn(a))
            : (a = 0),
            (i[o] = a),
            s.iushrn(1);
        }
        return i;
      }
      function n(t, e) {
        var r = [[], []];
        (t = t.clone()), (e = e.clone());
        for (var i, n = 0, s = 0; t.cmpn(-n) > 0 || e.cmpn(-s) > 0; ) {
          var o,
            a,
            f = (t.andln(3) + n) & 3,
            h = (e.andln(3) + s) & 3;
          3 === f && (f = -1),
            3 === h && (h = -1),
            0 == (1 & f)
              ? (o = 0)
              : ((i = (t.andln(7) + n) & 7),
                (o = (3 !== i && 5 !== i) || 2 !== h ? f : -f)),
            r[0].push(o),
            0 == (1 & h)
              ? (a = 0)
              : ((i = (e.andln(7) + s) & 7),
                (a = (3 !== i && 5 !== i) || 2 !== f ? h : -h)),
            r[1].push(a),
            2 * n === o + 1 && (n = 1 - n),
            2 * s === a + 1 && (s = 1 - s),
            t.iushrn(1),
            e.iushrn(1);
        }
        return r;
      }
      function s(t, e, r) {
        var i = "_" + e;
        t.prototype[e] = function () {
          return void 0 !== this[i] ? this[i] : (this[i] = r.call(this));
        };
      }
      function o(t) {
        return "string" == typeof t ? f.toArray(t, "hex") : t;
      }
      function a(t) {
        return new h(t, "hex", "le");
      }
      var f = r,
        h = t("bn.js"),
        u = t("minimalistic-assert"),
        c = t("minimalistic-crypto-utils");
      (f.assert = u),
        (f.toArray = c.toArray),
        (f.zero2 = c.zero2),
        (f.toHex = c.toHex),
        (f.encode = c.encode),
        (f.getNAF = i),
        (f.getJSF = n),
        (f.cachedProperty = s),
        (f.parseBytes = o),
        (f.intFromLE = a);
    },
    {
      "bn.js": 98,
      "minimalistic-assert": 136,
      "minimalistic-crypto-utils": 137,
    },
  ],
  98: [
    function (t, e, r) {
      arguments[4][15][0].apply(r, arguments);
    },
    { buffer: 19, dup: 15 },
  ],
  99: [
    function (t, e, r) {
      e.exports = {
        name: "elliptic",
        version: "6.5.4",
        description: "EC cryptography",
        main: "lib/elliptic.js",
        files: ["lib"],
        scripts: {
          lint: "eslint lib test",
          "lint:fix": "npm run lint -- --fix",
          unit: "istanbul test _mocha --reporter=spec test/index.js",
          test: "npm run lint && npm run unit",
          version: "grunt dist && git add dist/",
        },
        repository: { type: "git", url: "git@github.com:indutny/elliptic" },
        keywords: ["EC", "Elliptic", "curve", "Cryptography"],
        author: "Fedor Indutny <fedor@indutny.com>",
        license: "MIT",
        bugs: { url: "https://github.com/indutny/elliptic/issues" },
        homepage: "https://github.com/indutny/elliptic",
        devDependencies: {
          brfs: "^2.0.2",
          coveralls: "^3.1.0",
          eslint: "^7.6.0",
          grunt: "^1.2.1",
          "grunt-browserify": "^5.3.0",
          "grunt-cli": "^1.3.2",
          "grunt-contrib-connect": "^3.0.0",
          "grunt-contrib-copy": "^1.0.0",
          "grunt-contrib-uglify": "^5.0.0",
          "grunt-mocha-istanbul": "^5.0.2",
          "grunt-saucelabs": "^9.0.1",
          istanbul: "^0.4.5",
          mocha: "^8.0.1",
        },
        dependencies: {
          "bn.js": "^4.11.9",
          brorand: "^1.1.0",
          "hash.js": "^1.0.0",
          "hmac-drbg": "^1.0.1",
          inherits: "^2.0.4",
          "minimalistic-assert": "^1.0.1",
          "minimalistic-crypto-utils": "^1.0.1",
        },
      };
    },
    {},
  ],
  100: [
    function (t, e, r) {
      "use strict";
      function i(t) {
        console && console.warn && console.warn(t);
      }
      function n() {
        n.init.call(this);
      }
      function s(t) {
        if ("function" != typeof t)
          throw new TypeError(
            'The "listener" argument must be of type Function. Received type ' +
              typeof t
          );
      }
      function o(t) {
        return void 0 === t._maxListeners
          ? n.defaultMaxListeners
          : t._maxListeners;
      }
      function a(t, e, r, n) {
        var a, f, h;
        if (
          (s(r),
          (f = t._events),
          void 0 === f
            ? ((f = t._events = Object.create(null)), (t._eventsCount = 0))
            : (void 0 !== f.newListener &&
                (t.emit("newListener", e, r.listener ? r.listener : r),
                (f = t._events)),
              (h = f[e])),
          void 0 === h)
        )
          (h = f[e] = r), ++t._eventsCount;
        else if (
          ("function" == typeof h
            ? (h = f[e] = n ? [r, h] : [h, r])
            : n
            ? h.unshift(r)
            : h.push(r),
          (a = o(t)),
          a > 0 && h.length > a && !h.warned)
        ) {
          h.warned = !0;
          var u = new Error(
            "Possible EventEmitter memory leak detected. " +
              h.length +
              " " +
              String(e) +
              " listeners added. Use emitter.setMaxListeners() to increase limit"
          );
          (u.name = "MaxListenersExceededWarning"),
            (u.emitter = t),
            (u.type = e),
            (u.count = h.length),
            i(u);
        }
        return t;
      }
      function f() {
        if (!this.fired)
          return (
            this.target.removeListener(this.type, this.wrapFn),
            (this.fired = !0),
            0 === arguments.length
              ? this.listener.call(this.target)
              : this.listener.apply(this.target, arguments)
          );
      }
      function h(t, e, r) {
        var i = { fired: !1, wrapFn: void 0, target: t, type: e, listener: r },
          n = f.bind(i);
        return (n.listener = r), (i.wrapFn = n), n;
      }
      function u(t, e, r) {
        var i = t._events;
        if (void 0 === i) return [];
        var n = i[e];
        return void 0 === n
          ? []
          : "function" == typeof n
          ? r
            ? [n.listener || n]
            : [n]
          : r
          ? p(n)
          : d(n, n.length);
      }
      function c(t) {
        var e = this._events;
        if (void 0 !== e) {
          var r = e[t];
          if ("function" == typeof r) return 1;
          if (void 0 !== r) return r.length;
        }
        return 0;
      }
      function d(t, e) {
        for (var r = new Array(e), i = 0; i < e; ++i) r[i] = t[i];
        return r;
      }
      function l(t, e) {
        for (; e + 1 < t.length; e++) t[e] = t[e + 1];
        t.pop();
      }
      function p(t) {
        for (var e = new Array(t.length), r = 0; r < e.length; ++r)
          e[r] = t[r].listener || t[r];
        return e;
      }
      function b(t, e) {
        return new Promise(function (r, i) {
          function n(r) {
            t.removeListener(e, s), i(r);
          }
          function s() {
            "function" == typeof t.removeListener &&
              t.removeListener("error", n),
              r([].slice.call(arguments));
          }
          y(t, e, s, { once: !0 }), "error" !== e && m(t, n, { once: !0 });
        });
      }
      function m(t, e, r) {
        "function" == typeof t.on && y(t, "error", e, r);
      }
      function y(t, e, r, i) {
        if ("function" == typeof t.on) i.once ? t.once(e, r) : t.on(e, r);
        else {
          if ("function" != typeof t.addEventListener)
            throw new TypeError(
              'The "emitter" argument must be of type EventEmitter. Received type ' +
                typeof t
            );
          t.addEventListener(e, function n(s) {
            i.once && t.removeEventListener(e, n), r(s);
          });
        }
      }
      var g,
        v = "object" == typeof Reflect ? Reflect : null,
        w =
          v && "function" == typeof v.apply
            ? v.apply
            : function (t, e, r) {
                return Function.prototype.apply.call(t, e, r);
              };
      g =
        v && "function" == typeof v.ownKeys
          ? v.ownKeys
          : Object.getOwnPropertySymbols
          ? function (t) {
              return Object.getOwnPropertyNames(t).concat(
                Object.getOwnPropertySymbols(t)
              );
            }
          : function (t) {
              return Object.getOwnPropertyNames(t);
            };
      var _ =
        Number.isNaN ||
        function (t) {
          return t != t;
        };
      (e.exports = n),
        (e.exports.once = b),
        (n.EventEmitter = n),
        (n.prototype._events = void 0),
        (n.prototype._eventsCount = 0),
        (n.prototype._maxListeners = void 0);
      var M = 10;
      Object.defineProperty(n, "defaultMaxListeners", {
        enumerable: !0,
        get: function () {
          return M;
        },
        set: function (t) {
          if ("number" != typeof t || t < 0 || _(t))
            throw new RangeError(
              'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
                t +
                "."
            );
          M = t;
        },
      }),
        (n.init = function () {
          (void 0 !== this._events &&
            this._events !== Object.getPrototypeOf(this)._events) ||
            ((this._events = Object.create(null)), (this._eventsCount = 0)),
            (this._maxListeners = this._maxListeners || void 0);
        }),
        (n.prototype.setMaxListeners = function (t) {
          if ("number" != typeof t || t < 0 || _(t))
            throw new RangeError(
              'The value of "n" is out of range. It must be a non-negative number. Received ' +
                t +
                "."
            );
          return (this._maxListeners = t), this;
        }),
        (n.prototype.getMaxListeners = function () {
          return o(this);
        }),
        (n.prototype.emit = function (t) {
          for (var e = [], r = 1; r < arguments.length; r++)
            e.push(arguments[r]);
          var i = "error" === t,
            n = this._events;
          if (void 0 !== n) i = i && void 0 === n.error;
          else if (!i) return !1;
          if (i) {
            var s;
            if ((e.length > 0 && (s = e[0]), s instanceof Error)) throw s;
            var o = new Error(
              "Unhandled error." + (s ? " (" + s.message + ")" : "")
            );
            throw ((o.context = s), o);
          }
          var a = n[t];
          if (void 0 === a) return !1;
          if ("function" == typeof a) w(a, this, e);
          else {
            var f = a.length,
              h = d(a, f);
            for (r = 0; r < f; ++r) w(h[r], this, e);
          }
          return !0;
        }),
        (n.prototype.addListener = function (t, e) {
          return a(this, t, e, !1);
        }),
        (n.prototype.on = n.prototype.addListener),
        (n.prototype.prependListener = function (t, e) {
          return a(this, t, e, !0);
        }),
        (n.prototype.once = function (t, e) {
          return s(e), this.on(t, h(this, t, e)), this;
        }),
        (n.prototype.prependOnceListener = function (t, e) {
          return s(e), this.prependListener(t, h(this, t, e)), this;
        }),
        (n.prototype.removeListener = function (t, e) {
          var r, i, n, o, a;
          if ((s(e), (i = this._events), void 0 === i)) return this;
          if (((r = i[t]), void 0 === r)) return this;
          if (r === e || r.listener === e)
            0 == --this._eventsCount
              ? (this._events = Object.create(null))
              : (delete i[t],
                i.removeListener &&
                  this.emit("removeListener", t, r.listener || e));
          else if ("function" != typeof r) {
            for (n = -1, o = r.length - 1; o >= 0; o--)
              if (r[o] === e || r[o].listener === e) {
                (a = r[o].listener), (n = o);
                break;
              }
            if (n < 0) return this;
            0 === n ? r.shift() : l(r, n),
              1 === r.length && (i[t] = r[0]),
              void 0 !== i.removeListener &&
                this.emit("removeListener", t, a || e);
          }
          return this;
        }),
        (n.prototype.off = n.prototype.removeListener),
        (n.prototype.removeAllListeners = function (t) {
          var e, r, i;
          if (((r = this._events), void 0 === r)) return this;
          if (void 0 === r.removeListener)
            return (
              0 === arguments.length
                ? ((this._events = Object.create(null)),
                  (this._eventsCount = 0))
                : void 0 !== r[t] &&
                  (0 == --this._eventsCount
                    ? (this._events = Object.create(null))
                    : delete r[t]),
              this
            );
          if (0 === arguments.length) {
            var n,
              s = Object.keys(r);
            for (i = 0; i < s.length; ++i)
              (n = s[i]), "removeListener" !== n && this.removeAllListeners(n);
            return (
              this.removeAllListeners("removeListener"),
              (this._events = Object.create(null)),
              (this._eventsCount = 0),
              this
            );
          }
          if (((e = r[t]), "function" == typeof e)) this.removeListener(t, e);
          else if (void 0 !== e)
            for (i = e.length - 1; i >= 0; i--) this.removeListener(t, e[i]);
          return this;
        }),
        (n.prototype.listeners = function (t) {
          return u(this, t, !0);
        }),
        (n.prototype.rawListeners = function (t) {
          return u(this, t, !1);
        }),
        (n.listenerCount = function (t, e) {
          return "function" == typeof t.listenerCount
            ? t.listenerCount(e)
            : c.call(t, e);
        }),
        (n.prototype.listenerCount = c),
        (n.prototype.eventNames = function () {
          return this._eventsCount > 0 ? g(this._events) : [];
        });
    },
    {},
  ],
  101: [
    function (t, e, r) {
      function i(t, e, r, i) {
        if (
          (n.isBuffer(t) || (t = n.from(t, "binary")),
          e && (n.isBuffer(e) || (e = n.from(e, "binary")), 8 !== e.length))
        )
          throw new RangeError("salt should be Buffer with 8 byte length");
        for (
          var o = r / 8, a = n.alloc(o), f = n.alloc(i || 0), h = n.alloc(0);
          o > 0 || i > 0;

        ) {
          var u = new s();
          u.update(h), u.update(t), e && u.update(e), (h = u.digest());
          var c = 0;
          if (o > 0) {
            var d = a.length - o;
            (c = Math.min(o, h.length)), h.copy(a, d, 0, c), (o -= c);
          }
          if (c < h.length && i > 0) {
            var l = f.length - i,
              p = Math.min(i, h.length - c);
            h.copy(f, l, c, c + p), (i -= p);
          }
        }
        return h.fill(0), { key: a, iv: f };
      }
      var n = t("safe-buffer").Buffer,
        s = t("md5.js");
      e.exports = i;
    },
    { "md5.js": 133, "safe-buffer": 160 },
  ],
  102: [
    function (t, e, r) {
      "use strict";
      function i(t, e) {
        if (!s.isBuffer(t) && "string" != typeof t)
          throw new TypeError(e + " must be a string or a buffer");
      }
      function n(t) {
        o.call(this),
          (this._block = s.allocUnsafe(t)),
          (this._blockSize = t),
          (this._blockOffset = 0),
          (this._length = [0, 0, 0, 0]),
          (this._finalized = !1);
      }
      var s = t("safe-buffer").Buffer,
        o = t("readable-stream").Transform,
        a = t("inherits");
      a(n, o),
        (n.prototype._transform = function (t, e, r) {
          var i = null;
          try {
            this.update(t, e);
          } catch (t) {
            i = t;
          }
          r(i);
        }),
        (n.prototype._flush = function (t) {
          var e = null;
          try {
            this.push(this.digest());
          } catch (t) {
            e = t;
          }
          t(e);
        }),
        (n.prototype.update = function (t, e) {
          if ((i(t, "Data"), this._finalized))
            throw new Error("Digest already called");
          s.isBuffer(t) || (t = s.from(t, e));
          for (
            var r = this._block, n = 0;
            this._blockOffset + t.length - n >= this._blockSize;

          ) {
            for (var o = this._blockOffset; o < this._blockSize; )
              r[o++] = t[n++];
            this._update(), (this._blockOffset = 0);
          }
          for (; n < t.length; ) r[this._blockOffset++] = t[n++];
          for (var a = 0, f = 8 * t.length; f > 0; ++a)
            (this._length[a] += f),
              (f = (this._length[a] / 4294967296) | 0),
              f > 0 && (this._length[a] -= 4294967296 * f);
          return this;
        }),
        (n.prototype._update = function () {
          throw new Error("_update is not implemented");
        }),
        (n.prototype.digest = function (t) {
          if (this._finalized) throw new Error("Digest already called");
          this._finalized = !0;
          var e = this._digest();
          void 0 !== t && (e = e.toString(t)),
            this._block.fill(0),
            (this._blockOffset = 0);
          for (var r = 0; r < 4; ++r) this._length[r] = 0;
          return e;
        }),
        (n.prototype._digest = function () {
          throw new Error("_digest is not implemented");
        }),
        (e.exports = n);
    },
    { inherits: 132, "readable-stream": 117, "safe-buffer": 160 },
  ],
  103: [
    function (t, e, r) {
      arguments[4][47][0].apply(r, arguments);
    },
    { dup: 47 },
  ],
  104: [
    function (t, e, r) {
      arguments[4][48][0].apply(r, arguments);
    },
    {
      "./_stream_readable": 106,
      "./_stream_writable": 108,
      _process: 149,
      dup: 48,
      inherits: 132,
    },
  ],
  105: [
    function (t, e, r) {
      arguments[4][49][0].apply(r, arguments);
    },
    { "./_stream_transform": 107, dup: 49, inherits: 132 },
  ],
  106: [
    function (t, e, r) {
      arguments[4][50][0].apply(r, arguments);
    },
    {
      "../errors": 103,
      "./_stream_duplex": 104,
      "./internal/streams/async_iterator": 109,
      "./internal/streams/buffer_list": 110,
      "./internal/streams/destroy": 111,
      "./internal/streams/from": 113,
      "./internal/streams/state": 115,
      "./internal/streams/stream": 116,
      _process: 149,
      buffer: 63,
      dup: 50,
      events: 100,
      inherits: 132,
      "string_decoder/": 185,
      util: 19,
    },
  ],
  107: [
    function (t, e, r) {
      arguments[4][51][0].apply(r, arguments);
    },
    { "../errors": 103, "./_stream_duplex": 104, dup: 51, inherits: 132 },
  ],
  108: [
    function (t, e, r) {
      arguments[4][52][0].apply(r, arguments);
    },
    {
      "../errors": 103,
      "./_stream_duplex": 104,
      "./internal/streams/destroy": 111,
      "./internal/streams/state": 115,
      "./internal/streams/stream": 116,
      _process: 149,
      buffer: 63,
      dup: 52,
      inherits: 132,
      "util-deprecate": 186,
    },
  ],
  109: [
    function (t, e, r) {
      arguments[4][53][0].apply(r, arguments);
    },
    { "./end-of-stream": 112, _process: 149, dup: 53 },
  ],
  110: [
    function (t, e, r) {
      arguments[4][54][0].apply(r, arguments);
    },
    { buffer: 63, dup: 54, util: 19 },
  ],
  111: [
    function (t, e, r) {
      arguments[4][55][0].apply(r, arguments);
    },
    { _process: 149, dup: 55 },
  ],
  112: [
    function (t, e, r) {
      arguments[4][56][0].apply(r, arguments);
    },
    { "../../../errors": 103, dup: 56 },
  ],
  113: [
    function (t, e, r) {
      arguments[4][57][0].apply(r, arguments);
    },
    { dup: 57 },
  ],
  114: [
    function (t, e, r) {
      arguments[4][58][0].apply(r, arguments);
    },
    { "../../../errors": 103, "./end-of-stream": 112, dup: 58 },
  ],
  115: [
    function (t, e, r) {
      arguments[4][59][0].apply(r, arguments);
    },
    { "../../../errors": 103, dup: 59 },
  ],
  116: [
    function (t, e, r) {
      arguments[4][60][0].apply(r, arguments);
    },
    { dup: 60, events: 100 },
  ],
  117: [
    function (t, e, r) {
      arguments[4][61][0].apply(r, arguments);
    },
    {
      "./lib/_stream_duplex.js": 104,
      "./lib/_stream_passthrough.js": 105,
      "./lib/_stream_readable.js": 106,
      "./lib/_stream_transform.js": 107,
      "./lib/_stream_writable.js": 108,
      "./lib/internal/streams/end-of-stream.js": 112,
      "./lib/internal/streams/pipeline.js": 114,
      dup: 61,
    },
  ],
  118: [
    function (t, e, r) {
      var i = r;
      (i.utils = t("./hash/utils")),
        (i.common = t("./hash/common")),
        (i.sha = t("./hash/sha")),
        (i.ripemd = t("./hash/ripemd")),
        (i.hmac = t("./hash/hmac")),
        (i.sha1 = i.sha.sha1),
        (i.sha256 = i.sha.sha256),
        (i.sha224 = i.sha.sha224),
        (i.sha384 = i.sha.sha384),
        (i.sha512 = i.sha.sha512),
        (i.ripemd160 = i.ripemd.ripemd160);
    },
    {
      "./hash/common": 119,
      "./hash/hmac": 120,
      "./hash/ripemd": 121,
      "./hash/sha": 122,
      "./hash/utils": 129,
    },
  ],
  119: [
    function (t, e, r) {
      "use strict";
      function i() {
        (this.pending = null),
          (this.pendingTotal = 0),
          (this.blockSize = this.constructor.blockSize),
          (this.outSize = this.constructor.outSize),
          (this.hmacStrength = this.constructor.hmacStrength),
          (this.padLength = this.constructor.padLength / 8),
          (this.endian = "big"),
          (this._delta8 = this.blockSize / 8),
          (this._delta32 = this.blockSize / 32);
      }
      var n = t("./utils"),
        s = t("minimalistic-assert");
      (r.BlockHash = i),
        (i.prototype.update = function (t, e) {
          if (
            ((t = n.toArray(t, e)),
            this.pending
              ? (this.pending = this.pending.concat(t))
              : (this.pending = t),
            (this.pendingTotal += t.length),
            this.pending.length >= this._delta8)
          ) {
            t = this.pending;
            var r = t.length % this._delta8;
            (this.pending = t.slice(t.length - r, t.length)),
              0 === this.pending.length && (this.pending = null),
              (t = n.join32(t, 0, t.length - r, this.endian));
            for (var i = 0; i < t.length; i += this._delta32)
              this._update(t, i, i + this._delta32);
          }
          return this;
        }),
        (i.prototype.digest = function (t) {
          return (
            this.update(this._pad()), s(null === this.pending), this._digest(t)
          );
        }),
        (i.prototype._pad = function () {
          var t = this.pendingTotal,
            e = this._delta8,
            r = e - ((t + this.padLength) % e),
            i = new Array(r + this.padLength);
          i[0] = 128;
          for (var n = 1; n < r; n++) i[n] = 0;
          if (((t <<= 3), "big" === this.endian)) {
            for (var s = 8; s < this.padLength; s++) i[n++] = 0;
            (i[n++] = 0),
              (i[n++] = 0),
              (i[n++] = 0),
              (i[n++] = 0),
              (i[n++] = (t >>> 24) & 255),
              (i[n++] = (t >>> 16) & 255),
              (i[n++] = (t >>> 8) & 255),
              (i[n++] = 255 & t);
          } else
            for (
              i[n++] = 255 & t,
                i[n++] = (t >>> 8) & 255,
                i[n++] = (t >>> 16) & 255,
                i[n++] = (t >>> 24) & 255,
                i[n++] = 0,
                i[n++] = 0,
                i[n++] = 0,
                i[n++] = 0,
                s = 8;
              s < this.padLength;
              s++
            )
              i[n++] = 0;
          return i;
        });
    },
    { "./utils": 129, "minimalistic-assert": 136 },
  ],
  120: [
    function (t, e, r) {
      "use strict";
      function i(t, e, r) {
        if (!(this instanceof i)) return new i(t, e, r);
        (this.Hash = t),
          (this.blockSize = t.blockSize / 8),
          (this.outSize = t.outSize / 8),
          (this.inner = null),
          (this.outer = null),
          this._init(n.toArray(e, r));
      }
      var n = t("./utils"),
        s = t("minimalistic-assert");
      (e.exports = i),
        (i.prototype._init = function (t) {
          t.length > this.blockSize && (t = new this.Hash().update(t).digest()),
            s(t.length <= this.blockSize);
          for (var e = t.length; e < this.blockSize; e++) t.push(0);
          for (e = 0; e < t.length; e++) t[e] ^= 54;
          for (this.inner = new this.Hash().update(t), e = 0; e < t.length; e++)
            t[e] ^= 106;
          this.outer = new this.Hash().update(t);
        }),
        (i.prototype.update = function (t, e) {
          return this.inner.update(t, e), this;
        }),
        (i.prototype.digest = function (t) {
          return this.outer.update(this.inner.digest()), this.outer.digest(t);
        });
    },
    { "./utils": 129, "minimalistic-assert": 136 },
  ],
  121: [
    function (t, e, r) {
      "use strict";
      function i() {
        if (!(this instanceof i)) return new i();
        l.call(this),
          (this.h = [
            1732584193, 4023233417, 2562383102, 271733878, 3285377520,
          ]),
          (this.endian = "little");
      }
      function n(t, e, r, i) {
        return t <= 15
          ? e ^ r ^ i
          : t <= 31
          ? (e & r) | (~e & i)
          : t <= 47
          ? (e | ~r) ^ i
          : t <= 63
          ? (e & i) | (r & ~i)
          : e ^ (r | ~i);
      }
      function s(t) {
        return t <= 15
          ? 0
          : t <= 31
          ? 1518500249
          : t <= 47
          ? 1859775393
          : t <= 63
          ? 2400959708
          : 2840853838;
      }
      function o(t) {
        return t <= 15
          ? 1352829926
          : t <= 31
          ? 1548603684
          : t <= 47
          ? 1836072691
          : t <= 63
          ? 2053994217
          : 0;
      }
      var a = t("./utils"),
        f = t("./common"),
        h = a.rotl32,
        u = a.sum32,
        c = a.sum32_3,
        d = a.sum32_4,
        l = f.BlockHash;
      a.inherits(i, l),
        (r.ripemd160 = i),
        (i.blockSize = 512),
        (i.outSize = 160),
        (i.hmacStrength = 192),
        (i.padLength = 64),
        (i.prototype._update = function (t, e) {
          for (
            var r = this.h[0],
              i = this.h[1],
              a = this.h[2],
              f = this.h[3],
              l = this.h[4],
              g = r,
              v = i,
              w = a,
              _ = f,
              M = l,
              S = 0;
            S < 80;
            S++
          ) {
            var E = u(h(d(r, n(S, i, a, f), t[p[S] + e], s(S)), m[S]), l);
            (r = l),
              (l = f),
              (f = h(a, 10)),
              (a = i),
              (i = E),
              (E = u(h(d(g, n(79 - S, v, w, _), t[b[S] + e], o(S)), y[S]), M)),
              (g = M),
              (M = _),
              (_ = h(w, 10)),
              (w = v),
              (v = E);
          }
          (E = c(this.h[1], a, _)),
            (this.h[1] = c(this.h[2], f, M)),
            (this.h[2] = c(this.h[3], l, g)),
            (this.h[3] = c(this.h[4], r, v)),
            (this.h[4] = c(this.h[0], i, w)),
            (this.h[0] = E);
        }),
        (i.prototype._digest = function (t) {
          return "hex" === t
            ? a.toHex32(this.h, "little")
            : a.split32(this.h, "little");
        });
      var p = [
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10,
          6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7,
          0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5,
          6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13,
        ],
        b = [
          5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0,
          13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8,
          12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10,
          14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11,
        ],
        m = [
          11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13,
          11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13,
          15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5,
          6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5,
          6,
        ],
        y = [
          8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7,
          12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14,
          12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9,
          12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11,
        ];
    },
    { "./common": 119, "./utils": 129 },
  ],
  122: [
    function (t, e, r) {
      "use strict";
      (r.sha1 = t("./sha/1")),
        (r.sha224 = t("./sha/224")),
        (r.sha256 = t("./sha/256")),
        (r.sha384 = t("./sha/384")),
        (r.sha512 = t("./sha/512"));
    },
    {
      "./sha/1": 123,
      "./sha/224": 124,
      "./sha/256": 125,
      "./sha/384": 126,
      "./sha/512": 127,
    },
  ],
  123: [
    function (t, e, r) {
      "use strict";
      function i() {
        if (!(this instanceof i)) return new i();
        c.call(this),
          (this.h = [
            1732584193, 4023233417, 2562383102, 271733878, 3285377520,
          ]),
          (this.W = new Array(80));
      }
      var n = t("../utils"),
        s = t("../common"),
        o = t("./common"),
        a = n.rotl32,
        f = n.sum32,
        h = n.sum32_5,
        u = o.ft_1,
        c = s.BlockHash,
        d = [1518500249, 1859775393, 2400959708, 3395469782];
      n.inherits(i, c),
        (e.exports = i),
        (i.blockSize = 512),
        (i.outSize = 160),
        (i.hmacStrength = 80),
        (i.padLength = 64),
        (i.prototype._update = function (t, e) {
          for (var r = this.W, i = 0; i < 16; i++) r[i] = t[e + i];
          for (; i < r.length; i++)
            r[i] = a(r[i - 3] ^ r[i - 8] ^ r[i - 14] ^ r[i - 16], 1);
          var n = this.h[0],
            s = this.h[1],
            o = this.h[2],
            c = this.h[3],
            l = this.h[4];
          for (i = 0; i < r.length; i++) {
            var p = ~~(i / 20),
              b = h(a(n, 5), u(p, s, o, c), l, r[i], d[p]);
            (l = c), (c = o), (o = a(s, 30)), (s = n), (n = b);
          }
          (this.h[0] = f(this.h[0], n)),
            (this.h[1] = f(this.h[1], s)),
            (this.h[2] = f(this.h[2], o)),
            (this.h[3] = f(this.h[3], c)),
            (this.h[4] = f(this.h[4], l));
        }),
        (i.prototype._digest = function (t) {
          return "hex" === t
            ? n.toHex32(this.h, "big")
            : n.split32(this.h, "big");
        });
    },
    { "../common": 119, "../utils": 129, "./common": 128 },
  ],
  124: [
    function (t, e, r) {
      "use strict";
      function i() {
        if (!(this instanceof i)) return new i();
        s.call(this),
          (this.h = [
            3238371032, 914150663, 812702999, 4144912697, 4290775857,
            1750603025, 1694076839, 3204075428,
          ]);
      }
      var n = t("../utils"),
        s = t("./256");
      n.inherits(i, s),
        (e.exports = i),
        (i.blockSize = 512),
        (i.outSize = 224),
        (i.hmacStrength = 192),
        (i.padLength = 64),
        (i.prototype._digest = function (t) {
          return "hex" === t
            ? n.toHex32(this.h.slice(0, 7), "big")
            : n.split32(this.h.slice(0, 7), "big");
        });
    },
    { "../utils": 129, "./256": 125 },
  ],
  125: [
    function (t, e, r) {
      "use strict";
      function i() {
        if (!(this instanceof i)) return new i();
        y.call(this),
          (this.h = [
            1779033703, 3144134277, 1013904242, 2773480762, 1359893119,
            2600822924, 528734635, 1541459225,
          ]),
          (this.k = g),
          (this.W = new Array(64));
      }
      var n = t("../utils"),
        s = t("../common"),
        o = t("./common"),
        a = t("minimalistic-assert"),
        f = n.sum32,
        h = n.sum32_4,
        u = n.sum32_5,
        c = o.ch32,
        d = o.maj32,
        l = o.s0_256,
        p = o.s1_256,
        b = o.g0_256,
        m = o.g1_256,
        y = s.BlockHash,
        g = [
          1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
          2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987,
          1925078388, 2162078206, 2614888103, 3248222580, 3835390401,
          4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692,
          1996064986, 2554220882, 2821834349, 2952996808, 3210313671,
          3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912,
          1294757372, 1396182291, 1695183700, 1986661051, 2177026350,
          2456956037, 2730485921, 2820302411, 3259730800, 3345764771,
          3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616,
          659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779,
          1955562222, 2024104815, 2227730452, 2361852424, 2428436474,
          2756734187, 3204031479, 3329325298,
        ];
      n.inherits(i, y),
        (e.exports = i),
        (i.blockSize = 512),
        (i.outSize = 256),
        (i.hmacStrength = 192),
        (i.padLength = 64),
        (i.prototype._update = function (t, e) {
          for (var r = this.W, i = 0; i < 16; i++) r[i] = t[e + i];
          for (; i < r.length; i++)
            r[i] = h(m(r[i - 2]), r[i - 7], b(r[i - 15]), r[i - 16]);
          var n = this.h[0],
            s = this.h[1],
            o = this.h[2],
            y = this.h[3],
            g = this.h[4],
            v = this.h[5],
            w = this.h[6],
            _ = this.h[7];
          for (a(this.k.length === r.length), i = 0; i < r.length; i++) {
            var M = u(_, p(g), c(g, v, w), this.k[i], r[i]),
              S = f(l(n), d(n, s, o));
            (_ = w),
              (w = v),
              (v = g),
              (g = f(y, M)),
              (y = o),
              (o = s),
              (s = n),
              (n = f(M, S));
          }
          (this.h[0] = f(this.h[0], n)),
            (this.h[1] = f(this.h[1], s)),
            (this.h[2] = f(this.h[2], o)),
            (this.h[3] = f(this.h[3], y)),
            (this.h[4] = f(this.h[4], g)),
            (this.h[5] = f(this.h[5], v)),
            (this.h[6] = f(this.h[6], w)),
            (this.h[7] = f(this.h[7], _));
        }),
        (i.prototype._digest = function (t) {
          return "hex" === t
            ? n.toHex32(this.h, "big")
            : n.split32(this.h, "big");
        });
    },
    {
      "../common": 119,
      "../utils": 129,
      "./common": 128,
      "minimalistic-assert": 136,
    },
  ],
  126: [
    function (t, e, r) {
      "use strict";
      function i() {
        if (!(this instanceof i)) return new i();
        s.call(this),
          (this.h = [
            3418070365, 3238371032, 1654270250, 914150663, 2438529370,
            812702999, 355462360, 4144912697, 1731405415, 4290775857,
            2394180231, 1750603025, 3675008525, 1694076839, 1203062813,
            3204075428,
          ]);
      }
      var n = t("../utils"),
        s = t("./512");
      n.inherits(i, s),
        (e.exports = i),
        (i.blockSize = 1024),
        (i.outSize = 384),
        (i.hmacStrength = 192),
        (i.padLength = 128),
        (i.prototype._digest = function (t) {
          return "hex" === t
            ? n.toHex32(this.h.slice(0, 12), "big")
            : n.split32(this.h.slice(0, 12), "big");
        });
    },
    { "../utils": 129, "./512": 127 },
  ],
  127: [
    function (t, e, r) {
      "use strict";
      function i() {
        if (!(this instanceof i)) return new i();
        I.call(this),
          (this.h = [
            1779033703, 4089235720, 3144134277, 2227873595, 1013904242,
            4271175723, 2773480762, 1595750129, 1359893119, 2917565137,
            2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209,
          ]),
          (this.k = j),
          (this.W = new Array(160));
      }
      function n(t, e, r, i, n) {
        var s = (t & r) ^ (~t & n);
        return s < 0 && (s += 4294967296), s;
      }
      function s(t, e, r, i, n, s) {
        var o = (e & i) ^ (~e & s);
        return o < 0 && (o += 4294967296), o;
      }
      function o(t, e, r, i, n) {
        var s = (t & r) ^ (t & n) ^ (r & n);
        return s < 0 && (s += 4294967296), s;
      }
      function a(t, e, r, i, n, s) {
        var o = (e & i) ^ (e & s) ^ (i & s);
        return o < 0 && (o += 4294967296), o;
      }
      function f(t, e) {
        var r = v(t, e, 28),
          i = v(e, t, 2),
          n = v(e, t, 7),
          s = r ^ i ^ n;
        return s < 0 && (s += 4294967296), s;
      }
      function h(t, e) {
        var r = w(t, e, 28),
          i = w(e, t, 2),
          n = w(e, t, 7),
          s = r ^ i ^ n;
        return s < 0 && (s += 4294967296), s;
      }
      function u(t, e) {
        var r = v(t, e, 14),
          i = v(t, e, 18),
          n = v(e, t, 9),
          s = r ^ i ^ n;
        return s < 0 && (s += 4294967296), s;
      }
      function c(t, e) {
        var r = w(t, e, 14),
          i = w(t, e, 18),
          n = w(e, t, 9),
          s = r ^ i ^ n;
        return s < 0 && (s += 4294967296), s;
      }
      function d(t, e) {
        var r = v(t, e, 1),
          i = v(t, e, 8),
          n = _(t, e, 7),
          s = r ^ i ^ n;
        return s < 0 && (s += 4294967296), s;
      }
      function l(t, e) {
        var r = w(t, e, 1),
          i = w(t, e, 8),
          n = M(t, e, 7),
          s = r ^ i ^ n;
        return s < 0 && (s += 4294967296), s;
      }
      function p(t, e) {
        var r = v(t, e, 19),
          i = v(e, t, 29),
          n = _(t, e, 6),
          s = r ^ i ^ n;
        return s < 0 && (s += 4294967296), s;
      }
      function b(t, e) {
        var r = w(t, e, 19),
          i = w(e, t, 29),
          n = M(t, e, 6),
          s = r ^ i ^ n;
        return s < 0 && (s += 4294967296), s;
      }
      var m = t("../utils"),
        y = t("../common"),
        g = t("minimalistic-assert"),
        v = m.rotr64_hi,
        w = m.rotr64_lo,
        _ = m.shr64_hi,
        M = m.shr64_lo,
        S = m.sum64,
        E = m.sum64_hi,
        k = m.sum64_lo,
        A = m.sum64_4_hi,
        x = m.sum64_4_lo,
        B = m.sum64_5_hi,
        R = m.sum64_5_lo,
        I = y.BlockHash,
        j = [
          1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399,
          3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265,
          2453635748, 2937671579, 2870763221, 3664609560, 3624381080,
          2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987,
          3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103,
          633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774,
          944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983,
          1495990901, 1249150122, 1856431235, 1555081692, 3175218132,
          1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016,
          2952996808, 2566594879, 3210313671, 3203337956, 3336571891,
          1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895,
          168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372,
          1522805485, 1396182291, 2643833823, 1695183700, 2343527390,
          1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627,
          2730485921, 1290863460, 2820302411, 3158454273, 3259730800,
          3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804,
          1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734,
          3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877,
          3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063,
          2003034995, 1747873779, 3602036899, 1955562222, 1575990012,
          2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044,
          2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573,
          3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711,
          3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554,
          174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315,
          685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100,
          1126000580, 2618297676, 1288033470, 3409855158, 1501505948,
          4234509866, 1607167915, 987167468, 1816402316, 1246189591,
        ];
      m.inherits(i, I),
        (e.exports = i),
        (i.blockSize = 1024),
        (i.outSize = 512),
        (i.hmacStrength = 192),
        (i.padLength = 128),
        (i.prototype._prepareBlock = function (t, e) {
          for (var r = this.W, i = 0; i < 32; i++) r[i] = t[e + i];
          for (; i < r.length; i += 2) {
            var n = p(r[i - 4], r[i - 3]),
              s = b(r[i - 4], r[i - 3]),
              o = r[i - 14],
              a = r[i - 13],
              f = d(r[i - 30], r[i - 29]),
              h = l(r[i - 30], r[i - 29]),
              u = r[i - 32],
              c = r[i - 31];
            (r[i] = A(n, s, o, a, f, h, u, c)),
              (r[i + 1] = x(n, s, o, a, f, h, u, c));
          }
        }),
        (i.prototype._update = function (t, e) {
          this._prepareBlock(t, e);
          var r = this.W,
            i = this.h[0],
            d = this.h[1],
            l = this.h[2],
            p = this.h[3],
            b = this.h[4],
            m = this.h[5],
            y = this.h[6],
            v = this.h[7],
            w = this.h[8],
            _ = this.h[9],
            M = this.h[10],
            A = this.h[11],
            x = this.h[12],
            I = this.h[13],
            j = this.h[14],
            T = this.h[15];
          g(this.k.length === r.length);
          for (var C = 0; C < r.length; C += 2) {
            var P = j,
              L = T,
              O = u(w, _),
              D = c(w, _),
              N = n(w, _, M, A, x, I),
              q = s(w, _, M, A, x, I),
              U = this.k[C],
              z = this.k[C + 1],
              K = r[C],
              F = r[C + 1],
              H = B(P, L, O, D, N, q, U, z, K, F),
              W = R(P, L, O, D, N, q, U, z, K, F);
            (P = f(i, d)),
              (L = h(i, d)),
              (O = o(i, d, l, p, b, m)),
              (D = a(i, d, l, p, b, m));
            var V = E(P, L, O, D),
              Z = k(P, L, O, D);
            (j = x),
              (T = I),
              (x = M),
              (I = A),
              (M = w),
              (A = _),
              (w = E(y, v, H, W)),
              (_ = k(v, v, H, W)),
              (y = b),
              (v = m),
              (b = l),
              (m = p),
              (l = i),
              (p = d),
              (i = E(H, W, V, Z)),
              (d = k(H, W, V, Z));
          }
          S(this.h, 0, i, d),
            S(this.h, 2, l, p),
            S(this.h, 4, b, m),
            S(this.h, 6, y, v),
            S(this.h, 8, w, _),
            S(this.h, 10, M, A),
            S(this.h, 12, x, I),
            S(this.h, 14, j, T);
        }),
        (i.prototype._digest = function (t) {
          return "hex" === t
            ? m.toHex32(this.h, "big")
            : m.split32(this.h, "big");
        });
    },
    { "../common": 119, "../utils": 129, "minimalistic-assert": 136 },
  ],
  128: [
    function (t, e, r) {
      "use strict";
      function i(t, e, r, i) {
        return 0 === t
          ? n(e, r, i)
          : 1 === t || 3 === t
          ? o(e, r, i)
          : 2 === t
          ? s(e, r, i)
          : void 0;
      }
      function n(t, e, r) {
        return (t & e) ^ (~t & r);
      }
      function s(t, e, r) {
        return (t & e) ^ (t & r) ^ (e & r);
      }
      function o(t, e, r) {
        return t ^ e ^ r;
      }
      function a(t) {
        return d(t, 2) ^ d(t, 13) ^ d(t, 22);
      }
      function f(t) {
        return d(t, 6) ^ d(t, 11) ^ d(t, 25);
      }
      function h(t) {
        return d(t, 7) ^ d(t, 18) ^ (t >>> 3);
      }
      function u(t) {
        return d(t, 17) ^ d(t, 19) ^ (t >>> 10);
      }
      var c = t("../utils"),
        d = c.rotr32;
      (r.ft_1 = i),
        (r.ch32 = n),
        (r.maj32 = s),
        (r.p32 = o),
        (r.s0_256 = a),
        (r.s1_256 = f),
        (r.g0_256 = h),
        (r.g1_256 = u);
    },
    { "../utils": 129 },
  ],
  129: [
    function (t, e, r) {
      "use strict";
      function i(t, e) {
        return (
          55296 == (64512 & t.charCodeAt(e)) &&
          !(e < 0 || e + 1 >= t.length) &&
          56320 == (64512 & t.charCodeAt(e + 1))
        );
      }
      function n(t, e) {
        if (Array.isArray(t)) return t.slice();
        if (!t) return [];
        var r = [];
        if ("string" == typeof t)
          if (e) {
            if ("hex" === e)
              for (
                t = t.replace(/[^a-z0-9]+/gi, ""),
                  t.length % 2 != 0 && (t = "0" + t),
                  s = 0;
                s < t.length;
                s += 2
              )
                r.push(parseInt(t[s] + t[s + 1], 16));
          } else
            for (var n = 0, s = 0; s < t.length; s++) {
              var o = t.charCodeAt(s);
              o < 128
                ? (r[n++] = o)
                : o < 2048
                ? ((r[n++] = (o >> 6) | 192), (r[n++] = (63 & o) | 128))
                : i(t, s)
                ? ((o =
                    65536 + ((1023 & o) << 10) + (1023 & t.charCodeAt(++s))),
                  (r[n++] = (o >> 18) | 240),
                  (r[n++] = ((o >> 12) & 63) | 128),
                  (r[n++] = ((o >> 6) & 63) | 128),
                  (r[n++] = (63 & o) | 128))
                : ((r[n++] = (o >> 12) | 224),
                  (r[n++] = ((o >> 6) & 63) | 128),
                  (r[n++] = (63 & o) | 128));
            }
        else for (s = 0; s < t.length; s++) r[s] = 0 | t[s];
        return r;
      }
      function s(t) {
        for (var e = "", r = 0; r < t.length; r++) e += f(t[r].toString(16));
        return e;
      }
      function o(t) {
        var e =
          (t >>> 24) |
          ((t >>> 8) & 65280) |
          ((t << 8) & 16711680) |
          ((255 & t) << 24);
        return e >>> 0;
      }
      function a(t, e) {
        for (var r = "", i = 0; i < t.length; i++) {
          var n = t[i];
          "little" === e && (n = o(n)), (r += h(n.toString(16)));
        }
        return r;
      }
      function f(t) {
        return 1 === t.length ? "0" + t : t;
      }
      function h(t) {
        return 7 === t.length
          ? "0" + t
          : 6 === t.length
          ? "00" + t
          : 5 === t.length
          ? "000" + t
          : 4 === t.length
          ? "0000" + t
          : 3 === t.length
          ? "00000" + t
          : 2 === t.length
          ? "000000" + t
          : 1 === t.length
          ? "0000000" + t
          : t;
      }
      function u(t, e, r, i) {
        var n = r - e;
        R(n % 4 == 0);
        for (
          var s = new Array(n / 4), o = 0, a = e;
          o < s.length;
          o++, a += 4
        ) {
          var f;
          (f =
            "big" === i
              ? (t[a] << 24) | (t[a + 1] << 16) | (t[a + 2] << 8) | t[a + 3]
              : (t[a + 3] << 24) | (t[a + 2] << 16) | (t[a + 1] << 8) | t[a]),
            (s[o] = f >>> 0);
        }
        return s;
      }
      function c(t, e) {
        for (
          var r = new Array(4 * t.length), i = 0, n = 0;
          i < t.length;
          i++, n += 4
        ) {
          var s = t[i];
          "big" === e
            ? ((r[n] = s >>> 24),
              (r[n + 1] = (s >>> 16) & 255),
              (r[n + 2] = (s >>> 8) & 255),
              (r[n + 3] = 255 & s))
            : ((r[n + 3] = s >>> 24),
              (r[n + 2] = (s >>> 16) & 255),
              (r[n + 1] = (s >>> 8) & 255),
              (r[n] = 255 & s));
        }
        return r;
      }
      function d(t, e) {
        return (t >>> e) | (t << (32 - e));
      }
      function l(t, e) {
        return (t << e) | (t >>> (32 - e));
      }
      function p(t, e) {
        return (t + e) >>> 0;
      }
      function b(t, e, r) {
        return (t + e + r) >>> 0;
      }
      function m(t, e, r, i) {
        return (t + e + r + i) >>> 0;
      }
      function y(t, e, r, i, n) {
        return (t + e + r + i + n) >>> 0;
      }
      function g(t, e, r, i) {
        var n = t[e],
          s = t[e + 1],
          o = (i + s) >>> 0,
          a = (o < i ? 1 : 0) + r + n;
        (t[e] = a >>> 0), (t[e + 1] = o);
      }
      function v(t, e, r, i) {
        var n = (e + i) >>> 0,
          s = (n < e ? 1 : 0) + t + r;
        return s >>> 0;
      }
      function w(t, e, r, i) {
        var n = e + i;
        return n >>> 0;
      }
      function _(t, e, r, i, n, s, o, a) {
        var f = 0,
          h = e;
        (h = (h + i) >>> 0),
          (f += h < e ? 1 : 0),
          (h = (h + s) >>> 0),
          (f += h < s ? 1 : 0),
          (h = (h + a) >>> 0),
          (f += h < a ? 1 : 0);
        var u = t + r + n + o + f;
        return u >>> 0;
      }
      function M(t, e, r, i, n, s, o, a) {
        var f = e + i + s + a;
        return f >>> 0;
      }
      function S(t, e, r, i, n, s, o, a, f, h) {
        var u = 0,
          c = e;
        (c = (c + i) >>> 0),
          (u += c < e ? 1 : 0),
          (c = (c + s) >>> 0),
          (u += c < s ? 1 : 0),
          (c = (c + a) >>> 0),
          (u += c < a ? 1 : 0),
          (c = (c + h) >>> 0),
          (u += c < h ? 1 : 0);
        var d = t + r + n + o + f + u;
        return d >>> 0;
      }
      function E(t, e, r, i, n, s, o, a, f, h) {
        var u = e + i + s + a + h;
        return u >>> 0;
      }
      function k(t, e, r) {
        var i = (e << (32 - r)) | (t >>> r);
        return i >>> 0;
      }
      function A(t, e, r) {
        var i = (t << (32 - r)) | (e >>> r);
        return i >>> 0;
      }
      function x(t, e, r) {
        return t >>> r;
      }
      function B(t, e, r) {
        var i = (t << (32 - r)) | (e >>> r);
        return i >>> 0;
      }
      var R = t("minimalistic-assert"),
        I = t("inherits");
      (r.inherits = I),
        (r.toArray = n),
        (r.toHex = s),
        (r.htonl = o),
        (r.toHex32 = a),
        (r.zero2 = f),
        (r.zero8 = h),
        (r.join32 = u),
        (r.split32 = c),
        (r.rotr32 = d),
        (r.rotl32 = l),
        (r.sum32 = p),
        (r.sum32_3 = b),
        (r.sum32_4 = m),
        (r.sum32_5 = y),
        (r.sum64 = g),
        (r.sum64_hi = v),
        (r.sum64_lo = w),
        (r.sum64_4_hi = _),
        (r.sum64_4_lo = M),
        (r.sum64_5_hi = S),
        (r.sum64_5_lo = E),
        (r.rotr64_hi = k),
        (r.rotr64_lo = A),
        (r.shr64_hi = x),
        (r.shr64_lo = B);
    },
    { inherits: 132, "minimalistic-assert": 136 },
  ],
  130: [
    function (t, e, r) {
      "use strict";
      function i(t) {
        if (!(this instanceof i)) return new i(t);
        (this.hash = t.hash),
          (this.predResist = !!t.predResist),
          (this.outLen = this.hash.outSize),
          (this.minEntropy = t.minEntropy || this.hash.hmacStrength),
          (this._reseed = null),
          (this.reseedInterval = null),
          (this.K = null),
          (this.V = null);
        var e = s.toArray(t.entropy, t.entropyEnc || "hex"),
          r = s.toArray(t.nonce, t.nonceEnc || "hex"),
          n = s.toArray(t.pers, t.persEnc || "hex");
        o(
          e.length >= this.minEntropy / 8,
          "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
        ),
          this._init(e, r, n);
      }
      var n = t("hash.js"),
        s = t("minimalistic-crypto-utils"),
        o = t("minimalistic-assert");
      (e.exports = i),
        (i.prototype._init = function (t, e, r) {
          var i = t.concat(e).concat(r);
          (this.K = new Array(this.outLen / 8)),
            (this.V = new Array(this.outLen / 8));
          for (var n = 0; n < this.V.length; n++)
            (this.K[n] = 0), (this.V[n] = 1);
          this._update(i),
            (this._reseed = 1),
            (this.reseedInterval = 281474976710656);
        }),
        (i.prototype._hmac = function () {
          return new n.hmac(this.hash, this.K);
        }),
        (i.prototype._update = function (t) {
          var e = this._hmac().update(this.V).update([0]);
          t && (e = e.update(t)),
            (this.K = e.digest()),
            (this.V = this._hmac().update(this.V).digest()),
            t &&
              ((this.K = this._hmac()
                .update(this.V)
                .update([1])
                .update(t)
                .digest()),
              (this.V = this._hmac().update(this.V).digest()));
        }),
        (i.prototype.reseed = function (t, e, r, i) {
          "string" != typeof e && ((i = r), (r = e), (e = null)),
            (t = s.toArray(t, e)),
            (r = s.toArray(r, i)),
            o(
              t.length >= this.minEntropy / 8,
              "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
            ),
            this._update(t.concat(r || [])),
            (this._reseed = 1);
        }),
        (i.prototype.generate = function (t, e, r, i) {
          if (this._reseed > this.reseedInterval)
            throw new Error("Reseed is required");
          "string" != typeof e && ((i = r), (r = e), (e = null)),
            r && ((r = s.toArray(r, i || "hex")), this._update(r));
          for (var n = []; n.length < t; )
            (this.V = this._hmac().update(this.V).digest()),
              (n = n.concat(this.V));
          var o = n.slice(0, t);
          return this._update(r), this._reseed++, s.encode(o, e);
        });
    },
    {
      "hash.js": 118,
      "minimalistic-assert": 136,
      "minimalistic-crypto-utils": 137,
    },
  ],
  131: [
    function (t, e, r) {
      (r.read = function (t, e, r, i, n) {
        var s,
          o,
          a = 8 * n - i - 1,
          f = (1 << a) - 1,
          h = f >> 1,
          u = -7,
          c = r ? n - 1 : 0,
          d = r ? -1 : 1,
          l = t[e + c];
        for (
          c += d, s = l & ((1 << -u) - 1), l >>= -u, u += a;
          u > 0;
          s = 256 * s + t[e + c], c += d, u -= 8
        );
        for (
          o = s & ((1 << -u) - 1), s >>= -u, u += i;
          u > 0;
          o = 256 * o + t[e + c], c += d, u -= 8
        );
        if (0 === s) s = 1 - h;
        else {
          if (s === f) return o ? NaN : (1 / 0) * (l ? -1 : 1);
          (o += Math.pow(2, i)), (s -= h);
        }
        return (l ? -1 : 1) * o * Math.pow(2, s - i);
      }),
        (r.write = function (t, e, r, i, n, s) {
          var o,
            a,
            f,
            h = 8 * s - n - 1,
            u = (1 << h) - 1,
            c = u >> 1,
            d = 23 === n ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
            l = i ? 0 : s - 1,
            p = i ? 1 : -1,
            b = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0;
          for (
            e = Math.abs(e),
              isNaN(e) || e === 1 / 0
                ? ((a = isNaN(e) ? 1 : 0), (o = u))
                : ((o = Math.floor(Math.log(e) / Math.LN2)),
                  e * (f = Math.pow(2, -o)) < 1 && (o--, (f *= 2)),
                  (e += o + c >= 1 ? d / f : d * Math.pow(2, 1 - c)),
                  e * f >= 2 && (o++, (f /= 2)),
                  o + c >= u
                    ? ((a = 0), (o = u))
                    : o + c >= 1
                    ? ((a = (e * f - 1) * Math.pow(2, n)), (o += c))
                    : ((a = e * Math.pow(2, c - 1) * Math.pow(2, n)), (o = 0)));
            n >= 8;
            t[r + l] = 255 & a, l += p, a /= 256, n -= 8
          );
          for (
            o = (o << n) | a, h += n;
            h > 0;
            t[r + l] = 255 & o, l += p, o /= 256, h -= 8
          );
          t[r + l - p] |= 128 * b;
        });
    },
    {},
  ],
  132: [
    function (t, e, r) {
      "function" == typeof Object.create
        ? (e.exports = function (t, e) {
            e &&
              ((t.super_ = e),
              (t.prototype = Object.create(e.prototype, {
                constructor: {
                  value: t,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0,
                },
              })));
          })
        : (e.exports = function (t, e) {
            if (e) {
              t.super_ = e;
              var r = function () {};
              (r.prototype = e.prototype),
                (t.prototype = new r()),
                (t.prototype.constructor = t);
            }
          });
    },
    {},
  ],
  133: [
    function (t, e, r) {
      "use strict";
      function i() {
        u.call(this, 64),
          (this._a = 1732584193),
          (this._b = 4023233417),
          (this._c = 2562383102),
          (this._d = 271733878);
      }
      function n(t, e) {
        return (t << e) | (t >>> (32 - e));
      }
      function s(t, e, r, i, s, o, a) {
        return (n((t + ((e & r) | (~e & i)) + s + o) | 0, a) + e) | 0;
      }
      function o(t, e, r, i, s, o, a) {
        return (n((t + ((e & i) | (r & ~i)) + s + o) | 0, a) + e) | 0;
      }
      function a(t, e, r, i, s, o, a) {
        return (n((t + (e ^ r ^ i) + s + o) | 0, a) + e) | 0;
      }
      function f(t, e, r, i, s, o, a) {
        return (n((t + (r ^ (e | ~i)) + s + o) | 0, a) + e) | 0;
      }
      var h = t("inherits"),
        u = t("hash-base"),
        c = t("safe-buffer").Buffer,
        d = new Array(16);
      h(i, u),
        (i.prototype._update = function () {
          for (var t = d, e = 0; e < 16; ++e)
            t[e] = this._block.readInt32LE(4 * e);
          var r = this._a,
            i = this._b,
            n = this._c,
            h = this._d;
          (r = s(r, i, n, h, t[0], 3614090360, 7)),
            (h = s(h, r, i, n, t[1], 3905402710, 12)),
            (n = s(n, h, r, i, t[2], 606105819, 17)),
            (i = s(i, n, h, r, t[3], 3250441966, 22)),
            (r = s(r, i, n, h, t[4], 4118548399, 7)),
            (h = s(h, r, i, n, t[5], 1200080426, 12)),
            (n = s(n, h, r, i, t[6], 2821735955, 17)),
            (i = s(i, n, h, r, t[7], 4249261313, 22)),
            (r = s(r, i, n, h, t[8], 1770035416, 7)),
            (h = s(h, r, i, n, t[9], 2336552879, 12)),
            (n = s(n, h, r, i, t[10], 4294925233, 17)),
            (i = s(i, n, h, r, t[11], 2304563134, 22)),
            (r = s(r, i, n, h, t[12], 1804603682, 7)),
            (h = s(h, r, i, n, t[13], 4254626195, 12)),
            (n = s(n, h, r, i, t[14], 2792965006, 17)),
            (i = s(i, n, h, r, t[15], 1236535329, 22)),
            (r = o(r, i, n, h, t[1], 4129170786, 5)),
            (h = o(h, r, i, n, t[6], 3225465664, 9)),
            (n = o(n, h, r, i, t[11], 643717713, 14)),
            (i = o(i, n, h, r, t[0], 3921069994, 20)),
            (r = o(r, i, n, h, t[5], 3593408605, 5)),
            (h = o(h, r, i, n, t[10], 38016083, 9)),
            (n = o(n, h, r, i, t[15], 3634488961, 14)),
            (i = o(i, n, h, r, t[4], 3889429448, 20)),
            (r = o(r, i, n, h, t[9], 568446438, 5)),
            (h = o(h, r, i, n, t[14], 3275163606, 9)),
            (n = o(n, h, r, i, t[3], 4107603335, 14)),
            (i = o(i, n, h, r, t[8], 1163531501, 20)),
            (r = o(r, i, n, h, t[13], 2850285829, 5)),
            (h = o(h, r, i, n, t[2], 4243563512, 9)),
            (n = o(n, h, r, i, t[7], 1735328473, 14)),
            (i = o(i, n, h, r, t[12], 2368359562, 20)),
            (r = a(r, i, n, h, t[5], 4294588738, 4)),
            (h = a(h, r, i, n, t[8], 2272392833, 11)),
            (n = a(n, h, r, i, t[11], 1839030562, 16)),
            (i = a(i, n, h, r, t[14], 4259657740, 23)),
            (r = a(r, i, n, h, t[1], 2763975236, 4)),
            (h = a(h, r, i, n, t[4], 1272893353, 11)),
            (n = a(n, h, r, i, t[7], 4139469664, 16)),
            (i = a(i, n, h, r, t[10], 3200236656, 23)),
            (r = a(r, i, n, h, t[13], 681279174, 4)),
            (h = a(h, r, i, n, t[0], 3936430074, 11)),
            (n = a(n, h, r, i, t[3], 3572445317, 16)),
            (i = a(i, n, h, r, t[6], 76029189, 23)),
            (r = a(r, i, n, h, t[9], 3654602809, 4)),
            (h = a(h, r, i, n, t[12], 3873151461, 11)),
            (n = a(n, h, r, i, t[15], 530742520, 16)),
            (i = a(i, n, h, r, t[2], 3299628645, 23)),
            (r = f(r, i, n, h, t[0], 4096336452, 6)),
            (h = f(h, r, i, n, t[7], 1126891415, 10)),
            (n = f(n, h, r, i, t[14], 2878612391, 15)),
            (i = f(i, n, h, r, t[5], 4237533241, 21)),
            (r = f(r, i, n, h, t[12], 1700485571, 6)),
            (h = f(h, r, i, n, t[3], 2399980690, 10)),
            (n = f(n, h, r, i, t[10], 4293915773, 15)),
            (i = f(i, n, h, r, t[1], 2240044497, 21)),
            (r = f(r, i, n, h, t[8], 1873313359, 6)),
            (h = f(h, r, i, n, t[15], 4264355552, 10)),
            (n = f(n, h, r, i, t[6], 2734768916, 15)),
            (i = f(i, n, h, r, t[13], 1309151649, 21)),
            (r = f(r, i, n, h, t[4], 4149444226, 6)),
            (h = f(h, r, i, n, t[11], 3174756917, 10)),
            (n = f(n, h, r, i, t[2], 718787259, 15)),
            (i = f(i, n, h, r, t[9], 3951481745, 21)),
            (this._a = (this._a + r) | 0),
            (this._b = (this._b + i) | 0),
            (this._c = (this._c + n) | 0),
            (this._d = (this._d + h) | 0);
        }),
        (i.prototype._digest = function () {
          (this._block[this._blockOffset++] = 128),
            this._blockOffset > 56 &&
              (this._block.fill(0, this._blockOffset, 64),
              this._update(),
              (this._blockOffset = 0)),
            this._block.fill(0, this._blockOffset, 56),
            this._block.writeUInt32LE(this._length[0], 56),
            this._block.writeUInt32LE(this._length[1], 60),
            this._update();
          var t = c.allocUnsafe(16);
          return (
            t.writeInt32LE(this._a, 0),
            t.writeInt32LE(this._b, 4),
            t.writeInt32LE(this._c, 8),
            t.writeInt32LE(this._d, 12),
            t
          );
        }),
        (e.exports = i);
    },
    { "hash-base": 102, inherits: 132, "safe-buffer": 160 },
  ],
  134: [
    function (t, e, r) {
      function i(t) {
        this.rand = t || new s.Rand();
      }
      var n = t("bn.js"),
        s = t("brorand");
      (e.exports = i),
        (i.create = function (t) {
          return new i(t);
        }),
        (i.prototype._randbelow = function (t) {
          var e = t.bitLength(),
            r = Math.ceil(e / 8);
          do {
            var i = new n(this.rand.generate(r));
          } while (i.cmp(t) >= 0);
          return i;
        }),
        (i.prototype._randrange = function (t, e) {
          var r = e.sub(t);
          return t.add(this._randbelow(r));
        }),
        (i.prototype.test = function (t, e, r) {
          var i = t.bitLength(),
            s = n.mont(t),
            o = new n(1).toRed(s);
          e || (e = Math.max(1, (i / 48) | 0));
          for (var a = t.subn(1), f = 0; !a.testn(f); f++);
          for (var h = t.shrn(f), u = a.toRed(s), c = !0; e > 0; e--) {
            var d = this._randrange(new n(2), a);
            r && r(d);
            var l = d.toRed(s).redPow(h);
            if (0 !== l.cmp(o) && 0 !== l.cmp(u)) {
              for (var p = 1; p < f; p++) {
                if (((l = l.redSqr()), 0 === l.cmp(o))) return !1;
                if (0 === l.cmp(u)) break;
              }
              if (p === f) return !1;
            }
          }
          return c;
        }),
        (i.prototype.getDivisor = function (t, e) {
          var r = t.bitLength(),
            i = n.mont(t),
            s = new n(1).toRed(i);
          e || (e = Math.max(1, (r / 48) | 0));
          for (var o = t.subn(1), a = 0; !o.testn(a); a++);
          for (var f = t.shrn(a), h = o.toRed(i); e > 0; e--) {
            var u = this._randrange(new n(2), o),
              c = t.gcd(u);
            if (0 !== c.cmpn(1)) return c;
            var d = u.toRed(i).redPow(f);
            if (0 !== d.cmp(s) && 0 !== d.cmp(h)) {
              for (var l = 1; l < a; l++) {
                if (((d = d.redSqr()), 0 === d.cmp(s)))
                  return d.fromRed().subn(1).gcd(t);
                if (0 === d.cmp(h)) break;
              }
              if (l === a) return (d = d.redSqr()), d.fromRed().subn(1).gcd(t);
            }
          }
          return !1;
        });
    },
    { "bn.js": 135, brorand: 18 },
  ],
  135: [
    function (t, e, r) {
      arguments[4][15][0].apply(r, arguments);
    },
    { buffer: 19, dup: 15 },
  ],
  136: [
    function (t, e, r) {
      function i(t, e) {
        if (!t) throw new Error(e || "Assertion failed");
      }
      (e.exports = i),
        (i.equal = function (t, e, r) {
          if (t != e)
            throw new Error(r || "Assertion failed: " + t + " != " + e);
        });
    },
    {},
  ],
  137: [
    function (t, e, r) {
      "use strict";
      function i(t, e) {
        if (Array.isArray(t)) return t.slice();
        if (!t) return [];
        var r = [];
        if ("string" != typeof t) {
          for (var i = 0; i < t.length; i++) r[i] = 0 | t[i];
          return r;
        }
        if ("hex" === e) {
          (t = t.replace(/[^a-z0-9]+/gi, "")),
            t.length % 2 != 0 && (t = "0" + t);
          for (i = 0; i < t.length; i += 2)
            r.push(parseInt(t[i] + t[i + 1], 16));
        } else
          for (i = 0; i < t.length; i++) {
            var n = t.charCodeAt(i),
              s = n >> 8,
              o = 255 & n;
            s ? r.push(s, o) : r.push(o);
          }
        return r;
      }
      function n(t) {
        return 1 === t.length ? "0" + t : t;
      }
      function s(t) {
        for (var e = "", r = 0; r < t.length; r++) e += n(t[r].toString(16));
        return e;
      }
      var o = r;
      (o.toArray = i),
        (o.zero2 = n),
        (o.toHex = s),
        (o.encode = function (t, e) {
          return "hex" === e ? s(t) : t;
        });
    },
    {},
  ],
  138: [
    function (t, e, r) {
      e.exports = {
        "2.16.840.1.101.3.4.1.1": "aes-128-ecb",
        "2.16.840.1.101.3.4.1.2": "aes-128-cbc",
        "2.16.840.1.101.3.4.1.3": "aes-128-ofb",
        "2.16.840.1.101.3.4.1.4": "aes-128-cfb",
        "2.16.840.1.101.3.4.1.21": "aes-192-ecb",
        "2.16.840.1.101.3.4.1.22": "aes-192-cbc",
        "2.16.840.1.101.3.4.1.23": "aes-192-ofb",
        "2.16.840.1.101.3.4.1.24": "aes-192-cfb",
        "2.16.840.1.101.3.4.1.41": "aes-256-ecb",
        "2.16.840.1.101.3.4.1.42": "aes-256-cbc",
        "2.16.840.1.101.3.4.1.43": "aes-256-ofb",
        "2.16.840.1.101.3.4.1.44": "aes-256-cfb",
      };
    },
    {},
  ],
  139: [
    function (t, e, r) {
      "use strict";
      var i = t("asn1.js");
      r.certificate = t("./certificate");
      var n = i.define("RSAPrivateKey", function () {
        this.seq().obj(
          this.key("version").int(),
          this.key("modulus").int(),
          this.key("publicExponent").int(),
          this.key("privateExponent").int(),
          this.key("prime1").int(),
          this.key("prime2").int(),
          this.key("exponent1").int(),
          this.key("exponent2").int(),
          this.key("coefficient").int()
        );
      });
      r.RSAPrivateKey = n;
      var s = i.define("RSAPublicKey", function () {
        this.seq().obj(
          this.key("modulus").int(),
          this.key("publicExponent").int()
        );
      });
      r.RSAPublicKey = s;
      var o = i.define("SubjectPublicKeyInfo", function () {
        this.seq().obj(
          this.key("algorithm").use(a),
          this.key("subjectPublicKey").bitstr()
        );
      });
      r.PublicKey = o;
      var a = i.define("AlgorithmIdentifier", function () {
          this.seq().obj(
            this.key("algorithm").objid(),
            this.key("none").null_().optional(),
            this.key("curve").objid().optional(),
            this.key("params")
              .seq()
              .obj(
                this.key("p").int(),
                this.key("q").int(),
                this.key("g").int()
              )
              .optional()
          );
        }),
        f = i.define("PrivateKeyInfo", function () {
          this.seq().obj(
            this.key("version").int(),
            this.key("algorithm").use(a),
            this.key("subjectPrivateKey").octstr()
          );
        });
      r.PrivateKey = f;
      var h = i.define("EncryptedPrivateKeyInfo", function () {
        this.seq().obj(
          this.key("algorithm")
            .seq()
            .obj(
              this.key("id").objid(),
              this.key("decrypt")
                .seq()
                .obj(
                  this.key("kde")
                    .seq()
                    .obj(
                      this.key("id").objid(),
                      this.key("kdeparams")
                        .seq()
                        .obj(this.key("salt").octstr(), this.key("iters").int())
                    ),
                  this.key("cipher")
                    .seq()
                    .obj(this.key("algo").objid(), this.key("iv").octstr())
                )
            ),
          this.key("subjectPrivateKey").octstr()
        );
      });
      r.EncryptedPrivateKey = h;
      var u = i.define("DSAPrivateKey", function () {
        this.seq().obj(
          this.key("version").int(),
          this.key("p").int(),
          this.key("q").int(),
          this.key("g").int(),
          this.key("pub_key").int(),
          this.key("priv_key").int()
        );
      });
      (r.DSAPrivateKey = u),
        (r.DSAparam = i.define("DSAparam", function () {
          this.int();
        }));
      var c = i.define("ECPrivateKey", function () {
        this.seq().obj(
          this.key("version").int(),
          this.key("privateKey").octstr(),
          this.key("parameters").optional().explicit(0).use(d),
          this.key("publicKey").optional().explicit(1).bitstr()
        );
      });
      r.ECPrivateKey = c;
      var d = i.define("ECParameters", function () {
        this.choice({ namedCurve: this.objid() });
      });
      r.signature = i.define("signature", function () {
        this.seq().obj(this.key("r").int(), this.key("s").int());
      });
    },
    { "./certificate": 140, "asn1.js": 1 },
  ],
  140: [
    function (t, e, r) {
      "use strict";
      var i = t("asn1.js"),
        n = i.define("Time", function () {
          this.choice({ utcTime: this.utctime(), generalTime: this.gentime() });
        }),
        s = i.define("AttributeTypeValue", function () {
          this.seq().obj(this.key("type").objid(), this.key("value").any());
        }),
        o = i.define("AlgorithmIdentifier", function () {
          this.seq().obj(
            this.key("algorithm").objid(),
            this.key("parameters").optional(),
            this.key("curve").objid().optional()
          );
        }),
        a = i.define("SubjectPublicKeyInfo", function () {
          this.seq().obj(
            this.key("algorithm").use(o),
            this.key("subjectPublicKey").bitstr()
          );
        }),
        f = i.define("RelativeDistinguishedName", function () {
          this.setof(s);
        }),
        h = i.define("RDNSequence", function () {
          this.seqof(f);
        }),
        u = i.define("Name", function () {
          this.choice({ rdnSequence: this.use(h) });
        }),
        c = i.define("Validity", function () {
          this.seq().obj(
            this.key("notBefore").use(n),
            this.key("notAfter").use(n)
          );
        }),
        d = i.define("Extension", function () {
          this.seq().obj(
            this.key("extnID").objid(),
            this.key("critical").bool().def(!1),
            this.key("extnValue").octstr()
          );
        }),
        l = i.define("TBSCertificate", function () {
          this.seq().obj(
            this.key("version").explicit(0).int().optional(),
            this.key("serialNumber").int(),
            this.key("signature").use(o),
            this.key("issuer").use(u),
            this.key("validity").use(c),
            this.key("subject").use(u),
            this.key("subjectPublicKeyInfo").use(a),
            this.key("issuerUniqueID").implicit(1).bitstr().optional(),
            this.key("subjectUniqueID").implicit(2).bitstr().optional(),
            this.key("extensions").explicit(3).seqof(d).optional()
          );
        }),
        p = i.define("X509Certificate", function () {
          this.seq().obj(
            this.key("tbsCertificate").use(l),
            this.key("signatureAlgorithm").use(o),
            this.key("signatureValue").bitstr()
          );
        });
      e.exports = p;
    },
    { "asn1.js": 1 },
  ],
  141: [
    function (t, e, r) {
      var i =
          /Proc-Type: 4,ENCRYPTED[\n\r]+DEK-Info: AES-((?:128)|(?:192)|(?:256))-CBC,([0-9A-H]+)[\n\r]+([0-9A-z\n\r+/=]+)[\n\r]+/m,
        n = /^-----BEGIN ((?:.*? KEY)|CERTIFICATE)-----/m,
        s =
          /^-----BEGIN ((?:.*? KEY)|CERTIFICATE)-----([0-9A-z\n\r+/=]+)-----END \1-----$/m,
        o = t("evp_bytestokey"),
        a = t("browserify-aes"),
        f = t("safe-buffer").Buffer;
      e.exports = function (t, e) {
        var r,
          h = t.toString(),
          u = h.match(i);
        if (u) {
          var c = "aes" + u[1],
            d = f.from(u[2], "hex"),
            l = f.from(u[3].replace(/[\r\n]/g, ""), "base64"),
            p = o(e, d.slice(0, 8), parseInt(u[1], 10)).key,
            b = [],
            m = a.createDecipheriv(c, p, d);
          b.push(m.update(l)), b.push(m.final()), (r = f.concat(b));
        } else {
          var y = h.match(s);
          r = f.from(y[2].replace(/[\r\n]/g, ""), "base64");
        }
        var g = h.match(n)[1];
        return { tag: g, data: r };
      };
    },
    { "browserify-aes": 22, evp_bytestokey: 101, "safe-buffer": 160 },
  ],
  142: [
    function (t, e, r) {
      function i(t) {
        var e;
        "object" != typeof t ||
          u.isBuffer(t) ||
          ((e = t.passphrase), (t = t.key)),
          "string" == typeof t && (t = u.from(t));
        var r,
          i,
          o = a(t, e),
          f = o.tag,
          h = o.data;
        switch (f) {
          case "CERTIFICATE":
            i = s.certificate.decode(h, "der").tbsCertificate
              .subjectPublicKeyInfo;
          case "PUBLIC KEY":
            switch (
              (i || (i = s.PublicKey.decode(h, "der")),
              (r = i.algorithm.algorithm.join(".")),
              r)
            ) {
              case "1.2.840.113549.1.1.1":
                return s.RSAPublicKey.decode(i.subjectPublicKey.data, "der");
              case "1.2.840.10045.2.1":
                return (
                  (i.subjectPrivateKey = i.subjectPublicKey),
                  { type: "ec", data: i }
                );
              case "1.2.840.10040.4.1":
                return (
                  (i.algorithm.params.pub_key = s.DSAparam.decode(
                    i.subjectPublicKey.data,
                    "der"
                  )),
                  { type: "dsa", data: i.algorithm.params }
                );
              default:
                throw new Error("unknown key id " + r);
            }
          case "ENCRYPTED PRIVATE KEY":
            (h = s.EncryptedPrivateKey.decode(h, "der")), (h = n(h, e));
          case "PRIVATE KEY":
            switch (
              ((i = s.PrivateKey.decode(h, "der")),
              (r = i.algorithm.algorithm.join(".")),
              r)
            ) {
              case "1.2.840.113549.1.1.1":
                return s.RSAPrivateKey.decode(i.subjectPrivateKey, "der");
              case "1.2.840.10045.2.1":
                return {
                  curve: i.algorithm.curve,
                  privateKey: s.ECPrivateKey.decode(i.subjectPrivateKey, "der")
                    .privateKey,
                };
              case "1.2.840.10040.4.1":
                return (
                  (i.algorithm.params.priv_key = s.DSAparam.decode(
                    i.subjectPrivateKey,
                    "der"
                  )),
                  { type: "dsa", params: i.algorithm.params }
                );
              default:
                throw new Error("unknown key id " + r);
            }
          case "RSA PUBLIC KEY":
            return s.RSAPublicKey.decode(h, "der");
          case "RSA PRIVATE KEY":
            return s.RSAPrivateKey.decode(h, "der");
          case "DSA PRIVATE KEY":
            return { type: "dsa", params: s.DSAPrivateKey.decode(h, "der") };
          case "EC PRIVATE KEY":
            return (
              (h = s.ECPrivateKey.decode(h, "der")),
              { curve: h.parameters.value, privateKey: h.privateKey }
            );
          default:
            throw new Error("unknown key type " + f);
        }
      }
      function n(t, e) {
        var r = t.algorithm.decrypt.kde.kdeparams.salt,
          i = parseInt(t.algorithm.decrypt.kde.kdeparams.iters.toString(), 10),
          n = o[t.algorithm.decrypt.cipher.algo.join(".")],
          s = t.algorithm.decrypt.cipher.iv,
          a = t.subjectPrivateKey,
          c = parseInt(n.split("-")[1], 10) / 8,
          d = h.pbkdf2Sync(e, r, i, c, "sha1"),
          l = f.createDecipheriv(n, d, s),
          p = [];
        return p.push(l.update(a)), p.push(l.final()), u.concat(p);
      }
      var s = t("./asn1"),
        o = t("./aesid.json"),
        a = t("./fixProc"),
        f = t("browserify-aes"),
        h = t("pbkdf2"),
        u = t("safe-buffer").Buffer;
      (e.exports = i), (i.signature = s.signature);
    },
    {
      "./aesid.json": 138,
      "./asn1": 139,
      "./fixProc": 141,
      "browserify-aes": 22,
      pbkdf2: 143,
      "safe-buffer": 160,
    },
  ],
  143: [
    function (t, e, r) {
      (r.pbkdf2 = t("./lib/async")), (r.pbkdf2Sync = t("./lib/sync"));
    },
    { "./lib/async": 144, "./lib/sync": 147 },
  ],
  144: [
    function (t, e, r) {
      (function (r) {
        (function () {
          function i(t) {
            if (r.process && !r.process.browser) return Promise.resolve(!1);
            if (!p || !p.importKey || !p.deriveBits) return Promise.resolve(!1);
            if (void 0 !== m[t]) return m[t];
            a = a || h.alloc(8);
            var e = s(a, a, 10, 128, t)
              .then(function () {
                return !0;
              })
              .catch(function () {
                return !1;
              });
            return (m[t] = e), e;
          }
          function n() {
            return (
              f ||
              ((f =
                r.process && r.process.nextTick
                  ? r.process.nextTick
                  : r.queueMicrotask
                  ? r.queueMicrotask
                  : r.setImmediate
                  ? r.setImmediate
                  : r.setTimeout),
              f)
            );
          }
          function s(t, e, r, i, n) {
            return p
              .importKey("raw", t, { name: "PBKDF2" }, !1, ["deriveBits"])
              .then(function (t) {
                return p.deriveBits(
                  { name: "PBKDF2", salt: e, iterations: r, hash: { name: n } },
                  t,
                  i << 3
                );
              })
              .then(function (t) {
                return h.from(t);
              });
          }
          function o(t, e) {
            t.then(
              function (t) {
                n()(function () {
                  e(null, t);
                });
              },
              function (t) {
                n()(function () {
                  e(t);
                });
              }
            );
          }
          var a,
            f,
            h = t("safe-buffer").Buffer,
            u = t("./precondition"),
            c = t("./default-encoding"),
            d = t("./sync"),
            l = t("./to-buffer"),
            p = r.crypto && r.crypto.subtle,
            b = {
              sha: "SHA-1",
              "sha-1": "SHA-1",
              sha1: "SHA-1",
              sha256: "SHA-256",
              "sha-256": "SHA-256",
              sha384: "SHA-384",
              "sha-384": "SHA-384",
              "sha-512": "SHA-512",
              sha512: "SHA-512",
            },
            m = [];
          e.exports = function (t, e, a, f, h, p) {
            "function" == typeof h && ((p = h), (h = void 0)),
              (h = h || "sha1");
            var m = b[h.toLowerCase()];
            if (m && "function" == typeof r.Promise) {
              if (
                (u(a, f),
                (t = l(t, c, "Password")),
                (e = l(e, c, "Salt")),
                "function" != typeof p)
              )
                throw new Error("No callback provided to pbkdf2");
              o(
                i(m).then(function (r) {
                  return r ? s(t, e, a, f, m) : d(t, e, a, f, h);
                }),
                p
              );
            } else
              n()(function () {
                var r;
                try {
                  r = d(t, e, a, f, h);
                } catch (t) {
                  return p(t);
                }
                p(null, r);
              });
          };
        }).call(this);
      }).call(
        this,
        "undefined" != typeof global
          ? global
          : "undefined" != typeof self
          ? self
          : "undefined" != typeof window
          ? window
          : {}
      );
    },
    {
      "./default-encoding": 145,
      "./precondition": 146,
      "./sync": 147,
      "./to-buffer": 148,
      "safe-buffer": 160,
    },
  ],
  145: [
    function (t, e, r) {
      (function (t, r) {
        (function () {
          var i;
          if (r.process && r.process.browser) i = "utf-8";
          else if (r.process && r.process.version) {
            var n = parseInt(t.version.split(".")[0].slice(1), 10);
            i = n >= 6 ? "utf-8" : "binary";
          } else i = "utf-8";
          e.exports = i;
        }).call(this);
      }).call(
        this,
        t("_process"),
        "undefined" != typeof global
          ? global
          : "undefined" != typeof self
          ? self
          : "undefined" != typeof window
          ? window
          : {}
      );
    },
    { _process: 149 },
  ],
  146: [
    function (t, e, r) {
      var i = Math.pow(2, 30) - 1;
      e.exports = function (t, e) {
        if ("number" != typeof t)
          throw new TypeError("Iterations not a number");
        if (t < 0) throw new TypeError("Bad iterations");
        if ("number" != typeof e)
          throw new TypeError("Key length not a number");
        if (e < 0 || e > i || e != e) throw new TypeError("Bad key length");
      };
    },
    {},
  ],
  147: [
    function (t, e, r) {
      function i(t, e, r) {
        var i = n(t),
          s = "sha512" === t || "sha384" === t ? 128 : 64;
        e.length > s ? (e = i(e)) : e.length < s && (e = h.concat([e, l], s));
        for (
          var o = h.allocUnsafe(s + p[t]), a = h.allocUnsafe(s + p[t]), f = 0;
          f < s;
          f++
        )
          (o[f] = 54 ^ e[f]), (a[f] = 92 ^ e[f]);
        var u = h.allocUnsafe(s + r + 4);
        o.copy(u, 0, 0, s),
          (this.ipad1 = u),
          (this.ipad2 = o),
          (this.opad = a),
          (this.alg = t),
          (this.blocksize = s),
          (this.hash = i),
          (this.size = p[t]);
      }
      function n(t) {
        function e(e) {
          return f(t).update(e).digest();
        }
        function r(t) {
          return new a().update(t).digest();
        }
        return "rmd160" === t || "ripemd160" === t ? r : "md5" === t ? o : e;
      }
      function s(t, e, r, n, s) {
        u(r, n),
          (t = d(t, c, "Password")),
          (e = d(e, c, "Salt")),
          (s = s || "sha1");
        var o = new i(s, t, e.length),
          a = h.allocUnsafe(n),
          f = h.allocUnsafe(e.length + 4);
        e.copy(f, 0, 0, e.length);
        for (var l = 0, b = p[s], m = Math.ceil(n / b), y = 1; y <= m; y++) {
          f.writeUInt32BE(y, e.length);
          for (var g = o.run(f, o.ipad1), v = g, w = 1; w < r; w++) {
            v = o.run(v, o.ipad2);
            for (var _ = 0; _ < b; _++) g[_] ^= v[_];
          }
          g.copy(a, l), (l += b);
        }
        return a;
      }
      var o = t("create-hash/md5"),
        a = t("ripemd160"),
        f = t("sha.js"),
        h = t("safe-buffer").Buffer,
        u = t("./precondition"),
        c = t("./default-encoding"),
        d = t("./to-buffer"),
        l = h.alloc(128),
        p = {
          md5: 16,
          sha1: 20,
          sha224: 28,
          sha256: 32,
          sha384: 48,
          sha512: 64,
          rmd160: 20,
          ripemd160: 20,
        };
      (i.prototype.run = function (t, e) {
        t.copy(e, this.blocksize);
        var r = this.hash(e);
        return r.copy(this.opad, this.blocksize), this.hash(this.opad);
      }),
        (e.exports = s);
    },
    {
      "./default-encoding": 145,
      "./precondition": 146,
      "./to-buffer": 148,
      "create-hash/md5": 68,
      ripemd160: 159,
      "safe-buffer": 160,
      "sha.js": 163,
    },
  ],
  148: [
    function (t, e, r) {
      var i = t("safe-buffer").Buffer;
      e.exports = function (t, e, r) {
        if (i.isBuffer(t)) return t;
        if ("string" == typeof t) return i.from(t, e);
        if (ArrayBuffer.isView(t)) return i.from(t.buffer);
        throw new TypeError(
          r + " must be a string, a Buffer, a typed array or a DataView"
        );
      };
    },
    { "safe-buffer": 160 },
  ],
  149: [
    function (t, e, r) {
      function i() {
        throw new Error("setTimeout has not been defined");
      }
      function n() {
        throw new Error("clearTimeout has not been defined");
      }
      function s(t) {
        if (c === setTimeout) return setTimeout(t, 0);
        if ((c === i || !c) && setTimeout)
          return (c = setTimeout), setTimeout(t, 0);
        try {
          return c(t, 0);
        } catch (e) {
          try {
            return c.call(null, t, 0);
          } catch (e) {
            return c.call(this, t, 0);
          }
        }
      }
      function o(t) {
        if (d === clearTimeout) return clearTimeout(t);
        if ((d === n || !d) && clearTimeout)
          return (d = clearTimeout), clearTimeout(t);
        try {
          return d(t);
        } catch (e) {
          try {
            return d.call(null, t);
          } catch (e) {
            return d.call(this, t);
          }
        }
      }
      function a() {
        m &&
          p &&
          ((m = !1), p.length ? (b = p.concat(b)) : (y = -1), b.length && f());
      }
      function f() {
        if (!m) {
          var t = s(a);
          m = !0;
          for (var e = b.length; e; ) {
            for (p = b, b = []; ++y < e; ) p && p[y].run();
            (y = -1), (e = b.length);
          }
          (p = null), (m = !1), o(t);
        }
      }
      function h(t, e) {
        (this.fun = t), (this.array = e);
      }
      function u() {}
      var c,
        d,
        l = (e.exports = {});
      (function () {
        try {
          c = "function" == typeof setTimeout ? setTimeout : i;
        } catch (t) {
          c = i;
        }
        try {
          d = "function" == typeof clearTimeout ? clearTimeout : n;
        } catch (t) {
          d = n;
        }
      })();
      var p,
        b = [],
        m = !1,
        y = -1;
      (l.nextTick = function (t) {
        var e = new Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
        b.push(new h(t, e)), 1 !== b.length || m || s(f);
      }),
        (h.prototype.run = function () {
          this.fun.apply(null, this.array);
        }),
        (l.title = "browser"),
        (l.browser = !0),
        (l.env = {}),
        (l.argv = []),
        (l.version = ""),
        (l.versions = {}),
        (l.on = u),
        (l.addListener = u),
        (l.once = u),
        (l.off = u),
        (l.removeListener = u),
        (l.removeAllListeners = u),
        (l.emit = u),
        (l.prependListener = u),
        (l.prependOnceListener = u),
        (l.listeners = function (t) {
          return [];
        }),
        (l.binding = function (t) {
          throw new Error("process.binding is not supported");
        }),
        (l.cwd = function () {
          return "/";
        }),
        (l.chdir = function (t) {
          throw new Error("process.chdir is not supported");
        }),
        (l.umask = function () {
          return 0;
        });
    },
    {},
  ],
  150: [
    function (t, e, r) {
      (r.publicEncrypt = t("./publicEncrypt")),
        (r.privateDecrypt = t("./privateDecrypt")),
        (r.privateEncrypt = function (t, e) {
          return r.publicEncrypt(t, e, !0);
        }),
        (r.publicDecrypt = function (t, e) {
          return r.privateDecrypt(t, e, !0);
        });
    },
    { "./privateDecrypt": 153, "./publicEncrypt": 154 },
  ],
  151: [
    function (t, e, r) {
      function i(t) {
        var e = s.allocUnsafe(4);
        return e.writeUInt32BE(t, 0), e;
      }
      var n = t("create-hash"),
        s = t("safe-buffer").Buffer;
      e.exports = function (t, e) {
        for (var r, o = s.alloc(0), a = 0; o.length < e; )
          (r = i(a++)),
            (o = s.concat([o, n("sha1").update(t).update(r).digest()]));
        return o.slice(0, e);
      };
    },
    { "create-hash": 67, "safe-buffer": 160 },
  ],
  152: [
    function (t, e, r) {
      arguments[4][15][0].apply(r, arguments);
    },
    { buffer: 19, dup: 15 },
  ],
  153: [
    function (t, e, r) {
      function i(t, e) {
        var r = t.modulus.byteLength(),
          i = c("sha1").update(l.alloc(0)).digest(),
          n = i.length;
        if (0 !== e[0]) throw new Error("decryption error");
        var o = e.slice(1, n + 1),
          h = e.slice(n + 1),
          u = f(o, a(h, n)),
          d = f(h, a(u, r - n - 1));
        if (s(i, d.slice(0, n))) throw new Error("decryption error");
        for (var p = n; 0 === d[p]; ) p++;
        if (1 !== d[p++]) throw new Error("decryption error");
        return d.slice(p);
      }
      function n(t, e, r) {
        for (var i = e.slice(0, 2), n = 2, s = 0; 0 !== e[n++]; )
          if (n >= e.length) {
            s++;
            break;
          }
        var o = e.slice(2, n - 1);
        if (
          ((("0002" !== i.toString("hex") && !r) ||
            ("0001" !== i.toString("hex") && r)) &&
            s++,
          o.length < 8 && s++,
          s)
        )
          throw new Error("decryption error");
        return e.slice(n);
      }
      function s(t, e) {
        (t = l.from(t)), (e = l.from(e));
        var r = 0,
          i = t.length;
        t.length !== e.length && (r++, (i = Math.min(t.length, e.length)));
        for (var n = -1; ++n < i; ) r += t[n] ^ e[n];
        return r;
      }
      var o = t("parse-asn1"),
        a = t("./mgf"),
        f = t("./xor"),
        h = t("bn.js"),
        u = t("browserify-rsa"),
        c = t("create-hash"),
        d = t("./withPublic"),
        l = t("safe-buffer").Buffer;
      e.exports = function (t, e, r) {
        var s;
        s = t.padding ? t.padding : r ? 1 : 4;
        var a,
          f = o(t),
          c = f.modulus.byteLength();
        if (e.length > c || new h(e).cmp(f.modulus) >= 0)
          throw new Error("decryption error");
        a = r ? d(new h(e), f) : u(e, f);
        var p = l.alloc(c - a.length);
        if (((a = l.concat([p, a], c)), 4 === s)) return i(f, a);
        if (1 === s) return n(f, a, r);
        if (3 === s) return a;
        throw new Error("unknown padding");
      };
    },
    {
      "./mgf": 151,
      "./withPublic": 155,
      "./xor": 156,
      "bn.js": 152,
      "browserify-rsa": 40,
      "create-hash": 67,
      "parse-asn1": 142,
      "safe-buffer": 160,
    },
  ],
  154: [
    function (t, e, r) {
      function i(t, e) {
        var r = t.modulus.byteLength(),
          i = e.length,
          n = f("sha1").update(p.alloc(0)).digest(),
          s = n.length,
          o = 2 * s;
        if (i > r - o - 2) throw new Error("message too long");
        var d = p.alloc(r - i - o - 2),
          l = r - s - 1,
          b = a(s),
          m = u(p.concat([n, d, p.alloc(1, 1), e], l), h(b, l)),
          y = u(b, h(m, s));
        return new c(p.concat([p.alloc(1), y, m], r));
      }
      function n(t, e, r) {
        var i,
          n = e.length,
          o = t.modulus.byteLength();
        if (n > o - 11) throw new Error("message too long");
        return (
          (i = r ? p.alloc(o - n - 3, 255) : s(o - n - 3)),
          new c(p.concat([p.from([0, r ? 1 : 2]), i, p.alloc(1), e], o))
        );
      }
      function s(t) {
        for (var e, r = p.allocUnsafe(t), i = 0, n = a(2 * t), s = 0; i < t; )
          s === n.length && ((n = a(2 * t)), (s = 0)),
            (e = n[s++]),
            e && (r[i++] = e);
        return r;
      }
      var o = t("parse-asn1"),
        a = t("randombytes"),
        f = t("create-hash"),
        h = t("./mgf"),
        u = t("./xor"),
        c = t("bn.js"),
        d = t("./withPublic"),
        l = t("browserify-rsa"),
        p = t("safe-buffer").Buffer;
      e.exports = function (t, e, r) {
        var s;
        s = t.padding ? t.padding : r ? 1 : 4;
        var a,
          f = o(t);
        if (4 === s) a = i(f, e);
        else if (1 === s) a = n(f, e, r);
        else {
          if (3 !== s) throw new Error("unknown padding");
          if (((a = new c(e)), a.cmp(f.modulus) >= 0))
            throw new Error("data too long for modulus");
        }
        return r ? l(a, f) : d(a, f);
      };
    },
    {
      "./mgf": 151,
      "./withPublic": 155,
      "./xor": 156,
      "bn.js": 152,
      "browserify-rsa": 40,
      "create-hash": 67,
      "parse-asn1": 142,
      randombytes: 157,
      "safe-buffer": 160,
    },
  ],
  155: [
    function (t, e, r) {
      function i(t, e) {
        return s.from(
          t
            .toRed(n.mont(e.modulus))
            .redPow(new n(e.publicExponent))
            .fromRed()
            .toArray()
        );
      }
      var n = t("bn.js"),
        s = t("safe-buffer").Buffer;
      e.exports = i;
    },
    { "bn.js": 152, "safe-buffer": 160 },
  ],
  156: [
    function (t, e, r) {
      e.exports = function (t, e) {
        for (var r = t.length, i = -1; ++i < r; ) t[i] ^= e[i];
        return t;
      };
    },
    {},
  ],
  157: [
    function (t, e, r) {
      (function (r, i) {
        (function () {
          "use strict";
          function n() {
            throw new Error(
              "Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11"
            );
          }
          function s(t, e) {
            if (t > a) throw new RangeError("requested too many random bytes");
            var i = f.allocUnsafe(t);
            if (t > 0)
              if (t > o)
                for (var n = 0; n < t; n += o)
                  h.getRandomValues(i.slice(n, n + o));
              else h.getRandomValues(i);
            return "function" == typeof e
              ? r.nextTick(function () {
                  e(null, i);
                })
              : i;
          }
          var o = 65536,
            a = 4294967295,
            f = t("safe-buffer").Buffer,
            h = i.crypto || i.msCrypto;
          h && h.getRandomValues ? (e.exports = s) : (e.exports = n);
        }).call(this);
      }).call(
        this,
        t("_process"),
        "undefined" != typeof global
          ? global
          : "undefined" != typeof self
          ? self
          : "undefined" != typeof window
          ? window
          : {}
      );
    },
    { _process: 149, "safe-buffer": 160 },
  ],
  158: [
    function (t, e, r) {
      (function (e, i) {
        (function () {
          "use strict";
          function n() {
            throw new Error(
              "secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11"
            );
          }
          function s(t, e) {
            if ("number" != typeof t || t != t)
              throw new TypeError("offset must be a number");
            if (t > b || t < 0) throw new TypeError("offset must be a uint32");
            if (t > l || t > e) throw new RangeError("offset out of range");
          }
          function o(t, e, r) {
            if ("number" != typeof t || t != t)
              throw new TypeError("size must be a number");
            if (t > b || t < 0) throw new TypeError("size must be a uint32");
            if (t + e > r || t > l) throw new RangeError("buffer too small");
          }
          function a(t, e, r, n) {
            if (!(d.isBuffer(t) || t instanceof i.Uint8Array))
              throw new TypeError(
                '"buf" argument must be a Buffer or Uint8Array'
              );
            if ("function" == typeof e) (n = e), (e = 0), (r = t.length);
            else if ("function" == typeof r) (n = r), (r = t.length - e);
            else if ("function" != typeof n)
              throw new TypeError('"cb" argument must be a function');
            return s(e, t.length), o(r, e, t.length), f(t, e, r, n);
          }
          function f(t, r, i, n) {
            if (e.browser) {
              var s = t.buffer,
                o = new Uint8Array(s, r, i);
              return (
                p.getRandomValues(o),
                n
                  ? void e.nextTick(function () {
                      n(null, t);
                    })
                  : t
              );
            }
            if (!n) {
              var a = c(i);
              return a.copy(t, r), t;
            }
            c(i, function (e, i) {
              if (e) return n(e);
              i.copy(t, r), n(null, t);
            });
          }
          function h(t, e, r) {
            if (
              (void 0 === e && (e = 0),
              !(d.isBuffer(t) || t instanceof i.Uint8Array))
            )
              throw new TypeError(
                '"buf" argument must be a Buffer or Uint8Array'
              );
            return (
              s(e, t.length),
              void 0 === r && (r = t.length - e),
              o(r, e, t.length),
              f(t, e, r)
            );
          }
          var u = t("safe-buffer"),
            c = t("randombytes"),
            d = u.Buffer,
            l = u.kMaxLength,
            p = i.crypto || i.msCrypto,
            b = Math.pow(2, 32) - 1;
          (p && p.getRandomValues) || !e.browser
            ? ((r.randomFill = a), (r.randomFillSync = h))
            : ((r.randomFill = n), (r.randomFillSync = n));
        }).call(this);
      }).call(
        this,
        t("_process"),
        "undefined" != typeof global
          ? global
          : "undefined" != typeof self
          ? self
          : "undefined" != typeof window
          ? window
          : {}
      );
    },
    { _process: 149, randombytes: 157, "safe-buffer": 160 },
  ],
  159: [
    function (t, e, r) {
      "use strict";
      function i() {
        d.call(this, 64),
          (this._a = 1732584193),
          (this._b = 4023233417),
          (this._c = 2562383102),
          (this._d = 271733878),
          (this._e = 3285377520);
      }
      function n(t, e) {
        return (t << e) | (t >>> (32 - e));
      }
      function s(t, e, r, i, s, o, a, f) {
        return (n((t + (e ^ r ^ i) + o + a) | 0, f) + s) | 0;
      }
      function o(t, e, r, i, s, o, a, f) {
        return (n((t + ((e & r) | (~e & i)) + o + a) | 0, f) + s) | 0;
      }
      function a(t, e, r, i, s, o, a, f) {
        return (n((t + ((e | ~r) ^ i) + o + a) | 0, f) + s) | 0;
      }
      function f(t, e, r, i, s, o, a, f) {
        return (n((t + ((e & i) | (r & ~i)) + o + a) | 0, f) + s) | 0;
      }
      function h(t, e, r, i, s, o, a, f) {
        return (n((t + (e ^ (r | ~i)) + o + a) | 0, f) + s) | 0;
      }
      var u = t("buffer").Buffer,
        c = t("inherits"),
        d = t("hash-base"),
        l = new Array(16),
        p = [
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10,
          6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7,
          0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5,
          6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13,
        ],
        b = [
          5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0,
          13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8,
          12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10,
          14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11,
        ],
        m = [
          11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13,
          11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13,
          15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5,
          6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5,
          6,
        ],
        y = [
          8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7,
          12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14,
          12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9,
          12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11,
        ],
        g = [0, 1518500249, 1859775393, 2400959708, 2840853838],
        v = [1352829926, 1548603684, 1836072691, 2053994217, 0];
      c(i, d),
        (i.prototype._update = function () {
          for (var t = l, e = 0; e < 16; ++e)
            t[e] = this._block.readInt32LE(4 * e);
          for (
            var r = 0 | this._a,
              i = 0 | this._b,
              u = 0 | this._c,
              c = 0 | this._d,
              d = 0 | this._e,
              w = 0 | this._a,
              _ = 0 | this._b,
              M = 0 | this._c,
              S = 0 | this._d,
              E = 0 | this._e,
              k = 0;
            k < 80;
            k += 1
          ) {
            var A, x;
            k < 16
              ? ((A = s(r, i, u, c, d, t[p[k]], g[0], m[k])),
                (x = h(w, _, M, S, E, t[b[k]], v[0], y[k])))
              : k < 32
              ? ((A = o(r, i, u, c, d, t[p[k]], g[1], m[k])),
                (x = f(w, _, M, S, E, t[b[k]], v[1], y[k])))
              : k < 48
              ? ((A = a(r, i, u, c, d, t[p[k]], g[2], m[k])),
                (x = a(w, _, M, S, E, t[b[k]], v[2], y[k])))
              : k < 64
              ? ((A = f(r, i, u, c, d, t[p[k]], g[3], m[k])),
                (x = o(w, _, M, S, E, t[b[k]], v[3], y[k])))
              : ((A = h(r, i, u, c, d, t[p[k]], g[4], m[k])),
                (x = s(w, _, M, S, E, t[b[k]], v[4], y[k]))),
              (r = d),
              (d = c),
              (c = n(u, 10)),
              (u = i),
              (i = A),
              (w = E),
              (E = S),
              (S = n(M, 10)),
              (M = _),
              (_ = x);
          }
          var B = (this._b + u + S) | 0;
          (this._b = (this._c + c + E) | 0),
            (this._c = (this._d + d + w) | 0),
            (this._d = (this._e + r + _) | 0),
            (this._e = (this._a + i + M) | 0),
            (this._a = B);
        }),
        (i.prototype._digest = function () {
          (this._block[this._blockOffset++] = 128),
            this._blockOffset > 56 &&
              (this._block.fill(0, this._blockOffset, 64),
              this._update(),
              (this._blockOffset = 0)),
            this._block.fill(0, this._blockOffset, 56),
            this._block.writeUInt32LE(this._length[0], 56),
            this._block.writeUInt32LE(this._length[1], 60),
            this._update();
          var t = u.alloc ? u.alloc(20) : new u(20);
          return (
            t.writeInt32LE(this._a, 0),
            t.writeInt32LE(this._b, 4),
            t.writeInt32LE(this._c, 8),
            t.writeInt32LE(this._d, 12),
            t.writeInt32LE(this._e, 16),
            t
          );
        }),
        (e.exports = i);
    },
    { buffer: 63, "hash-base": 102, inherits: 132 },
  ],
  160: [
    function (t, e, r) {
      function i(t, e) {
        for (var r in t) e[r] = t[r];
      }
      function n(t, e, r) {
        return o(t, e, r);
      }
      var s = t("buffer"),
        o = s.Buffer;
      o.from && o.alloc && o.allocUnsafe && o.allocUnsafeSlow
        ? (e.exports = s)
        : (i(s, r), (r.Buffer = n)),
        (n.prototype = Object.create(o.prototype)),
        i(o, n),
        (n.from = function (t, e, r) {
          if ("number" == typeof t)
            throw new TypeError("Argument must not be a number");
          return o(t, e, r);
        }),
        (n.alloc = function (t, e, r) {
          if ("number" != typeof t)
            throw new TypeError("Argument must be a number");
          var i = o(t);
          return (
            void 0 !== e
              ? "string" == typeof r
                ? i.fill(e, r)
                : i.fill(e)
              : i.fill(0),
            i
          );
        }),
        (n.allocUnsafe = function (t) {
          if ("number" != typeof t)
            throw new TypeError("Argument must be a number");
          return o(t);
        }),
        (n.allocUnsafeSlow = function (t) {
          if ("number" != typeof t)
            throw new TypeError("Argument must be a number");
          return s.SlowBuffer(t);
        });
    },
    { buffer: 63 },
  ],
  161: [
    function (t, e, r) {
      (function (r) {
        (function () {
          "use strict";
          var i,
            n = t("buffer"),
            s = n.Buffer,
            o = {};
          for (i in n)
            n.hasOwnProperty(i) &&
              "SlowBuffer" !== i &&
              "Buffer" !== i &&
              (o[i] = n[i]);
          var a = (o.Buffer = {});
          for (i in s)
            s.hasOwnProperty(i) &&
              "allocUnsafe" !== i &&
              "allocUnsafeSlow" !== i &&
              (a[i] = s[i]);
          if (
            ((o.Buffer.prototype = s.prototype),
            (a.from && a.from !== Uint8Array.from) ||
              (a.from = function (t, e, r) {
                if ("number" == typeof t)
                  throw new TypeError(
                    'The "value" argument must not be of type number. Received type ' +
                      typeof t
                  );
                if (t && void 0 === t.length)
                  throw new TypeError(
                    "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
                      typeof t
                  );
                return s(t, e, r);
              }),
            a.alloc ||
              (a.alloc = function (t, e, r) {
                if ("number" != typeof t)
                  throw new TypeError(
                    'The "size" argument must be of type number. Received type ' +
                      typeof t
                  );
                if (t < 0 || t >= 2 * (1 << 30))
                  throw new RangeError(
                    'The value "' + t + '" is invalid for option "size"'
                  );
                var i = s(t);
                return (
                  e && 0 !== e.length
                    ? "string" == typeof r
                      ? i.fill(e, r)
                      : i.fill(e)
                    : i.fill(0),
                  i
                );
              }),
            !o.kStringMaxLength)
          )
            try {
              o.kStringMaxLength = r.binding("buffer").kStringMaxLength;
            } catch (t) {}
          o.constants ||
            ((o.constants = { MAX_LENGTH: o.kMaxLength }),
            o.kStringMaxLength &&
              (o.constants.MAX_STRING_LENGTH = o.kStringMaxLength)),
            (e.exports = o);
        }).call(this);
      }).call(this, t("_process"));
    },
    { _process: 149, buffer: 63 },
  ],
  162: [
    function (t, e, r) {
      function i(t, e) {
        (this._block = n.alloc(t)),
          (this._finalSize = e),
          (this._blockSize = t),
          (this._len = 0);
      }
      var n = t("safe-buffer").Buffer;
      (i.prototype.update = function (t, e) {
        "string" == typeof t && ((e = e || "utf8"), (t = n.from(t, e)));
        for (
          var r = this._block,
            i = this._blockSize,
            s = t.length,
            o = this._len,
            a = 0;
          a < s;

        ) {
          for (var f = o % i, h = Math.min(s - a, i - f), u = 0; u < h; u++)
            r[f + u] = t[a + u];
          (o += h), (a += h), o % i == 0 && this._update(r);
        }
        return (this._len += s), this;
      }),
        (i.prototype.digest = function (t) {
          var e = this._len % this._blockSize;
          (this._block[e] = 128),
            this._block.fill(0, e + 1),
            e >= this._finalSize &&
              (this._update(this._block), this._block.fill(0));
          var r = 8 * this._len;
          if (r <= 4294967295)
            this._block.writeUInt32BE(r, this._blockSize - 4);
          else {
            var i = (4294967295 & r) >>> 0,
              n = (r - i) / 4294967296;
            this._block.writeUInt32BE(n, this._blockSize - 8),
              this._block.writeUInt32BE(i, this._blockSize - 4);
          }
          this._update(this._block);
          var s = this._hash();
          return t ? s.toString(t) : s;
        }),
        (i.prototype._update = function () {
          throw new Error("_update must be implemented by subclass");
        }),
        (e.exports = i);
    },
    { "safe-buffer": 160 },
  ],
  163: [
    function (t, e, r) {
      r = e.exports = function (t) {
        t = t.toLowerCase();
        var e = r[t];
        if (!e)
          throw new Error(t + " is not supported (we accept pull requests)");
        return new e();
      };
      (r.sha = t("./sha")),
        (r.sha1 = t("./sha1")),
        (r.sha224 = t("./sha224")),
        (r.sha256 = t("./sha256")),
        (r.sha384 = t("./sha384")),
        (r.sha512 = t("./sha512"));
    },
    {
      "./sha": 164,
      "./sha1": 165,
      "./sha224": 166,
      "./sha256": 167,
      "./sha384": 168,
      "./sha512": 169,
    },
  ],
  164: [
    function (t, e, r) {
      function i() {
        this.init(), (this._w = c), f.call(this, 64, 56);
      }
      function n(t) {
        return (t << 5) | (t >>> 27);
      }
      function s(t) {
        return (t << 30) | (t >>> 2);
      }
      function o(t, e, r, i) {
        return 0 === t
          ? (e & r) | (~e & i)
          : 2 === t
          ? (e & r) | (e & i) | (r & i)
          : e ^ r ^ i;
      }
      var a = t("inherits"),
        f = t("./hash"),
        h = t("safe-buffer").Buffer,
        u = [1518500249, 1859775393, -1894007588, -899497514],
        c = new Array(80);
      a(i, f),
        (i.prototype.init = function () {
          return (
            (this._a = 1732584193),
            (this._b = 4023233417),
            (this._c = 2562383102),
            (this._d = 271733878),
            (this._e = 3285377520),
            this
          );
        }),
        (i.prototype._update = function (t) {
          for (
            var e = this._w,
              r = 0 | this._a,
              i = 0 | this._b,
              a = 0 | this._c,
              f = 0 | this._d,
              h = 0 | this._e,
              c = 0;
            c < 16;
            ++c
          )
            e[c] = t.readInt32BE(4 * c);
          for (; c < 80; ++c)
            e[c] = e[c - 3] ^ e[c - 8] ^ e[c - 14] ^ e[c - 16];
          for (var d = 0; d < 80; ++d) {
            var l = ~~(d / 20),
              p = (n(r) + o(l, i, a, f) + h + e[d] + u[l]) | 0;
            (h = f), (f = a), (a = s(i)), (i = r), (r = p);
          }
          (this._a = (r + this._a) | 0),
            (this._b = (i + this._b) | 0),
            (this._c = (a + this._c) | 0),
            (this._d = (f + this._d) | 0),
            (this._e = (h + this._e) | 0);
        }),
        (i.prototype._hash = function () {
          var t = h.allocUnsafe(20);
          return (
            t.writeInt32BE(0 | this._a, 0),
            t.writeInt32BE(0 | this._b, 4),
            t.writeInt32BE(0 | this._c, 8),
            t.writeInt32BE(0 | this._d, 12),
            t.writeInt32BE(0 | this._e, 16),
            t
          );
        }),
        (e.exports = i);
    },
    { "./hash": 162, inherits: 132, "safe-buffer": 160 },
  ],
  165: [
    function (t, e, r) {
      function i() {
        this.init(), (this._w = d), h.call(this, 64, 56);
      }
      function n(t) {
        return (t << 1) | (t >>> 31);
      }
      function s(t) {
        return (t << 5) | (t >>> 27);
      }
      function o(t) {
        return (t << 30) | (t >>> 2);
      }
      function a(t, e, r, i) {
        return 0 === t
          ? (e & r) | (~e & i)
          : 2 === t
          ? (e & r) | (e & i) | (r & i)
          : e ^ r ^ i;
      }
      var f = t("inherits"),
        h = t("./hash"),
        u = t("safe-buffer").Buffer,
        c = [1518500249, 1859775393, -1894007588, -899497514],
        d = new Array(80);
      f(i, h),
        (i.prototype.init = function () {
          return (
            (this._a = 1732584193),
            (this._b = 4023233417),
            (this._c = 2562383102),
            (this._d = 271733878),
            (this._e = 3285377520),
            this
          );
        }),
        (i.prototype._update = function (t) {
          for (
            var e = this._w,
              r = 0 | this._a,
              i = 0 | this._b,
              f = 0 | this._c,
              h = 0 | this._d,
              u = 0 | this._e,
              d = 0;
            d < 16;
            ++d
          )
            e[d] = t.readInt32BE(4 * d);
          for (; d < 80; ++d)
            e[d] = n(e[d - 3] ^ e[d - 8] ^ e[d - 14] ^ e[d - 16]);
          for (var l = 0; l < 80; ++l) {
            var p = ~~(l / 20),
              b = (s(r) + a(p, i, f, h) + u + e[l] + c[p]) | 0;
            (u = h), (h = f), (f = o(i)), (i = r), (r = b);
          }
          (this._a = (r + this._a) | 0),
            (this._b = (i + this._b) | 0),
            (this._c = (f + this._c) | 0),
            (this._d = (h + this._d) | 0),
            (this._e = (u + this._e) | 0);
        }),
        (i.prototype._hash = function () {
          var t = u.allocUnsafe(20);
          return (
            t.writeInt32BE(0 | this._a, 0),
            t.writeInt32BE(0 | this._b, 4),
            t.writeInt32BE(0 | this._c, 8),
            t.writeInt32BE(0 | this._d, 12),
            t.writeInt32BE(0 | this._e, 16),
            t
          );
        }),
        (e.exports = i);
    },
    { "./hash": 162, inherits: 132, "safe-buffer": 160 },
  ],
  166: [
    function (t, e, r) {
      function i() {
        this.init(), (this._w = f), o.call(this, 64, 56);
      }
      var n = t("inherits"),
        s = t("./sha256"),
        o = t("./hash"),
        a = t("safe-buffer").Buffer,
        f = new Array(64);
      n(i, s),
        (i.prototype.init = function () {
          return (
            (this._a = 3238371032),
            (this._b = 914150663),
            (this._c = 812702999),
            (this._d = 4144912697),
            (this._e = 4290775857),
            (this._f = 1750603025),
            (this._g = 1694076839),
            (this._h = 3204075428),
            this
          );
        }),
        (i.prototype._hash = function () {
          var t = a.allocUnsafe(28);
          return (
            t.writeInt32BE(this._a, 0),
            t.writeInt32BE(this._b, 4),
            t.writeInt32BE(this._c, 8),
            t.writeInt32BE(this._d, 12),
            t.writeInt32BE(this._e, 16),
            t.writeInt32BE(this._f, 20),
            t.writeInt32BE(this._g, 24),
            t
          );
        }),
        (e.exports = i);
    },
    { "./hash": 162, "./sha256": 167, inherits: 132, "safe-buffer": 160 },
  ],
  167: [
    function (t, e, r) {
      function i() {
        this.init(), (this._w = p), c.call(this, 64, 56);
      }
      function n(t, e, r) {
        return r ^ (t & (e ^ r));
      }
      function s(t, e, r) {
        return (t & e) | (r & (t | e));
      }
      function o(t) {
        return (
          ((t >>> 2) | (t << 30)) ^
          ((t >>> 13) | (t << 19)) ^
          ((t >>> 22) | (t << 10))
        );
      }
      function a(t) {
        return (
          ((t >>> 6) | (t << 26)) ^
          ((t >>> 11) | (t << 21)) ^
          ((t >>> 25) | (t << 7))
        );
      }
      function f(t) {
        return ((t >>> 7) | (t << 25)) ^ ((t >>> 18) | (t << 14)) ^ (t >>> 3);
      }
      function h(t) {
        return ((t >>> 17) | (t << 15)) ^ ((t >>> 19) | (t << 13)) ^ (t >>> 10);
      }
      var u = t("inherits"),
        c = t("./hash"),
        d = t("safe-buffer").Buffer,
        l = [
          1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
          2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987,
          1925078388, 2162078206, 2614888103, 3248222580, 3835390401,
          4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692,
          1996064986, 2554220882, 2821834349, 2952996808, 3210313671,
          3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912,
          1294757372, 1396182291, 1695183700, 1986661051, 2177026350,
          2456956037, 2730485921, 2820302411, 3259730800, 3345764771,
          3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616,
          659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779,
          1955562222, 2024104815, 2227730452, 2361852424, 2428436474,
          2756734187, 3204031479, 3329325298,
        ],
        p = new Array(64);
      u(i, c),
        (i.prototype.init = function () {
          return (
            (this._a = 1779033703),
            (this._b = 3144134277),
            (this._c = 1013904242),
            (this._d = 2773480762),
            (this._e = 1359893119),
            (this._f = 2600822924),
            (this._g = 528734635),
            (this._h = 1541459225),
            this
          );
        }),
        (i.prototype._update = function (t) {
          for (
            var e = this._w,
              r = 0 | this._a,
              i = 0 | this._b,
              u = 0 | this._c,
              c = 0 | this._d,
              d = 0 | this._e,
              p = 0 | this._f,
              b = 0 | this._g,
              m = 0 | this._h,
              y = 0;
            y < 16;
            ++y
          )
            e[y] = t.readInt32BE(4 * y);
          for (; y < 64; ++y)
            e[y] = (h(e[y - 2]) + e[y - 7] + f(e[y - 15]) + e[y - 16]) | 0;
          for (var g = 0; g < 64; ++g) {
            var v = (m + a(d) + n(d, p, b) + l[g] + e[g]) | 0,
              w = (o(r) + s(r, i, u)) | 0;
            (m = b),
              (b = p),
              (p = d),
              (d = (c + v) | 0),
              (c = u),
              (u = i),
              (i = r),
              (r = (v + w) | 0);
          }
          (this._a = (r + this._a) | 0),
            (this._b = (i + this._b) | 0),
            (this._c = (u + this._c) | 0),
            (this._d = (c + this._d) | 0),
            (this._e = (d + this._e) | 0),
            (this._f = (p + this._f) | 0),
            (this._g = (b + this._g) | 0),
            (this._h = (m + this._h) | 0);
        }),
        (i.prototype._hash = function () {
          var t = d.allocUnsafe(32);
          return (
            t.writeInt32BE(this._a, 0),
            t.writeInt32BE(this._b, 4),
            t.writeInt32BE(this._c, 8),
            t.writeInt32BE(this._d, 12),
            t.writeInt32BE(this._e, 16),
            t.writeInt32BE(this._f, 20),
            t.writeInt32BE(this._g, 24),
            t.writeInt32BE(this._h, 28),
            t
          );
        }),
        (e.exports = i);
    },
    { "./hash": 162, inherits: 132, "safe-buffer": 160 },
  ],
  168: [
    function (t, e, r) {
      function i() {
        this.init(), (this._w = f), o.call(this, 128, 112);
      }
      var n = t("inherits"),
        s = t("./sha512"),
        o = t("./hash"),
        a = t("safe-buffer").Buffer,
        f = new Array(160);
      n(i, s),
        (i.prototype.init = function () {
          return (
            (this._ah = 3418070365),
            (this._bh = 1654270250),
            (this._ch = 2438529370),
            (this._dh = 355462360),
            (this._eh = 1731405415),
            (this._fh = 2394180231),
            (this._gh = 3675008525),
            (this._hh = 1203062813),
            (this._al = 3238371032),
            (this._bl = 914150663),
            (this._cl = 812702999),
            (this._dl = 4144912697),
            (this._el = 4290775857),
            (this._fl = 1750603025),
            (this._gl = 1694076839),
            (this._hl = 3204075428),
            this
          );
        }),
        (i.prototype._hash = function () {
          function t(t, r, i) {
            e.writeInt32BE(t, i), e.writeInt32BE(r, i + 4);
          }
          var e = a.allocUnsafe(48);
          return (
            t(this._ah, this._al, 0),
            t(this._bh, this._bl, 8),
            t(this._ch, this._cl, 16),
            t(this._dh, this._dl, 24),
            t(this._eh, this._el, 32),
            t(this._fh, this._fl, 40),
            e
          );
        }),
        (e.exports = i);
    },
    { "./hash": 162, "./sha512": 169, inherits: 132, "safe-buffer": 160 },
  ],
  169: [
    function (t, e, r) {
      function i() {
        this.init(), (this._w = y), p.call(this, 128, 112);
      }
      function n(t, e, r) {
        return r ^ (t & (e ^ r));
      }
      function s(t, e, r) {
        return (t & e) | (r & (t | e));
      }
      function o(t, e) {
        return (
          ((t >>> 28) | (e << 4)) ^
          ((e >>> 2) | (t << 30)) ^
          ((e >>> 7) | (t << 25))
        );
      }
      function a(t, e) {
        return (
          ((t >>> 14) | (e << 18)) ^
          ((t >>> 18) | (e << 14)) ^
          ((e >>> 9) | (t << 23))
        );
      }
      function f(t, e) {
        return ((t >>> 1) | (e << 31)) ^ ((t >>> 8) | (e << 24)) ^ (t >>> 7);
      }
      function h(t, e) {
        return (
          ((t >>> 1) | (e << 31)) ^
          ((t >>> 8) | (e << 24)) ^
          ((t >>> 7) | (e << 25))
        );
      }
      function u(t, e) {
        return ((t >>> 19) | (e << 13)) ^ ((e >>> 29) | (t << 3)) ^ (t >>> 6);
      }
      function c(t, e) {
        return (
          ((t >>> 19) | (e << 13)) ^
          ((e >>> 29) | (t << 3)) ^
          ((t >>> 6) | (e << 26))
        );
      }
      function d(t, e) {
        return t >>> 0 < e >>> 0 ? 1 : 0;
      }
      var l = t("inherits"),
        p = t("./hash"),
        b = t("safe-buffer").Buffer,
        m = [
          1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399,
          3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265,
          2453635748, 2937671579, 2870763221, 3664609560, 3624381080,
          2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987,
          3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103,
          633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774,
          944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983,
          1495990901, 1249150122, 1856431235, 1555081692, 3175218132,
          1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016,
          2952996808, 2566594879, 3210313671, 3203337956, 3336571891,
          1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895,
          168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372,
          1522805485, 1396182291, 2643833823, 1695183700, 2343527390,
          1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627,
          2730485921, 1290863460, 2820302411, 3158454273, 3259730800,
          3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804,
          1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734,
          3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877,
          3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063,
          2003034995, 1747873779, 3602036899, 1955562222, 1575990012,
          2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044,
          2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573,
          3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711,
          3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554,
          174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315,
          685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100,
          1126000580, 2618297676, 1288033470, 3409855158, 1501505948,
          4234509866, 1607167915, 987167468, 1816402316, 1246189591,
        ],
        y = new Array(160);
      l(i, p),
        (i.prototype.init = function () {
          return (
            (this._ah = 1779033703),
            (this._bh = 3144134277),
            (this._ch = 1013904242),
            (this._dh = 2773480762),
            (this._eh = 1359893119),
            (this._fh = 2600822924),
            (this._gh = 528734635),
            (this._hh = 1541459225),
            (this._al = 4089235720),
            (this._bl = 2227873595),
            (this._cl = 4271175723),
            (this._dl = 1595750129),
            (this._el = 2917565137),
            (this._fl = 725511199),
            (this._gl = 4215389547),
            (this._hl = 327033209),
            this
          );
        }),
        (i.prototype._update = function (t) {
          for (
            var e = this._w,
              r = 0 | this._ah,
              i = 0 | this._bh,
              l = 0 | this._ch,
              p = 0 | this._dh,
              b = 0 | this._eh,
              y = 0 | this._fh,
              g = 0 | this._gh,
              v = 0 | this._hh,
              w = 0 | this._al,
              _ = 0 | this._bl,
              M = 0 | this._cl,
              S = 0 | this._dl,
              E = 0 | this._el,
              k = 0 | this._fl,
              A = 0 | this._gl,
              x = 0 | this._hl,
              B = 0;
            B < 32;
            B += 2
          )
            (e[B] = t.readInt32BE(4 * B)),
              (e[B + 1] = t.readInt32BE(4 * B + 4));
          for (; B < 160; B += 2) {
            var R = e[B - 30],
              I = e[B - 30 + 1],
              j = f(R, I),
              T = h(I, R);
            (R = e[B - 4]), (I = e[B - 4 + 1]);
            var C = u(R, I),
              P = c(I, R),
              L = e[B - 14],
              O = e[B - 14 + 1],
              D = e[B - 32],
              N = e[B - 32 + 1],
              q = (T + O) | 0,
              U = (j + L + d(q, T)) | 0;
            (q = (q + P) | 0),
              (U = (U + C + d(q, P)) | 0),
              (q = (q + N) | 0),
              (U = (U + D + d(q, N)) | 0),
              (e[B] = U),
              (e[B + 1] = q);
          }
          for (var z = 0; z < 160; z += 2) {
            (U = e[z]), (q = e[z + 1]);
            var K = s(r, i, l),
              F = s(w, _, M),
              H = o(r, w),
              W = o(w, r),
              V = a(b, E),
              Z = a(E, b),
              X = m[z],
              G = m[z + 1],
              Y = n(b, y, g),
              J = n(E, k, A),
              $ = (x + Z) | 0,
              Q = (v + V + d($, x)) | 0;
            ($ = ($ + J) | 0),
              (Q = (Q + Y + d($, J)) | 0),
              ($ = ($ + G) | 0),
              (Q = (Q + X + d($, G)) | 0),
              ($ = ($ + q) | 0),
              (Q = (Q + U + d($, q)) | 0);
            var tt = (W + F) | 0,
              et = (H + K + d(tt, W)) | 0;
            (v = g),
              (x = A),
              (g = y),
              (A = k),
              (y = b),
              (k = E),
              (E = (S + $) | 0),
              (b = (p + Q + d(E, S)) | 0),
              (p = l),
              (S = M),
              (l = i),
              (M = _),
              (i = r),
              (_ = w),
              (w = ($ + tt) | 0),
              (r = (Q + et + d(w, $)) | 0);
          }
          (this._al = (this._al + w) | 0),
            (this._bl = (this._bl + _) | 0),
            (this._cl = (this._cl + M) | 0),
            (this._dl = (this._dl + S) | 0),
            (this._el = (this._el + E) | 0),
            (this._fl = (this._fl + k) | 0),
            (this._gl = (this._gl + A) | 0),
            (this._hl = (this._hl + x) | 0),
            (this._ah = (this._ah + r + d(this._al, w)) | 0),
            (this._bh = (this._bh + i + d(this._bl, _)) | 0),
            (this._ch = (this._ch + l + d(this._cl, M)) | 0),
            (this._dh = (this._dh + p + d(this._dl, S)) | 0),
            (this._eh = (this._eh + b + d(this._el, E)) | 0),
            (this._fh = (this._fh + y + d(this._fl, k)) | 0),
            (this._gh = (this._gh + g + d(this._gl, A)) | 0),
            (this._hh = (this._hh + v + d(this._hl, x)) | 0);
        }),
        (i.prototype._hash = function () {
          function t(t, r, i) {
            e.writeInt32BE(t, i), e.writeInt32BE(r, i + 4);
          }
          var e = b.allocUnsafe(64);
          return (
            t(this._ah, this._al, 0),
            t(this._bh, this._bl, 8),
            t(this._ch, this._cl, 16),
            t(this._dh, this._dl, 24),
            t(this._eh, this._el, 32),
            t(this._fh, this._fl, 40),
            t(this._gh, this._gl, 48),
            t(this._hh, this._hl, 56),
            e
          );
        }),
        (e.exports = i);
    },
    { "./hash": 162, inherits: 132, "safe-buffer": 160 },
  ],
  170: [
    function (t, e, r) {
      function i() {
        n.call(this);
      }
      e.exports = i;
      var n = t("events").EventEmitter,
        s = t("inherits");
      s(i, n),
        (i.Readable = t("readable-stream/lib/_stream_readable.js")),
        (i.Writable = t("readable-stream/lib/_stream_writable.js")),
        (i.Duplex = t("readable-stream/lib/_stream_duplex.js")),
        (i.Transform = t("readable-stream/lib/_stream_transform.js")),
        (i.PassThrough = t("readable-stream/lib/_stream_passthrough.js")),
        (i.finished = t(
          "readable-stream/lib/internal/streams/end-of-stream.js"
        )),
        (i.pipeline = t("readable-stream/lib/internal/streams/pipeline.js")),
        (i.Stream = i),
        (i.prototype.pipe = function (t, e) {
          function r(e) {
            t.writable && !1 === t.write(e) && h.pause && h.pause();
          }
          function i() {
            h.readable && h.resume && h.resume();
          }
          function s() {
            u || ((u = !0), t.end());
          }
          function o() {
            u || ((u = !0), "function" == typeof t.destroy && t.destroy());
          }
          function a(t) {
            if ((f(), 0 === n.listenerCount(this, "error"))) throw t;
          }
          function f() {
            h.removeListener("data", r),
              t.removeListener("drain", i),
              h.removeListener("end", s),
              h.removeListener("close", o),
              h.removeListener("error", a),
              t.removeListener("error", a),
              h.removeListener("end", f),
              h.removeListener("close", f),
              t.removeListener("close", f);
          }
          var h = this;
          h.on("data", r),
            t.on("drain", i),
            t._isStdio ||
              (e && !1 === e.end) ||
              (h.on("end", s), h.on("close", o));
          var u = !1;
          return (
            h.on("error", a),
            t.on("error", a),
            h.on("end", f),
            h.on("close", f),
            t.on("close", f),
            t.emit("pipe", h),
            t
          );
        });
    },
    {
      events: 100,
      inherits: 132,
      "readable-stream/lib/_stream_duplex.js": 172,
      "readable-stream/lib/_stream_passthrough.js": 173,
      "readable-stream/lib/_stream_readable.js": 174,
      "readable-stream/lib/_stream_transform.js": 175,
      "readable-stream/lib/_stream_writable.js": 176,
      "readable-stream/lib/internal/streams/end-of-stream.js": 180,
      "readable-stream/lib/internal/streams/pipeline.js": 182,
    },
  ],
  171: [
    function (t, e, r) {
      arguments[4][47][0].apply(r, arguments);
    },
    { dup: 47 },
  ],
  172: [
    function (t, e, r) {
      arguments[4][48][0].apply(r, arguments);
    },
    {
      "./_stream_readable": 174,
      "./_stream_writable": 176,
      _process: 149,
      dup: 48,
      inherits: 132,
    },
  ],
  173: [
    function (t, e, r) {
      arguments[4][49][0].apply(r, arguments);
    },
    { "./_stream_transform": 175, dup: 49, inherits: 132 },
  ],
  174: [
    function (t, e, r) {
      arguments[4][50][0].apply(r, arguments);
    },
    {
      "../errors": 171,
      "./_stream_duplex": 172,
      "./internal/streams/async_iterator": 177,
      "./internal/streams/buffer_list": 178,
      "./internal/streams/destroy": 179,
      "./internal/streams/from": 181,
      "./internal/streams/state": 183,
      "./internal/streams/stream": 184,
      _process: 149,
      buffer: 63,
      dup: 50,
      events: 100,
      inherits: 132,
      "string_decoder/": 185,
      util: 19,
    },
  ],
  175: [
    function (t, e, r) {
      arguments[4][51][0].apply(r, arguments);
    },
    { "../errors": 171, "./_stream_duplex": 172, dup: 51, inherits: 132 },
  ],
  176: [
    function (t, e, r) {
      arguments[4][52][0].apply(r, arguments);
    },
    {
      "../errors": 171,
      "./_stream_duplex": 172,
      "./internal/streams/destroy": 179,
      "./internal/streams/state": 183,
      "./internal/streams/stream": 184,
      _process: 149,
      buffer: 63,
      dup: 52,
      inherits: 132,
      "util-deprecate": 186,
    },
  ],
  177: [
    function (t, e, r) {
      arguments[4][53][0].apply(r, arguments);
    },
    { "./end-of-stream": 180, _process: 149, dup: 53 },
  ],
  178: [
    function (t, e, r) {
      arguments[4][54][0].apply(r, arguments);
    },
    { buffer: 63, dup: 54, util: 19 },
  ],
  179: [
    function (t, e, r) {
      arguments[4][55][0].apply(r, arguments);
    },
    { _process: 149, dup: 55 },
  ],
  180: [
    function (t, e, r) {
      arguments[4][56][0].apply(r, arguments);
    },
    { "../../../errors": 171, dup: 56 },
  ],
  181: [
    function (t, e, r) {
      arguments[4][57][0].apply(r, arguments);
    },
    { dup: 57 },
  ],
  182: [
    function (t, e, r) {
      arguments[4][58][0].apply(r, arguments);
    },
    { "../../../errors": 171, "./end-of-stream": 180, dup: 58 },
  ],
  183: [
    function (t, e, r) {
      arguments[4][59][0].apply(r, arguments);
    },
    { "../../../errors": 171, dup: 59 },
  ],
  184: [
    function (t, e, r) {
      arguments[4][60][0].apply(r, arguments);
    },
    { dup: 60, events: 100 },
  ],
  185: [
    function (t, e, r) {
      "use strict";
      function i(t) {
        if (!t) return "utf8";
        for (var e; ; )
          switch (t) {
            case "utf8":
            case "utf-8":
              return "utf8";
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return "utf16le";
            case "latin1":
            case "binary":
              return "latin1";
            case "base64":
            case "ascii":
            case "hex":
              return t;
            default:
              if (e) return;
              (t = ("" + t).toLowerCase()), (e = !0);
          }
      }
      function n(t) {
        var e = i(t);
        if ("string" != typeof e && (g.isEncoding === v || !v(t)))
          throw new Error("Unknown encoding: " + t);
        return e || t;
      }
      function s(t) {
        var e;
        switch (((this.encoding = n(t)), this.encoding)) {
          case "utf16le":
            (this.text = d), (this.end = l), (e = 4);
            break;
          case "utf8":
            (this.fillLast = h), (e = 4);
            break;
          case "base64":
            (this.text = p), (this.end = b), (e = 3);
            break;
          default:
            return (this.write = m), void (this.end = y);
        }
        (this.lastNeed = 0),
          (this.lastTotal = 0),
          (this.lastChar = g.allocUnsafe(e));
      }
      function o(t) {
        return t <= 127
          ? 0
          : t >> 5 == 6
          ? 2
          : t >> 4 == 14
          ? 3
          : t >> 3 == 30
          ? 4
          : t >> 6 == 2
          ? -1
          : -2;
      }
      function a(t, e, r) {
        var i = e.length - 1;
        if (i < r) return 0;
        var n = o(e[i]);
        return n >= 0
          ? (n > 0 && (t.lastNeed = n - 1), n)
          : --i < r || -2 === n
          ? 0
          : ((n = o(e[i])),
            n >= 0
              ? (n > 0 && (t.lastNeed = n - 2), n)
              : --i < r || -2 === n
              ? 0
              : ((n = o(e[i])),
                n >= 0
                  ? (n > 0 && (2 === n ? (n = 0) : (t.lastNeed = n - 3)), n)
                  : 0));
      }
      function f(t, e, r) {
        if (128 != (192 & e[0])) return (t.lastNeed = 0), "�";
        if (t.lastNeed > 1 && e.length > 1) {
          if (128 != (192 & e[1])) return (t.lastNeed = 1), "�";
          if (t.lastNeed > 2 && e.length > 2 && 128 != (192 & e[2]))
            return (t.lastNeed = 2), "�";
        }
      }
      function h(t) {
        var e = this.lastTotal - this.lastNeed,
          r = f(this, t, e);
        return void 0 !== r
          ? r
          : this.lastNeed <= t.length
          ? (t.copy(this.lastChar, e, 0, this.lastNeed),
            this.lastChar.toString(this.encoding, 0, this.lastTotal))
          : (t.copy(this.lastChar, e, 0, t.length),
            void (this.lastNeed -= t.length));
      }
      function u(t, e) {
        var r = a(this, t, e);
        if (!this.lastNeed) return t.toString("utf8", e);
        this.lastTotal = r;
        var i = t.length - (r - this.lastNeed);
        return t.copy(this.lastChar, 0, i), t.toString("utf8", e, i);
      }
      function c(t) {
        var e = t && t.length ? this.write(t) : "";
        return this.lastNeed ? e + "�" : e;
      }
      function d(t, e) {
        if ((t.length - e) % 2 == 0) {
          var r = t.toString("utf16le", e);
          if (r) {
            var i = r.charCodeAt(r.length - 1);
            if (i >= 55296 && i <= 56319)
              return (
                (this.lastNeed = 2),
                (this.lastTotal = 4),
                (this.lastChar[0] = t[t.length - 2]),
                (this.lastChar[1] = t[t.length - 1]),
                r.slice(0, -1)
              );
          }
          return r;
        }
        return (
          (this.lastNeed = 1),
          (this.lastTotal = 2),
          (this.lastChar[0] = t[t.length - 1]),
          t.toString("utf16le", e, t.length - 1)
        );
      }
      function l(t) {
        var e = t && t.length ? this.write(t) : "";
        if (this.lastNeed) {
          var r = this.lastTotal - this.lastNeed;
          return e + this.lastChar.toString("utf16le", 0, r);
        }
        return e;
      }
      function p(t, e) {
        var r = (t.length - e) % 3;
        return 0 === r
          ? t.toString("base64", e)
          : ((this.lastNeed = 3 - r),
            (this.lastTotal = 3),
            1 === r
              ? (this.lastChar[0] = t[t.length - 1])
              : ((this.lastChar[0] = t[t.length - 2]),
                (this.lastChar[1] = t[t.length - 1])),
            t.toString("base64", e, t.length - r));
      }
      function b(t) {
        var e = t && t.length ? this.write(t) : "";
        return this.lastNeed
          ? e + this.lastChar.toString("base64", 0, 3 - this.lastNeed)
          : e;
      }
      function m(t) {
        return t.toString(this.encoding);
      }
      function y(t) {
        return t && t.length ? this.write(t) : "";
      }
      var g = t("safe-buffer").Buffer,
        v =
          g.isEncoding ||
          function (t) {
            switch (((t = "" + t), t && t.toLowerCase())) {
              case "hex":
              case "utf8":
              case "utf-8":
              case "ascii":
              case "binary":
              case "base64":
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
              case "raw":
                return !0;
              default:
                return !1;
            }
          };
      (r.StringDecoder = s),
        (s.prototype.write = function (t) {
          if (0 === t.length) return "";
          var e, r;
          if (this.lastNeed) {
            if (((e = this.fillLast(t)), void 0 === e)) return "";
            (r = this.lastNeed), (this.lastNeed = 0);
          } else r = 0;
          return r < t.length
            ? e
              ? e + this.text(t, r)
              : this.text(t, r)
            : e || "";
        }),
        (s.prototype.end = c),
        (s.prototype.text = u),
        (s.prototype.fillLast = function (t) {
          if (this.lastNeed <= t.length)
            return (
              t.copy(
                this.lastChar,
                this.lastTotal - this.lastNeed,
                0,
                this.lastNeed
              ),
              this.lastChar.toString(this.encoding, 0, this.lastTotal)
            );
          t.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, t.length),
            (this.lastNeed -= t.length);
        });
    },
    { "safe-buffer": 160 },
  ],
  186: [
    function (t, e, r) {
      (function (t) {
        (function () {
          function r(t, e) {
            function r() {
              if (!n) {
                if (i("throwDeprecation")) throw new Error(e);
                i("traceDeprecation") ? console.trace(e) : console.warn(e),
                  (n = !0);
              }
              return t.apply(this, arguments);
            }
            if (i("noDeprecation")) return t;
            var n = !1;
            return r;
          }
          function i(e) {
            try {
              if (!t.localStorage) return !1;
            } catch (t) {
              return !1;
            }
            var r = t.localStorage[e];
            return null != r && "true" === String(r).toLowerCase();
          }
          e.exports = r;
        }).call(this);
      }).call(
        this,
        "undefined" != typeof global
          ? global
          : "undefined" != typeof self
          ? self
          : "undefined" != typeof window
          ? window
          : {}
      );
    },
    {},
  ],
  187: [
    function (t, e, r) {
      t("crypto");
    },
    { crypto: 71 },
  ],
};
