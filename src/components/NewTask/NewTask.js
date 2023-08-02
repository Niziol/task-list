import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttpRequest from '../../hooks/use-httpRequest';

const NewTask = (props) => {
	const { isLoading, error, sendRequest: sendTaskRequest } = useHttpRequest();
	const URL =
		'https://react-task-list-4976a-default-rtdb.firebaseio.com/tasks.json';

	const createTask = (taskText, taskData) => {
		const generatedId = taskData.name;
		const createdTask = { id: generatedId, text: taskText };
		props.onAddTask(createdTask);
	};

	const enterTaskHandler = async (taskText) => {
		sendTaskRequest(
			{
				url: URL,
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: { text: taskText },
			},
			createTask.bind(null, taskText)
		);
	};

	return (
		<Section>
			<TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
			{error && <p>{error}</p>}
		</Section>
	);
};

export default NewTask;
