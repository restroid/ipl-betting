
Vue.component('all-transactions', {

    data: function () {
        return {
            transactions: [],
            bets: [],
            balanceAmount: 0.0,
            series: 'WC19',
            busy: false
        }
    },
    mounted() {
        console.log("mounted")
        this.fetchTransactions()
    },
    methods: {
        fetchTransactions: function () {
            let that = this;
            that.busy = true;
            axios.get("/bet/myTrans", {
                params: { seriesName: that.series }
            })
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

                }).finally(function () {
                    that.busy = false;
                });;

        }
    },
    template: /* html */`
    <div>
        <h4>Hisaab : <b>&#8377;{{ balanceAmount}}</b></h4>
            <select class="float-right" name="series" v-model="series" v-on:change="fetchTransactions()">
                <option selected>WC19</option>
                <option>IPL19</option>
                <option>IPL18</option>
            </select>
        
        <div v-if="busy" class="text-center">
            <img src="/images/loading.gif" alt="loading...">
    
        </div>
        <div v-if="!busy" class="text-center">
            <my-bets v-bind:bets="bets"></my-bets>
            <my-transactions v-bind:transactions="transactions"></my-transactions>
    
        </div>
    
    </div>
    `
})
Vue.component('my-bets', {
    props: ['bets'],
    template: /* html */`
    <table class="table table-condensed table-bordered text-center">
            <caption>
                Bets
            </caption>
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
                <td>{{t.betAmount}} @{{t.betOn}}</td>
                <td>{{t.winner}}<span ng-if="t.winner !='-'"> @{{t.winnerRatio}}</span></td>
    
            </tr>
        </table>
    `
})
Vue.component('my-transactions', {
    props: ['transactions'],
    template: /* html */`
    <table class="table table-condensed table-bordered">
               
                <caption>
                Transactions
            </caption>
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

