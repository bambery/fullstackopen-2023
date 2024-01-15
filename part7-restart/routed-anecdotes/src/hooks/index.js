import { useState } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState('')
    const onChange = (event) => {
        setValue(event.target.value)
    }

    // in case I forget why this works: https://react.dev/reference/react-dom/components/common - onReset is a prop that is supported for all form components
    const onReset = () => {
        setValue('')
    }

    return {
        type,
        value,
        onChange,
        onReset
    }
}
