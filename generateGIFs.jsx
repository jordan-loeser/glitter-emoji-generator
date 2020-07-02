#include includes/json2.js
if (!Object.keys) {
    #include includes/objectKeysPolyfill.js
}

// Configuration
var emojiNamePrefix = "glitter-";

SaveGIF('output', 'test');

// Main Function
(function main() {
    // Get Document Information
    var frameGroup = app.activeDocument.layerSets.getByName("frames");
    var symbols = loadJSON("symbols.json");
    var symbolKeys = Object.keys(symbols);

    // For each symbol
    for(var i = 0; i < symbolKeys.length; i++) {
        var key = symbolKeys[i];
        var symbol = symbols[key];
        // For each GIF frame
        for(var j = 0; j < frameGroup.layers.length; j++) {
            var frame = frameGroup.layers[j];
            frame.textItem.contents = symbol;
        };
        // Export GIF
        SaveGIF('output', emojiNamePrefix + key);
    }

    if (app.activeDocument != null) {
        app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }

    alert('Operation complete!');
})();

function SaveGIF(outputFolderName, fileName) {
    var doc = app.activeDocument;
    var docPath = activeDocument.path.fullName;

    // Output Configuration
    var sfw = new ExportOptionsSaveForWeb();
    sfw.format = SaveDocumentType.COMPUSERVEGIF;
    sfw.transparency = true;

    // Check if output directory exist, if not create it
    var file = new File(docPath+"/"+outputFolderName+"/"+fileName+'.gif');
    var outputFolder = Folder(docPath+"/"+outputFolderName);
    if(!outputFolder.exists) outputFolder.create();

    doc.exportDocument(file, ExportType.SAVEFORWEB, sfw)
}

function loadJSON(relPath) {
    var script = new File($.fileName);
    var jsonFile = new File(script.path + '/' + relPath);

    jsonFile.open('r');
    var str = jsonFile.read();
    jsonFile.close();

    return JSON.parse(str);
}
