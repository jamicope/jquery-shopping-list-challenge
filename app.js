// STEP 1 Function & objects definitions
//initially what users see
var state = {
    items: [
        {
            name: "apples",
            checked: false
        },
        {
            name: "oranges",
            checked: false
        },
        {
            name: "milk",
            checked: false
        },
        {
            name: "bread",
            checked: true
        }
    ]
}

//add item- user types input and hits "add item" button; output will reflect user input
function addItem(state, itemObj) {
    //check to see if the button targeting is working:
    alert("I've just activated the addItem() function");
    state.items.push(itemObj);
}

//delete items- user will click delete items button, and the output on the screen will disappear
function deleteItem(state, itemName) {
    alert("I've just activated the deleteItem() function");
    var itemsArray = state.items;
    var index;
    for (var i = 0; i < itemsArray.length; i++) {
        //find the item with exactly the same name to remove it from the list
        if (itemsArray[i].name === itemName) {
            index = i;
        }
    }
    //delete one element from the itemsArray
    itemsArray.splice(index, 1);
}

//check items- when user clicks the check box, a mark appears to tell user that the item is done
function checkItem(state, itemName) {
    alert("I've just activated the checkItem() function");
    for (var i = 0; i < state.items.length; i++) {
        //find the item with the same name as the item to be checked
        if (state.items[i].name === itemName) {
            //switch the previous state of the item to the opposite
            state.items[i].checked = !state.items[i].checked;
        }
    }
}

// function to create (render) the shopping list
function renderList(state) {

    var buildTheHtmlOutput = "";

    $.each(state.items, function (itemKey, itemValue) {
        buildTheHtmlOutput += '<li>';
        if (itemValue.checked == false) {
            buildTheHtmlOutput += '<span class="shopping-item">' + itemValue.name + '</span>';
        } else {
            buildTheHtmlOutput += '<span class="shopping-item shopping-item__checked">' + itemValue.name + '</span>';
        }
        buildTheHtmlOutput += '<div class="shopping-item-controls">';
        buildTheHtmlOutput += '<button class="shopping-item-toggle">';
        buildTheHtmlOutput += '<span class="button-label">check</span>';
        buildTheHtmlOutput += '</button>';
        buildTheHtmlOutput += '<button class="shopping-item-delete">';
        buildTheHtmlOutput += '<span class="button-label">delete</span>';
        buildTheHtmlOutput += '</button>';
        buildTheHtmlOutput += '</div>';
        buildTheHtmlOutput += '</li>';
    });
    $('.shopping-list').html(buildTheHtmlOutput);

    //reset the input field to an empty value
    $('#shopping-list-entry').val('')
}

// STEP2  Usage of functions & objects


$(document).ready(function () {

    //when the page loads, show existing items
    0 renderList(state);

    /*the following function call should be INSIDE the $(document).ready(function() because the targeted containers were created WHEN the page was loaded*/



    // on click on "form button" activate function called "addItem"
    $('#js-shopping-list-form').on('submit keypress', function (event) {
        //if the event is a keypress and the key pressed has the code 13 (enter) OR if the event is the submit button
        if (event.type === 'keypress' && event.which === 13 || event.type === 'submit') {
            //if the page refreshes when you submit the form, use "preventDefault()" to force JS to handle the form submission
            event.preventDefault();
            var itemName = $('#shopping-list-entry').val();
            var shoppingItem = {
                name: itemName,
                checked: false
            }
            if (itemName) {
                //activate function called addItem()
                addItem(state, shoppingItem);

                renderList(state);
            }
        }
    });

});

/*the following 2 function calls should be OUTSIDE the $(document).ready(function() because the targeted containers were created AFTER the page was loaded*/


//on click on "shopping-item-delete" activate function called "deleteItem"
$('ul').on('click', 'button.shopping-item-delete', function (event) {
    var itemName = $(this).closest('li').find('.shopping-item').text();
    deleteItem(state, itemName);
    //render the list with without the deleted item
    renderList(state);
});
//on click on "shopping-item-toggle" activate function called "checkItem"
$('ul').on('click', 'button.shopping-item-toggle', function (event) {
    //get the name of the shopping list item that was clicked
    var itemName = $(this).closest('li').find('.shopping-item').text();
    //change the state of that item to checked
    checkItem(state, itemName);
    //and render the list with item checked
    renderList(state);
});
