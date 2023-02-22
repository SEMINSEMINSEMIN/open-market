import AbstractView from "./AbstractView.js";
import { $ } from "../utils/querySelector.js";

export default class Dashboard extends AbstractView {
    test() {
        $("#app").textContent = "Dashboard";
    }
}