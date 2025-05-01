import { logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function Header(props) {

    const navigate = useNavigate();

    function handleLogout() {
        logout()
            .then(() => {
                props.setAuthStatus(false);
                props.setIsAdmin(false);
                navigate('/');
            })
            .catch((error) => {
                console.log(error.message);
                props.setError(error.message)
            });
    }

    console.log("header props: " + JSON.stringify(props));

    return (
    <>
        <div className="row mb-3">
            <div className="col-sm-6 d-flex align-items-center">
                <h3 className="mb-0">ASP</h3>
                {props.isAdmin && (
                    <small className="text-muted ms-2">(logged as admin)</small>
                )}
            </div>
            <div className="col-sm" />
            <div className="col-sm-3 py-2">
                {props.authStatus &&
                    <button
                        className="navigation-buttons"
                        onClick={handleLogout}>
                        Logout
                    </button>}
            </div>
        </div>
        <div className="row">
            {props.error && <div className="alert alert-danger mt-2">
                <p className="text-danger">{props.error}</p>
            </div>}
        </div>
    </>
);

}

export default Header;