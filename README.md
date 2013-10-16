#test

var DelayedQueue = require("./DelayedQueue");

var testQueue = new DelayedQueue();

testQueue.put("test");

testQueue.put("test1", 100);

testQueue.get();
