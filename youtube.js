var Youtube = function(opt) {
    var opts = opts || {};
    this.videoID = opts.videoID;
    //this.url = opts.url || {};
    this.player = opts.player || null;

    this.initialize();
};

Youtube.prototype.initialize = function() {
    // youtube読み込み
    var script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(script);
    // playerの準備完了時
    window.onYouTubeIframeAPIReady = function() {
        console.log("onYouTubeIframeAPIReady");
        this.loadPlayer();
    };
};

// youtube player をロードする
Youtube.prototype.loadPlayer = function() {
    console.log("loadPlayer(" + this.videoID + ")");
    if(!this.player) {
        this.player = new YT.Player('player', {
                        width: '640',
                        height: '390',
                        videoId: this.videoID,
                        events: {
                            "onReady": this.onPlayerReady,
                            "onStateChange": this.onPlayerStateChange,
                        },
                        playerVals: {
                            "rel": 0,
                            "showInfo": 0,
                            "controls": 0
                        }
        });
    } else {
        this.player.loadVideoByID(videoID);
    }
};

// player の準備完了時
Youtube.prototype.onPlayerReady = function() {
    console.log("onPlayerReady");
};

// playerのstatusが変更される度に発生
Youtube.prototype.onPlayerStateChange = function(event) {
    console.log("PlayerState:" + event.data);
    switch(event.data) {
        case YT.PlayerState.ENDED:
        case YT.PlayerState.PAUSED:
        case YT.PlayerState.CUED:
            break;
        case YT.PlayerState.PLAYING:
        case YT.PlayerState.BUFFERING:
            $("#play").html("一時停止");
            break;
        default:
            $("#play").html("再生");
            break;
    }
};

/*
    var player;
    var videoID = "SnXkhkEvNIM";
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
    */
