#!/usr/bin/env node

/**
 * js-unminify-single - JavaScript 压缩文件变量/函数名还原工具（单文件输出版）
 * 
 * 使用说明:
 * 1. 确保已安装所需依赖: npm install commander chalk source-map
 * 2. 运行命令: node unminify-single.js -d <压缩文件目录> -o <输出文件路径>
 * 
 * 参数说明:
 * -d, --dir <directory>: 必需，指定包含压缩 JavaScript 文件的目录
 * -o, --output <file>: 必需，指定输出的 js 单文件路径，如 ./output/revert.js
 * 
 * 功能说明:
 * 1. 递归查找指定目录下的所有 .js 和 .cjs 文件
 * 2. 对每个找到的文件，读取对应的 .map 文件
 * 3. 使用 source-map 库解析 source map，生成变量/函数名映射
 * 4. 将原始压缩代码与变量/函数名映射注释合并
 * 5. 将所有处理后的文件内容合并到一个输出文件中
 * 6. 在控制台输出处理进度和结果
 * 
 * 注意: 此工具不会还原代码结构，只会提供变量/函数名的映射关系
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname, resolve } from 'path';
import { SourceMapConsumer } from 'source-map';
import { Command } from 'commander';
import chalk from 'chalk';

const program = new Command();

program
  .name('js-unminify-single')
  .description('还原js压缩文件的变量/函数名为原始名称，输出单一文件')
  .version('1.0.0')
  .requiredOption('-d, --dir <directory>', '包含压缩文件的目录')
    .requiredOption('-o, --output <file>', '输出的js单文件路径，如 ./output/revert.js', 'output.js')
  .parse(process.argv);

const options = program.opts();

function findJsFiles(dir) {
  const results = [];
  const files = readdirSync(dir);

  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      results.push(...findJsFiles(filePath));
    } else {
      const ext = extname(file);
      if (ext === '.js' || ext === '.cjs') {
        results.push(filePath);
      }
    }
  }

  return results;
}

/**
 * 生成变量/函数名映射注释
 * @param {SourceMapConsumer} consumer
 * @returns {string}
 */
function generateNameMappingComment(consumer) {
  const nameMap = new Map();

  consumer.eachMapping(m => {
    if (m.name && !nameMap.has(m.generatedName)) {
      nameMap.set(m.generatedName, m.name);
    }
  });

  if (nameMap.size === 0) return '// No variable name mapping found in source map\n';

  let comment = '// MinifiedName -> OriginalName mapping from source-map:\n';
  for (const [min, orig] of nameMap.entries()) {
    comment += `// ${min} -> ${orig}\n`;
  }
  return comment;
}

async function processFile(jsFile) {
  try {
    const mapFile = jsFile + '.map';
    const minifiedCode = readFileSync(jsFile, 'utf8');
    const sourceMapContent = readFileSync(mapFile, 'utf8');
    const sourceMap = JSON.parse(sourceMapContent);

    let mappingComment = '';
    await SourceMapConsumer.with(sourceMap, null, async (consumer) => {
      mappingComment = generateNameMappingComment(consumer);
    });

    // 简单处理：将minified代码和变量映射注释合并
    return `// File: ${jsFile}\n${mappingComment}\n${minifiedCode}\n`;
  } catch (error) {
    console.error(chalk.red(`处理文件 ${jsFile} 失败:`), error.message);
    return '';
  }
}

async function run() {
  try {
    const jsFiles = findJsFiles(options.dir);
    if (jsFiles.length === 0) {
      console.warn(chalk.yellow('未找到任何js文件'));
      return;
    }
    let outputContent = '';
    for (const jsFile of jsFiles) {
      console.log(chalk.blue(`处理: ${jsFile}`));
      outputContent += await processFile(jsFile);
      outputContent += '\n// -------------------------\n';
    }
    writeFileSync(options.output, outputContent, 'utf8');
    console.log(chalk.green(`\n已生成单文件: ${options.output}`));
  } catch (error) {
    console.error(chalk.red('发生错误:'), error.message);
    process.exit(1);
  }
}

run();
