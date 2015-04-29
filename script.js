(function(win, doc, $){

    "use strict";

    var isPlay = true;
    var playerState;

    var elemID = "player";
    var setWid = "640";

    $("#playtoggle").on('click', function(e) {
        e.preventDefault();
        playerState = youtube.getState();
        if(playerState) {
            player.stop();
        } else {
            player.start();
        }
        /*
        switch(playerState) {
            case -1:
            case 0:
                //$("#player").fadeOut();
                //break;
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
        youtube.seek(230);
    });


    var youtube = new Youtube({
            elem: elemID,
            videoID: "SnXkhkEvNIM",
            width: setWid 
    });

    $("#player-cover").width(width).height(width*9/16);

})(window, document, jQuery);

