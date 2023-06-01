import { process } from '/env.js'
import { Configuration, OpenAIApi } from '/openai'

const setupTextArea = document.getElementById("setup-textarea")
const setupInputContainer = document.getElementById("setup-input-container")
const movieBossText = document.getElementById("movie-boss-text")

const configuration = new Configuration({
    apiKey : process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

document.getElementById("send-btn").addEventListener("click", () => {
    if (setupTextArea.value) {
        setupInputContainer.innerHTML = `<img src="images/loading.gif" class="loading" id="loading">`
        movieBossText.innerHTML = `Aight, just you wait xd`
    }
    fetchBotReply()
});

/**Using OpenAI Dependency */
async function fetchBotReply() {
    const response = await openai.createCompletion({
        prompt: "Pretend to be Quentin Tarantino",
        model: "text-davinci-003"
    })
    movieBossText.innerText = response.data.choices[0].text
}

/**Using a fetch request */
function fetchBotReplyWithFetchRequest() {
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + apiKey
        },
        body: JSON.stringify({
            prompt: "Pretend to be Quentin Tarantino",
            model: "text-davinci-003",
        })
    }).then(response => response.json()).then(data => 
        movieBossText.innerText = data.choices[0].text)
}