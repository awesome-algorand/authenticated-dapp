import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {Message} from '@algorandfoundation/propagule-js'
import QRCodeStyling, {Options} from "qr-code-styling";
import {useMemo} from "react";
import {Fade} from "@mui/material";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    background: "linear-gradient(to right, rgba(248,80,50,1) 0%, rgba(241,111,92,1) 50%, rgba(246,41,12,1) 51%, rgba(240,47,23,1) 71%, rgba(231,56,39,1) 100%)",
    border: '2px solid #000',
    boxShadow: 24,
};

const logoStyle = {
    bgcolor: "rgb(98,195,202)",
    background: "radial-gradient(circle, rgba(184,242,246,1) 0%, rgba(75,157,171,1) 100%)"
}

export function ConnectModal({color}: {color?: string}) {
    const qrOpts = {
        "width": 500,
        "height": 500,
        "data": "algorand://",
        "margin": 25,
        "imageOptions": {"hideBackgroundDots": true, "imageSize": 0.4, "margin": 15},
        "dotsOptions": {
            "type": "extra-rounded",
            "gradient": {
                "type": "radial",
                "rotation": 0,
                "colorStops": [{"offset": 0, "color": "#62c3ca"}, {"offset": 1, "color": "#1d3726"}]
            }
        },
        "backgroundOptions": {"color": "#ffffff", "gradient": null},
        "image": "/logo.png",
        "cornersSquareOptions": {
            "type": "",
            "color": "#000000",
            "gradient": {
                "type": "linear",
                "rotation": 0,
                "colorStops": [{"offset": 0, "color": "#224244"}, {"offset": 1, "color": "#040908"}]
            }
        },
        "cornersDotOptions": {
            "type": "dot",
            "color": "#000000",
            "gradient": {
                "type": "linear",
                "rotation": 0,
                "colorStops": [{"offset": 0, "color": "#000000"}, {"offset": 1, "color": "#000000"}]
            }
        }
    }

    // const qrCode = new QRCodeStyling({
    //     width: 500,
    //     height: 500,
    //     type: "svg",
    //     data: "https://www.facebook.com/",
    //     image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    //     dotsOptions: {
    //         color: "#4267b2",
    //         type: "rounded"
    //     },
    //
    //     backgroundOptions: {
    //         color: "rgba(0,0,0,0)",
    //     },
    //     imageOptions: {
    //         crossOrigin: "anonymous",
    //         margin: 20
    //     }
    // });


    const [open, setOpen] = React.useState(false);
    const [barcode, setBarcode] = React.useState("/qr-loading.png")
    const handleOpen = () => {
        setBarcode("/qr-loading.png")
        let message = new Message("https://nest-fido2.onrender.com", "1234", Math.random())
        qrOpts.data = `${message}`
        const qrCode = new QRCodeStyling(qrOpts as Options)
        qrCode.getRawData("png").then((d) => {
            console.log(d)
            setBarcode(URL.createObjectURL(d))
            setOpen(true)
        })
        // message.toBarcode({color: {light: "#00000000"}}).then(setBarcode)
        setOpen(true)
    };
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen} color={color}>Connect</Button>
            <Modal
                slotProps={{backdrop: {sx: {bgcolor: "rgba(0, 0, 0, 0.9)"}}}}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Fade in={open}>
                <Box sx={style}>
                    <Box sx={{
                        position: "relative"
                    }}>
                        <Box component="img" src={barcode} sx={{
                            maxHeight: "50vh",
                            maxWidth: "50vh",
                            height: {
                                xs: 250,
                                sm: 600,
                                md: 900,
                                lg: 1200,
                                xl: 1536,
                            },
                            width: {
                                xs: 250,
                                sm: 600,
                                md: 900,
                                lg: 1200,
                                xl: 1536,
                            },
                            position: "absolute",
                            transform: 'translate(-50%, -50%)',
                            top: "50%",
                        }}/>
                        {/*<Box component="img" src="/logo.png" sx={{ position: 'absolute', transform: 'translate(-50%, -50%)', top: "50%", height: 65, width: 65}} />*/}
                    </Box>
                </Box>
                </Fade>
            </Modal>
        </div>
    );
}
