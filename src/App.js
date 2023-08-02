import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttpRequest from './hooks/use-httpRequest';

function App() {
	const [tasks, setTasks] = useState([]);
	const URL =
		'https://react-task-list-4976a-default-rtdb.firebaseio.com/tasks.json';
	const [isLoading, error, fetchHandler] = useHttpRequest(URL, 'GET', setTasks);

	useEffect(() => {
		fetchHandler();
	}, []);

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
				onFetch={fetchHandler}
			/>
		</React.Fragment>
	);
}

export default App;
