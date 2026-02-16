// Import translation helper
import { t } from "./i18n.js";
import { initToast } from "./toast.js";
export function initForm() {
  // Initialize EmailJS
  emailjs.init("b0AOxis_RVaENAd-t");

  const form = document.getElementById("contactForm");
  if (!form) return;

  const submitBtn = document.getElementById("submitBtn");
  const formMessage = document.getElementById("formMessage");

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const messageInput = document.getElementById("message");

  /* =========================
     Error Handling
     ========================= */

  function showError(input, key) {
    const errorElement = document.getElementById(input.id + "-error");
    if (!errorElement) return;

    errorElement.textContent = t(key);
    input.classList.add("error");

    // Add shake animation
    input.classList.remove("shake"); // reset if already shaking
    void input.offsetWidth; // force reflow (important)
    input.classList.add("shake");
  }

  function clearError(input) {
    const errorElement = document.getElementById(input.id + "-error");
    if (!errorElement) return;

    errorElement.textContent = "";
    input.classList.remove("error");
  }

  // Remove error while typing
  [nameInput, emailInput, phoneInput, messageInput].forEach((input) => {
    if (!input) return;
    input.addEventListener("input", () => clearError(input));

    // Remove shake class after animation ends
    input.addEventListener("animationend", () => {
      input.classList.remove("shake");
    });
  });

  /* =========================
     Form Submit
     ========================= */

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    // Initialize toast and get showToast function
    const showToast = initToast();
    // Honeypot Anti-spam
    if (form.website && form.website.value !== "") return;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.replace(/\s/g, "").trim();
    const message = messageInput.value.trim();

    /* ===== Validation ===== */

    if (name.length < 2) {
      showError(nameInput, "validation.nameShort");
      return;
    }

    if (!email.includes("@")) {
      showError(emailInput, "validation.emailInvalid");
      return;
    }

    if (!/^(\+20|0)1\d{9}$/.test(phone)) {
      showError(phoneInput, "validation.phoneInvalid");
      return;
    }

    if (message.length < 10) {
      showError(messageInput, "validation.messageShort");
      return;
    }

    /* ===== Sending Email ===== */

    submitBtn.disabled = true;
    submitBtn.textContent = t("contact.sending");

    emailjs
      .sendForm("service_t6ey5uk", "template_7y3crfk", form)
      .then(() => {
        showToast(t("validation.success"), "success");
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = t("contact.send");
      })
      .catch((error) => {
        showToast(t("validation.error"), "error");
        submitBtn.disabled = false;
        submitBtn.textContent = t("contact.send");

        console.error(error);
      });
  });
}
