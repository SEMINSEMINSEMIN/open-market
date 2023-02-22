import AbstractView from "./AbstractView.js";
import { $ } from "../utils/querySelector.js";

export default class Error extends AbstractView {
    test() {
        $("#app").textContent = "Error";
    }
}