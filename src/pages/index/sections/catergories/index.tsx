// FIXME: Озон прости, это временно...
import { useHistory } from "react-router-dom";
import { Col, Row, Typography } from "antd";
import { fakeApi } from "shared/api";
import imgCat3 from "./assets/c3.png";
import imgCat2 from "./assets/c2.png";
import imgCat1 from "./assets/c1.png";

import styles from "./styles.module.scss";

const srcCategoriesMap: Record<number, string> = {
    1: imgCat3,
    2: imgCat2,
    3: imgCat1,
};

const Categories = () => {
    const categoriesQuery = fakeApi.library.categories.getAll();
    const history = useHistory();

    return (
        <Row className={styles.categories} justify="space-between">
            {categoriesQuery.map((cat) => (
                <Col
                    key={cat.id}
                    className={styles.categoriesItem}
                    span={7}
                    // FIXME: hardcoded param!
                    onClick={() => history.push(`/catalog?cat=${cat.id}`)}
                    title="Переход к книгам по категории"
                >
                    {/* TODO: Добавить позже фильрацию по категориям + ссылку на страницы */}
                    <div className={styles.categoriesItemText}>
                        <Typography.Title level={3} className={styles.text}>
                            {cat.name}
                        </Typography.Title>
                        <Typography.Text className={styles.text}>{cat.description}</Typography.Text>
                    </div>
                    <div className={styles.categoriesItemCover}>
                        <img src={srcCategoriesMap[cat.id]} alt="logo" />
                        {/* <BookFilled {...cat.cover} /> */}
                    </div>
                </Col>
            ))}
        </Row>
    );
};

export { Categories };
