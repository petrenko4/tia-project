import Release from "./Release";

function EmptyReleaseList() {
    return <div className="row">
        <div className="col">
            <div className="py-3">
                No releases yet
            </div>
        </div>
    </div>;
}
function ReleaseList({ releases, onDelete, isAdmin }) {
    console.log("ReleaseList: " + releases);
    let releaseList = releases.map((release) => <Release
        key={release.id}
        release={release}
        onDelete = {onDelete}
        isAdmin = {isAdmin}
    ></Release>);
    let emptyReleaseList = <EmptyReleaseList></EmptyReleaseList>;
    return (
        <div className="track-list-wrapper">
            {releaseList.length > 0 ? releaseList : emptyReleaseList}
        </div>
    );
}



export default ReleaseList;