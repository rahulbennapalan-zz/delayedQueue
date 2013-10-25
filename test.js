var Queue = require("./Queue");
Queue = new Queue("127.0.0.1", 9901);

var onResponse = function(response) {
	console.log(response);
};

Queue.enqueue("1", onResponse, new Date().getTime() + 10000);

Queue.enqueue("2", onResponse, new Date().getTime() + 12000);

Queue.enqueue("3", onResponse, new Date().getTime() + 10000);

Queue.startProcessing(onResponse, 1000, true);

setTimeout(function() {
	Queue.stopProcessing();
}, 15000);