/* eslint-disable */
export const tt = (function() {
  'use strict';
  function e(e) {
    for (var n = '', t = new Uint8Array(e), r = t.byteLength, a = 0; a < r; a++)
      n += String.fromCharCode(t[a]);
    return _(n);
  }
  function n(e) {
    for (var n = C(e), t = n.length, r = new Uint8Array(t), a = 0; a < t; a++)
      r[a] = n.charCodeAt(a);
    return r.buffer;
  }
  function t(n) {
    return { base64: e(n) };
  }
  function r(e) {
    if (null != e) return e.base64 ? n(e.base64) : void 0;
  }
  function a(e) {
    return function(n) {
      return (
        Object.prototype.toString.call(n).toLowerCase() ===
        ('[object ' + e + ']').toLowerCase()
      );
    };
  }
  function o(e) {
    if (!1 === a('Object')(e)) return e;
    var n = [];
    for (var r in e) {
      var o = e[r];
      if (void 0 !== o && o instanceof ArrayBuffer && void 0 !== o.byteLength) {
        var i = t(o);
        (i.key = r), n.push(i);
      }
    }
    if (n.length > 0) {
      for (var s = 0; s < n.length; s++) delete e[n[s].key];
      e.__nativeBuffers__ = n;
    }
    return e;
  }
  function i(e) {
    if (!1 === a('Object')(e) || null == e.__nativeBuffers__) return e;
    var n = e.__nativeBuffers__;
    delete e.__nativeBuffers__;
    for (var t = 0; t < n.length; t++) {
      var o = n[t];
      if (null != o) {
        var i = r(o);
        void 0 !== i && i instanceof ArrayBuffer && (e[o.key] = i);
      }
    }
    return e;
  }
  function s(e, n) {
    if (void 0 !== e && 'function' == typeof O[n] && '' !== e && null !== e) {
      try {
        (e = JSON.parse(e)), (e = B.unpack(e));
      } catch (n) {
        e = {};
      }
      O[n](e), delete O[n];
    }
  }
  function c(e, n, t) {
    if (
      E &&
      D.needCache.find(function(n) {
        return n === e;
      })
    )
      return void F.push([e, n, t]);
    if (k) s(k.invoke(e, n, t), t);
    else {
      var r = { event: e, paramsString: n, callbackId: t };
      S.messageHandlers.invoke.postMessage(r);
    }
  }
  function f(e, n, t) {
    k
      ? k.publish(e, n, t)
      : S.messageHandlers.publish.postMessage({
          event: e,
          paramsString: n,
          webviewIds: t,
        });
  }
  function u(e, n, t) {
    n = B.pack(n);
    var r = JSON.stringify(n || {}),
      a = ++j;
    (O[a] = t), 'openSchema' === e && L.push(a), c(e, r, a);
  }
  function l(e, n) {
    'string' == typeof n && (n = JSON.parse(n)), (n = B.unpack(n));
    var t = O[e];
    'function' == typeof t && t(n), -1 === L.indexOf(e) && delete O[e];
  }
  function p(e, n) {
    J[e] = n;
  }
  function d(e, n, t) {
    (t = t || []), (t = JSON.stringify(t)), f(
      'custom_event_' + e,
      JSON.stringify(n),
      t,
    );
  }
  function g(e, n) {
    M['custom_event_' + e] = n;
  }
  function v(e, n, t, r) {
    if (e === T.onAppEnterBackground) E = !0;
    else if (e === T.onAppEnterForeground)
      for (E = !1; F.length; ) c.apply(null, F.shift());
    if (
      !E ||
      !D.needDisabled.find(function(n) {
        return n === e;
      })
    ) {
      'string' == typeof n && (n = JSON.parse(n)), (n = B.unpack(n));
      var a = e.indexOf('custom_event_') > -1 ? M[e] : J[e];
      'function' == typeof a && a(n, t, r);
    }
  }
  function h(e) {
    e();
  }
  function y() {
    var e = Array.prototype.slice.call(arguments);
    (e[1] = { data: e[1], options: { timestamp: Date.now() } }), h(function() {
      N.publish.apply(N, e);
    });
  }
  function b(e) {
    var n = e.name,
      t = void 0 === e.type ? 'sdk' : e.type,
      r = void 0 === e.args ? {} : e.args,
      a = void 0 === e.ext ? {} : e.ext;
    (H[x] = {
      success: r.success || R,
      fail: r.fail || R,
      complete: r.complete || R,
    }), (I[x] = {
      beforeAll: a.beforeAll || R,
      beforeSuccess: a.beforeSuccess || R,
      afterSuccess: a.afterSuccess || R,
      beforeFail: a.beforeFail || R,
      afterFail: a.afterFail || R,
      afterAll: a.afterAll || R,
    }), y('invokeAppServiceMethod', {
      name: n,
      type: t,
      args: r,
      callbackId: x,
    }), (x += 1);
  }
  var m = new Function('return this;')(),
    k = m.ttJSCore,
    S = m.webkit;
  m.ttJSCore &&
    (m.ttJSCore = {
      onDocumentReady: function() {
        return k.onDocumentReady();
      },
    });
  var A = navigator.userAgent.toLocaleLowerCase().includes('toutiaomicroapp');
  m.webkit &&
    A &&
    (m.webkit = {
      messageHandlers: {
        onDocumentReady: {
          postMessage: function() {
            return S.messageHandlers.onDocumentReady.postMessage('');
          },
        },
      },
    });
  var w = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
    _ =
      _ ||
      function(e) {
        for (
          var n, t, r = String(e), a = '', o = 0, i = w;
          r.charAt(0 | o) || ((i = '='), o % 1);
          a += i.charAt(63 & (n >> (8 - o % 1 * 8)))
        ) {
          if ((t = r.charCodeAt((o += 0.75))) > 255)
            throw new Error('"btoa" failed');
          n = (n << 8) | t;
        }
        return a;
      },
    C =
      C ||
      function(e) {
        var n = String(e).replace(/=+$/, ''),
          t = '';
        if (n.length % 4 == 1) throw new Error('"atob" failed');
        for (
          var r, a, o = 0, i = 0;
          (a = n.charAt(i++));
          ~a && ((r = o % 4 ? 64 * r + a : a), o++ % 4)
            ? (t += String.fromCharCode(255 & (r >> ((-2 * o) & 6))))
            : 0
        )
          a = w.indexOf(a);
        return t;
      },
    B = { new: t, get: r, pack: o, unpack: i },
    O = {},
    j = 0,
    J = {},
    M = {},
    F = [],
    E = !1,
    L = [],
    T = {
      onAppEnterBackground: 'onAppEnterBackground',
      onAppEnterForeground: 'onAppEnterForeground',
    },
    D = {
      needCache: ['showModal', 'showToast', 'showActionSheet', 'hideToast'],
      needDisabled: ['onAccelerometerChange', 'onCompassChange'],
    },
    N = { on: p, publish: d, invoke: u, subscribe: g };
  m.ttJSBridge = {
    get invokeHandler() {
      return l;
    },
    get subscribeHandler() {
      return v;
    },
  };
  var x = 0,
    H = [],
    I = [],
    R = function() {};
  return (function() {
    var e = Array.prototype.slice.call(arguments),
      n = e[1];
    (e[1] = function(e, t) {
      'string' == typeof e && (e = JSON.parse(e));
      var r = e.data;
      'function' == typeof n && n(r, t);
    }), h(function() {
      N.subscribe.apply(N, e);
    });
  })('callbackAppServiceMethod', function(e) {
    var n = e.res,
      t = e.isSuccess,
      r = e.callbackId,
      a = H[r],
      o = I[r];
    o.beforeAll(
      n,
    ), t ? (o.beforeSuccess(n), a.success(n), o.afterSuccess(n)) : (o.beforeFail(n), a.fail(n), o.afterFail(n)), a.complete(n), o.afterAll(n);
  }), {
    miniProgram: {
      redirectTo: function(e) {
        b({ name: 'redirectTo', args: e, type: 'jssdk' });
      },
      navigateTo: function(e) {
        b({ name: 'navigateTo', args: e, type: 'jssdk' });
      },
      switchTab: function(e) {
        b({ name: 'switchTab', args: e, type: 'jssdk' });
      },
      reLaunch: function(e) {
        b({ name: 'reLaunch', args: e, type: 'jssdk' });
      },
      navigateBack: function(e) {
        b({ name: 'navigateBack', args: e, type: 'jssdk' });
      },
      postMessage: function(e) {
        e && b({ name: 'postMessage', args: e, type: 'jssdk' });
      },
      setSwipeBackModeSync: function() {
        b({
          name: 'setSwipeBackMode',
          args: {
            mode:
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : 0,
          },
          type: 'jssdk',
        });
      },
    },
  };
})();
