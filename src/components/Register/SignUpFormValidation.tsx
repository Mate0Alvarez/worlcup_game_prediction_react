import React from 'react'
import { IFormErrors } from '../../types/types';

export interface ISignUpFormValidationData {
    name: FormDataEntryValue | null;
    email: FormDataEntryValue | null;
    password: FormDataEntryValue | null;
    confirm_password: FormDataEntryValue | null;
}

export interface ISignUpFormValidationResponse {
    validForm: boolean;
    newFormErrors: IFormErrors;
    formData: {
        name: string,
        email: string,
        password: string
    }
}

export const SignUpFormValidation = async (data: ISignUpFormValidationData): Promise<ISignUpFormValidationResponse> => {
    let validForm = true;
    let newFormErrors = {
        name: false,
        email: false,
        password: false,
        confirm_password: false,
    };
    let formData = {
        name: '',
        email: '',
        password: ''
    }

    if (data.name === '') {
        newFormErrors.name = true;
        validForm = false;
    } else {
        formData.name = JSON.parse(JSON.stringify(data.name));
    }

    if (
        !data.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(JSON.parse(JSON.stringify(data.email)))
    ) {
        newFormErrors.email = true;
        validForm = false;
    } else {
        formData.email = JSON.parse(JSON.stringify(data.email));
    }

    if (!data.password) {
        newFormErrors.password = true;
        validForm = false;
    }

    if (data.password !== data.confirm_password) {
        newFormErrors.confirm_password = true;
        validForm = false;
    }

    if (!newFormErrors.password && !newFormErrors.confirm_password) {
        formData.password = JSON.parse(JSON.stringify(data.password));
    }

    return {
        validForm,
        newFormErrors,
        formData
    };
}

export default SignUpFormValidation;