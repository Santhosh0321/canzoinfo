import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FormData {
  name: string;
  email: string;
  resume: FileList;
}

const CareersApplyPage = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    console.log("Form submitted", data);
    // TODO: send data to backend
    reset();
    navigate("/careers");
  };

  return (
    <motion.div
      className="container mx-auto py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6">Apply for a Role</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-lg">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            {...register("name", { required: true })}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register("email", { required: true })}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="resume">Resume (PDF)</label>
          <input
            id="resume"
            type="file"
            accept="application/pdf"
            {...register("resume", { required: true })}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button
          type="submit"
          className="flex items-center bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition"
        >
          Submit <ArrowRight className="ml-2" size={16} />
        </button>
      </form>
    </motion.div>
  );
};

export default CareersApplyPage;
