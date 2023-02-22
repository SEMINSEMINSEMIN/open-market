import AbstractView from "./AbstractView.js";
import { $ } from "../utils/querySelector.js";

export default class Login extends AbstractView {
    test() {
        $("#app").textContent = "Login";
    }
}