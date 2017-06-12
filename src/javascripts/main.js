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
	if (window.innerWidth <= 800) {
		$('.nav ul').slideBlock({
			linkSlide: 'a.slide-opener',
			slideBlock: 'div.drop',
			mode: 'accordion',
			childSlide:	'accordion-child'
		});
	}
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
}

/* Slide Block */
(function($) {
	$.fn.slideBlock = function(options){
		var options = $.extend({
			linkSlide: 'a.slide-link',
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