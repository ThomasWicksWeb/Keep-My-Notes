import React from 'react';

// Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationSuccess = ({ text }) => {
  console.log('test');
  toast.success(text, {
    position: 'top-center',
  });
};

export default NotificationSuccess;
