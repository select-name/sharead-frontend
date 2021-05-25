import dayjs from "dayjs";
import { fakeApi } from "shared/api";

// import type { Book } from "shared/api";
// type RentStat = {
//     book: Book;
//     maxDuration: number;
//     isAvailable: boolean;
// };

/**
 * Общий эндпоинт для получения информации для аренды книги
 *
 * Учет duration здесь не ведется, но выводится статистическая информация
 *
 * @example
 * Просчитываем статусы по аренде для каждого экземпляра книги
 * Т.е. для конкретной книги ("Book") должно соблюдаться:
 * - Должна быть экземпляром данной абстрактной книги
 * - На данный момент не должна фигурировать в каком либо заказе со статусами RENTED | WAITING_TRANSFER
 * - Должно соблюдаться равенство: `diff(now, book.availableBefore) >= duration`
 */
export const getRentInfo = (aBookId: number) => {
    const userBooks = fakeApi.users.getUserBooksByABook(aBookId);
    // Нет экземпляров
    if (!userBooks.length) return { duration: -1, available: false, items: [] };

    // Статусы по книгам
    // Интервалы для аренды
    const rentStats = userBooks.map((ub) => {
        const maxDuration = dayjs(ub.availableBefore).diff(dayjs(), "day");
        const orders = fakeApi.orders.getByBookId(ub.id).sort((a, b) => a.id - b.id);
        const lastStatus = orders.slice(-1)[0].status;

        const isAvailable = !orders.length || lastStatus === "CLOSED";

        return {
            book: ub,
            maxDuration,
            isAvailable,
        };
    });

    const availableBooks = rentStats.filter((rs) => rs.isAvailable);

    return {
        duration: Math.max(...availableBooks.map((rs) => rs.maxDuration)),
        available: availableBooks.length > 0,
        items: rentStats,
    };

    // Для бронирования (возможно)
    // - Разница между сроком завершения аренды этого экземпляра и датой возвращения книги хозяину
    // должна быть не меньше запрашиваемой длительности
    // diff(book.availableBefore, order.endAt) < duration

    // Для бронирования
    // - Человек встает в очередь (без конкретных дат)
    // - При этом те люди, что стоят в начале очереди, в тот момент, как черед доходит до них
    // Получают уведомления о том, что запрашиваемая ими книга освободилась
    // (предполагается, думаю, что каждый день идет автопроверка для всех reserved-books)
    //
    // Либо же можно триггерится на любое "завершение" аренды и чекать доступно ли для последнего человека из списка
    // При этом нужно аккуратно зарезолвить момент, чтобы из-за большого duration не толпилась вся очередь
    //
    // FIXME: Добавить доп. поля для Reservation ("PENDING" | "REJECTED" | "RESOLVED")
    // + дату предполагаемого реджекта
    // + duration?
};
