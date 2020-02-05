import Home from './components/Home.vue';
import Login from './components/Login.vue';
import AddCategory from './components/AddCategory.vue';
import AddArticle from './components/AddArticle.vue';
import ChooseCategory from './components/AddArticle/ChooseCategory.vue';
import AddArticleInformation from './components/AddArticle/AddArticleInformation.vue';
import Category from './components/Category.vue';
import Article from './components/Article.vue';


export const routes = [
  {path: '/', component: Home},
  {path: '/login', component: Login},
  {path: '/addProduct', component: AddArticle, redirect: '/addProduct/chooseCategory', children: [
    {path: 'chooseCategory', component: ChooseCategory},
    {path: 'addArticleInformation', component: AddArticleInformation}
  ]},
  {path: '/addCategory', component: AddCategory},
  {path: '/category/:catId', component: Category, children: [
    {path: ':artId', component: Article}
  ]}
];
