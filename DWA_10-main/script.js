const MAX_NUMBER = 10;
const MIN_NUMBER = -5;

const html = {
    keys: {
        add: document.querySelector('[data-key="add"]'),
        subtract: document.querySelector('[data-key="subtract"]'),
        number: document.querySelector('[data-key="number"]'),
        reset: document.querySelector('[data-key="reset"]'),
    },
};
    

const subtractHandler = () => {
    const newValue = parseInt(html.keys.number.value) - 1;
    html.keys.number.value = newValue;

    if (html.keys.add.disabled === true) {
        html.keys.add.disabled = false;
    }

    if (newValue <= MIN_NUMBER) {
        html.keys.subtract.disabled = true;
    }
};

const addHandler = () => {
    const newValue = parseInt(html.keys.number.value) + 1;
    html.keys.number.value = newValue;

    if (newValue >= MAX_NUMBER) {
        html.keys.add.disabled = true;
    };

    if (html.keys.subtract.disabled === true) {
        html.keys.subtract.disabled = false;
    };
};

const resetHandler = document.querySelector('[data-keys=reset]'); 



html.keys.subtract.addEventListener('click', subtractHandler);
html.keys.add.addEventListener('click', addHandler);
html.keys.reset.addEventListener('click', () => {
    alert('you have reset the counter to 0');
    html.keys.number.value = 0;
});