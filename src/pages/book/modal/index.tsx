import { Modal, Button, Row, Card, Descriptions } from "antd";
import dayjs from "dayjs";

import { fakeApi } from "shared/api";
import { hooks } from "shared/lib";

type BaseProps = {
    bookId: number;
};

export const Content = ({ bookId }: BaseProps) => {
    const userBooks = fakeApi.users.getUserBooksByABook(bookId);

    return (
        <Row gutter={[0, 20]}>
            {userBooks.map((bu) => (
                <Card key={bu.id} hoverable>
                    <Descriptions>
                        <Descriptions.Item label="Владелец">
                            {bu.owner.firstName} {bu.owner.lastName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Доступно до">
                            {dayjs(bu.availableBefore).format("DD.MM.YYYY")}
                        </Descriptions.Item>
                        {/* <Descriptions.Item label="Цена в день">{bu.costPerDay}</Descriptions.Item> */}
                    </Descriptions>
                </Card>
            ))}
        </Row>
    );
};

// FIXME: @temp @lowCoupling @moveLater
export const BooksModal = ({ ...baseProps }: BaseProps) => {
    const modal = hooks.useVisibility();
    return (
        <>
            <Button type="primary" onClick={modal.open}>
                Посмотреть экземпляры
            </Button>
            <Modal
                title="Экземпляры книги"
                visible={modal.visible}
                centered
                onOk={modal.close}
                onCancel={modal.close}
                width={800}
            >
                <Content {...baseProps} />
            </Modal>
        </>
    );
};
