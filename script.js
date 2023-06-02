import { process } from '/env.js'
import { Configuration, OpenAIApi } from 'openai'

const setupTextArea = document.getElementById("setup-textarea")
const setupInputContainer = document.getElementById("setup-input-container")
const movieBossText = document.getElementById("movie-boss-text")
const synopsisBox = document.getElementById("output-text")
const movieTitle = document.getElementById("output-title")
const stars = document.getElementById("output-stars")
const img = document.getElementById("output-img-container")
const viewPitch = document.getElementById("view-pitch-btn")
const setupContainer = document.getElementById("setup-container")
const outputContinaer = document.getElementById("output-container")

const configuration = new Configuration({
    apiKey : process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

document.getElementById("send-btn").addEventListener("click", () => {
    const userInput = setupTextArea.value
    if (setupTextArea.value) {
        setupInputContainer.innerHTML = `<img src="images/loading.svg" class="loading" id="loading">`
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
        prompt: `Create a movie synopsis in Quentin Tarantino Syle for this pitch "${outline}". The synopsis should
                include actor names in brackets after each character. Choose actors that Quentin Tarantino would think would be ideal
                for the role. Be neat and consise.`,
        max_tokens: 700
    })
    const synopsis = response.data.choices[0].text.trim()
    synopsisBox.innerText = synopsis
    fetchTitle(synopsis)
    fetchStars(synopsis)
}

async function fetchTitle(synopsis) {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Create a catchy movie title in Quentin Tarantino Syle for this synopsis "${synopsis}"`,
        max_tokens: 25,
        temperature: 0.5
    })
    const title = response.data.choices[0].text.trim()
    movieTitle.innerText = title
    fetchImagePrompt(title,synopsis)
}
 
async function fetchStars(synopsis) {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Name the actors (seperated by commas) mentioned in the synopsis "${synopsis}"`,
        max_tokens: 50,
        temperature: 0.5
    })
    stars.innerText = response.data.choices[0].text.trim()
}

async function fetchImagePrompt(title,synopsis) {
    const response = await openai.createCompletion({ 
        model: "text-davinci-003",
        prompt: `Give a short description of an image that would be ideal for the movie "${title}" based on the synopsis "${synopsis}".
                    The description should be rich in visual detail but contian no names. Neither the movie name
                    START WITH THE DESCRIPTION`,
        max_tokens: 250,
        temperature: 0.8
    })
    const prompt = response.data.choices[0].text.trim()
    console.log(prompt)
    fetchImageUrl(prompt)
}

async function fetchImageUrl(imagePrompt) {
    const response = await openai.createImage({
        prompt: `${imagePrompt}, There should be no text or words WHATSOEVER in this image`,
        n: 1,
        size: '512x512',
        response_format: 'url'
    })
    img.innerHTML = `<img src="${response.data.data[0].url}">`
    setupInputContainer.innerHTML = `<button id="view-pitch-btn" class="view-pitch-btn">View Pitch</button>`
    document.getElementById("view-pitch-btn").addEventListener("click", () => {
        setupContainer.style.display = "none"
        outputContinaer.style.display = "flex"
        movieBossText.innerText = `Aight now pay up`
    })
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