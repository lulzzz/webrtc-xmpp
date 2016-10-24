 // TODO get BOSH from server
var BOSH_SERVICE = 'https://conversejs.org/http-bind/';
var connection = null;

function log(msg)
{
    $('#log').append('<div></div>').append(document.createTextNode(msg));
}

function onConnect(status)
{
    if (status == Strophe.Status.CONNECTING) {
	log('XMPP-chat  is connecting.');
    } else if (status == Strophe.Status.CONNFAIL) {
	log('XMPP-chat  failed to connect.');
	$('#connect').get(0).value = 'connect';
    } else if (status == Strophe.Status.DISCONNECTING) {
	log('XMPP-chat  is disconnecting.');
    } else if (status == Strophe.Status.DISCONNECTED) {
	log('XMPP-chat  is disconnected.');
	$('#connect').get(0).value = 'connect';
    } else if (status == Strophe.Status.CONNECTED) {
	log('XMPP-chat is connected.');
	log('XMPP-chat: Send a message to ' + connection.jid +
	    ' to talk to me.');

	connection.addHandler(onMessage, null, 'message', null, null,  null);
	connection.send($pres().tree());
    }
}
function updateChat(direction, message){
    if(message == '') { return false; }
    // Update in-chat area
    var encoder = document.createElement("div");
    encoder.innerText = encoder.textContent = message;
    message = encoder.innerHTML;
    delete encoder;
    var oldscrollHeight = $("#chatbox").attr("scrollHeight") - 20; //Scroll height before the request
    $("#chatbox").append('<br/><span class="' + direction + 'visitor">' + message + '</span>');
    var newscrollHeight = $("#chatbox").attr("scrollHeight") - 20; //Scroll height after the request
    if(newscrollHeight > oldscrollHeight){
        $("#chatbox").animate({ scrollTop: newscrollHeight }, 'normal'); //Autoscroll to bottom of div
    }
}

function onMessage(msg) {
    var to = msg.getAttribute('to');
    var from = msg.getAttribute('from');
    var type = msg.getAttribute('type');
    var elems = msg.getElementsByTagName('body');

    if (type == "chat" && elems.length > 0) {
	var body = elems[0];

	log('XMPP-chat: I got a message from ' + from + ': ' +
	    Strophe.getText(body));
    updateChat('from', Strophe.getText(body))
    }

    // we must return true to keep the handler alive
    // returning false would remove it after it finishes.
    return true;
}

$(document).ready(function () {
    connection = new Strophe.Connection(BOSH_SERVICE);

    // To see the debug output
    //Strophe.log = function (level, msg) { log('LOG: ' + msg); };

	$("#sendbutton").bind('click', function(){
		var sendtext = $("#sendtext").val();
        var tojid = $("#tojid").val();
		// Don't pester the server with empty messages
		var msg = $msg({to: tojid, from: connection.jid, type: 'chat'}).c('body').t(sendtext);
		if(sendtext == '') { return false; }
        connection.send(msg.tree());
		updateChat('to', sendtext);
        $("#sendtext").focus();
    	return false;
    });


    $('#connect').bind('click', function () {
	var button = $('#connect').get(0);
	if (button.value == 'connect') {
	    button.value = 'disconnect';

	    connection.connect($('#jid').get(0).value,
			       $('#pass').get(0).value,
			       onConnect);
	} else {
	    button.value = 'connect';
	    connection.disconnect();
	}
    });
});