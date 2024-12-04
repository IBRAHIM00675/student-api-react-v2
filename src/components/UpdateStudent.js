import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const UpdateStudent = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    coursename: "",
  });

  const history = useHistory();

  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://localhost:4000/api/getoneStudentwithCourse/${id}`)
      .then((res) => {
        setData({
          student_id: res.data.student_id,
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          gender: res.data.gender,
          coursename: res.data.course ? res.data.course.coursename : "",
        });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const saveStudent = (e) => {
    e.preventDefault();
    const payload = { ...data, course_name: data.coursename }; // Map 'coursename' to 'course_name'
    const token = sessionStorage.getItem("accessToken");
    setLoading(true);
  
    axios
      .patch(`http://localhost:4000/api/updateStudent/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        alert("Student updated successfully");
        history.push("/AllStudents");
      })
      .catch((err) => {
        alert("An error occurred while updating the record.");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  

  return (
    <div className="update-student-container">
      <form className="update-student-form" onSubmit={saveStudent}>
        <h4 className="form-title">Edit Student</h4>

        <div className="form-group">
          <label htmlFor="firstname">Firstname:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={data.firstname}
            onChange={handleChange}
            placeholder="Enter Firstname"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastname">Lastname:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={data.lastname}
            onChange={handleChange}
            placeholder="Enter Lastname"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={data.gender}
            onChange={handleChange}
            placeholder="Enter Gender"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="coursename">Course Name:</label>
          <select
            id="coursename"
            name="coursename"
            value={data.coursename}
            onChange={handleChange}
            required
          >
            <option value="">Select your course</option>
            <option value="Certificate Software Development">
              Certificate Software Development
            </option>
            <option value="Diploma Software Development">
              Diploma Software Development
            </option>
            <option value="Certificate Cyber Security">
              Certificate Cyber Security
            </option>
            <option value="Diploma Cyber Security">
              Diploma Cyber Security
            </option>
          </select>
        </div>

        <button type="submit" disabled={loading} className="update-button">
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateStudent;