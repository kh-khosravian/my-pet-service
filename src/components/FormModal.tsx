"use client";

import { useState, ReactNode } from "react";

interface FormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<void> | void; // pass FormData
  children: ReactNode;
  title?: string;
}

export const FormModal: React.FC<FormModalProps> = ({
  onSubmit,
  onClose,
  open,
  children,
  title = "Form modal",
}) => {
  const [loading, setLoading] = useState(false);
  if (!open) return null;

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-900" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 z-10">
        <div className="flex justify-between items-center mb-4 items-center">
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
          <div className="text-xl mb-4 hover:font-semibold" onClick={onClose}>
            <span className="text-2xl cursor-pointer">&times;</span>
          </div>
        </div>

        <form action={handleSubmit} className="space-y-5">
          {children}

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              className="px-4 py-2 rounded-lg border bg-red-600 text-white hover:bg-red-700 transition duration-200 cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-green-600 text-white disabled:opacity-50 hover:bg-green-700 transition duration-200 cursor-pointer"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
