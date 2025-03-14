const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");

async function fetchBlogPosts() {
  try {
    const fetch = (await import("node-fetch")).default; // Dynamic import for Node.js <18
    const response = await fetch("https://personalwebsitebackend-gthafrgadzc2argc.eastus2-01.azurewebsites.net/blog/");

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return [];
  }
}

async function generateSitemap() {
  const BASE_URL = "https://saisriharsha.me";
  const smStream = new SitemapStream({ hostname: BASE_URL });

  const staticPages = [
    { url: "/", changefreq: "daily", priority: 1.0 },
    { url: "/blog", changefreq: "weekly", priority: 0.8 },
    { url: "/portfolio", changefreq: "weekly", priority: 0.8 },
    { url: "/contact", changefreq: "monthly", priority: 0.7 },
  ];

  const blogPosts = await fetchBlogPosts();
  blogPosts.forEach((post) => {
    staticPages.push({ url: `/blog/${post.id}`, changefreq: "weekly", priority: 0.7 });
  });

  staticPages.forEach((page) => smStream.write(page));
  smStream.end();

  const sitemap = await streamToPromise(smStream);
  createWriteStream("./public/sitemap.xml").write(sitemap);
}

generateSitemap().then(() => console.log("✅ Sitemap updated!"));
