var Queue = require("./Queue");
Queue = new Queue("127.0.0.1", 9901);
var http = require('http');

Queue.enqueue("1", function(res) {
	console.log(res);
}, new Date().getTime()+10000);

Queue.enqueue("2", function(res) {
	console.log(res);
}, new Date().getTime()+12000);
Queue.enqueue("3", function(res) {
	console.log(res);
}, new Date().getTime()+10000);



onResponse = function(response) {
	response.on('data', function(data) {
	console.log(data.toString());
	});
};


//Queue.remove(onResponse, 'c4ca4238a0b923820dcc509a6f75849b');
Queue.startProcessing(onResponse, 1000, true);

setTimeout(function() {
	Queue.stopProcessing();
}, 15000);