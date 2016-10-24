<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>CHAT</title>
    <link type="text/css" rel="stylesheet" href="/static/chatstyle.css" />
    <link type="text/css" rel="stylesheet" href="/static/video.css" />
</head>
<body>

  <hr />
    <div style = 'display:inline-block;'>

        <form method="get" action="" id="form" style = 'display:inline-block;'>
            <div id="container" style = 'display:inline-block;'>
                <div id="title">
                    <h1>Видеочат</h1>
                </div>
                <div id="users">
                    <div class="text">For video-chatting need acces to your webcam</div>
                </div>
                <div id="me" class="video">
                    <video autoplay="autoplay" muted="muted"></video>
##                     <i class="mic" title="Микрофон"></i><i class="vid" title="Камера"></i>
                </div>
            </div>
        </form>

##   <div class="pure-g" style = 'display:inline-block;'>
##       <!-- Video area -->
##       <div class="pure-u-2-3" id="video-container" >
##           <input id = 'vid' style = 'visibility:hidden'/>
##         <video id="remoteStream" autoplay></video>
##         <video id="localStream" muted="true" autoplay></video>
##       </div>
##
##       <!-- Steps -->
##       <div class="pure-u-1-3">
##         <h2>PeerJS Video Chat</h2>
##
##         <!-- Get local audio/video stream -->
##         <div id="step1">
##           <p>Please click `allow` on the top of the screen so we can access your webcam and microphone for calls.</p>
##           <div id="step1-error">
##             <p>Failed to access the webcam and microphone. Make sure to run this demo on an http server and click allow when asked for permission by the browser.</p>
##             <a href="#" class="pure-button pure-button-error" id="step1-retry">Try again</a>
##           </div>
##         </div>
##
##         <!-- Make calls to others -->
##         <div id="step2">
##           <p>Your id: <span id="my-id">${vid}</span></p>
##           <p>Share this id with others so they can call you.</p>
##           <h3>Make a call</h3>
##           <div class="pure-form">
##             <input type="text" id="calltoid">
##             <a href="#" class="pure-button pure-button-success" id="make-call">Call</a>
##           </div>
##         </div>
##
##         <!-- Call in progress -->
##         <div id="step3">
##           <p>Currently in call with <span id="their-id">...</span></p>
##           <p><a href="#" class="pure-button pure-button-error" id="end-call">End call</a></p>
##         </div>
##       </div>
##   </div>

        <div id="wrapper" style = 'display:inline-block;'>
            <div id='login' style='text-align: center'>
                <form name='cred'>
                <label for='jid'>JID:</label>
                <input type='text' id='jid' value=${jid}/>
                <label for='pass'>Password:</label>
                <input type='password' id='pass' value=${jidpass}/>
                <input type='button' id='connect' value='connect' />
                <input  id='tojid'  style = 'visibility:hidden;' value=${tojid} />
                </form>
            </div>
            <div id="menu"></div>
            <div id="chatbox">Your chat: </div>
            <form name="message" action="">
                <input name="sendtext" type="text" id="sendtext" size="63" />
                <input name="action" type="submit"  id="sendbutton" value="Send" />
            </form>
        </div>
   </div>
  <div id='log'></div>
        <script type='text/javascript' src="https://code.jquery.com/jquery-1.11.1.min.js"></script>
        <script type='text/javascript' src="static/js/sock.js"></script>
        <script type='text/javascript' src="static/js/adapter.js"></script>
##         <script type='text/javascript' src="static/js/peer.js"></script>
        <script type='text/javascript' src="static/js/video2.js"></script>
        <script type='text/javascript' src='static/js/strophe.min.js'></script>
        <script type='text/javascript' src='static/js/chat.js'></script>
</body>
</html>