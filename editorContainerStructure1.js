'use stric'
function EditorStructure(obj) {
    var _header = obj.header;
    var _mainBody = obj.mainBody;
    var _footer = obj.footer;
    var _returnHead = false;
    var _returnBody = false;
    var _optionArray = [];

    if (obj && typeof obj === 'object') {
        // if(validateObj(obj)){
        //     init();
        // }
        init();
    } else {
        throw new Error('not an onject');
    }

    // function validateObj(obj) {
    //     //check obj has alleast 3 keys
    //     //maximum 3 keys (header, body, footer)
    //     //minimum 2 keys (header, body)
    //     if(Object.keys(obj).length < 2 || Object.keys(obj).length > 3){
    //         throw new Error("missing parameters...");
    //     }

    //     //check all three key is object
    //     Object.keys(obj).forEach(function(key){
    //         if (typeof key !== 'object' && !obj[key] && obj[0] !== 'header' && obj[1] !== 'mainBody' ) {
    //             throw new Error("required parameters is not provided...");
    //         }
    //         console.log(obj[0]);
    //         if(!obj[0].name){
    //             obj[0].name = 'EditorMenu';
    //         }
    //     });

    //     return obj;
    // }

    function init() {
        createStructure();
    }

    function createStructure() {
        if (typeof _header === 'object') {
            _returnHead = createHeader(_header);
        }
        if (typeof _mainBody === 'object') {
            _returnBody = createMainBody(_mainBody);
        }
        if (typeof _footer === 'object') {
            createFooter(_footer);
        }
    }

    function createMainBody(bodyObj){
        var _mainEditorBody = document.createElement('div');
        _mainEditorBody.classList.add('mainBody');
        var _opt = bodyObj.options
        for(var x=0; x < _opt.length; x++){
            var _options = document.createElement('div');
            _options.setAttribute('class', 'cursorPointer');
            var _optionsIconContainer = document.createElement('span');
            _optionsIconContainer.setAttribute('class', 'iconContainer');
            var _optionsIconEl = document.createElement('i');
            _optionsIconEl.setAttribute('aria-hidden', 'true');
            _optionsIconEl.setAttribute('class', _opt[x].icon);
            _optionsIconContainer.appendChild(_optionsIconEl);
            _options.appendChild(_optionsIconContainer);
            var _optionsText = document.createElement('span');
            _optionsText.innerText = _opt[x].name;
            _options.appendChild(_optionsText);

            if(_opt[x].instance){
                new _opt[x].instance.instanceClass(_options, _opt[x].instance.parameters[1]);
            }
            
            //push options to array
            _optionArray.push(_options);
            //append to main body
            _mainEditorBody.appendChild(_options);
        }
        return {
            optArray :  _optionArray,
            mainEditorBody : _mainEditorBody
        }
    }

    function createHeader(headObj) {
        var _activitiOnClose = headObj.action;
        var _header = document.createElement('div');
        var _head = document.createElement('span');
        var _closeBtn = document.createElement('span');
        var _crossSymbol = document.createElement('a');

        _header.setAttribute('class', 'editorHeader');
        _crossSymbol.classList.add('close-thin');
        if (!headObj.event) {
            _crossSymbol.setAttribute('onclick', _activitiOnClose);
        }
        _closeBtn.classList.add('closeBtnContainer');
        _head.classList.add('elName');
        _head.innerText = headObj.name;
        _closeBtn.appendChild(_crossSymbol);
        _header.appendChild(_head);
        _header.appendChild(_closeBtn);
        return {
            header: _header,
            headName: _head,
            closeBtn: _closeBtn
        }
    }

    return {
       header: _returnHead,
       mainBody : _returnBody
    };

}