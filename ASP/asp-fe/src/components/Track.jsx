import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Track({ track }) {
  return (
    <div>
      <div className="row g-0 align-items-center">
        <div className="col-sm-9">
          <div className="card track-card">
            <h5 className="card-title">{track.title}</h5>
            <p className="card-text mb-2"><strong>Category:</strong> {track.category}</p>
            <audio controls className="w-100">
              <source src={track.file} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Track;