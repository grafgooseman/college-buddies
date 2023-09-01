import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import supabase from "@/utils/supabaseClient";
import { redirect } from "next/navigation";
import getURL from "@/utils/getURL";

export default async function page() {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Emoji make its more visible in Next.js Debug Console
    console.log("🔥🔥🔥 profile:", user, !user, getURL("/"));
    if (!user) {
        //WTF is with redirects in Next.js?
        // redirect("/login");
        return (
            <Container>
                <Box>
                    <Typography>You must Login</Typography>
                </Box>
            </Container>
        );
    } else {
        return (
            <Container>
                <Box>
                    <Typography>Profile</Typography>
                </Box>
            </Container>
        );
    }
}
