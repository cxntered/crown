const addCrown = async () => {
    try {
        document.getElementById("download").style.visibility = "hidden";

        const ign = document.getElementById("ign").value
        const skinFile = document.getElementById("skin-file").files[0];

        if (!ign && !skinFile) {
            return alert("ERROR: You have not inputted an IGN/UUID or a skin file!")
        }

        if (ign && !skinFile || ign && skinFile) {
            const uuid = await fetch(`https://playerdb.co/api/player/minecraft/${ign}`).then(res => res.json());
            if (!uuid.success) {
                return alert("ERROR: An error has occured. Make sure that you inputted the right IGN/UUID.")
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
        alert("ERROR: An error has occured. Check the console for more information. If this persists, contact cxntered @ cxntered#8012 on Discord.")
    }
}

const skinFile = document.getElementById("skin-file");

const fileChosen = document.getElementById("file-chosen");

skinFile.addEventListener("change", () => {
    fileChosen.textContent = this.files[0].name
})
