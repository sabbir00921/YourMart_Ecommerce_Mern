import React, { Fragment, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";
import CommonForm from "./../../components/common/form";
import { addProductFormElements } from "../../../config";
import ProductImageUpload from "../../components/admin-view/image-upload";

const initialFormData = {
  iamge: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

const AdminProducts = () => {
  const [openCreateProduct, setOpenCreateProduct] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  function onSubmit() {}

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProduct(true)}>Add Product</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 "></div>
      <Sheet
        open={openCreateProduct}
        onOpenChange={() => setOpenCreateProduct(false)}
      >
        <SheetContent side="right" className="overflow-auto px-6">
          <SheetHeader>
            <SheetTitle>Add new Products</SheetTitle>
          </SheetHeader>
          <ProductImageUpload image={image} setImage={setImage} imageUrl={imageUrl} setImageUrl={setImageUrl}/>
          <div className="py-6">
            <CommonForm
              fromData={formData}
              setFromData={setFormData}
              buttonText="Add"
              onSubmit={onSubmit}
              fromControls={addProductFormElements}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
