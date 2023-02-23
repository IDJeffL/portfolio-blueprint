import { Fields } from "./Fields";
import { ValidateFields } from "./ValidateFields";
import styles from './GravityForms.module.scss';

export default function GravityForms({ formContent, postContent }) {
  if (!formContent && !postContent) {
    return;
  }

  /**
   * WordPress API Url
   * ( this should also be configured in the .env.local file )
   */
  const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL

  /**
   * For Faust Integration, 
   * ( set postContent value ) 
   */
  postContent = postContent.content

  /**
   * Check Post Content
   * If the postContent contains any of these WP Shortcuts, let's exit here.
   */
  if (postContent.includes('[wpLoginForm]')
    || postContent.includes('[wpRegisterForm]')
    || postContent.includes('[wpResetPasswordForm]')
    || postContent.includes('[wpUpdatePasswordForm]')
    || postContent.includes('[SearchResults]')
  ) { return (<></>) }

  /**
   * Check each postContent <sections> for classname 'gform_wrapper',
   * replace any WordPress forms with NextJS components for GravityForms.
   */
  let postSections = postContent.replace(/(\r\n|\n|\r|\t)/gm, "").split("</section>");

  function extractText(strToParse, strStart, strFinish) {
    let result = strToParse.match(strStart + "(.*?)" + strFinish)
    return result
  }

  let gfFormID = 0, gfFormContainer = '', gfBlockID = '', gfFormObjects = []
  if (postSections.length > 0) {
    for (let i = 0; i < postSections.length; i++) {
      if (postSections[i].indexOf('gform_wrapper') !== -1) {
        /* FormID */
        gfFormID = extractText(postSections[i].replace("gform_wrapper_", ""), "id='", "'")[1]
        /* Block ID */
        gfBlockID = (extractText(postSections[i], "block_", "\"") !== null) ? extractText(postSections[i], "block_", "\"")[1] : null
        /* Remove all WP Form Content from Post to create a form container */
        gfFormContainer = postSections[i].replace(/<script(.*?)<\/script>/gi, '')
          .replace(/<form.*<\/form>/, '')
          .replace(/<iframe.*<\/iframe>/, '')
          .replace(/>\s+</g, '><')
          + '</section>'
        /* If gfFormContainer isnt a section we need to remove any reference to section */
        if (!gfFormContainer.startsWith("<section")) {
          gfFormContainer = gfFormContainer.replace(/<section(.*?)<\/section>/gi, '')
        }
        /* Assign form container to array */
        gfFormObjects.push(gfFormContainer);
      }
    }
  }

  /**
   * Replace any WordPress form <sections> content with the gForm data instead,
   */
  for (let i = 0; i < gfFormObjects.length; i++) {
    /* Block ID */
    let blockRef = (extractText(gfFormObjects[i], "block_", "\"") !== null) ? extractText(gfFormObjects[i], "block_", "\"")[1] : null
    /* Remove Section */
    let regex = new RegExp(`<section id="block_${blockRef}(.*?)<\/section>`, "gi");
    /* Get Gravity Form Id from obj where we want the form to appear */
    gfFormID = extractText(gfFormObjects[i].replace("gform_wrapper_", ""), "id='", "'")
    /* Assign the form content where we want to appear in the html obj */
    gfFormObjects[i] = gfFormObjects[i].replace(
      "<div id='gf_" + gfFormID[1] + "' class='gform_anchor' tabindex='-1'></div>",
      "<div id='gf_" + gfFormID[1] + "' class='gform_anchor' tabindex='-1'></div>"
      /* Add form content to div */
      + createForm(gfFormID[1], formContent, 1)
    )
    /* Update postContent to provide the space for the gForm content */
    if (gfFormObjects[i].startsWith("<section")) { // Update <section> content
      postContent = postContent.replace(/[\s\t]+/g, ' ').replace(regex, gfFormObjects[i])
    } else { // Update other content
      let regex = new RegExp(`<form method(.*?)<\/form>`, "gi");
      let regex1 = new RegExp(`<iframe(.*?)<\/iframe>`, "gi");
      let regex2 = new RegExp(`<script(.*?)<\/script>`, "gi");
      postContent = postContent.replace(/[\s\t]+/g, ' ')
        .replace(regex, gfFormObjects[i])
        .replace(regex1, '')
        .replace(regex2, '')
    }
  }

  /**
   * Add content formFields to form
   */
  function createForm(gfFormID, formContent) {

    /**
     * Set the selected form object
     */
    let formFields = ''
    let selectedForm = ''
    if (formContent.nodes && formContent.nodes.length > 0) {
      for (let i = 0; i < formContent.nodes.length; i++) {
        if (Number(formContent.nodes[i].databaseId) === Number(gfFormID)) {
          selectedForm = formContent.nodes[i].formFields
        }
      }
    }

    formContent = ['gfForm']
    formContent['gfForm'] = ['formFields']
    formContent['gfForm']['formFields'] = selectedForm

    if (gfFormID && formContent) {
      /* Form */
      formFields = formFields + '<div id="gfFormSubmitted' + gfFormID + '" class="' + styles.gfFieldError + '"></div>'
      formFields = formFields + '<form name="gfForm' + gfFormID + '" id="gfForm' + gfFormID + '">'
      if (formContent.gfForm.formFields.nodes) {
        formFields = formFields + gfFormStages(gfFormID, formContent.gfForm.formFields.nodes)
        formFields = formFields + '<div id="gfFormErrors' + gfFormID + '" class="' + styles.gfFieldError + ' gfFormErrors' + gfFormID + '"></div>'
        formContent.gfForm.formFields.nodes.map((node) => {
          if (Fields(gfFormID, node, formFields) !== undefined) {
            formFields = Fields(gfFormID, node, formFields)
          }
        })
      }

      /**
       * Multi-Page Navigation
       */
      if (gfFormStages(gfFormID, formContent.gfForm.formFields.nodes)) {
        /* <<< Prev | Next >>> buttons */
        formFields = formFields + '<div class="' + styles.gfNavForm + '">'
        formFields = formFields + '<div id="gfPrevButton' + gfFormID + '" class="' + styles.gfPrevButton + '" data-gfformid="' + gfFormID + '"><< Prev</div>'
        formFields = formFields + '<div id="gfNextButton' + gfFormID + '" class="' + styles.gfNextButton + '" data-gfformid="' + gfFormID + '">Next >></div>'
        formFields = formFields + '</div>'
        /* On initial page load, show the first pageNumber items only */
        if (typeof document !== 'undefined') {
          setTimeout(function () {
            const i = document.querySelectorAll('[class*="pageNumber_"]');
            i.forEach(input => {
              if (!input.attributes.class.value.includes("pageNumber_1")) {
                for (let j = 0; j < document.getElementsByClassName(input.attributes.class.value).length; j++) {
                  if (document.getElementsByClassName(input.attributes.class.value)[j]) {
                    document.getElementsByClassName(input.attributes.class.value)[j].style.display = 'none'
                  }
                }
              } else {
                document.getElementById('gfPrevButton' + gfFormID).style.visibility = 'hidden'
                document.getElementById('gfSubmitForm' + gfFormID).style.visibility = 'hidden'
                if (document.getElementsByClassName('progressId_1')[0]) {
                  document.getElementsByClassName('progressId_1')[0].classList.add(styles.gfActiveProgress)
                }
              }
            })
          }, 0);
        }
      }
      /* Submit button */
      formFields = formFields + '<div id="gfSubmitForm' + gfFormID + '" class="' + styles.gfSubmitForm + '" data-gfformid="' + gfFormID + '">Send</div>'
      formFields = formFields + '</form>'
    }
    return formFields
  }

  /**
   * Progress bar 
   */
  function gfFormStages(gfFormID, contentSections) {
    let pages = 1
    /* Create default progress notification */
    let progress = '<div class="' + styles.gfProgressNotice + ' progressId_' + pages + '">'
      + '&nbsp;Section 1&nbsp;'
      + '</div>'
    /* Loop for all pages */
    if (!contentSections) {
      return ''
    }
    for (let i = 0; i < contentSections.length; i++) {
      if (contentSections[i].__typename == 'PageField') {
        pages++
        /* Create progress notification for other pages */
        progress += ' | '
          + '<div class="' + styles.gfProgressNotice + ' progressId_' + pages + '">'
          + '&nbsp;Section ' + pages + '&nbsp;'
          + '</div>'
      }
    }
    /* Set content to return  */
    let content = '<div id="gfFormStages' + gfFormID + '" style="width:100%;text-align:center;">'
      + progress
      + '</div>'
    return (pages > 1) ? content : ''
  }

  /**
   * Event Listener
   */
  if (typeof document !== 'undefined') {
    /* Set default navId value */
    let navId = 1
    /* Create new formData obj */
    let formData = new FormData();
    /* Onclick event */
    document.addEventListener('click', function (e) {
      /* Remove the item name so we can get the number */
      let gfFormID = e.target.id.replace('gfSubmitForm', '')
        .replace('gfPrevButton', '')
        .replace('gfNextButton', '')
      /* Prevent the onclick event from looping */
      e.stopImmediatePropagation();
      /* If onclick event is for <<< Prev button */
      if (e.target.matches('#gfPrevButton' + gfFormID)) {
        document.getElementById('gfNextButton' + gfFormID).style.visibility = 'visible'
        document.getElementById('gfSubmitForm' + gfFormID).style.visibility = 'hidden'
        /* Hide current element */
        for (let i = 0; i < document.getElementsByClassName('pageNumber_' + navId).length; i++) {
          document.getElementsByClassName('pageNumber_' + navId)[i].style.display = 'none'
        }
        /* Update navId value */
        navId--
        /* Display new element(s) */
        for (let i = 0; i < document.getElementsByClassName('pageNumber_' + navId).length; i++) {
          document.getElementsByClassName('pageNumber_' + navId)[i].style.display = 'block'
          /* Highlight selected progress stage */
          if (document.getElementsByClassName('progressId_' + navId)[i] !== undefined) {
            document.getElementsByClassName('progressId_' + (navId + 1))[i].classList.remove(styles.gfActiveProgress)
            document.getElementsByClassName('progressId_' + navId)[i].classList.add(styles.gfActiveProgress)
          }
        }
        /* No previous to display */
        if (!document.getElementsByClassName('pageNumber_' + (navId - 1))[0]) {
          document.getElementById('gfPrevButton' + gfFormID).style.visibility = 'hidden'
          return
        }
      }

      /* If onclick event is for Next >>> button */
      if (e.target.matches('#gfNextButton' + gfFormID)) {
        document.getElementById('gfPrevButton' + gfFormID).style.visibility = 'visible'
        document.getElementById('gfSubmitForm' + gfFormID).style.visibility = 'hidden'
        /* Validate form field(s) before moving to next section */
        // let confirmFormData = validateFormFields( gfFormID, navId, formData )
        let confirmFormData = ValidateFields(gfFormID, navId, formData)
        if (confirmFormData === 'error' || confirmFormData === 'invalidField') {
          return
        }
        /* Hide current element(s) */
        for (let i = 0; i < document.getElementsByClassName('pageNumber_' + navId).length; i++) {
          document.getElementsByClassName('pageNumber_' + navId)[i].style.display = 'none'
        }
        /* Update navId value */
        navId++
        /* Highlight selected progress */
        for (let i = 0; i < document.getElementsByClassName('pageNumber_' + navId).length; i++) {
          document.getElementsByClassName('pageNumber_' + navId)[i].style.display = 'block'
          /* Reset current selected progress */
          if (document.getElementsByClassName('progressId_' + (Number(navId) - 1))[i]) {
            document.getElementsByClassName('progressId_' + (Number(navId) - 1))[i].classList.remove(styles.gfActiveProgress)
          }
          /* Highlight new selected progress */
          if (document.getElementsByClassName('progressId_' + Number(navId))[i]) {
            document.getElementsByClassName('progressId_' + Number(navId))[i].classList.add(styles.gfActiveProgress)
          }
        }
        /* No Next >>> to display */
        if (!document.getElementsByClassName('pageNumber_' + (navId + 1))[0]) {
          document.getElementById('gfNextButton' + gfFormID).style.visibility = 'hidden'
          document.getElementById('gfSubmitForm' + gfFormID).style.visibility = 'visible'
        }
      }

      /* If onclick event is for submitting gravity form */
      if (e.target.id === 'gfSubmitForm' + gfFormID) {
        /* Validate form field(s) before moving to next section */
        // let confirmFormData = validateFormFields( gfFormID, navId, formData )
        let confirmFormData = ValidateFields(gfFormID, navId, formData)
        if (confirmFormData === 'error' || confirmFormData === 'invalidField') {
          return
        }
        /* Submit the form to Wordpress db */
        if (formData !== '') {
          /**
           * Validate form contents with Akismet 
           * 
           * Optional: To integrate Akismet in form submission, please
           * refer to the notes/content in the file: components/README.md
           */
          /**
           * Send Gravity Form content to WP
           */
          function sendGravityForm(gfFormID, formData) {
            /* Prevent data from being sent more than once */
            e.stopImmediatePropagation();
            /* Set Gravity Form url to send formParams to */
            let url = WORDPRESS_URL + '/wp-json/gf/v2/forms/' + gfFormID + '/submissions';
            /* Send the formParams to Wordpress */
            fetch(url, {
              method: 'POST',
              body: formData
            })
              .then(res => res.json())
              .then(data => {
                /* On response, what should we do? */
                let result = (!data.is_valid) ? data.validation_messages : data.confirmation_message;
                /* Show result */
                document.getElementById('gform_wrapper_' + gfFormID).innerHTML = result
                document.getElementById('gform_wrapper_' + gfFormID).style.display = 'block';
                /* Reset all form fields */
                if (data.is_valid) {
                  document.getElementById('gfForm' + gfFormID).reset()
                  document.getElementById('gfForm' + gfFormID).style.display = 'none';
                }
              })
              .catch(error => {
                console.log(error)
              })
          } sendGravityForm(gfFormID, formData)
        }
      }
    });
  }

  /**
   * Return the WP Post content and Gravity Form.
   *
   * In the WordPress template we will see a class(es) string as shown below,
   * class="col-md-9 col-lg-8 col-xl-7 col-xxl-6"
   * This code needs to be removed just for now as it resizes the content within the GravityForms...
   */
  return (
    <>
      <div
        className="text-lg leading-relaxed mb-4"
        dangerouslySetInnerHTML={{
          __html: postContent.replace(/class="col-md-9 col-lg-8 col-xl-7 col-xxl-6"/g, '')
        }}></div>
    </>
  )
}
