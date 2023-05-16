let data = [];
viewdata();

function save() {
    let add = document.getElementById('add').value;

    let obj = {
        id: Math.floor(Math.random() * 999),
        add: add,
    };

    if (add === "") {
        alert("You must add something");
        return false;
    }

    if (localStorage.getItem('todo') === null || localStorage.getItem('todo') === undefined) {
        data.push(obj);
        localStorage.setItem('todo', JSON.stringify(data));
    } else {
        let val = JSON.parse(localStorage.getItem('todo'));
        val.push(obj);
        localStorage.setItem('todo', JSON.stringify(val));
    }

    alert("Record Successfully Added");
    document.getElementById('add').value = "";
    viewdata();
}

function viewdata() {
    let val = JSON.parse(localStorage.getItem('todo'));
    let tbl = "";

    for (let i in val) {
        tbl += `
            <li>${val[i].add}<button class="delete" onclick="deletedata(${val[i].id})">Delete</button></li>
        `;
    }

    document.getElementById('list').innerHTML = tbl;
}

function deletedata(id) {
    let val = JSON.parse(localStorage.getItem('todo'));

    let ans = val.filter((v) => {
        return v.id !== id;
    });

    localStorage.setItem('todo', JSON.stringify(ans));
    alert("Record successfully deleted");
    viewdata();
}

function editdata(id) {
    let val = JSON.parse(localStorage.getItem('todo'));
    for (let i in val) {
        if (val[i].id === id) {
            document.getElementById('add').value = val[i].add;
        }
    }
}

function edit() {
    let id = document.getElementById('id').value;
    let add = document.getElementById('add').value;
    let val = JSON.parse(localStorage.getItem('todo'));

    for (let i in val) {
        if (val[i].id === id) {
            val[i].add = add;
        }
    }

    localStorage.setItem('todo', JSON.stringify(val));
    alert("Record Successfully Edited");
    viewdata();
}
