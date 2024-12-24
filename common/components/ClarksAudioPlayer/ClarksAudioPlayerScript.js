// Author: ClarkCodes - Script del Reproductor de Musica Personalizado - Desarrollado por ClarkCodes entre el 1 y el 5 de Noviembre del 2024, se empezo a diseñar el 1/11 las 5pm y se culmino el desarrollo el 5/11 a las 6am, se termino de refinar a las 16:35


// ****** Declarations

let isSeeking = false;
const audio = document.querySelector( '#audioMagoDeOzSongId' );
const clarkCodesImagotypeButton = document.querySelector( '#clarkCodesLogoImagotypeButtonId' );
const clarkCodesLogoTextImage = document.querySelector( '#clarkCodesLogoTextId' );
const songTitle = document.querySelector( '#titleId' );
const songArtistAlbum = document.querySelector( '#artistAlbumId' );
const progressBarSlider = document.querySelector( '#progressBarSliderId' );
const currentTime = document.querySelector( '#currentTimeId' );
const totalTime = document.querySelector( '#totalTimeId' );
const playPauseReplayButton = document.querySelector( '#playPauseReplayButtonId' );
const playPauseReplayImage = document.querySelector( '#playPauseReplayButtonId img' );
const stopButton = document.querySelector( '#stopButtonId' );
const volumeButton = document.querySelector( '#volumeButtonId' );
const volumeImage = document.querySelector( '#volumeButtonId img' );
const volumeSlider = document.querySelector( '#volumeSliderId' );
const volumeValue = document.querySelector( '#volumeValueId' );

const playIcon = 'icons/play_arrow_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24.svg';
const pauseIcon = 'icons/pause_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24.svg';
const replayIcon = 'icons/replay_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24.svg';
const highVolumeIcon = 'icons/volume_up_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24.svg';
const lowVolumeIcon = 'icons/volume_down_alt_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24.svg';
const mutedIcon = 'icons/no_sound_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24.svg';


// ****** Events Setting

playPauseReplayButton.addEventListener( 'click', () => togglePlay() );
stopButton.addEventListener( 'click', () => stopSong() );
progressBarSlider.addEventListener( 'input', () => seeking() );
progressBarSlider.addEventListener( 'change', () => seek() );
audio.addEventListener( 'loadedmetadata', () => loadSongBasics() );
audio.addEventListener( 'timeupdate', () => updateProgress() );
audio.addEventListener( 'play', () => updatePlayPauseIcon() );
audio.addEventListener( 'pause', () => updatePlayPauseIcon() );
audio.addEventListener( 'ended', () => songEnd() );
volumeButton.addEventListener( 'click', () => toggleMute() );
volumeSlider.addEventListener( 'input', () => setVolume() );
clarkCodesImagotypeButton.addEventListener( 'click', () => openClarkCodesGitHubRepositoryLink() );
clarkCodesLogoTextImage.addEventListener( 'click', () => openClarkCodesGitHubRepositoryLink() );

// ****** Functions

function formatToMinSec( totalSeconds ) { // Formats to Minutes and Seconds ( m:ss )
    const minutes = ( totalSeconds / 60 ) | 0; // Removing the floating fractional part of the float with a bitwise operation
    const seconds = ( totalSeconds % 60 ) | 0;
    
    // Add leading zero to seconds if needed
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    
    return `${minutes}:${formattedSeconds}`;
}

function loadSongBasics() {
    const totalSeconds = parseInt( audio.duration );
    progressBarSlider.max = totalSeconds;
    totalTime.textContent = formatToMinSec( totalSeconds );
    audio.volume = 0.5;
    audio.play();
}

function togglePlay() {
    if ( audio.ended ) { // If the Song has ended 
        audio.currentTime = 0.0;
        audio.play();
    } else if ( audio.paused ) { // If the song is Paused
        audio.play();
    } else { // If the song is currently playing
        audio.pause();
    }
}

function stopSong() {
    if( audio.currentTime > 0 ) {
        audio.pause();
        audio.currentTime = 0.0;
    }
}

function updateProgress() {
    if ( !isSeeking ) {
        progressBarSlider.value = audio.currentTime | 0;
        currentTime.textContent = formatToMinSec( audio.currentTime );
    }
}

function seeking() {
    if ( !isSeeking ) { 
        isSeeking = true; 
    }

    currentTime.textContent = formatToMinSec( progressBarSlider.value );
}

function seek() {
    isSeeking = false;
    audio.currentTime = progressBarSlider.value * 1.0;
}

function songEnd() {
    playPauseReplayImage.setAttribute( 'src', replayIcon );
}

function toggleMute() {
    if ( audio.muted ) {
        audio.muted = false;
        const volume = audio.volume * 100;
        volumeSlider.value = volume;
        updateVolumeIcon( volume );
    }
    else {
        audio.muted = true;
        volumeSlider.value = 0;
        volumeImage.setAttribute( 'src', mutedIcon );
    }

    volumeValue.textContent = volumeSlider.value;
}

function setVolume() {
    const volume = volumeSlider.value;
    audio.volume = volume / 100;
    volumeValue.textContent = volume;
    updateVolumeIcon( volume );
    
    if( volume > 0 && audio.muted ) {
        audio.muted = false;
    }
}

function updatePlayPauseIcon() {
    playPauseReplayImage.setAttribute( 'src', ( audio.paused ? playIcon : pauseIcon ) );
}

function updateVolumeIcon( volume ) {
    volumeImage.setAttribute( 'src', ( volume >= 50 ) ? highVolumeIcon : lowVolumeIcon );
}

function openClarkCodesGitHubRepositoryLink() {
    window.open('https://github.com/ClarkCodes', '_blank');
}
