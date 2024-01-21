import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Sider } from './components';
import { Home } from './pages'

const App = () => {
  return (
    <Router>
      <Header />
      <div className='md:flex'>
        <Sider />
        <Routes>
          <Route path="/" exact element={<Home />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App