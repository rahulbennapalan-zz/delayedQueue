// Constructor
function QueueElement(attr, time, id, host) {
	// initialization
	this.data = attr;
	this.time = time;
	this.host = host;
	this.id = id;
}

QueueElement.prototype.getData = function() {
	return this.data;
};

QueueElement.prototype.getTime = function() {
	return this.time;
};

QueueElement.prototype.getId = function() {
	return this.id;
};

QueueElement.prototype.getHost = function() {
	return this.host;
};

// export the class
module.exports = QueueElement;