$(function() {
    //TODO get params from server/ajax
    var peer = new Peer(window.location.pathname.replace('/',''), {key: 'b4pc7f67qf1dcxr'});



peer.on('open', function(){
  $('#my-id').text(peer.id);
});

// Receiving a call
peer.on('call', function(call){
  // Answer the call automatically
  call.answer(window.localStream);
  step3(call);
});
peer.on('error', function(err){
  alert(err.message);
  // Return to step 2 if error occurs
  step2();
});

// Click handlers setup
$(function(){
  $('#make-call').click(function(){
    // Initiate a call!
    var call = peer.call($('#calltoid').val(), window.localStream);

    step3(call);
  });

  $('#end-call').click(function(){
    window.existingCall.close();
    step2();
  });

  // Retry if getUserMedia fails
  $('#step1-retry').click(function(){
    $('#step1-error').hide();
    step1();
  });

  // Get things started
  step1();
});

function step1 () {
  // Get audio/video stream
  navigator.getUserMedia({audio: true, video: true}, function(stream){
    // Set your video displays
    $('#localStream').prop('src', URL.createObjectURL(stream));

    window.localStream = stream;
    step2();
  }, function(){ $('#step1-error').show(); });
}

function step2 () {
  $('#step1, #step3').hide();
  $('#step2').show();
}

function step3 (call) {
  // Hang up on an existing call if present
  if (window.existingCall) {
    window.existingCall.close();
  }

  // Wait for stream on the call, then set peer video display
  call.on('stream', function(stream){
    $('#remoteStream').prop('src', URL.createObjectURL(stream));
  });

  // UI stuff
  window.existingCall = call;
  $('#their-id').text(call.peer);
  call.on('close', step2);
  $('#step1, #step2').hide();
  $('#step3').show();
}
});

        // $(document).on("click", "i.mic", function(e) {
        //     e.stopPropagation();
        //     var video = $(this).parent();
        //     if (video.hasClass("active")) {
        //         var isOff = video.hasClass("mic_off");
        //         if (isOff) {
        //             //turn on
        //             video.removeClass("mic_off");
        //             myStream.getAudioTracks()[0].enabled = true;
        //         } else {
        //             //turn off
        //             video.addClass("mic_off");
        //             myStream.getAudioTracks()[0].enabled = false;
        //         }
        //     }
        // });
        // $(document).on("click", "i.vid", function(e) {
        //     e.stopPropagation();
        //     var video = $(this).parent();
        //     if (video.hasClass("active")) {
        //         var isOff = video.hasClass("vid_off");
        //         if (isOff) {
        //             //turn on
        //             video.removeClass("vid_off");
        //             myStream.getVideoTracks()[0].enabled = true;
        //         } else {
        //             //turn off
        //             video.addClass("vid_off");
        //             myStream.getVideoTracks()[0].enabled = false;
        //         }
        //     }
        // });
        // $(document).on("click", ".video", function() {
        //     var isFull = $(this).hasClass("full");
        //     $(".video").removeClass("full");
        //     if (!isFull) {
        //         $(this).addClass("full");
        //     }
        // });