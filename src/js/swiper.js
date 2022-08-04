const swiperTeam = new Swiper('.team__slider', {
  slidesPerView: 1,
  allowTouchMove: false,

  breakpoints: {
		768: {
      slidesPerView: 2,
      spaceBetween: 16,
		},
    992: {
      slidesPerView: 3,
      spaceBetween: 16,
		},
    1200: {
      slidesPerView: 4,
      spaceBetween: 16,
		},
  },

  pagination: {
    el: '.team__pagination',
  },

  navigation: {
    nextEl: '.team__next',
    prevEl: '.team__prev',
  },
});

