var app = angular.module('app', ["ngStorage"]);
app.controller('teamController', function ($http, $localStorage) {
    var tc = this;
    tc.teams = [];
    tc.newTeam = {};
    if ($localStorage.userToken) {
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $localStorage.userToken.accessToken;
    }

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
app.controller('userController', function ($http, $localStorage) {
    var uc = this;
    uc.users = [];
    uc.newUser = {};
    if ($localStorage.userToken) {
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $localStorage.userToken.accessToken;
    }

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

app.controller('matchController', function ($http, $localStorage) {
    var mc = this;
    mc.matches = [];
    mc.newMatch = {};
    mc.teams = [];
    if ($localStorage.userToken) {
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $localStorage.userToken.accessToken;
    }

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

app.controller('transactionController', function ($http, $localStorage) {
    var tcc = this;
    tcc.transactions = [];
    tcc.newTransaction = {};
    tcc.users = [];
    if ($localStorage.userToken) {
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $localStorage.userToken.accessToken;
    }

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
    bc.busy = false;


    bc.initialize = function () {
        bc.error = null;
        if ($localStorage.userToken && new Date($localStorage.userToken.expiry) > new Date()) {
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + $localStorage.userToken.accessToken;
            bc.user = $localStorage.userToken.user;
            bc.fetchMatches();
            bc.fetchTransactions();
        }
    }
    bc.signout = function () {
        $localStorage.userToken = null;
        bc.user = null;
    }
    bc.loginUser = function () {
        bc.error = null;
        $http.get("/auth/token/" + bc.email)
            .then(function (res) {
                bc.user = res.data.user;
                var tokenData = res.data;
                var dt = new Date();
                dt.setSeconds(dt.getSeconds() + tokenData.expiresIn);
                tokenData.expiry = dt;
                $localStorage.userToken = tokenData;
                bc.initialize();
            }, function (d) {
                console.log(d);
                bc.error = "Email not found! Please contact the bookie!";
            });
    }

    bc.fetchTransactions = function () {
        $http.get("/bet/myTrans")
            .then(function (res) {
                bc.transactions = res.data;
                bc.balanceAmount = 0;
                bc.transactions.forEach(t => {
                    bc.balanceAmount += parseFloat(t.amount);
                });
            });

    }
    bc.getTeamRatio = function (amount, isWinning) {
        let winningAmount = 0;
        if (bc.newBet && bc.newBet.amount)
            {
                winningAmount = bc.newBet.amount;
               amount= amount + (isWinning?winningAmount:0);
            }

        return (bc.selectedMatch.matchTotal + winningAmount - amount) / amount;
    }
    
    bc.getWinningAmount = function () {
        if (bc.newBet && bc.newBet.amount && bc.newBet.teamId == bc.selectedMatch.team1.id) {
            ratio = bc.getTeamRatio(bc.selectedMatch.team1Total,true);
            return ratio * bc.newBet.amount * .9;
        }
        else if (bc.newBet && bc.newBet.amount && bc.newBet.teamId == bc.selectedMatch.team2.id){
            ratio = bc.getTeamRatio( bc.selectedMatch.team2Total,true);
            return ratio * bc.newBet.amount * .9;
        }
        else{
            return 0;
        }
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
                bc.fetchTransactions();
            })
    }
});