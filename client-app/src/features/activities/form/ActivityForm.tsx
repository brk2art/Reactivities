import React, {useState, FormEvent, useContext} from 'react'
import { Segment, Form, Button } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';


interface IProps {
    activity: IActivity;
}

const ActivityForm: React.FC<IProps> = ({ 
    activity: initialFormState, 
 }) => {
    const activityStore = useContext(ActivityStore);
    const {createActivity, editActivity, submitting, cancelFormOpen} = activityStore;
    const initializeForm = () =>  {
        if(initialFormState){
            return initialFormState
        }else{
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
    };

    const [activity, setActivity] = useState<IActivity>(initializeForm)

    const handleSubmit = () => {
        if(activity.id.length === 0){
            let newActivity = {
                ...activity,
                id: 'guid'
            }
            createActivity(newActivity);
        } else {
            editActivity(activity);
        }
    }

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.currentTarget;
        setActivity({...activity, [name]: value})
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input name='title' placeholder='Title' onChange={handleInputChange} value={activity.title} />
                <Form.TextArea name='description' placeholder='Description' onChange={handleInputChange} value={activity.description}/>
                <Form.Input name='category' placeholder='Category' onChange={handleInputChange} value={activity.category}/>
                <Form.Input name='date' type='datetime-local' placeholder='Date' onChange={handleInputChange} value={activity.date}/>
                <Form.Input name='city' placeholder='City' onChange={handleInputChange} value={activity.city}/>
                <Form.Input name='venue' placeholder='Venue' onChange={handleInputChange} value={activity.venue}/>
                <Button 
                   loading={submitting}
                   floated='right' 
                   positive type='submit' 
                   content='Submit' />
                <Button
                   onClick={cancelFormOpen} 
                   floated='right' 
                   type='submit' 
                   content='Cancel' />
            </Form>
        </Segment>
    )
}

export default observer(ActivityForm);