
var stompClient = null;
var response = null;


function connect() {
    //var socket = new SockJS('/stomp-endpoint');
    var socket = new SockJS('/stomp-endpoint');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
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
    response = message.message;
    console.log("Setting response as: " + response);

    //$("#greetings").append("<tr><td>" + message.message + "</td></tr>");
}

function sendRequest(r) {
    response = null;
    console.log("request: " + r);
    stompClient.send("/app/hello", {}, JSON.stringify({'name': r}));
}

async function showExamples2() {
    // [1] show if table 1 is free
    sendRequest("isFree:table:1");
    //while (response == null) {
    //    await new Promise(r => setTimeout(r, 100));
    //}
    console.log("[1]: " + response);

    // [2] add johnny depp's party of two to table 1, he's open to different seating
    sendRequest("queue:table:1:Jonny Depp:919919919:3:true");
    //while (response == null) {
    //    await new Promise(r => setTimeout(r, 100));
    //}
    console.log("[2]: " + response);

    // [3] ALSO add Leonardo's party of one to table 1, he's NOT open to different seating
    sendRequest("queue:table:1:Leonardo:919919919:1:false");
    //while (response == null) {
    //    await new Promise(r => setTimeout(r, 100));
    //}
    console.log("[3]: " + response);

    // [4] get the queue size for table 1, we'd expect 1 person sat and 1 person queued.
    sendRequest("getQueueSize:table:1");
    //while (response == null) {
    //    await new Promise(r => setTimeout(r, 100));
    //}
    console.log("[4]: " + response);

    // [5] get all the tables, and all the people sat or queued at the tables. Long string...
    sendRequest("getAllTables");
    //while (response == null) {
    //    await new Promise(r => setTimeout(r, 100));
    //}
    console.log("[5]: " + response);

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
    $( "#send" ).click(function() {  });
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
