import { $ } from "../utils/querySelector.js";
import useHttp from "../utils/useHttp.js";

export default class SignUpForm {
    isIdValid;
    isPwValid;
    isPwSame;
    isNameValid;
    isPhone2Valid;
    isPhone3Valid;
    isAgreeChecked;

    constructor($main, $form) {
        this.$main = $main;
        this.validityFuncLookUp = {
            "pw": this.pwCheck,
            "pwCheck": this.pwSameCheck,
            "id": this.idCheck,
            "name": this.nameCheck,
            "phone": this.phoneCheck
        };
        !$form && this.render($main);
    }

    render($main) {
        const pwPattern = "^(?=.*[a-z])(?=.*\d).{8,}$";
        const buyerHTML = `
            <label>
                <p>아이디</p>
                <input class="formItem focus-out id" type="text" pattern="[a-zA-Z0-9]{0,20}" maxlength="20" required>
                <p class="msg"></p>
            </label>
            <label>
                <p>비밀번호</p>
                <input class="formItem focus-out pw" type="password" pattern=${pwPattern} minlength="8" required>
                <p class="msg"></p>
            </label>
            <label>
                <p>비밀번호 재확인</p>
                <input class="formItem focus-out pwCheck" type="password" pattern=${pwPattern} minlength="8" required>
                <p class="msg"></p>
            </label>
            <label>
                <p>이름</p>
                <input class="formItem focus-out name" type="text" required>
                <p class="msg"></p>
            </label>
            <label class="phone-label">
                <p>휴대폰번호</p>
                <span class="first">010</span>
                <input class="formItem focus-out second phone" type="text" pattern="[0-9]{3,4}" minlength="3" maxlength="4" required>
                <input class="formItem focus-out third phone" type="text" pattern="[0-9]{4}" maxlength="4" required>
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
                    <input class="formItem" type="button">
                    <p>호두샵의 이용약관 및 개인정보처리방침에 대한 내용을 확인하였고 동의합니다.</p>
                </label>                
            </form>
            <button type="submit" class="sign-up-btn" form="signUp">가입하기</button>
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
        const $formItems = $signUpForm.querySelectorAll(".formItem");
        const $agreement = $signUpForm.lastElementChild;
        const $agreeBtn = $("input", $agreement);
        const $signUpBtn = $signUpForm.nextElementSibling;

        $buyer.addEventListener("click", () => {
            this.handleBuyerClicked($signUpForm);
        });

        $seller.addEventListener("click", () => {
            this.handleSellerClicked($agreement);
        });

        $signUpForm.addEventListener("focusout", (e) => {
            this.handleInpFocusOut(e.target);
        });

        $agreeBtn.addEventListener("click", (e) => {
            this.handleAgreeClicked(e.target);
        });

        $signUpBtn.addEventListener("click", (e) => {
            this.handleSignUpClick(e, $formItems);
        });
    }

    handleSellerClicked(insertPosition) {
        const sellerHTML = `
            <label class="seller-num-label">
                <p>사업자 등록번호</p>
                <input class="formItem seller-num" type="text" pattern="[0-9]{10}" maxlength="10">
                <button type="button">인증</button>
                <p class="msg"></p>
            </label>
            <label class="store-name-label">
                <p>스토어 이름</p>
                <input class="formItem store-name" type="text">
                <p class="msg"></p>
            </label>
        `;
        const isOkayInsert = insertPosition.previousElementSibling.classList.contains("phone-label");
        isOkayInsert && insertPosition.insertAdjacentHTML("beforebegin", sellerHTML);
    }

    handleBuyerClicked(basis) {
        console.log("buyer");
        const $sellerNum = $(".seller-num-label", basis);
        const $storeName = $(".store-name-label", basis);

        if ($sellerNum && $storeName) {
            $sellerNum.remove();
            $storeName.remove();
        }
    }

    handleInpFocusOut(target) {
        if (!target.classList.contains("focus-out")) {
            return;
        }

        const {validity, classList, parentElement} = target;
        const type = classList[classList.length - 1];
        const $msg = parentElement.lastElementChild;

        const callback = this.validityFuncLookUp[type];

        if (callback) {
            if (validity.valueMissing) {
                $msg.textContent = "필수 정보입니다.";
                return;
            }

            this.handleValidityCheck(callback, $msg, {validity, classList, target, parentElement});
        } 
    }

    handleValidityCheck(callback, $msg, targetInfo) {
        const bounceCallback = callback.bind(this);
        bounceCallback($msg, targetInfo);
    }

    pwCheck($msg, targetInfo) {
        const {target, parentElement} = targetInfo;

        const isValid = /^(?=.*[a-z])(?=.*\d).{8,}$/.test(target.value);
        if (isValid) {
            $msg.textContent = "";
            this.isPwValid = true;
        } else {
            $msg.textContent = "비밀번호는 8자 이상이어야 하며, 영소문자와 숫자가 각각 한 개 이상 필수적으로 들어가야 합니다.";
            this.isPwValid = false;
        }
        
        const $pwCheck = $(".pwCheck", parentElement.nextElementSibling);
        this.pwSameCheck($pwCheck.nextElementSibling, null, {"$pw": target, "target": $pwCheck});
    }

    pwSameCheck($msg, targetInfo, extraConfig) {
        let target, $pw;

        const helper = ($pw, $pwCheck) => {
            if ($pw.value === $pwCheck.value) {
                $msg.textContent = "";
                this.isPwSame = true;
            } else {
                if (this.isPwSame !== undefined) $msg.textContent = "비밀번호가 일치하지 않습니다.";
                this.isPwSame = false;
            }   
        };

        if (targetInfo) {
            target = targetInfo.target;
            $pw = $(".pw", targetInfo.parentElement.previousElementSibling);
        } else {
            target = extraConfig.target;
            $pw = extraConfig.$pw;
        }

        helper($pw, target);
    }

    idCheck($msg, targetInfo) {
        const {validity, target} = targetInfo;
        if (!validity.valid) {
            $msg.textContent = "20자 이내의 영문 소문자, 대문자, 숫자만 사용 가능합니다.";
            this.isIdValid = false;
        } else {
            this.idUniqCheck(target, $msg);
        }
    }

    nameCheck($msg) {
        $msg.textContent = "";
        this.isNameValid = true;
    }

    phoneCheck($msg, targetInfo) {
        const {classList, validity} = targetInfo;
        const isSecond = classList.contains("second");

        if (isSecond) {
            this.isPhone2Valid = validity.valid;
        } else {
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

    handleAgreeClicked(target) {
        this.isAgreeChecked = !target.classList.contains("agree");
        target.classList.toggle("agree");
    }

    checkBeforeSignUp(condition, target) {
        if (target.validity.valueMissing || !condition) {
            console.log(target);
            target.focus();
            throw new Error("invalid");
        }
    }

    handleInValidAfterReq(target, errMsg) {
        const $msg = target.parentElement.lastElementChild;
        $msg.textContent = errMsg;
        target.focus();
    }

    async handleSignUpClick(e, $formItems) {
        e.preventDefault();
        console.log("가입하기");
        const [$id, $pw, $pwCheck, $name, $phone2, $phone3] = $formItems;
        const $agreement = $formItems[$formItems.length - 1];
        const elLookUp = {
            "username": $id,
            "password": [$pw, $pwCheck],
            "name": $name,
            "phone_number": $phone2,
        };

        try {
            this.checkBeforeSignUp(this.isIdValid, $id);
            this.checkBeforeSignUp(this.isPwValid, $pw);
            this.checkBeforeSignUp(this.isPwSame, $pwCheck);
            this.checkBeforeSignUp(this.isNameValid, $name);
            this.checkBeforeSignUp(!$phone2.validity.patternMismatch, $phone2);
            this.checkBeforeSignUp(!$phone3.validity.patternMismatch, $phone3);
            this.checkBeforeSignUp(this.isAgreeChecked, $agreement);
            console.log("회원가입 가능");
        } catch (e) {
            return;
        }

        const body = {
            "username": $id.value,
            "password": $pw.value,
            "password2": $pwCheck.value,
            "phone_number": `010${$phone2.value}${$phone3.value}`,
            "name": $name.value
        };

        const reqConfig = {
            method: "POST",
            url: "/accounts/signup/",
            body
        };

        await useHttp(reqConfig, (data, status) => {
            if (status === 400) {
                const toEntries = Object.entries(data);
                const elKey = toEntries[0][0];
                const errMsg = toEntries[0][1][0];
                let targetEl = elLookUp[elKey];

                if (elKey === "password") {
                    targetEl = errMsg === "비밀번호가 일치하지 않습니다." ? elLookUp[elKey][1] : elLookUp[elKey][0];
                }

                this.handleInValidAfterReq(targetEl, errMsg);
            } else {
                console.log("회원가입 완료");
            }
        });
    }
}
