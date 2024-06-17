import "./styles/style.scss";
import Main from "./components/App";
import StyleMargins from "./plugins/ReactiveElement/Utils/StyleMargins";
import Fonts from "./plugins/ReactiveElement/Utils/Fonts";
import { SetDynamicCSS } from "./plugins/ReactiveElement/Functions/SetDynamicCSS";
import("./map/LeafletMap"); // importing new map asynchronously

SetDynamicCSS("margins", StyleMargins);
SetDynamicCSS("fonts", Fonts);

new Main();
