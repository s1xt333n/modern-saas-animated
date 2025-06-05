// Router pour gérer les routes de l'application
let currentRoute = '/';

// Fonction pour naviguer manuellement
function navigateTo(path) {
  currentRoute = path;
  // Mettre à jour l'URL dans l'historique du navigateur
  window.history.pushState({}, '', path);
  
  // Charger le contenu approprié
  loadContent(path);
}

// Fonction pour charger le contenu en fonction de la route
function loadContent(path) {
  // Gérer les différentes routes
  switch (path) {
    case '/':
    case '/index.html':
      // Afficher la page d'accueil
      break;
    case '/dashboard.html':
      // Vérifier si l'utilisateur est connecté
      if (window.firebaseAuth?.currentUser) {
        // Afficher le dashboard
      } else {
        // Afficher un message ou rediriger vers la page de connexion
        showNotification('Veuillez vous connecter pour accéder au tableau de bord');
      }
      break;
    default:
      // Gérer les routes inconnues
      console.log('Route inconnue:', path);
  }
}

// Écouter les changements d'URL
window.addEventListener('popstate', (event) => {
  loadContent(window.location.pathname);
});

// Exporter les fonctions pour une utilisation dans d'autres fichiers
window.navigateTo = navigateTo;
window.loadContent = loadContent;
