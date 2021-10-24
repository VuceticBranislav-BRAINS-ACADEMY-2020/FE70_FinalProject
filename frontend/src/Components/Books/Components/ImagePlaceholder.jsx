import Skeleton from "@mui/material/Skeleton";

const ImagePlaceholder = () => {
    return (
        <Skeleton
            variant="rectangular"
            width={100}
            height={100}
            animation="wave"
            sx={{ border: 1, borderRadius: 1, borderColor: "text.primary" }}
        />
    );
};

export default ImagePlaceholder;
