import { Tile } from "shared/ui";

type Props = {
    days: number;
    price: number;
    overprice?: number;
    span?: number;
};

const TariffTile = (props: Props) => {
    const { days, overprice, price, span } = props;

    return (
        <Tile.Item
            label={
                <span>
                    {price} ₽&nbsp;
                    {overprice && (
                        <sup>
                            <s>{overprice} ₽</s>
                        </sup>
                    )}
                </span>
            }
            value={<span>{days} дн.</span>}
            span={span}
        />
    );
};

export default TariffTile;
