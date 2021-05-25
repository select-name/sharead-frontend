import { Radio } from "antd";
import { DEFAULT, TARIFFS } from "../../lib";

type Props = {
    onChange?: (value: number) => void;
    withTitle?: boolean;
    value?: number;
    disabled?: boolean;
    __byDuration?: number;
};

const TariffRadio = (props: Props) => {
    const { onChange, value = DEFAULT, disabled, __byDuration } = props;

    // !!! FIXME: Жесткий костыль!!!
    const getTValue = (t: number) => {
        if (!__byDuration) return t;
        return t <= __byDuration ? value : -1;
    };

    return (
        <div style={{ textAlign: "center" }}>
            {/* {withTitle && <h4>Срок аренды</h4>} */}
            <Radio.Group
                value={value}
                buttonStyle="solid"
                onChange={(e) => onChange?.(e.target.value)}
                style={{ marginTop: 12 }}
                disabled={disabled || Boolean(__byDuration)}
            >
                {TARIFFS.map((t) => (
                    <Radio.Button key={t} value={getTValue(t)}>
                        {t} д.
                    </Radio.Button>
                ))}
            </Radio.Group>
        </div>
    );
};

export default TariffRadio;
