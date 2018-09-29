/*
 ######   ########   ######     ##     ## ######## ##       ########
##    ##  ##     ## ##    ##    ##     ## ##       ##       ##     ##
##        ##     ## ##          ##     ## ##       ##       ##     ##
##   #### ########   ######     ######### ######   ##       ########
##    ##  ##   ##         ##    ##     ## ##       ##       ##
##    ##  ##    ##  ##    ##    ##     ## ##       ##       ##
 ######   ##     ##  ######     ##     ## ######## ######## ##
*/

const grsHelpSteps = [];

grsHelpSteps[0] = ['1. Open GRS\'s HTML Template Editor', `
  <p>
    Your first step in sending your email through GRS is creating a template
    shell to contain your email content. To start, navigate to the
    <a href="https://grs.studiesabroad.com/tools/" target="_blank">GRS Tools</a>
    section. Then, click <a href="https://grs.studiesabroad.com/htmltemplate" target="_blank">"HTML Template Editor"</a>
    (shown below).
  </p>
  <img class='img-max-width' src="./assets/images/grs-help/grs-tools.png" alt="Location of the GRS HTML Template Editor.">
`];

grsHelpSteps[1] = ['2. Create a New Template', `
  <p>
    You should now be in the HTML Template Editor seeing a screen similar to
    that below. Click "New Template" at the top of the screen.
  </p>
  <img class='img-max-width' src="./assets/images/grs-help/template-landing.png" alt="Initial screen of the GRS HTML Template Editor.">
  <p>
    You should now see the screen below. Click "Standar Email" to begin creating
    your template shell.
  </p>
  <img class='img-max-width' src="./assets/images/grs-help/new-template.png" alt="Creating a Standar Email">
`];

grsHelpSteps[2] = ['3. Complete Template Settings', `
  <p>
    You are now ready to begin creating your template. You will see a screen
    like the one below. Fill out the information as laid out below:
  </p>
  <dl>
    <dt>Template Name</dt>
    <dd>
      Choose a descriptive name for your email. This is for internal use only
      and won't be visible to anyone receiving the email.
    </dd>
    <dt>Business Division</dt>
    <dd>Choose the appropriate business division (ISA, WSISACP, etc).</dd>
    <dt>Category</dt>
    <dd>
      Choose the appropriate category (Interested Student, Admissions Email, etc).
      Please note that different categories may have additional options in this
      section (eg. Admissions Email have a subcategory option). Choose the options
      best suited to your use case.
    </dd>
    <dt>Include Unsubscribe Link</dt>
    <dd>Choose "Yes" - <strong>Always</strong> choose Yes.</dd>
    <dt>Teplate Width (px)</dt>
    <dd>Type in "600". It defaults to 650 but the format works best at 600px.</dd>
    <dt>Template Status</dt>
    <dd>Choose "Active".</dd>
    <dt>When to Send</dt>
    <dd>Choose the most appropriate option. In general, this will be "Manual".</dd>
    <dt>Email To</dt>
    <dd>Again, choose the most appropriate option. In general, this will be "Primary Email".</dd>
  </dl>
  <p>
    Your setting should now look something like the image below. You now move on
    to the next step. Click on "Header" at the top. Do <strong>not</strong> click "Save".
    </p>
  <img class='img-max-width' src="./assets/images/grs-help/template-settings.png" alt="Initial template settings">
`];

grsHelpSteps[3] = ['4. Add Email Headers', `
  <p>
    Headers are what keeps our HTML emails uniform and identifiable. As such,
    it is important that we include them on every email we send. After clicking
    "Header" at the top, you will be brought to a screen with several check boxes.
    Check the boxes so your settings look like the image below:
  </p>
  <img class='img-max-width' src="./assets/images/grs-help/header-options.png" alt="Appropriate header options">
  <p>
    Ensure "Use General Header?" and "Use General Footer?" are both checked. Once
    you check "Use General Header?" you will be presented with options for
    choosing the Google Campaign Name, Campaign Source, and Campaign Medium. These
    are used by marketing to track the success of email campaigns. You should
    coordinate with the marketing department to determine the best values of these
    fields for your email.
  </p>
  <p>
    Once your settings look similar to those above, move on to the next step by
    clicking "Content" at the top of the page. Do <strong>not</strong> click "Save".
  </p>
`];

grsHelpSteps[4] = ['5. Finish the Template Shell', `
  <p>
    Clicking "Content" at the top of the page will bring you to the standard
    interface for adding content to your email. This is the interface we are
    circumventing by using the ISA Easy Email Generator. However, we still need
    to use it actually insert our generated content into the email in GRS.
  </p>
  <p>Start by filling out the Email Subject, Preview, and Title fields as follows:</p>
  <dl>
    <dt>Email Subject</dt>
    <dd>This is the subject of your email. Your subject should be captivating but concise.</dd>
    <dt>Email Preview</dt>
    <dd>
      This is the small blurb displayed to recipients in their email client
      before actually opening the email. You should write a sentence or two here
      which summarizes your email and/or entices your recipient to open your email.
    </dd>
    <dt>Email Title</dt>
    <dd>
      In general, leave this blank. This will insert a large title at the very
      beginning of your email (before even the header).
    </dd>
  </dl>
  <p>
    To finish your template shell, you should enter a word or two in the "Body"
    section. This will allow you to finally click that "Save" button and have
    GRS save your email template. Remember the template title so you can find it
    later.
  </p>
`];

grsHelpSteps[5] = ['6. Insert Your Content', `
  <p>
    Once your Template Shell is created in GRS, you are ready to compose your
    email in the ISA Easy Email Generator. To do this, simply press "Copy Code"
    in the ISA Easy Email Generator to copy the source code of the contents of
    your email. Then, navigate to the "Content" section of your Template Shell in
    GRS, click the "<>Source" button in the Body section, and paste your email
    in the body section (see image below). Click "Save" and your email's contents will be saved in
    GRS. Click "Preview" at the top to ensure your email has been successfully
    saved.
  </p>
  <img class='img-max-width' src="./assets/images/grs-help/insert-source.png" alt="Inserting source code into the GRS HTML Template Editor.">
`];

/*
#### ##     ##    ###     ######   ########    ##     ## ######## ##       ########
 ##  ###   ###   ## ##   ##    ##  ##          ##     ## ##       ##       ##     ##
 ##  #### ####  ##   ##  ##        ##          ##     ## ##       ##       ##     ##
 ##  ## ### ## ##     ## ##   #### ######      ######### ######   ##       ########
 ##  ##     ## ######### ##    ##  ##          ##     ## ##       ##       ##
 ##  ##     ## ##     ## ##    ##  ##          ##     ## ##       ##       ##
#### ##     ## ##     ##  ######   ########    ##     ## ######## ######## ##
*/


const imgHelpSteps = [];
imgHelpSteps[0] = ['1. Preparing to Add Your Image', `
  <p>
    Before you can add any images to your email, you must first decide where they
    are going to live. If you have found an image online (make sure it has a
    license allowing for commercial use!) you can choose to either just copy its
    address (right click > "Copy image address" or "Copy Image Location") and
    paste it into the ISA Easy Email Generator. If you have an image saved to
    your computer, it needs to be uploaded it to the ISA server. To do so, you must
    first create a template shell in GRS's HTML Template editor. See the
    "GRS Help" section to learn how to do this.
  </p>
  <p>
    Once you have created your template shell, you will need to navigate to the
    "Content" section of your template shell. From here, click the "Image" button
    in the editor control panel (see below) to launch the Image Properties editor.
  </p>
  <img class="img-max-width" src="assets/images/img-help/add-image-btn.png" alt="Location of the Image button in the GRS HTML Template Editor.">
`];

imgHelpSteps[1] = ['2. Uploading Your Image to the ISA Server', `
  <p>
    You should now see a window like that below. Click the "Browse Server" button
    to launch the server file browser.
  </p>
  <img class="img-max-width" src="./assets/images/img-help/image-properties-browse.png" alt="The Image Properties box.">
  <p>
    The File Browser (see below) functions similarly to that on Windows or Mac.
    Choose the best folder in which to store your image, then click "Upload" in
    the upper-left to upload your image. Once it has been uploaded, double click
    it to select it and return to the "Image Properties" window.
  </p>
  <img class="img-max-width" src="./assets/images/img-help/file-browser.png" alt="GRS's image file browser">
`];

imgHelpSteps[2] = ['3. Copying the Image URL', `
  <p>
    The "Image Properties" box should now have the URL to your image in its URL
    box. Select the entire URL and copy it. You will paste this into the ISA
    Easy Email Generator. Once you have copied the URL, click "Cancel" to close
    the Image Properties window. You can now return to the ISA Easey Email Generator
    to paste your image URL. You do not need to do anything else for your image
    in GRS.
  </p>
  <img class="img-max-width" src="./assets/images/img-help/copy-url.png" alt="Copying the image URL from the Image Properties window">
`];

/*
######## ##     ## ########   #######  ########  ########
##        ##   ##  ##     ## ##     ## ##     ##    ##
##         ## ##   ##     ## ##     ## ##     ##    ##
######      ###    ########  ##     ## ########     ##
##         ## ##   ##        ##     ## ##   ##      ##
##        ##   ##  ##        ##     ## ##    ##     ##
######## ##     ## ##         #######  ##     ##    ##
*/


// Wraps each step in a div and returns it to the new array.
function wrapHelpSteps(step) {
  const ctn = document.createElement('div');
  const innerCtn = document.createElement('div');
  const heading = document.createElement('h2');
  ctn.appendChild(heading);
  ctn.appendChild(innerCtn);
  [heading.textContent, innerCtn.innerHTML] = step;
  ctn.classList.add('max-35');
  return ctn;
}

export const GRSHelpSteps = grsHelpSteps.map(wrapHelpSteps);
export const IMGHelpSteps = imgHelpSteps.map(wrapHelpSteps);
