module.exports = {
    isLoggedIn: function() {
        return localStorage.userId !== undefined
    },
    getUserId: function() {
        return localStorage.userId
    }
}