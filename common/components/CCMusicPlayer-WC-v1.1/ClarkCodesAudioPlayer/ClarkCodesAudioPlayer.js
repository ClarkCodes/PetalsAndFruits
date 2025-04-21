// Author: ClarkCodes - Custom Audio Player Web Component ClarkCodesAudioPlayer - Componentized by ClarkCodes on January 6 - 2025, based on its predecessor 'ClarksAudioPlayer'
// Version: 1.1.0 - done on April 19 - 2025

// ****** Fonts - Adding the needed fonts to the client DOM for the component to be shown properly

function addFonts(){
    const style = document.createElement( 'style' );
    style.textContent = `
        @font-face {
            font-family: 'Poppins';
            src: url( ${import.meta.resolve( '../assets/fonts/Poppins-Regular.ttf' )} ) format('truetype');
            font-weight: 400;
            font-style: normal;
        }
        @font-face {
            font-family: 'Poppins';
            src: url( ${import.meta.resolve( '../assets/fonts/Poppins-SemiBold.ttf' )} ) format('truetype');
            font-weight: 600;
            font-style: bold;
        }
        `;
    document.head.appendChild( style );
}
addFonts();


// ****** Web Component - The component encapsulated class

export class ClarkCodesAudioPlayer extends HTMLElement {
    constructor() {
        super();
        this.shadowRootDOM = this.attachShadow({mode: 'open'});
    }
 
    connectedCallback() {
        this.render();
        this.mapComponentAttributes();
        this.initComponent();
    }

    mapComponentAttributes() { 
        const audioAttributes = ['src', 'type', 'autoplay', 'loop']; 
        const songAudio = this.shadowRootDOM.querySelector( "#audioSongId" );
        const songTitle = this.shadowRootDOM.querySelector( '#titleId' );
        const songArtistAlbum = this.shadowRootDOM.querySelector( '#artistAlbumId' );

        // Setting Audio Properties
        audioAttributes.forEach( attr => { 
            if ( this.hasAttribute( attr ) ) { 
                songAudio.setAttribute( attr, this.getAttribute( attr ) );
            } 
        }); 
        
        // Setting Title, Artist and Album visually in the corresponding interface elements
        songTitle.innerHTML = this.hasAttribute( 'song-name' ) ? this.getAttribute( 'song-name' ) : 'Desconocido';
        songArtistAlbum.innerHTML = this.hasAttribute( 'artist' ) ? this.getAttribute( 'artist' ) : 'Artista Desconocido';

        this.hasAttribute( 'album' ) && ( songArtistAlbum.innerHTML += ' - ' + this.getAttribute( 'album' ) );

        // Setting the Background Song Album Cover Image
        this.coverImageToSet = this.hasAttribute( 'cover-img' ) ? this.getAttribute( 'cover-img' ) : import.meta.resolve( '../assets/images/Superman_ManOfSteel_Logo_OnBlack.jpg' ); // If the cover-img attribute doesn't exist it resolves the absolute path in the server to the fallback image and sets it as cover image
        const styleSheet = this.shadowRootDOM.querySelector( '#playerStyleSheetId' ).sheet; 
        const fullRule = `.PlayerContainer::before { background-image: url( ${this.coverImageToSet} ); }`; // Construct the full rule
        styleSheet.insertRule( fullRule, styleSheet.cssRules.length ); // Insert the rule into the stylesheet 
    } 
    
    static get observedAttributes() { 
        return ['src', 'type', 'autoplay', 'loop', 'song-name', 'artist', 'album', 'cover-img']; 
    }

    render() {
        this.shadowRootDOM.innerHTML = `
            ${this.templateCss()}
            ${this.template()}
        `;
    }
    
    initComponent() {
        // Author: ClarkCodes - Script del Reproductor de Musica Personalizado ClarksAudioPlayer - Desarrollado por ClarkCodes entre el 1 y el 5 de Noviembre del 2024, se empezo a diseñar el 1/11 las 5pm y se culmino el desarrollo el 5/11 a las 6am, se termino de refinar a las 16:35

        // ****** Declarations - Getting Elements

        this.isSeeking = false;

        const audio = this.shadowRootDOM.querySelector( '#audioSongId' );
        this.audio = audio;

        const clarkCodesImagotypeButton = this.shadowRootDOM.querySelector( '#clarkCodesLogoImagotypeButtonId' );
        this.clarkCodesImagotypeButton = clarkCodesImagotypeButton;

        const clarkCodesLogoTextImage = this.shadowRootDOM.querySelector( '#clarkCodesLogoTextId' );
        this.clarkCodesLogoTextImage = clarkCodesLogoTextImage;

        const progressBarSlider = this.shadowRootDOM.querySelector( '#progressBarSliderId' );
        this.progressBarSlider = progressBarSlider;

        const currentTime = this.shadowRootDOM.querySelector( '#currentTimeId' );
        this.currentTime = currentTime;

        const totalTime = this.shadowRootDOM.querySelector( '#totalTimeId' );
        this.totalTime = totalTime;

        const playPauseReplayButton = this.shadowRootDOM.querySelector( '#playPauseReplayButtonId' );
        this.playPauseReplayButton = playPauseReplayButton;

        const stopButton = this.shadowRootDOM.querySelector( '#stopButtonId' );
        this.stopButton = stopButton;

        const volumeButton = this.shadowRootDOM.querySelector( '#volumeButtonId' );
        this.volumeButton = volumeButton;

        const volumeSlider = this.shadowRootDOM.querySelector( '#volumeSliderId' );
        this.volumeSlider = volumeSlider;

        const volumeValue = this.shadowRootDOM.querySelector( '#volumeValueId' );
        this.volumeValue = volumeValue;


        // Button Icons svgs

        const playIcon = `<svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M320-273v-414q0-17 12-28.5t28-11.5q5 0 10.5 1.5T381-721l326 207q9 6 13.5 15t4.5 19q0 10-4.5 19T707-446L381-239q-5 3-10.5 4.5T360-233q-16 0-28-11.5T320-273Z"/></svg>`;
        this.playIcon = playIcon;
        this.playPauseReplayButton.innerHTML = this.playIcon;

        const pauseIcon = `<svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M640-200q-33 0-56.5-23.5T560-280v-400q0-33 23.5-56.5T640-760q33 0 56.5 23.5T720-680v400q0 33-23.5 56.5T640-200Zm-320 0q-33 0-56.5-23.5T240-280v-400q0-33 23.5-56.5T320-760q33 0 56.5 23.5T400-680v400q0 33-23.5 56.5T320-200Z"/></svg>`;
        this.pauseIcon = pauseIcon;

        const stopIcon = `<svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M240-320v-320q0-33 23.5-56.5T320-720h320q33 0 56.5 23.5T720-640v320q0 33-23.5 56.5T640-240H320q-33 0-56.5-23.5T240-320Z"/></svg>`;
        this.stopIcon = stopIcon;
        this.stopButton.innerHTML = this.stopIcon;

        const replayIcon = `<svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440q0-17 11.5-28.5T160-480q17 0 28.5 11.5T200-440q0 117 81.5 198.5T480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720h-6l34 34q12 12 11.5 28T508-630q-12 12-28.5 12.5T451-629L348-732q-12-12-12-28t12-28l103-103q12-12 28.5-11.5T508-890q11 12 11.5 28T508-834l-34 34h6q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80Z"/></svg>`;
        this.replayIcon = replayIcon;

        const highVolumeIcon = `<svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M760-481q0-83-44-151.5T598-735q-15-7-22-21.5t-2-29.5q6-16 21.5-23t31.5 0q97 43 155 131.5T840-481q0 108-58 196.5T627-153q-16 7-31.5 0T574-176q-5-15 2-29.5t22-21.5q74-34 118-102.5T760-481ZM280-360H160q-17 0-28.5-11.5T120-400v-160q0-17 11.5-28.5T160-600h120l132-132q19-19 43.5-8.5T480-703v446q0 27-24.5 37.5T412-228L280-360Zm380-120q0 42-19 79.5T591-339q-10 6-20.5.5T560-356v-250q0-12 10.5-17.5t20.5.5q31 25 50 63t19 80Z"/></svg>`; 
        this.highVolumeIcon = highVolumeIcon;

        const lowVolumeIcon = `<svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M360-360H240q-17 0-28.5-11.5T200-400v-160q0-17 11.5-28.5T240-600h120l132-132q19-19 43.5-8.5T560-703v446q0 27-24.5 37.5T492-228L360-360Zm380-120q0 42-19 79.5T671-339q-10 6-20.5.5T640-356v-250q0-12 10.5-17.5t20.5.5q31 25 50 63t19 80Z"/></svg>`; 
        this.lowVolumeIcon = lowVolumeIcon;
        this.volumeButton.innerHTML = this.lowVolumeIcon;
        
        const mutedIcon = `<svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m720-424-76 76q-11 11-28 11t-28-11q-11-11-11-28t11-28l76-76-76-76q-11-11-11-28t11-28q11-11 28-11t28 11l76 76 76-76q11-11 28-11t28 11q11 11 11 28t-11 28l-76 76 76 76q11 11 11 28t-11 28q-11 11-28 11t-28-11l-76-76Zm-440 64H160q-17 0-28.5-11.5T120-400v-160q0-17 11.5-28.5T160-600h120l132-132q19-19 43.5-8.5T480-703v446q0 27-24.5 37.5T412-228L280-360Z"/></svg>`; 
        this.mutedIcon = mutedIcon;


        // ****** Events Setting

        playPauseReplayButton.addEventListener( 'click', this.togglePlay.bind( this ) );
        stopButton.addEventListener( 'click', this.stopSong.bind( this ) );
        progressBarSlider.addEventListener( 'input', this.seeking.bind( this ) );
        progressBarSlider.addEventListener( 'change', this.seek.bind( this ) );
        audio.addEventListener( 'loadedmetadata', this.loadSongBasics.bind( this ) );
        audio.addEventListener( 'timeupdate', this.updateProgress.bind( this ) );
        audio.addEventListener( 'play', this.updatePlayPauseIcon.bind( this ) );
        audio.addEventListener( 'pause', this.updatePlayPauseIcon.bind( this ) );
        audio.addEventListener( 'ended', this.songEnd.bind( this ) );
        volumeButton.addEventListener( 'click', this.toggleMute.bind( this ) );
        volumeSlider.addEventListener( 'input', this.setVolume.bind( this ) );
        clarkCodesImagotypeButton.addEventListener( 'click', this.openClarkCodesGitHubRepositoryLink.bind( this ) );
        clarkCodesLogoTextImage.addEventListener( 'click', this.openClarkCodesGitHubRepositoryLink.bind( this ) );
    }


    // ****** HTML Interface Code

    template() {
        return `
<div class="PlayerContainer">
    <div class="ClarkCodesLogoClass">
        <button id="clarkCodesLogoImagotypeButtonId">
            <img id="clarkCodesLogoImagotypeId" src=${import.meta.resolve( '../assets/images/ClarkCodes Logo OnTransparent_100x100px_300ppi.webp' )} width="30px" alt="ClarkCodes Logo Imgotipo">
        </button>
        <img id="clarkCodesLogoTextId" src=${import.meta.resolve( '../assets/images/ClarkCodes only Text OnTransparent.webp' )} width="30px" alt="ClarkCodes Logo Text">
    </div>
    <div class="BasicInfoClass">
        <h2 id="titleId"></h2>
        <h3 id="artistAlbumId"></h3>
    </div>
    <div class="ProgressBarClass">
        <input type="range" id="progressBarSliderId" min="0" value="0" step="1">
        <div class="DurationClass">
            <span id="currentTimeId">0:00</span>
            <span id="totalTimeId">0:00</span>
        </div>
    </div>
    <div class="ControlsClass">
        <div id="controlsLeftSpacer"></div>
        <div class="MainControlsClass">
            <button id="playPauseReplayButtonId"></button>
            <button id="stopButtonId"></button>
        </div>
        <div class="RightSideControlsClass">
            <div class="VolumeControlClass">
                <button id="volumeButtonId"></button>
                <div class="VolumeSliderClass">
                    <input type="range" id="volumeSliderId" min="0" max="100" value="50">
                    <span id="volumeValueId">50</span>
                </div>
            </div>
        </div>
    </div>
    <audio id="audioSongId">
        Tu navegador no admite el formato Mp3.
    </audio>
</div>
        `;
    }
 

    // ****** CSS Code for Styling

    templateCss() {
        return `
            <style id="playerStyleSheetId">
                /* Estilos del Reproductor de Musica Personalizado - Desarrollado por ClarkCodes entre el 1 y el 5 de Noviembre del 2024, se termino de refinar a las 16:35 */
:host { /* Colores usados multiples veces */
    --secondary-accent-color-darkest : #F1E37D;
}


/* Estilos Generales */

* { 
    font-size: 11pt;
    font-family: 'Poppins';
    font-weight: normal;
}

body {
    background-color: rgba( 0, 0, 0, 0 );
    display: grid;
    place-self: center;
}

h2 {
    font-size: 16pt;
}

h3 {
    font-size: 12pt;
}


/* Estilos de Clases y Elementos */

.PlayerContainer::before {
    position: absolute;
    z-index: -1;
    content: "";
    width: 100%;
    height: 100%;
    background-position:top;
    background-size: cover;
    background-color: orange;
    filter: blur( .5px ) brightness( .8 );
    opacity: .7;
    border-radius: 17px;
}

.PlayerContainer {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40vw;
    height: 240px;
    min-width: 384px;
    min-height: 240px;
    border-radius: 17px;
    border: 1px solid orange;
    box-shadow: 0 12px 24px 0 rgba( 0, 0, 0, .4 );
    color: whitesmoke;

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background: none;
        border: 0;
        user-select: none;
        width: 40px;
        height: 40px;
    }
    
    .ClarkCodesLogoClass {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        height: 52px;
        width: 84%;

        #clarkCodesLogoImagotypeButtonId {
            transform: translateX( 15px );
            border-radius: 50%;
            transition: transform .3s ease-in-out, filter .65s ease-in-out, background-color .3s ease;

            img {
                transition: filter .4s ease-in-out;
            }
        }

        #clarkCodesLogoTextId {
            transform: translateX( -10px );
            opacity: 0;
            transition: opacity .15s ease, filter .5s ease-out;
        }

        &:hover {
            #clarkCodesLogoImagotypeButtonId {
                background-color: rgba( 0, 0, 0, .8 );
                opacity: .85;

                /* Media Queries to fix the translateX of the Logo Button when resizing the window and its position stil look ok when animating, making it responsive */
                @media( max-width: 550px ) {
                    transform: translateX( -24vw );
                }

                @media (min-width: 551px) and (max-width: 600px) {
                    transform: translateX( -22.5vw );
                }

                @media (min-width: 601px) and (max-width: 700px) {
                    transform: translateX( -19.5vw );
                }

                @media (min-width: 701px) and (max-width: 850px) {
                    transform: translateX( -15.8vw );
                }

                @media (min-width: 851px) and (max-width: 920px) {
                    transform: translateX( -14.4vw );
                }

                @media (min-width: 921px) and (max-width: 1150px) {
                    transform: translateX( -13.55vw );
                }

                @media (min-width: 1151px) and (max-width: 1450px) {
                    transform: translateX( -14.5vw );
                }

                @media (min-width: 1451px) and (max-width: 1550px) {
                    transform: translateX( -14.8vw );
                }

                @media (min-width: 1551px) and (max-width: 1799px) {
                    transform: translateX( -14.5vw );
                }

                @media (min-width: 1800px) and (max-width: 1920px) {
                    transform: translateX( -15vw );
                }

                @media( min-width: 1921px ) {
                    transform: translateX( -17vw );
                }
                
                
                &:hover {
                    filter: drop-shadow( 0px 0px 7px var( --secondary-accent-color-darkest ) );
                    transition: filter .2s ease-out;
                }
                
                img {
                    filter: drop-shadow( 0px 0px 3px var( --secondary-accent-color-darkest ) );
                    transition: filter .65s ease-in-out;
                }
            }

            #clarkCodesLogoTextId {
                cursor: pointer;
                scale: 2.1;
                opacity: 1;
                transition: scale .25s ease-in-out, opacity .15s ease, filter .4s ease-out;

                &:hover {
                    filter: drop-shadow( 0px 0px 1.2px var( --secondary-accent-color-darkest ) );
                    transition: filter .3s ease;
                }
            }
        }
    }

    .BasicInfoClass {
        position: relative;
        flex-direction: column;
        align-items: start;
        padding-inline: 0vw;
        margin-top: 52px;
        width: 84%;

        h2, h3 {
            line-height: 10pt;
            margin-top: 0vh;
        }

        #titleId {
            font-weight: bold;   
        }
    }

    .ProgressBarClass {
        position: relative;
        justify-content: left;
        align-items: center;
        border-radius: 5px;
        margin-top: 5px;
        width: 84%;
        height: 1px;

        #progressBarSliderId {
            position: relative;
            cursor: pointer;
            width: 100%;
            opacity: .58;
            transition: opacity .2s ease;

            &:hover {
                opacity: 1;
                transition: opacity .2s ease;
            }
        }

        .DurationClass {
            position: relative;
            display: flex;
            width: 100%;
            margin-top: -.2vh;
            justify-content: space-between;
            flex-direction: row;
            color: rgba( 255, 255, 255, .58 );

            #currentTimeId {
                margin-left: .3vw;
            }

            #totalTimeId {
                justify-self: end;
            }
        }
    }
    
    .ControlsClass {
        position: relative;
        display: flex;
        justify-content: center;
        margin-bottom: 1vh;
        margin-top: 49px;
        width: 84%;

        svg {
            scale: 1.7;
        }

        button {
            border-radius: 50%;
            opacity: .8;
            transition: background-color .3s ease, opacity .3s ease, filter .3s ease-out;

            &:active { 
                opacity: 1;
                background-color: rgba( 255, 255, 255, .4 );
                filter: drop-shadow( 0px 0px 10px var( --secondary-accent-color-darkest ) );
                transition: background-color .3s ease, filter .3s ease-out;
            }

            &:hover {
                opacity: 1;
                filter: drop-shadow( 0px 0px 10px var( --secondary-accent-color-darkest ) );
                transition: opacity .15s ease, filter .15s ease;
            }
        }

        #controlsLeftSpacer {
            width: 33%;
        }

        .MainControlsClass {
            display: flex;
            width: 33%;
            button {
                margin-inline: auto;
            }
        }

        .RightSideControlsClass {
            width: 33%;
            display: flex;
            align-items: center;
            justify-content: right;

            .VolumeControlClass {
                display: flex;
                align-items: center;
                justify-content: right;
                width: 10px;
    
                #volumeButtonId {
                    transform: translateX( 7.3vw );
                    transition: transform .3s ease;
                }

                .VolumeSliderClass {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: right;
                    width: 7vw;
                    transition: opacity .1s ease, visibility .1s ease;
                    opacity: 0;
                    visibility: hidden;
    
                    #volumeSliderId {
                        width: 5vw;
                        margin-inline: .5vw;
                        cursor: pointer;
                    }

                    #volumeValueId {
                        color: rgba( 255, 255, 255, .58 );
                        width: 5px;
                        margin-right: 17px;
                    }
                }
                
                &:hover { 
                    #volumeButtonId {
                        transform: translateX( -1px );
                        transition: transform .15s ease;
                    }

                    .VolumeSliderClass {
                        display: flex;
                        transition: opacity .1s ease, visibility .1s ease;
                        opacity: 1;
                        visibility: visible;
                    }
                }
            }
        }
    }
}

audio {
    display: none;
}
            </style>
        `;
    }

    disconnectedCallback() {
        this.remove();
    }


    // ****** Logic Methods

    formatToMinSec( totalSeconds ) { // Formats to Minutes and Seconds ( m:ss )
        const minutes = ( totalSeconds / 60 ) | 0; // Removing the floating fractional part of the float with a bitwise operation
        const seconds = ( totalSeconds % 60 ) | 0;

        // Add leading zero to seconds if needed
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

        return `${minutes}:${formattedSeconds}`;
    }

    loadSongBasics() {
        const totalSeconds = parseInt( this.audio.duration );
        this.progressBarSlider.max = totalSeconds;
        this.totalTime.textContent = this.formatToMinSec( totalSeconds );
        this.audio.volume = 0.5;
    }

    togglePlay() {
        if ( this.audio.ended ) { // If the Song has ended and we want to replay it
            this.audio.currentTime = 0.0;
            this.audio.play();
        } else if ( this.audio.paused ) { // If the song is Paused
            this.audio.play();
        } else { // If the song is currently playing
            this.audio.pause();
        }
    }

    stopSong() {
        if( this.audio.currentTime > 0 ) {
            this.audio.pause();
            this.audio.currentTime = 0.0;
        }
    }

    updateProgress() {
        if ( !this.isSeeking ) {
            this.progressBarSlider.value = this.audio.currentTime | 0;
            this.currentTime.textContent = this.formatToMinSec( this.audio.currentTime );
        }
    }

    seeking() {
        if ( !this.isSeeking ) { 
            this.isSeeking = true; 
        }
    
        this.currentTime.textContent = this.formatToMinSec( this.progressBarSlider.value );
    }

    seek() {
        this.isSeeking = false;
        this.audio.currentTime = this.progressBarSlider.value * 1.0;
    }

    songEnd() {
        this.playPauseReplayButton.innerHTML = this.replayIcon;
    }

    toggleMute() {
        if ( this.audio.muted ) {
            this.audio.muted = false;
            const volume = this.audio.volume * 100;
            this.volumeSlider.value = volume;
            this.updateVolumeIcon( volume );
        }
        else {
            this.audio.muted = true;
            this.volumeSlider.value = 0;
            this.volumeButton.innerHTML = this.mutedIcon;
        }
    
        this.volumeValue.textContent = this.volumeSlider.value;
    }

    setVolume() {
        const volume = this.volumeSlider.value;
        this.audio.volume = volume / 100;
        this.volumeValue.textContent = volume;
        this.updateVolumeIcon( volume );

        if( volume > 0 && this.audio.muted ) {
            this.audio.muted = false;
        }
    }

    updatePlayPauseIcon() {
        this.playPauseReplayButton.innerHTML = this.audio.paused ? this.playIcon : this.pauseIcon;
    }

    updateVolumeIcon( volume ) {
        this.volumeButton.innerHTML = volume == 0 ? this.mutedIcon : ( ( volume > 50 ) ? this.highVolumeIcon : this.lowVolumeIcon );
    }

    openClarkCodesGitHubRepositoryLink() {
        window.open('https://github.com/ClarkCodes', '_blank');
    }
}

customElements.define( 'cc-audio-player', ClarkCodesAudioPlayer );