const statOptionsElements = document.querySelectorAll('a');

let statsList = [];

const previousStatsTexts = {
    'daily': 'Yesterday - ',
    'weekly': 'Last Week - ',
    'monthly': 'Last month - '
}

const clearPreviousLink = () => {
    const activeLink = document.getElementsByClassName('active')[0];

    activeLink.removeAttribute('class');
}

const getActiveLink = () => {
    const windowLocationHash = window.location.hash;

    return windowLocationHash;
}

const setDailyOption = () => {
    const windowLocationHash = getActiveLink();

    if (windowLocationHash == "" || windowLocationHash === "#daily") {
        const dailyOption = document.getElementById('daily');
        dailyOption.click();
    }
}

const addEventListenerToLinks = (statsData) => {
    statsList = statsData;

    statOptionsElements.forEach((linkElement) => {
        linkElement.addEventListener('click', () => {
            clearPreviousLink();
            linkElement.setAttribute('class', 'active');

            renderStats();
        })
    })

    setDailyOption();
}

const createStatCard = (id) => {
    let statCardElement = document.createElement('div');

    statCardElement.setAttribute('class', 'stats card');
    statCardElement.setAttribute('id', id);

    return statCardElement;
}

const createTimeframeCard = () => {
    let timeframeCard = document.createElement('div');

    timeframeCard.setAttribute('class', 'timeframe card');

    return timeframeCard;
}

const createTimeframeHeader = (title) => {
    const headerElement = document.createElement('div');
    const titleElement = document.createElement('p');
    const buttonElement = document.createElement('button');
    const imgElement = document.createElement('img');

    titleElement.setAttribute('class', 'title');
    titleElement.textContent = title;

    imgElement.setAttribute('src', 'images/icon-ellipsis.svg');
    imgElement.setAttribute('alt', 'Mais opções');

    buttonElement.setAttribute('type', 'button');
    buttonElement.appendChild(imgElement);

    headerElement.appendChild(titleElement);
    headerElement.appendChild(buttonElement);

    return headerElement;
}

const createStatDataElement = (previousData, currentData) => {
    const divElement = document.createElement('div');
    const currentElement = document.createElement('h2');
    const previousElement = document.createElement('p');

    currentElement.setAttribute('class', 'current');
    currentElement.textContent = currentData;

    previousElement.setAttribute('class', 'previous');
    previousElement.textContent = previousData;

    divElement.appendChild(currentElement);
    divElement.appendChild(previousElement);

    return divElement;
}

const createStatsElements = (mainElement) => {
    const activeLink = getActiveLink().replace('#', '');
    const statOption = activeLink !== '' ? activeLink : 'daily';

    statsList.forEach((stat) => {
        const cardId = stat.title.toLowerCase().replace(' ', '-');
        const previous = previousStatsTexts[statOption] + stat.timeframes[statOption].previous + 'hrs';
        const current = stat.timeframes[statOption].current + 'hrs';

        const cardElement = createStatCard(cardId);
        const timeframeCard = cardElement.appendChild(createTimeframeCard());

        const headerElement = createTimeframeHeader(stat.title);
        const statDataElement = createStatDataElement(previous, current);

        timeframeCard.appendChild(headerElement);
        timeframeCard.appendChild(statDataElement);
        mainElement.appendChild(cardElement);
    });
}

const updateStatsElements = (activeLink) => {
    statsList.forEach((stat, index) => {
        const previous = 
            previousStatsTexts[activeLink] + 
            stat.timeframes[activeLink].previous + 'hrs';
        const current = stat.timeframes[activeLink].current + 'hrs';

        const previousElement = document.getElementsByClassName('previous')[index];
        const currentElement = document.getElementsByClassName('current')[index];

        previousElement.textContent = previous;
        currentElement.textContent = current;
    });
}

const renderStats = () => {
    const mainElement = document.getElementsByTagName('main')[0];
    const statsElements = document.getElementsByClassName('stats');
    const activeLink = document.getElementsByClassName('active')[0].id;

    if (statsElements.length > 0) {
        updateStatsElements(activeLink);
    } else {
        createStatsElements(mainElement);
    }
}

const fetchData = async () => {
    const response = await fetch('./data.json');

    if (response.ok) {
        const data = await response.json();
        addEventListenerToLinks(data);
    }
}

fetchData();