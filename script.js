const trains = [54, 1904, 502, 507, 777]

let currentClass = trains.length - 1;
let queuedClass = currentClass;

function setTrainState(train, className) {
    train.className = className;
    console.log(className)
}

function setClass(train, className) {
    train.src = `img/train/${className}.png`;
    train.alt = `${className} Class Train`;
    currentClass = trains.indexOf(className);
}

function nextClass() {
    queuedClass = (queuedClass + 1) % trains.length;
    toLeft();
}

function previousClass() {
    queuedClass = (queuedClass - 1 + trains.length) % trains.length;
    toLeft();
}

function toLeft() {
    state = 'toLeft';
    setTrainState(train, 'left');
}

// Reset train to the right side
function toRight() {
    state = 'toRight';
    setTrainState(train, 'right');

    setTimeout(() => {
        setClass(train, trains[queuedClass]);
        toStation();
    }, 1000);
}

function toStation() {
    state = 'toCenter';
    setTrainState(train, 'center');
}

const train = document.getElementById('train');
let state = 'toCenter';

train.addEventListener('transitionend', (e) => {
    if (e.propertyName === 'left') {
        if (state === 'toLeft') {
            toRight()
        }
    }
});

// INIT
toStation();
setClass(train, trains[currentClass]);