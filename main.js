/* https://github.com/hugolpz/OpenEdx-hanzi/issues */

/* *********************************************************************** */
/* INITIALISATION ******************************************************** */
var list  = ['中','王','国','大','日','本','小','马','吗','很','不'];
var player = [], 
		writer = [],
		audios = [];

/* *********************************************************************** */
/* DATA LOADING APPROACH ************************************************* */
var voc;
$.ajax({ type: 'GET', data: {},
    url: "./vocabulary.json", dataType: 'json',
    success: function(data) { voc = data; },
    async: false
});
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
	var lesson = 'L'+item.lesson, hans = item.hans, pin1yin1 = item.pin1yin1; //.replace("5", "1");
	var key = lesson+hans+i;
	var tpl = `
		<div class="card `+lesson+`" lesson="`+lesson+`" zi="`+hans+`" i="`+i+`">
			<div class="card-image">
				<figure class="image is-4by4">
					<div id="write`+key+`" class="writer"></div>
				</figure>
			</div>

			<div class="card-content">
				<div class="media">
					<div class="media-left">
						<figure class="image is-4by4 is-centered">
							<div id="play`+key+`" class="play"></div>
						</figure>
					</div>
					<div class="media-content play audio">
						<p class="title is-4">`+hans+` `+item.pinyin+`</p>
						<p class="subtitle is-6">`+item.definition+`</p>
					</div>
				</div>

				<div class="content">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Phasellus nec iaculis mauris. <a>@bulmaio</a>.
					<a href="#">#`+lesson+`</a>
					<br>
					<span class="icon is-small"><i class="fas fa-retweet"></i></span>
				</div>
			</div>

			<footer class="card-footer">
				<a class="card-footer-item play">Ecriture</a>
				<a class="card-footer-item audio">Audio</a>
				<a class="card-footer-item writeReset">Effacer mon pinceau</a>
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
var injectMultimedia = function (item,i) {
	var lesson = 'L'+item.lesson, hans = item.hans, pin1yin1 = item.pin1yin1; //.replace("5", "1");
	var key = lesson+hans+i;
	
	//Inject HTML
	var cardHTML = cardTpl(item,i);
	$('#hook').append(cardHTML)
	
	// Inject and assing activities to arrays
	// Player (Stroke Order)
	player[key] = new HanziWriter('play'+key, hans, opts.player); 
	// Writer
	writer[key] = new HanziWriter('write'+key, hans, opts.writer);
	writer[key].quiz({onComplete: function(d){ console.log(d);}});
	// Audio
	var audioRoot = 'https://raw.githubusercontent.com/hugolpz/audio-cmn/master/64k';
	var sound = new Howl({ src: [ audioRoot+'/syllabs/cmn-'+pin1yin1+'.mp3', audioRoot+'/hsk/cmn-'+hans+'.mp3']});
  audios[key] = sound;
}


for (var i=0;i<voc.length; i++){
	if (voc[i].hans.length == 1) { injectMultimedia(voc[i],i) }
}
//console.log(player);
//console.log(writer);
//console.log(audios);


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
