/*
 * ============================================
 * VITE CONFIG — ÄNDRA INTE UTAN ATT PRATA MED GRUPPEN
 * ============================================
 * Inställningar för Vite (byggverktyget).
 * base: "/fed25d-fed25d-js-intro-grupparbete-fed25d-js-intro-grupparbete-mall/" gör att sökvägar fungerar på GitHub Pages för detta repo.
 */

import { defineConfig } from "vite";

export default defineConfig({
  base: "/Medieinstitutet/fed25d-js-intro-grupparbete-the-vorticon-vikings/",
  build: {
    outDir: "dist",
  },
});
