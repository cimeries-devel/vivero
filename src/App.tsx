import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './containers/Home';
import { Error404 } from './containers/errors/Error404';
import './index.css';

export const App:React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='*' element={<Error404/>} />
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
