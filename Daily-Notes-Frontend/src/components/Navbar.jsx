import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Navbar(){
    const { user, logout } = useAuth();

    return(
        <nav style={styles.nav}>
            <h3>DailyNotes</h3>

            <div style={styles.links}>
                <Link to="/">Home</Link>

                {user && <Link to="/notes">Notes</Link>}

                {!user && (
                    <>
                        <Link to={"/login"}>Login</Link>
                        <Link to={"/register"}>Register</Link>
                    </>
                )}

                {user && (
                    <>
                        <Link to={"/profile"}>Profile</Link>
                        <button onClick={logout}>Logout</button>
                    </>
                )}

            </div>
        </nav>
    )
}

const styles = {
    nav:{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 20px",
        background: "#111",
        color: "white"
    },
    links:{
        display: "flex",
        gap: "15px",
        alignItems: "center"
    },
};

export default Navbar;