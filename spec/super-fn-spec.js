/* global func, describe, it, expect, should */

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

function noop() {}

function add( a, b ) {
  return a + b;
}

describe("superFn()", function() {
  "use strict";

  it( "exists", function() {
    expect( superFn ).to.be.a("function");
  });

  it( "returns a function", function() {
    expect( superFn( add ) ).to.be.a( "function" );
  });

  it( "throws when it doesn't get a function", function() {
    expect( superFn( {} ) ).to.throw( TypeError );
  });

  it( "has the methods 'throttle', 'debounce', 'curry', 'partial', 'partialRight', 'compose', 'delay', 'defer', and 'memoize'.", function() {
    var fNoop = superFn( noop );
    expect( 
      methodNames.every( function( method ) {
        if ( typeof fNoop[method] === "function" ) {
          return true;
        }
        return false
      })
    ).to.be.true;
  });
  
});

describe( "throttle" )
