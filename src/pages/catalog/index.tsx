import { Typography, Card, Empty, Layout, Divider, Checkbox, Slider } from "antd";
import { BookFilled } from "@ant-design/icons";

// FIXME: resolve better params usage
import { Header, headerParams } from "features/header";
import * as fapi from "shared/fixtures";
import * as catalogParams from "./params";
// FIXME: Не умеет обрабатывать jpg!
// import ImgPlaceholder from "./book-placeholder.jpg";
import styles from "./styles.module.scss";

// !!! FIXME: split by features!
// TODO: Add skeletons loader

const useFilters = () => {
    const { authors, setAuthors } = catalogParams.useFilterByAuthor();
    const { publishers, setPublishers } = catalogParams.useFilterByPublisher();

    return { authors, setAuthors, publishers, setPublishers };
};

/**
 * @page Каталог книг
 */
// eslint-disable-next-line max-lines-per-function
const CatalogPage = () => {
    const params = headerParams.useSearchParam();
    const filters = useFilters();

    const booksQuery = fapi.books.getList({ search: params.search });
    // Some options could be disabled
    const authorsOptions = fapi.authors.getAll().map((a) => ({
        label: fapi.authors.getShortname(a),
        value: a.id,
    }));
    const publishersOptions = fapi.publishers.getAll().map((a) => ({
        label: `${a.name} (${a.city})`,
        value: a.id,
    }));

    return (
        <Layout>
            <Header />
            <div className={styles.root}>
                <Typography.Title className={styles.title} level={2}>
                    Каталог книг
                </Typography.Title>
                <Layout className={styles.catalog}>
                    <Layout.Content>
                        <div className={styles.grid}>
                            {booksQuery.map((b) => (
                                <Card
                                    key={b.id}
                                    hoverable
                                    style={{ width: "30%" }}
                                    headStyle={{ background: "grey" }}
                                    cover={<BookFilled className={styles.gridItemImgPlaceholder} />}
                                    className={styles.gridItem}
                                >
                                    <Card.Meta
                                        title={b.name}
                                        description={b.authors
                                            .map(fapi.authors.getShortname)
                                            .join(", ")}
                                    />
                                </Card>
                            ))}
                        </div>
                        {booksQuery.length === 0 && (
                            <Empty
                                className={styles.catalogPlaceholder}
                                description="Не удалось найти книги по вашему запросу"
                            />
                        )}
                    </Layout.Content>
                    <Layout.Sider className={styles.sidebar} width={400}>
                        <Typography.Title level={4} className={styles.sidebarTitle}>
                            Фильтры
                        </Typography.Title>
                        <section className={styles.sidebarSection}>
                            <Divider plain>Автор</Divider>
                            <Checkbox.Group
                                options={authorsOptions}
                                value={filters.authors || []}
                                // @ts-ignore
                                onChange={filters.setAuthors}
                            />
                        </section>
                        <section className={styles.sidebarSection}>
                            <Divider plain>Издательство</Divider>
                            <Checkbox.Group
                                options={publishersOptions}
                                value={filters.publishers || []}
                                // @ts-ignore
                                onChange={filters.setPublishers}
                            />
                        </section>
                        <section className={styles.sidebarSection}>
                            <Divider plain>Цена аренды</Divider>
                            <Slider
                                range
                                marks={{ 50: "50 р", 1000: "1000 р" }}
                                defaultValue={[50, 1000]}
                                step={50}
                                min={50}
                                max={1000}
                                disabled
                            />
                        </section>
                        {/* FIXME: replace to datepicker later */}
                        <section className={styles.sidebarSection}>
                            <Divider plain>Срок аренды</Divider>
                            <Slider
                                range
                                marks={{ 1: "1 дн", 60: "60 дн" }}
                                defaultValue={[1, 60]}
                                min={1}
                                max={60}
                                disabled
                            />
                        </section>
                        <section className={styles.sidebarSection}>
                            <Divider plain>Рейтинг владельца</Divider>
                            <Slider
                                range
                                marks={{ 1: "1", 5: "5" }}
                                defaultValue={[1, 5]}
                                min={1}
                                max={5}
                                disabled
                            />
                        </section>
                    </Layout.Sider>
                </Layout>
            </div>
        </Layout>
    );
};

export default CatalogPage;
