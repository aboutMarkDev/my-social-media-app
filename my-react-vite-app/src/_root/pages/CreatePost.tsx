import PostForm from "@/components/forms/PostForm";

function CreatePost() {
  return (
    <div className="flex flex-1">
      <div className="common-container ">
        <div className="max-w-5xl flex-start gap-1 justify-start w-full">
          <h2 className="h3-bold md:h2-bold text-left w-full">Create Post</h2>
        </div>

        {/* Post Component */}
        <PostForm action="Create" />
      </div>
    </div>
  );
}

export default CreatePost;
