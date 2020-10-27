import React, { useState, FormEvent } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import {v4 as uuid} from 'uuid';

interface IProps {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity;
}

const ActivityForm: React.FC<IProps> = ({
   setEditMode
}) => {
  const initializeForm = React.FC<IProps>() => {
      return {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
      };
    }
  

 

  return (
    <Segment clearing>
      <Form>
        <Form.Input
          
          name='title'
          placeholder='Title'
          value=''
        />
        <Form.TextArea
          
          name='description'
          rows={2}
          placeholder='Description'
          value=''
        />
        <Form.Input
          
          name='category'
          placeholder='Category'
          value=''
        />
        <Form.Input
          
          name='date'
          type='datetime-local'
          placeholder='Date'
          value=''
        />
        <Form.Input
          
          name='city'
          placeholder='City'
          value=''
        />
        <Form.Input
          
          name='venue'
          placeholder='Venue'
          value=''
        />
        <Button floated='right' positive type='submit' content='Submit' />
        <Button
          onClick={() => setEditMode(false)}
          floated='right'
          type='button'
          content='Cancel'
        />
      </Form>
    </Segment>
  );

}
export default ActivityForm;

