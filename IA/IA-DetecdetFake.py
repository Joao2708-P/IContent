# %%
import pandas as pd
from sklearn.model_selection import train_test_split
import re
import string
import tensorflow as tf
from keras.layers import Embedding, LSTM, Dense
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from googlesearch import search
from bs4 import BeautifulSoup
import requests
import sys
import json
from flask import Flask, request, jsonify

df_true = pd.read_csv("True.csv")
df_fake = pd.read_csv("Fake.csv")

# %%
df_fake["class"] = 0
df_true['class'] = 1

# %%
data_fake_manual_testing = df_fake.tail(10)
df_fake = df_fake.head(23470)

# %%
data_true_manual_testing = df_true.tail(10)
df_true = df_true.head(21406)

# %%
data_marge = pd.concat([df_fake, df_true], axis=0)

# %%
data_marge['text'] = data_marge['text'].apply(lambda x: re.sub(f"[{string.punctuation}]", "", x.lower()))
data = data_marge.drop(['title', 'subject', 'date'], axis=1)

# %%
x = data['text']
y = data['class']
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.25)

# %%
max_words = 10000
tokenizer = Tokenizer(num_words=max_words)
tokenizer.fit_on_texts(x_train)
xv_train = tokenizer.texts_to_sequences(x_train)
xv_test = tokenizer.texts_to_sequences(x_test)

maxlen = 100  
xv_train = pad_sequences(xv_train, maxlen=maxlen)
xv_test = pad_sequences(xv_test, maxlen=maxlen)

# %%
model = tf.keras.Sequential([
    Embedding(max_words, 128, input_length=maxlen),
    LSTM(128),
    Dense(1, activation='sigmoid')
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# %%
model.fit(xv_train, y_train, epochs=5, batch_size=64, validation_split=0.2)

# %%
def google_search(query):
    
    search_results = list(search(query, num_results=10))
    
    return search_results

# %%
def web_scrape(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    text = soup.get_text()
    return text

# %%
def classify_text(text):
    text = re.sub(f"[{string.punctuation}]", "", text.lower())
    text_sequence = tokenizer.texts_to_sequences([text])
    text_sequence = pad_sequences(text_sequence, maxlen=maxlen)
    prediction = model.predict(text_sequence)
    
    if prediction > 0.5:
        result = "Verdadeiro"
    else:
        result = "Falso"
    
    return result

# %%
#query = input("Digite o conteúdo para pesquisa: ")
#search_results = google_serach(query)

# %%
#for url in search_results:
    # Extraia o texto da página da web
    #internet_text = web_scrape(url)
    
    # Classifique o texto
    #result = classify_text(internet_text)
    
    #print(f"URL: {url}")
    #print(f"Resultado da validação do texto da internet: {result}")

#%%
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer

def sumarizar_texto(texto):
    parser = PlaintextParser.from_string(texto, Tokenizer("portuguese"))
    sumarizador = LsaSummarizer()
    sumario = sumarizador(parser.document, 3)  # Sumariza o texto em 3 sentenças
    return " ".join(str(sentenca) for sentenca in sumario)

#%%

app = Flask(__name__)
@app.route("/analyze", methods=['POST'])
def analyze_text():
    request_data = request.get_json()
    query = request_data.get('query')  # Obtenha a consulta da solicitação JSON

    # Realize a pesquisa no Google com base na consulta
    search_results = google_search(query)

    # Inicialize uma lista para armazenar os resultados da validação e resumo
    analysis_results = []

    # Itere pelos resultados da pesquisa
    for url in search_results:
        internet_text = web_scrape(url)
        validation_result = classify_text(internet_text)
        summary_result = sumarizar_texto(internet_text)
        
        # Adicione os resultados de validação e resumo à lista
        analysis_results.append({"url": url, "validation_result": validation_result, "summary": summary_result})

    return jsonify({"search_results": analysis_results})

    
# %%
if __name__ == '__main__':
    app.run(host='192.168.15.70', port=8080)

# %%
model.save_weights('savade_model')
model.load_weights('savade_model')
