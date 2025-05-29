import { v2 as cloudinary} from "cloudinary";

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_sec:process.env.API_SECRET,
})
export default cloudinary