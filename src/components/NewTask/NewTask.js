import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttpRequest from '../../hooks/use-httpRequest';

const NewTask = (props) => {
  const URL = 'https://react-task-list-4976a-default-rtdb.firebaseio.com/tasks.json'
  const [isLoading, error, fetchHandler] = useHttpRequest(URL, 'POST', props.onAddTask)
  
  return (
    <Section>
      <TaskForm onEnterTask={fetchHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
