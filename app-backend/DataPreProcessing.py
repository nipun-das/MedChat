import pandas as pd
import numpy as np
from matplotlib import pyplot as plt
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

df1=pd.read_csv("dataset.csv")
df1.shape

df1 = df1.replace(np.nan, '', regex=True)

df3=df1.drop(['Disease'],axis='columns') # remove disease col from dataset
df3 = df1['Symptom_1'].map(str) + ' ' + df1['Symptom_2'].map(str) + ' ' + df1['Symptom_3'].map(str)+ ' ' + df1['Symptom_4'].map(str)+ ' ' + df1['Symptom_5'].map(str)+ ' ' + df1['Symptom_6'].map(str)+ ' ' + df1['Symptom_7'].map(str)+ ' ' + df1['Symptom_8'].map(str)+ ' ' + df1['Symptom_9'].map(str)+ ' ' + df1['Symptom_10'].map(str)+ ' ' + df1['Symptom_11'].map(str)+ ' ' + df1['Symptom_12'].map(str)+ ' ' + df1['Symptom_13'].map(str)+ ' ' + df1['Symptom_14'].map(str)+ ' ' + df1['Symptom_15'].map(str)+ ' ' + df1['Symptom_16'].map(str)+ ' ' + df1['Symptom_17'].map(str)


corpus = df3.tolist()
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(corpus)
headings=vectorizer.get_feature_names_out()
symptoms_list=headings



# headings.append('prognosis')
headings = np.concatenate((headings, ['prognosis']))

print("symptoms_list : ",symptoms_list)

X=X.toarray() # stored in matrix

df4 = pd.DataFrame(X)
df5=pd.concat([df4,df1.Disease],axis='columns')
df5.columns=headings
# df5.drop_duplicates(keep='first',inplace=True)
df5.to_csv('disease_symptom_mapping.csv',index=False)  #df5 has diseases and last col as prognosis

#adding symptoms list to a .csv file
symp=pd.DataFrame(symptoms_list)
symp.columns=['Symptoms']
last_row = len(symp)-1
symp = symp.drop(symp.index[last_row])
symp.to_csv('Symptoms.csv',index=False)
