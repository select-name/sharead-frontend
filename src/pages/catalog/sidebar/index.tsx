import { Typography, Layout, Divider, Checkbox, Slider } from "antd";

import * as fapi from "shared/fixtures";
import * as catalogParams from "../params";
import styles from "./styles.module.scss";

const CatalogSidebar = () => {
    return (
        <Layout.Sider className={styles.root} width={400}>
            <Typography.Title level={4} className={styles.title}>
                Фильтры
            </Typography.Title>

            <AuthorSection />
            <PublisherSection />
            <PriceSection />
            <TimeSection />
            <OwnerSection />
        </Layout.Sider>
    );
};

const AuthorSection = () => {
    const params = catalogParams.useFilterByAuthor();
    // Some options could be disabled
    const options = fapi.authors.getAll().map((a) => ({
        label: fapi.authors.getShortname(a),
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
    const options = fapi.publishers.getAll().map((a) => ({
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
const PriceSection = () => (
    <section className={styles.section}>
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
);
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
const OwnerSection = () => (
    <section className={styles.section}>
        <Divider plain>Рейтинг владельца</Divider>
        <Slider range marks={{ 1: "1", 5: "5" }} defaultValue={[1, 5]} min={1} max={5} disabled />
    </section>
);

export default CatalogSidebar;