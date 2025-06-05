// Fonction pour gérer les popups des statistiques
document.addEventListener('DOMContentLoaded', function() {
    // Ajouter un écouteur d'événements pour chaque carte
    const statCards = document.querySelectorAll('.stat-popup');
    
    statCards.forEach(card => {
        const parent = card.closest('.group');
        
        // Afficher le popup au survol
        parent.addEventListener('mouseenter', function(e) {
            const rect = e.currentTarget.getBoundingClientRect();
            const popup = e.currentTarget.querySelector('.stat-popup');
            
            // Calculer la position du popup
            popup.style.left = `${rect.left + (rect.width / 2)}px`;
            popup.classList.add('active');
        });
        
        // Cacher le popup quand on quitte
        parent.addEventListener('mouseleave', function() {
            const popup = this.querySelector('.stat-popup');
            popup.classList.remove('active');
        });
    });
});
