import { $ } from "../utils/querySelector.js";
import Logo2x from "../../assets/Logo-hodu_2x.png";

export default class SignUpLogo {
    constructor($topbar, $logo) {
        !$logo && this.render($topbar);
    }

    render($header) {
        const baseHTML = `<h1><a href="/" data-link><img src=${Logo2x} alt="HODU 타이틀, 메인 페이지로 바로 가기" data-link width="238" height="74"></a></h1>`;
        if ($header) {
            $header.classList.remove("topbar");
            $header.classList.add("sign-up-form");
            $header.innerHTML = baseHTML;
        } else {
            const $header = document.createElement("header");
            $header.setAttribute("class", "sign-up-form");
            $header.innerHTML = baseHTML;
            $("#app").appendChild($header);
        }
    }
}