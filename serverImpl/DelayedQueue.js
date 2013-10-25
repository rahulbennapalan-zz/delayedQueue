var crypto = require('crypto');
var QueueElement = require("./QueueElement.js");

// Constructor
function DelayedQueue() {
	// initialize queue
	this.queue = [];
	console.log('Queue Initialized');
}

// class methods
DelayedQueue.prototype.put = function(attr, time, host, callback) {
	try {

		var id = crypto.createHash("md5").update(attr).digest("hex");
		qElement = new QueueElement(attr, time, id, host);
		var flag = false;
		for ( var i = 0; i < this.queue.length; i++) {
			if (this.queue[i].getTime() <= time) {
				this.queue.splice(i, 0, qElement);
				flag = true;
				break;
			}
		}
		if (flag === false)
			this.queue.push(qElement);

		console.log('[' + qElement.getData() + '] Inserted');
		callback(qElement.getId());

	} catch (e) {
		console.log('Some Internal Error Occured While Insertion[' + attr + ']: ' + e);
		callback(null, 'Some Internal Error Occured While Insertion[' + attr + ']');
	}
};

DelayedQueue.prototype.get = function(callback, host) {
	try {
		var attr = null;
		if (this.queue.length === 0) {
			callback(null, 'Queue Empty');
			console.log('Queue Empty');
		} else {
			var time = new Date().getTime();
			if (host === undefined || host === null) {
				if (this.queue[this.queue.length - 1].getTime() <= time)
					attr = this.queue.pop().getData();
			} else {
				for ( var i = this.queue.length - 1; i >= 0; i--) {
					if (this.queue[i].getHost() === host) {
						if (this.queue[i].getTime() <= time) {
							attr = this.queue[i].getData();
							this.queue.splice(i, 1);
						}
						break;
					}
				}
			}

			if (attr === undefined || attr === null) {
				callback(null, 'Queue Empty');
				console.log('Queue Empty');
			} else {
				callback(attr);
				console.log('[' + attr + '] Removed');
			}
		}
	} catch (e) {
		console.log('Some Internal Error Occured: ' + e);
		callback(null, 'Some Internal Error Occured');
	}
};

DelayedQueue.prototype.clear = function(callback, host, id) {
	try {
		var i;
		var flag = false;
		if (id === undefined || id === null) {
			for (i = 0; i < this.queue.length;) {
				if (this.queue[i].getHost() === host) {
					this.queue.splice(i, 1);
					flag = true;
				} else {
					i++;
				}
			}

			if (flag === false) {
				console.log('Queue Empty');
				callback(null, 'Queue Empty');
			} else {
				callback('Queue Cleared');
				console.log('Queue Cleared');
			}
		} else {
			for (i = 0; i < this.queue.length;) {
				if (this.queue[i].getHost() === host && this.queue[i].getId() === id) {
					this.queue.splice(i, 1);
					flag = true;
					break;
				} else {
					i++;
				}
			}

			if (flag === false) {
				console.log('Elemet With Id[' + id + '] Not found');
				callback(null, 'Elemet With Id[' + id + '] Not found');
			} else {
				callback('Elemet With Id[' + id + '] Deleted');
				console.log('Elemet With Id[' + id + '] Deleted');
			}
		}

	} catch (e) {
		console.log('Some Internal Error Occured: ' + e);
		callback(null, 'Some Internal Error Occured');
	}
};

// export the class
module.exports = DelayedQueue;