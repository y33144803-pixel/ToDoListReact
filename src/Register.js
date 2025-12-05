// // import React, { useState } from 'react';
// // import service from './service';

// // const Register = () => {
// //     const [username, setUsername] = useState('');
// //     const [password, setPassword] = useState('');
// //     const [error, setError] = useState('');
// //     const [success, setSuccess] = useState('');

// //     const handleRegister = async (e) => {
// //         e.preventDefault();
// //         try {
// //             await service.register(username, password);
// //             setSuccess('User registered successfully! You can now login.');
// //             setError('');
// //             setUsername('');
// //             setPassword('');
// //         } catch (err) {
// //             setError('Registration failed. Username might already exist.');
// //             setSuccess('');
// //             console.error(err);
// //         }
// //     };

// //     return (
// //         <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
// //             <h2>Register</h2>
// //             {error && <p style={{ color: 'red' }}>{error}</p>}
// //             {success && <p style={{ color: 'green' }}>{success}</p>}
// //             <form onSubmit={handleRegister}>
// //                 <div style={{ marginBottom: '10px' }}>
// //                     <input 
// //                         type="text" 
// //                         placeholder="Username"
// //                         value={username}
// //                         onChange={(e) => setUsername(e.target.value)}
// //                         style={{ width: '100%', padding: '8px' }}
// //                         required
// //                     />
// //                 </div>
// //                 <div style={{ marginBottom: '10px' }}>
// //                     <input 
// //                         type="password" 
// //                         placeholder="Password"
// //                         value={password}
// //                         onChange={(e) => setPassword(e.target.value)}
// //                         style={{ width: '100%', padding: '8px' }}
// //                         required
// //                     />
// //                 </div>
// //                 <button type="submit" style={{ padding: '10px 20px' }}>Register</button>
// //             </form>
// //         </div>
// //     );
// // };

// // export default Register;


// import React, { useState } from 'react';
// import service from './service';

// const Register = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const [loading, setLoading] = useState(false);

//     const handleRegister = async (e) => {
//         e.preventDefault();
        
//         // ✅ Validation בסיסי
//         if (!username.trim()) {
//             setError('Username is required');
//             return;
//         }
        
//         if (!password) {
//             setError('Password is required');
//             return;
//         }
        
//         if (password.length < 8) {
//             setError('Password must be at least 8 characters');
//             return;
//         }

//         setLoading(true);
//         setError('');
//         setSuccess('');
        
//         try {
//             const response = await service.register(username, password);
            
//             setSuccess(response.message || 'User registered successfully! You can now login.');
//             setUsername('');
//             setPassword('');
            
//             // ✅ הפנה לעמוד התחברות אחרי 2 שניות
//             // setTimeout(() => {
//             //     window.location.href = '/login';
//             // }, 2000);
            
//         } catch (err) {
//             // ✅ הודעת שגיאה מפורטת מהשרת
//             const errorMessage = 
//                 err.response?.data?.message || 
//                 err.message || 
//                 'Registration failed. Please try again.';
//             setError(errorMessage);
//             console.error('Full error:', err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div style={{ 
//             padding: '20px', 
//             maxWidth: '400px', 
//             margin: '50px auto',
//             border: '1px solid #ddd',
//             borderRadius: '8px',
//             boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//         }}>
//             <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Register</h2>
            
//             {error && (
//                 <div style={{ 
//                     color: '#d32f2f', 
//                     backgroundColor: '#ffebee',
//                     padding: '10px',
//                     borderRadius: '4px',
//                     marginBottom: '15px',
//                     border: '1px solid #ef5350'
//                 }}>
//                     {error}
//                 </div>
//             )}
            
//             {success && (
//                 <div style={{ 
//                     color: '#388e3c', 
//                     backgroundColor: '#e8f5e9',
//                     padding: '10px',
//                     borderRadius: '4px',
//                     marginBottom: '15px',
//                     border: '1px solid #66bb6a'
//                 }}>
//                     {success}
//                 </div>
//             )}
            
//             <form onSubmit={handleRegister}>
//                 <div style={{ marginBottom: '15px' }}>
//                     <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
//                         Username
//                     </label>
//                     <input 
//                         type="text"
//                         placeholder="Enter your username"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         style={{ 
//                             width: '100%', 
//                             padding: '10px',
//                             borderRadius: '4px',
//                             border: '1px solid #ddd',
//                             fontSize: '14px',
//                             boxSizing: 'border-box'
//                         }}
//                         disabled={loading}
//                         required
//                     />
//                 </div>

//                 <div style={{ marginBottom: '20px' }}>
//                     <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
//                         Password
//                     </label>
//                     <input 
//                         type="password"
//                         placeholder="Enter your password (min 8 chars)"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         style={{ 
//                             width: '100%', 
//                             padding: '10px',
//                             borderRadius: '4px',
//                             border: '1px solid #ddd',
//                             fontSize: '14px',
//                             boxSizing: 'border-box'
//                         }}
//                         disabled={loading}
//                         required
//                     />
//                     <small style={{ color: '#666', marginTop: '5px', display: 'block' }}>
//                         Must contain: uppercase, lowercase, digits, min 8 characters
//                     </small>
//                 </div>

//                 <button 
//                     type="submit" 
//                     style={{ 
//                         width: '100%',
//                         padding: '12px',
//                         backgroundColor: loading ? '#ccc' : '#1976d2',
//                         color: 'white',
//                         border: 'none',
//                         borderRadius: '4px',
//                         fontSize: '16px',
//                         fontWeight: 'bold',
//                         cursor: loading ? 'not-allowed' : 'pointer'
//                     }}
//                     disabled={loading}
//                 >
//                     {loading ? 'Registering...' : 'Register'}
//                 </button>
//             </form>

//             <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
//                 Already have an account? <a href="/login">Login here</a>
//             </p>
//         </div>
//     );
// };

// export default Register;

import React, { useState } from 'react';
import service from './service';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleRegister = async (e) => {
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
        
        if (username.length < 3) {
            setError('Username must be at least 3 characters');
            return;
        }
        
        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }
        
        if (!/[A-Z]/.test(password)) {
            setError('Password must contain at least one uppercase letter');
            return;
        }
        
        if (!/[a-z]/.test(password)) {
            setError('Password must contain at least one lowercase letter');
            return;
        }
        
        if (!/[0-9]/.test(password)) {
            setError('Password must contain at least one digit');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');
        
        try {
            const response = await service.register(username, password);
            
            setSuccess(response.message || 'User registered successfully! Redirecting to login...');
            setUsername('');
            setPassword('');
            
            // ✅ הפנה ל-Login אחרי 2 שניות
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            const errorMessage = 
                err.response?.data?.message || 
                err.message || 
                'Registration failed. Please try again.';
            setError(errorMessage);
            console.error('Full error:', err);
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
                Register
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
            
            {success && (
                <div style={{ 
                    color: '#388e3c', 
                    backgroundColor: '#e8f5e9',
                    padding: '12px',
                    borderRadius: '4px',
                    marginBottom: '15px',
                    border: '1px solid #66bb6a',
                    fontSize: '14px'
                }}>
                    ✅ {success}
                </div>
            )}
            
            <form onSubmit={handleRegister}>
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
                    <small style={{ color: '#666', marginTop: '5px', display: 'block' }}>
                        Must be 3-50 characters
                    </small>
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
                    <small style={{ color: '#666', marginTop: '5px', display: 'block' }}>
                        Requirements:
                    </small>
                    <ul style={{ 
                        margin: '5px 0 0 20px', 
                        padding: 0,
                        fontSize: '12px',
                        color: '#666'
                    }}>
                        <li>At least 8 characters</li>
                        <li>1 uppercase letter (A-Z)</li>
                        <li>1 lowercase letter (a-z)</li>
                        <li>1 digit (0-9)</li>
                    </ul>
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
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>

            {/* Link to Login */}
            <p style={{ 
                textAlign: 'center', 
                marginTop: '20px', 
                color: '#666',
                fontSize: '14px'
            }}>
                Already have an account?{' '}
                <a 
                    href="/login"
                    style={{
                        color: '#1976d2',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                    Login here
                </a>
            </p>
        </div>
    );
};

export default Register;