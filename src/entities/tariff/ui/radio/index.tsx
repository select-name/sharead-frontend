import { Radio } from "antd";

const tariffs = [7, 14, 30];
const DEFAULT = 14;

type Props = {
    onChange?: (value: number) => void;
    withTitle?: boolean;
    value?: number;
};

const TariffRadio = ({ onChange, withTitle = true, value = DEFAULT }: Props) => {
    return (
        <div style={{ textAlign: "center" }}>
            {withTitle && <h4>Срок аренды</h4>}
            <Radio.Group
                value={value}
                buttonStyle="solid"
                onChange={(e) => onChange?.(e.target.value)}
                style={{ marginTop: 12 }}
            >
                {tariffs.map((t) => (
                    <Radio.Button key={t} value={t}>
                        {t} д.
                    </Radio.Button>
                ))}
            </Radio.Group>
        </div>
    );
};

export default TariffRadio;
