// ۱. داده‌های نمونه (در فاز بعد این بخش از سرویس Angular خوانده می‌شود)
const locationsData = {
  tehran: {
    name: "تهران",
    cities: [
      { id: "101", name: "تهران" },
      { id: "102", name: "شهریار" },
      { id: "103", name: "اسلامشهر" },
      { id: "104", name: "رباط‌کریم" },
      { id: "105", name: "ورامین" },
    ],
  },
  isfahan: {
    name: "اصفهان",
    cities: [
      { id: "201", name: "اصفهان" },
      { id: "202", name: "کاشان" },
      { id: "203", name: "خمینی‌شهر" },
      { id: "204", name: "نجف‌آباد" },
    ],
  },
  razavi: {
    name: "خراسان رضوی",
    cities: [
      { id: "301", name: "مشهد" },
      { id: "302", name: "نیشابور" },
      { id: "303", name: "سبزوار" },
      { id: "304", name: "تربت حیدریه" },
    ],
  },
};

// تابع کمکی برای یکسان‌سازی حروف عربی و فارسی در جستجو
const normalizePersian = (str) => {
  return str
    .trim()
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .toLowerCase();
};

document.addEventListener("DOMContentLoaded", () => {
  const selectInstances = {};

  const closeAllSelects = (exceptName = null) => {
    Object.entries(selectInstances).forEach(([name, instance]) => {
      if (name !== exceptName) {
        instance.close();
      }
    });
  };

  // ۲. راه‌اندازی تمام سلکت‌باکس‌های صفحه
  document.querySelectorAll(".custom-select").forEach((container) => {
    const name = container.dataset.name;
    const trigger = container.querySelector(".select-trigger");
    const dropdown = container.querySelector(".select-dropdown");
    const displayInput = container.querySelector(".select-display");
    const hiddenInput = container.querySelector(".select-hidden-input");
    const searchInput = container.querySelector(".select-search");
    const optionsList = container.querySelector(".select-options-list");
    const emptyMsg = container.querySelector(".select-empty");
    const arrow = container.querySelector(".select-arrow");

    let currentOptions = [];

    // رندر کردن آیتم‌های لیست
    const renderOptions = (filterText = "") => {
      optionsList.innerHTML = "";
      const query = normalizePersian(filterText);

      const filtered = currentOptions.filter((opt) =>
        normalizePersian(opt.name).includes(query)
      );

      if (filtered.length === 0) {
        emptyMsg.classList.remove("hidden");
      } else {
        emptyMsg.classList.add("hidden");
        filtered.forEach((opt) => {
          const li = document.createElement("li");
          li.className =
            "py-2.5 px-4 text-sm hover:bg-slate-300 cursor-pointer transition-colors select-option";
          if (hiddenInput.value === String(opt.id)) {
            li.classList.add("bg-slate-300", "font-bold");
          }
          li.textContent = opt.name;
          li.dataset.value = opt.id;
          optionsList.appendChild(li);
        });
      }
    };

    const open = () => {
      closeAllSelects(name);
      container.classList.add("z-40");
      dropdown.classList.remove("invisible", "opacity-0", "pointer-events-none");
      dropdown.classList.add("pointer-events-auto");
      if (arrow) arrow.classList.add("rotate-180");

      // ریست سرچ و فوکوس خودکار روی اینپوت جستجو
      if (searchInput) {
        searchInput.value = "";
        renderOptions("");
        setTimeout(() => searchInput.focus(), 50);
      }
    };

    const close = () => {
      container.classList.remove("z-40");
      dropdown.classList.add("invisible", "opacity-0", "pointer-events-none");
      dropdown.classList.remove("pointer-events-auto");
      if (arrow) arrow.classList.remove("rotate-180");
    };

    // باز و بسته کردن با کلیک روی کادر اصلی
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = !dropdown.classList.contains("invisible");
      isOpen ? close() : open();
    });

    // جلوگیری از بسته شدن منو هنگام تایپ در سرچ‌باکس
    if (searchInput) {
      searchInput.addEventListener("click", (e) => e.stopPropagation());
      searchInput.addEventListener("input", (e) => {
        renderOptions(e.target.value);
      });
    }

    // انتخاب آیتم از لیست
    optionsList.addEventListener("click", (e) => {
      const optionEl = e.target.closest(".select-option");
      if (!optionEl) return;
      e.stopPropagation();

      displayInput.value = optionEl.textContent.trim();
      hiddenInput.value = optionEl.dataset.value;

      close();
      hiddenInput.dispatchEvent(new Event("change", { bubbles: true }));
    });

    // متدهای عمومی برای کنترل هر سلکت‌باکس از بیرون
    selectInstances[name] = {
      open,
      close,
      setOptions(newOptions) {
        currentOptions = newOptions;
        renderOptions();
      },
      reset(placeholderText = null) {
        displayInput.value = "";
        hiddenInput.value = "";
        if (placeholderText) displayInput.placeholder = placeholderText;
        renderOptions();
      },
      setDisabled(disabled) {
        if (disabled) {
          container.classList.add("opacity-60", "pointer-events-none");
        } else {
          container.classList.remove("opacity-60", "pointer-events-none");
        }
      },
    };
  });

  // بستن با کلیک بیرون
  document.addEventListener("click", () => closeAllSelects());

  // ۳. مقداردهی اولیه استان‌ها و اتصال به شهرستان‌ها
  const provinceSelect = selectInstances["province"];
  const citySelect = selectInstances["city"];

  if (provinceSelect && citySelect) {
    // پر کردن لیست استان‌ها
    const provincesList = Object.entries(locationsData).map(([key, val]) => ({
      id: key,
      name: val.name,
    }));
    provinceSelect.setOptions(provincesList);

    // گوش دادن به تغییر استان برای لود کردن شهرستان‌های همان استان
    const provinceHiddenInput = document.querySelector(
      '.custom-select[data-name="province"] .select-hidden-input'
    );

    provinceHiddenInput.addEventListener("change", (e) => {
      const selectedProvinceKey = e.target.value;
      const cities = locationsData[selectedProvinceKey]?.cities || [];

      citySelect.reset("شهرستان خود را انتخاب کنید");
      citySelect.setOptions(cities);
      citySelect.setDisabled(cities.length === 0);
    });
  }
});