from flask import Flask, request, render_template
import pickle
import pandas as pd

app = Flask(__name__, template_folder="templates")

# Load the model
model = pickle.load(open('model.pkl','rb'))

@app.route('/', methods=['GET','POST'])
def home():
    if request.method == 'POST':
        flight_info = []
        print("inside post")
        dayofweek = request.form.get('dayofweek')
        day = request.form.get('day')
        month = request.form.get('month')
        dep = request.form.get('dep')
        arr = request.form.get('arr')
        elap = request.form.get('elap')
        flight_info.append(month)
        flight_info.append(day)
        flight_info.append(dayofweek)
        flight_info.append(dep)
        flight_info.append(arr)
        flight_info.append(elap)
        print(flight_info)
        df = pd.DataFrame([flight_info])
        # Make prediction
        print(df.head())
        pred = model.predict(df)
        print(pred)
        if pred[0] == 1:
            delay = "Your flight will be delayed over an hour"
        else:
            delay = 'Your flight will not be delayed over an hour'
        return render_template('index.html', prediction=delay)
    return render_template('index.html', prediction='')
    
if __name__ == '__main__':
    app.run(port=3000, debug=True)