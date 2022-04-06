// const axios = require('axios');
setInterval(function(){ getData(); }, 1000);

async function getBitcoinPrice() {
    const price = await fetch('https://api.coinbase.com/v2/prices/spot?currency=USD');
    const rs = price.json();
    return rs;
}
// async function getBitcoinHistory() {
//     const priceHis = await fetch('https://blockchain.info/ticker');
//     // console.log(priceHis);
//     const rs = priceHis.json();
//     return rs;
// }

async function getBitcoinHistory(time) {

    const priceHis = await fetch(`https://blockchain.info/frombtc?value=100000000&currency=USD&time=${time}`);
    // let xyz = priceHis.json();

//     await fetch('https://blockchain.info/frombtc?value=100000000&currency=USD&time=1630121400000')
//   .then(response => response.json())
//   .then(data => console.log(data));

    // console.log("====", priceHis.json());
    return priceHis.text();
}



function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
// getBitcoinHistory().then( function(data){
//     console.log(data);
// });
// console.log("aaaaa", rsHis)

// {"data":{"base":"BTC","currency":"USD","amount":"46652.25"}}

    

    var timeHisElemant = document.getElementById('timeHis');
    console.log(timeHisElemant)
    timeHisElemant.onchange = function(e){
        var timeHis = e.target.value;
    }
    
    // console.log(dateNow)

// async function getDateHis(){
//     console.log(timeHis.value);
//     var dateNow = new Date().getTime();
//     console.log(dateNow)
//     const rsHis = await getBitcoinHistory(1649213118224);
//     return rsHis;
// }

async function getData() {
    const rs = await getBitcoinPrice();
    var dateNow = new Date().getTime();
    console.log(dateNow);
    var timeUnixHis = dateNow - (timeHis.value * 60)
    console.log(timeUnixHis);
    const rsHis = await getBitcoinHistory(timeUnixHis);
    const table = document.getElementById("btc");
    const btcNow = rs.data.amount;
    // btcNow.toLocaleString('en');
    var btcFormat = formatNumber(btcNow);
    var btcHisFormat = formatNumber(rsHis);
    table.innerHTML = `
        <tr>
            <th>Coin</th>
            <th>Giá hiện tại</th>
            <th>Thời gian</th>
            <th>Giá 15p trước</th>
            <th>Cài đặt giá</th>
            <th>Trong khoảng</th>
            <th>Thông báo tới</th>
            <th>Chỉnh sửa/Xóa</th>
        </tr>
        <tr>
            <td>${rs.data.base}</td>
            <td>${btcFormat} ${rs.data.currency}</td>
            <td id="time-now"></td>
            <td>${btcHisFormat} USD</td>
            <td id="text"></td>
            <td>${timeHis.value} m</td>
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

