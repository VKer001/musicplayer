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
            // console.log($("#id-audio-player")[0]);
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
        })
    }

    // 循环切换
    var loopButton = function() {
        $(".footer-loop").on('click', function() {
            let img = $(".footer-loop").attr("src")
            let loop = "images/loop.png"
            if (img == loop) {
                $(".footer-loop").attr("src","images/cyclic.png")
            } else {
                $(".footer-loop").attr("src","images/loop.png")
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
    var musiclistEvent = function() {
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
    $(".list-content").on("click", "li", function() {
        if(!$(this).hasClass("li-active")) {
            $('li').removeClass("li-active")
            $('li').find("img").css('display', "none")

            $(this).addClass("li-active")
            $(this).find("img").css('display', "inline-block")
        }else {
        }
    })

    // 切歌、切背景等
    var changeMusic = function(offset) {
        let activeIndex = $(".vker-src-active").data('active')
        let numberOfMic = $('.vker-src-active').data('mic')
        let i = (activeIndex + numberOfMic + offset) % numberOfMic
        let source = $($('source')[i]).attr('src')
        console.log('source', source, $('source'), $('source')[i], $($('source')[i]));
        $('.vker-src-active').data('active', i)
        $('#id-audio-player')[0].src = source
        $('#id-audio-player')[0].autoplay = true
        turnCenter()
        let len = source.length
        let newsourse1 = source.slice(6, sliceName(source))
        let newsourse2 = source.slice(sliceName(source)+1, len-4)
        console.log(newsourse1,newsourse2);
        $('.song').text(newsourse2)
        $('.artist').text(newsourse1)

    }

    var playPrev = function() {
        changeMusic(-1)
    }
    var playNext = function() {
        changeMusic(1)
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
        })
        // 音乐播放完了之后的事件
        $("#id-audio-player").on('ended', function(){
            // 根据按钮样式来播放下一首
            if ($(".footer-loop").attr("src","images/loop.png")) {
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
        $("#id-img-process").on('mousedown touchstart', function() {
            console.log('yidong');
        })
    }

    var _main = function() {
        playButton()
        loopButton()
        loveButton()
        playEvent()
        musiclistEvent()
        bindAudioEvents()
        bindProcess()
    }

    _main()
