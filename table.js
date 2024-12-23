let reservations = [];
async function fet() {
    
        let response = await fetch("http://localhost:3000/product");
        let data = await response.json();
        reservations = data; 
        displayReservations(data); 
    
}


function displayReservations(data) {
    let tableOutput = document.querySelector("#tableoutput");
    tableOutput.innerHTML = data.map((reservation) => `
        <tr data-id="${reservation.id}">
            <td>${reservation.cartype}</td>
            <td>${reservation.email}</td>
            <td>${reservation.destination}</td>
            <td>${reservation.departuredate}</td>
            <td>${reservation.returndate}</td>
            <td>
                <button onclick="editReservation('${reservation.id}') style=""><i class="fa fa-edit"></i></button>
            </td>
            <td>
                <button onclick="deleteReservation('${reservation.id}')">
                    <i class="fa fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Search reservations......................
function searchReservations() {
    let searchTerm = document.querySelector("#empid").value.toLowerCase();

    let filteredData = reservations.filter(reservation => 
        reservation.cartype.toLowerCase().includes(searchTerm) ||
        reservation.email.toLowerCase().includes(searchTerm)
    );

    displayReservations(filteredData);
}

function clearSearch() {
    document.querySelector("#empid").value = '';
    displayReservations(reservations); 
}



//Add Form....................................
function showAddForm() {
    document.querySelector(".additem").style.display = "block";
    editingReservationId = null; 
    clearForm();
}

// Edit......................

function editReservation(id) {
    let row = document.querySelector(`tr[data-id='${id}']`);
    if (row) {
        document.querySelector("#cartype").value = row.cells[0].textContent;
        document.querySelector("#email").value = row.cells[1].textContent;
        document.querySelector("#destination").value = row.cells[2].textContent;
        document.querySelector("#departure").value = row.cells[3].textContent;
        document.querySelector("#return").value = row.cells[4].textContent;

        document.querySelector(".additem").style.display = "block";
        editingReservationId = id; 
    }
}

// Save data reservation main page.............
async function saveReservationbooking() {
    let reservationDatabooking = {
        cartype: document.querySelector("#cars").value,
        email: document.querySelector("#emails").value,
        destination: document.querySelector("#destinations").value,
        departuredate: document.querySelector("#departures").value,
        returndate: document.querySelector("#returns").value,
    };


    try {
        let response = await fetch('http://localhost:3000/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservationDatabooking),
        });

        if (response.ok) {
            alert("Reservation booked!");
        } else {
            alert("Failed to book reservation");
        }
    } catch (error) {
        console.error("Error booking reservation:", error);
    }
}

// new data form..............
async function saveReservation() {
    let reservationData = {
        cartype: document.querySelector("#cartype").value,
        email: document.querySelector("#email").value,
        destination: document.querySelector("#destination").value,
        departuredate: document.querySelector("#departure").value,
        returndate: document.querySelector("#return").value,
    };

    if (Object.values(reservationData).includes("")) {
        alert("Please fill in all fields.");
        return;
    }

        if (editingReservationId) {
        
            let response = await fetch(`http://localhost:3000/product/${editingReservationId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reservationData)
            });

            if (response.ok) {
                alert("Reservation updated");
                fet(); 
            } else {
                alert("Failed to update reservation");
            }
        } else {
    
            let response = await fetch("http://localhost:3000/product", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reservationData)
            });

            if (response.ok) {
                alert("Reservation added");
                fet(); 
            } else {
                alert("Failed to add reservation");
            }
        }

        document.querySelector(".additem").style.display = "none"; 
}

// Delete a reservation...................................
async function deleteReservation(id) {
    if (window.confirm("Do you really want to delete this reservation?")) {
        
            let response = await fetch(`http://localhost:3000/product/${id}`, { method: "DELETE" });

            if (response.ok) {
                alert("Reservation deleted");
                fet(); 
            } else {
                alert("Failed to delete reservation");
            }
        
    }
}

// Clear the form fields...........................
function clearForm() {
    document.querySelector("#cartype").value = '';
    document.querySelector("#email").value = '';
    document.querySelector("#destination").value = '';
    document.querySelector("#departure").value = '';
    document.querySelector("#return").value = '';
}

fet();
