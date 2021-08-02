/*
 * @Date: 2021-06-10 23:20:58
 * @LastEditTime: 2021-06-12 03:03:46
 */
// router
import Login from '@pages/login/login'
import MenuContainer from '@containers/MenuContainer'

export default [
  { path: '/login', exact: true, name: 'Login', component: Login },
  { path: '/', name: 'MenuHome', component: MenuContainer, auth: true }
]
