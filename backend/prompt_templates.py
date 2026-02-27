def chat_prompt(user_message: str) -> str:
    return f"""
You are a senior AI assistant.
Answer the user's question clearly and accurately.
If the topic is technical, explain step by step.

User question:
{user_message}
"""