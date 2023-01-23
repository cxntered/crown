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
