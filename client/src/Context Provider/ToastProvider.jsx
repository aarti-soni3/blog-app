import { toast } from "react-toastify";
import { ToastContext } from "./createContext";

export default function ToastProvider({ children }) {
  const showSuccessFeedback = (
    message,
    position = "bottom-left",
    theme = "dark",
  ) => {
    return toast.success(message, { position, theme });
  };

  const showErrorFeedback = (
    message,
    position = "bottom-left",
    theme = "dark",
  ) => {
    return toast.error(message, { position, theme });
  };

  const showInfoFeedback = (
    message,
    position = "bottom-left",
    theme = "dark",
  ) => {
    return toast.info(message, { position, theme });
  };

  return (
    <ToastContext.Provider
      value={{ showSuccessFeedback, showErrorFeedback, showInfoFeedback }}
    >
      {children}
    </ToastContext.Provider>
  );
}
