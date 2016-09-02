/**
 * Shamelessly copied from https://github.com/callmenick/five-star-rating
 * and re-written as a jQuery plugin.
 * Added some extra functionality.
 * 
 * @author Jose D'Silva
 * 
 * @param $
 */
(function($){
	$.Rating = function(el, options){
		// To avoid scope issues, use 'base' instead of 'this'
		// to reference this class from internal events and functions.
		var base = this;
		
		// Access to jQuery and DOM versions of element
		base.$el = $(el);
		base.el = el;
		
		// Add a reverse reference to the DOM object
		base.$el.data("Rating", base);
		
		base.init = function(){
			base.options = $.extend({},$.Rating.defaultOptions, options);
			
			// initialization code
			base.currentRating = base.$el.data('rating') || base.options.rating;
			base.nbrStars = base.$el.data('stars') || base.options.stars;
			base.isReadonly = (!!base.$el.data('readonly')) || base.options.readonly;
			// The collection of stars in the rating.
			base.stars = [];
			buildWidget();
		};
		
		// private/internal functions
		
		function buildWidget(){
			if (base.currentRating < 0 || base.currentRating > base.nbrStars) {
				throw Error('Current rating is out of bounds.');
			}
			
			for (var i = 0; i < base.nbrStars; i++) {
				var $star = $('<li></li>');
				$star.addClass('c-rating__item');
				$star.data('index', i);
				if (i < base.currentRating) {
					$star.addClass('is-active');
				}
				$star.appendTo(base.$el);
				base.stars.push($star);
				if (base.isReadonly) {
					base.$el.addClass('readonly');
				} else {
					attachStarEvents($star);
				}
			}
		}
		
		/**
		 * attachStarEvents
		 * 
		 * @description Attaches events to each star in the collection.
		 * @param {JQueryElement} $star The star element
		 * @return nothing
		 */
		function attachStarEvents($star){
			starMouseOver($star);
			starMouseOut($star);
			starClick($star);
		}
		
		/**
		 * Detach all events bound to this star.
		 */
		function detachStarEvents($star) {
			detachStarMouseOver($star);
			detachStarMouseOut($star);
			detachStarClick($star);
		}
		
		function starMouseOverEventListenerHandler(e){
			$.each(base.stars, function(index, $item){
				if (index <= parseInt(e.data.star.data('index'))) {
					$item.addClass('is-active');
				} else {
					$item.removeClass('is-active');
				}
			});
		}
		
		function starMouseOver($star){
			$star.on('mouseover', {star: $star}, starMouseOverEventListenerHandler);
		}
		
		function detachStarMouseOver($star){
			$star.off('mouseover', starMouseOverEventListenerHandler);
		}
		
		function starMouseOutEventListenerHandler(e){
			if (base.stars.indexOf(e.relatedTarget) === -1) {
				setRating(null, false);
			}
		}
		
		function starMouseOut($star){
			$star.on('mouseout', {star: $star}, starMouseOutEventListenerHandler);
		}
		
		function detachStarMouseOut($star){
			$star.off('mouseout', starMouseOutEventListenerHandler);
		}
		
		function starClickEventListenerHandler(e) {
			e.preventDefault();
			setRating(parseInt(e.data.star.data('index')) + 1, true);
		}
		
		function starClick($star){
			$star.on('click', {star: $star}, starClickEventListenerHandler);
		}
		
		function detachStarClick($star){
			$star.off('click', starClickEventListenerHandler);
		}
		
		/**
		 * setRating
		 * @description Sets and updates the currentRating of the widget, and runs
		 * the callback if supplied.
		 * @param {Number} value The number to set the rating to.
		 * @param {Boolean} doCallback A boolean to determine whether to run the callback or not.
		 * @return nothing
		 */
		function setRating(value, doCallback){
			if (value && value < 0 || value > base.nbrStars) {
				return;
			}
			
			if (doCallback === undefined) {
				doCallback = true;
			}
			
			base.currentRating = value || base.currentRating;
			$.each(base.stars, function(index, $item){
				if (index < base.currentRating) {
					$item.addClass('is-active');
				} else {
					$item.removeClass('is-active');
				}
			});
			
			if (doCallback && typeof base.options.onVote === "function") {
				base.options.onVote(getRating());
			}
		}
		
		/**
		 * getRating
		 * @description Gets the current rating.
		 * @return {Number} The current rating
		 */
		function getRating(){
			return base.currentRating;
		}
		
		// Sample Function, Uncomment to use (these are public functions)
		// base.functionName = function(paramaters){
		// 
		// };
		
		/**
		 * Disable interactions with the widget.
		 */
		base.setReadonly = function(){
			$.each(base.stars, function(index, $item){
				detachStarEvents($item);
			});
			base.$el.addClass('readonly');
			base.isReadonly = true;
		}
		
		// Run initializer
		base.init();
	};
	
	// All options (except callbacks) can be set with the "data-" attribute on the element.
	$.Rating.defaultOptions = {
		// current/initial rating
		rating: 0,
		// nbr of stars
		stars: 5,
		// whether to freeze control?
		readonly: false,
		// callback function when voted (fn is passed one arg, i.e. rating value)
		onVote: null
	};
	
	$.fn.rating = function(options){
		return this.each(function(){
			(new $.Rating(this, options));
		});
	};
	
	// This function breaks the chain, but returns
	// the Rating if it has been attached to the object.
	$.fn.getRating = function(){
		return this.data("Rating");
	};
	
})(jQuery);