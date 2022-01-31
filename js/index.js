const statOptionsElements = document.querySelectorAll('a');

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

    if (windowLocationHash == "" || windowLocationHash !== "#daily") {
        const dailyOption = document.getElementById('daily');
        dailyOption.click();
    }
}

const addEventListenerToLinks = () => {
    statOptionsElements.forEach((linkElement) => {
        linkElement.addEventListener('click', (event) => {
            clearPreviousLink();
            linkElement.setAttribute('class', 'active');
        })
    })

    setDailyOption();
}

addEventListenerToLinks();