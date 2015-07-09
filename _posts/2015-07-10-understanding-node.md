---
layout:	post
title:	Understanding Node
date:	2015-07-10 10:46
categories:	Javascript
---

Recently NodeJs is the next happening stuff in the technology world. I try to explore what this baby is all about.

###What's Node?
NodeJs provides a **purely evented, non-blocking infrastructure** to script **highly concurrent** programs.

Node is :

* Server-side Javascript platform
* Build on Google's V8 engine, used by Googles Chrome browser
* Event driven
* non-blocking I/O
* [Uses CommonJs module system](http://webpack.github.io/docs/commonjs.html){:target="_blank"} -- <small>Module format to solve JavaScript scope issues by making sure each module is executed in its own namespace.</small>
* Written mainly C/C++ and Javascript

### Why Non-blocking I/O?

Web application offent does a connection to a database or other I/O activity during which the software is just waiting for the response. 
<img src="/images/blog/webServerUsingThreads.png" Alt="Webserver using thread " width="600px">

This can be multi tasked by having different threads of execution running.

A [comparison](http://wiki.dreamhost.com/Web_Server_Performance_Comparison){:target="_blank"} between Apache web server and Nginx shows: 
<img src="/images/blog/webserverRequestsGraph.jpg" Alt="Apache Nginx request graph" width="300px">
<img src="/images/blog/webserverMemoryGraph.jpg" Alt="Apache Nginx memory graph" width="300px">

Point to note here is Apache uses threads while Nginx uses event loop for concurrency.

Thus with concurrency using threads or coroutines one can see:

* Throughput <small>(request / sec)</small> reduceses as number of users increases - Context switching is not free 
* Memory footprint increases as number of concurrent uses increase - Execution stacks takes up memory 

Threaded concurrency needs handling of memory issues, thread blocking issues.

Event loop based approach is the best for highly concurrent programs. 

#### What's event loop?

<img src="/images/blog/webServerUsingEventLoop.png" Alt="Webserver using thread " width="600px">

In an event loop the server uses single thread to run a loop for checking different events occuring like request received, data ready etc. As a particular event occurs the event loop catches it and immediately hands over the processing to another execution thread along with a call back function stating once you are done call back this function. When the call back function is called the event loop again catches it back completes the process.

**Single threaded event loops require I/O to be non-blocking.**

If a blocking I/O takes places within the loop it cannot process any other request as its single threaded and all the other request get rejected.

Javascript is designed specially to be used with an event loop:

* Anonymous functions, closures
* Only one callback at a time
* I/O through DOM event callbacks

**Node uses non-blocking and event loop concept internally that optimizes an application's throughput and scalability.**
