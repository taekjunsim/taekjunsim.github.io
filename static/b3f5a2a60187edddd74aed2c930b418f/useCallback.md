---
title: "useCallback과 useMemo"
date: "2021-12-07"
categories: ["develop"]
---

<p class="content-subtitle">useCallback은</p>

**dependency에 따라 콜백함수(() => {}) 자체를 반환한다.**

<!-- **함수를 재선언은 하지 않고, 재사용은 하고 싶을 때 사용하는 method다.** 또는 특정 상황에서만 재선언하고 싶을 때 사용한다. -->

반면,

<p class="content-subtitle">useMemo는</p>

**dependency에 따라 콜백함수의 return값을 반환한다.**

<!-- 렌더링을 할 때마다 선언과 호출이 반복되는 함수를, 특정 상황에서만 호출하고 싶을 때 사용하는 method다. -->

예를 들어,

```
const caclulator = (a, b) => {
  return a + b;
}

console.log(calculator) // 함수 그 자체를 반환 (useCallback)
console.log(calculator()) // a + b의 결과값을 반환 (useMemo)
```

아래의 코드를 살펴보자.

App.js

```
function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });

  const { username, email } = inputs;

  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
  ]);

  const nextId = useRef(4);

  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    setUsers(users.concat(user));

    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  };

  const onToggle = id => {
    setUsers(
      users.map(user =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };

  **const count = countActiveUsers(users);**

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;
```

\*\* 변수 count에 할당된 **countActiveUsers 함수는 모든 state의 값이 변할 때마다 선언과 호출이 반복된다.**
그 결과, 입력창에 값을 입력할 때마다 '활성 사용자 수를 세는 중...'이 콘솔에 찍히는 것을 확인할 수 있다.

이럴 경우에 **users state의 값이 변할 때만**, countActiveUsers 함수를 호출하여 값을 받아오기 위해 아래와 같이 useMemo를 사용한다.

```
const count = useMemo(() => countActiveUsers(users), [users]);
```

useMemo의 deps에 포함된 users state의 값이 변하지 않는다면 countActiveUsers 함수는 호출되지 않는다.

#### 결론

dependency에 따라<br>
useCallback은 **콜백함수 자체**를 반환하고,<br>
useMemo는 **콜백함수의 return 값**을 반환한다.

끝!

**참고**

- [벨로퍼트](https://react.vlpt.us/basic/17-useMemo.html)
- [이화랑 블로그](https://leehwarang.github.io/2020/05/02/useMemo&useCallback.html)
- [any-ting](https://any-ting.tistory.com/83)
- [woong-jae](https://woong-jae.com/react/210826-useMemo-useCallback)
