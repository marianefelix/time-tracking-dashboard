const statOptionsElements = document.querySelectorAll('a');

const clearLinks = () => {
    statOptionsElements.forEach((linkElement) => {
        linkElement.classList.remove('active');
    });
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
            clearLinks();
            linkElement.classList.add('active');
        })
    })

    setDailyOption();
}

addEventListenerToLinks();