// Référence au compteur de clients et au conteneur principal des anneaux
let clientCounter = document.getElementById('clientCounter');
const sphereRing = document.getElementById('sphere-ring');
let lastScrollY = window.scrollY;

// Fonction pour afficher une notification
function showNotification(message, type = 'error') {
  const notification = document.getElementById('notification');
  if (!notification) return;
  
  const messageEl = notification.querySelector('.notification-message');
  const titleEl = notification.querySelector('.notification-title');
  const iconEl = notification.querySelector('.notification-icon');
  
  if (messageEl) messageEl.textContent = message;
  if (titleEl) titleEl.textContent = type === 'error' ? 'Erreur' : 'Succès';
  
  if (iconEl) {
    iconEl.className = type === 'error' 
      ? 'fas fa-exclamation-circle notification-icon'
      : 'fas fa-check-circle notification-icon';
  }
  
  notification.classList.remove('hidden');
  
  setTimeout(() => {
    notification.classList.add('hidden');
  }, 5000);
}

// Function to handle login
function handleLogin(event) {
  // Reset redirect flag on each login attempt
  localStorage.removeItem('hasRedirectedToDashboard');
  event.preventDefault();
  
  const email = document.getElementById('login-email')?.value;
  const password = document.getElementById('login-password')?.value;
  const rememberMe = document.getElementById('remember-me')?.checked;
  
  if (!email || !password) {
    showNotification('Please fill in all fields');
    return;
  }
  
  if (!window.firebase || !window.firebase.auth) {
    showNotification('Initialization error. Please refresh the page.');
    return;
  }
  
  const loginButton = document.querySelector('#loginForm button[type="submit"]');
  if (loginButton) {
    loginButton.disabled = true;
    loginButton.textContent = 'Signing in...';
  }
  
  const auth = firebase.auth();
  
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      
      // --- Redirection automatique lors de la première connexion ---
      if (!localStorage.getItem('hasRedirectedToDashboard')) {
        localStorage.setItem('hasRedirectedToDashboard', 'true');
        window.location.href = 'dashboard.html';
        return;
      }
      
      // Check if user is authorized (replace with your logic)
      if (user.email) {
        if (rememberMe) {
          user.getIdToken().then((token) => {
            localStorage.setItem('userToken', token);
            localStorage.setItem('userEmail', user.email);
          });
        }
        
        // Afficher un message de succès
        showNotification('Login successful', 'success');
        if (loginButton) {
          loginButton.disabled = false;
          loginButton.textContent = 'Sign In';
        }
        
        // Mettre à jour l'UI pour indiquer que l'utilisateur est connecté
        const loginBtn = document.querySelector('button[onclick*="toggleLoginModal"]');
        const dashboardBtn = document.querySelector('button[onclick*="dashboard.html"]');
        if (loginBtn && dashboardBtn) {
          loginBtn.style.display = 'none';
          dashboardBtn.style.display = 'inline-block';
        }
      }
    })
    .catch((error) => {
      let errorMessage = 'Une erreur est survenue lors de la connexion';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'Aucun compte trouvé avec cet email';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Mot de passe incorrect';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Trop de tentatives. Réessayez plus tard.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Adresse email invalide';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Erreur de connexion. Vérifiez votre connexion internet.';
          break;
      }
      
      showNotification(errorMessage);
      if (loginButton) {
        loginButton.disabled = false;
        loginButton.textContent = 'Se connecter';
      }
      console.error('Erreur de connexion:', error);
    });
}

// Fonction pour basculer l'affichage du mot de passe
function togglePasswordVisibility(inputId) {
  const passwordInput = document.getElementById(inputId);
  const toggleIcon = document.querySelector(`[onclick*="${inputId}"] i`);
  
  if (passwordInput && toggleIcon) {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      toggleIcon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
      passwordInput.type = 'password';
      toggleIcon.classList.replace('fa-eye-slash', 'fa-eye');
    }
  }
}

// Fonction pour basculer le modal de connexion (globale)
window.toggleLoginModal = function() {
  const modal = document.getElementById('loginModal');
  if (modal) {
    modal.classList.toggle('hidden');
    
    // Réinitialiser le formulaire lors de l'ouverture
    if (!modal.classList.contains('hidden')) {
      const form = document.getElementById('loginForm');
      if (form) form.reset();
    }
  }
};

// Redirection automatique si connecté pour la première fois
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '/index.html') {
  document.addEventListener('DOMContentLoaded', () => {
    if (window.firebase?.auth) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user && !localStorage.getItem('hasRedirectedToDashboard')) {
          localStorage.setItem('hasRedirectedToDashboard', 'true');
          window.location.href = 'dashboard.html';
        }
      });
    }
  });
}
// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
  // Gestion du formulaire de connexion
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
  // Gestion du bouton de fermeture du modal
  const closeButton = document.querySelector('#loginModal .close-button');
  if (closeButton) {
    closeButton.addEventListener('click', toggleLoginModal);
  }
  
  // Fermer le modal en cliquant en dehors
  const modal = document.getElementById('loginModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        toggleLoginModal();
      }
    });
  }
  
  // Vérifier si l'utilisateur est déjà connecté
  if (window.firebase?.auth) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Mettre à jour l'interface utilisateur pour refléter l'état de connexion
        const loginBtn = document.querySelector('button[onclick*="toggleLoginModal"]');
        const dashboardBtn = document.querySelector('button[onclick*="dashboard.html"]');
        if (loginBtn && dashboardBtn) {
          loginBtn.style.display = 'none';
          dashboardBtn.style.display = 'inline-block';
        }
      }
    });
  }
});

// Fermer le modal quand on clique en dehors
window.addEventListener('click', (event) => {
  const modal = document.getElementById('loginModal');
  if (event.target === modal && !modal.classList.contains('hidden')) {
    toggleLoginModal();
  }
});

// Fermer le modal quand on appuie sur la touche Échap
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    const modal = document.getElementById('loginModal');
    if (!modal.classList.contains('hidden')) {
      toggleLoginModal();
    }
  }
});

// Animation du compteur de clients
function animateCounter() {
  const target = 1240;
  const duration = 3000; // 3 secondes
  const start = Date.now();
  
  function updateCounter() {
    const progress = (Date.now() - start) / duration;
    if (progress < 1) {
      const current = Math.round(progress * target);
      clientCounter.textContent = current.toLocaleString();
      requestAnimationFrame(updateCounter);
    } else {
      clientCounter.textContent = target.toLocaleString();
    }
  }
  
  // Démarrer l'animation quand le compteur est visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updateCounter();
        observer.unobserve(clientCounter); // Arrêter l'observation après l'animation
      }
    });
  });

  observer.observe(clientCounter);
}

// Initialiser l'animation du compteur
animateCounter();

// Données pour chaque couche d'anneau : rayon, nombre de portraits, vitesse de rotation
// Les vitesses sont alternées pour la rotation inverse
const ringData = [
  { id: 'ring-layer-1', radius: 120, numPortraits: 12, rotation: 0, speed: 0.08 },
  { id: 'ring-layer-2', radius: 180, numPortraits: 18, rotation: 0, speed: -0.06 }, // Sens inverse
  { id: 'ring-layer-3', radius: 240, numPortraits: 24, rotation: 0, speed: 0.04 },
  { id: 'ring-layer-4', radius: 300, numPortraits: 30, rotation: 0, speed: -0.02 }, // Sens inverse
  { id: 'ring-layer-5', radius: 360, numPortraits: 36, rotation: 0, speed: 0.03 },
  { id: 'ring-layer-6', radius: 420, numPortraits: 42, rotation: 0, speed: -0.015 }  // Nouvelle couche
];

const ringLayers = []; // Tableau pour stocker les références aux éléments de couche d'anneau et leurs données

// Fonction pour créer et positionner les portraits dynamiquement sur des cercles parfaits
function initializePortraits() {
  // Nettoie l'anneau existant avant de recréer (utile pour le redimensionnement)
  sphereRing.innerHTML = '';
  ringLayers.length = 0; // Vide le tableau des couches d'anneaux

  const sphereSize = 56; // Taille des portraits définie dans le CSS .floating-sphere

  ringData.forEach(data => {
    const layerDiv = document.createElement('div');
    layerDiv.id = data.id;
    layerDiv.classList.add('ring-layer');
    sphereRing.appendChild(layerDiv);
    ringLayers.push({ element: layerDiv, data: data });

    // Positionne la couche d'anneau elle-même au centre de son conteneur
    layerDiv.style.width = `${data.radius * 2}px`;
    layerDiv.style.height = `${data.radius * 2}px`;
    layerDiv.style.top = `calc(50% - ${data.radius}px)`;
    layerDiv.style.left = `calc(50% - ${data.radius}px)`;
    layerDiv.style.transformOrigin = 'center center'; // S'assure que la rotation est autour de son centre

    // Crée et positionne les portraits pour cette couche
    for (let i = 0; i < data.numPortraits; i++) {
      const img = document.createElement('img');
      // Utilise randomuser.me pour des images de portrait aléatoires
      // Alternance entre hommes et femmes pour la variété
      const gender = i % 2 === 0 ? 'men' : 'women';
      img.src = `https://randomuser.me/api/portraits/${gender}/${i + 1}.jpg`;
      // Fallback vers placehold.co si l'image randomuser.me ne se charge pas
      img.onerror = function() {
        this.onerror = null; // Empêche la boucle d'erreur infinie
        this.src = `https://placehold.co/${sphereSize}x${sphereSize}/E0E0E0/333333?text=P${i + 1}`;
      };
      img.classList.add('floating-sphere');
      img.alt = `Portrait ${i + 1}`;
      layerDiv.appendChild(img);

      // Calcule l'angle pour positionner le portrait sur le cercle
      const angle = (2 * Math.PI / data.numPortraits) * i;
      const x = data.radius * Math.cos(angle);
      const y = data.radius * Math.sin(angle);

      // Positionne le portrait par rapport au centre de sa couche d'anneau
      // Soustrait la moitié de la taille du portrait pour le centrer sur le point calculé
      img.style.left = `${x + data.radius - sphereSize / 2}px`;
      img.style.top = `${y + data.radius - sphereSize / 2}px`;
    }
  });
}

// Fonction d'animation appelée à chaque frame
function animateSpheres() {
  const currentScrollY = window.scrollY;
  const scrollDelta = currentScrollY - lastScrollY; // Différence de défilement
  lastScrollY = currentScrollY;

  ringLayers.forEach(layer => {
    // Met à jour la rotation de chaque couche en fonction du défilement et de sa vitesse/direction
    layer.data.rotation += scrollDelta * layer.data.speed;
    layer.element.style.transform = `rotate(${layer.data.rotation}deg)`;
  });

  requestAnimationFrame(animateSpheres); // Continue l'animation
}

// Initialise les portraits au chargement de la page
window.onload = function() {
  initializePortraits();
  animateSpheres();
};

// Réinitialise et repositionne les portraits au redimensionnement de la fenêtre
// Cela garantit que les cercles restent parfaits et centrés
window.addEventListener('resize', initializePortraits);

// Fonction pour gérer la déconnexion
async function handleLogout() {
  try {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) loadingOverlay.classList.remove('hidden');
    await firebase.auth().signOut();
    window.location.href = 'index.html';
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    showNotification('Une erreur est survenue lors de la déconnexion.', 'error');
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) loadingOverlay.classList.add('hidden');
  }
}

// Ajout de l'événement click pour le bouton de déconnexion
document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }
});

// Ajoutez la fonction handleLogout ici
