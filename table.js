async function fet(){
let d = await fetch("http://localhost:3000/product")
let data=await d.json()
let final=data.map((t)=>`
  <tr>
                <td>${t.cartype}</td>
                <td>${t.email}</td>
                <td>${t.Destination}</td>
                <td>${t.departuredate}</td>
                <td>${t.Returndate}</td>
                <td>
                    <button style="background-color: rgb(27, 168, 168)" onclick="del('${t.id}')"><i class="fa fa-trash"></i></button>
                </td>
            </tr>

`).join("")
document.querySelector("#tableoutput").innerHTML=final;
}
fet()
// add data form ....................................................................
function add(){
    document.querySelector(".additem").style.display="block";
}

document.addEventListener("click", function(event) {
    let editform = document.querySelector(".additem");
    let triggerElement = document.querySelector(".addbtn");
    if (!editform.contains(event.target) && event.target !== triggerElement) {
        editform.style.display = "none";
    }
});


//delete function
function del(id){
    let res = window.confirm("do you really want to delete this Reservation")
   
    if(res)
    {
        
        fetch(`http://localhost:3000/product/${id}`,{method:"DELETE"});
    }
    else
    {
        alert("invalid click")
    }
}

