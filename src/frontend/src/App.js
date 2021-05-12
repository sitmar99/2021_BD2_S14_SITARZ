import Navbar from './components/Navbar';
import ReportsPanel from './panels/ReportsPanel';
import LoginForm from './components/LoginForm';
import EmploeeList from './components/EmploeeList';
import StatisticsReport from './components/StatisticsReport';

function App() {
    return (
        <div id="app">
            <Navbar />
            <div className="container">
                <ReportsPanel />
            </div>
        </div>
    )
}

export default App;
