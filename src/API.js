export const fetchData = () => {
  const userPromise = fetchUser();
  const postsPromise = fetchPosts();

  return {
    user: wrapPromise(userPromise),
    posts: wrapPromise(postsPromise)
  }
}

const wrapPromise = (promise) => {
  // set status
  let status = "pending";

  // store result
  let result;

  // wait for promise
  let suspender = promise.then(
    response => {
      status = "success";
      result = response
    },
    error => {
      status = error;
      result = error
    })

    return {
      read() {
        if (status === "pending" ) {
          throw suspender;
        } else if (status === "error") {
          throw result;
        } else if (status === "success") {
          return result;
        }
      }
    }


}

const fetchUser = async () => {
  console.log("Fetching user...");

  try {
    const userData = await fetch(
      "https://jsonplaceholder.typicode.com/users/1"
    );
    const user = await userData.json();
    return user;
  } catch (error) {
    console.log(error);
  }
};

const fetchPosts = async () => {
  console.log("Fetching posts...");

  try {
    const postsData = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const posts = await postsData.json();
    return posts;
  } catch (error) {
    console.log(error);
  }
};
