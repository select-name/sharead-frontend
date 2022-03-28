import { YMInitializer } from "react-yandex-metrika";
import Routing from "pages";
import { METRIKA_ID } from "shared/config";
import { withHocs } from "./hocs";
import "./index.scss";

// const METRIKA_ID = process.env.REACT_APP_METRIKA_ID
//     ? Number(process.env.REACT_APP_METRIKA_ID)
//     : undefined;
const yaMetrikaOptions = {
    defer: true,
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
    ecommerce: "dataLayer",
};

// eslint-disable-next-line no-console
console.log("[DEBUG] METRIKA_ID =", METRIKA_ID);

// FIXME: Возможно, понабодится более сложная разметка позднее
const App = () => (
    <>
        {METRIKA_ID && <YMInitializer accounts={[METRIKA_ID]} options={yaMetrikaOptions} />}
        <div style={{ display: "none" }}>[METRIKA_ID={METRIKA_ID}]</div>
        <Routing />
    </>
);

export default withHocs(App);
