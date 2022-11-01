import axios from 'axios'

const service = axios.create({
  baseUrl: 'https://dapi.seentao.com/custom-form/customForm.formInfos.get',
  timeout: 5000
})

export default service