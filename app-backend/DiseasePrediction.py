# import yaml
from joblib import dump, load
import pandas as pd
from sklearn.metrics import f1_score
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
from sklearn.naive_bayes import MultinomialNB
# from sklearn.tree import DecisionTreeClassifier
# import seaborn as sn
# import matplotlib.pyplot as plt
from nltk.tokenize import word_tokenize
# from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
# from sklearn.feature_extraction.text import CountVectorizer
# import numpy as np
from sklearn.ensemble import RandomForestClassifier
# from sklearn import svm
import pickle
# from sklearn.naive_bayes import MultinomialNB, GaussianNB


class DiseasePrediction:

    def _load_train_dataset(self):
        self.train_df = pd.read_csv('disease_symptom_mapping.csv')
        cols = self.train_df.columns
        cols = cols[:-1]
        self.train_features = self.train_df[cols]
        self.train_labels = self.train_df['prognosis']

    def train_model(self):
        self._load_train_dataset()
        print("sdfsdf",self.train_features)
        print("sdfdsfsdfsdf",self.train_labels)

        X_train, X_val, y_train, y_test = train_test_split(self.train_features, self.train_labels,
                                                           test_size=0.20, random_state=101)

        noise = np.random.normal(0, 1, X_train.shape)

        # Add the noise to the training features
        noisy_X_train = X_train + noise

        clf2 = RandomForestClassifier(n_estimators=150)
        clf2.fit(noisy_X_train, y_train)

        print("//////////////////////////////")
        print("X_train:")
        print(X_train)
        print("//////////////////////////////")
        print("X_val:")
        print(X_val)
        print("//////////////////////////////")
        print("y_train:")
        print(y_train)
        print("//////////////////////////////")
        print("y_test:")
        print(y_test)
        print("//////////////////////////////")
        print(X_train.shape)
        print(X_val.shape)


        y_pred = clf2.predict(X_val)
        print("//////////////////////////////")
        print("y_pred:")
        print(y_pred)
        print("//////////////////////////////")
        print("Accuracy:", accuracy_score(y_test, y_pred,normalize=False))
        score = cross_val_score(clf2, X_val, y_test, cv=13)
        print(score.mean())

        print("Accuracy:", accuracy_score(y_test, y_pred,  normalize=False))
        print("F1 Score:", f1_score(y_test, y_pred, average='weighted'))

        # clf_report = classification_report(y_test, y_pred)
        # print(clf_report)

        PIK = 'N:\pklfile\RandomForest.pkl'
        with open(PIK, "wb") as f:
            pickle.dump(clf2, f)

    def make_prediction(self, test_data, saved_model_name=None):
        print("inside : ",test_data)
        try:
            clf = load(str('N:\pklfile\RandomForest.pkl'))
        except Exception as e:
            print("Model not found...")
        result = clf.predict(test_data)
        return result


    def symptomDetector(self, text):
        tokens = word_tokenize(text.lower())
        words = [word for word in tokens if word.isalpha()]
        porter = PorterStemmer()
        stemmed = [porter.stem(word) for word in words]
        for s in stemmed:
            if s not in words:
                words.append(s)
        final_symps = list()
        print("final_symps1 : ",final_symps)
        symptoms_dataset = pd.read_csv('Symptoms.csv')
        self.symptoms_list = symptoms_dataset.Symptoms.tolist()
        # print("Symptoms",self.symptoms_list,len(self.symptoms_list))
        for symp in self.symptoms_list:
            s = ""
            symp = s.join(symp)
            arr = symp.split("_")
            # print(arr,len(arr))
            for i, v in enumerate(arr):
                arr[i] = v.strip()
            final_symps.append(arr)
        print("final_symps2 : ",final_symps)

        # print(final_symps,len(final_symps))
        symp = list()
        print("----------------------------------")
        print("words : ",words)
        print("final_symps3 : ",final_symps)
        print("----------------------------------")
        for i, w in enumerate(words):
            completed=False
            flag = 0
            print("flag set to 0 ")
            for j, s in enumerate(final_symps):
                print("i : ",i,"w : ",w,"j : ",j,"s : ",s)
                if (w == s[0]):
                    print("w:",w,"s[0]",s[0])
                    if len(s) > 1:
                        word_index = i + 1
                        c = 0
                        for index, a in enumerate(s[1:]):
                            print("a ", a, "index:", index)
                            print("word_index : ", word_index, "words : ", words  ,"s : ", s,"index : ", index)
                            if s[index + 1] == words[word_index] and word_index < len(words):
                                print("hi")
                                word_index += 1
                                c += 1
                        print("new word_index : ",word_index,"c : ",c)

                        if c == len(s) - 1:
                            print("if c entered")
                            z = w
                            for x in range(len(s) - 1):
                                z = z + "_" + words[i + x + 1]
                            symp.append(z)
                            print("z : ",z)
                        flag =1
                        completed=True
                        print("flag set 1.1")
                    else: # for single word symptoms like cough
                        flag=1
                        print("flag set 1.2")
                        symp.append(words[i])
                if (flag == 1):
                    print("break flag")
                    break
            if(completed):
                break
        return (symp)


    def inputNLP(self, symp):
        symptoms_dataset = pd.read_csv('Symptoms.csv')
        symptoms_dataset.columns = ['Symptoms']
        self.symptoms_list = symptoms_dataset.Symptoms.tolist()
        # print(self.symptoms_list)
        n = len(self.symptoms_list)
        # print(n)
        final_input = [0 for i in range(n)]
        for s in symp:
            i = self.symptoms_list.index(s)
            final_input[i] = 1
        print("hiiiiii",final_input)
        # all inputted symptoms are marked as 1 in final_output list in order as in Symptoms.csv file
        return final_input

    """
    -> _load_train_dataset() loads a CSV file named disease_symptom_mapping.csv which contains information about symptoms and diseases. 
       It preprocesses the data by separating the symptoms as features and diseases as labels.
       
    -> train_model() trains a Random Forest Classifier model on the preprocessed data using train_test_split() and prints the accuracy
       score of the model. It also performs cross-validation to evaluate the model's performance and saves the model as a pickle file.
       
    -> make_prediction() loads the saved model using the pickle file and makes predictions on a test dataset provided as an argument.
    
    -> symptomDetector() takes in a text string and uses natural language processing to identify symptoms from the string. 
       It tokenizes the text, removes non-alphabetic characters, and performs stemming. 
       It then compares the stemmed words to a CSV file named Symptoms.csv to find matching symptoms.
       
    -> inputNLP() takes in a list of identified symptoms and converts them to a binary list where each symptom is marked as 1 or 0 
       depending on whether it was identified in the Symptoms.csv file.

    """