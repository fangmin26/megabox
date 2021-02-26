(function($){
    (function handleTrailer(){
        //selector 캐시
        var $selelctor ={
            body : $("body"),
            overlaly :$("#blackout"),
            modal : $("#trailerModal"),
            showButtton : $("#showTrailer"),
            hideButton : $("#hideTrailer"),
        };
        //player
        var player = {
            object : null,
            querey :{
                theme: "dark",
                color: "white",
                controls: 1, 
                autoplay: 1,
                enablejsapi: 1,
                modestbranding: 0, // YouTube 로고 감춤
                rel: 0,  // 관련 동영상 표시
                showinfo: 0, // 제목, 업로더 감춤
                iv_load_policy: 3
            },
            visible:false
        };

        //보이기 숨기기버튼 활성화
        $selelctor.showButtton.on("click",showPlayer);
        $selelctor.hideButton.on("click",hidePlayer);
        //youtube api로 iframe

        function setPlayer(id){
            player.obj = new YT.Player( "trailer", {
                width: 480,
                height: 282,
                videoId: id,    
                playerVars: player.query});
        //plyer크기 설정
        resizePlayer();
        //회전시 플레이어크기
        $(window).on("resize orientationchange",function(){
            resizePlayer();
        });
    }


        function resizePlayer(){
            var viewport ={},
                frame = {},
                modal ={};
            viewport.width=$(window).width();
            viewport.height=$(window).height();
            frame.width = viewport.width;
            frame.height = frame.width/1.6;
            modal.top = ((viewport.height - frame.height)/2 +"px");
            modal.left = "0px";
            $selelctor.modal.css(modal);
            player.obj.setSize(frame.width,frame.height);
        };

        // iframe 보이기
        function showPlayer() {
            if ( !player.obj ) {
                setPlayer( $selector.showButton.data("youtube") );
            }
            
            $selector.body.addClass("modal_on");
            $selector.overlay.show();
            player.visible = true;
        };
        
        // iframe 감추기
        function hidePlayer (){
            player.obj.stopVideo();
            $selector.overlay.hide();
            $selector.body.removeClass("modal_on");
            player.visible = false;
        };

    })();
})(jQuery);