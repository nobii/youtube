(function(win, doc, $){

    "use strict";

    var isPlay = false;

    $("#playtoggle").on('click', function() {
        if(isPlay) {
            youtube.pause();
            isPlay = false;
        } else {
            youtube.play();
            isPlay = true;
        }
    });

    var youtube = new Youtube({
            elem: "player",
            videoID: "SnXkhkEvNIM",
            width: '640'
    });

})(window, document, jQuery);

