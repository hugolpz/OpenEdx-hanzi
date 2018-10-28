PDFDocument.prototype.addSVG = function(svg, x, y, options) {
  return SVGtoPDF(this, svg, x, y, options), this;
};
var svgCode = '<svg style="width: 75px; height: 75px; border: 1px solid rgb(238, 238, 238); margin-right: 3px;"><g transform="translate(0, 65.91796875) scale(0.0732421875, -0.0732421875)"><path d="M 226 483 Q 254 443 285 393 Q 295 375 312 372 Q 324 369 333 381 Q 342 396 342 430 Q 342 472 235 536 Q 220 543 213 543 Q 206 540 204 526 Q 205 513 226 483 Z" style="fill: rgb(51, 51, 51);"></path><path d="M 690 568 Q 677 547 584 441 Q 571 422 592 425 Q 638 449 738 513 Q 762 532 791 543 Q 816 553 805 575 Q 789 597 759 615 Q 731 633 715 629 Q 700 628 704 612 Q 708 590 690 568 Z" style="fill: rgb(204, 204, 204);"></path><path d="M 511 382 Q 520 439 529 618 Q 530 669 548 728 Q 554 741 543 750 Q 521 769 479 785 Q 454 795 434 789 Q 410 779 430 759 Q 464 725 465 690 Q 469 500 448 374 Q 427 209 284 106 Q 244 81 186 49 Q 170 43 167 39 Q 160 32 179 29 Q 197 28 258 48 Q 301 61 365 101 Q 414 131 442 172 Q 484 232 504 341 L 511 382 Z" style="fill: rgb(204, 204, 204);"></path><path d="M 504 341 Q 597 175 715 40 Q 740 9 767 9 Q 843 13 911 17 Q 939 18 940 25 Q 941 32 910 48 Q 753 117 709 157 Q 592 268 511 382 C 493 406 489 367 504 341 Z" style="fill: rgb(204, 204, 204);"></path></g></svg>';

/* ********************************************** */
/* GET INPUT ************************************ */
var getListOfChar = function($textareaId) {
	var content = document.getElementById($textareaId),
			list = content.value.split(/\r?\n/);
	return list[0]?list:['火'];
};
var getSvgCode = function(char) {};

/* ********************************************** */
/* From Char to SVG Fanning ********************* */
var svgWithFanning = function(target, strokesPaths, threeshold) {
	var size = '40px';
  var charLength = strokesPaths.length;
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.style.width = '40px';
  svg.style.height = '40px';
  svg.style.border = '3px solid #333';
  svg.style.marginRight = '3px';
  target.appendChild(svg);
  var group = document.createElementNS('http://www.w3.org/2000/svg', 'g');

  // set the transform property on the g element so the character renders at 75x75
  var transformData = HanziWriter.getScalingTransform(40, 40);
  group.setAttributeNS(null, 'transform', transformData.transform);
  svg.appendChild(group);

 // strokesPaths.forEach(function(strokePath,i) { });
	
	for (var j = 0; j < strokesPaths.length; j++) {
		var path = document.createElementNS('http://www.w3.org/2000/svg', 'path'), color = '';
		path.setAttributeNS(null, 'd', strokesPaths[j]);
		// style the character paths
		console.log(j,charLength,strokesPaths);
		if (j<threeshold) { color = '#333333';} 
		else { color = '#CCCCCC'; }
		path.style.fill = color;
		group.insertBefore(path, group.childNodes[0]);
	}
	return svg;
};

/* ********************************************** */
/* Append SVG Fanning ********************* */
var injectChar = function (char,doc,k,l){
	HanziWriter.loadCharacterData(char).then(function(charData) {
		var target = document.getElementById("hidden-div");
		var charLen = charData.strokes.length;
		for (var j = 0; j < charLen; j++) {
			var threeshold = j + 1;
			var strokesPaths = charData.strokes;//.slice(0, threeshold);
			var svgCode = svgWithFanning(target, strokesPaths, threeshold);
			SVGtoPDF(doc, svgCode, 100+40*j, 100);
			console.log("end")
		if(k==l-1 && j==charLen-1){console.log("end");doc.end()}
		}
	});
};
var injectChars = function (list,doc){
	var l = list.length;
	for(var k=0; k<l; k++) {
		var char = list[k];
		console.log(list,char,k,l);
		injectChar(char,doc,k,l);
	}
};
/* ********************************************** */
/* ********************************************** */
var resetDefaultStyles = function (doc) {
  doc.fillColor('black')
    .fillOpacity(1)
    .strokeColor('black')
    .strokeOpacity(1)
    .lineWidth(1)
    .undash()
    .fontSize(12)
    .font('Helvetica');
};
var createPdf = function () {
  let doc = new PDFDocument({ compress: false});
			doc.info = { Title: 'download-card.pdf', Author:'Yug', Subject: 'Chinese vocabulary', CreationDate:'now' };

  //SVGtoPDF(doc, svgCode, 0, 0);
  let stream = doc.pipe(blobStream());
  stream.on('finish', function() {
    let blob = stream.toBlob('application/pdf');
    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, 'File.pdf');
    } else {
      document.getElementById('pdf-file')
        .setAttribute('src', URL.createObjectURL(blob));
    }
  });
	var list = getListOfChar("input");
	injectChars(list,doc);
};

 // for (var i = 0; i < list.length; i++) {	}

