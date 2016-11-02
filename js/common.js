$(function() {


	// ВЫравнивание блоков по высоте
	$(".sl-snack__item h2").equalHeights(); 
	$(".sl-pizza-wrap").equalHeights(); 

	//функция добавления в заказ
	function Product(name, price){
		this.name = name;
		this.price = price;
		this.count = 0;
	}

	Goods = {
		1: new Product("Неополитана, 32см", 14),
		2: new Product("Неополитана, 26см", 10),
		3: new Product("Пепперони, 32см", 12),
		4: new Product("Пепперони, 26см", 9),
		5: new Product("Тропициана, 32см", 18),
		6: new Product("Тропициана, 26см", 13),
		7: new Product("Салат греческий, 123г.", 4.3),
		8: new Product("Салат морской, 100г.", 6),
		9: new Product("Салат с сыром фета и помидорами, 150г.", 8.5),
		10: new Product("Кола, 1.5л.", 2),
		11: new Product("Фанта, 1.5л.", 2),
		12: new Product("Спрайт, 1.5л.", 2),
	};

	// Выбор размера пиццы
	$(".select-size__btn").click(function(){
		$(this).parent().children("button").toggleClass("select-size__btn--active");

	});

	Card = [];
	 //Вывод состояния rjhpbys
	 function CheckBuy(){
		var total = 0;
		$(".order__items").empty().append("<span>Ваш заказ пуст :(</span>");
		for (var i = 0; i < Card.length; i++){
			var elem = Card[i];
			if (!elem)
				continue;

			function dotes(toLenght, char, start, end){ 
				var needAdd = toLenght - (start.length + end.length); 
				for(var i = 0; i<needAdd;i++) 
					start+=char; 
				start+=end; 
				return start; 
			}

			total += elem.price * elem.count;
			var txt = "<b class='order__item-del' data-num='"+i+"'>"+
			"<i class='fa fa-times-circle' aria-hidden='true'></i>"+
			"<p class='order__item-line'>"+dotes(40, ". ", elem.name, elem.count +" шт./"+elem.price+"р.")+"</p>"+"</b>";
			$(".order__items span").empty()
			$(".order__items").append(txt);
		}

		$("#valresult").text(total + " руб.");
		//Удаление из корзины
		$(".order__item-del").click(function(){
			Card.splice(+$(this).attr("data-num"), 1);
			CheckBuy();
		});
	}
	//Добавление в корзину
	$(".buttons").click(function(){
		$(this).addClass("selected");
		var id = $(this).attr("data-id");
		var current = Goods[id];

		var flag = false;
		for (var i = 0; i < Card.length; i++){
			if (Card[i] && Card[i].name == current.name){
				Card[i].count++;
				flag = true;
				break;
			}
		}

		if (!flag){
			current.count = 1;
			Card.push(current);
		}

		CheckBuy();
	});
	 //Изменение размера пиццы
	 $(".select-size__btn").click(function(){
		var current = $(this);
		var id = current.attr("data-id");
		current.parent().
		parent().
		siblings("button").attr("data-id", id);
		current.addClass("selected");

	 });
	//Очистка корзины
	$(".order__reset").click(function(){
		Card.splice(0, Card.length);
		CheckBuy();
	});

	//mobile menu
	$(".toggle-mnu").click(function() {
		$(this).toggleClass("on");
		$(".mian-menu").slideToggle();
		return false;
	});

	//Слайдер главный
	$(".sl-head").slick({
		arrows: true,
		autoplay: true, //автоматический показ
		autoplaySpeed: 5000, //время которое будет показан слайд
		speed: 900, //время перехода слайда
		responsive: [
		{
			breakpoint: 860,
			settings: {
				arrows: false
			}
		}
		]
	});

	/*слайдер пиццы, салатов и напитков*/
	$(".sl-second").slick({
		arrows: true,
		slidesToShow: 3,
		dots: true,
		responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 2
			}
		},
		{
			breakpoint: 780,
			settings: {
				slidesToShow: 1,
				arrows: false
			}
		}
		]
	});	


	//плавный скрол в хроме
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {
	};

	$(".buttons").click(function(){
		$(this).children("i").css({"transform":"rotate(360deg)"});
	});


});
