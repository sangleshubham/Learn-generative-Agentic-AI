import tiktoken

encoder = tiktoken.encoding_for_model("gpt-4o")

text = "Hi, What are you doing"

tokens = encoder.encode(text)

print(tokens) # [12194, 11, 4614, 553, 481, 5306]

print(encoder.decode([12194, 11, 4614, 554, 481, 5306])) # Hi, What are you doing