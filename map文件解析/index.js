#!/usr/bin/env node

/**
 * js-unminify - JavaScript 代码还原工具
 * 
 * 使用说明:
 * 1. 确保已安装所需依赖: npm install commander chalk source-map
 * 2. 运行命令: node index.js -d <压缩文件目录> [-o <输出目录>]
 * 
 * 参数说明:
 * -d, --dir <directory>: 必需，指定包含压缩 JavaScript 文件的目录
 * -o, --output <dir>: 可选，指定输出目录，默认为 './output'
 * 
 * 功能说明:
 * 1. 递归查找指定目录下的所有 .js 和 .cjs 文件
 * 2. 对每个找到的文件，查找并读取对应的 .map 文件
 * 3. 使用 source-map 库解析 source map，还原原始源代码
 * 4. 将还原后的源代码保存到指定的输出目录，保持原始的目录结构
 * 5. 支持处理多个文件，并在控制台输出处理进度和结果
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'fs';
import { dirname, join, resolve, extname } from 'path';
import { SourceMapConsumer } from 'source-map';
import { Command } from 'commander';
import chalk from 'chalk';

const program = new Command();

program
  .name('js-unminify')
  .description('还原压缩后的JavaScript代码')
  .version('1.0.0')
  .requiredOption('-d, --dir <directory>', '包含压缩文件的目录')
  .option('-o, --output <dir>', '输出目录', './output')
  .parse(process.argv);

const options = program.opts();

function findFiles(dir) {
  const results = [];
  const files = readdirSync(dir);

  for (const file of files) {
    console.log(file, '???')
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      results.push(...findFiles(filePath));
    } else {
      const ext = extname(file);
      if (ext === '.js' || ext === '.cjs') {
        results.push(filePath);
      }
    }
  }

  return results;
}

async function unminifyFile(jsFile) {
  try {
    const mapFile = jsFile + '.map';
    // 读取文件
    const minifiedCode = readFileSync(jsFile, 'utf8');
    const sourceMapContent = readFileSync(mapFile, 'utf8');
    const sourceMap = JSON.parse(sourceMapContent);

    // 创建输出目录
    mkdirSync(options.output, { recursive: true });

    // 使用source-map库解析映射
    await SourceMapConsumer.with(sourceMap, null, async (consumer) => {
      // 获取所有原始文件
      const sources = consumer.sources;

      // 处理每个源文件
      sources.forEach((sourceFile) => {
        // 获取源文件内容
        const content = consumer.sourceContentFor(sourceFile);
        if (!content) {
          console.warn(chalk.yellow(`警告: 无法获取文件 ${sourceFile} 的内容`));
          return;
        }

        // 构建输出路径
        const outputPath = join(options.output, sourceFile);
        const outputDir = dirname(outputPath);

        // 创建必要的目录
        mkdirSync(outputDir, { recursive: true });

        // 写入文件
        writeFileSync(outputPath, content);
        console.log(chalk.green(`✓ 已还原: ${sourceFile}`));
      });
    });
  } catch (error) {
    console.error(chalk.red(`错误处理文件 ${jsFile}:`), error.message);
  }
}

async function unminify() {
  try {
    // 查找所有js文件
    const jsFiles = findFiles(options.dir);
    
    if (jsFiles.length === 0) {
      console.warn(chalk.yellow('警告: 未找到任何js文件'));
      return;
    }

    // 处理每个文件
    for (const jsFile of jsFiles) {
      console.log(chalk.blue(`\n处理文件: ${jsFile}`));
      await unminifyFile(jsFile);
    }

    console.log(chalk.blue('\n还原完成！'));
  } catch (error) {
    console.error(chalk.red('错误:'), error.message);
    process.exit(1);
  }
}

unminify();
