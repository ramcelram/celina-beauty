// === Initialisation d'EmailJS v4 ===
emailjs.init({
  publicKey: "va8aFBD3vv0O-5naT", // Clé publique
});

// === Récupérer les données depuis localStorage ===
const services = JSON.parse(localStorage.getItem("selectedServices")) || [];

const selectedContainer = document.getElementById("selectedServices");
const totalContainer = document.getElementById("totalAmount");

// Affichage du récapitulatif
if (services.length === 0) {
  selectedContainer.textContent = "Aucun service sélectionné.";
  totalContainer.textContent = "";
} else {
  const serviceList = services
    .map((s) => `• ${s.name} : ${s.price} DA`)
    .join("<br>");
  const total = services.reduce((sum, s) => sum + s.price, 0);

  selectedContainer.innerHTML = `<strong>🧴 Services choisis :</strong><br>${serviceList}`;
  totalContainer.innerHTML = `<strong>💰 Total à payer :</strong> ${total} DA`;
}

// === Soumission du formulaire ===
document
  .getElementById("reservationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Récupérer les champs
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const date = document.getElementById("date").value;

    if (!name || !phone || !date) {
      alert("Merci de remplir tous les champs.");
      return;
    }

    // Format des services pour l'email
    const serviceText = services
      .map((s) => `${s.name} - ${s.price} DA`)
      .join("\n");
    const total = services.reduce((sum, s) => sum + s.price, 0);

    // Préparation des données
    const templateParams = {
      name,
      phone,
      date,
      services: serviceText,
      total: `${total} DA`,
    };

    // Envoi via EmailJS
    emailjs.send("service_30bqd2m", "template_4nnpgmx", templateParams).then(
      () => {
        alert("✅ Réservation envoyée avec succès !");
        document.getElementById("reservationForm").reset();
        localStorage.removeItem("selectedServices");
      },
      (error) => {
        console.error("Erreur EmailJS :", error);
        alert("❌ Une erreur est survenue. Réessayez.");
      }
    );
  });
