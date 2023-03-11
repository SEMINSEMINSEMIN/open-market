import AbstractView from "./AbstractView.js";
import Topbar from "../components/Topbar.js";
import ProductList from "../components/ProductList.js";
import Footer from "../components/Footer.js";

import { $ } from "../utils/querySelector.js";

export default class Home extends AbstractView {
    constructor() {
        super();
        this.$app = $("#app");
        this.$header = $(".topbar", this.$app);
        this.$main = $(".main", this.$app);
        this.$footer = $(".footer", this.$app);
    }

    render() {
        new Topbar(this.$header);
        new ProductList(this.$main);
        new Footer(this.$footer);
    }
}