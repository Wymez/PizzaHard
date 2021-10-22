$(document).ready(function() {
	$('.header__burger').click(function(event) {
		$('.header__burger,.header__menu').toggleClass('active');
		$('body').toggleClass('lock');
	});
});

$(document).ready(function($) {
	// Клик по ссылке "Закрыть".
	$('.popup-open').click(function() {
		$('.popup-fade').fadeIn();
		return false;
	});

	$('.popup-close').click(function() {
		$(this).parents('.popup-fade').fadeOut();
		return false;
	});

	// Закрытие по клавише Esc.
	$(document).keydown(function(e) {
		if (e.keyCode === 27) {
			e.stopPropagation();
			$('.popup-fade').fadeOut();
		}
	});

	// Клик по фону, но не по окну.
	$('.popup-fade').click(function(e) {
		if ($(e.target).closest('.popup').length == 0) {
			$(this).fadeOut();
		}
	});
});