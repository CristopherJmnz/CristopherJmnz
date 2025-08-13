import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './common/components/Layout/Layout';
import { Home } from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
