const throttle = (func, wait, immediate = true) => {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		
		if (timeout != null) return;
		timeout = setTimeout(later, wait);
		if (immediate) func.apply(context, args);
	};
};


export default throttle;