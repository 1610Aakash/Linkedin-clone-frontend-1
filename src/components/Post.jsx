const Post = ({ post }) => (
  <div className="border p-4 rounded mb-4 shadow-sm bg-white">
    <p className="text-gray-800">{post.content}</p>
    <div className="text-sm text-gray-500 mt-2">
      by <span className="font-medium">{post.author.name}</span> on {new Date(post.createdAt).toLocaleString()}
    </div>
  </div>
);

export default Post;
