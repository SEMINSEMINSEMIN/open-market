import AbstractView from "./AbstractView.js";
import { $ } from "../utils/querySelector.js";

export default class Order extends AbstractView {
    test() {
        $("#app").textContent = "Order";
    }
}