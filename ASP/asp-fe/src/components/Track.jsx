import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Track({ track }) {
  return (
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{track.title}</h5>
            <p className="card-text">{track.artist}</p>
            <p className="card-text">{track.album}</p>
            <p className="card-text">{track.releaseType}</p>
            <p className="card-text">{track.category}</p>
            <audio controls>
              <source src={`http://localhost:3000${track.file}`} type="audio/mpeg" />
            </audio>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Track;