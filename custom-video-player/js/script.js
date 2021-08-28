const video = document.querySelector('#video-player'),
      play = document.querySelector('#play'),
      pause = document.querySelector('#pause');

play.addEventListener('click', () => {
    play.classList.toggle('hidden');
    pause.classList.toggle('hidden');
    video.play();
});

pause.addEventListener('click', () => {
    play.classList.toggle('hidden');
    pause.classList.toggle('hidden');
    video.pause();
});

