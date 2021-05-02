import { lazy } from "react";
import { Route, Switch, Redirect, useRouteMatch } from "react-router-dom";

const CartPage = lazy(() => import("./cart"));
const CheckoutPage = lazy(() => import("./checkout"));
const SuccessPage = lazy(() => import("./success"));

const Routing = () => {
    const match = useRouteMatch();

    return (
        <Switch>
            <Route exact path={`${match.path}`} component={CartPage} />
            <Route exact path={`${match.path}/checkout`} component={CheckoutPage} />
            <Route exact path={`${match.path}/success`} component={SuccessPage} />
            <Redirect to={`${match.path}`} />
        </Switch>
    );
};

export default Routing;
