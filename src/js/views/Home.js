import AbstractView from "./AbstractView.js";
import { $ } from "../utils/querySelector.js";
import test from "../../assets/test.jpeg";

export default class Home extends AbstractView {
    test() {
        const $app = $("#app");
        $app.textContent = "Home";
        const testImg = new Image();
        testImg.src = test;
        $app.appendChild(testImg);
    }
}