const addCrown = async () => {
    try {
        document.getElementById("download").style.visibility = "hidden";
        const ign = document.getElementById("ign").value
        const uuid = await fetch(`https://playerdb.co/api/player/minecraft/${ign}`).then(res => res.json());
        if (!uuid.success) {
            return alert("ERROR: An error has occured. Make sure that you inputted the right IGN/UUID.")
        }

        canvas = document.getElementById("canvas");
        canvas.width = 64;
        canvas.height = 64;
        ctx = canvas.getContext("2d");

        setTimeout(() => {
            let crown = new Image();
            crown.crossOrigin = "anonymous";
            crown.onload = function() {
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(crown, 0, 0);

                const downloadURL = canvas.toDataURL();
                document.getElementById("downloadLink").href = downloadURL;
                document.getElementById("download").style.visibility = "visible";
            };
            crown.src = "../src/assets/images/crown.png";
        }, 500);

        let skin = new Image();
        skin.crossOrigin = "anonymous";
        skin.onload = function() {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(skin, 0, 0);
        };
        skin.src = `https://crafatar.com/skins/${uuid.data.player.id}`;
    } catch (err) {
        console.log(err);
        alert("ERROR: An error has occured. Check the console for more information. If this persists, contact cxntered @ cxntered#8012 on Discord.")
    }
}