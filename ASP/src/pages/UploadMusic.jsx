import React, { useState } from 'react';

function UploadMusic() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'audio/mpeg') {
            setSelectedFile(file);
            setUploadStatus('');
        } else {
            setSelectedFile(null);
            setUploadStatus('Please select an MP3 file.');
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus('Please select an MP3 file first.');
            return;
        }

        setUploadStatus('Uploading...');

        await new Promise(resolve => setTimeout(resolve, 2000));

        setUploadStatus('File uploaded successfully!');
        setSelectedFile(null);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-lg">
                        <div className="card-body p-5">
                            <h1 className="card-title text-center mb-5">Upload Music</h1>
                            <div className="mb-4">
                                <input 
                                    type="file" 
                                    className="form-control form-control-lg" 
                                    onChange={handleFileChange}
                                    accept=".mp3,audio/mpeg"
                                />
                            </div>
                            <div className="d-grid">
                                <button 
                                    className="btn btn-primary btn-lg" 
                                    onClick={handleUpload}
                                    disabled={!selectedFile}
                                >
                                    Upload
                                </button>
                            </div>
                            {uploadStatus && (
                                <div className={`mt-4 alert ${uploadStatus.includes('successfully') ? 'alert-success' : 'alert-info'} p-3 fs-5`}>
                                    {uploadStatus}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadMusic;

