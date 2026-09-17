// ISSUE: Hardcoded root-relative asset URLs return 404 on GitHub Pages project subpaths (/news-zero/).
// CORRECTION: Add pathPrefix and wrap asset/nav links with Eleventy | url filter.
import pluginRss from "@11ty/eleventy-plugin-rss";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);

  // Passthrough static assets
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("snapshots");
  eleventyConfig.addPassthroughCopy(".nojekyll");

  // Date formatting filter
  eleventyConfig.addFilter("dateIso", (dateVal) => {
    return new Date(dateVal || Date.now()).toISOString();
  });

  eleventyConfig.addFilter("formatDate", (dateVal) => {
    return new Date(dateVal || Date.now()).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  });

  // Limit filter for arrays
  eleventyConfig.addFilter("limit", (arr, count) => {
    return Array.isArray(arr) ? arr.slice(0, count) : [];
  });

  // Category filter helper
  eleventyConfig.addFilter("filterByCategory", (items, catId) => {
    if (!catId) return items;
    return items.filter(
      (item) => item.category === catId || (item.topics && item.topics.includes(catId))
    );
  });

  // Country filter helper
  eleventyConfig.addFilter("filterByCountry", (items, countryIso) => {
    if (!countryIso || countryIso === "Global") return items;
    return items.filter((item) => item.country === countryIso || item.country === "Global");
  });

  return {
    pathPrefix: process.env.PATH_PREFIX || "/news-zero/",
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
