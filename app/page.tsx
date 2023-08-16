import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";

import TryNow from "@/components/TryNow";

// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useTheme } from '@mui/material/styles'; Can't be used on a server side componenet

export default function Home() {
    // const theme = useTheme();
    // const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    // const isSmallScreen = useMediaQuery('(max-width:600px)');

    // const h3Variant = isSmallScreen ? 'h5' : 'h3';
    // const subtitleVariant = isSmallScreen ? 'body1' : 'subtitle1';

    return (
        <Container>
            <Box className="mt-5 md:flex">
                <Box className="relative">
                    <Image
                        //Photo by Philippe Bout on Unsplash
                        className="cut-corners-mobile md:cut-corners w-full h-full object-cover"
                        src={"/dude-in-auditorium.jpg"}
                        width={700}
                        height={700}
                        alt="Person sitting alone in auditorium"
                    />
                    {/* <Box className="absolute inset-0 bg-gradient-to-bl from-transparent to-white"></Box> */}
                    <Box className="absolute inset-0 md:hidden flex flex-col justify-center sm:mb-16">
                        <Typography
                            variant="h3"
                            className="w-8/12 text-2xl sm:text-3xl"
                        >
                            Find{" "}
                            <span className="text-accent">meaningfull</span>{" "}
                            connections
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            className="w-7/12 sm:text-base text-xs"
                        >
                            Get to know people studying in the{" "}
                            <span className="text-accent">same college</span>
                        </Typography>
                        <Box className="pt-3 w-1/2">
                            <TryNow
                                size="medium"
                                className="bg-accent rounded-2xl mt-2 hover:bg-hoveraccent"
                            />
                        </Box>
                    </Box>
                </Box>

                <Box className="hidden md:flex flex-col justify-center align-middle md:pl-2 md:mb-14 md:space-y-2">
                    <Typography variant="h3">
                        Find <span className="text-accent">meaningfull</span>{" "}
                        connections
                    </Typography>
                    <Typography variant="subtitle1">
                        Get to know people studying in the{" "}
                        <span className="text-accent">same college</span>
                    </Typography>
                    <Box className="pt-3">
                        <TryNow
                            size="large"
                            className="bg-accent rounded-2xl md:mt-2 hover:bg-hoveraccent"
                        />
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}
