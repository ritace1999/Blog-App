import { images } from "../../constants";
import { BiMessageMinus, BiEditAlt, BiTrash } from "react-icons/bi";
import { CommentForm } from "./CommentForm";
export const Comment = ({
  comment,
  logginedUserId,
  affectedComment,
  setAffectedComment,
  addComment,
  parentId = null,
  updateComment,
  deleteComment,
  replies,
}) => {
  const isLoggined = Boolean(logginedUserId);
  const userComment = logginedUserId === comment.user._id;
  const isReplying =
    affectedComment &&
    affectedComment.type === "replying" &&
    affectedComment._id === comment._id;
  const isEditing =
    affectedComment &&
    affectedComment.type === "editing" &&
    affectedComment._id === comment._id;
  const repliedCommentId = parentId ? parentId : comment._id;
  const replyOnUserId = comment.user._id;
  return (
    <div className="flex flex-nowrap items-start gap-x-3 bg-white p-3 rounded-lg">
      <img
        src={images.profilePic}
        alt="profile "
        className="w-9 h-9 object-cover rounded-full"
      />
      <div className="flex-1 flex flex-col">
        <h5 className="font-bold text-dark-hard text-xs lg:text-sm">
          {comment.user.name}
        </h5>
        <span className="text-xs text-dark-light">
          {new Date(comment.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
          })}
        </span>
        {!isEditing && (
          <p className="font-opensans mt-[10px] text-dark-light">
            {comment.desc}
          </p>
        )}

        {isEditing && (
          <CommentForm
            btnLabel="update"
            formHandler={(value) => updateComment(value, comment._id)}
            formCancleHandler={() => setAffectedComment(null)}
            initialText={comment.desc}
          />
        )}
        <div className="flex flex-row items-center gap-x-3 text-dark-light font-roboto text-sm mt-3 mb-3">
          {isLoggined && (
            <button
              className="flex items-center space-x-2"
              onClick={() =>
                setAffectedComment({ type: "replying", _id: comment._id })
              }
            >
              <BiMessageMinus className="w-4 h-auto" />
              <span>Reply</span>
            </button>
          )}
          {userComment && (
            <>
              <button
                className="flex items-center space-x-2 "
                onClick={() =>
                  setAffectedComment({ type: "editing", _id: comment._id })
                }
              >
                <BiEditAlt className="w-4 h-auto" />
                <span>Edit</span>
              </button>
              <button
                className="flex items-center space-x-2"
                onClick={() => deleteComment(comment._id)}
              >
                <BiTrash className="w-4 h-auto" />
                <span>Delete</span>
              </button>
            </>
          )}
        </div>
        {isReplying && (
          <CommentForm
            btnLabel={"Reply"}
            formHandler={(value) =>
              addComment(value, repliedCommentId, replyOnUserId)
            }
            formCancleHandler={() => setAffectedComment(null)}
          />
        )}
        {replies.length > 0 && (
          <div>
            {replies.map((reply) => (
              <Comment
                key={reply._id}
                addComment={addComment}
                affectedComment={affectedComment}
                setAffectedComment={setAffectedComment}
                comment={reply}
                deleteComment={deleteComment}
                logginedUserId={logginedUserId}
                replies={[]}
                updateComment={updateComment}
                parentId={comment._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
