import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTES } from '../../core/config/app.environment';
import { loginAuth } from '../../core/actions/login.action';
import LoginContainer from '@/components/forms/login/container';
import EmptyLayout from "@/components/layouts/empty-layout";

const LoginPage = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { loggingIn, user, loginError } = useSelector(state => state.loginReducer)
    const [feedbackError, setFeedbackError] = useState({});
    const [submited, setSubmited] = useState(false);

    useEffect(() => {
        if(submited && !loggingIn) {
            if(!loggingIn && !loginError && user) {
                setSubmited(false);
                router.push(ROUTES.HOME)
            } else if(loginError) {
                setSubmited(false);
                setFeedbackError(loginError)
            }
        }
    }, [loggingIn, user, loginError])

    const fetchLogin = (values) => {
        if(!submited) {
            setSubmited(true);
            dispatch(loginAuth(values))
        }
    }

    return (
        <>
            <LoginContainer
                fetch={(values) => fetchLogin(values)}
                submitted={loggingIn}
                feedbackError={feedbackError}
				setFeedbackError={setFeedbackError}
            />
        </>
    )
}

LoginPage.getLayout = EmptyLayout

export default LoginPage;