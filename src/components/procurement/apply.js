import customColors from "../../constants/colors"
import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormCheck, CFormInput, CFormLabel, CFormSelect, CInputGroup, CInputGroupText, CRow, CSpinner, CTab, CTabContent, CTabList, CTabPanel, CTabs } from "@coreui/react"
import { formatDate, formatDateInput } from "../../utils/dateFormatter"
import procurementApply from "../../yup/procurementApplySchema";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useApiFetch from "../../hooks/useAPIFetch";
import { cilCheckCircle, cilPlus, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { useContext, useEffect } from "react";
import { ToasterContext } from "../../providers/toastProvider";
import Toast from "../Toast";

const Apply = ({ procurement, setApplyModal }) => {
    const { addToast } = useContext(ToasterContext)

    const {
        data: dataBid,
        isLoading: isLoadingBid,
        fetchData: fetchDataBid,
    } = useApiFetch({ url: 'fetch-applied-bid-by-company-using-page-and-limit-purchaser-side', method: 'POST' }, false)

    const {
        data,
        isLoading,
        fetchData,
        errors: errorsInsert
    } = useApiFetch({ url: 'create-supplier-bid', method: 'POST' }, false)

    const {
        data: dataCompanies,
        isLoading: isLoadingCompanies,
    } = useApiFetch({ url: 'fetch-personal-company-data', method: 'GET' }, true)

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        watch,
        reset,
        setValue
    } = useForm({
        resolver: yupResolver(procurementApply),
        defaultValues: {
            tenderID: procurement?._id,
            deliverySchedule: procurement?.Requirement?.[0]?.deliverySchedule,
            products: procurement?.LineItems?.map(item => {
                return {
                    _id: item?._id,
                    quantity: item?.quantity,
                    deliverable: true,
                    deliveryDate: item?.deliverySchedule,
                    price: 0
                }
            }),
            services: procurement?.Services?.map(service => {
                return {
                    _id: service?._id,
                    price: 0
                }
            }),
            documents: [
                ...procurement?.Requirement?.[0]?.existingDocuments?.map(doc => {
                    return {
                        name: doc?.name,
                        document: ''
                    }
                }) ?? [],
                ...procurement?.Requirement?.[0]?.otherDocuments?.map(doc => { return { name: doc?.name, document: '' } }) ?? []
            ]
        },
        mode: "onChange"
    });

    const { fields } = useFieldArray({ control, name: 'documents' })
    const { fields: fieldsProducts, remove: removeProduct, append: appendProduct } = useFieldArray({ control, name: 'products' })
    const { fields: fieldsServices, remove: removeService, append: appendService } = useFieldArray({ control, name: 'services' })
    const company = watch('company')

    const hanldeApply = (data) => {
        const available = []
        const formData = new FormData();
        const otherDocs = []

        formData.append('tenderID', data?.tenderID);
        formData.append('companyID', data?.company);
        formData.append('products', JSON.stringify(data?.products));
        formData.append('services', JSON.stringify(data?.services));
        data?.documents?.forEach(doc => {
            if (doc?.docID) available.push({ name: doc?.name, id: doc?.docID });
            else {
                otherDocs.push(doc?.name)
                formData.append('documents', doc?.document[0]);
            }
        });
        if (otherDocs.length) formData.append('documentsName', JSON.stringify(otherDocs))
        if (available.length) formData.append('availableDocuments', JSON.stringify(available));
        fetchData({ data: formData })
    }

    useEffect(() => {
        if (!isLoading && data) {
            setApplyModal({ show: false, procurement: null })
            addToast(Toast({ message: "Application successful!", type: 'success' }))
        }
    }, [isLoading, data])

    const handleCompanyChange = (companyID) => {
        if (companyID) {
            setValue('company', companyID)
            fetchDataBid({
                data: {
                    page: 1,
                    limit: 1,
                    tenderID: procurement?._id,
                    companyID: companyID
                }
            })
        }
    }

    useEffect(() => {
        if (!isLoadingBid && dataBid) {
            const selectedCompany = dataCompanies?.data?.companies?.find((comp) => comp?._id == company)
            const docs = selectedCompany?.docMetaData ?? []

            if (dataBid?.data?.bidsApplied?.length > 0) {
                const bid = dataBid?.data?.bidsApplied[0]
                setValue('_id', bid?._id)
                setValue('tenderID', procurement?._id)
                setValue('deliverySchedule', procurement?.Requirement?.[0]?.deliverySchedule)
                setValue('products', bid?.Products?.map(item => {
                    return {
                        _id: item?._id,
                        quantity: item?.quantity,
                        deliverable: item?.deliverable,
                        deliveryDate: formatDateInput(item?.deliveryDate),
                        price: item?.price ?? 0
                    }
                }))
                setValue('services', bid?.Services?.map(service => {
                    return {
                        _id: service?._id,
                        price: service?.price ?? 0
                    }
                }))
            }
            else {
                setValue('_id', '')
                setValue('tenderID', procurement?._id)
                setValue('deliverySchedule', procurement?.Requirement?.[0]?.deliverySchedule)
                setValue('products', procurement?.LineItems?.map(item => {
                    return {
                        _id: item?._id,
                        quantity: item?.quantity,
                        deliverable: true,
                        deliveryDate: item?.deliverySchedule,
                        price: 0
                    }
                }))
                setValue('services', procurement?.Services?.map(service => {
                    return {
                        _id: service?._id,
                        price: 0
                    }
                }))


                setValue('documents', [
                    ...procurement?.Requirement?.[0]?.existingDocuments?.map(doc => {
                        const compDoc = docs.find(d => d?.docName === doc?.name)
                        return {
                            docID: compDoc?._id,
                            name: doc?.name,
                            document: ''
                        }
                    }) ?? [],
                    ...procurement?.Requirement?.[0]?.otherDocuments?.map(doc => { return { name: doc?.name, document: '' } }) ?? []
                ])
            }
        }
    }, [isLoadingBid, dataBid])

    return <CCard>
        <CCardHeader
            className="d-flex justify-content-between align-items-center"
            style={{ color: customColors.headerTextColor, backgroundColor: customColors.headerBgColor, position: 'relative' }}
        >
            <div style={{ flexGrow: 1, textAlign: 'center' }}>
                <strong style={{ fontSize: '1.2rem' }}>Apply</strong>
            </div>
        </CCardHeader>
        <CCardBody>
            {isLoadingBid ?
                <div className="pt-3 text-center">
                    <CSpinner color="primary" variant="grow" />
                </div> :
                <CForm onSubmit={handleSubmit(hanldeApply)}>
                    <CTabs defaultActiveItemKey="requirement">
                        <CTabList variant="tabs">
                            <CTab className="fw-bold" itemKey="requirement">Requirement</CTab>
                            {procurement?.GeneralInfo?.[0]?.type?.includes('product') && <CTab className="fw-bold" itemKey="product">Product</CTab>}
                            {procurement?.GeneralInfo?.[0]?.type?.includes('service') && <CTab className="fw-bold" itemKey="service">Service</CTab>}
                        </CTabList>
                        <CTabContent>
                            <CTabPanel className="p-3" itemKey="requirement">
                                <p className="h4">Required Documents</p>
                                <CRow className="mb-3">
                                    <CCol md={6}>
                                        <CFormLabel htmlFor="company">
                                            Company
                                        </CFormLabel>
                                        <CFormSelect
                                            id="company"
                                            {...register('company')}
                                            onChange={(e) => { handleCompanyChange(e.target.value) }}
                                        >
                                            <option value=''>Select Company</option>
                                            {dataCompanies?.data?.companies?.map((company) =>
                                                (<option value={company?._id} key={company?._id}>{company.companyName}</option>)
                                            )}
                                        </CFormSelect>
                                        {errors?.company &&
                                            <p className='text-danger p-0 m-0'>{errors?.company?.message}</p>
                                        }
                                    </CCol>
                                </CRow>
                                <CRow>
                                    {fields?.map((field, index) => {
                                        const fileID = field?.docID
                                        return <CCol key={index} className="mb-3" md={6}>
                                            <CFormLabel htmlFor="document">
                                                {field?.name}
                                            </CFormLabel>
                                            <CInputGroup>
                                                <CFormInput
                                                    id="document"
                                                    type="file"
                                                    disabled={fileID || !company}
                                                    {...register(`documents.${index}.document`)}
                                                />
                                                {fileID &&
                                                    <CInputGroupText>
                                                        <CIcon className='ms-1 text-success' icon={cilCheckCircle} title="Document available." />
                                                    </CInputGroupText>
                                                }
                                            </CInputGroup>
                                            {errors?.documents?.[index]?.document &&
                                                <p className='text-danger p-0 m-0'>{errors?.documents?.[index]?.document?.message}</p>
                                            }
                                        </CCol>
                                    })}
                                </CRow>

                                <CRow className='mb-3'>
                                    <CCol md={6}>
                                        <CFormLabel htmlFor="deliveryLocation">
                                            Delivery Location
                                        </CFormLabel>
                                        <CFormInput
                                            id="deliveryLocation"
                                            value={procurement?.Requirement?.[0]?.deliveryLocation}
                                            disabled
                                        />
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
                                    </CCol>
                                </CRow>
                            </CTabPanel>

                            {procurement?.GeneralInfo?.[0]?.type?.includes('product') &&
                                <CTabPanel className="p-3 pt-0" itemKey="product">
                                    <CRow className='mb-3'>
                                        {procurement?.LineItems?.filter(product => !fieldsProducts?.some(prod => prod._id === product._id)).map((product, index) => {
                                            return <div className="d-flex border rounded m-2 py-1 px-3 align-items-center w-auto" key={index}>
                                                <span className="me-2">{product?.name}</span>
                                                <CButton variant="primary" size="sm" onClick={() => appendProduct({
                                                    _id: product?._id,
                                                    quantity: product?.quantity,
                                                    deliverable: true,
                                                    deliveryDate: product?.deliverySchedule,
                                                    price: 0
                                                })}>
                                                    <CIcon icon={cilPlus} />
                                                </CButton>
                                            </div>
                                        })}
                                    </CRow>
                                    {fieldsProducts?.map((productApply, index) => {
                                        const product = procurement?.LineItems?.find(prod => prod._id === productApply._id)
                                        return <CCol md={12} key={index}>
                                            <CRow className='mb-3'>
                                                <CCol md={6}>
                                                    <CFormLabel htmlFor="name">
                                                        Product Name
                                                    </CFormLabel>
                                                    <CInputGroup>
                                                        <CFormInput
                                                            id="name"
                                                            value={product?.name}
                                                            disabled
                                                        />
                                                        <CInputGroupText onClick={() => removeProduct(index)}>
                                                            <CIcon icon={cilTrash} style={{ color: customColors.deleteBtnColor }} />
                                                        </CInputGroupText>
                                                    </CInputGroup>
                                                </CCol>
                                                <CCol md={3}>
                                                    <CFormLabel htmlFor="quantity">
                                                        Quantity
                                                    </CFormLabel>
                                                    <CFormInput
                                                        id="quantity"
                                                        type="number"
                                                        {...register(`products.${index}.quantity`)}
                                                    />
                                                    {errors?.products?.[index]?.quantity &&
                                                        <p className='text-danger p-0 m-0'>{errors?.products?.[index]?.quantity?.message}</p>
                                                    }
                                                </CCol>
                                                <CCol md={3}>
                                                    <CFormLabel htmlFor="unitOfMeasurement">
                                                        Unit
                                                    </CFormLabel>
                                                    <CFormInput
                                                        id="unitOfMeasurement"
                                                        value={product?.unitOfMeasurement}
                                                        disabled
                                                    />
                                                </CCol>
                                            </CRow>

                                            <CRow className='mb-3'>
                                                <CCol md={6}>
                                                    <CFormLabel htmlFor="deliveryLocation">
                                                        Delivery Location
                                                    </CFormLabel>
                                                    <CInputGroup>
                                                        <CFormInput
                                                            id="deliveryLocation"
                                                            value={product?.deliveryLocation}
                                                            disabled
                                                        />
                                                        <CInputGroupText>
                                                            <span className="me-2">Deliverable</span>
                                                            <CFormCheck
                                                                {...register(`products.${index}.deliverable`)}
                                                            />
                                                        </CInputGroupText>
                                                    </CInputGroup>
                                                </CCol>
                                                <CCol md={6}>
                                                    <CFormLabel htmlFor="deliveryDate">
                                                        Delivery Schedule
                                                    </CFormLabel>
                                                    <CFormInput
                                                        id="deliveryDate"
                                                        type="datetime-local"
                                                        {...register(`products.${index}.deliveryDate`)}
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow className='mb-3'>
                                                <CCol md={6}>
                                                    <CFormLabel htmlFor="price">
                                                        Price
                                                    </CFormLabel>
                                                    <CFormInput
                                                        id="price"
                                                        type="number"
                                                        {...register(`products.${index}.price`)}
                                                    />
                                                    {errors?.products?.[index]?.price &&
                                                        <p className='text-danger p-0 m-0'>{errors?.products?.[index]?.price?.message}</p>
                                                    }
                                                </CCol>

                                            </CRow>

                                            <hr className="mx-3" />
                                        </CCol>
                                    })}
                                </CTabPanel>
                            }
                            {procurement?.GeneralInfo?.[0]?.type?.includes('service') &&
                                <CTabPanel className="p-3 pt-0" itemKey="service">
                                    <CRow className='mb-3'>
                                        {procurement?.Services?.filter(service => !fieldsServices?.some(serv => serv._id === service._id)).map((service, index) => {
                                            return <div className="d-flex border rounded m-2 py-1 px-3 align-items-center w-auto" key={index}>
                                                <span className="me-2">{service?.name}</span>
                                                <CButton variant="primary" size="sm" onClick={() => appendService({
                                                    _id: service?._id,
                                                    price: 0
                                                })}>
                                                    <CIcon icon={cilPlus} />
                                                </CButton>
                                            </div>
                                        })}
                                    </CRow>
                                    {fieldsServices?.map((serviceApply, index) => {
                                        const service = procurement?.Services?.find(serv => serv._id === serviceApply._id)
                                        return <CCol md={12} key={index}>
                                            <CRow className='mb-3'>
                                                <CCol md={6}>
                                                    <CFormLabel htmlFor="name">
                                                        Service Name
                                                    </CFormLabel>
                                                    <CInputGroup>
                                                        <CFormInput
                                                            id="name"
                                                            value={service?.name}
                                                            disabled
                                                        />
                                                        <CInputGroupText onClick={() => removeService(index)}>
                                                            <CIcon icon={cilTrash} style={{ color: customColors.deleteBtnColor }} />
                                                        </CInputGroupText>
                                                    </CInputGroup>
                                                </CCol>
                                                <CCol md={6}>
                                                    <CFormLabel htmlFor="personnel">
                                                        Number of Perssonnel
                                                    </CFormLabel>
                                                    <CFormInput
                                                        id="personnel"
                                                        value={service?.personnel}
                                                        disabled
                                                    />
                                                </CCol>
                                            </CRow>

                                            <CRow className='mb-3'>
                                                <CCol md={6}>
                                                    <CFormLabel htmlFor="deliveryLocation">
                                                        Delivery Location
                                                    </CFormLabel>
                                                    <CFormInput
                                                        id="deliveryLocation"
                                                        value={service?.deliveryLocation}
                                                        disabled
                                                    />
                                                </CCol>
                                            </CRow>

                                            <CRow className='mb-3'>
                                                <CCol md={6}>
                                                    <CFormLabel htmlFor="deliveryLocation">
                                                        Start Date
                                                    </CFormLabel>
                                                    <CFormInput
                                                        id="startDate"
                                                        value={formatDate(service?.startDate)}
                                                        disabled
                                                    />
                                                </CCol>
                                                <CCol md={6}>
                                                    <CFormLabel htmlFor="deliverySchedule">
                                                        End Date
                                                    </CFormLabel>
                                                    <CFormInput
                                                        id="endDate"
                                                        value={formatDate(service?.endDate)}
                                                        disabled
                                                    />
                                                </CCol>
                                            </CRow>

                                            {service?.tasks?.map((task, taskIndex) => (
                                                <CCol key={taskIndex} className='my-1' md={6}>
                                                    <CFormLabel htmlFor="taskName">
                                                        Task {taskIndex + 1}
                                                    </CFormLabel>
                                                    <CFormInput
                                                        id="taskName"
                                                        value={task?.name}
                                                        disabled
                                                    />
                                                </CCol>
                                            ))}

                                            {service?.deliverables.map((deliverable, deliverableIndex) => (
                                                <CCol key={deliverableIndex} className='my-1' md={6}>
                                                    <CFormLabel htmlFor="taskName">
                                                        Deliverable {deliverableIndex + 1}
                                                    </CFormLabel>
                                                    <CFormInput
                                                        id="taskName"
                                                        value={deliverable?.name}
                                                        disabled
                                                    />
                                                </CCol>
                                            ))}

                                            <CRow className='mb-3'>

                                                <CCol md={6}>
                                                    <CFormLabel htmlFor="price">
                                                        Price
                                                    </CFormLabel>
                                                    <CFormInput
                                                        id="price"
                                                        {...register(`services.${index}.price`)}
                                                    />
                                                    {errors?.services?.[index]?.price &&
                                                        <p className='text-danger p-0 m-0'>{errors?.services?.[index]?.price?.message}</p>
                                                    }
                                                </CCol>
                                            </CRow>

                                            <hr className="mx-3" />
                                        </CCol>
                                    })}
                                </CTabPanel>
                            }
                        </CTabContent>
                    </CTabs>
                    {errors?.[""] &&
                        <p className='text-danger p-0 m-0'>{errors?.[""]?.message}</p>
                    }
                    <CCol align='center'>
                        <CButton type="submit" color="primary" size="md">Apply</CButton>
                    </CCol>
                </CForm>
            }
        </CCardBody>
    </CCard>
}

export default Apply