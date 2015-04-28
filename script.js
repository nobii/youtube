(function(win, doc, $){

    "use strict";

    var isPlay = true;
    var playerState;

    $("#playtoggle").on('click', function(e) {
        e.preventDefault();
        playerState = youtube.getState();
        if(playerState) {
            youtube.pause();
        } else {
            youtube.play();
        }
    });

    var youtube = new Youtube({
            elem: "player",
            videoID: "SnXkhkEvNIM",
            width: '640'
    });

})(window, document, jQuery);

