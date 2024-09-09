const GITHUB_USERNAME = "Nikita-Shah7";
const GITHUB_REPO = "IT314_Project_Group18";


const github_api_endpoints = async () => {
    const response = await fetch(`https://api.github.com/`);
    const data = await response.json();
    console.log(data);
}

const repo_details = async () => {
    const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}`);
    const data = await response.json();
    console.log(data);
}

const repo_contributors = async () => {
    const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contributors`);
    const data = await response.json();
    console.log(data);
}

const followers = async () => {
    console.log("FOLLOWERS::")
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/followers`);
    const data = await response.json();
    // console.log(data);

    for (let i = 0; i < data.length; i++) {
        console.log(data[i].login)
    }
}

const followings = async () => {
    console.log("FOLLOWINGS::")
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/following`);
    const data = await response.json();
    // console.log(data);

    for (let i = 0; i < data.length; i++) {
        console.log(data[i].login)
    }
}

const repo_forks = async () => {
    const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/forks`);
    const data = await response.json();
    console.log(data);
}

const repo_languages = async () => {
    const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/languages`);
    const data = await response.json();
    console.log(data);
}



// github_api_endpoints();
// repo_details();
// repo_contributors();
followers();
followings();
repo_forks();
repo_languages();