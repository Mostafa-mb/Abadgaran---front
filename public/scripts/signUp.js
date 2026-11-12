const userTypeContainer = document.querySelector(".userType__container");
const userType__optionsContainer = document.querySelector(
  ".userType__optionsContainer",
);
const userTypeOptions = document.querySelectorAll(".userType__option");
const userTypeSelectBox = document.querySelector(".userType__selectBox");

const showSelectboxOptions = () => {
  userTypeContainer.classList.add("active");
  userTypeContainer.querySelector("span").classList.add("rotate-180");
  userType__optionsContainer.classList.replace("invisible", "visible");
  userType__optionsContainer.classList.replace("opacity-0", "opacity-100");
};

const hideSelectboxOptions = () => {
  userTypeContainer.classList.remove("active");
  userTypeContainer.querySelector("span").classList.remove("rotate-180");
  userType__optionsContainer.classList.replace("visible", "invisible");
  userType__optionsContainer.classList.replace("opacity-100", "opacity-0");
};

userTypeContainer.addEventListener("click", (event) => {
  event.stopPropagation();

  if (userTypeContainer.classList.contains("active")) {
    hideSelectboxOptions();
  } else {
    showSelectboxOptions();
  }
});

document.addEventListener("click", () => {
  hideSelectboxOptions();
});

document.addEventListener("keyup", (event) => {
  if (event.key === "Escape") {
    hideSelectboxOptions();
  }
});

userTypeOptions.forEach((option) => {
  option.addEventListener("click", (event) => {
    event.stopPropagation();
    userTypeSelectBox.value = option.textContent.trim();
    hideSelectboxOptions();
  });
});
