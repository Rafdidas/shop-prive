import { ChangeEvent, FC, FormEvent, useState } from 'react';
import './sign-up-form.styles.scss';

import { AuthError, AuthErrorCodes } from 'firebase/auth';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

interface FormFields {
    displayName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const defaultFormFields: FormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm: FC = () => {
    const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('패스워드가 다릅니다.');
            return;
        }

        try {
            const userCredential = await createAuthUserWithEmailAndPassword(email, password);
            
            if (!userCredential) {
                throw new Error('사용자 자격 증명 생성 실패');
            }

            const { user } = userCredential;

            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch (error) {
            if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
                alert('이미 사용 중 인 이메일 입니다.');
            }
            console.log("오류가 발생했습니다.", error);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name='displayName' value={displayName} onChange={handleChange} required />
                <input type="email" name="email" id="emailSignUp" value={email} onChange={handleChange} required />
                <input type="password" name="password" id="passwordSignUp" value={password} onChange={handleChange} required />
                <input type="password" name="confirmPassword" id="confirmPasswordSignUp" value={confirmPassword} onChange={handleChange} required />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm;