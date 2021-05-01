import Routing from "pages";
import { withHocs } from "./hocs";
import "./index.scss";

// FIXME: Возможно, понабодится более сложная разметка позднее
const App = () => <Routing />;

export default withHocs(App);
