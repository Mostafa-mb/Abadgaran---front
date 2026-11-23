/**
 * نمایش لودر تمام‌صفحه (مناسب برای زمان ارسال فرم یا دریافت دیتا از سرور)
 * @param {string} [text="در حال بارگذاری..."] - متن زیر اسپینر
 */
export function showLoader(text = "در حال بارگذاری...") {
  let loader = document.getElementById("page-loader");

  // اگر در صفحه وجود نداشت، به صورت داینامیک بساز
  if (!loader) {
    loader = document.createElement("div");
    loader.id = "page-loader";
    loader.className =
      "fixed inset-0 z-[60] flex flex-col items-center justify-center gap-4 bg-white/90 backdrop-blur-sm transition-opacity duration-300 opacity-0";
    loader.innerHTML = `
      <div class="w-12 h-12 rounded-full border-4 border-gray-200 border-t-AbaPrimary animate-spin"></div>
      <span class="text-sm font-medium text-gray-600 animate-pulse loader-text">${text}</span>
    `;
    document.body.appendChild(loader);
  } else {
    const textEl =
      loader.querySelector(".loader-text") || loader.querySelector("span");
    if (textEl) textEl.textContent = text;
    loader.classList.remove("hidden");
  }

  requestAnimationFrame(() => {
    loader.classList.remove("opacity-0", "pointer-events-none");
  });
}

/**
 * مخفی کردن لودر تمام‌صفحه با انیمیشن نرم
 */
export function hideLoader() {
  const loader = document.getElementById("page-loader");
  if (!loader) return;

  loader.classList.add("opacity-0", "pointer-events-none");
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 300);
}

/**
 * اتصال خودکار به رویداد load صفحه
 */
export function initPageLoader() {
  // اگر صفحه همین الان کامل لود شده بود، بلافاصله ببند
  if (document.readyState === "complete") {
    hideLoader();
  } else {
    window.addEventListener("load", hideLoader);
  }
}
