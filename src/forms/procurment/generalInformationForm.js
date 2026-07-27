import { CButton, CCol, CFormCheck, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CInputGroup, CRow } from "@coreui/react"
import useApiFetch from "../../hooks/useAPIFetch"
import { useEffect } from "react"
import { Controller, useFieldArray } from "react-hook-form"

const GeneralInformationForm = ({ nextStep, register, errors, trigger, control, setValue, getValues, companies }) => {
    const {
        data, isLoading, fetchData, errors: errorsRes
    } = useApiFetch({ url: 'create-tenders-general-info', method: 'POST' }, false)

    const {
        data: dataUpdate, isLoading: isLoadingUpdate, fetchData: fetchDataUpdate, errors: errorsResUpdate
    } = useApiFetch({ url: 'update-tenders-general-info', method: 'PUT' }, false)

    const handleNext = async () => {
        const valid = await trigger(["title", "companyID", "type", "method", "currency", "description"])
        if (valid) {
            const values = getValues()
            if (values?._id) fetchDataUpdate({
                data: {
                    id: values?._id,
                    title: values?.title,
                    type: values?.type,
                    method: values?.method,
                    currency: values?.currency,
                    description: values?.description,
                    companyID: values?.companyID,
                }
            });
            else fetchData({
                data: {
                    title: values?.title,
                    type: values?.type,
                    method: values?.method,
                    currency: values?.currency,
                    description: values?.description,
                    companyID: values?.companyID,
                }
            })
        }
    }

    useEffect(() => {
        if (!isLoading && data) {
            setValue('_id', data?.data?._id)
            nextStep();
        }
    }, [data, isLoading])

    useEffect(() => {
        if (!isLoadingUpdate && dataUpdate) nextStep();
    }, [dataUpdate, isLoadingUpdate])

    const handleTypeChange = (field, e) => {
        if (e.target.checked) field.onChange([...field.value, e.target.value]);
        else field.onChange(field.value.filter(v => v !== e.target.value))
    }

    return <div className='pb-3 rounded mb-3'>
        <p className='fw-bold h4'>General Information</p>
        <CRow>
            <CCol md={6}>
                <CCol className="mb-3">
                    <CFormLabel htmlFor="title">
                        Title
                    </CFormLabel>
                    <CFormInput
                        id="title"
                        type="text"
                        {...register('title')}
                    />
                    {errors?.title &&
                        <p className='text-danger p-0 m-0'>{errors?.title?.message}</p>
                    }
                </CCol>
                <CCol className="mb-3">
                    <CFormLabel htmlFor="method">
                        Method
                    </CFormLabel>
                    <CFormInput
                        id="method"
                        type="text"
                        {...register('method')}
                    />
                    {errors?.method &&
                        <p className='text-danger p-0 m-0'>{errors?.method?.message}</p>
                    }
                </CCol>
                <CCol className="mb-3">
                    <CFormLabel htmlFor="currency">
                        Currency
                    </CFormLabel>
                    <CFormSelect
                        id="currency"
                        {...register('currency')}
                    >
                        <option value="ETB">Ethiopian Birr</option>
                        <option value="USD">United States Dollar</option>
                    </CFormSelect>
                    {errors?.currency &&
                        <p className='text-danger p-0 m-0'>{errors?.currency?.message}</p>
                    }
                </CCol>
            </CCol>
            <CCol md={6}>
                <CRow className="mb-3">
                    <CFormLabel htmlFor="companyID">
                        Company
                    </CFormLabel>
                    <CFormSelect
                        id="companyID"
                        {...register('companyID')}
                    >
                        <option value=''>Select Company</option>
                        {companies?.map((company) =>
                            (<option value={company?._id} key={company?._id}>{company.companyName}</option>)
                        )}
                    </CFormSelect>
                    {errors?.companyID &&
                        <p className='text-danger p-0 m-0'>{errors?.companyID?.message}</p>
                    }
                </CRow>
                <CRow>
                    <CFormLabel htmlFor="type">
                        Type
                    </CFormLabel>
                    <Controller
                        name="type"
                        control={control}
                        render={({ field }) => (
                            <>
                                <CInputGroup>
                                    <CFormCheck
                                        id="product"
                                        value="product"
                                        style={{ border: '2px solid #b0bbff' }}
                                        checked={field.value.includes("product")}
                                        onChange={(e) => { handleTypeChange(field, e) }}
                                    />
                                    <CFormLabel htmlFor="product" className="ms-2">
                                        Product
                                    </CFormLabel>
                                </CInputGroup>

                                <CInputGroup>
                                    <CFormCheck
                                        id="service"
                                        value="service"
                                        style={{ border: '2px solid #b0bbff' }}
                                        checked={field.value.includes("service")}
                                        onChange={(e) => { handleTypeChange(field, e) }}
                                    />
                                    <CFormLabel htmlFor="service" className="ms-2">
                                        Service
                                    </CFormLabel>
                                </CInputGroup>
                            </>
                        )}
                    />
                    {errors?.type &&
                        <p className='text-danger p-0 m-0 ms-2'>{errors?.type?.message}</p>
                    }
                </CRow>

            </CCol>
        </CRow>

        <CRow className='mb-3'>
            <CCol md={12}>
                <CFormLabel htmlFor="description">Description</CFormLabel>
                <CFormTextarea
                    id="description"
                    placeholder="Procurment Description"
                    autoComplete="off"
                    type="text"
                    rows={3}
                    {...register('description')}
                />
                {errors?.description &&
                    <p className='text-danger p-0 m-0'>{errors?.description?.message}</p>
                }
            </CCol>
        </CRow>
        <CCol align="center" xs={12}>
            <CButton color="primary" size="md" onClick={handleNext}> Next </CButton>
        </CCol>
    </div>
}

export default GeneralInformationForm;