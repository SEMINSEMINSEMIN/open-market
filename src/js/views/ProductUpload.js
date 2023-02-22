import AbstractView from "./AbstractView.js";
import { $ } from "../utils/querySelector.js";

export default class ProductUpload extends AbstractView {
    test() {
        $("#app").textContent = "ProductUpload";
    }
}