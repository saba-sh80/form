import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";
import type { FormDataType } from "../../src/App";

type Props = {
  control: Control<FormDataType>;
  errors: FieldErrors<FormDataType>;
};

export function SelectDemo({ control, errors }: Props) {
  return (
    <Controller
      name="role"
      control={control}
      render={({ field }) => (
        <>
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="w-[100px] bg-gray-200 hover:bg-gray-400 cursor-pointer">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent className="bg-gray-200">
              <SelectGroup>
                <SelectItem value="User">User</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Moderator">Moderator</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
          )}
        </>
      )}
    />
  );
}
