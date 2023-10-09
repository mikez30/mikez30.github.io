from sklearn.model_selection import train_test_split
import numpy as np
from KNN import KNN
import csv
from flask import Flask, render_template, request, jsonify
import json
import sys
import ast


# Load the CSV data into lists
data = []
target = []
with open('heart.csv', 'r') as csvfile:
    csv_reader = csv.reader(csvfile)
    
    # Iterate 2216 times (assuming 2216 rows in the CSV file)
    for row in csv_reader:
        dataRow = []
        if(row[0] == "age"):continue # skip first row
        # Assuming the features are in columns 1 to n-1 and the target is in the last column
        for value in row:
            dataRow.append(float(value)) # Add the value into the row
        target.append(int (row[-1])) # Add the target value to target list
        
        data.append(dataRow[0:13]) # Add all parameters excluding target column

# Convert to numpy arrays
X = np.array(data)
y = np.array(target)
# Train and test the data with 80/20 split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=1234)

clf = KNN(k=5) # Establish the classifier object
clf.fit(X_train, y_train) # Train the data
predictions = clf.predict(X_test) # Make Predictions

# Accuracy of predictions
acc = np.round(np.sum(predictions == y_test) / len(y_test),4)
print("KNN Accuracy Model: " + str(acc * 100))

print(clf._predict([52,1,0,125,212,0,1,168,0,1,2,2,3]))

app = Flask('__main__')
@app.route('/')
def index():
    return render_template('index.html')
@app.route('/process', methods=['POST'])
def process():
    try:
        # Get the JSON data from the request
        data = request.get_json()

        # Check if data is a list
        if isinstance(data, list):
            # Convert the JSON list to a Python list
            input_values = [float(x) for x in data]

            # Make predictions using clf._predict()
            prediction = clf._predict(input_values)
            st = "Hello World"
            if prediction == 0:
                st = f"Based on a 92.11% KNN AI model accuraccy the patient does not have heart disease"
            else:
                st = f"Based on a 92.11% KNN AI model accuraccy the patient does have heart disease"
            return jsonify({'result': st})
        else:
            return jsonify({'error': 'Invalid input data format'})

    except Exception as e:
        return jsonify({'error': str(e)})

# ... (Remaining Flask code)

if __name__ == '__main__':
    app.run(debug=True)

