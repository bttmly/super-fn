/*! func v0.0.0 - MIT license */
"use strict";

module.exports = ( function() {

  var _ = require( "./lodash.functions.min.js" );

  function isFunction( value ) {
    return typeof value === "function";
  }

  function factory( fn ) {
    if ( !isFunction( value ) ) {
      throw new TypeError( "The SuperFn factory needs a function." );
    }

    var func = function() {
      return fn.apply( this, arguments );
    };
    
    func._original = fn;
    mixin( func, methods );
    members.push( func );
    return func;
  }

  function mixin( target, source ) {
    var key;
    for ( key in source ) {
      target[key] = source[key];
    }
  }

  function isFunction( obj ) {
    return typeof obj === "function";
  }

  function unshiftArgs( argsObj, item ) {
    var arr = slice( argsObj )
    arr.unshift( item );
    return arr;
  }

  var slice = Function.prototype.call.bind( Array.prototype.slice );

  var members = [];

  var methodNames = [
    "throttle",
    "debounce",
    "curry",
    "partial",
    "partialRight",
    "compose",
    "delay",
    "defer",
    "memoize"
  ];

  var methods = {};

  methods.bind = function( context ) {
    var self = this;
    return factory( function() {
      return self.apply( arguments, context );
    });
  }

  methodNames.forEach( function( fn ) {
    methods[fn] = function() {
      var args = unshiftArgs( arguments, this );
      return factory( _[fn].apply( null, args ) );
    };
  });

  factory.addMethod = function( name, value, noUpdate ) {

    // can't overwrite existing methods.
    if ( name in methods ) {
      throw new Error( "A method already exists with that name." );
    }

    // if the new method returns functions, 
    // those functions get run through the factory
    methods[name] = function() {
      var result = value.apply( this, arguments );
      return ( isFunction( result ) ) ? factory( result ) : result;
    };

    // default behavior is to add new methods to all super functions.
    if ( !noUpdate ) {
      members.forEach( function( fn ){
        fn[name] = value;
      });
    }
  };

  // utility function
  factory.demethodize = function( fn ) {
    return Function.prototype.call.bind( fn );
  };

  return factory;

})();
