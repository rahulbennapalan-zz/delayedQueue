// initialize queue
var DelayedQueue = require("./DelayedQueue");
var queue = new DelayedQueue();

var url = require('url');
var http = require('http');
http.createServer(function(req, res) {
	var response = {};
	try {
		if (req.method == 'GET') {
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
			});
		} else if (req.method == 'POST') {
			req.on('data', function(data) {
				dataStatus = true;
				var splits = data.toString().split('&');
				var attr = null;
				var delay = null;
				for ( var i = 0; i < splits.length; i++) {
					var iSplit = splits[i].split('=');
					if (iSplit[0] === 'data')
						attr = iSplit[1];
					else if (iSplit[0] === 'delay')
						delay = iSplit[1];
				}

				if (attr !== null) {
					queue.put(attr, function(message, err) {
						if(err) {
							response.status = "FAIL";
							response.message = err;
						} else {
							response.status = "OK";
							response.message = message;
						}
						res.end(JSON.stringify(response, null, 4) + '\n');
					}, delay);
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
			queue.clear(function(message, err) {
				if(err) {
					response.status = "FAIL";
					response.message = err;
				} else {
					response.status = "OK";
					response.message = message;
				}
				res.end(JSON.stringify(response, null, 4) + '\n');
			});
		} else {
			response.status = "FAIL";
			response.message = "Invalid Request";
			res.end(JSON.stringify(response, null, 4) + '\n');
		}
	} catch (err) {
		response.status = "FAIL";
		response.message = "Some Internal Error Occured";
		res.end(JSON.stringify(response, null, 4) + '\n');
	}
}).listen(9900, "127.0.0.1");
console.log("Delayed Queue Server Running");