import { Steps } from "antd";

type Props = {
    current: 0 | 1 | 2;
    className?: string;
};

export const View = ({ current, className }: Props) => (
    <Steps current={current} className={className}>
        <Steps.Step title="Корзина" description="Проверьте свой выбор" />
        <Steps.Step title="Оформление" description="Выбор оплаты, доставки" />
        <Steps.Step title="Доставка" description="Получение заказа" />
    </Steps>
);
