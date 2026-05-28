function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
      t && (r = t);
      var n = 0,
        F = function () {};
      return {
        s: F,
        n: function () {
          return n >= r.length ? {
            done: true
          } : {
            done: false,
            value: r[n++]
          };
        },
        e: function (r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = true,
    u = false;
  return {
    s: function () {
      t = t.call(r);
    },
    n: function () {
      var r = t.next();
      return a = r.done, r;
    },
    e: function (r) {
      u = true, o = r;
    },
    f: function () {
      try {
        a || null == t.return || t.return();
      } finally {
        if (u) throw o;
      }
    }
  };
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

var currentTimingIndices = {};
var setCurrentTimingGates = function setCurrentTimingGates() {
  var runningOrder = mx.get_running_order();
  var _iterator = _createForOfIteratorHelper(runningOrder),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _currentTimingIndices;
      var _step$value = _step.value,
        slot = _step$value.slot,
        timingGateIndex = _step$value.position;
      var previous = (_currentTimingIndices = currentTimingIndices[slot]) !== null && _currentTimingIndices !== void 0 ? _currentTimingIndices : -1;
      if (timingGateIndex === previous) continue;

      // If we rewinded in a demo
      var isRewinded = timingGateIndex < previous;
      currentTimingIndices[slot] = timingGateIndex;

      // Dont broadcast message if time was rewinded in demo
      if (isRewinded) continue;
      mx.message("Slot ".concat(slot, " is at timing gate index ").concat(timingGateIndex, "!"));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
};

// Script messages client every timing gate that is hit by a player
var frameHandler = function frameHandler(seconds) {
  setCurrentTimingGates();
  frameHandlerPrev(seconds);
};

// This syntax is for when you want to set multiple frame handlers
// If you wish to only have 1 frame handler you do not need frameHandlerPrev at all
var frameHandlerPrev = mx.frame_handler;
mx.frame_handler = frameHandler;
