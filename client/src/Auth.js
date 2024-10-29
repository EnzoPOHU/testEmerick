import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');

    const validateInputs = () => {
        if (!email.includes('@')) {
            setError("Veuillez entrer un email valide");
            return false;
        }
        if (password.length < 6) {
            setError("Le mot de passe doit comporter au moins 6 caractères");
            return false;
        }
        setError('');
        return true;
    };

    const apiCall = () => {
        axios.get('http://localhost:3001')
            .then((data) => {
                console.log(data);
            })
            .catch((err) => console.error("Erreur lors de l'appel API :", err));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateInputs()) return;

        try {
            const endpoint = isLogin ? 'login' : 'signup';
            const response = await axios.post(`http://localhost:5000/${endpoint}`, { email, password });
            const token = response.data.token;

            if (token) {
                localStorage.setItem('token', token);
                if (isLogin) {
                    alert('Connexion réussie');
                    navigate('/home');
                } else {
                    alert('Inscription réussie, veuillez vous connecter.');
                    navigate('/login');
                }
            }
        } catch (err) {
            console.error(err);
            setError('Erreur lors de l\'authentification');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white gap-8">
            <h2 className="text-3xl font-bold">{isLogin ? 'Login' : 'Sign Up'}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {error && <p className="text-red-500">{error}</p>}
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="exemple@gmail.com" 
                    className="input input-lg max-w-sm" 
                    required 
                />
                <label className="input-group max-w-sm">
                    <input 
                        id="toggle-password" 
                        type="password" 
                        className="input" 
                        placeholder="Enter password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <span className="input-group-text">
                        <button 
                            type="button" 
                            data-toggle-password='{ "target": "#toggle-password" }' 
                            className="block" 
                            aria-label="password toggle"
                        >
                            <span className="icon-[tabler--eye] text-base-content/80 password-active:block hidden size-5 flex-shrink-0"></span>
                            <span className="icon-[tabler--eye-off] text-base-content/80 password-active:hidden block size-5 flex-shrink-0"></span>
                        </button>
                    </span>
                </label>
                <button 
                    type="submit" 
                    onClick={apiCall}
                    className="btn btn-primary"
                >
                    {isLogin ? 'Login' : 'Sign Up'}
                </button>
            </form>
            <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="btn btn-primary"
            >
                {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
            </button>
        </div>
    );
}
