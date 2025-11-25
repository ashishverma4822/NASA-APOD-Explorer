import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import SearchPage from './pages/Search';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-space-black text-gray-100 font-sans selection:bg-blue-500/30 flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;