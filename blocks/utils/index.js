/* global _ */

/**
 * Determines if _ is lodash or not
 */
export const isLodash = () => {
	let isLodash = false;

	// If _ is defined and the function _.forEach exists then we know underscore OR lodash are in place
	if ( 'undefined' != typeof( _ ) && 'function' == typeof( _.forEach ) ) {

		// A small sample of some of the functions that exist in lodash but not underscore
		const funcs = [ 'get', 'set', 'at', 'cloneDeep' ];

		// Simplest if assume exists to start
		isLodash  = true;

		funcs.forEach( function ( func ) {
			// If just one of the functions do not exist, then not lodash
			isLodash = ( 'function' != typeof( _[ func ] ) ) ? false : isLodash;
		} );
	}

	if ( isLodash ) {
		// We know that lodash is loaded in the _ variable
		return true;
	} else {
		// We know that lodash is NOT loaded
		return false;
	}
};

/**
 * Throttle the given {func} so that it only runs once per {wait}.
 * @param {function} func    Function to be throttled.
 * @param {integer}  wait    Interval time in milliseconds.
 * @param {object}   options Pass { trailing: true } to execute {func} at the end of each interval instead of at the start.
 */
export const throttle = ( func, wait, options ) => {
	var context, args, result;
	var timeout = null;
	var previous = 0;
	if ( ! options ) options = {};

	var later = function () {
		previous = options.leading === false ? 0 : Date.now();
		timeout = null;
		result = func.apply( context, args );
		if ( ! timeout ) context = args = null;
	};
	return function () {
		var now = Date.now();
		if ( ! previous && options.leading === false ) previous = now;
		var remaining = wait - ( now - previous );
		context = this;
		args = arguments;
		if ( remaining <= 0 || remaining > wait ) {
			if ( timeout ) {
				clearTimeout( timeout );
				timeout = null;
			}
			previous = now;
			result = func.apply( context, args );
			if ( ! timeout ) context = args = null;
		} else if ( ! timeout && options.trailing !== false ) {
			timeout = setTimeout( later, remaining );
		}
		return result;
	};
};

/**
 * Check if given element is visible in viewport.
 * @param {element} el Element to check for visibility
 */
export const isVisible = ( el ) => {
	const coords = el.getBoundingClientRect();

	if ( coords ) {
		return (
			(
				coords.top >= 0 &&
				coords.top <= ( window.innerHeight || document.documentElement.clientHeight )
			)
			||
			(
				coords.bottom >= 0 &&
				coords.bottom <= ( window.innerHeight || document.documentElement.clientHeight )
			)
		);
	}

	return false;
};

/**
 * Get pixel distance for `element` from top of document.
 * @param {element} el Element to check for distance
 */
export const getDistance = ( el ) => {
	let distance = el.offsetTop || 0;
	let parent = el.offsetParent;

	if ( parent ) {
		do {
			distance += parent.offsetTop;
			parent = parent.offsetParent;
		} while ( parent );
	}

	return distance;
};
