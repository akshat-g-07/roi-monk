import AddCommentIcon from "@mui/icons-material/AddComment";
import { useRouter } from "next/navigation";

export default function FeedbackButton() {
  const router = useRouter();
  return (
    <>
      <div
        className="w-fit flex mx-2 text-base font-normal bg-white text-black p-2 rounded-md hover:bg-white/90 cursor-pointer"
        onClick={() => {
          router.push("/feedback");
        }}
      >
        <AddCommentIcon className="mr-2" />
        <p>Feedback</p>
      </div>
    </>
  );
}
