/*
 * @Date: 2021-06-10 23:20:58
 * @LastEditTime: 2021-06-13 12:27:37
 */
import React from 'react'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import routerConfig from '@routers'
import AxiosConfig from './AxiosConfig'
import LoadingContainer from './LoadingContainer'
import '@style/pages/common.less'

const Main = () => (
  <Router>
    <AxiosConfig />
    <Switch>
      <Redirect exact from="/" to="/home" />
      {/* {Object.keys(routerConfig).map((item) => {
        const route = routerConfig[item]
        return (
          <Route
            exact={route.exact}
            key={item}
            path={route.path}
            render={(props) => {
              if (item.noCheckAuth) {
                return <route.component {...props} />
              }
              if (
                Number(localStorage.getItem('isLogin')) &&
                localStorage.getItem('username')
              ) {
                return (
                  <LoadingContainer>
                    <route.component {...props} />
                  </LoadingContainer>
                )
              }
              return <Redirect to={{ pathname: '/login' }} />
            }}
          />
        )
      })} */}

      {routerConfig.map((item, index) => (
        <Route
          path={item.path}
          key={index}
          exact={item.exact}
          render={(props) => {
            if (
              (Number(localStorage.getItem('isLogin')) &&
                localStorage.getItem('username')) ||
              item.path === '/login'
            ) {
              return (
                <LoadingContainer>
                  <item.component {...props} />
                </LoadingContainer>
              )
            }
            return (
              <Redirect
                to={{
                  pathname: '/login'
                }}
              />
            )
          }}
        />
      ))}
    </Switch>
  </Router>
)

export default Main
