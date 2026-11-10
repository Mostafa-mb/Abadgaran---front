// const body = document.querySelector("main");
// const userTypeContainer = document.querySelector(".userType__container");
// const userTypeSelectBox = document.querySelector(".userType__selectBox");
// const userType__optionsContainer = document.querySelector(
//   ".userType__optionsContainer",
// );
// const userTypeOption = document.querySelectorAll(".userType__option");


// userTypeContainer.addEventListener("click", (event) => {
//   event.stopPropagation();

//   if (userTypeContainer.classList.contains("active")) {
//     showSelectboxOptions();
//   } else {
//     hideSelectboxOptions();
//   }
// });

// const showSelectboxOptions = () => {
//   userTypeContainer.classList.add("active")
//   userType__optionsContainer.classList.replace("invisible", "visible");
//   userType__optionsContainer.classList.replace("opacity-0", "opacity-100");
// };

// const hideSelectboxOptions = () => {
//   userTypeContainer.classList.remove("active")
//   userType__optionsContainer.classList.replace("visible", "invisible");
//   userType__optionsContainer.classList.replace("opacity-100", "opacity-0");
// };

// document.addEventListener("click", () => {
//   hideSelectboxOptions();
// });


const userTypeContainer = document.querySelector(".userType__container");
const userType__optionsContainer = document.querySelector(".userType__optionsContainer");
const userTypeOptions = document.querySelectorAll(".userType__option");
const userTypeSelectBox = document.querySelector(".userType__selectBox");

const showSelectboxOptions = () => {
  userTypeContainer.classList.add("active");
  userType__optionsContainer.classList.replace("invisible", "visible");
  userType__optionsContainer.classList.replace("opacity-0", "opacity-100");
};

const hideSelectboxOptions = () => {
  userTypeContainer.classList.remove("active");
  userType__optionsContainer.classList.replace("visible", "invisible");
  userType__optionsContainer.classList.replace("opacity-100", "opacity-0");
};

// ۱. با کلیک روی باکس، باز یا بسته شود و مانع پخش کلیک به بیرون شویم
userTypeContainer.addEventListener("click", (event) => {
  event.stopPropagation(); // جلوگیری از بالا رفتن رویداد به سمت document

  if (userTypeContainer.classList.contains("active")) {
    hideSelectboxOptions();
  } else {
    showSelectboxOptions();
  }
});

// ۲. کلیک در هر جای صفحه (خارج از باکس) منو را ببندد
document.addEventListener("click", () => {
  hideSelectboxOptions();
});

document.addEventListener("keyup" , event =>{
  if(event.key === "Escape"){
    hideSelectboxOptions(); 
  }
})

// ۳. انتخاب یک آیتم و ثبت مقدار آن در اینپوت
userTypeOptions.forEach((option) => {
  option.addEventListener("click", (event) => {
    event.stopPropagation();
    userTypeSelectBox.value = option.textContent.trim();
    hideSelectboxOptions();
  });
});
