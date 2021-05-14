import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import EmploeeList from './components/EmploeeList';
import RegistryList from './components/RegistryList';
import ResourceList from './components/ResourceList';

function App() {
    return (
        <div id="app">
            <Navbar />
            <div className="container">
                <ResourceList />
            </div>
        </div>
    )
}

export default App;
