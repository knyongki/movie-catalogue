const NotificationHelper = {
  sendNotification({ title, options }) {
    if (!this._checkAvilability()) {
      console.log('Notification not supported in this browser');
      return;
    }

    if (!this._checkPremission()) {
      console.log('User did not yet granted premission');
      this._requestPermission();
      return;
    }

    this._showNotification({ title, options });
  },

  _checkAvilability() {
    return 'Notification' in window;
  },

  _checkPremission() {
    return Notification.permission === 'granted';
  },

  async _requestPermission() {
    const status = await Notification.requestPermission();

    if (status === 'denied') {
      console.log('Notification Denied');
    }

    if (status ===  'default') {
      console.log('Premission closed');
    }
  },

  async _showNotification({ title, options }) {
    const serviceWorkerRegisteration = await navigator.serviceWorker.ready;
    serviceWorkerRegisteration.showNotification(title, options);
  }
};

export default NotificationHelper;