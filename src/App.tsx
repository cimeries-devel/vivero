import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './containers/Home';
import { Error404 } from './containers/errors/Error404';
import { DataProvider } from './context/context';

export const App:React.FC = () => {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path='*' element={<Error404/>} />
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </DataProvider>
  )
}

export default App
