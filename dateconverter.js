
document.addEventListener("DOMContentLoaded", function() {
    const dateinput = document.getElementById("birth-date")
    dateinput.addEventListener('change', function(event){
        const value = event.target.value
        const display = document.getElementById('date-value')
        const displayDate = document.getElementById('date-value1')

        if(value){
            display.textContent = convertToJapaneseDate(value);
            displayDate.textContent = value;
        }
        else{
            display.textContent ='not set';
        }

    })


    function convertToJapaneseDate (value){
        const newDate = new Date(value)
    
        const options = {
            era: 'long',
            year:'numeric',
            month:'long',
            day:'numeric'
        }
        const formatter = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', options);
     const formattedValue = formatter.format(newDate);
     return formattedValue
    
    }
})