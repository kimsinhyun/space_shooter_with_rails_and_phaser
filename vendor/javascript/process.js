// process@2.1.0 downloaded from https://ga.jspm.io/npm:@jspm/core@2.1.0/nodelibs/browser/process-production.js

var e = [];
var r = false;
var n;
var a = -1;

function cleanUpNextTick() {
    if (r && n) {
        r = false;
        n.length ? e = n.concat(e) : a = -1;
        e.length && drainQueue()
    }
}

function drainQueue() {
    if (!r) {
        var t = setTimeout(cleanUpNextTick, 0);
        r = true;
        var o = e.length;
        while (o) {
            n = e;
            e = [];
            while (++a < o) n && n[a].run();
            a = -1;
            o = e.length
        }
        n = null;
        r = false;
        clearTimeout(t)
    }
}

function nextTick(n) {
    var a = new Array(arguments.length - 1);
    if (arguments.length > 1) for (var t = 1; t < arguments.length; t++) a[t - 1] = arguments[t];
    e.push(new Item(n, a));
    e.length !== 1 || r || setTimeout(drainQueue, 0)
}

function Item(e, r) {
    this.fun = e;
    this.array = r
}

Item.prototype.run = function () {
    this.fun.apply(null, this.array)
};
var t = "browser";
var o = "x64";
var i = "browser";
var v = {
    NODE_ENV: "production",
    PATH: "/usr/bin",
    LANG: typeof navigator !== "undefined" ? navigator.language + ".UTF-8" : void 0,
    PWD: "/",
    HOME: "/home",
    TMP: "/tmp"
};
var s = ["/usr/bin/node"];
var l = [];
var u = "v16.8.0";
var c = {};
var emitWarning = function (e, r) {
    console.warn((r ? r + ": " : "") + e)
};
var f = null;
var umask = function (e) {
    return 0
};
var cwd = function () {
    return "/"
};
var chdir = function (e) {
};
var p = {name: "node", sourceUrl: "", headersUrl: "", libUrl: ""};

function noop() {
}

var d = true;
var g = noop;
var m = [];
var h = null;
var _ = {};
var b = false;
var w = {};
var x = null;

function _getActiveRequests() {
    return []
}

function _getActiveHandles() {
    return []
}

var k = noop;
var E = noop;
var cpuUsage = function () {
    return {}
};
var U = cpuUsage;
var A = cpuUsage;
var C = noop;
var T = noop;
var y = noop;
var L = {};

function assert(e, r) {
    if (!e) throw new Error(r || "assertion error")
}

var I = {
    inspector: false,
    debug: false,
    uv: false,
    ipv6: false,
    tls_alpn: false,
    tls_sni: false,
    tls_ocsp: false,
    tls: false,
    cached_builtins: true
};
var N = noop;
var P = noop;

function hasUncaughtExceptionCaptureCallback() {
    return false
}

var D = noop;
var H = noop;
var M = noop;
var q = noop;
var B = noop;
var R = void 0;
var S = void 0;
var O = void 0;
var Q = noop;
var F = 2;
var W = 1;
var G = "/bin/usr/node";
var V = 9229;
var j = "node";
var z = [];
var J = noop;
var K = {
    now: typeof performance !== "undefined" ? performance.now.bind(performance) : void 0,
    timing: typeof performance !== "undefined" ? performance.timing : void 0
};
if (K.now === void 0) {
    var X = Date.now();
    K.timing && K.timing.navigationStart && (X = K.timing.navigationStart);
    K.now = () => Date.now() - X
}

function uptime() {
    return K.now() / 1e3
}

var Y = 1e9;

function hrtime(e) {
    var r = Math.floor(.001 * (Date.now() - K.now()));
    var n = K.now() * .001;
    var a = Math.floor(n) + r;
    var t = Math.floor(n % 1 * 1e9);
    if (e) {
        a -= e[0];
        t -= e[1];
        if (t < 0) {
            a--;
            t += Y
        }
    }
    return [a, t]
}

hrtime.bigint = function (e) {
    var r = hrtime(e);
    return typeof BigInt === "undefined" ? r[0] * Y + r[1] : BigInt(r[0] * Y) + BigInt(r[1])
};
var Z = 10;
var $ = {};
var ee = 0;

function on() {
    return le
}

var re = on;
var ne = on;
var ae = on;
var te = on;
var oe = on;
var ie = noop;
var ve = on;
var se = on;

function listeners() {
    return []
}

var le = {
    version: u,
    versions: c,
    arch: o,
    platform: i,
    browser: d,
    release: p,
    _rawDebug: g,
    moduleLoadList: m,
    binding: f,
    _linkedBinding: h,
    _events: $,
    _eventsCount: ee,
    _maxListeners: Z,
    on: on,
    addListener: re,
    once: ne,
    off: ae,
    removeListener: te,
    removeAllListeners: oe,
    emit: ie,
    prependListener: ve,
    prependOnceListener: se,
    listeners: listeners,
    domain: _,
    _exiting: b,
    config: w,
    dlopen: x,
    uptime: uptime,
    _getActiveRequests: _getActiveRequests,
    _getActiveHandles: _getActiveHandles,
    reallyExit: k,
    _kill: E,
    cpuUsage: cpuUsage,
    resourceUsage: U,
    memoryUsage: A,
    kill: C,
    exit: T,
    openStdin: y,
    allowedNodeEnvironmentFlags: L,
    assert: assert,
    features: I,
    _fatalExceptions: N,
    setUncaughtExceptionCaptureCallback: P,
    hasUncaughtExceptionCaptureCallback: hasUncaughtExceptionCaptureCallback,
    emitWarning: emitWarning,
    nextTick: nextTick,
    _tickCallback: D,
    _debugProcess: H,
    _debugEnd: M,
    _startProfilerIdleNotifier: q,
    _stopProfilerIdleNotifier: B,
    stdout: R,
    stdin: O,
    stderr: S,
    abort: Q,
    umask: umask,
    chdir: chdir,
    cwd: cwd,
    env: v,
    title: t,
    argv: s,
    execArgv: l,
    pid: F,
    ppid: W,
    execPath: G,
    debugPort: V,
    hrtime: hrtime,
    argv0: j,
    _preload_modules: z,
    setSourceMapsEnabled: J
};
export {
    M as _debugEnd,
    H as _debugProcess,
    $ as _events,
    ee as _eventsCount,
    b as _exiting,
    N as _fatalExceptions,
    _getActiveHandles,
    _getActiveRequests,
    E as _kill,
    h as _linkedBinding,
    Z as _maxListeners,
    z as _preload_modules,
    g as _rawDebug,
    q as _startProfilerIdleNotifier,
    B as _stopProfilerIdleNotifier,
    D as _tickCallback,
    Q as abort,
    re as addListener,
    L as allowedNodeEnvironmentFlags,
    o as arch,
    s as argv,
    j as argv0,
    assert,
    f as binding,
    d as browser,
    chdir,
    w as config,
    cpuUsage,
    cwd,
    V as debugPort,
    le as default,
    x as dlopen,
    _ as domain,
    ie as emit,
    emitWarning,
    v as env,
    l as execArgv,
    G as execPath,
    T as exit,
    I as features,
    hasUncaughtExceptionCaptureCallback,
    hrtime,
    C as kill,
    listeners,
    A as memoryUsage,
    m as moduleLoadList,
    nextTick,
    ae as off,
    on,
    ne as once,
    y as openStdin,
    F as pid,
    i as platform,
    W as ppid,
    ve as prependListener,
    se as prependOnceListener,
    k as reallyExit,
    p as release,
    oe as removeAllListeners,
    te as removeListener,
    U as resourceUsage,
    J as setSourceMapsEnabled,
    P as setUncaughtExceptionCaptureCallback,
    S as stderr,
    O as stdin,
    R as stdout,
    t as title,
    umask,
    uptime,
    u as version,
    c as versions
};
