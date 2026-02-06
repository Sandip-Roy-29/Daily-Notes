import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom"

function Login(){
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            api.post(
                "/users/login",
                {
                    identifier,
                    password,
                } 
            )

            navigate("/notes");
        } catch (error) {
            console.log("Login failed: ", error);
            
        }
    };

    return (
        <div>
            <h2>Login</h2>

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

                <button type="submit"> Login </button>
            </form>
        </div>
    )
}

export default Login;