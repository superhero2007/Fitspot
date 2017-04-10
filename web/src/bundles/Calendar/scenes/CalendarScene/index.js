import React from 'react';
import WorkoutListContainer from '@Calendar/containers/WorkoutListContainer'
import CalendarWorkoutContainer from '@Calendar/containers/CalendarWorkoutContainer'
import { Page, PageContent } from '@shared/components';
import { SecurePageContainer, PageHeaderContainer } from '@shared/containers';

const CalendarScene = (props) => {
  return (
    <SecurePageContainer location={props.location}>
      <PageHeaderContainer />
        <CalendarWorkoutContainer />
    </SecurePageContainer>
  );
};

export default CalendarScene;
