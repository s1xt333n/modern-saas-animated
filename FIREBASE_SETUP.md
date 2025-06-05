# Configuration Firebase - Guide développeur

## 🔧 Comment obtenir vos clés Firebase

1. **Créez un projet Firebase**
   - Allez sur https://console.firebase.google.com/
   - Cliquez sur "Ajouter un projet"
   - Suivez les étapes de création

2. **Configurez l'authentification**
   - Dans votre projet Firebase, allez dans "Authentication"
   - Activez les méthodes de connexion souhaitées (Email/Password, Google, etc.)
   - Ajoutez votre domaine dans "Domaines autorisés"

3. **Obtenez vos clés de configuration**
   - Allez dans "Paramètres du projet" (icône engrenage)
   - Descendez jusqu'à "Vos applications"
   - Cliquez sur "Configuration" sous votre app web
   - Copiez les valeurs dans le fichier `.env`

4. **Configuration Firestore (optionnel)**
   - Activez Firestore Database si vous souhaitez stocker des données
   - Configurez les règles de sécurité selon vos besoins

## 🛡️ Sécurité importante

- **JAMAIS** commiter vos vraies clés dans un repository public
- Utilisez toujours des variables d'environnement pour les données sensibles
- Configurez correctement les règles de sécurité Firebase
- Limitez les domaines autorisés dans votre console Firebase

## 📝 Variables d'environnement requises

Copiez `.env.example` vers `.env` et remplissez :

```
VITE_FIREBASE_API_KEY=votre_api_key_firebase
VITE_FIREBASE_AUTH_DOMAIN=votre_projet.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=votre_project_id
VITE_FIREBASE_STORAGE_BUCKET=votre_projet.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=votre_sender_id
VITE_FIREBASE_APP_ID=votre_app_id
VITE_FIREBASE_MEASUREMENT_ID=votre_measurement_id
```

Une fois configuré, remplacez les valeurs dans `js/firebase-config.js` par vos vraies clés.
