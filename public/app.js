var app = angular.module('app', []);
app.controller('bc', function ($http) {
    var bc = this;
    bc.teams = [];
    bc.newTeam = {};
    bc.fetchTeams = function () {
        $http.get("/team/all")
            .then(function (res) {
                bc.teams = res.data;
            });
    }

    bc.addTeam = function () {
        $http.post("/team/add", bc.newTeam)
            .then(function (res) {
                bc.teams.push(res.data);
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