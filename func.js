/*! func v0.0.0 - MIT license */
'use strict';

var f = ( function() {

  function factory( fn ) {
    var func = function() {
      return fn.apply( this, arguments );
    };
    func._original = fn;
    mixin( func, methods );
    return func;
  };

  function mixin( target, source ) {
    var key;
    for ( key in source ) {
      target[key] = source[key];
    }
  }

  var slice = Function.prototype.call.bind( Array.prototype.slice );

  var methods = {};

  methods.curry = function() {

  };

  methods.partial = function() {
    var args = slice( arguments );
    return function() {
      return this.apply( this, args.concat( slice( arguments ) ) );
    };
  };

  methods.flip = function() {
    return function() {
      var args = slice( arguments ).reverse();
      return this.apply( this, args );
    }
  }

  return factory;

})();
