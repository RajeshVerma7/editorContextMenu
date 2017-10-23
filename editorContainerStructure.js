// (function (object) {

function EditorStructure(obj) {    
    this.header = obj.header;
    this.mainBody = obj.mainBody;
    this.footer = obj.footer;
    this.returnHead = false;
    this.createStructure = this.createStructure.bind(this);
    this.EditorContainer = this.EditorContainer.bind(this);
    this.createHeader = this.createHeader.bind(this);
    // this.createMainBody = this.createMainBody.bind(this);
    // this.createFooter = this.createFooter.bind(this);
    this.createStructure();
}

EditorStructure.prototype.createStructure = function () {
    if (typeof this.header === 'object') {
        this.returnHead = this.createHeader(this.header);
    }
    // if (typeof this.mainBody === 'object') {
    //     this.createMainBody(this.mainBody);
    // }
    // if (typeof this.footer === 'object') {
    //     this.createFooter(this.footer);
    // }
    if (this.returnHead) {
        this.EditorContainer(this.returnHead);
    }
}

EditorStructure.prototype.EditorContainer = function (returnHead) {
    var _container = document.createElement('div');
    _container.setAttribute('class', 'nvEditorContainer');
    _container.appendChild(returnHead.header);
    document.body.appendChild(_container);
}

EditorStructure.prototype.createHeader = function (headObj, closeFunc) {
    var _activitiOnClose = 'nvABTest.removeEditorMenu(true)';
    var _header = document.createElement('div');
    var _head = document.createElement('span');
    var _closeBtn = document.createElement('span');
    var _crossSymbol = document.createElement('a');

    _header.setAttribute('class', 'editorHeader');
    _crossSymbol.classList.add('close-thin');
    if (!closeFunc) {
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
        head: _head,
        closeBtn: _closeBtn
    }
}

    // if (object && typeof object === 'object') {
        // return new EditorStructure(object);
    // } else {
        // throw new Error('not an onject');
    // }
// })(moduleObj.option);