class Train {
    constructor(cId, startService, endService, title = `Class ${cId}`, width = "100vw", height = "6vw", stationPosition, displayPosition, sound = `img/train/${cId}/departure.mp3`, photo = `img/train/${cId}/photo.png`, src = `img/train/${cId}/diagram.png`) {
        this.cId = cId;
        this.width = width;
        this.height = height;
        this.stationPosition = stationPosition;
        this.displayPosition = displayPosition;
        this.src = src;
        this.photo = photo;
        this.sound = sound;
        this.title = title;
        this.startService = startService;
        this.endService = endService;
    }

    getServiceYears() {
        return `${this.startService} - ${this.endService}`;
    }
}

const descriptions = [
    {"Darlington and Stockton Railway": [
        "First passenger railway to use steam trains on a public line",
        "It's success proved viability of railways, starting worldwide railway boom",
        "Facilitated the transportation of goods and people, contributing to development of local industry and economy"],
    },
    {"First Mersey Railways": [
        "The first Mersey Railway ran from Liverpool - Birkenhead via the world's first underwater rail tunnel",
        "The Merseyrail Network was formed by the merging of four other railways",
        "Merseyrail implemented the first full electrification of a steam railway in 1903"
        ]},
    {"The Creation of Merseyrail": [
        "The Beeching Axe caused the closure of many railways in the 1960s",
        "To combat this, the Liverpool City Council built electric underground tunnels to link the remaining lines",
        "This vision was supported by MALTS - leading to the creation of Merseyrail"
        ]},
    {"Establishing the Merseyrail Franchise": [
        "In 2003, Merseyrail became an independent franchise overseen by Merseytravel",
        "This move enabled greater local control and service improvements",
        "Leading to Merseyrail's reputation as one of the UK's most reliable and efficient rail networks"
        ]},
    {"Present and Future of Merseyrail": [
        "The first Class 777 entered service in early 2023",
        "Bringing enhanced accessibility, real-time information, and an eco-friendly design",
        "These new trains modernise the network massively and are in line with the Net-Zero Carbon plan for 2040",
        ]},
];

const trains = [
    new Train(54, 1825, 1857, "Locomotion No. 1", "20vw", "10vw", "10vw", "10vw"),
    new Train(1904, 1904, 1964, "1904 L&Y Railway EMUs"),
    new Train(502, 1939, 1980),
    new Train(507, 1978, 2024),
    new Train(777, 2024, "Present")];

let currentClass = 0;
let queuedClass = currentClass;

function getCurrentTrain() {
    return trains[currentClass];
}

function setTrainState(train, className) {
    train.className = className;
}

function updateTrainInfo(train) {
    titleElement.textContent = train.title;
    yearsElement.textContent = train.getServiceYears();
    photoElement.src = train.photo;

    let map = descriptions[currentClass];
    let title = Object.keys(map)[0];
    let points = map[title];

    descriptionTitleElement.textContent = title;
    descriptionElement.innerHTML = points.map(point => `<li>${point}</li>`).join('');
}

function setClass(element, train) {
    element.src = train.src;
    element.alt = train.title;
    element.style.width = train.width;
    element.style.height = train.height;
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

    element.style.left = '';
    let audio = new Audio(trains[currentClass].sound);
    audio.play().catch(error => {
        console.error("Audio playback failed:", error);
    });
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

    let train = getCurrentTrain();
    if (train.stationPosition) {
        element.style.left = train.stationPosition;
    } else {
        element.style.left = '';
    }
}

function toDisplay() {
    state = 'toDisplay';
    setTrainState(element, "center");

    let train = getCurrentTrain();
    if (train.displayPosition) {
        element.style.left = train.displayPosition;
    } else {
        element.style.left = '';
    }
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
const descriptionTitleElement = document.getElementById('train-description-title');
const descriptionElement = document.getElementById('train-description-text');

toStation();
setClass(element, trains[currentClass]);

const tickets = document.querySelectorAll('.ticket-view .ticket');
let currentTicket = 0;
let isAnimating = false;

function showTicket(newIndex) {
    if (isAnimating || newIndex === currentTicket) return;
    isAnimating = true;

    const oldTicket = tickets[currentTicket];
    const newTicket = tickets[newIndex];

    // Prepare new ticket
    newTicket.style.display = 'block';
    newTicket.classList.add('slide-in-up');

    // Animate out old ticket
    oldTicket.classList.add('slide-out-down');

    setTimeout(() => {
        oldTicket.classList.remove('active', 'slide-out-down');
        oldTicket.style.display = 'none';

        newTicket.classList.remove('slide-in-up');
        newTicket.classList.add('active');
        isAnimating = false;
    }, 2000);

    currentTicket = newIndex;
}

document.getElementById('ticket-next').onclick = function() {
    const newIndex = (currentTicket + 1) % tickets.length;
    showTicket(newIndex);
};

// Initialize
tickets.forEach((ticket, i) => {
    ticket.style.display = i === 0 ? 'block' : 'none';
    console.log(`Ticket ${i} - ${ticket}`);
    if (i === 0) ticket.classList.add('active');
});