import { useState, useEffect, ChangeEvent } from "react";
import {
    Modal,
    Box,
    Typography,
    IconButton,
    Button,
    Tooltip,
    Fade,
    CircularProgress,
} from "@mui/material";
import { X, ImagePlus, Trash2, Check } from "lucide-react";
import { updateAvatar } from "../../api/posts/Avatar";

export interface AvatarModalProps {
    open: boolean;
    onClose: () => void;
    userId: string;
    onAvatarUpdated: (newAvatar: string) => void;
}

const AvatarModal = ({ open, onClose, onAvatarUpdated }: AvatarModalProps) => {
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    const cleanPreview = () => {
        if (preview) {
            URL.revokeObjectURL(preview);
        }
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        cleanPreview();
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleRemoveImage = () => {
        cleanPreview();
        setImage(null);
        setPreview(null);
    };

    const handleSaveAvatar = async () => {
        if (!image) return;

        setIsSaving(true);
        try {
            const response = await updateAvatar(image);
            const newAvatarName = response?.data?.avatar || response?.avatar;

            if (newAvatarName) {
                onAvatarUpdated(newAvatarName);
                setSuccess(true);

                setTimeout(() => {
                    handleClose();
                }, 1000);
            }
        } catch (error) {
            console.error("Erro ao salvar o avatar:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleClose = () => {
        handleRemoveImage();
        setSuccess(false);
        onClose();
    };

    // Garante a limpeza se o componente for desmontado inesperadamente
    useEffect(() => {
        return () => cleanPreview();
    }, [preview]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slotProps={{
                backdrop: {
                    sx: {
                        backdropFilter: "blur(12px)",
                        backgroundColor: "rgba(10, 10, 12, 0.75)",
                        transition: "all 0.3s ease",
                    },
                },
            }}
        >
            <Fade in={open}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "90%",
                        maxWidth: 440,
                        bgcolor: "#16161a",
                        borderRadius: "24px",
                        border: "1px solid rgba(196, 9, 9, 0.08)",
                        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.5)",
                        outline: "none",
                        overflow: "hidden",
                    }}
                >
                    {/* Header */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            px: 3,
                            py: 2.5,
                            borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                        }}
                    >
                        <Typography variant="h6" sx={{ color: "#ffffff", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "-0.02em" }}>
                            Foto de perfil
                        </Typography>

                        <IconButton
                            onClick={handleClose}
                            disabled={isSaving}
                            sx={{
                                color: "rgba(255, 255, 255, 0.5)",
                                transition: "0.2s",
                                "&:hover": { color: "#ffffff", bgcolor: "rgba(255, 255, 255, 0.08)" }
                            }}
                        >
                            <X size={20} />
                        </IconButton>
                    </Box>

                    {/* Content */}
                    <Box sx={{ p: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>

                        {/* Preview Zone */}
                        <Box sx={{ position: "relative", mb: 4 }}>
                            <Box
                                sx={{
                                    width: 180,
                                    height: 180,
                                    borderRadius: "50%",
                                    overflow: "hidden",
                                    border: "2px solid rgba(255, 255, 255, 0.12)",
                                    position: "relative",
                                    bgcolor: "#1f1f24",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    transition: "all 0.3s ease",
                                    "&:hover": !preview ? { borderColor: "rgba(255, 255, 255, 0.25)", bgcolor: "#242429" } : {}
                                }}
                            >
                                {preview ? (
                                    <Box
                                        component="img"
                                        src={preview}
                                        alt="Preview"
                                        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                ) : (
                                    <Box
                                        component="label"
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: 1.5,
                                            cursor: "pointer"
                                        }}
                                    >
                                        <ImagePlus size={32} color="rgba(255, 255, 255, 0.4)" />
                                        <Typography sx={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "0.85rem", fontWeight: 500 }}>
                                            Escolha sua foto de perfil
                                        </Typography>
                                        <input hidden type="file" accept="image/*" onChange={handleImageChange} />
                                    </Box>
                                )}
                            </Box>

                            {/* Floating Delete Button */}
                            {preview && !isSaving && (
                                <Tooltip title="Remover imagem" placement="top">
                                    <IconButton
                                        onClick={handleRemoveImage}
                                        sx={{
                                            position: "absolute",
                                            bottom: 4,
                                            right: 4,
                                            bgcolor: "#ef4444",
                                            color: "#fff",
                                            boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
                                            "&:hover": { bgcolor: "#dc2626" }
                                        }}
                                    >
                                        <Trash2 size={16} />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Box>

                        {/* Actions */}
                        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 1.5 }}>
                            {preview && (
                                <Button
                                    component="label"
                                    fullWidth
                                    variant="text"
                                    disabled={isSaving}
                                    sx={{
                                        borderRadius: "12px",
                                        py: 1.2,
                                        color: "rgba(255, 255, 255, 0.7)",
                                        textTransform: "none",
                                        fontWeight: 600,
                                        "&:hover": { color: "#fff", bgcolor: "rgba(255, 255, 255, 0.05)" }
                                    }}
                                >
                                    Escolher outra foto
                                    <input hidden type="file" accept="image/*" onChange={handleImageChange} />
                                </Button>
                            )}

                            <Button
                                fullWidth
                                variant="contained"
                                onClick={handleSaveAvatar}
                                disabled={!image || isSaving}
                                sx={{
                                    py: 1.5,
                                    borderRadius: "14px",
                                    textTransform: "none",
                                    fontWeight: 600,
                                    fontSize: "0.95rem",
                                    background: success ? "#10b981" : "#ffffff",
                                    color: success ? "#ffffff" : "#000000",
                                    boxShadow: success ? "0 8px 20px rgba(16, 185, 129, 0.2)" : "0 8px 20px rgba(255, 255, 255, 0.1)",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        background: success ? "#059669" : "#e4e4e7"
                                    },
                                    "&:disabled": {
                                        background: "rgba(255, 255, 255, 0.04)",
                                        color: "rgba(255, 255, 255, 0.2)"
                                    }
                                }}
                            >
                                {isSaving ? (
                                    <CircularProgress size={20} sx={{ color: "#000" }} />
                                ) : success ? (
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <Check size={18} /> Pronto!
                                    </Box>
                                ) : (
                                    "Salvar alterações"
                                )}
                            </Button>
                        </Box>

                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
};

export default AvatarModal;