import React, { useEffect, useState } from 'react'
import {
    CForm,
    CFormInput,
    CButton,
    CRow,
    CCol,
    CAlert,
    CFormTextarea,
    CInputGroup,
    CInputGroupText,
    CFormSelect,
} from '@coreui/react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import company from '../../../yup/companySchema'
import useApiFetch from '../../../hooks/useAPIFetch'

const Step4_CompanyInfo = ({ email, onBack, onSuccess }) => {
    const [error, setError] = useState('')
    const [regions, setRegions] = useState([])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(company), defaultValues: { 'email': email } });

    const { data, isLoading, errors: errorsRes, fetchData,
    } = useApiFetch({ url: 'register_company', method: 'POST' }, false)

    const {
        data: dataRegion, isLoading: isLoadingRegion,
    } = useApiFetch({ url: 'fetch-all-regions', method: 'GET' }, true) // TODO allow fetch from registeration

    useEffect(() => {
        if (!isLoadingRegion && dataRegion) {
            setRegions(dataRegion?.data?.regions ?? [])
        }
    }, [isLoadingRegion, dataRegion])

    useEffect(() => {
        if (!isLoading && data) {
            onSuccess()
        }
        else if (errorsRes?.details) {
            setError(errorsRes?.details?.response?.data?.message || 'Something went wrong')
        }
    }, [isLoading, data, errorsRes])

    const handleSubmitClick = async (data) => {
        fetchData({
            data: {
                email: data?.email,
                companyName: data?.companyName,
                registrationNumber: data?.registrationNumber,
                tinNumber: data?.tinNumber,
                licenseNumber: data?.licenseNumber,
                phoneNumber: `+251${data?.phoneNumber}`,
                website: data?.website,
                sector: data?.sector,
                establishedYear: data?.establishedYear,
                address: data?.address,
                city: data?.city,
                region: data?.region,
            }
        })
    }

    return (
        <CForm onSubmit={handleSubmit(handleSubmitClick)}>
            <h5>Step 4: Company Information</h5>

            <CCol className='my-3'>
                <CFormInput placeholder="Company Name" {...register('companyName')} />
                {errors?.companyName && <p className='text-danger my-0 py-0'>{errors?.companyName?.message}</p>}
            </CCol>

            <CCol className='my-3'>
                <CFormInput placeholder="Business Registration Number" {...register('registrationNumber')} />
                {errors?.registrationNumber && <p className='text-danger my-0 py-0'>{errors?.registrationNumber?.message}</p>}
            </CCol>

            <CCol className='my-3'>
                <CFormInput placeholder="TIN Number" {...register('tinNumber')} />
                {errors?.tinNumber && <p className='text-danger my-0 py-0'>{errors?.tinNumber?.message}</p>}
            </CCol>

            <CCol className='my-3'>
                <CFormInput placeholder="License Number" {...register('licenseNumber')} />
                {errors?.licenseNumber && <p className='text-danger my-0 py-0'>{errors?.licenseNumber?.message}</p>}
            </CCol>

            <CCol className='my-3'>
                <CFormInput placeholder="Sector / Industry" {...register('sector')} />
                {errors?.sector && <p className='text-danger my-0 py-0'>{errors?.sector?.message}</p>}
            </CCol>

            <CCol className='my-3'>
                <CFormSelect {...register('establishedYear')}>
                    <option value="">Established Year</option>
                    {
                        Array.from({ length: new Date().getFullYear() - 1900 }, (_, index) => {
                            return <option key={index} value={new Date().getFullYear() - index}>{new Date().getFullYear() - index}</option>
                        })
                    }
                </CFormSelect>
                {errors?.establishedYear && <p className='text-danger my-0 py-0'>{errors?.establishedYear?.message}</p>}
            </CCol>

            <CCol className='my-3'>
                <CInputGroup>
                    <CInputGroupText>+251</CInputGroupText>
                    <CFormInput placeholder="Phone Number" {...register('phoneNumber')} />
                </CInputGroup>
                {errors?.phoneNumber && <p className='text-danger my-0 py-0'>{errors?.phoneNumber?.message}</p>}
            </CCol>

            <CCol className='my-3'>
                <CFormInput placeholder="Website (optional)" {...register('website')} />
                {errors?.website && <p className='text-danger my-0 py-0'>{errors?.website?.message}</p>}
            </CCol>

            <CRow className='my-3'>
                <CCol md={6}>
                    <CFormSelect {...register('region')}>
                        <option value="">Select Region</option>
                        {regions?.sort((a, b) => { return a?.RegionName?.localeCompare(b?.RegionName) }).map((region, index) => {
                            return <option value={region.RegionName} key={index}>{region.RegionName}</option>
                        })}
                    </CFormSelect>
                    {errors?.region && <p className='text-danger my-0 py-0'>{errors?.region?.message}</p>}
                </CCol>

                <CCol md={6}>
                    <CFormInput placeholder="City" {...register('city')} />
                    {errors?.city && <p className='text-danger my-0 py-0'>{errors?.city?.message}</p>}
                </CCol>
            </CRow>

            <CCol className='my-3'>
                <CFormTextarea placeholder="Company Address" {...register('address')} />
                {errors?.address && <p className='text-danger my-0 py-0'>{errors?.address?.message}</p>}
            </CCol>

            {error && <CAlert color="danger">{error}</CAlert>}

            <CRow>
                <CCol>
                    <CButton color="secondary" onClick={onBack} className="w-100" disabled={isLoading}>
                        Back
                    </CButton>
                </CCol>
                <CCol>
                    <CButton type="submit" color="primary" className="w-100" disabled={isLoading}>
                        {isLoading ? 'Submitting...' : 'Continue'}
                    </CButton>
                </CCol>
            </CRow>
        </CForm>
    )
}

export default Step4_CompanyInfo
