<template>
    <div>
        <h1>My Favourite Cafes</h1>
        <div class="content">
            <div class="add-cafe-form">
                <input type="text" v-model="newName" placeholder="Name"/>
                <input type="text" v-model="newCity" placeholder="City"/>
                <button @click="addNewCafe">Add Cafe</button>
            </div>
            <ul id="cafe-list">
                <li v-for="cafe in allCafes" :key="cafe.id">
                    <span>{{cafe.name}}</span>
                    <span>{{cafe.city}}</span>
                    <div @click="deleteCafe(cafe.id)">x</div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {db} from '../main'
export default {
    name: 'Home',
    data () {
        return {
            newName: '',
            newCity: '',
            allCafes: ''
        }
    },
    created () {
        this.getCafesData()
    },
    methods: {
        getCafesData () {
            let items = [];
            db.collection('cafes_tbl').get()
                .then((snapShot) => {
                    snapShot.docs.forEach(eachDoc => {
                        items.push({
                            id: eachDoc.id,
                            name: eachDoc.data().name,
                            city: eachDoc.data().city
                        })
                    });
                    this.allCafes = items
                })
        },
        addNewCafe () {
            if (this.newName && this.newCity) {
                db.collection('cafes_tbl').add({
                    name: this.newName,
                    city: this.newCity
                }).then(response => {
                    this.newName = '';
                    this.newCity = '';
                    this.getCafesData()
                })
            }
        },
        deleteCafe (id) {
            if (id) {
                db.collection('cafes_tbl').doc(id).delete().then(() => {
                }).then(resp => {
                    this.getCafesData()
                })
            }
        }
    }
}
</script>
<style>
    body{
        background: #eab0dc;
        font-family: ubuntu;
    }

    h1{
        color: #fff;
        font-size: 64px;
        letter-spacing: 2px;
        margin-top: 80px;
        text-align: center;
    }

    .content{
        background: #fff;
        max-width: 960px;
        margin: 30px auto;
        padding:  20px 30px;
        border-radius: 10px 120px 10px 10px;
        box-shadow: 1px 3px 5px rgba(0,0,0,0.1)
    }

    ul{
        list-style-type: none;
        padding: 0;
    }

    li{
        padding: 20px;
        background: #f6f6f6;
        font-size: 20px;
        color: #555;
        position: relative;
        border-bottom: 1px solid #e6e6e6;
        height: 46px;
    }

    li:nth-child(even){
        padding: 20px;
        background: #f2f2f2;
    }

    li span{
        display: block;
    }

    li span:nth-child(2){
        font-size: 16px;
        margin-top: 6px;
        color: #999;
    }

    li div{
        position: absolute;
        top: 0;
        right: 0px;
        background: rgba(255,255,255,0.6);
        width: 40px;
        text-align: center;
        padding: 10px 0;
        font-weight:  bold;
        cursor:  pointer;
    }

    .add-cafe-form input{
        float: left;
        width: 38%;
        margin: 0;
        border: 0;
        border-bottom: 1px solid #eee;
        margin: 0 1%;
        padding: 10px;
        display: block;
        box-sizing: border-box;
        font-size: 18px;
    }

    .add-cafe-form input:focus{
        outline: none;
        border-bottom: 3px solid #88236f;
        padding-bottom: 8px;
        transition: all ease 0.2s;
    }

    .add-cafe-form:after{
        content: '';
        clear: both;
        display: block;
    }

    button{
        cursor: pointer;
        border: 0;
        background: #fff;
        border-radius: 10px;
        padding: 13px;
        width: 14%;
        box-shadow: -1px 0px 1px rgba(0,0,0,0.1);
        font-weight: bold;
        font-family: ubuntu;
        letter-spacing: 1px;
        color: #999;
    }
</style>