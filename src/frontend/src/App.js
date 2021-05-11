import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import EmploeeList from './components/EmploeeList';

function App() {
    return (
        <div id="app">
            <Navbar />
            <div class="container">
                <EmploeeList />
            </div>
        </div>
    )
}

export default App;
