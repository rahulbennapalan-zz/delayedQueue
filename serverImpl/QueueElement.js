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


/*

// enqueue
Queue.prototype.enqueue = function(attr) {
	this.queue.push(attr);
};

// dequeue
Queue.prototype.dequeue = function() {
	return this.queue.pop();
};

// dequeue all
Queue.prototype.dequeueAll = function() {
	this.queue = [];
};
*/
// export the class
module.exports = QueueElement;