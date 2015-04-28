(function(win, doc, $){

    var player;
    var videoID = "SnXkhkEvNIM";

    var script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(script);

    // playerの準備完了時
    win.onYouTubeIframeAPIReady = function() {
        console.log("onYouTubeIframeAPIReady");
        loadPlayer(videoID);
    };

    // playerの生成
    function loadPlayer(videoID) {
        console.log("loadPlayer(" + videoID + ")");
        if(!player) {
            player = new YT.Player('player', {
                    width: '640',
                    height: '390',
                    videoId: videoID,
                    events: {
                        "onReady": onPlayerReady,
                        "onStateChange": onPlayerStateChange,
                    },
                    playerVals: {
                        "rel": 0,
                        "showInfo": 0,
                        "controls": 1
                    }
                }
            );
        } else {
            player.loadVideoByID(videoID);
        }
    }

    // player の準備完了時
    function onPlayerReady(event) {
        console.log("onPlayerReady");
    }

    // playerのstatusが変更される度に発生
    function onPlayerStateChange(event) {
        console.log("PlayerState:" + event.data);
        switch(event.data) {
            case YT.PlayerState.ENDED:
            case YT.PlayerState.PAUSED:
            case YT.PlayerState.CUED:
                $("#play").html("再生");
                break;
            case YT.PlayerState.PLAYING:
            case YT.PlayerState.BUFFERING:
                $("#play").html("一時停止");
                break;
            default:
                $("#play").html("再生");
                break;
        }

    }

    function play() {
        console.log("play");
        player.playVideo();
        $(this).html("再生");
    }
    function pause() {
        console.log("pause");
        player.pauseVideo();
        $(this).html("一時停止");
    }
    function stop() {
        console.log("stop");
        player.stopVideo();
        player.cueVideoById(videoID);
        $(this).html("一時停止");
    }

    $("#play").click(function() {
        var label = $(this).html();
        console.log("play");
        if(label == "再生") {
            play();
        } else {
            pause();
        }
    });
    $("#stop").click(function() {
        stop();
    });
    $("#seek").click(function() {
        player.seekTo(30, true);
        play();
    });

})(window, document, $);
