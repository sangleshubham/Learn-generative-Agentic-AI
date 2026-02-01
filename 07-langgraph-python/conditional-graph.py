from typing_extensions import TypedDict
from typing import Annotated
from langgraph.graph.message import add_messages
from langgraph.graph import StateGraph
from langgraph.graph import START, END
from langchain_community.chat_models import ChatOllama


class State(TypedDict):
    messages: Annotated[list, add_messages]


# Base model qwen3-vl:2b
# Validator : qwen3-coder

#                                 yes-> Output (END)
# Start -> 2b model -> evaluate 
#                                 No -> Send to qwen3 code model -> End






