import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown} from 'react-bootstrap'
const Navbar = () => {
  return (
    <div className="nav">
      <div className="logo">
        <Link id="logo-h1" to="/">
          <h1>Student App</h1>
        </Link>
      </div>

      <div className="nav-links">
        <Link id="links" to="/Login">Login</Link>
        <Link id="links" to="/LogOut">LogOut</Link>

        
      <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Students
      </Dropdown.Toggle>

      <Dropdown.Menu>
      <Dropdown.Item as={Link} to="/AddStudent">Add Student</Dropdown.Item>
      <Dropdown.Item as={Link} to="/AllStudents">AllStudents</Dropdown.Item>

      </Dropdown.Menu>
      </Dropdown>



      </div>
    </div>
  );
};

export default Navbar;
