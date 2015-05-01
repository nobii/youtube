$(function(){

    "use strict";

    var isPlay = true;
    var playerState;

    var elemID = "player";
    var $youtube = $(elemID);
    var setWid = "640";

    var youtube = new Youtube({
            elem: elemID,
            //videoID: "5Lzw7YsmbcE",
            videoID: "jfBmSXFPMWo",
            //videoID: "SnXkhkEvNIM",
            width: setWid 
    });

    youtube.on('ready', function() {
        console.log("script.js:ready");
        youtube.onPlayerReady();
        youtube.play();
        youtube.mute();

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
        alert("script.js:ended youtube!");
        console.log('scropt.js:alert');
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
        /* switch(playerState) {
            case -1: case 0:
                    //$("#player").fadeOut();
                    ////break;
            case 2:
            case 3:
            case 5:
                youtube.play();
                break;
            case 1:
                youtube.pause();
                break;
            default:
                break;
        }
        */
    });

    $("#seek").on('click', function(e) {
        e.preventDefault();
        youtube.seek(445);
        //youtube.pause();
    });

    $("#player-wrapper, #player-cover").width(setWid).height(setWid*9/16);

});

