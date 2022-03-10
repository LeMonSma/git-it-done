var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
let getUserRepo = function(user) {

    let apiUrl = "https://api.github.com/users/" + user + "/repos";

    fetch(apiUrl).then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    displayRepos(data, user);
                });
            } else {
                alert('Error: Github User Not Found');
            }
        })
        .catch(function(errror) {
            alert('Unable to connect to GitHun');
        });
}

let formSubmitHandler = function(event) {
    event.preventDefault();
    let username = nameInputEl.value.trim();

    if (username) {
        getUserRepo(username);
        nameInputEl.value = "";
    } else {
        alert('please enter a github username')
    }
    console.log(event);
}

let displayRepos = function(repos, searchTerm) {
    if (repos.length === 0) {
        repoContainerEl.textContent = 'No Repos Found.';
        return
    }
    repoContainerEl.textContent = '';
    repoSearchTerm.textContent = searchTerm

    for (let i = 0; i < repos.length; i++) {
        let repoName = repos[i].owner.login + '/' + repos[i].name;
        let repoEl = document.createElement('div');
        repoEl.classList = 'list-item flex-row justify-space-between align-center';

        let titleEl = document.createElement('span');
        titleEl.textContent = repoName;

        repoEl.appendChild(titleEl);

        let statusEl = document.createElement('span')
        statusEl.classList = 'flex-row align-center';

        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML =
                " <i class = 'fas fa-time status-con icon-danger'> </i>" + repos[i].open_issues_count + ' issue(s)';
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        repoEl.appendChild(statusEl)


        repoContainerEl.appendChild(repoEl);

    }
}

userFormEl.addEventListener('submit', formSubmitHandler);