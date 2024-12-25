const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
const GIFEncoder = require('gifencoder');
const { createCanvas, loadImage } = require('canvas');

/**
 * Convert video to GIF/APNG
 * @param {string} inputPath - Path to input video file
 * @param {string} outputPath - Path to output GIF/APNG file
 * @param {Object} options - Conversion options
 * @param {string} options.format - Output format ('gif' or 'apng')
 * @param {number} options.fps - Frames per second (default: 10)
 * @param {number} options.width - Output width (default: original width)
 * @param {number} options.height - Output height (default: original height)
 * @param {number} options.quality - Output quality 1-100 (default: 80)
 * @param {boolean} options.compress - Whether to compress output (default: false)
 * @returns {Promise<void>}
 */
async function convertVideoToAnimation(inputPath, outputPath, fileName = 'image.png', options = {}) {
    const {
        format = 'gif',
        fps = 30,
        width,
        height,
        quality = 80,
        compress = true
    } = options;

    if (!fs.existsSync(inputPath)) {
        throw new Error('Input video file does not exist');
    }

    const tempDir = path.join(__dirname, 'temp_frames');
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
    }
    const outputFilePath = path.join(outputPath, fileName);
    if (!fs.existsSync(outputFilePath)) {
        fs.openSync(outputFilePath, 'w')
    }
    try {
        // Extract frames from video
        await new Promise((resolve, reject) => {
            let command = ffmpeg(inputPath)
                .fps(fps)
                .size('100%');
            
            // Add compression if enabled
            if (compress) {
                command = command
                    .videoFilters([
                        {
                            filter: 'scale',
                            options: width ? `${width}:-1` : '800:-1' // Scale width to 800px if not specified
                        }
                    ]);
            }

            command.on('end', resolve)
                .on('error', reject)
                .output(path.join(tempDir, 'frame-%d.png'))
                .run();
        });
    } catch (error) {
        console.error(error)
    }

    const frames = fs.readdirSync(tempDir)
        .filter(file => file.startsWith('frame-'))
        .sort((a, b) => {
            const numA = parseInt(a.match(/\d+/)[0]);
            const numB = parseInt(b.match(/\d+/)[0]);
            return numA - numB;
        });

    if (format.toLowerCase() === 'gif') {
        // Create GIF
        const firstFrame = await loadImage(path.join(tempDir, frames[0]));
        const canvas = createCanvas(firstFrame.width, firstFrame.height);
        const ctx = canvas.getContext('2d');

        const encoder = new GIFEncoder(firstFrame.width, firstFrame.height);
        encoder.createWriteStream().pipe(fs.createWriteStream(outputFilePath));
        encoder.start();
        encoder.setQuality(compress ? Math.min(quality, 60) : quality); // Lower quality if compression enabled
        encoder.setFrameRate(fps);

        for (const frame of frames) {
            const image = await loadImage(path.join(tempDir, frame));
            ctx.drawImage(image, 0, 0);
            encoder.addFrame(ctx);
        }

        encoder.finish();
    } else if (format.toLowerCase() === 'apng') {
        const UPNG = require('upng-js');
        
        // Load all frames
        const frameBuffers = [];
        const delays = [];
        
        for (const frame of frames) {
            const image = await loadImage(path.join(tempDir, frame));
            const canvas = createCanvas(image.width, image.height);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0);
            
            // Get image data as buffer
            const imageData = ctx.getImageData(0, 0, image.width, image.height);
            frameBuffers.push(imageData.data.buffer);
            
            // Calculate delay in milliseconds based on fps
            delays.push(1000 / fps);
        }
        
        // Encode APNG
        const firstFrame = await loadImage(path.join(tempDir, frames[0]));
        const compressionLevel = compress ? 2 : 0; // Higher compression if enabled
        const apngData = UPNG.encode(frameBuffers, firstFrame.width, firstFrame.height, compressionLevel, delays);
        
        // Write to file
        fs.writeFileSync(outputFilePath, Buffer.from(apngData));
    } else {
        throw new Error('Unsupported output format. Use "gif" or "apng"');
    }

    // Clean up temp directory
    frames.forEach(frame => {
        fs.unlinkSync(path.join(tempDir, frame));
    });
    fs.rmdirSync(tempDir);
}

// convertVideoToAnimation(path.join(__dirname, './video/录屏2024-12-11 16.45.09.mov'), path.join(__dirname, './png/'), 'aabb.png')
convertVideoToAnimation(path.join(__dirname, './video/noAnimation.mov'), path.join(__dirname, './png/'), 'noAnimation.png')
