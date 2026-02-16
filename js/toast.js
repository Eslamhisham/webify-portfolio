/* =========================================================
   Toast Notification Module
   This module handles floating success/error messages
   ========================================================= */

// Exported function to initialize toast
export function initToast() {

  // Create toast container dynamically
  const toast = document.createElement("div");
  toast.className = "toast";

  // Icon container (success / error icon)
  const icon = document.createElement("span");
  icon.className = "toast-icon";

  // Message container
  const message = document.createElement("span");
  message.className = "toast-message";

  // Append icon and message inside toast
  toast.appendChild(icon);
  toast.appendChild(message);

  // Append toast to body
  document.body.appendChild(toast);

  /**
   * Show toast function
   * @param {string} text - Message text
   * @param {string} type - success | error
   */
  function showToast(text, type = "success") {

    // Set message text
    message.textContent = text;

    // Reset previous classes
    toast.classList.remove("success", "error", "show");

    // Set icon based on type
    icon.textContent = type === "success" ? "✅" : "❌";

    // Add type class
    toast.classList.add(type);

    // Small delay to trigger animation
    setTimeout(() => {
      toast.classList.add("show");
    }, 10);

    // Auto hide after 5 seconds
    setTimeout(() => {
      toast.classList.remove("show");
    }, 5000);
  }

  // Return function so other modules can use it
  return showToast;
}
