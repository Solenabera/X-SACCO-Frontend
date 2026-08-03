import { CButton, CCol, CFormCheck, CFormInput, CFormLabel, CRow } from "@coreui/react"
import useApiFetch from "../../hooks/useAPIFetch"
import { useEffect } from "react"

const FinancialInformationForm = ({ nextStep, prevStep, register, errors, control, trigger, watch, getValues }) => {
    const {
        data, isLoading, fetchData, errors: errorsRes
    } = useApiFetch({ url: 'update-tenders-financial-information', method: 'PUT' }, false)

    useEffect(() => {
        if (!isLoading && data) {
            nextStep()
        }
    }, [isLoading, data])

    const bidSecurityRequired = watch('bidSecurityRequired')

    const handleNext = async () => {
        const valid = await trigger(["budget", "bidSecurityRequired", "bidSecurityAmount", "bidSecurityFrom", "paymentTerm"])
        if (valid) {
            const values = getValues()
            fetchData({
                data: {
                    id: values?._id,
                    budget: values?.budget,
                    bidSecurityRequired: values?.bidSecurityRequired,
                    bidSecurityAmount: values?.bidSecurityAmount,
                    bidSecurityFrom: values?.bidSecurityFrom,
                    paymentTerm: values?.paymentTerm,
                }
            })
        }
    }

    return <div className='pb-3 rounded mb-3'>
        <p className='fw-bold h4'>Financial Information</p>
        <CRow className='mb-3'>
            <CCol md={6}>
                <CFormLabel htmlFor="budget">
                    Budget <span className="text-secondary">( This will not be visible to suppliers. )</span>
                </CFormLabel>
                <CFormInput
                    id="budget"
                    type="number"
                    {...register('budget')}
                />
                {errors?.budget &&
                    <p className='text-danger p-0 m-0'>{errors?.budget?.message}</p>
                }
            </CCol>
        </CRow>

        <CRow className='mb-3'>
            <CCol md={6}>
                <CFormCheck
                    id="bidSecurityRequired"
                    {...register('bidSecurityRequired')}
                    style={{ border: '2px solid #b0bbff' }}
                />
                <CFormLabel htmlFor="bidSecurityRequired" className="ms-2">
                    Bid Security Required
                </CFormLabel>
                {errors?.bidSecurityRequired &&
                    <p className='text-danger p-0 m-0'>{errors?.bidSecurityRequired?.message}</p>
                }
            </CCol>
        </CRow>

        {bidSecurityRequired &&
            <CRow className='mb-3'>
                <CCol md={4}>
                    <CFormLabel htmlFor="bidSecurityAmount">
                        Amount
                    </CFormLabel>
                    <CFormInput
                        id="bidSecurityAmount"
                        type="number"
                        {...register('bidSecurityAmount')}
                    />
                    {errors?.bidSecurityAmount &&
                        <p className='text-danger p-0 m-0'>{errors?.bidSecurityAmount?.message}</p>
                    }
                </CCol>
                <CCol md={4}>
                    <CFormLabel htmlFor="bidSecurityFrom">
                        From
                    </CFormLabel>
                    <CFormInput
                        id="bidSecurityFrom"
                        type="text"
                        {...register('bidSecurityFrom')}
                    />
                    {errors?.bidSecurityFrom &&
                        <p className='text-danger p-0 m-0'>{errors?.bidSecurityFrom?.message}</p>
                    }
                </CCol>
                <CCol md={4}>
                    <CFormLabel htmlFor="paymentTerm">
                        Payment Term
                    </CFormLabel>
                    <CFormInput
                        id="paymentTerm"
                        type="text"
                        {...register('paymentTerm')}
                    />
                    {errors?.paymentTerm &&
                        <p className='text-danger p-0 m-0'>{errors?.paymentTerm?.message}</p>
                    }
                </CCol>
            </CRow>
        }
        <CCol align="center" xs={12}>
            <CButton className="mx-3" color="secondary" size="md" onClick={prevStep}> Back </CButton>
            <CButton className="mx-3" color="primary" size="md" onClick={handleNext}> Next </CButton>
        </CCol>
    </div>
}

export default FinancialInformationForm;