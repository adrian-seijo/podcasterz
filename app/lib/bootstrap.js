
if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
	navigator.serviceWorker.register('/worker.js');
}
