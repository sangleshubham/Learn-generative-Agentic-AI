from typing_extensions import TypedDict
from typing import Annotated
from langgraph.graph.message import add_messages
from langgraph.graph import StateGraph
from langgraph.graph import START, END
from langchain_community.chat_models import ChatOllama


class State(TypedDict):
    messages: Annotated[list, add_messages]

def chatBot (state : State):
    llm =  ChatOllama(model="qwen3-coder")
    response = llm.invoke(state.get("messages"))
    print("response", response)
    return {"messages": [response]}

def callGoogle(state : State):
    return {"messages": ["Google calle"]}

graphBuilder = StateGraph(State)

graphBuilder.add_node("chatbot", chatBot)
graphBuilder.add_node("google", callGoogle) 

graphBuilder.add_edge(START, 'chatbot')
graphBuilder.add_edge('chatbot', 'google')
graphBuilder.add_edge('google', END), 

graph = graphBuilder.compile()
updatedGrah = graph.invoke(State({"messages": ["Mu name is shubham"]}))

print("updated Graph", updatedGrah)