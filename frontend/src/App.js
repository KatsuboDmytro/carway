import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, SignUp, Home, AboutDriver, AboutDeparture } from "./pages/index";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/home' element={<Home />}/>
          <Route path='/about/:id' element={<AboutDriver />}/>
          <Route path='/departure/:id' element={<AboutDeparture />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
