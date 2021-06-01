function update() {

    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    } else {
        itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }
    let tbody = document.getElementById('tableBody');
    let str = "";
    itemJsonArray.sort(function(a, b) { return b[1] - a[1]; });
    if (itemJsonArray.length > 7) {
        itemJsonArray.pop();
    }
    itemJsonArray.forEach((element, index) => {
        str += `<tr>
        <td>${index + 1}</td>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
    </tr>`;
    });
    tbody.innerHTML = str;
}