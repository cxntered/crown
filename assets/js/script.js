const warningAlert = (msg) => {
    document.getElementsByClassName("alert")[0].style.backgroundColor = "#ffaa2c";
    document.getElementsByClassName("alert")[0].style.visibility = "visible";
    document.getElementsByClassName("alert")[0].style.opacity = "1";
    document.getElementsByClassName("alert")[0].innerHTML = `<span class="closebtn" onclick="this.parentElement.style.opacity = '0'; setTimeout(function(){ this.parentElement.style.visibility = 'hidden'; }, 150)"> &times;</span><b>WARNING:</b> <br />${msg}`;
};

const errorAlert = (msg) => {
    document.getElementsByClassName("alert")[0].style.backgroundColor = "#f44336";
    document.getElementsByClassName("alert")[0].style.visibility = "visible";
    document.getElementsByClassName("alert")[0].style.opacity = "1";
    document.getElementsByClassName("alert")[0].innerHTML = `<span class="closebtn" onclick="this.parentElement.style.opacity = '0'; setTimeout(function(){ this.parentElement.style.visibility = 'hidden'; }, 150)"> &times;</span><b>ERROR:</b> <br />${msg}`;
};

if (window.matchMedia("(max-width: 480px)").matches) {
    warningAlert("We have detected that you may be on a mobile device or simply have a small screen. You can still use the website, but please know that this website is not fully optimized for mobile devices, meaning there might be more bugs than on a computer or simply bad UI/UX. Please use a desktop or laptop computer to get the full experience.");
};

const addCrown = async () => {
    try {
        document.getElementById("download").style.visibility = "hidden";

        const ign = document.getElementById("ign").value
        const skinFile = document.getElementById("skin-file").files[0];

        if (!ign && !skinFile) {
            return errorAlert("You have not inputted an IGN/UUID or a skin file!")
        }

        if (ign && !skinFile || ign && skinFile) {
            const uuid = await fetch(`https://playerdb.co/api/player/minecraft/${ign}`).then(res => res.json());
            if (!uuid.success) {
                return errorAlert("An error has occured. Make sure that you inputted the right IGN/UUID.")
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

                    const OwO = (uwu) => {
                        if (uwu.matches) {
                            document.getElementsByClassName("main")[0].style.height = "110vh";
                        } else {
                            document.getElementsByClassName("main")[0].style.height = "90vh";
                        }
                    }

                    var uwu = window.matchMedia("(max-height: 720px) and (max-width: 480px)");
                    OwO(uwu)
                    uwu.addListener(OwO)
                };
                crown.src = "./assets/images/crown.png";
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
        } else if (!ign && skinFile) {
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

                    const OwO = (uwu) => {
                        if (uwu.matches) {
                            document.getElementsByClassName("main")[0].style.height = "110vh";
                        } else {
                            document.getElementsByClassName("main")[0].style.height = "90vh";
                        }
                    }

                    var uwu = window.matchMedia("(max-height: 720px) and (max-width: 480px)");
                    OwO(uwu)
                    uwu.addListener(OwO)
                };
                crown.src = "./assets/images/crown.png";
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
            }
            skin.src = URL.createObjectURL(skinFile);
        }
    } catch (err) {
        console.log(err);
        errorAlert("An error has occured. <a class=\"alertLink\" href=\"https://balsamiq.com/support/faqs/browserconsole/\">Check the Developer Console for more information</a>. If this persists, take a screenshot of the console and <a class=\"alertLink\" href=\"https://github.com/cxntered/crown/issues\">create an issue on the GitHub repo</a>.")
    };
};

const skinFile = document.getElementById("skin-file");

const fileChosen = document.getElementById("file-chosen");

skinFile.addEventListener("change", () => {
    fileChosen.textContent = skinFile.files[0].name;
});
