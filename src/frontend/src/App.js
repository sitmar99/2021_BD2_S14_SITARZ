import Navbar from './components/Navbar';
import ReportsPanel from './panels/ReportsPanel';

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
