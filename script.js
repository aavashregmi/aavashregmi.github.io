const tools = [
    { name: "ChatGPT", category: "writing", desc: "AI-powered text assistant.", link: "https://chat.openai.com/" },
    { name: "DALL·E", category: "image", desc: "Generate images from text.", link: "https://openai.com/dall-e/" },
    { name: "RunwayML", category: "video", desc: "AI video creation platform.", link: "https://runwayml.com/" },
    { name: "ElevenLabs", category: "audio", desc: "AI text-to-speech.", link: "https://elevenlabs.io/" },
    { name: "Copilot", category: "code", desc: "AI coding assistant.", link: "https://github.com/features/copilot" },
    { name: "Pika Labs", category: "video", desc: "Text-to-video AI tool.", link: "https://pikamlabs.com/" },
    { name: "Jasper", category: "writing", desc: "AI content generator.", link: "https://www.jasper.ai/" },
    { name: "MidJourney", category: "image", desc: "AI art generator.", link: "https://www.midjourney.com/" },
    { name: "Synthesia", category: "video", desc: "AI video avatars.", link: "https://www.synthesia.io/" }
];

const toolsContainer = document.getElementById("tools");
const searchInput = document.getElementById("search");
const categoryButtons = document.querySelectorAll(".categories button");

function displayTools(filterCategory = "all", searchTerm = "") {
    toolsContainer.innerHTML = "";
    const filtered = tools.filter(tool => 
        (filterCategory === "all" || tool.category === filterCategory) &&
        tool.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    filtered.forEach((tool, i) => {
        const card = document.createElement("div");
        card.classList.add("tool-card");
        card.style.animationDelay = `${i * 0.1}s`; // stagger animation
        card.innerHTML = `
            <h3>${tool.name}</h3>
            <p>${tool.desc}</p>
            <a href="${tool.link}" target="_blank">Visit</a>
        `;
        toolsContainer.appendChild(card);
    });
}

// Initial display
displayTools();

// Search functionality
searchInput.addEventListener("input", () => {
    const term = searchInput.value;
    const activeCategory = document.querySelector(".categories button.active").dataset.category;
    displayTools(activeCategory, term);
});

// Category filter
categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        categoryButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const category = btn.dataset.category;
        displayTools(category, searchInput.value);
    });
});
