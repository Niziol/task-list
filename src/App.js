import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttpRequest from './hooks/use-httpRequest';

function App() {
	const [tasks, setTasks] = useState([]);
	const URL =
		'https://react-task-list-4976a-default-rtdb.firebaseio.com/tasks.json';

	const { isLoading, error, sendRequest: fetchTasks } = useHttpRequest();

	useEffect(() => {
		const transformTask = (taskObj) => {
			const loadedTasks = [];
			for (const taskKey in taskObj) {
				loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
			}
			setTasks(loadedTasks);
		};

		fetchTasks(
			{
				url: URL,
			},
			transformTask
		);
	}, [fetchTasks]);

	const taskAddHandler = (task) => {
		setTasks((prevTasks) => prevTasks.concat(task));
	};

	return (
		<React.Fragment>
			<NewTask onAddTask={taskAddHandler} />
			<Tasks
				items={tasks}
				loading={isLoading}
				error={error}
				onFetch={fetchTasks}
			/>
		</React.Fragment>
	);
}

export default App;
