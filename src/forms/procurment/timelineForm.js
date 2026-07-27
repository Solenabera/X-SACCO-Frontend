import { CButton, CCol, CFormInput, CFormLabel, CRow } from "@coreui/react"
import useApiFetch from "../../hooks/useAPIFetch"
import { useEffect } from "react"

const TimelineForm = ({ nextStep, prevStep, register, errors, trigger, getValues }) => {
    const {
        data, isLoading, fetchData, errors: errorsRes
    } = useApiFetch({ url: 'update-tenders-timeline', method: 'PUT' }, false)

    useEffect(() => {
        if (!isLoading && data) {
            nextStep()
        }
    }, [isLoading, data])

    const handleNext = async () => {
        const valid = await trigger(["publishDate", "openingDate", "closingDate", "clarificationDate"])
        if (valid) {
            const values = getValues()
            fetchData({
                data: {
                    id: values?._id,
                    publishDate: values?.publishDate,
                    openingDate: values?.openingDate,
                    closingDate: values?.closingDate,
                    clarificationDate: values?.clarificationDate,
                }
            })
        }
    }

    return <div className='pb-3 rounded mb-3'>
        <p className='fw-bold h4'>Timeline</p>
        <CRow className='mb-3'>
            <CCol md={6}>
                <CFormLabel htmlFor="publishDate">
                    Publish Date
                </CFormLabel>
                <CFormInput
                    id="publishDate"
                    type="datetime-local"
                    {...register('publishDate')}
                />
                {errors?.publishDate &&
                    <p className='text-danger p-0 m-0'>{errors?.publishDate?.message}</p>
                }
            </CCol>
        </CRow>

        <CRow className='mb-3'>
            <CCol md={6}>
                <CFormLabel htmlFor="openingDate">
                    Opening Date
                </CFormLabel>
                <CFormInput
                    id="openingDate"
                    type="datetime-local"
                    {...register('openingDate')}
                />
                {errors?.openingDate &&
                    <p className='text-danger p-0 m-0'>{errors?.openingDate?.message}</p>
                }
            </CCol>

            <CCol md={6}>
                <CFormLabel htmlFor="closingDate">
                    Closing Date
                </CFormLabel>
                <CFormInput
                    id="closingDate"
                    type="datetime-local"
                    {...register('closingDate')}
                />
                {errors?.closingDate &&
                    <p className='text-danger p-0 m-0'>{errors?.closingDate?.message}</p>
                }
            </CCol>
        </CRow>

        <CRow className='mb-3'>
            <CCol md={6}>
                <CFormLabel htmlFor="clarificationDate">
                    Clarification Date
                </CFormLabel>
                <CFormInput
                    id="clarificationDate"
                    type="datetime-local"
                    {...register('clarificationDate')}
                />
                {errors?.clarificationDate &&
                    <p className='text-danger p-0 m-0'>{errors?.clarificationDate?.message}</p>
                }
            </CCol>
        </CRow>
        <CCol align="center" xs={12}>
            <CButton className="mx-3" color="secondary" size="md" onClick={prevStep}> Back </CButton>
            <CButton className="mx-3" color="primary" size="md" onClick={handleNext}> Next </CButton>
        </CCol>
    </div>
}

export default TimelineForm;