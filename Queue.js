// Constructor
function Queue() {
	// initialization
	this.queue = [];
	console.log("Queue Initialized");
	return this;
}

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

// export the class
module.exports = Queue;