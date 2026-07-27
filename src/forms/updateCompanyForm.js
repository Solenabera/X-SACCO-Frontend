import { cilPlus, cilTrash } from "@coreui/icons"
import { CButton, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CInputGroup, CInputGroupText, CRow } from "@coreui/react"
import customColors from "../constants/colors"
import { useFieldArray } from "react-hook-form"
import CIcon from "@coreui/icons-react"

const UpdateCompanyForm = ({ regions, docs, registerUpdate, errorsUpdate, handleSubmitUpdate, handleUpdateBtn, errorsResUpdate, controlUpdate, company }) => {
    const { fields, append, remove } = useFieldArray({ control: controlUpdate, name: 'users' })
    const { fields: fieldsDoc, append: appendDocs, update } = useFieldArray({ control: controlUpdate, name: 'documents' })

    const newUser = {
        email: "",
        role: ""
    }

    const handleFileChange = (e, doc) => {
        if (e?.target?.files?.length > 0) {
            const index = fieldsDoc.indexOf(doc?._id)
            if (index > -1) {
                update(index, {
                    _id: doc?.docTypeID,
                    name: doc?.docName,
                    document: e.target.files
                })
            }
            else {
                appendDocs({
                    _id: doc?.docTypeID,
                    name: doc?.docName,
                    document: e.target.files
                })
            }
        }
    }

    return <CForm onSubmit={handleSubmitUpdate(handleUpdateBtn)}>
        <CRow className="my-3">
            <CCol md={6}>
                <CFormLabel>Company Name</CFormLabel>
                <CFormInput {...registerUpdate('companyName')} />
                {errorsUpdate?.companyName && (
                    <p className='text-danger my-0 py-0'>{errorsUpdate?.companyName?.message}</p>
                )}
            </CCol>
            <CCol md={6}>
                <CFormLabel>Registration Number</CFormLabel>
                <CFormInput {...registerUpdate('registrationNumber')} />
                {errorsUpdate?.registrationNumber && (
                    <p className='text-danger my-0 py-0'>{errorsUpdate?.registrationNumber?.message}</p>
                )}
            </CCol>
        </CRow>

        <CRow className="mb-3">
            <CCol md={6}>
                <CFormLabel>TIN</CFormLabel>
                <CFormInput {...registerUpdate('tinNumber')} />
                {errorsUpdate?.tinNumber && (
                    <p className='text-danger my-0 py-0'>{errorsUpdate?.tinNumber?.message}</p>
                )}
            </CCol>
            <CCol md={6}>
                <CFormLabel>License Number</CFormLabel>
                <CFormInput {...registerUpdate('licenseNumber')} />
                {errorsUpdate?.licenseNumber && (
                    <p className='text-danger my-0 py-0'>{errorsUpdate?.licenseNumber?.message}</p>
                )}
            </CCol>
        </CRow>

        <CRow className="mb-3">
            <CCol md={6}>
                <CFormLabel>Phone Number</CFormLabel>
                <CInputGroup>
                    <CInputGroupText>+251</CInputGroupText>
                    <CFormInput {...registerUpdate('phoneNumber')} />
                </CInputGroup>
                {errorsUpdate?.phoneNumber && (
                    <p className='text-danger my-0 py-0'>{errorsUpdate?.phoneNumber?.message}</p>
                )}
            </CCol>
            <CCol md={6}>
                <CFormLabel>Sector</CFormLabel>
                <CFormInput {...registerUpdate('sector')} />
                {errorsUpdate?.sector && (
                    <p className='text-danger my-0 py-0'>{errorsUpdate?.sector?.message}</p>
                )}
            </CCol>
        </CRow>

        <CRow className="mb-3">
            <CCol md={12}>
                <CFormLabel>Website</CFormLabel>
                <CFormInput {...registerUpdate('website')} />
                {errorsUpdate?.website && (
                    <p className='text-danger my-0 py-0'>{errorsUpdate?.website?.message}</p>
                )}
            </CCol>
        </CRow>

        <CRow className="mb-3">
            <CCol md={4}>
                <CFormLabel>Established Year</CFormLabel>
                <CFormSelect {...registerUpdate('establishedYear')}>
                    <option value="">Established Year</option>
                    {
                        Array.from({ length: new Date().getFullYear() - 1900 }, (_, index) => {
                            return <option key={index} value={new Date().getFullYear() - index}>{new Date().getFullYear() - index}</option>
                        })
                    }
                </CFormSelect>
                {errorsUpdate?.establishedYear && (
                    <p className='text-danger my-0 py-0'>{errorsUpdate?.establishedYear?.message}</p>
                )}
            </CCol>
            <CCol md={4}>
                <CFormLabel>Region</CFormLabel>
                <CFormSelect {...registerUpdate('region')}>
                    <option value="">Select Region</option>
                    {regions?.sort((a, b) => { return a?.RegionName?.localeCompare(b?.RegionName) }).map((region, index) => {
                        return <option value={region.RegionName} key={index}>{region.RegionName}</option>
                    })}
                </CFormSelect>
                {errorsUpdate?.region && (
                    <p className='text-danger my-0 py-0'>{errorsUpdate?.region?.message}</p>
                )}
            </CCol>
            <CCol md={4}>
                <CFormLabel>City</CFormLabel>
                <CFormInput {...registerUpdate('city')} />
                {errorsUpdate?.city && (
                    <p className='text-danger my-0 py-0'>{errorsUpdate?.city?.message}</p>
                )}
            </CCol>
        </CRow>

        <CRow className="mb-3">
            <CCol md={12}>
                <CFormLabel>Address</CFormLabel>
                <CFormTextarea {...registerUpdate('address')} />
                {errorsUpdate?.address && (
                    <p className='text-danger my-0 py-0'>{errorsUpdate?.address?.message}</p>
                )}
            </CCol>
        </CRow>

        <CCol md={12} className="mb-3">
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
                                {...registerUpdate(`users.${index}.email`)}
                            />
                            {errorsUpdate?.users?.[index]?.email &&
                                <p className='text-danger p-0 m-0'>{errorsUpdate?.users?.[index]?.email?.message}</p>
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
                                    {...registerUpdate(`users.${index}.role`)}
                                />
                                <CInputGroupText onClick={() => remove(index)}>
                                    <CIcon icon={cilTrash} style={{ color: customColors.deleteBtnColor }} />
                                </CInputGroupText>

                                <CInputGroupText onClick={() => append(newUser)}>
                                    <CIcon icon={cilPlus} />
                                </CInputGroupText>
                            </CInputGroup>
                            {errorsUpdate?.users?.[index]?.role &&
                                <p className='text-danger p-0 m-0'>{errorsUpdate?.users?.[index]?.role?.message}</p>
                            }
                        </CCol>
                    </CRow>
                )
                )}
        </CCol>

        <CRow className="mb-3">
            <div className="d-flex align-items center">
                <p className="h4">Documents</p>
            </div>
            {
                company?.docMetaData?.map((doc, index) => (
                    <CCol key={index} md={6}>
                        <CFormLabel>
                            {doc?.docName}
                        </CFormLabel>
                        <CFormInput
                            id="document"
                            type="file"
                            onChange={(e) => { handleFileChange(e, doc) }}
                        />
                    </CCol>
                )
                )}
        </CRow>

        {errorsResUpdate?.details &&
            <p className='text-danger my-0 py-0'>{errorsResUpdate?.details?.response?.data?.message}</p>
        }

        <CCol align="center" xs={12}>
            <CButton type='submit' color="primary" size="md"> Update </CButton>
        </CCol>
    </CForm>
}

export default UpdateCompanyForm