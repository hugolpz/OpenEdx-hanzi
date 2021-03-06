## OpenEdx-hanzi
**OpenEdx-hanzi** is an open sources web app developed to support teaching of the French MOOC de chinois "[Kit de contact en langues orientales : chinois](https://www.fun-mooc.fr/courses/course-v1:Inalco+52004+session02/about)".

<p align="center">
  <img width="600px" src="./img/index.png?raw=true" alt="Home page"/>
</p>

### Features
- [x] Official pages:
  - [x] https://hugolpz.github.io/OpenEdx-hanzi
  - [x] http://hugolpz.github.io/OpenEdx-hanzi
- [x] Treatment of the listed sinograms for learners
- [x] OpenEdX / FUN compatible
- [x] Desktop and mobile friendly
- [x] Large support for modern browsers: IE10 +, Chrome, Firefox and others.
- [x] Easy integration [via iframe] (https://jsfiddle.net/752utup0/4/)
- [x] Stroke order animation
- [x] Pronunciation via audio and pinyin text
- [x] Semantics via text
- [x] Writing skill learning by doing via "Quiz" (no grading)
- [x] Easy to update on request to CRI developer
- [x] Hypertext to ...
  - [x] target lesson: `<a href="//hugolpz.github.io/OpenEdx-hanzi/#L3"> Text </a>`
  - [x] target character: `<a href="//hugolpz.github.io/OpenEdx-hanzi/#L3们"> Text </a>`
- [x] Social Web for visibility
- [x] Elegant

### Soon
- [x] Improved audio
- [x] Vocabulary of the MOOC de Chinois
- [x] Anonymous learning monitoring / surveils
- [x] English readme.md

### Usage
Easy integration [via iframe](https://jsfiddle.net/752utup0/4/)

```
<h4><strong>Exercice d'écriture, Semaine 2 (<a href="https://hugolpz.github.io/OpenEdx-hanzi/#S2">pleine page</a>):</strong></h4>
<p>
  <iframe seamless="" title="Pratiquer l'&eacute;criture" src="https://hugolpz.github.io/OpenEdx-hanzi/#S2" 
          style="background-color: transparent; border: 0px none transparent; 
                 padding: 0; margin: 0; overflow: hidden; width: 100%; height: 1200px;">
  </iframe>
</p>
```

### Dependencies
- [MakeMeAHanzi](http://github.com/Skishore/MakeMeAHanzi) -- CJK characters and strokes in xml data
- [Hanzi-Writer](http://github.com/Chanind/Hanzi-Writer) -- JS library to animate strokes
- [Audio-cmn](http://github.com/hugolpz/audio-cmn) -- audio database for Chinese syllables
- [Bulma.css](https://bulma.io/documentation/overview/start/) -- CSS framework

### Data
* [Chinese MOOC (French language)](https://www.fun-mooc.fr/courses/course-v1:Inalco+52004+session04/about)

### License
- MIT License
- CC-by-sa-4.0 Hugo Lopez
