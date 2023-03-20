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
        this.$footer = $(".footer", this.$app);
        this.$productList = $(".product-list", this.$app);
    }

    render() {
        new Topbar(this.$header);
        new Footer(this.$footer);
        new ProductList(this.$productList);
    }
}