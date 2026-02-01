import { OpenAI } from 'openai'

const client = new OpenAI({
    baseURL: "http://localhost:11434/v1",
    apiKey: "ollama"
})

async function getImageAsBase64(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return `data:image/jpeg;base64,${buffer.toString('base64')}`;
}

const imageBase64 = await getImageAsBase64("https://www.ercotravels.com/blog/wp-content/uploads/2024/07/3929-1.jpg")

const response = await client.chat.completions.create({
    messages: [
        {
            role: "user",
            content: [
                { "type": "text", "text": "what's in this image?" },
                {
                    "type": "image_url",
                    "image_url": { url: imageBase64 }
                }
            ]
        }
    ],
    model: "qwen3-vl:2b"
})


console.log(response.choices[0].message.content)

