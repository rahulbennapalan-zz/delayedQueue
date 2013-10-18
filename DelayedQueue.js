// Constructor
function DelayedQueue() {
	// initialize queue
	var Queue = require("./Queue");
	this.queue = new Queue();
}

// class methods
DelayedQueue.prototype.put = function(attr, callback, delay) {
	try {
		
		if (delay === null || delay === '0') {
			this.queue.enqueue(attr);
			console.log('[' + attr + '] Inserted');
			callback('[' + attr + '] Inserted');
		} else {
			setTimeout(function(_queue) {
				_queue.enqueue(attr);
				console.log('[' + attr + '] Inserted');
			}, delay, this.queue);
			console.log('[' + attr + '] Insertion Initiated');
			callback('[' + attr + '] Insertion Initiated');
		}
		
	} catch (e) {
		console.log('Some Internal Error Occured While Insertion[' + attr + ']: '+ e);
		callback(null, 'Some Internal Error Occured While Insertion[' + attr + ']');
	}
};

DelayedQueue.prototype.get = function(callback) {
	try {
		var attr = this.queue.dequeue();
		if (attr === undefined) {
			callback(null, 'Queue Empty');
			console.log('Queue Empty');
		} else {
			callback(attr);
			console.log('[' + attr + '] Removed');
		}
	} catch (e) {
		console.log('Some Internal Error Occured: '+ e);
		callback(null, 'Some Internal Error Occured');
	}
};

DelayedQueue.prototype.clear = function(callback) {
	try {
		this.queue.dequeueAll();
		callback('Queue Cleared');
		console.log('Queue Cleared');
	} catch (e) {
		console.log('Some Internal Error Occured: '+ e);
		callback(null, 'Some Internal Error Occured');
	}
};

// export the class
module.exports = DelayedQueue;