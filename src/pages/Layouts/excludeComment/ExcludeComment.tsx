import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deleteComment } from "../../../api/posts/Posts";

interface ExcludeCommentProps {
    open: boolean;
    onClose: () => void;
    commentId: string | null;
    onSuccess: () => Promise<void> | void;
}

export const ExcludeComment: React.FC<ExcludeCommentProps> = ({
    open,
    onClose,
    commentId,
    onSuccess,
}) => {

    const handleConfirmDelete = async () => {
        if (!commentId) return;

        try {
            await deleteComment(commentId);
            await onSuccess();
            onClose();
        } catch (error) {
            console.error("Erro ao deletar comentário:", error);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            slotProps={{
                backdrop: {
                    sx: {
                        backdropFilter: "blur(8px)",
                        backgroundColor: "rgba(0, 0, 0, 0.75)",
                        transition: "all 0.3s ease-in-out",
                    }
                }
            }}
            PaperProps={{
                sx: {
                    backgroundColor: "#16161a",
                    backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0))", 
                    color: "#fff",
                    borderRadius: "14px",
                    border: "1px solid rgba(255, 255, 255, 0.07)",
                    boxShadow: "0px 24px 60px rgba(0, 0, 0, 0.8), inset 0px 1px 0px rgba(255,255,255,0.1)", 
                    padding: "12px 12px 4px 12px",
                    maxWidth: "360px",
                    width: "100%",
                }
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 1 }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(239, 68, 68, 0.1)",
                        border: "1px solid rgba(239, 68, 68, 0.2)",
                        color: "#f43f5e"
                    }}
                >
                    <DeleteOutlineIcon sx={{ fontSize: "1.5rem" }} />
                </Box>
            </Box>

            <DialogTitle
                sx={{
                    fontWeight: "600",
                    textAlign: "center",
                    fontSize: "1.2rem",
                    letterSpacing: "-0.01em",
                    pt: 1,
                    pb: 1
                }}
            >
                Excluir comentário?
            </DialogTitle>

            <DialogContent sx={{ pb: 2 }}>
                <Typography
                    variant="body2"
                    sx={{
                        color: "rgba(255, 255, 255, 0.5)",
                        textAlign: "center",
                        lineHeight: 1.5,
                        fontSize: "0.875rem"
                    }}
                >
                    Esta ação removerá permanentemente o comentário e não poderá ser desfeita.
                </Typography>
            </DialogContent>

            <DialogActions
                sx={{
                    px: 2,
                    pb: 2,
                    flexDirection: "column", 
                    gap: 1
                }}
            >
                <Button
                    onClick={handleConfirmDelete}
                    variant="contained"
                    fullWidth
                    sx={{
                        textTransform: "none",
                        fontWeight: "600",
                        fontSize: "0.9rem",
                        backgroundColor: "#e11d48", 
                        borderRadius: "9px",
                        py: 1.2,
                        boxShadow: "0px 4px 12px rgba(225, 29, 72, 0.3)",
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                            backgroundColor: "#be123c",
                            boxShadow: "0px 6px 16px rgba(225, 29, 72, 0.4)",
                        }
                    }}
                >
                    Excluir Permanentemente
                </Button>

                <Button
                    onClick={onClose}
                    fullWidth
                    sx={{
                        color: "rgba(255, 255, 255, 0.7)",
                        textTransform: "none",
                        fontWeight: "500",
                        fontSize: "0.9rem",
                        borderRadius: "9px",
                        py: 1.2,
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.04)",
                            color: "#fff",
                            border: "1px solid rgba(255, 255, 255, 0.15)",
                        }
                    }}
                >
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );
};