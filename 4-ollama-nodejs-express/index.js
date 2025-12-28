import { OpenAI } from 'openai'
import systemPrompt from './system-prompt.js'
import { z } from 'zod'
import { zodResponseFormat } from "openai/helpers/zod"
import { exec } from 'child_process'
import readline from 'readline'

const client = new OpenAI({
    baseURL: "http://localhost:11434/v1",
    apiKey: "ollama"
})

class Tools {
    static async getWeather(city) {
        const url = `https://wttr.in/${city.toLowerCase()}?format=%C+%t`
        const response = await fetch(url)
        return response.status === 200 ? await response.text() : "Something went wrong"
    }

    static async runCommand(cmd) {
        return new Promise((resolve) => {
            exec(cmd, (error, stdout, stderr) => {
                resolve(stdout || stderr || error?.message)
            })
        })
    }

    static getTools = () => ({
        getWeather: Tools.getWeather,
        runCommand: Tools.runCommand
    })
}

const messages = [
    { "role": "system", "content": systemPrompt },
    { "role": "user", "content": "crate a folder called todo-app in current directory. inside todo-app directory create a simple todo app using HTML, CSS and JS. I want the todo app to have a simple UI with a text input field and a button to add a new todo item. When a todo item is added, it should be displayed in a list below the input field." }
]

const getUserInput = () => {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        rl.question('User: ', (userInput) => {
            rl.close()
            resolve(userInput)
        })
    })
}

const outputSchema = z.object({
    step: z.string(),
    content: z.string(),
    tool: z.string().optional().nullable(),
    input: z.string().optional().nullable(),
    output: z.string().optional().nullable()
})

while (true) {
    let response = await client.chat.completions.parse(
        {
            messages,
            model: 'qwen2.5:14b',
            response_format: zodResponseFormat(outputSchema)
        }
    )

    response = response.choices[0].message.parsed

    console.log(`COT: ${JSON.stringify(response)}`)

    if (response.step === "TOOL") {
        const toolToCall = response.tool
        const param = response.input

        const tools = Tools.getTools()
        const weatherReport = await tools[toolToCall](param)

        if (weatherReport) messages.push({
            role: "tool", content: JSON.stringify({
                step: "OBSERVE",
                tool: toolToCall, "input": param,
                "output": weatherReport
            })
        })
    }

    if (response.step === "OUTPUT") {
        console.log("--------------Output---------------")
        console.log(JSON.stringify(response.content))

        // Take input from user and add it to messages
        const userResponse = await getUserInput()
        messages.push({ role: "user", content: userResponse })
    }

    messages.push({
        role: "assistant", content: JSON.stringify(response)
    })
}

