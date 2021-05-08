import { Radio } from "antd";

const tariffs = [7, 14, 30];
const DEFAULT = 14;

type Props = {
    onChange?: (value: number) => void;
    withTitle?: boolean;
    value?: number;
    disabled?: boolean;
};

const TariffRadio = (props: Props) => {
    const { onChange, withTitle = true, value = DEFAULT, disabled } = props;
    return (
        <div style={{ textAlign: "center" }}>
            {withTitle && <h4>Срок аренды</h4>}
            <Radio.Group
                value={value}
                buttonStyle="solid"
                onChange={(e) => onChange?.(e.target.value)}
                style={{ marginTop: 12 }}
                disabled={disabled}
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
