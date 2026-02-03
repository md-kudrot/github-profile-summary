// UI

console.log("JS file loaded!");

const input = document.getElementById("input");
const search = document.getElementById("search");
console.log(search)

search.addEventListener("click", function() {
    console.log("hello ")
});



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
    if (followers >= 100000) return "👑 Legendary (100k+ followers)";
    if (followers >= 10000) return "⭐ Famous (10k+ followers)";
    if (followers >= 1000) return "🌟 Popular (1k+ followers)";
    if (followers >= 100) return "📈 Growing (100+ followers)";
    return "🌱 Starter"; // ✅ Fixed: Simplified default case
}

// Format the raw API data
function formatUserProfile(userData, type) {
    return {
        username: userData.login,
        name: userData.name,
        avatar: userData.avatar_url,
        bio: userData.bio,
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
            message: `Profile for ${receivedData.name} fetched successfully`
        };
        
    } catch (error) {
        return {
            success: false,
            profile: null,
            message: `User ${username} not found on GitHub`
        };
    }
}

getGitHubProfile("md-kudrot").then(result => console.log(result));