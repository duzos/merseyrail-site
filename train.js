class Train {
    constructor(cId, startService, endService, title = `Class ${cId}`, width = "100vw", height = "12vh", src = `img/train/${cId}.png`) {
        this.cId = cId;
        this.width = width;
        this.height = height;
        this.src = src;
        this.title = title;
        this.startService = startService;
        this.endService = endService;
    }

    getServiceYears() {
        return `${this.startService} - ${this.endService}`;
    }
}

const trains = [new Train(54, 1825, 1857, "Locomotion No. 1"), new Train(1904, 1904, 1964, "1904 L&Y Railway EMUs"), new Train(502, 1939, 1980), new Train(507, 1978, 2024), new Train(777, 2024, "Present")]

let currentClass = trains.length - 1;
let queuedClass = currentClass;

function setTrainState(train, className) {
    train.className = className;
    console.log(className)
}

function updateTrainInfo(train) {
    titleElement.textContent = train.title;
    yearsElement.textContent = train.getServiceYears();
    photoElement.src = train.src;
}

function setClass(element, train) {
    element.src = train.src;
    element.alt = train.title;
    currentClass = trains.indexOf(train);

    updateTrainInfo(train);
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
    setTrainState(element, 'left');
}

// Reset train to the right side
function toRight() {
    state = 'toRight';
    setTrainState(element, 'right');

    setTimeout(() => {
        setClass(element, trains[queuedClass]);
        toStation();
    }, 1000);
}

function toStation() {
    state = 'toStation';
    setTrainState(element, 'station');
}

function toDisplay() {
    state = 'toDisplay';
    setTrainState(element, "center");
}

const element = document.getElementById('train');
let state = 'toStation';

element.addEventListener('transitionend', (e) => {
    if (e.propertyName === 'left') {
        if (state === 'toLeft') {
            toRight()
        }
    }
});

const loopCheckbox = document.getElementById('loop-checkbox');

setInterval(() => {
    if (state === "toStation" && loopCheckbox.checked) {
        nextClass();
    }
}, 15000)

const titleElement = document.getElementById('information-title');
const yearsElement = document.getElementById('information-years');
const photoElement = document.getElementById('information-photo');

// INIT
toStation();
setClass(element, trains[currentClass]);