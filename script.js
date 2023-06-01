import { process } from '/env.js'
import { Configuration, OpenAIApi } from 'openai'

const setupTextArea = document.getElementById("setup-textarea")
const setupInputContainer = document.getElementById("setup-input-container")
const movieBossText = document.getElementById("movie-boss-text")
const synopsisBox = document.getElementById("output-text")

const configuration = new Configuration({
    apiKey : process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

document.getElementById("send-btn").addEventListener("click", () => {
    const userInput = setupTextArea.value
    if (setupTextArea.value) {
        setupInputContainer.innerHTML = `<img src="images/loading.gif" class="loading" id="loading">`
        movieBossText.innerHTML = `Aight, just you wait xd`
    }
    fetchBotReply(userInput)
    fetchSynopsis(userInput)
});

/**Using OpenAI Dependency */
async function fetchBotReply(outline) {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Introduce yourself as Quinten Tarantino and mention how this pitch "${outline}" is interesting and you need to think about it. Dont ask anything.`,
        max_tokens: 60
    })
    movieBossText.innerText = response.data.choices[0].text.trim()
}

async function fetchSynopsis(outline) {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Generate a movie scenario with actors and scenes in Quentin Tarantino style using this pitch: "${outline}".`,
        max_tokens: 700
    })
    synopsisBox.innerText = response.data.choices[0].text.trim()
    setupInputContainer.innerHTML = `<p> </p>`
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