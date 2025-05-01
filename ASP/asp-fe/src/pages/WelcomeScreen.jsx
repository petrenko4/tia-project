import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/commonStyles.css';
import { login } from "../services/authService";

function WelcomeScreen(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    console.log("ws props: " + JSON.stringify(props));

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (username === '' || password === '') {
            console.log('Please enter a username and password.');
            props.setError('Please enter a username and password.');
            return;
        }

        login(username, password)
            .then((response) => {
                console.log(response);
                props.setAuthStatus(true);
                if(response.isAdmin){
                    props.setIsAdmin(true);
                }
                navigate('/library');
            })
            .catch((error) => {
                console.log(error.message);
                props.setError(error.message);
            });
        props.setError('');

    };

    return (
        <div className="row mb-3 d-flex justify-content-center align-items-center ">
            <div className="col-sm-3 text-start">
                <div className="h3 py-1">Welcome to ASP</div>
            </div>
            <div className="col-sm" />
            <div className="row">
                <div className="col-sm-4">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                className="form-control"
                                value={username}
                                onChange={handleUsernameChange}
                                placeholder="Enter your username"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="Enter your password"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default WelcomeScreen;