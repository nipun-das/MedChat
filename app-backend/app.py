from flask import Flask, request, jsonify
from DiseasePrediction import DiseasePrediction

app = Flask(__name__)
model = DiseasePrediction()

@app.route('/predict', methods=['POST'])
def predict():
    symptoms = request.json['symptoms']
    input_features = model.inputNLP(symptoms)
    prediction = model.make_prediction([input_features])[0]
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)