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

function TrackList({ tracks, onDelete, isAdmin}) {
    let trackList = tracks.map((track) => <Track
        key={track.track_id}
        track={track}
        onDelete={onDelete}
        isAdmin={isAdmin}
    ></Track>);
    let emptyTrackList = <EmptyTrackList></EmptyTrackList>;
    return (
        <div className="track-list-wrapper">
                
            {trackList.length > 0 ? trackList : <EmptyTrackList />}
        </div>
    );
}

export default TrackList;