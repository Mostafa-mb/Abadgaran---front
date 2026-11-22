const MODAL_SIZES = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

/**
 * باز کردن مودال داینامیک
 * @param {Object} options
 * @param {string} [options.title] - عنوان هدر (اختیاری)
 * @param {string} options.content - محتوای متنی یا HTML بدنه
 * @param {"sm"|"md"|"lg"|"xl"} [options.size="md"] - عرض مودال
 * @param {boolean} [options.closeOnBackdrop=true] - بسته شدن با کلیک بیرون مودال
 * @param {Array<{text: string, variant?: "primary"|"danger"|"secondary", onClick?: Function, closeOnClick?: boolean}>} [options.buttons=[]]
 */
export function openModal({
  title = "",
  content = "",
  size = "md",
  closeOnBackdrop = true,
  buttons = [],
}) {
  // اگر مودالی از قبل باز است، اول ببند
  closeModal();

  const sizeClass = MODAL_SIZES[size] || MODAL_SIZES.md;

  // ۱. ساخت لایه پس‌زمینه (Backdrop)
  const backdrop = document.createElement("div");
  backdrop.id = "app-dynamic-modal";
  backdrop.className =
    "fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs opacity-0 transition-opacity duration-200";

  // ۲. ساختار داخلی مودال (هدر + بدنه + فوتر)
  backdrop.innerHTML = `
    <div class="bg-white w-full ${sizeClass} rounded-2xl shadow-2xl overflow-hidden transform scale-95 transition-transform duration-200 flex flex-col max-h-[90vh] modal-box">
      
      <!-- هدر (فقط اگر title ارسال شده باشد نمایش داده می‌شود) -->
      ${
        title
          ? `<div class="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <h3 class="text-lg font-titleBold font-bold text-gray-800">${title}</h3>
              <button type="button" class="text-gray-400 hover:text-gray-700 transition-colors cursor-pointer p-1 modal-close-btn">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>`
          : ""
      }

      <!-- بدنه محتوا (اسکرول‌پذیر در صورت طولانی بودن) -->
      <div class="p-5 overflow-y-auto text-sm md:text-base text-gray-700 leading-7 modal-body">
        ${content}
      </div>

      <!-- فوتر (فقط اگر دکمه‌ای تعریف شده باشد ساخته می‌شود) -->
      ${
        buttons.length > 0
          ? `<div class="flex items-center justify-end gap-3 px-5 py-3.5 bg-gray-50 border-t border-gray-200 modal-footer"></div>`
          : ""
      }
    </div>
  `;

  // ۳. ساخت داینامیک دکمه‌های فوتر و اتصال رویداد کلیک هر دکمه
  const footer = backdrop.querySelector(".modal-footer");
  if (footer) {
    const btnStyles = {
      primary: "bg-AbaPrimary text-black font-bold hover:brightness-95",
      danger: "bg-rose-600 text-white hover:bg-rose-700",
      secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
    };

    buttons.forEach((btn) => {
      const buttonEl = document.createElement("button");
      buttonEl.type = "button";
      const style = btnStyles[btn.variant || "secondary"];
      buttonEl.className = `px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${style}`;
      buttonEl.textContent = btn.text;

      buttonEl.addEventListener("click", () => {
        if (btn.onClick) btn.onClick();
        if (btn.closeOnClick !== false) closeModal();
      });

      footer.appendChild(buttonEl);
    });
  }

  document.body.appendChild(backdrop);
  document.body.classList.add("overflow-hidden"); // قفل کردن اسکرول صفحه پشت مودال

  // اجرای انیمیشن ورود
  requestAnimationFrame(() => {
    backdrop.classList.remove("opacity-0");
    backdrop.querySelector(".modal-box").classList.remove("scale-95");
  });

  // ۴. رویدادهای بستن مودال
  backdrop.querySelector(".modal-close-btn")?.addEventListener("click", closeModal);

  if (closeOnBackdrop) {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeModal();
    });
  }
}

export function closeModal() {
  const modal = document.getElementById("app-dynamic-modal");
  if (!modal) return;

  modal.classList.add("opacity-0");
  modal.querySelector(".modal-box")?.classList.add("scale-95");
  document.body.classList.remove("overflow-hidden");

  setTimeout(() => modal.remove(), 200);
}

// بستن مودال با کلید Escape کیبورد
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});