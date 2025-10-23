import { FileIcon, UploadCloud, XIcon } from "lucide-react";
import { useRef } from "react";
import { Button } from "../ui/button";

function ProductImageUpload({ image, setImage, imageUrl, setImageUrl }) {
  const inputRef = useRef(null);
  function handleImagefilerChange(e) {
    const selectedFile = e.target?.files[0];
    if (selectedFile) setImage(selectedFile);
  }
  console.log(image);

  function handleDrag(e) {
    e.preventDefault();
    console.log(hi);
    
  }
  function handleDrop(e) {
    e.preventDefault();
    const dropedFile = e.dataTransfer.files?.[0];
    if (dropedFile) setImage(dropedFile);
  }
  function handleImageRemove(e) {
    setImage(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <label className="text-lg font-semibold mb-2 block">Upload Image</label>
      <div
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className="border-2 border-dashed mx-auto py-8 mt-4"
      >
        <input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImagefilerChange}
        />
        {!image ? (
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            <UploadCloud className="w-10 h-10 text-muted-foreground " />
            <span>Drag & drop or Clicked</span>
          </label>
        ) : (
          <div className="flex items-center justify-between ">
            <div className="flex items-center">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt={image.name}
                  className="w-15 h-15 object-cover rounded mr-2"
                />
              ) : (
                <FileIcon className="w-8 h-8 text-primary mr-2" />
              )}
            </div>
            <p className="text-sm font-medium">
              {image?.name?.length > 30
                ? image.name.slice(0, 30) + "..."
                : image?.name}
            </p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleImageRemove}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
