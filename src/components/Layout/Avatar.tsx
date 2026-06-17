import {
    Modal,
    Box,
    Typography,
    IconButton,
    Button,
    Tooltip,
    Fade,
} from "@mui/material";
import { X, ImagePlus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { updateAvatar } from "../../api/posts/Avatar";

export interface AvatarModalProps {
    open: boolean;
    onClose: () => void;
    userId: string;
    onAvatarUpdated: (newAvatar: string) => void;
}

const AvatarModal = ({
    open,
    onClose,
    userId,
    onAvatarUpdated,
}: AvatarModalProps) => {
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [uploaded, setUploaded] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSaveAvatar = async () => {
        if (!image) return;

        try {
            // CORREÇÃO: Passa o arquivo 'image' (que é um objeto File) puro.
            // A sua API se encarrega de criar o FormData lá dentro!
            const response = await updateAvatar(image);

            console.log("Resposta da API:", response);

            // Captura o nome da imagem retornada pelo backend
            // Ajuste o caminho dependendo se os dados vêm direto ou dentro de .data
            const newAvatarName = response?.data?.avatar || response?.avatar;

            if (newAvatarName) {
                onAvatarUpdated(newAvatarName);
            }

            // Fecha o modal e limpa os estados
            setUploaded(true);

        } catch (error) {
            console.error("Erro ao salvar o avatar:", error);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreview(null);
    };

    useEffect(() => {
        if (uploaded) {
            onClose();
            setImage(null);
            setPreview(null);
            setUploaded(false);
        }
    }, [uploaded, onClose]);

    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            slotProps={{
                backdrop: {
                    sx: {
                        backdropFilter: "blur(8px)",
                        backgroundColor: "rgba(0,0,0,0.8)",
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
                        width: "95%",
                        maxWidth: 500,
                        bgcolor: "#121212",
                        borderRadius: "28px",
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxShadow: "0 24px 48px rgba(0,0,0,0.8)",
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
                            borderBottom: "1px solid rgba(255,255,255,0.05)",
                        }}
                    >
                        <Typography variant="h6" sx={{ color: "#fff", fontWeight: 800, fontSize: "1.1rem" }}>
                            Alterar foto de perfil
                        </Typography>

                        <IconButton onClick={onClose} sx={{ color: "rgba(255,255,255,0.4)", "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.05)" } }}>
                            <X size={22} />
                        </IconButton>
                    </Box>

                    <Box sx={{ p: 4 }}>
                        {/* Preview Avatar */}
                        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
                            <Box sx={{ width: 220, height: 220, borderRadius: "50%", overflow: "hidden", border: "4px solid #1f2937", position: "relative", bgcolor: "#1a1a1a" }}>
                                {preview ? (
                                    <>
                                        <Box component="img" src={preview} alt="Preview Avatar" sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                        <Tooltip title="Remover imagem">
                                            <IconButton onClick={handleRemoveImage} sx={{ position: "absolute", top: 10, right: 10, bgcolor: "rgba(0,0,0,0.7)", color: "#fff", "&:hover": { bgcolor: "#ef4444" } }}>
                                                <Trash2 size={18} />
                                            </IconButton>
                                        </Tooltip>
                                    </>
                                ) : (
                                    <Box component="label" sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, cursor: "pointer" }}>
                                        <ImagePlus size={50} color="#888" />
                                        <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>
                                            Escolher foto
                                        </Typography>
                                        <input hidden type="file" accept="image/*" onChange={handleImageChange} />
                                    </Box>
                                )}
                            </Box>
                        </Box>

                        {/* Botão Trocar Foto */}
                        <Button component="label" fullWidth variant="outlined" sx={{ mb: 2, borderRadius: "14px", py: 1.5, color: "#fff", borderColor: "rgba(255,255,255,0.1)", "&:hover": { borderColor: "#1f2937" } }}>
                            Escolher nova foto
                            <input hidden type="file" accept="image/*" onChange={handleImageChange} />
                        </Button>

                        {/* Salvar */}
                        <Button fullWidth variant="contained" onClick={handleSaveAvatar} disabled={!image} sx={{ py: 1.5, borderRadius: "14px", textTransform: "none", fontWeight: 700, fontSize: "1rem", background: "#1f2937", boxShadow: "0 8px 20px rgba(31,41,55,0.4)", "&:hover": { background: "#374151" } }}>
                            Salvar foto
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
};

export default AvatarModal;