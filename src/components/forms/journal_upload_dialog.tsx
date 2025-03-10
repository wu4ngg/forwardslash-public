"use client";
import { Dialog } from "@/widgets/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { title } from "process";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Check, Image, X } from "lucide-react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Button from "@/widgets/button";
import Loader from "@/widgets/loader";
import ProgressBar from "@/widgets/progress-bar";
import { useState } from "react";
import { uploadFile } from "@/firebase/storage/upload_file";
import { uploadJournal } from "@/firebase/firestore/repositories/journal_repo";
import { IJournal } from "@/types/journal.type";
const journalSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, { message: "Title is required" }),
  content: z
    .string({ required_error: "Content is required" })
    .min(1, { message: "Content is required" }),
  image: z.instanceof(File).optional(),
  tags: z.array(z.string()).optional(),
});
export type JournalSchemaType = z.infer<typeof journalSchema>;
type JournalUploadDialogProps = {
  open: boolean;
  onClose: () => void;
  onUpload: (data: IJournal) => void;
};
export default function JournalUploadDialog(props: JournalUploadDialogProps) {
  const form = useForm<JournalSchemaType>({
    resolver: zodResolver(journalSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<Error>();
  async function handleUploadJournal(data: JournalSchemaType) {
    setIsUploading(true);
    if (!data.image) {
      const today = new Date();

      const journal: IJournal = {
        ...data,
        image: "",
        createdAt: today,
        isPublished: true,
        isFeatured: false,
        isDraft: false,
      };
      uploadJournal(journal).then((e) => {
        setIsUploadComplete(true);
        form.reset();
        props.onUpload(journal);
      });
      return;
    }
    uploadFile(
      (url) => {
        const today = new Date();
        const journal: IJournal = {
          ...data,
          image: url,
          createdAt: today,
          isPublished: true,
          isFeatured: false,
          isDraft: false,
        };
        uploadJournal(journal).then((e) => {
          setIsUploadComplete(true);
          form.reset();
          props.onUpload(journal);
        });
      },
      (progress) => {
        setUploadProgress(progress);
      },
      (e) => {
        setError(e);
      },
      data.image
    );
  }
  return (
    <Dialog
      open={props.open}
      onOpenChange={isUploading ? () => {} : props.onClose}
      title="Upload Journal"
      description="Upload your journal here"
      className="min-w-[50%]"
    >
      <div className="relative w-full">
        <AnimatePresence>
          {isUploading && (
            <motion.div
              initial={{ scale: 1.25, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.25, opacity: 0 }}
              transition={{ type: "spring", bounce: 0, velocity: 1 }}
              className="w-full h-full absolute bg-background_hex/75 z-30 flex justify-center items-center gap-4 flex-col"
            >
              <div className="flex flex-col gap-4 justify-center items-center">
                {isUploadComplete ? (
                  <>
                    <Check size={32} />
                    <p>Upload Complete</p>
                    <div className="flex gap-4">
                      <Button
                        onClick={() => {
                          setIsUploadComplete(false);
                          setIsUploading(false);
                          setUploadProgress(0);
                        }}
                        variant="outlined"
                      >
                        Continue uploading
                      </Button>
                      <Button
                        onClick={() => {
                          setIsUploadComplete(false);
                          setIsUploading(false);
                          setUploadProgress(0);
                          props.onClose();
                        }}
                        variant="secondary"
                      >
                        Finish
                      </Button>
                    </div>
                  </>
                ) : error ? (
                  <>
                    <X size={32} />
                    <p>{error!.message}</p>
                    <Button
                      onClick={() => {
                        setError(undefined);
                        setIsUploading(false);
                        setUploadProgress(0);
                      }}
                      variant="secondary"
                    >
                      OK
                    </Button>
                  </>
                ) : (
                  <>
                    <Loader />
                    <p>Uploading, just a moment...</p>
                    <ProgressBar progress={uploadProgress} />
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUploadJournal)}
            className="w-full space-y-4"
          >
            <FormField
              name="image"
              render={({ field }) => (
                <FormItem>
                  <motion.label
                    whileHover={{ scale: 0.975 }}
                    whileTap={{ scale: 0.875 }}
                    transition={{ ease: "backOut" }}
                    htmlFor="imageUpload"
                    className="w-full bg-background border-2 border-foreground p-2 flex items-center justify-center border-dashed flex-col gap-2 cursor-pointer hover:border-solid"
                  >
                    <AspectRatio ratio={30 / 9}>
                      {field.value ? (
                        <img
                          src={URL.createObjectURL(field.value)}
                          alt="image"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full flex flex-col items-center justify-center gap-2 h-full">
                          {" "}
                          <Image size={32} /> Upload Image{" "}
                        </div>
                      )}
                    </AspectRatio>
                  </motion.label>
                  <FormControl>
                    <input
                      accept="image/*"
                      id="imageUpload"
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          form.setValue("image", file);
                        }
                      }}
                      className="w-full hidden"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      type="text"
                      {...field}
                      placeholder="Title"
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <textarea
                      {...field}
                      placeholder="Content"
                      className="w-full h-16"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex gap-2">
              <Button
                type="submit"
                variant="secondary"
                className="flex-1 flex justify-center"
              >
                Upload
              </Button>
              <Button
                type="button"
                onClick={isUploading ? () => {} : props.onClose}
                variant="outlined"
                className="flex-1 flex justify-center"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Dialog>
  );
}
