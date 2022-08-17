class BounceText extends HTMLElement {
    constructor() {
        super();
        this.mut = new MutationObserver((mutations, mut) => {
            console.log('innertext = ', this.innerText);
            console.log('mutated');
            if (!this.classList.contains('hidden')) {
                this.render();
            }
        });

        this.render();

        this.mut.observe(this.parentElement, {
            attributes: true
        });
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
            decoratedText += (`<span>${this.innerText[i]}</span>`);
        }
        this.innerHTML = decoratedText;
    }
} customElements.define('bounce-text', BounceText);