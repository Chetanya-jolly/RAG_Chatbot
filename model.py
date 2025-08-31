from ctransformers import AutoModelForCausalLM

LLMPath = r'D:\projects\rag_chatbot_pctd\LLMmodel\mistral-7b-instruct-v0.2.Q5_K_M.gguf'

llm = AutoModelForCausalLM.from_pretrained(
    LLMPath,
    model_type="mistral"
)

response = llm(
    "Hello, how is the wheater today", 
    stream=True
    )

for text in response:
    print(text,end="", flush=True)