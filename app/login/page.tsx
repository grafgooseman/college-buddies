import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TryNowButton from "@/app/TryNowButton";

export default function Login() {
    return (
        <Container>
            <Box>
                <Typography>Please Login First</Typography>
                <TryNowButton
                    size="medium"
                    className="bg-accent rounded-2xl mt-2 hover:bg-hoveraccent"
                    overrideText="LogIn"
                />
            </Box>
        </Container>
    );
}
