
var FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

var mapLink = "";

function setErr(el, msg) {
  var old = el.parentNode.querySelector("." + el.id + "-err");
  if (old) old.remove();
  if (msg) {
    el.classList.add("invalid");
    var s = document.createElement("span");
    s.className = "error-msg " + el.id + "-err";
    s.textContent = msg;
    el.parentNode.insertBefore(s, el.nextSibling);
  } else {
    el.classList.remove("invalid");
  }
}

// "Use my current location" button
document.getElementById("locBtn").addEventListener("click", function () {
  var out = document.getElementById("locMsg");
  if (!navigator.geolocation) { out.textContent = "Your browser cannot share location. Please type the address."; return; }
  out.textContent = "Getting location...";
  navigator.geolocation.getCurrentPosition(function (pos) {
    mapLink = "https://www.google.com/maps?q=" + pos.coords.latitude + "," + pos.coords.longitude;
    out.textContent = "Location added ✔ (you can still type the address)";
  }, function () {
    out.textContent = "Could not get location. Please type the address.";
  });
});

document.getElementById("reportForm").addEventListener("submit", function (ev) {
  ev.preventDefault();
  var name = document.getElementById("rName");
  var phone = document.getElementById("rPhone");
  var animal = document.getElementById("rAnimal");
  var cond = document.getElementById("rCondition");
  var addr = document.getElementById("rAddress");
  var ok = true;

  if (!/^[a-zA-Z\s]{2,50}$/.test(name.value)) { setErr(name, "Enter your name (letters and spaces only)."); ok = false; } else setErr(name, "");
  if (!/^[6-9]\d{9}$/.test(phone.value)) { setErr(phone, "Enter a 10 digit mobile number."); ok = false; } else setErr(phone, "");
  if (animal.value === "") { setErr(animal, "Please select the animal."); ok = false; } else setErr(animal, "");
  if (cond.value === "") { setErr(cond, "Please select the condition."); ok = false; } else setErr(cond, "");
  if (addr.value.trim().length < 10 && mapLink === "") { setErr(addr, "Please enter the address (at least 10 characters) or use your location."); ok = false; } else setErr(addr, "");
  if (!ok) return;

  var msg = document.getElementById("rMsg");
  if (FORM_ENDPOINT.indexOf("YOUR_FORM_ID") !== -1) {
    msg.textContent = "Demo mode: form is valid, but email is not connected yet (see README.txt).";
    return;
  }
  msg.textContent = "Sending...";
  fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: { "Accept": "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      _subject: "🚨 NobleTails stray report: " + animal.value + " (" + cond.value + ")",
      name: name.value, phone: phone.value, animal: animal.value, condition: cond.value,
      address: addr.value, map_link: mapLink, notes: document.getElementById("rNotes").value
    })
  }).then(function (r) {
    if (r.ok) {
      msg.textContent = "Thank you! Our rescue team has been notified and will contact you soon.";
      document.getElementById("reportForm").reset();
      document.getElementById("locMsg").textContent = "";
      mapLink = "";
    } else {
      msg.textContent = "Sorry, could not send. Please try again.";
    }
  }).catch(function () { msg.textContent = "Network problem. Please try again."; });
});
