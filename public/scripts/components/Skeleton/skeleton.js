// قالب‌های پیش‌فرض اسکلتون برای استفاده سریع
const SKELETON_TEMPLATES = {
  // ۱. اسکلتون مناسب برای فرم‌ها
  form: (rows = 3) => `
    <div class="space-y-4 animate-pulse">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        ${Array(rows)
          .fill(
            `<div class="space-y-2">
              <div class="h-4 w-24 bg-gray-200 rounded"></div>
              <div class="h-12 w-full bg-gray-200 rounded-md"></div>
            </div>`,
          )
          .join("")}
      </div>
      <div class="h-12 w-full bg-gray-300 rounded-xl mt-4"></div>
    </div>
  `,

  // ۲. اسکلتون مناسب برای کارت‌های صفحه اصلی (Index)
  card: (count = 3) => `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
      ${Array(count)
        .fill(
          `<div class="bg-white p-4 rounded-2xl border border-gray-100 space-y-3">
            <div class="h-40 w-full bg-gray-200 rounded-xl"></div>
            <div class="h-5 w-3/4 bg-gray-200 rounded"></div>
            <div class="h-4 w-1/2 bg-gray-200 rounded"></div>
            <div class="h-10 w-full bg-gray-200 rounded-lg mt-2"></div>
          </div>`,
        )
        .join("")}
    </div>
  `,

  // ۳. اسکلتون مناسب برای لیست یا ردیف‌های متنی
  list: (rows = 4) => `
    <div class="space-y-3 animate-pulse">
      ${Array(rows)
        .fill(
          `<div class="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100">
            <div class="w-10 h-10 rounded-full bg-gray-200 shrink-0"></div>
            <div class="flex-1 space-y-2">
              <div class="h-4 w-1/3 bg-gray-200 rounded"></div>
              <div class="h-3 w-2/3 bg-gray-200 rounded"></div>
            </div>
          </div>`,
        )
        .join("")}
    </div>
  `,
};

/**
 * فعال‌سازی حالت اسکلتون روی یک کانتینر مشخص
 * @param {string} targetId - آیدی کانتینری که محتوای اصلی داخل آن است
 * @param {"form"|"card"|"list"|"custom"} [type="form"] - نوع اسکلتون (اگر custom باشد از HTML داخلی استفاده می‌کند)
 * @param {number} [count=3] - تعداد آیتم‌های تکراری در قالب‌های آماده
 */
export function showSkeleton(targetId, type = "form", count = 3) {
  const target = document.getElementById(targetId);
  if (!target) return;

  // اگر اسکلتون سفارشی در HTML از قبل وجود دارد (مثلاً در صفحه Index)
  const existingCustomSkeleton = document.querySelector(
    `[data-skeleton-for="${targetId}"]`,
  );
  if (existingCustomSkeleton) {
    target.classList.add("hidden");
    existingCustomSkeleton.classList.remove("hidden");
    return;
  }

  // ساخت اسکلتون داینامیک بر اساس قالب انتخابی
  let skeletonWrapper = document.getElementById(`skeleton-${targetId}`);
  if (!skeletonWrapper) {
    skeletonWrapper = document.createElement("div");
    skeletonWrapper.id = `skeleton-${targetId}`;
    const templateFn = SKELETON_TEMPLATES[type] || SKELETON_TEMPLATES.form;
    skeletonWrapper.innerHTML = templateFn(count);
    target.parentNode.insertBefore(skeletonWrapper, target);
  }

  target.classList.add("hidden");
  skeletonWrapper.classList.remove("hidden");
}

/**
 * مخفی کردن اسکلتون و نمایش محتوای واقعی با انیمیشن نرم
 * @param {string} targetId - آیدی کانتینر محتوای اصلی
 */
export function hideSkeleton(targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const customSkeleton = document.querySelector(
    `[data-skeleton-for="${targetId}"]`,
  );
  const dynamicSkeleton = document.getElementById(`skeleton-${targetId}`);

  if (customSkeleton) customSkeleton.classList.add("hidden");
  if (dynamicSkeleton) dynamicSkeleton.classList.add("hidden");

  // نمایش محتوای واقعی با افکت Fade-in
  target.classList.remove("hidden");
  target.classList.add("transition-opacity", "duration-300", "opacity-0");
  requestAnimationFrame(() => {
    target.classList.remove("opacity-0");
  });
}
