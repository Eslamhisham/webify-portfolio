/* =========================
   Navbar (Mobile) toggle
   ========================= */
const burgerBtn = document.getElementById("burgerBtn");
const mobileMenu = document.getElementById("mobileMenu");

function closeMobileMenu() {
  burgerBtn.setAttribute("aria-expanded", "false");
  mobileMenu.hidden = true;
}

function toggleMobileMenu() {
  const isOpen = burgerBtn.getAttribute("aria-expanded") === "true";
  burgerBtn.setAttribute("aria-expanded", String(!isOpen));
  mobileMenu.hidden = isOpen; // لو كان مفتوح اقفله، لو مقفول افتحه
}

burgerBtn.addEventListener("click", toggleMobileMenu);

// اقفل المينو لما المستخدم يضغط على لينك من الموبايل
mobileMenu.addEventListener("click", (e) => {
  if (e.target.classList.contains("mobile-link")) {
    closeMobileMenu();
  }
});

/* =========================
   Language toggle (EN/AR)
   ========================= */
const langBtn = document.getElementById("langBtn");

async function loadLanguage(lang) {
  const response = await fetch(`i18n/${lang}.json`);
  const translations = await response.json();
  
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[key]) {
      el.textContent = translations[key];
    }
  });
    // place holder translate
   document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    el.setAttribute("placeholder", translations[key]);
  });


  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  localStorage.setItem("lang", lang);
}

const savedLang = localStorage.getItem("lang") || "en";
loadLanguage(savedLang);

langBtn.addEventListener("click", () => {
  const current = localStorage.getItem("lang") || "en";
  const next = current === "en" ? "ar" : "en";
  loadLanguage(next);
});

const themeBtn = document.getElementById("themeBtn");

function applyTheme(theme) {
  const html = document.documentElement;

  // لو theme = "auto" هنشيل الـ override ونرجع لـ prefers-color-scheme
  if (theme === "auto") {
    html.removeAttribute("data-theme");
    localStorage.removeItem("theme");
    themeBtn.textContent = "☾";
    return;
  }

  html.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  // أيقونة بسيطة
  themeBtn.textContent = theme === "dark" ? "☀" : "☾";
}

// شغّل theme المحفوظ لو موجود
const savedTheme = localStorage.getItem("theme");
if (savedTheme) applyTheme(savedTheme);

// Toggle theme button: Light <-> Dark
themeBtn.addEventListener("click", () => {
  const current = localStorage.getItem("theme");
  // لو مش محدد، اقرا الوضع الحالي من prefers-color-scheme
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const resolved = current || (prefersDark ? "dark" : "light");
  const next = resolved === "dark" ? "light" : "dark";

  applyTheme(next);
});

/* =========================
   Emailjs
   ========================= */

// EmailJS Initialization

emailjs.init("b0AOxis_RVaENAd-t"); //Public Key

const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", function (e) {
  // prevent reload
  e.preventDefault();

  // Anti-Spam check
  if (form.website.value !== "") {
    return;
  }

  // Simple Validation
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const phone = form.phone.value.replace(/\s/g, "").trim();

  if (name.length < 2) {
    formMessage.textContent = "Name is too short.";
    formMessage.style.color = "red";
    return;
  }

  if (!email.includes("@")) {
    formMessage.textContent = "Invalid email address.";
    formMessage.style.color = "red";
    return;
  }

  if (!/^(\+20|0)1\d{9}$/.test(phone)) {
    formMessage.textContent = "Please enter a valid phone number.";
    formMessage.style.color = "red";
    return;
  }

  if (message.length < 10) {
    formMessage.textContent = "Message is too short.";
    formMessage.style.color = "red";
    return;
  }

  // Disable the button while sending
  submitBtn.disabled = true;
  submitBtn.innerText = "Sending...";

  // sending data

  emailjs
    .sendForm(
      "service_t6ey5uk", // Service ID
      "template_7y3crfk", // Template ID
      form,
    )
    .then(function () {
      // successfull message
      formMessage.innerText = "✅ Message sent successfully!";
      formMessage.style.color = "green";

      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerText = "Send Message";
    })
    .catch(function (error) {
      // message failed
      formMessage.innerText = "❌ Something went wrong. Try again.";
      formMessage.style.color = "red";

      submitBtn.disabled = false;
      submitBtn.innerText = "Send Message";

      console.error(error);
    })
    // Auto reply
    // .then(() => {
    //   emailjs.send("service_t6ey5uk", "template_9vl00pe", {
    //     name: name,
    //     email: email,
    //   });
    // });
});
