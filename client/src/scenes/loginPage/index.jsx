import { Box, Typography, useMediaQuery } from "@mui/material";
import Form from "./form";
import BgImg from "../../images/background.jpg";

const styles = {
  paperContainer: {
    backgroundSize: "cover",
    backgroundImage: `url(${BgImg})`,
    backgroundPosition: "center",
    width: `100vw`,
    height: `100vh`,
  },
};

const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box
      height="100vh"
      width="100%"
      backgroundColor="rgb(190, 234, 255)"
      overflow="auto"
      style={styles.paperContainer}
    >
      <Box width="100%" p="1.5rem 10%" textAlign="center">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            fontWeight="bold"
            fontSize="36px"
            color="green"
            marginRight="0.3rem"
          >
            Donut
          </Typography>
          <img
            width="45rem"
            alt="logo"
            height="45rem"
            src="../../assets/donut.png"
          />
        </Box>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor="rgb(244, 247, 210)"
      >
        <Typography fontWeight="500" variant="h5" p="1rem" color="grey">
          Welcome to Donut, your social Space!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
