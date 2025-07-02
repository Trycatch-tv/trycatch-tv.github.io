import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://trycatch.tv",
  integrations: [tailwind(), react(), mdx()],
  vite: {
    ssr: {
      external: ["svgo"],
    },
  },
});
