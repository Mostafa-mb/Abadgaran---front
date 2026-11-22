import { initCustomSelects } from "../components/Custom_select/custom-select.js";
import { locationsData } from "../data/iran-location.js";
import { showToast } from "../components/Toast/toast.js";
import { openModal } from "../components/Modal/modal.js";
import { initPasswordToggles } from "../components/password_Toggle/password-toggle.js";

// ۱. فعال‌سازی رفتار باز و بسته شدن و سرچ تمام سلکت‌باکس‌ها
initCustomSelects();
initPasswordToggles();

// ۲. گرفتن المان‌های استان و شهرستان
const provinceSelect = document.querySelector('[data-name="province"]');
const provinceList = provinceSelect?.querySelector("ul");
const provinceInput = provinceSelect?.querySelector(".select-hidden-input");
const citySelect = document.querySelector('[data-name="city"]');
const cityList = citySelect?.querySelector("ul");
const firstForm = document.querySelector("#firstForm");
const secondForm = document.querySelector("#secondForm");

// ۳. پر کردن لیست استان‌ها به محض باز شدن صفحه
if (provinceList) {
  provinceList.innerHTML = locationsData
    .map(
      (item) =>
        `<li class="py-2.5 px-4 hover:bg-slate-300 cursor-pointer select-option" data-value="${item.id}">${item.name}</li>`,
    )
    .join("");
}

// ۴. پر کردن لیست شهرستان‌ها و فعال‌سازی باکس پس از انتخاب استان
if (provinceInput && citySelect && cityList) {
  provinceInput.addEventListener("change", () => {
    const selectedProvince = locationsData.find(
      (item) => item.id === provinceInput.value,
    );
    const cities = selectedProvince ? selectedProvince.cities : [];

    // ریست کردن مقدار قبلی شهرستان
    const cityDisplay = citySelect.querySelector(".select-display");
    cityDisplay.value = "";
    cityDisplay.placeholder = "شهرستان خود را انتخاب کنید";
    citySelect.querySelector(".select-hidden-input").value = "";

    // ساخت آیتم‌های شهرستان
    cityList.innerHTML = cities
      .map(
        (city) =>
          `<li class="py-2.5 px-4 hover:bg-slate-300 cursor-pointer select-option" data-value="${city}">${city}</li>`,
      )
      .join("");

    // رفع قفل و فعال‌سازی سلکت‌باکس شهرستان
    if (cities.length > 0) {
      citySelect.classList.remove("opacity-60", "pointer-events-none");
    } else {
      citySelect.classList.add("opacity-60", "pointer-events-none");
    }
  });
}

// ۵. بررسی فرم و نمایش مودال تایید هنگام کلیک روی دکمه ادامه
const submitBtn = document.querySelector('button[type="submit"]');

submitBtn?.addEventListener("click", (e) => {
  e.preventDefault();

  const provinceName = provinceSelect?.querySelector(".select-display")?.value;
  const cityName = citySelect?.querySelector(".select-display")?.value;

  // if (!provinceName) {
  //   showToast("لطفاً ابتدا استان خود را انتخاب کنید.", "error");
  //   return;
  // }

  // if (!cityName) {
  //   showToast("لطفاً شهرستان خود را انتخاب کنید.", "warning");
  //   return;
  // }

  const currentActiveForm = document.querySelector(".active");
  if (currentActiveForm.nextElementSibling) {
    currentActiveForm.classList.remove("active");
    currentActiveForm.nextElementSibling.classList.add("active");
  }

  // // باز کردن مودال داینامیک برای تایید نهایی کاربر
  // openModal({
  //   title: "تایید موقعیت مکانی",
  //   size: "sm",
  //   content: `
  //     <div class="space-y-2">
  //       <p>شما موقعیت مکانی زیر را برای شرکت انتخاب کرده‌اید:</p>
  //       <div class="p-3 bg-slate-100 rounded-xl text-sm font-bold text-gray-800">
  //         استان: <span class="text-sky-700">${provinceName}</span> — شهرستان: <span class="text-sky-700">${cityName}</span>
  //       </div>
  //       <p class="text-xs text-gray-500 pt-1">آیا از ثبت این اطلاعات و ادامه مراحل اطمینان دارید؟</p>
  //     </div>
  //   `,
  //   buttons: [
  //     {
  //       text: "ویرایش",
  //       variant: "secondary",
  //     },
  //     {
  //       text: "تایید و ادامه",
  //       variant: "primary",
  //       onClick: () => {
  //         showToast("اطلاعات موقعیت مکانی با موفقیت ثبت شد.", "success");
  //       },
  //     },
  //   ],
  // });
});
