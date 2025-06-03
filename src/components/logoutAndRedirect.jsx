// utils/logoutAndRedirect.js
export function logoutAndRedirect() {
  localStorage.removeItem("user");
  window.location.href = "/login"; // Hard redirect to login
}
