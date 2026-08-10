import React, { useEffect, useState } from 'react'
import {
    CForm,
    CFormInput,
    CButton,
    CRow,
    CCol,
    CAlert,
} from '@coreui/react'
import useApiFetch from '../../../hooks/useAPIFetch';

const Step4_UploadFayda = ({ phoneNumber, personalInfo, userAddress, onBack, onSuccess }) => {
    const [file, setFile] = useState(null);
    const [validationError, setValidationError] = useState('');

    const { data, isLoading, errors: apiErrors, fetchData } = useApiFetch(
        { url: 'signup', method: 'POST', isFormData: true },
        false
    );

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setValidationError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setValidationError('Please upload your Fayda ID document.');
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
        formData.append('email', personalInfo.email);
        formData.append('birthDate', personalInfo.birthDate);
        formData.append('gender', personalInfo.gender);
        formData.append('password', personalInfo.password);
        formData.append('branchId', personalInfo.branchId);
        // 3. Address Mapping
        formData.append('region', userAddress.region);
        formData.append('zone', userAddress.zone);
        formData.append('wereda', userAddress.Wereda);

        // 4. File Mapping (Make sure your backend upload.array() uses this exact name)
        formData.append('nationalIdImages', file);

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
            <h5 className="mb-4 text-center">Upload Fayda ID</h5>

            <CCol md={12} className="mb-4">
                <CFormInput
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    required
                />
                <small className="text-muted mt-1 d-block">
                    Please upload a clear scan or photo of your Fayda ID.
                </small>
            </CCol>

            {validationError && <CAlert color="danger">{validationError}</CAlert>}

            {apiErrors?.isError && (
                <CAlert color="danger">
                    {apiErrors?.details?.response?.data?.message ?? apiErrors?.message ?? 'An error occurred during registration.'}
                </CAlert>
            )}

            <CRow className="mt-4">
                <CCol xs={6}>
                    <CButton color="secondary" variant="outline" onClick={onBack} className="w-100" disabled={isLoading}>
                        Back
                    </CButton>
                </CCol>
                <CCol xs={6}>
                    <CButton type="submit" color="primary" className="w-100" disabled={isLoading}>
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </CButton>
                </CCol>
            </CRow>
        </CForm>
    );
};

export default Step4_UploadFayda;