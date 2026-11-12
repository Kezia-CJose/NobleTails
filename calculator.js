// ---- food estimator ----
document.getElementById("estBtn").addEventListener("click", function () {
  var pets = Number(document.getElementById("numPets").value);
  var grams = Number(document.getElementById("gramsPer").value);
  var days = Number(document.getElementById("numDays").value);
  var price = Number(document.getElementById("pricePer").value);
  var out = document.getElementById("estResult");

  if (pets <= 0 || grams <= 0 || days <= 0 || price < 0 || isNaN(pets + grams + days + price)) {
    out.textContent = "Please enter valid positive numbers.";
    return;
  }

  var kg = (pets * grams * days) / 1000;

  out.textContent = "You need " + kg.toFixed(1) + " kg of food. Estimated cost: ₹" + Math.round(kg * price) + ".";
});