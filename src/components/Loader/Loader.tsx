import { CircularProgress, Container, Grid2 } from "@mui/material";


const Loader = () => {
    

    return (
        <Container>
            <Grid2 container 
                style={{height: window.innerHeight - 75}}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Grid2
                    container
                    alignItems={"center"}
                    direction={"column"}
                >
                    <CircularProgress />
                </Grid2>
            </Grid2>
        </Container>
    )
}

export default Loader;