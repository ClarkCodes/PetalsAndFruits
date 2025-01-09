// Author: ClarkCodes - Web Component del Reproductor de Musica Personalizado ClarkCodesAudioPlayer - Componentizado por ClarkCodes el 6 de Enero del 2025, basado en ClarksAudioPlayer
// Version: 1.0.0

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
        songTitle.innerHTML = this.hasAttribute( 'song-name' ) ? this.getAttribute( 'song-name' ) : 'Sin Nombre';
        songArtistAlbum.innerHTML = this.hasAttribute( 'artist-album' ) ? this.getAttribute( 'artist-album' ) : 'Sin Artista - Sin Álbum';

        // Setting the Background Song Album Cover Image
        this.coverImageToSet = this.hasAttribute( 'cover-img' ) ? this.getAttribute( 'cover-img' ) : '../common/images/Superman_ManOfSteel_Logo_OnBlack.jpg';
        const styleSheet = this.shadowRootDOM.querySelector( '#playerStyleSheetId' ).sheet; 
        const fullRule = `.PlayerContainer::before { background-image: url( ${this.coverImageToSet} ); }`; // Construct the full rule
        styleSheet.insertRule( fullRule, styleSheet.cssRules.length ); // Insert the rule into the stylesheet 
    } 
    
    static get observedAttributes() { 
        return ['src', 'type', 'autoplay', 'loop', 'song-name', 'artist-album', 'cover-img']; 
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
        const playPauseReplayImage = this.shadowRootDOM.querySelector( '#playPauseReplayButtonId img' );
        this.playPauseReplayImage = playPauseReplayImage;
        const stopButton = this.shadowRootDOM.querySelector( '#stopButtonId' );
        this.stopButton = stopButton;
        const volumeButton = this.shadowRootDOM.querySelector( '#volumeButtonId' );
        this.volumeButton = volumeButton;
        const volumeImage = this.shadowRootDOM.querySelector( '#volumeButtonId img' );
        this.volumeImage = volumeImage;
        const volumeSlider = this.shadowRootDOM.querySelector( '#volumeSliderId' );
        this.volumeSlider = volumeSlider;
        const volumeValue = this.shadowRootDOM.querySelector( '#volumeValueId' );
        this.volumeValue = volumeValue;

        const playIcon = '../common/icons/play_arrow_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24.svg';
        this.playIcon = playIcon;
        const pauseIcon = '../common/icons/pause_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24.svg';
        this.pauseIcon = pauseIcon;
        const replayIcon = '../common/icons/replay_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24.svg';
        this.replayIcon = replayIcon;
        const highVolumeIcon = '../common/icons/volume_up_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24.svg';
        this.highVolumeIcon = highVolumeIcon;
        const lowVolumeIcon = '../common/icons/volume_down_alt_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24.svg';
        this.lowVolumeIcon = lowVolumeIcon;
        const mutedIcon = '../common/icons/no_sound_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24.svg';
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
            <img id="clarkCodesLogoImagotypeId" src="../common/images/ClarkCodes Logo OnTransparent_100x100px_300ppi.webp" width="30px" alt="ClarkCodes Logo Imgotipo">
        </button>
        <img id="clarkCodesLogoTextId" src="../common/images/ClarkCodes only Text OnTransparent.webp" width="30px" alt="ClarkCodes Logo Text">
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
            <button id="playPauseReplayButtonId">
                <img src="../common/icons/play_arrow_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24.svg" alt="Play and Pause Icon">
            </button>
            <button id="stopButtonId">
                <img src="../common/icons/stop_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24.svg" alt="Stop Icon">
            </button>
        </div>
        <div class="RightSideControlsClass">
            <div class="VolumeControlClass">
                <button id="volumeButtonId">
                    <img src="../common/icons/volume_down_alt_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24.svg" alt="Volume Icon">
                </button>
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

        img {
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
        this.playPauseReplayImage.setAttribute( 'src', this.replayIcon );
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
            this.volumeImage.setAttribute( 'src', this.mutedIcon );
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
        this.playPauseReplayImage.setAttribute( 'src', ( this.audio.paused ? this.playIcon : this.pauseIcon ) );
    }

    updateVolumeIcon( volume ) {
        this.volumeImage.setAttribute( 'src', volume == 0 ? this.mutedIcon : ( ( volume >= 50 ) ? this.highVolumeIcon : this.lowVolumeIcon ) );
    }

    openClarkCodesGitHubRepositoryLink() {
        window.open('https://github.com/ClarkCodes', '_blank');
    }
}