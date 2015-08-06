'use strict';

// FUNCTIONS //

var exp = Math.exp,
	pow = Math.pow;


// PARTIAL //

/**
* FUNCTION: partial( mu, sigma )
*	Partially applies mean `mu` and standard deviation `sigma` and returns a function for evaluating the moment-generating function (MGF) for a normal distribution.
*
* @param {Number} mu - mean
* @param {Number} sigma - standard deviation
* @returns {Function} MGF
*/
function partial( mu, sigma ) {

	/**
	* FUNCTION: mgf( t )
	*	Evaluates the moment-generating function (MGF) for a normal distribution.
	*
	* @private
	* @param {Number} t - input value
	* @returns {Number} evaluated MGF
	*/
	return function mgf( t ) {
		return exp( mu * t + 0.5 * pow( sigma * t, 2 ) );
	};
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;
