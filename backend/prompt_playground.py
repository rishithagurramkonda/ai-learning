from prompt_templates import explain_topic_prompt

topic = "LLM"
prompt = explain_topic_prompt(topic)

print("----- PROMPT -----")
print(prompt)