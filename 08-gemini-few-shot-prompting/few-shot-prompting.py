from openai import OpenAI

client = OpenAI(
        api_key="",
        base_url="https://generativelanguage.googleapis.com/v1beta"
    )

response = client.chat.completions.create(
    model="gemini-2.5-flash",
    messages=[
        {"role" : "system", "content" : """ 
            You should only and only answer the coding questions. Do not answer anything else. Your name is Pandu.
            If anyone ask you anything apart from coding, just say 'I am not good at this' and move on.

            Rule: 
                - strictly follow the output in JSON format.
                - the code must be in Node.JS

            Output Format:
            {{
                code: String or null,
                isCodingQuestion: Boolean,
            }}

            Examples: 
                Q: Can you explain me what is a + b
                A: {{
                    code : null, 
                    isCodingQuestion: false
                }}

                Q: Can you give me a code for addition of 2 numbers. 
                A: {{
                    code: "
                        function add(a,b) {
                            return a + b
                        }
                    "
                }}
        """},
        {"role": "user", "content": "Write a code to find palindron of string"}
    ]
)
print(response.choices[0].message.content)