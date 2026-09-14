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

sliderContainer.addEventListener("mouseenter" , () =>{
  sliderButtons.classList.remove("invisible","opacity-0")
  sliderButtons.classList.add("visible","opacity-100")
})

sliderContainer.addEventListener("mouseleave" , () =>{
  sliderButtons.classList.remove("visible","opacity-100")
  sliderButtons.classList.add("invisible","opacity-0")
})




const productCategorySwiper = new Swiper('.productCategorySwiper', {

    direction: 'horizontal',

    slidesPerView: 2,
    spaceBetween:20,

    loop: true,

    navigation: {
        nextEl: '.category-next',
        prevEl: '.category-prev',
    },

  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    768: {
      slidesPerView: 8,
      spaceBetween: 40
    }}

});