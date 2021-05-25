export const TARIFFS = [7, 14, 30];
export const DEFAULT = 14;

export const getTariffBy = (duration: number) => {
    // Оч вкусный костыль, рекомендую
    return TARIFFS.filter((t) => t <= duration).slice(-1)[0];
};
