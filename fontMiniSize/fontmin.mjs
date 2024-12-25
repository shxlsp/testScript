import fs from "fs";
import path from "path";
import Fontmin from "fontmin";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// font-spider
/**
 * Compress font file
 * @param {string} inputPath - Input font file path
 * @param {string} outputPath - Output directory path
 * @returns {Promise<boolean>} - Returns true if successful, false if failed
 */
async function compressFont(inputPath, outputPath) {
  try {
    // Validate input
    if (!fs.existsSync(inputPath)) {
      console.error("Input font file does not exist");
      return false;
    }

    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }

    // Initialize fontmin
    const fontmin = new Fontmin()
      .src(inputPath)
      .dest(outputPath)
      // Use default plugins for optimization
      .use(
        Fontmin.glyph({
          text: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,!?@#$%^&*()_+-=[]{}|;:'\"<>/",
        })
      )
      .use(Fontmin.ttf2eot())
      .use(Fontmin.ttf2woff())
      .use(Fontmin.ttf2woff2())
      .use(Fontmin.css());

    // Run font compression
    await new Promise((resolve, reject) => {
      fontmin.run((err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(files);
        }
      });
    });

    return true;
  } catch (error) {
    console.error("Font compression failed:", error);
    return false;
  }
}

const run = async () => {
  const res = await compressFont(
    path.join(
      __dirname,
      "./扁-18030-2022级别2/JINGDONGLangZhengTi1-Regular.ttf"
    ),
    "./"
  );
  console.log(res, "res");
};
run();
