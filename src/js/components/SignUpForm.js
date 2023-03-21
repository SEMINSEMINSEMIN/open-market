import { $ } from "../utils/querySelector.js";

export default class SignUpForm {
    constructor($main, $form) {
        this.$main = $main;
        !$form && this.render($main);
    }

    render($main) {
        const pwPattern = "^(?=.*[a-z])(?=.*[0-9])[a-z0-9]{8,}$";
        const buyerHTML = `
            <label class="id">
                <p>아이디</p>
                <input type="text" pattern="[a-zA-Z0-9]{,20}" maxlength="20" required>
                <button class="id-check" type="button">중복확인</button>
                <p class="msg"></p>
            </label>
            <label class="pw">
                <p>비밀번호</p>
                <input type="password" pattern=${pwPattern} minlength="8" required>
                <p class="msg"></p>
            </label>
            <label class="pwCheck">
                <p>비밀번호 재확인</p>
                <input type="password" pattern=${pwPattern} minlength="8" required>
                <p class="msg"></p>
            </label>
            <label class="name">
                <p>이름</p>
                <input type="text" required>
                <p class="msg"></p>
            </label>
            <label class="phone">
                <p>휴대폰번호</p>
                <span class="first">010</span>
                <input class="second" type="text" pattern="[0-9]{3,4}" minlength="3" maxlength="4" required>
                <input class="third" type="text" pattern="[0-9]{4}" maxlength="4" required>
                <p class="msg"></p>
            </label>
        `;
        const baseHTML = `
            <div class="tab">
                <button class="buyer">구매회원가입</button>
                <button class="seller">판매회원가입</button>
            </div>
            <form id="signUp">
                ${buyerHTML}
                <label class="agreement">
                    <input type="button">
                    <p>호두샵의 이용약관 및 개인정보처리방침에 대한 내용을 확인하였고 동의합니다.</p>
                </label>                
            </form>
            <button type="button" class="sign-up-btn" form="signUp">가입하기</button>
        `;

        if (!$main) {
            const $newMain = document.createElement("main");
            $newMain.setAttribute("class", "main");
            $newMain.innerHTML = baseHTML;
            this.$main = $newMain;
            $("#app").appendChild($newMain);
        } else {
            $main.innerHTML = baseHTML;
        }

        this.bindEvents();
    }

    bindEvents() {
        const $tab = $(".tab", this.$main);
        const $buyer = $tab.firstElementChild;
        const $seller = $tab.lastElementChild;
        const $signUpForm = $tab.nextElementSibling;
        const $agreement = $signUpForm.lastElementChild;

        $buyer.addEventListener("click", () => {
            this.handleBuyerClicked($signUpForm);
        });

        $seller.addEventListener("click", () => {
            this.handleSellerClicked($agreement);
        });
    }

    handleSellerClicked(insertPosition) {
        const sellerHTML = `
            <label class="seller-num">
                <p>사업자 등록번호</p>
                <input type="text" pattern="[0-9]{10}" maxlength="10">
                <button type="button">인증</button>
                <p class="msg"></p>
            </label>
            <label class="store-name">
                <p>스토어 이름</p>
                <input type="text">
                <p class="msg"></p>
            </label>
        `;
        const isOkayInsert = insertPosition.previousElementSibling.classList.contains("phone");
        isOkayInsert && insertPosition.insertAdjacentHTML("beforebegin", sellerHTML);
    }

    handleBuyerClicked(basis) {
        const $sellerNum = $(".seller-num", basis);
        const $storeName = $(".store-name", basis);

        if ($sellerNum && $storeName) {
            $sellerNum.remove();
            $storeName.remove();
        }
    }
}