import { FC } from 'react';
import './authenticaion.styles.scss';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const AuthPage: FC = () => {
    return (
        <div id='Authenticaion'>
            <h2 className="subtitle">로그인</h2>
            <div className='log_inner'>
                <SignInForm />
                <SignUpForm />
            </div>
        </div>
    )
}

export default AuthPage;