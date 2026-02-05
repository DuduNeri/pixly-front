import {
  Box,
  IconButton,
  Container,
  Stack,
  Typography,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActions,
} from "@mui/material";
import { useState } from "react";
import AddCardIcon from "@mui/icons-material/AddCard";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PostModal from "./Modal";

export const Feed = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const posts = [
    {
      id: 1,
      author: "Scrum",
      content: "KKKKKKKKKKKKKKKKKK",
      date: "10 min",
    },
    {
      id: 2,
      author: "Law",
      content: "KKKKKKKKKKKKKKKKKKKKK",
      date: "2 horas",
    },
  ];

  return (
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
        maxWidth="md"
        sx={{
          minHeight: "100vh",
          borderLeft: "1px solid rgba(255,255,255,0.1)",
          borderRight: "1px solid rgba(255,255,255,0.1)",
          backgroundColor: "var(--secondary-color)",
          position: "relative",
          pt: 12,
          pb: 4,
        }}
      >
        {/* Botão de Adicionar*/}
        <IconButton
          onClick={() => setIsModalOpen(true)}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            backgroundColor: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "12px",
            color: "#fff",
            zIndex: 2,
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.2)",
              transform: "scale(1.05)",
            },
          }}
        >
          <Typography
            sx={{
              padding: 1,
            }}
          >
            Novo post
          </Typography>
          <AddCardIcon />
        </IconButton>

        {/* LISTA DE POSTS */}
        <Stack spacing={7} sx={{ px: 2 }}>
          {posts.map((post) => (
            <Card
              key={post.id}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                backgroundImage: "none",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "16px",
                color: "#fff",
              }}
            >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: "primary.main", fontSize: "1rem" }}>
                    {post.author[0]}
                  </Avatar>
                }
                action={
                  <IconButton sx={{ color: "rgba(255,255,255,0.5)" }}>
                    <MoreVertIcon />
                  </IconButton>
                }
                title={<Typography fontWeight="bold">{post.author}</Typography>}
                subheader={
                  <Typography variant="caption" color="rgba(255,255,255,0.5)">
                    {post.date}
                  </Typography>
                }
              />
              <CardContent sx={{ pt: 0 }}>
                <Typography variant="body2" color="rgba(255, 255, 255, 0.8)">
                  {post.content}
                </Typography>
              </CardContent>
              <CardActions
                sx={{ borderTop: "1px solid rgba(255,255,255,0.05)", px: 2 }}
              >
                <IconButton
                  size="small"
                  sx={{ color: "rgba(0, 183, 255, 0.6)" }}
                >
                  <FavoriteBorderIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{ color: "rgba(4, 255, 88, 0.6)" }}
                >
                  <ChatBubbleOutlineIcon fontSize="small" />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </Stack>
      </Container>
        <PostModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Box>
  );
};
