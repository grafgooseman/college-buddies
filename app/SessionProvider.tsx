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
    session: NormalizedSession | null;
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
    const [session, setSession] = useState<NormalizedSession | null>(
        null
    );

    useEffect(() => {
        const initializeSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error("Error fetching session:", error);
            }
            const normalizedData = normalizeSessionData(data);
            setSession(normalizedData);
        };

        // Fetch session initially
        initializeSession();

        // Subscribe to session changes
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                const normalizedData = normalizeSessionData(session);
                setSession(normalizedData);
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
            setSession(null);
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
            setSession(normalizedData);
        }
    };

    return (
        <SessionContext.Provider value={{ session, logout, googleLogin }}>
            {children}
        </SessionContext.Provider>
    );
};
