import { toast, ToastContent, ToastOptions } from "react-toastify";

const Notify = (
  toastMessage: ToastContent,
  toastOptions: ToastOptions | null,
  toastType: ToastOptions["type"]
) =>
  toast(toastMessage, {
    position: "top-center",
    autoClose: 3 * 1000,
    hideProgressBar: true,
    closeOnClick: true,
    draggable: true,
    progress: 0,
    theme: "colored",
    type: toastType,
    ...toastOptions,
  });

export default Notify;
