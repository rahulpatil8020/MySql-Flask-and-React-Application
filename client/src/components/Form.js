import React, { useEffect, useState } from "react";
import APIService from "./APIService";
const Form = (props) => {
  const [name, setName] = useState("");
  const [qualification, setQualification] = useState("");

  useEffect(() => {
    setName(props.doctor.name);
    setQualification(props.doctor.qualification);
  }, [props.doctor]);
  const updateDoctor = (doctor) => {
    APIService.UpdateDoctor(props.doctor.id, { name, qualification })
      .then((res) => props.updatedData(res))
      .catch((err) => console.log(err));
  };
  const insertDoctor = () => {
    APIService.InsertDoctor({ name, qualification })
      .then((res) => props.insertedDoctor(res))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            autoFocus
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="form-control"
            placeholder="Please enter Name"
          />

          <label htmlFor="qualification" className="form-label">
            Qualification
          </label>
          <input
            onChange={(e) => setQualification(e.target.value)}
            value={qualification}
            type="text"
            className="form-control"
            placeholder="Please Enter Qualification"
          />
          {props.doctor.id ? (
            <button className="btn btn-success mt-3" onClick={updateDoctor}>
              Update
            </button>
          ) : (
            <button className="btn btn-success mt-3" onClick={insertDoctor}>
              Insert
            </button>
          )}
          <button
            className="btn btn-danger mt-3 mx-3"
            onClick={() => {
              props.closeForm();
            }}
          >
            Cancle
          </button>
        </div>
      }
    </div>
  );
};

export default Form;
