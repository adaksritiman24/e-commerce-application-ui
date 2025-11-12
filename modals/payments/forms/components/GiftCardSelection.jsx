import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Tooltip,
    Typography,
} from "@mui/material";
import { green } from "@mui/material/colors";
import CloseIcon from '@mui/icons-material/Close';
import { getFormattedPrice } from "../../../../components/common/utils/helpers";
import { useContext } from "react";
import AuthContext from "../../../../auth/AuthContext";

const GiftCardSelection = ({
    setGiftCardsSelectorModalOpen,
    selectedGiftCard,
    setSelectedGiftCard
}) => {
    const {user} = useContext(AuthContext);
    
    if(user == null)
        return <></>

    return (
        <Box sx={{
            mx: 5,
            my: 3
        }}>
            <Typography variant="body2" color="text.secondary">
                Select a gift card and pay the remaining amount.
            </Typography>
            <hr />
            <Button variant="contained" size="large" color="primary" onClick={() => setGiftCardsSelectorModalOpen(true)}>
                Select a gift card
            </Button>
            {selectedGiftCard != null &&
                <>
                    <Divider sx={{ mt: 1 }}>
                        <Chip label="Gift Card Applied!" size="small" />
                    </Divider>
                    <Card sx={{
                        backgroundColor: green[50],
                        mt: 1
                    }}>
                        <CardContent>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >
                                <Typography
                                    fontWeight="600"
                                    fontSize={20}
                                >
                                    {getFormattedPrice(selectedGiftCard.amount)}
                                </Typography>
                                <Tooltip title="Remove">
                                    <CloseIcon onClick={() => setSelectedGiftCard(null)}
                                        sx={{
                                            cursor: "pointer"
                                        }}
                                    />
                                </Tooltip>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                {selectedGiftCard.title}
                            </Typography>
                        </CardContent>
                    </Card>
                </>
            }
        </Box>
    )
}

export default GiftCardSelection;