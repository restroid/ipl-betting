
Vue.component('all-transactions', {
    
    data : function(){
        return {
            transactions: [],
            bets: [],
            balanceAmount: 0.0
        }
    },
    mounted() {
        console.log("mounted")
        this.fetchTransactions()
    },
    methods: {
        fetchTransactions: function () {
            let that = this;
            axios.get("/bet/myTrans")
                .then(function (res) {
                    console.log(res);
                    let allTransactions = res.data;
                    let balanceAmount = 0;
                    allTransactions.forEach(t => {
                        balanceAmount += parseFloat(t.amount);
                    });

                    that.balanceAmount = balanceAmount.toFixed(2);
                    that.transactions = allTransactions.filter(t => t.ttype === 'trans')
                    that.bets = allTransactions.filter(t => t.ttype === 'bet')

                });

        }
    },
    template: `
    <div>
    <h4>Hisaab : <b>&#8377;{{ balanceAmount}}</b>
            </h4>
        <my-bets v-bind:bets="bets"></my-bets>
        <my-transactions v-bind:transactions="transactions"></my-transactions>
    </div>
    `
})
Vue.component('my-bets', {
    props: ['bets'],
    template: `
    <table class="table table-condensed table-bordered text-center">
            <thead>
                <h5>Bets</h5>
            </thead>
            <tr class="thead-dark">
                <th>Amount</th>
                <th>Match</th>
                <th>Bet On</th>
                <th>Winner</th>
            </tr>
            <tr v-for="t in bets"
                v-bind:class="{'table-success': t.amount>0, 'table-danger': (t.amount<0 && t.winnerRatio >0), 'table-warning': t.winnerRatio==0}">
                <td class="font-weight-bold">{{t.amount}}</td>
                <td>{{t.matchName}}</td>
                <td>{{t.betAmount}}@{{t.betOn}}</td>
                <td>{{t.winner}}<span ng-if="t.winner !='-'">@{{t.winnerRatio}}</span></td>
    
            </tr>
        </table>
    `
})
Vue.component('my-transactions', {
    props: ['transactions'],
    template: `
    <table class="table table-condensed table-bordered">
                <thead>
                    <h5>Transactions</h5>
                </thead>
                <tr class="thead-dark">
                    <th>Amount</th>
                    <th>Description</th>

                </tr>
                <tr v-for="t in transactions"
                    v-bind:class="{'table-success': t.amount>0, 'table-danger': (t.amount<0)}">
                    <td class="font-weight-bold">{{t.amount}}</td>
                    <td>{{t.matchName}}</td>


                </tr>
            </table>
    `
})

