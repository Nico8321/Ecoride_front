import { showToast } from "./components/toast.js";
import { gethistoriqueCovoiturage } from "./api/covoiturage.js";

async function getHistorique() {
  try {
    const infos = await gethistoriqueCovoiturage();
    if (!infos.length) {
      return showToast("Aucune donnée à afficher");
    }
    const labels = infos.map((e) => e.jour);
    const data = infos.map((e) => e.total);
    const canvas = document.getElementById("myChart");
    new Chart(canvas, {
      type: "line",
      data: {
        labels: labels,
        datasets: [{ label: "covoiturage", data: data, borderWidth: 2 }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
        animations: {
          tension: {
            duration: 1000,
            easing: "linear",
            from: 1,
            to: 0,
            loop: false,
          },
        },
      },
    });
  } catch (error) {
    showToast(`Erreur : ${error.message}`, "danger");
  }
}
getHistorique();
