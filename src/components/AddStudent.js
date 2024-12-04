import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const AddStudent = () => {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    course_id: ""  // Store course_id instead of coursename
  });

  // Mapping of courses with their corresponding IDs
  const courses = [
    { id: 1, name: "Certificate Software Development" },
    { id: 2, name: "Diploma Software Development" },
    { id: 3, name: "Certificate Cyber Security" },
    { id: 4, name: "Diploma Cyber Security" }
  ];

  // Handle input changes
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Handle course selection
  const handleCourseChange = (e) => {
    const selectedCourseName = e.target.value;
    const selectedCourse = courses.find(course => course.name === selectedCourseName);
    if (selectedCourse) {
      setData({ ...data, course_id: selectedCourse.id });  // Set course_id based on selected name
    }
  };

  // Save student to the backend
  const saveStudent = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("access_token");

    axios
      .post('http://localhost:4000/api/addStudent', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        toast.success("Student added successfully!");
      })
      .catch((error) => {
        toast.error("Failed to add student. Please try again.");
      });
  };

  return (
    <div className="form-container">
      <h2 className="add">Add New Student</h2>
      <form onSubmit={saveStudent}>
        <div>
          <label>Firstname:</label>
          <input 
            type="text" 
            name="firstname" 
            placeholder="Enter first name"  
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>Lastname:</label>
          <input type="text"name="lastname" placeholder="Enter last name" onChange={handleChange} required/>
        </div>
        <div>
          <label>Gender:</label>
          <input  type="text"  name="gender"  placeholder="Enter gender" onChange={handleChange} required  />
        </div>

        <div>
          <label>Coursename:</label>
          <input
            list="course-options"
            name="course_name"
            placeholder="Enter or select a course"
            value={data.course_id ? courses.find(course => course.id === data.course_id)?.name : ""}
            onChange={handleCourseChange} // Handle course name selection
            required
          />
          <datalist id="course-options">
            {courses.map((course) => (
              <option key={course.id} value={course.name} />
            ))}
          </datalist>
        </div>    

        <button type="submit">Add Student</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddStudent;
