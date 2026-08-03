import { cilPlus, cilTrash } from "@coreui/icons"
import CIcon from "@coreui/icons-react"
import { CButton, CCol, CFormInput, CFormLabel, CFormTextarea, CInputGroup, CInputGroupText, CRow } from "@coreui/react"
import { useFieldArray } from "react-hook-form"
import customColors from "../../constants/colors"
import useApiFetch from "../../hooks/useAPIFetch"
import { useEffect } from "react"

const ServicesForm = ({ nextStep, prevStep, register, errors, control, trigger, watch, getValues }) => {
    const {
        data, isLoading, fetchData, errors: errorsRes
    } = useApiFetch({ url: 'update-tenders-services', method: 'PUT' }, false)

    useEffect(() => {
        if (!isLoading && data) {
            nextStep()
        }
    }, [isLoading, data])

    const deliveryLocation = watch('deliveryLocation')

    const handleNext = async () => {
        const valid = await trigger("services")
        if (valid) {
            const values = getValues()
            fetchData({
                data: {
                    id: values?._id,
                    services: values?.services,
                }
            })
        }
    }

    const { fields, append, remove } = useFieldArray({ control, name: 'services' })
    const newServiceObject = {
        name: "",
        personnel: 1,
        deliveryLocation: deliveryLocation,
        startDate: '',
        endDate: '',
        additionalNotes: '',
        tasks: [
            {
                name: "",
            }
        ],
        deliverables: [
            {
                name: "",
            }
        ],
    }

    return <div className='pb-3 rounded mb-3'>
        <p className='fw-bold h4'>Services</p>
        {fields?.length === 0 &&
            <div className="d-flex justify-content-center mb-3">
                <CButton className="mx-3" color="primary" size="md" onClick={() => append(newServiceObject)}> Add Service </CButton>
            </div>
        }
        {fields?.map((service, index) => {
            return <CCol md={12} key={index}>
                <div className="d-flex justify-content-between align-items-center p-1 px-3 rounded mb-3"
                    style={{ color: customColors.headerTextColor, backgroundColor: customColors.headerBgColor }}>
                    <p className="h5 fw-bolder">Service {index + 1}</p>
                    <div>
                        {index > 0 &&
                            <CButton size="xl" onClick={() => remove(index)} style={{ color: 'red' }}>
                                <CIcon icon={cilTrash} />
                            </CButton>
                        }
                        <CButton size="xl" onClick={() => append(newServiceObject)} style={{ color: 'blue' }}>
                            <CIcon icon={cilPlus} />
                        </CButton>
                    </div>
                </div>
                <CRow className='mb-3'>
                    <CCol md={6}>
                        <CFormLabel htmlFor="name">
                            Service Name
                        </CFormLabel>
                        <CFormInput
                            id="name"
                            type="text"
                            {...register(`services.${index}.name`)}
                        />
                        {errors?.services?.[index]?.name &&
                            <p className='text-danger p-0 m-0'>{errors?.services?.[index]?.name?.message}</p>
                        }
                    </CCol>
                    <CCol md={6}>
                        <CFormLabel htmlFor="personnel">
                            Number of Perssonnel
                        </CFormLabel>
                        <CFormInput
                            id="personnel"
                            type="number"
                            {...register(`services.${index}.personnel`)}
                        />
                        {errors?.services?.[index]?.personnel &&
                            <p className='text-danger p-0 m-0'>{errors?.services?.[index]?.personnel?.message}</p>
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
                            type=""
                            {...register(`services.${index}.deliveryLocation`)}
                        />
                        {errors?.services?.[index]?.deliveryLocation &&
                            <p className='text-danger p-0 m-0'>{errors?.services?.[index]?.deliveryLocation?.message}</p>
                        }
                    </CCol>
                </CRow>

                <CRow className='mb-3'>
                    <CCol md={6}>
                        <CFormLabel htmlFor="deliveryLocation">
                            Start Date
                        </CFormLabel>
                        <CFormInput
                            id="startDate"
                            type="datetime-local"
                            {...register(`services.${index}.startDate`)}
                        />
                        {errors?.services?.[index]?.startDate &&
                            <p className='text-danger p-0 m-0'>{errors?.services?.[index]?.startDate?.message}</p>
                        }
                    </CCol>
                    <CCol md={6}>
                        <CFormLabel htmlFor="deliverySchedule">
                            End Date
                        </CFormLabel>
                        <CFormInput
                            id="endDate"
                            type="datetime-local"
                            {...register(`services.${index}.endDate`)}
                        />
                        {errors?.services?.[index]?.endDate &&
                            <p className='text-danger p-0 m-0'>{errors?.services?.[index]?.endDate?.message}</p>
                        }
                    </CCol>
                </CRow>

                <ServiceTasks
                    index={index}
                    register={register}
                    errors={errors}
                    control={control}
                />

                <ServiceDeliverables
                    index={index}
                    register={register}
                    errors={errors}
                    control={control}
                />

                <CRow className='mb-3'>
                    <CCol md={12}>
                        <CFormLabel htmlFor="additionalNotes">
                            Additional Note
                        </CFormLabel>
                        <CFormTextarea
                            id="additionalNotes"
                            autoComplete="off"
                            {...register(`services.${index}.additionalNotes`)}
                        />
                        {errors?.services?.[index]?.additionalNotes &&
                            <p className='text-danger p-0 m-0'>{errors?.services?.[index]?.additionalNotes?.message}</p>
                        }
                    </CCol>
                </CRow>

            </CCol>
        })}
        {errors?.services &&
            <p className='text-center text-danger p-0 m-0'>{errors?.services?.message}</p>
        }
        <CCol align="center" xs={12}>
            <CButton className="mx-3" color="secondary" size="md" onClick={prevStep}> Back </CButton>
            <CButton className="mx-3" color="primary" size="md" onClick={handleNext}> Next </CButton>
        </CCol>
    </div>
}

export default ServicesForm;

const ServiceTasks = ({ index, register, errors, control }) => {
    const { fields: fieldsTasks, append: appendTasks, remove: removeTasks } = useFieldArray({ control, name: `services.${index}.tasks` })

    const newTask = { name: "", }

    return <CRow className="mb-3">
        <CCol md={12} className="d-flex">
            <p className="h4">Tasks</p>
            <div>
                <CButton color="primary" className="ms-3 px-1 py-0" onClick={() => appendTasks(newTask)}><CIcon icon={cilPlus} /></CButton>
            </div>
        </CCol>
        {fieldsTasks.map((field, taskIndex) => (
            <CCol key={taskIndex} className='my-1' md={6}>
                <CFormLabel htmlFor="taskName">
                    Task {taskIndex + 1}
                </CFormLabel>
                <CInputGroup>
                    <CFormInput
                        id="taskName"
                        {...register(`services.${index}.tasks.${taskIndex}.name`)}
                    />
                    <CInputGroupText onClick={() => removeTasks(taskIndex)}>
                        <CIcon icon={cilTrash} style={{ color: customColors.deleteBtnColor }} />
                    </CInputGroupText>
                </CInputGroup>
                {errors?.services?.[index]?.tasks?.[taskIndex]?.name &&
                    <p className='text-danger p-0 m-0'>{errors?.services?.[index]?.tasks?.[taskIndex]?.name?.message}</p>
                }
            </CCol>
        ))}
    </CRow>
}

const ServiceDeliverables = ({ index, register, errors, control }) => {
    const { fields: fieldsDeliverables, append: appendDeliverables, remove: removeDeliverables } = useFieldArray({ control, name: `services.${index}.deliverables` })

    const newDeliverable = { name: "", }

    return <CRow className="mb-3">
        <CCol md={12} className="d-flex">
            <p className="h4">Deliverables</p>
            <div>
                <CButton color="primary" className="ms-3 px-1 py-0" onClick={() => appendDeliverables(newDeliverable)}><CIcon icon={cilPlus} /></CButton>
            </div>
        </CCol>
        {fieldsDeliverables.map((field, deliverableIndex) => (
            <CCol key={deliverableIndex} className='my-1' md={6}>
                <CFormLabel htmlFor="taskName">
                    Deliverable {deliverableIndex + 1}
                </CFormLabel>
                <CInputGroup>
                    <CFormInput
                        id="taskName"
                        {...register(`services.${index}.deliverables.${deliverableIndex}.name`)}
                    />
                    <CInputGroupText onClick={() => removeDeliverables(deliverableIndex)}>
                        <CIcon icon={cilTrash} style={{ color: customColors.deleteBtnColor }} />
                    </CInputGroupText>
                </CInputGroup>
                {errors?.services?.[index]?.deliverables?.[deliverableIndex]?.name &&
                    <p className='text-danger p-0 m-0'>{errors?.services?.[index]?.deliverables?.[deliverableIndex]?.name?.message}</p>
                }
            </CCol>
        ))}
    </CRow>
}