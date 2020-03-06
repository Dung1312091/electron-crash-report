import React, { memo } from "react";
import useFetch from "../../hooks/useFetch";
import history from "../../history";
const User = memo(({ data = [] }) => {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Title</th>
          <th>Body</th>
        </tr>
      </thead>
      <tbody>
        {data.map(post => {
          return (
            <tr
              key={post.id}
              onClick={() => {
                history.push(`/post/${post.id}`);
              }}
            >
              <td>{post.title}</td>
              <td>{post.body}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});
export default function Users() {
  const { isLoading, data } = useFetch("/posts");
  return (
    <div>
      <h1>List Users</h1>
      {isLoading ? <h3>Loading....</h3> : <User data={data} />}
    </div>
  );
}
