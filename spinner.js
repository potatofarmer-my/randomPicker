var items = [];

document.getElementById('newItemInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        var newItem = document.getElementById('newItemInput').value;
        if (newItem) {
            if (items.includes(newItem)) { // Check if the item already exists
                document.getElementById('popupMessage').innerText = 'This item already exists! Sohei!';
                document.getElementById('popup').style.display = 'flex';
            } else {
                items.push(newItem);
                localStorage.setItem('items', JSON.stringify(items)); // Save the items to localStorage
                document.getElementById('newItemInput').value = '';
                updateTable();
            }
        }
    }
});

document.getElementById('addItemButton').addEventListener('click', function() {
    var newItem = document.getElementById('newItemInput').value;
    if (newItem) {
        if (items.includes(newItem)) { // Check if the item already exists
            document.getElementById('popupMessage').innerText = 'This item already exists! Sohei!';
            document.getElementById('popup').style.display = 'flex';
        } else {
            items.push(newItem);
            localStorage.setItem('items', JSON.stringify(items)); // Save the items to localStorage
            document.getElementById('newItemInput').value = '';
            updateTable();
        }
    }
});

document.getElementById('closePopupButton').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
});

document.getElementById('startButton').addEventListener('click', chooseItem, function() {
    if (items.length > 0) {
        var selectedItem = items[Math.floor(Math.random() * items.length)];
        document.getElementById('chosenItem').innerText = selectedItem;
        localStorage.setItem('chosenItem', selectedItem); 
    }
});

window.onload = function() {
    var savedItems = JSON.parse(localStorage.getItem('items')); 
    if (savedItems) {
        items = savedItems;
        updateTable();
    }

    var savedItem = localStorage.getItem('chosenItem');
    if (savedItem && items.length > 0) {
        document.getElementById('chosenItem').innerText = savedItem;
    }
};

function updateTable() {
    var table = document.getElementById('itemsTable');
    table.innerHTML = '';
    
    for (let i = 0; i < items.length; i++) {
        var row = document.createElement('tr');
        var cell = document.createElement('td');
        cell.textContent = items[i];
        row.appendChild(cell);

        var buttonsCell = document.createElement('td');
        var buttonsContainer = document.createElement('div');
        buttonsContainer.style.display = 'flex';
        buttonsContainer.style.justifyContent = 'flex-end';

        var editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-pencil-alt"></i>';
        editButton.addEventListener('click', function() {
            var newValue = prompt('Enter new value', items[i]);
            if (newValue) {
                items[i] = newValue;
                localStorage.setItem('items', JSON.stringify(items)); // Update the items in localStorage
                updateTable();
            }
        });
        buttonsContainer.appendChild(editButton);

        var removeButton = document.createElement('button');
        removeButton.innerHTML = '<i class="fas fa-trash"></i>';
        removeButton.addEventListener('click', (function(index) {
            return function() {
                items.splice(index, 1);
                localStorage.setItem('items', JSON.stringify(items)); // Update the items in localStorage
                updateTable();
            }
        })(i));
        buttonsContainer.appendChild(removeButton);

        buttonsCell.appendChild(buttonsContainer);
        row.appendChild(buttonsCell);

        table.appendChild(row);
    }
}

function chooseItem() {
    var chosenItemElement = document.getElementById('chosenItem');
    var currentIndex = 0;
    var interval;

    interval = setInterval(function() {
        chosenItemElement.innerText = items[currentIndex];
        currentIndex = (currentIndex + 1) % items.length;
    }, 100); // Change the item every 100 milliseconds

    setTimeout(function() {
        clearInterval(interval);
        var finalChoice = items[Math.floor(Math.random() * items.length)];
        chosenItemElement.innerText = finalChoice;
    }, 5000); // Stop the animation after 5 seconds
}

