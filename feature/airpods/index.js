document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById("airpods-pro-video");
    const btn = document.querySelector(".btn");
    const btnImg = document.querySelector(".btn-img");

    if (btnImg && video && !video.autoplay) {
        btnImg.src = "./img/play.svg"; 
        btnImg.alt = "play";
    }
    

    
    function toggleVideoPlayPause() {
        if (!video) return;
        
        if (video.paused) {
            video.play();
            btnImg.src = "./img/pause.svg";
            btnImg.alt = "pause";
        } else {
            video.pause();
            btnImg.src = "./img/play.svg";
            btnImg.alt = "play";
        }
    }

    if (btn) {
        btn.addEventListener("click", toggleVideoPlayPause);
    }
});

document.addEventListener('DOMContentLoaded', () => {
        const imageFiles = [
            'airpods_max_black.png',
            'airpods_max_blue.png',
            'airpods_max_orange.png',
            'airpods_max_purple.png',
            'airpods_max_stardust.png'
        ];
        const imagePathPrefix = './img/';

        const airpodsMaxImg = document.querySelector(".airpodsMax img");
        const btn = document.querySelector(".airMax");
        const btnImg = document.querySelector(".airMax-img");

        let currentIndex = 0;
        let intervalId;
        let isPlaying = true;

        function changeImage() {
            currentIndex = (currentIndex + 1) % imageFiles.length; // 다음 인덱스 계산
            airpodsMaxImg.src = imagePathPrefix + imageFiles[currentIndex]; // 이미지 경로 변경
        }

        function startSliding() {
            if (intervalId) {
                return;
            }
            intervalId = setInterval(changeImage, 1000);
            isPlaying = true;
            btnImg.src = "./img/pause.svg"; 
            btnImg.alt = "pause";
        }

        function stopSliding() {
            clearInterval(intervalId);
            intervalId = null;
            isPlaying = false;
            btnImg.src = "./img/play.svg";
            btnImg.alt = "play";
        }

        function togglePlayPause() {
            if (isPlaying) {
                stopSliding();
            } else {
                startSliding();
            }
        }

        if (btn) {
            btn.addEventListener("click", togglePlayPause);
        }

        startSliding(); 
    });