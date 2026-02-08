import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useState } from "react";

function Register(){
    const navigate = useNavigate();
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        if(!username || !email || !password){
            setError("All fields are required");
        }

        if(password.length < 8){
            setError("Password must be at least 8 character");
            return;
        }

        try {
            setLoading(true);
            setError("");
            await api.post(
                "/users/register",
                {
                    username: username.trim().toLowerCase(),
                    email: email.trim().toLowerCase(),
                    password
                }
            )
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");            
        } finally{
            setLoading(false);
        }
    }

    return(
        <div>
            <h2>Register</h2>

            {error && <p style={{color:"red"}}>{error}</p>}

            <form onSubmit={handleRegister}>
                <div>
                    <input 
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div>
                    <input 
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                
                <div>
                    <input 
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"} 
                </button> 
            </form>
        </div>
    )
}

export default Register;