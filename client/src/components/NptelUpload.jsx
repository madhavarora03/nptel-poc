import { useRef, useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function NptelUpload() {
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
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded successfully!", response);
      toast({
        title: "File uploaded successfully!",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
    } catch (error) {
      toast({
        title: "Error uploading file",
        description: "Please try again later.",
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
            Upload your NPTEL certificate
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
