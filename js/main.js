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
	writer : { width: 300, height: 300, padding: 0, strokeColor:"#333", drawingWidth: 20,
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
	var lesson = 'S'+item.lesson, hans = item.hans, pin1yin1 = item.pin1yin1, decomposition='', decompzh='', decompfr='';
	if(item.decompositionzh && item.decompositionzh !== "--") {
		decompzh = item.decompositionzh;
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
		<div id="S`+item.lesson+hans+`" class="card `+lesson+` is-centered" lesson="`+lesson+`" zi="`+hans+`" i="`+i+`">
			<div id="L`+item.lesson+hans+`" class="card-image">
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


/* SECTIONS ************************************************************** */
var	filterSinogramsInLesson = function(obj, lesson) {if (obj.lesson == lesson) { return obj.hans;} };

var knolLevelForCharacter = function(knol,character) { 
	var totalMistakes = knol[character]?knol[character]['totalMistakes']:undefined,
			mistakesLevel;
	switch (true) {
		case (totalMistakes <1):mistakesLevel=5;break;
		case (totalMistakes <3):mistakesLevel=4;break;
		case (totalMistakes <5):mistakesLevel=3;break;
		case (totalMistakes <8):mistakesLevel=2;break;
		default:mistakesLevel=1;
	}
	// console.log('yo',totalMistakes, mistakesLevel)
	return mistakesLevel
}

var addSection = function (arrayDictionary,lesson,item){
	var type = lesson.length==1?"Semaine":"Section",
			orComponents = lesson=='rad'? ', clefs ou éléments graphiques ' : '',
			sectionHtml='',
			counter='', 
			sinogramsInLessonObjects=[],
			sinogramsInLessonArray=[],
			sinogramsInLessonHtmlArray=[],
			sinogramsInLessonHtml= ``;
	console.log('addSection lS.knol : ',localStorage.knol)
	var knol = JSON.parse(localStorage.knol);

	/* filters to find items in a given lesson*/
	// sinogramsInLesson = arrayDictionary.map(filterSinogramsInLesson(o, lesson));
	sinogramsInLessonObjects = sinograms.filter(function (obj){ return obj.lesson == lesson; });
	for (var k = 0; k<sinogramsInLessonObjects.length; k++) {
		var hans = sinogramsInLessonObjects[k].hans,
				masteryLevel = knolLevelForCharacter(knol,hans)
		sinogramsInLessonArray.push(hans)
		sinogramsInLessonHtmlArray.push(`<span class='knol knol`+hans+` masteryLevel`+masteryLevel+`'>`+hans+`</span>`)
	}
	counter = sinogramsInLessonArray.length;
	sinogramsInLessonHtml = sinogramsInLessonHtmlArray.join(',')
//	console.log('sinogramsInLessonObjects : ',sinogramsInLessonObjects,
//							'sinogramsInLesson : ',sinogramsInLessonArray,
//							'sinogramsInLessonHtmlArray : ',sinogramsInLessonHtmlArray,
//							'sinogramsInLessonHtml : ',sinogramsInLessonHtml)

	/* Section final code : */
	
	sectionHtml = `
		<h1 id="S`+lesson+`" class="title lessonHeader has-text-grey" lesson="`+lesson+`"><a href="#S`+lesson+`" style="font-size:.6em;font-weight:normal;">#</a>`+type+` `+lesson+`</h1>
		<h2 id="L`+lesson+`" class="subtitle lessonHeader has-text-grey" lesson="`+lesson+`">Sinogrammes `+ orComponents +`(<span class="counter">`+counter+`</span>) : `+sinogramsInLessonHtml+`.<!--
	<div class="tags has-addons">
		<span class="tag is-info"><span class="icon has-text-light"><i class="fas fa-info-circle"></i></span> En test </span>
		<span class="tag is-light"> La couleur des sinogrammes listés ci-dessus indique votre degré de maitrise : <em class="masteryLevel5">⬤ vert</em> = maitrisé ; <em class="masteryLevel1">⬤ rouge</em> = à apprendre.</span>
	</div> -->
</h2>
		<div class="hooks S`+lesson+`" lesson="`+lesson+`">
</div>`;
	$('#hook').append(sectionHtml);
};

/* CARDS w MEDIA ********************************************************* */
var injectMultimedia = function (item,i) {
	// console.log(`{{user:yug/hz|`+item.lesson+`|`+item.hans+`|`+item.hant+`}}`)
	var lesson = 'S'+item.lesson, hans = item.hans, pin1yin1 = item.pin1yin1.replace('5', '1');
	var key = lesson+hans+i;
	
	//Inject HTML
	var cardHTML = cardTpl(item,i);
	$('.hooks.S'+item.lesson).append(cardHTML);
	
	/* Inject and assign activities to arrays */
	// Player (Stroke Order)
	player[key] = new HanziWriter('play'+key, hans, opts.player); 
	// Writer
	writer[key] = new HanziWriter('write'+key, hans, opts.writer);
	writer[key].quiz({ 
		// d = {character: "中", strokeNum: 1, mistakesOnStroke: 1, totalMistakes: 1, strokesRemaining: 3}
		onMistake : function(d){ console.log('onMistake: ',d) }, 
		onCorrectStroke: function(d){ 
			console.log('onCorrectStroke: ',d) 
			var status = 'ongoing' || 'complete';
			postHanziStrokeActivity(d.character, d.strokeNum, d.mistakesOnStroke,d.totalMistakes,d.strokesRemaining,d.drawnPath.points,d.drawnPath.pathString,status)
		
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
/* LOCAL MEMORY ********************************************************** */
var colorScales = {
	'green5': ['#edf8e9','#bae4b3','#74c476','#31a354','#006d2c'],
	'black5': ['#e0e0e0','#bababa','#878787','#4d4d4d','#000000'],
	'black7': ['#ffffff','#f7f7f7','#cccccc','#969696','#636363','#252525','#000000'],
	'redToGreen5': ['#d7191c','#fdae61','#ffffbf','#a6d96a','#1a9641']
};
localStorage.knol= localStorage.knol || '{}';
var updateKnol = function(data) {
	// my new information
	// var data = {character: "中", totalMistakes: 0};
	var hans  = data.character;
	// unpack, update, repackage knol
	var knol = JSON.parse(localStorage.knol)
	knol[hans] = data;
	localStorage.knol = JSON.stringify(knol);
	// Print to check if all went well.
	console.log('data: ',data);
	console.log('han: ',hans);
	console.log('knol: ',knol);
	console.log('localStorage.knol: ',localStorage.knol);
	console.log('localStorage.knol: ',JSON.parse(localStorage.knol));
	console.log('localStorage.knol[han]: ',JSON.parse(localStorage.knol)[hans]);
}
/* *********************************************************************** */
/* MONITORING-NANO ******************************************************* */
/* Get real info on where the learners meet counter-intuitive stroke order */
var postHanziStrokeActivity = function(item, strokeNum, mistakesOnStroke,totalMistakes,strokesRemaining,pathPoints,pathString,status,device,browser) { 
	var now = new Date().toJSON().replace(/[-:.]/g,':').replace(/Z/g,''),
			timezone = -new Date().getTimezoneOffset()/60,
// var url1 = 'https://docs.google.com/forms/d/1s9UqzwVLQNajSnfgUE6GZ1yam38rxdWpILx_49KYknI/formResponse';
	form = {
		edit: 'https://docs.google.com/forms/d/10AElkFjLXHXOsfObsOmjoDgQp0glGW6WmCZ9JdYsewQ/edit',
		api: 'https://docs.google.com/forms/d/10AElkFjLXHXOsfObsOmjoDgQp0glGW6WmCZ9JdYsewQ/formResponse',
		table:'https://docs.google.com/spreadsheets/d/1wsI0YuTMa9Qx-cGml5WGTFZSoJHOyenjGcRBxFlWXbM/edit'};
	localStorage.firstUse = localStorage.firstUse || localStorage.username || now;
	var device,browser;
	console.log(pathPoints,pathString)
  var data = { 
    'entry.1761026478': localStorage.firstUse, // day of first use of the app
    'entry.438665866' : now,
		'entry.1395362580': timezone,
    'entry.1426290596': item,
    'entry.76376835'  : strokeNum,
    'entry.1137969634': mistakesOnStroke,
    'entry.588973715' : totalMistakes,
		'entry.1552943138': strokesRemaining,
    'entry.726465628' : strokesRemaining>0? 'ongoing':'completed',
    'entry.576376173' : pathPoints + '',
    'entry.123309060' : pathString + '',
    'entry.389356582' : device || '',
    'entry.1048606120' : browser || '',
    'submit':'Send' };
	// if (mistakesOnStroke>0 || strokesRemaining == 0) {
		$.ajax({
			'url': form.api,
			'type': "post",
			'dataType': 'json',
			'data': data
		});
	// }
}
/* function(d){ 
	var status = 'ongoing' || 'complete';
	postHanziStrokeActivity(d.character, d.strokeNum, d.mistakesOnStroke,d.totalMistakes,d.strokesRemaining,status); 
} */


/* LOOP ****************************************************************** */
var sections = [];
for (var i=0;i<sinograms.length; i++){
	var item = sinograms[i], lesson = item.lesson;
	if(!sections.find(function (s){ return s==lesson; }) ){ 
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
			$lesson = $('.card.S'+lesson);
	$('.card').hide();
	$lesson.show();
});


