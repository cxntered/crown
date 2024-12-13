const addCrown = async () => {
    try {
        document.getElementById("download").style.visibility = "hidden";
        document.getElementById("addCrown").ariaBusy = "true";
        document.getElementById("skinRender").innerHTML = "";

        const player = document.getElementById("player").value;

        const uuid = await fetch(`https://playerdb.co/api/player/minecraft/${player}`).then(res => res.json());
        if (!uuid.success) {
            document.getElementById("player").value = "";
            document.getElementById("addCrown").ariaBusy = "false";
            openModal(document.getElementById("errorModal"))
            return;
        }

        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d", { willReadFrequently: true });

        const drawCrown = () => {
            let crown = new Image();
            crown.crossOrigin = "anonymous";
            crown.onload = () => {
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(crown, 0, 0);

                const base64Image = canvas.toDataURL();

                const black = [0, 0, 0, 255];
                const isSlim = isAreaOneColor(50, 16, 2, 4, black) && isAreaOneColor(54, 20, 2, 12, black) && isAreaOneColor(42, 48, 2, 4, black) && isAreaOneColor(46, 52, 2, 12, black);

                document.getElementById("skinRender").ariaBusy = "true";
                const skinRender = document.createElement("img");
                skinRender.width = skinRender.height = 128;
                skinRender.style.display = "none";
                document.getElementById("skinRender").appendChild(skinRender);

                skinRender.src = `https://vzge.me/full/256/${encodeURIComponent(base64Image.split(";base64,")[1])}?${isSlim ? "slim" : "wide"}`;
                skinRender.onload = () => {
                    document.getElementById("skinRender").ariaBusy = "false";
                    skinRender.style.display = "inline";
                }

                document.getElementById("downloadLink").href = base64Image;
                document.getElementById("download").style.visibility = "visible";
            };
            crown.src = "./assets/images/crown.png";
            document.getElementById("addCrown").ariaBusy = "false";
        };

        const isAreaOneColor = (x, y, width, height, color) => {
            const imageData = ctx.getImageData(x, y, width, height);
            const data = imageData.data;
            const [r, g, b, a] = color;

            for (let i = 0; i < data.length; i += 4) {
                if (data[i] !== r || data[i + 1] !== g || data[i + 2] !== b || data[i + 3] !== a) {
                    return false;
                }
            }
            return true;
        }

        let skin = new Image();
        skin.crossOrigin = "anonymous";
        skin.onload = () => {
            canvas.width = 64;
            canvas.height = 64;
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(skin, 0, 0);
            drawCrown();
        };
        skin.src = `https://vzge.me/processedskin/${uuid.data.player.id}`;
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
