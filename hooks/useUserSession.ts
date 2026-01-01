import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Profile } from "@/types/Tables";
import { getProfile } from "@/lib/auth";
import { signOut } from "@/core/auth/AuthClient";
import supabase from "@/database/supabase/Client";

export function useUserSession() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadUser = useCallback(async () => {
    const response = await getProfile();

    if (response.error) {
      return response.error;
    }

    setProfile(response.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        loadUser();
        router.refresh();
      } else if (event === "SIGNED_OUT") {
        setProfile(null);
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [loadUser, router]);

  const handleLogout = async () => {
    const response = await signOut();

    if (response.error) {
      toast.error(response.error);
      return false;
    }

    toast.success("Você saiu da conta.");
    return true;
  };

  return {
    profile,
    loading,
    handleLogout,
  };
}
