import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import * as React from "react";
import {ConnectModal} from "../ConnectModal";

export function GetStartedCard(){
    return (
        <Card >
            <CardMedia
                sx={{ height: 550 }}
                image="/hero.jpg                                                                                                                                                                        "
                title="Step 1: Connect Wallet"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Get Started (1 of 3)
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Start by connecting a valid wallet, this is the first step in a three step process. The connecting
                    wallet receives the current website URL from the QR Code and submits a verification request to the service.
                </Typography>
            </CardContent>
            <CardActions>
                <ConnectModal/>
            </CardActions>
        </Card>
    )
}
