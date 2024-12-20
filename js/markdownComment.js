window.addEventListener("load", function(){
    
    setTimeout(function() { // give a delay for other plugin inserting DOM on onload events
        // -------------------------------------------
        // DEFAULT INPUT AND OUTPUT AREA
        
        let textarea = document.querySelector("#id_content");
        
        textarea.insertAdjacentHTML(
            "beforebegin",
            `<div id="editor"><div id="markdown-editor">
            <div id="toolbar">
            <i id="undo-btn" class="disabled fa fa-rotate-left"></i>
            <i id="redo-btn" class="disabled fa fa-rotate-right"></i>
            <i id="eraser" class=" disabled fa fa-eraser"></i>
            <hr>
            <i id="heading1" class="fa fa-header">1</i>
            <i id="heading2" class="fa fa-header">2</i>
            <i id="heading3" class="fa fa-header">3</i>
            <i id="heading4" class="fa fa-header">4</i>
            <i id="heading5" class="fa fa-header">5</i>
            <i id="heading6" class="fa fa-header">6</i>
            <i id="hr" class="fa fa-header">r</i>
            <hr>
            <i id="paragraph" class="fa fa-paragraph"></i>
            <hr>
            <i id="link" class="fa fa-link"></i>
            <i id="img" class="fa-regular fa-images"></i>
            <hr>
            <i id="bold" class="fa fa-bold"></i>
            <i id="italic" class="fa fa-italic"></i>
            <i id="del" class="fa-solid fa-strikethrough"></i>
            <hr>
            <i id="list-ul" class="fa fa-list-ul"></i>
            <i id="list-ol" class="fa fa-list-ol"></i>
            <hr>
            <i id="inlinecode" class="fa fa-code"></i>
            <i id="code" class="fa-regular fa-xl fa-file-code"></i>
            <hr>
            <i id="quote" class="fa fa-quote-left"></i>
            <i id="table" class="fa fa-table"></i>
            <hr>
            <i id="htmlsrc" class="fa fa-laptop-code"></i>
            <hr>
            <label><i class="fa fa-xl fa-eye"></i><input id="previewBox" checked type="checkbox"></label>
            <hr>
            <hr>
            <i id="editor-mode" title="full-page" class="fa fa-2x fa-expand"></i>
            </div>
            <div id="in-out-put">
            <div id="html-preview"></div>
            <div id="html-src" class="discret">
            <pre><code class="language-xml"></code></pre>
            </div>
            </div>
            <div style="position:absolute;right:0;bottom:0rem;color:white"><span id="undoSteps">undo: 0 </span> <span id="redoSteps">redo: 0 </span> <span id="used">Characters: 0 </span></div>
            </div></div>`
        );
        
        // Get references to the elements.
        //const textarea = document.getElementById("markdown-content");
        const htmlPreview = document.getElementById("html-preview");
        const HTMLview = document.querySelector("#html-src >pre>code");
        // toolbar editor
        
        const paragraphButton = document.querySelector("#paragraph");
        const heading1Button = document.querySelector("#heading1");
        const heading2Button = document.querySelector("#heading2");
        const heading3Button = document.querySelector("#heading3");
        const heading4Button = document.querySelector("#heading4");
        const heading5Button = document.querySelector("#heading5");
        const heading6Button = document.querySelector("#heading6");
        const hrButton = document.querySelector("#hr");
        const linkButton = document.querySelector("#link");
        const imgButton = document.querySelector("#img");
        const boldButton = document.querySelector("#bold");
        const italicButton = document.querySelector("#italic");
        const delButton = document.querySelector("#del");
        const ulButton = document.querySelector("#list-ul");
        const olButton = document.querySelector("#list-ol");
        const codeButton = document.querySelector("#code");
        const inlineCodeButton = document.querySelector("#inlinecode");
        const quoteButton = document.querySelector("#quote");
        const tableButton = document.querySelector("#table");
        const undoButton = document.querySelector("#undo-btn");
        const redoButton = document.querySelector("#redo-btn");
        const eraseButton = document.querySelector("#eraser");
        const HTMLsrcButton = document.querySelector("#htmlsrc");
        
        // Event listeners
        textarea.addEventListener("input", function () {
            // Convert Markdown to HTML.
            const htmlContent = marked.parse(textarea.value);
            // Sanitize the generated HTML and display it.
            htmlPreview.innerHTML = DOMPurify.sanitize(htmlContent,{USE_PROFILES: { html: true}
            });
        });
        document.getElementById("previewBox").addEventListener("change", function () {
            HTMLview.closest("div").classList.add("discret");
            redoundoShow();
            updatePreview();
        });
        
        document.getElementById("editor-mode").addEventListener("click", function () {
            // Toggle the presence of the class "distraction-free" on the element with the id "editor".
            document.getElementById("editor").classList.toggle("distraction-free");
        });
        // actions
        paragraphButton.addEventListener("click", () =>insertText(textarea, "\r\r", "paragraph", 2, 11));
        inlineCodeButton.addEventListener("click", () =>insertText(textarea, "``", "code", 1, 5));
        codeButton.addEventListener("click", () =>insertText(textarea, "\r~~~\r \r~~~", "code", 5, 10));
        heading1Button.addEventListener("click", () =>insertText(textarea, "# \r", "heading1", 2, 11));
        heading2Button.addEventListener("click", () =>insertText(textarea, "## \r", "heading2", 3, 12));
        heading3Button.addEventListener("click", () =>insertText(textarea, "### \r", "heading3\r", 4, 13));
        heading4Button.addEventListener("click", () =>insertText(textarea, "#### \r", "heading4\r", 5, 14));
        heading5Button.addEventListener("click", () =>insertText(textarea, "##### \r", "heading5\r", 6, 15));
        heading6Button.addEventListener("click", () =>insertText(textarea, "###### \r", "heading6\r", 7, 16));
        hrButton.addEventListener("click", () =>insertText(textarea, "---", "\r", 5, 4));
        linkButton.addEventListener("click", () =>insertText(textarea, "[]( URL )", " link ", 1, 7));
        imgButton.addEventListener("click", () =>insertText(textarea, "![]( URL )", "alt image", 2, 11));
        boldButton.addEventListener("click", () =>insertText(textarea, "****", "bold", 2, 6));
        italicButton.addEventListener("click", () =>insertText(textarea, "**", "italic", 1, 7));
        delButton.addEventListener("click", () =>insertText(textarea, "~~", "strikethrough", 1, 14));
        ulButton.addEventListener("click", function () {insertText(textarea, "* \r", "item\r", 2, 6);});
        olButton.addEventListener("click", () =>insertText(textarea, "1. \r", "item\r", 3, 7));
        quoteButton.addEventListener("click", () =>insertText(textarea, "> \r", "blockquote", 2, 12));
        HTMLsrcButton.addEventListener("click", function () {
            HTMLview.closest("div").classList.toggle("discret");
            viewHtmlSrc();
            hljs.highlightAll();
            hljs.initHighlighting.called = false;
            redoundoShow();
        });
        tableButton.addEventListener("click", () =>insertText(textarea,"\r| th | th |\r| :-- | :-- |\r| td | td |\r","| td | td |\r\n",39,-1));
        
        
        textarea.addEventListener("input", function () {
            document.querySelector("#used").textContent =
            "Characters: " + this.value.length;
            //console.log(this.value)
        });
        
        // show me my art
        function updatePreview() {
            // Convert Markdown to HTML.
            const htmlContent = marked.parse(textarea.value);
            // Sanitize the generated HTML and display it.
            htmlPreview.innerHTML = DOMPurify.sanitize(htmlContent, {
                USE_PROFILES: { html: true }
            });
            document.querySelector("#used").textContent="Characters: "+ textarea.value.length;
            hljs.highlightAll();
        }
        // insert capture state
        function insertText(textarea,syntax,placeholder,selectionStart = 0,selectionEnd = 0) {
            // Current Selection
            const currentSelectionStart = textarea.selectionStart;
            const currentSelectionEnd = textarea.selectionEnd;
            const currentText = textarea.value;
            let textLength = textarea.value.length;
            if (currentText.length < 1) textarea.value = "\n";
            captureMemento();
            if (currentSelectionStart === currentSelectionEnd) {
                const textWithSyntax = (textarea.value=currentText.substring(0,currentSelectionStart)+syntax+currentText.substring(currentSelectionEnd));
                textarea.value=textWithSyntax.substring(0,currentSelectionStart+selectionStart)+placeholder+textWithSyntax.substring(currentSelectionStart+selectionStart);
                textarea.focus();
                textarea.selectionStart = currentSelectionStart + selectionStart;
                textarea.selectionEnd = currentSelectionEnd + selectionEnd;
                textLength += (textWithSyntax.substring(0, currentSelectionStart + selectionStart)+placeholder+textWithSyntax.substring(currentSelectionStart + selectionStart)).length;
                } else {
                const selectedText = currentText.substring(currentSelectionStart,currentSelectionEnd);
                const withoutSelection =currentText.substring(0, currentSelectionStart)+currentText.substring(currentSelectionEnd);
                const textWithSyntax =withoutSelection.substring(0, currentSelectionStart)+syntax+withoutSelection.substring(currentSelectionStart);
                // Surround selected text
                textarea.value =textWithSyntax.substring(0, currentSelectionStart + selectionStart)+selectedText+textWithSyntax.substring(currentSelectionStart + selectionStart);
                textarea.focus();
                textarea.selectionEnd =currentSelectionEnd+selectionStart+selectedText.length;
                textLength += (textWithSyntax.substring(0, currentSelectionStart + selectionStart)+selectedText+textWithSyntax.substring(currentSelectionStart + selectionStart)).length;
            }
            document.querySelector("#used").textContent ="Characters: " + textarea.value.length;
            document.querySelector("#eraser").classList.remove("disabled");
        }
        
        /////////////////////
        // redo/undo function
        const undoStack = [];
        const redoStack = [];
        const empty = Array().fill("");
        // storing steps
        const undo = () => {
            const prevMemento = redoStack.push(textarea.value);
            const lastMemento = undoStack.pop();
            
            // reinstate the program state from memento
            if (lastMemento) textarea.value = lastMemento;
            
            const stack = lastMemento;
            updateUI(stack);
        };
        const redo = () => {
            const lastMemento = undoStack.push(textarea.value);
            const prevMemento = redoStack.pop();
            // reinstate the program state from memento
            if (prevMemento) textarea.value = prevMemento;
            
            const stack = prevMemento;
            updateUI(stack);
        };
        // do it
        const captureMemento = () => {
            // the memento is just the value of the textarea!
            const memento = textarea.value;
            undoStack.push(memento);
            redoStack.push(memento);
            updateUI();
        };
        
        // trigger undo/redo actions
        undoButton.addEventListener("click", () => undo());
        redoButton.addEventListener("click", () => redo());
        
        // on undo/redo actions to perform
        const updateUI = (stack) => {
            //  console.log('undo:' + undoStack.length + ' redo:'+redoStack.length)
            document.querySelector("#undoSteps").textContent =
            "undo: " + undoStack.length;
            document.querySelector("#redoSteps").textContent =
            "redo: " + redoStack.length;
            
            if (undoStack.length) undoButton.classList.remove("disabled");
            else undoButton.classList.add("disabled");
            
            if (redoStack.length && redoStack.length != undoStack.length)
            redoButton.classList.remove("disabled");
            else redoButton.classList.add("disabled");
            
            if (textarea.value.length <= 1) eraseButton.classList.add("disabled");
            else eraseButton.classList.remove("disabled");
            textarea.focus();
            updatePreview();
        };
        function redoundoShow() {
            if (HTMLview.closest("div").matches(".discret")) {
                undoButton.classList.remove("disabled");
                redoButton.classList.remove("disabled");
                } else {
                undoButton.classList.add("disabled");
                redoButton.classList.add("disabled");
            }
        }
        
        // record action on  keystrike
        // ?? okay, but what am i gonna do with theses
        textarea.addEventListener("keydown", () => captureMemento());
        eraseButton.addEventListener("click", function () {
            captureMemento();
            textarea.value = "";
            textarea.focus();
            this.classList.toggle("disabled");
        });
        
        //exclude from history  ctrl key striked  beta!
        textarea.addEventListener("keydown", function (e) {
            if (e.ctrlKey) {
                undoStack.pop();
                undoStack.push(textarea.value + " ");
            }
        });
        // copy/paste/cut ???
        textarea.addEventListener("paste", function (event) {
            console.log(
                "paste: \r" + event.clipboardData.getData("text/plain") + getSelection()
            );
        });
        textarea.addEventListener("copy", function (event) {
            console.log(event.type + "\r" + getSelection());
        });
        textarea.addEventListener("cut", function (event) {
            console.log(event.type + "\r" + getSelection());
        });
        
        
        function getSelection() {
            const currentSelectionStart = textarea.selectionStart;
            const currentSelectionEnd = textarea.selectionEnd;
            const currentText = textarea.value;
            const selectedText = currentText.substring(currentSelectionStart,currentSelectionEnd);
            return selectedText;
        }
        // view HTML src
        function viewHtmlSrc() {
            HTMLview.innerHTML = escapeHtml(htmlPreview.innerHTML);
        }
        // turn HTML brackets into entities (add more if needed)
        function escapeHtml(text) {
            var map = {"<": "&lt;",">": "&gt;"};
            return text.replace(/[<>]/g, function (m) {
                return map[m];
            });
        }
        
        document.querySelector("#in-out-put").appendChild(textarea);
    }, 1000);
    
    for (let e of document.querySelectorAll(
        ".lastcom-list a, .comment blockquote, .content_thread , .main_subject div "
    )) {
    if (e.getElementsByTagName("p")[0]) {
        let p = e.getElementsByTagName("p")[0];
        let br = e.getElementsByTagName("br")[0];
        let pCnt = e.getElementsByTagName("p")[0].innerHTML;
        e.removeChild(p);
        e.innerHTML = pCnt + e.innerHTML;
    }
    // Convert Markdown to HTML.
    const htmlContent = marked.parse(e.innerHTML).replace(/&amp;l/g, '&l').replace(/&amp;g/g, '&g').replace(/&amp;0/g, '&#0');
    // Sanitize the generated HTML and display it.
    e.innerHTML =  DOMPurify.sanitize(htmlContent, {
        USE_PROFILES: { html: true }
    }); 
    hljs.highlightAll();
    }
});