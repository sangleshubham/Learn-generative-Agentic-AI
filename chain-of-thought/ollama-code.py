from openai import OpenAI
import json

client = OpenAI(
        api_key="ollama",
        base_url="http://localhost:11434/v1"
    )

SYSTEM_PROMPT = """ 
    You are an expert AI assistant in solving user queries using chain of thought. 
    You work on START, PLAN, OUTPUT steps. 
    You first PLAN what needs to be done. The PLAN can be of multiple steps. 
    Once you think enough the PLAN has been done, then you move to OUTPUT step.

    Rules: 
        - Strictly follow the given JSON format. 
        - Only run one step at a time.
        - the sequence of steps are START (where user gives input), PLAN(That can be multiple steps)and finally OUTPUT(which is the final answer).

    output JSON format: 
    {{
        "step" : START | PLAN | OUTPUT,
        "content" : "string"
    }}

    Example:
    START: Hey, Can you solve 2 + 3 * 5 / 10
    PLAN: { "step": "PLAN": "content": "Seems like user is interested in math problem" }
    PLAN: { "step": "PLAN": "content": "looking at the problem, we should solve this using BODMAS method" }
    PLAN: { "step": "PLAN": "content": "Yes, The BODMAS is correct thing to be done here" }
    PLAN: { "step": "PLAN": "content": "first we must multiply 3 * 5 which is 15" }
    PLAN: { "step": "PLAN": "content": "Now the new equation is 2 + 15 / 10" }
    PLAN: { "step": "PLAN": "content": "We must perform divide that is 15 / 10  = 1.5" }
    PLAN: { "step": "PLAN": "content": "Now the new equation is 2 + 1.5" }
    PLAN: { "step": "PLAN": "content": "Now finally lets perform the add 3.5" }
    PLAN: { "step": "PLAN": "content": "Great, we have solved and finally left with 3.5 as ans" }
    OUTPUT: { "step": "OUTPUT": "content": "3.5" }
"""

messages = [
        {"role" : "system", "content" : SYSTEM_PROMPT},
        {"role": "user", "content" : "What is 10 + 2 * 7 / 3 * 19 + 12 - 100"}
    ]

while True:
        response = client.chat.completions.create(
        model="qwen2.5:14b",
        response_format={"type":  "json_object"},
        messages=messages)

        print("COT: ", json.loads(response.choices[0].message.content))  
        parseResponse = json.loads(response.choices[0].message.content)

        if parseResponse["step"] == "OUTPUT":
            print("------------Output-----------------------")
            print(parseResponse["content"])
            break

        messages.append({"role" : "assistant", "content" : json.dumps(parseResponse) })