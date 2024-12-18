// @ts-check
// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), alpinejs()],
  site: "https://michaelcmorrison.github.io",
  base: "mario-party-league",
});