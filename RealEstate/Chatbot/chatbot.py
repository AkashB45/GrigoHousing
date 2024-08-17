from data import load_qa_pairs
from utils import preprocess_text, cosine_similarity

class Chatbot:
    def __init__(self):
        self.qa_pairs = load_qa_pairs()
        self.questions = [pair['question'] for pair in self.qa_pairs]
        self.preprocessed_questions = [preprocess_text(q) for q in self.questions]

    def get_response(self, user_input):
        preprocessed_input = preprocess_text(user_input)
        
        similarities = [cosine_similarity(preprocessed_input, q) for q in self.preprocessed_questions]
        max_similarity = max(similarities)
        
        if max_similarity > 0.7:  # Threshold for considering a match
            best_match_index = similarities.index(max_similarity)
            return self.qa_pairs[best_match_index]['answer']
        else:
            return "I'm sorry, I don't have enough information to answer that question. Could you please rephrase or ask something else?"