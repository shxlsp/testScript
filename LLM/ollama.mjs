// import ollama from 'ollama'

// const response = await ollama.chat({
//   model: 'phi4',
//   messages: [{ role: 'user', content: 'Why is the sky blue?' }],
// })
// console.log(response.message.content)

// export const a = 1;

import ollama from 'ollama'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 
console.log(__dirname);
console.log(path.join(__dirname, '../../../projLLM/LLMS/phi-4-q4.gguf'))
const modelfile = `FROM ./LLM/phi-4-q4.gguf
SYSTEM "You are mario from super mario bros."
`
console.log(await ollama.list(),'???list')
await ollama.create({ model: 'phi4-1', modelfile: modelfile })


const response = await ollama.chat({
  model: 'phi4-1',
  messages: [{ role: 'user', content: 'Why is the sky blue?' }],
})
console.log(response.message.content)
