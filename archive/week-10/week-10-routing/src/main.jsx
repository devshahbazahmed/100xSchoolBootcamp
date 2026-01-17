import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Chat from './Chat';
// import App from './App.jsx';
// import App2 from './App2.jsx';
// import Clock from './Clock.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		{/* <App /> */}
		{/* <App2 /> */}
		{/* <Clock /> */}
		<Chat />
	</StrictMode>,
);
