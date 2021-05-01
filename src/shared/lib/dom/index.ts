import { useEffect } from "react";

/**
 * @hook Задать title странице
 */
export const useTitle = (title: string) => {
    useEffect(() => {
        document.title = title;
    }, [title]);
};

/**
 * Временная реализация скроллинга к верху страницы
 * @remark Используется при пагинации
 * !!! FIXME: temp, resolve better later (by anchors / overflow / ref / scrollHandler / window patching / ...)
 * !!! FIXME: resolve on withAntd level? (with getParentContainer)
 */
export const scrollToTop = () => {
    document.querySelector("html")?.scrollTo({ top: 0, behavior: "smooth" });
};
