import AbstractView from "./AbstractView.js";
import { $ } from "../utils/querySelector.js";

export default class SignUp extends AbstractView {
    test() {
        $("#app").textContent = "SignUp";
    }
}