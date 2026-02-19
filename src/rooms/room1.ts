/*
 * ============================================
 * RUM 1: BARNAVDELNINGEN — ELENA JOBBAR HÄR
 * ============================================
 */

import type {} from "../types/models"; // Om du vill använda dig av models på samma sätt vi fick lära oss på budgetappen, så kan du använda denna för att importera från ../types/models

export default function initRoom1() {
  const introductionDiv = document.getElementById("introductionDiv");
  const startRoom1Btn = document.getElementById("startRoom1Btn");

  startRoom1Btn?.addEventListener("click", () => {
    introductionDiv?.classList.add("hidden");
  });

  // Kudde-zonen
  const zonePillow = document.getElementById("zonePillow");
  const pillowDialog = document.getElementById(
    "pillowArgument",
  ) as HTMLDialogElement;

  zonePillow?.addEventListener("click", () => {
    pillowDialog.showModal();
  });

  document
    .getElementById("submitPillowArgument")
    ?.addEventListener("click", () => {
      const selected = document.querySelector<HTMLInputElement>(
        'input[name="pillow-choose-argument"]:checked',
      );

      if (!selected) {
        alert("Välj ett argument först!");
        return;
      }

      if (selected.value === "C") {
        // Rätt svar — lås upp carpet och bedsheets
        document
          .querySelector(".zone-carpet")
          ?.classList.replace("zone-inactive", "zone-active");
        document
          .querySelector(".zone-bedsheets")
          ?.classList.replace("zone-inactive", "zone-active");
        pillowDialog.close();
      } else {
        // Fel svar — utbrott, skicka tillbaka till entrén
        pillowDialog.close();
        alert("Dottern får ett utbrott! Du måste börja om.");
        // Här kan vi lägga till mer logik senare, t.ex. återställa zoner
      }
    });

  // Gosedjur-zonen
  const zoneTeddybear = document.getElementById("zoneTeddybear");
  const teddybearArgument = document.getElementById(
    "teddybearArgument",
  ) as HTMLDialogElement;

  zoneTeddybear?.addEventListener("click", () => {
    teddybearArgument.showModal();
  });

  document
    .getElementById("submitTeddybearArgument")
    ?.addEventListener("click", () => {
      const selected = document.querySelector<HTMLInputElement>(
        'input[name="teddybear-choose-argument"]:checked',
      );

      if (!selected) {
        alert("Välj ett argument först!");
        return;
      }

      if (selected.value === "B") {
        // Rätt svar — lås upp carpet och bedsheets
        document
          .querySelector(".zone-carpet")
          ?.classList.replace("zone-inactive", "zone-active");
        document
          .querySelector(".zone-bedsheets")
          ?.classList.replace("zone-inactive", "zone-active");
        teddybearArgument.close();
      } else {
        // Fel svar — utbrott, skicka tillbaka till entrén
        teddybearArgument.close();
        alert("Dottern får ett utbrott! Du måste börja om.");
      }
    });
}
