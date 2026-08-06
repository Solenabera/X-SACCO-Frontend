import React, { useRef } from 'react'
import { CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCloudUpload, cilFile, cilX } from '@coreui/icons'

/**
 * FileUploadZone — reusable drag-and-drop file upload area.
 *
 * Props:
 *   file        — current File object (null if none selected)
 *   preview     — string: data URL for image preview, 'pdf' for PDF, or null
 *   onFile      — (file: File) => void  — called when a valid file is chosen
 *   onClear     — () => void            — called when the user removes the file
 *   accept      — string  (default: 'image/*,application/pdf')
 *   maxMB       — number  (default: 5)
 *   label       — string for the drop zone prompt
 *   onError     — (msg: string) => void  — called on validation failure
 *   isDragging  — boolean (controlled externally via onDragState)
 *   onDragState — (bool) => void
 */
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']

const FileUploadZone = ({
    file,
    preview,
    onFile,
    onClear,
    accept = 'image/*,application/pdf',
    maxMB = 5,
    label = 'Drag & drop your file here',
    onError,
    isDragging = false,
    onDragState,
}) => {
    const inputRef = useRef()

    const validate = (f) => {
        if (!f) return
        if (!ALLOWED_TYPES.includes(f.type)) {
            onError?.('Only JPG, PNG, WEBP, or PDF files are accepted.')
            return
        }
        if (f.size > maxMB * 1024 * 1024) {
            onError?.(`File size must not exceed ${maxMB} MB.`)
            return
        }
        onError?.('')
        onFile(f)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        onDragState?.(false)
        validate(e.dataTransfer.files[0])
    }

    if (file) {
        return (
            <div
                className="d-flex align-items-center gap-3 p-3 rounded-3"
                style={{ border: '1.5px solid #a5b4fc', background: '#f0f0ff' }}
            >
                {preview === 'pdf' ? (
                    <CIcon icon={cilFile} style={{ width: 40, height: 40, color: '#6366f1', flexShrink: 0 }} />
                ) : (
                    <img
                        src={preview}
                        alt="File preview"
                        style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }}
                    />
                )}
                <div className="flex-grow-1 overflow-hidden">
                    <div className="fw-semibold small text-truncate">{file.name}</div>
                    <div className="small text-medium-emphasis">{(file.size / 1024).toFixed(1)} KB</div>
                </div>
                <CButton color="danger" variant="ghost" size="sm" onClick={onClear}>
                    <CIcon icon={cilX} />
                </CButton>
            </div>
        )
    }

    return (
        <div
            onClick={() => inputRef.current.click()}
            onDragOver={(e) => { e.preventDefault(); onDragState?.(true) }}
            onDragLeave={() => onDragState?.(false)}
            onDrop={handleDrop}
            style={{
                border: `2px dashed ${isDragging ? '#4f46e5' : '#cbd5e1'}`,
                borderRadius: 12,
                background: isDragging ? '#f0f0ff' : '#f8fafc',
                padding: '2rem 1rem',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'border-color 0.2s, background 0.2s',
            }}
        >
            <CIcon icon={cilCloudUpload} style={{ width: 36, height: 36, color: '#94a3b8', marginBottom: 8 }} />
            <div className="small fw-semibold text-medium-emphasis">{label}</div>
            <div className="small text-medium-emphasis mb-2">or</div>
            <CButton color="primary" variant="outline" size="sm">Browse File</CButton>
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                style={{ display: 'none' }}
                onChange={(e) => validate(e.target.files[0])}
            />
        </div>
    )
}

export default FileUploadZone
