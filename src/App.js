import React, { Suspense } from "react";
import { fetchData } from "./API";
import spinner from "./spinner.gif";

const resource = fetchData();

function App() {
  return (
    <div className="my-5">
      <Suspense fallback={<Spinner />}>
        <ProfileDetails />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <ProfilePosts />
      </Suspense>
    </div>
  );
}

const ProfileDetails = () => {
  const user = resource.user.read();

  return (
    <div className="card card-body my-3">
      <h1 className="large text-primary">{user.name}</h1>
      <ul>
        <li>Username: {user.username}</li>
        <li>Email: {user.email}</li>
        <li>City: {user.city}</li>
      </ul>
    </div>
  );
};

const ProfilePosts = () => {
  const posts = resource.posts.read();

  return (
    <ul className="list-group">
      <li className="list-group-item">
        <strong>Latest Posts</strong>
      </li>
      {posts.map(post => (
        <li className="list-group-item" key={post.id}>
          {post.title}
        </li>
      ))}
    </ul>
  );
};

const Spinner = () => (
  <img
    src={spinner}
    style={{ width: "200px", margin: "auto", display: "block" }}
    alt="Loading..."
  />
);

export default App;
