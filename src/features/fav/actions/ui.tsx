import { Button } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

import { viewerModel } from "entities/viewer";
import { bookModel } from "entities/book";
import { alert } from "shared/lib";

type Props = {
    bookId: number;
};

const useToggleBook = (bookId: number) => {
    const { isBookFav } = viewerModel.useBookFavStatus(bookId);
    const book = bookModel.useBook(bookId);

    const handleToggle = () => {
        const action = isBookFav ? "Удалено из избранного" : "Добавлено в избранное";
        alert.info(`${book?.name}`, <a href="/profile#fav">{action}</a>, <HeartOutlined />);
        viewerModel.events.toggleBook(bookId);
    };

    return { handleToggle, isBookFav };
};

export const AddBook = ({ bookId }: Props) => {
    const { handleToggle, isBookFav } = useToggleBook(bookId);

    const Icon = isBookFav ? HeartFilled : HeartOutlined;
    return (
        <Button block icon={<Icon />} onClick={handleToggle}>
            {isBookFav ? "Убрать из избранного" : "В избранное"}
        </Button>
    );
};

export const AddBookMini = ({ bookId }: Props) => {
    const { handleToggle, isBookFav } = useToggleBook(bookId);

    const Icon = isBookFav ? HeartFilled : HeartOutlined;
    return <Icon style={{ fontSize: 20 }} onClick={handleToggle} />;
};
