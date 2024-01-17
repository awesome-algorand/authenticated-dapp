import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import * as React from "react";
import {ConnectModal} from "../ConnectModal";

export function RegisteredCard(){
    return (
        <Card >
            <CardMedia
              sx={{ height: {
                  xs: 250,
                  sm: 550,
                  md: 600,
                  lg: 600,
                  xl: 600,
                }
              }}
                image="/hero-3.jpg                                                                                                                                                                        "
                title="Step 1: Connect Wallet"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Registered (3 of 3)
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Mobile Device is Connected and Registered
                </Typography>
            </CardContent>
            <CardActions>
              <Button>Sign Out</Button>
            </CardActions>
        </Card>
    )
}
