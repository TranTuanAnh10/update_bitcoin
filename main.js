setInterval(function(){ getData(); }, 1000);

async function getBitcoinPrice() {
    const price = await fetch('https://api.coinbase.com/v2/prices/spot?currency=USD');
    const rs = price.json();
    return rs;
}

async function getData() {
    const rs = await getBitcoinPrice();
    const table = document.getElementById("btc");
    table.innerHTML = `
         <tr>
            <th>Coin</th>
            <th>Giá hiện tại</th>
            <th>Thời gian</th>
            <th>Cài đặt giá</th>
            <th>Trong khoảng</th>
            <th>Thông báo tới</th>
            <th>Chỉnh sửa/Xóa</th>
        </tr>
        <tr>
            <td>${rs.data.base}</td>
            <td>${rs.data.amount}${rs.data.currency}</td>
            <td id="time-now"></td>
            <td>Tăng 2000$</td>
            <td>15m</td>
            <td>@tienanh</td>
            <td>Chỉnh sửa/Xóa</td>
        </tr>
    `
    var today = new Date();
    var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    document.getElementById("time-now").innerHTML = dateTime;

}