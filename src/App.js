import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePageContainer from "./containers/HomePage/HomePageContainer/HomePageContainer";
import CartPageContainer from "./containers/CartPage/CartPageContainer/CartPageContainer";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import CheckoutContainer from "./containers/Checkout/CheckoutContainer/CheckoutContainer";
import GoTop from "./components/ScrollToTop/ScrollToTop";
import OrdersContainer from "./containers/Orders/OrdersContainer/OrdersContainer";
import ProductListPage from "./containers/ProductListPage/ProductListPage";
import ProductDetailsPageContainer from "./containers/ProductDetailsPage/ProductDetailsPageContainer/ProductDetailsPageContainer";
function App() {
  return (
    <div className="App">
      <Router>
        {/* dasdas */}
        <GoTop scrollStepInPx="9999999" delayInMs="500" />
        <Switch>
          <Route path="/" exact component={HomePageContainer} />
          <PrivateRoute path="/orders" component={OrdersContainer} />
          <PrivateRoute path="/checkout" component={CheckoutContainer} />
          <Route path="/cart" component={CartPageContainer} />
          <Route
            path="/:productSlug/:productId/p"
            component={ProductDetailsPageContainer}
          />
          <Route path="/:slug" component={ProductListPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
