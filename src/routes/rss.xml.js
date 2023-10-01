import rss, { pagesGlobToRssItems } from "@astrojs/rss";

export async function GET(context) {
  return rss({
    title: "TryCatch.tv | Blog",
    description:
      "El blog que te ayudará a encontrar los recursos que faciliten tu proceso de aprendizaje.",
    site: context.site,
    items: await pagesGlobToRssItems(import.meta.glob("./**/*.md")),
    customData: `<language>es-co</language>`,
  });
}
