const mobileMenuCloseBtn = document.querySelector("#mobileMenu_closeBtn");
const mobileMenu = document.querySelector("#mobileMenu");
const mobileMenuBtn = document.querySelector("#mobileMenu_btn");
const overlay = document.querySelector("#overlay");
const firstTierSubMenuItems = document.querySelectorAll(
  ".hasFirstTier_submenu",
);
const secondTierSubMenuItems = document.querySelectorAll(
  ".hasSecondTier_submenu",
);

mobileMenuCloseBtn.addEventListener("click", closeMobileMenu);
mobileMenuBtn.addEventListener("click", showMobileMenu);
overlay.addEventListener("click", clickOverlay);

function closeMobileMenu() {
  mobileMenu.classList.remove("rtl:right-0", "ltr:left-0");
  mobileMenu.classList.add("rtl:-right-77", "ltr:-left-77");
  HideOverlay();
}

function showMobileMenu() {
  mobileMenu.classList.remove("rtl:-right-77", "ltr:-left-77");
  mobileMenu.classList.add("rtl:right-0", "ltr:left-0");
  showOverlay();
}

function HideOverlay() {
  overlay.classList.add("hidden");
}

function showOverlay() {
  overlay.classList.remove("hidden");
}

function clickOverlay() {
  closeMobileMenu();
}

firstTierSubMenuItems.forEach((item) => {
  item.addEventListener("click", (event) => {

    item.querySelector(".toggleIcon").classList.toggle("rotate-180");
    item.nextElementSibling.classList.contains("firstTierSubmenu")
      ? item.nextElementSibling.classList.toggle("hidden")
      : null;
  });
});

secondTierSubMenuItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    console.log(item);
    item.querySelector(".toggleIcon").classList.toggle("rotate-180");
    item.nextElementSibling.classList.contains("SecondTier_submenu")
      ? item.nextElementSibling.classList.toggle("hidden")
      : null;
  });
});

