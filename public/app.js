var app = angular.module('app', []);
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
        $http.get("/match/all")
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

app.controller('bettingController', function ($http) {
    var bc = this;
    bc.bets = [];
    bc.matches = [];
    bc.users = [];
    bc.busy = false;
    bc.fetchUsers = function () {
        $http.get("/users.json").then(function (res) {
            bc.users = res.data;
        })
    }

    bc.fetchBets = function () {
        $http.get("/bet/all")
            .then(function (res) {
                tc.bets = res.data;
            });
    }
    bc.fetchMatches = function () {
        bc.fetchUsers();
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