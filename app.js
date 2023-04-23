const app = () => {
    const song = document.querySelector('.sound');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.video video');

    //sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    //time display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelector('.time button')
    //get length of the outline
    const outlineLength = outline.getTotalLength();
    //duration
    let maxDuration = 300; //default

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //play song
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    //function to stop and play sound
    function checkPlaying(song) {
        if (song.paused) {
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        } else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg'
        }
    }

    //animate timer
    song.ontimeupdate = function () {
        let currentTime = song.currentTime;
        let elapsed = maxDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let mintues = Math.floor(elapsed / 60);
        //animate circle
        let progress = outlineLength - (currentTime / maxDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;
        //animate time
        timeDisplay.textContent = `${mintues}:${seconds}`;
    }
}

app();