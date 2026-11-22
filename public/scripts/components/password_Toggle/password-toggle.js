export function initPasswordToggles() {
  if (document.body.dataset.passwordToggleInitialized) return;
  document.body.dataset.passwordToggleInitialized = "true";

  document.addEventListener("click", (e) => {
    const toggleBtn = e.target.closest(".password-toggle-btn");
    if (!toggleBtn) return;

    const wrapper = toggleBtn.closest(".password-wrapper");
    const input = wrapper?.querySelector(".password-input");
    const icon = toggleBtn.querySelector("i");

    if (!input) return;

    const isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";

    // تغییر آیکون چشم باز و بسته
    if (icon) {
      icon.classList.toggle("fa-eye", !isPassword);
      icon.classList.toggle("fa-eye-slash", isPassword);
    }
  });
}