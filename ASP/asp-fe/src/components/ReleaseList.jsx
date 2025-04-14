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
function ReleaseList({ releases }) {
    console.log("ReleaseList: " + releases);
    let releaseList = releases.map((release) => <Release
        key={release.id}
        release={release}
    ></Release>);
    let emptyReleaseList = <EmptyReleaseList></EmptyReleaseList>;
    return releaseList.length > 0 ? releaseList : emptyReleaseList;
}



export default ReleaseList;