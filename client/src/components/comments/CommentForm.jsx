import { useState } from "react";

export const CommentForm = ({
  btnLabel,
  formHandler,
  formCancleHandler = null,
  initialText = "",
}) => {
  const [value, setValue] = useState(initialText);
  const submitHandler = (e) => {
    e.preventDefault();
    formHandler(value);
    setValue("");
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="flex flex-col border bg-white items-end border-blue-200 rounded-lg p-4 ">
        <textarea
          className="w-full focus:outline-none"
          rows="5"
          placeholder="Leave your comment here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex flex-col-reverse gap-y-2 items-center gap-x-2 pt-2 min-[420px]:flex-row ">
          {formCancleHandler && (
            <button
              className="px-5 py-2.5 rounded-lg border border-primary text-primary mt-2"
              onClick={formCancleHandler}
            >
              Cancle
            </button>
          )}
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-primary text-white font-semibold mt-2"
          >
            {btnLabel}
          </button>
        </div>
      </div>
    </form>
  );
};
