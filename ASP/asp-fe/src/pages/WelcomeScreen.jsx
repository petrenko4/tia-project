import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/commonStyles.css';

const login = (username, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username === 'admin' && password === 'admin') {
                resolve();
            } else {
                reject(new Error('Invalid username or password.'));
            }
        }, 1000);
    });
};

function WelcomeScreen(props) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setLogin(event.target.value);
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
            .then(() => {
                props.setAuthStatus(true);
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
                                value={login}
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