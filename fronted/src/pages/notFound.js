import React from 'react'
import { Result, Button } from 'antd'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const NotFound = () => {
  const history = useHistory()
  const { t } = useTranslation()
  const goBackHome = () => {
    history.push('/home')
  }
  return (
    <Result
      status="404"
      title="404"
      subTitle={t('您访问的页面不存在')}
      extra={
        <Button onClick={goBackHome} type="primary">
          {t('返回首页')}
        </Button>
      }
    />
  )
}

export default NotFound
