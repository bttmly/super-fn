(function(){

  var f = superFn;

  /** Used as a safe reference for `undefined` in pre ES5 environments */
  var undefined;

  /** Used as the size to cover large array optimizations */
  var largeArraySize = 200;

  /** Used as the maximum length an array-like object */
  var maxSafeInteger = Math.pow(2, 53) - 1;

  /** Used as a reference to the global object */
  var root = (typeof global == 'object' && global) || this;

  /** Used to store Lo-Dash to test for bad extensions/shims */
  var lodashBizarro = root.lodashBizarro;

  /** Method and object shortcuts */
  var phantom = root.phantom,
      amd = root.define && define.amd,
      argv = root.process && process.argv,
      ArrayBuffer = root.ArrayBuffer,
      document = !phantom && root.document,
      body = root.document && root.document.body,
      create = Object.create,
      freeze = Object.freeze,
      JSON = root.JSON,
      noop = function() {},
      params = root.arguments,
      push = Array.prototype.push,
      slice = Array.prototype.slice,
      system = root.system,
      toString = Object.prototype.toString;

  /** The file path of the Lo-Dash file to test */
  var filePath = (function() {
    var min = 0,
        result = [];

    if (phantom) {
      result = params = phantom.args;
    } else if (system) {
      min = 1;
      result = params = system.args;
    } else if (argv) {
      min = 2;
      result = params = argv;
    } else if (params) {
      result = params;
    }
    var last = result[result.length - 1];
    result = (result.length > min && !/test(?:\.js)?$/.test(last)) ? last : '../lodash.js';

    if (!amd) {
      try {
        result = require('fs').realpathSync(result);
      } catch(e) { }

      try {
        result = require.resolve(result);
      } catch(e) { }
    }
    return result;
  }());

  /** The `ui` object */
  var ui = root.ui || (root.ui = {
    'buildPath': filePath,
    'loaderPath': '',
    'isModularize': /\b(?:commonjs|(index|main)\.js|lodash-(?:amd|es6|node)|modularize|npm|transpiled)\b/.test(filePath),
    'isStrict': /\b(?:lodash-es6|transpiled)\b/.test(filePath),
    'urlParams': {}
  });

  /** The basename of the Lo-Dash file to test */
  var basename = /[\w.-]+$/.exec(filePath)[0];

  /** Detect if in a Java environment */
  var isJava = !document && !!root.java;

  /** Used to indicate testing a modularized build */
  var isModularize = ui.isModularize;

  /** Detect if testing `npm` modules */
  var isNpm = isModularize && /\bnpm\b/.test([ui.buildPath, ui.urlParams.build]);

  /** Detect if running in PhantomJS */
  var isPhantom = phantom || typeof callPhantom == 'function';

  /** Detect if running in Rhino */
  var isRhino = isJava && typeof global == 'function' && global().Array === root.Array;

  /** Detect if Lo-Dash is in strict mode */
  var isStrict = ui.isStrict;

  function skipTest(count) {
    count || (count = 1);
    while (count--) {
      ok(true, 'test skipped');
    }
  }

  function times(n, iterator, context) {
    var accum = Array(Math.max(0, n));
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  function identity( value ) { return value };

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.throttle');

  (function() {
    asyncTest('should throttle a function', 2, function() {
      if (!(isRhino && isModularize)) {
        var count = 0;
        
        // var throttled = _.throttle(function() { count++; }, 32);
        var throttled = f( function(){ count++; } ).throttle( 32 );
        throttled();
        throttled();
        throttled();

        var lastCount = count;
        ok(count > 0);

        setTimeout(function() {
          ok(count > lastCount);
          QUnit.start();
        }, 64);
      }
      else {
        skipTest(2);
        QUnit.start();
      }
    });

    asyncTest('subsequent calls should return the result of the first call', 5, function() {
      if (!(isRhino && isModularize)) {
        // var throttled = _.throttle(_.identity, 32),
        var throttled = f( identity ).throttle( 32 );
        var result = [throttled('a'), throttled('b')];

        deepEqual(result, ['a', 'a']);

        setTimeout(function() {
          var result = [throttled('x'), throttled('y')];
          notEqual(result[0], 'a');
          notStrictEqual(result[0], undefined);

          notEqual(result[1], 'y');
          notStrictEqual(result[1], undefined);
          QUnit.start();
        }, 64);
      }
      else {
        skipTest(5);
        QUnit.start();
      }
    });

    // not sure what the "runInContext" is trying to do, so let's skip it...
    //
    // asyncTest('should clear timeout when `func` is called', 1, function() {
    //   if (!isModularize) {
    //     var callCount = 0,
    //         dateCount = 0;

    //     var getTime = function() {
    //       return ++dateCount < 3 ? +new Date : Infinity;
    //     };

    //     var lodash = _.runInContext(_.assign({}, root, {
    //       'Date': function() {
    //         return { 'getTime': getTime, 'valueOf': getTime };
    //       }
    //     }));

    //     var throttled = lodash.throttle(function() {
    //       callCount++;
    //     }, 32);

    //     throttled();
    //     throttled();
    //     throttled();

    //     setTimeout(function() {
    //       strictEqual(callCount, 2);
    //       QUnit.start();
    //     }, 64);
    //   }
    //   else {
    //     skipTest();
    //     QUnit.start();
    //   }
    // });

    asyncTest('should not trigger a trailing call when invoked once', 2, function() {
      if (!(isRhino && isModularize)) {
        var count = 0,
            throttled = f( function() { count++; } ).throttle( 32 );

        throttled();
        strictEqual(count, 1);

        setTimeout(function() {
          strictEqual(count, 1);
          QUnit.start();
        }, 64);
      }
      else {
        skipTest(2);
        QUnit.start();
      }
    });

    times(2, function(index) {
      asyncTest('should trigger a call when invoked repeatedly' + (index ? ' and `leading` is `false`' : ''), 1, function() {
        if (!(isRhino && isModularize)) {
          var count = 0,
              limit = (argv || isPhantom) ? 1000 : 320,
              options = index ? { 'leading': false } : {};

          var throttled = f( function() {
            count++;
          }).throttle( 32, options );

          var start = +new Date;
          while ((new Date - start) < limit) {
            throttled();
          }
          var actual = count > 1;

          setTimeout(function() {
            ok(actual);
            QUnit.start();
          }, 1);
        }
        else {
          skipTest();
          QUnit.start();
        }
      });
    });

    asyncTest('should apply default options correctly', 3, function() {
      if (!(isRhino && isModularize)) {
        var count = 0;

        var throttled = f(function(value) {
          count++;
          return value;
        }).throttle( 32, {} );

        strictEqual(throttled('a'), 'a');
        strictEqual(throttled('b'), 'a');

        setTimeout(function() {
          strictEqual(count, 2);
          QUnit.start();
        }, 256);
      }
      else {
        skipTest(3);
        QUnit.start();
      }
    });

    test('should support a `leading` option', 4, function() {
      if (!(isRhino && isModularize)) {
        each([true, { 'leading': true }].forEach( function(options) {
          var withLeading = f( identity ).throttle( 32, options );
          strictEqual(withLeading('a'), 'a');
        });

        ([false, { 'leading': false }].forEach( function(options) {
          var withoutLeading = f( identity ).throttle( 32, options );
          strictEqual(withoutLeading('a'), undefined);
        });
      }
      else {
        skipTest(4);
      }
    });

    asyncTest('should support a `trailing` option', 6, function() {
      if (!(isRhino && isModularize)) {
        var withCount = 0,
            withoutCount = 0;

        var withTrailing = f(function(value) {
          withCount++;
          return value;
        }).throttle( 64, { 'trailing': true });

        var withoutTrailing = f(function(value) {
          withoutCount++;
          return value;
        }).throttle( 64, { 'trailing': false });

        strictEqual(withTrailing('a'), 'a');
        strictEqual(withTrailing('b'), 'a');

        strictEqual(withoutTrailing('a'), 'a');
        strictEqual(withoutTrailing('b'), 'a');

        setTimeout(function() {
          strictEqual(withCount, 2);
          strictEqual(withoutCount, 1);
          QUnit.start();
        }, 256);
      }
      else {
        skipTest(6);
        QUnit.start();
      }
    });

    asyncTest('should not update `lastCalled`, at the end of the timeout, when `trailing` is `false`', 1, function() {
      if (!(isRhino && isModularize)) {
        var count = 0;

        var throttled = f(function() {
          count++;
        }).throttle( 64, { 'trailing': false });

        throttled();
        throttled();

        setTimeout(function() {
          throttled();
          throttled();
        }, 96);

        setTimeout(function() {
          ok(count > 1);
          QUnit.start();
        }, 192);
      }
      else {
        skipTest();
        QUnit.start();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

    QUnit.module('lodash.debounce');

    (function() {
      asyncTest('should debounce a function', 2, function() {
        if (!(isRhino && isModularize)) {
          var count = 0,
              debounced = f(function() { count++; }).debounce( 32 );

          debounced();
          debounced();
          debounced();

          strictEqual(count, 0);

          setTimeout(function() {
            strictEqual(count, 1);
            QUnit.start();
          }, 96);
        }
        else {
          skipTest(2);
          QUnit.start();
        }
      });

      asyncTest('subsequent debounced calls return the last `func` result', 2, function() {
        if (!(isRhino && isModularize)) {
          var debounced = f( identity ).debounce( 32 );
          debounced('x');

          setTimeout(function() {
            notEqual(debounced('y'), 'y');
          }, 64);

          setTimeout(function() {
            notEqual(debounced('z'), 'z');
            QUnit.start();
          }, 128);
        }
        else {
          skipTest(2);
          QUnit.start();
        }
      });

      asyncTest('subsequent "immediate" debounced calls return the last `func` result', 2, function() {
        if (!(isRhino && isModularize)) {
          var debounced = f(identity).debounce(32, true),
              result = [debounced('x'), debounced('y')];

          deepEqual(result, ['x', 'x']);

          setTimeout(function() {
            var result = [debounced('a'), debounced('b')];
            deepEqual(result, ['a', 'a']);
            QUnit.start();
          }, 64);
        }
        else {
          skipTest(2);
          QUnit.start();
        }
      });

      asyncTest('should apply default options correctly', 2, function() {
        if (!(isRhino && isModularize)) {
          var count = 0;

          var debounced = f(function(value) {
            count++;
            return value;
          }).debounce(32, {});

          strictEqual(debounced('x'), undefined);

          setTimeout(function() {
            strictEqual(count, 1);
            QUnit.start();
          }, 64);
        }
        else {
          skipTest(2);
          QUnit.start();
        }
      });

      asyncTest('should support a `leading` option', 7, function() {
        if (!(isRhino && isModularize)) {
          var withLeading,
              counts = [0, 0, 0];

          [true, { 'leading': true }].forEach(function(options, index) {
            var debounced = f(function(value) {
              counts[index]++;
              return value;
            }).debounce(32, options);

            if (index == 1) {
              withLeading = debounced;
            }
            strictEqual(debounced('x'), 'x');
          });

          [false, { 'leading': false }].forEach(function(options) {
            var withoutLeading = f(identity).debounce(32, options);
            strictEqual(withoutLeading('x'), undefined);
          });

          var withLeadingAndTrailing = f(function() {
            counts[2]++;
          }).debounce(32, { 'leading': true });

          withLeadingAndTrailing();
          withLeadingAndTrailing();

          strictEqual(counts[2], 1);

          setTimeout(function() {
            deepEqual(counts, [1, 1, 2]);

            withLeading('x');
            strictEqual(counts[1], 2);

            QUnit.start();
          }, 64);
        }
        else {
          skipTest(7);
          QUnit.start();
        }
      });

      asyncTest('should support a `trailing` option', 4, function() {
        if (!(isRhino && isModularize)) {
          var withCount = 0,
              withoutCount = 0;

          var withTrailing = f(function(value) {
            withCount++;
            return value;
          }).debounce(32, { 'trailing': true });

          var withoutTrailing = f(function(value) {
            withoutCount++;
            return value;
          }).debounce(32, { 'trailing': false });

          strictEqual(withTrailing('x'), undefined);
          strictEqual(withoutTrailing('x'), undefined);

          setTimeout(function() {
            strictEqual(withCount, 1);
            strictEqual(withoutCount, 0);
            QUnit.start();
          }, 64);
        }
        else {
          skipTest(4);
          QUnit.start();
        }
      });

      asyncTest('should support a `maxWait` option', 1, function() {
        if (!(isRhino && isModularize)) {
          var limit = (argv || isPhantom) ? 1000 : 320,
              withCount = 0,
              withoutCount = 0;

          var withMaxWait = f(function() {
            withCount++;
          }).debounce(64, { 'maxWait': 128 });

          var withoutMaxWait = f(function() {
            withoutCount++;
          }).debounce(96);

          var start = +new Date;
          while ((new Date - start) < limit) {
            withMaxWait();
            withoutMaxWait();
          }
          var actual = [Boolean(withCount), Boolean(withoutCount)];

          setTimeout(function() {
            deepEqual(actual, [true, false]);
            QUnit.start();
          }, 1);
        }
        else {
          skipTest();
          QUnit.start();
        }
      });

      asyncTest('should cancel `maxDelayed` when `delayed` is executed', 1, function() {
        if (!(isRhino && isModularize)) {
          var count = 0;

          var debounced = f(function() {
            count++;
          }).debounce(32, { 'maxWait': 64 });

          debounced();

          setTimeout(function() {
            strictEqual(count, 1);
            QUnit.start();
          }, 128);
        }
        else {
          skipTest();
          QUnit.start();
        }
      });

      asyncTest('should execute the `trailing` call with the correct arguments and `this` binding', 2, function() {
        if (!(isRhino && isModularize)) {
          var args,
              count = 0,
              object = {};

          var debounced = f(function(value) {
            args = [this];
            push.apply(args, arguments);
            return ++count != 2;
          }).debounce(32, { 'leading': true, 'maxWait': 64 });

          while (true) {
            if (!debounced.call(object, 'a')) {
              break;
            }
          }
          setTimeout(function() {
            strictEqual(count, 2);
            deepEqual(args, [object, 'a']);
            QUnit.start();
          }, 64);
        }
        else {
          skipTest(2);
          QUnit.start();
        }
      });
    }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.throttle');

  (function() {
    asyncTest('should throttle a function', 2, function() {
      if (!(isRhino && isModularize)) {
        var count = 0;
        var throttled = f(function() { count++; }.throttle(32);

        throttled();
        throttled();
        throttled();

        var lastCount = count;
        ok(count > 0);

        setTimeout(function() {
          ok(count > lastCount);
          QUnit.start();
        }, 64);
      }
      else {
        skipTest(2);
        QUnit.start();
      }
    });

    asyncTest('subsequent calls should return the result of the first call', 5, function() {
      if (!(isRhino && isModularize)) {
        var throttled = f(identity).throttle(32),
            result = [throttled('a'), throttled('b')];

        deepEqual(result, ['a', 'a']);

        setTimeout(function() {
          var result = [throttled('x'), throttled('y')];
          notEqual(result[0], 'a');
          notStrictEqual(result[0], undefined);

          notEqual(result[1], 'y');
          notStrictEqual(result[1], undefined);
          QUnit.start();
        }, 64);
      }
      else {
        skipTest(5);
        QUnit.start();
      }
    });

    // asyncTest('should clear timeout when `func` is called', 1, function() {
    //   if (!isModularize) {
    //     var callCount = 0,
    //         dateCount = 0;

    //     var getTime = function() {
    //       return ++dateCount < 3 ? +new Date : Infinity;
    //     };

    //     var lodash = _.runInContext(_.assign({}, root, {
    //       'Date': function() {
    //         return { 'getTime': getTime, 'valueOf': getTime };
    //       }
    //     }));

    //     var throttled = lodash.throttle(function() {
    //       callCount++;
    //     }, 32);

    //     throttled();
    //     throttled();
    //     throttled();

    //     setTimeout(function() {
    //       strictEqual(callCount, 2);
    //       QUnit.start();
    //     }, 64);
    //   }
    //   else {
    //     skipTest();
    //     QUnit.start();
    //   }
    // });

    asyncTest('should not trigger a trailing call when invoked once', 2, function() {
      if (!(isRhino && isModularize)) {
        var count = 0,
            throttled = f(function() { count++; }).throttle(32);

        throttled();
        strictEqual(count, 1);

        setTimeout(function() {
          strictEqual(count, 1);
          QUnit.start();
        }, 64);
      }
      else {
        skipTest(2);
        QUnit.start();
      }
    });

    times(2, function(index) {
      asyncTest('should trigger a call when invoked repeatedly' + (index ? ' and `leading` is `false`' : ''), 1, function() {
        if (!(isRhino && isModularize)) {
          var count = 0,
              limit = (argv || isPhantom) ? 1000 : 320,
              options = index ? { 'leading': false } : {};

          var throttled = f(function() {
            count++;
          }).throttle(32, options);

          var start = +new Date;
          while ((new Date - start) < limit) {
            throttled();
          }
          var actual = count > 1;

          setTimeout(function() {
            ok(actual);
            QUnit.start();
          }, 1);
        }
        else {
          skipTest();
          QUnit.start();
        }
      });
    });

    asyncTest('should apply default options correctly', 3, function() {
      if (!(isRhino && isModularize)) {
        var count = 0;

        var throttled = f(function(value) {
          count++;
          return value;
        }).throttle( 32, {});

        strictEqual(throttled('a'), 'a');
        strictEqual(throttled('b'), 'a');

        setTimeout(function() {
          strictEqual(count, 2);
          QUnit.start();
        }, 256);
      }
      else {
        skipTest(3);
        QUnit.start();
      }
    });

    test('should support a `leading` option', 4, function() {
      if (!(isRhino && isModularize)) {
        [true, { 'leading': true }].forEach(function(options) {
          var withLeading = f(identity).throttle(32, options);
          strictEqual(withLeading('a'), 'a');
        });

        [false, { 'leading': false }].forEach(function(options) {
          var withoutLeading = f(identity).throttle(32, options);
          strictEqual(withoutLeading('a'), undefined);
        });
      }
      else {
        skipTest(4);
      }
    });

    asyncTest('should support a `trailing` option', 6, function() {
      if (!(isRhino && isModularize)) {
        var withCount = 0,
            withoutCount = 0;

        var withTrailing = f(function(value) {
          withCount++;
          return value;
        }).throttle(64, { 'trailing': true });

        var withoutTrailing = f(function(value) {
          withoutCount++;
          return value;
        }).throttle(64, { 'trailing': false });

        strictEqual(withTrailing('a'), 'a');
        strictEqual(withTrailing('b'), 'a');

        strictEqual(withoutTrailing('a'), 'a');
        strictEqual(withoutTrailing('b'), 'a');

        setTimeout(function() {
          strictEqual(withCount, 2);
          strictEqual(withoutCount, 1);
          QUnit.start();
        }, 256);
      }
      else {
        skipTest(6);
        QUnit.start();
      }
    });

    asyncTest('should not update `lastCalled`, at the end of the timeout, when `trailing` is `false`', 1, function() {
      if (!(isRhino && isModularize)) {
        var count = 0;

        var throttled = f(function() {
          count++;
        }).throttle(64, { 'trailing': false });

        throttled();
        throttled();

        setTimeout(function() {
          throttled();
          throttled();
        }, 96);

        setTimeout(function() {
          ok(count > 1);
          QUnit.start();
        }, 192);
      }
      else {
        skipTest();
        QUnit.start();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.debounce and lodash.throttle');

  ['debounce', 'throttle'].forEach(function(methodName) {
    var func = _[methodName],
        isThrottle = methodName == 'throttle';

    test( methodName + ' should not error for non-object `options` values', 1, function() {
      var pass = true;

      try {
        func(_.noop, 32, 1);
      } catch(e) {
        pass = false;
      }
      ok(pass);
    });

    asyncTest('_.' + methodName + ' should call `func` with the correct `this` binding', 1, function() {
      if (!(isRhino && isModularize)) {
        var object = {
          'funced': func(function() { actual.push(this); }, 32)
        };

        var actual = [],
            expected = _.times(isThrottle ? 2 : 1, _.constant(object));

        object.funced();
        if (isThrottle) {
          object.funced();
        }
        setTimeout(function() {
          deepEqual(actual, expected);
          QUnit.start();
        }, 64);
      }
      else {
        skipTest();
        QUnit.start();
      }
    });

    asyncTest('_.' + methodName + ' supports recursive calls', 2, function() {
      if (!(isRhino && isModularize)) {
        var actual = [],
            args = _.map(['a', 'b', 'c'], function(chr) { return [{}, chr]; }),
            length = isThrottle ? 2 : 1,
            expected = args.slice(0, length),
            queue = args.slice();

        var funced = func(function() {
          var current = [this];
          push.apply(current, arguments);
          actual.push(current);

          var next = queue.shift();
          if (next) {
            funced.call(next[0], next[1]);
          }
        }, 32);

        var next = queue.shift();
        funced.call(next[0], next[1]);
        deepEqual(actual, expected.slice(0, length - 1));

        setTimeout(function() {
          deepEqual(actual, expected);
          QUnit.start();
        }, 42);
      }
      else {
        skipTest(2);
        QUnit.start();
      }
    });

    asyncTest('_.' + methodName + ' should work if the system time is set backwards', 1, function() {
      if (!isModularize) {
        var callCount = 0,
            dateCount = 0;

        var getTime = function() {
          return ++dateCount < 2 ? +new Date : +new Date(2012, 3, 23, 23, 27, 18);
        };

        var lodash = _.runInContext(_.assign({}, root, {
          'Date': function() {
            return { 'getTime': getTime, 'valueOf': getTime };
          }
        }));

        var funced = lodash[methodName](function() {
          callCount++;
        }, 32);

        funced();

        setTimeout(function() {
          funced();
          strictEqual(callCount, isThrottle ? 2 : 1);
          QUnit.start();
        }, 64);
      }
      else {
        skipTest();
        QUnit.start();
      }
    });

    asyncTest('_.' + methodName + ' should support cancelling delayed calls', 1, function() {
      if (!(isRhino && isModularize)) {
        var callCount = 0;

        var funced = func(function() {
          callCount++;
        }, 32, { 'leading': false });

        funced();
        funced.cancel();

        setTimeout(function() {
          strictEqual(callCount, 0);
          QUnit.start();
        }, 64);
      }
      else {
        skipTest();
        QUnit.start();
      }
    });
  });


  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.compose');

  (function() {
    test('should create a function that is the composition of the provided functions', 1, function() {
      var realNameMap = {
        'pebbles': 'penelope'
      };

      var format = function(name) {
        name = realNameMap[name.toLowerCase()] || name;
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      };

      var greet = function(formatted) {
        return 'Hiya ' + formatted + '!';
      };

      // var welcome = _.compose(greet, format);
      var welcome = f(greet).compose(format);
      strictEqual(welcome('pebbles'), 'Hiya Penelope!');
    });

    test('should return a new function', 1, function() {
      notStrictEqual(_.compose(_.noop), _.noop);
    });

    // Won't be able to replicate this behavior, skip test.
    //
    // test('should return a noop function when no arguments are provided', 2, function() {
    //   var composed = _.compose();

    //   try {
    //     strictEqual(composed(), undefined);
    //   } catch(e) {
    //     ok(false);
    //   }
    //   notStrictEqual(composed, _.noop);
    // });

    // Ditto.
    //
    // test('should return a wrapped value when chaining', 1, function() {
    //   if (!isNpm) {
    //     var actual = _(_.noop).compose();
    //     ok(actual instanceof _);
    //   }
    //   else {
    //     skipTest();
    //   }
    // });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('partial methods');

  _.each(['partial', 'partialRight'], function(methodName) {
    // var func = _[methodName],
        isPartial = methodName == 'partial';

    test('`_.' + methodName + '` partially applies arguments', 1, function() {
      // var par = func(_.identity, 'a');
      var par = f(identity)[methodName}("a");
      strictEqual(par(), 'a');
    });

    test('`_.' + methodName + '` creates a function that can be invoked with additional arguments', 1, function() {
      var expected = ['a', 'b'],
          fn = f(function(a, b) { return [a, b]; }),
          // par = func(fn, 'a');
          par = fn[methodName]("a");

      deepEqual(par('b'), isPartial ? expected : expected.reverse());
    });

    test('`_.' + methodName + '` works when there are no partially applied arguments and the created function is invoked without additional arguments', 1, function() {
      var fn = f(function() { return arguments.length; }),
          par = fn[methodName]();

      strictEqual(par(), 0);
    });

    test('`_.' + methodName + '` works when there are no partially applied arguments and the created function is invoked with additional arguments', 1, function() {
      // var par = func(_.identity);
      var par = f( identity ).partial()
      strictEqual(par('a'), 'a');
    });

    // not going to support placeholders at this point...
    //
    // test('`_.' + methodName + '` should support placeholders', 4, function() {
    //   if (!isModularize) {
    //     var fn = function() { return slice.call(arguments); },
    //         par = func(fn, _, 'b', _);

    //     deepEqual(par('a', 'c'), ['a', 'b', 'c']);
    //     deepEqual(par('a'), ['a', 'b', undefined]);
    //     deepEqual(par(), [undefined, 'b', undefined]);

    //     if (isPartial) {
    //       deepEqual(par('a', 'c', 'd'), ['a', 'b', 'c', 'd']);
    //     } else {
    //       par = func(fn, _, 'c', _);
    //       deepEqual(par('a', 'b', 'd'), ['a', 'b', 'c', 'd']);
    //     }
    //   }
    //   else {
    //     skipTest(4);
    //   }
    // });

    test('`_.' + methodName + '` should not alter the `this` binding', 3, function() {
      var fn = f(function() { return this.a; }),
          object = { 'a': 1 };

      // var par = func(_.bind(fn, object));
      var par = fn.bind( object )[methodName]()
      strictEqual(par(), object.a);

      par = _.bind(func(fn), object);
      strictEqual(par(), object.a);

      object.par = fn[methodName]();
      strictEqual(object.par(), object.a);
    });

    test('`_.' + methodName + '` creates a function with a `length` of `0`', 1, function() {
      var fn = function(a, b, c) {},
          par = func(fn, 'a');

      strictEqual(par.length, 0);
    });

    test('`_.' + methodName + '` ensure `new partialed` is an instance of `func`', 2, function() {
      function Foo(value) {
        return value && object;
      }

      var object = {},
          par = func(Foo);

      ok(new par instanceof Foo);
      strictEqual(new par(true), object);
    });

    test('`_.' + methodName + '` should clone metadata for created functions', 3, function() {
      var greet = function(greeting, name) {
        return greeting + ' ' + name;
      };

      var par1 = func(greet, 'hi'),
          par2 = func(par1, 'barney'),
          par3 = func(par1, 'pebbles');

      strictEqual(par1('fred'), isPartial ? 'hi fred' : 'fred hi');
      strictEqual(par2(), isPartial ? 'hi barney'  : 'barney hi');
      strictEqual(par3(), isPartial ? 'hi pebbles' : 'pebbles hi');
    });

    test('`_.' + methodName + '` should work with curried methods', 2, function() {
      var fn = function(a, b, c) { return a + b + c; },
          curried = _.curry(func(fn, 1), 2);

      strictEqual(curried(2, 3), 6);
      strictEqual(curried(2)(3), 6);
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.partialRight');

  (function() {
    test('should work as a deep `_.defaults`', 1, function() {
      var object = { 'a': { 'b': 1 } },
          source = { 'a': { 'b': 2, 'c': 3 } },
          expected = { 'a': { 'b': 1, 'c': 3 } };

      var defaultsDeep = _.partialRight(_.merge, function deep(value, other) {
        return _.merge(value, other, deep);
      });

      deepEqual(defaultsDeep(object, source), expected);
    });
  }());


  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.curry');

  (function() {
    function fn(a, b, c, d) {
      return slice.call(arguments);
    }

    test('should curry based on the number of arguments provided', 3, function() {
      var curried = _.curry(fn),
          expected = [1, 2, 3, 4];

      deepEqual(curried(1)(2)(3)(4), expected);
      deepEqual(curried(1, 2)(3, 4), expected);
      deepEqual(curried(1, 2, 3, 4), expected);
    });

    test('should work with partialed methods', 2, function() {
      var curried = _.curry(fn),
          expected = [1, 2, 3, 4];

      var a = _.partial(curried, 1),
          b = _.bind(a, null, 2),
          c = _.partialRight(b, 4),
          d = _.partialRight(b(3), 4);

      deepEqual(c(3), expected);
      deepEqual(d(), expected);
    });

    test('should support placeholders', 4, function() {
      if (!isModularize) {
        var curried = _.curry(fn);
        deepEqual(curried(1)(_, 3)(_, 4)(2), [1, 2, 3, 4]);
        deepEqual(curried(_, 2)(1)(_, 4)(3), [1, 2, 3, 4]);
        deepEqual(curried(_, _, 3)(_, 2)(_, 4)(1), [1, 2, 3, 4]);
        deepEqual(curried(_, _, _, 4)(_, _, 3)(_, 2)(1), [1, 2, 3, 4]);
      }
      else {
        skipTest(4);
      }
    });

    test('should return a function with a `length` of `0`', 6, function() {
      _.times(2, function(index) {
        var curried = index ? _.curry(fn, 4) : _.curry(fn);
        strictEqual(curried.length, 0);
        strictEqual(curried(1).length, 0);
        strictEqual(curried(1, 2).length, 0);
      });
    });

    test('ensure `new curried` is an instance of `func`', 2, function() {
      function Foo(value) {
        return value && object;
      }

      var curried = _.curry(Foo),
          object = {};

      ok(new curried(false) instanceof Foo);
      strictEqual(new curried(true), object);
    });

    test('should not alter the `this` binding', 9, function() {
      function fn(a, b, c) {
        var value = this || {};
        return [value[a], value[b], value[c]];
      }

      var object = { 'a': 1, 'b': 2, 'c': 3 },
          expected = [1, 2, 3];

      deepEqual(_.curry(_.bind(fn, object), 3)('a')('b')('c'), expected);
      deepEqual(_.curry(_.bind(fn, object), 3)('a', 'b')('c'), expected);
      deepEqual(_.curry(_.bind(fn, object), 3)('a', 'b', 'c'), expected);

      deepEqual(_.bind(_.curry(fn), object)('a')('b')('c'), Array(3));
      deepEqual(_.bind(_.curry(fn), object)('a', 'b')('c'), Array(3));
      deepEqual(_.bind(_.curry(fn), object)('a', 'b', 'c'), expected);

      object.curried = _.curry(fn);
      deepEqual(object.curried('a')('b')('c'), Array(3));
      deepEqual(object.curried('a', 'b')('c'), Array(3));
      deepEqual(object.curried('a', 'b', 'c'), expected);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.memoize');

  (function() {
    test('should memoize results based on the first argument provided', 2, function() {
      var memoized = _.memoize(function(a, b, c) {
        return a + b + c;
      });

      strictEqual(memoized(1, 2, 3), 6);
      strictEqual(memoized(1, 3, 5), 6);
    });

    test('should support a `resolver` argument', 2, function() {
      var fn = function(a, b, c) { return a + b + c; },
          memoized = _.memoize(fn, fn);

      strictEqual(memoized(1, 2, 3), 6);
      strictEqual(memoized(1, 3, 5), 9);
    });

    test('should not set a `this` binding', 2, function() {
      var memoized = _.memoize(function(a, b, c) {
        return a + this.b + this.c;
      });

      var object = { 'b': 2, 'c': 3, 'memoized': memoized };
      strictEqual(object.memoized(1), 6);
      strictEqual(object.memoized(2), 7);
    });

    test('should throw a TypeError if `resolve` is truthy and not a function', function() {
      raises(function() { _.memoize(_.noop, {}); }, TypeError);
    });

    test('should not throw a TypeError if `resolve` is falsey', function() {
      var expected = _.map(falsey, _.constant(true));

      var actual = _.map(falsey, function(value, index) {
        try {
          return _.isFunction(index ? _.memoize(_.noop, value) : _.memoize(_.noop));
        } catch(e) { }
      });

      deepEqual(actual, expected);
    });

    test('should check cache for own properties', 1, function() {
      var actual = [],
          memoized = _.memoize(_.identity);

      _.each(shadowedProps, function(value) {
        actual.push(memoized(value));
      });

      deepEqual(actual, shadowedProps);
    });

    test('should expose a `cache` object on the `memoized` function', 4, function() {
      _.times(2, function(index) {
        var resolver = index && _.identity,
            memoized = _.memoize(_.identity, resolver);

        memoized('a');
        strictEqual(memoized.cache.a, 'a');

        memoized.cache.a = 'b';
        strictEqual(memoized('a'), 'b');
      });
    });

    test('should skip the `__proto__` key', 4, function() {
      _.times(2, function(index) {
        var count = 0,
            resolver = index && _.identity;

        var memoized = _.memoize(function() {
          count++;
          return [];
        }, resolver);

        memoized('__proto__');
        memoized('__proto__');

        strictEqual(count, 2);
        ok(!(memoized.cache instanceof Array));
      });
    });
  }());


  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.defer');

  (function() {
    asyncTest('should defer `func` execution', 1, function() {
      if (!(isRhino && isModularize)) {
        var pass = false;
        _.defer(function(){ pass = true; });

        setTimeout(function() {
          ok(pass);
          QUnit.start();
        }, 128);
      }
      else {
        skipTest();
        QUnit.start();
      }
    });

    asyncTest('should accept additional arguments', 1, function() {
      if (!(isRhino && isModularize)) {
        var args;

        _.defer(function() {
          args = slice.call(arguments);
        }, 1, 2, 3);

        setTimeout(function() {
          deepEqual(args, [1, 2, 3]);
          QUnit.start();
        }, 128);
      }
      else {
        skipTest();
        QUnit.start();
      }
    });

    asyncTest('should be cancelable', 1, function() {
      if (!(isRhino && isModularize)) {
        var pass = true;

        var timerId = _.defer(function() {
          pass = false;
        });

        clearTimeout(timerId);

        setTimeout(function() {
          ok(pass);
          QUnit.start();
        }, 128);
      }
      else {
        skipTest();
        QUnit.start();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.delay');

  (function() {
    asyncTest('should delay `func` execution', 2, function() {
      if (!(isRhino && isModularize)) {
        var pass = false;
        _.delay(function(){ pass = true; }, 96);

        setTimeout(function() {
          ok(!pass);
        }, 32);

        setTimeout(function() {
          ok(pass);
          QUnit.start();
        }, 160);
      }
      else {
        skipTest(2);
        QUnit.start();
      }
    });

    asyncTest('should accept additional arguments', 1, function() {
      if (!(isRhino && isModularize)) {
        var args;

        _.delay(function() {
          args = slice.call(arguments);
        }, 32, 1, 2, 3);

        setTimeout(function() {
          deepEqual(args, [1, 2, 3]);
          QUnit.start();
        }, 128);
      }
      else {
        skipTest();
        QUnit.start();
      }
    });

    asyncTest('should be cancelable', 1, function() {
      if (!(isRhino && isModularize)) {
        var pass = true;

        var timerId = _.delay(function() {
          pass = false;
        }, 32);

        clearTimeout(timerId);

        setTimeout(function() {
          ok(pass);
          QUnit.start();
        }, 128);
      }
      else {
        skipTest();
        QUnit.start();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

})();