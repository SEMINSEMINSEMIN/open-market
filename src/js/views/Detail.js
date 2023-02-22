import AbstractView from "./AbstractView.js";
import { $ } from "../utils/querySelector.js";
import test from "../../assets/test.jpeg";

export default class Detail extends AbstractView {
    test() {
        const $app = $("#app");
        $app.textContent = `Detail ${this.params.id}`;
        const testImg = new Image();
        testImg.src = test;
        $app.appendChild(testImg);
    }
}
