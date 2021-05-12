import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import EmploeeList from './components/EmploeeList';
import StatisticsReport from './components/StatisticsReport';

function App() {
    return (
        <div id="app">
            <Navbar />
            <div class="container">
                <LoginForm />
            </div>
        </div>
    )
}

export default App;
