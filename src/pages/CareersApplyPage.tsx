import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, FileText, Upload } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const formSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(10, "Enter a valid phone number").max(15),
  currentRole: z.string().min(2, "Current role / title is required"),
  experience: z.enum(["0-1 years", "1-3 years", "3-5 years", "5+ years"], {
    required_error: "Please select your experience level",
  }),
  location: z.string().min(2, "Location is required"),
  portfolioUrl: z.string().url("Enter a valid URL (e.g. https://portfolio.com)").optional().or(z.literal("")),
  linkedinUrl: z.string().url("Enter a valid LinkedIn URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Enter a valid GitHub URL").optional().or(z.literal("")),
  coverLetter: z.string().min(50, "Please write at least 50 characters").max(2000, "Keep it under 2000 characters"),
  availability: z.enum(["Immediately", "2 weeks", "1 month", "More than 1 month"], {
    required_error: "Please select your availability",
  }),
  resume: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, "Resume is required")
    .refine((files) => files[0]?.size <= MAX_FILE_SIZE, "File must be under 10 MB")
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files[0]?.type),
      "Only PDF or DOC files are allowed"
    ),
});

type FormValues = z.infer<typeof formSchema>;

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const CareersApplyPage = () => {
  const [searchParams] = useSearchParams();
  const jobTitle = searchParams.get("role") || "Open Role";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      currentRole: "",
      location: "",
      portfolioUrl: "",
      linkedinUrl: "",
      githubUrl: "",
      coverLetter: "",
      experience: undefined,
      availability: undefined,
      resume: undefined,
    },
  });

  const onSubmit = (values: FormValues) => {
    // eslint-disable-next-line no-console
    console.log("Career application submitted:", values);
  };

  const isSubmitted = form.formState.isSubmitSuccessful;
  const resumeValue = form.watch("resume");

  return (
    <div className="min-h-screen">
      <section className="pt-28 pb-20 relative overflow-hidden">
        <div className="absolute top-10 -right-20 w-[500px] h-[500px] rounded-full bg-accent/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 -left-32 w-[300px] h-[300px] rounded-full bg-accent/10 blur-[80px] pointer-events-none" />

        <div className="container max-w-3xl relative z-10">
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Careers
          </Link>

          {/* Header */}
          <motion.div {...fadeUp} className="mb-10">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent/15 text-accent-foreground text-xs font-semibold tracking-wide uppercase border border-accent/20 mb-4">
              💼 Job Application
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight tracking-tight mb-4">
              Apply for{" "}
              <span className="text-gradient">{jobTitle}</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Fill in your details below. We review every application carefully and will reach out to you soon.
            </p>
          </motion.div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 sm:p-12 rounded-2xl bg-accent/10 border border-accent/20 text-center"
            >
              <CheckCircle2 className="w-14 h-14 text-accent mx-auto mb-4" />
              <h2 className="text-2xl font-display font-bold mb-2">Application Received!</h2>
              <p className="text-muted-foreground mb-6">
                Thank you for applying for the <strong>{jobTitle}</strong> role. We will review your details and reach out via email or phone soon.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link to="/careers">
                  <Button variant="outline" className="rounded-full">
                    Back to Careers
                  </Button>
                </Link>
                <Button
                  onClick={() => form.reset(undefined, { keepIsSubmitSuccessful: false })}
                  className="rounded-full bg-accent text-accent-foreground hover:bg-amber-hover"
                >
                  Submit Another Response
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div {...fadeUp} className="p-6 sm:p-10 rounded-2xl bg-card border border-border shadow-sm">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                  {/* Personal Details */}
                  <div className="space-y-5">
                    <h2 className="text-lg font-display font-semibold text-foreground border-b border-border pb-3">
                      Personal Details
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="+91 98765 43210" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Location <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="City, State" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Professional Details */}
                  <div className="space-y-5">
                    <h2 className="text-lg font-display font-semibold text-foreground border-b border-border pb-3">
                      Professional Details
                    </h2>
                    <FormField
                      control={form.control}
                      name="currentRole"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Role / Job Title <span className="text-destructive">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Software Engineer, Student" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Years of Experience <span className="text-destructive">*</span></FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="flex flex-wrap gap-3"
                            >
                              {["0-1 years", "1-3 years", "3-5 years", "5+ years"].map((exp) => (
                                <FormItem key={exp} className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value={exp} />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">{exp}</FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="availability"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Notice Period / Availability <span className="text-destructive">*</span></FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="flex flex-wrap gap-3"
                            >
                              {["Immediately", "2 weeks", "1 month", "More than 1 month"].map((opt) => (
                                <FormItem key={opt} className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value={opt} />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">{opt}</FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Links */}
                  <div className="space-y-5">
                    <h2 className="text-lg font-display font-semibold text-foreground border-b border-border pb-3">
                      Your Links <span className="text-xs font-normal text-muted-foreground">(optional)</span>
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="portfolioUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Portfolio / Website</FormLabel>
                            <FormControl>
                              <Input placeholder="https://yourportfolio.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="linkedinUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>LinkedIn Profile</FormLabel>
                            <FormControl>
                              <Input placeholder="https://linkedin.com/in/..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="githubUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GitHub Profile</FormLabel>
                          <FormControl>
                            <Input placeholder="https://github.com/..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Cover Letter */}
                  <div className="space-y-5">
                    <h2 className="text-lg font-display font-semibold text-foreground border-b border-border pb-3">
                      Cover Letter
                    </h2>
                    <FormField
                      control={form.control}
                      name="coverLetter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Why do you want to join Canzo? <span className="text-destructive">*</span></FormLabel>
                          <FormControl>
                            <textarea
                              rows={5}
                              placeholder="Tell us about yourself, your motivation for applying, and what makes you a great fit for this role..."
                              className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-accent focus:outline-none text-foreground transition-colors resize-none text-sm"
                              {...field}
                            />
                          </FormControl>
                          <p className="text-xs text-muted-foreground text-right">
                            {field.value?.length ?? 0} / 2000 characters
                          </p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Resume Upload */}
                  <div className="space-y-5">
                    <h2 className="text-lg font-display font-semibold text-foreground border-b border-border pb-3">
                      Resume / CV
                    </h2>
                    <FormField
                      control={form.control}
                      name="resume"
                      render={({ field: { onChange, ref, ...rest } }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>
                            Upload your Resume <span className="text-destructive">*</span>
                            <span className="ml-2 text-xs font-normal text-muted-foreground">(PDF or DOC, max 10 MB)</span>
                          </FormLabel>
                          <FormControl>
                            <div className="flex flex-col gap-3">
                              <Label
                                htmlFor="resume-upload"
                                className={`inline-flex items-center gap-3 px-5 py-4 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
                                  resumeValue && resumeValue.length === 1
                                    ? "border-accent/50 bg-accent/5"
                                    : "border-border hover:border-accent/30 hover:bg-accent/5"
                                }`}
                              >
                                {resumeValue && resumeValue.length === 1 ? (
                                  <>
                                    <FileText className="w-5 h-5 text-accent shrink-0" />
                                    <div>
                                      <p className="text-sm font-medium text-foreground">{resumeValue[0].name}</p>
                                      <p className="text-xs text-muted-foreground">
                                        {(resumeValue[0].size / (1024 * 1024)).toFixed(2)} MB — Click to change
                                      </p>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <Upload className="w-5 h-5 text-muted-foreground shrink-0" />
                                    <div>
                                      <p className="text-sm font-medium text-foreground">Click to upload your resume</p>
                                      <p className="text-xs text-muted-foreground">PDF or DOC • Max 10 MB</p>
                                    </div>
                                  </>
                                )}
                              </Label>
                              <Input
                                id="resume-upload"
                                type="file"
                                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                ref={ref}
                                onChange={(e) => onChange(e.target.files)}
                                {...rest}
                                className="hidden"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="w-full rounded-full bg-accent text-accent-foreground font-semibold text-base hover:bg-amber-hover transition-all glow-amber h-12"
                  >
                    {form.formState.isSubmitting ? "Submitting..." : "Submit Application"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </Form>
            </motion.div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CareersApplyPage;
