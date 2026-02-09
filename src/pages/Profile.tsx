import { Box, Typography, Container} from "@mui/material";


export const Profile = () => {
    return (
      <>
        <Box
          component="main"
          sx={{
            backgroundColor: "var(--primary-color)",
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Container
            sx={{
              minHeight: "100vh",
              borderLeft: "1px solid rgba(255,255,255,0.1)",
              borderRight: "1px solid rgba(255,255,255,0.1)",
              backgroundColor: "var(--secondary-color)",
              position: "relative",
              pt: 12,
              pb: 4,
            }}
          ></Container>
        </Box>
      </>
    );
}