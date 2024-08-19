import React, {
    useRef,
    useState,
    forwardRef,
    createContext,
    useContext,
} from "react";
import { HiCheck } from "react-icons/hi";
import { Toast } from "flowbite-react";

const ToastContext = createContext();

const ToggleButton = forwardRef((props, ref) => (
    <div ref={ref} className="flex items-center">
        <Toast.Toggle className="hover:text-red-500" />
    </div>
));

export const ToastProvider = ({ children }) => {
    const toggle = useRef(null);
    const [toast, setToast] = useState(null);
    const [toastError, setToastError] = useState(false);

    const showToast = (message, isError = false) => {
        setToast(message);
        setToastError(isError);
        setTimeout(() => {
            if (toggle.current) {
                toggle.current.querySelector("button").click();
            }
        }, 3000);
        setTimeout(() => {
            if (toast) {
                setToast(null);
                setToastError(false);
            }
        }, 4000);
    };

    return (
        <ToastContext.Provider
            value={{ toast, setToast, toastError, setToastError, showToast }}
        >
            {toast && (
                <div className="fixed bottom-20 left-[50%] -translate-x-1/2 z-50 min-w-[400px]">
                    <Toast
                        className={`border-x-4 ${
                            toastError ? "border-secondary" : "border-accent"
                        } shadow-2xl flex justify-between items-center min-h-20`}
                    >
                        <div
                            className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                                toastError
                                    ? "bg-secondary-100 text-secondary-500"
                                    : "bg-green-100 text-green-500"
                            } me-2`}
                        >
                            <HiCheck className="h-5 w-5" />
                        </div>
                        <div className="ml-3 text-base text-gray-800 font-bold">
                            {toast}
                        </div>
                        <ToggleButton ref={toggle} />
                    </Toast>
                </div>
            )}
            {children}
        </ToastContext.Provider>
    );
};

const useToast = () => useContext(ToastContext);

export default Notification = () => {
    return <></>;
};
