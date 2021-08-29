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
    if (progress.value == 100) {
        pauseVideo();
    }
});

volume.addEventListener('input', () => {
    video.volume = volume.value / 100;
});

volumeBtn.addEventListener('click', () => {
    changeVolumeValue();
});

document.addEventListener('keydown', (e) => {
    if (e.code == 'Space' || e.code == 'KeyK') {
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
    if (e.code == 'Home') {
        e.preventDefault();
        if (video.paused) {
            playVideo();
        }
        progress.value = 0;
        video.currentTime = (progress.value * video.duration) / 100;
    }
    if (e.code == 'End') {
        progress.value = 100;
        video.currentTime = (progress.value * video.duration) / 100;
        video.pause();
    }
});

function playVideo () {
    video.play();
    visibleButtons();
}

function pauseVideo () {
    video.pause();
    visibleButtons();
}

function visibleButtons() {
    if (video.paused) {
        play.classList.remove('hidden');
        pause.classList.add('hidden');
        bigplay.classList.remove('hidden');
    } else {
        play.classList.add('hidden');
        pause.classList.remove('hidden');
        bigplay.classList.add('hidden');
    }
}

function openFullScreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.webkitrequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.mozRequestFullscreen) {
      element.mozRequestFullScreen();
    }
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
