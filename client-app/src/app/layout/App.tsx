import React, {useContext, useEffect, Fragment } from 'react';
import { Container } from 'semantic-ui-react'
import NavBar from '../../features/NavBar';
import ActivityDashboard from '../../features/activities/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import ActivityStore from '../stores/activityStore';
import {observer} from 'mobx-react-lite'

const App = () => {

  const activityStore = useContext(ActivityStore);  

  useEffect(() => { activityStore.loadActivities(); }, []);

  if(activityStore.loadingInitial) return <LoadingComponent content='Loading activities...' />

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard />
        </Container>
    </Fragment>
  );
}

export default observer(App);
