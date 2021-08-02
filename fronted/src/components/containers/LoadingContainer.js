import React, { useReducer } from 'react'
import { ConfigProvider, Spin } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import { PageContext, Reducer } from '@config/context'

import '@style/components/loadingContainer.less'

const LoadingContainer = ({ children }) => {
  const [loadingMask, dispatchLoading] = useReducer(Reducer, 0)
  return (
    <ConfigProvider locale={zhCN}>
      <PageContext.Provider value={{ dispatchLoading }}>
        <div className="page-body">
          <div className="body-container" id="__page-container">
            <Spin spinning={!!loadingMask}>
              <div id="__content-container" className="body-content">
                {children}
              </div>
              {/* <BackTop
              target={() => document.getElementById('__page-container')}
            /> */}
            </Spin>
          </div>
        </div>
      </PageContext.Provider>
    </ConfigProvider>
  )
}

export default LoadingContainer
