/*==================== MULTI LANGUAGE ====================*/
// Function to fetch language data
async function fetchLanguageData(lang) {
    const response = await fetch(`languages/${lang}.json`);
    return response.json();
}

// Function to set the language preference
function setLanguagePreference(lang) {
    localStorage.setItem('language', lang);
    location.reload();
}

// Function to update content based on selected language
function updateContent(langData) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = langData[key];
    });
}

// Function to change language
async function changeLanguage(lang) {
    await setLanguagePreference(lang);

    const langData = await fetchLanguageData(lang);
    updateContent(langData);
}

// Call updateContent() on page load
window.addEventListener('DOMContentLoaded', async () => {
    const userPreferredLanguage = localStorage.getItem('language') || 'en';
    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData);
    const flagImg = document.querySelector('.dropbtn img');
    const formContactId = document.getElementById('form_id');
    const formContactEn = document.getElementById('form_en');

    if (userPreferredLanguage === 'en') {
        flagImg.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/1200px-Flag_of_the_United_Kingdom_%281-2%29.svg.png';
        flagImg.alt = 'English Flag';
        formContactEn.style.display = 'block'; // Display English form
        formContactId.style.display = 'none';  // Hide Indonesian form
    } else if (userPreferredLanguage === 'id') {
        flagImg.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Indonesia.svg/2560px-Flag_of_Indonesia.svg.png';
        flagImg.alt = 'Indonesian Flag';
        formContactEn.style.display = 'none';  // Hide English form
        formContactId.style.display = 'block'; // Display Indonesian form
    }

    // Add event listeners for language change
    document.querySelectorAll('.a-language').forEach(element => {
        element.addEventListener('click', (event) => {
            console.log('CLICK');
            const lang = event.target.closest('.a-language').getAttribute('data-lang');
            changeLanguage(lang);
        });
    });
});
