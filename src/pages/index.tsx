import { lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

const HomePage = lazy(() => import("./home"));
const ProfilePage = lazy(() => import("./profile"));

// TODO: Add auth zone restricting
// TODO: Add query-params provider
// TODO: decompose into app/hocs? (withRouter)

const Routing = () => {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/profile" component={ProfilePage} />
            <Redirect to="/" />
        </Switch>
    );
};

export default Routing;
