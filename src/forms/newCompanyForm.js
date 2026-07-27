import { cilPlus, cilTrash } from "@coreui/icons"
import CIcon from "@coreui/icons-react"
import { CButton, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CInputGroup, CInputGroupText, CRow } from "@coreui/react"
import { useState } from "react"
import { useFieldArray } from "react-hook-form"
import customColors from "../constants/colors"

const NewCompanyForm = ({ regions, registerInsert, fieldsInsert, errorsInsert, handleSubmitInsert, handleInsertBtn, errorsRes, controlInsert }) => {
    const { fields, append, remove } = useFieldArray({ control: controlInsert, name: 'users' })

    const newUser = {
        email: "",
        role: ""
    }

    return <CForm onSubmit={handleSubmitInsert(handleInsertBtn)}>
        <CRow className="my-2">
            <CCol md={6}>
                <CFormLabel>Company Name</CFormLabel>
                <CFormInput {...registerInsert('companyName')} />
                {errorsInsert?.companyName && (
                    <p className='text-danger my-0 py-0'>{errorsInsert?.companyName?.message}</p>
                )}
            </CCol>
            <CCol md={6}>
                <CFormLabel>Registration Number</CFormLabel>
                <CFormInput {...registerInsert('registrationNumber')} />
                {errorsInsert?.registrationNumber && (
                    <p className='text-danger my-0 py-0'>{errorsInsert?.registrationNumber?.message}</p>
                )}
            </CCol>
        </CRow>

        <CRow className="mb-2">
            <CCol md={6}>
                <CFormLabel>TIN</CFormLabel>
                <CFormInput {...registerInsert('tinNumber')} />
                {errorsInsert?.tinNumber && (
                    <p className='text-danger my-0 py-0'>{errorsInsert?.tinNumber?.message}</p>
                )}
            </CCol>
            <CCol md={6}>
                <CFormLabel>License Number</CFormLabel>
                <CFormInput {...registerInsert('licenseNumber')} />
                {errorsInsert?.licenseNumber && (
                    <p className='text-danger my-0 py-0'>{errorsInsert?.licenseNumber?.message}</p>
                )}
            </CCol>
        </CRow>

        <CRow className="mb-2">
            <CCol md={6}>
                <CFormLabel>Phone Number</CFormLabel>
                <CInputGroup>
                    <CInputGroupText>+251</CInputGroupText>
                    <CFormInput {...registerInsert('phoneNumber')} />
                </CInputGroup>
                {errorsInsert?.phoneNumber && (
                    <p className='text-danger my-0 py-0'>{errorsInsert?.phoneNumber?.message}</p>
                )}
            </CCol>
            <CCol md={6}>
                <CFormLabel>Sector</CFormLabel>
                <CFormInput {...registerInsert('sector')} />
                {errorsInsert?.sector && (
                    <p className='text-danger my-0 py-0'>{errorsInsert?.sector?.message}</p>
                )}
            </CCol>
        </CRow>

        <CRow className="mb-2">
            <CCol md={12}>
                <CFormLabel>Website</CFormLabel>
                <CFormInput {...registerInsert('website')} />
                {errorsInsert?.website && (
                    <p className='text-danger my-0 py-0'>{errorsInsert?.website?.message}</p>
                )}
            </CCol>
        </CRow>

        <CRow className="mb-2">
            <CCol md={4}>
                <CFormLabel>Established Year</CFormLabel>
                <CFormSelect {...registerInsert('establishedYear')}>
                    <option value="">Established Year</option>
                    {
                        Array.from({ length: new Date().getFullYear() - 1900 }, (_, index) => {
                            return <option key={index} value={new Date().getFullYear() - index}>{new Date().getFullYear() - index}</option>
                        })
                    }
                </CFormSelect>
                {errorsInsert?.establishedYear && (
                    <p className='text-danger my-0 py-0'>{errorsInsert?.establishedYear?.message}</p>
                )}
            </CCol>
            <CCol md={4}>
                <CFormLabel>Region</CFormLabel>
                <CFormSelect {...registerInsert('region')}>
                    <option value="">Select Region</option>
                    {regions?.sort((a, b) => { return a?.RegionName?.localeCompare(b?.RegionName) }).map((region, index) => {
                        return <option value={region.RegionName} key={index}>{region.RegionName}</option>
                    })}
                </CFormSelect>
                {errorsInsert?.region && (
                    <p className='text-danger my-0 py-0'>{errorsInsert?.region?.message}</p>
                )}
            </CCol>
            <CCol md={4}>
                <CFormLabel>City</CFormLabel>
                <CFormInput {...registerInsert('city')} />
                {errorsInsert?.city && (
                    <p className='text-danger my-0 py-0'>{errorsInsert?.city?.message}</p>
                )}
            </CCol>
        </CRow>

        <CRow className="mb-2">
            <CCol md={12}>
                <CFormLabel>Address</CFormLabel>
                <CFormTextarea {...registerInsert('address')} />
                {errorsInsert?.address && (
                    <p className='text-danger my-0 py-0'>{errorsInsert?.address?.message}</p>
                )}
            </CCol>
        </CRow>

        <CCol md={12} className="mb-2">
            <div className="d-flex align-items center">
                <p className="h4">Users in this company</p>
                <div>
                    <CButton className="ms-2" color="primary" onClick={() => append(newUser)} title="Add user">
                        <CIcon icon={cilPlus} />
                    </CButton>
                </div>
            </div>
            {
                fields?.map((user, index) => (
                    <CRow key={index}>
                        <CCol md={6}>
                            <CFormLabel htmlFor="email">
                                Email
                            </CFormLabel>
                            <CFormInput
                                id="email"
                                type="text"
                                {...registerInsert(`users.${index}.email`)}
                            />
                            {errorsInsert?.users?.[index]?.email &&
                                <p className='text-danger p-0 m-0'>{errorsInsert?.users?.[index]?.email?.message}</p>
                            }
                        </CCol>
                        <CCol md={6}>
                            <CFormLabel htmlFor="role">
                                Role
                            </CFormLabel>
                            <CInputGroup>
                                <CFormInput
                                    id="role"
                                    type="text"
                                    {...registerInsert(`users.${index}.role`)}
                                />
                                <CInputGroupText onClick={() => remove(index)}>
                                    <CIcon icon={cilTrash} style={{ color: customColors.deleteBtnColor }} />
                                </CInputGroupText>

                                <CInputGroupText onClick={() => append(newUser)}>
                                    <CIcon icon={cilPlus} />
                                </CInputGroupText>
                            </CInputGroup>
                            {errorsInsert?.users?.[index]?.role &&
                                <p className='text-danger p-0 m-0'>{errorsInsert?.users?.[index]?.role?.message}</p>
                            }
                        </CCol>
                    </CRow>
                )
                )}
        </CCol>

        <CRow className="mb-2">
            <div className="d-flex align-items center">
                <p className="h4">Documents</p>
            </div>
            {
                fieldsInsert?.map((doc, index) => (
                    <CCol key={index} md={6}>
                        <CFormLabel htmlFor="document">
                            {doc?.name}
                        </CFormLabel>
                        <CFormInput
                            id="document"
                            type="file"
                            {...registerInsert(`documents.${index}.document`)}
                        />
                        {errorsInsert?.documents?.[index]?.document &&
                            <p className='text-danger p-0 m-0'>{errorsInsert?.documents?.[index]?.document?.message}</p>
                        }
                    </CCol>
                )
                )}
        </CRow>

        {errorsRes?.details &&
            <p className='text-danger my-0 py-0'>{errorsRes?.details?.response?.data?.message}</p>
        }

        <CCol align="center" xs={12}>
            <CButton type='submit' color="primary" size="md"> Add </CButton>
        </CCol>
    </CForm>
}

export default NewCompanyForm