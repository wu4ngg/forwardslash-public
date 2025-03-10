"use client";
import { createContext, useContext, useState } from "react";
import Toast from "@/widgets/toast";
import { AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from 'uuid';
type ToastContextType = {
  toast: (title: string, message: string, type: "success" | "error") => void;
  dismiss: (id: string) => void;
  isActive: boolean;
  removeTimeout: (id: string) => void;
  resumeTimeout: (id: string) => void;
};
type Toast = {
  title: string;
  message: string;
  type: "success" | "error";
  timeOut?: NodeJS.Timeout;
  id: string;
};
const ToastContext = createContext<ToastContextType>({
  toast: () => {},
  dismiss: (id: string) => {},
  removeTimeout: (id: string) => {},
  resumeTimeout: (id: string) => {},
  isActive: false,
});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toast = (title: string, message: string, type: "success" | "error") => {
    const id = uuidv4();
    const timeOut = setTimeout(() => {
      dismiss(id);
    }, 3000);
    setToasts((prev) => [...prev, { title, message, type, timeOut, id }]);
  };

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };
  const removeTimeout = (id: string) => {
    clearTimeout(toasts.find((toast) => toast.id === id)?.timeOut);
  };
  const resumeTimeout = (id: string) => {
    const timeOut = setTimeout(() => {
      dismiss(id);
    }, 3000);
    setToasts((prev) => prev.map((toast) => toast.id === id ? { ...toast, timeOut } : toast));
  };
  return (
    <ToastContext.Provider
      value={{ toast, dismiss, isActive: toasts.length > 0, removeTimeout, resumeTimeout }}
    >
      <div className="fixed bottom-8 right-8 flex flex-col gap-4">
        <AnimatePresence>
          {toasts.map((toast) => (
            <Toast
              key={toast.title}
              title={toast.title}
              message={toast.message}
              type={toast.type}
              id={toast.id}
            />
          ))}
        </AnimatePresence>
      </div>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const { toast, dismiss, isActive, removeTimeout, resumeTimeout } = useContext(ToastContext);
  return { toast, dismiss, isActive, removeTimeout, resumeTimeout };
};
