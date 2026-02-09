// UI
const input = document.getElementById("input");
const search = document.getElementById("search");
const cartContainer = document.getElementById("cartContainer")
// console.dir(cartContainer)

// suggesBord
const suggesBord = document.getElementById("suggesBord")
// console.log(suggesBord)

//  suggestion buttons 
const suggestBtns = document.querySelectorAll(".suggest-btn"); // Add this class to all buttons

// errorBord
const errorBord = document.getElementById("errorBord"); // Add this class to all buttons
// console.log(errorBord)

suggestBtns.forEach((btn) => {
    // console.log(btn)
    btn.addEventListener("click", () => {
        input.value = btn.innerText;
        suggesBord.innerHTML = ''
    })
})

search.addEventListener("click", function () {
    let username = input.value.trim();
    // console.log(username)

    
    if (username === "") {
        errorBord.className = "block"
        return;
    }

    search.innerText = "Loading..."

    getGitHubProfile(username).then(result => {

        const userObj = result.profile;
        // console.log(result.success)
        if (result.success) {
            createCart(userObj.name, userObj.avatar, userObj.username, userObj.bio, userObj.profileUrl, userObj.publicRepos, userObj.followers, userObj.following, userObj.accountType, result.message)
            errorBord.className = "hidden"
            search.innerText = "Search"
        } else {
            errorBord.className = "block"
            cartContainer.innerHTML = "";
            search.innerText = "Search again"
        }
    });
    // console.log(input.value)
    input.value = ""
});


function createCart(name, imgUrl, username, bio, profileUrl, publicRepos, followers, following, accountType, message) {

    cartContainer.innerHTML = "";

    const div1 = document.createElement("div");
    div1.className = "bg-gray-500 w-[95%] md:w-[28%] md:px-4 rounded-2xl flex flex-col items-center mt-2 justify-center";

    const div2 = document.createElement("div")
    div2.className = "flex flex-col items-center justify-center pt-4"

    const div3 = document.createElement("div")
    div3.className = "w-32 h-32 rounded-full bg-gray-500 overflow-hidden shadow-lg border-4 border-white"

    const img = document.createElement("img")
    img.className = " w-full h-full object-cover"
    img.src = imgUrl;
    // console.log(img)

    const h1 = document.createElement("h1")
    h1.className = "text-2xl font-bold"
    h1.innerText = name;
    // console.log(h1)

    const h_1 = document.createElement("h1")
    h_1.className = "text-xl"
    h_1.innerText = `@${username}`
    // console.log(h_1)

    const border = document.createElement("div")
    border.className = "h-[2px] w-[80%] m-2 bg-gray-800"

    const border1 = document.createElement("div")
    border1.className = "h-[2px] w-[80%] m-2 bg-gray-800"

    const p = document.createElement("p")
    p.className = "text-md text-center font-bold"
    p.innerText = bio;

    const button = document.createElement("button");
    button.className = "bg-gray-400 m-4 text-black rounded-[0.5rem] p-2 px-2";

    button.innerHTML = `
    <a href= ${profileUrl} target="_blank">
        <i class="ri-external-link-line"></i> github.com/${username}
    </a>`;

    // details div
    const detailsDiv = document.createElement("div")
    detailsDiv.className = "flex flex-wrap items-center justify-center"

    const dtlsDivFirstBtn = document.createElement("button")
    dtlsDivFirstBtn.className = "bg-gray-400 m-1 text-black rounded-[0.5rem] p-2 px-2"
    dtlsDivFirstBtn.innerHTML = `<i class="ri-git-repository-line text-xl font-bold"> ${publicRepos}</i>
                        <p class="text-xl">public repo</p>`
    const dtlsDivSecontBtn = document.createElement("button")
    dtlsDivSecontBtn.className = "bg-gray-400 m-1 text-black rounded-[0.5rem] p-2 px-2"
    dtlsDivSecontBtn.innerHTML = `<i class="ri-group-line text-xl font-bold"> ${followers}</i>
                        <p class="text-xl">Followers</p>`
    const dtlsDivThreetBtn = document.createElement("button")
    dtlsDivThreetBtn.className = "bg-gray-400 m-1 text-black rounded-[0.5rem] p-2 px-2"
    dtlsDivThreetBtn.innerHTML = `<i class="ri-group-line text-xl font-bold"> ${following}</i>
                        <p class="text-xl">Following</p>`

    // accountType div
    const typeDiv = document.createElement("div")
    typeDiv.className = "flex w-[90%] items-center justify-center m-2"

    const typeborder = document.createElement("div")
    typeborder.className = "h-[2px] w-[25%] m-2 bg-gray-800"

    const typeborder2 = document.createElement("div")
    typeborder2.className = "h-[2px] w-[25%] m-2 bg-gray-800"

    const typediv = document.createElement("div")
    typediv.className = "bg-green-500 m-1 w-[50%]  h-[4rem] text-black rounded-[0.5rem] p-2 px-2 flex gap-2 items-center justify-center"
    typediv.innerHTML = ` <p class=" text-center lg:text-xl">${accountType}</p>`

    // success
    const cartP = document.createElement("p")
    cartP.className = "p-4 font-bold text-green-500 text-center"
    cartP.innerHTML = `Profile for <span class="text-xl text-gray-300"> ${message}</span> fetched successfully`



    div3.appendChild(img)
    div2.append(div3, h1, h_1)

    detailsDiv.append(dtlsDivFirstBtn, dtlsDivSecontBtn, dtlsDivThreetBtn)

    typeDiv.append(typeborder, typediv, typeborder2)

    div1.append(div2, border1, p, button, border, detailsDiv, typeDiv, cartP)
    // console.log(div1)
    cartContainer.append(div1)
}



async function fetchGitHubUser(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);

        if (!response.ok) {
            throw new Error("Request failed");
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.log("Error:", error.message);
    }
}


function getAccountType(followers) {
    if (followers >= 100000) return "👑 Legendary: 100k+ followers";
    if (followers >= 10000) return "⭐ Famous: 10k+ followers";
    if (followers >= 1000) return "🌟 Popular: 1k+ followers";
    if (followers >= 100) return "📈 Growing: 100+ followers";
    return "🌱 Starter"; 
}

// Format the raw API data
function formatUserProfile(userData, type) {
    return {
        username: userData.login,
        name: userData.name || "No name provided",
        avatar: userData.avatar_url,
        bio: userData.bio || "No bio provided",
        publicRepos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
        profileUrl: userData.html_url,
        accountType: type
    };
}

// Main function
async function getGitHubProfile(username) {
    try {
        const receivedData = await fetchGitHubUser(username);


        const accountType = getAccountType(receivedData.followers);
        const formattedData = formatUserProfile(receivedData, accountType);

        return {
            success: true,
            profile: formattedData,
            message: `${username}`
        };

    } catch (error) {
        return {
            success: false,
            profile: null,
            message: `User ${username} not found on GitHub`
        };
    }
}



// getGitHubProfile("s2fdsaf5asd4f").then(result => console.log(result));

