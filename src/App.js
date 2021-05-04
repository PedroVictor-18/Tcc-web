import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes from './routes';
import store from './redux/store';
import './styles/style.css';
import './styles/buttom.css';

import env from './env';

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter basename={env.BASE_NAME}>
				<Routes />
			</BrowserRouter>
		</Provider>
	);
}

export default App;
