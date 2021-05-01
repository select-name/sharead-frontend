import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import { dom } from "shared/lib";

/**
 * @hook Логика сброса скроллинга на каждой странице
 * @see https://medium.com/@nasir/reset-scroll-position-on-change-of-routes-react-a0bd23093dfe
 */
export const useResetScrollAtEveryPage = () => {
    const history = useHistory();
    const prev = useRef<string>();

    useEffect(() => {
        // Скроллим наверх, только если поменялась страница, НО не параметры
        // Чтобы не сбивало с толку при постановке фильтров
        const unlisten = history.listen((location) => {
            if (prev.current !== location.pathname) {
                dom.scrollToTop();
            }

            prev.current = location.pathname;
        });
        return () => {
            unlisten();
        };
    }, [history]);
};
