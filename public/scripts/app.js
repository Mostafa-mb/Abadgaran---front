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
const mobileSearchBtn = document.querySelector("#mobileSearch_btn");
const mobileSearch = document.querySelector("#mobileSearch");
const searchTextMobile = document.querySelector("#searchTextMobile");
const closeMobileSearchBtn = document.querySelector("#closeMobileSearch");
const mobileSearchMagnifier = document.querySelector("#mobileSearch-magnifier");
const mobileSearchCross = document.querySelector("#mobileSearch-cross");
const mobileSearchPopulerItems = document.querySelector(
  "#mobileSearch-populerItems",
);
const mobileSearchSearchResults = document.querySelector(
  "#mobileSearch-searchResults",
);
const searchResultLoading = document.querySelector("#searchResult__loading");

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

const showMobileSearch = () => {
  mobileSearch.classList.remove("hidden");
};

const closeMobileSearch = () => {
  resetMobileSearch();
  mobileSearch.classList.add("hidden");
};

const clearSearchMobileInput = () => {
  searchTextMobile.value = "";
  mobileSearchMagnifier.classList.remove("hidden");
  mobileSearchCross.classList.add("hidden");
  mobileSearchPopulerItems.classList.remove("hidden")
  mobileSearchSearchResults.classList.add("hidden")
};

const searchResultMobileHandler = () => {
  const valueInserted = searchTextMobile.value.trim();
  console.log(valueInserted);
  if (valueInserted) {
    mobileSearchSearchResults.classList.add("hidden");
    mobileSearchMagnifier.classList.add("hidden");
    mobileSearchCross.classList.remove("hidden");
    mobileSearchPopulerItems.classList.add("hidden");
    searchResultLoading.classList.remove("hidden");
    setTimeout(() => {
      mobileSearchSearchResults.classList.remove("hidden");
      searchResultLoading.classList.add("hidden");
    }, 1000);
  } else {
    mobileSearchMagnifier.classList.remove("hidden");
    mobileSearchCross.classList.add("hidden");
    mobileSearchPopulerItems.classList.remove("hidden");
    mobileSearchSearchResults.classList.add("hidden");
  }
};

const resetMobileSearch = () => {
  mobileSearchPopulerItems.classList.remove("hidden");
  clearSearchMobileInput();
};

mobileMenuCloseBtn.addEventListener("click", closeMobileMenu);
mobileMenuBtn.addEventListener("click", showMobileMenu);
overlay.addEventListener("click", clickOverlay);
searchInput.addEventListener("keyup", searchResultHandler);
shopcartBtn.addEventListener("click", shopcartBtnHandler);
userPanelBtn.addEventListener("click", userPanelHandler);
mobileSearchBtn.addEventListener("click", showMobileSearch);
searchTextMobile.addEventListener("keyup", searchResultMobileHandler);
mobileSearchCross.addEventListener("click", clearSearchMobileInput);
closeMobileSearchBtn.addEventListener("click", closeMobileSearch);
