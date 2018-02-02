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
	player : { width: 150, height: 150, padding: 5,strokeColor:"#333" },
	writer : { width: 300, height: 300, padding: 5,strokeColor:"#333",
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
/* TOOLBOX *************************************************************** */
var injectStrokeOrderDisplay = function(elementSelector,item) {
	var lesson = item.lesson.toString(), hans = item.hans, pin1yin1 = item.pinyin;
	var elementPlayer='<div id="playL'+lesson+hans+'" class="play zi" zi="'+hans+'"></div>';
	$(elementSelector).append(elementPlayer);
	player[hans] = new HanziWriter('playL'+lesson+hans, hans, opts.player);
};

var injectStrokeOrderQuiz = function(elementSelector,item) {
	var lesson = item.lesson.toString(), hans = item.hans, pin1yin1 = item.pinyin;
	var elementWriterGlyph ='<div id="writeL'+lesson+hans+'" class="write zi" zi="'+hans+'"></div>',
			elementWriterResetButton = '<div id="writeResetL'+lesson+hans+'" class="writeReset zi" zi="'+hans+'">Reset '+hans+'</div>';
	$(elementSelector).append(elementWriterGlyph+elementWriterResetButton);
	writer[hans] = new HanziWriter('writeL'+lesson+hans, hans, opts.writer);
	writer[hans].quiz({onComplete: function(d){ console.log(d);}});
};

var injectAudio = function(elementSelector,item){
	var lesson = item.lesson.toString(), hans = item.hans, pin1yin1 = item.pin1yin1.replace("5", "1");
	var sound = new Howl({ src: [ 'https://raw.githubusercontent.com/hugolpz/audio-cmn/master/64k/syllabs/cmn-'+pin1yin1+'.mp3', 'https://raw.githubusercontent.com/hugolpz/audio-cmn/master/64k/hsk/cmn-'+hans+'.mp3']});
  audios[hans] = sound;
	var elementAudioButton = '<div id="audioL'+lesson+hans+'" class="audio zi" zi="'+hans+'">Play '+hans+'</div>';
	$(elementSelector).append(elementAudioButton);
};
/* *********************************************************************** */
/* INJECTIONS ************************************************************ */
for (var i=0;i<voc.length; i++){
	var item = voc[i];
	var hans = item.hans;
	if (hans.length == 1) {
		injectStrokeOrderDisplay(".list.play", item);
		injectStrokeOrderQuiz(".list.write", item);
		injectAudio(".list.audio",item);
	}
}
//console.log(player);
//console.log(writer);
//console.log(audios);

/* *********************************************************************** */
/* INTERACTIONS ********************************************************** */
$('.play').on('click', function() {  
	var zi = $(this).attr("zi");
	// console.log(zi+"dfvdrf",JSON.stringify(player[zi][0]));
	player[zi].animateCharacter();
	console.log('.play',zi);
});
$(".writeReset").on('click', function(){ 
	var zi= $(this).attr("zi");
	writer[zi].quiz({});
	console.log('#writeReset',zi);
}); /**/
$('.audio, .play').on('click', function() {  
	var zi = $(this).attr("zi") || $(this).data("zi");
	audios[zi].play();
	console.log('.audio',zi);
}); /**/