import React from "react";
import APIService from "./APIService";

const DoctorList = ({ doctors, editDoctor, deletedDoctor }) => {
  const editDoctorInList = (doctor) => {
    editDoctor(doctor);
  };

  const deleteDoctor = (doctor) => {
    APIService.DeleteDoctor(doctor.id)
      .then(() => deletedDoctor(doctor))
      .catch((err) => console.log(err));
  };
  return (
    <div className="container mt-4">
      <h2>List of Doctors</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>SPECIALITY</th>
            <th>UPDATE</th>
            <th>DELETE</th>
          </tr>
        </thead>
        {doctors.length &&
          doctors?.map((doctor) => {
            return (
              <tr key={doctor.id}>
                <td>{doctor.id}</td>
                <td>{doctor.name}</td>
                <td>{doctor.qualification}</td>
                <td>
                  <button
                    onClick={() => editDoctorInList(doctor)}
                    className="btn btn-primary"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteDoctor(doctor);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default DoctorList;
