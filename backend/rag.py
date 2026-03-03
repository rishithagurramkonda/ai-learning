import numpy as np
from sklearn.metrics.pairwise import cosine_similarity


documents = []

def load_knowledge():
    global documents

    with open("backend/knowledge.txt", "r", encoding="utf-8") as f:
        documents = [line.strip() for line in f.readlines() if line.strip()]


def search(query):

    global documents

    if not documents:
        load_knowledge()

    query_words = query.lower().split()

    best_score = 0
    best_doc = ""
    print (documents)
    for doc in documents:

        score = 0
        doc_lower = doc.lower()
        print ("doc_lower:", doc_lower, doc)
        print("query_words:", query_words)
        for word in query_words:
            if word in doc_lower:
                score += 1
        print("score:", score)
        print("best_score:", best_score)
        if score > best_score:
            best_score = score
            best_doc = doc

    if best_score == 0:
        return []

    return [best_doc]