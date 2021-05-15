import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import EmploeeList from './components/EmploeeList';
import RegistryList from './components/RegistryList';
import ResourceList from './components/ResourceList';
import ServicesList from './components/ServicesList';

function App() {
    return (
        <div id="app">
            <Navbar />
            <div className="container">
                <ServicesList />
            </div>
        </div>
    )
}

export default App;
