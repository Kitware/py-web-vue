(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueXai"] = factory();
	else
		root["VueXai"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "00b4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__("ac1f");
var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var call = __webpack_require__("c65b");
var uncurryThis = __webpack_require__("e330");
var isCallable = __webpack_require__("1626");
var isObject = __webpack_require__("861d");

var DELEGATES_TO_EXEC = function () {
  var execCalled = false;
  var re = /[ac]/;
  re.exec = function () {
    execCalled = true;
    return /./.exec.apply(this, arguments);
  };
  return re.test('abc') === true && execCalled;
}();

var Error = global.Error;
var un$Test = uncurryThis(/./.test);

// `RegExp.prototype.test` method
// https://tc39.es/ecma262/#sec-regexp.prototype.test
$({ target: 'RegExp', proto: true, forced: !DELEGATES_TO_EXEC }, {
  test: function (str) {
    var exec = this.exec;
    if (!isCallable(exec)) return un$Test(this, str);
    var result = call(exec, this, str);
    if (result !== null && !isObject(result)) {
      throw new Error('RegExp exec method returned something other than an Object or null');
    }
    return !!result;
  }
});


/***/ }),

/***/ "00ee":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ "0366":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");
var aCallable = __webpack_require__("59ed");

var bind = uncurryThis(uncurryThis.bind);

// optional / simple context binding
module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : bind ? bind(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "04d1":
/***/ (function(module, exports, __webpack_require__) {

var userAgent = __webpack_require__("342f");

var firefox = userAgent.match(/firefox\/(\d+)/i);

module.exports = !!firefox && +firefox[1];


/***/ }),

/***/ "057f":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable es/no-object-getownpropertynames -- safe */
var classof = __webpack_require__("c6b6");
var toIndexedObject = __webpack_require__("fc6a");
var $getOwnPropertyNames = __webpack_require__("241c").f;
var arraySlice = __webpack_require__("f36a");

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return $getOwnPropertyNames(it);
  } catch (error) {
    return arraySlice(windowNames);
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && classof(it) == 'Window'
    ? getWindowNames(it)
    : $getOwnPropertyNames(toIndexedObject(it));
};


/***/ }),

/***/ "06cf":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var call = __webpack_require__("c65b");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var createPropertyDescriptor = __webpack_require__("5c6c");
var toIndexedObject = __webpack_require__("fc6a");
var toPropertyKey = __webpack_require__("a04b");
var hasOwn = __webpack_require__("1a2d");
var IE8_DOM_DEFINE = __webpack_require__("0cfb");

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ "07d6":
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),

/***/ "07fa":
/***/ (function(module, exports, __webpack_require__) {

var toLength = __webpack_require__("50c4");

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ "0b25":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var toIntegerOrInfinity = __webpack_require__("5926");
var toLength = __webpack_require__("50c4");

var RangeError = global.RangeError;

// `ToIndex` abstract operation
// https://tc39.es/ecma262/#sec-toindex
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toIntegerOrInfinity(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length or index');
  return length;
};


/***/ }),

/***/ "0b42":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isArray = __webpack_require__("e8b5");
var isConstructor = __webpack_require__("68ee");
var isObject = __webpack_require__("861d");
var wellKnownSymbol = __webpack_require__("b622");

var SPECIES = wellKnownSymbol('species');
var Array = global.Array;

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (isConstructor(C) && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ "0cfb":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");
var createElement = __webpack_require__("cc12");

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "0d51":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

var String = global.String;

module.exports = function (argument) {
  try {
    return String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ "107c":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var global = __webpack_require__("da84");

// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('(?<a>b)', 'g');
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});


/***/ }),

/***/ "1212":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A port of an algorithm by Johannes Baagøe <baagoe@baagoe.com>, 2010
// http://baagoe.com/en/RandomMusings/javascript/
// https://github.com/nquinlan/better-random-numbers-for-javascript-mirror
// Original work is under MIT license -

// Copyright (C) 2010 by Johannes Baagøe <baagoe@baagoe.org>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.



(function(global, module, define) {

function Alea(seed) {
  var me = this, mash = Mash();

  me.next = function() {
    var t = 2091639 * me.s0 + me.c * 2.3283064365386963e-10; // 2^-32
    me.s0 = me.s1;
    me.s1 = me.s2;
    return me.s2 = t - (me.c = t | 0);
  };

  // Apply the seeding algorithm from Baagoe.
  me.c = 1;
  me.s0 = mash(' ');
  me.s1 = mash(' ');
  me.s2 = mash(' ');
  me.s0 -= mash(seed);
  if (me.s0 < 0) { me.s0 += 1; }
  me.s1 -= mash(seed);
  if (me.s1 < 0) { me.s1 += 1; }
  me.s2 -= mash(seed);
  if (me.s2 < 0) { me.s2 += 1; }
  mash = null;
}

function copy(f, t) {
  t.c = f.c;
  t.s0 = f.s0;
  t.s1 = f.s1;
  t.s2 = f.s2;
  return t;
}

function impl(seed, opts) {
  var xg = new Alea(seed),
      state = opts && opts.state,
      prng = xg.next;
  prng.int32 = function() { return (xg.next() * 0x100000000) | 0; }
  prng.double = function() {
    return prng() + (prng() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
  };
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

function Mash() {
  var n = 0xefc8249d;

  var mash = function(data) {
    data = String(data);
    for (var i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  return mash;
}


if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__("07d6") && __webpack_require__("3c35")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.alea = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__("07d6")   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("62e4")(module)))

/***/ }),

/***/ "143c":
/***/ (function(module, exports, __webpack_require__) {

var createTypedArrayConstructor = __webpack_require__("74e8");

// `Int32Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Int32', function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "1448":
/***/ (function(module, exports, __webpack_require__) {

var arrayFromConstructorAndList = __webpack_require__("dfb9");
var typedArraySpeciesConstructor = __webpack_require__("b6b7");

module.exports = function (instance, list) {
  return arrayFromConstructorAndList(typedArraySpeciesConstructor(instance), list);
};


/***/ }),

/***/ "145e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toObject = __webpack_require__("7b0b");
var toAbsoluteIndex = __webpack_require__("23cb");
var lengthOfArrayLike = __webpack_require__("07fa");

var min = Math.min;

// `Array.prototype.copyWithin` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.copywithin
// eslint-disable-next-line es/no-array-prototype-copywithin -- safe
module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = lengthOfArrayLike(O);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),

/***/ "159b":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var DOMIterables = __webpack_require__("fdbc");
var DOMTokenListPrototype = __webpack_require__("785a");
var forEach = __webpack_require__("17c2");
var createNonEnumerableProperty = __webpack_require__("9112");

var handlePrototype = function (CollectionPrototype) {
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  if (DOMIterables[COLLECTION_NAME]) {
    handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype);
  }
}

handlePrototype(DOMTokenListPrototype);


/***/ }),

/***/ "1626":
/***/ (function(module, exports) {

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ "170b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var toLength = __webpack_require__("50c4");
var toAbsoluteIndex = __webpack_require__("23cb");
var typedArraySpeciesConstructor = __webpack_require__("b6b7");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.subarray` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.subarray
exportTypedArrayMethod('subarray', function subarray(begin, end) {
  var O = aTypedArray(this);
  var length = O.length;
  var beginIndex = toAbsoluteIndex(begin, length);
  var C = typedArraySpeciesConstructor(O);
  return new C(
    O.buffer,
    O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT,
    toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - beginIndex)
  );
});


/***/ }),

/***/ "17c2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $forEach = __webpack_require__("b727").forEach;
var arrayMethodIsStrict = __webpack_require__("a640");

var STRICT_METHOD = arrayMethodIsStrict('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
module.exports = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
} : [].forEach;


/***/ }),

/***/ "182d":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var toPositiveInteger = __webpack_require__("f8cd");

var RangeError = global.RangeError;

module.exports = function (it, BYTES) {
  var offset = toPositiveInteger(it);
  if (offset % BYTES) throw RangeError('Wrong offset');
  return offset;
};


/***/ }),

/***/ "19aa":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isPrototypeOf = __webpack_require__("3a9b");

var TypeError = global.TypeError;

module.exports = function (it, Prototype) {
  if (isPrototypeOf(Prototype, it)) return it;
  throw TypeError('Incorrect invocation');
};


/***/ }),

/***/ "1a2d":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");
var toObject = __webpack_require__("7b0b");

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ "1be4":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ "1c7e":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),

/***/ "1d1c":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var DESCRIPTORS = __webpack_require__("83ab");
var defineProperties = __webpack_require__("37e8");

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
$({ target: 'Object', stat: true, forced: !DESCRIPTORS, sham: !DESCRIPTORS }, {
  defineProperties: defineProperties
});


/***/ }),

/***/ "1d80":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

var TypeError = global.TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "1dde":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var wellKnownSymbol = __webpack_require__("b622");
var V8_VERSION = __webpack_require__("2d00");

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),

/***/ "219c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("da84");
var uncurryThis = __webpack_require__("e330");
var fails = __webpack_require__("d039");
var aCallable = __webpack_require__("59ed");
var internalSort = __webpack_require__("addb");
var ArrayBufferViewCore = __webpack_require__("ebb5");
var FF = __webpack_require__("04d1");
var IE_OR_EDGE = __webpack_require__("d998");
var V8 = __webpack_require__("2d00");
var WEBKIT = __webpack_require__("512c");

var Array = global.Array;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var Uint16Array = global.Uint16Array;
var un$Sort = Uint16Array && uncurryThis(Uint16Array.prototype.sort);

// WebKit
var ACCEPT_INCORRECT_ARGUMENTS = !!un$Sort && !(fails(function () {
  un$Sort(new Uint16Array(2), null);
}) && fails(function () {
  un$Sort(new Uint16Array(2), {});
}));

var STABLE_SORT = !!un$Sort && !fails(function () {
  // feature detection can be too slow, so check engines versions
  if (V8) return V8 < 74;
  if (FF) return FF < 67;
  if (IE_OR_EDGE) return true;
  if (WEBKIT) return WEBKIT < 602;

  var array = new Uint16Array(516);
  var expected = Array(516);
  var index, mod;

  for (index = 0; index < 516; index++) {
    mod = index % 4;
    array[index] = 515 - index;
    expected[index] = index - 2 * mod + 3;
  }

  un$Sort(array, function (a, b) {
    return (a / 4 | 0) - (b / 4 | 0);
  });

  for (index = 0; index < 516; index++) {
    if (array[index] !== expected[index]) return true;
  }
});

var getSortCompare = function (comparefn) {
  return function (x, y) {
    if (comparefn !== undefined) return +comparefn(x, y) || 0;
    // eslint-disable-next-line no-self-compare -- NaN check
    if (y !== y) return -1;
    // eslint-disable-next-line no-self-compare -- NaN check
    if (x !== x) return 1;
    if (x === 0 && y === 0) return 1 / x > 0 && 1 / y < 0 ? 1 : -1;
    return x > y;
  };
};

// `%TypedArray%.prototype.sort` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.sort
exportTypedArrayMethod('sort', function sort(comparefn) {
  if (comparefn !== undefined) aCallable(comparefn);
  if (STABLE_SORT) return un$Sort(this, comparefn);

  return internalSort(aTypedArray(this), getSortCompare(comparefn));
}, !STABLE_SORT || ACCEPT_INCORRECT_ARGUMENTS);


/***/ }),

/***/ "23cb":
/***/ (function(module, exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__("5926");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "23e7":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var setGlobal = __webpack_require__("ce4e");
var copyConstructorProperties = __webpack_require__("e893");
var isForced = __webpack_require__("94ca");

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
  options.name        - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "241c":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("ca84");
var enumBugKeys = __webpack_require__("7839");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "25a1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $reduceRight = __webpack_require__("d58f").right;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.reduceRicht` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduceright
exportTypedArrayMethod('reduceRight', function reduceRight(callbackfn /* , initialValue */) {
  var length = arguments.length;
  return $reduceRight(aTypedArray(this), callbackfn, length, length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "2626":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__("d066");
var definePropertyModule = __webpack_require__("9bf2");
var wellKnownSymbol = __webpack_require__("b622");
var DESCRIPTORS = __webpack_require__("83ab");

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};


/***/ }),

/***/ "277d":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var isArray = __webpack_require__("e8b5");

// `Array.isArray` method
// https://tc39.es/ecma262/#sec-array.isarray
$({ target: 'Array', stat: true }, {
  isArray: isArray
});


/***/ }),

/***/ "2954":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var typedArraySpeciesConstructor = __webpack_require__("b6b7");
var fails = __webpack_require__("d039");
var arraySlice = __webpack_require__("f36a");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

var FORCED = fails(function () {
  // eslint-disable-next-line es/no-typed-arrays -- required for testing
  new Int8Array(1).slice();
});

// `%TypedArray%.prototype.slice` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.slice
exportTypedArrayMethod('slice', function slice(start, end) {
  var list = arraySlice(aTypedArray(this), start, end);
  var C = typedArraySpeciesConstructor(this);
  var index = 0;
  var length = list.length;
  var result = new C(length);
  while (length > index) result[index] = list[index++];
  return result;
}, FORCED);


/***/ }),

/***/ "2a62":
/***/ (function(module, exports, __webpack_require__) {

var call = __webpack_require__("c65b");
var anObject = __webpack_require__("825a");
var getMethod = __webpack_require__("dc4a");

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);
  try {
    innerResult = getMethod(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};


/***/ }),

/***/ "2ba4":
/***/ (function(module, exports) {

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;

// eslint-disable-next-line es/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (bind ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});


/***/ }),

/***/ "2d00":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var userAgent = __webpack_require__("342f");

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ "3280":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var apply = __webpack_require__("2ba4");
var $lastIndexOf = __webpack_require__("e58c");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.lastIndexOf` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.lastindexof
exportTypedArrayMethod('lastIndexOf', function lastIndexOf(searchElement /* , fromIndex */) {
  var length = arguments.length;
  return apply($lastIndexOf, aTypedArray(this), length > 1 ? [searchElement, arguments[1]] : [searchElement]);
});


/***/ }),

/***/ "342f":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ "35a1":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("f5df");
var getMethod = __webpack_require__("dc4a");
var Iterators = __webpack_require__("3f8c");
var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return getMethod(it, ITERATOR)
    || getMethod(it, '@@iterator')
    || Iterators[classof(it)];
};


/***/ }),

/***/ "37e8":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var definePropertyModule = __webpack_require__("9bf2");
var anObject = __webpack_require__("825a");
var toIndexedObject = __webpack_require__("fc6a");
var objectKeys = __webpack_require__("df75");

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};


/***/ }),

/***/ "3a7b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $findIndex = __webpack_require__("b727").findIndex;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.findIndex` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.findindex
exportTypedArrayMethod('findIndex', function findIndex(predicate /* , thisArg */) {
  return $findIndex(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "3a9b":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ "3bbe":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isCallable = __webpack_require__("1626");

var String = global.String;
var TypeError = global.TypeError;

module.exports = function (argument) {
  if (typeof argument == 'object' || isCallable(argument)) return argument;
  throw TypeError("Can't set " + String(argument) + ' as a prototype');
};


/***/ }),

/***/ "3c35":
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),

/***/ "3c5d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("da84");
var ArrayBufferViewCore = __webpack_require__("ebb5");
var lengthOfArrayLike = __webpack_require__("07fa");
var toOffset = __webpack_require__("182d");
var toObject = __webpack_require__("7b0b");
var fails = __webpack_require__("d039");

var RangeError = global.RangeError;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

var FORCED = fails(function () {
  // eslint-disable-next-line es/no-typed-arrays -- required for testing
  new Int8Array(1).set({});
});

// `%TypedArray%.prototype.set` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.set
exportTypedArrayMethod('set', function set(arrayLike /* , offset */) {
  aTypedArray(this);
  var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
  var length = this.length;
  var src = toObject(arrayLike);
  var len = lengthOfArrayLike(src);
  var index = 0;
  if (len + offset > length) throw RangeError('Wrong length');
  while (index < len) this[offset + index] = src[index++];
}, FORCED);


/***/ }),

/***/ "3ca3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__("6547").charAt;
var toString = __webpack_require__("577e");
var InternalStateModule = __webpack_require__("69f3");
var defineIterator = __webpack_require__("7dd0");

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: toString(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "3f8c":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "3fcc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $map = __webpack_require__("b727").map;
var typedArraySpeciesConstructor = __webpack_require__("b6b7");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.map` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.map
exportTypedArrayMethod('map', function map(mapfn /* , thisArg */) {
  return $map(aTypedArray(this), mapfn, arguments.length > 1 ? arguments[1] : undefined, function (O, length) {
    return new (typedArraySpeciesConstructor(O))(length);
  });
});


/***/ }),

/***/ "408a":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");

// `thisNumberValue` abstract operation
// https://tc39.es/ecma262/#sec-thisnumbervalue
module.exports = uncurryThis(1.0.valueOf);


/***/ }),

/***/ "4160":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var forEach = __webpack_require__("17c2");

// `Array.prototype.forEach` method
// https://tc39.es/ecma262/#sec-array.prototype.foreach
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
$({ target: 'Array', proto: true, forced: [].forEach != forEach }, {
  forEach: forEach
});


/***/ }),

/***/ "428f":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

module.exports = global;


/***/ }),

/***/ "44ad":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var uncurryThis = __webpack_require__("e330");
var fails = __webpack_require__("d039");
var classof = __webpack_require__("c6b6");

var Object = global.Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "44d2":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");
var create = __webpack_require__("7c73");
var definePropertyModule = __webpack_require__("9bf2");

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "4840":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var aConstructor = __webpack_require__("5087");
var wellKnownSymbol = __webpack_require__("b622");

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aConstructor(S);
};


/***/ }),

/***/ "485a":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var call = __webpack_require__("c65b");
var isCallable = __webpack_require__("1626");
var isObject = __webpack_require__("861d");

var TypeError = global.TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "4930":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__("2d00");
var fails = __webpack_require__("d039");

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ "4a9b":
/***/ (function(module, exports, __webpack_require__) {

var createTypedArrayConstructor = __webpack_require__("74e8");

// `Float64Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Float64', function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "4d64":
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__("fc6a");
var toAbsoluteIndex = __webpack_require__("23cb");
var lengthOfArrayLike = __webpack_require__("07fa");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "4de4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $filter = __webpack_require__("b727").filter;
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

// `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "4df4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("da84");
var bind = __webpack_require__("0366");
var call = __webpack_require__("c65b");
var toObject = __webpack_require__("7b0b");
var callWithSafeIterationClosing = __webpack_require__("9bdd");
var isArrayIteratorMethod = __webpack_require__("e95a");
var isConstructor = __webpack_require__("68ee");
var lengthOfArrayLike = __webpack_require__("07fa");
var createProperty = __webpack_require__("8418");
var getIterator = __webpack_require__("9a1f");
var getIteratorMethod = __webpack_require__("35a1");

var Array = global.Array;

// `Array.from` method implementation
// https://tc39.es/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var IS_CONSTRUCTOR = isConstructor(this);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod && !(this == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = getIterator(O, iteratorMethod);
    next = iterator.next;
    result = IS_CONSTRUCTOR ? new this() : [];
    for (;!(step = call(next, iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = lengthOfArrayLike(O);
    result = IS_CONSTRUCTOR ? new this(length) : Array(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};


/***/ }),

/***/ "5087":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isConstructor = __webpack_require__("68ee");
var tryToString = __webpack_require__("0d51");

var TypeError = global.TypeError;

// `Assert: IsConstructor(argument) is true`
module.exports = function (argument) {
  if (isConstructor(argument)) return argument;
  throw TypeError(tryToString(argument) + ' is not a constructor');
};


/***/ }),

/***/ "50c4":
/***/ (function(module, exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__("5926");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "512c":
/***/ (function(module, exports, __webpack_require__) {

var userAgent = __webpack_require__("342f");

var webkit = userAgent.match(/AppleWebKit\/(\d+)\./);

module.exports = !!webkit && +webkit[1];


/***/ }),

/***/ "5692":
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__("c430");
var store = __webpack_require__("c6cd");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.19.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "56ef":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");
var uncurryThis = __webpack_require__("e330");
var getOwnPropertyNamesModule = __webpack_require__("241c");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var anObject = __webpack_require__("825a");

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "577e":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var classof = __webpack_require__("f5df");

var String = global.String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return String(argument);
};


/***/ }),

/***/ "5899":
/***/ (function(module, exports) {

// a string of all valid unicode whitespaces
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "58a8":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");
var requireObjectCoercible = __webpack_require__("1d80");
var toString = __webpack_require__("577e");
var whitespaces = __webpack_require__("5899");

var replace = uncurryThis(''.replace);
var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = toString(requireObjectCoercible($this));
    if (TYPE & 1) string = replace(string, ltrim, '');
    if (TYPE & 2) string = replace(string, rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),

/***/ "5926":
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- safe
  return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
};


/***/ }),

/***/ "59ed":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isCallable = __webpack_require__("1626");
var tryToString = __webpack_require__("0d51");

var TypeError = global.TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ "5c6c":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "5cc6":
/***/ (function(module, exports, __webpack_require__) {

var createTypedArrayConstructor = __webpack_require__("74e8");

// `Uint8Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Uint8', function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "5e77":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var hasOwn = __webpack_require__("1a2d");

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ "5f96":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var uncurryThis = __webpack_require__("e330");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var $join = uncurryThis([].join);

// `%TypedArray%.prototype.join` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.join
exportTypedArrayMethod('join', function join(separator) {
  return $join(aTypedArray(this), separator);
});


/***/ }),

/***/ "60bd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("da84");
var uncurryThis = __webpack_require__("e330");
var PROPER_FUNCTION_NAME = __webpack_require__("5e77").PROPER;
var ArrayBufferViewCore = __webpack_require__("ebb5");
var ArrayIterators = __webpack_require__("e260");
var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');
var Uint8Array = global.Uint8Array;
var arrayValues = uncurryThis(ArrayIterators.values);
var arrayKeys = uncurryThis(ArrayIterators.keys);
var arrayEntries = uncurryThis(ArrayIterators.entries);
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var nativeTypedArrayIterator = Uint8Array && Uint8Array.prototype[ITERATOR];

var PROPER_ARRAY_VALUES_NAME = !!nativeTypedArrayIterator && nativeTypedArrayIterator.name === 'values';

var typedArrayValues = function values() {
  return arrayValues(aTypedArray(this));
};

// `%TypedArray%.prototype.entries` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.entries
exportTypedArrayMethod('entries', function entries() {
  return arrayEntries(aTypedArray(this));
});
// `%TypedArray%.prototype.keys` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.keys
exportTypedArrayMethod('keys', function keys() {
  return arrayKeys(aTypedArray(this));
});
// `%TypedArray%.prototype.values` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.values
exportTypedArrayMethod('values', typedArrayValues, PROPER_FUNCTION_NAME && !PROPER_ARRAY_VALUES_NAME);
// `%TypedArray%.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype-@@iterator
exportTypedArrayMethod(ITERATOR, typedArrayValues, PROPER_FUNCTION_NAME && !PROPER_ARRAY_VALUES_NAME);


/***/ }),

/***/ "6125":
/***/ (function(module, exports, __webpack_require__) {

// A library of seedable RNGs implemented in Javascript.
//
// Usage:
//
// var seedrandom = require('seedrandom');
// var random = seedrandom(1); // or any seed.
// var x = random();       // 0 <= x < 1.  Every bit is random.
// var x = random.quick(); // 0 <= x < 1.  32 bits of randomness.

// alea, a 53-bit multiply-with-carry generator by Johannes Baagøe.
// Period: ~2^116
// Reported to pass all BigCrush tests.
var alea = __webpack_require__("1212");

// xor128, a pure xor-shift generator by George Marsaglia.
// Period: 2^128-1.
// Reported to fail: MatrixRank and LinearComp.
var xor128 = __webpack_require__("b838");

// xorwow, George Marsaglia's 160-bit xor-shift combined plus weyl.
// Period: 2^192-2^32
// Reported to fail: CollisionOver, SimpPoker, and LinearComp.
var xorwow = __webpack_require__("a49e");

// xorshift7, by François Panneton and Pierre L'ecuyer, takes
// a different approach: it adds robustness by allowing more shifts
// than Marsaglia's original three.  It is a 7-shift generator
// with 256 bits, that passes BigCrush with no systmatic failures.
// Period 2^256-1.
// No systematic BigCrush failures reported.
var xorshift7 = __webpack_require__("cae0");

// xor4096, by Richard Brent, is a 4096-bit xor-shift with a
// very long period that also adds a Weyl generator. It also passes
// BigCrush with no systematic failures.  Its long period may
// be useful if you have many generators and need to avoid
// collisions.
// Period: 2^4128-2^32.
// No systematic BigCrush failures reported.
var xor4096 = __webpack_require__("7aec");

// Tyche-i, by Samuel Neves and Filipe Araujo, is a bit-shifting random
// number generator derived from ChaCha, a modern stream cipher.
// https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf
// Period: ~2^127
// No systematic BigCrush failures reported.
var tychei = __webpack_require__("89ed");

// The original ARC4-based prng included in this library.
// Period: ~2^1600
var sr = __webpack_require__("a49d");

sr.alea = alea;
sr.xor128 = xor128;
sr.xorwow = xorwow;
sr.xorshift7 = xorshift7;
sr.xor4096 = xor4096;
sr.tychei = tychei;

module.exports = sr;


/***/ }),

/***/ "621a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("da84");
var uncurryThis = __webpack_require__("e330");
var DESCRIPTORS = __webpack_require__("83ab");
var NATIVE_ARRAY_BUFFER = __webpack_require__("a981");
var FunctionName = __webpack_require__("5e77");
var createNonEnumerableProperty = __webpack_require__("9112");
var redefineAll = __webpack_require__("e2cc");
var fails = __webpack_require__("d039");
var anInstance = __webpack_require__("19aa");
var toIntegerOrInfinity = __webpack_require__("5926");
var toLength = __webpack_require__("50c4");
var toIndex = __webpack_require__("0b25");
var IEEE754 = __webpack_require__("77a7");
var getPrototypeOf = __webpack_require__("e163");
var setPrototypeOf = __webpack_require__("d2bb");
var getOwnPropertyNames = __webpack_require__("241c").f;
var defineProperty = __webpack_require__("9bf2").f;
var arrayFill = __webpack_require__("81d5");
var arraySlice = __webpack_require__("f36a");
var setToStringTag = __webpack_require__("d44e");
var InternalStateModule = __webpack_require__("69f3");

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length';
var WRONG_INDEX = 'Wrong index';
var NativeArrayBuffer = global[ARRAY_BUFFER];
var $ArrayBuffer = NativeArrayBuffer;
var ArrayBufferPrototype = $ArrayBuffer && $ArrayBuffer[PROTOTYPE];
var $DataView = global[DATA_VIEW];
var DataViewPrototype = $DataView && $DataView[PROTOTYPE];
var ObjectPrototype = Object.prototype;
var Array = global.Array;
var RangeError = global.RangeError;
var fill = uncurryThis(arrayFill);
var reverse = uncurryThis([].reverse);

var packIEEE754 = IEEE754.pack;
var unpackIEEE754 = IEEE754.unpack;

var packInt8 = function (number) {
  return [number & 0xFF];
};

var packInt16 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF];
};

var packInt32 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
};

var unpackInt32 = function (buffer) {
  return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
};

var packFloat32 = function (number) {
  return packIEEE754(number, 23, 4);
};

var packFloat64 = function (number) {
  return packIEEE754(number, 52, 8);
};

var addGetter = function (Constructor, key) {
  defineProperty(Constructor[PROTOTYPE], key, { get: function () { return getInternalState(this)[key]; } });
};

var get = function (view, count, index, isLittleEndian) {
  var intIndex = toIndex(index);
  var store = getInternalState(view);
  if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
  var bytes = getInternalState(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = arraySlice(bytes, start, start + count);
  return isLittleEndian ? pack : reverse(pack);
};

var set = function (view, count, index, conversion, value, isLittleEndian) {
  var intIndex = toIndex(index);
  var store = getInternalState(view);
  if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
  var bytes = getInternalState(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = conversion(+value);
  for (var i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
};

if (!NATIVE_ARRAY_BUFFER) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, ArrayBufferPrototype);
    var byteLength = toIndex(length);
    setInternalState(this, {
      bytes: fill(Array(byteLength), 0),
      byteLength: byteLength
    });
    if (!DESCRIPTORS) this.byteLength = byteLength;
  };

  ArrayBufferPrototype = $ArrayBuffer[PROTOTYPE];

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, DataViewPrototype);
    anInstance(buffer, ArrayBufferPrototype);
    var bufferLength = getInternalState(buffer).byteLength;
    var offset = toIntegerOrInfinity(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    setInternalState(this, {
      buffer: buffer,
      byteLength: byteLength,
      byteOffset: offset
    });
    if (!DESCRIPTORS) {
      this.buffer = buffer;
      this.byteLength = byteLength;
      this.byteOffset = offset;
    }
  };

  DataViewPrototype = $DataView[PROTOTYPE];

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, 'byteLength');
    addGetter($DataView, 'buffer');
    addGetter($DataView, 'byteLength');
    addGetter($DataView, 'byteOffset');
  }

  redefineAll(DataViewPrototype, {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined)) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 23);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 52);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : undefined);
    }
  });
} else {
  var INCORRECT_ARRAY_BUFFER_NAME = PROPER_FUNCTION_NAME && NativeArrayBuffer.name !== ARRAY_BUFFER;
  /* eslint-disable no-new -- required for testing */
  if (!fails(function () {
    NativeArrayBuffer(1);
  }) || !fails(function () {
    new NativeArrayBuffer(-1);
  }) || fails(function () {
    new NativeArrayBuffer();
    new NativeArrayBuffer(1.5);
    new NativeArrayBuffer(NaN);
    return INCORRECT_ARRAY_BUFFER_NAME && !CONFIGURABLE_FUNCTION_NAME;
  })) {
  /* eslint-enable no-new -- required for testing */
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, ArrayBufferPrototype);
      return new NativeArrayBuffer(toIndex(length));
    };

    $ArrayBuffer[PROTOTYPE] = ArrayBufferPrototype;

    for (var keys = getOwnPropertyNames(NativeArrayBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) {
        createNonEnumerableProperty($ArrayBuffer, key, NativeArrayBuffer[key]);
      }
    }

    ArrayBufferPrototype.constructor = $ArrayBuffer;
  } else if (INCORRECT_ARRAY_BUFFER_NAME && CONFIGURABLE_FUNCTION_NAME) {
    createNonEnumerableProperty(NativeArrayBuffer, 'name', ARRAY_BUFFER);
  }

  // WebKit bug - the same parent prototype for typed arrays and data view
  if (setPrototypeOf && getPrototypeOf(DataViewPrototype) !== ObjectPrototype) {
    setPrototypeOf(DataViewPrototype, ObjectPrototype);
  }

  // iOS Safari 7.x bug
  var testView = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = uncurryThis(DataViewPrototype.setInt8);
  testView.setInt8(0, 2147483648);
  testView.setInt8(1, 2147483649);
  if (testView.getInt8(0) || !testView.getInt8(1)) redefineAll(DataViewPrototype, {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8(this, byteOffset, value << 24 >> 24);
    }
  }, { unsafe: true });
}

setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);

module.exports = {
  ArrayBuffer: $ArrayBuffer,
  DataView: $DataView
};


/***/ }),

/***/ "62e4":
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "649e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $some = __webpack_require__("b727").some;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.some` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.some
exportTypedArrayMethod('some', function some(callbackfn /* , thisArg */) {
  return $some(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "6547":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");
var toIntegerOrInfinity = __webpack_require__("5926");
var toString = __webpack_require__("577e");
var requireObjectCoercible = __webpack_require__("1d80");

var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var stringSlice = uncurryThis(''.slice);

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString(requireObjectCoercible($this));
    var position = toIntegerOrInfinity(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = charCodeAt(S, position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING
          ? charAt(S, position)
          : first
        : CONVERT_TO_STRING
          ? stringSlice(S, position, position + 2)
          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ "65f0":
/***/ (function(module, exports, __webpack_require__) {

var arraySpeciesConstructor = __webpack_require__("0b42");

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};


/***/ }),

/***/ "68ee":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");
var fails = __webpack_require__("d039");
var isCallable = __webpack_require__("1626");
var classof = __webpack_require__("f5df");
var getBuiltIn = __webpack_require__("d066");
var inspectSource = __webpack_require__("8925");

var noop = function () { /* empty */ };
var empty = [];
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function (argument) {
  if (!isCallable(argument)) return false;
  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function (argument) {
  if (!isCallable(argument)) return false;
  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
    // we can't check .prototype since constructors produced by .bind haven't it
  } return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
};

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
module.exports = !construct || fails(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;


/***/ }),

/***/ "69f3":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__("7f9a");
var global = __webpack_require__("da84");
var uncurryThis = __webpack_require__("e330");
var isObject = __webpack_require__("861d");
var createNonEnumerableProperty = __webpack_require__("9112");
var hasOwn = __webpack_require__("1a2d");
var shared = __webpack_require__("c6cd");
var sharedKey = __webpack_require__("f772");
var hiddenKeys = __webpack_require__("d012");

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = uncurryThis(store.get);
  var wmhas = uncurryThis(store.has);
  var wmset = uncurryThis(store.set);
  set = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget(store, it) || {};
  };
  has = function (it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "6aa9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var define = __webpack_require__("f367");
var getPolyfill = __webpack_require__("bf32");

module.exports = function shimGlobal() {
	var polyfill = getPolyfill();
	if (define.supportsDescriptors) {
		var descriptor = Object.getOwnPropertyDescriptor(polyfill, 'globalThis');
		if (!descriptor || (descriptor.configurable && (descriptor.enumerable || descriptor.writable || globalThis !== polyfill))) { // eslint-disable-line max-len
			Object.defineProperty(polyfill, 'globalThis', {
				configurable: true,
				enumerable: false,
				value: polyfill,
				writable: false
			});
		}
	} else if (typeof globalThis !== 'object' || globalThis !== polyfill) {
		polyfill.globalThis = polyfill;
	}
	return polyfill;
};


/***/ }),

/***/ "6eeb":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isCallable = __webpack_require__("1626");
var hasOwn = __webpack_require__("1a2d");
var createNonEnumerableProperty = __webpack_require__("9112");
var setGlobal = __webpack_require__("ce4e");
var inspectSource = __webpack_require__("8925");
var InternalStateModule = __webpack_require__("69f3");
var CONFIGURABLE_FUNCTION_NAME = __webpack_require__("5e77").CONFIGURABLE;

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var name = options && options.name !== undefined ? options.name : key;
  var state;
  if (isCallable(value)) {
    if (String(name).slice(0, 7) === 'Symbol(') {
      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
    }
    if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
      createNonEnumerableProperty(value, 'name', name);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
    }
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ "7156":
/***/ (function(module, exports, __webpack_require__) {

var isCallable = __webpack_require__("1626");
var isObject = __webpack_require__("861d");
var setPrototypeOf = __webpack_require__("d2bb");

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ "72f7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var exportTypedArrayMethod = __webpack_require__("ebb5").exportTypedArrayMethod;
var fails = __webpack_require__("d039");
var global = __webpack_require__("da84");
var uncurryThis = __webpack_require__("e330");

var Uint8Array = global.Uint8Array;
var Uint8ArrayPrototype = Uint8Array && Uint8Array.prototype || {};
var arrayToString = [].toString;
var join = uncurryThis([].join);

if (fails(function () { arrayToString.call({}); })) {
  arrayToString = function toString() {
    return join(this);
  };
}

var IS_NOT_ARRAY_METHOD = Uint8ArrayPrototype.toString != arrayToString;

// `%TypedArray%.prototype.toString` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.tostring
exportTypedArrayMethod('toString', arrayToString, IS_NOT_ARRAY_METHOD);


/***/ }),

/***/ "735e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var call = __webpack_require__("c65b");
var $fill = __webpack_require__("81d5");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.fill` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.fill
exportTypedArrayMethod('fill', function fill(value /* , start, end */) {
  var length = arguments.length;
  return call(
    $fill,
    aTypedArray(this),
    value,
    length > 1 ? arguments[1] : undefined,
    length > 2 ? arguments[2] : undefined
  );
});


/***/ }),

/***/ "7418":
/***/ (function(module, exports) {

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "746f":
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__("428f");
var hasOwn = __webpack_require__("1a2d");
var wrappedWellKnownSymbolModule = __webpack_require__("e538");
var defineProperty = __webpack_require__("9bf2").f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!hasOwn(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};


/***/ }),

/***/ "74e8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var call = __webpack_require__("c65b");
var DESCRIPTORS = __webpack_require__("83ab");
var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = __webpack_require__("8aa7");
var ArrayBufferViewCore = __webpack_require__("ebb5");
var ArrayBufferModule = __webpack_require__("621a");
var anInstance = __webpack_require__("19aa");
var createPropertyDescriptor = __webpack_require__("5c6c");
var createNonEnumerableProperty = __webpack_require__("9112");
var isIntegralNumber = __webpack_require__("eac5");
var toLength = __webpack_require__("50c4");
var toIndex = __webpack_require__("0b25");
var toOffset = __webpack_require__("182d");
var toPropertyKey = __webpack_require__("a04b");
var hasOwn = __webpack_require__("1a2d");
var classof = __webpack_require__("f5df");
var isObject = __webpack_require__("861d");
var isSymbol = __webpack_require__("d9b5");
var create = __webpack_require__("7c73");
var isPrototypeOf = __webpack_require__("3a9b");
var setPrototypeOf = __webpack_require__("d2bb");
var getOwnPropertyNames = __webpack_require__("241c").f;
var typedArrayFrom = __webpack_require__("a078");
var forEach = __webpack_require__("b727").forEach;
var setSpecies = __webpack_require__("2626");
var definePropertyModule = __webpack_require__("9bf2");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var InternalStateModule = __webpack_require__("69f3");
var inheritIfRequired = __webpack_require__("7156");

var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var round = Math.round;
var RangeError = global.RangeError;
var ArrayBuffer = ArrayBufferModule.ArrayBuffer;
var ArrayBufferPrototype = ArrayBuffer.prototype;
var DataView = ArrayBufferModule.DataView;
var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
var TYPED_ARRAY_CONSTRUCTOR = ArrayBufferViewCore.TYPED_ARRAY_CONSTRUCTOR;
var TYPED_ARRAY_TAG = ArrayBufferViewCore.TYPED_ARRAY_TAG;
var TypedArray = ArrayBufferViewCore.TypedArray;
var TypedArrayPrototype = ArrayBufferViewCore.TypedArrayPrototype;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var isTypedArray = ArrayBufferViewCore.isTypedArray;
var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
var WRONG_LENGTH = 'Wrong length';

var fromList = function (C, list) {
  aTypedArrayConstructor(C);
  var index = 0;
  var length = list.length;
  var result = new C(length);
  while (length > index) result[index] = list[index++];
  return result;
};

var addGetter = function (it, key) {
  nativeDefineProperty(it, key, { get: function () {
    return getInternalState(this)[key];
  } });
};

var isArrayBuffer = function (it) {
  var klass;
  return isPrototypeOf(ArrayBufferPrototype, it) || (klass = classof(it)) == 'ArrayBuffer' || klass == 'SharedArrayBuffer';
};

var isTypedArrayIndex = function (target, key) {
  return isTypedArray(target)
    && !isSymbol(key)
    && key in target
    && isIntegralNumber(+key)
    && key >= 0;
};

var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
  key = toPropertyKey(key);
  return isTypedArrayIndex(target, key)
    ? createPropertyDescriptor(2, target[key])
    : nativeGetOwnPropertyDescriptor(target, key);
};

var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
  key = toPropertyKey(key);
  if (isTypedArrayIndex(target, key)
    && isObject(descriptor)
    && hasOwn(descriptor, 'value')
    && !hasOwn(descriptor, 'get')
    && !hasOwn(descriptor, 'set')
    // TODO: add validation descriptor w/o calling accessors
    && !descriptor.configurable
    && (!hasOwn(descriptor, 'writable') || descriptor.writable)
    && (!hasOwn(descriptor, 'enumerable') || descriptor.enumerable)
  ) {
    target[key] = descriptor.value;
    return target;
  } return nativeDefineProperty(target, key, descriptor);
};

if (DESCRIPTORS) {
  if (!NATIVE_ARRAY_BUFFER_VIEWS) {
    getOwnPropertyDescriptorModule.f = wrappedGetOwnPropertyDescriptor;
    definePropertyModule.f = wrappedDefineProperty;
    addGetter(TypedArrayPrototype, 'buffer');
    addGetter(TypedArrayPrototype, 'byteOffset');
    addGetter(TypedArrayPrototype, 'byteLength');
    addGetter(TypedArrayPrototype, 'length');
  }

  $({ target: 'Object', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
    getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
    defineProperty: wrappedDefineProperty
  });

  module.exports = function (TYPE, wrapper, CLAMPED) {
    var BYTES = TYPE.match(/\d+$/)[0] / 8;
    var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + TYPE;
    var SETTER = 'set' + TYPE;
    var NativeTypedArrayConstructor = global[CONSTRUCTOR_NAME];
    var TypedArrayConstructor = NativeTypedArrayConstructor;
    var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
    var exported = {};

    var getter = function (that, index) {
      var data = getInternalState(that);
      return data.view[GETTER](index * BYTES + data.byteOffset, true);
    };

    var setter = function (that, index, value) {
      var data = getInternalState(that);
      if (CLAMPED) value = (value = round(value)) < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
      data.view[SETTER](index * BYTES + data.byteOffset, value, true);
    };

    var addElement = function (that, index) {
      nativeDefineProperty(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };

    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
      TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
        anInstance(that, TypedArrayConstructorPrototype);
        var index = 0;
        var byteOffset = 0;
        var buffer, byteLength, length;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new ArrayBuffer(byteLength);
        } else if (isArrayBuffer(data)) {
          buffer = data;
          byteOffset = toOffset(offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - byteOffset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + byteOffset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (isTypedArray(data)) {
          return fromList(TypedArrayConstructor, data);
        } else {
          return call(typedArrayFrom, TypedArrayConstructor, data);
        }
        setInternalState(that, {
          buffer: buffer,
          byteOffset: byteOffset,
          byteLength: byteLength,
          length: length,
          view: new DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });

      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = create(TypedArrayPrototype);
    } else if (TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS) {
      TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
        anInstance(dummy, TypedArrayConstructorPrototype);
        return inheritIfRequired(function () {
          if (!isObject(data)) return new NativeTypedArrayConstructor(toIndex(data));
          if (isArrayBuffer(data)) return $length !== undefined
            ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES), $length)
            : typedArrayOffset !== undefined
              ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES))
              : new NativeTypedArrayConstructor(data);
          if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
          return call(typedArrayFrom, TypedArrayConstructor, data);
        }(), dummy, TypedArrayConstructor);
      });

      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      forEach(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
        if (!(key in TypedArrayConstructor)) {
          createNonEnumerableProperty(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
        }
      });
      TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
    }

    if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
    }

    createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_CONSTRUCTOR, TypedArrayConstructor);

    if (TYPED_ARRAY_TAG) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
    }

    exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;

    $({
      global: true, forced: TypedArrayConstructor != NativeTypedArrayConstructor, sham: !NATIVE_ARRAY_BUFFER_VIEWS
    }, exported);

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
      createNonEnumerableProperty(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
    }

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
    }

    setSpecies(CONSTRUCTOR_NAME);
  };
} else module.exports = function () { /* empty */ };


/***/ }),

/***/ "77a7":
/***/ (function(module, exports, __webpack_require__) {

// IEEE754 conversions based on https://github.com/feross/ieee754
var global = __webpack_require__("da84");

var Array = global.Array;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;

var pack = function (number, mantissaLength, bytes) {
  var buffer = Array(bytes);
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var rt = mantissaLength === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
  var index = 0;
  var exponent, mantissa, c;
  number = abs(number);
  // eslint-disable-next-line no-self-compare -- NaN check
  if (number != number || number === Infinity) {
    // eslint-disable-next-line no-self-compare -- NaN check
    mantissa = number != number ? 1 : 0;
    exponent = eMax;
  } else {
    exponent = floor(log(number) / LN2);
    if (number * (c = pow(2, -exponent)) < 1) {
      exponent--;
      c *= 2;
    }
    if (exponent + eBias >= 1) {
      number += rt / c;
    } else {
      number += rt * pow(2, 1 - eBias);
    }
    if (number * c >= 2) {
      exponent++;
      c /= 2;
    }
    if (exponent + eBias >= eMax) {
      mantissa = 0;
      exponent = eMax;
    } else if (exponent + eBias >= 1) {
      mantissa = (number * c - 1) * pow(2, mantissaLength);
      exponent = exponent + eBias;
    } else {
      mantissa = number * pow(2, eBias - 1) * pow(2, mantissaLength);
      exponent = 0;
    }
  }
  for (; mantissaLength >= 8; buffer[index++] = mantissa & 255, mantissa /= 256, mantissaLength -= 8);
  exponent = exponent << mantissaLength | mantissa;
  exponentLength += mantissaLength;
  for (; exponentLength > 0; buffer[index++] = exponent & 255, exponent /= 256, exponentLength -= 8);
  buffer[--index] |= sign * 128;
  return buffer;
};

var unpack = function (buffer, mantissaLength) {
  var bytes = buffer.length;
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var nBits = exponentLength - 7;
  var index = bytes - 1;
  var sign = buffer[index--];
  var exponent = sign & 127;
  var mantissa;
  sign >>= 7;
  for (; nBits > 0; exponent = exponent * 256 + buffer[index], index--, nBits -= 8);
  mantissa = exponent & (1 << -nBits) - 1;
  exponent >>= -nBits;
  nBits += mantissaLength;
  for (; nBits > 0; mantissa = mantissa * 256 + buffer[index], index--, nBits -= 8);
  if (exponent === 0) {
    exponent = 1 - eBias;
  } else if (exponent === eMax) {
    return mantissa ? NaN : sign ? -Infinity : Infinity;
  } else {
    mantissa = mantissa + pow(2, mantissaLength);
    exponent = exponent - eBias;
  } return (sign ? -1 : 1) * mantissa * pow(2, exponent - mantissaLength);
};

module.exports = {
  pack: pack,
  unpack: unpack
};


/***/ }),

/***/ "7839":
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "785a":
/***/ (function(module, exports, __webpack_require__) {

// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
var documentCreateElement = __webpack_require__("cc12");

var classList = documentCreateElement('span').classList;
var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;

module.exports = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;


/***/ }),

/***/ "78bd":
/***/ (function(module) {

module.exports = JSON.parse("[{\"Name\":\"KAAMS\",\"IndexedColors\":[1,1,1,1,0,0,0,1,0,0,0,1,1,1,0,1,0,1,0,1,1,0.63,0.63,1,0.67,0.5,0.33,1,0.5,0.75,0.53,0.35,0.7,1,0.75,0.5],\"Annotations\":[0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11]},{\"ColorSpace\":\"Diverging\",\"Name\":\"Cool to Warm\",\"NanColor\":[1,1,0],\"RGBPoints\":[0,0.23137254902,0.298039215686,0.752941176471,0.5,0.865,0.865,0.865,1,0.705882352941,0.0156862745098,0.149019607843]},{\"ColorSpace\":\"Lab\",\"Creator\":\"Francesca Samsel\",\"Name\":\"Cool to Warm (Extended)\",\"NanColor\":[0.25,0,0],\"RGBPoints\":[0,0,0,0.34902,0.03125,0.039216,0.062745,0.380392,0.0625,0.062745,0.117647,0.411765,0.09375,0.090196,0.184314,0.45098,0.125,0.12549,0.262745,0.501961,0.15625,0.160784,0.337255,0.541176,0.1875,0.2,0.396078,0.568627,0.21875,0.239216,0.454902,0.6,0.25,0.286275,0.521569,0.65098,0.28125,0.337255,0.592157,0.701961,0.3125,0.388235,0.654902,0.74902,0.34375,0.466667,0.737255,0.819608,0.375,0.572549,0.819608,0.878431,0.40625,0.654902,0.866667,0.909804,0.4375,0.752941,0.917647,0.941176,0.46875,0.823529,0.956863,0.968627,0.5,0.988235,0.960784,0.901961,0.5,0.941176,0.984314,0.988235,0.52,0.988235,0.945098,0.85098,0.54,0.980392,0.898039,0.784314,0.5625,0.968627,0.835294,0.698039,0.59375,0.94902,0.733333,0.588235,0.625,0.929412,0.65098,0.509804,0.65625,0.909804,0.564706,0.435294,0.6875,0.878431,0.458824,0.352941,0.71875,0.839216,0.388235,0.286275,0.75,0.760784,0.294118,0.211765,0.78125,0.701961,0.211765,0.168627,0.8125,0.65098,0.156863,0.129412,0.84375,0.6,0.094118,0.094118,0.875,0.54902,0.066667,0.098039,0.90625,0.501961,0.05098,0.12549,0.9375,0.45098,0.054902,0.172549,0.96875,0.4,0.054902,0.192157,1,0.34902,0.070588,0.211765]},{\"ColorSpace\":\"Diverging\",\"Name\":\"Warm to Cool\",\"NanColor\":[1,1,0],\"RGBPoints\":[0,0.705882352941,0.0156862745098,0.149019607843,0.5,0.865,0.865,0.865,1,0.23137254902,0.298039215686,0.752941176471]},{\"ColorSpace\":\"Lab\",\"Creator\":\"Francesca Samsel\",\"Name\":\"Warm to Cool (Extended)\",\"NanColor\":[0.250004,0,0],\"RGBPoints\":[0,0.34902,0,0.129412,0.025,0.4,0.00392157,0.101961,0.05,0.470588,0.0156863,0.0901961,0.075,0.54902,0.027451,0.0705882,0.1,0.619608,0.0627451,0.0431373,0.125,0.690196,0.12549,0.0627451,0.15,0.741176,0.184314,0.0745098,0.175,0.788235,0.266667,0.0941176,0.2,0.811765,0.345098,0.113725,0.225,0.831373,0.411765,0.133333,0.25,0.85098,0.47451,0.145098,0.275,0.870588,0.54902,0.156863,0.3,0.878431,0.619608,0.168627,0.325,0.890196,0.658824,0.196078,0.35,0.909804,0.717647,0.235294,0.375,0.929412,0.776471,0.278431,0.395522,0.94902,0.823529,0.321569,0.418905,0.968627,0.87451,0.407843,0.444278,0.980392,0.917647,0.509804,0.470149,0.988235,0.956863,0.643137,0.483582,0.992157,0.964706,0.713725,0.499,0.988235,0.980392,0.870588,0.5,1,1,1,0.501,0.913725,0.988235,0.937255,0.516418,0.827451,0.980392,0.886275,0.531343,0.764706,0.980392,0.866667,0.546766,0.658824,0.980392,0.843137,0.564179,0.572549,0.964706,0.835294,0.587562,0.423529,0.941176,0.87451,0.60597,0.262745,0.901961,0.862745,0.629851,0.0705882,0.854902,0.870588,0.651741,0.0509804,0.8,0.85098,0.681592,0.0235294,0.709804,0.831373,0.712935,0.0313725,0.615686,0.811765,0.75,0.0313725,0.537255,0.788235,0.775,0.0392157,0.466667,0.768627,0.8,0.0509804,0.396078,0.741176,0.825,0.054902,0.317647,0.709804,0.85,0.054902,0.243137,0.678431,0.875,0.0431373,0.164706,0.639216,0.9,0.0313725,0.0980392,0.6,0.925,0.0392157,0.0392157,0.560784,0.95,0.105882,0.0509804,0.509804,0.975,0.113725,0.0235294,0.45098,1,0.12549,0,0.380392]},{\"ColorSpace\":\"RGB\",\"Name\":\"Rainbow Desaturated\",\"NanColor\":[1,1,0],\"RGBPoints\":[0,0.278431372549,0.278431372549,0.858823529412,0.143,0,0,0.360784313725,0.285,0,1,1,0.429,0,0.501960784314,0,0.571,1,1,0,0.714,1,0.380392156863,0,0.857,0.419607843137,0,0,1,0.878431372549,0.301960784314,0.301960784314]},{\"ColorSpace\":\"RGB\",\"Name\":\"Cold and Hot\",\"NanColor\":[1,1,0],\"RGBPoints\":[0,0,1,1,0.45,0,0,1,0.5,0,0,0.501960784314,0.55,1,0,0,1,1,1,0]},{\"ColorSpace\":\"RGB\",\"Name\":\"Black-Body Radiation\",\"NanColor\":[0,0.498039215686,1],\"RGBPoints\":[0,0,0,0,0.4,0.901960784314,0,0,0.8,0.901960784314,0.901960784314,0,1,1,1,1]},{\"ColorSpace\":\"RGB\",\"Name\":\"X Ray\",\"NanColor\":[1,0,0],\"RGBPoints\":[0,1,1,1,1,0,0,0]},{\"ColorSpace\":\"RGB\",\"Name\":\"Grayscale\",\"NanColor\":[1,0,0],\"RGBPoints\":[0,0,0,0,1,1,1,1]},{\"ColorSpace\":\"RGB\",\"Name\":\"BkRd\",\"NanColor\":[0,1,1],\"RGBPoints\":[0,0,0,0,1,1,0,0]},{\"ColorSpace\":\"RGB\",\"Name\":\"BkGn\",\"NanColor\":[1,0,1],\"RGBPoints\":[0,0,0,0,1,0,1,0]},{\"ColorSpace\":\"RGB\",\"Name\":\"BkBu\",\"NanColor\":[1,1,0],\"RGBPoints\":[0,0,0,0,1,0,0,1]},{\"ColorSpace\":\"RGB\",\"Name\":\"BkMa\",\"NanColor\":[0,1,0],\"RGBPoints\":[0,0,0,0,1,1,0,1]},{\"ColorSpace\":\"RGB\",\"Name\":\"BkCy\",\"NanColor\":[0,1,1],\"RGBPoints\":[0,0,0,0,1,0,1,1]},{\"ColorSpace\":\"RGB\",\"Name\":\"Black, Blue and White\",\"NanColor\":[1,1,0],\"RGBPoints\":[0,0,0,0,0.333,0,0,0.501960784314,0.666,0,0.501960784314,1,1,1,1,1]},{\"ColorSpace\":\"RGB\",\"Name\":\"Black, Orange and White\",\"NanColor\":[1,1,0],\"RGBPoints\":[0,0,0,0,0.333,0.501960784314,0,0,0.666,1,0.501960784314,0,1,1,1,1]},{\"ColorSpace\":\"Lab\",\"Creator\":\"Francesca Samsel\",\"Name\":\"Linear YGB 1211g\",\"NanColor\":[0.25,0,0],\"RGBPoints\":[0,1,0.988235,0.968627,0.02,1,0.952941,0.878431,0.05,0.968627,0.905882,0.776471,0.1,0.94902,0.898039,0.647059,0.15,0.901961,0.878431,0.556863,0.2,0.847059,0.858824,0.482353,0.25,0.690196,0.819608,0.435294,0.3,0.513725,0.768627,0.384314,0.35,0.337255,0.721569,0.337255,0.4,0.278431,0.658824,0.392157,0.45,0.231373,0.639216,0.435294,0.5,0.203922,0.6,0.486275,0.55,0.172549,0.568627,0.537255,0.6,0.141176,0.517647,0.54902,0.65,0.133333,0.458824,0.541176,0.7,0.12549,0.396078,0.529412,0.75,0.117647,0.321569,0.521569,0.8,0.121569,0.258824,0.509804,0.85,0.133333,0.227451,0.501961,0.9,0.145098,0.192157,0.490196,0.95,0.188235,0.164706,0.470588,1,0.258824,0.196078,0.439216]},{\"ColorSpace\":\"CIELAB\",\"Creator\":\"Francesca Samsel\",\"Name\":\"Linear Green (Gr4L)\",\"NanColor\":[0.25,0,0],\"RGBPoints\":[0,0.054902,0.109804,0.121569,0.05,0.07451,0.172549,0.180392,0.1,0.086275,0.231373,0.219608,0.15,0.094118,0.278431,0.25098,0.2,0.109804,0.34902,0.278431,0.25,0.113725,0.4,0.278431,0.3,0.117647,0.45098,0.270588,0.35,0.117647,0.490196,0.243137,0.4,0.113725,0.521569,0.203922,0.45,0.109804,0.54902,0.152941,0.5,0.082353,0.588235,0.082353,0.55,0.109804,0.631373,0.05098,0.6,0.211765,0.678431,0.082353,0.65,0.317647,0.721569,0.113725,0.7,0.431373,0.760784,0.160784,0.75,0.556863,0.8,0.239216,0.8,0.666667,0.839216,0.294118,0.85,0.784314,0.878431,0.396078,0.9,0.886275,0.921569,0.533333,0.95,0.960784,0.94902,0.670588,1,1,0.984314,0.901961]},{\"ColorSpace\":\"Lab\",\"Creator\":\"Francesca Samsel\",\"Name\":\"Linear Blue (8_31f)\",\"NanColor\":[0.25,0,0],\"RGBPoints\":[0,0.960784,1,0.980392,0.05,0.815686,0.960784,0.913725,0.1,0.670588,0.929412,0.870588,0.15,0.556863,0.901961,0.843137,0.2,0.478431,0.870588,0.823529,0.25,0.439216,0.831373,0.803922,0.3,0.4,0.8,0.788235,0.35,0.376471,0.768627,0.768627,0.4,0.34902,0.709804,0.729412,0.45,0.32549,0.654902,0.690196,0.5,0.301961,0.607843,0.658824,0.55,0.247059,0.545098,0.619608,0.6,0.239216,0.494118,0.580392,0.65,0.227451,0.439216,0.541176,0.7,0.227451,0.403922,0.521569,0.75,0.231373,0.368627,0.501961,0.8,0.227451,0.321569,0.470588,0.85,0.219608,0.282353,0.439216,0.9,0.192157,0.235294,0.4,0.95,0.160784,0.184314,0.34902,1,0.133333,0.12549,0.301961]},{\"ColorSpace\":\"HSV\",\"Name\":\"Blue to Red Rainbow\",\"NanColor\":[0.498039215686,0.498039215686,0.498039215686],\"RGBPoints\":[0,0,0,1,1,1,0,0]},{\"ColorSpace\":\"HSV\",\"Name\":\"Red to Blue Rainbow\",\"NanColor\":[0.498039215686,0.498039215686,0.498039215686],\"RGBPoints\":[0,1,0,0,1,0,0,1]},{\"ColorSpace\":\"RGB\",\"Name\":\"Rainbow Blended White\",\"NanColor\":[1,1,0],\"RGBPoints\":[0,1,1,1,0.17,0,0,1,0.34,0,1,1,0.5,0,1,0,0.67,1,1,0,0.84,1,0,0,1,0.878431372549,0,1]},{\"ColorSpace\":\"RGB\",\"Name\":\"Rainbow Blended Grey\",\"NanColor\":[1,1,0],\"RGBPoints\":[0,0.317647058824,0.341176470588,0.43137254902,0.17,0,0,1,0.34,0,1,1,0.5,0,1,0,0.67,1,1,0,0.84,1,0,0,1,0.878431372549,0,1]},{\"ColorSpace\":\"RGB\",\"Name\":\"Rainbow Blended Black\",\"NanColor\":[1,1,0],\"RGBPoints\":[0,0,0,0,0.17,0,0,1,0.34,0,1,1,0.5,0,1,0,0.67,1,1,0,0.84,1,0,0,1,0.878431372549,0,1]},{\"ColorSpace\":\"RGB\",\"Name\":\"Blue to Yellow\",\"NanColor\":[1,0,0],\"RGBPoints\":[0,0.0392156862745,0.0392156862745,0.949019607843,1,0.949019607843,0.949019607843,0.0392156862745]},{\"ColorSpace\":\"HSV\",\"Name\":\"blot\",\"RGBPoints\":[0,0,0,1,0.166,0,0,1,0.167,1,0,1,0.332,1,0,1,0.333,0,1,1,0.5,0,1,1,0.501,0,1,0,0.666,0,1,0,0.667,1,1,0,0.832,1,1,0,0.833,1,0,0,1,1,0,0]},{\"ColorSpace\":\"Lab\",\"Name\":\"CIELab Blue to Red\",\"NanColor\":[1,1,0],\"RGBPoints\":[0,0,0.6,0.749019607843,1,0.76862745098,0.466666666667,0.341176470588]},{\"ColorSpace\":\"RGB\",\"Name\":\"jet\",\"RGBPoints\":[-1,0,0,0.5625,-0.777778,0,0,1,-0.269841,0,1,1,-0.015873,0.5,1,0.5,0.238095,1,1,0,0.746032,1,0,0,1,0.5,0,0]},{\"ColorSpace\":\"RGB\",\"Name\":\"rainbow\",\"RGBPoints\":[-1,0,0,1,-0.5,0,1,1,0,0,1,0,0.5,1,1,0,1,1,0,0]},{\"ColorSpace\":\"Lab\",\"Name\":\"erdc_rainbow_bright\",\"RGBPoints\":[-1,0.32549,0.14902,0.960784,-0.866221,0.297047,0.375586,0.963836,-0.732441,0.180302,0.536818,0.964627,-0.598662,0.1302,0.649207,0.929647,-0.464883,0.0445143,0.749654,0.855998,-0.331104,0.0271325,0.830713,0.721527,-0.197324,0.259504,0.866145,0.543555,-0.0635452,0.428364,0.890725,0.329819,0.0702341,0.568503,0.898508,0.187623,0.204013,0.738259,0.890317,0.0825461,0.337793,0.84546,0.86136,0.0147555,0.471572,0.912191,0.808018,0,0.605351,0.962848,0.710445,0,0.73913,0.999469,0.600258,0.0176284,0.87291,0.994156,0.445975,0.193912,1,0.980407,0.247105,0.262699]},{\"ColorSpace\":\"Lab\",\"Name\":\"erdc_rainbow_dark\",\"RGBPoints\":[-1,0,0,0.423499,-0.866221,0,0.119346,0.529237,-0.732441,0,0.238691,0.634976,-0.598662,0,0.346852,0.68788,-0.464883,0,0.45022,0.718141,-0.331104,0,0.553554,0.664839,-0.197324,0,0.651082,0.519303,-0.0635452,0.115841,0.72479,0.352857,0.0702341,0.326771,0.781195,0.140187,0.204013,0.522765,0.798524,0.0284624,0.337793,0.703162,0.788685,0.00885756,0.471572,0.845118,0.751133,0,0.605351,0.955734,0.690825,0,0.73913,0.995402,0.567916,0.0618524,0.87291,0.987712,0.403398,0.164851,1,0.980407,0.247105,0.262699]},{\"ColorSpace\":\"Lab\",\"Name\":\"nic_CubicL\",\"RGBPoints\":[-1,0.479965,0.0118108,0.5307,-0.87451,0.522213,0.0551282,0.706919,-0.74902,0.50839,0.237278,0.867764,-0.623529,0.451617,0.373834,0.987255,-0.498039,0.39365,0.497255,0.97506,-0.372549,0.328631,0.599639,0.891843,-0.247059,0.250043,0.690286,0.778553,-0.121569,0.249656,0.764905,0.645857,0.00392157,0.297954,0.821466,0.50449,0.129412,0.337509,0.872595,0.358447,0.254902,0.430011,0.913789,0.297079,0.380392,0.587191,0.931381,0.333353,0.505882,0.727937,0.93591,0.353742,0.631373,0.826403,0.921081,0.365066,0.756863,0.893201,0.846317,0.372662,0.882353,0.965347,0.73884,0.378506,1,0.983235,0.597451,0.366856]},{\"ColorSpace\":\"Lab\",\"Name\":\"nic_CubicYF\",\"RGBPoints\":[-1,0.5151,0.0482,0.6697,-0.87451,0.520711,0.168955,0.800574,-0.74902,0.493694,0.278596,0.911824,-0.623529,0.440026,0.369475,0.984978,-0.498039,0.398932,0.457593,0.987053,-0.372549,0.350651,0.540644,0.929608,-0.247059,0.298827,0.615625,0.857729,-0.121569,0.239928,0.685061,0.769531,0.00392157,0.228832,0.739349,0.673287,0.129412,0.263297,0.78608,0.569988,0.254902,0.298107,0.828337,0.460214,0.380392,0.33092,0.864071,0.352674,0.505882,0.38306,0.898169,0.287309,0.631373,0.49023,0.917481,0.307961,0.756863,0.62372,0.926026,0.332309,0.882353,0.717458,0.92527,0.342476,1,0.8,0.9255,0.3529]},{\"ColorSpace\":\"Lab\",\"Name\":\"gist_earth\",\"RGBPoints\":[-1,0,0,0,-0.87451,0.239216,0.027451,0.415686,-0.74902,0.0901961,0.254902,0.556863,-0.623529,0.0941176,0.352941,0.54902,-0.498039,0.105882,0.435294,0.533333,-0.372549,0.12549,0.52549,0.501961,-0.247059,0.156863,0.596078,0.443137,-0.121569,0.196078,0.65098,0.380392,0.00392157,0.282353,0.717647,0.301961,0.129412,0.466667,0.772549,0.27451,0.254902,0.678431,0.784314,0.309804,0.380392,0.901961,0.756863,0.376471,0.505882,0.992157,0.705882,0.521569,0.631373,1,0.721569,0.701961,0.756863,1,0.784314,0.784314,0.882353,1,0.866667,0.866667,1,1,1,1]},{\"ColorSpace\":\"Lab\",\"Name\":\"2hot\",\"RGBPoints\":[-1,0.0416667,0,0,-0.873016,0.208333,0,0,-0.746032,0.375,0,0,-0.619048,0.541667,0,0,-0.492063,0.708333,0,0,-0.365079,0.854137,0,0,-0.238095,0.937488,0.039062,0,-0.111111,1,0.208333,0,0.015873,1,0.375,0,0.142857,1,0.541667,0,0.269841,1,0.708333,0,0.396825,1,0.858805,0.03125,0.52381,1,0.947392,0.15625,0.650794,1,1,0.3125,0.777778,1,1,0.5625,0.904762,1,1,0.8125,1,1,1,1]},{\"ColorSpace\":\"Lab\",\"Name\":\"erdc_red2yellow_BW\",\"RGBPoints\":[-1,7.54296e-7,0,0.0000109827,-0.87451,0.18285,0.0264094,0,-0.74902,0.3066,0,0,-0.623529,0.422841,0,0,-0.498039,0.522945,0,0,-0.372549,0.605721,0,0,-0.247059,0.672502,0.14168,0,-0.121569,0.728167,0.244025,0,0.00392157,0.781215,0.333454,0,0.129412,0.825,0.423586,0,0.254902,0.855893,0.516793,0,0.380392,0.880491,0.608846,0,0.505882,0.910305,0.695505,0,0.631373,0.94109,0.779067,0.223528,0.756863,0.967873,0.858572,0.473521,0.882353,0.986815,0.933211,0.751583,1,1,1,0.999997]},{\"ColorSpace\":\"Lab\",\"Name\":\"erdc_marine2gold_BW\",\"RGBPoints\":[-1,1.11641e-7,0,0.00000162551,-0.87451,0.0413146,0.0619808,0.209857,-0.74902,0.0185557,0.101341,0.350684,-0.623529,0.00486405,0.149847,0.461054,-0.498039,0.0836345,0.210845,0.517906,-0.372549,0.173222,0.276134,0.541793,-0.247059,0.259857,0.343877,0.535869,-0.121569,0.362299,0.408124,0.504293,0.00392157,0.468266,0.468276,0.468257,0.129412,0.582781,0.527545,0.374914,0.254902,0.691591,0.585251,0.274266,0.380392,0.784454,0.645091,0.247332,0.505882,0.862299,0.710383,0.27518,0.631373,0.920863,0.782923,0.351563,0.756863,0.955792,0.859699,0.533541,0.882353,0.976162,0.93433,0.780671,1,1,1,0.999983]},{\"ColorSpace\":\"Lab\",\"Name\":\"erdc_blue2gold_BW\",\"RGBPoints\":[-1,0,0,0,-0.87451,0.0742735,0.0440331,0.230013,-0.74902,0.125276,0.0258685,0.415826,-0.623529,0.143879,0.0163031,0.591346,-0.498039,0.212261,0.0627855,0.705239,-0.372549,0.306048,0.141178,0.763636,-0.247059,0.391537,0.232286,0.773263,-0.121569,0.461734,0.336633,0.708321,0.00392157,0.54209,0.427581,0.590007,0.129412,0.61704,0.508623,0.460978,0.254902,0.702703,0.579586,0.309117,0.380392,0.790336,0.644811,0.170397,0.505882,0.870173,0.710733,0.117134,0.631373,0.93656,0.781991,0.157144,0.756863,0.965672,0.862068,0.409836,0.882353,0.985751,0.936296,0.714162,1,1,1,0.999999]},{\"ColorSpace\":\"Lab\",\"Name\":\"erdc_sapphire2gold_BW\",\"RGBPoints\":[-1,0.107704,0.107708,0.107694,-0.87451,0.1851,0.112354,0.308554,-0.74902,0.236782,0.114233,0.48788,-0.623529,0.28296,0.126187,0.639464,-0.498039,0.344787,0.171643,0.739713,-0.372549,0.413325,0.242371,0.76913,-0.247059,0.481863,0.3131,0.719841,-0.121569,0.550402,0.383829,0.612222,0.00392157,0.61894,0.454558,0.51126,0.129412,0.687478,0.525287,0.39993,0.254902,0.756017,0.596016,0.289923,0.380392,0.824555,0.666745,0.255498,0.505882,0.892979,0.736822,0.27696,0.631373,0.938851,0.804966,0.351734,0.756863,0.966491,0.874853,0.53572,0.882353,0.982105,0.94153,0.782579,1,1,1,0.999986]},{\"ColorSpace\":\"Lab\",\"Name\":\"erdc_red2purple_BW\",\"RGBPoints\":[-1,0,0,0,-0.87451,0.167793,0.0166271,0.0431278,-0.74902,0.262608,0.0107595,0.0791181,-0.623529,0.351902,0.0101858,0.100926,-0.498039,0.441257,0.0160835,0.131919,-0.372549,0.5221,0.0555972,0.195625,-0.247059,0.593852,0.104294,0.310234,-0.121569,0.654628,0.158115,0.448486,0.00392157,0.707443,0.220914,0.570253,0.129412,0.749504,0.293268,0.67897,0.254902,0.781587,0.370517,0.779269,0.380392,0.809951,0.451099,0.855831,0.505882,0.84424,0.531462,0.900451,0.631373,0.865174,0.620901,0.91606,0.756863,0.875041,0.714054,0.910284,0.882353,0.880764,0.80554,0.896276,1,0.887572,0.887591,0.887556]},{\"ColorSpace\":\"Lab\",\"Name\":\"erdc_purple2pink_BW\",\"RGBPoints\":[-1,0,0,0,-0.87451,0.117562,0.0291202,0.175876,-0.74902,0.178368,0.0458476,0.285454,-0.623529,0.237731,0.0680173,0.387717,-0.498039,0.300877,0.0956291,0.484802,-0.372549,0.370929,0.136858,0.554985,-0.247059,0.449033,0.189273,0.58863,-0.121569,0.529971,0.245796,0.598587,0.00392157,0.609914,0.300643,0.610244,0.129412,0.697079,0.351286,0.616371,0.254902,0.785858,0.401991,0.617376,0.380392,0.862517,0.45745,0.64463,0.505882,0.91359,0.525462,0.705336,0.631373,0.932583,0.61064,0.767412,0.756863,0.922478,0.706966,0.817522,0.882353,0.901302,0.803071,0.856311,1,0.887571,0.887591,0.887549]},{\"ColorSpace\":\"Lab\",\"Name\":\"erdc_pbj_lin\",\"RGBPoints\":[-1,0,0,0,-0.87451,0.091821,0.0611476,0.10617,-0.74902,0.160311,0.0900022,0.192713,-0.623529,0.22484,0.12126,0.272128,-0.498039,0.291263,0.157469,0.340828,-0.372549,0.360015,0.200388,0.388903,-0.247059,0.437497,0.250058,0.387201,-0.121569,0.512636,0.304969,0.355955,0.00392157,0.582603,0.360874,0.33488,0.129412,0.655126,0.416374,0.306351,0.254902,0.725889,0.473329,0.279051,0.380392,0.778125,0.537928,0.302697,0.505882,0.815894,0.606931,0.382431,0.631373,0.839159,0.679308,0.497608,0.756863,0.854748,0.751666,0.631792,0.882353,0.869483,0.822508,0.768592,1,0.887572,0.887589,0.887565]},{\"ColorSpace\":\"Lab\",\"Name\":\"erdc_blue2green_muted\",\"RGBPoints\":[-1,0.107704,0.107708,0.107695,-0.87451,0.141522,0.13066,0.270741,-0.74902,0.180123,0.146119,0.42308,-0.623529,0.210161,0.169674,0.551795,-0.498039,0.239701,0.212939,0.634969,-0.372549,0.253916,0.282947,0.653641,-0.247059,0.242791,0.366933,0.608521,-0.121569,0.226302,0.446776,0.52693,0.00392157,0.236237,0.514689,0.458798,0.129412,0.274641,0.577589,0.376069,0.254902,0.349625,0.633993,0.288131,0.380392,0.4437,0.683677,0.260497,0.505882,0.536247,0.731214,0.285424,0.631373,0.628472,0.777128,0.349151,0.756863,0.718259,0.819287,0.496825,0.882353,0.804768,0.856164,0.703299,1,0.887571,0.887591,0.887548]},{\"ColorSpace\":\"Lab\",\"Name\":\"erdc_blue2green_BW\",\"RGBPoints\":[-1,3.63578e-7,0,0.00000529374,-0.87451,0.0539915,0.0577948,0.212806,-0.74902,0.0620393,0.0758942,0.388959,-0.623529,0.0697499,0.102032,0.54177,-0.498039,0.113295,0.156156,0.64334,-0.372549,0.152047,0.243196,0.670283,-0.247059,0.158096,0.344084,0.622864,-0.121569,0.151142,0.43922,0.532767,0.00392157,0.17155,0.521588,0.457719,0.129412,0.225861,0.599141,0.363997,0.254902,0.32328,0.67007,0.259083,0.380392,0.442344,0.733697,0.223754,0.505882,0.558409,0.794941,0.257411,0.631373,0.673875,0.854344,0.340822,0.756863,0.787244,0.909326,0.524717,0.882353,0.896483,0.958063,0.775914,1,1,1,0.999982]},{\"ColorSpace\":\"Lab\",\"Name\":\"GREEN-WHITE_LINEAR\",\"RGBPoints\":[-1,0,0,0,-0.87451,0,0.062745,0,-0.74902,0,0.12549,0,-0.623529,0,0.188235,0,-0.498039,0,0.25098,0,-0.372549,0,0.313725,0,-0.247059,0,0.376471,0,-0.121569,0.094118,0.439216,0,0.00392157,0.196078,0.501961,0,0.129412,0.294118,0.564706,0,0.254902,0.396078,0.627451,0,0.380392,0.498039,0.690196,0,0.505882,0.6,0.752941,0.145098,0.631373,0.701961,0.815686,0.364706,0.756863,0.8,0.878431,0.580392,0.882353,0.901961,0.941176,0.796078,1,1,1,1]},{\"ColorSpace\":\"Lab\",\"Name\":\"erdc_green2yellow_BW\",\"RGBPoints\":[-1,0,0,0,-0.87451,0,0.105542,0.0603919,-0.74902,0,0.159454,0.104148,-0.623529,0,0.219502,0.15542,-0.498039,0,0.282276,0.203811,-0.372549,0,0.346331,0.235652,-0.247059,0,0.411765,0.235428,-0.121569,0,0.477177,0.217977,0.00392157,0.0593644,0.541635,0.21361,0.129412,0.233081,0.604722,0.210591,0.254902,0.369803,0.664942,0.226536,0.380392,0.498446,0.722367,0.288237,0.505882,0.601929,0.782244,0.380815,0.631373,0.703207,0.840497,0.512134,0.756863,0.803186,0.896433,0.674462,0.882353,0.903834,0.950266,0.846715,1,1,1,0.999981]},{\"ColorSpace\":\"Lab\",\"Name\":\"blue2cyan\",\"RGBPoints\":[-1,0,0,0,-0.87451,0,0.152941,0.364706,-0.74902,0,0.254902,0.470588,-0.623529,0,0.34902,0.572549,-0.498039,0,0.443137,0.670588,-0.372549,0,0.537255,0.772549,-0.247059,0,0.627451,0.870588,-0.121569,0,0.717647,0.964706,0.00392157,0.0784314,0.772549,1,0.129412,0.207843,0.858824,1,0.254902,0.32549,0.941176,1,0.380392,0.45098,1,1,0.505882,0.560784,1,1,0.631373,0.662745,1,1,0.756863,0.760784,1,1,0.882353,0.870588,1,1,1,1,1,1]},{\"ColorSpace\":\"Lab\",\"Name\":\"erdc_blue2cyan_BW\",\"RGBPoints\":[-1,4.05298e-7,0,0.0000059012,-0.87451,0.0207526,0.0740933,0.18093,-0.74902,0,0.121033,0.30343,-0.623529,0,0.166892,0.416095,-0.498039,0,0.216768,0.524796,-0.372549,0.0164769,0.275471,0.608585,-0.247059,0.0544527,0.344824,0.659267,-0.121569,0.0880643,0.419118,0.688675,0.00392157,0.127938,0.492556,0.720256,0.129412,0.149476,0.566946,0.756918,0.254902,0.188961,0.641333,0.792122,0.380392,0.245482,0.715336,0.827609,0.505882,0.329216,0.786235,0.874761,0.631373,0.453558,0.852803,0.918466,0.756863,0.626281,0.910493,0.954,0.882353,0.82257,0.958709,0.980146,1,1,1,0.999989]},{\"ColorSpace\":\"Lab\",\"Name\":\"erdc_blue_BW\",\"RGBPoints\":[-1,0,0,0,-0.87451,0.0425591,0.0763529,0.150682,-0.74902,0.0569472,0.119154,0.275403,-0.623529,0.0635978,0.164772,0.395427,-0.498039,0.0774342,0.213851,0.510014,-0.372549,0.106815,0.267034,0.615102,-0.247059,0.122093,0.324649,0.720068,-0.121569,0.160851,0.387068,0.806956,0.00392157,0.213754,0.453516,0.878012,0.129412,0.26722,0.524656,0.932436,0.254902,0.326844,0.599279,0.968038,0.380392,0.403403,0.674712,0.984784,0.505882,0.499703,0.745519,1,0.631373,0.615055,0.813983,1,0.756863,0.74405,0.879228,1,0.882353,0.877909,0.941913,1,1,1,1,0.999996]},{\"ColorSpace\":\"Lab\",\"Name\":\"BLUE-WHITE\",\"RGBPoints\":[-1,0,0,0,-0.87451,0,0,0.082353,-0.74902,0,0,0.168627,-0.623529,0,0,0.254902,-0.498039,0,0,0.337255,-0.372549,0,0,0.423529,-0.247059,0,0,0.509804,-0.121569,0,0.101961,0.592157,0.00392157,0,0.203922,0.678431,0.129412,0,0.301961,0.764706,0.254902,0,0.403922,0.85098,0.380392,0,0.505882,0.933333,0.505882,0,0.603922,1,0.631373,0.254902,0.705882,1,0.756863,0.509804,0.807843,1,0.882353,0.764706,0.905882,1,1,1,1,1]},{\"ColorSpace\":\"Lab\",\"Name\":\"erdc_purple_BW\",\"RGBPoints\":[-1,4.264e-8,0,6.20844e-7,-0.87451,0.100579,0.0593111,0.145666,-0.74902,0.167794,0.0889224,0.254953,-0.623529,0.231446,0.123339,0.360511,-0.498039,0.296699,0.163027,0.461278,-0.372549,0.363211,0.209286,0.55306,-0.247059,0.431136,0.260776,0.637195,-0.121569,0.498202,0.320012,0.705799,0.00392157,0.567456,0.380459,0.778091,0.129412,0.629381,0.445284,0.8448,0.254902,0.688373,0.517374,0.895694,0.380392,0.74891,0.590906,0.93976,0.505882,0.805017,0.667956,0.977626,0.631373,0.850914,0.752618,0.992396,0.756863,0.89724,0.838454,0.994093,0.882353,0.948461,0.922603,0.994449,1,1,1,0.999967]},{\"ColorSpace\":\"Lab\",\"Name\":\"erdc_magenta_BW\",\"RGBPoints\":[-1,0,0,0.0000254023,-0.87451,0.128696,0.0456782,0.11635,-0.74902,0.228133,0.0476299,0.201452,-0.623529,0.327273,0.0374065,0.282107,-0.498039,0.420953,0.0408166,0.35709,-0.372549,0.511562,0.0642203,0.430511,-0.247059,0.599552,0.102686,0.504257,-0.121569,0.684646,0.150536,0.579429,0.00392157,0.765817,0.205978,0.656062,0.129412,0.839176,0.27229,0.731807,0.254902,0.89536,0.357594,0.797309,0.380392,0.930238,0.457825,0.846984,0.505882,0.945921,0.564536,0.880571,0.631373,0.948995,0.670753,0.902279,0.756863,0.947124,0.772819,0.918171,0.882353,0.947265,0.869424,0.934352,1,0.954719,0.95475,0.954726]},{\"ColorSpace\":\"Lab\",\"Name\":\"magenta\",\"RGBPoints\":[-1,0,0,0,-0.87451,0.364706,0,0.152941,-0.74902,0.470588,0,0.254902,-0.623529,0.572549,0,0.34902,-0.498039,0.670588,0,0.443137,-0.372549,0.772549,0,0.537255,-0.247059,0.870588,0,0.627451,-0.121569,0.964706,0,0.717647,0.00392157,1,0.0784314,0.772549,0.129412,1,0.207843,0.858824,0.254902,1,0.32549,0.941176,0.380392,1,0.45098,1,0.505882,1,0.560784,1,0.631373,1,0.662745,1,0.756863,1,0.760784,1,0.882353,1,0.870588,1,1,1,1,1]},{\"ColorSpace\":\"Lab\",\"Name\":\"RED-PURPLE\",\"RGBPoints\":[-1,0,0,0,-0.87451,0.188235,0,0.007843,-0.74902,0.345098,0,0.035294,-0.623529,0.439216,0,0.098039,-0.498039,0.533333,0,0.152941,-0.372549,0.627451,0.015686,0.211765,-0.247059,0.721569,0.031373,0.266667,-0.121569,0.8,0.047059,0.329412,0.00392157,0.862745,0.047059,0.403922,0.129412,0.941176,0.062745,0.466667,0.254902,0.988235,0.078431,0.54902,0.380392,0.988235,0.141176,0.643137,0.505882,0.988235,0.25098,0.729412,0.631373,0.988235,0.376471,0.811765,0.756863,0.988235,0.54902,0.886275,0.882353,0.988235,0.752941,0.952941,1,0.996078,0.996078,0.996078]},{\"ColorSpace\":\"Lab\",\"Name\":\"erdc_red_BW\",\"RGBPoints\":[-1,0,0,0,-0.87451,0.147204,0.0480135,0.0401815,-0.74902,0.253411,0.0617478,0.0301333,-0.623529,0.356059,0.0746331,0.0446897,-0.498039,0.457731,0.0934935,0.0636931,-0.372549,0.557199,0.122714,0.0860013,-0.247059,0.665179,0.144238,0.105585,-0.121569,0.763833,0.187056,0.138326,0.00392157,0.847035,0.254558,0.189407,0.129412,0.905663,0.345937,0.258215,0.254902,0.941431,0.447111,0.346277,0.380392,0.962608,0.546927,0.457571,0.505882,0.987833,0.637276,0.569944,0.631373,0.994202,0.732176,0.687958,0.756863,0.993304,0.826268,0.800567,0.882353,0.994413,0.917205,0.906393,1,1,1,0.999979]},{\"ColorSpace\":\"Lab\",\"Name\":\"RED_TEMPERATURE\",\"RGBPoints\":[-1,0,0,0,-0.87451,0.090196,0,0,-0.74902,0.180392,0,0,-0.623529,0.270588,0,0,-0.498039,0.360784,0,0,-0.372549,0.45098,0,0,-0.247059,0.545098,0,0,-0.121569,0.635294,0,0,0.00392157,0.72549,0.058824,0,0.129412,0.815686,0.176471,0,0.254902,0.905882,0.294118,0,0.380392,1,0.411765,0,0.505882,1,0.533333,0.027451,0.631373,1,0.65098,0.27451,0.756863,1,0.768627,0.521569,0.882353,1,0.886275,0.768627,1,1,1,1]},{\"ColorSpace\":\"Lab\",\"Name\":\"erdc_orange_BW\",\"RGBPoints\":[-1,0,0,0.0000253806,-0.87451,0.135871,0.0593824,0,-0.74902,0.224328,0.0907216,0,-0.623529,0.318083,0.119647,0,-0.498039,0.414443,0.150246,0,-0.372549,0.511077,0.184884,0,-0.247059,0.605501,0.226033,0,-0.121569,0.695274,0.275491,0,0.00392157,0.777826,0.334445,0,0.129412,0.851498,0.402441,0,0.254902,0.915899,0.47759,0.000602975,0.380392,0.971984,0.557882,0.0361443,0.505882,1,0.641287,0.135967,0.631373,1,0.725198,0.27997,0.756863,1,0.808205,0.438135,0.882353,1,0.89306,0.587036,1,1,0.977928,0.721599]},{\"ColorSpace\":\"Lab\",\"Name\":\"heated_object\",\"RGBPoints\":[-1,0,0,0,-0.87451,0.34902,0.0862745,0,-0.74902,0.45098,0.172549,0,-0.623529,0.52549,0.231373,0,-0.498039,0.580392,0.278431,0,-0.372549,0.623529,0.313725,0,-0.247059,0.670588,0.352941,0,-0.121569,0.717647,0.392157,0,0.00392157,0.772549,0.439216,0,0.129412,0.839216,0.494118,0,0.254902,0.901961,0.541176,0,0.380392,0.968627,0.6,0,0.505882,1,0.658824,0,0.631373,1,0.721569,0,0.756863,1,0.827451,0.298039,0.882353,1,0.976471,0.72549,1,1,1,1]},{\"ColorSpace\":\"Lab\",\"Name\":\"erdc_gold_BW\",\"RGBPoints\":[-1,0,0,0.0000190933,-0.87451,0.128363,0.0636265,0,-0.74902,0.193795,0.111057,0,-0.623529,0.25976,0.15987,0,-0.498039,0.328546,0.210589,0,-0.372549,0.399726,0.26332,0,-0.247059,0.472969,0.318261,0,-0.121569,0.546245,0.375827,0,0.00392157,0.61745,0.436719,0,0.129412,0.685545,0.501113,0,0.254902,0.749578,0.568799,0,0.380392,0.80962,0.6394,0,0.505882,0.865572,0.712699,0.10257,0.631373,0.917709,0.787569,0.233665,0.756863,0.966914,0.863138,0.369608,0.882353,1,0.939405,0.496104,1,0.999225,1,0.612275]},{\"ColorSpace\":\"Lab\",\"Name\":\"erdc_brown_BW\",\"RGBPoints\":[-1,3.3216e-7,0,0.00000483629,-0.87451,0.14693,0.0518172,0,-0.74902,0.225806,0.0814996,0,-0.623529,0.301681,0.111452,0,-0.498039,0.370487,0.150664,0,-0.372549,0.43108,0.199477,0,-0.247059,0.4849,0.255107,0,-0.121569,0.536798,0.313486,0,0.00392157,0.59286,0.371167,0,0.129412,0.653119,0.428135,0,0.254902,0.714589,0.485917,0.0379541,0.380392,0.774667,0.54565,0.116634,0.505882,0.831222,0.608047,0.183895,0.631373,0.880305,0.674199,0.260298,0.756863,0.922314,0.742472,0.367086,0.882353,0.959408,0.811222,0.497258,1,0.993548,0.875183,0.622093]},{\"ColorSpace\":\"Lab\",\"Name\":\"copper_Matlab\",\"RGBPoints\":[-1,0,0,0,-0.87451,0.0784314,0.0501961,0.0313725,-0.74902,0.156863,0.100392,0.0627451,-0.623529,0.235294,0.150588,0.0941176,-0.498039,0.313725,0.200784,0.12549,-0.372549,0.392157,0.25098,0.156863,-0.247059,0.470588,0.301176,0.188235,-0.121569,0.54902,0.351373,0.219608,0.00392157,0.627451,0.401569,0.25098,0.129412,0.705882,0.451765,0.282353,0.254902,0.784314,0.501961,0.313725,0.380392,0.862745,0.552157,0.345098,0.505882,0.941176,0.602353,0.376471,0.631373,1,0.652549,0.407843,0.756863,1,0.702745,0.439216,0.882353,1,0.752941,0.470588,1,1,0.8,0.5]},{\"ColorSpace\":\"Lab\",\"Name\":\"pink_Matlab\",\"RGBPoints\":[-1,0,0,0,-0.87451,0.312416,0.204524,0.204524,-0.74902,0.441822,0.289241,0.289241,-0.623529,0.54112,0.354246,0.354246,-0.498039,0.624831,0.409048,0.409048,-0.372549,0.698582,0.45733,0.45733,-0.247059,0.764404,0.502282,0.500979,-0.121569,0.791292,0.591516,0.54112,0.00392157,0.817297,0.66895,0.578481,0.129412,0.842499,0.738308,0.613572,0.254902,0.866968,0.801687,0.646762,0.380392,0.890766,0.86041,0.678329,0.505882,0.913944,0.913944,0.711254,0.631373,0.936549,0.936549,0.79459,0.756863,0.958621,0.958621,0.869979,0.882353,0.980196,0.980196,0.939336,1,1,1,1]},{\"ColorSpace\":\"Lab\",\"Name\":\"bone_Matlab\",\"RGBPoints\":[-1,0,0,0,-0.87451,0.054902,0.054902,0.075817,-0.74902,0.109804,0.109804,0.151634,-0.623529,0.164706,0.164706,0.227451,-0.498039,0.219608,0.219608,0.303268,-0.372549,0.27451,0.27451,0.379085,-0.247059,0.329412,0.329902,0.454412,-0.121569,0.384314,0.405719,0.509314,0.00392157,0.439216,0.481536,0.564216,0.129412,0.494118,0.557353,0.619118,0.254902,0.54902,0.63317,0.67402,0.380392,0.603922,0.708987,0.728922,0.505882,0.660294,0.783824,0.783824,0.631373,0.746569,0.838725,0.838725,0.756863,0.832843,0.893627,0.893627,0.882353,0.919118,0.948529,0.948529,1,1,1,1]},{\"ColorSpace\":\"Lab\",\"Name\":\"gray_Matlab\",\"RGBPoints\":[-1,0,0,0,-0.87451,0.0627451,0.0627451,0.0627451,-0.74902,0.12549,0.12549,0.12549,-0.623529,0.188235,0.188235,0.188235,-0.498039,0.25098,0.25098,0.25098,-0.372549,0.313725,0.313725,0.313725,-0.247059,0.376471,0.376471,0.376471,-0.121569,0.439216,0.439216,0.439216,0.00392157,0.501961,0.501961,0.501961,0.129412,0.564706,0.564706,0.564706,0.254902,0.627451,0.627451,0.627451,0.380392,0.690196,0.690196,0.690196,0.505882,0.752941,0.752941,0.752941,0.631373,0.815686,0.815686,0.815686,0.756863,0.878431,0.878431,0.878431,0.882353,0.941176,0.941176,0.941176,1,1,1,1]},{\"ColorSpace\":\"Lab\",\"Name\":\"Purples\",\"RGBPoints\":[-1,0.247059,0,0.490196,-0.87451,0.288397,0.07677,0.525629,-0.74902,0.32975,0.153587,0.561092,-0.623529,0.373057,0.236263,0.600461,-0.498039,0.416363,0.319,0.639923,-0.372549,0.459669,0.405613,0.685198,-0.247059,0.503345,0.491534,0.730058,-0.121569,0.562399,0.54862,0.757616,0.00392157,0.621453,0.606075,0.785544,0.129412,0.680508,0.674971,0.824914,0.254902,0.739562,0.743406,0.863899,0.380392,0.798616,0.800492,0.893426,0.505882,0.85684,0.856655,0.922491,0.631373,0.898178,0.894056,0.942176,0.756863,0.938654,0.930919,0.961646,0.882353,0.964245,0.958478,0.977393,1,0.988235,0.984314,0.992157]},{\"ColorSpace\":\"Lab\",\"Name\":\"Blues\",\"RGBPoints\":[-1,0.031373,0.188235,0.419608,-0.87451,0.031373,0.253195,0.516063,-0.74902,0.031757,0.318139,0.612149,-0.623529,0.080969,0.38113,0.661361,-0.498039,0.130427,0.444152,0.710327,-0.372549,0.195386,0.509112,0.743791,-0.247059,0.260715,0.573841,0.777209,-0.121569,0.341423,0.628958,0.808704,0.00392157,0.422745,0.684075,0.839892,0.129412,0.523137,0.739193,0.861546,0.254902,0.622684,0.793464,0.883429,0.380392,0.701423,0.826928,0.910988,0.505882,0.778685,0.8603,0.937993,0.631373,0.825928,0.891795,0.953741,0.756863,0.87328,0.923291,0.969489,0.882353,0.922491,0.954787,0.985236,1,0.968627,0.984314,1]},{\"ColorSpace\":\"Lab\",\"Name\":\"Greens\",\"RGBPoints\":[-1,0,0.266667,0.105882,-0.87451,0,0.347374,0.139346,-0.74902,0.000538,0.427912,0.172933,-0.623529,0.069435,0.486967,0.222145,-0.498039,0.138178,0.546082,0.271326,-0.372549,0.197232,0.609073,0.31857,-0.247059,0.257255,0.671742,0.365859,-0.121569,0.357647,0.720953,0.415071,0.00392157,0.45767,0.769919,0.465021,0.129412,0.546251,0.811257,0.537855,0.254902,0.634295,0.852211,0.610688,0.380392,0.709097,0.883706,0.683522,0.505882,0.78316,0.914833,0.755894,0.631373,0.842215,0.938454,0.818885,0.756863,0.899977,0.961538,0.880692,0.882353,0.935409,0.975317,0.92203,1,0.968627,0.988235,0.960784]},{\"ColorSpace\":\"Lab\",\"Name\":\"PuBu\",\"RGBPoints\":[-1,0.301961,0,0.294118,-0.87451,0.404321,0.029527,0.390573,-0.74902,0.50599,0.059592,0.486782,-0.623529,0.519769,0.158016,0.551742,-0.498039,0.533456,0.256194,0.616301,-0.372549,0.54133,0.33887,0.655671,-0.247059,0.54902,0.421592,0.695087,-0.121569,0.54902,0.506236,0.736424,0.00392157,0.550127,0.590573,0.777701,0.129412,0.585559,0.665375,0.81707,0.254902,0.622145,0.739023,0.855825,0.380392,0.687105,0.784298,0.879446,0.505882,0.752065,0.829758,0.903253,0.631373,0.817024,0.87897,0.930811,0.756863,0.880907,0.927213,0.957832,0.882353,0.926182,0.958708,0.975548,1,0.968627,0.988235,0.992157]},{\"ColorSpace\":\"Lab\",\"Name\":\"BuPu\",\"RGBPoints\":[-1,0.007843,0.219608,0.345098,-0.87451,0.01178,0.286536,0.449427,-0.74902,0.015702,0.35328,0.553479,-0.623529,0.01767,0.396586,0.622376,-0.498039,0.021115,0.4402,0.690688,-0.372549,0.11757,0.503191,0.722184,-0.247059,0.214625,0.565859,0.753633,-0.121569,0.336671,0.615071,0.78316,0.00392157,0.457978,0.663975,0.812503,0.129412,0.556401,0.703345,0.836125,0.254902,0.65421,0.742714,0.859669,0.380392,0.736886,0.782084,0.881323,0.505882,0.81827,0.821638,0.903068,0.631373,0.873387,0.864944,0.92669,0.756863,0.927536,0.907605,0.949988,0.882353,0.964937,0.9391,0.967705,1,1,0.968627,0.984314]},{\"ColorSpace\":\"Lab\",\"Name\":\"BuGn\",\"RGBPoints\":[-1,0.031373,0.25098,0.505882,-0.87451,0.031373,0.329719,0.590527,-0.74902,0.031911,0.408397,0.674787,-0.623529,0.100807,0.479262,0.710219,-0.498039,0.169704,0.550219,0.745744,-0.372549,0.238601,0.62699,0.787082,-0.247059,0.307958,0.703114,0.826759,-0.121569,0.39654,0.752326,0.797232,0.00392157,0.485121,0.801046,0.767705,0.129412,0.573702,0.83451,0.738178,0.254902,0.661592,0.867743,0.711034,0.380392,0.732457,0.895302,0.74253,0.505882,0.801845,0.922307,0.774579,0.631373,0.841215,0.938055,0.817885,0.756863,0.880907,0.95391,0.861084,0.882353,0.926182,0.971626,0.902422,1,0.968627,0.988235,0.941176]},{\"ColorSpace\":\"Lab\",\"Name\":\"GnBu\",\"RGBPoints\":[-1,0,0.266667,0.105882,-0.87451,0,0.347374,0.139346,-0.74902,0.000538,0.427912,0.172933,-0.623529,0.069435,0.486967,0.222145,-0.498039,0.138178,0.546175,0.272095,-0.372549,0.197232,0.615071,0.368551,-0.247059,0.256609,0.683276,0.464867,-0.121569,0.329443,0.722645,0.555417,0.00392157,0.403137,0.762138,0.645413,0.129412,0.503529,0.805444,0.718247,0.254902,0.603922,0.848597,0.790465,0.380392,0.704314,0.887966,0.847551,0.505882,0.802307,0.926321,0.903714,0.631373,0.851519,0.944037,0.941115,0.756863,0.899977,0.961538,0.976901,0.882353,0.935409,0.975317,0.984775,1,0.968627,0.988235,0.992157]},{\"ColorSpace\":\"Lab\",\"Name\":\"GnBuPu\",\"RGBPoints\":[-1,0.003922,0.27451,0.211765,-0.87451,0.003922,0.349312,0.280661,-0.74902,0.003937,0.423852,0.349773,-0.623529,0.005905,0.46519,0.446228,-0.498039,0.009443,0.506344,0.542837,-0.372549,0.111803,0.535871,0.649135,-0.247059,0.214025,0.565859,0.753633,-0.121569,0.310481,0.615071,0.78316,0.00392157,0.407797,0.663975,0.812503,0.129412,0.531811,0.703345,0.836125,0.254902,0.65421,0.742714,0.859669,0.380392,0.736886,0.782084,0.881323,0.505882,0.81827,0.821176,0.902884,0.631373,0.873387,0.854641,0.922568,0.756863,0.927536,0.888535,0.942361,0.882353,0.964937,0.929873,0.964014,1,1,0.968627,0.984314]},{\"ColorSpace\":\"Lab\",\"Name\":\"BuGnYl\",\"RGBPoints\":[-1,0.031373,0.113725,0.345098,-0.87451,0.088458,0.159,0.463206,-0.74902,0.145052,0.204567,0.5807,-0.623529,0.139146,0.287243,0.620069,-0.498039,0.13318,0.370196,0.659562,-0.372549,0.123337,0.470588,0.706805,-0.247059,0.115386,0.570335,0.753126,-0.121569,0.186251,0.643168,0.761,0.00392157,0.258716,0.71514,0.768074,0.129412,0.380761,0.760415,0.750358,0.254902,0.503576,0.806075,0.732795,0.380392,0.645306,0.861192,0.719016,0.505882,0.783899,0.91511,0.705606,0.631373,0.858701,0.944637,0.6997,0.756863,0.931349,0.973303,0.698424,0.882353,0.966782,0.987082,0.777163,1,1,1,0.85098]},{\"ColorSpace\":\"Lab\",\"Name\":\"PuRd\",\"RGBPoints\":[-1,0.286275,0,0.415686,-0.87451,0.38273,0.001968,0.441276,-0.74902,0.479231,0.003922,0.466774,-0.623529,0.581592,0.003922,0.480554,-0.498039,0.683799,0.00549,0.494887,-0.372549,0.776317,0.105882,0.544098,-0.247059,0.867866,0.206321,0.592618,-0.121569,0.919047,0.308681,0.612303,0.00392157,0.968812,0.411226,0.632603,0.129412,0.974717,0.519493,0.671972,0.254902,0.980546,0.626451,0.71065,0.380392,0.984483,0.701253,0.732303,0.505882,0.988328,0.77504,0.755617,0.631373,0.990296,0.828189,0.812703,0.756863,0.992372,0.880907,0.869035,0.882353,0.996309,0.926182,0.912341,1,1,0.968627,0.952941]},{\"ColorSpace\":\"Lab\",\"Name\":\"RdPu\",\"RGBPoints\":[-1,0.403922,0,0.121569,-0.87451,0.500377,0,0.192434,-0.74902,0.596909,0.000277,0.263037,-0.623529,0.703206,0.035709,0.300438,-0.498039,0.808612,0.071296,0.338854,-0.372549,0.857824,0.116571,0.441215,-0.247059,0.905513,0.163552,0.54293,-0.121569,0.889765,0.281661,0.617732,0.00392157,0.873156,0.39897,0.691611,0.129412,0.82985,0.491488,0.736886,0.254902,0.789081,0.583237,0.781853,0.380392,0.810734,0.656071,0.819254,0.505882,0.833126,0.729181,0.85684,0.631373,0.870527,0.80792,0.898178,0.756863,0.907605,0.884398,0.938331,0.882353,0.9391,0.921799,0.958016,1,0.968627,0.956863,0.976471]},{\"ColorSpace\":\"Lab\",\"Name\":\"Oranges\",\"RGBPoints\":[-1,0.498039,0.152941,0.015686,-0.87451,0.57481,0.182468,0.013718,-0.74902,0.651765,0.212042,0.011734,-0.623529,0.752157,0.247474,0.007797,-0.498039,0.851719,0.283368,0.004475,-0.372549,0.898962,0.348328,0.039908,-0.247059,0.945652,0.413426,0.076401,-0.121569,0.969273,0.484291,0.157109,0.00392157,0.992157,0.554971,0.238185,0.129412,0.992157,0.619931,0.330704,0.254902,0.992157,0.684967,0.423837,0.380392,0.992157,0.751895,0.532103,0.505882,0.992249,0.817716,0.639354,0.631373,0.994218,0.861023,0.725967,0.756863,0.996186,0.903576,0.810965,0.882353,0.998155,0.933103,0.868051,1,1,0.960784,0.921569]},{\"ColorSpace\":\"Lab\",\"Name\":\"Reds\",\"RGBPoints\":[-1,0.403922,0,0.05098,-0.87451,0.525967,0.029527,0.066728,-0.74902,0.647643,0.058962,0.082476,-0.623529,0.722445,0.076678,0.098224,-0.498039,0.797186,0.095194,0.114187,-0.372549,0.868051,0.164091,0.143714,-0.247059,0.937809,0.233541,0.173933,-0.121569,0.96143,0.326059,0.232987,0.00392157,0.984375,0.418147,0.292657,0.129412,0.986344,0.496886,0.371396,0.254902,0.988235,0.575702,0.450673,0.380392,0.988235,0.656409,0.543191,0.505882,0.98842,0.736747,0.635894,0.631373,0.992357,0.809581,0.732349,0.756863,0.996186,0.880692,0.826759,0.882353,0.998155,0.92203,0.885813,1,1,0.960784,0.941176]},{\"ColorSpace\":\"Lab\",\"Name\":\"RdOr\",\"RGBPoints\":[-1,0.498039,0,0,-0.87451,0.6004,0,0,-0.74902,0.702514,0.000738,0.000477,-0.623529,0.773379,0.095225,0.061499,-0.498039,0.843875,0.189865,0.12283,-0.372549,0.891119,0.294195,0.203537,-0.247059,0.937855,0.397924,0.283137,-0.121569,0.963445,0.476663,0.316601,0.00392157,0.988297,0.555771,0.351665,0.129412,0.990265,0.646321,0.436309,0.254902,0.992157,0.735256,0.519646,0.380392,0.992157,0.784468,0.570827,0.505882,0.992249,0.833218,0.623483,0.631373,0.994218,0.872587,0.706159,0.756863,0.996186,0.911419,0.788189,0.882353,0.998155,0.940946,0.859054,1,1,0.968627,0.92549]},{\"ColorSpace\":\"Lab\",\"Name\":\"BrOrYl\",\"RGBPoints\":[-1,0.4,0.145098,0.023529,-0.87451,0.500392,0.174625,0.019592,-0.74902,0.600784,0.204291,0.015656,-0.623529,0.701176,0.251534,0.011719,-0.498039,0.800984,0.299146,0.008397,-0.372549,0.863975,0.370012,0.043829,-0.247059,0.926321,0.441107,0.0794,-0.121569,0.961753,0.521815,0.120738,0.00392157,0.996078,0.602645,0.163122,0.129412,0.996078,0.68729,0.237924,0.254902,0.996078,0.771011,0.314879,0.380392,0.996078,0.832034,0.444798,0.505882,0.996171,0.892042,0.572595,0.631373,0.998139,0.931411,0.65724,0.756863,1,0.969489,0.741669,0.882353,1,0.985236,0.822376,1,1,1,0.898039]},{\"ColorSpace\":\"Lab\",\"Name\":\"RdOrYl\",\"RGBPoints\":[-1,0.501961,0,0.14902,-0.87451,0.622038,0,0.14902,-0.74902,0.741761,0.0004,0.148866,-0.623529,0.816563,0.05158,0.129181,-0.498039,0.890965,0.10356,0.110235,-0.372549,0.940177,0.205921,0.137793,-0.247059,0.988281,0.308789,0.165536,-0.121569,0.99025,0.432803,0.200969,0.00392157,0.992218,0.555217,0.236278,0.129412,0.994187,0.628051,0.267774,0.254902,0.996078,0.701038,0.301269,0.380392,0.996078,0.777809,0.383945,0.505882,0.996171,0.852826,0.466621,0.631373,0.998139,0.892195,0.549296,0.756863,1,0.931349,0.632188,0.882353,1,0.966782,0.7188,1,1,1,0.8]},{\"ColorSpace\":\"Lab\",\"Name\":\"CIELab_blue2red\",\"RGBPoints\":[-1,0,0.6,0.74902,1,0.76863,0.46667,0.34118]},{\"ColorSpace\":\"Lab\",\"Name\":\"blue2yellow\",\"RGBPoints\":[-1,0,0,1,0,0.5,0.5,0.5,1,1,1,0]},{\"ColorSpace\":\"Lab\",\"Name\":\"erdc_blue2gold\",\"RGBPoints\":[-1,0.175119,0.0438468,1,-0.874016,0.22383,0.159771,0.94557,-0.748031,0.27254,0.233611,0.891216,-0.622047,0.321251,0.296526,0.836857,-0.496063,0.369962,0.354296,0.782359,-0.370079,0.418672,0.409139,0.72754,-0.244094,0.467383,0.462152,0.672148,-0.11811,0.51609,0.51396,0.615825,0.00787402,0.572863,0.55452,0.559172,0.133858,0.630269,0.593822,0.517729,0.259843,0.689588,0.624668,0.47446,0.385827,0.745394,0.656113,0.428638,0.511811,0.798624,0.688104,0.379105,0.637795,0.849926,0.720593,0.323834,0.76378,0.899765,0.753543,0.258657,0.889764,0.948487,0.78692,0.171778,1,0.990413,0.816451,0.00729848]},{\"ColorSpace\":\"Lab\",\"Name\":\"erdc_blue2yellow\",\"RGBPoints\":[-1,0.0830122,0,0.495617,-0.87451,0.141973,0.0551288,0.57363,-0.74902,0.193048,0.110258,0.604561,-0.623529,0.234231,0.165386,0.57643,-0.498039,0.275413,0.220515,0.548299,-0.372549,0.316596,0.275644,0.520169,-0.247059,0.357778,0.330773,0.492038,-0.121569,0.398961,0.385901,0.463908,0.00392157,0.449929,0.438487,0.426815,0.129412,0.511572,0.488299,0.379944,0.254902,0.581222,0.53603,0.325741,0.380392,0.650871,0.583761,0.271538,0.505882,0.720521,0.631493,0.217335,0.631373,0.79017,0.679224,0.163132,0.756863,0.85982,0.726955,0.108929,0.882353,0.910254,0.774159,0.14112,1,0.927513,0.81759,0.306289]},{\"ColorSpace\":\"Lab\",\"Name\":\"erdc_cyan2orange\",\"RGBPoints\":[-1,0.0471513,0.213874,0.414329,-0.87451,0.0674702,0.256648,0.439027,-0.74902,0.0959957,0.299331,0.462089,-0.623529,0.132428,0.341872,0.483212,-0.498039,0.188743,0.38277,0.500597,-0.372549,0.268511,0.420229,0.512179,-0.247059,0.352945,0.455602,0.519101,-0.121569,0.43893,0.489368,0.521538,0.00392157,0.522445,0.522495,0.522436,0.129412,0.600089,0.555682,0.53205,0.254902,0.67988,0.587981,0.539163,0.380392,0.761011,0.619586,0.544439,0.505882,0.84278,0.650741,0.548567,0.631373,0.910713,0.687347,0.557822,0.756863,0.952232,0.734972,0.577775,0.882353,0.975642,0.789858,0.604868,1,0.990752,0.843643,0.632857]},{\"ColorSpace\":\"Lab\",\"Name\":\"erdc_purple2green\",\"RGBPoints\":[-1,0.235006,0.0483128,0.530899,-0.87451,0.302968,0.108419,0.552391,-0.74902,0.360241,0.166059,0.569502,-0.623529,0.406746,0.226782,0.579373,-0.498039,0.444073,0.28964,0.582094,-0.372549,0.473648,0.353774,0.577947,-0.247059,0.497636,0.418154,0.567911,-0.121569,0.519086,0.481741,0.553968,0.00392157,0.542884,0.542914,0.542875,0.129412,0.566303,0.603989,0.527499,0.254902,0.595218,0.662965,0.516857,0.380392,0.628641,0.720701,0.510673,0.505882,0.665373,0.777849,0.508165,0.631373,0.704182,0.834921,0.508303,0.756863,0.743846,0.892328,0.50999,0.882353,0.783158,0.950422,0.512181,1,0.818617,1,0.513888]},{\"ColorSpace\":\"Lab\",\"Name\":\"erdc_purple2green_dark\",\"RGBPoints\":[-1,0.107656,0,0.428682,-0.87451,0.1924,0,0.449799,-0.74902,0.255118,0.0648939,0.466726,-0.623529,0.304256,0.133066,0.476703,-0.498039,0.343202,0.19716,0.479793,-0.372549,0.373876,0.260353,0.476241,-0.247059,0.398497,0.322872,0.466953,-0.121569,0.420016,0.384252,0.453785,0.00392157,0.44319,0.443216,0.443186,0.129412,0.465553,0.502139,0.428233,0.254902,0.492959,0.559151,0.417591,0.380392,0.524654,0.615092,0.411016,0.505882,0.55959,0.670583,0.40779,0.631373,0.596614,0.726102,0.406948,0.756863,0.634544,0.782032,0.407439,0.882353,0.672183,0.838703,0.408237,1,0.706131,0.892759,0.408452]},{\"ColorSpace\":\"Lab\",\"Name\":\"coolwarm\",\"RGBPoints\":[-1,0.229806,0.298718,0.753683,-0.875,0.303869,0.406535,0.844959,-0.75,0.383013,0.509419,0.917388,-0.625,0.466667,0.604563,0.968155,-0.5,0.552953,0.688929,0.995376,-0.375,0.639176,0.7596,0.998151,-0.25,0.722193,0.813953,0.976575,-0.125,0.798692,0.849786,0.931689,0,0.865395,0.86541,0.865396,0.125,0.924128,0.827385,0.774508,0.25,0.958853,0.769768,0.678008,0.375,0.969954,0.694267,0.579375,0.5,0.958003,0.602842,0.481776,0.625,0.923945,0.497309,0.38797,0.75,0.869187,0.378313,0.300267,0.875,0.795632,0.241284,0.220526,1,0.705673,0.0155562,0.150233]},{\"ColorSpace\":\"Lab\",\"Name\":\"BuRd\",\"RGBPoints\":[-1,0.019608,0.188235,0.380392,-0.87451,0.088504,0.321107,0.564937,-0.74902,0.163399,0.444983,0.697501,-0.623529,0.247059,0.555709,0.754095,-0.498039,0.420684,0.676432,0.818685,-0.372549,0.606459,0.789773,0.880277,-0.247059,0.761476,0.868512,0.924567,-0.121569,0.878047,0.925721,0.951942,0.00392157,0.969089,0.966474,0.964937,0.129412,0.983852,0.897578,0.846828,0.254902,0.982468,0.800692,0.706113,0.380392,0.960323,0.66782,0.536332,0.505882,0.894579,0.503806,0.399769,0.631373,0.81707,0.33218,0.281046,0.756863,0.728489,0.155017,0.197386,0.882353,0.576932,0.055363,0.14925,1,0.403922,0,0.121569]},{\"ColorSpace\":\"Lab\",\"Name\":\"Spectral_lowBlue\",\"RGBPoints\":[-1,0.368627,0.309804,0.635294,-0.87451,0.260361,0.450058,0.70173,-0.74902,0.248058,0.591311,0.717186,-0.623529,0.376009,0.734025,0.658132,-0.498039,0.537947,0.814764,0.64506,-0.372549,0.702345,0.879585,0.636678,-0.247059,0.84752,0.938639,0.607151,-0.121569,0.940408,0.976163,0.656055,0.00392157,0.999923,0.997616,0.745021,0.129412,0.997463,0.921338,0.61707,0.254902,0.995002,0.824606,0.499885,0.380392,0.992541,0.701576,0.39654,0.505882,0.973472,0.547405,0.318108,0.631373,0.937793,0.398539,0.270127,0.756863,0.861515,0.282891,0.299654,0.882353,0.746482,0.144637,0.288812,1,0.619608,0.003922,0.258824]},{\"ColorSpace\":\"Lab\",\"Name\":\"GnRP\",\"RGBPoints\":[-1,0,0.266667,0.105882,-0.87451,0.066436,0.394617,0.174779,-0.74902,0.168858,0.524567,0.25767,-0.623529,0.323875,0.657439,0.361015,-0.498039,0.504883,0.772318,0.506344,-0.372549,0.678431,0.870127,0.654902,-0.247059,0.803922,0.921799,0.780392,-0.121569,0.897116,0.951942,0.882814,0.00392157,0.967397,0.965936,0.967474,0.129412,0.928028,0.879815,0.930565,0.254902,0.866052,0.780777,0.882891,0.380392,0.77501,0.665129,0.821376,0.505882,0.675663,0.537024,0.737024,0.631373,0.57847,0.396155,0.645982,0.756863,0.492349,0.223914,0.547559,0.882353,0.375548,0.096886,0.423299,1,0.25098,0,0.294118]},{\"ColorSpace\":\"Lab\",\"Name\":\"GYPi\",\"RGBPoints\":[-1,0.152941,0.392157,0.098039,-0.87451,0.246444,0.505344,0.117724,-0.74902,0.351942,0.614533,0.161399,-0.623529,0.474971,0.717878,0.240138,-0.498039,0.611995,0.811226,0.392849,-0.372549,0.746328,0.893118,0.565321,-0.247059,0.859516,0.94233,0.747405,-0.121569,0.928105,0.96386,0.875663,0.00392157,0.969089,0.966859,0.968012,0.129412,0.983852,0.910265,0.948328,0.254902,0.979239,0.833218,0.914648,0.380392,0.949712,0.729873,0.862976,0.505882,0.905652,0.58293,0.763552,0.631373,0.85521,0.410073,0.652211,0.756863,0.793695,0.183699,0.531642,0.882353,0.683737,0.063899,0.420761,1,0.556863,0.003922,0.321569]},{\"ColorSpace\":\"Lab\",\"Name\":\"GnYlRd\",\"RGBPoints\":[-1,0,0.407843,0.215686,-0.87451,0.063975,0.525952,0.277201,-0.74902,0.177932,0.633064,0.332718,-0.623529,0.364937,0.724106,0.379469,-0.498039,0.527951,0.797155,0.40223,-0.372549,0.678431,0.862822,0.433449,-0.247059,0.803922,0.916955,0.514648,-0.121569,0.909419,0.961861,0.625067,0.00392157,0.999923,0.997616,0.745021,0.129412,0.997463,0.921338,0.61707,0.254902,0.995002,0.824606,0.499885,0.380392,0.992541,0.701576,0.39654,0.505882,0.973472,0.547405,0.318108,0.631373,0.939023,0.389927,0.245521,0.756863,0.867666,0.239831,0.176624,0.882353,0.762399,0.110727,0.151326,1,0.647059,0,0.14902]},{\"ColorSpace\":\"Lab\",\"Name\":\"GBBr\",\"RGBPoints\":[-1,0,0.235294,0.188235,-0.87451,0.002461,0.338639,0.301423,-0.74902,0.055902,0.448981,0.417609,-0.623529,0.183852,0.56955,0.538178,-0.498039,0.357785,0.700115,0.660746,-0.372549,0.540177,0.819531,0.77624,-0.247059,0.714879,0.890888,0.864821,-0.121569,0.851134,0.934564,0.922645,0.00392157,0.960861,0.959785,0.95694,0.129412,0.963322,0.927797,0.83391,0.254902,0.939946,0.868897,0.68935,0.380392,0.883353,0.775394,0.517109,0.505882,0.808074,0.625836,0.324106,0.631373,0.717647,0.476355,0.15494,0.756863,0.592157,0.358247,0.06882,0.882353,0.458593,0.26436,0.031142,1,0.329412,0.188235,0.019608]},{\"ColorSpace\":\"Lab\",\"Name\":\"PuOr\",\"RGBPoints\":[-1,0.498039,0.231373,0.031373,-0.87451,0.62599,0.30273,0.026451,-0.74902,0.746943,0.387082,0.037524,-0.623529,0.85767,0.490427,0.071972,-0.498039,0.936409,0.617762,0.236371,-0.372549,0.992695,0.743099,0.43291,-0.247059,0.995156,0.841523,0.63714,-0.121569,0.985313,0.913802,0.813687,0.00392157,0.966244,0.966398,0.967705,0.129412,0.889965,0.89504,0.938178,0.254902,0.806151,0.804306,0.894656,0.380392,0.712649,0.688658,0.833141,0.505882,0.594233,0.554325,0.744637,0.631373,0.474894,0.404229,0.652364,0.756863,0.366628,0.217224,0.563783,0.882353,0.266436,0.089965,0.434833,1,0.176471,0,0.294118]},{\"ColorSpace\":\"Lab\",\"Name\":\"PRGn\",\"RGBPoints\":[-1,0.25098,0,0.294118,-0.87451,0.383852,0.103345,0.431911,-0.74902,0.497732,0.234679,0.55371,-0.623529,0.583852,0.40692,0.652134,-0.498039,0.681968,0.545175,0.742561,-0.372549,0.7807,0.672357,0.825221,-0.247059,0.871742,0.788005,0.886736,-0.121569,0.930488,0.885198,0.932872,0.00392157,0.966321,0.968089,0.965859,0.129412,0.892503,0.950865,0.877278,0.254902,0.796078,0.91857,0.772549,0.380392,0.670588,0.866897,0.647059,0.505882,0.493195,0.765398,0.496655,0.631373,0.314187,0.649135,0.354556,0.756863,0.15917,0.516263,0.251211,0.882353,0.062284,0.386621,0.170473,1,0,0.266667,0.105882]},{\"ColorSpace\":\"Lab\",\"Name\":\"PiYG\",\"RGBPoints\":[-1,0.556863,0.003922,0.321569,-0.87451,0.692195,0.067897,0.427374,-0.74902,0.797539,0.197847,0.539177,-0.623529,0.859054,0.424221,0.659746,-0.498039,0.908574,0.592618,0.770319,-0.372549,0.951557,0.736332,0.866205,-0.247059,0.981084,0.839677,0.917878,-0.121569,0.98293,0.913802,0.949558,0.00392157,0.96732,0.968474,0.965629,0.129412,0.92549,0.963552,0.869666,0.254902,0.852441,0.939254,0.736025,0.380392,0.739254,0.890042,0.553941,0.505882,0.60323,0.805536,0.382238,0.631373,0.467282,0.711419,0.235217,0.756863,0.344252,0.608074,0.156478,0.882353,0.2406,0.49827,0.116494,1,0.152941,0.392157,0.098039]},{\"ColorSpace\":\"Lab\",\"Name\":\"OrPu\",\"RGBPoints\":[-1,0.176471,0,0.294118,-0.87451,0.272434,0.095963,0.444214,-0.74902,0.373395,0.228912,0.56932,-0.623529,0.481661,0.415917,0.657901,-0.498039,0.601922,0.562937,0.750481,-0.372549,0.718493,0.695886,0.836986,-0.247059,0.811995,0.811534,0.898501,-0.121569,0.894733,0.8995,0.940023,0.00392157,0.969166,0.966859,0.963629,0.129412,0.98639,0.910265,0.803691,0.254902,0.995002,0.835371,0.624375,0.380392,0.992541,0.736947,0.420146,0.505882,0.931949,0.609458,0.224221,0.631373,0.85075,0.483968,0.069819,0.756863,0.740023,0.380623,0.035371,0.882353,0.617993,0.29827,0.026759,1,0.498039,0.231373,0.031373]},{\"ColorSpace\":\"Lab\",\"Name\":\"BrBG\",\"RGBPoints\":[-1,0.329412,0.188235,0.019608,-0.87451,0.467205,0.269435,0.031911,-0.74902,0.6,0.365629,0.074202,-0.623529,0.72549,0.483737,0.160323,-0.498039,0.812995,0.635832,0.336409,-0.372549,0.88689,0.781238,0.527874,-0.247059,0.943483,0.87474,0.700115,-0.121569,0.963168,0.929796,0.841599,0.00392157,0.957247,0.959938,0.959554,0.129412,0.84406,0.932872,0.920185,0.254902,0.70396,0.886428,0.859285,0.380392,0.529258,0.815071,0.770704,0.505882,0.346251,0.691811,0.653057,0.631373,0.175855,0.562015,0.530642,0.756863,0.047905,0.441446,0.410073,0.882353,0.002307,0.33218,0.294348,1,0,0.235294,0.188235]},{\"ColorSpace\":\"Lab\",\"Name\":\"GyRd\",\"RGBPoints\":[-1,0.101961,0.101961,0.101961,-0.87451,0.227451,0.227451,0.227451,-0.74902,0.359939,0.359939,0.359939,-0.623529,0.502653,0.502653,0.502653,-0.498039,0.631373,0.631373,0.631373,-0.372549,0.749865,0.749865,0.749865,-0.247059,0.843368,0.843368,0.843368,-0.121569,0.926105,0.926105,0.926105,0.00392157,0.999846,0.997232,0.995694,0.129412,0.994925,0.908651,0.857901,0.254902,0.982468,0.800692,0.706113,0.380392,0.960323,0.66782,0.536332,0.505882,0.894579,0.503806,0.399769,0.631373,0.81707,0.33218,0.281046,0.756863,0.728489,0.155017,0.197386,0.882353,0.576932,0.055363,0.14925,1,0.403922,0,0.121569]},{\"ColorSpace\":\"Lab\",\"Name\":\"erdc_divHi_purpleGreen\",\"RGBPoints\":[-1,0.297553,0,0.489074,-0.87451,0.40259,0.151146,0.567754,-0.74902,0.516038,0.284843,0.658231,-0.623529,0.629783,0.423646,0.750938,-0.498039,0.735198,0.563697,0.835956,-0.372549,0.82408,0.695541,0.903582,-0.247059,0.889091,0.807454,0.944862,-0.121569,0.92334,0.886917,0.951839,0.00392157,0.921045,0.921084,0.921003,0.129412,0.877324,0.907455,0.845381,0.254902,0.797649,0.849713,0.734695,0.380392,0.691646,0.75964,0.600532,0.505882,0.568981,0.649159,0.453807,0.631373,0.438945,0.529756,0.304259,0.756863,0.30973,0.412001,0.158303,0.882353,0.187078,0.305111,0.00251458,1,0.101655,0.220836,0]},{\"ColorSpace\":\"Lab\",\"Name\":\"erdc_divHi_purpleGreen_dim\",\"RGBPoints\":[-1,0.404088,0.131038,0.592767,-0.87451,0.486469,0.230957,0.651243,-0.74902,0.575165,0.339335,0.717723,-0.623529,0.662741,0.454332,0.784263,-0.498039,0.742071,0.570213,0.842918,-0.372549,0.806935,0.678992,0.886227,-0.247059,0.852219,0.771315,0.90763,-0.121569,0.873345,0.837327,0.901572,0.00392157,0.866783,0.86682,0.866745,0.129412,0.82839,0.858225,0.796812,0.254902,0.762578,0.814287,0.700202,0.380392,0.676429,0.744229,0.585735,0.505882,0.577033,0.65732,0.461526,0.631373,0.47128,0.562476,0.33476,0.756863,0.365461,0.467957,0.21076,0.882353,0.264758,0.381138,0.0878313,1,0.182591,0.312249,0]},{\"ColorSpace\":\"Lab\",\"Name\":\"erdc_divLow_icePeach\",\"RGBPoints\":[-1,0.480048,0.817441,0.998056,-0.87451,0.425898,0.726921,0.883187,-0.74902,0.366682,0.629445,0.761936,-0.623529,0.308756,0.531002,0.640217,-0.498039,0.258021,0.43705,0.523433,-0.372549,0.219244,0.352381,0.416348,-0.247059,0.195127,0.281032,0.322979,-0.121569,0.186286,0.22627,0.246525,0.00392157,0.192352,0.19236,0.192364,0.129412,0.255927,0.214469,0.191756,0.254902,0.340459,0.254426,0.206666,0.380392,0.444655,0.309315,0.234029,0.505882,0.565353,0.376004,0.270969,0.631373,0.697917,0.450748,0.314293,0.756863,0.836657,0.529064,0.360227,0.882353,0.972695,0.614884,0.413123,1,1,0.705904,0.472699]},{\"ColorSpace\":\"Lab\",\"Name\":\"erdc_divLow_purpleGreen\",\"RGBPoints\":[-1,0.956034,0.666487,0.952663,-0.87451,0.874457,0.572698,0.936352,-0.74902,0.753465,0.488253,0.909063,-0.623529,0.63309,0.413507,0.763833,-0.498039,0.514491,0.345878,0.620015,-0.372549,0.405008,0.288141,0.484376,-0.247059,0.311388,0.241986,0.363556,-0.121569,0.238722,0.209044,0.263449,0.00392157,0.192352,0.192366,0.192362,0.129412,0.200379,0.233201,0.168618,0.254902,0.230151,0.291737,0.165227,0.380392,0.279481,0.366076,0.178607,0.505882,0.344927,0.453267,0.205703,0.631373,0.421554,0.549449,0.242643,0.756863,0.503334,0.649999,0.284377,0.882353,0.583497,0.749672,0.324969,1,0.650705,0.837228,0.356264]},{\"ColorSpace\":\"Lab\",\"Name\":\"Haze_green\",\"RGBPoints\":[-1,1,0.835294,0.886275,-0.87451,0.937255,0.756863,0.870443,-0.74902,0.875817,0.666376,0.857807,-0.623529,0.778359,0.583007,0.808134,-0.498039,0.676253,0.494118,0.745098,-0.372549,0.561365,0.390123,0.682353,-0.247059,0.438344,0.262745,0.621496,-0.121569,0.321133,0.141031,0.558751,0.00392157,0.203922,0.0217865,0.495861,0.129412,0.265505,0.129412,0.433261,0.254902,0.311692,0.255338,0.37008,0.380392,0.356282,0.377342,0.310821,0.505882,0.39971,0.488889,0.258243,0.631373,0.442556,0.604357,0.205519,0.756863,0.48671,0.71968,0.152941,0.882353,0.529847,0.830356,0.100944,1,0.572549,0.933333,0.054902]},{\"ColorSpace\":\"Lab\",\"Name\":\"Haze_lime\",\"RGBPoints\":[-1,0.704034,0.784196,1,-0.87451,0.633111,0.691418,0.956078,-0.74902,0.564021,0.600606,0.912157,-0.623529,0.496827,0.51189,0.868235,-0.498039,0.43157,0.425416,0.824314,-0.372549,0.368248,0.341347,0.780392,-0.247059,0.306767,0.259855,0.736471,-0.121569,0.246862,0.181069,0.692549,0.00392157,0.191619,0.109542,0.648627,0.129412,0.257404,0.194031,0.604706,0.254902,0.321794,0.278775,0.560784,0.380392,0.387909,0.364617,0.516863,0.505882,0.456569,0.451881,0.472941,0.631373,0.527424,0.540773,0.42902,0.756863,0.599759,0.631427,0.385098,0.882353,0.673065,0.723898,0.341176,1,0.742751,0.812252,0.3]},{\"ColorSpace\":\"RGB\",\"Name\":\"Haze\",\"RGBPoints\":[-1,1,0.835294,0.996078,-0.00392157,0.023529,0.141176,0.498039,0.00392157,0.015686,0.137255,0.494118,1,0.984314,0.764706,0]},{\"ColorSpace\":\"Lab\",\"Name\":\"Haze_cyan\",\"RGBPoints\":[-1,0.956863,1,0.835294,-0.87451,0.933188,0.921714,0.760784,-0.74902,0.870588,0.803486,0.671605,-0.623529,0.807843,0.684096,0.583297,-0.498039,0.745098,0.569208,0.494118,-0.372549,0.682353,0.437763,0.390123,-0.247059,0.621496,0.288163,0.262745,-0.121569,0.558751,0.144517,0.141031,0.00392157,0.495861,0.0217865,0.0413943,0.129412,0.433261,0.137255,0.129412,0.254902,0.37008,0.263181,0.255338,0.380392,0.306318,0.381845,0.372694,0.505882,0.243137,0.503994,0.494263,0.631373,0.180392,0.629484,0.619753,0.756863,0.117647,0.754975,0.747131,0.882353,0.054902,0.876398,0.866812,1,0,0.988235,0.976471]},{\"ColorSpace\":\"Lab\",\"Name\":\"nic_Edge\",\"RGBPoints\":[-1,0.191208,0.191208,0.191208,-0.87451,0.239484,0.00545035,0.614821,-0.74902,0.220593,0.0617459,0.863547,-0.623529,0.17509,0.278988,0.97794,-0.498039,0.143526,0.576069,0.998553,-0.372549,0.166456,0.871883,0.96594,-0.247059,0.376202,0.993555,0.981833,-0.121569,0.681996,0.991297,0.999239,0.00392157,0.954172,0.952734,0.94374,0.129412,0.999735,0.99301,0.662896,0.254902,0.979399,0.991466,0.357973,0.380392,0.968771,0.854967,0.162659,0.505882,0.999245,0.556697,0.144323,0.631373,0.973959,0.26223,0.177946,0.756863,0.852358,0.0526707,0.222974,0.882353,0.593889,0.00912724,0.238855,1,0.191208,0.191208,0.191208]},{\"ColorSpace\":\"Lab\",\"Name\":\"erdc_iceFire_H\",\"RGBPoints\":[-1,4.05432e-7,0,0.00000590122,-0.87451,0,0.120401,0.302675,-0.74902,0,0.216583,0.524574,-0.623529,0.0552475,0.345025,0.6595,-0.498039,0.128047,0.492588,0.720288,-0.372549,0.188955,0.641309,0.792092,-0.247059,0.327673,0.784935,0.873434,-0.121569,0.60824,0.892164,0.935547,0.00392157,0.881371,0.912178,0.818099,0.129412,0.951407,0.835621,0.449279,0.254902,0.904481,0.690489,0,0.380392,0.85407,0.510864,0,0.505882,0.777093,0.33018,0.00088199,0.631373,0.672862,0.139087,0.00269398,0.756863,0.508815,0,0,0.882353,0.299417,0.000366289,0.000547829,1,0.0157519,0.00332021,4.55569e-8]},{\"ColorSpace\":\"Lab\",\"Name\":\"erdc_iceFire_L\",\"RGBPoints\":[-1,0.870485,0.913768,0.832905,-0.87451,0.586919,0.887865,0.934003,-0.74902,0.31583,0.776442,0.867858,-0.623529,0.18302,0.632034,0.787722,-0.498039,0.117909,0.484134,0.713825,-0.372549,0.0507239,0.335979,0.654741,-0.247059,0,0.209874,0.511832,-0.121569,0,0.114689,0.28935,0.00392157,0.0157519,0.00332021,4.55569e-8,0.129412,0.312914,0,0,0.254902,0.520865,0,0,0.380392,0.680105,0.15255,0.0025996,0.505882,0.785109,0.339479,0.000797922,0.631373,0.857354,0.522494,0,0.756863,0.910974,0.699774,0,0.882353,0.951921,0.842817,0.478545,1,0.881371,0.912178,0.818099]},{\"ColorSpace\":\"RGB\",\"Name\":\"hsv\",\"RGBPoints\":[-1,1,0,0,-0.666666,1,0,1,-0.333333,0,0,1,0,0,1,1,0.33333,0,1,0,0.66666,1,1,0,1,1,0,0]},{\"ColorSpace\":\"Lab\",\"Name\":\"hue_L60\",\"RGBPoints\":[-1,0.964784,0.400592,0.349549,-0.87451,0.964915,0.372498,0.53785,-0.74902,0.892353,0.401039,0.759569,-0.623529,0.79263,0.446956,0.903017,-0.498039,0.682208,0.49954,0.966673,-0.372549,0.56392,0.553082,0.968836,-0.247059,0.442031,0.606396,0.901601,-0.121569,0.305499,0.65701,0.765784,0.00392157,0.197251,0.687914,0.620914,0.129412,0.193882,0.701887,0.472654,0.254902,0.249866,0.706123,0.320005,0.380392,0.35132,0.697417,0.202919,0.505882,0.498097,0.669467,0.125232,0.631373,0.637477,0.626239,0.107431,0.756863,0.762115,0.56872,0.155812,0.882353,0.889434,0.481116,0.240445,1,0.964784,0.400592,0.349549]},{\"IndexedColors\":[0,0,0,0.8941176470588236,0.1019607843137255,0.1098039215686274,0.2156862745098039,0.4941176470588236,0.7215686274509804,0.3019607843137255,0.6862745098039216,0.2901960784313726,0.596078431372549,0.3058823529411765,0.6392156862745098,1,0.4980392156862745,0,0.6509803921568628,0.3372549019607843,0.1568627450980392],\"Name\":\"Spectrum\",\"NanColor\":[0.6509803921568628,0.3372549019607843,0.1568627450980392]},{\"IndexedColors\":[0.4745098039215686,0.09019607843137255,0.09019607843137255,0.7098039215686275,0.00392156862745098,0.00392156862745098,0.9372549019607843,0.2784313725490196,0.09803921568627451,0.9764705882352941,0.5137254901960784,0.1411764705882353,1,0.7058823529411765,0,1,0.8980392156862745,0.02352941176470588],\"Name\":\"Warm\",\"NanColor\":[1,0.8980392156862745,0.02352941176470588]},{\"IndexedColors\":[0.4588235294117647,0.6941176470588235,0.00392156862745098,0.3450980392156863,0.5019607843137255,0.1607843137254902,0.3137254901960784,0.8431372549019608,0.7490196078431373,0.1098039215686274,0.5843137254901961,0.803921568627451,0.2313725490196079,0.407843137254902,0.6705882352941176,0.6039215686274509,0.407843137254902,1,0.3725490196078431,0.2,0.5019607843137255],\"Name\":\"Cool\",\"NanColor\":[0.3725490196078431,0.2,0.5019607843137255]},{\"IndexedColors\":[0.2313725490196079,0.407843137254902,0.6705882352941176,0.1098039215686274,0.5843137254901961,0.803921568627451,0.3058823529411765,0.8509803921568627,0.9176470588235294,0.4509803921568628,0.6039215686274509,0.8352941176470589,0.2588235294117647,0.2392156862745098,0.6627450980392157,0.3137254901960784,0.3294117647058823,0.5294117647058824,0.06274509803921569,0.1647058823529412,0.3215686274509804],\"Name\":\"Blues\",\"NanColor\":[0.06274509803921569,0.1647058823529412,0.3215686274509804]},{\"IndexedColors\":[0.1098039215686274,0.5843137254901961,0.803921568627451,0.2313725490196079,0.407843137254902,0.6705882352941176,0.4,0.2431372549019608,0.7176470588235294,0.6352941176470588,0.3294117647058823,0.8117647058823529,0.8705882352941177,0.3803921568627451,0.807843137254902,0.8627450980392157,0.3803921568627451,0.5843137254901961,0.2392156862745098,0.06274509803921569,0.3215686274509804],\"Name\":\"Wild Flower\",\"NanColor\":[0.2392156862745098,0.06274509803921569,0.3215686274509804]},{\"IndexedColors\":[0.396078431372549,0.4862745098039216,0.2156862745098039,0.4588235294117647,0.6941176470588235,0.00392156862745098,0.6980392156862745,0.7294117647058823,0.1882352941176471,1,0.8980392156862745,0.02352941176470588,1,0.7058823529411765,0,0.9764705882352941,0.5137254901960784,0.1411764705882353],\"Name\":\"Citrus\",\"NanColor\":[0.9764705882352941,0.5137254901960784,0.1411764705882353]},{\"IndexedColors\":[0.4980392156862745,0.2313725490196079,0.03137254901960784,0.7019607843137254,0.3450980392156863,0.02352941176470588,0.8784313725490196,0.5098039215686274,0.0784313725490196,0.9921568627450981,0.7215686274509804,0.3882352941176471,0.996078431372549,0.8784313725490196,0.7137254901960784,0.9686274509803922,0.9686274509803922,0.9686274509803922,0.8470588235294118,0.8549019607843137,0.9215686274509803,0.6980392156862745,0.6705882352941176,0.8235294117647058,0.5019607843137255,0.4509803921568628,0.6745098039215687,0.3294117647058823,0.1529411764705882,0.5333333333333333,0.1764705882352941,0,0.2941176470588235],\"Name\":\"Brewer Diverging Purple-Orange (11)\",\"NanColor\":[0.1764705882352941,0,0.2941176470588235]},{\"IndexedColors\":[0.4980392156862745,0.2313725490196079,0.03137254901960784,0.7019607843137254,0.3450980392156863,0.02352941176470588,0.8784313725490196,0.5098039215686274,0.0784313725490196,0.9921568627450981,0.7215686274509804,0.3882352941176471,0.996078431372549,0.8784313725490196,0.7137254901960784,0.8470588235294118,0.8549019607843137,0.9215686274509803,0.6980392156862745,0.6705882352941176,0.8235294117647058,0.5019607843137255,0.4509803921568628,0.6745098039215687,0.3294117647058823,0.1529411764705882,0.5333333333333333,0.1764705882352941,0,0.2941176470588235],\"Name\":\"Brewer Diverging Purple-Orange (10)\",\"NanColor\":[0.1764705882352941,0,0.2941176470588235]},{\"IndexedColors\":[0.7019607843137254,0.3450980392156863,0.02352941176470588,0.8784313725490196,0.5098039215686274,0.0784313725490196,0.9921568627450981,0.7215686274509804,0.3882352941176471,0.996078431372549,0.8784313725490196,0.7137254901960784,0.9686274509803922,0.9686274509803922,0.9686274509803922,0.8470588235294118,0.8549019607843137,0.9215686274509803,0.6980392156862745,0.6705882352941176,0.8235294117647058,0.5019607843137255,0.4509803921568628,0.6745098039215687,0.3294117647058823,0.1529411764705882,0.5333333333333333],\"Name\":\"Brewer Diverging Purple-Orange (9)\",\"NanColor\":[0.3294117647058823,0.1529411764705882,0.5333333333333333]},{\"IndexedColors\":[0.7019607843137254,0.3450980392156863,0.02352941176470588,0.8784313725490196,0.5098039215686274,0.0784313725490196,0.9921568627450981,0.7215686274509804,0.3882352941176471,0.996078431372549,0.8784313725490196,0.7137254901960784,0.8470588235294118,0.8549019607843137,0.9215686274509803,0.6980392156862745,0.6705882352941176,0.8235294117647058,0.5019607843137255,0.4509803921568628,0.6745098039215687,0.3294117647058823,0.1529411764705882,0.5333333333333333],\"Name\":\"Brewer Diverging Purple-Orange (8)\",\"NanColor\":[0.3294117647058823,0.1529411764705882,0.5333333333333333]},{\"IndexedColors\":[0.7019607843137254,0.3450980392156863,0.02352941176470588,0.9450980392156862,0.6392156862745098,0.2509803921568627,0.996078431372549,0.8784313725490196,0.7137254901960784,0.9686274509803922,0.9686274509803922,0.9686274509803922,0.8470588235294118,0.8549019607843137,0.9215686274509803,0.6,0.5568627450980392,0.7647058823529411,0.3294117647058823,0.1529411764705882,0.5333333333333333],\"Name\":\"Brewer Diverging Purple-Orange (7)\",\"NanColor\":[0.3294117647058823,0.1529411764705882,0.5333333333333333]},{\"IndexedColors\":[0.7019607843137254,0.3450980392156863,0.02352941176470588,0.9450980392156862,0.6392156862745098,0.2509803921568627,0.996078431372549,0.8784313725490196,0.7137254901960784,0.8470588235294118,0.8549019607843137,0.9215686274509803,0.6,0.5568627450980392,0.7647058823529411,0.3294117647058823,0.1529411764705882,0.5333333333333333],\"Name\":\"Brewer Diverging Purple-Orange (6)\",\"NanColor\":[0.3294117647058823,0.1529411764705882,0.5333333333333333]},{\"IndexedColors\":[0.9019607843137255,0.3803921568627451,0.00392156862745098,0.9921568627450981,0.7215686274509804,0.3882352941176471,0.9686274509803922,0.9686274509803922,0.9686274509803922,0.6980392156862745,0.6705882352941176,0.8235294117647058,0.3686274509803922,0.2352941176470588,0.6],\"Name\":\"Brewer Diverging Purple-Orange (5)\",\"NanColor\":[0.3686274509803922,0.2352941176470588,0.6]},{\"IndexedColors\":[0.9019607843137255,0.3803921568627451,0.00392156862745098,0.9921568627450981,0.7215686274509804,0.3882352941176471,0.6980392156862745,0.6705882352941176,0.8235294117647058,0.3686274509803922,0.2352941176470588,0.6],\"Name\":\"Brewer Diverging Purple-Orange (4)\",\"NanColor\":[0.3686274509803922,0.2352941176470588,0.6]},{\"IndexedColors\":[0.9450980392156862,0.6392156862745098,0.2509803921568627,0.9686274509803922,0.9686274509803922,0.9686274509803922,0.6,0.5568627450980392,0.7647058823529411],\"Name\":\"Brewer Diverging Purple-Orange (3)\",\"NanColor\":[0.6,0.5568627450980392,0.7647058823529411]},{\"IndexedColors\":[0.6196078431372549,0.00392156862745098,0.2588235294117647,0.8352941176470589,0.2431372549019608,0.3098039215686275,0.9568627450980393,0.4274509803921568,0.2627450980392157,0.9921568627450981,0.6823529411764706,0.3803921568627451,0.996078431372549,0.8784313725490196,0.5450980392156862,1,1,0.7490196078431373,0.9019607843137255,0.9607843137254902,0.596078431372549,0.6705882352941176,0.8666666666666667,0.6431372549019608,0.4,0.7607843137254902,0.6470588235294118,0.196078431372549,0.5333333333333333,0.7411764705882353,0.3686274509803922,0.3098039215686275,0.6352941176470588],\"Name\":\"Brewer Diverging Spectral (11)\",\"NanColor\":[0.3686274509803922,0.3098039215686275,0.6352941176470588]},{\"IndexedColors\":[0.6196078431372549,0.00392156862745098,0.2588235294117647,0.8352941176470589,0.2431372549019608,0.3098039215686275,0.9568627450980393,0.4274509803921568,0.2627450980392157,0.9921568627450981,0.6823529411764706,0.3803921568627451,0.996078431372549,0.8784313725490196,0.5450980392156862,0.9019607843137255,0.9607843137254902,0.596078431372549,0.6705882352941176,0.8666666666666667,0.6431372549019608,0.4,0.7607843137254902,0.6470588235294118,0.196078431372549,0.5333333333333333,0.7411764705882353,0.3686274509803922,0.3098039215686275,0.6352941176470588],\"Name\":\"Brewer Diverging Spectral (10)\",\"NanColor\":[0.3686274509803922,0.3098039215686275,0.6352941176470588]},{\"IndexedColors\":[0.8352941176470589,0.2431372549019608,0.3098039215686275,0.9568627450980393,0.4274509803921568,0.2627450980392157,0.9921568627450981,0.6823529411764706,0.3803921568627451,0.996078431372549,0.8784313725490196,0.5450980392156862,1,1,0.7490196078431373,0.9019607843137255,0.9607843137254902,0.596078431372549,0.6705882352941176,0.8666666666666667,0.6431372549019608,0.4,0.7607843137254902,0.6470588235294118,0.196078431372549,0.5333333333333333,0.7411764705882353],\"Name\":\"Brewer Diverging Spectral (9)\",\"NanColor\":[0.196078431372549,0.5333333333333333,0.7411764705882353]},{\"IndexedColors\":[0.8352941176470589,0.2431372549019608,0.3098039215686275,0.9568627450980393,0.4274509803921568,0.2627450980392157,0.9921568627450981,0.6823529411764706,0.3803921568627451,0.996078431372549,0.8784313725490196,0.5450980392156862,0.9019607843137255,0.9607843137254902,0.596078431372549,0.6705882352941176,0.8666666666666667,0.6431372549019608,0.4,0.7607843137254902,0.6470588235294118,0.196078431372549,0.5333333333333333,0.7411764705882353],\"Name\":\"Brewer Diverging Spectral (8)\",\"NanColor\":[0.196078431372549,0.5333333333333333,0.7411764705882353]},{\"IndexedColors\":[0.8352941176470589,0.2431372549019608,0.3098039215686275,0.9882352941176471,0.5529411764705883,0.3490196078431372,0.996078431372549,0.8784313725490196,0.5450980392156862,1,1,0.7490196078431373,0.9019607843137255,0.9607843137254902,0.596078431372549,0.6,0.8352941176470589,0.5803921568627451,0.196078431372549,0.5333333333333333,0.7411764705882353],\"Name\":\"Brewer Diverging Spectral (7)\",\"NanColor\":[0.196078431372549,0.5333333333333333,0.7411764705882353]},{\"IndexedColors\":[0.8352941176470589,0.2431372549019608,0.3098039215686275,0.9882352941176471,0.5529411764705883,0.3490196078431372,0.996078431372549,0.8784313725490196,0.5450980392156862,0.9019607843137255,0.9607843137254902,0.596078431372549,0.6,0.8352941176470589,0.5803921568627451,0.196078431372549,0.5333333333333333,0.7411764705882353],\"Name\":\"Brewer Diverging Spectral (6)\",\"NanColor\":[0.196078431372549,0.5333333333333333,0.7411764705882353]},{\"IndexedColors\":[0.8431372549019608,0.09803921568627451,0.1098039215686274,0.9921568627450981,0.6823529411764706,0.3803921568627451,1,1,0.7490196078431373,0.6705882352941176,0.8666666666666667,0.6431372549019608,0.1686274509803922,0.5137254901960784,0.7294117647058823],\"Name\":\"Brewer Diverging Spectral (5)\",\"NanColor\":[0.1686274509803922,0.5137254901960784,0.7294117647058823]},{\"IndexedColors\":[0.8431372549019608,0.09803921568627451,0.1098039215686274,0.9921568627450981,0.6823529411764706,0.3803921568627451,0.6705882352941176,0.8666666666666667,0.6431372549019608,0.1686274509803922,0.5137254901960784,0.7294117647058823],\"Name\":\"Brewer Diverging Spectral (4)\",\"NanColor\":[0.1686274509803922,0.5137254901960784,0.7294117647058823]},{\"IndexedColors\":[0.9882352941176471,0.5529411764705883,0.3490196078431372,1,1,0.7490196078431373,0.6,0.8352941176470589,0.5803921568627451],\"Name\":\"Brewer Diverging Spectral (3)\",\"NanColor\":[0.6,0.8352941176470589,0.5803921568627451]},{\"IndexedColors\":[0.3294117647058823,0.1882352941176471,0.0196078431372549,0.5490196078431373,0.3176470588235294,0.0392156862745098,0.7490196078431373,0.5058823529411764,0.1764705882352941,0.8745098039215686,0.7607843137254902,0.4901960784313725,0.9647058823529412,0.9098039215686274,0.7647058823529411,0.9607843137254902,0.9607843137254902,0.9607843137254902,0.7803921568627451,0.9176470588235294,0.8980392156862745,0.5019607843137255,0.803921568627451,0.7568627450980392,0.207843137254902,0.592156862745098,0.5607843137254902,0.00392156862745098,0.4,0.3686274509803922,0,0.2352941176470588,0.1882352941176471],\"Name\":\"Brewer Diverging Brown-Blue-Green (11)\",\"NanColor\":[0,0.2352941176470588,0.1882352941176471]},{\"IndexedColors\":[0.3294117647058823,0.1882352941176471,0.0196078431372549,0.5490196078431373,0.3176470588235294,0.0392156862745098,0.7490196078431373,0.5058823529411764,0.1764705882352941,0.8745098039215686,0.7607843137254902,0.4901960784313725,0.9647058823529412,0.9098039215686274,0.7647058823529411,0.7803921568627451,0.9176470588235294,0.8980392156862745,0.5019607843137255,0.803921568627451,0.7568627450980392,0.207843137254902,0.592156862745098,0.5607843137254902,0.00392156862745098,0.4,0.3686274509803922,0,0.2352941176470588,0.1882352941176471],\"Name\":\"Brewer Diverging Brown-Blue-Green (10)\",\"NanColor\":[0,0.2352941176470588,0.1882352941176471]},{\"IndexedColors\":[0.5490196078431373,0.3176470588235294,0.0392156862745098,0.7490196078431373,0.5058823529411764,0.1764705882352941,0.8745098039215686,0.7607843137254902,0.4901960784313725,0.9647058823529412,0.9098039215686274,0.7647058823529411,0.9607843137254902,0.9607843137254902,0.9607843137254902,0.7803921568627451,0.9176470588235294,0.8980392156862745,0.5019607843137255,0.803921568627451,0.7568627450980392,0.207843137254902,0.592156862745098,0.5607843137254902,0.00392156862745098,0.4,0.3686274509803922],\"Name\":\"Brewer Diverging Brown-Blue-Green (9)\",\"NanColor\":[0.00392156862745098,0.4,0.3686274509803922]},{\"IndexedColors\":[0.5490196078431373,0.3176470588235294,0.0392156862745098,0.7490196078431373,0.5058823529411764,0.1764705882352941,0.8745098039215686,0.7607843137254902,0.4901960784313725,0.9647058823529412,0.9098039215686274,0.7647058823529411,0.7803921568627451,0.9176470588235294,0.8980392156862745,0.5019607843137255,0.803921568627451,0.7568627450980392,0.207843137254902,0.592156862745098,0.5607843137254902,0.00392156862745098,0.4,0.3686274509803922],\"Name\":\"Brewer Diverging Brown-Blue-Green (8)\",\"NanColor\":[0.00392156862745098,0.4,0.3686274509803922]},{\"IndexedColors\":[0.5490196078431373,0.3176470588235294,0.0392156862745098,0.8470588235294118,0.7019607843137254,0.396078431372549,0.9647058823529412,0.9098039215686274,0.7647058823529411,0.9607843137254902,0.9607843137254902,0.9607843137254902,0.7803921568627451,0.9176470588235294,0.8980392156862745,0.3529411764705883,0.7058823529411765,0.6745098039215687,0.00392156862745098,0.4,0.3686274509803922],\"Name\":\"Brewer Diverging Brown-Blue-Green (7)\",\"NanColor\":[0.00392156862745098,0.4,0.3686274509803922]},{\"IndexedColors\":[0.5490196078431373,0.3176470588235294,0.0392156862745098,0.8470588235294118,0.7019607843137254,0.396078431372549,0.9647058823529412,0.9098039215686274,0.7647058823529411,0.7803921568627451,0.9176470588235294,0.8980392156862745,0.3529411764705883,0.7058823529411765,0.6745098039215687,0.00392156862745098,0.4,0.3686274509803922],\"Name\":\"Brewer Diverging Brown-Blue-Green (6)\",\"NanColor\":[0.00392156862745098,0.4,0.3686274509803922]},{\"IndexedColors\":[0.6509803921568628,0.3803921568627451,0.1019607843137255,0.8745098039215686,0.7607843137254902,0.4901960784313725,0.9607843137254902,0.9607843137254902,0.9607843137254902,0.5019607843137255,0.803921568627451,0.7568627450980392,0.00392156862745098,0.5215686274509804,0.4431372549019608],\"Name\":\"Brewer Diverging Brown-Blue-Green (5)\",\"NanColor\":[0.00392156862745098,0.5215686274509804,0.4431372549019608]},{\"IndexedColors\":[0.6509803921568628,0.3803921568627451,0.1019607843137255,0.8745098039215686,0.7607843137254902,0.4901960784313725,0.5019607843137255,0.803921568627451,0.7568627450980392,0.00392156862745098,0.5215686274509804,0.4431372549019608],\"Name\":\"Brewer Diverging Brown-Blue-Green (4)\",\"NanColor\":[0.00392156862745098,0.5215686274509804,0.4431372549019608]},{\"IndexedColors\":[0.8470588235294118,0.7019607843137254,0.396078431372549,0.9607843137254902,0.9607843137254902,0.9607843137254902,0.3529411764705883,0.7058823529411765,0.6745098039215687],\"Name\":\"Brewer Diverging Brown-Blue-Green (3)\",\"NanColor\":[0.3529411764705883,0.7058823529411765,0.6745098039215687]},{\"IndexedColors\":[0.9686274509803922,0.9882352941176471,0.9921568627450981,0.8980392156862745,0.9607843137254902,0.9764705882352941,0.8,0.9254901960784314,0.9019607843137255,0.6,0.8470588235294118,0.788235294117647,0.4,0.7607843137254902,0.6431372549019608,0.2549019607843137,0.6823529411764706,0.4627450980392157,0.1372549019607843,0.5450980392156862,0.2705882352941176,0,0.4274509803921568,0.1725490196078431,0,0.2666666666666667,0.1058823529411765],\"Name\":\"Brewer Sequential Blue-Green (9)\",\"NanColor\":[0,0.2666666666666667,0.1058823529411765]},{\"IndexedColors\":[0.9686274509803922,0.9882352941176471,0.9921568627450981,0.8980392156862745,0.9607843137254902,0.9764705882352941,0.8,0.9254901960784314,0.9019607843137255,0.6,0.8470588235294118,0.788235294117647,0.4,0.7607843137254902,0.6431372549019608,0.2549019607843137,0.6823529411764706,0.4627450980392157,0.1372549019607843,0.5450980392156862,0.2705882352941176,0,0.3450980392156863,0.1411764705882353],\"Name\":\"Brewer Sequential Blue-Green (8)\",\"NanColor\":[0,0.3450980392156863,0.1411764705882353]},{\"IndexedColors\":[0.9294117647058824,0.9725490196078431,0.984313725490196,0.8,0.9254901960784314,0.9019607843137255,0.8,0.9254901960784314,0.9019607843137255,0.4,0.7607843137254902,0.6431372549019608,0.2549019607843137,0.6823529411764706,0.4627450980392157,0.1372549019607843,0.5450980392156862,0.2705882352941176,0,0.3450980392156863,0.1411764705882353],\"Name\":\"Brewer Sequential Blue-Green (7)\",\"NanColor\":[0,0.3450980392156863,0.1411764705882353]},{\"IndexedColors\":[0.9294117647058824,0.9725490196078431,0.984313725490196,0.8,0.9254901960784314,0.9019607843137255,0.6,0.8470588235294118,0.788235294117647,0.4,0.7607843137254902,0.6431372549019608,0.1725490196078431,0.6352941176470588,0.3725490196078431,0,0.4274509803921568,0.1725490196078431],\"Name\":\"Brewer Sequential Blue-Green (6)\",\"NanColor\":[0,0.4274509803921568,0.1725490196078431]},{\"IndexedColors\":[0.9294117647058824,0.9725490196078431,0.984313725490196,0.6980392156862745,0.8862745098039215,0.8862745098039215,0.4,0.7607843137254902,0.6431372549019608,0.1725490196078431,0.6352941176470588,0.3725490196078431,0,0.4274509803921568,0.1725490196078431],\"Name\":\"Brewer Sequential Blue-Green (5)\",\"NanColor\":[0,0.4274509803921568,0.1725490196078431]},{\"IndexedColors\":[0.9294117647058824,0.9725490196078431,0.984313725490196,0.6980392156862745,0.8862745098039215,0.8862745098039215,0.4,0.7607843137254902,0.6431372549019608,0.1372549019607843,0.5450980392156862,0.2705882352941176],\"Name\":\"Brewer Sequential Blue-Green (4)\",\"NanColor\":[0.1372549019607843,0.5450980392156862,0.2705882352941176]},{\"IndexedColors\":[0.8980392156862745,0.9607843137254902,0.9764705882352941,0.6,0.8470588235294118,0.788235294117647,0.1725490196078431,0.6352941176470588,0.3725490196078431],\"Name\":\"Brewer Sequential Blue-Green (3)\",\"NanColor\":[0.1725490196078431,0.6352941176470588,0.3725490196078431]},{\"IndexedColors\":[1,1,0.8980392156862745,1,0.9686274509803922,0.7372549019607844,0.996078431372549,0.8901960784313725,0.5686274509803921,0.996078431372549,0.7686274509803922,0.3098039215686275,0.996078431372549,0.6,0.1607843137254902,0.9254901960784314,0.4392156862745098,0.0784313725490196,0.8,0.2980392156862745,0.00784313725490196,0.6,0.203921568627451,0.01568627450980392,0.4,0.1450980392156863,0.02352941176470588],\"Name\":\"Brewer Sequential Yellow-Orange-Brown (9)\",\"NanColor\":[0.4,0.1450980392156863,0.02352941176470588]},{\"IndexedColors\":[1,1,0.8980392156862745,1,0.9686274509803922,0.7372549019607844,0.996078431372549,0.8901960784313725,0.5686274509803921,0.996078431372549,0.7686274509803922,0.3098039215686275,0.996078431372549,0.6,0.1607843137254902,0.9254901960784314,0.4392156862745098,0.0784313725490196,0.8,0.2980392156862745,0.00784313725490196,0.5490196078431373,0.1764705882352941,0.01568627450980392],\"Name\":\"Brewer Sequential Yellow-Orange-Brown (8)\",\"NanColor\":[0.5490196078431373,0.1764705882352941,0.01568627450980392]},{\"IndexedColors\":[1,1,0.8313725490196079,0.996078431372549,0.8901960784313725,0.5686274509803921,0.996078431372549,0.7686274509803922,0.3098039215686275,0.996078431372549,0.6,0.1607843137254902,0.9254901960784314,0.4392156862745098,0.0784313725490196,0.8,0.2980392156862745,0.00784313725490196,0.5490196078431373,0.1764705882352941,0.01568627450980392],\"Name\":\"Brewer Sequential Yellow-Orange-Brown (7)\",\"NanColor\":[0.5490196078431373,0.1764705882352941,0.01568627450980392]},{\"IndexedColors\":[1,1,0.8313725490196079,0.996078431372549,0.8901960784313725,0.5686274509803921,0.996078431372549,0.7686274509803922,0.3098039215686275,0.996078431372549,0.6,0.1607843137254902,0.8509803921568627,0.3725490196078431,0.05490196078431372,0.6,0.203921568627451,0.01568627450980392],\"Name\":\"Brewer Sequential Yellow-Orange-Brown (6)\",\"NanColor\":[0.6,0.203921568627451,0.01568627450980392]},{\"IndexedColors\":[1,1,0.8313725490196079,0.996078431372549,0.8509803921568627,0.5568627450980392,0.996078431372549,0.6,0.1607843137254902,0.8509803921568627,0.3725490196078431,0.05490196078431372,0.6,0.203921568627451,0.01568627450980392],\"Name\":\"Brewer Sequential Yellow-Orange-Brown (5)\",\"NanColor\":[0.6,0.203921568627451,0.01568627450980392]},{\"IndexedColors\":[1,1,0.8313725490196079,0.996078431372549,0.8509803921568627,0.5568627450980392,0.996078431372549,0.6,0.1607843137254902,0.8,0.2980392156862745,0.00784313725490196],\"Name\":\"Brewer Sequential Yellow-Orange-Brown (4)\",\"NanColor\":[0.8,0.2980392156862745,0.00784313725490196]},{\"IndexedColors\":[1,0.9686274509803922,0.7372549019607844,0.996078431372549,0.7686274509803922,0.3098039215686275,0.8509803921568627,0.3725490196078431,0.05490196078431372],\"Name\":\"Brewer Sequential Yellow-Orange-Brown (3)\",\"NanColor\":[0.8509803921568627,0.3725490196078431,0.05490196078431372]},{\"IndexedColors\":[0.9686274509803922,0.9882352941176471,0.9921568627450981,0.8784313725490196,0.9254901960784314,0.9568627450980393,0.7490196078431373,0.8274509803921568,0.9019607843137255,0.6196078431372549,0.7372549019607844,0.8549019607843137,0.5490196078431373,0.5882352941176471,0.7764705882352941,0.5490196078431373,0.4196078431372549,0.6941176470588235,0.5333333333333333,0.2549019607843137,0.615686274509804,0.5058823529411764,0.05882352941176471,0.4862745098039216,0.3019607843137255,0,0.2941176470588235],\"Name\":\"Brewer Sequential Blue-Purple (9)\",\"NanColor\":[0.3019607843137255,0,0.2941176470588235]},{\"IndexedColors\":[0.9686274509803922,0.9882352941176471,0.9921568627450981,0.8784313725490196,0.9254901960784314,0.9568627450980393,0.7490196078431373,0.8274509803921568,0.9019607843137255,0.6196078431372549,0.7372549019607844,0.8549019607843137,0.5490196078431373,0.5882352941176471,0.7764705882352941,0.5490196078431373,0.4196078431372549,0.6941176470588235,0.5333333333333333,0.2549019607843137,0.615686274509804,0.4313725490196079,0.00392156862745098,0.4196078431372549],\"Name\":\"Brewer Sequential Blue-Purple (8)\",\"NanColor\":[0.4313725490196079,0.00392156862745098,0.4196078431372549]},{\"IndexedColors\":[0.9294117647058824,0.9725490196078431,0.984313725490196,0.7490196078431373,0.8274509803921568,0.9019607843137255,0.6196078431372549,0.7372549019607844,0.8549019607843137,0.5490196078431373,0.5882352941176471,0.7764705882352941,0.5490196078431373,0.4196078431372549,0.6941176470588235,0.5333333333333333,0.2549019607843137,0.615686274509804,0.4313725490196079,0.00392156862745098,0.4196078431372549],\"Name\":\"Brewer Sequential Blue-Purple (7)\",\"NanColor\":[0.4313725490196079,0.00392156862745098,0.4196078431372549]},{\"IndexedColors\":[0.9294117647058824,0.9725490196078431,0.984313725490196,0.7490196078431373,0.8274509803921568,0.9019607843137255,0.6196078431372549,0.7372549019607844,0.8549019607843137,0.5490196078431373,0.5882352941176471,0.7764705882352941,0.5333333333333333,0.3372549019607843,0.6549019607843137,0.5058823529411764,0.05882352941176471,0.4862745098039216],\"Name\":\"Brewer Sequential Blue-Purple (6)\",\"NanColor\":[0.5058823529411764,0.05882352941176471,0.4862745098039216]},{\"IndexedColors\":[0.9294117647058824,0.9725490196078431,0.984313725490196,0.7019607843137254,0.803921568627451,0.8901960784313725,0.5490196078431373,0.5882352941176471,0.7764705882352941,0.5333333333333333,0.3372549019607843,0.6549019607843137,0.5058823529411764,0.05882352941176471,0.4862745098039216],\"Name\":\"Brewer Sequential Blue-Purple (5)\",\"NanColor\":[0.5058823529411764,0.05882352941176471,0.4862745098039216]},{\"IndexedColors\":[0.9294117647058824,0.9725490196078431,0.984313725490196,0.7019607843137254,0.803921568627451,0.8901960784313725,0.5490196078431373,0.5882352941176471,0.7764705882352941,0.5333333333333333,0.2549019607843137,0.615686274509804],\"Name\":\"Brewer Sequential Blue-Purple (4)\",\"NanColor\":[0.5333333333333333,0.2549019607843137,0.615686274509804]},{\"IndexedColors\":[0.8784313725490196,0.9254901960784314,0.9568627450980393,0.6196078431372549,0.7372549019607844,0.8549019607843137,0.5333333333333333,0.3372549019607843,0.6549019607843137],\"Name\":\"Brewer Sequential Blue-Purple (3)\",\"NanColor\":[0.5333333333333333,0.3372549019607843,0.6549019607843137]},{\"IndexedColors\":[0.4980392156862745,0.788235294117647,0.4980392156862745,0.7450980392156863,0.6823529411764706,0.8313725490196079,0.9921568627450981,0.7529411764705882,0.5254901960784314,1,1,0.6,0.2196078431372549,0.4235294117647059,0.6901960784313725,0.9411764705882353,0.00784313725490196,0.4980392156862745,0.7490196078431373,0.3568627450980392,0.09019607843137255,0.4,0.4,0.4],\"Name\":\"Brewer Qualitative Accent\",\"NanColor\":[0.4,0.4,0.4]},{\"IndexedColors\":[0.1058823529411765,0.6196078431372549,0.4666666666666667,0.8509803921568627,0.3725490196078431,0.00784313725490196,0.4588235294117647,0.4392156862745098,0.7019607843137254,0.9058823529411765,0.1607843137254902,0.5411764705882353,0.4,0.6509803921568628,0.1176470588235294,0.9019607843137255,0.6705882352941176,0.00784313725490196,0.6509803921568628,0.4627450980392157,0.1137254901960784,0.4,0.4,0.4],\"Name\":\"Brewer Qualitative Dark2\",\"NanColor\":[0.4,0.4,0.4]},{\"IndexedColors\":[0.4,0.7607843137254902,0.6470588235294118,0.9882352941176471,0.5529411764705883,0.3843137254901961,0.5529411764705883,0.6274509803921569,0.796078431372549,0.9058823529411765,0.5411764705882353,0.7647058823529411,0.6509803921568628,0.8470588235294118,0.3294117647058823,1,0.8509803921568627,0.1843137254901961,0.8980392156862745,0.7686274509803922,0.5803921568627451,0.7019607843137254,0.7019607843137254,0.7019607843137254],\"Name\":\"Brewer Qualitative Set2\",\"NanColor\":[0.7019607843137254,0.7019607843137254,0.7019607843137254]},{\"IndexedColors\":[0.7019607843137254,0.8862745098039215,0.803921568627451,0.9921568627450981,0.803921568627451,0.6745098039215687,0.796078431372549,0.8352941176470589,0.9098039215686274,0.9568627450980393,0.792156862745098,0.8941176470588236,0.9019607843137255,0.9607843137254902,0.788235294117647,1,0.9490196078431372,0.6823529411764706,0.9450980392156862,0.8862745098039215,0.8,0.8,0.8,0.8],\"Name\":\"Brewer Qualitative Pastel2\",\"NanColor\":[0.8,0.8,0.8]},{\"IndexedColors\":[0.984313725490196,0.7058823529411765,0.6823529411764706,0.7019607843137254,0.803921568627451,0.8901960784313725,0.8,0.9215686274509803,0.7725490196078432,0.8705882352941177,0.796078431372549,0.8941176470588236,0.996078431372549,0.8509803921568627,0.6509803921568628,1,1,0.8,0.8980392156862745,0.8470588235294118,0.7411764705882353,0.9921568627450981,0.8549019607843137,0.9254901960784314,0.9490196078431372,0.9490196078431372,0.9490196078431372],\"Name\":\"Brewer Qualitative Pastel1\",\"NanColor\":[0.9490196078431372,0.9490196078431372,0.9490196078431372]},{\"IndexedColors\":[0.8941176470588236,0.1019607843137255,0.1098039215686274,0.2156862745098039,0.4941176470588236,0.7215686274509804,0.3019607843137255,0.6862745098039216,0.2901960784313726,0.596078431372549,0.3058823529411765,0.6392156862745098,1,0.4980392156862745,0,1,1,0.2,0.6509803921568628,0.3372549019607843,0.1568627450980392,0.9686274509803922,0.5058823529411764,0.7490196078431373,0.6,0.6,0.6],\"Name\":\"Brewer Qualitative Set1\",\"NanColor\":[0.6,0.6,0.6]},{\"IndexedColors\":[0.6509803921568628,0.807843137254902,0.8901960784313725,0.1215686274509804,0.4705882352941176,0.7058823529411765,0.6980392156862745,0.8745098039215686,0.5411764705882353,0.2,0.6274509803921569,0.1725490196078431,0.984313725490196,0.6039215686274509,0.6,0.8901960784313725,0.1019607843137255,0.1098039215686274,0.9921568627450981,0.7490196078431373,0.4352941176470588,1,0.4980392156862745,0,0.792156862745098,0.6980392156862745,0.8392156862745098,0.4156862745098039,0.2392156862745098,0.6039215686274509,1,1,0.6],\"Name\":\"Brewer Qualitative Paired\",\"NanColor\":[1,1,0.6]},{\"IndexedColors\":[0.5529411764705883,0.8274509803921568,0.7803921568627451,1,1,0.7019607843137254,0.7450980392156863,0.7294117647058823,0.8549019607843137,0.984313725490196,0.5019607843137255,0.4470588235294118,0.5019607843137255,0.6941176470588235,0.8274509803921568,0.9921568627450981,0.7058823529411765,0.3843137254901961,0.7019607843137254,0.8705882352941177,0.4117647058823529,0.9882352941176471,0.803921568627451,0.8980392156862745,0.8509803921568627,0.8509803921568627,0.8509803921568627,0.7372549019607844,0.5019607843137255,0.7411764705882353,0.8,0.9215686274509803,0.7725490196078432,1,0.9294117647058824,0.4352941176470588],\"Name\":\"Brewer Qualitative Set3\",\"NanColor\":[1,0.9294117647058824,0.4352941176470588]},{\"IndexedColors\":[1,0,0,1,0.862745,0,0,0.695201,0],\"Name\":\"Traffic Lights\",\"NanColor\":[0.803922,0,0.803922]},{\"IndexedColors\":[0.908659,0.604013,0.581857,1,0.862745,0,0,0.695201,0],\"Name\":\"Traffic Lights For Deuteranopes\",\"NanColor\":[0.803922,0,0.803922]},{\"IndexedColors\":[0.4196078431372549,0,0.07058823529411765,0.9019607843137255,0.9411764705882353,0.0196078431372549,0.01568627450980392,0.6196078431372549,0.00784313725490196],\"Name\":\"Traffic Lights For Deuteranopes 2\",\"NanColor\":[0.803922,0,0.803922]},{\"ColorSpace\":\"Lab\",\"Creator\":\"Francesca Samsel\",\"Name\":\"Muted Blue-Green\",\"NanColor\":[0.25,0,0],\"RGBPoints\":[0,0.109804,0.27451,0.301961,0.02,0.129412,0.309804,0.341176,0.05,0.14902,0.341176,0.380392,0.1,0.188235,0.403922,0.458824,0.15,0.227451,0.447059,0.521569,0.2,0.290196,0.494118,0.588235,0.25,0.368627,0.552941,0.670588,0.3,0.458824,0.619608,0.74902,0.35,0.588235,0.713725,0.85098,0.4,0.72549,0.815686,0.941176,0.45,0.831373,0.882353,0.980392,0.475,0.909804,0.933333,1,0.5,0.980392,0.984314,1,0.5,0.996078,1,0.94902,0.5,1,1,0.980392,0.5,0.980392,0.984314,1,0.525,0.972549,0.988235,0.890196,0.55,0.917647,0.960784,0.835294,0.6,0.835294,0.921569,0.772549,0.65,0.768627,0.901961,0.737255,0.7,0.670588,0.831373,0.654902,0.75,0.576471,0.760784,0.584314,0.8,0.498039,0.678431,0.521569,0.85,0.392157,0.560784,0.427451,0.9,0.294118,0.45098,0.333333,0.95,0.211765,0.34902,0.254902,1,0.152941,0.278431,0.196078]},{\"ColorSpace\":\"Lab\",\"Creator\":\"Francesca Samsel\",\"Name\":\"Green-Blue Asymmetric Divergent (62Blbc)\",\"NanColor\":[0.25,0,0],\"RGBPoints\":[0,0.121569,0.2,0.145098,0.05,0.196078,0.301961,0.223529,0.1,0.258824,0.4,0.278431,0.2,0.341176,0.54902,0.341176,0.25,0.419608,0.619608,0.376471,0.3,0.545098,0.701961,0.392157,0.35,0.643137,0.780392,0.403922,0.4,0.729412,0.819608,0.45098,0.45,0.811765,0.870588,0.521569,0.5,0.898039,0.909804,0.564706,0.55,0.941176,0.92549,0.686275,0.6,0.960784,0.94902,0.776471,0.64,1,1,1,0.65,0.890196,0.988235,0.972549,0.7,0.721569,0.894118,0.901961,0.75,0.631373,0.823529,0.839216,0.8,0.517647,0.662745,0.701961,0.85,0.384314,0.494118,0.54902,0.9,0.298039,0.360784,0.45098,0.95,0.223529,0.25098,0.34902,0.99,0.156863,0.172549,0.25098,1,0.137255,0.137255,0.188235]},{\"ColorSpace\":\"Lab\",\"Creator\":\"Francesca Samsel\",\"Name\":\"Asymmtrical Earth Tones (6_21b)\",\"NanColor\":[0.25,0,0],\"RGBPoints\":[0,0.141176,0.14902,0.2,0.05,0.215686,0.258824,0.321569,0.1,0.243137,0.368627,0.380392,0.15,0.27451,0.439216,0.4,0.2,0.32549,0.501961,0.384314,0.25,0.403922,0.6,0.419608,0.3,0.486275,0.701961,0.454902,0.35,0.556863,0.74902,0.494118,0.4,0.670588,0.8,0.545098,0.5,0.854902,0.901961,0.631373,0.55,0.92549,0.941176,0.694118,0.6,0.960784,0.94902,0.776471,0.65,0.988235,0.968627,0.909804,0.7,0.839216,0.815686,0.772549,0.75,0.701961,0.662745,0.615686,0.8,0.6,0.529412,0.478431,0.85,0.501961,0.403922,0.360784,0.9,0.439216,0.313725,0.290196,1,0.301961,0.164706,0.176471]},{\"ColorSpace\":\"Lab\",\"Creator\":\"Francesca Samsel\",\"Name\":\"Yellow 15\",\"NanColor\":[0.25,0,0],\"RGBPoints\":[0,1,1,0.988235,0.002,1,1,0.988235,0.05,0.984314,0.988235,0.843137,0.1,0.988235,0.988235,0.741176,0.15,0.980392,0.968627,0.654902,0.2,0.980392,0.945098,0.576471,0.25,0.968627,0.905882,0.486275,0.3,0.968627,0.862745,0.388235,0.35,0.960784,0.803922,0.286275,0.4,0.94902,0.741176,0.219608,0.45,0.941176,0.678431,0.14902,0.5,0.929412,0.607843,0.094118,0.55,0.921569,0.545098,0.054902,0.6,0.909804,0.486275,0.035294,0.65,0.890196,0.411765,0.019608,0.7,0.8,0.305882,0,0.75,0.760784,0.239216,0,0.8,0.678431,0.180392,0.011765,0.85,0.6,0.121569,0.023529,0.9,0.501961,0.054902,0.031373,0.95,0.4,0.039216,0.058824,1,0.301961,0.047059,0.090196]},{\"ColorSpace\":\"Diverging\",\"Name\":\"Magma (matplotlib)\",\"NanColor\":[0,1,0],\"Source\":\"https://github.com/BIDS/colormap/blob/master/colormaps.py\",\"License\":\"CC0\",\"Creator\":\"Nathaniel J. Smith & Stefan van der Walt\",\"RGBPoints\":[0,0.001462,0.000466,0.013866,0.003922,0.002258,0.001295,0.018331,0.007843,0.003279,0.002305,0.023708,0.011765,0.004512,0.00349,0.029965,0.015686,0.00595,0.004843,0.03713,0.019608,0.007588,0.006356,0.044973,0.023529,0.009426,0.008022,0.052844,0.027451,0.011465,0.009828,0.06075,0.031373,0.013708,0.011771,0.068667,0.035294,0.016156,0.01384,0.076603,0.039216,0.018815,0.016026,0.084584,0.043137,0.021692,0.01832,0.09261,0.047059,0.024792,0.020715,0.100676,0.05098,0.028123,0.023201,0.108787,0.054902,0.031696,0.025765,0.116965,0.058824,0.03552,0.028397,0.125209,0.062745,0.039608,0.03109,0.133515,0.066667,0.04383,0.03383,0.141886,0.070588,0.048062,0.036607,0.150327,0.07451,0.05232,0.039407,0.158841,0.078431,0.056615,0.04216,0.167446,0.082353,0.060949,0.044794,0.176129,0.086275,0.06533,0.047318,0.184892,0.090196,0.069764,0.049726,0.193735,0.094118,0.074257,0.052017,0.20266,0.098039,0.078815,0.054184,0.211667,0.101961,0.083446,0.056225,0.220755,0.105882,0.088155,0.058133,0.229922,0.109804,0.092949,0.059904,0.239164,0.113725,0.097833,0.061531,0.248477,0.117647,0.102815,0.06301,0.257854,0.121569,0.107899,0.064335,0.267289,0.12549,0.113094,0.065492,0.276784,0.129412,0.118405,0.066479,0.286321,0.133333,0.123833,0.067295,0.295879,0.137255,0.12938,0.067935,0.305443,0.141176,0.135053,0.068391,0.315,0.145098,0.140858,0.068654,0.324538,0.14902,0.146785,0.068738,0.334011,0.152941,0.152839,0.068637,0.343404,0.156863,0.159018,0.068354,0.352688,0.160784,0.165308,0.067911,0.361816,0.164706,0.171713,0.067305,0.370771,0.168627,0.178212,0.066576,0.379497,0.172549,0.184801,0.065732,0.387973,0.176471,0.19146,0.064818,0.396152,0.180392,0.198177,0.063862,0.404009,0.184314,0.204935,0.062907,0.411514,0.188235,0.211718,0.061992,0.418647,0.192157,0.218512,0.061158,0.425392,0.196078,0.225302,0.060445,0.431742,0.2,0.232077,0.059889,0.437695,0.203922,0.238826,0.059517,0.443256,0.207843,0.245543,0.059352,0.448436,0.211765,0.25222,0.059415,0.453248,0.215686,0.258857,0.059706,0.45771,0.219608,0.265447,0.060237,0.46184,0.223529,0.271994,0.060994,0.46566,0.227451,0.278493,0.061978,0.46919,0.231373,0.284951,0.063168,0.472451,0.235294,0.291366,0.064553,0.475462,0.239216,0.29774,0.066117,0.478243,0.243137,0.304081,0.067835,0.480812,0.247059,0.310382,0.069702,0.483186,0.25098,0.316654,0.07169,0.48538,0.254902,0.322899,0.073782,0.487408,0.258824,0.329114,0.075972,0.489287,0.262745,0.335308,0.078236,0.491024,0.266667,0.341482,0.080564,0.492631,0.270588,0.347636,0.082946,0.494121,0.27451,0.353773,0.085373,0.495501,0.278431,0.359898,0.087831,0.496778,0.282353,0.366012,0.090314,0.49796,0.286275,0.372116,0.092816,0.499053,0.290196,0.378211,0.095332,0.500067,0.294118,0.384299,0.097855,0.501002,0.298039,0.390384,0.100379,0.501864,0.301961,0.396467,0.102902,0.502658,0.305882,0.402548,0.10542,0.503386,0.309804,0.408629,0.10793,0.504052,0.313725,0.414709,0.110431,0.504662,0.317647,0.420791,0.11292,0.505215,0.321569,0.426877,0.115395,0.505714,0.32549,0.432967,0.117855,0.50616,0.329412,0.439062,0.120298,0.506555,0.333333,0.445163,0.122724,0.506901,0.337255,0.451271,0.125132,0.507198,0.341176,0.457386,0.127522,0.507448,0.345098,0.463508,0.129893,0.507652,0.34902,0.46964,0.132245,0.507809,0.352941,0.47578,0.134577,0.507921,0.356863,0.481929,0.136891,0.507989,0.360784,0.488088,0.139186,0.508011,0.364706,0.494258,0.141462,0.507988,0.368627,0.500438,0.143719,0.50792,0.372549,0.506629,0.145958,0.507806,0.376471,0.512831,0.148179,0.507648,0.380392,0.519045,0.150383,0.507443,0.384314,0.52527,0.152569,0.507192,0.388235,0.531507,0.154739,0.506895,0.392157,0.537755,0.156894,0.506551,0.396078,0.544015,0.159033,0.506159,0.4,0.550287,0.161158,0.505719,0.403922,0.556571,0.163269,0.50523,0.407843,0.562866,0.165368,0.504692,0.411765,0.569172,0.167454,0.504105,0.415686,0.57549,0.16953,0.503466,0.419608,0.581819,0.171596,0.502777,0.423529,0.588158,0.173652,0.502035,0.427451,0.594508,0.175701,0.501241,0.431373,0.600868,0.177743,0.500394,0.435294,0.607238,0.179779,0.499492,0.439216,0.613617,0.181811,0.498536,0.443137,0.620005,0.18384,0.497524,0.447059,0.626401,0.185867,0.496456,0.45098,0.632805,0.187893,0.495332,0.454902,0.639216,0.189921,0.49415,0.458824,0.645633,0.191952,0.49291,0.462745,0.652056,0.193986,0.491611,0.466667,0.658483,0.196027,0.490253,0.470588,0.664915,0.198075,0.488836,0.47451,0.671349,0.200133,0.487358,0.478431,0.677786,0.202203,0.485819,0.482353,0.684224,0.204286,0.484219,0.486275,0.690661,0.206384,0.482558,0.490196,0.697098,0.208501,0.480835,0.494118,0.703532,0.210638,0.479049,0.498039,0.709962,0.212797,0.477201,0.501961,0.716387,0.214982,0.47529,0.505882,0.722805,0.217194,0.473316,0.509804,0.729216,0.219437,0.471279,0.513725,0.735616,0.221713,0.46918,0.517647,0.742004,0.224025,0.467018,0.521569,0.748378,0.226377,0.464794,0.52549,0.754737,0.228772,0.462509,0.529412,0.761077,0.231214,0.460162,0.533333,0.767398,0.233705,0.457755,0.537255,0.773695,0.236249,0.455289,0.541176,0.779968,0.238851,0.452765,0.545098,0.786212,0.241514,0.450184,0.54902,0.792427,0.244242,0.447543,0.552941,0.798608,0.24704,0.444848,0.556863,0.804752,0.249911,0.442102,0.560784,0.810855,0.252861,0.439305,0.564706,0.816914,0.255895,0.436461,0.568627,0.822926,0.259016,0.433573,0.572549,0.828886,0.262229,0.430644,0.576471,0.834791,0.26554,0.427671,0.580392,0.840636,0.268953,0.424666,0.584314,0.846416,0.272473,0.421631,0.588235,0.852126,0.276106,0.418573,0.592157,0.857763,0.279857,0.415496,0.596078,0.86332,0.283729,0.412403,0.6,0.868793,0.287728,0.409303,0.603922,0.874176,0.291859,0.406205,0.607843,0.879464,0.296125,0.403118,0.611765,0.884651,0.30053,0.400047,0.615686,0.889731,0.305079,0.397002,0.619608,0.8947,0.309773,0.393995,0.623529,0.899552,0.314616,0.391037,0.627451,0.904281,0.31961,0.388137,0.631373,0.908884,0.324755,0.385308,0.635294,0.913354,0.330052,0.382563,0.639216,0.917689,0.3355,0.379915,0.643137,0.921884,0.341098,0.377376,0.647059,0.925937,0.346844,0.374959,0.65098,0.929845,0.352734,0.372677,0.654902,0.933606,0.358764,0.370541,0.658824,0.937221,0.364929,0.368567,0.662745,0.940687,0.371224,0.366762,0.666667,0.944006,0.377643,0.365136,0.670588,0.94718,0.384178,0.363701,0.67451,0.95021,0.39082,0.362468,0.678431,0.953099,0.397563,0.361438,0.682353,0.955849,0.4044,0.360619,0.686275,0.958464,0.411324,0.360014,0.690196,0.960949,0.418323,0.35963,0.694118,0.96331,0.42539,0.359469,0.698039,0.965549,0.432519,0.359529,0.701961,0.967671,0.439703,0.35981,0.705882,0.96968,0.446936,0.360311,0.709804,0.971582,0.45421,0.36103,0.713725,0.973381,0.46152,0.361965,0.717647,0.975082,0.468861,0.363111,0.721569,0.97669,0.476226,0.364466,0.72549,0.97821,0.483612,0.366025,0.729412,0.979645,0.491014,0.367783,0.733333,0.981,0.498428,0.369734,0.737255,0.982279,0.505851,0.371874,0.741176,0.983485,0.51328,0.374198,0.745098,0.984622,0.520713,0.376698,0.74902,0.985693,0.528148,0.379371,0.752941,0.9867,0.535582,0.38221,0.756863,0.987646,0.543015,0.38521,0.760784,0.988533,0.550446,0.388365,0.764706,0.989363,0.557873,0.391671,0.768627,0.990138,0.565296,0.395122,0.772549,0.990871,0.572706,0.398714,0.776471,0.991558,0.580107,0.402441,0.780392,0.992196,0.587502,0.406299,0.784314,0.992785,0.594891,0.410283,0.788235,0.993326,0.602275,0.41439,0.792157,0.993834,0.609644,0.418613,0.796078,0.994309,0.616999,0.42295,0.8,0.994738,0.62435,0.427397,0.803922,0.995122,0.631696,0.431951,0.807843,0.99548,0.639027,0.436607,0.811765,0.99581,0.646344,0.441361,0.815686,0.996096,0.653659,0.446213,0.819608,0.996341,0.660969,0.45116,0.823529,0.99658,0.668256,0.456192,0.827451,0.996775,0.675541,0.461314,0.831373,0.996925,0.682828,0.466526,0.835294,0.997077,0.690088,0.471811,0.839216,0.997186,0.697349,0.477182,0.843137,0.997254,0.704611,0.482635,0.847059,0.997325,0.711848,0.488154,0.85098,0.997351,0.719089,0.493755,0.854902,0.997351,0.726324,0.499428,0.858824,0.997341,0.733545,0.505167,0.862745,0.997285,0.740772,0.510983,0.866667,0.997228,0.747981,0.516859,0.870588,0.997138,0.75519,0.522806,0.87451,0.997019,0.762398,0.528821,0.878431,0.996898,0.769591,0.534892,0.882353,0.996727,0.776795,0.541039,0.886275,0.996571,0.783977,0.547233,0.890196,0.996369,0.791167,0.553499,0.894118,0.996162,0.798348,0.55982,0.898039,0.995932,0.805527,0.566202,0.901961,0.99568,0.812706,0.572645,0.905882,0.995424,0.819875,0.57914,0.909804,0.995131,0.827052,0.585701,0.913725,0.994851,0.834213,0.592307,0.917647,0.994524,0.841387,0.598983,0.921569,0.994222,0.84854,0.605696,0.92549,0.993866,0.855711,0.612482,0.929412,0.993545,0.862859,0.619299,0.933333,0.99317,0.870024,0.626189,0.937255,0.992831,0.877168,0.633109,0.941176,0.99244,0.88433,0.640099,0.945098,0.992089,0.89147,0.647116,0.94902,0.991688,0.898627,0.654202,0.952941,0.991332,0.905763,0.661309,0.956863,0.99093,0.912915,0.668481,0.960784,0.99057,0.920049,0.675675,0.964706,0.990175,0.927196,0.682926,0.968627,0.989815,0.934329,0.690198,0.972549,0.989434,0.94147,0.697519,0.976471,0.989077,0.948604,0.704863,0.980392,0.988717,0.955742,0.712242,0.984314,0.988367,0.962878,0.719649,0.988235,0.988033,0.970012,0.727077,0.992157,0.987691,0.977154,0.734536,0.996078,0.987387,0.984288,0.742002,1,0.987053,0.991438,0.749504]},{\"ColorSpace\":\"Diverging\",\"Name\":\"Inferno (matplotlib)\",\"NanColor\":[0,1,0],\"Source\":\"https://github.com/BIDS/colormap/blob/master/colormaps.py\",\"License\":\"CC0\",\"Creator\":\"Nathaniel J. Smith & Stefan van der Walt\",\"RGBPoints\":[0,0.001462,0.000466,0.013866,0.003922,0.002267,0.00127,0.01857,0.007843,0.003299,0.002249,0.024239,0.011765,0.004547,0.003392,0.030909,0.015686,0.006006,0.004692,0.038558,0.019608,0.007676,0.006136,0.046836,0.023529,0.009561,0.007713,0.055143,0.027451,0.011663,0.009417,0.06346,0.031373,0.013995,0.011225,0.071862,0.035294,0.016561,0.013136,0.080282,0.039216,0.019373,0.015133,0.088767,0.043137,0.022447,0.017199,0.097327,0.047059,0.025793,0.019331,0.10593,0.05098,0.029432,0.021503,0.114621,0.054902,0.033385,0.023702,0.123397,0.058824,0.037668,0.025921,0.132232,0.062745,0.042253,0.028139,0.141141,0.066667,0.046915,0.030324,0.150164,0.070588,0.051644,0.032474,0.159254,0.07451,0.056449,0.034569,0.168414,0.078431,0.06134,0.03659,0.177642,0.082353,0.066331,0.038504,0.186962,0.086275,0.071429,0.040294,0.196354,0.090196,0.076637,0.041905,0.205799,0.094118,0.081962,0.043328,0.215289,0.098039,0.087411,0.044556,0.224813,0.101961,0.09299,0.045583,0.234358,0.105882,0.098702,0.046402,0.243904,0.109804,0.104551,0.047008,0.25343,0.113725,0.110536,0.047399,0.262912,0.117647,0.116656,0.047574,0.272321,0.121569,0.122908,0.047536,0.281624,0.12549,0.129285,0.047293,0.290788,0.129412,0.135778,0.046856,0.299776,0.133333,0.142378,0.046242,0.308553,0.137255,0.149073,0.045468,0.317085,0.141176,0.15585,0.044559,0.325338,0.145098,0.162689,0.043554,0.333277,0.14902,0.169575,0.042489,0.340874,0.152941,0.176493,0.041402,0.348111,0.156863,0.183429,0.040329,0.354971,0.160784,0.190367,0.039309,0.361447,0.164706,0.197297,0.0384,0.367535,0.168627,0.204209,0.037632,0.373238,0.172549,0.211095,0.03703,0.378563,0.176471,0.217949,0.036615,0.383522,0.180392,0.224763,0.036405,0.388129,0.184314,0.231538,0.036405,0.3924,0.188235,0.238273,0.036621,0.396353,0.192157,0.244967,0.037055,0.400007,0.196078,0.25162,0.037705,0.403378,0.2,0.258234,0.038571,0.406485,0.203922,0.26481,0.039647,0.409345,0.207843,0.271347,0.040922,0.411976,0.211765,0.27785,0.042353,0.414392,0.215686,0.284321,0.043933,0.416608,0.219608,0.290763,0.045644,0.418637,0.223529,0.297178,0.04747,0.420491,0.227451,0.303568,0.049396,0.422182,0.231373,0.309935,0.051407,0.423721,0.235294,0.316282,0.05349,0.425116,0.239216,0.32261,0.055634,0.426377,0.243137,0.328921,0.057827,0.427511,0.247059,0.335217,0.06006,0.428524,0.25098,0.3415,0.062325,0.429425,0.254902,0.347771,0.064616,0.430217,0.258824,0.354032,0.066925,0.430906,0.262745,0.360284,0.069247,0.431497,0.266667,0.366529,0.071579,0.431994,0.270588,0.372768,0.073915,0.4324,0.27451,0.379001,0.076253,0.432719,0.278431,0.385228,0.078591,0.432955,0.282353,0.391453,0.080927,0.433109,0.286275,0.397674,0.083257,0.433183,0.290196,0.403894,0.08558,0.433179,0.294118,0.410113,0.087896,0.433098,0.298039,0.416331,0.090203,0.432943,0.301961,0.422549,0.092501,0.432714,0.305882,0.428768,0.09479,0.432412,0.309804,0.434987,0.097069,0.432039,0.313725,0.441207,0.099338,0.431594,0.317647,0.447428,0.101597,0.43108,0.321569,0.453651,0.103848,0.430498,0.32549,0.459875,0.106089,0.429846,0.329412,0.4661,0.108322,0.429125,0.333333,0.472328,0.110547,0.428334,0.337255,0.478558,0.112764,0.427475,0.341176,0.484789,0.114974,0.426548,0.345098,0.491022,0.117179,0.425552,0.34902,0.497257,0.119379,0.424488,0.352941,0.503493,0.121575,0.423356,0.356863,0.50973,0.123769,0.422156,0.360784,0.515967,0.12596,0.420887,0.364706,0.522206,0.12815,0.419549,0.368627,0.528444,0.130341,0.418142,0.372549,0.534683,0.132534,0.416667,0.376471,0.54092,0.134729,0.415123,0.380392,0.547157,0.136929,0.413511,0.384314,0.553392,0.139134,0.411829,0.388235,0.559624,0.141346,0.410078,0.392157,0.565854,0.143567,0.408258,0.396078,0.572081,0.145797,0.406369,0.4,0.578304,0.148039,0.404411,0.403922,0.584521,0.150294,0.402385,0.407843,0.590734,0.152563,0.40029,0.411765,0.59694,0.154848,0.398125,0.415686,0.603139,0.157151,0.395891,0.419608,0.60933,0.159474,0.393589,0.423529,0.615513,0.161817,0.391219,0.427451,0.621685,0.164184,0.388781,0.431373,0.627847,0.166575,0.386276,0.435294,0.633998,0.168992,0.383704,0.439216,0.640135,0.171438,0.381065,0.443137,0.64626,0.173914,0.378359,0.447059,0.652369,0.176421,0.375586,0.45098,0.658463,0.178962,0.372748,0.454902,0.66454,0.181539,0.369846,0.458824,0.670599,0.184153,0.366879,0.462745,0.676638,0.186807,0.363849,0.466667,0.682656,0.189501,0.360757,0.470588,0.688653,0.192239,0.357603,0.47451,0.694627,0.195021,0.354388,0.478431,0.700576,0.197851,0.351113,0.482353,0.7065,0.200728,0.347777,0.486275,0.712396,0.203656,0.344383,0.490196,0.718264,0.206636,0.340931,0.494118,0.724103,0.20967,0.337424,0.498039,0.729909,0.212759,0.333861,0.501961,0.735683,0.215906,0.330245,0.505882,0.741423,0.219112,0.326576,0.509804,0.747127,0.222378,0.322856,0.513725,0.752794,0.225706,0.319085,0.517647,0.758422,0.229097,0.315266,0.521569,0.76401,0.232554,0.311399,0.52549,0.769556,0.236077,0.307485,0.529412,0.775059,0.239667,0.303526,0.533333,0.780517,0.243327,0.299523,0.537255,0.785929,0.247056,0.295477,0.541176,0.791293,0.250856,0.29139,0.545098,0.796607,0.254728,0.287264,0.54902,0.801871,0.258674,0.283099,0.552941,0.807082,0.262692,0.278898,0.556863,0.812239,0.266786,0.274661,0.560784,0.817341,0.270954,0.27039,0.564706,0.822386,0.275197,0.266085,0.568627,0.827372,0.279517,0.26175,0.572549,0.832299,0.283913,0.257383,0.576471,0.837165,0.288385,0.252988,0.580392,0.841969,0.292933,0.248564,0.584314,0.846709,0.297559,0.244113,0.588235,0.851384,0.30226,0.239636,0.592157,0.855992,0.307038,0.235133,0.596078,0.860533,0.311892,0.230606,0.6,0.865006,0.316822,0.226055,0.603922,0.869409,0.321827,0.221482,0.607843,0.873741,0.326906,0.216886,0.611765,0.878001,0.33206,0.212268,0.615686,0.882188,0.337287,0.207628,0.619608,0.886302,0.342586,0.202968,0.623529,0.890341,0.347957,0.198286,0.627451,0.894305,0.353399,0.193584,0.631373,0.898192,0.358911,0.18886,0.635294,0.902003,0.364492,0.184116,0.639216,0.905735,0.37014,0.17935,0.643137,0.90939,0.375856,0.174563,0.647059,0.912966,0.381636,0.169755,0.65098,0.916462,0.387481,0.164924,0.654902,0.919879,0.393389,0.16007,0.658824,0.923215,0.399359,0.155193,0.662745,0.92647,0.405389,0.150292,0.666667,0.929644,0.411479,0.145367,0.670588,0.932737,0.417627,0.140417,0.67451,0.935747,0.423831,0.13544,0.678431,0.938675,0.430091,0.130438,0.682353,0.941521,0.436405,0.125409,0.686275,0.944285,0.442772,0.120354,0.690196,0.946965,0.449191,0.115272,0.694118,0.949562,0.45566,0.110164,0.698039,0.952075,0.462178,0.105031,0.701961,0.954506,0.468744,0.099874,0.705882,0.956852,0.475356,0.094695,0.709804,0.959114,0.482014,0.089499,0.713725,0.961293,0.488716,0.084289,0.717647,0.963387,0.495462,0.079073,0.721569,0.965397,0.502249,0.073859,0.72549,0.967322,0.509078,0.068659,0.729412,0.969163,0.515946,0.063488,0.733333,0.970919,0.522853,0.058367,0.737255,0.97259,0.529798,0.053324,0.741176,0.974176,0.53678,0.048392,0.745098,0.975677,0.543798,0.043618,0.74902,0.977092,0.55085,0.03905,0.752941,0.978422,0.557937,0.034931,0.756863,0.979666,0.565057,0.031409,0.760784,0.980824,0.572209,0.028508,0.764706,0.981895,0.579392,0.02625,0.768627,0.982881,0.586606,0.024661,0.772549,0.983779,0.593849,0.02377,0.776471,0.984591,0.601122,0.023606,0.780392,0.985315,0.608422,0.024202,0.784314,0.985952,0.61575,0.025592,0.788235,0.986502,0.623105,0.027814,0.792157,0.986964,0.630485,0.030908,0.796078,0.987337,0.63789,0.034916,0.8,0.987622,0.64532,0.039886,0.803922,0.987819,0.652773,0.045581,0.807843,0.987926,0.66025,0.05175,0.811765,0.987945,0.667748,0.058329,0.815686,0.987874,0.675267,0.065257,0.819608,0.987714,0.682807,0.072489,0.823529,0.987464,0.690366,0.07999,0.827451,0.987124,0.697944,0.087731,0.831373,0.986694,0.70554,0.095694,0.835294,0.986175,0.713153,0.103863,0.839216,0.985566,0.720782,0.112229,0.843137,0.984865,0.728427,0.120785,0.847059,0.984075,0.736087,0.129527,0.85098,0.983196,0.743758,0.138453,0.854902,0.982228,0.751442,0.147565,0.858824,0.981173,0.759135,0.156863,0.862745,0.980032,0.766837,0.166353,0.866667,0.978806,0.774545,0.176037,0.870588,0.977497,0.782258,0.185923,0.87451,0.976108,0.789974,0.196018,0.878431,0.974638,0.797692,0.206332,0.882353,0.973088,0.805409,0.216877,0.886275,0.971468,0.813122,0.227658,0.890196,0.969783,0.820825,0.238686,0.894118,0.968041,0.828515,0.249972,0.898039,0.966243,0.836191,0.261534,0.901961,0.964394,0.843848,0.273391,0.905882,0.962517,0.851476,0.285546,0.909804,0.960626,0.859069,0.29801,0.913725,0.95872,0.866624,0.31082,0.917647,0.956834,0.874129,0.323974,0.921569,0.954997,0.881569,0.337475,0.92549,0.953215,0.888942,0.351369,0.929412,0.951546,0.896226,0.365627,0.933333,0.950018,0.903409,0.380271,0.937255,0.948683,0.910473,0.395289,0.941176,0.947594,0.917399,0.410665,0.945098,0.946809,0.924168,0.426373,0.94902,0.946392,0.930761,0.442367,0.952941,0.946403,0.937159,0.458592,0.956863,0.946903,0.943348,0.47497,0.960784,0.947937,0.949318,0.491426,0.964706,0.949545,0.955063,0.50786,0.968627,0.95174,0.960587,0.524203,0.972549,0.954529,0.965896,0.540361,0.976471,0.957896,0.971003,0.556275,0.980392,0.961812,0.975924,0.571925,0.984314,0.966249,0.980678,0.587206,0.988235,0.971162,0.985282,0.602154,0.992157,0.976511,0.989753,0.61676,0.996078,0.982257,0.994109,0.631017,1,0.988362,0.998364,0.644924]},{\"ColorSpace\":\"Diverging\",\"Name\":\"Plasma (matplotlib)\",\"NanColor\":[0,1,0],\"Source\":\"https://github.com/BIDS/colormap/blob/master/colormaps.py\",\"License\":\"CC0\",\"Creator\":\"Nathaniel J. Smith & Stefan van der Walt\",\"RGBPoints\":[0,0.050383,0.029803,0.527975,0.003922,0.063536,0.028426,0.533124,0.007843,0.075353,0.027206,0.538007,0.011765,0.086222,0.026125,0.542658,0.015686,0.096379,0.025165,0.547103,0.019608,0.10598,0.024309,0.551368,0.023529,0.115124,0.023556,0.555468,0.027451,0.123903,0.022878,0.559423,0.031373,0.132381,0.022258,0.56325,0.035294,0.140603,0.021687,0.566959,0.039216,0.148607,0.021154,0.570562,0.043137,0.156421,0.020651,0.574065,0.047059,0.16407,0.020171,0.577478,0.05098,0.171574,0.019706,0.580806,0.054902,0.17895,0.019252,0.584054,0.058824,0.186213,0.018803,0.587228,0.062745,0.193374,0.018354,0.59033,0.066667,0.200445,0.017902,0.593364,0.070588,0.207435,0.017442,0.596333,0.07451,0.21435,0.016973,0.599239,0.078431,0.221197,0.016497,0.602083,0.082353,0.227983,0.016007,0.604867,0.086275,0.234715,0.015502,0.607592,0.090196,0.241396,0.014979,0.610259,0.094118,0.248032,0.014439,0.612868,0.098039,0.254627,0.013882,0.615419,0.101961,0.261183,0.013308,0.617911,0.105882,0.267703,0.012716,0.620346,0.109804,0.274191,0.012109,0.622722,0.113725,0.280648,0.011488,0.625038,0.117647,0.287076,0.010855,0.627295,0.121569,0.293478,0.010213,0.62949,0.12549,0.299855,0.009561,0.631624,0.129412,0.30621,0.008902,0.633694,0.133333,0.312543,0.008239,0.6357,0.137255,0.318856,0.007576,0.63764,0.141176,0.32515,0.006915,0.639512,0.145098,0.331426,0.006261,0.641316,0.14902,0.337683,0.005618,0.643049,0.152941,0.343925,0.004991,0.64471,0.156863,0.35015,0.004382,0.646298,0.160784,0.356359,0.003798,0.64781,0.164706,0.362553,0.003243,0.649245,0.168627,0.368733,0.002724,0.650601,0.172549,0.374897,0.002245,0.651876,0.176471,0.381047,0.001814,0.653068,0.180392,0.387183,0.001434,0.654177,0.184314,0.393304,0.001114,0.655199,0.188235,0.399411,0.000859,0.656133,0.192157,0.405503,0.000678,0.656977,0.196078,0.41158,0.000577,0.65773,0.2,0.417642,0.000564,0.65839,0.203922,0.423689,0.000646,0.658956,0.207843,0.429719,0.000831,0.659425,0.211765,0.435734,0.001127,0.659797,0.215686,0.441732,0.00154,0.660069,0.219608,0.447714,0.00208,0.66024,0.223529,0.453677,0.002755,0.66031,0.227451,0.459623,0.003574,0.660277,0.231373,0.46555,0.004545,0.660139,0.235294,0.471457,0.005678,0.659897,0.239216,0.477344,0.00698,0.659549,0.243137,0.48321,0.00846,0.659095,0.247059,0.489055,0.010127,0.658534,0.25098,0.494877,0.01199,0.657865,0.254902,0.500678,0.014055,0.657088,0.258824,0.506454,0.016333,0.656202,0.262745,0.512206,0.018833,0.655209,0.266667,0.517933,0.021563,0.654109,0.270588,0.523633,0.024532,0.652901,0.27451,0.529306,0.027747,0.651586,0.278431,0.534952,0.031217,0.650165,0.282353,0.54057,0.03495,0.64864,0.286275,0.546157,0.038954,0.64701,0.290196,0.551715,0.043136,0.645277,0.294118,0.557243,0.047331,0.643443,0.298039,0.562738,0.051545,0.641509,0.301961,0.568201,0.055778,0.639477,0.305882,0.573632,0.060028,0.637349,0.309804,0.579029,0.064296,0.635126,0.313725,0.584391,0.068579,0.632812,0.317647,0.589719,0.072878,0.630408,0.321569,0.595011,0.07719,0.627917,0.32549,0.600266,0.081516,0.625342,0.329412,0.605485,0.085854,0.622686,0.333333,0.610667,0.090204,0.619951,0.337255,0.615812,0.094564,0.61714,0.341176,0.620919,0.098934,0.614257,0.345098,0.625987,0.103312,0.611305,0.34902,0.631017,0.107699,0.608287,0.352941,0.636008,0.112092,0.605205,0.356863,0.640959,0.116492,0.602065,0.360784,0.645872,0.120898,0.598867,0.364706,0.650746,0.125309,0.595617,0.368627,0.65558,0.129725,0.592317,0.372549,0.660374,0.134144,0.588971,0.376471,0.665129,0.138566,0.585582,0.380392,0.669845,0.142992,0.582154,0.384314,0.674522,0.147419,0.578688,0.388235,0.67916,0.151848,0.575189,0.392157,0.683758,0.156278,0.57166,0.396078,0.688318,0.160709,0.568103,0.4,0.69284,0.165141,0.564522,0.403922,0.697324,0.169573,0.560919,0.407843,0.701769,0.174005,0.557296,0.411765,0.706178,0.178437,0.553657,0.415686,0.710549,0.182868,0.550004,0.419608,0.714883,0.187299,0.546338,0.423529,0.719181,0.191729,0.542663,0.427451,0.723444,0.196158,0.538981,0.431373,0.72767,0.200586,0.535293,0.435294,0.731862,0.205013,0.531601,0.439216,0.736019,0.209439,0.527908,0.443137,0.740143,0.213864,0.524216,0.447059,0.744232,0.218288,0.520524,0.45098,0.748289,0.222711,0.516834,0.454902,0.752312,0.227133,0.513149,0.458824,0.756304,0.231555,0.509468,0.462745,0.760264,0.235976,0.505794,0.466667,0.764193,0.240396,0.502126,0.470588,0.76809,0.244817,0.498465,0.47451,0.771958,0.249237,0.494813,0.478431,0.775796,0.253658,0.491171,0.482353,0.779604,0.258078,0.487539,0.486275,0.783383,0.2625,0.483918,0.490196,0.787133,0.266922,0.480307,0.494118,0.790855,0.271345,0.476706,0.498039,0.794549,0.27577,0.473117,0.501961,0.798216,0.280197,0.469538,0.505882,0.801855,0.284626,0.465971,0.509804,0.805467,0.289057,0.462415,0.513725,0.809052,0.293491,0.45887,0.517647,0.812612,0.297928,0.455338,0.521569,0.816144,0.302368,0.451816,0.52549,0.819651,0.306812,0.448306,0.529412,0.823132,0.311261,0.444806,0.533333,0.826588,0.315714,0.441316,0.537255,0.830018,0.320172,0.437836,0.541176,0.833422,0.324635,0.434366,0.545098,0.836801,0.329105,0.430905,0.54902,0.840155,0.33358,0.427455,0.552941,0.843484,0.338062,0.424013,0.556863,0.846788,0.342551,0.420579,0.560784,0.850066,0.347048,0.417153,0.564706,0.853319,0.351553,0.413734,0.568627,0.856547,0.356066,0.410322,0.572549,0.85975,0.360588,0.406917,0.576471,0.862927,0.365119,0.403519,0.580392,0.866078,0.36966,0.400126,0.584314,0.869203,0.374212,0.396738,0.588235,0.872303,0.378774,0.393355,0.592157,0.875376,0.383347,0.389976,0.596078,0.878423,0.387932,0.3866,0.6,0.881443,0.392529,0.383229,0.603922,0.884436,0.397139,0.37986,0.607843,0.887402,0.401762,0.376494,0.611765,0.89034,0.406398,0.37313,0.615686,0.89325,0.411048,0.369768,0.619608,0.896131,0.415712,0.366407,0.623529,0.898984,0.420392,0.363047,0.627451,0.901807,0.425087,0.359688,0.631373,0.904601,0.429797,0.356329,0.635294,0.907365,0.434524,0.35297,0.639216,0.910098,0.439268,0.34961,0.643137,0.9128,0.444029,0.346251,0.647059,0.915471,0.448807,0.34289,0.65098,0.918109,0.453603,0.339529,0.654902,0.920714,0.458417,0.336166,0.658824,0.923287,0.463251,0.332801,0.662745,0.925825,0.468103,0.329435,0.666667,0.928329,0.472975,0.326067,0.670588,0.930798,0.477867,0.322697,0.67451,0.933232,0.48278,0.319325,0.678431,0.93563,0.487712,0.315952,0.682353,0.93799,0.492667,0.312575,0.686275,0.940313,0.497642,0.309197,0.690196,0.942598,0.502639,0.305816,0.694118,0.944844,0.507658,0.302433,0.698039,0.947051,0.512699,0.299049,0.701961,0.949217,0.517763,0.295662,0.705882,0.951344,0.52285,0.292275,0.709804,0.953428,0.52796,0.288883,0.713725,0.95547,0.533093,0.28549,0.717647,0.957469,0.53825,0.282096,0.721569,0.959424,0.543431,0.278701,0.72549,0.961336,0.548636,0.275305,0.729412,0.963203,0.553865,0.271909,0.733333,0.965024,0.559118,0.268513,0.737255,0.966798,0.564396,0.265118,0.741176,0.968526,0.5697,0.261721,0.745098,0.970205,0.575028,0.258325,0.74902,0.971835,0.580382,0.254931,0.752941,0.973416,0.585761,0.25154,0.756863,0.974947,0.591165,0.248151,0.760784,0.976428,0.596595,0.244767,0.764706,0.977856,0.602051,0.241387,0.768627,0.979233,0.607532,0.238013,0.772549,0.980556,0.613039,0.234646,0.776471,0.981826,0.618572,0.231287,0.780392,0.983041,0.624131,0.227937,0.784314,0.984199,0.629718,0.224595,0.788235,0.985301,0.63533,0.221265,0.792157,0.986345,0.640969,0.217948,0.796078,0.987332,0.646633,0.214648,0.8,0.98826,0.652325,0.211364,0.803922,0.989128,0.658043,0.2081,0.807843,0.989935,0.663787,0.204859,0.811765,0.990681,0.669558,0.201642,0.815686,0.991365,0.675355,0.198453,0.819608,0.991985,0.681179,0.195295,0.823529,0.992541,0.68703,0.19217,0.827451,0.993032,0.692907,0.189084,0.831373,0.993456,0.69881,0.186041,0.835294,0.993814,0.704741,0.183043,0.839216,0.994103,0.710698,0.180097,0.843137,0.994324,0.716681,0.177208,0.847059,0.994474,0.722691,0.174381,0.85098,0.994553,0.728728,0.171622,0.854902,0.994561,0.734791,0.168938,0.858824,0.994495,0.74088,0.166335,0.862745,0.994355,0.746995,0.163821,0.866667,0.994141,0.753137,0.161404,0.870588,0.993851,0.759304,0.159092,0.87451,0.993482,0.765499,0.156891,0.878431,0.993033,0.77172,0.154808,0.882353,0.992505,0.777967,0.152855,0.886275,0.991897,0.784239,0.151042,0.890196,0.991209,0.790537,0.149377,0.894118,0.990439,0.796859,0.14787,0.898039,0.989587,0.803205,0.146529,0.901961,0.988648,0.809579,0.145357,0.905882,0.987621,0.815978,0.144363,0.909804,0.986509,0.822401,0.143557,0.913725,0.985314,0.828846,0.142945,0.917647,0.984031,0.835315,0.142528,0.921569,0.982653,0.841812,0.142303,0.92549,0.98119,0.848329,0.142279,0.929412,0.979644,0.854866,0.142453,0.933333,0.977995,0.861432,0.142808,0.937255,0.976265,0.868016,0.143351,0.941176,0.974443,0.874622,0.144061,0.945098,0.97253,0.88125,0.144923,0.94902,0.970533,0.887896,0.145919,0.952941,0.968443,0.894564,0.147014,0.956863,0.966271,0.901249,0.14818,0.960784,0.964021,0.90795,0.14937,0.964706,0.961681,0.914672,0.15052,0.968627,0.959276,0.921407,0.151566,0.972549,0.956808,0.928152,0.152409,0.976471,0.954287,0.934908,0.152921,0.980392,0.951726,0.941671,0.152925,0.984314,0.949151,0.948435,0.152178,0.988235,0.946602,0.95519,0.150328,0.992157,0.944152,0.961916,0.146861,0.996078,0.941896,0.96859,0.140956,1,0.940015,0.975158,0.131326]},{\"ColorSpace\":\"Diverging\",\"Name\":\"Viridis (matplotlib)\",\"NanColor\":[1,0,0],\"Source\":\"https://github.com/BIDS/colormap/blob/master/colormaps.py\",\"License\":\"CC0\",\"Creator\":\"Eric Firing\",\"RGBPoints\":[0,0.267004,0.004874,0.329415,0.003922,0.26851,0.009605,0.335427,0.007843,0.269944,0.014625,0.341379,0.011765,0.271305,0.019942,0.347269,0.015686,0.272594,0.025563,0.353093,0.019608,0.273809,0.031497,0.358853,0.023529,0.274952,0.037752,0.364543,0.027451,0.276022,0.044167,0.370164,0.031373,0.277018,0.050344,0.375715,0.035294,0.277941,0.056324,0.381191,0.039216,0.278791,0.062145,0.386592,0.043137,0.279566,0.067836,0.391917,0.047059,0.280267,0.073417,0.397163,0.05098,0.280894,0.078907,0.402329,0.054902,0.281446,0.08432,0.407414,0.058824,0.281924,0.089666,0.412415,0.062745,0.282327,0.094955,0.417331,0.066667,0.282656,0.100196,0.42216,0.070588,0.28291,0.105393,0.426902,0.07451,0.283091,0.110553,0.431554,0.078431,0.283197,0.11568,0.436115,0.082353,0.283229,0.120777,0.440584,0.086275,0.283187,0.125848,0.44496,0.090196,0.283072,0.130895,0.449241,0.094118,0.282884,0.13592,0.453427,0.098039,0.282623,0.140926,0.457517,0.101961,0.28229,0.145912,0.46151,0.105882,0.281887,0.150881,0.465405,0.109804,0.281412,0.155834,0.469201,0.113725,0.280868,0.160771,0.472899,0.117647,0.280255,0.165693,0.476498,0.121569,0.279574,0.170599,0.479997,0.12549,0.278826,0.17549,0.483397,0.129412,0.278012,0.180367,0.486697,0.133333,0.277134,0.185228,0.489898,0.137255,0.276194,0.190074,0.493001,0.141176,0.275191,0.194905,0.496005,0.145098,0.274128,0.199721,0.498911,0.14902,0.273006,0.20452,0.501721,0.152941,0.271828,0.209303,0.504434,0.156863,0.270595,0.214069,0.507052,0.160784,0.269308,0.218818,0.509577,0.164706,0.267968,0.223549,0.512008,0.168627,0.26658,0.228262,0.514349,0.172549,0.265145,0.232956,0.516599,0.176471,0.263663,0.237631,0.518762,0.180392,0.262138,0.242286,0.520837,0.184314,0.260571,0.246922,0.522828,0.188235,0.258965,0.251537,0.524736,0.192157,0.257322,0.25613,0.526563,0.196078,0.255645,0.260703,0.528312,0.2,0.253935,0.265254,0.529983,0.203922,0.252194,0.269783,0.531579,0.207843,0.250425,0.27429,0.533103,0.211765,0.248629,0.278775,0.534556,0.215686,0.246811,0.283237,0.535941,0.219608,0.244972,0.287675,0.53726,0.223529,0.243113,0.292092,0.538516,0.227451,0.241237,0.296485,0.539709,0.231373,0.239346,0.300855,0.540844,0.235294,0.237441,0.305202,0.541921,0.239216,0.235526,0.309527,0.542944,0.243137,0.233603,0.313828,0.543914,0.247059,0.231674,0.318106,0.544834,0.25098,0.229739,0.322361,0.545706,0.254902,0.227802,0.326594,0.546532,0.258824,0.225863,0.330805,0.547314,0.262745,0.223925,0.334994,0.548053,0.266667,0.221989,0.339161,0.548752,0.270588,0.220057,0.343307,0.549413,0.27451,0.21813,0.347432,0.550038,0.278431,0.21621,0.351535,0.550627,0.282353,0.214298,0.355619,0.551184,0.286275,0.212395,0.359683,0.55171,0.290196,0.210503,0.363727,0.552206,0.294118,0.208623,0.367752,0.552675,0.298039,0.206756,0.371758,0.553117,0.301961,0.204903,0.375746,0.553533,0.305882,0.203063,0.379716,0.553925,0.309804,0.201239,0.38367,0.554294,0.313725,0.19943,0.387607,0.554642,0.317647,0.197636,0.391528,0.554969,0.321569,0.19586,0.395433,0.555276,0.32549,0.1941,0.399323,0.555565,0.329412,0.192357,0.403199,0.555836,0.333333,0.190631,0.407061,0.556089,0.337255,0.188923,0.41091,0.556326,0.341176,0.187231,0.414746,0.556547,0.345098,0.185556,0.41857,0.556753,0.34902,0.183898,0.422383,0.556944,0.352941,0.182256,0.426184,0.55712,0.356863,0.180629,0.429975,0.557282,0.360784,0.179019,0.433756,0.55743,0.364706,0.177423,0.437527,0.557565,0.368627,0.175841,0.44129,0.557685,0.372549,0.174274,0.445044,0.557792,0.376471,0.172719,0.448791,0.557885,0.380392,0.171176,0.45253,0.557965,0.384314,0.169646,0.456262,0.55803,0.388235,0.168126,0.459988,0.558082,0.392157,0.166617,0.463708,0.558119,0.396078,0.165117,0.467423,0.558141,0.4,0.163625,0.471133,0.558148,0.403922,0.162142,0.474838,0.55814,0.407843,0.160665,0.47854,0.558115,0.411765,0.159194,0.482237,0.558073,0.415686,0.157729,0.485932,0.558013,0.419608,0.15627,0.489624,0.557936,0.423529,0.154815,0.493313,0.55784,0.427451,0.153364,0.497,0.557724,0.431373,0.151918,0.500685,0.557587,0.435294,0.150476,0.504369,0.55743,0.439216,0.149039,0.508051,0.55725,0.443137,0.147607,0.511733,0.557049,0.447059,0.14618,0.515413,0.556823,0.45098,0.144759,0.519093,0.556572,0.454902,0.143343,0.522773,0.556295,0.458824,0.141935,0.526453,0.555991,0.462745,0.140536,0.530132,0.555659,0.466667,0.139147,0.533812,0.555298,0.470588,0.13777,0.537492,0.554906,0.47451,0.136408,0.541173,0.554483,0.478431,0.135066,0.544853,0.554029,0.482353,0.133743,0.548535,0.553541,0.486275,0.132444,0.552216,0.553018,0.490196,0.131172,0.555899,0.552459,0.494118,0.129933,0.559582,0.551864,0.498039,0.128729,0.563265,0.551229,0.501961,0.127568,0.566949,0.550556,0.505882,0.126453,0.570633,0.549841,0.509804,0.125394,0.574318,0.549086,0.513725,0.124395,0.578002,0.548287,0.517647,0.123463,0.581687,0.547445,0.521569,0.122606,0.585371,0.546557,0.52549,0.121831,0.589055,0.545623,0.529412,0.121148,0.592739,0.544641,0.533333,0.120565,0.596422,0.543611,0.537255,0.120092,0.600104,0.54253,0.541176,0.119738,0.603785,0.5414,0.545098,0.119512,0.607464,0.540218,0.54902,0.119423,0.611141,0.538982,0.552941,0.119483,0.614817,0.537692,0.556863,0.119699,0.61849,0.536347,0.560784,0.120081,0.622161,0.534946,0.564706,0.120638,0.625828,0.533488,0.568627,0.12138,0.629492,0.531973,0.572549,0.122312,0.633153,0.530398,0.576471,0.123444,0.636809,0.528763,0.580392,0.12478,0.640461,0.527068,0.584314,0.126326,0.644107,0.525311,0.588235,0.128087,0.647749,0.523491,0.592157,0.130067,0.651384,0.521608,0.596078,0.132268,0.655014,0.519661,0.6,0.134692,0.658636,0.517649,0.603922,0.137339,0.662252,0.515571,0.607843,0.14021,0.665859,0.513427,0.611765,0.143303,0.669459,0.511215,0.615686,0.146616,0.67305,0.508936,0.619608,0.150148,0.676631,0.506589,0.623529,0.153894,0.680203,0.504172,0.627451,0.157851,0.683765,0.501686,0.631373,0.162016,0.687316,0.499129,0.635294,0.166383,0.690856,0.496502,0.639216,0.170948,0.694384,0.493803,0.643137,0.175707,0.6979,0.491033,0.647059,0.180653,0.701402,0.488189,0.65098,0.185783,0.704891,0.485273,0.654902,0.19109,0.708366,0.482284,0.658824,0.196571,0.711827,0.479221,0.662745,0.202219,0.715272,0.476084,0.666667,0.20803,0.718701,0.472873,0.670588,0.214,0.722114,0.469588,0.67451,0.220124,0.725509,0.466226,0.678431,0.226397,0.728888,0.462789,0.682353,0.232815,0.732247,0.459277,0.686275,0.239374,0.735588,0.455688,0.690196,0.24607,0.73891,0.452024,0.694118,0.252899,0.742211,0.448284,0.698039,0.259857,0.745492,0.444467,0.701961,0.266941,0.748751,0.440573,0.705882,0.274149,0.751988,0.436601,0.709804,0.281477,0.755203,0.432552,0.713725,0.288921,0.758394,0.428426,0.717647,0.296479,0.761561,0.424223,0.721569,0.304148,0.764704,0.419943,0.72549,0.311925,0.767822,0.415586,0.729412,0.319809,0.770914,0.411152,0.733333,0.327796,0.77398,0.40664,0.737255,0.335885,0.777018,0.402049,0.741176,0.344074,0.780029,0.397381,0.745098,0.35236,0.783011,0.392636,0.74902,0.360741,0.785964,0.387814,0.752941,0.369214,0.788888,0.382914,0.756863,0.377779,0.791781,0.377939,0.760784,0.386433,0.794644,0.372886,0.764706,0.395174,0.797475,0.367757,0.768627,0.404001,0.800275,0.362552,0.772549,0.412913,0.803041,0.357269,0.776471,0.421908,0.805774,0.35191,0.780392,0.430983,0.808473,0.346476,0.784314,0.440137,0.811138,0.340967,0.788235,0.449368,0.813768,0.335384,0.792157,0.458674,0.816363,0.329727,0.796078,0.468053,0.818921,0.323998,0.8,0.477504,0.821444,0.318195,0.803922,0.487026,0.823929,0.312321,0.807843,0.496615,0.826376,0.306377,0.811765,0.506271,0.828786,0.300362,0.815686,0.515992,0.831158,0.294279,0.819608,0.525776,0.833491,0.288127,0.823529,0.535621,0.835785,0.281908,0.827451,0.545524,0.838039,0.275626,0.831373,0.555484,0.840254,0.269281,0.835294,0.565498,0.84243,0.262877,0.839216,0.575563,0.844566,0.256415,0.843137,0.585678,0.846661,0.249897,0.847059,0.595839,0.848717,0.243329,0.85098,0.606045,0.850733,0.236712,0.854902,0.616293,0.852709,0.230052,0.858824,0.626579,0.854645,0.223353,0.862745,0.636902,0.856542,0.21662,0.866667,0.647257,0.8584,0.209861,0.870588,0.657642,0.860219,0.203082,0.87451,0.668054,0.861999,0.196293,0.878431,0.678489,0.863742,0.189503,0.882353,0.688944,0.865448,0.182725,0.886275,0.699415,0.867117,0.175971,0.890196,0.709898,0.868751,0.169257,0.894118,0.720391,0.87035,0.162603,0.898039,0.730889,0.871916,0.156029,0.901961,0.741388,0.873449,0.149561,0.905882,0.751884,0.874951,0.143228,0.909804,0.762373,0.876424,0.137064,0.913725,0.772852,0.877868,0.131109,0.917647,0.783315,0.879285,0.125405,0.921569,0.79376,0.880678,0.120005,0.92549,0.804182,0.882046,0.114965,0.929412,0.814576,0.883393,0.110347,0.933333,0.82494,0.88472,0.106217,0.937255,0.83527,0.886029,0.102646,0.941176,0.845561,0.887322,0.099702,0.945098,0.85581,0.888601,0.097452,0.94902,0.866013,0.889868,0.095953,0.952941,0.876168,0.891125,0.09525,0.956863,0.886271,0.892374,0.095374,0.960784,0.89632,0.893616,0.096335,0.964706,0.906311,0.894855,0.098125,0.968627,0.916242,0.896091,0.100717,0.972549,0.926106,0.89733,0.104071,0.976471,0.935904,0.89857,0.108131,0.980392,0.945636,0.899815,0.112838,0.984314,0.9553,0.901065,0.118128,0.988235,0.964894,0.902323,0.123941,0.992157,0.974417,0.90359,0.130215,0.996078,0.983868,0.904867,0.136897,1,0.993248,0.906157,0.143936]},{\"ShowIndexedColorActiveValues\":1,\"IndexedColors\":[0.07,0.5,0.7,1,1,1,0.85,1,1,0.8,0.5,1,0.76,1,0,1,0.71,0.71,0.5,0.5,0.5,0.05,0.05,1,1,0.05,0.05,0.7,1,1,0.7,0.89,0.96,0.67,0.36,0.95,0.54,1,0,0.75,0.65,0.65,0.5,0.6,0.6,1,0.5,0,1,1,0.19,0.12,0.94,0.12,0.5,0.82,0.89,0.56,0.25,0.83,0.24,1,0,0.9,0.9,0.9,0.75,0.76,0.78,0.65,0.65,0.67,0.54,0.6,0.78,0.61,0.48,0.78,0.5,0.48,0.78,0.44,0.48,0.78,0.36,0.48,0.76,1,0.48,0.38,0.49,0.5,0.69,0.76,0.56,0.56,0.4,0.56,0.56,0.74,0.5,0.89,1,0.63,0,0.65,0.16,0.16,0.36,0.72,0.82,0.44,0.18,0.69,0,1,0,0.58,1,1,0.58,0.88,0.88,0.45,0.76,0.79,0.33,0.71,0.71,0.23,0.62,0.62,0.14,0.56,0.56,0.04,0.49,0.55,0,0.41,0.52,0.88,0.88,1,1,0.85,0.56,0.65,0.46,0.45,0.4,0.5,0.5,0.62,0.39,0.71,0.83,0.48,0,0.58,0,0.58,0.26,0.62,0.69,0.34,0.09,0.56,0,0.79,0,0.44,0.83,1,1,1,0.78,0.85,1,0.78,0.78,1,0.78,0.64,1,0.78,0.56,1,0.78,0.38,1,0.78,0.27,1,0.78,0.19,1,0.78,0.12,1,0.78,0,1,0.61,0,0.9,0.46,0,0.83,0.32,0,0.75,0.22,0,0.67,0.14,0.3,0.76,1,0.3,0.65,1,0.13,0.58,0.84,0.15,0.49,0.67,0.15,0.4,0.59,0.09,0.33,0.53,0.96,0.93,0.82,0.8,0.82,0.12,0.71,0.71,0.76,0.65,0.33,0.3,0.34,0.35,0.38,0.62,0.31,0.71,0.67,0.36,0,0.46,0.31,0.27,0.26,0.51,0.59,0.26,0,0.4,0,0.49,0,0.44,0.67,0.98,0,0.73,1,0,0.63,1,0,0.56,1,0,0.5,1,0,0.42,1,0.33,0.36,0.95,0.47,0.36,0.89,0.54,0.31,0.89,0.63,0.21,0.83,0.7,0.12,0.83,0.7,0.12,0.73,0.7,0.05,0.65,0.74,0.05,0.53,0.78,0,0.4,0.8,0,0.35,0.82,0,0.31,0.85,0,0.27,0.88,0,0.22,0.9,0,0.18,0.91,0,0.15,0.92,0,0.14,0.93,0,0.13,0.94,0,0.12,0.95,0,0.11,0.96,0,0.1,0.97,0,0.09,0.98,0,0.08,0.99,0,0.07,1,0,0.06],\"Annotations\":[0,\"Xx\",1,\"H\",2,\"He\",3,\"Li\",4,\"Be\",5,\"B\",6,\"C\",7,\"N\",8,\"O\",9,\"F\",10,\"Ne\",11,\"Na\",12,\"Mg\",13,\"Al\",14,\"Si\",15,\"P\",16,\"S\",17,\"Cl\",18,\"Ar\",19,\"K\",20,\"Ca\",21,\"Sc\",22,\"Ti\",23,\"V\",24,\"Cr\",25,\"Mn\",26,\"Fe\",27,\"Co\",28,\"Ni\",29,\"Cu\",30,\"Zn\",31,\"Ga\",32,\"Ge\",33,\"As\",34,\"Se\",35,\"Br\",36,\"Kr\",37,\"Rb\",38,\"Sr\",39,\"Y\",40,\"Zr\",41,\"Nb\",42,\"Mo\",43,\"Tc\",44,\"Ru\",45,\"Rh\",46,\"Pd\",47,\"Ag\",48,\"Cd\",49,\"In\",50,\"Sn\",51,\"Sb\",52,\"Te\",53,\"I\",54,\"Xe\",55,\"Cs\",56,\"Ba\",57,\"La\",58,\"Ce\",59,\"Pr\",60,\"Nd\",61,\"Pm\",62,\"Sm\",63,\"Eu\",64,\"Gd\",65,\"Tb\",66,\"Dy\",67,\"Ho\",68,\"Er\",69,\"Tm\",70,\"Yb\",71,\"Lu\",72,\"Hf\",73,\"Ta\",74,\"W\",75,\"Re\",76,\"Os\",77,\"Ir\",78,\"Pt\",79,\"Au\",80,\"Hg\",81,\"Tl\",82,\"Pb\",83,\"Bi\",84,\"Po\",85,\"At\",86,\"Rn\",87,\"Fr\",88,\"Ra\",89,\"Ac\",90,\"Th\",91,\"Pa\",92,\"U\",93,\"Np\",94,\"Pu\",95,\"Am\",96,\"Cm\",97,\"Bk\",98,\"Cf\",99,\"Es\",100,\"Fm\",101,\"Md\",102,\"No\",103,\"Lr\",104,\"Rf\",105,\"Db\",106,\"Sg\",107,\"Bh\",108,\"Hs\",109,\"Mt\",110,\"Ds\",111,\"Rg\",112,\"Cn\",113,\"Uut\",114,\"Uuq\",115,\"Uup\",116,\"Uuh\",117,\"Uus\",118,\"Uuo\"],\"Name\":\"BlueObeliskElements\"}]");

/***/ }),

/***/ "7a82":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var DESCRIPTORS = __webpack_require__("83ab");
var objectDefinePropertyModile = __webpack_require__("9bf2");

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
$({ target: 'Object', stat: true, forced: !DESCRIPTORS, sham: !DESCRIPTORS }, {
  defineProperty: objectDefinePropertyModile.f
});


/***/ }),

/***/ "7aec":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of Richard Brent's Xorgens xor4096 algorithm.
//
// This fast non-cryptographic random number generator is designed for
// use in Monte-Carlo algorithms. It combines a long-period xorshift
// generator with a Weyl generator, and it passes all common batteries
// of stasticial tests for randomness while consuming only a few nanoseconds
// for each prng generated.  For background on the generator, see Brent's
// paper: "Some long-period random number generators using shifts and xors."
// http://arxiv.org/pdf/1004.3115v1.pdf
//
// Usage:
//
// var xor4096 = require('xor4096');
// random = xor4096(1);                        // Seed with int32 or string.
// assert.equal(random(), 0.1520436450538547); // (0, 1) range, 53 bits.
// assert.equal(random.int32(), 1806534897);   // signed int32, 32 bits.
//
// For nonzero numeric keys, this impelementation provides a sequence
// identical to that by Brent's xorgens 3 implementaion in C.  This
// implementation also provides for initalizing the generator with
// string seeds, or for saving and restoring the state of the generator.
//
// On Chrome, this prng benchmarks about 2.1 times slower than
// Javascript's built-in Math.random().

(function(global, module, define) {

function XorGen(seed) {
  var me = this;

  // Set up generator function.
  me.next = function() {
    var w = me.w,
        X = me.X, i = me.i, t, v;
    // Update Weyl generator.
    me.w = w = (w + 0x61c88647) | 0;
    // Update xor generator.
    v = X[(i + 34) & 127];
    t = X[i = ((i + 1) & 127)];
    v ^= v << 13;
    t ^= t << 17;
    v ^= v >>> 15;
    t ^= t >>> 12;
    // Update Xor generator array state.
    v = X[i] = v ^ t;
    me.i = i;
    // Result is the combination.
    return (v + (w ^ (w >>> 16))) | 0;
  };

  function init(me, seed) {
    var t, v, i, j, w, X = [], limit = 128;
    if (seed === (seed | 0)) {
      // Numeric seeds initialize v, which is used to generates X.
      v = seed;
      seed = null;
    } else {
      // String seeds are mixed into v and X one character at a time.
      seed = seed + '\0';
      v = 0;
      limit = Math.max(limit, seed.length);
    }
    // Initialize circular array and weyl value.
    for (i = 0, j = -32; j < limit; ++j) {
      // Put the unicode characters into the array, and shuffle them.
      if (seed) v ^= seed.charCodeAt((j + 32) % seed.length);
      // After 32 shuffles, take v as the starting w value.
      if (j === 0) w = v;
      v ^= v << 10;
      v ^= v >>> 15;
      v ^= v << 4;
      v ^= v >>> 13;
      if (j >= 0) {
        w = (w + 0x61c88647) | 0;     // Weyl.
        t = (X[j & 127] ^= (v + w));  // Combine xor and weyl to init array.
        i = (0 == t) ? i + 1 : 0;     // Count zeroes.
      }
    }
    // We have detected all zeroes; make the key nonzero.
    if (i >= 128) {
      X[(seed && seed.length || 0) & 127] = -1;
    }
    // Run the generator 512 times to further mix the state before using it.
    // Factoring this as a function slows the main generator, so it is just
    // unrolled here.  The weyl generator is not advanced while warming up.
    i = 127;
    for (j = 4 * 128; j > 0; --j) {
      v = X[(i + 34) & 127];
      t = X[i = ((i + 1) & 127)];
      v ^= v << 13;
      t ^= t << 17;
      v ^= v >>> 15;
      t ^= t >>> 12;
      X[i] = v ^ t;
    }
    // Storing state as object members is faster than using closure variables.
    me.w = w;
    me.X = X;
    me.i = i;
  }

  init(me, seed);
}

function copy(f, t) {
  t.i = f.i;
  t.w = f.w;
  t.X = f.X.slice();
  return t;
};

function impl(seed, opts) {
  if (seed == null) seed = +(new Date);
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (state.X) copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__("07d6") && __webpack_require__("3c35")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xor4096 = impl;
}

})(
  this,                                     // window object or global
   true && module,    // present in node.js
  __webpack_require__("07d6")   // present with an AMD loader
);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("62e4")(module)))

/***/ }),

/***/ "7b0b":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var requireObjectCoercible = __webpack_require__("1d80");

var Object = global.Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "7c73":
/***/ (function(module, exports, __webpack_require__) {

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__("825a");
var defineProperties = __webpack_require__("37e8");
var enumBugKeys = __webpack_require__("7839");
var hiddenKeys = __webpack_require__("d012");
var html = __webpack_require__("1be4");
var documentCreateElement = __webpack_require__("cc12");
var sharedKey = __webpack_require__("f772");

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),

/***/ "7db0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $find = __webpack_require__("b727").find;
var addToUnscopables = __webpack_require__("44d2");

var FIND = 'find';
var SKIPS_HOLES = true;

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.es/ecma262/#sec-array.prototype.find
$({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND);


/***/ }),

/***/ "7dd0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var call = __webpack_require__("c65b");
var IS_PURE = __webpack_require__("c430");
var FunctionName = __webpack_require__("5e77");
var isCallable = __webpack_require__("1626");
var createIteratorConstructor = __webpack_require__("9ed3");
var getPrototypeOf = __webpack_require__("e163");
var setPrototypeOf = __webpack_require__("d2bb");
var setToStringTag = __webpack_require__("d44e");
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var wellKnownSymbol = __webpack_require__("b622");
var Iterators = __webpack_require__("3f8c");
var IteratorsCore = __webpack_require__("ae93");

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
          redefine(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return call(nativeIterator, this); };
    }
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    redefine(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
  }
  Iterators[NAME] = defaultIterator;

  return methods;
};


/***/ }),

/***/ "7f9a":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isCallable = __webpack_require__("1626");
var inspectSource = __webpack_require__("8925");

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ "81d5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toObject = __webpack_require__("7b0b");
var toAbsoluteIndex = __webpack_require__("23cb");
var lengthOfArrayLike = __webpack_require__("07fa");

// `Array.prototype.fill` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.fill
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = lengthOfArrayLike(O);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
  var end = argumentsLength > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),

/***/ "825a":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");

var String = global.String;
var TypeError = global.TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw TypeError(String(argument) + ' is not an object');
};


/***/ }),

/***/ "82f8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $includes = __webpack_require__("4d64").includes;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.includes` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.includes
exportTypedArrayMethod('includes', function includes(searchElement /* , fromIndex */) {
  return $includes(aTypedArray(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "83ab":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ "8416":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint no-negated-condition: 0, no-new-func: 0 */



if (typeof self !== 'undefined') {
	module.exports = self;
} else if (typeof window !== 'undefined') {
	module.exports = window;
} else {
	module.exports = Function('return this')();
}


/***/ }),

/***/ "8418":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toPropertyKey = __webpack_require__("a04b");
var definePropertyModule = __webpack_require__("9bf2");
var createPropertyDescriptor = __webpack_require__("5c6c");

module.exports = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ "84c3":
/***/ (function(module, exports, __webpack_require__) {

var createTypedArrayConstructor = __webpack_require__("74e8");

// `Uint16Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Uint16', function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "861d":
/***/ (function(module, exports, __webpack_require__) {

var isCallable = __webpack_require__("1626");

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ "8875":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "8925":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");
var isCallable = __webpack_require__("1626");
var store = __webpack_require__("c6cd");

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "89ed":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "Tyche-i" prng algorithm by
// Samuel Neves and Filipe Araujo.
// See https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  // Set up generator function.
  me.next = function() {
    var b = me.b, c = me.c, d = me.d, a = me.a;
    b = (b << 25) ^ (b >>> 7) ^ c;
    c = (c - d) | 0;
    d = (d << 24) ^ (d >>> 8) ^ a;
    a = (a - b) | 0;
    me.b = b = (b << 20) ^ (b >>> 12) ^ c;
    me.c = c = (c - d) | 0;
    me.d = (d << 16) ^ (c >>> 16) ^ a;
    return me.a = (a - b) | 0;
  };

  /* The following is non-inverted tyche, which has better internal
   * bit diffusion, but which is about 25% slower than tyche-i in JS.
  me.next = function() {
    var a = me.a, b = me.b, c = me.c, d = me.d;
    a = (me.a + me.b | 0) >>> 0;
    d = me.d ^ a; d = d << 16 ^ d >>> 16;
    c = me.c + d | 0;
    b = me.b ^ c; b = b << 12 ^ d >>> 20;
    me.a = a = a + b | 0;
    d = d ^ a; me.d = d = d << 8 ^ d >>> 24;
    me.c = c = c + d | 0;
    b = b ^ c;
    return me.b = (b << 7 ^ b >>> 25);
  }
  */

  me.a = 0;
  me.b = 0;
  me.c = 2654435769 | 0;
  me.d = 1367130551;

  if (seed === Math.floor(seed)) {
    // Integer seed.
    me.a = (seed / 0x100000000) | 0;
    me.b = seed | 0;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 20; k++) {
    me.b ^= strseed.charCodeAt(k) | 0;
    me.next();
  }
}

function copy(f, t) {
  t.a = f.a;
  t.b = f.b;
  t.c = f.c;
  t.d = f.d;
  return t;
};

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__("07d6") && __webpack_require__("3c35")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.tychei = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__("07d6")   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("62e4")(module)))

/***/ }),

/***/ "8aa7":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-new -- required for testing */
var global = __webpack_require__("da84");
var fails = __webpack_require__("d039");
var checkCorrectnessOfIteration = __webpack_require__("1c7e");
var NATIVE_ARRAY_BUFFER_VIEWS = __webpack_require__("ebb5").NATIVE_ARRAY_BUFFER_VIEWS;

var ArrayBuffer = global.ArrayBuffer;
var Int8Array = global.Int8Array;

module.exports = !NATIVE_ARRAY_BUFFER_VIEWS || !fails(function () {
  Int8Array(1);
}) || !fails(function () {
  new Int8Array(-1);
}) || !checkCorrectnessOfIteration(function (iterable) {
  new Int8Array();
  new Int8Array(null);
  new Int8Array(1.5);
  new Int8Array(iterable);
}, true) || fails(function () {
  // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
  return new Int8Array(new ArrayBuffer(2), 1, undefined).length !== 1;
});


/***/ }),

/***/ "8b09":
/***/ (function(module, exports, __webpack_require__) {

var createTypedArrayConstructor = __webpack_require__("74e8");

// `Int16Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Int16', function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "907a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var lengthOfArrayLike = __webpack_require__("07fa");
var toIntegerOrInfinity = __webpack_require__("5926");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.at` method
// https://github.com/tc39/proposal-relative-indexing-method
exportTypedArrayMethod('at', function at(index) {
  var O = aTypedArray(this);
  var len = lengthOfArrayLike(O);
  var relativeIndex = toIntegerOrInfinity(index);
  var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
  return (k < 0 || k >= len) ? undefined : O[k];
});


/***/ }),

/***/ "90e3":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ "9112":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var definePropertyModule = __webpack_require__("9bf2");
var createPropertyDescriptor = __webpack_require__("5c6c");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "9263":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var call = __webpack_require__("c65b");
var uncurryThis = __webpack_require__("e330");
var toString = __webpack_require__("577e");
var regexpFlags = __webpack_require__("ad6d");
var stickyHelpers = __webpack_require__("9f7f");
var shared = __webpack_require__("5692");
var create = __webpack_require__("7c73");
var getInternalState = __webpack_require__("69f3").get;
var UNSUPPORTED_DOT_ALL = __webpack_require__("fce3");
var UNSUPPORTED_NCG = __webpack_require__("107c");

var nativeReplace = shared('native-string-replace', String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt = uncurryThis(''.charAt);
var indexOf = uncurryThis(''.indexOf);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  call(nativeExec, re1, 'a');
  call(nativeExec, re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

if (PATCH) {
  // eslint-disable-next-line max-statements -- TODO
  patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState(re);
    var str = toString(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = call(patchedExec, raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = call(regexpFlags, re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = replace(flags, 'y', '');
      if (indexOf(flags, 'g') === -1) {
        flags += 'g';
      }

      strCopy = stringSlice(str, re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt(str, re.lastIndex - 1) !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = call(nativeExec, sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = stringSlice(match.input, charsAdded);
        match[0] = stringSlice(match[0], charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      call(nativeReplace, match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "94ca":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var isCallable = __webpack_require__("1626");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "9a1f":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var call = __webpack_require__("c65b");
var aCallable = __webpack_require__("59ed");
var anObject = __webpack_require__("825a");
var tryToString = __webpack_require__("0d51");
var getIteratorMethod = __webpack_require__("35a1");

var TypeError = global.TypeError;

module.exports = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
  throw TypeError(tryToString(argument) + ' is not iterable');
};


/***/ }),

/***/ "9a8c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__("e330");
var ArrayBufferViewCore = __webpack_require__("ebb5");
var $ArrayCopyWithin = __webpack_require__("145e");

var u$ArrayCopyWithin = uncurryThis($ArrayCopyWithin);
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.copyWithin` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.copywithin
exportTypedArrayMethod('copyWithin', function copyWithin(target, start /* , end */) {
  return u$ArrayCopyWithin(aTypedArray(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
});


/***/ }),

/***/ "9bdd":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var iteratorClose = __webpack_require__("2a62");

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator, 'throw', error);
  }
};


/***/ }),

/***/ "9bf2":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var DESCRIPTORS = __webpack_require__("83ab");
var IE8_DOM_DEFINE = __webpack_require__("0cfb");
var anObject = __webpack_require__("825a");
var toPropertyKey = __webpack_require__("a04b");

var TypeError = global.TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "9ed3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var IteratorPrototype = __webpack_require__("ae93").IteratorPrototype;
var create = __webpack_require__("7c73");
var createPropertyDescriptor = __webpack_require__("5c6c");
var setToStringTag = __webpack_require__("d44e");
var Iterators = __webpack_require__("3f8c");

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ "9f7f":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var global = __webpack_require__("da84");

// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
var $RegExp = global.RegExp;

exports.UNSUPPORTED_Y = fails(function () {
  var re = $RegExp('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

exports.BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = $RegExp('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});


/***/ }),

/***/ "a04b":
/***/ (function(module, exports, __webpack_require__) {

var toPrimitive = __webpack_require__("c04e");
var isSymbol = __webpack_require__("d9b5");

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ "a078":
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__("0366");
var call = __webpack_require__("c65b");
var aConstructor = __webpack_require__("5087");
var toObject = __webpack_require__("7b0b");
var lengthOfArrayLike = __webpack_require__("07fa");
var getIterator = __webpack_require__("9a1f");
var getIteratorMethod = __webpack_require__("35a1");
var isArrayIteratorMethod = __webpack_require__("e95a");
var aTypedArrayConstructor = __webpack_require__("ebb5").aTypedArrayConstructor;

module.exports = function from(source /* , mapfn, thisArg */) {
  var C = aConstructor(this);
  var O = toObject(source);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var i, length, result, step, iterator, next;
  if (iteratorMethod && !isArrayIteratorMethod(iteratorMethod)) {
    iterator = getIterator(O, iteratorMethod);
    next = iterator.next;
    O = [];
    while (!(step = call(next, iterator)).done) {
      O.push(step.value);
    }
  }
  if (mapping && argumentsLength > 2) {
    mapfn = bind(mapfn, arguments[2]);
  }
  length = lengthOfArrayLike(O);
  result = new (aTypedArrayConstructor(C))(length);
  for (i = 0; length > i; i++) {
    result[i] = mapping ? mapfn(O[i], i) : O[i];
  }
  return result;
};


/***/ }),

/***/ "a49d":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
Copyright 2019 David Bau.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

(function (global, pool, math) {
//
// The following constants are related to IEEE 754 limits.
//

var width = 256,        // each RC4 output is 0 <= x < 256
    chunks = 6,         // at least six RC4 outputs for each double
    digits = 52,        // there are 52 significant digits in a double
    rngname = 'random', // rngname: name for Math.random and Math.seedrandom
    startdenom = math.pow(width, chunks),
    significance = math.pow(2, digits),
    overflow = significance * 2,
    mask = width - 1,
    nodecrypto;         // node.js crypto module, initialized at the bottom.

//
// seedrandom()
// This is the seedrandom function described above.
//
function seedrandom(seed, options, callback) {
  var key = [];
  options = (options == true) ? { entropy: true } : (options || {});

  // Flatten the seed string or build one from local entropy if needed.
  var shortseed = mixkey(flatten(
    options.entropy ? [seed, tostring(pool)] :
    (seed == null) ? autoseed() : seed, 3), key);

  // Use the seed to initialize an ARC4 generator.
  var arc4 = new ARC4(key);

  // This function returns a random double in [0, 1) that contains
  // randomness in every bit of the mantissa of the IEEE 754 value.
  var prng = function() {
    var n = arc4.g(chunks),             // Start with a numerator n < 2 ^ 48
        d = startdenom,                 //   and denominator d = 2 ^ 48.
        x = 0;                          //   and no 'extra last byte'.
    while (n < significance) {          // Fill up all significant digits by
      n = (n + x) * width;              //   shifting numerator and
      d *= width;                       //   denominator and generating a
      x = arc4.g(1);                    //   new least-significant-byte.
    }
    while (n >= overflow) {             // To avoid rounding up, before adding
      n /= 2;                           //   last byte, shift everything
      d /= 2;                           //   right using integer math until
      x >>>= 1;                         //   we have exactly the desired bits.
    }
    return (n + x) / d;                 // Form the number within [0, 1).
  };

  prng.int32 = function() { return arc4.g(4) | 0; }
  prng.quick = function() { return arc4.g(4) / 0x100000000; }
  prng.double = prng;

  // Mix the randomness into accumulated entropy.
  mixkey(tostring(arc4.S), pool);

  // Calling convention: what to return as a function of prng, seed, is_math.
  return (options.pass || callback ||
      function(prng, seed, is_math_call, state) {
        if (state) {
          // Load the arc4 state from the given state if it has an S array.
          if (state.S) { copy(state, arc4); }
          // Only provide the .state method if requested via options.state.
          prng.state = function() { return copy(arc4, {}); }
        }

        // If called as a method of Math (Math.seedrandom()), mutate
        // Math.random because that is how seedrandom.js has worked since v1.0.
        if (is_math_call) { math[rngname] = prng; return seed; }

        // Otherwise, it is a newer calling convention, so return the
        // prng directly.
        else return prng;
      })(
  prng,
  shortseed,
  'global' in options ? options.global : (this == math),
  options.state);
}

//
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//
function ARC4(key) {
  var t, keylen = key.length,
      me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];

  // The empty key [] is treated as [0].
  if (!keylen) { key = [keylen++]; }

  // Set up S using the standard key scheduling algorithm.
  while (i < width) {
    s[i] = i++;
  }
  for (i = 0; i < width; i++) {
    s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
    s[j] = t;
  }

  // The "g" method returns the next (count) outputs as one number.
  (me.g = function(count) {
    // Using instance members instead of closure state nearly doubles speed.
    var t, r = 0,
        i = me.i, j = me.j, s = me.S;
    while (count--) {
      t = s[i = mask & (i + 1)];
      r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
    }
    me.i = i; me.j = j;
    return r;
    // For robust unpredictability, the function call below automatically
    // discards an initial batch of values.  This is called RC4-drop[256].
    // See http://google.com/search?q=rsa+fluhrer+response&btnI
  })(width);
}

//
// copy()
// Copies internal state of ARC4 to or from a plain object.
//
function copy(f, t) {
  t.i = f.i;
  t.j = f.j;
  t.S = f.S.slice();
  return t;
};

//
// flatten()
// Converts an object tree to nested arrays of strings.
//
function flatten(obj, depth) {
  var result = [], typ = (typeof obj), prop;
  if (depth && typ == 'object') {
    for (prop in obj) {
      try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
    }
  }
  return (result.length ? result : typ == 'string' ? obj : obj + '\0');
}

//
// mixkey()
// Mixes a string seed into a key that is an array of integers, and
// returns a shortened string seed that is equivalent to the result key.
//
function mixkey(seed, key) {
  var stringseed = seed + '', smear, j = 0;
  while (j < stringseed.length) {
    key[mask & j] =
      mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
  }
  return tostring(key);
}

//
// autoseed()
// Returns an object for autoseeding, using window.crypto and Node crypto
// module if available.
//
function autoseed() {
  try {
    var out;
    if (nodecrypto && (out = nodecrypto.randomBytes)) {
      // The use of 'out' to remember randomBytes makes tight minified code.
      out = out(width);
    } else {
      out = new Uint8Array(width);
      (global.crypto || global.msCrypto).getRandomValues(out);
    }
    return tostring(out);
  } catch (e) {
    var browser = global.navigator,
        plugins = browser && browser.plugins;
    return [+new Date, global, plugins, global.screen, tostring(pool)];
  }
}

//
// tostring()
// Converts an array of charcodes to a string
//
function tostring(a) {
  return String.fromCharCode.apply(0, a);
}

//
// When seedrandom.js is loaded, we immediately mix a few bits
// from the built-in RNG into the entropy pool.  Because we do
// not want to interfere with deterministic PRNG state later,
// seedrandom will not call math.random on its own again after
// initialization.
//
mixkey(math.random(), pool);

//
// Nodejs and AMD support: export the implementation as a module using
// either convention.
//
if ( true && module.exports) {
  module.exports = seedrandom;
  // When in node.js, try using crypto package for autoseeding.
  try {
    nodecrypto = __webpack_require__(0);
  } catch (ex) {}
} else if (true) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return seedrandom; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {}


// End anonymous scope, and pass initial values.
})(
  // global: `self` in browsers (including strict mode and web workers),
  // otherwise `this` in Node and other environments
  (typeof self !== 'undefined') ? self : this,
  [],     // pool: entropy pool starts empty
  Math    // math: package containing random, pow, and seedrandom
);


/***/ }),

/***/ "a49e":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xorwow" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  // Set up generator function.
  me.next = function() {
    var t = (me.x ^ (me.x >>> 2));
    me.x = me.y; me.y = me.z; me.z = me.w; me.w = me.v;
    return (me.d = (me.d + 362437 | 0)) +
       (me.v = (me.v ^ (me.v << 4)) ^ (t ^ (t << 1))) | 0;
  };

  me.x = 0;
  me.y = 0;
  me.z = 0;
  me.w = 0;
  me.v = 0;

  if (seed === (seed | 0)) {
    // Integer seed.
    me.x = seed;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 64; k++) {
    me.x ^= strseed.charCodeAt(k) | 0;
    if (k == strseed.length) {
      me.d = me.x << 10 ^ me.x >>> 4;
    }
    me.next();
  }
}

function copy(f, t) {
  t.x = f.x;
  t.y = f.y;
  t.z = f.z;
  t.w = f.w;
  t.v = f.v;
  t.d = f.d;
  return t;
}

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__("07d6") && __webpack_require__("3c35")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xorwow = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__("07d6")   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("62e4")(module)))

/***/ }),

/***/ "a4d3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var getBuiltIn = __webpack_require__("d066");
var apply = __webpack_require__("2ba4");
var call = __webpack_require__("c65b");
var uncurryThis = __webpack_require__("e330");
var IS_PURE = __webpack_require__("c430");
var DESCRIPTORS = __webpack_require__("83ab");
var NATIVE_SYMBOL = __webpack_require__("4930");
var fails = __webpack_require__("d039");
var hasOwn = __webpack_require__("1a2d");
var isArray = __webpack_require__("e8b5");
var isCallable = __webpack_require__("1626");
var isObject = __webpack_require__("861d");
var isPrototypeOf = __webpack_require__("3a9b");
var isSymbol = __webpack_require__("d9b5");
var anObject = __webpack_require__("825a");
var toObject = __webpack_require__("7b0b");
var toIndexedObject = __webpack_require__("fc6a");
var toPropertyKey = __webpack_require__("a04b");
var $toString = __webpack_require__("577e");
var createPropertyDescriptor = __webpack_require__("5c6c");
var nativeObjectCreate = __webpack_require__("7c73");
var objectKeys = __webpack_require__("df75");
var getOwnPropertyNamesModule = __webpack_require__("241c");
var getOwnPropertyNamesExternal = __webpack_require__("057f");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var definePropertyModule = __webpack_require__("9bf2");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var arraySlice = __webpack_require__("f36a");
var redefine = __webpack_require__("6eeb");
var shared = __webpack_require__("5692");
var sharedKey = __webpack_require__("f772");
var hiddenKeys = __webpack_require__("d012");
var uid = __webpack_require__("90e3");
var wellKnownSymbol = __webpack_require__("b622");
var wrappedWellKnownSymbolModule = __webpack_require__("e538");
var defineWellKnownSymbol = __webpack_require__("746f");
var setToStringTag = __webpack_require__("d44e");
var InternalStateModule = __webpack_require__("69f3");
var $forEach = __webpack_require__("b727").forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);

var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var SymbolPrototype = $Symbol && $Symbol[PROTOTYPE];
var TypeError = global.TypeError;
var QObject = global.QObject;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var push = uncurryThis([].push);

var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');

// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate(SymbolPrototype);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPropertyKey(P);
  anObject(Attributes);
  if (hasOwn(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!hasOwn(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (hasOwn(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || call($propertyIsEnumerable, properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPropertyKey(V);
  var enumerable = call(nativePropertyIsEnumerable, this, P);
  if (this === ObjectPrototype && hasOwn(AllSymbols, P) && !hasOwn(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !hasOwn(this, P) || !hasOwn(AllSymbols, P) || hasOwn(this, HIDDEN) && this[HIDDEN][P]
    ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPropertyKey(P);
  if (it === ObjectPrototype && hasOwn(AllSymbols, key) && !hasOwn(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && hasOwn(AllSymbols, key) && !(hasOwn(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!hasOwn(AllSymbols, key) && !hasOwn(hiddenKeys, key)) push(result, key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (hasOwn(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn(ObjectPrototype, key))) {
      push(result, AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.es/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (isPrototypeOf(SymbolPrototype, this)) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) call(setter, ObjectPrototypeSymbols, value);
      if (hasOwn(this, HIDDEN) && hasOwn(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  SymbolPrototype = $Symbol[PROTOTYPE];

  redefine(SymbolPrototype, 'toString', function toString() {
    return getInternalState(this).tag;
  });

  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty(SymbolPrototype, 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    if (!IS_PURE) {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

$({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  // `Symbol.for` method
  // https://tc39.es/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = $toString(key);
    if (hasOwn(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.es/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (hasOwn(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
$({ target: 'Object', stat: true, forced: fails(function () { getOwnPropertySymbolsModule.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule.f(toObject(it));
  }
});

// `JSON.stringify` method behavior with symbols
// https://tc39.es/ecma262/#sec-json.stringify
if ($stringify) {
  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function () {
    var symbol = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) != '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify({ a: symbol }) != '{}'
      // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
  });

  $({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      var args = arraySlice(arguments);
      var $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray(replacer)) replacer = function (key, value) {
        if (isCallable($replacer)) value = call($replacer, this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return apply($stringify, null, args);
    }
  });
}

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
if (!SymbolPrototype[TO_PRIMITIVE]) {
  var valueOf = SymbolPrototype.valueOf;
  // eslint-disable-next-line no-unused-vars -- required for .length
  redefine(SymbolPrototype, TO_PRIMITIVE, function (hint) {
    // TODO: improve hint logic
    return call(valueOf, this);
  });
}
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;


/***/ }),

/***/ "a630":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var from = __webpack_require__("4df4");
var checkCorrectnessOfIteration = __webpack_require__("1c7e");

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  // eslint-disable-next-line es/no-array-from -- required for testing
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.es/ecma262/#sec-array.from
$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from
});


/***/ }),

/***/ "a640":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("d039");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ "a975":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $every = __webpack_require__("b727").every;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.every` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.every
exportTypedArrayMethod('every', function every(callbackfn /* , thisArg */) {
  return $every(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "a981":
/***/ (function(module, exports) {

// eslint-disable-next-line es/no-typed-arrays -- safe
module.exports = typeof ArrayBuffer != 'undefined' && typeof DataView != 'undefined';


/***/ }),

/***/ "a9e3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__("83ab");
var global = __webpack_require__("da84");
var uncurryThis = __webpack_require__("e330");
var isForced = __webpack_require__("94ca");
var redefine = __webpack_require__("6eeb");
var hasOwn = __webpack_require__("1a2d");
var inheritIfRequired = __webpack_require__("7156");
var isPrototypeOf = __webpack_require__("3a9b");
var isSymbol = __webpack_require__("d9b5");
var toPrimitive = __webpack_require__("c04e");
var fails = __webpack_require__("d039");
var getOwnPropertyNames = __webpack_require__("241c").f;
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var defineProperty = __webpack_require__("9bf2").f;
var thisNumberValue = __webpack_require__("408a");
var trim = __webpack_require__("58a8").trim;

var NUMBER = 'Number';
var NativeNumber = global[NUMBER];
var NumberPrototype = NativeNumber.prototype;
var TypeError = global.TypeError;
var arraySlice = uncurryThis(''.slice);
var charCodeAt = uncurryThis(''.charCodeAt);

// `ToNumeric` abstract operation
// https://tc39.es/ecma262/#sec-tonumeric
var toNumeric = function (value) {
  var primValue = toPrimitive(value, 'number');
  return typeof primValue == 'bigint' ? primValue : toNumber(primValue);
};

// `ToNumber` abstract operation
// https://tc39.es/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, 'number');
  var first, third, radix, maxCode, digits, length, index, code;
  if (isSymbol(it)) throw TypeError('Cannot convert a Symbol value to a number');
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = charCodeAt(it, 0);
    if (first === 43 || first === 45) {
      third = charCodeAt(it, 2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (charCodeAt(it, 1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = arraySlice(it, 2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = charCodeAt(digits, index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.es/ecma262/#sec-number-constructor
if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var n = arguments.length < 1 ? 0 : NativeNumber(toNumeric(value));
    var dummy = this;
    // check on 1..constructor(foo) case
    return isPrototypeOf(NumberPrototype, dummy) && fails(function () { thisNumberValue(dummy); })
      ? inheritIfRequired(Object(n), dummy, NumberWrapper) : n;
  };
  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,' +
    // ESNext
    'fromString,range'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (hasOwn(NativeNumber, key = keys[j]) && !hasOwn(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global, NUMBER, NumberWrapper);
}


/***/ }),

/***/ "ac1f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var exec = __webpack_require__("9263");

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ "ace4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var uncurryThis = __webpack_require__("e330");
var fails = __webpack_require__("d039");
var ArrayBufferModule = __webpack_require__("621a");
var anObject = __webpack_require__("825a");
var toAbsoluteIndex = __webpack_require__("23cb");
var toLength = __webpack_require__("50c4");
var speciesConstructor = __webpack_require__("4840");

var ArrayBuffer = ArrayBufferModule.ArrayBuffer;
var DataView = ArrayBufferModule.DataView;
var DataViewPrototype = DataView.prototype;
var un$ArrayBufferSlice = uncurryThis(ArrayBuffer.prototype.slice);
var getUint8 = uncurryThis(DataViewPrototype.getUint8);
var setUint8 = uncurryThis(DataViewPrototype.setUint8);

var INCORRECT_SLICE = fails(function () {
  return !new ArrayBuffer(2).slice(1, undefined).byteLength;
});

// `ArrayBuffer.prototype.slice` method
// https://tc39.es/ecma262/#sec-arraybuffer.prototype.slice
$({ target: 'ArrayBuffer', proto: true, unsafe: true, forced: INCORRECT_SLICE }, {
  slice: function slice(start, end) {
    if (un$ArrayBufferSlice && end === undefined) {
      return un$ArrayBufferSlice(anObject(this), start); // FF fix
    }
    var length = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    var result = new (speciesConstructor(this, ArrayBuffer))(toLength(fin - first));
    var viewSource = new DataView(this);
    var viewTarget = new DataView(result);
    var index = 0;
    while (first < fin) {
      setUint8(viewTarget, index++, getUint8(viewSource, first++));
    } return result;
  }
});


/***/ }),

/***/ "ad6d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__("825a");

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "addb":
/***/ (function(module, exports, __webpack_require__) {

var arraySlice = __webpack_require__("f36a");

var floor = Math.floor;

var mergeSort = function (array, comparefn) {
  var length = array.length;
  var middle = floor(length / 2);
  return length < 8 ? insertionSort(array, comparefn) : merge(
    array,
    mergeSort(arraySlice(array, 0, middle), comparefn),
    mergeSort(arraySlice(array, middle), comparefn),
    comparefn
  );
};

var insertionSort = function (array, comparefn) {
  var length = array.length;
  var i = 1;
  var element, j;

  while (i < length) {
    j = i;
    element = array[i];
    while (j && comparefn(array[j - 1], element) > 0) {
      array[j] = array[--j];
    }
    if (j !== i++) array[j] = element;
  } return array;
};

var merge = function (array, left, right, comparefn) {
  var llength = left.length;
  var rlength = right.length;
  var lindex = 0;
  var rindex = 0;

  while (lindex < llength || rindex < rlength) {
    array[lindex + rindex] = (lindex < llength && rindex < rlength)
      ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
      : lindex < llength ? left[lindex++] : right[rindex++];
  } return array;
};

module.exports = mergeSort;


/***/ }),

/***/ "ae93":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("d039");
var isCallable = __webpack_require__("1626");
var create = __webpack_require__("7c73");
var getPrototypeOf = __webpack_require__("e163");
var redefine = __webpack_require__("6eeb");
var wellKnownSymbol = __webpack_require__("b622");
var IS_PURE = __webpack_require__("c430");

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == undefined || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable(IteratorPrototype[ITERATOR])) {
  redefine(IteratorPrototype, ITERATOR, function () {
    return this;
  });
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ "b041":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var classof = __webpack_require__("f5df");

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


/***/ }),

/***/ "b0c0":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var FUNCTION_NAME_EXISTS = __webpack_require__("5e77").EXISTS;
var uncurryThis = __webpack_require__("e330");
var defineProperty = __webpack_require__("9bf2").f;

var FunctionPrototype = Function.prototype;
var functionToString = uncurryThis(FunctionPrototype.toString);
var nameRE = /^\s*function ([^ (]*)/;
var regExpExec = uncurryThis(nameRE.exec);
var NAME = 'name';

// Function instances `.name` property
// https://tc39.es/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !FUNCTION_NAME_EXISTS) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return regExpExec(nameRE, functionToString(this))[1];
      } catch (error) {
        return '';
      }
    }
  });
}


/***/ }),

/***/ "b189":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = __webpack_require__("d4ab"); // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
module.exports = keysShim;


/***/ }),

/***/ "b39a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("da84");
var apply = __webpack_require__("2ba4");
var ArrayBufferViewCore = __webpack_require__("ebb5");
var fails = __webpack_require__("d039");
var arraySlice = __webpack_require__("f36a");

var Int8Array = global.Int8Array;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var $toLocaleString = [].toLocaleString;

// iOS Safari 6.x fails here
var TO_LOCALE_STRING_BUG = !!Int8Array && fails(function () {
  $toLocaleString.call(new Int8Array(1));
});

var FORCED = fails(function () {
  return [1, 2].toLocaleString() != new Int8Array([1, 2]).toLocaleString();
}) || !fails(function () {
  Int8Array.prototype.toLocaleString.call([1, 2]);
});

// `%TypedArray%.prototype.toLocaleString` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.tolocalestring
exportTypedArrayMethod('toLocaleString', function toLocaleString() {
  return apply(
    $toLocaleString,
    TO_LOCALE_STRING_BUG ? arraySlice(aTypedArray(this)) : aTypedArray(this),
    arraySlice(arguments)
  );
}, FORCED);


/***/ }),

/***/ "b622":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var shared = __webpack_require__("5692");
var hasOwn = __webpack_require__("1a2d");
var uid = __webpack_require__("90e3");
var NATIVE_SYMBOL = __webpack_require__("4930");
var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var symbolFor = Symbol && Symbol['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "b64b":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var toObject = __webpack_require__("7b0b");
var nativeKeys = __webpack_require__("df75");
var fails = __webpack_require__("d039");

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),

/***/ "b6b7":
/***/ (function(module, exports, __webpack_require__) {

var ArrayBufferViewCore = __webpack_require__("ebb5");
var speciesConstructor = __webpack_require__("4840");

var TYPED_ARRAY_CONSTRUCTOR = ArrayBufferViewCore.TYPED_ARRAY_CONSTRUCTOR;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;

// a part of `TypedArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#typedarray-species-create
module.exports = function (originalArray) {
  return aTypedArrayConstructor(speciesConstructor(originalArray, originalArray[TYPED_ARRAY_CONSTRUCTOR]));
};


/***/ }),

/***/ "b727":
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__("0366");
var uncurryThis = __webpack_require__("e330");
var IndexedObject = __webpack_require__("44ad");
var toObject = __webpack_require__("7b0b");
var lengthOfArrayLike = __webpack_require__("07fa");
var arraySpeciesCreate = __webpack_require__("65f0");

var push = uncurryThis([].push);

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_REJECT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that);
    var length = lengthOfArrayLike(self);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push(target, value);      // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push(target, value);      // filterReject
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod(7)
};


/***/ }),

/***/ "b838":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xor128" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  me.x = 0;
  me.y = 0;
  me.z = 0;
  me.w = 0;

  // Set up generator function.
  me.next = function() {
    var t = me.x ^ (me.x << 11);
    me.x = me.y;
    me.y = me.z;
    me.z = me.w;
    return me.w ^= (me.w >>> 19) ^ t ^ (t >>> 8);
  };

  if (seed === (seed | 0)) {
    // Integer seed.
    me.x = seed;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 64; k++) {
    me.x ^= strseed.charCodeAt(k) | 0;
    me.next();
  }
}

function copy(f, t) {
  t.x = f.x;
  t.y = f.y;
  t.z = f.z;
  t.w = f.w;
  return t;
}

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__("07d6") && __webpack_require__("3c35")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xor128 = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__("07d6")   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("62e4")(module)))

/***/ }),

/***/ "bf32":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var implementation = __webpack_require__("8416");

module.exports = function getPolyfill() {
	if (typeof global !== 'object' || !global || global.Math !== Math || global.Array !== Array) {
		return implementation;
	}
	return global;
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "c04e":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var call = __webpack_require__("c65b");
var isObject = __webpack_require__("861d");
var isSymbol = __webpack_require__("d9b5");
var getMethod = __webpack_require__("dc4a");
var ordinaryToPrimitive = __webpack_require__("485a");
var wellKnownSymbol = __webpack_require__("b622");

var TypeError = global.TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ "c1ac":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $filter = __webpack_require__("b727").filter;
var fromSpeciesAndList = __webpack_require__("1448");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.filter` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.filter
exportTypedArrayMethod('filter', function filter(callbackfn /* , thisArg */) {
  var list = $filter(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  return fromSpeciesAndList(this, list);
});


/***/ }),

/***/ "c430":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "c65b":
/***/ (function(module, exports) {

var call = Function.prototype.call;

module.exports = call.bind ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ "c6b6":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ "c6cd":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var setGlobal = __webpack_require__("ce4e");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ "c8ba":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "ca84":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");
var hasOwn = __webpack_require__("1a2d");
var toIndexedObject = __webpack_require__("fc6a");
var indexOf = __webpack_require__("4d64").indexOf;
var hiddenKeys = __webpack_require__("d012");

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ "ca91":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $reduce = __webpack_require__("d58f").left;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.reduce` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduce
exportTypedArrayMethod('reduce', function reduce(callbackfn /* , initialValue */) {
  var length = arguments.length;
  return $reduce(aTypedArray(this), callbackfn, length, length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "cae0":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xorshift7" algorithm by
// François Panneton and Pierre L'ecuyer:
// "On the Xorgshift Random Number Generators"
// http://saluc.engr.uconn.edu/refs/crypto/rng/panneton05onthexorshift.pdf

(function(global, module, define) {

function XorGen(seed) {
  var me = this;

  // Set up generator function.
  me.next = function() {
    // Update xor generator.
    var X = me.x, i = me.i, t, v, w;
    t = X[i]; t ^= (t >>> 7); v = t ^ (t << 24);
    t = X[(i + 1) & 7]; v ^= t ^ (t >>> 10);
    t = X[(i + 3) & 7]; v ^= t ^ (t >>> 3);
    t = X[(i + 4) & 7]; v ^= t ^ (t << 7);
    t = X[(i + 7) & 7]; t = t ^ (t << 13); v ^= t ^ (t << 9);
    X[i] = v;
    me.i = (i + 1) & 7;
    return v;
  };

  function init(me, seed) {
    var j, w, X = [];

    if (seed === (seed | 0)) {
      // Seed state array using a 32-bit integer.
      w = X[0] = seed;
    } else {
      // Seed state using a string.
      seed = '' + seed;
      for (j = 0; j < seed.length; ++j) {
        X[j & 7] = (X[j & 7] << 15) ^
            (seed.charCodeAt(j) + X[(j + 1) & 7] << 13);
      }
    }
    // Enforce an array length of 8, not all zeroes.
    while (X.length < 8) X.push(0);
    for (j = 0; j < 8 && X[j] === 0; ++j);
    if (j == 8) w = X[7] = -1; else w = X[j];

    me.x = X;
    me.i = 0;

    // Discard an initial 256 values.
    for (j = 256; j > 0; --j) {
      me.next();
    }
  }

  init(me, seed);
}

function copy(f, t) {
  t.x = f.x.slice();
  t.i = f.i;
  return t;
}

function impl(seed, opts) {
  if (seed == null) seed = +(new Date);
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (state.x) copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__("07d6") && __webpack_require__("3c35")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xorshift7 = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__("07d6")   // present with an AMD loader
);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("62e4")(module)))

/***/ }),

/***/ "cc12":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "cd26":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var floor = Math.floor;

// `%TypedArray%.prototype.reverse` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.reverse
exportTypedArrayMethod('reverse', function reverse() {
  var that = this;
  var length = aTypedArray(that).length;
  var middle = floor(length / 2);
  var index = 0;
  var value;
  while (index < middle) {
    value = that[index];
    that[index++] = that[--length];
    that[length] = value;
  } return that;
});


/***/ }),

/***/ "ce4e":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "cfc3":
/***/ (function(module, exports, __webpack_require__) {

var createTypedArrayConstructor = __webpack_require__("74e8");

// `Float32Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Float32', function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "d012":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "d039":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "d066":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isCallable = __webpack_require__("1626");

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "d139":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $find = __webpack_require__("b727").find;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.find` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.find
exportTypedArrayMethod('find', function find(predicate /* , thisArg */) {
  return $find(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "d1e7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ "d28b":
/***/ (function(module, exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__("746f");

// `Symbol.iterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');


/***/ }),

/***/ "d2bb":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-proto -- safe */
var uncurryThis = __webpack_require__("e330");
var anObject = __webpack_require__("825a");
var aPossiblePrototype = __webpack_require__("3bbe");

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = uncurryThis(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ "d3b7":
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var redefine = __webpack_require__("6eeb");
var toString = __webpack_require__("b041");

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, { unsafe: true });
}


/***/ }),

/***/ "d44e":
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__("9bf2").f;
var hasOwn = __webpack_require__("1a2d");
var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !hasOwn(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ "d4ab":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};


/***/ }),

/***/ "d58f":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var aCallable = __webpack_require__("59ed");
var toObject = __webpack_require__("7b0b");
var IndexedObject = __webpack_require__("44ad");
var lengthOfArrayLike = __webpack_require__("07fa");

var TypeError = global.TypeError;

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aCallable(callbackfn);
    var O = toObject(that);
    var self = IndexedObject(O);
    var length = lengthOfArrayLike(O);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

module.exports = {
  // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce
  left: createMethod(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
  right: createMethod(true)
};


/***/ }),

/***/ "d5d6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $forEach = __webpack_require__("b727").forEach;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.forEach` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.foreach
exportTypedArrayMethod('forEach', function forEach(callbackfn /* , thisArg */) {
  $forEach(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "d6c7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var slice = Array.prototype.slice;
var isArgs = __webpack_require__("d4ab");

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : __webpack_require__("b189");

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;


/***/ }),

/***/ "d81d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $map = __webpack_require__("b727").map;
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');

// `Array.prototype.map` method
// https://tc39.es/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "d998":
/***/ (function(module, exports, __webpack_require__) {

var UA = __webpack_require__("342f");

module.exports = /MSIE|Trident/.test(UA);


/***/ }),

/***/ "d9b5":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var getBuiltIn = __webpack_require__("d066");
var isCallable = __webpack_require__("1626");
var isPrototypeOf = __webpack_require__("3a9b");
var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");

var Object = global.Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, Object(it));
};


/***/ }),

/***/ "da84":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "dbb4":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var DESCRIPTORS = __webpack_require__("83ab");
var ownKeys = __webpack_require__("56ef");
var toIndexedObject = __webpack_require__("fc6a");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var createProperty = __webpack_require__("8418");

// `Object.getOwnPropertyDescriptors` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject(object);
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    var keys = ownKeys(O);
    var result = {};
    var index = 0;
    var key, descriptor;
    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }
    return result;
  }
});


/***/ }),

/***/ "dc4a":
/***/ (function(module, exports, __webpack_require__) {

var aCallable = __webpack_require__("59ed");

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};


/***/ }),

/***/ "ddb0":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var DOMIterables = __webpack_require__("fdbc");
var DOMTokenListPrototype = __webpack_require__("785a");
var ArrayIteratorMethods = __webpack_require__("e260");
var createNonEnumerableProperty = __webpack_require__("9112");
var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype, COLLECTION_NAME);
}

handlePrototype(DOMTokenListPrototype, 'DOMTokenList');


/***/ }),

/***/ "df75":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("ca84");
var enumBugKeys = __webpack_require__("7839");

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "dfb9":
/***/ (function(module, exports) {

module.exports = function (Constructor, list) {
  var index = 0;
  var length = list.length;
  var result = new Constructor(length);
  while (length > index) result[index] = list[index++];
  return result;
};


/***/ }),

/***/ "e01a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// `Symbol.prototype.description` getter
// https://tc39.es/ecma262/#sec-symbol.prototype.description

var $ = __webpack_require__("23e7");
var DESCRIPTORS = __webpack_require__("83ab");
var global = __webpack_require__("da84");
var uncurryThis = __webpack_require__("e330");
var hasOwn = __webpack_require__("1a2d");
var isCallable = __webpack_require__("1626");
var isPrototypeOf = __webpack_require__("3a9b");
var toString = __webpack_require__("577e");
var defineProperty = __webpack_require__("9bf2").f;
var copyConstructorProperties = __webpack_require__("e893");

var NativeSymbol = global.Symbol;
var SymbolPrototype = NativeSymbol && NativeSymbol.prototype;

if (DESCRIPTORS && isCallable(NativeSymbol) && (!('description' in SymbolPrototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : toString(arguments[0]);
    var result = isPrototypeOf(SymbolPrototype, this)
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };

  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  SymbolWrapper.prototype = SymbolPrototype;
  SymbolPrototype.constructor = SymbolWrapper;

  var NATIVE_SYMBOL = String(NativeSymbol('test')) == 'Symbol(test)';
  var symbolToString = uncurryThis(SymbolPrototype.toString);
  var symbolValueOf = uncurryThis(SymbolPrototype.valueOf);
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  var replace = uncurryThis(''.replace);
  var stringSlice = uncurryThis(''.slice);

  defineProperty(SymbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = symbolValueOf(this);
      var string = symbolToString(symbol);
      if (hasOwn(EmptyStringDescriptionStore, symbol)) return '';
      var desc = NATIVE_SYMBOL ? stringSlice(string, 7, -1) : replace(string, regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  $({ global: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}


/***/ }),

/***/ "e0af":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defineProperties = __webpack_require__("f367");

var implementation = __webpack_require__("8416");
var getPolyfill = __webpack_require__("bf32");
var shim = __webpack_require__("6aa9");

var polyfill = getPolyfill();

var getGlobal = function () { return polyfill; };

defineProperties(getGlobal, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = getGlobal;


/***/ }),

/***/ "e163":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var hasOwn = __webpack_require__("1a2d");
var isCallable = __webpack_require__("1626");
var toObject = __webpack_require__("7b0b");
var sharedKey = __webpack_require__("f772");
var CORRECT_PROTOTYPE_GETTER = __webpack_require__("e177");

var IE_PROTO = sharedKey('IE_PROTO');
var Object = global.Object;
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof Object ? ObjectPrototype : null;
};


/***/ }),

/***/ "e177":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ "e260":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__("fc6a");
var addToUnscopables = __webpack_require__("44d2");
var Iterators = __webpack_require__("3f8c");
var InternalStateModule = __webpack_require__("69f3");
var defineIterator = __webpack_require__("7dd0");

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "e2cc":
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__("6eeb");

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};


/***/ }),

/***/ "e330":
/***/ (function(module, exports) {

var FunctionPrototype = Function.prototype;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;
var callBind = bind && bind.bind(call);

module.exports = bind ? function (fn) {
  return fn && callBind(call, fn);
} : function (fn) {
  return fn && function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ "e439":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var fails = __webpack_require__("d039");
var toIndexedObject = __webpack_require__("fc6a");
var nativeGetOwnPropertyDescriptor = __webpack_require__("06cf").f;
var DESCRIPTORS = __webpack_require__("83ab");

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetOwnPropertyDescriptor(1); });
var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
$({ target: 'Object', stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
  }
});


/***/ }),

/***/ "e538":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

exports.f = wellKnownSymbol;


/***/ }),

/***/ "e58c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable es/no-array-prototype-lastindexof -- safe */
var apply = __webpack_require__("2ba4");
var toIndexedObject = __webpack_require__("fc6a");
var toIntegerOrInfinity = __webpack_require__("5926");
var lengthOfArrayLike = __webpack_require__("07fa");
var arrayMethodIsStrict = __webpack_require__("a640");

var min = Math.min;
var $lastIndexOf = [].lastIndexOf;
var NEGATIVE_ZERO = !!$lastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('lastIndexOf');
var FORCED = NEGATIVE_ZERO || !STRICT_METHOD;

// `Array.prototype.lastIndexOf` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.lastindexof
module.exports = FORCED ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
  // convert -0 to +0
  if (NEGATIVE_ZERO) return apply($lastIndexOf, this, arguments) || 0;
  var O = toIndexedObject(this);
  var length = lengthOfArrayLike(O);
  var index = length - 1;
  if (arguments.length > 1) index = min(index, toIntegerOrInfinity(arguments[1]));
  if (index < 0) index = length + index;
  for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
  return -1;
} : $lastIndexOf;


/***/ }),

/***/ "e893":
/***/ (function(module, exports, __webpack_require__) {

var hasOwn = __webpack_require__("1a2d");
var ownKeys = __webpack_require__("56ef");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var definePropertyModule = __webpack_require__("9bf2");

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ "e8b5":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("c6b6");

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) == 'Array';
};


/***/ }),

/***/ "e91f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $indexOf = __webpack_require__("4d64").indexOf;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.indexOf` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.indexof
exportTypedArrayMethod('indexOf', function indexOf(searchElement /* , fromIndex */) {
  return $indexOf(aTypedArray(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "e95a":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");
var Iterators = __webpack_require__("3f8c");

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ "eac5":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

var floor = Math.floor;

// `IsIntegralNumber` abstract operation
// https://tc39.es/ecma262/#sec-isintegralnumber
// eslint-disable-next-line es/no-number-isinteger -- safe
module.exports = Number.isInteger || function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),

/***/ "ebb5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var NATIVE_ARRAY_BUFFER = __webpack_require__("a981");
var DESCRIPTORS = __webpack_require__("83ab");
var global = __webpack_require__("da84");
var isCallable = __webpack_require__("1626");
var isObject = __webpack_require__("861d");
var hasOwn = __webpack_require__("1a2d");
var classof = __webpack_require__("f5df");
var tryToString = __webpack_require__("0d51");
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var defineProperty = __webpack_require__("9bf2").f;
var isPrototypeOf = __webpack_require__("3a9b");
var getPrototypeOf = __webpack_require__("e163");
var setPrototypeOf = __webpack_require__("d2bb");
var wellKnownSymbol = __webpack_require__("b622");
var uid = __webpack_require__("90e3");

var Int8Array = global.Int8Array;
var Int8ArrayPrototype = Int8Array && Int8Array.prototype;
var Uint8ClampedArray = global.Uint8ClampedArray;
var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
var TypedArray = Int8Array && getPrototypeOf(Int8Array);
var TypedArrayPrototype = Int8ArrayPrototype && getPrototypeOf(Int8ArrayPrototype);
var ObjectPrototype = Object.prototype;
var TypeError = global.TypeError;

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG');
var TYPED_ARRAY_CONSTRUCTOR = uid('TYPED_ARRAY_CONSTRUCTOR');
// Fixing native typed arrays in Opera Presto crashes the browser, see #595
var NATIVE_ARRAY_BUFFER_VIEWS = NATIVE_ARRAY_BUFFER && !!setPrototypeOf && classof(global.opera) !== 'Opera';
var TYPED_ARRAY_TAG_REQIRED = false;
var NAME, Constructor, Prototype;

var TypedArrayConstructorsList = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
};

var BigIntArrayConstructorsList = {
  BigInt64Array: 8,
  BigUint64Array: 8
};

var isView = function isView(it) {
  if (!isObject(it)) return false;
  var klass = classof(it);
  return klass === 'DataView'
    || hasOwn(TypedArrayConstructorsList, klass)
    || hasOwn(BigIntArrayConstructorsList, klass);
};

var isTypedArray = function (it) {
  if (!isObject(it)) return false;
  var klass = classof(it);
  return hasOwn(TypedArrayConstructorsList, klass)
    || hasOwn(BigIntArrayConstructorsList, klass);
};

var aTypedArray = function (it) {
  if (isTypedArray(it)) return it;
  throw TypeError('Target is not a typed array');
};

var aTypedArrayConstructor = function (C) {
  if (isCallable(C) && (!setPrototypeOf || isPrototypeOf(TypedArray, C))) return C;
  throw TypeError(tryToString(C) + ' is not a typed array constructor');
};

var exportTypedArrayMethod = function (KEY, property, forced) {
  if (!DESCRIPTORS) return;
  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
    var TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && hasOwn(TypedArrayConstructor.prototype, KEY)) try {
      delete TypedArrayConstructor.prototype[KEY];
    } catch (error) { /* empty */ }
  }
  if (!TypedArrayPrototype[KEY] || forced) {
    redefine(TypedArrayPrototype, KEY, forced ? property
      : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property);
  }
};

var exportTypedArrayStaticMethod = function (KEY, property, forced) {
  var ARRAY, TypedArrayConstructor;
  if (!DESCRIPTORS) return;
  if (setPrototypeOf) {
    if (forced) for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = global[ARRAY];
      if (TypedArrayConstructor && hasOwn(TypedArrayConstructor, KEY)) try {
        delete TypedArrayConstructor[KEY];
      } catch (error) { /* empty */ }
    }
    if (!TypedArray[KEY] || forced) {
      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
      try {
        return redefine(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && TypedArray[KEY] || property);
      } catch (error) { /* empty */ }
    } else return;
  }
  for (ARRAY in TypedArrayConstructorsList) {
    TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
      redefine(TypedArrayConstructor, KEY, property);
    }
  }
};

for (NAME in TypedArrayConstructorsList) {
  Constructor = global[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) createNonEnumerableProperty(Prototype, TYPED_ARRAY_CONSTRUCTOR, Constructor);
  else NATIVE_ARRAY_BUFFER_VIEWS = false;
}

for (NAME in BigIntArrayConstructorsList) {
  Constructor = global[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) createNonEnumerableProperty(Prototype, TYPED_ARRAY_CONSTRUCTOR, Constructor);
}

// WebKit bug - typed arrays constructors prototype is Object.prototype
if (!NATIVE_ARRAY_BUFFER_VIEWS || !isCallable(TypedArray) || TypedArray === Function.prototype) {
  // eslint-disable-next-line no-shadow -- safe
  TypedArray = function TypedArray() {
    throw TypeError('Incorrect invocation');
  };
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME], TypedArray);
  }
}

if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype) {
  TypedArrayPrototype = TypedArray.prototype;
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME].prototype, TypedArrayPrototype);
  }
}

// WebKit bug - one more object in Uint8ClampedArray prototype chain
if (NATIVE_ARRAY_BUFFER_VIEWS && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
  setPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
}

if (DESCRIPTORS && !hasOwn(TypedArrayPrototype, TO_STRING_TAG)) {
  TYPED_ARRAY_TAG_REQIRED = true;
  defineProperty(TypedArrayPrototype, TO_STRING_TAG, { get: function () {
    return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
  } });
  for (NAME in TypedArrayConstructorsList) if (global[NAME]) {
    createNonEnumerableProperty(global[NAME], TYPED_ARRAY_TAG, NAME);
  }
}

module.exports = {
  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
  TYPED_ARRAY_CONSTRUCTOR: TYPED_ARRAY_CONSTRUCTOR,
  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQIRED && TYPED_ARRAY_TAG,
  aTypedArray: aTypedArray,
  aTypedArrayConstructor: aTypedArrayConstructor,
  exportTypedArrayMethod: exportTypedArrayMethod,
  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
  isView: isView,
  isTypedArray: isTypedArray,
  TypedArray: TypedArray,
  TypedArrayPrototype: TypedArrayPrototype
};


/***/ }),

/***/ "f367":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys = __webpack_require__("d6c7");
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		origDefineProperty(obj, 'x', { enumerable: false, value: obj });
		// eslint-disable-next-line no-unused-vars, no-restricted-syntax
		for (var _ in obj) { // jscs:ignore disallowUnusedVariables
			return false;
		}
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		origDefineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;


/***/ }),

/***/ "f36a":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");

module.exports = uncurryThis([].slice);


/***/ }),

/***/ "f5df":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var isCallable = __webpack_require__("1626");
var classofRaw = __webpack_require__("c6b6");
var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var Object = global.Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ "f772":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5692");
var uid = __webpack_require__("90e3");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "f8cd":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var toIntegerOrInfinity = __webpack_require__("5926");

var RangeError = global.RangeError;

module.exports = function (it) {
  var result = toIntegerOrInfinity(it);
  if (result < 0) throw RangeError("The argument can't be less than 0");
  return result;
};


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("8875")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.for-each.js
var es_array_for_each = __webpack_require__("4160");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__("159b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"41d7cb69-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./src/components/XaiImage/template.html?vue&type=template&id=7af16a10&
var templatevue_type_template_id_7af16a10_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{style:(_vm.containerStyle)},[_c('img',{ref:"image",style:(_vm.imageStyle),attrs:{"src":_vm.src}}),_c('svg',{style:(_vm.annotationStyle),attrs:{"viewBox":("0 0 " + _vm.imageWidth + " " + _vm.imageHeight),"xmlns":"http://www.w3.org/2000/svg"}},_vm._l((_vm.decoratedAreas),function(item,idx){return _c('rect',_vm._b({key:idx,attrs:{"x":item.area[0],"y":item.area[1],"width":item.area[2],"height":item.area[3],"stroke":item.color,"opacity":item.opacity,"fill":"none"}},'rect',_vm.areaStyle,false))}),0),_c('xai-heat-map',{style:(_vm.heatMapStyle),attrs:{"heatmap":_vm.activeHeatmap,"shape":_vm.shape,"colorMode":_vm.heatmapColorMode,"colorRange":_vm.heatmapColorRange,"colorPreset":_vm.heatmapColorPreset}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/XaiImage/template.html?vue&type=template&id=7af16a10&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__("a4d3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptor.js
var es_object_get_own_property_descriptor = __webpack_require__("e439");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptors.js
var es_object_get_own_property_descriptors = __webpack_require__("dbb4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.define-properties.js
var es_object_define_properties = __webpack_require__("1d1c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.define-property.js
var es_object_define_property = __webpack_require__("7a82");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js












function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("a9e3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find.js
var es_array_find = __webpack_require__("7db0");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"41d7cb69-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./src/components/XaiHeatMap/template.html?vue&type=template&id=c6afef32&
var templatevue_type_template_id_c6afef32_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('canvas',{attrs:{"width":_vm.width,"height":_vm.height},on:{"mousemove":_vm.onMouseMove,"mouseenter":_vm.onMouseEnter,"mouseleave":function($event){return _vm.$emit('exit')}}})}
var templatevue_type_template_id_c6afef32_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/XaiHeatMap/template.html?vue&type=template&id=c6afef32&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.is-array.js
var es_array_is_array = __webpack_require__("277d");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.description.js
var es_symbol_description = __webpack_require__("e01a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.iterator.js
var es_symbol_iterator = __webpack_require__("d28b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__("e260");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__("3ca3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js







function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__("fb6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.from.js
var es_array_from = __webpack_require__("a630");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.test.js
var es_regexp_test = __webpack_require__("00b4");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js








function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js




function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array-buffer.slice.js
var es_array_buffer_slice = __webpack_require__("ace4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.float32-array.js
var es_typed_array_float32_array = __webpack_require__("cfc3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.at.js
var es_typed_array_at = __webpack_require__("907a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.copy-within.js
var es_typed_array_copy_within = __webpack_require__("9a8c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.every.js
var es_typed_array_every = __webpack_require__("a975");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.fill.js
var es_typed_array_fill = __webpack_require__("735e");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.filter.js
var es_typed_array_filter = __webpack_require__("c1ac");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.find.js
var es_typed_array_find = __webpack_require__("d139");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.find-index.js
var es_typed_array_find_index = __webpack_require__("3a7b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.for-each.js
var es_typed_array_for_each = __webpack_require__("d5d6");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.includes.js
var es_typed_array_includes = __webpack_require__("82f8");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.index-of.js
var es_typed_array_index_of = __webpack_require__("e91f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.iterator.js
var es_typed_array_iterator = __webpack_require__("60bd");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.join.js
var es_typed_array_join = __webpack_require__("5f96");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.last-index-of.js
var es_typed_array_last_index_of = __webpack_require__("3280");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.map.js
var es_typed_array_map = __webpack_require__("3fcc");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.reduce.js
var es_typed_array_reduce = __webpack_require__("ca91");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.reduce-right.js
var es_typed_array_reduce_right = __webpack_require__("25a1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.reverse.js
var es_typed_array_reverse = __webpack_require__("cd26");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.set.js
var es_typed_array_set = __webpack_require__("3c5d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.slice.js
var es_typed_array_slice = __webpack_require__("2954");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.some.js
var es_typed_array_some = __webpack_require__("649e");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.sort.js
var es_typed_array_sort = __webpack_require__("219c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.subarray.js
var es_typed_array_subarray = __webpack_require__("170b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.to-locale-string.js
var es_typed_array_to_locale_string = __webpack_require__("b39a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.to-string.js
var es_typed_array_to_string = __webpack_require__("72f7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.float64-array.js
var es_typed_array_float64_array = __webpack_require__("4a9b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.uint8-array.js
var es_typed_array_uint8_array = __webpack_require__("5cc6");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.uint16-array.js
var es_typed_array_uint16_array = __webpack_require__("84c3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.uint32-array.js
var es_typed_array_uint32_array = __webpack_require__("fb2c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.int8-array.js
var es_typed_array_int8_array = __webpack_require__("fd87");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.int16-array.js
var es_typed_array_int16_array = __webpack_require__("8b09");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.int32-array.js
var es_typed_array_int32_array = __webpack_require__("143c");

// EXTERNAL MODULE: ./node_modules/globalthis/index.js
var globalthis = __webpack_require__("e0af");
var globalthis_default = /*#__PURE__*/__webpack_require__.n(globalthis);

// CONCATENATED MODULE: ./node_modules/vtk.js/Sources/vtk.js


const vtkGlobal = globalthis_default()(); // returns native globalThis if compliant

const factoryMapping = {
  vtkObject: () => null,
};

function vtk(obj) {
  if (obj === null || obj === undefined) {
    return obj;
  }
  if (obj.isA) {
    return obj;
  }
  if (!obj.vtkClass) {
    if (vtkGlobal.console && vtkGlobal.console.error) {
      vtkGlobal.console.error('Invalid VTK object');
    }
    return null;
  }
  const constructor = factoryMapping[obj.vtkClass];
  if (!constructor) {
    if (vtkGlobal.console && vtkGlobal.console.error) {
      vtkGlobal.console.error(
        `No vtk class found for Object of type ${obj.vtkClass}`
      );
    }
    return null;
  }

  // Shallow copy object
  const model = { ...obj };

  // Convert into vtkObject any nested key
  Object.keys(model).forEach((keyName) => {
    if (
      model[keyName] &&
      typeof model[keyName] === 'object' &&
      model[keyName].vtkClass
    ) {
      model[keyName] = vtk(model[keyName]);
    }
  });

  // Return the root
  const newInst = constructor(model);
  if (newInst && newInst.modified) {
    newInst.modified();
  }
  return newInst;
}

function register(vtkClassName, constructor) {
  factoryMapping[vtkClassName] = constructor;
}

// Nest register method under the vtk function
vtk.register = register;

// CONCATENATED MODULE: ./node_modules/vtk.js/Sources/Common/Core/ClassHierarchy/index.js
class ClassHierarchy extends Array {
  push(...args) {
    // no perf issue since args.length should be small
    const newArgs = args.filter((arg) => !this.includes(arg));
    return super.push(...newArgs);
  }
}

// CONCATENATED MODULE: ./node_modules/vtk.js/Sources/macros.js
/**
 * macros.js is the old macro.js.
 * The name change is so we do not get eaten by babel-plugin-macros.
 */



let globalMTime = 0;

const VOID = Symbol('void');

function getCurrentGlobalMTime() {
  return globalMTime;
}

// ----------------------------------------------------------------------------
// Logging function calls
// ----------------------------------------------------------------------------
/* eslint-disable no-prototype-builtins                                      */

const fakeConsole = {};

function noOp() {}

const consoleMethods = [
  'log',
  'debug',
  'info',
  'warn',
  'error',
  'time',
  'timeEnd',
  'group',
  'groupEnd',
];
consoleMethods.forEach((methodName) => {
  fakeConsole[methodName] = noOp;
});

vtkGlobal.console = console.hasOwnProperty('log') ? console : fakeConsole;

const loggerFunctions = {
  debug: noOp, // Don't print debug by default
  error: vtkGlobal.console.error || noOp,
  info: vtkGlobal.console.info || noOp,
  log: vtkGlobal.console.log || noOp,
  warn: vtkGlobal.console.warn || noOp,
};

function setLoggerFunction(name, fn) {
  if (loggerFunctions[name]) {
    loggerFunctions[name] = fn || noOp;
  }
}

function vtkLogMacro(...args) {
  loggerFunctions.log(...args);
}

function vtkInfoMacro(...args) {
  loggerFunctions.info(...args);
}

function vtkDebugMacro(...args) {
  loggerFunctions.debug(...args);
}

function vtkErrorMacro(...args) {
  loggerFunctions.error(...args);
}

function vtkWarningMacro(...args) {
  loggerFunctions.warn(...args);
}

const ERROR_ONCE_MAP = {};
function vtkOnceErrorMacro(str) {
  if (!ERROR_ONCE_MAP[str]) {
    loggerFunctions.error(str);
    ERROR_ONCE_MAP[str] = true;
  }
}

// ----------------------------------------------------------------------------
// TypedArray
// ----------------------------------------------------------------------------

const TYPED_ARRAYS = Object.create(null);
TYPED_ARRAYS.Float32Array = Float32Array;
TYPED_ARRAYS.Float64Array = Float64Array;
TYPED_ARRAYS.Uint8Array = Uint8Array;
TYPED_ARRAYS.Int8Array = Int8Array;
TYPED_ARRAYS.Uint16Array = Uint16Array;
TYPED_ARRAYS.Int16Array = Int16Array;
TYPED_ARRAYS.Uint32Array = Uint32Array;
TYPED_ARRAYS.Int32Array = Int32Array;
TYPED_ARRAYS.Uint8ClampedArray = Uint8ClampedArray;
// TYPED_ARRAYS.BigInt64Array = BigInt64Array;
// TYPED_ARRAYS.BigUint64Array = BigUint64Array;

function newTypedArray(type, ...args) {
  return new (TYPED_ARRAYS[type] || Float64Array)(...args);
}

function newTypedArrayFrom(type, ...args) {
  return (TYPED_ARRAYS[type] || Float64Array).from(...args);
}

// ----------------------------------------------------------------------------
// capitilze provided string
// ----------------------------------------------------------------------------

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function uncapitalize(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

// ----------------------------------------------------------------------------
// Convert byte size into a well formatted string
// ----------------------------------------------------------------------------

function formatBytesToProperUnit(size, precision = 2, chunkSize = 1000) {
  const units = ['TB', 'GB', 'MB', 'KB'];
  let value = Number(size);
  let currentUnit = 'B';
  while (value > chunkSize) {
    value /= chunkSize;
    currentUnit = units.pop();
  }
  return `${value.toFixed(precision)} ${currentUnit}`;
}
// ----------------------------------------------------------------------------
// Convert thousand number with proper separator
// ----------------------------------------------------------------------------

function formatNumbersWithThousandSeparator(n, separator = ' ') {
  const sections = [];
  let size = n;
  while (size > 1000) {
    sections.push(`000${size % 1000}`.slice(-3));
    size = Math.floor(size / 1000);
  }
  if (size > 0) {
    sections.push(size);
  }
  sections.reverse();
  return sections.join(separator);
}

// ----------------------------------------------------------------------------
// Array helper
// ----------------------------------------------------------------------------

function safeArrays(model) {
  Object.keys(model).forEach((key) => {
    if (Array.isArray(model[key])) {
      model[key] = [].concat(model[key]);
    }
  });
}

// ----------------------------------------------------------------------------
// shallow equals
// ----------------------------------------------------------------------------

function shallowEquals(a, b) {
  if (a === b) {
    return true;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }

  return false;
}

// ----------------------------------------------------------------------------

function enumToString(e, value) {
  return Object.keys(e).find((key) => e[key] === value);
}

function getStateArrayMapFunc(item) {
  if (item.isA) {
    return item.getState();
  }
  return item;
}

// ----------------------------------------------------------------------------
// setImmediate
// ----------------------------------------------------------------------------

function setImmediateVTK(fn) {
  setTimeout(fn, 0);
}

// ----------------------------------------------------------------------------
// vtkObject: modified(), onModified(callback), delete()
// ----------------------------------------------------------------------------

function obj(publicAPI = {}, model = {}) {
  // Ensure each instance as a unique ref of array
  safeArrays(model);

  const callbacks = [];
  if (!Number.isInteger(model.mtime)) {
    model.mtime = ++globalMTime;
  }

  if (!('classHierarchy' in model)) {
    model.classHierarchy = new ClassHierarchy('vtkObject');
  } else if (!(model.classHierarchy instanceof ClassHierarchy)) {
    model.classHierarchy = ClassHierarchy.from(model.classHierarchy);
  }

  function off(index) {
    callbacks[index] = null;
  }

  function on(index) {
    function unsubscribe() {
      off(index);
    }
    return Object.freeze({
      unsubscribe,
    });
  }

  publicAPI.isDeleted = () => !!model.deleted;

  publicAPI.modified = (otherMTime) => {
    if (model.deleted) {
      vtkErrorMacro('instance deleted - cannot call any method');
      return;
    }

    if (otherMTime && otherMTime < publicAPI.getMTime()) {
      return;
    }

    model.mtime = ++globalMTime;
    callbacks.forEach((callback) => callback && callback(publicAPI));
  };

  publicAPI.onModified = (callback) => {
    if (model.deleted) {
      vtkErrorMacro('instance deleted - cannot call any method');
      return null;
    }

    const index = callbacks.length;
    callbacks.push(callback);
    return on(index);
  };

  publicAPI.getMTime = () => model.mtime;

  publicAPI.isA = (className) => {
    let count = model.classHierarchy.length;
    // we go backwards as that is more likely for
    // early termination
    while (count--) {
      if (model.classHierarchy[count] === className) {
        return true;
      }
    }
    return false;
  };

  publicAPI.getClassName = (depth = 0) =>
    model.classHierarchy[model.classHierarchy.length - 1 - depth];

  publicAPI.set = (map = {}, noWarning = false, noFunction = false) => {
    let ret = false;
    Object.keys(map).forEach((name) => {
      const fn = noFunction ? null : publicAPI[`set${capitalize(name)}`];
      if (fn && Array.isArray(map[name]) && fn.length > 1) {
        ret = fn(...map[name]) || ret;
      } else if (fn) {
        ret = fn(map[name]) || ret;
      } else {
        // Set data on model directly
        if (['mtime'].indexOf(name) === -1 && !noWarning) {
          vtkWarningMacro(
            `Warning: Set value to model directly ${name}, ${map[name]}`
          );
        }
        model[name] = map[name];
        ret = true;
      }
    });
    return ret;
  };

  publicAPI.get = (...list) => {
    if (!list.length) {
      return model;
    }
    const subset = {};
    list.forEach((name) => {
      subset[name] = model[name];
    });
    return subset;
  };

  publicAPI.getReferenceByName = (val) => model[val];

  publicAPI.delete = () => {
    Object.keys(model).forEach((field) => delete model[field]);
    callbacks.forEach((el, index) => off(index));

    // Flag the instance being deleted
    model.deleted = true;
  };

  // Add serialization support
  publicAPI.getState = () => {
    const jsonArchive = { ...model, vtkClass: publicAPI.getClassName() };

    // Convert every vtkObject to its serializable form
    Object.keys(jsonArchive).forEach((keyName) => {
      if (
        jsonArchive[keyName] === null ||
        jsonArchive[keyName] === undefined ||
        keyName[0] === '_' // protected members start with _
      ) {
        delete jsonArchive[keyName];
      } else if (jsonArchive[keyName].isA) {
        jsonArchive[keyName] = jsonArchive[keyName].getState();
      } else if (Array.isArray(jsonArchive[keyName])) {
        jsonArchive[keyName] = jsonArchive[keyName].map(getStateArrayMapFunc);
      }
    });

    // Sort resulting object by key name
    const sortedObj = {};
    Object.keys(jsonArchive)
      .sort()
      .forEach((name) => {
        sortedObj[name] = jsonArchive[name];
      });

    // Remove mtime
    if (sortedObj.mtime) {
      delete sortedObj.mtime;
    }

    return sortedObj;
  };

  // Add shallowCopy(otherInstance) support
  publicAPI.shallowCopy = (other, debug = false) => {
    if (other.getClassName() !== publicAPI.getClassName()) {
      throw new Error(
        `Cannot ShallowCopy ${other.getClassName()} into ${publicAPI.getClassName()}`
      );
    }
    const otherModel = other.get();

    const keyList = Object.keys(model).sort();
    const otherKeyList = Object.keys(otherModel).sort();

    otherKeyList.forEach((key) => {
      const keyIdx = keyList.indexOf(key);
      if (keyIdx === -1) {
        if (debug) {
          vtkDebugMacro(`add ${key} in shallowCopy`);
        }
      } else {
        keyList.splice(keyIdx, 1);
      }
      model[key] = otherModel[key];
    });
    if (keyList.length && debug) {
      vtkDebugMacro(`Untouched keys: ${keyList.join(', ')}`);
    }

    publicAPI.modified();
  };

  // Allow usage as decorator
  return publicAPI;
}

// ----------------------------------------------------------------------------
// getXXX: add getters
// ----------------------------------------------------------------------------

function get(publicAPI, model, fieldNames) {
  fieldNames.forEach((field) => {
    if (typeof field === 'object') {
      publicAPI[`get${capitalize(field.name)}`] = () => model[field.name];
    } else {
      publicAPI[`get${capitalize(field)}`] = () => model[field];
    }
  });
}

// ----------------------------------------------------------------------------
// setXXX: add setters
// ----------------------------------------------------------------------------

const objectSetterMap = {
  enum(publicAPI, model, field) {
    return (value) => {
      if (typeof value === 'string') {
        if (field.enum[value] !== undefined) {
          if (model[field.name] !== field.enum[value]) {
            model[field.name] = field.enum[value];
            publicAPI.modified();
            return true;
          }
          return false;
        }
        vtkErrorMacro(`Set Enum with invalid argument ${field}, ${value}`);
        throw new RangeError('Set Enum with invalid string argument');
      }
      if (typeof value === 'number') {
        if (model[field.name] !== value) {
          if (
            Object.keys(field.enum)
              .map((key) => field.enum[key])
              .indexOf(value) !== -1
          ) {
            model[field.name] = value;
            publicAPI.modified();
            return true;
          }
          vtkErrorMacro(`Set Enum outside numeric range ${field}, ${value}`);
          throw new RangeError('Set Enum outside numeric range');
        }
        return false;
      }
      vtkErrorMacro(
        `Set Enum with invalid argument (String/Number) ${field}, ${value}`
      );
      throw new TypeError('Set Enum with invalid argument (String/Number)');
    };
  },
};

function findSetter(field) {
  if (typeof field === 'object') {
    const fn = objectSetterMap[field.type];
    if (fn) {
      return (publicAPI, model) => fn(publicAPI, model, field);
    }

    vtkErrorMacro(`No setter for field ${field}`);
    throw new TypeError('No setter for field');
  }
  return function getSetter(publicAPI, model) {
    return function setter(value) {
      if (model.deleted) {
        vtkErrorMacro('instance deleted - cannot call any method');
        return false;
      }

      if (model[field] !== value) {
        model[field] = value;
        publicAPI.modified();
        return true;
      }
      return false;
    };
  };
}

function set(publicAPI, model, fields) {
  fields.forEach((field) => {
    if (typeof field === 'object') {
      publicAPI[`set${capitalize(field.name)}`] = findSetter(field)(
        publicAPI,
        model
      );
    } else {
      publicAPI[`set${capitalize(field)}`] = findSetter(field)(
        publicAPI,
        model
      );
    }
  });
}

// ----------------------------------------------------------------------------
// set/get XXX: add both setters and getters
// ----------------------------------------------------------------------------

function setGet(publicAPI, model, fieldNames) {
  get(publicAPI, model, fieldNames);
  set(publicAPI, model, fieldNames);
}

// ----------------------------------------------------------------------------
// getXXX: add getters for object of type array with copy to be safe
// getXXXByReference: add getters for object of type array without copy
// ----------------------------------------------------------------------------

function getArray(publicAPI, model, fieldNames) {
  fieldNames.forEach((field) => {
    publicAPI[`get${capitalize(field)}`] = () =>
      model[field] ? [].concat(model[field]) : model[field];
    publicAPI[`get${capitalize(field)}ByReference`] = () => model[field];
  });
}

// ----------------------------------------------------------------------------
// setXXX: add setter for object of type array
// if 'defaultVal' is supplied, shorter arrays will be padded to 'size' with 'defaultVal'
// set...From: fast path to copy the content of an array to the current one without call to modified.
// ----------------------------------------------------------------------------

function setArray(
  publicAPI,
  model,
  fieldNames,
  size,
  defaultVal = undefined
) {
  fieldNames.forEach((field) => {
    if (model[field] && size && model[field].length !== size) {
      throw new RangeError(
        `Invalid initial number of values for array (${field})`
      );
    }

    publicAPI[`set${capitalize(field)}`] = (...args) => {
      if (model.deleted) {
        vtkErrorMacro('instance deleted - cannot call any method');
        return false;
      }

      let array = args;
      let changeDetected;
      // allow null or an array to be passed as a single arg.
      if (array.length === 1 && (array[0] == null || array[0].length >= 0)) {
        /* eslint-disable prefer-destructuring */
        array = array[0];
        /* eslint-enable prefer-destructuring */
      }
      if (array == null) {
        changeDetected = model[field] !== array;
      } else {
        if (size && array.length !== size) {
          if (array.length < size && defaultVal !== undefined) {
            array = Array.from(array);
            while (array.length < size) array.push(defaultVal);
          } else {
            throw new RangeError(
              `Invalid number of values for array setter (${field})`
            );
          }
        }
        changeDetected =
          model[field] == null ||
          model[field].some((item, index) => item !== array[index]) ||
          model[field].length !== array.length;
        if (changeDetected && !Array.isArray(array)) {
          array = Array.from(array);
        }
      }

      if (changeDetected) {
        model[field] = array;
        publicAPI.modified();
      }
      return changeDetected;
    };

    publicAPI[`set${capitalize(field)}From`] = (otherArray) => {
      const target = model[field];
      otherArray.forEach((v, i) => {
        target[i] = v;
      });
    };
  });
}

// ----------------------------------------------------------------------------
// set/get XXX: add setter and getter for object of type array
// ----------------------------------------------------------------------------

function setGetArray(
  publicAPI,
  model,
  fieldNames,
  size,
  defaultVal = undefined
) {
  getArray(publicAPI, model, fieldNames);
  setArray(publicAPI, model, fieldNames, size, defaultVal);
}

// ----------------------------------------------------------------------------
// vtkAlgorithm: setInputData(), setInputConnection(), getOutputData(), getOutputPort()
// ----------------------------------------------------------------------------

function algo(publicAPI, model, numberOfInputs, numberOfOutputs) {
  if (model.inputData) {
    model.inputData = model.inputData.map(vtk);
  } else {
    model.inputData = [];
  }

  if (model.inputConnection) {
    model.inputConnection = model.inputConnection.map(vtk);
  } else {
    model.inputConnection = [];
  }

  if (model.output) {
    model.output = model.output.map(vtk);
  } else {
    model.output = [];
  }

  if (model.inputArrayToProcess) {
    model.inputArrayToProcess = model.inputArrayToProcess.map(vtk);
  } else {
    model.inputArrayToProcess = [];
  }

  // Cache the argument for later manipulation
  model.numberOfInputs = numberOfInputs;

  // Methods
  function setInputData(dataset, port = 0) {
    if (model.deleted) {
      vtkErrorMacro('instance deleted - cannot call any method');
      return;
    }
    if (port >= model.numberOfInputs) {
      vtkErrorMacro(
        `algorithm ${publicAPI.getClassName()} only has ${
          model.numberOfInputs
        } input ports. To add more input ports, use addInputData()`
      );
      return;
    }
    if (model.inputData[port] !== dataset || model.inputConnection[port]) {
      model.inputData[port] = dataset;
      model.inputConnection[port] = null;
      if (publicAPI.modified) {
        publicAPI.modified();
      }
    }
  }

  function getInputData(port = 0) {
    if (model.inputConnection[port]) {
      model.inputData[port] = model.inputConnection[port]();
    }
    return model.inputData[port];
  }

  function setInputConnection(outputPort, port = 0) {
    if (model.deleted) {
      vtkErrorMacro('instance deleted - cannot call any method');
      return;
    }
    if (port >= model.numberOfInputs) {
      let msg = `algorithm ${publicAPI.getClassName()} only has `;
      msg += `${model.numberOfInputs}`;
      msg += ' input ports. To add more input ports, use addInputConnection()';
      vtkErrorMacro(msg);
      return;
    }
    model.inputData[port] = null;
    model.inputConnection[port] = outputPort;
  }

  function getInputConnection(port = 0) {
    return model.inputConnection[port];
  }

  function addInputConnection(outputPort) {
    if (model.deleted) {
      vtkErrorMacro('instance deleted - cannot call any method');
      return;
    }
    let portToFill = model.numberOfInputs;
    while (
      portToFill &&
      !model.inputData[portToFill - 1] &&
      !model.inputConnection[portToFill - 1]
    ) {
      portToFill--;
    }
    if (portToFill === model.numberOfInputs) {
      model.numberOfInputs++;
    }
    setInputConnection(outputPort, portToFill);
  }

  function addInputData(dataset) {
    if (model.deleted) {
      vtkErrorMacro('instance deleted - cannot call any method');
      return;
    }
    let portToFill = model.numberOfInputs;
    while (
      portToFill &&
      !model.inputData[portToFill - 1] &&
      !model.inputConnection[portToFill - 1]
    ) {
      portToFill--;
    }
    if (portToFill === model.numberOfInputs) {
      model.numberOfInputs++;
    }
    setInputData(dataset, portToFill);
  }

  function getOutputData(port = 0) {
    if (model.deleted) {
      vtkErrorMacro('instance deleted - cannot call any method');
      return null;
    }
    if (publicAPI.shouldUpdate()) {
      publicAPI.update();
    }
    return model.output[port];
  }

  publicAPI.shouldUpdate = () => {
    const localMTime = publicAPI.getMTime();
    let count = numberOfOutputs;
    let minOutputMTime = Infinity;
    while (count--) {
      if (!model.output[count]) {
        return true;
      }

      if (model.output[count].isDeleted()) {
        return true;
      }

      const mt = model.output[count].getMTime();
      if (mt < localMTime) {
        return true;
      }
      if (mt < minOutputMTime) {
        minOutputMTime = mt;
      }
    }

    count = model.numberOfInputs;
    while (count--) {
      if (
        model.inputConnection[count] &&
        model.inputConnection[count].filter.shouldUpdate()
      ) {
        return true;
      }
    }

    count = model.numberOfInputs;
    while (count--) {
      if (
        publicAPI.getInputData(count) &&
        publicAPI.getInputData(count).getMTime() > minOutputMTime
      ) {
        return true;
      }
    }
    return false;
  };

  function getOutputPort(port = 0) {
    const outputPortAccess = () => getOutputData(port);
    // Add reference to filter
    outputPortAccess.filter = publicAPI;
    return outputPortAccess;
  }

  // Handle input if needed
  if (model.numberOfInputs) {
    // Reserve inputs
    let count = model.numberOfInputs;
    while (count--) {
      model.inputData.push(null);
      model.inputConnection.push(null);
    }

    // Expose public methods
    publicAPI.setInputData = setInputData;
    publicAPI.setInputConnection = setInputConnection;
    publicAPI.addInputData = addInputData;
    publicAPI.addInputConnection = addInputConnection;
    publicAPI.getInputData = getInputData;
    publicAPI.getInputConnection = getInputConnection;
  }

  if (numberOfOutputs) {
    publicAPI.getOutputData = getOutputData;
    publicAPI.getOutputPort = getOutputPort;
  }

  publicAPI.update = () => {
    const ins = [];
    if (model.numberOfInputs) {
      let count = 0;
      while (count < model.numberOfInputs) {
        ins[count] = publicAPI.getInputData(count);
        count++;
      }
    }
    if (publicAPI.shouldUpdate() && publicAPI.requestData) {
      publicAPI.requestData(ins, model.output);
    }
  };

  publicAPI.getNumberOfInputPorts = () => model.numberOfInputs;
  publicAPI.getNumberOfOutputPorts = () =>
    numberOfOutputs || model.output.length;

  publicAPI.getInputArrayToProcess = (inputPort) => {
    const arrayDesc = model.inputArrayToProcess[inputPort];
    const ds = model.inputData[inputPort];
    if (arrayDesc && ds) {
      return ds[`get${arrayDesc.fieldAssociation}`]().getArray(
        arrayDesc.arrayName
      );
    }
    return null;
  };
  publicAPI.setInputArrayToProcess = (
    inputPort,
    arrayName,
    fieldAssociation,
    attributeType = 'Scalars'
  ) => {
    while (model.inputArrayToProcess.length < inputPort) {
      model.inputArrayToProcess.push(null);
    }
    model.inputArrayToProcess[inputPort] = {
      arrayName,
      fieldAssociation,
      attributeType,
    };
  };
}

// ----------------------------------------------------------------------------
// Event handling: onXXX(callback), invokeXXX(args...)
// ----------------------------------------------------------------------------

const EVENT_ABORT = Symbol('Event abort');

function macros_event(publicAPI, model, eventName) {
  const callbacks = [];
  const previousDelete = publicAPI.delete;
  let curCallbackID = 1;

  function off(callbackID) {
    for (let i = 0; i < callbacks.length; ++i) {
      const [cbID] = callbacks[i];
      if (cbID === callbackID) {
        callbacks.splice(i, 1);
        return;
      }
    }
  }

  function on(callbackID) {
    function unsubscribe() {
      off(callbackID);
    }
    return Object.freeze({
      unsubscribe,
    });
  }

  function invoke() {
    if (model.deleted) {
      vtkErrorMacro('instance deleted - cannot call any method');
      return;
    }
    /* eslint-disable prefer-rest-params */
    // Go through a copy of the callbacks array in case new callbacks
    // get prepended within previous callbacks
    const currentCallbacks = callbacks.slice();
    for (let index = 0; index < currentCallbacks.length; ++index) {
      const [, cb, priority] = currentCallbacks[index];

      if (!cb) {
        continue; // eslint-disable-line
      }

      if (priority < 0) {
        setTimeout(() => cb.apply(publicAPI, arguments), 1 - priority);
      } else {
        // Abort only if the callback explicitly returns false
        const continueNext = cb.apply(publicAPI, arguments);
        if (continueNext === EVENT_ABORT) {
          break;
        }
      }
    }
    /* eslint-enable prefer-rest-params */
  }

  publicAPI[`invoke${capitalize(eventName)}`] = invoke;

  publicAPI[`on${capitalize(eventName)}`] = (callback, priority = 0.0) => {
    if (!callback.apply) {
      console.error(`Invalid callback for event ${eventName}`);
      return null;
    }

    if (model.deleted) {
      vtkErrorMacro('instance deleted - cannot call any method');
      return null;
    }

    const callbackID = curCallbackID++;
    callbacks.push([callbackID, callback, priority]);
    callbacks.sort((cb1, cb2) => cb2[2] - cb1[2]);
    return on(callbackID);
  };

  publicAPI.delete = () => {
    previousDelete();
    callbacks.forEach(([cbID]) => off(cbID));
  };
}

// ----------------------------------------------------------------------------
// newInstance
// ----------------------------------------------------------------------------

function newInstance(extend, className) {
  const constructor = (initialValues = {}) => {
    const model = {};
    const publicAPI = {};
    extend(publicAPI, model, initialValues);

    return Object.freeze(publicAPI);
  };

  // Register constructor to factory
  if (className) {
    vtk.register(className, constructor);
  }

  return constructor;
}

// ----------------------------------------------------------------------------
// Chain function calls
// ----------------------------------------------------------------------------

function chain(...fn) {
  return (...args) => fn.filter((i) => !!i).map((i) => i(...args));
}

// ----------------------------------------------------------------------------
// Some utility methods for vtk objects
// ----------------------------------------------------------------------------

function isVtkObject(instance) {
  return instance && instance.isA && instance.isA('vtkObject');
}

function traverseInstanceTree(
  instance,
  extractFunction,
  accumulator = [],
  visitedInstances = []
) {
  if (isVtkObject(instance)) {
    if (visitedInstances.indexOf(instance) >= 0) {
      // avoid cycles
      return accumulator;
    }

    visitedInstances.push(instance);
    const result = extractFunction(instance);
    if (result !== undefined) {
      accumulator.push(result);
    }

    // Now go through this instance's model
    const model = instance.get();
    Object.keys(model).forEach((key) => {
      const modelObj = model[key];
      if (Array.isArray(modelObj)) {
        modelObj.forEach((subObj) => {
          traverseInstanceTree(
            subObj,
            extractFunction,
            accumulator,
            visitedInstances
          );
        });
      } else {
        traverseInstanceTree(
          modelObj,
          extractFunction,
          accumulator,
          visitedInstances
        );
      }
    });
  }

  return accumulator;
}

// ----------------------------------------------------------------------------
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
  let timeout;
  const debounced = (...args) => {
    const context = this;
    const later = () => {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };

  debounced.cancel = () => clearTimeout(timeout);

  return debounced;
}

// ----------------------------------------------------------------------------
// Creates a throttled function that only invokes `func` at most once per
// every `wait` milliseconds.

function throttle(callback, delay) {
  let isThrottled = false;
  let argsToUse = null;

  function next() {
    isThrottled = false;
    if (argsToUse !== null) {
      wrapper(...argsToUse); // eslint-disable-line
      argsToUse = null;
    }
  }

  function wrapper(...args) {
    if (isThrottled) {
      argsToUse = args;
      return;
    }
    isThrottled = true;
    callback(...args);
    setTimeout(next, delay);
  }

  return wrapper;
}

// ----------------------------------------------------------------------------
// keystore(publicAPI, model, initialKeystore)
//
//    - initialKeystore: Initial keystore. This can be either a Map or an
//      object.
//
// Generated API
//  setKey(key, value) : mixed (returns value)
//  getKey(key) : mixed
//  getAllKeys() : [mixed]
//  deleteKey(key) : Boolean
// ----------------------------------------------------------------------------

function keystore(publicAPI, model, initialKeystore = {}) {
  model.keystore = Object.assign(model.keystore || {}, initialKeystore);

  publicAPI.setKey = (key, value) => {
    model.keystore[key] = value;
  };
  publicAPI.getKey = (key) => model.keystore[key];
  publicAPI.getAllKeys = () => Object.keys(model.keystore);
  publicAPI.deleteKey = (key) => delete model.keystore[key];
  publicAPI.clearKeystore = () =>
    publicAPI.getAllKeys().forEach((key) => delete model.keystore[key]);
}

// ----------------------------------------------------------------------------
// proxy(publicAPI, model, sectionName, propertyUI)
//
//    - sectionName: Name of the section for UI
//    - propertyUI: List of props with their UI description
//
// Generated API
//  getProxyId() : String
//  listProxyProperties() : [string]
//  updateProxyProperty(name, prop)
//  getProxySection() => List of properties for UI generation
// ----------------------------------------------------------------------------
let nextProxyId = 1;
const ROOT_GROUP_NAME = '__root__';

function proxy(publicAPI, model) {
  // Proxies are keystores
  keystore(publicAPI, model);

  const parentDelete = publicAPI.delete;

  // getProxyId
  model.proxyId = `${nextProxyId++}`;

  // ui handling
  model.ui = JSON.parse(JSON.stringify(model.ui || [])); // deep copy
  get(publicAPI, model, ['proxyId', 'proxyGroup', 'proxyName']);
  setGet(publicAPI, model, ['proxyManager']);

  // group properties
  const propertyMap = {};
  const groupChildrenNames = {};

  function registerProperties(descriptionList, currentGroupName) {
    if (!groupChildrenNames[currentGroupName]) {
      groupChildrenNames[currentGroupName] = [];
    }
    const childrenNames = groupChildrenNames[currentGroupName];

    for (let i = 0; i < descriptionList.length; i++) {
      childrenNames.push(descriptionList[i].name);
      propertyMap[descriptionList[i].name] = descriptionList[i];
      if (descriptionList[i].children && descriptionList[i].children.length) {
        registerProperties(
          descriptionList[i].children,
          descriptionList[i].name
        );
      }
    }
  }
  registerProperties(model.ui, ROOT_GROUP_NAME);

  publicAPI.updateUI = (ui) => {
    model.ui = JSON.parse(JSON.stringify(ui || [])); // deep copy
    Object.keys(propertyMap).forEach((k) => delete propertyMap[k]);
    Object.keys(groupChildrenNames).forEach(
      (k) => delete groupChildrenNames[k]
    );
    registerProperties(model.ui, ROOT_GROUP_NAME);
    publicAPI.modified();
  };

  function listProxyProperties(gName = ROOT_GROUP_NAME) {
    return groupChildrenNames[gName];
  }

  publicAPI.updateProxyProperty = (propertyName, propUI) => {
    const prop = propertyMap[propertyName];
    if (prop) {
      Object.assign(prop, propUI);
    } else {
      propertyMap[propertyName] = { ...propUI };
    }
  };

  publicAPI.activate = () => {
    if (model.proxyManager) {
      const setActiveMethod = `setActive${capitalize(
        publicAPI.getProxyGroup().slice(0, -1)
      )}`;
      if (model.proxyManager[setActiveMethod]) {
        model.proxyManager[setActiveMethod](publicAPI);
      }
    }
  };

  // property link
  model.propertyLinkSubscribers = {};
  publicAPI.registerPropertyLinkForGC = (otherLink, type) => {
    if (!(type in model.propertyLinkSubscribers)) {
      model.propertyLinkSubscribers[type] = [];
    }
    model.propertyLinkSubscribers[type].push(otherLink);
  };

  publicAPI.gcPropertyLinks = (type) => {
    const subscribers = model.propertyLinkSubscribers[type] || [];
    while (subscribers.length) {
      subscribers.pop().unbind(publicAPI);
    }
  };

  model.propertyLinkMap = {};
  publicAPI.getPropertyLink = (id, persistent = false) => {
    if (model.propertyLinkMap[id]) {
      return model.propertyLinkMap[id];
    }
    let value = null;
    const links = [];
    let count = 0;
    let updateInProgress = false;

    function update(source, force = false) {
      if (updateInProgress) {
        return null;
      }

      const needUpdate = [];
      let sourceLink = null;
      count = links.length;
      while (count--) {
        const link = links[count];
        if (link.instance === source) {
          sourceLink = link;
        } else {
          needUpdate.push(link);
        }
      }

      if (!sourceLink) {
        return null;
      }

      const newValue =
        sourceLink.instance[`get${capitalize(sourceLink.propertyName)}`]();
      if (!shallowEquals(newValue, value) || force) {
        value = newValue;
        updateInProgress = true;
        while (needUpdate.length) {
          const linkToUpdate = needUpdate.pop();
          linkToUpdate.instance.set({
            [linkToUpdate.propertyName]: value,
          });
        }
        updateInProgress = false;
      }

      if (model.propertyLinkMap[id].persistent) {
        model.propertyLinkMap[id].value = newValue;
      }

      return newValue;
    }

    function unbind(instance, propertyName) {
      const indexToDelete = [];
      count = links.length;
      while (count--) {
        const link = links[count];
        if (
          link.instance === instance &&
          (link.propertyName === propertyName || propertyName === undefined)
        ) {
          link.subscription.unsubscribe();
          indexToDelete.push(count);
        }
      }
      while (indexToDelete.length) {
        links.splice(indexToDelete.pop(), 1);
      }
    }

    function bind(instance, propertyName, updateMe = false) {
      const subscription = instance.onModified(update);
      const other = links[0];
      links.push({
        instance,
        propertyName,
        subscription,
      });
      if (updateMe) {
        if (
          model.propertyLinkMap[id].persistent &&
          model.propertyLinkMap[id].value !== undefined
        ) {
          instance.set({
            [propertyName]: model.propertyLinkMap[id].value,
          });
        } else if (other) {
          update(other.instance, true);
        }
      }
      return {
        unsubscribe: () => unbind(instance, propertyName),
      };
    }

    function unsubscribe() {
      while (links.length) {
        links.pop().subscription.unsubscribe();
      }
    }

    const linkHandler = {
      bind,
      unbind,
      unsubscribe,
      persistent,
    };
    model.propertyLinkMap[id] = linkHandler;
    return linkHandler;
  };

  // extract values
  function getProperties(groupName = ROOT_GROUP_NAME) {
    const values = [];
    const id = model.proxyId;
    const propertyNames = listProxyProperties(groupName) || [];
    for (let i = 0; i < propertyNames.length; i++) {
      const name = propertyNames[i];
      const method = publicAPI[`get${capitalize(name)}`];
      const value = method ? method() : undefined;
      const prop = {
        id,
        name,
        value,
      };
      const children = getProperties(name);
      if (children.length) {
        prop.children = children;
      }
      values.push(prop);
    }
    return values;
  }

  publicAPI.listPropertyNames = () => getProperties().map((p) => p.name);

  publicAPI.getPropertyByName = (name) =>
    getProperties().find((p) => p.name === name);

  publicAPI.getPropertyDomainByName = (name) =>
    (propertyMap[name] || {}).domain;

  // ui section
  publicAPI.getProxySection = () => ({
    id: model.proxyId,
    name: model.proxyGroup,
    ui: model.ui,
    properties: getProperties(),
  });

  // free resources
  publicAPI.delete = () => {
    const list = Object.keys(model.propertyLinkMap);
    let count = list.length;
    while (count--) {
      model.propertyLinkMap[list[count]].unsubscribe();
    }
    Object.keys(model.propertyLinkSubscribers).forEach(
      publicAPI.gcPropertyLinks
    );
    parentDelete();
  };

  function registerLinks() {
    // Allow dynamic registration of links at the application level
    if (model.links) {
      for (let i = 0; i < model.links.length; i++) {
        const { link, property, persistent, updateOnBind, type } =
          model.links[i];
        if (type === 'application') {
          const sLink = model.proxyManager.getPropertyLink(link, persistent);
          publicAPI.registerPropertyLinkForGC(sLink, 'application');
          sLink.bind(publicAPI, property, updateOnBind);
        }
      }
    }
  }
  setImmediateVTK(registerLinks);
}

// ----------------------------------------------------------------------------
// proxyPropertyMapping(publicAPI, model, map)
//
//   map = {
//      opacity: { modelKey: 'property', property: 'opacity' },
//   }
//
// Generated API:
//  Elevate set/get methods from internal object stored in the model to current one
// ----------------------------------------------------------------------------

function proxyPropertyMapping(publicAPI, model, map) {
  const parentDelete = publicAPI.delete;
  const subscriptions = [];

  const propertyNames = Object.keys(map);
  let count = propertyNames.length;
  while (count--) {
    const propertyName = propertyNames[count];
    const { modelKey, property, modified = true } = map[propertyName];
    const methodSrc = capitalize(property);
    const methodDst = capitalize(propertyName);
    publicAPI[`get${methodDst}`] = model[modelKey][`get${methodSrc}`];
    publicAPI[`set${methodDst}`] = model[modelKey][`set${methodSrc}`];
    if (modified) {
      subscriptions.push(model[modelKey].onModified(publicAPI.modified));
    }
  }

  publicAPI.delete = () => {
    while (subscriptions.length) {
      subscriptions.pop().unsubscribe();
    }
    parentDelete();
  };
}

// ----------------------------------------------------------------------------
// proxyPropertyState(publicAPI, model, state, defaults)
//
//   state = {
//     representation: {
//       'Surface with edges': { property: { edgeVisibility: true, representation: 2 } },
//       Surface: { property: { edgeVisibility: false, representation: 2 } },
//       Wireframe: { property: { edgeVisibility: false, representation: 1 } },
//       Points: { property: { edgeVisibility: false, representation: 0 } },
//     },
//   }
//
//   defaults = {
//      representation: 'Surface',
//   }
//
// Generated API
//   get / set Representation ( string ) => push state to various internal objects
// ----------------------------------------------------------------------------

function proxyPropertyState(
  publicAPI,
  model,
  state = {},
  defaults = {}
) {
  model.this = publicAPI;

  function applyState(map) {
    const modelKeys = Object.keys(map);
    let count = modelKeys.length;
    while (count--) {
      const modelKey = modelKeys[count];
      model[modelKey].set(map[modelKey]);
    }
  }

  const modelKeys = Object.keys(defaults);
  let count = modelKeys.length;
  while (count--) {
    // Add default
    const key = modelKeys[count];
    model[key] = defaults[key];

    // Add set method
    const mapping = state[key];
    publicAPI[`set${capitalize(key)}`] = (value) => {
      if (value !== model[key]) {
        model[key] = value;
        const propValues = mapping[value];
        applyState(propValues);
        publicAPI.modified();
      }
    };
  }

  // Add getter
  if (modelKeys.length) {
    get(publicAPI, model, modelKeys);
  }
}

// ----------------------------------------------------------------------------
// From : https://github.com/facebookarchive/fixed-data-table/blob/master/src/vendor_upstream/dom/normalizeWheel.js
//
//
// Copyright (c) 2015, Facebook, Inc.
// All rights reserved.
//
// This source code is licensed under the BSD-style license found in the
// LICENSE file in the root directory of this source tree. An additional grant
// of patent rights can be found in the PATENTS file in the same directory.
//
//
// Mouse wheel (and 2-finger trackpad) support on the web sucks.  It is
// complicated, thus this doc is long and (hopefully) detailed enough to answer
// your questions.
//
// If you need to react to the mouse wheel in a predictable way, this code is
// like your bestest friend.// hugs//
//
// As of today, there are 4 DOM event types you can listen to:
//
//   'wheel'                -- Chrome(31+), FF(17+), IE(9+)
//   'mousewheel'           -- Chrome, IE(6+), Opera, Safari
//   'MozMousePixelScroll'  -- FF(3.5 only!) (2010-2013) -- don't bother!
//   'DOMMouseScroll'       -- FF(0.9.7+) since 2003
//
// So what to do?  The is the best:
//
//   normalizeWheel.getEventType();
//
// In your event callback, use this code to get sane interpretation of the
// deltas.  This code will return an object with properties:
//
//   spinX   -- normalized spin speed (use for zoom) - x plane
//   spinY   -- " - y plane
//   pixelX  -- normalized distance (to pixels) - x plane
//   pixelY  -- " - y plane
//
// Wheel values are provided by the browser assuming you are using the wheel to
// scroll a web page by a number of lines or pixels (or pages).  Values can vary
// significantly on different platforms and browsers, forgetting that you can
// scroll at different speeds.  Some devices (like trackpads) emit more events
// at smaller increments with fine granularity, and some emit massive jumps with
// linear speed or acceleration.
//
// This code does its best to normalize the deltas for you:
//
//   - spin is trying to normalize how far the wheel was spun (or trackpad
//     dragged).  This is super useful for zoom support where you want to
//     throw away the chunky scroll steps on the PC and make those equal to
//     the slow and smooth tiny steps on the Mac. Key data: This code tries to
//     resolve a single slow step on a wheel to 1.
//
//   - pixel is normalizing the desired scroll delta in pixel units.  You'll
//     get the crazy differences between browsers, but at least it'll be in
//     pixels!
//
//   - positive value indicates scrolling DOWN/RIGHT, negative UP/LEFT.  This
//     should translate to positive value zooming IN, negative zooming OUT.
//     This matches the newer 'wheel' event.
//
// Why are there spinX, spinY (or pixels)?
//
//   - spinX is a 2-finger side drag on the trackpad, and a shift + wheel turn
//     with a mouse.  It results in side-scrolling in the browser by default.
//
//   - spinY is what you expect -- it's the classic axis of a mouse wheel.
//
//   - I dropped spinZ/pixelZ.  It is supported by the DOM 3 'wheel' event and
//     probably is by browsers in conjunction with fancy 3D controllers .. but
//     you know.
//
// Implementation info:
//
// Examples of 'wheel' event if you scroll slowly (down) by one step with an
// average mouse:
//
//   OS X + Chrome  (mouse)     -    4   pixel delta  (wheelDelta -120)
//   OS X + Safari  (mouse)     -  N/A   pixel delta  (wheelDelta  -12)
//   OS X + Firefox (mouse)     -    0.1 line  delta  (wheelDelta  N/A)
//   Win8 + Chrome  (mouse)     -  100   pixel delta  (wheelDelta -120)
//   Win8 + Firefox (mouse)     -    3   line  delta  (wheelDelta -120)
//
// On the trackpad:
//
//   OS X + Chrome  (trackpad)  -    2   pixel delta  (wheelDelta   -6)
//   OS X + Firefox (trackpad)  -    1   pixel delta  (wheelDelta  N/A)
//
// On other/older browsers.. it's more complicated as there can be multiple and
// also missing delta values.
//
// The 'wheel' event is more standard:
//
// http://www.w3.org/TR/DOM-Level-3-Events/#events-wheelevents
//
// The basics is that it includes a unit, deltaMode (pixels, lines, pages), and
// deltaX, deltaY and deltaZ.  Some browsers provide other values to maintain
// backward compatibility with older events.  Those other values help us
// better normalize spin speed.  Example of what the browsers provide:
//
//                          | event.wheelDelta | event.detail
//        ------------------+------------------+--------------
//          Safari v5/OS X  |       -120       |       0
//          Safari v5/Win7  |       -120       |       0
//         Chrome v17/OS X  |       -120       |       0
//         Chrome v17/Win7  |       -120       |       0
//                IE9/Win7  |       -120       |   undefined
//         Firefox v4/OS X  |     undefined    |       1
//         Firefox v4/Win7  |     undefined    |       3
//
// ----------------------------------------------------------------------------

// Reasonable defaults
const PIXEL_STEP = 10;
const LINE_HEIGHT = 40;
const PAGE_HEIGHT = 800;

function normalizeWheel(wheelEvent) {
  let sX = 0; // spinX
  let sY = 0; // spinY
  let pX = 0; // pixelX
  let pY = 0; // pixelY

  // Legacy
  if ('detail' in wheelEvent) {
    sY = wheelEvent.detail;
  }
  if ('wheelDelta' in wheelEvent) {
    sY = -wheelEvent.wheelDelta / 120;
  }
  if ('wheelDeltaY' in wheelEvent) {
    sY = -wheelEvent.wheelDeltaY / 120;
  }
  if ('wheelDeltaX' in wheelEvent) {
    sX = -wheelEvent.wheelDeltaX / 120;
  }

  // side scrolling on FF with DOMMouseScroll
  if ('axis' in wheelEvent && wheelEvent.axis === wheelEvent.HORIZONTAL_AXIS) {
    sX = sY;
    sY = 0;
  }

  pX = sX * PIXEL_STEP;
  pY = sY * PIXEL_STEP;

  if ('deltaY' in wheelEvent) {
    pY = wheelEvent.deltaY;
  }
  if ('deltaX' in wheelEvent) {
    pX = wheelEvent.deltaX;
  }

  if ((pX || pY) && wheelEvent.deltaMode) {
    if (wheelEvent.deltaMode === 1) {
      // delta in LINE units
      pX *= LINE_HEIGHT;
      pY *= LINE_HEIGHT;
    } else {
      // delta in PAGE units
      pX *= PAGE_HEIGHT;
      pY *= PAGE_HEIGHT;
    }
  }

  // Fall-back if spin cannot be determined
  if (pX && !sX) {
    sX = pX < 1 ? -1 : 1;
  }
  if (pY && !sY) {
    sY = pY < 1 ? -1 : 1;
  }

  return {
    spinX: sX,
    spinY: sY,
    pixelX: pX,
    pixelY: pY,
  };
}

// ----------------------------------------------------------------------------
// Default export
// ----------------------------------------------------------------------------

/* harmony default export */ var macros = ({
  algo,
  capitalize,
  chain,
  debounce,
  enumToString,
  event: macros_event,
  EVENT_ABORT,
  formatBytesToProperUnit,
  formatNumbersWithThousandSeparator,
  get,
  getArray,
  getCurrentGlobalMTime,
  getStateArrayMapFunc,
  isVtkObject,
  keystore,
  newInstance,
  newTypedArray,
  newTypedArrayFrom,
  normalizeWheel,
  obj,
  proxy,
  proxyPropertyMapping,
  proxyPropertyState,
  safeArrays,
  set,
  setArray,
  setGet,
  setGetArray,
  setImmediate: setImmediateVTK,
  setLoggerFunction,
  throttle,
  traverseInstanceTree,
  TYPED_ARRAYS, // deprecated todo remove on breaking API revision
  uncapitalize,
  VOID,
  vtkDebugMacro,
  vtkErrorMacro,
  vtkInfoMacro,
  vtkLogMacro,
  vtkOnceErrorMacro,
  vtkWarningMacro,
});

// EXTERNAL MODULE: ./node_modules/seedrandom/index.js
var seedrandom = __webpack_require__("6125");
var seedrandom_default = /*#__PURE__*/__webpack_require__.n(seedrandom);

// CONCATENATED MODULE: ./node_modules/vtk.js/Sources/Common/Core/Math/index.js



const { vtkErrorMacro: Math_vtkErrorMacro, vtkWarningMacro: Math_vtkWarningMacro } = macros;

// ----------------------------------------------------------------------------
/* eslint-disable camelcase                                                  */
/* eslint-disable no-cond-assign                                             */
/* eslint-disable no-bitwise                                                 */
/* eslint-disable no-multi-assign                                            */
// ----------------------------------------------------------------------------
let randomSeedValue = 0;
const VTK_MAX_ROTATIONS = 20;
const VTK_SMALL_NUMBER = 1.0e-12;

function notImplemented(method) {
  return () => Math_vtkErrorMacro(`vtkMath::${method} - NOT IMPLEMENTED`);
}

function vtkSwapVectors3(v1, v2) {
  for (let i = 0; i < 3; i++) {
    const tmp = v1[i];
    v1[i] = v2[i];
    v2[i] = tmp;
  }
}

function createArray(size = 3) {
  const array = [];
  while (array.length < size) {
    array.push(0);
  }
  return array;
}

// ----------------------------------------------------------------------------
// Global methods
// ----------------------------------------------------------------------------

const Pi = () => Math.PI;

function radiansFromDegrees(deg) {
  return (deg / 180) * Math.PI;
}

function degreesFromRadians(rad) {
  return (rad * 180) / Math.PI;
}

const { round, floor, ceil, min: Math_min, max: Math_max } = Math;

function arrayMin(arr, offset = 0, stride = 1) {
  let minValue = Infinity;
  for (let i = offset, len = arr.length; i < len; i += stride) {
    if (arr[i] < minValue) {
      minValue = arr[i];
    }
  }

  return minValue;
}

function arrayMax(arr, offset = 0, stride = 1) {
  let maxValue = -Infinity;
  for (let i = offset, len = arr.length; i < len; i += stride) {
    if (maxValue < arr[i]) {
      maxValue = arr[i];
    }
  }

  return maxValue;
}

function arrayRange(arr, offset = 0, stride = 1) {
  let minValue = Infinity;
  let maxValue = -Infinity;
  for (let i = offset, len = arr.length; i < len; i += stride) {
    if (arr[i] < minValue) {
      minValue = arr[i];
    }
    if (maxValue < arr[i]) {
      maxValue = arr[i];
    }
  }

  return [minValue, maxValue];
}

const ceilLog2 = notImplemented('ceilLog2');
const factorial = notImplemented('factorial');

function nearestPowerOfTwo(xi) {
  let v = 1;
  while (v < xi) {
    v *= 2;
  }
  return v;
}

function isPowerOfTwo(x) {
  return x === nearestPowerOfTwo(x);
}

function binomial(m, n) {
  let r = 1;
  for (let i = 1; i <= n; ++i) {
    r *= (m - i + 1) / i;
  }
  return Math.floor(r);
}

function beginCombination(m, n) {
  if (m < n) {
    return 0;
  }

  const r = createArray(n);
  for (let i = 0; i < n; ++i) {
    r[i] = i;
  }
  return r;
}

function nextCombination(m, n, r) {
  let status = 0;
  for (let i = n - 1; i >= 0; --i) {
    if (r[i] < m - n + i) {
      let j = r[i] + 1;
      while (i < n) {
        r[i++] = j++;
      }
      status = 1;
      break;
    }
  }
  return status;
}

function randomSeed(seed) {
  seedrandom_default()(`${seed}`, { global: true });
  randomSeedValue = seed;
}

function getSeed() {
  return randomSeedValue;
}

function random(minValue = 0, maxValue = 1) {
  const delta = maxValue - minValue;
  return minValue + delta * Math.random();
}

const gaussian = notImplemented('gaussian');

// Vect3 operations
function add(a, b, out) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}

function subtract(a, b, out) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}

function multiplyScalar(vec, scalar) {
  vec[0] *= scalar;
  vec[1] *= scalar;
  vec[2] *= scalar;
  return vec;
}

function multiplyScalar2D(vec, scalar) {
  vec[0] *= scalar;
  vec[1] *= scalar;
  return vec;
}

function multiplyAccumulate(a, b, scalar, out) {
  out[0] = a[0] + b[0] * scalar;
  out[1] = a[1] + b[1] * scalar;
  out[2] = a[2] + b[2] * scalar;
  return out;
}

function multiplyAccumulate2D(a, b, scalar, out) {
  out[0] = a[0] + b[0] * scalar;
  out[1] = a[1] + b[1] * scalar;
  return out;
}

function dot(x, y) {
  return x[0] * y[0] + x[1] * y[1] + x[2] * y[2];
}

function outer(x, y, out_3x3) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      out_3x3[i][j] = x[i] * y[j];
    }
  }
}

function cross(x, y, out) {
  const Zx = x[1] * y[2] - x[2] * y[1];
  const Zy = x[2] * y[0] - x[0] * y[2];
  const Zz = x[0] * y[1] - x[1] * y[0];
  out[0] = Zx;
  out[1] = Zy;
  out[2] = Zz;
  return out;
}

function Math_norm(x, n = 3) {
  switch (n) {
    case 1:
      return Math.abs(x);
    case 2:
      return Math.sqrt(x[0] * x[0] + x[1] * x[1]);
    case 3:
      return Math.sqrt(x[0] * x[0] + x[1] * x[1] + x[2] * x[2]);
    default: {
      let sum = 0;
      for (let i = 0; i < n; i++) {
        sum += x[i] * x[i];
      }
      return Math.sqrt(sum);
    }
  }
}

function normalize(x) {
  const den = Math_norm(x);
  if (den !== 0.0) {
    x[0] /= den;
    x[1] /= den;
    x[2] /= den;
  }
  return den;
}

function perpendiculars(x, y, z, theta) {
  const x2 = x[0] * x[0];
  const y2 = x[1] * x[1];
  const z2 = x[2] * x[2];
  const r = Math.sqrt(x2 + y2 + z2);

  let dx;
  let dy;
  let dz;

  // transpose the vector to avoid divide-by-zero error
  if (x2 > y2 && x2 > z2) {
    dx = 0;
    dy = 1;
    dz = 2;
  } else if (y2 > z2) {
    dx = 1;
    dy = 2;
    dz = 0;
  } else {
    dx = 2;
    dy = 0;
    dz = 1;
  }

  const a = x[dx] / r;
  const b = x[dy] / r;
  const c = x[dz] / r;
  const tmp = Math.sqrt(a * a + c * c);

  if (theta !== 0) {
    const sintheta = Math.sin(theta);
    const costheta = Math.cos(theta);

    if (y) {
      y[dx] = (c * costheta - a * b * sintheta) / tmp;
      y[dy] = sintheta * tmp;
      y[dz] = (-(a * costheta) - b * c * sintheta) / tmp;
    }

    if (z) {
      z[dx] = (-(c * sintheta) - a * b * costheta) / tmp;
      z[dy] = costheta * tmp;
      z[dz] = (a * sintheta - b * c * costheta) / tmp;
    }
  } else {
    if (y) {
      y[dx] = c / tmp;
      y[dy] = 0;
      y[dz] = -a / tmp;
    }

    if (z) {
      z[dx] = (-a * b) / tmp;
      z[dy] = tmp;
      z[dz] = (-b * c) / tmp;
    }
  }
}

function projectVector(a, b, projection) {
  const bSquared = dot(b, b);

  if (bSquared === 0) {
    projection[0] = 0;
    projection[1] = 0;
    projection[2] = 0;
    return false;
  }

  const scale = dot(a, b) / bSquared;

  for (let i = 0; i < 3; i++) {
    projection[i] = b[i];
  }
  multiplyScalar(projection, scale);

  return true;
}

function dot2D(x, y) {
  return x[0] * y[0] + x[1] * y[1];
}

function projectVector2D(a, b, projection) {
  const bSquared = dot2D(b, b);

  if (bSquared === 0) {
    projection[0] = 0;
    projection[1] = 0;
    return false;
  }

  const scale = dot2D(a, b) / bSquared;

  for (let i = 0; i < 2; i++) {
    projection[i] = b[i];
  }
  multiplyScalar2D(projection, scale);

  return true;
}

function distance2BetweenPoints(x, y) {
  return (
    (x[0] - y[0]) * (x[0] - y[0]) +
    (x[1] - y[1]) * (x[1] - y[1]) +
    (x[2] - y[2]) * (x[2] - y[2])
  );
}

function angleBetweenVectors(v1, v2) {
  const crossVect = [0, 0, 0];
  cross(v1, v2, crossVect);
  return Math.atan2(Math_norm(crossVect), dot(v1, v2));
}

function signedAngleBetweenVectors(v1, v2, vN) {
  const crossVect = [0, 0, 0];
  cross(v1, v2, crossVect);
  const angle = Math.atan2(Math_norm(crossVect), dot(v1, v2));
  return dot(crossVect, vN) >= 0 ? angle : -angle;
}

function gaussianAmplitude(mean, variance, position) {
  const distanceFromMean = Math.abs(mean - position);
  return (
    (1 / Math.sqrt(2 * Math.PI * variance)) *
    Math.exp(-(distanceFromMean ** 2) / (2 * variance))
  );
}

function gaussianWeight(mean, variance, position) {
  const distanceFromMean = Math.abs(mean - position);
  return Math.exp(-(distanceFromMean ** 2) / (2 * variance));
}

function outer2D(x, y, out_2x2) {
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      out_2x2[i][j] = x[i] * y[j];
    }
  }
}

function norm2D(x2D) {
  return Math.sqrt(x2D[0] * x2D[0] + x2D[1] * x2D[1]);
}

function normalize2D(x) {
  const den = norm2D(x);
  if (den !== 0.0) {
    x[0] /= den;
    x[1] /= den;
  }
  return den;
}

function determinant2x2(...args) {
  if (args.length === 2) {
    return args[0][0] * args[1][1] - args[1][0] * args[0][1];
  }
  if (args.length === 4) {
    return args[0] * args[3] - args[1] * args[2];
  }
  return Number.NaN;
}

function LUFactor3x3(mat_3x3, index_3) {
  let maxI;
  let tmp;
  let largest;
  const scale = [0, 0, 0];

  // Loop over rows to get implicit scaling information
  for (let i = 0; i < 3; i++) {
    largest = Math.abs(mat_3x3[i][0]);
    if ((tmp = Math.abs(mat_3x3[i][1])) > largest) {
      largest = tmp;
    }
    if ((tmp = Math.abs(mat_3x3[i][2])) > largest) {
      largest = tmp;
    }
    scale[i] = 1 / largest;
  }

  // Loop over all columns using Crout's method

  // first column
  largest = scale[0] * Math.abs(mat_3x3[0][0]);
  maxI = 0;
  if ((tmp = scale[1] * Math.abs(mat_3x3[1][0])) >= largest) {
    largest = tmp;
    maxI = 1;
  }
  if ((tmp = scale[2] * Math.abs(mat_3x3[2][0])) >= largest) {
    maxI = 2;
  }
  if (maxI !== 0) {
    vtkSwapVectors3(mat_3x3[maxI], mat_3x3[0]);
    scale[maxI] = scale[0];
  }
  index_3[0] = maxI;

  mat_3x3[1][0] /= mat_3x3[0][0];
  mat_3x3[2][0] /= mat_3x3[0][0];

  // second column
  mat_3x3[1][1] -= mat_3x3[1][0] * mat_3x3[0][1];
  mat_3x3[2][1] -= mat_3x3[2][0] * mat_3x3[0][1];
  largest = scale[1] * Math.abs(mat_3x3[1][1]);
  maxI = 1;
  if ((tmp = scale[2] * Math.abs(mat_3x3[2][1])) >= largest) {
    maxI = 2;
    vtkSwapVectors3(mat_3x3[2], mat_3x3[1]);
    scale[2] = scale[1];
  }
  index_3[1] = maxI;
  mat_3x3[2][1] /= mat_3x3[1][1];

  // third column
  mat_3x3[1][2] -= mat_3x3[1][0] * mat_3x3[0][2];
  mat_3x3[2][2] -=
    mat_3x3[2][0] * mat_3x3[0][2] + mat_3x3[2][1] * mat_3x3[1][2];
  index_3[2] = 2;
}

function LUSolve3x3(mat_3x3, index_3, x_3) {
  // forward substitution
  let sum = x_3[index_3[0]];
  x_3[index_3[0]] = x_3[0];
  x_3[0] = sum;

  sum = x_3[index_3[1]];
  x_3[index_3[1]] = x_3[1];
  x_3[1] = sum - mat_3x3[1][0] * x_3[0];

  sum = x_3[index_3[2]];
  x_3[index_3[2]] = x_3[2];
  x_3[2] = sum - mat_3x3[2][0] * x_3[0] - mat_3x3[2][1] * x_3[1];

  // back substitution
  x_3[2] /= mat_3x3[2][2];
  x_3[1] = (x_3[1] - mat_3x3[1][2] * x_3[2]) / mat_3x3[1][1];
  x_3[0] =
    (x_3[0] - mat_3x3[0][1] * x_3[1] - mat_3x3[0][2] * x_3[2]) / mat_3x3[0][0];
}

function linearSolve3x3(mat_3x3, x_3, y_3) {
  const a1 = mat_3x3[0][0];
  const b1 = mat_3x3[0][1];
  const c1 = mat_3x3[0][2];
  const a2 = mat_3x3[1][0];
  const b2 = mat_3x3[1][1];
  const c2 = mat_3x3[1][2];
  const a3 = mat_3x3[2][0];
  const b3 = mat_3x3[2][1];
  const c3 = mat_3x3[2][2];

  // Compute the adjoint
  const d1 = +determinant2x2(b2, b3, c2, c3);
  const d2 = -determinant2x2(a2, a3, c2, c3);
  const d3 = +determinant2x2(a2, a3, b2, b3);

  const e1 = -determinant2x2(b1, b3, c1, c3);
  const e2 = +determinant2x2(a1, a3, c1, c3);
  const e3 = -determinant2x2(a1, a3, b1, b3);

  const f1 = +determinant2x2(b1, b2, c1, c2);
  const f2 = -determinant2x2(a1, a2, c1, c2);
  const f3 = +determinant2x2(a1, a2, b1, b2);

  // Compute the determinant
  const det = a1 * d1 + b1 * d2 + c1 * d3;

  // Multiply by the adjoint
  const v1 = d1 * x_3[0] + e1 * x_3[1] + f1 * x_3[2];
  const v2 = d2 * x_3[0] + e2 * x_3[1] + f2 * x_3[2];
  const v3 = d3 * x_3[0] + e3 * x_3[1] + f3 * x_3[2];

  // Divide by the determinant
  y_3[0] = v1 / det;
  y_3[1] = v2 / det;
  y_3[2] = v3 / det;
}

function multiply3x3_vect3(mat_3x3, in_3, out_3) {
  const x =
    mat_3x3[0][0] * in_3[0] + mat_3x3[0][1] * in_3[1] + mat_3x3[0][2] * in_3[2];
  const y =
    mat_3x3[1][0] * in_3[0] + mat_3x3[1][1] * in_3[1] + mat_3x3[1][2] * in_3[2];
  const z =
    mat_3x3[2][0] * in_3[0] + mat_3x3[2][1] * in_3[1] + mat_3x3[2][2] * in_3[2];

  out_3[0] = x;
  out_3[1] = y;
  out_3[2] = z;
}

function multiply3x3_mat3(a_3x3, b_3x3, out_3x3) {
  const tmp = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  for (let i = 0; i < 3; i++) {
    tmp[0][i] =
      a_3x3[0][0] * b_3x3[0][i] +
      a_3x3[0][1] * b_3x3[1][i] +
      a_3x3[0][2] * b_3x3[2][i];
    tmp[1][i] =
      a_3x3[1][0] * b_3x3[0][i] +
      a_3x3[1][1] * b_3x3[1][i] +
      a_3x3[1][2] * b_3x3[2][i];
    tmp[2][i] =
      a_3x3[2][0] * b_3x3[0][i] +
      a_3x3[2][1] * b_3x3[1][i] +
      a_3x3[2][2] * b_3x3[2][i];
  }

  for (let j = 0; j < 3; j++) {
    out_3x3[j][0] = tmp[j][0];
    out_3x3[j][1] = tmp[j][1];
    out_3x3[j][2] = tmp[j][2];
  }
}

function multiplyMatrix(a, b, rowA, colA, rowB, colB, out_rowXcol) {
  // we need colA == rowB
  if (colA !== rowB) {
    Math_vtkErrorMacro('Number of columns of A must match number of rows of B.');
  }

  // output matrix is rowA*colB
  // output row
  for (let i = 0; i < rowA; i++) {
    // output col
    for (let j = 0; j < colB; j++) {
      out_rowXcol[i][j] = 0;
      // sum for this point
      for (let k = 0; k < colA; k++) {
        out_rowXcol[i][j] += a[i][k] * b[k][j];
      }
    }
  }
}

function transpose3x3(in_3x3, outT_3x3) {
  let tmp;
  tmp = in_3x3[1][0];
  outT_3x3[1][0] = in_3x3[0][1];
  outT_3x3[0][1] = tmp;
  tmp = in_3x3[2][0];
  outT_3x3[2][0] = in_3x3[0][2];
  outT_3x3[0][2] = tmp;
  tmp = in_3x3[2][1];
  outT_3x3[2][1] = in_3x3[1][2];
  outT_3x3[1][2] = tmp;

  outT_3x3[0][0] = in_3x3[0][0];
  outT_3x3[1][1] = in_3x3[1][1];
  outT_3x3[2][2] = in_3x3[2][2];
}

function invert3x3(in_3x3, outI_3x3) {
  const a1 = in_3x3[0][0];
  const b1 = in_3x3[0][1];
  const c1 = in_3x3[0][2];
  const a2 = in_3x3[1][0];
  const b2 = in_3x3[1][1];
  const c2 = in_3x3[1][2];
  const a3 = in_3x3[2][0];
  const b3 = in_3x3[2][1];
  const c3 = in_3x3[2][2];

  // Compute the adjoint
  const d1 = +determinant2x2(b2, b3, c2, c3);
  const d2 = -determinant2x2(a2, a3, c2, c3);
  const d3 = +determinant2x2(a2, a3, b2, b3);

  const e1 = -determinant2x2(b1, b3, c1, c3);
  const e2 = +determinant2x2(a1, a3, c1, c3);
  const e3 = -determinant2x2(a1, a3, b1, b3);

  const f1 = +determinant2x2(b1, b2, c1, c2);
  const f2 = -determinant2x2(a1, a2, c1, c2);
  const f3 = +determinant2x2(a1, a2, b1, b2);

  // Divide by the determinant
  const det = a1 * d1 + b1 * d2 + c1 * d3;

  outI_3x3[0][0] = d1 / det;
  outI_3x3[1][0] = d2 / det;
  outI_3x3[2][0] = d3 / det;

  outI_3x3[0][1] = e1 / det;
  outI_3x3[1][1] = e2 / det;
  outI_3x3[2][1] = e3 / det;

  outI_3x3[0][2] = f1 / det;
  outI_3x3[1][2] = f2 / det;
  outI_3x3[2][2] = f3 / det;
}

function identity3x3(mat_3x3) {
  for (let i = 0; i < 3; i++) {
    mat_3x3[i][0] = mat_3x3[i][1] = mat_3x3[i][2] = 0;
    mat_3x3[i][i] = 1;
  }
}

function determinant3x3(mat_3x3) {
  return (
    mat_3x3[0][0] * mat_3x3[1][1] * mat_3x3[2][2] +
    mat_3x3[1][0] * mat_3x3[2][1] * mat_3x3[0][2] +
    mat_3x3[2][0] * mat_3x3[0][1] * mat_3x3[1][2] -
    mat_3x3[0][0] * mat_3x3[2][1] * mat_3x3[1][2] -
    mat_3x3[1][0] * mat_3x3[0][1] * mat_3x3[2][2] -
    mat_3x3[2][0] * mat_3x3[1][1] * mat_3x3[0][2]
  );
}

function quaternionToMatrix3x3(quat_4, mat_3x3) {
  const ww = quat_4[0] * quat_4[0];
  const wx = quat_4[0] * quat_4[1];
  const wy = quat_4[0] * quat_4[2];
  const wz = quat_4[0] * quat_4[3];

  const xx = quat_4[1] * quat_4[1];
  const yy = quat_4[2] * quat_4[2];
  const zz = quat_4[3] * quat_4[3];

  const xy = quat_4[1] * quat_4[2];
  const xz = quat_4[1] * quat_4[3];
  const yz = quat_4[2] * quat_4[3];

  const rr = xx + yy + zz;
  // normalization factor, just in case quaternion was not normalized
  let f = 1 / (ww + rr);
  const s = (ww - rr) * f;
  f *= 2;

  mat_3x3[0][0] = xx * f + s;
  mat_3x3[1][0] = (xy + wz) * f;
  mat_3x3[2][0] = (xz - wy) * f;

  mat_3x3[0][1] = (xy - wz) * f;
  mat_3x3[1][1] = yy * f + s;
  mat_3x3[2][1] = (yz + wx) * f;

  mat_3x3[0][2] = (xz + wy) * f;
  mat_3x3[1][2] = (yz - wx) * f;
  mat_3x3[2][2] = zz * f + s;
}

/**
 * Returns true if elements of both arrays are equals.
 * @param {Array} a an array of numbers (vector, point, matrix...)
 * @param {Array} b an array of numbers (vector, point, matrix...)
 * @param {Number} eps tolerance
 */
function areEquals(a, b, eps = 1e-6) {
  if (a.length !== b.length) {
    return false;
  }

  function isEqual(element, index) {
    return Math.abs(element - b[index]) <= eps;
  }
  return a.every(isEqual);
}

const areMatricesEqual = areEquals;

function roundNumber(num, digits = 0) {
  if (!`${num}`.includes('e')) {
    return +`${Math.round(`${num}e+${digits}`)}e-${digits}`;
  }
  const arr = `${num}`.split('e');
  let sig = '';
  if (+arr[1] + digits > 0) {
    sig = '+';
  }
  return +`${Math.round(`${+arr[0]}e${sig}${+arr[1] + digits}`)}e-${digits}`;
}

function roundVector(vector, out = [0, 0, 0], digits = 0) {
  out[0] = roundNumber(vector[0], digits);
  out[1] = roundNumber(vector[1], digits);
  out[2] = roundNumber(vector[2], digits);

  return out;
}

function jacobiN(a, n, w, v) {
  let i;
  let j;
  let k;
  let iq;
  let ip;
  let numPos;
  let tresh;
  let theta;
  let t;
  let tau;
  let sm;
  let s;
  let h;
  let g;
  let c;
  let tmp;
  const b = createArray(n);
  const z = createArray(n);

  const vtkROTATE = (aa, ii, jj, kk, ll) => {
    g = aa[ii][jj];
    h = aa[kk][ll];
    aa[ii][jj] = g - s * (h + g * tau);
    aa[kk][ll] = h + s * (g - h * tau);
  };

  // initialize
  for (ip = 0; ip < n; ip++) {
    for (iq = 0; iq < n; iq++) {
      v[ip][iq] = 0.0;
    }
    v[ip][ip] = 1.0;
  }
  for (ip = 0; ip < n; ip++) {
    b[ip] = w[ip] = a[ip][ip];
    z[ip] = 0.0;
  }

  // begin rotation sequence
  for (i = 0; i < VTK_MAX_ROTATIONS; i++) {
    sm = 0.0;
    for (ip = 0; ip < n - 1; ip++) {
      for (iq = ip + 1; iq < n; iq++) {
        sm += Math.abs(a[ip][iq]);
      }
    }
    if (sm === 0.0) {
      break;
    }

    // first 3 sweeps
    if (i < 3) {
      tresh = (0.2 * sm) / (n * n);
    } else {
      tresh = 0.0;
    }

    for (ip = 0; ip < n - 1; ip++) {
      for (iq = ip + 1; iq < n; iq++) {
        g = 100.0 * Math.abs(a[ip][iq]);

        // after 4 sweeps
        if (
          i > 3 &&
          Math.abs(w[ip]) + g === Math.abs(w[ip]) &&
          Math.abs(w[iq]) + g === Math.abs(w[iq])
        ) {
          a[ip][iq] = 0.0;
        } else if (Math.abs(a[ip][iq]) > tresh) {
          h = w[iq] - w[ip];
          if (Math.abs(h) + g === Math.abs(h)) {
            t = a[ip][iq] / h;
          } else {
            theta = (0.5 * h) / a[ip][iq];
            t = 1.0 / (Math.abs(theta) + Math.sqrt(1.0 + theta * theta));
            if (theta < 0.0) {
              t = -t;
            }
          }
          c = 1.0 / Math.sqrt(1 + t * t);
          s = t * c;
          tau = s / (1.0 + c);
          h = t * a[ip][iq];
          z[ip] -= h;
          z[iq] += h;
          w[ip] -= h;
          w[iq] += h;
          a[ip][iq] = 0.0;

          // ip already shifted left by 1 unit
          for (j = 0; j <= ip - 1; j++) {
            vtkROTATE(a, j, ip, j, iq);
          }
          // ip and iq already shifted left by 1 unit
          for (j = ip + 1; j <= iq - 1; j++) {
            vtkROTATE(a, ip, j, j, iq);
          }
          // iq already shifted left by 1 unit
          for (j = iq + 1; j < n; j++) {
            vtkROTATE(a, ip, j, iq, j);
          }
          for (j = 0; j < n; j++) {
            vtkROTATE(v, j, ip, j, iq);
          }
        }
      }
    }

    for (ip = 0; ip < n; ip++) {
      b[ip] += z[ip];
      w[ip] = b[ip];
      z[ip] = 0.0;
    }
  }

  // this is NEVER called
  if (i >= VTK_MAX_ROTATIONS) {
    Math_vtkWarningMacro('vtkMath::Jacobi: Error extracting eigenfunctions');
    return 0;
  }

  // sort eigenfunctions: these changes do not affect accuracy
  for (j = 0; j < n - 1; j++) {
    // boundary incorrect
    k = j;
    tmp = w[k];
    for (i = j + 1; i < n; i++) {
      // boundary incorrect, shifted already
      if (w[i] >= tmp) {
        // why exchange if same?
        k = i;
        tmp = w[k];
      }
    }
    if (k !== j) {
      w[k] = w[j];
      w[j] = tmp;
      for (i = 0; i < n; i++) {
        tmp = v[i][j];
        v[i][j] = v[i][k];
        v[i][k] = tmp;
      }
    }
  }
  // ensure eigenvector consistency (i.e., Jacobi can compute vectors that
  // are negative of one another (.707,.707,0) and (-.707,-.707,0). This can
  // reek havoc in hyperstreamline/other stuff. We will select the most
  // positive eigenvector.
  const ceil_half_n = (n >> 1) + (n & 1);
  for (j = 0; j < n; j++) {
    for (numPos = 0, i = 0; i < n; i++) {
      if (v[i][j] >= 0.0) {
        numPos++;
      }
    }
    //    if ( numPos < ceil(double(n)/double(2.0)) )
    if (numPos < ceil_half_n) {
      for (i = 0; i < n; i++) {
        v[i][j] *= -1.0;
      }
    }
  }
  return 1;
}

function matrix3x3ToQuaternion(mat_3x3, quat_4) {
  const tmp = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  // on-diagonal elements
  tmp[0][0] = mat_3x3[0][0] + mat_3x3[1][1] + mat_3x3[2][2];
  tmp[1][1] = mat_3x3[0][0] - mat_3x3[1][1] - mat_3x3[2][2];
  tmp[2][2] = -mat_3x3[0][0] + mat_3x3[1][1] - mat_3x3[2][2];
  tmp[3][3] = -mat_3x3[0][0] - mat_3x3[1][1] + mat_3x3[2][2];

  // off-diagonal elements
  tmp[0][1] = tmp[1][0] = mat_3x3[2][1] - mat_3x3[1][2];
  tmp[0][2] = tmp[2][0] = mat_3x3[0][2] - mat_3x3[2][0];
  tmp[0][3] = tmp[3][0] = mat_3x3[1][0] - mat_3x3[0][1];

  tmp[1][2] = tmp[2][1] = mat_3x3[1][0] + mat_3x3[0][1];
  tmp[1][3] = tmp[3][1] = mat_3x3[0][2] + mat_3x3[2][0];
  tmp[2][3] = tmp[3][2] = mat_3x3[2][1] + mat_3x3[1][2];

  const eigenvectors = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  const eigenvalues = [0, 0, 0, 0];

  // convert into format that JacobiN can use,
  // then use Jacobi to find eigenvalues and eigenvectors
  const NTemp = [0, 0, 0, 0];
  const eigenvectorsTemp = [0, 0, 0, 0];
  for (let i = 0; i < 4; i++) {
    NTemp[i] = tmp[i];
    eigenvectorsTemp[i] = eigenvectors[i];
  }
  jacobiN(NTemp, 4, eigenvalues, eigenvectorsTemp);

  // the first eigenvector is the one we want
  quat_4[0] = eigenvectors[0][0];
  quat_4[1] = eigenvectors[1][0];
  quat_4[2] = eigenvectors[2][0];
  quat_4[3] = eigenvectors[3][0];
}

function multiplyQuaternion(quat_1, quat_2, quat_out) {
  const ww = quat_1[0] * quat_2[0];
  const wx = quat_1[0] * quat_2[1];
  const wy = quat_1[0] * quat_2[2];
  const wz = quat_1[0] * quat_2[3];

  const xw = quat_1[1] * quat_2[0];
  const xx = quat_1[1] * quat_2[1];
  const xy = quat_1[1] * quat_2[2];
  const xz = quat_1[1] * quat_2[3];

  const yw = quat_1[2] * quat_2[0];
  const yx = quat_1[2] * quat_2[1];
  const yy = quat_1[2] * quat_2[2];
  const yz = quat_1[2] * quat_2[3];

  const zw = quat_1[3] * quat_2[0];
  const zx = quat_1[3] * quat_2[1];
  const zy = quat_1[3] * quat_2[2];
  const zz = quat_1[3] * quat_2[3];

  quat_out[0] = ww - xx - yy - zz;
  quat_out[1] = wx + xw + yz - zy;
  quat_out[2] = wy - xz + yw + zx;
  quat_out[3] = wz + xy - yx + zw;
}

function orthogonalize3x3(a_3x3, out_3x3) {
  // copy the matrix
  for (let i = 0; i < 3; i++) {
    out_3x3[0][i] = a_3x3[0][i];
    out_3x3[1][i] = a_3x3[1][i];
    out_3x3[2][i] = a_3x3[2][i];
  }

  // Pivot the matrix to improve accuracy
  const scale = createArray(3);
  const index = createArray(3);
  let largest;

  // Loop over rows to get implicit scaling information
  for (let i = 0; i < 3; i++) {
    const x1 = Math.abs(out_3x3[i][0]);
    const x2 = Math.abs(out_3x3[i][1]);
    const x3 = Math.abs(out_3x3[i][2]);
    largest = x2 > x1 ? x2 : x1;
    largest = x3 > largest ? x3 : largest;
    scale[i] = 1;
    if (largest !== 0) {
      scale[i] /= largest;
    }
  }

  // first column
  const x1 = Math.abs(out_3x3[0][0]) * scale[0];
  const x2 = Math.abs(out_3x3[1][0]) * scale[1];
  const x3 = Math.abs(out_3x3[2][0]) * scale[2];
  index[0] = 0;
  largest = x1;
  if (x2 >= largest) {
    largest = x2;
    index[0] = 1;
  }
  if (x3 >= largest) {
    index[0] = 2;
  }
  if (index[0] !== 0) {
    vtkSwapVectors3(out_3x3[index[0]], out_3x3[0]);
    scale[index[0]] = scale[0];
  }

  // second column
  const y2 = Math.abs(out_3x3[1][1]) * scale[1];
  const y3 = Math.abs(out_3x3[2][1]) * scale[2];
  index[1] = 1;
  largest = y2;
  if (y3 >= largest) {
    index[1] = 2;
    vtkSwapVectors3(out_3x3[2], out_3x3[1]);
  }

  // third column
  index[2] = 2;

  // A quaternion can only describe a pure rotation, not
  // a rotation with a flip, therefore the flip must be
  // removed before the matrix is converted to a quaternion.
  let flip = 0;
  if (determinant3x3(out_3x3) < 0) {
    flip = 1;
    for (let i = 0; i < 3; i++) {
      out_3x3[0][i] = -out_3x3[0][i];
      out_3x3[1][i] = -out_3x3[1][i];
      out_3x3[2][i] = -out_3x3[2][i];
    }
  }

  // Do orthogonalization using a quaternion intermediate
  // (this, essentially, does the orthogonalization via
  // diagonalization of an appropriately constructed symmetric
  // 4x4 matrix rather than by doing SVD of the 3x3 matrix)
  const quat = createArray(4);
  matrix3x3ToQuaternion(out_3x3, quat);
  quaternionToMatrix3x3(quat, out_3x3);

  // Put the flip back into the orthogonalized matrix.
  if (flip) {
    for (let i = 0; i < 3; i++) {
      out_3x3[0][i] = -out_3x3[0][i];
      out_3x3[1][i] = -out_3x3[1][i];
      out_3x3[2][i] = -out_3x3[2][i];
    }
  }

  // Undo the pivoting
  if (index[1] !== 1) {
    vtkSwapVectors3(out_3x3[index[1]], out_3x3[1]);
  }
  if (index[0] !== 0) {
    vtkSwapVectors3(out_3x3[index[0]], out_3x3[0]);
  }
}

function diagonalize3x3(a_3x3, w_3, v_3x3) {
  let i;
  let j;
  let k;
  let maxI;
  let tmp;
  let maxVal;

  // do the matrix[3][3] to **matrix conversion for Jacobi
  const C = [createArray(3), createArray(3), createArray(3)];
  const ATemp = createArray(3);
  const VTemp = createArray(3);
  for (i = 0; i < 3; i++) {
    C[i][0] = a_3x3[i][0];
    C[i][1] = a_3x3[i][1];
    C[i][2] = a_3x3[i][2];
    ATemp[i] = C[i];
    VTemp[i] = v_3x3[i];
  }

  // diagonalize using Jacobi
  jacobiN(ATemp, 3, w_3, VTemp);

  // if all the eigenvalues are the same, return identity matrix
  if (w_3[0] === w_3[1] && w_3[0] === w_3[2]) {
    identity3x3(v_3x3);
    return;
  }

  // transpose temporarily, it makes it easier to sort the eigenvectors
  transpose3x3(v_3x3, v_3x3);

  // if two eigenvalues are the same, re-orthogonalize to optimally line
  // up the eigenvectors with the x, y, and z axes
  for (i = 0; i < 3; i++) {
    // two eigenvalues are the same
    if (w_3[(i + 1) % 3] === w_3[(i + 2) % 3]) {
      // find maximum element of the independent eigenvector
      maxVal = Math.abs(v_3x3[i][0]);
      maxI = 0;
      for (j = 1; j < 3; j++) {
        if (maxVal < (tmp = Math.abs(v_3x3[i][j]))) {
          maxVal = tmp;
          maxI = j;
        }
      }
      // swap the eigenvector into its proper position
      if (maxI !== i) {
        tmp = w_3[maxI];
        w_3[maxI] = w_3[i];
        w_3[i] = tmp;
        vtkSwapVectors3(v_3x3[i], v_3x3[maxI]);
      }
      // maximum element of eigenvector should be positive
      if (v_3x3[maxI][maxI] < 0) {
        v_3x3[maxI][0] = -v_3x3[maxI][0];
        v_3x3[maxI][1] = -v_3x3[maxI][1];
        v_3x3[maxI][2] = -v_3x3[maxI][2];
      }

      // re-orthogonalize the other two eigenvectors
      j = (maxI + 1) % 3;
      k = (maxI + 2) % 3;

      v_3x3[j][0] = 0.0;
      v_3x3[j][1] = 0.0;
      v_3x3[j][2] = 0.0;
      v_3x3[j][j] = 1.0;
      cross(v_3x3[maxI], v_3x3[j], v_3x3[k]);
      normalize(v_3x3[k]);
      cross(v_3x3[k], v_3x3[maxI], v_3x3[j]);

      // transpose vectors back to columns
      transpose3x3(v_3x3, v_3x3);
      return;
    }
  }

  // the three eigenvalues are different, just sort the eigenvectors
  // to align them with the x, y, and z axes

  // find the vector with the largest x element, make that vector
  // the first vector
  maxVal = Math.abs(v_3x3[0][0]);
  maxI = 0;
  for (i = 1; i < 3; i++) {
    if (maxVal < (tmp = Math.abs(v_3x3[i][0]))) {
      maxVal = tmp;
      maxI = i;
    }
  }
  // swap eigenvalue and eigenvector
  if (maxI !== 0) {
    tmp = w_3[maxI];
    w_3[maxI] = w_3[0];
    w_3[0] = tmp;
    vtkSwapVectors3(v_3x3[maxI], v_3x3[0]);
  }
  // do the same for the y element
  if (Math.abs(v_3x3[1][1]) < Math.abs(v_3x3[2][1])) {
    tmp = w_3[2];
    w_3[2] = w_3[1];
    w_3[1] = tmp;
    vtkSwapVectors3(v_3x3[2], v_3x3[1]);
  }

  // ensure that the sign of the eigenvectors is correct
  for (i = 0; i < 2; i++) {
    if (v_3x3[i][i] < 0) {
      v_3x3[i][0] = -v_3x3[i][0];
      v_3x3[i][1] = -v_3x3[i][1];
      v_3x3[i][2] = -v_3x3[i][2];
    }
  }
  // set sign of final eigenvector to ensure that determinant is positive
  if (determinant3x3(v_3x3) < 0) {
    v_3x3[2][0] = -v_3x3[2][0];
    v_3x3[2][1] = -v_3x3[2][1];
    v_3x3[2][2] = -v_3x3[2][2];
  }

  // transpose the eigenvectors back again
  transpose3x3(v_3x3, v_3x3);
}

function singularValueDecomposition3x3(a_3x3, u_3x3, w_3, vT_3x3) {
  let i;
  const B = [createArray(3), createArray(3), createArray(3)];

  // copy so that A can be used for U or VT without risk
  for (i = 0; i < 3; i++) {
    B[0][i] = a_3x3[0][i];
    B[1][i] = a_3x3[1][i];
    B[2][i] = a_3x3[2][i];
  }

  // temporarily flip if determinant is negative
  const d = determinant3x3(B);
  if (d < 0) {
    for (i = 0; i < 3; i++) {
      B[0][i] = -B[0][i];
      B[1][i] = -B[1][i];
      B[2][i] = -B[2][i];
    }
  }

  // orthogonalize, diagonalize, etc.
  orthogonalize3x3(B, u_3x3);
  transpose3x3(B, B);
  multiply3x3_mat3(B, u_3x3, vT_3x3);
  diagonalize3x3(vT_3x3, w_3, vT_3x3);
  multiply3x3_mat3(u_3x3, vT_3x3, u_3x3);
  transpose3x3(vT_3x3, vT_3x3);

  // re-create the flip
  if (d < 0) {
    w_3[0] = -w_3[0];
    w_3[1] = -w_3[1];
    w_3[2] = -w_3[2];
  }
}

function luFactorLinearSystem(A, index, size) {
  let i;
  let j;
  let k;
  let largest;
  let maxI = 0;
  let sum;
  let temp1;
  let temp2;
  const scale = createArray(size);

  //
  // Loop over rows to get implicit scaling information
  //
  for (i = 0; i < size; i++) {
    for (largest = 0.0, j = 0; j < size; j++) {
      if ((temp2 = Math.abs(A[i][j])) > largest) {
        largest = temp2;
      }
    }

    if (largest === 0.0) {
      Math_vtkWarningMacro('Unable to factor linear system');
      return 0;
    }
    scale[i] = 1.0 / largest;
  }
  //
  // Loop over all columns using Crout's method
  //
  for (j = 0; j < size; j++) {
    for (i = 0; i < j; i++) {
      sum = A[i][j];
      for (k = 0; k < i; k++) {
        sum -= A[i][k] * A[k][j];
      }
      A[i][j] = sum;
    }
    //
    // Begin search for largest pivot element
    //
    for (largest = 0.0, i = j; i < size; i++) {
      sum = A[i][j];
      for (k = 0; k < j; k++) {
        sum -= A[i][k] * A[k][j];
      }
      A[i][j] = sum;

      if ((temp1 = scale[i] * Math.abs(sum)) >= largest) {
        largest = temp1;
        maxI = i;
      }
    }
    //
    // Check for row interchange
    //
    if (j !== maxI) {
      for (k = 0; k < size; k++) {
        temp1 = A[maxI][k];
        A[maxI][k] = A[j][k];
        A[j][k] = temp1;
      }
      scale[maxI] = scale[j];
    }
    //
    // Divide by pivot element and perform elimination
    //
    index[j] = maxI;

    if (Math.abs(A[j][j]) <= VTK_SMALL_NUMBER) {
      Math_vtkWarningMacro('Unable to factor linear system');
      return 0;
    }

    if (j !== size - 1) {
      temp1 = 1.0 / A[j][j];
      for (i = j + 1; i < size; i++) {
        A[i][j] *= temp1;
      }
    }
  }
  return 1;
}

function luSolveLinearSystem(A, index, x, size) {
  let i;
  let j;
  let ii;
  let idx;
  let sum;
  //
  // Proceed with forward and backsubstitution for L and U
  // matrices.  First, forward substitution.
  //
  for (ii = -1, i = 0; i < size; i++) {
    idx = index[i];
    sum = x[idx];
    x[idx] = x[i];

    if (ii >= 0) {
      for (j = ii; j <= i - 1; j++) {
        sum -= A[i][j] * x[j];
      }
    } else if (sum !== 0.0) {
      ii = i;
    }

    x[i] = sum;
  }
  //
  // Now, back substitution
  //
  for (i = size - 1; i >= 0; i--) {
    sum = x[i];
    for (j = i + 1; j < size; j++) {
      sum -= A[i][j] * x[j];
    }
    x[i] = sum / A[i][i];
  }
}

function solveLinearSystem(A, x, size) {
  // if we solving something simple, just solve it
  if (size === 2) {
    const y = createArray(2);
    const det = determinant2x2(A[0][0], A[0][1], A[1][0], A[1][1]);

    if (det === 0.0) {
      // Unable to solve linear system
      return 0;
    }

    y[0] = (A[1][1] * x[0] - A[0][1] * x[1]) / det;
    y[1] = (-(A[1][0] * x[0]) + A[0][0] * x[1]) / det;

    x[0] = y[0];
    x[1] = y[1];
    return 1;
  }

  if (size === 1) {
    if (A[0][0] === 0.0) {
      // Unable to solve linear system
      return 0;
    }

    x[0] /= A[0][0];
    return 1;
  }

  //
  // System of equations is not trivial, use Crout's method
  //

  // Check on allocation of working vectors
  const index = createArray(size);

  // Factor and solve matrix
  if (luFactorLinearSystem(A, index, size) === 0) {
    return 0;
  }
  luSolveLinearSystem(A, index, x, size);

  return 1;
}

function invertMatrix(A, AI, size, index = null, column = null) {
  const tmp1Size = index || createArray(size);
  const tmp2Size = column || createArray(size);

  // Factor matrix; then begin solving for inverse one column at a time.
  // Note: tmp1Size returned value is used later, tmp2Size is just working
  // memory whose values are not used in LUSolveLinearSystem
  if (luFactorLinearSystem(A, tmp1Size, size, tmp2Size) === 0) {
    return 0;
  }

  for (let j = 0; j < size; j++) {
    for (let i = 0; i < size; i++) {
      tmp2Size[i] = 0.0;
    }
    tmp2Size[j] = 1.0;

    luSolveLinearSystem(A, tmp1Size, tmp2Size, size);

    for (let i = 0; i < size; i++) {
      AI[i][j] = tmp2Size[i];
    }
  }

  return 1;
}

function estimateMatrixCondition(A, size) {
  let minValue = +Number.MAX_VALUE;
  let maxValue = -Number.MAX_VALUE;

  // find the maximum value
  for (let i = 0; i < size; i++) {
    for (let j = i; j < size; j++) {
      if (Math.abs(A[i][j]) > Math_max) {
        maxValue = Math.abs(A[i][j]);
      }
    }
  }

  // find the minimum diagonal value
  for (let i = 0; i < size; i++) {
    if (Math.abs(A[i][i]) < Math_min) {
      minValue = Math.abs(A[i][i]);
    }
  }

  if (minValue === 0.0) {
    return Number.MAX_VALUE;
  }
  return maxValue / minValue;
}

function jacobi(a_3x3, w, v) {
  return jacobiN(a_3x3, 3, w, v);
}

function solveHomogeneousLeastSquares(numberOfSamples, xt, xOrder, mt) {
  // check dimensional consistency
  if (numberOfSamples < xOrder) {
    Math_vtkWarningMacro('Insufficient number of samples. Underdetermined.');
    return 0;
  }

  let i;
  let j;
  let k;

  // set up intermediate variables
  // Allocate matrix to hold X times transpose of X
  const XXt = createArray(xOrder); // size x by x
  // Allocate the array of eigenvalues and eigenvectors
  const eigenvals = createArray(xOrder);
  const eigenvecs = createArray(xOrder);

  // Clear the upper triangular region (and btw, allocate the eigenvecs as well)
  for (i = 0; i < xOrder; i++) {
    eigenvecs[i] = createArray(xOrder);
    XXt[i] = createArray(xOrder);
    for (j = 0; j < xOrder; j++) {
      XXt[i][j] = 0.0;
    }
  }

  // Calculate XXt upper half only, due to symmetry
  for (k = 0; k < numberOfSamples; k++) {
    for (i = 0; i < xOrder; i++) {
      for (j = i; j < xOrder; j++) {
        XXt[i][j] += xt[k][i] * xt[k][j];
      }
    }
  }

  // now fill in the lower half of the XXt matrix
  for (i = 0; i < xOrder; i++) {
    for (j = 0; j < i; j++) {
      XXt[i][j] = XXt[j][i];
    }
  }

  // Compute the eigenvectors and eigenvalues
  jacobiN(XXt, xOrder, eigenvals, eigenvecs);

  // Smallest eigenval is at the end of the list (xOrder-1), and solution is
  // corresponding eigenvec.
  for (i = 0; i < xOrder; i++) {
    mt[i][0] = eigenvecs[i][xOrder - 1];
  }

  return 1;
}

function solveLeastSquares(
  numberOfSamples,
  xt,
  xOrder,
  yt,
  yOrder,
  mt,
  checkHomogeneous = true
) {
  // check dimensional consistency
  if (numberOfSamples < xOrder || numberOfSamples < yOrder) {
    Math_vtkWarningMacro('Insufficient number of samples. Underdetermined.');
    return 0;
  }

  const homogenFlags = createArray(yOrder);
  let allHomogeneous = 1;
  let hmt;
  let homogRC = 0;
  let i;
  let j;
  let k;
  let someHomogeneous = 0;

  // Ok, first init some flags check and see if all the systems are homogeneous
  if (checkHomogeneous) {
    // If Y' is zero, it's a homogeneous system and can't be solved via
    // the pseudoinverse method. Detect this case, warn the user, and
    // invoke SolveHomogeneousLeastSquares instead. Note that it doesn't
    // really make much sense for yOrder to be greater than one in this case,
    // since that's just yOrder occurrences of a 0 vector on the RHS, but
    // we allow it anyway. N

    // Initialize homogeneous flags on a per-right-hand-side basis
    for (j = 0; j < yOrder; j++) {
      homogenFlags[j] = 1;
    }
    for (i = 0; i < numberOfSamples; i++) {
      for (j = 0; j < yOrder; j++) {
        if (Math.abs(yt[i][j]) > VTK_SMALL_NUMBER) {
          allHomogeneous = 0;
          homogenFlags[j] = 0;
        }
      }
    }

    // If we've got one system, and it's homogeneous, do it and bail out quickly.
    if (allHomogeneous && yOrder === 1) {
      Math_vtkWarningMacro(
        'Detected homogeneous system (Y=0), calling SolveHomogeneousLeastSquares()'
      );
      return solveHomogeneousLeastSquares(numberOfSamples, xt, xOrder, mt);
    }

    // Ok, we've got more than one system of equations.
    // Figure out if we need to calculate the homogeneous equation solution for
    // any of them.
    if (allHomogeneous) {
      someHomogeneous = 1;
    } else {
      for (j = 0; j < yOrder; j++) {
        if (homogenFlags[j]) {
          someHomogeneous = 1;
        }
      }
    }
  }

  // If necessary, solve the homogeneous problem
  if (someHomogeneous) {
    // hmt is the homogeneous equation version of mt, the general solution.
    hmt = createArray(xOrder);
    for (j = 0; j < xOrder; j++) {
      // Only allocate 1 here, not yOrder, because here we're going to solve
      // just the one homogeneous equation subset of the entire problem
      hmt[j] = [0];
    }

    // Ok, solve the homogeneous problem
    homogRC = solveHomogeneousLeastSquares(numberOfSamples, xt, xOrder, hmt);
  }

  // set up intermediate variables
  const XXt = createArray(xOrder); // size x by x
  const XXtI = createArray(xOrder); // size x by x
  const XYt = createArray(xOrder); // size x by y
  for (i = 0; i < xOrder; i++) {
    XXt[i] = createArray(xOrder);
    XXtI[i] = createArray(xOrder);

    for (j = 0; j < xOrder; j++) {
      XXt[i][j] = 0.0;
      XXtI[i][j] = 0.0;
    }

    XYt[i] = createArray(yOrder);
    for (j = 0; j < yOrder; j++) {
      XYt[i][j] = 0.0;
    }
  }

  // first find the pseudoinverse matrix
  for (k = 0; k < numberOfSamples; k++) {
    for (i = 0; i < xOrder; i++) {
      // first calculate the XXt matrix, only do the upper half (symmetrical)
      for (j = i; j < xOrder; j++) {
        XXt[i][j] += xt[k][i] * xt[k][j];
      }

      // now calculate the XYt matrix
      for (j = 0; j < yOrder; j++) {
        XYt[i][j] += xt[k][i] * yt[k][j];
      }
    }
  }

  // now fill in the lower half of the XXt matrix
  for (i = 0; i < xOrder; i++) {
    for (j = 0; j < i; j++) {
      XXt[i][j] = XXt[j][i];
    }
  }

  const successFlag = invertMatrix(XXt, XXtI, xOrder);

  // next get the inverse of XXt
  if (successFlag) {
    for (i = 0; i < xOrder; i++) {
      for (j = 0; j < yOrder; j++) {
        mt[i][j] = 0.0;
        for (k = 0; k < xOrder; k++) {
          mt[i][j] += XXtI[i][k] * XYt[k][j];
        }
      }
    }
  }

  // Fix up any of the solutions that correspond to the homogeneous equation
  // problem.
  if (someHomogeneous) {
    for (j = 0; j < yOrder; j++) {
      if (homogenFlags[j]) {
        // Fix this one
        for (i = 0; i < xOrder; i++) {
          mt[i][j] = hmt[i][0];
        }
      }
    }
  }

  if (someHomogeneous) {
    return homogRC && successFlag;
  }

  return successFlag;
}

function hex2float(hexStr, outFloatArray = [0, 0.5, 1]) {
  switch (hexStr.length) {
    case 3: // abc => #aabbcc
      outFloatArray[0] = (parseInt(hexStr[0], 16) * 17) / 255;
      outFloatArray[1] = (parseInt(hexStr[1], 16) * 17) / 255;
      outFloatArray[2] = (parseInt(hexStr[2], 16) * 17) / 255;
      return outFloatArray;
    case 4: // #abc => #aabbcc
      outFloatArray[0] = (parseInt(hexStr[1], 16) * 17) / 255;
      outFloatArray[1] = (parseInt(hexStr[2], 16) * 17) / 255;
      outFloatArray[2] = (parseInt(hexStr[3], 16) * 17) / 255;
      return outFloatArray;
    case 6: // ab01df => #ab01df
      outFloatArray[0] = parseInt(hexStr.substr(0, 2), 16) / 255;
      outFloatArray[1] = parseInt(hexStr.substr(2, 2), 16) / 255;
      outFloatArray[2] = parseInt(hexStr.substr(4, 2), 16) / 255;
      return outFloatArray;
    case 7: // #ab01df
      outFloatArray[0] = parseInt(hexStr.substr(1, 2), 16) / 255;
      outFloatArray[1] = parseInt(hexStr.substr(3, 2), 16) / 255;
      outFloatArray[2] = parseInt(hexStr.substr(5, 2), 16) / 255;
      return outFloatArray;
    case 9: // #ab01df00
      outFloatArray[0] = parseInt(hexStr.substr(1, 2), 16) / 255;
      outFloatArray[1] = parseInt(hexStr.substr(3, 2), 16) / 255;
      outFloatArray[2] = parseInt(hexStr.substr(5, 2), 16) / 255;
      outFloatArray[3] = parseInt(hexStr.substr(7, 2), 16) / 255;
      return outFloatArray;
    default:
      return outFloatArray;
  }
}

function rgb2hsv(rgb, hsv) {
  let h;
  let s;
  const [r, g, b] = rgb;
  const onethird = 1.0 / 3.0;
  const onesixth = 1.0 / 6.0;
  const twothird = 2.0 / 3.0;

  let cmax = r;
  let cmin = r;

  if (g > cmax) {
    cmax = g;
  } else if (g < cmin) {
    cmin = g;
  }
  if (b > cmax) {
    cmax = b;
  } else if (b < cmin) {
    cmin = b;
  }
  const v = cmax;

  if (v > 0.0) {
    s = (cmax - cmin) / cmax;
  } else {
    s = 0.0;
  }
  if (s > 0) {
    if (r === cmax) {
      h = (onesixth * (g - b)) / (cmax - cmin);
    } else if (g === cmax) {
      h = onethird + (onesixth * (b - r)) / (cmax - cmin);
    } else {
      h = twothird + (onesixth * (r - g)) / (cmax - cmin);
    }
    if (h < 0.0) {
      h += 1.0;
    }
  } else {
    h = 0.0;
  }

  // Set the values back to the array
  hsv[0] = h;
  hsv[1] = s;
  hsv[2] = v;
}

function hsv2rgb(hsv, rgb) {
  const [h, s, v] = hsv;
  const onethird = 1.0 / 3.0;
  const onesixth = 1.0 / 6.0;
  const twothird = 2.0 / 3.0;
  const fivesixth = 5.0 / 6.0;
  let r;
  let g;
  let b;

  // compute RGB from HSV
  if (h > onesixth && h <= onethird) {
    // green/red
    g = 1.0;
    r = (onethird - h) / onesixth;
    b = 0.0;
  } else if (h > onethird && h <= 0.5) {
    // green/blue
    g = 1.0;
    b = (h - onethird) / onesixth;
    r = 0.0;
  } else if (h > 0.5 && h <= twothird) {
    // blue/green
    b = 1.0;
    g = (twothird - h) / onesixth;
    r = 0.0;
  } else if (h > twothird && h <= fivesixth) {
    // blue/red
    b = 1.0;
    r = (h - twothird) / onesixth;
    g = 0.0;
  } else if (h > fivesixth && h <= 1.0) {
    // red/blue
    r = 1.0;
    b = (1.0 - h) / onesixth;
    g = 0.0;
  } else {
    // red/green
    r = 1.0;
    g = h / onesixth;
    b = 0.0;
  }

  // add Saturation to the equation.
  r = s * r + (1.0 - s);
  g = s * g + (1.0 - s);
  b = s * b + (1.0 - s);

  r *= v;
  g *= v;
  b *= v;

  // Assign back to the array
  rgb[0] = r;
  rgb[1] = g;
  rgb[2] = b;
}

function lab2xyz(lab, xyz) {
  // LAB to XYZ
  const [L, a, b] = lab;
  let var_Y = (L + 16) / 116;
  let var_X = a / 500 + var_Y;
  let var_Z = var_Y - b / 200;

  if (var_Y ** 3 > 0.008856) {
    var_Y **= 3;
  } else {
    var_Y = (var_Y - 16.0 / 116.0) / 7.787;
  }

  if (var_X ** 3 > 0.008856) {
    var_X **= 3;
  } else {
    var_X = (var_X - 16.0 / 116.0) / 7.787;
  }

  if (var_Z ** 3 > 0.008856) {
    var_Z **= 3;
  } else {
    var_Z = (var_Z - 16.0 / 116.0) / 7.787;
  }
  const ref_X = 0.9505;
  const ref_Y = 1.0;
  const ref_Z = 1.089;
  xyz[0] = ref_X * var_X; // ref_X = 0.9505  Observer= 2 deg Illuminant= D65
  xyz[1] = ref_Y * var_Y; // ref_Y = 1.000
  xyz[2] = ref_Z * var_Z; // ref_Z = 1.089
}

function xyz2lab(xyz, lab) {
  const [x, y, z] = xyz;
  const ref_X = 0.9505;
  const ref_Y = 1.0;
  const ref_Z = 1.089;
  let var_X = x / ref_X; // ref_X = 0.9505  Observer= 2 deg, Illuminant= D65
  let var_Y = y / ref_Y; // ref_Y = 1.000
  let var_Z = z / ref_Z; // ref_Z = 1.089

  if (var_X > 0.008856) var_X **= 1.0 / 3.0;
  else var_X = 7.787 * var_X + 16.0 / 116.0;
  if (var_Y > 0.008856) var_Y **= 1.0 / 3.0;
  else var_Y = 7.787 * var_Y + 16.0 / 116.0;
  if (var_Z > 0.008856) var_Z **= 1.0 / 3.0;
  else var_Z = 7.787 * var_Z + 16.0 / 116.0;

  lab[0] = 116 * var_Y - 16;
  lab[1] = 500 * (var_X - var_Y);
  lab[2] = 200 * (var_Y - var_Z);
}

function xyz2rgb(xyz, rgb) {
  const [x, y, z] = xyz;
  let r = x * 3.2406 + y * -1.5372 + z * -0.4986;
  let g = x * -0.9689 + y * 1.8758 + z * 0.0415;
  let b = x * 0.0557 + y * -0.204 + z * 1.057;

  // The following performs a "gamma correction" specified by the sRGB color
  // space.  sRGB is defined by a canonical definition of a display monitor and
  // has been standardized by the International Electrotechnical Commission (IEC
  // 61966-2-1).  The nonlinearity of the correction is designed to make the
  // colors more perceptually uniform.  This color space has been adopted by
  // several applications including Adobe Photoshop and Microsoft Windows color
  // management.  OpenGL is agnostic on its RGB color space, but it is reasonable
  // to assume it is close to this one.
  if (r > 0.0031308) r = 1.055 * r ** (1 / 2.4) - 0.055;
  else r *= 12.92;
  if (g > 0.0031308) g = 1.055 * g ** (1 / 2.4) - 0.055;
  else g *= 12.92;
  if (b > 0.0031308) b = 1.055 * b ** (1 / 2.4) - 0.055;
  else b *= 12.92;

  // Clip colors. ideally we would do something that is perceptually closest
  // (since we can see colors outside of the display gamut), but this seems to
  // work well enough.
  let maxVal = r;
  if (maxVal < g) maxVal = g;
  if (maxVal < b) maxVal = b;
  if (maxVal > 1.0) {
    r /= maxVal;
    g /= maxVal;
    b /= maxVal;
  }
  if (r < 0) r = 0;
  if (g < 0) g = 0;
  if (b < 0) b = 0;

  // Push values back to array
  rgb[0] = r;
  rgb[1] = g;
  rgb[2] = b;
}

function rgb2xyz(rgb, xyz) {
  let [r, g, b] = rgb;
  // The following performs a "gamma correction" specified by the sRGB color
  // space.  sRGB is defined by a canonical definition of a display monitor and
  // has been standardized by the International Electrotechnical Commission (IEC
  // 61966-2-1).  The nonlinearity of the correction is designed to make the
  // colors more perceptually uniform.  This color space has been adopted by
  // several applications including Adobe Photoshop and Microsoft Windows color
  // management.  OpenGL is agnostic on its RGB color space, but it is reasonable
  // to assume it is close to this one.
  if (r > 0.04045) r = ((r + 0.055) / 1.055) ** 2.4;
  else r /= 12.92;
  if (g > 0.04045) g = ((g + 0.055) / 1.055) ** 2.4;
  else g /= 12.92;
  if (b > 0.04045) b = ((b + 0.055) / 1.055) ** 2.4;
  else b /= 12.92;

  // Observer. = 2 deg, Illuminant = D65
  xyz[0] = r * 0.4124 + g * 0.3576 + b * 0.1805;
  xyz[1] = r * 0.2126 + g * 0.7152 + b * 0.0722;
  xyz[2] = r * 0.0193 + g * 0.1192 + b * 0.9505;
}

function rgb2lab(rgb, lab) {
  const xyz = [0, 0, 0];
  rgb2xyz(rgb, xyz);
  xyz2lab(xyz, lab);
}

function lab2rgb(lab, rgb) {
  const xyz = [0, 0, 0];
  lab2xyz(lab, xyz);
  xyz2rgb(xyz, rgb);
}

function uninitializeBounds(bounds) {
  bounds[0] = 1.0;
  bounds[1] = -1.0;
  bounds[2] = 1.0;
  bounds[3] = -1.0;
  bounds[4] = 1.0;
  bounds[5] = -1.0;
  return bounds;
}

function areBoundsInitialized(bounds) {
  return !(bounds[1] - bounds[0] < 0.0);
}

function computeBoundsFromPoints(point1, point2, bounds) {
  bounds[0] = Math.min(point1[0], point2[0]);
  bounds[1] = Math.max(point1[0], point2[0]);
  bounds[2] = Math.min(point1[1], point2[1]);
  bounds[3] = Math.max(point1[1], point2[1]);
  bounds[4] = Math.min(point1[2], point2[2]);
  bounds[5] = Math.max(point1[2], point2[2]);
  return bounds;
}

function clampValue(value, minValue, maxValue) {
  if (value < minValue) {
    return minValue;
  }
  if (value > maxValue) {
    return maxValue;
  }
  return value;
}

function clampVector(vector, minVector, maxVector, out = [0, 0, 0]) {
  out[0] = clampValue(vector[0], minVector[0], maxVector[0]);
  out[1] = clampValue(vector[1], minVector[1], maxVector[1]);
  out[2] = clampValue(vector[2], minVector[2], maxVector[2]);

  return out;
}

function clampAndNormalizeValue(value, range) {
  let result = 0;
  if (range[0] !== range[1]) {
    // clamp
    if (value < range[0]) {
      result = range[0];
    } else if (value > range[1]) {
      result = range[1];
    } else {
      result = value;
    }
    // normalize
    result = (result - range[0]) / (range[1] - range[0]);
  }

  return result;
}

const getScalarTypeFittingRange = notImplemented(
  'GetScalarTypeFittingRange'
);
const getAdjustedScalarRange = notImplemented('GetAdjustedScalarRange');

function extentIsWithinOtherExtent(extent1, extent2) {
  if (!extent1 || !extent2) {
    return 0;
  }

  for (let i = 0; i < 6; i += 2) {
    if (
      extent1[i] < extent2[i] ||
      extent1[i] > extent2[i + 1] ||
      extent1[i + 1] < extent2[i] ||
      extent1[i + 1] > extent2[i + 1]
    ) {
      return 0;
    }
  }

  return 1;
}

function boundsIsWithinOtherBounds(bounds1_6, bounds2_6, delta_3) {
  if (!bounds1_6 || !bounds2_6) {
    return 0;
  }
  for (let i = 0; i < 6; i += 2) {
    if (
      bounds1_6[i] + delta_3[i / 2] < bounds2_6[i] ||
      bounds1_6[i] - delta_3[i / 2] > bounds2_6[i + 1] ||
      bounds1_6[i + 1] + delta_3[i / 2] < bounds2_6[i] ||
      bounds1_6[i + 1] - delta_3[i / 2] > bounds2_6[i + 1]
    ) {
      return 0;
    }
  }
  return 1;
}

function pointIsWithinBounds(point_3, bounds_6, delta_3) {
  if (!point_3 || !bounds_6 || !delta_3) {
    return 0;
  }
  for (let i = 0; i < 3; i++) {
    if (
      point_3[i] + delta_3[i] < bounds_6[2 * i] ||
      point_3[i] - delta_3[i] > bounds_6[2 * i + 1]
    ) {
      return 0;
    }
  }
  return 1;
}

function solve3PointCircle(p1, p2, p3, center) {
  const v21 = createArray(3);
  const v32 = createArray(3);
  const v13 = createArray(3);
  const v12 = createArray(3);
  const v23 = createArray(3);
  const v31 = createArray(3);

  for (let i = 0; i < 3; ++i) {
    v21[i] = p1[i] - p2[i];
    v32[i] = p2[i] - p3[i];
    v13[i] = p3[i] - p1[i];
    v12[i] = -v21[i];
    v23[i] = -v32[i];
    v31[i] = -v13[i];
  }

  const norm12 = Math_norm(v12);
  const norm23 = Math_norm(v23);
  const norm13 = Math_norm(v13);

  const crossv21v32 = createArray(3);
  cross(v21, v32, crossv21v32);
  const normCross = Math_norm(crossv21v32);

  const radius = (norm12 * norm23 * norm13) / (2 * normCross);

  const normCross22 = 2 * normCross * normCross;
  const alpha = (norm23 * norm23 * dot(v21, v31)) / normCross22;
  const beta = (norm13 * norm13 * dot(v12, v32)) / normCross22;
  const gamma = (norm12 * norm12 * dot(v13, v23)) / normCross22;

  for (let i = 0; i < 3; ++i) {
    center[i] = alpha * p1[i] + beta * p2[i] + gamma * p3[i];
  }
  return radius;
}

const inf = Infinity;
const negInf = -Infinity;

const isInf = (value) => !Number.isFinite(value);
const { isFinite: Math_isFinite, isNaN: Math_isNaN } = Number;
const isNan = Math_isNaN;

// JavaScript - add-on ----------------------

function createUninitializedBounds() {
  return [].concat([
    Number.MAX_VALUE,
    -Number.MAX_VALUE, // X
    Number.MAX_VALUE,
    -Number.MAX_VALUE, // Y
    Number.MAX_VALUE,
    -Number.MAX_VALUE, // Z
  ]);
}

function getMajorAxisIndex(vector) {
  let maxValue = -1;
  let axisIndex = -1;
  for (let i = 0; i < vector.length; i++) {
    const value = Math.abs(vector[i]);
    if (value > maxValue) {
      axisIndex = i;
      maxValue = value;
    }
  }

  return axisIndex;
}

function floatToHex2(value) {
  const integer = Math.floor(value * 255);
  if (integer > 15) {
    return integer.toString(16);
  }
  return `0${integer.toString(16)}`;
}

function floatRGB2HexCode(rgbArray, prefix = '#') {
  return `${prefix}${rgbArray.map(floatToHex2).join('')}`;
}

function floatToChar(f) {
  return Math.round(f * 255);
}

function float2CssRGBA(rgbArray) {
  if (rgbArray.length === 3) {
    return `rgb(${rgbArray.map(floatToChar).join(', ')})`;
  }
  return `rgba(${floatToChar(rgbArray[0] || 0)}, ${floatToChar(
    rgbArray[1] || 0
  )}, ${floatToChar(rgbArray[2] || 0)}, ${rgbArray[3] || 0})`;
}

// ----------------------------------------------------------------------------
// Only Static API
// ----------------------------------------------------------------------------

/* harmony default export */ var Core_Math = ({
  Pi,
  radiansFromDegrees,
  degreesFromRadians,
  round,
  floor,
  ceil,
  ceilLog2,
  min: Math_min,
  max: Math_max,
  arrayMin,
  arrayMax,
  arrayRange,
  isPowerOfTwo,
  nearestPowerOfTwo,
  factorial,
  binomial,
  beginCombination,
  nextCombination,
  randomSeed,
  getSeed,
  random,
  gaussian,
  add,
  subtract,
  multiplyScalar,
  multiplyScalar2D,
  multiplyAccumulate,
  multiplyAccumulate2D,
  dot,
  outer,
  cross,
  norm: Math_norm,
  normalize,
  perpendiculars,
  projectVector,
  projectVector2D,
  distance2BetweenPoints,
  angleBetweenVectors,
  gaussianAmplitude,
  gaussianWeight,
  dot2D,
  outer2D,
  norm2D,
  normalize2D,
  determinant2x2,
  LUFactor3x3,
  LUSolve3x3,
  linearSolve3x3,
  multiply3x3_vect3,
  multiply3x3_mat3,
  multiplyMatrix,
  transpose3x3,
  invert3x3,
  identity3x3,
  determinant3x3,
  quaternionToMatrix3x3,
  areEquals,
  areMatricesEqual,
  roundNumber,
  roundVector,
  matrix3x3ToQuaternion,
  multiplyQuaternion,
  orthogonalize3x3,
  diagonalize3x3,
  singularValueDecomposition3x3,
  solveLinearSystem,
  invertMatrix,
  luFactorLinearSystem,
  luSolveLinearSystem,
  estimateMatrixCondition,
  jacobi,
  jacobiN,
  solveHomogeneousLeastSquares,
  solveLeastSquares,
  hex2float,
  rgb2hsv,
  hsv2rgb,
  lab2xyz,
  xyz2lab,
  xyz2rgb,
  rgb2xyz,
  rgb2lab,
  lab2rgb,
  uninitializeBounds,
  areBoundsInitialized,
  computeBoundsFromPoints,
  clampValue,
  clampVector,
  clampAndNormalizeValue,
  getScalarTypeFittingRange,
  getAdjustedScalarRange,
  extentIsWithinOtherExtent,
  boundsIsWithinOtherBounds,
  pointIsWithinBounds,
  solve3PointCircle,
  inf,
  negInf,
  isInf,
  isNan: Math_isNaN,
  isNaN: Math_isNaN,
  isFinite: Math_isFinite,

  // JS add-on
  createUninitializedBounds,
  getMajorAxisIndex,
  floatToHex2,
  floatRGB2HexCode,
  float2CssRGBA,
});

// CONCATENATED MODULE: ./node_modules/vtk.js/Sources/Common/Core/DataArray/Constants.js
const DataTypeByteSize = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8,
};

const VtkDataTypes = {
  VOID: '', // not sure to know what that should be
  CHAR: 'Int8Array',
  SIGNED_CHAR: 'Int8Array',
  UNSIGNED_CHAR: 'Uint8Array',
  SHORT: 'Int16Array',
  UNSIGNED_SHORT: 'Uint16Array',
  INT: 'Int32Array',
  UNSIGNED_INT: 'Uint32Array',
  FLOAT: 'Float32Array',
  DOUBLE: 'Float64Array',
};

const DefaultDataType = VtkDataTypes.FLOAT;

/* harmony default export */ var Constants = ({
  DefaultDataType,
  DataTypeByteSize,
  VtkDataTypes,
});

// CONCATENATED MODULE: ./node_modules/vtk.js/Sources/Common/Core/DataArray/index.js




const { DefaultDataType: DataArray_DefaultDataType } = Constants;
const TUPLE_HOLDER = [];

// ----------------------------------------------------------------------------
// Global methods
// ----------------------------------------------------------------------------

function createRangeHelper() {
  let min = Number.MAX_VALUE;
  let max = -Number.MAX_VALUE;
  let count = 0;
  let sum = 0;

  return {
    add(value) {
      if (min > value) {
        min = value;
      }
      if (max < value) {
        max = value;
      }
      count++;
      sum += value;
    },
    get() {
      return { min, max, count, sum, mean: sum / count };
    },
    getRange() {
      return { min, max };
    },
  };
}

function computeRange(values, component = 0, numberOfComponents = 1) {
  const helper = createRangeHelper();
  const size = values.length;
  let value = 0;

  if (component < 0 && numberOfComponents > 1) {
    // Compute magnitude
    for (let i = 0; i < size; i += numberOfComponents) {
      value = 0;
      for (let j = 0; j < numberOfComponents; j++) {
        value += values[i + j] * values[i + j];
      }
      value **= 0.5;
      helper.add(value);
    }
    return helper.getRange();
  }

  const offset = component < 0 ? 0 : component;
  for (let i = offset; i < size; i += numberOfComponents) {
    helper.add(values[i]);
  }

  return helper.getRange();
}

function ensureRangeSize(rangeArray, size = 0) {
  const ranges = rangeArray || [];
  // Pad ranges with null value to get the
  while (ranges.length <= size) {
    ranges.push(null);
  }
  return ranges;
}

function getDataType(typedArray) {
  // Expects toString() to return "[object ...Array]"
  return Object.prototype.toString.call(typedArray).slice(8, -1);
}

function getMaxNorm(normArray) {
  const numComps = normArray.getNumberOfComponents();
  let maxNorm = 0.0;
  for (let i = 0; i < normArray.getNumberOfTuples(); ++i) {
    const norm = Math_norm(normArray.getTuple(i), numComps);
    if (norm > maxNorm) {
      maxNorm = norm;
    }
  }
  return maxNorm;
}

// ----------------------------------------------------------------------------
// Static API
// ----------------------------------------------------------------------------

const STATIC = {
  computeRange,
  createRangeHelper,
  getDataType,
  getMaxNorm,
};

// ----------------------------------------------------------------------------
// vtkDataArray methods
// ----------------------------------------------------------------------------

function vtkDataArray(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkDataArray');

  function dataChange() {
    model.ranges = null;
    publicAPI.modified();
  }

  publicAPI.getElementComponentSize = () => model.values.BYTES_PER_ELEMENT;

  // Description:
  // Return the data component at the location specified by tupleIdx and
  // compIdx.
  publicAPI.getComponent = (tupleIdx, compIdx = 0) =>
    model.values[tupleIdx * model.numberOfComponents + compIdx];

  // Description:
  // Set the data component at the location specified by tupleIdx and compIdx
  // to value.
  // Note that i is less than NumberOfTuples and j is less than
  //  NumberOfComponents. Make sure enough memory has been allocated
  // (use SetNumberOfTuples() and SetNumberOfComponents()).
  publicAPI.setComponent = (tupleIdx, compIdx, value) => {
    if (value !== model.values[tupleIdx * model.numberOfComponents + compIdx]) {
      model.values[tupleIdx * model.numberOfComponents + compIdx] = value;
      dataChange();
    }
  };

  publicAPI.getData = () => model.values;

  publicAPI.getRange = (componentIndex = -1) => {
    const rangeIdx =
      componentIndex < 0 ? model.numberOfComponents : componentIndex;
    let range = null;

    if (!model.ranges) {
      model.ranges = ensureRangeSize(model.ranges, model.numberOfComponents);
    }
    range = model.ranges[rangeIdx];

    if (range) {
      model.rangeTuple[0] = range.min;
      model.rangeTuple[1] = range.max;
      return model.rangeTuple;
    }

    // Need to compute ranges...
    range = computeRange(
      model.values,
      componentIndex,
      model.numberOfComponents
    );
    model.ranges[rangeIdx] = range;
    model.rangeTuple[0] = range.min;
    model.rangeTuple[1] = range.max;
    return model.rangeTuple;
  };

  publicAPI.setRange = (rangeValue, componentIndex) => {
    if (!model.ranges) {
      model.ranges = ensureRangeSize(model.ranges, model.numberOfComponents);
    }
    const range = { min: rangeValue.min, max: rangeValue.max };

    model.ranges[componentIndex] = range;
    model.rangeTuple[0] = range.min;
    model.rangeTuple[1] = range.max;

    return model.rangeTuple;
  };

  publicAPI.setTuple = (idx, tuple) => {
    const offset = idx * model.numberOfComponents;
    for (let i = 0; i < model.numberOfComponents; i++) {
      model.values[offset + i] = tuple[i];
    }
  };

  publicAPI.getTuple = (idx, tupleToFill = TUPLE_HOLDER) => {
    const numberOfComponents = model.numberOfComponents || 1;
    if (tupleToFill.length !== numberOfComponents) {
      tupleToFill.length = numberOfComponents;
    }
    const offset = idx * numberOfComponents;
    // Check most common component sizes first
    // to avoid doing a for loop if possible
    if (numberOfComponents === 1) {
      tupleToFill[0] = model.values[offset];
    } else if (numberOfComponents === 2) {
      tupleToFill[0] = model.values[offset];
      tupleToFill[1] = model.values[offset + 1];
    } else if (numberOfComponents === 3) {
      tupleToFill[0] = model.values[offset];
      tupleToFill[1] = model.values[offset + 1];
      tupleToFill[2] = model.values[offset + 2];
    } else if (numberOfComponents === 4) {
      tupleToFill[0] = model.values[offset];
      tupleToFill[1] = model.values[offset + 1];
      tupleToFill[2] = model.values[offset + 2];
      tupleToFill[3] = model.values[offset + 3];
    } else {
      for (let i = 0; i < numberOfComponents; i++) {
        tupleToFill[i] = model.values[offset + i];
      }
    }
    return tupleToFill;
  };

  publicAPI.getTupleLocation = (idx = 1) => idx * model.numberOfComponents;
  publicAPI.getNumberOfComponents = () => model.numberOfComponents;
  publicAPI.getNumberOfValues = () => model.values.length;
  publicAPI.getNumberOfTuples = () =>
    model.values.length / model.numberOfComponents;
  publicAPI.getDataType = () => model.dataType;
  /* eslint-disable no-use-before-define */
  publicAPI.newClone = () =>
    DataArray_newInstance({
      empty: true,
      name: model.name,
      dataType: model.dataType,
      numberOfComponents: model.numberOfComponents,
    });
  /* eslint-enable no-use-before-define */

  publicAPI.getName = () => {
    if (!model.name) {
      publicAPI.modified();
      model.name = `vtkDataArray${publicAPI.getMTime()}`;
    }
    return model.name;
  };

  publicAPI.setData = (typedArray, numberOfComponents) => {
    model.values = typedArray;
    model.size = typedArray.length;
    model.dataType = getDataType(typedArray);
    if (numberOfComponents) {
      model.numberOfComponents = numberOfComponents;
    }
    if (model.size % model.numberOfComponents !== 0) {
      model.numberOfComponents = 1;
    }
    dataChange();
  };

  // Override serialization support
  publicAPI.getState = () => {
    const jsonArchive = { ...model, vtkClass: publicAPI.getClassName() };

    // Convert typed array to regular array
    jsonArchive.values = Array.from(jsonArchive.values);
    delete jsonArchive.buffer;

    // Clean any empty data
    Object.keys(jsonArchive).forEach((keyName) => {
      if (!jsonArchive[keyName]) {
        delete jsonArchive[keyName];
      }
    });

    // Sort resulting object by key name
    const sortedObj = {};
    Object.keys(jsonArchive)
      .sort()
      .forEach((name) => {
        sortedObj[name] = jsonArchive[name];
      });

    // Remove mtime
    if (sortedObj.mtime) {
      delete sortedObj.mtime;
    }

    return sortedObj;
  };
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {
  name: '',
  numberOfComponents: 1,
  size: 0,
  dataType: DataArray_DefaultDataType,
  rangeTuple: [0, 0],
  // values: null,
  // ranges: null,
};

// ----------------------------------------------------------------------------

function DataArray_extend(publicAPI, model, initialValues = {}) {
  Object.assign(model, DEFAULT_VALUES, initialValues);

  if (!model.empty && !model.values && !model.size) {
    throw new TypeError(
      'Cannot create vtkDataArray object without: size > 0, values'
    );
  }

  if (!model.values) {
    model.values = newTypedArray(model.dataType, model.size);
  } else if (Array.isArray(model.values)) {
    model.values = newTypedArrayFrom(model.dataType, model.values);
  }

  if (model.values) {
    model.size = model.values.length;
    model.dataType = getDataType(model.values);
  }

  // Object methods
  obj(publicAPI, model);
  set(publicAPI, model, ['name', 'numberOfComponents']);

  // Object specific methods
  vtkDataArray(publicAPI, model);
}

// ----------------------------------------------------------------------------

const DataArray_newInstance = newInstance(DataArray_extend, 'vtkDataArray');

// ----------------------------------------------------------------------------

/* harmony default export */ var DataArray = ({ newInstance: DataArray_newInstance, extend: DataArray_extend, ...STATIC, ...Constants });

// CONCATENATED MODULE: ./node_modules/vtk.js/Sources/Common/Core/ScalarsToColors/Constants.js
const VectorMode = {
  MAGNITUDE: 0,
  COMPONENT: 1,
  RGBCOLORS: 2,
};

const ScalarMappingTarget = {
  LUMINANCE: 1,
  LUMINANCE_ALPHA: 2,
  RGB: 3,
  RGBA: 4,
};

/* harmony default export */ var ScalarsToColors_Constants = ({
  VectorMode,
  ScalarMappingTarget,
});

// CONCATENATED MODULE: ./node_modules/vtk.js/Sources/Rendering/Core/Mapper/Constants.js
const ColorMode = {
  DEFAULT: 0,
  MAP_SCALARS: 1,
  DIRECT_SCALARS: 2,
};

const ScalarMode = {
  DEFAULT: 0,
  USE_POINT_DATA: 1,
  USE_CELL_DATA: 2,
  USE_POINT_FIELD_DATA: 3,
  USE_CELL_FIELD_DATA: 4,
  USE_FIELD_DATA: 5,
};

const GetArray = {
  BY_ID: 0,
  BY_NAME: 1,
};

/* harmony default export */ var Mapper_Constants = ({
  ColorMode,
  GetArray,
  ScalarMode,
});

// CONCATENATED MODULE: ./node_modules/vtk.js/Sources/Common/Core/ScalarsToColors/index.js



 // Need to go inside Constants otherwise dependency loop

const { ScalarMappingTarget: ScalarsToColors_ScalarMappingTarget, VectorMode: ScalarsToColors_VectorMode } = ScalarsToColors_Constants;
const { VtkDataTypes: ScalarsToColors_VtkDataTypes } = DataArray;
const { ColorMode: ScalarsToColors_ColorMode } = Mapper_Constants;
const { vtkErrorMacro: ScalarsToColors_vtkErrorMacro } = macros;

// ----------------------------------------------------------------------------
// Global methods
// ----------------------------------------------------------------------------

// Add module-level functions or api that you want to expose statically via
// the next section...

// ----------------------------------------------------------------------------
// Static API
// ----------------------------------------------------------------------------

function intColorToUChar(c) {
  return c;
}
function floatColorToUChar(c) {
  return Math.floor(c * 255.0 + 0.5);
}

// ----------------------------------------------------------------------------
// vtkScalarsToColors methods
// ----------------------------------------------------------------------------

function vtkScalarsToColors(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkScalarsToColors');

  publicAPI.setVectorModeToMagnitude = () =>
    publicAPI.setVectorMode(ScalarsToColors_VectorMode.MAGNITUDE);
  publicAPI.setVectorModeToComponent = () =>
    publicAPI.setVectorMode(ScalarsToColors_VectorMode.COMPONENT);
  publicAPI.setVectorModeToRGBColors = () =>
    publicAPI.setVectorMode(ScalarsToColors_VectorMode.RGBCOLORS);

  publicAPI.build = () => {};

  publicAPI.isOpaque = () => true;

  //----------------------------------------------------------------------------
  publicAPI.setAnnotations = (values, annotations) => {
    if ((values && !annotations) || (!values && annotations)) {
      return;
    }

    if (values && annotations && values.length !== annotations.length) {
      ScalarsToColors_vtkErrorMacro(
        'Values and annotations do not have the same number of tuples so ignoring'
      );
      return;
    }

    model.annotationArray = [];

    if (annotations && values) {
      const num = annotations.length;
      for (let i = 0; i < num; i++) {
        model.annotationArray.push({
          value: values[i],
          annotation: String(annotations[i]),
        });
      }
    }

    publicAPI.updateAnnotatedValueMap();
    publicAPI.modified();
  };

  //----------------------------------------------------------------------------
  publicAPI.setAnnotation = (value, annotation) => {
    let i = publicAPI.checkForAnnotatedValue(value);
    let modified = false;
    if (i >= 0) {
      if (model.annotationArray[i].annotation !== annotation) {
        model.annotationArray[i].annotation = annotation;
        modified = true;
      }
    } else {
      model.annotationArray.push({ value, annotation });
      i = model.annotationArray.length - 1;
      modified = true;
    }
    if (modified) {
      publicAPI.updateAnnotatedValueMap();
      publicAPI.modified();
    }
    return i;
  };

  //----------------------------------------------------------------------------
  publicAPI.getNumberOfAnnotatedValues = () => model.annotationArray.length;

  //----------------------------------------------------------------------------
  publicAPI.getAnnotatedValue = (idx) => {
    if (idx < 0 || idx >= model.annotationArray.length) {
      return null;
    }
    return model.annotationArray[idx].value;
  };

  //----------------------------------------------------------------------------
  publicAPI.getAnnotation = (idx) => {
    if (model.annotationArray[idx] === undefined) {
      return null;
    }
    return model.annotationArray[idx].annotation;
  };

  //----------------------------------------------------------------------------
  publicAPI.getAnnotatedValueIndex = (val) =>
    model.annotationArray.length ? publicAPI.checkForAnnotatedValue(val) : -1;

  //----------------------------------------------------------------------------
  publicAPI.removeAnnotation = (value) => {
    const i = publicAPI.checkForAnnotatedValue(value);
    const needToRemove = i >= 0;
    if (needToRemove) {
      model.annotationArray.splice(i, 1);
      publicAPI.updateAnnotatedValueMap();
      publicAPI.modified();
    }
    return needToRemove;
  };

  //----------------------------------------------------------------------------
  publicAPI.resetAnnotations = () => {
    model.annotationArray = [];
    model.annotatedValueMap = [];
    publicAPI.modified();
  };

  //----------------------------------------------------------------------------
  publicAPI.getAnnotationColor = (val, rgba) => {
    if (model.indexedLookup) {
      const i = publicAPI.getAnnotatedValueIndex(val);
      publicAPI.getIndexedColor(i, rgba);
    } else {
      publicAPI.getColor(parseFloat(val), rgba);
      rgba[3] = 1.0;
    }
  };

  //----------------------------------------------------------------------------
  publicAPI.checkForAnnotatedValue = (value) =>
    publicAPI.getAnnotatedValueIndexInternal(value);

  //----------------------------------------------------------------------------
  // An unsafe version of vtkScalarsToColors::CheckForAnnotatedValue for
  // internal use (no pointer checks performed)
  publicAPI.getAnnotatedValueIndexInternal = (value) => {
    if (model.annotatedValueMap[value] !== undefined) {
      const na = model.annotationArray.length;
      return model.annotatedValueMap[value] % na;
    }
    // Treat as a NaN
    return -1;
  };

  //----------------------------------------------------------------------------
  publicAPI.getIndexedColor = (val, rgba) => {
    rgba[0] = 0.0;
    rgba[1] = 0.0;
    rgba[2] = 0.0;
    rgba[3] = 0.0;
  };

  //----------------------------------------------------------------------------
  publicAPI.updateAnnotatedValueMap = () => {
    model.annotatedValueMap = [];

    const na = model.annotationArray.length;
    for (let i = 0; i < na; i++) {
      model.annotatedValueMap[model.annotationArray[i].value] = i;
    }
  };

  // Description:
  // Internal methods that map a data array into a 4-component,
  // unsigned char RGBA array. The color mode determines the behavior
  // of mapping. If ColorMode.DEFAULT is set, then unsigned char
  // data arrays are treated as colors (and converted to RGBA if
  // necessary); If ColorMode.DIRECT_SCALARS is set, then all arrays
  // are treated as colors (integer types are clamped in the range 0-255,
  // floating point arrays are clamped in the range 0.0-1.0. Note 'char' does
  // not have enough values to represent a color so mapping this type is
  // considered an error);
  // otherwise, the data is mapped through this instance
  // of ScalarsToColors. The component argument is used for data
  // arrays with more than one component; it indicates which component
  // to use to do the blending.  When the component argument is -1,
  // then the this object uses its own selected technique to change a
  // vector into a scalar to map.
  publicAPI.mapScalars = (scalars, colorMode, componentIn) => {
    const numberOfComponents = scalars.getNumberOfComponents();

    let newColors = null;

    // map scalars through lookup table only if needed
    if (
      (colorMode === ScalarsToColors_ColorMode.DEFAULT &&
        scalars.getDataType() === ScalarsToColors_VtkDataTypes.UNSIGNED_CHAR) ||
      (colorMode === ScalarsToColors_ColorMode.DIRECT_SCALARS && scalars)
    ) {
      newColors = publicAPI.convertToRGBA(
        scalars,
        numberOfComponents,
        scalars.getNumberOfTuples()
      );
    } else {
      const newscalars = {
        type: 'vtkDataArray',
        name: 'temp',
        numberOfComponents: 4,
        dataType: ScalarsToColors_VtkDataTypes.UNSIGNED_CHAR,
      };

      const s = macros.newTypedArray(
        newscalars.dataType,
        4 * scalars.getNumberOfTuples()
      );
      newscalars.values = s;
      newscalars.size = s.length;
      newColors = DataArray.newInstance(newscalars);

      let component = componentIn;

      // If mapper did not specify a component, use the VectorMode
      if (component < 0 && numberOfComponents > 1) {
        publicAPI.mapVectorsThroughTable(
          scalars,
          newColors,
          ScalarsToColors_ScalarMappingTarget.RGBA,
          -1,
          -1
        );
      } else {
        if (component < 0) {
          component = 0;
        }
        if (component >= numberOfComponents) {
          component = numberOfComponents - 1;
        }

        // Map the scalars to colors
        publicAPI.mapScalarsThroughTable(
          scalars,
          newColors,
          ScalarsToColors_ScalarMappingTarget.RGBA,
          component
        );
      }
    }

    return newColors;
  };

  publicAPI.mapVectorsToMagnitude = (input, output, compsToUse) => {
    const length = input.getNumberOfTuples();
    const inIncr = input.getNumberOfComponents();

    const outputV = output.getData();
    const inputV = input.getData();

    for (let i = 0; i < length; i++) {
      let sum = 0.0;
      for (let j = 0; j < compsToUse; j++) {
        sum += inputV[i * inIncr + j] * inputV[i * inIncr + j];
      }
      outputV[i] = Math.sqrt(sum);
    }
  };

  //----------------------------------------------------------------------------
  // Map a set of vector values through the table
  publicAPI.mapVectorsThroughTable = (
    input,
    output,
    outputFormat,
    vectorComponentIn,
    vectorSizeIn
  ) => {
    let vectorMode = publicAPI.getVectorMode();
    let vectorSize = vectorSizeIn;
    let vectorComponent = vectorComponentIn;
    const inComponents = input.getNumberOfComponents();

    if (vectorMode === ScalarsToColors_VectorMode.COMPONENT) {
      // make sure vectorComponent is within allowed range
      if (vectorComponent === -1) {
        // if set to -1, use default value provided by table
        vectorComponent = publicAPI.getVectorComponent();
      }
      if (vectorComponent < 0) {
        vectorComponent = 0;
      }
      if (vectorComponent >= inComponents) {
        vectorComponent = inComponents - 1;
      }
    } else {
      // make sure vectorSize is within allowed range
      if (vectorSize === -1) {
        // if set to -1, use default value provided by table
        vectorSize = publicAPI.getVectorSize();
      }
      if (vectorSize <= 0) {
        vectorComponent = 0;
        vectorSize = inComponents;
      } else {
        if (vectorComponent < 0) {
          vectorComponent = 0;
        }
        if (vectorComponent >= inComponents) {
          vectorComponent = inComponents - 1;
        }
        if (vectorComponent + vectorSize > inComponents) {
          vectorSize = inComponents - vectorComponent;
        }
      }

      if (
        vectorMode === ScalarsToColors_VectorMode.MAGNITUDE &&
        (inComponents === 1 || vectorSize === 1)
      ) {
        vectorMode = ScalarsToColors_VectorMode.COMPONENT;
      }
    }

    // increment input pointer to the first component to map
    let inputOffset = 0;
    if (vectorComponent > 0) {
      inputOffset = vectorComponent;
    }

    // map according to the current vector mode
    switch (vectorMode) {
      case ScalarsToColors_VectorMode.COMPONENT: {
        publicAPI.mapScalarsThroughTable(
          input,
          output,
          outputFormat,
          inputOffset
        );
        break;
      }

      default:
      case ScalarsToColors_VectorMode.MAGNITUDE: {
        const magValues = DataArray.newInstance({
          numberOfComponents: 1,
          values: new Float32Array(input.getNumberOfTuples()),
        });

        publicAPI.mapVectorsToMagnitude(input, magValues, vectorSize);
        publicAPI.mapScalarsThroughTable(magValues, output, outputFormat, 0);
        break;
      }

      case ScalarsToColors_VectorMode.RGBCOLORS: {
        // publicAPI.mapColorsToColors(
        //   input, output, inComponents, vectorSize,
        //   outputFormat);
        break;
      }
    }
  };

  publicAPI.luminanceToRGBA = (newColors, colors, alpha, convtFun) => {
    const a = convtFun(alpha);

    const values = colors.getData();
    const newValues = newColors.getData();
    const size = values.length;
    const component = 0;
    const tuple = 1;

    let count = 0;
    for (let i = component; i < size; i += tuple) {
      const l = convtFun(values[i]);
      newValues[count * 4] = l;
      newValues[count * 4 + 1] = l;
      newValues[count * 4 + 2] = l;
      newValues[count * 4 + 3] = a;
      count++;
    }
  };

  publicAPI.luminanceAlphaToRGBA = (newColors, colors, alpha, convtFun) => {
    const values = colors.getData();
    const newValues = newColors.getData();
    const size = values.length;
    const component = 0;
    const tuple = 2;

    let count = 0;
    for (let i = component; i < size; i += tuple) {
      const l = convtFun(values[i]);
      newValues[count] = l;
      newValues[count + 1] = l;
      newValues[count + 2] = l;
      newValues[count + 3] = convtFun(values[i + 1]) * alpha;
      count += 4;
    }
  };

  publicAPI.rGBToRGBA = (newColors, colors, alpha, convtFun) => {
    const a = floatColorToUChar(alpha);

    const values = colors.getData();
    const newValues = newColors.getData();
    const size = values.length;
    const component = 0;
    const tuple = 3;

    let count = 0;
    for (let i = component; i < size; i += tuple) {
      newValues[count * 4] = convtFun(values[i]);
      newValues[count * 4 + 1] = convtFun(values[i + 1]);
      newValues[count * 4 + 2] = convtFun(values[i + 2]);
      newValues[count * 4 + 3] = a;
      count++;
    }
  };

  publicAPI.rGBAToRGBA = (newColors, colors, alpha, convtFun) => {
    const values = colors.getData();
    const newValues = newColors.getData();
    const size = values.length;
    const component = 0;
    const tuple = 4;

    let count = 0;
    for (let i = component; i < size; i += tuple) {
      newValues[count * 4] = convtFun(values[i]);
      newValues[count * 4 + 1] = convtFun(values[i + 1]);
      newValues[count * 4 + 2] = convtFun(values[i + 2]);
      newValues[count * 4 + 3] = convtFun(values[i + 3]) * alpha;
      count++;
    }
  };

  //----------------------------------------------------------------------------
  publicAPI.convertToRGBA = (colors, numComp, numTuples) => {
    let { alpha } = model;
    if (
      numComp === 4 &&
      alpha >= 1.0 &&
      colors.getDataType() === ScalarsToColors_VtkDataTypes.UNSIGNED_CHAR
    ) {
      return colors;
    }

    const newColors = DataArray.newInstance({
      numberOfComponents: 4,
      empty: true,
      size: 4 * numTuples,
      dataType: ScalarsToColors_VtkDataTypes.UNSIGNED_CHAR,
    });

    if (numTuples <= 0) {
      return newColors;
    }

    alpha = alpha > 0 ? alpha : 0;
    alpha = alpha < 1 ? alpha : 1;

    let convtFun = intColorToUChar;
    if (
      colors.getDataType() === ScalarsToColors_VtkDataTypes.FLOAT ||
      colors.getDataType() === ScalarsToColors_VtkDataTypes.DOUBLE
    ) {
      convtFun = floatColorToUChar;
    }

    switch (numComp) {
      case 1:
        publicAPI.luminanceToRGBA(newColors, colors, alpha, convtFun);
        break;

      case 2:
        publicAPI.luminanceAlphaToRGBA(newColors, colors, convtFun);
        break;

      case 3:
        publicAPI.rGBToRGBA(newColors, colors, alpha, convtFun);
        break;

      case 4:
        publicAPI.rGBAToRGBA(newColors, colors, alpha, convtFun);
        break;

      default:
        ScalarsToColors_vtkErrorMacro('Cannot convert colors');
        return null;
    }

    return newColors;
  };

  publicAPI.usingLogScale = () => false;

  publicAPI.getNumberOfAvailableColors = () => 256 * 256 * 256;

  publicAPI.setRange = (min, max) => publicAPI.setMappingRange(min, max);
  publicAPI.getRange = (min, max) => publicAPI.getMappingRange();
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

const ScalarsToColors_DEFAULT_VALUES = {
  alpha: 1.0,
  vectorComponent: 0,
  vectorSize: -1,
  vectorMode: ScalarsToColors_VectorMode.COMPONENT,
  mappingRange: null,
  annotationArray: null,
  annotatedValueMap: null,
  indexedLookup: false,
};

// ----------------------------------------------------------------------------

function ScalarsToColors_extend(publicAPI, model, initialValues = {}) {
  Object.assign(model, ScalarsToColors_DEFAULT_VALUES, initialValues);

  // Object methods
  macros.obj(publicAPI, model);

  model.mappingRange = [0, 255];
  model.annotationArray = [];
  model.annotatedValueMap = [];

  // Create get-set macros
  macros.setGet(publicAPI, model, [
    'vectorSize',
    'vectorComponent',
    'vectorMode',
    'alpha',
    'indexedLookup',
  ]);

  // Create set macros for array (needs to know size)
  macros.setArray(publicAPI, model, ['mappingRange'], 2);

  // Create get macros for array
  macros.getArray(publicAPI, model, ['mappingRange']);

  // For more macro methods, see "Sources/macros.js"

  // Object specific methods
  vtkScalarsToColors(publicAPI, model);
}

// ----------------------------------------------------------------------------

const ScalarsToColors_newInstance = macros.newInstance(ScalarsToColors_extend, 'vtkScalarsToColors');

// ----------------------------------------------------------------------------

/* harmony default export */ var ScalarsToColors = ({ newInstance: ScalarsToColors_newInstance, extend: ScalarsToColors_extend, ...ScalarsToColors_Constants });

// CONCATENATED MODULE: ./node_modules/vtk.js/Sources/Rendering/Core/ColorTransferFunction/Constants.js
const ColorSpace = {
  RGB: 0,
  HSV: 1,
  LAB: 2,
  DIVERGING: 3,
};

const Scale = {
  LINEAR: 0,
  LOG10: 1,
};

/* harmony default export */ var ColorTransferFunction_Constants = ({
  ColorSpace,
  Scale,
});

// CONCATENATED MODULE: ./node_modules/vtk.js/Sources/Rendering/Core/ColorTransferFunction/index.js





const { ColorSpace: ColorTransferFunction_ColorSpace, Scale: ColorTransferFunction_Scale } = ColorTransferFunction_Constants;
const { ScalarMappingTarget: ColorTransferFunction_ScalarMappingTarget } = ScalarsToColors;
const { vtkDebugMacro: ColorTransferFunction_vtkDebugMacro, vtkErrorMacro: ColorTransferFunction_vtkErrorMacro, vtkWarningMacro: ColorTransferFunction_vtkWarningMacro } = macros;

// ----------------------------------------------------------------------------
// Global methods
// ----------------------------------------------------------------------------
/* eslint-disable no-continue                                                */

// Convert to and from a special polar version of CIELAB (useful for creating
// continuous diverging color maps).
function vtkColorTransferFunctionLabToMsh(lab, msh) {
  const L = lab[0];
  const a = lab[1];
  const b = lab[2];
  const M = Math.sqrt(L * L + a * a + b * b);
  const s = M > 0.001 ? Math.acos(L / M) : 0.0;
  const h = s > 0.001 ? Math.atan2(b, a) : 0.0;
  msh[0] = M;
  msh[1] = s;
  msh[2] = h;
}

function vtkColorTransferFunctionMshToLab(msh, lab) {
  const M = msh[0];
  const s = msh[1];
  const h = msh[2];

  lab[0] = M * Math.cos(s);
  lab[1] = M * Math.sin(s) * Math.cos(h);
  lab[2] = M * Math.sin(s) * Math.sin(h);
}

// For the case when interpolating from a saturated color to an unsaturated
// color, find a hue for the unsaturated color that makes sense.
function vtkColorTransferFunctionAdjustHue(msh, unsatM) {
  if (msh[0] >= unsatM - 0.1) {
    // The best we can do is hold hue constant.
    return msh[2];
  }

  // This equation is designed to make the perceptual change of the
  // interpolation to be close to constant.
  const hueSpin =
    (msh[1] * Math.sqrt(unsatM * unsatM - msh[0] * msh[0])) /
    (msh[0] * Math.sin(msh[1]));
  // Spin hue away from 0 except in purple hues.
  if (msh[2] > -0.3 * Math.PI) {
    return msh[2] + hueSpin;
  }

  return msh[2] - hueSpin;
}

function vtkColorTransferFunctionAngleDiff(a1, a2) {
  let adiff = a1 - a2;
  if (adiff < 0.0) {
    adiff = -adiff;
  }
  while (adiff >= 2.0 * Math.PI) {
    adiff -= 2.0 * Math.PI;
  }
  if (adiff > Math.PI) {
    adiff = 2.0 * Math.PI - adiff;
  }
  return adiff;
}

// Interpolate a diverging color map.
function vtkColorTransferFunctionInterpolateDiverging(s, rgb1, rgb2, result) {
  const lab1 = [];
  const lab2 = [];
  rgb2lab(rgb1, lab1);
  rgb2lab(rgb2, lab2);

  const msh1 = [];
  const msh2 = [];
  vtkColorTransferFunctionLabToMsh(lab1, msh1);
  vtkColorTransferFunctionLabToMsh(lab2, msh2);

  // If the endpoints are distinct saturated colors, then place white in between
  // them.
  let localS = s;
  if (
    msh1[1] > 0.05 &&
    msh2[1] > 0.05 &&
    vtkColorTransferFunctionAngleDiff(msh1[2], msh2[2]) > 0.33 * Math.PI
  ) {
    // Insert the white midpoint by setting one end to white and adjusting the
    // scalar value.
    let Mmid = Math.max(msh1[0], msh2[0]);
    Mmid = Math.max(88.0, Mmid);
    if (s < 0.5) {
      msh2[0] = Mmid;
      msh2[1] = 0.0;
      msh2[2] = 0.0;
      localS *= 2.0;
    } else {
      msh1[0] = Mmid;
      msh1[1] = 0.0;
      msh1[2] = 0.0;
      localS = 2.0 * localS - 1.0;
    }
  }

  // If one color has no saturation, then its hue value is invalid.  In this
  // case, we want to set it to something logical so that the interpolation of
  // hue makes sense.
  if (msh1[1] < 0.05 && msh2[1] > 0.05) {
    msh1[2] = vtkColorTransferFunctionAdjustHue(msh2, msh1[0]);
  } else if (msh2[1] < 0.05 && msh1[1] > 0.05) {
    msh2[2] = vtkColorTransferFunctionAdjustHue(msh1, msh2[0]);
  }

  const mshTmp = [];
  mshTmp[0] = (1 - localS) * msh1[0] + localS * msh2[0];
  mshTmp[1] = (1 - localS) * msh1[1] + localS * msh2[1];
  mshTmp[2] = (1 - localS) * msh1[2] + localS * msh2[2];

  // Now convert back to RGB
  const labTmp = [];
  vtkColorTransferFunctionMshToLab(mshTmp, labTmp);
  lab2rgb(labTmp, result);
}

// ----------------------------------------------------------------------------
// vtkColorTransferFunction methods
// ----------------------------------------------------------------------------

function vtkColorTransferFunction(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkColorTransferFunction');

  // Return the number of points which specify this function
  publicAPI.getSize = () => model.nodes.length;

  //----------------------------------------------------------------------------
  // Add a point defined in RGB
  publicAPI.addRGBPoint = (x, r, g, b) =>
    publicAPI.addRGBPointLong(x, r, g, b, 0.5, 0.0);

  //----------------------------------------------------------------------------
  // Add a point defined in RGB
  publicAPI.addRGBPointLong = (x, r, g, b, midpoint = 0.5, sharpness = 0.0) => {
    // Error check
    if (midpoint < 0.0 || midpoint > 1.0) {
      ColorTransferFunction_vtkErrorMacro('Midpoint outside range [0.0, 1.0]');
      return -1;
    }

    if (sharpness < 0.0 || sharpness > 1.0) {
      ColorTransferFunction_vtkErrorMacro('Sharpness outside range [0.0, 1.0]');
      return -1;
    }

    // remove any node already at this X location
    if (!model.allowDuplicateScalars) {
      publicAPI.removePoint(x);
    }

    // Create the new node
    const node = { x, r, g, b, midpoint, sharpness };

    // Add it, then sort to get everything in order
    model.nodes.push(node);
    publicAPI.sortAndUpdateRange();

    // We need to find the index of the node we just added in order
    // to return this value
    let i = 0;
    for (; i < model.nodes.length; i++) {
      if (model.nodes[i].x === x) {
        break;
      }
    }

    // If we didn't find it, something went horribly wrong so
    // return -1
    if (i < model.nodes.length) {
      return i;
    }

    return -1;
  };

  //----------------------------------------------------------------------------
  // Add a point defined in HSV
  publicAPI.addHSVPoint = (x, h, s, v) =>
    publicAPI.addHSVPointLong(x, h, s, v, 0.5, 0.0);

  //----------------------------------------------------------------------------
  // Add a point defined in HSV
  publicAPI.addHSVPointLong = (x, h, s, v, midpoint = 0.5, sharpness = 0.0) => {
    const rgb = [];
    const hsv = [h, s, v];

    hsv2rgb(hsv, rgb);
    return publicAPI.addRGBPoint(
      x,
      rgb[0],
      rgb[1],
      rgb[2],
      midpoint,
      sharpness
    );
  };

  //----------------------------------------------------------------------------
  // Set nodes directly
  publicAPI.setNodes = (nodes) => {
    if (model.nodes !== nodes) {
      model.nodes = nodes;
      publicAPI.sortAndUpdateRange();
    }
  };

  //----------------------------------------------------------------------------
  // Sort the vector in increasing order, then fill in
  // the Range
  publicAPI.sortAndUpdateRange = () => {
    model.nodes.sort((a, b) => a.x - b.x);

    const modifiedInvoked = publicAPI.updateRange();
    // If range is updated, Modified() has been called, don't call it again.
    if (!modifiedInvoked) {
      publicAPI.modified();
    }
  };

  //----------------------------------------------------------------------------
  publicAPI.updateRange = () => {
    const oldRange = [2];
    oldRange[0] = model.mappingRange[0];
    oldRange[1] = model.mappingRange[1];

    const size = model.nodes.length;
    if (size) {
      model.mappingRange[0] = model.nodes[0].x;
      model.mappingRange[1] = model.nodes[size - 1].x;
    } else {
      model.mappingRange[0] = 0;
      model.mappingRange[1] = 0;
    }

    // If the range is the same, then no need to call Modified()
    if (
      oldRange[0] === model.mappingRange[0] &&
      oldRange[1] === model.mappingRange[1]
    ) {
      return false;
    }

    publicAPI.modified();
    return true;
  };

  //----------------------------------------------------------------------------
  // Remove a point
  publicAPI.removePoint = (x) => {
    // First find the node since we need to know its
    // index as our return value
    let i = 0;
    for (; i < model.nodes.length; i++) {
      if (model.nodes[i].x === x) {
        break;
      }
    }

    const retVal = i;

    // If the node doesn't exist, we return -1
    if (i >= model.nodes.length) {
      return -1;
    }

    // If the first or last point has been removed, then we update the range
    // No need to sort here as the order of points hasn't changed.
    let modifiedInvoked = false;
    model.nodes.splice(i, 1);
    if (i === 0 || i === model.nodes.length) {
      modifiedInvoked = publicAPI.updateRange();
    }
    if (!modifiedInvoked) {
      publicAPI.modified();
    }

    return retVal;
  };

  //----------------------------------------------------------------------------
  publicAPI.movePoint = (oldX, newX) => {
    if (oldX === newX) {
      // Nothing to do.
      return;
    }

    publicAPI.removePoint(newX);
    for (let i = 0; i < model.nodes.length; i++) {
      if (model.nodes[i].x === oldX) {
        model.nodes[i].x = newX;
        publicAPI.sortAndUpdateRange();
        break;
      }
    }
  };

  //----------------------------------------------------------------------------
  // Remove all points
  publicAPI.removeAllPoints = () => {
    model.nodes = [];
    publicAPI.sortAndUpdateRange();
  };

  //----------------------------------------------------------------------------
  // Add a line defined in RGB
  publicAPI.addRGBSegment = (x1, r1, g1, b1, x2, r2, g2, b2) => {
    // First, find all points in this range and remove them
    publicAPI.sortAndUpdateRange();
    for (let i = 0; i < model.nodes.length; ) {
      if (model.nodes[i].x >= x1 && model.nodes[i].x <= x2) {
        model.nodes.splice(i, 1);
      } else {
        i++;
      }
    }

    // Now add the points
    publicAPI.addRGBPointLong(x1, r1, g1, b1, 0.5, 0.0);
    publicAPI.addRGBPointLong(x2, r2, g2, b2, 0.5, 0.0);
    publicAPI.modified();
  };

  //----------------------------------------------------------------------------
  // Add a line defined in HSV
  publicAPI.addHSVSegment = (x1, h1, s1, v1, x2, h2, s2, v2) => {
    const hsv1 = [h1, s1, v1];
    const hsv2 = [h2, s2, v2];
    const rgb1 = [];
    const rgb2 = [];

    hsv2rgb(hsv1, rgb1);
    hsv2rgb(hsv2, rgb2);
    publicAPI.addRGBSegment(
      x1,
      rgb1[0],
      rgb1[1],
      rgb1[2],
      x2,
      rgb2[0],
      rgb2[1],
      rgb2[2]
    );
  };

  //----------------------------------------------------------------------------
  // Returns the RGBA color evaluated at the specified location
  publicAPI.mapValue = (x) => {
    const rgb = [];
    publicAPI.getColor(x, rgb);

    return [
      Math.floor(255.0 * rgb[0] + 0.5),
      Math.floor(255.0 * rgb[1] + 0.5),
      Math.floor(255.0 * rgb[2] + 0.5),
      255,
    ];
  };

  //----------------------------------------------------------------------------
  // Returns the RGB color evaluated at the specified location
  publicAPI.getColor = (x, rgb) => {
    if (model.indexedLookup) {
      const numNodes = publicAPI.getSize();
      // todo
      const idx = publicAPI.getAnnotatedValueIndexInternal(x);
      if (idx < 0 || numNodes === 0) {
        publicAPI.getNanColor(rgb);
      } else {
        const nodeVal = [];
        publicAPI.getNodeValue(idx % numNodes, nodeVal);
        rgb[0] = nodeVal.r;
        rgb[1] = nodeVal.g;
        rgb[2] = nodeVal.b;
      }
      return;
    }
    publicAPI.getTable(x, x, 1, rgb);
  };

  //----------------------------------------------------------------------------
  // Returns the red color evaluated at the specified location
  publicAPI.getRedValue = (x) => {
    const rgb = [];
    publicAPI.getColor(x, rgb);
    return rgb[0];
  };

  //----------------------------------------------------------------------------
  // Returns the green color evaluated at the specified location
  publicAPI.getGreenValue = (x) => {
    const rgb = [];
    publicAPI.getColor(x, rgb);
    return rgb[1];
  };

  //----------------------------------------------------------------------------
  // Returns the blue color evaluated at the specified location
  publicAPI.getBlueValue = (x) => {
    const rgb = [];
    publicAPI.getColor(x, rgb);
    return rgb[2];
  };

  //----------------------------------------------------------------------------
  // Returns a table of RGB colors at regular intervals along the function
  publicAPI.getTable = (xStart, xEnd, size, table) => {
    // Special case: If either the start or end is a NaN, then all any
    // interpolation done on them is also a NaN.  Therefore, fill the table with
    // the NaN color.
    if (isNan(xStart) || isNan(xEnd)) {
      for (let i = 0; i < size; i++) {
        table[i * 3 + 0] = model.nanColor[0];
        table[i * 3 + 1] = model.nanColor[1];
        table[i * 3 + 2] = model.nanColor[2];
      }
      return;
    }

    let idx = 0;
    const numNodes = model.nodes.length;

    // Need to keep track of the last value so that
    // we can fill in table locations past this with
    // this value if Clamping is On.
    let lastR = 0.0;
    let lastG = 0.0;
    let lastB = 0.0;
    if (numNodes !== 0) {
      lastR = model.nodes[numNodes - 1].r;
      lastG = model.nodes[numNodes - 1].g;
      lastB = model.nodes[numNodes - 1].b;
    }

    let x = 0.0;
    let x1 = 0.0;
    let x2 = 0.0;
    const rgb1 = [0.0, 0.0, 0.0];
    const rgb2 = [0.0, 0.0, 0.0];
    let midpoint = 0.0;
    let sharpness = 0.0;

    const tmpVec = [];

    // If the scale is logarithmic, make sure the range is valid.
    let usingLogScale = model.scale === ColorTransferFunction_Scale.LOG10;
    if (usingLogScale) {
      // Note: This requires range[0] <= range[1].
      usingLogScale = model.mappingRange[0] > 0.0;
    }

    let logStart = 0.0;
    let logEnd = 0.0;
    let logX = 0.0;
    if (usingLogScale) {
      logStart = Math.log10(xStart);
      logEnd = Math.log10(xEnd);
    }

    // For each table entry
    for (let i = 0; i < size; i++) {
      // Find our location in the table
      const tidx = 3 * i;

      // Find our X location. If we are taking only 1 sample, make
      // it halfway between start and end (usually start and end will
      // be the same in this case)
      if (size > 1) {
        if (usingLogScale) {
          logX = logStart + (i / (size - 1.0)) * (logEnd - logStart);
          x = 10.0 ** logX;
        } else {
          x = xStart + (i / (size - 1.0)) * (xEnd - xStart);
        }
      } else if (usingLogScale) {
        logX = 0.5 * (logStart + logEnd);
        x = 10.0 ** logX;
      } else {
        x = 0.5 * (xStart + xEnd);
      }

      // Linearly map x from mappingRange to [0, numberOfValues-1],
      // discretize (round down to the closest integer),
      // then map back to mappingRange
      if (model.discretize) {
        const range = model.mappingRange;
        if (x >= range[0] && x <= range[1]) {
          const numberOfValues = model.numberOfValues;
          const deltaRange = range[1] - range[0];
          if (numberOfValues <= 1) {
            x = range[0] + deltaRange / 2.0;
          } else {
            // normalize x
            const xn = (x - range[0]) / deltaRange;
            // discretize
            const discretizeIndex = floor(numberOfValues * xn);
            // get discretized x
            x =
              range[0] + (discretizeIndex / (numberOfValues - 1)) * deltaRange;
          }
        }
      }

      // Do we need to move to the next node?
      while (idx < numNodes && x > model.nodes[idx].x) {
        idx++;
        // If we are at a valid point index, fill in
        // the value at this node, and the one before (the
        // two that surround our current sample location)
        // idx cannot be 0 since we just incremented it.
        if (idx < numNodes) {
          x1 = model.nodes[idx - 1].x;
          x2 = model.nodes[idx].x;
          if (usingLogScale) {
            x1 = Math.log10(x1);
            x2 = Math.log10(x2);
          }

          rgb1[0] = model.nodes[idx - 1].r;
          rgb2[0] = model.nodes[idx].r;

          rgb1[1] = model.nodes[idx - 1].g;
          rgb2[1] = model.nodes[idx].g;

          rgb1[2] = model.nodes[idx - 1].b;
          rgb2[2] = model.nodes[idx].b;

          // We only need the previous midpoint and sharpness
          // since these control this region
          midpoint = model.nodes[idx - 1].midpoint;
          sharpness = model.nodes[idx - 1].sharpness;

          // Move midpoint away from extreme ends of range to avoid
          // degenerate math
          if (midpoint < 0.00001) {
            midpoint = 0.00001;
          }

          if (midpoint > 0.99999) {
            midpoint = 0.99999;
          }
        }
      }

      // Are we at or past the end? If so, just use the last value
      if (x > model.mappingRange[1]) {
        table[tidx] = 0.0;
        table[tidx + 1] = 0.0;
        table[tidx + 2] = 0.0;
        if (model.clamping) {
          if (publicAPI.getUseAboveRangeColor()) {
            table[tidx] = model.aboveRangeColor[0];
            table[tidx + 1] = model.aboveRangeColor[1];
            table[tidx + 2] = model.aboveRangeColor[2];
          } else {
            table[tidx] = lastR;
            table[tidx + 1] = lastG;
            table[tidx + 2] = lastB;
          }
        }
      } else if (x < model.mappingRange[0] || (isInf(x) && x < 0)) {
        // we are before the first node? If so, duplicate this node's values.
        // We have to deal with -inf here
        table[tidx] = 0.0;
        table[tidx + 1] = 0.0;
        table[tidx + 2] = 0.0;
        if (model.clamping) {
          if (publicAPI.getUseBelowRangeColor()) {
            table[tidx] = model.belowRangeColor[0];
            table[tidx + 1] = model.belowRangeColor[1];
            table[tidx + 2] = model.belowRangeColor[2];
          } else if (numNodes > 0) {
            table[tidx] = model.nodes[0].r;
            table[tidx + 1] = model.nodes[0].g;
            table[tidx + 2] = model.nodes[0].b;
          }
        }
      } else if (
        idx === 0 &&
        (Math.abs(x - xStart) < 1e-6 || model.discretize)
      ) {
        if (numNodes > 0) {
          table[tidx] = model.nodes[0].r;
          table[tidx + 1] = model.nodes[0].g;
          table[tidx + 2] = model.nodes[0].b;
        } else {
          table[tidx] = 0.0;
          table[tidx + 1] = 0.0;
          table[tidx + 2] = 0.0;
        }
      } else {
        // OK, we are between two nodes - interpolate
        // Our first attempt at a normalized location [0,1] -
        // we will be modifying this based on midpoint and
        // sharpness to get the curve shape we want and to have
        // it pass through (y1+y2)/2 at the midpoint.
        let s = 0.0;
        if (usingLogScale) {
          s = (logX - x1) / (x2 - x1);
        } else {
          s = (x - x1) / (x2 - x1);
        }

        // Readjust based on the midpoint - linear adjustment
        if (s < midpoint) {
          s = (0.5 * s) / midpoint;
        } else {
          s = 0.5 + (0.5 * (s - midpoint)) / (1.0 - midpoint);
        }

        // override for sharpness > 0.99
        // In this case we just want piecewise constant
        if (sharpness > 0.99) {
          // Use the first value since we are below the midpoint
          if (s < 0.5) {
            table[tidx] = rgb1[0];
            table[tidx + 1] = rgb1[1];
            table[tidx + 2] = rgb1[2];
            continue;
          } else {
            // Use the second value at or above the midpoint
            table[tidx] = rgb2[0];
            table[tidx + 1] = rgb2[1];
            table[tidx + 2] = rgb2[2];
            continue;
          }
        }

        // Override for sharpness < 0.01
        // In this case we want piecewise linear
        if (sharpness < 0.01) {
          // Simple linear interpolation
          if (model.colorSpace === ColorTransferFunction_ColorSpace.RGB) {
            table[tidx] = (1 - s) * rgb1[0] + s * rgb2[0];
            table[tidx + 1] = (1 - s) * rgb1[1] + s * rgb2[1];
            table[tidx + 2] = (1 - s) * rgb1[2] + s * rgb2[2];
          } else if (model.colorSpace === ColorTransferFunction_ColorSpace.HSV) {
            const hsv1 = [];
            const hsv2 = [];
            rgb2hsv(rgb1, hsv1);
            rgb2hsv(rgb2, hsv2);

            if (
              model.hSVWrap &&
              (hsv1[0] - hsv2[0] > 0.5 || hsv2[0] - hsv1[0] > 0.5)
            ) {
              if (hsv1[0] > hsv2[0]) {
                hsv1[0] -= 1.0;
              } else {
                hsv2[0] -= 1.0;
              }
            }

            const hsvTmp = [];
            hsvTmp[0] = (1.0 - s) * hsv1[0] + s * hsv2[0];
            if (hsvTmp[0] < 0.0) {
              hsvTmp[0] += 1.0;
            }
            hsvTmp[1] = (1.0 - s) * hsv1[1] + s * hsv2[1];
            hsvTmp[2] = (1.0 - s) * hsv1[2] + s * hsv2[2];

            // Now convert this back to RGB
            hsv2rgb(hsvTmp, tmpVec);
            table[tidx] = tmpVec[0];
            table[tidx + 1] = tmpVec[1];
            table[tidx + 2] = tmpVec[2];
          } else if (model.colorSpace === ColorTransferFunction_ColorSpace.LAB) {
            const lab1 = [];
            const lab2 = [];
            rgb2lab(rgb1, lab1);
            rgb2lab(rgb2, lab2);

            const labTmp = [];
            labTmp[0] = (1 - s) * lab1[0] + s * lab2[0];
            labTmp[1] = (1 - s) * lab1[1] + s * lab2[1];
            labTmp[2] = (1 - s) * lab1[2] + s * lab2[2];

            // Now convert back to RGB
            lab2rgb(labTmp, tmpVec);
            table[tidx] = tmpVec[0];
            table[tidx + 1] = tmpVec[1];
            table[tidx + 2] = tmpVec[2];
          } else if (model.colorSpace === ColorTransferFunction_ColorSpace.DIVERGING) {
            vtkColorTransferFunctionInterpolateDiverging(s, rgb1, rgb2, tmpVec);
            table[tidx] = tmpVec[0];
            table[tidx + 1] = tmpVec[1];
            table[tidx + 2] = tmpVec[2];
          } else {
            ColorTransferFunction_vtkErrorMacro('ColorSpace set to invalid value.', model.colorSpace);
          }
          continue;
        }

        // We have a sharpness between [0.01, 0.99] - we will
        // used a modified hermite curve interpolation where we
        // derive the slope based on the sharpness, and we compress
        // the curve non-linearly based on the sharpness

        // First, we will adjust our position based on sharpness in
        // order to make the curve sharper (closer to piecewise constant)
        if (s < 0.5) {
          s = 0.5 * (s * 2.0) ** (1.0 + 10.0 * sharpness);
        } else if (s > 0.5) {
          s = 1.0 - 0.5 * ((1.0 - s) * 2) ** (1 + 10.0 * sharpness);
        }

        // Compute some coefficients we will need for the hermite curve
        const ss = s * s;
        const sss = ss * s;

        const h1 = 2.0 * sss - 3 * ss + 1;
        const h2 = -2 * sss + 3 * ss;
        const h3 = sss - 2 * ss + s;
        const h4 = sss - ss;

        let slope;
        let t;

        if (model.colorSpace === ColorTransferFunction_ColorSpace.RGB) {
          for (let j = 0; j < 3; j++) {
            // Use one slope for both end points
            slope = rgb2[j] - rgb1[j];
            t = (1.0 - sharpness) * slope;

            // Compute the value
            table[tidx + j] = h1 * rgb1[j] + h2 * rgb2[j] + h3 * t + h4 * t;
          }
        } else if (model.colorSpace === ColorTransferFunction_ColorSpace.HSV) {
          const hsv1 = [];
          const hsv2 = [];
          rgb2hsv(rgb1, hsv1);
          rgb2hsv(rgb2, hsv2);

          if (
            model.hSVWrap &&
            (hsv1[0] - hsv2[0] > 0.5 || hsv2[0] - hsv1[0] > 0.5)
          ) {
            if (hsv1[0] > hsv2[0]) {
              hsv1[0] -= 1.0;
            } else {
              hsv2[0] -= 1.0;
            }
          }

          const hsvTmp = [];

          for (let j = 0; j < 3; j++) {
            // Use one slope for both end points
            slope = hsv2[j] - hsv1[j];
            t = (1.0 - sharpness) * slope;

            // Compute the value
            hsvTmp[j] = h1 * hsv1[j] + h2 * hsv2[j] + h3 * t + h4 * t;
            if (j === 0 && hsvTmp[j] < 0.0) {
              hsvTmp[j] += 1.0;
            }
          }
          // Now convert this back to RGB
          hsv2rgb(hsvTmp, tmpVec);
          table[tidx] = tmpVec[0];
          table[tidx + 1] = tmpVec[1];
          table[tidx + 2] = tmpVec[2];
        } else if (model.colorSpace === ColorTransferFunction_ColorSpace.LAB) {
          const lab1 = [];
          const lab2 = [];
          rgb2lab(rgb1, lab1);
          rgb2lab(rgb2, lab2);

          const labTmp = [];
          for (let j = 0; j < 3; j++) {
            // Use one slope for both end points
            slope = lab2[j] - lab1[j];
            t = (1.0 - sharpness) * slope;

            // Compute the value
            labTmp[j] = h1 * lab1[j] + h2 * lab2[j] + h3 * t + h4 * t;
          }
          // Now convert this back to RGB
          lab2rgb(labTmp, tmpVec);
          table[tidx] = tmpVec[0];
          table[tidx + 1] = tmpVec[1];
          table[tidx + 2] = tmpVec[2];
        } else if (model.colorSpace === ColorTransferFunction_ColorSpace.DIVERGING) {
          // I have not implemented proper interpolation by a hermite curve for
          // the diverging color map, but I cannot think of a good use case for
          // that anyway.
          vtkColorTransferFunctionInterpolateDiverging(s, rgb1, rgb2, tmpVec);
          table[tidx] = tmpVec[0];
          table[tidx + 1] = tmpVec[1];
          table[tidx + 2] = tmpVec[2];
        } else {
          ColorTransferFunction_vtkErrorMacro('ColorSpace set to invalid value.');
        }

        // Final error check to make sure we don't go outside [0,1]
        for (let j = 0; j < 3; j++) {
          table[tidx + j] = table[tidx + j] < 0.0 ? 0.0 : table[tidx + j];
          table[tidx + j] = table[tidx + j] > 1.0 ? 1.0 : table[tidx + j];
        }
      }
    }
  };

  //----------------------------------------------------------------------------
  publicAPI.getUint8Table = (xStart, xEnd, size, withAlpha = false) => {
    if (
      publicAPI.getMTime() <= model.buildTime &&
      model.tableSize === size &&
      model.tableWithAlpha !== withAlpha
    ) {
      return model.table;
    }

    if (model.nodes.length === 0) {
      ColorTransferFunction_vtkErrorMacro(
        'Attempting to lookup a value with no points in the function'
      );
      return model.table;
    }

    const nbChannels = withAlpha ? 4 : 3;
    if (model.tableSize !== size || model.tableWithAlpha !== withAlpha) {
      model.table = new Uint8Array(size * nbChannels);
      model.tableSize = size;
      model.tableWithAlpha = withAlpha;
    }

    const tmpTable = [];
    publicAPI.getTable(xStart, xEnd, size, tmpTable);

    for (let i = 0; i < size; i++) {
      model.table[i * nbChannels + 0] = Math.floor(
        tmpTable[i * 3 + 0] * 255.0 + 0.5
      );
      model.table[i * nbChannels + 1] = Math.floor(
        tmpTable[i * 3 + 1] * 255.0 + 0.5
      );
      model.table[i * nbChannels + 2] = Math.floor(
        tmpTable[i * 3 + 2] * 255.0 + 0.5
      );
      if (withAlpha) {
        model.table[i * nbChannels + 3] = 255;
      }
    }

    model.buildTime.modified();
    return model.table;
  };

  //----------------------------------------------------------------------------
  publicAPI.buildFunctionFromTable = (xStart, xEnd, size, table) => {
    let inc = 0.0;

    publicAPI.removeAllPoints();

    if (size > 1) {
      inc = (xEnd - xStart) / (size - 1.0);
    }

    for (let i = 0; i < size; i++) {
      const node = {
        x: xStart + inc * i,
        r: table[i * 3],
        g: table[i * 3 + 1],
        b: table[i * 3 + 2],
        sharpness: 0.0,
        midpoint: 0.5,
      };
      model.nodes.push(node);
    }

    publicAPI.sortAndUpdateRange();
  };

  //----------------------------------------------------------------------------
  // For a specified index value, get the node parameters
  publicAPI.getNodeValue = (index, val) => {
    if (index < 0 || index >= model.nodes.length) {
      ColorTransferFunction_vtkErrorMacro('Index out of range!');
      return -1;
    }

    val[0] = model.nodes[index].x;
    val[1] = model.nodes[index].r;
    val[2] = model.nodes[index].g;
    val[3] = model.nodes[index].b;
    val[4] = model.nodes[index].midpoint;
    val[5] = model.nodes[index].sharpness;

    return 1;
  };

  //----------------------------------------------------------------------------
  // For a specified index value, get the node parameters
  publicAPI.setNodeValue = (index, val) => {
    if (index < 0 || index >= model.nodes.length) {
      ColorTransferFunction_vtkErrorMacro('Index out of range!');
      return -1;
    }

    const oldX = model.nodes[index].x;
    model.nodes[index].x = val[0];
    model.nodes[index].r = val[1];
    model.nodes[index].g = val[2];
    model.nodes[index].b = val[3];
    model.nodes[index].midpoint = val[4];
    model.nodes[index].sharpness = val[5];

    if (oldX !== val[0]) {
      // The point has been moved, the order of points or the range might have
      // been modified.
      publicAPI.sortAndUpdateRange();
      // No need to call Modified() here because SortAndUpdateRange() has done it
      // already.
    } else {
      publicAPI.modified();
    }

    return 1;
  };

  //----------------------------------------------------------------------------
  publicAPI.getNumberOfAvailableColors = () => {
    if (model.indexedLookup && publicAPI.getSize()) {
      return publicAPI.getSize();
    }
    if (model.tableSize) {
      // Not sure if this is correct since it is only set if
      // "const unsigned char *::GetTable(double xStart, double xEnd,int size)"
      // has been called.
      return model.tableSize;
    }
    return 16777216; // 2^24
  };

  //----------------------------------------------------------------------------
  publicAPI.getIndexedColor = (idx, rgba) => {
    const n = publicAPI.getSize();
    if (n > 0 && idx >= 0) {
      const nodeValue = [];
      publicAPI.getNodeValue(idx % n, nodeValue);
      for (let j = 0; j < 3; ++j) {
        rgba[j] = nodeValue[j + 1];
      }
      rgba[3] = 1.0; // NodeColor is RGB-only.
      return;
    }
    publicAPI.getNanColor(rgba);
    rgba[3] = 1.0; // NanColor is RGB-only.
  };

  //----------------------------------------------------------------------------
  publicAPI.fillFromDataPointer = (nb, ptr) => {
    if (nb <= 0 || !ptr) {
      return;
    }

    publicAPI.removeAllPoints();

    for (let i = 0; i < nb; i++) {
      publicAPI.addRGBPoint(
        ptr[i * 4],
        ptr[i * 4 + 1],
        ptr[i * 4 + 2],
        ptr[i * 4 + 3]
      );
    }
  };

  //----------------------------------------------------------------------------
  publicAPI.setMappingRange = (min, max) => {
    const range = [min, max];
    const originalRange = publicAPI.getRange();
    if (originalRange[1] === range[1] && originalRange[0] === range[0]) {
      return;
    }

    if (range[1] === range[0]) {
      ColorTransferFunction_vtkErrorMacro('attempt to set zero width color range');
      return;
    }

    const scale = (range[1] - range[0]) / (originalRange[1] - originalRange[0]);
    const shift = range[0] - originalRange[0] * scale;

    for (let i = 0; i < model.nodes.length; ++i) {
      model.nodes[i].x = model.nodes[i].x * scale + shift;
    }

    model.mappingRange[0] = range[0];
    model.mappingRange[1] = range[1];
    publicAPI.modified();
  };

  //----------------------------------------------------------------------------
  publicAPI.adjustRange = (range) => {
    const functionRange = publicAPI.getRange();

    // Make sure we have points at each end of the range
    const rgb = [];
    if (functionRange[0] < range[0]) {
      publicAPI.getColor(range[0], rgb);
      publicAPI.addRGBPoint(range[0], rgb[0], rgb[1], rgb[2]);
    } else {
      publicAPI.getColor(functionRange[0], rgb);
      publicAPI.addRGBPoint(range[0], rgb[0], rgb[1], rgb[2]);
    }

    if (functionRange[1] > range[1]) {
      publicAPI.getColor(range[1], rgb);
      publicAPI.addRGBPoint(range[1], rgb[0], rgb[1], rgb[2]);
    } else {
      publicAPI.getColor(functionRange[1], rgb);
      publicAPI.addRGBPoint(range[1], rgb[0], rgb[1], rgb[2]);
    }

    // Remove all points out-of-range
    publicAPI.sortAndUpdateRange();
    for (let i = 0; i < model.nodes.length; ) {
      if (model.nodes[i].x >= range[0] && model.nodes[i].x <= range[1]) {
        model.nodes.splice(i, 1);
      } else {
        ++i;
      }
    }

    return 1;
  };

  //--------------------------------------------------------------------------
  publicAPI.estimateMinNumberOfSamples = (x1, x2) => {
    const d = publicAPI.findMinimumXDistance();
    return Math.ceil((x2 - x1) / d);
  };

  //----------------------------------------------------------------------------
  publicAPI.findMinimumXDistance = () => {
    if (model.nodes.length < 2) {
      return -1.0;
    }

    let distance = Number.MAX_VALUE;
    for (let i = 0; i < model.nodes.length - 1; i++) {
      const currentDist = model.nodes[i + 1].x - model.nodes[i].x;
      if (currentDist < distance) {
        distance = currentDist;
      }
    }

    return distance;
  };

  publicAPI.mapScalarsThroughTable = (
    input,
    output,
    outFormat,
    inputOffset
  ) => {
    if (publicAPI.getSize() === 0) {
      ColorTransferFunction_vtkDebugMacro('Transfer Function Has No Points!');
      return;
    }

    if (model.indexedLookup) {
      publicAPI.mapDataIndexed(input, output, outFormat, inputOffset);
    } else {
      publicAPI.mapData(input, output, outFormat, inputOffset);
    }
  };

  //----------------------------------------------------------------------------
  publicAPI.mapData = (input, output, outFormat, inputOffset) => {
    if (publicAPI.getSize() === 0) {
      ColorTransferFunction_vtkWarningMacro('Transfer Function Has No Points!');
      return;
    }

    const alpha = Math.floor(publicAPI.getAlpha() * 255.0 + 0.5);
    const length = input.getNumberOfTuples();
    const inIncr = input.getNumberOfComponents();

    const outputV = output.getData();
    const inputV = input.getData();
    const rgb = [];

    if (outFormat === ColorTransferFunction_ScalarMappingTarget.RGBA) {
      for (let i = 0; i < length; i++) {
        const x = inputV[i * inIncr + inputOffset];
        publicAPI.getColor(x, rgb);
        outputV[i * 4] = Math.floor(rgb[0] * 255.0 + 0.5);
        outputV[i * 4 + 1] = Math.floor(rgb[1] * 255.0 + 0.5);
        outputV[i * 4 + 2] = Math.floor(rgb[2] * 255.0 + 0.5);
        outputV[i * 4 + 3] = alpha;
      }
    }

    if (outFormat === ColorTransferFunction_ScalarMappingTarget.RGB) {
      for (let i = 0; i < length; i++) {
        const x = inputV[i * inIncr + inputOffset];
        publicAPI.getColor(x, rgb);
        outputV[i * 3] = Math.floor(rgb[0] * 255.0 + 0.5);
        outputV[i * 3 + 1] = Math.floor(rgb[1] * 255.0 + 0.5);
        outputV[i * 3 + 2] = Math.floor(rgb[2] * 255.0 + 0.5);
      }
    }

    if (outFormat === ColorTransferFunction_ScalarMappingTarget.LUMINANCE) {
      for (let i = 0; i < length; i++) {
        const x = inputV[i * inIncr + inputOffset];
        publicAPI.getColor(x, rgb);
        outputV[i] = Math.floor(
          rgb[0] * 76.5 + rgb[1] * 150.45 + rgb[2] * 28.05 + 0.5
        );
      }
    }

    if (outFormat === ColorTransferFunction_ScalarMappingTarget.LUMINANCE_ALPHA) {
      for (let i = 0; i < length; i++) {
        const x = inputV[i * inIncr + inputOffset];
        publicAPI.getColor(x, rgb);
        outputV[i * 2] = Math.floor(
          rgb[0] * 76.5 + rgb[1] * 150.45 + rgb[2] * 28.05 + 0.5
        );
        outputV[i * 2 + 1] = alpha;
      }
    }
  };

  //----------------------------------------------------------------------------
  publicAPI.applyColorMap = (colorMap) => {
    if (colorMap.ColorSpace) {
      model.colorSpace = ColorTransferFunction_ColorSpace[colorMap.ColorSpace.toUpperCase()];
      if (model.colorSpace === undefined) {
        ColorTransferFunction_vtkErrorMacro(
          `ColorSpace ${colorMap.ColorSpace} not supported, using RGB instead`
        );
        model.colorSpace = ColorTransferFunction_ColorSpace.RGB;
      }
    }
    if (colorMap.NanColor) {
      model.nanColor = [].concat(colorMap.NanColor);
      while (model.nanColor.length < 4) {
        model.nanColor.push(1.0);
      }
    }
    if (colorMap.RGBPoints) {
      const size = colorMap.RGBPoints.length;
      model.nodes = [];
      const midpoint = 0.5;
      const sharpness = 0.0;
      for (let i = 0; i < size; i += 4) {
        model.nodes.push({
          x: colorMap.RGBPoints[i],
          r: colorMap.RGBPoints[i + 1],
          g: colorMap.RGBPoints[i + 2],
          b: colorMap.RGBPoints[i + 3],
          midpoint,
          sharpness,
        });
      }
    }
    // FIXME: not supported ?
    // if (colorMap.IndexedColors) {
    // }
    // if (colorMap.Annotations) {
    // }

    publicAPI.sortAndUpdateRange();
  };
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

const ColorTransferFunction_DEFAULT_VALUES = {
  clamping: true,
  colorSpace: ColorTransferFunction_ColorSpace.RGB,
  hSVWrap: true,
  scale: ColorTransferFunction_Scale.LINEAR,

  nanColor: null,
  belowRangeColor: null,
  aboveRangeColor: null,
  useAboveRangeColor: false,
  useBelowRangeColor: false,

  allowDuplicateScalars: false,

  table: null,
  tableSize: 0,
  buildTime: null,

  nodes: null,

  discretize: false,
  numberOfValues: 256,
};

// ----------------------------------------------------------------------------

function ColorTransferFunction_extend(publicAPI, model, initialValues = {}) {
  Object.assign(model, ColorTransferFunction_DEFAULT_VALUES, initialValues);

  // Inheritance
  ScalarsToColors.extend(publicAPI, model, initialValues);

  // Internal objects initialization
  model.table = [];
  model.nodes = [];

  model.nanColor = [0.5, 0.0, 0.0, 1.0];
  model.belowRangeColor = [0.0, 0.0, 0.0, 1.0];
  model.aboveRangeColor = [1.0, 1.0, 1.0, 1.0];

  model.buildTime = {};
  macros.obj(model.buildTime);

  // Create get-only macros
  macros.get(publicAPI, model, ['buildTime', 'mappingRange']);

  // Create get-set macros
  macros.setGet(publicAPI, model, [
    'useAboveRangeColor',
    'useBelowRangeColor',
    'colorSpace',
    'discretize',
    'numberOfValues',
  ]);

  macros.setArray(
    publicAPI,
    model,
    ['nanColor', 'belowRangeColor', 'aboveRangeColor'],
    4
  );

  // Create get macros for array
  macros.getArray(publicAPI, model, [
    'nanColor',
    'belowRangeColor',
    'aboveRangeColor',
  ]);

  // For more macro methods, see "Sources/macros.js"

  // Object specific methods
  vtkColorTransferFunction(publicAPI, model);
}

// ----------------------------------------------------------------------------

const ColorTransferFunction_newInstance = macros.newInstance(
  ColorTransferFunction_extend,
  'vtkColorTransferFunction'
);

// ----------------------------------------------------------------------------

/* harmony default export */ var ColorTransferFunction = ({ newInstance: ColorTransferFunction_newInstance, extend: ColorTransferFunction_extend, ...ColorTransferFunction_Constants });

// EXTERNAL MODULE: ./node_modules/vtk.js/Sources/Rendering/Core/ColorTransferFunction/ColorMaps.json
var ColorMaps = __webpack_require__("78bd");

// CONCATENATED MODULE: ./node_modules/vtk.js/Sources/Rendering/Core/ColorTransferFunction/ColorMaps.js


const presetMap = Object.create(null);

ColorMaps
  .filter((p) => p.RGBPoints)
  .filter((p) => p.ColorSpace !== 'CIELAB')
  .forEach((p) => {
    presetMap[p.Name] = p;
  });

// ----------------------------------------------------------------------------

const rgbPresetNames = Object.keys(presetMap);
rgbPresetNames.sort();

// ----------------------------------------------------------------------------

function getPresetByName(name) {
  return presetMap[name];
}

// ----------------------------------------------------------------------------

function addPreset(preset) {
  if (!preset.RGBPoints || preset.ColorSpace === 'CIELAB') {
    return;
  }

  if (!presetMap[preset.Name]) {
    rgbPresetNames.push(preset.Name);
    rgbPresetNames.sort();
  }

  presetMap[preset.Name] = preset;
}

// ----------------------------------------------------------------------------

function removePresetByName(name) {
  const index = rgbPresetNames.indexOf(name);
  if (index > -1) {
    rgbPresetNames.splice(index, 1);
  }
  delete presetMap[name];
}

// ----------------------------------------------------------------------------

/* harmony default export */ var ColorTransferFunction_ColorMaps = ({
  addPreset,
  removePresetByName,
  getPresetByName,
  rgbPresetNames,
});

// CONCATENATED MODULE: ./src/utils/canvasHelper.js
var WORK_CANVAS = document.createElement('canvas');
WORK_CANVAS.width = 100;
WORK_CANVAS.height = 100;
function getPixels(width, height, values, convert) {
  var ctx = WORK_CANVAS.getContext('2d');
  var rawPixels = ctx.createImageData(width, height);

  for (var j = 0; j < height; j++) {
    for (var i = 0; i < width; i++) {
      var idxSrc = i + j * width;
      var idxDst = i + (height - j - 1) * width;
      var value = convert(values[idxSrc]);
      rawPixels.data[idxDst * 4 + 0] = value[0];
      rawPixels.data[idxDst * 4 + 1] = value[1];
      rawPixels.data[idxDst * 4 + 2] = value[2];
      rawPixels.data[idxDst * 4 + 3] = 255; // Opaque
    }
  }

  return rawPixels;
}
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/eslint-loader??ref--14-0!./src/components/XaiHeatMap/script.js?vue&type=script&lang=js&







































/* harmony default export */ var scriptvue_type_script_lang_js_ = ({
  name: 'XaiHeatMap',
  props: {
    heatmap: {
      type: [Array, Float32Array, Float64Array, Uint8Array, Uint16Array, Uint32Array, Int8Array, Int16Array, Int32Array],
      "default": function _default() {
        return [];
      }
    },
    shape: {
      type: Array,
      "default": function _default() {
        return [10, 10];
      }
    },
    colorMode: {
      type: String,
      "default": 'full'
    },
    colorRange: {
      type: Array,
      "default": function _default() {
        return [-1, 1];
      }
    },
    colorPreset: {
      type: String,
      "default": 'erdc_rainbow_bright'
    }
  },
  computed: {
    width: function width() {
      return this.shape[0];
    },
    height: function height() {
      return this.shape[1];
    },
    fullRange: function fullRange() {
      var min = this.heatmap[0];
      var max = this.heatmap[0];

      for (var i = 0; i < this.heatmap.length; i++) {
        var v = this.heatmap[i];

        if (min > v) {
          min = v;
        }

        if (max < v) {
          max = v;
        }
      }

      return [min, max];
    },
    maxSymRange: function maxSymRange() {
      var _this$fullRange = _slicedToArray(this.fullRange, 2),
          min = _this$fullRange[0],
          max = _this$fullRange[1];

      var value = Math.max(-min, max);
      return [-value, value];
    },
    minSymRange: function minSymRange() {
      var _this$fullRange2 = _slicedToArray(this.fullRange, 2),
          min = _this$fullRange2[0],
          max = _this$fullRange2[1];

      var value = Math.min(-min, max);
      return [-value, value];
    },
    positiveRange: function positiveRange() {
      var _this$fullRange3 = _slicedToArray(this.fullRange, 2),
          max = _this$fullRange3[1];

      return [0, max];
    },
    negativeRange: function negativeRange() {
      var _this$fullRange4 = _slicedToArray(this.fullRange, 1),
          min = _this$fullRange4[0];

      return [min, 0];
    },
    colorRangeToUse: function colorRangeToUse() {
      switch (this.colorMode) {
        case 'full':
          return this.fullRange;

        case 'maxSym':
          return this.maxSymRange;

        case 'minSym':
          return this.minSymRange;

        case 'positive':
          return this.positiveRange;

        case 'negative':
          return this.negativeRange;

        case 'custom':
          return this.colorRange;

        default:
          return this.fullRange;
      }
    }
  },
  watch: {
    shape: function shape() {
      this.$nextTick(this.render);
    },
    heatmap: function heatmap() {
      this.$nextTick(this.render);
    },
    colorPreset: function colorPreset() {
      this.lut.applyColorMap(ColorTransferFunction_ColorMaps.getPresetByName(this.colorPreset));
      this.$nextTick(this.render);
    },
    colorRangeToUse: function colorRangeToUse() {
      this.$nextTick(this.render);
    }
  },
  mounted: function mounted() {
    this.$nextTick(this.render);
  },
  methods: {
    render: function render() {
      var _this$colorRangeToUse = _slicedToArray(this.colorRangeToUse, 2),
          min = _this$colorRangeToUse[0],
          max = _this$colorRangeToUse[1];

      if (!this.width || !this.height || !(max - min) || !this.heatmap) {
        return;
      }

      this.lut.setMappingRange(min, max);
      this.lut.updateRange();

      if (!this.width || !this.height) {
        return;
      }

      var rawPixels = getPixels(this.width, this.height, this.heatmap, this.toColor);
      var ctx = this.$el.getContext('2d');
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, this.width, this.height);
      ctx.putImageData(rawPixels, 0, 0);
    },
    onMouseMove: function onMouseMove(e) {
      var clientX = e.clientX,
          clientY = e.clientY;
      var _this$bounds = this.bounds,
          top = _this$bounds.top,
          left = _this$bounds.left,
          width = _this$bounds.width,
          height = _this$bounds.height;
      var xNorm = (clientX - left) / width;
      var yNorm = 1 - (clientY - top) / height;
      var i = Math.round(xNorm * (this.width - 1));
      var j = Math.round(yNorm * (this.height - 1));
      this.$emit('hover', {
        i: i,
        j: j
      });
    },
    onMouseEnter: function onMouseEnter() {
      this.$emit('enter');
      this.bounds = this.$el.getBoundingClientRect();
    }
  },
  created: function created() {
    var _this = this;

    this.lut = ColorTransferFunction.newInstance();
    this.lut.applyColorMap(ColorTransferFunction_ColorMaps.getPresetByName(this.colorPreset));
    var color = [0, 0, 0, 255];

    this.toColor = function (v) {
      _this.lut.getColor(v, color);

      color[0] *= 255;
      color[1] *= 255;
      color[2] *= 255;
      return color;
    };
  }
});
// CONCATENATED MODULE: ./src/components/XaiHeatMap/script.js?vue&type=script&lang=js&
 /* harmony default export */ var XaiHeatMap_scriptvue_type_script_lang_js_ = (scriptvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/XaiHeatMap/index.vue





/* normalize component */

var XaiHeatMap_component = normalizeComponent(
  XaiHeatMap_scriptvue_type_script_lang_js_,
  templatevue_type_template_id_c6afef32_render,
  templatevue_type_template_id_c6afef32_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var XaiHeatMap = (XaiHeatMap_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/eslint-loader??ref--14-0!./src/components/XaiImage/script.js?vue&type=script&lang=js&






/* harmony default export */ var XaiImage_scriptvue_type_script_lang_js_ = ({
  name: 'XaiImage',
  components: {
    XaiHeatMap: XaiHeatMap
  },
  props: {
    // Image handling
    src: {
      type: String
    },
    maxHeight: {
      type: [String, Number]
    },
    maxWidth: {
      type: [String, Number]
    },
    width: {
      type: String
    },
    // Areas handling (object detection)
    colors: {
      type: Array,
      "default": function _default() {
        return ['#e1002a', '#417dc0', '#1d9a57', '#e9bc2f', '#9b3880'];
      }
    },
    areas: {
      type: Array
    },
    areaKey: {
      type: String,
      "default": 'name'
    },
    areaStyle: {
      type: Object,
      "default": function _default() {
        return {
          'stroke-width': 3,
          rx: 10
        };
      }
    },
    areaSelected: {
      type: Array
    },
    areaSelectedOpacity: {
      type: [Number, String]
    },
    areaOpacity: {
      type: [Number, String]
    },
    // Heatmap handling
    heatmaps: {
      type: Object
    },
    heatmapOpacity: {
      type: [String, Number]
    },
    heatmapColorPreset: {
      type: [String, Object],
      "default": 'rainbow'
    },
    heatmapColorRange: {
      type: Array
    },
    heatmapActive: {
      type: String
    },
    heatmapColorMode: {
      type: String,
      "default": 'full'
    }
  },
  data: function data() {
    return {
      imageWidth: 0,
      imageHeight: 0,
      containerStyle: {
        position: 'relative'
      },
      imageStyle: {
        position: 'relative'
      },
      annotationStyle: {
        position: 'absolute',
        top: 0,
        left: 0
      },
      areaSelectedOpacityValue: 1,
      areaOpacityValue: 1,
      selectedAreas: {}
    };
  },
  watch: {
    src: function src(url) {
      this.image.src = url;
    },
    maxWidth: function maxWidth() {
      this.updateSizes();
    },
    maxHeight: function maxHeight() {
      this.updateSizes();
    },
    areas: function areas() {
      this.updateAreas();
    }
  },
  computed: {
    decoratedAreas: function decoratedAreas() {
      var _this$areaSelectedOpa,
          _this$areaOpacity,
          _this = this;

      this.areaSelected;
      var so = (_this$areaSelectedOpa = this.areaSelectedOpacity) !== null && _this$areaSelectedOpa !== void 0 ? _this$areaSelectedOpa : this.areaSelectedOpacityValue;
      var o = (_this$areaOpacity = this.areaOpacity) !== null && _this$areaOpacity !== void 0 ? _this$areaOpacity : this.areaOpacityValue;
      return this.areas.map(function (item, idx) {
        return _objectSpread2(_objectSpread2({}, item), {}, {
          opacity: _this.isAreaSelected(idx) ? so : o,
          color: _this.colors[idx % _this.colors.length]
        });
      });
    },
    activeHeatmap: function activeHeatmap() {
      return this.heatmaps && this.heatmaps[this.heatmapActive];
    },
    heatMapStyle: function heatMapStyle() {
      return _objectSpread2(_objectSpread2({}, this.annotationStyle), {}, {
        opacity: this.heatmapOpacity
      });
    },
    shape: function shape() {
      return [this.imageWidth, this.imageHeight];
    }
  },
  methods: {
    updateSizes: function updateSizes() {
      this.imageStyle.height = 'auto';
      this.imageStyle.width = 'auto';

      if (this.maxHeight) {
        this.imageStyle.maxHeight = "".concat(this.maxHeight, "px");
        this.annotationStyle.maxHeight = "".concat(this.maxHeight, "px");
      } else {
        delete this.imageStyle.maxHeight;
        delete this.annotationStyle.maxHeight;
      }

      if (this.maxWidth) {
        this.imageStyle.maxWidth = "".concat(this.maxWidth, "px");
        this.annotationStyle.maxWidth = "".concat(this.maxWidth, "px");
      } else {
        this.imageStyle.maxWidth = '100%';
        this.annotationStyle.maxWidth = '100%';
      }

      if (this.width) {
        this.containerStyle.width = this.width;
        this.imageStyle.width = this.width;
        this.annotationStyle.width = this.width;
      } else {
        delete this.containerStyle.width;
        delete this.annotationStyle.width;
      }
    },
    isAreaSelected: function isAreaSelected(idx) {
      var selection = this.areas[idx][this.areaKey];

      if (!this.areaSelected) {
        return false;
      }

      return !!this.areaSelected.find(function (item) {
        return selection == item;
      });
    },
    updateAreaSelection: function updateAreaSelection(idx, selected) {
      var selection = this.areas[idx];
      this.selectedAreas[selection[this.areaKey]] = selected;
      var array = [];

      for (var i = 0; i < this.areas.length; i++) {
        var key = this.areas[i][this.areaKey];

        if (this.selectedAreas[key]) {
          array.push(key);
        }
      }

      this.$emit('areaSelectionChange', array);
    }
  },
  created: function created() {
    var _this2 = this;

    // callback
    this.updateImageSize = function () {
      _this2.imageWidth = _this2.image.width;
      _this2.imageHeight = _this2.image.height;
    };

    this.image = new Image();
    this.image.addEventListener('load', this.updateImageSize); // Load image

    this.image.src = this.src;
    this.updateSizes();
  },
  mounted: function mounted() {},
  beforeDestroy: function beforeDestroy() {
    this.image.removeEventListener('load', this.updateImageSize);
  }
});
// CONCATENATED MODULE: ./src/components/XaiImage/script.js?vue&type=script&lang=js&
 /* harmony default export */ var components_XaiImage_scriptvue_type_script_lang_js_ = (XaiImage_scriptvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/XaiImage/index.vue





/* normalize component */

var XaiImage_component = normalizeComponent(
  components_XaiImage_scriptvue_type_script_lang_js_,
  templatevue_type_template_id_7af16a10_render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var XaiImage = (XaiImage_component.exports);
// CONCATENATED MODULE: ./src/components/index.js


/* harmony default export */ var components = ({
  XaiImage: XaiImage,
  XaiHeatMap: XaiHeatMap
});
// CONCATENATED MODULE: ./src/use.js





/* harmony default export */ var use = ({
  install: function install(Vue) {
    Object.keys(components).forEach(function (name) {
      Vue.component(name, components[name]);
    });
  }
});
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (use);



/***/ }),

/***/ "fb2c":
/***/ (function(module, exports, __webpack_require__) {

var createTypedArrayConstructor = __webpack_require__("74e8");

// `Uint32Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Uint32', function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "fb6a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var isArray = __webpack_require__("e8b5");
var isConstructor = __webpack_require__("68ee");
var isObject = __webpack_require__("861d");
var toAbsoluteIndex = __webpack_require__("23cb");
var lengthOfArrayLike = __webpack_require__("07fa");
var toIndexedObject = __webpack_require__("fc6a");
var createProperty = __webpack_require__("8418");
var wellKnownSymbol = __webpack_require__("b622");
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var un$Slice = __webpack_require__("f36a");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

var SPECIES = wellKnownSymbol('species');
var Array = global.Array;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = lengthOfArrayLike(O);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (isConstructor(Constructor) && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return un$Slice(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});


/***/ }),

/***/ "fc6a":
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__("44ad");
var requireObjectCoercible = __webpack_require__("1d80");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "fce3":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var global = __webpack_require__("da84");

// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('.', 's');
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});


/***/ }),

/***/ "fd87":
/***/ (function(module, exports, __webpack_require__) {

var createTypedArrayConstructor = __webpack_require__("74e8");

// `Int8Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Int8', function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "fdbc":
/***/ (function(module, exports) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ "fdbf":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__("4930");

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=vue-xai.umd.js.map