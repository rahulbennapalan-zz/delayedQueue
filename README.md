#sample code

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

#sample output

Queue Initialized
{
    "status": "OK",
    "id": "c4ca4238a0b923820dcc509a6f75849b"
}

{
    "status": "OK",
    "id": "c81e728d9d4c2f636f067f89cc14862c"
}

{
    "status": "OK",
    "id": "eccbc87e4b5ce2fe28308fd9f2a7baf3"
}

{
    "status": "OK",
    "message": "[1] removed",
    "data": "1"
}

{
    "status": "OK",
    "message": "[3] removed",
    "data": "3"
}

{
    "status": "OK",
    "message": "[2] removed",
    "data": "2"
}
