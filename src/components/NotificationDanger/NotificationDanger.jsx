import React from 'react';

// Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationDanger = ({ text }) => {
    toast.error(text, {
      position: 'top-center',
    })
};

export default NotificationDanger;
