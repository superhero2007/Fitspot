import React from 'react'
import ProfileContainer from '@Profile/containers/ProfileContainer'
import { Page, PageUnauthorizedHeader, PageContent } from '@shared/components';
import { SecurePageContainer, PageHeaderContainer } from '@shared/containers';

const ProfileScene = (props) => {
    return (
        <SecurePageContainer location={props.location}>
            <PageHeaderContainer />
            <PageContent>
                <ProfileContainer />
            </PageContent>
        </SecurePageContainer>
    )
};

export default ProfileScene
