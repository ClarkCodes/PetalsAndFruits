# ClarkCodesMusicPlayer Web Components
<p align="center">
  <img src="https://github.com/user-attachments/assets/ee5e4e61-4bb3-49d6-8611-44bfcb2f13d0" height="250" />
</p>

Welcome, thank you for visiting this repository, here you will find the web components in ClarkCodesMusicPlayer, for now there is only one, but it is planned in the future it would be two at least, the one it is here now is ClarkCodesAudioPlayer, but on next it is planned that also be here the ClarkCodesMusicPlayer itself, the difference between these two is explained by their names, one is an audio player and the another one is a music player, the audio player is meant to play only 1 song or audio with limited functionalities, while the music player is meant to be a full music player with extended functionalities, this second one is actually based on the first one, like a natural evolution and extension of it.

## ClarkCodesAudioPlayer
This is a fully customized audio player web component, an open source project made by me from scratch as part of my personal learning process, so I wanted to share it, for everyone to be able to see how it is made, to read the code or to just use it if you need something like this for your web.

## Technologies used
<p align="center" gap="7vw">
  <img alt="HTML5 Logo" height="50" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" gap="7vw">
  <img alt="CSS Logo" height="50" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" gap="7vw">
  <img alt="Javascript Logo" height="50" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" gap="7vw">
</p>

<p align="center">
  <a href="https://dev.w3.org/html5/spec-LC/"><img src="https://img.shields.io/badge/HTML-5-E34F26.svg?longCache=true&style=plastic&logo=html5&color=E34F26" alt="HTML5 shield image"></a>
  <a href="https://www.w3schools.com/css/"><img src="https://img.shields.io/badge/CSS-3-1572B6.svg?longCache=true&style=plastic&logo=css3&color=1572B6" alt="CSS shield image"></a>
  <a href="https://www.w3schools.com/js/default.asp/"><img src="https://img.shields.io/badge/Javascript--F7DF1E.svg?longCache=true&style=plastic&logo=JavaScript&color=F7DF1E" alt="JavaScript shield image"></a>
</p>

I only used HTML, CSS and Javascript Vanilla, with no frameworks at all, maximizing compatibility, you can use it practically in any web development project.

## How to use it
Ok, you can use this web component easily, let's only review a few steps to get you done with it, for it, check these steps are met in your project:

### 1. Preparation<br>
Download and Copy the ClarkCodesMusicPlayer folder to your web project components folder, or to the folder you want to store the component in.

For example, it would look something like this:

<p align="center">
  <img src="https://github.com/user-attachments/assets/82690af6-e605-48a1-9d29-c8f456d56585" width="250" />
</p>

### 2. Importing the component<br>
In the html code of the page you want to use the component in, inside a script block or in a javascript file used in the page, do an import of the ClarkCodesAudioPlayer component, but do it at the end of the body or when the DOM has already loaded.

   For example, it would be something like this:

   ``` HTML
   <body>
        <header>...</header>
        ...
        <main>
             ...
        </main>
        <footer>...</footer>
        <script type="module">
            import {ClarkCodesAudioPlayer} from '../common/components/ClarkCodesMusicPlayer/ClarkCodesAudioPlayer/ClarkCodesAudioPlayer.js';
            window.customElements.define( 'clark-codes-audio-player', ClarkCodesAudioPlayer );
        </script>
   </body>
   ```
   
### 3. Taking care of the visual aspect<br>
The component uses the Poppins font to show text in it, two weights of it, normal and bold, if you already use this font in your project then you can skip this step, but if not, you will need to make an import of the css styles file that would declare these fonts in your page, it is a very lightweight file only declaring these two weights of the font, do this inside the head tag of your page using a style tag. All the resources the component needs to work properly are in the 'common' directory of the component folder, including this css styles file, you only need to point to it. It is not recommendable to make changes in the component's folder files unless you know what you are doing and you can match it inside the component's javascript file.

   For example, it would be something like this:
   
   ``` HTML
   <!DOCTYPE html>
   <html lang="es">
        <head>
             <meta charset="UTF-8">
             <meta name="viewport" content="width=device-width, initial-scale=1.0">
             <title>Your Page Title</title>
             <style>@import url( "../common/components/ClarkCodesMusicPlayer/common/fonts/fontStyle.css" );</style>
        </head>
        <body>
             ...
             <script type="module">
                  import {ClarkCodesAudioPlayer} from '../common/components/ClarkCodesMusicPlayer/ClarkCodesAudioPlayer/ClarkCodesAudioPlayer.js';
                  window.customElements.define( 'clark-codes-audio-player', ClarkCodesAudioPlayer );
             </script>
        </body>
   </html>
   ```
   
### 4. Use the component wherever you want<br>
In any page you want, you can use different instances of it, every tags pair represents an instance, previously, when importing the component, it was declared with a custom tag using the method 'window.customElements.define()', this method requires two parameters, the first one is the custom tag name we want to use and the second one, the class of the web component that was imported in the previous line, in this example the resulting tag is '<clark-codes-audio-player></clark-codes-audio-player>', you can change this tag name as you want changing the parameter name when calling this method, but remember you have to use the tag with the name you set in it. 

Also remember to verify the paths you are using to make the imports, these must match with your project structure, the paths in the examples are based on the project file tree shown before, but you verify the paths with your own project structure file tree, change them and adjust them if needed to set them properly.

Then, use this tag where you want show the audio player in your page, put it as it suits you.

   For example, it would look like this:
``` HTML
   <!DOCTYPE html>
   <html lang="es">
        <head>
             <meta charset="UTF-8">
             <meta name="viewport" content="width=device-width, initial-scale=1.0">
             <title>Your Page Title</title>
             <style>@import url( "../common/components/ClarkCodesMusicPlayer/common/fonts/fontStyle.css" );</style>
        </head>
        <body>
             ...
             <section id="audioPlayerSectionId">
                  <clark-codes-audio-player src="../common/audios/Love Thing.mp3" type="audio/mpeg" autoplay="true" song-name="Love Thing" artist-album="Joe Satriani - Crystal Planet" cover-img="../common/images/Satriani-BCN-2023-1.jpg" ></clark-codes-audio-player>
             </section>
             ...
             <script type="module">
                  import {ClarkCodesAudioPlayer} from '../common/components/ClarkCodesMusicPlayer/ClarkCodesAudioPlayer/ClarkCodesAudioPlayer.js';
                  window.customElements.define( 'clark-codes-audio-player', ClarkCodesAudioPlayer );
             </script>
        </body>
   </html>
   ```
Be careful about not changing the internal files location of the component folder, if you do it then some functionalities would break and will not work properly, then you would have to adjust those paths in the internal code of the component, it could take little while to understand the component code, but it is not so long, sure you can do it, althought if you don't really have to do it then it is recommended to keep the structure inside the component folder as is.

### 5. Finally, know the component tag structure<br>
The component uses 7 possible attributes, some of them are mandatory to work properly and some of them are optional.<br>
The mandatory attributes are: src, song-name, artist-album and cover-img.<br>
The optional properties are: autoplay, type and loop.<br>
The component is based on an audio tag, it is actually a customization of it and it uses an audio tag underneath to work, so some of these attributes are the same of the audio tag.

* 'src': Specifies the URL of the audio file.
* 'song-name': Specifies the name of the song to show on the player, it must be a text value.
* 'artist-album': Specifies the artist and the album to show on the player, it must be a text value, the artist and the album should separated by a spaced hyphen ' - ', or you can omit the album and the hyphen if you want and set only the artist.
* 'cover-img': Specifies the URL of the image that would be used as the background image of the player, it could be an album cover, an image of an artist or an image you want, it is recommended to be an image related to the song or audio you use.
* 'autoplay': Specifies that the audio will start playing as soon as it is ready. It is a boolean value, if it is present with any value, even with false, it will be taken as true, so only include this attribute when you want its functionality.
* 'type': Specifies the MIME-type of the resource.
* 'loop': Specifies that the audio will start over again, every time it is finished. It is a boolean value, if it is present with any value, even with false, it will be taken as true, so only include this attribute when you want its functionality.

It is maybe possible to set other audio tag attributes, but is strongly recommended to use only these seven attributes that are the officialy supported.

If you don't specify a 'cover-img' attibute and you completely omit it, then a default image is set, but it is recommended you set a custom image.

## You are all set
This is it, if you checked these 5 steps then you should have the component working properly, enjoy it!.<br><br>

## ![ClarkCodes Logo OnTransparent_100x100px_300ppi](https://user-images.githubusercontent.com/39943822/235443512-3ab382e8-888e-4d2d-87ba-1c8f4ef3ec45.png) Hey what's up man!, I'm Clark.
[![Twitter Follow](https://img.shields.io/twitter/follow/ClarkCodes?style=social)](https://twitter.com/clarkcodes)
[![GitHub Followers](https://img.shields.io/github/followers/ClarkCodes?style=social)](https://github.com/ClarkCodes)

I'm a self-taugh Software Developer, currently I'm studying a Software Engineering University Superior Grade career, passionated for programming and technology.

### How to contact me
- 📫 You can send me an email to clark.codes.sk@gmail.com so I will try to respond as soon as possible, you can also follow me on my socials and check my content.

###
 
<div> 
  <a href="https://www.youtube.com/@ClarkCodes?sub_confirmation=1" target="_blank"><img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" target="_blank"></a>
  <a href="https://instagram.com/ClarkCodes" target="_blank"><img src="https://img.shields.io/badge/-Instagram-%23E4405F?style=for-the-badge&logo=instagram&logoColor=white" target="_blank"></a> 
  <a href = "mailto:clark.codes.sk@gmail.com"><img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
</div>

## Thanks for visiting

Thank you very much for visiting and checking this project, I loved doing it, it is been very cool, I learned a lot and I still learning, I could improve on a lot of things about my web development skills, and the idea is you are able to use it and also enjoy this project, hopefully it would be useful and it works for you, so I see you soon around with more projects, on YouTube with more videos and on the other socials, don't forget to follow me for you to know about what is next and what is coming, huge hug for you, cheers!!... with love, enthusiasm and of course...

Happy Coding! <3 

`Clark`.
