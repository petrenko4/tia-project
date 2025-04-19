import { useNavigate } from "react-router-dom";


function Buttons(props) {
    const navigate = useNavigate();
    return (
        <div className="navigation-buttons" style={{ padding: '1rem', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {!props.authStatus &&<button onClick={() => navigate('/')}>Welcome</button>}
            {!props.authStatus &&<button onClick={() => navigate('/signup')}>Sign Up</button>}
            <button onClick={() => navigate('/playlists')}>Playlists</button>
            <button onClick={() => navigate('/browsing')}>Browse</button>
            <button onClick={() => navigate('/upload')}>Upload</button>
            <button onClick={() => navigate('/library')}>Library</button>
            <button onClick={() => navigate('/newRelease')}>New Release</button>
        </div>
    );
}

export default Buttons;