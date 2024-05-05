var tskorder = 0;

function ctrlWin(winId, mode) {
    win = document.getElementById(winId);
    tsk = document.getElementById('tsk-' + winId);

    if (mode === "min") {
        win.style.display = "none"; 
        tsk.classList.add("out"); tsk.classList.remove("in");
    }

    if (mode === "cls") {
        win.style.display = "none"; 
        tsk.style.display = "none"; 
    }
    if  (mode === "tgl") {
        if (win.style.display === "" || win.style.display === "none") {
            win.style.display = "flex" 
            tsk.classList.add("in"); tsk.classList.remove("out");
        } else {
            win.style.display = "none" 
            tsk.classList.add("out"); tsk.classList.remove("in");
        }
    }
    if (mode === "lch") {
        if (win.style.display === "" || win.style.display === "none") {
            win.style.display = "flex" 
            tsk.style.display = "flex";
            tsk.classList.add("in"); tsk.classList.remove("out");
            tsk.style.order = ++tskorder;
            classWin(win.id);
            mainTsk();
        }
    }
    if (mode === "sch") {
        if (win.style.display !== "none" || win.style.display !== "") {
            tsk.classList.add("in"); tsk.classList.remove("out");
        }   
        if (win.style.display === "none" || win.style.display === "") {
            win.style.display = "flex";
        }
        classWin(win.id);
        mainTsk();
    }
}

function ctrlPic(locId) {
    document.getElementById("player-main").style.background = `url(pic/${locId}.jpg)`;
    ctrlWin("player", "lch");
}

var windows = document.querySelectorAll('.win');

windows.forEach(function(win) {
    var titleBar = win.querySelector('#win-title');
    dragElement(titleBar, win);
});

function dragElement(titleBar, window) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    titleBar.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        classWin(window.id);
        mainTsk();
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        window.style.top = (window.offsetTop - pos2) + "px";
        window.style.left = (window.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function classWin(winId) {
    var win = document.getElementById(winId); 
    var tit = win.querySelector("#win-title");

    win.style.zIndex = 5;
    tit.style.backgroundColor = "var(--blue)";

    var allwin = document.getElementsByClassName("win");
    for (var i = 0; i < allwin.length; i++) {
        if (allwin[i] !== win) {
            allwin[i].style.zIndex = 1;
            var othertit = allwin[i].querySelector("#win-title");
            if (othertit) {
                othertit.style.backgroundColor = "var(--lrey)";
            }
        }
    }
}

function hearTsk(winId) {
    var win = document.getElementById(winId); 
    var tsk = document.getElementById('tsk-' + winId);

    if (win.style.zIndex === "5") {
        tsk.classList.add("in"); tsk.classList.remove("out");
    } else {
        tsk.classList.add("out"); tsk.classList.remove("in");
    }
}

function mainTsk() {
    hearTsk('about'); hearTsk('mail');
    hearTsk('photos'); hearTsk('player');
}

function timeRun() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const meridiem = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; 

    const timeRun = document.getElementById('clock');
    timeRun.textContent = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${meridiem}`;
}

setInterval(timeRun, 1000);
timeRun();

function closeCard(cardId) {
    document.getElementById(cardId).style.display = "none";
}

function ctrlMail() {
    var error = document.getElementById('error');
    var success = document.getElementById('success');
    var send = document.getElementById('send');
    var wipe = document.getElementById('wipe');
    var from = document.getElementById('from');
    var subject = document.getElementById('subject');
    var message = document.getElementById('message');
    var header = document.getElementById('header');

    var params = {
        from: from.value,
        subject: subject.value,
        message: message.value
    };

    header.textContent = subject.value || "New Message";

    function wipeForm() {
        from.value = "";
        subject.value = "";
        message.value = "";
        header.textContent = "New Message";
    }

    wipe.onclick = function() {
        wipeForm();
    };

    send.onclick = function() {
        if (from.value != "" && subject.value != "" && message.value != "") {
            emailjs.send('service_nkhhtvv', 'template_7kr1pac', params);
            success.style.display = "flex";
            wipeForm();
        } else {
            error.style.display = "flex";
        }
    };
}

addEventListener('input', ctrlMail);
