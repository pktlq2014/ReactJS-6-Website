import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./containers/HomePage/HomePage";
import CartPage from "./containers/CartPage/CartPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Checkout from "./containers/Checkout/Checkout";
import GoTop from "./components/ScrollToTop/ScrollToTop";
import ProductListPage from "./containers/ProductListPage/ProductListPage";
import ProductDetailsPage from "./containers/ProductDetailsPage/ProductDetailsPage";
function App() {
  return (
    <div className="App">
      <Router>
        <GoTop scrollStepInPx="9999999" delayInMs="500" />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <PrivateRoute path="/checkout" component={Checkout} />
          <Route path="/cart" component={CartPage} />
          <Route
            path="/:productSlug/:productId/p"
            component={ProductDetailsPage}
          />
          <Route path="/:slug" component={ProductListPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
