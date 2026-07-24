# Sam & Madison Wedding Website

## Quick preview
Open `index.html` in a browser.

## Edit the content
Open `settings.js`. Names, dates, venue details, maps, registry links, travel text, and the RSVP deadline are all stored there.

## Replace photos
- Homepage and gallery: `assets/images/engagement.jpg`
- Proposal image: `assets/images/don-cesar.png`

Keep the same filenames and upload the replacements to avoid changing code.

## Make RSVP submissions arrive by email
1. Create a free account at Formspree.
2. Create a form and copy its endpoint, such as `https://formspree.io/f/abcxyz`.
3. Paste that URL between the quotation marks beside `formAction` in `settings.js`.
4. Commit/upload the changed file.

Until that endpoint is added, the RSVP form downloads a text file on the guest's device so the site can be tested without losing their answers.

## Publish with GitHub Pages
1. Create a new public GitHub repository, for example `newtons-wedding`.
2. Upload everything inside this folder. `index.html` must be at the top level.
3. Open repository **Settings**.
4. Select **Pages** in the left sidebar.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Choose branch **main**, folder **/(root)**, then click **Save**.
7. Wait about 1–3 minutes. GitHub will display your public URL.

Your URL should resemble:
`https://YOUR-USERNAME.github.io/newtons-wedding/`

## Update the website later
Upload the changed file to the same repository and commit it. GitHub Pages will republish automatically.
