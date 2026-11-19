import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import TokenService from "../../token/tokenService";
import { get, post } from "../authHooks";
import { useCheckPromocode } from "../Payment";

export const extractErrorMessage = (error, defaultMsg = "An error occurred. Please try again.") => {
  const data = error?.response?.data;
  if (typeof data === "string" && data.trim()) return data;
  if (data?.message) return data.message;
  if (data?.error?.message) return data.error.message;
  if (typeof data?.error === "string") return data.error;
  if (data?.msg) return data.msg;

  const status = error?.response?.status;
  if (status === 400) return "Invalid username or password. Please try again.";
  if (status === 401) return "Incorrect password. Please try again.";
  if (status === 403) return "Member under pending approval by admin.";
  if (status === 404) return "Account not found. Please check your credentials.";
  if (status >= 500) return "Server error. Please try again later.";

  if (error?.message && !error.message.includes("status code")) {
    return error.message;
  }

  return defaultMsg;
};

export const useSignupMutation = ()=>{
  const navigate = useNavigate();
  return useMutation({
      mutationFn: async (data) => {
        return await post("/api/auth/signup", data);
      },
      onSuccess: (response) => {
        if (response.success) {
          if (response.user?.type_of_user === "PremiumUser" || response.user?.type_of_user === "SilverUser") {
            toast.success("Registration successful. Please complete payment to activate your account.");
          } else {
            TokenService.setToken(response.token);
            window.dispatchEvent(new Event("storage")); 
            toast.success(response.message);
            navigate("/activation-pending");
          }
        } else {
          console.error(response.message);
        }
      },
      onError: (error) => {
        toast.error(extractErrorMessage(error, "Signup failed. Please try again."));
      },
    });
}

export const useLoginMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data) => {
      return await post("/api/auth/login", data);
    },

    onSuccess: (response) => {
      if (response?.success && response?.token) {
        const userStatus =
          response?.user?.status ||
          response?.status ||
          TokenService.decodeToken()?.status ||
          TokenService.decodeToken()?.user_status;

        if (userStatus && userStatus.toString().toLowerCase() !== "active") {
          TokenService.removeToken();
          toast.error(
            response?.message || "Member under pending approval by admin."
          );
          return;
        }

        TokenService.setToken(response.token);
        window.dispatchEvent(new Event("storage")); 

        const role = TokenService.getRole();
        toast.success(response.message || "Logged in successfully");

        const roleLower = role?.toString().trim().toLowerCase();

        if (roleLower === "promoter") {
          navigate("/PromotAdmin");
        } else if (roleLower === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/userDashboard");
        }
      } else if (response?.success === false) {
        toast.error(response?.message || "Login failed");
      }
    },
    onError: (error) => {
      const errorMsg = extractErrorMessage(
        error,
        "Login failed. Please check your credentials."
      );
      toast.error(errorMsg);
      console.error("Login error:", errorMsg);
    },
  });
};

export const useResetPasswordMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data) => {
      return await post("/api/auth/reset-password", data);
    },
    onSuccess: (response) => {
      if (!response.success) {
        toast.error(response.message);
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to reset password");
    },
  });
};

export const useGetDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const response = await get("/api/auth/dashboardstats");
      return response.stats;
    },
  });
};

export const useGetRecentRegisters = () => {
  return useQuery({
    queryKey: ["recent-registers"],
    queryFn: async () => {
      const response = await get("/api/auth/recentregisters");
      return response;
    },
  });
};

// Export the promocode hook
export { useCheckPromocode };