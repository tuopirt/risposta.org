import { useSignal } from "@preact/signals";

export interface PostCommentProps {
  post_id: string;
  classId: string;
}

//island
export function PostComment(props: PostCommentProps) {
  const comment = useSignal("");
  const disabled = useSignal(false);
  return (
    <div class="flex flex-col gap-4 rounded bg-white px-4 py-2">
      <p className="font-bold">Comment</p>
      <textarea
        className="border rounded px-4 py-2 w-96 h-32 resize-none"
        value={comment.value}
        onInput={(e) => {
          comment.value = e.currentTarget.value;
        }}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-max"
        disabled={disabled}
        onClick={async () => {
          disabled.value = true;
          console.log("Post Comment button clicked!");
          console.log("post_id:", props.post_id);
          console.log("comment:", comment.value);
          const req = await fetch(`/api/class/${props.post_id}/comment`, {
            method: "POST",
            body: JSON.stringify({
              content: comment.value,
              post_id: parseInt(props.post_id, 10),
            }),
          });
          if (req.ok) {
            comment.value = "";
          }
          disabled.value = false;
        }}
      >
        Post Comment
      </button>
    </div>
  );
}