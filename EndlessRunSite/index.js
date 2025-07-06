const teamMembers = [
  {
    name: "Daniel Tomazi",
    photo: "assets/foto-tomazi.png",
    linkedin: "https://www.linkedin.com/in/daniel-tomazi"
  },
  {
    name: "Cynthia Ribamar",
    photo: "assets/foto-cynthia.png",
    linkedin: "https://www.linkedin.com/in/cynthia-ribamar-40b9211b7/"
  },
  {
    name: "Marcio Galvão",
    photo: "assets/foto-marcio.png",
    linkedin: "https://www.linkedin.com/in/m%C3%A1rcio-galv%C3%A3o-5a7270272"
  },
  {
    name: "Paulo Henrique",
    photo: "assets/foto-paulo.png",
    linkedin: "https://www.linkedin.com/in/paulofronthenrique"
  },
  {
    name: "Vitor Carvalho",
    photo: "assets/foto-vitor.png",
    linkedin: "https://www.linkedin.com/in/vitor-macedo-7884b8271/"
  }
];

function renderTeamMembers() {
  const container = document.getElementById("students");
  
  teamMembers.forEach((member, index) => {
    const memberElement = document.createElement("div");
    memberElement.className = "team-member";
    memberElement.setAttribute("key", index);

    const link = document.createElement("a");
    link.href = member.linkedin;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    const photo = document.createElement("img");
    photo.src = member.photo;
    photo.className = "member-photo";
    photo.alt = `Foto de ${member.name}`;
    photo.title = member.name;

    memberElement.appendChild(photo);
    memberElement.appendChild(link);
    container.appendChild(memberElement);
  });
}

const crownIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 441 446"><path fill="currentColor" d="M198.3 2.875c5.513 3.65 9.52 8.053 13.7 13.125l2.355 2.848C229.805 37.964 236.327 56.632 238 81l1.87.348C271.204 87.275 299.353 98.278 326 116l1.891 1.256C337.172 123.5 345.662 130.56 354 138l1.668 1.477C376.845 158.289 394.788 180.492 409 205l1.286 2.21C417.15 219.114 423.14 231.144 428 244l.937 2.47c11.717 31.49 17.648 68.088 7.125 100.718-1.074 3.4-1.074 3.4-.324 6.75l1.137 1.75c2.34 3.648 2.787 5.184 1.984 9.328-2 4.618-6.328 7.969-10.933 9.816l-2.113.73c-4.8 1.914-7.482 5.08-10.813 8.875-35.275 39.681-92.79 48.842-143.031 52.613l-2.29.173c-1.42.106-2.841.209-4.262.308A78.845 78.845 0 0 0 255 439c-2.176-.156-2.176-.156-4.313-.5-4.453-.59-8.262-.224-12.687.5v-2h-28v2l-2.105-.367c-7.036-1.16-14.047-1.984-21.145-2.633-12.248-1.122-24.453-2.254-36.531-4.637-2.369-.456-2.369-.456-5.406-.3C142 431 142 431 138.59 429.675c-5.469-2.12-11.129-3.27-16.84-4.551a1101.74 1101.74 0 0 1-6.758-1.602l-3.035-.72c-5.25-1.425-10.047-3.498-14.957-5.803a882 882 0 0 0-5.223-2.184C74.367 407.55 58.47 399.183 44 387l-1.607-1.333C28.069 373.642 17.455 359.108 10 342l-1.453-3.188C3.06 325.858.48 311.026 0 297l-.121-2.465C-1.371 246.847 19.907 200.67 49 164l1.293-1.648c11.816-14.943 25.63-28.946 41.055-40.149a308.912 308.912 0 0 0 4.992-3.734c9.033-6.766 18.65-12.28 28.66-17.469l2.121-1.102C148.036 89.188 170.72 82.804 194 80c-2.96-9.305-7.95-15.372-16.555-19.945-5.334-2.73-10.72-5.34-16.234-7.688-8.515-3.671-8.515-3.671-11.899-7.054-2.92-7.374-4.37-14.195-1.613-21.833C153.788 11.87 164.946 5.06 177 1c7.273-2.169 14.704-1.979 21.3 1.875Z"/></svg>`;

let deletedPlayers = JSON.parse(localStorage.getItem('deletedPlayers') || '[]');

async function loadRanking() {
  try {
    const response = await fetch("https://pumpkin-api.vercel.app/ranking", {
      method: "GET"
    });

    const ranking = await response.json();
    const rankContainer = document.getElementById('rank');
    rankContainer.innerHTML = '';

    const filteredRanking = ranking.filter(player => {
      const playerKey = `${player.nome}_${player.pontos}`;
      return !deletedPlayers.includes(playerKey);
    });

    filteredRanking.slice(0, 10).forEach((player, index) => {
      const playerItem = document.createElement("li");

      const playerContainer = document.createElement("div");
      playerContainer.className = "player-item";

      const name = document.createElement("span");
      name.className = "player-name";
      name.textContent = player.nome;

      const score = document.createElement("span");
      score.className = "player-score";
      score.textContent = player.pontos;

      playerContainer.appendChild(name);
      playerContainer.appendChild(score);
      playerItem.appendChild(playerContainer);
      rankContainer.appendChild(playerItem);
    });
  } catch (error) {
    console.error("Erro ao carregar ranking:", error);
  }
}

const ADMIN_PASSWORD = "pumpkin123";

function initializeAdminPanel() {
  const adminToggle = document.getElementById('admin-toggle');
  const adminPanel = document.getElementById('admin-panel');
  const adminAuth = document.getElementById('admin-auth');
  const adminControls = document.getElementById('admin-controls');
  const adminLogin = document.getElementById('admin-login');
  const adminLogout = document.getElementById('admin-logout');
  const adminPassword = document.getElementById('admin-password');

  adminToggle.addEventListener('click', () => {
    const isVisible = adminPanel.style.display !== 'none';
    adminPanel.style.display = isVisible ? 'none' : 'block';
    if (!isVisible) {
      adminAuth.style.display = 'block';
      adminControls.style.display = 'none';
      adminPassword.value = '';
    }
  });

  adminLogin.addEventListener('click', () => {
    if (adminPassword.value === ADMIN_PASSWORD) {
      adminAuth.style.display = 'none';
      adminControls.style.display = 'block';
      loadAdminRanking();
    } else {
      alert('Senha incorreta!');
      adminPassword.value = '';
    }
  });

  adminLogout.addEventListener('click', () => {
    adminAuth.style.display = 'block';
    adminControls.style.display = 'none';
    adminPassword.value = '';
  });

  adminPassword.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      adminLogin.click();
    }
  });
}

async function loadAdminRanking() {
  try {
    const response = await fetch("https://pumpkin-api.vercel.app/ranking", {
      method: "GET"
    });

    const ranking = await response.json();
    const adminRankContainer = document.getElementById('admin-rank');
    adminRankContainer.innerHTML = '';

    const filteredRanking = ranking.filter(player => {
      const playerKey = `${player.nome}_${player.pontos}`;
      return !deletedPlayers.includes(playerKey);
    });

    filteredRanking.forEach((player, index) => {
      const playerItem = document.createElement("li");
      playerItem.style.cursor = "pointer";

      const playerContainer = document.createElement("div");
      playerContainer.className = "player-item";

      const name = document.createElement("span");
      name.className = "player-name";
      name.textContent = player.nome;

      const score = document.createElement("span");
      score.className = "player-score";
      score.textContent = player.pontos;

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-button";
      deleteBtn.innerHTML = "❌";
      deleteBtn.title = "Remover jogador";

      playerContainer.appendChild(name);
      playerContainer.appendChild(score);
      playerContainer.appendChild(deleteBtn);
      playerItem.appendChild(playerContainer);

      deleteBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        removePlayer(player.nome, player.pontos);
      });

      adminRankContainer.appendChild(playerItem);
    });
  } catch (error) {
    console.error("Erro ao carregar ranking administrativo:", error);
  }
}

function removePlayer(name, score) {
  if (confirm(`Confirma a remoção de ${name} com ${score} pontos do ranking?`)) {
    const playerKey = `${name}_${score}`;
    
    if (!deletedPlayers.includes(playerKey)) {
      deletedPlayers.push(playerKey);
      localStorage.setItem('deletedPlayers', JSON.stringify(deletedPlayers));
    }
    
    alert(`${name} foi removido do ranking!`);
    loadRanking();
    loadAdminRanking();
  }
}

function clearDeletedPlayers() {
  if (confirm("Confirma a restauração de todos os jogadores?")) {
    deletedPlayers = [];
    localStorage.removeItem('deletedPlayers');
    alert("Todos os jogadores foram restaurados!");
    loadRanking();
    loadAdminRanking();
  }
}

function initializeApp() {
  renderTeamMembers();
  loadRanking();
  initializeAdminPanel();
}

// Smooth scroll para links de navegação
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Intersection Observer para animações on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, observerOptions);

// Observar elementos animados
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.character-card, .control-item, .team-member');
  animatedElements.forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
});

// Loading state para ranking
function showLoadingState() {
  const rankContainer = document.getElementById('rank');
  rankContainer.classList.add('loading');
}

function hideLoadingState() {
  const rankContainer = document.getElementById('rank');
  rankContainer.classList.remove('loading');
}

// Atualizar função de carregamento do ranking
const originalLoadRanking = loadRanking;
loadRanking = async function() {
  showLoadingState();
  try {
    await originalLoadRanking();
  } finally {
    hideLoadingState();
  }
};

// Debounce para melhor performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Auto-refresh do ranking a cada 30 segundos
setInterval(() => {
  if (document.visibilityState === 'visible') {
    loadRanking();
  }
}, 30000);

// Tratamento de erros global
window.addEventListener('error', (event) => {
  console.error('Erro capturado:', event.error);
});

// Preload de imagens importantes
function preloadImages() {
  const imagesToPreload = [
    'assets/banner-1.png',
    'assets/banner-2.png',
    'assets/pumpkin-magica.png',
    'assets/jack-sombrio.png',
    'assets/vortex-fantasma.png'
  ];
  
  imagesToPreload.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// Chamar preload no início
document.addEventListener('DOMContentLoaded', preloadImages);

document.addEventListener('DOMContentLoaded', initializeApp);
