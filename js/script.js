"use strict";

(() => {
  let $ = (el) => document.querySelector(el);

  $(".mainmenu__btn").addEventListener("click", function () {
    this.classList.toggle("mainmenu__btn--active");
    $(".mainmenu__nav").classList.toggle("mainmenu__nav--active");
  });
})();

// IE 10

(function () {
  var $ = function (el) {
    return document.querySelector(el);
  };

  $(".mainmenu__btn").addEventListener("click", function () {
    this.classList.toggle("mainmenu__btn--active");
    $(".mainmenu__nav").classList.toggle("mainmenu__nav--active");
  });
})();

// IE9 / IE8

(function () {
  var mainmenuToggle = document.querySelector(".mainmenu__btn"),
    mainmenuNav = document.querySelector(".mainmenu__nav"),
    hasClass = function (elem, className) {
      return new RegExp(" " + className + " ").test(" " + elem.className + " ");
    },
    toggleClass = function (elem, className) {
      var newClass = " " + elem.className.replace(/[\t\r\n]/g, " ") + " ";
      if (hasClass(elem, className)) {
        while (newClass.indexOf(" " + className + " ") >= 0) {
          newClass = newClass.replace(" " + className + " ", " ");
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, "");
      } else {
        elem.className += " " + className;
      }
    },
    mainmenuToggleNav = function () {
      toggleClass(mainmenuToggle, "mainmenu__btn--active");
      toggleClass(mainmenuNav, "mainmenu__nav--active");
    };

  if (!mainmenuToggle.addEventListener) {
    mainmenuToggle.attachEvent("onclick", mainmenuToggleNav);
  } else {
    mainmenuToggle.addEventListener("click", mainmenuToggleNav);
  }
})();

function searchToggle(obj, evt) {
  var container = $(obj).closest(".search-wrapper");
  if (!container.hasClass("active")) {
    container.addClass("active");
    evt.preventDefault();
  } else if (
    container.hasClass("active") &&
    $(obj).closest(".input-holder").length == 0
  ) {
    container.removeClass("active");

    container.find(".search-input").val("");
  }
}

$("input[type=checkbox]").each(function () {
  if ($(this).prop("checked")) {
    $(this).parent().addClass("checked");
  } else {
    $(this).parent().addClass("unchecked");
  }
});

$("input[type=checkbox]").click(function () {
  if ($(this).prop("checked")) {
    $(this).parent().addClass("checked");
    $(this).parent().removeClass("unchecked");
  } else {
    $(this).parent().addClass("unchecked");
    $(this).parent().removeClass("checked");
  }
});

function logElementEvent(eventName, element) {
  console.log(
    Date.now(),
    eventName,
    element.getAttribute("data-bg88da112-bg-hidpi=bg")
  );
}

var callback_enter = function (element) {
  logElementEvent("ENTERED", element);
};
var callback_exit = function (element) {
  logElementEvent("EXITED", element);
};
var callback_loading = function (element) {
  logElementEvent("LOADING", element);
};
var callback_loaded = function (element) {
  logElementEvent("LOADED", element);
};
var callback_error = function (element) {
  logElementEvent("ERROR", element);
  element.src = "https://via.placeholder.com/220x280/?text=Error+Placeholder";
};
var callback_finish = function () {
  logElementEvent("FINISHED", document.documentElement);
};
var callback_cancel = function (element) {
  logElementEvent("CANCEL", element);
};

function initLazyLoad() {
  new LazyLoad({
    callback_enter: callback_enter,
    callback_exit: callback_exit,
    callback_cancel: callback_cancel,
    callback_loading: callback_loading,
    callback_loaded: callback_loaded,
    callback_error: callback_error,
    callback_finish: callback_finish,
  });
}

function increaseValue() {
  var value = parseInt(document.getElementById("number").value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById("number").value = value;
}

function decreaseValue() {
  var value = parseInt(document.getElementById("number").value, 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? (value = 1) : "";
  value--;
  document.getElementById("number").value = value;
}

$.each($(".promo__img"), function () {
  $(this).attr("data-bg", getImage());
});

function getImage() {
  return "https://picsum.photos/id/" + getRandomInt(1, 100) + "/400/300";
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

$(document).ready(function () {
  $(".slider").slick({
    slidesToShow: 1,
    arrows: true,
    dots: false,
    loop: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: '<div class="next-arrow"><img src="img/arrow-next.png"></div>',
    prevArrow: '<div class="prev-arrow"><img src="img/arrow-prev.png"></div>',
  });

  var promo__slider = $(".promo__slider").slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow:
      '<div class="next-arrow"><img src="img/next-arrow-orange.png"></div>',
    prevArrow:
      '<div class="prev-arrow"><img src="img/prev-arrow-orange.png"></div>',
    arrows: true,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  initLazyLoad();

  updateDots(".promo__slider");

  promo__slider.on(
    "beforeChange",
    function (event, slick, currentSlide, nextSlide) {
      let slidesToScroll = slick.slickGetOption("slidesToScroll"),
        slideCount = slick.slideCount;

      if (slideCount - slidesToScroll == nextSlide) {
        addSlides(slick);
      }
    }
  );

  promo__slider.on(
    "afterChange",
    function (event, slick, currentSlide, nextSlide) {
      updateDots(".promo__slider");
    }
  );
});

function addSlides(slick, count = 12) {
  for (let i = 0; i < count; i++) {
    slick.slickAdd(
      '<div class="promo__single promo__single--missing">\n\
      <div class="promo__img lazy" data-bg="' +
        getImage() +
        '">\n\
          <ul class="promo__stock">\n\
              <li>\n\
                  <p>Акция -25%</p>\n\
              </li>\n\
          </ul>\n\
      </div>\n\
      <div class="promo__txt">\n\
          <div class="promo__condition">\n\
              <p class="promo__availability">Отсутствует</p>\n\
              <p class="promo__code">Код: 4744481010818</p>\n\
          </div>\n\
          <div class="promo__description">\n\
              <p>Рисовые хлебцы с молочным шоколадом, 34г\n\
              </p>\n\
          </div>\n\
          <div class="promo__card">\n\
              <div class="promo__price">\n\
                  <p>2.98 р.</p>\n\
              </div>\n\
          </div>\n\
      </div>\n\
      <div class="promo__bottom">\n\
          <div class="promo__counter">\n\
              <form class="promo__quantity">\n\
                  <div class="value-button" id="decrease" onclick="decreaseValue()"\n\
                      value="Decrease Value">-</div>\n\
                  <input type="number" id="number" value="0" />\n\
                  <div class="value-button" id="increase" onclick="increaseValue()"\n\
                      value="Increase Value">+</div>\n\
              </form>\n\
          </div>\n\
          <div class="promo__buttons">\n\
              <button class="promo__buy promo__buy--click">Купить в 1 клик</button>\n\
              <button class="promo__buy promo__buy--addtocard">В корзину</button>\n\
          </div>\n\
      </div>\n\
    </div>'
    );

    initLazyLoad();
  }
}

function updateDots(slider) {
  var dots = $(slider).find("ul.slick-dots > li"),
    active_dot = $(slider).find("ul.slick-dots > li.slick-active");

  dots.removeClass("before after");

  $(active_dot).prev().addClass("before").prev().addClass("before");

  $(active_dot).next().addClass("after").next().addClass("after");

  if (!$(active_dot).prev().length) {
    $(active_dot)
      .next()
      .next()
      .next()
      .addClass("after")
      .next()
      .addClass("after");
  }

  if (!$(active_dot).prev().prev().length) {
    $(active_dot).next().next().next().addClass("after");
  }

  if (!$(active_dot).next().length) {
    $(active_dot)
      .prev()
      .prev()
      .prev()
      .addClass("before")
      .prev()
      .addClass("before");
  }

  if (!$(active_dot).next().next().length) {
    $(active_dot).prev().prev().prev().addClass("before");
  }
}
