// Firebase initialization check
if (typeof firebase === 'undefined' || !firebase.apps.length) {
  console.error('Firebase is not properly initialized');
  showNotification('Configuration Error', 'An error occurred while loading the application.', 'error');
}

// DOM element references
const loadingOverlay = document.getElementById('loading-overlay');
const userAvatar = document.getElementById('user-avatar');
const userAvatarImg = userAvatar ? userAvatar.querySelector('img') : null;
const userAvatarInitial = userAvatar ? userAvatar.querySelector('#user-avatar-initial') : null;
const userNameElements = document.querySelectorAll('#user-name, #header-user-name');
const userEmailElements = document.querySelectorAll('#user-email, #header-user-email');
const logoutButtons = document.querySelectorAll('#logout-btn, #dropdown-logout-btn');
// Place this line at the top of the file, before any usage:
const notification = document.getElementById('notification');
const notificationMessage = document.getElementById('notification-message');
const recentContacts = document.getElementById('recent-contacts');

// Show loading
function showLoading() {
  if (loadingOverlay) loadingOverlay.classList.remove('hidden');
}

// Hide loading
function hideLoading() {
  if (loadingOverlay) loadingOverlay.classList.add('hidden');
}

// Show notification
function showNotification(title, message, type = 'success') {
  if (!notification) return;
  
  const icon = notification.querySelector('.notification-icon');
  const titleElement = notification.querySelector('h4');
  
  // Update content
  titleElement.textContent = title;
  notificationMessage.textContent = message;
  
  // Update style based on type
  notification.className = 'notification';
  notification.classList.add(type);
  
  // Update icon
  icon.className = `fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} notification-icon`;
  
  // Show notification
  notification.classList.add('show');
  
  // Hide after 5 seconds
  setTimeout(() => {
    notification.classList.remove('show');
  }, 5000);
}

// Gérer la déconnexion
async function handleLogout() {
  try {
    showLoading();
    await firebase.auth().signOut();
    hideLoading();
    window.location.href = 'index.html';
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    showNotification('Erreur', 'Une erreur est survenue lors de la déconnexion.', 'error');
    hideLoading();
  }
}

// Mettre à jour l'interface pour un utilisateur non authentifié
function updateUIForUnauthenticatedUser() {
  // Cacher les éléments réservés aux utilisateurs connectés
  const protectedElements = document.querySelectorAll('[data-protected]');
  protectedElements.forEach(el => {
    el.style.display = 'none';
  });
  
  // Afficher un message de déconnexion réussie
  showNotification('Déconnexion réussie', 'Vous avez été déconnecté avec succès.', 'success');
  
  // Mettre à jour l'en-tête
  const headerTitle = document.querySelector('.header-title');
  if (headerTitle) {
    headerTitle.textContent = 'Connectez-vous pour accéder à votre tableau de bord';
  }
}

// Mettre à jour l'interface utilisateur avec les informations de l'utilisateur
function updateUserUI(user) {
  // Affichage debug
  console.log('[updateUserUI] Utilisateur connecté :', user);
  // Nom et email
  userNameElements.forEach(el => el.textContent = user.displayName || (user.email ? user.email.split('@')[0] : 'Utilisateur'));
  userEmailElements.forEach(el => el.textContent = user.email || '');
  // Avatar
  if (user.photoURL && userAvatarImg) {
    userAvatarImg.src = user.photoURL;
    userAvatarImg.classList.remove('hidden');
    if (userAvatarInitial) userAvatarInitial.classList.add('hidden');
  } else if (userAvatarInitial) {
    userAvatarInitial.textContent = (user.displayName ? user.displayName[0] : (user.email ? user.email[0] : 'U')).toUpperCase();
    userAvatarInitial.classList.remove('hidden');
    if (userAvatarImg) userAvatarImg.classList.add('hidden');
  }
}

// Charger les contacts récents (exemple avec des données statiques pour l'instant)
function loadRecentContacts() {
  if (!recentContacts) return;
  
  // Données de démonstration
  const demoContacts = [
    { name: 'Jean Dupont', email: 'jean@example.com', status: 'Actif', lastActivity: 'Il y a 2 heures' },
    { name: 'Marie Martin', email: 'marie@example.com', status: 'En attente', lastActivity: 'Il y a 1 jour' },
    { name: 'Pierre Durand', email: 'pierre@example.com', status: 'Inactif', lastActivity: 'Il y a 3 jours' },
    { name: 'Sophie Petit', email: 'sophie@example.com', status: 'Actif', lastActivity: 'Il y a 5 heures' },
    { name: 'Lucas Moreau', email: 'lucas@example.com', status: 'Actif', lastActivity: 'Il y a 1 heure' }
  ];
  
  // Vider le contenu actuel
  recentContacts.innerHTML = '';
  
  // Ajouter chaque contact
  demoContacts.forEach(contact => {
    const row = document.createElement('tr');
    row.className = 'hover:bg-gray-50';
    
    // Déterminer la classe du statut
    let statusClass = 'bg-gray-100 text-gray-800';
    if (contact.status === 'Actif') statusClass = 'bg-green-100 text-green-800';
    else if (contact.status === 'Inactif') statusClass = 'bg-red-100 text-red-800';
    
    row.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="flex items-center">
          <div class="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
            ${contact.name.charAt(0).toUpperCase()}
          </div>
          <div class="ml-4">
            <div class="text-sm font-medium text-gray-900">${contact.name}</div>
            <div class="text-sm text-gray-500">${contact.email}</div>
          </div>
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        ${contact.email}
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}">
          ${contact.status}
        </span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        ${contact.lastActivity}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <a href="#" class="text-blue-600 hover:text-blue-900 mr-4">Voir</a>
        <a href="#" class="text-indigo-600 hover:text-indigo-900">Éditer</a>
      </td>
    `;
    
    recentContacts.appendChild(row);
  });
}

// Initialiser les graphiques
function initCharts() {
  // --- Données fictives pour chaque période ---
  const dataByPeriod = {
    7: {
      labels: ['Jour 1', 'Jour 2', 'Jour 3', 'Jour 4', 'Jour 5', 'Jour 6', 'Jour 7'],
      datasets: [
        {
          label: 'Nouveaux contacts',
          data: [12, 15, 10, 14, 13, 16, 18],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.3,
          fill: true
        },
        {
          label: 'Visiteurs',
          data: [30, 28, 35, 32, 31, 36, 40],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.3,
          fill: true
        }
      ]
    },
    30: {
      labels: Array.from({length: 30}, (_, i) => `Jour ${i+1}`),
      datasets: [
        {
          label: 'Nouveaux contacts',
          data: [12, 15, 10, 14, 13, 16, 18, 20, 19, 22, 21, 23, 25, 24, 26, 27, 28, 29, 30, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.3,
          fill: true
        },
        {
          label: 'Visiteurs',
          data: [30, 28, 35, 32, 31, 36, 40, 42, 41, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.3,
          fill: true
        }
      ]
    },
    90: {
      labels: Array.from({length: 13}, (_, i) => `Semaine ${i+1}`),
      datasets: [
        {
          label: 'Nouveaux contacts',
          data: [80, 85, 90, 95, 100, 110, 120, 115, 125, 130, 135, 140, 145],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.3,
          fill: true
        },
        {
          label: 'Visiteurs',
          data: [200, 210, 220, 230, 240, 250, 260, 255, 265, 270, 275, 280, 285],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.3,
          fill: true
        }
      ]
    }
  };

  // --- Initialisation du graphique ---
  const performanceCtx = document.getElementById('performanceChart');
  let performanceChartInstance = null;

  function renderPerformanceChart(period = 7) {
    const chartData = dataByPeriod[period];
    if (performanceChartInstance) {
      performanceChartInstance.data = chartData;
      performanceChartInstance.update();
    } else if (performanceCtx) {
      performanceChartInstance = new Chart(performanceCtx, {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'top' },
            tooltip: { mode: 'index', intersect: false }
          },
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    }
  }

  // --- Gestion du select ---
  const select = document.getElementById('performancePeriod');
  if (select) {
    select.addEventListener('change', function() {
      const value = parseInt(this.value, 10);
      renderPerformanceChart(value);
    });
    renderPerformanceChart(parseInt(select.value, 10) || 7);
  }
  // (Graphique de performance géré dynamiquement plus haut)
  
  // Graphique des sources de trafic
  const trafficCtx = document.getElementById('trafficSourcesChart');
  if (trafficCtx) {
    new Chart(trafficCtx, {
      type: 'doughnut',
      data: {
        labels: ['Direct', 'Moteurs de recherche', 'Réseaux sociaux', 'Emails', 'Autres'],
        datasets: [{
          data: [30, 40, 15, 10, 5],
          backgroundColor: [
            '#3b82f6',
            '#10b981',
            '#f59e0b',
            '#8b5cf6',
            '#6b7280'
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
          }
        },
        cutout: '70%'
      }
    });
  }
}

// Initialisation de la barre latérale
function initSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const mainContent = document.querySelector('.main-content');
  
  if (sidebarToggle && sidebar && mainContent) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('sidebar-collapsed');
      mainContent.classList.toggle('main-content-expanded');
    });
  }

  // Gérer le menu utilisateur
  const userMenuButton = document.getElementById('user-menu');
  const userDropdown = document.getElementById('user-dropdown');

  if (userMenuButton && userDropdown) {
    userMenuButton.addEventListener('click', (e) => {
      e.stopPropagation();
      userDropdown.classList.toggle('hidden');
    });
    // Fermer le menu en cliquant ailleurs
    document.addEventListener('click', (e) => {
      if (!userMenuButton.contains(e.target) && !userDropdown.contains(e.target)) {
        userDropdown.classList.add('hidden');
      }
    });
  }

  // Gérer les actions du dropdown
  const dropdownProfile = document.getElementById('dropdown-profile');
  const dropdownSettings = document.getElementById('dropdown-settings');
  const dropdownLogoutBtn = document.getElementById('dropdown-logout-btn');

  if (dropdownProfile) {
    dropdownProfile.onclick = () => {
      window.location.href = 'parametres.html';
    };
  }
  if (dropdownSettings) {
    dropdownSettings.onclick = () => {
      window.location.href = 'parametres.html';
    };
  }
  if (dropdownLogoutBtn) {
    dropdownLogoutBtn.onclick = handleLogout;
  }
}


// Initialisation de l'application
function initApp() {
  showLoading();
  // Initialiser sidebar/menu AVANT de charger l'utilisateur
  initSidebar();
  // Vérifier l'état d'authentification
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // Utilisateur connecté
      updateUserUI(user);
      loadRecentContacts();
      initCharts();
      // Afficher les éléments protégés
      const protectedElements = document.querySelectorAll('[data-protected]');
      protectedElements.forEach(el => {
        el.style.display = '';
      });
      // Ajouter les écouteurs d'événements
      logoutButtons.forEach(button => {
        button.addEventListener('click', handleLogout);
      });
      hideLoading();
    } else {
      // Utilisateur non connecté, mettre à jour l'interface
      updateUIForUnauthenticatedUser();
      hideLoading();
    }
  });
}


// Démarrer l'application quand le DOM est chargé
document.addEventListener('DOMContentLoaded', initApp);
