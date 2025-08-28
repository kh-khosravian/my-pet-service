"use client";

import React, { useState } from "react";
import { FormModal } from "@/components/FormModal";

interface clientInsertFormProps {
  action: (formData: FormData) => Promise<void>; // server action passed in
}

export const InsertClientModal: React.FC<clientInsertFormProps> = ({
  action,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        New Client
      </button>

      <FormModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={action}
        title="Add New Client"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="displayName"
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="phone"
            name="phone"
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            type="address"
            name="address"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <input
            type="city"
            name="city"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Country</label>
          <input
            type="country"
            name="country"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Postal Code (Zip Code)
          </label>
          <input
            type="zipCode"
            name="zipCode"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <select
            id="gender"
            name="gender"
            className="block w-full py-2 text-base border border-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-sm rounded-md"
          >
            <option value="">Select</option>
            <option value="Male"> Male </option>
            <option value="Female"> Female </option>
          </select>
        </div>
      </FormModal>
    </>
  );
};
