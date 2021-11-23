import { FC } from "react";
import { Typography, Layout } from "antd";

import { Books } from "./books";
import { Authors } from "./authors";
import { Categories } from "./catergories";
import { Banner } from "./banner";

import styles from "./styles.module.scss";

const SectionWrapper: FC<{ title?: string }> = ({ title, children }) => (
    <section className={styles.rootSection}>
        {title && (
            <Typography.Title className={styles.rootSectionTitle} level={2}>
                {title}
            </Typography.Title>
        )}
        {children}
    </section>
);

const sections = [
    {
        id: 1,
        Section: Banner,
    },
    {
        id: 2,
        title: "Категории книг",
        Section: Categories,
    },
    {
        id: 3,
        title: "Популярные авторы",
        Section: Authors,
    },
    {
        id: 4,
        title: "Популярные книги",
        Section: Books,
    },
];

const Sections = () => (
    <Layout.Content>
        {sections.map(({ id, title, Section }) => (
            <SectionWrapper key={id} title={title}>
                <Section />
            </SectionWrapper>
        ))}
    </Layout.Content>
);

export { Sections };
