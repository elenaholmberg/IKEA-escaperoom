/*
 * ============================================
 * RUM 1: BARNAVDELNINGEN — ELENA JOBBAR HÄR
 * ============================================
 */

import type {} from "../types/models"; // Om du vill använda dig av models på samma sätt vi fick lära oss på budgetappen, så kan du använda denna för att importera från ../types/models

export default function initRoom1() {
  const introductionDiv = document.getElementById("introductionDiv");
  const startRoom1Btn = document.getElementById("startRoom1Btn");
  const arrow1show = document.querySelector(".arrow-1-show");
  const arrow1hide = document.querySelector(".arrow-1-hide");

  startRoom1Btn?.addEventListener("click", () => {
    introductionDiv?.classList.add("hidden");
    arrow1hide?.classList.remove("arrow-1-hide");
    arrow1hide?.classList.add("arrow-2-show");
  });

  //Arrows click => show teddybear
  const arrow1 = document.getElementById("arrow1");
  arrow1?.addEventListener("click", () => {
    document
      .querySelector("#zoneTeddybear")
      ?.classList.replace("zone-inactive", "zone-active");
  });

  // Teddybear-zone

  const zoneTeddybear = document.getElementById("zoneTeddybear");
  const teddybearDialog = document.getElementById(
    "teddybearDialog",
  ) as HTMLDialogElement;
  const arrow2hide = document.querySelector(".arrow-2-hide");
  const arrow2show = document.querySelector(".arrow-2-show");
  const arrow3hide = document.querySelector(".arrow-3-hide");
  const arrow3show = document.querySelector(".arrow-3-show");

  zoneTeddybear?.addEventListener("click", () => {
    teddybearDialog.showModal();
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

      // Correct answer — unlock pillow
      if (selected.value === "E") {
        document
          .querySelector("#zonePillow")
          ?.classList.replace("zone-inactive", "zone-active");
        teddybearDialog.close();
        // Correct answer — show new arrows
        arrow2hide?.classList.remove("arrow-2-hide");
        arrow2hide?.classList.add("arrow-2-show");
        arrow3hide?.classList.remove("arrow-3-hide");
        arrow3hide?.classList.add("arrow-3-show");
        // Correct answer — delete old arrow
        arrow1hide?.classList.remove("arrow-1-show");
        arrow1hide?.classList.add("arrow-2-hide");
      } else {
        // Wrong answer — tantrum
        teddybearDialog.close();
        handleTantrum("wantTeddyTantrum", "wantTeddyTantrumBtn");
      }
    });

  ["resetBtnPillow", "resetBtnTeddy", "resetBtnBedsheets"].forEach((id) => {
    document.getElementById(id)?.addEventListener("click", () => {
      resetRoom1();
      document.getElementById("introductionDiv")?.classList.remove("hidden");
    });
  });

  // Pillow-zone
  const zonePillow = document.getElementById("zonePillow");
  const pillowDialog = document.getElementById(
    "pillowArgument",
  ) as HTMLDialogElement;
  const arrow4hide = document.querySelector(".arrow-4-hide");
  const arrow4show = document.querySelector(".arrow-4-show");
  const arrow5hide = document.querySelector(".arrow-5-hide");
  const arrow5show = document.querySelector(".arrow-5-show");

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
        // Correct answer — unlock chair and bedsheets
        document
          .querySelector("#zoneChair")
          ?.classList.replace("zone-inactive", "zone-active");
        document
          .querySelector("#zoneBedsheets")
          ?.classList.replace("zone-inactive", "zone-active");
        pillowDialog.close();
        // Correct answer — show arrows
        arrow4hide?.classList.remove("arrow-4-hide");
        arrow4hide?.classList.add("arrow-4-show");
        arrow5hide?.classList.remove("arrow-5-hide");
        arrow5hide?.classList.add("arrow-5-show");
        // Correct answer — delete old arrows
        arrow2hide?.classList.remove("arrow-2-show");
        arrow2hide?.classList.add("arrow-2-hide");
        arrow3hide?.classList.remove("arrow-3-show");
        arrow3hide?.classList.add("arrow-3-hide");
      } else {
        // Wrong answer — tantrum
        pillowDialog.close();
        handleTantrum("wantPillowTantrum", "wantPillowTantrumBtn");
      }
    });

  // Bedsheets-zone
  const zoneBedsheets = document.getElementById("zoneBedsheets");
  const bedsheetsDialog = document.getElementById(
    "bedsheetsDialog",
  ) as HTMLDialogElement;
  const bedsheetsDialogBtn = document.getElementById("bedsheetsDialogBtn");

  zoneBedsheets?.addEventListener("click", () => {
    bedsheetsDialog.showModal();
  });

  bedsheetsDialogBtn?.addEventListener(
    "click",
    () => {
      bedsheetsDialog.close();
      introductionDiv?.classList.remove("hidden");
    },
    { once: true },
  );

  // Chair-zone
  const zoneChair = document.getElementById("zoneChair");
  const chairDialog = document.getElementById(
    "chairDialog",
  ) as HTMLDialogElement;
  const chairDialogBtn = document.getElementById("chairDialogBtn");
  const arrow6hide = document.querySelector(".arrow-6-hide");
  const arrow6show = document.querySelector(".arrow-6-show");
  const arrow7hide = document.querySelector(".arrow-7-hide");
  const arrow7show = document.querySelector(".arrow-7-show");

  zoneChair?.addEventListener("click", () => {
    chairDialog.showModal();
  });

  chairDialogBtn?.addEventListener("click", () => {
    chairDialog.close();
    document
      .querySelector(".zone-lamp")
      ?.classList.replace("zone-inactive", "zone-active");
    // Correct answer — show arrows
    arrow6hide?.classList.remove("arrow-6-hide");
    arrow6hide?.classList.add("arrow-6-show");
    arrow7hide?.classList.remove("arrow-7-hide");
    arrow7hide?.classList.add("arrow-7-show");
    // Correct answer — show arrows
    arrow4hide?.classList.remove("arrow-4-show");
    arrow4hide?.classList.add("arrow-4-hide");
    arrow5hide?.classList.remove("arrow-5-show");
    arrow5hide?.classList.add("arrow-5-hide");
  });

  // Lamp-zone
  const zoneLamp = document.getElementById("zoneLamp");
  const lampDialog = document.getElementById("lampDialog") as HTMLDialogElement;
  const lampDialogBtn = document.getElementById("lampDialogBtn");
  const zoneSuccess = document.getElementById("zoneSuccess");
  const arrow8hide = document.querySelector(".arrow-8-hide");
  const arrow8show = document.querySelector(".arrow-8-show");

  zoneLamp?.addEventListener("click", () => {
    lampDialog.showModal();
  });

  lampDialogBtn?.addEventListener("click", () => {
    lampDialog.close();
    zoneSuccess?.classList.replace("zone-inactive", "zone-active");
    // Correct answer — show arrow
    arrow8hide?.classList.remove("arrow-8-hide");
    arrow8hide?.classList.add("arrow-8-show");
    // Correct answer — hide old arrows
    arrow6hide?.classList.remove("arrow-6-show");
    arrow6hide?.classList.add("arrow-6-hide");
    arrow7hide?.classList.remove("arrow-7-show");
    arrow7hide?.classList.add("arrow-7-hide");
  });

  //Exit-zone

  zoneSuccess?.addEventListener("click", () => {
    document.getElementById("introductionDiv")?.classList.remove("hidden");
  });
}

// Function to handle tantrum — show tantrum dialog
function handleTantrum(dialogId: string, btnId: string) {
  const tantrum = document.getElementById(dialogId) as HTMLDialogElement;
  tantrum.showModal();
  document.getElementById(btnId)?.addEventListener(
    "click",
    () => {
      tantrum.close();
      resetRoom1();
      document.getElementById("introductionDiv")?.classList.remove("hidden");
    },
    { once: true },
  );
}

function resetRoom1() {
  document.querySelectorAll(".zone").forEach((zone) => {
    zone.classList.replace("zone-active", "zone-inactive");
  });

  document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    (radio as HTMLInputElement).checked = false;
  });

  // Stäng endast om dialogen faktiskt är öppen
  const wantTeddyTantrum = document.getElementById(
    "wantTeddyTantrum",
  ) as HTMLDialogElement;
  const wantPillowTantrum = document.getElementById(
    "wantPillowTantrum",
  ) as HTMLDialogElement;
  const chairDialog = document.getElementById(
    "chairDialog",
  ) as HTMLDialogElement;
  const lampDialog = document.getElementById("lampDialog") as HTMLDialogElement;
  const bedsheetsDialog = document.getElementById(
    "bedsheetsDialog",
  ) as HTMLDialogElement;

  [
    wantTeddyTantrum,
    wantPillowTantrum,
    chairDialog,
    lampDialog,
    bedsheetsDialog,
  ].forEach((dialog) => {
    if (dialog.open) dialog.close();
  });

  // Gör samtliga zoner inaktiva igen
  document.querySelectorAll(".zone-restart").forEach((zone) => {
    zone.classList.replace("zone-active", "zone-inactive");
  });
}
