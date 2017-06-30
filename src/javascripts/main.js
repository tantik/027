$(window).resize(function() {
	initProductList();
	if (window.innerWidth > 800) {
		$('body').removeClass('nav-visible');
		$('li.hasdrop').each(function () {
			$(this).removeClass('slide-active');
		});
		$('li.hasdrop .drop').each(function () {
			$(this).removeAttr("style");
		});
	} else{
		$('body').removeClass('nav-visible');
		$('li.hasdrop').each(function () {
			$(this).removeClass('slide-active');
		});
		$('li.hasdrop .drop').each(function () {
			$(this).hide();
		});
	}
});

$(document).ready(initPage);
function initPage(){
	initGallery();
	initProductList();
	scrollTo();
	initTabs();
	initScrollController();
	mobileMenu();
	initSameHeight();
	optionGallery();
	checkAvailable();

	$("#fancy-image1").fancybox();
	$("#fancy-image2").fancybox();
	$("#fancy-image3").fancybox();
	$("#fancy-image4").fancybox();
	$("#fancy-image1-img").fancybox();
	$("#fancy-image2-img").fancybox();
	$("#fancy-image3-img").fancybox();
	$("#fancy-image4-img").fancybox();
	
	if (window.innerWidth <= 800) {
		$('.nav ul').slideBlock({
			linkSlide: '.slide-opener',
			slideBlock: 'div.drop',
			mode: 'accordion',
			childSlide:	'accordion-child'
		});

		$('.sidebar').slideBlock({
			linkSlide: '.slide-opener',
			slideBlock: 'ul.side-nav'
		});
	}
}


function checkAvailable() {
	if ($('.radio-list').length > 0) {
		$("input[type='radio'").click(function(){
			if ($(this).hasClass('txt-available')) {
				$(this).parent().parent().find($('.input-text input')).prop('disabled', false);
			} else {
				$(this).parent().parent().find($('.input-text input')).prop('disabled', true);
			}
		});
	}
}


function optionGallery() {
	if ($(".owlth").length > 0) {

		$('.owlth').owlCarousel({
			margin: 0,
			loop: false,
			items: 1,
			nav: true,
			dots: false,
			thumbs: true,
			thumbsPrerendered: true
		});

		$(".mypop").click(function (a) {
			a.preventDefault();
			$('.mypop').removeClass('opn');
			$('.hold1').removeClass('opn');
		});

		$(".showpopup li a").click(function (a) {
			a.preventDefault();
			$('.mypop').addClass('opn');
			$('.hold1').removeClass('opn');
			$(this).parent().find('.hold1').addClass('opn');
		});

		$("div.close").click(function (a) {
			a.preventDefault();
			$('.mypop').removeClass('opn');
			$('.hold1').removeClass('opn');
		});
	}

	$(".fancy").fancybox({

		toolbar: true,
		buttons: [
			'close'
		],
		arrows: false,
		smallBtn: true,
		iframe: {
			preload: false
		}
	});

	$("[data-fancybox]").fancybox({
		thumbs: {
			autoStart: true
		}
	});
}



function initTabs() {
	jQuery.browser = {};
	(function () {
		jQuery.browser.msie = false;
		jQuery.browser.version = 0;
		if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
			jQuery.browser.msie = true;
			jQuery.browser.version = RegExp.$1;
		}
	})();
	$('#tabwrap').tabs({ fxFade: true, fxSpeed: 'fast' });
	$('a[href="#tab1"]').click();
}

function initGallery() {
	var swiper = new Swiper('.main-gallery', {
		effect: 'fade',
		speed: 1500,
		autoplay: 4000,
	});
}


function initProductList() {
	var ProdList = $('.product-list .list li');
	if (ProdList.length == 0) return;
	ProdList.each(function (e) {
		var elemHeight = $(this).find('a').innerWidth();
		$(this).find('a').css('height', elemHeight);
	});
}

function scrollTo() {
	$('.link-to-top').click( function(){
		var scroll_el = $(this).attr('href');
		if ($(scroll_el).length != 0) {
			$('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
		}
		return false;
	});
	$('.anchor-link').click( function(){
		var scroll_el = $(this).attr('href');
		if ($(scroll_el).length != 0) {
			$('html, body').animate({ scrollTop: $(scroll_el).offset().top -20 }, 500);
		}
		return false;
	});
	if (window.innerWidth <= 800) {
		$('.map-link').click(function () {
			var scroll_el = $(this).attr('href');
			if ($(scroll_el).length != 0) {
				$('html, body').animate({scrollTop: $(scroll_el).offset().top -50}, 500);
			}
			return false;
		});
	} else {
		$('.map-link').click(function () {
			var scroll_el = $(this).attr('href');
			if ($(scroll_el).length != 0) {
				$('html, body').animate({scrollTop: $(scroll_el).offset().top -100}, 500);
			}
			return false;
		});
	}
}

/* scroll to top link */
function initScrollController(){
	var _x = { headMenu:false, mainHead:false, needToScroll:false, mobileButtonOffTop:false, mobileButtonsFix:false };
	window.onscroll = function(){
		var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
		scrollPosition && scrollPosition > 200 &&
		(document.querySelector('.link-to-top').classList.add('visible')) ||
		!scrollPosition &&
		(document.querySelector('.link-to-top').classList.remove('visible'))
	}
}

function mobileMenu(){
	$('a.mobile-opener').click(function (e) {
		e.preventDefault();
		$('body').toggleClass('nav-visible');
	});
	$('.nav .drop li a').click(function (e) {
		$('body').removeClass('nav-visible');
	});
}

/* Slide Block */
(function($) {
	$.fn.slideBlock = function(options){
		var options = $.extend({
			linkSlide: '.slide-link',
			slideBlock: 'div.slide-box',
			openClass: 'slide-active',
			durationSlide: 500,
			openComplete: false,
			closeComplete: false,
			mode:	false, //'accordion' - accordion mode or false - slide-block
			childSlide:	'accordion-child', //use only if mode: 'accordion'
		}, options);
		this.each(function() {
			if (options.mode === 'accordion') {
				var accordion = jQuery(this);
				var childSlide = accordion.find('> .' + options.childSlide, this);
				childSlide.each(function(){
					var $this = jQuery(this);
					if (!$this.is('.' + options.openClass)) {
						$this.children(options.slideBlock).css('display','none');
					}
				});
				childSlide.each(function(){
					var $this = jQuery(this);
					var link = $(options.linkSlide, this).eq(0);
					link.click(function(){
						var that = $(this);
						if (that.closest(childSlide).is('.'+options.openClass)) {
							that.closest(childSlide).removeClass(options.openClass);
							that.closest(childSlide).find('> ' + options.slideBlock).slideUp(durationSlide, function(){if(typeof( options.closeComplete) == 'function') options.closeComplete()});
						} else {
							that.closest(accordion).find(childSlide).removeClass(options.openClass);
							that.closest(accordion).find(childSlide).find('> ' + options.slideBlock).slideUp(durationSlide, function(){if(typeof( options.closeComplete) == 'function') options.closeComplete()});

							that.parent(childSlide).addClass(options.openClass);
							that.parent(childSlide).find('> ' + options.slideBlock).slideDown(durationSlide, function(){
								if(typeof( options.openComplete) == 'function') options.openComplete(this);
							});

						}
						return false;
					});
				});
			} else {
				var $this = jQuery(this);
				var link = $(options.linkSlide, this).eq(0);
				var slideBlock = $(options.slideBlock, this).eq(0);
				var openClass = options.openClass;
				var durationSlide = options.durationSlide;

				if (!$this.is('.'+openClass)) {
					$this.find(slideBlock).css('display','none');
				}
				link.click(function(){
					if ($this.is('.'+ openClass)) {
						$this.removeClass(openClass);
						$this.find(slideBlock).slideUp(durationSlide, function(){if(typeof( options.closeComplete) == 'function') options.closeComplete()});
					} else {
						$this.addClass(openClass);
						$this.find(slideBlock).slideDown(durationSlide, function(){if(typeof( options.openComplete) == 'function') options.openComplete(this)});
					}
					return false;
				});
			}
		});
		return this;
	};
})(jQuery);



// set same column height
function initSameHeight(){
	// multirow
	jQuery('.manufacturing-blocks').sameHeight({
		elements: 'div.hold',
		flexible: true,
		multiLine: true
	});
}

/*
 * jQuery SameHeight plugin
 */
;(function($){
	$.fn.sameHeight = function(opt) {
		var options = $.extend({
			skipClass: 'same-height-ignore',
			leftEdgeClass: 'same-height-left',
			rightEdgeClass: 'same-height-right',
			elements: '>*',
			flexible: false,
			multiLine: false,
			useMinHeight: false
		},opt);
		return this.each(function(){
			var holder = $(this);
			var elements = holder.find(options.elements).not('.' + options.skipClass);
			if(!elements.length) return;

			// resize handler
			function doResize() {
				elements.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', '');
				if(options.multiLine) {
					// resize elements row by row
					resizeElementsByRows(elements, options);
				} else {
					// resize elements by holder
					resizeElements(elements, holder, options);
				}
			}
			doResize();

			// handle flexible layout / font resize
			if(options.flexible) {
				$(window).bind('resize orientationchange fontresize', function(e){
					doResize();
					setTimeout(doResize, 100);
				});
			}
			// handle complete page load including images and fonts
			$(window).bind('load', function(){
				doResize();
				setTimeout(doResize, 100);
			});
		});
	}

	// detect css min-height support
	var supportMinHeight = typeof document.documentElement.style.maxHeight !== 'undefined';

	// get elements by rows
	function resizeElementsByRows(boxes, options) {
		var currentRow = $(), maxHeight, firstOffset = boxes.eq(0).offset().top;
		boxes.each(function(ind){
			var curItem = $(this);
			if(curItem.offset().top === firstOffset) {
				currentRow = currentRow.add(this);
			} else {
				maxHeight = getMaxHeight(currentRow);
				resizeElements(currentRow, maxHeight, options);
				currentRow = curItem;
				firstOffset = curItem.offset().top;
			}
		});
		if(currentRow.length) {
			maxHeight = getMaxHeight(currentRow);
			resizeElements(currentRow, maxHeight, options);
		}
	}

	// calculate max element height
	function getMaxHeight(boxes) {
		var maxHeight = 0;
		boxes.each(function(){
			maxHeight = Math.max(maxHeight, $(this).outerHeight());
		});
		return maxHeight;
	}

	// resize helper function
	function resizeElements(boxes, parent, options) {
		var parentHeight = typeof parent === 'number' ? parent : parent.height();
		boxes.removeClass(options.leftEdgeClass).removeClass(options.rightEdgeClass).each(function(i){
			var element = $(this);
			var depthDiffHeight = 0;

			if(typeof parent !== 'number') {
				element.parents().each(function(){
					var tmpParent = $(this);
					if(this === parent[0]) {
						return false;
					} else {
						depthDiffHeight += tmpParent.outerHeight() - tmpParent.height();
					}
				});
			}
			var calcHeight = parentHeight - depthDiffHeight - (element.outerHeight() - element.height());
			if(calcHeight > 0) {
				element.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', calcHeight);
			}
		});
		boxes.filter(':first').addClass(options.leftEdgeClass);
		boxes.filter(':last').addClass(options.rightEdgeClass);
	}
}(jQuery));

/*
 * jQuery FontResize Event
 */
jQuery.onFontResize = (function($) {
	$(function() {
		var randomID = 'font-resize-frame-' + Math.floor(Math.random() * 1000);
		var resizeFrame = $('<iframe>').attr('id', randomID).addClass('font-resize-helper');

		// required styles
		resizeFrame.css({
			width: '100em',
			height: '10px',
			position: 'absolute',
			borderWidth: 0,
			top: '-9999px',
			left: '-9999px'
		}).appendTo('body');

		var doc = resizeFrame[0].contentWindow.document;
		doc.open();
		doc.write('<scri' + 'pt>window.onload = function(){var em = parent.jQuery("#' + randomID + '")[0];window.onresize = function(){if(parent.jQuery.onFontResize){parent.jQuery.onFontResize.trigger(em.offsetWidth / 100);}}};</scri' + 'pt>');
		doc.close();

		jQuery.onFontResize.initialSize = resizeFrame[0].offsetWidth / 100;
	});
	return {
		// public method, so it can be called from within the iframe
		trigger: function (em) {
			$(window).trigger("fontresize", [em]);
		}
	};
}(jQuery));