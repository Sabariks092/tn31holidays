// download-wanderers-images.mjs
import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://wanderers.qodeinteractive.com/wp-content/uploads/2018/03/";
const OUTPUT_DIR = path.join(__dirname, "wanderers-2018-03-images");

// simple image extension check
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

// 1) fetch directory index HTML
function fetchIndex(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, res => {
        if (res.statusCode !== 200) {
          reject(new Error(`Status code ${res.statusCode} for ${url}`));
          return;
        }
        let data = "";
        res.setEncoding("utf8");
        res.on("data", chunk => (data += chunk));
        res.on("end", () => resolve(data));
      })
      .on("error", reject);
  });
}

// 2) parse hrefs from the index page
function extractFileUrls(indexHtml) {
  // naive regex: grab href="..."
// works fine on simple Apache/NGINX-style indexes
  const hrefRegex = /href="([^"]+)"/gi;
  const files = new Set();

  let match;
  while ((match = hrefRegex.exec(indexHtml)) !== null) {
    const href = match[1];
    // skip parent directory and directories
    if (href === "../" || href.endsWith("/")) continue;

    const lower = href.toLowerCase();
    if (IMAGE_EXTENSIONS.some(ext => lower.endsWith(ext))) {
      // make absolute URL if needed
      const url = href.startsWith("http") ? href : BASE_URL + href;
      files.add(url);
    }
  }

  return Array.from(files);
}

// 3) helper to download a single file
function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    // skip existing
    if (fs.existsSync(destPath)) {
      console.log("Exists, skipping:", path.basename(destPath));
      return resolve();
    }

    const fileStream = fs.createWriteStream(destPath);
    https
      .get(url, res => {
        if (res.statusCode !== 200) {
          fileStream.close();
          fs.unlink(destPath, () => {});
          return reject(new Error(`Failed ${url} (status ${res.statusCode})`));
        }
        res.pipe(fileStream);
        fileStream.on("finish", () => {
          fileStream.close();
          console.log("Downloaded:", path.basename(destPath));
          resolve();
        });
      })
      .on("error", err => {
        fileStream.close();
        fs.unlink(destPath, () => {});
        reject(err);
      });
  });
}

// 4) main
(async () => {
  try {
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    console.log("Fetching index...");
    const html = await fetchIndex(BASE_URL);

    const fileUrls = extractFileUrls(html);
    console.log(`Found ${fileUrls.length} image files`);

    // simple sequential download (you can parallelize if needed)
    for (const url of fileUrls) {
      const filename = path.basename(new URL(url).pathname);
      const dest = path.join(OUTPUT_DIR, filename);
      try {
        await downloadFile(url, dest);
      } catch (err) {
        console.error("Error downloading", url, err.message);
      }
    }

    console.log("Done.");
  } catch (err) {
    console.error("Fatal error:", err.message);
  }
})();
