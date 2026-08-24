import React, { useEffect, useState, useRef } from 'react'
import {
    CForm,
    CFormInput,
    CButton,
    CRow,
    CCol,
    CAlert,
} from '@coreui/react'
import useApiFetch from '../../../hooks/useAPIFetch';

// Helper to convert base64 data URL to a File object
const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
};

const Step4_UploadFaydaAndPersonalPhoto = ({ phoneNumber, personalInfo, userAddress, onBack, onSuccess }) => {
    const [nationalIdFile, setNationalIdFile] = useState(null);
    const [personalPhotoFile, setPersonalPhotoFile] = useState(null);
    const [validationError, setValidationError] = useState('');

    // Webcam states
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [stream, setStream] = useState(null);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [cameraError, setCameraError] = useState('');
    const [isFlashing, setIsFlashing] = useState(false);
    const [countdown, setCountdown] = useState(null);

    const videoRef = useRef(null);
    const streamRef = useRef(null);

    // Keep stream ref updated to avoid stale closure on unmount
    useEffect(() => {
        streamRef.current = stream;
    }, [stream]);

    // Cleanup camera stream on unmount
    useEffect(() => {
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    // Bind stream to video element
    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream, isCameraActive]);

    // 5-second auto capture countdown effect
    useEffect(() => {
        let timer;
        if (countdown !== null && countdown > 0) {
            timer = setTimeout(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
        } else if (countdown === 0) {
            capturePhoto();
            setCountdown(null);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [countdown]);

    const { data, isLoading, errors: apiErrors, fetchData } = useApiFetch(
        { url: 'signup', method: 'POST', isFormData: true },
        false
    );

    const handleNationalIdChange = (e) => {
        setNationalIdFile(e.target.files[0]);
        setValidationError('');
    };

    const startCamera = async () => {
        setCameraError('');
        setCapturedPhoto(null);
        setPersonalPhotoFile(null);
        setCountdown(null);
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { width: 640, height: 480, facingMode: 'user' },
                audio: false
            });
            setStream(mediaStream);
            setIsCameraActive(true);
            setCountdown(5); // Start the 5-second countdown
        } catch (err) {
            console.error("Camera access error:", err);
            setCameraError("Unable to access camera. Please ensure permissions are granted.");
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        setIsCameraActive(false);
        setCountdown(null);
    };

    const capturePhoto = () => {
        const videoElement = videoRef.current;
        if (videoElement && streamRef.current) {
            const videoWidth = videoElement.videoWidth || 640;
            const videoHeight = videoElement.videoHeight || 480;

            // Target 3:4 aspect ratio (portrait)
            const targetHeight = videoHeight;
            const targetWidth = Math.round(targetHeight * (3 / 4));
            const startX = Math.round((videoWidth - targetWidth) / 2);
            const startY = 0;

            const canvasElement = document.createElement('canvas');
            canvasElement.width = targetWidth;
            canvasElement.height = targetHeight;
            const context = canvasElement.getContext('2d');

            // Mirror image and crop centered 3:4 region
            context.translate(canvasElement.width, 0);
            context.scale(-1, 1);
            context.drawImage(
                videoElement,
                startX, startY, targetWidth, targetHeight,
                0, 0, targetWidth, targetHeight
            );
            context.setTransform(1, 0, 0, 1, 0, 0);

            const dataUrl = canvasElement.toDataURL('image/jpeg', 0.9);
            setCapturedPhoto(dataUrl);

            // Shutter flash effect
            setIsFlashing(true);
            setTimeout(() => {
                setIsFlashing(false);
            }, 150);

            const file = dataURLtoFile(dataUrl, 'personal-photo.jpg');
            setPersonalPhotoFile(file);
            stopCamera();
        }
    };

    const retakePhoto = () => {
        setCapturedPhoto(null);
        setPersonalPhotoFile(null);
        startCamera();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nationalIdFile) {
            setValidationError('Please upload your Fayda ID document.');
            return;
        }

        if (!personalPhotoFile) {
            setValidationError('Please capture your live personal photo.');
            return;
        }

        const formData = new FormData();

        // 1. Phone Number Mapping
        formData.append('phoneNumber', phoneNumber);

        // 2. Personal Info Mapping
        formData.append('firstName', personalInfo.firstName);
        formData.append('middleName', personalInfo.middleName);
        formData.append('lastName', personalInfo.lastName);
        formData.append('nationalId', personalInfo.nationalId); // Matches 'national_id' in schema
        formData.append('email', personalInfo.email || '');
        formData.append('birthDate', personalInfo.birthDate);
        formData.append('gender', personalInfo.gender);
        formData.append('password', personalInfo.password);
        formData.append('branchId', personalInfo.branchId);

        // 3. Address Mapping
        formData.append('region', userAddress.region);
        formData.append('zone', userAddress.zone);
        formData.append('wereda', userAddress.wereda || userAddress.Wereda);

        // 4. File Mapping (corresponds to backend multer field check)
        formData.append('nationalIdImages', nationalIdFile);
        formData.append('personalPhoto', personalPhotoFile);

        console.log(formData)
        // Execute API Call
        fetchData({ data: formData });
    };

    // Watch for successful API response
    useEffect(() => {
        if (data && !apiErrors?.isError && !isLoading) {
            onSuccess();
        }
    }, [data, apiErrors, isLoading, onSuccess]);

    return (
        <CForm onSubmit={handleSubmit}>
            <h5 className="mb-4 text-center fw-bold" style={{ color: '#0f4c81' }}>Upload Fayda & Personal Photo</h5>

            {/* 1. Fayda ID Upload Section */}
            <CCol md={12} className="mb-4">
                <label className="form-label small fw-semibold text-secondary">Fayda ID Document Scan</label>
                <CFormInput
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleNationalIdChange}
                    required
                />
                <small className="text-muted mt-1 d-block">
                    Please upload a clear scan or photo of your Fayda National ID.
                </small>
            </CCol>

            {/* 2. Personal Photo Webcam Section */}
            <CCol md={12} className="mb-4">
                <label className="form-label small fw-semibold text-secondary d-block">Live Personal Photo Registration</label>

                {/* Webcam Window Container */}
                <div
                    className="position-relative overflow-hidden bg-dark d-flex align-items-center justify-content-center border mx-auto"
                    style={{
                        width: '240px',
                        height: '320px',
                        borderRadius: '12px',
                        borderColor: '#dee2e6',
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)'
                    }}
                >
                    {/* Dark/Shutter Flash */}
                    {isFlashing && (
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: '#ffffff',
                                zIndex: 10,
                                opacity: 0.9
                            }}
                        />
                    )}

                    {/* Camera Offline Placeholder */}
                    {!isCameraActive && !capturedPhoto && (
                        <div className="text-center p-3 text-white-50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-camera-fill mb-2 text-muted" viewBox="0 0 16 16">
                                <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0" />
                            </svg>
                            <p className="small mb-2">Webcam capture is required for photo verification</p>
                            <CButton color="primary" size="sm" className="fw-semibold px-3" onClick={startCamera}>
                                Enable Camera
                            </CButton>
                        </div>
                    )}

                    {/* Active Camera View */}
                    {isCameraActive && (
                        <div className="w-100 h-100 position-relative">
                            <video
                                ref={videoRef}
                                id="webcam-video"
                                autoPlay
                                playsInline
                                muted
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transform: 'scaleX(-1)' // Mirror stream
                                }}
                            />

                            {/* Visual KYC Oval Cutout */}
                            <svg viewBox="0 0 300 400" className="position-absolute top-0 start-0 w-100 h-100" style={{ pointerEvents: 'none', zIndex: 2 }}>
                                <defs>
                                    <mask id="cutout">
                                        <rect width="300" height="400" fill="white" />
                                        <ellipse cx="150" cy="170" rx="72" ry="96" fill="black" />
                                    </mask>
                                </defs>
                                <rect width="300" height="400" fill="rgba(15, 76, 129, 0.45)" mask="url(#cutout)" />
                                <ellipse cx="150" cy="170" rx="72" ry="96" fill="none" stroke="#20c997" strokeWidth="3" strokeDasharray="8,6" />
                                <text x="150" y="300" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
                                    Position face inside oval
                                </text>
                            </svg>

                            {/* Countdown Timer Overlay */}
                            {countdown !== null && (
                                <div
                                    className="position-absolute d-flex flex-column align-items-center justify-content-center"
                                    style={{
                                        top: '40%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        zIndex: 4,
                                        pointerEvents: 'none'
                                    }}
                                >
                                    <style>{`
                                        @keyframes pulse-countdown {
                                            0% { transform: scale(1); opacity: 0.9; }
                                            50% { transform: scale(1.15); opacity: 1; }
                                            100% { transform: scale(1); opacity: 0.9; }
                                        }
                                    `}</style>
                                    <div
                                        className="d-flex align-items-center justify-content-center rounded-circle text-white fw-bold shadow-lg"
                                        style={{
                                            width: '76px',
                                            height: '76px',
                                            fontSize: '2.8rem',
                                            backgroundColor: 'rgba(15, 76, 129, 0.85)',
                                            border: '3px solid #20c997',
                                            animation: 'pulse-countdown 1s infinite'
                                        }}
                                    >
                                        {countdown}
                                    </div>
                                    <div
                                        className="mt-2 px-3 py-1 rounded bg-dark text-white fw-bold shadow-sm"
                                        style={{ fontSize: '0.72rem', letterSpacing: '0.08em' }}
                                    >
                                        AUTO-CAPTURING
                                    </div>
                                </div>
                            )}

                            {/* Capture Overlay Control */}
                            <div className="position-absolute bottom-2 start-50 translate-middle-x" style={{ zIndex: 5 }}>
                                <CButton
                                    color="danger"
                                    className="rounded-circle d-flex align-items-center justify-content-center p-2 shadow"
                                    style={{ width: '48px', height: '48px', border: '3px solid white' }}
                                    onClick={capturePhoto}
                                    title="Take Photo"
                                >
                                    <div className="bg-white rounded-circle" style={{ width: '16px', height: '16px' }} />
                                </CButton>
                            </div>
                        </div>
                    )}

                    {/* Captured Image Preview */}
                    {capturedPhoto && (
                        <div className="w-100 h-100 position-relative">
                            <img
                                src={capturedPhoto}
                                alt="Captured Live registration photo"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            {/* Success Badge */}
                            <div
                                className="position-absolute top-2 end-2 bg-success text-white px-2.5 py-1 rounded-pill small fw-bold d-flex align-items-center gap-1.5 shadow"
                                style={{ fontSize: '0.78rem' }}
                            >
                                <span style={{ width: '6px', height: '6px', backgroundColor: 'white', borderRadius: '50%' }} />
                                Photo Captured
                            </div>

                            {/* Control Overlay */}
                            <div className="position-absolute bottom-3 start-50 translate-middle-x d-flex gap-2" style={{ zIndex: 5 }}>
                                <CButton color="light" size="sm" className="fw-semibold px-3 shadow" onClick={retakePhoto}>
                                    Retake Photo
                                </CButton>
                            </div>
                        </div>
                    )}
                </div>

                {cameraError && <small className="text-danger mt-1.5 d-block">{cameraError}</small>}
            </CCol>

            {validationError && <CAlert color="danger" className="py-2.5 small fw-semibold">{validationError}</CAlert>}

            {apiErrors?.isError && (
                <CAlert color="danger" className="py-2.5 small">
                    {apiErrors?.details?.response?.data?.message ?? apiErrors?.message ?? 'An error occurred during registration.'}
                </CAlert>
            )}

            {/* Back & Submit Actions */}
            <CRow className="mt-4">
                <CCol xs={6}>
                    <CButton
                        color="secondary"
                        variant="outline"
                        onClick={() => {
                            stopCamera();
                            onBack();
                        }}
                        className="w-100 fw-semibold"
                        disabled={isLoading}
                    >
                        Back
                    </CButton>
                </CCol>
                <CCol xs={6}>
                    <CButton
                        type="submit"
                        color="primary"
                        className="w-100 fw-bold"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </CButton>
                </CCol>
            </CRow>
        </CForm>
    );
};

export default Step4_UploadFaydaAndPersonalPhoto;