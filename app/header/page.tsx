import { logout } from "../../app/login/actions";
import "../../app/globals.css";

const Header = () => {
    return (
        <div className="header">
            <button onClick={logout}>Log out</button>
        </div>
    )
}

export default Header;