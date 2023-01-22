const addCrown = async () => {
    try {
        document.getElementById("addCrown").ariaBusy = "true";

        const player = document.getElementById("player").value;

        const uuid = await fetch(`https://playerdb.co/api/player/minecraft/${player}`).then(res => res.json());
        if (!uuid.success) {
            document.getElementById("player").value = "";
            document.getElementById("addCrown").ariaBusy = "false";
            openModal(document.getElementById("errorModal"))
            return;
        }

        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
        displayCanvas = document.getElementById("displayCanvas");
        dCtx = displayCanvas.getContext("2d");

        const drawCrown = () => {
            let crown = new Image();
            crown.crossOrigin = "anonymous";
            crown.onload = () => {
                ctx.imageSmoothingEnabled = false;
                dCtx.imageSmoothingEnabled = false;
                ctx.drawImage(crown, 0, 0);
                dCtx.drawImage(canvas, 0, 0, 128, skin.height === 32 ? 64 : 128);

                const downloadURL = canvas.toDataURL();
                document.getElementById("downloadLink").href = downloadURL;
                document.getElementById("download").style.visibility = "visible";
            };
            crown.src = "./assets/images/crown.png";
            document.getElementById("addCrown").ariaBusy = "false";

            if (skin.height === 32) {
                document.getElementById('download').style.marginBottom = "84px";
            } else {
                document.getElementById('download').style.marginBottom = "20px";
            }
        };

        let skin = new Image();
        skin.crossOrigin = "anonymous";
        skin.onload = () => {
            if (skin.height === 32) {
                canvas.width = 64;
                canvas.height = 32;
                displayCanvas.width = 128;
                displayCanvas.height = 64;
            } else {
                canvas.width = 64;
                canvas.height = 64;
                displayCanvas.width = 128;
                displayCanvas.height = 128;
            }

            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(skin, 0, 0);
            drawCrown();
        };
        skin.src = `https://crafatar.com/skins/${uuid.data.player.id}`;
    } catch (err) {
        console.log(err);
    };
};

const download = () => {
    const link = document.getElementById("downloadLink");
    link.click();
}

document.getElementById("addCrown").addEventListener("click", function(event) {
    if (document.getElementById("player").value !== "") {
        event.preventDefault()
        addCrown()
    }
});

// too lazy to do imports soo :/

/*
 * Modal
 *
 * Pico.css - https://picocss.com
 * Copyright 2019-2022 - Licensed under MIT
 */

// Config
const isOpenClass = 'modal-is-open';
const openingClass = 'modal-is-opening';
const closingClass = 'modal-is-closing';
const animationDuration = 400; // ms
let visibleModal = null;


// Toggle modal
const toggleModal = event => {
    event.preventDefault();
    const modal = document.getElementById(event.currentTarget.getAttribute('data-target'));
    (typeof (modal) != 'undefined' && modal != null)
        && isModalOpen(modal) ? closeModal(modal) : openModal(modal)
}

// Is modal open
const isModalOpen = modal => {
    return modal.hasAttribute('open') && modal.getAttribute('open') != 'false' ? true : false;
}

// Open modal
const openModal = modal => {
    if (isScrollbarVisible()) {
        document.documentElement.style.setProperty('--scrollbar-width', `${getScrollbarWidth()}px`);
    }
    document.documentElement.classList.add(isOpenClass, openingClass);
    setTimeout(() => {
        visibleModal = modal;
        document.documentElement.classList.remove(openingClass);
    }, animationDuration);
    modal.setAttribute('open', true);
}

// Close modal
const closeModal = modal => {
    visibleModal = null;
    document.documentElement.classList.add(closingClass);
    setTimeout(() => {
        document.documentElement.classList.remove(closingClass, isOpenClass);
        document.documentElement.style.removeProperty('--scrollbar-width');
        modal.removeAttribute('open');
    }, animationDuration);
}

// Close with a click outside
document.addEventListener('click', event => {
    if (visibleModal != null) {
        const modalContent = visibleModal.querySelector('article');
        const isClickInside = modalContent.contains(event.target);
        !isClickInside && closeModal(visibleModal);
    }
});

// Close with Esc key
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && visibleModal != null) {
        closeModal(visibleModal);
    }
});

// Get scrollbar width
const getScrollbarWidth = () => {

    // Creating invisible container
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement('div');
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
}

// Is scrollbar visible
const isScrollbarVisible = () => {
    return document.body.scrollHeight > screen.height;
}

