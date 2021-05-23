import { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

// Привет yet-another свалка хелперов

export const useVisibility = (initialVisible = false) => {
    const [visible, setVisible] = useState(initialVisible);
    return {
        visible,
        close: () => setVisible(false),
        open: () => setVisible(true),
    };
};

export const useRedirectOn = (value: boolean, redirectTo: string) => {
    const history = useHistory();

    useEffect(() => {
        if (value) {
            history.push(redirectTo);
        }
    }, [value, redirectTo, history]);
};
