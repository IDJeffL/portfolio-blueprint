
import styles from './GravityForms.module.scss';

/**
 * Validate all form fields
 * ( requested when clicking Next >>> or form Submission button )
 */

export function ValidateFields(gfFormID, navId, formData) {

    /* Set default formError status */
    let formError = false

    /* Reset all error messages */
    if ( document.getElementsByClassName('gfError')[0] ) {
        for ( let i = 0; i < document.getElementsByClassName('gfError').length; i++ ) {
            document.getElementsByClassName('gfError')[i].style.display = 'none';
        }
    }

    /* We only need the form fields for the form page(s) we are viewing */
    let classList = ''

    /* Get required form input values */
    let formInputs = document.querySelectorAll('#gfForm' + gfFormID + ' input');
    formInputs.forEach(input => {

        /**
         * Text / Phone Field
         */
        if (input.type === 'text') {
            classList = document.forms['gfForm' + gfFormID].getElementsByClassName(input.name)[0].parentElement.parentElement.classList
            if (classList.value.indexOf('pageNumber_' + navId) === -1) {
                return 'invalidField'
            }
            /* If this field is not required ( optional ) */
            if (input.required !== true) {
                formData.delete(input.name)
                formData.append(input.name, document.forms['gfForm' + gfFormID].getElementsByClassName(input.name)[0].value);
                return
            }
            let textResult = validateField(gfFormID, 'text', document.forms['gfForm' + gfFormID].getElementsByClassName(input.name)[0])
            /* Oops, no text has been entered in the field */
            if (textResult === false) {
                let errorMsg = document.forms['gfForm' + gfFormID].getElementsByClassName(input.name)[0].parentElement.parentElement.getElementsByTagName('label')[0].innerText
                document.forms['gfForm' + gfFormID].getElementsByClassName(input.name)[0].parentElement.innerHTML += '<div class="' + styles.gfFieldError + ' gfError">Please enter ' + errorMsg + '</div>'
                if (navId === Number(1) && document.getElementById('gfPrevButton' + gfFormID)) { /* We dont need the PREV button on Page 1 */
                    document.getElementById('gfPrevButton' + gfFormID).style.visibility = 'hidden'
                }
                formError = true
            } else { /* Alls good, add form value to formData */
                formData.delete(input.name)
                formData.append(input.name, document.forms['gfForm' + gfFormID].getElementsByClassName(input.name)[0].value)
            }
        }

        /**
         * Email Field
         */
         if (input.type === 'email') {
            classList = document.forms['gfForm' + gfFormID].getElementsByClassName(input.name)[0].parentElement.parentElement.classList
            if (classList.value.indexOf('pageNumber_' + navId) === -1) {
                return 'invalidField'
            }
            /* If this field is not required ( optional ) */
            if (input.required !== true) {
                formData.delete(input.name)
                formData.append(input.name, document.forms['gfForm' + gfFormID].getElementsByClassName(input.name)[0].value);
                return
            }
            let textResult = validateField(gfFormID, 'text', document.forms['gfForm' + gfFormID].getElementsByClassName(input.name)[0])
            /* Oops, no text has been entered in the field */
            if (textResult === false) {
                if ( document.getElementsByClassName('gfFieldEmailError')[0] ) {
                    document.getElementsByClassName('gfFieldEmailError')[0].remove()
                }
                let errorMsg = document.forms['gfForm' + gfFormID].getElementsByClassName(input.name)[0].parentElement.parentElement.getElementsByTagName('label')[0].innerText
                document.forms['gfForm' + gfFormID].getElementsByClassName(input.name)[0].parentElement.innerHTML += '<div class="' + styles.gfFieldError + ' gfFieldEmailError gfError">Please enter ' + errorMsg + '</div>'
                if (navId === Number(1) && document.getElementById('gfPrevButton' + gfFormID)) { /* We dont need the PREV button on Page 1 */
                    document.getElementById('gfPrevButton' + gfFormID).style.visibility = 'hidden'
                }
                formError = true
            } else { /* Alls good, add form value to formData */
                formData.delete(input.name)
                formData.append(input.name, document.forms['gfForm' + gfFormID].getElementsByClassName(input.name)[0].value);
            }
        }        

        /**
         * Checkbox Field
         */
        if (input.type === 'checkbox') {
            /* Set default value */
            let checked = false
            /* Get checkbox parent id */
            let parentCheckbox = input.name.split('_')
            let parentCheckboxName = parentCheckbox[0] + '_' + parentCheckbox[1]
            classList = document.forms['gfForm' + gfFormID].getElementsByClassName(parentCheckboxName)[0].parentElement.parentElement.parentElement.classList
            if (classList.value.indexOf('pageNumber_' + navId) === -1) {
                return 'invalidField'
            }
            /* If this field is not required ( optional ) */
            if (input.required !== true) {
                checked = (document.getElementById(input.name).checked) ? input.value : ''
                formData.delete(input.name)
                formData.append(input.name, checked);
                return
            }
            let checkboxResult = validateField(gfFormID, 'checkbox', document.getElementById(input.name))
            /* Validate at least one option has been selected */
            let count = 0
            for (let i = 0; i < document.getElementsByClassName(parentCheckboxName).length; i++) {
                if (document.getElementsByClassName(parentCheckboxName)[i].checked) {
                    count++
                }
            }
            /* Oops, no required options have been selected */
            if (count < 1) {
                if ( document.getElementsByClassName('gfFieldCheckboxError')[0] ) {
                    for (let i = 0; i < document.getElementsByClassName('gfFieldCheckboxError').length; i++) {
                        document.getElementsByClassName('gfFieldCheckboxError')[i].remove()
                    }
                }
                document.forms['gfForm' + gfFormID].elements[input.id].parentElement.parentElement.outerHTML += '<div class="' + styles.gfFieldError + ' gfFieldCheckboxError gfError">Please check a box (Required)</div>'
                formError = true
            } else { /* Alls good, add form value to formData */
                if (checkboxResult !== false) {
                    checked = (document.getElementById(input.name).checked) ? input.value : ''
                    formData.delete(input.name)
                    formData.append(input.name, checked);
                }
            }
        }

        /**
         * Radio Field
         */
         if (input.type === 'radio') {
            classList = document.forms['gfForm' + gfFormID].getElementsByClassName(input.name)[0].parentElement.parentElement.classList
            if (classList.value.indexOf('pageNumber_' + navId) === -1) {
                // return 'invalidField'
            }
            /* If this field is not required ( optional ) */
            if (input.required !== true) {
                formData.delete(input.name)
                formData.append(input.name, document.forms['gfForm' + gfFormID].getElementsByClassName(input.name)[0].value);
                return
            }
            let radioResult = validateField(gfFormID, 'radio', document.forms['gfForm' + gfFormID].getElementsByClassName(input.name)[0])
            /* Validate at least one option has been selected */
            let radioChecked = false
            for (let i = 0; i < document.getElementsByClassName(input.name).length; i++) {
                if (document.getElementsByClassName(input.name)[i].checked) {
                    radioChecked = document.getElementsByClassName(input.name)[i].value
                    radioResult = true
                }
            }
            /* Oops, no radio button has been checked */
            if (radioResult === false) {
                if ( document.getElementsByClassName('gfFieldRadioError')[0] ) {
                    for (let i = 0; i < document.getElementsByClassName('gfFieldRadioError').length; i++) {
                        document.getElementsByClassName('gfFieldRadioError')[i].remove()
                    }
                }
                document.forms['gfForm' + gfFormID].getElementsByClassName(input.name)[0].parentElement.parentElement.outerHTML += '<div class="' + styles.gfFieldError + ' gfFieldRadioError gfError">Please select a Radio option (Required)</div>'
                formError = true
            } else { /* Alls good, add form value to formData */
                formData.delete(input.name)
                formData.append(input.name, radioChecked);
            }
        }        

    });

    /**
     * Select Field
     */
    let formSelects = document.querySelectorAll('#gfForm' + gfFormID + ' select');
    formSelects.forEach(select => {
        classList = document.forms['gfForm' + gfFormID].elements[select.id].parentElement.classList
        if (classList.value.indexOf('pageNumber_' + navId) === -1) {
            return 'invalidField'
        }

        /* If this field is not required ( optional ) */
        if (select.required !== true) {
            formData.delete(select.name)
            formData.append(select.name, document.forms['gfForm' + gfFormID].elements[select.id].value);
            return
        }

        /* If this field is required but has no value */
        if (select.required === true && !document.forms['gfForm' + gfFormID].elements[select.id].value) {
            if ( document.getElementsByClassName('gfFieldSelectError')[0] ) {
                document.getElementsByClassName('gfFieldSelectError')[0].remove()
            }
            document.forms['gfForm' + gfFormID].elements[select.id].parentElement.innerHTML += '<div class="' + styles.gfFieldError + ' gfFieldSelectError gfError">Please select an option (Required)</div>'
            formError = true
        } else {
            /* Alls good, add form value to formData */
            formData.delete(select.name)
            formData.append(select.name, document.forms['gfForm' + gfFormID].elements[select.id].value);
        }
    });

    /**
     * TextArea Field
     */
    let formTextAreas = document.querySelectorAll('#gfForm' + gfFormID + ' textarea');
    formTextAreas.forEach(textarea => {
        classList = document.forms['gfForm' + gfFormID].elements[textarea.id].parentElement.classList
        if (classList.value.indexOf('pageNumber_' + navId) === -1) {
            // return 'invalidField'
        }

        /* If this field is not required ( optional ) */
        if (textarea.required !== true) {
            formData.delete(textarea.name)
            formData.append(textarea.name, document.forms['gfForm' + gfFormID].elements[textarea.id].value);
            return
        }

        /* If this field is required but has no value */
        if (textarea.required === true && !document.forms['gfForm' + gfFormID].elements[textarea.id].value) {
            if ( document.getElementsByClassName('gfFieldTextAreaError')[0] ) {
                document.getElementsByClassName('gfFieldTextAreaError')[0].remove()
            }
            document.forms['gfForm' + gfFormID].elements[textarea.id].parentElement.innerHTML += '<div class="' + styles.gfFieldError + ' gfFieldTextAreaError gfError">Please enter TextArea text (Required)</div>'
            formError = true
        } else {
            /* Alls good, add form value to formData */
            formData.delete(textarea.name)
            formData.append(textarea.name, document.forms['gfForm' + gfFormID].elements[textarea.id].value);
        }
    });   

    /**
     * Validate a single field based on objType
     */
    function validateField(gfFormID = '', objType = '', obj = '') {
        if (objType === 'text' && obj.id !== undefined) {
            /* Reset error */
            document.getElementsByClassName('gfFieldTextError' + gfFormID)[0].innerHTML = ''
            /* Required field? */
            if (obj.value === '') {
                return false
            }
        }
        if (objType === 'checkbox' && obj.id !== undefined) {
            /* Reset error */
            document.getElementsByClassName('gfFieldCheckboxError' + gfFormID)[0].innerHTML = ''
            /* Required field? */
            if (obj.checked === false) {
                return false
            }
        }
        if (objType === 'select' && obj.id !== undefined) {
            /* Reset error */
            document.getElementsByClassName('gfFieldSelectError' + gfFormID)[0].innerHTML = ''
            /* Required field? */
            if (obj.checked === false) {
                return false
            }
        }
        if (objType === 'textarea' && obj.id !== undefined) {
            /* Reset error */
            document.getElementsByClassName('gfFieldTextAreaError' + gfFormID)[0].innerHTML = ''
            /* Required field? */
            if (obj.value === '') {
                return false
            }
        }  
        if (objType === 'phone' && obj.id !== undefined) {
            /* Reset error */
            document.getElementsByClassName('gfFieldPhoneError' + gfFormID)[0].innerHTML = ''
            /* Required field? */
            if (obj.value === '') {
                return false
            }
        }
        if (objType === 'email' && obj.id !== undefined) {
            /* Reset error */
            document.getElementsByClassName('gfFieldEmailError' + gfFormID)[0].innerHTML = ''
            /* Required field? */
            if (obj.value === '') {
                return false
            }
        } 
        if (objType === 'radio' && obj.id !== undefined) {
            /* Reset error */
            document.getElementsByClassName('gfFieldRadioError' + gfFormID)[0].innerHTML = ''
            /* Required field? */
            if (obj.checked === false) {
                return false
            }
        }         
    }

    /* Return form data */
    return (formError !== true) ? formData : 'error'

}
