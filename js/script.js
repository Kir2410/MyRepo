'use strict';

const DomElement = {
    selector: '.block',
    height: '100px',
    width: '100px',
    bg: 'yellow',
    fontSize: '20px',
    createElem: function () {
        if (this.selector.charAt(0) == '.') {
            document.body.innerHTML = '<div>Привет всем!!!</div>';
            const elem = document.querySelector('div');
            elem.classList.add(this.selector.slice(1));
            elem.style.cssText = `height: ` + this.height + `; width: ` + this.width + `; background: ` + this.bg + `; font-size: ` + this.fontSize + `;`;
        } else {
            if (this.selector.charAt(0) == '#') {
                document.body.innerHTML = '<p>Привет всем!!!</p>';
                const elem = document.querySelector('p');
                elem.classList.add(this.selector.slice(1));
                elem.style.cssText = `height: ` + this.height + `; width: ` + this.width + `; background: ` + this.bg + `; font-size: ` + this.fontSize + `;`;
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const dom = Object.create(DomElement);

    dom.createElem();

    document.querySelector('div').style.position = 'absolute';
    document.addEventListener('keydown', (event) => {
        if (event.code == 'ArrowRight') {
            let margLeft = document.querySelector('div').style.marginLeft.split('px');
            document.querySelector('div').style.marginLeft = (Number(margLeft[0].toString()) + 10) + 'px';
        } else {
            if (event.code == 'ArrowLeft') {
                let margLeft = document.querySelector('div').style.marginLeft.split('px');
                document.querySelector('div').style.marginLeft = (Number(margLeft[0].toString()) - 10) + 'px';
            } else {
                if (event.code == 'ArrowUp') {
                    let margTop = document.querySelector('div').style.marginTop.split('px');
                    document.querySelector('div').style.marginTop = (Number(margTop[0].toString()) - 10) + 'px';
                } else {
                    if (event.code == 'ArrowDown') {
                        let margTop = document.querySelector('div').style.marginTop.split('px');
                        document.querySelector('div').style.marginTop = (Number(margTop[0].toString()) + 10) + 'px';
                    }
                }
            }
        }
    });
});