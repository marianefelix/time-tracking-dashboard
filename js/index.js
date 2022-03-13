const clearPreviousLink = () => {
    const activeLink = document.getElementsByClassName('active')[0];

    activeLink.removeAttribute('class');
}

const getActiveLink = () => {
    const windowLocationHash = window.location.hash;

    return windowLocationHash;
}

const setDailyOption = () => {
    const dailyOption = document.getElementById('daily');
    dailyOption.click();
}

const addEventListenerToLinks = (statsList) => {
    const statOptionsElements = document.querySelectorAll('a');

    statOptionsElements.forEach((linkElement) => {
        linkElement.addEventListener('click', () => {
            clearPreviousLink();
            linkElement.setAttribute('class', 'active');

            renderStats(statsList);
        })
    });

    setDailyOption();
}

const previousStatsTexts = {
    'daily': 'Yesterday - ',
    'weekly': 'Last Week - ',
    'monthly': 'Last month - '
}

const updateStatsInfo = (activeLink, statsList) => {
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

const renderStats = (statsList) => {
    const activeLink = document.getElementsByClassName('active')[0].id;

    updateStatsInfo(activeLink, statsList);
}

const fetchData = async () => {
    const response = await fetch('./data.json');

    if (response.ok) {
        const data = await response.json();
        addEventListenerToLinks(data);
    }
}

fetchData();