const form = document.getElementById("contactForm");
const ok = document.getElementById("formOk");

function setError(id, text) {
  document.getElementById(id + "Err").textContent = text;
  document.getElementById(id).classList.toggle("bad-field", text !== "");
  return text === "";
}

function validate() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const digitsOnly = /^[0-9]+$/;

  let valid = true;
  valid = setError("name", name === "" ? "Enter your name." : "") && valid;
  if (email === "") valid = setError("email", "Enter your email address.") && valid;
  else valid = setError("email", emailPattern.test(email) ? "" : "Enter a valid email like name@example.com.") && valid;
  if (phone === "") valid = setError("phone", "Enter your phone number.") && valid;
  else valid = setError("phone", digitsOnly.test(phone) ? "" : "Use digits only, with no spaces, + or dashes.") && valid;
  valid = setError("message", message === "" ? "Write a message." : "") && valid;
  return valid;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  ok.textContent = "";
  if (validate()) {
    ok.textContent = "Message sent. Thank you, I will reply soon.";
    form.reset();
  }
});
