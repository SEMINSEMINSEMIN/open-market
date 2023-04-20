import { $ } from "../utils/querySelector.js";
import useHttp from "../utils/useHttp.js";

export default class SignUpForm {
    constructor($main, $form) {
        this.$main = $main;
        this.isValid = {
            "id": null,
            "pw": null,
            "pwSame": null,
            "name": null,
            "phone2": null,
            "phone3": null,
            "agreement": null
        };
        this.validityFuncLookUp = {
            "pw": this.pwCheck,
            "pwCheck": this.pwSameCheck,
            "id": this.idCheck,
            "name": this.nameCheck,
            "phone": this.phoneCheck
        };
        this.formBaseHTML = `
            <label>
                <p>아이디</p>
                <input class="formItem focus-out id" type="text" pattern="[a-zA-Z0-9]{0,20}" maxlength="20" required>
                <p class="msg"></p>
            </label>
            <label>
                <p>비밀번호</p>
                <input class="formItem focus-out pw" type="password" pattern="^(?=.*[a-z])(?=.*\d).{8,}$" minlength="8" required>
                <p class="msg"></p>
            </label>
            <label>
                <p>비밀번호 재확인</p>
                <input class="formItem focus-out pwCheck" type="password" pattern="^(?=.*[a-z])(?=.*\d).{8,}$" minlength="8" required>
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
        this.formSellerHTML = `
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
        this.baseHTML = `
            <div class="tab">
                <button class="buyer">구매회원가입</button>
                <button class="seller">판매회원가입</button>
            </div>
            <form id="signUp">
                <div class="form-inps">
                    ${this.formBaseHTML}
                </div>
                <label class="agreement">
                    <input class="formItem" type="button">
                    <p>호두샵의 이용약관 및 개인정보처리방침에 대한 내용을 확인하였고 동의합니다.</p>
                </label>                
            </form>
            <button type="submit" class="sign-up-btn" form="signUp">가입하기</button>
        `;
        !$form && this.render($main);
    }

    render($main) {
        if (!$main) {
            const $newMain = document.createElement("main");
            $newMain.setAttribute("class", "main");
            $newMain.innerHTML = this.baseHTML;
            this.$main = $newMain;
            $("#app").appendChild($newMain);
        } else {
            $main.innerHTML = this.baseHTML;
        }

        this.bindEvents();
    }

    bindEvents() {
        const $tab = $(".tab", this.$main);
        const $buyer = $tab.firstElementChild;
        const $seller = $tab.lastElementChild;
        const $signUpForm = $tab.nextElementSibling;
        const $formInps = $(".form-inps", $signUpForm);
        const $formItems = $signUpForm.querySelectorAll(".formItem");
        const $agreement = $signUpForm.lastElementChild;
        const $agreeBtn = $("input", $agreement);
        const $signUpBtn = $signUpForm.nextElementSibling;

        $tab.addEventListener("click", () => {
            this.handleTabClicked();
        });

        $buyer.addEventListener("click", () => {
            this.handleBuyerClicked($formInps);
        });

        $seller.addEventListener("click", () => {
            this.handleSellerClicked($formInps);
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

    handleTabClicked() {
        for (const key in this.isValid) {
            this.isValid[key] = null;
        }
    }

    handleSellerClicked(insertPosition) {
        insertPosition.innerHTML = this.formBaseHTML + this.formSellerHTML;
    }

    handleBuyerClicked(insertPosition) {
        insertPosition.innerHTML = this.formBaseHTML;
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
            this.isValid["pw"] = true;
        } else {
            $msg.textContent = "비밀번호는 8자 이상이어야 하며, 영소문자와 숫자가 각각 한 개 이상 필수적으로 들어가야 합니다.";
            this.isValid["pw"] = false;
        }
        
        const $pwCheck = $(".pwCheck", parentElement.nextElementSibling);
        this.pwSameCheck($pwCheck.nextElementSibling, null, {"$pw": target, "target": $pwCheck});
    }

    pwSameCheck($msg, targetInfo, extraConfig) {
        let target, $pw;

        const helper = ($pw, $pwCheck) => {
            if ($pw.value === $pwCheck.value) {
                $msg.textContent = "";
                this.isValid["pwSame"] = true;
            } else {
                if (this.isValid["pwSame"] !== null) $msg.textContent = "비밀번호가 일치하지 않습니다.";
                this.isValid["pwSame"] = false;
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
            this.isValid["id"] = false;
        } else {
            this.idUniqCheck(target, $msg);
        }
    }

    nameCheck($msg) {
        $msg.textContent = "";
        this.isValid["name"] = true;
    }

    phoneCheck($msg, targetInfo) {
        const {classList, validity} = targetInfo;
        const isSecond = classList.contains("second");

        if (isSecond) {
            this.isValid["phone2"] = validity.valid;
        } else {
            this.isValid["phone3"] = validity.valid;
        }
        $msg.textContent = validity.valid && this.isValid["phone2"] === true && this.isValid["phone3"] === true 
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
            this.isValid["id"] = resStatus !== 400;
        });
    }

    handleAgreeClicked(target) {
        this.isValid["agreement"] = !target.classList.contains("agree");
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
            this.checkBeforeSignUp(this.isValid["id"], $id);
            this.checkBeforeSignUp(this.isValid["pw"], $pw);
            this.checkBeforeSignUp(this.isValid["pwSame"], $pw);
            this.checkBeforeSignUp(this.isValid["name"], $name);
            this.checkBeforeSignUp(!$phone2.validity.patternMismatch, $phone2);
            this.checkBeforeSignUp(!$phone3.validity.patternMismatch, $phone3);
            this.checkBeforeSignUp(this.isValid["agreement"], $agreement);
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
                console.log("회원가입 오류");
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
