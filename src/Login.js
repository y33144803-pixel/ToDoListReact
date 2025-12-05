// import React, { useState } from 'react';
// import service from './service';

// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             await service.login(username, password);
//             alert('Logged in successfully!');
//             window.location.href = '/'; // חזרה לדף הראשי
//         } catch (err) {
//             setError('Login failed. Please check your credentials.');
//             console.error(err);
//         }
//     };

//     return (
//         <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
//             <h2>Login</h2>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <form onSubmit={handleLogin}>
//                 <div style={{ marginBottom: '10px' }}>
//                     <input 
//                         type="text" 
//                         placeholder="Username" 
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         style={{ width: '100%', padding: '8px' }}
//                         required
//                     />
//                 </div>
//                 <div style={{ marginBottom: '10px' }}>
//                     <input 
//                         type="password" 
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         style={{ width: '100%', padding: '8px' }}
//                         required
//                     />
//                 </div>
//                 <button type="submit" style={{ padding: '10px 20px' }}>Login</button>
//             </form>
//         </div>
//     );
// };

// export default Login;

import React, { useState } from 'react';
import service from './service';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        // ✅ Validation
        if (!username.trim()) {
            setError('Username is required');
            return;
        }
        
        if (!password) {
            setError('Password is required');
            return;
        }

        setLoading(true);
        setError('');
        
        try {
            const response = await service.login(username, password);
            
            console.log('Login successful:', response);
            setUsername('');
            setPassword('');
            
            // ✅ הפנה ל-Tasks אחרי login מוצלח
            setTimeout(() => {
                navigate('/tasks');
            }, 500);
        } catch (err) {
            const errorMessage = 
                err.response?.data?.message || 
                'Login failed. Invalid username or password.';
            setError(errorMessage);
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ 
            padding: '20px', 
            maxWidth: '400px', 
            margin: '50px auto',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h2 style={{ 
                textAlign: 'center', 
                marginBottom: '30px',
                color: '#333'
            }}>
                Login
            </h2>
            
            {error && (
                <div style={{ 
                    color: '#d32f2f', 
                    backgroundColor: '#ffebee',
                    padding: '12px',
                    borderRadius: '4px',
                    marginBottom: '15px',
                    border: '1px solid #ef5350',
                    fontSize: '14px'
                }}>
                    ❌ {error}
                </div>
            )}
            
            <form onSubmit={handleLogin}>
                {/* Username Input */}
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ 
                        display: 'block', 
                        marginBottom: '5px', 
                        fontWeight: 'bold',
                        color: '#333'
                    }}>
                        Username
                    </label>
                    <input 
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ 
                            width: '100%', 
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                            fontSize: '14px',
                            boxSizing: 'border-box',
                            transition: 'border-color 0.3s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#1976d2'}
                        onBlur={(e) => e.target.style.borderColor = '#ddd'}
                        disabled={loading}
                        required
                    />
                </div>

                {/* Password Input */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ 
                        display: 'block', 
                        marginBottom: '5px', 
                        fontWeight: 'bold',
                        color: '#333'
                    }}>
                        Password
                    </label>
                    <input 
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ 
                            width: '100%', 
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                            fontSize: '14px',
                            boxSizing: 'border-box',
                            transition: 'border-color 0.3s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#1976d2'}
                        onBlur={(e) => e.target.style.borderColor = '#ddd'}
                        disabled={loading}
                        required
                    />
                </div>

                {/* Submit Button */}
                <button 
                    type="submit" 
                    style={{ 
                        width: '100%',
                        padding: '12px',
                        backgroundColor: loading ? '#ccc' : '#1976d2',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        transition: 'background-color 0.3s'
                    }}
                    onMouseEnter={(e) => {
                        if (!loading) e.target.style.backgroundColor = '#1565c0';
                    }}
                    onMouseLeave={(e) => {
                        if (!loading) e.target.style.backgroundColor = '#1976d2';
                    }}
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            {/* Link to Register */}
            <p style={{ 
                textAlign: 'center', 
                marginTop: '20px', 
                color: '#666',
                fontSize: '14px'
            }}>
                Don't have an account?{' '}
                <a 
                    href="/register"
                    style={{
                        color: '#1976d2',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                    Register here
                </a>
            </p>
        </div>
    );
};

export default Login;