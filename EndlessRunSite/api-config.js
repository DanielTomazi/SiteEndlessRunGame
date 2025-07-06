// Configuração da API para gerenciamento de exclusões
const API_CONFIG = {
  // JSONBin.io - Serviço gratuito para armazenar dados JSON
  // Você precisará criar uma conta em https://jsonbin.io/ e obter uma chave API
  JSONBIN_API_KEY: '$2a$10$p1tLf7MrbZNN4Dh70Mmk8uuc6Npdro5.8M7Jg.sXZO5KiJimzHfg.', // Substitua pela sua chave
  JSONBIN_BIN_ID: '686a564a8a456b7966bc3c60', // Substitua pelo ID do seu bin
  JSONBIN_BASE_URL: 'https://api.jsonbin.io/v3',
  
  // API original do ranking
  ORIGINAL_API_URL: 'https://pumpkin-api.vercel.app/ranking'
};

// Classe para gerenciar exclusões via API
class RankingManager {
  constructor() {
    this.deletedPlayersCache = [];
    this.cacheExpiry = 0;
    this.CACHE_DURATION = 5 * 60 * 1000; // 5 minutos
  }

  // Carregar lista de jogadores excluídos do servidor
  async loadDeletedPlayers() {
    try {
      const now = Date.now();
      
      // Usar cache se ainda válido
      if (this.cacheExpiry > now && this.deletedPlayersCache.length >= 0) {
        return this.deletedPlayersCache;
      }

      const response = await fetch(`${API_CONFIG.JSONBIN_BASE_URL}/b/${API_CONFIG.JSONBIN_BIN_ID}/latest`, {
        method: 'GET',
        headers: {
          'X-Master-Key': API_CONFIG.JSONBIN_API_KEY,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        this.deletedPlayersCache = data.record?.deletedPlayers || [];
        this.cacheExpiry = now + this.CACHE_DURATION;
        return this.deletedPlayersCache;
      } else {
        const localData = JSON.parse(localStorage.getItem('deletedPlayers') || '[]');
        return localData;
      }
    } catch (error) {
      return JSON.parse(localStorage.getItem('deletedPlayers') || '[]');
    }
  }

  // Salvar lista de jogadores excluídos no servidor
  async saveDeletedPlayers(deletedPlayers) {
    try {
      const data = {
        deletedPlayers: deletedPlayers,
        lastUpdated: new Date().toISOString(),
        version: 1
      };

      const response = await fetch(`${API_CONFIG.JSONBIN_BASE_URL}/b/${API_CONFIG.JSONBIN_BIN_ID}`, {
        method: 'PUT',
        headers: {
          'X-Master-Key': API_CONFIG.JSONBIN_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        // Atualizar cache
        this.deletedPlayersCache = deletedPlayers;
        this.cacheExpiry = Date.now() + this.CACHE_DURATION;
        
        // Salvar localmente como backup
        localStorage.setItem('deletedPlayers', JSON.stringify(deletedPlayers));
        return true;
      } else {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
    } catch (error) {
      localStorage.setItem('deletedPlayers', JSON.stringify(deletedPlayers));
      alert('⚠️ Aviso: A exclusão foi salva apenas localmente. Verifique a configuração da API.');
      return false;
    }
  }

  // Carregar ranking filtrado
  async getFilteredRanking() {
    try {
      // Carregar dados originais
      const [rankingResponse, deletedPlayers] = await Promise.all([
        fetch(API_CONFIG.ORIGINAL_API_URL),
        this.loadDeletedPlayers()
      ]);

      if (!rankingResponse.ok) {
        throw new Error(`Erro ao carregar ranking: ${rankingResponse.status}`);
      }

      const ranking = await rankingResponse.json();
      
      // Filtrar jogadores excluídos
      const filteredRanking = ranking.filter(player => {
        const playerKey = `${player.nome}_${player.pontos}`;
        return !deletedPlayers.includes(playerKey);
      });

      return filteredRanking;
    } catch (error) {
      throw error;
    }
  }

  // Excluir jogador
  async removePlayer(playerName, playerScore) {
    try {
      const deletedPlayers = await this.loadDeletedPlayers();
      const playerKey = `${playerName}_${playerScore}`;
      
      if (!deletedPlayers.includes(playerKey)) {
        deletedPlayers.push(playerKey);
        const success = await this.saveDeletedPlayers(deletedPlayers);
        
        if (success) {
          return { success: true, message: `${playerName} foi removido globalmente do ranking!` };
        } else {
          return { success: false, message: `${playerName} foi removido apenas localmente. Verifique a configuração da API.` };
        }
      } else {
        return { success: true, message: `${playerName} já estava excluído.` };
      }
    } catch (error) {
      return { success: false, message: 'Erro ao remover jogador. Tente novamente.' };
    }
  }

  // Restaurar todos os jogadores
  async restoreAllPlayers() {
    try {
      const success = await this.saveDeletedPlayers([]);
      
      if (success) {
        return { success: true, message: 'Todos os jogadores foram restaurados globalmente!' };
      } else {
        return { success: false, message: 'Jogadores restaurados apenas localmente. Verifique a configuração da API.' };
      }
    } catch (error) {
      return { success: false, message: 'Erro ao restaurar jogadores. Tente novamente.' };
    }
  }

  // Verificar se a API está configurada
  isApiConfigured() {
    return API_CONFIG.JSONBIN_API_KEY && 
           API_CONFIG.JSONBIN_API_KEY.length > 30 && 
           API_CONFIG.JSONBIN_API_KEY !== '$2a$10$YOUR_API_KEY_HERE' && 
           API_CONFIG.JSONBIN_BIN_ID && 
           API_CONFIG.JSONBIN_BIN_ID !== 'YOUR_BIN_ID_HERE' &&
           API_CONFIG.JSONBIN_BIN_ID.length >= 20;
  }

  // Obter status da configuração
  getConfigStatus() {
    if (this.isApiConfigured()) {
      return { 
        configured: true, 
        message: '✅ API configurada - Exclusões globais ativas' 
      };
    } else {
      return { 
        configured: false, 
        message: '⚠️ API não configurada - Exclusões apenas locais' 
      };
    }
  }

  // Testar conexão com a API
  async testApiConnection() {
    try {
      const response = await fetch(`${API_CONFIG.JSONBIN_BASE_URL}/b/${API_CONFIG.JSONBIN_BIN_ID}/latest`, {
        method: 'GET',
        headers: {
          'X-Master-Key': API_CONFIG.JSONBIN_API_KEY,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        return { success: true, data };
      } else {
        const errorText = await response.text();
        return { success: false, error: `${response.status}: ${errorText}` };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

// Instância global do gerenciador
window.rankingManager = new RankingManager();
