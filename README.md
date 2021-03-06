Moment-Generating Function
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> [Normal](https://en.wikipedia.org/wiki/normal_distribution) distribution moment-generating function (MGF).

The [moment-generating function](https://en.wikipedia.org/wiki/Moment-generating_function) for a [normal](https://en.wikipedia.org/wiki/normal_distribution) random variable is

<div class="equation" align="center" data-raw-text="
	M_X(t) := \mathbb{E}\!\left[e^{tX}\right] = \exp\{ \mu t + \frac{1}{2}\sigma^2t^2 \}" data-equation="eq:mgf_function">
	<img src="https://cdn.rawgit.com/distributions-io/normal-mgf/43f0edf5568d775dcae19d75bbb5964bbcc0de31/docs/img/eqn.svg" alt="Moment-generating function (MGF) for a normal distribution.">
	<br>
</div>

where `mu` is the mean and `sigma > 0` is the standard deviation.

## Installation

``` bash
$ npm install distributions-normal-mgf
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var mgf = require( 'distributions-normal-mgf' );
```

#### mgf( t[, options] )

Evaluates the [moment-generating function](https://en.wikipedia.org/wiki/Moment-generating_function) (MGF) for the [normal](https://en.wikipedia.org/wiki/normal_distribution) distribution. `t` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	mat,
	out,
	t,
	i;

out = mgf( 1 );
// returns ~1.649

out = mgf( -1 );
// returns ~1.649

t = [ 0, 0.5, 1, 1.5, 2, 2.5 ];
out = mgf( t );
// returns [ 1, ~1.133, ~1.649, ~3.08, ~7.389, ~22.76 ]

t = new Int8Array( t );
out = mgf( t );
// returns Float64Array( [1,1,~1.649,~1.649,~7.389,~7.389] )

t = new Float32Array( 6 );
for ( i = 0; i < 6; i++ ) {
	t[ i ] = i * 0.5;
}
mat = matrix( t, [3,2], 'float32' );
/*
	[ 0  0.5
	  1  1.5
	  2  2.5 ]
*/

out = mgf( mat );
/*
	[  1	 ~1.133
	  ~1.649 ~3.08
	  ~7.389 ~22.76 ]
*/
```

The function accepts the following `options`:

*	__mu__: mean. Default: `0`.
*	__sigma__: standard deviation. Default: `1`.
*	 __accessor__: accessor `function` for accessing `array` values.
*	 __dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

A [normal](https://en.wikipedia.org/wiki/normal_distribution) distribution is a function of two parameters: `mu`(mean) and `sigma > 0`(standard deviation). By default, `mu` is equal to `0` and `sigma` is equal to `1`. To adjust either parameter, set the corresponding option.

``` javascript
var t = [ 0, 0.5, 1, 1.5, 2, 2.5 ];

var out = mgf( t, {
	'mu': 1,
	'sigma': 2
});
// returns [ 1, ~2.719, ~20.086, ~403.429, ~22026.466, ~3269017.372 ]
```

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	[0,0],
	[1,0.5],
	[2,1],
	[3,1.5],
	[4,2],
	[5,2.5]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = mgf( data, {
	'accessor': getValue
});
// returns [ 1, ~1.133, ~1.649, ~3.08, ~7.389, ~22.76 ]
```


To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var data = [
	{'x':[0,0]},
	{'x':[1,0.5]},
	{'x':[2,1]},
	{'x':[3,1.5]},
	{'x':[4,2]},
	{'x':[5,2.5]}
];

var out = mgf( data, {
	'path': 'x/1',
	'sep': '/'
});
/*
	[
		{'x':[0,1]},
		{'x':[1,~1.133]},
		{'x':[2,~1.649]},
		{'x':[3,~3.08]},
		{'x':[4,~7.389]},
		{'x':[5,~22.76]}
	]
*/
var bool = ( data === out );
// returns true
```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var t, out;

t = new Int8Array( [0,1,2,3,4] );

out = mgf( t, {
	'dtype': 'int32'
});
// returns Int32Array( [1,1,7,90,2980] )

// Works for plain arrays, as well...
out = mgf( [0,0.5,1,1.5,2], {
	'dtype': 'uint8'
});
// returns Uint8Array( [1,1,1,3,7] )
```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var bool,
	mat,
	out,
	t,
	i;

t = [ 0, 0.5, 1, 1.5, 2 ];

out = mgf( t, {
	'copy': false
});
// returns [ 1, ~1.133, ~1.649, ~3.08, ~7.389, ~22.76 ]

bool = ( t === out );
// returns true

t = new Float32Array( 6 );
for ( i = 0; i < 6; i++ ) {
	t[ i ] = i * 0.5;
}
mat = matrix( t, [3,2], 'float32' );
/*
	[ 0  0.5
	  1  1.5
	  2  2.5 ]
*/

out = mgf( mat, {
	'copy': false
});
/*
	[  1	 ~1.133
	  ~1.649 ~3.08
	  ~7.389 ~22.76 ]
*/

bool = ( mat === out );
// returns true
```


## Notes

*	If an element is __not__ a numeric value, the evaluated [MGF](https://en.wikipedia.org/wiki/normal_distribution) is `NaN`.

	``` javascript
	var data, out;

	out = mgf( null );
	// returns NaN

	out = mgf( true );
	// returns NaN

	out = mgf( {'a':'b'} );
	// returns NaN

	out = mgf( [ true, null, [] ] );
	// returns [ NaN, NaN, NaN ]

	function getValue( d, i ) {
		return d.x;
	}
	data = [
		{'x':true},
		{'x':[]},
		{'x':{}},
		{'x':null}
	];

	out = mgf( data, {
		'accessor': getValue
	});
	// returns [ NaN, NaN, NaN, NaN ]

	out = mgf( data, {
		'path': 'x'
	});
	/*
		[
			{'x':NaN},
			{'x':NaN},
			{'x':NaN,
			{'x':NaN}
		]
	*/
	```

*	Be careful when providing a data structure which contains non-numeric elements and specifying an `integer` output data type, as `NaN` values are cast to `0`.

	``` javascript
	var out = mgf( [ true, null, [] ], {
		'dtype': 'int8'
	});
	// returns Int8Array( [0,0,0] );
	```


## Examples

``` javascript
var mgf = require( 'distributions-normal-mgf' ),
	matrix = require( 'dstructs-matrix' );

var data,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i * 0.5;
}
out = mgf( data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = mgf( data, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': [ i, data[ i ].x ]
	};
}
out = mgf( data, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
data = new Float32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i * 0.5;
}
out = mgf( data );

// Matrices...
mat = matrix( data, [5,2], 'float32' );
out = mgf( mat );

// Matrices (custom output data type)...
out = mgf( mat, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/distributions-normal-mgf.svg
[npm-url]: https://npmjs.org/package/distributions-normal-mgf

[travis-image]: http://img.shields.io/travis/distributions-io/normal-mgf/master.svg
[travis-url]: https://travis-ci.org/distributions-io/normal-mgf

[codecov-image]: https://img.shields.io/codecov/c/github/distributions-io/normal-mgf/master.svg
[codecov-url]: https://codecov.io/github/distributions-io/normal-mgf?branch=master

[dependencies-image]: http://img.shields.io/david/distributions-io/normal-mgf.svg
[dependencies-url]: https://david-dm.org/distributions-io/normal-mgf

[dev-dependencies-image]: http://img.shields.io/david/dev/distributions-io/normal-mgf.svg
[dev-dependencies-url]: https://david-dm.org/dev/distributions-io/normal-mgf

[github-issues-image]: http://img.shields.io/github/issues/distributions-io/normal-mgf.svg
[github-issues-url]: https://github.com/distributions-io/normal-mgf/issues
