import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

const HomePage = lazy(() => import("./home"));
const ProfilePage = lazy(() => import("./profile"));

// TODO: Add auth zone restricting
// TODO: Add query-params provider
// TODO: decompose into app/hocs? (withRouter)

const Routing = () => {
    return (
        <BrowserRouter>
            <Suspense fallback="Loading...">
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/profile" component={ProfilePage} />
                    <Redirect to="/" />
                </Switch>
            </Suspense>
        </BrowserRouter>
    );
};

export default Routing;
