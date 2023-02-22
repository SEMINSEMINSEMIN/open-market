// https://cssload.net/en/spinners
export default class Loading extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });

        const backdrop = document.createElement("div");
        backdrop.setAttribute("class", "backdrop");

        const wrapper = document.createElement("div");
        wrapper.setAttribute("id", "floatingCirclesG");
        wrapper.setAttribute("class", "hidden");

        for (let i = 1; i <= 8; i++) {
            const circle = document.createElement("div");
            circle.setAttribute("class", "f_circleG");
            circle.setAttribute("id", `frotateG_0${i}`);
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
            transform: translateY(-50%, -50%) scale(0.6);
                -o-transform: translate(-50%, -50%) scale(0.6);
                -ms-transform: translate(-50%, -50%) scale(0.6);
                -webkit-transform: translate(-50%, -50%) scale(0.6);
                -moz-transform: translate(-50%, -50%) scale(0.6);
        }
        
        .f_circleG{
            position: absolute;
            background-color: rgb(245,245,245);
            height: 22px;
            width: 22px;
            border-radius: 11px;
                -o-border-radius: 11px;
                -ms-border-radius: 11px;
                -webkit-border-radius: 11px;
                -moz-border-radius: 11px;
            animation-name: f_fadeG;
                -o-animation-name: f_fadeG;
                -ms-animation-name: f_fadeG;
                -webkit-animation-name: f_fadeG;
                -moz-animation-name: f_fadeG;
            animation-duration: 1.2s;
                -o-animation-duration: 1.2s;
                -ms-animation-duration: 1.2s;
                -webkit-animation-duration: 1.2s;
                -moz-animation-duration: 1.2s;
            animation-iteration-count: infinite;
                -o-animation-iteration-count: infinite;
                -ms-animation-iteration-count: infinite;
                -webkit-animation-iteration-count: infinite;
                -moz-animation-iteration-count: infinite;
            animation-direction: normal;
                -o-animation-direction: normal;
                -ms-animation-direction: normal;
                -webkit-animation-direction: normal;
                -moz-animation-direction: normal;
        }
        
        #frotateG_01{
            left: 0;
            top: 49px;
            animation-delay: 0.45s;
                -o-animation-delay: 0.45s;
                -ms-animation-delay: 0.45s;
                -webkit-animation-delay: 0.45s;
                -moz-animation-delay: 0.45s;
        }
        
        #frotateG_02{
            left: 14px;
            top: 14px;
            animation-delay: 0.6s;
                -o-animation-delay: 0.6s;
                -ms-animation-delay: 0.6s;
                -webkit-animation-delay: 0.6s;
                -moz-animation-delay: 0.6s;
        }
        
        #frotateG_03{
            left: 49px;
            top: 0;
            animation-delay: 0.75s;
                -o-animation-delay: 0.75s;
                -ms-animation-delay: 0.75s;
                -webkit-animation-delay: 0.75s;
                -moz-animation-delay: 0.75s;
        }
        
        #frotateG_04{
            right: 14px;
            top: 14px;
            animation-delay: 0.9s;
                -o-animation-delay: 0.9s;
                -ms-animation-delay: 0.9s;
                -webkit-animation-delay: 0.9s;
                -moz-animation-delay: 0.9s;
        }
        
        #frotateG_05{
            right: 0;
            top: 49px;
            animation-delay: 1.05s;
                -o-animation-delay: 1.05s;
                -ms-animation-delay: 1.05s;
                -webkit-animation-delay: 1.05s;
                -moz-animation-delay: 1.05s;
        }
        
        #frotateG_06{
            right: 14px;
            bottom: 14px;
            animation-delay: 1.2s;
                -o-animation-delay: 1.2s;
                -ms-animation-delay: 1.2s;
                -webkit-animation-delay: 1.2s;
                -moz-animation-delay: 1.2s;
        }
        
        #frotateG_07{
            left: 49px;
            bottom: 0;
            animation-delay: 1.35s;
                -o-animation-delay: 1.35s;
                -ms-animation-delay: 1.35s;
                -webkit-animation-delay: 1.35s;
                -moz-animation-delay: 1.35s;
        }
        
        #frotateG_08{
            left: 14px;
            bottom: 14px;
            animation-delay: 1.5s;
                -o-animation-delay: 1.5s;
                -ms-animation-delay: 1.5s;
                -webkit-animation-delay: 1.5s;
                -moz-animation-delay: 1.5s;
        }
        
        
        
        @keyframes f_fadeG{
            0%{
                background-color: rgb(33,191,72);
            }
        
            100%{
                background-color: rgba(240,240,240,0.98);
            }
        }
        
        @-o-keyframes f_fadeG{
            0%{
                background-color: rgb(33,191,72);
            }
        
            100%{
                background-color: rgba(240,240,240,0.98);
            }
        }
        
        @-ms-keyframes f_fadeG{
            0%{
                background-color: rgb(33,191,72);
            }
        
            100%{
                background-color: rgba(240,240,240,0.98);
            }
        }
        
        @-webkit-keyframes f_fadeG{
            0%{
                background-color: rgb(33,191,72);
            }
        
            100%{
                background-color: rgba(240,240,240,0.98);
            }
        }
        
        @-moz-keyframes f_fadeG{
            0%{
                background-color: rgb(33,191,72);
            }
        
            100%{
                background-color: rgba(240,240,240,0.98);
            }
        }
        `;

        backdrop.appendChild(wrapper);
        shadow.appendChild(style);
        shadow.appendChild(backdrop);
    }
}
