import readline from 'node:readline/promises';
import { ensureCollection, storeDocuments, searchContext } from './services/storage.js';
import { generateAnswer } from './services/chat.js';
import { documentTexts } from './data.js';

async function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const answer = await rl.question(query);
    rl.close();

    return answer;
}

async function main() {
    // 1. Initialize Storage
    const isNew = await ensureCollection();

    // 2. Ingest data if collection was just created (or you can force it if needed)
    // Note: The original logic in research_assistant.js had a condition that looked like
    // it WANTED to insert if it exists, but the logic 
    // "if (exists) { return client.deleteCollection(COLLECTION) }" was commented/unreachable effectively.
    // Here we will simplistically insert if it's new.
    // If you want to always insert, you can just call storeDocuments(documentTexts).
    if (isNew) {
        console.log("Populating database...");
        await storeDocuments(documentTexts);
    } else {
        // Optional: uncomment to always update data
        // console.log("Populating database...");
        // await storeDocuments(documentTexts);
    }


    while (true) {
        // 3. User Interaction
        const query = await askQuestion("Q : ");

        if (!query.trim) continue

        // 4. Retrieve Context
        const context = await searchContext(query);

        // 5. Generate Answer
        const answer = await generateAnswer(context, query);
        console.log(answer);
    }

}

main().catch(console.error);
