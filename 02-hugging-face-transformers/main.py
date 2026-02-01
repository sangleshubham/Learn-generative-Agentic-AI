# Use a pipeline as a high-level helper
from transformers import pipeline

# Initialize the pipeline
pipe = pipeline("image-text-to-text", model="google/gemma-3-4b-it")

messages = [
    {
        "role": "user",
        "content": [
            {"type": "image", "url": "https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/p-blog/candy.JPG"},
            {"type": "text", "text": "What animal is on the candy?"}
        ]
    },
]

# 1. Capture the return value in a variable
# 2. Add max_new_tokens to ensure the model has 'space' to write an answer
output = pipe(text=messages, max_new_tokens=200)

# 3. Explicitly print the result
print(output)