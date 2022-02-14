# METRONICS CRM APPLICATION
[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/profjjk/metronics-crm-webapp)

[//]: # (![Licence]&#40;https://img.shields.io/github/license/profjjk/metronics-crm-webapp&#41;)

---

## PROJECT SUMMARY
A customized tool to digitize the company’s methods for organizing and tracking customers and service requests, and assist with inventory management. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with JWT authentication, app-wide state management via React Query, and deployed on AWS.

<center>
<img src="assets/demo.gif" width="60%" height="60%"/>
</center>

## TECHNOLOGIES USED
- **FRONT END**
  - [React.js](https://reactjs.org/), [React Query](https://react-query.tanstack.com/), [Day.js](https://day.js.org/en/), [Axios](https://axios-http.com/docs/intro), [Sass](https://sass-lang.com/)
- **BACK END**
  - [Node.js](https://nodejs.org/en/),  [Express.js](https://expressjs.com/), [MongoDB](https://www.mongodb.com/), [Mongoose.js](https://mongoosejs.com/), [bcrypt.js](https://www.npmjs.com/package/bcrypt), [JSON Web Tokens](https://jwt.io/)

## CODE SAMPLE
Below is an example of how to set, update, and clear the logged-in user with react-query.
```javascript
const fetchUser = async (id) => {
  try {
    return await API.getUser(id);
  } catch(err) {
    clearStoredToken();
    console.error(err.message)
  }
}

const useUser = () => {
  const qc = useQueryClient();
  const [user, setUser] = useState(getStoredToken());

  useQuery('user', () => fetchUser(user._id), {
    enabled: !!user,
    onSuccess: res => {
      setUser({
        _id: res.data._id,
        username: res.data.username
      })
    }
  })

  const updateUser = newUser => {
    setUser({
      _id: newUser._id,
      username: newUser.username
    });
    qc.setQueryData('user', user);
  }

  const clearUser = () => {
    setUser(null);
    qc.removeQueries(['user', 'jobs', 'customers', 'parts']);
  }

  return { user, updateUser, clearUser }
}

export default useUser;
```