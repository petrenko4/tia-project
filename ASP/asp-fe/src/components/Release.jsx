import { getTracksFromRelease } from "../services/releaseService";
import TrackList from "./TrackList";
import { useState, useEffect } from "react";



function Release({ release }) {

    const [tracks, setTracksFromRelease] = useState([]);

    useEffect(() => {
        getTracksFromRelease(release.id)
            .then((tracks) => {
                setTracksFromRelease(tracks);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [release.id, release.length]);

    console.log("release name:" + release.name);
    console.log("release tracks:" + tracks.map((track) => track.title));
    console.log("release tracks length:" + tracks.length);
    return (
        <div>
            <h2>{release.name}</h2>
            <p>Type: {release.release_type}</p>
            <TrackList tracks={tracks} />
        </div>
    );
}

export default Release;