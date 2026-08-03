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

const UpdateBid = ({ procurement, bid, setApplyModal }) => {
    const { addToast } = useContext(ToasterContext)

    const {
        data,
        isLoading,
        fetchData,
        errors: errorsUpdate
    } = useApiFetch({ url: 'update-supplier-bid', method: 'PUT' }, false)

    const {
        data: dataCompanies,
        isLoading: isLoadingCompanies,
    } = useApiFetch({ url: 'fetch-personal-company-data', method: 'GET' }, true)

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue
    } = useForm({
        resolver: yupResolver(procurementApply),
        defaultValues: {
            tenderID: bid?.tenderID,
            company: bid?.companyID ?? '',
            deliverySchedule: procurement?.Requirement?.[0]?.deliverySchedule,
            products: bid?.Products ?? [],
            services: bid?.Services ?? [],
        },
        mode: "onChange"
    });

    const { fields, update, append } = useFieldArray({ control, name: 'documents' })
    const { fields: fieldsProducts, remove: removeProduct, append: appendProduct } = useFieldArray({ control, name: 'products' })
    const { fields: fieldsServices, remove: removeService, append: appendService } = useFieldArray({ control, name: 'services' })

    useEffect(() => {
        if (!isLoading && data) {
            setApplyModal({ show: false, procurement: null, bid: null })
            addToast(Toast({ message: "Application successful!", type: 'success' }))
        }
    }, [isLoading, data])

    const hanldeApply = (data) => {
        if (!isLoading) {
            const formData = new FormData();
            const docIDs = []

            formData.append('tenderID', data?.tenderID);
            formData.append('companyID', data?.company);
            formData.append('products', JSON.stringify(data?.products));
            formData.append('services', JSON.stringify(data?.services));
            data?.documents?.forEach(doc => {
                docIDs.push(doc?._id);
                formData.append('documents', doc?.document[0]);
            });
            if (docIDs.length) formData.append('documentsID', JSON.stringify(docIDs));
            fetchData({ data: formData })
        }
    }

    const handleDocChange = (e, d) => {
        const index = fields.findIndex(doc => doc._id === d._id);
        if (index > -1) update(index, { ...fields[index], document: e.target.files });
        else append({ _id: d._id, name: d.docName, document: e.target.files });
    }

    return <CCard>
        <CCardHeader
            className="d-flex justify-content-between align-items-center"
            style={{ color: customColors.headerTextColor, backgroundColor: customColors.headerBgColor, position: 'relative' }}
        >
            <div style={{ flexGrow: 1, textAlign: 'center' }}>
                <strong style={{ fontSize: '1.2rem' }}>Update Bid</strong>
            </div>
        </CCardHeader>
        <CCardBody>
            {isLoading ?
                <div className="pt-3 text-center">
                    <CSpinner color="primary" variant="grow" />
                </div> :
                <CForm onSubmit={handleSubmit(hanldeApply)}>
                    <CTabs defaultActiveItemKey="requirement" className="mb-1 pb-0">
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
                                            value={bid?.companyID}
                                            disabled
                                        >
                                            <option value=''>Select Company</option>
                                            {dataCompanies?.data?.companies?.map((company) => {
                                                return <option value={company?._id} key={company?._id}>{company.companyName}</option>
                                            }
                                            )}
                                        </CFormSelect>
                                        {errors?.company &&
                                            <p className='text-danger p-0 m-0'>{errors?.company?.message}</p>
                                        }
                                    </CCol>
                                </CRow>
                                <CRow>
                                    {bid?.ExistingDocuments?.map((field, index) => {
                                        return <CCol key={index} className="mb-3" md={6}>
                                            <CFormLabel htmlFor="document">
                                                {field?.docName}
                                            </CFormLabel>
                                            <CInputGroup>
                                                <CFormInput
                                                    id="document"
                                                    type="file"
                                                    disabled
                                                />
                                                <CInputGroupText>
                                                    <CIcon className='ms-1 text-success' icon={cilCheckCircle} title="Document available." />
                                                </CInputGroupText>
                                            </CInputGroup>
                                        </CCol>
                                    })}

                                    {bid?.OtherDocuments?.map((field, index) => {
                                        const ind = fields.findIndex(doc => doc._id === field._id);
                                        return <CCol key={index} className="mb-3" md={6}>
                                            <CFormLabel htmlFor="document">
                                                {field?.docName}
                                            </CFormLabel>
                                            <CInputGroup>
                                                <CFormInput
                                                    id="document"
                                                    type="file"
                                                    onChange={(e) => { handleDocChange(e, field) }}
                                                />
                                                <CInputGroupText>
                                                    <CIcon className='ms-1 text-success' icon={cilCheckCircle} title="Document available." />
                                                </CInputGroupText>
                                            </CInputGroup>
                                            {errors?.documents?.[ind]?.document &&
                                                <p className='text-danger p-0 m-0'>{errors?.documents?.[ind]?.document?.message}</p>
                                            }
                                        </CCol>
                                    })}
                                </CRow>

                                <CRow>
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

                                            <CRow>
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

                                            <hr className="m-0 p-0 mt-3 mx-3" />
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

                                            <hr className="m-0 p-0 mt-3 mx-3" />
                                        </CCol>
                                    })}
                                </CTabPanel>
                            }
                        </CTabContent>
                    </CTabs>
                    {errors?.[""] &&
                        <p className='text-danger p-0 m-0 mx-3'>{errors?.[""]?.message}</p>
                    }
                    {errorsUpdate?.details?.response?.data?.message &&
                        <p className='text-danger p-0 m-0 mx-3'>{errorsUpdate?.details?.response?.data?.message}</p>
                    }
                    <CCol align='center'>
                        <CButton type="submit" color="primary" size="md" disabled={isLoading}>Update Bid</CButton>
                    </CCol>
                </CForm>
            }
        </CCardBody>
    </CCard>
}

export default UpdateBid