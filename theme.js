
var themeBtn = document.getElementById("themeBtn");

function setTheme(mode) {
  if (mode === "light") {
    document.body.classList.add("light");
    themeBtn.textContent = "🌙 Dark";
  } else {
    document.body.classList.remove("light");
    themeBtn.textContent = "☀ Light";
  }
  try { localStorage.setItem("nobletails-theme", mode); } catch (e) {}
}

var savedTheme = "dark";
try { savedTheme = localStorage.getItem("nobletails-theme") || "dark"; } catch (e) {}
setTheme(savedTheme);

themeBtn.addEventListener("click", function () {
  setTheme(document.body.classList.contains("light") ? "dark" : "light");
});

document.getElementById("menuBtn").addEventListener("click", function () {
  document.getElementById("navLinks").classList.toggle("show");
});
