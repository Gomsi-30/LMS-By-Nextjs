import { UploadDropzone } from "@/lib/uploadthing";

export const FileUpload = ({ onChange, endpoint }) => {
    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}
        />
    );
}
