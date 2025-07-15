import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Show a confirmation toast and return a Promise<boolean>
 * that resolves TRUE if the user clicks Yes.
 */
export const confirmToast = (message = "Are you sure?") => {
  return new Promise((resolve) => {
    const id = toast(
      ({ closeToast }) => (
        <div>
          <p className="mb-2">{"Are You Sure ?" + message}</p>
          <button
            className="btn btn-sm btn-danger me-2"
            onClick={() => {
              resolve(true); // user confirmed
              closeToast(); // dismiss toast
            }}
          >
            Yes
          </button>
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => {
              resolve(false); // user cancelled
              closeToast();
            }}
          >
            Cancel
          </button>
        </div>
      ),
      { closeOnClick: false, autoClose: false } // stay open until user acts
    );
  });
};
