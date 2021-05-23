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
            key: "closed",
            label: "Закрыто",
            value: stat.closed,
        },
        {
            key: "saved",
            label: "Сэкономлено",
            value: stat.saved,
        },
        {
            key: "earned",
            label: "Заработано",
            value: stat.earned,
        },
    ];
};

export const STATUSES = {
    BUSY: <Typography.Text type="success">Арендуется</Typography.Text>,
    FREE: <Typography.Text style={{ color: "#108ee9" }}>Свободна</Typography.Text>,
    WAITING_TRANSFER: <Typography.Text type="warning">Ожидает передачи</Typography.Text>,
    RENTED: <Typography.Text type="success">На руках</Typography.Text>,
    CLOSED: <Typography.Text type="secondary">Аренда завершена</Typography.Text>,
};
