import React from "react";

const SearchResultsList = ({ searchResults, deleteDoctor, editDoctor }) => {
  return (
    <div>
      <div className="container mt-4">
        <h2>Search Result</h2>
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
          {searchResults.length &&
            searchResults?.map((doctor) => {
              return (
                <tr key={doctor.id}>
                  <td>{doctor.id}</td>
                  <td>{doctor.name}</td>
                  <td>{doctor.qualification}</td>
                  <td>
                    <button
                      onClick={() => {
                        editDoctor(doctor);
                      }}
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
                        console.log("delete");
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
    </div>
  );
};

export default SearchResultsList;
