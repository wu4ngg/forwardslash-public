"use client";
import JournalUploadDialog from "@/components/forms/journal_upload_dialog";
import JournalEntry from "@/components/journal_entry";
import SideHeader from "@/components/side_header";
import { getJournal } from "@/firebase/firestore/repositories/journal_repo";
import { IJournal } from "@/types/journal.type";
import ErrorView from "@/widgets/error-view";
import FloatingActionButton from "@/widgets/fab";
import Loader from "@/widgets/loader";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function JournalPage() {
  const [journals, setJournals] = useState<IJournal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  async function fetchJournal() {
    try {
      const journals = await getJournal();
      console.log(journals);
      setJournals(journals);
      setLoading(false);
    } catch (error) {
      setError(error as Error);
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchJournal();
  }, []);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  return (
    <div className="pr-8 flex mb-8">
      <SideHeader text="Journal" />

      <div className="w-full pl-8 flex gap-4">
        {loading ? (
          <div className="flex-1 flex items-center justify-center gap-4">
            <Loader />
            <p>Loading...</p>
          </div>
        ) : null}
        {error ? (
          <div className="flex-1">
            <ErrorView
              emoticon="✖‿✖"
              title="Error"
              message="Failed to fetch journal entries"
            />
          </div>
        ) : null}
        {journals.length == 0 && !loading && !error ? (
          <div className="flex-1 flex items-center justify-center">
            <ErrorView
              emoticon="📓"
              title="No Journal Entries"
              message="You have not uploaded any journal entries"
            />
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 flex-1">
              {journals.map((journal, index) => {
                if (index % 3 == 0) {
                  return (
                    <JournalEntry key={journal.id} {...journal} index={index} />
                  );
                }
                return null;
              })}
            </div>
            <div className="flex flex-col gap-4 flex-1">
              {journals.map((journal, index) => {
                if (index % 3 == 1) {
                  return (
                    <JournalEntry key={journal.id} {...journal} index={index} />
                  );
                }
                return null;
              })}
            </div>
            <div className="flex flex-col gap-4 flex-1">
              {journals.map((journal, index) => {
                if (index % 3 == 2) {
                  return (
                    <JournalEntry key={journal.id} {...journal} index={index} />
                  );
                }
                return null;
              })}
            </div>
          </>
        )}
      </div>
      <FloatingActionButton
        icon={<Plus />}
        text="Upload"
        onClick={() => {
          setOpenUploadDialog(true);
        }}
      />
      <JournalUploadDialog
        open={openUploadDialog}
        onClose={() => {
          setOpenUploadDialog(false);
        }}
        onUpload={(journal) => {
          setJournals([journal, ...journals]);
        }}
      />
    </div>
  );
}
