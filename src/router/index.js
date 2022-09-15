import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import ('@/views/home/Home.vue');
const Category = () => import ('@/views/category/Category.vue');
const Cart = () => import ('@/views/cart/Cart.vue');
const Profile = () => import ('@/views/profile/Profile.vue');


Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path:'/profile',
    component: Profile
  }
]

const router = new VueRouter ({
  mode: 'history',
  routes
})

let originPush=VueRouter.prototype.push;
let originReplace=VueRouter.prototype.replace;
//重写push/replace
//第一个参数：告诉原来的push方法，往哪里跳转（传递哪些参数）
//第二个参数：成功的回调
//第三个参数：失败的回调
VueRouter.prototype.push=function(location,resolve,reject){
    if(resolve&&reject){
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,()=>{},()=>{});
    }
}
VueRouter.prototype.replace=function(location,resolve,reject){
    if(resolve&&reject){
        originReplace.call(this,location,resolve,reject);
    }else{
        originReplace.call(this,location,()=>{},()=>{});
    }
}

export default router