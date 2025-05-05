const createItem = async (formData) => {
    const imageData = new FormData();
    imageData.append("image", formData.image);      
      try {
          const response = await fetch('http://localhost:8000/upload-image', {method: 'POST',body: imageData});
          console.log("Response:", response);
          if (!response.ok) {
              throw new Error("Upload failed");
          }
          delete formData.image;
          const data = await response.json();
          formData.img_url = data.img_url;
          console.log(formData);
          alert("Upload ảnh thành công!");
          ///resetCreator();
      } 
      catch (error) {
          console.error("Error uploading image:", error); 
      }

      try {
          const response = await fetch("http://localhost:8000/product", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(formData)
          });

          console.log("Response:", response);
      }
      catch (error) {
          console.error("Error creating item:", error);
      }
      alert("Tạo sản phẩm thành công!");
      resetCreator();
  }

export default createItem;