import React from "react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

function ProductListing() {
  // State to manage images
  const [images, setImages] = useState([]);  // Array of images
  const [previewImage, setPreviewImage] = useState(null); // Single preview for each image

  // React Hook Form setup
  const { control, handleSubmit, formState: { errors } } = useForm();

  // Handle file selection and set preview for single image
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      setPreviewImage(URL.createObjectURL(file)); // Show the preview
    }
  };

  // Add image to the list of images
  const addImage = (file) => {
    setImages([...images, file]);
    setPreviewImage(null); // Clear the preview after adding the image
  };

  // Remove image from the list
  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  // Submit handler
  const onSubmit = (data) => {
    console.log("Submitted data: ", data);
    console.log("Uploaded images: ", images);
  };

  return (
    <div>
      <div class="max-w-4xl mx-auto font-[sans-serif] p-6">
        <div class="text-center mb-16">
          <a href="javascript:void(0)">
            <img src="/images/logo1.jpg" alt="logo" class="w-52 inline-block" />
          </a>
          <h1 class="text-gray-800 text-3xl font-bold mt-6">
            List your product on our website
          </h1>
        </div>

        <form>
          <div class="grid sm:grid-cols-2 gap-8">
            <div>
              <label class="text-gray-800 text-2xl mb-2 block">Title</label>
              <input
                name="name"
                type="text"
                class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter the product title"
              />
            </div>
            <div>
              <label class="text-gray-800 text-2xl mb-2 block">Price</label>
              <input
                name="email"
                type="number"
                class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter price"
              />
            </div>
            <div>
              <label class="text-gray-800 text-2xl mb-2 block">
                Stock Quantity
              </label>
              <input
                name="number"
                type="number"
                class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter stock quantity"
              />
            </div>
            <div>
              <label class="text-gray-800 text-2xl mb-2 block">
                Choose Category
              </label>
              <input
                name="cpassword"
                type="password"
                class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Drop down"
              />
            </div>
            <div>
              <label class="text-gray-800 text-2xl mb-2 block">
                Description
              </label>
              <textarea
                name="lname"
                type="text"
                class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter your product details"
              />
            </div>
            <div>
            <div className="image-upload-form">
      <h2 className="text-2xl mb-2">Upload Image One by One</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="image">Select Image</label>
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                accept="image/*"
                {...field}
                onChange={(e) => {
                  handleImageChange(e);
                  field.onChange(e);
                }}
              />
            )}
          />
          {errors.image && <p>{errors.image.message}</p>}
        </div>

        {/* Display preview of the selected image */}
        {previewImage && (
          <div>
            <h4>Preview</h4>
            <img
              src={previewImage}
              alt="Selected"
              style={{ width: "200px", height: "auto", marginBottom: "10px" }}
            />
            <div>
              <button type="button" onClick={() => addImage(previewImage)}>
                Add Image
              </button>
            </div>
          </div>
        )}

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>

      {/* Display the list of uploaded images */}
      {images.length > 0 && (
        <div className="image-previews">
          <h3 className="text-2xl">Uploaded Images:</h3>
          {images.map((image, index) => (
            <div key={index} className="image-item">
              <img
                src={image}
                alt={`Uploaded ${index}`}
                style={{ width: "100px", marginRight: "10px" }}
              />
              <button className="p-1"
                type="button"
                onClick={() => removeImage(index)}
                style={{ backgroundColor: "red", color: "white" }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
            </div>
          </div>

          <div class="!mt-12">
            <button
              type="button"
              class="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductListing;
