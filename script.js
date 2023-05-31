const setupTextArea = document.getElementById("setup-textarea")
const setupInputContainer = document.getElementById("setup-input-container")
const movieBossText = document.getElementById("movie-boss-text")

const apiKey = "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"
const url ="https://api.openai.com/v1/completions"

document.getElementById("send-btn").addEventListener("click", () => {
    if (setupTextArea.value) {
        setupInputContainer.innerHTML = `<img src="images/loading.gif" class="loading" id="loading">`
        movieBossText.innerHTML = `Aight, just you wait xd`
    }
    fetchBotReply()
});

function fetchBotReply() {
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + apiKey
        },
        body: JSON.stringify({
            prompt: "This is a test, reply if you get it",
            model: "text-davinci-003",
        })
    }).then(response => response.json()).then(data => console.log(data))
}