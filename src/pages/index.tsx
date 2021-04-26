import { lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

const HomePage = lazy(() => import("./home"));
const ProfilePage = lazy(() => import("./profile"));
const CatalogPage = lazy(() => import("./catalog"));
// Страница без хедера
const NoHeaderPage = lazy(() => import("./debug/no-header"));

// TODO: Сделать работу с хедером на уровне pages
export const headerIgnoreRoutes = ["/debug/no-header"];

// TODO: Add auth zone restricting
// TODO: Add query-params provider
// TODO: decompose into app/hocs? (withRouter)

const Routing = () => {
    return (
        <Switch>
            {/* FIXME: move to "about" */}
            <Route exact path="/" component={HomePage} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/catalog" component={CatalogPage} />
            <Route exact path="/debug/no-header" component={NoHeaderPage} />
            {/* FIXME: temp! (redirect later to main home page) */}
            <Redirect to="/catalog" />
        </Switch>
    );
};

export default Routing;
