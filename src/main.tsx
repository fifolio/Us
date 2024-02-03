// Import the ReactDOM module from the 'react-dom/client' package
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

// Import the App component from a file named 'App'
import App from './App';

// Find the DOM element with the id 'root'
const rootElement = document.getElementById('root');

// Create a root with Concurrent Mode enabled and associate it with the 'root' element

const root = ReactDOM.createRoot(rootElement!);

// Render the App component as the root of the React application

root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)

