/* https://github.com/hugolpz/OpenEdx-hanzi/issues */

/* *********************************************************************** */
/* INITIALISATION ******************************************************** */
var list  = ['中','王','国','大','日','本','小','马','吗','很','不'];
var player = [],
		writer = [],
		audios = [];

/* *********************************************************************** */
/* DATA LOADING APPROACH ************************************************* */
var vocabulary,
		singleSinogramOnly = function (obj){ return obj.hans.length == 1; },
		sinograms;
$.ajax({ type: 'GET', data: {},
    url: "./data/vocabulary.json", dataType: 'json',
    success: function(data) { vocabulary = data; },
    async: false
});
sinograms = vocabulary.filter(singleSinogramOnly);

var opts = {
	player : { width: 96, height: 96, padding: 5, 
						strokeColor:"#333", radicalColor: '#660000' },
	writer : { width: 300, height: 300, padding: 5, strokeColor:"#333", drawingWidth: 20,
						showCharacter: false, showHintAfterMisses: 1,
						ighlightOnComplete: true, highlightColor: "#B16666" },
	localLoader : { charDataLoader: function(char, onComplete) {
    $.getJSON("/" + char + ".json", function(charData) { onComplete(charData); });
  }}
};

var dataLoadingApproach = 'API'; 
if (dataLoadingApproach === 'local'){
	for (var attrname in opts.localLoader) {
		opts.player[attrname] = opts.localLoader[attrname];
		opts.writer[attrname] = opts.localLoader[attrname];
	}
}


/* *********************************************************************** */
/* CMNCARD *************************************************************** */
var cardTpl = function(item, i) { 
	var lesson = 'L'+item.lesson, hans = item.hans, pin1yin1 = item.pin1yin1, decomposition="", decompzh="", decompfr="";
	if(item.decompositionzh && item.decompositionzh !== "--") {
		decompzh = item.decompositionzh,
		decompfr = item.decomposition;
	}
 decomposition = `<i class="fas fa-cubes"></i>&nbsp;`+item.decompzh+` `+decompfr;
	var root = item.root && item.root != "--"?'<i class="fas fa-clock"></i>&nbsp;'+item.root:"";
	var key = lesson+hans+i;
	var tpl = `
		<div class="card `+lesson+` is-centered" lesson="`+lesson+`" zi="`+hans+`" i="`+i+`">
			<div class="card-image">
				<figure class="image is-4by4">
					<div id="write`+key+`" class="writer is-centered"></div>
				</figure>
			</div>

			<div class="card-content">
				<div class="media">
					<div class="media-left">
						<figure class="image is-4by4 is-centered">
							<div id="play`+key+`" class="play"></div>
							<p class="decompositionzh has-text-centered">`+decompzh+`</p>
						</figure>
					</div>
					<div class="media-content play audio">
						<br>
						<p class="title is-3">
							<span class="hans">`+hans+`</span> 
							<span class="pinyin">`+item.pinyin+`</span>
						</p>
						<p class="subtitle is-5"><span class="definition">`+item.definition+`</span></p>
						
					</div>
				</div>

				<div class="content">
					<span class="root">`+root+`</span>
					<br><span class="lesson"><a>#`+lesson+`</a></span>
					<span class="icon is-small hide"><i class="fas fa-retweet"></i></span>
				</div>
			</div>

			<footer class="card-footer">
				<a class="card-footer-item play"><i class="fas fa-eye"></i><span>Ecrit/Audio</span></a>
				<a class="card-footer-item audio"><i class="fas fa-headphones"></i><span>Audio</span></a>
				<a class="card-footer-item writeReset"><i class="fas fa-eraser"></i><span>Effacer</span></a>
			</footer>
		</div>`;
	return tpl;
}



/* *********************************************************************** */
/* TOOLBOX *************************************************************** 
var injectStrokeOrderDisplay = function(elementSelector,item, i) {
	var lesson = 'L'+item.lesson, hans = item.hans, pin1yin1 = item.pinyin;
	var key = lesson+hans+i;
	var elementPlayer='<div id="play'+key+'" class="play zi '+lesson+'" lesson="'+lesson+'" zi="'+hans+'" i="'+i+'"></div>';
	$(elementSelector).append(elementPlayer);
	player[key] = new HanziWriter('play'+key, hans, opts.player);
};

var injectStrokeOrderQuiz = function(elementSelector,item, i) {
	var lesson = 'L'+item.lesson, hans = item.hans, pin1yin1 = item.pinyin;
	var key = lesson+hans+i;
	var elementWriterGlyph ='<div id="write'+key+'" class="write zi '+lesson+'" lesson="'+lesson+'" zi="'+hans+'" i="'+i+'"></div>',
			elementWriterResetButton = '<div id="writeReset'+key+'" class="writeReset zi '+lesson+'" lesson="'+lesson+'" zi="'+hans+'" i="'+i+'">Reset '+hans+'</div>';
	$(elementSelector).append(elementWriterGlyph+elementWriterResetButton);
	writer[lesson+hans+i] = new HanziWriter('write'+key, hans, opts.writer);
	writer[lesson+hans+i].quiz({onComplete: function(d){ console.log(d);}});
};

var injectAudio = function(elementSelector,item, i){
	var lesson = 'L'+item.lesson, hans = item.hans, pin1yin1 = item.pin1yin1.replace("5", "1");
	var key = lesson+hans+i;
	var sound = new Howl({ src: [ 'https://raw.githubusercontent.com/hugolpz/audio-cmn/master/64k/syllabs/cmn-'+pin1yin1+'.mp3', 'https://raw.githubusercontent.com/hugolpz/audio-cmn/master/64k/hsk/cmn-'+hans+'.mp3']});
  audios[lesson+hans+i] = sound;
	var elementAudioButton = '<div id="audio'+key+'" class="audio zi '+lesson+'" lesson="'+lesson+'" zi="'+hans+'" i="'+i+'">Play '+hans+'</div>';
	$(elementSelector).append(elementAudioButton);
}; */
/* *********************************************************************** */
/* INJECTIONS ************************************************************ 
var injectMultimedia = function(item,i) {
	if (item.hans.length == 1) {
		injectStrokeOrderDisplay(".list.play", item, i);
		injectStrokeOrderQuiz(".list.write", item, i);
		injectAudio(".list.audio",item, i);
	}
} */

/* SECTIONS ************************************************************** */
var sections = [];
var	filterSinogramsInLesson = function(obj, lesson) {if (obj.lesson == lesson) { return obj.hans;} };

var addSection = function (arrayDictionary,lesson,item){
	var html, counter, sinogramsInLesson=[], orComponents = lesson=='rad'? ', clefs ou éléments graphiques ' : '';
	// sinogramsInLesson = arrayDictionary.map(filterSinogramsInLesson(o, lesson));
	var sinogramsObjInLesson = sinograms.filter(function (obj){ return obj.lesson == lesson; });
	for (var k = 0; k<sinogramsObjInLesson.length; k++) { sinogramsInLesson.push(sinogramsObjInLesson[k].hans); }
	counter = sinogramsInLesson.length;
	// console.log('item 3: ',item , sinogramsObjInLesson, counter , sinogramsInLesson);

	html = `<h1 class="title lessonHeader has-text-grey" lesson="`+lesson+`">Lesson `+lesson+`</h1><h2 class="subtitle lessonHeader has-text-grey" lesson="`+lesson+`">Sinogrammes `+ orComponents +`(<span class="counter">`+counter+`</span>) : `+sinogramsInLesson.join(',')+`.</h2><div class="hooks L`+lesson+`" lesson="`+lesson+`"></div>`;
	$('#hook').append(html);
};

/* CARDS w MEDIA ********************************************************* */
var injectMultimedia = function (item,i) {
	// console.log(`{{user:yug/hz|`+item.lesson+`|`+item.hans+`|`+item.hant+`}}`)
	var lesson = 'L'+item.lesson, hans = item.hans, pin1yin1 = item.pin1yin1.replace('5', '1');
	var key = lesson+hans+i;
	
	//Inject HTML
	var cardHTML = cardTpl(item,i);
	$('.hooks.L'+item.lesson).append(cardHTML);
	
	// Inject and assing activities to arrays
	// Player (Stroke Order)
	player[key] = new HanziWriter('play'+key, hans, opts.player); 
	// Writer
	writer[key] = new HanziWriter('write'+key, hans, opts.writer);
	writer[key].quiz({onComplete: function(d){ console.log(d);}});
	// Audio
	var audioRoot = 'https://raw.githubusercontent.com/hugolpz/audio-cmn/master/64k',
			audioSuffix = item.audio ?'/hsk/cmn-'+hans+'.mp3':'/syllabs/cmn-'+pin1yin1+'.mp3',
			audioUrl = audioRoot + audioSuffix; 
	var sound = new Howl({ src: [ audioUrl ]});
  audios[key] = sound;
}

/* LOOP ****************************************************************** */
for (var i=0;i<sinograms.length; i++){
	var item = sinograms[i], lesson = item.lesson;
	if(!sections.find(function (s){return s==lesson;}) ){ 
		sections.push(lesson);
		addSection(sinograms,lesson,item);
	}
	if (sinograms[i].hans.length == 1) { injectMultimedia(sinograms[i],i) }
}




/* *********************************************************************** */
/* INTERACTIONS ********************************************************** */
$('.play').on('click', function() {  
	var $parentCard = $(this).closest('.card');
	var key = $parentCard.attr('lesson') + $parentCard.attr('zi') + $parentCard.attr('i');
	// console.log(zi+"dfvdrf",JSON.stringify(player[zi][0]));
	player[key].animateCharacter();
	console.log('.play',key);
});
$(".writeReset").on('click', function(){ 
	var $parentCard = $(this).closest('.card');
	var key = $parentCard.attr('lesson') + $parentCard.attr('zi') + $parentCard.attr('i');
	writer[key].quiz({});
	console.log('#writeReset',key);
}); /**/
$('.audio, .play').on('click', function() {  
	var $parentCard = $(this).closest('.card');
	var key = $parentCard.attr('lesson') + $parentCard.attr('zi') + $parentCard.attr('i');
	//var id = audios[key]._sounds._id;
	// console.log('sound',id);
	audios[key].play();
//	audios[key].fade(0,1,100);
//	audios[key].fade(1,0,1000);
	console.log('.audio',key);
}); /**/

/* *********************************************************************** */
/* SELECT VIEW ********************************************************** */

$('.selectors, .lessonHeader').on('click', function() {
	var lesson = $(this).attr('lesson'),
			$lesson = $('.card.L'+lesson);
	$('.card').hide();
	$lesson.show();
});

