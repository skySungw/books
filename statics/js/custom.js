/* ----------------------------- 
Pre Loader
----------------------------- */
$(window).load(function() {
	'use strict';
	$('.loader').delay(200).fadeOut();
	$('.preloader').delay(400).fadeOut('slow');
});

/* ----------------------------- 
Cloud movement
-----------------------------  */
$(document).ready(function() {
	'use strict';
	$('.cloud').plaxify()
	$.plax.enable()
});


/* ----------------------------- 
Element slide animations
-----------------------------  */
$(window).load(function() {	
	'use strict';
	$('html').find('.animated').each(function() {
		var element = $(this),
			animation = element.data('animation'),
			animationDelay = element.data('animation-delay');
			if ( animationDelay ) {

				setTimeout(function(){
					element.addClass( animation + " visible");
				}, animationDelay);
				setTimeout(function(){
					element.removeClass( animation );
				}, 5000);

			} else {
				element.addClass( animation + " visible");
			}
	});
});


