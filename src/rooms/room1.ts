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

  // Teddybear-zone

  let teddybearUsed = false;
  const zoneTeddybear = document.getElementById("zoneTeddybear");
  const teddybearDialog = document.getElementById(
    "teddybearDialog",
  ) as HTMLDialogElement;
  const submitTeddybearArgument = document.getElementById(
    "submitTeddybearArgument",
  );

  zoneTeddybear?.addEventListener("click", () => {
    if (teddybearUsed) return; //stoppar om redan klickad
    teddybearDialog.showModal();
  });

  submitTeddybearArgument?.addEventListener("click", () => {
    const selected = document.querySelector<HTMLInputElement>(
      'input[name="teddybear-choose-argument"]:checked',
    );

    if (!selected) {
      alert("Välj ett argument först!");
      return;
    }

    teddybearUsed = true;

    teddybearDialog.close();

    // Correct answer — unlock pillow and arrows
    if (selected.value === "E") {
      document
        .querySelector("#zonePillow")
        ?.classList.replace("zone-inactive", "zone-active");
      teddybearDialog.close();

      showArrow("arrow2");
      showArrow("arrow3");
      hideArrow("arrow1");
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
  const submitPillowArgument = document.getElementById("submitPillowArgument");
  const arrow4 = document.getElementById("arrow4");
  const arrow5 = document.getElementById("arrow5");

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
        // Correct answer — unlock chair and bedsheets and arrows
        document
          .querySelector("#zoneChair")
          ?.classList.replace("zone-inactive", "zone-active");
        document
          .querySelector("#zoneBedsheets")
          ?.classList.replace("zone-inactive", "zone-active");
        pillowDialog.close();
        showArrow("arrow4");
        showArrow("arrow5");
        hideArrow("arrow2");
        hideArrow("arrow3");
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
  const arrow6 = document.getElementById("arrow6");
  const arrow7 = document.getElementById("arrow7");
  const arrow9 = document.getElementById("arrow9");

  zoneChair?.addEventListener("click", () => {
    chairDialog.showModal();
  });

  chairDialogBtn?.addEventListener("click", () => {
    chairDialog.close();
    document
      .querySelector(".zone-lamp")
      ?.classList.replace("zone-inactive", "zone-active");

    showArrow("arrow6");
    showArrow("arrow7");
    showArrow("arrow9");
    hideArrow("arrow4");
    hideArrow("arrow5");
  });

  // Lamp-zone
  const zoneLamp = document.getElementById("zoneLamp");
  const lampDialog = document.getElementById("lampDialog") as HTMLDialogElement;
  const lampDialogBtn = document.getElementById("lampDialogBtn");
  const zoneSuccess = document.getElementById("zoneSuccess");

  zoneLamp?.addEventListener("click", () => {
    lampDialog.showModal();
  });

  lampDialogBtn?.addEventListener("click", () => {
    lampDialog.close();
    zoneSuccess?.classList.replace("zone-inactive", "zone-active");

    showArrow("arrow8");
    hideArrow("arrow6");
    hideArrow("arrow7");
    hideArrow("arrow9");
  });

  //Exit-zone

  zoneSuccess?.addEventListener("click", () => {
    resetRoom1();
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

  // Döljer alla arrows

  document.querySelectorAll(".arrow").forEach((arrow) => {
    arrow.classList.remove("visible");
  });

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

function showArrow(id: string) {
  document.getElementById(id)?.classList.add("visible");
}

function hideArrow(id: string) {
  document.getElementById(id)?.classList.remove("visible");
}

//Obs! Gör zoonerna unclickable när dem är suddade
