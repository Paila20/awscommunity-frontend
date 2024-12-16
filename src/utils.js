import { toast } from 'react-toastify';

export const handleSuccess = (msg) => {
    toast.success(msg, {
        position: 'top-right'
    })
}

export const handleError = (msg) => {
    toast.error(msg, {
        position: 'top-right'
    })
}

export const timeStampConversionToDateAndTime = (timestamp) => {
    if (timestamp) {
      const now = new Date();
      const date = new Date(timestamp);
      const diff = now - date;
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const weeks = Math.floor(days / 7);
  
      if (weeks > 0) {
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
      } else if (days > 0) { 
        return `${days} day${days > 1 ? 's' : ''} ago`;
      } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
      } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      } else {
        return 'Just now';
      }
    } else {
      return '';
    }
  };
  
  export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };