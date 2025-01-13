import './sign-in-form.styles.scss';

import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { AuthError, AuthErrorCodes } from 'firebase/auth';
import { signWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

interface FormFields {
    email: string;
    password: string;
}

const defaultFormFields: FormFields = {
    email: '',
    password: '',
};

const SignInForm: FC = () => {
    const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signinWithGoogle = async () => {
        try {
            const { user } = await signWithGooglePopup();
            await createUserDocumentFromAuth(user);
        } catch (error) {
            console.error('Google Sign-In Error:', error);
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(
                email,
                password
            );
            console.log('Sign-In Response:', response);
            resetFormFields();
        } catch (error) {
            if ((error as AuthError).code) {
                switch ((error as AuthError).code) {
                    case AuthErrorCodes.INVALID_PASSWORD:
                        alert('비밀번호가 틀렸습니다.');
                        break;
                    case AuthErrorCodes.USER_DISABLED:
                        alert('존재하지 않는 회원정보입니다.');
                        break;
                    default:
                        console.error('Sign-In Error:', error);
                }
            }
        }
        
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value});
    };

    return (
        <div>
            <h1>Sign In Page</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" id="emailSignIn" value={email} onChange={handleChange} required />
                <input type="password" name="password" value={password} id="passwordSignIn" required onChange={handleChange} />
                
                <button type="submit">Sign In</button>
                <button onClick={signinWithGoogle}>
                    Sign In With Google Popup
                </button>
            </form>
        </div>
    )
}

export default SignInForm;