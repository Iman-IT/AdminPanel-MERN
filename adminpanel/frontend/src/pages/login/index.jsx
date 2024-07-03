import React, { useState } from 'react';
import Header from '../../components/header';
import { useLogin } from '../../hooks/useLogin';  // Corrected import statement
import { useNavigate } from 'react-router-dom';
import login from '../../assets/login.jpg'
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const { login, error, isLoading } = useLogin();
const navigate=useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password, role);
        if (!error) {
            if (role === 'user') {
                navigate('/home');
            } else if (role === 'admin') {
                navigate('/adminpanel');
            }
        }
    };

    return (
        <>
            <Header />
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center h-100 ">
                    
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 card p-3">
                        <form method="post">
                            <h2 className="lead fw-bold mt-5 me-3">Sign in</h2>
                            <div className="form-outline mb-4">
                                <input
                                    type="email"
                                    className="form-control form-control-lg"
                                    placeholder="Enter a valid email address"
                                    name="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label className="form-label">Email address</label>
                            </div>
                            <div className="form-outline mb-3">
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    placeholder="Enter Password"
                                    name="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                                <label className="form-label">Password</label>
                            </div>
                            <div className="form-outline mb-3">
                                <select
                                    name="role"
                                    className="form-control form-control-lg"
                                    onChange={(e) => setRole(e.target.value)}
                                    value={role}
                                >
                                    <option value="">Select Role</option>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                                <label className="form-label">Role</label>
                            </div>
                            <button className="btn btn-primary btn-lg" onClick={handleSubmit} disabled={isLoading}>
                                Login
                            </button>
                            {error && <div className="error">{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
