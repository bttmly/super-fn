var child = require( "child_process" );
var args = process.argv.slice( 2 );

// global variable name that holds the collection factory function.
var globalName = args[0] || "superFn";
child.exec( "watchify ./src/super-fn.js -s " + globalName + " -o ./super-fn-browser.js" );