import { lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { useResetScrollAtEveryPage } from "./hooks";

const IndexPage = lazy(() => import("./index/index"));
const AboutPage = lazy(() => import("./about"));
const ProfilePage = lazy(() => import("./profile"));
const CatalogPage = lazy(() => import("./catalog"));
const BookPage = lazy(() => import("./book"));
const OrderPages = lazy(() => import("./order"));

// Страница без хедера
const NoHeaderPage = lazy(() => import("./debug/no-header"));

// TODO: Сделать работу с хедером на уровне pages
export const headerIgnoreRoutes = ["/debug/no-header"];

// TODO: Add auth zone restricting
// TODO: Add query-params provider
// TODO: decompose into app/hocs? (withRouter)

const Routing = () => {
    useResetScrollAtEveryPage();

    return (
        <Switch>
            <Route exact path="/" component={IndexPage} />
            <Route exact path="/about" component={AboutPage} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/catalog" component={CatalogPage} />
            <Route path="/order" component={OrderPages} />
            <Route exact path="/book/:bookId" component={BookPage} />
            <Route exact path="/debug/no-header" component={NoHeaderPage} />
            <Redirect to="/" />
        </Switch>
    );
};

export default Routing;
