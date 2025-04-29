// JS here

// Initialize Parse
Parse.initialize("q4T8tAZoooaaEsPI7nhCnmGdUdmMLeoLbMdrxesd", "uzH0OTk1lTPXWmdl3zCUHaT75pY3g42IOLhTjN0J"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = "https://parseapi.back4app.com/";

const newBtn = document.getElementById('newbtn');
const editBtns = document.querySelectorAll('.fa-edit');
const addFriendForm = document.getElementById('add-friend');
const editFriendForm = document.getElementById('edit-friend');
const friendsList = document.getElementById('main ol');


async function displayFriends() {
    const friends = Parse.Object.extend('Friends');
    const query = new Parse.Query(friends);
    const results = await query.ascending('lname').find();
    // console.log(results);
    results.forEach(function(eachFriend){
        const id = eachFriend.id;
        const lname = eachFriend.get('lname');
        const fname = eachFriend.get('fname');
        const email = eachFriend.get('email');
        const facebook = eachFriend.get('facebook');
        const twitter = eachFriend.get('twitter');
        const instagram = eachFriend.get('instagram');
        const linkedin = eachFriend.get('linkedin');

        const theListItem = document.createElement('li');
        theListItem.setAttribute('id', `r-${id}`);
        theListItem.innerHTML = `template here...`;

        theListItem.innerHTML = `
        <div class="name">
            FirstName LastName
        </div>
        <div class="email">
            <i class="fa fa-envelope-square"></i> user@somemail.com
        </div>
        <div class="social">
            <a href="https://www.facebook.com"><i class="fa fa-facebook-square"></i></a>
            <a href="https://www.twitter.com"><i class="fa fa-twitter-square"></i></a>
            <a href="https://www.instagram.com"><i class="fa fa-instagram"></i></a>
            <a href="https://www.linkedin.com"><i class="fa fa-linkedin"></i></a>
        </div>
        <i class="fas fa-edit"></i>
        <i class="fas fa-times-circle"></i>
        `;
    });
}

newBtn.addEventListener('click', function(event){
    event.preventDefault();
    addFriendForm.className = 'add-friend-onscreen';
});

addFriendForm.addEventListener('submit', function(event){
    event.preventDefault();
    addFriendForm.className = 'add-friend-offscreen';
});

for (let i = 0; i < editBtns.length; i++){
    editBtns[i].addEventListener('click', function(event){
        event.preventDefault();
        editFriendForm.className = 'edit-friend-onscreen';
    });
}

editFriendForm.addEventListener('submit', function(event){
    event.preventDefault();
    editFriendForm.className = 'edit-friend-offscreen';
});


