'use strict';

const DomElement = {
    selector: '.block',
    height: '400px',
    width: '400px',
    bg: 'yellow',
    fontSize: '30px',
    createElem: function () {
        if (this.selector.charAt(0) == '.') {
            document.body.innerHTML = '<div>Привет всем!!!</div>';
            const elem = document.querySelector('div');
            elem.classList.add(this.selector.slice(1));
            elem.style.cssText = `height: ` + this.height + `; width: ` + this.width + `; background-color: ` + this.bg + `; font-size: ` + this.fontSize + `;`;
            console.log(elem);
        } else {
            if (this.selector.charAt(0) == '#') {
                document.body.innerHTML = '<p>Привет всем!!!</p>';
                const elem = document.querySelector('p');
                elem.classList.add(this.selector.slice(1));
                elem.style.cssText = `height: ` + this.height + `; width: ` + this.width + `; background-color: ` + this.bg + `; font-size: ` + this.fontSize + `;`;
                console.log(elem);
            }
        }
    }
};

const dom = Object.create(DomElement);

dom.createElem();