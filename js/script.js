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
        this.onPlayerReady();
        this.play();
        this.mute();

        /* pc or smartphone
        if(navigator) {
            // pc action
        } else {
            // smartphone action
        }
        */

    });
    youtube.on('playing', function() {
        console.log("script.js:playing");
    });

    youtube.on('ended', function() {
        $('#player-cover').css('background-color', 'black');
        $('iframe').css('display', 'none');
        //alert("script.js:ended youtube!");
        console.log('script.js:alert');
        this.stop();
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
        //youtube.pause();
    });

    $("#player-wrapper, #player-cover").width(setWid).height(setWid*9/16);

});

