/* ---------------- NAV ACTIVE ---------------- */
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", function () {
    document.querySelectorAll("nav a").forEach(a => a.classList.remove("active"));
    this.classList.add("active");
  });
});

/* ---------------- PAGE SWITCH ---------------- */
function showPage(id) {
  document.querySelectorAll("section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* ---------------- PACKAGES DATA ---------------- */
const packages = [
  { id: 1, destination: "Paris", durationDays: 5, basePrice: 1200, season: "peak" },
  { id: 2, destination: "Dubai", durationDays: 4, basePrice: 900, season: "normal" },
  { id: 3, destination: "Bali", durationDays: 6, basePrice: 1500, season: "off" }
];

// Seasonal price calculation
function finalPrice(pkg) {
  let m = 1;
  switch (pkg.season) {
    case "peak": m = 1.3; break;
    case "normal": m = 1.1; break;
    case "off": m = 0.9; break;
  }

  // Weekend example surcharge
  if (pkg.durationDays >= 6) m += 0.05;

  return (pkg.basePrice * m).toFixed(2);
}

// Render table
function loadPackages() {
  const tbody = document.querySelector("#packagesTable tbody");
  tbody.innerHTML = "";

  packages.forEach(pkg => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${pkg.destination}</td>
      <td>${pkg.durationDays} Days</td>
      <td>$${pkg.basePrice}</td>
      <td>${pkg.season}</td>
      <td>$${finalPrice(pkg)}</td>
    `;
    tbody.appendChild(row);
  });
}

loadPackages();

/* ---------------- PRICE ESTIMATOR ---------------- */
const form = document.getElementById("bookingForm");
const dateInput = form.date;
const destInput = form.destination;
const travInput = form.travelers;

const priceBox = document.createElement("p");
priceBox.style.fontWeight = "bold";
form.appendChild(priceBox);

function estimate() {
  const pkg = packages.find(p => p.destination === destInput.value);
  if (!pkg) return;

  let price = Number(finalPrice(pkg));

  // Guests multiplier
  if (travInput.value > 2) price *= 1.2;

  priceBox.innerText = "Estimated Total: $" + price.toFixed(2);

  form.querySelector("input[type='submit']").disabled =
    !dateInput.value || travInput.value < 1;
}

dateInput.addEventListener("change", estimate);
destInput.addEventListener("change", estimate);
travInput.addEventListener("input", estimate);

/* ---------------- GALLERY MODAL ---------------- */
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");

document.querySelectorAll(".gallery img").forEach(img => {
  img.addEventListener("click", function () {
    modal.style.display = "flex";
    modalImg.src = this.dataset.large;
    modalImg.alt = this.alt;
  });
});

modal.addEventListener("click", () => modal.style.display = "none");
