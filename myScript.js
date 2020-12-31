let playerDetails = [];
let playerList = [];
let search_text = '';
const displayDiv = document.getElementById('displayPlayers');
fetch('https://api.npoint.io/d6bd0efc05639084eb17')
    .then(response => {
        return response.json();
    })
    .then(data => {
        playerList = data.playerList;
        fetchAndSortData();
        displayData();
    })

const fetchAndSortData = () => {
    // Get the Data
    for(let i=0; i<playerList.length; i++) {
        const name = playerList[i].PFName;
        const tname = playerList[i].TName;
        const skill = playerList[i].SkillDesc;
        const pValue = playerList[i].Value;
        const id = playerList[i].Id;
        const upComingMatch = playerList[i].UpComingMatchesList[0];
        const date = upComingMatch.MDate;
        const cCode = upComingMatch.CCode;
        const vsCCode = upComingMatch.VsCCode;
        playerDetails.push({ name, skill, pValue, date, cCode, vsCCode, tname, id });                        
    }

    // Sort the Data
    playerDetails.sort((player1, player2) => {
        if (parseFloat(player1.pValue) > parseFloat(player2.pValue)) { return 1 }
        if (parseFloat(player1.pValue) < parseFloat(player2.pValue)) { return -1 }
        if (parseFloat(player1.pValue) == parseFloat(player2.pValue)) { return 0 }
    });
}

const displayData = () => {

    // Adding DOM elements
    for (let player of playerDetails) {
        const {name, skill, pValue, id, date, cCode, vsCCode} = player;

        const div = document.createElement("div");
        div.classList.add('col-4');

        const img = document.createElement("img");
        img.src = `./player-images/${id}.jpg`;
        div.appendChild(img);
        const childDiv = document.createElement("div");
        childDiv.classList.add('card-body');
        const h5 = document.createElement("h5");
        h5.classList.add('card-title');
        h5Text = document.createTextNode(name);
        h5.appendChild(h5Text);

        // Add Other details
        const skillPara = document.createElement('p');
        const skillText = document.createTextNode(`Skill: ${skill}`);
        skillPara.appendChild(skillText);

        const valuePara = document.createElement('p');
        const valueText = document.createTextNode(`Value: \$${pValue}`);
        valuePara.appendChild(valueText);

        const datePara = document.createElement('p');
        const dateText = document.createTextNode(`Upcoming Match: ${date}`);
        datePara.appendChild(dateText);

        const cCodePara = document.createElement('p');
        const cCodeText = document.createTextNode(`Country: ${cCode}`);
        cCodePara.appendChild(cCodeText);

        const vsCCodePara = document.createElement('p');
        const vsCCodeText = document.createTextNode(`Opposite Country: ${vsCCode}`);
        vsCCodePara.appendChild(vsCCodeText);

        // Append Child Div
        childDiv.appendChild(h5);
        childDiv.appendChild(skillPara);
        childDiv.appendChild(valuePara);
        childDiv.appendChild(datePara);
        childDiv.appendChild(cCodePara);
        childDiv.appendChild(vsCCodePara);

        div.appendChild(childDiv);
        displayDiv.appendChild(div);
    }
}

const findPlayers = () => {
    search_text = document.getElementById('search').value;
    const filteredPlayers = playerDetails.filter(player => {
        return (player.name.toLowerCase().includes(search_text.toLowerCase()) || player.tname.toLowerCase().includes(search_text.toLowerCase()))
    });
    if (filteredPlayers.length !== 0) {
        playerDetails = filteredPlayers;
        displayDiv.innerHTML = '';
        displayData();
        playerDetails = [];
    } else {
        fetchAndSortData();
        displayData();
    }
}
