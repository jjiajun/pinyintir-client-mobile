<div id="top"></div>

## PinYinTir
Learning Chinese has never been easier. With **PinYinTir**, you can scan an image of Chinese text and understand it immediately!

This is the frontend repo. Backend repo can be found [here](https://github.com/jjiajun/Chinese-AR-App-Backend).


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#usage--features">Usage / Features</a>
    </li>
    <li>
      <a href="#built-with">Built With</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

<div align="center">
  <img src="https://user-images.githubusercontent.com/40411953/160347715-d4f57c90-615a-4913-9891-1b178f84c85e.png" />
</div>

Mandarin Chinese is one of the most widely spoken languages in the world, with over 900 million native speakers and close to 200 million second language speakers, as per the 2022 Edition of Ethnologue.

The problem with languages like Chinese is that it is not a phonetic language. Hanyu Pinyin, often abbreviated to pinyin, is the official romanization system for Standard Mandarin Chinese. It is often used to teach Mandarin Chinese, which is written using the standard Chinese characters and the pronounciations of these characters are demonstrated through their according pinyin romanization. 

A problem then arises: how does one go about learning or pronouncing a new character that one encounters without pinyin?

Traditional means like dictionaries are not a viable option as they require one to know either the pinyin or the radicals (i.e. the different strokes of the character) to be able to look up the character. 

Newer means like Google Translate provide some help in this regard but are lacking also, as the pinyin and pronounciation are not the main focus. Rather, the focus is on the translation and it is really only helpful if you want to know just the meaning of the words in another language. 

We present _**PinYinTir**_. A mobile app that provides the pinyin translation, and pronounciation of any Chinese text scanned via the camera through the use of optical character recognition. These are overlaid on the original image for easy reference and users can save phrases and/or images for future reference. Look no further for your solution to learning Chinese easily!

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage / Features

<!-- <div align="center"><img src="https://user-images.githubusercontent.com/40411953/158035858-782bd724-4abb-4458-892e-d9b78ca57667.png" /></div> -->

<br />1. Once the app loads, you should be brought to the Scan page and be greeted with a camera view. Scan an image that includes Chinese text. The pinyin of any detected Chinese text will be shown as an overlay on the image. You can tap on each individual phrase to see the English translation and text-to-speech functionality.<br /><br />

<!-- <div align="center"><img src="https://user-images.githubusercontent.com/40411953/158035913-071aa70f-b4a7-4b51-9b43-aaba9aa6cb2b.png" /></div> -->

<br />2. Although this application can be used without any sign up needed, signing up for an account will unlock the other features - mainly to save phrases and images. Click on Log In on the nav bar to log in or sign up.<br /><br />

<!-- <div align="center"><img src="https://user-images.githubusercontent.com/40411953/158035981-89829d69-e8db-43a6-903a-c9855962714d.png" /></div> -->

<br />3. Upon log in, you will be brought back to the Scan page. This time, the nav bar should be updated with additional pages - Images, Phrases, and Settings.<br /><br />

<!-- <div align="center"><img src="https://user-images.githubusercontent.com/40411953/158036032-78fd3a16-3461-4937-81a2-e432f4de9e55.png" /></div> -->

<br />4. Now, when any image is scanned and the results shown, there is an option to save this image. Also, when viewing individual phrases, there is also an option to save just this phrase alone.<br /><br />

<!-- <div align="center"><img src="https://user-images.githubusercontent.com/40411953/158036333-dfe02ea2-7aae-4b55-8720-4fd163a0ffdc.png" /></div> -->

<br />5. Go to the Images page to view all your past saved images.<br /><br />

<br />6. Go to the Phrases page to view all your past saved phrases. Here, you can create categories for these phrases and sort them accordingly. <br /><br />

<br />7. Go to the Settings page to adjust the pitch and speed of the text-to-speech voice. You can also log out here.<br /><br />

<p align="right">(<a href="#top">back to top</a>)</p>

## Built With

<strong>Frontend</strong>
* [React Native](https://reactnative.dev/)

<strong>Backend</strong>
* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)

<strong>Functionality</strong>
* [Google Cloud Vision](https://cloud.google.com/vision)
* [Google Cloud Translate](https://cloud.google.com/translate)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```
* Install Expo Go on your mobile device from either App Store (Apple) or Play Store (Android

### To run

Backend

The backend is hosted on Heroku already and no setup is necessary. Please contact the developers if you wish to get a local copy of the backend repo running. 

Frontend

1. Clone the repo
2. Create .env file
  ```sh
  REACT_APP_BACKEND=https://chinese-ar-backend.herokuapp.com
  ```
3. Install NPM packages
   ```sh
   npm i
   ```
4. Run frontend
   ```sh
   npm start
   ```
5. Scan generated QR code with camera (iOS) or Expo Go app (Android)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Jia Hao: [GitHub](https://github.com/lim-jiahao/) - lim.jiahaoo@gmail.com

Dominique: [GitHub](https://github.com/dominiqueyeo) - dominiqueyeo@hotmail.com

Tristan: [GitHub](https://github.com/jjiajun) - teo.jia.jun.29@gmail.com

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
