
/* *********************************************************************** */
/* INITIALISATION ******************************************************** */
var list  = ['中','王','国','大','日','本','小','马','吗','很','不'];
var player = [], 
		writer = [],
		audios = [];


/* https://github.com/hugolpz/OpenEdx-hanzi/issues */


/* *********************************************************************** */
/* DATA LOADING APPROACH ************************************************* */
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
/* 
var approach = 'API' || 'local';
var writer = new HanziWriter('target', '我', {
  charDataLoader: function(char, onComplete) {
    $.getJSON("/" + char + ".json", function(charData) { onComplete(charData); });
  }
}); */


/* *********************************************************************** */
/* TOOLBOX *************************************************************** */
var injectStrokeOrderDisplay = function(elementSelector,zi) {
	var elementPlayer='<div id="play'+zi+'" class="play zi" zi="'+zi+'"></div>';
	$(elementSelector).append(elementPlayer);
	player[zi] = new HanziWriter("play"+zi, zi, opts.player);
};

var injectStrokeOrderQuiz = function(elementSelector,zi) { 
	var elementWriterGlyph ='<div id="write'+zi+'" class="write zi" zi="'+zi+'"></div>',
			elementWriterResetButton = '<div id="writeReset'+zi+'" class="writeReset zi" zi="'+zi+'">Reset '+zi+'</div>';
	$(elementSelector).append(elementWriterGlyph+elementWriterResetButton);
	writer[zi] = new HanziWriter("write"+zi, zi, opts.writer);
	writer[zi].quiz({onComplete: function(d){ console.log(d);}});
};

var injectAudio = function(elementSelector,zi){
	var sound = new Howl({ src: [ 'https://github.com/hugolpz/audio-cmn/raw/master/64k/hsk/cmn-'+zi+'.mp3']});
  audios[zi] = sound;
	var elementAudioButton = '<div id="audio'+zi+'" class="audio zi" zi="'+zi+'">Play '+zi+'</div>';
	$(elementSelector).append(elementAudioButton);
};
/* *********************************************************************** */
/* INJECTIONS ************************************************************ */
for (var i=0;i<list.length; i++){
	var zi = list[i];
	injectStrokeOrderDisplay(".list.play", zi);
	injectStrokeOrderQuiz(".list.write", zi);
	injectAudio(".list.audio",zi);
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
	console.log(zi);
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