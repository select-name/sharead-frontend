import React, { Suspense } from "react";
import { Spin } from "antd";
import { BrowserRouter, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";

/**
 * @hoc Инициализация роутера с провайдером для работы с get-параметрами
 */

// FIXME: refine type later
// FIXME: center loader
// eslint-disable-next-line react/display-name
const withRouter = (component: () => React.ReactNode) => () =>
    (
        <BrowserRouter>
            <Suspense fallback={<Spin delay={300} className="overlay" size="large" />}>
                <QueryParamProvider ReactRouterRoute={Route}>{component()}</QueryParamProvider>
            </Suspense>
        </BrowserRouter>
    );

export default withRouter;
