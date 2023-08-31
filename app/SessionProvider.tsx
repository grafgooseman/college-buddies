"use client";

import React, { useEffect, useState } from "react";
import supabase from "@/utils/supabaseClient";

interface User {
    id: string;
    aud: string;
    role: string;
    email: string;
    email_confirmed_at: string;
    phone: string;
    confirmed_at: string;
    last_sign_in_at: string;
    app_metadata: {
        provider: string;
        providers: string[];
    };
    user_metadata: {
        avatar_url: string;
        email: string;
        email_verified: boolean;
        full_name: string;
        iss: string;
        name: string;
        picture: string;
        provider_id: string;
        sub: string;
    };
    identities: any;
    created_at: string;
    updated_at: string;
}

interface NormalizedSession {
    provider_token: string;
    access_token: string;
    expires_in: number;
    expires_at: number;
    refresh_token: string;
    token_type: string;
    user: User;
}

interface SessionContextProps {
    sessionData: NormalizedSession | null;
    logout: () => void;
    googleLogin: () => void;
}

export const SessionContext = React.createContext<SessionContextProps | null>(
    null
);

interface Props {
    children: React.ReactNode;
}

const normalizeSessionData = (data: any): NormalizedSession | null => {
    console.log("normalizeSessionData:", data);
    if (!data) {
        console.log("normalizeSessionData: no data");
        return null;
    }
    if (data.session) {
        console.log("normalizeSessionData SESSION: ", data.session);
        return data.session;
    } else if (data.user) {
        console.log("normalizeSessionData: ", data.user);
        return data;
    } else {
        console.log("normalizeSessionData: no session or user");
        return null;
    }
};

export const SessionProvider: React.FC<Props> = ({ children }) => {
    const [sessionData, setSessionData] = useState<NormalizedSession | null>(
        null
    );

    useEffect(() => {
        const initializeSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error("Error fetching session:", error);
            }
            const normalizedData = normalizeSessionData(data);
            setSessionData(normalizedData);
        };

        // Fetch session initially
        initializeSession();

        // Subscribe to session changes
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                const normalizedData = normalizeSessionData(session);
                setSessionData(normalizedData);
            }
        );

        return () => {
            authListener?.subscription?.unsubscribe();
        };
    }, []);

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error(error);
        } else {
            setSessionData(null);
        }
    };

    const googleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
        });
        if (error) {
            console.error("Google Sign In Error", error);
        } else {
            const normalizedData = normalizeSessionData(data);
            setSessionData(normalizedData);
        }
    };

    return (
        <SessionContext.Provider value={{ sessionData, logout, googleLogin }}>
            {children}
        </SessionContext.Provider>
    );
};

//--------------------------------

// "use client";

// import supabase from "@/utils/supabaseClient";
// import React, { useEffect, useState } from "react";

// interface SessionContextProps {
//   sessionData: unknown | null;
//   logout: () => void;
//   googleLogin: () => void;
// }

// export const SessionContext = React.createContext<SessionContextProps | null>(null);

// interface Props {
//   children: React.ReactNode;
// }

// export const SessionProvider: React.FC<Props> = ({ children }) => {
//   const [sessionData, setSessionData] = useState<unknown | null>(null);

//   useEffect(() => {
//     const initializeSession = async () => {
//       const { data, error } = await supabase.auth.getSession();
//       if (error) {
//         console.error("Error fetching session:", error);
//       }
//       setSessionData(data);
//     };

//     // Fetch session initially
//     initializeSession();

//     // Subscribe to session changes
//     const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
//       setSessionData(session);
//     });

//     return () => {
//       authListener?.subscription?.unsubscribe();
//     };
//   }, []);

//   const logout = async () => {
//     const { error } = await supabase.auth.signOut();
//     if (error) {
//       console.log(error);
//     } else {
//       setSessionData(null);
//     }
//   };

//   const googleLogin = async () => {
//     const { data, error } = await supabase.auth.signInWithOAuth({
//       provider: 'google'
//     });
//     if (error) {
//       console.error("Google Sign In Error", error);
//     }
//     console.log(data, error);
//   };

//   return (
//     <SessionContext.Provider value={{ sessionData, logout, googleLogin }}>
//       {children}
//     </SessionContext.Provider>
//   );
// };

//--------------------------------

// "use client";

// import supabase from "@/utils/supabaseClient";

// import React from "react";

// export const SessionContext = React.createContext<unknown | null>(null);

// interface Props {
//     children: React.ReactNode;
// }

// export const SessionProvider: React.FC<Props> = ({ children }) => {
//     const [sessionData, setSessionData] = React.useState<unknown | null>(null);

//     React.useEffect(() => {
//         const fetchSession = async () => {
//             const { data, error } = await supabase.auth.getSession();
//             if (error) {
//                 console.error("Error fetching session:", error);
//             }
//             setSessionData({ ...sessionData, session: data });
//         };

//         fetchSession();
//     }, []);

//     React.useEffect(() => {
//         const { data: authListener } = supabase.auth.onAuthStateChange(
//             async (event, session) => {
//                 setSessionData(session);
//             }
//         );

//         return () => {
//             authListener?.subscription?.unsubscribe();
//         };
//     }, []);

//     const logout = async () => {
//         const { error } = await supabase.auth.signOut();
//         if (error) {
//             console.log(error);
//         } else {
//             setSessionData(null);
//         }
//     };

// const googleLogin = async () => {
//     const { data, error } = await supabase.auth.signInWithOAuth({
//         provider: "google",
//     });

//     if (error) {
//         return alert(
//             "Error: " + error.message || error.toString() || "Unknown error"
//         );
//     }

//     console.log(data, error);
// };

//     return (
//         <SessionContext.Provider value={{ sessionData, logout, googleLogin }}>
//             {children}
//         </SessionContext.Provider>
//     );
// };

// supabaseClient.ts
// import { createClient, SupabaseClient } from "@supabase/supabase-js";

// const supabase: SupabaseClient = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL as string,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
// );

// export default supabase;

//"use client"

// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import type { Database } from "@/types_db";
// // const supabase = createClientComponentClient<Database>({
// //   supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
// //   supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
// // });
// const supabase = createClientComponentClient<Database>({ req, res });

// export default supabase;

// const handleSignUp = async () => {
//     await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//             emailRedirectTo: `${location.origin}/auth/callback`,
//         },
//     });
//     router.refresh();
// };

// const handleSignIn = async () => {
//     await supabase.auth.signInWithPassword({
//         email,
//         password,
//     });
//     router.refresh();
// };

// const handleSignOut = async () => {
//     await supabase.auth.signOut();
//     router.refresh();
// };

//----------------------------

// 'use client';

// import { createContext, useEffect } from 'react';
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// import { useRouter } from 'next/navigation';

// export const AuthContext = createContext();

// const AuthProvider = ({ accessToken, children }) => {
//   const supabase = createClientComponentClient();
//   const router = useRouter();

//   useEffect(() => {
//     const {
//       data: { subscription: authListener },
//     } = supabase.auth.onAuthStateChange((event, session) => {
//       if (session?.access_token !== accessToken) {
//         router.refresh();
//       }
//     });

//     return () => {
//       authListener?.unsubscribe();
//     };
//   }, [accessToken, supabase, router]);

//   return children;
// };

// export default AuthProvider;
