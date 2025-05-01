import { getTracksFromRelease } from "../services/releaseService";
import TrackList from "./TrackList";
import { useState, useEffect } from "react";
import "../styles/Release.css";
import 'bootstrap/dist/css/bootstrap.min.css';


function Release({ release, onDelete, isAdmin }) {

    const [tracks, setTracksFromRelease] = useState([]);

    useEffect(() => {
        getTracksFromRelease(release.id)
            .then((tracks) => {
                setTracksFromRelease(tracks);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [release.id]);

    console.log("in release username: " + release.username);
    console.log("--------------------------------------------");
    console.log(JSON.stringify(tracks));

    return (
        <div className="card release-card mb-4">
            <div className="card-header release-header">
                {release.name}
            </div>
            <div className="card-body">
                <p className="release-info">By: <span className="text-muted">{release.username}</span></p>
                <p className="release-info">Type: {release.type}</p>
                <div className="track-list-wrapper">
                    <TrackList tracks={tracks} onDelete={onDelete} isAdmin={isAdmin}/>
                </div>
            </div>
        </div>
    );
}

export default Release;