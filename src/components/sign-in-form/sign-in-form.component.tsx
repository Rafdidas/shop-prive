import './sign-in-form.styles.scss';

import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { AuthError, AuthErrorCodes } from 'firebase/auth';
import { signWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import { useNavigate } from 'react-router-dom';

interface FormFields {
    email: string;
    password: string;
}

const defaultFormFields: FormFields = {
    email: '',
    password: '',
};

const SignInForm: FC = () => {
    const navigate = useNavigate();
    
    const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signinWithGoogle = async () => {
        try {
            const { user } = await signWithGooglePopup();
            await createUserDocumentFromAuth(user);
            navigate('/main');
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
            navigate('/main');
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
        <div className='sign_box'>
            <h2>이미 계정이 있으신가요?</h2>
            <span className='sign_subtitle'>이메일과 비밀번호로 로그인하세요.</span>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    name="email" 
                    id="emailSignIn" 
                    className='form_input block' 
                    value={email} 
                    onChange={handleChange} 
                    placeholder='Email' 
                    required 
                />
                <input 
                    type="password" 
                    name="password" 
                    value={password} 
                    id="passwordSignIn" 
                    className='form_input block' 
                    placeholder='Password' 
                    required 
                    onChange={handleChange} 
                />
                <div className='btn'>
                    <span className='box_btn block large'><button type="submit">로그인 하기</button></span>
                    <span className='box_btn block large blue'>
                        <button onClick={signinWithGoogle}>
                            구글 로그인 하기
                        </button>
                    </span>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;