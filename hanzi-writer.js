/*! Hanzi Writer v0.5.0 | https://chanind.github.io/hanzi-writer */
!function(t){function n(r){if(i[r])return i[r].exports;var s=i[r]={i:r,l:!1,exports:{}};return t[r].call(s.exports,s,s.exports,n),s.l=!0,s.exports}var i={};n.m=t,n.c=i,n.d=function(t,i,r){n.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:r})},n.n=function(t){var i=t&&t.t?function(){return t.default}:function(){return t};return n.d(i,"a",i),i},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s=5)}([function(t,n,i){"use strict";(function(n){function i(t){return Math.max.apply(null,t)}function r(t){return Math.min.apply(null,t)}var s=0;t.exports={inherits:function(t,n){t.super_=n,t.prototype=Object.create(n.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})},assign:function(t){for(var n=Object(t),i=arguments.length,r=Array(i>1?i-1:0),s=1;s<i;s++)r[s-1]=arguments[s];return r.forEach(function(t){if(null!=t)for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(n[i]=t[i])}),n},arrayMax:i,arrayMin:r,average:function(t){return t.reduce(function(t,n){return n+t},0)/t.length},callIfExists:function(t){for(var n=arguments.length,i=Array(n>1?n-1:0),r=1;r<n;r++)i[r-1]=arguments[r];t&&t.apply(void 0,i)},counter:function(){return s+=1},emptyFunc:function(){},getExtremes:function(t){var n=i(t),s=r(t);return[n,(n+s)/2,s]},isMSBrowser:function(){return n.navigator&&n.navigator.userAgent&&(n.navigator.userAgent.indexOf("Edge")>=0||n.navigator.userAgent.indexOf("MSIE")>=0)},timeout:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return new Promise(function(n,i){setTimeout(n,t)})}}}).call(n,i(2))},function(t,n,i){"use strict";function r(t,n){this.x=parseFloat(t,10),this.y=parseFloat(n,10)}var s=function(){function t(t,n){var i=[],r=!0,s=!1,u=void 0;try{for(var h,o=t[Symbol.iterator]();!(r=(h=o.next()).done)&&(i.push(h.value),!n||i.length!==n);r=!0);}catch(t){s=!0,u=t}finally{try{!r&&o.return&&o.return()}finally{if(s)throw u}}return i}return function(n,i){if(Array.isArray(n))return n;if(Symbol.iterator in Object(n))return t(n,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),u=i(0),h=u.arrayMin,o=u.arrayMax;r.prototype.subtract=function(t){return new r(this.x-t.x,this.y-t.y)},r.prototype.add=function(t){return new r(this.x+t.x,this.y+t.y)},r.prototype.getMagnitude=function(){return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2))},r.prototype.equals=function(t){return!!t&&(t.x===this.x&&t.y===this.y)},r.getBounds=function(t){var n=t.map(function(t){return t.x}),i=t.map(function(t){return t.y}),s=o(n),u=o(i);return[new r(h(n),h(i)),new r(s,u)]},r.getOverallBounds=function(t){var n=[];return t.forEach(function(t){var i=t.getBounds(),r=s(i,2),u=r[0],h=r[1];n.push(u),n.push(h)}),r.getBounds(n)},r.getDistance=function(t,n){return t.subtract(n).getMagnitude()},r.cosineSimilarity=function(t,n){return(t.x*n.x+t.y*n.y)/t.getMagnitude()/n.getMagnitude()},t.exports=r},function(t,n){var i;i=function(){return this}();try{i=i||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(i=window)}t.exports=i},function(t,n,i){"use strict";function r(){this.isDestroyed=!1,this.childRenderers=[],this.parentRenderer=null}r.prototype.draw=function(){return this},r.prototype.registerChild=function(t){return this.childRenderers.push(t),t.setParent(this),t},r.prototype.setParent=function(t){return this.parentRenderer=t,this},r.prototype.setCanvas=function(t){return this.canvas=t,this},r.prototype.destroy=function(){this.isDestroyed=!0,this.childRenderers.forEach(function(t){return t.destroy()})},t.exports=r},function(t,n,i){"use strict";(function(n){function r(t){return n.document.createElementNS("http://www.w3.org/2000/svg",t)}function s(t,n,i){t.setAttributeNS(null,n,i)}function u(t,n){Object.keys(n).forEach(function(i){return s(t,i,n[i])})}function h(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.r=t,this.u=n.duration||300,this.h=!1}function o(t,n,i){var r=this,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};o.super_.call(this,function(t){var n=(r.e-r.f)*t+r.f;r.a.style[r.v]=n},s),this.a=t,this.v=n,this.e=i}function e(t,n){this.svg=t,this.defs=n}var c=i(0).inherits,f=n.performance&&function(){return n.performance.now()}||function(){return Date.now()},a=n.requestAnimationFrame||function(t){return setTimeout(function(){return t(f())},1e3/60)},v=n.cancelAnimationFrame||clearTimeout,l=function(t){return-Math.cos(t*Math.PI)/2+.5};h.prototype.start=function(){var t=this;return this.h=!0,this.w=f(),this.k=0,this.g(),new Promise(function(n,i){t.S=n})},h.prototype.g=function(){var t=this;this.M=a(function(n){return t.P(n)})},h.prototype.P=function(t){if(this.h){var n=Math.min(1,(t-this.w)/this.u);if(n===this.k)return this.g();this.k=n;var i=l(n);this.r(i),1===n?(this.M=null,this.finish()):this.g()}},h.prototype.finish=function(){this.h&&(this.h=!1,this.M&&v(this.M),this.S&&(this.S(),this.S=null))},c(o,h),o.prototype.start=function(){return this.f=parseFloat(this.a.style[this.v],10),this.f===this.e?Promise.resolve():o.super_.prototype.start.call(this)},e.prototype.createSubCanvas=function(){var t=r("g");return this.svg.appendChild(t),new e(t,this.defs)},e.init=function(t){var i=void 0,s=t;"string"==typeof t&&(s=n.document.getElementById(t));var h=s.nodeName.toUpperCase();"SVG"===h||"G"===h?i=s:(i=r("svg"),s.appendChild(i)),u(i,{width:"100%",height:"100%"});var o=r("defs");return i.appendChild(o),new e(i,o)},t.exports={createElm:r,attrs:u,attr:s,Canvas:e,Tween:h,StyleTween:o,getPathString:function(t){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=t[0],r=t.slice(1),s="M "+i.x+" "+i.y;return r.forEach(function(t){s+=" L "+t.x+" "+t.y}),n&&(s+="Z"),s}}}).call(n,i(2))},function(t,n,i){"use strict";(function(n){function r(t,n){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};this.b=new v,this.O=f.Canvas.init(t),this.setOptions(i),this.setCharacter(n),this.C(),this.F=null}var s=i(6),u=i(9),h=i(1),o=i(10),e=i(13),c=i(14),f=i(4),a=i(18),v=i(19),l=i(0),d=l.assign,w=l.isMSBrowser,k=l.timeout,m={charDataLoader:a,showOutline:!0,showCharacter:!0,width:null,height:null,padding:20,strokeAnimationSpeed:1,strokeFadeDuration:400,strokeHighlightDuration:200,strokeHighlightSpeed:2,delayBetweenStrokes:1e3,delayBetweenLoops:2e3,strokeColor:"#555",radicalColor:null,highlightColor:"#AAF",outlineColor:"#DDD",drawingColor:"#333",showHintAfterMisses:3,highlightOnComplete:!0,drawingFadeDuration:300,drawingWidth:4,strokeWidth:2,outlineWidth:2,usePolygonMasks:w()},g=function(t){var n=d({},m,t);return t.strokeAnimationDuration&&!t.strokeAnimationSpeed&&(n.strokeAnimationSpeed=500/n.strokeAnimationDuration),t.strokeHighlightDuration&&!t.strokeHighlightSpeed&&(n.strokeHighlightSpeed=500/n.strokeHighlightDuration),n};if(r.prototype.setOptions=function(t){this.j=g(t),this.A={strokeColor:this.j.strokeColor,radicalColor:this.j.radicalColor,strokeWidth:this.j.strokeWidth,strokeAnimationSpeed:this.j.strokeAnimationSpeed,strokeFadeDuration:this.j.strokeFadeDuration,delayBetweenStrokes:this.j.delayBetweenStrokes,usePolygonMasks:this.j.usePolygonMasks},this.D=d({},this.A,{strokeColor:this.j.outlineColor,radicalColor:null,strokeWidth:this.j.outlineWidth}),this.T=d({},this.A,{strokeColor:this.j.highlightColor,radicalColor:null,strokeAnimationSpeed:this.j.strokeHighlightSpeed}),this.L={strokeColor:this.j.drawingColor,strokeWidth:this.j.drawingWidth,fadeDuration:this.j.drawingFadeDuration}},r.prototype.showCharacter=function(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.U(function(n){return t.W.show(n)},n)},r.prototype.hideCharacter=function(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.U(function(n){return t.W.hide(n)},n)},r.prototype.animateCharacter=function(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.cancelQuiz(),this.U(function(n){return t.W.animate(n)},n)},r.prototype.loopCharacterAnimation=function(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.cancelQuiz(),this.U(function i(r){var s=d({},t.j,n).delayBetweenLoops,u=t.W.animate(r);return u?u.then(function(){return k(s)}).then(function(){return i(r)}):null},n)},r.prototype.showOutline=function(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.U(function(n){return t.I.show(n)},n)},r.prototype.hideOutline=function(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.U(function(n){return t.I.hide(n)},n)},r.prototype.quiz=function(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.B(function(){t.cancelQuiz(),t.F=new c({canvas:t.R,animator:t.b,character:t.G,characterRenderer:t.W,highlightRenderer:t.H,quizOptions:d({},t.j,n),userStrokeOptions:t.L})})},r.prototype.cancelQuiz=function(){this.F&&this.F.cancel(),this.F=null},r.prototype.setCharacter=function(t){var n=this;this.cancelQuiz(),this.N&&this.N.destroy(),this.W&&this.W.destroy(),this.I&&this.I.destroy(),this.H&&this.H.destroy(),this.z=this.q(t).then(function(i){var r=new o;n.G=r.generateCharacter(t,i),n.J=new e(n.G,n.V(n.j)),n.N=new u(n.J).setCanvas(n.O),n.R=n.N.positionedCanvas,n.I=new s(n.G,n.D).setCanvas(n.R).draw(),n.W=new s(n.G,n.A).setCanvas(n.R).draw(),n.H=new s(n.G,n.T).setCanvas(n.R).draw(),n.j.showCharacter&&n.W.showImmediate(),n.j.showOutline&&n.I.showImmediate()})},r.prototype.V=function(t){var n=d({},t);if(n.width&&!n.height)n.height=n.width;else if(n.height&&!n.width)n.width=n.height;else if(!n.width&&!n.height){var i=this.O.svg.getBoundingClientRect(),r=i.width,s=i.height,u=Math.min(r,s);n.width=u,n.height=u}return n},r.prototype.q=function(t){var n=this;return this.isLoadingCharData&&this.cancelLoadingCharData(),this.isLoadingCharData=!0,new Promise(function(i,r){n.cancelLoadingCharData=r;var s=n.j.charDataLoader(t,i);s&&i(s)}).then(function(t){return n.isLoadingCharData=!1,t})},r.prototype.B=function(t){return this.z=this.z.then(t),this.z},r.prototype.C=function(){var t=this;this.O.svg.addEventListener("mousedown",function(n){!t.isLoadingCharData&&t.F&&(n.preventDefault(),t.Z("startUserStroke",t.K(n)))}),this.O.svg.addEventListener("touchstart",function(n){!t.isLoadingCharData&&t.F&&(n.preventDefault(),t.Z("startUserStroke",t.Q(n)))}),this.O.svg.addEventListener("mousemove",function(n){!t.isLoadingCharData&&t.F&&(n.preventDefault(),t.Z("continueUserStroke",t.K(n)))}),this.O.svg.addEventListener("touchmove",function(n){!t.isLoadingCharData&&t.F&&(n.preventDefault(),t.Z("continueUserStroke",t.Q(n)))}),n.document.addEventListener("mouseup",function(){return t.Z("endUserStroke")}),n.document.addEventListener("touchend",function(){return t.Z("endUserStroke")})},r.prototype.Z=function(t){var n;if(this.F){for(var i=arguments.length,r=Array(i>1?i-1:0),s=1;s<i;s++)r[s-1]=arguments[s];(n=this.F)[t].apply(n,r)}},r.prototype.K=function(t){var n=this.O.svg.getBoundingClientRect();return this.J.convertExternalPoint(new h(t.clientX-n.left,t.clientY-n.top))},r.prototype.Q=function(t){var n=this.O.svg.getBoundingClientRect(),i=t.touches[0].clientX-n.left,r=t.touches[0].clientY-n.top;return this.J.convertExternalPoint(new h(i,r))},r.prototype.X=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.b.animate(t,n)},r.prototype.U=function(t){var n=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.B(function(){return n.X(t,i)})},void 0!==n.window){var p=n.window.HanziWriter;r.noConflict=function(){return n.window.HanziWriter=p,r},n.window.HanziWriter=r}t.exports=r}).call(n,i(2))},function(t,n,i){"use strict";function r(t){var n=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};r.super_.call(this),this.options=i,this.character=t,this.strokeRenderers=this.character.strokes.map(function(t){return n.registerChild(new u(t,i))})}var s=i(3),u=i(7),h=i(0),o=h.timeout;(0,h.inherits)(r,s),r.prototype.getBounds=function(){return this.character.getBounds()},r.prototype.show=function(t){var n=this.strokeRenderers.map(function(n){return n.show(t)});return Promise.all(n)},r.prototype.showImmediate=function(){this.strokeRenderers.map(function(t){return t.showImmediate()})},r.prototype.hide=function(t){var n=this.strokeRenderers.map(function(n){return n.hide(t)});return Promise.all(n)},r.prototype.hideImmediate=function(){this.strokeRenderers.map(function(t){return t.hideImmediate()})},r.prototype.flash=function(t){var n=this;return this.show(t).then(function(){return n.hide(t)})},r.prototype.showStroke=function(t,n){return this.getStrokeRenderer(t).show(n)},r.prototype.draw=function(){return this.strokeRenderers.forEach(function(t){return t.draw()}),this},r.prototype.getStrokeRenderer=function(t){return this.strokeRenderers[t]},r.prototype.animate=function(t){var n=this;if(!t.isActive())return null;var i=this.hide(t);return this.strokeRenderers.forEach(function(r,s){s>0&&(i=i.then(function(){return o(n.options.delayBetweenStrokes)})),i=i.then(function(){return r.animate(t)})}),i},r.prototype.setCanvas=function(t){return r.super_.prototype.setCanvas.call(this,t),this.strokeRenderers.forEach(function(n){return n.setCanvas(t)}),this},t.exports=r},function(t,n,i){"use strict";function r(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};r.super_.call(this),this.stroke=t,this.options=n}var s=i(3),u=i(0),h=u.counter,o=u.inherits,e=i(4),c=i(8),f=c.extendPointOnLine,a=c.getLineSegmentsPortion,v=c.filterParallelPoints,l=c.linesToPolygon,d=function(t,n){if(t.length<2)return t;var i=t[1],r=t[0],s=f(i,r,n),u=t.slice(1);return u.unshift(s),u},w=function(t,n){if(t.length<2)return t;var i=t[t.length-2],r=t[t.length-1],s=f(i,r,n),u=t.slice(0,t.length-1);return u.push(s),u};o(r,s),r.prototype.draw=function(){this.path=e.createElm("path");var t=this.options.usePolygonMasks?"clipPath":"mask";this.mask=e.createElm(t),this.maskPath=e.createElm("path");var n="mask-"+h();e.attr(this.mask,"id",n),e.attr(this.path,"d",this.stroke.path),e.attrs(this.path,this.getStrokeAttrs()),this.path.style.opacity=0;var i=this.options.usePolygonMasks?"clip-path":"mask";return e.attr(this.path,i,"url(#"+n+")"),this.extendedMaskPoints=d(v(this.stroke.points),100),this.options.usePolygonMasks?(this.extendedMaskPoints=w(this.extendedMaskPoints,100),this.polyMaskTip=e.createElm("circle"),this.mask.appendChild(this.polyMaskTip),e.attr(this.polyMaskTip,"r",100),this.Y(1)):(e.attr(this.maskPath,"d",e.getPathString(this.extendedMaskPoints)),this.$=this.maskPath.getTotalLength(),e.attrs(this.maskPath,{stroke:"#FFFFFF","stroke-width":200,fill:"none","stroke-linecap":"round","stroke-linejoin":"miter","stroke-dasharray":this.$+","+this.$}),this.maskPath.style["stroke-dashoffset"]=0),this.mask.appendChild(this.maskPath),this.canvas.defs.appendChild(this.mask),this.canvas.svg.appendChild(this.path),this},r.prototype.Y=function(t){var n=a(this.extendedMaskPoints,t),i=e.getPathString(l(n,200),!0),r=n[n.length-1];e.attr(this.maskPath,"d",i),e.attr(this.polyMaskTip,"cx",r.x),e.attr(this.polyMaskTip,"cy",r.y)},r.prototype.show=function(t){this.options.usePolygonMasks?this.Y(1):this.maskPath.style["stroke-dashoffset"]=0;var n=new e.StyleTween(this.path,"opacity",1,{duration:this.options.strokeFadeDuration});return t.registerSvgAnimation(n),n.start()},r.prototype.hide=function(t){var n=new e.StyleTween(this.path,"opacity",0,{duration:this.options.strokeFadeDuration});return t.registerSvgAnimation(n),n.start()},r.prototype.animate=function(t){var n=this;if(!t.isActive())return null;this.showImmediate();var i=(this.stroke.getLength()+600)/(3*this.options.strokeAnimationSpeed),r=void 0;return this.options.usePolygonMasks?(this.Y(0),r=new e.Tween(function(t){return n.Y(t)},{duration:i})):(this.maskPath.style["stroke-dashoffset"]=.999*this.$,r=new e.StyleTween(this.maskPath,"stroke-dashoffset",0,{duration:i})),t.registerSvgAnimation(r),r.start()},r.prototype.hideImmediate=function(){this.path.style.opacity=0},r.prototype.showImmediate=function(){this.path.style.opacity=1},r.prototype.highlight=function(t){var n=this;return this.animate(t).then(function(){return n.hide(t)})},r.prototype.getColor=function(){var t=this.options.strokeColor;return this.options.radicalColor&&this.stroke.isInRadical&&(t=this.options.radicalColor),t},r.prototype.getStrokeAttrs=function(){return{fill:this.getColor(),stroke:this.getColor(),"stroke-width":this.options.strokeWidth}},r.prototype.destroy=function(){r.super_.prototype.destroy.call(this),this.path&&this.path.remove(),this.maskPath&&this.maskPath.remove(),this.mask&&this.mask.remove()},t.exports=r},function(t,n,i){"use strict";var r=i(1),s=function(t,n,i){var s=t.subtract(n),u=i/s.getMagnitude(),h=new r(u*s.y,-1*u*s.x);return[t.add(h),t.subtract(h)]},u=function(t,n,i,s){var u=t.x,h=n.x,o=i.x,e=s.x,c=t.y,f=n.y,a=i.y,v=s.y,l=(u-h)*(a-v)-(c-f)*(o-e);return new r(((u*f-c*h)*(o-e)-(u-h)*(o*v-a*e))/l,((u*f-c*h)*(a-v)-(c-f)*(o*v-a*e))/l)};t.exports={extendPointOnLine:function(t,n,i){var s=n.subtract(t),u=i/s.getMagnitude();return new r(n.x+u*s.x,n.y+u*s.y)},filterParallelPoints:function(t){if(t.length<3)return t;var n=[t[0],t[1]];return t.slice(2).forEach(function(t,i){var r=n.length,s=t.subtract(n[r-1]),u=n[r-1].subtract(n[r-2]);s.y*u.x-s.x*u.y==0&&n.pop(),n.push(t)}),n},getLineSegmentsPortion:function(t,n){if(t.length<2||n>=1)return t;if(0===n)return[t[0]];for(var i=0,s=1;s<t.length;s+=1)i+=r.getDistance(t[s],t[s-1]);for(var u=[t[0]],h=i*n,o=0,e=1;e<t.length;e+=1){var c=t[e-1],f=r.getDistance(t[e],c);if(o+f>=h){var a=t[e].subtract(c),v=(h-o)/f;return u.push(new r(c.x+v*a.x,c.y+v*a.y)),u}o+=f,u.push(t[e])}return u},getLinesIntersectPoint:u,getPerpendicularPointsAtDist:s,linesToPolygon:function(t,n){if(t.length<2)return t;for(var i=n/2,h=[],o=[],e=1;e<t.length;e+=1){var c=s(t[e-1],t[e],i),f=s(t[e],t[e-1],i);h.push({start:c[0],end:f[1]}),o.push({start:c[1],end:f[0]})}for(var a=[h[0].start],v=[o[0].start],l=1;l<h.length;l+=1){var d=u(h[l-1].start,h[l-1].end,h[l].start,h[l].end),w=u(o[l-1].start,o[l-1].end,o[l].start,o[l].end);a.push(d),v.push(w)}var k=h[h.length-1].end,m=o[o.length-1].end,g=u(a[a.length-1],v[v.length-1],k,m);if(r.getDistance(g,t[t.length-1])<i){var p=k.subtract(t[t.length-1]),y=g.subtract(t[t.length-1]);p.x*y.x+p.y*y.y>0?k=g:m=g}return a.push(k),v.push(m),v.reverse(),a.concat(v)}}},function(t,n,i){"use strict";function r(t){arguments.length>1&&void 0!==arguments[1]&&arguments[1];r.super_.call(this),this.positioner=t,this.positionedCanvas=null}var s=i(3),u=i(4);(0,i(0).inherits)(r,s),r.prototype.setCanvas=function(t){r.super_.prototype.setCanvas.call(this,t),this.positionedCanvas=t.createSubCanvas();var n=this.positionedCanvas.svg;return u.attr(n,"transform","\n    translate("+this.positioner.getXOffset()+", "+(this.positioner.getHeight()-this.positioner.getYOffset())+")\n    scale("+this.positioner.getScale()+", "+-1*this.positioner.getScale()+")\n  "),this},r.prototype.destroy=function(){r.super_.prototype.destroy.call(this),this.positionedCanvas.remove()},t.exports=r},function(t,n,i){"use strict";function r(){}var s=function(){function t(t,n){var i=[],r=!0,s=!1,u=void 0;try{for(var h,o=t[Symbol.iterator]();!(r=(h=o.next()).done)&&(i.push(h.value),!n||i.length!==n);r=!0);}catch(t){s=!0,u=t}finally{try{!r&&o.return&&o.return()}finally{if(s)throw u}}return i}return function(n,i){if(Array.isArray(n))return n;if(Symbol.iterator in Object(n))return t(n,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),u=i(1),h=i(11),o=i(12);r.prototype.generateCharacter=function(t,n){var i=this.generateStrokes(n);return new o(t,i)},r.prototype.generateStrokes=function(t){var n=function(n){return t.radStrokes&&t.radStrokes.indexOf(n)>=0};return t.strokes.map(function(i,r){var o=t.medians[r].map(function(t){var n=s(t,2),i=n[0],r=n[1];return new u(i,r)});return new h(i,o,r,n(r))})},t.exports=r},function(t,n,i){"use strict";function r(t,n,i){var r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];this.path=t,this.points=n,this.strokeNum=i,this.isInRadical=r}var s=i(1);r.prototype.getStrokeNum=function(){return this.strokeNum},r.prototype.getStartingPoint=function(){return this.points[0]},r.prototype.getEndingPoint=function(){return this.points[this.points.length-1]},r.prototype.getLength=function(){var t=this.points[0];return this.points.slice(1).reduce(function(n,i){var r=s.getDistance(i,t);return t=i,n+r},0)},r.prototype.getVectors=function(){var t=this.points[0];return this.points.slice(1).map(function(n){var i=n.subtract(t);return t=n,i})},r.prototype.getDistance=function(t){var n=this.points.map(function(n){return s.getDistance(n,t)});return Math.min.apply(Math,n)},r.prototype.getAverageDistance=function(t){var n=this;return t.reduce(function(t,i){return t+n.getDistance(i)},0)/t.length},t.exports=r},function(t,n,i){"use strict";function r(t,n){this.symbol=t,this.strokes=n}var s=i(1);r.prototype.getStroke=function(t){return this.strokes[t]},r.prototype.getNumStrokes=function(){return this.strokes.length},r.prototype.getBounds=function(){return s.getBounds([new s(0,900),new s(1024,-124)])},t.exports=r},function(t,n,i){"use strict";function r(t,n){this.G=t,this.j=n,this._()}var s=i(1);r.prototype.convertExternalPoint=function(t){var n=(t.x-this.tt)/this.nt,i=(this.getHeight()-this.it-t.y)/this.nt;return new s(n,i)},r.prototype.getXOffset=function(){return this.tt},r.prototype.getYOffset=function(){return this.it},r.prototype.getScale=function(){return this.nt},r.prototype.getHeight=function(){return this.j.height},r.prototype._=function(){var t=this.G.getBounds(),n=t[1].x-t[0].x,i=t[1].y-t[0].y,r=this.j.width-2*this.j.padding,s=this.j.height-2*this.j.padding,u=r/n,h=s/i;this.nt=Math.min(u,h);var o=this.j.padding+(r-this.nt*n)/2,e=this.j.padding+(s-this.nt*i)/2;this.tt=-1*t[0].x*this.nt+o,this.it=-1*t[0].y*this.nt+e},t.exports=r},function(t,n,i){"use strict";function r(t){var n=t.canvas,i=t.animator,r=t.character,u=t.characterRenderer,h=t.highlightRenderer,o=t.quizOptions,e=t.userStrokeOptions;this.O=n,this.b=i,this.G=r,this.W=u,this.H=h,this.rt=o,this.L=e,this.st=0,this.ut=0,this.ht=0,this.ot=[],this.h=!0,this.et=new s,this.ct()}var s=i(15),u=i(16),h=i(17),o=i(0).callIfExists;r.prototype.startUserStroke=function(t){return this.h?this.ft?this.endUserStroke():(this.ft=new u(t),this.at=new h(this.ft,this.L),void this.at.setCanvas(this.O).draw()):null},r.prototype.continueUserStroke=function(t){this.ft&&(this.ft.appendPoint(t),this.at.updatePath())},r.prototype.endUserStroke=function(){var t=this;if(!this.ft)return Promise.resolve();this.b.animate(function(n){if(!t.h)return Promise.resolve();var i=[],r=t.vt(),s=t.et.strokeMatches(t.ft,r);return i.push(t.at.fadeAndRemove(n)),t.ft=null,t.at=null,s?t.lt(r,n):(t.dt(),t.ut>=t.rt.showHintAfterMisses&&i.push(t.wt(n))),Promise.all(i)})},r.prototype.cancel=function(){this.h=!1},r.prototype.lt=function(t,n){var i=this;o(this.rt.onCorrectStroke,{character:this.G.symbol,strokeNum:this.st,mistakesOnStroke:this.ut,totalMistakes:this.ht,strokesRemaining:this.G.getNumStrokes()-this.st-1}),this.st+=1,this.ut=0;var r=this.kt(t,n);return this.st===this.G.getNumStrokes()&&(this.h=!1,o(this.rt.onComplete,{character:this.G.symbol,totalMistakes:this.ht}),this.rt.highlightOnComplete&&(r=r.then(function(){return i.H.flash(n)}))),r},r.prototype.dt=function(){this.ut+=1,this.ht+=1,o(this.rt.onMistake,{character:this.G.symbol,strokeNum:this.st,mistakesOnStroke:this.ut,totalMistakes:this.ht,strokesRemaining:this.G.getNumStrokes()-this.st})},r.prototype.wt=function(t){return this.H.getStrokeRenderer(this.st).highlight(t)},r.prototype.kt=function(t,n){return this.ot.push(t),this.W.showStroke(t.strokeNum,n)},r.prototype.vt=function(){return this.G.getStroke(this.st)},r.prototype.ct=function(){var t=this;this.b.animate(function(n){return t.W.hide(n)})},t.exports=r},function(t,n,i){"use strict";function r(){}var s=i(1),u=i(0).average;r.prototype.strokeMatches=function(t,n){var i=this.mt(t.points);if(i.length<2)return null;var r=n.getAverageDistance(i)<300,s=this.gt(i,n),u=this.pt(i,n);return r&&s&&u},r.prototype.gt=function(t,n){var i=s.getDistance(n.getStartingPoint(),t[0]),r=s.getDistance(n.getEndingPoint(),t[t.length-1]);return i<250&&r<250},r.prototype.pt=function(t,n){var i=this.yt(t),r=n.getVectors(),h=i.map(function(t){var n=r.map(function(n){return s.cosineSimilarity(n,t)});return Math.max.apply(Math,n)});return u(h)>0},r.prototype.mt=function(t){if(t.length<2)return t;var n=[t[0]];return t.slice(1).forEach(function(t){t.equals(n[n.length-1])||n.push(t)}),n},r.prototype.St=function(t){var n=0,i=t[0];return t.forEach(function(t){n+=s.getDistance(t,i),i=t}),n},r.prototype.yt=function(t){var n=[],i=t[0];return t.slice(1).forEach(function(t){n.push(t.subtract(i)),i=t}),n},t.exports=r},function(t,n,i){"use strict";function r(t){this.points=[t]}var s=i(1);r.prototype.getBounds=function(){return s.getBounds(this.points)},r.prototype.appendPoint=function(t){this.points.push(t)},t.exports=r},function(t,n,i){"use strict";function r(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};r.super_.call(this),this.options=n,this.userStroke=t}var s=i(3),u=i(0).inherits,h=i(4);u(r,s),r.prototype.getPathString=function(){return h.getPathString(this.userStroke.points)},r.prototype.updatePath=function(){h.attr(this.path,"d",this.getPathString())},r.prototype.draw=function(){return r.super_.prototype.draw.call(this),this.path=h.createElm("path"),h.attrs(this.path,this.getStrokeAttrs()),this.path.style.opacity=1,this.updatePath(),this.canvas.svg.appendChild(this.path),this},r.prototype.fadeAndRemove=function(t){var n=this,i=new h.StyleTween(this.path,"opacity",0,{duration:this.options.fadeDuration});return t.registerSvgAnimation(i),i.start().then(function(){return n.destroy()})},r.prototype.getStrokeAttrs=function(){return{fill:"none",stroke:this.options.strokeColor,"stroke-width":this.options.strokeWidth,"stroke-linecap":"round","stroke-linejoin":"round"}},r.prototype.destroy=function(){r.super_.prototype.destroy.call(this),this.path&&this.path.remove()},t.exports=r},function(t,n,i){"use strict";(function(n){var i=function(t){return"https://cdn.jsdelivr.net/npm/hanzi-writer-data@1/"+t+".json"};t.exports=function(t,r){var s=new n.XMLHttpRequest;s.overrideMimeType&&s.overrideMimeType("application/json"),s.open("GET",i(t),!0),s.onreadystatechange=function(){4===s.readyState&&200===s.status&&r(JSON.parse(s.responseText))},s.send(null)}}).call(n,i(2))},function(t,n,i){"use strict";function r(){this.Mt=null}var s=i(20);r.prototype.animate=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=this.Pt(n);return t(i).then(function(){return i.finish()})},r.prototype.Pt=function(t){return this.Mt&&this.Mt.cancel(),this.Mt=new s(t),this.Mt},t.exports=r},function(t,n,i){"use strict";function r(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.bt=[],this.h=!0,this.Ot=t.onComplete}var s=i(0).callIfExists;r.prototype.cancel=function(){this.isActive()&&(this.h=!1,this.bt.forEach(function(t){return t.finish()}))},r.prototype.registerSvgAnimation=function(t){-1===this.bt.indexOf(t)&&this.bt.push(t)},r.prototype.isActive=function(){return this.h},r.prototype.finish=function(){this.isActive()&&(this.h=!1,s(this.Ot))},t.exports=r}]);