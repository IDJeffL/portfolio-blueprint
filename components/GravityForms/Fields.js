
import styles from './GravityForms.module.scss';

/**
 * Create form fields
 */
export function Fields(gfFormID, node, formFields) {
    
    let formField = ''
    let textRequired = ''
    let fieldRequired = ''
    let description = ''

    switch (node.type) {

        /**
         * Text
         */
        case 'TEXT':
            if (node.isRequired) {
                textRequired = '<i>(Required)</i>'
                fieldRequired = 'required'
            }
            if (!node.description) {
                description = ''
            }
            formField = '<div class="' + styles.gfField + ' pageNumber_' + node.pageNumber + '">'
                + '<div><label for="input_' + node.id + '" class="' + styles.gfFieldLabel + '">' + node.label + ' <span class="' + styles.gfFieldRequired + '">' + textRequired + '</span></label></div>'
                + '<div class="gfFieldTextError' + gfFormID + '" ></div>'
                + '<div><input id="input_' + node.id + '" name="input_' + node.id + '" type="' + node.type + '" value="" class="formField input_' + node.id + '" ' + fieldRequired + '></div>'
                + '<div>' + description + '</div>'
                + '</div>'
            return formFields + formField

        /**
         * Checkbox
         */
        case 'CHECKBOX':
            if (node.isRequired) {
                textRequired = '<i>(Required)</i>'
                fieldRequired = 'required'
            }
            if (!node.description) {
                description = ''
            }
            formField = '<div class="' + styles.gfField + ' pageNumber_' + node.pageNumber + '">'
                + '<div><label for="input_' + node.id + '" class="' + styles.gfFieldLabel + '">' + node.label + ' <span class="' + styles.gfFieldRequired + '">' + textRequired + '</span></label></div>'
                + '<div class="gfFieldCheckboxError' + gfFormID + '"></div>'
                + createCheckboxField(node, fieldRequired)
                + '<div>' + description + '</div>'
                + '</div>'
            return formFields + formField

        /**
         * Select
         */
        case 'SELECT':
            if (node.isRequired) {
                textRequired = '<i>(Required)</i>'
                fieldRequired = 'required'
            }
            if (!node.description) {
                description = ''
            }
            formField = '<div class="' + styles.gfField + ' pageNumber_' + node.pageNumber + '">'
                + '<div><label for="input_' + node.id + '" class="' + styles.gfFieldLabel + '">' + node.label + ' <span class="' + styles.gfFieldRequired + '">' + textRequired + '</span></label></div>'
                + '<div class="gfFieldSelectError' + gfFormID + '"></div>'
                + createSelectField(node, fieldRequired)
                + '<div>' + description + '</div>'
                + '</div>'
            return formFields + formField

        /**
         * TextArea ( Paragraph Text )
         */
         case 'TEXTAREA':
            if (node.isRequired) {
                textRequired = '<i>(Required)</i>'
                fieldRequired = 'required'
            }
            if (!node.description) {
                description = ''
            }
            formField = '<div class="' + styles.gfField + ' pageNumber_' + node.pageNumber + '">'
                + '<div><label for="input_' + node.id + '" class="' + styles.gfFieldLabel + '">' + node.label + ' <span class="' + styles.gfFieldRequired + '">' + textRequired + '</span></label></div>'
                + '<div class="gfFieldTextAreaError' + gfFormID + '"></div>'
                + '<div><textarea id="input_' + node.id + '" name="input_' + node.id + '" type="' + node.type + '" value="" class="formField input_' + node.id + '" ' + fieldRequired + '></textarea></div>'
                + '<div>' + description + '</div>'
                + '</div>'
            return formFields + formField
            
        /**
         * Phone
         */
         case 'PHONE':
            if (node.isRequired) {
                textRequired = '<i>(Required)</i>'
                fieldRequired = 'required'
            }
            if (!node.description) {
                description = ''
            }
            formField = '<div class="' + styles.gfField + ' pageNumber_' + node.pageNumber + '">'
                + '<div><label for="input_' + node.id + '" class="' + styles.gfFieldLabel + '">' + node.label + ' <span class="' + styles.gfFieldRequired + '">' + textRequired + '</span></label></div>'
                + '<div class="gfFieldPhoneError' + gfFormID + '"></div>'
                + '<div><input id="input_' + node.id + '" name="input_' + node.id + '" type="' + node.type + '" value="" class="formField input_' + node.id + '" ' + fieldRequired + '></div>'
                + '<div>' + description + '</div>'
                + '</div>'
            return formFields + formField            

        /**
         * Email
         */
         case 'EMAIL':
            if (node.isRequired) {
                textRequired = '<i>(Required)</i>'
                fieldRequired = 'required'
            }
            if (!node.description) {
                description = ''
            }
            formField = '<div class="' + styles.gfField + ' pageNumber_' + node.pageNumber + '">'
                + '<div><label for="input_' + node.id + '" class="' + styles.gfFieldLabel + '">' + node.label + ' <span class="' + styles.gfFieldRequired + '">' + textRequired + '</span></label></div>'
                + '<div class="gfFieldEmailError' + gfFormID + '"></div>'
                + '<div><input id="input_' + node.id + '" name="input_' + node.id + '" type="' + node.type + '" value="" class="formField input_' + node.id + '" ' + fieldRequired + '></div>'
                + '<div>' + description + '</div>'
                + '</div>'
            return formFields + formField
            
        /**
         * Radio
         */
         case 'RADIO':
            if (node.isRequired) {
                textRequired = '<i>(Required)</i>'
                fieldRequired = 'required'
            }
            if (!node.description) {
                description = ''
            }
            formField = '<div class="' + styles.gfField + ' pageNumber_' + node.pageNumber + '">'
                + '<div><label for="input_' + node.id + '" class="' + styles.gfFieldLabel + '">' + node.label + ' <span class="' + styles.gfFieldRequired + '">' + textRequired + '</span></label></div>'
                + '<div class="gfFieldRadioError' + gfFormID + '"></div>'
                + createRadioField(node, fieldRequired)
                + '<div>' + description + '</div>'
                + '</div>'
            return formFields + formField
            
        /**
         * HTML
         */
        case 'HTML':
            formField = '<div class="' + styles.gfField + ' pageNumber_' + node.pageNumber + '">'
                + node.content
                + '</div>'
            return formFields + formField
    }

    /**
     * Get CHECKBOX options
     */
    function createCheckboxField(node, fieldRequired) {
        let checkboxFields = '<ul class="' + styles.gfFieldCheckbox + '">'
        /* Loop for each checkbox option field */
        for (let i = 0; i < node.choices.length; i++) {
            checkboxFields += '<li><input name="input_' + node.id + '_' + (i + 1) + '" type="checkbox" id="input_' + node.id + '_' + (i + 1) + '" value="' + node.choices[i].value + '" class="formField input_' + node.id + '" ' + fieldRequired + '> ' + node.choices[i].text + '</li>'
        }
        return checkboxFields += '</ul>'
    }

    /**
     * Get SELECT options
     */
    function createSelectField(node, fieldRequired) {
        let selectFields = '<select class="' + styles.gfFieldSelect + '" name="input_' + node.id + '" id="input_' + node.id + '" ' + fieldRequired + '>'
        /* Loop for each select option field */
        for (let i = 0; i < node.choices.length; i++) {
            selectFields += '<option name="input_' + node.id + '_' + (i + 1) + '" id="input_' + node.id + '_' + (i + 1) + '" value="' + node.choices[i].value + '" class="formField input_' + node.id + '"> ' + node.choices[i].text + '</option>'
        }
        return selectFields += '</select>'
    }

    /**
     * Get RADIO options
     */
     function createRadioField(node, fieldRequired) {
        let radioFields = '<ul class="' + styles.gfFieldRadio + '">'
        /* Loop for each checkbox option field */
        for (let i = 0; i < node.choices.length; i++) {
            radioFields += '<li><input name="input_' + node.id + '" type="radio" id="input_' + node.id + '" value="' + node.choices[i].value + '" class="formField input_' + node.id + '" ' + fieldRequired + '> ' + node.choices[i].text + '</li>'
        }
        return radioFields += '</ul>'
    }    
}
