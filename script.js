(function(win, doc, $){

    "use strict";

    var isPlay = true;
    var playerState;

    $("#playtoggle").on('click', function(e) {
        e.preventDefault();
        playerState = youtube.getState();
        switch(playerState) {
            case -1:
            case 0:
                $("#player").fadeOut();
                break;
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
    });

    $("#seek").on('click', function(e) {
        e.preventDefault();
        youtube.seek(230);
    });


    var youtube = new Youtube({
            elem: "player",
            videoID: "SnXkhkEvNIM",
            width: '640'
    });

})(window, document, jQuery);

