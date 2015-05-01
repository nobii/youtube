$(function(){

    "use strict";

    var isPlay = true;
    var playerState;

    var elemID = "player";
    var $youtube = $(elemID);
    var setWid = "960";

    var youtube = new Youtube({
            elem: elemID,
            //videoID: "5Lzw7YsmbcE",
            //videoID: "jfBmSXFPMWo",
            videoID: "SnXkhkEvNIM",
            width: setWid 
    });

    youtube.on('ready', function() {
        console.log("script.js:ready");
        youtube.onPlayerReady();
        var agent = navigator.userAgent.match(/(iPhone|iPod|iPad|Android)/i);
        console.log(agent);
        // pc or smartphone
        if(agent) {
            // smartphone action
            return;
        }
        youtube.play();
        youtube.mute();
    });
    youtube.on('playing', function() {
        console.log("script.js:playing");
    });

    youtube.on('ended', function() {
        youtube.stop();
        console.log('script.js:ended');
        youtube.stop();
    });

    youtube.on('seek', function() {
        console.log('script.js:seek');
    });

    $("#playtoggle").on('click', function(e) {
        e.preventDefault();
        var playerState = youtube.getState();
        if(playerState) {
            youtube.pause();
            console.log("script.js:pause");
        } else {
            youtube.play();
            console.log("script.js:play");
        }
    });

    $("#seek").on('click', function(e) {
        e.preventDefault();
        youtube.seek(255);
    });

    $("#player-wrapper, #player-cover").width(setWid).height(setWid*9/16);

});

