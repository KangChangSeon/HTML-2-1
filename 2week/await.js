async function init() {
    const response = await fetch("http://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    console.log(users);
}

init();