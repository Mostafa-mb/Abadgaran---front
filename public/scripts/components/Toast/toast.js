// تنظیمات ظاهر و آیکون هر نوع پیام
const TOAST_TYPES = {
  success: {
    border: "border-emerald-500",
    iconColor: "text-emerald-500",
    icon: "fa-circle-check",
  },
  error: {
    border: "border-rose-500",
    iconColor: "text-rose-500",
    icon: "fa-circle-xmark",
  },
  warning: {
    border: "border-amber-500",
    iconColor: "text-amber-500",
    icon: "fa-triangle-exclamation",
  },
  info: {
    border: "border-sky-500",
    iconColor: "text-sky-500",
    icon: "fa-circle-info",
  },
};

// ساخت خودکار کانتینر توستر در صفحه (فقط یک بار)
function getToastContainer() {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className =
      "fixed top-5 left-4 right-4 md:right-auto md:left-5 md:w-96 z-50 flex flex-col gap-3 pointer-events-none";
    document.body.appendChild(container);
  }
  return container;
}

/**
 * نمایش پیام توستر
 * @param {string} message - متن پیام
 * @param {"success" | "error" | "warning" | "info"} type - نوع پیام
 * @param {number} duration - مدت زمان نمایش به میلی‌ثانیه (پیش‌فرض ۴ ثانیه)
 */
export function showToast(message, type = "info", duration = 4000) {
  const container = getToastContainer();
  const config = TOAST_TYPES[type] || TOAST_TYPES.info;

  // ساخت بدنه توست
  const toast = document.createElement("div");
  toast.className = `pointer-events-auto flex items-center justify-between gap-3 bg-white text-gray-800 px-4 py-4 rounded-xl shadow-2xl border-r-4 ${config.border} transition-all duration-300 opacity-0 -translate-x-5`;

  toast.innerHTML = `
    <div class="flex items-center gap-3">
      <i class="fa-solid ${config.icon} ${config.iconColor} text-lg"></i>
      <span class="text-sm font-medium leading-6">${message}</span>
    </div>
    <button type="button" class="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer close-toast">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `;

  container.appendChild(toast);

  // اجرای انیمیشن ورود در فریم بعدی مرورگر
  requestAnimationFrame(() => {
    toast.classList.remove("opacity-0", "-translate-x-5");
  });

  // تابع حذف توست با انیمیشن خروج
  const removeToast = () => {
    toast.classList.add("opacity-0", "-translate-x-5");
    setTimeout(() => toast.remove(), 300);
  };

  // بستن دستی با کلیک روی ضربدر
  toast.querySelector(".close-toast").addEventListener("click", removeToast);

  // بستن خودکار بعد از زمان مشخص
  if (duration > 0) {
    setTimeout(removeToast, duration);
  }
}