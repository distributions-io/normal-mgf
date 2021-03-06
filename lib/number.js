'use strict';

// FUNCTIONS //

var exp = Math.exp,
	pow = Math.pow;


// MGF //

/**
* FUNCTION: mgf( x, mu, sigma )
*	Evaluates the moment-generating function (MGF) for a normal distribution with mean `mu` and standard deviation `sigma` at a value `t`.
*
* @param {Number} t - input value
* @param {Number} mu - mean
* @param {Number} sigma - standard deviation
* @returns {Number} evaluated MGF
*/
function mgf( t, mu, sigma ) {
	return exp( mu * t + 0.5 * pow( sigma * t, 2 ) );
} // end FUNCTION mgf()


// EXPORTS //

module.exports = mgf;
