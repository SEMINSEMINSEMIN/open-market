import { $ } from "../utils/querySelector.js";
import useHttp from "../utils/useHttp.js";

export default class SignUpForm {
    isIdValid;
    isPwValid;
    isPwSame;
    isPhone2Valid;
    isPhone3Valid;

    constructor($main, $form) {
        this.$main = $main;
        this.validityFuncLookUp = {
            "pw": this.pwCheck,
            "pwCheck": this.pwSameCheck,
            "id": this.idCheck,
            "phone": this.phoneCheck
        };
        !$form && this.render($main);
    }

    render($main) {
        const pwPattern = "^(?=.*[a-z])(?=.*\d).{8,}$";
        const buyerHTML = `
            <label>
                <p>아이디</p>
                <input class="formItem id" type="text" pattern="[a-zA-Z0-9]{0,20}" maxlength="20" required>
                <p class="msg"></p>
            </label>
            <label>
                <p>비밀번호</p>
                <input class="formItem pw" type="password" pattern=${pwPattern} minlength="8" required>
                <p class="msg"></p>
            </label>
            <label>
                <p>비밀번호 재확인</p>
                <input class="formItem pwCheck" type="password" pattern=${pwPattern} minlength="8" required>
                <p class="msg"></p>
            </label>
            <label>
                <p>이름</p>
                <input class="formItem name" type="text" required>
                <p class="msg"></p>
            </label>
            <label>
                <p>휴대폰번호</p>
                <span class="first">010</span>
                <input class="formItem second phone" type="text" pattern="[0-9]{3,4}" minlength="3" maxlength="4" required>
                <input class="formItem third phone" type="text" pattern="[0-9]{4}" maxlength="4" required>
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

        $signUpForm.addEventListener("focusout", (e) => {
            this.handleInpFocusOut(e.target);
        });
    }

    handleSellerClicked(insertPosition) {
        const sellerHTML = `
            <label>
                <p>사업자 등록번호</p>
                <input class="formItem seller-num" type="text" pattern="[0-9]{10}" maxlength="10">
                <button type="button">인증</button>
                <p class="msg"></p>
            </label>
            <label>
                <p>스토어 이름</p>
                <input class="formItem store-name" type="text">
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

    handleInpFocusOut(target) {
        if (!target.classList.contains("formItem")) {
            return;
        }

        const {validity, classList, parentElement} = target;
        const type = classList[classList.length - 1];
        const $msg = parentElement.lastElementChild;

        if (validity.valueMissing) {
            $msg.textContent = "필수 정보입니다.";
        } else {
            const callback = this.validityFuncLookUp[type];
            if (callback) {
                this.handleValidityCheck(callback, $msg, {validity, classList, target, parentElement});
            } else $msg.textContent = "";
        }
    }

    handleValidityCheck(callback, $msg, targetInfo) {
        const bounceCallback = callback.bind(this);
        bounceCallback($msg, targetInfo);
    }

    pwCheck($msg, targetInfo) {
        const {target} = targetInfo;
        const isValid = /^(?=.*[a-z])(?=.*\d).{8,}$/.test(target.value);
        if (isValid) {
            $msg.textContent = "";
            this.isPwValid = true;
        } else {
            $msg.textContent = "비밀번호는 8자 이상이어야 하며, 영소문자와 숫자가 각각 한 개 이상 필수적으로 들어가야 합니다.";
            this.isPwValid = false;
        }
    }

    pwSameCheck($msg, targetInfo) {
        const {target, parentElement} = targetInfo;
        const $prevInput = $(".pw", parentElement.previousElementSibling);
        if ($prevInput.value === target.value) {
            $msg.textContent = "";
            this.isPwSame = true;
        } else {
            $msg.textContent = "비밀번호가 일치하지 않습니다.";
            this.isPwSame = false;
        }
    }

    idCheck($msg, targetInfo) {
        const {validity, target} = targetInfo;
        if (!validity.valid) {
            $msg.focus();
            $msg.textContent = "20자 이내의 영문 소문자, 대문자, 숫자만 사용 가능합니다.";
            this.isIdValid = false;
        } else {
            this.idUniqCheck(target, $msg);
        }
    }

    phoneCheck($msg, targetInfo) {
        const {classList, validity} = targetInfo;
        if (classList.contains("second")) {
            this.isPhone2Valid = validity.valid;
        } else if (classList.contains("third")) {
            this.isPhone3Valid = validity.valid;
        }
        $msg.textContent = validity.valid && this.isPhone2Valid === true && this.isPhone3Valid === true 
            ? "" 
            : "핸드폰번호는 010으로 시작하는 10~11자리 숫자여야 합니다.";
    }

    async idUniqCheck(target, changeTarget) {
        const reqConfig = {
            method: "POST",
            url: "/accounts/signup/valid/username/",
            body: {"username": target.value}
        };

        await useHttp(reqConfig, (data, resStatus) => {
            changeTarget.textContent = data["FAIL_Message"] || data["Success"];
            this.isIdValid = resStatus !== 400;
        });
    }
}
