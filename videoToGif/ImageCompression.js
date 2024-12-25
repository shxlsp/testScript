const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

/**
 * Compress an image and save it with "-tiny" suffix
 * @param {string} imagePath - Path to the source image
 * @returns {Promise<boolean>} - Returns true if compression succeeds, false otherwise
 */
async function compressImage(imagePath) {
    try {
        // Get file info
        const ext = path.extname(imagePath);
        const dir = path.dirname(imagePath);
        const basename = path.basename(imagePath, ext);
        const outputPath = path.join(dir, `${basename}-tiny${ext}`);

        // Compress image using sharp while preserving animation
        await sharp(imagePath, { 
            animated: true,
            limitInputPixels: 1000000000 // Increase pixel limit to 100MP
        })
            .resize(800) // Limit max width to 800px while maintaining aspect ratio
            .toFormat(ext.substring(1), { quality: 80 }) // Maintain original format with compression
            .toFile(outputPath);

        return true;
    } catch (error) {
        console.error('Error compressing image:', error);
        return false;
    }
}

// module.exports = compressImage;
compressImage(path.join(__dirname, './png/meetingAnimation.gif'))