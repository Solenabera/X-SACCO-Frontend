import { cilPlus, cilTrash } from "@coreui/icons"
import CIcon from "@coreui/icons-react"
import { CButton, CCol, CFormInput, CFormLabel, CFormSelect, CInputGroup, CInputGroupText, CRow } from "@coreui/react"
import { useEffect, useState } from "react"
import { useFieldArray } from "react-hook-form"
import customColors from "../../constants/colors"
import useApiFetch from "../../hooks/useAPIFetch"

const RequirementsForm = ({ nextStep, prevStep, register, errors, control, trigger, docTypes, getValues }) => {
    const {
        data, isLoading, fetchData, errors: errorsRes
    } = useApiFetch({ url: 'update-tenders-requirements', method: 'PUT' }, false)

    useEffect(() => {
        if (!isLoading && data) {
            nextStep()
        }
    }, [isLoading, data])

    const handleNext = async () => {
        const valid = await trigger(["existingDocuments", "otherDocuments", "minimumExperience", "deliveryLocation", "deliverySchedule"])
        if (valid) {
            const values = getValues()
            fetchData({
                data: {
                    id: values?._id,
                    minimumExperience: values?.minimumExperience,
                    deliveryLocation: values?.deliveryLocation,
                    deliverySchedule: values?.deliverySchedule,
                    existingDocuments: values?.existingDocuments,
                    otherDocuments: values?.otherDocuments,
                }
            })
        }
    }

    const { fields: fieldsExisting, append: appendExisting, remove: removeExisting } = useFieldArray({ control, name: 'existingDocuments' })
    const { fields: fieldsOther, append: appendOther, remove: removeOther } = useFieldArray({ control, name: 'otherDocuments' })

    const [otherDocument, setOtherDocument] = useState('')

    const handleExistingDoc = (e) => {
        if (!e.target.value) return;
        const selectedDoc = docTypes.find((doc) => doc?._id === e.target.value)
        appendExisting({
            id: selectedDoc?._id,
            name: selectedDoc?.documentType
        })
    }
    const handleOtherDoc = () => {
        appendOther({
            name: otherDocument
        })
        setOtherDocument('')
    }

    return <div className='pb-3 rounded mb-3'>
        <p className='fw-bold h4'>Requirements</p>
        <CRow className='mb-3'>
            <CCol md={6}>
                <CFormLabel htmlFor="existingDocuments">
                    Existing Document
                </CFormLabel>
                <CInputGroup>
                    <CFormSelect
                        id="existingDocuments"
                        onChange={handleExistingDoc}
                    >
                        <option value=''>Choose Document</option>
                        {docTypes?.filter((docType) => !fieldsExisting.some((exDoc) => docType?.documentType === exDoc?.name)).map((docType) => (
                            <option value={docType?._id} key={docType?._id}>{docType?.documentType}</option>
                        ))}
                    </CFormSelect>
                </CInputGroup>
                {errors?.existingDocuments &&
                    <p className='text-danger p-0 m-0'>{errors?.existingDocuments?.message}</p>
                }
            </CCol>

            <CCol md={6}>
                <CFormLabel htmlFor="otherDocuments">
                    Other Document
                </CFormLabel>
                <CInputGroup>
                    <CFormInput
                        id="otherDocuments"
                        value={otherDocument}
                        onChange={(e) => setOtherDocument(e.target.value)}
                    />
                    <CInputGroupText className="p-0">
                        <CButton
                            className="m-0 py-1 px-2 border-0"
                            onClick={handleOtherDoc}
                            disabled={otherDocument === '' || fieldsOther.some((doc) => doc?.name === otherDocument)}
                            title="Add document"
                        >
                            <CIcon icon={cilPlus} />
                        </CButton>
                    </CInputGroupText>
                </CInputGroup>
                {errors?.otherDocuments &&
                    <p className='text-danger p-0 m-0'>{errors?.otherDocuments?.message}</p>
                }
            </CCol>
        </CRow>

        <CRow className='mb-3'>
            <CCol md={12}>
                <CFormLabel htmlFor="requiredDocuments">
                    Required Documents
                </CFormLabel>
                <div className="d-flex flex-wrap align-items-center border rounded" style={{ minHeight: '40px' }}>
                    {fieldsExisting?.map((field, index) => {
                        return <div className="d-flex border rounded m-2 py-1 px-2" key={index}>
                            {field?.name}
                            <CButton className="m-0 p-0 mx-2 border-0" onClick={() => removeExisting(index)}>
                                <CIcon icon={cilTrash} style={{ color: customColors?.deleteBtnColor }} />
                            </CButton>
                        </div>
                    })}
                    {fieldsOther?.map((field, index) => {
                        return <div className="d-flex border rounded m-2 py-1 px-2" key={index}>
                            {field?.name}
                            <CButton className="m-0 p-0 mx-2 border-0" onClick={() => removeOther(index)}>
                                <CIcon icon={cilTrash} style={{ color: customColors?.deleteBtnColor }} />
                            </CButton>
                        </div>
                    })}
                </div>
            </CCol>
        </CRow>

        <CRow className='mb-3'>
            <CCol md={6}>
                <CFormLabel htmlFor="minimumExperience">
                    Minimum Experience (in years)
                </CFormLabel>
                <CFormInput
                    id="minimumExperience"
                    type="number"
                    min={0}
                    max={100}
                    step={0.5}
                    defaultValue={1}
                    {...register('minimumExperience')}
                />
                {errors?.minimumExperience &&
                    <p className='text-danger p-0 m-0'>{errors?.minimumExperience?.message}</p>
                }
            </CCol>
        </CRow>

        <CRow className='mb-3'>
            <CCol md={6}>
                <CFormLabel htmlFor="deliveryLocation">
                    Delivery Location
                </CFormLabel>
                <CFormInput
                    id="deliveryLocation"
                    {...register('deliveryLocation')}
                />
                {errors?.deliveryLocation &&
                    <p className='text-danger p-0 m-0'>{errors?.deliveryLocation?.message}</p>
                }
            </CCol>

            <CCol md={6}>
                <CFormLabel htmlFor="deliverySchedule">
                    Delivery Date
                </CFormLabel>
                <CFormInput
                    id="deliverySchedule"
                    type="datetime-local"
                    {...register('deliverySchedule')}
                />
                {errors?.deliverySchedule &&
                    <p className='text-danger p-0 m-0'>{errors?.deliverySchedule?.message}</p>
                }
            </CCol>
        </CRow>

        <CCol align="center" xs={12}>
            <CButton className="mx-3" color="secondary" size="md" onClick={prevStep}> Back </CButton>
            <CButton className="mx-3" color="primary" size="md" onClick={handleNext}> Next </CButton>
        </CCol>
    </div>
}

export default RequirementsForm;