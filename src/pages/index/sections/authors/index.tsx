import { useHistory } from "react-router-dom";
import { Col, Row, Typography } from "antd";

import { fakeApi } from "shared/api";
import styles from "./styles.module.scss";

import imgIlyahov from "./assets/ilyahov.jpg";
import imgPalanick from "./assets/palanick.jpg";
import imgTaleb from "./assets/taleb.jpg";
import imgOrwell from "./assets/orwell.jpg";
import imgTolstoy from "./assets/tolstoy.jpg";

const srcAuthorsMap: Record<number, string> = {
    7: imgIlyahov,
    2: imgPalanick,
    3: imgTaleb,
    10: imgOrwell,
    1: imgTolstoy,
};

const Authors = () => {
    const authorsQuery = fakeApi.library.authors.getPopular();
    const history = useHistory();

    return (
        <Row className={styles.authors} justify="space-around">
            {authorsQuery.map((au) => (
                <Col
                    key={au.id}
                    className={styles.authorsItem}
                    span={3}
                    // FIXME: hardcoded param!
                    onClick={() => history.push(`/catalog?authors=${au.id}`)}
                    title="Перейти к книгам автора"
                >
                    {/* TODO: Добавить позже фильрацию по категориям + ссылку на страницы */}
                    <Typography.Title level={4} className={styles.authorsItemTitle}>
                        {fakeApi.library.authors.getShortname(au)}
                    </Typography.Title>
                    <div className={styles.authorsItemCover}>
                        {/* <UserOutlined {...au.avatar} /> */}
                        <img src={srcAuthorsMap[au.id]} alt="Logo" width={200} />
                    </div>
                </Col>
            ))}
        </Row>
    );
};

export { Authors };
