// Create Class (Framework Agnostic)
window.createClass = function(arg1, arg2) {
	var subclass = function() {};
	var newclass = function() {
		if (typeof this.init === 'function') {
			this.init.apply(this, arguments);
		}
	};
	
	var parent = null;
	var properties = {};
	
	// Sort out the arguments.
	if (typeof arg1 === 'object') {
		properties = arg1;
	} else {
		if (typeof arg1 === 'function' && typeof arg2 === 'object') {
			parent = arg1;
			properties = arg2;
		} else {
			throw 'Invalid params.';
		}
	}
	
	// If a parent class was provided, use subclass to create another link in the prototype chain.
	if (parent) {
		subclass.prototype = parent.prototype;
		newclass.prototype = new subclass();
	}
	
	// Copy the provided properties into the new class' prototype.
	for (var key in properties) {
		if (properties.hasOwnProperty(key)) {
			newclass.prototype[key] = properties[key];
		}
	}
	
	// Save a reference to the parent (super) class in the sub class.
	if (parent && !newclass.prototype.hasOwnProperty('_super')) {
		newclass.prototype._super = subclass.prototype;
	}
	
	// Return the new class.
	return newclass;
};