import { Tile } from "shared/ui";

type Props = {
    days: number;
    price: number;
    overprice: number;
};

const TariffTile = (props: Props) => {
    const { days, overprice, price } = props;

    return (
        <Tile.Item
            label={
                <span>
                    <b>{price} ₽</b>
                    <s>{overprice} ₽</s>
                </span>
            }
            value={<span>{days} дн.</span>}
        />
    );
};

export default TariffTile;
