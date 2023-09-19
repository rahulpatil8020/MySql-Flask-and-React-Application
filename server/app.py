from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
import json

app = Flask(__name__)
CORS(app)

mydb = mysql.connector.connect(
host="localhost",
    user="root",
    passwd="ThorRP@8020",
    database="hospital",
)

mycursor = mydb.cursor()

@app.route('/get', methods=['GET'])
def get_doctors():
    data = []
    mycursor.execute("SELECT * FROM doctors ORDER BY id DESC")
    for i in mycursor:
        temp = {"id": i[0], "name": i[1], "qualification": i[2]}
        data.append(temp)
    return json.dumps(data), 200, {'Content-Type': 'application/json'}

@app.route('/get/id/<id>', methods=['GET'])

def get_doctor_by_id(id):
    print("Gettingdoctor", id)
    data=[]
    mycursor.execute(f"SELECT * FROM doctors WHERE id={id}")    
    for i in mycursor:
        temp = {"id": i[0], "name": i[1], "qualification": i[2]}
        data.append(temp)
    return json.dumps(data), 200, {'Content-Type': 'application/json'}

@app.route('/get/name/<name>', methods=['GET'])
def get_doctor_by_name(name):
    data = []
    mycursor.execute(f"SELECT * FROM doctors WHERE name LIKE '%{name}%'")
    for i in mycursor:
        temp = {"id": i[0], "name": i[1], "qualification": i[2]}
        data.append(temp)
    return json.dumps(data), 200, {'Content-Type': 'application/json'} 

@app.route('/get/speciality/<quali>', methods=['GET'])
def get_doctor_by_qualification(quali):
    data = []
    mycursor.execute(f"SELECT * FROM doctors WHERE qualification LIKE '%{quali}%'")
    for i in mycursor:
        temp = {"id": i[0], "name": i[1], "qualification": i[2]}
        data.append(temp)
    return json.dumps(data), 200, {'Content-Type': 'application/json'} 

@app.route('/get/name_spec/<namequali>', methods=['GET'])
def get_doctor_by_name_and_spec(namequali):
    temp = namequali.split('_')
    data = []
    mycursor.execute(f"SELECT * FROM doctors WHERE qualification LIKE '%{temp[1]}%' AND name LIKE '%{temp[0]}%'")
    for i in mycursor:
        temp = {"id": i[0], "name": i[1], "qualification": i[2]}
        data.append(temp)
    return json.dumps(data), 200, {'Content-Type': 'application/json'} 

@app.route('/add', methods=['POST'])
def add_doctor():
    name = request.json['name']
    qualification = request.json['qualification']
    mycursor.execute(f"INSERT INTO doctors(name, qualification) VALUES ('{name}','{qualification}');")
    mydb.commit()
    output = {"name": name, "qualification":qualification}
    return json.dumps(output)

@app.route('/update/<id>/', methods=['PATCH', 'POST', 'PUT'])
def update_doctor(id):
    # name = request.json['name']
    # qualification = request.json['qualification']
    myFile = open()
    for line in myFile.readlines():
        temp = line.split(',')
    # mycursor.execute(f'''
    # UPDATE doctors 
    # SET 
    # name = '{name}',
    # qualification = '{qualification}'
    # WHERE
    # id = '{id}';
    # ''')

    # mydb.commit()

    # output = {"id": id, "name": name, "qualification":qualification}
    # return json.dumps(output)
    name = request.json.get('name')  # Use get() to avoid KeyError if 'name' is missing
    qualification = request.json.get('qualification')  # Use get() to avoid KeyError if 'qualification' is missing

    # Update the doctor record in the database
    mycursor.execute('''
        UPDATE doctors 
        SET 
        name = %s,
        qualification = %s
        WHERE
        id = %s;
    ''', (name, qualification, id))

    mydb.commit()

    # Fetch the updated data from the database
    mycursor.execute('SELECT * FROM doctors WHERE id = %s', (id,))
    updated_data = mycursor.fetchone()

    if updated_data:
        updated_id, updated_name, updated_qualification = updated_data
        output = {"id": updated_id, "name": updated_name, "qualification": updated_qualification}
        return json.dumps(output)
    else:
        return json.dumps({"error": "Doctor not found"})

@app.route('/delete/<id>', methods=['DELETE'])
def delete_doctor(id):
    mycursor.execute(f'''
    DELETE FROM doctors WHERE id = {id};
    ''')
    mydb.commit()
    
    return json.dumps({"id": id})

if __name__ == '__main__':
    app.run(debug=True)