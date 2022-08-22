class BounceText extends HTMLElement {
    constructor() {
        super();
        // this.mut = new MutationObserver((mutations, mut) => {
        //     // console.log('innertext = ', this.innerText);
        //     // console.log('mutated');
        //     if (!this.classList.contains('hidden')) {
        //         this.render();
        //     }
        // });
        
        this.render();
        // console.log(this.innerText);

        // this.mut.observe(this.parentElement, {
        //     attributes: true
        // });
    }

    render() {
        if (!this.getAttribute('fixed')) {
            this.style.setProperty('--bounce-size', `${this.fontSizeByParent()}px`);
        }
        
        this.convertText();
    }

    fontSizeByParent() {
        let area = this.parentElement.getBoundingClientRect().height * this.parentElement.getBoundingClientRect().width;
        return Math.sqrt(area) / 8;
    }

    convertText() {
        let decoratedText = '';
        for (let i = 0; i < this.innerText.length; i++) {
            // console.log(this.innerText[i]);
            decoratedText += (`<span${this.innerText[i] === ' ' ? ' style="padding-left:1rem"' : ''}>${this.innerText[i]}</span>`);
            // console.log(decoratedText);
        }
        this.innerHTML = decoratedText;
    }
} customElements.define('bounce-text', BounceText);