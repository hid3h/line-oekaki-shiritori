import Axios from 'axios'
import { isNgrok } from '../Util';

export async function uploadImage(data) {
  // ngrokのときはローカルのapiの方もngrokしてないとつながらない。面倒なのでそれはしない。
  if (isNgrok()) {
    return {
      data: {
        key: 'keyName'
      }
    }
  }

  const baseUrl = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:2000/api/v1/' : '/api/v1/'
  try {
    const response = await Axios.post(baseUrl + 'images', {
      data: data,
    });
    console.log(response);
    return response
  } catch (error) {
    console.error(error);
  }
}