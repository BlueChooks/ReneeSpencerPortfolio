class ContentSwapper extends HTMLElement {
    constructor() {
        super();
        this.options = this.innerText.split(',');
        this.interval = this.getAttribute('interval');
        this.scrolloutInterval = this.interval / 5;
        this.style.setProperty('--transitionTime', `${this.scrolloutInterval}ms`)
    }
    
    connectedCallback() {
        this.style.setProperty('--randCol', this.randCol());
        this.swapContent();
        this.startInterval();
        // this.debug();
    }

    swapContent() {
        let index = this.options.findIndex(item => item === this.innerText);
        if (index < 0 || index >= this.options.length - 1) {
            this.innerText = this.options[0];
        } else {
            this.innerText = this.options[index + 1];
        }
    }

    scrollout() {
        this.classList.add('scrollout');
        setTimeout(() => {
            this.classList.remove('scrollout');
        }, this.scrolloutInterval);
    }

    startInterval() {
        setInterval(() => {
            this.classList.add('scrollout');

            setTimeout(() => {
                this.style.setProperty('--randCol', this.randCol());
                this.swapContent();
            }, this.scrolloutInterval);

            setTimeout(() => {
                this.classList.remove('scrollout')
            }, this.scrolloutInterval);
        }, this.interval);
    }

    randCol() {
        let cols = [
            'var(--colYellow)',
            'var(--colGreen)',
            'var(--colBlue)',
            'var(--colPink)',
            'var(--colRed)',
        ];
        return cols[Math.floor(Math.random() * cols.length)];
        // return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`; // any colour
    }

    debug() {
        this.addEventListener('click', () => {
            // this.swapContent();
            // this.scrollout();
            this.classList.contains('scrollout') ? this.classList.remove('scrollout') : this.classList.add('scrollout');
        });
    }
} customElements.define('content-swapper', ContentSwapper);