//(function(exports) {

var Youtube = function(opts) {

    opts = opts || {};

    this.videoID = opts.videoID;
    this.elemID = opts.elem;
    this.$dom = $("#" + this.elemID);
    //this.url = opts.url || {};
    this.player = opts.player || null;
    this.playstate = "";
    this.width = opts.width || '640';
    this.movieRate = 9 / 16;
    this.height = this.width * this.movieRate;

    this.instance = this;
    this.playerInstance = {};

    // 引数が足りない時のエラー処理
    if(!this.videoID) {
        throw new Error("please set videoID");
    }
    if(!this.elemID) {
        throw new Error("please set elementID");
    }

    this.initialize();
};

Youtube.prototype.initialize = function() {
    // playerの準備完了時
    var instance = this;
    var $dom = this.$dom;

    window.onYouTubeIframeAPIReady = function() {
        console.log("onYouTubeIframeAPIReady");
        instance.loadPlayer();
    };

};

Youtube = EventTrigger.extend(Youtube);

/// youtube player をロードする
Youtube.prototype.loadPlayer = function() {
    console.log("loadPlayer(" + this.videoID + ")");
    var instance = this;
    this.playerInstance = instance;
    console.log(this.playerInstance);
    if(!this.player) {
        this.player = new YT.Player(this.elemID, {
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
                            "onReady": function(e) {
                                instance.trigger('ready', e);
                            },
                            "onStateChange": function(e) {
                                instance.trigger('stateChange', e);
                                switch (e.data) {
                                    case YT.PlayerState.ENDED: instance.trigger('ended', e); break;
                                    case YT.PlayerState.PLAYING: instance.trigger('playing', e); break;
                                    case YT.PlayerState.PAUSED: instance.trigger('paused', e); break;
                                    case YT.PlayerState.BUFFERING: instance.trigger('buffering', e); break;
                                    case YT.PlayerState.CUED: instance.trigger('cued', e); break;
                                }
                            }
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

Youtube.prototype.playing = function() {
    console.log("playing");
};

Youtube.prototype.mute = function() {
    console.log("mute");
    this.player.mute();
};


Youtube.prototype.seek = function(/* int */seekSeconds) {
    console.log("seek");
    this.player.seekTo(seekSeconds, true);
    this.play();
};

// playerのstatusが変更される度に発生
Youtube.prototype.onPlayerStateChange = function(event) {
    console.log("PlayerState:" + event.data);

    /*
    var $dom = this.$dom;
    var i = this;
    var instance = i.playerInstance;
    console.log(instance);
    switch(event.data) {
        case YT.PlayerState.ENDED:
            instance.trigger("ended");
            break;
        case YT.PlayerState.PAUSED:
            instance.trigger("paused");
            break;
        case YT.PlayerState.CUED:
            instance.trigger("cue");
            break;
        case YT.PlayerState.PLAYING:
            instance.trigger("playing");
            break;
        case YT.PlayerState.BUFFERING:
            instance.trigger("buffering");
            break;
        default:
            break;
    }
    */
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

// 無名関数呼び込み
(function() {
    // youtube読み込み
    var script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(script);
    console.log("add iframe script");
})();

//exports.Youtube = Youtube;

//})(this);
