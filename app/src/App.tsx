import { Route, Switch } from "wouter";
import HomePage from "./pages/Home";
import TestPage from "./pages/Test";

function App() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/test" component={TestPage} />
    </Switch>
  );
}

export default App;
