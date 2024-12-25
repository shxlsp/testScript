const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

/**
 * Convert video files to audio files
 * @param {string} inputDir - Input directory containing video files
 * @param {string} outputDir - Output directory for audio files
 * @returns {true|string[]} Returns true if successful, or array of failed files
 */
async function videoToAudio(inputDir, outputDir) {
    try {
        // Check if directories exist
        if (!fs.existsSync(inputDir)) {
            throw new Error('Input directory does not exist');
        }

        // Create output directory if it doesn't exist
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const failedFiles = [];

        // Get all video files recursively
        const videoFiles = getAllVideoFiles(inputDir);
        console.log(videoFiles)
        // Convert each video file
        for (const videoFile of videoFiles) {
            try {
                const relativePath = path.relative(inputDir, videoFile);
                const outputPath = path.join(outputDir, relativePath.replace(/\.[^/.]+$/, '.mp3'));
                console.log(outputPath, '????outputPath')
                // Create subdirectories in output if needed
                const outputSubDir = path.dirname(outputPath);
                if (!fs.existsSync(outputSubDir)) {
                    fs.mkdirSync(outputSubDir, { recursive: true });
                }

                await convertToAudio(videoFile, outputPath);
            } catch (err) {
                failedFiles.push(videoFile, err);
            }
        }

        return failedFiles.length === 0 ? true : failedFiles;

    } catch (error) {
        console.error('Error:', error.message);
        return [error.message];
    }
}

/**
 * Get all video files from directory recursively
 * @param {string} dir - Directory to search
 * @returns {string[]} Array of video file paths
 */
function getAllVideoFiles(dir) {
    const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv', '.wmv', '.flv'];
    let results = [];

    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            results = results.concat(getAllVideoFiles(filePath));
        } else {
            const ext = path.extname(file).toLowerCase();
            if (videoExtensions.includes(ext)) {
                results.push(filePath);
            }
        }
    }

    return results;
}

/**
 * Convert single video file to audio
 * @param {string} input - Input video file path
 * @param {string} output - Output audio file path
 * @returns {Promise} Promise that resolves when conversion is complete
 */
function convertToAudio(input, output) {
    return new Promise((resolve, reject) => {
        ffmpeg(input)
            .toFormat('mp3')
            .on('end', () => resolve())
            .on('error', (err) => reject(err))
            .save(output);
    });
}

// module.exports = videoToAudio;
// console.log(path.join(__dirname, './'))
const run = async () => {
    // console.log(）
        await videoToAudio(path.join(__dirname, './'), path.join(__dirname, './output'))
}

run();