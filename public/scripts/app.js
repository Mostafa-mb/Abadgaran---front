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
const searchInput = document.querySelector("#searchInput");
const desktopSearchResult = document.querySelector("#desktop-searchResult");
const shopcartBtn = document.querySelector("#shopcart_btn");
const shopcartCard = document.querySelector("#shopcartCard");
const userPanelBtn = document.querySelector("#userPanelBtn");
const userPanel = document.querySelector("#userPanel");

const closeMobileMenu = () => {
  mobileMenu.classList.remove("rtl:right-0", "ltr:left-0");
  mobileMenu.classList.add("rtl:-right-77", "ltr:-left-77");
  HideOverlay();
};

const showMobileMenu = () => {
  mobileMenu.classList.remove("rtl:-right-77", "ltr:-left-77");
  mobileMenu.classList.add("rtl:right-0", "ltr:left-0");
  showOverlay();
};

const HideOverlay = () => {
  overlay.classList.add("hidden");
};

const showOverlay = () => {
  overlay.classList.remove("hidden");
};

const clickOverlay = () => {
  HideOverlay();
  closeMobileMenu();
  clearSearchResult();
  closeShopCartCard();
  closeUserPanel();
};

const searchResultHandler = () => {
  let userInput = searchInput.querySelector("input").value;
  if (userInput) {
    desktopSearchResult.classList.remove("hidden");
    searchInput.classList.add("z-20");
    showOverlay();
  } else {
    desktopSearchResult.classList.add("hidden");
    searchInput.classList.remove("z-20");
    HideOverlay();
  }
};

const clearSearchResult = () => {
  searchInput.querySelector("input").value = "";
  desktopSearchResult.classList.add("hidden");
};

firstTierSubMenuItems.forEach((item) => {
  item.addEventListener("click", () => {
    item.querySelector(".toggleIcon").classList.toggle("rotate-180");
    item.nextElementSibling.classList.contains("firstTierSubmenu")
      ? item.nextElementSibling.classList.toggle("hidden")
      : null;
  });
});

secondTierSubMenuItems.forEach((item) => {
  item.addEventListener("click", () => {
    console.log(item);
    item.querySelector(".toggleIcon").classList.toggle("rotate-180");
    item.nextElementSibling.classList.contains("SecondTier_submenu")
      ? item.nextElementSibling.classList.toggle("hidden")
      : null;
  });
});

const shopcartBtnHandler = () => {
  shopcartCard.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
  shopcartBtn.classList.toggle("z-20");
};

const closeShopCartCard = () => {
  shopcartBtn.classList.remove("z-20");
  shopcartCard.classList.add("hidden");
};

const userPanelHandler = () => {
  userPanel.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
  userPanelBtn.classList.toggle("z-20");
};

const closeUserPanel = () => {
  userPanelBtn.classList.remove("z-20");
  userPanel.classList.add("hidden");
};

mobileMenuCloseBtn.addEventListener("click", closeMobileMenu);
mobileMenuBtn.addEventListener("click", showMobileMenu);
overlay.addEventListener("click", clickOverlay);
searchInput.addEventListener("keyup", searchResultHandler);
shopcartBtn.addEventListener("click", shopcartBtnHandler);
userPanelBtn.addEventListener("click", userPanelHandler);
