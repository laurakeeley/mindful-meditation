const app = () => {
    const song = document.querySelector('.sound');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.video video');

    //sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    //time display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time button');
    //get length of the outline
    const outlineLength = outline.getTotalLength();
    //duration
    let duration = 300; //default

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //select sound
    sounds.forEach(soundOption => {
        soundOption.addEventListener('click', function () {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            // checkPlaying(song);
        })
    })
    
    //play song
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    document.addEventListener('keydown', (event) => {
        if (event.keyCode === 32) { //spacebar
            event.preventDefault(); //prevent scroll
            checkPlaying(song);
        }
    });

    //select time
    timeSelect.forEach(timeOption => {
        timeOption.addEventListener('click', function () {
            duration = this.getAttribute('data-time');
            console.log(duration);
            timeDisplay.textContent = `${Math.floor(duration / 60)}:${formatSeconds(Math.floor(duration % 60))}`;
        })
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

    function formatSeconds(seconds) {
        return seconds < 10 ? "0" + seconds : seconds;
    }

    //animate timer
    song.ontimeupdate = function () {
        let currentTime = song.currentTime;
        let elapsed = duration - currentTime;
        let seconds = formatSeconds(Math.floor(elapsed % 60));
        let mintues = Math.floor(elapsed / 60);
        //animate circle
        let progress = outlineLength - (currentTime / duration) * outlineLength;
        outline.style.strokeDashoffset = progress;
        //animate time
        timeDisplay.textContent = `${mintues}:${seconds}`;

        //stop at 0
        if (currentTime >= duration) {
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';
            video.pause();
        }
    }
}

app();