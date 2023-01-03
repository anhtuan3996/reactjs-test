export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return { Authorization: "TOKEN " + user.token };
  } else {
    return {};
  }
}
