import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { dom } from "shared/lib";

/**
 * @hook Логика сброса скроллинга на каждой странице
 * @see https://medium.com/@nasir/reset-scroll-position-on-change-of-routes-react-a0bd23093dfe
 */
export const useResetScrollAtEveryPage = () => {
    const history = useHistory();

    useEffect(() => {
        const unlisten = history.listen(() => {
            dom.scrollToTop();
        });
        return () => {
            unlisten();
        };
    }, [history]);
};
