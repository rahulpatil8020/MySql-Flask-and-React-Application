export default class APIService {
  static UpdateDoctor(id, body) {
    console.log(id, body);
    return fetch(`http://127.0.0.1:5000/update/${id}/`, {
      method: "PATCH", // Use "PATCH" for updating
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        // Handle the response data here
        console.log("Updated doctor:", data);
        return data; // You can return the data if needed
      })
      .catch((error) => {
        console.error("Error updating doctor:", error);
        throw error;
      });
  }

  static InsertDoctor(body) {
    return fetch(`http://127.0.0.1:5000/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  }

  static DeleteDoctor(id) {
    console.log("Deleting", id);
    return fetch(`http://127.0.0.1:5000/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }

  static SearchByID(id) {
    return fetch(`http://127.0.0.1:5000/get/id/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }

  static SearchByName(name) {
    return fetch(`http://127.0.0.1:5000/get/name/${name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }

  static SearchBySpeciality(speciality) {
    return fetch(`http://127.0.0.1:5000/get/speciality/${speciality}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }
  static SearchByNameAndSpeciality(namespec) {
    return fetch(`http://127.0.0.1:5000/get/name_spec/${namespec}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }
}
