import React, { ComponentType, ReactElement } from 'react';
import { Container } from '@mantine/core';
import '../../styles/auth.css'

const AuthWrapper = (AuthComponent: ReactElement): ReactElement => {

    return (
        <div className="login-container">
            <Container visibleFrom="sm" className="left-panel" />
            <div className="right-panel">
                {AuthComponent}
            </div>
        </div >
    );
};

export default AuthWrapper;
