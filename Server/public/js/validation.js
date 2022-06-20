// read form element

console.log("init DOM")
const form = document.getElementById('form');
const email = document.getElementById('email');
const passwort = document.getElementById('passwort');
const passwort2 = document.getElementById('passwort2');
const vorname = document.getElementById('vorname');
const nachname = document.getElementById('nachname');
const alter = document.getElementById('alter');
const telefonnummer = document.getElementById('telefonnummer');

// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
        return true
    } else {
        showError(input, 'Fehlerhafte Email Adresse');
        return false
    }
}

//Check Phonenumber
function checkNumber(input) {
    const re = /^0(2[1-246-7]|3[1-4]|4[13-4]|5[25-6]|6[1-2]|7[15-68-9]|8[17]|91)[0-9]{7}/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
        return true
    } else {
        showError(input, 'Fehlerhafte Telefonnummer');
        return false
    }
}

// Check required fields
function checkRequired(inputArr) {
    let valid = true;
    inputArr.forEach(function(input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} Pflichtfeld`);
            valid = false;
        } else {
            showSuccess(input);
        }
    });

    return valid;
}

// Check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input,
            `${getFieldName(input)} muss mind. ${min} Zeichen beinhalten`
        );
        return false
    } else if (input.value.length > max) {
        showError(input,
            `${getFieldName(input)} darf max. ${max} Zeichen beinhalten`
        );
        return false
    } else {
        showSuccess(input);
        return true
    }
}


//Validate password
function checkPasswort(input){

    const first = document.getElementById('passwort').value;
    const second = document.getElementById('passwort2').value;

    if(first == second){
        showSuccess(input);
        return true
    }
    else{
        showError(input,'Passwörter stimmen nicht überein!');
        showError(passwort2, 'Passwörter stimmen nicht überein!');
        return false
    }
}

//Age restriction
function checkAge(input){
    if (input.value >= 18){
        showSuccess(input);
        return true
    }
    else {
        showError(input,'Um sich registrieren zu können müssen sie Volljährig sein.')
        return false
    }
}

// Get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Validate form input elements
function validateForm(){
    if(checkRequired([vorname, nachname, alter, telefonnummer, email, passwort, passwort2])){
        return checkLength(passwort, 8, 25)
        && checkPasswort(passwort2)
        && checkEmail(email)
        && checkAge(alter)
        && checkNumber(telefonnummer)
        && checkLength(vorname, 3,20)
        && checkLength(nachname, 3, 25);
    }

    return false
}


// Event listeners
form.addEventListener('submit', function(e) {
    //First validate form
    console.log("start validation ...")
    if(!validateForm())
       e.preventDefault();
    // else -> browser sends the form
});