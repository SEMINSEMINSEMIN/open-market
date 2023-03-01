import AbstractView from "./AbstractView.js";
import { $ } from "../utils/querySelector.js";

export default class Detail extends AbstractView {
    test() {
        const $app = $("#app");
        $app.textContent = `Detail ${this.params.id}`;
        const testImg = new Image();
        testImg.src = test;
        $app.appendChild(testImg);
    }
}
