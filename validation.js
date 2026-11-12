
var rules = {
  fullName: { re: /^[a-zA-Z\s]{2,50}$/, msg: "Use only letters and spaces (2-50 characters)." },
  empId: { re: /^[A-Z0-9]{6,12}$/i, msg: "Must be 6-12 letters or numbers." },
  email: { re: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, msg: "Enter a valid email like name@mail.com." },
  mobile: { re: /^[6-9]\d{9}$/, msg: "Enter 10 digits starting with 6, 7, 8 or 9." },
  password: { re: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, msg: "Min 8 characters with uppercase, lowercase, number and symbol (@$!%*?&)." }
};

function showError(input, message) {
  var old = input.parentNode.querySelector(".error-msg");
  if (old) old.remove();
  input.classList.remove("valid");
  input.classList.add("invalid");
  var span = document.createElement("span");
  span.className = "error-msg";
  span.textContent = message;
  input.parentNode.insertBefore(span, input.nextSibling);
}

function showOk(input) {
  var old = input.parentNode.querySelector(".error-msg");
  if (old) old.remove();
  input.classList.remove("invalid");
  input.classList.add("valid");
}

// checks one field, returns true/false. show = display the error or not
function check(input, ruleName, show) {
  var ok = rules[ruleName].re.test(input.value);
  if (show) { ok ? showOk(input) : showError(input, rules[ruleName].msg); }
  return ok;
}

function checkMatch(pass, confirm, show) {
  var ok = confirm.value !== "" && pass.value === confirm.value;
  if (show) { ok ? showOk(confirm) : showError(confirm, "Passwords do not match."); }
  return ok;
}

/* ---------- register.html ---------- */
var regForm = document.getElementById("regForm");
if (regForm) {
  var f = {
    name: document.getElementById("fullName"), id: document.getElementById("empId"),
    email: document.getElementById("email"), mobile: document.getElementById("mobile"),
    dept: document.getElementById("dept"), pass: document.getElementById("password"),
    conf: document.getElementById("confirm")
  };
  var regBtn = document.getElementById("regBtn");

  function checkDept(show) {
    var ok = f.dept.value !== "";
    if (show) { ok ? showOk(f.dept) : showError(f.dept, "Please choose how you want to help."); }
    return ok;
  }
  function regAll(show) {
    var a = check(f.name, "fullName", show);
    var b = check(f.id, "empId", show);
    var c = check(f.email, "email", show);
    var d = check(f.mobile, "mobile", show);
    var e = checkDept(show);
    var g = check(f.pass, "password", show);
    var h = checkMatch(f.pass, f.conf, show);
    return a && b && c && d && e && g && h;
  }
  function updateBtn() { regBtn.disabled = !regAll(false); }

  f.name.addEventListener("blur", function () { check(f.name, "fullName", true); });
  f.id.addEventListener("blur", function () { check(f.id, "empId", true); });
  f.email.addEventListener("blur", function () { check(f.email, "email", true); });
  f.mobile.addEventListener("blur", function () { check(f.mobile, "mobile", true); });
  f.dept.addEventListener("blur", function () { checkDept(true); });
  f.pass.addEventListener("blur", function () { check(f.pass, "password", true); });
  f.conf.addEventListener("blur", function () { checkMatch(f.pass, f.conf, true); });
  regForm.addEventListener("input", updateBtn);
  regForm.addEventListener("change", updateBtn);

  regForm.addEventListener("submit", function (ev) {
    ev.preventDefault();
    if (regAll(true)) {
      document.getElementById("regMsg").textContent = "Thank you " + f.name.value.trim() + "! We got your request to: " + f.dept.value + ". Our team will contact you soon.";
    }
  });
}

/* ---------- signup.html ---------- */
var suForm = document.getElementById("signupForm");
if (suForm) {
  var se = document.getElementById("suEmail"), sp = document.getElementById("suPass");
  var sc = document.getElementById("suConfirm"), terms = document.getElementById("terms");
  var suBtn = document.getElementById("suBtn");

  function suAll(show) {
    var a = check(se, "email", show);
    var b = check(sp, "password", show);
    var c = checkMatch(sp, sc, show);
    var d = terms.checked;
    document.getElementById("termsErr").textContent = (show && !d) ? "You must accept the terms." : "";
    return a && b && c && d;
  }
  se.addEventListener("blur", function () { check(se, "email", true); });
  sp.addEventListener("blur", function () { check(sp, "password", true); });
  sc.addEventListener("blur", function () { checkMatch(sp, sc, true); });
  suForm.addEventListener("input", function () { suBtn.disabled = !suAll(false); });
  suForm.addEventListener("change", function () { suBtn.disabled = !suAll(false); });
  suForm.addEventListener("submit", function (ev) {
    ev.preventDefault();
    if (suAll(true)) document.getElementById("suMsg").textContent = "Account created! You can sign in now.";
  });
}

/* ---------- signin.html ---------- */
var siForm = document.getElementById("signinForm");
if (siForm) {
  var ie = document.getElementById("siEmail"), ip = document.getElementById("siPass");
  var alertEl = document.getElementById("alertBox");

  document.getElementById("eyeBtn").addEventListener("click", function () {
    ip.type = (ip.type === "password") ? "text" : "password";
  });

  siForm.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var problems = [];
    if (!rules.email.re.test(ie.value)) problems.push("Email format is wrong.");
    if (ip.value.length < 8) problems.push("Password must be at least 8 characters.");
    if (problems.length > 0) {
      alertEl.textContent = problems.join(" ");
      alertEl.style.display = "block";
    } else {
      alertEl.style.display = "none";
      window.location.href = "home.html";
    }
  });
}
