`use strict`

document.getElementById("search").addEventListener("input", search);

// Define an array of user objects, each containing name, phone, email, and address.
const users = [{
   name: "yosi",
   phone: "0521648784",
   email: "yosiyoshi@gmail.com",
   address: "Nahariya"
},
{
   name: "misha",
   phone: "0587539512",
   email: "mishasider@gmail.com",
   address: "Nahariya"
},
{
   name: "nikita",
   phone: "0521598753",
   email: "nikitamohammad@gmail.com",
   address: "Krayot"
}
];

// Call the render function to display the user list initially.
render();

function render(usersList) { // Function renders the array of contacts.
   console.log("rendered");

   // If no user list is passed, use the global `users` array.
   if (usersList == undefined) {
      usersList = users;
   }

   // Sort the user list alphabetically by name.
   usersList.sort((a, b) => a.name.localeCompare(b.name));

   let f = "";
   usersList.forEach((elem, index) => {
      f += `<container class="TableRow">
               <div><p class="photo"><img class="photo" src="icons/user.png" alt="photo"></p></div>
               <div><p class="name">${elem.name}</p></div>
               <div><p class="phone">${elem.phone}</p></div>
               <div><p class="elem">
                   <button class="buttonTrash" onclick="OnClickTrash(${index})"><img class="trash" src="icons/trash.png" alt="delete"></button>
                   <button class="buttonEdit" onclick=OpenPopupEdit(${index})><img class="edit" src="icons/editing.png" alt="edit"></button>
                   <button class="buttonInfo" onclick="OnClickInfo(${index})"><img class="info" src="icons/info.png" alt="info"></button>
               </p></div>
           </container>`;
   });

   const container = document.getElementsByClassName("TableContainer")[0];
   container.innerHTML = "";

   // Create a temporary element to hold the HTML string.
   const tempDiv = document.createElement('div');
   tempDiv.innerHTML = f;

   // Append each child of the temporary element to the target container.
   while (tempDiv.firstChild) {
      container.appendChild(tempDiv.firstChild);
   }
}

let userEditI; // Variable to store the index of the user being edited.

function OpenPopupEdit(index) { // Function opens the edit popup.
   let popup = document.getElementById('popupEdit');
   popup.style.display = "block";

   userEditI = index; // Store the index of the user to be edited.

   const existsUser = users[index];
   // If the user doesn't exist, show an error.
   if (!existsUser) {
      alert('bug');
      return;
   }

   // Populate the popup with existing user data.
   popup.querySelector("#name").value = existsUser.name;
   popup.querySelector("#phone").value = existsUser.phone;
   popup.querySelector("#email").value = existsUser.email;
   popup.querySelector("#address").value = existsUser.address;
}

function OpenPopup() { // Function opens the add contact popup.
   let popup = document.getElementById('popupAdd');
   popup.style.display = "block";
}

function add() { // Function adds contact to array using the add popup.
   closePopupEdit();
   const popup = document.getElementById("popupAdd");

   // Create a user object from the input values.
   let user = {
      name: popup.querySelector("#name").value,
      phone: popup.querySelector("#phone").value.trim(),
      email: popup.querySelector("#email").value.trim(),
      address: popup.querySelector("#address").value
   };

   // Validate and add the user if all criteria are met.
   if (checkUser(user)) {
      users.push(user);
      render(); // Re-render the list with the new user.
      closePopup(); // Close the add popup.

      // Clear the input fields after adding the user.
      popup.querySelector("#name").value = "";
      popup.querySelector("#phone").value = "";
      popup.querySelector("#email").value = "";
      popup.querySelector("#address").value = "";
   }
}



function OnClickInfo(index) { // Function displays user information in a popup.
   const div = document.getElementById("popupInfo");
   const user = users[index]; // Get user data from "users" array.

   // Construct the information HTML.
   let info = `<button class="closeBtn" onclick="closePopupInfo()">×</button>
               <p>Name: ${user.name}</p>
               <p>Phone: ${user.phone}</p>
               <p>Email: ${user.email}</p>
               <p>Address: ${user.address}</p>`;

   div.innerHTML = info; // Update the innerHTML of the div with the info.
   div.style.display = "block"; // Display the div.

   console.log("Displayed info for user: ", user);
}

function OnClickEdit() { // Function saves the edited user data.
   closePopupInfo();
   closePopup();

   if (userEditI == undefined) { // Ensure a user is selected for editing.
      alert('bug');
      return;
   }

   let popup = document.getElementById('popupEdit');

   // Create a user object from the edited values.
   let user = {
      name: popup.querySelector("#name").value,
      phone: popup.querySelector("#phone").value.trim(),
      email: popup.querySelector("#email").value.trim(),
      address: popup.querySelector("#address").value
   };

   users[userEditI] = user; // Update the user in the array.

   closePopupEdit(); // Close the edit popup.
   render(); // Re-render the list with the edited user.
}

function OnClickTrash(index) { // Function deletes a contact from the array.
   let result = confirm("Are you sure you want to delete?");
   if (result == true) {
      users.splice(index, 1); // Remove the user from the array.
      render(); // Re-render the list after deletion.
   }
}

function closePopupEdit() { // Function closes the edit popup.
   let popup = document.getElementById('popupEdit');
   popup.style.display = "none";
}

function closePopupInfo() { // Function closes the information popup.
   let div = document.getElementById("popupInfo");
   div.style.display = "none";
}

function closePopup() { // Function closes the add popup.
   let popup = document.getElementById('popupAdd');
   popup.style.display = "none";
}

function deleteAll() { // Function deletes all contacts.
   let result = confirm("Are you sure you want to delete all?");
   if (result == true) {
      users.splice(0, users.length); // Clear the array.
      render(); // Re-render the empty list.
   }
}

function checkUser(user) { // Function validates the user data before adding.

   // Check if name is provided.
   if (!user.name) {
      alert('Enter name');
      return false;
   }
   // Check if the name already exists.
   if (users.find((elem) => elem.name == user.name)) {
      alert('This name already exists');
      return false;
   }

   // Check if phone number is valid.
   if (!user.phone || user.phone.length != 10) {
      alert('Enter a valid phone number');
      return false;
   }
   // Check if the phone number already exists.
   if (users.find((elem) => elem.phone == user.phone)) {
      alert('This phone number already exists');
      return false;
   }

   // Check if email is valid.
   if (!user.email || user.email.includes("@") == false || user.email.includes(".com") == false) {
      alert('Enter a valid email');
      return false;
   }
   // Check if the email already exists.
   if (users.find((elem) => elem.email == user.email)) {
      alert('This email already exists');
      return false;
   }

   // Check if address is provided.
   if (user.address == "") {
      alert('Enter address');
      return false;
   }

   return true; // All checks passed, user is valid.
}


function search() { // Function searches and filters the user list by name.
   let search = document.getElementById("search").value.toLowerCase();
   let result = users.filter((elem) => elem.name.toLowerCase().includes(search));

   render(result); // Render the filtered list.
}

function darkMode() { // Function toggles dark mode.
   console.log("dark mode");

   // Get the computed background color of the body.
   const currentBgColor = window.getComputedStyle(document.body).backgroundColor;

   // If the background is white, change it to dark.
   if (currentBgColor === 'rgb(255, 255, 255)') {
      document.body.style.backgroundColor = '#586674';
      console.log('Background changed to dark');
   }
   // If the background is dark, change it to white.
   else if (currentBgColor === 'rgb(88, 102, 116)') {
      document.body.style.backgroundColor = 'white';
      console.log('Background changed to white');
   }
   // If the background is neither, log the current state.
   else {
      console.log('Background is neither white nor dark');
   }
}
