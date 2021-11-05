import { Typography } from "antd";

import { viewerLib } from "entities/viewer";
import type { User } from "shared/api";

export const getStats = (viewer: User) => {
    const stat = viewerLib.getUserStat(viewer);

    return [
        {
            key: "registered",
            label: "В сервисе с",
            value: stat.registered,
        },
        {
            key: "saved",
            label: "Сэкономлено",
            value: stat.saved,
        },
    ];
};
