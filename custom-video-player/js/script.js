const video = document.querySelector('#video-player'),
      play = document.querySelector('#play'),
      pause = document.querySelector('#pause'),
      bigplay = document.querySelector('#bigplay'),
      fullscreen = document.querySelector('#fullscreen'),
      progress = document.querySelector('.video__time'),
      volume = document.querySelector('.video__volume'),
      volumeBtn = document.querySelector('.video__controls-volume'),
      videoRate = document.querySelector('.video__rate');
let range_counter = 1.0,
    volume_value = 1;

play.addEventListener('click', playVideo);

pause.addEventListener('click', pauseVideo);

bigplay.addEventListener('click', playVideo);

fullscreen.addEventListener('click', () => {
    openFullScreen(video);
});

video.addEventListener('click', () => {
    if (video.paused) {
        playVideo();
    } else {
        pauseVideo();
    }
});

progress.addEventListener('change', () => {
    video.currentTime = (progress.value * video.duration) / 100;
});

video.addEventListener('timeupdate', () => {
    progress.value = (video.currentTime / video.duration) * 100;
});

volume.addEventListener('input', () => {
    video.volume = volume.value / 100;
});

volumeBtn.addEventListener('click', () => {
    changeVolumeValue();
});

document.addEventListener('keydown', (e) => {
    if (e.code == 'Space') {
        if (video.paused) {
            playVideo();
        } else {
            pauseVideo();
        }
    }
    if (e.code == 'KeyM') {
        changeVolumeValue();
    }
    if (e.code == 'KeyF') {
        if (document.fullscreenElement == null) {
            openFullScreen(video);
        } else {
            closeFullscreen(video);
        }
    }
    if (e.shiftKey == true && e.code == 'Period') {
        if (range_counter < 2) {
            range_counter += 0.25;
            if (range_counter == 0.5 || range_counter == 1 || range_counter == 1.5 || range_counter == 2) {
                videoRate.innerHTML = `${range_counter.toFixed(1)}`;
            } else {
                videoRate.innerHTML = `${range_counter.toFixed(2)}`;
            }
            video.playbackRate = range_counter;
        }
    }
    if (e.shiftKey == true && e.code == 'Comma') {
        if (range_counter > 0.25) {
            range_counter -= 0.25;
            if (range_counter == 0.5 || range_counter == 1 || range_counter == 1.5 || range_counter == 2) {
                videoRate.innerHTML = `${range_counter.toFixed(1)}`;
            } else {
                videoRate.innerHTML = `${range_counter.toFixed(2)}`;
            }
            video.playbackRate = range_counter;
        }
    }
});

function playVideo () {
    visibleButtons();
    video.play();
}

function pauseVideo () {
    visibleButtons();
    video.pause();
}

function visibleButtons() {
    play.classList.toggle('hidden');
    pause.classList.toggle('hidden');
    bigplay.classList.toggle('hidden');
}

function openFullScreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.webkitrequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.mozRequestFullscreen) {
      element.mozRequestFullScreen();
    }
    console.log(document.fullscreenElement);
}

function closeFullscreen(element) {
    if (element.exitFullscreen) {
      element.exitFullscreen();
    } else if (element.webkitExitFullscreen) {
      element.webkitExitFullscreen();
    } else if (element.mozExitFullscreen) {
    element.mozExitFullscreen();
    }
  }

function changeVolumeValue() {
    if (volume.value != 0) {
        volume_value = volume.value
        volume.value = 0;
        video.volume = 0;
    } else {
        volume.value = volume_value;
        video.volume = volume.value / 100;
    }
}
