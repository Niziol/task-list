import { useState } from 'react';

const useHttpRequest = (URL, method, saveHandler) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const sendRequest = async (content = null) => {
		setIsLoading(true);
		setError(null);

		try {
			const options = {
				method: method,
			};

			if (method === 'POST') {
				options.headers = {
					'Content-Type': 'application/json',
				};
				options.body = JSON.stringify({ text: content });
			}

			const response = await fetch(URL, options);

			if (!response.ok) {
				throw new Error('Request failed!');
			}

			const data = await response.json();

			switch (method) {
				case 'POST':
					const generatedId = data.name;
					const createdTask = { id: generatedId, text: content };
					saveHandler(createdTask);
					break;
				case 'GET':
					const loadedTasks = [];
					for (const taskKey in data) {
						loadedTasks.push({ id: taskKey, text: data[taskKey].text });
					}

					saveHandler(loadedTasks);
					break;

				default:
					throw new Error('Unsupported HTTP Request method provided!');
			}
		} catch (err) {
			setError(err.message || 'Something went wrong!');
		}
		setIsLoading(false);
	};

	return [isLoading, error, sendRequest]
};

export default useHttpRequest;
