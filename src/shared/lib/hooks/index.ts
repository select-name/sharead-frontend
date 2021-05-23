import { useState } from "react";

export const useVisibility = (initialVisible = false) => {
    const [visible, setVisible] = useState(initialVisible);
    return {
        visible,
        close: () => setVisible(false),
        open: () => setVisible(true),
    };
};
