import { Route, useLocation } from 'react-router-dom';
import './App.css';
import { Landing, Home, Form, Detail } from './views';
import NavBar from './components/NavBar/NavBar';

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}
      <Route exact path="/" component={Landing} />

      <Route exact path="/home" render={() => <Home />} />

      <Route exact path="/create" render={() => <Form />} />

      <Route exact path="/detail" render={() => <Detail />} />
    </div>
  );
}

export default App;
