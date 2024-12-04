import { useState, useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./Auth";
import { useHistory } from "react-router-dom"; // useHistory from React Router v5

const Login = () => {
    const { login, error, loading } = useContext(AuthContext); // Get login function and error from context
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useHistory(); // React Router v5 history hook

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    // Login user and handle redirection
    const loginUser = async (e) => {
        e.preventDefault();

        // Call login function with success callback for redirection
        await login(email, password, () => {
            // Redirect to the AllStudents page after successful login
            navigate.push("/AllStudents");
        });
    };

    return (
        <div className="form-container">
            <form onSubmit={loginUser}>
                <div className="sign-image">
                    <h2 className="login">Sign In</h2>
                    <img src="data:image/png;base64,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" alt="Sign In " className="login-image" />
                </div>

                <div>
                    <label>Email:</label>
                    <input type="email" name="email" placeholder="Enter your email" onChange={handleEmail} required />
                </div>

                <div>
                    <label>Password:</label>
                    <input type="password" name="password" placeholder="Enter your password" onChange={handlePassword} required />
                </div>

                <div className="fb">
                    <button type="submit" disabled={loading}>Login</button>
                    <p className="pa"><a href="">Forgot password?</a></p>        
                </div>
            </form>
        </div>
    );
};

export default Login;
