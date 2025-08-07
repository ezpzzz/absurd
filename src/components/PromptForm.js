import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Alert } from '@mui/material';
import { generateId } from '../utils/id';
import { setLocalStorageItem } from '../hooks/useLocalStorage';
const PromptForm = () => {
    const [prompt, setPrompt] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        const id = generateId();
        const success = setLocalStorageItem(`prompt-${id}`, prompt);
        if (success) {
            navigate(`/site/${id}`);
        }
        else {
            setError('Failed to save prompt. Please try again.');
        }
    };
    return (_jsxs(Box, { component: "form", onSubmit: handleSubmit, children: [error && (_jsx(Alert, { severity: "error", sx: { mb: 2 }, children: error })), _jsx(TextField, { label: "Prompt", value: prompt, onChange: (e) => setPrompt(e.target.value), fullWidth: true, multiline: true, minRows: 3, "data-testid": "prompt-input" }), _jsx(Button, { type: "submit", variant: "contained", sx: { mt: 2 }, disabled: !prompt, "data-testid": "submit-button", children: "Generate" })] }));
};
export default PromptForm;
