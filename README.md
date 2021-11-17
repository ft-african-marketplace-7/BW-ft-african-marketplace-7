African Marketplace

USERS
[GET] '/api/users/:id' || returns array of a single user in the db. only needed for displaying personal information / greeting user.
[PUT] '/api/users/:id' || only password and phone number are needed
ITEMS
[GET] '/api/items' || returns all of the items
[GET] '/api/items/:id' || returns single item
[POST] '/api/items' || all fields are required. This will return the item that was just posted.
[PUT] '/api/items/:id' || Used to update any item, all fields are still required besides the image. Returns the updated item.
[DELETE] '/api/items/:id' || Deletes the item specified and prints back a message that it was successfuly deleted.
