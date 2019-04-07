var app = angular.module('app', ["ngStorage"]);
app.controller('teamController', function ($http) {
    var tc = this;
    tc.teams = [];
    tc.newTeam = {};
    tc.fetchTeams = function () {
        $http.get("/team/all")
            .then(function (res) {
                tc.teams = res.data;
            });
    }

    tc.addTeam = function () {
        $http.post("/team/add", tc.newTeam)
            .then(function (res) {
                tc.teams.push(res.data);
            })
    }
});
app.controller('userController', function ($http) {
    var uc = this;
    uc.users = [];
    uc.newUser = {};
    uc.fetchUsers = function () {
        $http.get("/user/all")
            .then(function (res) {
                uc.users = res.data;
            });
    }

    uc.addUser = function () {
        $http.post("/user/register", uc.newUser)
            .then(function (res) {
                uc.users.push(res.data);
            })
    }
});

app.controller('matchController', function ($http) {
    var mc = this;
    mc.matches = [];
    mc.newMatch = {};
    mc.teams = [];
    mc.fetchTeams = function () {
        $http.get("/team/all")
            .then(function (res) {
                mc.teams = res.data;
            });
    }
    mc.fetchMatches = function () {
        mc.fetchTeams();
        $http.get("/bet/matches")
            .then(function (res) {
                mc.matches = res.data;
            });
    }

    mc.addMatch = function () {
        $http.post("/match/add", mc.newMatch)
            .then(function (res) {
                mc.matches.push(res.data);
            })
    }
});

app.controller('transactionController', function ($http) {
    var tcc = this;
    tcc.transactions = [];
    tcc.newTransaction = {};
    tcc.users = [];
    tcc.fetchUsers = function () {
        $http.get("/user/all")
            .then(function (res) {
                tcc.users = res.data;
            });
    }
    tcc.fetchTransactions = function () {
        tcc.fetchUsers();
        $http.get("/transaction/all")
            .then(function (res) {
                tcc.transactions = res.data;
            });
    }

    tcc.addTransaction = function () {
        $http.post("/transaction/add", tcc.newTransaction)
            .then(function (res) {
                tcc.transactions.push(res.data);
            })
    }
});

app.controller('bettingController', function ($http, $localStorage) {
    var bc = this;
    bc.bets = [];
    bc.matches = [];
    // bc.users = [];
    bc.busy = false;
    // bc.fetchUsers = function () {
    //     $http.get("/users.json").then(function (res) {
    //         bc.users = res.data;
    //     })
    // }
    if($localStorage.userToken){
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $localStorage.userToken.accessToken;
    }

    bc.initialize = function () {
        bc.user = $localStorage.userToken.user;
        bc.fetchMatches();
    }
    bc.loginUser = function () {
        $http.get("/auth/token/" + bc.email)
            .then(function (res) {
                bc.user = res.data.user;
                $localStorage.userToken = res.data;
            });
    }

    bc.fetchBets = function () {
        $http.get("/bet/all")
            .then(function (res) {
                tc.bets = res.data;
            });
    }
    bc.fetchMatches = function () {

        $http.get("/bet/matches")
            .then(function (res) {
                bc.matches = res.data;
            });
    }
    bc.addBet = function () {
        bc.busy = true;
        bc.newBet.matchId = bc.selectedMatch.id;
        $http.post("/bet/add", bc.newBet)
            .then(function (res) {
                bc.bets.push(res.data);
            })
    }
});