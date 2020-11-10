import React, { useEffect, Fragment, useContext } from 'react';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import ActivityDashboard from '../../Features/Activities/dashboard/ActivityDashboard';
import Navbar from '../../Features/Nav/Navbar';
import { LoadingComponent } from './LoadingComponent';
import ActivityStore from '../stores/activityStore';
import { observer } from 'mobx-react-lite';


const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if(activityStore.loadingInitial) return <LoadingComponent content="Loading Activties" />
  return (
    <Fragment>
      <Navbar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
            activities={activityStore.activities}
          />
      </Container>
    </Fragment>
  );
};

export default observer(App);
