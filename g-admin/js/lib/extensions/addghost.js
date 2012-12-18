(function () {

    var addghost = function (converter) {
        return [
            // (image) syntax
            { type: 'output', regex: '\\(image\\)', replace: '<div style="width: 100%;border: dashed #E2E2E2 6px;padding: 50px 50px;text-align: center;margin-bottom:10px"><h2>Drag image here, </h2><h2><input type="file">, or <input type="text" placeholder="Type a url"></h2></div>' },
            
            // caret placeholder
            { type: 'lang', regex: '\\%\\%caret\\%\\%', replace: '<span id="caret"></span>' }
        ];
    };

    // Client-side export
    if (typeof window !== 'undefined' && window.Showdown && window.Showdown.extensions) { window.Showdown.extensions.addghost = addghost; }
    // Server-side export
    if (typeof module !== 'undefined') module.exports = addghost;

}());