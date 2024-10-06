import Swal, { type SweetAlertIcon, type SweetAlertResult } from "sweetalert2";

type AlertOptions = {
  title: string;
  text: string;
  icon?: SweetAlertIcon;
  confirmButtonText?: string;
};

export const useSweetAlert = () => {
  const showAlert = ({
    title,
    text,
    icon = "success",
    confirmButtonText = "OK",
  }: AlertOptions): Promise<SweetAlertResult<unknown>> => {
    return Swal.fire({
      title,
      text,
      icon,
      confirmButtonText,
      customClass: {
        popup: "bg-white text-gray-800 p-4",
        confirmButton: "bg-blue-600 hover:bg-blue-600 text-white",
        cancelButton: "bg-gray-500 hover:bg-blue-600 text-white",
      },
    });
  };

  const showConfirm = ({
    title,
    text,
    icon = "warning",
    confirmButtonText = "Yes",
    cancelButtonText = "Cancel",
  }: AlertOptions & { cancelButtonText?: string }): Promise<
    SweetAlertResult<unknown>
  > => {
    return Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
      customClass: {
        popup: "bg-white text-gray-800 p-4",
        confirmButton: "bg-red-600 hover:bg-blue-600 text-white",
        cancelButton: "bg-gray-500 hover:bg-blue-600 text-white",
      },
    });
  };

  return { showAlert, showConfirm };
};
