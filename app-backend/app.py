from flask import Flask, request, jsonify
from DiseasePrediction import DiseasePrediction
import numpy as np
from flask_cors import CORS
app = Flask(__name__)
model = DiseasePrediction()
CORS(app)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB

def predictDisease(symp):
    dp = DiseasePrediction()
    current_model_name = 'mbb'
    dp.train_model()
    test = dp.inputNLP(symp)
    test_data = [test]
    result = dp.make_prediction(test_data, saved_model_name=current_model_name)
    return result

@app.route('/predict', methods=['POST'])
def predict():
    sympy = request.json['symptoms']
    symptoms = list()
    for input_text in sympy:
        dp = DiseasePrediction()
        arr = dp.symptomDetector(input_text)
        symptoms = symptoms + arr
        s_list = set(symptoms)
        symptoms = list(s_list)
    res = predictDisease(symptoms)
    output = res[0]
    return jsonify({'prediction': output})

    #

    # iterate through json item and pass to symptom detector

    # print(symptoms)
    # input_features = model.inputNLP(symptoms)
    # print("input ",[input_features])
    # # index 0 means first prediction
    # prediction = model.make_prediction([input_features])[0]
    # return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
