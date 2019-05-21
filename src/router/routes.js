import comroutes from './comroutes.js'
export default [{
        path: '/',
        name: 'Main',
        component: comroutes.Main,
        children: [{
            path: '/',
            name: 'Index',
            component: comroutes.Index,
        },
        {
            path:'/fx',
            name:'Fx',
            component:comroutes.Fx
        },
        {
            path:'wd',
            name:'Wd',
            component:comroutes.Wd
        }
    ]
    },
    {
        path: '/gd/',
        name: 'Gd',
        component: comroutes.Gd,
    },
    {
        path: '/xq/',
        name: 'Xq',
        component: comroutes.Xq,
    },
    {
        path: '/login',
        name: 'Login',
        component: comroutes.Login,
    },
    {
        path: '/gk/pid',
        name: 'Gk',
        component: comroutes.Gk
  
     
    },
    {
        path:'/register',
        name:'Register',
        component:comroutes.Register
    },
    {
        path:'/xg',
        name:'Xg',
        component:comroutes.Xg
    },
    {
        path:'/sc',
        name:'Sc',
        component:comroutes.Sc
    },
    {
        path:'/li',
        name:'Li',
        component:comroutes.Li
    }
]