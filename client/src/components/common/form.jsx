import { Label } from "@radix-ui/react-label";
import React from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const CommonForm = ({
  fromControls,
  fromData,
  setFromData,
  onSubmit,
  buttonText,
}) => {
  function renderInputsBycomponentTypes(getControlItem) {
    let element = null;

    const value = fromData[getControlItem.name] || "";
    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            name={getControlItem.name}
            paceholder={getControlItem.paceholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(e) =>
              setFromData({
                ...fromData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );
        break;

      case "select":
        element = (
          <Select
            value={fromData[getControlItem.name] || ""}
            onValueChange={(value) =>
              setFromData({
                ...fromData,
                [getControlItem.name]: value,
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options?.length > 0 &&
                getControlItem.options.map((optionItem) => (
                  <SelectItem key={optionItem.id} value={optionItem.label}>
                    {optionItem.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        );
        break;

      case "textarea":
        element = (
          <Textarea
            name={getControlItem.name}
            paceholder={getControlItem.paceholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(e) =>
              setFromData({
                ...fromData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );
        break;
      default:
        element = (
          <Input
            name={getControlItem.name}
            paceholder={getControlItem.paceholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(e) =>
              setFromData({
                ...fromData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );
        break;
    }
    return element;
  }

  return (
    <form action="" onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {fromControls.map((item) => (
          <div key={item.name} className="grid w-full gap-1.5">
            <Label className="mb-1">{item.label}</Label>
            {renderInputsBycomponentTypes(item)}
          </div>
        ))}
      </div>
      <Button type="submit" className="mt-2 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;
