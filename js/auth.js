// Check if Firebase is already initialized
let firebaseApp = window.firebaseApp;
let auth = window.firebaseAuth;

if (!firebaseApp || !auth) {
  console.error('Firebase not initialized. Check that firebase-config.js is loaded before this file.');
  // (return removed, it should not be at the root of the file);
}

console.log('Using already initialized Firebase');

// Logout function
async function handleLogout() {
  try {
    console.log('Starting logout...');
    
    await auth.signOut();
    console.log('Logout successful');
    
    // Reset login counter
    localStorage.removeItem('loginCount');
    console.log('Login counter reset');
    
    // Redirect to index page
    window.location.href = 'index.html';
  } catch (error) {
    console.error('Error during logout:', error);
    alert('An error occurred during logout.');
  }
}

// Export function for use in other files
window.handleLogout = handleLogout;

// Authentication management on DOM load
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded');
  
  // Check if Firebase is initialized
  if (!firebaseApp || !auth) {
    console.error('Firebase not initialized');
    // (return removed, it should not be at the root of the file);
  }

  // Check authentication state
  auth.onAuthStateChanged(user => {
    if (user) {
      console.log('User logged in:', user.email);
      
      // Update UI with user information
      const userDisplay = document.querySelector('.user-display');
      if (userDisplay) {
        userDisplay.innerHTML = `
          <div class="text-left">
            <p class="text-sm font-medium text-gray-900">${user.displayName || user.email}</p>
            <p class="text-xs text-gray-500">${user.email}</p>
          </div>
        `;
      }
    } else {
      console.log('User not logged in');
      // Display error message if necessary
      if (document.getElementById('notification')) {
        showNotification('Please log in to access this page');
      }
    }
  });

  // Logout management
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    console.log('Logout button found');
    
    logoutBtn.addEventListener('click', async function(e) {
      e.preventDefault();
      console.log('Click on logout button');
      await handleLogout();
    });
  } else {
    console.error('Logout button not found in DOM');
  }
});
