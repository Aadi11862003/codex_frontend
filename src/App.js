import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Compiler from './components/Compiler/Compiler';
// import Home from './components/Home/Home';
import AIChatbot from './components/AIChatbot/AIChatbot';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dash from './components/Dashboard/Dashboard';
import Vis from './components/CodeVisualizer/CodeVisualizer';
import AlgorithmsPage from './components/Algorithms/AlgorithmsPage';
import SortingAlgorithms from './components/Algorithms/SortingAlgorithms';
import BubbleSortVisualizer from './components/SortingVisualizer/BubbleSortVisualizer';
import QuickSortVisualizer from './components/SortingVisualizer/QuickSortVisualizer';
import InsertionSortVisualizer from './components/SortingVisualizer/InsertionSortVisualizer';
import MergeSortVisualizer from './components/SortingVisualizer/MergeSortVisualizer';
import CodeVisualizer from './components/CodeVisualizer/CodeVisualizer';

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen bg-black text-white">
                {/* <Navbar /> */}
                <div className="flex-1 p-4">
                    <Routes>
                        {/* <Route path="/home" element={<Home />} /> */}
                        <Route path="/" element={<Dash />} />
                        <Route path="/visualize" element={<Vis />} />
                        <Route path="/algorithms" element={<AlgorithmsPage />} />
                        <Route path="/algorithms/sorting" element={<SortingAlgorithms />} />
                        <Route path="/visualize/bubble-sort" element={<BubbleSortVisualizer />} />
                        <Route path="/visualize/quick-sort" element={<QuickSortVisualizer />} />
                        <Route path="/visualize/insertion-sort" element={<InsertionSortVisualizer />} />
                        <Route path="/visualize/merge-sort" element={<MergeSortVisualizer />} />
                        <Route path="/visualize/code" element={<CodeVisualizer />} />
                        {/* Add routes for other categories like Graph Algorithms */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/compiler" element={<Compiler />} />
                    </Routes>
                </div>
                <AIChatbot />
            </div>
        </Router>
    );
}

export default App;
