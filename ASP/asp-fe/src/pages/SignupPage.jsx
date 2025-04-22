import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../services/authService';

function SignUpPage(props) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === '' || email === '' || password === '' || confirmPassword === '') {
            props.setError('All fields are required!');
            return;
        }

        if (password !== confirmPassword) {
            props.setError('Passwords do not match!');
            return;
        }

        signUp(username, email, password)
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                console.log(error.message);
                props.setError(error.message)
            });

        props.setError('');
    };
    
    return (
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
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Enter your email"
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
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="form-control"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            placeholder="Confirm your password"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignUpPage;