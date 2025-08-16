import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { SelectDemo } from "../components/ui/selectBox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import "./index.css";
import { formSchema } from "../lib/schema";

export type FormDataType = z.infer<typeof formSchema>;

function App() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<FormDataType>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FormDataType | null>(null);

  const handleReset = () => {
    reset();
    localStorage.removeItem("formData");
    setMessage("Form is reset successfully ✅");
  };

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      reset(JSON.parse(savedData));
    }
  }, [reset]);

  const onSubmit = (data: FormDataType) => {
    setFormData(data);
    setOpen(true);
    localStorage.setItem("formData", JSON.stringify(data));
    setMessage("");
  };

  return (
    <div className="overflow-x-hidden w-full h-dvh flex justify-center items-center mood px-4">
      <div className="w-full max-w-2xl flex flex-col justify-center items-center bg-violet-800 shadow-md shadow-violet-800 rounded-2xl p-6">
        <h1 className="text-2xl font-semibold text-center text-white mb-6">
          Sign Up
        </h1>

        <form
          className="w-full flex flex-col items-center space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Full Name */}
          <Input
            type="text"
            {...register("fullName")}
            className="w-full md:w-3/4 py-2 bg-gray-200 rounded-md"
            placeholder="Full Name"
          />
          {errors.fullName && (
            <p className="text-red-400 text-sm">{errors.fullName.message}</p>
          )}

          {/* Email */}
          <Input
            type="email"
            {...register("email")}
            className="w-full md:w-3/4 py-2 bg-gray-200 rounded-md"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-400 text-sm">{errors.email.message}</p>
          )}

          {/* Password */}
          <Input
            type="password"
            {...register("password")}
            className="w-full md:w-1/2 py-2 bg-gray-200 rounded-md"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-400 text-sm">{errors.password.message}</p>
          )}

          {/* Confirm Password */}
          <Input
            type="password"
            {...register("confirmPassword")}
            className="w-full md:w-1/2 py-2 bg-gray-200 rounded-md"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <p className="text-red-400 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}

          {/* Age */}
          <div className="w-dvw md:w-3/4 flex justify-center items-center space-x-1">
            <label className="text-white text-sm">Age:</label>
            <Input
              type="number"
              {...register("age", { valueAsNumber: true })}
              className="w-1/3 py-2 bg-gray-200 rounded-md"
              placeholder="Optional"
            />
          </div>
          {errors.age && (
            <p className="text-red-400 text-sm">{errors.age.message}</p>
          )}

          {/* Select Box */}
          <div className="w-full md:w-1/4 flex justify-center items-center ml-8">
            <SelectDemo control={control} errors={errors} />
          </div>

          {/* Checkbox */}
          <div className="flex justify-center items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              {...register("terms")}
              className="accent-pink-400"
            />
            <label htmlFor="terms" className="text-sm text-white">
              I agree to the privacy
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-400 text-sm">{errors.terms.message}</p>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="outline"
            disabled={!isValid}
            className="duration-700 ease-in-out bg-pink-300 text-black hover:bg-black hover:text-white border-0 transition my-4 cursor-pointer hover:animate-bounce"
          >
            Submit
          </Button>

          {/* Reset Button */}
          <Button
            type="button"
            variant="secondary"
            onClick={handleReset}
            className="bg-gray-300 text-black hover:bg-black hover:text-white"
          >
            Reset
          </Button>
          {/* Success Message */}
          {message && <p className="text-white mt-1">{message}</p>}
          
        </form>

        {/* Modal */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="bg-amber-50 text-indigo-950">
            <DialogHeader>
              <DialogTitle className="text-green-700">Registration Successful</DialogTitle>
            </DialogHeader>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Full Name:</strong> {formData?.fullName}
              </p>
              <p>
                <strong>Email:</strong> {formData?.email}
              </p>
              <p>
                <strong>Role:</strong> {formData?.role}
              </p>
              {formData?.age !== undefined && (
                <p>
                  <strong>Age:</strong> {formData.age}
                </p>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default App;
