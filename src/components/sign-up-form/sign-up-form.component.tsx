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
            alert('가입완료 되었습니다. 로그인해주세요.')
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
        <div className='sign_box'>
            <h2>계정이 없나요?</h2>
            <span className='sign_subtitle'>이메일과 비밀번호로 가입하세요.</span>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name='displayName' 
                    className='form_input block' 
                    value={displayName} 
                    onChange={handleChange} 
                    placeholder='이름' 
                    required 
                />
                <input 
                    type="email" 
                    name="email" 
                    className='form_input block' 
                    id="emailSignUp" 
                    value={email} 
                    onChange={handleChange} 
                    placeholder='Email' 
                    required 
                />
                <input 
                    type="password" 
                    name="password" 
                    id="passwordSignUp" 
                    className='form_input block' 
                    value={password} 
                    onChange={handleChange} 
                    placeholder='Password' 
                    required 
                />
                <input 
                    type="password" 
                    name="confirmPassword" 
                    id="confirmPasswordSignUp" 
                    className='form_input block' 
                    value={confirmPassword} 
                    onChange={handleChange} 
                    placeholder='Confirm Password' 
                    required 
                />
                <span className='box_btn block large'><button type="submit">회원가입</button></span>
            </form>
        </div>
    )
}

export default SignUpForm;