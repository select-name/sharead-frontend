import { Typography, Layout, Divider, Checkbox, Slider } from "antd";

import { fakeApi } from "shared/api";
import * as catalogParams from "../params";
import styles from "./styles.module.scss";

const CatalogSidebar = () => {
    return (
        <Layout.Sider className={styles.root} width={400}>
            <div className={styles.rootInner}>
                <Typography.Title level={4} className={styles.title}>
                    Фильтры
                </Typography.Title>

                <PriceSection />
                <TimeSection />
                <CategorySection />
                <AuthorSection />
                <PublisherSection />
            </div>
        </Layout.Sider>
    );
};

// FIXME: Скрывать авторов, если нет в наличии книг по ним
const AuthorSection = () => {
    const params = catalogParams.useFilterByAuthor();
    // Some options could be disabled
    const options = fakeApi.authors.getAll().map((a) => ({
        label: fakeApi.authors.getShortname(a),
        value: a.id,
    }));

    return (
        <section className={styles.section}>
            <Divider plain>Автор</Divider>
            <Checkbox.Group
                options={options}
                value={params.authors || []}
                // @ts-ignore
                onChange={params.setAuthors}
            />
        </section>
    );
};

const PublisherSection = () => {
    const params = catalogParams.useFilterByPublisher();
    // Some options could be disabled
    const options = fakeApi.publishers.getAll().map((a) => ({
        label: `${a.name} (${a.city})`,
        value: a.id,
    }));

    return (
        <section className={styles.section}>
            <Divider plain>Издательство</Divider>
            <Checkbox.Group
                options={options}
                value={params.publishers || []}
                // @ts-ignore
                onChange={params.setPublishers}
            />
        </section>
    );
};

const CategorySection = () => {
    const params = catalogParams.useFilterByCategory();
    // Some options could be disabled
    const options = fakeApi.categories.getAll().map((a) => ({
        label: a.name,
        value: a.id,
    }));

    return (
        <section className={styles.section}>
            <Divider plain>Категория</Divider>
            <Checkbox.Group
                options={options}
                value={params.categories || []}
                // @ts-ignore
                onChange={params.setCategories}
            />
        </section>
    );
};

const PriceSection = () => {
    const params = catalogParams.usePrices();

    return (
        <section className={styles.section}>
            <Divider plain>Цена аренды</Divider>
            <Slider
                range
                marks={{ 50: "50 р", 1000: "1000 р" }}
                defaultValue={[params.from, params.to]}
                step={50}
                min={catalogParams.MIN_PRICE}
                max={catalogParams.MAX_PRICE}
                onChange={([from, to]) => params.setPrice(from, to)}
            />
        </section>
    );
};
/* FIXME: replace to datepicker later */
const TimeSection = () => (
    <section className={styles.section}>
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
);

// const OwnerSection = () => (
//     <section className={styles.section}>
//         <Divider plain>Рейтинг владельца</Divider>
//         <Slider range marks={{ 1: "1", 5: "5" }} defaultValue={[1, 5]} min={1} max={5} disabled />
//     </section>
// );

export default CatalogSidebar;
