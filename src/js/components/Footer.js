import { $ } from "../utils/querySelector.js";
import "../../css/components/footer.css";

export default class Footer {
    constructor($footer) {
        if (!$footer) {
            this.render();
        }
    }

    render() {
        const $footer = document.createElement("footer");
        $footer.setAttribute("class", "footer");

        const footerComp = `
            <div class="top">
                <ul class="links-left">
                    <li><a href="/" data-link>호두샵 소개</a></li>
                    <li><a href="/" data-link>이용약관</a></li>
                    <li><a href="/" data-link>개인정보처리방침</a></li>
                    <li><a href="/" data-link>전자금융거래약관</a></li>
                    <li><a href="/" data-link>청소년보호정책</a></li>
                    <li><a href="/" data-link>제휴문의</a></li>
                </ul>
                <ul class="links-right">
                    <li class="insta">
                        <a href="https://www.instagram.com/">
                            <span class="ir">인스타그램</span>
                        </a>
                    </li>
                    <li class="facebook">
                        <a href="https://www.facebook.com/">
                            <span class="ir">페이스북</span>
                        </a>
                    </li>
                    <li class="youtube">
                        <a href="https://www.youtube.com/">
                            <span class="ir">유튜브</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="bottom">
                <p class="company-name">(주)HODU SHOP</p>
                <address><p>제주특별자치도 제주시 동광고 137 제주코딩베이스캠프</p><p>사업자 번호: 000-0000-0000 · 통신판매업</p></address>
                <p>대표: 김호두</p>
            </div>
        `;

        $footer.innerHTML = footerComp;

        $("#app").appendChild($footer);
    }
}