import toast from "react-hot-toast";

// sometimes react-hot-toast notifications persist when they shouldn't
// this function removes them without animations when a user navigates to another app component
function removeToastNotificationsOnMount() {
  return toast.remove();
};

export {
  removeToastNotificationsOnMount,
};