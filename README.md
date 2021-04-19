> This repository is an internal fork of [bluebutton.js](https://github.com/blue-button/bluebutton.js)

BlueButton.js helps developers parse and generate complex health data formats like C-CDA with ease, so you can empower patients with access to their health records.

## Quick Start

BlueButton.js supports a few different health data types, like C32 and CCDA. To parse a health document, pass the source data to `BlueButton`:

```JavaScript
var myRecord = BlueButton(xml);
```

BlueButton.js will detect the document type and choose the appropriate parser. The returned object has the following properties:

```JavaScript
myRecord.type    // The document type
myRecord.source  // The parsed source data with added querying methods
myRecord.data    // The final parsed document data
```

## Detailed Documentation

[View the documentation](http://blue-button.github.io/bluebutton.js/docs) for an explanation of the data sections, much more detailed sample code, instructions on how to generate a build, etc.

## Kno2 Updates

There are a number of pre parsed sections for CCDA and C32 documents.  In the orignal bluebutton.js the section name was a key off of
the data object containing an array of entries. Those sections now contain an object vs an array with the following properties.

```
{
  displayName: "friendly display name",
  templateId: "",
  text: "<div>Some HTML for section</div>",
  entries: []
}
```

1. **displayName** - Friendly name to display in viewer.
2. **templateId** - The HL7 templateId for the section. This currently isn't filled for the pre parsed sections such as allergies, medications, etc. For any generically created section, there will be a template id.
3. **text** - the narrative text (generally HTML) for each section.  All the objects on data outside of demographics, document and smoking status should have this value set.  We can default to displaying this HTML if there is no custom section display.
4. **entries** - the original array of entries

### Generic sections

We've also modified BlueButton.js to include generic sections.  These are sections where a specific templateId isn't present in section mapping function for c32, ccd, etc.  Generic sections only parse out narrative text, displayName and templateId.
this gave us the ability to still display and filter on a section that wasn't explicitly added in the BlueButton library.
