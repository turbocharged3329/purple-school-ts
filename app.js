"use strict";
var UserRole;
(function (UserRole) {
    UserRole["Admin"] = "admin";
    UserRole["Moderator"] = "moderator";
    UserRole["User"] = "user";
})(UserRole || (UserRole = {}));
function isCorrectUser(user) {
    if (typeof user !== 'object' || user === null) {
        throw new Error('User is not an object');
    }
    if ('id' in user == false || 'role' in user == false) {
        throw new Error('User is not a valid user');
    }
}
async function getAdminUsers() {
    try {
        const response = await fetch('https://dummyjson.com/users');
        const data = await response.json();
        if (data.users) {
            const users = data.users;
            users.forEach((user) => isCorrectUser(user));
            return users.filter((user) => user.role === UserRole.Admin);
        }
        else {
            throw new Error('Users not found');
        }
    }
    catch (error) {
        console.error(error);
        return [];
    }
}
