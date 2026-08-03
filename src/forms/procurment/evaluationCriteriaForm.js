import { cilPlus, cilTrash } from "@coreui/icons";
import { CButton, CCol, CFormInput, CFormLabel, CFormTextarea, CInputGroup, CInputGroupText, CRow } from "@coreui/react"
import customColors from "../../constants/colors";
import CIcon from "@coreui/icons-react";
import useApiFetch from "../../hooks/useAPIFetch";
import { useEffect } from "react";
import { useFieldArray } from "react-hook-form";

const EvaluationCriteriaForm = ({ nextStep, prevStep, register, errors, control, trigger, getValues }) => {
    const {
        data, isLoading, fetchData, errors: errorsRes
    } = useApiFetch({ url: 'update-tenders-evaluation-criteria', method: 'PUT' }, false)

    useEffect(() => {
        if (!isLoading && data) {
            nextStep()
        }
    }, [isLoading, data])


    const { fields, append, remove } = useFieldArray({ control, name: 'evaluationCriteria' })

    const newEvaluationCriteria = {
        criteria: "",
        percentage: ""
    }

    const handleNext = async () => {
        const valid = await trigger(["evaluationCriteria", "scoringGuidelines"])
        if (valid) {
            const values = getValues()
            fetchData({
                data: {
                    id: values?._id,
                    scoringGuidelines: values?.scoringGuidelines,
                    evaluationCriteria: values?.evaluationCriteria,
                }
            })
        }
    }

    return <div className='pb-3 rounded mb-3'>
        <div className="d-flex">
            <p className='fw-bold h4'>Evaluation Criteria</p>
            <div>
                <CButton color="primary" className="ms-3 px-1 py-0" onClick={() => append(newEvaluationCriteria)}><CIcon icon={cilPlus} /></CButton>
            </div>
        </div>

        {fields?.map((criteria, index) => (
            <CRow className='mb-3' key={index}>
                <CCol md={6}>
                    <CFormLabel htmlFor="criteria">
                        Criteria
                    </CFormLabel>
                    <CFormInput
                        id="criteria"
                        type="text"
                        {...register(`evaluationCriteria.${index}.criteria`)}
                    />
                    {errors?.evaluationCriteria?.[index]?.criteria &&
                        <p className='text-danger p-0 m-0'>{errors?.evaluationCriteria?.[index]?.criteria?.message}</p>
                    }
                </CCol>
                <CCol md={6}>
                    <CFormLabel htmlFor="percentage">
                        Percentage
                    </CFormLabel>
                    <CInputGroup>
                        <CFormInput
                            id="percentage"
                            type="number"
                            {...register(`evaluationCriteria.${index}.percentage`)}
                        />
                        {index > 0 &&
                            <CInputGroupText onClick={() => remove(index)}>
                                <CIcon icon={cilTrash} style={{ color: customColors.deleteBtnColor }} />
                            </CInputGroupText>
                        }
                        <CInputGroupText className="ms-2" onClick={() => append(newEvaluationCriteria)}>
                            <CIcon className="primary" icon={cilPlus} />
                        </CInputGroupText>
                    </CInputGroup>
                    {errors?.evaluationCriteria?.[index]?.percentage &&
                        <p className='text-danger p-0 m-0'>{errors?.evaluationCriteria?.[index]?.percentage?.message}</p>
                    }
                </CCol>
            </CRow>
        ))}

        <CRow className='mb-3'>
            <CCol md={12}>
                <CFormLabel htmlFor="scoringGuidelines">
                    Scoring Guidelines
                </CFormLabel>
                <CFormTextarea
                    id="scoringGuidelines"
                    placeholder="Scoring Guidelines"
                    autoComplete="off"
                    rows={3}
                    {...register('scoringGuidelines')}
                />
                {errors?.scoringGuidelines &&
                    <p className='text-danger p-0 m-0'>{errors?.scoringGuidelines?.message}</p>
                }
            </CCol>
        </CRow>

        <CCol align="center" xs={12}>
            <CButton className="mx-3" color="secondary" size="md" onClick={prevStep}> Back </CButton>
            <CButton className="mx-3" color="primary" size="md" onClick={handleNext}> Next </CButton>
        </CCol>
    </div>
}

export default EvaluationCriteriaForm;