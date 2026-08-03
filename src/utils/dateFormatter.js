export const formatDate = (dateString) => {
    try {
        if (!dateString) return 'Date N/A.'
        const date = new Date(dateString)
        return `${date.toDateString()} at ${date.toLocaleTimeString()}`
    }
    catch (error) {
        throw "Could not parse date."
    }
}

export const formatDateInput = (dateString) => {
    if (!dateString) return null;
    else {
        const date = new Date(dateString)
        return `${date.getFullYear()}-${date.getMonth().toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    }
}