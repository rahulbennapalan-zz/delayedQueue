var http = require('http');
var querystring = require('querystring');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var processId = null;

// Constructor
function Queue(host, port) {
	// initialization
	this.host = host;
	this.port = port;
	console.log("Queue Initialized");
}

// enqueue
Queue.prototype.enqueue = function(attr, callback, time) {

	if (time === undefined || time === null)
		time = new Date().getTime();

	var data = querystring.stringify({
		'data' : attr,
		'time' : time
	});
	var options = {
		host : this.host,
		port : this.port,
		method : 'POST',
		headers : {
			'Content-Type' : 'application/x-www-form-urlencoded',
			'Content-Length' : data.length
		}
	};

	var onResponse = function(response) {
		response.on('data', function(data) {
			callback(data.toString());
		});
	};

	var request = http.request(options, onResponse);
	request.write(data);
	request.end();

};

// dequeue
Queue.prototype.startProcessing = function(callback, rate, owner) {

	var path;
	if (owner === true)
		path = "/?owner=" + true;
	else
		path = "";

	if (rate === undefined)
		rate = 10000;

	var options = {
		host : this.host,
		port : this.port,
		path : path,
		method : 'GET'
	};

	var onResponse = function(response) {
		response.on('data', function(data) {
			callback(data.toString());
		});
	};

	if (processId === null) {
		processId = setInterval(function() {

			http.request(options, onResponse).end();
		}, rate);
	}

};

// dequeue
Queue.prototype.stopProcessing = function(callback, owner) {
	if(processId !== null) {
		clearInterval(processId);
		processId = null;		
	}
};

// dequeue all
Queue.prototype.remove = function(callback, id) {
	var path;
	if (id === undefined || id === null)
		path = "";
	else
		path = "/?id=" + id;

	var options = {
		host : this.host,
		port : this.port,
		path : path,
		method : 'DELETE'
	};

	var onResponse = function(response) {
		response.on('data', function(data) {
			callback(data.toString());
		});
	};

	http.request(options, onResponse).end();

};

// export the class
module.exports = Queue;
