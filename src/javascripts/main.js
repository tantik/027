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
	initTabs();
	scrollTo();
	initScrollController();
	mobileMenu();
	if (window.innerWidth <= 800) {
		$('li.hasdrop').slideBlock({
			linkSlide: 'a.slide-opener',
			slideBlock: 'div.drop'
		});
	}
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

// tabs init
function initTabs() {
	jQuery('ul.fade-tabset').contentTabs({
		autoHeight:true,
		animSpeed:300,
		effect: 'fade',
		event:'click'
	});
}
/*
 * jQuery Tabs plugin
 */
;(function($){
	$.fn.contentTabs = function(o){
		// default options
		var options = $.extend({
			activeClass:'active',
			addToParent:false,
			autoHeight:false,
			autoRotate:false,
			animSpeed:400,
			switchTime:3000,
			effect: 'none', // "fade", "slide"
			tabLinks:'a',
			event:'click'
		},o);

		return this.each(function(){
			var tabset = $(this);
			var tabLinks = tabset.find(options.tabLinks);
			var tabLinksParents = tabLinks.parent();
			var prevActiveLink = tabLinks.eq(0), currentTab, animating;
			var tabHolder;

			// init tabLinks
			tabLinks.each(function(){
				var link = $(this);
				var href = link.attr('href');
				var parent = link.parent();
				href = href.substr(href.lastIndexOf('#'));

				// get elements
				var tab = $(href);
				link.data('cparent', parent);
				link.data('ctab', tab);

				// find tab holder
				if(!tabHolder && tab.length) {
					tabHolder = tab.parent();
				}

				// show only active tab
				if((options.addToParent ? parent : link).hasClass(options.activeClass)) {
					prevActiveLink = link; currentTab = tab;
					tab.removeClass(tabHiddenClass).width('');
					contentTabsEffect[options.effect].show({tab:tab, fast:true});
				} else {
					contentTabsEffect[options.effect].hide({tab:tab, fast:true});
					tab.width(tab.width()).addClass(tabHiddenClass);
				}

				// event handler
				link.bind(options.event, function(e){
					if(link != prevActiveLink && !animating) {
						switchTab(prevActiveLink, link);
						prevActiveLink = link;
					}
					e.preventDefault();
				});
				if(options.event !== 'click') {
					link.bind('click', function(e){
						e.preventDefault();
					});
				}
			});

			// tab switch function
			function switchTab(oldLink, newLink) {
				animating = true;
				var oldTab = oldLink.data('ctab');
				var newTab = newLink.data('ctab');
				currentTab = newTab;

				// refresh pagination links
				(options.addToParent ? tabLinksParents : tabLinks).removeClass(options.activeClass);
				(options.addToParent ? newLink.data('cparent') : newLink).addClass(options.activeClass);

				// hide old tab
				resizeHolder(oldTab, true);
				contentTabsEffect[options.effect].hide({
					speed: options.animSpeed,
					tab:oldTab,
					complete: function() {
						// show current tab
						resizeHolder(newTab.removeClass(tabHiddenClass).width(''));
						contentTabsEffect[options.effect].show({
							speed: options.animSpeed,
							tab:newTab,
							complete: function() {
								if(!oldTab.is(newTab)) {
									oldTab.width(oldTab.width()).addClass(tabHiddenClass);
								}
								animating = false;
								resizeHolder(newTab, false);
								autoRotate();
							}
						});
					}
				});
			}

			// holder auto height
			function resizeHolder(block, state) {
				var curBlock = block && block.length ? block : currentTab;
				if(options.autoHeight && curBlock) {
					tabHolder.stop();
					if(state === false) {
						tabHolder.css({height:''});
					} else {
						var origStyles = curBlock.attr('style');
						curBlock.show().css({width:curBlock.width()});
						var tabHeight = curBlock.outerHeight(true);
						if(!origStyles) curBlock.removeAttr('style'); else curBlock.attr('style', origStyles);
						if(state === true) {
							tabHolder.css({height: tabHeight});
						} else {
							tabHolder.animate({height: tabHeight}, {duration: options.animSpeed});
						}
					}
				}
			}
			if(options.autoHeight) {
				$(window).bind('resize orientationchange', function(){
					resizeHolder(currentTab, false);
				});
			}

			// autorotation handling
			var rotationTimer;
			function nextTab() {
				var activeItem = (options.addToParent ? tabLinksParents : tabLinks).filter('.' + options.activeClass);
				var activeIndex = (options.addToParent ? tabLinksParents : tabLinks).index(activeItem);
				var newLink = tabLinks.eq(activeIndex < tabLinks.length - 1 ? activeIndex + 1 : 0);
				prevActiveLink = tabLinks.eq(activeIndex);
				switchTab(prevActiveLink, newLink);
			}
			function autoRotate() {
				if(options.autoRotate && tabLinks.length > 1) {
					clearTimeout(rotationTimer);
					rotationTimer = setTimeout(nextTab, options.switchTime);
				}
			}
			autoRotate();
		});
	}

	// add stylesheet for tabs on DOMReady
	var tabHiddenClass = 'js-tab-hidden';
	$(function() {
		var tabStyleSheet = $('<style type="text/css">')[0];
		var tabStyleRule = '.'+tabHiddenClass;
		tabStyleRule += '{position:absolute !important;left:-9999px !important;top:-9999px !important;display:block !important}';
		if (tabStyleSheet.styleSheet) {
			tabStyleSheet.styleSheet.cssText = tabStyleRule;
		} else {
			tabStyleSheet.appendChild(document.createTextNode(tabStyleRule));
		}
		$('head').append(tabStyleSheet);
	});

	// tab switch effects
	var contentTabsEffect = {
		none: {
			show: function(o) {
				o.tab.css({display:'block'});
				if(o.complete) o.complete();
			},
			hide: function(o) {
				o.tab.css({display:'none'});
				if(o.complete) o.complete();
			}
		},
		fade: {
			show: function(o) {
				if(o.fast) o.speed = 1;
				o.tab.fadeIn(o.speed);
				if(o.complete) setTimeout(o.complete, o.speed);
			},
			hide: function(o) {
				if(o.fast) o.speed = 1;
				o.tab.fadeOut(o.speed);
				if(o.complete) setTimeout(o.complete, o.speed);
			}
		},
		slide: {
			show: function(o) {
				var tabHeight = o.tab.show().css({width:o.tab.width()}).outerHeight(true);
				var tmpWrap = $('<div class="effect-div">').insertBefore(o.tab).append(o.tab);
				tmpWrap.css({width:'100%', overflow:'hidden', position:'relative'}); o.tab.css({marginTop:-tabHeight,display:'block'});
				if(o.fast) o.speed = 1;
				o.tab.animate({marginTop: 0}, {duration: o.speed, complete: function(){
					o.tab.css({marginTop: '', width: ''}).insertBefore(tmpWrap);
					tmpWrap.remove();
					if(o.complete) o.complete();
				}});
			},
			hide: function(o) {
				var tabHeight = o.tab.show().css({width:o.tab.width()}).outerHeight(true);
				var tmpWrap = $('<div class="effect-div">').insertBefore(o.tab).append(o.tab);
				tmpWrap.css({width:'100%', overflow:'hidden', position:'relative'});

				if(o.fast) o.speed = 1;
				o.tab.animate({marginTop: -tabHeight}, {duration: o.speed, complete: function(){
					o.tab.css({display:'none', marginTop:'', width:''}).insertBefore(tmpWrap);
					tmpWrap.remove();
					if(o.complete) o.complete();
				}});
			}
		}
	}
}(jQuery));


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

							that.parent(childSlide).parent().addClass(options.openClass);
							that.parent(childSlide).parent().find('> ' + options.slideBlock).slideDown(durationSlide, function(){
								$('body,html').animate({scrollTop:that.offset().top},800);
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