import Axios from 'axios'

export async function uploadImage(data) {
  // ngrok使って実機で試すときローカルサーバーにつながらないので
  // if (process.env.NODE_ENV === 'development') {
  //   return {
  //     data: {
  //       key: 'examplKey'
  //     }
  //   }
  // }

  // PCで開発中のときは画像アップできるようにしたい


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