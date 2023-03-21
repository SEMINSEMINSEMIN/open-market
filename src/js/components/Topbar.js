import { $ } from "../utils/querySelector.js";
import Logo2x from "../../assets/Logo-hodu_2x.png";
import "../../css/components/topbar.css";

export default class Topbar {
    constructor($header) {
        this.isCartCur = window.location.pathname === "/cart";

        if (!$header) {
            this.loginType = localStorage.getItem("user_type");
            this.render();
        } else {
            this.$header = $header;
            this.$cartLink = $(".right-link.cart-link", this.$header);
            this.ctrlCartIcon();
        }
    }

    render() {
        const $header = document.createElement("header");
        $header.setAttribute("class", "topbar");

        const baseHTML = `
            <h1 class="title"><a href="/" data-link><img src=${Logo2x} alt="HODU 타이틀, 메인 페이지로 바로 가기" data-link width="124" height="38"></a></h1>
            <div class="search">
                <input placeholder="상품을 검색해보세요!">
                <button><span class="ir">검색</span></button>
            </div>
        `;
        $header.innerHTML = baseHTML;

        const cartComp = this.isCartCur ? `<a class="right-link cart-link in-same-page" href="/cart" data-link>장바구니</a>` : `<a class="right-link cart-link" href="/cart" data-link>장바구니</a>`;
        const myPageComp = `
            <div class="right-link myPage-link" tabindex="0" aria-label="마이페이지 및 로그아웃">
                <p class="drop-down-group">마이페이지</p>
                <div class="myPage-drop-down hidden">
                    <a class="drop-down-group" href="/" data-link>마이페이지</a>
                    <a class="logout" href="/" data-link>로그아웃</a>
                </div>
            </div>
        `;

        if (!this.loginType) {
            $header.insertAdjacentHTML("beforeend", `
                ${cartComp}
                <a class="right-link login-link" href="/login" data-link>로그인</a>
            `);
        } else if (this.loginType === "BUYER") {
            $header.insertAdjacentHTML("beforeend", `
                ${cartComp}
                ${myPageComp}
            `);
        } else {
            $header.insertAdjacentHTML("beforeend", `
                ${myPageComp}
                <a class="right-link dashboard-link" href="/dashboard" data-link>판매자 센터</a>
            `);
        }

        const $app = $("#app");
        const $signUpForm = $(".sign-up-form", $app);
        $signUpForm ? $app.replaceChild($header, $app.firstElementChild) : $app.appendChild($header);

        this.mounted();
    }

    mounted() {
        const $myPageLink = $(".myPage-link");
        if ($myPageLink) {
            const $dropDown = $(".myPage-drop-down", $myPageLink);

            $myPageLink.addEventListener("focusin", () => {
                $dropDown.classList.remove("hidden");
            });

            $dropDown.lastElementChild.addEventListener("focusout", () => {
                $dropDown.classList.add("hidden");
            });

            $myPageLink.addEventListener("mouseover", (e) => {
                $dropDown.classList.remove("hidden");
            });

            $myPageLink.addEventListener("mouseleave", (e) => {
                $dropDown.classList.add("hidden");
            });

            const $logout = $(".logout", $dropDown);
            $logout.addEventListener("click", () => {
                const $grandParent = $myPageLink.parentElement;
                const $oldRight = $grandParent.lastElementChild;
                const $oldLeft = $oldRight.previousElementSibling;

                const $loginComp = document.createElement("a");
                $loginComp.setAttribute("class", "right-link login-link");
                $loginComp.setAttribute("href", "/login");
                $loginComp.setAttribute("data-link", "");
                $loginComp.textContent = "로그인";

                $grandParent.replaceChild($loginComp, $oldRight);

                if ($oldLeft.classList.contains("myPage-link")) {
                    const $cartComp = document.createElement("a");
                    $cartComp.setAttribute("class", "right-link cart-link");
                    $cartComp.setAttribute("href", "/cart");
                    $cartComp.setAttribute("data-link", "");
                    $cartComp.textContent = "장바구니";

                    $grandParent.replaceChild($cartComp, $oldLeft);
                }

                localStorage.clear();
            });
        }
    }

    ctrlCartIcon() {
        if (this.isCartCur) {
            this.$cartLink.classList.add("in-same-page");
        } else {
            this.$cartLink && this.$cartLink.classList.remove("in-same-page");
        }
    }
}