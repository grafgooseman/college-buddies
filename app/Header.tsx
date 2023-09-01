"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Link from "next/link";
import { SessionContext, SessionProvider } from "./SessionProvider";
import { useSession } from "./useSession";
import { useRouter } from "next/navigation";

const pages = ["People", "Events", "Blog"];
const settings = ["Profile", "Logout"];

function Header() {
    const { session, logout, googleLogin } = useSession();
    const router = useRouter();

    // const { sessionData: session } = React.useContext(SessionContext) ?? {};;
    // let session = sessionData?.sessionData;

    React.useEffect(() => {
        console.log("header:", session);
    }, [session]);

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );

    const handleLogIn = async () => {
        await googleLogin();
    };

    const handleLogOut = async () => {
        await logout();
    };

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: "white",
                color: "black",
            }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Link href={"/"}>
                        <DonutSmallIcon
                            sx={{
                                display: { xs: "none", md: "flex" },
                                mb: 0.3,
                            }}
                        />
                    </Link>
                    <Link href={"/"}>
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: "none", md: "flex" },
                                fontFamily: "sans-serif",
                                fontWeight: 700,
                                letterSpacing: ".1rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            ollege Buddies
                        </Typography>
                    </Link>
                    {/* Menu for mobile */}
                    <Box
                        sx={{
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography textAlign="center">
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box
                        sx={{
                            display: { xs: "flex", md: "none" },
                            flexGrow: 2,
                            justifyContent: "center",
                        }}
                    >
                        <Link href={"/"}>
                            <DonutSmallIcon />
                        </Link>
                    </Box>

                    {/* Desktop pages */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                            justifyContent: "flex-end",
                            mr: 2,
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "black", display: "block" }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    {/* Avatar with a menu */}
                    {/* session is undefined, that's why this cind of check, its important */}
                    <Box sx={{ flexGrow: 0 }}>
                        {session != null ? (
                            <Tooltip title="Profile options">
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                >
                                    <Avatar
                                        alt="User avatar"
                                        src={
                                            session?.user?.user_metadata
                                                ?.avatar_url
                                        }
                                    />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <Tooltip title="SignUp / LogIn">
                                <IconButton onClick={handleLogIn} sx={{ p: 0 }}>
                                    <Box className="w-10 h-10">
                                        <PersonAddIcon />
                                    </Box>
                                </IconButton>
                            </Tooltip>
                        )}

                        {/* Profile Options when logged in*/}
                        {/* session is undefined, that's why this cind of check, its important */}
                        {session != null && (
                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem
                                        key={setting}
                                        onClick={() => {
                                            // In arrow function you need to invoke the func right away "()"
                                            if (setting === "Profile") {
                                                router.push("/profile");
                                            }
                                            if (setting === "Logout") {
                                                handleLogOut();
                                            }
                                            handleCloseUserMenu();
                                        }}
                                    >
                                        <Typography textAlign="center">
                                            {setting}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;
