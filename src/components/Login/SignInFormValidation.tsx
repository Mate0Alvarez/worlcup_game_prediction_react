import { ISignInFormErrors } from '../../interfaces/interfaces';

export interface ISignInFormValidationData {
    email: FormDataEntryValue | null;
    password: FormDataEntryValue | null;
}

export interface ISignInFormValidationResponse {
    validForm: boolean;
    newFormErrors: ISignInFormErrors;
    formData: {
        email: string,
        password: string
    }
}


const SingInFormValidation = async (data: ISignInFormValidationData): Promise<ISignInFormValidationResponse> => {
    let validForm = true;
    let newFormErrors = {
        email: false,
        password: false,
    };
    let formData = {
        email: '',
        password: ''
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
    } else {
        formData.password = JSON.parse(JSON.stringify(data.password));
    }

    return {
        validForm,
        newFormErrors,
        formData
    };
}

export default SingInFormValidation