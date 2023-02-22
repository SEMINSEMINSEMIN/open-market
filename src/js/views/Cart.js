import AbstractView from "./AbstractView.js";
import { $ } from "../utils/querySelector.js";

export default class Cart extends AbstractView {
    test() {
        $("#app").textContent = "Cart";
    }
}