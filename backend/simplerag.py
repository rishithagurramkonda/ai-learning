docs = [
    "RAG improves LLM accuracy",
    "LLM predicts next words",
    "React is a UI library"
]

def search(query):
    return [d for d in docs if query.lower() in d.lower()]

print(search("RAG"))