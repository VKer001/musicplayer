    // 根据 "-" 切割字符串
    var sliceName = function(name) {
        for (var i = 0; i < name.length; i++) {
            if (name[i] == '-') {
                return i
            }
        }
    }

    // 补全时间
    var zfill = function(time) {
        if (time.length<2) {
            return "0" + time
        } else {
            return time
        }
    }

    // 根据 播放或暂停
    var turnCenter = function() {
        // 变化图标
        let img = $(".footer-play").attr("src")
        let play = "images/play.png"
        if (img == play) {
            $(".footer-play").attr("src","images/pause.png")
            $("#id-play-needle").removeClass('pause-needle')
            $(".player-center").css("animation-play-state", "running")
            $("#id-audio-player")[0].play()
        } else {
            $(".footer-play").attr("src","images/play.png")
            $("#id-play-needle").addClass('pause-needle')
            $(".player-center").css("animation-play-state", "paused")
            $("#id-audio-player")[0].pause()
        }
    }

    // 点击play按钮
    var playButton = function() {
        $(".footer-play").on('click', function() {
            turnCenter()
        })
    }

    // 循环切换
    var loopButton = function() {
        $(".footer-loop").on('click', function() {
            let img = $(".footer-loop").attr("src")
            let loop = "images/loop.png"
            if (img == loop) {
                $(".footer-loop").attr("src","images/cyclic.png")
                $('#id-audio-player')[0].loop = true
            } else {
                $(".footer-loop").attr("src","images/loop.png")
                // $('#id-audio-player')[0].loop = true
            }
        })
    }

    // love 切换
    var loveButton = function() {
        $(".footer-love").on('click', function() {
            let img = $(".footer-love").attr("src")
            let love = "images/love.png"
            if (img == love) {
                $(".footer-love").attr("src","images/loved.png")
            } else {
                $(".footer-love").attr("src","images/love.png")
            }
        })
    }

    // musiceList
    var musiclistClass = function() {
        // musiceList出现
        $("#id-img-src").on('click', function() {
            $(".musicList").addClass("musiclistActive")
        })

        // musiceList消失
        $(".footer").on('click', function() {
            $(".musicList").removeClass("musiclistActive")
        })
    }


    // 切换 musicList
    var musiclistEvent = function() {
        $(".list-content").on("click", "li", function() {
            if(!$(this).hasClass("li-active")) {
                $('li').removeClass("li-active")
                $('li').find("img").css('display', "none")

                $(this).addClass("li-active")
                $(this).find("img").css('display', "inline-block")

                // console.log($(this).index());
                let i = $(this).index()
                changeMusic(i)
            }
        })
    }

    // 切歌、切背景等
    var changeMusic = function(i) {
        let source = $($('source')[i]).attr('src')
        // console.log('source', source, $('source'), $('source')[i], $($('source')[i]));
        // console.log(activeIndex,numberOfMic);
        // console.log('i', i);
        $('.vker-src-active').data('active', i)
        $('#id-audio-player')[0].src = source
        if ($(".footer-play").attr("src","images/play.png")) {
            turnCenter()
        } else {
            $('#id-audio-player')[0].autoplay = true
        }
        // 改变musicname
        let len = source.length
        let newsourse1 = source.slice(6, sliceName(source))
        let newsourse2 = source.slice(sliceName(source)+1, len-4)
        // console.log(newsourse1,newsourse2);
        $('.song').text(newsourse2)
        $('.artist').text(newsourse1)

        $("#id-img-musicBg")[0].src = musicBgimg[i]
        $(".center-song")[0].src = musicBgimg[i]

        // 改变musicList
        $('li').removeClass("li-active")
        $('li').find("img").css('display', "none")

        $($("li")[i]).addClass("li-active")
        $($("li")[i]).find("img").css('display', "inline-block")

        // 重置 player-center
        $("#id-player-center").toggleClass("player-center-new", "player-center")
    }

    var dataChange = function(offset) {
        let activeIndex = $(".vker-src-active").data('active')
        let numberOfMic = $('.vker-src-active').data('mic')
        let i = (activeIndex + numberOfMic + offset) % numberOfMic
        changeMusic(i)
    }

    var playPrev = function() {
        dataChange(-1)
    }
    var playNext = function() {
        dataChange(1)
    }

    var playEvent = function() {
        $('.footer-prev').on('click', function(){
            playPrev()
        })
        $('.footer-next').on('click', function(){
            playNext()
        })
    }

    // 时间函数
    var labelFromTime = function(time) {
        let minutes = zfill(String(Math.floor(time / 60)))
        // console.log(Math.floor(time / 60));
        let seconds = zfill(String(Math.floor(time % 60)))
        // console.log(seconds);
        let t = `${minutes}:${seconds}`
        return t
    }

    // 监听播放时间 改变滑条
    var bindAudioEvents = function() {
        $('#id-audio-player').on('timeupdate', function(e){
            let player = $('#id-audio-player')[0]
            let value = player.currentTime / player.duration
            let v = value * 254.55
            let m = v - 11
            // console.log(v);
            $('.timelist-ing').css('width', v)
            $("#id-img-process").css('margin-left', m)
            // 设置当前时间 time
            let time = labelFromTime(player.currentTime)
            $('.timelist-start').text(time)

            // console.log("offset", $(this).offset().right);
        })
        // 音乐播放完了之后的事件
        $("#id-audio-player").on('ended', function(){
            console.log("播放结束");
            // 根据按钮样式来播放下一首
            if ($(".footer-loop").attr("src","images/cyclic.png")) {
                console.log('循环');
                $('#id-audio-player')[0].loop = true
            } else {
                console.log('下一首')
                playNext()
            }
        })
        // 加载音乐后的事件
        $('#id-audio-player').on('canplay', function(e){
            let player = e.target
            // console.log('can play', player.duration)
            let time = labelFromTime(player.duration)
            // 滑条归位， 时间重置
            $('.timelist-ing').css('width', 0)
            $('.timelist-start').text('00:00')
            $('.timelist-end').text(time)
        })
    }

    // 监听process拖动
    var bindProcess = function() {
        // let player = $('#id-audio-player')[0]
        // let value = player.currentTime / player.duration
        // let v = value * 254.55
        // let m = v - 11
        // // console.log(v);
        // $('.timelist-ing').css('width', v)
        // $("#id-img-process").css('margin-left', m)
        // // 设置当前时间 time
        // let time = labelFromTime(player.currentTime)
        // $('.timelist-start').text(time)
        $("#id-img-process").on({
            mousedown: function(e){
                        $(".timelist-ing").on('mousemove.drag', function(e){ $(this).offset({left: $(this).offset().left}); });
                        console.log("e.pageX-dx",$(this).offset().left, typeof $(this).offset().left);
                        let m = $(this).offset().left - 254.55 - 11
                        console.log("m", m);
                        $("#id-img-process").css('margin-left', m)
                    },
            mouseup: function(e){
                // let el=$(this)
                // let os = el.offset()
                // let dx = e.clientX-os.left
                // $(".timelist-ing").off('mousemove.drag');
                // console.log("e.pageX-dx",e.clientX-dx);
            }
        // let eventMouse =
        // let moveX =
        })
    }

    var musicBgimg = [
        "images/cd.jpg",
        "images/nfgn.jpg",
        "images/gbqq.jpg",
    ]

    var _main = function() {
        playButton()
        loopButton()
        loveButton()
        playEvent()
        musiclistClass()
        musiclistEvent()
        bindAudioEvents()
        bindProcess()
    }

    _main()
