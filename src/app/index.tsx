import { YMInitializer } from "react-yandex-metrika";
import Routing from "pages";
import { withHocs } from "./hocs";
import "./index.scss";

const yaMetrikaOptions = {
    defer: true,
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
    ecommerce: "dataLayer",
};

// FIXME: Возможно, понабодится более сложная разметка позднее
const App = () => (
    <>
        <YMInitializer accounts={[87502056]} options={yaMetrikaOptions} />
        <Routing />
    </>
);

export default withHocs(App);
