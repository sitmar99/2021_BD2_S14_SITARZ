import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import EmploeeList from './components/EmploeeList';
import RegistryList from './components/RegistryList';

function App() {
    return (
        <div id="app">
            <Navbar />
            <div class="container">
                <RegistryList />
            </div>
        </div>
    )
}

export default App;
