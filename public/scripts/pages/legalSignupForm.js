import { initCustomSelects } from "../components/Custom_select/custom-select.js";
import { locationsData } from "../data/iran-location.js";
import { showToast } from "../components/Toast/toast.js";
import { openModal } from "../components/Modal/modal.js";
import { initPasswordToggles } from "../components/password_Toggle/password-toggle.js";
import {
  initPageLoader,
  showLoader,
  hideLoader,
} from "../components/Loader/loader.js";

initPageLoader();
initCustomSelects();
initPasswordToggles();

// ۲. انتخاب المان‌های کلیدی صفحه
const firstForm = document.getElementById("firstForm");
const secondForm = document.getElementById("secondForm");
const formSubtitle = document.getElementById("formSubtitle");
const backStepBtn = document.getElementById("backStepBtn");
const submitBtn = document.querySelector('button[type="submit"]');

const provinceSelect = document.querySelector('[data-name="province"]');
const provinceList = provinceSelect?.querySelector("ul");
const provinceInput = provinceSelect?.querySelector(".select-hidden-input");
const citySelect = document.querySelector('[data-name="city"]');
const cityList = citySelect?.querySelector("ul");

let currentStep = 1;

// ۳. مقداردهی اولیه استان‌ها و وابستگی شهرستان‌ها
if (provinceList) {
  provinceList.innerHTML = locationsData
    .map(
      (item) =>
        `<li class="py-2.5 px-4 hover:bg-slate-300 cursor-pointer select-option" data-value="${item.id}">${item.name}</li>`,
    )
    .join("");
}

if (provinceInput && citySelect && cityList) {
  provinceInput.addEventListener("change", () => {
    const selectedProvince = locationsData.find(
      (item) => item.id === provinceInput.value,
    );
    const cities = selectedProvince ? selectedProvince.cities : [];

    const cityDisplay = citySelect.querySelector(".select-display");
    cityDisplay.value = "";
    cityDisplay.placeholder = "شهرستان خود را انتخاب کنید";
    citySelect.querySelector(".select-hidden-input").value = "";

    cityList.innerHTML = cities
      .map(
        (city) =>
          `<li class="py-2.5 px-4 hover:bg-slate-300 cursor-pointer select-option" data-value="${city}">${city}</li>`,
      )
      .join("");

    citySelect.classList.toggle("opacity-60", cities.length === 0);
    citySelect.classList.toggle("pointer-events-none", cities.length === 0);
  });
}

// ۴. تابع انتقال بین مراحل با انیمیشن (Transition)
function goToStep(step) {
  const outgoingForm = step === 2 ? firstForm : secondForm;
  const incomingForm = step === 2 ? secondForm : firstForm;

  // محو کردن فرم فعلی
  outgoingForm.classList.remove("opacity-100", "translate-y-0");
  outgoingForm.classList.add("opacity-0", "translate-y-2");

  setTimeout(() => {
    outgoingForm.classList.add("hidden");
    incomingForm.classList.remove("hidden");

    // آپدیت زیرعنوان هدر و متن دکمه اصلی
    formSubtitle.textContent = incomingForm.dataset.subtitle;
    submitBtn.textContent = step === 2 ? "ثبت نهایی" : "ادامه";
    currentStep = step;

    // ظاهر کردن فرم جدید در فریم بعدی برای اجرای ترنزیشن
    requestAnimationFrame(() => {
      incomingForm.classList.remove("opacity-0", "translate-y-2");
      incomingForm.classList.add("opacity-100", "translate-y-0");
    });
  }, 250);
}

// ۵. اعتبارسنجی مرحله اول (اطلاعات هویتی)
function validateFirstStep() {
  const companyName = firstForm
    .querySelector('[name="companyName"]')
    ?.value.trim();
  const nationalId = firstForm
    .querySelector('[name="nationalId"]')
    ?.value.trim();
  const economicCode = firstForm
    .querySelector('[name="economicCode"]')
    ?.value.trim();
  const establishYear = firstForm
    .querySelector('[name="establishYear"]')
    ?.value.trim();
  const phone = firstForm.querySelector('[name="phone"]')?.value.trim();

  if (!companyName) {
    showToast("لطفاً نام شرکت را وارد کنید.", "error");
    return false;
  }
  if (!nationalId || nationalId.length !== 11 || isNaN(nationalId)) {
    showToast("شناسه ملی شرکت باید ۱۱ رقم عددی باشد.", "error");
    return false;
  }
  if (!economicCode || isNaN(economicCode)) {
    showToast("لطفاً کد اقتصادی معتبر (عددی) وارد کنید.", "error");
    return false;
  }
  if (!establishYear || establishYear.length !== 4 || isNaN(establishYear)) {
    showToast(
      "لطفاً سال تاسیس را به صورت ۴ رقمی (مثلاً ۱۴۰۲) وارد کنید.",
      "error",
    );
    return false;
  }
  if (!phone || !/^0\d{10}$/.test(phone)) {
    showToast("شماره تلفن ثابت باید ۱۱ رقم و با ۰ شروع شود.", "error");
    return false;
  }

  return true;
}

// ۶. اعتبارسنجی مرحله دوم (موقعیت مکانی و رمز عبور)
function validateSecondStep() {
  const province = secondForm.querySelector('[name="province"]')?.value;
  const city = secondForm.querySelector('[name="city"]')?.value;
  const address = secondForm.querySelector('[name="address"]')?.value.trim();
  const password = secondForm.querySelector('[name="password"]')?.value;
  const confirmPassword = secondForm.querySelector(
    '[name="confirmPassword"]',
  )?.value;

  if (!province) {
    showToast("لطفاً استان خود را انتخاب کنید.", "error");
    return false;
  }
  if (!city) {
    showToast("لطفاً شهرستان خود را انتخاب کنید.", "error");
    return false;
  }
  if (!address || address.length < 10) {
    showToast("لطفاً آدرس کامل و دقیق را وارد کنید.", "error");
    return false;
  }
  if (!password || password.length < 8) {
    showToast("رمز عبور باید حداقل ۸ کاراکتر باشد.", "error");
    return false;
  }
  if (password !== confirmPassword) {
    showToast("رمز عبور و تکرار آن یکسان نیستند.", "error");
    return false;
  }

  return true;
}

// ۷. مدیریت کلیک دکمه ادامه / ثبت نهایی
submitBtn?.addEventListener("click", (e) => {
  e.preventDefault();

  if (currentStep === 1) {
    if (validateFirstStep()) {
      goToStep(2);
    }
    return;
  }

  if (currentStep === 2 && validateSecondStep()) {
    const companyName = firstForm
      .querySelector('[name="companyName"]')
      .value.trim();
    const provinceName = provinceSelect.querySelector(".select-display").value;
    const cityName = citySelect.querySelector(".select-display").value;

    openModal({
      title: "تایید نهایی اطلاعات ثبت‌نام",
      size: "sm",
      content: `
        <div class="space-y-3 text-sm">
          <p>آیا از صحت اطلاعات وارد شده برای ثبت‌نام حقوقی اطمینان دارید؟</p>
          <div class="p-3 bg-slate-100 rounded-xl space-y-1.5 text-gray-800">
            <div><span class="text-gray-500">نام شرکت:</span> <strong>${companyName}</strong></div>
            <div><span class="text-gray-500">موقعیت:</span> <strong>${provinceName}، ${cityName}</strong></div>
          </div>
        </div>
      `,
      buttons: [
        {
          text: "بازبینی اطلاعات",
          variant: "secondary",
        },
        {
          text: "تایید و تکمیل ثبت‌نام",
          variant: "primary",
          onClick: () => {
            showToast("ثبت‌نام حقوقی شما با موفقیت انجام شد.", "success");
            // در فاز Angular یا اتصال به API، اینجا اطلاعات به سرور ارسال می‌شود
          },
        },
      ],
    });
  }
});

// ۸. مدیریت دکمه فلش بازگشت در هدر
backStepBtn?.addEventListener("click", (e) => {
  if (currentStep === 2) {
    e.preventDefault();
    goToStep(1);
  }
});
