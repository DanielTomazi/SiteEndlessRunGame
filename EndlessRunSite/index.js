const students = [
  {
    name: "Daniel Tomazi",
    pic: "assets/foto-tomazi.png",
    uri: "https://www.linkedin.com/in/daniel-tomazi"
  },
  {
    name: "Cynthia Ribamar",
    pic: "assets/foto-cynthia.png",
    uri: "https://www.linkedin.com/in/cynthia-ribamar-40b9211b7/"
  },
  {
    name: "Marcio Galvão",
    pic: "assets/foto-marcio.png",
    uri: "https://www.linkedin.com/in/m%C3%A1rcio-galv%C3%A3o-5a7270272"
  },
  {
    name: "Paulo Henrique",
    pic: "assets/foto-paulo.png",
    uri: "https://www.linkedin.com/in/paulofronthenrique"
  },
  {
    name: "Vitor Carvalho",
    pic: "assets/foto-vitor.png",
    uri: "https://www.linkedin.com/in/vitor-macedo-7884b8271/"
  }
]

function loadList() {
  const list = document.getElementById("students");

  students.forEach((student, index) => {
    const li = document.createElement("li");
    li.setAttribute("class", "student");
    li.setAttribute("key", index);

    const link = document.createElement("a");
    link.setAttribute("href", student.uri);

    const img = document.createElement("img");
    img.setAttribute("src", student.pic);
    img.setAttribute("class", "pic");
    img.setAttribute("alt", `Foto do(a) estudante ${student.name}`);
    img.setAttribute("title", student.name);

    li.appendChild(img);
    li.appendChild(link)
    list.appendChild(li);
  })
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 441 446"><path fill="#FDC700" d="M198.3 2.875c5.513 3.65 9.52 8.053 13.7 13.125l2.355 2.848C229.805 37.964 236.327 56.632 238 81l1.87.348C271.204 87.275 299.353 98.278 326 116l1.891 1.256C337.172 123.5 345.662 130.56 354 138l1.668 1.477C376.845 158.289 394.788 180.492 409 205l1.286 2.21C417.15 219.114 423.14 231.144 428 244l.937 2.47c11.717 31.49 17.648 68.088 7.125 100.718-1.074 3.4-1.074 3.4-.324 6.75l1.137 1.75c2.34 3.648 2.787 5.184 1.984 9.328-2 4.618-6.328 7.969-10.933 9.816l-2.113.73c-4.8 1.914-7.482 5.08-10.813 8.875-35.275 39.681-92.79 48.842-143.031 52.613l-2.29.173c-1.42.106-2.841.209-4.262.308A78.845 78.845 0 0 0 255 439c-2.176-.156-2.176-.156-4.313-.5-4.453-.59-8.262-.224-12.687.5v-2h-28v2l-2.105-.367c-7.036-1.16-14.047-1.984-21.145-2.633-12.248-1.122-24.453-2.254-36.531-4.637-2.369-.456-2.369-.456-5.406-.3C142 431 142 431 138.59 429.675c-5.469-2.12-11.129-3.27-16.84-4.551a1101.74 1101.74 0 0 1-6.758-1.602l-3.035-.72c-5.25-1.425-10.047-3.498-14.957-5.803a882 882 0 0 0-5.223-2.184C74.367 407.55 58.47 399.183 44 387l-1.607-1.333C28.069 373.642 17.455 359.108 10 342l-1.453-3.188C3.06 325.858.48 311.026 0 297l-.121-2.465C-1.371 246.847 19.907 200.67 49 164l1.293-1.648c11.816-14.943 25.63-28.946 41.055-40.149a308.912 308.912 0 0 0 4.992-3.734c9.033-6.766 18.65-12.28 28.66-17.469l2.121-1.102C148.036 89.188 170.72 82.804 194 80c-2.96-9.305-7.95-15.372-16.555-19.945-5.334-2.73-10.72-5.34-16.234-7.688-8.515-3.671-8.515-3.671-11.899-7.054-2.92-7.374-4.37-14.195-1.613-21.833C153.788 11.87 164.946 5.06 177 1c7.273-2.169 14.704-1.979 21.3 1.875Z"/></svg>`;

// Variável global para armazenar jogadores deletados
let deletedPlayers = JSON.parse(localStorage.getItem('deletedPlayers') || '[]');

async function fetchRank() {
  try {
    const res = await fetch("https://pumpkin-api.vercel.app/ranking", {
      method: "GET"
    });

    const ranking = await res.json();
    const rank = document.getElementById('rank');
    rank.innerHTML = '';

    // Filtra jogadores deletados localmente
    const filteredRanking = ranking.filter(player => {
      const playerKey = `${player.nome}_${player.pontos}`;
      return !deletedPlayers.includes(playerKey);
    });

    filteredRanking.forEach((player, index) => {
      if (index <= 9) {
        const li = document.createElement("li");
        li.setAttribute("class", "player");
        li.setAttribute("key", index);

        const icon = document.createElement("div");
        icon.setAttribute("class", "icon");
        icon.innerHTML = svg;

        const nome = document.createElement("span");
        nome.innerText = player.nome;

        const pontos = document.createElement("span");
        pontos.innerText = player.pontos;

        li.appendChild(icon);
        li.appendChild(nome);
        li.appendChild(pontos);

        rank.appendChild(li);
      }
    })
  } catch (err) {
    console.log("Error at get rank, ", err)
  }
}

// Configurações do painel de administração
const ADMIN_PASSWORD = "pumpkin123";

function setupAdminPanel() {
  const adminToggle = document.getElementById('admin-toggle');
  const adminPanel = document.getElementById('admin-panel');
  const adminAuth = document.getElementById('admin-auth');
  const adminControls = document.getElementById('admin-controls');
  const adminLogin = document.getElementById('admin-login');
  const adminLogout = document.getElementById('admin-logout');
  const adminPassword = document.getElementById('admin-password');

  // Toggle do painel de administração
  adminToggle.addEventListener('click', () => {
    if (adminPanel.style.display === 'none') {
      adminPanel.style.display = 'block';
      adminAuth.style.display = 'block';
      adminControls.style.display = 'none';
    } else {
      adminPanel.style.display = 'none';
      adminPassword.value = '';
    }
  });

  // Login do administrador
  adminLogin.addEventListener('click', () => {
    const password = adminPassword.value;
    
    if (password === ADMIN_PASSWORD) {
      adminAuth.style.display = 'none';
      adminControls.style.display = 'block';
      loadAdminRank();
    } else {
      alert('Senha incorreta!');
      adminPassword.value = '';
    }
  });

  // Logout do administrador
  adminLogout.addEventListener('click', () => {
    adminAuth.style.display = 'block';
    adminControls.style.display = 'none';
    adminPassword.value = '';
  });

  // Enter para fazer login
  adminPassword.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      adminLogin.click();
    }
  });
}

async function loadAdminRank() {
  try {
    const res = await fetch("https://pumpkin-api.vercel.app/ranking", {
      method: "GET"
    });

    const ranking = await res.json();
    const adminRank = document.getElementById('admin-rank');
    adminRank.innerHTML = '';

    // Filtra jogadores deletados localmente
    const filteredRanking = ranking.filter(player => {
      const playerKey = `${player.nome}_${player.pontos}`;
      return !deletedPlayers.includes(playerKey);
    });

    filteredRanking.forEach((player, index) => {
      const li = document.createElement("li");
      li.setAttribute("class", "player admin-player");
      li.style.cursor = "pointer";

      const icon = document.createElement("div");
      icon.setAttribute("class", "icon");
      icon.innerHTML = svg;

      const nome = document.createElement("span");
      nome.innerText = player.nome;

      const pontos = document.createElement("span");
      pontos.innerText = player.pontos;

      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "❌";
      deleteBtn.setAttribute("class", "delete-btn");
      deleteBtn.style.marginLeft = "10px";
      deleteBtn.style.background = "none";
      deleteBtn.style.border = "none";
      deleteBtn.style.color = "#ff4444";
      deleteBtn.style.cursor = "pointer";
      deleteBtn.style.fontSize = "16px";

      li.appendChild(icon);
      li.appendChild(nome);
      li.appendChild(pontos);
      li.appendChild(deleteBtn);

      // Adiciona evento de clique para deletar
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deletePlayer(player.nome, player.pontos);
      });

      adminRank.appendChild(li);
    });
  } catch (err) {
    console.log("Error loading admin rank: ", err);
  }
}

function deletePlayer(nome, pontos) {
  if (confirm(`Tem certeza que deseja deletar ${nome} com ${pontos} pontos do ranking?`)) {
    const playerKey = `${nome}_${pontos}`;
    
    if (!deletedPlayers.includes(playerKey)) {
      deletedPlayers.push(playerKey);
      localStorage.setItem('deletedPlayers', JSON.stringify(deletedPlayers));
    }
    
    alert(`${nome} foi removido do ranking!`);
    
    // Recarrega ambas as listas
    fetchRank();
    loadAdminRank();
  }
}

function clearDeletedPlayers() {
  if (confirm("Deseja restaurar todos os jogadores deletados?")) {
    deletedPlayers = [];
    localStorage.removeItem('deletedPlayers');
    alert("Todos os jogadores foram restaurados!");
    fetchRank();
    loadAdminRank();
  }
}

function app() {
  loadList();
  fetchRank();
  setupAdminPanel();
}

window.onload = app();
