# Custom CrowdRiff Uploader for *#MyPandemicStory*

A custom uploader to replace CrowdRiff’s [default uploader](https://upload.crowdriff.com/mypandemicstory).

View the custom uploader in [English](https://projects.rom.on.ca/mypandemicstory/) and [French](https://projects.rom.on.ca/mypandemicstory/index-fr.html).

## Documentation

Basic documentation is available from [CrowdRiff’s support site](https://support.crowdriff.com/hc/en-us/articles/360026383854-How-to-Customize-Your-Collector-with-the-CrowdRiff-SDK). Essentially, you just need to set up a collector on the CrowdRiff web platform, fork the [template files](https://github.com/crowdriff/custom-public-uploader) provided by CrowdRiff, and add your public uploader ID (the “custom link” in the collector’s settings on the web platform) to the `id` attribute of the script tag on line 139 of `index.html`.

The information collected in the form can be stored in the uploaded item’s description field. You can change how this is formatted and what information you pass to CrowdRiff in the `uploader.setDescription()` function on line 96 of `app.js`. More information on the `uploader.js` script and its available methods is [available here](https://crowdriff.readme.io/docs/uploaderjs) (CrowdRiff account required to access these docs).