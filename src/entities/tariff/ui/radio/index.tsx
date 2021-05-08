import { Radio, Typography } from "antd";

const tariffs = [7, 14, 30];
const DEFAULT = 14;

type Props = {
    onChange: (value: number) => void;
};

const TariffRadio = ({ onChange }: Props) => {
    return (
        <div style={{ textAlign: "center" }}>
            <Typography.Text>Срок аренды</Typography.Text>
            <Radio.Group
                value={DEFAULT}
                buttonStyle="solid"
                onChange={(e) => onChange(e.target.value)}
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
