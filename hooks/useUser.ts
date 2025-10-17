'use client';

import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

interface Profile {
  id: string;
  name: string;
  avatar_url: string | null;
  bio: string | null;
  current_city: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface UserWithProfile {
  user: User;
  profile: Profile | null;
}

export function useUser() {
  const [userWithProfile, setUserWithProfile] = useState<UserWithProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // Get initial user
    const getUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          // Fetch profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          setUserWithProfile({ user, profile });
        } else {
          setUserWithProfile(null);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUserWithProfile(null);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    // Listen to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        setUserWithProfile({ user: session.user, profile });
      } else {
        setUserWithProfile(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  return { userWithProfile, loading, user: userWithProfile?.user, profile: userWithProfile?.profile };
}
