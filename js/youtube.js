// window, document などを明示的に定義
(function($, window, document, undefined){
 
    var Youtube = function(opts) {

        opts = opts || {};

        this.videoID = opts.videoID;
        this.elemID = opts.elem;
        this.$dom = $("#" + this.elemID);
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

    // playerの準備開始
    Youtube.prototype.initialize = function() {
        var instance = this;
        window.onYouTubeIframeAPIReady = function() {
            console.log("youtube.js:onYouTubeIframeAPIReady");
            instance.loadPlayer();
        };
    };

    Youtube = EventTrigger.extend(Youtube);

    /// youtube player をロードする
    Youtube.prototype.loadPlayer = function() {
        console.log("youtube.js:loadPlayer(" + this.videoID + ")");
        var instance = this;
        console.log(instance);
        if(!this.player) {
            this.player = new YT.Player(this.elemID, {
                            width: this.width,
                            height: this.height,
                            videoId: this.videoID,
                            endSeconds: 260,
                            playerVars: {
                                "rel": 0,
                                "showinfo": 0,
                                "controls": 0,
                                "autoplay": 1,
                                "disablekb": 0,
                            },
                            events: {
                                "onReady": function(e) {
                                    instance.trigger('ready', e);
                                },
                                "onStateChange": function(e) {
                                    switch (e.data) {
                                        // trigger で発火する
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
            this.player.loadVideoById(videoID);
       }
    };

    // player の準備完了時
    Youtube.prototype.onPlayerReady = function() {
        console.log("youtube.js:onPlayerReady");
    };

    Youtube.prototype.play = function() {
        console.log("youtube.js:play");
        this.player.playVideo();
    };

    Youtube.prototype.pause = function() {
        console.log("youtube.js:pause");
        this.player.pauseVideo();
    };

    Youtube.prototype.stop = function() {
        console.log("youtube.js:stop");
        //this.player.stopVideo();
        //this.player.clearVideo();

        //e.target.pauseVideo();
        //this.player.loadVideoById('', 0);
        //this.player.seekTo(0);
        //e.target.clearVideo();

        // 動画を最初のキューまで戻す
        //this.player.cueVideoById(this.videoID);
    };

    Youtube.prototype.playing = function() {
        console.log("youtube.js:playing");
    };

    Youtube.prototype.mute = function() {
        console.log("youtube.js:mute");
        this.player.mute();
    };

    Youtube.prototype.seek = function(/* int */seekSeconds) {
        console.log("youtube.js:seek");
        this.player.seekTo(seekSeconds, true);
        this.play();
    };

    // playerのstatusが変更される度に発生
    Youtube.prototype.onPlayerStateChange = function(event) {
        console.log("youtube.js:PlayerState:" + event.data);
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
        // returnの値は要修正
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

    (function() {
        // youtube api 読み込み
        var script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(script);
        console.log("youtube.js:add iframe script");
    })();

    window.Youtube = Youtube;

})(jQuery, this, this.document);
