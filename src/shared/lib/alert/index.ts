import { notification } from "antd";

/**
 * NOTE: Вынес в отдельный модуль для:
 * - упрощения API (более нормализированное и привычное)
 * - для стандартизации единого placement для всех алертов
 */
const generateOpener = (type: import("antd/lib/notification").IconType) => (
    message: any,
    description?: any,
) => {
    notification.open({ type, message, description, placement: "bottomRight" });
};

const error = generateOpener("error");
const success = generateOpener("success");
const warn = generateOpener("warning");
const info = generateOpener("info");

const alert = { error, success, warn, info };

export default alert;
