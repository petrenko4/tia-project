import Track from "./Track";

function EmptyTrackList() {
    return <div className="row">
        <div className="col">
            <div className="py-3">
                No tracks yet
            </div>
        </div>
    </div>;
}

function TrackList({ tracks }) {
    let trackList = tracks.map((track) => <Track
        key={track.track_id}
        track={track}
    ></Track>);
    let emptyTrackList = <EmptyTrackList></EmptyTrackList>;
    return trackList.length > 0 ? trackList : emptyTrackList;
}

export { TrackList} ;