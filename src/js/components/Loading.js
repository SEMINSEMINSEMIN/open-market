// https://cssload.net/en/spinners
export default class Loading extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });

        const backdrop = document.createElement("div");
        backdrop.setAttribute("class", "backdrop");

        const wrapper = document.createElement("div");
        wrapper.setAttribute("id", "floatingCirclesG");

        for (let i = 1; i <= 8; i++) {
            const circle = document.createElement("div");
            circle.setAttribute("class", "f_circleG");
            circle.setAttribute("id", `frotateG_0${i}`);
            const circleBg =  document.createElement("div");
            circleBg.setAttribute("class", "f_circleBg");
            circleBg.setAttribute("id", `circleBg_0${i}`);
            circle.appendChild(circleBg);
            wrapper.appendChild(circle);
        }

        const style = document.createElement("style");
        style.textContent = `
        .backdrop {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 100vh;
            z-index: 2;
            background: rgba(0, 0, 0, 0.75);
        }

        #floatingCirclesG{
            z-index: 1;
            position: fixed;
            top: 50%;
            left: 50%;
            width: 122px;
            height: 122px;
            margin: auto;
            transform: translate(-50%, -50%) scale(0.6);

        }
        
        .f_circleG{
            position: absolute;
            background-color: rgba(240,240,240,0.85);
            opacity: 1;
            z-index: -1;
            height: 22px;
            width: 22px;
            border-radius: 11px;
        }

        .f_circleBg {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-color: rgb(33, 191, 72);
            opacity: 0;
            z-index: 1;
            border-radius: 11px;
            animation-name: f_fadeG;
            animation-duration: 1.2s;
            animation-iteration-count: infinite;
            animation-direction: normal;
        }
        
        #frotateG_01{
            left: 0;
            top: 49px;
        }
        
        #frotateG_02{
            left: 14px;
            top: 14px;
        }
        
        #frotateG_03{
            left: 49px;
            top: 0;
        }
        
        #frotateG_04{
            right: 14px;
            top: 14px;
        }
        
        #frotateG_05{
            right: 0;
            top: 49px;
        }
        
        #frotateG_06{
            right: 14px;
            bottom: 14px;
        }
        
        #frotateG_07{
            left: 49px;
            bottom: 0;
        }
        
        #frotateG_08{
            left: 14px;
            bottom: 14px;
        }

        #circleBg_01 {
            animation-delay: 0.45s;
        }

        #circleBg_02 {
            animation-delay: 0.6s;
        }

        #circleBg_03 {
            animation-delay: 0.75s;
        }

        #circleBg_04 {
            animation-delay: 0.9s;
        }

        #circleBg_05 {
            animation-delay: 1.05s;
        }

        #circleBg_06 {
            animation-delay: 1.2s;
        }

        #circleBg_07 {
            animation-delay: 1.35s;
        }

        #circleBg_08 {
            animation-delay: 1.5s;
        }
        
        @keyframes f_fadeG{
            0%{
                opacity: 1;
            }
        
            100%{
                opacity: 0;
            }
        }
        `;

        backdrop.appendChild(wrapper);
        shadow.appendChild(style);
        shadow.appendChild(backdrop);
    }
}
