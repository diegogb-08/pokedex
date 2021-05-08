import { BrowserRouter, Route, Switch } from "react-router-dom";
import Battle from "./components/Battle/Battle";
import Color from "./components/Color/Color";
import Home from "./components/Home/Home";
import Landing from "./components/Landing/Landing";
import Location from "./components/Location/Location";
import Species from "./components/Species/Species";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path={'/'} exact component={Landing} />
          <Route path={'/home'} exact component={Home} />
          <Route path={'/location'} exact component={Location} />
          <Route path={'/color'} exact component={Color} />
          <Route path={'/species'} exact component={Species} />
          <Route path={'/battle'} exact component={Battle} />
        </Switch>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
