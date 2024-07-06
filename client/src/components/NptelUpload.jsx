import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "@/components/ui/use-toast";
import axiosInstance from "@/lib/axiosConfig";

// eslint-disable-next-line react/prop-types
export default function NptelUpload({ subjectCode }) {
  const [isLoading, setIsLoading] = useState(false);
  const fileRef = useRef(null);
  const { toast } = useToast();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    uploadFile(file);
  };

  const uploadFile = async (file) => {
    const allowedTypes = ["application/pdf"];
    if (!file || !allowedTypes.includes(file.type)) {
      console.error("Please upload a PDF file.");
      toast({
        title: "Please upload a PDF file.",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("subject_code", subjectCode);

    setIsLoading(true);

    try {
      const response = await axiosInstance.post(
        `/upload?subject_code=${subjectCode}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded successfully!", response);
      toast({
        title: response.data.message,
        description: new Date().toLocaleTimeString(),
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast({
        title: "Error uploading file",
        description: error.response.data.message,
        variant: "destructive",
      });
      console.error("Error uploading file:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const focusInput = (e) => {
    e.preventDefault();
    fileRef.current.click();
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <form className="bg-card p-8 rounded-lg">
        <div className="mb-6 text-center">
          <div className="mb-4">
            <img
              src="/certificate-icon.svg"
              alt="Upload Icon"
              className="mx-auto h-12 w-12"
            />
          </div>
          <Button onClick={focusInput} disabled={isLoading}>
            {isLoading ? (
              <div role="status" className="my-2">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "Upload your NPTEL certificate"
            )}
          </Button>
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            disabled={isLoading}
            ref={fileRef}
          />
        </div>
        <p className="mt-4 text-xs text-gray-500 text-center">PDF up to 10MB</p>
      </form>
    </div>
  );
}
