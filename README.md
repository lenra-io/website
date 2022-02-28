# Landing Page

Lenra's landing page

## I18n
To manage internationalization, we will generate the translated at build time.

For each file in the [src directory](src/) and it subdirectories we check if the has replaceable content: `{{my_key}}`

If the file has some, we replace it with each language translation files and save it to the language directory.
If not, we copy it to the `common` directory.

The languages are defined by the JSON files in the i18n folder. The files prefixed with a dot (`.`) will be ignored.