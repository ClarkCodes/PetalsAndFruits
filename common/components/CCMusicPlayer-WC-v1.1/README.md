# ClarkCodesMusicPlayer Web Components
<p align="center">
  
</p>
<div align="center">
  <img src="https://github.com/user-attachments/assets/ee5e4e61-4bb3-49d6-8611-44bfcb2f13d0" height="250" />

[![Static Badge](https://img.shields.io/badge/Version-v1.1-orange)](https://github.com/clarkcodes/ClarkCodesMusicPlayer-WebComponents/releases)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://github.com/clarkcodes/ClarkCodesMusicPlayer-WebComponents/blob/main/LICENSE)

  ### **✨ Fully custom, elegant Music and Audio Players Web Components. Listen what you want with style. ✨**
</div>

Welcome, thank you for visiting this repository, here you will find the web components in ClarkCodesMusicPlayer, for now there is only one, but it is planned in the future it would be two at least, the one it is here now is ClarkCodesAudioPlayer, but on next it is planned that also be here the ClarkCodesMusicPlayer itself, the difference between these two is explained by their names, one is an audio player and the another one is a music player, the audio player is meant to play only 1 song or audio with limited functionalities, while the music player is meant to be a full music player with extended functionalities, this second one is actually based on the first one, like a natural evolution and extension of it.

## ClarkCodesAudioPlayer
This is an html audio tag wrapper made as a fully custom audio player web component, with a much greater look and feel, an open source project made by me from scratch as part of my personal learning process, so I wanted to share it, for everyone to be able to see how it is made, to read the code or to just use it if you need something like this for your web.

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

I only used HTML, CSS and Javascript Vanilla, with no frameworks at all, using html DOM custom elements, maximizing compatibility, you can use it practically in any web development project.

## State
The project currently is on the version **```v1.1```**, this last version brings many improvements, fixes and updates that makes it incredibly better, solves problems it had before, so much easier to use.

If you want to know the details about what has change in this version, check the changelog corresponding to this version in the [releases section](https://github.com/clarkcodes/ClarkCodesMusicPlayer-WebComponents/releases).

## How to use it
Ok, you can use this web component really easy, let's only review a few basic steps to get you done with it, check these steps are met in your project:

### 1. Preparation<br>
Download and Copy the ClarkCodesMusicPlayer folder to your web project components folder, or to the folder you want to store the component in.

For example, it would look something like this:

<p align="center">
  <img src="https://github.com/user-attachments/assets/477d6546-d47e-4158-a118-11b05c4df034" width="250" />
</p>

### 2. Importing the component<br>
In the html code of the page where you want to use the component, place a script tag at the end of the body when the DOM has practically already loaded. 
Set the script tag attribute "type" to 'module', inside just do an import of the component javascript file: ClarkCodesAudioPlayer.js.

And that is it, this is all you need to do to use it, you only need to import it where you want to use it and nothing more, this fantastic!, it automatically manages its visual style, fonts and anything it needs to work properly, easy and practical.

   For example, it would be something like this:

   ``` HTML
<html>
...
   <body>
        <header>...</header>
        ...
        <main>
             ...
        </main>
        <footer>...</footer>
        <script type="module">
            import '../common/components/ClarkCodesMusicPlayer/ClarkCodesAudioPlayer/ClarkCodesAudioPlayer.js';
        </script>
   </body>
</html>
   ```
   
### 3. Use the component wherever you want<br>
In any page you want, you can use different instances of it, every tag of the component represents an instance of it.
The component works with a custom tag, by default this tag is ```<cc-audio-player />```, this is a self-closing tag, so you only need the opening tag, you can change this tag name if you want by changing the corresponding parameter at the end of the component javascript file, but if you do it, remember you will have to use the tag with the name you set. 

> [!IMPORTANT]
> All the resources the component needs to work properly are in the 'assets' directory of the component folder. It is not recommendable to make changes in the component folder files unless you know what you are doing and only if you are sure you can match any change and resolve any inconsistence inside the component javascript file.
Also remember to verify the path you are using to make the import must match with your project structure, the path in the example is based on the project file tree shown before, but you verify your path with your own project structure file tree, it must point to the component javascript file, change and adjust that path if needed in order to set it properly.

Then, use this tag where you want to show the audio player in your page, put it as it suits you.
   For example, it would look something like this:
``` HTML
   <!DOCTYPE html>
   <html lang="es">
        <head>
             <meta charset="UTF-8">
             <meta name="viewport" content="width=device-width, initial-scale=1.0">
             <title>Your Page Title</title>
             ... 
        </head>
        <body>
             ...
             <section id="audioPlayerSectionId">
                  <cc-audio-player src="../common/audios/Love Thing.mp3" type="audio/mpeg" autoplay="true" song-name="Love Thing" artist="Joe Satriani" album="Crystal Planet" cover-img="../common/images/Satriani-BCN-2023-1.jpg" />
             </section>
             ...
             <script type="module">
                  import '../common/components/ClarkCodesMusicPlayer/ClarkCodesAudioPlayer/ClarkCodesAudioPlayer.js';
             </script>
        </body>
   </html>
   ```
This use of the component would render like this:

<p align="center">
  <img src="https://github.com/user-attachments/assets/45adb0d1-d932-482b-ae31-ca2acec846c6" height="250" />
</p>

## Finally, know the component tag structure<br>
The component uses 8 possible attributes, some of them are mandatory to work properly and some of them are optional.<br>
The mandatory and/or highly recommended attributes are: src, song-name, artist and cover-img.<br>
The optional properties are: album, autoplay, type and loop.<br>
Actually the song-name, artist, album and cover-img are not strictly needed and mandatory, the component could still work without these attributes, but it would be really weird to have a player without a song name, without artist or cover image, nevertheless, there are fallback elements to supply these attributes in the case they were not specified, but it is highly recommended to provide them.

> [!NOTE]
> The only real mandatory attribute is src, in order for the audio to play, without it, no sound or audio would be played and the component would make no sense.

The component is based on the html audio tag, it is actually a customization wrapper of it and uses an actual audio tag underneath to work, so some of these attributes are the same of the audio tag.

You can see the attributes with their description as follows:

| Attribute           | Description                                                  |
| --------------------| ------------------------------------------------------------ |
| src                 | Specifies the URL of the audio file.                         |
| song-name           | Specifies the name of the song to show on the player, it must be a text value. |
| artist              | Specifies the artist to show on the player, it must be a text value. |
| album               | Specifies the album to show on the player, it must be a text value, it is optional, you can omit it. |
| cover-img           | Specifies the URL of the image that would be used as the background image of the player, a text value with a relative path to the audio file in the project, it could be an album cover, an image of an artist or any image you want to use, it is recommended to be an image related to the song or audio you use. |
| autoplay            | Specifies that the audio will start playing as soon as it is ready. It is a boolean value, if it is present with any value, even with false, it will be taken as true, so only include this attribute when you want its functionality. |
| type                | Specifies the MIME-type of the resource. |
| loop                | Specifies that the audio will start over again, every time it is finished. It is a boolean value, if it is present with any value, even with false, it will be taken as true, so only include this attribute when you want its functionality. |

> [!TIP]
> It is maybe possible to set other audio tag attributes, but is strongly recommended to use only these eight attributes that are the officialy supported.

> [!IMPORTANT]
> If you don't specify a 'cover-img' attibute and you completely omit it, then a fallback image is set, but it is recommended you set a custom image. Also verify that the specified path is valid, if the path does not point to an image file, the fallback image cannot take place because a path has been provided but given it is not valid, no image will be shown, showing only a plain color, and this probably is not the desired behavior, so make sure the path you provide is correct and a valid one.

## You are all set
This is it, if you checked these 3 steps and know what these attributes represent, then you should have the component working properly, enjoy it!.<br><br>

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

``` Python 
Clark.
```
