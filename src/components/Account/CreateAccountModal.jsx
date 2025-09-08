import React, { useEffect, useState } from "react";
import { X, Plus } from "lucide-react";
import { getAllBranches } from "../../api/AccountsApi";

const CreateAccountModal = ({ isOpen, onClose, onCreateAccount }) => {
  const [branches, setBranches] = useState([])
  const [formData, setFormData] = useState({
    type: "savings",
    branch: "",
    accountHolderName: "",
    initialBalance: 0,
  });

  const [errors, setErrors] = useState({});


  useEffect(() => {
    getAllBranches()
      .then((res) => {
        console.log("Branches fetched:", res.data);
        setBranches(res.data);
      })
      .catch((err) => {
        console.error("Error fetching branches:", err);
      });
  }, []);
  

  const validateForm = () => {
    const newErrors = {};

    if (!formData.accountHolderName.trim()) {
      newErrors.accountHolderName = "Account holder name is required";
    }

    if (!formData.branch) {
      newErrors.branch = "Branch selection is required";
    }

    if (formData.initialBalance < 0) {
      newErrors.initialBalance = "Initial balance must be positive";
    }

    if (formData.type === "savings" && formData.initialBalance < 500) {
      newErrors.initialBalance =
        "Minimum balance for savings account is ₹500";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onCreateAccount(formData);
      setFormData({
        type: "savings",
        branch: "",
        accountHolderName: "",
        initialBalance: 0,
      });
      setErrors({});
      onClose();
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Open New Account
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleInputChange("type", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="savings">Savings Account</option>
              <option value="salary">Salary Account</option>
              <option value="current">Current Account</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Holder Name
            </label>
            <input
              type="text"
              value={formData.accountHolderName}
              onChange={(e) =>
                handleInputChange("accountHolderName", e.target.value)
              }
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.accountHolderName ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Enter full name"
            />
            {errors.accountHolderName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.accountHolderName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Branch
            </label>
            <select
              value={formData.branch}
              onChange={(e) => handleInputChange("branch", e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.branch ? "border-red-300" : "border-gray-300"
              }`}
            >
              <option value="">Select Branch</option>
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
            {errors.branch && (
              <p className="text-red-500 text-xs mt-1">{errors.branch}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Initial Balance (₹)
            </label>
            <input
              type="number"
              value={formData.initialBalance}
              onChange={(e) =>
                handleInputChange(
                  "initialBalance",
                  parseFloat(e.target.value) || 0
                )
              }
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.initialBalance ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="0.00"
              min="0"
              step="0.01"
            />
            {errors.initialBalance && (
              <p className="text-red-500 text-xs mt-1">
                {errors.initialBalance}
              </p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              {formData.type === "savings" && "Minimum balance: ₹500"}
              {formData.type === "current" && "No minimum balance required"}
              {formData.type === "salary" && "No minimum balance required"}
            </p>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccountModal;
