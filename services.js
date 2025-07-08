const checkboxes = document.querySelectorAll(
  'input[type="checkbox"][name="services"]'
);
const totalEl = document.getElementById("total");
const confirmBtn = document.getElementById("confirm");

let selectedServices = [];

function calculateTotal() {
  let total = 0;
  selectedServices = []; // Réinitialiser à chaque changement

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const name = checkbox.value;
      const price = parseInt(checkbox.dataset.price, 10);
      selectedServices.push({ name, price });
      total += price;
    }
  });

  totalEl.textContent = total;
  return total;
}

// Met à jour le total quand on coche/décoche
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", calculateTotal);
});

// Bouton "Confirmer ma sélection"
confirmBtn.addEventListener("click", () => {
  if (selectedServices.length === 0) {
    alert("Veuillez sélectionner au moins un service.");
    return;
  }

  const total = calculateTotal(); // recalcul au cas où

  // Stockage dans localStorage (mieux que sessionStorage pour navigation)
  localStorage.setItem("selectedServices", JSON.stringify(selectedServices));

  // Redirection vers la page de réservation
  window.location.href = "reservation.html";
});

// Initialiser au chargement
calculateTotal();
