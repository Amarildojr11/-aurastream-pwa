importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

self.addEventListener('install', function(event) {
    self.skipWaiting();
});

self.addEventListener('activate', function(event) {
    event.waitUntil(clients.claim());
});

const firebaseConfig = {
    apiKey: "AIzaSyDEO5nLd-ISxSg4eWlukljLH6j7LMH-9W4",
    authDomain: "aurastreamweb-6b3e7.firebaseapp.com",
    databaseURL: "https://aurastreamweb-6b3e7-default-rtdb.firebaseio.com",
    projectId: "aurastreamweb-6b3e7",
    storageBucket: "aurastreamweb-6b3e7.firebasestorage.app",
    messagingSenderId: "547860658417",
    appId: "1:547860658417:web:acfcb7a1415805a4789150",
    measurementId: "G-7RFD5KWBRT"
};

// Apenas inicializa, não intercepta onBackgroundMessage
const messaging = firebase.messaging();

// TRATAMENTO EXCLUSIVO DE CLIQUE NA NOTIFICAÇÃO DO SISTEMA
self.addEventListener('notificationclick', function(event) {
    // 1. Fecha a notificação
    event.notification.close(); 
    
    const targetUrl = '/?tab=alarms';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(windowClients) {
            // 2. Tenta focar numa aba existente do aplicativo
            for (let i = 0; i < windowClients.length; i++) {
                let client = windowClients[i];
                if (client.url && 'focus' in client) {
                    client.postMessage({ type: 'SWITCH_TAB', tab: 'alarms' });
                    return client.focus();
                }
            }
            // 3. Se o app estiver 100% fechado (kill state), abre uma nova janela
            if (clients.openWindow) {
                return clients.openWindow(targetUrl);
            }
        })
    );
});