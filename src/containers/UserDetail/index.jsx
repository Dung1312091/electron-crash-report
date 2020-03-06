import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
export default function UserDetail() {
  const { id } = useParams();
  const { isLoading, data } = useFetch(`/posts/${id}`);
  console.log({ data });
  return (
    <div>
      <button>Heelo</button>
    </div>
  );
}
