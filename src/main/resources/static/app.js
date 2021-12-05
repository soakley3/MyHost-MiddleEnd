
var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    //var socket = new SockJS('/stomp-endpoint');
    var socket = new SockJS('/stomp-endpoint');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/greetings', function (greeting) {
            showGreeting(JSON.parse(greeting.body));
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    stompClient.send("/app/hello", {}, JSON.stringify({'name': $("#name").val()}));
}

function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message.message + "</td></tr>");
}

function sendRequest(r) {
    console.log("request: " + r);
    stompClient.send("/app/hello", {}, JSON.stringify({'name': r}));
}

window.onload = function () {
    console.log("-AA");
    connect();
    console.log("-BB");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendRequest("isFree:table:1"); });
});


/*var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    //var socket = new SockJS('/stomp-endpoint');
    var socket = new SockJS('/stomp-endpoint');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/greetings', function (greeting) {
            console.log("-A");
            showGreeting(JSON.parse(greeting.body));
            console.log("-B");

        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    stompClient.send("/app/hello", {}, JSON.stringify({'name': $("#name").val()}));
}

function showGreeting(message) {
    console.log("-C");
    $("#greetings").append("<tr><td>" + message.message + "</td></tr>");
    console.log ("RESULT FROM SERVER: " + message.message);
    console.log("-D");
}

// This function sends the `request` and returns the `result` from the server

function serverRequest(requestz) {
    console.log("-D");
    stompClient.send("/app/hello", {}, JSON.stringify({'name': requestz}));
    console.log("-E");
    var result = message.message;
    console.log("-F");
    console.log("result: " + result);
    return result;
}

window.onload = function () {
    console.log("-AA");
    //connect();
    console.log("-BB");
}

$(function () {

    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() {
        console.log("-C");
        sendName();
        //console.log(serverRequest("isFree:table:1"));
        console.log("-G");
    }
);
});
*/
