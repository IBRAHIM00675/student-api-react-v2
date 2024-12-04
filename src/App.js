import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Login from './components/Login';
import AddStudent from './components/AddStudent.js';
import AllStudents from './components/AllStudents.js';
import UpdateStudent from './components/UpdateStudent.js';
import { AuthContext } from './components/Auth.js';
import LogOut from './components/Logout.js';

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <div className="App">
        <div className="content">
          <Switch>
              <Route exact path="/">
                <Login/>
              </Route>
              <Route  path="/AddStudent">
                <AddStudent/>
              </Route>
              <Route path="/AllStudents">
                <AllStudents/>
              </Route>
              <Route  path="/LogOut">
                <LogOut/>
              </Route>
              <Route  path="/UpdateStudent/:id">
                <UpdateStudent/>
              </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
