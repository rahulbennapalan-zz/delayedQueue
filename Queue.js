// Constructor
function Queue() {
	// initialization
	this.queue = [];
	console.log("queue initialized");
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

// export the class
module.exports = Queue;