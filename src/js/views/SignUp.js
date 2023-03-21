import AbstractView from "./AbstractView.js";
import SignUpLogo from "../components/SignUpLogo.js";
import SignUpForm from "../components/SignUpForm.js";
import { $ } from "../utils/querySelector.js";

export default class SignUp extends AbstractView {
    constructor() {
        super();
        this.$app = $("#app");
        this.$topbar = $(".topbar", this.$app);
        this.$logo = $(".sign-up-logo", this.$app);
        this.$footer = $(".footer", this.$app);
        this.$main = $(".main", this.$app);
        this.$form = $(".sign-up-form", this.$app);
    }

    render() {
        new SignUpLogo(this.$topbar, this.$logo);
        this.$footer && this.$footer.remove();
        new SignUpForm(this.$main, this.$form);
    }
}