import AddCommentIcon from "@mui/icons-material/AddComment";

export default function FeedbackButton() {
  return (
    <>
      <div className="w-32 mx-2 text-base font-normal bg-white text-black p-2 rounded-md hover:bg-white/90">
        <AddCommentIcon className="mr-2" />
        Feedback
      </div>
    </>
  );
}
