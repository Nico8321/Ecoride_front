import { showToast } from "./components/toast.js";
import { gethistoriqueTransactions } from "./api/transactions.js";

async function getHistorique() {
  try {
    const infos = await gethistoriqueTransactions();
    if (!infos.length) {
      return showToast("Aucune donnée à afficher");
    }
    const labels = infos.map((e) => e.jour);
    const data = infos.map((e) => e.total);
    const totalCredit = data.reduce((a, b) => a + b);
    const creditContainer = document.getElementById("creditContainer");
    creditContainer.textContent = totalCredit;
    const canvas = document.getElementById("myChart");
    new Chart(canvas, {
      type: "line",
      data: {
        labels: labels,
        datasets: [{ label: "credits", data: data, borderWidth: 2 }],
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

const creditContainer = document.getElementById("creditContainer");
