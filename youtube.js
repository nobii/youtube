var Youtube = function(opts) {
    opts = opts || {};
    this.videoID = opts.videoID;
    this.elem = opts.elem;
    //this.url = opts.url || {};
    this.player = opts.player || null;
    this.playstate = "";

    this.width = opts.width || '640';
    this.movieRate = 9 / 16;
    this.height = this.width * this.movieRate;

    this.initialize();
};

Youtube.prototype.initialize = function() {
    // playerの準備完了時
    var that = this;
    window.onYouTubeIframeAPIReady = function() {
        console.log("onYouTubeIframeAPIReady");
        that.loadPlayer();
    };

};

/// youtube player をロードする
Youtube.prototype.loadPlayer = function() {
    console.log("loadPlayer(" + this.videoID + ")");
    if(!this.player) {
        this.player = new YT.Player(this.elem, {
                        width: this.width,
                        height: this.height,
                        videoId: this.videoID,
                        playerVars: {
                            "rel": 0,
                            "showinfo": 0,
                            "controls": 0,
                            "autoplay": 1,
                            "disablekb": 0,
                            //"modestbranding": 0,
                            //"cc_load_policy": 0,
                            //"autohide": 0,
                        },
                        events: {
                            "onReady": this.onPlayerReady,
                            //"onPlaybackQualityChange": onPlayerPlaybackQualityChange,
                            "onStateChange": this.onPlayerStateChange
                            //"onError": onPlayerError,
                        },
        });
    } else {
        this.player.loadVideoByID(videoID);
    }
};

// player の準備完了時
Youtube.prototype.onPlayerReady = function() {
    console.log("onPlayerReady");

    /* pc or smartphone 
    if(navigator) {
        // pc action
    } else {
        // smartphone action
    }
    */
};


// playerのstatusが変更される度に発生
Youtube.prototype.onPlayerStateChange = function(event) {
    console.log("PlayerState:" + event.data);
    switch(event.data) {
        case YT.PlayerState.ENDED:
            this.playstate = "end";
            break;
        case YT.PlayerState.PAUSED:
            this.playstate = "paused";
            break;
        case YT.PlayerState.CUED:
            this.playstate = "cued";
            break;
        case YT.PlayerState.PLAYING:
            this.playstate = "playing";
            break;
        case YT.PlayerState.BUFFERING:
            this.playstate = "buffering";
            //$("#play").html("一時停止");
            break;
        default:
            //$("#play").html("再生");
            break;
    }
};

Youtube.prototype.getState = function() {
    /*
        -1 – 未開始
        0 – 終了
        1 – 再生中
        2 – 一時停止
        3 – バッファリング中
        5 – 頭出し済み
    */
    var playerState = this.player.getPlayerState();
    switch(playerState) {
        case -1:
            return "";
        case 0:
            return false;
        case 1:
            return true;
        case 2:
            return false;
        case 3:
            return false;
        case 5:
            return false;
        default:
            return "";
    }
};

Youtube.prototype.play = function() {
    console.log("play");
    this.player.playVideo();
};

Youtube.prototype.pause = function() {
    console.log("pause");
    this.player.pauseVideo();
};

Youtube.prototype.stop = function() {
    console.log("stop");
    this.player.stopVideo();
    this.player.cueVideoById(this.videoID);
};

Youtube.prototype.seek = function(seekSeconds) {
    console.log("seek");
    this.player.seekTo(/* int */seekSeconds, true);
    this.play();
};


// 無名関数呼び込み
(function() {
    // youtube読み込み
    var script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(script);
    console.log("add iframe script");
})();

