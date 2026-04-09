import { toast } from "react-toastify";
import { ToastContext } from "./createContext";

export default function ToastProvider({ children }) {
  //methods for feedback
  const showSuccessFeedback = (
    message,
    position = "bottom-left",
    theme = "colored",
  ) => {
    return toast.success(message, { position, theme });
  };

  const showErrorFeedback = (
    message,
    position = "bottom-left",
    theme = "colored",
  ) => {
    return toast.error(message, { position, theme });
  };

  const showInfoFeedback = (
    message,
    position = "bottom-left",
    theme = "colored",
  ) => {
    return toast.info(message, { position, theme });
  };

  return (
    <ToastContext.Provider
      //shared value across components
      value={{ showSuccessFeedback, showErrorFeedback, showInfoFeedback }}
    >
      {children}
    </ToastContext.Provider>
  );
}
