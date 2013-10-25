// initialize queue
var DelayedQueue = require("./DelayedQueue");
var queue = new DelayedQueue();
var url = require('url');

var url = require('url');
var http = require('http');
http.createServer(function(req, res) {
	var response = {};
	var url_parts;
	var host = req.connection.remoteAddress;
	try {
		if (req.method == 'GET') {
			url_parts = url.parse(req.url, true);
			var owner = url_parts.query.owner;
			if(owner !== 'true')
				host = null;
			queue.get(function(attr, err) {
				if(err) {
					response.status = "FAIL";
					response.message = err;
				} else {
					response.status = "OK";
					response.message = '['+attr+'] removed';
					response.data = attr;
				}
				res.end(JSON.stringify(response, null, 4) + '\n');
			}, host);
		} else if (req.method == 'POST') {
			req.on('data', function(data) {
				dataStatus = true;
				var splits = data.toString().split('&');
				var attr = null;
				var time = new Date().getTime();
				for ( var i = 0; i < splits.length; i++) {
					var iSplit = splits[i].split('=');
					if (iSplit[0] === 'data')
						attr = iSplit[1];
					else if (iSplit[0] === 'time')
						time = iSplit[1];
				}

				if (attr !== null) {
					queue.put(attr, time, host, function(message, err) {
						if(err) {
							response.status = "FAIL";
							response.message = err;
						} else {
							response.status = "OK";
							response.id = message;
						}
						res.end(JSON.stringify(response, null, 4) + '\n');
					}, time);
				}else {
					response.status = "FAIL";
					response.message = "Invalid Request";
					res.end(JSON.stringify(response, null, 4) + '\n');
				}
			});
			
			req.on('end', function() {
				response.status = "FAIL";
				response.message = "Invalid Request";
				res.end(JSON.stringify(response, null, 4) + '\n');
			});
		} else if (req.method == 'DELETE') {
			url_parts = url.parse(req.url, true);
			var id = url_parts.query.id;
			queue.clear(function(message, err) {
				if(err) {
					response.status = "FAIL";
					response.message = err;
				} else {
					response.status = "OK";
					response.message = message;
				}
				res.end(JSON.stringify(response, null, 4) + '\n');
			}, host, id);
		} else {
			response.status = "FAIL";
			response.message = "Invalid Request";
			res.end(JSON.stringify(response, null, 4) + '\n');
		}
	} catch (err) {
		response.status = "FAIL";
		response.message = "Some Internal Error Occured";
		console.log("Some Internal Error Occured:" + err);
		res.end(JSON.stringify(response, null, 4) + '\n');
	}
}).listen(9901, "127.0.0.1");
console.log("Delayed Queue Server Running");