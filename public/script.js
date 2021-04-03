const socket = io()
var cooldownTime = 3000

var cooldown = 0

function send() {
    console.log("click")
    if (cooldown == 0 || (new Date().getTime())-cooldown > cooldownTime) {
        $("#alert-container").html(`
                <div class="alert alert-success" id="success-alert">
                    <strong>Sent✔️</strong>
                </div>
        `)

        $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#success-alert").slideUp(500);
        });

        cooldown = new Date().getTime()

        socket.emit("texttosay", $("#textBox").val())
    } else {
        $("#alert-container").html(`
                <div class="alert alert-danger" id="success-alert">
                    You have to wait another <strong>${((cooldown+cooldownTime) - new Date().getTime())/1000} Seconds</strong> to send another message
                </div>
        `)
        
        $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#success-alert").slideUp(500);
        });
    }
}