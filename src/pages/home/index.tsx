import { Button } from "antd";
import cn from "classnames";
// import sectionHero from "./assets/section_hero.png";
import styles from "./styles.module.scss";

const HomePage = () => {
    return (
        <div>
            <section className={cn(styles.section, styles.hero)}>
                <div className={styles.heroContent}>
                    <h2>Букшэринг</h2>
                    <p>
                        Мы предлагаем сервис, который позволяет людям обмениваться книгами. Владелец
                        книги может отдать её сервису, чтобы предложить желающим арендовать её.
                        Книгу можно отдать навсегда или на время. Желающие могут пользоваться книгой
                        выбранный срок и платят за это меньше, чем книга стоит в магазине.
                    </p>
                    <Button>Попробовать</Button>
                </div>
            </section>
            <section className={styles.section}>Section 1</section>
            <section className={styles.section}>Section 2</section>
        </div>
    );
};

export default HomePage;
