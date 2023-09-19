import "./App.css";
import { useState, useEffect } from "react";
import DoctorList from "./components/DoctorList";
import Form from "./components/Form";
import APIService from "./components/APIService";
import SearchResultsList from "./components/SearchResultsList";

function App() {
  const [doctors, setDoctors] = useState([]);
  const [editedDoctor, setEditedDoctor] = useState(null);
  const [newDoctor, setNewDoctor] = useState(null);
  const [updatedDoctor, setUpdatedDoctor] = useState(null);
  const [deletedDoc, setDeletedDoc] = useState(null);
  const [searchID, setSearchID] = useState(null);
  const [searchName, setSearchName] = useState(null);
  const [searchSpeciality, setSearchSpeciality] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const editDoctor = (doctor) => {
    setEditedDoctor(doctor);
  };

  const updatedData = (doctor) => {
    const new_doctors = doctors.map((my_doctor) => {
      if (my_doctor.id === doctor.id) {
        return doctor;
      } else {
        return my_doctor;
      }
    });
    setDoctors(new_doctors);
    setUpdatedDoctor(doctor);
    closeForm();
  };

  useEffect(() => {
    fetch("http://127.0.0.1:5000/get", {
      methods: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((error) => console.log(error));
  }, [newDoctor, updatedDoctor, deletedDoc]);

  const openForm = () => {
    setEditedDoctor({ title: "", body: "" });
  };

  const closeForm = () => {
    setEditedDoctor(null);
  };

  const insertedDoctor = (doctor) => {
    const new_doctors = [...doctors, doctor];
    setDoctors(new_doctors);
    setNewDoctor(doctor);
    closeForm();
  };
  const deletedDoctor = (doctor) => {
    const new_doctors = doctors.filter((mydoctor) => mydoctor.id !== doctor.id);
    setDoctors(new_doctors);
    setDeletedDoc(doctor);
    closeForm();
  };
  return (
    <div className="App">
      <div className="row">
        <div className="col">
          <h1>Assignment 1</h1>
        </div>
        <div className="col">
          <button className="btn btn-success" onClick={openForm}>
            Insert Doctor
          </button>
        </div>
        <div className="col">
          <input
            name="search_by_name"
            autoFocus
            onChange={(e) => setSearchName(e.target.value)}
            value={searchName}
            type="text"
            className="form-control"
            placeholder="Search By Name"
          />
          <br />
          <button
            className="btn btn-success"
            onClick={() => {
              if (searchName?.length > 0)
                APIService.SearchByName(searchName)
                  .then((res) => setSearchResults([...res]))
                  .catch((err) => console.log(err));
            }}
          >
            Search By Name
          </button>
        </div>
        <div className="col">
          <input
            name="search_by_qualification"
            autoFocus
            onChange={(e) => setSearchSpeciality(e.target.value)}
            value={searchSpeciality}
            type="text"
            className="form-control"
            placeholder="Search By Speciality"
          />
          <br />
          <button
            className="btn btn-success"
            onClick={() => {
              if (searchSpeciality?.length > 0) {
                APIService.SearchBySpeciality(searchSpeciality)
                  .then((res) => setSearchResults([...res]))
                  .catch((err) => console.log(err));
              }
            }}
          >
            Search By Speciality
          </button>
        </div>
        <div className="col">
          <input
            name="search_by_id"
            autoFocus
            onChange={(e) => setSearchID(e.target.value)}
            value={searchID}
            type="text"
            className="form-control"
            placeholder="Search By Id"
          />
          <br />
          <button
            className="btn btn-success"
            onClick={() => {
              if (searchID?.length > 0)
                APIService.SearchByID(searchID)
                  .then((res) => setSearchResults([...res]))
                  .catch((err) => console.log(err));
            }}
          >
            Search By Id
          </button>
        </div>
        <button
          className="btn btn-success col-1"
          onClick={() => {
            if (searchName?.length > 0 && searchSpeciality?.length > 0) {
              var searchNameAndSpeciality = searchName + "_" + searchSpeciality;
              APIService.SearchByNameAndSpeciality(searchNameAndSpeciality)
                .then((res) => setSearchResults([...res]))
                .catch((err) => console.log(err));
            }
          }}
        >
          Search By Name And Speciality
        </button>
      </div>
      {editedDoctor && (
        <Form
          updatedData={updatedData}
          insertedDoctor={insertedDoctor}
          doctor={editedDoctor}
          closeForm={closeForm}
        />
      )}
      {searchResults?.length > 0 && (
        <SearchResultsList
          searchResults={searchResults}
          editDoctor={editDoctor}
          deleteDoctor={deletedDoctor}
        />
      )}
      <DoctorList
        doctors={doctors}
        editDoctor={editDoctor}
        deletedDoctor={deletedDoctor}
      />
    </div>
  );
}

export default App;
