import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth";

function Login(){
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState("")
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!identifier || !password){
            setError("All fields are required");
            return;
        }

        try {
            setLoading(true);
            setError("");
            await login(identifier, password);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");            
        }finally{
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Login</h2>

            {error && <p style={{color:"red"}}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <input 
                    type="text"
                    placeholder="Email or Username"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
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
                    {loading ? "Loging in..." : "Login"} 
                </button>
            </form>
        </div>
    )
}

export default Login;