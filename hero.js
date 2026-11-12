// hero.js - types out "NobleTails" letter by letter on the home page
var brand = document.getElementById("brand");
var fullText = brand.textContent;
var pos = 0;
brand.textContent = "";

function typeNext() {
  if (pos < fullText.length) {
    brand.textContent += fullText.charAt(pos);
    pos++;
    setTimeout(typeNext, 130);
  } else {
    setTimeout(function () { brand.classList.add("done"); }, 1500);
  }
}
typeNext();
