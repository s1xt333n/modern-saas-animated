/**
 * ⚠️  CONFIGURATION FIREBASE - SÉCURITÉ
 * 
 * Les valeurs ci-dessous sont FICTIVES pour des raisons de sécurité.
 * 
 * AVANT D'UTILISER CE PROJET :
 * 1. Créez votre projet Firebase sur https://console.firebase.google.com/
 * 2. Remplacez toutes les valeurs ci-dessous par vos vraies clés
 * 3. Configurez l'authentification dans votre console Firebase
 * 4. Ajoutez votre domaine dans les domaines autorisés
 * 
 * NE JAMAIS commiter vos vraies clés Firebase sur un repository public !
 */

// Configuration Firebase - Remplacez par vos vraies valeurs
const firebaseConfig = {
  apiKey: "your_firebase_api_key_here",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.firebasestorage.app",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789012345",
  measurementId: "G-XXXXXXXXXX"
};

// Initialiser Firebase
try {
  // Vérifier si Firebase est déjà initialisé
  if (!firebase.apps.length) {
    const app = firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    
    console.log('Firebase initialisé avec succès');
    
    // Stocker les références dans l'objet window
    window.firebaseApp = app;
    window.firebaseAuth = auth;
  } else {
    console.log('Firebase déjà initialisé');
    window.firebaseApp = firebase.app();
    window.firebaseAuth = firebase.auth();
  }
} catch (error) {
  console.error('Erreur lors de l\'initialisation de Firebase:', error);
}

// Fonction pour vérifier l'état d'authentification
function checkAuthStatus() {
  try {
    const user = window.firebaseAuth?.currentUser;
    if (user) {
      console.log('Utilisateur connecté:', user.email);
      return true;
    } else {
      console.log('Aucun utilisateur connecté');
      return false;
    }
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'authentification:', error);
    return false;
  }
}

// Gestion de l'authentification
if (window.firebaseAuth) {
  window.firebaseAuth.onAuthStateChanged((user) => {
    if (user) {
      console.log('Utilisateur connecté:', user.email);
    } else {
      console.log('Aucun utilisateur connecté');
      // Afficher un message de déconnexion au lieu de rediriger automatiquement
      console.log('Redirection vers la page d\'index');
    }
  });
}