export function initCustomSelects() {
  // جلوگیری از ثبت چندباره ایونت‌ها در صورت فراخوانی مجدد
  if (document.body.dataset.selectInitialized) return;
  document.body.dataset.selectInitialized = "true";

  const closeAll = () => {
    document.querySelectorAll(".custom-select.is-open").forEach((select) => {
      select.classList.remove("is-open", "z-40");
      select
        .querySelector(".select-dropdown")
        .classList.add("invisible", "opacity-0", "pointer-events-none");
    });
  };

  // باز و بسته کردن منو
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest(".select-trigger");
    const currentSelect = e.target.closest(".custom-select");

    if (!currentSelect) return closeAll();

    if (trigger) {
      const isOpen = currentSelect.classList.contains("is-open");
      closeAll();
      if (!isOpen) {
        currentSelect.classList.add("is-open", "z-40");
        currentSelect
          .querySelector(".select-dropdown")
          .classList.remove("invisible", "opacity-0", "pointer-events-none");
        // currentSelect.querySelector(".select-search")?.focus();
        if (!isOpen) {
          currentSelect.classList.add("is-open", "z-40");
          currentSelect
            .querySelector(".select-dropdown")
            .classList.remove("invisible", "opacity-0", "pointer-events-none");

          // ریست کردن سرچ‌باکس و نمایش مجدد تمام گزینه‌ها هنگام باز شدن
          const searchInput = currentSelect.querySelector(".select-search");
          if (searchInput) {
            searchInput.value = "";
            currentSelect
              .querySelectorAll(".select-option")
              .forEach((opt) => opt.classList.remove("hidden"));
            searchInput.focus();
          }
        }
      }
    }
  });

  // انتخاب گزینه
  document.addEventListener("click", (e) => {
    const option = e.target.closest(".select-option");
    if (!option) return;

    const select = option.closest(".custom-select");
    select.querySelector(".select-display").value = option.textContent.trim();

    const hiddenInput = select.querySelector(".select-hidden-input");
    if (hiddenInput) {
      hiddenInput.value = option.dataset.value || option.textContent.trim();
      hiddenInput.dispatchEvent(new Event("change"));
    }

    closeAll();
  });

  // سرچ در گزینه‌ها
  document.addEventListener("input", (e) => {
    if (!e.target.classList.contains("select-search")) return;

    const query = e.target.value.trim();
    const options = e.target
      .closest(".custom-select")
      .querySelectorAll(".select-option");

    options.forEach((opt) => {
      opt.classList.toggle("hidden", !opt.textContent.includes(query));
    });
  });
}
