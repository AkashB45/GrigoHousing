import csv

def load_qa_pairs():
    qa_pairs = []
    with open('dataset.csv', 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        next(reader)  # Skip header
        for row in reader:
            if len(row) == 2:
                qa_pairs.append({
                    'question': row[0],
                    'answer': row[1]
                })
    return qa_pairs