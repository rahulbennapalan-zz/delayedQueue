// Constructor
function DelayedQueue() {
	// initialize queue
	var Queue = require("./Queue");
	this.queue = new Queue();
}

// class methods
DelayedQueue.prototype.put = function(attr, delay) {
	if(delay === null)
		this.queue.enqueue(attr);
	else {
		setTimeout(function(_queue) {
			_queue.enqueue(attr);
			console.log(attr+ ' inserted');
		}, delay, this.queue);
	}
};

DelayedQueue.prototype.get = function() {
	return this.queue.dequeue();
};

// export the class
module.exports = DelayedQueue;