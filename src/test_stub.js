var argv = require('minimist')(process.argv.slice(2));
console.dir(argv);

console.log('argv[a] = ' + argv['a']);
console.log('argv[b] = ' + argv['b']);

console.log('a is ' + (argv['a'] ? true : false));
console.log('b is ' + (argv['b'] ? true : false));

var hash = {"lat":45.50881310951544,"lng":-73.56164216995239,"uid":"JoeDoe","time":1483236014};
console.dir(hash);
