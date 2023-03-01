import AbstractView from "./AbstractView.js";
import Topbar from "../components/Topbar.js";
import { $ } from "../utils/querySelector.js";

export default class Home extends AbstractView {
    constructor() {
        super();
        this.$header = $(".topbar", $("#app"));
    }

    render() {
        new Topbar(this.$header);
    }
}