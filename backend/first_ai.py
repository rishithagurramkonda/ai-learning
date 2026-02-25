from openai import OpenAI

client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "You are a helpful AI teacher."},
        {"role": "user", "content": "Explain LLM in simple words"}
    ]
)

print(response.choices[0].message.content)