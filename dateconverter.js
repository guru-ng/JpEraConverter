document.addEventListener("DOMContentLoaded", function () {
    const modeSelector = document.getElementById("mode");
    const jpToEngFieldset = document.getElementById("jptoeng");
    const engToJpFieldset = document.getElementById("engtojp");

    function updateMode() {
        const selected = modeSelector.value;
        jpToEngFieldset.style.display = selected === "jptoeng" ? "block" : "none";
        engToJpFieldset.style.display = selected === "engtojp" ? "block" : "none";
    }

    modeSelector.addEventListener("change", updateMode);
    updateMode(); // Initial call to set visibility

    // Jp → Gregorian
    const jpYearInput = document.getElementById("jpYear");
    const jpMonthInput = document.getElementById("jpMonth");
    const jpDayInput = document.getElementById("jpDay");
    const eraRadios = document.querySelectorAll("input[name='era']");
    const outputText = document.getElementById('date-value01');
    const convertedText = document.getElementById('date-value001');

    function updateDateOutput() {
        const era = document.querySelector("input[name='era']:checked").value;
        const year = parseInt(jpYearInput.value);
        const month = parseInt(jpMonthInput.value);
        const day = parseInt(jpDayInput.value);

        if (isNaN(year) || isNaN(month) || isNaN(day)) return;

        try {
            const toEngDate = toGregorian(era, year, month, day);
            outputText.textContent = `The selected Date is ${toEngDate}`;
            convertedText.textContent = toEngDate;
            document.getElementById('result01').style.display = 'block';
        } catch (err) {
            console.error("Conversion error", err);
        }
    }

    [...eraRadios, jpYearInput, jpMonthInput, jpDayInput].forEach(input => {
        input.addEventListener('change', updateDateOutput);
    });

    updateDateOutput(); // Initial display

    // Gregorian → Jp
    const dateinput = document.getElementById("birth-date");
    const display = document.getElementById('date-value');
    const displayDate = document.getElementById('date-value1');

    dateinput.addEventListener('change', function (event) {
        const value = event.target.value;

        if (value) {
            display.textContent = convertToJapaneseDate(value);
            displayDate.textContent = value;
            document.getElementById('result').style.display = 'block';
        } else {
            display.textContent = 'not set';
            document.getElementById('result').style.display = 'none';
        }
    });

    // Functions
    function convertToJapaneseDate(value) {
        const newDate = new Date(value);
        const options = {
            era: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        const formatter = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', options);
        return formatter.format(newDate);
    }

    function toGregorian(era, year, month, day) {
        const jpEras = {
            '明治': 1868,
            '大正': 1912,
            '昭和': 1926,
            '平成': 1989,
            '令和': 2019
        };
        const startYear = jpEras[era];
        const gregYear = startYear + year - 1;
        const date = new Date(gregYear, month - 1, day);
        return date.toISOString().split('T')[0];
    }

    // Copy Buttons
    const copyBtn = document.getElementById('copy-button');
    const copyBtn2 = document.getElementById('copy-button01');

    copyBtn.addEventListener('click', function () {
        const text = display.textContent;
        if (text && text !== 'not set') {
            navigator.clipboard.writeText(text)
                .then(() => {
                    copyBtn.textContent = 'Copied!';
                    copyBtn.classList.add('copied');
                    setTimeout(() => {
                        copyBtn.textContent = 'Copy';
                        copyBtn.classList.remove('copied');
                    }, 1500);
                })
                .catch(err => {
                    console.log('Failed to copy', err);
                });
        }
    });

    copyBtn2.addEventListener('click', function () {
        const text = convertedText.textContent;
        if (text && text !== 'not set') {
            navigator.clipboard.writeText(text)
                .then(() => {
                    copyBtn2.textContent = 'Copied!';
                    copyBtn2.classList.add('copied');
                    setTimeout(() => {
                        copyBtn2.textContent = 'Copy';
                        copyBtn2.classList.remove('copied');
                    }, 1500);
                })
                .catch(err => {
                    console.log('Failed to copy', err);
                });
        }
    });
});
