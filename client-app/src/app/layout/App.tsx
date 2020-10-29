import React, { useState, useEffect, Fragment, SyntheticEvent, useContext } from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';
import { IActivity } from '../models/activity';
import 'semantic-ui-css/semantic.min.css'
import ActivityDashboard from '../../Features/Activities/dashboard/ActivityDashboard';
import Navbar from '../../Features/Nav/Navbar';
import agent from '../api/agent';
import { LoadingComponent } from './LoadingComponent';
import ActivityStore from '../stores/activityStore';
import { observer } from 'mobx-react-lite';


const App = () => {
  const activityStore = useContext(ActivityStore);
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  const handleCreateActivity = (activity: IActivity) =>{
    setSubmitting(true);
    agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false));
    
  }

  const handleEditActivity= (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity).then(() => {
      setActivities([...activities.filter(a => a.id !== activity.id), activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false))
    
  }

  const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(a => a.id !== id)])
    }).then(() => setSubmitting(false))
  }

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  };

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if(activityStore.loadingInitial) return <LoadingComponent content="Loading Activties" />
  return (
    <Fragment>
      <Navbar openCreateForm={handleOpenCreateForm}/>
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          target={target}
          deleteActivity={handleDeleteActivity}
          activities={activityStore.activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          submitting={submitting}

         />
      </Container>
    </Fragment>
  );
};

export default observer(App);
