$(document).ready(function() {
     	// Кнопка "меню" (скрытие/отображение)
     	$(".nav-button").click(function(){
     		$(this).next().slideToggle("slow");
     	});
     	// Определяем ширину экрана (для адаптивности)
     	var winWidth = $(window).width();
     	// console.log(winWidth);

     	// Обработчик событий при скролле
	$(window).scroll(function (){
		// Фиксирование навигации при прокрутке + добавление фона
		var topHeight;
		if (winWidth < 768) {
			topHeight = 50;
			// console.log(topHeight);
		}
		else {
			topHeight = 80;
			// console.log(topHeight);
		}
		// console.log($(window).scrollTop());
		var newHeight = $(window).scrollTop();
		if (newHeight > topHeight ) {
			$("#main-nav").addClass('scrollable');
		} else {
			$("#main-nav").removeClass('scrollable');
		};

		// Опускание руки
		scrollPos = parseInt($(window).scrollTop());
		drawing(scrollPos);

		// Параллакс
		// Блок Header
		var parallaxStatement = $(this).scrollTop();
		// console.log(parallaxStatement);
		$('.most-wanted').css({
			"transform" : "rotate(-12deg) translateY(-" + parallaxStatement/2 + "%)"
			// "transform" : "rotate(" + (parallaxStatement/20 - 12) + "deg) translateY(-" + parallaxStatement/2 + "%)"
		});
		// $('.benefit').css({
		// 	"transform" : "translateX(" + parallaxStatement/8 + "%) translateY(" + parallaxStatement/4 + "%)"
		// });
		// $('.top-background').css({
		// 	"transform" : "rotateY(" + parallaxStatement/15 + "deg)"
		// });
	});

	// Всплывающее модальное окно формы
	$('#callback').click(function(event){
		event.preventDefault();
		$('.overlay').fadeIn(400, function(){
			$('.modal-form').css('display', 'block');
			$('.modal-form').animate({opacity:1, top:'50%'},400);
		});
	});
	$('#close, .overlay').click(function(){
		$('.modal-form').animate({opacity:0, top:'45%'},400, function(){
			$(this).css('display', 'none');
			$('.overlay').fadeOut(400);
		});
	});

	// Плавный скролл до блока при нажатии на пункт меню навигации
	$('#to-test-drive').click(function(){
		$('html, body').animate({scrollTop:$('#test-drive').position().top}, 1200);
	});
	$('#to-design').click(function(){
		$('html, body').animate({scrollTop:$('#design').position().top}, 800);
	});
	$('#to-characteristic').click(function(){
		$('html, body').animate({scrollTop:$('#characteristic').position().top}, 1200);
	});
	$('#to-picking').click(function(){
		$('html, body').animate({scrollTop:$('#picking').position().top}, 1200);
	});
	$('#to-contacts').click(function(){
		$('html, body').animate({scrollTop:$('#contacts').position().top}, 800);
	});
	// Скролл вверх по нажатию кнопки
	$('.up').click(function(){
		$('html, body').animate({scrollTop:$('.top-nav').position().top}, 1200);
	});


	// Функция опускания рисующей руки
	var 	hand = $('.design'),
		scrollPos = 0,
		draws = $('.drawing');
	function drawing(scrollPos){
		// Variables
		var handPos     = parseInt(hand.offset().top),    // Позиция главного блока с рукой и параграфами.
		drawsHeight = parseInt(draws.innerHeight()),  // Высота блока с рукой
		handScroll  = scrollPos-handPos;              // Формула выставляем блок с рукой в позицию равной скролу. Рука получается на верху экрана.
		if (winWidth < 960) {
			var handScrollL = hand.innerHeight() + handPos - 546; // Максимальный лимит до которого рука может дойти.
		} else if (winWidth < 1200) {
			var handScrollL = hand.innerHeight() + handPos - 656;
		} else var handScrollL = hand.innerHeight() + handPos - 762;
		// console.log(handPos);
		// console.log(drawsHeight);
		// console.log('ScrollPos: ' + scrollPos + ' // handScroll: ' + handScroll + ' // CONDITIONS : ' + handScrollL);
		if (scrollPos < handScrollL) {
			draws.css('top', handScroll);
		} else {
			draws.css('top', handScrollL-handPos);
			}
	};

	// Карусель owl-carousel
	//Документация: http://owlgraphic.com/owlcarousel/
	var owl = $("#owl-design");
	owl.owlCarousel({
		singleItem:true,
		slideSpeed : 800
	});
	$(".next-button").click(function(){
		owl.trigger('owl.next');
		paginationSpeed : 800;
	});
	$(".prev-button").click(function(){
		owl.trigger('owl.prev');
	});

	// Анимация цитат из блока Дизайн при скролле
	// Библиотека WOW.js 
	//Документация http://mynameismatthieu.com/WOW/docs.html
	new WOW().init();

	// Отображение блока со счетчиком скидки
	$('#display-sale-block').click(function(){
		// $('.sale-block').css('display', 'block');
		$('.sale-block').css('display', 'block');
		$('.sale-block').animate({opacity:1},1000);
	});

	// Счетчик скидки (до 20%)
	var saleCount = 0; //Начальное значение счетчика скидок
	$('.sale-result-form').val(0); //Начальное значение скидки
	function saleCounter() {
		$('.sale-result').text(saleCount);
		saleCount++;
		if (saleCount == 20) saleCount = 0;
	};
	$('#start').click(function(){
		a = setInterval(saleCounter,30);
	});
	$('#stop').click(function(){
		clearInterval(a);
		$('.sale-result-form').val($('.sale-result').text()); //Добавляем текущие данные в форму заказа
	});

	//Проверка номера телефона формат: (066) 111-2222
	//Документация http://digitalbush.com/projects/masked-input-plugin/
	$(function($){
		$('#order-user-phone').mask("(999) 999-9999");
	});

	// Отправка формы тест-драйва
	$(".test-drive-schedule").submit(function() {
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			alert("Добро пожаловать в команду BMW!\nНа указанный Вами адрес будет выслано приглашение на тест-драйв,\nрасписание проведения и варианты локаций.\nСпасибо за заявку!");
			$(".test-drive-schedule").trigger("reset");
			$('.modal-form').animate({opacity:0, top:'45%'},400, function(){
				$(this).css('display', 'none');
				$('.overlay').fadeOut(400);
			});
		});
		return false;
	});
	// Отправка формы заказа авто
	$("#checkout").submit(function() {
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			alert("Добро пожаловать в команду BMW!\nВ ближайшее время с Вами свяжется наш менеджер.\nСпасибо за заявку!");
			$("#checkout").trigger("reset");
		});
		return false;
	});
	// Отправка формы подписки на новости
	$(".news-subscribe-form").submit(function() {
		$.ajax({
			type: "POST",
			url: "mailnews.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			alert("Спасибо за заявку!\nНа указанный Вами адрес будут приходить новости нашей компании");
			$(".news-subscribe-form").trigger("reset");
		});
		return false;
	});

});