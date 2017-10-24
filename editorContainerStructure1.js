'use stric'
function EditorStructure(obj) {
    var _header = obj.header;
    var _mainBody = obj.mainBody;
    var _footer = obj.footer;
    var _returnHead = false;
    var _returnBody = false;
    var _returnfooter = false;
    var _optionArray = [];
    var _footerBtnArray = [];

    if (obj && typeof obj === 'object') {
        if(validateObj(obj)){
            init();
        }
    } else {
        throw new Error('not an onject');
    }

    function validateObj(obj) {
        var objKeyArray = Object.keys(obj);
        //check obj has alleast 3 keys
        //maximum 3 keys (header, body, footer)
        //minimum 2 keys (header, body)
        if(objKeyArray.length < 1 || objKeyArray.length > 3){
            throw new Error("missing parameters...");
        }

        //check all three key is object
        objKeyArray.forEach(function(key){
            if (typeof key !== 'object' && !obj[key]) {
                throw new Error("required parameters is not provided...");
            }
        });
        if(objKeyArray.indexOf('header') === -1){
            if(objKeyArray.indexOf('mainBody') === -1){
                if(objKeyArray.indexOf('footer') === -1){
                    throw new Error("missing parameters...");
                }
            }
        }
        
        return obj;
    }

    function init() {
        if (typeof _header === 'object') {
            _returnHead = createHeader(_header);
        }
        if (typeof _mainBody === 'object') {
            _returnBody = createMainBody(_mainBody);
        }
        if (typeof _footer === 'object') {
            _returnfooter = createFooter(_footer);
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

    function createFooter(footerObj){
        var _footer = document.createElement('div');
        _footer.classList.add('nvEditor-footer');
    
        for(var x in footerObj){
            var _button = document.createElement('button');
            _button.classList.add('nvEditor-btn');
            _button.innerText = footerObj[x].name;

            if(Object.keys(footerObj[x]).includes('event') && footerObj[x].event){
                console.log(footerObj[x].event.event);
                _button.addEventListener(footerObj[x].event.event, footerObj[x].event.action);
            }
            //push _button to array
            _footerBtnArray.push(_button);
            //append to footer
            _footer.appendChild(_button);
        }
        return {
            footerArray :  _footerBtnArray,
            footer : _footer
        }
    }

    return {
       header: _returnHead,
       mainBody: _returnBody,
       footer: _returnfooter
    };

}