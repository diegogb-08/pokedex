import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Landing from "./components/Landing/Landing";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path={'/'} exact component={Landing} />
          <Route path={'/home'} exact component={Home} />
        </Switch>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
