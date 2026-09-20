var swiper = new Swiper(".ImageSliderSwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".button-next",
    prevEl: ".button-preview",
  },
});

const sliderContainer = document.querySelector(".slider__container");
const sliderButtons = document.querySelector(".slider__buttons");

sliderContainer.addEventListener("mouseenter", () => {
  sliderButtons.classList.remove("invisible", "opacity-0");
  sliderButtons.classList.add("visible", "opacity-100");
});

sliderContainer.addEventListener("mouseleave", () => {
  sliderButtons.classList.remove("visible", "opacity-100");
  sliderButtons.classList.add("invisible", "opacity-0");
});

const productCategorySwiper = new Swiper(".productCategorySwiper", {
  direction: "horizontal",

  slidesPerView: 4,
  spaceBetween: 10,

  loop: true,

  navigation: {
    nextEl: ".category-next",
    prevEl: ".category-prev",
  },

  // Responsive breakpoints
  breakpoints: {
    768: {
      slidesPerView: 5,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 9,
      spaceBetween: 10,
    }
  },
});

const onlineProductsSwiper = new Swiper(".onlineProductsSwiper", {
  direction: "horizontal",

  slidesPerView: 2.5,
  spaceBetween: 5,

  loop: true,

  navigation: {
    nextEl: ".onlineProducts-next",
    prevEl: ".onlineProducts-prev",
  },

  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    768: {
      slidesPerView: 3.5,
      spaceBetween: 5,
    },
    1024: {
      slidesPerView: 5.5,
      spaceBetween: 5,
    },
  },
});
