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
	var lineJump = encodeURI(String.fromCharCode(10)),
			hash = "%23", arobase="%40",
			tweetText = 'https://twitter.com/intent/tweet?text=Le signe chinois '+hans+' '+item.pinyin+': '+item.definition.replace(";",",")+'.'
			+lineJump+'Merci '+arobase+'Inalco_Officiel '+arobase+'CRIparis ❤️🇨🇳 '
			+lineJump+hash+'Chinois '+hash+'MOOC'
			+lineJump+'https://hanzi.cri-paris.org/',
			tweetTxtUrlEncoded = tweetText+ "" +encodeURIComponent('#'+lesson+encodeURIComponent(hans));
	var root = item.root && item.root != "--"?'<i class="fas fa-clock"></i>&nbsp;'+item.root:"";
	var key = lesson+hans+i;
	var tpl = `
		<div id="L`+item.lesson+hans+`" class="card `+lesson+` is-centered" lesson="`+lesson+`" zi="`+hans+`" i="`+i+`">
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
					<br>
					<span class="lesson"><a href="#`+lesson+`">#`+lesson+`</a></span>
					 • <span class="ziLink"><a href="#`+lesson+hans+`">#`+lesson+hans+`</a></span>
					 • <span class="icon is-small hidde"><a href="`+tweetTxtUrlEncoded+`"><i class="fas fa-share"></i></a></span>
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

	html = `<h1 id="L`+lesson+`" class="title lessonHeader has-text-grey" lesson="`+lesson+`"><a href="#L`+lesson+`" style="font-size:.6em;font-weight:normal;">#</a> Lesson `+lesson+`</h1><h2 class="subtitle lessonHeader has-text-grey" lesson="`+lesson+`">Sinogrammes `+ orComponents +`(<span class="counter">`+counter+`</span>) : `+sinogramsInLesson.join(',')+`.</h2><div class="hooks L`+lesson+`" lesson="`+lesson+`"></div>`;
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
	writer[key].quiz({ 
		// d = {character: "中", strokeNum: 1, mistakesOnStroke: 1, totalMistakes: 1, strokesRemaining: 3}
		onMistake : function(d){ console.log('onMistake',d) }, 
		onCorrectStroke: function(d){ 
			console.log('onCorrectStroke',d) 
			var status = 'ongoing' || 'complete';
			postHanziStrokeActivity(d.character, d.strokeNum, d.mistakesOnStroke,d.totalMistakes,d.strokesRemaining,status)
		
		},
		onComplete: function(d){ updateKnol(d) }
	});
	// Audio
	var audioRoot = 'https://raw.githubusercontent.com/hugolpz/audio-cmn/master/64k',
			audioSuffix = item.audio ?'/hsk/cmn-'+hans+'.mp3':'/syllabs/cmn-'+pin1yin1+'.mp3',
			audioUrl = audioRoot + audioSuffix; 
	var sound = new Howl({ src: [ audioUrl ]});
  audios[key] = sound;
}

/* *********************************************************************** */
/* MEMORY **************************************************************** */
localStorage.knol= {};
var updateKnol = function(data) { 
	console.log(data.character,data); 
	localStorage.knol[data.character] = data;
	// console.log(data); // => {character: "中", totalMistakes: 0}
	console.log(JSON.stringify(localStorage.knol));
}
/* *********************************************************************** */
/* MONITORING-NANO ******************************************************* */
var postHanziStrokeActivity = function(item, strokeNum, mistakesOnStroke,totalMistakes,strokesRemaining,status,device,browser) { 
	var now = new Date().toJSON().replace(/[-:.]/g,':').replace(/Z/g,''),
			timezone = -new Date().getTimezoneOffset()/60,
// var url1 = 'https://docs.google.com/forms/d/1s9UqzwVLQNajSnfgUE6GZ1yam38rxdWpILx_49KYknI/formResponse';
	form = {
		edit: 'https://docs.google.com/forms/d/10AElkFjLXHXOsfObsOmjoDgQp0glGW6WmCZ9JdYsewQ/edit',
		api: 'https://docs.google.com/forms/d/10AElkFjLXHXOsfObsOmjoDgQp0glGW6WmCZ9JdYsewQ/formResponse',
		table:'https://docs.google.com/spreadsheets/d/1wsI0YuTMa9Qx-cGml5WGTFZSoJHOyenjGcRBxFlWXbM/edit'};
	localStorage.username = localStorage.username || now;
	var device,browser;
  var data = { 
    'entry.1761026478': localStorage.username,
    'entry.438665866' : now,
		'entry.1395362580': timezone,
    'entry.1426290596': item,
    'entry.76376835'  : strokeNum,
    'entry.1137969634': mistakesOnStroke,
    'entry.588973715' : totalMistakes,
		'entry.1552943138': strokesRemaining,
    'entry.726465628' : strokesRemaining>0? 'ongoing':'completed',
    'entry.576376173' : device || '',
    'entry.123309060' : browser || '',
    'submit':'Send' };
	if (mistakesOnStroke>0) {
		$.ajax({
			'url': form.api,
			'type': "post",
			'data': data
		});
	}
}
/* function(d){ 
	var status = 'ongoing' || 'complete';
	postHanziStrokeActivity(d.character, d.strokeNum, d.mistakesOnStroke,d.totalMistakes,d.strokesRemaining,status); 
} */


/* LOOP ****************************************************************** */
for (var i=0;i<sinograms.length; i++){
	var item = sinograms[i], lesson = item.lesson;
	if(!sections.find(function (s){return s==lesson;}) ){ 
		sections.push(lesson);
		addSection(sinograms,lesson,item);
	}
	if (sinograms[i].hans.length == 1) { d.mistakesOnStrokeinjectMultimedia(sinograms[i],i) }
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


