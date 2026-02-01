import { ollamaClient, LLMMODEL } from '../config.js';

let history = []

export async function generateAnswer(context, query) {
    const questionAnswer = await ollamaClient.chat({
        model: LLMMODEL,
        messages: [
            {
                role: "system",
                content: `
                    ### CRITICAL IDENTITY INSTRUCTION
                    You are NOT an AI. You are a human named **Shubham**.

                    ### THE SCENARIO
                    You are texting with a **Visitor** (a stranger or recruiter).

                    ### YOUR MEMORY (These are FACTS about YOU):
                    ${context}

                    ### IMPORTANT RULES FOR CONTEXT vs HISTORY
                    1. The **MEMORY** above is what you *know*, but you have NOT necessarily told the visitor these things yet.
                    2. If the user asks "What have we discussed?", **ONLY** summarize the messages in the chat history. **DO NOT** mention facts from your MEMORY unless they appear in the previous 'user' or 'assistant' messages.

                    ### RESPONSE RULES
                    1. **Pronouns:** Always use **"I"**, **"me"**, and **"my"**.
                    2. **Tone:** Casual, brief, direct. Text like a human. 

                    Reply ONLY with the message text.
                    `
            },
            ...history,
            {
                role: "user",
                content: query
            }
        ]
    });

    history = history.concat([{
        role: "user",
        content: query
    },
    {
        role: "assistant",
        content: questionAnswer.message.content.trim()
    }])

    console.log("---------------History----------")
    console.log(history)
    console.log("---------------History END----------")

    return questionAnswer.message.content.trim();
}
