// 提示词
// 使用nodejs实现一个自动检测文本编码格式，转换指定编码格式的脚本。入参 文件地址，目标格式，文件格式（选填），如果不填，则执行自动推断编码格式方法，如果转码失败，也执行自动推断编码格式方法，把推荐方法和错误信息返回。如果成功，则在源文件目录生成，文件名生成规则：【文件名】-【编码格式】.【扩展名】
const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');
const jschardet = require('jschardet');
/**
 * 检测文件编码格式
 * @param {string} filePath 文件路径
 * @returns {Promise<{encoding: string, confidence: number}>} 编码检测结果
 */
async function detectEncoding(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            
            const detection = jschardet.detect(data);
            // 默认使用 UTF-8 如果置信度不高
            const encoding = detection.confidence > 0.5 ? detection.encoding : 'utf8';
            
            resolve({
                encoding: encoding.toLowerCase(),
                confidence: detection.confidence
            });
        });
    });
}

/**
 * 转换文件编码
 * @param {string} filePath 文件路径
 * @param {string} targetEncoding 目标编码
 * @param {string} [sourceEncoding] 源编码（可选，自动检测如果不提供）
 * @returns {Promise<{success: boolean, message: string, detectedEncoding?: string}>} 转换结果
 */
async function convertEncoding(filePath, targetEncoding, sourceEncoding) {
    try {
        // 如果没有提供源编码，则自动检测
        const detected = sourceEncoding ? 
            { encoding: sourceEncoding, confidence: 1 } : 
            await detectEncoding(filePath);
        
        // 读取文件内容
        const fileBuffer = await fs.promises.readFile(filePath);
        
        // 解码内容
        const decodedContent = iconv.decode(fileBuffer, detected.encoding);
        
        // 编码为目标格式
        const encodedContent = iconv.encode(decodedContent, targetEncoding);
        
        // 生成新文件名
        const fileInfo = path.parse(filePath);
        const newFileName = `${fileInfo.name}-${targetEncoding}${fileInfo.ext}`;
        const newFilePath = path.join(fileInfo.dir, newFileName);
        
        // 写入新文件
        await fs.promises.writeFile(newFilePath, encodedContent);
        
        return {
            success: true,
            message: `文件已成功转换为 ${targetEncoding} 编码`,
            detectedEncoding: detected.encoding,
            newFilePath: newFilePath
        };
    } catch (error) {
        // 如果转换失败，尝试自动检测编码
        try {
            const detected = await detectEncoding(filePath);
            return {
                success: false,
                message: `转换失败: ${error.message}. 检测到的编码可能是: ${detected.encoding} (置信度: ${detected.confidence})`,
                detectedEncoding: detected.encoding,
                recommendedAction: `尝试使用 ${detected.encoding} 作为源编码重新转换`
            };
        } catch (detectError) {
            return {
                success: false,
                message: `转换失败: ${error.message}. 编码检测也失败: ${detectError.message}`,
                recommendedAction: '请手动指定源编码格式'
            };
        }
    }
}

/**
 * 主函数
 * @param {string} filePath 文件路径
 * @param {string} targetEncoding 目标编码
 * @param {string} [sourceEncoding] 源编码（可选）
 */
async function main(filePath, targetEncoding, sourceEncoding) {
    if (!filePath || !targetEncoding) {
        console.error('用法: node script.js <文件路径> <目标编码> [源编码]');
        process.exit(1);
    }
    
    try {
        const result = await convertEncoding(filePath, targetEncoding, sourceEncoding);
        
        if (result.success) {
            console.log('转换成功:');
            console.log(`- 检测到的源编码: ${result.detectedEncoding}`);
            console.log(`- 生成的新文件: ${result.newFilePath}`);
        } else {
            console.error('转换失败:');
            console.error(`- 错误信息: ${result.message}`);
            if (result.detectedEncoding) {
                console.error(`- 检测到的编码: ${result.detectedEncoding}`);
            }
            if (result.recommendedAction) {
                console.error(`- 建议操作: ${result.recommendedAction}`);
            }
        }
    } catch (error) {
        console.error('发生错误:', error.message);
        process.exit(1);
    }
}

// 从命令行参数获取输入
// const args = process.argv.slice(2);
// main(args[0], args[1], args[2]);

main('./《宿命之环》精校无错版.txt', 'utf8')