 // Notifications
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function NotificationSuccess({ text }) {
  console.log('test');
  toast.success(text, {
    position: 'top-center',
  });
};