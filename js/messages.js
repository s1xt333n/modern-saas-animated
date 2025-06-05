// Advanced JS to make all buttons functional on messages.html

document.addEventListener('DOMContentLoaded', function() {
  // --- Simulated data for conversations ---
  const conversations = [
    {
      id: 1,
      name: 'Julien Martin',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      badge: 'VIP',
      badgeColor: 'bg-yellow-200 text-yellow-700',
      lastMsg: 'Merci pour l’envoi du doc, je regarde ça !',
      lastTime: '16:08',
      unread: 2,
      messages: [
        { from: 'julien', text: 'Salut, tu as eu le temps de checker le doc ?', time: '16:05' },
        { from: 'me', text: 'Yes nickel, je t’envoie un retour détaillé ce soir !', time: '16:07' },
        { from: 'julien', text: 'Merci, à plus tard !', time: '16:08' }
      ]
    },
    {
      id: 2,
      name: 'Claire Dubois',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      badge: 'Nouveau',
      badgeColor: 'bg-blue-100 text-blue-800',
      lastMsg: 'Tu es dispo pour call demain ?',
      lastTime: '15:51',
      unread: 1,
      messages: [
        { from: 'claire', text: 'Tu es dispo pour call demain ?', time: '15:51' }
      ]
    },
    {
      id: 3,
      name: 'Mehdi Benali',
      avatar: 'https://randomuser.me/api/portraits/men/21.jpg',
      badge: 'Pro',
      badgeColor: 'bg-green-100 text-green-800',
      lastMsg: 'Voici le rapport demandé 👍',
      lastTime: 'Hier',
      unread: 3,
      messages: [
        { from: 'mehdi', text: 'Voici le rapport demandé 👍', time: 'Hier' }
      ]
    }
  ];
  let currentConvId = 1;

  // --- Sélection d’une conversation ---
  function renderConversationPane(conv) {
    const pane = document.querySelector('.main-content section > section');
    if (!pane) return;
    // Header
    pane.querySelector('.avatar').src = conv.avatar;
    pane.querySelector('.font-semibold.text-gray-900').textContent = conv.name;
    pane.querySelector('.ml-1.text-xs').textContent = conv.badge;
    pane.querySelector('.ml-1.text-xs').className = `ml-1 text-xs ${conv.badgeColor} rounded px-2 py-0.5 font-bold`;
    // Historique
    const histo = pane.querySelector('.flex-1.overflow-y-auto');
    histo.innerHTML = '';
    conv.messages.forEach(msg => {
      if (msg.from === 'me') {
        histo.innerHTML += `<div class="flex items-end gap-3 justify-end">
          <div><div class="bubble-sent">${msg.text}</div><div class="text-xs text-gray-400 text-right mr-2">${msg.time}</div></div>
          <img src="https://randomuser.me/api/portraits/women/44.jpg" class="avatar mt-1" alt="Avatar">
        </div>`;
      } else {
        histo.innerHTML += `<div class="flex items-start gap-3">
          <img src="${conv.avatar}" class="avatar mt-1" alt="Avatar">
          <div><div class="bubble-received">${msg.text}</div><div class="text-xs text-gray-400 ml-2">${msg.time}</div></div>
        </div>`;
      }
    });
    histo.scrollTop = histo.scrollHeight;
  }

  function selectConversation(id) {
    currentConvId = id;
    const conv = conversations.find(c => c.id === id);
    renderConversationPane(conv);
    // Marquer comme lu
    conv.unread = 0;
    renderInbox();
  }

  // --- Inbox dynamique ---
  function renderInbox(filter = '') {
    const inbox = document.querySelector('.inbox-conv-btn').parentNode;
    inbox.innerHTML = '';
    conversations.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()) || c.lastMsg.toLowerCase().includes(filter.toLowerCase())).forEach(conv => {
      const btn = document.createElement('button');
      btn.className = 'w-full flex items-center gap-3 px-4 py-3 hover:bg-black/90 hover:text-white transition rounded-xl group relative focus:outline-none inbox-conv-btn';
      btn.innerHTML = `
        <img src="${conv.avatar}" class="avatar" alt="Avatar">
        <div class="flex-1 min-w-0 text-left">
          <div class="flex items-center gap-2">
            <span class="font-semibold">${conv.name}</span>
            <span class="ml-1 text-xs ${conv.badgeColor} rounded px-2 py-0.5 font-bold">${conv.badge}</span>
          </div>
          <div class="text-xs truncate opacity-80">${conv.lastMsg}</div>
        </div>
        <div class="flex flex-col items-end gap-1">
          <span class="text-xs opacity-60">${conv.lastTime}</span>
          ${conv.unread ? `<span class="inline-block bg-black text-white text-xs rounded-full px-2">${conv.unread}</span>` : ''}
        </div>
      `;
      btn.onclick = () => selectConversation(conv.id);
      inbox.appendChild(btn);
    });
  }

  // --- Envoi de message ---
  const form = document.querySelector('form');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const input = form.querySelector('input[type="text"]');
    const txt = input.value.trim();
    if (!txt) return;
    const conv = conversations.find(c => c.id === currentConvId);
    conv.messages.push({ from: 'me', text: txt, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
    input.value = '';
    renderConversationPane(conv);
  });

  // --- Nouveau message ---
  document.querySelector('.btn-message.flex.items-center.gap-2').onclick = function() {
    // Réinitialiser la conversation à vide pour démo
    const pane = document.querySelector('.main-content section > section');
    pane.querySelector('.avatar').src = 'https://randomuser.me/api/portraits/men/32.jpg';
    pane.querySelector('.font-semibold.text-gray-900').textContent = 'Nouveau contact';
    pane.querySelector('.ml-1.text-xs').textContent = '';
    const histo = pane.querySelector('.flex-1.overflow-y-auto');
    histo.innerHTML = '<div class="text-gray-400 text-center">Commencez une nouvelle conversation…</div>';
  };

  // --- Favoris, archiver, supprimer ---
  document.querySelector('.fa-star').parentNode.onclick = function() {
    alert('Ajouté aux favoris !');
  };
  document.querySelector('.fa-archive').parentNode.onclick = function() {
    alert('Conversation archivée !');
  };
  document.querySelector('.fa-trash').parentNode.onclick = function() {
    if (confirm('Supprimer cette conversation ?')) {
      const idx = conversations.findIndex(c => c.id === currentConvId);
      if (idx !== -1) {
        conversations.splice(idx, 1);
        if (conversations.length) {
          selectConversation(conversations[0].id);
        } else {
          document.querySelector('.main-content section > section .flex-1.overflow-y-auto').innerHTML = '<div class="text-gray-400 text-center">Aucune conversation</div>';
        }
        renderInbox();
      }
    }
  };
  document.querySelector('.fa-ellipsis-v').parentNode.onclick = function() {
    alert('Menu actions avancées à venir !');
  };

  // --- Filtre de recherche ---
  document.querySelector('input[placeholder="Rechercher..."]').addEventListener('input', function(e) {
    renderInbox(e.target.value);
  });

  // --- Pièce jointe et emoji ---
  form.querySelector('.fa-paperclip').parentNode.onclick = function(e) {
    e.preventDefault();
    alert('Fonction pièce jointe à venir !');
  };
  form.querySelector('.fa-smile').parentNode.onclick = function(e) {
    e.preventDefault();
    alert('Sélecteur d’emoji à venir !');
  };

  // --- Initialisation ---
  renderInbox();
  selectConversation(currentConvId);
});
