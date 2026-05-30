import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://trycatch.tv",
  integrations: [icon(), react(), mdx()],
  vite: {
    ssr: {
      external: ["svgo"],
    },
  },
});
