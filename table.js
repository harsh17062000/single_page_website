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
                    <button ><i class="fa fa-eye"></i></button>
                    <button style="background-color: rgb(27, 168, 168)" ><i class="fa fa-trash"></i></button>
                </td>
            </tr>

`).join("")
document.querySelector("#tableoutput").innerHTML=final;
}
fet()

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

