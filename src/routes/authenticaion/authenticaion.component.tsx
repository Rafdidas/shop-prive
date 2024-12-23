import { FC } from 'react';
import './authenticaion.styles.scss';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const AuthPage: FC = () => {
    return (
        <div id='Authenticaion'>
            <h1>로그인 회원가입</h1>
            <SignInForm />
            <SignUpForm />
        </div>
    )
}

export default AuthPage;