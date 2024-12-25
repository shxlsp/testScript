import fs from "fs";
import path from "path";
import FontSpider from "font-spider";

/**
 * Compress font files using font-spider
 * @param {string} htmlPath - Path to HTML file containing font references
 * @param {string} outputPath - Output directory for compressed fonts
 * @returns {Promise<boolean>} - Returns true if successful, false if failed
 */
async function compressFontWithSpider(htmlPath, outputPath) {
  try {
    // Validate input
    if (!fs.existsSync(htmlPath)) {
      console.error("HTML file does not exist");
      return false;
    }

    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }

    // Configure font-spider options
    const options = {
      silent: false,
      backup: false,
      ignore: [],
      map: [],
      debug: false,
    };

    // Run font-spider
    const results = await FontSpider.spider([htmlPath], options);
    console.log(results, "????");
    await FontSpider.compressor(results, options);

    return true;
  } catch (error) {
    console.error("Font compression failed:", error);
    return false;
  }
}
// Test the font compression function
const run = async () => {
  const htmlPath = path.join(process.cwd(), "index.html");
  const outputPath = path.join(process.cwd(), "compressed");

  const result = await compressFontWithSpider(htmlPath, outputPath);
  console.log("Font compression result:", result);
};

run();

export default compressFontWithSpider;
