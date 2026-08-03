import { cilPlus, cilTrash } from "@coreui/icons"
import CIcon from "@coreui/icons-react"
import { CButton, CCol, CFormInput, CFormLabel, CInputGroup, CInputGroupText, CRow } from "@coreui/react"
import { useFieldArray } from "react-hook-form"
import customColors from "../../constants/colors"
import useApiFetch from "../../hooks/useAPIFetch"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ToasterContext } from "../../providers/toastProvider"
import Toast from "../../components/Toast"

const AdministrativeForm = ({ prevStep, register, errors, control, trigger, getValues, type, handleFinish }) => {
    const { addToast } = useContext(ToasterContext)
    const navigate = useNavigate()
    const {
        data, isLoading, fetchData, errors: errorsRes
    } = useApiFetch({ url: 'update-tenders-administratives', method: 'PUT' }, false)

    useEffect(() => {
        if (!isLoading && data) {
            if (type === 'New') {
                addToast(Toast({ message: "Tender created.", type: 'success' }))
                navigate('/procurement/draft')
            }
            else if (type === 'Edit') {
                addToast(Toast({ message: "Tender updated.", type: 'success' }))
                handleFinish()
            }
        }
    }, [isLoading, data])

    const { fields, append, remove } = useFieldArray({ control, name: 'contactPerson' })

    const newContactPersoneObject = {
        name: "",
        phoneNumber: "",
        email: ""
    }

    const handleNext = async () => {
        const valid = await trigger(["contactPerson", "approvalReference"])
        if (valid) {
            const values = getValues()
            fetchData({
                data: {
                    id: values?._id,
                    contactPerson: values?.contactPerson,
                    approvalReference: values?.approvalReference,
                }
            })
        }
    }

    return <div className='pb-3 rounded mb-3'>
        <div className="d-flex">
            <p className='fw-bold h4'>Administration</p>
            <div>
                <CButton color="primary" className="ms-3 px-1 py-0" onClick={() => append(newContactPersoneObject)}><CIcon icon={cilPlus} /></CButton>
            </div>
        </div>
        {fields?.map((contactPerson, index) => {
            return <CCol md={12} key={index}>
                <CRow className='mb-3'>
                    <CCol md={3}>
                        <CFormLabel htmlFor="name">
                            Contact Person Name
                        </CFormLabel>
                        <CFormInput
                            id="name"
                            type="text"
                            {...register(`contactPerson.${index}.name`)}
                        />
                        {errors?.contactPerson?.[index]?.name &&
                            <p className='text-danger p-0 m-0'>{errors?.contactPerson?.[index]?.name?.message}</p>
                        }
                    </CCol>
                    <CCol md={4}>
                        <CFormLabel htmlFor="phoneNumber">
                            Phone Number
                        </CFormLabel>
                        <CInputGroup>
                            <CInputGroupText>+251</CInputGroupText>
                            <CFormInput
                                id="phoneNumber"
                                type="number"
                                {...register(`contactPerson.${index}.phoneNumber`)}
                            />
                        </CInputGroup>
                        {errors?.contactPerson?.[index]?.phoneNumber &&
                            <p className='text-danger p-0 m-0'>{errors?.contactPerson?.[index]?.phoneNumber?.message}</p>
                        }
                    </CCol>
                    <CCol md={5}>
                        <CFormLabel htmlFor="email">
                            Email
                        </CFormLabel>
                        <CInputGroup>
                            <CFormInput
                                id="email"
                                type="email"
                                {...register(`contactPerson.${index}.email`)}
                            />
                            {index > 0 &&
                                <CInputGroupText onClick={() => remove(index)}>
                                    <CIcon icon={cilTrash} style={{ color: customColors.deleteBtnColor }} />
                                </CInputGroupText>
                            }
                            <CInputGroupText onClick={() => append(newContactPersoneObject)}>
                                <CIcon icon={cilPlus} />
                            </CInputGroupText>
                        </CInputGroup>
                        {errors?.contactPerson?.[index]?.email &&
                            <p className='text-danger p-0 m-0'>{errors?.contactPerson?.[index]?.email?.message}</p>
                        }
                    </CCol>
                </CRow>
            </CCol>
        })}

        <CRow className='mb-3'>
            <CCol md={6}>
                <CFormLabel htmlFor="approvalReference">
                    Approval Reference
                </CFormLabel>
                <CFormInput
                    id="approvalReference"
                    type="text"
                    {...register('approvalReference')}
                />
                {errors?.approvalReference &&
                    <p className='text-danger p-0 m-0'>{errors?.approvalReference?.message}</p>
                }
            </CCol>
        </CRow>

        {errors?.contactPerson &&
            <p className='text-center text-danger p-0 m-0'>{errors?.contactPerson?.message}</p>
        }

        <CCol align="center" xs={12}>
            <CButton className="mx-3" color="secondary" size="md" onClick={prevStep}> Back </CButton>
            <CButton className="mx-3" color="primary" size="md" onClick={handleNext}> Finish </CButton>
        </CCol>
    </div>
}

export default AdministrativeForm;