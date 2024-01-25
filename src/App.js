import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import "./App.css";
import Navbar from "./components/Navbar";
import Book from "./pages/Book";
import Dictionary from "./pages/Dictionary"; // Adjust the import statement
import Home from "./pages/Home";
import Quiz from './pages/Quiz';
import Word from "./pages/Word";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/word" exact component={Word} />
          <Route path="/dictionary" exact component={Dictionary} /> 
          <Route path="/book" exact component={Book} />
          <Route path="/quiz" exact component={Quiz} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
