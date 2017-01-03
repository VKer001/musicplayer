    // 播放时
    $('.footer-play').on('click', function() {
        // 变化图标
        let img = $(".footer-play").attr("src")
        let play = "images/play.png"
        if (img == play) {
            $(".footer-play").attr("src","images/pause.png")
            $("#id-play-needle").removeClass('pause-needle')
            $(".player-center").css("animation-play-state", "running")

        } else {
            $(".footer-play").attr("src","images/play.png")
            $("#id-play-needle").addClass('pause-needle')
            $(".player-center").css("animation-play-state", "paused")
        }


    })


    // 循环切换
    $(".footer-loop").on('click', function() {
        let img = $(".footer-loop").attr("src")
        let loop = "images/loop.png"
        if (img == loop) {
            $(".footer-loop").attr("src","images/cyclic.png")
        } else {
            $(".footer-loop").attr("src","images/loop.png")
        }
    })


    // love 切换
    $(".footer-love").on('click', function() {
        let img = $(".footer-love").attr("src")
        let love = "images/love.png"
        if (img == love) {
            $(".footer-love").attr("src","images/loved.png")
        } else {
            $(".footer-love").attr("src","images/love.png")
        }
    })
