import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './containers/Home';
import { Error404 } from './containers/errors/Error404';
import { DataProvider } from './context/context';
import { Recovery } from './containers/Recovery';
import { Reports } from './containers/Reports';
import { About } from './containers/About';

export const App:React.FC = () => {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path='*' element={<Error404/>} />
          <Route path='/' element={<Home />} />
          <Route path='about' element={<About /> } />
          <Route path='/reports' element={<Reports />} />
          <Route path='/recovery' element={<Recovery />} />
        </Routes>
      </Router>
    </DataProvider>
  )
}

export default App
