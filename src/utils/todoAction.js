const createTodo = (data) => {
    let getItems = localStorage.getItem('todoList');

    if(getItems) {
        let parsedItem = JSON.parse(getItems);
        parsedItem.push({
            title: data.title,
            status: "Open"
        });

        localStorage.setItem('todoList', parsedItem);
    } else {
        localStorage.setItem('todoList', JSON.stringify([{
            title: data.title,
            status: "Open"
        }]));
    }
}

const getTodoList = () => {
    let getList = JSON.parse(localStorage.getItem('todoList'));

    return getList;
    
}

export default {
    createTodo,
    getTodoList
}