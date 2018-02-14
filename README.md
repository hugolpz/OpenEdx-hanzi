**OpenEdx-hanzi** is an open sources web app developed to support teaching of the French MOOC de chinois "[Kit de contact en langues orientales : chinois](https://www.fun-mooc.fr/courses/course-v1:Inalco+52004+session02/about)".

<p align="center">
  <img width="600px" src="./img/index.png?raw=true" alt="Home page"/>
</p>

### Features
- [x] Official pages:
  - [x] https://hanzi.cri-paris.org
  - [x] http://hanzi.cri-paris.org
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
  - [x] target lesson: `<a href="//hanzi.cri-paris.org/#L3"> Text </a>`
  - [x] target character: `<a href="//hanzi.cri-paris.org/#L3们"> Text </a>`
- [x] Social Web for visibility
- [x] Elegant

### Soon
- [x] Improved audio
- [ ] Vocabulary of the MOOC de Chinois
- [ ] Anonymous learning monitoring / surveils
- [ ] English readme.md

### Usage
Easy integration [via iframe](https://jsfiddle.net/752utup0/4/)

```
<h4><strong>Exercice d'écriture (<a href="https://hanzi.cri-paris.org/#L2">pleine page</a>):</strong></h4>
<p>
  <iframe seamless="" title="Pratiquer l'&eacute;criture" src="https://hanzi.cri-paris.org/#L2" 
          style="background-color: transparent; border: 0px none transparent; 
                 padding: 0; margin: 0; overflow: hidden; width: 100%; height: 1200px;">
  </iframe>
</p>
```

### Dependencies
- [MakeMeAHanzi](http://github.com/Skishore/MakeMeAHanzi) -- CJK characters and strokes in xml data
- [Hanzi-Writer](http://github.com/Chanind/Hanzi-Write) -- JS library to animate strokes
- [Audio-cmn](http://github.com/hugolpz/audio-cmn/) -- audio database for Chinese syllables
- [Bulma.css](https://bulma.io/documentation/) -- CSS framework

### Data
* [Chinese MOOC (French language)](https://www.fun-mooc.fr/courses/course-v1:Inalco+52004+session02/about)

### License
- MIT License
- CC-by-sa-4.0 Hugo Lopez
